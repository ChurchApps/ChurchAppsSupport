---
title: "Superfície de Integração e Extensão"
---

# Superfície de Integração e Extensão

<div class="article-intro">

Tudo o que um terceiro pode conectar passa por uma única API e um único modelo de autorização. Esta página é o mapa: ela nomeia cada superfície de integração, mostra como elas se conectam e aponta para a referência detalhada de cada uma. Se você está desenvolvendo para o B1, comece aqui para escolher a porta certa e depois siga o link para a página que a documenta em profundidade.

</div>

## As superfícies em resumo

Existem seis formas de entrada e saída, e todas compartilham a mesma camada de autenticação:

- **[API REST](../api/api-keys)** — toda a superfície do produto, acessível com um token bearer a partir de qualquer linguagem.
- **[Chaves de API](../api/api-keys)** — a credencial mais simples: um token `cak_…` vinculado a uma pessoa em uma igreja.
- **[OAuth 2.0 e Aplicativos Conectados](../api/connected-apps)** — consentimento por igreja para aplicativos multi-inquilino; emite o mesmo JWT que um usuário recebe.
- **[Webhooks](../api/webhooks)** — eventos de saída assinados e entregues de forma durável.
- **[Servidor MCP](../api/mcp)** — um wrapper voltado para IA sobre a API REST, em `/mcp`.
- **[Provedores de conteúdo](../freeplay-content-provider)** — o caminho de entrada para bibliotecas de mídia externas no FreePlay e nos aplicativos B1.

