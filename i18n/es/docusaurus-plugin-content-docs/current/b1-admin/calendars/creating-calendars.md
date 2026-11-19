---
title: "Creación de calendarios"
description: "Cree un calendario en B1 Admin, conecte grupos o importe archivos .ics, y administre sus eventos, registros y notas desde un solo lugar."
---

# Creación de calendarios

<div class="article-intro">

Crear un calendario en B1 Admin le permite construir una vista seleccionada de eventos al conectar uno o más grupos. Los eventos los administran los líderes de cada grupo dentro de sus grupos, y su calendario muestra esos eventos en un solo lugar. Los administradores con acceso de edición pueden añadir o editar eventos de cualquier grupo. Los líderes de grupo que no son administradores solo pueden administrar los eventos de los grupos que lideran.

</div>

## Video de capacitación {#training-video}

<YouTube id="Ko3kgsCSLFs" title="Creación de calendarios, eventos y reservas de salas en B1" next="Registro a eventos y eventos de pago en B1" nextUrl="/docs/b1-admin/calendars/paid-registrations" />

<div class="prereqs">
<h4>Antes de comenzar</h4>

- Configure los [grupos](../groups/creating-groups.md) cuyos eventos desea incluir en su calendario
- Necesita el permiso **Editar contenido**

</div>

## Crear un calendario nuevo {#creating-a-new-calendar}

