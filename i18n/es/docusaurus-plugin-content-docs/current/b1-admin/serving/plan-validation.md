---
title: "Validación de Planes y Notificaciones de Voluntarios"
---

# Validación de Planes y Notificaciones de Voluntarios

<div class="article-intro">

B1 Admin verifica automáticamente sus planes en busca de problemas antes del domingo -- posiciones sin llenar, conflictos de horario y voluntarios que han bloqueado la fecha. Cuando todo se ve bien, puede notificar a su equipo completo con un solo clic.

</div>

<div class="prereqs">
<h4>Antes de Comenzar</h4>

- Crear un [plan de servicio](./plans.md) y asignar voluntarios a posiciones
- Agregar [tiempos de servicio](./plans.md) al plan para que la detección de conflictos pueda verificar superposiciones
- Asegurarse de que los voluntarios tengan la aplicación B1 Mobile instalada para recibir notificaciones push

</div>

## El Panel de Validación

Cada plan tiene un panel de **Validación** que se ejecuta automáticamente a medida que lo construye. Verifica tres cosas:

### Posiciones Sin Llenar
Si una posición requiere más personas de las asignadas actualmente, el panel de validación lista exactamente lo que aún se necesita. Puede ver de un vistazo si su plan está completamente equipado antes de que llegue la semana.

### Conflictos de Horario
Si un voluntario está asignado a dos posiciones que se superponen en tiempo dentro del mismo plan, el panel de validación marca el conflicto. Esto detecta doble reservas antes de que se conviertan en un problema del domingo por la mañana.

### Fechas de Bloqueo
Los voluntarios pueden establecer fechas en las que no están disponibles en B1 Mobile. Si alguien está asignado a un plan que cae dentro de una de sus fechas de bloqueo, el panel de validación muestra el conflicto automáticamente para que pueda encontrar un reemplazo.

### Conflictos Entre Planes
La validación también verifica todos sus planes a la vez. Si el mismo voluntario está asignado en dos planes diferentes que se superponen en tiempo, B1 Admin marcará a esa persona como doble reservada entre planes.

:::tip
No necesita hacer nada para ejecutar validación -- se actualiza automáticamente cada vez que agrega o cambia una asignación. Solo mantenga un ojo en el panel a medida que construye el plan.
:::

## Notificación a Voluntarios

Una vez que su plan está configurado, puede notificar a todos los voluntarios asignados a la vez directamente desde el panel de validación.

1. Abra el plan y desplácese hasta el panel de **Validación**
2. Si hay voluntarios sin notificar, verá un enlace mostrando cuántos necesitan ser notificados
3. Haga clic en el enlace para enviar notificaciones push a todos los que no han sido notificados aún
4. Los voluntarios reciben una notificación en su teléfono dejándoles saber que han sido programados y pidiéndoles que confirmen su asignación

:::info
Solo los voluntarios que no han sido notificados aún serán incluidos. Si agrega a alguien al plan más tarde, el enlace reaparecerá para que pueda notificar la nueva adición sin volver a notificar al resto del equipo.
:::

:::warning
Los voluntarios deben tener la aplicación B1 Mobile instalada y las notificaciones habilitadas para recibir la notificación push. Consulte la guía [Notificaciones](/docs/b1-mobile/community/notifications) para cómo los voluntarios pueden habilitar esto en su dispositivo.
:::

## Artículos Relacionados

- [Service Plans](./plans.md)
- [Automations](./automations.md)
- [B1 Mobile Notifications](/docs/b1-mobile/community/notifications)