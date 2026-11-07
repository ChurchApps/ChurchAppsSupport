---
title: "Autenticação e permissões"
description: "Referência do login JWT, da autenticação de dois fatores, dos fluxos OAuth 2.0 e do modelo de permissões da API ChurchApps para desenvolvedores."
---

# Autenticação e permissões

<div class="article-intro">

A API do ChurchApps usa autenticação baseada em JWT. Os usuários entram para receber um token que codifica sua identidade, sua participação na igreja e suas permissões. Esta página cobre o fluxo de autenticação, o modelo de permissões e o suporte a OAuth.

</div>

## Fluxo de login

### Login padrão

```
POST /membership/users/login
```

**Autenticação:** Pública

Aceita um de três tipos de credenciais:

| Campo | Descrição |
|-------|-----------|
| `email` + `password` | Login padrão com e-mail e senha |
| `jwt` | Reautenticação com um JWT existente |
| `authGuid` | Link de autenticação de uso único (usado nos e-mails de boas-vindas e redefinição) |

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

### Verificação em duas etapas {#two-factor-sign-in}

Os usuários podem ativar a verificação em duas etapas com aplicativo autenticador (TOTP). Para esses usuários, um login com `email` + `password`, `authGuid` ou SSO não retorna um token. Em vez disso, responde com um desafio:

```json
{ "mfaRequired": true, "mfaToken": "<challenge-token>" }
```

O token de desafio é válido por 5 minutos. Envie-o de volta para o mesmo endpoint com o código:

```json
{ "mfaToken": "<challenge-token>", "mfaCode": "123456" }
```

O `mfaCode` pode ser o código atual de 6 dígitos do aplicativo autenticador ou um dos dez códigos de backup de uso único do usuário. Um código incorreto retorna `Invalid code`, e falhas repetidas são limitadas por taxa, por conta. Um novo login com `jwt` nunca é desafiado, então as sessões existentes continuam sendo renovadas. O objeto `user` da resposta de login traz `mfaEnabled`.

Endpoints de autoatendimento (somente para o usuário conectado, em `/membership/users/mfa`):

| Endpoint | Descrição |
|----------|-----------|
| `GET /status` | `{ enabled, backupCodesLeft }` |
| `POST /setup` | Inicia a configuração; retorna `{ secret, otpauthUrl }` para o QR code |
| `POST /enable` | Corpo `{ code }`; ativa e retorna `{ backupCodes }` uma única vez |
| `POST /disable` | Corpo `{ code }` (código do autenticador ou de backup); desativa |
| `POST /reset/:userId` | Somente Server.Admin; desativa para outro usuário |

Os segredos são armazenados criptografados e os códigos de backup são armazenados como hashes. Ativar, desativar e redefinir são registrados no log de auditoria.

### Conteúdo do token

O JWT codifica:
- `id` — ID do usuário
- `churchId` — Igreja atualmente selecionada
- `personId` — Registro de pessoa para a igreja selecionada
- Arrays de permissões por API

### Seleção de igreja

Os usuários podem pertencer a várias igrejas. A resposta de login inclui todas as igrejas com suas permissões. Para trocar de igreja, o cliente gera um novo JWT com escopo para outra igreja, a partir dos dados da resposta de login.

## Registro de usuários

### Registrar um novo usuário

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

São aceitos dois campos opcionais de armadilha para bots: `website` (um campo oculto de honeypot que usuários reais deixam vazio) e `fillMs` (quanto tempo o formulário ficou aberto, em milissegundos). Se `website` estiver preenchido ou `fillMs` for menor que 2000, nenhuma conta é criada, mas o endpoint ainda retorna um `200` com aparência normal, para que bots não consigam perceber que foram rejeitados. Clientes que omitem ambos os campos se registram normalmente.

### Registrar uma nova igreja

```
POST /membership/churches/add
```

**Autenticação:** JWT

Depois de registrar um usuário, chame este endpoint para criar uma igreja e associar o usuário a ela.

## Gerenciamento de senhas

| Método | Caminho | Autenticação | Descrição |
|--------|---------|--------------|-----------|
| POST | `/membership/users/forgot` | Pública | Envia um e-mail de redefinição de senha. Corpo: `{ "userEmail": "...", "appName": "...", "appUrl": "..." }` |
| POST | `/membership/users/setPasswordGuid` | Pública | Define uma nova senha usando um GUID de autenticação do e-mail de redefinição. Corpo: `{ "authGuid": "...", "newPassword": "..." }` |
| POST | `/membership/users/updatePassword` | JWT | Altera a senha do usuário atual. Corpo: `{ "newPassword": "..." }` |

## Modelo de permissões

As permissões são organizadas por módulo e atribuídas aos usuários por meio de funções. Cada permissão tem um **tipo de conteúdo** e uma **ação**.

### Referência de permissões

