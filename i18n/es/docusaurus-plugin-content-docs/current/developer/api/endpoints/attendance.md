---
title: "Puntos Finales de Asistencia"
---

# Puntos Finales de Asistencia

<div class="article-intro">

El módulo de Asistencia gestiona ubicaciones de campus, servicios, horarios de servicio, sesiones de asistencia, visitas y sesiones de visita. Proporciona la infraestructura para rastrear quién asistió a qué servicio o reunión de grupo, soporta flujos de trabajo de registro de entrada y ofrece tendencias de asistencia e informes de resumen.

</div>

**Ruta base:** `/attendance`

## Campuses

Ruta base: `/attendance/campuses`

Controlador estándar CRUD (extiende GenericCrudController). Proporciona rutas `getById`, `getAll`, `post` y `delete` a través de la clase base CRUD.

| Método | Ruta | Auth | Permiso | Descripción |
|--------|------|------|---------|-------------|
| GET | `/` | JWT | — | Listar todos los campuses para la iglesia |
| GET | `/:id` | JWT | — | Obtener un campus por ID |
| POST | `/` | JWT | Services.Edit | Crear o actualizar campuses |
| DELETE | `/:id` | JWT | Services.Edit | Eliminar un campus |

## Servicios

Ruta base: `/attendance/services`

Extiende GenericCrudController con rutas CRUD `getById`, `getAll`, `post` y `delete`. Los puntos finales `getAll` (`GET /`) y `search` se anulan con implementaciones personalizadas.

| Método | Ruta | Auth | Permiso | Descripción |
|--------|------|------|---------|-------------|
| GET | `/` | JWT | — | Listar todos los servicios (incluye información del campus) |
| GET | `/:id` | JWT | — | Obtener un servicio por ID |
| GET | `/search?campusId=` | JWT | — | Buscar servicios por ID de campus |
| POST | `/` | JWT | Services.Edit | Crear o actualizar servicios |
| DELETE | `/:id` | JWT | Services.Edit | Eliminar un servicio |

## Horarios de Servicio

Ruta base: `/attendance/servicetimes`

Extiende GenericCrudController con rutas CRUD `getById`, `post` y `delete`. Los puntos finales `getAll` y `search` son implementaciones personalizadas.

| Método | Ruta | Auth | Permiso | Descripción |
|--------|------|------|---------|-------------|
| GET | `/` | JWT | — | Listar todos los horarios de servicio. Filtrar por `?serviceId=`. Agregar `?include=groups` para datos de grupo |
| GET | `/:id` | JWT | — | Obtener un horario de servicio por ID |
| GET | `/search?campusId=&serviceId=` | JWT | — | Buscar horarios de servicio por campus y servicio |
| POST | `/` | JWT | Services.Edit | Crear o actualizar horarios de servicio |
| DELETE | `/:id` | JWT | Services.Edit | Eliminar un horario de servicio |

## Horarios de Servicio del Grupo

Ruta base: `/attendance/groupservicetimes`

Vincula grupos a horarios de servicio específicos.

| Método | Ruta | Auth | Permiso | Descripción |
|--------|------|------|---------|-------------|
| GET | `/` | JWT | — | Listar todas las asociaciones de grupo-horario de servicio |
| GET | `/:id` | JWT | — | Obtener una asociación de grupo-horario de servicio por ID |
| POST | `/` | JWT | Services.Edit | Crear o actualizar asociaciones de grupo-horario de servicio |
| DELETE | `/:id` | JWT | Services.Edit | Eliminar una asociación de grupo-horario de servicio |

## Registros de Asistencia

Ruta base: `/attendance/attendancerecords`

Proporciona vistas de agregación de solo lectura de datos de asistencia para informes y visualización.

