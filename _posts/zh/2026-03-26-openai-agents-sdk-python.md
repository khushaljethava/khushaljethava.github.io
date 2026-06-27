---
title: "OpenAI Agents SDK Python 教程：更快构建更聪明的 AI Agent"
description: "学习如何在 Python 中使用 OpenAI Agents SDK，构建带有 tool 调用、tracing 和 handoff 的多智能体工作流，并采用整洁、可用于生产的结构。"
date: 2026-03-26 23:45:00 +0530
categories: [Python]
tags: [python, ai, agents, openai, llm]
lang: zh
permalink: /posts/openai-agents-sdk-python/
translations: [hi, es, pt, fr, de, ja, ko, ar, zh]
image:
  path: /commons/openai-agents-sdk-python-hero.webp
  alt: OpenAI Agents SDK Python 教程主题图
---

关于 AI agent 的教程随处可见，但大多数都跳过了在生产环境中最关键的部分：如何组织 tools、如何在各个专职智能体之间路由工作，以及如何检查一次运行中究竟发生了什么。这正是 **OpenAI Agents SDK Python** 当下成为热门主题的原因。搜索意图清晰，关键词对应着真实的实现问题，而官方文档也已经为开发者提供了一条从简单 prompt 到带 tracing 的路由工作流的路径。

如果你想超越一次性的 chatbot 脚本，本指南将展示这个 SDK 擅长什么、如何上手，以及它在实用的 Python 技术栈中处于什么位置。要更全面地了解智能体架构，请参阅我们的指南 [Building AI Agents with Python](/posts/Building-AI-Agents-with-Python/)。

## 为什么这个主题当下很重要

当前关于智能体的讨论，已经从"我能调用一个模型吗?"转变为"我能围绕它构建一个可靠的工作流吗?"。这一转变对搜索和产品工程都很重要。

OpenAI 为该 SDK 提供的官方 quickstart 聚焦于开发者最先关心的部分：

- 创建一个 agent
- 用 runner 运行它
- 接入 tools
- 添加更多 agent
- 定义 handoff
- 查看 trace

这个顺序之所以重要，是因为它映射了真实的产品成长过程。你通常先从一个 agent 开始，然后加入 tools，接着拆分职责，最后调试行为。2025 年 10 月，OpenAI 还将 AgentKit 描述为在此前的 Responses API 和 Agents SDK 技术栈之上的演进，这是一个良好的信号，表明智能体工作流仍是一个战略性领域，而非昙花一现的实验。

对于一个以 Python 为核心的网站来说，这比一篇含糊的"AI agents explained"式文章是更好的 SEO 目标。搜索 **OpenAI Agents SDK Python** 的人，很可能想要代码、配置步骤和架构指导，而不是宽泛的理论。

## OpenAI Agents SDK 实际为你提供了什么

这个 SDK 之所以有用，是因为它为常见的智能体模式提供了更整洁的抽象。

### 1. Agents

一个 agent 由指令、名称和可选配置组合而成。这听起来很简单，但它创建了一个可复用、可被清晰推理的单元，而不是把 prompt 散落在整个应用代码中。

### 2. Tools

tools 让你的 agent 能做一些具体的事，比如调用一个 Python 函数、查询数据，或触发某项业务操作。正是从这里开始，agent 从演示走向产品。

### 3. Handoffs

handoff 让一个 agent 把工作路由给另一个专职智能体。当你需要一个分流（triage）层时，这很有用，例如：

1. 一个支持路由器
2. 一个计费专员
3. 一个文档专员

相比一个指令过多的巨型 agent，这种模式往往更易于维护。

根据我在 Codiste 构建 AI agent 框架的经验，handoff 模式正是区分演示型 agent 与生产就绪 agent 的关键。当我使用 LSTM 和 BART 构建一个生成式 chatbot 系统时，最初我试图把所有能力都塞进一个 agent，很快就撞上了 prompt 冲突和不可预测路由的墙。把它拆分为带有清晰 handoff 规则的专职 agent 后，系统的可靠性大幅提升。

### 4. Tracing

tracing 是最大的实用收益之一。当一个 agent 选错了 tool，或把请求路由得很糟糕时，你需要可见性。SDK 文档明确引导开发者使用 Trace viewer，以便检查运行过程，而不是凭猜测。

## 第一个项目的快速搭建

官方 quickstart 使用标准的 Python 项目配置。最简安装如下所示：

```bash
python -m venv .venv
.venv\Scripts\activate
pip install openai-agents
```

在运行示例之前，你的环境中还需要有一个 `OPENAI_API_KEY`。

