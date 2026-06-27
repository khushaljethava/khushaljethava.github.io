---
title: "Python से AI Agents बनाना: एक संपूर्ण गाइड"
description: "Python में OpenAI API और LangChain का उपयोग करके autonomous AI agents बनाना सीखें। यह गाइड agent loop, tool use, memory और एक व्यावहारिक research agent उदाहरण को कवर करती है।"
date: 2026-03-27 12:00:00 +0800
categories: [Python]
tags: [python, ai, agents]
lang: hi
translations: [hi, es, pt, fr, de, ja, ko, ar]
image:
  path: "/commons/Building AI Agents with Python A Complete Guide.webp"
  alt: "Python से AI Agents बनाना: एक संपूर्ण गाइड"
---

## AI Agents क्या हैं?

एक AI agent एक ऐसा प्रोग्राम है जो अपने reasoning engine के रूप में एक large language model (LLM) का उपयोग करके यह तय करता है कि कौन-से actions लेने हैं, उन actions को execute करता है, परिणामों का अवलोकन करता है, और किसी कार्य के पूरा होने तक यह दोहराता है। एक साधारण chatbot के विपरीत जो एक ही prompt का उत्तर देता है, एक agent एक loop में काम करता है और web searches, databases, या code interpreters जैसे बाहरी tools को call कर सकता है।

एक chatbot और एक agent के बीच मूल अंतर स्वायत्तता (autonomy) है। एक chatbot एक समय में एक सवाल का जवाब देता है। एक agent एक जटिल लक्ष्य को चरणों में तोड़ता है और उन पर स्वतंत्र रूप से काम करता है।

```python
# The simplest possible agent loop
while not task_complete:
    observation = gather_information()
    thought = llm.reason(observation)
    action = select_action(thought)
    result = execute(action)
    task_complete = check_if_done(result)
```

यह observe-think-act pattern हर AI agent की नींव है, चाहे framework या जटिलता कुछ भी हो।

जब मैंने Codiste में Detectron2 के साथ car damage detection और YOLO के साथ barcode detection जैसे कार्यों के लिए agent systems बनाए, तो मैंने पाया कि agent loop की अवधारणा LLM-आधारित systems के बाहर भी लागू होती है। किसी input का अवलोकन करने, उस पर तर्क करने, और किसी action पर निर्णय लेने का pattern सार्वभौमिक है -- LLM बस reasoning चरण को कहीं अधिक लचीला बना देता है।

## Agent Loop: Observe, Think, Act

हर AI agent एक चक्रीय pattern का अनुसरण करता है:

1. **Observe** -- environment से जानकारी एकत्र करें (user input, tool outputs, memory)।
2. **Think** -- आगे क्या करना है इस पर तर्क करने के लिए LLM का उपयोग करें।
3. **Act** -- एक चुना हुआ action execute करें (एक tool call करें, एक response लौटाएँ, state अपडेट करें)।

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

LLM तय करता है कि tools कब call करने हैं और कब रुकना है। आप control flow को hard-code नहीं करते -- model कार्य और उपलब्ध tools के आधार पर इसे स्वयं पता लगा लेता है। एक production-ready SDK के लिए जो यह loop आपके लिए संभालता है, [OpenAI Agents SDK Python ट्यूटोरियल](/posts/openai-agents-sdk-python/) देखें।

## OpenAI API के साथ एक सरल Agent बनाना

आइए एक काम करने वाला agent बनाएँ जो web searches और गणनाएँ कर सके। पहले, आवश्यक packages install करें:

```bash
pip install openai requests
```

उन tools को परिभाषित करें जिन्हें आपका agent उपयोग कर सकता है:

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

अब उन tool schemas को परिभाषित करें जिनकी OpenAI API अपेक्षा करती है:

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

agent चलाएँ:

```python
result = agent_loop(
    user_task="What is the population of France? Then calculate what 15% of that number is.",
    tools=tools,
    max_iterations=5
)
print(result)
```

agent पहले जनसंख्या खोजने के लिए `search_web` call करेगा, फिर उसका 15% गणना करने के लिए `calculate` call करेगा, और अंत में दोनों परिणामों को मिलाकर एक प्राकृतिक भाषा उत्तर लौटाएगा।

## अपने Agent में Memory जोड़ना

agents तब अधिक उपयोगी हो जाते हैं जब वे पिछली बातचीत को याद रख सकते हैं। memory दो प्रकार की होती है:

- **Short-term memory** -- एक ही session के भीतर बातचीत का इतिहास (`messages` list)।
- **Long-term memory** -- sessions के पार स्थायी भंडारण।

यहाँ एक JSON file का उपयोग करते हुए एक सरल long-term memory implementation है:

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

memory context को system message के आगे जोड़कर memory को agent loop में एकीकृत करें:

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

## LangChain Agents का उपयोग

LangChain agents बनाने के लिए एक उच्च-स्तरीय abstraction प्रदान करता है। यह loop, tool integration, और memory management को आपके लिए संभालता है। यदि आप LangChain में नए हैं, तो हमारी [Python में LangChain की शुरुआती गाइड](/posts/Beginner-Guide-to-LangChain-in-Python/) से शुरुआत करें।

```bash
pip install langchain langchain-openai langchain-community
```

यहाँ वही search-and-calculate agent है जो LangChain के साथ बनाया गया है:

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

`verbose=True` flag प्रत्येक चरण को print करता है ताकि आप agent की reasoning प्रक्रिया देख सकें।

## एक Research Agent बनाना

