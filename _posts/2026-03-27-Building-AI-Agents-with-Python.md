---
title: "Building AI Agents with Python: A Complete Guide"
description: Learn how to build autonomous AI agents with Python using OpenAI API and LangChain. This guide covers the agent loop, tool use, memory, and a practical research agent example.
date: 2026-03-27 12:00:00 +0800
categories: [Python]
tags: [python, ai, agents]
image:
  path: "/commons/Building AI Agents with Python A Complete Guide.webp"
  alt: "Building AI Agents with Python: A Complete Guide"
---

## What Are AI Agents?

An AI agent is a program that uses a large language model (LLM) as its reasoning engine to decide what actions to take, execute those actions, observe the results, and repeat until a task is complete. Unlike a simple chatbot that responds to a single prompt, an agent operates in a loop and can call external tools like web searches, databases, or code interpreters.

The core difference between a chatbot and an agent is autonomy. A chatbot answers one question at a time. An agent breaks down a complex goal into steps and works through them independently.

```python
# The simplest possible agent loop
while not task_complete:
    observation = gather_information()
    thought = llm.reason(observation)
    action = select_action(thought)
    result = execute(action)
    task_complete = check_if_done(result)
```

This observe-think-act pattern is the foundation of every AI agent, regardless of framework or complexity.

When I built agent systems at Codiste for tasks like car damage detection with Detectron2 and barcode detection with YOLO, I found that the agent loop concept applies even outside of LLM-based systems. The pattern of observing an input, reasoning about it, and deciding on an action is universal -- the LLM just makes the reasoning step far more flexible.

## The Agent Loop: Observe, Think, Act

Every AI agent follows a cyclic pattern:

1. **Observe** -- Collect information from the environment (user input, tool outputs, memory).
2. **Think** -- Use the LLM to reason about what to do next.
3. **Act** -- Execute a chosen action (call a tool, return a response, update state).

```python
import openai

client = openai.OpenAI()

def agent_loop(user_task: str, tools: list, max_iterations: int = 10):
    messages = [
        {"role": "system", "content": "You are a helpful assistant that completes tasks step by step. Use the available tools when needed."},
        {"role": "user", "content": user_task}
    ]

    for i in range(max_iterations):
        response = client.chat.completions.create(
            model="gpt-4o",
            messages=messages,
            tools=tools,
            tool_choice="auto"
        )

        message = response.choices[0].message
        messages.append(message)

        # If no tool calls, the agent is done
        if not message.tool_calls:
            return message.content

        # Execute each tool call
        for tool_call in message.tool_calls:
            result = execute_tool(tool_call.function.name, tool_call.function.arguments)
            messages.append({
                "role": "tool",
                "tool_call_id": tool_call.id,
                "content": str(result)
            })

    return "Max iterations reached."
```

The LLM decides when to call tools and when to stop. You do not hard-code the control flow -- the model figures it out based on the task and available tools. For a production-ready SDK that handles this loop for you, see the [OpenAI Agents SDK Python tutorial](/posts/openai-agents-sdk-python/).

## Building a Simple Agent with the OpenAI API

Let us build a working agent that can perform web searches and calculations. First, install the required packages:

```bash
pip install openai requests
```

Define the tools your agent can use:

```python
import json
import requests
import openai

client = openai.OpenAI()

# Define tool functions
def search_web(query: str) -> str:
    """Search the web using a search API."""
    url = "https://api.duckduckgo.com/"
    params = {"q": query, "format": "json", "no_html": 1}
    response = requests.get(url, params=params)
    data = response.json()
    if data.get("AbstractText"):
        return data["AbstractText"]
    topics = data.get("RelatedTopics", [])
    results = []
    for topic in topics[:3]:
        if "Text" in topic:
            results.append(topic["Text"])
    return "\n".join(results) if results else "No results found."

def calculate(expression: str) -> str:
    """Evaluate a mathematical expression safely."""
    allowed_names = {"__builtins__": {}}
    try:
        result = eval(expression, allowed_names)
        return str(result)
    except Exception as e:
        return f"Error: {e}"

# Map function names to actual functions
tool_functions = {
    "search_web": search_web,
    "calculate": calculate,
}

def execute_tool(name: str, arguments: str):
    args = json.loads(arguments)
    func = tool_functions.get(name)
    if func:
        return func(**args)
    return f"Unknown tool: {name}"
```

