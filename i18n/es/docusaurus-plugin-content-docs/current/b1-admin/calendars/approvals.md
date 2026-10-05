---
title: "Aprobaciones de Calendario"
---

# Aprobaciones de Calendario

<div class="article-intro">

La página Approvals es donde los administradores revisan y actúan en solicitudes de reservas de salas y recursos pendientes, así como eventos de calendario que requieren aprobación antes de ser publicados.

</div>

<div class="prereqs">
<h4>Antes de Comenzar</h4>

- Configure salas o recursos con un **Approval Group** en [Salas y Recursos](rooms-resources)
- Necesita el permiso **Calendars Admin** o el permiso **content.edit**

</div>

## Abriendo Aprobaciones

En B1 Admin, abra el [menú Jump](../introduction.md#getting-around-with-the-jump-menu) (la barra de búsqueda en la esquina superior izquierda), expanda **Calendars**, y haga clic en **Approvals**. Las solicitudes de reserva pendientes y eventos esperando revisión se enumeran aquí.

## Solicitudes de Reserva

Cuando un grupo crea un evento y solicita una sala o recurso, la solicitud aparece en el panel **Room & Resource Requests**. Cada fila muestra:

- La sala o recurso siendo solicitado
- El nombre del evento y fecha/hora
- El grupo solicitante

### Indicadores de Conflicto

Si dos solicitudes se superponen para la misma sala o recurso, aparece un icono de advertencia de conflicto. Revise cuidadosamente las solicitudes conflictivas antes de aprobar cualquiera.

### Aprobar o Rechazar

Haga clic en el icono **✓** (aprobar) o **✗** (rechazar) en cualquier solicitud de reserva. El grupo solicitante es notificado de la decisión. Las reservas aprobadas se bloquean a esa sala o recurso para el evento; las reservas rechazadas liberan el espacio para otros.

Cuando haga clic en aprobar, se abre un diálogo **Approve booking** para que también pueda publicar el evento en el mismo paso:

1. Marque **Publish to public calendar** para hacer el evento público en el calendario del grupo. Déjelo sin marcar para aprobar la reserva sin cambiar la visibilidad del evento.
2. Una vez que **Publish to public calendar** esté marcado, puede opcionalmente elegir un calendario curado de **Also add to calendar** para agregar el evento a uno de sus [calendarios curados](curated-calendar) también. Déjelo configurado como **None** para omitir esto. (Esta opción solo aparece si tiene el permiso **content.edit**.)
3. Haga clic en **Approve**.

## Eventos Pendientes

Si su flujo de trabajo de calendario requiere aprobación de eventos antes de que los eventos sean visibles al público, los eventos pendientes aparecen en el panel **Event Requests**. Apruebe un evento para publicarlo en el calendario, o rechácelo para notificar al remitente que se necesitan cambios.

:::tip
Configure un Approval Group en una sala en [Salas y Recursos](rooms-resources) para requerir aprobación para esa sala. Los grupos con acceso pueden entonces solicitar la sala al crear eventos, y esas solicitudes fluyen hacia esta página.
:::

## Artículos Relacionados

- [Salas, Recursos y Programación](rooms-resources) — configure salas y recursos reservables
- [Creando Calendarios](creating-calendars) — administre calendarios y eventos
