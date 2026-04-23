---
title: "Variables d'environnement"
---

# Variables d'environnement

<div class="article-intro">

Chaque projet ChurchApps utilise un fichier `.env` pour la configuration locale. Chaque projet inclut un fichier d'exemple que vous copiez et personnalisez. Cette page couvre les variables d'environnement pour les APIs, les applications web et les applications mobiles, y compris comment choisir entre les cibles d'API staging et locales.

</div>

<div class="prereqs">
<h4>Avant de commencer</h4>

- Installer les [prérequis](./prerequisites) pour votre projet
- Cloner le référentiel du projet sur lequel vous voulez travailler
- Consulter l'[Aperçu du projet](./project-overview) pour comprendre quels modules API votre projet a besoin

</div>

## Modèle général

1. Rechercher `dotenv.sample.txt` ou `.env.sample` à la racine du projet.
2. Le copier vers `.env`.
3. Éditer les valeurs si nécessaire.

```bash
# Exemple pour un projet avec .env.sample
cp .env.sample .env

# Exemple pour un projet avec dotenv.sample.txt
cp dotenv.sample.txt .env
```

:::warning
**Ne jamais committer les fichiers `.env` au contrôle de version.** Ils contiennent des secrets tels que les credentials de base de données, les clés API et les secrets JWT. Tous les projets ChurchApps incluent `.env` dans `.gitignore`, mais vérifiez toujours avant de committer.
:::

## Choisir une cible d'API

La décision la plus importante est le lieu de votre frontend pour les appels API. Il y a deux options :

### Option 1 : APIs de staging (recommandé pour le développement frontend)

Utiliser l'environnement de staging partagé. Aucune configuration locale d'API ou de base de données requise.

```bash
# Modèle d'URL de base
https://api.staging.churchapps.org/{module}

# Exemples d'URLs de modules
https://api.staging.churchapps.org/membership
https://api.staging.churchapps.org/attendance
https://api.staging.churchapps.org/content
https://api.staging.churchapps.org/giving
https://api.staging.churchapps.org/messaging
https://api.staging.churchapps.org/doing
```

### Option 2 : API locale

