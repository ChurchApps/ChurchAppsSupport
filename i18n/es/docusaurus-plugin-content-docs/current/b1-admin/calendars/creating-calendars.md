---
title: "Creación de calendarios"
description: "Cree un calendario en B1 Admin, conecte grupos o importe archivos .ics, y administre sus eventos, registros y notas desde un solo lugar."
---

# Creación de calendarios

<div class="article-intro">

Crear un calendario en B1 Admin le permite armar una vista seleccionada de eventos conectando uno o más grupos. Los eventos los administran los líderes de cada grupo, y su calendario muestra esos eventos en un solo lugar. Los administradores con acceso de edición pueden agregar o editar eventos de cualquier grupo. Los líderes de grupo que no son administradores solo pueden administrar los eventos de los grupos que lideran.

</div>

## Video de capacitación

<YouTube id="Ko3kgsCSLFs" title="Creación de calendarios, eventos y reservas de salas en B1" next="Registro a eventos y eventos de pago en B1" nextUrl="/docs/b1-admin/calendars/paid-registrations" />

<div class="prereqs">
<h4>Antes de comenzar</h4>

- Configure los [grupos](../groups/creating-groups.md) cuyos eventos desea incluir en su calendario
- Necesita acceso administrativo a la sección de Calendarios en B1 Admin

</div>

## Crear un nuevo calendario

