---
title: "Puntos Finales de Membresía"
---

# Puntos Finales de Membresía

<div class="article-intro">

El módulo de Membership gestiona personas, iglesias, grupos, hogares, roles, permisos, formularios, y configuración. Es el módulo más grande y proporciona la capa central de identidad y autorización para todos los demás módulos.

</div>

**Ruta base:** `/membership`

## People

Ruta base: `/membership/people`

| Método | Ruta | Auth | Permiso | Descripción |
|--------|------|------|---------|-------------|
| GET | `/` | JWT | People.View o Member | Enumera todas las personas de la iglesia |
| GET | `/:id` | JWT | People.View o registro propio | Obtener una persona por ID (incluye envíos de formulario) |
| GET | `/ids?ids=` | JWT | People.View o Member | Obtener múltiples personas por IDs separados por comas |
| GET | `/basic?ids=` | JWT | — | Obtener información básica (solo nombre) para múltiples personas |
| GET | `/recent` | JWT | People.View o Member | Personas agregadas recientemente |
| GET | `/search?term=&email=` | JWT | People.View o Member | Buscar personas por nombre o correo |
| GET | `/search/phone?number=` | JWT | People.View o Member | Buscar por número de teléfono |
| GET | `/search/group?groupId=` | JWT | People.View o Member | Obtener personas en un grupo específico |
| GET | `/household/:householdId` | JWT | — | Obtener todas las personas en un hogar |
| GET | `/attendance` | JWT | People.Edit | Cargar asistentes con filtros (campusId, serviceId, serviceTimeId, groupId, categoryName, startDate, endDate) |
| GET | `/timeline?personIds=&groupIds=` | JWT | — | Cargar datos de línea de tiempo para personas y grupos |
| GET | `/directory/:id` | JWT | — | Obtener persona para vista de directorio (respeta preferencias de visibilidad) |
| GET | `/claim/:churchId` | JWT | — | Reclamar un registro de persona para el usuario actual en una iglesia |
| POST | `/` | JWT | People.Edit o EditSelf | Crear o actualizar personas (lote) |
| POST | `/search` | JWT | People.View o Member | Buscar personas (variante POST) |
| POST | `/advancedSearch` | JWT | People.View o Member | Búsqueda multi-condición (edad, birthMonth, membershipStatus, etc.) |
| POST | `/loadOrCreate` | Público | — | Encontrar o crear una persona por correo. Cuerpo: `{ churchId, email, firstName, lastName }` |
| POST | `/household/:householdId` | JWT | People.Edit | Actualizar asignaciones de miembros del hogar |
| POST | `/public/email` | Público | — | Enviar un correo a una persona. Cuerpo: `{ churchId, personId, subject, body, appName }` |
| POST | `/apiEmails` | Interno | — | Cargar correos de personas por IDs (servidor a servidor, requiere jwtSecret) |
| DELETE | `/:id` | JWT | People.Edit | Eliminar una persona |

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

## Users

Ruta base: `/membership/users`

Consulta [Autenticación y Permisos](./authentication) para puntos finales de inicio de sesión, registro, y gestión de contraseñas.

| Método | Ruta | Auth | Permiso | Descripción |
|--------|------|------|---------|-------------|
| POST | `/login` | Público | — | Iniciar sesión (correo/contraseña, refresh de JWT, o authGuid) |
| POST | `/register` | Público | — | Registrar un nuevo usuario |
| POST | `/forgot` | Público | — | Enviar correo de restablecimiento de contraseña |
| POST | `/setPasswordGuid` | Público | — | Establecer contraseña usando GUID de autenticación desde el enlace de correo |
| POST | `/verifyCredentials` | Público | — | Verificar correo/contraseña y devolver las iglesias asociadas |
| POST | `/loadOrCreate` | JWT | — | Encontrar o crear un usuario por correo/userId |
| POST | `/setDisplayName` | JWT | — | Actualizar el nombre y apellido del usuario |
| POST | `/updateEmail` | JWT | — | Cambiar la dirección de correo del usuario |
| POST | `/updatePassword` | JWT | — | Cambiar la contraseña del usuario (mín. 6 caracteres) |
| POST | `/updateOptedOut` | JWT | — | Establecer el estado de exclusión de una persona |
| GET | `/search?term=` | JWT | Server.Admin | Buscar todos los usuarios por nombre/correo |
| DELETE | `/` | JWT | — | Eliminar la cuenta del usuario actual |

## Churches

Ruta base: `/membership/churches`

