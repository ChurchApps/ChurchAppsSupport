---
title: "Documentation pour les développeurs"
---

# Documentation pour les développeurs

<div class="article-intro">

ChurchApps est un ensemble d'environ 20 projets open source qui forment ensemble une plateforme complète de gestion d'église. Les projets couvrent des API backend, des applications web, des applications mobiles, une application de bureau et des bibliothèques partagées -- le tout écrit en TypeScript. Cette section fournit tout ce qu'il faut pour mettre en place un environnement de développement local et commencer à contribuer.

</div>

## Architecture en bref

Les projets sont des **dépôts indépendants** (et non un monorepo). Le code partagé est publié sur npm sous le périmètre `@churchapps/*` et utilisé comme dépendance classique. Vous pouvez donc travailler sur un seul projet sans cloner tout l'écosystème.

Caractéristiques principales :

- **Langage :** TypeScript partout
- **Backend :** API Node.js / Express déployées sur AWS Lambda via Serverless Framework
- **Web :** React 19 (Vite et Next.js), Material-UI 7
- **Mobile :** React Native avec Expo
- **Base de données :** MySQL 8.0, une base de données par module d'API

## Contenu de cette section

- **[Installation](setup/)** -- Environnement de développement local, prérequis et configuration
  - [Prérequis](setup/prerequisites) -- Outils et logiciels nécessaires
  - [Vue d'ensemble du projet](setup/project-overview) -- Tous les projets en un coup d'œil
  - [Variables d'environnement](setup/environment-variables) -- Configurer les fichiers `.env`
- **[API](api/)** -- Installation locale de l'API principale, initialisation de la base de données et structure des modules
- **[Applications web](web-apps/)** -- Lancer B1Admin, B1App et LessonsApp en local
- **[Applications mobiles](mobile/)** -- Compiler B1Mobile et les autres applications Expo
- **[Bibliothèques partagées](shared-libraries/)** -- Travailler avec Helpers, ApiHelper et AppHelper
- **[Déploiement](deployment/)** -- Déployer les API, les applications web et les applications mobiles
- **[Fournisseur de contenu FreePlay](freeplay-content-provider)** -- Intégrer votre bibliothèque de leçons à FreePlay

## Communauté et ressources

| Ressource | Lien |
|----------|------|
| Organisation GitHub | [github.com/ChurchApps](https://github.com/ChurchApps) |
| Suivi des problèmes | [Problèmes ChurchAppsSupport](https://github.com/ChurchApps/ChurchAppsSupport/issues) |
| Communauté Slack | [Rejoindre Slack](https://join.slack.com/t/livechurchsolutions/shared_invite/zt-i88etpo5-ZZhYsQwQLVclW12DKtVflg) |

:::tip
La façon la plus rapide de commencer à contribuer est de choisir une application web (comme B1Admin), de la pointer vers les **API de démonstration** partagées, et de commencer à apporter des modifications au frontend. Aucune base de données ni installation d'API n'est nécessaire.
:::
