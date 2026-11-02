---
title: "Endpoints de Doing"
---

# Endpoints de Doing

<div class="article-intro">

El módulo Doing administra la planeación de servicios, la programación de voluntarios, la gestión de tareas y las automatizaciones. Ofrece herramientas para crear planes de servicio con horarios y puestos, asignar voluntarios, administrar las fechas de no disponibilidad, armar los elementos del orden de servicio, conectarse a proveedores de contenido externos y configurar flujos automatizados con condiciones y acciones.

</div>

**Ruta base:** `/doing`

## Planes

Ruta base: `/doing/plans`

| Método | Ruta | Autenticación | Permiso | Descripción |
|--------|------|---------------|---------|-------------|
| GET | `/` | JWT | — | Enumera todos los planes de la iglesia |
| GET | `/:id` | JWT | — | Obtiene un plan por ID |
| GET | `/ids?ids=` | JWT | — | Obtiene varios planes por IDs separados por comas |
| GET | `/types/:planTypeId` | JWT | — | Obtiene los planes de un tipo de plan |
| GET | `/textRange?startDate=&endDate=&ministryId=&planTypeId=` | JWT | `texting.send` + edición del ministerio | Vista previa de los textos que envía **Enviar texto a voluntarios** del resumen de servicio: `{ totalMembers, eligibleCount, optedOutCount, noPhoneCount, capped }` para los voluntarios asignados en el rango (uno por persona; se omiten los que se dieron de baja y los números faltantes; los números compartidos se deduplican; límite de 200) |
| GET | `/presenter` | JWT | — | Obtiene los planes de los próximos 7 días (vista del presentador) |
| GET | `/confirmationWorkflows?ministryId=` | JWT | Edición del ministerio | Flujos de confirmación de asignaciones de servicio activos (`workflowType = "assignmentConfirmation"`) que un plan puede seleccionar: `[{ id, name }]` |
| GET | `/public/current/:planTypeId` | Pública | — | Obtiene el plan actual de un tipo de plan |
| GET | `/public/signup/:churchId` | Pública | — | Planes abiertos para autoinscripción, del más cercano al más lejano, cada uno con sus puestos de autoinscripción (ordenados por `categoryName` y luego por `name`, más `filledCount` de las asignaciones Aceptadas/No confirmadas) y horarios. Sin nombres de voluntarios. Cuando la configuración de la iglesia `volunteerSignupNextOnly` es `"true"`, solo se devuelve el primer plan de cada tipo de plan. Cada `plan` incluye un `signupDeadline` calculado (instante ISO, o `null`): `signupDeadlineHours` antes del horario de tipo `service` más temprano del plan (cualquier entrada con hora si no hay horario de servicio; 9:00 en la zona horaria de la iglesia en `serviceDate` si el plan no tiene horarios) |
| GET | `/signup/:planId/volunteers` | JWT | — | `[{ positionId, names }]` para los puestos de autoinscripción del plan (nombres visibles de los asignados Aceptados/No confirmados). Devuelve `[]` a menos que `showVolunteerNames` del plan esté activado |
| POST | `/` | JWT | — | Crea o actualiza planes (acepta un objeto o un arreglo). Establezca `confirmationWorkflowId` para incorporar el plan a un flujo de confirmación de servicio, o `null` para excluirlo en solicitudes futuras. Envíe `signupDeadlineHours: null` para quitar una fecha límite; si omite el campo se conserva el valor guardado |
| POST | `/copy/:id` | JWT | Edición del ministerio | Copia un plan con sus puestos, horarios, asignaciones y elementos del orden de servicio. El cuerpo incluye `ministryId`, `serviceDate`, `copyMode` ("none", "positions", "all") y `copyServiceOrder` (booleano). Sin `targetPlanId` se crea un plan nuevo, y `notes`, `signupDeadlineHours`, `showVolunteerNames` y `autoReplaceOnDecline` se heredan del plan de origen, salvo que el cuerpo los indique. Con `targetPlanId`, la copia llena ese plan existente (quien llama debe poder editarlo). La opción **Repetir semanalmente** de B1Admin llama a esto una vez por semana, copiando cada vez desde el plan creado la semana anterior |
| POST | `/textRange` | JWT | `texting.send` + edición del ministerio | Envía un mensaje de texto a cada voluntario asignado en un rango de fechas a través del proveedor de mensajes de la iglesia. Cuerpo: `{ startDate, endDate, ministryId, planTypeId?, message }` (mensaje de hasta 1600 caracteres; los campos de combinación se resuelven por destinatario). Devuelve los conteos de la vista previa más `recipientCount`, `successCount`, `failCount` y `error` (`no_provider` o `insufficient_credits`) cuando el envío se detiene antes |
| POST | `/:id/issueRequests` | JWT | Edición del plan | Emite las asignaciones nuevas no confirmadas y aún no notificadas del plan a través de su flujo de confirmación: marca cada una como notificada e inicia una tarjeta de flujo por asignación. Cuerpo vacío; devuelve `{ issued }`. Falla a menos que el plan esté publicado (no `prepared`), tenga un `confirmationWorkflowId` activo con al menos un paso, y su fecha límite de respuesta no haya vencido |
| POST | `/autofill/:id` | JWT | — | Completa automáticamente las asignaciones de voluntarios de un plan. Cuerpo: `{ teams: [{ positionId, personIds }] }` |
| DELETE | `/:id` | JWT | — | Elimina un plan y todos sus horarios, asignaciones, puestos y elementos relacionados |

