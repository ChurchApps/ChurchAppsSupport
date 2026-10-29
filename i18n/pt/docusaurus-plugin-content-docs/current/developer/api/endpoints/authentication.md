---
title: "Autenticação e Permissões"
---

# Autenticação e Permissões

<div class="article-intro">

A API do ChurchApps usa autenticação baseada em JWT. Os usuários fazem login para receber um token que codifica sua identidade, sua vinculação à igreja e suas permissões. Esta página cobre o fluxo de autenticação, o modelo de permissões e o suporte a OAuth.

</div>

## Fluxo de Login

### Login Padrão

```
POST /membership/users/login
```

**Autenticação:** Pública

Aceita um de três tipos de credencial:

| Campo | Descrição |
|-------|-----------|
| `email` + `password` | Login padrão com e-mail e senha |
| `jwt` | Reautentica com um JWT existente |
| `authGuid` | Link de autenticação de uso único (usado nos e-mails de boas-vindas e de redefinição) |

**Resposta:**

```json
{
  "user": {
    "id": "abc-123",
    "firstName": "Jane",
    "lastName": "Doe",
    "email": "jane@example.com"
  },
  "churches": [
    {
      "church": { "id": "church-1", "name": "First Church", "subDomain": "firstchurch" },
      "person": { "id": "person-1", "membershipStatus": "Member" },
      "groups": [{ "id": "group-1", "name": "Choir", "leader": false }],
      "apis": [
        {
          "keyName": "MembershipApi",
          "permissions": [
            { "contentType": "People", "action": "View" },
            { "contentType": "People", "action": "Edit" }
          ]
        }
      ]
    }
  ],
  "token": "<jwt-token>"
}
```

O campo `token` é um JWT que deve ser enviado como `Authorization: Bearer <token>` nas requisições seguintes.

### Verificação em Duas Etapas

Os usuários podem ativar a verificação em duas etapas por aplicativo autenticador (TOTP). Para esses usuários, um login com `email` + `password`, `authGuid` ou SSO não retorna um token. Em vez disso, retorna um desafio:

```json
{ "mfaRequired": true, "mfaToken": "<challenge-token>" }
```

O token de desafio é válido por 5 minutos. Envie-o de volta para o mesmo endpoint junto com o código:

```json
{ "mfaToken": "<challenge-token>", "mfaCode": "123456" }
```

O `mfaCode` pode ser o código atual de 6 dígitos do aplicativo autenticador ou um dos dez códigos de backup de uso único do usuário. Um código incorreto retorna `Invalid code`, e falhas repetidas são limitadas por taxa, por conta. Um novo login com `jwt` nunca é desafiado, então as sessões existentes continuam sendo renovadas. O objeto `user` da resposta de login contém `mfaEnabled`.

Endpoints de autoatendimento (somente para o usuário autenticado, em `/membership/users/mfa`):

| Endpoint | Descrição |
|----------|-----------|
| `GET /status` | `{ enabled, backupCodesLeft }` |
| `POST /setup` | Inicia a configuração; retorna `{ secret, otpauthUrl }` para o QR code |
| `POST /enable` | Corpo `{ code }`; ativa a verificação e retorna `{ backupCodes }` apenas uma vez |
| `POST /disable` | Corpo `{ code }` (código do autenticador ou de backup); desativa a verificação |
| `POST /reset/:userId` | Somente Server.Admin; desativa a verificação para outro usuário |

Os segredos são armazenados criptografados e os códigos de backup são armazenados como hashes. Ativar, desativar e redefinir são registrados no log de auditoria.

### Conteúdo do Token

O JWT codifica:
- `id` — ID do usuário
- `churchId` — Igreja atualmente selecionada
- `personId` — Registro da pessoa na igreja selecionada
- Arrays de permissões por API

### Seleção de Igreja

Os usuários podem pertencer a várias igrejas. A resposta de login inclui todas as igrejas com suas respectivas permissões. Para trocar de igreja, o cliente gera um novo JWT com escopo em outra igreja, a partir dos dados da resposta de login.

## Registro de Usuário

### Registrar um Novo Usuário

```
POST /membership/users/register
```

**Autenticação:** Pública

```json
{
  "email": "jane@example.com",
  "firstName": "Jane",
  "lastName": "Doe",
  "appName": "B1 Admin",
  "appUrl": "https://app.b1.church"
}
```

Cria um usuário com uma senha temporária e envia um e-mail de boas-vindas com um link de autenticação. O primeiro usuário registrado em uma nova instância recebe automaticamente acesso de administrador do servidor.

