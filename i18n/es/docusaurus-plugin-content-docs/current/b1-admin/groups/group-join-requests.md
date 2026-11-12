---
title: "Solicitudes para unirse a grupos"
description: "Revise, apruebe o rechace las solicitudes para unirse a grupos en B1 Admin, encuentre las solicitudes pendientes como líder o administrador, y añada un motivo al rechazar."
---

# Solicitudes para unirse a grupos

<div class="article-intro">

Cuando un grupo está configurado con una política de unión basada en aprobación, las personas pueden enviar solicitudes para unirse. Los líderes de grupo y los administradores revisan estas solicitudes y las aprueban o rechazan. Esto da a su iglesia el control sobre la membresía de los grupos y facilita que las personas expresen su interés en unirse.

</div>

## Video de capacitación {#training-video}

<YouTube id="1vj-suCiIsE" title="Solicitudes para unirse a grupos y calendarios de grupo en B1" next="Configuración de servicios y asistencia en B1" nextUrl="/docs/b1-admin/attendance/setup" />

<div class="prereqs">
<h4>Antes de comenzar</h4>

- Necesita permiso para administrar grupos, o ser líder del grupo específico. Consulte [Roles y permisos](../people/roles-permissions.md) para más detalles.
- El grupo debe tener su política de unión configurada en **Solicitud** (requiere aprobación). Consulte [Crear grupos](./creating-groups.md) para saber cómo configurar las políticas de unión.

</div>

## Entender las políticas de unión {#understanding-join-policies}

Los grupos pueden tener tres políticas de unión distintas:

- **Abierto**: cualquiera puede unirse de inmediato, sin aprobación
- **Solicitud**: las personas envían una solicitud para unirse que requiere aprobación
- **Cerrado**: nadie puede solicitar unirse (los miembros deben añadirse manualmente)

Cuando un grupo usa la política **Solicitud**, todos los intentos de unión pasan por el flujo de aprobación descrito en esta página.

## Ver las solicitudes pendientes {#viewing-pending-requests}

### Para líderes de grupo {#for-group-leaders}

