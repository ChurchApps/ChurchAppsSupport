---
title: "Configuración de la iglesia"
---

# Configuración de la iglesia

<div class="article-intro">

La página de Configuración de la iglesia es donde configuras la información básica de tu iglesia, sus datos de contacto y su identidad visual. Estos datos se usan en todas las herramientas de ChurchApps, incluidos tu sitio web de B1.church y la aplicación B1 Mobile.

</div>

<div class="prereqs">
<h4>Antes de comenzar</h4>

- Necesitas el permiso "Editar configuración de la iglesia". Consulta [Roles y permisos](./roles-permissions.md) si no tienes acceso.
- Ten lista la dirección, la información de contacto y el logotipo de tu iglesia

</div>

## Editar la información de tu iglesia

1. En B1 Admin, abre el [menú Jump](../introduction.md#getting-around-with-the-jump-menu) (la barra de búsqueda en la parte superior izquierda), expande **Configuración** y haz clic en **Configuración**.
2. En la sección **Información de la iglesia** (en la parte superior de la página), haz clic en **Editar**.
3. Actualiza cualquiera de los siguientes campos:
   - **Nombre de la iglesia** -- El nombre que se muestra en todos los productos de ChurchApps.
   - **Dirección** -- La dirección física de tu iglesia.
   - **Información de contacto** -- Número de teléfono, correo electrónico y otros datos de contacto.
   - **Zona horaria** -- La zona horaria de tu iglesia. Consulta [Zona horaria](#time-zone) más abajo.
4. Haz clic en **Guardar** para aplicar tus cambios.

## Configurar tu subdominio

Tu iglesia obtiene un subdominio gratuito en **tuiglesia.1.church**. Esta es la dirección web donde los miembros y los visitantes pueden acceder a la presencia en línea de tu iglesia.

1. En la página de Configuración, haz clic en **Editar** en la sección **Información de la iglesia** y busca el campo **Subdominio**.
2. Escribe el subdominio que prefieras (por ejemplo, "iglesiagracia" para iglesiagracia.1.church).
3. Guarda tus cambios.

:::info
Tu subdominio debe ser único en todas las iglesias de ChurchApps. Si el nombre que prefieres ya está en uso, prueba añadiendo tu ciudad o estado (por ejemplo, "iglesiagracia-dallas").
:::

Si quieres que los visitantes lleguen a tu sitio en tu propio dominio (por ejemplo, **`www.iglesiagracia.org`**), consulta [Dominio personalizado](./custom-domain.md).

## Configurar la identidad visual

Personaliza cómo aparece tu iglesia en todas las herramientas de ChurchApps:

1. Sube el **logotipo de la iglesia** haciendo clic en el área del logotipo y seleccionando un archivo de imagen.
2. Añade las **imágenes de la iglesia** adicionales que se usan en tu sitio web y en la [aplicación móvil](./mobile-app.md).

:::tip
Para obtener mejores resultados, usa un logotipo con fondo transparente en formato PNG. Así se verá bien tanto en fondos claros como oscuros.
:::

## Primer día de la semana

Elige el día en que empiezan tus calendarios. El menú desplegable **Primer día de la semana** de la sección Información de la iglesia está configurado por defecto en **Domingo**, pero se puede cambiar a cualquier día. Una vez cambiado, se respeta en las cuadrículas de calendario de B1 Admin y del portal de miembros de B1.church: los calendarios de grupos, los calendarios curados y el editor de eventos muestran las semanas empezando por el día que elijas.

## Zona horaria

El menú desplegable **Zona horaria** de la sección **Información de la iglesia** define la zona horaria de tu iglesia (por ejemplo, *America/Chicago*). Elige **Ninguna** para dejarla en blanco. Una vez guardada, la zona aparece en el resumen de la Información de la iglesia.

B1 usa esta zona horaria para los horarios generales de la iglesia, como los recordatorios de eventos y los horarios de tus televisores de [FreePlay](../../freeplay/scheduled-mode/scheduling-the-calendar.md). Los [horarios de registro de entrada](../attendance/setup.md#setting-a-check-in-schedule) se miden primero en la zona horaria del [campus](./campuses.md) del servicio, y solo usan la zona horaria de la iglesia cuando ese campus no tiene una. Si tus campus están todos en una misma zona horaria, configúrala tanto en la iglesia como en cada campus.

## Región (formato de fecha y teléfono)

La configuración de **Región** controla cómo se escriben las fechas y las horas en todo B1. Por defecto, las fechas usan el formato de Estados Unidos (por ejemplo, "28 sep 2026" y "9/28/2026"). Las iglesias fuera de EE. UU. pueden cambiar a su propio formato; por ejemplo, al elegir Español (México) se muestra "28 sep 2026" y "28/09/2026".

1. En la página de Configuración, haz clic en **Región** en la lista de la izquierda y luego en **Editar** en la sección **Región**.
2. Elige tu región en el menú desplegable **Región**. Cada opción muestra una fecha de ejemplo para que veas exactamente cómo se verán las fechas.
3. Haz clic en **Guardar**.

La sección Región muestra entonces la región seleccionada, un ejemplo del **Formato de fecha** y el formato de tus **Números de teléfono**.

### Formato de número de teléfono

La misma sección Región tiene una opción de **Números de teléfono** que controla cómo se escriben los números de teléfono en el registro de una persona:

- **Internacional (con código de país)** -- la opción predeterminada. Los campos de teléfono muestran un selector de banderas de país y guardan los números con el código de país (por ejemplo, +1 918 555 1234).
- **Local (tal como se escribe)** -- los campos de teléfono se convierten en cuadros de texto simples y guardan los números exactamente como los escribes, sin añadir código de país (por ejemplo, 0701 234 5678). Elige esta opción si tu iglesia escribe los números en formato local y no quiere que B1 añada un código de país.

Cuando está seleccionada la opción **Local**, la sección Región también muestra "Números de teléfono locales" junto a tu región.

:::tip
Los mensajes de texto funcionan mejor cuando los números incluyen el código de país. Si envías textos desde B1, mantén el formato **Internacional**, o asegúrate de que los números que escribas en modo Local incluyan el código de país.
:::

Tu región se aplica a las fechas y horas en todo B1 Admin y en tu sitio web de B1.church y el portal de miembros, incluidos los sermones, las entradas de blog, los calendarios de grupos y los planes de servicio, para que los miembros vean las fechas con el mismo formato que tu personal.

## Mensajes de texto {#texting}

Conecta un proveedor de mensajes de texto para enviar SMS a una persona o a un grupo completo desde B1 Admin. Los mensajes se envían a través de tu propia cuenta con el proveedor, así que se aplican sus precios y límites.

1. En la página de Configuración, haz clic en **Mensajes de texto** en la lista de la izquierda y luego en **Editar** en la sección **Mensajes de texto**.
2. Elige un **Proveedor**:
   - **Clearstream** -- introduce una **Clave de API**. Créala en la configuración de tu cuenta de Clearstream, en Claves de API.
   - **Text In Church** -- introduce una **Clave de API**. Pide primero acceso a la API para desarrolladores al soporte de Text In Church, y luego crea una clave en la sección Configuración de la cuenta > API para desarrolladores.
   - **Nalo Solutions** (Ghana) -- introduce la clave de autenticación de tu cuenta de Nalo Solutions como **Clave de API**, y un **ID de remitente** (de hasta 11 caracteres) que Nalo haya aprobado para ti.
   - **Twilio** -- usa tu propia cuenta de Twilio; Twilio te factura directamente. Copia el **Account SID** y el **Auth Token** de la [Consola de Twilio](https://console.twilio.com), e introduce un **Número de origen**: un número de teléfono de Twilio registrado para A2P 10DLC, con un formato como `+15551234567`. Después de guardar, pega la URL del webhook de entrada (véase más abajo) en el webhook **A message comes in** del número en Twilio para que las respuestas STOP también se registren en B1.
3. Haz clic en **Guardar**.

Para dejar de enviar mensajes de texto, cambia el **Proveedor** a **Ninguno** y guarda. Esto elimina el proveedor guardado.

### Dar de baja a las personas que responden STOP

Una vez guardado un proveedor, vuelve a abrir la sección Mensajes de texto con **Editar**. Debajo de la configuración del proveedor, un campo de solo lectura **URL del webhook de entrada (STOP)** muestra una dirección web única para tu iglesia. Haz clic en el campo para seleccionar la dirección, cópiala y pégala en la configuración de webhook de mensajes entrantes (respuestas) de tu proveedor de mensajes de texto. Esto funciona con cualquiera de los proveedores anteriores que pueda reenviar las respuestas entrantes a un webhook.

Después, cuando alguien responde **STOP** (o STOPALL, UNSUBSCRIBE, CANCEL, END, QUIT, OPTOUT o REVOKE) a uno de tus mensajes, B1 busca a todas las personas cuyo número de celular coincida, las marca como dadas de baja y desactiva sus recordatorios por texto. Luego se omiten en los mensajes de texto a grupos. Las demás respuestas se ignoran.

:::info
Esto usa la misma configuración de exclusión que **Ocultarme del directorio de miembros**, así que las personas que responden STOP también aparecen como **Oculto del directorio** en su perfil. El campo solo aparece mientras el proveedor guardado está seleccionado: si cambias el menú desplegable a otro proveedor, guarda primero para volver a ver la URL.
:::

Una vez conectado un proveedor, el personal con permiso para enviar mensajes de texto ve un botón **Texto** en la página de un grupo (**Enviar texto a este grupo**) y en la de una persona con celular (**Enviar mensaje de texto**). Escribe tu mensaje y haz clic en **Enviar**. El cuadro de diálogo cuenta los caracteres y los segmentos SMS. En el caso de un grupo, muestra cuántos miembros recibirán el texto antes de que lo envíes:

- Los miembros sin celular registrado se omiten.
- Los miembros que eligieron **Ocultarme del directorio de miembros** cuentan como dados de baja y se omiten.
- Los miembros de una misma familia que comparten número de celular reciben el texto solo una vez.

### Personalizar los textos con campos de combinación {#personalizing-texts-with-merge-fields}

Debajo del cuadro del mensaje, el cuadro de diálogo de Texto muestra etiquetas de marcador: **Nombre**, **Apellido**, **Nombre para mostrar** e **Nombre de la iglesia**. Haz clic en una etiqueta para insertar su marcador (`{{firstName}}`, `{{lastName}}`, `{{displayName}}` o `{{churchName}}`) en la posición del cursor. Cuando se envía el texto, cada marcador se reemplaza con los datos de cada destinatario, así que un texto de grupo como `Hola {{firstName}}, ¡nos vemos el domingo!` llega a cada miembro con su propio nombre. Los marcadores funcionan tanto en los textos a grupos como en los textos a una sola persona.

:::info
El límite de 1,600 caracteres se aplica al mensaje tal como lo escribes. Una vez completados los marcadores, cualquier texto que supere los 1,600 caracteres se corta en ese límite.
:::

Los textos también pueden enviarse automáticamente desde un paso de [flujo de trabajo](../serving/workflows.md#sending-a-text) con la acción **Enviar mensaje de texto**, que usa el mismo proveedor y los mismos marcadores.

## Almacenamiento de archivos

De forma predeterminada, los archivos que subes a tu sitio web (a través de [Archivos](../website/files.md)) y a otras áreas de contenido usan el almacenamiento alojado gratuito de B1, de hasta 100 MB. Si necesitas más espacio, puedes conectar tu propio almacenamiento en la nube: las nuevas subidas van directamente a tu cuenta, sin límite de la plataforma.

1. En la página de Configuración, haz clic en **Almacenamiento de archivos** en la lista de la izquierda y luego en **Editar** en la sección **Almacenamiento de archivos**.
2. Elige un proveedor: **Google Drive**, **Dropbox**, **OneDrive** o un **bucket compatible con S3** (AWS S3, Cloudflare R2, Backblaze B2, etc.).
3. Para Google Drive, Dropbox u OneDrive, haz clic en **Conectar** e inicia sesión para autorizar el acceso. Para un bucket compatible con S3, introduce tu clave de acceso, tu clave secreta, el nombre del bucket y la base de la URL pública.
4. Haz clic en **Guardar**.

:::info
Esto solo afecta a las nuevas subidas a Archivos de tu sitio web y a áreas de contenido similares. Las imágenes de galería, las miniaturas, los logotipos y las fotos de personas siempre permanecen en el almacenamiento predeterminado de B1.
:::

## Promoción de grado

Si registras el **Grado** de los niños y estudiantes, B1 puede subir automáticamente a todos un grado en la fecha que elijas (por ejemplo, el 1 de agosto), en lugar de obligarte a editar cada perfil a mano.

1. En la página de Configuración, haz clic en **Promoción de grado** en la lista de la izquierda y luego en **Editar** en la sección **Promoción de grado**.
2. Activa el interruptor (muestra **Habilitada**) y elige el **Mes** y el **Día** para promover los grados cada año. En esa fecha, todos los que tengan un grado suben un nivel, y los estudiantes de 12.º grado pasan a **Graduados**.
3. Guarda tus cambios.

Para detener la promoción automática, desactiva el interruptor para que muestre **Deshabilitada** y guarda. La fecha de promoción se elimina y los grados ya no cambiarán por sí solos.

## Inscripción de voluntarios {#volunteer-signup}

De forma predeterminada, los miembros que consultan las [inscripciones de voluntarios](../../b1-church/serving/volunteer-signup.md) ven todas las semanas próximas que tienen posiciones abiertas. Si esa lista se vuelve muy larga, puedes mostrar solo la siguiente semana de cada tipo de plan.

1. En la página de Configuración, haz clic en **Inscripción de voluntarios** en la lista de la izquierda y luego en **Editar** en la sección **Inscripción de voluntarios**.
2. Activa **Mostrar solo la siguiente semana de cada tipo de plan**.
3. Guarda tus cambios.

Con esta opción activada, cada tipo de plan muestra solo su próximo plan. La semana siguiente aparece cuando pasa esa fecha. La fila **Semanas mostradas** de la sección indica **Solo la siguiente semana de cada tipo de plan** o **Todas las semanas próximas**.

## Privacidad de las ofrendas {#giving-privacy}

Las personas con acceso a las ofrendas normalmente ven los totales de ofrendas de una persona en su [registro de persona](../people/adding-people.md#editing-details). Si prefieres no tener los montos en pantalla cada vez que se abre un registro, puedes ocultarlos hasta que alguien los pida.

1. En la página de Configuración, haz clic en **Privacidad de las ofrendas** en la lista de la izquierda y luego en **Editar** en la sección **Privacidad de las ofrendas**.
2. Activa **Ocultar las ofrendas en los registros de personas hasta hacer clic**.
3. Guarda tus cambios.

Con esta opción activada, la tarjeta de ofrendas de un registro de persona dice "Las ofrendas están ocultas en los registros de personas". Haz clic en **Mostrar ofrendas** para cargar y mostrar las ofrendas de esa persona. Se vuelve a ocultar al abrir otra persona. Quién puede ver las ofrendas no cambia: solo las personas con acceso a ofrendas ven nunca la tarjeta.

## Importar y exportar

El enlace **Importar/Exportar** debajo del nombre de tu iglesia, en la página de Configuración, abre una herramienta dedicada en una nueva ventana del navegador. Úsala para:

- Importar datos de miembros desde otro sistema de gestión de iglesias.
- Exportar tus datos de ChurchApps para copias de seguridad o migración.

Esto es especialmente útil cuando estás configurando tu iglesia por primera vez y necesitas trasladar registros existentes a ChurchApps.

:::warning
Al importar datos, haz siempre primero una copia de seguridad de tus registros existentes. Las operaciones de importación añaden datos a tu sistema y pueden crear entradas duplicadas si se ejecutan varias veces.
:::
