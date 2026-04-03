---
title: "Fine-Tuning Large Language Models with Python: A Practical Guide"
description: Learn how to fine-tune large language models using Python with LoRA, QLoRA, Hugging Face Transformers, and PEFT. Covers dataset preparation, training, evaluation, and deployment.
date: 2026-03-30 12:00:00 +0800
categories: [Python]
tags: [python, ai, llm, fine-tuning]
image:
  path: "/commons/Fine-Tuning Large Language Models with Python A Practical Guide.webp"
  alt: "Fine-Tuning Large Language Models with Python: A Practical Guide"
---

## Why Fine-Tune an LLM?

A pretrained LLM knows a lot about language but nothing about your specific domain, tone, or task format. Fine-tuning adapts a general-purpose model to your needs by training it on your own data.

```python
# Before fine-tuning
prompt = "Classify this support ticket: 'My order arrived damaged'"
# Model might give a generic, verbose response

# After fine-tuning on your support ticket data
prompt = "Classify this support ticket: 'My order arrived damaged'"
# Model outputs: "Category: Shipping - Damaged Item, Priority: High"
```

Common reasons to fine-tune:

- **Consistent output format** — The model learns your exact expected response structure.
- **Domain knowledge** — Medical, legal, or financial terminology and reasoning patterns. For retrieval-based approaches instead, see [RAG with Python](/posts/RAG-with-Python-Retrieval-Augmented-Generation/).
- **Tone and style** — Match your brand voice or documentation style.
- **Cost reduction** — A fine-tuned smaller model can outperform a larger general model on your specific task, at lower inference cost.

When I built a Document AI pipeline at Codiste, fine-tuning a transformer on domain-specific documents was the turning point that took our extraction accuracy from mediocre to production-ready. The base model understood language well enough, but it could not reliably extract structured fields from invoices and contracts until we trained it on a few hundred annotated examples in our exact output format.

## Full Fine-Tuning vs. LoRA vs. QLoRA

**Full fine-tuning** updates every parameter in the model. This requires enormous GPU memory (a 7B parameter model needs 28+ GB just for the weights in fp32) and risks catastrophic forgetting.

**LoRA (Low-Rank Adaptation)** freezes the original weights and injects small trainable matrices into each layer. Instead of updating millions of parameters, you train thousands.

```text
Original weight matrix W (4096 x 4096) = 16M parameters
LoRA: W + A × B where A is (4096 x 16) and B is (16 x 4096) = 131K parameters
That's 99.2% fewer trainable parameters.
```

**QLoRA** goes further by loading the base model in 4-bit quantized format, reducing memory usage by 4x while maintaining quality. A 7B model that normally needs 14 GB in fp16 fits in about 4 GB with QLoRA.

```python
# Memory comparison for a 7B parameter model
# Full fine-tuning:  ~28 GB (fp32) or ~14 GB (fp16)
# LoRA (fp16):       ~14 GB for weights + ~0.1 GB for LoRA adapters
# QLoRA (4-bit):     ~4 GB for weights + ~0.1 GB for LoRA adapters
```

## Setting Up the Environment

```bash
pip install torch transformers datasets peft trl bitsandbytes accelerate
```

You need a GPU for fine-tuning. A single GPU with 16 GB VRAM (e.g., NVIDIA T4 or RTX 4080) is sufficient for QLoRA on 7B models.

```python
import torch
print(f"CUDA available: {torch.cuda.is_available()}")
if torch.cuda.is_available():
    print(f"GPU: {torch.cuda.get_device_name(0)}")
    print(f"VRAM: {torch.cuda.get_device_properties(0).total_mem / 1e9:.1f} GB")
```

## Preparing Your Dataset

Fine-tuning data should be formatted as instruction-response pairs. Here is how to prepare a dataset for instruction tuning:

```python
from datasets import Dataset

# Your training data as a list of dictionaries
training_data = [
    {
        "instruction": "Classify this support ticket",
        "input": "My order #12345 arrived with a broken screen",
        "output": "Category: Shipping - Damaged Item\nPriority: High\nAction: Initiate replacement"
    },
    {
        "instruction": "Classify this support ticket",
        "input": "How do I change my subscription plan?",
        "output": "Category: Account - Subscription\nPriority: Medium\nAction: Send plan change instructions"
    },
    {
        "instruction": "Classify this support ticket",
        "input": "Your app keeps crashing on my iPhone",
        "output": "Category: Technical - App Bug\nPriority: High\nAction: Escalate to engineering"
    },
    # Add hundreds or thousands more examples...
]

dataset = Dataset.from_list(training_data)
dataset = dataset.train_test_split(test_size=0.1, seed=42)

print(f"Train: {len(dataset['train'])} examples")
print(f"Test: {len(dataset['test'])} examples")
```

Format the data into the prompt template your model expects:

```python
def format_prompt(example):
    """Format a single example into the Alpaca prompt template."""
    if example["input"]:
        text = f"""### Instruction:
{example["instruction"]}

### Input:
{example["input"]}

### Response:
{example["output"]}"""
    else:
        text = f"""### Instruction:
{example["instruction"]}

### Response:
{example["output"]}"""
    return {"text": text}

dataset = dataset.map(format_prompt)
print(dataset["train"][0]["text"])
```

## Loading the Base Model with QLoRA

```python
from transformers import AutoModelForCausalLM, AutoTokenizer, BitsAndBytesConfig

model_name = "meta-llama/Llama-2-7b-hf"  # Or any Hugging Face model

# 4-bit quantization config
bnb_config = BitsAndBytesConfig(
    load_in_4bit=True,
    bnb_4bit_quant_type="nf4",
    bnb_4bit_compute_dtype=torch.float16,
    bnb_4bit_use_double_quant=True,
)

# Load tokenizer
tokenizer = AutoTokenizer.from_pretrained(model_name)
tokenizer.pad_token = tokenizer.eos_token
tokenizer.padding_side = "right"

# Load model in 4-bit
model = AutoModelForCausalLM.from_pretrained(
    model_name,
    quantization_config=bnb_config,
    device_map="auto",
    torch_dtype=torch.float16,
)

model.config.use_cache = False

print(f"Model loaded. Memory: {model.get_memory_footprint() / 1e9:.2f} GB")
```

## Configuring LoRA

```python
from peft import LoraConfig, get_peft_model, prepare_model_for_kbit_training, TaskType

# Prepare the model for training (needed for quantized models)
model = prepare_model_for_kbit_training(model)

# LoRA configuration
lora_config = LoraConfig(
    r=16,                          # Rank of the low-rank matrices
    lora_alpha=32,                 # Scaling factor
    target_modules=[               # Which layers to apply LoRA to
        "q_proj",
        "k_proj",
        "v_proj",
        "o_proj",
        "gate_proj",
        "up_proj",
        "down_proj",
    ],
    lora_dropout=0.05,
    bias="none",
    task_type=TaskType.CAUSAL_LM,
)

model = get_peft_model(model, lora_config)

# Print trainable parameters
trainable_params = sum(p.numel() for p in model.parameters() if p.requires_grad)
total_params = sum(p.numel() for p in model.parameters())
print(f"Trainable: {trainable_params:,} ({100 * trainable_params / total_params:.2f}%)")
print(f"Total: {total_params:,}")
```

The `r` parameter controls the rank of the LoRA matrices. Higher rank means more capacity but more memory and compute. Values of 8, 16, or 32 work well in practice. The `lora_alpha` is typically set to 2x the rank.

## Training with SFTTrainer

The `SFTTrainer` from the `trl` library simplifies supervised fine-tuning:

