---
title: "Variables d'environnement"
---

# Variables d'environnement

<div class="article-intro">

Chaque projet ChurchApps utilise un fichier `.env` pour la configuration locale. Chaque projet comprend un fichier d'exemple que vous copiez et personnalisez. Cette page décrit les variables d'environnement des API, des applications web et des applications mobiles, y compris comment choisir entre la démo et l'API locale.

</div>

<div class="prereqs">
<h4>Avant de commencer</h4>

- Installez les [prérequis](./prerequisites) de votre projet
- Clonez le dépôt du projet sur lequel vous voulez travailler
- Consultez l'[aperçu du projet](./project-overview) pour comprendre quels modules d'API votre projet nécessite

</div>

## Principe général

1. Recherchez `dotenv.sample.txt` ou `.env.sample` à la racine du projet.
2. Copiez-le en `.env`.
3. Modifiez les valeurs selon vos besoins.

```bash
# Example for a project with .env.sample
cp .env.sample .env

# Example for a project with dotenv.sample.txt
cp dotenv.sample.txt .env
```

:::warning
**Ne versionnez jamais les fichiers `.env`.** Ils contiennent des secrets tels que les identifiants de base de données, les clés d'API et les secrets JWT. Tous les projets ChurchApps incluent `.env` dans `.gitignore`, mais vérifiez toujours avant de faire un commit.
:::

## Choisir une cible d'API

La décision la plus importante est l'adresse vers laquelle votre frontend envoie ses appels d'API. Il existe deux options :

### Option 1 : API de démonstration (recommandé pour le développement frontend)

Utilisez l'environnement de démonstration partagé. Aucune API locale ni base de données n'est nécessaire. Il exécute le dernier code de `main`, et ses données d'exemple sont rechargées chaque nuit.

```bash
# Base URL pattern
https://api.demo.churchapps.org/{module}

# Example module URLs
https://api.demo.churchapps.org/membership
https://api.demo.churchapps.org/attendance
https://api.demo.churchapps.org/content
https://api.demo.churchapps.org/giving
https://api.demo.churchapps.org/messaging
https://api.demo.churchapps.org/doing
```

