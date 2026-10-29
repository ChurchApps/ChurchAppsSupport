---
title: "Autenticación y permisos"
---

# Autenticación y permisos

<div class="article-intro">

La API de ChurchApps usa autenticación basada en JWT. Los usuarios inician sesión para recibir un token que codifica su identidad, su pertenencia a una iglesia y sus permisos. Esta página cubre el flujo de autenticación, el modelo de permisos y el soporte de OAuth.

</div>

## Flujo de inicio de sesión

### Inicio de sesión estándar

```
POST /membership/users/login
```

**Autenticación:** Pública

Acepta uno de tres tipos de credenciales:

| Campo | Descripción |
|-------|-------------|
| `email` + `password` | Inicio de sesión estándar con correo electrónico y contraseña |
| `jwt` | Volver a autenticarse con un JWT existente |
| `authGuid` | Enlace de autenticación de un solo uso (usado en los correos de bienvenida y restablecimiento) |

**Respuesta:**

```json
{
  "user": {
    "id": "abc-123",
    "firstName": "Jane",
    "lastName": "Doe",
    "email": "jane@example.com"
  },
  "churches": [
    {
      "church": { "id": "church-1", "name": "First Church", "subDomain": "firstchurch" },
      "person": { "id": "person-1", "membershipStatus": "Member" },
      "groups": [{ "id": "group-1", "name": "Choir", "leader": false }],
      "apis": [
        {
          "keyName": "MembershipApi",
          "permissions": [
            { "contentType": "People", "action": "View" },
            { "contentType": "People", "action": "Edit" }
          ]
        }
      ]
    }
  ],
  "token": "<jwt-token>"
}
```

El campo `token` es un JWT que debe enviarse como `Authorization: Bearer <token>` en las solicitudes posteriores.

### Inicio de sesión en dos pasos

Los usuarios pueden activar el inicio de sesión en dos pasos (TOTP) con una aplicación de autenticación. Para estos usuarios, un inicio de sesión con `email` + `password`, `authGuid` o SSO no devuelve un token. En su lugar, responde con un desafío:

```json
{ "mfaRequired": true, "mfaToken": "<challenge-token>" }
```

El token de desafío es válido durante 5 minutos. Envíelo de nuevo al mismo endpoint junto con el código:

```json
{ "mfaToken": "<challenge-token>", "mfaCode": "123456" }
```

`mfaCode` puede ser el código actual de 6 dígitos de la aplicación de autenticación o uno de los diez códigos de respaldo de un solo uso del usuario. Un código incorrecto devuelve `Invalid code`, y los intentos fallidos repetidos están limitados por cuenta. Un inicio de sesión con `jwt` nunca recibe un desafío, por lo que las sesiones existentes siguen renovándose. El objeto `user` de la respuesta de inicio de sesión incluye `mfaEnabled`.

Endpoints de autoservicio (solo para el usuario con sesión iniciada, bajo `/membership/users/mfa`):

| Endpoint | Descripción |
|----------|-------------|
| `GET /status` | `{ enabled, backupCodesLeft }` |
| `POST /setup` | Inicia la configuración; devuelve `{ secret, otpauthUrl }` para el código QR |
| `POST /enable` | Cuerpo `{ code }`; lo activa y devuelve `{ backupCodes }` una sola vez |
| `POST /disable` | Cuerpo `{ code }` (código de la aplicación o de respaldo); lo desactiva |
| `POST /reset/:userId` | Solo Server.Admin; lo desactiva para otro usuario |

Los secretos se almacenan cifrados y los códigos de respaldo se almacenan como hashes. Activar, desactivar y restablecer quedan registrados en el registro de auditoría.

### Contenido del token

El JWT codifica:
- `id` — ID del usuario
- `churchId` — Iglesia seleccionada actualmente
- `personId` — Registro de persona en la iglesia seleccionada
- Arreglos de permisos por API

### Selección de iglesia

Los usuarios pueden pertenecer a varias iglesias. La respuesta de inicio de sesión incluye todas las iglesias con sus permisos. Para cambiar de iglesia, el cliente genera un nuevo JWT limitado a otra iglesia a partir de los datos de respuesta del inicio de sesión.

## Registro de usuarios

### Registrar un nuevo usuario

```
POST /membership/users/register
```

**Autenticación:** Pública

```json
{
  "email": "jane@example.com",
  "firstName": "Jane",
  "lastName": "Doe",
  "appName": "B1 Admin",
  "appUrl": "https://app.b1.church"
}
```

