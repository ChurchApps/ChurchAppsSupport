---
title: "Documentación para desarrolladores"
---

# Documentación para desarrolladores

<div class="article-intro">

ChurchApps es una colección de aproximadamente 20 proyectos de código abierto que, en conjunto, ofrecen una plataforma completa de gestión para iglesias. Los proyectos abarcan APIs de backend, aplicaciones web, aplicaciones móviles, una aplicación de escritorio y bibliotecas compartidas, todos escritos en TypeScript. Esta sección le ofrece todo lo necesario para configurar un entorno de desarrollo local y comenzar a contribuir.

</div>

## Descripción general de la arquitectura

Los proyectos son **repositorios independientes** (no un monorepo). El código compartido se publica en npm bajo el ámbito `@churchapps/*` y se consume como una dependencia normal. Esto significa que puede trabajar en un solo proyecto sin clonar todo el ecosistema.

Características clave:

- **Lenguaje:** TypeScript en todo el proyecto
- **Backend:** APIs con Node.js / Express desplegadas en AWS Lambda mediante Serverless Framework
- **Web:** React 19 (Vite y Next.js), Material-UI 7
- **Móvil:** React Native con Expo
- **Base de datos:** MySQL 8.0, una base de datos por módulo de la API

## Lo que cubre esta sección

- **[Configuración](setup/)**: entorno de desarrollo local, requisitos previos y configuración
  - [Requisitos previos](setup/prerequisites): herramientas y software necesarios
  - [Descripción general del proyecto](setup/project-overview): todos los proyectos de un vistazo
  - [Variables de entorno](setup/environment-variables): configuración de los archivos `.env`
- **[API](api/)**: configuración local de la API principal, inicialización de la base de datos y estructura de módulos
- **[Aplicaciones web](web-apps/)**: ejecución local de B1Admin, B1App y LessonsApp
- **[Aplicaciones móviles](mobile/)**: compilación de B1Mobile y otras aplicaciones de Expo
- **[Bibliotecas compartidas](shared-libraries/)**: trabajo con Helpers, ApiHelper y AppHelper
- **[Despliegue](deployment/)**: despliegue de APIs, aplicaciones web y aplicaciones móviles
- **[Proveedor de contenido de FreePlay](freeplay-content-provider)**: integración de su biblioteca de lecciones con FreePlay

## Comunidad y recursos

| Recurso | Enlace |
|----------|------|
| Organización en GitHub | [github.com/ChurchApps](https://github.com/ChurchApps) |
| Rastreador de incidencias | [Incidencias de ChurchAppsSupport](https://github.com/ChurchApps/ChurchAppsSupport/issues) |
| Comunidad en Slack | [Unirse a Slack](https://join.slack.com/t/livechurchsolutions/shared_invite/zt-i88etpo5-ZZhYsQwQLVclW12DKtVflg) |

:::tip
La forma más rápida de empezar a contribuir es elegir una aplicación web (como B1Admin), apuntarla a las **APIs de demostración** compartidas y comenzar a hacer cambios en el frontend. No se requiere configurar una base de datos ni una API.
:::
