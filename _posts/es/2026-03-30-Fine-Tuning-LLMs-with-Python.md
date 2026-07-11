---
title: "Fine-Tuning de Grandes Modelos de Lenguaje con Python: Guía Práctica"
description: Aprende a ajustar (fine-tuning) grandes modelos de lenguaje con Python usando LoRA, QLoRA, Hugging Face Transformers y PEFT. Cubre la preparación de datos, el entrenamiento, la evaluación y el despliegue.
date: 2026-03-30 12:00:00 +0800
categories: [Python]
tags: [python, ai, llm, fine-tuning]
lang: es
translations: [hi, es, pt, fr, de, ja, ko, ar]
image:
  path: "/commons/Fine-Tuning Large Language Models with Python A Practical Guide.webp"
  alt: "Fine-Tuning de Grandes Modelos de Lenguaje con Python: Guía Práctica"
---

## ¿Por qué hacer fine-tuning a un LLM?

Un LLM preentrenado sabe mucho sobre el lenguaje, pero nada sobre tu dominio, tono o formato de tarea específicos. El fine-tuning adapta un modelo de propósito general a tus necesidades entrenándolo con tus propios datos.

```python
# Before fine-tuning
prompt = "Classify this support ticket: 'My order arrived damaged'"
# Model might give a generic, verbose response

# After fine-tuning on your support ticket data
prompt = "Classify this support ticket: 'My order arrived damaged'"
# Model outputs: "Category: Shipping - Damaged Item, Priority: High"
```

Razones habituales para hacer fine-tuning:

- **Formato de salida coherente** — El modelo aprende tu estructura de respuesta esperada exacta.
- **Conocimiento de dominio** — Terminología y patrones de razonamiento médicos, jurídicos o financieros. Para enfoques basados en recuperación, consulta [RAG with Python](/posts/RAG-with-Python-Retrieval-Augmented-Generation/).
- **Tono y estilo** — Ajustarse a la voz de tu marca o al estilo de tu documentación.
- **Reducción de costes** — Un modelo más pequeño con fine-tuning puede superar a un modelo general más grande en tu tarea específica, con un coste de inferencia menor.

Cuando construí una pipeline de Document AI en Codiste, hacer fine-tuning a un transformer con documentos específicos del dominio fue el punto de inflexión que llevó nuestra precisión de extracción de mediocre a lista para producción. El modelo base entendía el lenguaje lo suficientemente bien, pero no podía extraer de forma fiable campos estructurados de facturas y contratos hasta que lo entrenamos con unos cientos de ejemplos anotados en nuestro formato de salida exacto.

## Fine-tuning completo vs. LoRA vs. QLoRA

El **fine-tuning completo** actualiza todos los parámetros del modelo. Esto requiere una memoria de GPU enorme (un modelo de 7B parámetros necesita más de 28 GB solo para los pesos en fp32) y arriesga el olvido catastrófico.

**LoRA (Low-Rank Adaptation)** congela los pesos originales e inyecta pequeñas matrices entrenables en cada capa. En lugar de actualizar millones de parámetros, entrenas miles.

```text
Original weight matrix W (4096 x 4096) = 16M parameters
LoRA: W + A × B where A is (4096 x 16) and B is (16 x 4096) = 131K parameters
That's 99.2% fewer trainable parameters.
```

**QLoRA** va más allá cargando el modelo base en formato cuantizado de 4 bits, reduciendo el uso de memoria 4 veces mientras mantiene la calidad. Un modelo de 7B que normalmente necesita 14 GB en fp16 cabe en unos 4 GB con QLoRA.

```python
# Memory comparison for a 7B parameter model
# Full fine-tuning:  ~28 GB (fp32) or ~14 GB (fp16)
# LoRA (fp16):       ~14 GB for weights + ~0.1 GB for LoRA adapters
# QLoRA (4-bit):     ~4 GB for weights + ~0.1 GB for LoRA adapters
```

## Configurar el entorno

```bash
pip install torch transformers datasets peft trl bitsandbytes accelerate
```

Necesitas una GPU para el fine-tuning. Una sola GPU con 16 GB de VRAM (por ejemplo, NVIDIA T4 o RTX 4080) es suficiente para QLoRA en modelos de 7B.

```python
import torch
print(f"CUDA available: {torch.cuda.is_available()}")
if torch.cuda.is_available():
    print(f"GPU: {torch.cuda.get_device_name(0)}")
    print(f"VRAM: {torch.cuda.get_device_properties(0).total_mem / 1e9:.1f} GB")
```

## Preparar tu conjunto de datos

Los datos de fine-tuning deben formatearse como pares de instrucción-respuesta. Así se prepara un conjunto de datos para el ajuste por instrucciones:

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