| Método | Ruta | Auth | Permiso | Descripción |
|--------|------|------|---------|-------------|
| GET | `/` | JWT | — | Cargar todas las iglesias para el usuario actual |
| GET | `/:id` | JWT | — | Obtener iglesia por ID |
| GET | `/:id/getDomainAdmin` | JWT | — | Obtener el usuario administrador de dominio para una iglesia |
| GET | `/:id/impersonate` | JWT | Server.Admin | Suplantar una iglesia (solo administrador del servidor) |
| GET | `/all?term=` | JWT | Server.Admin | Buscar todas las iglesias (admin) |
| GET | `/search/?name=` | Público | — | Buscar iglesias por nombre |
| GET | `/lookup/?subDomain=&id=` | Público | — | Buscar una iglesia por subdominio o ID |
| POST | `/` | JWT | Settings.Edit | Actualizar detalles de la iglesia |
| POST | `/add` | JWT | — | Registrar una nueva iglesia. Campos requeridos: name, address1, city, state, zip, country |
| POST | `/search` | Público | — | Buscar iglesias por nombre (variante POST) |
| POST | `/select` | JWT | — | Seleccionar/cambiar a una iglesia. Cuerpo: `{ churchId }` o `{ subDomain }` |
| POST | `/:id/archive` | JWT | Server.Admin | Archivar o desarchivar una iglesia |
| POST | `/byIds` | Público | — | Cargar múltiples iglesias por IDs |
| DELETE | `/deleteAbandoned` | JWT | Server.Admin | Eliminar iglesias abandonadas por 7+ días |

## Groups

Ruta base: `/membership/groups`

Extiende CRUD estándar (GET `/`, GET `/:id` de la clase base).

| Método | Ruta | Auth | Permiso | Descripción |
|--------|------|------|---------|-------------|
| GET | `/` | JWT | — | Enumera todos los grupos |
| GET | `/:id` | JWT | — | Obtener grupo por ID |
| GET | `/search?campusId=&serviceId=&serviceTimeId=` | JWT | — | Buscar grupos por filtros de servicio |
| GET | `/my` | JWT | — | Obtener grupos para el usuario actual |
| GET | `/my/:tag` | JWT | — | Obtener grupos del usuario actual filtrados por etiqueta |
| GET | `/tag/:tag` | JWT | — | Obtener todos los grupos con una etiqueta específica |
| GET | `/public/:churchId/:id` | Público | — | Obtener un grupo público por iglesia e ID |
| GET | `/public/:churchId/tag/:tag` | Público | — | Obtener grupos públicos por etiqueta |
| GET | `/public/:churchId/label?label=` | Público | — | Obtener grupos públicos por etiqueta descriptiva |
| GET | `/public/:churchId/slug/:slug` | Público | — | Obtener un grupo público por slug |
| POST | `/` | JWT | Groups.Edit | Crear o actualizar grupos (genera slug automáticamente) |
| DELETE | `/:id` | JWT | Groups.Edit | Eliminar un grupo (también elimina equipos hijos para grupos de ministerio) |

## Group Members

Ruta base: `/membership/groupmembers`

Extiende CRUD estándar (GET `/:id`, DELETE `/:id` de la clase base).

| Método | Ruta | Auth | Permiso | Descripción |
|--------|------|------|---------|-------------|
| GET | `/:id` | JWT | GroupMembers.View | Obtener miembro de grupo por ID |
| GET | `/` | JWT | GroupMembers.View* | Enumera miembros de grupo. Filtra por `?groupId=`, `?groupIds=`, o `?personId=`. *También permitido si el usuario está en el grupo o consulta su propio personId |
| GET | `/my` | JWT | — | Obtener las membresías de grupo del usuario actual |
| GET | `/basic/:groupId` | JWT | — | Obtener lista básica de miembros para un grupo |
| GET | `/public/leaders/:churchId/:groupId` | Público | — | Obtener líderes de grupo (público) |
| GET | `/public/:churchId/:groupId` | Público | — | Obtener la lista pública de un grupo (campos mínimos: `personId`, `displayName`, `leader`, foto). Solo cuando el grupo lo habilita vía `publicRoster`; alimenta el elemento `staffGrid` del generador de sitios web |
| POST | `/` | JWT | GroupMembers.Edit | Agregar o actualizar miembros de grupo |
| DELETE | `/:id` | JWT | GroupMembers.View | Quitar un miembro de grupo |

## Households

Ruta base: `/membership/households`

Controlador CRUD estándar.

| Método | Ruta | Auth | Permiso | Descripción |
|--------|------|------|---------|-------------|
| GET | `/` | JWT | — | Enumera todos los hogares |
| GET | `/:id` | JWT | — | Obtener hogar por ID |
| POST | `/` | JWT | People.Edit | Crear o actualizar hogares |
| DELETE | `/:id` | JWT | People.Edit | Eliminar un hogar |

## Roles

Ruta base: `/membership/roles`

