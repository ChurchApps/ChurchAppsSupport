---
title: "Endpoints de Membership"
---

# Endpoints de Membership

<div class="article-intro">

El módulo Membership gestiona personas, iglesias, grupos, hogares, roles, permisos, formularios y configuración. Es el módulo más grande y proporciona la capa principal de identidad y autorización para todos los demás módulos.

</div>

**Ruta base:** `/membership`

## Personas

Ruta base: `/membership/people`

| Método | Ruta | Autenticación | Permiso | Descripción |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | People.View o Member | Lista todas las personas de la iglesia |
| GET | `/:id` | JWT | People.View o su propio registro | Obtiene una persona por ID (incluye las respuestas de formularios) |
| GET | `/ids?ids=` | JWT | People.View o Member | Obtiene varias personas por IDs separados por comas |
| GET | `/basic?ids=` | JWT | — | Obtiene la información básica (solo nombre) de varias personas |
| GET | `/names?ids=` | JWT | Cualquier permiso de la iglesia | `[{ id, name: { display }, photo }]` para los IDs separados por comas que quien llama ya tiene, de modo que los roles sin People.View (ofrendas, asistencia) puedan identificar a las personas. Sin búsqueda ni filtro de directorio |
| POST | `/names` | JWT | Cualquier permiso de la iglesia | Igual que `GET /names`. Cuerpo: `{ peopleIds }` (o `{ ids }`) |
| GET | `/recent` | JWT | People.View o Member | Personas agregadas recientemente |
| GET | `/search?term=&email=` | JWT | People.View o Member | Busca personas por nombre o correo electrónico |
| GET | `/search/phone?number=` | JWT | People.View o Member | Busca por número de teléfono |
| GET | `/search/group?groupId=` | JWT | People.View o Member | Obtiene las personas de un grupo específico |
| GET | `/household/:householdId` | JWT | — | Obtiene todas las personas de un hogar |
| GET | `/attendance` | JWT | People.Edit | Carga los asistentes con filtros (campusId, serviceId, serviceTimeId, groupId, categoryName, startDate, endDate) |
| GET | `/timeline?personIds=&groupIds=` | JWT | — | Carga los datos de la línea de tiempo de personas y grupos |
| GET | `/directory/:id` | JWT | — | Obtiene una persona para la vista del directorio (respeta las preferencias de visibilidad) |
| GET | `/claim/:churchId` | JWT | — | Reclama un registro de persona para el usuario actual en una iglesia |
| POST | `/` | JWT | People.Edit o EditSelf | Crea o actualiza personas (por lote) |
| POST | `/search` | JWT | People.View o Member | Busca personas (variante POST) |
| POST | `/advancedSearch` | JWT | People.View o Member | Búsqueda con múltiples condiciones (edad, birthMonth, membershipStatus, etc.) |
| POST | `/loadOrCreate` | Pública | — | Encuentra o crea una persona por correo electrónico. Cuerpo: `{ churchId, email, firstName, lastName }` |
| POST | `/household/:householdId` | JWT | People.Edit | Actualiza las asignaciones de miembros de un hogar |
| POST | `/public/email` | Pública | — | Envía un correo electrónico a una persona. Cuerpo: `{ churchId, personId, subject, body, appName }` |
| POST | `/apiEmails` | Interna | — | Carga los correos electrónicos de personas por IDs (de servidor a servidor, requiere jwtSecret) |
| DELETE | `/:id` | JWT | People.Edit | Elimina una persona |

### Ejemplo: buscar personas

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

### Ejemplo: crear una persona

```
POST /membership/people
Authorization: Bearer <token>

[{ "firstName": "Jane", "lastName": "Doe", "contactInfo": { "email": "jane@example.com" } }]
```

## Usuarios

Ruta base: `/membership/users`

Consulta [Autenticación y permisos](./authentication) para los endpoints de inicio de sesión, registro y gestión de contraseñas.

