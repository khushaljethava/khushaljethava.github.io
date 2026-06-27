---
title: "Model Context Protocol Python チュートリアル：最初の MCP サーバーを構築する"
description: 実践的な最初のサーバー構築チュートリアル、MCP の中核概念、そしてカスタムスクリプトから再利用可能な AI ツールへの最短経路を通じて、Model Context Protocol を Python で学びます。
date: 2026-03-27 09:20:00 +0530
categories: [Python]
tags: [python, mcp, ai, agents, developer-tools]
lang: ja
translations: [hi, es, pt, fr, de, ja, ko, ar, zh]
image:
  path: /commons/model-context-protocol-python-hero.webp
  alt: Model Context Protocol Python チュートリアルのヒーロー画像
---

ほとんどの MCP コンテンツは大きなアイデアで止まっています。すなわち、AI tools を外部システムに接続するための標準的な方法、というアイデアです。それは有用ですが、Python プロジェクトに向かい合って「まず何を作ればいいのか」と悩んでいるときには、あまり役に立ちません。本ガイドは実践的な道を取ります。何かを出荷できる程度に **Model Context Protocol Python** を理解したいなら、最良の出発点は、1 つの tool、1 つの resource、そして 1 つの明確なユースケースを公開する小さなサーバーです。

その切り口には今まさに強い検索意図があります。なぜなら開発者は汎用的な「AI agents」の実験を通り越し、より絞り込まれた問いを投げかけているからです。すなわち、毎回カスタムの接着レイヤーを発明することなく、どうやってモデルを実際のファイル、APIs、ビジネスロジックに接続するのか、という問いです。まだ最初の agent を構築している段階なら、まず [Building AI Agents with Python](/posts/Building-AI-Agents-with-Python/) のガイドから始めてください。

## なぜ今このトピックがトレンドなのか

MCP はニッチなプロトコルの話題から、主流の開発者ワークフローへと移行しました。

Anthropic は 2025 年 12 月に、MCP が Anthropic、OpenAI、Microsoft、Google、AWS、Cloudflare、Block、Bloomberg の支援のもとで Agentic AI Foundation に寄贈されることを発表しました。同じ発表の中で Anthropic は、MCP には 10,000 を超えるアクティブなパブリックサーバーがあり、ChatGPT、Cursor、Gemini、Microsoft Copilot、VS Code といった製品に採用されていると述べました。これが重要なのは、MCP を興味深いアイデアから流通チャネルへと変えるからです。

Python 開発者にとって、タイミングは特に良好です。公式の SDK ページは Python を Tier 1 SDK として挙げており、これは強力なメンテナンスへのコミットメントと機能の完成度を示しています。言い換えれば、Python の MCP スタックはもはや投機的なキーワードではありません。それは、すでに公式ドキュメント、活発な SDK、明確な実装パターンを備えたツールチェーンに対応しています。

## MCP が Python 開発者に実際にもたらすもの

MCP について考える最もシンプルな方法はこうです。MCP は、AI アプリケーションと、それが利用できる context やアクションとの境界を標準化します。

公式の Python SDK は、3 つの中核となるサーバーの構成要素を説明しています：

- tools：モデルが呼び出せるアクションのため
- resources：アプリケーションが読み込める読み取り専用の context のため
- prompts：再利用可能なインタラクションテンプレートのため

この区別が重要です。

### Tools

tools は統合の能動的な部分です。コードを実行したり、APIs を呼び出したり、データを書き込んだり、副作用をトリガーしたりできます。アシスタントがチケットを作成したり、weather API にクエリを送ったり、ジョブを開始したりする必要があるなら、それは tool に属します。

### Resources

resources は受動的な部分です。従来の API における GET エンドポイントのように振る舞います。何も変更することなく、ドキュメント、設定、参照データといった有用な context を公開します。

### Prompts

prompts を使うと、再利用可能な指示やインタラクションパターンをパッケージ化でき、クライアントが構造化された方法でそれらを呼び出せるようになります。

この分離こそが本当の価値です。MCP 以前は、多くのチームがすべてを 1 つの肥大化した tool schema、あるいは prompt engineering だけに押し込んでいました。このプロトコルを使うと、アーキテクチャは推論しやすくなり、クライアントをまたいで再利用しやすくなります。

Codiste で tool-calling パターンをデプロイした経験では、tools と resources のこの区別があれば、相当なリファクタリング時間を節約できたはずです。ファインチューニングした transformers を使って Document AI システムを構築したとき、私たちは当初、ドキュメント解析をアクションとデータソースの両方として同じインターフェースを通じて公開しており、モデルがいつそれを呼び出すべきか、いつ context をプリロードすべきかについて混乱を招きました。MCP が強制するようなプロトコルレベルの分離があれば、それを完全に防げたでしょう。

## まずは小さな MCP サーバーを構築する

公式の Python SDK のクイックスタートは `FastMCP` を使っており、これは始めるのにふさわしい場所です。プロトコルの細部を邪魔にならないようにしてくれるので、公開したい実際の能力に集中できます。

`uv` または `pip` のいずれかでインストールします：

```bash
uv add "mcp[cli]"
```

または：

```bash
pip install "mcp[cli]"
```

そして、最小限のサーバーから始めます：

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

その小さな例は、ほぼすべての実際のサーバーで従うべきモデルを教えてくれます：

1. 能力を定義する
2. それを tool、resource、または prompt として分類する
3. 標準的な transport でサーバーを実行する
4. ホストアプリケーションまたはインスペクタから接続する

