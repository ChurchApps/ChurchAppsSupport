---
title: "Puntos Finales de Asistencia"
---

# Puntos Finales de Asistencia

<div class="article-intro">

El módulo de Asistencia gestiona ubicaciones de campus, servicios, horas de servicio, sesiones de asistencia, visitas, y sesiones de visita. Proporciona la infraestructura para rastrear quién asistió a qué servicio o reunión de grupo, admite flujos de trabajo de check-in, y ofrece reportes de tendencias y resúmenes de asistencia.

</div>

**Ruta base:** `/attendance`

## Campuses

Ruta base: `/attendance/campuses`

Controlador CRUD estándar (extiende GenericCrudController). Proporciona rutas `getById`, `getAll`, `post`, y `delete` a través de la clase base CRUD.

| Método | Ruta | Auth | Permiso | Descripción |
|--------|------|------|---------|-------------|
| GET | `/` | JWT | — | Enumera todos los campuses de la iglesia |
| GET | `/:id` | JWT | — | Obtener un campus por ID |
| POST | `/` | JWT | Services.Edit | Crear o actualizar campuses |
| DELETE | `/:id` | JWT | Services.Edit | Eliminar un campus |

## Services

Ruta base: `/attendance/services`

Extiende GenericCrudController con rutas CRUD `getById`, `getAll`, `post`, y `delete`. Los puntos finales `getAll` (`GET /`) y `search` se anulan con implementaciones personalizadas.

| Método | Ruta | Auth | Permiso | Descripción |
|--------|------|------|---------|-------------|
| GET | `/` | JWT | — | Enumera todos los servicios (incluye información de campus) |
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

## Service Times

Ruta base: `/attendance/servicetimes`

Extiende GenericCrudController con rutas CRUD `getById`, `post`, y `delete`. Los puntos finales `getAll` y `search` son implementaciones personalizadas.

| Método | Ruta | Auth | Permiso | Descripción |
|--------|------|------|---------|-------------|
| GET | `/` | JWT | — | Enumera todas las horas de servicio. Filtra por `?serviceId=`. Agrega `?include=groups` para añadir datos de grupo |
| GET | `/:id` | JWT | — | Obtener una hora de servicio por ID |
| GET | `/search?campusId=&serviceId=` | JWT | — | Buscar horas de servicio por campus y servicio |
| GET | `/public/:churchId` | Público | — | Obtener el árbol campus → servicio → hora para una iglesia. Impulsa el elemento `serviceTimes` del generador de sitios web |
| POST | `/` | JWT | Services.Edit | Crear o actualizar horas de servicio |
| DELETE | `/:id` | JWT | Services.Edit | Eliminar una hora de servicio |

## Group Service Times

Ruta base: `/attendance/groupservicetimes`

Vincula grupos a horas de servicio específicas.

| Método | Ruta | Auth | Permiso | Descripción |
|--------|------|------|---------|-------------|
| GET | `/` | JWT | — | Enumera todas las asociaciones grupo-hora de servicio. Filtra por `?groupId=` para obtener asociaciones con nombres de servicio |
| GET | `/:id` | JWT | — | Obtener una asociación grupo-hora de servicio por ID |
| POST | `/` | JWT | Services.Edit | Crear o actualizar asociaciones grupo-hora de servicio |
| DELETE | `/:id` | JWT | Services.Edit | Eliminar una asociación grupo-hora de servicio |

## Attendance Records

Ruta base: `/attendance/attendancerecords`

Proporciona vistas agregadas de solo lectura de datos de asistencia para reportes y visualización.

| Método | Ruta | Auth | Permiso | Descripción |
|--------|------|------|---------|-------------|
| GET | `/` | JWT | Attendance.View | Cargar registros de asistencia para una persona. Requiere `?personId=` |
| GET | `/tree` | JWT | — | Cargar el árbol completo de asistencia (campuses, servicios, horas de servicio, grupos) |
| GET | `/trend?campusId=&serviceId=&serviceTimeId=&groupId=` | JWT | Attendance.View Summary | Cargar datos de tendencia de asistencia con filtros opcionales |
| GET | `/groups?serviceId=&week=` | JWT | Attendance.View | Cargar asistencia de grupo para un servicio en una semana dada |
| GET | `/search?campusId=&serviceId=&serviceTimeId=&groupId=&startDate=&endDate=` | JWT | Attendance.View | Buscar registros de asistencia con filtros (campus, servicio, hora de servicio, grupo, rango de fechas) |

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

