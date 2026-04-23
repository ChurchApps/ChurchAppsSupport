---
title: "Documentación del Desarrollador"
---

# Documentación del Desarrollador

<div class="article-intro">

ChurchApps es una colección de aproximadamente 20 proyectos de código abierto que juntos proporcionan una plataforma completa de gestión de iglesias. Los proyectos abarcan APIs backend, aplicaciones web, aplicaciones móviles, una aplicación de escritorio y bibliotecas compartidas -- todas escritas en TypeScript. Esta sección le proporciona todo lo que necesita para configurar un entorno de desarrollo local y comenzar a contribuir.

</div>

## Arquitectura de Un Vistazo

Los proyectos son **repositorios independientes** (no un monorepo). El código compartido se publica en npm bajo el alcance `@churchapps/*` y se consume como dependencias regulares. Esto significa que puede trabajar en un único proyecto sin clonar todo el ecosistema.

Características clave:

- **Idioma:** TypeScript en todos lados
- **Backend:** APIs Node.js / Express desplegadas en AWS Lambda a través de Serverless Framework
- **Web:** React 19 (Vite y Next.js), Material-UI 7
- **Móvil:** React Native con Expo
- **Base de Datos:** MySQL 8.0, una base de datos por módulo de API

## Lo Que Cubre Esta Sección

- **[Configuración](setup/)** -- Entorno de desarrollo local, requisitos previos y configuración
  - [Requisitos Previos](setup/prerequisites) -- Herramientas y software requeridos
  - [Descripción General del Proyecto](setup/project-overview) -- Todos los proyectos de un vistazo
  - [Variables de Entorno](setup/environment-variables) -- Configuración de archivos `.env`
- **[API](api/)** -- Configuración local de API, inicialización de base de datos y estructura de módulo
- **[Aplicaciones Web](web-apps/)** -- Ejecutar B1Admin, B1App y LessonsApp localmente
- **[Aplicaciones Móviles](mobile/)** -- Compilación de B1Mobile y otras aplicaciones Expo
- **[Bibliotecas Compartidas](shared-libraries/)** -- Trabajar con Helpers, ApiHelper y AppHelper
- **[Despliegue](deployment/)** -- Despliegue de APIs, aplicaciones web y aplicaciones móviles

## Comunidad y Recursos

| Recurso | Enlace |
|----------|-------|
| Organización GitHub | [github.com/ChurchApps](https://github.com/ChurchApps) |
| Rastreador de Problemas | [Problemas de ChurchAppsSupport](https://github.com/ChurchApps/ChurchAppsSupport/issues) |
| Comunidad Slack | [Unirse a Slack](https://join.slack.com/t/livechurchsolutions/shared_invite/zt-i88etpo5-ZZhYsQwQLVclW12DKtVflg) |

:::tip
La forma más rápida de comenzar a contribuir es elegir una aplicación web (como B1Admin), apuntarla a las **APIs de preparación** y comenzar a hacer cambios frontend. No se requiere configuración de base de datos o API.
:::
