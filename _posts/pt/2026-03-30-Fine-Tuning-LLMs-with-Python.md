---
title: "Fine-Tuning de Grandes Modelos de Linguagem com Python: Guia Prático"
description: Aprenda a fazer fine-tuning de grandes modelos de linguagem com Python usando LoRA, QLoRA, Hugging Face Transformers e PEFT. Aborda preparação de dados, treinamento, avaliação e implantação.
date: 2026-03-30 12:00:00 +0800
categories: [Python]
tags: [python, ai, llm, fine-tuning]
lang: pt
translations: [hi, es, pt, fr]
image:
  path: "/commons/Fine-Tuning Large Language Models with Python A Practical Guide.webp"
  alt: "Fine-Tuning de Grandes Modelos de Linguagem com Python: Guia Prático"
---

## Por que fazer fine-tuning de um LLM?

Um LLM pré-treinado sabe muito sobre linguagem, mas nada sobre o seu domínio, tom ou formato de tarefa específicos. O fine-tuning adapta um modelo de uso geral às suas necessidades, treinando-o com os seus próprios dados.

```python
# Before fine-tuning
prompt = "Classify this support ticket: 'My order arrived damaged'"
# Model might give a generic, verbose response

# After fine-tuning on your support ticket data
prompt = "Classify this support ticket: 'My order arrived damaged'"
# Model outputs: "Category: Shipping - Damaged Item, Priority: High"
```

Motivos comuns para fazer fine-tuning:

- **Formato de saída consistente** — O modelo aprende a estrutura de resposta exata que você espera.
- **Conhecimento de domínio** — Terminologia e padrões de raciocínio médicos, jurídicos ou financeiros. Para abordagens baseadas em recuperação, veja [RAG with Python](/posts/RAG-with-Python-Retrieval-Augmented-Generation/).
- **Tom e estilo** — Combinar com a voz da sua marca ou com o estilo da sua documentação.
- **Redução de custos** — Um modelo menor com fine-tuning pode superar um modelo geral maior na sua tarefa específica, com um custo de inferência menor.

Quando construí uma pipeline de Document AI na Codiste, fazer fine-tuning de um transformer com documentos específicos do domínio foi o ponto de virada que levou a nossa precisão de extração de medíocre a pronta para produção. O modelo base entendia a linguagem bem o suficiente, mas não conseguia extrair campos estruturados de faturas e contratos de forma confiável até que o treinamos com algumas centenas de exemplos anotados no nosso formato de saída exato.

## Fine-tuning completo vs. LoRA vs. QLoRA

O **fine-tuning completo** atualiza todos os parâmetros do modelo. Isso exige uma enorme memória de GPU (um modelo de 7B parâmetros precisa de mais de 28 GB apenas para os pesos em fp32) e corre o risco de esquecimento catastrófico.

O **LoRA (Low-Rank Adaptation)** congela os pesos originais e injeta pequenas matrizes treináveis em cada camada. Em vez de atualizar milhões de parâmetros, você treina milhares.

```text
Original weight matrix W (4096 x 4096) = 16M parameters
LoRA: W + A × B where A is (4096 x 16) and B is (16 x 4096) = 131K parameters
That's 99.2% fewer trainable parameters.
```

O **QLoRA** vai além ao carregar o modelo base em formato quantizado de 4 bits, reduzindo o uso de memória em 4 vezes enquanto mantém a qualidade. Um modelo de 7B que normalmente precisa de 14 GB em fp16 cabe em cerca de 4 GB com QLoRA.

```python
# Memory comparison for a 7B parameter model
# Full fine-tuning:  ~28 GB (fp32) or ~14 GB (fp16)
# LoRA (fp16):       ~14 GB for weights + ~0.1 GB for LoRA adapters
# QLoRA (4-bit):     ~4 GB for weights + ~0.1 GB for LoRA adapters
```

## Configurando o ambiente

```bash
pip install torch transformers datasets peft trl bitsandbytes accelerate
```

Você precisa de uma GPU para o fine-tuning. Uma única GPU com 16 GB de VRAM (por exemplo, NVIDIA T4 ou RTX 4080) é suficiente para QLoRA em modelos de 7B.

```python
import torch
print(f"CUDA available: {torch.cuda.is_available()}")
if torch.cuda.is_available():
    print(f"GPU: {torch.cuda.get_device_name(0)}")
    print(f"VRAM: {torch.cuda.get_device_properties(0).total_mem / 1e9:.1f} GB")
```

## Preparando o seu conjunto de dados

Os dados de fine-tuning devem ser formatados como pares de instrução-resposta. Veja como preparar um conjunto de dados para o ajuste por instruções:

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

