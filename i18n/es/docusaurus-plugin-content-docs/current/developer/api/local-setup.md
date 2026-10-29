---
title: "Configuración local de la API"
---

# Configuración local de la API

<div class="article-intro">

Esta guía le explica cómo configurar la API de ChurchApps para desarrollo local. Clonará el repositorio, configurará las conexiones a la base de datos, inicializará el esquema e iniciará el servidor de desarrollo con recarga en caliente.

</div>

<div class="prereqs">
<h4>Antes de comenzar</h4>

- Instale **Node.js 24+**, **Git** y **MySQL 8.0+** -- consulte [Requisitos previos](../setup/prerequisites)
- Cree un usuario de MySQL con privilegios para crear bases de datos
- Revise la referencia de [Variables de entorno](../setup/environment-variables) para la configuración de la API

</div>

## Configuración paso a paso

### 1. Clonar el repositorio

```bash
git clone https://github.com/ChurchApps/Api.git
```

### 2. Instalar las dependencias

El proyecto usa Yarn (un guardián bloquea `npm install`):

```bash
cd Api
yarn install
```

### 3. Configurar las variables de entorno

```bash
cp .env.sample .env
```

Abra `.env` y configure sus cadenas de conexión de MySQL. Cada módulo necesita su propia conexión a la base de datos con el siguiente formato:

```
mysql://root:password@localhost:3306/dbname
```

Necesitará cadenas de conexión para las seis bases de datos de los módulos (membership, attendance, content, giving, messaging, doing).

### 4. Inicializar las bases de datos

```bash
npm run initdb
```

Esto crea las seis bases de datos y sus tablas automáticamente.

:::tip
Puede inicializar la base de datos de un solo módulo con `npm run initdb -- --module=membership` (o `attendance`, `content`, `giving`, `messaging`, `doing`).
:::

### 5. Iniciar el servidor de desarrollo

```bash
npm run dev
```

La API se inicia con recarga en caliente en [http://localhost:8084](http://localhost:8084).

## Comandos clave

| Comando | Descripción |
|---------|-------------|
| `npm run dev` | Iniciar el servidor de desarrollo con recarga en caliente (tsx watch) |
| `npm run build` | Limpiar, compilar TypeScript y copiar los recursos |
| `npm run test` | Ejecutar las pruebas con Jest (incluye cobertura) |
| `npm run test:watch` | Ejecutar las pruebas en modo de vigilancia |
| `npm run lint` | Ejecutar ESLint con corrección automática (ESLint es el único formateador) |

## Despliegue

El entorno de staging se ha retirado. La API se despliega en el entorno de demostración con cada push a `main` y en producción mediante el flujo de trabajo manual **Deploy Prod**, que también aplica las migraciones de base de datos pendientes. Consulte [Despliegue de la API](../deployment/apis) para más detalles.

## Desarrollo de bibliotecas locales

Si necesita desarrollar una biblioteca compartida (`@churchapps/helpers` o `@churchapps/apihelper`) junto con la API, compílela en el espacio de trabajo [Packages](https://github.com/ChurchApps/Packages) y agregue un portal temporal de Yarn en la API:

```bash
# In the Packages workspace
yarn build

# In the API directory
yarn link ../Packages/helpers
# ... test ...
yarn unlink ../Packages/helpers && yarn install
```

Esto le permite probar los cambios de la biblioteca contra la API sin publicarlos en npm. Consulte [Bibliotecas compartidas](../shared-libraries/#local-development-against-a-consuming-app) para más detalles, y nunca confirme la resolución del portal que escribe el enlace en `package.json`.

## Artículos relacionados

- **[Base de datos](./database)** -- Cómo funciona la arquitectura de una base de datos por módulo
- **[Estructura del módulo](./module-structure)** -- Cómo se organizan los controladores, repositorios y modelos
- **[Bibliotecas compartidas](../shared-libraries/)** -- Trabajo con `@churchapps/helpers` y `@churchapps/apihelper`
