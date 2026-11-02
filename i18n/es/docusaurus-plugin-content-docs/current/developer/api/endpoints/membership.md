---
title: "Endpoints de Membership"
---

# Endpoints de Membership

<div class="article-intro">

El módulo Membership administra personas, iglesias, grupos, hogares, roles, permisos, formularios y configuración. Es el módulo más grande y proporciona la capa central de identidad y autorización para todos los demás módulos.

</div>

**Ruta base:** `/membership`

## Personas

Ruta base: `/membership/people`

| Método | Ruta | Autenticación | Permiso | Descripción |
|--------|------|---------------|---------|-------------|
| GET | `/` | JWT | People.View o Member | Enumera todas las personas de la iglesia |
| GET | `/:id` | JWT | People.View o su propio registro | Obtiene una persona por ID (incluye los envíos de formularios) |
| GET | `/ids?ids=` | JWT | People.View, Member o People.ViewNames | Obtiene varias personas por IDs separados por comas. Quienes llaman con People.ViewNames sin People.View reciben el modelo básico, y se omiten las personas que se dieron de baja (salvo quien llama) |
| GET | `/basic?ids=` | JWT | — | Obtiene información básica (solo el nombre) de varias personas |
| GET | `/names?ids=` | JWT | Cualquier permiso de la iglesia | `[{ id, name: { display, first, last }, photo }]`, ordenado por apellido y luego por nombre, para los IDs separados por comas que quien llama ya tiene, de modo que los roles sin People.View (donaciones, asistencia) puedan identificar a las personas. Sin búsqueda ni filtro de directorio |
| POST | `/names` | JWT | Cualquier permiso de la iglesia | Igual que `GET /names`. Cuerpo: `{ peopleIds }` (o `{ ids }`) |
| GET | `/recent` | JWT | People.View, Member o People.ViewNames | Personas agregadas recientemente. Quienes llaman con People.ViewNames sin People.View (incluso los miembros con acceso al directorio) reciben el modelo básico (`id`, `name.display`, `photo`, `membershipStatus`), y se omiten las personas que se dieron de baja |
| GET | `/guest-register/options?churchId=` | Pública | — | Lista de verificación del registro de invitados por QR: devuelve `{ email, phone, address, birthDate, gender, maritalStatus, grade, comments }`, cada uno con `"off"`, `"optional"` o `"required"` (se interpreta a partir de la configuración pública `guestRegistrationFields`; los valores faltantes o mal formados recurren a correo y teléfono como opcionales, y el resto desactivado). Requiere `enableQRGuestRegistration`, salvo que la solicitud incluya un token de sitio/iglesia coincidente; tiene límite de tasa (429) |
| GET | `/search?term=&email=` | JWT | People.View, Member o People.ViewNames | Busca personas por nombre o correo electrónico (hasta 100, ordenadas por apellido y luego por nombre). Quienes llaman con People.ViewNames sin People.View (incluso los miembros con acceso al directorio) obtienen una búsqueda por nombre que devuelve el modelo básico; una búsqueda por `email` devuelve `[]` |
| GET | `/search/phone?number=` | JWT | People.View o Member | Busca por número de teléfono |
| GET | `/search/group?groupId=` | JWT | People.View o Member | Obtiene las personas de un grupo específico |
| GET | `/household/:householdId` | JWT | — | Obtiene todas las personas de un hogar |
| GET | `/attendance` | JWT | People.Edit | Carga asistentes con filtros (campusId, serviceId, serviceTimeId, groupId, categoryName, startDate, endDate) |
| GET | `/timeline?personIds=&groupIds=` | JWT | — | Carga datos de línea de tiempo para personas y grupos |
| GET | `/directory/:id` | JWT | — | Obtiene una persona para la vista del directorio (respeta las preferencias de visibilidad) |
| GET | `/claim/:churchId` | JWT | — | Reclama un registro de persona para el usuario actual en una iglesia |
| POST | `/` | JWT | People.Edit o EditSelf | Crea o actualiza personas (por lote) |
| POST | `/search` | JWT | People.View, Member o People.ViewNames | Busca personas (variante POST). Cuerpo: `{ term }` o `{ email }`; mismas reglas de solo nombres que `GET /search` |
| POST | `/advancedSearch` | JWT | People.View o Member | Búsqueda de múltiples condiciones (edad, birthMonth, membershipStatus, etc.). El cuerpo es un arreglo de condiciones; un cuerpo vacío significa sin condiciones, y cualquier otro cuerpo que no sea un arreglo devuelve 400 |
| POST | `/loadOrCreate` | Pública | — | Busca o crea una persona por correo electrónico. Cuerpo: `{ churchId, email, firstName, lastName }` |
| POST | `/guest-register` | Pública | — | Registro de invitados por QR. Cuerpo: `{ churchId, members: [{ firstName, lastName, email?, phone?, birthDate?, gender?, grade? }], address?, maritalStatus?, comments? }` (de 1 a 10 miembros; email/phone/maritalStatus aplican solo al primer miembro). Los campos que la iglesia desactivó se descartan; los valores obligatorios faltantes o inválidos devuelven 400. Primero reutiliza personas existentes: un miembro coincide cuando exactamente una persona no eliminada tiene el mismo nombre (sin distinguir mayúsculas) y el mismo correo electrónico o los mismos dígitos de teléfono (casa, trabajo o celular); un miembro sin correo ni teléfono coincide por nombre dentro del hogar relacionado. Las personas relacionadas nunca se editan. Los miembros no relacionados se unen al hogar relacionado, o bien a un hogar nuevo (con el apellido del primer miembro), como `membershipStatus: "Visitor"` con la `address` compartida. Guarda `comments` como una nota en el primer miembro, agrega a todos al grupo privado `guestRegistrationGroupId` si está configurado, y, cuando `guestRegistrationRecordAttendance` es `"true"`, registra la asistencia en los horarios de servicio programados de ese grupo cuya ventana de registro esté abierta en este momento. Devuelve `{ householdId, people: [{ id, name }] }`, repitiendo los nombres enviados en lugar de los guardados. Las mismas reglas de consentimiento/token y de límite de tasa que la llamada de opciones |
| POST | `/household/:householdId` | JWT | People.Edit | Actualiza las asignaciones de miembros de un hogar |
| POST | `/public/email` | Pública | — | Envía un correo electrónico a una persona. Cuerpo: `{ churchId, personId, subject, body, appName }` |
| POST | `/apiEmails` | Interna | — | Carga los correos de personas por IDs (de servidor a servidor, requiere jwtSecret) |
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

