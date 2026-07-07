---
title: "Puntos finales de membresía"
---

# Puntos finales de membresía

<div class="article-intro">

El módulo Membership gestiona personas, iglesias, grupos, familias, roles, permisos, formularios y configuraciones. Es el módulo más grande y proporciona la capa central de identidad y autorización para todos los demás módulos.

</div>

**Ruta base:** `/membership`

## Personas

Ruta base: `/membership/people`

| Método | Ruta | Autenticación | Permiso | Descripción |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | People.View o Member | Listar todas las personas de la iglesia |
| GET | `/:id` | JWT | People.View o registro propio | Obtener una persona por ID (incluye envíos de formularios) |
| GET | `/ids?ids=` | JWT | People.View o Member | Obtener múltiples personas por IDs separados por comas |
| GET | `/basic?ids=` | JWT | — | Obtener información básica (solo nombre) para múltiples personas |
| GET | `/recent` | JWT | People.View o Member | Personas agregadas recientemente |
| GET | `/search?term=&email=` | JWT | People.View o Member | Buscar personas por nombre o correo electrónico |
| GET | `/search/phone?number=` | JWT | People.View o Member | Buscar por número de teléfono |
| GET | `/search/group?groupId=` | JWT | People.View o Member | Obtener personas en un grupo específico |
| GET | `/household/:householdId` | JWT | — | Obtener todas las personas en una familia |
| GET | `/attendance` | JWT | People.Edit | Cargar asistentes con filtros (campusId, serviceId, serviceTimeId, groupId, categoryName, startDate, endDate) |
| GET | `/timeline?personIds=&groupIds=` | JWT | — | Cargar datos de cronología para personas y grupos |
| GET | `/directory/:id` | JWT | — | Obtener persona para vista de directorio (respeta preferencias de visibilidad) |
| GET | `/claim/:churchId` | JWT | — | Reclamar un registro de persona para el usuario actual en una iglesia |
| POST | `/` | JWT | People.Edit o EditSelf | Crear o actualizar personas (lote) |
| POST | `/search` | JWT | People.View o Member | Buscar personas (variante POST) |
| POST | `/advancedSearch` | JWT | People.View o Member | Búsqueda multicondición (edad, mesdeNacimiento, estadoMembresía, etc.) |
| POST | `/loadOrCreate` | Público | — | Encontrar o crear una persona por correo. Cuerpo: `{ churchId, email, firstName, lastName }` |
| POST | `/household/:householdId` | JWT | People.Edit | Actualizar asignaciones de miembros familiares |
| POST | `/public/email` | Público | — | Enviar un correo a una persona. Cuerpo: `{ churchId, personId, subject, body, appName }` |
| POST | `/apiEmails` | Interno | — | Cargar correos de personas por IDs (servidor a servidor, requiere jwtSecret) |
| DELETE | `/:id` | JWT | People.Edit | Eliminar una persona |

## Páginas relacionadas

- [Autenticación y permisos](./authentication) — Flujo de inicio de sesión, JWT, OAuth, modelo de permisos
- [Puntos finales de asistencia](./attendance) — Seguimiento de servicio y visita
- [Estructura del módulo](../module-structure) — Patrones de organización del código
