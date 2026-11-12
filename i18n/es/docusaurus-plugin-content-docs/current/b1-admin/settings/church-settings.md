---
title: "Configuración de la iglesia"
description: "Configure el nombre, la dirección, el subdominio, la zona horaria, el formato regional, el proveedor de mensajes de texto y el almacenamiento de archivos de su iglesia en la página de Configuración de la iglesia de B1 Admin."
---

# Configuración de la iglesia

<div class="article-intro">

La página de Configuración de la iglesia es donde se configura la información básica de su iglesia, sus datos de contacto y su marca. Estos datos se usan en todas las herramientas de ChurchApps, incluidos su sitio web B1.church y la aplicación B1.

</div>

## Video de capacitación {#training-video}

<YouTube id="634zSbzDkYA" title="Configurar la información de la iglesia y la marca en B1" next="Roles, permisos e invitar a su equipo en B1" nextUrl="/docs/b1-admin/settings/roles-permissions" />

<div class="prereqs">
<h4>Antes de empezar</h4>

- Necesita el permiso "Editar configuración de la iglesia". Consulte [Roles y permisos](./roles-permissions.md) si no tiene acceso.
- Tenga a mano la dirección, los datos de contacto y el logotipo de su iglesia

</div>

## Editar la información de su iglesia {#editing-your-church-information}

