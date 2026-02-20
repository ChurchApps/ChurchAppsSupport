---
title: "Autenticação e Permissões"
---

# Autenticação e Permissões

<div class="article-intro">

A API do ChurchApps usa autenticação baseada em JWT. Os usuários fazem login para receber um token que codifica sua identidade, associação à igreja e permissões. Esta página cobre o fluxo de autenticação, modelo de permissões e suporte a OAuth.

</div>

## Fluxo de Login

### Login Padrão

```
POST /membership/users/login
```

**Auth:** Público

Aceita um dos três tipos de credenciais:

| Campo | Descrição |
|-------|-----------|
| `email` + `password` | Login padrão com email/senha |
| `jwt` | Reautenticar com um JWT existente |
| `authGuid` | Link de autenticação único (usado em emails de boas-vindas/redefinição) |

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

O campo `token` é um JWT que deve ser enviado como `Authorization: Bearer <token>` nas requisições subsequentes.

### Conteúdo do Token

O JWT codifica:
- `id` — ID do Usuário
- `churchId` — Igreja atualmente selecionada
- `personId` — Registro de pessoa para a igreja selecionada
- Arrays de permissões por API

### Seleção de Igreja

Os usuários podem pertencer a múltiplas igrejas. A resposta de login inclui todas as igrejas com suas permissões. Para trocar de igreja, o cliente gera um novo JWT com escopo para uma igreja diferente a partir dos dados da resposta de login.

## Registro de Usuário

### Registrar um Novo Usuário

```
POST /membership/users/register
```

**Auth:** Público

```json
{
  "email": "jane@example.com",
  "firstName": "Jane",
  "lastName": "Doe",
  "appName": "B1 Admin",
  "appUrl": "https://app.b1.church"
}
```

Cria um usuário com uma senha temporária e envia um email de boas-vindas com um link de autenticação. O primeiro usuário registrado em uma nova instância recebe automaticamente acesso de administrador do servidor.

### Registrar uma Nova Igreja

```
POST /membership/churches/add
```

**Auth:** JWT

Após registrar um usuário, chame este endpoint para criar uma igreja e associar o usuário a ela.

## Gerenciamento de Senha

| Método | Caminho | Auth | Descrição |
|--------|---------|------|-----------|
| POST | `/membership/users/forgot` | Público | Enviar email de redefinição de senha. Body: `{ "userEmail": "...", "appName": "...", "appUrl": "..." }` |
| POST | `/membership/users/setPasswordGuid` | Público | Definir nova senha usando um GUID de autenticação de um email de redefinição. Body: `{ "authGuid": "...", "newPassword": "..." }` |
| POST | `/membership/users/updatePassword` | JWT | Alterar a senha do usuário atual. Body: `{ "newPassword": "..." }` |

## Modelo de Permissões

As permissões são organizadas por módulo e atribuídas aos usuários através de papéis. Cada permissão tem um **tipo de conteúdo** e uma **ação**.

### Referência de Permissões

| Seção de Exibição | Tipo de Conteúdo | Ação | Descrição |
|-------------------|------------------|------|-----------|
| **Presença** | Attendance | Checkin | Fazer check-in de membros nos cultos |
| | Attendance | Edit | Editar registros de presença |
| | Services | Edit | Gerenciar cultos e horários de culto |
| | Attendance | View | Visualizar registros de presença |
| | Attendance | View Summary | Visualizar resumos e relatórios de presença |
| **Doações** | Donations | Edit | Criar e editar registros de doações |
| | Settings | Edit | Editar configurações de doações/pagamentos |
| | Donations | View Summary | Visualizar relatórios resumidos de doações |
| | Donations | View | Visualizar registros individuais de doações |
| **Pessoas e Grupos** | Forms | Admin | Administração completa de formulários |
| | Forms | Edit | Editar definições de formulários |
| | Plans | Edit | Editar planos de culto |
| | Group Members | Edit | Adicionar/remover membros de grupos |
| | Groups | Edit | Criar e editar grupos |
| | Households | Edit | Editar atribuições de domicílios |
| | People | Edit | Editar qualquer registro de pessoa |
| | People | Edit Self | Editar apenas seu próprio registro de pessoa |
| | Roles | Edit | Gerenciar papéis e atribuições de usuários |
| | Group Members | View | Visualizar listas de membros de grupos |
| | People | View Members | Visualizar apenas membros (não visitantes) |
| | People | View | Visualizar todas as pessoas |
| | Roles | View | Visualizar papéis e atribuições |
| | Settings | Edit | Editar configurações da igreja |
| **Conteúdo** | Content | Edit | Editar páginas, seções, elementos |
| | Settings | Edit | Editar configurações de conteúdo |
| | StreamingServices | Edit | Gerenciar configuração de serviços de streaming |
| | Chat | Host | Hospedar/moderar sessões de chat |
| **Mensagens** | Texting | Send | Enviar mensagens de texto SMS |

