---
title: "Prompt Engineering Techniques in Python: A Practical Guide"
description: Practical prompt engineering in Python — few-shot prompting, chain-of-thought, structured output, and role prompting, each with runnable code and when to use it.
date: 2026-07-14 11:00:00 +0530
categories: [Python, AI]
tags: [python, prompt-engineering, llm, few-shot, chain-of-thought]
image:
  path: "/commons/Prompt Engineering Techniques in Python.webp"
  alt: "Comparison of prompting techniques feeding into an LLM and producing structured output"
---

## Prompting Is Just API Calls You Can Test

Prompt engineering has a reputation for being vibes and magic words. In practice it's a small set of techniques you can measure. This guide shows four that actually move accuracy, each as runnable Python. No theory dumps — just the pattern and when to use it.

```bash
pip install openai
```

```python
from openai import OpenAI
client = OpenAI()

def ask(prompt, system="You are a helpful assistant."):
    r = client.chat.completions.create(
        model="gpt-4o-mini",
        messages=[
            {"role": "system", "content": system},
            {"role": "user", "content": prompt},
        ],
    )
    return r.choices[0].message.content
```

## Zero-Shot vs Few-Shot

Zero-shot asks directly. Few-shot shows examples of the input-output pattern first. Use few-shot when the task has a specific format the model keeps getting wrong.

```python
# Zero-shot: format is unpredictable
ask("Classify sentiment: 'The battery dies too fast.'")

# Few-shot: examples lock in the format
ask("""Classify sentiment as POSITIVE, NEGATIVE, or NEUTRAL.

Review: 'Fast shipping, love it.' -> POSITIVE
Review: 'It broke in a week.' -> NEGATIVE
Review: 'It arrived on time.' -> NEUTRAL
Review: 'The battery dies too fast.' ->""")
```

Two or three examples usually get 80% of the benefit. Adding twenty rarely beats adding three, and it costs more tokens.

## Chain-of-Thought for Reasoning

For multi-step problems, asking the model to reason before answering reduces errors. The trigger phrase is literally "think step by step."

```python
ask("""A shop sells pens at 3 for $2. I buy 12 pens and pay with a $20 bill.
How much change do I get? Think step by step, then give the final number.""")
```

The model works through the arithmetic instead of guessing. For a deeper look at models trained to reason natively, see [building a reasoning LLM from scratch](/posts/Build-a-Reasoning-LLM-from-Scratch-in-Python/).

## Structured Output You Can Parse

Free-text answers are painful to consume in code. Ask for JSON and enforce it.

```python
import json

def extract(text):
    raw = ask(f"""Extract name and email as JSON with keys "name" and "email".
Return only JSON, no prose.

Text: {text}""")
    return json.loads(raw)

print(extract("Reach Priya at priya@example.com about the invoice."))
# {'name': 'Priya', 'email': 'priya@example.com'}
```

Wrap the `json.loads` in a try/except — models occasionally add a stray sentence. Better yet, use your provider's structured-output or function-calling mode, which guarantees valid JSON.

## Role and System Prompting

The system prompt sets behavior for the whole conversation. Use it for tone, constraints, and persona — not for the actual task.

```python
ask(
    "Explain a hash map.",
    system="You are a terse senior engineer. Answer in under 40 words. No analogies.",
)
```

Constraints in the system prompt ("under 40 words", "no analogies") are more reliable than burying them in the user message.

## Cost and Caching

Every technique above adds tokens. Few-shot examples and long system prompts repeat on every call. If you send the same prefix repeatedly, prompt caching cuts the cost dramatically — see [prompt caching explained](/posts/Prompt-Caching-Explained-How-It-Cuts-LLM-Costs/).

## Frequently Asked Questions

### How many few-shot examples should I use?

Start with three and measure. Most tasks plateau quickly; extra examples mostly add token cost. Pick examples that cover the edge cases you keep failing.

### Does "think step by step" always help?

It helps on reasoning and math tasks, and can slightly hurt on simple lookups by adding noise. Test it against your own examples rather than applying it everywhere.

### Should prompts go in the system or user message?

Behavior and constraints go in the system message; the actual input goes in the user message. This separation keeps prompts reusable across different inputs.

## Takeaways

- Few-shot for format control, chain-of-thought for reasoning.
- Ask for JSON and parse defensively — or use structured-output mode.
- Put constraints in the system prompt, and cache repeated prefixes.

Once your prompts are solid, wire them into a [tool-calling agent](/posts/Build-an-LLM-Agent-from-Scratch-in-Python/) to let the model act on its answers.
