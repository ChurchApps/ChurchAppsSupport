---
title: "Documentación para desarrolladores"
description: "Encuentre su camino por la documentación para desarrolladores de ChurchApps: configuración local, guías de API y aplicaciones web, bibliotecas compartidas, compilaciones móviles e implementación de los proyectos de código abierto."
---

# Documentación para desarrolladores

<div class="article-intro">

ChurchApps es una colección de aproximadamente 20 proyectos de código abierto que, en conjunto, ofrecen una plataforma completa de gestión para iglesias. Los proyectos abarcan APIs de backend, aplicaciones web, aplicaciones móviles, una aplicación de escritorio y bibliotecas compartidas, todos escritos en TypeScript. Esta sección le proporciona todo lo necesario para configurar un entorno de desarrollo local y empezar a contribuir.

</div>

## Arquitectura en resumen

Los proyectos son **repositorios independientes** (no un monorepositorio). El código compartido se publica en npm bajo el ámbito `@churchapps/*` y se utiliza como una dependencia normal. Esto significa que puede trabajar en un solo proyecto sin clonar todo el ecosistema.

Características principales:

- **Lenguaje:** TypeScript en todo el proyecto
- **Backend:** APIs de Node.js / Express implementadas en AWS Lambda mediante Serverless Framework
- **Web:** React 19 (Vite y Next.js), Material-UI 7
- **Móvil:** React Native con Expo
- **Base de datos:** MySQL 8.0, una base de datos por módulo de API

## Contenido de esta sección

- **[Configuración](./setup/index.md)** -- Entorno de desarrollo local, requisitos previos y configuración
  - [Requisitos previos](./setup/prerequisites.md) -- Herramientas y software necesarios
  - [Descripción general del proyecto](./setup/project-overview.md) -- Todos los proyectos de un vistazo
  - [Variables de entorno](./setup/environment-variables.md) -- Configuración de los archivos `.env`
- **[API](./api/index.md)** -- Configuración local de la API principal, inicialización de la base de datos y estructura de módulos
- **[Aplicaciones web](./web-apps/index.md)** -- Ejecución de B1Admin, B1App y LessonsApp en local
- **[Aplicaciones móviles](./mobile/index.md)** -- Compilación de B1Checkin y otras aplicaciones de Expo
- **[Bibliotecas compartidas](./shared-libraries/index.md)** -- Uso de Helpers, ApiHelper y AppHelper
- **[Implementación](./deployment/index.md)** -- Implementación de APIs, aplicaciones web y aplicaciones móviles
- **[Proveedor de contenido de FreePlay](./freeplay-content-provider.md)** -- Integración de su biblioteca de lecciones con FreePlay

## Comunidad y recursos

| Recurso | Enlace |
|----------|------|
| Organización en GitHub | [github.com/ChurchApps](https://github.com/ChurchApps) |
| Gestor de incidencias | [Incidencias de ChurchAppsSupport](https://github.com/ChurchApps/ChurchAppsSupport/issues) |
| Comunidad en Slack | [Unirse a Slack](https://join.slack.com/t/livechurchsolutions/shared_invite/zt-i88etpo5-ZZhYsQwQLVclW12DKtVflg) |

:::tip
La forma más rápida de empezar a contribuir es elegir una aplicación web (como B1Admin), conectarla a las **APIs de demostración** compartidas y comenzar a realizar cambios en el frontend. No se requiere configurar una base de datos ni una API.
:::