## Usuarios {#users}

Ruta base: `/membership/users`

Consulte [Autenticación y permisos](./authentication) para los endpoints de inicio de sesión, registro y administración de contraseñas.

| Método | Ruta | Autenticación | Permiso | Descripción |
|--------|------|---------------|---------|-------------|
| POST | `/login` | Pública | — | Inicia sesión (correo/contraseña, renovación de JWT o authGuid) |
| POST | `/register` | Pública | — | Registra un nuevo usuario |
| POST | `/forgot` | Pública | — | Envía un correo de restablecimiento de contraseña |
| POST | `/setPasswordGuid` | Pública | — | Establece la contraseña con el GUID de autenticación del enlace del correo |
| POST | `/verifyCredentials` | Pública | — | Verifica correo y contraseña y devuelve las iglesias asociadas |
| POST | `/loadOrCreate` | JWT | — | Busca o crea un usuario por correo o userId |
| POST | `/setDisplayName` | JWT | — | Actualiza el nombre y el apellido del usuario |
| POST | `/updateEmail` | JWT | — | Cambia la dirección de correo electrónico del usuario |
| POST | `/updatePassword` | JWT | — | Cambia la contraseña del usuario (mínimo 6 caracteres) |
| POST | `/updateOptedOut` | JWT | — | Establece el estado de baja de una persona |
| POST | `/sendInviteEmail` | JWT | People.Edit | Envía por correo una invitación a una persona de esta iglesia (`email`, `personName`, `contextName`). El botón dice **Sign Up** para alguien sin cuenta y **Log In** para un usuario existente. Un usuario que nunca ha iniciado sesión recibe en cambio un enlace **Set Your Password** que caduca en 7 días. Es una plantilla fija, así que no cuenta para el límite diario de correos de la iglesia |
| GET | `/search?term=` | JWT | Server.Admin | Busca todos los usuarios por nombre o correo electrónico |
| DELETE | `/` | JWT | — | Elimina la cuenta del usuario actual |

## Iglesias

Ruta base: `/membership/churches`

