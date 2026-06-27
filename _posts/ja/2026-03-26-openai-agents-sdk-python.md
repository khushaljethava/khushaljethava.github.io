---
title: "OpenAI Agents SDK Python チュートリアル：賢いAI Agentをより速く構築する"
description: "OpenAI Agents SDK を Python で使い、tool連携・tracing・handoffを備えたマルチエージェントのワークフローを、本番運用に耐えるクリーンな構成で構築する方法を解説します。"
date: 2026-03-26 23:45:00 +0530
categories: [Python]
tags: [python, ai, agents, openai, llm]
lang: ja
permalink: /posts/openai-agents-sdk-python/
translations: [hi, es, pt, fr, de, ja, ko, ar, zh]
image:
  path: /commons/openai-agents-sdk-python-hero.webp
  alt: OpenAI Agents SDK Python チュートリアルのヒーロー画像
---

AI agent のチュートリアルはあふれていますが、その多くは本番運用で最も重要な部分を飛ばしています。すなわち、tool をどう構造化するか、作業をどの専門エージェントへルーティングするか、そして実行中に実際に何が起きたかをどう検査するか、という点です。だからこそ **OpenAI Agents SDK Python** は今まさに強いテーマなのです。検索意図は明確で、このキーワードは現実の実装課題に対応しており、公式ドキュメントはすでに、単純な prompt から tracing 付きのルーティングされたワークフローまでの道筋を開発者に示しています。

一度きりの chatbot スクリプトから先へ進みたいなら、本ガイドが SDK の得意分野、始め方、そして実用的な Python スタックのどこに収まるかを示します。エージェント・アーキテクチャの全体像については、[Building AI Agents with Python](/posts/Building-AI-Agents-with-Python/) のガイドもご覧ください。

## なぜ今このテーマが重要なのか

現在のエージェントに関する議論は、「モデルを呼び出せるか?」から「その周りに信頼できるワークフローを構築できるか?」へと移りました。この変化は、検索の観点でもプロダクト開発の観点でも重要です。

OpenAI の SDK 公式 quickstart は、開発者が最初に気にする部分に焦点を当てています。

- agent を作成する
- runner で実行する
- tool を接続する
- 追加の agent を加える
- handoff を定義する
- trace を確認する

この流れが重要なのは、実際のプロダクト成長を反映しているからです。通常はまず 1 つの agent から始め、次に tool を加え、その後責務を分割し、最後に挙動をデバッグします。2025 年 10 月、OpenAI は AgentKit を、従来の Responses API と Agents SDK のスタックを発展させたものとして紹介しました。これは、エージェント・ワークフローが一時的な実験ではなく戦略的な領域であり続けているという良い兆候です。

Python に特化したサイトにとって、これは漠然とした「AI agents explained」型の記事よりも優れた SEO ターゲットです。**OpenAI Agents SDK Python** を検索する人は、広範な理論ではなく、コード・セットアップ手順・アーキテクチャの指針を求めている可能性が高いのです。

## OpenAI Agents SDK が実際に提供するもの

SDK が有用なのは、一般的なエージェント・パターンに対してよりクリーンな抽象化を提供するからです。

### 1. Agents

agent は、指示・名前・任意の設定を組み合わせたものです。単純に聞こえますが、prompt をアプリケーション・コード全体に散らかす代わりに、推論しやすい再利用可能な単位を作り出します。

### 2. Tools

tool は、Python 関数の呼び出し、データの参照、ビジネス・アクションの起動など、agent に具体的な処理をさせます。ここから agent はデモではなくプロダクトになり始めます。

### 3. Handoffs

handoff は、ある agent が別の専門エージェントへ作業をルーティングできるようにします。次のようなトリアージ層が欲しいときに便利です。

1. サポート用ルーター
2. 請求の専門エージェント
3. ドキュメントの専門エージェント

このパターンは、指示が多すぎる 1 つの巨大な agent よりも保守しやすいことが多いです。

Codiste で AI agent フレームワークを構築してきた経験から言えば、デモ用の agent と本番運用可能な agent を分けるのは、この handoff パターンです。LSTM と BART を使った生成型 chatbot システムを構築したとき、最初はすべての機能を 1 つの agent に詰め込もうとして、prompt の競合と予測不能なルーティングという壁にすぐぶつかりました。明確な handoff ルールを持つ専門 agent に分割したことで、システムは劇的に信頼できるものになりました。

### 4. Tracing

tracing は最大級の実用的メリットの 1 つです。agent が誤った tool を選んだり、リクエストをうまくルーティングできなかったりしたとき、可視性が必要になります。SDK のドキュメントは、実行を推測する代わりに検査できるよう、開発者を明示的に Trace viewer へ案内しています。

## 最初のプロジェクトのためのクイックセットアップ

公式 quickstart は標準的な Python プロジェクト構成を使います。最小構成のインストールは次のようになります。

```bash
python -m venv .venv
.venv\Scripts\activate
pip install openai-agents
```

例を実行する前に、環境に `OPENAI_API_KEY` も必要です。