```python
from trl import SFTTrainer
from transformers import TrainingArguments

training_args = TrainingArguments(
    output_dir="./results",
    num_train_epochs=3,
    per_device_train_batch_size=4,
    gradient_accumulation_steps=4,   # Effective batch size = 4 * 4 = 16
    learning_rate=2e-4,
    weight_decay=0.01,
    warmup_ratio=0.03,
    lr_scheduler_type="cosine",
    logging_steps=10,
    save_strategy="epoch",
    evaluation_strategy="epoch",
    fp16=True,
    optim="paged_adamw_8bit",       # Memory-efficient optimizer
    report_to="none",               # Set to "wandb" for experiment tracking
    save_total_limit=2,
)

trainer = SFTTrainer(
    model=model,
    train_dataset=dataset["train"],
    eval_dataset=dataset["test"],
    tokenizer=tokenizer,
    args=training_args,
    dataset_text_field="text",
    max_seq_length=512,
    packing=True,                   # Pack multiple examples into one sequence
)

# Train
trainer.train()

# Save the final adapter
trainer.save_model("./final_adapter")
tokenizer.save_pretrained("./final_adapter")
```

### Monitoring Training

Watch the training loss and evaluation loss. If training loss decreases but eval loss increases, the model is overfitting.

```python
# After training, plot the losses
import matplotlib.pyplot as plt

logs = trainer.state.log_history
train_losses = [(l["step"], l["loss"]) for l in logs if "loss" in l]
eval_losses = [(l["step"], l["eval_loss"]) for l in logs if "eval_loss" in l]

plt.figure(figsize=(10, 5))
if train_losses:
    steps, losses = zip(*train_losses)
    plt.plot(steps, losses, label="Train Loss")
if eval_losses:
    steps, losses = zip(*eval_losses)
    plt.plot(steps, losses, label="Eval Loss", marker="o")
plt.xlabel("Step")
plt.ylabel("Loss")
plt.legend()
plt.title("Training Progress")
plt.savefig("training_loss.png")
plt.show()
```

## Evaluating the Fine-Tuned Model

```python
from peft import PeftModel

# Load the base model and adapter
base_model = AutoModelForCausalLM.from_pretrained(
    model_name,
    quantization_config=bnb_config,
    device_map="auto",
    torch_dtype=torch.float16,
)
model = PeftModel.from_pretrained(base_model, "./final_adapter")
model.eval()

def generate_response(instruction: str, input_text: str = "", max_new_tokens: int = 256):
    if input_text:
        prompt = f"### Instruction:\n{instruction}\n\n### Input:\n{input_text}\n\n### Response:\n"
    else:
        prompt = f"### Instruction:\n{instruction}\n\n### Response:\n"

    inputs = tokenizer(prompt, return_tensors="pt").to(model.device)

    with torch.no_grad():
        outputs = model.generate(
            **inputs,
            max_new_tokens=max_new_tokens,
            temperature=0.1,
            do_sample=True,
            top_p=0.9,
            repetition_penalty=1.1,
        )

    response = tokenizer.decode(outputs[0], skip_special_tokens=True)
    # Extract only the response part
    response = response.split("### Response:")[-1].strip()
    return response

# Test on examples
test_cases = [
    ("Classify this support ticket", "I want to cancel my account immediately"),
    ("Classify this support ticket", "The checkout page shows an error 500"),
    ("Classify this support ticket", "Can you send me a copy of my invoice?"),
]

for instruction, input_text in test_cases:
    response = generate_response(instruction, input_text)
    print(f"Input: {input_text}")
    print(f"Output: {response}")
    print("---")
```

### Quantitative Evaluation

```python
from sklearn.metrics import accuracy_score

def evaluate_on_test_set(test_dataset):
    predictions = []
    references = []

    for example in test_dataset:
        pred = generate_response(example["instruction"], example["input"])
        predictions.append(pred.strip())
        references.append(example["output"].strip())

    # For classification tasks, you can compute accuracy
    exact_match = sum(p == r for p, r in zip(predictions, references)) / len(predictions)
    print(f"Exact match accuracy: {exact_match:.2%}")

    # Print mismatches for analysis
    for i, (p, r) in enumerate(zip(predictions, references)):
        if p != r:
            print(f"\nMismatch {i}:")
            print(f"  Expected: {r}")
            print(f"  Got:      {p}")

evaluate_on_test_set(dataset["test"])
```

## Merging LoRA Weights for Deployment

For production deployment, merge the LoRA adapter into the base model to eliminate the adapter overhead. If you are building a full production pipeline, check out [MLOps with Python: Building Production ML Pipelines](/posts/MLOps-with-Python-Production-ML-Pipelines/) for experiment tracking, model serving, and CI/CD.