| Método | Ruta | Autenticación | Permiso | Descripción |
|--------|------|---------------|---------|-------------|
| GET | `/` | JWT | — | Carga todas las iglesias del usuario actual |
| GET | `/:id` | JWT | — | Obtiene una iglesia por ID |
| GET | `/:id/getDomainAdmin` | JWT | — | Obtiene el usuario administrador de dominio de una iglesia |
| GET | `/:id/impersonate` | JWT | Server.Admin | Suplanta una iglesia (solo administrador del servidor) |
| GET | `/all?term=` | JWT | Server.Admin | Busca todas las iglesias (administración) |
| GET | `/search/?name=` | Pública | — | Busca iglesias por nombre |
| GET | `/lookup/?subDomain=&id=` | Pública | — | Busca una iglesia por subdominio o ID |
| POST | `/` | JWT | Settings.Edit | Actualiza los datos de la iglesia |
| POST | `/add` | JWT | — | Registra una nueva iglesia. Campos obligatorios: name, address1, city, state, zip, country |
| POST | `/search` | Pública | — | Busca iglesias por nombre (variante POST) |
| POST | `/select` | JWT | — | Selecciona o cambia a una iglesia. Cuerpo: `{ churchId }` o `{ subDomain }` |
| POST | `/:id/archive` | JWT | Server.Admin | Archiva o desarchiva una iglesia |
| POST | `/byIds` | Pública | — | Carga varias iglesias por IDs |
| DELETE | `/deleteAbandoned` | JWT | Server.Admin | Elimina las iglesias abandonadas durante 7 o más días |

## Grupos

Ruta base: `/membership/groups`

Extiende el CRUD estándar (GET `/`, GET `/:id` de la clase base).

| Método | Ruta | Autenticación | Permiso | Descripción |
|--------|------|---------------|---------|-------------|
| GET | `/` | JWT | — | Enumera todos los grupos |
| GET | `/:id` | JWT | — | Obtiene un grupo por ID |
| GET | `/search?campusId=&serviceId=&serviceTimeId=` | JWT | — | Busca grupos por filtros de servicio |
| GET | `/my` | JWT | — | Obtiene los grupos del usuario actual |
| GET | `/my/:tag` | JWT | — | Obtiene los grupos del usuario actual filtrados por etiqueta |
| GET | `/tag/:tag` | JWT | — | Obtiene todos los grupos con una etiqueta específica |
| GET | `/public/:churchId/:id` | Pública | — | Obtiene un grupo público por iglesia e ID |
| GET | `/public/:churchId/tag/:tag` | Pública | — | Obtiene grupos públicos por etiqueta |
| GET | `/public/:churchId/label?label=` | Pública | — | Obtiene grupos públicos por etiqueta de categoría |
| GET | `/public/:churchId/slug/:slug` | Pública | — | Obtiene un grupo público por slug |
| POST | `/` | JWT | Groups.Edit | Crea o actualiza grupos (genera el slug automáticamente) |
| DELETE | `/:id` | JWT | Groups.Edit | Elimina un grupo (también elimina los equipos hijos de los grupos de ministerio) |

## Miembros de grupo

Ruta base: `/membership/groupmembers`

Extiende el CRUD estándar (GET `/:id`, DELETE `/:id` de la clase base).

| Método | Ruta | Autenticación | Permiso | Descripción |
|--------|------|---------------|---------|-------------|
| GET | `/:id` | JWT | GroupMembers.View | Obtiene un miembro de grupo por ID |
| GET | `/` | JWT | GroupMembers.View* | Enumera los miembros de grupo. Filtre con `?groupId=`, `?groupIds=` o `?personId=`. *También se permite si el usuario está en el grupo o consulta su propio personId, y para `?groupId=` de cualquier grupo no confidencial cuando el usuario tiene Attendance.View o Attendance.Edit (se incluyen los miembros menores de 13 años para ellos) |
| GET | `/my` | JWT | — | Obtiene las membresías de grupo del usuario actual |
| GET | `/basic/:groupId` | JWT | — | Obtiene la lista básica de miembros de un grupo |
| GET | `/public/leaders/:churchId/:groupId` | Pública | — | Obtiene los líderes de un grupo (público) |
| GET | `/public/:churchId/:groupId` | Pública | — | Obtiene la lista pública de un grupo (campos mínimos: `personId`, `displayName`, `leader`, foto). Solo cuando el grupo se incluye mediante `publicRoster`; alimenta el elemento `staffGrid` del creador de sitios web |
| POST | `/` | JWT | GroupMembers.Edit | Agrega o actualiza miembros de grupo |
| DELETE | `/:id` | JWT | GroupMembers.View | Quita un miembro de grupo |

