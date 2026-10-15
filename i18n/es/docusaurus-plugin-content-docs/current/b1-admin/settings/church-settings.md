---
title: "Configuración de la iglesia"
---

# Configuración de la iglesia

<div class="article-intro">

La página de configuración de la iglesia es donde defines la información básica de tu iglesia, sus datos de contacto y su identidad visual. Estos datos se usan en todas las herramientas de ChurchApps, incluidos tu sitio web de B1.church y la app móvil de B1.

</div>

<div class="prereqs">
<h4>Antes de comenzar</h4>

- Necesitas el permiso "Edit Church Settings". Consulta [Roles y permisos](./roles-permissions.md) si no tienes acceso.
- Ten lista la dirección, la información de contacto y el logo de tu iglesia

</div>

## Editar la información de tu iglesia

1. En B1 Admin, abre el [menú Jump](../introduction.md#getting-around-with-the-jump-menu) (la barra de búsqueda en la parte superior izquierda), expande **Settings** y haz clic en **Settings**.
2. En la sección **Church Information** (en la parte superior de la página), haz clic en **Edit**.
3. Actualiza cualquiera de los siguientes campos:
   - **Church Name**: el nombre que se muestra en todos los productos de ChurchApps.
   - **Address**: la dirección física de tu iglesia.
   - **Contact Information**: número de teléfono, correo electrónico y otros datos de contacto.
4. Haz clic en **Save** para aplicar los cambios.

## Configurar tu subdominio

Tu iglesia obtiene un subdominio gratuito en **tuiglesia.1.church**. Es la dirección web donde los miembros y visitantes pueden acceder a la presencia en línea de tu iglesia.

1. En la página de Settings, haz clic en **Edit** en la sección **Church Information** y localiza el campo **Subdomain**.
2. Escribe el subdominio que prefieras (por ejemplo, "gracechurch" para gracechurch.1.church).
3. Guarda los cambios.

:::info
Tu subdominio debe ser único entre todas las iglesias de ChurchApps. Si el nombre que quieres ya está en uso, prueba agregando tu ciudad o estado (por ejemplo, "gracechurch-dallas").
:::

Si quieres que los visitantes lleguen a tu sitio con tu propio dominio (por ejemplo, **www.gracechurch.org**), consulta [Dominio personalizado](./custom-domain.md).

## Configurar la identidad visual

Personaliza cómo aparece tu iglesia en todas las herramientas de ChurchApps:

1. Sube el **logo de la iglesia** haciendo clic en el área del logo y seleccionando un archivo de imagen.
2. Agrega las **imágenes de la iglesia** adicionales que se usan en tu sitio web y en la [app móvil](./mobile-app.md).

:::tip
Para mejores resultados, usa un logo con fondo transparente en formato PNG. Así se verá bien tanto en fondos claros como oscuros.
:::

## Primer día de la semana

Elige el día en que comienzan tus calendarios. El menú **First Day of Week** de la sección Church Info viene configurado en **Sunday**, pero puedes cambiarlo a cualquier día. Una vez modificado, se respeta en las cuadrículas de calendario de B1 Admin y del portal de miembros de B1.church: los calendarios de grupos, los calendarios seleccionados y el editor de eventos muestran las semanas comenzando por el día que elijas.

## Región (formato de fecha y teléfono)

La configuración de **Region** controla cómo se escriben las fechas y las horas en todo B1. De forma predeterminada, las fechas usan el formato de Estados Unidos (por ejemplo, "Sep 28, 2026" y "9/28/2026"). Las iglesias fuera de EE. UU. pueden cambiar a su propio formato; por ejemplo, al elegir English (United Kingdom) se muestran "28 Sept 2026" y "28/09/2026".

1. En la página de Settings, haz clic en **Region** en la lista de la izquierda y luego en **Edit** en la sección **Region**.
2. Elige tu región en el menú desplegable **Region**. Cada opción muestra una fecha de ejemplo para que veas exactamente cómo se verán las fechas.
3. Haz clic en **Save**.

La sección Region muestra entonces la región seleccionada, un ejemplo del **Date format** y el formato de tus **Phone numbers**.

### Formato de números de teléfono

La misma sección Region tiene una configuración de **Phone numbers** que controla cómo se ingresan los números de teléfono en el registro de una persona:

- **International (with country code)**: la opción predeterminada. Los campos de teléfono muestran un selector de bandera del país y guardan los números con el código de país (por ejemplo, +1 918 555 1234).
- **Local (as typed)**: los campos de teléfono se convierten en cuadros de texto simples y guardan los números exactamente como los escribes, sin agregar código de país (por ejemplo, 0701 234 5678). Elige esta opción si tu iglesia escribe los números en formato local y no quiere que B1 agregue un código de país.

Cuando se selecciona **Local**, la sección Region también muestra "Local phone numbers" junto a tu región.

:::tip
Los mensajes de texto funcionan mejor cuando los números incluyen el código de país. Si envías mensajes desde B1, mantén el formato **International** o asegúrate de que los números que escribas en modo Local incluyan el código de país.
:::

Tu región se aplica a las fechas y horas de B1 Admin, de tu sitio web de B1.church y del portal de miembros, incluidos los sermones, las entradas de blog, los calendarios de grupos y los planes de servicio, de modo que los miembros vean las fechas con el mismo formato que tu personal.

## Mensajes de texto {#texting}

Conecta un proveedor de mensajes de texto para enviar SMS a una persona o a un grupo completo desde B1 Admin. Los mensajes se envían a través de tu propia cuenta con el proveedor, así que se aplican sus precios y límites.

1. En la página de Settings, haz clic en **Texting** en la lista de la izquierda y luego en **Edit** en la sección **Texting**.
2. Elige un **Provider**:
   - **Clearstream**: ingresa una **API Key**. Créala en la configuración de tu cuenta de Clearstream, en API Keys.
   - **Text In Church**: ingresa una **API Key**. Primero pide a Text In Church Support acceso a la API para desarrolladores y luego crea una clave en la sección Developer API de tu configuración de cuenta.
   - **Nalo Solutions** (Ghana): ingresa la clave de autenticación de tu cuenta de Nalo Solutions como **API Key**, y un **Sender ID** (de hasta 11 caracteres) que Nalo haya aprobado para ti.
3. Haz clic en **Save**.

Para dejar de enviar mensajes, cambia **Provider** a **None** y guarda. Esto elimina el proveedor guardado.

### Dar de baja a las personas que responden STOP

Una vez guardado un proveedor, vuelve a abrir la sección Texting con **Edit**. Debajo de la configuración del proveedor, un campo de solo lectura **Inbound (STOP) webhook URL** muestra una dirección web única para tu iglesia. Haz clic en el campo para seleccionar la dirección, cópiala y pégala en la configuración de webhook de mensajes entrantes (respuestas) de tu proveedor. Esto funciona con cualquiera de los proveedores anteriores que pueda reenviar las respuestas entrantes a un webhook.

Después de eso, cuando alguien responda **STOP** (o STOPALL, UNSUBSCRIBE, CANCEL, END, QUIT, OPTOUT o REVOKE) a uno de tus mensajes, B1 busca a todas las personas cuyo número móvil coincida, las marca como dadas de baja y desactiva sus recordatorios por texto. Luego se omiten en los mensajes de grupo. Las demás respuestas se ignoran.

:::info
Esto usa la misma configuración de exclusión que **Hide me from the member directory**, así que las personas que respondan STOP también aparecerán como **Hidden from directory** en su perfil. El campo solo aparece mientras el proveedor guardado esté seleccionado; si cambias el menú a otro proveedor, guarda primero para volver a ver la URL.
:::

Una vez conectado un proveedor, el personal con permiso para enviar mensajes verá un botón **Text** en la página de un grupo (**Text this group**) y en la de una persona con teléfono móvil (**Send text message**). Escribe tu mensaje y haz clic en **Send**. El cuadro de diálogo cuenta los caracteres y los segmentos SMS. En el caso de un grupo, muestra cuántos miembros recibirán el mensaje antes de enviarlo:

- Los miembros sin teléfono móvil registrado se omiten.
- Los miembros que eligieron **Hide me from the member directory** se cuentan como dados de baja y se omiten.
- Los miembros de una misma familia que comparten un número móvil reciben el mensaje una sola vez.

### Personalizar los mensajes con campos de combinación {#personalizing-texts-with-merge-fields}

Debajo del cuadro del mensaje, el cuadro de diálogo de texto muestra etiquetas de marcador: **First Name**, **Last Name**, **Display Name** y **Church Name**. Haz clic en una etiqueta para insertar su marcador (`{{firstName}}`, `{{lastName}}`, `{{displayName}}` o `{{churchName}}`) en la posición del cursor. Al enviar el mensaje, cada marcador se reemplaza con los datos de cada destinatario; así, un mensaje de grupo como `Hi {{firstName}}, see you Sunday!` llega a cada miembro con su propio nombre. Los marcadores funcionan tanto en mensajes de grupo como en mensajes a una sola persona.

:::info
El límite de 1,600 caracteres se aplica al mensaje tal como lo escribes. Después de reemplazar los marcadores, cualquier texto que supere los 1,600 caracteres se corta en ese límite.
:::

Los mensajes también pueden enviarse automáticamente desde un paso de un [flujo de trabajo](../serving/workflows.md#sending-a-text) con la acción **Send Text**, que usa el mismo proveedor y los mismos marcadores.

## Almacenamiento de archivos

De forma predeterminada, los archivos que subes a tu sitio web (a través de [Files](../website/files.md)) y a otras áreas de contenido usan el almacenamiento alojado gratuito de B1, de hasta 100 MB. Si necesitas más espacio, puedes conectar tu propio almacenamiento en la nube: las nuevas cargas se guardan directamente en tu cuenta, sin el límite de la plataforma.

1. En la página de Settings, haz clic en **File Storage** en la lista de la izquierda y luego en **Edit** en la sección **File Storage**.
2. Elige un proveedor: **Google Drive**, **Dropbox**, **OneDrive** o un **bucket compatible con S3** (AWS S3, Cloudflare R2, Backblaze B2, etc.).
3. Para Google Drive, Dropbox u OneDrive, haz clic en **Connect** e inicia sesión para autorizar el acceso. Para un bucket compatible con S3, ingresa tu clave de acceso, secreto, nombre del bucket y la base de URL pública.
4. Haz clic en **Save**.

:::info
Esto solo afecta a las nuevas cargas en Files de tu sitio web y en áreas de contenido similares. Las imágenes de galería, las miniaturas, los logos y las fotos de personas siempre permanecen en el almacenamiento predeterminado de B1.
:::

## Promoción de grado

Si registras el **Grade** de niños y estudiantes, B1 puede subir automáticamente a todos un grado en una fecha que elijas (por ejemplo, el 1 de agosto), en lugar de que tengas que editar cada perfil a mano.

1. En la página de Settings, haz clic en **Grade Promotion** en la lista de la izquierda y luego en **Edit** en la sección **Grade Promotion**.
2. Activa el interruptor (debe mostrar **Enabled**) y elige el **Month** y el **Day** en que se promoverán los grados cada año. En esa fecha, todos los que tengan un grado suben un grado, y los alumnos de 12.º grado pasan a **Graduated**.
3. Guarda los cambios.

Para detener la promoción automática, desactiva el interruptor para que muestre **Disabled** y guarda. Se elimina la fecha de promoción y los grados ya no cambiarán por sí solos.

## Inscripción de voluntarios {#volunteer-signup}

De forma predeterminada, los miembros que consultan las [inscripciones de voluntarios](../../b1-church/serving/volunteer-signup.md) ven todas las semanas próximas que tienen posiciones abiertas. Si esa lista se vuelve muy larga, puedes mostrar solo la siguiente semana de cada tipo de plan.

1. En la página de Settings, haz clic en **Volunteer Signup** en la lista de la izquierda y luego en **Edit** en la sección **Volunteer Signup**.
2. Activa **Show only the next week of each plan type**.
3. Guarda los cambios.

Con esta opción activada, cada tipo de plan muestra solo su siguiente plan próximo. La semana siguiente aparece cuando pasa esa fecha. La fila **Weeks shown** de la sección dice **Only the next week of each plan type** o **All upcoming weeks**.

## Privacidad de las ofrendas {#giving-privacy}

Las personas con acceso a las ofrendas normalmente ven los totales de ofrendas de una persona en su [registro de persona](../people/adding-people.md#editing-details). Si prefieres no mostrar los montos en pantalla cada vez que se abre un registro, puedes ocultarlos hasta que alguien lo pida.

1. En la página de Settings, haz clic en **Giving privacy** en la lista de la izquierda y luego en **Edit** en la sección **Giving privacy**.
2. Activa **Hide giving on person records until clicked**.
3. Guarda los cambios.

Con esta opción activada, la tarjeta de ofrendas de un registro de persona dice "Giving is hidden on person records." Haz clic en **Show giving** para cargar y mostrar las ofrendas de esa persona. Vuelve a ocultarse cuando abres otra persona. La configuración no cambia quién puede ver las ofrendas: solo las personas con acceso a ellas ven la tarjeta.

## Importar y exportar

El enlace **Import/Export** debajo del nombre de tu iglesia en la página de Settings abre una herramienta dedicada en una nueva ventana del navegador. Úsala para:

- Importar datos de miembros desde otro sistema de gestión de iglesias.
- Exportar tus datos de ChurchApps para respaldo o migración.

Esto es especialmente útil cuando estás configurando tu iglesia por primera vez y necesitas transferir registros existentes a ChurchApps.

:::warning
Al importar datos, haz primero una copia de respaldo de tus registros existentes. Las operaciones de importación agregan datos a tu sistema y pueden crear entradas duplicadas si se ejecutan varias veces.
:::
