---
title: "Installation locale de l'API"
---

# Installation locale de l'API

<div class="article-intro">

Ce guide vous accompagne dans la configuration de l'API ChurchApps pour le développement local. Vous allez cloner le dépôt, configurer vos connexions de base de données, initialiser le schéma et démarrer le serveur de développement avec rechargement à chaud.

</div>

<div class="prereqs">
<h4>Avant de commencer</h4>

- Installez **Node.js 24+**, **Git** et **MySQL 8.0+** -- consultez les [prérequis](../setup/prerequisites)
- Créez un utilisateur MySQL disposant des privilèges de création de bases de données
- Consultez la référence des [variables d'environnement](../setup/environment-variables) pour la configuration de l'API

</div>

## Étapes détaillées de la configuration

### 1. Cloner le dépôt

```bash
git clone https://github.com/ChurchApps/Api.git
```

### 2. Installer les dépendances

Le projet utilise Yarn (une protection bloque `npm install`) :

```bash
cd Api
yarn install
```

### 3. Configurer les variables d'environnement

```bash
cp .env.sample .env
```

Ouvrez `.env` et configurez les chaînes de connexion MySQL. Chaque module a besoin de sa propre connexion à la base de données, dans le format suivant :

```
mysql://root:password@localhost:3306/dbname
```

Vous aurez besoin des chaînes de connexion des six bases de données de modules (membership, attendance, content, giving, messaging, doing).

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

L'API démarre avec rechargement à chaud à l'adresse [http://localhost:8084](http://localhost:8084).

## Commandes principales

| Commande | Description |
|---------|-------------|
| `npm run dev` | Démarrer le serveur de développement avec rechargement à chaud (tsx watch) |
| `npm run build` | Nettoyer, compiler le TypeScript et copier les ressources |
| `npm run test` | Exécuter les tests avec Jest (inclut la couverture) |
| `npm run test:watch` | Exécuter les tests en mode surveillance |
| `npm run lint` | Exécuter ESLint avec correction automatique (ESLint est le seul formateur) |

## Déploiement

L'environnement de préproduction a été retiré. L'API se déploie dans l'environnement de démonstration à chaque envoi vers `main`, et vers la production par le flux de travail manuel **Deploy Prod**, qui applique aussi les migrations de base de données en attente. Consultez [Déploiement de l'API](../deployment/apis) pour plus de détails.

## Développement de bibliothèques locales

Si vous devez développer une bibliothèque partagée (`@churchapps/helpers` ou `@churchapps/apihelper`) en parallèle de l'API, compilez-la dans l'espace de travail [Packages](https://github.com/ChurchApps/Packages) et ajoutez un portail Yarn temporaire dans l'API :

```bash
# In the Packages workspace
yarn build

# In the API directory
yarn link ../Packages/helpers
# ... test ...
yarn unlink ../Packages/helpers && yarn install
```

Cela vous permet de tester les modifications de bibliothèque avec l'API sans les publier sur npm. Consultez [Bibliothèques partagées](../shared-libraries/#local-development-against-a-consuming-app) pour plus de détails -- et ne validez jamais la résolution de portail que le lien écrit dans `package.json`.

## Articles connexes

- **[Base de données](./database)** -- Comprendre l'architecture une base par module
- **[Structure des modules](./module-structure)** -- Comment les contrôleurs, les dépôts et les modèles sont organisés
- **[Bibliothèques partagées](../shared-libraries/)** -- Travailler avec `@churchapps/helpers` et `@churchapps/apihelper`
