---
title: "Endpoints de Asistencia"
---

# Endpoints de Asistencia

<div class="article-intro">

El módulo Asistencia administra ubicaciones de campus, servicios, tiempos de servicio, sesiones de asistencia, visitas y sesiones de visita. Proporciona la infraestructura para rastrear quién asistió a qué servicio o reunión de grupo, admite flujos de trabajo de registro de asistencia y ofrece informes de tendencia y resumen de asistencia.

</div>

**Ruta base:** `/attendance`

## Campus

Ruta base: `/attendance/campuses`

Controlador estándar CRUD (extiende GenericCrudController). Proporciona rutas `getById`, `getAll`, `post` y `delete` a través de la clase base CRUD.

| Método | Ruta | Autenticación | Permiso | Descripción |
|--------|------|-------|------------|-------------|
| GET | `/` | JWT | — | Listar todos los campus de la iglesia |
| GET | `/:id` | JWT | — | Obtener un campus por ID |
| POST | `/` | JWT | Services.Edit | Crear o actualizar campus |
| DELETE | `/:id` | JWT | Services.Edit | Eliminar un campus |

## Servicios

Ruta base: `/attendance/services`

Extiende GenericCrudController con rutas CRUD `getById`, `getAll`, `post` y `delete`. Los endpoints `getAll` (`GET /`) y `search` se anulan con implementaciones personalizadas.

| Método | Ruta | Autenticación | Permiso | Descripción |
|--------|------|-------|------------|-------------|
| GET | `/` | JWT | — | Listar todos los servicios (incluye información del campus) |
| GET | `/:id` | JWT | — | Obtener un servicio por ID |
| GET | `/search?campusId=` | JWT | — | Buscar servicios por ID de campus |
| POST | `/` | JWT | Services.Edit | Crear o actualizar servicios |
| DELETE | `/:id` | JWT | Services.Edit | Eliminar un servicio |

