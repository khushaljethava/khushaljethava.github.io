---
title: "Fine-Tuning de grands modèles de langage avec Python : guide pratique"
description: Apprenez à affiner (fine-tuning) de grands modèles de langage avec Python à l'aide de LoRA, QLoRA, Hugging Face Transformers et PEFT. Couvre la préparation des données, l'entraînement, l'évaluation et le déploiement.
date: 2026-03-30 12:00:00 +0800
categories: [Python]
tags: [python, ai, llm, fine-tuning]
lang: fr
translations: [hi, es, pt, fr, de, ja, ko]
image:
  path: "/commons/Fine-Tuning Large Language Models with Python A Practical Guide.webp"
  alt: "Fine-Tuning de grands modèles de langage avec Python : guide pratique"
---

## Pourquoi affiner un LLM ?

Un LLM pré-entraîné connaît beaucoup de choses sur le langage, mais rien sur votre domaine, votre ton ou votre format de tâche spécifiques. Le fine-tuning adapte un modèle généraliste à vos besoins en l'entraînant sur vos propres données.

```python
# Before fine-tuning
prompt = "Classify this support ticket: 'My order arrived damaged'"
# Model might give a generic, verbose response

# After fine-tuning on your support ticket data
prompt = "Classify this support ticket: 'My order arrived damaged'"
# Model outputs: "Category: Shipping - Damaged Item, Priority: High"
```

Raisons courantes de faire du fine-tuning :

- **Format de sortie cohérent** — Le modèle apprend la structure de réponse exacte que vous attendez.
- **Connaissance du domaine** — Terminologie et schémas de raisonnement médicaux, juridiques ou financiers. Pour des approches basées sur la recherche, voir [RAG with Python](/posts/RAG-with-Python-Retrieval-Augmented-Generation/).
- **Ton et style** — Correspondre à la voix de votre marque ou au style de votre documentation.
- **Réduction des coûts** — Un modèle plus petit affiné peut surpasser un modèle généraliste plus grand sur votre tâche spécifique, à un coût d'inférence moindre.

Lorsque j'ai construit une pipeline de Document AI chez Codiste, le fine-tuning d'un transformer sur des documents spécifiques au domaine a été le tournant qui a fait passer notre précision d'extraction de médiocre à prête pour la production. Le modèle de base comprenait suffisamment bien le langage, mais il ne pouvait pas extraire de manière fiable des champs structurés de factures et de contrats jusqu'à ce que nous l'entraînions sur quelques centaines d'exemples annotés dans notre format de sortie exact.

## Fine-tuning complet vs. LoRA vs. QLoRA

Le **fine-tuning complet** met à jour chaque paramètre du modèle. Cela nécessite une mémoire GPU énorme (un modèle de 7 milliards de paramètres a besoin de plus de 28 Go rien que pour les poids en fp32) et risque l'oubli catastrophique.

**LoRA (Low-Rank Adaptation)** fige les poids d'origine et injecte de petites matrices entraînables dans chaque couche. Au lieu de mettre à jour des millions de paramètres, vous en entraînez des milliers.

```text
Original weight matrix W (4096 x 4096) = 16M parameters
LoRA: W + A × B where A is (4096 x 16) and B is (16 x 4096) = 131K parameters
That's 99.2% fewer trainable parameters.
```

**QLoRA** va plus loin en chargeant le modèle de base au format quantifié sur 4 bits, réduisant l'utilisation de la mémoire de 4 fois tout en maintenant la qualité. Un modèle de 7 milliards qui nécessite normalement 14 Go en fp16 tient dans environ 4 Go avec QLoRA.

```python
# Memory comparison for a 7B parameter model
# Full fine-tuning:  ~28 GB (fp32) or ~14 GB (fp16)
# LoRA (fp16):       ~14 GB for weights + ~0.1 GB for LoRA adapters
# QLoRA (4-bit):     ~4 GB for weights + ~0.1 GB for LoRA adapters
```

## Configurer l'environnement

```bash
pip install torch transformers datasets peft trl bitsandbytes accelerate
```

Vous avez besoin d'un GPU pour le fine-tuning. Un seul GPU avec 16 Go de VRAM (par exemple, NVIDIA T4 ou RTX 4080) suffit pour QLoRA sur des modèles de 7 milliards.

```python
import torch
print(f"CUDA available: {torch.cuda.is_available()}")
if torch.cuda.is_available():
    print(f"GPU: {torch.cuda.get_device_name(0)}")
    print(f"VRAM: {torch.cuda.get_device_properties(0).total_mem / 1e9:.1f} GB")
```

## Préparer votre jeu de données

Les données de fine-tuning doivent être formatées sous forme de paires instruction-réponse. Voici comment préparer un jeu de données pour l'ajustement par instructions :

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

