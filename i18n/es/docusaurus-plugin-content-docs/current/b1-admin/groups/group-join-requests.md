---
title: "Solicitudes de ingreso a grupos"
---

# Solicitudes de ingreso a grupos

<div class="article-intro">

Cuando un grupo está configurado con una política de ingreso basada en aprobación, las personas pueden enviar solicitudes para unirse. Los líderes de grupo y los administradores revisan estas solicitudes y las aprueban o rechazan. Esto le da a su iglesia control sobre la membresía de los grupos y, al mismo tiempo, facilita que las personas expresen su interés en unirse.

</div>

## Video de capacitación

<YouTube id="1vj-suCiIsE" title="Group Join Requests and Group Calendars in B1" next="Setting Up Services and Attendance in B1" nextUrl="/docs/b1-admin/attendance/setup" />

<div class="prereqs">
<h4>Antes de comenzar</h4>

- Necesita permiso para administrar grupos, o debe ser líder del grupo específico. Consulte [Roles y permisos](../people/roles-permissions.md) para más detalles.
- El grupo debe tener su política de ingreso configurada en **Solicitud** (se requiere aprobación). Consulte [Crear grupos](./creating-groups.md) para saber cómo configurar las políticas de ingreso.

</div>

## Entender las políticas de ingreso

Los grupos pueden tener tres políticas de ingreso diferentes:

- **Abierta**: cualquiera puede unirse de inmediato, sin aprobación
- **Solicitud**: las personas envían una solicitud de ingreso que requiere aprobación
- **Cerrada**: nadie puede solicitar unirse (los miembros deben agregarse manualmente)

Cuando un grupo usa la política **Solicitud**, todos los intentos de unirse pasan por el flujo de aprobación descrito en esta página.

## Ver solicitudes pendientes

### Para líderes de grupo

1. En B1 Admin, abra el [menú de salto](../introduction.md#getting-around-with-the-jump-menu) y elija **Personas > Grupos**.
2. Haga clic en el nombre del grupo.
3. La sección **Miembros** muestra cuántas solicitudes están pendientes. Haga clic en **Todos los miembros**: las solicitudes pendientes de este grupo aparecen en la parte superior de la lista de miembros.

### Para administradores

Los administradores con permisos de administración de grupos pueden ver las solicitudes pendientes de todos los grupos:

1. En el menú de salto, elija **Personas > Grupos**.
2. Haga clic en el botón **solicitudes pendientes** en el encabezado de la página (por ejemplo, "3 solicitudes pendientes"). Solo aparece cuando hay solicitudes en espera.
3. Revise todas las solicitudes pendientes de toda la iglesia.

## Revisar una solicitud de ingreso

Cada solicitud de ingreso muestra:

- **Nombre y foto de la persona**: la persona que solicita unirse
- **Mensaje opcional**: un mensaje personal que explica por qué quiere unirse (si se proporcionó)
- **Fecha de la solicitud**: cuándo se envió la solicitud

Para revisar una solicitud:

1. Lea el mensaje de la persona si lo proporcionó.
2. Haga clic en el nombre de la persona para ver su perfil, si lo necesita.
3. Decida si aprueba o rechaza.

## Aprobar una solicitud

1. Haga clic en **Aprobar** en la solicitud de ingreso.
2. La persona se agrega de inmediato al grupo como miembro.
3. La persona solicitante recibe una notificación de que su solicitud fue aprobada.
4. La solicitud queda marcada como aprobada en el sistema.

:::tip
Cuando aprueba una solicitud, la persona se convierte en miembro regular del grupo. Más adelante puede promoverla a líder de grupo desde la página de [Miembros del grupo](./group-members.md).
:::

## Rechazar una solicitud

1. Haga clic en **Rechazar** en la solicitud de ingreso.
2. Opcionalmente, indique un motivo para el rechazo (hasta 500 caracteres).
3. Haga clic en **Confirmar**.
4. La persona solicitante recibe una notificación con el motivo del rechazo (si se indicó).
5. La solicitud queda marcada como rechazada.

:::info
Indicar un motivo de rechazo ayuda a la persona a entender por qué no se aprobó su solicitud y puede animarla a intentarlo más adelante o a explorar otros grupos.
:::

## Aprobar desde la página de Tareas

Cada solicitud de ingreso también crea una tarea en **Voluntariado &rarr; Mi trabajo**, con el título "*Persona* solicitó unirse a *Grupo*". Se asigna a los líderes del grupo. Si el grupo aún no tiene líder, se asigna a cualquier miembro del personal con el permiso **Miembros del grupo &gt; Editar**, o a los administradores de dominio de su iglesia si nadie tiene ese permiso. El personal y los administradores que reciben la tarea de esta forma también reciben una notificación que enlaza directamente a ella.

Al abrir la tarea se muestran el nombre del solicitante, el grupo y su mensaje opcional, con los botones **Aprobar** y **Rechazar** directamente en la tarjeta de la tarea (Rechazar abre el mismo campo opcional de motivo descrito arriba). Esto da a los líderes una segunda forma, impulsada por notificaciones, de atender una solicitud sin abrir la lista de miembros del grupo.

Decidir una solicitud desde cualquiera de los dos lugares (la lista de miembros del grupo o la tarjeta de Tareas) la cierra en todas partes, de modo que los líderes nunca vean una tarea obsoleta de una solicitud que alguien ya atendió.

## Notificaciones

El sistema de solicitudes de ingreso envía notificaciones automáticamente:

- **Cuando se envía una solicitud**: todos los líderes del grupo reciben una notificación. Si el grupo no tiene líder, se notifica en su lugar al personal o a los administradores asignados a la tarea (consulte arriba).
- **Cuando se aprueba una solicitud**: la persona solicitante recibe una confirmación.
- **Cuando se rechaza una solicitud**: la persona solicitante recibe una notificación con el motivo del rechazo, si lo hay.

Las notificaciones aparecen en el centro de notificaciones del usuario en B1.church y en la aplicación móvil. En la campana de notificaciones de B1 Admin, al hacer clic en una notificación de solicitud de ingreso (o en **Ver detalles**) se abre el grupo en el sitio B1.church de su iglesia, en una nueva pestaña.

## Gestionar solicitudes desde el lado del miembro

Las personas pueden administrar sus propias solicitudes de ingreso desde B1.church:

- Ver el estado de sus solicitudes pendientes en la página de detalle del grupo
- Cancelar una solicitud pendiente si cambian de opinión
- Ver si su solicitud fue aprobada o rechazada

## Buenas prácticas

- **Responda pronto**: intente revisar las solicitudes en un plazo de 24 a 48 horas para que las personas no esperen demasiado
- **Sea claro en los motivos de rechazo**: ayude a las personas a entender los siguientes pasos o las opciones alternativas
- **Revise los perfiles**: revise el perfil de la persona para ver si encaja bien con el grupo
- **Comunique las expectativas**: asegúrese de que la descripción de su grupo indique claramente para quién es el grupo

## Artículos relacionados

- [Crear grupos](./creating-groups.md): aprenda a crear grupos y configurar las políticas de ingreso
- [Miembros del grupo](./group-members.md): administre a los miembros existentes del grupo
- [Calendario del grupo](./group-calendar.md): programe reuniones y eventos del grupo
