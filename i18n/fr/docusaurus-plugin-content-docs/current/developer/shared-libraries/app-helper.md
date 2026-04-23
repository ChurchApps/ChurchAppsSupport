---
title: "AppHelper"
---

# AppHelper

<div class="article-intro">

Les paquets `@churchapps/apphelper*` fournissent les composants React partagés et les utilitaires pour toutes les applications web ChurchApps. AppHelper est structuré en tant qu'espace de travail monorepo contenant six paquets couvrant les composants core, l'authentification, les donations, les formulaires, le markdown et la fonctionnalité site web/CMS.

</div>

<div class="prereqs">
<h4>Avant de commencer</h4>

- Installer **Node.js** et **Git** -- voir [Prérequis](../setup/prerequisites)
- Vous familiariser avec le workflow [npm link](./index.md) pour le développement local

</div>

## Paquets

| Paquet | Description |
|---------|-------------|
| `@churchapps/apphelper` | Composants core et utilitaires React |
| `@churchapps/apphelper-login` | UI de connexion et d'enregistrement |
| `@churchapps/apphelper-donations` | Composants de donation et de donation |
| `@churchapps/apphelper-forms` | Composants du générateur de formulaires |
| `@churchapps/apphelper-markdown` | Éditeur et convertisseur Markdown |
| `@churchapps/apphelper-website` | Composants de site web et CMS |

## Configuration pour le développement local

1. Cloner le référentiel :

   ```bash
   git clone https://github.com/ChurchApps/AppHelper.git
   ```

2. Installer les dépendances :

   ```bash
   cd AppHelper && npm install
   ```

3. Construire tous les paquets et lancer le terrain de jeu Vite :

   ```bash
   npm run playground:reload
   ```

   Cela construit chaque paquet dans l'espace de travail, puis démarre le serveur de développement du terrain de jeu à **http://localhost:3001**.

:::tip
Le terrain de jeu est le moyen le plus rapide de développer et tester les composants AppHelper. Il rechargue à chaud le serveur de développement Vite pour que vous voyiez les changements en temps réel.
:::

## Publication

Publier un seul paquet :

```bash
npm run publish:apphelper
```

Publier tous les paquets :

```bash
npm run publish:all
```

:::warning
Lors de la publication, assurez-vous de mettre à jour le numéro de version dans le fichier `package.json` pertinent avant d'exécuter la commande de publication. Tous les paquets qui dépendent d'un paquet modifié doivent également être mises à jour.
:::

## Articles connexes

- **[Helpers](./helpers)** -- Le paquet d'utilitaires de base utilisé aux côtés d'AppHelper
- **[Applications web](../web-apps/)** -- Les applications web qui consomment ces paquets
- **[Aperçu des bibliothèques partagées](./index.md)** -- Workflow npm link et aperçu des paquets
