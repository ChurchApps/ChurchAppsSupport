---
title: "Autenticación y permisos"
---

# Autenticación y permisos

<div class="article-intro">

La API de ChurchApps usa autenticación basada en JWT. Los usuarios inician sesión para recibir un token que codifica su identidad, su pertenencia a la iglesia y sus permisos. Esta página cubre el flujo de autenticación, el modelo de permisos y el soporte de OAuth.

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
| `authGuid` | Enlace de autenticación de un solo uso (usado en los correos de bienvenida y de restablecimiento) |

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

El campo `token` es un JWT que debe enviarse como `Authorization: Bearer <token>` en las solicitudes siguientes.

### Contenido del token

El JWT codifica:
- `id` — ID del usuario
- `churchId` — iglesia seleccionada actualmente
- `personId` — registro de persona de la iglesia seleccionada
- Arreglos de permisos por API

### Selección de iglesia

Los usuarios pueden pertenecer a varias iglesias. La respuesta de inicio de sesión incluye todas las iglesias con sus permisos. Para cambiar de iglesia, el cliente genera un nuevo JWT limitado a otra iglesia de los datos de la respuesta de inicio de sesión.

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

Se aceptan dos campos opcionales contra bots: `website` (un campo oculto tipo trampa que los usuarios reales dejan vacío) y `fillMs` (cuánto tiempo estuvo abierto el formulario, en milisegundos). Si `website` tiene contenido o `fillMs` es menor de 2000, no se crea ninguna cuenta, pero el endpoint sigue devolviendo una respuesta `200` normal para que los bots no puedan saber que fueron rechazados. Los clientes que omiten ambos campos se registran como de costumbre.

### Registrar una nueva iglesia

```
POST /membership/churches/add
```

**Autenticación:** JWT

Después de registrar un usuario, llama a este endpoint para crear una iglesia y asociar el usuario con ella.

## Gestión de contraseñas

| Método | Ruta | Autenticación | Descripción |
|--------|------|---------------|-------------|
| POST | `/membership/users/forgot` | Pública | Enviar un correo de restablecimiento de contraseña. Cuerpo: `{ "userEmail": "...", "appName": "...", "appUrl": "..." }` |
| POST | `/membership/users/setPasswordGuid` | Pública | Establecer una nueva contraseña usando un GUID de autenticación del correo de restablecimiento. Cuerpo: `{ "authGuid": "...", "newPassword": "..." }` |
| POST | `/membership/users/updatePassword` | JWT | Cambiar la contraseña del usuario actual. Cuerpo: `{ "newPassword": "..." }` |

## Modelo de permisos

Los permisos se organizan por módulo y se asignan a los usuarios mediante roles. Cada permiso tiene un **tipo de contenido** y una **acción**.

### Referencia de permisos

| Sección visible | Tipo de contenido | Acción | Descripción |
|-----------------|-------------------|--------|-------------|
| **Attendance** | Attendance | Checkin | Registrar a los miembros en los servicios |
| | Attendance | Edit | Editar los registros de asistencia |
| | Services | Edit | Administrar servicios y horarios de servicio |
| | Attendance | View | Ver los registros de asistencia |
| | Attendance | View Summary | Ver resúmenes e informes de asistencia |
| **Donations** | Donations | Edit | Crear y editar registros de donaciones |
| | Settings | Edit | Editar la configuración de ofrendas y pagos |
| | Donations | View Summary | Ver informes de resumen de donaciones |
| | Donations | View | Ver registros individuales de donaciones |
| **People and Groups** | Forms | Admin | Administración completa de formularios |
| | Forms | Edit | Editar las definiciones de formularios |
| | Plans | Edit | Editar planes de servicio |
| | Group Members | Edit | Añadir o quitar miembros de grupos |
| | Groups | Edit | Crear y editar grupos |
| | Households | Edit | Editar las asignaciones de hogares |
| | People | Edit | Editar cualquier registro de persona |
| | People | Edit Self | Editar solo tu propio registro de persona |
| | Roles | Edit | Administrar roles y asignaciones de usuarios |
| | Group Members | View | Ver las listas de miembros de grupos |
| | People | View Members | Ver solo miembros (no visitantes) |
| | People | View | Ver todas las personas |
| | Roles | View | Ver roles y asignaciones |
| | Settings | Edit | Editar la configuración de la iglesia |
| **Content** | Content | Edit | Editar páginas, secciones y elementos |
| | Settings | Edit | Editar la configuración de contenido |
| | StreamingServices | Edit | Administrar la configuración de los servicios de transmisión |
| | Chat | Host | Alojar y moderar sesiones de chat |
| **Messaging** | Texting | Send | Enviar mensajes de texto SMS |

### Cómo se comprueban los permisos

En los controladores, los permisos se comprueban con el método `au.checkAccess()`:

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

### Administrador del servidor

