---
title: "AppHelper"
---

# AppHelper

<div class="article-intro">

Los paquetes `@churchapps/apphelper*` proporcionan componentes React compartidos y utilidades para todas las aplicaciones web de ChurchApps. AppHelper se estructura como un espacio de trabajo monorepo que contiene seis paquetes que cubren componentes principales, autenticación, donaciones, formularios, markdown y funcionalidad de sitio web/CMS.

</div>

<div class="prereqs">
<h4>Antes de Comenzar</h4>

- Instalar **Node.js** y **Git** -- ver [Requisitos Previos](../setup/prerequisites)
- Familiarizarse con el flujo de trabajo [npm link](./index.md) para desarrollo local

</div>

## Paquetes

| Paquete | Descripción |
|---------|-------------|
| `@churchapps/apphelper` | Componentes principales y utilidades |
| `@churchapps/apphelper-login` | Interfaz de usuario de inicio de sesión y registro |
| `@churchapps/apphelper-donations` | Componentes de donación y donación |
| `@churchapps/apphelper-forms` | Componentes del creador de formularios |
| `@churchapps/apphelper-markdown` | Editor y renderizador de Markdown |
| `@churchapps/apphelper-website` | Componentes de sitio web y CMS |

## Configuración para Desarrollo Local

1. Clonar el repositorio:

   ```bash
   git clone https://github.com/ChurchApps/AppHelper.git
   ```

2. Instalar dependencias:

   ```bash
   cd AppHelper && npm install
   ```

3. Compilar todos los paquetes e iniciar el campo de juegos de Vite:

   ```bash
   npm run playground:reload
   ```

   Esto compila cada paquete en el espacio de trabajo, luego inicia el servidor de desarrollo del campo de juegos en **http://localhost:3001**.

:::tip
El campo de juegos es la forma más rápida de desarrollar y probar componentes de AppHelper. Recarga en caliente del servidor de desarrollo de Vite para que pueda ver cambios en tiempo real.
:::

## Publicación

Publicar un paquete único:

```bash
npm run publish:apphelper
```

Publicar todos los paquetes:

```bash
npm run publish:all
```

:::warning
Al publicar, asegúrese de actualizar el número de versión en el archivo `package.json` relevante antes de ejecutar el comando de publicación. Todos los paquetes que dependen de un paquete cambiado también deben actualizarse.
:::

## Artículos Relacionados

- **[Helpers](./helpers)** -- El paquete de utilidades base utilizado junto con AppHelper
- **[Aplicaciones Web](../web-apps/)** -- Las aplicaciones web que consumen estos paquetes
- **[Descripción General de Bibliotecas Compartidas](./index.md)** -- Flujo de trabajo `npm link` y descripción general del paquete