### Ejemplo: copiar un plan

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

Extiende la clase base CRUD (GET `/`, GET `/:id`, POST `/`, DELETE `/:id`; sin verificaciones de permisos).

| Método | Ruta | Autenticación | Permiso | Descripción |
|--------|------|---------------|---------|-------------|
| GET | `/` | JWT | — | Enumera todos los tipos de plan |
| GET | `/:id` | JWT | — | Obtiene un tipo de plan por ID |
| GET | `/ids?ids=` | JWT | — | Obtiene varios tipos de plan por IDs separados por comas |
| GET | `/ministryId/:ministryId` | JWT | — | Obtiene los tipos de plan de un ministerio |
| POST | `/` | JWT | — | Crea o actualiza tipos de plan |
| DELETE | `/:id` | JWT | — | Elimina un tipo de plan |

## Elementos del plan

Ruta base: `/doing/planItems`

Administra los elementos del orden de servicio (encabezados, secciones, canciones, etc.) organizados en una estructura de árbol padre-hijo.

| Método | Ruta | Autenticación | Permiso | Descripción |
|--------|------|---------------|---------|-------------|
| GET | `/:id` | JWT | — | Obtiene un elemento del plan por ID |
| GET | `/ids?ids=` | JWT | — | Obtiene varios elementos del plan por IDs separados por comas |
| GET | `/plan/:planId` | JWT | — | Obtiene todos los elementos de un plan (devuelve la estructura de árbol) |
| GET | `/presenter/:churchId/:planId` | Pública | — | Obtiene los elementos del plan para la vista del presentador (devuelve la estructura de árbol) |
| POST | `/` | JWT | — | Crea o actualiza elementos del plan |
| POST | `/sort` | JWT | — | Actualiza el orden de un elemento del plan (reordena los hermanos) |
| DELETE | `/:id` | JWT | — | Elimina un elemento del plan |

## Fuente del plan

Ruta base: `/doing/planFeed`

Proporciona las fuentes de elementos del plan para el presentador. Si no existen elementos del plan, se llena automáticamente desde la fuente de venue de Lessons.church usando el `contentId` del plan.

| Método | Ruta | Autenticación | Permiso | Descripción |
|--------|------|---------------|---------|-------------|
| GET | `/presenter/:churchId/:planId` | Pública | — | Obtiene la fuente del plan para el presentador (se llena automáticamente desde la fuente de venue si está vacía) |

## Puestos

Ruta base: `/doing/positions`

Extiende la clase base CRUD (GET `/:id`, POST `/`, DELETE `/:id`; sin verificaciones de permisos).

| Método | Ruta | Autenticación | Permiso | Descripción |
|--------|------|---------------|---------|-------------|
| GET | `/:id` | JWT | — | Obtiene un puesto por ID |
| GET | `/ids?ids=` | JWT | — | Obtiene varios puestos por IDs separados por comas |
| GET | `/plan/ids?planIds=` | JWT | — | Obtiene los puestos de varios planes por IDs de plan separados por comas |
| GET | `/plan/:planId` | JWT | — | Obtiene todos los puestos de un plan |
| POST | `/` | JWT | — | Crea o actualiza puestos |
| DELETE | `/:id` | JWT | — | Elimina un puesto |

## Horarios

Ruta base: `/doing/times`

| Método | Ruta | Autenticación | Permiso | Descripción |
|--------|------|---------------|---------|-------------|
| GET | `/all` | JWT | — | Enumera todos los horarios de la iglesia |
| GET | `/:id` | JWT | — | Obtiene un horario por ID |
| GET | `/plans?planIds=` | JWT | — | Obtiene los horarios de varios planes por IDs de plan separados por comas |
| GET | `/plan/:planId` | JWT | — | Obtiene todos los horarios de un plan |
| POST | `/` | JWT | — | Crea o actualiza horarios |
| DELETE | `/:id` | JWT | — | Elimina un horario |

## Asignaciones

Ruta base: `/doing/assignments`

