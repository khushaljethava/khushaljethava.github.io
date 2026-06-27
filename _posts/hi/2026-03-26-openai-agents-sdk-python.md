---
title: "OpenAI Agents SDK Python ट्यूटोरियल: तेज़ी से स्मार्ट AI Agent बनाएं"
description: "जानें कि OpenAI Agents SDK Python का उपयोग करके tool-using और multi-agent workflows कैसे बनाएं — tracing, handoffs और एक साफ़, production-ready संरचना के साथ।"
date: 2026-03-26 23:45:00 +0530
categories: [Python]
tags: [python, ai, agents, openai, llm]
lang: hi
permalink: /posts/openai-agents-sdk-python/
translations: [hi, es, pt, fr, de, ja, ko, ar, zh]
image:
  path: /commons/openai-agents-sdk-python-hero.webp
  alt: OpenAI Agents SDK Python ट्यूटोरियल का हीरो इमेज
---

AI agent ट्यूटोरियल हर जगह मौजूद हैं, लेकिन ज़्यादातर उस हिस्से को छोड़ देते हैं जो production में सबसे ज़्यादा मायने रखता है: tools को कैसे संरचित करें, काम को विशेषज्ञों के बीच कैसे रूट करें, और एक run के दौरान असल में क्या हुआ इसका निरीक्षण कैसे करें। यही वजह है कि **OpenAI Agents SDK Python** अभी एक मज़बूत विषय है। search intent स्पष्ट है, keyword एक वास्तविक implementation समस्या से जुड़ता है, और आधिकारिक docs पहले से ही डेवलपर्स को सरल prompts से लेकर tracing के साथ रूट किए गए workflows तक का रास्ता देते हैं।

अगर आप एक-बार-इस्तेमाल वाले chatbot scripts से आगे बढ़ना चाहते हैं, तो यह गाइड दिखाती है कि SDK किन चीज़ों में अच्छा है, शुरुआत कैसे करें, और यह एक व्यावहारिक Python stack में कहाँ फ़िट बैठता है। agent architectures पर व्यापक नज़र के लिए, हमारी गाइड [Building AI Agents with Python](/posts/Building-AI-Agents-with-Python/) देखें।

## यह विषय अभी क्यों मायने रखता है

मौजूदा agent चर्चा "क्या मैं एक model को call कर सकता हूँ?" से बदलकर "क्या मैं इसके इर्द-गिर्द एक भरोसेमंद workflow बना सकता हूँ?" पर आ गई है। यह बदलाव search के लिए और product engineering के लिए, दोनों के लिए महत्वपूर्ण है।

SDK के लिए OpenAI की आधिकारिक quickstart उन हिस्सों पर ध्यान केंद्रित करती है जिनकी डेवलपर्स को सबसे पहले परवाह होती है:

- एक agent बनाना
- उसे एक runner के साथ चलाना
- tools जोड़ना
- अतिरिक्त agents जोड़ना
- handoffs परिभाषित करना
- traces देखना

यह क्रम इसलिए मायने रखता है क्योंकि यह वास्तविक product विकास को दर्शाता है। आप आमतौर पर एक agent से शुरू करते हैं, फिर tools जोड़ते हैं, फिर ज़िम्मेदारियाँ बाँटते हैं, और फिर व्यवहार को debug करते हैं। अक्टूबर 2025 में, OpenAI ने AgentKit को पहले के Responses API और Agents SDK stack पर आधारित बताया, जो एक अच्छा संकेत है कि agent workflows एक अल्पकालिक प्रयोग के बजाय एक रणनीतिक क्षेत्र बने हुए हैं।

एक Python-केंद्रित साइट के लिए, यह किसी अस्पष्ट "AI agents explained" पोस्ट की तुलना में बेहतर SEO लक्ष्य है। **OpenAI Agents SDK Python** खोजने वाला व्यक्ति संभवतः code, setup steps और architecture मार्गदर्शन चाहता है, न कि व्यापक सिद्धांत।

## OpenAI Agents SDK असल में आपको क्या देता है

SDK इसलिए उपयोगी है क्योंकि यह सामान्य agent patterns के लिए एक साफ़-सुथरा abstraction देता है।

### 1. Agents

एक agent instructions, एक नाम और वैकल्पिक configuration को मिलाकर बनता है। यह सरल लगता है, लेकिन यह एक पुनः-उपयोग योग्य इकाई बनाता है जिसके बारे में आप तर्क कर सकते हैं, बजाय इसके कि prompts को पूरे application code में बिखेर दें।

### 2. Tools

Tools आपके agent को कुछ ठोस करने देते हैं, जैसे किसी Python function को call करना, data देखना, या किसी business action को ट्रिगर करना। यहीं से agents demos के बजाय products बनना शुरू होते हैं।

### 3. Handoffs