1. En B1 Admin, abra el [menú Jump](../introduction.md#getting-around-with-the-jump-menu) (la barra de búsqueda en la parte superior izquierda), despliegue **Calendarios** y haga clic en **Calendarios**.
2. Haga clic en **Añadir calendario** en la parte superior de la página. El formulario del nuevo calendario se abre debajo de la lista de calendarios.
3. Introduzca un **Nombre del calendario** (por ejemplo, "Eventos del ministerio juvenil" o "Calendario principal de la iglesia").
4. Haga clic en **Crear** para guardar su nuevo calendario.

Para cambiar el nombre o eliminar un calendario más adelante, pase el cursor sobre su fila en la página de Calendarios y haga clic en **Editar** (o haga clic en **Editar** en la página de detalle del calendario).

## La página de detalle del calendario {#the-calendar-detail-page}

Después de crear un calendario, haga clic en su nombre (o pase el cursor sobre su fila y haga clic en **Administrar eventos**) para abrir la página de detalle. Esta página tiene dos áreas principales:

- **Columna izquierda**: el nombre del calendario con sus acciones (**Nuevo evento**, **Editar**, **Importar .ics** e **Imprimir**), un enlace a las aprobaciones pendientes, y la lista de **Grupos en el calendario** que muestra qué grupos están incluidos en este calendario. Haga clic en **Quitar** junto a un grupo para retirarlo del calendario.
- **Área principal**: la vista de **Eventos del calendario** con los eventos traídos de los grupos conectados, con los botones **Suscribirse** y **Añadir grupo** encima. Use **Hoy**, **Atrás**, **Siguiente** y las vistas **Mes**, **Semana**, **Día** y **Agenda** para moverse. Cada evento se dibuja con el color de su grupo. Los colores se asignan automáticamente, y un grupo conserva el mismo color en todos los calendarios.

Haga clic en **Imprimir** para obtener un mes imprimible. La impresión comienza con el logotipo de fondo claro de su iglesia (de [Apariencia](../website/appearance.md), si configuró uno), el nombre de la iglesia y el nombre del calendario. Los nombres de los eventos ocupan más líneas en lugar de cortarse, y se mantienen los colores de los grupos.

## Conectar grupos {#connecting-groups}

Los grupos que tienen eventos en el calendario aparecen automáticamente en la lista **Grupos en el calendario** de la izquierda de la página de detalle.

1. Haga clic en **Añadir grupo** encima del calendario para asociar un grupo a su calendario.
2. Elija el grupo en **Seleccione un grupo**. La lista incluye todos los grupos de su iglesia, no solo los grupos a los que usted pertenece.
3. Elija **Añadir todos los eventos del grupo**, o **Añadir eventos específicos** y haga clic en cada evento que desee en el pequeño calendario que aparece.
4. Haga clic en **Guardar**.

Cada evento aparece en el calendario solo una vez. Si añade un grupo completo, cualquiera de sus eventos que ya hubiera añadido uno por uno se integra en la entrada del grupo, y elegir eventos específicos de un grupo que ya está en el calendario no añade nada nuevo. Solo los grupos añadidos completos aparecen en **Grupos en el calendario**.

### Importar un archivo .ics {#importing-an-ics-file}

Haga clic en **Importar .ics** para traer eventos de otro calendario. Elija el **Grupo** al que deben pertenecer los eventos, luego haga clic en **Elegir archivo .ics** o pegue el contenido del archivo, y haga clic en **Importar**. Los eventos se crean en ese grupo, y el grupo se añade al calendario desde el que importó, de modo que los eventos aparecen allí de inmediato.

### Quitar un evento del calendario {#removing-an-event-from-the-calendar}

Haga clic en un evento del calendario y luego en **Quitar del calendario**. Esto solo quita el evento de este calendario; el evento en sí permanece en su grupo. Si el evento está en el calendario porque se añadió todo su grupo, quitarlo elimina de este calendario todos los eventos de ese grupo (los eventos siguen en el grupo). Para eliminar un evento de forma definitiva, bórrelo desde el [calendario del grupo](../groups/group-calendar.md).

:::tip
Conectar grupos a su calendario es una forma eficaz de agregar eventos automáticamente. Cuando un líder de grupo añade un evento a su [grupo](../groups/creating-groups.md), puede aparecer en el calendario de toda la iglesia sin trabajo adicional de su parte.
:::

:::info
Si desea crear un solo calendario que tome eventos de muchos grupos de su iglesia, consulte [Calendario seleccionado](./curated-calendar.md) para un enfoque más simplificado.
:::

## Añadir y editar eventos {#adding-and-editing-events}

Haga clic en **Nuevo evento** en la página de detalle del calendario para añadir un evento, o haga clic en un evento del calendario y luego en **Editar** para cambiarlo. El formulario **Nuevo evento** / **Editar evento** tiene estos campos:

- **Grupo**: el grupo al que pertenece el evento. Si su iglesia tiene plantillas de eventos, también puede elegir una **Plantilla** para completar el formulario.
- **Título**
- **Foto del evento**: haga clic en **Añadir foto** (o en el recuadro vacío de foto) para elegir o subir una imagen, recortada a un formato amplio de 16:9. Haga clic en **Cambiar foto** para reemplazarla. La foto se muestra en la parte superior de la página del evento en su sitio web y como su miniatura cuando un elemento de Calendario muestra **Próximos eventos** (consulte [Mostrar eventos en su sitio web](#showing-events-on-your-website)).
- **Descripción**: se muestra en la página del evento en su sitio web. Se admiten texto en negrita, listas y enlaces.
- **Inicio** y **Fin**, **Se repite** y **Visibilidad** (**Pública** o **Privada**).
- **Etiquetas**: etiquetas separadas por comas, como `youth, students`. Un elemento de Calendario en su sitio web puede configurarse para mostrar solo eventos con una determinada etiqueta. Es el mismo campo **Etiquetas** que aparece en la configuración de registro del evento.
- **Quién puede ver las notas** y **Quién puede publicar notas**: quién puede leer y añadir a las notas del evento (consulte [Notas del evento](#event-notes)). Elija **Solo personal** (la opción predeterminada), **Líderes de grupo** (líderes del grupo del evento) o **Miembros del grupo** (todas las personas del grupo del evento, incluidos sus líderes).
- **Salas** y **Recursos**: reserve espacio y equipos para el evento. Consulte [Salas, recursos y programación](./rooms-resources.md). Una vez elegida una sala o recurso, también puede añadir tiempo de preparación y limpieza o una ventana de reserva personalizada; consulte [Reservar una sala o recurso](./availability.md#booking-a-room-or-resource).
- **Recordatorios**: expanda esta sección para enviar recordatorios antes del evento. Consulte [Recordatorios de eventos](./event-reminders.md).

**Grupo**, **Título**, **Inicio** y **Fin** son obligatorios, y el fin debe ser posterior al inicio. Haga clic en **Guardar**. Para eliminar un evento, ábralo en el editor y haga clic en **Eliminar**.

### Cambiar una fecha de un evento recurrente {#changing-one-date-of-a-recurring-event}

Cuando hace clic en una fecha de un evento que se repite en el calendario y luego en **Editar**, al guardar o eliminar se le pregunta qué fechas cambiar:

- **Solo esta fecha** -- Solo la fecha en la que hizo clic. Al guardar, esa fecha se convierte en un evento único con sus cambios, y el resto de la serie se mantiene igual. Al eliminar, solo se quita esa fecha.
- **Esta y todas las fechas siguientes** -- La serie termina el día anterior a la fecha en la que hizo clic. Al guardar, sus cambios inician una nueva serie desde esa fecha; al eliminar, se quitan las fechas restantes.
- **Todas las fechas** -- La serie completa, como antes.

El formulario muestra la primera fecha de la serie, pero **Solo esta fecha** y **Esta y todas las fechas siguientes** trasladan sus cambios de hora a la fecha en la que hizo clic. Una fecha separada conserva las salas y los recursos de la serie, obtiene sus propias reservas y no copia los recordatorios de la serie. Si abre un evento recurrente sin elegir una fecha (por ejemplo, desde **Aprobaciones**), B1 le pedirá que confirme en su lugar, porque guardar actualiza todas las fechas de la serie.

### Notas del evento {#event-notes}

Cada evento tiene su propio hilo de notas para la planificación y el seguimiento. Haga clic en un evento en la página de detalle del calendario; el cuadro de diálogo muestra los detalles del evento, sus recordatorios y sus **Notas** debajo, con los botones **Editar**, **Administrar registros** y **Quitar del calendario**. Escriba una nota y publíquela para añadirla al hilo.

El personal con permiso para editar contenido o administrar calendarios siempre puede leer y publicar notas del evento. Las configuraciones **Quién puede ver las notas** y **Quién puede publicar notas** del evento determinan si los líderes o miembros del grupo del evento también pueden hacerlo.

### Mostrar eventos en su sitio web {#showing-events-on-your-website}

Para colocar un calendario en su sitio web, añada un elemento **Calendario** a una página y elija este calendario. El elemento puede mostrar un calendario mensual o una cuadrícula de miniaturas de próximos eventos, y puede limitarse a eventos con una sola etiqueta. Los visitantes que hacen clic en un evento abren su propia página de evento. Consulte [Uso del elemento Calendario](../website/page-editor.md#using-the-calendar-element).

## Habilitar el registro a eventos {#enabling-event-registration}

Puede habilitar el registro para cualquier evento del calendario para que los miembros se inscriban a través del sitio web de B1 o de la app móvil.

1. Haga clic en un evento existente del calendario (créelo primero si es necesario) y haga clic en **Administrar registros**. Se abre la página de registro del evento. (El botón **Activar registro** en la página de **Registros** lo lleva a sus calendarios para elegir un evento).
2. Haga clic en **Editar configuración** y luego active **Habilitar registro** en la tarjeta **Configuración de registro**.
3. Configure los ajustes de registro:
   - **Capacidad** (opcional): establezca un número máximo de registros. Déjelo en blanco para ilimitado.
   - **Apertura del registro**: la fecha y hora en que el registro queda disponible.
   - **Cierre del registro**: la fecha y hora en que se cierra el registro.
   - **Etiquetas**: etiquetas separadas por comas (por ejemplo, "jóvenes, retiro, VBS") para ayudar a clasificar los eventos con registro.
   - **Preguntas de registro**: opcionalmente, adjunte un [formulario](../forms/creating-forms.md) para que quienes se registran respondan preguntas adicionales (restricciones alimentarias, talla de camiseta, contacto de emergencia, etc.) como parte de la inscripción. Elija **Ninguno** para omitir las preguntas.
   - **Habilitar lista de espera**: cuando el evento se llena, permita que más personas se unan a una lista de espera en lugar de rechazarlas. Consulte [Registros de pago](./paid-registrations.md#waitlist).
4. Haga clic en **Guardar configuración**.

Para los eventos de pago, la misma página de configuración le permite definir **Tipos de asistente** con precio, **Selecciones** opcionales (complementos) y **Códigos de descuento**, con el cobro de pagos a través del proveedor de donaciones de su iglesia. Consulte [Registros de pago](./paid-registrations.md) para la guía completa.

Una vez habilitado el registro, los miembros verán un botón **Registrarse para este evento** al ver el evento en [B1.church o en la App de B1](../../b1-church/events/registering.md). Si adjuntó un formulario, quienes se registran verán un paso de **Preguntas** durante el registro, y sus respuestas se guardan junto con su registro.

:::info
Las preguntas de registro solo funcionan con formularios que **no** estén marcados como Restringidos. Un formulario restringido se omite automáticamente durante el registro en lugar de mostrarse, así que use un formulario no restringido al adjuntar preguntas a un evento.
:::

### Compartir el enlace de un evento {#sharing-an-event-link}

Para invitar a personas que no están en la base de datos de su iglesia, comparta la propia página del evento. Haga clic en el evento del calendario y luego en **Compartir**, o haga clic en **Compartir** en la página de registro del evento. Un cuadro de diálogo muestra el enlace del evento y un código QR: haga clic en el icono de copiar para copiar el enlace, o en **Descargar PNG** para guardar el código QR para un volante o una diapositiva. Cualquier persona con el enlace puede ver el evento, añadirlo a su calendario y, cuando el registro está activado, registrarse como invitado solo con un nombre y un correo electrónico.

Un evento **Privado** permanece fuera del calendario de su sitio, pero aún puede compartirse una vez que active el registro. Un evento privado sin registro no tiene página pública, así que no tiene botón **Compartir**.

En la app de B1, los eventos del calendario de un grupo tienen un enlace **Compartir** que abre la hoja de compartir del teléfono con el mismo enlace.

### Administrar registros {#managing-registrations}

Para ver y administrar los registros de sus eventos:

1. En el menú Jump, elija **Calendarios > Registros**.
2. Verá una tabla de todos los eventos con el registro habilitado, con el título del evento, la fecha, el número actual de registros frente a la capacidad, y las etiquetas. Escriba en **Buscar eventos** para filtrarla.
3. Haga clic en el nombre de un evento para ver la lista completa de registros, con las columnas **Nombre**, **Miembros**, **Tipo**, **Pagados / Total**, **Estado** y **Fecha**.
4. Desde la página de detalle, puede:
   - **Añadir asistente**: registrar manualmente a alguien que se inscribió fuera de línea o por teléfono.
   - **Cancelar registro** en registros individuales (le pedirá confirmación)
   - **Eliminar** registros de forma permanente (le pedirá confirmación)
   - **Promover** registros en lista de espera cuando se libera un lugar
   - **Exportar CSV**: descargue todos los registros, incluidos los tipos de asistente, las selecciones, los montos de pago y las respuestas a las preguntas

   Estas acciones de fila son iconos al final de cada fila; pase el cursor sobre un icono para ver su nombre.

Si el evento tiene preguntas de registro adjuntas, la página de detalle también muestra un filtro **Solo preguntas sin responder** para encontrar rápidamente a quienes se registraron y aún no han enviado respuestas, y un botón **Ver respuestas** en cada registro respondido para ver sus respuestas. Los eventos con tipos de asistente también muestran los recuentos por tipo encima de la tabla, y cada fila tiene un cuadro de diálogo de **Detalles del registro** con los pagos; consulte [Registros de pago](./paid-registrations.md#the-registration-roster).

El lado izquierdo de la página de detalle muestra cuántas personas están registradas (quien se registró y todas las personas de su registro), con una barra de capacidad, el número de la lista de espera si existe, las etiquetas del evento y sus **Recordatorios**. El título de la tarjeta **Registros** cuenta los registros en lugar de las personas, que es lo que limita la capacidad; así que una familia de cuatro es un registro pero cuatro personas.

:::tip
Use la barra de progreso de capacidad en la página de Registros para monitorear qué tan rápido se llenan los eventos. La barra se vuelve roja cuando un evento está en su capacidad o por encima de ella.
:::

## Próximos pasos {#next-steps}

- [Calendario seleccionado](./curated-calendar.md): cree un calendario que tome eventos de varios grupos
- [Registros de pago](./paid-registrations.md): tipos de asistente, selecciones complementarias, códigos de descuento, pagos y listas de espera
- [Guía de registro a eventos](../guides/event-registration.md): guía paso a paso para configurar el registro a eventos
- [Resumen de calendarios](./index.md): regrese al resumen de calendarios
