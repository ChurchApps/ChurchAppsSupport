---
title: "Déploiement"
---

# Déploiement

<div class="article-intro">

ChurchApps utilise différentes stratégies de déploiement selon le type de projet : les API se déploient sur AWS Lambda, les applications web se déploient comme sites statiques sur S3 avec CloudFront, et les applications mobiles sont compilées et distribuées via Expo EAS et les magasins d'applications.

</div>

## Déploiement par type de projet

| Type de projet | Cible de déploiement | Outils |
|-------------|-------------------|---------|
| [API](./apis) | AWS Lambda | Serverless Framework v3 (environnement d'exécution Node.js 22.x) |
| [Applications web](./web-apps) | S3 + CloudFront | Build statique, synchronisation S3, invalidation CloudFront |
| [Applications mobiles](./mobile) | Magasins d'applications | Expo EAS Build + mises à jour OTA |
| [Auto-hébergement (Railway)](./railway-template) | Railway | Modèle en un clic : MySQL + Api + B1Admin + B1App |
| [Auto-hébergement (Docker)](./docker) | Tout hôte Docker | Installeur en une ligne ; images GHCR précompilées + Caddy, `./deploy/b1` pour la mise à jour, la sauvegarde et la restauration |
| [Proxy de domaine personnalisé Caddy](./caddy-proxy) | EC2 Windows (IP élastique `3.23.251.61`) | Caddyfile statique + service WinSW + synchronisation planifiée des correspondances |
| FreeShow | Téléchargement direct | Electron Builder (binaires multiplateformes) |

## Environnements

| Environnement | Finalité |
|-------------|---------|
| `dev` | Développement local |
| `demo` | Instance de démonstration publique ; déployée à chaque push sur `main`, elle sert donc aussi de test de préproduction |
| `prod` | Production |

:::info
Chaque environnement dispose de son propre ensemble de points d'accès d'API, de bases de données et de configuration. Les paramètres propres à chaque environnement sont gérés via les fichiers `.env` en local, et via AWS SSM Parameter Store dans les environnements déployés.
:::
