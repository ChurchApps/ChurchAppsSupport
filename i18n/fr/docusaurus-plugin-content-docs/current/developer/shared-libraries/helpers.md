---
title: "Helpers"
---

# Helpers

<div class="article-intro">

Le paquet `@churchapps/helpers` fournit les utilitaires de base utilisés par tous les projets ChurchApps, à la fois frontend et backend. Il est indépendant du framework et inclut les helpers communs tels que `DateHelper`, `ApiHelper`, `CurrencyHelper` et d'autres utilitaires partagés.

</div>

<div class="prereqs">
<h4>Avant de commencer</h4>

- Installer **Node.js** et **Git** -- voir [Prérequis](../setup/prerequisites)
- Vous familiariser avec le workflow [npm link](./index.md) pour le développement local

</div>

## Configuration pour le développement local

1. Cloner le référentiel :

   ```bash
   git clone https://github.com/ChurchApps/Helpers.git
   ```

2. Installer les dépendances :

   ```bash
   cd Helpers && npm install
   ```

3. Construire le paquet (compile TypeScript vers `dist/`) :

   ```bash
   npm run build
   ```

4. Le rendre disponible pour la liaison locale :

   ```bash
   npm link
   ```

Vous pouvez alors le lier dans n'importe quel projet de consommation :

```bash
cd ../YourProject && npm link @churchapps/helpers
```

## Publication

Pour publier une nouvelle version sur npm :

1. Mettre à jour la version dans `package.json`
2. Publier :

   ```bash
   npm publish --access=public
   ```

:::warning
Puisque ce paquet est utilisé par chaque projet ChurchApps, les changements ici ont un impact large. Tester complètement avec `npm link` dans au moins une API de consommation et une application web de consommation avant de publier.
:::

## Articles connexes

- **[ApiHelper](./api-helper)** -- Utilitaires côté serveur qui dépendent de ce paquet
- **[AppHelper](./app-helper)** -- Composants React qui dépendent de ce paquet
- **[Aperçu des bibliothèques partagées](./index.md)** -- Workflow npm link et aperçu des paquets
