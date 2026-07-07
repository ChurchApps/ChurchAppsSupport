---
title: "Helpers"
---

# Helpers

<div class="article-intro">

Le paquet `@churchapps/helpers` fournit les utilitaires de base utilisés par tous les projets ChurchApps, à la fois frontend et backend. Il est indépendant du framework et inclut les helpers communs tels que `DateHelper`, `ApiHelper`, `CurrencyHelper`, plus les interfaces TypeScript partagées qui forment le contrat de données entre les applications et les APIs.

</div>

<div class="prereqs">
<h4>Avant de commencer</h4>

- Installer **Node.js** et **Git** -- voir [Prérequis](../setup/prerequisites)
- Vous familiariser avec la configuration de [l'espace de travail Packages](./index.md) et le flux de publication

</div>

## Qui consomme ceci

Chaque API ChurchApps (l'Api core, AskApi et LessonsApi) et chaque frontend web (B1Admin, B1App, B1Transfer, LessonsApp) dépend directement de ce paquet. Les frontends obtiennent également beaucoup de ses exportations (`ApiHelper`, `DateHelper`, `UserHelper` et d'autres interfaces) réexportées via [`@churchapps/apphelper`](./app-helper). Les autres paquets partagés le déclarent comme une dépendance peer afin que chaque application résolve exactement une copie.

## Configuration pour le développement local

Ce paquet vit dans l'espace de travail [Packages](https://github.com/ChurchApps/Packages) à côté des autres bibliothèques partagées :

1. Cloner l'espace de travail :

   ```bash
   git clone https://github.com/ChurchApps/Packages.git
   ```

2. Installer les dépendances à la racine de l'espace de travail :

   ```bash
   cd Packages && yarn install
   ```

3. Construire (compile TypeScript vers `dist/`) :

   ```bash
   yarn workspace @churchapps/helpers build
   ```

   Ou exécutez `yarn build` à la racine pour construire tous les paquets dans l'ordre des dépendances.

Pour tester les changements dans un projet consommateur, utilisez un portail Yarn temporaire -- voir [Développement local contre une application consommatrice](./index.md#local-development-against-a-consuming-app).

## Publication

Les versions passent par changesets plutôt que par des bumps de version manuelle :

1. Exécutez `yarn changeset` à la racine de l'espace de travail et sélectionnez `@churchapps/helpers` avec le type de bump approprié ; committez le fichier de changeset généré avec votre changement.
2. Quand vous êtes prêt à publier, exécutez `yarn publish-all` à la racine -- il bump les versions, écrit les CHANGELOGs, construit dans l'ordre des dépendances et publie sur npm.

Les nouvelles interfaces partagées vont dans `helpers/src/interfaces/` et sont réexportées via le barrel du paquet. Le catalogue de types d'éléments du créateur de sites web (`ElementTypes.ts` -- 35 types avec leurs schémas de réponses) vit aussi ici ; c'est le contrat partagé par les rendus apphelper, les formulaires d'éditeur B1Admin et les prompts de génération IA (voir [Architecture du créateur de sites web](../architecture/website-builder)).

:::warning
Puisque ce paquet est utilisé par chaque projet ChurchApps, les changements ici ont un impact large. Une publication de `helpers` bump automatiquement `apihelper` et `apphelper` afin que leurs plages de dépendances restent à jour. Testez avec un portail Yarn dans au moins une API consommatrice et une application web consommatrice avant de publier.
:::

## Articles connexes

- **[ApiHelper](./api-helper)** -- Utilitaires côté serveur qui dépendent de ce paquet
- **[AppHelper](./app-helper)** -- Composants React qui dépendent de ce paquet
- **[Vue d'ensemble des bibliothèques partagées](./index.md)** -- Configuration de l'espace de travail, flux de publication et flux de liaison locale
