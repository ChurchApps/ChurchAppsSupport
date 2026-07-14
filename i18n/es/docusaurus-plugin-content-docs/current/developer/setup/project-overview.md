---
title: "Descripción del Proyecto"
---

# Descripción del Proyecto

<div class="article-intro">

ChurchApps consta de aproximadamente 20 repositorios independientes, cada uno publicado bajo la [Organización ChurchApps de GitHub](https://github.com/ChurchApps). Esta página proporciona un inventario completo de todos los proyectos organizados por categoría, junto con sus frameworks, puertos, y relaciones.

</div>

<div class="prereqs">
<h4>Antes de comenzar</h4>

- Instala los [requisitos previos](./prerequisites) para la categoría de proyecto en la que deseas trabajar

</div>

## APIs de Backend

Todas las APIs se construyen con Node.js, Express, y TypeScript, y se implementan en AWS Lambda vía Serverless Framework.

| Proyecto | Propósito | Puerto Dev | Base de Datos |
|---------|---------|----------|----------|
| **[Api](https://github.com/ChurchApps/Api)** | Monolito modular principal que cubre membership, attendance, content, giving, messaging, y doing | 8084 | Base de datos MySQL separada por módulo (6 en total) |
| **[LessonsApi](https://github.com/ChurchApps/LessonsApi)** | Backend de Lessons.church | -- | Base de datos MySQL única `lessons` |
| **[AskApi](https://github.com/ChurchApps/AskApi)** | Herramienta de consulta de IA impulsada por OpenAI | -- | -- |

:::info
El proyecto **Api** principal es un monolito modular. Cada módulo (membership, attendance, content, giving, messaging, doing) tiene su propia base de datos y es accesible en una subruta como `/membership` o `/giving`. En producción, estos se exponen como funciones Lambda separadas detrás de API Gateway.
:::

## Aplicaciones Web

| Proyecto | Framework | Puerto Dev | Propósito |
|---------|-----------|----------|---------|
| **[B1Admin](https://github.com/ChurchApps/B1Admin)** | React 19 + Vite + MUI 7 | 3101 | Panel de administración de la iglesia |
| **[B1App](https://github.com/ChurchApps/B1App)** | Next.js 16 + React 19 + MUI 7 | 3301 | Aplicación de miembro de iglesia orientada al público |
| **[LessonsApp](https://github.com/ChurchApps/LessonsApp)** | Next.js 16 | 3501 | Frontend de Lessons.church |
| **[B1Transfer](https://github.com/ChurchApps/B1Transfer)** | React + Vite | -- | Utilidad de importación/exportación de datos |
| **[BrochureSites](https://github.com/ChurchApps/BrochureSites)** | Estático | -- | Sitios web de folleto de iglesia estáticos |

## Aplicaciones Móviles

Todas las aplicaciones móviles usan React Native con Expo.

| Proyecto | Propósito | Versiones Clave |
|---------|---------|--------------|
| **[B1Mobile](https://github.com/ChurchApps/B1Mobile)** | Aplicación de miembro de iglesia para iOS y Android | Expo 54, React Native 0.81 |
| **[B1Checkin](https://github.com/ChurchApps/B1Checkin)** | Aplicación de quiosco de check-in | Expo |
| **[LessonsScreen](https://github.com/ChurchApps/LessonsScreen)** | Visualización de lecciones para Android TV | Expo |
| **[FreePlay](https://github.com/ChurchApps/FreePlay)** | Reproducción de contenido (incluyendo TV OS) | Expo |
| **[FreeShowRemote](https://github.com/ChurchApps/FreeShowRemote)** | Control remoto móvil para FreeShow | Expo |

## Escritorio

| Proyecto | Stack | Propósito |
|---------|-------|---------|
| **[FreeShow](https://github.com/ChurchApps/FreeShow)** | Electron 37 + Svelte 3 + Vite | Software de presentación y adoración |

## Bibliotecas Compartidas

El código compartido se publica en npm bajo el alcance `@churchapps` y se consume como dependencias npm regulares por los proyectos anteriores. Todos los paquetes compartidos viven en un único repositorio -- [Packages](https://github.com/ChurchApps/Packages) -- gestionado como un espacio de trabajo Yarn y lanzado con changesets.

| Paquete | Propósito | Usado Por |
|---------|---------|---------|
| `@churchapps/helpers` | Utilidades base e interfaces TypeScript compartidas (DateHelper, ApiHelper, CurrencyHelper, etc.) | Todos los proyectos |
| `@churchapps/apihelper` | Utilidades de servidor Express (auth, controladores base, acceso a base de datos, integraciones AWS) | Todas las APIs |
| `@churchapps/apphelper` | Biblioteca de componentes React con módulos de subruta para login, donaciones, formularios, markdown, y construcción de sitios web | Todas las aplicaciones web |
| `@churchapps/content-providers` | Abstracción de proveedor de contenido de terceros (Lessons.church, Planning Center, Dropbox, y otros) | Api, B1Admin, B1App, FreePlay |
| `@churchapps/integration-sdk` | Kit de herramientas de integración de B1.church: webhooks, cliente REST, OAuth | Desarrolladores de integración externos |
| `@churchapps/texting` | Abstracción de proveedor SMS | Api |

Consulta [Bibliotecas Compartidas](../shared-libraries/) para la configuración del espacio de trabajo y el flujo de trabajo de lanzamiento.

## Relaciones de Proyecto

```
Aplicaciones Frontend       Bibliotecas Compartidas    APIs de Backend
--------------             ----------------           ------------
B1Admin      ──────┐
B1App        ──────┤       @churchapps/helpers ◄───── Api
LessonsApp   ──────┼──►    @churchapps/apphelper      LessonsApi
B1Mobile     ──────┤                                   AskApi
FreeShow     ──────┘       @churchapps/apihelper ◄────┘
```

Todas las aplicaciones frontend dependen de `@churchapps/helpers`. Las aplicaciones web adicionalmente dependen de paquetes `@churchapps/apphelper`. Todas las APIs de backend dependen tanto de `@churchapps/helpers` como de `@churchapps/apihelper`.

## Próximos Pasos

- **[Variables de Entorno](./environment-variables)** -- Configura tus archivos `.env` para conectarte a las APIs
- **[Configuración Local de API](../api/local-setup)** -- Configura la API de backend localmente
