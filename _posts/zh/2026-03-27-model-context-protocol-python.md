---
title: "Model Context Protocol Python 教程：构建你的第一个 MCP 服务器"
description: 通过一个实用的首个服务器教程、MCP 的核心概念，以及从自定义脚本到可复用 AI 工具的最快路径，用 Python 学习 Model Context Protocol。
date: 2026-03-27 09:20:00 +0530
categories: [Python]
tags: [python, mcp, ai, agents, developer-tools]
lang: zh
translations: [hi, es, pt, fr, de, ja, ko, ar, zh]
image:
  path: /commons/model-context-protocol-python-hero.webp
  alt: Model Context Protocol Python 教程主图
---

大多数 MCP 内容止步于那个宏大的理念：一种将 AI tools 连接到外部系统的标准方式。这很有用，但当你坐在一个 Python 项目前、苦思该先构建什么时，它帮不了多少。本指南走的是务实的路线。如果你想把 **Model Context Protocol Python** 理解到足以交付某个东西的程度，最好的起点是一个小型服务器，它暴露一个 tool、一个 resource 和一个明确的用例。

这个切入点目前有着强烈的搜索意图，因为开发者们正在越过通用的"AI agents"实验，转而提出一个更狭窄的问题：我该如何把模型连接到真实的文件、APIs 和业务逻辑，而不必每次都发明一层自定义的胶水层？如果你还在构建你的第一个 agent，请从我们的 [Building AI Agents with Python](/posts/Building-AI-Agents-with-Python/) 指南开始。

## 为什么这个话题现在正流行

MCP 已经从一个小众的协议话题，转变为主流的开发者工作流。

Anthropic 在 2025 年 12 月宣布，MCP 将在 Anthropic、OpenAI、Microsoft、Google、AWS、Cloudflare、Block 和 Bloomberg 的支持下捐赠给 Agentic AI Foundation。在同一份公告中，Anthropic 表示 MCP 拥有超过 10,000 个活跃的公共服务器，并已被 ChatGPT、Cursor、Gemini、Microsoft Copilot 和 VS Code 等产品采用。这很重要，因为它把 MCP 从一个有趣的想法变成了一条分发渠道。

对于 Python 开发者来说，时机尤其好。官方 SDK 页面将 Python 列为 Tier 1 SDK，这表明了强有力的维护承诺和功能的完整性。换句话说，Python MCP 技术栈不再是一个投机性的关键词。它对应着一条已经拥有官方文档、活跃 SDK 和清晰实现模式的工具链。

## MCP 实际上给 Python 开发者带来了什么

思考 MCP 最简单的方式是这样的：它标准化了 AI 应用程序与它可以使用的 context 或动作之间的边界。

官方 Python SDK 描述了三个核心的服务器构建块：

- tools：用于模型可以调用的动作
- resources：用于应用程序可以加载的只读 context
- prompts：用于可复用的交互模板

这种区分很重要。

### Tools

tools 是你的集成中主动的部分。它们可以运行代码、调用 APIs、写入数据或触发副作用。如果你的助手需要创建工单、查询 weather API 或启动一个任务，那就属于 tool。

### Resources

resources 是被动的部分。它们的行为更像传统 API 中的 GET 端点。它们暴露有用的 context，例如文档、配置或参考数据，而不改变任何东西。

### Prompts

prompts 让你可以打包可复用的指令或交互模式，使客户端能够以结构化的方式调用它们。

这种分离才是真正的价值所在。在 MCP 之前，许多团队把所有东西都塞进一个臃肿的 tool schema，或者单纯依赖 prompt engineering。有了这个协议，架构变得更易于推理，也更易于在不同客户端之间复用。

根据我在 Codiste 部署 tool-calling 模式的经验，tools 与 resources 之间的这种区分本可以为我们节省大量重构时间。当我使用微调的 transformers 构建一个 Document AI 系统时，我们最初通过同一个接口将文档解析同时暴露为一个动作和一个数据源，这造成了关于模型何时应该调用它、何时应该预加载 context 的混乱。像 MCP 所强制实施的那种协议级别的分离，本可以完全避免这种情况。

## 先构建一个小型 MCP 服务器

官方 Python SDK 的快速入门使用了 `FastMCP`，这是一个合适的起点。它把协议细节挡在一边，让你能够专注于你真正想要暴露的能力。

用 `uv` 或 `pip` 任一方式安装它：

```bash
uv add "mcp[cli]"
```

或者：

```bash
pip install "mcp[cli]"
```

然后从一个最小化的服务器开始：

```python
from mcp.server.fastmcp import FastMCP

mcp = FastMCP("Demo", json_response=True)

@mcp.tool()
def add(a: int, b: int) -> int:
    """Add two numbers."""
    return a + b

@mcp.resource("greeting://{name}")
def greeting(name: str) -> str:
    """Return a greeting resource."""
    return f"Hello, {name}!"

@mcp.prompt()
def greet_user(name: str) -> str:
    return f"Write a friendly greeting for {name}."

if __name__ == "__main__":
    mcp.run(transport="streamable-http")
```

这个小小的例子教会了你几乎在每个真实服务器中都应遵循的模型：

