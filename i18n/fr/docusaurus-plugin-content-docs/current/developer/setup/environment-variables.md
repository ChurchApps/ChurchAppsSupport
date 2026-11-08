---
title: "Variables d'environnement"
description: "Configurez les fichiers .env des projets ChurchApps, choisissez l'API de démonstration partagée ou une API locale, et renseignez les variables pour B1 Admin, B1.church, B1 Checkin et d'autres."
---

# Variables d'environnement

<div class="article-intro">

Chaque projet ChurchApps utilise un fichier `.env` pour sa configuration locale. Chaque projet comprend un fichier exemple que vous copiez puis personnalisez. Cette page présente les variables d'environnement des API, des applications web et des applications mobiles, y compris la façon de choisir entre la cible de démonstration et la cible locale.

</div>

<div class="prereqs">
<h4>Avant de commencer</h4>

- Installez les [prérequis](./prerequisites.md) de votre projet
- Clonez le dépôt du projet sur lequel vous souhaitez travailler
- Consultez l'[aperçu du projet](./project-overview.md) pour savoir quels modules d'API votre projet nécessite

</div>

## Principe général

1. Recherchez `dotenv.sample.txt` ou `.env.sample` à la racine du projet.
2. Copiez-le sous le nom `.env`.
3. Modifiez les valeurs selon vos besoins.

```bash
# Exemple pour un projet avec .env.sample
cp .env.sample .env

# Exemple pour un projet avec dotenv.sample.txt
cp dotenv.sample.txt .env
```

:::warning
**Ne versionnez jamais les fichiers `.env`.** Ils contiennent des secrets tels que les identifiants de base de données, les clés d'API et les secrets JWT. Tous les projets ChurchApps incluent `.env` dans `.gitignore`, mais vérifiez toujours avant de faire un commit.
:::

## Choisir une cible d'API

La décision la plus importante concerne l'adresse vers laquelle votre frontend envoie ses appels d'API. Vous avez deux options :

### Option 1 : API de démonstration (recommandée pour le développement frontend)

Utilisez l'environnement de démonstration partagé. Aucune API locale ni configuration de base de données n'est nécessaire. Il exécute le dernier code de `main`, et ses données d'exemple sont réinitialisées chaque nuit.

```bash
# Modèle d'URL de base
https://api.demo.churchapps.org/{module}

# Exemples d'URL de modules
https://api.demo.churchapps.org/membership
https://api.demo.churchapps.org/attendance
https://api.demo.churchapps.org/content
https://api.demo.churchapps.org/giving
https://api.demo.churchapps.org/messaging
https://api.demo.churchapps.org/doing
```

