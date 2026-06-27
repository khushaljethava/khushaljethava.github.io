---
title: "Créer des AI Agents avec Python : un guide complet"
description: "Apprenez à créer des AI agents autonomes avec Python en utilisant l'API OpenAI et LangChain. Ce guide couvre l'agent loop, l'usage des tools, la mémoire et un exemple concret de research agent."
date: 2026-03-27 12:00:00 +0800
categories: [Python]
tags: [python, ai, agents]
lang: fr
translations: [hi, es, pt, fr, de, ja, ko, ar]
image:
  path: "/commons/Building AI Agents with Python A Complete Guide.webp"
  alt: "Créer des AI Agents avec Python : un guide complet"
---

## Que sont les AI Agents ?

Un AI agent est un programme qui utilise un large language model (LLM) comme moteur de raisonnement pour décider des actions à entreprendre, exécuter ces actions, observer les résultats et répéter jusqu'à ce qu'une tâche soit terminée. Contrairement à un simple chatbot qui répond à un unique prompt, un agent fonctionne en boucle et peut appeler des tools externes comme des recherches web, des bases de données ou des interpréteurs de code.

La différence fondamentale entre un chatbot et un agent est l'autonomie. Un chatbot répond à une question à la fois. Un agent décompose un objectif complexe en étapes et les traite de façon indépendante.

```python
# The simplest possible agent loop
while not task_complete:
    observation = gather_information()
    thought = llm.reason(observation)
    action = select_action(thought)
    result = execute(action)
    task_complete = check_if_done(result)
```

Ce schéma observe-think-act est le fondement de tout AI agent, quel que soit le framework ou la complexité.

Lorsque j'ai construit des systèmes d'agents chez Codiste pour des tâches comme la détection de dommages sur les voitures avec Detectron2 et la détection de codes-barres avec YOLO, j'ai constaté que le concept d'agent loop s'applique même en dehors des systèmes fondés sur des LLM. Le schéma consistant à observer une entrée, à raisonner dessus et à décider d'une action est universel -- le LLM rend simplement l'étape de raisonnement bien plus flexible.

## L'Agent Loop : Observer, Penser, Agir

Tout AI agent suit un schéma cyclique :

