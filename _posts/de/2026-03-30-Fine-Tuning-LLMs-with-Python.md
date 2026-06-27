---
title: "Große Sprachmodelle mit Python feintunen: Ein praktischer Leitfaden"
description: Lernen Sie, große Sprachmodelle in Python mit LoRA, QLoRA, Hugging Face Transformers und PEFT feinzutunen. Behandelt werden Datensatzvorbereitung, Training, Evaluierung und Deployment.
date: 2026-03-30 12:00:00 +0800
categories: [Python]
tags: [python, ai, llm, fine-tuning]
lang: de
translations: [hi, es, pt, fr, de, ja, ko]
image:
  path: "/commons/Fine-Tuning Large Language Models with Python A Practical Guide.webp"
  alt: "Große Sprachmodelle mit Python feintunen: Ein praktischer Leitfaden"
---

## Warum ein LLM feintunen?

Ein vortrainiertes LLM weiß viel über Sprache, aber nichts über Ihre spezifische Domäne, Ihren Tonfall oder Ihr Aufgabenformat. Das Feintuning passt ein Allzweckmodell an Ihre Bedürfnisse an, indem es mit Ihren eigenen Daten trainiert wird.

```python
# Before fine-tuning
prompt = "Classify this support ticket: 'My order arrived damaged'"
# Model might give a generic, verbose response

# After fine-tuning on your support ticket data
prompt = "Classify this support ticket: 'My order arrived damaged'"
# Model outputs: "Category: Shipping - Damaged Item, Priority: High"
```

Häufige Gründe für das Feintuning:

- **Einheitliches Ausgabeformat** — Das Modell lernt Ihre exakt erwartete Antwortstruktur.
- **Domänenwissen** — Medizinische, juristische oder finanzielle Terminologie und Argumentationsmuster. Für abrufbasierte Ansätze siehe stattdessen [RAG with Python](/posts/RAG-with-Python-Retrieval-Augmented-Generation/).
- **Tonfall und Stil** — Passen Sie das Modell an Ihre Markenstimme oder Ihren Dokumentationsstil an.
- **Kostensenkung** — Ein feingetuntes kleineres Modell kann ein größeres Allzweckmodell bei Ihrer spezifischen Aufgabe übertreffen, und das zu geringeren Inferenzkosten.

Als ich bei Codiste eine Document-AI-Pipeline aufbaute, war das Feintuning eines Transformers auf domänenspezifischen Dokumenten der Wendepunkt, der unsere Extraktionsgenauigkeit von mittelmäßig auf produktionsreif brachte. Das Basismodell verstand Sprache gut genug, aber es konnte strukturierte Felder aus Rechnungen und Verträgen erst dann zuverlässig extrahieren, als wir es mit einigen hundert annotierten Beispielen in unserem exakten Ausgabeformat trainiert hatten.

## Vollständiges Feintuning vs. LoRA vs. QLoRA

**Vollständiges Feintuning** aktualisiert jeden Parameter im Modell. Dies erfordert enormen GPU-Speicher (ein Modell mit 7B Parametern benötigt allein für die Gewichte in fp32 mehr als 28 GB) und birgt das Risiko des katastrophalen Vergessens.

**LoRA (Low-Rank Adaptation)** friert die ursprünglichen Gewichte ein und injiziert kleine trainierbare Matrizen in jede Schicht. Statt Millionen von Parametern zu aktualisieren, trainieren Sie Tausende.

```text
Original weight matrix W (4096 x 4096) = 16M parameters
LoRA: W + A × B where A is (4096 x 16) and B is (16 x 4096) = 131K parameters
That's 99.2% fewer trainable parameters.
```

**QLoRA** geht noch einen Schritt weiter, indem es das Basismodell im 4-Bit-quantisierten Format lädt und so den Speicherverbrauch um das Vierfache reduziert, während die Qualität erhalten bleibt. Ein 7B-Modell, das normalerweise 14 GB in fp16 benötigt, passt mit QLoRA in etwa 4 GB.

```python
# Memory comparison for a 7B parameter model
# Full fine-tuning:  ~28 GB (fp32) or ~14 GB (fp16)
# LoRA (fp16):       ~14 GB for weights + ~0.1 GB for LoRA adapters
# QLoRA (4-bit):     ~4 GB for weights + ~0.1 GB for LoRA adapters
```

## Einrichtung der Umgebung

```bash
pip install torch transformers datasets peft trl bitsandbytes accelerate
```

Für das Feintuning benötigen Sie eine GPU. Eine einzelne GPU mit 16 GB VRAM (z. B. NVIDIA T4 oder RTX 4080) reicht für QLoRA auf 7B-Modellen aus.

```python
import torch
print(f"CUDA available: {torch.cuda.is_available()}")
if torch.cuda.is_available():
    print(f"GPU: {torch.cuda.get_device_name(0)}")
    print(f"VRAM: {torch.cuda.get_device_properties(0).total_mem / 1e9:.1f} GB")
```

## Vorbereitung Ihres Datensatzes

Feintuning-Daten sollten als Instruktions-Antwort-Paare formatiert werden. So bereiten Sie einen Datensatz für das Instruction-Tuning vor:

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

Formatieren Sie die Daten in das Prompt-Template, das Ihr Modell erwartet:

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

## Laden des Basismodells mit QLoRA

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