1. En B1 Admin, abra el [menú Jump](../introduction.md#getting-around-with-the-jump-menu) y elija **Personas > Grupos**
2. Haga clic en el nombre del grupo
3. La sección **Miembros** muestra cuántas solicitudes están pendientes (por ejemplo, "1 pendiente"). Haga clic en **Todos los miembros**: las solicitudes pendientes de este grupo aparecen bajo **Solicitudes pendientes** en la parte superior de la lista de miembros

### Para administradores {#for-administrators}

Los administradores con permisos de gestión de grupos pueden ver las solicitudes pendientes de todos los grupos:

1. En el menú Jump, elija **Personas > Grupos**
2. Haga clic en el botón **solicitudes pendientes** del encabezado de la página (por ejemplo, "3 solicitudes pendientes"). Solo aparece cuando hay solicitudes en espera.
3. La página **Solicitudes de unión pendientes** enumera todas las solicitudes pendientes de toda la iglesia, con el grupo al que cada persona quiere unirse junto a su nombre. Haga clic en **Grupos** en la parte superior de la página para regresar. Cuando no hay nada en espera, la página muestra **No hay solicitudes pendientes.**

## Revisar una solicitud de unión {#reviewing-a-join-request}

Cada solicitud de unión muestra:

- **Nombre y foto de la persona**: quien solicita unirse (y, en la página de toda la iglesia, el grupo)
- **Mensaje opcional**: un mensaje personal que explica por qué quiere unirse (si lo incluyó)
- **Fecha de la solicitud**: cuándo se envió

Para revisar una solicitud:

1. Lea el mensaje de la persona si lo incluyó
2. Haga clic en el nombre de la persona para abrir su perfil si lo necesita
3. Decida si aprueba o rechaza

## Aprobar una solicitud {#approving-a-request}

1. Haga clic en **Aprobar** en la solicitud de unión
2. La persona se añade de inmediato al grupo como miembro y la solicitud desaparece de la lista
3. La persona que solicitó recibe una notificación de que su solicitud fue aprobada
4. La solicitud queda marcada como aprobada en el sistema

:::tip
Cuando aprueba una solicitud, la persona se convierte en miembro regular del grupo. Más adelante, si es necesario, puede promoverla a líder de grupo desde la página de [Miembros del grupo](./group-members.md).
:::

## Rechazar una solicitud {#declining-a-request}

1. Haga clic en **Rechazar** en la solicitud de unión
2. En el cuadro de diálogo **Rechazar solicitud**, opcionalmente introduzca un **Motivo (opcional)** (hasta 500 caracteres)
3. Haga clic en **Rechazar**
4. La persona que solicitó recibe una notificación con su motivo de rechazo (si lo incluyó)
5. La solicitud queda marcada como rechazada

:::info
Indicar un motivo de rechazo ayuda a la persona a entender por qué no se aprobó su solicitud, y puede animarla a intentarlo más adelante o a explorar otros grupos.
:::

## Aprobar desde la página de Tareas {#approving-from-the-tasks-page}

Cada solicitud de unión también crea una tarea en **Servicio &rarr; Mi trabajo**, titulada "*Persona* solicitó unirse a *Grupo*". Se asigna a los líderes del grupo. Si el grupo todavía no tiene líder, se asigna a cualquier miembro del personal con el permiso **Miembros del grupo &gt; Editar**, o a los administradores de dominio de su iglesia si nadie tiene ese permiso. El personal y los administradores que reciben la tarea de esta forma también reciben una notificación que enlaza directamente a ella.

Al abrir la tarea se muestran el nombre del solicitante, el grupo y su mensaje opcional, con los botones **Aprobar** y **Rechazar** directamente en la tarjeta de la tarea (Rechazar abre el mismo campo de motivo opcional descrito arriba). Esto da a los líderes una segunda forma, impulsada por notificaciones, de actuar sobre una solicitud sin abrir la lista de miembros del grupo.

Decidir una solicitud desde cualquiera de los dos lugares (la lista de miembros del grupo o la tarjeta de Tareas) la cierra en todas partes, así que los líderes nunca ven una tarea obsoleta de una solicitud que alguien ya atendió.

## Notificaciones {#notifications}

El sistema de solicitudes de unión envía notificaciones automáticamente:

- **Cuando se envía una solicitud**: todos los líderes del grupo reciben una notificación. Si el grupo no tiene líderes, en su lugar se notifica al personal o a los administradores asignados a la tarea (consulte más arriba).
- **Cuando se aprueba una solicitud**: la persona que solicitó recibe una confirmación
- **Cuando se rechaza una solicitud**: la persona que solicitó recibe una notificación con el motivo del rechazo, si lo hay

Las notificaciones aparecen en el centro de notificaciones del usuario en B1.church y en la app móvil. En la campana de notificaciones de B1 Admin, al hacer clic en una notificación de solicitud de unión (o en su **Ver detalles**) se abre el grupo en el sitio de B1.church de su iglesia, en una pestaña nueva.

## Administrar solicitudes desde el lado del miembro {#managing-requests-from-the-member-side}

Las personas pueden administrar sus propias solicitudes de unión desde B1.church:

- Ver el estado de sus solicitudes pendientes en la página de detalle del grupo
- Cancelar una solicitud pendiente si cambian de opinión
- Ver si su solicitud fue aprobada o rechazada

## Buenas prácticas {#best-practices}

- **Responda con prontitud**: intente revisar las solicitudes en un plazo de 24 a 48 horas para que las personas no esperen demasiado
- **Sea claro en los motivos de rechazo**: ayude a las personas a entender los siguientes pasos o las opciones alternativas
- **Revise los perfiles**: consulte el perfil de la persona para ver si encaja bien con el grupo
- **Comunique las expectativas**: asegúrese de que la descripción de su grupo indique claramente para quién es el grupo

## Artículos relacionados {#related-articles}

- [Crear grupos](./creating-groups.md): aprenda a configurar grupos y políticas de unión
- [Miembros del grupo](./group-members.md): administre los miembros existentes del grupo
- [Calendario del grupo](./group-calendar.md): programe reuniones y eventos del grupo
