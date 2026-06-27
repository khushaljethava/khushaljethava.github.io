---
title: "Pythonによる大規模言語モデルのファインチューニング：実践ガイド"
description: LoRA、QLoRA、Hugging Face Transformers、PEFTを使って、Pythonで大規模言語モデルをファインチューニングする方法を学びます。データセットの準備、トレーニング、評価、デプロイをカバーします。
date: 2026-03-30 12:00:00 +0800
categories: [Python]
tags: [python, ai, llm, fine-tuning]
lang: ja
translations: [hi, es, pt, fr, de, ja, ko]
image:
  path: "/commons/Fine-Tuning Large Language Models with Python A Practical Guide.webp"
  alt: "Pythonによる大規模言語モデルのファインチューニング：実践ガイド"
---

## なぜLLMをファインチューニングするのか？

事前学習済みのLLMは言語については多くのことを知っていますが、あなた固有のドメイン、トーン、タスク形式については何も知りません。ファインチューニングは、汎用モデルをあなた自身のデータでトレーニングすることで、あなたのニーズに適応させます。

```python
# Before fine-tuning
prompt = "Classify this support ticket: 'My order arrived damaged'"
# Model might give a generic, verbose response

# After fine-tuning on your support ticket data
prompt = "Classify this support ticket: 'My order arrived damaged'"
# Model outputs: "Category: Shipping - Damaged Item, Priority: High"
```

ファインチューニングを行う一般的な理由：

- **一貫した出力形式** — モデルはあなたが期待する正確な応答構造を学習します。
- **ドメイン知識** — 医療、法律、金融の専門用語や推論パターン。代わりに検索ベースのアプローチについては、[RAG with Python](/posts/RAG-with-Python-Retrieval-Augmented-Generation/)を参照してください。
- **トーンとスタイル** — あなたのブランドの声やドキュメントのスタイルに合わせます。
- **コスト削減** — ファインチューニングされた小さなモデルは、あなた固有のタスクにおいて、より低い推論コストで、より大きな汎用モデルを上回ることができます。

CodisteでドキュメントAIパイプラインを構築したとき、ドメイン固有のドキュメントでトランスフォーマーをファインチューニングしたことが、抽出精度を平凡なものから本番対応レベルへと引き上げた転換点でした。ベースモデルは言語を十分に理解していましたが、私たちの正確な出力形式で数百件の注釈付き例でトレーニングするまでは、請求書や契約書から構造化されたフィールドを確実に抽出することはできませんでした。

## フルファインチューニング vs. LoRA vs. QLoRA

**フルファインチューニング**は、モデル内のすべてのパラメータを更新します。これには膨大なGPUメモリが必要であり（70億パラメータのモデルは、fp32で重みだけで28GB以上を必要とします）、破滅的忘却のリスクがあります。

**LoRA（Low-Rank Adaptation）**は、元の重みを凍結し、各層に小さなトレーニング可能な行列を注入します。数百万のパラメータを更新する代わりに、数千をトレーニングします。

```text
Original weight matrix W (4096 x 4096) = 16M parameters
LoRA: W + A × B where A is (4096 x 16) and B is (16 x 4096) = 131K parameters
That's 99.2% fewer trainable parameters.
```

**QLoRA**はさらに一歩進んで、ベースモデルを4ビット量子化形式でロードし、品質を維持しながらメモリ使用量を4分の1に削減します。通常fp16で14GBを必要とする70億パラメータのモデルは、QLoRAでは約4GBに収まります。

```python
# Memory comparison for a 7B parameter model
# Full fine-tuning:  ~28 GB (fp32) or ~14 GB (fp16)
# LoRA (fp16):       ~14 GB for weights + ~0.1 GB for LoRA adapters
# QLoRA (4-bit):     ~4 GB for weights + ~0.1 GB for LoRA adapters
```

## 環境のセットアップ

```bash
pip install torch transformers datasets peft trl bitsandbytes accelerate
```

ファインチューニングにはGPUが必要です。16GBのVRAMを搭載した単一のGPU（例：NVIDIA T4またはRTX 4080）は、70億パラメータモデルでのQLoRAに十分です。

```python
import torch
print(f"CUDA available: {torch.cuda.is_available()}")
if torch.cuda.is_available():
    print(f"GPU: {torch.cuda.get_device_name(0)}")
    print(f"VRAM: {torch.cuda.get_device_properties(0).total_mem / 1e9:.1f} GB")
```

## データセットの準備

ファインチューニング用のデータは、指示と応答のペアとして整形する必要があります。インストラクションチューニング用のデータセットを準備する方法は次のとおりです：

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