そこから先、最小の動作する例は分かりやすいものです。

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

この例は意図的に小さくしていますが、中心となる契約を示しています。agent を定義し、入力を runner に渡し、最終出力を読む、というものです。

## tool を加えると SDK は格段に便利になる

**OpenAI Agents SDK Python** が面白くなるのは tool の利用です。公式ドキュメントは `function_tool` パターンを示しており、これは Python のロジックを agent に公開するクリーンな方法です。

簡単な例を示します。

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

このパターンは、すべての回答を prompt に詰め込むよりもうまくスケールします。モデルがビジネス・ルールを覚えていることを期待する代わりに、安定したロジックを Python 関数へ移し、必要なときに agent に呼び出させることができます。

実際のアプリを構築するブログ読者にとって、強調すべき独自の観点はこれです。SDK は単なるモデル呼び出しのラッパーではありません。推論・ルーティング・実行の境界をより明確にしたい Python チームのためのワークフロー層です。tool とコンテキストを agent に公開する標準化された方法については、[Model Context Protocol](/posts/model-context-protocol-python/) がこのアプローチをどう補完するかをご覧ください。

## 混乱なきマルチエージェント・ルーティング

多くの開発者は、1 つの agent に多くを担わせた途端に複雑さにぶつかります。quickstart は、複数の agent と handoff を示すことでこれに正面から対処しています。

たとえば、次のように作成できます。

- 受信リクエスト用の triage agent
- 技術的な質問用の coding agent
- テキストの書き換えや要約用の content agent

この設計には 2 つの利点があります。第 1 に、prompt が小さく保守しやすくなります。第 2 に、各 agent の仕事が絞られるため、評価がより意味のあるものになります。

社内ツール、サポート・システム、研究アシスタントを書いているなら、**OpenAI Agents SDK Python** は、独自のオーケストレーション層を発明する前の妥当な既定の構造を与えてくれます。これにより時間を節約でき、早い段階で技術的負債を減らせます。

## リリース前のベストプラクティス

デモから本番へ移る場合、次のルールを念頭に置いてください。

- モデルがいつ呼び出すべきか分かるよう、tool の説明を明示的に保つ
- ルーティングの挙動とドメインの専門性を分離する
- prompt を闇雲に変える前に trace を検査する
- 1 つの agent と 1 つの tool から始め、必要なときだけ handoff を加える
- 決定論的なビジネス・ロジックは長い指示ではなく Python へ移す

本番でエージェント・フレームワークを扱って学んだ教訓は、tracing は譲れないということです。当初、エッジケースの入力で静かに誤った tool を呼んでいた agent のデバッグに何時間も費やしました。構造化された trace ロギングを加えた途端、それらの問題は容易に診断できるようになりました。

もう 1 つ実用的な点として、すべてのワークフローが複数の agent を必要とするわけではありません。よく設計された 2 つの tool を持つ 1 つの agent が、よりクリーンな解になることもあります。SDK は両方のパターンをサポートしており、ドキュメントは、agent を tool として利用できるオーケストレーター型の構成と handoff を明確に区別しています。

その柔軟性も、このキーワードを狙う価値がある理由の 1 つです。**OpenAI Agents SDK Python** を検索する人は、たいてい実装の一歩手前にいます。彼らが求めるのは、例、トレードオフ、そしてプロジェクトが大きくなっても崩れない道筋です。

## まとめ

サイトが Python・AI・開発者向けツールを扱っているなら、これは質の高い検索トラフィックを引き寄せられるタイプのテーマです。最新で、実用的で、いまも拡大を続ける公式エコシステムと結びついています。

正しい次の一歩は、作り込みすぎないことです。1 つの agent から始め、1 つの function tool を加え、いくつかの実際の prompt を実行し、trace を確認しましょう。それがうまくいったら、ルーティングが本当に役立つ箇所だけ責務を分割します。

今週、本番に適した最初のエージェント・ワークフローを構築したいなら、**OpenAI Agents SDK Python** は最も分かりやすい出発点の 1 つです。quickstart を試し、例を自分のドメインに合わせ、1 つの有用なワークフローを再利用可能な agent サービスへと変えましょう。agent にドメイン固有の推論が必要なら、それらを動かすために [LLM を fine-tune](/posts/Fine-Tuning-LLMs-with-Python/) することもできます。

---

## 関連記事

- [Building AI Agents with Python: A Complete Guide](/posts/Building-AI-Agents-with-Python/) - AI agent のアーキテクチャ、tool 利用、メモリの基礎をゼロから学ぶ
- [Model Context Protocol Python Tutorial](/posts/model-context-protocol-python/) - MCP で agent と tool・外部データの接続方法を標準化する
- [Fine-Tuning Large Language Models with Python](/posts/Fine-Tuning-LLMs-with-Python/) - エージェント・ワークフローを動かすドメイン固有モデルを訓練する

## 出典

- [OpenAI Agents SDK Quickstart](https://openai.github.io/openai-agents-python/quickstart/)
- [Introducing AgentKit | OpenAI](https://openai.com/index/introducing-agentkit/)
