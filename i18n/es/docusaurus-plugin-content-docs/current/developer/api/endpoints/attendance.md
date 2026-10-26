---
title: "Endpoints de Asistencia"
---

# Endpoints de Asistencia

<div class="article-intro">

El módulo de Asistencia gestiona las ubicaciones de campus, los servicios, los horarios de servicio, las sesiones de asistencia, las visitas y las sesiones de visita. Proporciona la infraestructura para registrar quién asistió a qué servicio o reunión de grupo, admite flujos de check-in y ofrece informes de tendencias y resúmenes de asistencia.

</div>

**Ruta base:** `/attendance`

## Campus

Ruta base: `/attendance/campuses`

Controlador CRUD estándar (extiende GenericCrudController). Proporciona las rutas `getById`, `getAll`, `post` y `delete` a través de la clase base CRUD.

| Método | Ruta | Autenticación | Permiso | Descripción |
|--------|------|---------------|---------|-------------|
| GET | `/` | JWT | — | Listar todos los campus de la iglesia |
| GET | `/:id` | JWT | — | Obtener un campus por ID |
| POST | `/` | JWT | Services.Edit | Crear o actualizar campus |
| DELETE | `/:id` | JWT | Services.Edit | Eliminar un campus |

## Servicios

Ruta base: `/attendance/services`

Extiende GenericCrudController con las rutas CRUD `getById`, `getAll`, `post` y `delete`. Los endpoints `getAll` (`GET /`) y `search` se sobrescriben con implementaciones personalizadas.

| Método | Ruta | Autenticación | Permiso | Descripción |
|--------|------|---------------|---------|-------------|
| GET | `/` | JWT | — | Listar todos los servicios (incluye información del campus) |
| GET | `/:id` | JWT | — | Obtener un servicio por ID |
| GET | `/search?campusId=` | JWT | — | Buscar servicios por ID de campus |
| POST | `/` | JWT | Services.Edit | Crear o actualizar servicios |
| DELETE | `/:id` | JWT | Services.Edit | Eliminar un servicio |

### Ejemplo: Buscar servicios por campus

```
GET /attendance/services/search?campusId=abc-123
Authorization: Bearer <token>
```

```json
[
  {
    "id": "svc-001",
    "churchId": "church-123",
    "campusId": "abc-123",
    "name": "Domingo por la mañana"
  }
]
```

## Horarios de servicio

Ruta base: `/attendance/servicetimes`

Extiende GenericCrudController con las rutas CRUD `getById`, `post` y `delete`. Los endpoints `getAll` y `search` son implementaciones personalizadas.

| Método | Ruta | Autenticación | Permiso | Descripción |
|--------|------|---------------|---------|-------------|
| GET | `/` | JWT | — | Listar todos los horarios de servicio. Filtrar con `?serviceId=`. Añadir `?include=groups` para incluir los datos de grupos. Cada fila incluye un booleano calculado `checkinOpen` (es `false` solo cuando el horario de servicio tiene un calendario de check-in cuya ventana está cerrada en este momento). La ventana se mide en la zona horaria del campus del servicio, luego la zona horaria de la iglesia, después el primer campus que tenga una, y por último `America/New_York` |
| GET | `/:id` | JWT | — | Obtener un horario de servicio por ID |
| GET | `/search?campusId=&serviceId=` | JWT | — | Buscar horarios de servicio por campus y servicio |
| GET | `/public/:churchId` | Pública | — | Obtener el árbol campus → servicio → horario de una iglesia. Alimenta el elemento `serviceTimes` del constructor de sitios web |
| POST | `/` | JWT | Services.Edit | Crear o actualizar horarios de servicio. Campos de programación opcionales: `dayOfWeek` (0 = domingo … 6), `startTime` / `endTime` (`HH:mm`), `checkinOpenMinutes` (antes del inicio), `checkinCloseMinutes` (después del final). El check-in solo se limita por tiempo cuando están definidos tanto `dayOfWeek` como `startTime` |
| DELETE | `/:id` | JWT | Services.Edit | Eliminar un horario de servicio |

## Horarios de servicio de grupos

Ruta base: `/attendance/groupservicetimes`

Vincula grupos con horarios de servicio específicos.

| Método | Ruta | Autenticación | Permiso | Descripción |
|--------|------|---------------|---------|-------------|
| GET | `/` | JWT | — | Listar todas las asociaciones grupo-horario de servicio. Filtrar con `?groupId=` para obtener las asociaciones con los nombres de los servicios |
| GET | `/:id` | JWT | — | Obtener una asociación grupo-horario de servicio por ID |
| POST | `/` | JWT | Services.Edit | Crear o actualizar asociaciones grupo-horario de servicio |
| DELETE | `/:id` | JWT | Services.Edit | Eliminar una asociación grupo-horario de servicio |