| Método | Ruta | Autenticación | Permiso | Descripción |
|--------|------|------|------------|-------------|
| POST | `/login` | Pública | — | Inicia sesión (correo y contraseña, renovación de JWT o authGuid) |
| POST | `/register` | Pública | — | Registra un nuevo usuario |
| POST | `/forgot` | Pública | — | Envía el correo para restablecer la contraseña |
| POST | `/setPasswordGuid` | Pública | — | Establece la contraseña usando el GUID de autenticación del enlace del correo |
| POST | `/verifyCredentials` | Pública | — | Verifica el correo y la contraseña, y devuelve las iglesias asociadas |
| POST | `/loadOrCreate` | JWT | — | Encuentra o crea un usuario por correo electrónico o userId |
| POST | `/setDisplayName` | JWT | — | Actualiza el nombre y apellido del usuario |
| POST | `/updateEmail` | JWT | — | Cambia la dirección de correo electrónico del usuario |
| POST | `/updatePassword` | JWT | — | Cambia la contraseña del usuario (mínimo 6 caracteres) |
| POST | `/updateOptedOut` | JWT | — | Establece el estado de exclusión (opted-out) de una persona |
| POST | `/sendInviteEmail` | JWT | People.Edit | Envía por correo una invitación a una persona de esta iglesia (`email`, `personName`, `contextName`). El botón dice **Sign Up** para alguien sin cuenta y **Log In** para un usuario existente. Un usuario que nunca ha iniciado sesión recibe en cambio un enlace **Set Your Password** que caduca en 7 días. Cuenta para el límite diario de correos de la iglesia (`429` cuando se alcanza) |
| GET | `/search?term=` | JWT | Server.Admin | Busca todos los usuarios por nombre o correo electrónico |
| DELETE | `/` | JWT | — | Elimina la cuenta del usuario actual |

## Iglesias

Ruta base: `/membership/churches`

| Método | Ruta | Autenticación | Permiso | Descripción |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | — | Carga todas las iglesias del usuario actual |
| GET | `/:id` | JWT | — | Obtiene una iglesia por ID |
| GET | `/:id/getDomainAdmin` | JWT | — | Obtiene el usuario administrador de dominio de una iglesia |
| GET | `/:id/impersonate` | JWT | Server.Admin | Suplanta a una iglesia (solo administradores del servidor) |
| GET | `/all?term=` | JWT | Server.Admin | Busca todas las iglesias (administración) |
| GET | `/search/?name=` | Pública | — | Busca iglesias por nombre |
| GET | `/lookup/?subDomain=&id=` | Pública | — | Busca una iglesia por subdominio o ID |
| POST | `/` | JWT | Settings.Edit | Actualiza los datos de la iglesia |
| POST | `/add` | JWT | — | Registra una nueva iglesia. Campos obligatorios: name, address1, city, state, zip, country |
| POST | `/search` | Pública | — | Busca iglesias por nombre (variante POST) |
| POST | `/select` | JWT | — | Selecciona o cambia a una iglesia. Cuerpo: `{ churchId }` o `{ subDomain }` |
| POST | `/:id/archive` | JWT | Server.Admin | Archiva o desarchiva una iglesia |
| POST | `/byIds` | Pública | — | Carga varias iglesias por IDs |
| DELETE | `/deleteAbandoned` | JWT | Server.Admin | Elimina las iglesias abandonadas durante 7 días o más |

## Grupos

Ruta base: `/membership/groups`

Extiende el CRUD estándar (GET `/`, GET `/:id` de la clase base).

