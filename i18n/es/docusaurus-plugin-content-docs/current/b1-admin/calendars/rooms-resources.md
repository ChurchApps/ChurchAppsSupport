---
title: "Salas, recursos y programación"
description: "Configure salas, equipos, bloqueos y plantillas de eventos en B1 Admin para que los grupos puedan solicitar reservas y usted pueda aprobarlas y evitar dobles reservas."
---

# Salas, recursos y programación

<div class="article-intro">

Las salas y los recursos le permiten llevar el control de los espacios y equipos reservables de su iglesia. Cuando un grupo o equipo quiere usar una sala o pedir prestado un recurso para un evento, puede solicitarlo a través de B1; usted puede aprobar o rechazar esas solicitudes para evitar dobles reservas.

</div>

<div class="prereqs">
<h4>Antes de comenzar</h4>

- Necesita el permiso **Editar contenido**
- Configure los [grupos](../groups/creating-groups.md) cuyos miembros enviarán solicitudes de reserva

</div>

## Abrir Salas y recursos {#opening-rooms--resources}

En B1 Admin, abra el [menú Jump](../introduction.md#getting-around-with-the-jump-menu) (la barra de búsqueda en la parte superior izquierda), despliegue **Calendarios** y haga clic en **Salas y recursos**. La página tiene cuatro pestañas: **Salas**, **Recursos**, **Bloqueos** y **Plantillas**. El botón de añadir en la parte superior de la página cambia según la pestaña seleccionada, y un cuadro **Buscar** le permite filtrar la lista actual.

## Salas {#rooms}

Las salas son espacios físicos que pueden reservarse junto con los eventos del calendario: un santuario, un salón de convivencia, un aula, etc.

### Añadir una sala {#adding-a-room}

1. En la pestaña **Salas**, haga clic en **Añadir sala** en la parte superior de la página.
2. Introduzca un **Nombre de la sala**.
3. Opcionalmente, establezca una **Capacidad** (número máximo de personas) y una **Descripción**. Ambos se muestran junto a la sala cuando las personas eligen salas para un evento.
4. Establezca un **Grupo de aprobación** si las reservas necesitan autorización. Las reservas hechas por miembros de ese grupo se aprueban automáticamente; las de cualquier otra persona quedan como **Pendientes** hasta que se aprueben en la página de [Aprobaciones](./approvals.md), y los miembros del grupo reciben un correo electrónico sobre las nuevas solicitudes. Déjelo en **No requiere aprobación** para aprobar automáticamente todas las reservas.
5. Haga clic en **Guardar**.

La lista de Salas muestra el **Nombre de la sala**, la **Capacidad** y el **Grupo de aprobación** de cada sala.

### Editar o eliminar una sala {#editing-or-deleting-a-room}

Pase el cursor sobre una sala y haga clic en **Editar**, realice sus cambios y haga clic en **Guardar**. Use **Eliminar** para borrar una sala de forma permanente.

## Recursos {#resources}

Los recursos son artículos que pueden reservarse junto con un evento: equipos de audio y video, proyectores, sillas, una camioneta, etc.

### Añadir un recurso {#adding-a-resource}

1. Haga clic en la pestaña **Recursos** y luego en **Añadir recurso**.
2. Introduzca un **Nombre del recurso** y, opcionalmente, una **Descripción**.
3. Establezca la **Cantidad** que posee (por ejemplo, 3 proyectores). Cada evento reserva uno, y B1 le advierte cuando más eventos al mismo tiempo lo reservan de los que tiene.
4. Establezca un **Grupo de aprobación** si alguien necesita autorizar los préstamos de recursos. Funciona igual que en el caso de las salas.
5. Haga clic en **Guardar**.

Edite o elimine un recurso de la misma forma que una sala.

## Bloqueos {#blockouts}

Los bloqueos impiden que las salas o los recursos se reserven durante ciertos horarios, por ejemplo, por remodelaciones, periodos reservados o mantenimiento.

### Añadir un bloqueo {#adding-a-blockout}

1. Haga clic en la pestaña **Bloqueos** y luego en **Añadir bloqueo**.
2. En **Aplica a**, elija una sala, un recurso o **Todas las salas y recursos**.
3. Establezca la fecha y hora de **Inicio** y **Fin** del bloqueo.
4. Opcionalmente, añada un **Motivo**. Se muestra en el calendario de [Disponibilidad](./availability.md) como *Bloqueada: motivo*.
5. Haga clic en **Guardar**.

Los eventos que reservan una sala o recurso bloqueado muestran una advertencia de conflicto en el editor de eventos.

## Plantillas de eventos {#event-templates}

Las plantillas le permiten guardar una configuración de evento reutilizable (título, descripción, duración, salas y recursos), para que los eventos que crea con frecuencia se configuren siempre de la misma forma.

### Añadir una plantilla {#adding-a-template}

1. Haga clic en la pestaña **Plantillas** y luego en **Añadir plantilla**.
2. Introduzca un **Nombre de la plantilla** (se muestra al elegir una plantilla).
3. Complete el **Título del evento**, la **Descripción del evento** y la **Duración (minutos)** que se usarán en los eventos nuevos.
4. Opcionalmente, elija las **Salas** y los **Recursos** a reservar.
5. Haga clic en **Guardar**.

Al crear un evento nuevo, elija la plantilla en el cuadro **Plantilla** del editor de eventos para completar el título, la descripción, las salas y los recursos, y para establecer la hora de fin según la duración de la plantilla (establezca primero el **Inicio**). Aún debe elegir el **Grupo** del evento. El cuadro **Plantilla** solo aparece cuando existe al menos una plantilla.

## Artículos relacionados {#related-articles}

- [Calendario de disponibilidad](./availability.md): vea todas las reservas de un vistazo y reserve salas o recursos directamente
- [Aprobaciones del calendario](./approvals.md): apruebe o rechace solicitudes de reserva de salas y recursos
- [Creación de calendarios](./creating-calendars.md): configure calendarios de eventos
- [Creación de grupos](../groups/creating-groups.md): configure los grupos que pueden reservar salas y recursos
