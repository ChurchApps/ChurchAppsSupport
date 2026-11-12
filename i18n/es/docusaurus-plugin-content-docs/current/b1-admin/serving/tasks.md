---
title: "Tareas"
description: "Cree, asigne y cierre tareas en B1 Admin, encuéntrelas en Servicio > Mi trabajo y configure recordatorios de fecha límite para que los pendientes de seguimiento nunca se pasen por alto."
---

# Tareas

<div class="article-intro">

Las tareas le permiten asignar acciones a personas o grupos de su iglesia. Ya sea un pendiente único o una responsabilidad recurrente, las tareas le ayudan a dar seguimiento a lo que hay que hacer y a quién le corresponde, para que nada quede olvidado.

</div>

<div class="prereqs">
<h4>Antes de empezar</h4>

- Asegúrese de que las personas o [grupos](../groups/creating-groups.md) a los que quiere asignar tareas existan en B1 Admin
- En el [menú Salto](../introduction.md#getting-around-with-the-jump-menu), elija **Servicio > Mi trabajo** para ver las tareas

</div>

## Ver tareas {#viewing-tasks}

En el menú Salto, elija **Servicio > Mi trabajo** (o busque "Mi trabajo"). La lista **Tareas** muestra el título de cada tarea, con quién está asociada, a quién está asignada, cuándo se abrió y su estado. Sus tarjetas de [flujo de trabajo](./workflows.md) aparecen junto a ella, en **Mis tarjetas**. Los responsables también pueden ver y trabajar sus tarjetas y tareas abiertas desde la pantalla **Yo** en la aplicación B1.

Use las pestañas encima de la lista para cambiar entre las tareas **Asignadas a mí**, **Asignadas a mis grupos** y **Solicitadas por mí**. Cada pestaña muestra cuántas tareas contiene. Las tareas y **Mis tarjetas** aparecen de la más reciente a la más antigua, así que lo que acaba de llegar está arriba.

:::tip
De forma predeterminada, solo se muestran las tareas abiertas. Elija **Cerradas** encima de la lista para ver las tareas completadas.
:::

## Crear una tarea {#creating-a-task}

1. En la página **Mi trabajo**, haga clic en **Agregar tarea**. Se abre un formulario **Nueva tarea**.
2. Opcionalmente, haga clic en el cuadro **Asociar con** y elija la persona o el grupo al que se refiere la tarea. Déjelo en blanco para un pendiente general que no se refiere a nadie, como un recordatorio para usted mismo.
3. Haga clic en el cuadro **Asignar a**. En la ventana **Seleccione una persona o grupo**, busque en la pestaña **Persona**, o cambie a la pestaña **Grupo** y busque un grupo, y luego seleccione el resultado.
4. Escriba un **Título** para la tarea.
5. Opcionalmente, elija una **Fecha límite**.
6. Agregue **Notas** con cualquier detalle o instrucción para la persona asignada.
7. Haga clic en **Guardar**.

La tarea aparecerá ahora en la lista de tareas y será visible para la persona asignada en su panel y en la aplicación móvil.

## Administrar una tarea {#managing-a-task}

Haga clic en cualquier tarea para abrir su página de detalle. Desde aquí puede:

- **Cerrar o reabrir la tarea** -- Haga clic en **Cerrar tarea** cuando el trabajo esté terminado, o en **Reabrir tarea** para volver a abrirla.
- **Reasignar la tarea** -- Haga clic en **Asignar** para elegir otra persona o grupo.
- **Cambiar a quién se refiere** -- Haga clic en **Asociar** para elegir otra persona o grupo, o elija **Ninguna persona ni grupo** para quitarla.
- **Cambiar la fecha límite** -- Elija una fecha en el campo **Vence**; se guarda al hacer clic fuera. (Las tareas creadas para una [confirmación de asignación de servicio](./workflows.md#serving-assignment-confirmations) muestran su fecha límite, pero no pueden cambiarse aquí).
- **Agregar notas** -- Publique actualizaciones o detalles para la persona asignada en las notas de la tarea.
- **Configurar recordatorios** -- Consulte [Recordatorios de tareas](#task-reminders) más abajo.

## Recordatorios de tareas {#task-reminders}

Una tarea con fecha límite puede recordar a su responsable antes de que venza.

1. En la página de la tarea, haga clic en **Editar** junto a **Recordatorios**.
2. Active **Enviar recordatorios para esta tarea**.
3. En **¿Cuándo deben enviarse los recordatorios?**, elija hasta tres momentos: **7 días antes**, **3 días antes**, **1 día antes** o **El mismo día**.
4. Establezca la **Hora del día** y, opcionalmente, un **Mensaje**.
5. En **Enviar por**, elija **Notificación push**, **Correo electrónico** y, si su iglesia tiene un [proveedor de mensajes de texto](../settings/church-settings.md#texting) conectado, **Mensaje de texto**.
6. Haga clic en **Guardar recordatorios**.

Si la tarea no tiene fecha límite, B1 le advierte que no se enviará ningún recordatorio hasta que se establezca una en el campo **Vence**. Los recordatorios por mensaje de texto solo llegan a las personas que activaron **Mensajes de texto** en sus [Preferencias de notificación](../../b1-church/getting-started/notification-preferences.md), y cada mensaje puede tener un costo para la iglesia.

## Ciclo de vida de una tarea {#task-lifecycle}

1. Una tarea nueva comienza con el estado **Abierta**.
2. La persona asignada recibe una notificación y puede ver la tarea desde su panel, en **Servicio > Mi trabajo** o en la aplicación móvil.
3. Cuando el trabajo está terminado, la persona asignada (o un administrador) hace clic en **Cerrar tarea**.
4. Las tareas cerradas se quitan de la vista predeterminada, pero siguen disponibles al elegir **Cerradas** encima de la lista de tareas.

:::info
B1 Admin ya no crea tareas recurrentes según un calendario. Para el seguimiento repetido de personas, use un [flujo de trabajo](./workflows.md) con un [disparador de horario](./workflows.md#schedule-triggers).
:::

:::tip
Cuando necesite hacer pasar a muchas personas por las mismas etapas, como el seguimiento de nuevos visitantes o un proceso de membresía, use [Flujos de trabajo](./workflows.md). Los flujos de trabajo convierten las tareas en tarjetas de un tablero de arrastrar y soltar, con pasos, fechas límite y enrutamiento.
:::

:::info
Algunas tareas las crean automáticamente otras partes de B1 y se abren con una tarjeta especial de revisión en lugar de la vista estándar de notas y reasignación: [solicitudes de unirse a un grupo](../groups/group-join-requests.md#approving-from-the-tasks-page), [solicitudes de cambio de perfil](../profile/approving-profile-changes.md) y [solicitudes de eliminación de cuenta](../profile/account-deletion.md) funcionan de esta manera.
:::

## Próximos pasos {#next-steps}

- Haga pasar a las personas por un proceso de varios pasos con [Flujos de trabajo](./workflows.md)
- Use [Flujos de trabajo](./workflows.md) para llevar a las personas por procesos repetibles de forma automática
- Use las tareas junto con los [Planes de servicio](./plans.md) para dar seguimiento a los pendientes de preparación del servicio
