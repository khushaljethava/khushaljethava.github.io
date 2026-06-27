---
title: "Python で AI Agents を構築する：完全ガイド"
description: "OpenAI API と LangChain を使って Python で自律的な AI agents を構築する方法を学びます。本ガイドでは agent loop、tool の利用、memory、そして実用的な research agent の例を取り上げます。"
date: 2026-03-27 12:00:00 +0800
categories: [Python]
tags: [python, ai, agents]
lang: ja
translations: [hi, es, pt, fr, de, ja, ko, ar, zh]
image:
  path: "/commons/Building AI Agents with Python A Complete Guide.webp"
  alt: "Python で AI Agents を構築する：完全ガイド"
---

## AI Agents とは何か？

AI agent とは、large language model (LLM) を推論エンジンとして使用し、どのような action を取るかを決定し、それらの action を実行し、結果を観察し、タスクが完了するまでこれを繰り返すプログラムです。単一の prompt に応答する単純な chatbot とは異なり、agent は loop の中で動作し、web searches、databases、code interpreters などの外部 tools を呼び出すことができます。

chatbot と agent の核心的な違いは自律性です。chatbot は一度に一つの質問に答えます。agent は複雑な目標をステップに分解し、それらを独立して処理します。

```python
# The simplest possible agent loop
while not task_complete:
    observation = gather_information()
    thought = llm.reason(observation)
    action = select_action(thought)
    result = execute(action)
    task_complete = check_if_done(result)
```

この observe-think-act パターンは、framework や複雑さに関係なく、あらゆる AI agent の基盤です。

私が Codiste で Detectron2 を使った car damage detection や YOLO を使った barcode detection などのタスク向けに agent systems を構築したとき、agent loop の概念が LLM ベースのシステムの外でも適用できることがわかりました。input を観察し、それについて推論し、action を決定するというパターンは普遍的です -- LLM は単にその推論ステップをはるかに柔軟にするだけです。

## Agent Loop：Observe、Think、Act

すべての AI agent は循環的なパターンに従います。

1. **Observe** -- environment から情報を収集します（user input、tool outputs、memory）。
2. **Think** -- 次に何をすべきかを推論するために LLM を使用します。
3. **Act** -- 選択した action を実行します（tool を呼び出す、response を返す、state を更新する）。

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

LLM がいつ tools を呼び出すか、いつ停止するかを決定します。あなたは control flow をハードコードしません -- model がタスクと利用可能な tools に基づいてそれを自分で判断します。この loop を代わりに処理してくれる本番対応の SDK については、[OpenAI Agents SDK Python チュートリアル](/posts/openai-agents-sdk-python/) を参照してください。

## OpenAI API で簡単な Agent を構築する

web searches と計算を実行できる動作する agent を構築してみましょう。まず、必要な packages をインストールします。

```bash
pip install openai requests
```

agent が使用できる tools を定義します。

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

次に、OpenAI API が期待する tool schemas を定義します。

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

agent を実行します。

```python
result = agent_loop(
    user_task="What is the population of France? Then calculate what 15% of that number is.",
    tools=tools,
    max_iterations=5
)
print(result)
```

agent はまず人口を調べるために `search_web` を呼び出し、次にその 15% を計算するために `calculate` を呼び出し、最後に両方の結果を組み合わせた自然言語の回答を返します。

## Agent に Memory を追加する

agents は以前のやり取りを記憶できると、より有用になります。memory には 2 種類あります。

- **Short-term memory** -- 単一の session 内での会話履歴（`messages` list）。
- **Long-term memory** -- session をまたいだ永続的なストレージ。

以下は JSON file を使った簡単な long-term memory の実装です。

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

memory context を system message の先頭に付加することで、memory を agent loop に統合します。

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

## LangChain Agents を使う

LangChain は agents を構築するためのより高水準の抽象化を提供します。loop、tool integration、memory management を代わりに処理してくれます。LangChain が初めての方は、[Python における LangChain の初心者ガイド](/posts/Beginner-Guide-to-LangChain-in-Python/) から始めてください。

```bash
pip install langchain langchain-openai langchain-community
```

以下は LangChain で構築した同じ search-and-calculate agent です。

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

