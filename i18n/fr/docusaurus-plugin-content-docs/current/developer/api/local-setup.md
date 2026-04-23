---
title: "Configuration locale de l'API"
---

# Configuration locale de l'API

<div class="article-intro">

Ce guide vous guide à travers la configuration de l'API ChurchApps pour le développement local. Vous allez cloner le référentiel, configurer vos connexions à la base de données, initialiser le schéma et démarrer le serveur de développement avec le rechargement automatique.

</div>

<div class="prereqs">
<h4>Avant de commencer</h4>

- Installer **Node.js 22+**, **Git** et **MySQL 8.0+** -- voir [Prérequis](../setup/prerequisites)
- Créer un utilisateur MySQL avec les privilèges de création de base de données
- Consulter la référence [Variables d'environnement](../setup/environment-variables) pour la configuration de l'API

</div>

## Configuration étape par étape

### 1. Cloner le référentiel

```bash
git clone https://github.com/ChurchApps/Api.git
```

### 2. Installer les dépendances

```bash
cd Api
npm install
```

### 3. Configurer les variables d'environnement

```bash
cp .env.sample .env
```

Ouvrez `.env` et configurez vos chaînes de connexion MySQL. Chaque module a besoin de sa propre connexion à la base de données au format suivant :

```
mysql://root:password@localhost:3306/dbname
```

Vous aurez besoin de chaînes de connexion pour les six bases de données des modules (membership, attendance, content, giving, messaging, doing).

### 4. Initialiser les bases de données

```bash
npm run initdb
```

Cela crée automatiquement les six bases de données et leurs tables.

:::tip
Vous pouvez initialiser la base de données d'un seul module avec `npm run initdb:membership` (ou `attendance`, `content`, `giving`, `messaging`, `doing`).
:::

### 5. Démarrer le serveur de développement

```bash
npm run dev
```

L'API démarre avec le rechargement automatique à [http://localhost:8084](http://localhost:8084).

## Commandes clés

| Commande | Description |
|---------|-------------|
| `npm run dev` | Démarrer le serveur de développement avec rechargement automatique (tsx watch) |
| `npm run build` | Nettoyer, compiler TypeScript et copier les actifs |
| `npm run test` | Exécuter les tests avec Jest (inclut la couverture) |
| `npm run test:watch` | Exécuter les tests en mode montre |
| `npm run lint` | Exécuter Prettier et ESLint avec correction automatique |

## Déploiement en staging

Pour déployer dans l'environnement de staging :

```bash
npm run deploy-staging
```

Cela exécute un build de production puis se déploie via Serverless Framework.

:::warning
Assurez-vous que vos credentials AWS sont configurés avant d'exécuter la commande de déploiement.
:::

## Développement local de la bibliothèque

Si vous avez besoin de développer une bibliothèque partagée (`@churchapps/helpers` ou `@churchapps/apihelper`) aux côtés de l'API, utilisez `npm link` :

```bash
# Dans le répertoire de la bibliothèque
cd Helpers
npm run build
npm link

# Dans le répertoire de l'API
cd ../Api
npm link @churchapps/helpers
```

Cela vous permet de tester les modifications de la bibliothèque par rapport à l'API sans publier sur npm.

## Articles connexes

- **[Base de données](./database)** -- Comprendre l'architecture une base de données par module
- **[Structure du module](./module-structure)** -- Comment les contrôleurs, repositories et modèles sont organisés
- **[Bibliothèques partagées](../shared-libraries/)** -- Travailler avec `@churchapps/helpers` et `@churchapps/apihelper`
