---
title: "Puntos de Conexión de Membresía"
---

# Puntos de Conexión de Membresía

<div class="article-intro">

El módulo Membership gestiona personas, iglesias, grupos, hogares, roles, permisos, formularios y configuración. Es el módulo más grande y proporciona la capa central de identidad y autorización para todos los demás módulos.

</div>

**Ruta base:** `/membership`

## Personas

Ruta base: `/membership/people`

| Método | Ruta | Autenticación | Permiso | Descripción |
|--------|------|---------------|---------|-------------|
| GET | `/` | JWT | Personas.Ver o Miembro | Listar todas las personas para la iglesia |
| GET | `/:id` | JWT | Personas.Ver o registro propio | Obtener una persona por ID (incluye envíos de formulario) |
| GET | `/ids?ids=` | JWT | Personas.Ver o Miembro | Obtener múltiples personas por IDs separados por comas |
| GET | `/basic?ids=` | JWT | — | Obtener información básica (solo nombre) para múltiples personas |
| GET | `/recent` | JWT | Personas.Ver o Miembro | Personas agregadas recientemente |
| GET | `/search?term=&email=` | JWT | Personas.Ver o Miembro | Buscar personas por nombre o correo electrónico |
| GET | `/search/phone?number=` | JWT | Personas.Ver o Miembro | Buscar por número de teléfono |
| GET | `/search/group?groupId=` | JWT | Personas.Ver o Miembro | Obtener personas en un grupo específico |
| GET | `/household/:householdId` | JWT | — | Obtener todas las personas en un hogar |
| GET | `/attendance` | JWT | Personas.Editar | Cargar asistentes con filtros (campusId, serviceId, serviceTimeId, groupId, categoryName, startDate, endDate) |
| GET | `/timeline?personIds=&groupIds=` | JWT | — | Cargar datos de cronología para personas y grupos |
| GET | `/directory/:id` | JWT | — | Obtener persona para vista de directorio (respeta preferencias de visibilidad) |
| GET | `/claim/:churchId` | JWT | — | Reclamar un registro de persona para el usuario actual en una iglesia |
| POST | `/` | JWT | Personas.Editar o EditarUnoMismo | Crear o actualizar personas (lote) |
| POST | `/search` | JWT | Personas.Ver o Miembro | Buscar personas (variante POST) |
| POST | `/advancedSearch` | JWT | Personas.Ver o Miembro | Búsqueda multi-condición (edad, mesDeNacimiento, estadoDeMembresia, etc.) |
| POST | `/loadOrCreate` | Público | — | Encontrar o crear una persona por correo electrónico. Cuerpo: `{ churchId, email, firstName, lastName }` |
| POST | `/household/:householdId` | JWT | Personas.Editar | Actualizar asignaciones de miembros del hogar |
| POST | `/public/email` | Público | — | Enviar un correo electrónico a una persona. Cuerpo: `{ churchId, personId, subject, body, appName }` |
| POST | `/apiEmails` | Interno | — | Cargar correos electrónicos de personas por IDs (servidor a servidor, requiere jwtSecret) |
| DELETE | `/:id` | JWT | Personas.Editar | Eliminar una persona |

### Ejemplo: Buscar Personas

```
GET /membership/people/search?term=John
Authorization: Bearer <token>
```

```json
[
  {
    "id": "abc-123",
    "name": { "first": "John", "last": "Smith" },
    "contactInfo": { "email": "john@example.com" },
    "membershipStatus": "Member"
  }
]
```

### Ejemplo: Crear una Persona

```
POST /membership/people
Authorization: Bearer <token>

[{ "firstName": "Jane", "lastName": "Doe", "contactInfo": { "email": "jane@example.com" } }]
```

## Usuarios

Ruta base: `/membership/users`

Ver [Autenticación y Permisos](./authentication) para puntos de conexión de inicio de sesión, registro y gestión de contraseñas.

