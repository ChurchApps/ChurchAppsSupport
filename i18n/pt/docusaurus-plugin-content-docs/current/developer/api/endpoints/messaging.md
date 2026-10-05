---
title: "Endpoints de Mensagens"
---

# Endpoints de Mensagens

<div class="article-intro">

O módulo de Mensagens gerencia conversas em tempo real, mensagens de bate-papo, notificações push, entrega de SMS/email, conexões WebSocket, mensagens privadas, registro de dispositivos e provedores de SMS. Fornece a camada de comunicação usada em todos os aplicativos ChurchApps para bate-papo de transmissão ao vivo e notificações assíncronas.

</div>

**Caminho base:** `/messaging`

## Conversas

Caminho base: `/messaging/conversations`

| Método | Caminho | Autenticação | Permissão | Descrição |
|--------|---------|---|------------|-------------|
| GET | `/timeline/ids?ids=` | JWT | — | Carregar conversas por IDs separados por vírgula com primeiras/últimas mensagens |
| GET | `/messages/:contentType/:contentId` | JWT | — | Carregar conversas para conteúdo com mensagens paginadas (`?page=&limit=`) |
| GET | `/posts` | JWT | — | Obter conversas do tipo post para os grupos do usuário atual |
| GET | `/posts/group/:groupId` | JWT | — | Obter conversas do tipo post para um grupo específico |
| GET | `/current/:churchId/:contentType/:contentId` | Público | — | Obter ou criar a conversa atual para conteúdo (descriptografa contentId automaticamente) |
| GET | `/:churchId/:contentType/:contentId` | Público | — | Carregar conversas por tipo de conteúdo e ID |
| GET | `/:churchId/:id` | Público | — | Carregar uma conversa simples por ID |
| POST | `/` | JWT | — | Criar ou atualizar conversas (lote) |
| POST | `/start` | JWT | — | Iniciar uma nova conversa com uma mensagem de comentário inicial |
| DELETE | `/:churchId/:id` | JWT | — | Deletar uma conversa |

### Controle de acesso para notas de pessoa

Conversas com `contentType: "person"` (a aba Notas em um registro de pessoa) ou `contentType: "personConfidential"` (a seção Notas Confidenciais) são fechadas a leitura e escrita em todos os caminhos, incluindo as rotas públicas acima, que retornam `401` para esses tipos de conteúdo. `person` requer a permissão **People / Edit** do MembershipApi; `personConfidential` requer **People / View Confidential Notes**. Para chaves de API com escopo, `people:write` realiza ambas as ações (o usuário da chave ainda deve conter a permissão de papel subjacente).

### Exemplo: Iniciar uma Conversa

```
POST /messaging/conversations/start
Authorization: Bearer <token>

{
  "groupId": "group-123",
  "contentType": "group",
  "contentId": "group-123",
  "title": "Weekly Discussion",
  "comment": "Welcome to this week's discussion thread!"
}
```

```json
{
  "id": "conv-456",
  "churchId": "church-789",
  "contentType": "group",
  "contentId": "group-123",
  "title": "Weekly Discussion",
  "dateCreated": "2026-02-17T10:00:00.000Z",
  "visibility": "public",
  "allowAnonymousPosts": false,
  "groupId": "group-123"
}
```

## Mensagens

Caminho base: `/messaging/messages`