São aceitos dois campos opcionais de armadilha para bots: `website` (um campo oculto de honeypot que usuários reais deixam vazio) e `fillMs` (tempo, em milissegundos, em que o formulário ficou aberto). Se `website` estiver preenchido ou `fillMs` for menor que 2000, nenhuma conta é criada, mas o endpoint ainda retorna um `200` com aparência normal, para que os bots não percebam que foram rejeitados. Clientes que omitem os dois campos se registram normalmente.

### Registrar uma Nova Igreja

```
POST /membership/churches/add
```

**Autenticação:** JWT

Depois de registrar um usuário, chame este endpoint para criar uma igreja e associar o usuário a ela.

## Gerenciamento de Senha

| Método | Caminho | Autenticação | Descrição |
|--------|---------|--------------|-----------|
| POST | `/membership/users/forgot` | Pública | Envia um e-mail de redefinição de senha. Corpo: `{ "userEmail": "...", "appName": "...", "appUrl": "..." }` |
| POST | `/membership/users/setPasswordGuid` | Pública | Define uma nova senha usando um GUID de autenticação do e-mail de redefinição. Corpo: `{ "authGuid": "...", "newPassword": "..." }` |
| POST | `/membership/users/updatePassword` | JWT | Altera a senha do usuário atual. Corpo: `{ "newPassword": "..." }` |

## Modelo de Permissões

As permissões são organizadas por módulo e atribuídas aos usuários por meio de funções. Cada permissão tem um **tipo de conteúdo** e uma **ação**.

### Referência de Permissões

| Seção de Exibição | Tipo de Conteúdo | Ação | Descrição |
|-------------------|------------------|------|-----------|
| **Presença** | Attendance | Checkin | Faz o check-in de membros nos cultos |
| | Attendance | Edit | Edita registros de presença |
| | Services | Edit | Gerencia cultos e horários de culto |
| | Attendance | View | Visualiza registros de presença |
| | Attendance | View Summary | Visualiza resumos e relatórios de presença |
| **Doações** | Donations | Edit | Cria e edita registros de doações |
| | Settings | Edit | Edita as configurações de doações/pagamento |
| | Donations | View Summary | Visualiza relatórios de resumo de doações |
| | Donations | View | Visualiza registros individuais de doações |
| **Pessoas e Grupos** | Forms | Admin | Administração completa de formulários |
| | Forms | Edit | Edita definições de formulários |
| | Plans | Edit | Edita planos de culto |
| | Group Members | Edit | Adiciona/remove membros de grupos |
| | Groups | Edit | Cria e edita grupos |
| | Households | Edit | Edita a vinculação de domicílios |
| | People | Edit | Edita qualquer registro de pessoa |
| | People | Edit Self | Edita apenas o próprio registro de pessoa |
| | Roles | Edit | Gerencia funções e atribuições de usuários |
| | Group Members | View | Visualiza listas de membros de grupos |
| | People | View Members | Visualiza apenas membros (não visitantes) |
| | People | View | Visualiza todas as pessoas |
| | Roles | View | Visualiza funções e atribuições |
| | Settings | Edit | Edita as configurações da igreja |
| **Conteúdo** | Content | Edit | Edita páginas, seções e elementos |
| | Settings | Edit | Edita as configurações de conteúdo |
| | StreamingServices | Edit | Gerencia a configuração de serviços de transmissão |
| | Chat | Host | Hospeda/modera sessões de chat |
| **Mensagens** | Texting | Send | Envia mensagens de texto SMS |

### Como as Permissões São Verificadas

Nos controllers, as permissões são verificadas com o método `au.checkAccess()`:

```typescript
// Exige uma permissão específica
if (!au.checkAccess(Permissions.people.edit)) return this.json({}, 401);

// Ou dentro do actionWrapper — o sistema CRUD verifica automaticamente
crudSettings: {
  permissions: {
    view: Permissions.people.view,
    edit: Permissions.people.edit
  }
}
```

### Administrador do Servidor

A permissão `Server.Admin` concede acesso total a todas as igrejas. Ela é atribuída ao primeiro usuário registrado e pode ser concedida a outros pela função de administrador do servidor.

## OAuth 2.0

A API oferece suporte a OAuth 2.0 para integrações de terceiros. Dois tipos de concessão estão disponíveis.

### Fluxo de Código de Autorização

