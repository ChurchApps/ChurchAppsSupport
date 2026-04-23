---
title: "ApiHelper"
---

# ApiHelper

<div class="article-intro">

Le paquet `@churchapps/apihelper` fournit les utilitaires côté serveur pour toutes les APIs Express ChurchApps. Il inclut la classe du contrôleur de base, le middleware d'authentification JWT, les utilitaires de base de données et les intégrations AWS que chaque projet API dépend.

</div>

<div class="prereqs">
<h4>Avant de commencer</h4>

- Installer **Node.js** et **Git** -- voir [Prérequis](../setup/prerequisites)
- Vous familiariser avec le workflow [npm link](./index.md) pour le développement local
- Ce paquet dépend de [`@churchapps/helpers`](./helpers)

</div>

## Ce qui est inclus

- **CustomBaseController** -- classe de base pour les contrôleurs API
- **Middleware d'authentification** -- authentification JWT via `CustomAuthProvider`
- **Utilitaires de base de données** -- `DB.query`, `EnhancedPoolHelper` pour la gestion des connexions MySQL
- **Intégrations AWS** -- helpers pour S3, SSM Parameter Store et d'autres services AWS
- **Configuration Inversify DI** -- configuration du conteneur d'injection de dépendances

## Configuration pour le développement local

1. Cloner le référentiel :

   ```bash
   git clone https://github.com/ChurchApps/ApiHelper.git
   ```

2. Installer les dépendances :

   ```bash
   cd ApiHelper && npm install
   ```

3. Construire le paquet (compile TypeScript vers `dist/`) :

   ```bash
   npm run build
   ```

4. Le rendre disponible pour la liaison locale :

   ```bash
   npm link
   ```

## Commandes clés

| Commande | Description |
|---------|-------------|
| `npm run build` | Compiler TypeScript vers `dist/` |
| `npm run lint` | Exécuter ESLint |
| `npm run lint:fix` | Exécuter ESLint avec correction automatique |
| `npm run format` | Formater le code avec Prettier |

:::info
Ce paquet est une dépendance de chaque API ChurchApps. Quand vous faites des changements, utilisez `npm link` pour tester contre une API localement avant de publier.
:::

## Articles connexes

- **[Helpers](./helpers)** -- Le paquet d'utilitaires de base sur lequel ce paquet dépend
- **[Structure du module](../api/module-structure)** -- Comment les contrôleurs et le middleware d'authentification sont utilisés dans les modules API
- **[Configuration locale de l'API](../api/local-setup)** -- Configuration de l'API pour le développement local
