---
title: "Autoalojamiento en Railway"
---

# Autoalojamiento en Railway

<div class="article-intro">

ChurchApps publica una [plantilla de Railway](https://railway.com) de un solo clic que le da a su iglesia su propia instancia privada de B1 Admin, el portal de miembros de B1, la API y una base de datos MySQL, todo ejecutándose en una infraestructura que usted posee y paga directamente. Esta guía lo deja funcionando en unos 15 minutos y después recorre la configuración posterior al despliegue que la mayoría de las iglesias termina queriendo.

</div>

## Inicio rápido

[![Desplegar en Railway](https://railway.com/button.svg)](https://railway.com/deploy/b1-template)

1. Haga clic en el botón **Deploy on Railway** de arriba.
2. Inicie sesión en Railway (o cree una cuenta gratuita) y agregue un método de pago.
3. Haga clic en **Deploy** sin cambiar nada: cada variable tiene un valor predeterminado razonable.
4. Espere de 5 a 10 minutos hasta que los cuatro servicios aparezcan en verde.
5. Abra la URL del servicio **B1Admin**, haga clic en **Register** y cree su cuenta. La primera cuenta se convierte automáticamente en administrador del servidor.
6. Siga las indicaciones de la aplicación para crear su primera iglesia.

Eso es todo. Ahora tiene una instancia de ChurchApps completamente funcional. Todo lo que sigue es opcional.

:::tip
El despliegue está actualmente en **beta**. Si encuentra algo que la documentación no cubre, abra un issue en [github.com/ChurchApps/Api/issues](https://github.com/ChurchApps/Api/issues) y adjunte los registros del despliegue.
:::

<div class="prereqs">
<h4>Lo que necesita</h4>

- Una cuenta gratuita de [Railway](https://railway.com)
- Una tarjeta de crédito registrada en Railway (~15–25 USD al mes para una congregación pequeña; consulte [Costos](#costs))
- Unos 15 minutos para el despliegue inicial
- *Opcional, pero muy recomendable después:* credenciales SMTP y un dominio personalizado

</div>

## Qué se despliega

La plantilla aprovisiona cuatro servicios en un solo proyecto de Railway:

| Servicio | Propósito | URL después del despliegue |
|----------|-----------|----------------------------|
| **MySQL** | Almacena todos los datos (una instancia, varios esquemas) | solo interna |
| **Api** | Backend para membresía, contenido, donaciones, asistencia, etc. | `https://api-<id>.up.railway.app` |
| **B1Admin** | Aplicación web para personal y administradores | `https://b1admin-<id>.up.railway.app` |
| **B1App** | Aplicación web para miembros y sitio web de la iglesia | `https://b1app-<id>.up.railway.app` |

Los esquemas de la base de datos se crean automáticamente en el primer arranque mediante la migración de inicio de la API.

## Configuración inicial

Ahora que está en línea, estas son las cosas que la mayoría de las iglesias configura después, aproximadamente en orden de prioridad.

### 1. Correo electrónico (muy recomendado) {#1-email-highly-recommended}

Sin correo electrónico, los miembros pueden registrarse y usar el sistema, pero **no pueden restablecer contraseñas olvidadas**; un administrador tiene que hacerlo por ellos. Configurar SMTP toma unos 5 minutos.

En el panel de Railway, abra el servicio **Api** → **Variables** y agregue:

```
MAIL_SYSTEM=SMTP
SMTP_HOST=<host de su proveedor>
SMTP_USER=<su usuario>
SMTP_PASS=<su contraseña o clave de API>
SMTP_SECURE=false
SUPPORT_EMAIL=noreply@suiglesia.org
```

Tres proveedores que conviene conocer:

#### Resend: la opción gratuita más sencilla (100 correos al día)

1. Regístrese en [resend.com](https://resend.com).
2. Verifique un dominio de envío (o use el remitente de prueba `onboarding@resend.dev` para empezar).
3. Cree una clave de API.
4. Establezca `SMTP_HOST=smtp.resend.com`, `SMTP_USER=resend`, `SMTP_PASS=re_xxxxxxxxx`.

#### Gmail: gratuito para uso personal (~500 al día)

1. Active la autenticación de dos factores en la cuenta de Google.
2. Cree una [Contraseña de aplicación](https://myaccount.google.com/apppasswords).
3. Establezca `SMTP_HOST=smtp.gmail.com`, `SMTP_USER=su-direccion@gmail.com`, `SMTP_PASS=<la contraseña de aplicación de 16 caracteres>`.

#### AWS SES: el más económico a gran escala

1. Verifique un dominio de envío en AWS.
2. Salga del modo sandbox de SES si va a enviar a direcciones no verificadas.
3. Cree credenciales SMTP en **SES → SMTP Settings → Create credentials**.
4. Establezca `SMTP_HOST=email-smtp.us-east-2.amazonaws.com`, `SMTP_USER=AKIA...`, `SMTP_PASS=<contraseña SMTP de SES>`.

Después de guardar las variables, el servicio Api se vuelve a desplegar automáticamente. Pruébelo iniciando un restablecimiento de contraseña en una cuenta de prueba.

:::warning
Si establece `MAIL_SYSTEM=SMTP` con credenciales incorrectas, el registro parecerá exitoso pero el correo de verificación nunca llegará. Corrija las credenciales o quite `MAIL_SYSTEM` para volver al modo sin correo electrónico.
:::

### 2. Dominios personalizados

Las URL predeterminadas `*.up.railway.app` funcionan, pero la mayoría de las iglesias quiere las suyas propias.

Para cada servicio web (B1Admin y B1App):

1. Abra el servicio en Railway → **Settings** → **Networking**.
2. Haga clic en **+ Custom Domain** e ingrese el nombre de host:
   - `admin.suiglesia.org` para B1Admin
   - `app.suiglesia.org` (o `www`) para B1App
3. Agregue en su proveedor de DNS el registro CNAME que le muestra Railway.
4. Espere unos minutos a que el DNS se propague. Railway emite el certificado TLS automáticamente.

Luego actualice las variables del servicio **Api** para que los enlaces de los correos usen los nuevos dominios:

```
B1ADMIN_ROOT=https://admin.suiglesia.org
```

Y en el servicio **B1Admin**:

```
REACT_APP_API_BASE=https://api.suiglesia.org   (si también configura un dominio personalizado para la API)
REACT_APP_B1_WEBSITE_URL=https://{subdomain}.suiglesia.org
```

El token `{subdomain}` es literal: se reemplaza en tiempo de ejecución con el subdominio de cada iglesia (vea Multisitio más abajo).

### 3. Multisitio (varias iglesias en una misma instancia) {#3-multi-site-multiple-churches-on-one-instance}

ChurchApps es multiinquilino por diseño: un solo despliegue puede alojar cualquier número de iglesias, cada una con sus propias personas, grupos y sitio web. Las nuevas iglesias se agregan completamente desde la interfaz de administración; no se necesitan cambios de infraestructura.

#### Agregar iglesias adicionales

1. En **B1 Admin**, vaya a **Settings → Manage Church → Switch Church → Create New**.
2. Cada iglesia tiene un **identificador de subdominio** único (por ejemplo, `primeraiglesia`, `comunidadgracia`).
3. La nueva iglesia tiene sus propios datos, miembros, sitio web y configuración de donaciones, totalmente aislados de las demás iglesias de la misma instancia.

#### Enrutar cada iglesia a su propia URL

Hay dos formas de exponer las iglesias públicamente:

| Patrón | Ejemplo | Configuración |
|--------|---------|---------------|
| **Basado en la ruta** (funciona de inmediato) | `app.suiglesia.org/primeraiglesia` | Sin configuración adicional |
| **Basado en subdominio** (URL más limpias) | `primeraiglesia.suiglesia.org` | DNS con comodín + dominio personalizado con comodín |

Para el enrutamiento **basado en subdominio** en Railway:

1. En su proveedor de DNS, cree un CNAME con comodín: `*.suiglesia.org → <destino de railway de b1app>`.
2. En Railway, en el servicio B1App → **Settings → Networking**, agregue `*.suiglesia.org` como dominio personalizado.
3. En el servicio **B1Admin**, establezca `REACT_APP_B1_WEBSITE_URL=https://{subdomain}.suiglesia.org`.

Después del nuevo despliegue, el sitio de cada iglesia se sirve automáticamente en `<su-subdominio>.suiglesia.org`.

:::info
Los dominios personalizados con comodín requieren un plan de pago de Railway. El enrutamiento basado en la ruta funciona en todos los planes y es funcionalmente idéntico; solo que la URL se ve menos elegante.
:::

### 4. Donaciones en línea (Stripe / PayPal) {#4-online-giving-stripe--paypal}

Las donaciones se configuran **por iglesia dentro de la interfaz de administración**, no mediante variables de entorno; así cada iglesia puede usar su propia cuenta de comerciante.

1. Obtenga las credenciales de desarrollador en [Stripe](https://dashboard.stripe.com/) (Developers → API keys) o en [PayPal](https://developer.paypal.com/) (My Apps & Credentials).
2. En B1 Admin, vaya a **Settings → Giving Settings**.
3. Elija su proveedor, pegue las claves pública y secreta, y configure el manejo de comisiones.
4. Opcionalmente, agregue `GOOGLE_RECAPTCHA_SECRET_KEY` al servicio **Api** en Railway para proteger los formularios públicos de donación contra bots.

### 5. Almacenamiento de archivos {#5-file-storage}

La plantilla aprovisiona un **volumen persistente de 1 GB** montado en el servicio Api para fotos de miembros, archivos de sermones y documentos subidos.

Para ampliarlo: abra el servicio Api → **Volumes** → ajuste el control deslizante del tamaño.

Para despliegues más grandes (más de 100 GB o muchas cargas simultáneas), cambie a S3 configurando estas variables en el servicio **Api**:

```
FILE_STORE=S3
AWS_S3_BUCKET=<su-bucket>
AWS_ACCESS_KEY_ID=<clave>
AWS_SECRET_ACCESS_KEY=<secreto>
AWS_REGION=us-east-2
```

Los archivos existentes en el volumen no se migran automáticamente; cópielos al bucket antes de cambiar la variable.

### 6. Integraciones opcionales de funciones {#6-optional-feature-integrations}

Estas activan funciones específicas y todas se pueden agregar más adelante desde el panel de Railway. Configúrelas en el servicio **Api**.

| Variable | Función que activa |
|----------|--------------------|
| `OPENAI_API_KEY` *o* `OPENROUTER_API_KEY` | Búsqueda asistida por IA y sugerencias de contenido |
| `YOUTUBE_API_KEY` | Búsqueda e inserción de sermones de YouTube |
| `PEXELS_KEY` | Selector de imágenes de stock para el creador de sitios web |
| `VIMEO_TOKEN` | Soporte de sermones de Vimeo |
| `API_BIBLE_KEY` | Búsqueda de versículos bíblicos en lecciones y contenido |
| `YOUVERSION_API_KEY` | Integración con la Biblia de YouVersion |
| `WEB_PUSH_PUBLIC_KEY` + `WEB_PUSH_PRIVATE_KEY` | Notificaciones push del navegador ([genere un par de claves VAPID](./docker#push-notifications)) |
| `HUBSPOT_KEY` | Sincronización opcional con CRM para nuevos registros |

## Actualizaciones

Cada servicio está vinculado a su repositorio de GitHub correspondiente. Los envíos a `main` en `ChurchApps/Api`, `ChurchApps/B1Admin` o `ChurchApps/B1App` activan despliegues automáticos.

Para fijar una versión específica, cambie la configuración **Branch** de cada servicio a una etiqueta o rama de lanzamiento. Esta es la configuración recomendada para producción, ya que desplegar automáticamente desde `main` le hereda cualquier trabajo en curso.

## Costos {#costs}

Rangos reales para una iglesia pequeña (menos de 200 miembros, tráfico ligero):

| Componente | Costo mensual aproximado |
|------------|--------------------------|
| Base de Railway | 5 USD |
| Plugin de MySQL | 5 USD + ~1 USD de almacenamiento |
| Cómputo de 3 servicios web | 3–10 USD en total |
| Volumen de 1 GB | 0.25 USD |
| **Total** | **~15–25 USD al mes** |

Los costos crecen de forma lineal con el tráfico, las cargas de fotos y el tamaño de la base de datos. Railway muestra el uso en tiempo real en la pestaña **Usage** del proyecto; configure límites de gasto allí para limitar su exposición.

## Solución de problemas

| Síntoma | Causa probable | Solución |
|---------|----------------|----------|
| La compilación falla con `EBUSY: rmdir '/app/node_modules/.cache'` | Conflicto con la caché de montaje de Nixpacks | Establezca `NIXPACKS_NO_CACHE=true` en el servicio afectado |
| La compilación de B1Admin falla con `Missing: @types/...` | `package-lock.json` desincronizado | Descargue la última versión de `main` |
| El despliegue de Api se queda en "Deploying" | La comprobación de salud falla: `/health` no devuelve 200 | Revise los registros del despliegue; normalmente falta una variable de entorno obligatoria |
| B1Admin muestra "revise su correo" pero no llega ningún correo | `MAIL_SYSTEM=SMTP` configurado, pero faltan o son incorrectas las credenciales | Corrija las credenciales, o quite `MAIL_SYSTEM` para desactivar el correo |
| El inicio de sesión redirige a `api.churchapps.org` | `REACT_APP_STAGE` es `prod` | Establezca `REACT_APP_STAGE=custom` en el servicio B1Admin |
| Todas las iglesias con subdominio muestran el mismo contenido | `REACT_APP_B1_WEBSITE_URL` no incluye el token `{subdomain}` | Establézcalo, por ejemplo, como `https://{subdomain}.suiglesia.org` |
| El dominio personalizado muestra "Application not found" | El DNS aún no se propagó, o el certificado de Railway está pendiente | Espere 5 minutos; verifique el DNS con `dig admin.suiglesia.org` |

Si encuentra algo que no aparece en esta lista, abra un issue en [github.com/ChurchApps/Api/issues](https://github.com/ChurchApps/Api/issues) y adjunte los registros del despliegue.

## Artículos relacionados

- **[Autoalojamiento con Docker](./docker)**: el mismo stack en su propio hardware o VPS
- **[Configuración inicial](../../getting-started/initial-setup)**: primeros pasos después de crear su iglesia
- **[Configuración inicial del sitio web](../../b1-admin/website/initial-setup)**: configure el sitio público de su iglesia
- **[Configuración de donaciones](../../b1-admin/donations/online-giving-setup)**: conecte Stripe o PayPal
- **[Configuración local de la API](../api/local-setup)**: ejecute el stack localmente para desarrollo
- **[Despliegue de la API (AWS)](./apis)**: cómo se despliega el SaaS oficial de ChurchApps