1. **Autorizar:** `POST /membership/oauth/authorize` (requer JWT)
   - Corpo: `{ "client_id": "...", "redirect_uri": "...", "response_type": "code", "scope": "...", "state": "...", "code_challenge": "...", "code_challenge_method": "S256" }`
   - `code_challenge` / `code_challenge_method` (PKCE, somente `S256`) são obrigatórios para clientes públicos sem segredo
   - Retorna: `{ "code": "...", "state": "..." }`

2. **Trocar o código por um token:** `POST /membership/oauth/token` (Pública)
   - Corpo: `{ "grant_type": "authorization_code", "code": "...", "client_id": "...", "client_secret": "...", "redirect_uri": "...", "code_verifier": "..." }`
   - Envie `code_verifier` quando a etapa de autorização usou um `code_challenge`; clientes públicos omitem `client_secret`. Corpos em JSON ou codificados em formulário são aceitos
   - Retorna: `{ "access_token": "...", "token_type": "Bearer", "expires_in": 43200, "refresh_token": "...", "scope": "..." }`

3. **Renovar o token:** `POST /membership/oauth/token` (Pública)
   - Corpo: `{ "grant_type": "refresh_token", "refresh_token": "...", "client_id": "...", "client_secret": "..." }`

Os tokens de acesso expiram após **12 horas**.

### Fluxo de Código de Dispositivo (RFC 8628)

Para dispositivos sem navegador (aplicativos de TV, quiosques):

1. **Solicitar código de dispositivo:** `POST /membership/oauth/device/authorize` (Pública)
   - Corpo: `{ "client_id": "...", "scope": "..." }`
   - Retorna: `{ "device_code": "...", "user_code": "ABCD-1234", "verification_uri": "https://app.b1.church/device", "expires_in": 900, "interval": 5 }`

2. **O usuário digita o código** na URI de verificação e aprova ou nega

3. **Consultar o token:** `POST /membership/oauth/token` (Pública)
   - Corpo: `{ "grant_type": "urn:ietf:params:oauth:grant-type:device_code", "device_code": "...", "client_id": "..." }`
   - Retorna `authorization_pending` até a aprovação; depois disso, retorna o token de acesso

### Gerenciamento de Clientes OAuth

| Método | Caminho | Autenticação | Permissão | Descrição |
|--------|---------|--------------|-----------|-----------|
| GET | `/membership/oauth/clients` | JWT | Server.Admin | Lista todos os clientes OAuth |
| GET | `/membership/oauth/clients/:id` | JWT | Server.Admin | Obtém um cliente pelo ID |
| GET | `/membership/oauth/clients/clientId/:clientId` | JWT | — | Obtém um cliente pelo client ID (segredo ocultado) |
| POST | `/membership/oauth/clients` | JWT | Server.Admin | Cria ou atualiza um cliente |
| DELETE | `/membership/oauth/clients/:id` | JWT | Server.Admin | Exclui um cliente |
| POST | `/membership/oauth/register` | Pública | — | Registro dinâmico de cliente (RFC 7591) para clientes públicos, como conectores MCP. Consulte [Aplicativos Conectados](../connected-apps#dynamic-client-registration) |

### Endpoints de Aprovação de Dispositivo

| Método | Caminho | Autenticação | Descrição |
|--------|---------|--------------|-----------|
| GET | `/membership/oauth/device/pending/:userCode` | JWT | Obtém as informações do código de dispositivo pendente para a interface de aprovação |
| POST | `/membership/oauth/device/approve` | JWT | Aprova uma autorização de dispositivo. Corpo: `{ "user_code": "...", "church_id": "..." }` |
| POST | `/membership/oauth/device/deny` | JWT | Nega uma autorização de dispositivo. Corpo: `{ "user_code": "..." }` |

## Endpoints Públicos e Autenticados

A API usa dois wrappers de função que determinam os requisitos de autenticação:

- **`actionWrapper`** — Exige um JWT válido. O objeto do usuário autenticado (`au`) fica disponível com `churchId`, `userId` e as verificações de permissão.
- **`actionWrapperAnon`** — Não exige autenticação. Usado para login, registro, consultas de conteúdo público e receptores de webhook.

Nas tabelas de endpoints desta documentação, esses wrappers são indicados como **JWT** e **Pública**, respectivamente, na coluna Autenticação.

## Páginas Relacionadas

- [Estrutura de Módulos](../module-structure) — Como controllers, repositórios e modelos são organizados
- [Configuração Local](../local-setup) — Como executar a API localmente para desenvolvimento
