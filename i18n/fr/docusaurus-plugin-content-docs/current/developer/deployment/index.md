---
title: "Déploiement"
description: "Où déployer chaque projet ChurchApps : API AWS Lambda, applications web S3, builds mobiles Expo, et B1 Admin auto-hébergé sur Railway ou Docker."
---

# Déploiement

<div class="article-intro">

ChurchApps utilise différentes stratégies de déploiement selon le type de projet. Les API se déploient sur AWS Lambda, les applications web se déploient comme sites statiques sur S3 avec CloudFront, et les applications mobiles sont compilées et distribuées par Expo EAS et les boutiques d'applications.

</div>

## Déploiement selon le type de projet

| Type de projet | Cible de déploiement | Outillage |
|-------------|-------------------|---------|
| [API](./apis.md) | AWS Lambda | Serverless Framework v3 (environnement Node.js 24.x) |
| [Applications web](./web-apps.md) | S3 + CloudFront | Compilation statique, synchronisation S3, invalidation CloudFront |
| [Applications mobiles](./mobile.md) | Boutiques d'applications | Expo EAS Build + mises à jour OTA |
| [Auto-hébergement (Railway)](./railway-template.md) | Railway | Modèle en un clic : MySQL + Api + B1Admin + B1App |
| [Auto-hébergement (Docker)](./docker.md) | Tout hôte Docker | Installation en une ligne ; images GHCR précompilées + Caddy, mise à niveau/sauvegarde/retour arrière avec `./deploy/b1` |
| [Proxy Caddy pour domaines personnalisés](./caddy-proxy.md) | EC2 Windows (IP élastique `3.23.251.61`) | `Caddyfile` statique + service WinSW + synchronisation planifiée de la map |
| FreeShow | Téléchargement direct | Electron Builder (binaires multiplateformes) |

## Environnements

| Environnement | Objet |
|-------------|-------|
| `dev` | Développement local |
| `demo` | Instance de démonstration publique ; déployée à chaque envoi vers `main`, elle sert donc aussi de préproduction |
| `prod` | Production |

:::info
Chaque environnement dispose de son propre ensemble de points de terminaison d'API, de bases de données et de configuration. Les paramètres propres à chaque environnement sont gérés par des fichiers `.env` en local et par AWS SSM Parameter Store dans les environnements déployés.
:::
