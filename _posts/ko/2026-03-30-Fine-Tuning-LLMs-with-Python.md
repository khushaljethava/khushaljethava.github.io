---
title: "Python으로 대규모 언어 모델 파인튜닝하기: 실용 가이드"
description: LoRA, QLoRA, Hugging Face Transformers, PEFT를 사용하여 Python으로 대규모 언어 모델을 파인튜닝하는 방법을 배웁니다. 데이터셋 준비, 학습, 평가, 배포를 다룹니다.
date: 2026-03-30 12:00:00 +0800
categories: [Python]
tags: [python, ai, llm, fine-tuning]
lang: ko
translations: [hi, es, pt, fr, de, ja, ko, ar]
image:
  path: "/commons/Fine-Tuning Large Language Models with Python A Practical Guide.webp"
  alt: "Python으로 대규모 언어 모델 파인튜닝하기: 실용 가이드"
---

## 왜 LLM을 파인튜닝하는가?

사전 학습된 LLM은 언어에 대해 많은 것을 알고 있지만, 여러분의 특정 도메인, 톤, 작업 형식에 대해서는 아무것도 모릅니다. 파인튜닝은 범용 모델을 여러분 자신의 데이터로 학습시켜 여러분의 요구에 맞게 적응시킵니다.

```python
# Before fine-tuning
prompt = "Classify this support ticket: 'My order arrived damaged'"
# Model might give a generic, verbose response

# After fine-tuning on your support ticket data
prompt = "Classify this support ticket: 'My order arrived damaged'"
# Model outputs: "Category: Shipping - Damaged Item, Priority: High"
```

파인튜닝을 하는 일반적인 이유:

- **일관된 출력 형식** — 모델이 여러분이 정확히 기대하는 응답 구조를 학습합니다.
- **도메인 지식** — 의료, 법률, 금융 용어 및 추론 패턴. 대신 검색 기반 접근 방식을 원한다면 [RAG with Python](/posts/RAG-with-Python-Retrieval-Augmented-Generation/)을 참조하세요.
- **톤과 스타일** — 브랜드의 목소리나 문서 스타일에 맞춥니다.
- **비용 절감** — 파인튜닝된 더 작은 모델이 여러분의 특정 작업에서 더 낮은 추론 비용으로 더 큰 범용 모델을 능가할 수 있습니다.

Codiste에서 Document AI 파이프라인을 구축했을 때, 도메인별 문서로 트랜스포머를 파인튜닝한 것이 우리의 추출 정확도를 평범한 수준에서 프로덕션 준비 수준으로 끌어올린 전환점이었습니다. 기본 모델은 언어를 충분히 잘 이해했지만, 우리의 정확한 출력 형식으로 수백 개의 주석이 달린 예제를 학습시키기 전까지는 송장과 계약서에서 구조화된 필드를 안정적으로 추출할 수 없었습니다.

## 전체 파인튜닝 vs. LoRA vs. QLoRA

**전체 파인튜닝**은 모델의 모든 파라미터를 업데이트합니다. 이는 막대한 GPU 메모리를 필요로 하며(70억 파라미터 모델은 fp32에서 가중치만으로 28GB 이상이 필요), 치명적 망각(catastrophic forgetting)의 위험이 있습니다.

**LoRA(Low-Rank Adaptation)**는 원래 가중치를 고정하고 각 레이어에 작은 학습 가능한 행렬을 주입합니다. 수백만 개의 파라미터를 업데이트하는 대신 수천 개를 학습합니다.

```text
Original weight matrix W (4096 x 4096) = 16M parameters
LoRA: W + A × B where A is (4096 x 16) and B is (16 x 4096) = 131K parameters
That's 99.2% fewer trainable parameters.
```

**QLoRA**는 한 걸음 더 나아가 기본 모델을 4비트 양자화 형식으로 로드하여, 품질을 유지하면서 메모리 사용량을 4배 줄입니다. 일반적으로 fp16에서 14GB가 필요한 70억 파라미터 모델은 QLoRA를 사용하면 약 4GB에 들어맞습니다.

```python
# Memory comparison for a 7B parameter model
# Full fine-tuning:  ~28 GB (fp32) or ~14 GB (fp16)
# LoRA (fp16):       ~14 GB for weights + ~0.1 GB for LoRA adapters
# QLoRA (4-bit):     ~4 GB for weights + ~0.1 GB for LoRA adapters
```

## 환경 설정

```bash
pip install torch transformers datasets peft trl bitsandbytes accelerate
```

파인튜닝에는 GPU가 필요합니다. 16GB VRAM을 갖춘 단일 GPU(예: NVIDIA T4 또는 RTX 4080)는 70억 파라미터 모델에서 QLoRA를 수행하기에 충분합니다.

```python
import torch
print(f"CUDA available: {torch.cuda.is_available()}")
if torch.cuda.is_available():
    print(f"GPU: {torch.cuda.get_device_name(0)}")
    print(f"VRAM: {torch.cuda.get_device_properties(0).total_mem / 1e9:.1f} GB")
```

## 데이터셋 준비하기

파인튜닝 데이터는 지시-응답 쌍으로 형식을 지정해야 합니다. 인스트럭션 튜닝을 위한 데이터셋을 준비하는 방법은 다음과 같습니다:

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

