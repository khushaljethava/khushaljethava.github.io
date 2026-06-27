---
title: "الضبط الدقيق لنماذج اللغة الكبيرة باستخدام Python: دليل عملي"
description: تعلّم كيفية إجراء الضبط الدقيق لنماذج اللغة الكبيرة باستخدام Python مع LoRA وQLoRA وHugging Face Transformers وPEFT. يغطي إعداد مجموعة البيانات والتدريب والتقييم والنشر.
date: 2026-03-30 12:00:00 +0800
categories: [Python]
tags: [python, ai, llm, fine-tuning]
lang: ar
translations: [hi, es, pt, fr, de, ja, ko, ar]
image:
  path: "/commons/Fine-Tuning Large Language Models with Python A Practical Guide.webp"
  alt: "الضبط الدقيق لنماذج اللغة الكبيرة باستخدام Python: دليل عملي"
---

## لماذا نُجري الضبط الدقيق لنموذج LLM؟

يعرف نموذج LLM المُدرَّب مسبقًا الكثير عن اللغة، لكنه لا يعرف شيئًا عن مجالك المحدد أو نبرتك أو تنسيق مهامك. يُكيّف الضبط الدقيق نموذجًا عام الغرض ليناسب احتياجاتك من خلال تدريبه على بياناتك الخاصة.

```python
# Before fine-tuning
prompt = "Classify this support ticket: 'My order arrived damaged'"
# Model might give a generic, verbose response

# After fine-tuning on your support ticket data
prompt = "Classify this support ticket: 'My order arrived damaged'"
# Model outputs: "Category: Shipping - Damaged Item, Priority: High"
```

أسباب شائعة لإجراء الضبط الدقيق:

- **تنسيق إخراج متسق** — يتعلم النموذج بنية الاستجابة المتوقعة بدقة.
- **معرفة المجال** — المصطلحات وأنماط الاستدلال الطبية أو القانونية أو المالية. للأساليب القائمة على الاسترجاع بدلاً من ذلك، انظر [RAG with Python](/posts/RAG-with-Python-Retrieval-Augmented-Generation/).
- **النبرة والأسلوب** — مطابقة صوت علامتك التجارية أو أسلوب التوثيق الخاص بك.
- **خفض التكلفة** — يمكن لنموذج أصغر تم ضبطه دقيقًا أن يتفوق على نموذج عام أكبر في مهمتك المحددة، بتكلفة استدلال أقل.

عندما بنيتُ خط أنابيب Document AI في Codiste، كان الضبط الدقيق لمحول (transformer) على مستندات خاصة بالمجال هو نقطة التحول التي رفعت دقة الاستخراج لدينا من المتوسطة إلى الجاهزة للإنتاج. كان النموذج الأساسي يفهم اللغة جيدًا بما فيه الكفاية، لكنه لم يتمكن من استخراج الحقول المنظمة من الفواتير والعقود بشكل موثوق حتى دربناه على بضع مئات من الأمثلة المُعلَّمة بتنسيق الإخراج الدقيق الخاص بنا.

## الضبط الدقيق الكامل مقابل LoRA مقابل QLoRA

**الضبط الدقيق الكامل** يُحدّث كل معامل في النموذج. يتطلب هذا ذاكرة GPU هائلة (يحتاج نموذج بـ 7 مليارات معامل إلى أكثر من 28 جيجابايت للأوزان فقط بصيغة fp32) ويُخاطر بالنسيان الكارثي.

**LoRA (Low-Rank Adaptation)** يُجمّد الأوزان الأصلية ويُدخل مصفوفات صغيرة قابلة للتدريب في كل طبقة. فبدلاً من تحديث ملايين المعاملات، تُدرّب الآلاف منها.

```text
Original weight matrix W (4096 x 4096) = 16M parameters
LoRA: W + A × B where A is (4096 x 16) and B is (16 x 4096) = 131K parameters
That's 99.2% fewer trainable parameters.
```

**QLoRA** يذهب أبعد من ذلك بتحميل النموذج الأساسي بصيغة مُكمّمة بـ 4 بت، مما يقلل استخدام الذاكرة بمقدار 4 أضعاف مع الحفاظ على الجودة. النموذج بـ 7 مليارات معامل الذي يحتاج عادةً إلى 14 جيجابايت بصيغة fp16 يتسع في حوالي 4 جيجابايت مع QLoRA.

```python
# Memory comparison for a 7B parameter model
# Full fine-tuning:  ~28 GB (fp32) or ~14 GB (fp16)
# LoRA (fp16):       ~14 GB for weights + ~0.1 GB for LoRA adapters
# QLoRA (4-bit):     ~4 GB for weights + ~0.1 GB for LoRA adapters
```

## إعداد البيئة

```bash
pip install torch transformers datasets peft trl bitsandbytes accelerate
```

تحتاج إلى وحدة GPU لإجراء الضبط الدقيق. وحدة GPU واحدة بذاكرة 16 جيجابايت VRAM (مثل NVIDIA T4 أو RTX 4080) كافية لـ QLoRA على نماذج بـ 7 مليارات معامل.

```python
import torch
print(f"CUDA available: {torch.cuda.is_available()}")
if torch.cuda.is_available():
    print(f"GPU: {torch.cuda.get_device_name(0)}")
    print(f"VRAM: {torch.cuda.get_device_properties(0).total_mem / 1e9:.1f} GB")
```

## إعداد مجموعة البيانات الخاصة بك

يجب تنسيق بيانات الضبط الدقيق على شكل أزواج من التعليمات والاستجابات. إليك كيفية إعداد مجموعة بيانات لضبط التعليمات (instruction tuning):

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

