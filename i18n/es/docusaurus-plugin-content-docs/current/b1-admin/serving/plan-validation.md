---
title: "Validación de planes y notificaciones"
description: "Revise los planes de servicio en B1 Admin para detectar puestos sin cubrir, conflictos de programación y voluntarios que bloquearon la fecha, y luego envíe una notificación push a todo su equipo con un solo clic."
---

# Validación de planes y notificaciones a voluntarios {#plan-validation--volunteer-notifications}

<div class="article-intro">

B1 Admin revisa automáticamente sus planes antes del domingo en busca de problemas: puestos sin cubrir, conflictos de programación y voluntarios que bloquearon la fecha. Cuando todo se ve bien, puede notificar a todo su equipo con un solo clic.

</div>

<div class="prereqs">
<h4>Antes de empezar</h4>

- Cree un [plan de servicio](./plans.md) y asigne voluntarios a los puestos
- Agregue [horarios de servicio](./plans.md) al plan para que la detección de conflictos pueda revisar los solapamientos
- Asegúrese de que los voluntarios tengan [instalada la aplicación B1](../../b1-church/getting-started/installing-pwa.md) para recibir notificaciones push

</div>

## El panel de validación {#the-validation-panel}

Cada plan tiene un panel **Validation** que se ejecuta automáticamente mientras lo construye. Abra el plan y haga clic en **Manage serving team** para verlo junto a los puestos. La página del plan muestra un resumen de una línea debajo de **Serving team** (por ejemplo, "2 conflicts · 3 not notified") con un enlace **Review** al panel completo. Los puestos que todavía necesitan personas también aparecen en la página del plan, así que la línea de resumen solo cuenta los conflictos y los voluntarios que no han sido notificados.

El panel revisa lo siguiente:

### Puestos sin cubrir {#unfilled-positions}
Si un puesto requiere más personas de las que tiene asignadas actualmente, el panel de validación enumera exactamente lo que todavía falta, por ejemplo, *"Sound Tech: 1 more person needed."* Así puede ver de un vistazo si su plan está completamente cubierto antes de que llegue la semana.

### Conflictos de programación {#scheduling-conflicts}
Si un voluntario está asignado a dos puestos que se solapan en el tiempo dentro del mismo plan, el panel de validación marca el conflicto, por ejemplo, *"Jane Smith: time conflict between Worship Leader and Children's Check-in during Sunday Service."* Esto detecta las dobles asignaciones antes de que se conviertan en un problema un domingo por la mañana.

### Fechas bloqueadas {#blockout-dates}
Los voluntarios pueden indicar en la aplicación B1 las fechas en que no están disponibles. Si alguien está asignado a un plan que cae dentro de una de sus fechas bloqueadas, el panel de validación muestra el conflicto automáticamente para que pueda buscar un reemplazo.

Los voluntarios bloqueados también se marcan mientras programa. En la página del equipo de servicio y en el cuadro de diálogo **Assign Position**, su nombre muestra una insignia roja **Unavailable**; pase el cursor sobre ella para ver las fechas (por ejemplo, *Blocked out: Nov 22, 2026 – Nov 29, 2026*). En el cuadro de diálogo **Assign Position** aparecen después de todos los demás miembros del equipo, y aun así puede asignarlos. En la cuadrícula de [Plans Overview](./plans-overview.md), un pequeño icono rojo de calendario junto a un nombre indica lo mismo.

Para los voluntarios que no usan la aplicación, el personal puede ingresar fechas de bloqueo por ellos. Abra el equipo (desde la lista **Serving Teams** del ministerio) y desplácese hasta la tarjeta **Block-out dates** debajo de la lista de miembros, que muestra los bloqueos próximos de cada miembro del equipo con **Team member**, **From** y **To**:

1. Haga clic en **Add block-out**.
2. Elija el **Team member** y luego establezca las fechas **From** y **To**.
3. Haga clic en **Save**.

Para eliminar un bloqueo, haga clic en el icono de eliminar de su fila y confirme. Agregar y quitar bloqueos requiere permiso para editar planes; cualquier otra persona que abra el equipo solo ve la lista.