:::warning
L'environnement de préproduction (`api.staging.churchapps.org`, `api.staging.lessons.church` et les hôtes associés) a été retiré. Certains fichiers `.env` d'exemple peuvent encore contenir des URL de préproduction ; remplacez-les par les valeurs de démo ou locales indiquées sur cette page. Il n'existe pas d'API Lessons non productive partagée -- exécutez [LessonsApi](https://github.com/ChurchApps/LessonsApi) en local (elle écoute sur le port `8090`) si vous en avez besoin.
:::

### Option 2 : API locale

Exécutez le projet Api sur votre machine. Nécessite MySQL 8.0+ avec les bases de données créées pour chaque module. Voir le guide [configuration locale de l'API](../api/local-setup).

```bash
# Base URL pattern
http://localhost:8084/{module}

# Example module URLs
http://localhost:8084/membership
http://localhost:8084/attendance
http://localhost:8084/content
http://localhost:8084/giving
http://localhost:8084/messaging
http://localhost:8084/doing
```

---

## Variables d'environnement de l'API

Le projet principal **Api** (`.env.sample`) comporte le plus de configuration. Voici les variables clés :

### Paramètres communs

| Variable | Description | Exemple |
|----------|-------------|---------|
| `ENVIRONMENT` | Environnement d'exécution | `dev` |
| `SERVER_PORT` | Port HTTP du serveur de développement local | `8084` |
| `ENCRYPTION_KEY` | Clé de chiffrement de 192 bits pour les données sensibles | `aSecretKeyOfExactly192BitsLength` |
| `JWT_SECRET` | Secret de signature des JSON Web Tokens | `jwt-secret-dev` |
| `FILE_STORE` | Emplacement de stockage des fichiers envoyés (`disk` ou `s3`) | `disk` |
| `CORS_ORIGIN` | Origines CORS autorisées (`*` pour le développement local) | `*` |

### Connexion à la base de données

Une URL de base unique pointe l'API vers MySQL. L'API dérive une base de données par module (`/membership`, `/attendance`, `/content`, `/giving`, `/messaging`, `/doing`, `/reporting`) à partir de cette base.

| Variable | Exemple |
|----------|---------|
| `API_DATABASE_URL` | `mysql://root:password@localhost:3306` |

:::tip
Remplacez `root:password` par vos identifiants MySQL réels. Chaque base de données par module doit exister avant le lancement de l'API. Utilisez `npm run initdb` pour créer le schéma de tous les modules, ou `npm run initdb:membership` pour un seul module.
:::

### Paramètres WebSocket

| Variable | Description | Exemple |
|----------|-------------|---------|
| `SOCKET_PORT` | Port du serveur WebSocket | `8087` |
| `SOCKET_URL` | URL WebSocket à laquelle les clients se connectent | `ws://localhost:8087` |

---

## Variables d'environnement des applications web

### B1Admin (React + Vite)

Fichier d'exemple : `.env.sample`

| Variable | Description | Exemple (démo) |
|----------|-------------|----------------|
| `REACT_APP_STAGE` | Nom de l'environnement | `demo` |
| `PORT` | Port du serveur de développement | `3101` |
| `REACT_APP_API_BASE` | URL de base unique pour toutes les API ChurchApps (`/membership`, `/attendance`, `/content`, `/giving`, `/messaging`, `/doing`, `/reporting` sont ajoutés automatiquement) | `https://api.demo.churchapps.org` |
| `REACT_APP_CONTENT_ROOT` | URL de diffusion du contenu | `https://democontent.churchapps.org` |
| `REACT_APP_GOOGLE_ANALYTICS` | Identifiant Google Analytics (facultatif) | `UA-123456789-1` |

Pour le développement avec l'API locale, pointez l'URL de base vers votre environnement local :

```bash
REACT_APP_API_BASE=http://localhost:8084
```

### B1App (Next.js)

Fichier d'exemple : `.env.sample`

| Variable | Description | Exemple (démo) |
|----------|-------------|----------------|
| `NEXT_PUBLIC_API_BASE` | URL de base unique pour toutes les API ChurchApps (`/membership`, `/attendance`, `/content`, `/giving`, `/messaging`, `/doing`, `/reporting` sont ajoutés automatiquement) | `https://api.demo.churchapps.org` |
| `NEXT_PUBLIC_CONTENT_ROOT` | URL de diffusion du contenu | `https://democontent.churchapps.org` |
| `NEXT_PUBLIC_GOOGLE_ANALYTICS` | Identifiant Google Analytics (facultatif) | `UA-123456789-1` |

:::info
Next.js exige le préfixe `NEXT_PUBLIC_` pour toute variable d'environnement qui doit être disponible dans le navigateur. Les variables réservées au serveur n'ont pas besoin de ce préfixe.
:::

### LessonsApp (Next.js)

Fichier d'exemple : `dotenv.sample.txt`

| Variable | Description | Exemple (API Lessons locale) |
|----------|-------------|------------------------------|
| `STAGE` | Étape de l'environnement (laisser vide ou `dev` pour le développement local) | `dev` |
| `NEXT_PUBLIC_LESSONS_API` | URL de l'API Lessons | `http://localhost:8090` |
| `NEXT_PUBLIC_CONTENT_ROOT` | URL de diffusion du contenu | `http://localhost:8090/content` |
| `NEXT_PUBLIC_API_BASE` | URL de base de l'API ChurchApps utilisée pour la connexion (prise en compte uniquement lorsque `STAGE` est vide ou `dev`) | `https://api.demo.churchapps.org` |

---

## Variables d'environnement des applications mobiles

### B1Mobile (React Native / Expo)

Fichier d'exemple : `dotenv.sample.txt`

| Variable | Description | Exemple (démo) |
|----------|-------------|----------------|
| `STAGE` | Nom de l'environnement | `dev` |
| `MEMBERSHIP_API`, `ATTENDANCE_API`, `GIVING_API`, `DOING_API`, `MESSAGING_API`, `CONTENT_API` | Une URL par module d'API ChurchApps (chacune revient à la production si elle n'est pas définie) | `https://api.demo.churchapps.org/membership` |
| `LESSONS_API` | API Lessons (hôte distinct ; il n'existe pas d'instance non productive partagée) | `https://api.lessons.church` |
| `CONTENT_ROOT` | URL de diffusion du contenu | `https://democontent.churchapps.org` |
| `LESSONS_ROOT` | URL du site Lessons | `https://lessons.church` |

:::info
Les applications mobiles n'utilisent pas le préfixe `REACT_APP_` ni `NEXT_PUBLIC_`. L'accès aux variables d'environnement est géré par la configuration Expo.
:::

---

## Référence rapide : emplacements des fichiers d'exemple

| Projet | Fichier d'exemple |
|---------|-------------|
| Api | `.env.sample` |
| B1Admin | `.env.sample` |
| B1App | `.env.sample` |
| B1Mobile | `dotenv.sample.txt` |
| B1Checkin | `dotenv.sample.txt` |
| LessonsApp | `dotenv.sample.txt` |
| AskApi | `dotenv.sample.txt` |