Now define the tool schemas that the OpenAI API expects:

```python
tools = [
    {
        "type": "function",
        "function": {
            "name": "search_web",
            "description": "Search the web for information on a topic.",
            "parameters": {
                "type": "object",
                "properties": {
                    "query": {
                        "type": "string",
                        "description": "The search query"
                    }
                },
                "required": ["query"]
            }
        }
    },
    {
        "type": "function",
        "function": {
            "name": "calculate",
            "description": "Evaluate a mathematical expression. Example: '2 + 2' or '100 * 1.05 ** 10'",
            "parameters": {
                "type": "object",
                "properties": {
                    "expression": {
                        "type": "string",
                        "description": "The math expression to evaluate"
                    }
                },
                "required": ["expression"]
            }
        }
    }
]
```

Run the agent:

```python
result = agent_loop(
    user_task="What is the population of France? Then calculate what 15% of that number is.",
    tools=tools,
    max_iterations=5
)
print(result)
```

The agent will first call `search_web` to find the population, then call `calculate` to compute 15% of it, and finally return a natural language answer combining both results.

## Adding Memory to Your Agent

Agents become more useful when they can remember previous interactions. There are two types of memory:

- **Short-term memory** -- The conversation history within a single session (the `messages` list).
- **Long-term memory** -- Persistent storage across sessions.

Here is a simple long-term memory implementation using a JSON file:

```python
import json
from pathlib import Path

class AgentMemory:
    def __init__(self, filepath: str = "agent_memory.json"):
        self.filepath = Path(filepath)
        self.data = self._load()

    def _load(self) -> dict:
        if self.filepath.exists():
            return json.loads(self.filepath.read_text())
        return {"facts": [], "past_tasks": []}

    def save(self):
        self.filepath.write_text(json.dumps(self.data, indent=2))

    def add_fact(self, fact: str):
        if fact not in self.data["facts"]:
            self.data["facts"].append(fact)
            self.save()

    def add_task(self, task: str, result: str):
        self.data["past_tasks"].append({"task": task, "result": result})
        self.save()

    def get_context(self) -> str:
        facts = "\n".join(f"- {f}" for f in self.data["facts"][-20:])
        tasks = "\n".join(
            f"- Task: {t['task']} -> Result: {t['result'][:100]}"
            for t in self.data["past_tasks"][-5:]
        )
        return f"Known facts:\n{facts}\n\nRecent tasks:\n{tasks}"
```

Integrate memory into the agent loop by prepending the memory context to the system message:

```python
memory = AgentMemory()

def agent_with_memory(user_task: str, tools: list):
    context = memory.get_context()
    messages = [
        {"role": "system", "content": f"You are a helpful assistant.\n\nMemory:\n{context}"},
        {"role": "user", "content": user_task}
    ]
    result = agent_loop_internal(messages, tools)
    memory.add_task(user_task, result)
    return result
```

## Using LangChain Agents

LangChain provides a higher-level abstraction for building agents. It handles the loop, tool integration, and memory management for you. If you are new to LangChain, start with our [Beginner Guide to LangChain in Python](/posts/Beginner-Guide-to-LangChain-in-Python/).

```bash
pip install langchain langchain-openai langchain-community
```

Here is the same search-and-calculate agent built with LangChain:

```python
from langchain_openai import ChatOpenAI
from langchain.agents import AgentExecutor, create_tool_calling_agent
from langchain_core.prompts import ChatPromptTemplate
from langchain_core.tools import tool

@tool
def search_web(query: str) -> str:
    """Search the web for information about a topic."""
    import requests
    url = "https://api.duckduckgo.com/"
    params = {"q": query, "format": "json", "no_html": 1}
    resp = requests.get(url, params=params)
    data = resp.json()
    return data.get("AbstractText", "No results found.")

@tool
def calculate(expression: str) -> str:
    """Evaluate a mathematical expression like '2 + 2' or '100 * 0.15'."""
    try:
        return str(eval(expression, {"__builtins__": {}}))
    except Exception as e:
        return f"Error: {e}"

llm = ChatOpenAI(model="gpt-4o", temperature=0)
tools = [search_web, calculate]

prompt = ChatPromptTemplate.from_messages([
    ("system", "You are a helpful research assistant. Use tools when needed."),
    ("human", "{input}"),
    ("placeholder", "{agent_scratchpad}"),
])

agent = create_tool_calling_agent(llm, tools, prompt)
executor = AgentExecutor(agent=agent, tools=tools, verbose=True)

result = executor.invoke({"input": "What is the GDP of Japan and what is 3.5% of it?"})
print(result["output"])
```

The `verbose=True` flag prints each step so you can see the agent's reasoning process.

## Building a Research Agent

Let us build a more practical example: a research agent that takes a topic, searches for information, summarizes findings, and produces a structured report.

```python
import json
import requests
from datetime import datetime
from langchain_openai import ChatOpenAI
from langchain_core.tools import tool
from langchain.agents import AgentExecutor, create_tool_calling_agent
from langchain_core.prompts import ChatPromptTemplate

@tool
def web_search(query: str) -> str:
    """Search the web and return top results for a query."""
    url = "https://api.duckduckgo.com/"
    params = {"q": query, "format": "json", "no_html": 1}
    resp = requests.get(url, params=params)
    data = resp.json()
    results = []
    if data.get("AbstractText"):
        results.append(data["AbstractText"])
    for topic in data.get("RelatedTopics", [])[:5]:
        if "Text" in topic:
            results.append(topic["Text"])
    return "\n\n".join(results) if results else "No results found."

@tool
def save_report(title: str, content: str) -> str:
    """Save a research report to a markdown file."""
    timestamp = datetime.now().strftime("%Y%m%d_%H%M%S")
    filename = f"report_{timestamp}.md"
    with open(filename, "w") as f:
        f.write(f"# {title}\n\n")
        f.write(f"*Generated on {datetime.now().strftime('%Y-%m-%d %H:%M')}*\n\n")
        f.write(content)
    return f"Report saved to {filename}"

@tool
def read_file(filepath: str) -> str:
    """Read the contents of a file."""
    try:
        with open(filepath, "r") as f:
            return f.read()
    except FileNotFoundError:
        return f"File {filepath} not found."

llm = ChatOpenAI(model="gpt-4o", temperature=0)
tools = [web_search, save_report, read_file]

prompt = ChatPromptTemplate.from_messages([
    ("system", """You are a research agent. When given a topic:
1. Search for information using multiple queries.
2. Synthesize the findings into a structured report with sections.
3. Save the report to a file.
Always cite your sources and be thorough."""),
    ("human", "{input}"),
    ("placeholder", "{agent_scratchpad}"),
])

agent = create_tool_calling_agent(llm, tools, prompt)
executor = AgentExecutor(agent=agent, tools=tools, verbose=True, max_iterations=15)

result = executor.invoke({
    "input": "Research the current state of quantum computing and produce a report covering major players, recent breakthroughs, and practical applications."
})
print(result["output"])
```

This agent will make multiple search queries, collect information, and then write a structured markdown report to disk.

## Error Handling and Reliability

Production agents need robust error handling. Tools fail, APIs time out, and LLMs sometimes produce malformed output.

```python
import time
import logging

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger("agent")

def execute_tool_safe(name: str, arguments: str, retries: int = 2):
    """Execute a tool with retry logic."""
    for attempt in range(retries + 1):
        try:
            args = json.loads(arguments)
            func = tool_functions.get(name)
            if not func:
                return f"Unknown tool: {name}"
            result = func(**args)
            return result
        except json.JSONDecodeError:
            logger.error(f"Failed to parse arguments: {arguments}")
            return "Error: Invalid arguments format."
        except requests.exceptions.Timeout:
            if attempt < retries:
                logger.warning(f"Tool {name} timed out, retrying ({attempt + 1}/{retries})")
                time.sleep(2 ** attempt)
            else:
                return "Error: Tool timed out after retries."
        except Exception as e:
            logger.error(f"Tool {name} failed: {e}")
            return f"Error: {e}"
```

