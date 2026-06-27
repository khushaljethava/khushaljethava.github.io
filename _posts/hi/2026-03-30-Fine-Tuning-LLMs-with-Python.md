---
title: "Python के साथ बड़े लैंग्वेज मॉडल फाइन-ट्यून करना: एक व्यावहारिक गाइड"
description: LoRA, QLoRA, Hugging Face Transformers और PEFT का उपयोग करके Python में बड़े लैंग्वेज मॉडल को फाइन-ट्यून करना सीखें। इसमें डेटासेट तैयारी, ट्रेनिंग, मूल्यांकन और डिप्लॉयमेंट शामिल है।
date: 2026-03-30 12:00:00 +0800
categories: [Python]
tags: [python, ai, llm, fine-tuning]
lang: hi
translations: [hi, es, pt, fr, de, ja, ko]
image:
  path: "/commons/Fine-Tuning Large Language Models with Python A Practical Guide.webp"
  alt: "Python के साथ बड़े लैंग्वेज मॉडल फाइन-ट्यून करना: एक व्यावहारिक गाइड"
---

## किसी LLM को फाइन-ट्यून क्यों करें?

एक प्रीट्रेन्ड LLM भाषा के बारे में बहुत कुछ जानता है, लेकिन आपके विशिष्ट डोमेन, टोन या टास्क फॉर्मेट के बारे में कुछ नहीं जानता। फाइन-ट्यूनिंग एक सामान्य-उद्देश्य वाले मॉडल को आपके अपने डेटा पर ट्रेन करके आपकी ज़रूरतों के अनुसार ढाल देती है।

```python
# Before fine-tuning
prompt = "Classify this support ticket: 'My order arrived damaged'"
# Model might give a generic, verbose response

# After fine-tuning on your support ticket data
prompt = "Classify this support ticket: 'My order arrived damaged'"
# Model outputs: "Category: Shipping - Damaged Item, Priority: High"
```

फाइन-ट्यून करने के सामान्य कारण:

- **एकसमान आउटपुट फॉर्मेट** — मॉडल आपके सटीक अपेक्षित रिस्पॉन्स ढांचे को सीख लेता है।
- **डोमेन ज्ञान** — चिकित्सा, कानूनी या वित्तीय शब्दावली और तर्क पैटर्न। इसके बजाय रिट्रीवल-आधारित तरीकों के लिए, देखें [RAG with Python](/posts/RAG-with-Python-Retrieval-Augmented-Generation/)।
- **टोन और शैली** — अपने ब्रांड की आवाज़ या डॉक्यूमेंटेशन शैली से मेल खाएं।
- **लागत में कमी** — एक फाइन-ट्यून किया गया छोटा मॉडल आपके विशिष्ट टास्क पर किसी बड़े सामान्य मॉडल से बेहतर प्रदर्शन कर सकता है, वह भी कम इनफरेंस लागत पर।

जब मैंने Codiste में एक Document AI पाइपलाइन बनाई, तो डोमेन-विशिष्ट दस्तावेज़ों पर एक ट्रांसफॉर्मर को फाइन-ट्यून करना वह निर्णायक मोड़ था जिसने हमारी एक्सट्रैक्शन सटीकता को साधारण से प्रोडक्शन-तैयार स्तर तक पहुंचा दिया। बेस मॉडल भाषा को काफी अच्छी तरह समझता था, लेकिन जब तक हमने इसे हमारे सटीक आउटपुट फॉर्मेट में कुछ सौ एनोटेटेड उदाहरणों पर ट्रेन नहीं किया, तब तक यह इनवॉइस और कॉन्ट्रैक्ट से स्ट्रक्चर्ड फ़ील्ड्स को विश्वसनीय रूप से एक्सट्रैक्ट नहीं कर पाता था।

## फुल फाइन-ट्यूनिंग बनाम LoRA बनाम QLoRA

**फुल फाइन-ट्यूनिंग** मॉडल के हर पैरामीटर को अपडेट करती है। इसके लिए विशाल GPU मेमोरी की आवश्यकता होती है (एक 7B पैरामीटर मॉडल को सिर्फ़ fp32 में वज़न के लिए 28+ GB चाहिए) और इसमें कैटास्ट्रॉफिक फॉरगेटिंग का जोखिम रहता है।

**LoRA (Low-Rank Adaptation)** मूल वज़न को फ्रीज़ कर देती है और हर लेयर में छोटे ट्रेन करने योग्य मैट्रिक्स इंजेक्ट करती है। लाखों पैरामीटर अपडेट करने के बजाय, आप हज़ारों को ट्रेन करते हैं।

