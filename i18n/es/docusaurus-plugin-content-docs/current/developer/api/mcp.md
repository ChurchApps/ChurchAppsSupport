---
title: "Servidor MCP"
---

# Servidor MCP

<div class="article-intro">

La API de B1 incluye un servidor [MCP (Model Context Protocol)](https://modelcontextprotocol.io) en `/mcp`. Cualquier cliente de IA compatible con MCP -- Claude Code, Claude Desktop, el OpenAI Agents SDK, Cursor, o el tuyo propio -- puede conectarse a él e invocar la API REST subyacente en nombre de un usuario de iglesia autenticado. Es un envoltorio delgado y genérico: tres herramientas genéricas exponen toda la superficie de la API dinámicamente en lugar de modelar manualmente cada punto final, más una herramienta de guía de dominio para el generador de sitios web.

</div>

<div class="prereqs">
<h4>Antes de comenzar</h4>

- Una [clave API de B1](./api-keys) (`cak_…`) con los alcances que el cliente debe tener
- Un host de API B1 accesible -- `https://api.churchapps.org` para iglesias alojadas, o tu propia implementación
- Un cliente MCP. Consulta [Claude](/docs/b1-admin/integrations/claude) y [ChatGPT](/docs/b1-admin/integrations/chatgpt) para configuración de usuario final

</div>

## Punto Final

```
POST /mcp
Content-Type: application/json
Accept: application/json, text/event-stream
Authorization: Bearer cak_<prefix>.<secret>
```

| Aspecto | Valor |
|---|---|
| **Ruta** | `/mcp` (relativa al host de la API) |
| **Método** | Solo `POST` — la solicitud/respuesta y la transmisión SSE ocurren ambas en el mismo punto final |
| **Transporte** | [MCP Streamable HTTP](https://modelcontextprotocol.io/specification/2025-11-25/basic/transports) |
| **Modelo de sesión** | Sin estado. Se construye una instancia fresca del servidor MCP por solicitud -- sin ID de sesión, sin reanudación |
| **Auth** | Token portador. Las claves API `cak_…` y los JWT de B1 funcionan ambos; la resolución es la misma que cualquier otro punto final autenticado |

Una solicitud cuyo encabezado `Authorization` falte o sea inválido devuelve:

```json
{ "error": "Unauthorized — MCP requires a valid bearer token (cak_* API key or JWT)." }
```

con HTTP 401.

## Herramientas

Tres herramientas genéricas más una guía. El modelo usa `list_endpoints` para descubrimiento, `describe_endpoint` para aprender la forma de un payload, `api_call` para invocar realmente la API, y `describe_page_builder` cuando la tarea involucra contenido de sitio web.

### `list_endpoints`

Devuelve el inventario completo de rutas REST registradas, filtrado por una subcadena opcional y/o verbo HTTP. Cada entrada incluye el nombre del controlador y los alcances de clave API más probablemente necesarios.

**Entrada:**

| Campo | Tipo | Descripción |
|---|---|---|
| `filter` | string (opcional) | Subcadena sin distinción de mayúsculas comparada contra la ruta, p. ej. `"people"` |
| `method` | enum (opcional) | `GET` / `POST` / `PUT` / `DELETE` / `PATCH` |

**Salida:** un documento JSON de la forma

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

El inventario se construye una vez al inicio de la API a partir de la tabla de rutas en vivo -- cualquier cosa que puedas alcanzar con `curl` aparece aquí.

### `describe_endpoint`

Devuelve un breve resumen más, cuando está disponible, un cuerpo de solicitud y muestra de respuesta curados a mano para un punto final.

**Entrada:**

| Campo | Tipo | Descripción |
|---|---|---|
| `method` | string | Verbo HTTP |
| `path` | string | Ruta completa como la devuelve `list_endpoints` |

**Salida:** para puntos finales curados, un ejemplo con `summary`, `requestBody`, y `responseSample`. Para puntos finales no curados, un mensaje de reserva instruyendo al modelo a llamar primero a `GET` para ver la forma. Aproximadamente una docena de rutas de alto tráfico (people, groups, donations, attendance, funds) están curadas.

### `api_call`

Invoca el punto final REST elegido, en proceso, a través de la misma pila de middleware de Express que una solicitud HTTP normal -- auth, análisis de cuerpo, registro de auditoría, y alcance por iglesia todos aplican.

**Entrada:**

| Campo | Tipo | Descripción |
|---|---|---|
| `method` | enum | `GET` / `POST` / `PUT` / `DELETE` / `PATCH` |
| `path` | string | Ruta incluyendo cualquier prefijo de módulo, p. ej. `/membership/people` |
| `query` | object (opcional) | Objeto plano de parámetros de cadena de consulta |
| `body` | any (opcional) | Cuerpo de solicitud JSON -- típicamente un arreglo de objetos de modelo para `POST` |

**Salida:**

```json
{
  "status": 200,
  "truncated": false,
  "body": [ /* la respuesta JSON del controlador */ ]
}
```

El resultado de la herramienta se marca `isError: true` para cualquier respuesta con estado ≥ 400.

### `describe_page_builder`

La única herramienta no genérica: una guía estática y autocontenida para construir páginas de sitio web a través de los puntos finales `/content/*` -- el modelo de datos Página → Sección → Elemento, el flujo de trabajo de creación, cada `elementType` con su forma de `answersJSON`, ajustes a nivel de sección como los divisores de forma `dividerTop`/`dividerBottom`, y un ejemplo trabajado de extremo a extremo. No toma entrada y refleja el catálogo de elementos mantenido en el editor de B1 Admin (consulta [Arquitectura del Generador de Sitios Web](../architecture/website-builder)). Se espera que los agentes la llamen una vez antes de crear o editar contenido de página, luego actúen vía `api_call`.

## Modelo de Auth

La solicitud MCP en sí se ejecuta a través de `CustomAuthProvider.getUser()` -- la misma ruta que usa cada punto final autenticado de B1. Un portador `cak_…` se resuelve en un `Principal` cuyos permisos son el RBAC actual de la persona emisora, **intersectado** con los alcances otorgados de la clave. Esta intersección se recalcula en cada solicitud, así que:

- Quitar un alcance de una clave (eliminándola y recreándola) corta el acceso en la siguiente llamada.
- Quitar un permiso de la persona subyacente en B1 Admin corta el acceso en la siguiente llamada, incluso si la clave todavía existe.

Para invocaciones anidadas de `api_call`, el encabezado `Authorization` original se copia en la solicitud sintética, así que `CustomAuthProvider` se ejecuta de nuevo y la intersección de alcance se reaplica por llamada. No hay caché de tokens.

## Lista de Bloqueo de Rutas

Un pequeño conjunto de rutas no son alcanzables vía `api_call`, incluso con una clave válida:

| Patrón | Por Qué |
|---|---|
| `/giving/donate/webhook/*` | Los puntos finales de webhook del proveedor esperan cuerpos crudos, verificados por firma de Stripe/PayPal -- no llamadores generales |
| `/membership/oauth/clients*` | El registro de cliente OAuth es solo para el operador |
| `/membership/people/apiEmails` | Protegido por el `jwtSecret` del operador, no por permisos de usuario |
| Cualquier ruta que espere `multipart/form-data` | Las cargas de archivos no son amigables con JSON-RPC |

Una ruta bloqueada devuelve un resultado de herramienta `isError: true` con un mensaje descriptivo; la ruta subyacente nunca se invoca.

## Límite de Tamaño de Respuesta

Cada cuerpo de respuesta de `api_call` está limitado a **64 KB** de salida capturada. Si una consulta excede el límite, la respuesta lleva `"truncated": true` y se espera que el modelo reintente con parámetros de consulta más estrechos. Esto evita que una sola respuesta de herramienta agote la ventana de contexto del cliente.

## Limitación de Tasa

No hay límite de tasa a nivel de aplicación en `/mcp`. La regulación se difiere a la concurrencia de API Gateway / Lambda en producción, y a lo que tu proxy inverso imponga en implementaciones auto-alojadas.

## Descubrimiento OAuth

El servidor MCP **no** anuncia metadatos OAuth 2.1 (`/.well-known/oauth-authorization-server`, registro de cliente dinámico, flujo PKCE). Los clientes que requieren servidores MCP descubiertos por OAuth -- notablemente la interfaz "Add custom connector" de Claude.ai y la característica "Connectors" de ChatGPT -- no pueden conectarse sin esa superficie.

Los clientes que aceptan un token portador estático en su configuración -- Claude Code, Claude Desktop, OpenAI Agents SDK, Cursor, código personalizado -- funcionan hoy. El [OAuthController](/docs/developer/api/connected-apps) existente ya emite tokens vía código de autorización + PKCE para aplicaciones de terceros; una capa de descubrimiento compatible con la especificación MCP sobre él cerraría la brecha.

## Desarrollo Local

El punto final MCP se monta junto con todo lo demás cuando la API se ejecuta localmente:

```bash
cd Api
npm run dev
# Server listening on http://localhost:8084
```

Al iniciar, la línea de registro `📡 MCP server ready at /mcp — N routes in inventory` confirma que el inventario fue construido.

Sondéalo con el MCP Inspector:

```bash
npx @modelcontextprotocol/inspector
```

En la interfaz de Inspector, apúntalo a `http://localhost:8084/mcp` y establece el encabezado `Authorization` a `Bearer cak_<prefix>.<secret>`. Llama primero a `list_endpoints`; deberías ver la lista completa de rutas. Luego `api_call({ method: "GET", path: "/membership/people" })` debería devolver tus personas de semilla local.

## Disposición del Código

El servidor MCP vive en `src/modules/mcp/` en el repositorio Api. Archivos notables:

| Archivo | Propósito |
|---|---|
| `McpController.ts` | `@controller("/mcp")`; conecta `StreamableHTTPServerTransport` por solicitud |
| `McpServer.ts` | Construye un `Server` MCP, registra las cuatro herramientas |
| `RouteInventory.ts` | Recorre los metadatos de inversify-express-utils al inicio para enumerar rutas |
| `internalDispatch.ts` | `req`/`res` sintéticos que reingresan a la aplicación Express en proceso |
| `tools/` | `listEndpoints.ts`, `describeEndpoint.ts`, `apiCall.ts`, `describePageBuilder.ts` |
| `examples.ts` | Muestras curadas de solicitud/respuesta para puntos finales de alto tráfico |

## Relacionado

- [Claves API](./api-keys)
- [Webhooks](./webhooks)
- [Aplicaciones Conectadas (OAuth)](./connected-apps)
- [Claude — configuración de usuario final](/docs/b1-admin/integrations/claude)
- [ChatGPT — configuración de usuario final](/docs/b1-admin/integrations/chatgpt)