You should also set a maximum iteration count on the agent loop to prevent infinite loops, and validate that the LLM's tool calls reference tools that actually exist.

## Structured Output from Agents

Often you want an agent to return data in a specific format, not free-form text. Use Pydantic models to enforce structure:

```python
from pydantic import BaseModel
from typing import List

class ResearchReport(BaseModel):
    title: str
    summary: str
    key_findings: List[str]
    sources: List[str]
    confidence_score: float

def agent_with_structured_output(task: str, tools: list) -> ResearchReport:
    raw_result = agent_loop(task, tools)

    response = client.beta.chat.completions.parse(
        model="gpt-4o",
        messages=[
            {"role": "system", "content": "Extract the research report into the required JSON format."},
            {"role": "user", "content": raw_result}
        ],
        response_format=ResearchReport
    )

    return response.choices[0].message.parsed
```

## Best Practices for Building AI Agents

**Keep tools simple and focused.** Each tool should do one thing well. A `search_web` tool should search, not search and summarize. Let the LLM handle combining results.

**Write clear tool descriptions.** The LLM uses tool descriptions to decide when and how to call them. Vague descriptions lead to incorrect tool usage. For a standardized approach to defining and sharing tools across AI clients, explore the [Model Context Protocol](/posts/model-context-protocol-python/).

```python
# Bad description
@tool
def process(data: str) -> str:
    """Process data."""
    ...

# Good description
@tool
def extract_emails(text: str) -> str:
    """Extract all email addresses from the given text. Returns a comma-separated list of emails found."""
    ...
```

**Set iteration limits.** Always cap how many times the agent loop can run. Without limits, a confused agent can loop indefinitely and burn through API credits.

**Log everything.** In production, log every LLM call, every tool execution, and every result. When an agent produces incorrect output, these logs are essential for debugging.

In production, I found that the biggest challenge is not building the agent loop itself but handling the unpredictable ways users interact with it. When I deployed a generative chatbot using BART at Codiste, edge cases in user inputs caused tool selection failures that only showed up under real traffic. Comprehensive logging was the only thing that made those issues diagnosable.

**Test with diverse inputs.** Agents are non-deterministic. The same input can produce different tool call sequences. Test with many variations to find failure modes.

## When to Build an Agent vs. a Pipeline

Not every task needs an agent. Use an agent when:

- The number of steps is unknown in advance.
- The next step depends on the result of the previous step.
- The task requires judgment about which tools to use.

Use a fixed pipeline when:

- The steps are always the same.
- You need deterministic, reproducible behavior.
- Latency and cost matter more than flexibility.

A pipeline that calls an LLM three times in a fixed order will always be faster, cheaper, and more predictable than an agent that figures out those three steps on its own. Use agents for tasks that genuinely require adaptive reasoning.

## Summary

AI agents combine LLMs with tools and a reasoning loop to tackle complex tasks autonomously. The core pattern is straightforward: observe, think, act, repeat. You can build agents from scratch using the OpenAI API or use frameworks like LangChain for faster development. The key to reliable agents is good tool design, clear prompts, error handling, and iteration limits. Start simple, test thoroughly, and add complexity only when the task demands it.

---

## Related Posts

- [OpenAI Agents SDK Python Tutorial](/posts/openai-agents-sdk-python/) - Build production-ready agent workflows with tools, handoffs, and tracing using the official SDK
- [Model Context Protocol Python Tutorial](/posts/model-context-protocol-python/) - Standardize how your agents expose and consume tools with MCP
- [Beginner Guide to LangChain in Python](/posts/Beginner-Guide-to-LangChain-in-Python/) - Learn the LangChain framework for building agent chains and tool integrations
