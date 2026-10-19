---
title: "B1 Mobile"
---

# B1 Mobile

<div class="article-intro">

B1 Mobile es la aplicación móvil principal para los miembros de ChurchApps, creada con React Native y Expo. Permite a los miembros de la iglesia ver directorios, acceder a las donaciones, consultar la asistencia, recibir notificaciones e interactuar con su comunidad eclesiástica.

</div>

<div class="prereqs">
<h4>Antes de comenzar</h4>

- Instale **Node.js** y **Expo CLI**; consulte [Requisitos previos](../setup/prerequisites)
- Instale **Android Studio** (para el emulador de Android) o **Xcode** (para el simulador de iOS)
- Configure su destino de la API (demostración o local); consulte [Variables de entorno](../setup/environment-variables)

</div>

## Configuración

1. Clone el repositorio:

   ```bash
   git clone https://github.com/ChurchApps/B1Mobile.git
   ```

2. Instale las dependencias:

   ```bash
   cd B1Mobile && npm install
   ```

3. Configure las variables de entorno: copie el archivo de ejemplo y actualice los endpoints de la API:

   ```bash
   cp dotenv.sample.txt .env
   ```

4. Inicie el servidor de desarrollo de Expo:

   ```bash
   npm start
   ```

:::tip
Puede usar la aplicación **Expo Go** en un dispositivo físico para hacer pruebas rápidas sin configurar Android Studio ni Xcode.
:::

## Variables de entorno

| Variable | Descripción |
|----------|-------------|
| `STAGE` | Etapa del entorno (por ejemplo, `dev`, `staging`, `prod`) |
| `CONTENT_ROOT` | URL raíz para la entrega de contenido |
| `MEMBERSHIP_API` | Endpoint de la API de Membresía |
| `MESSAGING_API` | Endpoint de la API de Mensajería |
| `ATTENDANCE_API` | Endpoint de la API de Asistencia |
| `GIVING_API` | Endpoint de la API de Donaciones |
| `DOING_API` | Endpoint de la API de Doing |
| `CONTENT_API` | Endpoint de la API de Contenido |
| `LESSONS_ROOT` | URL raíz para el contenido de lecciones |

## Comandos principales

| Comando | Descripción |
|---------|-------------|
| `npm start` | Iniciar el servidor de desarrollo de Expo |
| `npm run android` | Ejecutar en el emulador de Android |
| `npm run ios` | Ejecutar en el simulador de iOS |
| `npm run test` | Ejecutar las pruebas (Jest) |

## Compilaciones de producción

Antes de crear una compilación de producción, actualice los números de versión en todos los archivos siguientes:

- `package.json`
- `app.config.js`
- `android/app/build.gradle`
- `ios/B1Mobile/Info.plist`

### Android

```bash
npm run build:android
```

Esto usa EAS Build para crear el binario de Android.

### iOS

```bash
eas build --platform ios --profile production
```

### Actualizaciones OTA

Para publicar una actualización por aire (sin pasar por la revisión de la tienda de aplicaciones):

```bash
npm run update:production
```

:::info
Las actualizaciones OTA son ideales para cambios solo de JavaScript. Si modifica código nativo o dependencias, debe enviar una compilación completa a la tienda.
:::

## Artículos relacionados

- **[Despliegue móvil](../deployment/mobile)**: guía completa para compilar, enviar y desplegar aplicaciones móviles
- **[Variables de entorno](../setup/environment-variables)**: referencia completa de la configuración del entorno móvil
