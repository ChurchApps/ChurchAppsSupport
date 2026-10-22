---
title: "Superficie de integración y extensión"
---

# Superficie de integración y extensión

<div class="article-intro">

Todo lo que un tercero puede conectar funciona a través de una única API y un único modelo de autorización. Esta página es el mapa: nombra cada superficie de integración, muestra cómo se conectan y enlaza con la referencia detallada de cada una. Si estás creando algo sobre B1, empieza aquí para elegir la puerta adecuada y después sigue el enlace a la página que la documenta en detalle.

</div>

## Las superficies de un vistazo

Hay seis formas de entrar o salir, y todas comparten la misma capa de autenticación:

- **[API REST](../api/api-keys)**: toda la superficie del producto, accesible con un token Bearer desde cualquier lenguaje.
- **[Claves de API](../api/api-keys)**: la credencial más sencilla, un token `cak_…` vinculado a una persona en una iglesia.
- **[OAuth 2.0 y aplicaciones conectadas](../api/connected-apps)**: consentimiento por iglesia para aplicaciones multiinquilino; emite el mismo JWT que recibe un usuario.
- **[Webhooks](../api/webhooks)**: eventos salientes firmados y con entrega duradera.
- **[Servidor MCP](../api/mcp)**: un envoltorio orientado a IA sobre la API REST, en `/mcp`.
- **[Proveedores de contenido](../freeplay-content-provider)**: la vía de entrada para bibliotecas multimedia externas hacia FreePlay y las aplicaciones de B1.

