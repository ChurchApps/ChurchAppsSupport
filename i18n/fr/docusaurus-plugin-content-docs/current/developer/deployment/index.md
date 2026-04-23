---
title: "Déploiement"
---

# Déploiement

<div class="article-intro">

ChurchApps utilise des stratégies de déploiement différentes selon le type de projet. Les APIs se déploient sur AWS Lambda, les applications web se déploient en tant que sites statiques sur S3 avec CloudFront, et les applications mobiles sont construites et distribuées via Expo EAS et les app stores.

</div>

## Déploiement par type de projet

| Type de projet | Cible de déploiement | Outils |
|-------------|-------------------|---------|
| [APIs](./apis) | AWS Lambda | Serverless Framework v3 (runtime Node.js 22.x) |
| [Applications web](./web-apps) | S3 + CloudFront | Construction statique, synchronisation S3, invalidation CloudFront |
| [Applications mobiles](./mobile) | App Stores | Expo EAS Build + Mises à jour OTA |
| FreeShow | Téléchargement direct | Electron Builder (binaires multiplateforme) |

## Environnements

| Environnement | Objectif |
|-------------|---------|
| `dev` | Développement local |
| `demo` | Instance de démo public |
| `staging` | Test de pré-production |
| `prod` | Production |

:::info
Chaque environnement a son propre ensemble de points de terminaison API, de bases de données et de configuration. Les paramètres spécifiques à l'environnement sont gérés via des fichiers `.env` localement et AWS SSM Parameter Store dans les environnements déployés.
:::
