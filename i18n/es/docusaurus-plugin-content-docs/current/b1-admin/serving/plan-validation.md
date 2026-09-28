---
title: "Validación de Planes y Notificaciones"
---

# Validación de Planes y Notificaciones de Voluntarios

<div class="article-intro">

B1 Admin verifica automáticamente sus planes en busca de problemas antes del domingo — posiciones no ocupadas, conflictos de programación y voluntarios que han bloqueado la fecha. Cuando todo se ve bien, puede notificar a todo su equipo con un solo clic.

</div>

<div class="prereqs">
<h4>Antes de Empezar</h4>

- Cree un [plan de servicio](./plans.md) y asigne voluntarios a posiciones
- Agregue [horarios de servicio](./plans.md) al plan para que la detección de conflictos pueda verificar superposiciones
- Asegúrese de que los voluntarios tengan la aplicación B1 Móvil instalada para recibir notificaciones push

</div>

## El Panel de Validación

Cada plan tiene un panel de **Validación** que se ejecuta automáticamente mientras lo construye. Verifica tres cosas:

### Posiciones no Ocupadas
Si una posición requiere más personas de las que están actualmente asignadas, el panel de validación enumera exactamente lo que aún se necesita — por ejemplo, *"Técnico de Sonido: se necesita 1 persona más."* Puede ver de un vistazo si su plan está completamente cubierto antes de que llegue la semana.

### Conflictos de Programación
Si un voluntario está asignado a dos posiciones que se superponen en tiempo dentro del mismo plan, el panel de validación señala el conflicto — por ejemplo, *"Jane Smith: conflicto de horario entre Líder de Adoración y Registro de Niños durante el Servicio Dominical."* Esto detecta dobles reservas antes de que se conviertan en un problema del domingo por la mañana.

### Fechas de Bloqueo
Los voluntarios pueden establecer fechas en las que no están disponibles en B1 Móvil. Si alguien está asignado a un plan que cae dentro de una de sus fechas de bloqueo, el panel de validación detecta el conflicto automáticamente para que pueda encontrar un reemplazo.

### Conflictos Entre Planes
La validación también verifica todos sus planes a la vez. Si el mismo voluntario está asignado en dos planes diferentes que se superponen en tiempo — por ejemplo, un servicio a las 9am y un servicio a las 10am que ambos se ejecutan hasta las 10:30am — B1 Admin señalará a esa persona como doble reserva entre planes.

:::tip
No necesita hacer nada para ejecutar la validación — se actualiza automáticamente cada vez que agrega o cambia una asignación. Solo mantenga un ojo en el panel mientras construye el plan.
:::

## Notificación de Voluntarios

Una vez que su plan está configurado, puede notificar a todos los voluntarios asignados a la vez directamente desde el panel de validación.

1. Abra el plan y desplácese hasta el panel de **Validación**
2. Si hay voluntarios sin notificar, verá un enlace mostrando cuántos necesitan ser notificados (por ejemplo, *"Notificar 8 voluntarios"*)
3. Haga clic en el enlace para enviar notificaciones push a todos los que aún no han sido notificados
4. Los voluntarios reciben una notificación en su teléfono informándoles que han sido programados e instándoles a confirmar su asignación

:::info
Solo se incluirán los voluntarios que aún no han sido notificados. Si agrega a alguien al plan más tarde, el enlace reaparecerá para que pueda notificar al nuevo agregado sin volver a notificar al resto del equipo.
:::

:::warning
Los voluntarios deben tener la experiencia móvil B1.church instalada (PWA en su pantalla de inicio, o la aplicación nativa B1 Mobile deprecada para usuarios que aún la tienen) con notificaciones habilitadas para recibir notificaciones push. Consulte [Instalación como Aplicación (PWA)](/docs/b1-church/getting-started/installing-pwa) para instrucciones de configuración.
:::

## Artículos Relacionados

- [Planes de Servicio](./plans.md)
- [Flujos de Trabajo](./workflows.md)
- [Instalación del PWA B1.church](/docs/b1-church/getting-started/installing-pwa)