1. 定义能力
2. 将其分类为 tool、resource 或 prompt
3. 使用标准 transport 运行服务器
4. 从宿主应用程序或 inspector 连接它

这正是让 **Model Context Protocol Python** 值得作为目标的务实关键词切入点。搜索者通常并不想要一篇关于协议的文章。他们想要一个可以在今天就加以改造的、首个可运行的服务器。

## 何时 MCP 优于自定义的 tool 胶水代码

如果你只需要为一个应用准备一个私有的辅助工具，直接调用 SDK 可能就足够了。但一旦复用和互操作性变得重要，MCP 就开始胜出。

在以下情况下使用 MCP：

- 同一能力应该在多个 AI clients 之间都能工作
- 你想在你的应用和你的 tools 之间有一个清晰的契约
- 你的团队需要让 tools、resources 和 prompts 保持区分
- 你预计集成的接触面会随时间增长

在以下情况下避免过度工程化：

- 你正在测试一个用完即弃的原型
- 逻辑与单个应用紧密耦合，并且不会被复用
- 你还不知道这个能力是否值得拥有一个正式的接口

关键的洞见在于，MCP 不仅仅关乎模型访问。它关乎以其他客户端能够理解的方式来打包 context 和动作。从长远来看，这是一个比反复编写一次性 function calling 包装器更有力的故事。例如，你可以将一个 [RAG 系统](/posts/RAG-with-Python-Retrieval-Augmented-Generation/) 暴露为一个 MCP resource，这样任何 agent 都能查询你的知识库。

## 面向生产友好起步的最佳实践

官方 SDK README 和服务器概念文档指向了几个值得尽早采用的习惯。

### 让 tools 保持狭窄

不要创建一个名为 `do_everything` 的 tool。更小的 tools 让模型更容易正确选择，也让你更容易测试。当我使用 ControlNet 为图像分割构建 AI agent 工作流时，我吃过苦头才学到这一点——一个宽泛的"process_image"tool 导致了持续的错误路由，而把它拆分为"segment_image"、"apply_controlnet"和"postprocess_output"则给了模型清晰的决策边界。

### 把只读数据放进 resources

如果某个东西应该被作为 context 加载，而不是作为动作执行，就把它暴露为一个 resource。这能让语义保持清晰。

### 仅在有帮助的地方使用 context

Python SDK 支持向 tools 注入 context，包括进度报告以及对 lifespan 管理的资源的访问。这很强大，但你并不需要为每个端点都用上它。

### 从一个 transport 和一个客户端开始

SDK 支持 stdio、SSE 和 Streamable HTTP 等 transports。选择一条路径，验证工作流，然后再扩展。[OpenAI Agents SDK](/posts/openai-agents-sdk-python/) 就是一个能与 MCP 服务器良好配合的客户端。

### 用 inspector 风格的工具进行测试

快速入门明确指向 MCP Inspector，作为在把服务器接入完整宿主应用程序之前测试它的一种方式。这是一个好习惯，因为它把协议问题与产品问题隔离开来。

## 最后的看法

**Model Context Protocol Python** 现在拥有真正 SEO 价值的原因很简单：它把趋势的势头与立即实现的意图结合在了一起。开发者们在各大主流 AI 产品中听到 MCP，然后转身去搜索使用它的最快 Python 路径。

如果那是你的目标，不要从一个完整的 agent 平台开始。在你已经理解的一个 Python 项目中，从一个有用的 MCP 服务器开始。暴露一个小型 tool，添加一个 resource，用 inspector 测试它，并把它连接到你实际使用的客户端。

那种工作流教会你协议的速度，比抽象的阅读所能做到的要快得多。一旦它运行起来，你就可以从一个单一的本地服务器，成长为一个面向内部工具、文档系统、支持工作流或开发者自动化的可复用接口。

如果你想要本周一个具体的下一步，就围绕一个你已经在手动重复的任务，构建一个小型 MCP 服务器。那通常是从好奇心到真正有用之物的最短路径。

---

## 相关文章

- [OpenAI Agents SDK Python Tutorial](/posts/openai-agents-sdk-python/) - 构建消费 MCP tools 和 resources 的多 agent 工作流
- [Building AI Agents with Python](/posts/Building-AI-Agents-with-Python/) - 理解 MCP 所标准化的 agent loop、tool 使用和 memory 模式
- [RAG with Python: Retrieval-Augmented Generation](/posts/RAG-with-Python-Retrieval-Augmented-Generation/) - 构建一个可以暴露为 MCP resource 的知识检索系统

## 来源

- [Build an MCP Server](https://modelcontextprotocol.io/quickstart)
- [MCP SDKs](https://modelcontextprotocol.io/docs/sdk)
- [MCP Python SDK README](https://github.com/modelcontextprotocol/python-sdk)
- [Understanding MCP Servers](https://modelcontextprotocol.io/docs/learn/server-concepts)
- [Anthropic: Donating the Model Context Protocol and establishing the Agentic AI Foundation](https://www.anthropic.com/news/donating-the-model-context-protocol-and-establishing-of-the-agentic-ai-foundation)
