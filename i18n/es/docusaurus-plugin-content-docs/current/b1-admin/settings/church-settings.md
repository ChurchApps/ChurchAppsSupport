---
title: "Configuración de la iglesia"
description: "Configura el nombre, la dirección, el subdominio, la zona horaria, el formato regional, el proveedor de mensajes de texto y el almacenamiento de archivos de tu iglesia en la página de Configuración de la iglesia de B1 Admin."
---

# Configuración de la iglesia

<div class="article-intro">

La página de Configuración de la iglesia es donde configuras la información básica de tu iglesia, sus datos de contacto y su imagen de marca. Estos datos se usan en todas las herramientas de ChurchApps, incluidos tu sitio web B1.church y la aplicación B1 App.

</div>

## Video de capacitación

<YouTube id="634zSbzDkYA" title="Configurar la información y la imagen de marca de la iglesia en B1" next="Roles, permisos e invitación de tu equipo en B1" nextUrl="/docs/b1-admin/settings/roles-permissions" />

<div class="prereqs">
<h4>Antes de comenzar</h4>

- Necesitas el permiso "Editar configuración de la iglesia". Consulta [Roles y permisos](./roles-permissions.md) si no tienes acceso.
- Ten listos la dirección, los datos de contacto y el logotipo de tu iglesia.

</div>

## Editar la información de tu iglesia