## Konfiguration von LoRA

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

Der Parameter `r` steuert den Rang der LoRA-Matrizen. Ein höherer Rang bedeutet mehr Kapazität, aber auch mehr Speicher und Rechenleistung. Werte von 8, 16 oder 32 funktionieren in der Praxis gut. `lora_alpha` wird typischerweise auf das Doppelte des Rangs gesetzt.

## Training mit SFTTrainer

Der `SFTTrainer` aus der `trl`-Bibliothek vereinfacht das überwachte Feintuning:

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

### Überwachung des Trainings

Beobachten Sie den Trainings-Loss und den Evaluierungs-Loss. Wenn der Trainings-Loss sinkt, der Eval-Loss aber steigt, überanpasst sich das Modell (Overfitting).

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

## Evaluierung des feingetunten Modells

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

### Quantitative Evaluierung

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

## Zusammenführen der LoRA-Gewichte für das Deployment

Führen Sie für das Produktions-Deployment den LoRA-Adapter in das Basismodell ein, um den Adapter-Overhead zu beseitigen. Wenn Sie eine vollständige Produktionspipeline aufbauen, sehen Sie sich [MLOps with Python: Building Production ML Pipelines](/posts/MLOps-with-Python-Production-ML-Pipelines/) für Experiment-Tracking, Model-Serving und CI/CD an.

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

## Deployment mit vLLM

vLLM ist eine Inferenz-Engine mit hohem Durchsatz, die das Bereitstellen feingetunter Modelle praktikabel macht:

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

Sie können Ihr feingetuntes Modell auch in Agenten-Workflows integrieren, indem Sie das [OpenAI Agents SDK](/posts/openai-agents-sdk-python/) für werkzeugnutzende Multi-Agenten-Systeme verwenden.

Oder stellen Sie es als API bereit:

```bash
python -m vllm.entrypoints.openai.api_server \
    --model ./merged_model \
    --dtype float16 \
    --port 8000
```

Rufen Sie es dann wie eine OpenAI-API auf:

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

## Tipps für besseres Feintuning

**Datenqualität zählt mehr als Datenmenge.** 500 hochwertige, vielfältige Beispiele schlagen oft 5000 verrauschte. Überprüfen Sie Ihre Trainingsdaten manuell. Aus meiner Erfahrung mit dem Feintuning von Transformern bei Codiste habe ich festgestellt, dass zwei Tage Aufwand für das Bereinigen und Deduplizieren von 400 Trainingsbeispielen ein besseres Modell ergaben als das überstürzte Durcharbeiten von 2000 verrauschten. Jedes falsch beschriftete Beispiel in einem kleinen Datensatz hat einen überproportional negativen Einfluss auf das endgültige Modell.

**Beginnen Sie mit einer kleinen Lernrate.** Für LoRA funktionieren 1e-4 bis 2e-4 gut. Für vollständiges Feintuning verwenden Sie 1e-5 bis 5e-5. Eine zu hohe Lernrate zerstört das vortrainierte Wissen.

**Verwenden Sie einen Validierungssatz.** Halten Sie immer 10–20 % Ihrer Daten für die Evaluierung zurück. Stoppen Sie das Training, wenn der Validierungs-Loss nicht mehr sinkt.

**Wählen Sie das richtige Basismodell.** Beginnen Sie mit einem instruction-getunten Modell (wie Llama-2-chat oder Mistral-Instruct), wenn Ihre Aufgabe das Befolgen von Anweisungen umfasst. Verwenden Sie ein Basismodell, wenn Sie mehr Flexibilität benötigen.

**Iterieren Sie über Ihre Daten.** Analysieren Sie nach dem ersten Feintuning die Fehler. Oft ist die Lösung besseres Trainingsdaten, nicht mehr Epochen oder ein größeres Modell.

## Zusammenfassung

Das Feintuning passt ein vortrainiertes LLM an Ihre spezifische Aufgabe, Ihr Format und Ihre Domäne an. QLoRA macht dies auf Consumer-GPUs zugänglich, indem es das Basismodell auf 4-Bit quantisiert und kleine LoRA-Adapter trainiert. Der Workflow ist: Bereiten Sie Ihren Datensatz vor, laden Sie das quantisierte Modell, konfigurieren Sie LoRA, trainieren Sie mit SFTTrainer, evaluieren Sie und führen Sie das Deployment durch. Konzentrieren Sie sich auf Datenqualität, verwenden Sie eine ordnungsgemäße Evaluierung und führen Sie den Adapter für das Produktions-Deployment zusammen.

---

## Verwandte Beiträge

- [MLOps with Python: Building Production ML Pipelines](/posts/MLOps-with-Python-Production-ML-Pipelines/) - Stellen Sie Ihre feingetunten Modelle in der Produktion bereit und überwachen Sie sie mit Experiment-Tracking, CI/CD und Model-Serving
- [RAG with Python: Retrieval-Augmented Generation](/posts/RAG-with-Python-Retrieval-Augmented-Generation/) - Eine Alternative zum Feintuning, die LLMs zur Abfragezeit Zugriff auf externes Wissen gibt
- [OpenAI Agents SDK Python Tutorial](/posts/openai-agents-sdk-python/) - Erstellen Sie werkzeugnutzende Multi-Agenten-Workflows, die von Ihren feingetunten Modellen angetrieben werden