| Método | Ruta | Autenticación | Permiso | Descripción |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | — | Lista todos los grupos |
| GET | `/:id` | JWT | — | Obtiene un grupo por ID |
| GET | `/search?campusId=&serviceId=&serviceTimeId=` | JWT | — | Busca grupos por filtros de servicio |
| GET | `/my` | JWT | — | Obtiene los grupos del usuario actual |
| GET | `/my/:tag` | JWT | — | Obtiene los grupos del usuario actual filtrados por etiqueta |
| GET | `/tag/:tag` | JWT | — | Obtiene todos los grupos con una etiqueta específica |
| GET | `/public/:churchId/:id` | Pública | — | Obtiene un grupo público por iglesia e ID |
| GET | `/public/:churchId/tag/:tag` | Pública | — | Obtiene grupos públicos por etiqueta |
| GET | `/public/:churchId/label?label=` | Pública | — | Obtiene grupos públicos por etiqueta de categoría (label) |
| GET | `/public/:churchId/slug/:slug` | Pública | — | Obtiene un grupo público por slug |
| POST | `/` | JWT | Groups.Edit | Crea o actualiza grupos (genera el slug automáticamente) |
| DELETE | `/:id` | JWT | Groups.Edit | Elimina un grupo (también elimina los equipos hijos de los grupos de ministerio) |

## Miembros de grupo

Ruta base: `/membership/groupmembers`

Extiende el CRUD estándar (GET `/:id`, DELETE `/:id` de la clase base).

| Método | Ruta | Autenticación | Permiso | Descripción |
|--------|------|------|------------|-------------|
| GET | `/:id` | JWT | GroupMembers.View | Obtiene un miembro de grupo por ID |
| GET | `/` | JWT | GroupMembers.View* | Lista los miembros de grupo. Filtra con `?groupId=`, `?groupIds=` o `?personId=`. *También permitido si el usuario está en el grupo o consulta su propio personId |
| GET | `/my` | JWT | — | Obtiene las membresías de grupo del usuario actual |
| GET | `/basic/:groupId` | JWT | — | Obtiene la lista básica de miembros de un grupo |
| GET | `/public/leaders/:churchId/:groupId` | Pública | — | Obtiene los líderes de un grupo (público) |
| GET | `/public/:churchId/:groupId` | Pública | — | Obtiene la lista pública de un grupo (campos mínimos: `personId`, `displayName`, `leader`, foto). Solo cuando el grupo se activa mediante `publicRoster`; alimenta el elemento `staffGrid` del creador de sitios web |
| POST | `/` | JWT | GroupMembers.Edit | Agrega o actualiza miembros de grupo |
| DELETE | `/:id` | JWT | GroupMembers.View | Quita a un miembro de un grupo |

## Hogares

Ruta base: `/membership/households`

Controlador CRUD estándar.

| Método | Ruta | Autenticación | Permiso | Descripción |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | — | Lista todos los hogares |
| GET | `/:id` | JWT | — | Obtiene un hogar por ID |
| POST | `/` | JWT | People.Edit | Crea o actualiza hogares |
| DELETE | `/:id` | JWT | People.Edit | Elimina un hogar |

## Roles

Ruta base: `/membership/roles`

| Método | Ruta | Autenticación | Permiso | Descripción |
|--------|------|------|------------|-------------|
| GET | `/:id` | JWT | Roles.View | Obtiene un rol por ID |
| GET | `/church/:churchId` | JWT | Roles.View | Obtiene todos los roles de una iglesia |
| POST | `/` | JWT | Roles.Edit | Crea o actualiza roles |
| DELETE | `/:id` | JWT | Roles.Edit | Elimina un rol (también elimina sus permisos y miembros) |

## Miembros de rol

Ruta base: `/membership/rolemembers`

| Método | Ruta | Autenticación | Permiso | Descripción |
|--------|------|------|------------|-------------|
| GET | `/roles/:id` | JWT | Roles.View | Obtiene los miembros de un rol. Agrega `?include=users` para incluir los datos de usuario |
| POST | `/` | JWT | Roles.Edit | Agrega miembros a un rol (crea el usuario si el correo no existe) |
| DELETE | `/:id` | JWT | Roles.View | Quita a un miembro de un rol |
| DELETE | `/self/:churchId/:userId` | JWT | — | Te quita a ti mismo de una iglesia |

## Permisos de rol

Ruta base: `/membership/rolepermissions`