모델이 기대하는 프롬프트 템플릿으로 데이터의 형식을 지정합니다:

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

## QLoRA로 기본 모델 로드하기

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

## LoRA 구성하기

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

`r` 파라미터는 LoRA 행렬의 랭크를 제어합니다. 랭크가 높을수록 용량은 커지지만 메모리와 연산량도 많아집니다. 실제로는 8, 16, 32 값이 잘 작동합니다. `lora_alpha`는 일반적으로 랭크의 2배로 설정됩니다.

## SFTTrainer로 학습하기

`trl` 라이브러리의 `SFTTrainer`는 지도 파인튜닝을 단순화합니다:

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

### 학습 모니터링

학습 손실과 평가 손실을 관찰하세요. 학습 손실은 감소하지만 평가 손실이 증가하면, 모델이 과적합되고 있는 것입니다.

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

## 파인튜닝된 모델 평가하기

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

### 정량적 평가

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

## 배포를 위한 LoRA 가중치 병합하기

프로덕션 배포의 경우, 어댑터 오버헤드를 제거하기 위해 LoRA 어댑터를 기본 모델에 병합합니다. 완전한 프로덕션 파이프라인을 구축하고 있다면, 실험 추적, 모델 서빙, CI/CD에 대해 [MLOps with Python: Building Production ML Pipelines](/posts/MLOps-with-Python-Production-ML-Pipelines/)를 확인하세요.

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

## vLLM으로 배포하기

vLLM은 고처리량 추론 엔진으로, 파인튜닝된 모델을 서빙하는 것을 실용적으로 만듭니다:

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

[OpenAI Agents SDK](/posts/openai-agents-sdk-python/)를 사용하여 도구를 사용하는 멀티 에이전트 시스템의 에이전트 워크플로에 파인튜닝된 모델을 통합할 수도 있습니다.

또는 API로 서빙합니다:

```bash
python -m vllm.entrypoints.openai.api_server \
    --model ./merged_model \
    --dtype float16 \
    --port 8000
```

그런 다음 OpenAI API처럼 호출합니다:

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

## 더 나은 파인튜닝을 위한 팁

**데이터의 양보다 데이터의 품질이 더 중요합니다.** 500개의 고품질의 다양한 예제가 종종 5000개의 노이즈가 많은 예제를 능가합니다. 학습 데이터를 수동으로 검토하세요. Codiste에서 트랜스포머를 파인튜닝한 제 경험상, 400개의 학습 예제를 정리하고 중복을 제거하는 데 이틀을 쓰는 것이 2000개의 노이즈가 많은 예제를 서둘러 처리하는 것보다 더 나은 모델을 만들어냈습니다. 작은 데이터셋에서는 잘못 레이블이 지정된 각 예제가 최종 모델에 불균형하게 큰 부정적 영향을 미칩니다.

**작은 학습률로 시작하세요.** LoRA의 경우, 1e-4에서 2e-4가 잘 작동합니다. 전체 파인튜닝의 경우, 1e-5에서 5e-5를 사용하세요. 학습률이 너무 높으면 사전 학습된 지식이 파괴됩니다.

**검증 세트를 사용하세요.** 평가를 위해 항상 데이터의 10~20%를 따로 보관하세요. 검증 손실이 더 이상 감소하지 않으면 학습을 중단하세요.

**올바른 기본 모델을 선택하세요.** 작업에 지시 따르기가 포함된다면 인스트럭션 튜닝된 모델(예: Llama-2-chat 또는 Mistral-Instruct)로 시작하세요. 더 많은 유연성이 필요하다면 기본 모델을 사용하세요.

**데이터를 반복 개선하세요.** 초기 파인튜닝 후 오류를 분석하세요. 종종 해결책은 더 많은 에포크나 더 큰 모델이 아니라 더 나은 학습 데이터입니다.

## 요약

파인튜닝은 사전 학습된 LLM을 여러분의 특정 작업, 형식, 도메인에 맞게 적응시킵니다. QLoRA는 기본 모델을 4비트로 양자화하고 작은 LoRA 어댑터를 학습시킴으로써 이를 소비자용 GPU에서 접근 가능하게 만듭니다. 워크플로는 다음과 같습니다: 데이터셋을 준비하고, 양자화된 모델을 로드하고, LoRA를 구성하고, SFTTrainer로 학습하고, 평가하고, 배포합니다. 데이터 품질에 집중하고, 적절한 평가를 사용하며, 프로덕션 배포를 위해 어댑터를 병합하세요.

---

## 관련 게시물

- [MLOps with Python: Building Production ML Pipelines](/posts/MLOps-with-Python-Production-ML-Pipelines/) - 실험 추적, CI/CD, 모델 서빙으로 파인튜닝된 모델을 프로덕션에 배포하고 모니터링하세요
- [RAG with Python: Retrieval-Augmented Generation](/posts/RAG-with-Python-Retrieval-Augmented-Generation/) - 쿼리 시점에 LLM에 외부 지식 접근을 제공하는 파인튜닝의 대안
- [OpenAI Agents SDK Python Tutorial](/posts/openai-agents-sdk-python/) - 파인튜닝된 모델로 구동되는 도구 사용 멀티 에이전트 워크플로를 구축하세요
