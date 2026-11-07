---
title: "Configuración local de la API"
description: "Configure la API de ChurchApps localmente: clone el repositorio, configure seis bases de datos MySQL por módulo, inicialice el esquema e inicie el servidor de desarrollo con recarga en caliente."
---

# Configuración local de la API

<div class="article-intro">

Esta guía le explica cómo preparar la API de ChurchApps para desarrollo local. Clonará el repositorio, configurará las conexiones a la base de datos, inicializará el esquema e iniciará el servidor de desarrollo con recarga en caliente.

</div>

<div class="prereqs">
<h4>Antes de comenzar</h4>

- Instale **Node.js 24+**, **Git** y **MySQL 8.0+**; consulte [Requisitos previos](../setup/prerequisites.md)
- Cree un usuario de MySQL con privilegios para crear bases de datos
- Revise la referencia de [Variables de entorno](../setup/environment-variables.md) para la configuración de la API

</div>

## Configuración paso a paso

### 1. Clonar el repositorio

```bash
git clone https://github.com/ChurchApps/Api.git
```

### 2. Instalar las dependencias

El proyecto usa Yarn (un guardia bloquea `npm install`):

```bash
cd Api
yarn install
```

### 3. Configurar las variables de entorno

```bash
cp .env.sample .env
```

Abra `.env` y configure las cadenas de conexión de MySQL. Cada módulo necesita su propia conexión a la base de datos, con el siguiente formato:

```
mysql://root:password@localhost:3306/dbname
```

Necesitará cadenas de conexión para las seis bases de datos de los módulos (membership, attendance, content, giving, messaging, doing).

### 4. Inicializar las bases de datos

```bash
npm run initdb
```

Esto crea automáticamente las seis bases de datos y sus tablas.

:::tip
Puede inicializar la base de datos de un solo módulo con `npm run initdb -- --module=membership` (o `attendance`, `content`, `giving`, `messaging`, `doing`).
:::

### 5. Iniciar el servidor de desarrollo

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
| `npm run test:watch` | Ejecuta las pruebas en modo de vigilancia |
| `npm run lint` | Ejecuta ESLint con corrección automática (ESLint es el único formateador) |

## Despliegue

El entorno de staging ya fue retirado. La API se despliega al entorno de demostración en cada envío a `main`, y a producción mediante el flujo de trabajo manual **Deploy Prod**, que también aplica las migraciones de base de datos pendientes. Consulte [Despliegue de la API](../deployment/apis.md) para más detalles.

## Desarrollo local de bibliotecas

Si necesita desarrollar una biblioteca compartida (`@churchapps/helpers` o `@churchapps/apihelper`) junto con la API, compílela en el espacio de trabajo [Packages](https://github.com/ChurchApps/Packages) y agregue un portal de Yarn temporal en la API:

```bash
# En el espacio de trabajo Packages
yarn build

# En el directorio de la API
yarn link ../Packages/helpers
# ... pruebe ...
yarn unlink ../Packages/helpers && yarn install
```

Esto le permite probar cambios de la biblioteca contra la API sin publicarlos en npm. Consulte [Bibliotecas compartidas](../shared-libraries/index.md#local-development-against-a-consuming-app) para más detalles, y nunca confirme la resolución de portal que el enlace escribe en `package.json`.

## Artículos relacionados

- **[Base de datos](./database.md)**: cómo funciona la arquitectura de una base de datos por módulo
- **[Estructura de módulos](./module-structure.md)**: cómo se organizan los controladores, repositorios y modelos
- **[Bibliotecas compartidas](../shared-libraries/index.md)**: cómo trabajar con `@churchapps/helpers` y `@churchapps/apihelper`
