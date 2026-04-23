---
title: "Puntos de Conexión de Doing"
---

# Puntos de Conexión de Doing

<div class="article-intro">

El módulo Doing gestiona la planificación de servicios, programación de voluntarios, gestión de tareas y automatizaciones. Proporciona herramientas para crear planes de servicio con horarios y posiciones, asignar voluntarios, gestionar fechas de bloqueo, construir elementos del orden del servicio, conectarse a proveedores de contenido externos y configurar flujos de trabajo automatizados con condiciones y acciones.

</div>

**Ruta base:** `/doing`

## Planes

Ruta base: `/doing/plans`

| Método | Ruta | Autenticación | Permiso | Descripción |
|--------|------|---------------|---------|-------------|
| GET | `/` | JWT | — | Listar todos los planes para la iglesia |
| GET | `/:id` | JWT | — | Obtener un plan por ID |
| GET | `/ids?ids=` | JWT | — | Obtener múltiples planes por IDs separados por comas |
| GET | `/types/:planTypeId` | JWT | — | Obtener planes por tipo de plan |
| GET | `/presenter` | JWT | — | Obtener planes para los próximos 7 días (vista de presentador) |
| GET | `/public/current/:planTypeId` | Público | — | Obtener el plan actual para un tipo de plan |
| POST | `/` | JWT | — | Crear o actualizar planes (acepta objeto único o matriz) |
| POST | `/copy/:id` | JWT | — | Copiar un plan incluyendo posiciones, horarios, asignaciones y elementos del orden del servicio. El cuerpo incluye `copyMode` ("none", "positions", "all") y `copyServiceOrder` (booleano) |
| POST | `/autofill/:id` | JWT | — | Rellenar automáticamente asignaciones de voluntarios para un plan. Cuerpo: `{ teams: [{ positionId, personIds }] }` |
| DELETE | `/:id` | JWT | — | Eliminar un plan y todos los horarios, asignaciones, posiciones y elementos del plan relacionados |

### Ejemplo: Copiar un Plan

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

## Tipos de Plan

Ruta base: `/doing/planTypes`

Extiende la clase base CRUD (GET `/`, GET `/:id`, POST `/`, DELETE `/:id` -- sin verificaciones de permisos).

| Método | Ruta | Autenticación | Permiso | Descripción |
|--------|------|---------------|---------|-------------|
| GET | `/` | JWT | — | Listar todos los tipos de plan |
| GET | `/:id` | JWT | — | Obtener un tipo de plan por ID |
| GET | `/ids?ids=` | JWT | — | Obtener múltiples tipos de plan por IDs separados por comas |
| GET | `/ministryId/:ministryId` | JWT | — | Obtener tipos de plan para un ministerio |
| POST | `/` | JWT | — | Crear o actualizar tipos de plan |
| DELETE | `/:id` | JWT | — | Eliminar un tipo de plan |

## Elementos del Plan

Ruta base: `/doing/planItems`

Gestiona elementos del orden del servicio (encabezados, secciones, canciones, etc.) organizados en una estructura de árbol padre-hijo.

| Método | Ruta | Autenticación | Permiso | Descripción |
|--------|------|---------------|---------|-------------|
| GET | `/:id` | JWT | — | Obtener un elemento del plan por ID |
| GET | `/ids?ids=` | JWT | — | Obtener múltiples elementos del plan por IDs separados por comas |
| GET | `/plan/:planId` | JWT | — | Obtener todos los elementos del plan para un plan (devuelve estructura de árbol) |
| GET | `/presenter/:churchId/:planId` | Público | — | Obtener elementos del plan para vista de presentador (devuelve estructura de árbol) |
| POST | `/` | JWT | — | Crear o actualizar elementos del plan |
| POST | `/sort` | JWT | — | Actualizar orden de clasificación para un elemento del plan (reordena hermanos) |
| DELETE | `/:id` | JWT | — | Eliminar un elemento del plan |

## Fuente de Plan

Ruta base: `/doing/planFeed`

Proporciona fuentes de elementos del plan para el presentador. Si no existen elementos del plan, se rellena automáticamente desde la fuente del lugar de Lessons.church usando el `contentId` del plan.

| Método | Ruta | Autenticación | Permiso | Descripción |
|--------|------|---------------|---------|-------------|
| GET | `/presenter/:churchId/:planId` | Público | — | Obtener fuente del plan para presentador (se rellena automáticamente desde la fuente del lugar si está vacía) |

## Posiciones

Ruta base: `/doing/positions`

Extiende la clase base CRUD (GET `/:id`, POST `/`, DELETE `/:id` -- sin verificaciones de permisos).

