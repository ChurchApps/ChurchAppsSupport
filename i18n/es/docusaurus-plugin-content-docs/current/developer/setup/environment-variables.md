---
title: "Variables de entorno"
description: "Configura archivos .env para los proyectos de ChurchApps, elige la API de demostración compartida o una API local, y completa las variables para B1 Admin, B1.church, B1 Checkin y más."
---

# Variables de entorno

<div class="article-intro">

Cada proyecto de ChurchApps utiliza un archivo `.env` para la configuración local. Cada proyecto incluye un archivo de ejemplo que debes copiar y personalizar. Esta página explica las variables de entorno para las APIs, las aplicaciones web y las aplicaciones móviles, incluyendo cómo elegir entre los destinos de API de demostración y local.

</div>

<div class="prereqs">
<h4>Antes de comenzar</h4>

- Instala los [requisitos previos](./prerequisites.md) para tu proyecto
- Clona el repositorio del proyecto en el que quieres trabajar
- Revisa la [Descripción general del proyecto](./project-overview.md) para entender qué módulos de API necesita tu proyecto

</div>

## Patrón general

1. Busca `dotenv.sample.txt` o `.env.sample` en la raíz del proyecto.
2. Cópialo como `.env`.
3. Edita los valores según sea necesario.

```bash
# Ejemplo para un proyecto con .env.sample
cp .env.sample .env

# Ejemplo para un proyecto con dotenv.sample.txt
cp dotenv.sample.txt .env
```

:::warning
**Nunca incluyas archivos `.env` en el control de versiones.** Contienen información sensible como credenciales de base de datos, claves de API y secretos de JWT. Todos los proyectos de ChurchApps incluyen `.env` en `.gitignore`, pero revisa siempre antes de hacer commit.
:::

## Elegir un destino de API

La decisión más importante es hacia dónde apunta tu frontend para las llamadas a la API. Hay dos opciones:

### Opción 1: APIs de demostración (recomendada para el desarrollo del frontend)

Usa el entorno de demostración compartido. No necesitas configurar una API ni una base de datos local. Ejecuta el código más reciente de `main`, y sus datos de ejemplo se regeneran cada noche.

```bash
# Patrón de URL base
https://api.demo.churchapps.org/{module}

# Ejemplos de URLs de módulos
https://api.demo.churchapps.org/membership
https://api.demo.churchapps.org/attendance
https://api.demo.churchapps.org/content
https://api.demo.churchapps.org/giving
https://api.demo.churchapps.org/messaging
https://api.demo.churchapps.org/doing
```