आइए एक अधिक व्यावहारिक उदाहरण बनाएँ: एक research agent जो एक विषय लेता है, जानकारी खोजता है, निष्कर्षों का सारांश बनाता है, और एक संरचित रिपोर्ट तैयार करता है।

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

यह agent कई search queries करेगा, जानकारी एकत्र करेगा, और फिर disk पर एक संरचित markdown रिपोर्ट लिखेगा।

## Error Handling और विश्वसनीयता

production agents को मजबूत error handling की आवश्यकता होती है। tools विफल होते हैं, APIs timeout हो जाते हैं, और LLMs कभी-कभी विकृत output उत्पन्न करते हैं।

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

आपको infinite loops रोकने के लिए agent loop पर एक अधिकतम iteration count भी सेट करनी चाहिए, और यह सत्यापित करना चाहिए कि LLM के tool calls वास्तव में मौजूद tools का संदर्भ देते हैं।

## Agents से संरचित Output

अक्सर आप चाहते हैं कि एक agent किसी विशिष्ट प्रारूप में data लौटाए, न कि मुक्त-रूप text। संरचना को लागू करने के लिए Pydantic models का उपयोग करें:

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

## AI Agents बनाने की सर्वोत्तम प्रथाएँ

**tools को सरल और केंद्रित रखें।** प्रत्येक tool को एक काम अच्छी तरह से करना चाहिए। एक `search_web` tool को खोजना चाहिए, न कि खोजना और सारांशित करना। परिणामों को मिलाने का काम LLM को करने दें।

**स्पष्ट tool descriptions लिखें।** LLM यह तय करने के लिए tool descriptions का उपयोग करता है कि उन्हें कब और कैसे call करना है। अस्पष्ट descriptions गलत tool उपयोग की ओर ले जाते हैं। AI clients के बीच tools को परिभाषित करने और साझा करने के एक मानकीकृत दृष्टिकोण के लिए, [Model Context Protocol](/posts/model-context-protocol-python/) का अन्वेषण करें।

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

**iteration limits सेट करें।** हमेशा सीमित करें कि agent loop कितनी बार चल सकता है। सीमाओं के बिना, एक भ्रमित agent अनिश्चित काल तक loop कर सकता है और API credits जला सकता है।

**सब कुछ log करें।** production में, हर LLM call, हर tool execution, और हर परिणाम को log करें। जब एक agent गलत output उत्पन्न करता है, तो ये logs debugging के लिए आवश्यक होते हैं।

production में, मैंने पाया कि सबसे बड़ी चुनौती agent loop को बनाना नहीं है बल्कि उन अप्रत्याशित तरीकों को संभालना है जिनसे users इसके साथ बातचीत करते हैं। जब मैंने Codiste में BART का उपयोग करके एक generative chatbot deploy किया, तो user inputs में edge cases के कारण tool selection failures हुईं जो केवल वास्तविक traffic के तहत सामने आईं। व्यापक logging ही एकमात्र चीज़ थी जिसने उन समस्याओं का निदान संभव बनाया।

**विविध inputs के साथ परीक्षण करें।** agents non-deterministic होते हैं। एक ही input अलग-अलग tool call sequences उत्पन्न कर सकता है। failure modes खोजने के लिए कई विविधताओं के साथ परीक्षण करें।

## Agent बनाएँ बनाम Pipeline कब बनाएँ

हर कार्य को agent की आवश्यकता नहीं होती। agent का उपयोग तब करें जब:

- चरणों की संख्या पहले से अज्ञात हो।
- अगला चरण पिछले चरण के परिणाम पर निर्भर हो।
- कार्य के लिए यह निर्णय आवश्यक हो कि कौन-से tools उपयोग करने हैं।

एक निश्चित pipeline का उपयोग तब करें जब:

- चरण हमेशा समान हों।
- आपको deterministic, पुनरुत्पादनीय व्यवहार की आवश्यकता हो।
- लचीलेपन की तुलना में latency और लागत अधिक मायने रखती हो।

एक pipeline जो एक LLM को निश्चित क्रम में तीन बार call करता है, हमेशा एक ऐसे agent की तुलना में तेज़, सस्ता, और अधिक पूर्वानुमानित होगा जो उन तीन चरणों को स्वयं पता लगाता है। उन कार्यों के लिए agents का उपयोग करें जिनमें वास्तव में अनुकूली reasoning की आवश्यकता होती है।

## सारांश

AI agents जटिल कार्यों को स्वायत्त रूप से निपटाने के लिए LLMs को tools और एक reasoning loop के साथ जोड़ते हैं। मूल pattern सीधा है: observe, think, act, repeat। आप OpenAI API का उपयोग करके शुरू से agents बना सकते हैं या तेज़ विकास के लिए LangChain जैसे frameworks का उपयोग कर सकते हैं। विश्वसनीय agents की कुंजी अच्छा tool design, स्पष्ट prompts, error handling, और iteration limits है। सरल शुरुआत करें, अच्छी तरह परीक्षण करें, और जटिलता तभी जोड़ें जब कार्य की माँग हो।

---

## संबंधित पोस्ट

- [OpenAI Agents SDK Python Tutorial](/posts/openai-agents-sdk-python/) - आधिकारिक SDK का उपयोग करके tools, handoffs, और tracing के साथ production-ready agent workflows बनाएँ
- [Model Context Protocol Python Tutorial](/posts/model-context-protocol-python/) - MCP के साथ अपने agents के tools उजागर करने और उपभोग करने के तरीके को मानकीकृत करें
- [Beginner Guide to LangChain in Python](/posts/Beginner-Guide-to-LangChain-in-Python/) - agent chains और tool integrations बनाने के लिए LangChain framework सीखें
