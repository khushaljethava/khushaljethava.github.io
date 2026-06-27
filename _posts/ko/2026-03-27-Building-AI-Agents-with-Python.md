---
title: "Python으로 AI Agents 구축하기: 완전 가이드"
description: "OpenAI API와 LangChain을 사용하여 Python으로 자율 AI agents를 구축하는 방법을 배웁니다. 이 가이드는 agent loop, tool 사용, memory, 그리고 실용적인 research agent 예제를 다룹니다."
date: 2026-03-27 12:00:00 +0800
categories: [Python]
tags: [python, ai, agents]
lang: ko
translations: [hi, es, pt, fr, de, ja, ko, ar, zh]
image:
  path: "/commons/Building AI Agents with Python A Complete Guide.webp"
  alt: "Python으로 AI Agents 구축하기: 완전 가이드"
---

## AI Agents란 무엇인가?

AI agent는 large language model (LLM)을 추론 엔진으로 사용하여 어떤 action을 취할지 결정하고, 그 action을 실행하며, 결과를 관찰하고, 작업이 완료될 때까지 이를 반복하는 프로그램입니다. 단일 prompt에 응답하는 단순한 chatbot과 달리, agent는 loop 안에서 작동하며 web searches, databases, code interpreters 같은 외부 tools를 호출할 수 있습니다.

chatbot과 agent의 핵심적인 차이는 자율성입니다. chatbot은 한 번에 하나의 질문에 답합니다. agent는 복잡한 목표를 단계로 분해하고 그것들을 독립적으로 처리합니다.

```python
# The simplest possible agent loop
while not task_complete:
    observation = gather_information()
    thought = llm.reason(observation)
    action = select_action(thought)
    result = execute(action)
    task_complete = check_if_done(result)
```

이 observe-think-act 패턴은 framework나 복잡성에 관계없이 모든 AI agent의 기반입니다.

제가 Codiste에서 Detectron2를 사용한 car damage detection과 YOLO를 사용한 barcode detection 같은 작업을 위해 agent systems를 구축했을 때, agent loop 개념이 LLM 기반 시스템 밖에서도 적용된다는 것을 발견했습니다. input을 관찰하고, 그것에 대해 추론하며, action을 결정하는 패턴은 보편적입니다 -- LLM은 단지 그 추론 단계를 훨씬 더 유연하게 만들 뿐입니다.

## Agent Loop: Observe, Think, Act

모든 AI agent는 순환적 패턴을 따릅니다.

1. **Observe** -- environment에서 정보를 수집합니다 (user input, tool outputs, memory).
2. **Think** -- 다음에 무엇을 할지 추론하기 위해 LLM을 사용합니다.
3. **Act** -- 선택한 action을 실행합니다 (tool을 호출하고, response를 반환하고, state를 업데이트합니다).

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

LLM이 언제 tools를 호출하고 언제 멈출지 결정합니다. 당신은 control flow를 하드코딩하지 않습니다 -- model이 작업과 사용 가능한 tools를 바탕으로 스스로 알아냅니다. 이 loop를 대신 처리해주는 프로덕션 준비된 SDK에 대해서는 [OpenAI Agents SDK Python 튜토리얼](/posts/openai-agents-sdk-python/)을 참조하세요.

## OpenAI API로 간단한 Agent 구축하기

web searches와 계산을 수행할 수 있는 작동하는 agent를 구축해 봅시다. 먼저 필요한 packages를 설치합니다.

```bash
pip install openai requests
```

agent가 사용할 수 있는 tools를 정의합니다.

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

이제 OpenAI API가 기대하는 tool schemas를 정의합니다.

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

agent를 실행합니다.

```python
result = agent_loop(
    user_task="What is the population of France? Then calculate what 15% of that number is.",
    tools=tools,
    max_iterations=5
)
print(result)
```

agent는 먼저 인구를 찾기 위해 `search_web`를 호출하고, 그다음 그것의 15%를 계산하기 위해 `calculate`를 호출하며, 마지막으로 두 결과를 결합한 자연어 답변을 반환합니다.

## Agent에 Memory 추가하기

agents는 이전 상호작용을 기억할 수 있을 때 더 유용해집니다. memory에는 두 가지 유형이 있습니다.

- **Short-term memory** -- 단일 session 내의 대화 기록 (`messages` list).
- **Long-term memory** -- session 간에 걸친 영구 저장소.

다음은 JSON file을 사용한 간단한 long-term memory 구현입니다.

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

memory context를 system message 앞에 추가하여 memory를 agent loop에 통합합니다.

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

## LangChain Agents 사용하기

LangChain은 agents를 구축하기 위한 더 높은 수준의 추상화를 제공합니다. loop, tool integration, memory management를 대신 처리해줍니다. LangChain이 처음이라면 [Python에서 LangChain 입문 가이드](/posts/Beginner-Guide-to-LangChain-in-Python/)로 시작하세요.

```bash
pip install langchain langchain-openai langchain-community
```

다음은 LangChain으로 구축한 동일한 search-and-calculate agent입니다.

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

`verbose=True` flag는 각 단계를 print하므로 agent의 추론 과정을 볼 수 있습니다.

## Research Agent 구축하기

