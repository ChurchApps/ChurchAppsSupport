---
title: "Miembros del grupo"
---

# Miembros del grupo

<div class="article-intro">

Una vez que haya creado un grupo, el siguiente paso es agregar miembros. Desde la página de detalles del grupo puede buscar personas, agregarlas al grupo, asignar líderes, enviar mensajes y exportar la lista de miembros. Administrar la membresía del grupo es esencial para coordinar grupos pequeños, comités y clases.

</div>

<div class="prereqs">
<h4>Antes de Comenzar</h4>

- Necesita al menos un grupo configurado en B1 Admin. Consulte [Crear grupos](creating-groups.md) si aún no ha creado uno.
- Las personas que desea agregar deben estar ya en su directorio de [Personas](../people/adding-people.md). Si alguien no está, puede crearlo desde la búsqueda de miembros (consulte más abajo).

</div>

## Agregar miembros a un grupo

1. En el [menú de salto](../introduction.md#getting-around-with-the-jump-menu), elija **Personas > Grupos** y haga clic en el grupo que desea administrar.
2. En la sección **Miembros** de la página del grupo, haga clic en **Todos los miembros**. (Los equipos y ministerios se abren directamente en su lista de miembros).
3. En el cuadro **Agregar persona** debajo de la lista de miembros, escriba el nombre de la persona que desea agregar y presione **Enter** o haga clic en el ícono de búsqueda.
4. Haga clic en el nombre de la persona, o en el ícono de agregar junto a él, en los resultados de búsqueda.
5. La persona ahora aparece en la lista de miembros del grupo.

:::tip
Antes de escribir algo, el cuadro **Agregar persona** muestra una lista corta de **Personas recientes** que puede agregar con un solo clic.
:::

Cuando termine, haga clic en el enlace **Volver a** con el nombre del grupo para regresar a la página del grupo. La página del grupo muestra un resumen de **Miembros**, **Sesiones**, **Calendario** y **Salud** del grupo, cada uno con un enlace a su vista completa. Si usted es uno de los líderes del grupo, también muestra **Notas del líder** (consulte [Notas del líder](#leader-notes) más abajo).

### Agregar a alguien que todavía no está en B1

Si su búsqueda no encuentra a nadie, la búsqueda muestra **No se encontraron registros** con un enlace **Agregar nueva persona**. Haga clic en él, escriba el nombre y apellido de la persona y, opcionalmente, su correo electrónico, y haga clic en **Agregar**. La nueva persona se crea en su directorio de Personas y se agrega al grupo en un solo paso; no necesita buscarla de nuevo.

## Designar líderes de grupo {#designating-group-leaders}

Los líderes de grupo tienen privilegios especiales: pueden editar el [calendario del grupo](group-calendar.md), administrar eventos y ayudar a coordinar el grupo.

1. En la lista de miembros del grupo, busque a la persona que desea designar como líder.
2. Haga clic en el **ícono de estrella** (**Hacer líder**) junto a su nombre.
3. La persona ahora está designada como líder del grupo y muestra una insignia **Líder**.

Para quitar el estado de líder, haga clic de nuevo en el ícono de estrella (**Quitar acceso de líder**).

:::info
Cualquier miembro del grupo puede ver el calendario y los eventos del grupo, pero solo los líderes pueden agregar o editar eventos del calendario.
:::

## Notas del líder {#leader-notes}

Los líderes de grupo pueden guardar notas privadas sobre el grupo -por ejemplo, seguimientos, peticiones de oración o inquietudes pastorales- que el resto del grupo nunca ve.

La sección **Notas del líder** aparece en la página del grupo solo para las personas que son líderes de ese grupo. Muestra la nota más reciente, quién la escribió y cuándo, y cuántas notas hay.

1. En la página del grupo, haga clic en **Todas las notas** en la sección **Notas del líder**.
2. Escriba su nota en el cuadro y publíquela. Las notas se muestran con el nombre y la foto del autor.
3. Haga clic en el enlace **Volver a** con el nombre del grupo para regresar a la página del grupo.

:::info
Las notas del líder solo son visibles para los líderes del grupo. Los demás miembros no pueden verlas, y tampoco el personal ni los administradores, incluso con permisos completos, a menos que también sean líderes de ese grupo. Para dar acceso a otra persona, [hágala líder](#designating-group-leaders). Los líderes también ven estas notas en la sección **Notas del líder** de la página del grupo en [B1.church](../../b1-church/groups/group-details.md#leader-notes).
:::

## Enviar mensajes a los miembros del grupo

Puede comunicarse directamente desde B1 Admin con todos los miembros de un grupo:

1. En la lista de miembros del grupo, haga clic en el ícono **Enviar un mensaje a los miembros** encima de la lista.
2. Escriba su mensaje en el cuadro de texto (o elija uno de **Plantillas**).
3. Haga clic en **Enviar**.

Su mensaje se entregará a todos los miembros del grupo.

## Enviar correos electrónicos a los miembros del grupo

Puede enviar correos electrónicos con formato a todos los miembros de un grupo:

1. Desde la página de detalles del grupo, haga clic en el botón **Correo electrónico** en el lado izquierdo de la página.
2. Se abre el diálogo Enviar correo electrónico, que muestra cuántos miembros recibirán el correo y cuántos no tienen una dirección de correo registrada.
3. Opcionalmente, seleccione una **plantilla de correo electrónico** del menú desplegable, o redacte un mensaje desde cero. Haga clic en **Administrar plantillas** para crear o editar plantillas.
4. Escriba un **asunto**. Puede insertar campos de combinación haciendo clic en las fichas de campos: `{{firstName}}`, `{{lastName}}`, `{{displayName}}`, `{{email}}`, `{{churchName}}`.
5. Redacte el **cuerpo del correo** usando el editor HTML. Los mismos campos de combinación están disponibles aquí.
6. Haga clic en **Enviar**.
7. Un resumen muestra cuántos correos se enviaron correctamente y cuántos miembros se omitieron (sin correo electrónico registrado).

:::tip
Cree plantillas de correo reutilizables para comunicaciones recurrentes como actualizaciones semanales, anuncios de eventos o peticiones de oración. Las plantillas ahorran tiempo y mantienen un mensaje consistente.
:::

### Activar el correo de grupo para su iglesia {#turning-on-group-email-for-your-church}

Todas las iglesias en B1 envían correos desde la misma dirección, por lo que comparten una misma reputación de envío. Para que los correos de todos eviten las carpetas de spam, el equipo de ChurchApps revisa cada iglesia una vez antes de que pueda enviar correo de grupo.

Si su iglesia todavía no ha sido revisada, el diálogo Enviar correo electrónico muestra **El correo de grupo necesita una revisión rápida** en lugar del editor de mensajes:

1. Haga clic en **Solicitar revisión**. Se notifica al equipo de soporte de ChurchApps.
2. El diálogo cambia a **Revisión solicitada**. Puede cerrarlo.
3. El correo de grupo suele activarse dentro de un día hábil. Después de eso, abra de nuevo el diálogo Enviar correo electrónico para enviar su mensaje.

Hasta que su iglesia sea aprobada, B1 tampoco envía los [correos de seguimiento de formularios](../forms/creating-forms.md#sending-a-follow-up-email) ni el paso **Enviar correo electrónico** de los [flujos de trabajo](../serving/workflows.md).

:::info Límites de envío
Después de la aprobación, una iglesia puede enviar hasta 150 correos redactados por la iglesia al día. El límite aumenta a medida que la iglesia construye un historial de envíos limpio, hasta 2,000 al día. Si recientemente hubo mensajes rebotados o marcados como spam, el correo de grupo se pausa y el diálogo le pide que se comunique con soporte. Si un envío superaría su límite diario, B1 no lo envía y muestra un error.
:::

## Enviar mensajes de texto a los miembros del grupo

Una vez que su iglesia haya conectado un [proveedor de mensajes de texto](../settings/church-settings.md#texting), aparece un botón **Texto** (**Enviar texto a este grupo**) junto al botón **Correo electrónico** en la página del grupo.

1. Desde la página de detalles del grupo, haga clic en **Texto**.
2. El diálogo muestra cuántos miembros recibirán el mensaje. Los miembros sin teléfono móvil registrado o que hayan cancelado la suscripción se omiten.
3. Escriba su mensaje. Para personalizarlo, haga clic en una ficha de marcador debajo del cuadro de mensaje -**Nombre**, **Apellido**, **Nombre para mostrar** o **Nombre de la iglesia**- para insertarlo en la posición del cursor. Cada marcador se reemplaza con los datos del destinatario al enviar el mensaje.
4. Haga clic en **Enviar**.

Consulte [Personalizar mensajes de texto con campos de combinación](../settings/church-settings.md#personalizing-texts-with-merge-fields) para más detalles.

## Exportar datos del grupo

Para descargar la lista de miembros del grupo como archivo:

1. En la lista de miembros del grupo, haga clic en **Exportar** encima de la lista.
2. Se descargará a su computadora un archivo CSV con la información de los miembros del grupo.

Una exportación CSV es útil para importar datos a otras herramientas o para conservar registros fuera de línea. Para más opciones de exportación, consulte [Exportar datos](../people/exporting-data.md).

## Imprimir la lista de miembros {#printing-the-member-list}

En la lista de miembros del grupo, haga clic en el ícono **Imprimir lista de asistencia** (impresora) encima de la lista y elija un diseño. La página se abre en una nueva pestaña y el diálogo de impresión de su navegador aparece automáticamente.

- **Hoja de asistencia** -- una lista de clase sin fecha con casillas **Presente** y **Ausente** para que los maestros las marquen a mano. Consulte [Imprimir una lista de asistencia](../attendance/recording-attendance.md#printing-a-roll-sheet).
- **Lista de contactos** -- una lista de contactos del grupo, con la fecha de hoy y encabezada con el logotipo de su iglesia (el **Logotipo para fondo claro** de [Sitio web > Apariencia](../website/appearance.md), si lo ha subido), con el nombre de la iglesia debajo y el nombre del grupo. Cada miembro tiene una fila con su **Nombre**, **Teléfono**, **Correo electrónico** y **Dirección**. Los líderes aparecen primero y están marcados como **Líder**, y luego el resto ordenado por apellido. El teléfono que se muestra es el número móvil del miembro, o su número de casa o del trabajo si no tiene móvil. Los datos de contacto quedan en blanco para quienes hayan cancelado la suscripción.

:::warning
Una lista de contactos contiene información de contacto personal de los miembros. Comparta las copias impresas solo con los líderes del grupo y con otras personas que las necesiten.
:::

## Enviar notificaciones push a los miembros del grupo

Puede enviar una notificación push directamente a todos los miembros del grupo que tengan instalada la app de B1.church en su dispositivo con las notificaciones push activadas.

1. Desde la página de detalles del grupo, haga clic en **Notificar** (debajo de los botones **Correo electrónico** y **Texto** -el botón **Texto** aparece una vez que esté conectado un [proveedor de mensajes de texto](../settings/church-settings.md#texting)).
2. Se abre un diálogo que muestra cuántos miembros de su grupo tienen las notificaciones push activadas.
3. Complete los datos de la notificación:
   - **Título** *(obligatorio)* -- Un resumen breve, de hasta 80 caracteres.
   - **Mensaje** *(obligatorio)* -- El cuerpo de la notificación, de hasta 240 caracteres.
   - **Enlace o URL del volante para abrir** *(opcional)* -- Una ruta relativa de la app (por ejemplo, `/mobile/groups`) o una URL completa `https://` que se abre al tocar la notificación.
   - **URL de la imagen** *(opcional)* -- Una URL `https://` de una imagen que aparece junto a la notificación en los dispositivos compatibles.
4. Una vista previa en vivo muestra cómo aparecerá la notificación en el dispositivo.
5. Haga clic en **Enviar notificación**.

:::info
Las notificaciones push solo se entregan a los miembros del grupo que tengan instalada la PWA de B1.church y no hayan desactivado las notificaciones push. Los miembros sin un dispositivo registrado para push o con push desactivado se cuentan como omitidos, y el resumen del envío muestra cuántos se alcanzaron y cuántos se omitieron.
:::

:::tip
Después de enviar, el diálogo muestra cuántas notificaciones se pusieron en cola correctamente. Si la mayoría de los miembros aparece como omitida, recuérdeles que visiten su sitio de B1.church, lo instalen como app en la pantalla de inicio y permitan las notificaciones cuando se les pida.
:::

## Quitar miembros

Para quitar a alguien de un grupo, busque su nombre en la lista de miembros y haga clic en el botón **quitar** junto a su entrada.

:::info
Quitar a una persona de un grupo no la elimina de su directorio de la iglesia. Seguirá apareciendo en la sección [Personas](../people/adding-people.md) y puede volver a agregarse al grupo en cualquier momento.
:::
