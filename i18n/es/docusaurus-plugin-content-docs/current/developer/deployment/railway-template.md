---
title: "Auto-Alojamiento en Railway"
---

# Auto-Alojamiento en Railway

<div class="article-intro">

ChurchApps publica una plantilla de un clic en [Railway](https://railway.com) que le da a tu iglesia su propia instancia privada de B1 Admin, el portal de miembros de B1, la API, y una base de datos MySQL -- todo ejecutándose en infraestructura que posees y pagas directamente. Esta guía te pone en vivo en aproximadamente 15 minutos y luego te guía a través de la configuración post-implementación que la mayoría de iglesias eventualmente desean.

</div>

## Inicio Rápido

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/b1-template)

1. Haz clic en el botón **Deploy on Railway** arriba.
2. Inicia sesión en Railway (o crea una cuenta gratuita) y agrega un método de pago.
3. Haz clic en **Deploy** sin cambiar nada -- cada variable tiene un valor predeterminado sensato.
4. Espera 5–10 minutos para que los cuatro servicios se vuelvan verdes.
5. Abre la URL del servicio **B1Admin**, haz clic en **Register**, y crea tu cuenta. La primera cuenta es automáticamente un administrador del servidor.
6. Sigue las indicaciones en la aplicación para crear tu primera iglesia.

Eso es todo. Ahora tienes una instancia de ChurchApps completamente funcional. Todo lo que sigue abajo es pulido opcional.

