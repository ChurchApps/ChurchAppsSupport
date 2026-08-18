---
title: "Superficie de Integración y Extensión"
---

# Superficie de Integración y Extensión

<div class="article-intro">

Todo lo que un tercero puede conectar se ejecuta a través de una API y un modelo de autorización. Esta página es el mapa: nombra cada superficie de integración, muestra cómo se conectan, y vincula a la referencia detallada para cada una. Si estás construyendo contra B1, comienza aquí para elegir la puerta correcta, luego sigue el enlace a la página que la documenta en profundidad.

</div>

## Las Superficies de un Vistazo

Hay seis formas de entrar o salir, y todas comparten la misma capa de autenticación:

- **[API REST](../api/api-keys)** — la superficie completa del producto, llamable con un token de portador desde cualquier idioma.
- **[Claves API](../api/api-keys)** — la credencial más simple: un token `cak_…` vinculado a una persona en una iglesia.
- **[OAuth 2.0 y Aplicaciones Conectadas](../api/connected-apps)** — consentimiento por iglesia para aplicaciones multi-inquilino; emite el mismo JWT que obtiene un usuario.
- **[Webhooks](../api/webhooks)** — eventos firmados y entregados duramente salientes.
- **[Servidor MCP](../api/mcp)** — un envoltorio orientado a IA sobre la API REST en `/mcp`.
- **[Proveedores de contenido](../freeplay-content-provider)** — la ruta entrante para bibliotecas de medios externos en FreePlay y las aplicaciones B1.

