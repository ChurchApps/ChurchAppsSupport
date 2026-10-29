---
title: "Tareas"
---

# Tareas

<div class="article-intro">

Las tareas le permiten asignar acciones a personas o grupos de su iglesia. Ya sea un pendiente de una sola vez o una responsabilidad recurrente, las tareas le ayudan a dar seguimiento a lo que hay que hacer y a quién le corresponde, para que nada se pase por alto.

</div>

<div class="prereqs">
<h4>Antes de comenzar</h4>

- Asegúrese de que las personas o [grupos](../groups/creating-groups.md) a los que desea asignar tareas existan en B1 Admin
- En el [menú Jump](../introduction.md#getting-around-with-the-jump-menu), elija **Servir > Mi trabajo** para ver las tareas

</div>

## Ver tareas

En el menú Jump, elija **Servir > Mi trabajo** (o busque "Mi trabajo"). La lista de **Tareas** muestra el título de cada tarea, con quién está asociada, a quién está asignada, cuándo se abrió y su estado. Sus [tarjetas de flujo de trabajo](./workflows.md) aparecen junto a ella bajo **Mis tarjetas**.

Use las pestañas sobre la lista para cambiar entre las tareas **Asignadas a mí**, **Asignadas a mis grupos** y **Solicitadas por mí**. Cada pestaña muestra cuántas tareas contiene.

:::tip
De forma predeterminada, solo se muestran las tareas abiertas. Elija **Cerradas** sobre la lista para ver las tareas completadas.
:::

## Crear una tarea

1. En la página **Mi trabajo**, haga clic en **Agregar tarea**. Se abre un formulario de **Nueva tarea**.
2. Haga clic en el cuadro **Asociar con** y elija la persona a la que se refiere la tarea.
3. Haga clic en el cuadro **Asignar a**. En la ventana **Seleccione una persona o grupo**, busque en la pestaña **Persona**, o cambie a la pestaña **Grupo** y busque un grupo, luego seleccione el resultado.
4. Ingrese un **Título** para la tarea.
5. Opcionalmente, elija una **Fecha de vencimiento**.
6. Agregue **Notas** con cualquier detalle o instrucción para la persona asignada.
7. Haga clic en **Guardar**.

La tarea aparecerá ahora en la lista de tareas y será visible para la persona asignada en su panel de inicio y en la aplicación móvil.

## Administrar una tarea

Haga clic en cualquier tarea para abrir su página de detalle. Desde aquí puede:

- **Cerrar o reabrir la tarea** -- Haga clic en **Cerrar tarea** cuando el trabajo esté terminado, o en **Reabrir tarea** para volver a abrirla.
- **Reasignar la tarea** -- Haga clic en **Asignar** para elegir a otra persona o grupo.
- **Cambiar a quién se refiere** -- Haga clic en **Asociar** para elegir a otra persona.
- **Cambiar la fecha de vencimiento** -- Elija una fecha en el campo **Vencimiento**; se guarda cuando hace clic fuera del campo. (Las tareas creadas para una [confirmación de asignación de servicio](./workflows.md#serving-assignment-confirmations) muestran su fecha de vencimiento, pero no se pueden cambiar aquí.)
- **Agregar notas** -- Publique actualizaciones o detalles para la persona asignada en las notas de la tarea.
- **Configurar recordatorios** -- Consulte [Recordatorios de tareas](#task-reminders) más abajo.

## Recordatorios de tareas

Una tarea con fecha de vencimiento puede recordar a la persona asignada antes de que venza.

1. En la página de la tarea, haga clic en **Editar** junto a **Recordatorios**.
2. Active **Enviar recordatorios para esta tarea**.
3. En **¿Cuándo deben enviarse los recordatorios?**, elija hasta tres momentos: **7 días antes**, **3 días antes**, **1 día antes** o **El mismo día**.
4. Configure la **Hora del día** y, opcionalmente, un **Mensaje**.
5. En **Enviar por**, elija **Notificación push**, **Correo electrónico** y, si su iglesia tiene un [proveedor de mensajes de texto](../settings/church-settings.md#texting) conectado, **Mensaje de texto**.
6. Haga clic en **Guardar recordatorios**.

Si la tarea no tiene fecha de vencimiento, B1 le advierte que no se enviarán recordatorios hasta que se configure una en el campo **Vencimiento**. Los recordatorios por mensaje de texto solo llegan a las personas que activaron **Mensajes de texto** en sus [Preferencias de notificación](../../b1-church/getting-started/notification-preferences.md), y cada mensaje puede costarle a su iglesia.

## Ciclo de vida de una tarea

1. Una tarea nueva comienza con el estado **Abierta**.
2. La persona asignada recibe una notificación y puede ver la tarea desde su panel de inicio, en **Servir > Mi trabajo** o en la aplicación móvil.
3. Cuando el trabajo está terminado, la persona asignada (o un administrador) hace clic en **Cerrar tarea**.
4. Las tareas cerradas se ocultan de la vista predeterminada, pero aún pueden encontrarse eligiendo **Cerradas** sobre la lista de tareas.

:::info
B1 Admin ya no crea tareas recurrentes según un calendario. Para el seguimiento repetido de personas, use un [flujo de trabajo](./workflows.md) con un [disparador programado](./workflows.md#schedule-triggers).
:::

:::tip
Cuando necesite que muchas personas pasen por las mismas etapas, como el seguimiento de nuevos visitantes o un proceso de membresía, use [Flujos de trabajo](./workflows.md). Los flujos de trabajo convierten las tareas en tarjetas de un tablero de arrastrar y soltar, con pasos, fechas de vencimiento y enrutamiento.
:::

:::info
Algunas tareas las crean automáticamente otras partes de B1 y, en lugar de la vista estándar de notas y reasignación, abren una tarjeta especial de revisión: las [solicitudes para unirse a un grupo](../groups/group-join-requests.md#approving-from-the-tasks-page), las [solicitudes de cambio de perfil](../profile/approving-profile-changes.md) y las [solicitudes de eliminación de cuenta](../profile/account-deletion.md) funcionan de esta manera.
:::

## Próximos pasos

- Guíe a las personas por un proceso de varios pasos con [Flujos de trabajo](./workflows.md)
- Use [Flujos de trabajo](./workflows.md) para llevar a las personas por procesos repetibles de forma automática
- Use las tareas junto con los [Planes de servicio](./plans.md) para dar seguimiento a las acciones de preparación del servicio
