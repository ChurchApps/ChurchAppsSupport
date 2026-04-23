---
title: "API"
---

# API

<div class="article-intro">

L'API ChurchApps est un **monolithe modulaire** -- un seul codebase qui sert six modules distincts, chacun avec sa propre base de données. Cette architecture vous donne les avantages organisationnels des microservices (limites claires, magasins de données indépendants) avec la simplicité opérationnelle d'un seul déploiement.

</div>

## Modules

| Module | Objectif |
|--------|---------|
| **Membership** | Personnes, groupes, ménages, permissions |
| **Attendance** | Services, sessions, enregistrements de check-in |
| **Content** | Pages, sections, éléments, streaming |
| **Giving** | Donations, fonds, traitement des paiements |
| **Messaging** | Conversations, notifications, e-mail |
| **Doing** | Tâches, plans, assignments |

## Pile technologique

- **Exécution :** Node.js 22.x avec TypeScript (modules ES)
- **Framework :** Express
- **Injection de dépendances :** Inversify (routage basé sur les décorateurs)
- **Base de données :** MySQL -- une base de données par module, chacune avec son propre pool de connexions
- **Authentification :** Authentification basée sur JWT via `CustomAuthProvider`
- **Déploiement :** AWS Lambda via Serverless Framework v3

## Ports

| Protocole | Port | Description |
|----------|------|-------------|
| HTTP | `8084` | API REST principale |
| WebSocket | `8087` | Connexions socket en temps réel |

## Fonctions Lambda

Lorsqu'il est déployé sur AWS, l'API s'exécute en tant que quatre fonctions Lambda :

- **`web`** -- Gère toutes les requêtes HTTP
- **`socket`** -- Gère les connexions WebSocket
- **`timer15Min`** -- S'exécute tous les 15 minutes pour les notifications par e-mail
- **`timerMidnight`** -- S'exécute quotidiennement pour les e-mails de résumé et les tâches de maintenance

## Bibliothèques partagées

L'API dépend de deux paquets ChurchApps partagés :

- **[`@churchapps/helpers`](../shared-libraries/helpers)** -- Utilitaires de base (DateHelper, ApiHelper, etc.)
- **[`@churchapps/apihelper`](../shared-libraries/api-helper)** -- Utilitaires du serveur Express y compris l'authentification, les helpers de base de données et les intégrations AWS

:::info
L'API utilise les modules ES (`"type": "module"` dans `package.json`). Assurez-vous que vos imports utilisent la syntaxe du module ES.
:::

## Dans cette section

- **[Configuration locale](./local-setup)** -- Cloner, configurer et exécuter l'API localement
- **[Base de données](./database)** -- Architecture une base de données par module, scripts de schéma et modèles d'accès aux données
- **[Structure du module](./module-structure)** -- Contrôleurs, repositories, modèles et authentification
- **[Référence des points de terminaison](./endpoints/)** -- Documentation complète de l'API REST pour tous les modules
