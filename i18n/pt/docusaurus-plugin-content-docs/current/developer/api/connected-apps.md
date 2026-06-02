---
title: "Aplicativos Conectados & OAuth"
---

# Aplicativos Conectados & OAuth

<div class="article-intro">

A API B1 suporta OAuth 2.0 para que uma aplicação de terceiros possa pedir a cada administrador de igreja por permissão para acessar seus dados -- sem a igreja nunca compartilhando uma senha ou chave de API. Um **Aplicativo Conectado** é um token OAuth que um administrador de igreja aprovou; revogá-lo corta o acesso do aplicativo de terceiros em um clique. Use esse caminho para conectores SaaS multi-locatários. Para uma integração de uma única igreja prefira [Chaves de API](./api-keys).

</div>

<div class="prereqs">
<h4>Antes de Começar</h4>

- Um **cliente** OAuth deve ser registrado (atualmente por um administrador de servidor B1) antes que as igrejas possam conceder acesso
- Todos os endpoints OAuth vivem sob o módulo de Membership: `/membership/oauth/...`
- Tokens de acesso são JWTs -- eles carregam as permissões do usuário filtradas pelos escopos concedidos

</div>

## Conceitos

| Termo | Significado |
|---|---|
| **Cliente OAuth** | O aplicativo de terceiros em si -- identificado por `client_id`, seguro por `client_secret`. Registrado uma vez com B1, compartilhado entre todas as igrejas que o instalam. |
| **Aplicativo Conectado** | Um par específico `(client, church-admin)` onde o administrador concedeu ao cliente acesso. Cada Aplicativo Conectado é apoiado por um token de atualização OAuth. |
| **Token de acesso** | Um JWT de curta vida (≈ 7 dias) que o cliente usa para chamadas de API. Mesma forma que um JWT de usuário -- `Authorization: Bearer <jwt>`. |
| **Token de atualização** | Uma string opaca de longa vida (≈ 90 dias) que o cliente usa para cunhar novos tokens de acesso. |
| **Escopo** | Estreita o que o token de acesso pode fazer -- veja o [catálogo de escopos](./api-keys#scopes). |

## Fluxos de Concessão

B1 suporta três fluxos OAuth, todos definidos por RFC 6749 + RFC 8628.

### Código de Autorização (web apps)

Use quando sua aplicação tem um componente do lado do servidor e pode manter `client_secret` privado.

1. **Autorizar**

   ```http
   POST /membership/oauth/authorize
   Authorization: Bearer <user JWT>
   Content-Type: application/json

   { "client_id": "...", "redirect_uri": "https://app.example.com/cb",
     "response_type": "code", "scope": "people:read groups:read", "state": "xyz" }
   ```

   Retorna `{ "code": "...", "state": "xyz" }`. O endpoint de código de autorização é intencionalmente um POST autenticado -- sua aplicação coleta o JWT B1 do usuário (tipicamente hospedando um botão na sessão B1 do usuário) e o encaminha como parte da etapa de consentimento.

2. **Trocar código por tokens**

   ```http
   POST /membership/oauth/token
   Content-Type: application/json

   { "grant_type": "authorization_code", "code": "...",
     "client_id": "...", "client_secret": "...", "redirect_uri": "..." }
   ```

   Retorna a resposta de token:

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

3. **Atualizar** quando o token de acesso está prestes a expirar:

   ```http
   POST /membership/oauth/token
   Content-Type: application/json

   { "grant_type": "refresh_token", "refresh_token": "...",
     "client_id": "...", "client_secret": "..." }
   ```

   O token de atualização expira após 90 dias de desuso; se expirou o administrador da igreja re-autoriza.

### Código de Dispositivo (TVs, quiosques, CLI)

Use quando o dispositivo não tem navegador. Definido por RFC 8628.

1. **Solicite um código de dispositivo**

   ```http
   POST /membership/oauth/device/authorize
   Content-Type: application/json

   { "client_id": "...", "scope": "content:read" }
   ```

   Retorna o código voltado para o usuário e o intervalo de polling:

   ```json
   { "device_code": "...", "user_code": "WXYZ-1234",
     "verification_uri": "https://app.b1.church/device",
     "expires_in": 900, "interval": 5 }
   ```

2. Exiba `user_code` + `verification_uri` para o usuário.

3. **Pesquise** `/membership/oauth/token` com `grant_type=urn:ietf:params:oauth:grant-type:device_code` e o `device_code`. Respostas padrão:

   | Erro | Significado |
   |---|---|
   | `authorization_pending` | Usuário ainda não aprovou -- continue pesquisando no intervalo sugerido |
   | `expired_token` | Código de dispositivo passou `expires_in` -- comece do zero |
   | `access_denied` | Usuário negou a solicitação |
   | _(nenhum -- 200 OK)_ | Aprovado -- o corpo é uma `B1TokenResponse` |

4. Uma vez aprovado, armazene o `refresh_token` e use o `access_token` até expirar.

O SDK B1 inclui `B1OAuthClient.awaitDeviceToken(...)` que executa o loop de polling para você com backoff conforme RFC-compatível.

### Token de Atualização

Sempre disponível como uma solicitação independente uma vez que você tenha um `refresh_token`:

```http
POST /membership/oauth/token
{ "grant_type": "refresh_token", "refresh_token": "...", "client_id": "..." }
```

Um novo `access_token` e `refresh_token` voltam. **Clientes públicos** (sem `client_secret`) podem omitir `client_secret` na atualização -- útil para apps OAuth de mobile/desktop que não podem manter um segredo.

## Forma de Token

Um token de acesso é um JWT emitido por B1 idêntico a um que um usuário obteria de `POST /membership/users/login` -- mesma reivindicação de permissão modular, mesmo comportamento `checkAccess` em cada controlador -- **exceto** o array de permissões foi filtrado através dos escopos concedidos no tempo de cunhagem. Um token de acesso com escopo não pode fazer nada que um token de API similarmente-escopo não possa, e não há caminho "OAuth" separado em nenhum controlador; `actionWrapper` é inconsciente se o portador é uma pessoa, uma chave de API, ou um cliente OAuth.

## Aplicativos Conectados (Voltados para o Usuário)

Do ponto de vista de um administrador de igreja, "Aplicativos Conectados" é a lista de aplicações que foram concedidas acesso à sua igreja. Cada linha é um par `(OAuthClient, OAuthToken)` ao vivo.

Em B1Admin: **Configurações → Desenvolvedor → Aplicativos Conectados** mostra:

- O nome do cliente
- Os escopos que o administrador aprovou
- A data em que o acesso foi concedido
- Um botão **Revogar**

| Método & Caminho | Auth | Propósito |
|---|---|---|
| `GET /membership/oauth/connections` | JWT | Liste as conexões ativas do chamador (unidas com nome do cliente + escopos) |
| `DELETE /membership/oauth/connections/:id` | JWT | Revogue uma conexão por seu ID de token OAuth -- o token para de funcionar na próxima solicitação |

A lista exclui tokens expirados automaticamente.

## Escopos & Consentimento

As strings de escopo são o mesmo catálogo que [chaves de API](./api-keys#scopes). Melhores práticas para clientes:

- **Solicite os escopos mais estreitos que funcionam.** Igrejas notam se você pede `donations:write` quando você apenas precisa ler pessoas.
- **Use um token de atualização mais tokens de acesso de curta vida.** Tokens de acesso de longa vida são mais difíceis de revogar rapidamente.
- **Sempre apresente os escopos concedidos de volta ao usuário** na sua própria UI para que eles possam verificar o que consentiram.

## Gerenciamento de Cliente OAuth

Clientes OAuth (os aplicativos de terceiros em si) são atualmente registrados globalmente por um administrador de servidor B1. Auto-registro por-igreja está no roteiro -- até lá, para enviar um conector público você contata a equipe ChurchApps para cunhar um par `client_id` / `client_secret` e registrar seus URIs de redirecionamento.

| Método & Caminho | Permissão | Descrição |
|---|---|---|
| `GET /membership/oauth/clients` | Server.Admin | Liste todos os clientes OAuth |
| `GET /membership/oauth/clients/clientId/:clientId` | — | Obtenha um cliente por seu id público (segredo redigido) |
| `POST /membership/oauth/clients` | Server.Admin | Crie ou atualize um cliente |
| `DELETE /membership/oauth/clients/:id` | Server.Admin | Delete um cliente |

## Suporte a SDK

O pacote `@churchapps/integration-sdk` envolve cada fluxo OAuth com auxiliares digitados -- `B1OAuthClient.exchangeCode()`, `.refresh()`, `.startDeviceFlow()`, `.pollDeviceToken()`, `.awaitDeviceToken()`. Veja o README do pacote e [Webhooks](./webhooks#sdk-support) para um exemplo de ponta a ponta.
