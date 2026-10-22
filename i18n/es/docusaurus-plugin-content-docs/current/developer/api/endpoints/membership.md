---
title: "Endpoints de membresía"
---

# Endpoints de membresía

<div class="article-intro">

El módulo Membership gestiona personas, iglesias, grupos, hogares, roles, permisos, formularios y configuración. Es el módulo más grande y proporciona la capa central de identidad y autorización para todos los demás módulos.

</div>

**Ruta base:** `/membership`

## Personas

Ruta base: `/membership/people`

| Método | Ruta | Autenticación | Permiso | Descripción |
|--------|------|---------------|---------|-------------|
| GET | `/` | JWT | People.View o Member | Listar todas las personas de la iglesia |
| GET | `/:id` | JWT | People.View o su propio registro | Obtener una persona por ID (incluye los envíos de formularios) |
| GET | `/ids?ids=` | JWT | People.View, Member o People.ViewNames | Obtener varias personas por IDs separados por comas. Quienes tienen People.ViewNames sin People.View reciben el modelo básico, y se excluyen las personas que han optado por no aparecer (salvo el propio solicitante) |
| GET | `/basic?ids=` | JWT | — | Obtener información básica (solo el nombre) de varias personas |
| GET | `/names?ids=` | JWT | Cualquier permiso de la iglesia | `[{ id, name: { display, first, last }, photo }]`, ordenado por apellido y luego por nombre, para los IDs separados por comas que el solicitante ya tiene. Así, los roles sin People.View (donaciones, asistencia) pueden identificar a las personas. Sin búsqueda ni filtro de directorio |
| POST | `/names` | JWT | Cualquier permiso de la iglesia | Igual que `GET /names`. Cuerpo: `{ peopleIds }` (o `{ ids }`) |
| GET | `/recent` | JWT | People.View, Member o People.ViewNames | Personas añadidas recientemente. Quienes tienen People.ViewNames sin People.View (incluso los miembros con acceso al directorio) reciben el modelo básico (`id`, `name.display`, `photo`, `membershipStatus`), y se excluyen las personas que han optado por no aparecer |
| GET | `/search?term=&email=` | JWT | People.View, Member o People.ViewNames | Buscar personas por nombre o correo electrónico (hasta 100, ordenadas por apellido y luego por nombre). Quienes tienen People.ViewNames sin People.View (incluso los miembros con acceso al directorio) reciben una búsqueda por nombre que devuelve el modelo básico; una búsqueda por `email` devuelve `[]` |
| GET | `/search/phone?number=` | JWT | People.View o Member | Buscar por número de teléfono |
| GET | `/search/group?groupId=` | JWT | People.View o Member | Obtener las personas de un grupo concreto |
| GET | `/household/:householdId` | JWT | — | Obtener todas las personas de un hogar |
| GET | `/attendance` | JWT | People.Edit | Cargar asistentes con filtros (campusId, serviceId, serviceTimeId, groupId, categoryName, startDate, endDate) |
| GET | `/timeline?personIds=&groupIds=` | JWT | — | Cargar los datos de la línea de tiempo de personas y grupos |
| GET | `/directory/:id` | JWT | — | Obtener una persona para la vista de directorio (respeta las preferencias de visibilidad) |
| GET | `/claim/:churchId` | JWT | — | Reclamar un registro de persona para el usuario actual en una iglesia |
| POST | `/` | JWT | People.Edit o EditSelf | Crear o actualizar personas (por lotes) |
| POST | `/search` | JWT | People.View, Member o People.ViewNames | Buscar personas (variante POST). Cuerpo: `{ term }` o `{ email }`; las mismas reglas de solo nombres que `GET /search` |
| POST | `/advancedSearch` | JWT | People.View o Member | Búsqueda con varias condiciones (edad, birthMonth, membershipStatus, etc.) |
| POST | `/loadOrCreate` | Pública | — | Buscar o crear una persona por correo electrónico. Cuerpo: `{ churchId, email, firstName, lastName }` |
| POST | `/household/:householdId` | JWT | People.Edit | Actualizar las asignaciones de miembros del hogar |
| POST | `/public/email` | Pública | — | Enviar un correo electrónico a una persona. Cuerpo: `{ churchId, personId, subject, body, appName }` |
| POST | `/apiEmails` | Interna | — | Cargar los correos electrónicos de personas por IDs (de servidor a servidor; requiere jwtSecret) |
| DELETE | `/:id` | JWT | People.Edit | Eliminar una persona |

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

