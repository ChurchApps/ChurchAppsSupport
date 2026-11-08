---
title: "Creación de calendarios"
description: "Crea un calendario en B1 Admin, conecta grupos o importa archivos .ics, y administra sus eventos, registros y notas desde un solo lugar."
---

# Creación de calendarios

<div class="article-intro">

Crear un calendario en B1 Admin te permite armar una vista seleccionada de eventos conectando uno o más grupos. Los eventos los administran los líderes de grupo dentro de sus grupos, y tu calendario muestra esos eventos en un solo lugar. Los administradores con acceso de edición pueden agregar o editar eventos de cualquier grupo. Los líderes de grupo que no son administradores solo pueden administrar eventos de los grupos que lideran.

</div>

## Video de capacitación

<YouTube id="Ko3kgsCSLFs" title="Creación de calendarios, eventos y reservas de salas en B1" next="Registro a eventos y eventos de pago en B1" nextUrl="/docs/b1-admin/calendars/paid-registrations" />

<div class="prereqs">
<h4>Antes de comenzar</h4>

- Configura los [grupos](../groups/creating-groups.md) cuyos eventos quieres incluir en tu calendario
- Necesitas acceso administrativo a la sección Calendarios en B1 Admin

</div>

## Crear un nuevo calendario

1. En B1 Admin, abre el [menú Jump](../introduction.md#getting-around-with-the-jump-menu) (la barra de búsqueda en la parte superior izquierda), expande **Calendarios** y haz clic en **Calendarios**.
2. Haz clic en **Agregar calendario** en la parte superior de la página. El formulario de nuevo calendario se abre debajo de la lista de calendarios.
3. Escribe un **nombre** para tu calendario (por ejemplo, "Eventos de ministerio juvenil" o "Calendario principal de la iglesia").
4. Agrega una **descripción** opcional para ayudar a tu equipo a entender para qué sirve este calendario.
5. Haz clic en **Crear** para guardar tu nuevo calendario.

## La página de detalle del calendario

Después de crear un calendario, haz clic en **Administrar eventos** en su fila para abrir la página de detalle. Esta página tiene dos áreas principales:

- **Columna izquierda** -- El nombre del calendario con sus acciones (**Nuevo evento**, **Editar**, **Importar .ics** e **Imprimir**), seguido de la lista **Grupos en el calendario** que muestra qué grupos están incluidos en este calendario. Haz clic en **Quitar** junto a un grupo para sacarlo del calendario.
- **Área principal** -- La vista **Eventos del calendario**, que muestra los eventos de los grupos conectados, con los botones **Suscribirse** y **Agregar grupo** encima.

## Conectar grupos

Los grupos que tienen eventos en el calendario aparecen automáticamente en la lista **Grupos en el calendario**, en el lado izquierdo de la página de detalle.

1. Haz clic en **Agregar grupo** encima del calendario para asociar un grupo con tu calendario.
2. Selecciona el grupo del menú desplegable. La lista incluye todos los grupos de tu iglesia, no solo los grupos a los que perteneces.
3. Elige si quieres incluir **todos los eventos** de ese grupo o solo **eventos específicos**.
4. Haz clic en **Guardar**.

Cada evento aparece en el calendario una sola vez. Si agregas un grupo completo, cualquiera de sus eventos que ya hayas agregado uno por uno se integra en la entrada del grupo, y elegir eventos específicos de un grupo que ya está en el calendario no agrega nada nuevo. Solo los grupos agregados completos aparecen en **Grupos en el calendario**.

### Importar un archivo .ics

Haz clic en **Importar .ics** para traer eventos de otro calendario. Elige el **Grupo** al que deben pertenecer los eventos, luego haz clic en **Elegir archivo .ics** o pega el contenido del archivo, y haz clic en **Importar**. Los eventos se crean en ese grupo, y el grupo se agrega al calendario desde el que importaste, así que los eventos aparecen allí de inmediato.

### Quitar un evento del calendario

Haz clic en un evento del calendario y luego en **Quitar del calendario**. Esto solo quita el evento de este calendario; el evento en sí permanece en su grupo. Si el evento está en el calendario porque se agregó todo su grupo, quitarlo elimina todos los eventos de ese grupo de este calendario (los eventos siguen en el grupo). Para eliminar un evento de forma definitiva, bórralo desde el [calendario del grupo](../groups/group-calendar.md).

:::tip
Conectar grupos a tu calendario es una forma eficaz de reunir eventos automáticamente. Cuando un líder de grupo agrega un evento a su [grupo](../groups/creating-groups.md), puede aparecer en el calendario de toda la iglesia sin trabajo adicional de tu parte.
:::

:::info
Si quieres crear un único calendario que reúna eventos de muchos grupos de tu iglesia, consulta [Calendario curado](./curated-calendar.md) para un enfoque más simple.
:::

## Agregar y editar eventos {#adding-and-editing-events}

Haz clic en **Nuevo evento** en la página de detalle del calendario para agregar un evento, o haz clic en un evento del calendario y luego en **Editar** para cambiarlo. El formulario **Nuevo evento** / **Editar evento** tiene estos campos:

- **Grupo** -- El grupo al que pertenece el evento. Si tu iglesia tiene plantillas de eventos, también puedes elegir una **Plantilla** para completar el formulario.
- **Título**
- **Foto del evento** -- Haz clic en **Agregar foto** (o en el recuadro vacío de la foto) para elegir o subir una imagen, recortada en formato panorámico 16:9. Haz clic en **Cambiar foto** para reemplazarla. La foto se muestra en la parte superior de la página del evento en tu sitio web y como su mosaico cuando un elemento Calendario muestra **Próximos eventos** (consulta [Mostrar eventos en tu sitio web](#showing-events-on-your-website)).
- **Descripción** -- Se muestra en la página del evento en tu sitio web. Se admiten texto en negrita, listas y enlaces.
- **Inicio** y **Fin**, **Se repite** y **Visibilidad** (**Público** o **Privado**).
- **Etiquetas** -- Rótulos separados por comas, como `jóvenes, estudiantes`. Un elemento Calendario en tu sitio web puede configurarse para mostrar solo eventos con una etiqueta específica. Es el mismo campo **Etiquetas** que aparece en la configuración de registro del evento.
- **Quién puede ver las notas** y **Quién puede publicar notas** -- Quién puede leer y agregar notas al evento (consulta [Notas del evento](#event-notes)). Elige **Solo personal** (la opción predeterminada), **Líderes de grupo** (líderes del grupo del evento) o **Miembros del grupo** (todas las personas del grupo del evento, incluidos sus líderes).
- **Salas** y **Recursos** -- Reserva espacio y equipo para el evento. Consulta [Salas, recursos y programación](./rooms-resources.md).

Haz clic en **Guardar**. Si el evento se repite, B1 te pide confirmación, porque guardar actualiza cada ocurrencia de la serie.

### Notas del evento {#event-notes}

Cada evento tiene su propio hilo de notas para planificación y seguimiento. Haz clic en un evento en la página de detalle del calendario; el cuadro de diálogo muestra los detalles del evento, sus recordatorios y sus **Notas** debajo. Escribe una nota y publícala para agregarla al hilo.

El personal con permiso para editar contenido o administrar calendarios siempre puede leer y publicar notas de eventos. La configuración **Quién puede ver las notas** y **Quién puede publicar notas** del evento determina si los líderes o miembros del grupo del evento también pueden hacerlo.

### Mostrar eventos en tu sitio web {#showing-events-on-your-website}

Para poner un calendario en tu sitio web, agrega un elemento **Calendario** a una página y elige este calendario. El elemento puede mostrar un calendario mensual o una cuadrícula de mosaicos de próximos eventos, y puede limitarse a eventos con una sola etiqueta. Los visitantes que hagan clic en un evento abren su propia página de evento. Consulta [Uso del elemento Calendario](../website/page-editor.md#using-the-calendar-element).

## Habilitar el registro a eventos {#enabling-event-registration}

Puedes habilitar el registro para cualquier evento del calendario para que los miembros puedan inscribirse a través del sitio web de B1 o de la aplicación móvil.

1. Haz clic en un evento existente o crea uno nuevo.
2. En el editor del evento, activa **Registro** para habilitarlo.
3. Configura los ajustes de registro:
   - **Capacidad** (opcional) -- Establece un número máximo de registros. Déjalo en blanco para ilimitado.
   - **Apertura del registro** -- La fecha y hora en que el registro está disponible.
   - **Cierre del registro** -- La fecha y hora en que se cierra el registro.
   - **Etiquetas** -- Rótulos separados por comas (por ejemplo, "jóvenes, retiro, VBS") para ayudar a categorizar los eventos con registro.
   - **Preguntas de registro** -- Opcionalmente, adjunta un [formulario](../forms/creating-forms.md) para que los inscritos respondan preguntas adicionales (restricciones alimentarias, talla de camiseta, contacto de emergencia, etc.) como parte de la inscripción. Elige **Ninguno** para omitir las preguntas.
   - **Habilitar lista de espera** -- Cuando el evento se llena, permite que los inscritos adicionales se unan a una lista de espera en lugar de ser rechazados. Consulta [Registros de pago](./paid-registrations.md#waitlist).
4. Guarda el evento.

En el caso de eventos de pago, la misma página de configuración te permite definir **Tipos de asistente** con precio, **Selecciones** opcionales (complementos) y **Códigos de descuento**, con el pago procesado a través del proveedor de donaciones de tu iglesia. Consulta [Registros de pago](./paid-registrations.md) para la guía completa.

Una vez habilitado el registro, los miembros verán un botón **Regístrate para este evento** al ver el evento en [B1.church o en la aplicación B1](../../b1-church/events/registering.md). Si adjuntaste un formulario, los inscritos verán un paso de **Preguntas** durante el registro, y sus respuestas se guardarán junto con su registro.

:::info
Las preguntas de registro solo funcionan con formularios que **no** estén marcados como Restringidos. Un formulario restringido se omite automáticamente durante el registro en lugar de mostrarse, así que usa un formulario no restringido cuando adjuntes preguntas a un evento.
:::

### Administrar registros

Para ver y administrar los registros de tus eventos:

1. En el menú Jump, elige **Calendarios > Registros**.
2. Verás una tabla con todos los eventos que tienen el registro habilitado, con el título del evento, la fecha, el número actual de registros frente a la capacidad, y las etiquetas.
3. Haz clic en un evento para ver la lista completa de registros, incluidos los nombres, el número de miembros, los tipos de asistente, el estado de pago y la fecha de registro.
4. Desde la página de detalle, puedes:
   - **Agregar asistente** -- Registrar manualmente a alguien que se inscribió sin conexión o por teléfono.
   - **Cancelar** registros individuales
   - **Eliminar** registros de forma permanente
   - **Promover** registros de la lista de espera cuando se libere un lugar
   - **Exportar CSV** -- Descargar todos los registros, incluidos los tipos de asistente, selecciones, montos de pago y respuestas a las preguntas

Si el evento tiene Preguntas de registro adjuntas, la página de detalle también muestra un filtro **Solo preguntas sin responder** para encontrar rápidamente a los inscritos que aún no han enviado respuestas, y un botón **Ver respuestas** en cada registro respondido para ver sus respuestas. Los eventos de pago agregan una columna **Tipo**, una columna **Pagado / Total**, conteos por tipo y un cuadro de diálogo con el detalle de pagos. Consulta [Registros de pago](./paid-registrations.md#the-registration-roster).

:::tip
Usa la barra de progreso de capacidad para monitorear qué tan rápido se llenan los eventos. La barra se vuelve roja cuando un evento alcanza o supera su capacidad.
:::

## Próximos pasos

- [Calendario curado](./curated-calendar.md) -- Crea un calendario que reúna eventos de varios grupos
- [Registros de pago](./paid-registrations.md) -- Tipos de asistente, selecciones complementarias, códigos de descuento, pagos y listas de espera
- [Guía de registro a eventos](../guides/event-registration.md) -- Guía paso a paso para configurar el registro a eventos
- [Resumen de calendarios](./index.md) -- Volver al resumen de calendarios
