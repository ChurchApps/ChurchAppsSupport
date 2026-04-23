---
title: "Autenticación y Permisos"
---

# Autenticación y Permisos

<div class="article-intro">

La API de ChurchApps utiliza autenticación basada en JWT. Los usuarios inician sesión para recibir un token que codifica su identidad, membresía en la iglesia y permisos. Esta página cubre el flujo de autenticación, el modelo de permisos y el soporte de OAuth.

</div>

## Flujo de Inicio de Sesión

### Inicio de Sesión Estándar

```
POST /membership/users/login
```

**Autenticación:** Público

Acepta uno de tres tipos de credenciales:

| Campo | Descripción |
|-------|-------------|
| `email` + `password` | Inicio de sesión estándar por correo electrónico/contraseña |
| `jwt` | Re-autenticarse con un JWT existente |
| `authGuid` | Enlace de autenticación de una sola vez (utilizado en correos de bienvenida/reinicio) |

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

El campo `token` es un JWT que debe enviarse como `Authorization: Bearer <token>` en solicitudes posteriores.

### Contenido del Token

El JWT codifica:
- `id` — ID de usuario
- `churchId` — Iglesia actualmente seleccionada
- `personId` — Registro de persona para la iglesia seleccionada
- Matrices de permisos por API

### Selección de Iglesia

Los usuarios pueden pertenecer a múltiples iglesias. La respuesta de inicio de sesión incluye todas las iglesias con sus permisos. Para cambiar de iglesias, el cliente genera un nuevo JWT delimitado a una iglesia diferente de los datos de la respuesta de inicio de sesión.

## Registro de Usuario

### Registrar un Nuevo Usuario

```
POST /membership/users/register
```

**Autenticación:** Público

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

### Registrar una Nueva Iglesia

```
POST /membership/churches/add
```

**Autenticación:** JWT

Después de registrar un usuario, llame a este punto de conexión para crear una iglesia y asociar el usuario con ella.

## Gestión de Contraseñas

| Método | Ruta | Autenticación | Descripción |
|--------|------|---------------|-------------|
| POST | `/membership/users/forgot` | Público | Enviar correo de reinicio de contraseña. Cuerpo: `{ "userEmail": "...", "appName": "...", "appUrl": "..." }` |
| POST | `/membership/users/setPasswordGuid` | Público | Establecer una nueva contraseña usando un GUID de autenticación de un correo de reinicio. Cuerpo: `{ "authGuid": "...", "newPassword": "..." }` |
| POST | `/membership/users/updatePassword` | JWT | Cambiar la contraseña del usuario actual. Cuerpo: `{ "newPassword": "..." }` |

## Modelo de Permisos

Los permisos se organizan por módulo y se asignan a los usuarios a través de roles. Cada permiso tiene un **tipo de contenido** y una **acción**.

### Referencia de Permisos

| Sección de Visualización | Tipo de Contenido | Acción | Descripción |
|--------------------------|-------------------|--------|-------------|
| **Asistencia** | Asistencia | Checkin | Registrar la asistencia de miembros en servicios |
| | Asistencia | Editar | Editar registros de asistencia |
| | Servicios | Editar | Gestionar servicios y horarios de servicio |
| | Asistencia | Ver | Ver registros de asistencia |
| | Asistencia | Ver Resumen | Ver resúmenes de asistencia e informes |
| **Donaciones** | Donaciones | Editar | Crear y editar registros de donación |
| | Configuración | Editar | Editar configuración de donaciones/pagos |
| | Donaciones | Ver Resumen | Ver informes de resumen de donaciones |
| | Donaciones | Ver | Ver registros de donaciones individuales |
| **Personas y Grupos** | Formularios | Admin | Administración completa de formularios |
| | Formularios | Editar | Editar definiciones de formularios |
| | Planes | Editar | Editar planes de servicio |
| | Miembros del Grupo | Editar | Agregar/eliminar miembros del grupo |
| | Grupos | Editar | Crear y editar grupos |
| | Hogares | Editar | Editar asignaciones de hogares |
| | Personas | Editar | Editar cualquier registro de persona |
| | Personas | Editar Uno Mismo | Editar solo su propio registro de persona |
| | Roles | Editar | Gestionar roles y asignaciones de usuarios |
| | Miembros del Grupo | Ver | Ver listas de miembros del grupo |
| | Personas | Ver Miembros | Ver solo miembros (no visitantes) |
| | Personas | Ver | Ver todas las personas |
| | Roles | Ver | Ver roles y asignaciones |
| | Configuración | Editar | Editar configuración de la iglesia |
| **Contenido** | Contenido | Editar | Editar páginas, secciones, elementos |
| | Configuración | Editar | Editar configuración de contenido |
| | Servicios en Directo | Editar | Gestionar configuración de servicio en directo |
| | Chat | Host | Alojar/moderar sesiones de chat |
| **Mensajería** | SMS | Enviar | Enviar mensajes de texto SMS |

