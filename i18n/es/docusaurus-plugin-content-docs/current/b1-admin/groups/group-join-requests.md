---
title: "Solicitudes para unirse a un grupo"
description: "Revisa, aprueba o rechaza solicitudes de unirse a un grupo en B1 Admin, localiza las pendientes como líder o administrador y añade un motivo al rechazar."
---

# Solicitudes para unirse a un grupo

<div class="article-intro">

Cuando un grupo está configurado con una política de ingreso basada en aprobación, las personas pueden enviar solicitudes para unirse. Los líderes de grupo y los administradores revisan estas solicitudes y las aprueban o las rechazan. Esto le da a su iglesia control sobre la membresía de los grupos y, al mismo tiempo, facilita que las personas expresen su interés en unirse.

</div>

## Video de capacitación

<YouTube id="1vj-suCiIsE" title="Solicitudes para unirse a grupos y calendarios de grupos en B1" next="Configuración de servicios y asistencia en B1" nextUrl="/docs/b1-admin/attendance/setup" />

<div class="prereqs">
<h4>Antes de comenzar</h4>

- Necesita permiso para administrar grupos, o ser líder del grupo específico. Consulte [Roles y permisos](../people/roles-permissions.md) para más detalles.
- El grupo debe tener su política de ingreso configurada en **Solicitud** (requiere aprobación). Consulte [Creación de grupos](./creating-groups.md) para saber cómo configurar las políticas de ingreso.

</div>

## Comprender las políticas de ingreso

Los grupos pueden tener tres políticas de ingreso distintas:

- **Abierto** -- Cualquiera puede unirse de inmediato sin aprobación
- **Solicitud** -- Las personas envían una solicitud de ingreso que requiere aprobación
- **Cerrado** -- Nadie puede solicitar unirse (los miembros deben agregarse manualmente)

Cuando un grupo usa la política **Solicitud**, todos los intentos de ingreso pasan por el flujo de aprobación descrito en esta página.

## Ver las solicitudes pendientes

### Para líderes de grupo

1. En B1 Admin, abra el [menú Jump](../introduction.md#getting-around-with-the-jump-menu) y elija **Personas > Grupos**.
2. Haga clic en el nombre del grupo.
3. La sección **Miembros** muestra cuántas solicitudes están pendientes. Haga clic en **Todos los miembros**; las solicitudes pendientes de este grupo aparecen en la parte superior de la lista de miembros.

### Para administradores

Los administradores con permisos de administración de grupos pueden ver las solicitudes pendientes de todos los grupos:

1. En el menú Jump, elija **Personas > Grupos**.
2. Haga clic en el botón de **solicitudes pendientes** en el encabezado de la página (por ejemplo, "3 solicitudes pendientes"). Solo aparece cuando hay solicitudes en espera.
3. Revise todas las solicitudes pendientes de toda la iglesia.

## Revisar una solicitud de ingreso

Cada solicitud de ingreso muestra:

- **Nombre y foto de la persona** -- La persona que solicita unirse
- **Mensaje opcional** -- Un mensaje personal que explica por qué quiere unirse (si lo proporcionó)
- **Fecha de la solicitud** -- Cuándo se envió la solicitud

Para revisar una solicitud:

1. Lea el mensaje de la persona, si lo proporcionó.
2. Haga clic en el nombre de la persona para ver su perfil, si es necesario.
3. Decida si aprobar o rechazar.

## Aprobar una solicitud

1. Haga clic en **Aprobar** en la solicitud de ingreso.
2. La persona se agrega de inmediato al grupo como miembro.
3. La persona que solicitó recibe una notificación de que su solicitud fue aprobada.
4. La solicitud queda marcada como aprobada en el sistema.

:::tip
Cuando aprueba una solicitud, la persona se convierte en miembro regular del grupo. Más adelante, si es necesario, puede promoverla a líder del grupo desde la página de [Miembros del grupo](./group-members.md).
:::

## Rechazar una solicitud

1. Haga clic en **Rechazar** en la solicitud de ingreso.
2. Opcionalmente, indique un motivo para el rechazo (hasta 500 caracteres).
3. Haga clic en **Confirmar**.
4. La persona que solicitó recibe una notificación con el motivo del rechazo (si lo indicó).
5. La solicitud queda marcada como rechazada.

:::info
Indicar un motivo de rechazo ayuda a la persona a entender por qué no se aprobó su solicitud, y puede animarla a intentarlo de nuevo más adelante o a explorar otros grupos.
:::

## Aprobar desde la página de Tareas {#approving-from-the-tasks-page}

Cada solicitud de ingreso también crea una tarea en **Servicio &rarr; Mi trabajo**, titulada "*Persona* solicitó unirse a *Grupo*". Se asigna a los líderes del grupo. Si el grupo aún no tiene líder, se asigna a cualquier miembro del personal con el permiso **Miembros del grupo &gt; Editar**, o a los administradores de dominio de su iglesia si nadie tiene ese permiso. El personal y los administradores que reciben la tarea de esta forma también reciben una notificación que enlaza directamente a ella.

Al abrir la tarea se muestran el nombre de quien solicita, el grupo y su mensaje opcional, con los botones **Aprobar** y **Rechazar** directamente en la tarjeta de la tarea (Rechazar abre el mismo campo opcional de motivo descrito arriba). Esto da a los líderes una segunda forma, impulsada por notificaciones, de atender una solicitud sin tener que abrir la lista de miembros del grupo.

Resolver una solicitud desde cualquiera de los dos lugares -- la lista de miembros del grupo o la tarjeta de Tareas -- la cierra en todas partes, así que los líderes nunca ven una tarea obsoleta de una solicitud que alguien ya atendió.

## Notificaciones

El sistema de solicitudes de ingreso envía notificaciones automáticamente:

- **Cuando se envía una solicitud** -- Todos los líderes del grupo reciben una notificación. Si el grupo no tiene líder, se notifica al personal o a los administradores asignados a la tarea (consulte arriba).
- **Cuando se aprueba una solicitud** -- La persona que solicitó recibe una confirmación.
- **Cuando se rechaza una solicitud** -- La persona que solicitó recibe una notificación con el motivo del rechazo, si lo hubo.

Las notificaciones aparecen en el centro de notificaciones del usuario en B1.church y en la aplicación móvil. En la campana de notificaciones de B1 Admin, al hacer clic en una notificación de solicitud de ingreso (o en su **Ver detalles**) se abre el grupo en el sitio B1.church de su iglesia, en una pestaña nueva.

## Administrar solicitudes desde el lado del miembro

Las personas pueden administrar sus propias solicitudes de ingreso desde B1.church:

- Ver el estado de sus solicitudes pendientes en la página de detalle del grupo
- Cancelar una solicitud pendiente si cambian de opinión
- Ver si su solicitud fue aprobada o rechazada

## Buenas prácticas

- **Responda con prontitud** -- Intente revisar las solicitudes en un plazo de 24 a 48 horas para que las personas no esperen demasiado
- **Sea claro en los motivos de rechazo** -- Ayude a las personas a entender los siguientes pasos u otras opciones
- **Revise los perfiles** -- Consulte el perfil de la persona para ver si encaja bien con el grupo
- **Comunique las expectativas** -- Asegúrese de que la descripción del grupo indique claramente para quién es

## Artículos relacionados

- [Creación de grupos](./creating-groups.md) -- Aprenda a configurar grupos y políticas de ingreso
- [Miembros del grupo](./group-members.md) -- Administre a los miembros existentes del grupo
- [Calendario del grupo](./group-calendar.md) -- Programe reuniones y eventos del grupo
