---
title: "API"
---

# API

<div class="article-intro">

L'API ChurchApps est un **monolithe modulaire** -- une seule base de code qui sert six modules distincts, chacun avec sa propre base de données. Cette architecture vous offre les avantages organisationnels des microservices (limites claires, magasins de données indépendants) avec la simplicité opérationnelle d'un seul déploiement.

</div>

## Modules

| Module | Objectif |
|--------|---------|
| **Membership** | Personnes, groupes, ménages, permissions |
| **Attendance** | Services, sessions, enregistrements d'enregistrement |
| **Content** | Pages, sections, éléments, streaming |
| **Giving** | Donations, fonds, traitement des paiements |
| **Messaging** | Conversations, notifications, e-mail |
| **Doing** | Tâches, plans, assignations |

## Pile technique

- **Runtime:** Node.js 22.x avec TypeScript (modules ES)
- **Framework:** Express
- **Injection de dépendances:** Inversify (routage basé sur les décorateurs)
- **Base de données:** MySQL -- une base de données par module, chacun avec son propre pool de connexions
- **Auth:** Authentification basée sur JWT via `CustomAuthProvider`
- **Déploiement:** AWS Lambda via Serverless Framework v3

## Ports

| Protocole | Port | Description |
|----------|------|-------------|
| HTTP | `8084` | API REST principale |
| WebSocket | `8087` | Connexions de socket en temps réel |

## Fonctions Lambda

Lorsqu'ils sont déployés sur AWS, l'API s'exécute sous la forme de quatre fonctions Lambda :

- **`web`** -- Gère toutes les requêtes HTTP
- **`socket`** -- Gère les connexions WebSocket
- **`timer15Min`** -- S'exécute toutes les 15 minutes pour les notifications par e-mail
- **`timerMidnight`** -- S'exécute quotidiennement pour les e-mails de synthèse et les tâches de maintenance

## Bibliothèques partagées

L'API dépend de deux packages ChurchApps partagés :

- **[`@churchapps/helpers`](../shared-libraries/helpers)** -- Utilitaires de base (DateHelper, ApiHelper, etc.)
- **[`@churchapps/apihelper`](../shared-libraries/api-helper)** -- Utilitaires du serveur Express y compris l'authentification, les aides de base de données et les intégrations AWS

:::info
L'API utilise les modules ES (`"type": "module"` dans `package.json`). Assurez-vous que vos importations utilisent la syntaxe du module ES.
:::

## Dans cette section

- **[Configuration locale](./local-setup)** -- Cloner, configurer et exécuter l'API localement
- **[Base de données](./database)** -- Architecture de base de données par module, scripts de schéma et modèles d'accès aux données
- **[Structure des modules](./module-structure)** -- Contrôleurs, dépôts, modèles et authentification
- **[Clés API](./api-keys)** -- Jetons d'accès personnel pour les scripts et les connecteurs
- **[Applications connectées (OAuth)](./connected-apps)** -- Flux OAuth multi-tenant pour les applications tierces
- **[Webhooks](./webhooks)** -- Notifications d'événements push vers les systèmes externes
- **[Serveur MCP](./mcp)** -- Point de terminaison Model Context Protocol qui expose l'API aux assistants IA
- **[Référence des endpoints](./endpoints/)** -- Documentation complète de l'API REST pour tous les modules