نسّق البيانات إلى قالب المُوجّه (prompt template) الذي يتوقعه نموذجك:

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

## تحميل النموذج الأساسي باستخدام QLoRA

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

## تكوين LoRA

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

يتحكم المعامل `r` في رتبة مصفوفات LoRA. تعني الرتبة الأعلى سعة أكبر لكن ذاكرة وحوسبة أكثر. تعمل القيم 8 أو 16 أو 32 جيدًا في الممارسة العملية. عادةً ما يُضبط `lora_alpha` على ضعف الرتبة.

## التدريب باستخدام SFTTrainer

يُبسّط `SFTTrainer` من مكتبة `trl` عملية الضبط الدقيق الخاضع للإشراف:

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

### مراقبة التدريب

راقب خسارة التدريب وخسارة التقييم. إذا انخفضت خسارة التدريب لكن ازدادت خسارة التقييم، فإن النموذج يُعاني من فرط التخصيص (overfitting).

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

## تقييم النموذج المُضبَط دقيقًا

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

### التقييم الكمي

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

## دمج أوزان LoRA للنشر

للنشر في الإنتاج، ادمج محوّل LoRA في النموذج الأساسي للقضاء على العبء الإضافي للمحوّل. إذا كنت تبني خط أنابيب إنتاج كاملًا، فاطلّع على [MLOps with Python: Building Production ML Pipelines](/posts/MLOps-with-Python-Production-ML-Pipelines/) لتتبع التجارب وخدمة النماذج وCI/CD.

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

## النشر باستخدام vLLM

vLLM هو محرك استدلال عالي الإنتاجية يجعل خدمة النماذج المُضبَطة دقيقًا أمرًا عمليًا:

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

يمكنك أيضًا دمج نموذجك المُضبَط دقيقًا في سير عمل الوكلاء باستخدام [OpenAI Agents SDK](/posts/openai-agents-sdk-python/) لأنظمة متعددة الوكلاء تستخدم الأدوات.

أو قدّمه كواجهة برمجة تطبيقات (API):

```bash
python -m vllm.entrypoints.openai.api_server \
    --model ./merged_model \
    --dtype float16 \
    --port 8000
```

ثم استدعِه مثل واجهة OpenAI API:

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

## نصائح لضبط دقيق أفضل

**جودة البيانات أهم من كمية البيانات.** غالبًا ما يتفوق 500 مثال عالي الجودة ومتنوع على 5000 مثال مليء بالضوضاء. راجع بيانات التدريب الخاصة بك يدويًا. من واقع خبرتي في الضبط الدقيق للمحولات في Codiste، وجدتُ أن قضاء يومين في تنظيف وإزالة تكرار 400 مثال تدريبي أنتج نموذجًا أفضل من التسرع عبر 2000 مثال مليء بالضوضاء. كل مثال خاطئ التصنيف في مجموعة بيانات صغيرة له تأثير سلبي مُبالغ فيه على النموذج النهائي.

**ابدأ بمعدل تعلّم صغير.** بالنسبة لـ LoRA، يعمل المعدل من 1e-4 إلى 2e-4 جيدًا. بالنسبة للضبط الدقيق الكامل، استخدم من 1e-5 إلى 5e-5. معدل التعلّم المرتفع جدًا يُدمّر المعرفة المُدرَّبة مسبقًا.

**استخدم مجموعة تحقق (validation set).** احتفظ دائمًا بنسبة 10-20% من بياناتك للتقييم. أوقف التدريب عندما تتوقف خسارة التحقق عن الانخفاض.

**اختر النموذج الأساسي المناسب.** ابدأ بنموذج مُضبَط على التعليمات (مثل Llama-2-chat أو Mistral-Instruct) إذا كانت مهمتك تتضمن اتباع التعليمات. استخدم نموذجًا أساسيًا إذا كنت بحاجة إلى مزيد من المرونة.

**كرّر العمل على بياناتك.** بعد الضبط الدقيق الأولي، حلّل الأخطاء. غالبًا ما يكون الحل بيانات تدريب أفضل، وليس مزيدًا من الحقب (epochs) أو نموذجًا أكبر.

## الملخص

يُكيّف الضبط الدقيق نموذج LLM المُدرَّب مسبقًا ليناسب مهمتك وتنسيقك ومجالك المحدد. يجعل QLoRA هذا الأمر متاحًا على وحدات GPU الاستهلاكية من خلال تكميم النموذج الأساسي إلى 4 بت وتدريب محولات LoRA صغيرة. سير العمل هو: إعداد مجموعة البيانات، تحميل النموذج المُكمّم، تكوين LoRA، التدريب باستخدام SFTTrainer، التقييم، والنشر. ركّز على جودة البيانات، استخدم تقييمًا مناسبًا، وادمج المحوّل للنشر في الإنتاج.

---

## مقالات ذات صلة

- [MLOps with Python: Building Production ML Pipelines](/posts/MLOps-with-Python-Production-ML-Pipelines/) - انشر وراقب نماذجك المُضبَطة دقيقًا في الإنتاج مع تتبع التجارب وCI/CD وخدمة النماذج
- [RAG with Python: Retrieval-Augmented Generation](/posts/RAG-with-Python-Retrieval-Augmented-Generation/) - بديل للضبط الدقيق يمنح نماذج LLM الوصول إلى المعرفة الخارجية وقت الاستعلام
- [OpenAI Agents SDK Python Tutorial](/posts/openai-agents-sdk-python/) - ابنِ سير عمل متعدد الوكلاء يستخدم الأدوات ومدعومًا بنماذجك المُضبَطة دقيقًا