Handoffs एक agent को काम किसी दूसरे विशेषज्ञ को रूट करने देते हैं। यह तब उपयोगी होता है जब आप एक triage परत चाहते हैं, जैसे:

1. एक support router
2. एक billing विशेषज्ञ
3. एक documentation विशेषज्ञ

यह pattern अक्सर बहुत सारी instructions वाले एक विशाल agent की तुलना में बनाए रखना आसान होता है।

Codiste में AI agent frameworks बनाने के मेरे अनुभव में, handoff pattern ही है जो demo agents को production-ready agents से अलग करता है। जब मैंने LSTM और BART का उपयोग करके एक generative chatbot system बनाया, तो शुरुआत में मैंने सभी क्षमताओं को एक ही agent में ठूँसने की कोशिश की और जल्दी ही prompt conflicts और अप्रत्याशित routing की दीवार से टकरा गया। स्पष्ट handoff नियमों के साथ विशेषज्ञ agents में बाँटने से system नाटकीय रूप से अधिक भरोसेमंद हो गया।

### 4. Tracing

Tracing सबसे बड़ी व्यावहारिक जीतों में से एक है। जब कोई agent गलत tool चुनता है या किसी request को खराब तरीके से रूट करता है, तो आपको दृश्यता चाहिए। SDK के docs स्पष्ट रूप से डेवलपर्स को Trace viewer की ओर इशारा करते हैं ताकि runs का अनुमान लगाने के बजाय उनका निरीक्षण किया जा सके।

## आपके पहले प्रोजेक्ट के लिए त्वरित सेटअप

आधिकारिक quickstart एक मानक Python project setup का उपयोग करती है। एक न्यूनतम install इस तरह दिखता है:

```bash
python -m venv .venv
.venv\Scripts\activate
pip install openai-agents
```

examples चलाने से पहले आपको अपने environment में एक `OPENAI_API_KEY` की भी आवश्यकता होगी।

वहाँ से, सबसे छोटा कार्यशील उदाहरण सीधा-सादा है:

```python
import asyncio
from agents import Agent, Runner

agent = Agent(
    name="Python Helper",
    instructions="Answer Python questions clearly and concisely.",
)

async def main():
    result = await Runner.run(
        agent,
        "Explain list comprehensions with one short example."
    )
    print(result.final_output)

if __name__ == "__main__":
    asyncio.run(main())
```

यह उदाहरण जानबूझकर छोटा है, लेकिन यह मूल अनुबंध दिखाता है: एक agent परिभाषित करें, runner को input दें, और final output पढ़ें।

## Tools जोड़ने से SDK बहुत अधिक उपयोगी हो जाता है

जहाँ **OpenAI Agents SDK Python** दिलचस्प बनता है वह है tool का उपयोग। आधिकारिक docs एक `function_tool` pattern दिखाते हैं, जो Python logic को agent के सामने उजागर करने का एक साफ़ तरीका है।

यहाँ एक सरल उदाहरण है:

```python
import asyncio
from agents import Agent, Runner, function_tool

@function_tool
def get_python_tip() -> str:
    return "Use enumerate() when you need both index and value."

agent = Agent(
    name="Python Coach",
    instructions="Help users learn Python. Use get_python_tip when useful.",
    tools=[get_python_tip],
)

async def main():
    result = await Runner.run(agent, "Give me one practical Python habit.")
    print(result.final_output)

if __name__ == "__main__":
    asyncio.run(main())
```

यह pattern हर उत्तर को किसी prompt में ठूँसने की तुलना में बेहतर scale करता है। यह उम्मीद करने के बजाय कि model आपके business नियम याद रखेगा, आप स्थिर logic को Python functions में ले जा सकते हैं और agent को ज़रूरत पड़ने पर उन्हें call करने दे सकते हैं।

असल apps बनाने वाले ब्लॉग पाठकों के लिए, यही वह अनूठा पहलू है जिस पर ज़ोर देना ज़रूरी है: SDK सिर्फ़ एक model call के इर्द-गिर्द एक wrapper नहीं है। यह उन Python टीमों के लिए एक workflow परत है जो reasoning, routing और execution के बीच स्पष्ट सीमाएँ चाहती हैं। agents को tools और context उजागर करने के एक मानकीकृत तरीके के लिए, देखें कि कैसे [Model Context Protocol](/posts/model-context-protocol-python/) इस दृष्टिकोण को पूरक बनाता है।

## बिना गड़बड़ी के Multi-Agent Routing

कई डेवलपर्स जैसे ही एक agent को बहुत कुछ करना पड़ता है, जटिलता से टकरा जाते हैं। quickstart इसे सीधे तौर पर कई agents और handoffs दिखाकर संबोधित करती है।

उदाहरण के लिए, आप बना सकते हैं:

- आने वाली requests के लिए एक triage agent
- तकनीकी सवालों के लिए एक coding agent
- text को फिर से लिखने या सारांशित करने के लिए एक content agent

