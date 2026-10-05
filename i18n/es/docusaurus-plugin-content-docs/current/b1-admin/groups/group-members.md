---
title: "Miembros del grupo"
---

# Miembros del grupo

<div class="article-intro">

Una vez que ha creado un grupo, el siguiente paso es añadir miembros. Desde la página de detalle de un grupo puede buscar personas, agregarlas al grupo, asignar líderes, enviar mensajes y exportar la lista de miembros. Gestionar la membresía del grupo es esencial para coordinar grupos pequeños, comités y clases.

</div>

<div class="prereqs">
<h4>Antes de comenzar</h4>

- Necesita al menos un grupo configurado en B1 Admin. Vea [Creación de grupos](creating-groups.md) si aún no ha creado uno.
- Las personas que desea añadir deben estar en su [directorio de personas](../people/adding-people.md). Si alguien no está, puede crear uno desde la búsqueda de miembros (ver a continuación).

</div>

## Añadir miembros a un grupo

1. En el [menú Jump](../introduction.md#getting-around-with-the-jump-menu), elija **People > Groups** y haga clic en el grupo que desea gestionar.
2. Haga clic en la pestaña **Members**.
3. En el cuadro de búsqueda, escriba el nombre de la persona que desea añadir.
4. Haga clic en **Add** junto al nombre de la persona en los resultados de búsqueda.
5. La persona ahora aparece en la lista de miembros del grupo.

:::tip
Deje el cuadro de búsqueda en blanco y haga clic en **Search** para navegar a través de todo su directorio. Esto es útil si no está seguro de la ortografía exacta del nombre de alguien.
:::

### Añadir a alguien que aún no está en B1

Si su búsqueda no encuentra a nadie, la búsqueda muestra **No records found** con un enlace **Add New Person**. Haga clic en él, ingrese el nombre y apellido de la persona y (opcionalmente) correo electrónico, y haga clic en **Add**. La nueva persona se crea en su directorio de personas y se agrega al grupo en un paso; no necesita buscarla de nuevo.

## Designar líderes de grupo

Los líderes del grupo tienen privilegios especiales; pueden editar el [calendario del grupo](group-calendar.md), gestionar eventos y ayudar a coordinar el grupo.

1. En la lista de miembros del grupo, encuentre a la persona que desea hacer líder.
2. Haga clic en el **icono de llave verde** junto a su nombre.
3. La persona ahora está designada como líder del grupo.

Para eliminar el estado de líder, haga clic en el icono de llave verde de nuevo.

:::info
Cualquier miembro del grupo puede ver el calendario del grupo y los eventos, pero solo los líderes pueden agregar o editar eventos del calendario.
:::

## Enviar mensajes a miembros del grupo

Puede comunicarse con todos los miembros de un grupo directamente desde B1 Admin:

1. Desde la página de detalle del grupo, busque el área de mensajería.
2. Escriba su mensaje en el cuadro de texto.
3. Haga clic en **Send**.

Su mensaje se entregará a todos los miembros del grupo.

## Envío de correo electrónico a miembros del grupo

Puede enviar correos electrónicos con formato a todos los miembros de un grupo:

1. Desde la página de detalle del grupo, haga clic en el **icono de correo electrónico**.
2. Se abre el diálogo Enviar correo electrónico, mostrando cuántos miembros recibirán el correo electrónico y cuántos no tienen dirección de correo electrónico en archivo.
3. Opcionalmente seleccione una **plantilla de correo electrónico** del menú desplegable o componga un mensaje desde cero. Haga clic en **Manage Templates** para crear o editar plantillas.
4. Ingrese una **línea de asunto**. Puede insertar campos de fusión haciendo clic en los chips de campo: `{{firstName}}`, `{{lastName}}`, `{{displayName}}`, `{{email}}`, `{{churchName}}`.
5. Componga el **cuerpo del correo electrónico** usando el editor HTML. Los mismos campos de fusión están disponibles aquí.
6. Haga clic en **Send**.
7. Un resumen muestra cuántos correos electrónicos se enviaron correctamente y cuántos miembros fueron omitidos (sin correo electrónico en archivo).

:::tip
Cree plantillas de correo electrónico reutilizables para comunicaciones recurrentes como actualizaciones semanales, anuncios de eventos o solicitudes de oración. Las plantillas ahorran tiempo y garantizan mensajería consistente.
:::

### Activar el correo electrónico del grupo para su iglesia

Todas las iglesias en B1 envían correo electrónico desde la misma dirección, por lo que comparten una reputación de envío. Para mantener el correo electrónico de todos fuera de carpetas de spam, el equipo de ChurchApps revisa cada iglesia una vez antes de que pueda enviar correo electrónico de grupo.

Si su iglesia aún no ha sido revisada, el diálogo Enviar correo electrónico muestra **Group email needs a quick review** en lugar del editor de mensajes:

1. Haga clic en **Request review**. El equipo de soporte de ChurchApps es notificado.
2. El diálogo cambia a **Review requested**. Puede cerrarlo.
3. El correo electrónico del grupo generalmente se activa dentro de un día hábil. Abra el diálogo Enviar correo electrónico nuevamente después para enviar su mensaje.

Hasta que su iglesia sea aprobada, B1 tampoco envía [correos electrónicos de seguimiento de formulario](../forms/creating-forms.md#sending-a-follow-up-email) o el paso **Send email** en [flujos de trabajo](../serving/workflows.md).

:::info Límites de envío
Después de la aprobación, una iglesia puede enviar hasta 150 correos electrónicos escritos por la iglesia por día. El límite crece a medida que su iglesia construye un historial de envío limpio, hasta 2,000 por día. Si los mensajes recientes rebotaron o fueron marcados como spam, el correo electrónico del grupo se pausa y el diálogo le pide que contacte con soporte. Si un envío superaría su límite diario, B1 no lo envía y muestra un error.
:::

## Envío de mensajes de texto a miembros del grupo

Una vez que su iglesia ha conectado un [proveedor de mensajes de texto](../settings/church-settings.md#texting), aparece un icono de texto (**Text this group**) en el encabezado del grupo.

1. Desde la página de detalle del grupo, haga clic en el **icono de texto**.
2. El diálogo muestra cuántos miembros recibirán el texto. Los miembros sin teléfono móvil en archivo o que han optado por no participar se omiten.
3. Escriba su mensaje. Para personalizarlo, haga clic en un chip de marcador de posición debajo del cuadro de mensaje; **First Name**, **Last Name**, **Display Name** o **Church Name**; para insertarlo en su cursor. Cada marcador de posición se completa con los detalles propios del destinatario cuando se envía el texto.
4. Haga clic en **Send**.

Vea [Personalización de textos con campos de fusión](../settings/church-settings.md#personalizing-texts-with-merge-fields) para más detalles.

## Exportar datos de grupo

Para descargar la lista de miembros del grupo como archivo:

1. Desde la página de detalle del grupo, haga clic en el **icono de descarga**.
2. Un archivo CSV que contiene la información del miembro del grupo se descargará a su computadora.

Para imprimir una hoja de asistencia para una clase en su lugar, use **Print Roll Sheet** vea [Imprimir una hoja de asistencia](../attendance/recording-attendance.md#printing-a-roll-sheet).

Una exportación CSV es útil para importar datos a otras herramientas o mantener registros sin conexión. Para más opciones de exportación, vea [Exportar datos](../people/exporting-data.md).

## Envío de notificaciones push a miembros del grupo

Puede enviar una notificación push directamente a todos los miembros del grupo que tengan la aplicación B1.church instalada en su dispositivo con notificaciones push habilitadas.

1. Desde la página de detalle del grupo, haga clic en el **icono de campana** en la barra de herramientas de encabezado (junto a los iconos de correo electrónico y texto; el icono de texto aparece una vez que se ha conectado un [proveedor de mensajes de texto](../settings/church-settings.md#texting)).
2. Se abre un diálogo mostrando cuántos miembros de su grupo tienen push habilitado.
3. Complete los detalles de notificación:
   - **Title** *(requerido)* — Un resumen breve, hasta 80 caracteres.
   - **Message** *(requerido)* — El cuerpo de la notificación, hasta 240 caracteres.
   - **Open link or flyer URL** *(opcional)* — Una ruta de aplicación relativa (por ejemplo, `/mobile/groups`) o una URL `https://` completa que la notificación abre cuando se toca.
   - **Image URL** *(opcional)* — Una URL `https://` a una imagen que aparece junto a la notificación en dispositivos compatibles.
4. Una vista previa en vivo muestra cómo se verá la notificación en el dispositivo.
5. Haga clic en **Send Notification**.

:::info
Las notificaciones push se entregan solo a miembros del grupo que tienen el PWA B1.church instalado y no han deshabilitado las notificaciones push. Los miembros sin un dispositivo push registrado o con push desactivado se cuentan como omitidos, y el resumen de envío muestra cuántos fueron alcanzados frente a omitidos.
:::

:::tip
Después del envío, el diálogo muestra cuántas notificaciones se encolaron correctamente. Si la mayoría de los miembros aparecen como omitidos, recuérdeles que visiten su sitio B1.church, instálenlo como una aplicación de pantalla de inicio y permitan notificaciones cuando se les solicite.
:::

## Eliminar miembros

Para eliminar a alguien de un grupo, localize su nombre en la lista de miembros y haga clic en el botón **remove** junto a su entrada.

:::info
Eliminar a una persona de un grupo no los elimina de su directorio de iglesia. Seguirán apareciendo en la sección [Personas](../people/adding-people.md) y pueden volver a agregarse al grupo en cualquier momento.
:::
