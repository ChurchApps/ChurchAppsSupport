---
title: "Endpoints de Doing"
---

# Endpoints de Doing

<div class="article-intro">

El módulo de Doing gestiona la planificación de servicios, la programación de voluntarios, la gestión de tareas y las automatizaciones. Ofrece herramientas para crear planes de servicio con horarios y posiciones, asignar voluntarios, gestionar fechas de bloqueo, construir los elementos del orden del servicio, conectarse a proveedores de contenido externos y configurar flujos de trabajo automatizados con condiciones y acciones.

</div>

**Ruta base:** `/doing`

## Planes

Ruta base: `/doing/plans`

| Método | Ruta | Autenticación | Permiso | Descripción |
|--------|------|---------------|---------|-------------|
| GET | `/` | JWT | — | Listar todos los planes de la iglesia |
| GET | `/:id` | JWT | — | Obtener un plan por ID |
| GET | `/ids?ids=` | JWT | — | Obtener varios planes por IDs separados por comas |
| GET | `/types/:planTypeId` | JWT | — | Obtener los planes por tipo de plan |
| GET | `/textRange?startDate=&endDate=&ministryId=&planTypeId=` | JWT | `texting.send` + edición del ministerio | Vista previa del resumen de servicio que **Enviar mensaje a voluntarios** enviará: `{ totalMembers, eligibleCount, optedOutCount, noPhoneCount, capped }` para los voluntarios asignados en el rango (uno por persona; se omiten los que han cancelado la suscripción y los números que faltan; los números compartidos se deduplican; máximo 200) |
| GET | `/presenter` | JWT | — | Obtener los planes de los próximos 7 días (vista del presentador) |
| GET | `/confirmationWorkflows?ministryId=` | JWT | Edición del ministerio | Flujos de trabajo activos de confirmación de asignaciones de servicio (`workflowType = "assignmentConfirmation"`) que un plan puede seleccionar: `[{ id, name }]` |
| GET | `/public/current/:planTypeId` | Pública | — | Obtener el plan actual de un tipo de plan |
| GET | `/public/signup/:churchId` | Pública | — | Planes abiertos para inscripción propia, los más próximos primero, cada uno con sus posiciones de inscripción propia (ordenadas por `categoryName` y luego por `name`, más `filledCount` de las asignaciones Aceptadas/Sin confirmar) y sus horarios. No incluye nombres de voluntarios. Cuando la configuración de la iglesia `volunteerSignupNextOnly` es `"true"`, solo se devuelve el primer plan de cada tipo de plan. Cada `plan` incluye un `signupDeadline` calculado (instante ISO, o `null`): `signupDeadlineHours` antes del horario de tipo `service` más temprano del plan (cualquier horario con hora si no hay horario de servicio; las 9:00 en la zona horaria de la iglesia en `serviceDate` si el plan no tiene horarios) |
| GET | `/signup/:planId/volunteers` | JWT | — | `[{ positionId, names }]` para las posiciones de inscripción propia del plan (nombres visibles de los asignados Aceptados/Sin confirmar). Devuelve `[]` a menos que el `showVolunteerNames` del plan esté activado |
| POST | `/` | JWT | — | Crear o actualizar planes (acepta un objeto único o un array). Establece `confirmationWorkflowId` para incluir el plan en un flujo de confirmación de servicio, o `null` para excluirlo en solicitudes futuras. Envía `signupDeadlineHours: null` para eliminar una fecha límite; si se omite el campo, se mantiene el valor guardado |
| POST | `/copy/:id` | JWT | Edición del ministerio | Copiar un plan incluyendo posiciones, horarios, asignaciones y elementos del orden del servicio. El cuerpo incluye `ministryId`, `serviceDate`, `copyMode` ("none", "positions", "all") y `copyServiceOrder` (booleano). Sin `targetPlanId` se crea un nuevo plan, y `notes`, `signupDeadlineHours`, `showVolunteerNames` y `autoReplaceOnDecline` se heredan del plan de origen a menos que el cuerpo los indique. Con `targetPlanId`, la copia rellena ese plan existente (el solicitante debe poder editarlo). La opción **Repetir semanalmente** de B1Admin llama a este endpoint una vez por semana, copiando cada vez desde el plan creado la semana anterior |
| POST | `/textRange` | JWT | `texting.send` + edición del ministerio | Enviar un mensaje a cada voluntario asignado en un rango de fechas a través del proveedor de mensajes de texto de la iglesia. Cuerpo: `{ startDate, endDate, ministryId, planTypeId?, message }` (mensaje de hasta 1600 caracteres; los campos de combinación se resuelven para cada destinatario). Devuelve los recuentos de vista previa más `recipientCount`, `successCount`, `failCount` y `error` (`no_provider` o `insufficient_credits`) cuando el envío se detiene antes de tiempo |
| POST | `/:id/issueRequests` | JWT | Edición del plan | Emitir las asignaciones nuevas, sin confirmar y aún no notificadas del plan a través de su flujo de confirmación: marca cada una como notificada e inicia una tarjeta de flujo por asignación. Cuerpo vacío; devuelve `{ issued }`. Falla a menos que el plan esté publicado (no `prepared`), tenga un `confirmationWorkflowId` activo con al menos un paso, y su fecha límite de respuesta no haya pasado |
| POST | `/autofill/:id` | JWT | — | Rellenar automáticamente las asignaciones de voluntarios de un plan. Cuerpo: `{ teams: [{ positionId, personIds }] }` |
| DELETE | `/:id` | JWT | — | Eliminar un plan y todos sus horarios, asignaciones, posiciones y elementos relacionados |