| Método | Ruta | Autenticación | Permiso | Descripción |
|--------|------|---------------|---------|-------------|
| GET | `/my` | JWT | — | Obtiene las asignaciones del usuario actual |
| GET | `/my/upcoming` | JWT | — | Hasta 20 de las asignaciones del usuario actual en planes con fecha desde ayer en adelante (se omiten los planes pendientes de confirmar o `prepared`), del más cercano al más lejano: `{ assignmentId, status, positionName, planId, planName, serviceDate }`. Alimenta la vista previa de servicio en el inicio del miembro |
| GET | `/:id` | JWT | — | Obtiene una asignación por ID |
| GET | `/plan/ids?planIds=` | JWT | — | Obtiene las asignaciones de varios planes por IDs de plan separados por comas |
| GET | `/plan/:planId` | JWT | — | Obtiene todas las asignaciones de un plan |
| POST | `/` | JWT | — | Crea o actualiza asignaciones (el estado predeterminado es "Unconfirmed") |
| POST | `/accept/:id` | JWT | — | Acepta una asignación (debe ser la persona asignada) |
| POST | `/decline/:id` | JWT | — | Rechaza una asignación (debe ser la persona asignada) |
| POST | `/signup` | JWT | — | Autoinscripción a un puesto. Cuerpo: `{ positionId }`. El puesto debe permitir autoinscripción y tener lugar; crea una asignación Aceptada. Se rechaza con "Signup deadline has passed" una vez vencida la fecha límite de inscripción del plan (contada hacia atrás desde su primer horario de servicio, como se indicó antes) |
| DELETE | `/signup/:id` | JWT | — | Elimina tu propia autoinscripción. Se rechaza con "Removal deadline has passed" después de la fecha límite de inscripción del plan |
| DELETE | `/:id` | JWT | — | Elimina una asignación |

### Ejemplo: aceptar una asignación

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

## Fechas de no disponibilidad

Ruta base: `/doing/blockoutDates`

Extiende la clase base CRUD (GET `/:id`, DELETE `/:id`; sin verificaciones de permisos).

| Método | Ruta | Autenticación | Permiso | Descripción |
|--------|------|---------------|---------|-------------|
| GET | `/:id` | JWT | — | Obtiene una fecha de no disponibilidad por ID |
| GET | `/ids?ids=` | JWT | — | Obtiene varias fechas de no disponibilidad por IDs separados por comas |
| GET | `/my` | JWT | — | Obtiene las fechas de no disponibilidad del usuario actual |
| GET | `/upcoming` | JWT | — | Obtiene todas las fechas de no disponibilidad próximas de la iglesia |
| POST | `/` | JWT | — | Crea o actualiza fechas de no disponibilidad (usa el usuario actual como personId si no se indica) |
| DELETE | `/:id` | JWT | — | Elimina una fecha de no disponibilidad |

## Tareas

Ruta base: `/doing/tasks`

| Método | Ruta | Autenticación | Permiso | Descripción |
|--------|------|---------------|---------|-------------|
| GET | `/` | JWT | — | Obtiene las tareas abiertas del usuario actual |
| GET | `/:id` | JWT | — | Obtiene una tarea por ID |
| GET | `/:id/contact` | JWT | Puede ver la tarjeta | Datos de contacto de la persona a la que se refiere una tarjeta de flujo: `{ personId, displayName, mobilePhone, email }`. Permite que quien tiene asignada la tarjeta, sin acceso a Personas, contacte a la persona |
| GET | `/closed` | JWT | — | Obtiene las tareas cerradas del usuario actual |
| GET | `/timeline?taskIds=` | JWT | — | Obtiene los datos de la línea de tiempo de tareas por IDs de tarea separados por comas |
| GET | `/directoryUpdate/:personId` | JWT | — | Obtiene la tarea de actualización de directorio de una persona |
| POST | `/` | JWT | — | Crea o actualiza tareas. Agregue `?type=directoryUpdate` para manejar tareas de actualización de directorio (sube fotos automáticamente) |
| POST | `/:id/conversation` | JWT | `tasks.edit` o el asignado de la tarjeta | Adjunta la conversación de notas a una tarjeta. Cuerpo: `{ conversationId }`. Gana la primera conversación adjuntada; las llamadas posteriores devuelven la tarjeta sin cambios |
| POST | `/loadForGroups` | JWT | — | Carga las tareas de grupos específicos. Cuerpo: `{ groupIds: [], status: "Open" }` |

## Automatizaciones

Ruta base: `/doing/automations`

| Método | Ruta | Autenticación | Permiso | Descripción |
|--------|------|---------------|---------|-------------|
| GET | `/` | JWT | — | Enumera todas las automatizaciones de la iglesia |
| GET | `/:id` | JWT | — | Obtiene una automatización por ID |
| GET | `/check` | Pública | — | Dispara una revisión de todas las automatizaciones |
| POST | `/` | JWT | — | Crea o actualiza automatizaciones |
| DELETE | `/:id` | JWT | — | Elimina una automatización |