:::warning
El entorno de staging (`api.staging.churchapps.org`, `api.staging.lessons.church` y los hosts relacionados) ya no está disponible. Es posible que algunos archivos `.env` de ejemplo todavía contengan URLs de staging; reemplázalas con los valores de demostración o locales que se muestran en esta página. No existe una API de Lessons compartida que no sea de producción: ejecuta [LessonsApi](https://github.com/ChurchApps/LessonsApi) localmente (escucha en el puerto `8090`) cuando la necesites.
:::

### Opción 2: API local

Ejecuta el proyecto Api en tu máquina. Requiere MySQL 8.0+ con bases de datos creadas para cada módulo. Consulta la guía de [configuración local de la API](../api/local-setup.md).

```bash
# Patrón de URL base
http://localhost:8084/{module}

# Ejemplos de URLs de módulos
http://localhost:8084/membership
http://localhost:8084/attendance
http://localhost:8084/content
http://localhost:8084/giving
http://localhost:8084/messaging
http://localhost:8084/doing
```

---

## Variables de entorno de la API

El proyecto principal **Api** (`.env.sample`) tiene la mayor cantidad de configuración. Estas son las variables clave:

### Configuración compartida

| Variable | Descripción | Ejemplo |
|----------|-------------|---------|
| `ENVIRONMENT` | Entorno de ejecución | `dev` |
| `SERVER_PORT` | Puerto HTTP para el servidor de desarrollo local | `8084` |
| `ENCRYPTION_KEY` | Clave de cifrado de 192 bits para datos sensibles | `aSecretKeyOfExactly192BitsLength` |
| `JWT_SECRET` | Secreto para firmar los JSON Web Tokens | `jwt-secret-dev` |
| `FILE_STORE` | Dónde almacenar los archivos subidos (`disk` o `s3`) | `disk` |
| `CORS_ORIGIN` | Orígenes CORS permitidos (`*` para desarrollo local) | `*` |

### Conexión a la base de datos

Una única URL base apunta la API a MySQL. La API deriva una base de datos por módulo (`/membership`, `/attendance`, `/content`, `/giving`, `/messaging`, `/doing`, `/reporting`) a partir de esta base.

| Variable | Ejemplo |
|----------|---------|
| `API_DATABASE_URL` | `mysql://root:password@localhost:3306` |

:::tip
Reemplaza `root:password` con tus credenciales reales de MySQL. Cada base de datos por módulo debe existir antes de ejecutar la API. Usa `npm run initdb` para crear el esquema de todos los módulos, o `npm run initdb:membership` para un solo módulo.
:::

### Configuración de WebSocket

| Variable | Descripción | Ejemplo |
|----------|-------------|---------|
| `SOCKET_PORT` | Puerto para el servidor WebSocket | `8087` |
| `SOCKET_URL` | URL de WebSocket a la que se conectan los clientes | `ws://localhost:8087` |

---

## Variables de entorno de las aplicaciones web

### B1Admin (React + Vite)

Archivo de ejemplo: `.env.sample`

| Variable | Descripción | Ejemplo (Demo) |
|----------|-------------|----------------|
| `REACT_APP_STAGE` | Nombre del entorno | `demo` |
| `PORT` | Puerto del servidor de desarrollo | `3101` |
| `REACT_APP_API_BASE` | URL base única para todas las APIs de ChurchApps (`/membership`, `/attendance`, `/content`, `/giving`, `/messaging`, `/doing`, `/reporting` se agregan automáticamente) | `https://api.demo.churchapps.org` |
| `REACT_APP_CONTENT_ROOT` | URL de entrega de contenido | `https://democontent.churchapps.org` |
| `REACT_APP_GOOGLE_ANALYTICS` | ID de Google Analytics (opcional) | `UA-123456789-1` |

Para el desarrollo con una API local, apunta la URL base a tu stack local:

```bash
REACT_APP_API_BASE=http://localhost:8084
```

### B1App (Next.js)

Archivo de ejemplo: `.env.sample`

| Variable | Descripción | Ejemplo (Demo) |
|----------|-------------|----------------|
| `NEXT_PUBLIC_API_BASE` | URL base única para todas las APIs de ChurchApps (`/membership`, `/attendance`, `/content`, `/giving`, `/messaging`, `/doing`, `/reporting` se agregan automáticamente) | `https://api.demo.churchapps.org` |
| `NEXT_PUBLIC_CONTENT_ROOT` | URL de entrega de contenido | `https://democontent.churchapps.org` |
| `NEXT_PUBLIC_GOOGLE_ANALYTICS` | ID de Google Analytics (opcional) | `UA-123456789-1` |

:::info
Next.js requiere el prefijo `NEXT_PUBLIC_` para cualquier variable de entorno que deba estar disponible en el navegador. Las variables solo del servidor no necesitan este prefijo.
:::

### LessonsApp (Next.js)

Archivo de ejemplo: `dotenv.sample.txt`

| Variable | Descripción | Ejemplo (LessonsApi local) |
|----------|-------------|----------------------------|
| `STAGE` | Etapa del entorno (déjala sin definir o usa `dev` para desarrollo local) | `dev` |
| `NEXT_PUBLIC_LESSONS_API` | URL de la API de Lessons | `http://localhost:8090` |
| `NEXT_PUBLIC_CONTENT_ROOT` | URL de entrega de contenido | `http://localhost:8090/content` |
| `NEXT_PUBLIC_API_BASE` | URL base de la API de ChurchApps utilizada para el inicio de sesión (solo se respeta cuando `STAGE` no está definida o es `dev`) | `https://api.demo.churchapps.org` |

---

## Variables de entorno de las aplicaciones móviles

### B1Checkin (React Native / Expo)

Archivo de ejemplo: `dotenv.sample.txt`

| Variable | Descripción | Ejemplo |
|----------|-------------|---------|
| `EXPO_PUBLIC_STAGE` | Determina el conjunto de APIs al que se conecta la aplicación: `dev` (API local en `http://127.0.0.1:8084`), `staging` o `prod` (el valor predeterminado cuando no está definida) | `dev` |

B1Checkin usa solo los módulos de API de Membership y Attendance, además de la URL de entrega de contenido; sus direcciones para cada etapa se definen en `src/helpers/EnvironmentHelper.ts`.

:::info
Expo incluye en el paquete de la aplicación solo las variables con el prefijo `EXPO_PUBLIC_`. Reinicia el servidor de desarrollo con `yarn start --reset-cache` después de cambiar `.env`.
:::

---

## Referencia rápida: ubicación de los archivos de ejemplo

| Proyecto | Archivo de ejemplo |
|----------|-------------------|
| Api | `.env.sample` |
| B1Admin | `.env.sample` |
| B1App | `.env.sample` |
| B1Checkin | `dotenv.sample.txt` |
| LessonsApp | `dotenv.sample.txt` |
| AskApi | `dotenv.sample.txt` |
