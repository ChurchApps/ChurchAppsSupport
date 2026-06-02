---
title: "Servidor MCP"
---

# Servidor MCP

<div class="article-intro">

A API B1 envia um servidor [MCP (Model Context Protocol)](https://modelcontextprotocol.io) em `/mcp`. Qualquer cliente de IA ciente de MCP -- Claude Code, Claude Desktop, o OpenAI Agents SDK, Cursor, ou seu próprio -- pode se conectar a ele e chamar a API REST subjacente em nome de um usuário de igreja autenticado. É um invólucro fino e genérico: existem três ferramentas e elas expõem toda a superfície da API dinamicamente em vez de modelar manualmente cada endpoint.

</div>

<div class="prereqs">
<h4>Antes de Começar</h4>

- Uma [chave de API B1](./api-keys) (`cak_…`) com os escopos que o cliente deve ter
- Um host de API B1 acessível -- `https://api.churchapps.org` para igrejas hospedadas, ou sua própria implantação
- Um cliente MCP. Veja [Claude](/docs/b1-admin/integrations/claude) e [ChatGPT](/docs/b1-admin/integrations/chatgpt) para configuração de usuário final

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
| **Caminho** | `/mcp` (relativo ao host da API) |
| **Método** | Apenas `POST` -- solicitação/resposta e streaming SSE acontecem no mesmo endpoint |
| **Transporte** | [MCP Streamable HTTP](https://modelcontextprotocol.io/specification/2025-11-25/basic/transports) |
| **Modelo de sessão** | Sem estado. Uma instância de servidor MCP fresca é construída por solicitação -- sem id de sessão, sem retomação |
| **Auth** | Token portador. Chaves de API `cak_…` e JWTs B1 funcionam; a resolução é a mesma que qualquer outro endpoint autenticado |

Uma solicitação cujo header `Authorization` está faltando ou inválido retorna:

```json
{ "error": "Unauthorized — MCP requires a valid bearer token (cak_* API key or JWT)." }
```

com HTTP 401.

## Ferramentas

Três ferramentas, todas genéricas. O modelo usa `list_endpoints` para descoberta, `describe_endpoint` para aprender uma forma de payload, e `api_call` para realmente invocar a API.

### `list_endpoints`

Retorna o inventário completo de rotas REST registradas, filtrado por um substring opcional e/ou verbo HTTP. Cada entrada inclui o nome do controlador e os escopos de chave de API mais prováveis necessários.

**Entrada:**

| Campo | Tipo | Descrição |
|---|---|---|
| `filter` | string (opcional) | Substring casado insensível a caso contra o caminho, por ex. `"people"` |
| `method` | enum (opcional) | `GET` / `POST` / `PUT` / `DELETE` / `PATCH` |

**Saída:** um documento JSON da forma

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

O inventário é construído uma vez na inicialização da API da tabela de rota ao vivo -- qualquer coisa que você possa atingir com `curl` aparece aqui.

### `describe_endpoint`

Retorna um resumo curto mais, onde disponível, um request body e resposta de amostra curados manualmente para um endpoint.

**Entrada:**

| Campo | Tipo | Descrição |
|---|---|---|
| `method` | string | Verbo HTTP |
| `path` | string | Caminho completo como retornado por `list_endpoints` |

**Saída:** para endpoints curados, um exemplo com `summary`, `requestBody`, e `responseSample`. Para endpoints sem cura, uma mensagem de fallback instruindo o modelo a chamar `GET` primeiro para ver a forma. Cerca de uma dúzia de rotas de alto tráfego (people, groups, donations, attendance, funds) estão curadas.

### `api_call`

Invoca o endpoint REST escolhido, em processo, através da mesma pilha de middleware Express que uma solicitação HTTP normal -- autenticação, análise de corpo, logging de auditoria, e escoping por-igreja aplicam-se todos.

**Entrada:**

| Campo | Tipo | Descrição |
|---|---|---|
| `method` | enum | `GET` / `POST` / `PUT` / `DELETE` / `PATCH` |
| `path` | string | Caminho incluindo qualquer prefixo de módulo, por ex. `/membership/people` |
| `query` | object (opcional) | Objeto plano de parâmetros de string de consulta |
| `body` | any (opcional) | Corpo de solicitação JSON -- tipicamente um array de objetos de modelo para `POST` |

**Saída:**

```json
{
  "status": 200,
  "truncated": false,
  "body": [ /* a resposta JSON do controlador */ ]
}
```

O resultado da ferramenta é marcado `isError: true` para qualquer resposta com status ≥ 400.

## Modelo de Autenticação

A solicitação MCP em si é executada através de `CustomAuthProvider.getUser()` -- o mesmo caminho que todo endpoint B1 autenticado usa. Um portador `cak_…` resolve para um `Principal` cujas permissões são o RBAC atual da pessoa emissora, **intersectado** com os escopos concedidos da chave. Essa intersecção é recomputada em cada solicitação, portanto:

- Remover um escopo de uma chave (deletando e recriando-a) corta acesso na próxima chamada.
- Remover uma permissão da pessoa subjacente em B1Admin corta acesso na próxima chamada, mesmo que a chave ainda exista.

Para invocações `api_call` aninhadas, o header `Authorization` original é copiado para a solicitação sintética, então `CustomAuthProvider` é executado novamente e a intersecção de escopo é re-aplicada por chamada. Não há cache de token.

## Lista de Bloqueio de Caminho

Um pequeno conjunto de rotas não são acessíveis via `api_call`, mesmo com uma chave válida:

| Padrão | Por quê |
|---|---|
| `/giving/donate/webhook/*` | Endpoints de webhook do provedor esperam corpos assinados e verificados brutos de Stripe/PayPal -- não chamadores gerais |
| `/membership/oauth/clients*` | O registro de cliente OAuth é apenas do operador |
| `/membership/people/apiEmails` | Fechado pelo `jwtSecret` do operador, não permissões de usuário |
| Qualquer rota esperando `multipart/form-data` | Uploads de arquivo não são amigáveis a JSON-RPC |

Um caminho bloqueado retorna um resultado de ferramenta `isError: true` com uma mensagem descritiva; a rota subjacente nunca é invocada.

## Limite de Tamanho de Resposta

Cada resposta `api_call` é limitada em **64 KB** de saída capturada. Se uma consulta exceder o limite, a resposta carrega `"truncated": true` e o modelo espera-se que repita com parâmetros de consulta mais estreitos. Isso impede que uma resposta de ferramenta única exploda a janela de contexto do cliente.

## Limite de Taxa

Não há limite de taxa no nível de aplicação em `/mcp`. Aceleração é adiada para API Gateway / concorrência Lambda em produção, e para tudo que seu proxy reverso impõe em implantações auto-hospedadas.

## Descoberta OAuth

O servidor MCP **não** anuncia metadados OAuth 2.1 (`/.well-known/oauth-authorization-server`, registro dinâmico de cliente, fluxo PKCE). Clientes que requerem servidores MCP descobertos por OAuth -- notavelmente a UI "Add custom connector" do Claude.ai e o recurso "Connectors" do ChatGPT -- não podem se conectar sem essa superfície.

Clientes que aceitam um token portador estático em sua configuração -- Claude Code, Claude Desktop, OpenAI Agents SDK, Cursor, código customizado -- funcionam hoje. O [OAuthController](/docs/developer/api/connected-apps) existente já emite tokens via código de autorização + PKCE para aplicações de terceiros; uma camada de descoberta conforme MCP-spec em cima disso fecharia a lacuna.

## Desenvolvimento Local

O endpoint MCP monta junto com tudo mais quando a API executa localmente:

```bash
cd Api
npm run dev
# Server listening on http://localhost:8084
```

Na inicialização a linha de log `📡 MCP server ready at /mcp — N routes in inventory` confirma que o inventário foi construído.

Sonde-o com o MCP Inspector:

```bash
npx @modelcontextprotocol/inspector
```

Na UI do Inspector, aponte para `http://localhost:8084/mcp` e defina o header `Authorization` para `Bearer cak_<prefix>.<secret>`. Chame `list_endpoints` primeiro; você deveria ver a lista de rota completa. Então `api_call({ method: "GET", path: "/membership/people" })` deveria retornar suas pessoas de seed locais.

## Layout de Código

O servidor MCP vive em `src/modules/mcp/` no repo Api. Arquivos notáveis:

| Arquivo | Propósito |
|---|---|
| `McpController.ts` | `@controller("/mcp")`; fiação `StreamableHTTPServerTransport` por solicitação |
| `McpServer.ts` | Constrói um MCP `Server`, registra as três ferramentas |
| `RouteInventory.ts` | Caminha pelos metadados de inversify-express-utils na inicialização para enumerar rotas |
| `internalDispatch.ts` | `req`/`res` sintético que re-entra no app Express em processo |
| `tools/` | `listEndpoints.ts`, `describeEndpoint.ts`, `apiCall.ts` |
| `examples.ts` | Amostras de request/response curadas para endpoints de alto tráfego |

## Relacionado

- [Chaves de API](./api-keys)
- [Webhooks](./webhooks)
- [Aplicativos Conectados (OAuth)](./connected-apps)
- [Claude -- configuração de usuário final](/docs/b1-admin/integrations/claude)
- [ChatGPT -- configuração de usuário final](/docs/b1-admin/integrations/chatgpt)
