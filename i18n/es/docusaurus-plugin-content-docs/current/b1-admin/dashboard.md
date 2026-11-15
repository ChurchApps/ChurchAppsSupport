---
title: "Panel"
description: "Vea lo que muestra el Panel de B1 Admin: el orden del servicio de esta semana, quién está sirviendo y registrado, los elementos que requieren atención, y sus tareas y grupos."
---

# Panel

<div class="article-intro">

El Panel es la página de inicio de B1 Admin. Se abre al iniciar sesión y está organizado alrededor del servicio semanal de su iglesia: el orden del servicio del próximo plan, quién está sirviendo, quién está en la sala el domingo, lo que espera su atención, y sus propias tareas y grupos.

</div>

<div class="prereqs">
<h4>Antes de comenzar</h4>

- Inicie sesión en [B1 Admin](https://admin.b1.church). Todo usuario que inicie sesión tiene un Panel, pero lo que muestra depende de su [rol y permisos](./settings/roles-permissions.md).
- Las secciones del servicio se completan una vez que usa [Planes](./serving/plans.md) y [Asistencia](./attendance/index.md) o [Registro de entrada](./attendance/check-in.md).

</div>

## Abrir el Panel {#opening-the-dashboard}

- Inicie sesión: B1 Admin comienza en el Panel.
- Haga clic en el pequeño logotipo de la iglesia en la parte superior izquierda de cualquier página.
- Abra el [menú Jump](./introduction.md#getting-around-with-the-jump-menu) (haga clic en la barra de búsqueda o presione **Ctrl+K** / **Cmd+K**) y elija **Panel**.

## El servicio de esta semana {#this-weeks-service}

La tarjeta grande en la parte superior muestra un plan de servicio: el próximo plan entre el último domingo y este próximo domingo, o el plan del último domingo si no hay ninguno próximo. Si varios planes caen el mismo día, un plan que usa un orden del servicio aparece primero, luego el que tenga la hora de servicio más temprana.

- **Línea de fecha**: el día, la fecha y la primera hora de servicio del plan (por ejemplo, *domingo · 15 de noviembre · 9:00 AM*).
- **Título**: el nombre del plan. Si puede abrir el plan (puede editar planes, pertenece al ministerio del plan o está sirviendo en él), el título enlaza al [plan](./serving/plans.md).
- **Orden del servicio**: cada elemento del [orden del servicio](./serving/service-order.md) del plan con la hora en que comienza, calculada a partir de la primera hora de servicio y la duración de cada elemento. Mientras el servicio está en curso, el elemento actual aparece resaltado.

Si no hay ningún plan esta semana, la tarjeta dice **No hay servicio planeado esta semana.**, y si el plan no tiene un orden del servicio dice **No hay orden del servicio en este plan.** Las personas que pueden editar planes ven un enlace a **Planes** junto a cualquiera de estos mensajes.

### Quién está sirviendo y quién está en la sala {#who-is-serving-and-who-is-in-the-room}

Junto al orden del servicio, el Panel añade lo que sucede alrededor del servicio una vez que hay datos para ello:

| Sección | Qué muestra |
|---|---|
| **en la sala** | Cuántas personas se han registrado o marcado como presentes. El domingo es el conteo de hoy, con un indicador **En vivo**; durante la semana muestra el conteo del **último domingo**. Si nadie fue registrado por nombre, usa los [conteos totales](./attendance/headcount-entry.md) de ese día. |
| **Sirviendo el domingo** / **Sirviendo en esta hora** | Todas las personas programadas en el plan con su posición, enlazadas a su registro de persona. Las asignaciones rechazadas no aparecen. |
| **Primera vez** / **Primera vez el último domingo** | Invitados que vienen por primera vez (personas con estado de membresía *Visitante* o *Invitado*, o registradas como invitados), agrupados por hogar. |
| **Salas** | Registros por clase o sala de esa semana, con una barra de capacidad cuando el grupo tiene una **Capacidad** configurada. |

Antes de que existan estos datos, la tarjeta muestra una breve sugerencia con enlaces a **Personas**, **Asistencia** y **Planes** (solo a los que puede abrir).

:::info
Los conteos y nombres provienen de sus datos de asistencia y de servicio, así que solo aparecen para las personas con permiso para verlos. Por ejemplo, los nombres de invitados y la lista de quienes sirven requieren permiso para ver personas, y los conteos de salas requieren permiso para ver la asistencia.
:::

## Requiere atención {#needs-attention}

Cuando algo espera su atención, una tarjeta **Requiere atención** lo enumera con un enlace:

- **aprobaciones de calendario pendientes**: eventos y reservas de salas o recursos que requieren aprobación. Abre [Aprobaciones](./calendars/approvals.md). Se muestra a las personas que pueden editar contenido.
- **solicitudes pendientes para unirse a un grupo**: personas que piden unirse a un grupo. Abre la lista de [solicitudes pendientes](./groups/group-join-requests.md). Se muestra a las personas que pueden editar miembros de grupos.

La tarjeta se oculta cuando no hay nada pendiente.

## Mis tareas y Mis grupos {#my-tasks-and-my-groups}

En la parte inferior de la página:

- **Mis tareas** enumera hasta cuatro [tareas](./serving/tasks.md) abiertas asignadas a usted; haga clic en una para abrirla. Haga clic en **Añadir tarea** para crear una tarea aquí mismo (elija a quién se refiere y a quién se asigna, luego introduzca un título, fecha límite y notas), o en **Todas las tareas** para abrir **Servicio > Mi trabajo**.
- **Mis grupos** enumera los grupos a los que pertenece; haga clic en uno para abrirlo. Si puede administrar grupos o ver personas, **Todos los grupos** abre la lista completa de [Grupos](./groups/index.md).

## Acciones rápidas {#quick-actions}

Los accesos directos de configuración que antes aparecían en el Panel (como **Añadir el logotipo de su iglesia**, **Configurar donaciones en línea** y **Crear su primer grupo**) ahora están en el menú Jump, bajo **Acciones rápidas**. Consulte [Acciones rápidas](./introduction.md#quick-actions).

## Artículos relacionados {#related-articles}

- [Introducción](./introduction.md): cómo iniciar sesión y orientarse con el menú Jump
- [Notificaciones y mensajes](./notifications.md): las alertas y los mensajes privados en su menú de usuario
- [Planes](./serving/plans.md) y [Orden del servicio](./serving/service-order.md): lo que alimenta la tarjeta de servicio
- [Registro de entrada](./attendance/check-in.md): cómo se cuentan las personas en la sala