### Conflictos entre planes {#cross-plan-conflicts}
La validación también revisa todos sus planes a la vez. Si el mismo voluntario está asignado a dos planes distintos que se solapan en el tiempo, por ejemplo, un servicio de las 9 a. m. y otro de las 10 a. m. que terminan a las 10:30 a. m., B1 Admin marcará a esa persona como doblemente asignada entre planes.

### Preferencias de programación {#scheduling-preferences}
Si un voluntario tiene [preferencias de programación](./plans.md#scheduling-preferences), el panel le advierte cuando una asignación va en contra de ellas: cuando está programado más veces este mes que su **Max times per month**, cuando ninguno de los horarios del plan coincide con sus **Preferred service times**, o cuando pidió no servir el mismo día que su hogar y un miembro del hogar también está programado.

Cuando todo está en orden, el panel dice **Plan is valid.**

:::tip
No necesita hacer nada para ejecutar la validación: se actualiza automáticamente cada vez que agrega o cambia una asignación. Solo tenga un ojo puesto en el panel mientras construye el plan.
:::

## Notificar a los voluntarios {#notifying-volunteers}

Cuando su plan esté listo, puede notificar a todos los voluntarios asignados a la vez directamente desde el panel de validación.

1. Abra el plan y haga clic en **Manage serving team** (o en **Review** en la línea de resumen del plan) para ver el panel **Validation**.
2. Si hay voluntarios sin notificar, verá un enlace que indica cuántos deben recibir la notificación (por ejemplo, *"Notify 8 volunteer(s)"*). Cuando todos hayan sido notificados, el panel dice **All volunteers notified.**
3. Haga clic en el enlace para enviar notificaciones push a todos los que todavía no han sido notificados.
4. Los voluntarios reciben una notificación en su teléfono que les informa que han sido programados y les pide que confirmen su asignación.

:::info
Solo se incluyen los voluntarios que todavía no han sido notificados. Si agrega a alguien al plan más adelante, el enlace reaparecerá para que pueda notificar a la nueva persona sin volver a notificar al resto del equipo.
:::

### Publicar un plan en lápiz {#publishing-a-penciled-in-plan}

Si el plan está [en lápiz](./plans.md#plan-settings), los voluntarios todavía no pueden ver sus asignaciones y el panel muestra *"Penciled in — volunteers can't see these assignments yet."* con un botón en lugar del enlace de notificación:

- **Publish Plan** hace visibles las asignaciones.
- **Publish & Notify** (se muestra cuando algunos voluntarios no han sido notificados, por ejemplo, *"Publish & Notify 8 volunteer(s)"*) hace visibles las asignaciones y notifica de inmediato a esos voluntarios.

Confirme en el cuadro de diálogo para publicar.

### Planes con un flujo de confirmación {#plans-with-a-confirmation-workflow}

Si la configuración del plan indica un [flujo de confirmación](./workflows.md#serving-assignment-confirmations), el panel muestra *"New requests use the confirmation workflow. App alerts stay enabled. Follow-ups stop when each request is accepted or declined."* En ese caso:

- El enlace de notificación cuenta solo los voluntarios que no han sido notificados y que todavía no han respondido.
- Al hacer clic, se envía la alerta habitual dentro de la aplicación y se inicia una tarjeta por solicitud en el tablero del flujo de trabajo. Luego, el flujo de trabajo envía los seguimientos por correo electrónico y mensaje de texto y, si es necesario, asigna la solicitud a alguien para que llame.
- El plan debe estar publicado (no en lápiz) y el flujo de trabajo debe estar activo. De lo contrario, el panel muestra *"Requests could not be issued. Check that the selected workflow is active and the plan is published, then try again."*

:::warning
Para recibir notificaciones push, los voluntarios deben tener la aplicación B1 instalada en la pantalla de inicio y las notificaciones activadas. Consulte [Instalar como aplicación (PWA)](../../b1-church/getting-started/installing-pwa.md) para las instrucciones de configuración.
:::

## Artículos relacionados {#related-articles}

- [Planes de servicio](./plans.md)
- [Flujos de trabajo](./workflows.md)
- [Instalar la PWA de B1.church](/docs/b1-church/getting-started/installing-pwa)
