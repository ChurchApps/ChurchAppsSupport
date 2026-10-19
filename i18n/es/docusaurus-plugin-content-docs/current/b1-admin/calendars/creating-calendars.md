---
title: "Crear calendarios"
---

# Crear calendarios

<div class="article-intro">

Crear un calendario en B1 Admin te permite construir una vista personalizada de eventos conectando uno o más grupos. Los eventos son gestionados por los líderes de cada grupo, y tu calendario muestra esos eventos en un solo lugar. Los administradores con acceso de edición pueden agregar o editar eventos de cualquier grupo. Los líderes de grupo que no son administradores solo pueden gestionar eventos de los grupos que lideran.

</div>

<div class="prereqs">
<h4>Antes de empezar</h4>

- Configura los [grupos](../groups/creating-groups.md) cuyos eventos quieres incluir en tu calendario
- Necesitas acceso administrativo a la sección de Calendarios en B1 Admin

</div>

## Crear un nuevo calendario

1. En B1 Admin, abre el [Menú de salto](../introduction.md#getting-around-with-the-jump-menu) (la barra de búsqueda en la parte superior izquierda), expande **Calendarios** y haz clic en **Calendarios**.
2. Haz clic en **Agregar calendario** en la parte superior de la página. El formulario de nuevo calendario se abre debajo de la lista de calendarios.
3. Escribe un **nombre** para tu calendario (por ejemplo, "Eventos de Ministerio Juvenil" o "Calendario Principal de la Iglesia").
4. Agrega una **descripción** opcional para ayudar a tu equipo a entender para qué sirve este calendario.
5. Haz clic en **Crear** para guardar tu nuevo calendario.

## La página de detalle del calendario

Después de crear un calendario, haz clic en **Administrar eventos** en su fila para abrir la página de detalle. Esta página tiene dos áreas principales:

- **Columna izquierda**: el nombre del calendario con sus acciones (**Nuevo evento**, **Editar**, **Importar .ics** e **Imprimir**), seguido de la lista **Grupos en el calendario** que muestra qué grupos están incluidos en este calendario. Haz clic en **Quitar** junto a un grupo para retirarlo del calendario.
- **Área principal**: la vista **Eventos del calendario** con los eventos tomados de los grupos conectados, con los botones **Suscribirse** y **Agregar grupo** encima.

## Conectar grupos

Los grupos que tienen eventos en el calendario aparecen automáticamente en la lista **Grupos en el calendario**, en el lado izquierdo de la página de detalle.

1. Haz clic en **Agregar grupo** encima del calendario para asociar un grupo con tu calendario.
2. Selecciona el grupo del menú desplegable.
3. Elige si quieres incluir **todos los eventos** de ese grupo o solo **eventos específicos**.
4. Haz clic en **Guardar**.

:::tip
Conectar grupos a tu calendario es una forma eficaz de reunir eventos automáticamente. Cuando un líder de grupo agrega un evento a su [grupo](../groups/creating-groups.md), puede aparecer en el calendario de toda la iglesia sin ningún trabajo adicional de tu parte.
:::

:::info
Si quieres crear un solo calendario que tome eventos de muchos grupos de tu iglesia, consulta [Calendario curado](curated-calendar) para un enfoque más sencillo.
:::

## Agregar y editar eventos {#adding-and-editing-events}

Haz clic en **Nuevo evento** en la página de detalle del calendario para agregar un evento, o haz clic en un evento del calendario y luego en **Editar** para cambiarlo. El formulario **Nuevo evento** / **Editar evento** tiene estos campos:

- **Grupo**: el grupo al que pertenece el evento. Si tu iglesia tiene plantillas de eventos, también puedes elegir una **Plantilla** para rellenar el formulario.
- **Título**
- **Foto del evento**: haz clic en **Agregar foto** (o en el recuadro vacío de foto) para elegir o subir una imagen, recortada a una forma panorámica de 16:9. Haz clic en **Cambiar foto** para reemplazarla. La foto se muestra en la parte superior de la página del evento en tu sitio web y como su mosaico cuando un elemento de Calendario muestra **Próximos eventos** (consulta [Mostrar eventos en tu sitio web](#showing-events-on-your-website)).
- **Descripción**: se muestra en la página del evento en tu sitio web. Se admiten texto en negrita, listas y enlaces.
- **Inicio** y **Fin**, **Se repite** y **Visibilidad** (**Público** o **Privado**).
- **Etiquetas**: etiquetas separadas por comas, como `jóvenes, estudiantes`. Un elemento de Calendario en tu sitio web se puede configurar para mostrar solo los eventos con cierta etiqueta. Es el mismo campo **Etiquetas** que aparece en la configuración de inscripción del evento.
- **Quién puede ver las notas** y **Quién puede publicar notas**: quién puede leer y agregar notas al evento (consulta [Notas del evento](#event-notes)). Elige **Solo personal** (la opción predeterminada), **Líderes de grupo** (líderes del grupo del evento) o **Miembros del grupo** (todas las personas del grupo del evento, incluidos sus líderes).
- **Salas** y **Recursos**: reserva espacio y equipo para el evento. Consulta [Salas, recursos y programación](rooms-resources).

Haz clic en **Guardar**. Si el evento se repite, B1 te pedirá confirmación, porque guardar actualiza todas las ocurrencias de la serie.

### Notas del evento {#event-notes}

Cada evento tiene su propio hilo de notas para planificación y seguimiento. Haz clic en un evento de la página de detalle del calendario; el cuadro de diálogo muestra los detalles del evento, sus recordatorios y sus **Notas** debajo. Escribe una nota y publícala para agregarla al hilo.

El personal con permiso para editar contenido o administrar calendarios siempre puede leer y publicar notas del evento. La configuración **Quién puede ver las notas** y **Quién puede publicar notas** del evento decide si los líderes o los miembros del grupo del evento también pueden hacerlo.

### Mostrar eventos en tu sitio web {#showing-events-on-your-website}

Para poner un calendario en tu sitio web, agrega un elemento **Calendario** a una página y elige este calendario. El elemento puede mostrar un calendario mensual o una cuadrícula de mosaicos de próximos eventos, y puede limitarse a eventos con una sola etiqueta. Los visitantes que hacen clic en un evento abren la página propia de ese evento. Consulta [Usar el elemento Calendario](../website/page-editor.md#using-the-calendar-element).

## Habilitar la inscripción a eventos {#enabling-event-registration}

Puedes habilitar la inscripción para cualquier evento del calendario para que los miembros puedan registrarse a través del sitio web de B1 o de la app móvil.

1. Haz clic en un evento existente o crea uno nuevo.
2. En el editor de eventos, activa **Inscripción**.
3. Configura los ajustes de inscripción:
   - **Capacidad** (opcional): establece un número máximo de inscripciones. Déjalo en blanco para ilimitado.
   - **Apertura de inscripciones**: la fecha y hora en que la inscripción queda disponible.
   - **Cierre de inscripciones**: la fecha y hora en que se cierra la inscripción.
   - **Etiquetas**: etiquetas separadas por comas (por ejemplo, "jóvenes, retiro, vbs") para ayudar a categorizar los eventos con inscripción.
   - **Preguntas de inscripción**: opcionalmente, adjunta un [formulario](../forms/creating-forms.md) para que los inscritos respondan preguntas adicionales (restricciones alimentarias, talla de camiseta, contacto de emergencia, etc.) como parte del registro. Elige **Ninguno** para omitir las preguntas.
   - **Habilitar lista de espera**: cuando el evento se llena, permite que los inscritos adicionales se unan a una lista de espera en lugar de ser rechazados. Consulta [Inscripciones pagadas](paid-registrations#waitlist).
4. Guarda el evento.

Para eventos de pago, la misma página de configuración te permite definir **Tipos de asistente** con precio, **Selecciones** opcionales (complementos) y **Códigos de descuento**, con el pago cobrado a través del proveedor de donaciones de tu iglesia. Consulta [Inscripciones pagadas](paid-registrations) para ver el recorrido completo.

Una vez habilitada la inscripción, los miembros verán un botón **Inscribirse a este evento** cuando vean el evento en el [sitio web de B1](../../b1-church/events/registering) o en la [app móvil de B1](../../b1-mobile/events/registering). Si adjuntaste un formulario, los inscritos verán un paso de **Preguntas** durante la inscripción, y sus respuestas se guardarán junto con su inscripción.

:::info
Las preguntas de inscripción solo funcionan con formularios que **no** estén marcados como Restringidos. Un formulario restringido se omite automáticamente durante la inscripción en lugar de mostrarse, así que usa un formulario no restringido al adjuntar preguntas a un evento.
:::

### Administrar inscripciones

Para ver y administrar las inscripciones de tus eventos:

1. En el Menú de salto, elige **Calendarios > Inscripciones**.
2. Verás una tabla con todos los eventos que tienen la inscripción habilitada, que muestra el título del evento, la fecha, el número actual de inscritos frente a la capacidad y las etiquetas.
3. Haz clic en un evento para ver la lista completa de inscripciones, incluidos nombres, número de miembros, tipos de asistente, estado del pago y fecha de inscripción.
4. Desde la página de detalle, puedes:
   - **Agregar asistente**: inscribir manualmente a alguien que se apuntó sin conexión o por teléfono.
   - **Cancelar** inscripciones individuales.
   - **Eliminar** inscripciones de forma permanente.
   - **Promover** inscripciones en lista de espera cuando se libere un lugar.
   - **Exportar CSV**: descarga todas las inscripciones, incluidos tipos de asistente, selecciones, montos pagados y respuestas a preguntas.

Si el evento tiene preguntas de inscripción adjuntas, la página de detalle también muestra un filtro **Solo preguntas sin respuesta** para encontrar rápidamente a los inscritos que aún no han enviado respuestas, y un botón **Ver respuestas** en cada inscripción respondida para ver sus respuestas. Los eventos de pago agregan una columna **Tipo**, una columna **Pagado / Total**, conteos por tipo y un cuadro de diálogo de detalle de pagos; consulta [Inscripciones pagadas](paid-registrations#the-registration-roster).

:::tip
Usa la barra de progreso de capacidad para monitorear qué tan rápido se llenan los eventos. La barra se vuelve roja cuando un evento alcanza o supera su capacidad.
:::

## Próximos pasos

- [Calendario curado](curated-calendar): crea un calendario que tome eventos de varios grupos
- [Inscripciones pagadas](paid-registrations): tipos de asistente, selecciones de complementos, códigos de descuento, pagos y listas de espera
- [Guía de inscripción a eventos](../guides/event-registration): guía paso a paso para configurar la inscripción a eventos
- [Resumen de calendarios](./): vuelve al resumen de calendarios
