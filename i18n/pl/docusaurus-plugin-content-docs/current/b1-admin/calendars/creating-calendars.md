---
title: "Creando calendarios"
description: "Crea un calendario en B1 Admin, conecta grupos o importa archivos .ics, y gestiona sus eventos, inscripciones y notas desde un solo lugar."
---

# Creando calendarios

<div class="article-intro">

Crear un calendario en B1 Admin te permite construir una vista seleccionada de eventos conectando uno o más grupos. Los eventos son gestionados por los líderes de grupo dentro de sus grupos, y tu calendario muestra esos eventos en un solo lugar. Los administradores con acceso de edición pueden agregar o editar eventos de cualquier grupo. Los líderes de grupo que no son administradores solo pueden gestionar eventos de los grupos que lideran.

</div>

## Video de capacitación

<YouTube id="Ko3kgsCSLFs" title="Creando calendarios, eventos y reservas de salas en B1" next="Inscripción a eventos y eventos de pago en B1" nextUrl="/docs/b1-admin/calendars/paid-registrations" />

<div class="prereqs">
<h4>Antes de comenzar</h4>

- Configura los [grupos](../groups/creating-groups.md) cuyos eventos quieras incluir en tu calendario
- Necesitas acceso administrativo a la sección de Calendarios en B1 Admin

</div>

## Creando un nuevo calendario

