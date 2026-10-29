---
title: "Endpoints de Membership"
---

# Endpoints de Membership

<div class="article-intro">

El módulo Membership administra personas, iglesias, grupos, hogares, roles, permisos, formularios y configuraciones. Es el módulo más grande y proporciona la capa central de identidad y autorización para todos los demás módulos.

</div>

**Ruta base:** `/membership`

## Personas

Ruta base: `/membership/people`

| Método | Ruta | Autenticación | Permiso | Descripción |
|--------|------|---------------|---------|-------------|
| GET | `/` | JWT | People.View o Member | Listar todas las personas de la iglesia |
| GET | `/:id` | JWT | People.View o su propio registro | Obtener una persona por ID (incluye envíos de formularios) |
| GET | `/ids?ids=` | JWT | People.View, Member o People.ViewNames | Obtener varias personas por IDs separados por comas. Quienes llaman con People.ViewNames sin People.View reciben el modelo básico, con las personas que cancelaron la suscripción excluidas (excepto quien llama) |
| GET | `/basic?ids=` | JWT | — | Obtener información básica (solo nombre) de varias personas |
| GET | `/names?ids=` | JWT | Cualquier permiso de la iglesia | `[{ id, name: { display, first, last }, photo }]`, ordenado por apellido y luego por nombre, para los ids separados por comas que quien llama ya tiene, de modo que los roles sin People.View (donaciones, asistencia) puedan identificar a las personas. Sin búsqueda ni filtro de directorio |
| POST | `/names` | JWT | Cualquier permiso de la iglesia | Igual que `GET /names`. Cuerpo: `{ peopleIds }` (o `{ ids }`) |
| GET | `/recent` | JWT | People.View, Member o People.ViewNames | Personas agregadas recientemente. Quienes llaman con People.ViewNames sin People.View (incluso miembros con acceso al directorio) reciben el modelo básico (`id`, `name.display`, `photo`, `membershipStatus`) con las personas que cancelaron la suscripción excluidas |
| GET | `/guest-register/options?churchId=` | Pública | — | Lista de verificación del registro de invitados por código QR: devuelve `{ email, phone, address, birthDate, gender, maritalStatus, grade, comments }`, cada uno con `"off"`, `"optional"` o `"required"` (se analiza desde la configuración pública `guestRegistrationFields`; los valores faltantes o mal formados recurren a correo y teléfono como opcionales, y el resto desactivado). Requiere `enableQRGuestRegistration` a menos que la solicitud incluya un token de sitio/iglesia coincidente; limitado por frecuencia (429) |
| GET | `/search?term=&email=` | JWT | People.View, Member o People.ViewNames | Buscar personas por nombre o correo electrónico (hasta 100, ordenadas por apellido y luego por nombre). Quienes llaman con People.ViewNames sin People.View (incluso miembros con acceso al directorio) reciben para la búsqueda por nombre el modelo básico; una búsqueda por `email` devuelve `[]` |
| GET | `/search/phone?number=` | JWT | People.View o Member | Buscar por número de teléfono |
| GET | `/search/group?groupId=` | JWT | People.View o Member | Obtener las personas de un grupo específico |
| GET | `/household/:householdId` | JWT | — | Obtener todas las personas de un hogar |
| GET | `/attendance` | JWT | People.Edit | Cargar asistentes con filtros (campusId, serviceId, serviceTimeId, groupId, categoryName, startDate, endDate) |
| GET | `/timeline?personIds=&groupIds=` | JWT | — | Cargar datos de línea de tiempo de personas y grupos |
| GET | `/directory/:id` | JWT | — | Obtener la persona para la vista del directorio (respeta las preferencias de visibilidad) |
| GET | `/claim/:churchId` | JWT | — | Reclamar un registro de persona para el usuario actual en una iglesia |
| POST | `/` | JWT | People.Edit o EditSelf | Crear o actualizar personas (por lote) |
| POST | `/search` | JWT | People.View, Member o People.ViewNames | Buscar personas (variante POST). Cuerpo: `{ term }` o `{ email }`; mismas reglas de solo nombres que `GET /search` |
| POST | `/advancedSearch` | JWT | People.View o Member | Búsqueda con múltiples condiciones (edad, birthMonth, membershipStatus, etc.). El cuerpo es un arreglo de condiciones; un cuerpo vacío significa sin condiciones, y cualquier otro cuerpo que no sea un arreglo devuelve 400 |
| POST | `/loadOrCreate` | Pública | — | Buscar o crear una persona por correo electrónico. Cuerpo: `{ churchId, email, firstName, lastName }` |
| POST | `/guest-register` | Pública | — | Registro de invitados por código QR. Cuerpo: `{ churchId, members: [{ firstName, lastName, email?, phone?, birthDate?, gender?, grade? }], address?, maritalStatus?, comments? }` (1–10 miembros; email/phone/maritalStatus se aplican solo al primer miembro). Los campos que la iglesia desactivó se descartan; los valores obligatorios faltantes o no válidos devuelven 400. Primero reutiliza personas existentes: un miembro coincide cuando exactamente una persona no eliminada tiene el mismo nombre (sin distinguir mayúsculas) y el mismo correo electrónico o los mismos dígitos de teléfono (casa, trabajo o móvil); un miembro sin correo ni teléfono coincide por nombre dentro del hogar coincidente. Las personas coincidentes nunca se editan. Los miembros no coincidentes se unen al hogar coincidente o, si no lo hay, a un nuevo hogar (con el apellido del primer miembro), como `membershipStatus: "Visitor"` con el `address` compartido. Guarda `comments` como una nota del primer miembro, agrega a todos al grupo privado `guestRegistrationGroupId` si está configurado y, cuando `guestRegistrationRecordAttendance` es `"true"`, registra la asistencia para los horarios de servicio programados de ese grupo cuya ventana de registro esté abierta en este momento. Devuelve `{ householdId, people: [{ id, name }] }`, repitiendo los nombres enviados en lugar de los almacenados. Las mismas reglas de consentimiento/token y de límite de frecuencia que la llamada de opciones |
| POST | `/household/:householdId` | JWT | People.Edit | Actualizar las asignaciones de miembros del hogar |
| POST | `/public/email` | Pública | — | Enviar un correo electrónico a una persona. Cuerpo: `{ churchId, personId, subject, body, appName }` |
| POST | `/apiEmails` | Interna | — | Cargar correos de personas por IDs (de servidor a servidor, requiere jwtSecret) |
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