1. En B1 Admin, abre el [menú Jump](../introduction.md#getting-around-with-the-jump-menu) (la barra de búsqueda en la parte superior izquierda), expande **Settings** y haz clic en **Settings**.
2. En la sección **Church Information** (en la parte superior de la página), haz clic en **Edit**.
3. Actualiza cualquiera de los siguientes campos:
   - **Church Name** -- El nombre que se muestra en todos los productos de ChurchApps.
   - **Address** -- La dirección física de tu iglesia.
   - **Contact Information** -- Número de teléfono, correo electrónico y otros datos de contacto.
   - **Time Zone** -- La zona horaria de tu iglesia. Consulta [Time Zone](#time-zone) más abajo.
4. Haz clic en **Save** para aplicar tus cambios.

## Configurar tu subdominio

Tu iglesia recibe un subdominio gratuito en **yourchurch.1.church**. Es la dirección web donde los miembros y visitantes pueden acceder a la presencia en línea de tu iglesia.

1. En la página Settings, haz clic en **Edit** en la sección **Church Information** y localiza el campo **Subdomain**.
2. Escribe el subdominio que prefieras (por ejemplo, "gracechurch" para gracechurch.1.church).
3. Guarda tus cambios.

:::info
Tu subdominio debe ser único entre todas las iglesias de ChurchApps. Si el nombre que quieres ya está en uso, prueba agregando tu ciudad o estado (por ejemplo, "gracechurch-dallas").
:::

Si quieres que los visitantes lleguen a tu sitio en tu propio dominio (por ejemplo, **`www.gracechurch.org`**), consulta [Dominio personalizado](./custom-domain.md).

## Configurar la imagen de marca

Personaliza cómo aparece tu iglesia en todas las herramientas de ChurchApps:

1. Sube el **logotipo de la iglesia** haciendo clic en el área del logotipo y seleccionando un archivo de imagen.
2. Agrega cualquier **imagen adicional de la iglesia** que se use en tu sitio web y en la [aplicación móvil](./mobile-app.md).

:::tip
Para obtener mejores resultados, usa un logotipo con fondo transparente en formato PNG. Así se verá bien tanto en fondos claros como oscuros.
:::

## Primer día de la semana

Elige el día en que comienzan tus calendarios. El menú desplegable **First Day of Week** de la sección Church Info tiene como valor predeterminado **Sunday**, pero puedes configurarlo en cualquier otro día. Una vez cambiado, se aplica en las cuadrículas de calendario de B1 Admin y del portal de miembros de B1.church: los calendarios de grupos, los calendarios personalizados y el editor de eventos muestran las semanas comenzando por el día que elijas.

## Zona horaria

El menú desplegable **Time Zone** de la sección **Church Information** define la zona horaria de tu iglesia (por ejemplo, *America/Chicago*). Elige **None** para dejarlo en blanco. Una vez guardada, la zona aparece en el resumen de Church Information.

B1 usa esta zona horaria para las horas de toda la iglesia, como los recordatorios de eventos y los horarios de tus televisores de [FreePlay](../../freeplay/scheduled-mode/scheduling-the-calendar.md). Los [horarios de registro de entrada](../attendance/setup.md#setting-a-check-in-schedule) se miden primero con la zona horaria del [campus](./campuses.md) donde se celebra el servicio, y solo usan la zona horaria de la iglesia cuando ese campus no tiene una. Si todos tus campus están en la misma zona horaria, configúrala tanto en la iglesia como en cada campus.

## Región (formato de fecha y teléfono)

La configuración **Region** controla cómo se escriben las fechas y las horas en todo B1. De forma predeterminada, las fechas usan el formato de Estados Unidos (por ejemplo, "Sep 28, 2026" y "9/28/2026"). Las iglesias fuera de EE. UU. pueden cambiar a su propio formato. Por ejemplo, si eliges English (United Kingdom), se mostrará "28 Sept 2026" y "28/09/2026".

1. En la página Settings, haz clic en **Region** en la lista de la izquierda y después en **Edit** en la sección **Region**.
2. Elige tu región en el menú desplegable **Region**. Cada opción muestra una fecha de ejemplo para que veas exactamente cómo se verán las fechas.
3. Haz clic en **Save**.

La sección Region mostrará entonces la región seleccionada, un ejemplo del **Date format** y tu formato de **Phone numbers**.

### Formato de números de teléfono

La misma sección Region tiene una configuración de **Phone numbers** que controla cómo se ingresan los números de teléfono en el registro de cada persona:

- **International (with country code)** -- la opción predeterminada. Los campos de teléfono muestran un selector de bandera del país y guardan los números con el código de país (por ejemplo, +1 918 555 1234).
- **Local (as typed)** -- los campos de teléfono se convierten en cuadros de texto simples y guardan los números exactamente como los escribes, sin agregar código de país (por ejemplo, 0701 234 5678). Elige esta opción si tu iglesia escribe los números en formato local y no quieres que B1 agregue un código de país.

Cuando se selecciona **Local**, la sección Region también muestra "Local phone numbers" junto a tu región.

:::tip
El envío de mensajes de texto funciona mejor cuando los números incluyen el código de país. Si envías mensajes desde B1, mantén el formato **International** o asegúrate de que los números que escribas en modo Local incluyan el código de país.
:::

Tu región se aplica a las fechas y horas en B1 Admin y en tu sitio web B1.church y en el portal de miembros, incluidos los sermones, las entradas del blog, los calendarios de grupos y los planes de servicio, para que los miembros vean las fechas en el mismo formato que tu personal.

## Mensajes de texto {#texting}

Conecta un proveedor de mensajes de texto para enviar SMS a una persona o a un grupo completo desde B1 Admin. Los mensajes se envían a través de tu propia cuenta con el proveedor, por lo que se aplican sus tarifas y límites.

1. En la página Settings, haz clic en **Texting** en la lista de la izquierda y después en **Edit** en la sección **Texting**.
2. Elige un **Provider**:
   - **Clearstream** -- ingresa una **API Key**. Créala en la configuración de tu cuenta de Clearstream, en API Keys.
   - **Text In Church** -- ingresa una **API Key**. Primero pide acceso a la API para desarrolladores al equipo de soporte de Text In Church y luego crea una clave en la sección Account Settings > Developer API.
   - **Nalo Solutions** (Ghana) -- ingresa la clave de autenticación de tu cuenta de Nalo Solutions como **API Key**, y un **Sender ID** (de hasta 11 caracteres) que Nalo haya aprobado para ti.
   - **Twilio** -- usa la cuenta de Twilio de tu iglesia; Twilio te factura directamente. Copia el **Account SID** y el **Auth Token** desde la [Consola de Twilio](https://console.twilio.com) e ingresa un **From Number**: un número de teléfono de Twilio registrado para A2P 10DLC, con un formato como `+15551234567`. Después de guardar, pega la URL del webhook de entrada (consulta más abajo) en el webhook **A message comes in** del número en Twilio, para que las respuestas STOP también se registren en B1.
3. Haz clic en **Save**.

Para dejar de enviar mensajes de texto, cambia **Provider** a **None** y guarda. Esto elimina el proveedor guardado.

### Excluir de los mensajes a las personas que responden STOP

Una vez guardado un proveedor, vuelve a abrir la sección Texting con **Edit**. Debajo de la configuración del proveedor, un campo de solo lectura **Inbound (STOP) webhook URL** muestra una dirección web exclusiva de tu iglesia. Haz clic en el campo para seleccionar la dirección, cópiala y pégala en la configuración de webhook de mensajes entrantes (respuestas) de tu proveedor de mensajes de texto. Esto funciona con cualquiera de los proveedores anteriores que puedan reenviar las respuestas entrantes a un webhook.

Después, cuando alguien responda **STOP** (o STOPALL, UNSUBSCRIBE, CANCEL, END, QUIT, OPTOUT o REVOKE) a uno de tus mensajes, B1 buscará a todas las personas cuyo número de celular coincida, las marcará como excluidas y desactivará sus recordatorios de texto. Luego se omitirán en los mensajes grupales. Las demás respuestas se ignoran.

:::info
Esto usa la misma configuración de exclusión que **Ocultarme del directorio de miembros**, por lo que las personas que respondan STOP también aparecerán como **Hidden from directory** en su perfil. El campo solo aparece cuando el proveedor guardado está seleccionado. Si cambias el menú desplegable a otro proveedor, guarda primero para volver a ver la URL.
:::

Cuando un proveedor esté conectado, el personal con permiso para enviar mensajes verá un botón **Text** en la página de un grupo (**Text this group**) y en la de una persona con teléfono celular (**Send text message**). Escribe tu mensaje y haz clic en **Send**. El cuadro de diálogo cuenta los caracteres y los segmentos SMS. En el caso de un grupo, muestra cuántos miembros recibirán el mensaje antes de enviarlo:

- Los miembros sin teléfono celular registrado se omiten.
- Los miembros que eligieron **Ocultarme del directorio de miembros** se cuentan como excluidos y se omiten.
- Los miembros de una misma familia que comparten un número celular reciben el mensaje solo una vez.

### Personalizar los mensajes con campos de combinación {#personalizing-texts-with-merge-fields}

Debajo del cuadro del mensaje, el cuadro de diálogo Text muestra fichas de marcador de posición: **First Name**, **Last Name**, **Display Name** y **Church Name**. Haz clic en una ficha para insertar su marcador (`{{firstName}}`, `{{lastName}}`, `{{displayName}}` o `{{churchName}}`) en la posición del cursor. Cuando se envía el mensaje, cada marcador se reemplaza con los datos de ese destinatario, así que un mensaje grupal como `Hi {{firstName}}, see you Sunday!` llega a cada miembro con su propio nombre. Los marcadores funcionan tanto en los mensajes grupales como en los enviados a una sola persona. Los mensajes a un grupo también ofrecen una ficha **Group Name** (`{{groupName}}`), que se reemplaza por el nombre del grupo.

Para reutilizar un mensaje, guárdalo como una [plantilla de texto](./email-templates.md#text-templates) (una plantilla de correo electrónico con la categoría **Text**) y selecciónala en **Load Template (optional)** en la parte superior de la ventana Text.

:::info
El límite de 1,600 caracteres se aplica al mensaje tal como lo escribes. Una vez completados los marcadores, cualquier texto que supere los 1,600 caracteres se corta en ese punto.
:::

Los mensajes de texto también pueden enviarse automáticamente desde un paso de un [flujo de trabajo](../serving/workflows.md#sending-a-text) con la acción **Send Text**, que usa el mismo proveedor y los mismos marcadores.

## Almacenamiento de archivos

De forma predeterminada, los archivos que subes a tu sitio web (a través de [Files](../website/files.md)) y a otras áreas de contenido usan el almacenamiento alojado gratuito de B1, de hasta 100 MB. Si necesitas más espacio, puedes conectar tu propio almacenamiento en la nube. Así, las nuevas cargas se guardan directamente en tu cuenta sin límite de la plataforma.

1. En la página Settings, haz clic en **File Storage** en la lista de la izquierda y después en **Edit** en la sección **File Storage**.
2. Elige un proveedor: **Google Drive**, **Dropbox**, **OneDrive** o un **bucket compatible con S3** (AWS S3, Cloudflare R2, Backblaze B2, etc.).
3. En el caso de Google Drive, Dropbox u OneDrive, haz clic en **Connect** e inicia sesión para autorizar el acceso. Para un bucket compatible con S3, ingresa tu clave de acceso, la clave secreta, el nombre del bucket y la URL base pública.
4. Haz clic en **Save**.

:::info
Esto solo afecta a las nuevas cargas en Files de tu sitio web y en áreas de contenido similares. Las imágenes de galería, las miniaturas, los logotipos y las fotos de personas siempre permanecen en el almacenamiento predeterminado de B1.
:::

## Promoción de grado

Si registras el **Grade** de niños y estudiantes, B1 puede subir automáticamente a todos un grado en la fecha que elijas (por ejemplo, el 1 de agosto), sin que tengas que editar cada perfil manualmente.

1. En la página Settings, haz clic en **Grade Promotion** en la lista de la izquierda y después en **Edit** en la sección **Grade Promotion**.
2. Activa el interruptor (debe mostrar **Enabled**) y elige el **Month** y el **Day** en que se promoverán los grados cada año. En esa fecha, todos los que tengan un grado subirán un grado, y los estudiantes de 12.º grado pasarán a **Graduated**.
3. Guarda tus cambios.

Para detener la promoción automática, desactiva el interruptor para que muestre **Disabled** y guarda. Se eliminará la fecha de promoción y los grados ya no cambiarán por sí solos.

## Inscripción de voluntarios {#volunteer-signup}

De forma predeterminada, los miembros que consultan las [inscripciones de voluntarios](../../b1-church/serving/volunteer-signup.md) ven todas las semanas próximas que tienen puestos disponibles. Si esa lista es muy larga, puedes mostrar solo la siguiente semana de cada tipo de plan.

1. En la página Settings, haz clic en **Volunteer Signup** en la lista de la izquierda y después en **Edit** en la sección **Volunteer Signup**.
2. Activa **Show only the next week of each plan type**.
3. Guarda tus cambios.

Con esta opción activada, cada tipo de plan muestra solo su próximo plan. La semana siguiente aparece cuando pasa esa fecha. La fila **Weeks shown** de la sección indica **Only the next week of each plan type** o **All upcoming weeks**.

## Privacidad de las donaciones {#giving-privacy}

Las personas con acceso a las donaciones normalmente ven los totales de donaciones de una persona en su [registro de persona](../people/adding-people.md#editing-details). Si prefieres que los montos no aparezcan en pantalla cada vez que se abre un registro, puedes ocultarlos hasta que alguien los solicite.

1. En la página Settings, haz clic en **Giving privacy** en la lista de la izquierda y después en **Edit** en la sección **Giving privacy**.
2. Activa **Hide giving on person records until clicked**.
3. Guarda tus cambios.

Con esta opción activada, la tarjeta de donaciones en el registro de una persona muestra "Giving is hidden on person records." Haz clic en **Show giving** para cargar y mostrar las donaciones de esa persona. Vuelve a ocultarse cuando abres el registro de otra persona. Quién puede ver las donaciones no cambia: solo las personas con acceso a donaciones ven la tarjeta.

## Importación y exportación

El enlace **Import/Export** debajo del nombre de tu iglesia en la página Settings abre una herramienta específica en una nueva ventana del navegador. Úsala para:

- Importar datos de miembros desde otro sistema de gestión de iglesias.
- Exportar tus datos de ChurchApps como copia de seguridad o para migrarlos.

Esto es especialmente útil cuando estás configurando tu iglesia por primera vez y necesitas transferir registros existentes a ChurchApps.

:::warning
Al importar datos, haz primero una copia de seguridad de tus registros existentes. Las operaciones de importación agregan datos a tu sistema y pueden crear entradas duplicadas si se ejecutan varias veces.
:::