| Método | Ruta | Autenticación | Permiso | Descripción |
|--------|------|------|------------|-------------|
| GET | `/roles/:id` | JWT | Roles.View | Obtiene los permisos de un rol (usa `null` como ID para el rol "Everyone") |
| POST | `/` | JWT | Roles.Edit | Crea o actualiza permisos de rol |
| DELETE | `/:id` | JWT | Roles.Edit | Elimina un permiso de rol |

## Permisos

Ruta base: `/membership/permissions`

| Método | Ruta | Autenticación | Permiso | Descripción |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | — | Obtiene la lista completa de permisos disponibles |

## Formularios

Ruta base: `/membership/forms`

| Método | Ruta | Autenticación | Permiso | Descripción |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | Forms.Admin o Forms.Edit | Lista todos los formularios (el administrador ve todos; los editores ven los asignados y los formularios no vinculados a miembros) |
| GET | `/:id` | JWT | Acceso al formulario | Obtiene un formulario por ID |
| GET | `/archived` | JWT | Forms.Admin o Forms.Edit | Lista los formularios archivados |
| GET | `/standalone/:id?churchId=` | JWT | — | Obtiene un formulario independiente (los formularios restringidos requieren autenticación) |
| POST | `/` | JWT | Forms.Admin o Forms.Edit | Crea o actualiza formularios |
| DELETE | `/:id` | JWT | Acceso al formulario | Elimina un formulario |

## Respuestas de formularios

Ruta base: `/membership/formsubmissions`

| Método | Ruta | Autenticación | Permiso | Descripción |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | Forms.Admin o Forms.Edit | Lista las respuestas. Filtra con `?personId=` o `?formId=` |
| GET | `/:id` | JWT | Forms.Admin o Forms.Edit | Obtiene una respuesta por ID. Agrega `?include=form,questions,answers` |
| GET | `/formId/:formId` | JWT | Acceso al formulario | Obtiene todas las respuestas de un formulario (incluye formulario, preguntas y respuestas) |
| POST | `/` | JWT | — | Envía las respuestas del formulario (gestiona formularios restringidos y no restringidos, y envía notificaciones por correo). Cuando el formulario tiene `autoCreatePerson`, busca o crea una persona Guest por correo electrónico y vincula la respuesta; cuando `followUpSubject`/`followUpBody` están definidos, envía a quien respondió un correo de seguimiento con plantilla |
| DELETE | `/:id` | JWT | Forms.Admin o Forms.Edit | Elimina una respuesta y sus respuestas a preguntas |

## Preguntas

Ruta base: `/membership/questions`

| Método | Ruta | Autenticación | Permiso | Descripción |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | Acceso al formulario | Lista las preguntas de un formulario. Requiere `?formId=` |
| GET | `/:id` | JWT | Acceso al formulario | Obtiene una pregunta por ID |
| GET | `/unrestricted?formId=` | JWT | — | Obtiene las preguntas de un formulario no restringido |
| GET | `/sort/:id/up` | JWT | — | Sube una pregunta en el orden |
| GET | `/sort/:id/down` | JWT | — | Baja una pregunta en el orden |
| POST | `/` | JWT | Acceso al formulario | Crea o actualiza preguntas (asigna el orden automáticamente) |
| DELETE | `/:id?formId=` | JWT | Acceso al formulario | Elimina una pregunta |

## Respuestas

Ruta base: `/membership/answers`

| Método | Ruta | Autenticación | Permiso | Descripción |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | Forms.Admin o Forms.Edit | Lista las respuestas. Filtra con `?formSubmissionId=` |
| POST | `/` | JWT | Forms.Admin o Forms.Edit | Crea o actualiza respuestas |

## Permisos de miembro

Ruta base: `/membership/memberpermissions`

Controla el acceso de cada miembro a formularios específicos.

