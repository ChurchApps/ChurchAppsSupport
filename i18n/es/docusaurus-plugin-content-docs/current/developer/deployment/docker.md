---
title: "Autoalojamiento con Docker"
---

# Autoalojamiento con Docker

<div class="article-intro">

Ejecute su propia instancia privada de B1 Admin, el portal de miembros y el sitio web de B1, la API y una base de datos MySQL en cualquier equipo con Docker: un servidor doméstico, un VPS pequeño o un equipo local. Un solo comando la instala y otro la actualiza, y cada actualización crea primero una copia de seguridad. Si prefiere no administrar un servidor, consulte [Autoalojamiento en Railway](./railway-template) como alternativa gestionada.

</div>

## Inicio rápido

<div class="prereqs">
<h4>Lo que necesita</h4>

- Un equipo Linux (o macOS / Windows con WSL o Git Bash; el asistente `b1` es un script de bash) con [Docker Engine](https://docs.docker.com/engine/install/) y Compose v2 (incluido en Docker Desktop)
- Unos 2 GB de RAM y 5 GB de disco
- Para un sitio público: un nombre de dominio apuntando al equipo, con los puertos 80 y 443 accesibles

</div>

```bash
curl -fsSL https://raw.githubusercontent.com/ChurchApps/B1Admin/main/deploy/install.sh | bash -s -- --domain church.example.org
```

Omita `--domain` para ejecutarlo en `http://localhost`. El instalador crea una carpeta `b1church`, escribe un `.env` con secretos recién generados, descarga las imágenes preconstruidas desde GitHub Container Registry y espera hasta que la API informe que está en buen estado. No se compila nada en su equipo, así que el primer inicio tarda uno o dos minutos.

Cuando termine:

1. Abra **https://church.example.org/admin** (o http://localhost/admin) y haga clic en **Registrarse**. La primera cuenta es automáticamente un administrador del servidor.
2. Siga las indicaciones de la aplicación para crear su primera iglesia. Su sitio web y su portal de miembros estarán disponibles en **https://church.example.org/** en cuanto exista.

Todo funciona detrás de un único dominio:

| Ruta | Servicio |
|------|----------|
| `/` | B1App: sitio web de la iglesia y portal de miembros |
| `/admin` | B1Admin: panel del personal |
| `/api` | API, archivos subidos y el websocket de actualizaciones en vivo |

HTTPS es automático: el proxy [Caddy](https://caddyserver.com/) incluido obtiene y renueva un certificado de Let's Encrypt para el dominio definido en `.env`. Solo los puertos 80 y 443 están expuestos; la base de datos solo es accesible desde dentro de la red de Docker.

## El comando `b1`

El instalador deja un script `deploy/b1` junto a `docker-compose.yml`. Es lo único que necesita en el día a día:

| Comando | Qué hace |
|---------|----------|
| `./deploy/b1 upgrade` | Descarga la versión actual, crea una copia de seguridad, reinicia y verifica que la API esté en buen estado |
| `./deploy/b1 upgrade 2026.10.1` | Igual, pero fijado a una versión específica |
| `./deploy/b1 backup` | Crea una instantánea de la base de datos, los archivos subidos y `.env` en `backups/<timestamp>/` |
| `./deploy/b1 restore backups/<timestamp>` | Restaura una instantánea (la API se detiene mientras se ejecuta) |
| `./deploy/b1 rollback` | Restaura la copia de seguridad más reciente, incluida la versión en la que se tomó |
| `./deploy/b1 status` | Versión instalada y estado de los contenedores |
| `./deploy/b1 logs api` | Muestra en tiempo real los registros de un servicio |

Las versiones se publican como un paquete versionado único para que las tres imágenes siempre coincidan. `B1_VERSION=stable` en `.env` sigue la última versión; establezca una versión específica para fijarla. Las notas de cada versión están en [versiones de B1Admin](https://github.com/ChurchApps/B1Admin/releases).

## Configuración

Toda la configuración está en `.env`, junto a `docker-compose.yml`. El instalador completa las obligatorias:

```bash
B1_VERSION=stable
DOMAIN=church.example.org
SITE_ADDRESS=church.example.org          # what Caddy serves; http://localhost for a local install
PUBLIC_URL=https://church.example.org    # how browsers and emails reach the site
MYSQL_ROOT_PASSWORD=…                    # generated
JWT_SECRET=…                             # generated
ENCRYPTION_KEY=…                         # generated, exactly 32 characters — never change it after storing credentials

# Email — strongly recommended; without it members can't reset their own passwords
MAIL_SYSTEM=SMTP
SMTP_HOST=smtp.resend.com
SMTP_USER=resend
SMTP_PASS=re_xxxxxxxxx
SMTP_SECURE=false
SUPPORT_EMAIL=noreply@church.example.org
```

Después de editar `.env`, aplíquelo con `docker compose up -d`. Las aplicaciones web determinan a qué API conectarse a partir de la dirección del navegador, por lo que cambiar el dominio solo requiere actualizar `SITE_ADDRESS` y `PUBLIC_URL` y reiniciar; no hace falta recompilar.

:::warning
Guarde `.env` en un lugar seguro. `ENCRYPTION_KEY` protege las credenciales almacenadas de la pasarela de pago y del almacenamiento; una copia de seguridad sin ella no puede descifrarlas. `./deploy/b1 backup` incluye una copia de esta clave por ese motivo.
:::

### Cambiar a un dominio más adelante

Si instaló en `localhost` y luego quiere hacerlo público: apunte el DNS al equipo, defina `DOMAIN`, `SITE_ADDRESS` (solo el dominio) y `PUBLIC_URL` (`https://` más el dominio) en `.env`, y ejecute `docker compose up -d`. Caddy obtendrá un certificado en la primera solicitud.

## Correo electrónico, donaciones, multisitio e integraciones

Estos funcionan exactamente igual que en Railway: las mismas variables de entorno, definidas en `.env` en lugar del panel de Railway:

- **[Correo electrónico / SMTP](./railway-template#1-email-highly-recommended)**: guías de proveedores para Resend, Brevo y Gmail
- **[Multisitio](./railway-template#3-multi-site-multiple-churches-on-one-instance)**: iglesias ilimitadas por instancia. `/` sirve la iglesia cuyo slug es `DEFAULT_CHURCH_SLUG` (la primera iglesia es `church`); apunte dominios adicionales al equipo y asígnelos en **Configuración → Dominios** en B1Admin
- **[Donaciones en línea](./railway-template#4-online-giving-stripe--paypal)**: se configuran por iglesia en la interfaz de administración
- **[Integraciones opcionales](./railway-template#6-optional-feature-integrations)**: `OPENAI_API_KEY`, `YOUTUBE_API_KEY`, `PEXELS_KEY`, `VIMEO_TOKEN`, `API_BIBLE_KEY`, `WEB_PUSH_*`, `GOOGLE_RECAPTCHA_SECRET_KEY`

Las invitaciones y otros correos enviados por la iglesia se habilitan automáticamente en una instancia autoalojada (el servicio alojado los somete a una revisión manual para proteger su reputación de envío).

## Datos, copias de seguridad y almacenamiento de archivos

Tres volúmenes de Docker con nombre contienen todo el estado:

| Volumen | Contenido |
|---------|-----------|
| `b1church_mysql-data` | Todos los esquemas de la base de datos |
| `b1church_api-content` | Archivos subidos: fotos, documentos, imágenes del sitio web |
| `b1church_caddy-data` | Certificados TLS |

`./deploy/b1 backup` escribe una instantánea coherente de los dos primeros, además de `.env`, en `backups/<timestamp>/`. Programe la copia con cron y copie la carpeta fuera del equipo:

```
0 3 * * * cd /opt/b1church && ./deploy/b1 backup >> backups/backup.log 2>&1
```

Para bibliotecas multimedia grandes, puede cambiar el almacenamiento de archivos a S3: configure `FILE_STORE=S3` junto con las variables `AWS_*` descritas en la sección [Almacenamiento de archivos](./railway-template#5-file-storage) de la guía de Railway. Las copias de seguridad de la base de datos no incluyen los objetos de S3; active el control de versiones del bucket.

## Actualización

```bash
./deploy/b1 upgrade
```

En orden: descarga la versión, crea una copia de seguridad, recrea los contenedores, ejecuta las migraciones de base de datos pendientes al iniciar la API y espera la comprobación de estado de la API. Si algo falla, se detiene e indica que ejecute `./deploy/b1 rollback`, que restaura esa copia de seguridad y la versión anterior. Las migraciones solo avanzan; revertir siempre implica restaurar la instantánea.

Si actualiza desde el archivo compose beta (el que compilaba las imágenes desde el código fuente), el proceso es el mismo una vez que tenga un `.env`: ese archivo usaba `MYSQL_ROOT_PASSWORD=churchapps` por defecto, así que ponga ese valor en `.env` junto con `PUBLIC_URL` y `SITE_ADDRESS`, reemplace `docker-compose.yml` y `deploy/` por los archivos actuales y ejecute `./deploy/b1 upgrade`.

## Compilar desde el código fuente

Los desarrolladores pueden compilar las imágenes localmente en lugar de descargarlas:

```bash
docker compose -f docker-compose.yml -f docker-compose.build.yml up -d --build
```

`API_CONTEXT` y `B1APP_CONTEXT` en `.env` apuntan las compilaciones a copias locales (por ejemplo, `../Api`) o a una referencia de git.

## Solución de problemas

| Síntoma | Causa probable | Solución |
|---------|----------------|----------|
| El contenedor `api` se reinicia en bucle | fallo de migración o contraseña de base de datos incorrecta | `./deploy/b1 logs api`; la migración indica qué módulo falló |
| `api` registra "ENCRYPTION_KEY must be exactly 32 characters" | clave modificada a mano o truncada en `.env` | restaure la clave original de 32 caracteres (genere una nueva solo si aún no hay credenciales guardadas) |
| El navegador muestra una advertencia de certificado | el DNS todavía no apunta aquí, o los puertos 80/443 están bloqueados | corrija el DNS o el firewall; Caddy reintenta por sí solo |
| `/` muestra un panel en lugar del sitio web | aún no hay iglesia, o `DEFAULT_CHURCH_SLUG` no coincide | cree la iglesia o defina el slug en **Configuración → Iglesia** |
| "Revise su correo electrónico" pero no llega ningún correo | `MAIL_SYSTEM=SMTP` con credenciales incorrectas | corrija las credenciales o quite `MAIL_SYSTEM` para desactivar el correo |
| El chat o las funciones en vivo no responden | un proxy delante bloquea el websocket | el socket está en `/api/` por el mismo puerto; permita los encabezados `Upgrade` |
| `install` se rechaza: "database volume already exists" | restos de una instalación anterior | ejecute `docker compose down -v` para borrar todo, o escriba un `.env` y use `upgrade` |

¿Sigue sin resolverlo? Abra una incidencia en [github.com/ChurchApps/ChurchAppsSupport/issues](https://github.com/ChurchApps/ChurchAppsSupport/issues) con la salida de `./deploy/b1 logs`.

## Artículos relacionados

- **[Autoalojamiento en Railway](./railway-template)**: alternativa de alojamiento gestionado, además de las guías de configuración posterior al despliegue
- **[Configuración inicial](../../getting-started/initial-setup)**: primeros pasos después de crear su iglesia
- **[Configuración local de la API](../api/local-setup)**: ejecutar la plataforma directamente para desarrollo