## Registros de asistencia

Ruta base: `/attendance/attendancerecords`

Proporciona vistas agregadas de solo lectura de los datos de asistencia para informes y visualización.

| Método | Ruta | Autenticación | Permiso | Descripción |
|--------|------|---------------|---------|-------------|
| GET | `/` | JWT | Attendance.View | Cargar los registros de asistencia de una persona. Requiere `?personId=` |
| GET | `/my` | JWT | — | Acceso limitado al propio usuario: los registros de asistencia del miembro que ha iniciado sesión de los últimos 12 meses, del más reciente al más antiguo. Devuelve `401` si el usuario no está vinculado a una persona. Alimenta la sección **Mi asistencia** de la página B1 Me |
| GET | `/tree` | JWT | — | Cargar el árbol completo de asistencia (campus, servicios, horarios de servicio, grupos) |
| GET | `/trend?campusId=&serviceId=&serviceTimeId=&groupId=` | JWT | Attendance.View Summary | Cargar los datos de tendencia de asistencia con filtros opcionales |
| GET | `/groups?serviceId=&week=` | JWT | Attendance.View | Cargar la asistencia de grupos de un servicio en una semana determinada |
| GET | `/sessionStatus?serviceTimeId=&date=` | JWT | Attendance.View | Para cada grupo asignado al horario de servicio, devolver `{ groupId, sessionId, attendanceCount }` en esa fecha (`date` es `YYYY-MM-DD`; `sessionId` es null cuando el grupo no tiene sesión). Alimenta el cuadro de diálogo **Quién aún necesita asistencia** de B1Admin |
| GET | `/search?campusId=&serviceId=&serviceTimeId=&groupId=&startDate=&endDate=` | JWT | Attendance.View | Buscar registros de asistencia con filtros (campus, servicio, horario de servicio, grupo, rango de fechas) |

### Ejemplo: Tendencia de asistencia

```
GET /attendance/attendancerecords/trend?serviceId=svc-001
Authorization: Bearer <token>
```

```json
[
  { "week": "2025-01-05", "count": 142 },
  { "week": "2025-01-12", "count": 156 },
  { "week": "2025-01-19", "count": 138 }
]
```

## Sesiones

Ruta base: `/attendance/sessions`

Extiende GenericCrudController con las rutas CRUD `getById` y `delete`. Los endpoints `getAll` y `save` son implementaciones personalizadas que también permiten a los líderes de grupo gestionar las sesiones de sus grupos.

| Método | Ruta | Autenticación | Permiso | Descripción |
|--------|------|---------------|---------|-------------|
| GET | `/` | JWT | Attendance.View o líder de grupo | Listar todas las sesiones. Filtrar con `?groupId=` (incluye los nombres). Los líderes de grupo pueden ver las sesiones de sus propios grupos |
| GET | `/:id` | JWT | Attendance.View | Obtener una sesión por ID |
| POST | `/` | JWT | Attendance.Edit o líder de grupo | Crear o actualizar sesiones. Los líderes de grupo pueden guardar sesiones de sus propios grupos |
| DELETE | `/:id` | JWT | Attendance.Edit | Eliminar una sesión |

## Visitas

Ruta base: `/attendance/visits`

Gestiona los registros de visita individuales (una persona que asiste en una fecha específica) y proporciona el flujo de check-in.

| Método | Ruta | Autenticación | Permiso | Descripción |
|--------|------|---------------|---------|-------------|
| GET | `/` | JWT | Attendance.View | Listar todas las visitas. Filtrar con `?personId=` |
| GET | `/:id` | JWT | Attendance.View | Obtener una visita por ID |
| GET | `/checkin?serviceId=&peopleIds=` | JWT | Attendance.View o Attendance.Checkin | Cargar los datos de check-in de personas en un servicio. Devuelve las visitas con sus sesiones de visita de la última fecha registrada |
| POST | `/` | JWT | Attendance.Edit | Crear o actualizar visitas |
| POST | `/checkin?serviceId=&peopleIds=` | JWT | Attendance.Edit o Attendance.Checkin | Enviar los datos de check-in. Crea/actualiza visitas y sesiones de visita, y elimina los registros obsoletos |
| DELETE | `/:id` | JWT | Attendance.Edit | Eliminar una visita |

### Ejemplo: Flujo de check-in

**Paso 1 -- Cargar los datos de check-in existentes:**

```
GET /attendance/visits/checkin?serviceId=svc-001&peopleIds=person-1,person-2
Authorization: Bearer <token>
```

