---
title: "Autenticação e Permissões"
---

# Autenticação e Permissões

<div class="article-intro">

A API do ChurchApps usa autenticação baseada em JWT. Os usuários fazem login para receber um token que codifica sua identidade, a associação à igreja e as permissões. Esta página aborda o fluxo de autenticação, o modelo de permissões e o suporte a OAuth.

</div>

## Fluxo de Login

### Login Padrão

```
POST /membership/users/login
```

**Autenticação:** Pública

Aceita um de três tipos de credenciais:

| Campo | Descrição |
|-------|-----------|
| `email` + `password` | Login padrão com e-mail e senha |
| `jwt` | Reautenticar com um JWT existente |
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

### Conteúdo do Token

O JWT codifica:
- `id` — ID do usuário
- `churchId` — Igreja selecionada no momento
- `personId` — Registro de pessoa da igreja selecionada
- Arrays de permissões por API

### Seleção de Igreja

Os usuários podem pertencer a várias igrejas. A resposta do login inclui todas as igrejas com as respectivas permissões. Para trocar de igreja, o cliente gera um novo JWT com escopo em outra igreja, a partir dos dados de resposta do login.

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

Há dois campos opcionais de armadilha para bots: `website` (um campo honeypot oculto que usuários reais deixam vazio) e `fillMs` (por quanto tempo o formulário ficou aberto, em milissegundos). Se `website` for preenchido ou se `fillMs` for menor que 2000, nenhuma conta é criada, mas o endpoint ainda retorna uma resposta `200` com aparência normal, para que os bots não percebam que foram rejeitados. Clientes que omitem os dois campos se registram normalmente.

### Registrar uma Nova Igreja

```
POST /membership/churches/add
```

**Autenticação:** JWT

Depois de registrar um usuário, chame este endpoint para criar uma igreja e associar o usuário a ela.

## Gestão de Senhas

| Método | Caminho | Autenticação | Descrição |
|--------|---------|--------------|-----------|
| POST | `/membership/users/forgot` | Pública | Enviar um e-mail de redefinição de senha. Corpo: `{ "userEmail": "...", "appName": "...", "appUrl": "..." }` |
| POST | `/membership/users/setPasswordGuid` | Pública | Definir uma nova senha usando um GUID de autenticação do e-mail de redefinição. Corpo: `{ "authGuid": "...", "newPassword": "..." }` |
| POST | `/membership/users/updatePassword` | JWT | Alterar a senha do usuário atual. Corpo: `{ "newPassword": "..." }` |

## Modelo de Permissões

As permissões são organizadas por módulo e atribuídas aos usuários por meio de funções. Cada permissão tem um **tipo de conteúdo** e uma **ação**.

### Referência de Permissões

| Seção de Exibição | Tipo de Conteúdo | Ação | Descrição |
|-------------------|------------------|------|-----------|
| **Attendance** | Attendance | Checkin | Fazer check-in de membros nos serviços |
| | Attendance | Edit | Editar registros de frequência |
| | Services | Edit | Gerenciar serviços e horários de serviço |
| | Attendance | View | Visualizar registros de frequência |
| | Attendance | View Summary | Visualizar resumos e relatórios de frequência |
| **Donations** | Donations | Edit | Criar e editar registros de doações |
| | Settings | Edit | Editar configurações de contribuições/pagamentos |
| | Donations | View Summary | Visualizar relatórios de resumo de doações |
| | Donations | View | Visualizar registros individuais de doações |
| **People and Groups** | Forms | Admin | Administração completa de formulários |
| | Forms | Edit | Editar definições de formulários |
| | Plans | Edit | Editar planos de culto |
| | Group Members | Edit | Adicionar/remover membros de grupos |
| | Groups | Edit | Criar e editar grupos |
| | Households | Edit | Editar atribuições de família |
| | People | Edit | Editar qualquer registro de pessoa |
| | People | Edit Self | Editar somente o próprio registro de pessoa |
| | Roles | Edit | Gerenciar funções e atribuições de usuários |
| | Group Members | View | Visualizar listas de membros de grupos |
| | People | View Members | Visualizar somente membros (não visitantes) |
| | People | View | Visualizar todas as pessoas |
| | Roles | View | Visualizar funções e atribuições |
| | Settings | Edit | Editar configurações da igreja |
| **Content** | Content | Edit | Editar páginas, seções, elementos |
| | Settings | Edit | Editar configurações de conteúdo |
| | StreamingServices | Edit | Gerenciar a configuração de serviços de transmissão |
| | Chat | Host | Hospedar/moderar sessões de chat |
| **Messaging** | Texting | Send | Enviar mensagens de texto SMS |

### Como as Permissões São Verificadas

Nos controladores, as permissões são verificadas com o método `au.checkAccess()`:

```typescript
// Exigir uma permissão específica
if (!au.checkAccess(Permissions.people.edit)) return this.json({}, 401);

// Ou dentro de actionWrapper — o sistema CRUD verifica automaticamente
crudSettings: {
  permissions: {
    view: Permissions.people.view,
    edit: Permissions.people.edit
  }
}
```

