---
title: "Despliegue Móvil"
---

# Despliegue Móvil

<div class="article-intro">

Las aplicaciones móviles de ChurchApps se construyen y despliegan utilizando **Expo EAS Build** y se distribuyen a través de las tiendas de aplicaciones. Esta página cubre la compilación, envío e impulso de actualizaciones inalámbricas para Android e iOS.

</div>

<div class="prereqs">
<h4>Antes de Comenzar</h4>

- Configurar la aplicación móvil localmente -- ver [B1 Mobile](../mobile/b1-mobile)
- Instalar y configurar [EAS CLI](https://docs.expo.dev/eas/)
- Tener acceso a Google Play Console (Android) y/o Apple App Store Connect (iOS)

</div>

## Compilación

### Android

```bash
npm run build:android
```

### iOS

```bash
eas build --platform ios --profile production
```

## Envío a Tiendas de Aplicaciones

### Android -- Google Play Store

Después de una compilación EAS exitosa, el binario de Android (AAB) se envía a Google Play Store a través de Play Console.

### iOS -- Apple App Store

Envíe la compilación de iOS directamente a través de EAS:

```bash
eas submit --platform ios
```

## Actualizaciones OTA

Para cambios de solo JavaScript que no requieren revisión de la tienda de aplicaciones, utilice actualizaciones inalámbricas (OTA):

```bash
npm run update:production
```

Esto utiliza EAS Update para impulsar cambios directamente a los usuarios sin un envío de tienda completo.

:::tip
Las actualizaciones OTA son significativamente más rápidas que compilaciones de tienda -- los cambios pueden llegar a los usuarios en minutos en lugar de días. Úsalas para correcciones de errores, cambios de copia y actualizaciones menores de la interfaz de usuario que no impliquen cambios de código nativo.
:::

## Números de Versión

Antes de crear una compilación de tienda, los números de versión deben actualizarse en varios archivos:

- `package.json`
- `app.config.js`
- `android/app/build.gradle`
- `ios/*/Info.plist`
- `ios/*/project.pbxproj`

:::warning
Olvidar actualizar números de versión en todos los archivos causará fallos de compilación o rechazo de la tienda de aplicaciones. Verifique dos veces cada archivo listado arriba antes de iniciar una compilación de producción.
:::

## Artículos Relacionados

- **[B1 Mobile](../mobile/b1-mobile)** -- Guía de configuración y desarrollo local
- **[Despliegue de API](./apis)** -- Despliegue de las APIs backend
- **[Despliegue de Aplicación Web](./web-apps)** -- Despliegue de aplicaciones web frontend