| Método | Ruta | Autenticación | Permiso | Descripción |
|--------|------|---------------|---------|-------------|
| POST | `/login` | Público | — | Iniciar sesión (correo/contraseña, actualización JWT o authGuid) |
| POST | `/register` | Público | — | Registrar un nuevo usuario |
| POST | `/forgot` | Público | — | Enviar correo de reinicio de contraseña |
| POST | `/setPasswordGuid` | Público | — | Establecer contraseña usando authGuid del enlace de correo |
| POST | `/verifyCredentials` | Público | — | Verificar correo/contraseña y devolver iglesias asociadas |
| POST | `/loadOrCreate` | JWT | — | Encontrar o crear un usuario por correo/userId |
| POST | `/setDisplayName` | JWT | — | Actualizar nombre y apellido del usuario |
| POST | `/updateEmail` | JWT | — | Cambiar dirección de correo del usuario |
| POST | `/updatePassword` | JWT | — | Cambiar contraseña del usuario (mín. 6 caracteres) |
| POST | `/updateOptedOut` | JWT | — | Establecer estado de exclusión de una persona |
| GET | `/search?term=` | JWT | Server.Admin | Buscar todos los usuarios por nombre/correo |
| DELETE | `/` | JWT | — | Eliminar la cuenta de usuario actual |

## Iglesias

Ruta base: `/membership/churches`

| Método | Ruta | Autenticación | Permiso | Descripción |
|--------|------|---------------|---------|-------------|
| GET | `/` | JWT | — | Cargar todas las iglesias para el usuario actual |
| GET | `/:id` | JWT | — | Obtener iglesia por ID |
| GET | `/:id/getDomainAdmin` | JWT | — | Obtener el usuario administrador de dominio para una iglesia |
| GET | `/:id/impersonate` | JWT | Server.Admin | Suplantar una iglesia (solo administrador del servidor) |
| GET | `/all?term=` | JWT | Server.Admin | Buscar todas las iglesias (administrador) |
| GET | `/search/?name=` | Público | — | Buscar iglesias por nombre |
| GET | `/lookup/?subDomain=&id=` | Público | — | Buscar una iglesia por subdominio o ID |
| POST | `/` | JWT | Configuración.Editar | Actualizar detalles de iglesia |
| POST | `/add` | JWT | — | Registrar una nueva iglesia. Campos requeridos: nombre, dirección1, ciudad, estado, código postal, país |
| POST | `/search` | Público | — | Buscar iglesias por nombre (variante POST) |
| POST | `/select` | JWT | — | Seleccionar/cambiar a una iglesia. Cuerpo: `{ churchId }` o `{ subDomain }` |
| POST | `/:id/archive` | JWT | Server.Admin | Archivar o desarchivar una iglesia |
| POST | `/byIds` | Público | — | Cargar múltiples iglesias por IDs |
| DELETE | `/deleteAbandoned` | JWT | Server.Admin | Eliminar iglesias abandonadas durante 7+ días |

## Grupos

Ruta base: `/membership/groups`

Extiende CRUD estándar (GET `/`, GET `/:id` de clase base).

| Método | Ruta | Autenticación | Permiso | Descripción |
|--------|------|---------------|---------|-------------|
| GET | `/` | JWT | — | Listar todos los grupos |
| GET | `/:id` | JWT | — | Obtener grupo por ID |
| GET | `/search?campusId=&serviceId=&serviceTimeId=` | JWT | — | Buscar grupos por filtros de servicio |
| GET | `/my` | JWT | — | Obtener grupos para el usuario actual |
| GET | `/my/:tag` | JWT | — | Obtener grupos del usuario actual filtrados por etiqueta |
| GET | `/tag/:tag` | JWT | — | Obtener todos los grupos con una etiqueta específica |
| GET | `/public/:churchId/:id` | Público | — | Obtener un grupo público por iglesia e ID |
| GET | `/public/:churchId/tag/:tag` | Público | — | Obtener grupos públicos por etiqueta |
| GET | `/public/:churchId/label?label=` | Público | — | Obtener grupos públicos por etiqueta |
| GET | `/public/:churchId/slug/:slug` | Público | — | Obtener un grupo público por slug |
| POST | `/` | JWT | Grupos.Editar | Crear o actualizar grupos (genera slug automáticamente) |
| DELETE | `/:id` | JWT | Grupos.Editar | Eliminar un grupo (también elimina equipos hijo para grupos de ministerio) |