```json
[
  {
    "id": "visit-001",
    "personId": "person-1",
    "visitDate": "2025-01-19T00:00:00.000Z",
    "visitSessions": [
      {
        "id": "vs-001",
        "sessionId": "sess-001",
        "visitId": "visit-001",
        "session": {
          "id": "sess-001",
          "groupId": "group-001",
          "serviceTimeId": "st-001",
          "sessionDate": "2025-01-19T00:00:00.000Z"
        }
      }
    ]
  }
]
```

**Paso 2 -- Enviar el check-in:**

```
POST /attendance/visits/checkin?serviceId=svc-001&peopleIds=person-1,person-2
Authorization: Bearer <token>

[
  {
    "personId": "person-1",
    "visitSessions": [
      {
        "session": { "serviceTimeId": "st-001", "groupId": "group-001" }
      }
    ]
  }
]
```

Si un horario de servicio de destino tiene un calendario de check-in y su ventana está cerrada (medida con el mismo orden de zonas horarias, primero el campus, que `checkinOpen`), no se guarda nada y la respuesta es `409 { "error": "notOpen", "groups": [{ "groupId", "groupName", "reason": "notOpen" }] }`. Las infracciones de capacidad y de proporción de voluntarios también devuelven 409 (`error: "capacity"` o `"ratio"`). Las sesiones que una persona ya tiene hoy (que se reenvían con cada check-in) omiten la comprobación de la ventana, de modo que un hogar puede añadir un horario de servicio abierto después de que haya cerrado la ventana de uno anterior.

## Sesiones de visita

Ruta base: `/attendance/visitsessions`

Gestiona la asociación entre visitas y sesiones (a qué sesión concreta asistió una persona durante una visita). También proporciona un endpoint de registro rápido y un endpoint de descarga/exportación.

| Método | Ruta | Autenticación | Permiso | Descripción |
|--------|------|---------------|---------|-------------|
| GET | `/` | JWT | Attendance.View o líder de grupo | Listar sesiones de visita. Filtrar con `?sessionId=`. Los líderes de grupo pueden ver las sesiones de visita de sus propios grupos |
| GET | `/:id` | JWT | Attendance.View | Obtener una sesión de visita por ID |
| GET | `/download/:sessionId` | JWT | Attendance.View | Descargar la asistencia de una sesión (devuelve los nombres de las personas con su estado de presente/ausente) |
| POST | `/` | JWT | Attendance.Edit | Crear o actualizar sesiones de visita |
| POST | `/log` | JWT | Attendance.Edit o líder de grupo | Registrar rápidamente la asistencia de una persona en una sesión. Crea la visita automáticamente si es necesario. Los líderes de grupo pueden registrar la asistencia de sus propios grupos |
| DELETE | `/:id` | JWT | Attendance.Edit | Eliminar una sesión de visita por ID |
| DELETE | `/?personId=&sessionId=` | JWT | Attendance.Edit o líder de grupo | Quitar a una persona de una sesión. Elimina la sesión de visita y la visita principal si no quedan sesiones. Los líderes de grupo pueden quitar la asistencia de sus propios grupos |

### Ejemplo: Registro rápido de asistencia

```
POST /attendance/visitsessions/log
Authorization: Bearer <token>

{
  "personId": "person-001",
  "visitSessions": [
    { "sessionId": "sess-001" }
  ]
}
```

```json
{}
```

### Ejemplo: Descargar la asistencia de una sesión

```
GET /attendance/visitsessions/download/sess-001
Authorization: Bearer <token>
```

```json
[
  {
    "id": "vs-001",
    "personId": "person-001",
    "visitId": "visit-001",
    "sessionDate": "2025-01-19T00:00:00.000Z",
    "personName": "John Smith",
    "status": "present"
  },
  {
    "id": "",
    "personId": "person-002",
    "visitId": "",
    "sessionDate": "2025-01-19T00:00:00.000Z",
    "personName": "Jane Doe",
    "status": "absent"
  }
]
```

## Rachas

Ruta base: `/attendance/streaks`

Registra las rachas de asistencia de las personas: semanas consecutivas en las que una persona ha asistido. Es útil para métricas de participación y gamificación.

| Método | Ruta | Autenticación | Permiso | Descripción |
|--------|------|---------------|---------|-------------|
| GET | `/person/:personId` | JWT | — | Cargar las rachas de asistencia de una persona |

## Páginas relacionadas

- [Endpoints de Membresía](./membership) — Personas, grupos, roles y gestión de la iglesia
- [Autenticación y permisos](./authentication) — Flujo de inicio de sesión, JWT, modelo de permisos
- [Estructura del módulo](../module-structure) — Patrones de organización del código
