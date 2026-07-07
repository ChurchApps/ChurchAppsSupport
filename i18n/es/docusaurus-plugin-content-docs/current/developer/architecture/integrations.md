---
title: "Superficie de Integración y Extensión"
---

# Superficie de Integración y Extensión

<div class="article-intro">

Todo lo que un tercero puede conectar se ejecuta a través de una API y un modelo de autorización. Esta página es el mapa: nombra cada superficie de integración, muestra cómo se conectan, y vincula a la referencia detallada para cada uno. Si está construyendo contra B1, comience aquí para elegir la puerta correcta, luego siga el enlace a la página que la documenta en profundidad.

</div>

## Las Superficies de Una Ojeada

Hay seis formas de entrar o salir, y todas comparten la misma capa de autenticación:

- **[API REST](../api/api-keys)** — toda la superficie del producto, invocable con un token portador desde cualquier idioma.
- **[Claves API](../api/api-keys)** — la credencial más simple: un token `cak_…` vinculado a una persona en una iglesia.
- **[OAuth 2.0 y Aplicaciones Conectadas](../api/connected-apps)** — consentimiento por iglesia para aplicaciones multi-inquilino; emite el mismo JWT que obtiene un usuario.
- **[Webhooks](../api/webhooks)** — eventos salientes firmados y entregados duramente.
- **[Servidor MCP](../api/mcp)** — un envoltorio orientado a IA sobre la API REST en `/mcp`.
- **[Proveedores de contenido](../freeplay-content-provider)** — el camino de entrada para bibliotecas de medios externas en FreePlay y las aplicaciones B1.

