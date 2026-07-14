---
title: "ApiHelper"
---

# ApiHelper

<div class="article-intro">

El paquete `@churchapps/apihelper` proporciona utilidades del lado del servidor para todas las APIs de Express.js de ChurchApps. Incluye la clase controladora base, autenticación JWT, utilidades de base de datos, e integraciones de AWS de las que depende cada proyecto de API.

</div>

<div class="prereqs">
<h4>Antes de comenzar</h4>

- Instala **Node.js** y **Git** -- consulta [Requisitos Previos](../setup/prerequisites)
- Familiarízate con la configuración del [espacio de trabajo Packages](./index.md) y el flujo de lanzamiento
- Este paquete depende de [`@churchapps/helpers`](./helpers) (como una dependencia par) y lo re-exporta

</div>

## Qué se Incluye

- **CustomBaseController** -- clase base para controladores de API, construida sobre `inversify-express-utils`
- **Auth** -- autenticación JWT vía `CustomAuthProvider`, `AuthenticatedUser`, y `Principal`
- **Utilidades de base de datos** -- `DB.query` / `DB.queryOne` y la clase `Pool` para gestión de conexión MySQL, más `MySqlHelper` y `DBCreator` para configuración de esquema
- **Integraciones de AWS** -- `AwsHelper` para almacenamiento de archivos S3 y lecturas de SSM Parameter Store
- **Correo** -- `EmailHelper` con soporte para transportes SES y SMTP
- **Carga de configuración** -- `EnvironmentBase` lee cadenas de conexión y secretos de variables de entorno o Parameter Store
- **Varios** -- `EncryptionHelper`, `FileStorageHelper`, `LoggingHelper`, `BasePermissions`, `SlugHelper`

## Configuración para Desarrollo Local

Este paquete vive en el espacio de trabajo [Packages](https://github.com/ChurchApps/Packages) junto con las otras bibliotecas compartidas:

1. Clona el espacio de trabajo:

   ```bash
   git clone https://github.com/ChurchApps/Packages.git
   ```

2. Instala dependencias en la raíz del espacio de trabajo:

   ```bash
   cd Packages && yarn install
   ```

3. Compila (compila TypeScript a `dist/`):

   ```bash
   yarn workspace @churchapps/apihelper build
   ```

   O ejecuta `yarn build` en la raíz para compilar cada paquete en orden de dependencia.

Para probar cambios dentro de una API consumidora, usa un portal Yarn temporal -- consulta [Desarrollo Local Contra una Aplicación Consumidora](./index.md#local-development-against-a-consuming-app).

## Publicación

Los lanzamientos pasan por changesets: ejecuta `yarn changeset` en la raíz del espacio de trabajo con cada cambio, luego `yarn publish-all` cuando estés listo para lanzar. Consulta la [Descripción General de Bibliotecas Compartidas](./index.md#releasing-with-changesets) para el flujo completo.

:::info
Este paquete es una dependencia de cada API de ChurchApps -- la Api principal, AskApi, y LessonsApi. Al hacer cambios, prueba contra una API localmente antes de publicar.
:::

## Artículos Relacionados

- **[Helpers](./helpers)** -- El paquete de utilidades base del cual depende este paquete
- **[Estructura del Módulo](../api/module-structure)** -- Cómo se usan los controladores y el middleware de auth en los módulos de API
- **[Configuración Local de API](../api/local-setup)** -- Configurar la API para desarrollo local
