---
title: "B1 Mobile"
---

# B1 Mobile

<div class="article-intro">

B1 Mobile es la aplicación móvil principal dirigida a miembros de ChurchApps, construida con React Native y Expo. Permite a los miembros de la iglesia ver directorios, acceder a donaciones, verificar asistencia, recibir notificaciones e interactuar con su comunidad de iglesia.

</div>

<div class="prereqs">
<h4>Antes de Comenzar</h4>

- Instalar **Node.js** y **Expo CLI** -- ver [Requisitos Previos](../setup/prerequisites)
- Instalar **Android Studio** (para emulador de Android) o **Xcode** (para simulador de iOS)
- Configurar su objetivo de API (preparación o local) -- ver [Variables de Entorno](../setup/environment-variables)

</div>

## Configuración

1. Clonar el repositorio:

   ```bash
   git clone https://github.com/ChurchApps/B1Mobile.git
   ```

2. Instalar dependencias:

   ```bash
   cd B1Mobile && npm install
   ```

3. Configurar variables de entorno -- copiar el archivo de muestra y actualizar los puntos de conexión de API:

   ```bash
   cp dotenv.sample.txt .env
   ```

4. Iniciar el servidor de desarrollo de Expo:

   ```bash
   npm start
   ```

:::tip
Puede utilizar la aplicación **Expo Go** en un dispositivo físico para pruebas rápidas sin configurar Android Studio o Xcode.
:::

## Variables de Entorno

| Variable | Descripción |
|----------|-------------|
| `STAGE` | Etapa de entorno (p. ej., `dev`, `staging`, `prod`) |
| `CONTENT_ROOT` | URL raíz para entrega de contenido |
| `MEMBERSHIP_API` | Punto de conexión de API de membresía |
| `MESSAGING_API` | Punto de conexión de API de mensajería |
| `ATTENDANCE_API` | Punto de conexión de API de asistencia |
| `GIVING_API` | Punto de conexión de API de donaciones |
| `DOING_API` | Punto de conexión de API de tareas |
| `CONTENT_API` | Punto de conexión de API de contenido |
| `LESSONS_ROOT` | URL raíz para contenido de lecciones |

## Comandos Clave

| Comando | Descripción |
|---------|-------------|
| `npm start` | Lanzar servidor de desarrollo de Expo |
| `npm run android` | Ejecutar en emulador de Android |
| `npm run ios` | Ejecutar en simulador de iOS |
| `npm run test` | Ejecutar pruebas (Jest) |

## Compilaciones de Producción

Antes de crear una compilación de producción, actualice los números de versión en todos los archivos siguientes:

- `package.json`
- `app.config.js`
- `android/app/build.gradle`
- `ios/B1Mobile/Info.plist`

### Android

```bash
npm run build:android
```

Esto utiliza EAS Build para crear el binario de Android.

### iOS

```bash
eas build --platform ios --profile production
```

### Actualizaciones OTA

Para impulsar una actualización inalámbrica (sin pasar por revisión de la tienda de aplicaciones):

```bash
npm run update:production
```

:::info
Las actualizaciones OTA son ideales para cambios de solo JavaScript. Si modifica código nativo o dependencias, debe enviar una compilación de tienda completa en su lugar.
:::

## Artículos Relacionados

- **[Despliegue Móvil](../deployment/mobile)** -- Guía completa para compilar, enviar y desplegar aplicaciones móviles
- **[Variables de Entorno](../setup/environment-variables)** -- Referencia completa para configuración de entorno móvil