Todo excepto los proveedores de contenido es servido por una única API monolítica (el repositorio [Api](https://github.com/ChurchApps/Api)) cuyos módulos se montan bajo rutas base estables — `/membership`, `/giving`, `/attendance`, `/content`, `/messaging`, `/doing`, `/reporting`, y `/mcp`.

## Cómo Se Ajusta Junto

```
   ┌─────────────────────┐                          ┌───────────────────────────────────────┐
   │  Aplicación de tercero│   Portador cak_… / JWT  │              Api B1 (Api)             │
   │  · servidor / SaaS   │ ───────────────────────▶ │  ┌─────────────────────────────────┐  │
   │  · Zapier / Make     │                          │  │ CustomAuthProvider.getUser()    │  │
   │  · Google Sheets     │                          │  │   clave cak_ ─┐                 │  │
   │  · CLI / scripts     │                          │  │   JWT OAuth ┴▶ Principal       │  │
   │  · Cliente IA (MCP)  │ ─── POST /mcp ──────────▶ │  │   alcances filtro → permisos[]│  │
   └─────────────────────┘                          │  └────────────────┬────────────────┘  │
             ▲                                        │                   ▼                    │
             │                                        │  Módulos API: /membership /giving    │
             │        POST JSON firmado               │  /attendance /content /messaging …   │
             │   (persona / donación / grupo / …)     │                   │                    │
             └──────────── webhooks ◀─────────────────┼─ shared/webhooks/WebhookDispatcher   │
                     (durable, HMAC-SHA256 firmado)   └───────────────────────────────────────┘

   Fuentes de contenido externo (Planning Center, Dropbox, Life.Church, CBN, …)
             │   OAuth PKCE / flujo de dispositivo / ninguno ──  B1 es el cliente OAuth aquí ──▶
             ▼
   Packages/content-providers   ──▶   FreePlay / aplicaciones B1        (camino de contenido de entrada)
```

Tres flechas cuentan toda la historia: un tercero **llama** con un token portador (clave API o JWT de OAuth, incluyendo vía `/mcp`); la API **llama de vuelta** a través de webhooks firmados; y los proveedores de contenido son el único camino de **contenido de entrada** donde B1 mismo es el cliente OAuth extrayendo medios de una fuente externa.

## El Modelo de Autenticación Compartida

Cada credencial — un JWT de inicio de sesión de usuario, un token de acceso de OAuth, o una clave API — se resuelve al mismo **`Principal`** y se verifica de la misma manera. No hay ruta de autenticación "integración separada"; una credencial con alcance es simplemente indistinguible de un usuario con menos privilegios.

### Estructura JWT

Los tokens de acceso B1 son JWTs HS256 acuñados en `Api/src/modules/membership/auth/AuthenticatedUser.ts`. El conjunto de reclamación:

| Reclamación | Significado |
|---|---|
| `id`, `email`, `firstName`, `lastName` | La persona detrás del token |
| `churchId` | La iglesia única en la que actúa este token — el ancla para todo alcance de datos |
| `personId` | El registro de persona dentro de esa iglesia |
| `permissions` | Matriz plana de cadenas de permiso RBAC (`[apiName_]contentType_contentId_action`) |
| `groupIds`, `leaderGroupIds` | Membresía de grupo / liderazgo, para verificaciones con alcance de grupo |
| `membershipStatus` | Invitado vs. miembro, para cierre de autoservicio |

Un token de acceso de OAuth es idéntico byte por byte a una forma JWT de inicio de sesión — la única diferencia es que su matriz `permissions` fue **filtrada a través de los alcances otorgados antes de firmar** (`getCombinedApiJwt(...)`).

### Alcance por iglesia

`churchId` es una reclamación de token, no un parámetro de solicitud, por lo que una credencial nunca puede alcanzar iglesias. Cada consulta de repositorio filtra en el `churchId` del llamador; una clave API o token de OAuth está vinculado a exactamente una iglesia en el momento de acuñación.

### Permisos basados en roles en el límite

Los controladores cierran las acciones con `au.checkAccess(contentType, action)` contra la matriz `permissions` del token. Los alcances son un **filtro, nunca una concesión** (`Api/src/shared/auth/Scopes.ts`): el `SCOPE_CATALOG` mapea cada alcance (p. ej. `people:read`, `donations:write`) a los pares RBAC que permite, y `filterPermissionsByScopes()` intersecta eso con los permisos *actuales* de la persona en cada resolución. Consecuencias:

- Revocar un permiso en B1Admin corta el acceso de la credencial en la siguiente solicitud — los tokens nunca se desvinculan del rol.
- Un alcance solo puede *eliminar* permisos, por lo que una credencial con alcance nunca puede elevarse a administración de servidor / dominio (esos permisos se desmapean deliberadamente de cualquier alcance).
- Las claves API llevan un prefijo `cak_`; `CustomAuthProvider.getUser()` se bifurca en él, hash el secreto, y re-resuelve el RBAC activo de la persona propietaria en cada llamada.

Ver [Claves API → Alcances](../api/api-keys#scopes) para el catálogo completo.

## Referencia de Superficie

### API REST

La superficie del producto completa. Cualquier extremo autenticado acepta un JWT o una clave API `cak_…` en el encabezado `Authorization: Bearer` — no hay tabla de rutas separada solo para clave o solo para OAuth. Los módulos y sus rutas base viven bajo `Api/src/modules/*`.

### Claves API

Un token de acceso personal `cak_<prefix>.<secret>`, creado en **B1Admin → Configuración → Desarrollador → Claves API**. Solo se almacena un hash SHA-256; la clave sin procesar se muestra una vez. Administrado en `/membership/apiKeys` (`Api/src/modules/membership/controllers/ApiKeyController.ts`). Mejor para scripts propios de una iglesia y para conectores como Zapier, Make, y Google Sheets. → **[Claves API](../api/api-keys)**

### OAuth 2.0 y Aplicaciones Conectadas

Para aplicaciones multi-inquilino que necesitan consentimiento de cada iglesia. Implementado en `Api/src/modules/membership/controllers/OAuthController.ts` bajo `/membership/oauth`. El servidor soporta tres concesiones:

- **Código de Autorización** — `POST /oauth/authorize` (autenticado) devuelve un código de corta duración; `POST /oauth/token` con `grant_type=authorization_code` lo cambia por un JWT de acceso (≈ 7 días) más un token de actualización (≈ 90 días).
- **Código de Dispositivo** (RFC 8628) — `POST /oauth/device/authorize` emite un `user_code`; el usuario lo aprueba en B1Admin (`/oauth/device/approve`); el dispositivo sondea `/oauth/token` con la concesión de código de dispositivo. Para televisores, quioscos, y CLIs sin navegador.
- **Token de Actualización** — `grant_type=refresh_token` acuña un nuevo token de acceso; los clientes públicos (sin secreto) pueden omitir el secreto.

Una **Aplicación Conectada** es la vista del administrador de la iglesia de un token otorgado, listada y revocable en `/membership/oauth/connections`. El controlador también aloja un puente de **sesión de retransmisión** de OAuth (`/oauth/relay/*`) que permite a un dispositivo sin navegador completar un inicio de sesión contra un proveedor *externo*. → **[Aplicaciones Conectadas y OAuth](../api/connected-apps)**

### Webhooks

La única superficie saliente. Una iglesia se suscribe a un extremo HTTPS público a eventos; cuando ocurre un cambio coincidente, `WebhookDispatcher.emit(churchId, event, payload)` registra una entrega y un trabajador de fondo POST un sobre JSON firmado con reintento/retroceso y reentrega. Motor en `Api/src/shared/webhooks/`, CRUD por iglesia bajo `/membership/webhooks` (`WebhookController.ts`). Un campo `connectorType` remodela el cuerpo para Slack / Discord. → **[Webhooks](../api/webhooks)**

### Servidor MCP

Un envoltorio orientado a IA en `/mcp` (`Api/src/modules/mcp/`). Tres herramientas genéricas — `list_endpoints`, `describe_endpoint`, `api_call` — exponen toda la superficie REST dinámicamente a cualquier cliente MCP. La autenticación es el mismo token portador que todo lo demás, y `api_call` re-entra en la pila de Express en proceso por lo que cada permiso y regla de alcance de iglesia aún se aplican. → **[Servidor MCP](../api/mcp)**

### Proveedores de contenido

El camino de contenido de entrada, en el paquete separado `Packages/content-providers` (`@churchapps/content-providers`) en lugar de la API. Cada proveedor implementa la interfaz `IProvider` (`src/interfaces.ts`) — `browse`, `getPlaylist`, `getInstructions`, más ganchos de autenticación — y se auto-registra en un registro `Map` (`src/providers/registry.ts`). Aquí **B1 es el cliente OAuth**: un proveedor declara un `AuthType` de `none`, `oauth_pkce`, `device_flow`, o `form_login`, y los ayudantes compartidos (`OAuthHelper`, `DeviceFlowHelper`, `TokenHelper`, `ApiHelper`) ejecutan el flujo PKCE / dispositivo del cliente contra la fuente externa. Once proveedores se envían hoy — incluyendo Planning Center, Dropbox, Life.Church, CBN, BibleProject, Jesus Film, Lessons.church, y B1.church — alimentando FreePlay y las aplicaciones B1. → **[Proveedor de Contenido FreePlay](../freeplay-content-provider)**

## Resumen

| Superficie | Mecanismo de Autenticación | Dirección | Donde Implementado | Referencia |
|---|---|---|---|---|
| API REST | `Bearer` JWT o `cak_…` clave | Entrada | `Api/src/modules/*` | [Claves API](../api/api-keys) |
| Claves API | Token `cak_` hash SHA-256 | Credencial | `Api/.../membership/controllers/ApiKeyController.ts` | [Claves API](../api/api-keys) |
| OAuth 2.0 / Aplicaciones Conectadas | Código de autorización · dispositivo · actualizar → JWT | Entrada | `Api/.../membership/controllers/OAuthController.ts` | [Aplicaciones Conectadas](../api/connected-apps) |
| Webhooks | Por secreto de gancho, firma HMAC-SHA256 | Salida | `Api/src/shared/webhooks/` + `WebhookController.ts` | [Webhooks](../api/webhooks) |
| Servidor MCP | `Bearer` JWT o `cak_…` clave | Entrada (IA) | `Api/src/modules/mcp/` | [Servidor MCP](../api/mcp) |
| Proveedores de contenido | Por proveedor: ninguno / OAuth PKCE / dispositivo / forma | Contenido de entrada | `Packages/content-providers/` | [Proveedor de Contenido](../freeplay-content-provider) |

## Conectores Preconstruidos

En lugar de que todos construyan desde cero, ChurchApps envía conectores en la parte superior de las superficies anteriores:

- **[Slack y Discord](/docs/b1-admin/integrations/slack-discord)** — un webhook `connectorType` remodela el sobre estándar en un mensaje de chat; configurado completamente en B1Admin, sin cuenta de tercero.
- **[Zapier](/docs/b1-admin/integrations/zapier)** y **[Make](/docs/b1-admin/integrations/make)** — desencadenar en eventos de webhook y actuar a través de la API REST; registran su propio webhook cuando un Zap/escenario se enciende (necesita una clave con `settings:write`).
- **[Google Sheets](/docs/b1-admin/integrations/google-sheets)** — un complemento autenticado por clave API que exporta Personas / Donaciones / Grupos / Asistencia bajo demanda.
- **[Claude](/docs/b1-admin/integrations/claude)** y **[ChatGPT](/docs/b1-admin/integrations/chatgpt)** — clientes MCP apuntados a `/mcp`.

Para su propio código, **[`@churchapps/integration-sdk`](https://www.npmjs.com/package/@churchapps/integration-sdk)** (`Packages/integration-sdk`) envuelve todo: un cliente REST tipado, un cliente OAuth (flujo de código de autenticación / actualizar / dispositivo), y un verificador de webhook HMAC con middleware Express.

## Páginas Relacionadas

- [Claves API](../api/api-keys) — la credencial más simple y el catálogo de alcances
- [Aplicaciones Conectadas y OAuth](../api/connected-apps) — flujos de consentimiento multi-inquilino
- [Webhooks](../api/webhooks) — el sistema de eventos saliente
- [Servidor MCP](../api/mcp) — el envoltorio de integración de IA
- [Proveedor de Contenido FreePlay](../freeplay-content-provider) — convertirse en una fuente de contenido de entrada
- [Integraciones (usuario final)](/docs/b1-admin/integrations/) — guías de configuración de conectores preconstruidos