Consulte [Autenticación y permisos](./authentication) para los endpoints de inicio de sesión, registro y gestión de contraseñas.

| Método | Ruta | Autenticación | Permiso | Descripción |
|--------|------|---------------|---------|-------------|
| POST | `/login` | Pública | — | Iniciar sesión (correo y contraseña, renovación de JWT o authGuid) |
| POST | `/register` | Pública | — | Registrar un nuevo usuario |
| POST | `/forgot` | Pública | — | Enviar correo para restablecer la contraseña |
| POST | `/setPasswordGuid` | Pública | — | Establecer la contraseña usando el GUID de autenticación del enlace del correo |
| POST | `/verifyCredentials` | Pública | — | Verificar correo y contraseña y devolver las iglesias asociadas |
| POST | `/loadOrCreate` | JWT | — | Buscar o crear un usuario por correo o userId |
| POST | `/setDisplayName` | JWT | — | Actualizar el nombre y apellido del usuario |
| POST | `/updateEmail` | JWT | — | Cambiar la dirección de correo electrónico del usuario |
| POST | `/updatePassword` | JWT | — | Cambiar la contraseña del usuario (mínimo 6 caracteres) |
| POST | `/updateOptedOut` | JWT | — | Establecer el estado de cancelación de suscripción de una persona |
| POST | `/sendInviteEmail` | JWT | People.Edit | Enviar por correo una invitación a una persona de esta iglesia (`email`, `personName`, `contextName`). El botón dice **Sign Up** para alguien sin cuenta y **Log In** para un usuario existente. Un usuario que nunca ha iniciado sesión recibe en cambio un enlace **Set Your Password** que caduca en 7 días. Es una plantilla fija, por lo que no cuenta para el límite diario de correos de la iglesia |
| GET | `/search?term=` | JWT | Server.Admin | Buscar todos los usuarios por nombre o correo |
| DELETE | `/` | JWT | — | Eliminar la cuenta del usuario actual |

## Iglesias

Ruta base: `/membership/churches`

