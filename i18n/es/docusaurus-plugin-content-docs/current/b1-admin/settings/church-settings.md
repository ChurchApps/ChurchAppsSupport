---
title: "Configuración de la iglesia"
---

# Configuración de la iglesia

<div class="article-intro">

La página de Configuración de la iglesia es donde configura la información básica de su iglesia, sus datos de contacto y su identidad visual. Estos datos se usan en todas las herramientas de ChurchApps, incluidos su sitio web de B1.church y la aplicación móvil de B1.

</div>

## Video de capacitación

<YouTube id="634zSbzDkYA" title="Setting Up Church Info and Branding in B1" next="Roles, Permissions, and Inviting Your Team in B1" nextUrl="/docs/b1-admin/settings/roles-permissions" />

<div class="prereqs">
<h4>Antes de comenzar</h4>

- Necesita el permiso "Editar configuración de la iglesia". Consulte [Roles y permisos](./roles-permissions.md) si no tiene acceso.
- Tenga a mano la dirección, la información de contacto y el logotipo de su iglesia

</div>

## Editar la información de su iglesia

1. En B1 Admin, abra el [menú Jump](../introduction.md#getting-around-with-the-jump-menu) (la barra de búsqueda en la esquina superior izquierda), expanda **Configuración** y haga clic en **Configuración**.
2. En la sección **Información de la iglesia** (en la parte superior de la página), haga clic en **Editar**.
3. Actualice cualquiera de los siguientes campos:
   - **Nombre de la iglesia** -- El nombre que se muestra en todos los productos de ChurchApps.
   - **Dirección** -- La dirección física de su iglesia.
   - **Información de contacto** -- Número de teléfono, correo electrónico y otros datos de contacto.
   - **Zona horaria** -- La zona horaria de su iglesia. Consulte [Zona horaria](#time-zone) más abajo.
4. Haga clic en **Guardar** para aplicar sus cambios.

## Configurar su subdominio

Su iglesia recibe un subdominio gratuito en **yourchurch.1.church**. Es la dirección web donde los miembros y visitantes pueden acceder a la presencia en línea de su iglesia.

1. En la página de Configuración, haga clic en **Editar** en la sección **Información de la iglesia** y busque el campo **Subdominio**.
2. Ingrese el subdominio que prefiera (por ejemplo, "gracechurch" para gracechurch.1.church).
3. Guarde sus cambios.

:::info
Su subdominio debe ser único entre todas las iglesias de ChurchApps. Si el nombre que prefiere ya está en uso, pruebe agregando su ciudad o estado (por ejemplo, "gracechurch-dallas").
:::

Si desea que los visitantes lleguen a su sitio en su propio dominio (por ejemplo, **`www.gracechurch.org`**), consulte [Dominio personalizado](./custom-domain.md).

## Configurar la identidad visual

Personalice la forma en que su iglesia aparece en todas las herramientas de ChurchApps:

1. Suba el **logotipo de su iglesia** haciendo clic en el área del logotipo y seleccionando un archivo de imagen.
2. Agregue las **imágenes de la iglesia** adicionales que se usan en su sitio web y en la [aplicación móvil](./mobile-app.md).

:::tip
Para obtener mejores resultados, use un logotipo con fondo transparente en formato PNG. Así se verá bien tanto en fondos claros como oscuros.
:::

## Primer día de la semana

Elija el día en que comienzan sus calendarios. El menú desplegable **Primer día de la semana** en la sección Información de la iglesia está configurado en **domingo** de forma predeterminada, pero puede cambiarlo a cualquier día. Una vez modificado, se respeta en las cuadrículas de calendario de B1 Admin y del portal de miembros de B1.church: los calendarios de grupos, los calendarios seleccionados y el editor de eventos muestran las semanas a partir del día que elija.

## Zona horaria

El menú **Zona horaria** de la sección **Información de la iglesia** define la zona horaria de su iglesia (por ejemplo, *America/Chicago*). Elija **Ninguna** para dejarlo en blanco. Una vez guardada, la zona aparece en el resumen de Información de la iglesia.

B1 usa esta zona horaria para los horarios de toda la iglesia, como los recordatorios de eventos y los horarios de sus televisores de [FreePlay](../../freeplay/scheduled-mode/scheduling-the-calendar.md). Los [horarios de registro de entrada](../attendance/setup.md#setting-a-check-in-schedule) se miden primero en la zona horaria del [campus](./campuses.md) del servicio, y usan la zona horaria de la iglesia solo cuando ese campus no tiene una. Si todos sus campus están en la misma zona horaria, configúrela tanto en la iglesia como en cada campus.

## Región (formato de fechas y teléfonos)

La configuración de **Región** controla cómo se escriben las fechas y las horas en todo B1. De forma predeterminada, las fechas usan el formato de Estados Unidos (por ejemplo, "28 sep 2026" y "9/28/2026"). Las iglesias fuera de Estados Unidos pueden cambiar a su propio formato; por ejemplo, al elegir Inglés (Reino Unido) se muestra "28 sept 2026" y "28/09/2026".

1. En la página de Configuración, haga clic en **Región** en la lista de la izquierda y luego en **Editar** en la sección **Región**.
2. Elija su región en el menú desplegable **Región**. Cada opción muestra una fecha de ejemplo para que vea exactamente cómo se verán las fechas.
3. Haga clic en **Guardar**.

La sección Región muestra entonces la región seleccionada, un ejemplo del **Formato de fecha** y su formato de **Números de teléfono**.

### Formato de número de teléfono

La misma sección Región tiene una opción **Números de teléfono** que controla cómo se ingresan los números de teléfono en el registro de una persona:

- **Internacional (con código de país)** -- la opción predeterminada. Los campos de teléfono muestran un selector de bandera del país y guardan los números con el código de país (por ejemplo, +1 918 555 1234).
- **Local (tal como se escribe)** -- los campos de teléfono se convierten en cuadros de texto simples y guardan los números exactamente como los escribe, sin agregar código de país (por ejemplo, 0701 234 5678). Elija esta opción si su iglesia escribe los números en formato local y no quiere que B1 agregue un código de país.

Cuando se selecciona **Local**, la sección Región también muestra "Números de teléfono locales" junto a su región.

:::tip
Los mensajes de texto funcionan mejor cuando los números incluyen el código de país. Si envía mensajes de texto desde B1, mantenga el formato **Internacional** o asegúrese de que los números que escriba en modo Local incluyan el código de país.
:::

Su región se aplica a las fechas y horas en B1 Admin y en su sitio web de B1.church y en el portal de miembros, incluidos los sermones, las entradas del blog, los calendarios de grupos y los planes de servicio, para que los miembros vean las fechas en el mismo formato que su personal.

## Mensajes de texto {#texting}

Conecte un proveedor de mensajes de texto para enviar SMS a una persona o a un grupo completo desde B1 Admin. Los mensajes se envían a través de su propia cuenta con el proveedor, así que se aplican sus precios y límites.

1. En la página de Configuración, haga clic en **Mensajes de texto** en la lista de la izquierda y luego en **Editar** en la sección **Mensajes de texto**.
2. Elija un **Proveedor**:
   - **Clearstream** -- ingrese una **Clave de API**. Cree una en la configuración de su cuenta de Clearstream, en Claves de API.
   - **Text In Church** -- ingrese una **Clave de API**. Primero pida acceso a la API para desarrolladores al soporte de Text In Church y luego cree una clave en la sección Configuración de la cuenta > API para desarrolladores.
   - **Nalo Solutions** (Ghana) -- ingrese la clave de autenticación de su cuenta de Nalo Solutions como **Clave de API**, y un **ID de remitente** (de hasta 11 caracteres) que Nalo haya aprobado para usted.
   - **Twilio** -- use la cuenta de Twilio de su iglesia; Twilio le factura directamente. Copie el **Account SID** y el **Auth Token** desde la [Consola de Twilio](https://console.twilio.com) e ingrese un **Número de origen**: un número de teléfono de Twilio registrado para A2P 10DLC, con un formato como `+15551234567`. Después de guardar, pegue la URL del webhook de entrada (vea abajo) en el webhook **Llega un mensaje** del número en Twilio para que las respuestas STOP también se registren en B1.
3. Haga clic en **Guardar**.

Para dejar de enviar mensajes de texto, configure **Proveedor** en **Ninguno** y guarde. Esto elimina el proveedor guardado.

### Cancelar la suscripción de las personas que responden STOP

Una vez guardado un proveedor, vuelva a abrir la sección Mensajes de texto con **Editar**. Debajo de la configuración del proveedor, un campo de solo lectura **URL del webhook de entrada (STOP)** muestra una dirección web exclusiva de su iglesia. Haga clic en el campo para seleccionar la dirección, cópiela y péguela en la configuración de webhook de mensajes entrantes (respuestas) de su proveedor de mensajes. Esto funciona con cualquiera de los proveedores anteriores que pueda reenviar las respuestas entrantes a un webhook.

Después de eso, cuando alguien responde **STOP** (o STOPALL, UNSUBSCRIBE, CANCEL, END, QUIT, OPTOUT o REVOKE) a uno de sus mensajes, B1 busca a todas las personas cuyo número de celular coincida, las marca como suscripción cancelada y desactiva sus recordatorios por mensaje de texto. Luego se omiten en los mensajes de texto a grupos. Las demás respuestas se ignoran.

:::info
Esto usa la misma configuración de cancelación que **Ocultarme del directorio de miembros**, así que las personas que responden STOP también aparecen como **Oculto del directorio** en su perfil. El campo solo aparece mientras el proveedor guardado está seleccionado; si cambia el menú a otro proveedor, guarde primero para volver a ver la URL.
:::

Cuando hay un proveedor conectado, el personal con permiso para enviar mensajes de texto ve un botón **Texto** en la página de un grupo (**Enviar mensaje de texto a este grupo**) y de una persona con celular (**Enviar mensaje de texto**). Escriba su mensaje y haga clic en **Enviar**. El cuadro de diálogo cuenta los caracteres y los segmentos SMS. En el caso de un grupo, muestra cuántos miembros recibirán el mensaje antes de enviarlo:

- Los miembros sin celular registrado se omiten.
- Los miembros que eligieron **Ocultarme del directorio de miembros** se cuentan como suscripción cancelada y se omiten.
- Los familiares que comparten un número de celular reciben el mensaje solo una vez.

### Personalizar mensajes con campos de combinación {#personalizing-texts-with-merge-fields}

Debajo del cuadro de mensaje, el cuadro de diálogo de texto muestra etiquetas de marcador: **Nombre**, **Apellido**, **Nombre para mostrar** e **Nombre de la iglesia**. Haga clic en una etiqueta para insertar su marcador (`{{firstName}}`, `{{lastName}}`, `{{displayName}}` o `{{churchName}}`) en la posición del cursor. Cuando se envía el mensaje, cada marcador se reemplaza con los datos del destinatario, así que un mensaje a un grupo como `Hola {{firstName}}, ¡nos vemos el domingo!` llega a cada miembro con su propio nombre. Los marcadores funcionan tanto para mensajes a grupos como para mensajes a una sola persona. Los mensajes a un grupo también ofrecen una etiqueta **Nombre del grupo** (`{{groupName}}`), que se reemplaza por el nombre del grupo.

Para reutilizar un mensaje, guárdelo como una [plantilla de texto](./email-templates.md#text-templates) (una plantilla de correo con la categoría **Texto**) y elíjalo en **Cargar plantilla (opcional)** en la parte superior de la ventana de Texto.

:::info
El límite de 1,600 caracteres se aplica al mensaje tal como lo escribe. Después de completar los marcadores, cualquier texto de más de 1,600 caracteres se corta en ese límite.
:::

Los mensajes también pueden enviarse automáticamente desde un paso de [flujo de trabajo](../serving/workflows.md#sending-a-text) con la acción **Enviar mensaje de texto**, que usa el mismo proveedor y los mismos marcadores.

## Almacenamiento de archivos

De forma predeterminada, los archivos que sube a su sitio web (a través de [Archivos](../website/files.md)) y a otras áreas de contenido usan el almacenamiento alojado gratuito de B1, de hasta 100 MB. Si necesita más espacio, puede conectar su propio almacenamiento en la nube; las nuevas cargas van directamente a su cuenta, sin límite de la plataforma.

1. En la página de Configuración, haga clic en **Almacenamiento de archivos** en la lista de la izquierda y luego en **Editar** en la sección **Almacenamiento de archivos**.
2. Elija un proveedor: **Google Drive**, **Dropbox**, **OneDrive** o un **bucket compatible con S3** (AWS S3, Cloudflare R2, Backblaze B2, etc.).
3. Para Google Drive, Dropbox u OneDrive, haga clic en **Conectar** e inicie sesión para autorizar el acceso. Para un bucket compatible con S3, ingrese su clave de acceso, su clave secreta, el nombre del bucket y la URL base pública.
4. Haga clic en **Guardar**.

:::info
Esto solo afecta a las nuevas cargas en los Archivos de su sitio web y en áreas de contenido similares. Las imágenes de galería, las miniaturas, los logotipos y las fotos de personas siempre permanecen en el almacenamiento predeterminado de B1.
:::

## Promoción de grado

Si registra el **Grado** de los niños y estudiantes, B1 puede subir automáticamente a todos un grado en una fecha que usted elija (por ejemplo, el 1 de agosto), en lugar de obligarle a editar cada perfil a mano.

1. En la página de Configuración, haga clic en **Promoción de grado** en la lista de la izquierda y luego en **Editar** en la sección **Promoción de grado**.
2. Active el interruptor (muestra **Habilitada**) y elija el **Mes** y el **Día** para promover los grados cada año. En esa fecha, todos los que tengan un grado suben un grado, y los de 12.º grado pasan a **Graduado**.
3. Guarde sus cambios.

Para detener la promoción automática, desactive el interruptor para que muestre **Deshabilitada** y guarde. Se elimina la fecha de promoción y los grados ya no cambiarán por sí solos.

## Inscripción de voluntarios {#volunteer-signup}

De forma predeterminada, los miembros que consultan las [inscripciones de voluntarios](../../b1-church/serving/volunteer-signup.md) ven todas las semanas próximas que tienen posiciones abiertas. Si esa lista se vuelve muy larga, puede mostrar solo la próxima semana de cada tipo de plan.

1. En la página de Configuración, haga clic en **Inscripción de voluntarios** en la lista de la izquierda y luego en **Editar** en la sección **Inscripción de voluntarios**.
2. Active **Mostrar solo la próxima semana de cada tipo de plan**.
3. Guarde sus cambios.

Con esta opción activada, cada tipo de plan muestra solo su próximo plan. La semana siguiente aparece cuando pasa esa fecha. La fila **Semanas mostradas** de la sección indica **Solo la próxima semana de cada tipo de plan** o **Todas las semanas próximas**.

## Privacidad de las ofrendas {#giving-privacy}

Las personas con acceso a ofrendas normalmente ven los totales de ofrendas de una persona en su [registro de persona](../people/adding-people.md#editing-details). Si prefiere no mostrar los montos en pantalla cada vez que se abre un registro, puede ocultarlos hasta que alguien los solicite.

1. En la página de Configuración, haga clic en **Privacidad de ofrendas** en la lista de la izquierda y luego en **Editar** en la sección **Privacidad de ofrendas**.
2. Active **Ocultar ofrendas en registros de personas hasta hacer clic**.
3. Guarde sus cambios.

Con esta opción activada, la tarjeta de ofrendas en el registro de una persona dice "Las ofrendas están ocultas en los registros de personas". Haga clic en **Mostrar ofrendas** para cargar y mostrar las ofrendas de esa persona. Vuelve a ocultarse cuando abre el registro de otra persona. Quién puede ver las ofrendas no cambia: solo las personas con acceso a ofrendas ven la tarjeta.

## Importar y exportar

El enlace **Importar/Exportar** debajo del nombre de su iglesia en la página de Configuración abre una herramienta dedicada en una nueva ventana del navegador. Úselo para:

- Importar datos de miembros desde otro sistema de gestión de iglesias.
- Exportar sus datos de ChurchApps para respaldo o migración.

Esto es especialmente útil cuando está configurando su iglesia por primera vez y necesita transferir los registros existentes a ChurchApps.

:::warning
Al importar datos, haga siempre primero una copia de seguridad de sus registros existentes. Las operaciones de importación agregan datos a su sistema y pueden crear entradas duplicadas si se ejecutan varias veces.
:::
