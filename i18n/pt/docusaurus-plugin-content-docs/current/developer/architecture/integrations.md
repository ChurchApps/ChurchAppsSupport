---
title: "Superfície de Integração e Extensão"
---

# Superfície de Integração e Extensão

<div class="article-intro">

Tudo em que uma terceira parte pode se conectar funciona através de uma API e um modelo de autorização. Esta página é o mapa: nomeia cada superfície de integração, mostra como elas se conectam e vincula à referência detalhada para cada uma. Se você está construindo contra B1, comece aqui para escolher a porta certa e siga o link para a página que documenta em detalhes.

</div>

## As Superfícies em um Relance

Existem seis maneiras de entrar ou sair, e todas compartilham a mesma camada de autenticação:

- **[API REST](../api/api-keys)** — toda a superfície do produto, chamável com um token de portador de qualquer idioma.
- **[Chaves de API](../api/api-keys)** — a credencial mais simples: um token `cak_…` vinculado a uma pessoa em uma igreja.
- **[OAuth 2.0 e Aplicativos Conectados](../api/connected-apps)** — consentimento por chiesa para aplicativos multi-inquilino; emite o mesmo JWT que um usuário obtém.
- **[Webhooks](../api/webhooks)** — eventos de saída assinados e entregues duramente.
- **[Servidor MCP](../api/mcp)** — um wrapper voltado para IA sobre a API REST em `/mcp`.
- **[Provedores de conteúdo](../freeplay-content-provider)** — o caminho de entrada para bibliotecas de mídia externas em FreePlay e os aplicativos B1.

