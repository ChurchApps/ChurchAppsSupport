---
title: "Déploiement de l'API"
---

# Déploiement de l'API

<div class="article-intro">

Les APIs ChurchApps sont déployées en tant que fonctions AWS Lambda en utilisant le Serverless Framework. Cette page couvre le workflow de construction, déploiement et configuration pour les environnements de staging et de production.

</div>

<div class="prereqs">
<h4>Avant de commencer</h4>

- Configurer l'API localement -- voir [Configuration locale de l'API](../api/local-setup)
- Configurer les credentials AWS sur votre machine
- Assurez-vous d'avoir accès au compte AWS cible

</div>

## Construction

Les APIs sont construites pour la production en utilisant une configuration TypeScript dédiée :

```bash
npm run build:prod
```

Cela utilise `tsconfig.prod.json` pour compiler le projet pour le runtime Lambda.

## Déploiement

Déployer en staging :

```bash
npm run deploy-staging
```

Déployer en production :

```bash
npm run deploy-prod
```

## Ce qui est créé

Chaque déploiement API crée ou met à jour les fonctions AWS Lambda suivantes :

| Fonction | Objectif |
|----------|---------|
| `web` | Gestionnaire de requête HTTP via API Gateway |
| `socket` | Gestionnaire de connexion WebSocket |
| `timer15Min` | Tâche programmée qui s'exécute toutes les 15 minutes |
| `timerMidnight` | Tâche programmée qui s'exécute quotidiennement à minuit |

## Configuration de l'environnement

Dans les environnements déployés, la configuration est lue à partir d'**AWS SSM Parameter Store** plutôt que des fichiers `.env`. Cela garde les secrets hors du package de déploiement et permet les changements de configuration sans redéploiement.

:::warning
Ne jamais committer les credentials de production dans le référentiel. Toute la configuration sensible doit être stockée dans AWS SSM Parameter Store et accessible au runtime.
:::

:::tip
Pour tester un déploiement sans affecter la production, déployez toujours en staging d'abord en utilisant `npm run deploy-staging` et vérifiez les changements avant de promouvoir en prod.
:::

## Articles connexes

- **[Configuration locale de l'API](../api/local-setup)** -- Configurer l'API pour le développement
- **[Structure du module](../api/module-structure)** -- Comprendre l'architecture de la fonction Lambda
- **[Déploiement des applications web](./web-apps)** -- Déployer les applications frontend