Crea un usuario con una contraseña temporal y envía un correo de bienvenida con un enlace de autenticación. El primer usuario registrado en una nueva instancia recibe automáticamente acceso de administrador del servidor.

Se aceptan dos campos opcionales para detectar bots: `website` (un campo oculto de tipo trampa que los usuarios reales dejan vacío) y `fillMs` (el tiempo que el formulario estuvo abierto, en milisegundos). Si `website` tiene contenido o `fillMs` es menor de 2000, no se crea ninguna cuenta, pero el endpoint sigue devolviendo un `200` normal para que los bots no puedan saber que fueron rechazados. Los clientes que omiten ambos campos se registran como de costumbre.

### Registrar una nueva iglesia

```
POST /membership/churches/add
```

**Autenticación:** JWT

Después de registrar un usuario, llame a este endpoint para crear una iglesia y asociar al usuario con ella.

## Gestión de contraseñas

| Método | Ruta | Autenticación | Descripción |
|--------|------|---------------|-------------|
| POST | `/membership/users/forgot` | Pública | Envía un correo para restablecer la contraseña. Cuerpo: `{ "userEmail": "...", "appName": "...", "appUrl": "..." }` |
| POST | `/membership/users/setPasswordGuid` | Pública | Establece una nueva contraseña usando un GUID de autenticación del correo de restablecimiento. Cuerpo: `{ "authGuid": "...", "newPassword": "..." }` |
| POST | `/membership/users/updatePassword` | JWT | Cambia la contraseña del usuario actual. Cuerpo: `{ "newPassword": "..." }` |

## Modelo de permisos

Los permisos se organizan por módulo y se asignan a los usuarios mediante roles. Cada permiso tiene un **tipo de contenido** y una **acción**.

### Referencia de permisos

| Sección visible | Tipo de contenido | Acción | Descripción |
|----------------|-------------------|--------|-------------|
| **Attendance** | Attendance | Checkin | Registrar la entrada de miembros en los servicios |
| | Attendance | Edit | Editar registros de asistencia |
| | Services | Edit | Administrar servicios y horarios de servicio |
| | Attendance | View | Ver registros de asistencia |
| | Attendance | View Summary | Ver resúmenes e informes de asistencia |
| **Donations** | Donations | Edit | Crear y editar registros de donaciones |
| | Settings | Edit | Editar la configuración de donaciones/pagos |
| | Donations | View Summary | Ver informes de resumen de donaciones |
| | Donations | View | Ver registros individuales de donaciones |
| **People and Groups** | Forms | Admin | Administración completa de formularios |
| | Forms | Edit | Editar definiciones de formularios |
| | Plans | Edit | Editar planes de servicio |
| | Group Members | Edit | Agregar o quitar miembros de grupos |
| | Groups | Edit | Crear y editar grupos |
| | Households | Edit | Editar la asignación de hogares |
| | People | Edit | Editar cualquier registro de persona |
| | People | Edit Self | Editar solo su propio registro de persona |
| | Roles | Edit | Administrar roles y asignaciones de usuarios |
| | Group Members | View | Ver listas de miembros de grupos |
| | People | View Members | Ver solo miembros (no visitantes) |
| | People | View | Ver todas las personas |
| | Roles | View | Ver roles y asignaciones |
| | Settings | Edit | Editar la configuración de la iglesia |
| **Content** | Content | Edit | Editar páginas, secciones y elementos |
| | Settings | Edit | Editar la configuración de contenido |
| | StreamingServices | Edit | Administrar la configuración de servicios de transmisión |
| | Chat | Host | Organizar/moderar sesiones de chat |
| **Messaging** | Texting | Send | Enviar mensajes de texto SMS |

### Cómo se verifican los permisos

En los controladores, los permisos se verifican con el método `au.checkAccess()`:

```typescript
// Require specific permission
if (!au.checkAccess(Permissions.people.edit)) return this.json({}, 401);

// Or within actionWrapper — the CRUD system checks automatically
crudSettings: {
  permissions: {
    view: Permissions.people.view,
    edit: Permissions.people.edit
  }
}
```

### Server Admin

El permiso `Server.Admin` otorga acceso completo a todas las iglesias. Se asigna al primer usuario registrado y puede otorgarse a otros mediante el rol de administrador del servidor.

## OAuth 2.0

La API admite OAuth 2.0 para integraciones de terceros. Hay dos tipos de concesión disponibles.

### Flujo de código de autorización