Formatea los datos en la plantilla de prompt que espera tu modelo:

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

## Cargar el modelo base con QLoRA

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

## Configurar LoRA

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

El parámetro `r` controla el rango de las matrices LoRA. Un rango más alto significa más capacidad, pero más memoria y cómputo. Valores de 8, 16 o 32 funcionan bien en la práctica. El `lora_alpha` se suele fijar en el doble del rango.

## Entrenamiento con SFTTrainer

El `SFTTrainer` de la librería `trl` simplifica el fine-tuning supervisado:

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

### Supervisar el entrenamiento

Observa la pérdida de entrenamiento (training loss) y la pérdida de evaluación (eval loss). Si la pérdida de entrenamiento disminuye pero la de evaluación aumenta, el modelo está sobreajustando.

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

## Evaluar el modelo con fine-tuning

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

### Evaluación cuantitativa

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

## Fusionar los pesos de LoRA para el despliegue

Para el despliegue en producción, fusiona el adaptador LoRA en el modelo base para eliminar la sobrecarga del adaptador. Si estás construyendo una pipeline de producción completa, consulta [MLOps with Python: Building Production ML Pipelines](/posts/MLOps-with-Python-Production-ML-Pipelines/) para el seguimiento de experimentos, el servicio de modelos y la CI/CD.

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

## Desplegar con vLLM

vLLM es un motor de inferencia de alto rendimiento que hace práctico el servicio de modelos con fine-tuning:

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

También puedes integrar tu modelo con fine-tuning en flujos de trabajo de agentes usando el [OpenAI Agents SDK](/posts/openai-agents-sdk-python/) para sistemas multiagente que usan herramientas.

O sírvelo como una API:

```bash
python -m vllm.entrypoints.openai.api_server \
    --model ./merged_model \
    --dtype float16 \
    --port 8000
```

Luego llámalo como una API de OpenAI:

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

## Consejos para un mejor fine-tuning

**La calidad de los datos importa más que la cantidad.** 500 ejemplos diversos y de alta calidad suelen superar a 5000 ruidosos. Revisa tus datos de entrenamiento manualmente. Según mi experiencia haciendo fine-tuning a transformers en Codiste, descubrí que dedicar dos días a limpiar y eliminar duplicados de 400 ejemplos de entrenamiento producía un mejor modelo que apresurarse con 2000 ruidosos. Cada ejemplo mal etiquetado en un conjunto de datos pequeño tiene un impacto negativo desproporcionado en el modelo final.

**Empieza con una tasa de aprendizaje pequeña.** Para LoRA, de 1e-4 a 2e-4 funciona bien. Para el fine-tuning completo, usa de 1e-5 a 5e-5. Una tasa de aprendizaje demasiado alta destruye el conocimiento preentrenado.

**Usa un conjunto de validación.** Reserva siempre entre el 10 y el 20 % de tus datos para la evaluación. Detén el entrenamiento cuando la pérdida de validación deje de disminuir.

**Elige el modelo base adecuado.** Empieza con un modelo ajustado por instrucciones (como Llama-2-chat o Mistral-Instruct) si tu tarea implica seguir instrucciones. Usa un modelo base si necesitas más flexibilidad.

**Itera sobre tus datos.** Tras el fine-tuning inicial, analiza los errores. A menudo la solución son mejores datos de entrenamiento, no más epochs ni un modelo más grande.

## Resumen

El fine-tuning adapta un LLM preentrenado a tu tarea, formato y dominio específicos. QLoRA lo hace accesible en GPU de consumo cuantizando el modelo base a 4 bits y entrenando pequeños adaptadores LoRA. El flujo de trabajo es: prepara tu conjunto de datos, carga el modelo cuantizado, configura LoRA, entrena con SFTTrainer, evalúa y despliega. Céntrate en la calidad de los datos, usa una evaluación adecuada y fusiona el adaptador para el despliegue en producción.

---

## Publicaciones relacionadas

- [MLOps with Python: Building Production ML Pipelines](/posts/MLOps-with-Python-Production-ML-Pipelines/) - Despliega y supervisa tus modelos con fine-tuning en producción con seguimiento de experimentos, CI/CD y servicio de modelos
- [RAG with Python: Retrieval-Augmented Generation](/posts/RAG-with-Python-Retrieval-Augmented-Generation/) - Una alternativa al fine-tuning que da a los LLM acceso a conocimiento externo en el momento de la consulta
- [OpenAI Agents SDK Python Tutorial](/posts/openai-agents-sdk-python/) - Construye flujos de trabajo multiagente que usan herramientas, impulsados por tus modelos con fine-tuning
