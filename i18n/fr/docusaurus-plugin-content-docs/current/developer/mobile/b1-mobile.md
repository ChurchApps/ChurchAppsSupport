---
title: "B1 Mobile"
---

# B1 Mobile

<div class="article-intro">

B1 Mobile est l'application mobile principale destinée aux membres de ChurchApps, développée avec React Native et Expo. Elle permet aux membres de l'église de consulter les annuaires, d'accéder aux dons, de consulter la présence, de recevoir des notifications et d'interagir avec leur communauté d'église.

</div>

<div class="prereqs">
<h4>Avant de commencer</h4>

- Installez **Node.js** et **Expo CLI** -- voir [Prérequis](../setup/prerequisites)
- Installez **Android Studio** (pour l'émulateur Android) ou **Xcode** (pour le simulateur iOS)
- Configurez la cible de votre API (démo ou locale) -- voir [Variables d'environnement](../setup/environment-variables)

</div>

## Installation

1. Clonez le dépôt :

   ```bash
   git clone https://github.com/ChurchApps/B1Mobile.git
   ```

2. Installez les dépendances :

   ```bash
   cd B1Mobile && npm install
   ```

3. Configurez les variables d'environnement -- copiez le fichier d'exemple et mettez à jour les points de terminaison de l'API :

   ```bash
   cp dotenv.sample.txt .env
   ```

4. Démarrez le serveur de développement Expo :

   ```bash
   npm start
   ```

:::tip
Vous pouvez utiliser l'application **Expo Go** sur un appareil physique pour des tests rapides, sans configurer Android Studio ni Xcode.
:::

## Variables d'environnement

| Variable | Description |
|----------|-------------|
| `STAGE` | Environnement (par exemple `dev`, `staging`, `prod`) |
| `CONTENT_ROOT` | URL racine de diffusion du contenu |
| `MEMBERSHIP_API` | Point de terminaison de l'API Membership |
| `MESSAGING_API` | Point de terminaison de l'API Messaging |
| `ATTENDANCE_API` | Point de terminaison de l'API Attendance |
| `GIVING_API` | Point de terminaison de l'API Giving |
| `DOING_API` | Point de terminaison de l'API Doing |
| `CONTENT_API` | Point de terminaison de l'API Content |
| `LESSONS_ROOT` | URL racine du contenu des leçons |

## Commandes principales

| Commande | Description |
|---------|-------------|
| `npm start` | Lance le serveur de développement Expo |
| `npm run android` | Lance sur l'émulateur Android |
| `npm run ios` | Lance sur le simulateur iOS |
| `npm run test` | Exécute les tests (Jest) |

## Builds de production

Avant de créer un build de production, mettez à jour les numéros de version dans tous les fichiers suivants :

- `package.json`
- `app.config.js`
- `android/app/build.gradle`
- `ios/B1Mobile/Info.plist`

### Android

```bash
npm run build:android
```

Cette commande utilise EAS Build pour créer le binaire Android.

### iOS

```bash
eas build --platform ios --profile production
```

### Mises à jour OTA

Pour publier une mise à jour over-the-air (sans passer par la validation de l'App Store) :

```bash
npm run update:production
```

:::info
Les mises à jour OTA conviennent parfaitement aux modifications uniquement en JavaScript. Si vous modifiez le code natif ou les dépendances, vous devez soumettre un build complet au store à la place.
:::

## Articles connexes

- **[Déploiement mobile](../deployment/mobile)** -- Guide complet pour compiler, soumettre et déployer les applications mobiles
- **[Variables d'environnement](../setup/environment-variables)** -- Référence complète de la configuration d'environnement mobile
