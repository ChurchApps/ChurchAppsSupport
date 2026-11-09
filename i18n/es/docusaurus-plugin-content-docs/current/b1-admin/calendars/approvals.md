---
title: "Aprobaciones de calendario"
description: "Revise las solicitudes pendientes de reserva de salas y recursos en B1 Admin, compruebe conflictos, apruebe o rechace solicitudes y consulte las decisiones anteriores en Historial."
---

# Aprobaciones de calendario

<div class="article-intro">

La página de Aprobaciones es donde los administradores revisan y actúan sobre las solicitudes pendientes de reserva de salas y recursos, así como sobre los eventos del calendario que requieren aprobación antes de publicarse.

</div>

<div class="prereqs">
<h4>Antes de comenzar</h4>

- Configure salas o recursos con un **Approval Group** en [Salas y recursos](./rooms-resources.md)
- Necesita el permiso **Calendars Admin** o el permiso **content.edit**

</div>

## Abrir Aprobaciones

En B1 Admin, abra el [menú Jump](../introduction.md#getting-around-with-the-jump-menu) (la barra de búsqueda en la esquina superior izquierda), expanda **Calendars** y haga clic en **Approvals**. Aquí aparecen las solicitudes de reserva pendientes y los eventos en espera de revisión. Use los botones **Pending** e **History** en la parte superior para alternar entre las solicitudes que todavía necesitan una decisión y las que ya fueron decididas.

## Solicitudes de reserva

Cuando un grupo crea un evento y solicita una sala o un recurso, la solicitud aparece en la sección **Room & Resource Requests**. Cada fila muestra:

- El nombre del evento y la fecha y hora
- La sala o recurso solicitado (con la cantidad, en el caso de recursos de varias unidades)
- **Requested by**, la persona que lo solicitó, enlazada a su registro
- Una insignia de estado que indica si la solicitud tiene conflictos

### Indicadores de conflicto

Si una solicitud se superpone con otra reserva o bloqueo para la misma sala o recurso, su estado muestra una insignia **Conflicts**; pase el cursor sobre ella para ver los detalles. Las solicitudes sin superposiciones muestran **No conflicts**. Revise con atención las solicitudes en conflicto antes de aprobar cualquiera de ellas.

### Aprobar o rechazar

Haga clic en **Approve** o **Reject** en cualquier solicitud de reserva (al rechazar, se le pedirá confirmación primero). Se notifica al solicitante la decisión. Las reservas aprobadas bloquean esa sala o recurso para el evento; las reservas rechazadas liberan el espacio para otros.

Al hacer clic en **Approve**, se abre el cuadro de diálogo **Approve booking** para que también pueda publicar el evento en el mismo paso:

1. Marque **Publish to public calendar** para hacer público el evento en el calendario de su grupo. Déjelo sin marcar para aprobar la reserva sin cambiar la visibilidad del evento.
2. Una vez marcado **Publish to public calendar**, puede elegir opcionalmente un calendario curado en **Also add to calendar** para agregar también el evento a uno de sus [calendarios curados](./curated-calendar.md). Déjelo en **None** para omitir este paso. (Esta opción solo aparece si tiene el permiso **content.edit**).
3. Haga clic en **Approve**.

## Eventos pendientes

Si su flujo de trabajo de calendario requiere aprobación de eventos antes de que sean visibles para el público, los eventos pendientes aparecen en la sección **Event Requests**. Haga clic en **Approve** para publicar un evento en el calendario, o en **Reject** para notificar al remitente que se necesitan cambios.

:::tip
Configure un Approval Group en una sala en [Salas y recursos](./rooms-resources.md) para exigir aprobación para esa sala. Los grupos con acceso podrán entonces solicitar la sala al crear eventos, y esas solicitudes llegarán a esta página.
:::

## Historial

Las solicitudes aprobadas y rechazadas permanecen en la página. Haga clic en **History** en la parte superior de Approvals para verlas; haga clic en **Pending** para volver a las solicitudes abiertas.

- **Room & Resource Requests** muestra cada reserva decidida con el evento, la sala o recurso, **Requested by**, una insignia **Approved** o **Rejected**, y **Decided**, que indica quién tomó la decisión y en qué fecha. Las solicitudes decididas más recientemente aparecen primero.
- **Event Requests** muestra cada evento decidido con su descripción, **Requested by** y una insignia **Approved** o **Rejected**. No se registra quién tomó la decisión sobre una solicitud de evento ni cuándo, por lo que esa columna no se muestra para los eventos.

Haga clic en un nombre bajo **Requested by** para abrir el registro de esa persona.

## Artículos relacionados

- [Salas, recursos y programación](./rooms-resources.md) — configure salas y recursos reservables
- [Creación de calendarios](./creating-calendars.md) — administre calendarios y eventos
