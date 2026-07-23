---
title: "Supervised Fine-Tuning (SFT) for LLMs: A Python Guide"
description: A practical guide to supervised fine-tuning of LLMs in Python using TRL and LoRA — data format, training loop, and when SFT beats prompting or RAG.
date: 2026-07-14 14:00:00 +0530
categories: [Python, AI]
tags: [python, fine-tuning, sft, lora, llm]
image:
  path: "/commons/Supervised Fine-Tuning SFT for LLMs A Python Guide.webp"
  alt: "Supervised fine-tuning pipeline turning instruction-response pairs into an adapted model"
---

## When Prompting Isn't Enough

Prompting and RAG cover most needs. But when you want a model to reliably adopt a format, tone, or narrow skill — every time, without long instructions — supervised fine-tuning (SFT) is the tool. SFT trains the model on input-output pairs so the behavior is baked in. This guide runs it in Python with TRL and LoRA.

```bash
pip install trl peft transformers datasets
```

## The Data Format

SFT data is pairs: a prompt and the ideal completion. Quality beats quantity — a few hundred clean examples often beat thousands of noisy ones.

```python
from datasets import Dataset

examples = [
    {"prompt": "Summarize: The meeting was rescheduled to Friday at 3pm.",
     "completion": "Meeting moved to Friday 3pm."},
    {"prompt": "Summarize: The server crashed twice due to a memory leak.",
     "completion": "Server crashed twice; cause was a memory leak."},
    # ... hundreds more, consistent in style
]

def to_text(ex):
    return {"text": f"### Instruction:\n{ex['prompt']}\n\n### Response:\n{ex['completion']}"}

dataset = Dataset.from_list(examples).map(to_text)
```

The template matters: use the same one at training and inference. If you train on `### Instruction:` and prompt differently in production, quality drops.

## LoRA: Fine-Tuning Without the Full Cost

Full fine-tuning updates every weight and needs serious GPU memory. LoRA trains small adapter matrices instead — a fraction of the parameters, often under 1% — with nearly the same result. This is what makes SFT affordable.

```python
from peft import LoraConfig

peft_config = LoraConfig(
    r=16,                 # adapter rank; higher = more capacity, more memory
    lora_alpha=32,
    lora_dropout=0.05,
    task_type="CAUSAL_LM",
    target_modules=["q_proj", "v_proj"],
)
```

Pair LoRA with [quantization](/posts/Quantization-for-LLMs-Run-Big-Models-on-Small-Hardware/) (QLoRA) and you can fine-tune billion-parameter models on a single consumer GPU.

## The Training Loop

TRL's `SFTTrainer` wraps the whole loop — tokenization, batching, gradient steps.

```python
from transformers import AutoModelForCausalLM, AutoTokenizer
from trl import SFTTrainer, SFTConfig

model_name = "meta-llama/Llama-3.2-1B"
tokenizer = AutoTokenizer.from_pretrained(model_name)
model = AutoModelForCausalLM.from_pretrained(model_name)

trainer = SFTTrainer(
    model=model,
    train_dataset=dataset,
    peft_config=peft_config,
    args=SFTConfig(
        output_dir="./sft-out",
        num_train_epochs=3,
        per_device_train_batch_size=4,
        learning_rate=2e-4,
    ),
)
trainer.train()
```

Watch the loss. If it drops to near zero on training data but the model repeats itself on new inputs, you overfit — reduce epochs or add more varied data.

## SFT vs Prompting vs RAG

Reach for SFT when you need consistent behavior that prompting can't enforce and the knowledge is a *skill*, not a *fact*. Use [RAG](/posts/Building-a-RAG-Evaluation-Pipeline-with-Python/) when the model needs current or private facts — fine-tuning bakes knowledge in at a fixed date and is expensive to update. Many production systems use both: SFT for behavior, RAG for facts.

## Frequently Asked Questions

### How much data do I need for SFT?

Often a few hundred to a few thousand high-quality pairs. Consistency matters more than volume — every example should model the exact behavior you want repeated.

### What is the difference between LoRA and full fine-tuning?

Full fine-tuning updates all model weights and needs large GPU memory. LoRA freezes the base model and trains tiny adapter matrices, cutting memory and storage while matching most of the quality.

### Does fine-tuning teach the model new facts?

Poorly. Fine-tuning is strong for format and behavior but unreliable for injecting facts, which it may hallucinate or forget. Use retrieval for factual grounding.

## Takeaways

- SFT trains on prompt-completion pairs to bake in behavior.
- Use a consistent prompt template at training and inference.
- LoRA plus quantization makes fine-tuning cheap; use RAG for facts.

For a full worked example on real hardware, see [fine-tuning NVIDIA Nemotron Nano](/posts/fine-tuning-nvidia-nemotron-nano/).
