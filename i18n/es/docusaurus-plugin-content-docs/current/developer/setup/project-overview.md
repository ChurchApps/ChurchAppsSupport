---
title: "Descripción general del proyecto"
description: "Consulte todos los repositorios de ChurchApps por categoría, con sus frameworks, puertos de desarrollo, bases de datos y la forma en que los paquetes compartidos @churchapps los conectan, en la documentación de configuración para desarrolladores."
---

# Descripción general del proyecto

<div class="article-intro">

ChurchApps está formado por aproximadamente 20 repositorios independientes, cada uno publicado bajo la [organización de GitHub de ChurchApps](https://github.com/ChurchApps). Esta página ofrece un inventario completo de todos los proyectos organizados por categoría, junto con sus frameworks, puertos y relaciones.

</div>

<div class="prereqs">
<h4>Antes de comenzar</h4>

- Instale los [requisitos previos](./prerequisites.md) de la categoría de proyecto en la que desea trabajar

</div>

## APIs de backend

Todas las APIs están construidas con Node.js, Express y TypeScript, y se implementan en AWS Lambda mediante Serverless Framework.

| Proyecto | Propósito | Puerto de desarrollo | Base de datos |
|---------|-----------|----------|----------|
| **[Api](https://github.com/ChurchApps/Api)** | Monolito modular principal que abarca membresía, asistencia, contenido, donaciones, mensajería y tareas | 8084 | Base de datos MySQL independiente por módulo (6 en total) |
| **[LessonsApi](https://github.com/ChurchApps/LessonsApi)** | Backend de Lessons.church | -- | Base de datos MySQL `lessons` única |
| **[AskApi](https://github.com/ChurchApps/AskApi)** | Herramienta de consultas con IA impulsada por OpenAI | -- | -- |

:::info
El proyecto principal **Api** es un monolito modular. Cada módulo (membresía, asistencia, contenido, donaciones, mensajería y tareas) tiene su propia base de datos y es accesible en una subruta como `/membership` o `/giving`. En producción, se exponen como funciones Lambda independientes detrás de API Gateway.
:::

## Aplicaciones web

| Proyecto | Framework | Puerto de desarrollo | Propósito |
|---------|-----------|----------|----------|
| **[B1Admin](https://github.com/ChurchApps/B1Admin)** | React 19 + Vite + MUI 7 | 3101 | Panel de administración de la iglesia |
| **[B1App](https://github.com/ChurchApps/B1App)** | Next.js 16 + React 19 + MUI 7 | 3301 | Aplicación pública para los miembros de la iglesia |
| **[LessonsApp](https://github.com/ChurchApps/LessonsApp)** | Next.js 16 | 3501 | Interfaz de Lessons.church |
| **[B1Transfer](https://github.com/ChurchApps/B1Transfer)** | React + Vite | -- | Utilidad de importación y exportación de datos |
| **[BrochureSites](https://github.com/ChurchApps/BrochureSites)** | Estático | -- | Sitios web de folletos estáticos para iglesias |

## Aplicaciones móviles

Todas las aplicaciones móviles usan React Native con Expo.

| Proyecto | Propósito | Versiones clave |
|---------|-----------|--------------|
| **[B1Checkin](https://github.com/ChurchApps/B1Checkin)** | Aplicación de quiosco para registro de asistencia | Expo |
| **[LessonsScreen](https://github.com/ChurchApps/LessonsScreen)** | Visualización de lecciones para Android TV | Expo |
| **[FreePlay](https://github.com/ChurchApps/FreePlay)** | Reproducción de contenido (incluido el sistema operativo de TV) | Expo |
| **[FreeShowRemote](https://github.com/ChurchApps/FreeShowRemote)** | Control remoto móvil para FreeShow | Expo |

## Escritorio

| Proyecto | Stack | Propósito |
|---------|-------|---------|
| **[FreeShow](https://github.com/ChurchApps/FreeShow)** | Electron 37 + Svelte 3 + Vite | Software de presentaciones y adoración |

## Bibliotecas compartidas

El código compartido se publica en npm bajo el ámbito `@churchapps` y lo consumen como dependencias npm habituales los proyectos anteriores. Todos los paquetes compartidos residen en un único repositorio, [Packages](https://github.com/ChurchApps/Packages), que se gestiona como un workspace de Yarn y se publica con changesets.

| Paquete | Propósito | Utilizado por |
|---------|-----------|---------------|
| `@churchapps/helpers` | Utilidades base e interfaces TypeScript compartidas (DateHelper, ApiHelper, CurrencyHelper, etc.) | Todos los proyectos |
| `@churchapps/apihelper` | Utilidades del servidor Express (autenticación, controladores base, acceso a bases de datos, integraciones con AWS) | Todas las APIs |
| `@churchapps/apphelper` | Biblioteca de componentes React con submódulos para inicio de sesión, donaciones, formularios, markdown y creación de sitios web | Todas las aplicaciones web |
| `@churchapps/content-providers` | Abstracción de proveedores de contenido de terceros (Lessons.church, Planning Center, Dropbox y otros) | Api, B1Admin, B1App, FreePlay |
| `@churchapps/integration-sdk` | Kit de herramientas de integración de B1.church: webhooks, cliente REST, OAuth | Desarrolladores de integraciones externas |
| `@churchapps/texting` | Abstracción de proveedores de SMS | Api |

Consulte [Bibliotecas compartidas](../shared-libraries/index.md) para la configuración del workspace y el flujo de publicación.

## Relaciones entre proyectos

```
Aplicaciones frontend      Bibliotecas compartidas    APIs de backend
--------------             -----------------------    ---------------
B1Admin      ──────┐
B1App        ──────┤       @churchapps/helpers ◄───── Api
LessonsApp   ──────┼──►    @churchapps/apphelper      LessonsApi
FreeShow     ──────┘                                   AskApi
                           @churchapps/apihelper ◄────┘
```

Todas las aplicaciones frontend dependen de `@churchapps/helpers`. Las aplicaciones web además dependen de los paquetes de `@churchapps/apphelper`. Todas las APIs de backend dependen tanto de `@churchapps/helpers` como de `@churchapps/apihelper`.

## Próximos pasos

- **[Variables de entorno](./environment-variables.md)** -- Configure sus archivos `.env` para conectarse a las APIs
- **[Configuración local de la API](../api/local-setup.md)** -- Configure la API de backend localmente