| Método | Ruta | Autenticación | Permiso | Descripción |
|--------|------|---------------|---------|-------------|
| GET | `/` | JWT | — | Cargar todas las iglesias del usuario actual |
| GET | `/:id` | JWT | — | Obtener una iglesia por ID |
| GET | `/:id/getDomainAdmin` | JWT | — | Obtener el usuario administrador de dominio de una iglesia |
| GET | `/:id/impersonate` | JWT | Server.Admin | Suplantar una iglesia (solo administrador del servidor) |
| GET | `/all?term=` | JWT | Server.Admin | Buscar todas las iglesias (administrador) |
| GET | `/search/?name=` | Pública | — | Buscar iglesias por nombre |
| GET | `/lookup/?subDomain=&id=` | Pública | — | Buscar una iglesia por subdominio o ID |
| POST | `/` | JWT | Settings.Edit | Actualizar los datos de la iglesia |
| POST | `/add` | JWT | — | Registrar una nueva iglesia. Campos obligatorios: name, address1, city, state, zip, country |
| POST | `/search` | Pública | — | Buscar iglesias por nombre (variante POST) |
| POST | `/select` | JWT | — | Seleccionar/cambiar a una iglesia. Cuerpo: `{ churchId }` o `{ subDomain }` |
| POST | `/:id/archive` | JWT | Server.Admin | Archivar o desarchivar una iglesia |
| POST | `/byIds` | Pública | — | Cargar varias iglesias por IDs |
| DELETE | `/deleteAbandoned` | JWT | Server.Admin | Eliminar iglesias abandonadas durante 7 o más días |

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
| GET | `/tag/:tag` | JWT | — | Obtener todos los grupos con una etiqueta específica |
| GET | `/public/:churchId/:id` | Pública | — | Obtener un grupo público por iglesia e ID |
| GET | `/public/:churchId/tag/:tag` | Pública | — | Obtener grupos públicos por etiqueta |
| GET | `/public/:churchId/label?label=` | Pública | — | Obtener grupos públicos por rótulo |
| GET | `/public/:churchId/slug/:slug` | Pública | — | Obtener un grupo público por slug |
| POST | `/` | JWT | Groups.Edit | Crear o actualizar grupos (genera el slug automáticamente) |
| DELETE | `/:id` | JWT | Groups.Edit | Eliminar un grupo (también elimina los equipos secundarios de los grupos de ministerio) |

## Miembros de grupos

Ruta base: `/membership/groupmembers`

Extiende el CRUD estándar (GET `/:id`, DELETE `/:id` de la clase base).

| Método | Ruta | Autenticación | Permiso | Descripción |
|--------|------|---------------|---------|-------------|
| GET | `/:id` | JWT | GroupMembers.View | Obtener un miembro de grupo por ID |
| GET | `/` | JWT | GroupMembers.View* | Listar miembros de grupos. Filtre con `?groupId=`, `?groupIds=` o `?personId=`. *También se permite si el usuario está en el grupo o consulta su propio personId, y para `?groupId=` de cualquier grupo no confidencial cuando el usuario tiene Attendance.View o Attendance.Edit (se incluyen los miembros menores de 13 años para ellos) |
| GET | `/my` | JWT | — | Obtener las membresías de grupos del usuario actual |
| GET | `/basic/:groupId` | JWT | — | Obtener la lista básica de miembros de un grupo |
| GET | `/public/leaders/:churchId/:groupId` | Pública | — | Obtener los líderes de un grupo (público) |
| GET | `/public/:churchId/:groupId` | Pública | — | Obtener la lista pública de un grupo (campos mínimos: `personId`, `displayName`, `leader`, foto). Solo cuando el grupo se incluye mediante `publicRoster`; alimenta el elemento `staffGrid` del creador de sitios web |
| POST | `/` | JWT | GroupMembers.Edit | Agregar o actualizar miembros de grupos |
| DELETE | `/:id` | JWT | GroupMembers.View | Quitar un miembro de un grupo |

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
| GET | `/church/:churchId` | JWT | Roles.View | Obtener todos los roles de una iglesia. Cada rol incluye `memberCount`, el número de usuarios distintos que lo tienen |
| POST | `/` | JWT | Roles.Edit | Crear o actualizar roles |
| DELETE | `/:id` | JWT | Roles.Edit | Eliminar un rol (también elimina sus permisos y miembros) |

## Miembros de roles

Ruta base: `/membership/rolemembers`

| Método | Ruta | Autenticación | Permiso | Descripción |
|--------|------|---------------|---------|-------------|
| GET | `/roles/:id` | JWT | Roles.View | Obtener los miembros de un rol. Agregue `?include=users` para incluir los datos de usuario |
| POST | `/` | JWT | Roles.Edit | Agregar miembros a un rol (crea el usuario si el correo no existe) |
| DELETE | `/:id` | JWT | Roles.View | Quitar un miembro de un rol |
| DELETE | `/self/:churchId/:userId` | JWT | — | Quitarse a sí mismo de una iglesia |

## Permisos de roles

Ruta base: `/membership/rolepermissions`

