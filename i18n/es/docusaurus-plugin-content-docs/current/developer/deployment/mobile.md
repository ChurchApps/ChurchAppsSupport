---
title: "Despliegue móvil"
description: "Guía para compilar versiones de Android e iOS de aplicaciones Expo como B1 Checkin, enviarlas a las tiendas de aplicaciones y publicar actualizaciones OTA con EAS."
---

# Despliegue móvil

<div class="article-intro">

Las aplicaciones móviles Expo de ChurchApps, como B1 Checkin, se compilan con **Expo EAS Build** o con una compilación local de Gradle, y se distribuyen a través de las tiendas de aplicaciones. Esta página explica cómo compilar, enviar y publicar actualizaciones over-the-air (OTA) para Android e iOS, usando B1 Checkin como ejemplo.

</div>

<div class="prereqs">
<h4>Antes de comenzar</h4>

- Configura la aplicación localmente; consulta [Aplicaciones móviles](../mobile/index.md#local-setup)
- Instala y configura la [CLI de EAS](https://docs.expo.dev/eas/)
- Ten acceso a Google Play Console (Android) y/o Apple App Store Connect (iOS)

</div>

## Compilación

### Android

Las compilaciones de lanzamiento para Android se ejecutan localmente y se firman con el keystore de lanzamiento de EAS. Descárgalo una vez con `npx eas-cli credentials -p android` (elige **credentials.json: Download credentials from EAS**) y luego ejecuta:

```bash
yarn build:android
```

El paquete de Google Play se genera en `android/app/build/outputs/bundle/release/app-release.aab`. Para compilar en EAS, ejecuta `yarn build:android:eas`.

### iOS

Las compilaciones para iOS siempre se ejecutan en EAS:

```bash
yarn build:ios
```

## Envío a las tiendas de aplicaciones

### Android: Google Play Store

Sube el AAB a través de Play Console, o envíalo con EAS:

```bash
npx eas-cli submit -p android --path android/app/build/outputs/bundle/release/app-release.aab
```

### iOS: Apple App Store

Envía la compilación de iOS directamente con EAS:

```bash
eas submit --platform ios
```

## Actualizaciones OTA

Para los cambios exclusivamente en JavaScript que no requieren revisión de la tienda de aplicaciones, usa las actualizaciones over-the-air (OTA):

```bash
yarn update
```

Esto utiliza EAS Update para enviar los cambios directamente a los usuarios sin un envío completo a la tienda.

:::tip
Las actualizaciones OTA son significativamente más rápidas que las compilaciones para tienda: los cambios pueden llegar a los usuarios en minutos en lugar de días. Úsalas para correcciones de errores, cambios de texto y ajustes menores de la interfaz que no impliquen cambios en código nativo.
:::

## Números de versión

Antes de crear una compilación para la tienda, es necesario actualizar los números de versión en varios archivos:

- `package.json`
- `app.json`
- `android/app/build.gradle` (`versionName` y `versionCode`)

El número de compilación de iOS se incrementa automáticamente con EAS.

:::warning
Si olvidas actualizar los números de versión en todos los archivos, la compilación fallará o la tienda de aplicaciones rechazará la aplicación. Revisa cada uno de los archivos indicados antes de iniciar una compilación de producción.
:::

## Artículos relacionados

- **[Aplicaciones móviles](../mobile/index.md)**: Guía de configuración local y desarrollo
- **[Despliegue de API](./apis.md)**: Despliegue de las APIs del backend
- **[Despliegue de aplicaciones web](./web-apps.md)**: Despliegue de las aplicaciones web del frontend
