---
title: "KI-Agenten mit Python bauen: ein vollständiger Leitfaden"
description: "Lerne, autonome AI Agents mit Python zu bauen – mit der OpenAI API und LangChain. Dieser Leitfaden behandelt den Agent Loop, Tool-Nutzung, Memory und ein praktisches Research-Agent-Beispiel."
date: 2026-03-27 12:00:00 +0800
categories: [Python]
tags: [python, ai, agents]
lang: de
translations: [hi, es, pt, fr, de, ja, ko, ar, zh]
image:
  path: "/commons/Building AI Agents with Python A Complete Guide.webp"
  alt: "KI-Agenten mit Python bauen: ein vollständiger Leitfaden"
---

## Was sind AI Agents?

Ein AI agent ist ein Programm, das ein large language model (LLM) als Reasoning-Engine nutzt, um zu entscheiden, welche Aktionen auszuführen sind, diese Aktionen auszuführen, die Ergebnisse zu beobachten und dies zu wiederholen, bis eine Aufgabe abgeschlossen ist. Anders als ein einfacher Chatbot, der auf einen einzelnen Prompt antwortet, arbeitet ein Agent in einer Schleife und kann externe Tools wie Websuchen, Datenbanken oder Code-Interpreter aufrufen.

Der zentrale Unterschied zwischen einem Chatbot und einem Agent ist die Autonomie. Ein Chatbot beantwortet eine Frage nach der anderen. Ein Agent zerlegt ein komplexes Ziel in Schritte und arbeitet sie eigenständig ab.

```python
# The simplest possible agent loop
while not task_complete:
    observation = gather_information()
    thought = llm.reason(observation)
    action = select_action(thought)
    result = execute(action)
    task_complete = check_if_done(result)
```

Dieses observe-think-act-Muster ist das Fundament jedes AI agents, unabhängig von Framework oder Komplexität.

Als ich bei Codiste Agentensysteme für Aufgaben wie die Erkennung von Autoschäden mit Detectron2 und die Barcode-Erkennung mit YOLO baute, stellte ich fest, dass das Konzept des Agent Loops sogar außerhalb von LLM-basierten Systemen gilt. Das Muster, eine Eingabe zu beobachten, darüber zu schlussfolgern und eine Aktion zu wählen, ist universell -- das LLM macht den Reasoning-Schritt nur weitaus flexibler.

## Der Agent Loop: Beobachten, Denken, Handeln

Jeder AI agent folgt einem zyklischen Muster:

1. **Beobachten** -- Informationen aus der Umgebung sammeln (Benutzereingabe, Tool-Ausgaben, Memory).
2. **Denken** -- Das LLM nutzen, um über den nächsten Schritt zu schlussfolgern.
3. **Handeln** -- Eine gewählte Aktion ausführen (ein Tool aufrufen, eine Antwort zurückgeben, den Zustand aktualisieren).

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

Das LLM entscheidet, wann Tools aufgerufen werden und wann gestoppt wird. Du codierst den Kontrollfluss nicht fest -- das Modell ermittelt ihn anhand der Aufgabe und der verfügbaren Tools. Für ein produktionsreifes SDK, das diese Schleife für dich übernimmt, siehe das [OpenAI Agents SDK Python Tutorial](/posts/openai-agents-sdk-python/).

## Einen einfachen Agent mit der OpenAI API bauen

Bauen wir einen funktionierenden Agent, der Websuchen und Berechnungen durchführen kann. Installiere zuerst die benötigten Pakete:

```bash
pip install openai requests
```

Definiere die Tools, die dein Agent verwenden kann:

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

Definiere nun die Tool-Schemas, die die OpenAI API erwartet:

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

Führe den Agent aus:

```python
result = agent_loop(
    user_task="What is the population of France? Then calculate what 15% of that number is.",
    tools=tools,
    max_iterations=5
)
print(result)
```

Der Agent ruft zuerst `search_web` auf, um die Bevölkerungszahl zu finden, dann `calculate`, um 15 % davon zu berechnen, und gibt schließlich eine natürlichsprachliche Antwort zurück, die beide Ergebnisse kombiniert.

## Memory zu deinem Agent hinzufügen

Agents werden nützlicher, wenn sie sich an frühere Interaktionen erinnern können. Es gibt zwei Arten von Memory:

- **Kurzzeit-Memory** -- Der Gesprächsverlauf innerhalb einer einzelnen Session (die `messages`-Liste).
- **Langzeit-Memory** -- Persistente Speicherung über Sessions hinweg.

Hier ist eine einfache Langzeit-Memory-Implementierung mit einer JSON-Datei:

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

Integriere Memory in den Agent Loop, indem du den Memory-Kontext der System-Nachricht voranstellst:

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

## LangChain Agents verwenden

LangChain bietet eine höherstufige Abstraktion zum Bauen von Agents. Es übernimmt die Schleife, die Tool-Integration und das Memory-Management für dich. Wenn du neu bei LangChain bist, beginne mit unserem [Einsteigerleitfaden zu LangChain in Python](/posts/Beginner-Guide-to-LangChain-in-Python/).

```bash
pip install langchain langchain-openai langchain-community
```

Hier ist derselbe Such- und Rechen-Agent, gebaut mit LangChain:

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

Das Flag `verbose=True` gibt jeden Schritt aus, sodass du den Reasoning-Prozess des Agents sehen kannst.