これが、**Model Context Protocol Python** をターゲットにする価値がある実践的なキーワードの切り口です。検索する人は通常、プロトコルに関するエッセイを求めているわけではありません。彼らは、今日すぐに適応できる、最初の動作するサーバーを求めています。

## MCP がカスタムの tool 接着剤より優れているとき

1 つのアプリ向けに 1 つのプライベートヘルパーだけが必要なら、直接の SDK 呼び出しで十分かもしれません。しかし、再利用性と相互運用性が重要になった瞬間から、MCP は優位に立ち始めます。

次のような場合に MCP を使います：

- 同じ能力が複数の AI clients をまたいで機能すべきとき
- アプリと tools の間にクリーンな契約が欲しいとき
- チームが tools、resources、prompts を明確に区別し続ける必要があるとき
- 統合の表面積が時間とともに成長すると見込んでいるとき

次のような場合は過剰な設計を避けます：

- 使い捨ての試作品を 1 つテストしているとき
- ロジックが単一のアプリに密結合しており、再利用されないとき
- その能力が正式なインターフェースに値するかどうかまだわからないとき

重要な洞察は、MCP が単にモデルアクセスについてだけのものではないということです。それは、他のクライアントが理解できる方法で context とアクションをパッケージ化することについてのものです。それは、その場限りの function calling ラッパーを何度も何度も書くよりも、長期的に強力なストーリーです。たとえば、[RAG システム](/posts/RAG-with-Python-Retrieval-Augmented-Generation/) を MCP の resource として公開すれば、どんな agent でもあなたのナレッジベースにクエリを送れるようになります。

## プロダクション向けの良いスタートのためのベストプラクティス

公式の SDK README とサーバー概念のドキュメントは、早期に採用する価値のあるいくつかの習慣を示しています。

### tools を狭く保つ

`do_everything` という 1 つの tool を作ってはいけません。より小さい tools は、モデルが正しく選びやすく、あなたがテストしやすくなります。ControlNet を使った画像セグメンテーションのための AI agent ワークフローを構築したとき、私はこれを苦い経験から学びました——広範な「process_image」tool は絶え間ないミスルーティングを引き起こしましたが、それを「segment_image」「apply_controlnet」「postprocess_output」に分割すると、モデルに明確な判断境界が与えられました。

### 読み取り専用データは resources に置く

アクションとして実行されるのではなく、context として読み込まれるべきものなら、それを resource として公開します。そうすればセマンティクスが明確に保たれます。

### context は役立つ場所でのみ使う

Python SDK は、進捗報告や lifespan 管理されたリソースへのアクセスを含む、tools への context 注入をサポートしています。それは強力ですが、すべてのエンドポイントで必要なわけではありません。

### 1 つの transport と 1 つのクライアントから始める

SDK は stdio、SSE、Streamable HTTP といった transports をサポートしています。1 つの経路を選び、ワークフローを実証し、それから拡張します。[OpenAI Agents SDK](/posts/openai-agents-sdk-python/) は、MCP サーバーとうまく連携する 1 つのクライアントです。

### インスペクタ形式のツールでテストする

クイックスタートは、サーバーを完全なホストアプリケーションに組み込む前にテストする方法として、MCP Inspector を明示的に指し示しています。これは良い習慣です。なぜなら、プロトコルの問題を製品の問題から切り離せるからです。

## 最後に

**Model Context Protocol Python** が今まさに本物の SEO 価値を持つ理由はシンプルです。それは、トレンドの勢いと、すぐに実装したいという意図を組み合わせているからです。開発者は主要な AI 製品全体で MCP について耳にし、そして振り返って、自分自身でそれを使うための最速の Python 経路を検索しています。

それがあなたの目標なら、フルの agent プラットフォームから始めないでください。あなたがすでに理解している Python プロジェクトの中で、1 つの有用な MCP サーバーから始めてください。小さな tool を公開し、1 つの resource を追加し、インスペクタでテストし、そして実際に使っているクライアントに接続してください。

そのワークフローは、抽象的な読書がこれまでに教えてくれる以上に速くプロトコルを教えてくれます。一度動作すれば、単一のローカルサーバーから、社内ツール、ドキュメントシステム、サポートワークフロー、開発者の自動化のための再利用可能なインターフェースへと成長させることができます。

今週の具体的な次の一歩が欲しいなら、すでに手作業で繰り返している 1 つのタスクを中心に、小さな MCP サーバーを構築してください。それは通常、好奇心から本当に有用な何かへの最短経路です。

---

## 関連記事

- [OpenAI Agents SDK Python Tutorial](/posts/openai-agents-sdk-python/) - MCP の tools と resources を消費するマルチエージェントワークフローを構築する
- [Building AI Agents with Python](/posts/Building-AI-Agents-with-Python/) - MCP が標準化する agent loop、tool の利用、memory パターンを理解する
- [RAG with Python: Retrieval-Augmented Generation](/posts/RAG-with-Python-Retrieval-Augmented-Generation/) - MCP の resource として公開できるナレッジ検索システムを構築する

## 出典

- [Build an MCP Server](https://modelcontextprotocol.io/quickstart)
- [MCP SDKs](https://modelcontextprotocol.io/docs/sdk)
- [MCP Python SDK README](https://github.com/modelcontextprotocol/python-sdk)
- [Understanding MCP Servers](https://modelcontextprotocol.io/docs/learn/server-concepts)
- [Anthropic: Donating the Model Context Protocol and establishing the Agentic AI Foundation](https://www.anthropic.com/news/donating-the-model-context-protocol-and-establishing-of-the-agentic-ai-foundation)