1. En B1 Admin, abre el [menú de salto](../introduction.md#getting-around-with-the-jump-menu) (la barra de búsqueda en la parte superior izquierda), expande **Calendars** y haz clic en **Calendars**.
2. Haz clic en **Add Calendar** en la parte superior de la página. El formulario de nuevo calendario se abre debajo de la lista de calendarios.
3. Ingresa un **nombre** para tu calendario (por ejemplo, "Eventos de Ministerio Juvenil" o "Calendario principal de la iglesia").
4. Agrega una **descripción** opcional para ayudar a tu equipo a entender para qué sirve este calendario.
5. Haz clic en **Create** para guardar tu nuevo calendario.

## La página de detalle del calendario

Después de crear un calendario, haz clic en **Manage Events** en su fila para abrir la página de detalle. Esta página tiene dos áreas principales:

- **Columna izquierda** -- El nombre del calendario con sus acciones (**New Event**, **Edit**, **Import .ics** y **Print**), seguido de la lista **Groups in Calendar** que muestra qué grupos están incluidos en este calendario. Haz clic en **Remove** junto a un grupo para quitarlo del calendario.
- **Área principal** -- La vista **Calendar Events** que muestra los eventos traídos de los grupos conectados, con los botones **Subscribe** y **Add Group** encima.

## Conectando grupos

Los grupos que tienen eventos en el calendario aparecen automáticamente en la lista **Groups in Calendar** del lado izquierdo de la página de detalle.

1. Haz clic en **Add Group** encima del calendario para asociar un grupo con tu calendario.
2. Selecciona el grupo del menú desplegable. La lista incluye todos los grupos de tu iglesia, no solo los grupos a los que perteneces.
3. Elige si incluir **all events** de ese grupo o solo **specific events**.
4. Haz clic en **Save**.

Cada evento aparece en el calendario solo una vez. Si agregas un grupo completo, cualquiera de sus eventos que hubieras agregado antes individualmente se incorpora a la entrada del grupo, y elegir eventos específicos de un grupo que ya está en el calendario no agrega nada nuevo. Solo los grupos agregados completos aparecen en **Groups in Calendar**.

### Importando un archivo .ics

Haz clic en **Import .ics** para traer eventos de otro calendario. Elige el **Group** al que deben pertenecer los eventos, luego haz clic en **Choose .ics file** o pega el contenido del archivo, y haz clic en **Import**. Los eventos se crean en ese grupo, y el grupo se agrega al calendario desde el que importaste, así que los eventos aparecen allí de inmediato.

### Quitando un evento del calendario

Haz clic en un evento del calendario y luego en **Remove from Calendar**. Esto solo quita el evento de este calendario -- el evento en sí permanece en su grupo. Si el evento está en el calendario porque se agregó todo su grupo, quitarlo elimina todos los eventos de ese grupo de este calendario (los eventos siguen en el grupo). Para eliminar un evento de forma definitiva, bórralo desde el [calendario del grupo](../groups/group-calendar.md).

:::tip
Conectar grupos a tu calendario es una forma eficaz de agregar eventos automáticamente. Cuando un líder de grupo agrega un evento a su [grupo](../groups/creating-groups.md), puede aparecer en el calendario de toda la iglesia sin ningún trabajo adicional de tu parte.
:::

:::info
Si quieres crear un único calendario que reúna eventos de muchos grupos de tu iglesia, consulta [Calendario curado](./curated-calendar.md) para un enfoque más sencillo.
:::

## Agregando y editando eventos {#adding-and-editing-events}

Haz clic en **New Event** en la página de detalle del calendario para agregar un evento, o haz clic en un evento del calendario y luego en **Edit** para cambiarlo. El formulario **New Event** / **Edit Event** tiene estos campos:

- **Group** -- El grupo al que pertenece el evento. Si tu iglesia tiene plantillas de eventos, también puedes elegir una **Template** para completar el formulario.
- **Title**
- **Event photo** -- Haz clic en **Add Photo** (o en el recuadro vacío de la foto) para elegir o subir una imagen, recortada en formato panorámico 16:9. Haz clic en **Change Photo** para reemplazarla. La foto se muestra en la parte superior de la página del evento en tu sitio web y como su miniatura cuando un elemento Calendar muestra **Upcoming events** (consulta [Mostrando eventos en tu sitio web](#showing-events-on-your-website)).
- **Description** -- Se muestra en la página del evento en tu sitio web. Se admiten texto en negrita, listas y enlaces.
- **Start** y **End**, **Repeats** y **Visibility** (**Public** o **Private**).
- **Tags** -- Etiquetas separadas por comas, como `youth, students`. Un elemento Calendar en tu sitio web puede configurarse para mostrar solo eventos con una etiqueta determinada. Es el mismo campo **Tags** que aparece en la configuración de inscripción del evento.
- **Who can view notes** y **Who can post notes** -- Quién puede leer y agregar notas del evento (consulta [Notas del evento](#event-notes)). Elige **Staff only** (la opción predeterminada), **Group leaders** (líderes del grupo del evento) o **Group members** (todas las personas del grupo del evento, incluidos sus líderes).
- **Rooms** y **Resources** -- Reserva espacios y equipos para el evento. Consulta [Salas, recursos y programación](./rooms-resources.md).

Haz clic en **Save**. Si el evento se repite, B1 te pide confirmación, porque guardar actualiza cada ocurrencia de la serie.

### Notas del evento {#event-notes}

Cada evento tiene su propio hilo de notas para planificación y seguimiento. Haz clic en un evento en la página de detalle del calendario; el cuadro de diálogo muestra los detalles del evento, sus recordatorios y sus **Notes** debajo. Escribe una nota y publícala para agregarla al hilo.

El personal con permiso para editar contenido o administrar calendarios siempre puede leer y publicar notas del evento. La configuración **Who can view notes** y **Who can post notes** del evento determina si los líderes o miembros del grupo del evento también pueden hacerlo.

### Mostrando eventos en tu sitio web {#showing-events-on-your-website}

Para colocar un calendario en tu sitio web, agrega un elemento **Calendar** a una página y elige este calendario. El elemento puede mostrar un calendario mensual o una cuadrícula de tarjetas de próximos eventos, y puede limitarse a eventos con una sola etiqueta. Los visitantes que hagan clic en un evento abren su propia página de evento. Consulta [Usando el elemento Calendar](../website/page-editor.md#using-the-calendar-element).

## Habilitando la inscripción a eventos {#enabling-event-registration}

Puedes habilitar la inscripción para cualquier evento del calendario para que los miembros puedan registrarse a través del sitio web de B1 o de la aplicación móvil.

1. Haz clic en un evento existente o crea uno nuevo.
2. En el editor de eventos, activa **Registration** para habilitarlo.
3. Configura los ajustes de inscripción:
   - **Capacity** (opcional) -- Establece un número máximo de inscripciones. Déjalo en blanco para ilimitado.
   - **Registration Opens** -- La fecha y hora en que la inscripción queda disponible.
   - **Registration Closes** -- La fecha y hora en que la inscripción se cierra.
   - **Tags** -- Etiquetas separadas por comas (por ejemplo, "youth, retreat, vbs") para ayudar a categorizar los eventos con inscripción.
   - **Registration Questions** -- Opcionalmente, adjunta un [formulario](../forms/creating-forms.md) para que quienes se inscriban respondan preguntas adicionales (restricciones alimentarias, talla de camiseta, contacto de emergencia, etc.) como parte del registro. Elige **None** para omitir las preguntas.
   - **Enable Waitlist** -- Cuando el evento se llena, permite que los demás interesados se unan a una lista de espera en lugar de ser rechazados. Consulta [Inscripciones de pago](./paid-registrations.md#waitlist).
4. Guarda el evento.

En los eventos de pago, la misma página de configuración te permite definir **Attendee Types** con precio, **Selections** opcionales (complementos) y **Discount Codes**, con el pago procesado a través del proveedor de donaciones de tu iglesia. Consulta [Inscripciones de pago](./paid-registrations.md) para la guía completa.

Una vez habilitada la inscripción, los miembros verán un botón **Register for this Event** cuando vean el evento en [B1.church o en la aplicación B1](../../b1-church/events/registering.md). Si adjuntaste un formulario, quienes se inscriban verán un paso **Questions** durante el registro, y sus respuestas se guardan junto con su inscripción.

:::info
Las preguntas de inscripción solo funcionan con formularios que **no** estén marcados como Restricted. Un formulario restringido se omite automáticamente durante el registro en lugar de mostrarse, así que usa un formulario sin restricciones cuando adjuntes preguntas a un evento.
:::

### Gestionando inscripciones

Para ver y gestionar las inscripciones de tus eventos:

1. En el menú de salto, elige **Calendars > Registrations**.
2. Verás una tabla con todos los eventos que tienen la inscripción habilitada, con el título del evento, la fecha, el número actual de inscritos frente a la capacidad y las etiquetas.
3. Haz clic en un evento para ver la lista completa de inscripciones, incluidos nombres, número de miembros, tipos de asistente, estado del pago y fecha de inscripción.
4. Desde la página de detalle, puedes:
   - **Add Attendee** -- Inscribir manualmente a alguien que se registró fuera de línea o por teléfono.
   - **Cancel** inscripciones individuales
   - **Delete** inscripciones de forma permanente
   - **Promote** inscripciones en lista de espera cuando se libere un lugar
   - **Export CSV** -- Descarga todas las inscripciones, incluidos tipos de asistente, selecciones, montos de pago y respuestas a preguntas

Si el evento tiene preguntas de inscripción adjuntas, la página de detalle también muestra un filtro **Unanswered questions only** para encontrar rápidamente a quienes aún no han enviado respuestas, y un botón **View Answers** en cada inscripción respondida para ver sus respuestas. Los eventos de pago añaden una columna **Type**, una columna **Paid / Total**, conteos por tipo y un cuadro de diálogo de detalles de pagos -- consulta [Inscripciones de pago](./paid-registrations.md#the-registration-roster).

:::tip
Usa la barra de progreso de capacidad para vigilar qué tan rápido se llenan los eventos. La barra se vuelve roja cuando un evento alcanza o supera la capacidad.
:::

## Próximos pasos

- [Calendario curado](./curated-calendar.md) -- Crea un calendario que reúna eventos de varios grupos
- [Inscripciones de pago](./paid-registrations.md) -- Tipos de asistente, selecciones complementarias, códigos de descuento, pagos y listas de espera
- [Guía de inscripción a eventos](../guides/event-registration.md) -- Guía paso a paso para configurar la inscripción a eventos
- [Descripción general de calendarios](./index.md) -- Volver a la descripción general de calendarios