## Miembros del Grupo

Ruta base: `/membership/groupmembers`

Extiende CRUD estándar (GET `/:id`, DELETE `/:id` de clase base).

| Método | Ruta | Autenticación | Permiso | Descripción |
|--------|------|---------------|---------|-------------|
| GET | `/:id` | JWT | MiembrosDelGrupo.Ver | Obtener miembro del grupo por ID |
| GET | `/` | JWT | MiembrosDelGrupo.Ver* | Listar miembros del grupo. Filtrar por `?groupId=`, `?groupIds=` o `?personId=`. *También se permite si el usuario está en el grupo o consultando su propio personId |
| GET | `/my` | JWT | — | Obtener membresías de grupo del usuario actual |
| GET | `/basic/:groupId` | JWT | — | Obtener lista básica de miembros para un grupo |
| GET | `/public/leaders/:churchId/:groupId` | Público | — | Obtener líderes de grupo (público) |
| POST | `/` | JWT | MiembrosDelGrupo.Editar | Agregar o actualizar miembros del grupo |
| DELETE | `/:id` | JWT | MiembrosDelGrupo.Ver | Eliminar un miembro del grupo |

## Hogares

Ruta base: `/membership/households`

Controlador CRUD estándar.

| Método | Ruta | Autenticación | Permiso | Descripción |
|--------|------|---------------|---------|-------------|
| GET | `/` | JWT | — | Listar todos los hogares |
| GET | `/:id` | JWT | — | Obtener hogar por ID |
| POST | `/` | JWT | Personas.Editar | Crear o actualizar hogares |
| DELETE | `/:id` | JWT | Personas.Editar | Eliminar un hogar |

## Roles

Ruta base: `/membership/roles`

| Método | Ruta | Autenticación | Permiso | Descripción |
|--------|------|---------------|---------|-------------|
| GET | `/:id` | JWT | Roles.Ver | Obtener rol por ID |
| GET | `/church/:churchId` | JWT | Roles.Ver | Obtener todos los roles para una iglesia |
| POST | `/` | JWT | Roles.Editar | Crear o actualizar roles |
| DELETE | `/:id` | JWT | Roles.Editar | Eliminar un rol (también elimina sus permisos y miembros) |

## Miembros del Rol

Ruta base: `/membership/rolemembers`

| Método | Ruta | Autenticación | Permiso | Descripción |
|--------|------|---------------|---------|-------------|
| GET | `/roles/:id` | JWT | Roles.Ver | Obtener miembros para un rol. Agregue `?include=users` para incluir detalles de usuario |
| POST | `/` | JWT | Roles.Editar | Agregar miembros a un rol (crea usuario si el correo no existe) |
| DELETE | `/:id` | JWT | Roles.Ver | Eliminar un miembro del rol |
| DELETE | `/self/:churchId/:userId` | JWT | — | Eliminar usted mismo de una iglesia |

## Permisos del Rol

Ruta base: `/membership/rolepermissions`

| Método | Ruta | Autenticación | Permiso | Descripción |
|--------|------|---------------|---------|-------------|
| GET | `/roles/:id` | JWT | Roles.Ver | Obtener permisos para un rol (usar `null` como ID para rol "Todos") |
| POST | `/` | JWT | Roles.Editar | Crear o actualizar permisos de rol |
| DELETE | `/:id` | JWT | Roles.Editar | Eliminar un permiso de rol |

## Permisos

Ruta base: `/membership/permissions`