El permiso `Server.Admin` otorga acceso completo a todas las iglesias. Se asigna al primer usuario registrado y puede concederse a otros mediante el rol de administrador del servidor.

## OAuth 2.0

La API admite OAuth 2.0 para integraciones de terceros. Hay dos tipos de concesión disponibles.

### Flujo de código de autorización

1. **Autorizar:** `POST /membership/oauth/authorize` (requiere JWT)
   - Cuerpo: `{ "client_id": "...", "redirect_uri": "...", "response_type": "code", "scope": "...", "state": "...", "code_challenge": "...", "code_challenge_method": "S256" }`
   - `code_challenge` / `code_challenge_method` (PKCE, solo `S256`) son obligatorios para los clientes públicos sin secreto
   - Devuelve: `{ "code": "...", "state": "..." }`

2. **Intercambiar el código por un token:** `POST /membership/oauth/token` (Pública)
   - Cuerpo: `{ "grant_type": "authorization_code", "code": "...", "client_id": "...", "client_secret": "...", "redirect_uri": "...", "code_verifier": "..." }`
   - Envía `code_verifier` cuando el paso de autorización usó un `code_challenge`; los clientes públicos omiten `client_secret`. Se aceptan cuerpos JSON o codificados como formulario
   - Devuelve: `{ "access_token": "...", "token_type": "Bearer", "expires_in": 43200, "refresh_token": "...", "scope": "..." }`

3. **Actualizar el token:** `POST /membership/oauth/token` (Pública)
   - Cuerpo: `{ "grant_type": "refresh_token", "refresh_token": "...", "client_id": "...", "client_secret": "..." }`

Los tokens de acceso caducan tras **12 horas**.

### Flujo de código de dispositivo (RFC 8628)

Para dispositivos sin navegador (aplicaciones de TV, quioscos):

1. **Solicitar un código de dispositivo:** `POST /membership/oauth/device/authorize` (Pública)
   - Cuerpo: `{ "client_id": "...", "scope": "..." }`
   - Devuelve: `{ "device_code": "...", "user_code": "ABCD-1234", "verification_uri": "https://app.b1.church/device", "expires_in": 900, "interval": 5 }`

2. **El usuario introduce el código** en el URI de verificación y aprueba o rechaza la solicitud

3. **Sondear el token:** `POST /membership/oauth/token` (Pública)
   - Cuerpo: `{ "grant_type": "urn:ietf:params:oauth:grant-type:device_code", "device_code": "...", "client_id": "..." }`
   - Devuelve `authorization_pending` hasta que se apruebe; después devuelve el token de acceso

### Administración de clientes OAuth

| Método | Ruta | Autenticación | Permiso | Descripción |
|--------|------|---------------|---------|-------------|
| GET | `/membership/oauth/clients` | JWT | Server.Admin | Listar todos los clientes OAuth |
| GET | `/membership/oauth/clients/:id` | JWT | Server.Admin | Obtener un cliente por ID |
| GET | `/membership/oauth/clients/clientId/:clientId` | JWT | — | Obtener un cliente por su ID de cliente (secreto oculto) |
| POST | `/membership/oauth/clients` | JWT | Server.Admin | Crear o actualizar un cliente |
| DELETE | `/membership/oauth/clients/:id` | JWT | Server.Admin | Eliminar un cliente |
| POST | `/membership/oauth/register` | Pública | — | Registro dinámico de clientes (RFC 7591) para clientes públicos como los conectores MCP. Consulta [Aplicaciones conectadas](../connected-apps#dynamic-client-registration) |

### Endpoints de aprobación de dispositivos

| Método | Ruta | Autenticación | Descripción |
|--------|------|---------------|-------------|
| GET | `/membership/oauth/device/pending/:userCode` | JWT | Obtener la información del código de dispositivo pendiente para la interfaz de aprobación |
| POST | `/membership/oauth/device/approve` | JWT | Aprobar una autorización de dispositivo. Cuerpo: `{ "user_code": "...", "church_id": "..." }` |
| POST | `/membership/oauth/device/deny` | JWT | Rechazar una autorización de dispositivo. Cuerpo: `{ "user_code": "..." }` |

## Endpoints públicos vs. autenticados

La API usa dos funciones envoltorio que determinan los requisitos de autenticación:

- **`actionWrapper`**: requiere un JWT válido. El objeto de usuario autenticado (`au`) está disponible con `churchId`, `userId` y las comprobaciones de permisos.
- **`actionWrapperAnon`**: no requiere autenticación. Se usa para el inicio de sesión, el registro, las consultas de contenido público y los receptores de webhooks.

En las tablas de endpoints de esta documentación, estos se indican como **JWT** y **Pública**, respectivamente, en la columna Autenticación.

## Páginas relacionadas

- [Estructura del módulo](../module-structure) — Cómo se organizan los controladores, repositorios y modelos
- [Configuración local](../local-setup) — Cómo ejecutar la API en local para desarrollo
