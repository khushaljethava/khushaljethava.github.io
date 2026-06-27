---
title: "بناء AI Agents باستخدام Python: دليل كامل"
description: "تعلّم كيفية بناء AI agents مستقلة باستخدام Python مع OpenAI API و LangChain. يغطي هذا الدليل agent loop، واستخدام tools، و memory، ومثالاً عملياً على research agent."
date: 2026-03-27 12:00:00 +0800
categories: [Python]
tags: [python, ai, agents]
lang: ar
translations: [hi, es, pt, fr, de, ja, ko, ar]
image:
  path: "/commons/Building AI Agents with Python A Complete Guide.webp"
  alt: "بناء AI Agents باستخدام Python: دليل كامل"
---

## ما هي AI Agents؟

إن AI agent هو برنامج يستخدم large language model (LLM) كمحرك استدلال لتقرير الإجراءات التي يجب اتخاذها، وتنفيذ تلك الإجراءات، ومراقبة النتائج، وتكرار ذلك حتى اكتمال المهمة. على عكس chatbot البسيط الذي يستجيب لـ prompt واحد، يعمل agent ضمن loop ويمكنه استدعاء tools خارجية مثل web searches أو databases أو code interpreters.

الفرق الجوهري بين chatbot و agent هو الاستقلالية. يجيب chatbot عن سؤال واحد في كل مرة. أما agent فيقسّم هدفاً معقداً إلى خطوات ويعمل عليها بشكل مستقل.

```python
# The simplest possible agent loop
while not task_complete:
    observation = gather_information()
    thought = llm.reason(observation)
    action = select_action(thought)
    result = execute(action)
    task_complete = check_if_done(result)
```

نمط observe-think-act هذا هو أساس كل AI agent، بغض النظر عن framework أو التعقيد.

عندما بنيت أنظمة agent في Codiste لمهام مثل car damage detection باستخدام Detectron2 و barcode detection باستخدام YOLO، وجدت أن مفهوم agent loop ينطبق حتى خارج الأنظمة القائمة على LLM. إن نمط مراقبة input، والاستدلال حوله، واتخاذ قرار بشأن action هو نمط عالمي -- إن LLM يجعل خطوة الاستدلال أكثر مرونة بكثير فحسب.

## Agent Loop: Observe، Think، Act

يتبع كل AI agent نمطاً دورياً:

1. **Observe** -- جمع المعلومات من environment (user input، tool outputs، memory).
2. **Think** -- استخدام LLM للاستدلال حول ما يجب فعله بعد ذلك.
3. **Act** -- تنفيذ action مختار (استدعاء tool، إرجاع response، تحديث state).

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

يقرر LLM متى يستدعي tools ومتى يتوقف. أنت لا تكتب control flow بشكل ثابت في الكود -- يكتشفه model بنفسه بناءً على المهمة و tools المتاحة. للحصول على SDK جاهز للإنتاج يتولى هذا loop نيابة عنك، راجع [دليل OpenAI Agents SDK Python](/posts/openai-agents-sdk-python/).

## بناء Agent بسيط باستخدام OpenAI API

لنبنِ agent عاملاً يمكنه إجراء web searches وحسابات. أولاً، ثبّت الحزم المطلوبة:

```bash
pip install openai requests
```

عرّف tools التي يمكن لـ agent استخدامها:

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

الآن عرّف tool schemas التي تتوقعها OpenAI API:

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

شغّل agent:

```python
result = agent_loop(
    user_task="What is the population of France? Then calculate what 15% of that number is.",
    tools=tools,
    max_iterations=5
)
print(result)
```

سيستدعي agent أولاً `search_web` للعثور على عدد السكان، ثم يستدعي `calculate` لحساب 15% منه، وأخيراً يُرجع إجابة بلغة طبيعية تجمع بين النتيجتين.

## إضافة Memory إلى Agent الخاص بك

تصبح agents أكثر فائدة عندما تستطيع تذكّر التفاعلات السابقة. هناك نوعان من memory:

- **Short-term memory** -- سجل المحادثة ضمن session واحدة (قائمة `messages`).
- **Long-term memory** -- تخزين دائم عبر sessions.

إليك تطبيقاً بسيطاً لـ long-term memory باستخدام ملف JSON:

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

ادمج memory في agent loop عن طريق إضافة سياق memory قبل system message:

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

## استخدام LangChain Agents

يوفّر LangChain تجريداً أعلى مستوى لبناء agents. فهو يتولى loop، و tool integration، و memory management نيابة عنك. إذا كنت جديداً على LangChain، فابدأ بـ [دليل المبتدئين إلى LangChain في Python](/posts/Beginner-Guide-to-LangChain-in-Python/).

```bash
pip install langchain langchain-openai langchain-community
```

إليك نفس agent للبحث والحساب المبني باستخدام LangChain:

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

تطبع راية `verbose=True` كل خطوة حتى تتمكن من رؤية عملية استدلال agent.

