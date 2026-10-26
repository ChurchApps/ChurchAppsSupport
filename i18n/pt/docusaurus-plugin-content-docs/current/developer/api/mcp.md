---
title: "Servidor MCP"
---

# Servidor MCP

<div class="article-intro">

A API do B1 disponibiliza um servidor [MCP (Model Context Protocol)](https://modelcontextprotocol.io) em `/mcp`. Qualquer cliente de IA compatível com MCP -- conectores personalizados do claude.ai, Claude Code, Claude Desktop, o OpenAI Agents SDK, Cursor ou um cliente próprio -- pode se conectar a ele e chamar a API REST subjacente em nome de um usuário autenticado da igreja. É um wrapper genérico e enxuto: três ferramentas genéricas expõem toda a superfície da API de forma dinâmica, em vez de modelar manualmente cada endpoint, além de uma ferramenta de guia de domínio para o construtor de sites.

</div>

<div class="prereqs">
<h4>Antes de começar</h4>

- Uma [chave de API do B1](./api-keys) (`cak_…`) com os escopos que o cliente deve ter, ou um cliente MCP que consiga fazer login com OAuth (consulte [Descoberta OAuth](#oauth-discovery))
- Um host da API do B1 acessível -- `https://api.churchapps.org` para igrejas hospedadas, ou a sua própria implantação
- Um cliente MCP. Consulte [Claude](/docs/b1-admin/integrations/claude) e [ChatGPT](/docs/b1-admin/integrations/chatgpt) para a configuração do usuário final

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
| **Método** | Somente `POST` -- requisição/resposta e streaming SSE acontecem no mesmo endpoint |
| **Transporte** | [MCP Streamable HTTP](https://modelcontextprotocol.io/specification/2025-11-25/basic/transports) |
| **Modelo de sessão** | Sem estado. Uma nova instância do servidor MCP é criada por requisição -- sem ID de sessão, sem retomada |
| **Autenticação** | Bearer token. Chaves de API `cak_…` e JWTs do B1 (incluindo tokens de acesso OAuth) funcionam; a resolução é a mesma de qualquer outro endpoint autenticado |

Uma requisição cujo cabeçalho `Authorization` esteja ausente ou seja inválido retorna:

```json
{ "error": "Unauthorized — MCP requires a valid bearer token (cak_* API key or JWT)." }
```

com HTTP 401 e um cabeçalho `WWW-Authenticate: Bearer resource_metadata="<api>/.well-known/oauth-protected-resource"`, que clientes compatíveis com OAuth seguem para iniciar o login.

Na API hospedada (produção e demo), `/mcp` é servido por meio de uma API HTTP do API Gateway, e não pela API REST usada nos demais endpoints. A API REST renomeia `WWW-Authenticate` para `x-amzn-remapped-www-authenticate` nas respostas de proxy do Lambda, o que deixava clientes como o ChatGPT com um 401 sem qualquer forma de iniciar o login; a API HTTP repassa o cabeçalho sem alterações.

## Ferramentas

Três ferramentas genéricas e um guia. O modelo usa `list_endpoints` para descobrir os endpoints, `describe_endpoint` para conhecer o formato de um payload, `api_call` para de fato invocar a API e `describe_page_builder` quando a tarefa envolve conteúdo de sites.

### `list_endpoints`

Retorna o inventário completo das rotas REST registradas, filtrado por um substring opcional e/ou por verbo HTTP. Cada item inclui o nome do controlador e os escopos de chave de API mais prováveis de serem necessários.

**Entrada:**

| Campo | Tipo | Descrição |
|---|---|---|
| `filter` | string (opcional) | Substring sem diferenciação de maiúsculas e minúsculas, comparado com o caminho, por exemplo `"people"` |
| `method` | enum (opcional) | `GET` / `POST` / `PUT` / `DELETE` / `PATCH` |

**Saída:** um documento JSON com a seguinte forma:

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

O inventário é construído uma única vez, na inicialização da API, a partir da tabela de rotas em execução -- tudo o que você consegue acessar com `curl` aparece aqui.

### `describe_endpoint`

Retorna um resumo curto e, quando disponível, um corpo de requisição e um exemplo de resposta definidos manualmente para um endpoint.

**Entrada:**

| Campo | Tipo | Descrição |
|---|---|---|
| `method` | string | Verbo HTTP |
| `path` | string | Caminho completo, conforme retornado por `list_endpoints` |

**Saída:** para endpoints com curadoria, um exemplo com `summary`, `requestBody` e `responseSample`. Para endpoints sem curadoria, uma mensagem de fallback orientando o modelo a chamar `GET` primeiro para ver o formato. Cerca de uma dúzia de rotas de alto tráfego (pessoas, grupos, doações, presença, fundos) têm curadoria.

### `api_call`

Invoca o endpoint REST escolhido, em processo, pela mesma pilha de middleware do Express usada em uma requisição HTTP normal -- autenticação, leitura do corpo, registro de auditoria e isolamento por igreja são aplicados.

**Entrada:**

| Campo | Tipo | Descrição |
|---|---|---|
| `method` | enum | `GET` / `POST` / `PUT` / `DELETE` / `PATCH` |
| `path` | string | Caminho incluindo o prefixo do módulo, por exemplo `/membership/people` |
| `query` | object (opcional) | Objeto simples com parâmetros da query string |
| `body` | any (opcional) | Corpo JSON da requisição -- normalmente um array de objetos de modelo em `POST` |

**Saída:**

```json
{
  "status": 200,
  "truncated": false,
  "body": [ /* the controller's JSON response */ ]
}
```

O resultado da ferramenta é marcado com `isError: true` para qualquer resposta com status ≥ 400.

### `describe_page_builder`

A única ferramenta não genérica: um guia estático e autocontido para criar páginas de sites pelos endpoints `/content/*` -- o modelo de dados Página → Seção → Elemento, o fluxo de criação, cada `elementType` com o formato de `answersJSON`, configurações no nível da seção, como os divisores de forma `dividerTop`/`dividerBottom`, e um exemplo completo e trabalhado. Não recebe entrada e espelha o catálogo de elementos mantido no editor do B1Admin (consulte [Arquitetura do construtor de sites](../architecture/website-builder)). Espera-se que os agentes a chamem uma vez antes de criar ou editar conteúdo de página e, depois, atuem por meio de `api_call`.

## Modelo de autenticação

A própria requisição MCP passa por `CustomAuthProvider.getUser()` -- o mesmo caminho que todo endpoint autenticado do B1 utiliza. Um bearer `cak_…` resolve para um `Principal` cujas permissões são o RBAC atual da pessoa que emitiu a chave, **intersectado** com os escopos concedidos à chave. Essa interseção é recalculada a cada requisição, portanto:

- Remover um escopo de uma chave (excluindo-a e recriando-a) corta o acesso na próxima chamada.
- Remover uma permissão da pessoa subjacente no B1Admin corta o acesso na próxima chamada, mesmo que a chave ainda exista.

Para invocações `api_call` aninhadas, o cabeçalho `Authorization` original é copiado para a requisição sintética, de modo que o `CustomAuthProvider` é executado novamente e a interseção de escopos é reaplicada em cada chamada. Não há cache de tokens.

## Lista de bloqueio de caminhos

Um pequeno conjunto de rotas não é acessível via `api_call`, mesmo com uma chave válida:

| Padrão | Motivo |
|---|---|
| `/giving/donate/webhook/*` | Os endpoints de webhook do provedor esperam corpos brutos com assinatura verificada, vindos do Stripe/PayPal -- não de chamadores em geral |
| `/membership/oauth/clients*` | O registro de clientes OAuth é exclusivo do operador |
| `/membership/people/apiEmails` | Protegido pelo `jwtSecret` do operador, e não pelas permissões do usuário |
| Qualquer rota que espere `multipart/form-data` | Uploads de arquivos não são compatíveis com JSON-RPC |

Um caminho bloqueado retorna um resultado de ferramenta com `isError: true` e uma mensagem descritiva; a rota subjacente nunca é invocada.

## Limite de tamanho da resposta

O corpo de cada resposta de `api_call` é limitado a **64 KB** de saída capturada. Se uma consulta exceder o limite, a resposta traz `"truncated": true` e espera-se que o modelo repita a chamada com parâmetros de consulta mais restritos. Isso evita que uma única resposta de ferramenta estoure a janela de contexto do cliente.

## Limite de taxa

Não há limite de taxa no nível da aplicação em `/mcp`. A limitação fica a cargo da concorrência do API Gateway / Lambda em produção e do que o seu proxy reverso impuser em implantações self-hosted.

## Descoberta OAuth {#oauth-discovery}

O servidor MCP anuncia metadados OAuth 2.1, para que clientes que se conectam apenas a servidores descobertos via OAuth -- em especial a interface "Add custom connector" do Claude.ai -- possam autenticar um usuário sem uma chave colada manualmente. `/mcp` é o recurso protegido, o [provedor OAuth](./connected-apps) em `/membership/oauth` é o servidor de autorização, e a página `/oauth` do B1Admin é a tela de consentimento.

| Endpoint | Finalidade |
|---|---|
| `GET /.well-known/oauth-protected-resource` (também `/.well-known/oauth-protected-resource/mcp`) | Metadados do recurso protegido (RFC 9728): `resource` é `<api>/mcp`, `authorization_servers` é a raiz da API, `scopes_supported` lista todos os [escopos de chave de API](./api-keys#scopes) |
| `GET /.well-known/oauth-authorization-server` | Metadados do servidor de autorização (RFC 8414): `authorization_endpoint` é a página `/oauth` do B1Admin, `token_endpoint` é `/membership/oauth/token` e `registration_endpoint` é `/membership/oauth/register` |
| `POST /membership/oauth/register` | Registro dinâmico de clientes (RFC 7591) |

O fluxo executado por um cliente como o claude.ai:

1. `POST /mcp` sem token retorna 401 com o cabeçalho `WWW-Authenticate` apontando para os metadados do recurso protegido.
2. O cliente lê os dois documentos de metadados e se registra com `POST /membership/oauth/register`, enviando `client_name`, `redirect_uris` e, opcionalmente, `scope`. Todo cliente auto-registrado é um cliente **público**: nenhum segredo é emitido e a resposta traz `token_endpoint_auth_method: "none"`. As URIs de redirecionamento devem ser `https`, ou `http` em um endereço de loopback (`localhost`, `127.0.0.1`, `[::1]`); no máximo 10 por cliente. O registro tem limite de 20 por hora por IP.
3. O usuário é enviado para a página `/oauth` do B1Admin com `code_challenge` e `code_challenge_method=S256`. A página de consentimento lista cada escopo solicitado em linguagem simples (ou "Tudo o que a sua conta do B1 pode acessar" quando nenhum foi solicitado), mostra o host para o qual o usuário será redirecionado e indica quando o aplicativo se registrou sozinho. O usuário clica em **Allow**.
4. O cliente troca o código em `/membership/oauth/token` com `grant_type=authorization_code` e seu `code_verifier`, e depois renova com `grant_type=refresh_token`. Corpos codificados em formulário e em JSON são aceitos.
5. O token de acesso resultante é um JWT do B1 com escopo, usado como bearer em `/mcp`.

Regras de PKCE: somente `S256` é aceito. Um cliente sem segredo deve enviar um `code_challenge` na autorização e o `code_verifier` correspondente na troca do token; clientes confidenciais (com segredo) ainda podem usar apenas o segredo. As URIs de redirecionamento devem corresponder exatamente a uma URI registrada.

Clientes que aceitam um bearer token estático na configuração -- Claude Code, Claude Desktop, OpenAI Agents SDK, Cursor, código próprio -- podem continuar usando uma chave `cak_…`.

## Desenvolvimento local

O endpoint MCP é montado junto com todo o restante quando a API roda localmente:

```bash
cd Api
npm run dev
# Server listening on http://localhost:8084
```

Na inicialização, a linha de log `📡 MCP server ready at /mcp — N routes in inventory` confirma que o inventário foi construído.

Teste-o com o MCP Inspector:

```bash
npx @modelcontextprotocol/inspector
```

Na interface do Inspector, aponte para `http://localhost:8084/mcp` e defina o cabeçalho `Authorization` como `Bearer cak_<prefix>.<secret>`. Chame `list_endpoints` primeiro; você deverá ver a lista completa de rotas. Em seguida, `api_call({ method: "GET", path: "/membership/people" })` deverá retornar as pessoas de exemplo do seu ambiente local.

## Estrutura do código

O servidor MCP fica em `src/modules/mcp/` no repositório Api. Arquivos relevantes:

| Arquivo | Finalidade |
|---|---|
| `McpController.ts` | `@controller("/mcp")`; cria um `StreamableHTTPServerTransport` por requisição e envia o desafio `WWW-Authenticate` em caso de 401 |
| `WellKnownController.ts` / `OAuthMetadata.ts` | Serve os documentos de descoberta OAuth em `/.well-known` |
| `McpServer.ts` | Cria um `Server` MCP e registra as quatro ferramentas |
| `RouteInventory.ts` | Percorre os metadados do inversify-express-utils na inicialização para enumerar as rotas |
| `internalDispatch.ts` | `req`/`res` sintéticos que reentram na aplicação Express em processo |
| `tools/` | `listEndpoints.ts`, `describeEndpoint.ts`, `apiCall.ts`, `describePageBuilder.ts` |
| `examples.ts` | Exemplos de requisição/resposta com curadoria para endpoints de alto tráfego |

## Relacionados

- [Chaves de API](./api-keys)
- [Webhooks](./webhooks)
- [Aplicativos conectados (OAuth)](./connected-apps)
- [Claude — configuração para o usuário final](/docs/b1-admin/integrations/claude)
- [ChatGPT — configuração para o usuário final](/docs/b1-admin/integrations/chatgpt)