### Como as Permissões São Verificadas

Nos controllers, as permissões são verificadas usando o método `au.checkAccess()`:

```typescript
// Exigir permissão específica
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

A permissão `Server.Admin` concede acesso total em todas as igrejas. Ela é atribuída ao primeiro usuário registrado e pode ser concedida a outros através do papel de administrador do servidor.

## OAuth 2.0

A API suporta OAuth 2.0 para integrações de terceiros. Dois tipos de concessão estão disponíveis.

### Fluxo de Código de Autorização

1. **Autorizar:** `POST /membership/oauth/authorize` (JWT necessário)
   - Body: `{ "client_id": "...", "redirect_uri": "...", "response_type": "code", "scope": "...", "state": "..." }`
   - Retorna: `{ "code": "...", "state": "..." }`

2. **Trocar código por token:** `POST /membership/oauth/token` (Público)
   - Body: `{ "grant_type": "authorization_code", "code": "...", "client_id": "...", "client_secret": "...", "redirect_uri": "..." }`
   - Retorna: `{ "access_token": "...", "token_type": "Bearer", "expires_in": 43200, "refresh_token": "...", "scope": "..." }`

3. **Renovar token:** `POST /membership/oauth/token` (Público)
   - Body: `{ "grant_type": "refresh_token", "refresh_token": "...", "client_id": "...", "client_secret": "..." }`

Os tokens de acesso expiram após **12 horas**.

### Fluxo de Código de Dispositivo (RFC 8628)

Para dispositivos sem navegador (apps de TV, quiosques):

1. **Solicitar código do dispositivo:** `POST /membership/oauth/device/authorize` (Público)
   - Body: `{ "client_id": "...", "scope": "..." }`
   - Retorna: `{ "device_code": "...", "user_code": "ABCD-1234", "verification_uri": "https://app.b1.church/device", "expires_in": 900, "interval": 5 }`

2. **O usuário insere o código** na URI de verificação e aprova ou nega

3. **Consultar por token:** `POST /membership/oauth/token` (Público)
   - Body: `{ "grant_type": "urn:ietf:params:oauth:grant-type:device_code", "device_code": "...", "client_id": "..." }`
   - Retorna `authorization_pending` até ser aprovado, depois retorna o token de acesso

### Gerenciamento de Clientes OAuth

| Método | Caminho | Auth | Permissão | Descrição |
|--------|---------|------|-----------|-----------|
| GET | `/membership/oauth/clients` | JWT | Server.Admin | Listar todos os clientes OAuth |
| GET | `/membership/oauth/clients/:id` | JWT | Server.Admin | Obter cliente por ID |
| GET | `/membership/oauth/clients/clientId/:clientId` | JWT | — | Obter cliente por client ID (segredo omitido) |
| POST | `/membership/oauth/clients` | JWT | Server.Admin | Criar ou atualizar um cliente |
| DELETE | `/membership/oauth/clients/:id` | JWT | Server.Admin | Excluir um cliente |

### Endpoints de Aprovação de Dispositivo

| Método | Caminho | Auth | Descrição |
|--------|---------|------|-----------|
| GET | `/membership/oauth/device/pending/:userCode` | JWT | Obter informações do código de dispositivo pendente para a UI de aprovação |
| POST | `/membership/oauth/device/approve` | JWT | Aprovar uma autorização de dispositivo. Body: `{ "user_code": "...", "church_id": "..." }` |
| POST | `/membership/oauth/device/deny` | JWT | Negar uma autorização de dispositivo. Body: `{ "user_code": "..." }` |

## Endpoints Públicos vs Autenticados

A API usa duas funções wrapper que determinam os requisitos de autenticação:

- **`actionWrapper`** — Requer um JWT válido. O objeto de usuário autenticado (`au`) está disponível com `churchId`, `userId` e verificações de permissão.
- **`actionWrapperAnon`** — Sem autenticação necessária. Usado para login, registro, consultas de conteúdo público e receptores de webhook.

Nas tabelas de endpoints ao longo desta documentação, esses são indicados como **JWT** e **Público** respectivamente na coluna Auth.

## Páginas Relacionadas

- [Estrutura do Módulo](../module-structure) — Como controllers, repositórios e modelos são organizados
- [Configuração Local](../local-setup) — Executando a API localmente para desenvolvimento