| Método | Caminho | Autenticação | Permissão | Descrição |
|--------|---------|---|------------|-------------|
| GET | `/conversation/:conversationId` | JWT | — | Carregar todas as mensagens de uma conversa |
| GET | `/catchup/:churchId/:conversationId` | Público | — | Carregar todas as mensagens de uma conversa (recuperação pública para bate-papo ao vivo) |
| GET | `/:churchId/:id` | Público | — | Carregar uma mensagem simples por ID |
| POST | `/` | JWT | — | Salvar mensagens (lote). Envia atualizações em tempo real e dispara notificações. Atualizar uma mensagem existente requer ser seu autor ou conter `content.edit`; o autor armazenado nunca é reatribuível |
| POST | `/send` | Público | — | Enviar mensagens (lote, público). Envia atualizações em tempo real via WebSocket e dispara notificações |
| POST | `/setCallout` | JWT | — | (legado) Transmitir uma mensagem de callout em tempo real. Sem cliente ativo; bate-papo de transmissão ao vivo não renderiza mais callouts |
| DELETE | `/:churchId/:id` | JWT | — | Deletar uma mensagem e transmitir a exclusão em tempo real. Veja [Message moderation](#message-moderation) |

### Moderação de mensagem

Deletar uma mensagem é permitido para:

- o autor da mensagem;
- funcionários com `content.edit` (em qualquer lugar da igreja);
- **líderes de grupo**, para conversas com um `contentType` de `group` ou `groupAnnouncement` cujo `contentId` é um grupo que eles lideram (`leaderGroupIds` no JWT).

Conversas de notas de pessoa (`person` / `personConfidential`) nunca são moderadas por líderes — elas usam as permissões de notas (`people.edit`, `people.viewConfidentialNotes`) em vez disso.

Líderes obtêm apenas exclusão, não edição: reescrever a mensagem de outro membro permanece restrito ao autor e funcionários com `content.edit`.

### Exemplo: Enviar uma Mensagem

```
POST /messaging/messages/send

[
  {
    "churchId": "church-789",
    "conversationId": "conv-456",
    "personId": "person-123",
    "displayName": "John Smith",
    "content": "Hello everyone!",
    "messageType": "comment"
  }
]
```

```json
[
  {
    "id": "msg-001",
    "churchId": "church-789",
    "conversationId": "conv-456",
    "personId": "person-123",
    "displayName": "John Smith",
    "timeSent": "2026-02-17T10:05:00.000Z",
    "content": "Hello everyone!",
    "messageType": "comment"
  }
]
```

## Mensagens Privadas

Caminho base: `/messaging/privatemessages`

| Método | Caminho | Autenticação | Permissão | Descrição |
|--------|---------|---|------------|-------------|
| GET | `/` | JWT | — | Carregar todas as mensagens privadas do usuário atual (inclui última mensagem por conversa, marca todas como lidas) |
| GET | `/existing/:personId` | JWT | — | Encontrar uma conversa privada existente com uma pessoa específica |
| GET | `/:id` | JWT | — | Carregar uma mensagem privada por ID (limpa notificação se endereçada ao usuário atual) |
| POST | `/` | JWT | — | Enviar mensagens privadas (lote). Dispara notificação push para destinatário |

## Notificações

Caminho base: `/messaging/notifications`

| Método | Caminho | Autenticação | Permissão | Descrição |
|--------|---------|---|------------|-------------|
| GET | `/unreadCount` | JWT | — | Obter contagem de notificações não lidas para o usuário atual |
| GET | `/my` | JWT | — | Carregar todas as notificações para o usuário atual (marca todas como lidas) |
| GET | `/tmpEmail` | Público | — | Disparar resumo de notificação diário por email (endpoint debug/cron) |
| GET | `/:churchId/person/:personId` | JWT | — | Carregar notificações para uma pessoa específica |
| GET | `/:churchId/:id` | JWT | — | Carregar uma notificação por ID |
| POST | `/` | JWT | — | Criar ou atualizar notificações (lote) |
| POST | `/create` | JWT | — | Criar notificações para múltiplas pessoas. Corpo: `{ peopleIds, contentType, contentId, message, link }` |
| POST | `/markRead/:churchId/:personId` | JWT | — | Marcar todas as notificações como lidas para uma pessoa |
| POST | `/sendTest` | JWT | — | Enviar notificação push de teste. Corpo: `{ personId, title }` |
| POST | `/ping` | Público | — | Criar uma notificação de um gatilho externo. Corpo: `{ personId, churchId, contentType, contentId, message, triggeredByPersonId }` |
| DELETE | `/:churchId/:id` | JWT | — | Deletar uma notificação |

### Exemplo: Criar Notificações

```
POST /messaging/notifications/create
Authorization: Bearer <token>

{
  "peopleIds": ["person-123", "person-456"],
  "contentType": "group",
  "contentId": "group-789",
  "message": "New event posted in your group",
  "link": "/groups/group-789"
}
```

## Preferências de Notificação

Caminho base: `/messaging/notificationpreferences`

Estende CRUD padrão. A classe base fornece POST `/` (criar ou atualizar, sem permissão necessária).

| Método | Caminho | Autenticação | Permissão | Descrição |
|--------|---------|---|------------|-------------|
| POST | `/` | JWT | — | Criar ou atualizar preferências de notificação (da classe CRUD base) |
| GET | `/my` | JWT | — | Carregar preferências de notificação para o usuário atual (cria padrões automaticamente se não existirem) |

## Conexões

Caminho base: `/messaging/connections`

Gerencia conexões WebSocket/tempo real para bate-papo, conversas em grupo, mensagens privadas e transmissão ao vivo. Veja [Real-time Architecture](../../realtime) para o protocolo ponta a ponta.

| Método | Caminho | Autenticação | Permissão | Descrição |
|--------|---------|---|------------|-------------|
| GET | `/:churchId/:conversationId` | Público | — | Carregar todas as conexões para uma conversa |
| POST | `/` | Público | — | Registrar conexões (lote). Dispara transmissão de presença na conversa. Itens do corpo: `{ churchId, conversationId, socketId, displayName?, personId? }` |
| POST | `/setName` | Público | — | Atualizar o nome de exibição para uma conexão por ID de socket. Corpo: `{ socketId, name }` |
| DELETE | `/:churchId/:conversationId/:socketId` | Público | — | Soltar uma conexão de uma conversa. Dispara transmissão de presença |
| POST | `/tmpSendAlert` | Público | — | Enviar alerta de notificação para conexões de uma pessoa. Corpo: `{ churchId, personId }` |

## Dispositivos

Caminho base: `/messaging/devices`

Gerencia registro de dispositivo para notificações push e emparelhamento de conteúdo (por exemplo, aplicativo Lessons em exibições de TV).

| Método | Caminho | Autenticação | Permissão | Descrição |
|--------|---------|---|------------|-------------|
| POST | `/enroll` | JWT | — | Inscrever ou atualizar um dispositivo (registro móvel push). Corresponde por token FCM ou ID de dispositivo |
| POST | `/enrollAnon` | Público | — | Inscrever um dispositivo anônimo e gerar um código de emparelhamento de 4 caracteres |
| POST | `/` | Público | — | Salvar dispositivos (lote) |
| GET | `/pair/:pairingCode` | JWT | — | Emparelhar um dispositivo usando seu código de emparelhamento. `?contentType=&contentId=` opcional para atribuir conteúdo |
| GET | `/status/:deviceId` | Público | — | Verificar status de emparelhamento de um dispositivo |
| GET | `/:churchId` | JWT | — | Carregar todos os dispositivos para uma igreja |
| GET | `/:churchId/person/:personId` | JWT | — | Carregar todos os dispositivos para uma pessoa |
| GET | `/:churchId/:id` | JWT | — | Carregar um dispositivo por ID |
| DELETE | `/:churchId/:id` | JWT | — | Deletar um dispositivo |

### Exemplo: Inscrever um Dispositivo

```
POST /messaging/devices/enroll
Authorization: Bearer <token>

{
  "fcmToken": "firebase-token-abc123",
  "appName": "B1Mobile",
  "label": "John's iPhone",
  "deviceInfo": "iOS 17, iPhone 15"
}
```

```json
{
  "id": "device-001",
  "churchId": "church-789",
  "fcmToken": "firebase-token-abc123",
  "appName": "B1Mobile",
  "label": "John's iPhone",
  "registrationDate": "2026-02-17T10:00:00.000Z",
  "lastActiveDate": "2026-02-17T10:00:00.000Z"
}
```

## Conteúdos de Dispositivo

Caminho base: `/messaging/devicecontents`

Gerencia atribuições de conteúdo para dispositivos emparelhados (por exemplo, qual lição é exibida em uma TV).

| Método | Caminho | Autenticação | Permissão | Descrição |
|--------|---------|---|------------|-------------|
| GET | `/deviceId/:deviceId` | JWT | — | Carregar atribuições de conteúdo para um dispositivo |
| POST | `/` | JWT | — | Salvar atribuições de conteúdo de dispositivo (lote) |
| DELETE | `/:id` | JWT | — | Deletar uma atribuição de conteúdo de dispositivo |

## SMS

Caminho base: `/messaging/texting`

Gerencia provedores de SMS, mensagens de texto em grupo e rastreamento de entrega.

| Método | Caminho | Autenticação | Permissão | Descrição |
|--------|---------|---|------------|-------------|
| GET | `/providers` | JWT | — | Carregar provedores de SMS para a igreja (credenciais estão mascaradas) |
| GET | `/preview/:groupId` | JWT | — | Visualizar destinatários para um texto de grupo (contagem elegível, optou sair, sem telefone) |
| GET | `/sent` | JWT | — | Carregar todos os registros de mensagens de texto enviadas para a igreja |
| GET | `/sent/:id/details` | JWT | — | Carregar um texto enviado com registros de entrega por destinatário |
| POST | `/providers` | JWT | — | Salvar provedores de SMS (lote). Criptografa credenciais de API |
| POST | `/send` | JWT | — | Enviar SMS para todos os membros elegíveis de um grupo. Corpo: `{ groupId, message }`. Campos de mesclagem (`{{firstName}}`, `{{lastName}}`, `{{displayName}}`, `{{churchName}}`) são resolvidos por destinatário |
| POST | `/sendPerson` | JWT | — | Enviar SMS para uma pessoa. Corpo: `{ personId, phoneNumber, message }`. Campos de mesclagem são resolvidos e o texto resolvido é o que é registrado |
| DELETE | `/providers/:id` | JWT | — | Deletar um provedor de SMS |

### Exemplo: Enviar Texto de Grupo

```
POST /messaging/texting/send
Authorization: Bearer <token>

{
  "groupId": "group-123",
  "message": "Reminder: Service starts at 10 AM this Sunday!"
}
```

```json
{
  "totalMembers": 50,
  "recipientCount": 42,
  "successCount": 40,
  "failCount": 2,
  "optedOutCount": 5,
  "noPhoneCount": 3
}
```

## Modelos de Email

Caminho base: `/messaging/emailTemplates`

Gerencia modelos de email reutilizáveis e envio de emails com modelo para grupos.

| Método | Caminho | Autenticação | Permissão | Descrição |
|--------|---------|---|------------|-------------|
| GET | `/` | JWT | — | Carregar todos os modelos de email para a igreja |
| GET | `/:id` | JWT | — | Carregar um modelo de email simples por ID |
| GET | `/preview/:groupId` | JWT | — | Visualizar entrega de email para um grupo (contagem de destinatário elegível, membros sem email) |
| POST | `/` | JWT | — | Criar ou atualizar modelos de email (lote) |
| POST | `/send` | JWT | — | Enviar um email com modelo para todos os membros de um grupo. Corpo: `{ groupId, subject, htmlContent }` |
| DELETE | `/:id` | JWT | — | Deletar um modelo de email |

### Exemplo: Enviar Email para Grupo

```
POST /messaging/emailTemplates/send
Authorization: Bearer <token>

{
  "groupId": "group-123",
  "subject": "This Week's Update - {{churchName}}",
  "htmlContent": "<p>Hello {{firstName}},</p><p>Here's what's happening this week...</p>"
}
```

```json
{
  "totalMembers": 50,
  "recipientCount": 45,
  "successCount": 44,
  "failCount": 1,
  "noEmailCount": 5
}
```

**Campos de mesclagem suportados:** `{{firstName}}`, `{{lastName}}`, `{{displayName}}`, `{{email}}`, `{{churchName}}`

## IPs Bloqueados

Caminho base: `/messaging/blockedips`

(legado) Bloqueio de IP para bate-papo de transmissão ao vivo. O cliente B1App não chama mais `POST /` — bloqueio de IP foi removido na migração de entrega unificada. A rota `/clear` ainda é invocada servidor-para-servidor por `StreamingServiceController` quando serviços de transmissão são salvos.

| Método | Caminho | Autenticação | Permissão | Descrição |
|--------|---------|---|------------|-------------|
| POST | `/` | JWT | — | (legado) Salvar IPs bloqueados (lote). Sem cliente ativo |
| POST | `/clear` | JWT | — | Limpar todos os IPs bloqueados para serviços específicos. Corpo: `[{ serviceId, churchId }]` |

## Registros de Entrega

Caminho base: `/messaging/deliverylogs`

Rastreia o status de entrega de mensagens enviadas (SMS, notificações push, email).

| Método | Caminho | Autenticação | Permissão | Descrição |
|--------|---------|---|------------|-------------|
| GET | `/content/:contentType/:contentId` | JWT | — | Carregar registros de entrega por tipo de conteúdo e ID |
| GET | `/person/:personId` | JWT | — | Carregar registros de entrega para uma pessoa. `?startDate=&endDate=` opcional filtra |
| GET | `/recent` | JWT | — | Carregar registros de entrega recentes para a igreja. `?limit=` opcional (padrão 100) |
| GET | `/:id` | JWT | — | Carregar um registro de entrega por ID |

## Páginas Relacionadas

- [Real-time Architecture](../../realtime) -- Protocolo WebSocket, subscrições de sala e a estrutura de entrega unificada
- [Web Push Notifications](../../web-push) -- Inscrição de push de navegador e entrega
- [Membership Endpoints](./membership) -- Pessoas, grupos, papéis e identidade principal
- [Attendance Endpoints](./attendance) -- Rastreamento de serviço e visita
- [Authentication & Permissions](./authentication) -- Fluxo de login, JWT, OAuth, modelo de permissão
- [Module Structure](../module-structure) -- Padrões de organização de código