## Hogares

Ruta base: `/membership/households`

Controlador CRUD estándar.

| Método | Ruta | Autenticación | Permiso | Descripción |
|--------|------|---------------|---------|-------------|
| GET | `/` | JWT | — | Enumera todos los hogares |
| GET | `/:id` | JWT | — | Obtiene un hogar por ID |
| POST | `/` | JWT | People.Edit | Crea o actualiza hogares |
| DELETE | `/:id` | JWT | People.Edit | Elimina un hogar |

## Roles

Ruta base: `/membership/roles`

| Método | Ruta | Autenticación | Permiso | Descripción |
|--------|------|---------------|---------|-------------|
| GET | `/:id` | JWT | Roles.View | Obtiene un rol por ID |
| GET | `/church/:churchId` | JWT | Roles.View | Obtiene todos los roles de una iglesia. Cada rol incluye `memberCount`, el número de usuarios distintos que contiene |
| POST | `/` | JWT | Roles.Edit | Crea o actualiza roles |
| DELETE | `/:id` | JWT | Roles.Edit | Elimina un rol (también elimina sus permisos y miembros) |

## Miembros de roles

Ruta base: `/membership/rolemembers`

| Método | Ruta | Autenticación | Permiso | Descripción |
|--------|------|---------------|---------|-------------|
| GET | `/roles/:id` | JWT | Roles.View | Obtiene los miembros de un rol. Agregue `?include=users` para incluir los detalles de usuario |
| POST | `/` | JWT | Roles.Edit | Agrega miembros a un rol (crea el usuario si el correo no existe) |
| DELETE | `/:id` | JWT | Roles.View | Quita un miembro de un rol |
| DELETE | `/self/:churchId/:userId` | JWT | — | Quítese a sí mismo de una iglesia |

## Permisos de roles

Ruta base: `/membership/rolepermissions`

| Método | Ruta | Autenticación | Permiso | Descripción |
|--------|------|---------------|---------|-------------|
| GET | `/roles/:id` | JWT | Roles.View | Obtiene los permisos de un rol (use `null` como ID para el rol "Everyone") |
| POST | `/` | JWT | Roles.Edit | Crea o actualiza permisos de roles |
| DELETE | `/:id` | JWT | Roles.Edit | Elimina un permiso de rol |

## Permisos

Ruta base: `/membership/permissions`

| Método | Ruta | Autenticación | Permiso | Descripción |
|--------|------|---------------|---------|-------------|
| GET | `/` | JWT | — | Obtiene la lista completa de permisos disponibles |

