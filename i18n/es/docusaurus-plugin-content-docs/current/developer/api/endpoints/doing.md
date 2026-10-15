---
title: "Endpoints de Doing"
---

# Endpoints de Doing

<div class="article-intro">

El módulo Doing gestiona la planificación de servicios, la programación de voluntarios, la administración de tareas y las automatizaciones. Ofrece herramientas para crear planes de servicio con horarios y posiciones, asignar voluntarios, administrar fechas de no disponibilidad, armar los elementos del orden de servicio, conectarse con proveedores de contenido externos y configurar flujos de trabajo automatizados con condiciones y acciones.

</div>

**Ruta base:** `/doing`

## Planes

Ruta base: `/doing/plans`

| Método | Ruta | Autenticación | Permiso | Descripción |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | — | Lista todos los planes de la iglesia |
| GET | `/:id` | JWT | — | Obtiene un plan por ID |
| GET | `/ids?ids=` | JWT | — | Obtiene varios planes por IDs separados por comas |
| GET | `/types/:planTypeId` | JWT | — | Obtiene los planes de un tipo de plan |
| GET | `/textRange?startDate=&endDate=&ministryId=&planTypeId=` | JWT | `texting.send` + edición del ministerio | Muestra una vista previa de los envíos de **Text Volunteers** del resumen de servicio: `{ totalMembers, eligibleCount, optedOutCount, noPhoneCount, capped }` para los voluntarios asignados en el rango (uno por persona; se omiten los que dieron de baja o no tienen número, los números compartidos se deduplican y el total se limita a 200) |
| GET | `/presenter` | JWT | — | Obtiene los planes de los próximos 7 días (vista del presentador) |
| GET | `/public/current/:planTypeId` | Pública | — | Obtiene el plan actual de un tipo de plan |
| GET | `/public/signup/:churchId` | Pública | — | Planes abiertos para inscripción propia, del más próximo al más lejano, cada uno con sus posiciones de inscripción propia (ordenadas por `categoryName` y luego por `name`, más `filledCount` de asignaciones Accepted/Unconfirmed) y horarios. No incluye nombres de voluntarios. Cuando la configuración de la iglesia `volunteerSignupNextOnly` es `"true"`, solo se devuelve el primer plan de cada tipo de plan |
| GET | `/signup/:planId/volunteers` | JWT | — | `[{ positionId, names }]` para las posiciones de inscripción propia del plan (nombres para mostrar de los asignados Accepted/Unconfirmed). Devuelve `[]` a menos que `showVolunteerNames` del plan esté activado |
| POST | `/` | JWT | — | Crea o actualiza planes (acepta un objeto individual o un arreglo) |
| POST | `/copy/:id` | JWT | Edición del ministerio | Copia un plan incluidas las posiciones, los horarios, las asignaciones y los elementos del orden de servicio. El cuerpo incluye `ministryId`, `serviceDate`, `copyMode` ("none", "positions", "all") y `copyServiceOrder` (booleano). Sin `targetPlanId` se crea un plan nuevo, y `notes`, `signupDeadlineHours`, `showVolunteerNames` y `autoReplaceOnDecline` se heredan del plan de origen, salvo que el cuerpo los indique. Con `targetPlanId`, la copia llena ese plan existente (quien llama debe poder editarlo). La opción **Repeat weekly** de B1Admin llama a este endpoint una vez por semana, copiando cada vez desde el plan creado la semana anterior |
| POST | `/textRange` | JWT | `texting.send` + edición del ministerio | Envía un mensaje de texto a cada voluntario asignado en un rango de fechas, mediante el proveedor de mensajes de texto de la iglesia. Cuerpo: `{ startDate, endDate, ministryId, planTypeId?, message }` (el mensaje admite hasta 1600 caracteres; los campos de combinación se resuelven para cada destinatario). Devuelve los conteos de la vista previa, además de `recipientCount`, `successCount`, `failCount` y `error` (`no_provider` o `insufficient_credits`) cuando el envío se detiene antes de tiempo |
| POST | `/autofill/:id` | JWT | — | Completa automáticamente las asignaciones de voluntarios de un plan. Cuerpo: `{ teams: [{ positionId, personIds }] }` |
| DELETE | `/:id` | JWT | — | Elimina un plan y todos sus horarios, asignaciones, posiciones y elementos relacionados |

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

