---
title: "Build an LLM Agent from Scratch in Python"
description: Build a working LLM agent in Python without a framework — a tool-calling loop, a tool registry, and reasoning steps. Understand what LangChain and LangGraph do under the hood.
date: 2026-07-14 10:00:00 +0530
categories: [Python, AI]
tags: [python, llm-agents, ai-agents, tool-calling, llm]
image:
  path: "/commons/Build an LLM Agent from Scratch in Python.webp"
  alt: "Diagram of an LLM agent loop calling tools and feeding results back to the model"
---

## What an "Agent" Actually Is

Strip away the marketing and an LLM agent is a loop: the model decides which tool to call, your code runs the tool, the result goes back to the model, repeat until the model answers. That's it. Frameworks like [LangGraph and LangChain](/posts/LangGraph-vs-LangChain-Building-Stateful-AI-Agents-in-Python/) add state and structure, but the core fits in about 50 lines.

```bash
pip install openai
```

## The Tool Registry

A tool is just a Python function plus a schema the model can read.

```python
def get_weather(city: str) -> str:
    # pretend this hits a real API
    return f"It's 22C and sunny in {city}."

def add(a: float, b: float) -> str:
    return str(a + b)

TOOLS = {"get_weather": get_weather, "add": add}

SCHEMAS = [
    {
        "type": "function",
        "function": {
            "name": "get_weather",
            "description": "Get current weather for a city.",
            "parameters": {
                "type": "object",
                "properties": {"city": {"type": "string"}},
                "required": ["city"],
            },
        },
    },
    {
        "type": "function",
        "function": {
            "name": "add",
            "description": "Add two numbers.",
            "parameters": {
                "type": "object",
                "properties": {"a": {"type": "number"}, "b": {"type": "number"}},
                "required": ["a", "b"],
            },
        },
    },
]
```

## The Agent Loop

The model returns either a final answer or a request to call a tool. We run the tool, append the result, and call the model again.

```python
import json
from openai import OpenAI

client = OpenAI()

def run_agent(question: str, max_steps: int = 5) -> str:
    messages = [{"role": "user", "content": question}]

    for _ in range(max_steps):
        response = client.chat.completions.create(
            model="gpt-4o-mini",
            messages=messages,
            tools=SCHEMAS,
        )
        msg = response.choices[0].message
        messages.append(msg)

        if not msg.tool_calls:
            return msg.content  # model is done

        for call in msg.tool_calls:
            fn = TOOLS[call.function.name]
            args = json.loads(call.function.arguments)
            result = fn(**args)
            messages.append({
                "role": "tool",
                "tool_call_id": call.id,
                "content": result,
            })

    return "Stopped: hit max steps."
```

Run it:

```python
print(run_agent("What's the weather in Tokyo, and what's 19 plus 23?"))
# The model calls get_weather("Tokyo") and add(19, 23), then answers both.
```

## Why the Loop Matters

The `max_steps` cap is not optional. A confused model can loop forever, calling tools and never answering — every step costs a real API call. Cap it, log each step, and fail loudly.

The other trap is trusting tool arguments blindly. The model generates `args` as free text; validate them before running anything that touches a filesystem, a database, or money. Treat tool inputs like user input, because that's effectively what they are.

## Adding Memory

Right now the agent forgets everything between calls to `run_agent`. Persist `messages` across turns and you have a stateful conversational agent. If your tools are slow (network, disk), run them concurrently — see [Python async/await for AI pipelines](/posts/Python-Async-Await-for-AI-Pipelines-A-Practical-Guide/).

## When to Reach for a Framework

Build from scratch when you have a handful of tools and one linear loop — it's less code and you can read every line at 3am. Move to LangGraph when you need branching workflows, retries, human-in-the-loop approval, or shared state across many agents. The from-scratch version above is the mental model; the framework is the same idea with guardrails.

## Frequently Asked Questions

### Do I need OpenAI specifically?

No. Any model with a tool-calling API works — Anthropic's Claude, or a local model via Ollama. The loop is identical; only the client call changes. See [building a local AI chatbot with Ollama](/posts/Building-a-Local-AI-Chatbot-with-Ollama-and-Python/).

### How do agents avoid infinite loops?

A hard step cap, plus logging every tool call so you can see when the model is stuck repeating itself. Some setups also detect identical repeated calls and break early.

### Is this how LangChain works internally?

Essentially yes. LangChain and LangGraph wrap this same call-tool-repeat loop with state management, error handling, and observability on top.

## Takeaways

- An agent is a bounded loop: model picks a tool, you run it, feed the result back.
- Always cap steps and validate tool arguments.
- Frameworks add structure, not magic — the core is ~50 lines.

Next, wire your agent's tools into a real knowledge base with a [RAG evaluation pipeline](/posts/Building-a-RAG-Evaluation-Pipeline-with-Python/).