| Método | Ruta | Autenticación | Permiso | Descripción |
|--------|------|---------------|---------|-------------|
| GET | `/` | JWT | — | Obtener la lista completa de permisos disponibles |

## Formularios

Ruta base: `/membership/forms`

| Método | Ruta | Autenticación | Permiso | Descripción |
|--------|------|---------------|---------|-------------|
| GET | `/` | JWT | Formularios.Admin o Formularios.Editar | Listar todos los formularios (administrador ve todos; editores ven asignados + formularios sin miembro) |
| GET | `/:id` | JWT | Acceso a formulario | Obtener un formulario por ID |
| GET | `/archived` | JWT | Formularios.Admin o Formularios.Editar | Listar formularios archivados |
| GET | `/standalone/:id?churchId=` | JWT | — | Obtener un formulario independiente (los formularios restringidos requieren autenticación) |
| POST | `/` | JWT | Formularios.Admin o Formularios.Editar | Crear o actualizar formularios |
| DELETE | `/:id` | JWT | Acceso a formulario | Eliminar un formulario |

## Envíos de Formulario

Ruta base: `/membership/formsubmissions`

| Método | Ruta | Autenticación | Permiso | Descripción |
|--------|------|---------------|---------|-------------|
| GET | `/` | JWT | Formularios.Admin o Formularios.Editar | Listar envíos. Filtrar por `?personId=` o `?formId=` |
| GET | `/:id` | JWT | Formularios.Admin o Formularios.Editar | Obtener envío por ID. Agregue `?include=form,questions,answers` |
| GET | `/formId/:formId` | JWT | Acceso a formulario | Obtener todos los envíos para un formulario (incluye formulario, preguntas, respuestas) |
| POST | `/` | JWT | — | Enviar respuestas de formulario (maneja formularios restringidos/sin restricciones, envía notificaciones por correo) |
| DELETE | `/:id` | JWT | Formularios.Admin o Formularios.Editar | Eliminar un envío y sus respuestas |

## Preguntas

Ruta base: `/membership/questions`

| Método | Ruta | Autenticación | Permiso | Descripción |
|--------|------|---------------|---------|-------------|
| GET | `/` | JWT | Acceso a formulario | Listar preguntas para un formulario. Requiere `?formId=` |
| GET | `/:id` | JWT | Acceso a formulario | Obtener una pregunta por ID |
| GET | `/unrestricted?formId=` | JWT | — | Obtener preguntas para un formulario sin restricciones |
| GET | `/sort/:id/up` | JWT | — | Mover una pregunta hacia arriba en orden de clasificación |
| GET | `/sort/:id/down` | JWT | — | Mover una pregunta hacia abajo en orden de clasificación |
| POST | `/` | JWT | Acceso a formulario | Crear o actualizar preguntas (asigna orden de clasificación automáticamente) |
| DELETE | `/:id?formId=` | JWT | Acceso a formulario | Eliminar una pregunta |

## Respuestas

Ruta base: `/membership/answers`

| Método | Ruta | Autenticación | Permiso | Descripción |
|--------|------|---------------|---------|-------------|
| GET | `/` | JWT | Formularios.Admin o Formularios.Editar | Listar respuestas. Filtrar por `?formSubmissionId=` |
| POST | `/` | JWT | Formularios.Admin o Formularios.Editar | Crear o actualizar respuestas |

## Permisos de Miembros

Ruta base: `/membership/memberpermissions`

Controla el acceso por miembro a formularios específicos.

| Método | Ruta | Autenticación | Permiso | Descripción |
|--------|------|---------------|---------|-------------|
| GET | `/:id` | JWT | Acceso a formulario | Obtener un permiso de miembro por ID |
| GET | `/member/:id` | JWT | Acceso a formulario | Obtener todos los permisos de formulario para un miembro |
| GET | `/form/:id` | JWT | Acceso a formulario | Obtener todos los permisos de miembros para un formulario |
| GET | `/form/:id/my` | JWT | Acceso a formulario | Obtener el permiso del usuario actual para un formulario |
| POST | `/` | JWT | Acceso a formulario | Crear o actualizar permisos de miembros |
| DELETE | `/:id?formId=` | JWT | Acceso a formulario | Eliminar un permiso de miembro |
| DELETE | `/member/:id?formId=` | JWT | Acceso a formulario | Eliminar todos los permisos para un miembro en un formulario |

