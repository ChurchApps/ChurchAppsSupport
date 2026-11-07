---
title: "API"
description: "Conception en monolithe modulaire de l’API ChurchApps : six modules de données, pile technique, ports, fonctions Lambda et liens vers les guides."
---

# API

<div class="article-intro">

L'API ChurchApps est un **monolithe modulaire** -- une seule base de code qui sert six modules de données, chacun disposant de sa propre base de données. Cette architecture offre les avantages organisationnels des microservices (frontières claires, magasins de données indépendants) avec la simplicité opérationnelle d'un déploiement unique.

</div>

## Modules

| Module | Objet |
|--------|---------|
| **Membership** | Personnes, groupes, foyers, autorisations |
| **Attendance** | Services, séances, registres de pointage |
| **Content** | Pages, sections, éléments, diffusion en direct |
| **Giving** | Dons, fonds, traitement des paiements |
| **Messaging** | Conversations, notifications, courriels |
| **Doing** | Tâches, plans, affectations |

## Pile technique

- **Environnement d'exécution :** Node.js 24.x avec TypeScript (modules ES)
- **Framework :** Express
- **Injection de dépendances :** Inversify (routage basé sur les décorateurs)
- **Base de données :** MySQL -- une base par module, chacune avec son propre pool de connexions
- **Authentification :** authentification par JWT via `CustomAuthProvider`
- **Déploiement :** AWS Lambda via Serverless Framework v3

## Ports

| Protocole | Port | Description |
|----------|------|-------------|
| HTTP | `8084` | API REST principale |
| WebSocket | `8087` | Connexions socket en temps réel |

## Fonctions Lambda

Lorsqu'elle est déployée sur AWS, l'API s'exécute sous forme de six fonctions Lambda :

- **`web`** -- Traite toutes les requêtes HTTP
- **`socket`** -- Gère les connexions WebSocket
- **`timer15Min`** -- S'exécute toutes les 30 minutes pour les courriels de notification (le nom est historique)
- **`timerMidnight`** -- S'exécute chaque jour pour les courriels récapitulatifs et les tâches de maintenance
- **`timerScheduledTasks`** -- S'exécute chaque jour pour les automatisations échues et le traitement des flux de travail en retard
- **`timerWebhooks`** -- S'exécute chaque minute pour livrer les webhooks sortants en file d'attente

## Bibliothèques partagées

L'API dépend de deux paquets partagés de ChurchApps :

- **[`@churchapps/helpers`](../shared-libraries/helpers.md)** -- Utilitaires de base (DateHelper, ApiHelper, etc.)
- **[`@churchapps/apihelper`](../shared-libraries/api-helper.md)** -- Utilitaires du serveur Express, dont l'authentification, les aides de base de données et les intégrations AWS

:::info
L'API utilise les modules ES (`"type": "module"` dans `package.json`). Assurez-vous que vos importations utilisent la syntaxe des modules ES.
:::

## Dans cette section

- **[Configuration locale](./local-setup.md)** -- Cloner, configurer et exécuter l'API localement
- **[Base de données](./database.md)** -- Architecture d'une base par module, scripts de schéma et modèles d'accès aux données
- **[Structure des modules](./module-structure.md)** -- Contrôleurs, référentiels, modèles et authentification
- **[Clés API](./api-keys.md)** -- Jetons d'accès personnels pour les scripts et les connecteurs
- **[Applications connectées (OAuth)](./connected-apps.md)** -- Flux OAuth multilocataire pour les applications tierces
- **[Webhooks](./webhooks.md)** -- Envoyer des notifications d'événements à des systèmes externes
- **[Serveur MCP](./mcp.md)** -- Point de terminaison Model Context Protocol qui expose l'API aux assistants d'IA
- **[Référence des points de terminaison](./endpoints/index.md)** -- Documentation REST complète pour tous les modules