## Einen Research Agent bauen

Bauen wir ein praktischeres Beispiel: einen Research Agent, der ein Thema entgegennimmt, nach Informationen sucht, die Erkenntnisse zusammenfasst und einen strukturierten Bericht erstellt.

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

Dieser Agent wird mehrere Suchanfragen stellen, Informationen sammeln und dann einen strukturierten Markdown-Bericht auf die Festplatte schreiben.

## Fehlerbehandlung und Zuverlässigkeit

Produktive Agents benötigen eine robuste Fehlerbehandlung. Tools schlagen fehl, APIs laufen in Timeouts, und LLMs erzeugen manchmal fehlerhafte Ausgaben.

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

Du solltest außerdem eine maximale Iterationszahl für den Agent Loop festlegen, um Endlosschleifen zu verhindern, und prüfen, dass die Tool-Aufrufe des LLM auf Tools verweisen, die tatsächlich existieren.

## Strukturierte Ausgabe von Agents

Oft möchtest du, dass ein Agent Daten in einem bestimmten Format zurückgibt, nicht als Freitext. Verwende Pydantic-Modelle, um Struktur zu erzwingen:

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

## Best Practices zum Bauen von AI Agents

**Halte Tools einfach und fokussiert.** Jedes Tool sollte eine Sache gut machen. Ein `search_web`-Tool sollte suchen, nicht suchen und zusammenfassen. Überlasse das Kombinieren der Ergebnisse dem LLM.

**Schreibe klare Tool-Beschreibungen.** Das LLM nutzt Tool-Beschreibungen, um zu entscheiden, wann und wie es sie aufruft. Vage Beschreibungen führen zu falscher Tool-Nutzung. Für einen standardisierten Ansatz zum Definieren und Teilen von Tools über AI-Clients hinweg erkunde das [Model Context Protocol](/posts/model-context-protocol-python/).

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

**Setze Iterationslimits.** Begrenze immer, wie oft der Agent Loop laufen darf. Ohne Limits kann ein verwirrter Agent endlos schleifen und API-Credits aufbrauchen.

**Logge alles.** In der Produktion logge jeden LLM-Aufruf, jede Tool-Ausführung und jedes Ergebnis. Wenn ein Agent eine falsche Ausgabe erzeugt, sind diese Logs für das Debugging unverzichtbar.

In der Produktion stellte ich fest, dass die größte Herausforderung nicht der Bau des Agent Loops selbst ist, sondern der Umgang mit den unvorhersehbaren Arten, wie Nutzer mit ihm interagieren. Als ich bei Codiste einen generativen Chatbot mit BART einsetzte, verursachten Edge Cases in Benutzereingaben Tool-Auswahlfehler, die nur unter echtem Traffic auftraten. Umfassendes Logging war das Einzige, das diese Probleme diagnostizierbar machte.

**Teste mit vielfältigen Eingaben.** Agents sind nicht-deterministisch. Dieselbe Eingabe kann verschiedene Tool-Aufruf-Sequenzen erzeugen. Teste mit vielen Variationen, um Fehlerquellen zu finden.

## Wann einen Agent vs. eine Pipeline bauen

Nicht jede Aufgabe braucht einen Agent. Verwende einen Agent, wenn:

- Die Anzahl der Schritte im Voraus unbekannt ist.
- Der nächste Schritt vom Ergebnis des vorherigen Schritts abhängt.
- Die Aufgabe ein Urteil darüber erfordert, welche Tools zu verwenden sind.

Verwende eine feste Pipeline, wenn:

- Die Schritte immer dieselben sind.
- Du deterministisches, reproduzierbares Verhalten brauchst.
- Latenz und Kosten wichtiger sind als Flexibilität.

Eine Pipeline, die ein LLM dreimal in fester Reihenfolge aufruft, ist immer schneller, günstiger und vorhersehbarer als ein Agent, der diese drei Schritte selbst ermittelt. Verwende Agents für Aufgaben, die wirklich adaptives Reasoning erfordern.

## Zusammenfassung

AI agents kombinieren LLMs mit Tools und einer Reasoning-Schleife, um komplexe Aufgaben autonom zu bewältigen. Das Kernmuster ist unkompliziert: beobachten, denken, handeln, wiederholen. Du kannst Agents von Grund auf mit der OpenAI API bauen oder Frameworks wie LangChain für eine schnellere Entwicklung nutzen. Der Schlüssel zu zuverlässigen Agents sind gutes Tool-Design, klare Prompts, Fehlerbehandlung und Iterationslimits. Beginne einfach, teste gründlich und füge Komplexität nur hinzu, wenn die Aufgabe es erfordert.

---

## Verwandte Beiträge

- [OpenAI Agents SDK Python Tutorial](/posts/openai-agents-sdk-python/) - Baue produktionsreife Agent-Workflows mit Tools, Handoffs und Tracing mithilfe des offiziellen SDK
- [Model Context Protocol Python Tutorial](/posts/model-context-protocol-python/) - Standardisiere mit MCP, wie deine Agents Tools bereitstellen und nutzen
- [Beginner Guide to LangChain in Python](/posts/Beginner-Guide-to-LangChain-in-Python/) - Lerne das LangChain-Framework, um Agent-Ketten und Tool-Integrationen zu bauen