1. **Autorizar:** `POST /membership/oauth/authorize` (requiere JWT)
   - Cuerpo: `{ "client_id": "...", "redirect_uri": "...", "response_type": "code", "scope": "...", "state": "...", "code_challenge": "...", "code_challenge_method": "S256" }`
   - `code_challenge` / `code_challenge_method` (PKCE, solo `S256`) son obligatorios para clientes públicos sin secreto
   - Devuelve: `{ "code": "...", "state": "..." }`

2. **Intercambiar el código por un token:** `POST /membership/oauth/token` (Pública)
   - Cuerpo: `{ "grant_type": "authorization_code", "code": "...", "client_id": "...", "client_secret": "...", "redirect_uri": "...", "code_verifier": "..." }`
   - Envíe `code_verifier` cuando el paso de autorización haya usado un `code_challenge`; los clientes públicos omiten `client_secret`. Se aceptan cuerpos en JSON o codificados como formulario
   - Devuelve: `{ "access_token": "...", "token_type": "Bearer", "expires_in": 43200, "refresh_token": "...", "scope": "..." }`

3. **Renovar el token:** `POST /membership/oauth/token` (Pública)
   - Cuerpo: `{ "grant_type": "refresh_token", "refresh_token": "...", "client_id": "...", "client_secret": "..." }`

Los tokens de acceso caducan después de **12 horas**.

### Flujo de código de dispositivo (RFC 8628)

Para dispositivos sin navegador (aplicaciones de TV, quioscos):

1. **Solicitar el código de dispositivo:** `POST /membership/oauth/device/authorize` (Pública)
   - Cuerpo: `{ "client_id": "...", "scope": "..." }`
   - Devuelve: `{ "device_code": "...", "user_code": "ABCD-1234", "verification_uri": "https://app.b1.church/device", "expires_in": 900, "interval": 5 }`

2. **El usuario introduce el código** en el URI de verificación y aprueba o rechaza

3. **Sondear para obtener el token:** `POST /membership/oauth/token` (Pública)
   - Cuerpo: `{ "grant_type": "urn:ietf:params:oauth:grant-type:device_code", "device_code": "...", "client_id": "..." }`
   - Devuelve `authorization_pending` hasta que se apruebe, y luego devuelve el token de acceso

### Administración de clientes OAuth

| Método | Ruta | Autenticación | Permiso | Descripción |
|--------|------|---------------|---------|-------------|
| GET | `/membership/oauth/clients` | JWT | Server.Admin | Listar todos los clientes OAuth |
| GET | `/membership/oauth/clients/:id` | JWT | Server.Admin | Obtener un cliente por ID |
| GET | `/membership/oauth/clients/clientId/:clientId` | JWT | — | Obtener un cliente por ID de cliente (secreto oculto) |
| POST | `/membership/oauth/clients` | JWT | Server.Admin | Crear o actualizar un cliente |
| DELETE | `/membership/oauth/clients/:id` | JWT | Server.Admin | Eliminar un cliente |
| POST | `/membership/oauth/register` | Pública | — | Registro dinámico de clientes (RFC 7591) para clientes públicos como los conectores MCP. Consulte [Aplicaciones conectadas](../connected-apps#dynamic-client-registration) |

### Endpoints de aprobación de dispositivos

| Método | Ruta | Autenticación | Descripción |
|--------|------|---------------|-------------|
| GET | `/membership/oauth/device/pending/:userCode` | JWT | Obtener la información del código de dispositivo pendiente para la interfaz de aprobación |
| POST | `/membership/oauth/device/approve` | JWT | Aprobar una autorización de dispositivo. Cuerpo: `{ "user_code": "...", "church_id": "..." }` |
| POST | `/membership/oauth/device/deny` | JWT | Rechazar una autorización de dispositivo. Cuerpo: `{ "user_code": "..." }` |

## Endpoints públicos y autenticados

La API usa dos funciones envolventes que determinan los requisitos de autenticación:

- **`actionWrapper`** — Requiere un JWT válido. El objeto de usuario autenticado (`au`) está disponible con `churchId`, `userId` y las verificaciones de permisos.
- **`actionWrapperAnon`** — No requiere autenticación. Se usa para el inicio de sesión, el registro, las consultas de contenido público y los receptores de webhooks.

En las tablas de endpoints de esta documentación, estos se indican como **JWT** y **Pública** respectivamente en la columna Autenticación.

## Páginas relacionadas

- [Estructura del módulo](../module-structure) — Cómo se organizan los controladores, repositorios y modelos
- [Configuración local](../local-setup) — Ejecutar la API localmente para desarrollo
