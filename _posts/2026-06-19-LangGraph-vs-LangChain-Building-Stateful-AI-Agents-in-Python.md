---
title: "LangGraph vs LangChain: Building Stateful AI Agents in Python"
description: Compare LangGraph and LangChain for building AI agents in Python. Learn when to use chains vs graphs, how state and cycles work, and build a working multi-step agent with LangGraph.
date: 2026-06-19 10:00:00 +0530
categories: [Python, AI]
tags: [python, langgraph, langchain, ai-agents, llm]
image:
  path: "/commons/LangGraph vs LangChain Building Stateful AI Agents in Python.webp"
  alt: "LangGraph vs LangChain comparison diagram for building stateful AI agents in Python"
---

## The Core Difference

LangChain models workflows as **chains** — mostly linear sequences of steps. LangGraph models them as **graphs** — nodes and edges that can loop, branch, and maintain state across steps. If your agent needs to retry, re-plan, or wait for a human approval before continuing, a chain gets awkward fast. A graph handles it naturally.

If you've already built agents from [Building AI Agents with Python](/posts/Building-AI-Agents-with-Python/) or used the [OpenAI Agents SDK](/posts/openai-agents-sdk-python/), LangGraph solves the same problem with an explicit state machine instead of an SDK's built-in loop.

```bash
pip install langgraph langchain langchain-openai
```

## When LangChain Is Enough

For straightforward pipelines — retrieve, then prompt, then parse — a chain is simpler and easier to read:

```python
from langchain_openai import ChatOpenAI
from langchain_core.prompts import ChatPromptTemplate
from langchain_core.output_parsers import StrOutputParser

llm = ChatOpenAI(model="gpt-4o-mini")
prompt = ChatPromptTemplate.from_template("Summarize this in one sentence: {text}")

chain = prompt | llm | StrOutputParser()
result = chain.invoke({"text": "Long article text here..."})
print(result)
```

This is fine until the workflow needs to branch based on the output, retry on failure, or call itself again with refined input. That's where graphs win.

## When You Need LangGraph

LangGraph represents your agent as a graph of nodes (functions) and edges (transitions), with a shared state object that persists across the whole run.

```python
from typing import TypedDict
from langgraph.graph import StateGraph, END

class AgentState(TypedDict):
    question: str
    draft: str
    attempts: int
    final: str
```

This `AgentState` is the single source of truth every node reads from and writes to — no passing context manually between functions.

## Building a Self-Correcting Agent

Here's a graph that drafts an answer, critiques it, and retries up to 3 times if the critique fails:

```python
from langgraph.graph import StateGraph, END
from langchain_openai import ChatOpenAI

llm = ChatOpenAI(model="gpt-4o-mini")

def draft_node(state: AgentState) -> AgentState:
    response = llm.invoke(f"Answer this question: {state['question']}")
    return {**state, "draft": response.content, "attempts": state["attempts"] + 1}

def critique_node(state: AgentState) -> AgentState:
    critique = llm.invoke(
        f"Is this answer correct and complete? Reply only YES or NO.\n\nQ: {state['question']}\nA: {state['draft']}"
    )
    passed = "YES" in critique.content.upper()
    return {**state, "final": state["draft"] if passed else ""}

def should_retry(state: AgentState) -> str:
    if state["final"]:
        return "end"
    if state["attempts"] >= 3:
        return "end"
    return "retry"

graph = StateGraph(AgentState)
graph.add_node("draft", draft_node)
graph.add_node("critique", critique_node)

graph.set_entry_point("draft")
graph.add_edge("draft", "critique")
graph.add_conditional_edges("critique", should_retry, {"retry": "draft", "end": END})

app = graph.compile()
```

```python
result = app.invoke({"question": "What is the time complexity of binary search?", "draft": "", "attempts": 0, "final": ""})
print(result["final"])
```

```text
Binary search has O(log n) time complexity because it halves the search space on each comparison.
```

The `add_conditional_edges` call is the part LangChain can't express cleanly — a loop that runs until a condition is met, with full state carried across every iteration.

## Adding a Human-in-the-Loop Checkpoint

LangGraph supports interrupting execution to wait for human input — useful for approval workflows:

```python
from langgraph.checkpoint.memory import MemorySaver

memory = MemorySaver()
app = graph.compile(checkpointer=memory, interrupt_before=["critique"])

config = {"configurable": {"thread_id": "session-1"}}
app.invoke({"question": "Draft a refund policy", "draft": "", "attempts": 0, "final": ""}, config=config)

# Execution pauses before "critique" — inspect state, then resume:
app.invoke(None, config=config)
```

This pattern — pause, inspect, resume — is exactly what production agents need before taking an irreversible action like sending an email or charging a card.

## Decision Table

| Scenario | Use |
|---|---|
| Linear retrieve → prompt → parse | LangChain |
| Retry loops, self-correction | LangGraph |
| Multi-agent handoff with shared state | LangGraph |
| Human approval checkpoints | LangGraph |
| Simple RAG question-answering | LangChain |

## Key Takeaways

- LangChain is best for linear, single-pass pipelines
- LangGraph is best when your agent needs loops, branches, or persistent state across steps
- `StateGraph` with a `TypedDict` state gives every node a shared, typed context
- `add_conditional_edges` is how you implement retry and self-correction loops
- Checkpointing with `interrupt_before` enables human-in-the-loop approval gates
- You can use both together: LangChain components as nodes inside a LangGraph

## Related Posts

- [Building AI Agents with Python: A Complete Guide](/posts/Building-AI-Agents-with-Python/) -- Compare this state-machine approach to other agent architectures.
- [OpenAI Agents SDK with Python](/posts/openai-agents-sdk-python/) -- See how a different SDK handles agent loops and tool calling.
- [Model Context Protocol with Python](/posts/model-context-protocol-python/) -- Connect tools to your LangGraph agents using a standardized protocol.
