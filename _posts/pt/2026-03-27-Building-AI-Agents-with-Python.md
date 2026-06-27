---
title: "Criar AI Agents com Python: um guia completo"
description: "Aprenda a criar AI agents autônomos com Python usando a API da OpenAI e o LangChain. Este guia cobre o agent loop, o uso de tools, memória e um exemplo prático de research agent."
date: 2026-03-27 12:00:00 +0800
categories: [Python]
tags: [python, ai, agents]
lang: pt
translations: [hi, es, pt, fr, de]
image:
  path: "/commons/Building AI Agents with Python A Complete Guide.webp"
  alt: "Criar AI Agents com Python: um guia completo"
---

## O que são AI Agents?

Um AI agent é um programa que usa um large language model (LLM) como motor de raciocínio para decidir quais ações tomar, executar essas ações, observar os resultados e repetir até concluir uma tarefa. Ao contrário de um simples chatbot que responde a um único prompt, um agent opera em um laço (loop) e pode chamar tools externas como buscas na web, bancos de dados ou interpretadores de código.

A diferença central entre um chatbot e um agent é a autonomia. Um chatbot responde uma pergunta por vez. Um agent decompõe um objetivo complexo em etapas e as executa de forma independente.

```python
# The simplest possible agent loop
while not task_complete:
    observation = gather_information()
    thought = llm.reason(observation)
    action = select_action(thought)
    result = execute(action)
    task_complete = check_if_done(result)
```

Esse padrão observe-think-act é a base de todo AI agent, independentemente do framework ou da complexidade.

Quando construí sistemas de agentes na Codiste para tarefas como detecção de danos em carros com Detectron2 e detecção de códigos de barras com YOLO, descobri que o conceito do agent loop se aplica até mesmo fora de sistemas baseados em LLM. O padrão de observar uma entrada, raciocinar sobre ela e decidir uma ação é universal -- o LLM apenas torna a etapa de raciocínio muito mais flexível.

## O Agent Loop: Observar, Pensar, Agir

Todo AI agent segue um padrão cíclico:

1. **Observar** -- Coletar informações do ambiente (entrada do usuário, saídas de tools, memória).
2. **Pensar** -- Usar o LLM para raciocinar sobre o que fazer em seguida.
3. **Agir** -- Executar uma ação escolhida (chamar uma tool, retornar uma resposta, atualizar o estado).

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

O LLM decide quando chamar as tools e quando parar. Você não codifica o fluxo de controle de forma fixa -- o modelo descobre isso com base na tarefa e nas tools disponíveis. Para um SDK pronto para produção que gerencia esse laço por você, veja o [tutorial do OpenAI Agents SDK Python](/posts/openai-agents-sdk-python/).

## Criar um Agent simples com a API da OpenAI

Vamos construir um agent funcional capaz de fazer buscas na web e cálculos. Primeiro, instale os pacotes necessários:

```bash
pip install openai requests
```

Defina as tools que seu agent pode usar:

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

Agora defina os tool schemas que a API da OpenAI espera:

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

Execute o agent:

```python
result = agent_loop(
    user_task="What is the population of France? Then calculate what 15% of that number is.",
    tools=tools,
    max_iterations=5
)
print(result)
```

O agent primeiro chamará `search_web` para encontrar a população, depois chamará `calculate` para computar 15% desse número e, por fim, retornará uma resposta em linguagem natural combinando os dois resultados.

## Adicionar memória ao seu Agent

Os agents ficam mais úteis quando conseguem lembrar interações anteriores. Há dois tipos de memória:

- **Memória de curto prazo** -- O histórico de conversa dentro de uma única sessão (a lista `messages`).
- **Memória de longo prazo** -- Armazenamento persistente entre sessões.

Aqui está uma implementação simples de memória de longo prazo usando um arquivo JSON:

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

Integre a memória ao agent loop antepondo o contexto de memória à mensagem do sistema:

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

O LangChain fornece uma abstração de mais alto nível para construir agents. Ele gerencia o laço, a integração de tools e o gerenciamento de memória por você. Se você é novo no LangChain, comece pelo nosso [guia para iniciantes de LangChain em Python](/posts/Beginner-Guide-to-LangChain-in-Python/).

```bash
pip install langchain langchain-openai langchain-community
```

