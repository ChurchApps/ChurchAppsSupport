---
title: "Superfície de Integração e Extensão"
---

# Superfície de Integração e Extensão

<div class="article-intro">

Tudo que uma terceira parte pode se conectar executa através de uma API e um modelo de autorização. Esta página é o mapa: nomeia cada superfície de integração, mostra como eles conectam e vinculam a referência detalhada para cada uma. Se você está construindo contra B1, comece aqui para escolher a porta correta, depois siga o link para a página que documenta isto em profundidade.

</div>

## As Superfícies num Relance

Existem seis maneiras para dentro ou para fora, e elas todas compartilham a mesma camada de auth:

- **[REST API](../api/api-keys)** — a superfície completa do produto, chamável com um token portador de qualquer linguagem.
- **[Chaves de API](../api/api-keys)** — a credencial mais simples: um token `cak_…` vinculado a uma pessoa em uma igreja.
- **[OAuth 2.0 e Apps Conectados](../api/connected-apps)** — consentimento por-igreja para apps multi-tenant; emite o mesmo JWT que um usuário consegue.
- **[Webhooks](../api/webhooks)** — eventos de saída assinados, duramente entregues.
- **[Servidor MCP](../api/mcp)** — um wrapper voltado para IA sobre a REST API em `/mcp`.
- **[Provedores de conteúdo](../freeplay-content-provider)** — o caminho de entrada para bibliotecas de mídia externas em FreePlay e apps B1.