| Método | Ruta | Autenticación | Permiso | Descripción |
|--------|------|------|------------|-------------|
| GET | `/:id` | JWT | Acceso al formulario | Obtiene un permiso de miembro por ID |
| GET | `/member/:id` | JWT | Acceso al formulario | Obtiene todos los permisos de formulario de un miembro |
| GET | `/form/:id` | JWT | Acceso al formulario | Obtiene todos los permisos de miembro de un formulario |
| GET | `/form/:id/my` | JWT | Acceso al formulario | Obtiene el permiso del usuario actual para un formulario |
| POST | `/` | JWT | Acceso al formulario | Crea o actualiza permisos de miembro |
| DELETE | `/:id?formId=` | JWT | Acceso al formulario | Elimina un permiso de miembro |
| DELETE | `/member/:id?formId=` | JWT | Acceso al formulario | Elimina todos los permisos de un miembro sobre un formulario |

## Configuración

Ruta base: `/membership/settings`

| Método | Ruta | Autenticación | Permiso | Descripción |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | Settings.Edit | Obtiene toda la configuración de la iglesia |
| GET | `/public/:churchId` | Pública | — | Obtiene la configuración pública de una iglesia |
| POST | `/` | JWT | Settings.Edit | Guarda la configuración (admite la carga de imágenes en base64) |

## Dominios

Ruta base: `/membership/domains`

Extiende el CRUD estándar (GET `/:id`, GET `/`, DELETE `/:id` de la clase base).

| Método | Ruta | Autenticación | Permiso | Descripción |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | — | Lista todos los dominios |
| GET | `/:id` | JWT | — | Obtiene un dominio por ID |
| GET | `/lookup/:domainName` | JWT | — | Busca un dominio por nombre |
| GET | `/public/lookup/:domainName` | Pública | — | Búsqueda pública de dominio por nombre |
| GET | `/health/check` | Pública | — | Ejecuta una verificación de estado en los dominios no verificados |
| POST | `/` | JWT | Settings.Edit | Crea o actualiza dominios (activa la actualización de Caddy) |
| DELETE | `/:id` | JWT | Settings.Edit | Elimina un dominio |

## Relación usuario-iglesia

Ruta base: `/membership/userchurch`

Administra la asociación entre usuarios e iglesias.

| Método | Ruta | Autenticación | Permiso | Descripción |
|--------|------|------|------------|-------------|
| GET | `/userid/:userId` | JWT | — | Obtiene el registro usuario-iglesia por ID de usuario |
| GET | `/personid/:personId` | JWT | — | Obtiene el correo electrónico del usuario vinculado a una persona |
| GET | `/user/:userId` | JWT | Server.Admin | Carga todas las iglesias de un usuario |
| POST | `/` | JWT | — | Crea una asociación usuario-iglesia |
| PATCH | `/:userId` | JWT | — | Actualiza la fecha del último acceso y registra el acceso |
| DELETE | `/record/:userId/:churchId/:personId` | JWT | — | Elimina un registro usuario-iglesia |

## Preferencias de visibilidad

Ruta base: `/membership/visibilityPreferences`

| Método | Ruta | Autenticación | Permiso | Descripción |
|--------|------|------|------------|-------------|
| GET | `/my` | JWT | — | Obtiene las preferencias de visibilidad del usuario actual |
| POST | `/` | JWT | — | Guarda las preferencias de visibilidad (visibilidad de dirección, teléfono y correo electrónico) |

## Consulta

Ruta base: `/membership/query`

| Método | Ruta | Autenticación | Permiso | Descripción |
|--------|------|------|------------|-------------|
| POST | `/members` | JWT | — | Búsqueda de miembros en lenguaje natural mediante IA. Cuerpo: `{ text, subDomain, siteUrl }` |

## Errores del cliente

Ruta base: `/membership/clientErrors`

| Método | Ruta | Autenticación | Permiso | Descripción |
|--------|------|------|------------|-------------|
| POST | `/` | JWT | — | Registra un error del lado del cliente |

## Páginas relacionadas

- [Autenticación y permisos](./authentication): flujo de inicio de sesión, JWT, OAuth y modelo de permisos
- [Endpoints de asistencia](./attendance): seguimiento de servicios y visitas
- [Estructura de módulos](../module-structure): patrones de organización del código