### Ejemplo: Copiar un plan

```
POST /doing/plans/copy/abc-123
Authorization: Bearer <token>

{
  "serviceDate": "2026-03-01T10:00:00.000Z",
  "copyMode": "all",
  "copyServiceOrder": true
}
```

```json
{
  "id": "def-456",
  "churchId": "church-1",
  "serviceDate": "2026-03-01T10:00:00.000Z"
}
```

## Tipos de plan

Ruta base: `/doing/planTypes`

Extiende la clase base CRUD (GET `/`, GET `/:id`, POST `/`, DELETE `/:id`; sin comprobaciones de permisos).

| Método | Ruta | Autenticación | Permiso | Descripción |
|--------|------|---------------|---------|-------------|
| GET | `/` | JWT | — | Listar todos los tipos de plan |
| GET | `/:id` | JWT | — | Obtener un tipo de plan por ID |
| GET | `/ids?ids=` | JWT | — | Obtener varios tipos de plan por IDs separados por comas |
| GET | `/ministryId/:ministryId` | JWT | — | Obtener los tipos de plan de un ministerio |
| POST | `/` | JWT | — | Crear o actualizar tipos de plan |
| DELETE | `/:id` | JWT | — | Eliminar un tipo de plan |

## Elementos del plan

Ruta base: `/doing/planItems`

Gestiona los elementos del orden del servicio (encabezados, secciones, canciones, etc.) organizados en una estructura de árbol padre-hijo.

| Método | Ruta | Autenticación | Permiso | Descripción |
|--------|------|---------------|---------|-------------|
| GET | `/:id` | JWT | — | Obtener un elemento del plan por ID |
| GET | `/ids?ids=` | JWT | — | Obtener varios elementos del plan por IDs separados por comas |
| GET | `/plan/:planId` | JWT | — | Obtener todos los elementos del plan (devuelve una estructura de árbol) |
| GET | `/presenter/:churchId/:planId` | Pública | — | Obtener los elementos del plan para la vista del presentador (devuelve una estructura de árbol) |
| POST | `/` | JWT | — | Crear o actualizar elementos del plan |
| POST | `/sort` | JWT | — | Actualizar el orden de un elemento del plan (reordena los hermanos) |
| DELETE | `/:id` | JWT | — | Eliminar un elemento del plan |

