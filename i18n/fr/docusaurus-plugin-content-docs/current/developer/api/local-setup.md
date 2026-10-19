---
title: "Configuration locale de l'API"
---

# Configuration locale de l'API

<div class="article-intro">

Ce guide vous accompagne dans la configuration de l'API ChurchApps pour le développement local. Vous allez cloner le dépôt, configurer vos connexions à la base de données, initialiser le schéma et démarrer le serveur de développement avec rechargement à chaud.

</div>

<div class="prereqs">
<h4>Avant de commencer</h4>

- Installez **Node.js 22+**, **Git** et **MySQL 8.0+** -- voir les [prérequis](../setup/prerequisites)
- Créez un utilisateur MySQL disposant des privilèges de création de bases de données
- Consultez la référence des [variables d'environnement](../setup/environment-variables) pour la configuration de l'API

</div>

## Configuration pas à pas

### 1. Cloner le dépôt

```bash
git clone https://github.com/ChurchApps/Api.git
```

### 2. Installer les dépendances

Le projet utilise Yarn (un garde-fou bloque `npm install`) :

```bash
cd Api
yarn install
```

### 3. Configurer les variables d'environnement

```bash
cp .env.sample .env
```

Ouvrez `.env` et configurez vos chaînes de connexion MySQL. Chaque module a besoin de sa propre connexion à la base de données, au format suivant :

```
mysql://root:password@localhost:3306/dbname
```

Vous aurez besoin de chaînes de connexion pour les six bases de données des modules (membership, attendance, content, giving, messaging, doing).

### 4. Initialiser les bases de données

```bash
npm run initdb
```

Cette commande crée automatiquement les six bases de données et leurs tables.

:::tip
Vous pouvez initialiser la base de données d'un seul module avec `npm run initdb -- --module=membership` (ou `attendance`, `content`, `giving`, `messaging`, `doing`).
:::

### 5. Démarrer le serveur de développement

```bash
npm run dev
```

L'API démarre avec rechargement à chaud sur [http://localhost:8084](http://localhost:8084).

## Commandes principales

| Commande | Description |
|---------|-------------|
| `npm run dev` | Démarre le serveur de développement avec rechargement à chaud (tsx watch) |
| `npm run build` | Nettoie, compile le TypeScript et copie les ressources |
| `npm run test` | Exécute les tests avec Jest (avec couverture de code) |
| `npm run test:watch` | Exécute les tests en mode surveillance |
| `npm run lint` | Exécute ESLint avec correction automatique (ESLint est le seul formateur) |

## Déploiement

L'environnement de préproduction a été retiré. L'API se déploie dans l'environnement de démonstration à chaque push sur `main`, et en production via le workflow manuel **Deploy Prod**, qui applique aussi les migrations de base de données en attente. Voir [Déploiement de l'API](../deployment/apis) pour plus de détails.

## Développement local des bibliothèques

Si vous devez développer une bibliothèque partagée (`@churchapps/helpers` ou `@churchapps/apihelper`) en parallèle de l'API, compilez-la dans l'espace de travail [Packages](https://github.com/ChurchApps/Packages) et ajoutez un portail Yarn temporaire dans l'API :

```bash
# In the Packages workspace
yarn build

# In the API directory
yarn link ../Packages/helpers
# ... test ...
yarn unlink ../Packages/helpers && yarn install
```

Cela vous permet de tester les modifications de la bibliothèque avec l'API sans la publier sur npm. Voir [Bibliothèques partagées](../shared-libraries/#local-development-against-a-consuming-app) pour plus de détails -- et ne committez jamais la résolution de portail que le lien écrit dans `package.json`.

## Articles connexes

- **[Base de données](./database)** -- Comprendre l'architecture d'une base de données par module
- **[Structure des modules](./module-structure)** -- Comment les contrôleurs, les dépôts et les modèles sont organisés
- **[Bibliothèques partagées](../shared-libraries/)** -- Travailler avec `@churchapps/helpers` et `@churchapps/apihelper`
