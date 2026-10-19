---
title: "Variables de entorno"
---

# Variables de entorno

<div class="article-intro">

Todos los proyectos de ChurchApps usan un archivo `.env` para la configuración local. Cada proyecto incluye un archivo de ejemplo que se copia y se personaliza. Esta página cubre las variables de entorno de las APIs, las aplicaciones web y las aplicaciones móviles, incluido cómo elegir entre la API de demostración y la API local.

</div>

<div class="prereqs">
<h4>Antes de comenzar</h4>

- Instale los [requisitos previos](./prerequisites) de su proyecto
- Clone el repositorio del proyecto en el que quiera trabajar
- Revise la [Descripción general del proyecto](./project-overview) para entender qué módulos de API necesita su proyecto

</div>

## Patrón general

1. Busque `dotenv.sample.txt` o `.env.sample` en la raíz del proyecto.
2. Cópielo como `.env`.
3. Edite los valores según sea necesario.

```bash
# Example for a project with .env.sample
cp .env.sample .env

# Example for a project with dotenv.sample.txt
cp dotenv.sample.txt .env
```

:::warning
**Nunca suba archivos `.env` al control de versiones.** Contienen secretos como credenciales de base de datos, claves de API y secretos de JWT. Todos los proyectos de ChurchApps incluyen `.env` en `.gitignore`, pero revise siempre antes de hacer un commit.
:::

## Elegir un destino de API

La decisión más importante es a qué API apuntan las llamadas de su frontend. Hay dos opciones:

### Opción 1: APIs de demostración (recomendado para el desarrollo de frontend)

Use el entorno de demostración compartido. No necesita configurar una API local ni una base de datos. Ejecuta el código más reciente de `main`, y sus datos de ejemplo se vuelven a cargar cada noche.

```bash
# Base URL pattern
https://api.demo.churchapps.org/{module}

# Example module URLs
https://api.demo.churchapps.org/membership
https://api.demo.churchapps.org/attendance
https://api.demo.churchapps.org/content
https://api.demo.churchapps.org/giving
https://api.demo.churchapps.org/messaging
https://api.demo.churchapps.org/doing
```

