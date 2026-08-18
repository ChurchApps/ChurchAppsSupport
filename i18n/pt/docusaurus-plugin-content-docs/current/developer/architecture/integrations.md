---
title: "Superfície de Integração e Extensão"
---

# Superfície de Integração e Extensão

<div class="article-intro">

Tudo em que um terceiro pode se conectar passa por uma API e um modelo de autorização. Esta página é o mapa: nomeia todas as superfícies de integração, mostra como se conectam e vincula à referência detalhada para cada uma. Se você está construindo contra B1, comece aqui para escolher a porta certa, depois siga o link para a página que o documenta em profundidade.

</div>

## As Superfícies em Uma Olhada

Existem seis maneiras de entrar ou sair, e todas compartilham a mesma camada de auth:

- **[REST API](../api/api-keys)** — toda a superfície do produto, chamável com um token portador de qualquer linguagem.
- **[Chaves de API](../api/api-keys)** — a credencial mais simples: um token `cak_…` vinculado a uma pessoa em uma igreja.
- **[OAuth 2.0 e Aplicativos Conectados](../api/connected-apps)** — consentimento por igreja para aplicativos multi-inquilino; emite o mesmo JWT que um usuário recebe.
- **[Webhooks](../api/webhooks)** — eventos de saída assinados e entregues de forma durável.
- **[Servidor MCP](../api/mcp)** — um wrapper voltado para IA sobre a REST API em `/mcp`.
- **[Provedores de conteúdo](../freeplay-content-provider)** — o caminho de entrada para bibliotecas de mídia externas para FreePlay e os aplicativos B1.