```text
Original weight matrix W (4096 x 4096) = 16M parameters
LoRA: W + A × B where A is (4096 x 16) and B is (16 x 4096) = 131K parameters
That's 99.2% fewer trainable parameters.
```

**QLoRA** एक कदम और आगे जाती है, बेस मॉडल को 4-बिट क्वांटाइज़्ड फॉर्मेट में लोड करके, जिससे मेमोरी उपयोग 4 गुना कम हो जाता है जबकि गुणवत्ता बनी रहती है। एक 7B मॉडल जिसे सामान्यतः fp16 में 14 GB चाहिए, QLoRA के साथ लगभग 4 GB में आ जाता है।

```python
# Memory comparison for a 7B parameter model
# Full fine-tuning:  ~28 GB (fp32) or ~14 GB (fp16)
# LoRA (fp16):       ~14 GB for weights + ~0.1 GB for LoRA adapters
# QLoRA (4-bit):     ~4 GB for weights + ~0.1 GB for LoRA adapters
```

## एनवायरनमेंट सेट अप करना

```bash
pip install torch transformers datasets peft trl bitsandbytes accelerate
```

फाइन-ट्यूनिंग के लिए आपको एक GPU की आवश्यकता है। 16 GB VRAM वाला एक GPU (जैसे NVIDIA T4 या RTX 4080) 7B मॉडल पर QLoRA के लिए पर्याप्त है।

```python
import torch
print(f"CUDA available: {torch.cuda.is_available()}")
if torch.cuda.is_available():
    print(f"GPU: {torch.cuda.get_device_name(0)}")
    print(f"VRAM: {torch.cuda.get_device_properties(0).total_mem / 1e9:.1f} GB")
```

## अपना डेटासेट तैयार करना

फाइन-ट्यूनिंग डेटा को इंस्ट्रक्शन-रिस्पॉन्स जोड़ों के रूप में फॉर्मेट किया जाना चाहिए। इंस्ट्रक्शन ट्यूनिंग के लिए डेटासेट तैयार करने का तरीका यहां दिया गया है:

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

डेटा को उस प्रॉम्प्ट टेम्पलेट में फॉर्मेट करें जिसकी आपका मॉडल अपेक्षा करता है:

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

## QLoRA के साथ बेस मॉडल लोड करना

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

## LoRA को कॉन्फ़िगर करना

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

`r` पैरामीटर LoRA मैट्रिक्स की रैंक को नियंत्रित करता है। उच्च रैंक का अर्थ है अधिक क्षमता लेकिन अधिक मेमोरी और कंप्यूट। व्यवहार में 8, 16 या 32 के मान अच्छे से काम करते हैं। `lora_alpha` को आमतौर पर रैंक के 2 गुना पर सेट किया जाता है।

## SFTTrainer के साथ ट्रेनिंग

`trl` लाइब्रेरी का `SFTTrainer` सुपरवाइज़्ड फाइन-ट्यूनिंग को सरल बनाता है:

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

### ट्रेनिंग की निगरानी

ट्रेनिंग लॉस और इवैल्यूएशन लॉस पर नज़र रखें। यदि ट्रेनिंग लॉस घटती है लेकिन इवैल लॉस बढ़ती है, तो मॉडल ओवरफिट हो रहा है।

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

## फाइन-ट्यून किए गए मॉडल का मूल्यांकन

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

### मात्रात्मक मूल्यांकन

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

## डिप्लॉयमेंट के लिए LoRA वज़न मर्ज करना

प्रोडक्शन डिप्लॉयमेंट के लिए, अडैप्टर ओवरहेड को खत्म करने के लिए LoRA अडैप्टर को बेस मॉडल में मर्ज कर दें। यदि आप एक पूर्ण प्रोडक्शन पाइपलाइन बना रहे हैं, तो एक्सपेरिमेंट ट्रैकिंग, मॉडल सर्विंग और CI/CD के लिए [MLOps with Python: Building Production ML Pipelines](/posts/MLOps-with-Python-Production-ML-Pipelines/) देखें।

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

## vLLM के साथ डिप्लॉय करना

vLLM एक उच्च-थ्रूपुट इनफरेंस इंजन है जो फाइन-ट्यून किए गए मॉडल को सर्व करना व्यावहारिक बनाता है:

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

आप अपने फाइन-ट्यून किए गए मॉडल को [OpenAI Agents SDK](/posts/openai-agents-sdk-python/) का उपयोग करके एजेंट वर्कफ़्लो में टूल-उपयोग करने वाली, मल्टी-एजेंट सिस्टम के लिए भी इंटीग्रेट कर सकते हैं।