Consulta [Autenticación y permisos](./authentication) para ver los endpoints de inicio de sesión, registro y gestión de contraseñas.

| Método | Ruta | Autenticación | Permiso | Descripción |
|--------|------|---------------|---------|-------------|
| POST | `/login` | Pública | — | Iniciar sesión (correo y contraseña, renovación de JWT o authGuid) |
| POST | `/register` | Pública | — | Registrar un nuevo usuario |
| POST | `/forgot` | Pública | — | Enviar un correo de restablecimiento de contraseña |
| POST | `/setPasswordGuid` | Pública | — | Establecer la contraseña usando el GUID de autenticación del enlace del correo |
| POST | `/verifyCredentials` | Pública | — | Verificar el correo y la contraseña y devolver las iglesias asociadas |
| POST | `/loadOrCreate` | JWT | — | Buscar o crear un usuario por correo electrónico o userId |
| POST | `/setDisplayName` | JWT | — | Actualizar el nombre y los apellidos del usuario |
| POST | `/updateEmail` | JWT | — | Cambiar la dirección de correo electrónico del usuario |
| POST | `/updatePassword` | JWT | — | Cambiar la contraseña del usuario (mínimo 6 caracteres) |
| POST | `/updateOptedOut` | JWT | — | Establecer el estado de exclusión (opted-out) de una persona |
| POST | `/sendInviteEmail` | JWT | People.Edit | Enviar un correo de invitación a una persona de esta iglesia (`email`, `personName`, `contextName`). El botón dice **Sign Up** para quien no tiene cuenta y **Log In** para un usuario existente. Un usuario que nunca ha iniciado sesión recibe en cambio un enlace **Set Your Password** que caduca en 7 días. Es una plantilla fija, así que no cuenta para el límite diario de correos de la iglesia |
| GET | `/search?term=` | JWT | Server.Admin | Buscar todos los usuarios por nombre o correo electrónico |
| DELETE | `/` | JWT | — | Eliminar la cuenta del usuario actual |

## Iglesias

Ruta base: `/membership/churches`

| Método | Ruta | Autenticación | Permiso | Descripción |
|--------|------|---------------|---------|-------------|
| GET | `/` | JWT | — | Cargar todas las iglesias del usuario actual |
| GET | `/:id` | JWT | — | Obtener una iglesia por ID |
| GET | `/:id/getDomainAdmin` | JWT | — | Obtener el usuario administrador de dominio de una iglesia |
| GET | `/:id/impersonate` | JWT | Server.Admin | Suplantar una iglesia (solo administradores del servidor) |
| GET | `/all?term=` | JWT | Server.Admin | Buscar todas las iglesias (administración) |
| GET | `/search/?name=` | Pública | — | Buscar iglesias por nombre |
| GET | `/lookup/?subDomain=&id=` | Pública | — | Buscar una iglesia por subdominio o ID |
| POST | `/` | JWT | Settings.Edit | Actualizar los datos de la iglesia |
| POST | `/add` | JWT | — | Registrar una nueva iglesia. Campos obligatorios: name, address1, city, state, zip, country |
| POST | `/search` | Pública | — | Buscar iglesias por nombre (variante POST) |
| POST | `/select` | JWT | — | Seleccionar o cambiar a una iglesia. Cuerpo: `{ churchId }` o `{ subDomain }` |
| POST | `/:id/archive` | JWT | Server.Admin | Archivar o desarchivar una iglesia |
| POST | `/byIds` | Pública | — | Cargar varias iglesias por IDs |
| DELETE | `/deleteAbandoned` | JWT | Server.Admin | Eliminar las iglesias abandonadas durante 7 días o más |

## Grupos

Ruta base: `/membership/groups`

Extiende el CRUD estándar (GET `/`, GET `/:id` de la clase base).

| Método | Ruta | Autenticación | Permiso | Descripción |
|--------|------|---------------|---------|-------------|
| GET | `/` | JWT | — | Listar todos los grupos |
| GET | `/:id` | JWT | — | Obtener un grupo por ID |
| GET | `/search?campusId=&serviceId=&serviceTimeId=` | JWT | — | Buscar grupos por filtros de servicio |
| GET | `/my` | JWT | — | Obtener los grupos del usuario actual |
| GET | `/my/:tag` | JWT | — | Obtener los grupos del usuario actual filtrados por etiqueta |
| GET | `/tag/:tag` | JWT | — | Obtener todos los grupos con una etiqueta concreta |
| GET | `/public/:churchId/:id` | Pública | — | Obtener un grupo público por iglesia e ID |
| GET | `/public/:churchId/tag/:tag` | Pública | — | Obtener grupos públicos por etiqueta |
| GET | `/public/:churchId/label?label=` | Pública | — | Obtener grupos públicos por etiqueta de categoría (label) |
| GET | `/public/:churchId/slug/:slug` | Pública | — | Obtener un grupo público por slug |
| POST | `/` | JWT | Groups.Edit | Crear o actualizar grupos (genera el slug automáticamente) |
| DELETE | `/:id` | JWT | Groups.Edit | Eliminar un grupo (también elimina los equipos secundarios de los grupos de ministerio) |