इस design के दो फ़ायदे हैं। पहला, prompts छोटे और बनाए रखने में आसान रहते हैं। दूसरा, evaluation अधिक सार्थक हो जाता है क्योंकि हर agent का काम सीमित होता है।

अगर आप internal tools, support systems, या research assistants लिख रहे हैं, तो **OpenAI Agents SDK Python** आपको अपनी खुद की orchestration परत बनाने से पहले एक उचित डिफ़ॉल्ट संरचना देता है। इससे समय बच सकता है और शुरुआती दौर में technical debt कम हो सकता है।

## शिप करने से पहले सर्वोत्तम अभ्यास

अगर आप demo से production की ओर बढ़ रहे हैं, तो इन नियमों को ध्यान में रखें:

- tool descriptions स्पष्ट रखें ताकि model जान सके कि उन्हें कब call करना है
- routing व्यवहार को domain विशेषज्ञता से अलग रखें
- prompts को आँख मूँदकर बदलने से पहले traces का निरीक्षण करें
- एक agent और एक tool से शुरू करें, फिर ज़रूरत पड़ने पर ही handoffs जोड़ें
- नियतात्मक business logic को लंबी instructions में नहीं, बल्कि Python में ले जाएँ

production में agent frameworks के साथ काम करते हुए मैंने एक सबक सीखा कि tracing गैर-परक्राम्य है। शुरुआत में, मैंने घंटों एक ऐसे agent को debug करने में बिताए जो edge-case inputs पर चुपचाप गलत tool को call कर रहा था। एक बार जब मैंने structured trace logging जोड़ा, तो उन समस्याओं का निदान करना मामूली हो गया।

एक और व्यावहारिक बात: हर workflow को कई agents की आवश्यकता नहीं होती। कभी-कभी दो अच्छी तरह से डिज़ाइन किए गए tools वाला एक ही agent अधिक साफ़ समाधान होता है। SDK दोनों patterns का समर्थन करता है, और docs स्पष्ट रूप से handoffs को एक orchestrator-शैली के setup से अलग करते हैं जहाँ agents को tools के रूप में इस्तेमाल किया जा सकता है।

यह लचीलापन इस keyword को लक्षित करने योग्य बनाने का एक हिस्सा है। **OpenAI Agents SDK Python** खोजने वाले आमतौर पर implementation के करीब होते हैं। वे उदाहरण, trade-offs, और एक ऐसा रास्ता चाहते हैं जो उनके प्रोजेक्ट के बढ़ने पर ढह न जाए।

## अंतिम निष्कर्ष

अगर आपकी साइट Python, AI, या developer tooling को कवर करती है, तो यह उस तरह का विषय है जो योग्य search traffic आकर्षित कर सकता है: वर्तमान, व्यावहारिक, और एक आधिकारिक ecosystem से जुड़ा हुआ जो अभी भी विस्तार कर रहा है।

सही अगला कदम अति-निर्माण करना नहीं है। एक ही agent से शुरू करें, एक function tool जोड़ें, कुछ वास्तविक prompts चलाएँ, और traces की समीक्षा करें। एक बार जब यह काम कर जाए, तो ज़िम्मेदारियों को केवल वहीं बाँटें जहाँ routing वास्तव में मदद करता है।

अगर आप इस हफ़्ते अपना पहला production-अनुकूल agent workflow बनाना चाहते हैं, तो **OpenAI Agents SDK Python** शुरू करने के सबसे स्पष्ट स्थानों में से एक है। quickstart आज़माएँ, उदाहरणों को अपने domain के अनुसार ढालें, और एक उपयोगी workflow को एक पुनः-उपयोग योग्य agent service में बदल दें। अगर आपके agents को domain-विशिष्ट reasoning की ज़रूरत है, तो आप उन्हें संचालित करने के लिए एक [LLM को fine-tune](/posts/Fine-Tuning-LLMs-with-Python/) कर सकते हैं।

---

## संबंधित पोस्ट

- [Building AI Agents with Python: A Complete Guide](/posts/Building-AI-Agents-with-Python/) - AI agent architecture, tool use, और memory की बुनियादी बातें शुरू से सीखें
- [Model Context Protocol Python Tutorial](/posts/model-context-protocol-python/) - MCP के साथ अपने agents को tools और बाहरी data से जोड़ने का मानकीकरण करें
- [Fine-Tuning Large Language Models with Python](/posts/Fine-Tuning-LLMs-with-Python/) - अपने agent workflows को संचालित करने के लिए domain-विशिष्ट models को train करें

## स्रोत

- [OpenAI Agents SDK Quickstart](https://openai.github.io/openai-agents-python/quickstart/)
- [Introducing AgentKit | OpenAI](https://openai.com/index/introducing-agentkit/)