1. En B1 Admin, abra el [menú Salto](../introduction.md#getting-around-with-the-jump-menu) (la barra de búsqueda en la parte superior izquierda), expanda **Configuración** y haga clic en **Configuración**.
2. En la sección **Información de la iglesia** (en la parte superior de la página), haga clic en **Editar**.
3. Actualice cualquiera de los siguientes campos:
   - **Nombre de la iglesia** *(obligatorio)* -- El nombre que se muestra en todos los productos de ChurchApps.
   - **Subdominio** *(obligatorio)* -- Su dirección web gratuita de B1. Consulte [Configurar su subdominio](#setting-up-your-subdomain) más abajo.
   - **Línea de dirección 1**, **Línea de dirección 2**, **Ciudad**, **Estado**, **Código postal** y **País** -- La dirección física de su iglesia.
   - **Primer día de la semana** -- Consulte [Primer día de la semana](#first-day-of-week) más abajo.
   - **Zona horaria** -- La zona horaria de su iglesia. Consulte [Zona horaria](#time-zone) más abajo.
4. Haga clic en **Guardar** para aplicar sus cambios, o en **Cancelar** para descartarlos.

El nombre, el subdominio y la dirección de la iglesia también aparecen en el panel de la parte superior izquierda de la página de Configuración.

## Configurar su subdominio {#setting-up-your-subdomain}

Su iglesia recibe un subdominio gratuito en **yourchurch.b1.church**. Es la dirección web donde los miembros y visitantes pueden acceder a la presencia en línea de su iglesia.

1. En la página de Configuración, haga clic en **Editar** en la sección **Información de la iglesia** y localice el campo **Subdominio**.
2. Escriba el subdominio que prefiera (por ejemplo, "gracechurch" para gracechurch.b1.church).
3. Guarde sus cambios.

:::info
Su subdominio debe ser único entre todas las iglesias de ChurchApps. Si el nombre que prefiere ya está en uso, pruebe agregando su ciudad o su estado (por ejemplo, "gracechurch-dallas").
:::

Si desea que los visitantes lleguen a su sitio en su propio dominio (por ejemplo, **`www.gracechurch.org`**), consulte [Dominio personalizado](./custom-domain.md).

## Configurar la marca {#configuring-branding}

El logotipo y los colores de su iglesia no se configuran en la página de Configuración. Suba el logotipo de su iglesia y elija sus colores en **Sitio web > Apariencia**; consulte [Logotipo y marca](../website/appearance.md#logo-and-branding). Los colores que usan la aplicación B1, el portal de miembros y el kiosco de registro se configuran en **Móvil > Tema de la aplicación**; consulte [Tema de la aplicación](./mobile-app.md#app-theme).

## General (contacto de soporte) {#general-support-contact}

La sección **General** contiene su **Contacto de soporte**: la dirección de correo o el enlace al formulario de contacto que las personas usan para comunicarse con su iglesia. Haga clic en **Editar** en la sección **General**, escriba la dirección en el campo **Enlace** y haga clic en **Guardar**. Hasta que establezca uno, la sección muestra **No configurado**.

## Primer día de la semana {#first-day-of-week}

Elija qué día comienzan sus calendarios. El menú desplegable **Primer día de la semana** de la sección Información de la iglesia está configurado en **Domingo** de forma predeterminada, pero puede establecerse en cualquier día. Una vez cambiado, se respeta en las cuadrículas de calendario de B1 Admin y del portal de miembros de B1.church: los calendarios de grupos, los calendarios seleccionados y el editor de eventos muestran las semanas empezando por el día que elija.

## Zona horaria {#time-zone}

El menú desplegable **Zona horaria** de la sección **Información de la iglesia** establece la zona horaria de su iglesia (por ejemplo, *America/Chicago*). Elija **Ninguna** para dejarlo en blanco. Una vez guardada, la zona aparece en el resumen de la Información de la iglesia.

B1 usa esta zona horaria para los horarios de toda la iglesia, como los recordatorios de eventos y los horarios de sus televisores de [FreePlay](../../freeplay/scheduled-mode/scheduling-the-calendar.md). Los [horarios de registro](../attendance/setup.md#setting-a-check-in-schedule) se miden primero en la zona horaria del [campus](./campuses.md) al que pertenece el servicio, y usan la zona horaria de la iglesia solo cuando ese campus no tiene una. Si todos sus campus están en una misma zona horaria, configúrela tanto en la iglesia como en cada campus.

## Región (formato de fecha y teléfono) {#region-date-and-phone-format}

La configuración de **Región** controla cómo se escriben las fechas y las horas en todo B1. De forma predeterminada, las fechas usan el formato de Estados Unidos (por ejemplo, "28 sep 2026" y "9/28/2026"). Las iglesias fuera de EE. UU. pueden cambiar a su propio formato; por ejemplo, al elegir Inglés (Reino Unido) se muestra "28 Sept 2026" y "28/09/2026".

1. En la página de Configuración, haga clic en **Región** en la lista de la izquierda y luego en **Editar** en la sección **Región**.
2. Elija su región en el menú desplegable **Región**. Cada opción muestra una fecha de ejemplo para que vea exactamente cómo se verán las fechas.
3. Haga clic en **Guardar**.

La sección Región muestra entonces la región seleccionada, un ejemplo del **Formato de fecha** y su formato de **Números de teléfono**.

### Formato de número de teléfono {#phone-number-format}

La misma sección Región tiene una opción **Números de teléfono** que controla cómo se ingresan los números de teléfono en el registro de una persona:

- **Internacional (con código de país)** -- la opción predeterminada. Los campos de teléfono muestran un selector de bandera del país y guardan los números con el código de país (por ejemplo, +1 918 555 1234).
- **Local (tal como se escribe)** -- los campos de teléfono pasan a ser cuadros de texto simples y guardan los números exactamente como los escribe, sin agregar código de país (por ejemplo, 0701 234 5678). Elija esta opción si su iglesia escribe los números en formato local y no quiere que B1 agregue un código de país.

Cuando está seleccionada la opción **Local**, la sección Región también muestra "Números de teléfono locales" junto a su región.

:::tip
Los mensajes de texto funcionan mejor cuando los números incluyen el código de país. Si envía mensajes desde B1, mantenga el formato **Internacional** o asegúrese de que los números que escriba en modo Local incluyan el código de país.
:::

Su región se aplica a las fechas y horas en todo B1 Admin, en su sitio web B1.church y en el portal de miembros, incluidos los sermones, las entradas de blog, los calendarios de grupos y los planes de servicio, para que los miembros vean las fechas en el mismo formato que su personal.

## Mensajes de texto {#texting}

Conecte un proveedor de mensajes de texto para enviar SMS a una persona o a un grupo completo desde B1 Admin. Los mensajes se envían a través de su propia cuenta con el proveedor, así que se aplican sus tarifas y límites.

1. En la página de Configuración, haga clic en **Mensajes de texto** en la lista de la izquierda y luego en **Editar** en la sección **Mensajes de texto**.
2. Elija un **Proveedor**:
   - **Clearstream** -- escriba una **Clave de API**. Créela en la configuración de su cuenta de Clearstream, en Claves de API.
   - **Text In Church** -- escriba una **Clave de API**. Primero pida acceso a la API para desarrolladores al soporte de Text In Church y luego cree una clave en la sección Configuración de la cuenta > API para desarrolladores.
   - **Nalo Solutions** (Ghana) -- escriba la clave de autenticación de su cuenta de Nalo Solutions como **Clave de API**, y un **ID de remitente** (de hasta 11 caracteres) que Nalo haya aprobado para usted.
   - **Twilio** -- use la cuenta de Twilio de su iglesia; Twilio le factura directamente. Copie el **Account SID** y el **Auth Token** de la [consola de Twilio](https://console.twilio.com) y escriba un **Número de origen**: un número de teléfono de Twilio registrado para A2P 10DLC, con un formato como `+15551234567`. Después de guardar, pegue la URL del webhook de entrada (vea más abajo) en el webhook **Llega un mensaje** del número en Twilio, para que las respuestas STOP también se registren en B1.
3. Haga clic en **Guardar**.

Para dejar de enviar mensajes de texto, establezca **Proveedor** en **Ninguno** y guarde. Esto elimina el proveedor guardado.

### Cancelar la suscripción de las personas que responden STOP {#opting-out-people-who-reply-stop}

Una vez guardado un proveedor, vuelva a abrir la sección Mensajes de texto con **Editar**. Debajo de la configuración del proveedor, un campo de solo lectura **URL del webhook de entrada (STOP)** muestra una dirección web única de su iglesia. Haga clic en el campo para seleccionar la dirección, cópiela y péguela en la configuración de webhook de mensajes entrantes (respuestas) de su proveedor de mensajes de texto. Esto funciona con cualquiera de los proveedores anteriores que puedan reenviar las respuestas entrantes a un webhook.

Después de eso, cuando alguien responda **STOP** (o STOPALL, UNSUBSCRIBE, CANCEL, END, QUIT, OPTOUT o REVOKE) a uno de sus mensajes, B1 busca a todas las personas cuyo número móvil coincida, las marca como dadas de baja y desactiva sus recordatorios de texto. Después, se omiten en los mensajes de texto a grupos. Las demás respuestas se ignoran.

:::info
Esto usa la misma configuración de baja que **Ocultarme del directorio de miembros**, así que las personas que responden STOP también aparecen como **Oculto del directorio** en su perfil. El campo solo aparece mientras el proveedor guardado está seleccionado; si cambia el menú desplegable a otro proveedor, guarde primero para volver a ver la URL.
:::

Cuando hay un proveedor conectado, el personal con permiso para enviar mensajes ve un botón **Texto** en la página de un grupo (**Enviar texto a este grupo**) y en la de una persona con teléfono móvil (**Enviar mensaje de texto**). Escriba su mensaje y haga clic en **Enviar**. El diálogo cuenta los caracteres y los segmentos SMS. En el caso de un grupo, muestra cuántos miembros recibirán el mensaje antes de enviarlo:

- Los miembros sin teléfono móvil registrado se omiten.
- Los miembros que eligieron **Ocultarme del directorio de miembros** se cuentan como dados de baja y se omiten.
- Los miembros de una familia que comparten un número móvil reciben el mensaje solo una vez.

### Personalizar mensajes con campos de combinación {#personalizing-texts-with-merge-fields}

Debajo del cuadro de mensaje, el diálogo de Texto muestra chips de marcadores: **Nombre**, **Apellido**, **Nombre para mostrar** y **Nombre de la iglesia**. Haga clic en un chip para insertar su marcador (`{{firstName}}`, `{{lastName}}`, `{{displayName}}` o `{{churchName}}`) en la posición del cursor. Cuando se envía el mensaje, cada marcador se reemplaza con los datos de ese destinatario, así que un mensaje de grupo como `Hi {{firstName}}, see you Sunday!` llega a cada miembro con su propio nombre. Los marcadores funcionan tanto en mensajes a grupos como a una sola persona. Los mensajes a un grupo también ofrecen un chip **Nombre del grupo** (`{{groupName}}`), que se reemplaza con el nombre del grupo.

Para reutilizar un mensaje, guárdelo como [plantilla de texto](./email-templates.md#text-templates) (una plantilla de correo con la categoría **Texto**) y elíjalo en **Cargar plantilla (opcional)** en la parte superior de la ventana de Texto.

:::info
El límite de 1.600 caracteres se aplica al mensaje tal como lo escribe. Después de completar los marcadores, cualquier texto que supere los 1.600 caracteres se corta en esa longitud.
:::

Los mensajes también pueden enviarse automáticamente desde un paso de un [flujo de trabajo](../serving/workflows.md#sending-a-text) con la acción **Enviar mensaje de texto**, que usa el mismo proveedor y los mismos marcadores.

## Almacenamiento de archivos {#file-storage}

De forma predeterminada, los archivos que sube a su sitio web (a través de [Archivos](../website/files.md)) y a otras áreas de contenido usan el almacenamiento alojado gratuito de B1, de hasta 100 MB. Si necesita más espacio, puede conectar su propio almacenamiento en la nube; las nuevas cargas van entonces directamente a su cuenta, sin límite de la plataforma.

1. En la página de Configuración, haga clic en **Almacenamiento de archivos** en la lista de la izquierda y luego en **Editar** en la sección **Almacenamiento de archivos**.
2. Elija un **Proveedor**: **Google Drive**, **Dropbox** o **Bucket compatible con S3 (S3, R2, B2)** (AWS S3, Cloudflare R2, Backblaze B2, etc.). **ChurchApps (gratis)** es el almacenamiento integrado.
3. Para Google Drive o Dropbox, haga clic en **Conectar cuenta** e inicie sesión para autorizar el acceso. Aparece una insignia **Cuenta conectada** cuando funciona; debe conectarla antes de poder guardar. Para un bucket compatible con S3, escriba el **ID de clave de acceso**, la **Clave de acceso secreta**, el **Bucket**, el **Endpoint** (déjelo en blanco para AWS), la **Región** y la **Base de URL pública**. El **Bucket** y la **Base de URL pública** son obligatorios, y el bucket debe permitir lecturas públicas y cargas CORS desde B1.
4. Haga clic en **Guardar**.

Para volver al almacenamiento gratuito, elija **ChurchApps (gratis)** y guarde. Los archivos que ya se subieron permanecen donde están.

:::info
Esto solo afecta a las nuevas cargas en los Archivos de su sitio web y en áreas de contenido similares. Las imágenes de galería, las miniaturas, los logotipos y las fotos de personas siempre permanecen en el almacenamiento predeterminado de B1.
:::

## Donaciones {#giving}

La sección **Donaciones** conecta su proveedor de pagos y establece la moneda de su iglesia para las donaciones en línea y los registros pagados. Consulte [Configuración de donaciones en línea](../donations/online-giving-setup.md). Solo aparece para las personas que pueden editar la configuración de donaciones.

## Registro de entrada {#check-in}

La sección **Registro de entrada** configura la **Aplicación de la proporción de voluntarios**: si el registro solo muestra una advertencia (**Advertir (permitir con confirmación)**) o bloquea un registro (**Bloquear (impedir el registro)**) cuando una sala tiene pocos voluntarios. Consulte [Proporción de voluntarios](../attendance/checkin-safety.md#volunteer-ratios). El enlace **Kiosco de registro, QR y etiquetas** debajo abre la configuración del kiosco en la página Móvil.

## Promoción de grado {#grade-promotion}

Si registra el **Grado** de niños y estudiantes, B1 puede subir automáticamente a todos un grado en la fecha que usted elija (por ejemplo, el 1 de agosto), en lugar de exigirle editar cada perfil a mano.

1. En la página de Configuración, haga clic en **Promoción de grado** en la lista de la izquierda y luego en **Editar** en la sección **Promoción de grado**.
2. Active el interruptor (debe mostrar **Habilitado**) y elija el **Mes** y el **Día** en que se promueven los grados cada año. En esa fecha, todos los que tienen un grado suben un grado, y los estudiantes de 12.º grado pasan a **Graduado**.
3. Guarde sus cambios.

Para detener la promoción automática, desactive el interruptor para que muestre **Deshabilitado** y guarde. Se elimina la fecha de promoción y los grados ya no cambiarán por sí solos.

## Inscripción de voluntarios {#volunteer-signup}

De forma predeterminada, los miembros que exploran las [inscripciones de voluntarios](../../b1-church/serving/volunteer-signup.md) ven todas las semanas próximas que tienen puestos disponibles. Si esa lista se hace muy larga, puede mostrar solo la siguiente semana de cada tipo de plan.

1. En la página de Configuración, haga clic en **Inscripción de voluntarios** en la lista de la izquierda y luego en **Editar** en la sección **Inscripción de voluntarios**.
2. Active **Mostrar solo la siguiente semana de cada tipo de plan**.
3. Guarde sus cambios.

Con esta opción activada, cada tipo de plan muestra solo su próximo plan. La semana siguiente aparece cuando pasa esa fecha. La fila **Semanas mostradas** de la sección indica **Solo la siguiente semana de cada tipo de plan** o **Todas las semanas próximas**.

## Privacidad de las donaciones {#giving-privacy}

Las personas con acceso a las donaciones normalmente ven los totales de donaciones de una persona en su [registro de persona](../people/adding-people.md#editing-details). Si prefiere no tener los montos en pantalla cada vez que se abre un registro, puede ocultarlos hasta que alguien los solicite.

1. En la página de Configuración, haga clic en **Privacidad de las donaciones** en la lista de la izquierda y luego en **Editar** en la sección **Privacidad de las donaciones**.
2. Active **Ocultar donaciones en los registros de personas hasta hacer clic**.
3. Guarde sus cambios.

Con esta opción activada, la tarjeta de donaciones de un registro de persona dice "Las donaciones están ocultas en los registros de personas". Haga clic en **Mostrar donaciones** para cargar y mostrar las donaciones de esa persona. Se vuelve a ocultar cuando abre a otra persona. Quién puede ver las donaciones no cambia: solo las personas con acceso a las donaciones ven la tarjeta.

## Importar y exportar {#import-and-export}

El enlace **Importar/Exportar** debajo del nombre de su iglesia en la página de Configuración abre una herramienta dedicada en una nueva ventana del navegador. Úsela para:

- Importar datos de miembros desde otro sistema de gestión de iglesias.
- Exportar sus datos de ChurchApps para respaldo o migración.

Esto es especialmente útil cuando está configurando su iglesia por primera vez y necesita transferir los registros existentes a ChurchApps.

:::warning
Al importar datos, haga siempre primero una copia de seguridad de sus registros existentes. Las operaciones de importación agregan datos a su sistema y pueden crear entradas duplicadas si se ejecutan varias veces.
:::