Tudo exceto provedores de conteúdo é servido por uma única API monolítica (o repositório [Api](https://github.com/ChurchApps/Api)) cujos módulos são montados em caminhos base estáveis — `/membership`, `/giving`, `/attendance`, `/content`, `/messaging`, `/doing`, `/reporting` e `/mcp`.

## Como Encaixa

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

Três setas contam a história toda: uma terceira parte **liga dentro** com um token de portador (chave de API ou JWT do OAuth, incluindo via `/mcp`); a API **liga de volta** através de webhooks assinados; e provedores de conteúdo são o único caminho de **conteúdo de entrada** onde B1 é o **cliente** do OAuth puxando mídia de uma fonte externa.

## O Modelo de Autenticação Compartilhado

Toda credencial — um JWT de login de usuário, um token de acesso OAuth ou uma chave de API — resolve para o **mesmo `Principal`** e é verificado da mesma forma. Não há caminho "auth de integração" separado; uma credencial com escopo é simplesmente indistinguível de um usuário com privilégio menor.

### Estrutura JWT

Os tokens de acesso B1 são JWTs HS256 cunhados em `Api/src/modules/membership/auth/AuthenticatedUser.ts`. O conjunto de reivindicações:

| Reivindicação | Significado |
|---|---|
| `id`, `email`, `firstName`, `lastName` | A pessoa atrás do token |
| `churchId` | A única chiesa que este token atua — a âncora para todo escopo de dados |
| `personId` | O registro de pessoa dentro dessa chiesa |
| `permissions` | Array plano de strings de permissão RBAC (`[apiName_]contentType_contentId_action`) |
| `groupIds`, `leaderGroupIds` | Associação de grupo / liderança, para verificações com escopo de grupo |
| `membershipStatus` | Convidado vs. membro, para gating de autoatendimento |

Um token de acesso OAuth é byte-por-byte a mesma forma que um JWT de login — a única diferença é que seu array de `permissions` foi **filtrado através dos escopos concedidos antes de assinar** (`getCombinedApiJwt(...)`).

### Escopo por chiesa

`churchId` é uma reivindicação de token, não um parâmetro de solicitação, portanto uma credencial nunca pode alcançar através de igrejas. Cada consulta de repositório filtra no `churchId` do chamador; uma chave de API ou token OAuth é vinculado a exatamente uma chiesa no tempo de cunhagem.

### Permissões baseadas em papel na fronteira

Controladores gateiam ações com `au.checkAccess(contentType, action)` contra o array de `permissions` do token. Escopos são um **filtro, nunca uma concessão** (`Api/src/shared/auth/Scopes.ts`): o `SCOPE_CATALOG` mapeia cada escopo (por exemplo, `people:read`, `donations:write`) para os pares RBAC que permite, e `filterPermissionsByScopes()` cruza isso com as *atuais* permissões da pessoa em cada resolução. Consequências:

- Revogar uma permissão no B1Admin reduz o acesso da credencial na próxima solicitação — tokens nunca derivam da função.
- Um escopo só pode *remover* permissões, portanto uma credencial com escopo nunca pode elevar à administração de servidor / domínio (essas permissões são deliberadamente não mapeadas para nenhum escopo).
- As chaves de API carregam um prefixo `cak_`; `CustomAuthProvider.getUser()` se ramifica nele, hash o segredo e re-resolve as RBAC ao vivo da pessoa proprietária em cada chamada.

Veja [Chaves de API → Escopos](../api/api-keys#scopes) para o catálogo completo.

## Referência de Superfícies

### API REST

A superfície do produto completa. Qualquer ponto de extremidade autenticado aceita um JWT ou uma chave de API `cak_…` no cabeçalho `Authorization: Bearer` — não há tabela de rota separada somente para chave ou somente para OAuth. Módulos e seus caminhos base vivem sob `Api/src/modules/*`.

### Chaves de API

Um token de acesso pessoal `cak_<prefix>.<secret>`, criado em **B1Admin → Configurações → Desenvolvedor → Chaves de API**. Apenas um hash SHA-256 é armazenado; a chave bruta é mostrada uma vez. Gerenciado em `/membership/apiKeys` (`Api/src/modules/membership/controllers/ApiKeyController.ts`). Melhor para scripts próprios de uma única chiesa e para conectores como Zapier, Make e Google Sheets. → **[Chaves de API](../api/api-keys)**

### OAuth 2.0 e Aplicativos Conectados

Para aplicativos multi-inquilino que precisam que cada chiesa consinta. Implementado em `Api/src/modules/membership/controllers/OAuthController.ts` sob `/membership/oauth`. O servidor suporta três concessões:

- **Código de Autorização** — `POST /oauth/authorize` (autenticado) retorna um código de curta duração; `POST /oauth/token` com `grant_type=authorization_code` o troca por um JWT de acesso (≈ 7 dias) mais um token de atualização (≈ 90 dias).
- **Código de Dispositivo** (RFC 8628) — `POST /oauth/device/authorize` emite um `user_code`; o usuário o aprova no B1Admin (`/oauth/device/approve`); o dispositivo consulta `/oauth/token` com a concessão de código de dispositivo. Para TVs, quiosques e CLIs sem navegador.
- **Token de Atualização** — `grant_type=refresh_token` cunha um novo token de acesso; clientes públicos (sem segredo) podem omitir o segredo.

Um **Aplicativo Conectado** é a visualização voltada para o admin da chiesa de um token concedido, listado e revogável em `/membership/oauth/connections`. O controlador também hospeda uma ponte **relay-session** OAuth (`/oauth/relay/*`) que permite que um dispositivo sem navegador conclua um sign-in contra um provedor *externo*. → **[Aplicativos Conectados e OAuth](../api/connected-apps)**

### Webhooks

A única superfície de saída. Uma chiesa se inscreve em um ponto de extremidade HTTPS público para eventos; quando uma mudança correspondente ocorre, `WebhookDispatcher.emit(churchId, event, payload)` registra uma entrega e um trabalhador de fundo POSTs um envelope JSON assinado com retry/backoff e reentrega. Mecanismo em `Api/src/shared/webhooks/`, CRUD por chiesa sob `/membership/webhooks` (`WebhookController.ts`). Um campo `connectorType` reformula o corpo para Slack / Discord. → **[Webhooks](../api/webhooks)**

### Servidor MCP

Um wrapper voltado para IA em `/mcp` (`Api/src/modules/mcp/`). Três ferramentas genéricas — `list_endpoints`, `describe_endpoint`, `api_call` — expõem dinamicamente toda a superfície REST para qualquer cliente MCP. Auth é o mesmo token de portador que tudo mais, e `api_call` re-entra na pilha Express no processo para que toda regra de permissão e escopo de chiesa ainda se aplique. → **[Servidor MCP](../api/mcp)**

### Provedores de conteúdo

O caminho de conteúdo de entrada, no pacote separado `Packages/content-providers` (`@churchapps/content-providers`) em vez da API. Cada provedor implementa a interface `IProvider` (`src/interfaces.ts`) — `browse`, `getPlaylist`, `getInstructions`, mais hooks de autenticação — e auto-registra em um registro `Map` (`src/providers/registry.ts`). Aqui **B1 é o cliente OAuth**: um provedor declara um `AuthType` de `none`, `oauth_pkce`, `device_flow` ou `form_login`, e os auxiliares compartilhados (`OAuthHelper`, `DeviceFlowHelper`, `TokenHelper`, `ApiHelper`) executam o PKCE do lado do cliente / fluxo de dispositivo contra a fonte externa. Onze provedores navegam hoje — incluindo Planning Center, Dropbox, Life.Church, CBN, BibleProject, Jesus Film, Lessons.church e B1.church — alimentando FreePlay e os aplicativos B1. → **[Provedor de Conteúdo FreePlay](../freeplay-content-provider)**

## Resumo

| Superfície | Mecanismo de Autenticação | Direção | Onde Implementado | Referência |
|---|---|---|---|---|
| API REST | JWT `Bearer` ou chave `cak_…` | Entrada | `Api/src/modules/*` | [Chaves de API](../api/api-keys) |
| Chaves de API | Token `cak_` com hash SHA-256 | Credencial | `Api/.../membership/controllers/ApiKeyController.ts` | [Chaves de API](../api/api-keys) |
| OAuth 2.0 / Aplicativos Conectados | Código de autorização · dispositivo · atualizar → JWT | Entrada | `Api/.../membership/controllers/OAuthController.ts` | [Aplicativos Conectados](../api/connected-apps) |
| Webhooks | Segredo por hook, assinatura HMAC-SHA256 | Saída | `Api/src/shared/webhooks/` + `WebhookController.ts` | [Webhooks](../api/webhooks) |
| Servidor MCP | JWT `Bearer` ou chave `cak_…` | Entrada (IA) | `Api/src/modules/mcp/` | [Servidor MCP](../api/mcp) |
| Provedores de conteúdo | Por provedor: nenhum / OAuth PKCE / dispositivo / formulário | Conteúdo de entrada | `Packages/content-providers/` | [Provedor de Conteúdo](../freeplay-content-provider) |

## Conectores Pré-construídos

Em vez de todos construírem do zero, o ChurchApps envia conectores no topo das superfícies acima:

- **[Slack e Discord](/docs/b1-admin/integrations/slack-discord)** — um webhook `connectorType` reformula o envelope padrão em uma mensagem de chat; configurado inteiramente no B1Admin, nenhuma conta de terceiros.
- **[Zapier](/docs/b1-admin/integrations/zapier)** e **[Make](/docs/b1-admin/integrations/make)** — dispara em eventos de webhook e atua via a API REST; eles registram seu próprio webhook quando um Zap/cenário liga (precisa de uma chave com `settings:write`).
- **[Google Sheets](/docs/b1-admin/integrations/google-sheets)** — um add-on autenticado por chave de API que exporta Pessoas / Doações / Grupos / Presença sob demanda.
- **[Claude](/docs/b1-admin/integrations/claude)** e **[ChatGPT](/docs/b1-admin/integrations/chatgpt)** — clientes MCP apontados para `/mcp`.

Para seu próprio código, **[`@churchapps/integration-sdk`](https://www.npmjs.com/package/@churchapps/integration-sdk)** (`Packages/integration-sdk`) envolve tudo isto: um cliente REST digitado, um cliente OAuth (código de autenticação / atualização / fluxo de dispositivo) e um verificador de webhook HMAC com middleware Express.

## Páginas Relacionadas

- [Chaves de API](../api/api-keys) — a credencial mais simples e o catálogo de escopo
- [Aplicativos Conectados e OAuth](../api/connected-apps) — fluxos de consentimento multi-inquilino
- [Webhooks](../api/webhooks) — o sistema de evento de saída
- [Servidor MCP](../api/mcp) — o wrapper de integração de IA
- [Provedor de Conteúdo FreePlay](../freeplay-content-provider) — se tornando uma fonte de conteúdo de entrada
- [Integrações (usuário final)](/docs/b1-admin/integrations/) — guias de configuração de conector pré-construído