Aqui está o mesmo agent de busca e cálculo construído com LangChain:

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

A flag `verbose=True` imprime cada etapa para que você possa ver o processo de raciocínio do agent.

## Criar um Research Agent

Vamos construir um exemplo mais prático: um research agent que recebe um tema, busca informações, resume as descobertas e produz um relatório estruturado.

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

Esse agent fará múltiplas consultas de busca, coletará informações e então escreverá um relatório estruturado em markdown no disco.

## Tratamento de erros e confiabilidade

Agents de produção precisam de um tratamento de erros robusto. Tools falham, APIs expiram e LLMs às vezes produzem saídas malformadas.

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

Você também deve definir uma contagem máxima de iterações no agent loop para evitar laços infinitos, e validar que as chamadas de tools do LLM referenciem tools que realmente existem.

## Saída estruturada dos Agents

Muitas vezes você quer que um agent retorne dados em um formato específico, não texto livre. Use modelos Pydantic para impor estrutura:

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

## Boas práticas para construir AI Agents

**Mantenha as tools simples e focadas.** Cada tool deve fazer uma coisa bem. Uma tool `search_web` deve buscar, não buscar e resumir. Deixe o LLM cuidar de combinar os resultados.

**Escreva descrições claras das tools.** O LLM usa as descrições das tools para decidir quando e como chamá-las. Descrições vagas levam ao uso incorreto das tools. Para uma abordagem padronizada de definir e compartilhar tools entre clientes de AI, explore o [Model Context Protocol](/posts/model-context-protocol-python/).

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

**Defina limites de iteração.** Sempre limite quantas vezes o agent loop pode rodar. Sem limites, um agent confuso pode iterar indefinidamente e consumir créditos da API.

**Registre tudo.** Em produção, registre cada chamada ao LLM, cada execução de tool e cada resultado. Quando um agent produz uma saída incorreta, esses registros são essenciais para depurar.

Em produção, descobri que o maior desafio não é construir o agent loop em si, mas lidar com as formas imprevisíveis com que os usuários interagem com ele. Quando implantei um chatbot generativo usando BART na Codiste, casos extremos nas entradas dos usuários causavam falhas de seleção de tools que só apareciam sob tráfego real. O registro abrangente foi a única coisa que tornou esses problemas diagnosticáveis.

**Teste com entradas diversas.** Agents são não determinísticos. A mesma entrada pode produzir sequências de chamadas de tools diferentes. Teste com muitas variações para encontrar os modos de falha.

## Quando construir um Agent vs. um Pipeline

Nem toda tarefa precisa de um agent. Use um agent quando:

- O número de etapas for desconhecido de antemão.
- A próxima etapa depender do resultado da etapa anterior.
- A tarefa exigir julgamento sobre quais tools usar.

Use um pipeline fixo quando:

- As etapas forem sempre as mesmas.
- Você precisar de comportamento determinístico e reproduzível.
- Latência e custo importarem mais do que flexibilidade.

Um pipeline que chama um LLM três vezes em uma ordem fixa sempre será mais rápido, mais barato e mais previsível do que um agent que descobre essas três etapas por conta própria. Use agents para tarefas que genuinamente exigem raciocínio adaptativo.

## Resumo

Os AI agents combinam LLMs com tools e um laço de raciocínio para resolver tarefas complexas de forma autônoma. O padrão central é simples: observar, pensar, agir, repetir. Você pode construir agents do zero usando a API da OpenAI ou usar frameworks como o LangChain para um desenvolvimento mais rápido. A chave para agents confiáveis é um bom design de tools, prompts claros, tratamento de erros e limites de iteração. Comece simples, teste bem e adicione complexidade apenas quando a tarefa exigir.

---

## Posts relacionados

- [OpenAI Agents SDK Python Tutorial](/posts/openai-agents-sdk-python/) - Crie workflows de agentes prontos para produção com tools, handoffs e tracing usando o SDK oficial
- [Model Context Protocol Python Tutorial](/posts/model-context-protocol-python/) - Padronize como seus agents expõem e consomem tools com MCP
- [Beginner Guide to LangChain in Python](/posts/Beginner-Guide-to-LangChain-in-Python/) - Aprenda o framework LangChain para construir cadeias de agentes e integrações de tools