Formate os dados no template de prompt que o seu modelo espera:

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

## Carregando o modelo base com QLoRA

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

## Configurando o LoRA

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

O parâmetro `r` controla o rank das matrizes LoRA. Um rank maior significa mais capacidade, mas mais memória e computação. Valores de 8, 16 ou 32 funcionam bem na prática. O `lora_alpha` é geralmente definido como o dobro do rank.

## Treinamento com SFTTrainer

O `SFTTrainer` da biblioteca `trl` simplifica o fine-tuning supervisionado:

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

### Monitorando o treinamento

Acompanhe a perda de treinamento (training loss) e a perda de avaliação (eval loss). Se a perda de treinamento diminuir, mas a de avaliação aumentar, o modelo está sofrendo overfitting.

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

## Avaliando o modelo com fine-tuning

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

### Avaliação quantitativa

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

## Mesclando os pesos do LoRA para a implantação

Para a implantação em produção, mescle o adaptador LoRA no modelo base para eliminar a sobrecarga do adaptador. Se você está construindo uma pipeline de produção completa, confira [MLOps with Python: Building Production ML Pipelines](/posts/MLOps-with-Python-Production-ML-Pipelines/) para rastreamento de experimentos, servir modelos e CI/CD.

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

## Implantando com vLLM

O vLLM é um motor de inferência de alto throughput que torna prático servir modelos com fine-tuning:

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

Você também pode integrar o seu modelo com fine-tuning em fluxos de trabalho de agentes usando o [OpenAI Agents SDK](/posts/openai-agents-sdk-python/) para sistemas multiagente que usam ferramentas.

Ou sirva-o como uma API:

```bash
python -m vllm.entrypoints.openai.api_server \
    --model ./merged_model \
    --dtype float16 \
    --port 8000
```

Em seguida, chame-o como uma API da OpenAI:

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

## Dicas para um melhor fine-tuning

**A qualidade dos dados importa mais do que a quantidade.** 500 exemplos diversos e de alta qualidade muitas vezes superam 5000 ruidosos. Revise seus dados de treinamento manualmente. Na minha experiência fazendo fine-tuning de transformers na Codiste, descobri que gastar dois dias limpando e removendo duplicatas de 400 exemplos de treinamento produzia um modelo melhor do que apressar 2000 ruidosos. Cada exemplo mal rotulado em um conjunto de dados pequeno tem um impacto negativo desproporcional no modelo final.

**Comece com uma taxa de aprendizado pequena.** Para LoRA, de 1e-4 a 2e-4 funciona bem. Para o fine-tuning completo, use de 1e-5 a 5e-5. Uma taxa de aprendizado muito alta destrói o conhecimento pré-treinado.

**Use um conjunto de validação.** Sempre reserve de 10 a 20% dos seus dados para avaliação. Pare o treinamento quando a perda de validação parar de diminuir.

**Escolha o modelo base certo.** Comece com um modelo ajustado por instruções (como Llama-2-chat ou Mistral-Instruct) se a sua tarefa envolver seguir instruções. Use um modelo base se precisar de mais flexibilidade.

**Itere sobre os seus dados.** Após o fine-tuning inicial, analise os erros. Muitas vezes a solução são dados de treinamento melhores, não mais epochs ou um modelo maior.

## Resumo

O fine-tuning adapta um LLM pré-treinado à sua tarefa, formato e domínio específicos. O QLoRA torna isso acessível em GPUs de consumo ao quantizar o modelo base para 4 bits e treinar pequenos adaptadores LoRA. O fluxo de trabalho é: prepare o seu conjunto de dados, carregue o modelo quantizado, configure o LoRA, treine com o SFTTrainer, avalie e implante. Foque na qualidade dos dados, use uma avaliação adequada e mescle o adaptador para a implantação em produção.

---

## Publicações relacionadas

- [MLOps with Python: Building Production ML Pipelines](/posts/MLOps-with-Python-Production-ML-Pipelines/) - Implante e monitore seus modelos com fine-tuning em produção com rastreamento de experimentos, CI/CD e serviço de modelos
- [RAG with Python: Retrieval-Augmented Generation](/posts/RAG-with-Python-Retrieval-Augmented-Generation/) - Uma alternativa ao fine-tuning que dá aos LLMs acesso a conhecimento externo no momento da consulta
- [OpenAI Agents SDK Python Tutorial](/posts/openai-agents-sdk-python/) - Construa fluxos de trabalho multiagente que usam ferramentas, impulsionados pelos seus modelos com fine-tuning