Tudo exceto provedores de conteúdo é servido por uma única API monolítica (o repositório [Api](https://github.com/ChurchApps/Api)) cujos módulos montam sob caminhos base estáveis — `/membership`, `/giving`, `/attendance`, `/content`, `/messaging`, `/doing`, `/reporting` e `/mcp`.

## Como Isto Se Encaixa

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

Três setas contam a história toda: uma terceira parte **chama dentro** com um token portador (chave de API ou JWT OAuth, incluindo via `/mcp`); a API **chama de volta fora** através webhooks assinados; e provedores de conteúdo são o caminho **conteúdo de entrada** onde B1 é o cliente OAuth ***cliente*** puxando mídia de uma fonte externa.

## O Modelo de Auth Compartilhado

Cada credencial — um token de login de usuário, um token de acesso OAuth ou uma chave de API — resolve para o mesmo `Principal` e é checado da mesma maneira. Não há caminho de "auth de integração" separado; uma credencial de escopo é simplesmente indistinguível de um usuário com privilégios menores.

### Estrutura JWT

Os tokens de acesso B1 são HS256 JWTs cunhados em `Api/src/modules/membership/auth/AuthenticatedUser.ts`. O conjunto de claim:

| Claim | Significado |
|---|---|
| `id`, `email`, `firstName`, `lastName` | A pessoa atrás do token |
| `churchId` | A única igreja que este token atua dentro — a âncora para todos escopamento de dados |
| `personId` | O registro de pessoa dentro daquela igreja |
| `permissions` | Array plano de cordas de permissão RBAC (`[apiName_]contentType_contentId_action`) |
| `groupIds`, `leaderGroupIds` | Associação de grupo / liderança para checagens de escopo de grupo |
| `membershipStatus` | Visitante vs. membro, para gating de self-service |

Um token de acesso OAuth é byte-para-byte a mesma forma como um JWT de login — a única diferença é que suas permissões **foram filtradas pelos escopos concedidos antes da assinatura** (`getCombinedApiJwt(...)`).

### Por-escopamento de igreja

`churchId` é um claim de token, não um parâmetro de solicitação, para que uma credencial nunca possa alcançar através de igrejas. Cada consulta de repositório filtra no `churchId` do chamador; uma chave de API ou token OAuth está vinculado a exatamente uma igreja no tempo de cunhagem.

### Permissões baseadas em papel na fronteira

Controladores portão ações com `au.checkAccess(contentType, action)` contra o array `permissions` do token. Escopos são um **filtro, nunca uma concessão** (`Api/src/shared/auth/Scopes.ts`): o `SCOPE_CATALOG` mapeia cada escopo (por exemplo `people:read`, `donations:write`) para os pares de RBAC que permite, e `filterPermissionsByScopes()` interseciona isto com as permissões *atuais* da pessoa em cada resolvação. Consequências:

- Revogar uma permissão em B1Admin corta o acesso da credencial na próxima solicitação — tokens nunca derivam do papel.
- Um escopo pode apenas *remover* permissões, para que uma credencial de escopo nunca possa elevar para administração de servidor / domínio (aquelas permissões estão deliberadamente não mapeadas para qualquer escopo).
- Chaves de API carregam um prefixo `cak_`; `CustomAuthProvider.getUser()` ramifica nele, faz hash do segredo e re-resolve as permissões RBAC ao vivo da pessoa proprietária em cada chamada.

Consulte [Chaves API → Escopos](../api/api-keys#scopes) para o catálogo completo.

## Referência de Superfície

### REST API

A superfície do produto completo. Qualquer endpoint autenticado aceita um JWT ou uma chave de API `cak_…` no cabeçalho `Authorization: Bearer` — não há tabela de rota separada somente chave ou somente OAuth. Módulos e seus caminhos base vivem sob `Api/src/modules/*`.

### Chaves de API

Um token pessoal de acesso `cak_<prefix>.<secret>`, criado em **B1Admin → Configurações → Desenvolvedor → Chaves API**. Apenas um hash SHA-256 é armazenado; a chave bruta é mostrada uma vez. Gerenciado em `/membership/apiKeys` (`Api/src/modules/membership/controllers/ApiKeyController.ts`). Melhor para scripts da própria única igreja e para conectores como Zapier, Make e Google Sheets. → **[Chaves de API](../api/api-keys)**

### OAuth 2.0 e Apps Conectados

Para apps multi-tenant que precisam de consentimento de cada igreja. Implementado em `Api/src/modules/membership/controllers/OAuthController.ts` sob `/membership/oauth`. O servidor suporta três concessões:

- **Authorization Code** — `POST /oauth/authorize` (autenticado) retorna um código de vida curta; `POST /oauth/token` com `grant_type=authorization_code` o câmbio por um JWT de acesso (≈ 7 dias) mais um token de atualização (≈ 90 dias).
- **Device Code** (RFC 8628) — `POST /oauth/device/authorize` emite um `user_code`; o usuário aprova em B1Admin (`/oauth/device/approve`); o dispositivo poolsa `/oauth/token` com a concessão de código de dispositivo. Para TVs, quiosques e CLIs sem navegador.
- **Refresh Token** — `grant_type=refresh_token` cunha um novo token de acesso; clientes públicos (secretless) podem omitir o segredo.

Um **App Conectado** é a visualização de admim de chiesa de um token concedido, listado e revogável em `/membership/oauth/connections`. O controlador também hospeda um **relay-session** de OAuth (`/oauth/relay/*`) que deixa um dispositivo sem navegador completar uma sign-in contra um provedor *externo*. → **[Apps Conectados e OAuth](../api/connected-apps)**

### Webhooks

A única superfície de saída. Uma igreja subscreve um endpoint HTTPS público para eventos; quando uma mudança correspondente ocorre, `WebhookDispatcher.emit(churchId, event, payload)` enriquece cargas apenas de id com nomes de exibição (`personName`, `groupName`, `formName` — lookups correm apenas uma vez que uma subscrição combina), registra uma entrega e um worker de fundo POSTs um envelope JSON assinado com retentativa/backoff e reentrega. Engine em `Api/src/shared/webhooks/`, CRUD por-igreja em `/membership/webhooks` (`WebhookController.ts`). Um campo `connectorType` reformula o corpo para Slack / Discord; o conector `mailchimp` vai ainda mais longe e possui toda a troca HTTP (método/URL/auth por-evento contra API de Mailchimp, credenciais criptografadas em `webhooks.connectorConfig`). → **[Webhooks](../api/webhooks)**

### Servidor MCP

Um wrapper voltado para IA em `/mcp` (`Api/src/modules/mcp/`). Três ferramentas genéricas — `list_endpoints`, `describe_endpoint`, `api_call` — expõem a superfície REST inteira dinamicamente para qualquer cliente MCP. Auth é o mesmo token portador como tudo mais, e `api_call` re-entra a pilha Express em-processo para que cada permissão e regra de escopamento de igreja ainda se aplique. → **[Servidor MCP](../api/mcp)**

### Provedores de conteúdo

O caminho de entrada de conteúdo, no pacote separado `Packages/content-providers` (`@churchapps/content-providers`) em vez da API. Cada provedor implementa a interface `IProvider` (`src/interfaces.ts`) — `browse`, `getPlaylist`, `getInstructions` mais ganchos de auth — e auto-registra em um registro `Map` (`src/providers/registry.ts`). Aqui **B1 é o cliente OAuth**: um provedor declara um `AuthType` de `none`, `oauth_pkce`, `device_flow` ou `form_login` e os helpers compartilhados (`OAuthHelper`, `DeviceFlowHelper`, `TokenHelper`, `ApiHelper`) executam o fluxo PKCE / dispositivo de cliente contra a fonte externa. Onze provedores enviam hoje — incluindo Planning Center, Dropbox, Life.Church, CBN, BibleProject, Jesus Film, Lessons.church e B1.church — alimentando FreePlay e os apps B1. → **[Provedor de Conteúdo FreePlay](../freeplay-content-provider)**

**Planos de ano** pegam neste caminho. Um editor de currículo (com `lessons.edit`) mantém sequências ordenadas semana-1/2/3 no admin Lessons.church (`LessonsApi` tabelas `yearPlans` / `yearPlanWeeks`); `GET /yearPlans/public` em LessonsApi serve planos ao vivo anonimamente, hidratando cada árvore de lição de programa/estudo/venue de semana. B1Admin **Serving → Plans → Schedule Lesson → Apply Year Plan** consome aquele endpoint e escreve um DoingApi plano por semana incluída (`providerId=lessonschurch`, `providerPlanId=/lessons/{programId}/{studyId}/{lessonId}/{venueId}`), mapeando semana N para `startDate + (N−1)×7` dias. Semanas de provedores OLF externos ou com um caminho incompleto são puladas em tempo de aplicação; igrejas editam os planos resultantes como usual e FreePlay toca qualquer coisa que esteja no plano.

## Resumo

| Superfície | Mecanismo de Auth | Direção | Onde implementado | Referência |
|---|---|---|---|---|
| REST API | `Bearer` JWT ou chave `cak_…` | Entrada | `Api/src/modules/*` | [Chaves de API](../api/api-keys) |
| Chaves de API | Token `cak_` com hash SHA-256 | Credencial | `Api/.../membership/controllers/ApiKeyController.ts` | [Chaves de API](../api/api-keys) |
| OAuth 2.0 / Apps Conectados | Código de auth · dispositivo · atualizar → JWT | Entrada | `Api/.../membership/controllers/OAuthController.ts` | [Apps Conectados](../api/connected-apps) |
| Webhooks | Segredo por-hook, assinatura HMAC-SHA256 | Saída | `Api/src/shared/webhooks/` + `WebhookController.ts` | [Webhooks](../api/webhooks) |
| Servidor MCP | `Bearer` JWT ou chave `cak_…` | Entrada (IA) | `Api/src/modules/mcp/` | [Servidor MCP](../api/mcp) |
| Provedores de conteúdo | Por-provedor: nenhum / OAuth PKCE / dispositivo / form | Conteúdo de entrada | `Packages/content-providers/` | [Provedor de Conteúdo](../freeplay-content-provider) |

## Conectores Pré-construídos

Em vez de todos construírem do zero, ChurchApps envia conectores no topo das superfícies acima:

- **[Slack e Discord](/docs/b1-admin/integrations/slack-discord)** — um webhook `connectorType` reformula o envelope padrão em uma mensagem de chat; configurado inteiramente em B1Admin, sem conta de terceira parte.
- **[Mailchimp](/docs/b1-admin/integrations/services/mailchimp)** — um `mailchimp` connectorType que sincroniza pessoas em uma audiência Mailchimp e mapeia associação de grupo/lista para tags (`Api/src/shared/webhooks/MailchimpConnector.ts`). Diferente dos conectores de chat emite suas próprias solicitações autenticadas por evento (upsert/archive/tag) em vez de POST para uma URL fornecida de igreja; a chave de API e id de audiência vivem criptografadas em `webhooks.connectorConfig`. Uma-way, campos de merge padrão apenas.
- **[Zapier](/docs/b1-admin/integrations/zapier)** e **[Make](/docs/b1-admin/integrations/make)** — gatilho em eventos webhook e atuar via REST API; eles registram seu próprio webhook quando um Zap/cenário liga (precisa de chave com `settings:write`). A fonte do app Zapier vive no repositório `Integrations` sob `zapier/` (Zapier CLI, desplegado com `zapier push`).
- **[Google Sheets](/docs/b1-admin/integrations/google-sheets)** — um add-on autenticado com chave de API que exporta Pessoas / Doações / Grupos / Presença sob demanda.
- **[Claude](/docs/b1-admin/integrations/claude)** e **[ChatGPT](/docs/b1-admin/integrations/chatgpt)** — clientes MCP apontados em `/mcp`.

Para seu próprio código, **[`@churchapps/integration-sdk`](https://www.npmjs.com/package/@churchapps/integration-sdk)** (`Packages/integration-sdk`) envolve tudo isto: um cliente REST tipado, um cliente OAuth (código-auth / atualizar / fluxo de dispositivo) e um verificador webhook HMAC com middleware Express.

## Páginas Relacionadas

- [Chaves de API](../api/api-keys) — a credencial mais simples e catálogo de escopo
- [Apps Conectados e OAuth](../api/connected-apps) — fluxos de consentimento multi-tenant
- [Webhooks](../api/webhooks) — o sistema de evento de saída
- [Servidor MCP](../api/mcp) — o wrapper de integração de IA
- [Provedor de Conteúdo FreePlay](../freeplay-content-provider) — tornando-se uma fonte de conteúdo de entrada
- [Integrações (usuário final)](/docs/b1-admin/integrations/) — guias de configuração de conector pré-construído
