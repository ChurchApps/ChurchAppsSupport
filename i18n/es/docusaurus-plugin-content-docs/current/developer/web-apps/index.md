---
title: "Aplicaciones Web"
---

# Aplicaciones Web

<div class="article-intro">

ChurchApps incluye tres aplicaciones web, cada una sirviendo a una audiencia diferente y con un propósito diferente. Comparten una base tecnológica común de React 19, TypeScript y Material-UI 7, pero difieren en sus herramientas de compilación y objetivos de despliegue.

</div>

## Aplicaciones de Un Vistazo

| Aplicación | Propósito | Marco | Puerto de Desarrollo |
|-----|---------|-----------|----------|
| [**B1Admin**](./b1-admin.md) | Panel de administración de iglesia | React 19 + Vite + MUI 7 | 5173 |
| [**B1App**](./b1-app.md) | Aplicación de miembro de iglesia de cara al público | Next.js 16 + React 19 + MUI 7 | 3301 |
| [**LessonsApp**](./lessons-app.md) | Gestión de contenido de lecciones | Next.js 16 + React 19 | 3501 |

## Pila Tecnológica Compartida

Las tres aplicaciones web se construyen con:

- **TypeScript** -- Seguridad de tipos de extremo a extremo
- **React 19** -- Biblioteca de componentes de interfaz de usuario
- **Material-UI 7** -- Sistema de diseño y kit de herramientas de componentes
- **React Query 5** -- Gestión del estado del servidor

## Componentes Compartidos

Las aplicaciones comparten componentes de interfaz de usuario y utilidades a través de la familia de paquetes `@churchapps/apphelper*`:

| Paquete | Propósito |
|---------|---------|
| `@churchapps/apphelper` | Componentes React compartidos principales |
| `@churchapps/apphelper-login` | Componentes de interfaz de usuario de autenticación |
| `@churchapps/apphelper-donations` | Formularios de donación y donación |
| `@churchapps/apphelper-forms` | Componentes del creador de formularios |
| `@churchapps/apphelper-markdown` | Renderización de Markdown |
| `@churchapps/apphelper-website` | Componentes de sitio web/CMS |

:::tip
Para detalles sobre desarrollo de estos paquetes compartidos localmente, ver la documentación de [AppHelper](../shared-libraries/app-helper).
:::

## Script de Postinstall

Cada aplicación web tiene un script `postinstall` que copia archivos de configuración regional y activos CSS de `@churchapps/apphelper` en el proyecto. Esto se ejecuta automáticamente después de `npm install`.

:::info
Si los componentes se ven sin estilos después de instalar dependencias, el script `postinstall` puede no haberse ejecutado correctamente. Puede activarlo manualmente con `npm run postinstall`.
:::

## Herramientas de Compilación

Las aplicaciones utilizan dos herramientas de compilación diferentes:

- **B1Admin** utiliza **Vite** -- un empaquetador moderno y rápido ideal para aplicaciones de una sola página
- **B1App** y **LessonsApp** utilizan **Next.js** -- proporcionando representación del lado del servidor, enrutamiento basado en archivos y compilaciones de producción optimizadas
