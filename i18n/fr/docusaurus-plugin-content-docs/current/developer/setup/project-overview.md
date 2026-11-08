---
title: "Aperçu du projet"
description: "Répertoriez chaque dépôt ChurchApps par catégorie, avec les frameworks, les ports de développement, les bases de données et la manière dont les packages partagés @churchapps les relient, dans la documentation de configuration pour développeurs."
---

# Aperçu du projet

<div class="article-intro">

ChurchApps se compose d'environ 20 dépôts indépendants, chacun publié sous l'[organisation GitHub ChurchApps](https://github.com/ChurchApps). Cette page présente un inventaire complet de tous les projets, organisés par catégorie, ainsi que leurs frameworks, ports et relations.

</div>

<div class="prereqs">
<h4>Avant de commencer</h4>

- Installez les [prérequis](./prerequisites.md) de la catégorie de projet sur laquelle vous souhaitez travailler

</div>

## API backend

Toutes les API sont construites avec Node.js, Express et TypeScript, et déployées sur AWS Lambda via Serverless Framework.

| Projet | Objectif | Port de développement | Base de données |
|---------|---------|----------|----------|
| **[Api](https://github.com/ChurchApps/Api)** | Monolithe modulaire central couvrant l'adhésion, la présence, le contenu, les dons, la messagerie et les tâches | 8084 | Base MySQL distincte pour chaque module (6 au total) |
| **[LessonsApi](https://github.com/ChurchApps/LessonsApi)** | Backend de Lessons.church | -- | Base MySQL unique `lessons` |
| **[AskApi](https://github.com/ChurchApps/AskApi)** | Outil de requêtes IA propulsé par OpenAI | -- | -- |

:::info
Le projet **Api** principal est un monolithe modulaire. Chaque module (adhésion, présence, contenu, dons, messagerie, tâches) possède sa propre base de données et est accessible à un sous-chemin tel que `/membership` ou `/giving`. En production, ceux-ci sont exposés sous forme de fonctions Lambda distinctes derrière API Gateway.
:::

## Applications web

| Projet | Framework | Port de développement | Objectif |
|---------|-----------|----------|---------|
| **[B1Admin](https://github.com/ChurchApps/B1Admin)** | React 19 + Vite + MUI 7 | 3101 | Tableau de bord d'administration de l'église |
| **[B1App](https://github.com/ChurchApps/B1App)** | Next.js 16 + React 19 + MUI 7 | 3301 | Application publique pour les membres de l'église |
| **[LessonsApp](https://github.com/ChurchApps/LessonsApp)** | Next.js 16 | 3501 | Interface de Lessons.church |
| **[B1Transfer](https://github.com/ChurchApps/B1Transfer)** | React + Vite | -- | Utilitaire d'importation et d'exportation de données |
| **[BrochureSites](https://github.com/ChurchApps/BrochureSites)** | Statique | -- | Sites web statiques de brochures pour églises |

## Applications mobiles

Toutes les applications mobiles utilisent React Native avec Expo.

| Projet | Objectif | Versions clés |
|---------|--------------|---------------|
| **[B1Checkin](https://github.com/ChurchApps/B1Checkin)** | Application de borne d'enregistrement | Expo |
| **[LessonsScreen](https://github.com/ChurchApps/LessonsScreen)** | Affichage des leçons sur Android TV | Expo |
| **[FreePlay](https://github.com/ChurchApps/FreePlay)** | Lecture de contenu (y compris sur les systèmes d'exploitation pour téléviseurs) | Expo |
| **[FreeShowRemote](https://github.com/ChurchApps/FreeShowRemote)** | Télécommande mobile pour FreeShow | Expo |

## Bureau

| Projet | Pile technique | Objectif |
|---------|-------|---------|
| **[FreeShow](https://github.com/ChurchApps/FreeShow)** | Electron 37 + Svelte 3 + Vite | Logiciel de présentation et de culte |

## Bibliothèques partagées

Le code partagé est publié sur npm sous l'espace de noms `@churchapps` et utilisé comme dépendances npm classiques par les projets ci-dessus. Tous les packages partagés résident dans un seul dépôt -- [Packages](https://github.com/ChurchApps/Packages) -- géré comme un espace de travail Yarn et publié avec changesets.

| Package | Objectif | Utilisé par |
|---------|---------|-------------|
| `@churchapps/helpers` | Utilitaires de base et interfaces TypeScript partagées (DateHelper, ApiHelper, CurrencyHelper, etc.) | Tous les projets |
| `@churchapps/apihelper` | Utilitaires de serveur Express (authentification, contrôleurs de base, accès aux bases de données, intégrations AWS) | Toutes les API |
| `@churchapps/apphelper` | Bibliothèque de composants React avec modules en sous-chemins pour la connexion, les dons, les formulaires, le markdown et la création de sites web | Toutes les applications web |
| `@churchapps/content-providers` | Abstraction des fournisseurs de contenu tiers (Lessons.church, Planning Center, Dropbox, et autres) | Api, B1Admin, B1App, FreePlay |
| `@churchapps/integration-sdk` | Boîte à outils d'intégration B1.church : webhooks, client REST, OAuth | Développeurs d'intégrations externes |
| `@churchapps/texting` | Abstraction des fournisseurs de SMS | Api |

Consultez [Bibliothèques partagées](../shared-libraries/index.md) pour la configuration de l'espace de travail et le flux de publication.

## Relations entre les projets

```
Applications frontend      Bibliothèques partagées    API backend
--------------             ----------------           ------------
B1Admin      ──────┐
B1App        ──────┤       @churchapps/helpers ◄───── Api
LessonsApp   ──────┼──►    @churchapps/apphelper      LessonsApi
FreeShow     ──────┘                                   AskApi
                           @churchapps/apihelper ◄────┘
```

Toutes les applications frontend dépendent de `@churchapps/helpers`. Les applications web dépendent en outre des packages `@churchapps/apphelper`. Toutes les API backend dépendent à la fois de `@churchapps/helpers` et de `@churchapps/apihelper`.

## Étapes suivantes

- **[Variables d'environnement](./environment-variables.md)** -- Configurez vos fichiers `.env` pour vous connecter aux API
- **[Configuration locale de l'API](../api/local-setup.md)** -- Configurez l'API backend en local