| Método | Ruta | Auth | Permiso | Descripción |
|--------|------|------|---------|-------------|
| GET | `/:id` | JWT | Roles.View | Obtener rol por ID |
| GET | `/church/:churchId` | JWT | Roles.View | Obtener todos los roles para una iglesia |
| POST | `/` | JWT | Roles.Edit | Crear o actualizar roles |
| DELETE | `/:id` | JWT | Roles.Edit | Eliminar un rol (también elimina sus permisos y miembros) |

## Role Members

Ruta base: `/membership/rolemembers`

| Método | Ruta | Auth | Permiso | Descripción |
|--------|------|------|---------|-------------|
| GET | `/roles/:id` | JWT | Roles.View | Obtener miembros para un rol. Agrega `?include=users` para incluir detalles de usuario |
| POST | `/` | JWT | Roles.Edit | Agregar miembros a un rol (crea usuario si el correo no existe) |
| DELETE | `/:id` | JWT | Roles.View | Quitar un miembro de rol |
| DELETE | `/self/:churchId/:userId` | JWT | — | Quitarte a ti mismo de una iglesia |

## Role Permissions

Ruta base: `/membership/rolepermissions`

| Método | Ruta | Auth | Permiso | Descripción |
|--------|------|------|---------|-------------|
| GET | `/roles/:id` | JWT | Roles.View | Obtener permisos para un rol (usa `null` como ID para el rol "Everyone") |
| POST | `/` | JWT | Roles.Edit | Crear o actualizar permisos de rol |
| DELETE | `/:id` | JWT | Roles.Edit | Eliminar un permiso de rol |

## Permissions

Ruta base: `/membership/permissions`

| Método | Ruta | Auth | Permiso | Descripción |
|--------|------|------|---------|-------------|
| GET | `/` | JWT | — | Obtener la lista completa de permisos disponibles |

## Forms

Ruta base: `/membership/forms`

| Método | Ruta | Auth | Permiso | Descripción |
|--------|------|------|---------|-------------|
| GET | `/` | JWT | Forms.Admin o Forms.Edit | Enumera todos los formularios (el admin ve todos; los editores ven los asignados + formularios sin miembros) |
| GET | `/:id` | JWT | Acceso al formulario | Obtener un formulario por ID |
| GET | `/archived` | JWT | Forms.Admin o Forms.Edit | Enumera formularios archivados |
| GET | `/standalone/:id?churchId=` | JWT | — | Obtener un formulario independiente (los formularios restringidos requieren auth) |
| POST | `/` | JWT | Forms.Admin o Forms.Edit | Crear o actualizar formularios |
| DELETE | `/:id` | JWT | Acceso al formulario | Eliminar un formulario |

## Form Submissions

Ruta base: `/membership/formsubmissions`

| Método | Ruta | Auth | Permiso | Descripción |
|--------|------|------|---------|-------------|
| GET | `/` | JWT | Forms.Admin o Forms.Edit | Enumera envíos. Filtra por `?personId=` o `?formId=` |
| GET | `/:id` | JWT | Forms.Admin o Forms.Edit | Obtener envío por ID. Agrega `?include=form,questions,answers` |
| GET | `/formId/:formId` | JWT | Acceso al formulario | Obtener todos los envíos para un formulario (incluye formulario, preguntas, respuestas) |
| POST | `/` | JWT | — | Enviar respuestas de formulario (maneja formularios restringidos/no restringidos, envía notificaciones por correo). Cuando el formulario tiene `autoCreatePerson`, encuentra o crea una persona Guest por correo y vincula el envío; cuando `followUpSubject`/`followUpBody` están establecidos, envía un correo de seguimiento con plantilla al remitente |
| DELETE | `/:id` | JWT | Forms.Admin o Forms.Edit | Eliminar un envío y sus respuestas |

## Questions

Ruta base: `/membership/questions`

| Método | Ruta | Auth | Permiso | Descripción |
|--------|------|------|---------|-------------|
| GET | `/` | JWT | Acceso al formulario | Enumera preguntas para un formulario. Requiere `?formId=` |
| GET | `/:id` | JWT | Acceso al formulario | Obtener una pregunta por ID |
| GET | `/unrestricted?formId=` | JWT | — | Obtener preguntas para un formulario no restringido |
| GET | `/sort/:id/up` | JWT | — | Mover una pregunta hacia arriba en el orden de clasificación |
| GET | `/sort/:id/down` | JWT | — | Mover una pregunta hacia abajo en el orden de clasificación |
| POST | `/` | JWT | Acceso al formulario | Crear o actualizar preguntas (asigna orden de clasificación automáticamente) |
| DELETE | `/:id?formId=` | JWT | Acceso al formulario | Eliminar una pregunta |

## Answers

Ruta base: `/membership/answers`