:::warning
L'environnement de préproduction (`api.staging.churchapps.org`, `api.staging.lessons.church` et les hôtes associés) a été retiré. Certains fichiers `.env` d'exemple peuvent encore contenir des URL de préproduction ; remplacez-les par les valeurs de démonstration ou locales indiquées sur cette page. Il n'existe pas d'API Lessons partagée hors production. Si vous en avez besoin, exécutez [LessonsApi](https://github.com/ChurchApps/LessonsApi) en local (il écoute sur le port `8090`).
:::

### Option 2 : API locale

Exécutez le projet Api sur votre machine. Cela nécessite MySQL 8.0 ou une version ultérieure, avec une base de données créée pour chaque module. Consultez le guide [configuration locale de l'API](../api/local-setup.md).

```bash
# Modèle d'URL de base
http://localhost:8084/{module}

# Exemples d'URL de modules
http://localhost:8084/membership
http://localhost:8084/attendance
http://localhost:8084/content
http://localhost:8084/giving
http://localhost:8084/messaging
http://localhost:8084/doing
```

---

## Variables d'environnement de l'API

Le projet principal **Api** (`.env.sample`) comporte le plus grand nombre de paramètres. Voici les variables clés :

### Paramètres communs

| Variable | Description | Exemple |
|----------|-------------|---------|
| `ENVIRONMENT` | Environnement d'exécution | `dev` |
| `SERVER_PORT` | Port HTTP du serveur de développement local | `8084` |
| `ENCRYPTION_KEY` | Clé de chiffrement de 192 bits pour les données sensibles | `aSecretKeyOfExactly192BitsLength` |
| `JWT_SECRET` | Secret utilisé pour signer les JSON Web Tokens | `jwt-secret-dev` |
| `FILE_STORE` | Emplacement de stockage des fichiers envoyés (`disk` ou `s3`) | `disk` |
| `CORS_ORIGIN` | Origines CORS autorisées (`*` pour le développement local) | `*` |

### Connexion à la base de données

Une seule URL de base indique à l'API l'adresse de MySQL. L'API déduit de cette base une base de données par module (`/membership`, `/attendance`, `/content`, `/giving`, `/messaging`, `/doing`, `/reporting`).

| Variable | Exemple |
|----------|---------|
| `API_DATABASE_URL` | `mysql://root:password@localhost:3306` |

:::tip
Remplacez `root:password` par vos identifiants MySQL réels. Chaque base de données par module doit exister avant de lancer l'API. Utilisez `npm run initdb` pour créer le schéma de tous les modules, ou `npm run initdb:membership` pour un seul module.
:::

### Paramètres WebSocket

| Variable | Description | Exemple |
|----------|-------------|---------|
| `SOCKET_PORT` | Port du serveur WebSocket | `8087` |
| `SOCKET_URL` | URL WebSocket à laquelle les clients se connectent | `ws://localhost:8087` |

---

## Variables d'environnement des applications web

### B1Admin (React + Vite)

Fichier exemple : `.env.sample`

| Variable | Description | Exemple (démonstration) |
|----------|-------------|-------------------------|
| `REACT_APP_STAGE` | Nom de l'environnement | `demo` |
| `PORT` | Port du serveur de développement | `3101` |
| `REACT_APP_API_BASE` | URL de base unique pour toutes les API ChurchApps (`/membership`, `/attendance`, `/content`, `/giving`, `/messaging`, `/doing`, `/reporting` sont ajoutés automatiquement) | `https://api.demo.churchapps.org` |
| `REACT_APP_CONTENT_ROOT` | URL de diffusion du contenu | `https://democontent.churchapps.org` |
| `REACT_APP_GOOGLE_ANALYTICS` | Identifiant Google Analytics (facultatif) | `UA-123456789-1` |

Pour le développement avec une API locale, pointez l'URL de base vers votre pile locale :

```bash
REACT_APP_API_BASE=http://localhost:8084
```

### B1App (Next.js)

Fichier exemple : `.env.sample`

| Variable | Description | Exemple (démonstration) |
|----------|-------------|-------------------------|
| `NEXT_PUBLIC_API_BASE` | URL de base unique pour toutes les API ChurchApps (`/membership`, `/attendance`, `/content`, `/giving`, `/messaging`, `/doing`, `/reporting` sont ajoutés automatiquement) | `https://api.demo.churchapps.org` |
| `NEXT_PUBLIC_CONTENT_ROOT` | URL de diffusion du contenu | `https://democontent.churchapps.org` |
| `NEXT_PUBLIC_GOOGLE_ANALYTICS` | Identifiant Google Analytics (facultatif) | `UA-123456789-1` |

:::info
Next.js exige le préfixe `NEXT_PUBLIC_` pour toute variable d'environnement qui doit être disponible dans le navigateur. Les variables réservées au serveur n'ont pas besoin de ce préfixe.
:::

### LessonsApp (Next.js)

Fichier exemple : `dotenv.sample.txt`

| Variable | Description | Exemple (LessonsApi locale) |
|----------|-------------|-----------------------------|
| `STAGE` | Étape de l'environnement (à laisser non définie ou à `dev` pour le développement local) | `dev` |
| `NEXT_PUBLIC_LESSONS_API` | URL de l'API Lessons | `http://localhost:8090` |
| `NEXT_PUBLIC_CONTENT_ROOT` | URL de diffusion du contenu | `http://localhost:8090/content` |
| `NEXT_PUBLIC_API_BASE` | URL de base de l'API ChurchApps utilisée pour la connexion (prise en compte uniquement si `STAGE` n'est pas défini ou vaut `dev`) | `https://api.demo.churchapps.org` |

---

## Variables d'environnement des applications mobiles

### B1Checkin (React Native / Expo)

Fichier exemple : `dotenv.sample.txt`

| Variable | Description | Exemple |
|----------|-------------|---------|
| `EXPO_PUBLIC_STAGE` | Détermine le jeu d'API auquel l'application se connecte : `dev` (API locale à `http://127.0.0.1:8084`), `staging` ou `prod` (valeur par défaut si non défini) | `dev` |

B1Checkin utilise uniquement les modules d'API Membership et Attendance, ainsi que l'URL de diffusion du contenu. Leurs adresses pour chaque étape sont définies dans `src/helpers/EnvironmentHelper.ts`.

:::info
Expo n'intègre dans le bundle de l'application que les variables préfixées par `EXPO_PUBLIC_`. Redémarrez le serveur de développement avec `yarn start --reset-cache` après avoir modifié `.env`.
:::

---

## Référence rapide : emplacements des fichiers exemples

| Projet | Fichier exemple |
|--------|-----------------|
| Api | `.env.sample` |
| B1Admin | `.env.sample` |
| B1App | `.env.sample` |
| B1Checkin | `dotenv.sample.txt` |
| LessonsApp | `dotenv.sample.txt` |
| AskApi | `dotenv.sample.txt` |
