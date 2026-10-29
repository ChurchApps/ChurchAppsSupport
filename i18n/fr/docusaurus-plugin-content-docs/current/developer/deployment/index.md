---
title: "Déploiement"
---

# Déploiement

<div class="article-intro">

ChurchApps utilise différentes stratégies de déploiement selon le type de projet : les API se déploient sur AWS Lambda, les applications web se déploient comme sites statiques sur S3 avec CloudFront, et les applications mobiles sont compilées et distribuées par Expo EAS et les magasins d'applications.

</div>

## Déploiement selon le type de projet

| Type de projet | Cible de déploiement | Outillage |
|-------------|-------------------|---------|
| [API](./apis) | AWS Lambda | Serverless Framework v3 (environnement d'exécution Node.js 24.x) |
| [Applications web](./web-apps) | S3 + CloudFront | Compilation statique, synchronisation S3, invalidation CloudFront |
| [Applications mobiles](./mobile) | Magasins d'applications | Expo EAS Build + mises à jour OTA |
| [Auto-hébergement (Railway)](./railway-template) | Railway | Modèle en un clic : MySQL + Api + B1Admin + B1App |
| [Auto-hébergement (Docker)](./docker) | Tout hôte Docker | Installateur en une ligne ; images GHCR précompilées + Caddy, mise à niveau/sauvegarde/restauration avec `./deploy/b1` |
| [Proxy Caddy pour domaines personnalisés](./caddy-proxy) | EC2 Windows (IP élastique `3.23.251.61`) | Caddyfile statique + service WinSW + synchronisation planifiée de la carte |
| FreeShow | Téléchargement direct | Electron Builder (binaires multiplateformes) |

## Environnements

| Environnement | Objectif |
|-------------|-------------|
| `dev` | Développement local |
| `demo` | Instance de démonstration publique ; déployée à chaque envoi vers `main`, elle sert donc de préproduction |
| `prod` | Production |

:::info
Chaque environnement a son propre ensemble de points de terminaison API, de bases de données et de configuration. Les paramètres propres à chaque environnement sont gérés par des fichiers `.env` en local et par AWS SSM Parameter Store dans les environnements déployés.
:::