:::tip
La implementación está actualmente en **beta**. Si encuentras algo que los documentos no cubren, abre un issue en [github.com/ChurchApps/Api/issues](https://github.com/ChurchApps/Api/issues) con los registros de implementación adjuntos.
:::

<div class="prereqs">
<h4>Qué necesitas</h4>

- Una cuenta gratuita de [Railway](https://railway.com)
- Una tarjeta de crédito registrada con Railway (~$15–25/mes para una congregación pequeña; consulta [Costos](#costos))
- Aproximadamente 15 minutos para la implementación inicial
- *Opcional pero muy recomendado más tarde:* credenciales SMTP y un dominio personalizado

</div>

## Qué Se Implementa

La plantilla aprovisiona cuatro servicios en un único proyecto de Railway:

| Servicio | Propósito | URL después de la implementación |
|---------|---------|------------------|
| **MySQL** | Almacena todos los datos (una instancia, múltiples esquemas) | solo interno |
| **Api** | Backend para membresía, contenido, donaciones, asistencia, etc. | `https://api-<id>.up.railway.app` |
| **B1Admin** | Aplicación web de personal/administrador | `https://b1admin-<id>.up.railway.app` |
| **B1App** | Aplicación web orientada a miembros y sitio web de iglesia | `https://b1app-<id>.up.railway.app` |

Los esquemas de base de datos se crean automáticamente en el primer lanzamiento por la migración de inicio de la API.

## Configuración de Primera Vez

Ahora que estás en línea, aquí están las cosas que la mayoría de las iglesias configuran a continuación, aproximadamente en orden de prioridad.

### 1. Correo (Altamente Recomendado)

Sin correo, los miembros aún pueden registrarse y usar el sistema, pero **no pueden restablecer contraseñas olvidadas** -- un administrador tiene que hacerlo por ellos. Configurar SMTP toma aproximadamente 5 minutos.

En el panel de Railway, abre el servicio **Api** → **Variables**, y agrega:

```
MAIL_SYSTEM=SMTP
SMTP_HOST=<host de tu proveedor>
SMTP_USER=<tu nombre de usuario>
SMTP_PASS=<tu contraseña o clave API>
SMTP_SECURE=false
SUPPORT_EMAIL=noreply@yourchurch.org
```

Tres proveedores que vale la pena conocer:

#### Resend — la opción gratuita más simple (100 correos/día)

1. Regístrate en [resend.com](https://resend.com).
2. Verifica un dominio de envío (o usa el remitente de prueba `onboarding@resend.dev` para comenzar).
3. Crea una clave API.
4. Establece `SMTP_HOST=smtp.resend.com`, `SMTP_USER=resend`, `SMTP_PASS=re_xxxxxxxxx`.

#### Gmail — gratuito para uso personal (~500/día)

1. Habilita la autenticación de dos factores en la cuenta de Google.
2. Crea una [Contraseña de Aplicación](https://myaccount.google.com/apppasswords).
3. Establece `SMTP_HOST=smtp.gmail.com`, `SMTP_USER=your-address@gmail.com`, `SMTP_PASS=<la contraseña de aplicación de 16 caracteres>`.

#### AWS SES — el más económico a escala

1. Verifica un dominio de envío en AWS.
2. Sal del sandbox de SES si enviarás a direcciones no verificadas.
3. Crea credenciales SMTP bajo **SES → SMTP Settings → Create credentials**.
4. Establece `SMTP_HOST=email-smtp.us-east-2.amazonaws.com`, `SMTP_USER=AKIA...`, `SMTP_PASS=<contraseña SMTP de SES>`.

Después de guardar las variables, el servicio Api se vuelve a implementar automáticamente. Pruébalo activando un restablecimiento de contraseña en una cuenta de prueba.

:::warning
Si estableces `MAIL_SYSTEM=SMTP` con credenciales incorrectas, el registro parecerá tener éxito pero el correo de verificación nunca llega. Arregla las credenciales o desactiva `MAIL_SYSTEM` para volver al modo sin correo.
:::

### 2. Dominios Personalizados

Las URLs predeterminadas `*.up.railway.app` funcionan, pero la mayoría de las iglesias quieren las suyas propias.

Para cada servicio web (B1Admin y B1App):

1. Abre el servicio en Railway → **Settings** → **Networking**.
2. Haz clic en **+ Custom Domain** e ingresa el nombre de host:
   - `admin.yourchurch.org` para B1Admin
   - `app.yourchurch.org` (o `www`) para B1App
3. Agrega el registro CNAME que Railway te muestra a tu proveedor DNS.
4. Espera unos minutos para que el DNS se propague. Railway aprovisiona el certificado TLS automáticamente.

Luego actualiza las variables del servicio **Api** para que los enlaces en correos usen los nuevos dominios:

```
B1ADMIN_ROOT=https://admin.yourchurch.org
```

Y en el servicio **B1Admin**:

```
REACT_APP_API_BASE=https://api.yourchurch.org   (si también estableces un dominio de API personalizado)
REACT_APP_B1_WEBSITE_URL=https://{subdomain}.yourchurch.org
```

El token `{subdomain}` es literal -- se reemplaza en tiempo de ejecución con el subdominio de cada iglesia (consulta Multi-Sitio abajo).

### 3. Multi-Sitio (Múltiples Iglesias en Una Instancia)

ChurchApps es multi-inquilino por diseño -- una implementación puede alojar cualquier número de iglesias, cada una con sus propias personas, grupos, y sitio web. Las nuevas iglesias se agregan completamente a través de la interfaz de admin; no se necesitan cambios de infraestructura.

#### Agregar iglesias adicionales

1. En **B1 Admin**, navega a **Settings → Manage Church → Switch Church → Create New**.
2. Cada iglesia tiene un **slug de subdominio** único (p. ej. `firstchurch`, `gracecommunity`).
3. La nueva iglesia obtiene sus propios datos, miembros, sitio web, y configuración de donaciones, completamente aislados de otras iglesias en la misma instancia.

#### Enrutar cada iglesia a su propia URL

Dos formas de exponer iglesias públicamente:

| Patrón | Ejemplo | Configuración |
|---------|---------|-------|
| **Basado en ruta** (funciona desde el inicio) | `app.yourchurch.org/firstchurch` | Sin configuración extra |
| **Basado en subdominio** (URLs más limpias) | `firstchurch.yourchurch.org` | DNS comodín + dominio personalizado comodín |

Para el enrutamiento **basado en subdominio** en Railway:

1. En tu proveedor DNS, crea un CNAME comodín: `*.yourchurch.org → <destino railway de b1app>`.
2. En Railway, en el servicio B1App → **Settings → Networking**, agrega `*.yourchurch.org` como un dominio personalizado.
3. En el servicio **B1Admin**, establece `REACT_APP_B1_WEBSITE_URL=https://{subdomain}.yourchurch.org`.

Después de la reimplementación, el sitio de cada iglesia se sirve en `<su-subdominio>.yourchurch.org` automáticamente.

:::info
Los dominios personalizados comodín requieren un plan pagado de Railway. El enrutamiento basado en ruta funciona en todos los planes y es funcionalmente idéntico -- solo menos bonito en la barra de URL.
:::

### 4. Donaciones en Línea (Stripe / PayPal)

Las donaciones se configuran **por iglesia dentro de la interfaz de admin**, no vía variables de entorno -- de esa manera cada iglesia puede usar su propia cuenta de comerciante.

1. Obtén credenciales de desarrollador de [Stripe](https://dashboard.stripe.com/) (Developers → API keys) o [PayPal](https://developer.paypal.com/) (My Apps & Credentials).
2. En B1 Admin, ve a **Settings → Giving Settings**.
3. Elige tu proveedor, pega las claves Pública y Secreta, y configura el manejo de tarifas.
4. Opcionalmente agrega `GOOGLE_RECAPTCHA_SECRET_KEY` al servicio **Api** en Railway para proteger los formularios de donación públicos de bots.

### 5. Almacenamiento de Archivos

La plantilla aprovisiona un **volumen persistente de 1 GB** montado en el servicio Api para fotos de miembros, archivos de sermones, y documentos subidos.

Para hacerlo crecer: abre el servicio Api → **Volumes** → ajusta el control deslizante de tamaño.

Para implementaciones más grandes (100+ GB o muchas cargas concurrentes), cambia a S3 estableciendo estos en el servicio **Api**:

```
FILE_STORE=S3
AWS_S3_BUCKET=<tu-bucket>
AWS_ACCESS_KEY_ID=<clave>
AWS_SECRET_ACCESS_KEY=<secreto>
AWS_REGION=us-east-2
```

Los archivos existentes en el volumen no migran automáticamente -- cópialos al bucket antes de cambiar la variable.

### 6. Integraciones de Características Opcionales

Estas desbloquean características específicas y todas se pueden agregar más tarde a través del panel de Railway. Establécelas en el servicio **Api**.

| Variable | Característica que habilita |
|----------|--------------------|
| `OPENAI_API_KEY` *o* `OPENROUTER_API_KEY` | Búsqueda asistida por IA y sugerencias de contenido |
| `YOUTUBE_API_KEY` | Búsqueda e incrustación de sermones de YouTube |
| `PEXELS_KEY` | Selector de imágenes de stock para el generador de sitios web |
| `VIMEO_TOKEN` | Soporte de sermones de Vimeo |
| `API_BIBLE_KEY` | Búsquedas de versículos bíblicos en lecciones y contenido |
| `YOUVERSION_API_KEY` | Integración de Biblia YouVersion |
| `WEB_PUSH_PUBLIC_KEY` + `WEB_PUSH_PRIVATE_KEY` | Notificaciones push del navegador (genera un par de claves VAPID) |
| `HUBSPOT_KEY` | Sincronización CRM opcional para nuevos registros |

## Actualización

Cada servicio está vinculado a su respectivo repositorio de GitHub. Los pushes a `main` en `ChurchApps/Api`, `ChurchApps/B1Admin`, o `ChurchApps/B1App` activan reimplementaciones automáticas.

Para fijar una versión específica, cambia el ajuste **Branch** en cada servicio a una etiqueta o rama de lanzamiento. Esta es la configuración recomendada para producción -- auto-implementar desde `main` significa que heredas cualquier trabajo en progreso.

## Costos

Rangos del mundo real para una iglesia pequeña (menos de 200 miembros, tráfico ligero):

| Componente | Costo mensual aproximado |
|-----------|---------------------|
| Base de Railway | $5 |
| Plugin MySQL | $5 + ~$1 almacenamiento |
| Cómputo de 3 servicios web | $3–10 combinados |
| Volumen de 1 GB | $0.25 |
| **Total** | **~$15–25/mes** |

Los costos escalan linealmente con el tráfico, cargas de fotos, y tamaño de base de datos. Railway muestra el uso en vivo en la pestaña **Usage** del proyecto -- establece límites de gasto allí para limitar tu exposición.

## Solución de Problemas

| Síntoma | Causa probable | Solución |
|---------|--------------|-----|
| La compilación falla con `EBUSY: rmdir '/app/node_modules/.cache'` | Conflicto de montaje de caché de Nixpacks | Establece `NIXPACKS_NO_CACHE=true` en el servicio afectado |
| La compilación falla en B1Admin con `Missing: @types/...` | `package-lock.json` desincronizado | Extrae el `main` más reciente |
| La implementación de Api se cuelga en "Deploying" | Falla en healthcheck -- `/health` no devuelve 200 | Ve los registros de implementación; usualmente una variable de entorno requerida faltante |
| B1Admin muestra "check your email" pero no llega ningún correo | `MAIL_SYSTEM=SMTP` establecido pero credenciales faltantes/incorrectas | Arregla las credenciales, o desactiva `MAIL_SYSTEM` para desactivar el correo |
| El inicio de sesión redirige a `api.churchapps.org` | `REACT_APP_STAGE` es `prod` | Establece `REACT_APP_STAGE=custom` en el servicio B1Admin |
| Las iglesias de subdominio muestran todas el mismo contenido | `REACT_APP_B1_WEBSITE_URL` no incluye el token `{subdomain}` | Establécelo a p. ej. `https://{subdomain}.yourchurch.org` |
| El dominio personalizado muestra "Application not found" | DNS aún no propagado, o certificado de Railway pendiente | Espera 5 minutos; verifica el DNS con `dig admin.yourchurch.org` |

Si encuentras algo que no está en esta lista, abre un issue en [github.com/ChurchApps/Api/issues](https://github.com/ChurchApps/Api/issues) con los registros de implementación adjuntos.

## Artículos Relacionados

- **[Auto-Alojamiento con Docker](./docker)** — El mismo stack en tu propio hardware o VPS
- **[Configuración Inicial](../../getting-started/initial-setup)** — Primeros pasos después de que se crea tu iglesia
- **[Configuración Inicial del Sitio Web](../../b1-admin/website/initial-setup)** — Configura el sitio público de tu iglesia
- **[Configuración de Donaciones](../../b1-admin/donations/online-giving-setup)** — Conecta Stripe o PayPal
- **[Configuración Local de API](../api/local-setup)** — Ejecutar el stack localmente para desarrollo
- **[Implementación de API (AWS)](./apis)** — Cómo se implementa el SaaS oficial de ChurchApps
