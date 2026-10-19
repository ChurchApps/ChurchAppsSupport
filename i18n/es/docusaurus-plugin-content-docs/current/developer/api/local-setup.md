---
title: "Configuración local de la API"
---

# Configuración local de la API

<div class="article-intro">

Esta guía te explica cómo configurar la API de ChurchApps para desarrollo local. Clonarás el repositorio, configurarás las conexiones a la base de datos, inicializarás el esquema e iniciarás el servidor de desarrollo con recarga en caliente.

</div>

<div class="prereqs">
<h4>Antes de comenzar</h4>

- Instala **Node.js 22+**, **Git** y **MySQL 8.0+**; consulta [Requisitos previos](../setup/prerequisites)
- Crea un usuario de MySQL con privilegios para crear bases de datos
- Revisa la referencia de [Variables de entorno](../setup/environment-variables) para la configuración de la API

</div>

## Configuración paso a paso

### 1. Clona el repositorio

```bash
git clone https://github.com/ChurchApps/Api.git
```

### 2. Instala las dependencias

El proyecto usa Yarn (un guardia bloquea `npm install`):

```bash
cd Api
yarn install
```

### 3. Configura las variables de entorno

```bash
cp .env.sample .env
```

Abre `.env` y configura tus cadenas de conexión a MySQL. Cada módulo necesita su propia conexión a la base de datos con el siguiente formato:

```
mysql://root:password@localhost:3306/dbname
```

Necesitarás cadenas de conexión para las seis bases de datos de los módulos (membership, attendance, content, giving, messaging, doing).

### 4. Inicializa las bases de datos

```bash
npm run initdb
```

Esto crea automáticamente las seis bases de datos y sus tablas.

:::tip
Puedes inicializar la base de datos de un solo módulo con `npm run initdb -- --module=membership` (o `attendance`, `content`, `giving`, `messaging`, `doing`).
:::

### 5. Inicia el servidor de desarrollo

```bash
npm run dev
```

La API se inicia con recarga en caliente en [http://localhost:8084](http://localhost:8084).

## Comandos principales

| Comando | Descripción |
|---------|-------------|
| `npm run dev` | Inicia el servidor de desarrollo con recarga en caliente (tsx watch) |
| `npm run build` | Limpia, compila TypeScript y copia los recursos |
| `npm run test` | Ejecuta las pruebas con Jest (incluye cobertura) |
| `npm run test:watch` | Ejecuta las pruebas en modo de observación |
| `npm run lint` | Ejecuta ESLint con corrección automática (ESLint es el único formateador) |

## Despliegue

El entorno de staging ya no está disponible. La API se despliega en el entorno de demostración con cada push a `main` y en producción mediante el flujo de trabajo manual **Deploy Prod**, que además aplica las migraciones de base de datos pendientes. Consulta [Despliegue de la API](../deployment/apis) para más detalles.

## Desarrollo local de bibliotecas

Si necesitas desarrollar una biblioteca compartida (`@churchapps/helpers` o `@churchapps/apihelper`) junto con la API, compílala en el espacio de trabajo [Packages](https://github.com/ChurchApps/Packages) y añade un portal temporal de Yarn en la API:

```bash
# In the Packages workspace
yarn build

# In the API directory
yarn link ../Packages/helpers
# ... test ...
yarn unlink ../Packages/helpers && yarn install
```

Así puedes probar los cambios en la biblioteca con la API sin publicarlos en npm. Consulta [Bibliotecas compartidas](../shared-libraries/#local-development-against-a-consuming-app) para más detalles, y nunca incluyas en un commit la resolución del portal que escribe el enlace en `package.json`.

## Artículos relacionados

- **[Base de datos](./database)**: cómo funciona la arquitectura de una base de datos por módulo
- **[Estructura de módulos](./module-structure)**: cómo se organizan los controladores, repositorios y modelos
- **[Bibliotecas compartidas](../shared-libraries/)**: cómo trabajar con `@churchapps/helpers` y `@churchapps/apihelper`