## Feed del plan

Ruta base: `/doing/planFeed`

Proporciona feeds de elementos del plan para el presentador. Si no existen elementos del plan, los rellena automáticamente desde el feed de venue de Lessons.church usando el `contentId` del plan.

| Método | Ruta | Autenticación | Permiso | Descripción |
|--------|------|---------------|---------|-------------|
| GET | `/presenter/:churchId/:planId` | Pública | — | Obtener el feed del plan para el presentador (se rellena automáticamente desde el feed de venue si está vacío) |

## Posiciones

Ruta base: `/doing/positions`

Extiende la clase base CRUD (GET `/:id`, POST `/`, DELETE `/:id`; sin comprobaciones de permisos).

| Método | Ruta | Autenticación | Permiso | Descripción |
|--------|------|---------------|---------|-------------|
| GET | `/:id` | JWT | — | Obtener una posición por ID |
| GET | `/ids?ids=` | JWT | — | Obtener varias posiciones por IDs separados por comas |
| GET | `/plan/ids?planIds=` | JWT | — | Obtener las posiciones de varios planes por IDs de plan separados por comas |
| GET | `/plan/:planId` | JWT | — | Obtener todas las posiciones de un plan |
| POST | `/` | JWT | — | Crear o actualizar posiciones |
| DELETE | `/:id` | JWT | — | Eliminar una posición |

## Horarios

Ruta base: `/doing/times`

| Método | Ruta | Autenticación | Permiso | Descripción |
|--------|------|---------------|---------|-------------|
| GET | `/all` | JWT | — | Listar todos los horarios de la iglesia |
| GET | `/:id` | JWT | — | Obtener un horario por ID |
| GET | `/plans?planIds=` | JWT | — | Obtener los horarios de varios planes por IDs de plan separados por comas |
| GET | `/plan/:planId` | JWT | — | Obtener todos los horarios de un plan |
| POST | `/` | JWT | — | Crear o actualizar horarios |
| DELETE | `/:id` | JWT | — | Eliminar un horario |

## Asignaciones

Ruta base: `/doing/assignments`

| Método | Ruta | Autenticación | Permiso | Descripción |
|--------|------|---------------|---------|-------------|
| GET | `/my` | JWT | — | Obtener las asignaciones del usuario actual |
| GET | `/my/upcoming` | JWT | — | Hasta 20 asignaciones del usuario actual en planes con fecha desde ayer en adelante (se omiten los planes pendientes de confirmar o `prepared`), las más próximas primero: `{ assignmentId, status, positionName, planId, planName, serviceDate }`. Alimenta la vista previa de servicio en la página de inicio del miembro |
| GET | `/:id` | JWT | — | Obtener una asignación por ID |
| GET | `/plan/ids?planIds=` | JWT | — | Obtener las asignaciones de varios planes por IDs de plan separados por comas |
| GET | `/plan/:planId` | JWT | — | Obtener todas las asignaciones de un plan |
| POST | `/` | JWT | — | Crear o actualizar asignaciones (el estado predeterminado es "Unconfirmed") |
| POST | `/accept/:id` | JWT | — | Aceptar una asignación (debe ser la persona asignada) |
| POST | `/decline/:id` | JWT | — | Rechazar una asignación (debe ser la persona asignada) |
| POST | `/signup` | JWT | — | Inscribirse uno mismo en una posición. Cuerpo: `{ positionId }`. La posición debe permitir la inscripción propia y tener espacio; crea una asignación Accepted. Se rechaza con "Signup deadline has passed" una vez que ha pasado la fecha límite de inscripción del plan (contada hacia atrás desde su primer horario de servicio, como se describe arriba) |
| DELETE | `/signup/:id` | JWT | — | Quitar tu propia inscripción. Se rechaza con "Removal deadline has passed" después de la fecha límite de inscripción del plan |
| DELETE | `/:id` | JWT | — | Eliminar una asignación |