## Configuración

Ruta base: `/membership/settings`

| Método | Ruta | Autenticación | Permiso | Descripción |
|--------|------|---------------|---------|-------------|
| GET | `/` | JWT | Configuración.Editar | Obtener toda la configuración para la iglesia |
| GET | `/public/:churchId` | Público | — | Obtener configuración pública para una iglesia |
| POST | `/` | JWT | Configuración.Editar | Guardar configuración (admite carga de imagen base64) |

## Dominios

Ruta base: `/membership/domains`

Extiende CRUD estándar (GET `/:id`, GET `/`, DELETE `/:id` de clase base).

| Método | Ruta | Autenticación | Permiso | Descripción |
|--------|------|---------------|---------|-------------|
| GET | `/` | JWT | — | Listar todos los dominios |
| GET | `/:id` | JWT | — | Obtener dominio por ID |
| GET | `/lookup/:domainName` | JWT | — | Buscar un dominio por nombre |
| GET | `/public/lookup/:domainName` | Público | — | Búsqueda de dominio público por nombre |
| GET | `/health/check` | Público | — | Ejecutar verificación de estado en dominios no verificados |
| POST | `/` | JWT | Configuración.Editar | Crear o actualizar dominios (activa actualización de Caddy) |
| DELETE | `/:id` | JWT | Configuración.Editar | Eliminar un dominio |

## Iglesia del Usuario

Ruta base: `/membership/userchurch`

Gestiona la asociación entre usuarios e iglesias.

| Método | Ruta | Autenticación | Permiso | Descripción |
|--------|------|---------------|---------|-------------|
| GET | `/userid/:userId` | JWT | — | Obtener registro de iglesia de usuario por ID de usuario |
| GET | `/personid/:personId` | JWT | — | Obtener correo electrónico para usuario vinculado de una persona |
| GET | `/user/:userId` | JWT | Server.Admin | Cargar todas las iglesias para un usuario |
| POST | `/` | JWT | — | Crear una asociación iglesia-usuario |
| PATCH | `/:userId` | JWT | — | Actualizar hora de último acceso y registrar acceso |
| DELETE | `/record/:userId/:churchId/:personId` | JWT | — | Eliminar un registro iglesia-usuario |

## Preferencias de Visibilidad

Ruta base: `/membership/visibilityPreferences`

| Método | Ruta | Autenticación | Permiso | Descripción |
|--------|------|---------------|---------|-------------|
| GET | `/my` | JWT | — | Obtener preferencias de visibilidad del usuario actual |
| POST | `/` | JWT | — | Guardar preferencias de visibilidad (visibilidad de dirección, teléfono, correo) |

## Consulta

Ruta base: `/membership/query`

| Método | Ruta | Autenticación | Permiso | Descripción |
|--------|------|---------------|---------|-------------|
| POST | `/members` | JWT | — | Búsqueda de miembros en lenguaje natural usando IA. Cuerpo: `{ text, subDomain, siteUrl }` |

## Errores del Cliente

Ruta base: `/membership/clientErrors`

| Método | Ruta | Autenticación | Permiso | Descripción |
|--------|------|---------------|---------|-------------|
| POST | `/` | JWT | — | Registrar un error del lado del cliente |

## Páginas Relacionadas

- [Autenticación y Permisos](./authentication) -- Flujo de inicio de sesión, JWT, OAuth, modelo de permisos
- [Puntos de Conexión de Asistencia](./attendance) -- Seguimiento de servicios y visitas
- [Estructura de Módulo](../module-structure) -- Patrones de organización del código
