---
title: "Creación de calendarios"
---

# Creación de calendarios

<div class="article-intro">

Crear un calendario en B1 Admin le permite armar una vista seleccionada de eventos al conectar uno o más grupos. Los eventos los administran los líderes de cada grupo, y su calendario muestra esos eventos en un solo lugar. Los administradores con acceso de edición pueden agregar o editar eventos de cualquier grupo. Los líderes de grupo que no son administradores solo pueden administrar eventos de los grupos que lideran.

</div>

## Video de capacitación

<YouTube id="Ko3kgsCSLFs" title="Creación de calendarios, eventos y reservaciones de salones en B1" next="Inscripción a eventos y eventos de pago en B1" nextUrl="/docs/b1-admin/calendars/paid-registrations" />

<div class="prereqs">
<h4>Antes de comenzar</h4>

- Configure los [grupos](../groups/creating-groups.md) cuyos eventos desea incluir en su calendario
- Necesita acceso administrativo a la sección Calendarios de B1 Admin

</div>

## Crear un nuevo calendario

1. En B1 Admin, abra el [menú Jump](../introduction.md#getting-around-with-the-jump-menu) (la barra de búsqueda en la esquina superior izquierda), expanda **Calendarios** y haga clic en **Calendarios**.
2. Haga clic en **Agregar calendario** en la parte superior de la página. El formulario de nuevo calendario se abre debajo de la lista de calendarios.
3. Escriba un **nombre** para su calendario (por ejemplo, "Eventos del ministerio juvenil" o "Calendario principal de la iglesia").
4. Agregue una **descripción** opcional para ayudar a su equipo a entender para qué sirve este calendario.
5. Haga clic en **Crear** para guardar su nuevo calendario.

## La página de detalle del calendario

Después de crear un calendario, haga clic en **Administrar eventos** en su fila para abrir la página de detalle. Esta página tiene dos áreas principales:

- **Columna izquierda** -- El nombre del calendario con sus acciones (**Nuevo evento**, **Editar**, **Importar .ics** e **Imprimir**), seguido de la lista **Grupos en el calendario**, que muestra qué grupos están incluidos en este calendario. Haga clic en **Quitar** junto a un grupo para sacarlo del calendario.
- **Área principal** -- La vista **Eventos del calendario**, con los eventos tomados de los grupos conectados, y los botones **Suscribirse** y **Agregar grupo** encima de ella.

## Conectar grupos

Los grupos que tienen eventos en el calendario aparecen automáticamente en la lista **Grupos en el calendario**, a la izquierda de la página de detalle.

1. Haga clic en **Agregar grupo** encima del calendario para asociar un grupo con su calendario.
2. Seleccione el grupo del menú desplegable. La lista incluye todos los grupos de su iglesia, no solo los grupos a los que usted pertenece.
3. Elija si desea incluir **todos los eventos** de ese grupo o solo **eventos específicos**.
4. Haga clic en **Guardar**.

Cada evento aparece en el calendario solo una vez. Si agrega un grupo completo, cualquiera de sus eventos que ya haya agregado uno por uno se integra en la entrada del grupo, y elegir eventos específicos de un grupo que ya está en el calendario no agrega nada nuevo. Solo los grupos agregados completos aparecen en **Grupos en el calendario**.

### Importar un archivo .ics

Haga clic en **Importar .ics** para traer eventos de otro calendario. Elija el **Grupo** al que deben pertenecer los eventos, luego haga clic en **Elegir archivo .ics** o pegue el contenido del archivo, y haga clic en **Importar**. Los eventos se crean en ese grupo, y el grupo se agrega al calendario desde el que importó, así que los eventos aparecen allí de inmediato.

### Quitar un evento del calendario

Haga clic en un evento del calendario y luego en **Quitar del calendario**. Esto solo quita el evento de este calendario: el evento en sí permanece en su grupo. Si el evento está en el calendario porque se agregó todo su grupo, quitarlo elimina todos los eventos de ese grupo de este calendario (los eventos siguen en el grupo). Para eliminar un evento definitivamente, bórrelo desde el [calendario del grupo](../groups/group-calendar.md).

:::tip
Conectar grupos a su calendario es una forma eficaz de agregar eventos automáticamente. Cuando un líder de grupo agrega un evento a su [grupo](../groups/creating-groups.md), puede aparecer en el calendario de toda la iglesia sin ningún trabajo adicional de su parte.
:::

:::info
Si desea crear un solo calendario que tome eventos de muchos grupos de su iglesia, consulte [Calendario seleccionado](curated-calendar) para un enfoque más sencillo.
:::

## Agregar y editar eventos {#adding-and-editing-events}

Haga clic en **Nuevo evento** en la página de detalle del calendario para agregar un evento, o haga clic en un evento del calendario y luego en **Editar** para cambiarlo. El formulario **Nuevo evento** / **Editar evento** tiene estos campos:

- **Grupo** -- El grupo al que pertenece el evento. Si su iglesia tiene plantillas de eventos, también puede elegir una **Plantilla** para llenar el formulario.
- **Título**
- **Foto del evento** -- Haga clic en **Agregar foto** (o en el recuadro vacío de la foto) para elegir o subir una imagen, recortada a una forma panorámica de 16:9. Haga clic en **Cambiar foto** para reemplazarla. La foto aparece en la parte superior de la página del evento en su sitio web y como su mosaico cuando un elemento Calendario muestra **Próximos eventos** (consulte [Mostrar eventos en su sitio web](#showing-events-on-your-website)).
- **Descripción** -- Se muestra en la página del evento en su sitio web. Se admiten texto en negrita, listas y enlaces.
- **Inicio** y **Fin**, **Se repite** y **Visibilidad** (**Público** o **Privado**).
- **Etiquetas** -- Etiquetas separadas por comas, como `jóvenes, estudiantes`. Un elemento Calendario en su sitio web puede configurarse para mostrar solo eventos con cierta etiqueta. Es el mismo campo **Etiquetas** que aparece en la configuración de inscripción del evento.
- **Quién puede ver las notas** y **Quién puede publicar notas** -- Quién puede leer y agregar notas al evento (consulte [Notas del evento](#event-notes)). Elija **Solo personal** (la opción predeterminada), **Líderes del grupo** (líderes del grupo del evento) o **Miembros del grupo** (todas las personas del grupo del evento, incluidos sus líderes).
- **Salones** y **Recursos** -- Reserve espacio y equipo para el evento. Consulte [Salones, recursos y programación](rooms-resources).

Haga clic en **Guardar**. Si el evento se repite, B1 le pedirá que confirme, porque guardar actualiza cada ocurrencia de la serie.

### Notas del evento {#event-notes}

Cada evento tiene su propio hilo de notas para planificación y seguimiento. Haga clic en un evento en la página de detalle del calendario; el cuadro muestra los detalles del evento, sus recordatorios y sus **Notas** debajo. Escriba una nota y publíquela para agregarla al hilo.

El personal con permiso para editar contenido o administrar calendarios siempre puede leer y publicar notas de eventos. Las opciones **Quién puede ver las notas** y **Quién puede publicar notas** del evento determinan si los líderes o miembros del grupo del evento también pueden hacerlo.

### Mostrar eventos en su sitio web {#showing-events-on-your-website}

Para colocar un calendario en su sitio web, agregue un elemento **Calendario** a una página y elija este calendario. El elemento puede mostrar un calendario mensual o una cuadrícula de mosaicos de próximos eventos, y puede limitarse a eventos con una sola etiqueta. Los visitantes que hacen clic en un evento abren su propia página de evento. Consulte [Uso del elemento Calendario](../website/page-editor.md#using-the-calendar-element).

## Habilitar la inscripción a eventos {#enabling-event-registration}

Puede habilitar la inscripción para cualquier evento del calendario para que los miembros puedan inscribirse a través del sitio web de B1 o de la aplicación móvil.

1. Haga clic en un evento existente o cree uno nuevo.
2. En el editor de eventos, active **Inscripción**.
3. Configure los ajustes de inscripción:
   - **Capacidad** (opcional) -- Establezca un número máximo de inscripciones. Déjelo en blanco para no tener límite.
   - **Apertura de inscripciones** -- La fecha y hora en que la inscripción se habilita.
   - **Cierre de inscripciones** -- La fecha y hora en que la inscripción se cierra.
   - **Etiquetas** -- Etiquetas separadas por comas (por ejemplo, "jóvenes, retiro, vbs") para clasificar los eventos con inscripción.
   - **Preguntas de inscripción** -- Opcionalmente, adjunte un [formulario](../forms/creating-forms.md) para que quienes se inscriben respondan preguntas adicionales (restricciones alimentarias, talla de camiseta, contacto de emergencia, etc.) como parte de la inscripción. Elija **Ninguno** para omitir las preguntas.
   - **Habilitar lista de espera** -- Cuando el evento se llena, permita que más personas se unan a una lista de espera en lugar de rechazarlas. Consulte [Inscripciones pagadas](paid-registrations#waitlist).
4. Guarde el evento.

Para eventos de pago, la misma página de configuración le permite definir **Tipos de asistente** con precio, **Selecciones** opcionales (complementos) y **Códigos de descuento**, con pagos cobrados a través del proveedor de donaciones de su iglesia. Consulte [Inscripciones pagadas](paid-registrations) para el recorrido completo.

Una vez habilitada la inscripción, los miembros verán un botón **Inscribirse a este evento** al ver el evento en el [sitio web de B1](../../b1-church/events/registering) o en la [aplicación móvil de B1](../../b1-mobile/events/registering). Si adjuntó un formulario, quienes se inscriben verán un paso de **Preguntas** durante la inscripción, y sus respuestas se guardan con su inscripción.

:::info
Las preguntas de inscripción solo funcionan con formularios que **no** estén marcados como Restringidos. Un formulario restringido se omite automáticamente durante la inscripción en lugar de mostrarse, así que use un formulario no restringido al adjuntar preguntas a un evento.
:::

### Administrar inscripciones

Para ver y administrar las inscripciones a sus eventos:

1. En el menú Jump, elija **Calendarios > Inscripciones**.
2. Verá una tabla con todos los eventos que tienen inscripción habilitada, con el título del evento, la fecha, el número actual de inscritos frente a la capacidad, y las etiquetas.
3. Haga clic en un evento para ver la lista completa de inscripciones, con nombres, cantidad de miembros, tipos de asistente, estado de pago y fecha de inscripción.
4. Desde la página de detalle, puede:
   - **Agregar asistente** -- Inscribir manualmente a alguien que se anotó sin conexión o por teléfono.
   - **Cancelar** inscripciones individuales
   - **Eliminar** inscripciones de forma permanente
   - **Promover** inscripciones en lista de espera cuando se libere un lugar
   - **Exportar CSV** -- Descargue todas las inscripciones, con tipos de asistente, selecciones, montos pagados y respuestas a las preguntas

Si el evento tiene preguntas de inscripción adjuntas, la página de detalle también muestra un filtro **Solo preguntas sin responder** para encontrar rápidamente a quienes aún no han enviado respuestas, y un botón **Ver respuestas** en cada inscripción con respuestas para ver sus respuestas. Los eventos de pago agregan una columna **Tipo**, una columna **Pagado / Total**, conteos por tipo y un cuadro de detalles de pagos; consulte [Inscripciones pagadas](paid-registrations#the-registration-roster).

:::tip
Use la barra de progreso de capacidad para vigilar qué tan rápido se llenan los eventos. La barra se vuelve roja cuando un evento está en su capacidad o por encima de ella.
:::

## Próximos pasos

- [Calendario seleccionado](curated-calendar) -- Cree un calendario que tome eventos de varios grupos
- [Inscripciones pagadas](paid-registrations) -- Tipos de asistente, selecciones complementarias, códigos de descuento, pagos y listas de espera
- [Guía de inscripción a eventos](../guides/event-registration) -- Guía paso a paso para configurar la inscripción a eventos
- [Resumen de calendarios](./) -- Regrese al resumen de calendarios
