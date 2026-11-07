---
title: "Autoalojamiento con Docker"
description: "Instale en su propia máquina una pila privada de B1 Admin, portal de miembros, API y MySQL con Docker, y luego actualícela y haga copias de seguridad con el comando b1."
---

# Autoalojamiento con Docker

<div class="article-intro">

Ejecute su propia instancia privada de B1 Admin, del portal de miembros y sitio web de B1, de la API y de una base de datos MySQL en cualquier equipo con Docker: un servidor doméstico, un VPS pequeño o un equipo local. Un comando la instala, un comando la actualiza, y cada actualización toma primero una copia de seguridad. Si prefiere no administrar un servidor, consulte [Autoalojamiento en Railway](./railway-template.md) como alternativa administrada.

</div>

## Inicio rápido

<div class="prereqs">
<h4>Lo que necesita</h4>

- Una máquina Linux (o macOS / Windows con WSL o Git Bash; el asistente `b1` es un script de bash) con [Docker Engine](https://docs.docker.com/engine/install/) y Compose v2 (incluido en Docker Desktop)
- Unos 2 GB de RAM y 5 GB de disco
- Para un sitio público: un nombre de dominio que apunte a la máquina, con los puertos 80 y 443 accesibles

</div>

```bash
curl -fsSL https://raw.githubusercontent.com/ChurchApps/B1Admin/main/deploy/install.sh | bash -s -- --domain iglesia.ejemplo.org
```

Omita `--domain` para ejecutarla en `http://localhost`. El instalador crea una carpeta `b1church`, escribe un `.env` con secretos recién generados, descarga las imágenes precompiladas del GitHub Container Registry y espera hasta que la API informe que está saludable. No se compila nada en su equipo, así que el primer arranque tarda uno o dos minutos.

Cuando termine:

1. Abra **https://iglesia.ejemplo.org/admin** (o http://localhost/admin) y haga clic en **Register**. La primera cuenta se convierte automáticamente en administrador del servidor.
2. Siga las indicaciones de la aplicación para crear su primera iglesia. Su sitio web y su portal de miembros estarán en línea en **https://iglesia.ejemplo.org/** en cuanto exista.

Todo funciona detrás de un solo dominio:

| Ruta | Servicio |
|------|----------|
| `/` | B1App: sitio web de la iglesia y portal de miembros |
| `/admin` | B1Admin: panel del personal |
| `/api` | API, archivos subidos y el websocket de actualizaciones en vivo |

El HTTPS es automático: el proxy [Caddy](https://caddyserver.com/) incluido obtiene y renueva un certificado de Let's Encrypt para el dominio definido en `.env`. Solo se exponen los puertos 80 y 443; la base de datos solo es accesible desde dentro de la red de Docker.

## El comando `b1`

El instalador deja un script `deploy/b1` junto a `docker-compose.yml`. Es lo único que necesita en el día a día:

| Comando | Qué hace |
|---------|----------|
| `./deploy/b1 upgrade` | Descarga la versión actual, toma una copia de seguridad, reinicia y verifica que la API esté saludable |
| `./deploy/b1 upgrade 2026.10.1` | Igual, fijado a una versión específica |
| `./deploy/b1 backup` | Guarda una copia de la base de datos, los archivos subidos y `.env` en `backups/<fecha-hora>/` |
| `./deploy/b1 restore backups/<fecha-hora>` | Restaura una copia (la API se detiene mientras se ejecuta) |
| `./deploy/b1 rollback` | Restaura la copia más reciente, incluida la versión con la que se tomó |
| `./deploy/b1 status` | Versión instalada y estado de los contenedores |
| `./deploy/b1 logs api` | Sigue los registros de un servicio |

Las versiones se publican como un solo paquete con número de versión, así que las tres imágenes siempre coinciden. `B1_VERSION=stable` en `.env` sigue la última versión; establezca una versión específica para fijarla. Las notas de cada versión están en [las versiones de B1Admin](https://github.com/ChurchApps/B1Admin/releases).

## Configuración

Toda la configuración está en `.env`, junto a `docker-compose.yml`. El instalador completa las obligatorias:

```bash
B1_VERSION=stable
DOMAIN=iglesia.ejemplo.org
SITE_ADDRESS=iglesia.ejemplo.org         # lo que sirve Caddy; http://localhost para una instalación local
PUBLIC_URL=https://iglesia.ejemplo.org   # cómo llegan a su sitio los navegadores y los correos
MYSQL_ROOT_PASSWORD=…                    # generado
JWT_SECRET=…                             # generado
ENCRYPTION_KEY=…                         # generado, exactamente 32 caracteres: nunca lo cambie después de guardar credenciales

# Correo electrónico: muy recomendado; sin él, los miembros no pueden restablecer sus propias contraseñas
MAIL_SYSTEM=SMTP
SMTP_HOST=smtp.resend.com
SMTP_USER=resend
SMTP_PASS=re_xxxxxxxxx
SMTP_SECURE=false
SUPPORT_EMAIL=noreply@iglesia.ejemplo.org
```

Después de editar `.env`, aplique los cambios con `docker compose up -d`. Las aplicaciones web determinan a qué API conectarse según la dirección del navegador, así que cambiar el dominio solo requiere actualizar `SITE_ADDRESS` y `PUBLIC_URL` y reiniciar; no hace falta recompilar.

:::warning
Guarde `.env` en un lugar seguro. `ENCRYPTION_KEY` protege las credenciales almacenadas de la pasarela de pagos y del almacenamiento; una copia de seguridad sin ella no puede descifrarlas. Por esa razón, `./deploy/b1 backup` incluye una copia.
:::

### Pasar a un dominio más adelante

Si instaló en `localhost` y después quiere publicarla: apunte el DNS a la máquina, establezca `DOMAIN`, `SITE_ADDRESS` (solo el dominio) y `PUBLIC_URL` (`https://` + dominio) en `.env`, y luego ejecute `docker compose up -d`. Caddy obtiene un certificado con la primera solicitud.

## Correo, donaciones, multisitio e integraciones

Estas funciones funcionan exactamente igual que en Railway: las mismas variables de entorno, configuradas en `.env` en lugar del panel de Railway:

- **[Correo electrónico / SMTP](./railway-template.md#1-email-highly-recommended)**: guías por proveedor para Resend, Brevo y Gmail
- **[Multisitio](./railway-template.md#3-multi-site-multiple-churches-on-one-instance)**: iglesias ilimitadas por instancia. `/` sirve la iglesia cuyo identificador es `DEFAULT_CHURCH_SLUG` (la primera iglesia es `church`); apunte los dominios adicionales al equipo y asígnelos en **Settings → Domains** dentro de B1Admin
- **[Donaciones en línea](./railway-template.md#4-online-giving-stripe--paypal)**: se configuran por iglesia en la interfaz de administración
- **[Integraciones opcionales](./railway-template.md#6-optional-feature-integrations)**: `OPENAI_API_KEY`, `YOUTUBE_API_KEY`, `PEXELS_KEY`, `VIMEO_TOKEN`, `API_BIBLE_KEY`, `GOOGLE_RECAPTCHA_SECRET_KEY`
- **[Notificaciones push](#push-notifications)**: `WEB_PUSH_*`; el instalador las deja en blanco, así que las push permanecen desactivadas hasta que las agregue

Las invitaciones y otros correos enviados por la iglesia están habilitados automáticamente en una instancia autoalojada (el servicio alojado los limita con una revisión manual para proteger su reputación de envío).

## Notificaciones push {#push-notifications}

Las notificaciones push del navegador y de la web móvil permanecen desactivadas hasta que el servidor tenga un par de claves VAPID. El instalador no lo crea. Mientras no lo agregue, la página de Notificaciones de la aplicación web móvil indica que las notificaciones push no están activadas para el sitio.

1. Genere un par de claves. Esto solo necesita Docker:

   ```bash
   docker run --rm node:lts-alpine npx --yes web-push generate-vapid-keys
   ```

2. Agregue los dos valores a `.env`. `WEB_PUSH_SUBJECT` es opcional y es la dirección de contacto que ven los servicios de push:

   ```bash
   WEB_PUSH_PUBLIC_KEY=…
   WEB_PUSH_PRIVATE_KEY=…
   WEB_PUSH_SUBJECT=mailto:admin@ejemplo.org
   ```

3. Aplique los cambios:

   ```bash
   docker compose up -d
   ```

4. Para confirmar, abra **Server Admin → Server Health** en B1Admin. Ambas claves de Web Push deben aparecer como configuradas. Después, los miembros pueden activar las notificaciones desde la aplicación web móvil.

:::warning
Mantenga las mismas claves una vez que los miembros se hayan inscrito. Si las cambia, se invalida cada suscripción existente y cada dispositivo tiene que registrarse de nuevo.
:::

## Datos, copias de seguridad y almacenamiento de archivos

Tres volúmenes de Docker con nombre guardan todo el estado:

| Volumen | Contenido |
|---------|-----------|
| `b1church_mysql-data` | Todos los esquemas de la base de datos |
| `b1church_api-content` | Archivos subidos: fotos, documentos, imágenes del sitio web |
| `b1church_caddy-data` | Certificados TLS |

`./deploy/b1 backup` escribe una copia consistente de los dos primeros volúmenes, más `.env`, en `backups/<fecha-hora>/`. Programe la ejecución con cron y copie la carpeta fuera de la máquina:

```
0 3 * * * cd /opt/b1church && ./deploy/b1 backup >> backups/backup.log 2>&1
```

Para bibliotecas multimedia grandes, puede cambiar el almacenamiento de archivos a S3: establezca `FILE_STORE=S3` más las variables `AWS_*` descritas en la [sección de Almacenamiento de archivos de la guía de Railway](./railway-template.md#5-file-storage). Las copias de la base de datos no incluyen los objetos de S3; active el control de versiones del bucket.

## Actualizar

```bash
./deploy/b1 upgrade
```

En orden: descarga la versión, toma una copia de seguridad, recrea los contenedores, ejecuta las migraciones de base de datos pendientes al arrancar la API y espera la comprobación de salud de la API. Si algo falla, se detiene y le indica ejecutar `./deploy/b1 rollback`, que restaura esa copia y la versión anterior. Las migraciones solo avanzan; revertir siempre significa restaurar la copia.

Si viene del archivo compose beta (el que compilaba las imágenes desde el código fuente), la actualización funciona igual cuando ya tenga un `.env`: ese archivo usaba `MYSQL_ROOT_PASSWORD=churchapps` por defecto, así que colóquelo en `.env` junto con `PUBLIC_URL` y `SITE_ADDRESS`, reemplace `docker-compose.yml` y `deploy/` por los archivos actuales y ejecute `./deploy/b1 upgrade`.

## Compilar desde el código fuente

Los desarrolladores pueden compilar las imágenes localmente en lugar de descargarlas:

```bash
docker compose -f docker-compose.yml -f docker-compose.build.yml up -d --build
```

`API_CONTEXT` y `B1APP_CONTEXT` en `.env` apuntan las compilaciones a copias locales (por ejemplo, `../Api`) o a una referencia de git.

## Solución de problemas

| Síntoma | Causa probable | Solución |
|---------|----------------|----------|
| El contenedor `api` se reinicia en bucle | Falla de una migración o contraseña incorrecta de la base de datos | `./deploy/b1 logs api`: la migración indica qué módulo falló |
| `api` registra "ENCRYPTION_KEY must be exactly 32 characters" | Clave editada a mano o truncada en `.env` | Restaure la clave original de 32 caracteres (genere una nueva solo si todavía no hay credenciales guardadas) |
| El navegador muestra una advertencia de certificado | El DNS aún no apunta aquí, o los puertos 80/443 están bloqueados | Corrija el DNS o el firewall; Caddy reintenta por su cuenta |
| `/` muestra un panel en lugar del sitio web | Todavía no hay iglesia, o `DEFAULT_CHURCH_SLUG` no coincide | Cree la iglesia, o establezca el identificador en **Settings → Church** |
| "Revise su correo", pero no llega ningún correo | `MAIL_SYSTEM=SMTP` con credenciales incorrectas | Corrija las credenciales, o quite `MAIL_SYSTEM` para desactivar el correo |
| La aplicación web móvil dice que las notificaciones push no están activadas | No hay claves VAPID en el servidor | Agréguelas como se describe en [Notificaciones push](#push-notifications) |
| El chat o las funciones en vivo no responden | Un proxy adicional bloquea el websocket | El socket está en `/api/` sobre el mismo puerto; permita las cabeceras `Upgrade` |
| `install` se niega: "database volume already exists" | Restos de una instalación anterior | `docker compose down -v` para borrar todo, o escriba un `.env` y use `upgrade` |

¿Sigue atascado? Abra un issue en [github.com/ChurchApps/ChurchAppsSupport/issues](https://github.com/ChurchApps/ChurchAppsSupport/issues) con la salida de `./deploy/b1 logs`.

## Artículos relacionados

- **[Autoalojamiento en Railway](./railway-template.md)**: alternativa de alojamiento administrado, más las guías compartidas de configuración posterior al despliegue
- **[Configuración inicial](../../getting-started/initial-setup.md)**: primeros pasos después de crear su iglesia
- **[Configuración local de la API](../api/local-setup.md)**: ejecute el stack directamente para desarrollo
