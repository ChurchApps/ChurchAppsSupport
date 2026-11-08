---
title: "Validación de planes y notificaciones"
description: "Revise los planes de servicio en B1 Admin para detectar posiciones sin cubrir, conflictos de horario y voluntarios no disponibles, y luego notifique a todo su equipo con un solo clic."
---

# Validación de planes y notificaciones a voluntarios

<div class="article-intro">

B1 Admin revisa automáticamente sus planes en busca de problemas antes del domingo: posiciones sin cubrir, conflictos de horario y voluntarios que han marcado la fecha como no disponible. Cuando todo está en orden, puede notificar a todo su equipo con un solo clic.

</div>

<div class="prereqs">
<h4>Antes de empezar</h4>

- Cree un [plan de servicio](./plans.md) y asigne voluntarios a las posiciones
- Agregue [horarios de servicio](./plans.md) al plan para que la detección de conflictos pueda comprobar si hay superposiciones
- Asegúrese de que los voluntarios tengan [instalada la aplicación B1](../../b1-church/getting-started/installing-pwa.md) para recibir notificaciones push

</div>

## El panel de validación

Cada plan tiene un panel de **Validación** que se ejecuta automáticamente mientras usted lo construye. Revisa tres aspectos:

### Posiciones sin cubrir
Si una posición requiere más personas de las que están asignadas actualmente, el panel de validación indica exactamente qué falta, por ejemplo: *«Técnico de sonido: falta 1 persona más».* Así puede ver de un vistazo si su plan está completo antes de que llegue la semana.

### Conflictos de horario
Si un voluntario está asignado a dos posiciones que se superponen en el tiempo dentro del mismo plan, el panel de validación marca el conflicto, por ejemplo: *«Jane Smith: conflicto de horario entre Líder de adoración y Registro de niños durante el Servicio del domingo».* Esto detecta las asignaciones dobles antes de que se conviertan en un problema el domingo por la mañana.

### Fechas no disponibles
Los voluntarios pueden indicar en la aplicación B1 las fechas en las que no están disponibles. Si alguien está asignado a un plan que cae dentro de una de sus fechas no disponibles, el panel de validación muestra el conflicto automáticamente para que pueda encontrar un reemplazo.

### Conflictos entre planes
La validación también revisa todos sus planes a la vez. Si el mismo voluntario está asignado en dos planes distintos que se superponen en el tiempo, por ejemplo, un servicio de las 9:00 y otro de las 10:00 que terminan a las 10:30, B1 Admin marcará a esa persona como asignada dos veces en distintos planes.

:::tip
No necesita hacer nada para ejecutar la validación: se actualiza automáticamente cada vez que agrega o modifica una asignación. Solo tenga un ojo puesto en el panel mientras construye el plan.
:::

## Notificar a los voluntarios

Una vez que el plan está listo, puede notificar a todos los voluntarios asignados de una sola vez desde el panel de validación.

1. Abra el plan y desplácese hasta el panel de **Validación**
2. Si hay voluntarios sin notificar, verá un enlace que indica cuántos deben recibir la notificación (por ejemplo: *«Notificar a 8 voluntarios»*)
3. Haga clic en el enlace para enviar notificaciones push a todos los que aún no han sido notificados
4. Los voluntarios reciben una notificación en su teléfono que les informa que han sido programados y les pide que confirmen su asignación

:::info
Solo se incluyen los voluntarios que aún no han sido notificados. Si agrega a alguien al plan más adelante, el enlace volverá a aparecer para que pueda notificar a la nueva persona sin volver a notificar al resto del equipo.
:::

### Planes con un flujo de confirmación

Si la configuración del plan indica un [flujo de confirmación](./workflows.md#serving-assignment-confirmations), el panel muestra: *«Las nuevas solicitudes usan el flujo de confirmación. Las alertas de la aplicación siguen activadas. Los seguimientos se detienen cuando cada solicitud es aceptada o rechazada».* En ese caso:

- El enlace de notificación cuenta solo a los voluntarios que no han sido notificados y que todavía no han respondido.
- Al hacer clic, se envía la alerta habitual dentro de la aplicación y se crea una tarjeta por cada solicitud en el tablero del flujo de trabajo. Después, el flujo envía los seguimientos por correo electrónico y mensaje de texto y, si es necesario, asigna la solicitud a alguien para que llame a la persona.
- El plan debe estar publicado (no en borrador) y el flujo de trabajo debe estar activo. De lo contrario, el panel muestra: *«No se pudieron emitir las solicitudes. Compruebe que el flujo de trabajo seleccionado esté activo y que el plan esté publicado, y luego inténtelo de nuevo».*

:::warning
Los voluntarios deben tener la aplicación B1 instalada en la pantalla de inicio y las notificaciones activadas para recibir notificaciones push. Consulte [Instalar como aplicación (PWA)](../../b1-church/getting-started/installing-pwa.md) para ver las instrucciones de configuración.
:::

## Artículos relacionados

- [Planes de servicio](./plans.md)
- [Flujos de trabajo](./workflows.md)
- [Instalar el PWA de B1.church](/docs/b1-church/getting-started/installing-pwa)
