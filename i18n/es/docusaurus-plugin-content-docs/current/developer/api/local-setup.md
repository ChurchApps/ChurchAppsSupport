---
title: "Configuración Local de API"
---

# Configuración Local de API

<div class="article-intro">

Esta guía le guiará a través de la configuración de la API de ChurchApps para desarrollo local. Clonará el repositorio, configurará las conexiones de base de datos, inicializará el esquema e iniciará el servidor de desarrollo con recarga en caliente.

</div>

<div class="prereqs">
<h4>Antes de Comenzar</h4>

- Instalar **Node.js 22+**, **Git** y **MySQL 8.0+** -- ver [Requisitos Previos](../setup/prerequisites)
- Crear un usuario MySQL con privilegios de creación de base de datos
- Revisar la referencia [Variables de Entorno](../setup/environment-variables) para configuración de API

</div>

## Configuración Paso a Paso

### 1. Clonar el repositorio

```bash
git clone https://github.com/ChurchApps/Api.git
```

### 2. Instalar dependencias

```bash
cd Api
npm install
```

### 3. Configurar variables de entorno

```bash
cp .env.sample .env
```

Abra `.env` y configure sus cadenas de conexión MySQL. Cada módulo necesita su propia conexión de base de datos en el siguiente formato:

```
mysql://root:password@localhost:3306/dbname
```

Necesitará cadenas de conexión para las seis bases de datos de módulos (membresía, asistencia, contenido, donaciones, mensajería, tarea).

### 4. Inicializar las bases de datos

```bash
npm run initdb
```

Esto crea las seis bases de datos y sus tablas automáticamente.

:::tip
Puede inicializar la base de datos de un módulo único con `npm run initdb:membership` (u `attendance`, `content`, `giving`, `messaging`, `doing`).
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
| `npm run build` | Limpiar, compilar TypeScript y copiar activos |
| `npm run test` | Ejecutar pruebas con Jest (incluye cobertura) |
| `npm run test:watch` | Ejecutar pruebas en modo vigilancia |
| `npm run lint` | Ejecutar Prettier y ESLint con auto-corrección |

## Despliegue de Preparación

Para desplegar en el entorno de preparación:

```bash
npm run deploy-staging
```

Esto ejecuta una compilación de producción y luego se despliega a través de Serverless Framework.

:::warning
Asegúrese de que sus credenciales de AWS estén configuradas antes de ejecutar el comando de despliegue.
:::

## Desarrollo de Biblioteca Local

Si necesita desarrollar una biblioteca compartida (`@churchapps/helpers` o `@churchapps/apihelper`) junto con la API, use `npm link`:

```bash
# En el directorio de la biblioteca
cd Helpers
npm run build
npm link

# En el directorio de API
cd ../Api
npm link @churchapps/helpers
```

Esto le permite probar cambios de biblioteca contra la API sin publicar en npm.

## Artículos Relacionados

- **[Base de Datos](./database)** -- Comprensión de la arquitectura de base de datos por módulo
- **[Estructura de Módulo](./module-structure)** -- Cómo se organizan los controladores, repositorios y modelos
- **[Bibliotecas Compartidas](../shared-libraries/)** -- Trabajar con `@churchapps/helpers` y `@churchapps/apihelper`
