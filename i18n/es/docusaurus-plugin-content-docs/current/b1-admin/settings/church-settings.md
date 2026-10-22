---
title: "Configuración de la iglesia"
---

# Configuración de la iglesia

<div class="article-intro">

La página Church Settings es donde configuras la información básica de tu iglesia, sus datos de contacto y su imagen de marca. Estos datos se usan en todas las herramientas de ChurchApps, incluidos tu sitio web de B1.church y la aplicación móvil B1.

</div>

<div class="prereqs">
<h4>Antes de comenzar</h4>

- Necesitas el permiso "Edit Church Settings". Consulta [Roles y permisos](./roles-permissions.md) si no tienes acceso.
- Ten lista la dirección, la información de contacto y el logotipo de tu iglesia

</div>

## Editar la información de tu iglesia

1. En B1 Admin, abre el [menú Jump](../introduction.md#getting-around-with-the-jump-menu) (la barra de búsqueda en la parte superior izquierda), expande **Settings** y haz clic en **Settings**.
2. En la sección **Church Information** (en la parte superior de la página), haz clic en **Edit**.
3. Actualiza cualquiera de los siguientes campos:
   - **Church Name** -- El nombre que se muestra en todos los productos de ChurchApps.
   - **Address** -- La dirección física de tu iglesia.
   - **Contact Information** -- Número de teléfono, correo electrónico y otros datos de contacto.
   - **Time Zone** -- La zona horaria de tu iglesia. Consulta [Time Zone](#time-zone) más abajo.
4. Haz clic en **Save** para aplicar los cambios.

## Configurar tu subdominio

Tu iglesia recibe un subdominio gratuito en **tuiglesia.1.church**. Es la dirección web donde los miembros y visitantes pueden acceder a la presencia en línea de tu iglesia.

1. En la página Settings, haz clic en **Edit** en la sección **Church Information** y busca el campo **Subdomain**.
2. Escribe el subdominio que prefieras (por ejemplo, "gracechurch" para gracechurch.1.church).
3. Guarda los cambios.

:::info
Tu subdominio debe ser único entre todas las iglesias de ChurchApps. Si el nombre que quieres ya está en uso, prueba agregando tu ciudad o estado (por ejemplo, "gracechurch-dallas").
:::

Si quieres que los visitantes lleguen a tu sitio en tu propio dominio (por ejemplo, **www.gracechurch.org**), consulta [Dominio personalizado](./custom-domain.md).

## Configurar la imagen de marca

Personaliza cómo aparece tu iglesia en todas las herramientas de ChurchApps:

1. Sube el **logotipo de la iglesia** haciendo clic en el área del logotipo y seleccionando un archivo de imagen.
2. Agrega las **imágenes de la iglesia** adicionales que se usarán en tu sitio web y en la [aplicación móvil](./mobile-app.md).

:::tip
Para mejores resultados, usa un logotipo con fondo transparente en formato PNG. Así se verá bien tanto en fondos claros como oscuros.
:::

## Primer día de la semana

Elige qué día comienzan tus calendarios. El menú desplegable **First Day of Week** de la sección Church Info tiene como valor predeterminado **Sunday**, pero puedes configurar cualquier día. Una vez cambiado, se respeta en las cuadrículas de calendario de B1 Admin y en el portal de miembros de B1.church: los calendarios de grupos, los calendarios curados y el editor de eventos muestran las semanas comenzando en el día que elijas.

## Zona horaria

El menú desplegable **Time Zone** de la sección **Church Information** establece la zona horaria de tu iglesia (por ejemplo, *America/Chicago*). Elige **None** para dejarlo en blanco. Una vez guardada, la zona aparece en el resumen de Church Information.

B1 usa esta zona horaria para los horarios de toda la iglesia, como los recordatorios de eventos y los horarios de tus televisores de [FreePlay](../../freeplay/scheduled-mode/scheduling-the-calendar.md). Los [horarios de registro](../attendance/setup.md#setting-a-check-in-schedule) se miden primero según la zona horaria del [campus](./campuses.md) del servicio, y solo usan la zona horaria de la iglesia cuando ese campus no tiene una. Si todos tus campus están en la misma zona horaria, configúrala tanto en la iglesia como en cada campus.

## Región (formato de fecha y teléfono)

La configuración **Region** controla cómo se escriben las fechas y las horas en todo B1. De forma predeterminada, las fechas usan el formato de Estados Unidos (por ejemplo, "Sep 28, 2026" y "9/28/2026"). Las iglesias fuera de EE. UU. pueden cambiar a su propio formato; por ejemplo, al elegir English (United Kingdom) se muestran "28 Sept 2026" y "28/09/2026".

1. En la página Settings, haz clic en **Region** en la lista de la izquierda y luego en **Edit** en la sección **Region**.
2. Elige tu región en el menú desplegable **Region**. Cada opción muestra una fecha de ejemplo para que veas exactamente cómo se verán las fechas.
3. Haz clic en **Save**.

La sección Region muestra entonces la región seleccionada, un ejemplo del **Date format** y tu formato de **Phone numbers**.

### Formato de número de teléfono

La misma sección Region tiene una opción **Phone numbers** que controla cómo se introducen los números de teléfono en el registro de una persona:

- **International (with country code)** -- la opción predeterminada. Los campos de teléfono muestran un selector de bandera de país y guardan los números con el código de país (por ejemplo, +1 918 555 1234).
- **Local (as typed)** -- los campos de teléfono se convierten en cuadros de texto simples y guardan los números exactamente como los escribes, sin añadir código de país (por ejemplo, 0701 234 5678). Elige esta opción si tu iglesia escribe los números en formato local y no quieres que B1 añada un código de país.

Cuando se selecciona **Local**, la sección Region también muestra "Local phone numbers" junto a tu región.

:::tip
El envío de mensajes de texto funciona mejor cuando los números incluyen el código de país. Si envías mensajes desde B1, mantén el formato **International** o asegúrate de que los números que escribas en modo Local incluyan el código de país.
:::

Tu región se aplica a las fechas y horas en B1 Admin y en tu sitio web de B1.church y en el portal de miembros, incluidos los sermones, las entradas de blog, los calendarios de grupos y los planes de servicio, para que los miembros vean las fechas en el mismo formato que tu personal.

## Mensajes de texto {#texting}

Conecta un proveedor de mensajería para enviar SMS a una persona o a un grupo completo desde B1 Admin. Los mensajes se envían a través de tu propia cuenta con el proveedor, por lo que se aplican sus precios y límites.

1. En la página Settings, haz clic en **Texting** en la lista de la izquierda y luego en **Edit** en la sección **Texting**.
2. Elige un **Provider**:
   - **Clearstream** -- introduce una **API Key**. Créala en la configuración de tu cuenta de Clearstream, en API Keys.
   - **Text In Church** -- introduce una **API Key**. Primero pide a Text In Church Support acceso a la API para desarrolladores y luego crea una clave en la sección Account Settings > Developer API.
   - **Nalo Solutions** (Ghana) -- introduce la clave de autenticación de tu cuenta de Nalo Solutions como **API Key**, y un **Sender ID** (de hasta 11 caracteres) que Nalo haya aprobado para ti.
3. Haz clic en **Save**.

Para dejar de enviar mensajes, establece **Provider** en **None** y guarda. Esto elimina el proveedor guardado.

### Excluir a las personas que responden STOP

Una vez guardado un proveedor, vuelve a abrir la sección Texting con **Edit**. Debajo de la configuración del proveedor, un campo de solo lectura **Inbound (STOP) webhook URL** muestra una dirección web única para tu iglesia. Haz clic en el campo para seleccionar la dirección, cópiala y pégala en la configuración de webhook de mensajes entrantes (respuestas) de tu proveedor. Esto funciona con cualquiera de los proveedores anteriores que pueda reenviar las respuestas entrantes a un webhook.

Después, cuando alguien responda **STOP** (o STOPALL, UNSUBSCRIBE, CANCEL, END, QUIT, OPTOUT o REVOKE) a uno de tus mensajes, B1 busca a todas las personas cuyo número móvil coincida, las marca como excluidas y desactiva sus recordatorios por mensaje de texto. Después se omiten en los mensajes grupales. Las demás respuestas se ignoran.

:::info
Esto usa la misma configuración de exclusión que **Hide me from the member directory**, por lo que las personas que responden STOP también aparecen como **Hidden from directory** en su perfil. El campo solo aparece mientras el proveedor guardado está seleccionado; si cambias el menú desplegable a otro proveedor, guarda primero para volver a ver la URL.
:::

Una vez conectado un proveedor, el personal con permiso para enviar mensajes ve un botón **Text** en la página de un grupo (**Text this group**) y en la de una persona con teléfono móvil (**Send text message**). Escribe tu mensaje y haz clic en **Send**. El cuadro de diálogo cuenta los caracteres y los segmentos SMS. En el caso de un grupo, muestra cuántos miembros recibirán el mensaje antes de enviarlo:

- Los miembros sin teléfono móvil registrado se omiten.
- Los miembros que eligieron **Hide me from the member directory** se cuentan como excluidos y se omiten.
- Los miembros de una misma familia que comparten un número móvil reciben el mensaje solo una vez.

### Personalizar los mensajes con campos de combinación {#personalizing-texts-with-merge-fields}

Debajo del cuadro de mensaje, el cuadro de diálogo Text muestra etiquetas de marcador de posición: **First Name**, **Last Name**, **Display Name** y **Church Name**. Haz clic en una etiqueta para insertar su marcador (`{{firstName}}`, `{{lastName}}`, `{{displayName}}` o `{{churchName}}`) en la posición del cursor. Al enviar el mensaje, cada marcador se reemplaza con los datos del destinatario, de modo que un mensaje grupal como `Hi {{firstName}}, see you Sunday!` llega a cada miembro con su propio nombre. Los marcadores funcionan tanto en mensajes grupales como en mensajes a una sola persona.

:::info
El límite de 1,600 caracteres se aplica al mensaje tal como lo escribes. Una vez rellenados los marcadores, cualquier texto de más de 1,600 caracteres se corta en esa longitud.
:::

Los mensajes también pueden enviarse automáticamente desde un paso de un [flujo de trabajo](../serving/workflows.md#sending-a-text) con la acción **Send Text**, que usa el mismo proveedor y los mismos marcadores.

## Almacenamiento de archivos

De forma predeterminada, los archivos que subes a tu sitio web (a través de [Files](../website/files.md)) y a otras áreas de contenido usan el almacenamiento alojado gratuito de B1, de hasta 100 MB. Si necesitas más espacio, puedes conectar tu propio almacenamiento en la nube; las nuevas subidas van directamente a tu cuenta, sin límite de la plataforma.

1. En la página Settings, haz clic en **File Storage** en la lista de la izquierda y luego en **Edit** en la sección **File Storage**.
2. Elige un proveedor: **Google Drive**, **Dropbox**, **OneDrive** o un **bucket compatible con S3** (AWS S3, Cloudflare R2, Backblaze B2, etc.).
3. Para Google Drive, Dropbox u OneDrive, haz clic en **Connect** e inicia sesión para autorizar el acceso. Para un bucket compatible con S3, introduce tu clave de acceso, tu secreto, el nombre del bucket y la base de la URL pública.
4. Haz clic en **Save**.

:::info
Esto solo afecta a las nuevas subidas a los Files de tu sitio web y a áreas de contenido similares. Las imágenes de galería, las miniaturas, los logotipos y las fotos de personas siempre permanecen en el almacenamiento predeterminado de B1.
:::

## Promoción de grado

Si registras el **Grade** de niños y estudiantes, B1 puede subir automáticamente a todos un grado en una fecha que elijas (por ejemplo, el 1 de agosto), en lugar de obligarte a editar cada perfil a mano.

1. En la página Settings, haz clic en **Grade Promotion** en la lista de la izquierda y luego en **Edit** en la sección **Grade Promotion**.
2. Activa el interruptor (muestra **Enabled**) y elige el **Month** y el **Day** en que se promoverán los grados cada año. En esa fecha, todos los que tienen un grado suben un grado, y los alumnos de 12.º pasan a **Graduated**.
3. Guarda los cambios.

Para detener la promoción automática, desactiva el interruptor para que muestre **Disabled** y guarda. Se elimina la fecha de promoción y los grados ya no cambiarán por sí solos.

## Inscripción de voluntarios {#volunteer-signup}

De forma predeterminada, los miembros que consultan las [inscripciones de voluntarios](../../b1-church/serving/volunteer-signup.md) ven todas las semanas próximas que tienen puestos disponibles. Si esa lista se vuelve larga, puedes mostrar solo la siguiente semana de cada tipo de plan.

1. En la página Settings, haz clic en **Volunteer Signup** en la lista de la izquierda y luego en **Edit** en la sección **Volunteer Signup**.
2. Activa **Show only the next week of each plan type**.
3. Guarda los cambios.

Con esta opción activada, cada tipo de plan muestra solo su próximo plan. La semana siguiente aparece una vez que pasa esa fecha. La fila **Weeks shown** de la sección muestra **Only the next week of each plan type** o **All upcoming weeks**.

## Privacidad de las donaciones {#giving-privacy}

Las personas con acceso a las donaciones normalmente ven los totales de donaciones de una persona en su [registro de persona](../people/adding-people.md#editing-details). Si prefieres no mostrar los importes en pantalla cada vez que se abre un registro, puedes ocultarlos hasta que alguien los solicite.

1. En la página Settings, haz clic en **Giving privacy** en la lista de la izquierda y luego en **Edit** en la sección **Giving privacy**.
2. Activa **Hide giving on person records until clicked**.
3. Guarda los cambios.

Con esta opción activada, la tarjeta de donaciones de un registro de persona dice "Giving is hidden on person records." Haz clic en **Show giving** para cargar y mostrar las donaciones de esa persona. Vuelve a ocultarse al abrir otra persona. Quién puede ver las donaciones no cambia: solo las personas con acceso a donaciones ven la tarjeta.

## Importar y exportar

El enlace **Import/Export** debajo del nombre de tu iglesia en la página Settings abre una herramienta dedicada en una nueva ventana del navegador. Úsala para:

- Importar datos de miembros desde otro sistema de gestión de iglesias.
- Exportar tus datos de ChurchApps como copia de seguridad o para migrarlos.

Esto es especialmente útil cuando estás configurando por primera vez tu iglesia y necesitas transferir los registros existentes a ChurchApps.

:::warning
Al importar datos, haz primero una copia de seguridad de tus registros existentes. Las operaciones de importación añaden datos a tu sistema y pueden crear entradas duplicadas si se ejecutan varias veces.
:::
