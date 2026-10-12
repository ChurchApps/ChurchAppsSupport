---
title: "Tareas"
---

# Tareas

<div class="article-intro">

Las tareas te permiten asignar elementos de acción a personas o grupos en tu iglesia. Ya sea una tarea única o una responsabilidad recurrente, las tareas te ayudan a realizar un seguimiento de lo que necesita hacerse y quién es responsable para que nada se pase por alto.

</div>

<div class="prereqs">
<h4>Antes de Empezar</h4>

- Asegúrate de que las personas o [grupos](../groups/creating-groups.md) a los que quieres asignar tareas existan en B1 Admin
- En el [menú Saltar](../introduction.md#getting-around-with-the-jump-menu), elige **Servicio > Mi Trabajo** para ver tareas

</div>

## Visualizar Tareas

En el menú Saltar, elige **Servicio > Mi Trabajo** (o busca "Mi Trabajo"). La lista de **Tareas** muestra el título de cada tarea, con quién está relacionada, a quién está asignada, cuándo se abrió y su estado. Tus tarjetas de [flujo de trabajo](./workflows.md) aparecen junto a ella bajo **Mis Tarjetas**.

Usa las pestañas encima de la lista para alternar entre las tareas **Asignadas a Mí**, **Asignadas a Mis Grupos** y **Solicitadas por Mí**. Cada pestaña muestra cuántas tareas contiene.

:::tip
Por defecto, solo se muestran las tareas abiertas. Elige **Cerradas** encima de la lista para ver las tareas completadas en su lugar.
:::

## Crear una Tarea

1. En la página **Mi Trabajo**, haz clic en **Añadir Tarea**. Se abre un formulario **Nueva Tarea**.
2. Haz clic en la caja **Asociar con** y elige la persona a quien se refiere la tarea.
3. Haz clic en la caja **Asignar a**. En la ventana **Seleccionar una Persona o Grupo**, busca en la pestaña **Persona**, o cambia a la pestaña **Grupo** y busca un grupo, luego selecciona el resultado.
4. Ingresa un **Título** para la tarea.
5. Añade **Notas** con cualquier detalle o instrucción para el asignado.
6. Haz clic en **Guardar**.

La tarea ahora aparecerá en la lista de tareas y será visible para el asignado en su panel y aplicación móvil.

## Gestionar una Tarea

Haz clic en cualquier tarea para abrir su página de detalle. Desde aquí puedes:

- **Cerrar o reabrir la tarea** -- Haz clic en **Cerrar tarea** cuando el trabajo esté terminado, o en **Reabrir tarea** para abrirla de nuevo.
- **Reasignar la tarea** -- Haz clic en **Asignar** para elegir una persona o grupo diferente.
- **Cambiar a quién se refiere** -- Haz clic en **Asociar** para elegir otra persona.
- **Añadir notas** -- Publica actualizaciones o detalles para el asignado en las notas de la tarea.
- **Configurar recordatorios** -- Consulta [Recordatorios de Tareas](#task-reminders) más abajo.

## Recordatorios de Tareas {#task-reminders}

Una tarea con fecha de vencimiento puede recordar a su asignado antes de que venza.

1. En la página de la tarea, haz clic en **Editar** junto a **Recordatorios**.
2. Activa **Enviar recordatorios para esta tarea**.
3. Bajo **¿Cuándo deben salir los recordatorios?**, elige hasta tres momentos: **7 días antes**, **3 días antes**, **1 día antes** o **El mismo día**.
4. Establece la **Hora del día** y, opcionalmente, un **Mensaje**.
5. Bajo **Enviar por**, elige **Push**, **Correo electrónico** y, si tu iglesia tiene un [proveedor de mensajes de texto](../settings/church-settings.md#texting) conectado, **Texto**.
6. Haz clic en **Guardar Recordatorios**.

Si la tarea no tiene fecha de vencimiento, B1 te avisa de que no se enviarán recordatorios hasta que establezcas una. Los recordatorios de texto solo llegan a las personas que activaron **Mensajes de texto** en sus [Preferencias de Notificación](../../b1-church/getting-started/notification-preferences.md), y cada texto puede costarle a tu iglesia.

## Ciclo de Vida de la Tarea

1. Una nueva tarea comienza con un estado de **Abierto**.
2. El asignado recibe una notificación y puede ver la tarea desde su panel, **Servicio > Mi Trabajo** o la aplicación móvil.
3. Una vez que el trabajo está completo, el asignado (o un administrador) hace clic en **Cerrar tarea**.
4. Las tareas cerradas se eliminan de la vista predeterminada pero aún se pueden encontrar eligiendo **Cerradas** encima de la lista de tareas.

:::info
B1 Admin ya no crea tareas recurrentes en un horario. Para seguimiento repetido con personas, usa un [flujo de trabajo](./workflows.md) con un [desencadenador de horario](./workflows.md#schedule-triggers).
:::

:::tip
Cuando necesites mover muchas personas a través del mismo conjunto de etapas -- como seguimiento de nuevo visitante o un proceso de membresía -- usa [Flujos de Trabajo](./workflows.md). Los flujos de trabajo convierten tareas en tarjetas en un tablero de arrastrar y soltar con pasos, fechas de vencimiento y enrutamiento.
:::

:::info
Algunas tareas son creadas automáticamente por otras partes de B1 y se abren a una tarjeta de revisión especial en lugar de la vista estándar de nota/reasignar -- [solicitudes de unión a grupo](../groups/group-join-requests.md#approving-from-the-tasks-page), [solicitudes de cambio de perfil](../profile/approving-profile-changes.md) y [solicitudes de eliminación de cuenta](../profile/account-deletion.md) funcionan de esta manera.
:::

## Próximos Pasos

- Mueve personas a través de un proceso de múltiples pasos con [Flujos de Trabajo](./workflows.md)
- Usa [Flujos de Trabajo](./workflows.md) para mover personas a través de procesos repetibles automáticamente
- Usa tareas junto con [Planes de Servicio](./plans.md) para rastrear elementos de acción de preparación del servicio