더 실용적인 예제를 구축해 봅시다. 주제를 받아 정보를 검색하고, 결과를 요약하며, 구조화된 보고서를 생성하는 research agent입니다.

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

이 agent는 여러 search queries를 수행하고, 정보를 수집한 다음, 구조화된 markdown 보고서를 disk에 작성합니다.

## Error Handling 및 신뢰성

프로덕션 agents에는 견고한 error handling이 필요합니다. tools는 실패하고, APIs는 타임아웃되며, LLMs는 때때로 잘못된 형식의 output을 생성합니다.

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

또한 infinite loops를 방지하기 위해 agent loop에 최대 iteration count를 설정하고, LLM의 tool calls가 실제로 존재하는 tools를 참조하는지 검증해야 합니다.

## Agents로부터의 구조화된 Output

종종 agent가 자유 형식의 텍스트가 아니라 특정 형식으로 data를 반환하기를 원할 것입니다. 구조를 강제하기 위해 Pydantic models를 사용하세요.

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

## AI Agents 구축을 위한 모범 사례

**tools를 단순하고 집중되게 유지하세요.** 각 tool은 한 가지 일을 잘 수행해야 합니다. `search_web` tool은 검색해야 하며, 검색하고 요약해서는 안 됩니다. 결과를 결합하는 것은 LLM이 처리하도록 하세요.

**명확한 tool descriptions를 작성하세요.** LLM은 tool descriptions를 사용하여 언제 어떻게 tools를 호출할지 결정합니다. 모호한 descriptions는 잘못된 tool 사용으로 이어집니다. AI clients 간에 tools를 정의하고 공유하는 표준화된 접근 방식에 대해서는 [Model Context Protocol](/posts/model-context-protocol-python/)을 탐색하세요.

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

**iteration limits를 설정하세요.** agent loop가 실행될 수 있는 횟수를 항상 제한하세요. 제한이 없으면 혼란스러운 agent가 무한히 loop하며 API credits를 소진할 수 있습니다.

**모든 것을 log하세요.** 프로덕션에서는 모든 LLM call, 모든 tool execution, 모든 결과를 log하세요. agent가 잘못된 output을 생성할 때, 이러한 logs는 debugging에 필수적입니다.

프로덕션에서, 제가 발견한 가장 큰 도전은 agent loop 자체를 구축하는 것이 아니라 users가 그것과 상호작용하는 예측할 수 없는 방식을 처리하는 것이었습니다. 제가 Codiste에서 BART를 사용한 generative chatbot을 deploy했을 때, user inputs의 edge cases가 tool selection failures를 일으켰고, 그것은 실제 트래픽에서만 나타났습니다. 포괄적인 logging만이 그러한 문제를 진단 가능하게 만든 유일한 것이었습니다.

**다양한 inputs로 테스트하세요.** agents는 비결정론적입니다. 동일한 input이 서로 다른 tool call sequences를 생성할 수 있습니다. failure modes를 찾기 위해 많은 변형으로 테스트하세요.

## Agent를 구축할 때 vs Pipeline을 구축할 때

모든 작업에 agent가 필요한 것은 아닙니다. 다음과 같은 경우에 agent를 사용하세요.

- 단계 수가 사전에 알려지지 않은 경우.
- 다음 단계가 이전 단계의 결과에 의존하는 경우.
- 작업이 어떤 tools를 사용할지에 대한 판단을 요구하는 경우.

다음과 같은 경우에 고정된 pipeline을 사용하세요.

- 단계가 항상 동일한 경우.
- 결정론적이고 재현 가능한 동작이 필요한 경우.
- 유연성보다 latency와 비용이 더 중요한 경우.

LLM을 고정된 순서로 세 번 호출하는 pipeline은 그 세 단계를 스스로 알아내는 agent보다 항상 더 빠르고, 더 저렴하며, 더 예측 가능합니다. 진정으로 적응적 추론을 요구하는 작업에는 agents를 사용하세요.

## 요약

AI agents는 LLMs를 tools 및 추론 loop와 결합하여 복잡한 작업을 자율적으로 처리합니다. 핵심 패턴은 간단합니다. observe, think, act, repeat. OpenAI API를 사용하여 처음부터 agents를 구축하거나 더 빠른 개발을 위해 LangChain 같은 frameworks를 사용할 수 있습니다. 신뢰할 수 있는 agents의 핵심은 좋은 tool design, 명확한 prompts, error handling, 그리고 iteration limits입니다. 간단하게 시작하고, 철저히 테스트하며, 작업이 요구할 때만 복잡성을 추가하세요.

---

## 관련 게시물

- [OpenAI Agents SDK Python Tutorial](/posts/openai-agents-sdk-python/) - 공식 SDK를 사용하여 tools, handoffs, tracing을 갖춘 프로덕션 준비된 agent workflows를 구축하기
- [Model Context Protocol Python Tutorial](/posts/model-context-protocol-python/) - MCP로 agents가 tools를 노출하고 사용하는 방식을 표준화하기
- [Beginner Guide to LangChain in Python](/posts/Beginner-Guide-to-LangChain-in-Python/) - agent chains와 tool integrations를 구축하기 위한 LangChain framework 배우기
