---
title: "使用 Python 构建 AI Agents：完整指南"
description: "学习如何使用 OpenAI API 和 LangChain 在 Python 中构建自主的 AI agents。本指南涵盖 agent loop、tool 的使用、memory 以及一个实用的 research agent 示例。"
date: 2026-03-27 12:00:00 +0800
categories: [Python]
tags: [python, ai, agents]
lang: zh
translations: [hi, es, pt, fr, de, ja, ko, ar, zh]
image:
  path: "/commons/Building AI Agents with Python A Complete Guide.webp"
  alt: "使用 Python 构建 AI Agents：完整指南"
---

## 什么是 AI Agents？

AI agent 是一种使用 large language model（LLM）作为其推理引擎的程序，用于决定采取哪些 actions、执行这些 actions、观察结果，并不断重复直到任务完成。与只对单个 prompt 作出响应的简单 chatbot 不同，agent 在一个循环中运作，并且可以调用外部 tools，例如 web searches、databases 或 code interpreters。

chatbot 与 agent 之间的核心区别在于自主性。chatbot 一次回答一个问题。而 agent 会将一个复杂目标分解为多个步骤，并独立地逐步完成它们。

```python
# The simplest possible agent loop
while not task_complete:
    observation = gather_information()
    thought = llm.reason(observation)
    action = select_action(thought)
    result = execute(action)
    task_complete = check_if_done(result)
```

这种 observe-think-act 模式是每一个 AI agent 的基础，无论使用何种 framework 或复杂程度如何。

当我在 Codiste 为诸如使用 Detectron2 进行车辆损伤检测以及使用 YOLO 进行条形码检测等任务构建 agent systems 时，我发现 agent loop 的概念即使在基于 LLM 的系统之外也同样适用。观察一个 input、对其进行推理、并决定采取某个 action 的模式是通用的——LLM 只是让推理这一步变得灵活得多。

## Agent Loop：Observe、Think、Act

每一个 AI agent 都遵循一个循环模式：

1. **Observe** —— 从环境中收集信息（user input、tool outputs、memory）。
2. **Think** —— 使用 LLM 来推理下一步该做什么。
3. **Act** —— 执行所选的 action（调用一个 tool、返回一个 response、更新 state）。

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

LLM 决定何时调用 tools 以及何时停止。你不需要硬编码控制流——model 会根据任务和可用的 tools 自行判断。如果想要一个能为你处理这个 loop 的 production-ready SDK，请参阅 [OpenAI Agents SDK Python 教程](/posts/openai-agents-sdk-python/)。

## 使用 OpenAI API 构建一个简单的 Agent

让我们构建一个可以执行 web searches 和计算的可运行 agent。首先，安装所需的 packages：

```bash
pip install openai requests
```

定义你的 agent 可以使用的 tools：

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

现在定义 OpenAI API 所期望的 tool schemas：

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

运行该 agent：

```python
result = agent_loop(
    user_task="What is the population of France? Then calculate what 15% of that number is.",
    tools=tools,
    max_iterations=5
)
print(result)
```

该 agent 会首先调用 `search_web` 来查找人口数量，然后调用 `calculate` 计算其中的 15%，最后返回一个结合两个结果的自然语言答案。

## 为你的 Agent 添加 Memory

当 agents 能够记住之前的交互时，它们会变得更加有用。memory 有两种类型：

- **Short-term memory** —— 单个 session 内的对话历史（即 `messages` 列表）。
- **Long-term memory** —— 跨 sessions 的持久化存储。

下面是一个使用 JSON file 的简单 long-term memory 实现：

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

通过将 memory context 添加到 system message 前面，将 memory 集成到 agent loop 中：

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

## 使用 LangChain Agents

LangChain 提供了一个用于构建 agents 的更高级别抽象。它为你处理 loop、tool integration 和 memory management。如果你是 LangChain 的新手，请从我们的 [Python 中 LangChain 入门指南](/posts/Beginner-Guide-to-LangChain-in-Python/) 开始。

```bash
pip install langchain langchain-openai langchain-community
```

