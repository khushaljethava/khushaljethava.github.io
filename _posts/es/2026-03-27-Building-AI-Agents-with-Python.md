---
title: "Crear AI Agents con Python: una guía completa"
description: "Aprende a crear AI agents autónomos con Python usando la API de OpenAI y LangChain. Esta guía cubre el agent loop, el uso de tools, la memoria y un ejemplo práctico de research agent."
date: 2026-03-27 12:00:00 +0800
categories: [Python]
tags: [python, ai, agents]
lang: es
translations: [hi, es, pt, fr, de]
image:
  path: "/commons/Building AI Agents with Python A Complete Guide.webp"
  alt: "Crear AI Agents con Python: una guía completa"
---

## ¿Qué son los AI Agents?

Un AI agent es un programa que usa un large language model (LLM) como motor de razonamiento para decidir qué acciones tomar, ejecutar esas acciones, observar los resultados y repetir hasta completar una tarea. A diferencia de un simple chatbot que responde a un único prompt, un agent opera en un bucle y puede llamar a tools externas como búsquedas web, bases de datos o intérpretes de código.

La diferencia central entre un chatbot y un agent es la autonomía. Un chatbot responde una pregunta a la vez. Un agent descompone un objetivo complejo en pasos y los trabaja de forma independiente.

```python
# The simplest possible agent loop
while not task_complete:
    observation = gather_information()
    thought = llm.reason(observation)
    action = select_action(thought)
    result = execute(action)
    task_complete = check_if_done(result)
```

Este patrón observe-think-act es la base de todo AI agent, sin importar el framework o la complejidad.

Cuando construí sistemas de agentes en Codiste para tareas como detección de daños en autos con Detectron2 y detección de códigos de barras con YOLO, descubrí que el concepto del agent loop se aplica incluso fuera de los sistemas basados en LLM. El patrón de observar una entrada, razonar sobre ella y decidir una acción es universal: el LLM solo hace el paso de razonamiento mucho más flexible.

## El Agent Loop: Observar, Pensar, Actuar

Todo AI agent sigue un patrón cíclico:

1. **Observar** -- Recopilar información del entorno (entrada del usuario, salidas de tools, memoria).
2. **Pensar** -- Usar el LLM para razonar qué hacer a continuación.
3. **Actuar** -- Ejecutar una acción elegida (llamar a una tool, devolver una respuesta, actualizar el estado).

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

El LLM decide cuándo llamar a las tools y cuándo detenerse. No codificas el flujo de control de forma fija: el modelo lo deduce según la tarea y las tools disponibles. Para un SDK listo para producción que gestiona este bucle por ti, consulta el [tutorial de OpenAI Agents SDK Python](/posts/openai-agents-sdk-python/).

## Crear un Agent sencillo con la API de OpenAI

Construyamos un agent funcional capaz de hacer búsquedas web y cálculos. Primero, instala los paquetes necesarios:

```bash
pip install openai requests
```

Define las tools que tu agent puede usar:

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

Ahora define los tool schemas que espera la API de OpenAI:

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

Ejecuta el agent:

```python
result = agent_loop(
    user_task="What is the population of France? Then calculate what 15% of that number is.",
    tools=tools,
    max_iterations=5
)
print(result)
```

El agent primero llamará a `search_web` para encontrar la población, luego llamará a `calculate` para computar el 15% de ese número y finalmente devolverá una respuesta en lenguaje natural que combina ambos resultados.

## Añadir memoria a tu Agent

Los agents se vuelven más útiles cuando pueden recordar interacciones previas. Hay dos tipos de memoria:

- **Memoria a corto plazo** -- El historial de conversación dentro de una sola sesión (la lista `messages`).
- **Memoria a largo plazo** -- Almacenamiento persistente entre sesiones.

Aquí tienes una implementación sencilla de memoria a largo plazo usando un archivo JSON:

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

Integra la memoria en el agent loop anteponiendo el contexto de memoria al mensaje del sistema:

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

## Usar LangChain Agents

LangChain proporciona una abstracción de más alto nivel para construir agents. Gestiona el bucle, la integración de tools y la administración de memoria por ti. Si eres nuevo en LangChain, empieza con nuestra [guía para principiantes de LangChain en Python](/posts/Beginner-Guide-to-LangChain-in-Python/).

```bash
pip install langchain langchain-openai langchain-community
```

