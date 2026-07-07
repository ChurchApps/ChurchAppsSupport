---
title: "ApiHelper"
---

# ApiHelper

<div class="article-intro">

Le paquet `@churchapps/apihelper` fournit les utilitaires côté serveur pour toutes les APIs Express.js ChurchApps. Il inclut la classe du contrôleur de base, l'authentification JWT, les utilitaires de base de données et les intégrations AWS sur lesquels chaque projet API dépend.

</div>

<div class="prereqs">
<h4>Avant de commencer</h4>

- Installer **Node.js** et **Git** -- voir [Prérequis](../setup/prerequisites)
- Vous familiariser avec la configuration de [l'espace de travail Packages](./index.md) et le flux de publication
- Ce paquet dépend de [`@churchapps/helpers`](./helpers) (en tant que dépendance peer) et le réexporte

</div>

## Ce qui est inclus

- **CustomBaseController** -- classe de base pour les contrôleurs API, construite sur `inversify-express-utils`
- **Auth** -- Authentification JWT via `CustomAuthProvider`, `AuthenticatedUser` et `Principal`
- **Utilitaires de base de données** -- `DB.query` / `DB.queryOne` et la classe `Pool` pour la gestion des connexions MySQL, plus `MySqlHelper` et `DBCreator` pour la configuration du schéma
- **Intégrations AWS** -- `AwsHelper` pour le stockage de fichiers S3 et la lecture d'AWS SSM Parameter Store
- **E-mail** -- `EmailHelper` supportant les transports SES et SMTP
- **Chargement de configuration** -- `EnvironmentBase` lit les chaînes de connexion et les secrets à partir de variables d'environnement ou d'AWS SSM
- **Divers** -- `EncryptionHelper`, `FileStorageHelper`, `LoggingHelper`, `BasePermissions`, `SlugHelper`

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
   yarn workspace @churchapps/apihelper build
   ```

   Ou exécutez `yarn build` à la racine pour construire tous les paquets dans l'ordre des dépendances.

Pour tester les changements dans une API consommatrice, utilisez un portail Yarn temporaire -- voir [Développement local contre une application consommatrice](./index.md#local-development-against-a-consuming-app).

## Publication

Les versions passent par changesets : exécutez `yarn changeset` à la racine de l'espace de travail avec chaque changement, puis `yarn publish-all` quand vous êtes prêt à publier. Voir [Vue d'ensemble des bibliothèques partagées](./index.md#releasing-with-changesets) pour le flux complet.

:::info
Ce paquet est une dépendance de chaque API ChurchApps -- l'Api core, AskApi et LessonsApi. Lors de la réalisation de changements, testez contre une API localement avant de publier.
:::

## Articles connexes

- **[Helpers](./helpers)** -- Le paquet d'utilitaires de base sur lequel ce paquet dépend
- **[Structure du module](../api/module-structure)** -- Comment les contrôleurs et le middleware d'authentification sont utilisés dans les modules API
- **[Configuration locale de l'API](../api/local-setup)** -- Configuration de l'API pour le développement local
