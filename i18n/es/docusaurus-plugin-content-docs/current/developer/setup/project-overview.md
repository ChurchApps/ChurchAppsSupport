---
title: "Descripción General del Proyecto"
---

# Descripción General del Proyecto

<div class="article-intro">

ChurchApps consta de aproximadamente 20 repositorios independientes, cada uno publicado bajo la [organización GitHub de ChurchApps](https://github.com/ChurchApps). Esta página proporciona un inventario completo de todos los proyectos organizados por categoría, junto con sus marcos, puertos y relaciones.

</div>

<div class="prereqs">
<h4>Antes de Comenzar</h4>

- Instalar los [requisitos previos](./prerequisites) para la categoría de proyecto en la que desea trabajar

</div>

## APIs Backend

Todas las APIs se construyen con Node.js, Express y TypeScript, y se despliegan en AWS Lambda a través de Serverless Framework.

| Proyecto | Propósito | Puerto de Desarrollo | Base de Datos |
|---------|---------|----------|----------|
| **[Api](https://github.com/ChurchApps/Api)** | Monolito modular principal cubriendo membresía, asistencia, contenido, donaciones, mensajería y tareas | 8084 | Base de datos MySQL separada por módulo (6 total) |
| **[LessonsApi](https://github.com/ChurchApps/LessonsApi)** | Backend de Lessons.church | -- | Base de datos MySQL única `lessons` |
| **[AskApi](https://github.com/ChurchApps/AskApi)** | Herramienta de consulta de IA impulsada por OpenAI | -- | -- |

:::info
El proyecto **Api** principal es un monolito modular. Cada módulo (membresía, asistencia, contenido, donaciones, mensajería, tareas) tiene su propia base de datos y es accesible en una subruta como `/membership` o `/giving`. En producción, estos se exponen como funciones Lambda separadas detrás de API Gateway.
:::

## Aplicaciones Web

| Proyecto | Marco | Puerto de Desarrollo | Propósito |
|---------|-----------|----------|---------|
| **[B1Admin](https://github.com/ChurchApps/B1Admin)** | React 19 + Vite + MUI 7 | 5173 | Panel de administración de iglesia |
| **[B1App](https://github.com/ChurchApps/B1App)** | Next.js 16 + React 19 + MUI 7 | 3301 | Aplicación de miembro de iglesia de cara al público |
| **[LessonsApp](https://github.com/ChurchApps/LessonsApp)** | Next.js 16 | 3501 | Frontend de Lessons.church |
| **[B1Transfer](https://github.com/ChurchApps/B1Transfer)** | React + Vite | -- | Utilidad de importación/exportación de datos |
| **[BrochureSites](https://github.com/ChurchApps/BrochureSites)** | Estático | -- | Sitios web de folleto de iglesia estáticos |

## Aplicaciones Móviles

Todas las aplicaciones móviles utilizan React Native con Expo.

| Proyecto | Propósito | Versiones Clave |
|---------|---------|--------------|
| **[B1Mobile](https://github.com/ChurchApps/B1Mobile)** | Aplicación de miembro de iglesia para iOS y Android | Expo 54, React Native 0.81 |
| **[B1Checkin](https://github.com/ChurchApps/B1Checkin)** | Aplicación de quiosco de registro | Expo |
| **[LessonsScreen](https://github.com/ChurchApps/LessonsScreen)** | Aplicación Android TV para mostración de lecciones | Expo |
| **[FreePlay](https://github.com/ChurchApps/FreePlay)** | Reproducción de contenido (incluido TV OS) | Expo |
| **[FreeShowRemote](https://github.com/ChurchApps/FreeShowRemote)** | Control remoto móvil para FreeShow | Expo |

## Escritorio

| Proyecto | Pila | Propósito |
|---------|-------|---------|
| **[FreeShow](https://github.com/ChurchApps/FreeShow)** | Electron 37 + Svelte 3 + Vite | Software de presentación y adoración |

## Bibliotecas Compartidas

El código compartido se publica en npm bajo el alcance `@churchapps`. Estos se consumen como dependencias npm regulares por los proyectos anteriores.

| Paquete | Nombre en npm | Propósito | Utilizado Por |
|---------|----------|---------|---------|
| **[Helpers](https://github.com/ChurchApps/Helpers)** | `@churchapps/helpers` | Utilidades base (DateHelper, ApiHelper, CurrencyHelper, etc.) | Todos los proyectos |
| **[ApiHelper](https://github.com/ChurchApps/ApiHelper)** | `@churchapps/apihelper` | Utilidades del servidor Express (middleware de autenticación, ayudantes de BD, integración de AWS) | Todas las APIs |
| **[AppHelper](https://github.com/ChurchApps/AppHelper)** | Espacio de trabajo con 6 paquetes | Biblioteca de componentes React | Todas las aplicaciones web |
| **[ContentProviderHelper](https://github.com/ChurchApps/ContentProviderHelper)** | `@churchapps/content-provider-helper` | Proveedores de contenido de YouTube, Vimeo y local | FreeShow, FreePlay, Api |

### Sub-paquetes de AppHelper

El proyecto AppHelper es un espacio de trabajo monorepo que publica seis paquetes:

| Paquete | Nombre en npm |
|---------|----------|
| Core | `@churchapps/apphelper` |
| Login | `@churchapps/apphelper-login` |
| Donations | `@churchapps/apphelper-donations` |
| Forms | `@churchapps/apphelper-forms` |
| Markdown | `@churchapps/apphelper-markdown` |
| Website | `@churchapps/apphelper-website` |

## Relaciones del Proyecto

```
Aplicaciones Frontend              Bibliotecas Compartidas           APIs Backend
--------------             ----------------           -----------
B1Admin      ──────┐
B1App        ──────┤       @churchapps/helpers ◄───── Api
LessonsApp   ──────┼──►    @churchapps/apphelper      LessonsApi
B1Mobile     ──────┤                                   AskApi
FreeShow     ──────┘       @churchapps/apihelper ◄────┘
```

Todas las aplicaciones frontend dependen de `@churchapps/helpers`. Las aplicaciones web dependen además de paquetes `@churchapps/apphelper`. Todas las APIs backend dependen tanto de `@churchapps/helpers` como de `@churchapps/apihelper`.

## Próximos Pasos

- **[Variables de Entorno](./environment-variables)** -- Configurar sus archivos `.env` para conectarse a APIs
- **[Configuración Local de API](../api/local-setup)** -- Configuración de la API backend localmente
