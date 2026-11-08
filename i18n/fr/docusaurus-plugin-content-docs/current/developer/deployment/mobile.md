---
title: "Déploiement mobile"
description: "Guide de création des versions Android et iOS des applications Expo comme B1 Checkin, de leur soumission aux stores d'applications et de l'envoi de mises à jour OTA avec EAS."
---

# Déploiement mobile

<div class="article-intro">

Les applications mobiles Expo de ChurchApps, comme B1 Checkin, sont compilées avec **Expo EAS Build** ou avec une compilation Gradle locale, puis distribuées via les stores d'applications. Cette page explique comment compiler, soumettre et envoyer des mises à jour over-the-air (OTA) pour Android et iOS, en prenant B1 Checkin comme exemple.

</div>

<div class="prereqs">
<h4>Avant de commencer</h4>

- Configurez l'application en local -- voir [Applications mobiles](../mobile/index.md#local-setup)
- Installez et configurez la [CLI EAS](https://docs.expo.dev/eas/)
- Assurez-vous d'avoir accès à la Google Play Console (Android) et/ou à App Store Connect d'Apple (iOS)

</div>

## Compilation

### Android

Les versions Android de production se compilent en local et sont signées avec le keystore de publication fourni par EAS. Téléchargez-le une seule fois avec `npx eas-cli credentials -p android` (choisissez **credentials.json: Download credentials from EAS**), puis exécutez :

```bash
yarn build:android
```

Le bundle Google Play est généré dans `android/app/build/outputs/bundle/release/app-release.aab`. Pour compiler sur EAS à la place, exécutez `yarn build:android:eas`.

### iOS

Les builds iOS s'exécutent toujours sur EAS :

```bash
yarn build:ios
```

## Soumission aux stores d'applications

### Android -- Google Play Store

Importez l'AAB dans la Play Console, ou soumettez-le avec EAS :

```bash
npx eas-cli submit -p android --path android/app/build/outputs/bundle/release/app-release.aab
```

### iOS -- Apple App Store

Soumettez directement le build iOS via EAS :

```bash
eas submit --platform ios
```

## Mises à jour OTA

Pour les modifications uniquement en JavaScript qui ne nécessitent pas de validation par le store, utilisez les mises à jour over-the-air (OTA) :

```bash
yarn update
```

Cette commande utilise EAS Update pour envoyer directement les modifications aux utilisateurs, sans soumission complète au store.

:::tip
Les mises à jour OTA sont nettement plus rapides que les builds de store : les modifications peuvent atteindre les utilisateurs en quelques minutes plutôt qu'en plusieurs jours. Utilisez-les pour les corrections de bugs, les modifications de texte et les petits ajustements d'interface qui ne touchent pas au code natif.
:::

## Numéros de version

Avant de créer un build pour un store, les numéros de version doivent être mis à jour dans plusieurs fichiers :

- `package.json`
- `app.json`
- `android/app/build.gradle` (`versionName` et `versionCode`)

Le numéro de build iOS est incrémenté automatiquement par EAS.

:::warning
Oublier de mettre à jour les numéros de version dans tous les fichiers entraînera des échecs de compilation ou un rejet par le store. Vérifiez attentivement chacun des fichiers listés ci-dessus avant de lancer un build de production.
:::

## Articles connexes

- **[Applications mobiles](../mobile/index.md)** -- Guide de configuration locale et de développement
- **[Déploiement des API](./apis.md)** -- Déploiement des API backend
- **[Déploiement des applications web](./web-apps.md)** -- Déploiement des applications web frontend