下面是用 LangChain 构建的同一个 search-and-calculate agent：

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

`verbose=True` 标志会打印每一个步骤，使你可以看到 agent 的推理过程。

## 构建一个 Research Agent

让我们构建一个更实用的示例：一个 research agent，它接收一个主题、搜索信息、汇总发现，并生成一份结构化报告。

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

这个 agent 会执行多个 search queries、收集信息，然后将一份结构化的 markdown 报告写入 disk。

## Error Handling 与可靠性

production agents 需要健壮的 error handling。tools 会失败、APIs 会 timeout，而 LLMs 有时会产生格式错误的 output。

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

你还应该为 agent loop 设置一个最大迭代次数以防止无限循环，并验证 LLM 的 tool calls 所引用的 tools 确实存在。

## 来自 Agents 的结构化 Output

通常你希望 agent 以特定格式返回 data，而不是自由格式的 text。使用 Pydantic models 来强制结构：

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

## 构建 AI Agents 的最佳实践

**保持 tools 简单且专注。** 每个 tool 都应该把一件事做好。一个 `search_web` tool 应该只负责搜索，而不是既搜索又汇总。让 LLM 来处理结果的合并。

**编写清晰的 tool descriptions。** LLM 使用 tool descriptions 来决定何时以及如何调用它们。含糊的 descriptions 会导致错误的 tool 使用。要了解一种在不同 AI clients 之间定义和共享 tools 的标准化方法，请探索 [Model Context Protocol](/posts/model-context-protocol-python/)。

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

**设置迭代上限。** 始终限制 agent loop 可以运行的次数。没有限制，一个困惑的 agent 可能会无限循环并耗尽 API credits。

**记录一切。** 在 production 中，记录每一次 LLM call、每一次 tool execution 以及每一个结果。当 agent 产生错误的 output 时，这些 logs 对调试至关重要。

在 production 中，我发现最大的挑战并不是构建 agent loop 本身，而是处理用户与之交互的各种不可预测的方式。当我在 Codiste 使用 BART 部署一个 generative chatbot 时，user inputs 中的边缘情况导致了 tool selection 失败，这些只在真实流量下才暴露出来。全面的 logging 是唯一能让那些问题可被诊断的方法。

**使用多样化的 inputs 进行测试。** agents 是非确定性的。同一个 input 可能产生不同的 tool call 序列。使用多种变化进行测试以发现失败模式。

## 何时构建 Agent，何时构建 Pipeline

并非每个任务都需要 agent。在以下情况下使用 agent：

- 步骤数量事先未知。
- 下一步取决于上一步的结果。
- 任务需要判断使用哪些 tools。

在以下情况下使用固定的 pipeline：

- 步骤始终相同。
- 你需要确定性的、可重现的行为。
- latency 和成本比灵活性更重要。

一个以固定顺序调用 LLM 三次的 pipeline 始终会比一个需要自行摸索那三个步骤的 agent 更快、更便宜、更可预测。对于那些真正需要自适应推理的任务，才使用 agents。

## 总结

AI agents 将 LLMs 与 tools 以及一个推理 loop 结合起来，以自主地处理复杂任务。其核心模式很简单：observe、think、act、repeat。你可以使用 OpenAI API 从零开始构建 agents，或者使用诸如 LangChain 之类的 frameworks 来加快开发速度。可靠 agents 的关键在于良好的 tool design、清晰的 prompts、error handling 以及迭代上限。从简单开始，彻底测试，仅在任务有需要时才增加复杂性。

---

## 相关文章

- [OpenAI Agents SDK Python Tutorial](/posts/openai-agents-sdk-python/) - 使用官方 SDK，通过 tools、handoffs 和 tracing 构建 production-ready 的 agent workflows
- [Model Context Protocol Python Tutorial](/posts/model-context-protocol-python/) - 使用 MCP 标准化你的 agents 暴露和使用 tools 的方式
- [Beginner Guide to LangChain in Python](/posts/Beginner-Guide-to-LangChain-in-Python/) - 学习 LangChain framework 以构建 agent chains 和 tool integrations