Extiende la clase base CRUD (GET `/`, GET `/:id`, POST `/`, DELETE `/:id`, sin verificaciones de permisos).

| Método | Ruta | Autenticación | Permiso | Descripción |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | — | Lista todos los tipos de plan |
| GET | `/:id` | JWT | — | Obtiene un tipo de plan por ID |
| GET | `/ids?ids=` | JWT | — | Obtiene varios tipos de plan por IDs separados por comas |
| GET | `/ministryId/:ministryId` | JWT | — | Obtiene los tipos de plan de un ministerio |
| POST | `/` | JWT | — | Crea o actualiza tipos de plan |
| DELETE | `/:id` | JWT | — | Elimina un tipo de plan |

## Elementos del plan

Ruta base: `/doing/planItems`

Administra los elementos del orden de servicio (encabezados, secciones, canciones, etc.) organizados en una estructura de árbol padre-hijo.

| Método | Ruta | Autenticación | Permiso | Descripción |
|--------|------|------|------------|-------------|
| GET | `/:id` | JWT | — | Obtiene un elemento del plan por ID |
| GET | `/ids?ids=` | JWT | — | Obtiene varios elementos del plan por IDs separados por comas |
| GET | `/plan/:planId` | JWT | — | Obtiene todos los elementos de un plan (devuelve una estructura de árbol) |
| GET | `/presenter/:churchId/:planId` | Pública | — | Obtiene los elementos del plan para la vista del presentador (devuelve una estructura de árbol) |
| POST | `/` | JWT | — | Crea o actualiza elementos del plan |
| POST | `/sort` | JWT | — | Actualiza el orden de un elemento del plan (reordena los hermanos) |
| DELETE | `/:id` | JWT | — | Elimina un elemento del plan |

## Feed del plan

Ruta base: `/doing/planFeed`

Proporciona los feeds de elementos del plan para el presentador. Si no existen elementos del plan, se completa automáticamente a partir del feed de la sede de Lessons.church usando el `contentId` del plan.

| Método | Ruta | Autenticación | Permiso | Descripción |
|--------|------|------|------------|-------------|
| GET | `/presenter/:churchId/:planId` | Pública | — | Obtiene el feed del plan para el presentador (se completa automáticamente desde el feed de la sede si está vacío) |

## Posiciones

Ruta base: `/doing/positions`

Extiende la clase base CRUD (GET `/:id`, POST `/`, DELETE `/:id`, sin verificaciones de permisos).

| Método | Ruta | Autenticación | Permiso | Descripción |
|--------|------|------|------------|-------------|
| GET | `/:id` | JWT | — | Obtiene una posición por ID |
| GET | `/ids?ids=` | JWT | — | Obtiene varias posiciones por IDs separados por comas |
| GET | `/plan/ids?planIds=` | JWT | — | Obtiene las posiciones de varios planes por IDs de plan separados por comas |
| GET | `/plan/:planId` | JWT | — | Obtiene todas las posiciones de un plan |
| POST | `/` | JWT | — | Crea o actualiza posiciones |
| DELETE | `/:id` | JWT | — | Elimina una posición |

## Horarios

Ruta base: `/doing/times`

| Método | Ruta | Autenticación | Permiso | Descripción |
|--------|------|------|------------|-------------|
| GET | `/all` | JWT | — | Lista todos los horarios de la iglesia |
| GET | `/:id` | JWT | — | Obtiene un horario por ID |
| GET | `/plans?planIds=` | JWT | — | Obtiene los horarios de varios planes por IDs de plan separados por comas |
| GET | `/plan/:planId` | JWT | — | Obtiene todos los horarios de un plan |
| POST | `/` | JWT | — | Crea o actualiza horarios |
| DELETE | `/:id` | JWT | — | Elimina un horario |

## Asignaciones

Ruta base: `/doing/assignments`

