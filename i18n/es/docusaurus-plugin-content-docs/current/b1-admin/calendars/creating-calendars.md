---
title: "Creación de calendarios"
---

# Creación de calendarios

<div class="article-intro">

Crear un calendario en B1 Admin le permite construir una vista seleccionada de eventos al conectar uno o más grupos. Los líderes de cada grupo administran los eventos dentro de sus grupos, y su calendario muestra esos eventos en un solo lugar. Los administradores con acceso de edición pueden agregar o editar eventos de cualquier grupo. Los líderes de grupo que no son administradores solo pueden administrar los eventos de los grupos que lideran.

</div>

<div class="prereqs">
<h4>Antes de comenzar</h4>

- Configure los [grupos](../groups/creating-groups.md) cuyos eventos desea incluir en su calendario
- Necesita acceso de administrador a la sección Calendarios de B1 Admin

</div>

## Creación de un nuevo calendario

1. En B1 Admin, abra el [menú Jump](../introduction.md#getting-around-with-the-jump-menu) (la barra de búsqueda en la parte superior izquierda), expanda **Calendarios** y haga clic en **Calendarios**.
2. Haga clic en **Agregar calendario** en la parte superior de la página. El formulario del nuevo calendario se abre debajo de la lista de calendarios.
3. Ingrese un **nombre** para su calendario (por ejemplo, "Eventos de jóvenes" o "Calendario principal de la iglesia").
4. Agregue una **descripción** opcional para ayudar a su equipo a entender para qué sirve este calendario.
5. Haga clic en **Crear** para guardar su nuevo calendario.

## La página de detalle del calendario

Después de crear un calendario, haga clic en **Administrar eventos** en su fila para abrir la página de detalle. Esta página tiene dos áreas principales:

- **Columna izquierda**: el nombre del calendario con sus acciones (**Nuevo evento**, **Editar**, **Importar .ics** e **Imprimir**), seguido de la lista **Grupos en el calendario**, que muestra qué grupos están incluidos en este calendario. Haga clic en **Quitar** junto a un grupo para sacarlo del calendario.
- **Área principal**: la vista **Eventos del calendario** con los eventos tomados de los grupos conectados, con los botones **Suscribirse** y **Agregar grupo** encima.

## Conexión de grupos

Los grupos que tienen eventos en el calendario aparecen automáticamente en la lista **Grupos en el calendario** en el lado izquierdo de la página de detalle.

1. Haga clic en **Agregar grupo** encima del calendario para asociar un grupo con su calendario.
2. Seleccione el grupo del menú desplegable. La lista incluye todos los grupos de su iglesia, no solo los grupos a los que pertenece.
3. Elija si desea incluir **todos los eventos** de ese grupo o solo **eventos específicos**.
4. Haga clic en **Guardar**.

Cada evento aparece en el calendario solo una vez. Si agrega un grupo completo, cualquiera de sus eventos que ya haya agregado uno por uno se integra en la entrada del grupo, y elegir eventos específicos de un grupo que ya está en el calendario no agrega nada nuevo. Solo los grupos agregados completos aparecen en **Grupos en el calendario**.

### Importar un archivo .ics

Haga clic en **Importar .ics** para traer eventos de otro calendario. Elija el **Grupo** al que deben pertenecer los eventos, luego haga clic en **Elegir archivo .ics** o pegue el contenido del archivo, y haga clic en **Importar**. Los eventos se crean en ese grupo, y el grupo se agrega al calendario desde el que importó, de modo que los eventos aparecen allí de inmediato.

### Quitar un evento del calendario

Haga clic en un evento del calendario y luego haga clic en **Quitar del calendario**. Esto solo quita el evento de este calendario; el evento en sí permanece en su grupo. Si el evento está en el calendario porque se agregó todo su grupo, quitarlo elimina todos los eventos de ese grupo de este calendario (los eventos siguen en el grupo). Para eliminar un evento de forma definitiva, bórrelo desde el [calendario del grupo](../groups/group-calendar.md).

:::tip
Conectar grupos a su calendario es una forma eficaz de agregar eventos automáticamente. Cuando un líder de grupo agrega un evento a su [grupo](../groups/creating-groups.md), este puede aparecer en el calendario de toda la iglesia sin ningún trabajo adicional de su parte.
:::

:::info
Si desea crear un solo calendario que tome eventos de muchos grupos de su iglesia, consulte [Calendario seleccionado](curated-calendar) para un enfoque más sencillo.
:::

## Agregar y editar eventos {#adding-and-editing-events}

Haga clic en **Nuevo evento** en la página de detalle del calendario para agregar un evento, o haga clic en un evento del calendario y luego en **Editar** para cambiarlo. El formulario **Nuevo evento** / **Editar evento** tiene estos campos:

- **Grupo**: el grupo al que pertenece el evento. Si su iglesia tiene plantillas de eventos, también puede elegir una **Plantilla** para completar el formulario.
- **Título**
- **Foto del evento**: haga clic en **Agregar foto** (o en el recuadro vacío de foto) para elegir o subir una imagen, recortada a una forma amplia de 16:9. Haga clic en **Cambiar foto** para reemplazarla. La foto se muestra en la parte superior de la página del evento en su sitio web y como su mosaico cuando un elemento Calendario muestra **Próximos eventos** (consulte [Mostrar eventos en su sitio web](#showing-events-on-your-website)).
- **Descripción**: se muestra en la página del evento en su sitio web. Se admiten texto en negrita, listas y enlaces.
- **Inicio** y **Fin**, **Se repite** y **Visibilidad** (**Público** o **Privado**).
- **Etiquetas**: etiquetas separadas por comas, como `jóvenes, estudiantes`. Un elemento Calendario en su sitio web puede configurarse para mostrar solo los eventos con cierta etiqueta. Este es el mismo campo **Etiquetas** que aparece en la configuración de registro del evento.
- **Quién puede ver las notas** y **Quién puede publicar notas**: quién puede leer y agregar notas del evento (consulte [Notas del evento](#event-notes)). Elija **Solo personal** (la opción predeterminada), **Líderes de grupo** (líderes del grupo del evento) o **Miembros del grupo** (todos los integrantes del grupo del evento, incluidos sus líderes).
- **Salas** y **Recursos**: reserve espacio y equipo para el evento. Consulte [Salas, recursos y programación](rooms-resources).

Haga clic en **Guardar**. Si el evento se repite, B1 le pedirá confirmación, porque al guardar se actualiza cada ocurrencia de la serie.

### Notas del evento {#event-notes}

Cada evento tiene su propio hilo de notas para la planificación y el seguimiento. Haga clic en un evento en la página de detalle del calendario; el cuadro de diálogo muestra los detalles del evento, sus recordatorios y sus **Notas** debajo. Escriba una nota y publíquela para agregarla al hilo.

El personal con permiso para editar contenido o administrar calendarios siempre puede leer y publicar notas del evento. La configuración **Quién puede ver las notas** y **Quién puede publicar notas** del evento determina si los líderes o los miembros del grupo del evento también pueden hacerlo.

### Mostrar eventos en su sitio web {#showing-events-on-your-website}

Para colocar un calendario en su sitio web, agregue un elemento **Calendario** a una página y elija este calendario. El elemento puede mostrar un calendario mensual o una cuadrícula de mosaicos de próximos eventos, y puede limitarse a eventos con una etiqueta. Los visitantes que hacen clic en un evento abren su propia página del evento. Consulte [Usar el elemento Calendario](../website/page-editor.md#using-the-calendar-element).

## Habilitar el registro a eventos {#enabling-event-registration}

Puede habilitar el registro para cualquier evento del calendario para que los miembros se inscriban a través del sitio web de B1 o de la aplicación móvil.

1. Haga clic en un evento existente o cree uno nuevo.
2. En el editor de eventos, active **Registro** para habilitarlo.
3. Configure los ajustes de registro:
   - **Capacidad** (opcional): establezca un número máximo de registros. Déjelo en blanco para ilimitado.
   - **Apertura del registro**: la fecha y hora en que el registro está disponible.
   - **Cierre del registro**: la fecha y hora en que se cierra el registro.
   - **Etiquetas**: etiquetas separadas por comas (por ejemplo, "jóvenes, retiro, VBS") para ayudar a categorizar los eventos con registro.
   - **Preguntas de registro**: opcionalmente, adjunte un [formulario](../forms/creating-forms.md) para que los inscritos respondan preguntas adicionales (restricciones alimenticias, talla de camiseta, contacto de emergencia, etc.) como parte de la inscripción. Elija **Ninguno** para omitir las preguntas.
   - **Habilitar lista de espera**: cuando el evento se llena, permita que los inscritos adicionales se unan a una lista de espera en lugar de ser rechazados. Consulte [Registros pagados](paid-registrations#waitlist).
4. Guarde el evento.

Para eventos de pago, la misma página de configuración le permite definir **Tipos de asistente** con precio, **Selecciones** opcionales (complementos) y **Códigos de descuento**, con el pago recibido a través del proveedor de donaciones de su iglesia. Consulte [Registros pagados](paid-registrations) para la guía completa.

Una vez habilitado el registro, los miembros verán un botón **Registrarse para este evento** al ver el evento en el [sitio web de B1](../../b1-church/events/registering) o en la [aplicación móvil de B1](../../b1-mobile/events/registering). Si adjuntó un formulario, los inscritos verán un paso de **Preguntas** durante el registro, y sus respuestas se guardan junto con su inscripción.

:::info
Las preguntas de registro solo funcionan con formularios que **no** estén marcados como Restringidos. Un formulario restringido se omite automáticamente durante el registro en lugar de mostrarse, así que use un formulario no restringido al adjuntar preguntas a un evento.
:::

### Administrar los registros

Para ver y administrar los registros de sus eventos:

1. En el menú Jump, elija **Calendarios > Registros**.
2. Verá una tabla con todos los eventos que tienen el registro habilitado, con el título del evento, la fecha, el número actual de registros frente a la capacidad y las etiquetas.
3. Haga clic en un evento para ver la lista completa de registros, incluidos los nombres, el número de miembros, los tipos de asistente, el estado de pago y la fecha de registro.
4. Desde la página de detalle, puede:
   - **Agregar asistente**: registrar manualmente a alguien que se inscribió sin conexión o por teléfono.
   - **Cancelar** registros individuales
   - **Eliminar** registros de forma permanente
   - **Promover** registros en lista de espera cuando se libere un lugar
   - **Exportar CSV**: descargar todos los registros, incluidos los tipos de asistente, selecciones, montos pagados y respuestas a las preguntas

Si el evento tiene preguntas de registro adjuntas, la página de detalle también muestra un filtro **Solo preguntas sin responder** para encontrar rápidamente a los inscritos que aún no han enviado respuestas, y un botón **Ver respuestas** en cada registro respondido para ver sus respuestas. Los eventos de pago agregan una columna **Tipo**, una columna **Pagado / Total**, conteos por tipo y un cuadro de diálogo de detalles de pagos. Consulte [Registros pagados](paid-registrations#the-registration-roster).

:::tip
Use la barra de progreso de capacidad para vigilar qué tan rápido se llenan los eventos. La barra se vuelve roja cuando un evento alcanza o supera su capacidad.
:::

## Siguientes pasos

- [Calendario seleccionado](curated-calendar): cree un calendario que tome eventos de varios grupos
- [Registros pagados](paid-registrations): tipos de asistente, selecciones de complementos, códigos de descuento, pagos y listas de espera
- [Guía de registro de eventos](../guides/event-registration): guía paso a paso para configurar el registro de eventos
- [Descripción general de calendarios](./): regrese a la descripción general de calendarios