| Método | Ruta | Autenticación | Permiso | Descripción |
|--------|------|---------------|---------|-------------|
| GET | `/roles/:id` | JWT | Roles.View | Obtener los permisos de un rol (use `null` como ID para el rol "Everyone") |
| POST | `/` | JWT | Roles.Edit | Crear o actualizar permisos de roles |
| DELETE | `/:id` | JWT | Roles.Edit | Eliminar un permiso de rol |

## Permisos

Ruta base: `/membership/permissions`

| Método | Ruta | Autenticación | Permiso | Descripción |
|--------|------|---------------|---------|-------------|
| GET | `/` | JWT | — | Obtener la lista completa de permisos disponibles |

Cada entrada tiene `apiName`, `section` (tipo de contenido), `action`, y las etiquetas `displaySection` / `displayAction` que muestra el editor de roles de B1Admin. Adiciones recientes: `MembershipApi` / `People` / `View Names` (**View People Names Only**, en Personas y grupos) y `GivingApi` / `Donations` / `Enter` (**Ingresar donaciones**, en Donaciones; consulte [Lotes de donaciones](./giving.md#donation-batches)).

## Formularios

Ruta base: `/membership/forms`

| Método | Ruta | Autenticación | Permiso | Descripción |
|--------|------|---------------|---------|-------------|
| GET | `/` | JWT | Forms.Admin o Forms.Edit | Listar todos los formularios (el administrador ve todos; los editores ven los asignados y los formularios que no son de miembros) |
| GET | `/:id` | JWT | Acceso al formulario | Obtener un formulario por ID |
| GET | `/archived` | JWT | Forms.Admin o Forms.Edit | Listar formularios archivados |
| GET | `/group/:groupId` | JWT | Miembro del grupo, líder del grupo o Forms.Admin | Formularios independientes vinculados al grupo (`forms.groupId`), excluyendo los archivados, ordenados por nombre. Devuelve `id`, `name`, `description` y `open` (dentro de la ventana de disponibilidad). Los miembros solo obtienen formularios abiertos; los líderes y los administradores de formularios también obtienen los cerrados. Alimenta los formularios vinculados de la página del grupo |
| GET | `/standalone/:id?churchId=` | JWT | — | Obtener un formulario independiente (los formularios restringidos requieren autenticación) |
| POST | `/` | JWT | Forms.Admin o Forms.Edit | Crear o actualizar formularios. Los formularios independientes aceptan un `photoUrl` opcional (foto de encabezado que se muestra sobre el formulario) y un `groupId` (grupo vinculado) |
| DELETE | `/:id` | JWT | Acceso al formulario | Eliminar un formulario |

## Envíos de formularios

Ruta base: `/membership/formsubmissions`

| Método | Ruta | Autenticación | Permiso | Descripción |
|--------|------|---------------|---------|-------------|
| GET | `/` | JWT | Forms.Admin o Forms.Edit | Listar envíos. Filtre con `?personId=` o `?formId=` |
| GET | `/my?include=questions,answers` | JWT | — | Limitado al propio usuario: hasta 50 envíos de formularios independientes (no formularios de persona) que el miembro con sesión iniciada envió o que están vinculados a su persona (`contentType` `person`, `contentId` = su id de persona; por ejemplo, después de un cambio de persona realizado por un administrador), los más recientes primero, cada uno con `form.name`. `include` adjunta las preguntas de cada formulario y las respuestas del envío. Devuelve `401` si el usuario no está vinculado a una persona. Alimenta la sección **Mis formularios** de la página B1 Me |
| GET | `/group/:groupId` | JWT | Líder del grupo | Respuestas para los líderes del grupo: una entrada por cada formulario vinculado y por cada evento del grupo con formulario de inscripción, cada una con `form`, `event` (`id`, `title`, `start`; solo en entradas de eventos), `questions` y `submissions` (con `answers` y `personName`, `null` cuando es anónimo) |
| GET | `/:id` | JWT | Forms.Admin, Forms.Edit o acceso de vista | Obtener un envío por ID. Agregue `?include=form,questions,answers`. Los líderes del grupo vinculado al formulario y los líderes del grupo al que pertenece una inscripción a un evento también pueden leerlo |
| GET | `/formId/:formId` | JWT | Acceso al formulario (vista) | Obtener todos los envíos de un formulario (incluye form, questions, answers). Los líderes del grupo vinculado al formulario tienen acceso de vista |
| POST | `/` | JWT | — | Enviar respuestas del formulario (maneja formularios restringidos/no restringidos, envía notificaciones por correo). Cuando el formulario tiene `autoCreatePerson`, busca o crea una persona Guest por correo y vincula el envío; cuando el formulario además tiene un `groupId`, agrega a esa persona al grupo; cuando se establecen `followUpSubject`/`followUpBody`, envía un correo de seguimiento con plantilla a quien envió el formulario. A menos que quien llama pueda administrar el formulario, `submittedBy` siempre se establece en la persona del miembro con sesión iniciada (o queda vacío para envíos anónimos) |
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
| GET | `/` | JWT | Forms.Admin o Forms.Edit | Listar respuestas. Filtre con `?formSubmissionId=` |
| POST | `/` | JWT | Forms.Admin o Forms.Edit | Crear o actualizar respuestas |

## Permisos de miembros

Ruta base: `/membership/memberpermissions`

Controla el acceso de cada miembro a formularios específicos.

| Método | Ruta | Autenticación | Permiso | Descripción |
|--------|------|---------------|---------|-------------|
| GET | `/:id` | JWT | Acceso al formulario | Obtener un permiso de miembro por ID |
| GET | `/member/:id` | JWT | Acceso al formulario | Obtener todos los permisos de formularios de un miembro |
| GET | `/form/:id` | JWT | Acceso al formulario | Obtener todos los permisos de miembros de un formulario |
| GET | `/form/:id/my` | JWT | Acceso al formulario | Obtener el permiso del usuario actual para un formulario |
| POST | `/` | JWT | Acceso al formulario | Crear o actualizar permisos de miembros |
| DELETE | `/:id?formId=` | JWT | Acceso al formulario | Eliminar un permiso de miembro |
| DELETE | `/member/:id?formId=` | JWT | Acceso al formulario | Eliminar todos los permisos de un miembro en un formulario |

## Configuración

Ruta base: `/membership/settings`

| Método | Ruta | Autenticación | Permiso | Descripción |
|--------|------|---------------|---------|-------------|
| GET | `/` | JWT | Settings.Edit | Obtener todas las configuraciones de la iglesia |
| GET | `/public/:churchId` | Pública | — | Obtener las configuraciones públicas de una iglesia |
| POST | `/` | JWT | Settings.Edit | Guardar configuraciones (admite carga de imágenes en base64) |

## Dominios

Ruta base: `/membership/domains`

Extiende el CRUD estándar (GET `/:id`, GET `/`, DELETE `/:id` de la clase base).

| Método | Ruta | Autenticación | Permiso | Descripción |
|--------|------|---------------|---------|-------------|
| GET | `/` | JWT | — | Listar todos los dominios |
| GET | `/:id` | JWT | — | Obtener un dominio por ID |
| GET | `/lookup/:domainName` | JWT | — | Buscar un dominio por nombre |
| GET | `/public/lookup/:domainName` | Pública | — | Búsqueda pública de dominio por nombre |
| GET | `/health/check` | Pública | — | Ejecutar una verificación de estado en los dominios no verificados |
| POST | `/` | JWT | Settings.Edit | Crear o actualizar dominios (dispara la actualización de Caddy) |
| DELETE | `/:id` | JWT | Settings.Edit | Eliminar un dominio |

## Iglesia de usuario

Ruta base: `/membership/userchurch`

Administra la asociación entre usuarios e iglesias.

| Método | Ruta | Autenticación | Permiso | Descripción |
|--------|------|---------------|---------|-------------|
| GET | `/userid/:userId` | JWT | — | Obtener el registro usuario-iglesia por ID de usuario |
| GET | `/personid/:personId` | JWT | — | Obtener el correo del usuario vinculado a una persona |
| GET | `/user/:userId` | JWT | Server.Admin | Cargar todas las iglesias de un usuario |
| POST | `/` | JWT | — | Crear una asociación usuario-iglesia |
| PATCH | `/:userId` | JWT | — | Actualizar la fecha de último acceso y registrar el acceso |
| DELETE | `/record/:userId/:churchId/:personId` | JWT | — | Eliminar un registro usuario-iglesia |

## Preferencias de visibilidad

Ruta base: `/membership/visibilityPreferences`

| Método | Ruta | Autenticación | Permiso | Descripción |
|--------|------|---------------|---------|-------------|
| GET | `/my` | JWT | — | Obtener las preferencias de visibilidad del usuario actual |
| POST | `/` | JWT | — | Guardar preferencias de visibilidad (visibilidad de dirección, teléfono y correo) |

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
- [Endpoints de Attendance](./attendance) — Seguimiento de servicios y visitas
- [Estructura del módulo](../module-structure) — Patrones de organización del código
