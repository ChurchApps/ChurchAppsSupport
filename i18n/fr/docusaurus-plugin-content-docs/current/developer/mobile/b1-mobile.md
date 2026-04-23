---
title: "B1 Mobile"
---

# B1 Mobile

<div class="article-intro">

B1 Mobile est l'application mobile principale orientée vers les membres de ChurchApps, construite avec React Native et Expo. Elle permet aux membres de l'église de voir les répertoires, accéder aux donations, vérifier la présence, recevoir des notifications et interagir avec leur communauté religieuse.

</div>

<div class="prereqs">
<h4>Avant de commencer</h4>

- Installer **Node.js** et **Expo CLI** -- voir [Prérequis](../setup/prerequisites)
- Installer **Android Studio** (pour l'émulateur Android) ou **Xcode** (pour le simulateur iOS)
- Configurer votre cible API (staging ou local) -- voir [Variables d'environnement](../setup/environment-variables)

</div>

## Configuration

1. Cloner le référentiel :

   ```bash
   git clone https://github.com/ChurchApps/B1Mobile.git
   ```

2. Installer les dépendances :

   ```bash
   cd B1Mobile && npm install
   ```

3. Configurer les variables d'environnement -- copier le fichier d'exemple et mettre à jour les endpoints API :

   ```bash
   cp dotenv.sample.txt .env
   ```

4. Démarrer le serveur de développement Expo :

   ```bash
   npm start
   ```

:::tip
Vous pouvez utiliser l'application **Expo Go** sur un appareil physique pour des tests rapides sans configurer Android Studio ou Xcode.
:::

## Variables d'environnement

| Variable | Description |
|----------|-------------|
| `STAGE` | Étape de l'environnement (par exemple, `dev`, `staging`, `prod`) |
| `CONTENT_ROOT` | URL racine pour la distribution de contenu |
| `MEMBERSHIP_API` | Endpoint de l'API Membership |
| `MESSAGING_API` | Endpoint de l'API Messaging |
| `ATTENDANCE_API` | Endpoint de l'API Attendance |
| `GIVING_API` | Endpoint de l'API Giving |
| `DOING_API` | Endpoint de l'API Doing |
| `CONTENT_API` | Endpoint de l'API Content |
| `LESSONS_ROOT` | URL racine pour le contenu des leçons |

## Commandes clés

| Commande | Description |
|---------|-------------|
| `npm start` | Lancer le serveur de développement Expo |
| `npm run android` | Exécuter sur l'émulateur Android |
| `npm run ios` | Exécuter sur le simulateur iOS |
| `npm run test` | Exécuter les tests (Jest) |

## Builds de production

Avant de créer une build de production, mettre à jour les numéros de version dans tous les fichiers suivants :

- `package.json`
- `app.config.js`
- `android/app/build.gradle`
- `ios/B1Mobile/Info.plist`

### Android

```bash
npm run build:android
```

Cela utilise EAS Build pour créer le binaire Android.

### iOS

```bash
eas build --platform ios --profile production
```

### Mises à jour OTA

Pour envoyer une mise à jour over-the-air (sans révision par l'app store) :

```bash
npm run update:production
```

:::info
Les mises à jour OTA sont idéales pour les changements JavaScript uniquement. Si vous modifiez le code natif ou les dépendances, vous devez soumettre une build complète du store à la place.
:::

## Articles connexes

- **[Déploiement mobile](../deployment/mobile)** -- Guide complet pour construire, soumettre et déployer les applications mobiles
- **[Variables d'environnement](../setup/environment-variables)** -- Référence complète pour la configuration de l'environnement mobile