データを、モデルが期待するプロンプトテンプレートに整形します：

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

## QLoRAでベースモデルをロードする

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

## LoRAの設定

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

`r`パラメータはLoRA行列のランクを制御します。ランクが高いほど容量は増えますが、メモリと計算量も増えます。実際には8、16、32の値がうまく機能します。`lora_alpha`は通常、ランクの2倍に設定されます。

## SFTTrainerでのトレーニング

`trl`ライブラリの`SFTTrainer`は、教師ありファインチューニングを簡素化します：

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

### トレーニングの監視

トレーニング損失と評価損失を観察してください。トレーニング損失は減少するのに評価損失が増加する場合、モデルは過学習しています。

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

## ファインチューニングしたモデルの評価

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

### 定量的評価

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

## デプロイのためのLoRA重みのマージ

本番デプロイでは、アダプターのオーバーヘッドを排除するために、LoRAアダプターをベースモデルにマージします。完全な本番パイプラインを構築している場合は、実験トラッキング、モデルサービング、CI/CDについて[MLOps with Python: Building Production ML Pipelines](/posts/MLOps-with-Python-Production-ML-Pipelines/)を確認してください。

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

## vLLMでのデプロイ

vLLMは高スループットの推論エンジンであり、ファインチューニングしたモデルのサービングを実用的にします：

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

[OpenAI Agents SDK](/posts/openai-agents-sdk-python/)を使用して、ツールを使用するマルチエージェントシステムのエージェントワークフローに、ファインチューニングしたモデルを統合することもできます。

または、APIとしてサービングします：

```bash
python -m vllm.entrypoints.openai.api_server \
    --model ./merged_model \
    --dtype float16 \
    --port 8000
```

その後、OpenAI APIのように呼び出します：

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

## より良いファインチューニングのためのヒント

**データの量よりもデータの質が重要です。** 500件の高品質で多様な例は、多くの場合5000件のノイズの多い例に勝ります。トレーニングデータを手動でレビューしてください。Codisteでトランスフォーマーをファインチューニングした私の経験では、400件のトレーニング例のクリーニングと重複排除に2日間を費やすことが、2000件のノイズの多い例を急いで処理するよりも優れたモデルを生み出すことがわかりました。小さなデータセットでは、誤ってラベル付けされた各例が、最終モデルに不釣り合いなほど大きな悪影響を及ぼします。

**小さな学習率から始めてください。** LoRAでは、1e-4から2e-4がうまく機能します。フルファインチューニングでは、1e-5から5e-5を使用してください。学習率が高すぎると、事前学習された知識が破壊されます。

**検証セットを使用してください。** 評価のために、常にデータの10〜20%を確保しておきます。検証損失が減少しなくなったらトレーニングを停止します。

**適切なベースモデルを選択してください。** タスクが指示に従うことを含む場合は、インストラクションチューニングされたモデル（Llama-2-chatやMistral-Instructなど）から始めてください。より多くの柔軟性が必要な場合は、ベースモデルを使用してください。

**データを反復改善してください。** 最初のファインチューニングの後、エラーを分析します。多くの場合、解決策はより多くのエポックやより大きなモデルではなく、より良いトレーニングデータです。

## まとめ

ファインチューニングは、事前学習済みのLLMをあなた固有のタスク、形式、ドメインに適応させます。QLoRAは、ベースモデルを4ビットに量子化し、小さなLoRAアダプターをトレーニングすることで、コンシューマー向けGPUでこれを利用可能にします。ワークフローは次のとおりです：データセットを準備し、量子化されたモデルをロードし、LoRAを設定し、SFTTrainerでトレーニングし、評価し、デプロイします。データの質に焦点を当て、適切な評価を使用し、本番デプロイのためにアダプターをマージしてください。

---

## 関連記事

- [MLOps with Python: Building Production ML Pipelines](/posts/MLOps-with-Python-Production-ML-Pipelines/) - 実験トラッキング、CI/CD、モデルサービングを使用して、ファインチューニングしたモデルを本番環境にデプロイし、監視します
- [RAG with Python: Retrieval-Augmented Generation](/posts/RAG-with-Python-Retrieval-Augmented-Generation/) - クエリ時にLLMに外部知識へのアクセスを与える、ファインチューニングの代替手段
- [OpenAI Agents SDK Python Tutorial](/posts/openai-agents-sdk-python/) - ファインチューニングしたモデルを活用した、ツールを使用するマルチエージェントワークフローを構築します