### Cómo se Verifican los Permisos

En los controladores, los permisos se verifican usando el método `au.checkAccess()`:

```typescript
// Requerir permiso específico
if (!au.checkAccess(Permissions.people.edit)) return this.json({}, 401);

// O dentro de actionWrapper — el sistema CRUD verifica automáticamente
crudSettings: {
  permissions: {
    view: Permissions.people.view,
    edit: Permissions.people.edit
  }
}
```

### Administrador del Servidor

El permiso `Server.Admin` otorga acceso completo en todas las iglesias. Se asigna al primer usuario registrado y se puede otorgar a otros a través del rol de administrador del servidor.

## OAuth 2.0

La API admite OAuth 2.0 para integraciones de terceros. Dos tipos de otorgamiento están disponibles.

### Flujo del Código de Autorización

1. **Autorizar:** `POST /membership/oauth/authorize` (se requiere JWT)
   - Cuerpo: `{ "client_id": "...", "redirect_uri": "...", "response_type": "code", "scope": "...", "state": "..." }`
   - Devuelve: `{ "code": "...", "state": "..." }`

2. **Cambiar código por token:** `POST /membership/oauth/token` (Público)
   - Cuerpo: `{ "grant_type": "authorization_code", "code": "...", "client_id": "...", "client_secret": "...", "redirect_uri": "..." }`
   - Devuelve: `{ "access_token": "...", "token_type": "Bearer", "expires_in": 43200, "refresh_token": "...", "scope": "..." }`

3. **Actualizar token:** `POST /membership/oauth/token` (Público)
   - Cuerpo: `{ "grant_type": "refresh_token", "refresh_token": "...", "client_id": "...", "client_secret": "..." }`

Los tokens de acceso caducan después de **12 horas**.

### Flujo de Código de Dispositivo (RFC 8628)

Para dispositivos sin navegador (aplicaciones de TV, quioscos):

1. **Solicitar código de dispositivo:** `POST /membership/oauth/device/authorize` (Público)
   - Cuerpo: `{ "client_id": "...", "scope": "..." }`
   - Devuelve: `{ "device_code": "...", "user_code": "ABCD-1234", "verification_uri": "https://app.b1.church/device", "expires_in": 900, "interval": 5 }`

2. **El usuario ingresa el código** en el URI de verificación y aprueba o deniega

3. **Sondear el token:** `POST /membership/oauth/token` (Público)
   - Cuerpo: `{ "grant_type": "urn:ietf:params:oauth:grant-type:device_code", "device_code": "...", "client_id": "..." }`
   - Devuelve `authorization_pending` hasta que se apruebe, luego devuelve el token de acceso

### Gestión de Cliente OAuth

| Método | Ruta | Autenticación | Permiso | Descripción |
|--------|------|---------------|---------|-------------|
| GET | `/membership/oauth/clients` | JWT | Server.Admin | Listar todos los clientes OAuth |
| GET | `/membership/oauth/clients/:id` | JWT | Server.Admin | Obtener cliente por ID |
| GET | `/membership/oauth/clients/clientId/:clientId` | JWT | — | Obtener cliente por ID de cliente (secreto omitido) |
| POST | `/membership/oauth/clients` | JWT | Server.Admin | Crear o actualizar un cliente |
| DELETE | `/membership/oauth/clients/:id` | JWT | Server.Admin | Eliminar un cliente |

### Puntos de Conexión de Aprobación de Dispositivos

| Método | Ruta | Autenticación | Descripción |
|--------|------|---------------|-------------|
| GET | `/membership/oauth/device/pending/:userCode` | JWT | Obtener información de código de dispositivo pendiente para la interfaz de usuario de aprobación |
| POST | `/membership/oauth/device/approve` | JWT | Aprobar una autorización de dispositivo. Cuerpo: `{ "user_code": "...", "church_id": "..." }` |
| POST | `/membership/oauth/device/deny` | JWT | Denegar una autorización de dispositivo. Cuerpo: `{ "user_code": "..." }` |

## Puntos de Conexión Públicos vs Autenticados

La API utiliza dos funciones de envoltura que determinan los requisitos de autenticación:

- **`actionWrapper`** -- Requiere un JWT válido. El objeto de usuario autenticado (`au`) está disponible con `churchId`, `userId` y verificaciones de permisos.
- **`actionWrapperAnon`** -- Sin autenticación requerida. Se utiliza para inicio de sesión, registro, búsquedas de contenido público y receptores de webhooks.

En las tablas de puntos de conexión en toda esta documentación, estos se indican como **JWT** y **Público** respectivamente en la columna Autenticación.

## Páginas Relacionadas

- [Estructura de Módulo](../module-structure) -- Cómo se organizan los controladores, repositorios y modelos
- [Configuración Local](../local-setup) -- Ejecutando la API localmente para desarrollo