## Sessions

Ruta base: `/attendance/sessions`

Extiende GenericCrudController con rutas CRUD `getById` y `delete`. Los puntos finales `getAll` y `save` son implementaciones personalizadas que también permiten a los líderes de grupo gestionar sesiones para sus grupos.

| Método | Ruta | Auth | Permiso | Descripción |
|--------|------|------|---------|-------------|
| GET | `/` | JWT | Attendance.View o Líder de Grupo | Enumera todas las sesiones. Filtra por `?groupId=` (incluye nombres). Los líderes de grupo pueden ver sesiones para sus propios grupos |
| GET | `/:id` | JWT | Attendance.View | Obtener una sesión por ID |
| POST | `/` | JWT | Attendance.Edit o Líder de Grupo | Crear o actualizar sesiones. Los líderes de grupo pueden guardar sesiones para sus propios grupos |
| DELETE | `/:id` | JWT | Attendance.Edit | Eliminar una sesión |

## Visits

Ruta base: `/attendance/visits`

Gestiona registros de visita individuales (una persona asistiendo en una fecha específica) y proporciona el flujo de trabajo de check-in.

| Método | Ruta | Auth | Permiso | Descripción |
|--------|------|------|---------|-------------|
| GET | `/` | JWT | Attendance.View | Enumera todas las visitas. Filtra por `?personId=` |
| GET | `/:id` | JWT | Attendance.View | Obtener una visita por ID |
| GET | `/checkin?serviceId=&peopleIds=` | JWT | Attendance.View o Attendance.Checkin | Cargar datos de check-in para personas en un servicio. Devuelve visitas con sesiones de visita desde la última fecha registrada |
| POST | `/` | JWT | Attendance.Edit | Crear o actualizar visitas |
| POST | `/checkin?serviceId=&peopleIds=` | JWT | Attendance.Edit o Attendance.Checkin | Enviar datos de check-in. Crea/actualiza visitas y sesiones de visita, elimina registros obsoletos |
| DELETE | `/:id` | JWT | Attendance.Edit | Eliminar una visita |

### Ejemplo: Flujo de Check-In

**Paso 1 -- Cargar datos de check-in existentes:**

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

**Paso 2 -- Enviar check-in:**

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

## Visit Sessions

Ruta base: `/attendance/visitsessions`

Gestiona la asociación entre visitas y sesiones (qué sesión específica atendió una persona durante una visita). También proporciona un punto final de registro rápido y un punto final de descarga/exportación.

| Método | Ruta | Auth | Permiso | Descripción |
|--------|------|------|---------|-------------|
| GET | `/` | JWT | Attendance.View o Líder de Grupo | Enumera sesiones de visita. Filtra por `?sessionId=`. Los líderes de grupo pueden ver sesiones de visita para sus propios grupos |
| GET | `/:id` | JWT | Attendance.View | Obtener una sesión de visita por ID |
| GET | `/download/:sessionId` | JWT | Attendance.View | Descargar asistencia para una sesión (devuelve nombres de personas con estado presente/ausente) |
| POST | `/` | JWT | Attendance.Edit | Crear o actualizar sesiones de visita |
| POST | `/log` | JWT | Attendance.Edit o Líder de Grupo | Registro rápido de la asistencia de una persona a una sesión. Crea automáticamente una visita si es necesario. Los líderes de grupo pueden registrar asistencia para sus propios grupos |
| DELETE | `/:id` | JWT | Attendance.Edit | Eliminar una sesión de visita por ID |
| DELETE | `/?personId=&sessionId=` | JWT | Attendance.Edit o Líder de Grupo | Quitar a una persona de una sesión. Elimina la sesión de visita y la visita padre si no quedan sesiones. Los líderes de grupo pueden quitar asistencia para sus propios grupos |

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

## Streaks

Ruta base: `/attendance/streaks`

Rastrea rachas de asistencia para individuos -- semanas consecutivas que una persona ha asistido. Útil para métricas de participación y gamificación.

| Método | Ruta | Auth | Permiso | Descripción |
|--------|------|------|---------|-------------|
| GET | `/person/:personId` | JWT | — | Cargar rachas de asistencia para una persona |

## Páginas Relacionadas

- [Puntos Finales de Membresía](./membership) — Personas, grupos, roles, y gestión de iglesias
- [Autenticación y Permisos](./authentication) — Flujo de inicio de sesión, JWT, modelo de permisos
- [Estructura del Módulo](../module-structure) — Patrones de organización del código