### Ejemplo: Buscar Servicios por Campus

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
    "name": "Sunday Morning"
  }
]
```

## Tiempos de Servicio

Ruta base: `/attendance/servicetimes`

Extiende GenericCrudController con rutas CRUD `getById`, `post` y `delete`. Los endpoints `getAll` y `search` son implementaciones personalizadas.

| Método | Ruta | Autenticación | Permiso | Descripción |
|--------|------|-------|------------|-------------|
| GET | `/` | JWT | — | Listar todos los tiempos de servicio. Filtrar por `?serviceId=`. Añadir `?include=groups` para adjuntar datos de grupo |
| GET | `/:id` | JWT | — | Obtener un tiempo de servicio por ID |
| GET | `/search?campusId=&serviceId=` | JWT | — | Buscar tiempos de servicio por campus y servicio |
| GET | `/public/:churchId` | Público | — | Obtener el árbol de campus → servicio → tiempo para una iglesia. Alimenta el elemento `serviceTimes` del constructor de sitios web |
| POST | `/` | JWT | Services.Edit | Crear o actualizar tiempos de servicio |
| DELETE | `/:id` | JWT | Services.Edit | Eliminar un tiempo de servicio |

## Tiempos de Servicio de Grupo

Ruta base: `/attendance/groupservicetimes`

Vincula grupos a tiempos de servicio específicos.

| Método | Ruta | Autenticación | Permiso | Descripción |
|--------|------|-------|------------|-------------|
| GET | `/` | JWT | — | Listar todas las asociaciones de tiempo de servicio de grupo. Filtrar por `?groupId=` para obtener asociaciones con nombres de servicio |
| GET | `/:id` | JWT | — | Obtener una asociación de tiempo de servicio de grupo por ID |
| POST | `/` | JWT | Services.Edit | Crear o actualizar asociaciones de tiempo de servicio de grupo |
| DELETE | `/:id` | JWT | Services.Edit | Eliminar una asociación de tiempo de servicio de grupo |

## Registros de Asistencia

Ruta base: `/attendance/attendancerecords`

Proporciona vistas agregadas de solo lectura de datos de asistencia para informes y visualización.

| Método | Ruta | Autenticación | Permiso | Descripción |
|--------|------|-------|------------|-------------|
| GET | `/` | JWT | Attendance.View | Cargar registros de asistencia para una persona. Requiere `?personId=` |
| GET | `/tree` | JWT | — | Cargar el árbol completo de asistencia (campus, servicios, tiempos de servicio, grupos) |
| GET | `/trend?campusId=&serviceId=&serviceTimeId=&groupId=` | JWT | Attendance.View Summary | Cargar datos de tendencia de asistencia con filtros opcionales |
| GET | `/groups?serviceId=&week=` | JWT | Attendance.View | Cargar asistencia de grupo para un servicio en una semana determinada |
| GET | `/sessionStatus?serviceTimeId=&date=` | JWT | Attendance.View | Para cada grupo asignado al tiempo de servicio, devolver `{ groupId, sessionId, attendanceCount }` para esa fecha (`date` es `YYYY-MM-DD`; `sessionId` es nulo cuando el grupo no tiene sesión). Respalda el diálogo de B1Admin **Quién aún necesita asistencia** |
| GET | `/search?campusId=&serviceId=&serviceTimeId=&groupId=&startDate=&endDate=` | JWT | Attendance.View | Buscar registros de asistencia con filtros (campus, servicio, tiempo de servicio, grupo, rango de fechas) |

### Ejemplo: Tendencia de Asistencia

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

Extiende GenericCrudController con rutas CRUD `getById` y `delete`. Los endpoints `getAll` y `save` son implementaciones personalizadas que también permiten a líderes de grupo administrar sesiones de sus grupos.

| Método | Ruta | Autenticación | Permiso | Descripción |
|--------|------|-------|------------|-------------|
| GET | `/` | JWT | Attendance.View o Group Leader | Listar todas las sesiones. Filtrar por `?groupId=` (incluye nombres). Los líderes de grupo pueden ver sesiones de sus propios grupos |
| GET | `/:id` | JWT | Attendance.View | Obtener una sesión por ID |
| POST | `/` | JWT | Attendance.Edit o Group Leader | Crear o actualizar sesiones. Los líderes de grupo pueden guardar sesiones de sus propios grupos |
| DELETE | `/:id` | JWT | Attendance.Edit | Eliminar una sesión |

## Visitas

Ruta base: `/attendance/visits`

Administra registros de visita individual (una persona asistiendo en una fecha específica) y proporciona el flujo de trabajo de registro de asistencia.

| Método | Ruta | Autenticación | Permiso | Descripción |
|--------|------|-------|------------|-------------|
| GET | `/` | JWT | Attendance.View | Listar todas las visitas. Filtrar por `?personId=` |
| GET | `/:id` | JWT | Attendance.View | Obtener una visita por ID |
| GET | `/checkin?serviceId=&peopleIds=` | JWT | Attendance.View o Attendance.Checkin | Cargar datos de registro de asistencia para personas en un servicio. Devuelve visitas con sesiones de visita de la última fecha registrada |
| POST | `/` | JWT | Attendance.Edit | Crear o actualizar visitas |
| POST | `/checkin?serviceId=&peopleIds=` | JWT | Attendance.Edit o Attendance.Checkin | Enviar datos de registro de asistencia. Crea/actualiza visitas y sesiones de visita, elimina registros obsoletos |
| DELETE | `/:id` | JWT | Attendance.Edit | Eliminar una visita |

### Ejemplo: Flujo de Registro de Asistencia

**Paso 1 -- Cargar datos de registro de asistencia existentes:**

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

**Paso 2 -- Enviar registro de asistencia:**

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

## Sesiones de Visita

Ruta base: `/attendance/visitsessions`

Administra la asociación entre visitas y sesiones (qué sesión específica asistió una persona durante una visita). También proporciona un extremo de registro rápido y un extremo de descarga/exportación.

| Método | Ruta | Autenticación | Permiso | Descripción |
|--------|------|-------|------------|-------------|
| GET | `/` | JWT | Attendance.View o Group Leader | Listar sesiones de visita. Filtrar por `?sessionId=`. Los líderes de grupo pueden ver sesiones de visita de sus propios grupos |
| GET | `/:id` | JWT | Attendance.View | Obtener una sesión de visita por ID |
| GET | `/download/:sessionId` | JWT | Attendance.View | Descargar asistencia para una sesión (devuelve nombres de personas con estado presente/ausente) |
| POST | `/` | JWT | Attendance.Edit | Crear o actualizar sesiones de visita |
| POST | `/log` | JWT | Attendance.Edit o Group Leader | Registro rápido de la asistencia de una persona a una sesión. Crea automáticamente la visita si es necesario. Los líderes de grupo pueden registrar asistencia de sus propios grupos |
| DELETE | `/:id` | JWT | Attendance.Edit | Eliminar una sesión de visita por ID |
| DELETE | `/?personId=&sessionId=` | JWT | Attendance.Edit o Group Leader | Eliminar una persona de una sesión. Elimina la sesión de visita y la visita principal si no quedan sesiones. Los líderes de grupo pueden eliminar asistencia de sus propios grupos |

### Ejemplo: Registro Rápido de Asistencia

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

### Ejemplo: Descargar Asistencia de Sesión

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

Rastrea rachas de asistencia para individuos -- semanas consecutivas que una persona ha asistido. Útil para métricas de compromiso y gamificación.

| Método | Ruta | Autenticación | Permiso | Descripción |
|--------|------|-------|------------|-------------|
| GET | `/person/:personId` | JWT | — | Cargar rachas de asistencia para una persona |

## Páginas Relacionadas

- [Endpoints de Pertenencia](./membership) — Personas, grupos, roles y administración de iglesia
- [Autenticación y Permisos](./authentication) — Flujo de inicio de sesión, JWT, modelo de permisos
- [Estructura del Módulo](../module-structure) — Patrones de organización de código
