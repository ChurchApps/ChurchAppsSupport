---
title: "Aperçu du projet"
---

# Aperçu du projet

<div class="article-intro">

ChurchApps comprend environ 20 référentiels indépendants, chacun publié sous l'[organisation GitHub ChurchApps](https://github.com/ChurchApps). Cette page fournit un inventaire complet de tous les projets organisés par catégorie, ainsi que leurs frameworks, ports et relations.

</div>

<div class="prereqs">
<h4>Avant de commencer</h4>

- Installer les [prérequis](./prerequisites) pour la catégorie de projet sur laquelle vous voulez travailler

</div>

## APIs backend

Toutes les APIs sont construites avec Node.js, Express et TypeScript, et sont déployées sur AWS Lambda via Serverless Framework.

| Projet | Objectif | Port de développement | Base de données |
|---------|---------|----------|----------|
| **[Api](https://github.com/ChurchApps/Api)** | Monolithe modulaire core couvrant membership, attendance, content, giving, messaging et doing | 8084 | Bases de données MySQL séparées par module (6 au total) |
| **[LessonsApi](https://github.com/ChurchApps/LessonsApi)** | Backend Lessons.church | -- | Base de données MySQL unique `lessons` |
| **[AskApi](https://github.com/ChurchApps/AskApi)** | Outil de requête IA alimenté par OpenAI | -- | -- |

:::info
Le projet **Api** core est un monolithe modulaire. Chaque module (membership, attendance, content, giving, messaging, doing) a sa propre base de données et est accessible à un sous-chemin tel que `/membership` ou `/giving`. En production, ceux-ci sont exposés en tant que fonctions Lambda séparées derrière API Gateway.
:::

## Applications web

| Projet | Framework | Port de développement | Objectif |
|---------|-----------|----------|---------|
| **[B1Admin](https://github.com/ChurchApps/B1Admin)** | React 19 + Vite + MUI 7 | 5173 | Tableau de bord d'administration d'église |
| **[B1App](https://github.com/ChurchApps/B1App)** | Next.js 16 + React 19 + MUI 7 | 3301 | Application publique des membres de l'église |
| **[LessonsApp](https://github.com/ChurchApps/LessonsApp)** | Next.js 16 | 3501 | Frontend Lessons.church |
| **[B1Transfer](https://github.com/ChurchApps/B1Transfer)** | React + Vite | -- | Utilitaire d'importation/exportation de données |
| **[BrochureSites](https://github.com/ChurchApps/BrochureSites)** | Statique | -- | Sites de brochure d'église statiques |

## Applications mobiles

Toutes les applications mobiles utilisent React Native avec Expo.

| Projet | Objectif | Versions clés |
|---------|---------|--------------|
| **[B1Mobile](https://github.com/ChurchApps/B1Mobile)** | Application des membres de l'église pour iOS et Android | Expo 54, React Native 0.81 |
| **[B1Checkin](https://github.com/ChurchApps/B1Checkin)** | Application de kiosque de check-in | Expo |
| **[LessonsScreen](https://github.com/ChurchApps/LessonsScreen)** | Application Android TV pour l'affichage des leçons | Expo |
| **[FreePlay](https://github.com/ChurchApps/FreePlay)** | Lecture de contenu (y compris TV OS) | Expo |
| **[FreeShowRemote](https://github.com/ChurchApps/FreeShowRemote)** | Télécommande mobile pour FreeShow | Expo |

## Bureau

| Projet | Pile | Objectif |
|---------|-------|---------|
| **[FreeShow](https://github.com/ChurchApps/FreeShow)** | Electron 37 + Svelte 3 + Vite | Logiciel de présentation et d'adoration |

## Bibliothèques partagées

Le code partagé est publié sur npm sous le scope `@churchapps`. Ceux-ci sont consommés en tant que dépendances npm régulières par les projets ci-dessus.

| Paquet | Nom npm | Objectif | Utilisé par |
|---------|----------|---------|---------|
| **[Helpers](https://github.com/ChurchApps/Helpers)** | `@churchapps/helpers` | Utilitaires de base (DateHelper, ApiHelper, CurrencyHelper, etc.) | Tous les projets |
| **[ApiHelper](https://github.com/ChurchApps/ApiHelper)** | `@churchapps/apihelper` | Utilitaires du serveur Express (middleware d'authentification, helpers de DB, intégration AWS) | Toutes les APIs |
| **[AppHelper](https://github.com/ChurchApps/AppHelper)** | Espace de travail avec 6 paquets | Bibliothèque de composants React | Toutes les applications web |
| **[ContentProviderHelper](https://github.com/ChurchApps/ContentProviderHelper)** | `@churchapps/content-provider-helper` | Fournisseurs de contenu YouTube, Vimeo et locaux | FreeShow, FreePlay, Api |

### Sous-paquets AppHelper

Le projet AppHelper est un espace de travail monorepo qui publie six paquets :

| Paquet | Nom npm |
|---------|----------|
| Core | `@churchapps/apphelper` |
| Login | `@churchapps/apphelper-login` |
| Donations | `@churchapps/apphelper-donations` |
| Forms | `@churchapps/apphelper-forms` |
| Markdown | `@churchapps/apphelper-markdown` |
| Website | `@churchapps/apphelper-website` |

## Relations des projets

```
Applications Frontend       Bibliothèques partagées    APIs Backend
--------------             ----------------           ------------
B1Admin      ──────┐
B1App        ──────┤       @churchapps/helpers ◄───── Api
LessonsApp   ──────┼──►    @churchapps/apphelper      LessonsApi
B1Mobile     ──────┤                                   AskApi
FreeShow     ──────┘       @churchapps/apihelper ◄────┘
```

Toutes les applications frontend dépendent de `@churchapps/helpers`. Les applications web dépendent en outre des paquets `@churchapps/apphelper`. Toutes les APIs backend dépendent de `@churchapps/helpers` et `@churchapps/apihelper`.

## Étapes suivantes

- **[Variables d'environnement](./environment-variables)** -- Configurer vos fichiers `.env` pour se connecter aux APIs
- **[Configuration locale de l'API](../api/local-setup)** -- Configurer l'API backend localement