### Administrador do Servidor

A permissão `Server.Admin` concede acesso completo a todas as igrejas. Ela é atribuída ao primeiro usuário registrado e pode ser concedida a outros pela função de administrador do servidor.

## OAuth 2.0

A API oferece suporte a OAuth 2.0 para integrações de terceiros. Há dois tipos de concessão disponíveis.

### Fluxo de Código de Autorização

1. **Autorizar:** `POST /membership/oauth/authorize` (requer JWT)
   - Corpo: `{ "client_id": "...", "redirect_uri": "...", "response_type": "code", "scope": "...", "state": "...", "code_challenge": "...", "code_challenge_method": "S256" }`
   - `code_challenge` / `code_challenge_method` (PKCE, somente `S256`) são obrigatórios para clientes públicos sem segredo
   - Retorna: `{ "code": "...", "state": "..." }`

2. **Trocar o código por um token:** `POST /membership/oauth/token` (Pública)
   - Corpo: `{ "grant_type": "authorization_code", "code": "...", "client_id": "...", "client_secret": "...", "redirect_uri": "...", "code_verifier": "..." }`
   - Envie `code_verifier` quando a etapa de autorização usou um `code_challenge`; clientes públicos omitem `client_secret`. São aceitos corpos em JSON ou codificados como formulário
   - Retorna: `{ "access_token": "...", "token_type": "Bearer", "expires_in": 43200, "refresh_token": "...", "scope": "..." }`

3. **Atualizar o token:** `POST /membership/oauth/token` (Pública)
   - Corpo: `{ "grant_type": "refresh_token", "refresh_token": "...", "client_id": "...", "client_secret": "..." }`

Os tokens de acesso expiram após **12 horas**.

### Fluxo de Código de Dispositivo (RFC 8628)

Para dispositivos sem navegador (apps de TV, quiosques):

1. **Solicitar código de dispositivo:** `POST /membership/oauth/device/authorize` (Pública)
   - Corpo: `{ "client_id": "...", "scope": "..." }`
   - Retorna: `{ "device_code": "...", "user_code": "ABCD-1234", "verification_uri": "https://app.b1.church/device", "expires_in": 900, "interval": 5 }`

2. **O usuário digita o código** no URI de verificação e aprova ou nega

3. **Consultar o token:** `POST /membership/oauth/token` (Pública)
   - Corpo: `{ "grant_type": "urn:ietf:params:oauth:grant-type:device_code", "device_code": "...", "client_id": "..." }`
   - Retorna `authorization_pending` até a aprovação; depois disso, retorna o token de acesso

### Gestão de Clientes OAuth

| Método | Caminho | Autenticação | Permissão | Descrição |
|--------|---------|--------------|-----------|-----------|
| GET | `/membership/oauth/clients` | JWT | Server.Admin | Listar todos os clientes OAuth |
| GET | `/membership/oauth/clients/:id` | JWT | Server.Admin | Obter um cliente pelo ID |
| GET | `/membership/oauth/clients/clientId/:clientId` | JWT | — | Obter um cliente pelo ID do cliente (segredo ocultado) |
| POST | `/membership/oauth/clients` | JWT | Server.Admin | Criar ou atualizar um cliente |
| DELETE | `/membership/oauth/clients/:id` | JWT | Server.Admin | Excluir um cliente |
| POST | `/membership/oauth/register` | Pública | — | Registro dinâmico de clientes (RFC 7591) para clientes públicos, como conectores MCP. Veja [Aplicativos Conectados](../connected-apps#dynamic-client-registration) |

### Endpoints de Aprovação de Dispositivos

| Método | Caminho | Autenticação | Descrição |
|--------|---------|--------------|-----------|
| GET | `/membership/oauth/device/pending/:userCode` | JWT | Obter as informações do código de dispositivo pendente para a interface de aprovação |
| POST | `/membership/oauth/device/approve` | JWT | Aprovar uma autorização de dispositivo. Corpo: `{ "user_code": "...", "church_id": "..." }` |
| POST | `/membership/oauth/device/deny` | JWT | Negar uma autorização de dispositivo. Corpo: `{ "user_code": "..." }` |

## Endpoints Públicos e Autenticados

A API usa duas funções wrapper que determinam os requisitos de autenticação:

- **`actionWrapper`** — Exige um JWT válido. O objeto do usuário autenticado (`au`) fica disponível com `churchId`, `userId` e as verificações de permissão.
- **`actionWrapperAnon`** — Não exige autenticação. Usado para login, registro, consultas públicas de conteúdo e receptores de webhooks.

Nas tabelas de endpoints desta documentação, eles são indicados como **JWT** e **Pública** respectivamente na coluna Autenticação.

## Páginas Relacionadas

- [Estrutura de Módulos](../module-structure) — Como controladores, repositórios e modelos são organizados
- [Configuração Local](../local-setup) — Como executar a API localmente para desenvolvimento
