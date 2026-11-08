---
title: "Aplicaciones móviles"
description: "Descripción general de las aplicaciones móviles de ChurchApps creadas con Expo y React Native, B1 Checkin y LessonsScreen, además de los pasos de configuración local de su conjunto de herramientas Expo compartido."
---

# Aplicaciones móviles

<div class="article-intro">

Las aplicaciones móviles de ChurchApps están desarrolladas con **React Native** y **Expo**, y ofrecen experiencias nativas en Android, iOS y Android TV. Todas las aplicaciones móviles comparten el mismo conjunto de herramientas basado en Expo, así que si sabe compilar una, sabrá compilar todas.

</div>

## Aplicaciones

| Aplicación | Propósito | Plataforma |
|-----|---------|----------|
| B1 Checkin | Aplicación de quiosco para las estaciones de registro | Android, iOS |
| LessonsScreen | Aplicación para Android TV que muestra lecciones en las aulas | Android TV |

:::info
La aplicación para miembros es la B1 App: la sección `/mobile` de B1App, que los miembros instalan como una aplicación web progresiva (PWA). Es una aplicación web, no un proyecto de Expo; consulte [Aplicaciones web](../web-apps/index.md) para ejecutarla localmente.
:::

### B1 Checkin

Una aplicación de quiosco diseñada específicamente para las estaciones de registro de las iglesias. Ofrece una interfaz sencilla y fácil de usar con pantalla táctil, para que los miembros registren a los niños y anoten la asistencia a los servicios y eventos.

### LessonsScreen

Una aplicación para Android TV que muestra el contenido de las lecciones en las aulas. Los maestros pueden enviar diapositivas, videos y actividades de las lecciones a la pantalla del televisor, lo que facilita presentar el material curricular durante las clases.

## Configuración local

Todas las aplicaciones móviles comparten el mismo conjunto de herramientas basado en Expo y siguen patrones de configuración similares. Usando B1 Checkin como ejemplo:

1. Instale **Node.js**, Android Studio (para el emulador de Android) y Xcode (para el simulador de iOS, solo en macOS); consulte [Requisitos previos](../setup/prerequisites.md).
2. Clone el repositorio e instale las dependencias (B1 Checkin usa Yarn):

   ```bash
   git clone https://github.com/ChurchApps/B1Checkin.git
   cd B1Checkin && yarn install
   ```

3. Copie `dotenv.sample.txt` como `.env` y configure el entorno al que debe conectarse la aplicación (`dev` para una API local); consulte [Variables de entorno](../setup/environment-variables.md#b1checkin-react-native--expo).
4. Inicie el servidor de desarrollo de Expo con `yarn start` y, después, ejecute `yarn android` o `yarn ios` para abrir la aplicación en un emulador o dispositivo.

Consulte [Despliegue móvil](../deployment/mobile.md) para las compilaciones de lanzamiento y las actualizaciones over-the-air.