1. En B1 Admin, abra el [menú Jump](../introduction.md#getting-around-with-the-jump-menu) (la barra de búsqueda en la esquina superior izquierda), expanda **Calendars** y haga clic en **Calendars**.
2. Haga clic en **Add Calendar** en la parte superior de la página. El formulario del nuevo calendario se abre debajo de la lista de calendarios.
3. Escriba un **nombre** para su calendario (por ejemplo, "Eventos del ministerio juvenil" o "Calendario principal de la iglesia").
4. Agregue una **descripción** opcional para ayudar a su equipo a entender para qué sirve este calendario.
5. Haga clic en **Create** para guardar el nuevo calendario.

## La página de detalle del calendario

Después de crear un calendario, haga clic en **Manage Events** en su fila para abrir la página de detalle. Esta página tiene dos áreas principales:

- **Columna izquierda** -- El nombre del calendario con sus acciones (**New Event**, **Edit**, **Import .ics** e **Print**), seguido de la lista **Groups in Calendar** con los grupos incluidos en este calendario. Haga clic en **Remove** junto a un grupo para quitarlo del calendario.
- **Área principal** -- La vista **Calendar Events** con los eventos tomados de los grupos conectados, y los botones **Subscribe** y **Add Group** encima. Cada evento se dibuja con el color de su grupo. Los colores se asignan automáticamente, y un grupo conserva el mismo color en todos los calendarios.

Haga clic en **Print** para obtener un mes imprimible. La impresión comienza con el logotipo de fondo claro de su iglesia (de [Apariencia](../website/appearance.md), si lo configuró), el nombre de la iglesia y el nombre del calendario. Los nombres de los eventos se ajustan en más líneas en lugar de cortarse, y se conservan los colores de los grupos.

## Conectar grupos

Los grupos que tienen eventos en el calendario aparecen automáticamente en la lista **Groups in Calendar**, en el lado izquierdo de la página de detalle.

1. Haga clic en **Add Group** encima del calendario para asociar un grupo con su calendario.
2. Seleccione el grupo del menú desplegable. La lista incluye todos los grupos de su iglesia, no solo los grupos a los que usted pertenece.
3. Elija si desea incluir **todos los eventos** de ese grupo o solo **eventos específicos**.
4. Haga clic en **Save**.

Cada evento aparece en el calendario una sola vez. Si agrega un grupo completo, los eventos que ya había agregado uno por uno se incorporan a la entrada del grupo, y elegir eventos específicos de un grupo que ya está en el calendario no agrega nada nuevo. Solo los grupos agregados completos aparecen en **Groups in Calendar**.

### Importar un archivo .ics

Haga clic en **Import .ics** para traer eventos de otro calendario. Elija el **Group** al que deben pertenecer los eventos, luego haga clic en **Choose .ics file** o pegue el contenido del archivo, y haga clic en **Import**. Los eventos se crean en ese grupo, y el grupo se agrega al calendario desde el que importó, de modo que los eventos aparecen allí de inmediato.

### Quitar un evento del calendario

Haga clic en un evento del calendario y luego en **Remove from Calendar**. Esto solo quita el evento de este calendario; el evento en sí permanece en su grupo. Si el evento está en el calendario porque se agregó todo su grupo, quitarlo elimina todos los eventos de ese grupo de este calendario (los eventos siguen en el grupo). Para eliminar un evento de forma definitiva, bórrelo desde el [calendario del grupo](../groups/group-calendar.md).

:::tip
Conectar grupos a su calendario es una forma eficaz de reunir eventos automáticamente. Cuando un líder de grupo agrega un evento a su [grupo](../groups/creating-groups.md), puede aparecer en el calendario de toda la iglesia sin trabajo adicional de su parte.
:::

:::info
Si desea crear un único calendario que reúna eventos de muchos grupos de su iglesia, consulte [Calendario curado](./curated-calendar.md) para un enfoque más sencillo.
:::

## Agregar y editar eventos {#adding-and-editing-events}

Haga clic en **New Event** en la página de detalle del calendario para agregar un evento, o haga clic en un evento del calendario y luego en **Edit** para cambiarlo. El formulario **New Event** / **Edit Event** tiene estos campos:

- **Group** -- El grupo al que pertenece el evento. Si su iglesia tiene plantillas de eventos, también puede elegir una **Template** para completar el formulario.
- **Title**
- **Event photo** -- Haga clic en **Add Photo** (o en el recuadro vacío de la foto) para elegir o subir una imagen, recortada en formato panorámico de 16:9. Haga clic en **Change Photo** para reemplazarla. La foto se muestra en la parte superior de la página del evento en su sitio web y como su mosaico cuando un elemento Calendario muestra **Upcoming events** (consulte [Mostrar eventos en su sitio web](#showing-events-on-your-website)).
- **Description** -- Se muestra en la página del evento en su sitio web. Se admiten texto en negrita, listas y enlaces.
- **Start** y **End**, **Repeats** y **Visibility** (**Public** o **Private**).
- **Tags** -- Etiquetas separadas por comas, como `jóvenes, estudiantes`. Un elemento Calendario en su sitio web puede configurarse para mostrar solo eventos con una etiqueta determinada. Es el mismo campo **Tags** que aparece en la configuración de registro del evento.
- **Who can view notes** y **Who can post notes** -- Quién puede leer y agregar notas al evento (consulte [Notas del evento](#event-notes)). Elija **Staff only** (la opción predeterminada), **Group leaders** (líderes del grupo del evento) o **Group members** (todas las personas del grupo del evento, incluidos sus líderes).
- **Rooms** y **Resources** -- Reserve espacio y equipo para el evento. Consulte [Salas, recursos y programación](./rooms-resources.md).

Haga clic en **Save**. Si el evento se repite, B1 le pedirá confirmación, porque guardar actualiza cada ocurrencia de la serie.

### Notas del evento {#event-notes}

Cada evento tiene su propio hilo de notas para la planificación y el seguimiento. Haga clic en un evento en la página de detalle del calendario; el cuadro de diálogo muestra los detalles del evento, sus recordatorios y sus **Notes** debajo. Escriba una nota y publíquela para agregarla al hilo.

El personal con permiso para editar contenido o administrar calendarios siempre puede leer y publicar notas de eventos. La configuración **Who can view notes** y **Who can post notes** del evento determina si los líderes o los miembros del grupo del evento también pueden hacerlo.

### Mostrar eventos en su sitio web {#showing-events-on-your-website}

Para mostrar un calendario en su sitio web, agregue un elemento **Calendar** a una página y elija este calendario. El elemento puede mostrar un calendario mensual o una cuadrícula de mosaicos de próximos eventos, y puede limitarse a los eventos con una etiqueta. Los visitantes que hacen clic en un evento abren su propia página de evento. Consulte [Uso del elemento Calendario](../website/page-editor.md#using-the-calendar-element).

## Habilitar el registro a eventos {#enabling-event-registration}

Puede habilitar el registro para cualquier evento del calendario para que los miembros se inscriban a través del sitio web de B1 o de la aplicación móvil.

1. Haga clic en un evento existente o cree uno nuevo.
2. En el editor del evento, active **Registration** para habilitarlo.
3. Configure los ajustes de registro:
   - **Capacity** (opcional) -- Establezca un número máximo de inscripciones. Déjelo en blanco para no tener límite.
   - **Registration Opens** -- La fecha y la hora en que el registro está disponible.
   - **Registration Closes** -- La fecha y la hora en que se cierra el registro.
   - **Tags** -- Etiquetas separadas por comas (por ejemplo, "jóvenes, retiro, VBS") para ayudar a categorizar los eventos con registro.
   - **Registration Questions** -- Opcionalmente, adjunte un [formulario](../forms/creating-forms.md) para que los inscritos respondan preguntas adicionales (restricciones alimentarias, talla de camiseta, contacto de emergencia, etc.) como parte de la inscripción. Elija **None** para omitir las preguntas.
   - **Enable Waitlist** -- Cuando el evento se llena, permite que los inscritos adicionales se unan a una lista de espera en lugar de ser rechazados. Consulte [Inscripciones pagadas](./paid-registrations.md#waitlist).
4. Guarde el evento.

En el caso de los eventos de pago, la misma página de configuración le permite definir **Attendee Types** con precio, **Selections** opcionales (complementos) y **Discount Codes**, con el cobro a través del proveedor de donaciones de su iglesia. Consulte [Inscripciones pagadas](./paid-registrations.md) para ver la guía completa.

Una vez habilitado el registro, los miembros verán un botón **Register for this Event** al consultar el evento en [B1.church o en la aplicación B1](../../b1-church/events/registering.md). Si adjuntó un formulario, los inscritos verán un paso **Questions** durante el registro, y sus respuestas se guardan junto con su inscripción.

:::info
Las preguntas de registro solo funcionan con formularios que **no** estén marcados como Restringidos. Un formulario restringido se omite automáticamente durante el registro en lugar de mostrarse, así que use un formulario no restringido cuando adjunte preguntas a un evento.
:::

### Administrar inscripciones

Para ver y administrar las inscripciones de sus eventos:

1. En el menú Jump, elija **Calendars > Registrations**.
2. Verá una tabla con todos los eventos que tienen el registro habilitado, con el título del evento, la fecha, el número actual de inscritos frente a la capacidad y las etiquetas.
3. Haga clic en un evento para ver la lista completa de inscripciones, con los nombres, el número de miembros, los tipos de asistente, el estado de pago y la fecha de inscripción.
4. Desde la página de detalle, puede:
   - **Add Attendee** -- Inscribir manualmente a alguien que se apuntó sin conexión o por teléfono.
   - **Cancel** inscripciones individuales
   - **Delete** inscripciones de forma permanente
   - **Promote** inscripciones de la lista de espera cuando se libere un lugar
   - **Export CSV** -- Descargar todas las inscripciones, incluidos los tipos de asistente, las selecciones, los montos pagados y las respuestas a las preguntas

Si el evento tiene preguntas de registro adjuntas, la página de detalle también muestra un filtro **Unanswered questions only** para encontrar rápidamente a los inscritos que aún no han enviado respuestas, y un botón **View Answers** en cada inscripción respondida para ver sus respuestas. Los eventos de pago agregan una columna **Type**, una columna **Paid / Total**, conteos por tipo y un cuadro de diálogo con el detalle de los pagos. Consulte [Inscripciones pagadas](./paid-registrations.md#the-registration-roster).

:::tip
Use la barra de progreso de capacidad para vigilar qué tan rápido se llenan los eventos. La barra se vuelve roja cuando un evento alcanza o supera su capacidad.
:::

## Próximos pasos

- [Calendario curado](./curated-calendar.md) -- Cree un calendario que reúna eventos de varios grupos
- [Inscripciones pagadas](./paid-registrations.md) -- Tipos de asistente, selecciones complementarias, códigos de descuento, pagos y listas de espera
- [Guía de registro a eventos](../guides/event-registration.md) -- Guía paso a paso para configurar el registro a eventos
- [Resumen de calendarios](./index.md) -- Volver al resumen de calendarios