या इसे एक API के रूप में सर्व करें:

```bash
python -m vllm.entrypoints.openai.api_server \
    --model ./merged_model \
    --dtype float16 \
    --port 8000
```

फिर इसे एक OpenAI API की तरह कॉल करें:

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

## बेहतर फाइन-ट्यूनिंग के लिए सुझाव

**डेटा की मात्रा से ज़्यादा डेटा की गुणवत्ता मायने रखती है।** 500 उच्च-गुणवत्ता वाले, विविध उदाहरण अक्सर 5000 शोरगुल वाले उदाहरणों से बेहतर साबित होते हैं। अपने ट्रेनिंग डेटा की मैन्युअल समीक्षा करें। Codiste में ट्रांसफॉर्मर फाइन-ट्यून करने के मेरे अनुभव में, मैंने पाया कि 400 ट्रेनिंग उदाहरणों को साफ़ करने और डुप्लीकेट हटाने में दो दिन बिताने से 2000 शोरगुल वाले उदाहरणों में जल्दबाज़ी करने की तुलना में बेहतर मॉडल बना। एक छोटे डेटासेट में हर गलत लेबल वाला उदाहरण अंतिम मॉडल पर असंगत रूप से नकारात्मक प्रभाव डालता है।

**छोटी लर्निंग रेट से शुरू करें।** LoRA के लिए, 1e-4 से 2e-4 अच्छा काम करता है। फुल फाइन-ट्यूनिंग के लिए, 1e-5 से 5e-5 का उपयोग करें। बहुत अधिक लर्निंग रेट प्रीट्रेन्ड ज्ञान को नष्ट कर देती है।

**एक वैलिडेशन सेट का उपयोग करें।** मूल्यांकन के लिए हमेशा अपने डेटा का 10-20% अलग रखें। जब वैलिडेशन लॉस घटना बंद कर दे तो ट्रेनिंग रोक दें।

**सही बेस मॉडल चुनें।** यदि आपके टास्क में निर्देशों का पालन करना शामिल है तो एक इंस्ट्रक्शन-ट्यून्ड मॉडल (जैसे Llama-2-chat या Mistral-Instruct) से शुरू करें। यदि आपको अधिक लचीलेपन की आवश्यकता है तो एक बेस मॉडल का उपयोग करें।

**अपने डेटा पर पुनरावृत्ति करें।** शुरुआती फाइन-ट्यूनिंग के बाद, त्रुटियों का विश्लेषण करें। अक्सर समाधान बेहतर ट्रेनिंग डेटा होता है, न कि अधिक epoch या एक बड़ा मॉडल।

## सारांश

फाइन-ट्यूनिंग एक प्रीट्रेन्ड LLM को आपके विशिष्ट टास्क, फॉर्मेट और डोमेन के अनुसार ढालती है। QLoRA बेस मॉडल को 4-बिट में क्वांटाइज़ करके और छोटे LoRA अडैप्टर ट्रेन करके इसे कंज़्यूमर GPU पर सुलभ बनाती है। वर्कफ़्लो यह है: अपना डेटासेट तैयार करें, क्वांटाइज़्ड मॉडल लोड करें, LoRA कॉन्फ़िगर करें, SFTTrainer के साथ ट्रेन करें, मूल्यांकन करें और डिप्लॉय करें। डेटा की गुणवत्ता पर ध्यान दें, उचित मूल्यांकन का उपयोग करें, और प्रोडक्शन डिप्लॉयमेंट के लिए अडैप्टर को मर्ज करें।

---

## संबंधित पोस्ट

- [MLOps with Python: Building Production ML Pipelines](/posts/MLOps-with-Python-Production-ML-Pipelines/) - एक्सपेरिमेंट ट्रैकिंग, CI/CD और मॉडल सर्विंग के साथ अपने फाइन-ट्यून किए गए मॉडल को प्रोडक्शन में डिप्लॉय और मॉनिटर करें
- [RAG with Python: Retrieval-Augmented Generation](/posts/RAG-with-Python-Retrieval-Augmented-Generation/) - फाइन-ट्यूनिंग का एक विकल्प जो LLM को क्वेरी के समय बाहरी ज्ञान तक पहुंच देता है
- [OpenAI Agents SDK Python Tutorial](/posts/openai-agents-sdk-python/) - अपने फाइन-ट्यून किए गए मॉडल द्वारा संचालित टूल-उपयोग करने वाले, मल्टी-एजेंट वर्कफ़्लो बनाएं
