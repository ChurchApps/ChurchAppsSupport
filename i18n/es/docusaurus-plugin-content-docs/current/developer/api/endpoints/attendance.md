---
title: "Puntos finales de asistencia"
---

# Puntos finales de asistencia

<div class="article-intro">

El módulo de asistencia gestiona ubicaciones de campús, servicios, horas de servicio, sesiones de asistencia, visitas y sesiones de visita. Proporciona la infraestructura para rastrear quién asistió a qué servicio o reunión de grupo, admite flujos de trabajo de registro y ofrece reportes de tendencias y resúmenes de asistencia.

</div>

**Ruta base:** `/attendance`

## Campús

Ruta base: `/attendance/campuses`

Controlador CRUD estándar (extiende GenericCrudController). Proporciona rutas `getById`, `getAll`, `post` y `delete` a través de la clase base CRUD.

| Método | Ruta | Autenticación | Permiso | Descripción |
|--------|------|-------|---------|-------------|
| GET | `/` | JWT | — | Enumera todos los campús de la iglesia |
| GET | `/:id` | JWT | — | Obtener un campús por ID |
| POST | `/` | JWT | Services.Edit | Crear o actualizar campús |
| DELETE | `/:id` | JWT | Services.Edit | Eliminar un campús |

## Servicios

Ruta base: `/attendance/services`

Extiende GenericCrudController con rutas CRUD `getById`, `getAll`, `post` y `delete`. Los puntos finales `getAll` (`GET /`) y `search` se anulan con implementaciones personalizadas.

| Método | Ruta | Autenticación | Permiso | Descripción |
|--------|------|-------|---------|-------------|
| GET | `/` | JWT | — | Enumera todos los servicios (incluye información del campús) |
| GET | `/:id` | JWT | — | Obtener un servicio por ID |
| GET | `/search?campusId=` | JWT | — | Buscar servicios por ID de campús |
| POST | `/` | JWT | Services.Edit | Crear o actualizar servicios |
| DELETE | `/:id` | JWT | Services.Edit | Eliminar un servicio |

### Ejemplo: Buscar servicios por campús

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

## Horas de servicio

Ruta base: `/attendance/servicetimes`

Extiende GenericCrudController con rutas CRUD `getById`, `post` y `delete`. Los puntos finales `getAll` y `search` son implementaciones personalizadas.

| Método | Ruta | Autenticación | Permiso | Descripción |
|--------|------|-------|---------|-------------|
| GET | `/` | JWT | — | Enumera todas las horas de servicio. Filtra por `?serviceId=`. Agrega `?include=groups` para agregar datos del grupo |
| GET | `/:id` | JWT | — | Obtener una hora de servicio por ID |
| GET | `/search?campusId=&serviceId=` | JWT | — | Buscar horas de servicio por campús y servicio |
| GET | `/public/:churchId` | Público | — | Obtener el árbol de campús → servicio → hora para una iglesia. Impulsa el elemento `serviceTimes` del generador de sitios web |
| POST | `/` | JWT | Services.Edit | Crear o actualizar horas de servicio |
| DELETE | `/:id` | JWT | Services.Edit | Eliminar una hora de servicio |

## Página relacionada

- [Puntos finales de membresía](./membership) — Personas, grupos, roles y gestión de iglesias
- [Autenticación y permisos](./authentication) — Flujo de inicio de sesión, JWT, modelo de permiso
- [Estructura del módulo](../module-structure) — Patrones de organización del código
