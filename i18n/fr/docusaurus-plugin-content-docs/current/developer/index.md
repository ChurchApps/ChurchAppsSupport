---
title: "Documentation de développement"
---

# Documentation de développement

<div class="article-intro">

ChurchApps est une collection d'environ 20 projets open-source qui ensemble fournissent une plateforme complète de gestion d'église. Les projets couvrent les APIs backend, les applications web, les applications mobiles, une application de bureau et les bibliothèques partagées -- tout écrit en TypeScript. Cette section fournit tout ce dont vous avez besoin pour configurer un environnement de développement local et commencer à contribuer.

</div>

## Architecture en un coup d'œil

Les projets sont **des référentiels indépendants** (pas un monorepo). Le code partagé est publié sur npm sous le scope `@churchapps/*` et consommé en tant que dépendances régulières. Cela signifie que vous pouvez travailler sur un seul projet sans cloner tout l'écosystème.

Caractéristiques clés :

- **Langage :** TypeScript partout
- **Backend :** APIs Node.js / Express déployées sur AWS Lambda via Serverless Framework
- **Web :** React 19 (Vite et Next.js), Material-UI 7
- **Mobile :** React Native avec Expo
- **Base de données :** MySQL 8.0, une base de données par module API

## Ce que couvre cette section

- **[Configuration](setup/)** -- Environnement de développement local, prérequis et configuration
  - [Prérequis](setup/prerequisites) -- Outils et logiciels requis
  - [Aperçu du projet](setup/project-overview) -- Tous les projets en un coup d'œil
  - [Variables d'environnement](setup/environment-variables) -- Configuration des fichiers `.env`
- **[API](api/)** -- Configuration locale de l'API, initialisation de la base de données et structure du module
- **[Applications web](web-apps/)** -- Exécuter B1Admin, B1App et LessonsApp localement
- **[Applications mobiles](mobile/)** -- Construire B1Mobile et autres applications Expo
- **[Bibliothèques partagées](shared-libraries/)** -- Travailler avec Helpers, ApiHelper et AppHelper
- **[Déploiement](deployment/)** -- Déployer les APIs, les applications web et les applications mobiles

## Communauté et ressources

| Ressource | Lien |
|----------|------|
| Organisation GitHub | [github.com/ChurchApps](https://github.com/ChurchApps) |
| Suivi des problèmes | [Problèmes ChurchAppsSupport](https://github.com/ChurchApps/ChurchAppsSupport/issues) |
| Communauté Slack | [Rejoindre Slack](https://join.slack.com/t/livechurchsolutions/shared_invite/zt-i88etpo5-ZZhYsQwQLVclW12DKtVflg) |

:::tip
Le moyen le plus rapide de commencer à contribuer est de choisir une application web (comme B1Admin), de la pointer vers les **APIs de staging** et de commencer à faire des changements frontend. Aucune configuration de base de données ou d'API requise.
:::
