---
title: "Configuración Local de API"
---

# Configuración Local de API

<div class="article-intro">

Esta guía te acompaña en la configuración de la API de ChurchApps para el desarrollo local. Clonarás el repositorio, configurarás tus conexiones de base de datos, inicializarás el esquema, e iniciarás el servidor de desarrollo con recarga en caliente.

</div>

<div class="prereqs">
<h4>Antes de comenzar</h4>

- Instala **Node.js 22+**, **Git**, y **MySQL 8.0+** -- consulta [Requisitos Previos](../setup/prerequisites)
- Crea un usuario de MySQL con privilegios de creación de bases de datos
- Revisa la referencia de [Variables de Entorno](../setup/environment-variables) para la configuración de la API

</div>

## Configuración Paso a Paso

### 1. Clonar el repositorio

```bash
git clone https://github.com/ChurchApps/Api.git
```

### 2. Instalar dependencias

El proyecto usa Yarn (una protección bloquea `npm install`):

```bash
cd Api
yarn install
```

### 3. Configurar variables de entorno

```bash
cp .env.sample .env
```

Abre `.env` y configura tus cadenas de conexión MySQL. Cada módulo necesita su propia conexión de base de datos en el siguiente formato:

```
mysql://root:password@localhost:3306/dbname
```

Necesitarás cadenas de conexión para las seis bases de datos de módulo (membership, attendance, content, giving, messaging, doing).

### 4. Inicializar las bases de datos

```bash
npm run initdb
```

Esto crea las seis bases de datos y sus tablas automáticamente.

:::tip
Puedes inicializar la base de datos de un solo módulo con `npm run initdb -- --module=membership` (o `attendance`, `content`, `giving`, `messaging`, `doing`).
:::

### 5. Iniciar el servidor de desarrollo

```bash
npm run dev
```

La API se inicia con recarga en caliente en [http://localhost:8084](http://localhost:8084).

## Comandos Clave

| Comando | Descripción |
|---------|-------------|
| `npm run dev` | Iniciar servidor de desarrollo con recarga en caliente (tsx watch) |
| `npm run build` | Limpiar, compilar TypeScript, y copiar recursos |
| `npm run test` | Ejecutar pruebas con Jest (incluye cobertura) |
| `npm run test:watch` | Ejecutar pruebas en modo watch |
| `npm run lint` | Ejecutar ESLint con auto-corrección (ESLint es el único formateador) |

## Implementación en Staging

Para implementar en el entorno de staging:

```bash
npm run deploy-staging
```

Esto ejecuta una compilación de producción y luego implementa vía Serverless Framework.

:::warning
Asegúrate de que tus credenciales de AWS estén configuradas antes de ejecutar el comando de implementación.
:::

## Desarrollo Local de Bibliotecas

Si necesitas desarrollar una biblioteca compartida (`@churchapps/helpers` o `@churchapps/apihelper`) junto con la API, constrúyela en el espacio de trabajo de [Packages](https://github.com/ChurchApps/Packages) y agrega un portal Yarn temporal en la API:

```bash
# En el espacio de trabajo Packages
yarn build

# En el directorio API
yarn link ../Packages/helpers
# ... probar ...
yarn unlink ../Packages/helpers && yarn install
```

Esto te permite probar cambios de biblioteca contra la API sin publicar en npm. Consulta [Bibliotecas Compartidas](../shared-libraries/#local-development-against-a-consuming-app) para más detalles -- y nunca confirmes la resolución de portal que el link escribe en `package.json`.

## Artículos Relacionados

- **[Base de Datos](./database)** -- Comprender la arquitectura de base de datos por módulo
- **[Estructura del Módulo](./module-structure)** -- Cómo se organizan los controladores, repositorios, y modelos
- **[Bibliotecas Compartidas](../shared-libraries/)** -- Trabajar con `@churchapps/helpers` y `@churchapps/apihelper`