## Miembros de grupo

Ruta base: `/membership/groupmembers`

Extiende el CRUD estándar (GET `/:id`, DELETE `/:id` de la clase base).

| Método | Ruta | Autenticación | Permiso | Descripción |
|--------|------|---------------|---------|-------------|
| GET | `/:id` | JWT | GroupMembers.View | Obtener un miembro de grupo por ID |
| GET | `/` | JWT | GroupMembers.View* | Listar los miembros de grupo. Filtrar con `?groupId=`, `?groupIds=` o `?personId=`. *También se permite si el usuario está en el grupo o consulta su propio personId, y para `?groupId=` de cualquier grupo no confidencial cuando el usuario tiene Attendance.View o Attendance.Edit (se incluyen los miembros menores de 13 años para ellos) |
| GET | `/my` | JWT | — | Obtener las membresías de grupo del usuario actual |
| GET | `/basic/:groupId` | JWT | — | Obtener la lista básica de miembros de un grupo |
| GET | `/public/leaders/:churchId/:groupId` | Pública | — | Obtener los líderes de un grupo (público) |
| GET | `/public/:churchId/:groupId` | Pública | — | Obtener la lista pública de un grupo (campos mínimos: `personId`, `displayName`, `leader`, photo). Solo cuando el grupo lo activa mediante `publicRoster`; alimenta el elemento `staffGrid` del creador de sitios web |
| POST | `/` | JWT | GroupMembers.Edit | Añadir o actualizar miembros de grupo |
| DELETE | `/:id` | JWT | GroupMembers.View | Quitar un miembro de grupo |

## Hogares

Ruta base: `/membership/households`

Controlador CRUD estándar.

| Método | Ruta | Autenticación | Permiso | Descripción |
|--------|------|---------------|---------|-------------|
| GET | `/` | JWT | — | Listar todos los hogares |
| GET | `/:id` | JWT | — | Obtener un hogar por ID |
| POST | `/` | JWT | People.Edit | Crear o actualizar hogares |
| DELETE | `/:id` | JWT | People.Edit | Eliminar un hogar |

## Roles

Ruta base: `/membership/roles`

| Método | Ruta | Autenticación | Permiso | Descripción |
|--------|------|---------------|---------|-------------|
| GET | `/:id` | JWT | Roles.View | Obtener un rol por ID |
| GET | `/church/:churchId` | JWT | Roles.View | Obtener todos los roles de una iglesia |
| POST | `/` | JWT | Roles.Edit | Crear o actualizar roles |
| DELETE | `/:id` | JWT | Roles.Edit | Eliminar un rol (también elimina sus permisos y miembros) |

## Miembros de roles

Ruta base: `/membership/rolemembers`

| Método | Ruta | Autenticación | Permiso | Descripción |
|--------|------|---------------|---------|-------------|
| GET | `/roles/:id` | JWT | Roles.View | Obtener los miembros de un rol. Añade `?include=users` para incluir los detalles de los usuarios |
| POST | `/` | JWT | Roles.Edit | Añadir miembros a un rol (crea el usuario si el correo no existe) |
| DELETE | `/:id` | JWT | Roles.View | Quitar un miembro de un rol |
| DELETE | `/self/:churchId/:userId` | JWT | — | Quitarte a ti mismo de una iglesia |

## Permisos de roles

Ruta base: `/membership/rolepermissions`

| Método | Ruta | Autenticación | Permiso | Descripción |
|--------|------|---------------|---------|-------------|
| GET | `/roles/:id` | JWT | Roles.View | Obtener los permisos de un rol (usa `null` como ID para el rol "Everyone") |
| POST | `/` | JWT | Roles.Edit | Crear o actualizar permisos de roles |
| DELETE | `/:id` | JWT | Roles.Edit | Eliminar un permiso de rol |

## Permisos

Ruta base: `/membership/permissions`