Aquí está el mismo agent de búsqueda y cálculo construido con LangChain:

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

La opción `verbose=True` imprime cada paso para que puedas ver el proceso de razonamiento del agent.

## Crear un Research Agent

Construyamos un ejemplo más práctico: un research agent que toma un tema, busca información, resume los hallazgos y produce un informe estructurado.

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

Este agent hará múltiples consultas de búsqueda, recopilará información y luego escribirá un informe estructurado en markdown en el disco.

## Manejo de errores y fiabilidad

Los agents de producción necesitan un manejo de errores robusto. Las tools fallan, las APIs agotan el tiempo de espera y los LLMs a veces producen salidas mal formadas.

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

También deberías fijar un número máximo de iteraciones en el agent loop para evitar bucles infinitos, y validar que las llamadas a tools del LLM hagan referencia a tools que realmente existen.

## Salida estructurada de los Agents

A menudo quieres que un agent devuelva datos en un formato específico, no texto libre. Usa modelos de Pydantic para imponer estructura:

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

## Buenas prácticas para construir AI Agents

**Mantén las tools simples y enfocadas.** Cada tool debe hacer una cosa bien. Una tool `search_web` debe buscar, no buscar y resumir. Deja que el LLM se encargue de combinar los resultados.

**Escribe descripciones claras de las tools.** El LLM usa las descripciones de las tools para decidir cuándo y cómo llamarlas. Las descripciones vagas llevan a un uso incorrecto de las tools. Para un enfoque estandarizado de definir y compartir tools entre clientes de AI, explora el [Model Context Protocol](/posts/model-context-protocol-python/).

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

**Fija límites de iteración.** Siempre limita cuántas veces puede ejecutarse el agent loop. Sin límites, un agent confundido puede iterar indefinidamente y consumir créditos de la API.

**Registra todo.** En producción, registra cada llamada al LLM, cada ejecución de tool y cada resultado. Cuando un agent produce una salida incorrecta, esos registros son esenciales para depurar.

En producción, descubrí que el mayor desafío no es construir el agent loop en sí, sino manejar las formas impredecibles en que los usuarios interactúan con él. Cuando desplegué un chatbot generativo usando BART en Codiste, los casos límite en las entradas de los usuarios causaban fallos de selección de tools que solo aparecían bajo tráfico real. El registro exhaustivo fue lo único que hizo diagnosticables esos problemas.

**Prueba con entradas diversas.** Los agents son no deterministas. La misma entrada puede producir distintas secuencias de llamadas a tools. Prueba con muchas variaciones para encontrar los modos de fallo.

## Cuándo construir un Agent vs. un Pipeline

No toda tarea necesita un agent. Usa un agent cuando:

- El número de pasos sea desconocido de antemano.
- El siguiente paso dependa del resultado del paso anterior.
- La tarea requiera criterio sobre qué tools usar.

Usa un pipeline fijo cuando:

- Los pasos sean siempre los mismos.
- Necesites un comportamiento determinista y reproducible.
- La latencia y el coste importen más que la flexibilidad.

Un pipeline que llama a un LLM tres veces en un orden fijo siempre será más rápido, más barato y más predecible que un agent que deduce esos tres pasos por su cuenta. Usa agents para tareas que genuinamente requieren razonamiento adaptativo.

## Resumen

Los AI agents combinan LLMs con tools y un bucle de razonamiento para abordar tareas complejas de forma autónoma. El patrón central es sencillo: observar, pensar, actuar, repetir. Puedes construir agents desde cero con la API de OpenAI o usar frameworks como LangChain para un desarrollo más rápido. La clave de unos agents fiables es un buen diseño de tools, prompts claros, manejo de errores y límites de iteración. Empieza simple, prueba a fondo y añade complejidad solo cuando la tarea lo exija.

---

## Entradas relacionadas

- [OpenAI Agents SDK Python Tutorial](/posts/openai-agents-sdk-python/) - Crea workflows de agentes listos para producción con tools, handoffs y tracing usando el SDK oficial
- [Model Context Protocol Python Tutorial](/posts/model-context-protocol-python/) - Estandariza cómo tus agents exponen y consumen tools con MCP
- [Beginner Guide to LangChain in Python](/posts/Beginner-Guide-to-LangChain-in-Python/) - Aprende el framework LangChain para construir cadenas de agentes e integraciones de tools