1. **Observer** -- Collecter des informations de l'environnement (entrée utilisateur, sorties de tools, mémoire).
2. **Penser** -- Utiliser le LLM pour raisonner sur la prochaine étape.
3. **Agir** -- Exécuter une action choisie (appeler un tool, renvoyer une réponse, mettre à jour l'état).

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

Le LLM décide quand appeler les tools et quand s'arrêter. Vous ne codez pas le flux de contrôle en dur -- le modèle le détermine selon la tâche et les tools disponibles. Pour un SDK prêt pour la production qui gère cette boucle à votre place, voyez le [tutoriel OpenAI Agents SDK Python](/posts/openai-agents-sdk-python/).

## Créer un Agent simple avec l'API OpenAI

Construisons un agent fonctionnel capable d'effectuer des recherches web et des calculs. D'abord, installez les paquets requis :

```bash
pip install openai requests
```

Définissez les tools que votre agent peut utiliser :

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

Définissez maintenant les tool schemas attendus par l'API OpenAI :

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

Exécutez l'agent :

```python
result = agent_loop(
    user_task="What is the population of France? Then calculate what 15% of that number is.",
    tools=tools,
    max_iterations=5
)
print(result)
```

L'agent appellera d'abord `search_web` pour trouver la population, puis `calculate` pour calculer 15 % de ce nombre, et renverra enfin une réponse en langage naturel combinant les deux résultats.

## Ajouter de la mémoire à votre Agent

Les agents deviennent plus utiles lorsqu'ils peuvent se souvenir des interactions précédentes. Il existe deux types de mémoire :

- **Mémoire à court terme** -- L'historique de conversation au sein d'une seule session (la liste `messages`).
- **Mémoire à long terme** -- Un stockage persistant entre les sessions.

Voici une implémentation simple de mémoire à long terme à l'aide d'un fichier JSON :

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

Intégrez la mémoire dans l'agent loop en préfixant le message système avec le contexte de mémoire :

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

## Utiliser les LangChain Agents

LangChain fournit une abstraction de plus haut niveau pour construire des agents. Il gère la boucle, l'intégration des tools et la gestion de la mémoire à votre place. Si vous débutez avec LangChain, commencez par notre [guide LangChain pour débutants en Python](/posts/Beginner-Guide-to-LangChain-in-Python/).

```bash
pip install langchain langchain-openai langchain-community
```

Voici le même agent de recherche et de calcul construit avec LangChain :

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

L'option `verbose=True` affiche chaque étape afin que vous puissiez voir le processus de raisonnement de l'agent.

## Créer un Research Agent

Construisons un exemple plus concret : un research agent qui prend un sujet, recherche des informations, résume les conclusions et produit un rapport structuré.

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

Cet agent effectuera plusieurs requêtes de recherche, collectera des informations, puis écrira un rapport markdown structuré sur le disque.

## Gestion des erreurs et fiabilité

Les agents de production nécessitent une gestion robuste des erreurs. Les tools échouent, les APIs expirent et les LLMs produisent parfois des sorties mal formées.

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

Vous devriez aussi fixer un nombre maximal d'itérations sur l'agent loop pour éviter les boucles infinies, et vérifier que les appels de tools du LLM référencent des tools qui existent réellement.

## Sortie structurée des Agents

Souvent, vous voulez qu'un agent renvoie des données dans un format précis, pas du texte libre. Utilisez des modèles Pydantic pour imposer une structure :

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

## Bonnes pratiques pour construire des AI Agents

**Gardez des tools simples et ciblés.** Chaque tool doit faire une seule chose, mais bien. Un tool `search_web` doit chercher, pas chercher et résumer. Laissez le LLM combiner les résultats.

**Rédigez des descriptions de tools claires.** Le LLM utilise les descriptions des tools pour décider quand et comment les appeler. Des descriptions vagues mènent à un usage incorrect des tools. Pour une approche standardisée de définition et de partage des tools entre clients d'AI, explorez le [Model Context Protocol](/posts/model-context-protocol-python/).

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

**Fixez des limites d'itération.** Limitez toujours le nombre de fois où l'agent loop peut s'exécuter. Sans limites, un agent désorienté peut boucler indéfiniment et épuiser des crédits d'API.

**Journalisez tout.** En production, journalisez chaque appel au LLM, chaque exécution de tool et chaque résultat. Lorsqu'un agent produit une sortie incorrecte, ces journaux sont essentiels pour le débogage.

En production, j'ai constaté que le plus grand défi n'est pas de construire l'agent loop lui-même, mais de gérer les façons imprévisibles dont les utilisateurs interagissent avec lui. Lorsque j'ai déployé un chatbot génératif utilisant BART chez Codiste, des cas limites dans les entrées des utilisateurs provoquaient des échecs de sélection de tools qui n'apparaissaient que sous un trafic réel. Une journalisation complète a été la seule chose qui a rendu ces problèmes diagnostiquables.

**Testez avec des entrées variées.** Les agents sont non déterministes. La même entrée peut produire des séquences d'appels de tools différentes. Testez avec de nombreuses variations pour trouver les modes de défaillance.

## Quand construire un Agent vs. un Pipeline

Toutes les tâches n'ont pas besoin d'un agent. Utilisez un agent quand :

- Le nombre d'étapes est inconnu à l'avance.
- L'étape suivante dépend du résultat de l'étape précédente.
- La tâche nécessite un jugement sur les tools à utiliser.

Utilisez un pipeline fixe quand :

- Les étapes sont toujours les mêmes.
- Vous avez besoin d'un comportement déterministe et reproductible.
- La latence et le coût comptent plus que la flexibilité.

Un pipeline qui appelle un LLM trois fois dans un ordre fixe sera toujours plus rapide, moins coûteux et plus prévisible qu'un agent qui détermine ces trois étapes par lui-même. Utilisez des agents pour les tâches qui exigent réellement un raisonnement adaptatif.

## Résumé

Les AI agents combinent des LLMs avec des tools et une boucle de raisonnement pour traiter des tâches complexes de manière autonome. Le schéma central est simple : observer, penser, agir, répéter. Vous pouvez construire des agents à partir de zéro avec l'API OpenAI ou utiliser des frameworks comme LangChain pour un développement plus rapide. La clé d'agents fiables réside dans une bonne conception des tools, des prompts clairs, la gestion des erreurs et des limites d'itération. Commencez simple, testez à fond et n'ajoutez de la complexité que lorsque la tâche l'exige.

---

## Articles liés

- [OpenAI Agents SDK Python Tutorial](/posts/openai-agents-sdk-python/) - Créez des workflows d'agents prêts pour la production avec tools, handoffs et tracing grâce au SDK officiel
- [Model Context Protocol Python Tutorial](/posts/model-context-protocol-python/) - Standardisez la façon dont vos agents exposent et consomment des tools avec MCP
- [Beginner Guide to LangChain in Python](/posts/Beginner-Guide-to-LangChain-in-Python/) - Apprenez le framework LangChain pour construire des chaînes d'agents et des intégrations de tools
