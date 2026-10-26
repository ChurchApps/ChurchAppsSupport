---
title: "Servidor MCP"
---

# Servidor MCP

<div class="article-intro">

La API de B1 incluye un servidor [MCP (Model Context Protocol)](https://modelcontextprotocol.io) en `/mcp`. Cualquier cliente de IA compatible con MCP -- conectores personalizados de claude.ai, Claude Code, Claude Desktop, el SDK de agentes de OpenAI, Cursor o uno propio -- puede conectarse y llamar a la API REST subyacente en nombre de un usuario de iglesia autenticado. Es un envoltorio ligero y genérico: tres herramientas genéricas exponen toda la superficie de la API de forma dinámica, en lugar de modelar cada endpoint a mano, además de una herramienta de guía de dominio para el creador de sitios web.

</div>

<div class="prereqs">
<h4>Antes de comenzar</h4>

- Una [clave de API de B1](./api-keys) (`cak_…`) con los alcances que necesita el cliente, o un cliente MCP que pueda iniciar sesión con OAuth (consulte [Descubrimiento de OAuth](#oauth-discovery))
- Un host de API de B1 accesible: `https://api.churchapps.org` para las iglesias alojadas, o su propio despliegue
- Un cliente MCP. Consulte [Claude](/docs/b1-admin/integrations/claude) y [ChatGPT](/docs/b1-admin/integrations/chatgpt) para la configuración de usuario final

</div>

## Endpoint

```
POST /mcp
Content-Type: application/json
Accept: application/json, text/event-stream
Authorization: Bearer cak_<prefix>.<secret>
```

| Aspecto | Valor |
|---|---|
| **Ruta** | `/mcp` (relativa al host de la API) |
| **Método** | Solo `POST`: la solicitud y respuesta, así como el streaming SSE, ocurren en el mismo endpoint |
| **Transporte** | [MCP Streamable HTTP](https://modelcontextprotocol.io/specification/2025-11-25/basic/transports) |
| **Modelo de sesión** | Sin estado. Se construye una nueva instancia del servidor MCP por solicitud: sin ID de sesión ni reanudación |
| **Autenticación** | Token Bearer. Las claves de API `cak_…` y los JWT de B1 (incluidos los tokens de acceso OAuth) funcionan; la resolución es la misma que en cualquier otro endpoint autenticado |

Una solicitud cuyo encabezado `Authorization` falta o no es válido devuelve:

```json
{ "error": "Unauthorized — MCP requires a valid bearer token (cak_* API key or JWT)." }
```

con HTTP 401 y un encabezado `WWW-Authenticate: Bearer resource_metadata="<api>/.well-known/oauth-protected-resource"`, que los clientes con capacidad OAuth siguen para iniciar sesión.

En la API alojada (producción y demo), `/mcp` se sirve a través de una HTTP API de API Gateway en lugar de la API REST que usa el resto de los endpoints. La API REST renombra `WWW-Authenticate` como `x-amzn-remapped-www-authenticate` en las respuestas proxy de Lambda, lo que dejaba a clientes como ChatGPT con un 401 sin más información y sin forma de iniciar sesión; la HTTP API transmite el encabezado sin cambios.

## Herramientas

Tres herramientas genéricas y una guía. El modelo usa `list_endpoints` para descubrir, `describe_endpoint` para conocer la forma de un cuerpo, `api_call` para invocar la API y `describe_page_builder` cuando la tarea involucra contenido de sitio web.

### `list_endpoints`

Devuelve el inventario completo de rutas REST registradas, filtrado por una subcadena opcional y/o por verbo HTTP. Cada entrada incluye el nombre del controlador y los alcances de clave de API que probablemente se necesiten.

**Entrada:**

| Campo | Tipo | Descripción |
|---|---|---|
| `filter` | string (opcional) | Subcadena sin distinción de mayúsculas que se compara con la ruta, por ejemplo `"people"` |
| `method` | enum (opcional) | `GET` / `POST` / `PUT` / `DELETE` / `PATCH` |

**Salida:** un documento JSON con esta forma:

```json
{
  "total": 24,
  "endpoints": [
    {
      "method": "GET",
      "path": "/membership/people",
      "controller": "PersonController.getAll",
      "likelyScopes": ["people:read", "people:write"]
    }
  ]
}
```

El inventario se construye una sola vez al iniciar la API, a partir de la tabla de rutas en vivo: todo lo que puede consultarse con `curl` aparece aquí.

### `describe_endpoint`

Devuelve un resumen breve y, cuando está disponible, un ejemplo de cuerpo de solicitud y de respuesta redactado a mano para un endpoint.

**Entrada:**

| Campo | Tipo | Descripción |
|---|---|---|
| `method` | string | Verbo HTTP |
| `path` | string | Ruta completa tal como la devuelve `list_endpoints` |

**Salida:** para los endpoints con ejemplo, un ejemplo con `summary`, `requestBody` y `responseSample`. Para los endpoints sin ejemplo, un mensaje de respaldo que indica al modelo que llame primero a `GET` para ver la forma. Unas doce rutas de alto tráfico (personas, grupos, donativos, asistencia, fondos) tienen ejemplo.

### `api_call`

Invoca el endpoint REST elegido, dentro del mismo proceso, a través de la misma pila de middleware de Express que una solicitud HTTP normal: se aplican la autenticación, el procesamiento del cuerpo, el registro de auditoría y el alcance por iglesia.

**Entrada:**

| Campo | Tipo | Descripción |
|---|---|---|
| `method` | enum | `GET` / `POST` / `PUT` / `DELETE` / `PATCH` |
| `path` | string | Ruta con el prefijo del módulo, por ejemplo `/membership/people` |
| `query` | object (opcional) | Objeto plano con parámetros de cadena de consulta |
| `body` | any (opcional) | Cuerpo JSON de la solicitud: normalmente un arreglo de objetos del modelo para `POST` |

**Salida:**

```json
{
  "status": 200,
  "truncated": false,
  "body": [ /* the controller's JSON response */ ]
}
```

El resultado de la herramienta se marca como `isError: true` para cualquier respuesta con estado ≥ 400.

### `describe_page_builder`

La única herramienta no genérica: una guía estática y autocontenida para crear páginas de sitio web a través de los endpoints `/content/*`. Cubre el modelo de datos Page → Section → Element, el flujo de creación, cada `elementType` con la forma de su `answersJSON`, la configuración a nivel de sección como los divisores de forma `dividerTop`/`dividerBottom`, y un ejemplo completo paso a paso. No recibe entrada y refleja el catálogo de elementos que mantiene el editor de B1Admin (consulte [Arquitectura del creador de sitios web](../architecture/website-builder)). Se espera que los agentes llamen una vez a esta herramienta antes de crear o editar contenido de página, y luego actúen mediante `api_call`.

## Modelo de autenticación

La solicitud MCP en sí pasa por `CustomAuthProvider.getUser()`: la misma ruta que usa cada endpoint autenticado de B1. Un token bearer `cak_…` se resuelve en un `Principal` cuyos permisos son el RBAC actual de la persona que emitió la clave, **intersecado** con los alcances concedidos a la clave. Esta intersección se recalcula en cada solicitud, por lo que:

- Quitar un alcance de una clave (eliminándola y creándola de nuevo) corta el acceso en la siguiente llamada.
- Quitar un permiso a la persona subyacente en B1Admin corta el acceso en la siguiente llamada, incluso si la clave sigue existiendo.

Para las invocaciones `api_call` anidadas, el encabezado `Authorization` original se copia en la solicitud sintética, de modo que `CustomAuthProvider` se ejecuta de nuevo y la intersección de alcances se vuelve a aplicar en cada llamada. No hay caché de tokens.

## Lista de rutas bloqueadas

Un pequeño conjunto de rutas no es accesible mediante `api_call`, aunque la clave sea válida:

| Patrón | Motivo |
|---|---|
| `/giving/donate/webhook/*` | Los endpoints de webhook de los proveedores esperan cuerpos sin procesar y con firma verificada de Stripe/PayPal, no de llamadores generales |
| `/membership/oauth/clients*` | El registro de clientes OAuth es exclusivo del operador |
| `/membership/people/apiEmails` | Protegida por el `jwtSecret` del operador, no por los permisos de usuario |
| Cualquier ruta que espere `multipart/form-data` | Las cargas de archivos no son compatibles con JSON-RPC |

Una ruta bloqueada devuelve un resultado de herramienta con `isError: true` y un mensaje descriptivo; la ruta subyacente nunca se invoca.

## Límite de tamaño de respuesta

El cuerpo de cada respuesta de `api_call` se limita a **64 KB** de salida capturada. Si una consulta supera el límite, la respuesta incluye `"truncated": true` y se espera que el modelo reintente con parámetros de consulta más acotados. Así una sola respuesta de herramienta no desborda la ventana de contexto del cliente.

## Límite de frecuencia

No hay un límite de frecuencia a nivel de aplicación en `/mcp`. La limitación se delega a la concurrencia de API Gateway / Lambda en producción, y a lo que aplique su proxy inverso en despliegues autoalojados.

## Descubrimiento de OAuth

El servidor MCP anuncia metadatos de OAuth 2.1 para que los clientes que solo se conectan a servidores descubiertos por OAuth -en particular, la interfaz "Add custom connector" de Claude.ai- puedan iniciar sesión a un usuario sin una clave pegada. `/mcp` es el recurso protegido, el [proveedor OAuth](./connected-apps) existente bajo `/membership/oauth` es su servidor de autorización, y la página `/oauth` de B1Admin es la pantalla de consentimiento.

| Endpoint | Propósito |
|---|---|
| `GET /.well-known/oauth-protected-resource` (también `/.well-known/oauth-protected-resource/mcp`) | Metadatos del recurso protegido (RFC 9728): `resource` es `<api>/mcp`, `authorization_servers` es la raíz de la API, `scopes_supported` enumera cada [alcance de clave de API](./api-keys#scopes) |
| `GET /.well-known/oauth-authorization-server` | Metadatos del servidor de autorización (RFC 8414): `authorization_endpoint` es `/oauth` de B1Admin, `token_endpoint` es `/membership/oauth/token`, `registration_endpoint` es `/membership/oauth/register` |
| `POST /membership/oauth/register` | Registro dinámico de clientes (RFC 7591) |

El flujo que ejecuta un cliente como claude.ai:

1. `POST /mcp` sin token devuelve 401 con el encabezado `WWW-Authenticate` que apunta a los metadatos del recurso protegido.
2. El cliente lee ambos documentos de metadatos y luego se registra con `POST /membership/oauth/register`, enviando `client_name`, `redirect_uris` y, opcionalmente, `scope`. Todo cliente auto-registrado es un cliente **público**: no se emite ningún secreto y la respuesta incluye `token_endpoint_auth_method: "none"`. Las URI de redirección deben ser `https`, o `http` en una dirección de bucle local (`localhost`, `127.0.0.1`, `[::1]`); como máximo 10 por cliente. El registro tiene un límite de 20 por hora por IP.
3. El usuario es enviado a `/oauth` de B1Admin con `code_challenge` y `code_challenge_method=S256`. La página de consentimiento enumera cada alcance solicitado en lenguaje sencillo (o "Everything your B1 account can access" si no se solicitó ninguno), muestra el host al que se devolverá al usuario e indica cuando la aplicación se registró a sí misma. El usuario hace clic en **Allow**.
4. El cliente intercambia el código en `/membership/oauth/token` con `grant_type=authorization_code` y su `code_verifier`, y más adelante renueva con `grant_type=refresh_token`. Se aceptan cuerpos codificados como formulario y como JSON.
5. El token de acceso resultante es un JWT de B1 con alcance, que se usa como bearer en `/mcp`.

Reglas de PKCE: solo se acepta `S256`. Un cliente sin secreto debe enviar un `code_challenge` en la autorización y el `code_verifier` correspondiente en el intercambio de token; los clientes confidenciales (con secreto) pueden seguir usando solo el secreto. Las URI de redirección deben coincidir exactamente con una URI registrada.

Los clientes que aceptan un token bearer estático en su configuración -Claude Code, Claude Desktop, el SDK de agentes de OpenAI, Cursor y código personalizado- pueden seguir usando una clave `cak_…` en su lugar.

## Desarrollo local

El endpoint MCP se monta junto con todo lo demás cuando la API se ejecuta en local:

```bash
cd Api
npm run dev
# Server listening on http://localhost:8084
```

Al iniciar, la línea de registro `📡 MCP server ready at /mcp — N routes in inventory` confirma que se construyó el inventario.

Pruébelo con MCP Inspector:

```bash
npx @modelcontextprotocol/inspector
```

En la interfaz de Inspector, apúntelo a `http://localhost:8084/mcp` y configure el encabezado `Authorization` como `Bearer cak_<prefix>.<secret>`. Llame primero a `list_endpoints`; debería ver la lista completa de rutas. Luego, `api_call({ method: "GET", path: "/membership/people" })` debería devolver las personas de ejemplo de su base local.

## Estructura del código

El servidor MCP está en `src/modules/mcp/` del repositorio Api. Archivos destacados:

| Archivo | Propósito |
|---|---|
| `McpController.ts` | `@controller("/mcp")`; crea un `StreamableHTTPServerTransport` por solicitud y envía el desafío `WWW-Authenticate` en las respuestas 401 |
| `WellKnownController.ts` / `OAuthMetadata.ts` | Sirve los documentos de descubrimiento OAuth de `/.well-known` |
| `McpServer.ts` | Construye un `Server` de MCP y registra las cuatro herramientas |
| `RouteInventory.ts` | Recorre los metadatos de inversify-express-utils al iniciar para enumerar las rutas |
| `internalDispatch.ts` | `req`/`res` sintéticos que vuelven a entrar en la aplicación Express dentro del mismo proceso |
| `tools/` | `listEndpoints.ts`, `describeEndpoint.ts`, `apiCall.ts`, `describePageBuilder.ts` |
| `examples.ts` | Ejemplos curados de solicitud y respuesta para los endpoints de alto tráfico |

## Relacionado

- [Claves de API](./api-keys)
- [Webhooks](./webhooks)
- [Aplicaciones conectadas (OAuth)](./connected-apps)
- [Claude — configuración para usuarios finales](/docs/b1-admin/integrations/claude)
- [ChatGPT — configuración para usuarios finales](/docs/b1-admin/integrations/chatgpt)