| Método | Ruta | Autenticación | Permiso | Descripción |
|--------|------|------|------------|-------------|
| GET | `/my` | JWT | — | Obtiene las asignaciones del usuario actual |
| GET | `/my/upcoming` | JWT | — | Hasta 20 asignaciones del usuario actual en planes con fecha a partir de ayer (se omiten los planes penciled-in o `prepared`), de la más próxima a la más lejana: `{ assignmentId, status, positionName, planId, planName, serviceDate }`. Respalda la vista previa de servicio en la página de inicio para miembros |
| GET | `/:id` | JWT | — | Obtiene una asignación por ID |
| GET | `/plan/ids?planIds=` | JWT | — | Obtiene las asignaciones de varios planes por IDs de plan separados por comas |
| GET | `/plan/:planId` | JWT | — | Obtiene todas las asignaciones de un plan |
| POST | `/` | JWT | — | Crea o actualiza asignaciones (el estado predeterminado es "Unconfirmed") |
| POST | `/accept/:id` | JWT | — | Acepta una asignación (debe ser la persona asignada) |
| POST | `/decline/:id` | JWT | — | Rechaza una asignación (debe ser la persona asignada) |
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

Extiende la clase base CRUD (GET `/:id`, DELETE `/:id`, sin verificaciones de permisos).

| Método | Ruta | Autenticación | Permiso | Descripción |
|--------|------|------|------------|-------------|
| GET | `/:id` | JWT | — | Obtiene una fecha de no disponibilidad por ID |
| GET | `/ids?ids=` | JWT | — | Obtiene varias fechas de no disponibilidad por IDs separados por comas |
| GET | `/my` | JWT | — | Obtiene las fechas de no disponibilidad del usuario actual |
| GET | `/upcoming` | JWT | — | Obtiene todas las próximas fechas de no disponibilidad de la iglesia |
| POST | `/` | JWT | — | Crea o actualiza fechas de no disponibilidad (usa el usuario actual como personId si no se proporciona) |
| DELETE | `/:id` | JWT | — | Elimina una fecha de no disponibilidad |

## Tareas

Ruta base: `/doing/tasks`

| Método | Ruta | Autenticación | Permiso | Descripción |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | — | Obtiene las tareas abiertas del usuario actual |
| GET | `/:id` | JWT | — | Obtiene una tarea por ID |
| GET | `/:id/contact` | JWT | Puede ver la tarjeta | Información de contacto de la persona a la que se refiere una tarjeta de flujo de trabajo: `{ personId, displayName, mobilePhone, email }`. Permite que una persona asignada que no tiene acceso a People se comunique con la persona |
| GET | `/closed` | JWT | — | Obtiene las tareas cerradas del usuario actual |
| GET | `/timeline?taskIds=` | JWT | — | Obtiene los datos de la línea de tiempo de tareas por IDs de tarea separados por comas |
| GET | `/directoryUpdate/:personId` | JWT | — | Obtiene la tarea de actualización de directorio de una persona |
| POST | `/` | JWT | — | Crea o actualiza tareas. Agrega `?type=directoryUpdate` para gestionar tareas de actualización de directorio (sube las fotos automáticamente) |
| POST | `/:id/conversation` | JWT | `tasks.edit` o asignado a la tarjeta | Adjunta la conversación de notas a una tarjeta. Cuerpo: `{ conversationId }`. La primera conversación adjuntada prevalece; las llamadas posteriores devuelven la tarjeta sin cambios |
| POST | `/loadForGroups` | JWT | — | Carga tareas de grupos específicos. Cuerpo: `{ groupIds: [], status: "Open" }` |

## Automatizaciones

Ruta base: `/doing/automations`

| Método | Ruta | Autenticación | Permiso | Descripción |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | — | Lista todas las automatizaciones de la iglesia |
| GET | `/:id` | JWT | — | Obtiene una automatización por ID |
| GET | `/check` | Pública | — | Dispara una verificación de todas las automatizaciones |
| POST | `/` | JWT | — | Crea o actualiza automatizaciones |
| DELETE | `/:id` | JWT | — | Elimina una automatización |

## Acciones

Ruta base: `/doing/actions`

Las acciones definen lo que ocurre cuando se dispara una automatización.