| Método | Ruta | Auth | Permiso | Descripción |
|--------|------|------|---------|-------------|
| GET | `/` | JWT | Attendance.View | Cargar registros de asistencia para una persona. Requiere `?personId=` |
| GET | `/tree` | JWT | — | Cargar el árbol de asistencia completo (campuses, servicios, horarios de servicio, grupos) |
| GET | `/trend?campusId=&serviceId=&serviceTimeId=&groupId=` | JWT | Attendance.View Summary | Cargar datos de tendencia de asistencia con filtros opcionales |
| GET | `/groups?serviceId=&week=` | JWT | Attendance.View | Cargar asistencia de grupo para un servicio en una semana determinada |
| GET | `/search?campusId=&serviceId=&serviceTimeId=&groupId=&startDate=&endDate=` | JWT | Attendance.View | Buscar registros de asistencia con filtros |

## Sesiones

Ruta base: `/attendance/sessions`

Extiende GenericCrudController con rutas CRUD `getById` y `delete`. Los puntos finales `getAll` y `save` son implementaciones personalizadas que también permiten a los líderes de grupo gestionar sesiones para sus grupos.

| Método | Ruta | Auth | Permiso | Descripción |
|--------|------|------|---------|-------------|
| GET | `/` | JWT | Attendance.View o Líder de Grupo | Listar todas las sesiones. Los líderes de grupo pueden ver sesiones para sus propios grupos |
| GET | `/:id` | JWT | Attendance.View | Obtener una sesión por ID |
| POST | `/` | JWT | Attendance.Edit o Líder de Grupo | Crear o actualizar sesiones. Los líderes de grupo pueden guardar sesiones para sus propios grupos |
| DELETE | `/:id` | JWT | Attendance.Edit | Eliminar una sesión |

## Visitas

Ruta base: `/attendance/visits`

Gestiona registros de visita individual (una persona asistiendo en una fecha específica) y proporciona el flujo de trabajo de registro de entrada.

| Método | Ruta | Auth | Permiso | Descripción |
|--------|------|------|---------|-------------|
| GET | `/` | JWT | Attendance.View | Listar todas las visitas. Filtrar por `?personId=` |
| GET | `/:id` | JWT | Attendance.View | Obtener una visita por ID |
| GET | `/checkin?serviceId=&peopleIds=` | JWT | Attendance.View o Attendance.Checkin | Cargar datos de registro de entrada para personas en un servicio |
| POST | `/` | JWT | Attendance.Edit | Crear o actualizar visitas |
| POST | `/checkin?serviceId=&peopleIds=` | JWT | Attendance.Edit o Attendance.Checkin | Enviar datos de registro de entrada |
| DELETE | `/:id` | JWT | Attendance.Edit | Eliminar una visita |

## Sesiones de Visita

Ruta base: `/attendance/visitsessions`

Gestiona la asociación entre visitas y sesiones. También proporciona un punto final de registro rápido y un punto final de descarga/exportación.

| Método | Ruta | Auth | Permiso | Descripción |
|--------|------|------|---------|-------------|
| GET | `/` | JWT | Attendance.View o Líder de Grupo | Listar sesiones de visita. Los líderes de grupo pueden ver sesiones de visita para sus propios grupos |
| GET | `/:id` | JWT | Attendance.View | Obtener una sesión de visita por ID |
| GET | `/download/:sessionId` | JWT | Attendance.View | Descargar asistencia para una sesión |
| POST | `/` | JWT | Attendance.Edit | Crear o actualizar sesiones de visita |
| POST | `/log` | JWT | Attendance.Edit o Líder de Grupo | Registro rápido de asistencia de una persona a una sesión |
| DELETE | `/:id` | JWT | Attendance.Edit | Eliminar una sesión de visita por ID |
| DELETE | `/?personId=&sessionId=` | JWT | Attendance.Edit o Líder de Grupo | Eliminar una persona de una sesión |

## Streaks

Ruta base: `/attendance/streaks`

Rastrea rayas de asistencia para individuos -- semanas consecutivas que una persona ha asistido.

| Método | Ruta | Auth | Permiso | Descripción |
|--------|------|------|---------|-------------|
| GET | `/person/:personId` | JWT | — | Cargar rayas de asistencia para una persona |

## Páginas Relacionadas

- [Puntos Finales de Membresía](./membership) — Personas, grupos, roles y gestión de iglesia
- [Autenticación y Permisos](./authentication) — Flujo de inicio de sesión, JWT, modelo de permisos
- [Estructura de Módulo](../module-structure) — Patrones de organización de código