## بناء Research Agent

لنبنِ مثالاً أكثر عملية: research agent يأخذ موضوعاً، ويبحث عن المعلومات، ويلخّص النتائج، وينتج تقريراً منظماً.

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

سيجري هذا agent عدة search queries، ويجمع المعلومات، ثم يكتب تقرير markdown منظماً على القرص.

## Error Handling والموثوقية

تحتاج agents الإنتاجية إلى error handling قوي. فالـ tools تفشل، والـ APIs تنتهي مهلتها، والـ LLMs تنتج أحياناً output مشوهاً.

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

يجب عليك أيضاً تعيين حد أقصى لعدد iteration على agent loop لمنع infinite loops، والتحقق من أن tool calls الخاصة بـ LLM تشير إلى tools موجودة فعلاً.

## Output منظم من Agents

غالباً ما ترغب في أن يُرجع agent بيانات بتنسيق محدد، وليس نصاً حر الشكل. استخدم Pydantic models لفرض البنية:

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

## أفضل الممارسات لبناء AI Agents

**اجعل tools بسيطة ومركّزة.** يجب أن يقوم كل tool بعمل واحد بإتقان. يجب أن يبحث tool باسم `search_web`، لا أن يبحث ويلخّص. دع LLM يتولى دمج النتائج.

**اكتب tool descriptions واضحة.** يستخدم LLM وصف tool descriptions ليقرر متى وكيف يستدعيها. تؤدي الأوصاف الغامضة إلى استخدام خاطئ لـ tool. للحصول على نهج موحّد لتعريف tools ومشاركتها عبر AI clients، استكشف [Model Context Protocol](/posts/model-context-protocol-python/).

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

**عيّن iteration limits.** ضع دائماً حداً أقصى لعدد مرات تشغيل agent loop. بدون حدود، يمكن لـ agent مرتبك أن يدور في loop إلى ما لا نهاية ويستنزف رصيد API.

**سجّل كل شيء.** في الإنتاج، سجّل كل LLM call، وكل tool execution، وكل نتيجة. عندما ينتج agent output خاطئاً، تكون هذه logs ضرورية لـ debugging.

في الإنتاج، وجدت أن التحدي الأكبر ليس بناء agent loop نفسه بل التعامل مع الطرق غير المتوقعة التي يتفاعل بها users معه. عندما نشرت generative chatbot باستخدام BART في Codiste، تسببت edge cases في user inputs في حدوث tool selection failures لم تظهر إلا تحت حركة المرور الحقيقية. كان logging الشامل هو الشيء الوحيد الذي جعل تشخيص تلك المشكلات ممكناً.

**اختبر بمدخلات متنوعة.** إن agents غير حتمية. يمكن أن ينتج input واحد عن tool call sequences مختلفة. اختبر بالعديد من التنويعات للعثور على failure modes.

## متى تبني Agent مقابل Pipeline

لا تحتاج كل مهمة إلى agent. استخدم agent عندما:

- يكون عدد الخطوات غير معروف مسبقاً.
- تعتمد الخطوة التالية على نتيجة الخطوة السابقة.
- تتطلب المهمة حُكماً بشأن tools التي ينبغي استخدامها.

استخدم pipeline ثابتاً عندما:

- تكون الخطوات دائماً متماثلة.
- تحتاج إلى سلوك حتمي وقابل لإعادة الإنتاج.
- تكون latency والتكلفة أهم من المرونة.

إن pipeline يستدعي LLM ثلاث مرات بترتيب ثابت سيكون دائماً أسرع وأرخص وأكثر قابلية للتنبؤ من agent يكتشف تلك الخطوات الثلاث بنفسه. استخدم agents للمهام التي تتطلب فعلاً استدلالاً تكيفياً.

## الملخص

تجمع AI agents بين LLMs و tools و loop استدلال لمعالجة المهام المعقدة بشكل مستقل. النمط الأساسي مباشر: observe، think، act، repeat. يمكنك بناء agents من الصفر باستخدام OpenAI API أو استخدام frameworks مثل LangChain لتطوير أسرع. مفتاح agents الموثوقة هو تصميم tool جيد، و prompts واضحة، و error handling، و iteration limits. ابدأ ببساطة، واختبر بشكل شامل، وأضف التعقيد فقط عندما تتطلبه المهمة.

---

## منشورات ذات صلة

- [OpenAI Agents SDK Python Tutorial](/posts/openai-agents-sdk-python/) - ابنِ سير عمل agent جاهزة للإنتاج مع tools و handoffs و tracing باستخدام SDK الرسمي
- [Model Context Protocol Python Tutorial](/posts/model-context-protocol-python/) - وحّد طريقة كشف agents الخاصة بك لـ tools واستهلاكها باستخدام MCP
- [Beginner Guide to LangChain in Python](/posts/Beginner-Guide-to-LangChain-in-Python/) - تعلّم إطار عمل LangChain لبناء agent chains و tool integrations