Formatez les données dans le template de prompt que votre modèle attend :

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

## Charger le modèle de base avec QLoRA

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

## Configurer LoRA

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

Le paramètre `r` contrôle le rang des matrices LoRA. Un rang plus élevé signifie plus de capacité, mais davantage de mémoire et de calcul. Des valeurs de 8, 16 ou 32 fonctionnent bien en pratique. Le `lora_alpha` est généralement fixé au double du rang.

## Entraînement avec SFTTrainer

Le `SFTTrainer` de la bibliothèque `trl` simplifie le fine-tuning supervisé :

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

### Surveiller l'entraînement

Surveillez la perte d'entraînement (training loss) et la perte d'évaluation (eval loss). Si la perte d'entraînement diminue mais que la perte d'évaluation augmente, le modèle est en surapprentissage.

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

## Évaluer le modèle affiné

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

### Évaluation quantitative

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

## Fusionner les poids LoRA pour le déploiement

Pour le déploiement en production, fusionnez l'adaptateur LoRA dans le modèle de base afin d'éliminer la surcharge de l'adaptateur. Si vous construisez une pipeline de production complète, consultez [MLOps with Python: Building Production ML Pipelines](/posts/MLOps-with-Python-Production-ML-Pipelines/) pour le suivi des expériences, le service de modèles et la CI/CD.

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

## Déployer avec vLLM

vLLM est un moteur d'inférence à haut débit qui rend pratique le service de modèles affinés :

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

Vous pouvez également intégrer votre modèle affiné dans des workflows d'agents à l'aide de l'[OpenAI Agents SDK](/posts/openai-agents-sdk-python/) pour des systèmes multi-agents utilisant des outils.

Ou servez-le comme une API :

```bash
python -m vllm.entrypoints.openai.api_server \
    --model ./merged_model \
    --dtype float16 \
    --port 8000
```

Puis appelez-le comme une API OpenAI :

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

## Conseils pour un meilleur fine-tuning

**La qualité des données compte plus que la quantité.** 500 exemples variés et de haute qualité battent souvent 5000 exemples bruités. Examinez vos données d'entraînement manuellement. D'après mon expérience du fine-tuning de transformers chez Codiste, j'ai constaté que passer deux jours à nettoyer et dédupliquer 400 exemples d'entraînement produisait un meilleur modèle que de se précipiter avec 2000 exemples bruités. Chaque exemple mal étiqueté dans un petit jeu de données a un impact négatif disproportionné sur le modèle final.

**Commencez avec un faible taux d'apprentissage.** Pour LoRA, 1e-4 à 2e-4 fonctionne bien. Pour le fine-tuning complet, utilisez 1e-5 à 5e-5. Un taux d'apprentissage trop élevé détruit les connaissances pré-entraînées.

**Utilisez un jeu de validation.** Réservez toujours 10 à 20 % de vos données pour l'évaluation. Arrêtez l'entraînement lorsque la perte de validation cesse de diminuer.

**Choisissez le bon modèle de base.** Commencez avec un modèle ajusté par instructions (comme Llama-2-chat ou Mistral-Instruct) si votre tâche implique de suivre des instructions. Utilisez un modèle de base si vous avez besoin de plus de flexibilité.

**Itérez sur vos données.** Après le fine-tuning initial, analysez les erreurs. Souvent, la solution réside dans de meilleures données d'entraînement, et non dans plus d'epochs ou un modèle plus grand.

## Résumé

Le fine-tuning adapte un LLM pré-entraîné à votre tâche, votre format et votre domaine spécifiques. QLoRA le rend accessible sur des GPU grand public en quantifiant le modèle de base sur 4 bits et en entraînant de petits adaptateurs LoRA. Le workflow est le suivant : préparez votre jeu de données, chargez le modèle quantifié, configurez LoRA, entraînez avec SFTTrainer, évaluez et déployez. Concentrez-vous sur la qualité des données, utilisez une évaluation appropriée et fusionnez l'adaptateur pour le déploiement en production.

---

## Articles liés

- [MLOps with Python: Building Production ML Pipelines](/posts/MLOps-with-Python-Production-ML-Pipelines/) - Déployez et surveillez vos modèles affinés en production avec le suivi des expériences, la CI/CD et le service de modèles
- [RAG with Python: Retrieval-Augmented Generation](/posts/RAG-with-Python-Retrieval-Augmented-Generation/) - Une alternative au fine-tuning qui donne aux LLM accès à des connaissances externes au moment de la requête
- [OpenAI Agents SDK Python Tutorial](/posts/openai-agents-sdk-python/) - Construisez des workflows multi-agents utilisant des outils, propulsés par vos modèles affinés
