---
title: "Aplicativos conectados e OAuth"
---

# Aplicativos conectados e OAuth

<div class="article-intro">

A API do B1 oferece suporte a OAuth 2.0, para que um aplicativo de terceiros possa pedir a cada administrador da igreja permissão para acessar os dados dela -- sem que a igreja jamais compartilhe uma senha ou chave de API. Um **Aplicativo conectado** é um token OAuth que um administrador da igreja aprovou; revogá-lo corta o acesso do aplicativo de terceiros com um único clique. Use este caminho para conectores SaaS multi-inquilino. Para uma integração de uma única igreja, prefira as [Chaves de API](./api-keys).

</div>

<div class="prereqs">
<h4>Antes de começar</h4>

- Um **cliente** OAuth precisa estar registrado antes que as igrejas possam conceder acesso a ele -- por um administrador do servidor do B1 ou pelo próprio cliente, por meio do [registro dinâmico](#dynamic-client-registration)
- Todos os endpoints OAuth ficam no módulo Membership: `/membership/oauth/...`
- Os tokens de acesso são JWTs -- eles carregam as permissões do usuário filtradas pelos escopos concedidos

</div>

## Conceitos

| Termo | Significado |
|---|---|
| **Cliente OAuth** | O próprio aplicativo de terceiros -- identificado por `client_id` e protegido por `client_secret`. Registrado uma vez no B1 e compartilhado por todas as igrejas que o instalam. |
| **Aplicativo conectado** | Um par específico `(cliente, administrador da igreja)` em que o administrador concedeu acesso ao cliente. Cada Aplicativo conectado é sustentado por um token de atualização OAuth. |
| **Token de acesso** | Um JWT de curta duração (≈ 7 dias) que o cliente usa para as chamadas à API. Tem o mesmo formato de um JWT de usuário -- `Authorization: Bearer <jwt>`. |
| **Token de atualização** | Uma string opaca de longa duração (≈ 90 dias) que o cliente usa para gerar novos tokens de acesso. |
| **Escopo** | Restringe o que o token de acesso pode fazer -- veja o [catálogo de escopos](./api-keys#scopes). |

## Fluxos de concessão

O B1 oferece suporte a três fluxos OAuth, todos definidos pela RFC 6749 + RFC 8628.

### Código de autorização (aplicativos web)

Use quando seu aplicativo tem um componente do lado do servidor e pode manter o `client_secret` privado.

1. **Autorizar**

   ```http
   POST /membership/oauth/authorize
   Authorization: Bearer <user JWT>
   Content-Type: application/json

   { "client_id": "...", "redirect_uri": "https://app.example.com/cb",
     "response_type": "code", "scope": "people:read groups:read", "state": "xyz" }
   ```

   Clientes públicos (sem `client_secret`) também devem enviar `"code_challenge": "..."` e `"code_challenge_method": "S256"` (PKCE, RFC 7636). Apenas `S256` é aceito.

   Retorna `{ "code": "...", "state": "xyz" }`. O endpoint de código de autorização é intencionalmente um POST autenticado -- seu aplicativo obtém o JWT do B1 do usuário (normalmente hospedando um botão na sessão do usuário no B1) e o encaminha como parte da etapa de consentimento.

2. **Trocar o código por tokens**

   ```http
   POST /membership/oauth/token
   Content-Type: application/json

   { "grant_type": "authorization_code", "code": "...",
     "client_id": "...", "client_secret": "...", "redirect_uri": "..." }
   ```

   Se a etapa de autorização enviou um `code_challenge`, inclua o `"code_verifier": "..."` correspondente. Um cliente público envia o verificador e omite o `client_secret`. O endpoint de token aceita corpos em JSON ou codificados como formulário (`application/x-www-form-urlencoded`).

   Retorna a resposta com os tokens:

   ```json
   {
     "access_token": "eyJ...",
     "token_type": "Bearer",
     "expires_in": 604800,
     "created_at": 1715000000,
     "refresh_token": "abc123…",
     "scope": "people:read groups:read"
   }
   ```

3. **Atualizar** quando o token de acesso estiver prestes a expirar:

   ```http
   POST /membership/oauth/token
   Content-Type: application/json

   { "grant_type": "refresh_token", "refresh_token": "...",
     "client_id": "...", "client_secret": "..." }
   ```

   O token de atualização expira após 90 dias sem uso; se estiver expirado, o administrador da igreja precisa autorizar novamente.

### Código de dispositivo (TVs, quiosques, CLI)

Use quando o dispositivo não tem navegador. Definido pela RFC 8628.

1. **Solicitar um código de dispositivo**

   ```http
   POST /membership/oauth/device/authorize
   Content-Type: application/json

   { "client_id": "...", "scope": "content:read" }
   ```

   Retorna o código exibido ao usuário e o intervalo de consulta:

   ```json
   { "device_code": "...", "user_code": "WXYZ-1234",
     "verification_uri": "https://app.b1.church/device",
     "expires_in": 900, "interval": 5 }
   ```

2. Exiba o `user_code` e o `verification_uri` para o usuário.

3. **Consulte** `/membership/oauth/token` com `grant_type=urn:ietf:params:oauth:grant-type:device_code` e o `device_code`. Respostas padrão:

   | Erro | Significado |
   |---|---|
   | `authorization_pending` | O usuário ainda não aprovou -- continue consultando no intervalo sugerido |
   | `expired_token` | O código do dispositivo passou de `expires_in` -- recomece |
   | `access_denied` | O usuário negou a solicitação |
   | _(nenhum -- 200 OK)_ | Aprovado -- o corpo é um `B1TokenResponse` |

4. Após a aprovação, armazene o `refresh_token` e use o `access_token` até ele expirar.

O SDK do B1 inclui `B1OAuthClient.awaitDeviceToken(...)`, que executa o laço de consultas por você, com um backoff sensato e compatível com a RFC.

### Token de atualização

Sempre disponível como uma requisição independente, assim que você tiver um `refresh_token`:

```http
POST /membership/oauth/token
{ "grant_type": "refresh_token", "refresh_token": "...", "client_id": "..." }
```

Um novo `access_token` e um novo `refresh_token` são devolvidos. **Clientes públicos** (sem `client_secret`) podem omitir o `client_secret` na atualização -- útil para aplicativos OAuth de celular ou desktop que não conseguem manter um segredo.

Os tokens de atualização são rotacionados, mas o antigo não é descartado imediatamente. Se um cliente nunca receber a resposta da atualização (por exemplo, uma TV que perdeu energia ou Wi-Fi no meio da requisição), ele pode tentar novamente com o `refresh_token` anterior por até **7 dias**. A nova tentativa só tem sucesso enquanto o token substituto ainda não tiver sido usado; o substituto não utilizado é então descartado e um novo par é emitido. Depois que o substituto for atualizado, o token antigo retorna `invalid_grant`. Revogar uma conexão também revoga os tokens rotacionados que ainda estejam dentro dessa janela de carência, e a lista de aplicativos conectados mostra cada conexão uma única vez.

## Forma do token

Um token de acesso é um JWT emitido pelo B1, idêntico ao que um usuário obtém em `POST /membership/users/login` -- a mesma claim de permissões modular, o mesmo comportamento de `checkAccess` em todos os controladores --, **exceto** que o array de permissões foi filtrado pelos escopos concedidos no momento da emissão. Um token de acesso com escopo não pode fazer nada que uma chave de API com escopo semelhante também não possa, e não existe um "caminho OAuth" separado em nenhum controlador: o `actionWrapper` não sabe se o portador é uma pessoa, uma chave de API ou um cliente OAuth.

## Aplicativos conectados (para o usuário)

Do ponto de vista de um administrador da igreja, "Aplicativos conectados" é a lista de aplicativos que receberam acesso à sua igreja. Cada linha é um par `(OAuthClient, OAuthToken)` ativo.

No B1Admin: **Configurações → Desenvolvedor → Aplicativos conectados** mostra:

- O nome do cliente
- Os escopos que o administrador aprovou
- A data em que o acesso foi concedido
- Um botão **Revogar**

| Método e caminho | Autenticação | Finalidade |
|---|---|---|
| `GET /membership/oauth/connections` | JWT | Lista as conexões ativas do próprio chamador (com o nome do cliente e os escopos) |
| `DELETE /membership/oauth/connections/:id` | JWT | Revoga uma conexão pelo id do token OAuth -- o token deixa de funcionar na próxima requisição |

A lista exclui automaticamente os tokens expirados.

## Escopos e consentimento

As strings de escopo são o mesmo catálogo das [chaves de API](./api-keys#scopes). Boas práticas para os clientes:

- **Solicite os escopos mais restritos que funcionem.** As igrejas percebem quando você pede `donations:write` mas só precisa ler pessoas.
- **Use um token de atualização junto com tokens de acesso de curta duração.** Tokens de acesso de longa duração são mais difíceis de revogar rapidamente.
- **Sempre apresente os escopos concedidos ao usuário** na sua própria interface, para que ele possa verificar o que consentiu.

## Gerenciamento de clientes OAuth

Os clientes OAuth (os próprios aplicativos de terceiros) são registrados globalmente. Um cliente confidencial com `client_secret` é criado por um administrador do servidor do B1 -- para publicar um, entre em contato com a equipe da ChurchApps para obter um par `client_id` / `client_secret` e registrar suas URIs de redirecionamento. Clientes públicos, como conectores MCP, podem se registrar sozinhos (veja abaixo).

As URIs de redirecionamento registradas devem corresponder exatamente ao `redirect_uri` da requisição; correspondência por prefixo ou parcial é rejeitada.

| Método e caminho | Permissão | Descrição |
|---|---|---|
| `GET /membership/oauth/clients` | Server.Admin | Lista todos os clientes OAuth |
| `GET /membership/oauth/clients/clientId/:clientId` | -- | Obtém um cliente pelo seu id público (segredo ocultado) |
| `POST /membership/oauth/clients` | Server.Admin | Cria ou atualiza um cliente |
| `DELETE /membership/oauth/clients/:id` | Server.Admin | Exclui um cliente |

### Registro dinâmico de clientes {#dynamic-client-registration}

`POST /membership/oauth/register` (público, RFC 7591) permite que um cliente, como o conector MCP do claude.ai, se registre sozinho. Ele é anunciado pelo documento `/.well-known/oauth-authorization-server` da API -- veja [Servidor MCP → Descoberta OAuth](./mcp#oauth-discovery).

```http
POST /membership/oauth/register
Content-Type: application/json

{ "client_name": "My AI assistant", "redirect_uris": ["https://assistant.example.com/oauth/callback"], "scope": "people:read" }
```

Retorna 201 com `client_id`, `client_id_issued_at`, `client_name`, `redirect_uris`, `grant_types` (`authorization_code`, `refresh_token`), `response_types` (`code`) e `token_endpoint_auth_method: "none"`.

- Nenhum segredo é emitido, portanto o cliente precisa usar PKCE em toda autorização.
- `redirect_uris` deve conter de 1 a 10 URLs `https`, ou `http` em `localhost`, `127.0.0.1` ou `[::1]`.
- `client_name` é cortado para 45 caracteres (padrão "AI assistant").
- Limitado a 20 registros por hora por IP.

Na página de consentimento do B1Admin, um cliente que se registrou sozinho recebe um aviso de que se registrou por conta própria, nunca pode fazer mais do que a conta B1 do próprio usuário e pode ser desconectado em **Configurações → Desenvolvedor → Aplicativos conectados**.

## Suporte a SDK

O pacote `@churchapps/integration-sdk` encapsula cada fluxo OAuth com funções auxiliares tipadas -- `B1OAuthClient.exchangeCode()`, `.refresh()`, `.startDeviceFlow()`, `.pollDeviceToken()`, `.awaitDeviceToken()`. Veja o README do pacote e [Webhooks](./webhooks#sdk-support) para um exemplo completo.