Tudo, exceto os provedores de conteúdo, é servido por uma única API monolítica (o repositório [Api](https://github.com/ChurchApps/Api)), cujos módulos são montados em caminhos base estáveis — `/membership`, `/giving`, `/attendance`, `/content`, `/messaging`, `/doing`, `/reporting` e `/mcp`.

## Como tudo se encaixa

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

Três setas contam toda a história: um terceiro **chama a API** com um token bearer (chave de API ou JWT OAuth, inclusive via `/mcp`); a API **chama de volta** por meio de webhooks assinados; e os provedores de conteúdo são o único caminho de **conteúdo de entrada**, em que o próprio B1 é o cliente OAuth que puxa mídia de uma fonte externa.

## O modelo de autorização compartilhado

Toda credencial — o JWT de login de um usuário, um token de acesso OAuth ou uma chave de API — resolve para o **mesmo `Principal`** e é verificada da mesma forma. Não existe um caminho separado de "autenticação de integração"; uma credencial com escopo é simplesmente indistinguível de um usuário com menos privilégios.

### Estrutura do JWT

Os tokens de acesso do B1 são JWTs HS256 emitidos em `Api/src/modules/membership/auth/AuthenticatedUser.ts`. O conjunto de claims:

| Claim | Significado |
|---|---|
| `id`, `email`, `firstName`, `lastName` | A pessoa por trás do token |
| `churchId` | A única igreja em que este token atua — a âncora de todo o escopo de dados |
| `personId` | O registro da pessoa dentro dessa igreja |
| `permissions` | Array plano de strings de permissão RBAC (`[apiName_]contentType_contentId_action`) |
| `groupIds`, `leaderGroupIds` | Participação e liderança em grupos, para verificações com escopo de grupo |
| `membershipStatus` | Visitante ou membro, para controle de autoatendimento |

Um token de acesso OAuth tem exatamente a mesma forma de um JWT de login — a única diferença é que seu array `permissions` foi **filtrado pelos escopos concedidos antes da assinatura** (`getCombinedApiJwt(...)`).

### Escopo por igreja

`churchId` é uma claim do token, e não um parâmetro da requisição, então uma credencial nunca consegue alcançar outra igreja. Toda consulta de repositório filtra pelo `churchId` do chamador; uma chave de API ou um token OAuth é vinculado a exatamente uma igreja no momento da emissão.

### Permissões baseadas em papéis na fronteira

Os controladores restringem ações com `au.checkAccess(contentType, action)` contra o array `permissions` do token. Escopos são um **filtro, nunca uma concessão** (`Api/src/shared/auth/Scopes.ts`): o `SCOPE_CATALOG` mapeia cada escopo (por exemplo, `people:read`, `donations:write`) para os pares RBAC que ele permite, e `filterPermissionsByScopes()` faz a interseção disso com as permissões *atuais* da pessoa a cada resolução. Consequências:

- Revogar uma permissão no B1Admin corta o acesso da credencial na próxima requisição — os tokens nunca divergem do papel.
- Um escopo só pode *remover* permissões, então uma credencial com escopo nunca consegue elevar-se à administração do servidor ou do domínio (essas permissões não são mapeadas para escopo algum, de propósito).
- As chaves de API carregam o prefixo `cak_`; `CustomAuthProvider.getUser()` identifica esse prefixo, faz o hash do segredo e resolve novamente o RBAC atual da pessoa dona a cada chamada.

Veja [Chaves de API → Escopos](../api/api-keys#scopes) para o catálogo completo.

## Referência das superfícies

### API REST

A superfície completa do produto. Qualquer endpoint autenticado aceita um JWT ou uma chave de API `cak_…` no cabeçalho `Authorization: Bearer` — não existe uma tabela de rotas exclusiva para chaves ou exclusiva para OAuth. Os módulos e seus caminhos base ficam em `Api/src/modules/*`.

### Chaves de API

Um token de acesso pessoal `cak_<prefix>.<secret>`, criado em **B1Admin → Configurações → Desenvolvedor → Chaves de API**. Somente o hash SHA-256 é armazenado; a chave bruta é exibida uma única vez. Gerenciado em `/membership/apiKeys` (`Api/src/modules/membership/controllers/ApiKeyController.ts`). Ideal para scripts próprios de uma única igreja e para conectores como Zapier, Make e Google Sheets. → **[Chaves de API](../api/api-keys)**

### OAuth 2.0 e Aplicativos Conectados

Para aplicativos multi-inquilino que precisam que cada igreja dê o consentimento. Implementado em `Api/src/modules/membership/controllers/OAuthController.ts`, sob `/membership/oauth`. O servidor suporta três fluxos (grants):

- **Authorization Code** — `POST /oauth/authorize` (autenticado) retorna um código de curta duração; `POST /oauth/token` com `grant_type=authorization_code` troca esse código por um JWT de acesso (≈ 7 dias) mais um refresh token (≈ 90 dias). Clientes públicos (sem segredo) devem usar PKCE (somente `S256`): um `code_challenge` na autorização e o `code_verifier` correspondente na troca do token.
- **Device Code** (RFC 8628) — `POST /oauth/device/authorize` emite um `user_code`; o usuário aprova esse código no B1Admin (`/oauth/device/approve`); o dispositivo consulta `/oauth/token` com o fluxo de device code. Para TVs, quiosques e CLIs sem navegador.
- **Refresh Token** — `grant_type=refresh_token` emite um novo token de acesso; clientes públicos (sem segredo) podem omitir o segredo.

Clientes públicos também podem se registrar sozinhos com `POST /oauth/register` (registro dinâmico de cliente, RFC 7591); eles recebem um `client_id` sem segredo, e suas URIs de redirecionamento devem ser `https` ou de loopback.

Um **Aplicativo Conectado** é a visão, voltada para o administrador da igreja, de um token concedido; ele é listado e pode ser revogado em `/membership/oauth/connections`. O controlador também hospeda uma ponte de **relay-session** de OAuth (`/oauth/relay/*`) que permite a um dispositivo sem navegador concluir um login em um provedor *externo*. → **[Aplicativos Conectados e OAuth](../api/connected-apps)**

### Webhooks

A única superfície de saída. Uma igreja assina um endpoint HTTPS público para eventos; quando ocorre uma mudança correspondente, `WebhookDispatcher.emit(churchId, event, payload)` enriquece payloads que contêm apenas ids com nomes de exibição (`personName`, `groupName`, `formName` — as consultas só são executadas quando uma assinatura corresponde), registra uma entrega, e um worker em segundo plano envia um envelope JSON assinado por POST, com retentativas, recuo exponencial e reentrega. Motor em `Api/src/shared/webhooks/`, com CRUD por igreja em `/membership/webhooks` (`WebhookController.ts`). Um campo `connectorType` remodela o corpo para Slack / Discord; o conector `mailchimp` vai além e controla toda a troca HTTP (método/URL/autenticação por evento na API do Mailchimp, com credenciais criptografadas em `webhooks.connectorConfig`). → **[Webhooks](../api/webhooks)**

### Servidor MCP

Um wrapper voltado para IA em `/mcp` (`Api/src/modules/mcp/`). Três ferramentas genéricas — `list_endpoints`, `describe_endpoint`, `api_call` — expõem toda a superfície REST dinamicamente para qualquer cliente MCP. A autenticação é o mesmo token bearer de tudo o mais. Para clientes que fazem login com OAuth (conectores personalizados do claude.ai), uma resposta 401 de `/mcp` traz um cabeçalho `WWW-Authenticate` apontando para `/.well-known/oauth-protected-resource`, e `/.well-known/oauth-authorization-server` anuncia os endpoints de `/membership/oauth`, o registro dinâmico, PKCE e a página de consentimento `/oauth` do B1Admin (`WellKnownController.ts`, `OAuthMetadata.ts`). `api_call` reentra na pilha Express dentro do próprio processo, de modo que todas as regras de permissão e de escopo por igreja continuam valendo. → **[Servidor MCP](../api/mcp)**

### Provedores de conteúdo

O caminho de conteúdo de entrada, no pacote separado `Packages/content-providers` (`@churchapps/content-providers`), e não na API. Cada provedor implementa a interface `IProvider` (`src/interfaces.ts`) — `browse`, `getPlaylist`, `getInstructions`, mais os ganchos de autenticação — e se registra sozinho em um registro `Map` (`src/providers/registry.ts`). Aqui o **B1 é o cliente OAuth**: um provedor declara um `AuthType` de `none`, `oauth_pkce`, `device_flow` ou `form_login`, e os auxiliares compartilhados (`OAuthHelper`, `DeviceFlowHelper`, `TokenHelper`, `ApiHelper`) executam, no lado do cliente, o PKCE / device flow contra a fonte externa. Hoje existem onze provedores, incluindo Planning Center, Dropbox, Life.Church, CBN, BibleProject, Jesus Film, Lessons.church e B1.church, alimentando o FreePlay e os aplicativos B1. → **[Provedor de Conteúdo do FreePlay](../freeplay-content-provider)**

**Planos anuais** utilizam esse caminho. Um publicador de currículo (com `lessons.edit`) mantém sequências ordenadas de semanas 1/2/3 no admin do Lessons.church (tabelas `yearPlans` / `yearPlanWeeks` do LessonsApi, com `startMonth` opcional e um `anchor` por semana de `easter` / `christmas`); `GET /yearPlans/public` no LessonsApi serve os planos ativos de forma anônima, hidratando o programa, o estudo e o local de cada semana a partir da árvore de lições. Em **B1Admin → Serviço → Planos → Agendar Lição → Aplicar Plano Anual**, esse endpoint é consumido e é criado um plano do DoingApi por semana incluída (`providerId=lessonschurch`, `providerPlanId=/lessons/{programId}/{studyId}/{lessonId}/{venueId}`). Planos com `startMonth` resolvem as semanas ancoradas em relação ao ano escolhido (Páscoa pelo cálculo gregoriano, Natal como o domingo anterior ou igual a 25 de dezembro) e preenchem os intervalos entre elas; planos sem `startMonth` ainda mapeiam a semana N para `startDate + (N−1)×7` dias. Semanas de provedores OLF externos ou com caminho incompleto são ignoradas no momento da aplicação; as igrejas editam os planos resultantes como quaisquer outros, e o FreePlay toca o que estiver no plano.

## Resumo

| Superfície | Mecanismo de autenticação | Direção | Onde é implementada | Referência |
|---|---|---|---|---|
| API REST | JWT `Bearer` ou chave `cak_…` | Entrada | `Api/src/modules/*` | [Chaves de API](../api/api-keys) |
| Chaves de API | Token `cak_` com hash SHA-256 | Credencial | `Api/.../membership/controllers/ApiKeyController.ts` | [Chaves de API](../api/api-keys) |
| OAuth 2.0 / Aplicativos Conectados | Código de autorização (PKCE) · device · refresh → JWT; registro dinâmico de cliente | Entrada | `Api/.../membership/controllers/OAuthController.ts` | [Aplicativos Conectados](../api/connected-apps) |
| Webhooks | Segredo por hook, assinatura HMAC-SHA256 | Saída | `Api/src/shared/webhooks/` + `WebhookController.ts` | [Webhooks](../api/webhooks) |
| Servidor MCP | JWT `Bearer`, JWT OAuth (descoberto via `/.well-known`) ou chave `cak_…` | Entrada (IA) | `Api/src/modules/mcp/` | [Servidor MCP](../api/mcp) |
| Provedores de conteúdo | Por provedor: nenhum / OAuth PKCE / device / formulário | Conteúdo de entrada | `Packages/content-providers/` | [Provedor de Conteúdo](../freeplay-content-provider) |

## Conectores prontos

Em vez de cada um construir do zero, a ChurchApps oferece conectores sobre as superfícies acima:

- **[Slack e Discord](/docs/b1-admin/integrations/slack-discord)** — um `connectorType` de webhook remodela o envelope padrão em uma mensagem de chat; configurado inteiramente no B1Admin, sem conta de terceiros.
- **[Mailchimp](/docs/b1-admin/integrations/services/mailchimp)** — um `connectorType` `mailchimp` que sincroniza pessoas com um público do Mailchimp e mapeia a participação em grupos/listas para tags (`Api/src/shared/webhooks/MailchimpConnector.ts`). Diferente dos conectores de chat, ele faz suas próprias requisições autenticadas por evento (upsert/arquivar/tag), em vez de fazer POST para uma URL fornecida pela igreja; a chave de API e o id do público ficam criptografados em `webhooks.connectorConfig`. É unidirecional, com apenas campos de mesclagem padrão.
- **[Zapier](/docs/b1-admin/integrations/zapier)** e **[Make](/docs/b1-admin/integrations/make)** — disparam a partir de eventos de webhook e agem pela API REST; registram o próprio webhook quando um Zap/cenário é ativado (exige uma chave com `settings:write`). O código-fonte do app do Zapier fica no repositório `Integrations`, em `zapier/` (CLI do Zapier, publicado com `zapier push`).
- **[Google Sheets](/docs/b1-admin/integrations/google-sheets)** — um complemento autenticado por chave de API que exporta Pessoas / Doações / Grupos / Presença sob demanda.
- **[Claude](/docs/b1-admin/integrations/claude)** e **[ChatGPT](/docs/b1-admin/integrations/chatgpt)** — clientes MCP apontados para `/mcp`.

Para o seu próprio código, o **[`@churchapps/integration-sdk`](https://www.npmjs.com/package/@churchapps/integration-sdk)** (`Packages/integration-sdk`) encapsula tudo isso: um cliente REST tipado, um cliente OAuth (código de autorização / refresh / device flow) e um verificador de webhooks HMAC com middleware para Express.

## Páginas relacionadas

- [Chaves de API](../api/api-keys) — a credencial mais simples e o catálogo de escopos
- [Aplicativos Conectados e OAuth](../api/connected-apps) — fluxos de consentimento multi-inquilino
- [Webhooks](../api/webhooks) — o sistema de eventos de saída
- [Servidor MCP](../api/mcp) — o wrapper de integração com IA
- [Provedor de Conteúdo do FreePlay](../freeplay-content-provider) — tornando-se uma fonte de conteúdo de entrada
- [Integrações (usuário final)](/docs/b1-admin/integrations/) — guias de configuração dos conectores prontos