| Método | Ruta | Autenticación | Permiso | Descripción |
|--------|------|------|------------|-------------|
| GET | `/:id` | JWT | — | Obtiene una acción por ID |
| GET | `/automation/:id` | JWT | — | Obtiene todas las acciones de una automatización |
| POST | `/` | JWT | — | Crea o actualiza acciones |
| DELETE | `/:id` | JWT | — | Elimina una acción |

## Condiciones

Ruta base: `/doing/conditions`

Las condiciones definen los criterios que disparan una automatización.

| Método | Ruta | Autenticación | Permiso | Descripción |
|--------|------|------|------------|-------------|
| GET | `/:id` | JWT | — | Obtiene una condición por ID |
| GET | `/automation/:id` | JWT | — | Obtiene todas las condiciones de una automatización |
| POST | `/` | JWT | — | Crea o actualiza condiciones |
| DELETE | `/:id` | JWT | — | Elimina una condición |

## Conjunciones

Ruta base: `/doing/conjunctions`

Las conjunciones vinculan varias condiciones dentro de una automatización (lógica Y/O).

| Método | Ruta | Autenticación | Permiso | Descripción |
|--------|------|------|------------|-------------|
| GET | `/:id` | JWT | — | Obtiene una conjunción por ID |
| GET | `/automation/:id` | JWT | — | Obtiene todas las conjunciones de una automatización |
| POST | `/` | JWT | — | Crea o actualiza conjunciones |
| DELETE | `/:id` | JWT | — | Elimina una conjunción |

## Autenticaciones de proveedores de contenido

Ruta base: `/doing/contentProviderAuths`

Extiende la clase base CRUD (GET `/`, GET `/:id`, POST `/`, DELETE `/:id`, sin verificaciones de permisos).

Administra los registros de autenticación OAuth de proveedores de contenido externos (por ejemplo, integraciones de software de presentaciones).

| Método | Ruta | Autenticación | Permiso | Descripción |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | — | Lista todas las autenticaciones de proveedores de contenido |
| GET | `/:id` | JWT | — | Obtiene una autenticación de proveedor de contenido por ID |
| GET | `/ids?ids=` | JWT | — | Obtiene varias autenticaciones de proveedores de contenido por IDs separados por comas |
| GET | `/ministry/:ministryId` | JWT | — | Obtiene todas las autenticaciones de proveedores de contenido de un ministerio |
| GET | `/ministry/:ministryId/:providerId` | JWT | — | Obtiene el registro de autenticación de un ministerio y proveedor específicos |
| POST | `/` | JWT | — | Crea o actualiza autenticaciones de proveedores de contenido |
| DELETE | `/:id` | JWT | — | Elimina una autenticación de proveedor de contenido |

## Proxy de proveedores

Ruta base: `/doing/providerProxy`

Redirige las solicitudes a proveedores de contenido externos (por ejemplo, ProPresenter, EasyWorship). Gestiona automáticamente la renovación de tokens cuando estos expiran.

| Método | Ruta | Autenticación | Permiso | Descripción |
|--------|------|------|------------|-------------|
| POST | `/browse` | JWT | — | Explora los archivos del proveedor de contenido. Cuerpo: `{ ministryId, providerId, path }` |
| POST | `/getPresentations` | JWT | — | Obtiene las presentaciones de un proveedor de contenido. Cuerpo: `{ ministryId, providerId, path }` |
| POST | `/getPlaylist` | JWT | — | Obtiene una lista de reproducción de un proveedor de contenido. Cuerpo: `{ ministryId, providerId, path, resolution }` |
| POST | `/getInstructions` | JWT | — | Obtiene las instrucciones de un elemento de contenido. Cuerpo: `{ ministryId, providerId, path }` |
| POST | `/getExpandedInstructions` | JWT | — | Obtiene las instrucciones ampliadas de un elemento de contenido. Cuerpo: `{ ministryId, providerId, path }` |

## Páginas relacionadas

- [Endpoints de membresía](./membership): personas, grupos, roles y permisos
- [Endpoints de asistencia](./attendance): seguimiento de servicios y visitas
- [Estructura de módulos](../module-structure): patrones de organización del código
