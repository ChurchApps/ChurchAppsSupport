---
title: "Variables de Entorno"
---

# Variables de Entorno

<div class="article-intro">

Cada proyecto de ChurchApps utiliza un archivo `.env` para configuración local. Cada proyecto incluye un archivo de muestra que copia y personaliza. Esta página cubre las variables de entorno para APIs, aplicaciones web y aplicaciones móviles, incluyendo cómo elegir entre objetivos de API de preparación o local.

</div>

<div class="prereqs">
<h4>Antes de Comenzar</h4>

- Instalar los [requisitos previos](./prerequisites) para su proyecto
- Clonar el repositorio del proyecto en el que desea trabajar
- Revisar la [Descripción General del Proyecto](./project-overview) para entender qué módulos de API necesita su proyecto

</div>

## Patrón General

1. Busque `dotenv.sample.txt` o `.env.sample` en la raíz del proyecto.
2. Cópielo a `.env`.
3. Edite los valores según sea necesario.

```bash
# Ejemplo para un proyecto con .env.sample
cp .env.sample .env

# Ejemplo para un proyecto con dotenv.sample.txt
cp dotenv.sample.txt .env
```

:::warning
**Nunca confirme archivos `.env` al control de versiones.** Contienen secretos como credenciales de base de datos, claves de API y secretos JWT. Todos los proyectos de ChurchApps incluyen `.env` en `.gitignore`, pero siempre verifique dos veces antes de confirmar.
:::

## Elegir un Objetivo de API

La decisión más importante es dónde apunta su frontend para llamadas de API. Hay dos opciones:

### Opción 1: APIs de Preparación (Recomendado para Desarrollo Frontend)

Utilice el entorno de preparación compartido. No se requiere configuración local de API o base de datos.

```bash
# Patrón de URL base
https://api.staging.churchapps.org/{module}

# URLs de módulo de ejemplo
https://api.staging.churchapps.org/membership
https://api.staging.churchapps.org/attendance
https://api.staging.churchapps.org/content
https://api.staging.churchapps.org/giving
https://api.staging.churchapps.org/messaging
https://api.staging.churchapps.org/doing
```

### Opción 2: API Local

Ejecute el proyecto de API en su máquina. Requiere MySQL 8.0+ con bases de datos creadas para cada módulo. Ver la guía [configuración local de API](../api/local-setup).

```bash
# Patrón de URL base
http://localhost:8084/{module}

# URLs de módulo de ejemplo
http://localhost:8084/membership
http://localhost:8084/attendance
http://localhost:8084/content
http://localhost:8084/giving
http://localhost:8084/messaging
http://localhost:8084/doing
```

---

## Variables de Entorno de API

El proyecto **Api** central (`.env.sample`) tiene la configuración más importante. Aquí hay variables clave:

### Configuración Compartida

| Variable | Descripción | Ejemplo |
|----------|-------------|---------|
| `ENVIRONMENT` | Entorno de tiempo de ejecución | `dev` |
| `SERVER_PORT` | Puerto HTTP para servidor de desarrollo local | `8084` |
| `ENCRYPTION_KEY` | Clave de encriptación de 192 bits para datos sensibles | `aSecretKeyOfExactly192BitsLength` |
| `JWT_SECRET` | Secreto para firmar Tokens Web JSON | `jwt-secret-dev` |
| `FILE_STORE` | Dónde almacenar archivos cargados (`disk` o `s3`) | `disk` |
| `CORS_ORIGIN` | Orígenes CORS permitidos (`*` para desarrollo local) | `*` |

### Conexiones de Base de Datos

Cada módulo de API tiene su propia base de datos MySQL y cadena de conexión:

| Variable | Base de Datos |
|----------|----------|
| `MEMBERSHIP_CONNECTION_STRING` | `mysql://root:password@localhost:3306/membership` |
| `ATTENDANCE_CONNECTION_STRING` | `mysql://root:password@localhost:3306/attendance` |
| `CONTENT_CONNECTION_STRING` | `mysql://root:password@localhost:3306/content` |
| `GIVING_CONNECTION_STRING` | `mysql://root:password@localhost:3306/giving` |
| `MESSAGING_CONNECTION_STRING` | `mysql://root:password@localhost:3306/messaging` |
| `DOING_CONNECTION_STRING` | `mysql://root:password@localhost:3306/doing` |

:::tip
Actualice `root:password` con sus credenciales reales de MySQL. Cada base de datos debe crearse antes de ejecutar la API. Use `npm run initdb` para crear el esquema para todos los módulos, o `npm run initdb:membership` para un módulo único.
:::

### Configuración de WebSocket

| Variable | Descripción | Ejemplo |
|----------|-------------|---------|
| `SOCKET_PORT` | Puerto para servidor de WebSocket | `8087` |
| `SOCKET_URL` | URL de WebSocket para que los clientes se conecten | `ws://localhost:8087` |

---

## Variables de Entorno de Aplicación Web

### B1Admin (React + Vite)

Archivo de muestra: `.env.sample`

