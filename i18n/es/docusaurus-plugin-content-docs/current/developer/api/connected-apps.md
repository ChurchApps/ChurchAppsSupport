---
title: "Aplicaciones conectadas y OAuth"
---

# Aplicaciones conectadas y OAuth

<div class="article-intro">

La API de B1 admite OAuth 2.0 para que una aplicación de terceros pueda pedir a cada administrador de la iglesia permiso para acceder a sus datos, sin que la iglesia tenga que compartir nunca una contraseña ni una clave de API. Una **Aplicación conectada** es un token OAuth que un administrador de la iglesia ha aprobado; revocarlo corta el acceso de la aplicación de terceros con un solo clic. Usa esta vía para conectores SaaS multiinquilino. Para una integración de una sola iglesia, prefiere [Claves de API](./api-keys).

</div>

<div class="prereqs">
<h4>Antes de empezar</h4>

- Un **cliente** OAuth debe estar registrado antes de que las iglesias puedan concederle acceso; lo hace un administrador del servidor de B1 o el propio cliente mediante el [registro dinámico](#dynamic-client-registration)
- Todos los endpoints de OAuth viven bajo el módulo Membership: `/membership/oauth/...`
- Los tokens de acceso son JWT: llevan los permisos del usuario filtrados por los alcances concedidos

</div>

## Conceptos

| Término | Significado |
|---|---|
| **Cliente OAuth** | La propia aplicación de terceros, identificada por `client_id` y protegida por `client_secret`. Se registra una vez en B1 y se comparte entre todas las iglesias que la instalan. |
| **Aplicación conectada** | Un par específico `(client, church-admin)` en el que el administrador ha concedido acceso al cliente. Cada aplicación conectada está respaldada por un token de actualización de OAuth. |
| **Token de acceso** | Un JWT de corta duración (≈ 7 días) que el cliente usa para las llamadas a la API. Tiene la misma forma que un JWT de usuario: `Authorization: Bearer <jwt>`. |
| **Token de actualización** | Una cadena opaca de larga duración (≈ 90 días) que el cliente usa para obtener nuevos tokens de acceso. |
| **Alcance** | Restringe lo que puede hacer el token de acceso. Consulta el [catálogo de alcances](./api-keys#scopes). |

## Flujos de concesión

B1 admite tres flujos OAuth, todos definidos por RFC 6749 y RFC 8628.

### Código de autorización (aplicaciones web)

Úsalo cuando tu aplicación tiene un componente del lado del servidor y puede mantener `client_secret` en privado.

1. **Autorizar**

   ```http
   POST /membership/oauth/authorize
   Authorization: Bearer <user JWT>
   Content-Type: application/json

   { "client_id": "...", "redirect_uri": "https://app.example.com/cb",
     "response_type": "code", "scope": "people:read groups:read", "state": "xyz" }
   ```

   Los clientes públicos (sin `client_secret`) también deben enviar `"code_challenge": "..."` y `"code_challenge_method": "S256"` (PKCE, RFC 7636). Solo se acepta `S256`.

   Devuelve `{ "code": "...", "state": "xyz" }`. El endpoint del código de autorización es intencionalmente un POST autenticado: tu aplicación obtiene el JWT de B1 del usuario (normalmente alojando un botón dentro de la sesión de B1 del usuario) y lo envía como parte del paso de consentimiento.

2. **Intercambiar el código por tokens**

   ```http
   POST /membership/oauth/token
   Content-Type: application/json

   { "grant_type": "authorization_code", "code": "...",
     "client_id": "...", "client_secret": "...", "redirect_uri": "..." }
   ```

   Si el paso de autorización envió un `code_challenge`, incluye el `"code_verifier": "..."` correspondiente. Un cliente público envía el verificador y omite `client_secret`. El endpoint de token acepta cuerpos JSON o codificados como formulario (`application/x-www-form-urlencoded`).

   Devuelve la respuesta del token:

   ```json
   {
     "access_token": "eyJ...",
     "token_type": "Bearer",
     "expires_in": 604800,
     "created_at": 1715000000,
     "refresh_token": "abc123…",
     "scope": "people:read groups:read"
   }
   ```

3. **Actualizar** cuando el token de acceso está a punto de caducar:

   ```http
   POST /membership/oauth/token
   Content-Type: application/json

   { "grant_type": "refresh_token", "refresh_token": "...",
     "client_id": "...", "client_secret": "..." }
   ```

   El token de actualización caduca tras 90 días sin uso; si ha caducado, el administrador de la iglesia vuelve a autorizar la aplicación.

### Código de dispositivo (TV, quioscos, CLI)

Úsalo cuando el dispositivo no tiene navegador. Definido por RFC 8628.

1. **Solicitar un código de dispositivo**

   ```http
   POST /membership/oauth/device/authorize
   Content-Type: application/json

   { "client_id": "...", "scope": "content:read" }
   ```

   Devuelve el código para el usuario y el intervalo de sondeo:

   ```json
   { "device_code": "...", "user_code": "WXYZ-1234",
     "verification_uri": "https://app.b1.church/device",
     "expires_in": 900, "interval": 5 }
   ```

2. Muestra `user_code` y `verification_uri` al usuario.

3. **Sondea** `/membership/oauth/token` con `grant_type=urn:ietf:params:oauth:grant-type:device_code` y el `device_code`. Respuestas estándar:

   | Error | Significado |
   |---|---|
   | `authorization_pending` | El usuario aún no lo ha aprobado; sigue sondeando al intervalo sugerido |
   | `expired_token` | El código de dispositivo superó `expires_in`; empieza de nuevo |
   | `access_denied` | El usuario rechazó la solicitud |
   | _(ninguno — 200 OK)_ | Aprobado; el cuerpo es un `B1TokenResponse` |

4. Una vez aprobado, guarda el `refresh_token` y usa el `access_token` hasta que caduque.

El SDK de B1 incluye `B1OAuthClient.awaitDeviceToken(...)`, que ejecuta el bucle de sondeo por ti con un retroceso (backoff) razonable y conforme a la RFC.

### Token de actualización

Siempre está disponible como solicitud independiente una vez que tienes un `refresh_token`:

```http
POST /membership/oauth/token
{ "grant_type": "refresh_token", "refresh_token": "...", "client_id": "..." }
```

Se devuelven un nuevo `access_token` y un nuevo `refresh_token`. Los **clientes públicos** (sin `client_secret`) pueden omitir `client_secret` al actualizar; es útil para aplicaciones OAuth de móvil o escritorio que no pueden mantener un secreto.

## Forma del token

Un token de acceso es un JWT emitido por B1, idéntico al que obtendría un usuario de `POST /membership/users/login`: el mismo reclamo de permisos modular y el mismo comportamiento de `checkAccess` en cada controlador. La única diferencia es que el arreglo de permisos se ha filtrado por los alcances concedidos en el momento de la emisión. Un token de acceso con alcances limitados no puede hacer nada que una clave de API con alcances similares no pueda hacer, y no existe una vía OAuth separada en ningún controlador: `actionWrapper` no sabe si el portador es una persona, una clave de API o un cliente OAuth.

## Aplicaciones conectadas (para el usuario)

Desde el punto de vista de un administrador de la iglesia, "Aplicaciones conectadas" es la lista de aplicaciones a las que se ha concedido acceso a su iglesia. Cada fila es un par activo `(OAuthClient, OAuthToken)`.

En B1Admin, **Settings → Developer → Connected Apps** muestra:

- El nombre del cliente
- Los alcances que aprobó el administrador
- La fecha en que se concedió el acceso
- Un botón **Revoke**

| Método y ruta | Autenticación | Propósito |
|---|---|---|
| `GET /membership/oauth/connections` | JWT | Lista las conexiones activas del solicitante (unidas con el nombre del cliente y sus alcances) |
| `DELETE /membership/oauth/connections/:id` | JWT | Revoca una conexión por el id de su token OAuth; el token deja de funcionar en la siguiente solicitud |

La lista excluye automáticamente los tokens caducados.

## Alcances y consentimiento

Las cadenas de alcance son el mismo catálogo que las [claves de API](./api-keys#scopes). Buenas prácticas para los clientes:

- **Solicita los alcances más restringidos que funcionen.** Las iglesias se dan cuenta si pides `donations:write` cuando solo necesitas leer personas.
- **Usa un token de actualización junto con tokens de acceso de corta duración.** Los tokens de acceso de larga duración son más difíciles de revocar con rapidez.
- **Muestra siempre al usuario los alcances concedidos** en tu propia interfaz, para que pueda verificar lo que aprobó.

## Administración de clientes OAuth

Los clientes OAuth (las propias aplicaciones de terceros) se registran de forma global. Un cliente confidencial con `client_secret` lo crea un administrador del servidor de B1: para obtener uno, contacta al equipo de ChurchApps para que te entreguen un par `client_id` / `client_secret` y registra tus URI de redirección. Los clientes públicos, como los conectores MCP, pueden registrarse por sí mismos (ver más abajo).

Las URI de redirección registradas deben coincidir exactamente con el `redirect_uri` de la solicitud; una coincidencia parcial o por prefijo se rechaza.

| Método y ruta | Permiso | Descripción |
|---|---|---|
| `GET /membership/oauth/clients` | Server.Admin | Lista todos los clientes OAuth |
| `GET /membership/oauth/clients/clientId/:clientId` | — | Obtiene un cliente por su id público (secreto oculto) |
| `POST /membership/oauth/clients` | Server.Admin | Crea o actualiza un cliente |
| `DELETE /membership/oauth/clients/:id` | Server.Admin | Elimina un cliente |

### Registro dinámico de clientes

`POST /membership/oauth/register` (público, RFC 7591) permite que un cliente, como el conector MCP de claude.ai, se registre por sí mismo. Se anuncia en el documento `/.well-known/oauth-authorization-server` de la API; consulta [Servidor MCP → Descubrimiento de OAuth](./mcp#oauth-discovery).

```http
POST /membership/oauth/register
Content-Type: application/json

{ "client_name": "My AI assistant", "redirect_uris": ["https://assistant.example.com/oauth/callback"], "scope": "people:read" }
```

Devuelve 201 con `client_id`, `client_id_issued_at`, `client_name`, `redirect_uris`, `grant_types` (`authorization_code`, `refresh_token`), `response_types` (`code`) y `token_endpoint_auth_method: "none"`.

- No se emite ningún secreto, así que el cliente debe usar PKCE en cada autorización.
- `redirect_uris` debe contener de 1 a 10 URL `https`, o `http` en `localhost`, `127.0.0.1` o `[::1]`.
- `client_name` se recorta a 45 caracteres (valor predeterminado "AI assistant").
- Limitado a 20 registros por hora por IP.

En la página de consentimiento de B1Admin, un cliente que se registró por sí mismo muestra un aviso de que se registró solo, que nunca puede hacer más de lo que puede hacer la cuenta de B1 del propio usuario, y que puede desconectarse en **Settings → Developer → Connected Apps**.

## Soporte del SDK

El paquete `@churchapps/integration-sdk` envuelve cada flujo de OAuth con funciones auxiliares tipadas: `B1OAuthClient.exchangeCode()`, `.refresh()`, `.startDeviceFlow()`, `.pollDeviceToken()` y `.awaitDeviceToken()`. Consulta el README del paquete y [Webhooks](./webhooks#sdk-support) para ver un ejemplo completo de principio a fin.