## Acciones

Ruta base: `/doing/actions`

Las acciones definen lo que ocurre cuando se dispara una automatización.

| Método | Ruta | Autenticación | Permiso | Descripción |
|--------|------|---------------|---------|-------------|
| GET | `/:id` | JWT | — | Obtiene una acción por ID |
| GET | `/automation/:id` | JWT | — | Obtiene todas las acciones de una automatización |
| POST | `/` | JWT | — | Crea o actualiza acciones |
| DELETE | `/:id` | JWT | — | Elimina una acción |

## Condiciones

Ruta base: `/doing/conditions`

Las condiciones definen los criterios que disparan una automatización.

| Método | Ruta | Autenticación | Permiso | Descripción |
|--------|------|---------------|---------|-------------|
| GET | `/:id` | JWT | — | Obtiene una condición por ID |
| GET | `/automation/:id` | JWT | — | Obtiene todas las condiciones de una automatización |
| POST | `/` | JWT | — | Crea o actualiza condiciones |
| DELETE | `/:id` | JWT | — | Elimina una condición |

## Conjunciones

Ruta base: `/doing/conjunctions`

Las conjunciones unen varias condiciones dentro de una automatización (lógica Y/O).

| Método | Ruta | Autenticación | Permiso | Descripción |
|--------|------|---------------|---------|-------------|
| GET | `/:id` | JWT | — | Obtiene una conjunción por ID |
| GET | `/automation/:id` | JWT | — | Obtiene todas las conjunciones de una automatización |
| POST | `/` | JWT | — | Crea o actualiza conjunciones |
| DELETE | `/:id` | JWT | — | Elimina una conjunción |

## Autenticaciones de proveedores de contenido

Ruta base: `/doing/contentProviderAuths`

Extiende la clase base CRUD (GET `/`, GET `/:id`, POST `/`, DELETE `/:id`; sin verificaciones de permisos).

Administra los registros de autenticación OAuth para proveedores de contenido externos (por ejemplo, integraciones de software de presentaciones).

`accessToken` y `refreshToken` se cifran en reposo con `EncryptionHelper` y se descifran al leerlos, así que la API sigue devolviendo tokens en texto plano. Las filas guardadas antes del cifrado contienen texto plano (que nunca incluye `|`); se devuelven tal cual y se cifran la próxima vez que se guardan.

| Método | Ruta | Autenticación | Permiso | Descripción |
|--------|------|---------------|---------|-------------|
| GET | `/` | JWT | — | Enumera todas las autenticaciones de proveedores de contenido |
| GET | `/:id` | JWT | — | Obtiene una autenticación de proveedor de contenido por ID |
| GET | `/ids?ids=` | JWT | — | Obtiene varias autenticaciones de proveedores de contenido por IDs separados por comas |
| GET | `/ministry/:ministryId` | JWT | — | Obtiene todas las autenticaciones de proveedores de contenido de un ministerio |
| GET | `/ministry/:ministryId/:providerId` | JWT | — | Obtiene el registro de autenticación de un ministerio y proveedor específicos |
| POST | `/` | JWT | — | Crea o actualiza autenticaciones de proveedores de contenido |
| DELETE | `/:id` | JWT | — | Elimina una autenticación de proveedor de contenido |

## Proxy de proveedores

Ruta base: `/doing/providerProxy`

Reenvía solicitudes a proveedores de contenido externos (por ejemplo, ProPresenter, EasyWorship). Gestiona la renovación de tokens automáticamente cuando caducan.

| Método | Ruta | Autenticación | Permiso | Descripción |
|--------|------|---------------|---------|-------------|
| POST | `/browse` | JWT | — | Explora los archivos del proveedor de contenido. Cuerpo: `{ ministryId, providerId, path }` |
| POST | `/getPresentations` | JWT | — | Obtiene las presentaciones de un proveedor de contenido. Cuerpo: `{ ministryId, providerId, path }` |
| POST | `/getPlaylist` | JWT | — | Obtiene una lista de reproducción de un proveedor de contenido. Cuerpo: `{ ministryId, providerId, path, resolution }` |
| POST | `/getInstructions` | JWT | — | Obtiene las indicaciones de un elemento de contenido. Cuerpo: `{ ministryId, providerId, path }` |
| POST | `/getExpandedInstructions` | JWT | — | Obtiene las indicaciones ampliadas de un elemento de contenido. Cuerpo: `{ ministryId, providerId, path }` |

## Páginas relacionadas

- [Endpoints de Membership](./membership): personas, grupos, roles y permisos
- [Endpoints de Attendance](./attendance): seguimiento de servicios y visitas
- [Estructura de módulos](../module-structure): patrones de organización del código