### Ejemplo: Aceptar una asignación

```
POST /doing/assignments/accept/assign-123
Authorization: Bearer <token>
```

```json
{
  "id": "assign-123",
  "personId": "person-456",
  "positionId": "pos-789",
  "planId": "plan-abc",
  "status": "Accepted"
}
```

## Fechas de bloqueo

Ruta base: `/doing/blockoutDates`

Extiende la clase base CRUD (GET `/:id`, DELETE `/:id`; sin comprobaciones de permisos).

| Método | Ruta | Autenticación | Permiso | Descripción |
|--------|------|---------------|---------|-------------|
| GET | `/:id` | JWT | — | Obtener una fecha de bloqueo por ID |
| GET | `/ids?ids=` | JWT | — | Obtener varias fechas de bloqueo por IDs separados por comas |
| GET | `/my` | JWT | — | Obtener las fechas de bloqueo del usuario actual |
| GET | `/upcoming` | JWT | — | Obtener todas las próximas fechas de bloqueo de la iglesia |
| POST | `/` | JWT | — | Crear o actualizar fechas de bloqueo (asigna por defecto personId al usuario actual si no se proporciona) |
| DELETE | `/:id` | JWT | — | Eliminar una fecha de bloqueo |

## Tareas

Ruta base: `/doing/tasks`

| Método | Ruta | Autenticación | Permiso | Descripción |
|--------|------|---------------|---------|-------------|
| GET | `/` | JWT | — | Obtener las tareas abiertas del usuario actual |
| GET | `/:id` | JWT | — | Obtener una tarea por ID |
| GET | `/:id/contact` | JWT | Puede ver la tarjeta | Información de contacto de la persona a la que se refiere una tarjeta de flujo: `{ personId, displayName, mobilePhone, email }`. Permite que una persona que llama asignada sin acceso a Personas pueda contactar a la persona |
| GET | `/closed` | JWT | — | Obtener las tareas cerradas del usuario actual |
| GET | `/timeline?taskIds=` | JWT | — | Obtener los datos de la línea de tiempo de tareas por IDs de tarea separados por comas |
| GET | `/directoryUpdate/:personId` | JWT | — | Obtener la tarea de actualización del directorio de una persona |
| POST | `/` | JWT | — | Crear o actualizar tareas. Añade `?type=directoryUpdate` para gestionar tareas de actualización del directorio (sube las fotos automáticamente) |
| POST | `/:id/conversation` | JWT | `tasks.edit` o asignado a la tarjeta | Adjuntar la conversación de notas a una tarjeta. Cuerpo: `{ conversationId }`. La primera conversación adjuntada prevalece; las llamadas posteriores devuelven la tarjeta sin cambios |
| POST | `/loadForGroups` | JWT | — | Cargar tareas de grupos específicos. Cuerpo: `{ groupIds: [], status: "Open" }` |

## Automatizaciones

Ruta base: `/doing/automations`

| Método | Ruta | Autenticación | Permiso | Descripción |
|--------|------|---------------|---------|-------------|
| GET | `/` | JWT | — | Listar todas las automatizaciones de la iglesia |
| GET | `/:id` | JWT | — | Obtener una automatización por ID |
| GET | `/check` | Pública | — | Iniciar una comprobación de todas las automatizaciones |
| POST | `/` | JWT | — | Crear o actualizar automatizaciones |
| DELETE | `/:id` | JWT | — | Eliminar una automatización |

## Acciones

Ruta base: `/doing/actions`

Las acciones definen lo que ocurre cuando se activa una automatización.

| Método | Ruta | Autenticación | Permiso | Descripción |
|--------|------|---------------|---------|-------------|
| GET | `/:id` | JWT | — | Obtener una acción por ID |
| GET | `/automation/:id` | JWT | — | Obtener todas las acciones de una automatización |
| POST | `/` | JWT | — | Crear o actualizar acciones |
| DELETE | `/:id` | JWT | — | Eliminar una acción |