Tudo exceto provedores de conteúdo é servido por uma única API monolítica (o repositório [Api](https://github.com/ChurchApps/Api)) cujos módulos montam sob caminhos base estáveis — `/membership`, `/giving`, `/attendance`, `/content`, `/messaging`, `/doing`, `/reporting` e `/mcp`.

## Como Se Encaixa Junto

```
   ┌─────────────────────┐                          ┌───────────────────────────────────────┐
   │  Aplicativo terceiro │   Portador cak_… / JWT   │              B1 API (Api)              │
   │  · servidor / SaaS   │ ───────────────────────▶ │  ┌─────────────────────────────────┐  │
   │  · Zapier / Make     │                          │  │ CustomAuthProvider.getUser()    │  │
   │  · Google Sheets     │                          │  │   chave cak_ ─┐                 │  │
   │  · CLI / scripts     │                          │  │   JWT OAuth ┴▶ Principal        │  │
   │  · cliente IA (MCP)  │ ─── POST /mcp ──────────▶ │  │   escopos filtram → permissões[]│  │
   └─────────────────────┘                          │  └────────────────┬────────────────┘  │
             ▲                                        │                   ▼                    │
             │                                        │  Módulos API: /membership /giving     │
             │        JSON POST assinado              │  /attendance /content /messaging …    │
             │   (pessoa / doação / grupo / …)        │                   │                    │
             └──────────── webhooks ◀─────────────────┼─ shared/webhooks/WebhookDispatcher     │
                     (durável, HMAC-SHA256 assinado)  └───────────────────────────────────────┘

   Fontes de conteúdo externo (Planning Center, Dropbox, Life.Church, CBN, …)
             │   OAuth PKCE / device flow / nenhum  ──  B1 é o cliente OAuth *aqui*  ──▶
             ▼
   Packages/content-providers   ──▶   FreePlay / aplicativos B1        (caminho de conteúdo de entrada)
```

Três setas contam toda a história: um terceiro **chama com** um token portador (chave de API ou JWT OAuth, incluindo via `/mcp`); a API **chama de volta** através de webhooks assinados; e provedores de conteúdo são o único caminho **de conteúdo de entrada** onde B1 em si é o cliente OAuth extraindo mídia de uma fonte externa.

## O Modelo de Autorização Compartilhada

Toda credencial — um JWT de login do usuário, um token de acesso OAuth ou uma chave de API — resolve para o **mesmo `Principal`** e é verificada da mesma forma. Não há caminho de "auth de integração" separado; uma credencial com escopo é simplesmente indistinguível de um usuário com menos privilégios.

### Estrutura JWT

Tokens de acesso B1 são JWTs HS256 criados em `Api/src/modules/membership/auth/AuthenticatedUser.ts`. O conjunto de reclamações:

| Reclamação | Significado |
|---|---|
| `id`, `email`, `firstName`, `lastName` | A pessoa por trás do token |
| `churchId` | A única igreja em que este token atua — a âncora para todo o escopo de dados |
| `personId` | O registro de pessoa dentro dessa igreja |
| `permissions` | Matriz plana de strings de perm RBAC (`[apiName_]contentType_contentId_action`) |
| `groupIds`, `leaderGroupIds` | Associação de grupo / liderança, para verificações com escopo de grupo |
| `membershipStatus` | Visitante vs. membro, para gating de autoatendimento |

Um token de acesso OAuth é byte por byte a mesma forma que um JWT de login — a única diferença é que sua matriz `permissions` foi **filtrada através dos escopos concedidos antes da assinatura** (`getCombinedApiJwt(...)`).

### Escopo por igleja

`churchId` é uma reclamação de token, não um parâmetro de solicitação, então uma credencial nunca pode alcançar entre igrejas. Cada consulta de repositório filtra no `churchId` do chamador; uma chave de API ou token OAuth é vinculado a exatamente uma igreja no tempo de criação.

### Permissões baseadas em função no limite

Os controladores portam ações com `au.checkAccess(contentType, action)` contra a matriz `permissions` do token. Os escopos são um **filtro, nunca uma concessão** (`Api/src/shared/auth/Scopes.ts`): o `SCOPE_CATALOG` mapeia cada escopo (por exemplo, `people:read`, `donations:write`) para os pares RBAC que ele permite, e `filterPermissionsByScopes()` intersecta isso com as permissões *atuais* da pessoa em cada resolução. Consequências:

- Revogar uma permissão em B1Admin corta o acesso da credencial na próxima solicitação — tokens nunca se desviam da função.
- Um escopo pode apenas *remover* permissões, então uma credencial com escopo nunca pode elevar a administração de servidor / domínio (essas permissões são intencionalmente não mapeadas para nenhum escopo).
- Chaves de API carregam um prefixo `cak_`; `CustomAuthProvider.getUser()` se ramifica, faz hash do segredo e re-resolve o RBAC ao vivo da pessoa proprietária em cada chamada.

Veja [Chaves de API → Escopos](../api/api-keys#scopes) para o catálogo completo.

## Referência de Superfície

### REST API

A superfície do produto completa. Qualquer endpoint autenticado aceita um JWT ou uma chave de API `cak_…` no cabeçalho `Authorization: Bearer` — não há tabela de rotas separada apenas para chave ou OAuth. Módulos e seus caminhos base vivem sob `Api/src/modules/*`.

### Chaves de API

Um token de acesso pessoal `cak_<prefixo>.<secreto>`, criado em **B1Admin → Configurações → Desenvolvedor → Chaves de API**. Apenas um hash SHA-256 é armazenado; a chave bruta é mostrada uma vez. Gerenciado em `/membership/apiKeys` (`Api/src/modules/membership/controllers/ApiKeyController.ts`). Melhor para scripts próprios de uma única igreja e para conectores como Zapier, Make e Google Sheets. → **[Chaves de API](../api/api-keys)**

### OAuth 2.0 e Aplicativos Conectados

Para aplicativos multi-inquilino que precisam do consentimento de cada igreja. Implementado em `Api/src/modules/membership/controllers/OAuthController.ts` sob `/membership/oauth`. O servidor oferece suporte a três concessões:

- **Código de Autorização** — `POST /oauth/authorize` (autenticado) retorna um código de curta duração; `POST /oauth/token` com `grant_type=authorization_code` o troca por um JWT de acesso (≈ 7 dias) mais um token de atualização (≈ 90 dias).
- **Código de Dispositivo** (RFC 8628) — `POST /oauth/device/authorize` emite um `user_code`; o usuário o aprova em B1Admin (`/oauth/device/approve`); o dispositivo pesquisa `/oauth/token` com a concessão de código de dispositivo. Para TVs, quiosques e CLIs sem navegador.
- **Token de Atualização** — `grant_type=refresh_token` cria um novo token de acesso; clientes públicos (sem segredo) podem omitir o segredo.

Um **Aplicativo Conectado** é a visão do administrador da igreja de um token concedido, listado e revogável em `/membership/oauth/connections`. O controlador também hospeda uma ponte de **sessão de retransmissão** OAuth (`/oauth/relay/*`) que permite que um dispositivo sem navegador complete uma entrada contra um provedor *externo*. → **[Aplicativos Conectados e OAuth](../api/connected-apps)**

### Webhooks

A única superfície de saída. Uma igreja inscreve um endpoint HTTPS público a eventos; quando uma mudança correspondente ocorre, `WebhookDispatcher.emit(churchId, event, payload)` enriquece payloads apenas de id com nomes de exibição (`personName`, `groupName`, `formName` — buscas executam apenas uma vez que uma inscrição corresponde), registra uma entrega e um worker de fundo POSTs um envelope JSON assinado com retry/backoff e reentrega. Mecanismo em `Api/src/shared/webhooks/`, CRUD por igreja sob `/membership/webhooks` (`WebhookController.ts`). Um campo `connectorType` reformula o corpo para Slack / Discord; o conector `mailchimp` vai além e possui a troca HTTP inteira (método/URL/auth por evento contra a API do Mailchimp, credenciais criptografadas em `webhooks.connectorConfig`). → **[Webhooks](../api/webhooks)**

### Servidor MCP

Um wrapper voltado para IA em `/mcp` (`Api/src/modules/mcp/`). Três ferramentas genéricas — `list_endpoints`, `describe_endpoint`, `api_call` — expõem a superfície REST inteira dinamicamente a qualquer cliente MCP. Auth é o mesmo token portador que tudo mais, e `api_call` re-entra na pilha Express em processo para que toda regra de permissão e escopo de igreja ainda se aplique. → **[Servidor MCP](../api/mcp)**

### Provedores de conteúdo

O caminho de conteúdo de entrada, no pacote separado `Packages/content-providers` (`@churchapps/content-providers`) em vez da API. Cada provedor implementa a interface `IProvider` (`src/interfaces.ts`) — `browse`, `getPlaylist`, `getInstructions`, mais hooks de auth — e se auto-registra em um registro `Map` (`src/providers/registry.ts`). Aqui **B1 é o cliente OAuth**: um provedor declara um `AuthType` de `none`, `oauth_pkce`, `device_flow` ou `form_login`, e os helpers compartilhados (`OAuthHelper`, `DeviceFlowHelper`, `TokenHelper`, `ApiHelper`) executam o fluxo PKCE / dispositivo do lado do cliente contra a fonte externa. Onze provedores são enviados hoje — incluindo Planning Center, Dropbox, Life.Church, CBN, BibleProject, Jesus Film, Lessons.church e B1.church — alimentando FreePlay e os aplicativos B1. → **[Provedor de Conteúdo FreePlay](../freeplay-content-provider)**

## Resumo

| Superfície | Mecanismo de Auth | Direção | Onde implementado | Referência |
|---|---|---|---|---|
| REST API | `Bearer` JWT ou chave `cak_…` | Entrada | `Api/src/modules/*` | [Chaves de API](../api/api-keys) |
| Chaves de API | Token `cak_` com hash SHA-256 | Credencial | `Api/.../membership/controllers/ApiKeyController.ts` | [Chaves de API](../api/api-keys) |
| OAuth 2.0 / Aplicativos Conectados | Código de auth · dispositivo · atualização → JWT | Entrada | `Api/.../membership/controllers/OAuthController.ts` | [Aplicativos Conectados](../api/connected-apps) |
| Webhooks | Segredo por hook, assinatura HMAC-SHA256 | Saída | `Api/src/shared/webhooks/` + `WebhookController.ts` | [Webhooks](../api/webhooks) |
| Servidor MCP | `Bearer` JWT ou chave `cak_…` | Entrada (IA) | `Api/src/modules/mcp/` | [Servidor MCP](../api/mcp) |
| Provedores de conteúdo | Por provedor: nenhum / OAuth PKCE / dispositivo / formulário | Conteúdo de entrada | `Packages/content-providers/` | [Provedor de Conteúdo](../freeplay-content-provider) |

## Conectores Pré-construídos

Em vez de todos construírem do zero, ChurchApps envia conectores sobre as superfícies acima:

- **[Slack e Discord](/docs/b1-admin/integrations/slack-discord)** — um `connectorType` webhook reformula o envelope padrão em uma mensagem de chat; configurado inteiramente em B1Admin, sem conta de terceiro.
- **[Mailchimp](/docs/b1-admin/integrations/services/mailchimp)** — um `connectorType` mailchimp que sincroniza pessoas em um público Mailchimp e mapeia associação de grupo/lista para tags (`Api/src/shared/webhooks/MailchimpConnector.ts`). Ao contrário dos conectores de chat, ele emite suas próprias solicitações autenticadas por evento (upsert/archive/tag) em vez de POSTar em uma URL fornecida pela igreja; a chave de API e id de público vivem criptografados em `webhooks.connectorConfig`. Unidirecional, apenas campos de mesclagem padrão.
- **[Zapier](/docs/b1-admin/integrations/zapier)** e **[Make](/docs/b1-admin/integrations/make)** — acione eventos de webhook e aja via REST API; eles registram seu próprio webhook quando um Zap/cenário é ligado (precisa de uma chave com `settings:write`). A fonte do aplicativo Zapier vive no repositório `Integrations` sob `zapier/` (Zapier CLI, implantado com `zapier push`).
- **[Google Sheets](/docs/b1-admin/integrations/google-sheets)** — um complemento autenticado por chave de API que exporta Pessoas / Doações / Grupos / Frequência sob demanda.
- **[Claude](/docs/b1-admin/integrations/claude)** e **[ChatGPT](/docs/b1-admin/integrations/chatgpt)** — clientes MCP apontados para `/mcp`.

Para seu próprio código, **[`@churchapps/integration-sdk`](https://www.npmjs.com/package/@churchapps/integration-sdk)** (`Packages/integration-sdk`) envolve tudo: um cliente REST digitado, um cliente OAuth (código de auth / atualização / fluxo de dispositivo) e um verificador de webhook HMAC com middleware Express.

## Páginas Relacionadas

- [Chaves de API](../api/api-keys) — a credencial mais simples e o catálogo de escopo
- [Aplicativos Conectados e OAuth](../api/connected-apps) — fluxos de consentimento multi-inquilino
- [Webhooks](../api/webhooks) — o sistema de evento de saída
- [Servidor MCP](../api/mcp) — o wrapper de integração de IA
- [Provedor de Conteúdo FreePlay](../freeplay-content-provider) — se tornando uma fonte de conteúdo de entrada
- [Integrações (usuário final)](/docs/b1-admin/integrations/) — guias de configuração de conectores pré-construídos