| Método | Ruta | Autenticación | Permiso | Descripción |
|--------|------|---------------|---------|-------------|
| GET | `/:id` | JWT | — | Obtener una posición por ID |
| GET | `/ids?ids=` | JWT | — | Obtener múltiples posiciones por IDs separados por comas |
| GET | `/plan/ids?planIds=` | JWT | — | Obtener posiciones para múltiples planes por IDs de plan separados por comas |
| GET | `/plan/:planId` | JWT | — | Obtener todas las posiciones para un plan |
| POST | `/` | JWT | — | Crear o actualizar posiciones |
| DELETE | `/:id` | JWT | — | Eliminar una posición |

## Horarios

Ruta base: `/doing/times`

| Método | Ruta | Autenticación | Permiso | Descripción |
|--------|------|---------------|---------|-------------|
| GET | `/all` | JWT | — | Listar todos los horarios para la iglesia |
| GET | `/:id` | JWT | — | Obtener un horario por ID |
| GET | `/plans?planIds=` | JWT | — | Obtener horarios para múltiples planes por IDs de plan separados por comas |
| GET | `/plan/:planId` | JWT | — | Obtener todos los horarios para un plan |
| POST | `/` | JWT | — | Crear o actualizar horarios |
| DELETE | `/:id` | JWT | — | Eliminar un horario |

## Asignaciones

Ruta base: `/doing/assignments`

| Método | Ruta | Autenticación | Permiso | Descripción |
|--------|------|---------------|---------|-------------|
| GET | `/my` | JWT | — | Obtener asignaciones para el usuario actual |
| GET | `/:id` | JWT | — | Obtener una asignación por ID |
| GET | `/plan/ids?planIds=` | JWT | — | Obtener asignaciones para múltiples planes por IDs de plan separados por comas |
| GET | `/plan/:planId` | JWT | — | Obtener todas las asignaciones para un plan |
| POST | `/` | JWT | — | Crear o actualizar asignaciones (estado predeterminado a "No Confirmado") |
| POST | `/accept/:id` | JWT | — | Aceptar una asignación (debe ser la persona asignada) |
| POST | `/decline/:id` | JWT | — | Rechazar una asignación (debe ser la persona asignada) |
| DELETE | `/:id` | JWT | — | Eliminar una asignación |

### Ejemplo: Aceptar una Asignación

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

## Fechas de Bloqueo

Ruta base: `/doing/blockoutDates`

Extiende la clase base CRUD (GET `/:id`, DELETE `/:id` -- sin verificaciones de permisos).

| Método | Ruta | Autenticación | Permiso | Descripción |
|--------|------|---------------|---------|-------------|
| GET | `/:id` | JWT | — | Obtener una fecha de bloqueo por ID |
| GET | `/ids?ids=` | JWT | — | Obtener múltiples fechas de bloqueo por IDs separados por comas |
| GET | `/my` | JWT | — | Obtener fechas de bloqueo para el usuario actual |
| GET | `/upcoming` | JWT | — | Obtener todas las fechas de bloqueo próximas para la iglesia |
| POST | `/` | JWT | — | Crear o actualizar fechas de bloqueo (estado predeterminado a personId actual si no se proporciona) |
| DELETE | `/:id` | JWT | — | Eliminar una fecha de bloqueo |

## Tareas

Ruta base: `/doing/tasks`

| Método | Ruta | Autenticación | Permiso | Descripción |
|--------|------|---------------|---------|-------------|
| GET | `/` | JWT | — | Obtener tareas abiertas para el usuario actual |
| GET | `/:id` | JWT | — | Obtener una tarea por ID |
| GET | `/closed` | JWT | — | Obtener tareas cerradas para el usuario actual |
| GET | `/timeline?taskIds=` | JWT | — | Obtener datos de cronología para tareas por IDs de tarea separados por comas |
| GET | `/directoryUpdate/:personId` | JWT | — | Obtener tarea de actualización de directorio para una persona |
| POST | `/` | JWT | — | Crear o actualizar tareas. Agregue `?type=directoryUpdate` para manejar tareas de actualización de directorio (carga automática de fotos) |
| POST | `/loadForGroups` | JWT | — | Cargar tareas para grupos específicos. Cuerpo: `{ groupIds: [], status: "Open" }` |

## Automatizaciones

Ruta base: `/doing/automations`

| Método | Ruta | Autenticación | Permiso | Descripción |
|--------|------|---------------|---------|-------------|
| GET | `/` | JWT | — | Listar todas las automatizaciones para la iglesia |
| GET | `/:id` | JWT | — | Obtener una automatización por ID |
| GET | `/check` | Público | — | Activar una verificación de todas las automatizaciones |
| POST | `/` | JWT | — | Crear o actualizar automatizaciones |
| DELETE | `/:id` | JWT | — | Eliminar una automatización |