Todo excepto los proveedores de contenido lo sirve una única API monolítica (el repositorio [Api](https://github.com/ChurchApps/Api)), cuyos módulos se montan bajo rutas base estables: `/membership`, `/giving`, `/attendance`, `/content`, `/messaging`, `/doing`, `/reporting` y `/mcp`.

## Cómo encaja todo

```
   ┌─────────────────────┐                          ┌───────────────────────────────────────┐
   │  Third-party app     │   Bearer  cak_… / JWT    │              B1 API (Api)              │
   │  · server / SaaS     │ ───────────────────────▶ │  ┌─────────────────────────────────┐  │
   │  · Zapier / Make     │                          │  │ CustomAuthProvider.getUser()    │  │
   │  · Google Sheets     │                          │  │   cak_ key ─┐                    │  │
   │  · CLI / scripts     │                          │  │   OAuth JWT ┴▶ Principal          │  │
   │  · AI client (MCP)   │ ─── POST /mcp ──────────▶ │  │   scopes filter → permissions[] │  │
   └─────────────────────┘                          │  └────────────────┬────────────────┘  │
             ▲                                        │                   ▼                    │
             │                                        │  API modules: /membership /giving     │
             │        signed JSON POST                │  /attendance /content /messaging …    │
             │   (person / donation / group / …)      │                   │                    │
             └──────────── webhooks ◀─────────────────┼─ shared/webhooks/WebhookDispatcher     │
                     (durable, HMAC-SHA256 signed)     └───────────────────────────────────────┘

   External content sources (Planning Center, Dropbox, Life.Church, CBN, …)
             │   OAuth PKCE / device flow / none   ──  B1 is the OAuth *client* here  ──▶
             ▼
   Packages/content-providers   ──▶   FreePlay / B1 apps        (inbound content path)
```

Tres flechas resumen todo: un tercero **llama hacia dentro** con un token Bearer (clave de API o JWT de OAuth, también a través de `/mcp`); la API **llama hacia fuera** mediante webhooks firmados; y los proveedores de contenido son la única vía de **contenido entrante** en la que B1 actúa como cliente OAuth que descarga multimedia de una fuente externa.

## El modelo de autenticación compartido

Toda credencial (el JWT de inicio de sesión de un usuario, un token de acceso OAuth o una clave de API) se resuelve en el **mismo `Principal`** y se verifica del mismo modo. No existe una ruta de «autenticación de integración» aparte: una credencial con permisos limitados es simplemente indistinguible de un usuario con menos privilegios.

### Estructura del JWT

Los tokens de acceso de B1 son JWT HS256 generados en `Api/src/modules/membership/auth/AuthenticatedUser.ts`. El conjunto de claims:

| Claim | Significado |
|---|---|
| `id`, `email`, `firstName`, `lastName` | La persona detrás del token |
| `churchId` | La única iglesia en la que actúa este token: el ancla de toda la delimitación de datos |
| `personId` | El registro de la persona dentro de esa iglesia |
| `permissions` | Array plano de cadenas de permisos RBAC (`[apiName_]contentType_contentId_action`) |
| `groupIds`, `leaderGroupIds` | Pertenencia y liderazgo de grupos, para comprobaciones a nivel de grupo |
| `membershipStatus` | Invitado frente a miembro, para el control de los autoservicios |

Un token de acceso OAuth tiene exactamente la misma forma que un JWT de inicio de sesión; la única diferencia es que su array `permissions` se **filtró por los permisos concedidos antes de firmarlo** (`getCombinedApiJwt(...)`).

### Delimitación por iglesia

`churchId` es un claim del token, no un parámetro de la solicitud, así que una credencial nunca puede acceder a otra iglesia. Cada consulta del repositorio filtra por el `churchId` de quien llama; una clave de API o un token OAuth queda vinculado a exactamente una iglesia en el momento de emitirlo.

### Permisos basados en roles en el límite

Los controladores protegen las acciones con `au.checkAccess(contentType, action)` contra el array `permissions` del token. Los permisos (scopes) son un **filtro, nunca una concesión** (`Api/src/shared/auth/Scopes.ts`): el `SCOPE_CATALOG` asocia cada permiso (por ejemplo, `people:read`, `donations:write`) con los pares RBAC que permite, y `filterPermissionsByScopes()` los intersecta con los permisos **actuales** de la persona en cada resolución. Consecuencias:

- Revocar un permiso en B1Admin corta el acceso de la credencial en la siguiente solicitud: los tokens nunca se desvían del rol.
- Un permiso solo puede **quitar** permisos, así que una credencial limitada nunca puede elevarse a administración del servidor o del dominio (esos permisos están deliberadamente sin asignar a ningún permiso).
- Las claves de API llevan el prefijo `cak_`; `CustomAuthProvider.getUser()` lo detecta, aplica hash al secreto y vuelve a resolver el RBAC actual de la persona propietaria en cada llamada.

Consulta [Claves de API → Permisos](../api/api-keys#scopes) para el catálogo completo.

## Referencia de superficies

### API REST

La superficie completa del producto. Cualquier endpoint autenticado acepta un JWT o una clave `cak_…` en el encabezado `Authorization: Bearer`; no existe una tabla de rutas solo para claves ni solo para OAuth. Los módulos y sus rutas base viven en `Api/src/modules/*`.

### Claves de API

Un token de acceso personal `cak_<prefix>.<secret>`, que se crea en **B1Admin → Settings → Developer → API Keys**. Solo se guarda un hash SHA-256; la clave en bruto se muestra una sola vez. Se gestiona en `/membership/apiKeys` (`Api/src/modules/membership/controllers/ApiKeyController.ts`). Ideal para los scripts propios de una sola iglesia y para conectores como Zapier, Make y Google Sheets. → **[Claves de API](../api/api-keys)**

### OAuth 2.0 y aplicaciones conectadas

Para aplicaciones multiinquilino que necesitan el consentimiento de cada iglesia. Se implementa en `Api/src/modules/membership/controllers/OAuthController.ts` bajo `/membership/oauth`. El servidor admite tres tipos de concesión:

- **Código de autorización**: `POST /oauth/authorize` (autenticado) devuelve un código de corta duración; `POST /oauth/token` con `grant_type=authorization_code` lo intercambia por un JWT de acceso (≈ 7 días) más un token de actualización (≈ 90 días). Los clientes públicos (sin secreto) deben usar PKCE (solo `S256`): un `code_challenge` en la autorización y el `code_verifier` correspondiente en el intercambio del token.
- **Código de dispositivo** (RFC 8628): `POST /oauth/device/authorize` emite un `user_code`; el usuario lo aprueba en B1Admin (`/oauth/device/approve`); el dispositivo consulta `/oauth/token` con la concesión de código de dispositivo. Para televisores, quioscos y CLI sin navegador.
- **Token de actualización**: `grant_type=refresh_token` emite un nuevo token de acceso; los clientes públicos (sin secreto) pueden omitir el secreto.

Los clientes públicos también pueden registrarse por sí mismos con `POST /oauth/register` (registro dinámico de clientes RFC 7591); reciben un `client_id` y ningún secreto, y sus URI de redirección deben ser `https` o de bucle local.

Una **aplicación conectada** es la vista, para el administrador de la iglesia, de un token concedido; se lista y se puede revocar en `/membership/oauth/connections`. El controlador también aloja un puente de **sesión de relevo** de OAuth (`/oauth/relay/*`) que permite a un dispositivo sin navegador completar un inicio de sesión contra un proveedor *externo*. → **[Aplicaciones conectadas y OAuth](../api/connected-apps)**

### Webhooks

La única superficie saliente. Una iglesia suscribe un endpoint HTTPS público a eventos; cuando se produce un cambio que coincide, `WebhookDispatcher.emit(churchId, event, payload)` enriquece los payloads que solo tienen ids con nombres visibles (`personName`, `groupName`, `formName`; las búsquedas solo se ejecutan cuando una suscripción coincide), registra una entrega, y un worker en segundo plano envía un sobre JSON firmado con reintentos con espera creciente y reentrega. El motor está en `Api/src/shared/webhooks/`, y el CRUD por iglesia en `/membership/webhooks` (`WebhookController.ts`). Un campo `connectorType` cambia la forma del cuerpo para Slack / Discord; el conector `mailchimp` va más allá y gestiona todo el intercambio HTTP (método, URL y autenticación por evento contra la API de Mailchimp, con las credenciales cifradas en `webhooks.connectorConfig`). → **[Webhooks](../api/webhooks)**

### Servidor MCP

Un envoltorio orientado a IA en `/mcp` (`Api/src/modules/mcp/`). Tres herramientas genéricas (`list_endpoints`, `describe_endpoint`, `api_call`) exponen dinámicamente toda la superficie REST a cualquier cliente MCP. La autenticación es el mismo token Bearer que en todo lo demás. Para los clientes que inician sesión con OAuth (conectores personalizados de claude.ai), un 401 de `/mcp` incluye un encabezado `WWW-Authenticate` que apunta a `/.well-known/oauth-protected-resource`, y `/.well-known/oauth-authorization-server` anuncia los endpoints de `/membership/oauth`, el registro dinámico, PKCE y la página de consentimiento `/oauth` de B1Admin (`WellKnownController.ts`, `OAuthMetadata.ts`). `api_call` vuelve a entrar en la pila de Express dentro del mismo proceso, de modo que se siguen aplicando todas las reglas de permisos y de delimitación por iglesia. → **[Servidor MCP](../api/mcp)**

### Proveedores de contenido

La vía de contenido entrante, en el paquete independiente `Packages/content-providers` (`@churchapps/content-providers`) y no en la API. Cada proveedor implementa la interfaz `IProvider` (`src/interfaces.ts`): `browse`, `getPlaylist`, `getInstructions` y los hooks de autenticación, y se registra solo en un `Map` (`src/providers/registry.ts`). Aquí **B1 es el cliente OAuth**: un proveedor declara un `AuthType` de `none`, `oauth_pkce`, `device_flow` o `form_login`, y los helpers compartidos (`OAuthHelper`, `DeviceFlowHelper`, `TokenHelper`, `ApiHelper`) ejecutan del lado del cliente el flujo PKCE o de dispositivo contra la fuente externa. Hoy se incluyen once proveedores, entre ellos Planning Center, Dropbox, Life.Church, CBN, BibleProject, Jesus Film, Lessons.church y B1.church, que alimentan FreePlay y las aplicaciones de B1. → **[Proveedor de contenido de FreePlay](../freeplay-content-provider)**

**Los planes anuales** utilizan esta vía. Un editor de currículo (con `lessons.edit`) mantiene secuencias ordenadas de las semanas 1, 2 y 3 en el administrador de Lessons.church (tablas de `LessonsApi` `yearPlans` / `yearPlanWeeks`, con `startMonth` opcional y un `anchor` por semana de `easter` / `christmas`); `GET /yearPlans/public` en LessonsApi sirve los planes activos de forma anónima, hidratando el programa, el estudio y el lugar de cada semana a partir del árbol de lecciones. **Serving → Plans → Schedule Lesson → Apply Year Plan** de B1Admin consume ese endpoint y escribe un plan de DoingApi por cada semana incluida (`providerId=lessonschurch`, `providerPlanId=/lessons/{programId}/{studyId}/{lessonId}/{venueId}`). Los planes con `startMonth` resuelven las semanas ancladas respecto al año elegido (Pascua mediante el cómputo gregoriano, Navidad como el domingo anterior o igual al 25 de diciembre) y rellenan las semanas intermedias; los planes sin `startMonth` siguen asignando la semana N a `startDate + (N−1)×7` días. Las semanas de proveedores OLF externos o con una ruta incompleta se omiten al aplicarlas; las iglesias editan los planes resultantes como cualquier otro, y FreePlay reproduce lo que haya en el plan.

## Resumen

| Superficie | Mecanismo de autenticación | Dirección | Dónde se implementa | Referencia |
|---|---|---|---|---|
| API REST | JWT `Bearer` o clave `cak_…` | Entrante | `Api/src/modules/*` | [Claves de API](../api/api-keys) |
| Claves de API | Token `cak_` con hash SHA-256 | Credencial | `Api/.../membership/controllers/ApiKeyController.ts` | [Claves de API](../api/api-keys) |
| OAuth 2.0 / Aplicaciones conectadas | Código de autorización (PKCE) · dispositivo · actualización → JWT; registro dinámico de clientes | Entrante | `Api/.../membership/controllers/OAuthController.ts` | [Aplicaciones conectadas](../api/connected-apps) |
| Webhooks | Secreto por hook, firma HMAC-SHA256 | Saliente | `Api/src/shared/webhooks/` + `WebhookController.ts` | [Webhooks](../api/webhooks) |
| Servidor MCP | JWT `Bearer`, JWT de OAuth (descubierto mediante `/.well-known`) o clave `cak_…` | Entrante (IA) | `Api/src/modules/mcp/` | [Servidor MCP](../api/mcp) |
| Proveedores de contenido | Según el proveedor: ninguno / OAuth PKCE / dispositivo / formulario | Contenido entrante | `Packages/content-providers/` | [Proveedor de contenido](../freeplay-content-provider) |

## Conectores preconfigurados

En lugar de construir todo desde cero, ChurchApps ofrece conectores sobre las superficies anteriores:

- **[Slack y Discord](/docs/b1-admin/integrations/slack-discord)**: un `connectorType` de webhook transforma el sobre estándar en un mensaje de chat; se configura por completo en B1Admin, sin necesidad de una cuenta de terceros.
- **[Mailchimp](/docs/b1-admin/integrations/services/mailchimp)**: un `connectorType` `mailchimp` que sincroniza personas con una audiencia de Mailchimp y asigna la pertenencia a grupos y listas como etiquetas (`Api/src/shared/webhooks/MailchimpConnector.ts`). A diferencia de los conectores de chat, realiza sus propias solicitudes autenticadas por evento (upsert/archive/tag) en lugar de enviar POST a una URL proporcionada por la iglesia; la clave de API y el id de la audiencia se guardan cifrados en `webhooks.connectorConfig`. Es unidireccional y solo usa campos de combinación estándar.
- **[Zapier](/docs/b1-admin/integrations/zapier)** y **[Make](/docs/b1-admin/integrations/make)**: se activan con eventos de webhook y actúan a través de la API REST; registran su propio webhook cuando se activa un Zap o escenario (necesitan una clave con `settings:write`). El código fuente de la aplicación de Zapier está en el repositorio `Integrations`, bajo `zapier/` (CLI de Zapier, desplegada con `zapier push`).
- **[Google Sheets](/docs/b1-admin/integrations/google-sheets)**: un complemento autenticado con clave de API que exporta Personas / Donaciones / Grupos / Asistencia bajo demanda.
- **[Claude](/docs/b1-admin/integrations/claude)** y **[ChatGPT](/docs/b1-admin/integrations/chatgpt)**: clientes MCP apuntados a `/mcp`.

Para tu propio código, **[`@churchapps/integration-sdk`](https://www.npmjs.com/package/@churchapps/integration-sdk)** (`Packages/integration-sdk`) envuelve todo lo anterior: un cliente REST tipado, un cliente OAuth (código de autorización / actualización / flujo de dispositivo) y un verificador de webhooks HMAC con middleware de Express.

## Páginas relacionadas

- [Claves de API](../api/api-keys): la credencial más sencilla y el catálogo de permisos
- [Aplicaciones conectadas y OAuth](../api/connected-apps): flujos de consentimiento multiinquilino
- [Webhooks](../api/webhooks): el sistema de eventos salientes
- [Servidor MCP](../api/mcp): el envoltorio de integración con IA
- [Proveedor de contenido de FreePlay](../freeplay-content-provider): cómo convertirse en una fuente de contenido entrante
- [Integraciones (usuario final)](/docs/b1-admin/integrations/): guías de configuración de conectores preconfigurados