Exécuter le projet Api sur votre machine. Nécessite MySQL 8.0+ avec les bases de données créées pour chaque module. Voir le guide de [configuration locale de l'API](../api/local-setup).

```bash
# Modèle d'URL de base
http://localhost:8084/{module}

# Exemples d'URLs de modules
http://localhost:8084/membership
http://localhost:8084/attendance
http://localhost:8084/content
http://localhost:8084/giving
http://localhost:8084/messaging
http://localhost:8084/doing
```

---

## Variables d'environnement de l'API

Le projet **Api** core (`.env.sample`) a la plus grande configuration. Voici les variables clés :

### Paramètres partagés

| Variable | Description | Exemple |
|----------|-------------|---------|
| `ENVIRONMENT` | Environnement d'exécution | `dev` |
| `SERVER_PORT` | Port HTTP pour le serveur de développement local | `8084` |
| `ENCRYPTION_KEY` | Clé de chiffrement 192-bit pour les données sensibles | `aSecretKeyOfExactly192BitsLength` |
| `JWT_SECRET` | Secret pour signer les JSON Web Tokens | `jwt-secret-dev` |
| `FILE_STORE` | Où stocker les fichiers téléchargés (`disk` ou `s3`) | `disk` |
| `CORS_ORIGIN` | Origines CORS autorisées (`*` pour le développement local) | `*` |

### Connexions à la base de données

Chaque module API a sa propre base de données MySQL et sa chaîne de connexion :

| Variable | Base de données |
|----------|----------|
| `MEMBERSHIP_CONNECTION_STRING` | `mysql://root:password@localhost:3306/membership` |
| `ATTENDANCE_CONNECTION_STRING` | `mysql://root:password@localhost:3306/attendance` |
| `CONTENT_CONNECTION_STRING` | `mysql://root:password@localhost:3306/content` |
| `GIVING_CONNECTION_STRING` | `mysql://root:password@localhost:3306/giving` |
| `MESSAGING_CONNECTION_STRING` | `mysql://root:password@localhost:3306/messaging` |
| `DOING_CONNECTION_STRING` | `mysql://root:password@localhost:3306/doing` |

:::tip
Mettre à jour `root:password` avec vos credentials MySQL réels. Chaque base de données doit être créée avant d'exécuter l'API. Utilisez `npm run initdb` pour créer le schéma pour tous les modules, ou `npm run initdb:membership` pour un seul module.
:::

### Paramètres WebSocket

| Variable | Description | Exemple |
|----------|-------------|---------|
| `SOCKET_PORT` | Port pour le serveur WebSocket | `8087` |
| `SOCKET_URL` | URL WebSocket pour que les clients se connectent | `ws://localhost:8087` |

---

## Variables d'environnement de l'application web

### B1Admin (React + Vite)

Fichier d'exemple : `.env.sample`

| Variable | Description | Exemple (Staging) |
|----------|-------------|-------------------|
| `REACT_APP_STAGE` | Nom de l'environnement | `demo` |
| `PORT` | Port du serveur de développement | `3101` |
| `REACT_APP_MEMBERSHIP_API` | URL de l'API Membership | `https://api.staging.churchapps.org/membership` |
| `REACT_APP_ATTENDANCE_API` | URL de l'API Attendance | `https://api.staging.churchapps.org/attendance` |
| `REACT_APP_GIVING_API` | URL de l'API Giving | `https://api.staging.churchapps.org/giving` |
| `REACT_APP_CONTENT_ROOT` | URL de distribution de contenu | `https://content.staging.churchapps.org` |
| `REACT_APP_GOOGLE_ANALYTICS` | Google Analytics ID (optionnel) | `UA-123456789-1` |

Pour le développement local de l'API, décommenter et utiliser les variantes `localhost` :

```bash
REACT_APP_MEMBERSHIP_API=http://localhost:8084/membership
REACT_APP_ATTENDANCE_API=http://localhost:8084/attendance
REACT_APP_GIVING_API=http://localhost:8084/giving
REACT_APP_CONTENT_API=http://localhost:8084/content
REACT_APP_DOING_API=http://localhost:8084/doing
REACT_APP_MESSAGING_API=http://localhost:8084/messaging
```

### B1App (Next.js)

Fichier d'exemple : `.env.sample`

| Variable | Description | Exemple (Staging) |
|----------|-------------|-------------------|
| `NEXT_PUBLIC_MEMBERSHIP_API` | URL de l'API Membership | `https://api.staging.churchapps.org/membership` |
| `NEXT_PUBLIC_ATTENDANCE_API` | URL de l'API Attendance | `https://api.staging.churchapps.org/attendance` |
| `NEXT_PUBLIC_GIVING_API` | URL de l'API Giving | `https://api.staging.churchapps.org/giving` |
| `NEXT_PUBLIC_MESSAGING_API` | URL de l'API Messaging | `https://api.staging.churchapps.org/messaging` |
| `NEXT_PUBLIC_CONTENT_API` | URL de l'API Content | `https://api.staging.churchapps.org/content` |
| `NEXT_PUBLIC_CONTENT_ROOT` | URL de distribution de contenu | `https://staging.churchapps.org/content` |
| `NEXT_PUBLIC_CHURCH_APPS_URL` | URL de base ChurchApps | `https://staging.churchapps.org` |
| `NEXT_PUBLIC_GOOGLE_ANALYTICS` | Google Analytics ID (optionnel) | `UA-123456789-1` |

:::info
Next.js nécessite le préfixe `NEXT_PUBLIC_` pour toute variable d'environnement qui doit être disponible dans le navigateur. Les variables serveur uniquement n'ont pas besoin de ce préfixe.
:::

### LessonsApp (Next.js)

Fichier d'exemple : `dotenv.sample.txt`

| Variable | Description | Exemple (Staging) |
|----------|-------------|-------------------|
| `STAGE` | Étape de l'environnement | `staging` |
| `NEXT_PUBLIC_LESSONS_API` | URL de l'API Lessons | `https://api.staging.lessons.church` |
| `NEXT_PUBLIC_CONTENT_ROOT` | URL de distribution de contenu | `https://api.staging.lessons.church/content` |
| `NEXT_PUBLIC_CHURCH_APPS_URL` | URL de base ChurchApps | `https://staging.churchapps.org` |

---

## Variables d'environnement de l'application mobile

### B1Mobile (React Native / Expo)

Fichier d'exemple : `dotenv.sample.txt`

| Variable | Description | Exemple (Staging) |
|----------|-------------|-------------------|
| `STAGE` | Nom de l'environnement | `dev` |
| `MEMBERSHIP_API` | URL de l'API Membership | `https://api.staging.churchapps.org/membership` |
| `MESSAGING_API` | URL de l'API Messaging | `https://api.staging.churchapps.org/messaging` |
| `ATTENDANCE_API` | URL de l'API Attendance | `https://api.staging.churchapps.org/attendance` |
| `GIVING_API` | URL de l'API Giving | `https://api.staging.churchapps.org/giving` |
| `DOING_API` | URL de l'API Doing | `https://api.staging.churchapps.org/doing` |
| `CONTENT_API` | URL de l'API Content | `https://api.churchapps.org/content` |
| `CONTENT_ROOT` | URL de distribution de contenu | `https://content.staging.churchapps.org` |
| `LESSONS_ROOT` | URL du site Lessons | `https://staging.lessons.church` |

:::info
Les applications mobiles n'utilisent pas les préfixes `REACT_APP_` ou `NEXT_PUBLIC_`. L'accès aux variables d'environnement est géré par la configuration Expo.
:::

---

## Référence rapide : Emplacements des fichiers d'exemple

| Projet | Fichier d'exemple |
|---------|-------------|
| Api | `.env.sample` |
| B1Admin | `.env.sample` |
| B1App | `.env.sample` |
| B1Mobile | `dotenv.sample.txt` |
| B1Checkin | `dotenv.sample.txt` |
| LessonsApp | `dotenv.sample.txt` |
| AskApi | `dotenv.sample.txt` |
