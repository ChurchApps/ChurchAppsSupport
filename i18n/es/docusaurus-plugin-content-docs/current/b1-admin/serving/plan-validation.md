---
title: "Validación de planes y notificaciones"
---

# Validación de planes y notificaciones a voluntarios

<div class="article-intro">

B1 Admin revisa automáticamente tus planes en busca de problemas antes del domingo: posiciones sin cubrir, conflictos de horario y voluntarios que han bloqueado la fecha. Cuando todo está en orden, puedes notificar a todo tu equipo con un solo clic.

</div>

<div class="prereqs">
<h4>Antes de comenzar</h4>

- Crea un [plan de servicio](./plans.md) y asigna voluntarios a las posiciones
- Añade [horarios de servicio](./plans.md) al plan para que la detección de conflictos pueda revisar si hay superposiciones
- Asegúrate de que los voluntarios tengan instalada la aplicación B1 Mobile para recibir notificaciones push

</div>

## El panel de validación

Cada plan tiene un panel de **Validación** que se ejecuta automáticamente mientras lo construyes. Revisa tres cosas:

### Posiciones sin cubrir
Si una posición requiere más personas de las que tiene asignadas actualmente, el panel de validación indica exactamente lo que todavía falta, por ejemplo: *"Técnico de sonido: falta 1 persona."* Así puedes ver de un vistazo si tu plan está completamente cubierto antes de que llegue la semana.

### Conflictos de horario
Si un voluntario está asignado a dos posiciones que se superponen en el tiempo dentro del mismo plan, el panel de validación marca el conflicto, por ejemplo: *"Jane Smith: conflicto de horario entre Líder de alabanza y Registro de niños durante el Servicio dominical."* Esto detecta las dobles asignaciones antes de que se conviertan en un problema el domingo por la mañana.

### Fechas de bloqueo
Los voluntarios pueden indicar en B1 Mobile las fechas en las que no están disponibles. Si alguien está asignado a un plan que cae dentro de una de sus fechas de bloqueo, el panel de validación muestra el conflicto automáticamente para que puedas encontrar un reemplazo.

### Conflictos entre planes
La validación también revisa todos tus planes a la vez. Si el mismo voluntario está asignado en dos planes diferentes que se superponen en el tiempo (por ejemplo, un servicio a las 9 a. m. y otro a las 10 a. m. que terminan a las 10:30 a. m.), B1 Admin marcará a esa persona como asignada dos veces.

:::tip
No necesitas hacer nada para ejecutar la validación: se actualiza automáticamente cada vez que añades o cambias una asignación. Solo mantén un ojo en el panel mientras construyes el plan.
:::

## Notificar a los voluntarios

Una vez que el plan esté listo, puedes notificar a todos los voluntarios asignados de una sola vez desde el panel de validación.

1. Abre el plan y desplázate hasta el panel de **Validación**
2. Si hay voluntarios sin notificar, verás un enlace que indica cuántos necesitan ser notificados (por ejemplo, *"Notificar a 8 voluntarios"*)
3. Haz clic en el enlace para enviar notificaciones push a todas las personas que aún no hayan sido notificadas
4. Los voluntarios reciben una notificación en su teléfono que les informa que han sido programados y les pide que confirmen su asignación

:::info
Solo se incluyen los voluntarios que aún no han sido notificados. Si añades a alguien al plan más adelante, el enlace volverá a aparecer para que puedas notificar a la nueva persona sin volver a notificar al resto del equipo.
:::

### Planes con un flujo de confirmación

Si la configuración del plan indica un [flujo de confirmación](./workflows.md#serving-assignment-confirmations), el panel muestra *"Las nuevas solicitudes usan el flujo de confirmación. Las alertas de la aplicación siguen activadas. Los seguimientos se detienen cuando cada solicitud es aceptada o rechazada."* En ese caso:

- El enlace de notificar cuenta solo los voluntarios que no han sido notificados y que todavía no han respondido.
- Al hacer clic, se envía la alerta habitual en la aplicación y se crea una tarjeta por solicitud en el tablero del flujo de trabajo. Después, el flujo envía los seguimientos por correo electrónico y mensaje de texto y, si es necesario, asigna la solicitud a alguien para que llame.
- El plan debe estar publicado (no en lápiz) y el flujo de trabajo debe estar activo. De lo contrario, el panel muestra *"No se pudieron emitir las solicitudes. Verifica que el flujo de trabajo seleccionado esté activo y que el plan esté publicado, y vuelve a intentarlo."*

:::warning
Los voluntarios deben tener instalada la experiencia móvil de B1.church (PWA en la pantalla de inicio, o la aplicación nativa B1 Mobile obsoleta para quienes todavía la tengan) con las notificaciones activadas para recibir notificaciones push. Consulta [Instalar como aplicación (PWA)](/docs/b1-church/getting-started/installing-pwa) para ver las instrucciones de configuración.
:::

## Artículos relacionados

- [Planes de servicio](./plans.md)
- [Flujos de trabajo](./workflows.md)
- [Instalar el PWA de B1.church](/docs/b1-church/getting-started/installing-pwa)
