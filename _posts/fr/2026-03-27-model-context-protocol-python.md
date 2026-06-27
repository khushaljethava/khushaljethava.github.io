---
title: "Tutoriel Model Context Protocol en Python : créez votre premier serveur MCP"
description: Apprenez Model Context Protocol en Python avec un tutoriel pratique de premier serveur, les concepts fondamentaux du MCP et le chemin le plus rapide des scripts personnalisés vers un outillage d'IA réutilisable.
date: 2026-03-27 09:20:00 +0530
categories: [Python]
tags: [python, mcp, ai, agents, developer-tools]
lang: fr
translations: [hi, es, pt, fr, de]
image:
  path: /commons/model-context-protocol-python-hero.webp
  alt: Image principale du tutoriel Model Context Protocol en Python
---

La plupart des contenus sur le MCP s'arrêtent à la grande idée : un moyen standard de connecter les outils d'IA à des systèmes externes. C'est utile, mais cela n'aide pas beaucoup lorsque vous êtes devant un projet Python à vous demander quoi construire en premier. Ce guide emprunte la voie pratique. Si vous voulez comprendre **Model Context Protocol Python** assez bien pour livrer quelque chose, le meilleur point de départ est un petit serveur qui expose un outil, une ressource et un cas d'usage clair.

Cet angle a une forte intention de recherche en ce moment, car les développeurs dépassent les expériences génériques d'« agents d'IA » et se posent une question plus précise : comment connecter des modèles à de vrais fichiers, des API et de la logique métier sans inventer à chaque fois une couche de colle personnalisée ? Si vous construisez encore votre premier agent, commencez par notre guide [Créer des agents d'IA avec Python](/posts/Building-AI-Agents-with-Python/).

## Pourquoi ce sujet est tendance maintenant

Le MCP est passé d'une discussion de protocole de niche au flux de travail principal des développeurs.

Anthropic a annoncé en décembre 2025 que le MCP était donné à l'Agentic AI Foundation avec le soutien d'Anthropic, OpenAI, Microsoft, Google, AWS, Cloudflare, Block et Bloomberg. Dans la même annonce, Anthropic a indiqué que le MCP comptait plus de 10 000 serveurs publics actifs et avait été adopté par des produits tels que ChatGPT, Cursor, Gemini, Microsoft Copilot et VS Code. Cela compte parce que cela transforme le MCP d'une idée intéressante en un canal de distribution.

Pour les développeurs Python, le moment est particulièrement bien choisi. La page officielle des SDK répertorie Python comme un SDK de niveau 1, ce qui signale un fort engagement de maintenance et une complétude des fonctionnalités. Autrement dit, la pile Python pour le MCP n'est plus un mot-clé spéculatif. Elle correspond à une chaîne d'outils qui dispose déjà d'une documentation officielle, d'un SDK actif et de modèles d'implémentation clairs.

## Ce que le MCP apporte réellement aux développeurs Python

La façon la plus simple de penser au MCP est la suivante : il standardise la frontière entre une application d'IA et le contexte ou les actions qu'elle peut utiliser.

Le SDK Python officiel décrit trois blocs de construction de serveur fondamentaux :

- tools pour les actions que le modèle peut invoquer
- resources pour le contexte en lecture seule que l'application peut charger
- prompts pour des modèles d'interaction réutilisables

Cette distinction est importante.

### Tools

Les tools sont la partie active de votre intégration. Ils peuvent exécuter du code, appeler des API, écrire des données ou déclencher des effets de bord. Si votre assistant doit créer un ticket, interroger une API météo ou lancer une tâche, cela relève d'un tool.

### Resources

Les resources sont la partie passive. Elles se comportent davantage comme des endpoints GET dans une API traditionnelle. Elles exposent un contexte utile, comme de la documentation, de la configuration ou des données de référence, sans rien modifier.

### Prompts

Les prompts vous permettent de packager des instructions réutilisables ou des modèles d'interaction afin que les clients puissent les appeler de manière structurée.

Cette séparation est la véritable valeur. Avant le MCP, de nombreuses équipes entassaient tout dans un schéma de tool surdimensionné ou dans la seule ingénierie de prompts. Avec ce protocole, l'architecture devient plus facile à raisonner et à réutiliser entre clients.

D'après mon expérience de déploiement de modèles d'appel d'outils chez Codiste, cette distinction entre tools et resources nous aurait fait gagner un temps de refactorisation considérable. Lorsque j'ai construit un système de Document AI à l'aide de transformers affinés, nous avons initialement exposé l'analyse de documents à la fois comme une action et comme une source de données via la même interface, ce qui a créé une confusion sur le moment où le modèle devait l'appeler par rapport au moment où le contexte devait être préchargé. Une séparation au niveau du protocole comme celle qu'impose le MCP l'aurait entièrement évité.

## Construisez d'abord un petit serveur MCP

Le démarrage rapide du SDK Python officiel utilise `FastMCP`, qui est le bon endroit pour commencer. Il garde les détails du protocole à l'écart pour que vous puissiez vous concentrer sur la capacité réelle que vous voulez exposer.

Installez-le avec `uv` ou `pip` :

```bash
uv add "mcp[cli]"
```

ou :

```bash
pip install "mcp[cli]"
```

Puis commencez par un serveur minimal :

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

Ce petit exemple enseigne le modèle que vous devriez suivre pour presque tout serveur réel :

1. définir la capacité
2. la classer comme tool, resource ou prompt
3. exécuter le serveur avec un transport standard
4. la connecter depuis une application hôte ou un inspecteur

C'est l'angle pratique de mot-clé qui rend **Model Context Protocol Python** digne d'être ciblé. Les chercheurs ne veulent généralement pas un essai sur le protocole. Ils veulent un premier serveur fonctionnel qu'ils peuvent adapter dès aujourd'hui.

## Quand le MCP est meilleur que la colle d'outils personnalisée

Si vous n'avez besoin que d'un seul assistant privé pour une seule application, un appel direct au SDK peut suffire. Mais le MCP commence à l'emporter dès que la réutilisation et l'interopérabilité comptent.

Utilisez le MCP lorsque :

- la même capacité doit fonctionner sur plusieurs clients d'IA
- vous voulez un contrat propre entre votre application et vos outils
- votre équipe a besoin que tools, resources et prompts restent distincts
- vous vous attendez à ce que la surface d'intégration grandisse avec le temps

Évitez la sur-ingénierie lorsque :

- vous testez un prototype jetable
- la logique est fortement couplée à une seule application et ne sera pas réutilisée
- vous ne savez pas encore si la capacité mérite une interface formelle

L'idée clé est que le MCP ne concerne pas seulement l'accès au modèle. Il s'agit d'empaqueter le contexte et les actions d'une manière que d'autres clients peuvent comprendre. C'est une histoire à long terme plus solide que d'écrire encore et encore des wrappers ponctuels d'appel de fonction. Par exemple, vous pourriez exposer un [système RAG](/posts/RAG-with-Python-Retrieval-Augmented-Generation/) comme une resource MCP afin que n'importe quel agent puisse interroger votre base de connaissances.

## Bonnes pratiques pour un démarrage adapté à la production

Le README officiel du SDK et la documentation sur les concepts de serveur pointent vers quelques habitudes qu'il vaut la peine d'adopter tôt.

### Gardez les tools restreints

Ne créez pas un seul tool appelé `do_everything`. Les tools plus petits sont plus faciles à choisir correctement pour les modèles et plus faciles à tester pour vous. Lorsque j'ai construit des flux de travail d'agents d'IA pour la segmentation d'images à l'aide de ControlNet, je l'ai appris à mes dépens : un tool large « process_image » provoquait un mauvais routage constant, alors que le diviser en « segment_image », « apply_controlnet » et « postprocess_output » a donné au modèle des limites de décision claires.

### Mettez les données en lecture seule dans des resources

Si quelque chose doit être chargé comme contexte plutôt qu'exécuté comme une action, exposez-le comme une resource. Cela maintient une sémantique claire.

### N'utilisez le contexte que là où il aide

Le SDK Python prend en charge l'injection de contexte pour les tools, y compris le reporting de progression et l'accès aux ressources gérées par le cycle de vie. C'est puissant, mais vous n'en avez pas besoin pour chaque endpoint.

### Commencez avec un transport et un client

Le SDK prend en charge des transports tels que stdio, SSE et Streamable HTTP. Choisissez un chemin, prouvez le flux de travail, puis étendez. Le [OpenAI Agents SDK](/posts/openai-agents-sdk-python/) est un client qui fonctionne bien avec les serveurs MCP.

### Testez avec un outillage de type inspecteur

Le démarrage rapide pointe explicitement vers le MCP Inspector comme moyen de tester votre serveur avant de le câbler dans une application hôte complète. C'est une bonne habitude car elle isole les problèmes de protocole des problèmes de produit.

## Conclusion

La raison pour laquelle **Model Context Protocol Python** a une réelle valeur SEO en ce moment est simple : il combine l'élan de la tendance avec une intention d'implémentation immédiate. Les développeurs entendent parler du MCP dans les principaux produits d'IA, puis se tournent pour rechercher le chemin Python le plus rapide pour l'utiliser eux-mêmes.

Si c'est votre objectif, ne commencez pas par une plateforme d'agents complète. Commencez par un serveur MCP utile à l'intérieur d'un projet Python que vous comprenez déjà. Exposez un petit tool, ajoutez une resource, testez-le avec l'inspecteur et connectez-le au client que vous utilisez réellement.

Ce flux de travail enseigne le protocole plus rapidement que la lecture abstraite ne le fera jamais. Une fois qu'il fonctionne, vous pouvez passer d'un seul serveur local à une interface réutilisable pour des outils internes, des systèmes de documentation, des flux de travail de support ou de l'automatisation pour développeurs.

Si vous voulez une prochaine étape concrète cette semaine, construisez un petit serveur MCP autour d'une tâche que vous répétez déjà manuellement. C'est généralement le chemin le plus court de la curiosité vers quelque chose de réellement utile.

---

## Articles connexes

- [Tutoriel OpenAI Agents SDK en Python](/posts/openai-agents-sdk-python/) - Créez des flux de travail multi-agents qui consomment les tools et resources du MCP
- [Créer des agents d'IA avec Python](/posts/Building-AI-Agents-with-Python/) - Comprenez la boucle de l'agent, l'utilisation des outils et les modèles de mémoire que le MCP standardise
- [RAG avec Python : Retrieval-Augmented Generation](/posts/RAG-with-Python-Retrieval-Augmented-Generation/) - Construisez un système de récupération de connaissances que vous pouvez exposer comme une resource MCP

## Sources

- [Build an MCP Server](https://modelcontextprotocol.io/quickstart)
- [MCP SDKs](https://modelcontextprotocol.io/docs/sdk)
- [MCP Python SDK README](https://github.com/modelcontextprotocol/python-sdk)
- [Understanding MCP Servers](https://modelcontextprotocol.io/docs/learn/server-concepts)
- [Anthropic: Donating the Model Context Protocol and establishing the Agentic AI Foundation](https://www.anthropic.com/news/donating-the-model-context-protocol-and-establishing-of-the-agentic-ai-foundation)
