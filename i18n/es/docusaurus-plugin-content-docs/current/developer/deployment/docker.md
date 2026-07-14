---
title: "Auto-alojamiento con Docker"
---

# Auto-alojamiento con Docker

<div class="article-intro">

Ejecuta tu propia instancia privada de B1 Admin, el portal de miembros B1, la API, y una base de datos MySQL en cualquier máquina con Docker — un servidor casero, un VPS de $5, o una caja on-prem. Un `docker compose up` construye e inicia todo. Si prefieres no gestionar un servidor en absoluto, consulta [Auto-alojamiento en Railway](./railway-template) para la alternativa gestionada.

</div>

## Inicio Rápido

<div class="prereqs">
<h4>Qué necesitas</h4>

- [Docker Engine](https://docs.docker.com/engine/install/) con Compose v2 (incluido en Docker Desktop)
- ~4 GB de RAM disponibles durante la compilación inicial (las aplicaciones web se construyen desde el código fuente)
- Git, o simplemente el archivo `docker-compose.yml` crudo

</div>

```bash
git clone https://github.com/ChurchApps/B1Admin.git
cd B1Admin
docker compose up -d
```

La primera ejecución tarda 10–20 minutos: construye B1 Admin desde tu clon e construye la API y B1 App directamente desde sus repositorios de GitHub. Los inicios posteriores son segundos.

Cuando los cuatro servicios estén activados:

1. Abre **http://localhost:3101** (B1 Admin).
2. Haz clic en **Registrar** y crea tu cuenta. La primera cuenta es automáticamente un administrador del servidor.
3. Sigue las indicaciones en la aplicación para crear tu primera iglesia.

Los esquemas de la base de datos se crean automáticamente por la migración de inicio del contenedor de API — no se requiere SQL manual.

| Servicio | URL |
|---------|-----|
| B1 Admin (personal/admin) | http://localhost:3101 |
| B1 App (portal de miembros / sitio web) | http://localhost:3000 |
| API | http://localhost:8084 |
| MySQL | solo interno (`mysql:3306` en la red de composición) |

## Configuración

Todos los ajustes viven en un archivo `.env` junto a `docker-compose.yml`. Cada variable tiene un default funcional para localhost, así que el archivo es opcional hasta que personalices.

```bash
# .env — todo es opcional; mostrado con defaults
MYSQL_ROOT_PASSWORD=churchapps
JWT_SECRET=please-change-this-jwt-secret
ENCRYPTION_KEY=PleaseChangeThisDockerDefaultKey   # exactamente 32 caracteres

# URLs públicas (cambiar cuando expongas más allá de localhost)
API_URL=http://localhost:8084
B1ADMIN_URL=http://localhost:3101
B1APP_URL=http://localhost:3000
SOCKET_URL=ws://localhost:8084

# Correo — consulta la sección Email de la guía Railway para walkthroughs de proveedores
MAIL_SYSTEM=
SMTP_HOST=
SMTP_USER=
SMTP_PASS=
SMTP_SECURE=false
SUPPORT_EMAIL=noreply@yourchurch.org
```

Antes de uso real, cambia `MYSQL_ROOT_PASSWORD`, `JWT_SECRET`, y `ENCRYPTION_KEY` (cualquier cadena de 32 caracteres).

:::warning
Los valores `*_URL` están **horneados en las aplicaciones web en tiempo de compilación** (comportamiento estándar de Vite/Next.js). Cambiarlos en `.env` requiere una recompilación, no solo un reinicio:

```bash
docker compose up -d --build
```
:::

Cambiar la contraseña de MySQL después del primer lanzamiento requiere actualizar la contraseña dentro de MySQL también — el volumen mantiene las credenciales antiguas.

## Exponerlo a Internet

Pon cualquier proxy inverso delante y dale a cada servicio un nombre de host. Con [Caddy](https://caddyserver.com/) es esto:

```
admin.yourchurch.org { reverse_proxy localhost:3101 }
app.yourchurch.org   { reverse_proxy localhost:3000 }
api.yourchurch.org   { reverse_proxy localhost:8084 }
```

Luego establece las URLs en `.env` y recompila:

```bash
API_URL=https://api.yourchurch.org
B1ADMIN_URL=https://admin.yourchurch.org
B1APP_URL=https://app.yourchurch.org
SOCKET_URL=wss://api.yourchurch.org
```

```bash
docker compose up -d --build
```

El WebSocket usado para chat y notificaciones en vivo comparte el puerto de la API, así que `SOCKET_URL` es simplemente la URL de la API con `wss://`.

## Correo, Donaciones, Multi-Sitio, e Integraciones

Estos funcionan idénticamente a la implementación de Railway — las mismas variables de entorno, establecidas en tu archivo `.env` en lugar del panel de Railway (el archivo de composición las pasa a través de la API):

- **[Correo / SMTP](./railway-template#1-email-highly-recommended)** — altamente recomendado; sin él los miembros no pueden restablecer contraseñas
- **[Multi-sitio](./railway-template#3-multi-site-multiple-churches-on-one-instance)** — iglesias ilimitadas por instancia, gestionadas en la interfaz de admin
- **[Donaciones en línea](./railway-template#4-online-giving-stripe--paypal)** — configuradas por iglesia en la interfaz de admin, no vía variables de entorno
- **[Integraciones opcionales](./railway-template#6-optional-feature-integrations)** — `OPENAI_API_KEY`, `YOUTUBE_API_KEY`, `PEXELS_KEY`, `VIMEO_TOKEN`, `API_BIBLE_KEY`, `WEB_PUSH_PUBLIC_KEY`/`WEB_PUSH_PRIVATE_KEY`, `GOOGLE_RECAPTCHA_SECRET_KEY`

## Datos, Copias de seguridad, y Almacenamiento de archivos

Dos volúmenes de Docker nombrados mantienen todo el estado:

| Volumen | Contenidos |
|--------|----------|
| `mysql-data` | Todos los esquemas de base de datos |
| `api-content` | Archivos subidos — fotos, documentos, imágenes del sitio web (montados en `/app/content`) |

Haz una copia de seguridad de la base de datos con una línea (prográmalo con cron):

```bash
docker compose exec mysql mysqldump -uroot -p"$MYSQL_ROOT_PASSWORD" --all-databases > backup-$(date +%F).sql
```

Haz una copia de seguridad de los archivos subidos copiando el volumen:

```bash
docker run --rm -v b1admin_api-content:/data -v "$PWD":/backup alpine tar czf /backup/content-$(date +%F).tgz -C /data .
```

Para bibliotecas de medios grandes puedes cambiar el almacenamiento de archivos a S3 en lugar del volumen local — establece `FILE_STORE=S3` más las variables `AWS_*` descritas en la [sección File Storage de la guía Railway](./railway-template#5-file-storage).

## Actualización

La API y B1 App se construyen desde la rama `main` de sus repositorios de GitHub; B1 Admin se construye desde tu clon local.

```bash
git pull                              # actualizar B1 Admin
docker compose build --pull           # recompilar todas las imágenes contra main más reciente
docker compose up -d
```

Las migraciones de la base de datos se ejecutan automáticamente cuando el contenedor de API se inicia.

Para fijar versiones en lugar de rastrear `main`, apunta los contextos de compilación a una etiqueta en `.env`:

```bash
API_CONTEXT=https://github.com/ChurchApps/Api.git#v1.2.3
B1APP_CONTEXT=https://github.com/ChurchApps/B1App.git#v1.2.3
```

Los desarrolladores pueden apuntar las mismas variables a checkouts locales (p. ej. `API_CONTEXT=../Api`).

## Solución de problemas

| Síntoma | Causa probable | Solución |
|---------|--------------|-----|
| El contenedor `api` se reinicia en un bucle | MySQL no listo o fallo de migración | `docker compose logs api` — la migración imprime qué módulo falló |
| El inicio de sesión redirige a `api.churchapps.org` | Aplicación web construida sin los argumentos de etapa `custom` | Recompila: `docker compose build --no-cache b1admin b1app` |
| Cambié una URL en `.env` pero nada sucedió | Las URLs están horneadas en tiempo de compilación | `docker compose up -d --build` |
| "Revisa tu correo" pero no llega ningún correo | `MAIL_SYSTEM=SMTP` con credenciales malas | Arregla las credenciales, o desactiva `MAIL_SYSTEM` para desactivar el correo |
| Chat / características en vivo silenciosas | `SOCKET_URL` inalcanzable desde el navegador | Debe ser `wss://` detrás de HTTPS y proxied al puerto 8084 |
| La compilación muere en un VPS pequeño | Sin memoria durante `next build` | Agrega swap, o compila en otra máquina y `docker save`/`load` |

¿Aún atascado? Abre un issue en [github.com/ChurchApps/ChurchAppsSupport/issues](https://github.com/ChurchApps/ChurchAppsSupport/issues) con la salida de `docker compose logs`.

## Artículos relacionados

- **[Auto-alojamiento en Railway](./railway-template)** — alternativa de hosting gestionado, más las guías de configuración post-implementación compartidas
- **[Configuración Inicial](../../getting-started/initial-setup)** — primeros pasos después de que se crea tu iglesia
- **[Configuración Local de API](../api/local-setup)** — ejecutar el stack directamente para desarrollo
