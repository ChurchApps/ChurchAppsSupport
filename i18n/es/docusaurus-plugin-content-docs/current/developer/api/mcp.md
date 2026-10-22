---
title: "Servidor MCP"
---

# Servidor MCP

<div class="article-intro">

La API de B1 incluye un servidor [MCP (Model Context Protocol)](https://modelcontextprotocol.io) en `/mcp`. Cualquier cliente de IA compatible con MCP (conectores personalizados de claude.ai, Claude Code, Claude Desktop, el SDK de agentes de OpenAI, Cursor o uno propio) puede conectarse y llamar a la API REST subyacente en nombre de un usuario autenticado de la iglesia. Es un envoltorio ligero y genérico: tres herramientas genéricas exponen toda la superficie de la API de forma dinámica, en lugar de modelar cada endpoint a mano, además de una herramienta de guía de dominio para el constructor de sitios web.

</div>

<div class="prereqs">
<h4>Antes de comenzar</h4>

- Una [clave de API de B1](./api-keys) (`cak_…`) con los permisos (scopes) que debe tener el cliente, o un cliente MCP que pueda iniciar sesión con OAuth (véase [Descubrimiento OAuth](#oauth-discovery))
- Un host de la API de B1 accesible: `https://api.churchapps.org` para iglesias alojadas, o tu propio despliegue
- Un cliente MCP. Consulta [Claude](/docs/b1-admin/integrations/claude) y [ChatGPT](/docs/b1-admin/integrations/chatgpt) para la configuración de usuario final

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
| **Método** | Solo `POST`; la solicitud/respuesta y el streaming SSE ocurren en el mismo endpoint |
| **Transporte** | [MCP Streamable HTTP](https://modelcontextprotocol.io/specification/2025-11-25/basic/transports) |
| **Modelo de sesión** | Sin estado. Se construye una nueva instancia del servidor MCP por solicitud; no hay id de sesión ni reanudación |
| **Autenticación** | Token Bearer. Funcionan tanto las claves `cak_…` como los JWT de B1 (incluidos los tokens de acceso OAuth); la resolución es la misma que en cualquier otro endpoint autenticado |

Una solicitud cuyo encabezado `Authorization` falta o no es válido devuelve:

```json
{ "error": "Unauthorized — MCP requires a valid bearer token (cak_* API key or JWT)." }
```

con HTTP 401 y un encabezado `WWW-Authenticate: Bearer resource_metadata="<api>/.well-known/oauth-protected-resource"`, que los clientes compatibles con OAuth siguen para iniciar sesión.

## Herramientas

Tres herramientas genéricas y una guía. El modelo usa `list_endpoints` para descubrir endpoints, `describe_endpoint` para conocer la forma de un payload, `api_call` para invocar realmente la API y `describe_page_builder` cuando la tarea implica contenido de sitio web.

### `list_endpoints`

Devuelve el inventario completo de rutas REST registradas, filtrado por una subcadena opcional y/o por verbo HTTP. Cada entrada incluye el nombre del controlador y los permisos (scopes) de clave de API que probablemente se necesitan.

**Entrada:**

| Campo | Tipo | Descripción |
|---|---|---|
| `filter` | string (opcional) | Subcadena sin distinguir mayúsculas que se busca en la ruta, por ejemplo `"people"` |
| `method` | enum (opcional) | `GET` / `POST` / `PUT` / `DELETE` / `PATCH` |

**Salida:** un documento JSON con la forma siguiente:

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

El inventario se construye una sola vez al iniciar la API, a partir de la tabla de rutas activa; todo lo que puedas consultar con `curl` aparece aquí.

### `describe_endpoint`

Devuelve un resumen breve y, cuando está disponible, un cuerpo de solicitud y una respuesta de ejemplo redactados a mano para un endpoint.

**Entrada:**

| Campo | Tipo | Descripción |
|---|---|---|
| `method` | string | Verbo HTTP |
| `path` | string | Ruta completa tal como la devuelve `list_endpoints` |

**Salida:** para los endpoints con ejemplo, un ejemplo con `summary`, `requestBody` y `responseSample`. Para los endpoints sin ejemplo, un mensaje de respaldo que indica al modelo que llame primero a `GET` para ver la forma. Unas doce rutas de mucho tráfico (personas, grupos, donaciones, asistencia, fondos) tienen ejemplo.

### `api_call`

Invoca el endpoint REST elegido, dentro del mismo proceso, a través de la misma pila de middleware de Express que una solicitud HTTP normal: se aplican autenticación, análisis del cuerpo, registro de auditoría y la delimitación por iglesia.

**Entrada:**

| Campo | Tipo | Descripción |
|---|---|---|
| `method` | enum | `GET` / `POST` / `PUT` / `DELETE` / `PATCH` |
| `path` | string | Ruta incluido el prefijo del módulo, por ejemplo `/membership/people` |
| `query` | object (opcional) | Objeto plano con los parámetros de la cadena de consulta |
| `body` | any (opcional) | Cuerpo JSON de la solicitud; normalmente un array de objetos del modelo para `POST` |

**Salida:**

```json
{
  "status": 200,
  "truncated": false,
  "body": [ /* the controller's JSON response */ ]
}
```

El resultado de la herramienta se marca con `isError: true` para cualquier respuesta con estado ≥ 400.

### `describe_page_builder`

La única herramienta no genérica: una guía estática y autocontenida para crear páginas de sitio web mediante los endpoints `/content/*`. Incluye el modelo de datos Page → Section → Element, el flujo de creación, cada `elementType` con la forma de su `answersJSON`, los ajustes a nivel de sección como los divisores de forma `dividerTop`/`dividerBottom`, y un ejemplo completo y práctico. No recibe entrada y refleja el catálogo de elementos que mantiene el editor de B1Admin (véase [Arquitectura del constructor de sitios web](../architecture/website-builder)). Se espera que los agentes llamen a esta herramienta una vez antes de crear o editar contenido de páginas y, después, actúen mediante `api_call`.

## Modelo de autenticación

La solicitud MCP en sí pasa por `CustomAuthProvider.getUser()`, la misma ruta que usa cualquier endpoint autenticado de B1. Un bearer `cak_…` se resuelve en un `Principal` cuyos permisos son el RBAC actual de la persona que emitió la clave, **intersecado** con los permisos (scopes) concedidos a la clave. Esta intersección se recalcula en cada solicitud, por lo que:

- Quitar un permiso a una clave (eliminándola y creándola de nuevo) corta el acceso en la siguiente llamada.
- Quitar un permiso a la persona subyacente en B1Admin corta el acceso en la siguiente llamada, aunque la clave siga existiendo.

En las invocaciones anidadas de `api_call`, el encabezado `Authorization` original se copia en la solicitud sintética, así que `CustomAuthProvider` se ejecuta de nuevo y la intersección de permisos se aplica en cada llamada. No hay caché de tokens.

## Lista de rutas bloqueadas

Un pequeño conjunto de rutas no es accesible mediante `api_call`, incluso con una clave válida:

| Patrón | Motivo |
|---|---|
| `/giving/donate/webhook/*` | Los endpoints de webhook del proveedor esperan cuerpos sin procesar y con firma verificada de Stripe/PayPal, no de llamadores generales |
| `/membership/oauth/clients*` | El registro de clientes OAuth es solo para operadores |
| `/membership/people/apiEmails` | Protegida por el `jwtSecret` del operador, no por los permisos de usuario |
| Cualquier ruta que espere `multipart/form-data` | Las subidas de archivos no son compatibles con JSON-RPC |

Una ruta bloqueada devuelve un resultado de herramienta con `isError: true` y un mensaje descriptivo; la ruta subyacente nunca se invoca.

## Límite de tamaño de respuesta

El cuerpo de cada respuesta de `api_call` se limita a **64 KB** de salida capturada. Si una consulta supera el límite, la respuesta incluye `"truncated": true` y se espera que el modelo reintente con parámetros de consulta más restrictivos. Así una sola respuesta de herramienta no desborda la ventana de contexto del cliente.

## Límite de frecuencia

No hay un límite de frecuencia a nivel de aplicación en `/mcp`. La limitación se delega a la concurrencia de API Gateway / Lambda en producción, y al proxy inverso en los despliegues autoalojados.

## Descubrimiento OAuth

El servidor MCP anuncia metadatos de OAuth 2.1 para que los clientes que solo se conectan a servidores descubiertos por OAuth (en particular, la interfaz «Add custom connector» de Claude.ai) puedan iniciar sesión de un usuario sin pegar una clave. `/mcp` es el recurso protegido, el [proveedor OAuth](./connected-apps) existente bajo `/membership/oauth` es su servidor de autorización, y la página `/oauth` de B1Admin es la pantalla de consentimiento.

| Endpoint | Finalidad |
|---|---|
| `GET /.well-known/oauth-protected-resource` (también `/.well-known/oauth-protected-resource/mcp`) | Metadatos del recurso protegido (RFC 9728): `resource` es `<api>/mcp`, `authorization_servers` es la raíz de la API, `scopes_supported` enumera cada [permiso de clave de API](./api-keys#scopes) |
| `GET /.well-known/oauth-authorization-server` | Metadatos del servidor de autorización (RFC 8414): `authorization_endpoint` es `/oauth` de B1Admin, `token_endpoint` es `/membership/oauth/token`, `registration_endpoint` es `/membership/oauth/register` |
| `POST /membership/oauth/register` | Registro dinámico de clientes (RFC 7591) |

El flujo que ejecuta un cliente como claude.ai:

1. `POST /mcp` sin token devuelve 401 con el encabezado `WWW-Authenticate` que apunta a los metadatos del recurso protegido.
2. El cliente lee ambos documentos de metadatos y después se registra con `POST /membership/oauth/register`, enviando `client_name`, `redirect_uris` y, opcionalmente, `scope`. Todo cliente que se registra por sí mismo es un cliente **público**: no se emite secreto y la respuesta incluye `token_endpoint_auth_method: "none"`. Las URI de redirección deben ser `https`, o `http` en una dirección de bucle local (`localhost`, `127.0.0.1`, `[::1]`); como máximo 10 por cliente. El registro tiene un límite de 20 por hora por IP.
3. Se envía al usuario a `/oauth` de B1Admin con `code_challenge` y `code_challenge_method=S256`. La página de consentimiento enumera cada permiso solicitado en lenguaje sencillo (o «Todo lo que tu cuenta de B1 puede acceder» si no se solicitó ninguno), muestra el host al que se devolverá al usuario e indica cuándo la aplicación se registró por sí misma. El usuario hace clic en **Allow**.
4. El cliente intercambia el código en `/membership/oauth/token` con `grant_type=authorization_code` y su `code_verifier`, y más tarde actualiza el token con `grant_type=refresh_token`. Se aceptan tanto cuerpos codificados como formulario como JSON.
5. El token de acceso resultante es un JWT de B1 con permisos limitados, que se usa como bearer en `/mcp`.

Reglas de PKCE: solo se acepta `S256`. Un cliente sin secreto debe enviar un `code_challenge` en la autorización y el `code_verifier` correspondiente en el intercambio del token; los clientes confidenciales (con secreto) pueden seguir usando solo el secreto. Las URI de redirección deben coincidir exactamente con una URI registrada.

Los clientes que aceptan un token bearer estático en su configuración (Claude Code, Claude Desktop, el SDK de agentes de OpenAI, Cursor, código propio) pueden seguir usando una clave `cak_…` en su lugar.

## Desarrollo local

El endpoint MCP se monta junto con el resto cuando la API se ejecuta en local:

```bash
cd Api
npm run dev
# Server listening on http://localhost:8084
```

Al iniciar, la línea de registro `📡 MCP server ready at /mcp — N routes in inventory` confirma que el inventario se construyó.

Prueba el endpoint con MCP Inspector:

```bash
npx @modelcontextprotocol/inspector
```

En la interfaz de Inspector, apunta a `http://localhost:8084/mcp` y establece el encabezado `Authorization` como `Bearer cak_<prefix>.<secret>`. Llama primero a `list_endpoints`; deberías ver la lista completa de rutas. Después, `api_call({ method: "GET", path: "/membership/people" })` debería devolver las personas de datos de ejemplo de tu entorno local.

## Estructura del código

El servidor MCP está en `src/modules/mcp/` dentro del repositorio Api. Archivos destacados:

| Archivo | Finalidad |
|---|---|
| `McpController.ts` | `@controller("/mcp")`; crea un `StreamableHTTPServerTransport` por solicitud y envía el desafío `WWW-Authenticate` en un 401 |
| `WellKnownController.ts` / `OAuthMetadata.ts` | Sirve los documentos de descubrimiento OAuth en `/.well-known` |
| `McpServer.ts` | Construye un `Server` de MCP y registra las cuatro herramientas |
| `RouteInventory.ts` | Recorre los metadatos de inversify-express-utils al iniciar para enumerar las rutas |
| `internalDispatch.ts` | `req`/`res` sintéticos que vuelven a entrar en la aplicación Express dentro del mismo proceso |
| `tools/` | `listEndpoints.ts`, `describeEndpoint.ts`, `apiCall.ts`, `describePageBuilder.ts` |
| `examples.ts` | Ejemplos curados de solicitud/respuesta para los endpoints de mayor tráfico |

## Relacionado

- [Claves de API](./api-keys)
- [Webhooks](./webhooks)
- [Aplicaciones conectadas (OAuth)](./connected-apps)
- [Claude — configuración para usuarios finales](/docs/b1-admin/integrations/claude)
- [ChatGPT — configuración para usuarios finales](/docs/b1-admin/integrations/chatgpt)
