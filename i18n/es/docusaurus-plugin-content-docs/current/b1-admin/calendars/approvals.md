---
title: "Aprobaciones del calendario"
description: "Revise las solicitudes pendientes de reserva de salas y recursos en B1 Admin, compruebe los conflictos, apruébelas o recházelas, y consulte las decisiones anteriores en Historial."
---

# Aprobaciones del calendario

<div class="article-intro">

La página de Aprobaciones es donde los administradores revisan y actúan sobre las solicitudes pendientes de reserva de salas y recursos, así como los eventos del calendario que requieren aprobación antes de publicarse.

</div>

<div class="prereqs">
<h4>Antes de comenzar</h4>

- Configure las salas o recursos con un **Grupo de aprobación** en [Salas y recursos](./rooms-resources.md)
- Necesita el permiso **Editar contenido**, o **Resolver conflictos de calendario y aprobaciones** (ambos en la sección **Contenido** de [Roles y permisos](../settings/roles-permissions.md)). Sin **Editar contenido**, el menú **Calendarios** no se muestra; en ese caso, abra Aprobaciones desde el enlace de aprobaciones pendientes del **Panel** o desde el correo de aprobación.

</div>

## Abrir Aprobaciones {#opening-approvals}

En B1 Admin, abra el [menú Jump](../introduction.md#getting-around-with-the-jump-menu) (la barra de búsqueda en la parte superior izquierda), despliegue **Calendarios** y haga clic en **Aprobaciones**. Aquí aparecen las solicitudes de reserva pendientes y los eventos en espera de revisión. Use los botones **Pendientes** e **Historial** en la parte superior para cambiar entre las solicitudes que aún necesitan una decisión y las que ya fueron resueltas.

## Solicitudes de reserva {#booking-requests}

Cuando alguien reserva una sala o recurso que tiene un **Grupo de aprobación**, y no es miembro de ese grupo, la solicitud aparece en la sección **Solicitudes de salas y recursos**. (Las reservas hechas por miembros del Grupo de aprobación se aprueban automáticamente). Los miembros del Grupo de aprobación también reciben un correo electrónico con las nuevas solicitudes pendientes y un enlace a esta página. Cada fila muestra:

- El nombre del evento y la fecha/hora
- La sala o recurso solicitado (con la cantidad para recursos de varias unidades)
- **Solicitado por**, la persona que lo pidió, con enlace a su registro
- Una insignia de estado que indica si la solicitud tiene conflictos

### Indicadores de conflicto {#conflict-indicators}

Si una solicitud se superpone con otra reserva o bloqueo de la misma sala o recurso, su estado muestra una insignia **Conflictos**; pase el cursor sobre ella para ver los detalles. Las solicitudes sin superposiciones muestran **Sin conflictos**. Revise con cuidado las solicitudes en conflicto antes de aprobar cualquiera de ellas.

### Aprobar o rechazar {#approving-or-rejecting}

Pase el cursor sobre una solicitud de reserva y haga clic en **Aprobar** o **Rechazar** (al rechazar se le pedirá que confirme primero). Se notifica a quien hizo la solicitud sobre la decisión. Las reservas aprobadas bloquean esa sala o recurso para el evento; las reservas rechazadas liberan el espacio para otros.

Al hacer clic en **Aprobar**, se abre un cuadro de diálogo **Aprobar reserva** para que también pueda publicar el evento en el mismo paso:

1. Marque **Publicar en el calendario público** para hacer el evento público en el calendario de su grupo. Déjelo sin marcar para aprobar la reserva sin cambiar la visibilidad del evento.
2. Una vez marcado **Publicar en el calendario público**, puede elegir opcionalmente un calendario seleccionado en **Añadir también al calendario** para incluir el evento también en uno de sus [calendarios seleccionados](./curated-calendar.md). Déjelo en **Ninguno** para omitir este paso. (Esta opción solo aparece si tiene el permiso **content.edit**).
3. Haga clic en **Aprobar**.

## Eventos pendientes {#pending-events}

Los eventos que los miembros solicitan (por ejemplo, desde **Mis solicitudes** en la app de B1) aparecen en la sección **Solicitudes de eventos** con su fecha, **Descripción** y **Solicitado por**. Haga clic en **Aprobar** para publicar un evento en el calendario, o en **Rechazar** para notificar a quien lo envió que se necesitan cambios. Haga clic en **Editar** para corregir los detalles de la solicitud antes de decidir, o en **Eliminar** para borrarla.

:::tip
Configure un Grupo de aprobación en una sala desde [Salas y recursos](./rooms-resources.md) para requerir aprobación para esa sala. Los grupos con acceso podrán entonces solicitar la sala al crear eventos, y esas solicitudes llegarán a esta página.
:::

## Historial {#history}

Las solicitudes aprobadas y rechazadas permanecen en la página. Haga clic en **Historial** en la parte superior de Aprobaciones para verlas; haga clic en **Pendientes** para volver a las solicitudes abiertas.

- **Solicitudes de salas y recursos** enumera cada reserva resuelta con el evento, la sala o recurso, **Solicitado por**, una insignia **Aprobada** o **Rechazada**, y **Decidida**, que muestra quién tomó la decisión y en qué fecha. Las solicitudes resueltas más recientemente aparecen primero.
- **Solicitudes de eventos** enumera cada evento resuelto con su descripción, **Solicitado por**, una insignia **Aprobada** o **Rechazada**, y **Decidida**, que muestra quién tomó la decisión y en qué fecha. Las solicitudes de eventos más antiguas, resueltas antes de que B1 empezara a registrar esto, muestran un guion en su lugar.

Puede cambiar de opinión desde el Historial: una solicitud aprobada tiene una acción **Rechazar**, y una rechazada tiene una acción **Aprobar**. Rechazar una solicitud de evento que había aprobado lo quita del calendario público. Las solicitudes de eventos también pueden editarse o eliminarse aquí.

Haga clic en un nombre bajo **Solicitado por** para abrir el registro de esa persona.

## Artículos relacionados {#related-articles}

- [Salas, recursos y programación](./rooms-resources.md): configure salas y recursos reservables
- [Creación de calendarios](./creating-calendars.md): administre calendarios y eventos