## Acciones

Ruta base: `/doing/actions`

Las acciones definen qué ocurre cuando se dispara una automatización.

| Método | Ruta | Autenticación | Permiso | Descripción |
|--------|------|---------------|---------|-------------|
| GET | `/:id` | JWT | — | Obtener una acción por ID |
| GET | `/automation/:id` | JWT | — | Obtener todas las acciones para una automatización |
| POST | `/` | JWT | — | Crear o actualizar acciones |
| DELETE | `/:id` | JWT | — | Eliminar una acción |

## Condiciones

Ruta base: `/doing/conditions`

Las condiciones definen los criterios que disparan una automatización.

| Método | Ruta | Autenticación | Permiso | Descripción |
|--------|------|---------------|---------|-------------|
| GET | `/:id` | JWT | — | Obtener una condición por ID |
| GET | `/automation/:id` | JWT | — | Obtener todas las condiciones para una automatización |
| POST | `/` | JWT | — | Crear o actualizar condiciones |
| DELETE | `/:id` | JWT | — | Eliminar una condición |

## Conjunciones

Ruta base: `/doing/conjunctions`

Las conjunciones vinculan múltiples condiciones en una automatización (lógica AND/OR).

| Método | Ruta | Autenticación | Permiso | Descripción |
|--------|------|---------------|---------|-------------|
| GET | `/:id` | JWT | — | Obtener una conjunción por ID |
| GET | `/automation/:id` | JWT | — | Obtener todas las conjunciones para una automatización |
| POST | `/` | JWT | — | Crear o actualizar conjunciones |
| DELETE | `/:id` | JWT | — | Eliminar una conjunción |

## Autorizaciones del Proveedor de Contenido

Ruta base: `/doing/contentProviderAuths`

Extiende la clase base CRUD (GET `/`, GET `/:id`, POST `/`, DELETE `/:id` -- sin verificaciones de permisos).

Gestiona registros de autenticación de OAuth para proveedores de contenido externo (p. ej., integraciones de software de presentación).

| Método | Ruta | Autenticación | Permiso | Descripción |
|--------|------|---------------|---------|-------------|
| GET | `/` | JWT | — | Listar todas las autorizaciones del proveedor de contenido |
| GET | `/:id` | JWT | — | Obtener una autorización del proveedor de contenido por ID |
| GET | `/ids?ids=` | JWT | — | Obtener múltiples autorizaciones del proveedor de contenido por IDs separados por comas |
| GET | `/ministry/:ministryId` | JWT | — | Obtener todas las autorizaciones del proveedor de contenido para un ministerio |
| GET | `/ministry/:ministryId/:providerId` | JWT | — | Obtener registro de autenticación para un ministerio y proveedor específicos |
| POST | `/` | JWT | — | Crear o actualizar autorizaciones del proveedor de contenido |
| DELETE | `/:id` | JWT | — | Eliminar una autorización del proveedor de contenido |

## Proxy del Proveedor

Ruta base: `/doing/providerProxy`

Proxifica solicitudes a proveedores de contenido externos (p. ej., ProPresenter, EasyWorship). Maneja la actualización de tokens automáticamente cuando vencen.

| Método | Ruta | Autenticación | Permiso | Descripción |
|--------|------|---------------|---------|-------------|
| POST | `/browse` | JWT | — | Examinar archivos del proveedor de contenido. Cuerpo: `{ ministryId, providerId, path }` |
| POST | `/getPresentations` | JWT | — | Obtener presentaciones de un proveedor de contenido. Cuerpo: `{ ministryId, providerId, path }` |
| POST | `/getPlaylist` | JWT | — | Obtener una lista de reproducción de un proveedor de contenido. Cuerpo: `{ ministryId, providerId, path, resolution }` |
| POST | `/getInstructions` | JWT | — | Obtener instrucciones para un elemento de contenido. Cuerpo: `{ ministryId, providerId, path }` |
| POST | `/getExpandedInstructions` | JWT | — | Obtener instrucciones expandidas para un elemento de contenido. Cuerpo: `{ ministryId, providerId, path }` |

## Páginas Relacionadas

- [Puntos de Conexión de Membresía](./membership) -- Personas, grupos, roles y permisos
- [Puntos de Conexión de Asistencia](./attendance) -- Seguimiento de servicios y visitas
- [Estructura de Módulo](../module-structure) -- Patrones de organización del código
