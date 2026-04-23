---
title: "ApiHelper"
---

# ApiHelper

<div class="article-intro">

El paquete `@churchapps/apihelper` proporciona utilidades del lado del servidor para todas las APIs de Express.js de ChurchApps. Incluye la clase controlador base, middleware de autenticación JWT, utilidades de base de datos e integraciones de AWS que cada proyecto de API depende.

</div>

<div class="prereqs">
<h4>Antes de Comenzar</h4>

- Instalar **Node.js** y **Git** -- ver [Requisitos Previos](../setup/prerequisites)
- Familiarizarse con el flujo de trabajo [npm link](./index.md) para desarrollo local
- Este paquete depende de [`@churchapps/helpers`](./helpers)

</div>

## Lo Que Está Incluido

- **CustomBaseController** -- clase base para controladores de API
- **Middleware de autenticación** -- autenticación JWT a través de `CustomAuthProvider`
- **Utilidades de base de datos** -- `DB.query`, `EnhancedPoolHelper` para gestión de conexiones MySQL
- **Integraciones de AWS** -- ayudantes para S3, AWS SSM Parameter Store y otros servicios de AWS
- **Configuración de inyección de dependencias Inversify** -- configuración del contenedor de inyección de dependencias

## Configuración para Desarrollo Local

1. Clonar el repositorio:

   ```bash
   git clone https://github.com/ChurchApps/ApiHelper.git
   ```

2. Instalar dependencias:

   ```bash
   cd ApiHelper && npm install
   ```

3. Compilar el paquete (compila TypeScript a `dist/`):

   ```bash
   npm run build
   ```

4. Ponerlo disponible para vinculación local:

   ```bash
   npm link
   ```

## Comandos Clave

| Comando | Descripción |
|---------|-------------|
| `npm run build` | Compilar TypeScript a `dist/` |
| `npm run lint` | Ejecutar ESLint |
| `npm run lint:fix` | Ejecutar ESLint con auto-corrección |
| `npm run format` | Formatear código con Prettier |

:::info
Este paquete es una dependencia de cada API de ChurchApps. Cuando hace cambios, use `npm link` para probar contra una API localmente antes de publicar.
:::

## Artículos Relacionados

- **[Helpers](./helpers)** -- El paquete de utilidades base del que depende este paquete
- **[Estructura de Módulo](../api/module-structure)** -- Cómo se utilizan los controladores y middleware de autenticación en módulos de API
- **[Configuración Local de API](../api/local-setup)** -- Configuración de la API para desarrollo local