`verbose=True` flag は各ステップを print するので、agent の推論プロセスを確認できます。

## Research Agent を構築する

より実用的な例を構築してみましょう。テーマを受け取り、情報を検索し、結果を要約し、構造化されたレポートを作成する research agent です。

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

この agent は複数の search queries を実行し、情報を収集し、それから構造化された markdown レポートを disk に書き込みます。

## Error Handling と信頼性

本番の agents には堅牢な error handling が必要です。tools は失敗し、APIs はタイムアウトし、LLMs は時として不正な output を生成します。

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

infinite loops を防ぐために agent loop に最大 iteration count も設定し、LLM の tool calls が実際に存在する tools を参照していることを検証する必要があります。

## Agents からの構造化された Output

多くの場合、agent には自由形式のテキストではなく、特定の形式で data を返してほしいでしょう。構造を強制するために Pydantic models を使用します。

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

## AI Agents を構築するためのベストプラクティス

**tools をシンプルで焦点を絞ったものに保つ。** 各 tool は一つのことをうまく行うべきです。`search_web` tool は検索すべきであり、検索して要約するべきではありません。結果の組み合わせは LLM に任せましょう。

**明確な tool descriptions を書く。** LLM は tool descriptions を使って、いつどのように tools を呼び出すかを決定します。曖昧な descriptions は誤った tool の使用につながります。AI clients 間で tools を定義し共有するための標準化されたアプローチについては、[Model Context Protocol](/posts/model-context-protocol-python/) を探求してください。

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

**iteration limits を設定する。** agent loop が実行できる回数を常に上限で制限してください。制限がなければ、混乱した agent は無限に loop し続け、API credits を使い果たす可能性があります。

**すべてを log する。** 本番環境では、すべての LLM call、すべての tool execution、すべての結果を log してください。agent が誤った output を生成したとき、これらの logs は debugging に不可欠です。

本番環境で、私が見出した最大の課題は agent loop そのものを構築することではなく、users がそれとやり取りする予測不可能な方法を扱うことでした。私が Codiste で BART を使った generative chatbot を deploy したとき、user inputs の edge cases が tool selection failures を引き起こし、それは実際のトラフィックの下でのみ現れました。包括的な logging だけが、それらの問題を診断可能にしてくれた唯一のものでした。

**多様な inputs でテストする。** agents は非決定論的です。同じ input が異なる tool call sequences を生成する可能性があります。failure modes を見つけるために多くのバリエーションでテストしてください。

## Agent を構築するべきか Pipeline を構築するべきか

すべてのタスクに agent が必要なわけではありません。次の場合に agent を使用します。

- ステップ数が事前に不明な場合。
- 次のステップが前のステップの結果に依存する場合。
- タスクがどの tools を使うかについての判断を必要とする場合。

次の場合には固定された pipeline を使用します。

- ステップが常に同じである場合。
- 決定論的で再現可能な動作が必要な場合。
- 柔軟性よりも latency とコストが重要な場合。

LLM を固定された順序で 3 回呼び出す pipeline は、その 3 ステップを自分で判断する agent よりも常に高速で、安価で、予測可能です。本当に適応的な推論を必要とするタスクには agents を使用してください。

## まとめ

AI agents は LLMs を tools と推論 loop と組み合わせて、複雑なタスクを自律的に処理します。核心となるパターンは単純明快です。observe、think、act、repeat。OpenAI API を使ってゼロから agents を構築することも、より迅速な開発のために LangChain のような frameworks を使うこともできます。信頼性の高い agents の鍵は、優れた tool design、明確な prompts、error handling、そして iteration limits です。シンプルに始め、徹底的にテストし、タスクが要求するときにのみ複雑さを追加してください。

---

## 関連記事

- [OpenAI Agents SDK Python Tutorial](/posts/openai-agents-sdk-python/) - 公式 SDK を使って tools、handoffs、tracing を備えた本番対応の agent workflows を構築する
- [Model Context Protocol Python Tutorial](/posts/model-context-protocol-python/) - MCP を使って agents が tools を公開・利用する方法を標準化する
- [Beginner Guide to LangChain in Python](/posts/Beginner-Guide-to-LangChain-in-Python/) - agent chains と tool integrations を構築するための LangChain framework を学ぶ
