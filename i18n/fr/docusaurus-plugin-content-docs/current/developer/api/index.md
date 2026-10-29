---
title: "API"
---

# API

<div class="article-intro">

L'API ChurchApps est un **monolithe modulaire** -- une seule base de code qui sert six modules de données, chacun avec sa propre base de données. Cette architecture offre les avantages organisationnels des microservices (frontières claires, magasins de données indépendants) avec la simplicité opérationnelle d'un seul déploiement.

</div>

## Modules

| Module | Objectif |
|--------|----------|
| **Membership** | Personnes, groupes, foyers, autorisations |
| **Attendance** | Services, séances, enregistrements |
| **Content** | Pages, sections, éléments, diffusion en direct |
| **Giving** | Dons, fonds, traitement des paiements |
| **Messaging** | Conversations, notifications, e-mail |
| **Doing** | Tâches, plans, affectations |

## Pile technologique

- **Environnement d'exécution :** Node.js 24.x avec TypeScript (modules ES)
- **Framework :** Express
- **Injection de dépendances :** Inversify (routage par décorateurs)
- **Base de données :** MySQL -- une base par module, chacune avec son propre pool de connexions
- **Authentification :** authentification basée sur JWT via `CustomAuthProvider`
- **Déploiement :** AWS Lambda avec Serverless Framework v3

## Ports

| Protocole | Port | Description |
|----------|------|-------------|
| HTTP | `8084` | API REST principale |
| WebSocket | `8087` | Connexions socket en temps réel |

## Fonctions Lambda

Lorsqu'elle est déployée sur AWS, l'API fonctionne comme six fonctions Lambda :

- **`web`** -- Traite toutes les requêtes HTTP
- **`socket`** -- Gère les connexions WebSocket
- **`timer15Min`** -- S'exécute toutes les 30 minutes pour les e-mails de notification (le nom est historique)
- **`timerMidnight`** -- S'exécute chaque jour pour les e-mails de résumé et les tâches de maintenance
- **`timerScheduledTasks`** -- S'exécute chaque jour pour les automatisations échues et le traitement des flux de travail en retard
- **`timerWebhooks`** -- S'exécute toutes les minutes pour livrer les webhooks sortants en file d'attente

## Bibliothèques partagées

L'API dépend de deux paquets partagés de ChurchApps :

- **[`@churchapps/helpers`](../shared-libraries/helpers)** -- Utilitaires de base (DateHelper, ApiHelper, etc.)
- **[`@churchapps/apihelper`](../shared-libraries/api-helper)** -- Utilitaires de serveur Express, y compris l'authentification, les aides de base de données et les intégrations AWS

:::info
L'API utilise les modules ES (`"type": "module"` dans `package.json`). Assurez-vous que vos imports utilisent la syntaxe des modules ES.
:::

## Dans cette section

- **[Installation locale](./local-setup)** -- Cloner, configurer et exécuter l'API localement
- **[Base de données](./database)** -- Architecture une base par module, scripts de schéma et modèles d'accès aux données
- **[Structure des modules](./module-structure)** -- Contrôleurs, dépôts, modèles et authentification
- **[Clés API](./api-keys)** -- Jetons d'accès personnels pour les scripts et les connecteurs
- **[Applications connectées (OAuth)](./connected-apps)** -- Flux OAuth multilocataire pour les applications tierces
- **[Webhooks](./webhooks)** -- Envoi de notifications d'événements vers des systèmes externes
- **[Serveur MCP](./mcp)** -- Point de terminaison Model Context Protocol qui expose l'API aux assistants IA
- **[Référence des points de terminaison](./endpoints/)** -- Documentation REST complète pour tous les modules