| Variable | Descripción | Ejemplo (Preparación) |
|----------|-------------|-------------------|
| `REACT_APP_STAGE` | Nombre de entorno | `demo` |
| `PORT` | Puerto del servidor de desarrollo | `3101` |
| `REACT_APP_MEMBERSHIP_API` | URL de API de membresía | `https://api.staging.churchapps.org/membership` |
| `REACT_APP_ATTENDANCE_API` | URL de API de asistencia | `https://api.staging.churchapps.org/attendance` |
| `REACT_APP_GIVING_API` | URL de API de donaciones | `https://api.staging.churchapps.org/giving` |
| `REACT_APP_CONTENT_ROOT` | URL de entrega de contenido | `https://content.staging.churchapps.org` |
| `REACT_APP_GOOGLE_ANALYTICS` | ID de Google Analytics (opcional) | `UA-123456789-1` |

Para desarrollo local de API, descomente y utilice las variantes `localhost`:

```bash
REACT_APP_MEMBERSHIP_API=http://localhost:8084/membership
REACT_APP_ATTENDANCE_API=http://localhost:8084/attendance
REACT_APP_GIVING_API=http://localhost:8084/giving
REACT_APP_CONTENT_API=http://localhost:8084/content
REACT_APP_DOING_API=http://localhost:8084/doing
REACT_APP_MESSAGING_API=http://localhost:8084/messaging
```

### B1App (Next.js)

Archivo de muestra: `.env.sample`

| Variable | Descripción | Ejemplo (Preparación) |
|----------|-------------|-------------------|
| `NEXT_PUBLIC_MEMBERSHIP_API` | URL de API de membresía | `https://api.staging.churchapps.org/membership` |
| `NEXT_PUBLIC_ATTENDANCE_API` | URL de API de asistencia | `https://api.staging.churchapps.org/attendance` |
| `NEXT_PUBLIC_GIVING_API` | URL de API de donaciones | `https://api.staging.churchapps.org/giving` |
| `NEXT_PUBLIC_MESSAGING_API` | URL de API de mensajería | `https://api.staging.churchapps.org/messaging` |
| `NEXT_PUBLIC_CONTENT_API` | URL de API de contenido | `https://api.staging.churchapps.org/content` |
| `NEXT_PUBLIC_CONTENT_ROOT` | URL de entrega de contenido | `https://staging.churchapps.org/content` |
| `NEXT_PUBLIC_CHURCH_APPS_URL` | URL base de ChurchApps | `https://staging.churchapps.org` |
| `NEXT_PUBLIC_GOOGLE_ANALYTICS` | ID de Google Analytics (opcional) | `UA-123456789-1` |

:::info
Next.js requiere el prefijo `NEXT_PUBLIC_` para cualquier variable de entorno que deba estar disponible en el navegador. Las variables solo de servidor no necesitan este prefijo.
:::

### LessonsApp (Next.js)

Archivo de muestra: `dotenv.sample.txt`

| Variable | Descripción | Ejemplo (Preparación) |
|----------|-------------|-------------------|
| `STAGE` | Etapa de entorno | `staging` |
| `NEXT_PUBLIC_LESSONS_API` | URL de API de lecciones | `https://api.staging.lessons.church` |
| `NEXT_PUBLIC_CONTENT_ROOT` | URL de entrega de contenido | `https://api.staging.lessons.church/content` |
| `NEXT_PUBLIC_CHURCH_APPS_URL` | URL base de ChurchApps | `https://staging.churchapps.org` |

---

## Variables de Entorno de Aplicación Móvil

### B1Mobile (React Native / Expo)

Archivo de muestra: `dotenv.sample.txt`

| Variable | Descripción | Ejemplo (Preparación) |
|----------|-------------|-------------------|
| `STAGE` | Nombre de entorno | `dev` |
| `MEMBERSHIP_API` | URL de API de membresía | `https://api.staging.churchapps.org/membership` |
| `MESSAGING_API` | URL de API de mensajería | `https://api.staging.churchapps.org/messaging` |
| `ATTENDANCE_API` | URL de API de asistencia | `https://api.staging.churchapps.org/attendance` |
| `GIVING_API` | URL de API de donaciones | `https://api.staging.churchapps.org/giving` |
| `DOING_API` | URL de API de tareas | `https://api.staging.churchapps.org/doing` |
| `CONTENT_API` | URL de API de contenido | `https://api.churchapps.org/content` |
| `CONTENT_ROOT` | URL de entrega de contenido | `https://content.staging.churchapps.org` |
| `LESSONS_ROOT` | URL del sitio de lecciones | `https://staging.lessons.church` |

:::info
Las aplicaciones móviles no utilizan el prefijo `REACT_APP_` o `NEXT_PUBLIC_`. El acceso a variables de entorno se maneja mediante la configuración de Expo.
:::

---

## Referencia Rápida: Ubicaciones de Archivo de Muestra

| Proyecto | Archivo de Muestra |
|---------|-------------|
| Api | `.env.sample` |
| B1Admin | `.env.sample` |
| B1App | `.env.sample` |
| B1Mobile | `dotenv.sample.txt` |
| B1Checkin | `dotenv.sample.txt` |
| LessonsApp | `dotenv.sample.txt` |
| AskApi | `dotenv.sample.txt` |