| Método | Ruta | Auth | Permiso | Descripción |
|--------|------|------|---------|-------------|
| GET | `/` | JWT | Forms.Admin o Forms.Edit | Enumera respuestas. Filtra por `?formSubmissionId=` |
| POST | `/` | JWT | Forms.Admin o Forms.Edit | Crear o actualizar respuestas |

## Member Permissions

Ruta base: `/membership/memberpermissions`

Controla el acceso por miembro a formularios específicos.

| Método | Ruta | Auth | Permiso | Descripción |
|--------|------|------|---------|-------------|
| GET | `/:id` | JWT | Acceso al formulario | Obtener un permiso de miembro por ID |
| GET | `/member/:id` | JWT | Acceso al formulario | Obtener todos los permisos de formulario para un miembro |
| GET | `/form/:id` | JWT | Acceso al formulario | Obtener todos los permisos de miembro para un formulario |
| GET | `/form/:id/my` | JWT | Acceso al formulario | Obtener el permiso del usuario actual para un formulario |
| POST | `/` | JWT | Acceso al formulario | Crear o actualizar permisos de miembro |
| DELETE | `/:id?formId=` | JWT | Acceso al formulario | Eliminar un permiso de miembro |
| DELETE | `/member/:id?formId=` | JWT | Acceso al formulario | Eliminar todos los permisos para un miembro en un formulario |

## Settings

Ruta base: `/membership/settings`

| Método | Ruta | Auth | Permiso | Descripción |
|--------|------|------|---------|-------------|
| GET | `/` | JWT | Settings.Edit | Obtener toda la configuración de la iglesia |
| GET | `/public/:churchId` | Público | — | Obtener configuración pública de una iglesia |
| POST | `/` | JWT | Settings.Edit | Guardar configuración (admite carga de imagen en base64) |

## Domains

Ruta base: `/membership/domains`

Extiende CRUD estándar (GET `/:id`, GET `/`, DELETE `/:id` de la clase base).

| Método | Ruta | Auth | Permiso | Descripción |
|--------|------|------|---------|-------------|
| GET | `/` | JWT | — | Enumera todos los dominios |
| GET | `/:id` | JWT | — | Obtener dominio por ID |
| GET | `/lookup/:domainName` | JWT | — | Buscar un dominio por nombre |
| GET | `/public/lookup/:domainName` | Público | — | Búsqueda pública de dominio por nombre |
| GET | `/health/check` | Público | — | Ejecutar verificación de salud en dominios no verificados |
| POST | `/` | JWT | Settings.Edit | Crear o actualizar dominios (activa la actualización de Caddy) |
| DELETE | `/:id` | JWT | Settings.Edit | Eliminar un dominio |

## User Church

Ruta base: `/membership/userchurch`

Gestiona la asociación entre usuarios e iglesias.

| Método | Ruta | Auth | Permiso | Descripción |
|--------|------|------|---------|-------------|
| GET | `/userid/:userId` | JWT | — | Obtener registro usuario-iglesia por ID de usuario |
| GET | `/personid/:personId` | JWT | — | Obtener el correo del usuario vinculado de una persona |
| GET | `/user/:userId` | JWT | Server.Admin | Cargar todas las iglesias para un usuario |
| POST | `/` | JWT | — | Crear una asociación usuario-iglesia |
| PATCH | `/:userId` | JWT | — | Actualizar la hora del último acceso y registrar el acceso |
| DELETE | `/record/:userId/:churchId/:personId` | JWT | — | Eliminar un registro usuario-iglesia |

## Visibility Preferences

Ruta base: `/membership/visibilityPreferences`

| Método | Ruta | Auth | Permiso | Descripción |
|--------|------|------|---------|-------------|
| GET | `/my` | JWT | — | Obtener las preferencias de visibilidad del usuario actual |
| POST | `/` | JWT | — | Guardar preferencias de visibilidad (visibilidad de dirección, teléfono, correo) |

## Query

Ruta base: `/membership/query`

| Método | Ruta | Auth | Permiso | Descripción |
|--------|------|------|---------|-------------|
| POST | `/members` | JWT | — | Búsqueda de miembros en lenguaje natural usando IA. Cuerpo: `{ text, subDomain, siteUrl }` |

## Client Errors

Ruta base: `/membership/clientErrors`

| Método | Ruta | Auth | Permiso | Descripción |
|--------|------|------|---------|-------------|
| POST | `/` | JWT | — | Registrar un error del lado del cliente |

## Páginas Relacionadas

- [Autenticación y Permisos](./authentication) — Flujo de inicio de sesión, JWT, OAuth, modelo de permisos
- [Puntos Finales de Asistencia](./attendance) — Rastreo de servicio y visitas
- [Estructura del Módulo](../module-structure) — Patrones de organización del código