```python
from peft import PeftModel
from transformers import AutoModelForCausalLM, AutoTokenizer

# Load in full precision for merging
base_model = AutoModelForCausalLM.from_pretrained(
    model_name,
    torch_dtype=torch.float16,
    device_map="auto",
)

# Load and merge the adapter
model = PeftModel.from_pretrained(base_model, "./final_adapter")
merged_model = model.merge_and_unload()

# Save the merged model
merged_model.save_pretrained("./merged_model")
tokenizer.save_pretrained("./merged_model")

print("Merged model saved. It can now be loaded without PEFT.")
```

## Deploying with vLLM

vLLM is a high-throughput inference engine that makes serving fine-tuned models practical:

```bash
pip install vllm
```

```python
from vllm import LLM, SamplingParams

# Load the merged model
llm = LLM(model="./merged_model", dtype="float16")

sampling_params = SamplingParams(
    temperature=0.1,
    top_p=0.9,
    max_tokens=256,
)

prompts = [
    "### Instruction:\nClassify this support ticket\n\n### Input:\nI can't log into my account\n\n### Response:\n",
    "### Instruction:\nClassify this support ticket\n\n### Input:\nWhen will my refund be processed?\n\n### Response:\n",
]

outputs = llm.generate(prompts, sampling_params)

for output in outputs:
    print(output.outputs[0].text)
    print("---")
```

You can also integrate your fine-tuned model into agent workflows using the [OpenAI Agents SDK](/posts/openai-agents-sdk-python/) for tool-using, multi-agent systems.

Or serve it as an API:

```bash
python -m vllm.entrypoints.openai.api_server \
    --model ./merged_model \
    --dtype float16 \
    --port 8000
```

Then call it like an OpenAI API:

```python
import openai

client = openai.OpenAI(base_url="http://localhost:8000/v1", api_key="unused")

response = client.chat.completions.create(
    model="./merged_model",
    messages=[{"role": "user", "content": "Classify this support ticket: My package is lost"}],
    temperature=0.1,
)
print(response.choices[0].message.content)
```

## Tips for Better Fine-Tuning

**Data quality matters more than data quantity.** 500 high-quality, diverse examples often beat 5000 noisy ones. Review your training data manually. In my experience fine-tuning transformers at Codiste, I found that spending two days cleaning and deduplicating 400 training examples produced a better model than rushing through 2000 noisy ones. Every mislabeled example in a small dataset has an outsized negative impact on the final model.

**Start with a small learning rate.** For LoRA, 1e-4 to 2e-4 works well. For full fine-tuning, use 1e-5 to 5e-5. Too high a learning rate destroys the pretrained knowledge.

**Use a validation set.** Always hold out 10-20% of your data for evaluation. Stop training when validation loss stops decreasing.

**Choose the right base model.** Start with an instruction-tuned model (like Llama-2-chat or Mistral-Instruct) if your task involves following instructions. Use a base model if you need more flexibility.

**Iterate on your data.** After initial fine-tuning, analyze the errors. Often the fix is better training data, not more epochs or a larger model.

## Summary

Fine-tuning adapts a pretrained LLM to your specific task, format, and domain. QLoRA makes this accessible on consumer GPUs by quantizing the base model to 4-bit and training small LoRA adapters. The workflow is: prepare your dataset, load the quantized model, configure LoRA, train with SFTTrainer, evaluate, and deploy. Focus on data quality, use proper evaluation, and merge the adapter for production deployment.

---

## Related Posts

- [MLOps with Python: Building Production ML Pipelines](/posts/MLOps-with-Python-Production-ML-Pipelines/) - Deploy and monitor your fine-tuned models in production with experiment tracking, CI/CD, and model serving
- [RAG with Python: Retrieval-Augmented Generation](/posts/RAG-with-Python-Retrieval-Augmented-Generation/) - An alternative to fine-tuning that gives LLMs access to external knowledge at query time
- [OpenAI Agents SDK Python Tutorial](/posts/openai-agents-sdk-python/) - Build tool-using, multi-agent workflows powered by your fine-tuned models