| Seção de exibição | Tipo de conteúdo | Ação | Descrição |
|-------------------|------------------|------|-----------|
| **Presença** | Attendance | Checkin | Fazer check-in de membros nos cultos |
| | Attendance | Edit | Editar registros de presença |
| | Services | Edit | Gerenciar cultos e horários de culto |
| | Attendance | View | Ver registros de presença |
| | Attendance | View Summary | Ver resumos e relatórios de presença |
| **Doações** | Donations | Edit | Criar e editar registros de doações |
| | Settings | Edit | Editar configurações de doações/pagamentos |
| | Donations | View Summary | Ver relatórios de resumo de doações |
| | Donations | View | Ver registros individuais de doações |
| **Pessoas e grupos** | Forms | Admin | Administração completa de formulários |
| | Forms | Edit | Editar definições de formulários |
| | Plans | Edit | Editar planos de culto |
| | Group Members | Edit | Adicionar/remover membros de grupos |
| | Groups | Edit | Criar e editar grupos |
| | Households | Edit | Editar vínculos de domicílio |
| | People | Edit | Editar qualquer registro de pessoa |
| | People | Edit Self | Editar somente o próprio registro de pessoa |
| | Roles | Edit | Gerenciar funções e atribuições de usuários |
| | Group Members | View | Ver listas de membros de grupos |
| | People | View Members | Ver somente membros (não visitantes) |
| | People | View | Ver todas as pessoas |
| | Roles | View | Ver funções e atribuições |
| | Settings | Edit | Editar configurações da igreja |
| **Conteúdo** | Content | Edit | Editar páginas, seções, elementos |
| | Settings | Edit | Editar configurações de conteúdo |
| | StreamingServices | Edit | Gerenciar a configuração de serviços de transmissão |
| | Chat | Host | Hospedar/moderar sessões de chat |
| **Mensagens** | Texting | Send | Enviar mensagens de texto SMS |

### Como as permissões são verificadas

Nos controllers, as permissões são verificadas com o método `au.checkAccess()`:

```typescript
// Exigir permissão específica
if (!au.checkAccess(Permissions.people.edit)) return this.json({}, 401);

// Ou dentro de actionWrapper — o sistema CRUD verifica automaticamente
crudSettings: {
  permissions: {
    view: Permissions.people.view,
    edit: Permissions.people.edit
  }
}
```

### Administrador do servidor

A permissão `Server.Admin` concede acesso total a todas as igrejas. Ela é atribuída ao primeiro usuário registrado e pode ser concedida a outros pela função de administrador do servidor.

## OAuth 2.0

A API oferece suporte a OAuth 2.0 para integrações de terceiros. Há dois tipos de concessão disponíveis.

### Fluxo de código de autorização

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

### Fluxo de código de dispositivo (RFC 8628)

Para dispositivos sem navegador (apps de TV, quiosques):

1. **Solicitar código do dispositivo:** `POST /membership/oauth/device/authorize` (Pública)
   - Corpo: `{ "client_id": "...", "scope": "..." }`
   - Retorna: `{ "device_code": "...", "user_code": "ABCD-1234", "verification_uri": "https://app.b1.church/device", "expires_in": 900, "interval": 5 }`

2. **O usuário informa o código** no URI de verificação e aprova ou nega

3. **Consultar o token:** `POST /membership/oauth/token` (Pública)
   - Corpo: `{ "grant_type": "urn:ietf:params:oauth:grant-type:device_code", "device_code": "...", "client_id": "..." }`
   - Retorna `authorization_pending` até a aprovação, e depois retorna o token de acesso

### Gerenciamento de clientes OAuth

| Método | Caminho | Autenticação | Permissão | Descrição |
|--------|---------|--------------|-----------|-----------|
| GET | `/membership/oauth/clients` | JWT | Server.Admin | Lista todos os clientes OAuth |
| GET | `/membership/oauth/clients/:id` | JWT | Server.Admin | Obtém um cliente pelo ID |
| GET | `/membership/oauth/clients/clientId/:clientId` | JWT | — | Obtém um cliente pelo client ID (segredo ocultado) |
| POST | `/membership/oauth/clients` | JWT | Server.Admin | Cria ou atualiza um cliente |
| DELETE | `/membership/oauth/clients/:id` | JWT | Server.Admin | Exclui um cliente |
| POST | `/membership/oauth/register` | Pública | — | Registro dinâmico de cliente (RFC 7591) para clientes públicos, como conectores MCP. Veja [Aplicativos conectados](../connected-apps.md#dynamic-client-registration) |

### Endpoints de aprovação de dispositivos

| Método | Caminho | Autenticação | Descrição |
|--------|---------|--------------|-----------|
| GET | `/membership/oauth/device/pending/:userCode` | JWT | Obtém as informações do código de dispositivo pendente para a interface de aprovação |
| POST | `/membership/oauth/device/approve` | JWT | Aprova uma autorização de dispositivo. Corpo: `{ "user_code": "...", "church_id": "..." }` |
| POST | `/membership/oauth/device/deny` | JWT | Nega uma autorização de dispositivo. Corpo: `{ "user_code": "..." }` |

## Endpoints públicos e autenticados

A API usa dois wrappers de função que determinam os requisitos de autenticação:

- **`actionWrapper`** — Exige um JWT válido. O objeto do usuário autenticado (`au`) fica disponível com `churchId`, `userId` e verificações de permissão.
- **`actionWrapperAnon`** — Não exige autenticação. Usado para login, registro, consultas públicas de conteúdo e receptores de webhook.

Nas tabelas de endpoints ao longo desta documentação, eles são indicados como **JWT** e **Pública**, respectivamente, na coluna Autenticação.

## Páginas relacionadas

- [Estrutura do módulo](../module-structure.md) — Como controllers, repositórios e modelos são organizados
- [Configuração local](../local-setup.md) — Como executar a API localmente para desenvolvimento