接下来，最小的可运行示例非常直接：

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

这个示例刻意做得很小，但它展示了核心契约：定义一个 agent，把输入传给 runner，然后读取最终输出。

## 加入 tools 让 SDK 实用得多

**OpenAI Agents SDK Python** 真正变得有意思的地方在于 tool 的使用。官方文档展示了 `function_tool` 模式，这是把 Python 逻辑暴露给 agent 的一种整洁方式。

这里有一个简单的示例：

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

相比把每个回答都塞进一个 prompt，这种模式的可扩展性更好。与其指望模型记住你的业务规则，不如把稳定的逻辑迁移到 Python 函数中，让 agent 在合适时调用它们。

对于构建真实应用的博客读者来说，值得强调的独特视角正是：这个 SDK 不只是对一次模型调用的封装（wrapper）。它是面向 Python 团队的工作流层，让推理、路由和执行之间的边界更清晰。要了解一种向智能体暴露 tools 和上下文的标准化方式，请看 [Model Context Protocol](/posts/model-context-protocol-python/) 如何对这一方法进行补充。

## 不混乱的多智能体路由

许多开发者一旦让单个 agent 承担太多，就会撞上复杂性。quickstart 通过展示多个 agent 和 handoff，直接应对了这一点。

例如，你可以创建：

- 一个用于处理入站请求的 triage agent
- 一个用于技术问题的 coding agent
- 一个用于改写或摘要文本的 content agent

这种设计有两个好处。其一，prompt 保持更小、更易维护。其二，评估变得更有意义，因为每个 agent 的职责更聚焦。

如果你正在编写内部工具、支持系统或研究助手，**OpenAI Agents SDK Python** 会在你发明自己的编排（orchestration）层之前，给你一个合理的默认结构。这可以节省时间，并在早期降低技术债。

## 上线前的最佳实践

如果你正从演示走向生产，请记住以下规则：

- 保持 tool 描述明确，让模型知道何时调用它们
- 将路由行为与领域专长分开
- 在盲目修改 prompt 之前先检查 trace
- 从一个 agent 和一个 tool 开始，仅在需要时才加入 handoff
- 把确定性的业务逻辑迁移到 Python，而不是写进冗长的指令里

我在生产环境中使用智能体框架时学到的一条教训是：tracing 没有商量余地。早期，我曾花了好几个小时调试一个在边界情况输入下悄悄调用错误 tool 的 agent。一旦加上结构化的 trace 日志，这些问题诊断起来就变得轻而易举。

还有一个实用的要点：并非每个工作流都需要多个 agent。有时一个带有两个精心设计 tool 的 agent 才是更整洁的方案。SDK 同时支持这两种模式，文档也明确区分了 handoff 与那种可以把 agent 当作 tool 使用的编排器式（orchestrator）配置。

这种灵活性，也是这个关键词值得作为目标的部分原因。搜索 **OpenAI Agents SDK Python** 的人通常已接近实现阶段。他们想要示例、权衡取舍，以及一条在项目变大时不会崩塌的路径。

## 最后的思考

如果你的网站涵盖 Python、AI 或开发者工具，这正是那种能吸引高质量搜索流量的主题：当下、实用，并与一个仍在扩张的官方生态系统相关联。

正确的下一步不是过度构建。从一个 agent 开始，加入一个 function tool，运行几个真实 prompt，然后查看 trace。当它能跑通后，只在路由确实有帮助的地方才拆分职责。

如果你想在本周构建第一个适合生产的智能体工作流，**OpenAI Agents SDK Python** 是最清晰的起点之一。试试 quickstart，把示例适配到你的领域，并把一个有用的工作流变成一个可复用的 agent 服务。如果你的 agent 需要领域特定的推理，你可以 [对一个 LLM 进行 fine-tune](/posts/Fine-Tuning-LLMs-with-Python/) 来驱动它们。

---

## 相关文章

- [Building AI Agents with Python: A Complete Guide](/posts/Building-AI-Agents-with-Python/) - 从零开始学习 AI agent 架构、tool 使用和记忆的基础知识
- [Model Context Protocol Python Tutorial](/posts/model-context-protocol-python/) - 用 MCP 标准化你的 agent 连接 tools 和外部数据的方式
- [Fine-Tuning Large Language Models with Python](/posts/Fine-Tuning-LLMs-with-Python/) - 训练领域特定模型来驱动你的智能体工作流

## 来源

- [OpenAI Agents SDK Quickstart](https://openai.github.io/openai-agents-python/quickstart/)
- [Introducing AgentKit | OpenAI](https://openai.com/index/introducing-agentkit/)
