---
title: "Déploiement mobile"
---

# Déploiement mobile

<div class="article-intro">

Les applications mobiles ChurchApps sont construites et déployées à l'aide d'**Expo EAS Build** et distribuées via les app stores. Cette page couvre la construction, la soumission et le déploiement des mises à jour over-the-air pour Android et iOS.

</div>

<div class="prereqs">
<h4>Avant de commencer</h4>

- Configurer l'application mobile localement -- voir [B1 Mobile](../mobile/b1-mobile)
- Installer et configurer [EAS CLI](https://docs.expo.dev/eas/)
- Avoir accès à Google Play Console (Android) et/ou Apple App Store Connect (iOS)

</div>

## Construction

### Android

```bash
npm run build:android
```

### iOS

```bash
eas build --platform ios --profile production
```

## Soumission aux app stores

### Android -- Google Play Store

Après une construction EAS réussie, le binaire Android (AAB) est soumis au Google Play Store via Play Console.

### iOS -- Apple App Store

Soumettre la construction iOS directement via EAS :

```bash
eas submit --platform ios
```

## Mises à jour OTA

Pour les modifications JavaScript uniquement qui ne nécessitent pas de révision par l'app store, utilisez les mises à jour over-the-air (OTA) :

```bash
npm run update:production
```

Cela utilise EAS Update pour envoyer les changements directement aux utilisateurs sans une soumission complète au store.

:::tip
Les mises à jour OTA sont nettement plus rapides que les builds du store -- les changements peuvent atteindre les utilisateurs en minutes plutôt qu'en jours. Utilisez-les pour les corrections de bugs, les changements de copie et les mises à jour mineures de l'UI qui n'impliquent pas de changements de code natif.
:::

## Numéros de version

Avant de créer une build du store, les numéros de version doivent être mises à jour dans plusieurs fichiers :

- `package.json`
- `app.config.js`
- `android/app/build.gradle`
- `ios/*/Info.plist`
- `ios/*/project.pbxproj`

:::warning
Oublier de mettre à jour les numéros de version dans tous les fichiers causera des échecs de build ou un rejet par l'app store. Vérifiez chaque fichier listé ci-dessus avant de démarrer une build de production.
:::

## Articles connexes

- **[B1 Mobile](../mobile/b1-mobile)** -- Guide de configuration local et de développement
- **[Déploiement de l'API](./apis)** -- Déployer les APIs backend
- **[Déploiement des applications web](./web-apps)** -- Déployer les applications web frontend