:::warning
El entorno de staging (`api.staging.churchapps.org`, `api.staging.lessons.church` y hosts relacionados) ya no está disponible. Algunos archivos `.env` de ejemplo todavía pueden contener URLs de staging; reemplácelas por los valores de demostración o locales que se muestran en esta página. No existe una API de Lessons compartida de no producción: ejecute [LessonsApi](https://github.com/ChurchApps/LessonsApi) localmente (escucha en el puerto `8090`) cuando necesite una.
:::

### Opción 2: API local

Ejecute el proyecto Api en su máquina. Requiere MySQL 8.0 o superior con bases de datos creadas para cada módulo. Consulte la guía de [configuración local de la API](../api/local-setup).

```bash
# Base URL pattern
http://localhost:8084/{module}

# Example module URLs
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

### Ajustes compartidos

| Variable | Descripción | Ejemplo |
|----------|-------------|---------|
| `ENVIRONMENT` | Entorno de ejecución | `dev` |
| `SERVER_PORT` | Puerto HTTP del servidor de desarrollo local | `8084` |
| `ENCRYPTION_KEY` | Clave de cifrado de 192 bits para datos sensibles | `aSecretKeyOfExactly192BitsLength` |
| `JWT_SECRET` | Secreto para firmar los JSON Web Tokens | `jwt-secret-dev` |
| `FILE_STORE` | Dónde almacenar los archivos subidos (`disk` o `s3`) | `disk` |
| `CORS_ORIGIN` | Orígenes CORS permitidos (`*` para desarrollo local) | `*` |

### Conexión a la base de datos

Una sola URL base apunta la API a MySQL. La API deriva una base de datos por módulo (`/membership`, `/attendance`, `/content`, `/giving`, `/messaging`, `/doing`, `/reporting`) a partir de esta base.

| Variable | Ejemplo |
|----------|---------|
| `API_DATABASE_URL` | `mysql://root:password@localhost:3306` |

:::tip
Reemplace `root:password` con sus credenciales reales de MySQL. Cada base de datos por módulo debe existir antes de ejecutar la API. Use `npm run initdb` para crear el esquema de todos los módulos, o `npm run initdb:membership` para un solo módulo.
:::

### Ajustes de WebSocket

| Variable | Descripción | Ejemplo |
|----------|-------------|---------|
| `SOCKET_PORT` | Puerto del servidor WebSocket | `8087` |
| `SOCKET_URL` | URL de WebSocket a la que se conectan los clientes | `ws://localhost:8087` |

---

## Variables de entorno de las aplicaciones web

### B1Admin (React + Vite)

Archivo de ejemplo: `.env.sample`

| Variable | Descripción | Ejemplo (Demo) |
|----------|-------------|----------------|
| `REACT_APP_STAGE` | Nombre del entorno | `demo` |
| `PORT` | Puerto del servidor de desarrollo | `3101` |
| `REACT_APP_API_BASE` | URL base única para todas las APIs de ChurchApps (`/membership`, `/attendance`, `/content`, `/giving`, `/messaging`, `/doing`, `/reporting` se añaden automáticamente) | `https://api.demo.churchapps.org` |
| `REACT_APP_CONTENT_ROOT` | URL de entrega de contenido | `https://democontent.churchapps.org` |
| `REACT_APP_GOOGLE_ANALYTICS` | ID de Google Analytics (opcional) | `UA-123456789-1` |

Para el desarrollo con una API local, apunte la URL base a su entorno local:

```bash
REACT_APP_API_BASE=http://localhost:8084
```

### B1App (Next.js)

Archivo de ejemplo: `.env.sample`

| Variable | Descripción | Ejemplo (Demo) |
|----------|-------------|----------------|
| `NEXT_PUBLIC_API_BASE` | URL base única para todas las APIs de ChurchApps (`/membership`, `/attendance`, `/content`, `/giving`, `/messaging`, `/doing`, `/reporting` se añaden automáticamente) | `https://api.demo.churchapps.org` |
| `NEXT_PUBLIC_CONTENT_ROOT` | URL de entrega de contenido | `https://democontent.churchapps.org` |
| `NEXT_PUBLIC_GOOGLE_ANALYTICS` | ID de Google Analytics (opcional) | `UA-123456789-1` |

:::info
Next.js requiere el prefijo `NEXT_PUBLIC_` para cualquier variable de entorno que deba estar disponible en el navegador. Las variables solo del servidor no necesitan este prefijo.
:::

### LessonsApp (Next.js)

Archivo de ejemplo: `dotenv.sample.txt`

| Variable | Descripción | Ejemplo (API de Lessons local) |
|----------|-------------|----------------------------|
| `STAGE` | Etapa del entorno (déjela sin definir o use `dev` para el desarrollo local) | `dev` |
| `NEXT_PUBLIC_LESSONS_API` | URL de la API de Lessons | `http://localhost:8090` |
| `NEXT_PUBLIC_CONTENT_ROOT` | URL de entrega de contenido | `http://localhost:8090/content` |
| `NEXT_PUBLIC_API_BASE` | URL base de la API de ChurchApps usada para iniciar sesión (solo se respeta cuando `STAGE` no está definido o es `dev`) | `https://api.demo.churchapps.org` |

---

## Variables de entorno de las aplicaciones móviles

### B1Mobile (React Native / Expo)

Archivo de ejemplo: `dotenv.sample.txt`

| Variable | Descripción | Ejemplo (Demo) |
|----------|-------------|----------------|
| `STAGE` | Nombre del entorno | `dev` |
| `MEMBERSHIP_API`, `ATTENDANCE_API`, `GIVING_API`, `DOING_API`, `MESSAGING_API`, `CONTENT_API` | Una URL por cada módulo de la API de ChurchApps (cada una usa producción por defecto si no está definida) | `https://api.demo.churchapps.org/membership` |
| `LESSONS_API` | API de Lessons (host independiente; no existe una compartida de no producción) | `https://api.lessons.church` |
| `CONTENT_ROOT` | URL de entrega de contenido | `https://democontent.churchapps.org` |
| `LESSONS_ROOT` | URL del sitio de Lessons | `https://lessons.church` |

:::info
Las aplicaciones móviles no usan el prefijo `REACT_APP_` ni `NEXT_PUBLIC_`. El acceso a las variables de entorno lo gestiona la configuración de Expo.
:::

---

## Referencia rápida: ubicaciones de los archivos de ejemplo

| Proyecto | Archivo de ejemplo |
|---------|-------------|
| Api | `.env.sample` |
| B1Admin | `.env.sample` |
| B1App | `.env.sample` |
| B1Mobile | `dotenv.sample.txt` |
| B1Checkin | `dotenv.sample.txt` |
| LessonsApp | `dotenv.sample.txt` |
| AskApi | `dotenv.sample.txt` |