Cada entrada tiene `apiName`, `section` (tipo de contenido), `action` y las etiquetas `displaySection` / `displayAction` que muestra el editor de roles de B1Admin. Adiciones recientes: `MembershipApi` / `People` / `View Names` (**View People Names Only**, en Personas y grupos) y `GivingApi` / `Donations` / `Enter` (**Enter Donations**, en Donaciones; consulte [Lotes de donaciones](./giving.md#donation-batches)).

## Formularios

Ruta base: `/membership/forms`

| Método | Ruta | Autenticación | Permiso | Descripción |
|--------|------|---------------|---------|-------------|
| GET | `/` | JWT | Forms.Admin o Forms.Edit | Enumera todos los formularios (el administrador ve todos; los editores ven los asignados y los formularios que no son de personas) |
| GET | `/:id` | JWT | Acceso al formulario | Obtiene un formulario por ID |
| GET | `/archived` | JWT | Forms.Admin o Forms.Edit | Enumera los formularios archivados |
| GET | `/group/:groupId` | JWT | Miembro del grupo, líder del grupo o Forms.Admin | Formularios independientes vinculados al grupo (`forms.groupId`), sin los archivados, ordenados por nombre. Devuelve `id`, `name`, `description` y `open` (dentro de la ventana de disponibilidad). Los miembros solo obtienen los formularios abiertos; los líderes y los administradores de formularios también obtienen los cerrados. Alimenta los formularios vinculados de la página del grupo |
| GET | `/standalone/:id?churchId=` | JWT | — | Obtiene un formulario independiente (los formularios restringidos requieren autenticación) |
| POST | `/` | JWT | Forms.Admin o Forms.Edit | Crea o actualiza formularios. Los formularios independientes aceptan un `photoUrl` opcional (foto de encabezado que se muestra encima del formulario) y un `groupId` (grupo vinculado) |
| DELETE | `/:id` | JWT | Acceso al formulario | Elimina un formulario |

## Envíos de formularios

Ruta base: `/membership/formsubmissions`

| Método | Ruta | Autenticación | Permiso | Descripción |
|--------|------|---------------|---------|-------------|
| GET | `/` | JWT | Forms.Admin o Forms.Edit | Enumera los envíos. Filtre con `?personId=` o `?formId=` |
| GET | `/my?include=questions,answers` | JWT | — | Limitado al propio usuario: hasta 50 envíos de formularios independientes (no de formularios de personas) que el miembro con sesión iniciada envió o que están vinculados a su persona (`contentType` `person`, `contentId` = su id de persona; por ejemplo, después de un cambio de persona hecho por un administrador), del más reciente al más antiguo, cada uno con `form.name`. `include` adjunta las preguntas de cada formulario y las respuestas del envío. Devuelve `401` si el usuario no está vinculado a una persona. Alimenta la sección **My Forms** de la página Me de B1 |
| GET | `/group/:groupId` | JWT | Líder del grupo | Respuestas para los líderes del grupo: una entrada por cada formulario vinculado y por cada evento del grupo con un formulario de inscripción, cada una con `form`, `event` (`id`, `title`, `start`; solo en las entradas de eventos), `questions` y `submissions` (con `answers` y `personName`, `null` si es anónimo) |
| GET | `/:id` | JWT | Forms.Admin, Forms.Edit o acceso de vista | Obtiene un envío por ID. Agregue `?include=form,questions,answers`. Los líderes del grupo vinculado al formulario, y los líderes del grupo al que pertenece una inscripción a un evento, también pueden leerlo |
| GET | `/formId/:formId` | JWT | Acceso al formulario (vista) | Obtiene todos los envíos de un formulario (incluye form, questions, answers). Los líderes del grupo vinculado al formulario tienen acceso de vista |
| POST | `/` | JWT | — | Envía las respuestas del formulario (maneja formularios restringidos y no restringidos, y envía notificaciones por correo). Cuando el formulario tiene `autoCreatePerson`, busca o crea una persona Invitado por correo electrónico y vincula el envío; cuando el formulario también tiene `groupId`, agrega a esa persona al grupo; cuando `followUpSubject`/`followUpBody` están configurados, envía un correo de seguimiento con plantilla a quien envió. A menos que quien llama pueda administrar el formulario, `submittedBy` siempre se establece como la persona del miembro con sesión iniciada (o se deja vacío en los envíos anónimos) |
| DELETE | `/:id` | JWT | Forms.Admin o Forms.Edit | Elimina un envío y sus respuestas |

## Preguntas

Ruta base: `/membership/questions`

| Método | Ruta | Autenticación | Permiso | Descripción |
|--------|------|---------------|---------|-------------|
| GET | `/` | JWT | Acceso al formulario | Enumera las preguntas de un formulario. Requiere `?formId=` |
| GET | `/:id` | JWT | Acceso al formulario | Obtiene una pregunta por ID |
| GET | `/unrestricted?formId=` | JWT | — | Obtiene las preguntas de un formulario no restringido |
| GET | `/sort/:id/up` | JWT | — | Sube una pregunta en el orden |
| GET | `/sort/:id/down` | JWT | — | Baja una pregunta en el orden |
| POST | `/` | JWT | Acceso al formulario | Crea o actualiza preguntas (asigna el orden automáticamente) |
| DELETE | `/:id?formId=` | JWT | Acceso al formulario | Elimina una pregunta |

## Respuestas

Ruta base: `/membership/answers`

| Método | Ruta | Autenticación | Permiso | Descripción |
|--------|------|---------------|---------|-------------|
| GET | `/` | JWT | Forms.Admin o Forms.Edit | Enumera las respuestas. Filtre con `?formSubmissionId=` |
| POST | `/` | JWT | Forms.Admin o Forms.Edit | Crea o actualiza respuestas |

## Permisos de miembros

Ruta base: `/membership/memberpermissions`

Controla el acceso de cada miembro a formularios específicos.

| Método | Ruta | Autenticación | Permiso | Descripción |
|--------|------|---------------|---------|-------------|
| GET | `/:id` | JWT | Acceso al formulario | Obtiene un permiso de miembro por ID |
| GET | `/member/:id` | JWT | Acceso al formulario | Obtiene todos los permisos de formulario de un miembro |
| GET | `/form/:id` | JWT | Acceso al formulario | Obtiene todos los permisos de miembros de un formulario |
| GET | `/form/:id/my` | JWT | Acceso al formulario | Obtiene el permiso del usuario actual para un formulario |
| POST | `/` | JWT | Acceso al formulario | Crea o actualiza permisos de miembros |
| DELETE | `/:id?formId=` | JWT | Acceso al formulario | Elimina un permiso de miembro |
| DELETE | `/member/:id?formId=` | JWT | Acceso al formulario | Elimina todos los permisos de un miembro sobre un formulario |

## Configuración

Ruta base: `/membership/settings`

| Método | Ruta | Autenticación | Permiso | Descripción |
|--------|------|---------------|---------|-------------|
| GET | `/` | JWT | Settings.Edit | Obtiene toda la configuración de la iglesia |
| GET | `/public/:churchId` | Pública | — | Obtiene la configuración pública de una iglesia |
| POST | `/` | JWT | Settings.Edit | Guarda la configuración (admite la subida de imágenes en base64) |

## Dominios

Ruta base: `/membership/domains`

Extiende el CRUD estándar (GET `/:id`, GET `/`, DELETE `/:id` de la clase base).

| Método | Ruta | Autenticación | Permiso | Descripción |
|--------|------|---------------|---------|-------------|
| GET | `/` | JWT | — | Enumera todos los dominios |
| GET | `/:id` | JWT | — | Obtiene un dominio por ID |
| GET | `/lookup/:domainName` | JWT | — | Busca un dominio por nombre |
| GET | `/public/lookup/:domainName` | Pública | — | Búsqueda pública de dominio por nombre |
| GET | `/health/check` | Pública | — | Ejecuta una comprobación de salud de los dominios sin revisar |
| POST | `/` | JWT | Settings.Edit | Crea o actualiza dominios (activa la actualización de Caddy) |
| DELETE | `/:id` | JWT | Settings.Edit | Elimina un dominio |

## UserChurch

Ruta base: `/membership/userchurch`

Administra la asociación entre usuarios e iglesias.

| Método | Ruta | Autenticación | Permiso | Descripción |
|--------|------|---------------|---------|-------------|
| GET | `/userid/:userId` | JWT | — | Obtiene el registro usuario-iglesia por ID de usuario |
| GET | `/personid/:personId` | JWT | — | Obtiene el correo electrónico del usuario vinculado a una persona |
| GET | `/user/:userId` | JWT | Server.Admin | Carga todas las iglesias de un usuario |
| POST | `/` | JWT | — | Crea una asociación usuario-iglesia |
| PATCH | `/:userId` | JWT | — | Actualiza la hora del último acceso y registra el acceso |
| DELETE | `/record/:userId/:churchId/:personId` | JWT | — | Elimina un registro usuario-iglesia |

## Preferencias de visibilidad

Ruta base: `/membership/visibilityPreferences`

| Método | Ruta | Autenticación | Permiso | Descripción |
|--------|------|---------------|---------|-------------|
| GET | `/my` | JWT | — | Obtiene las preferencias de visibilidad del usuario actual |
| POST | `/` | JWT | — | Guarda las preferencias de visibilidad (visibilidad de dirección, teléfono y correo) |

## Consulta

Ruta base: `/membership/query`

| Método | Ruta | Autenticación | Permiso | Descripción |
|--------|------|---------------|---------|-------------|
| POST | `/members` | JWT | — | Búsqueda de miembros en lenguaje natural con IA. Cuerpo: `{ text, subDomain, siteUrl }` |

## Errores del cliente

Ruta base: `/membership/clientErrors`

| Método | Ruta | Autenticación | Permiso | Descripción |
|--------|------|---------------|---------|-------------|
| POST | `/` | JWT | — | Registra un error del lado del cliente |

## Páginas relacionadas

- [Autenticación y permisos](./authentication): flujo de inicio de sesión, JWT, OAuth y modelo de permisos
- [Endpoints de Attendance](./attendance): seguimiento de servicios y visitas
- [Estructura de módulos](../module-structure): patrones de organización del código
