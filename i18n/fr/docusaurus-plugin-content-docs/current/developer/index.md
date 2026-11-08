---
title: "Documentation pour développeurs"
description: "Trouvez votre chemin dans la documentation développeur de ChurchApps : configuration locale, guides de l'API et des applications web, bibliothèques partagées, builds mobiles et déploiement des projets open source."
---

# Documentation pour développeurs

<div class="article-intro">

ChurchApps est un ensemble d'environ 20 projets open source qui forment ensemble une plateforme complète de gestion d'église. Ces projets comprennent des API backend, des applications web, des applications mobiles, une application de bureau et des bibliothèques partagées, le tout écrit en TypeScript. Cette section vous fournit tout ce dont vous avez besoin pour configurer un environnement de développement local et commencer à contribuer.

</div>

## Architecture en bref

Les projets sont des **dépôts indépendants** (et non un monorepo). Le code partagé est publié sur npm sous le scope `@churchapps/*` et utilisé comme dépendance ordinaire. Vous pouvez ainsi travailler sur un seul projet sans cloner tout l'écosystème.

Caractéristiques principales :

- **Langage :** TypeScript partout
- **Backend :** API Node.js / Express déployées sur AWS Lambda avec Serverless Framework
- **Web :** React 19 (Vite et Next.js), Material-UI 7
- **Mobile :** React Native avec Expo
- **Base de données :** MySQL 8.0, une base de données par module d'API

## Contenu de cette section

- **[Configuration](./setup/index.md)** -- Environnement de développement local, prérequis et paramétrage
  - [Prérequis](./setup/prerequisites.md) -- Outils et logiciels nécessaires
  - [Vue d'ensemble du projet](./setup/project-overview.md) -- Tous les projets en un coup d'œil
  - [Variables d'environnement](./setup/environment-variables.md) -- Configuration des fichiers `.env`
- **[API](./api/index.md)** -- Configuration locale de l'API principale, initialisation de la base de données et structure des modules
- **[Applications web](./web-apps/index.md)** -- Exécuter B1Admin, B1App et LessonsApp en local
- **[Applications mobiles](./mobile/index.md)** -- Construire B1Checkin et les autres applications Expo
- **[Bibliothèques partagées](./shared-libraries/index.md)** -- Utiliser Helpers, ApiHelper et AppHelper
- **[Déploiement](./deployment/index.md)** -- Déployer les API, les applications web et les applications mobiles
- **[Fournisseur de contenu FreePlay](./freeplay-content-provider.md)** -- Intégrer votre bibliothèque de leçons à FreePlay

## Communauté et ressources

| Ressource | Lien |
|----------|------|
| Organisation GitHub | [github.com/ChurchApps](https://github.com/ChurchApps) |
| Suivi des problèmes | [ChurchAppsSupport Issues](https://github.com/ChurchApps/ChurchAppsSupport/issues) |
| Communauté Slack | [Rejoindre Slack](https://join.slack.com/t/livechurchsolutions/shared_invite/zt-i88etpo5-ZZhYsQwQLVclW12DKtVflg) |

:::tip
La façon la plus rapide de commencer à contribuer est de choisir une application web (comme B1Admin), de la faire pointer vers les **API de démonstration** partagées, puis de commencer à apporter des modifications au frontend. Aucune base de données ni configuration d'API n'est nécessaire.
:::