Todo excepto proveedores de contenido es servido por una única API monolítica (el repositorio [Api](https://github.com/ChurchApps/Api)) cuyos módulos se montan bajo rutas base estables — `/membership`, `/giving`, `/attendance`, `/content`, `/messaging`, `/doing`, `/reporting` y `/mcp`.

## Cómo Se Ajusta Todo

```
   ┌─────────────────────┐                          ┌───────────────────────────────────────┐
   │  Aplicación de tercero│   Portador  cak_… / JWT    │              API de B1 (Api)              │
   │  · servidor / SaaS     │ ───────────────────────▶ │  ┌─────────────────────────────────┐  │
   │  · Zapier / Make     │                          │  │ CustomAuthProvider.getUser()    │  │
   │  · Google Sheets     │                          │  │   clave cak_ ─┐                    │  │
   │  · CLI / scripts     │                          │  │   OAuth JWT ┴▶ Principal          │  │
   │  · Cliente de IA (MCP)   │ ─── POST /mcp ──────────▶ │  │   alcances filtrados → permisos[] │  │
   └─────────────────────┘                          │  └────────────────┬────────────────┘  │
             ▲                                        │                   ▼                    │
             │                                        │  Módulos API: /membership /giving     │
             │        POST JSON firmado                │  /attendance /content /messaging …    │
             │   (persona / donación / grupo / …)      │                   │                    │
             └──────────── webhooks ◀─────────────────┼─ shared/webhooks/WebhookDispatcher     │
                     (durable, HMAC-SHA256 firmado)     └───────────────────────────────────────┘

   Fuentes de contenido externo (Planning Center, Dropbox, Life.Church, CBN, …)
             │   OAuth PKCE / flujo de dispositivo / ninguno   ──  B1 es el cliente de OAuth *aquí*  ──▶
             ▼
   Packages/content-providers   ──▶   FreePlay / aplicaciones B1        (ruta de contenido entrante)
```

Tres flechas cuentan la historia completa: un tercero **llama adentro** con un token de portador (clave API o JWT de OAuth, incluyendo vía `/mcp`); la API **llama afuera** a través de webhooks firmados; y los proveedores de contenido son la una ruta **de contenido entrante** donde B1 en sí es el cliente de OAuth extrayendo medios de una fuente externa.

## El Modelo de Autenticación Compartida

Cada credencial — un JWT de inicio de sesión de usuario, un token de acceso de OAuth, o una clave API — se resuelve al mismo **`Principal`** y se verifica de la misma manera. No hay una ruta "autenticación de integración" separada; una credencial con alcance es simplemente indistinguible de un usuario con menos privilegios.

### Estructura de JWT

Los tokens de acceso de B1 son JWTs HS256 acuñados en `Api/src/modules/membership/auth/AuthenticatedUser.ts`. El conjunto de reclamaciones:

| Reclamación | Significado |
|---|---|
| `id`, `email`, `firstName`, `lastName` | La persona detrás del token |
| `churchId` | La iglesia única en la que este token actúa — el anclaje para todo alcance de datos |
| `personId` | El registro de persona dentro de esa iglesia |
| `permissions` | Array plano de strings de permisos RBAC (`[apiName_]contentType_contentId_action`) |
| `groupIds`, `leaderGroupIds` | Membresía / liderazgo de grupo, para verificaciones con alcance de grupo |
| `membershipStatus` | Invitado vs. miembro, para acceso gating de autoservicio |

Un token de acceso de OAuth tiene exactamente la misma forma byte por byte que un JWT de inicio de sesión — la única diferencia es que su array `permissions` fue **filtrado a través de los alcances otorgados antes de firmar** (`getCombinedApiJwt(...)`).

### Alcance por iglesia

`churchId` es una reclamación de token, no un parámetro de solicitud, por lo que una credencial nunca puede llegar a través de iglesias. Cada consulta de repositorio filtra en el `churchId` del llamador; una clave API o token de OAuth está vinculado a exactamente una iglesia en tiempo de acuñación.

### Permisos basados en roles en el límite

Los controladores cierran acciones con `au.checkAccess(contentType, action)` contra el array `permissions` del token. Los alcances son un **filtro, nunca una concesión** (`Api/src/shared/auth/Scopes.ts`): el `SCOPE_CATALOG` asigna cada alcance (por ejemplo, `people:read`, `donations:write`) a los pares RBAC que permite, y `filterPermissionsByScopes()` intersecta eso con los permisos *actuales* de la persona en cada resolución. Consecuencias:

- Revocar un permiso en B1Admin corta el acceso de la credencial en la próxima solicitud — los tokens nunca se desvían del rol.
- Un alcance solo puede *eliminar* permisos, por lo que una credencial con alcance nunca puede elevarse a administración de servidor / dominio (esos permisos están deliberadamente no asignados a ningún alcance).
- Las claves API llevan un prefijo `cak_`; `CustomAuthProvider.getUser()` se ramifica en él, hace hash del secreto, y re-resuelve el RBAC en vivo de la persona propietaria en cada llamada.

Ver [Claves API → Alcances](../api/api-keys#scopes) para el catálogo completo.

## Referencia de Superficie

### API REST

La superficie completa del producto. Cualquier endpoint autenticado acepta un JWT o una clave API `cak_…` en el encabezado `Authorization: Bearer` — no hay tabla de ruta separada solo para claves u solo para OAuth. Los módulos y sus rutas base viven bajo `Api/src/modules/*`.

### Claves API

Un token de acceso personal `cak_<prefix>.<secret>`, creado en **B1Admin → Configuración → Desarrollador → Claves API**. Solo se almacena un hash SHA-256; la clave bruta se muestra una vez. Gestionado en `/membership/apiKeys` (`Api/src/modules/membership/controllers/ApiKeyController.ts`). Mejor para scripts de una iglesia y para conectores como Zapier, Make y Google Sheets. → **[Claves API](../api/api-keys)**

### OAuth 2.0 y Aplicaciones Conectadas

Para aplicaciones multi-inquilino que necesitan consentimiento de cada iglesia. Implementado en `Api/src/modules/membership/controllers/OAuthController.ts` bajo `/membership/oauth`. El servidor soporta tres concesiones:

- **Código de Autorización** — `POST /oauth/authorize` (autenticado) devuelve un código de corta duración; `POST /oauth/token` con `grant_type=authorization_code` lo intercambia por un JWT de acceso (≈ 7 días) más un token de renovación (≈ 90 días).
- **Código de Dispositivo** (RFC 8628) — `POST /oauth/device/authorize` emite un `user_code`; el usuario lo aprueba en B1Admin (`/oauth/device/approve`); el dispositivo encuesta `/oauth/token` con la concesión de código de dispositivo. Para TVs, quioscos y CLIs sin navegador.
- **Token de Renovación** — `grant_type=refresh_token` acuña un nuevo token de acceso; clientes públicos (sin secreto) pueden omitir el secreto.

Una **Aplicación Conectada** es la vista de administrador de iglesia de un token otorgado, listada y revocable en `/membership/oauth/connections`. El controlador también aloja un puente **sesión de relé** de OAuth (`/oauth/relay/*`) que permite que un dispositivo sin navegador complete un inicio de sesión contra un proveedor *externo*. → **[Aplicaciones Conectadas y OAuth](../api/connected-apps)**

### Webhooks

La única superficie saliente. Una iglesia suscribe un endpoint HTTPS público a eventos; cuando ocurre un cambio coincidente, `WebhookDispatcher.emit(churchId, event, payload)` enriquece payloads solo de id con nombres de pantalla (`personName`, `groupName`, `formName` — búsquedas se ejecutan solo una vez que una suscripción coincide), registra una entrega, y un trabajador de fondo POSTs una envoltura JSON firmada con reintento/retroceso y re-entrega. Motor en `Api/src/shared/webhooks/`, CRUD por iglesia bajo `/membership/webhooks` (`WebhookController.ts`). Un campo `connectorType` reformatea el cuerpo para Slack / Discord; el conector `mailchimp` va más lejos y posee el intercambio HTTP completo (método/URL/autenticación por evento contra la API de Mailchimp, credenciales encriptadas en `webhooks.connectorConfig`). → **[Webhooks](../api/webhooks)**

### Servidor MCP

Un envoltorio orientado a IA en `/mcp` (`Api/src/modules/mcp/`). Tres herramientas genéricas — `list_endpoints`, `describe_endpoint`, `api_call` — exponen toda la superficie REST dinámicamente a cualquier cliente MCP. La autenticación es el mismo token de portador que todo, y `api_call` re-entra en la pila de Express en proceso así que cada permiso y regla de alcance de iglesia aún se aplica. → **[Servidor MCP](../api/mcp)**

### Proveedores de contenido

La ruta de contenido entrante, en el paquete separado `Packages/content-providers` (`@churchapps/content-providers`) en lugar de la API. Cada proveedor implementa la interfaz `IProvider` (`src/interfaces.ts`) — `browse`, `getPlaylist`, `getInstructions`, más hooks de autenticación — y se autorregistra en un registro `Map` (`src/providers/registry.ts`). Aquí **B1 es el cliente de OAuth**: un proveedor declara un `AuthType` de `none`, `oauth_pkce`, `device_flow` u `form_login`, y los helpers compartidos (`OAuthHelper`, `DeviceFlowHelper`, `TokenHelper`, `ApiHelper`) ejecutan el PKCE de lado del cliente / flujo de dispositivo contra la fuente externa. Once proveedores se envían hoy — incluyendo Planning Center, Dropbox, Life.Church, CBN, BibleProject, Jesus Film, Lessons.church, y B1.church — alimentando FreePlay y las aplicaciones B1. → **[Proveedor de Contenido de FreePlay](../freeplay-content-provider)**

## Resumen

| Superficie | Mecanismo de Autenticación | Dirección | Dónde Implementado | Referencia |
|---|---|---|---|---|
| API REST | `Bearer` JWT o clave `cak_…` | Entrante | `Api/src/modules/*` | [Claves API](../api/api-keys) |
| Claves API | Token `cak_` hash SHA-256 | Credencial | `Api/.../membership/controllers/ApiKeyController.ts` | [Claves API](../api/api-keys) |
| OAuth 2.0 / Aplicaciones Conectadas | Código de autorización · dispositivo · renovación → JWT | Entrante | `Api/.../membership/controllers/OAuthController.ts` | [Aplicaciones Conectadas](../api/connected-apps) |
| Webhooks | Secreto por-hook, firma HMAC-SHA256 | Saliente | `Api/src/shared/webhooks/` + `WebhookController.ts` | [Webhooks](../api/webhooks) |
| Servidor MCP | `Bearer` JWT o clave `cak_…` | Entrante (IA) | `Api/src/modules/mcp/` | [Servidor MCP](../api/mcp) |
| Proveedores de contenido | Por-proveedor: ninguno / OAuth PKCE / dispositivo / formulario | Contenido entrante | `Packages/content-providers/` | [Proveedor de Contenido](../freeplay-content-provider) |

## Conectores Prebuild

En lugar de que todos construyan desde cero, ChurchApps envía conectores encima de las superficies anteriores:

- **[Slack y Discord](/docs/b1-admin/integrations/slack-discord)** — un `connectorType` de webhook reformatea la envoltura estándar en un mensaje de chat; configurado completamente en B1Admin, sin cuenta de terceros.
- **[Mailchimp](/docs/b1-admin/integrations/services/mailchimp)** — un `connectorType` mailchimp que sincroniza personas a una audiencia de Mailchimp y asigna membresía de grupo/lista a etiquetas (`Api/src/shared/webhooks/MailchimpConnector.ts`). A diferencia de los conectores de chat emite sus propias solicitudes autenticadas por evento (upsert/archive/tag) en lugar de POSTear a una URL suministrada por la iglesia; la clave API y id de audiencia viven encriptadas en `webhooks.connectorConfig`. Unidireccional, solo campos estándar de combinación.
- **[Zapier](/docs/b1-admin/integrations/zapier)** y **[Make](/docs/b1-admin/integrations/make)** — se activan en eventos de webhook y actúan vía la API REST; se registran a sí mismos cuando un Zap/escenario se activa (necesita una clave con `settings:write`). El código fuente de la aplicación Zapier vive en el repositorio de `Integrations` bajo `zapier/` (CLI de Zapier, desplegado con `zapier push`).
- **[Google Sheets](/docs/b1-admin/integrations/google-sheets)** — un complemento autenticado con clave API que exporta Personas / Donaciones / Grupos / Asistencia a demanda.
- **[Claude](/docs/b1-admin/integrations/claude)** y **[ChatGPT](/docs/b1-admin/integrations/chatgpt)** — clientes MCP apuntados a `/mcp`.

Para tu propio código, **[`@churchapps/integration-sdk`](https://www.npmjs.com/package/@churchapps/integration-sdk)** (`Packages/integration-sdk`) envuelve todo: un cliente REST tipado, un cliente de OAuth (código de autorización / renovación / flujo de dispositivo), y un verificador de webhook HMAC con middleware de Express.

## Páginas Relacionadas

- [Claves API](../api/api-keys) — la credencial más simple y el catálogo de alcances
- [Aplicaciones Conectadas y OAuth](../api/connected-apps) — flujos de consentimiento multi-inquilino
- [Webhooks](../api/webhooks) — el sistema de eventos salientes
- [Servidor MCP](../api/mcp) — el envoltorio de integración de IA
- [Proveedor de Contenido de FreePlay](../freeplay-content-provider) — convirtiéndose en una fuente de contenido entrante
- [Integraciones (usuario final)](/docs/b1-admin/integrations/) — guías de configuración de conectores prebuild