| Método | Ruta | Autenticación | Permiso | Descripción |
|--------|------|---------------|---------|-------------|
| GET | `/` | JWT | — | Obtener la lista completa de permisos disponibles |

Cada entrada tiene `apiName`, `section` (tipo de contenido), `action` y las etiquetas `displaySection` / `displayAction` que muestra el editor de roles de B1Admin. Adiciones recientes: `MembershipApi` / `People` / `View Names` (**View People Names Only**, en People and Groups) y `GivingApi` / `Donations` / `Enter` (**Enter Donations**, en Donations; consulta [Lotes de donaciones](./giving.md#donation-batches)).

## Formularios

Ruta base: `/membership/forms`

| Método | Ruta | Autenticación | Permiso | Descripción |
|--------|------|---------------|---------|-------------|
| GET | `/` | JWT | Forms.Admin o Forms.Edit | Listar todos los formularios (el administrador ve todos; los editores ven los asignados y los formularios que no son de miembros) |
| GET | `/:id` | JWT | Acceso al formulario | Obtener un formulario por ID |
| GET | `/archived` | JWT | Forms.Admin o Forms.Edit | Listar los formularios archivados |
| GET | `/standalone/:id?churchId=` | JWT | — | Obtener un formulario independiente (los formularios restringidos requieren autenticación) |
| POST | `/` | JWT | Forms.Admin o Forms.Edit | Crear o actualizar formularios |
| DELETE | `/:id` | JWT | Acceso al formulario | Eliminar un formulario |

## Envíos de formularios

Ruta base: `/membership/formsubmissions`

| Método | Ruta | Autenticación | Permiso | Descripción |
|--------|------|---------------|---------|-------------|
| GET | `/` | JWT | Forms.Admin o Forms.Edit | Listar los envíos. Filtrar con `?personId=` o `?formId=` |
| GET | `/my?include=questions,answers` | JWT | — | Solo del propio usuario: hasta 50 envíos de formularios independientes (no de formularios de persona) que envió el miembro que inició sesión, del más reciente al más antiguo, cada uno con `form.name`. `include` añade las preguntas de cada formulario y las respuestas del envío. Devuelve `401` si el usuario no está vinculado a una persona. Alimenta la sección **My Forms** de la página Me de B1 |
| GET | `/:id` | JWT | Forms.Admin o Forms.Edit | Obtener un envío por ID. Añade `?include=form,questions,answers` |
| GET | `/formId/:formId` | JWT | Acceso al formulario | Obtener todos los envíos de un formulario (incluye el formulario, las preguntas y las respuestas) |
| POST | `/` | JWT | — | Enviar las respuestas del formulario (gestiona formularios restringidos y no restringidos, y envía notificaciones por correo). Cuando el formulario tiene `autoCreatePerson`, busca o crea una persona Guest por correo electrónico y vincula el envío; cuando se definen `followUpSubject`/`followUpBody`, envía al remitente un correo de seguimiento basado en plantilla. Salvo que quien envía pueda administrar el formulario, `submittedBy` siempre se establece como la persona del miembro que inició sesión (o queda vacío en envíos anónimos) |
| DELETE | `/:id` | JWT | Forms.Admin o Forms.Edit | Eliminar un envío y sus respuestas |

## Preguntas

Ruta base: `/membership/questions`

| Método | Ruta | Autenticación | Permiso | Descripción |
|--------|------|---------------|---------|-------------|
| GET | `/` | JWT | Acceso al formulario | Listar las preguntas de un formulario. Requiere `?formId=` |
| GET | `/:id` | JWT | Acceso al formulario | Obtener una pregunta por ID |
| GET | `/unrestricted?formId=` | JWT | — | Obtener las preguntas de un formulario no restringido |
| GET | `/sort/:id/up` | JWT | — | Subir una pregunta en el orden |
| GET | `/sort/:id/down` | JWT | — | Bajar una pregunta en el orden |
| POST | `/` | JWT | Acceso al formulario | Crear o actualizar preguntas (asigna el orden automáticamente) |
| DELETE | `/:id?formId=` | JWT | Acceso al formulario | Eliminar una pregunta |

## Respuestas

Ruta base: `/membership/answers`

| Método | Ruta | Autenticación | Permiso | Descripción |
|--------|------|---------------|---------|-------------|
| GET | `/` | JWT | Forms.Admin o Forms.Edit | Listar respuestas. Filtrar con `?formSubmissionId=` |
| POST | `/` | JWT | Forms.Admin o Forms.Edit | Crear o actualizar respuestas |

## Permisos de miembros

Ruta base: `/membership/memberpermissions`

Controla el acceso de cada miembro a formularios concretos.

| Método | Ruta | Autenticación | Permiso | Descripción |
|--------|------|---------------|---------|-------------|
| GET | `/:id` | JWT | Acceso al formulario | Obtener un permiso de miembro por ID |
| GET | `/member/:id` | JWT | Acceso al formulario | Obtener todos los permisos de formulario de un miembro |
| GET | `/form/:id` | JWT | Acceso al formulario | Obtener todos los permisos de miembros de un formulario |
| GET | `/form/:id/my` | JWT | Acceso al formulario | Obtener el permiso del usuario actual para un formulario |
| POST | `/` | JWT | Acceso al formulario | Crear o actualizar permisos de miembros |
| DELETE | `/:id?formId=` | JWT | Acceso al formulario | Eliminar un permiso de miembro |
| DELETE | `/member/:id?formId=` | JWT | Acceso al formulario | Eliminar todos los permisos de un miembro sobre un formulario |

## Configuración

Ruta base: `/membership/settings`

| Método | Ruta | Autenticación | Permiso | Descripción |
|--------|------|---------------|---------|-------------|
| GET | `/` | JWT | Settings.Edit | Obtener toda la configuración de la iglesia |
| GET | `/public/:churchId` | Pública | — | Obtener la configuración pública de una iglesia |
| POST | `/` | JWT | Settings.Edit | Guardar la configuración (admite la carga de imágenes en base64) |

## Dominios

Ruta base: `/membership/domains`

Extiende el CRUD estándar (GET `/:id`, GET `/`, DELETE `/:id` de la clase base).

| Método | Ruta | Autenticación | Permiso | Descripción |
|--------|------|---------------|---------|-------------|
| GET | `/` | JWT | — | Listar todos los dominios |
| GET | `/:id` | JWT | — | Obtener un dominio por ID |
| GET | `/lookup/:domainName` | JWT | — | Buscar un dominio por nombre |
| GET | `/public/lookup/:domainName` | Pública | — | Búsqueda pública de un dominio por nombre |
| GET | `/health/check` | Pública | — | Ejecutar una comprobación de estado en los dominios sin verificar |
| POST | `/` | JWT | Settings.Edit | Crear o actualizar dominios (activa la actualización de Caddy) |
| DELETE | `/:id` | JWT | Settings.Edit | Eliminar un dominio |

## Usuario-iglesia

Ruta base: `/membership/userchurch`

Administra la asociación entre usuarios e iglesias.

| Método | Ruta | Autenticación | Permiso | Descripción |
|--------|------|---------------|---------|-------------|
| GET | `/userid/:userId` | JWT | — | Obtener el registro usuario-iglesia por ID de usuario |
| GET | `/personid/:personId` | JWT | — | Obtener el correo electrónico del usuario vinculado a una persona |
| GET | `/user/:userId` | JWT | Server.Admin | Cargar todas las iglesias de un usuario |
| POST | `/` | JWT | — | Crear una asociación usuario-iglesia |
| PATCH | `/:userId` | JWT | — | Actualizar la hora del último acceso y registrar el acceso |
| DELETE | `/record/:userId/:churchId/:personId` | JWT | — | Eliminar un registro usuario-iglesia |

## Preferencias de visibilidad

Ruta base: `/membership/visibilityPreferences`

| Método | Ruta | Autenticación | Permiso | Descripción |
|--------|------|---------------|---------|-------------|
| GET | `/my` | JWT | — | Obtener las preferencias de visibilidad del usuario actual |
| POST | `/` | JWT | — | Guardar las preferencias de visibilidad (visibilidad de dirección, teléfono y correo electrónico) |

## Consulta

Ruta base: `/membership/query`

| Método | Ruta | Autenticación | Permiso | Descripción |
|--------|------|---------------|---------|-------------|
| POST | `/members` | JWT | — | Búsqueda de miembros en lenguaje natural con IA. Cuerpo: `{ text, subDomain, siteUrl }` |

## Errores del cliente

Ruta base: `/membership/clientErrors`

| Método | Ruta | Autenticación | Permiso | Descripción |
|--------|------|---------------|---------|-------------|
| POST | `/` | JWT | — | Registrar un error del lado del cliente |

## Páginas relacionadas

- [Autenticación y permisos](./authentication) — Flujo de inicio de sesión, JWT, OAuth, modelo de permisos
- [Endpoints de asistencia](./attendance) — Seguimiento de servicios y visitas
- [Estructura del módulo](../module-structure) — Patrones de organización del código
