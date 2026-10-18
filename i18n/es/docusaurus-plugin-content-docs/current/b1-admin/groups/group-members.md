---
title: "Miembros del grupo"
---

# Miembros del grupo

<div class="article-intro">

Una vez creado un grupo, el siguiente paso es agregar miembros. Desde la página de detalles del grupo puede buscar personas, agregarlas al grupo, asignar líderes, enviar mensajes y exportar la lista de miembros. Administrar la membresía del grupo es esencial para coordinar grupos pequeños, comités y clases.

</div>

<div class="prereqs">
<h4>Antes de comenzar</h4>

- Necesita al menos un grupo configurado en B1 Admin. Consulte [Crear grupos](creating-groups.md) si todavía no ha creado uno.
- Las personas que desea agregar deben estar ya en su directorio de [People](../people/adding-people.md). Si alguien no está, puede crearlo desde la búsqueda de miembros (consulte más abajo).

</div>

## Agregar miembros a un grupo

1. En el [menú Jump](../introduction.md#getting-around-with-the-jump-menu), elija **People > Groups** y haga clic en el grupo que desea administrar.
2. En la sección **Members** de la página del grupo, haga clic en **All members**. (Los equipos y ministerios se abren directamente en su lista de miembros.)
3. En el cuadro **Add Person** debajo de la lista de miembros, escriba el nombre de la persona que desea agregar y presione **Enter** o haga clic en el icono de búsqueda.
4. Haga clic en el nombre de la persona, o en el icono de agregar junto a él, en los resultados de búsqueda.
5. La persona ya aparece en la lista de miembros del grupo.

:::tip
Antes de escribir nada, el cuadro **Add Person** muestra una lista corta de **Recent people** que puede agregar con un solo clic.
:::

Cuando termine, haga clic en el enlace **Back to** con el nombre del grupo para volver a la página del grupo. La página del grupo muestra un resumen de **Members**, **Sessions**, **Calendar** y **Health**, cada uno con un enlace a su vista completa.

### Agregar a alguien que todavía no está en B1

Si la búsqueda no encuentra a nadie, aparece **No records found** con un enlace **Add New Person**. Haga clic en él, escriba el nombre, el apellido y (opcionalmente) el correo electrónico de la persona, y haga clic en **Add**. La nueva persona se crea en su directorio de People y se agrega al grupo en un solo paso, sin necesidad de buscarla otra vez.

## Designar líderes del grupo

Los líderes del grupo tienen privilegios especiales: pueden editar el [calendario del grupo](group-calendar.md), gestionar eventos y ayudar a coordinar el grupo.

1. En la lista de miembros del grupo, busque a la persona que desea convertir en líder.
2. Haga clic en el **icono de estrella** (**Make Leader**) junto a su nombre.
3. La persona queda designada como líder del grupo y muestra una insignia **Leader**.

Para quitar el estado de líder, haga clic de nuevo en el icono de estrella (**Remove Leader Access**).

:::info
Cualquier miembro del grupo puede ver el calendario y los eventos del grupo, pero solo los líderes pueden agregar o editar eventos del calendario.
:::

## Enviar mensajes a los miembros del grupo

Puede comunicarse con todos los miembros de un grupo directamente desde B1 Admin:

1. En la lista de miembros del grupo, haga clic en el icono **Send a message to members** encima de la lista.
2. Escriba su mensaje en el cuadro de texto (o elija uno de **Templates**).
3. Haga clic en **Send**.

Su mensaje se entregará a todos los miembros del grupo.

## Enviar correos electrónicos a los miembros del grupo

Puede enviar correos con formato a todos los miembros de un grupo:

1. Desde la página de detalles del grupo, haga clic en el botón **Email** en el lado izquierdo de la página.
2. Se abre el cuadro de diálogo Send Email, que muestra cuántos miembros recibirán el correo y cuántos no tienen una dirección de correo registrada.
3. Opcionalmente, seleccione una **plantilla de correo** en el menú desplegable, o redacte un mensaje desde cero. Haga clic en **Manage Templates** para crear o editar plantillas.
4. Escriba un **subject line** (asunto). Puede insertar campos de combinación haciendo clic en las fichas de campos: `{{firstName}}`, `{{lastName}}`, `{{displayName}}`, `{{email}}`, `{{churchName}}`.
5. Redacte el **email body** (cuerpo del correo) con el editor HTML. Los mismos campos de combinación también están disponibles aquí.
6. Haga clic en **Send**.
7. Un resumen muestra cuántos correos se enviaron correctamente y cuántos miembros se omitieron (sin correo registrado).

:::tip
Cree plantillas de correo reutilizables para comunicaciones recurrentes, como las actualizaciones semanales, los anuncios de eventos o las peticiones de oración. Las plantillas ahorran tiempo y mantienen un mensaje coherente.
:::

### Activar el correo de grupo para su iglesia {#turning-on-group-email-for-your-church}

Todas las iglesias de B1 envían correos desde la misma dirección, por lo que comparten una misma reputación de envío. Para evitar que los correos de todos terminen en la carpeta de spam, el equipo de ChurchApps revisa cada iglesia una vez antes de que pueda enviar correos de grupo.

Si su iglesia todavía no ha sido revisada, el cuadro de diálogo Send Email muestra **Group email needs a quick review** en lugar del editor de mensajes:

1. Haga clic en **Request review**. Se notifica al equipo de soporte de ChurchApps.
2. El cuadro de diálogo cambia a **Review requested**. Puede cerrarlo.
3. El correo de grupo normalmente se activa en un día hábil. Después de eso, vuelva a abrir el cuadro de diálogo Send Email para enviar su mensaje.

Hasta que su iglesia sea aprobada, B1 tampoco envía los [correos de seguimiento de formularios](../forms/creating-forms.md#sending-a-follow-up-email) ni el paso **Send email** de los [flujos de trabajo](../serving/workflows.md).

:::info Límites de envío
Después de la aprobación, una iglesia puede enviar hasta 150 correos redactados por la iglesia al día. El límite aumenta a medida que su iglesia acumula un historial de envíos limpio, hasta 2,000 al día. Si recientemente hubo mensajes rebotados o marcados como spam, el correo de grupo se pausa y el cuadro de diálogo le pide que contacte con soporte. Si un envío superaría su límite diario, B1 no lo envía y muestra un error.
:::

## Enviar mensajes de texto a los miembros del grupo

Una vez que su iglesia haya conectado un [proveedor de mensajes de texto](../settings/church-settings.md#texting), aparece un botón **Text** (**Text this group**) junto al botón **Email** en la página del grupo.

1. Desde la página de detalles del grupo, haga clic en **Text**.
2. El cuadro de diálogo muestra cuántos miembros recibirán el mensaje. Se omiten los miembros sin número de teléfono móvil registrado o que hayan optado por no recibir mensajes.
3. Escriba su mensaje. Para personalizarlo, haga clic en una ficha de marcador debajo del cuadro de mensaje (**First Name**, **Last Name**, **Display Name** o **Church Name**) para insertarlo en la posición del cursor. Cada marcador se reemplaza con los datos de cada destinatario al enviar el mensaje.
4. Haga clic en **Send**.

Consulte [Personalizar mensajes de texto con campos de combinación](../settings/church-settings.md#personalizing-texts-with-merge-fields) para obtener más detalles.

## Exportar datos del grupo

Para descargar la lista de miembros del grupo como archivo:

1. En la lista de miembros del grupo, haga clic en **Export** encima de la lista.
2. Se descargará a su computadora un archivo CSV con la información de los miembros del grupo.

Una exportación CSV es útil para importar datos en otras herramientas o para conservar registros sin conexión. Para ver más opciones de exportación, consulte [Exportar datos](../people/exporting-data.md).

## Imprimir la lista de miembros

En la lista de miembros del grupo, haga clic en el icono **Print Roll Sheet** (impresora) encima de la lista y elija un diseño. La página se abre en una nueva pestaña y el cuadro de diálogo de impresión de su navegador aparece automáticamente.

- **Attendance Sheet** -- Una lista de clase sin fecha, con casillas **Present** y **Absent** para que los maestros marquen a mano. Consulte [Imprimir una hoja de asistencia](../attendance/recording-attendance.md#printing-a-roll-sheet).
- **Contact Roster** -- Una lista de contactos del grupo, fechada con el día de hoy y encabezada con el logotipo de su iglesia (el **Light Background Logo** de [Website > Appearance](../website/appearance.md), si ha subido uno), con el nombre de su iglesia debajo, y el nombre del grupo. Cada miembro tiene una fila con su **Name**, **Phone**, **Email** y **Address**. Los líderes aparecen primero y se marcan como **Leader**; después, el resto de los miembros ordenados por apellido. El teléfono que se muestra es el número móvil del miembro o, si no tiene móvil, su número de casa o del trabajo. Los datos de contacto quedan en blanco para quienes han optado por no recibir mensajes.

:::warning
Una lista de contactos contiene información de contacto personal de los miembros. Comparta las copias impresas solo con los líderes del grupo y con otras personas que las necesiten.
:::

## Enviar notificaciones push a los miembros del grupo

Puede enviar una notificación push directamente a todos los miembros del grupo que tengan instalada la aplicación B1.church en su dispositivo y tengan activadas las notificaciones push.

1. Desde la página de detalles del grupo, haga clic en **Notify** (debajo de los botones **Email** y **Text**; el botón **Text** aparece una vez que se conecta un [proveedor de mensajes de texto](../settings/church-settings.md#texting)).
2. Se abre un cuadro de diálogo que muestra cuántos miembros de su grupo tienen las notificaciones push activadas.
3. Complete los datos de la notificación:
   - **Title** *(obligatorio)* -- Un resumen breve, de hasta 80 caracteres.
   - **Message** *(obligatorio)* -- El cuerpo de la notificación, de hasta 240 caracteres.
   - **Open link or flyer URL** *(opcional)* -- Una ruta relativa de la aplicación (por ejemplo, `/mobile/groups`) o una URL completa `https://` que se abre al tocar la notificación.
   - **Image URL** *(opcional)* -- Una URL `https://` de una imagen que aparece junto a la notificación en los dispositivos compatibles.
4. Una vista previa en vivo muestra cómo aparecerá la notificación en el dispositivo.
5. Haga clic en **Send Notification**.

:::info
Las notificaciones push solo se entregan a los miembros del grupo que tienen instalada la PWA de B1.church y no han desactivado las notificaciones push. Los miembros sin un dispositivo registrado para push, o con push desactivado, se cuentan como omitidos, y el resumen del envío muestra cuántos se alcanzaron y cuántos se omitieron.
:::

:::tip
Después de enviar, el cuadro de diálogo muestra cuántas notificaciones se pusieron en cola correctamente. Si la mayoría de los miembros aparecen como omitidos, recuérdeles que visiten su sitio de B1.church, lo instalen como aplicación en la pantalla de inicio y permitan las notificaciones cuando se les pida.
:::

## Quitar miembros

Para quitar a alguien de un grupo, busque su nombre en la lista de miembros y haga clic en el botón **remove** junto a su nombre.

:::info
Quitar a una persona de un grupo no la elimina del directorio de la iglesia. Seguirá apareciendo en la sección [People](../people/adding-people.md) y puede volver a agregarse al grupo en cualquier momento.
:::