## Condiciones

Ruta base: `/doing/conditions`

Las condiciones definen los criterios que activan una automatización.

| Método | Ruta | Autenticación | Permiso | Descripción |
|--------|------|---------------|---------|-------------|
| GET | `/:id` | JWT | — | Obtener una condición por ID |
| GET | `/automation/:id` | JWT | — | Obtener todas las condiciones de una automatización |
| POST | `/` | JWT | — | Crear o actualizar condiciones |
| DELETE | `/:id` | JWT | — | Eliminar una condición |

## Conjunciones

Ruta base: `/doing/conjunctions`

Las conjunciones vinculan varias condiciones dentro de una automatización (lógica Y/O).

| Método | Ruta | Autenticación | Permiso | Descripción |
|--------|------|---------------|---------|-------------|
| GET | `/:id` | JWT | — | Obtener una conjunción por ID |
| GET | `/automation/:id` | JWT | — | Obtener todas las conjunciones de una automatización |
| POST | `/` | JWT | — | Crear o actualizar conjunciones |
| DELETE | `/:id` | JWT | — | Eliminar una conjunción |

## Autenticaciones de proveedores de contenido

Ruta base: `/doing/contentProviderAuths`

Extiende la clase base CRUD (GET `/`, GET `/:id`, POST `/`, DELETE `/:id`; sin comprobaciones de permisos).

Gestiona los registros de autenticación OAuth para proveedores de contenido externos (por ejemplo, integraciones de software de presentación).

| Método | Ruta | Autenticación | Permiso | Descripción |
|--------|------|---------------|---------|-------------|
| GET | `/` | JWT | — | Listar todas las autenticaciones de proveedores de contenido |
| GET | `/:id` | JWT | — | Obtener una autenticación de proveedor de contenido por ID |
| GET | `/ids?ids=` | JWT | — | Obtener varias autenticaciones de proveedores de contenido por IDs separados por comas |
| GET | `/ministry/:ministryId` | JWT | — | Obtener todas las autenticaciones de proveedores de contenido de un ministerio |
| GET | `/ministry/:ministryId/:providerId` | JWT | — | Obtener el registro de autenticación de un ministerio y proveedor específicos |
| POST | `/` | JWT | — | Crear o actualizar autenticaciones de proveedores de contenido |
| DELETE | `/:id` | JWT | — | Eliminar una autenticación de proveedor de contenido |

## Proxy de proveedores

Ruta base: `/doing/providerProxy`

Redirige las solicitudes a proveedores de contenido externos (por ejemplo, ProPresenter, EasyWorship). Gestiona la renovación de tokens automáticamente cuando caducan.

| Método | Ruta | Autenticación | Permiso | Descripción |
|--------|------|---------------|---------|-------------|
| POST | `/browse` | JWT | — | Explorar archivos del proveedor de contenido. Cuerpo: `{ ministryId, providerId, path }` |
| POST | `/getPresentations` | JWT | — | Obtener presentaciones de un proveedor de contenido. Cuerpo: `{ ministryId, providerId, path }` |
| POST | `/getPlaylist` | JWT | — | Obtener una lista de reproducción de un proveedor de contenido. Cuerpo: `{ ministryId, providerId, path, resolution }` |
| POST | `/getInstructions` | JWT | — | Obtener las instrucciones de un elemento de contenido. Cuerpo: `{ ministryId, providerId, path }` |
| POST | `/getExpandedInstructions` | JWT | — | Obtener las instrucciones ampliadas de un elemento de contenido. Cuerpo: `{ ministryId, providerId, path }` |

## Páginas relacionadas

- [Endpoints de Membresía](./membership) — Personas, grupos, roles y permisos
- [Endpoints de Asistencia](./attendance) — Seguimiento de servicios y visitas
- [Estructura del módulo](../module-structure) — Patrones de organización del código
