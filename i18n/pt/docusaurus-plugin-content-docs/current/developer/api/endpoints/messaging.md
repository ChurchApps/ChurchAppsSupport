---
title: "Endpoints de Mensagens"
---

# Endpoints de Mensagens

<div class="article-intro">

O módulo Messaging gerencia conversas em tempo real, mensagens de chat, notificações push, entrega de SMS/email, conexões WebSocket, mensagens privadas, registro de dispositivo e provedores de texting. Fornece a camada de comunicação usada em todos os aplicativos ChurchApps tanto para chat de live streaming quanto para notificações assíncronas.

</div>

**Base path:** `/messaging`

## Conversas

Base path: `/messaging/conversations`

| Método | Caminho | Auth | Permissão | Descrição |
|--------|--------|------|-----------|-----------|
| GET | `/timeline/ids?ids=` | JWT | — | Carregar conversas por IDs separados por vírgula com primeiras/últimas mensagens |
| GET | `/messages/:contentType/:contentId` | JWT | — | Carregar conversas para conteúdo com mensagens paginadas (`?page=&limit=`) |
| GET | `/posts` | JWT | — | Obter conversas do tipo post para os grupos do usuário atual |
| GET | `/posts/group/:groupId` | JWT | — | Obter conversas do tipo post para um grupo específico |
| GET | `/current/:churchId/:contentType/:contentId` | Público | — | Obter ou criar a conversa atual para conteúdo (auto-decripta contentId) |
| GET | `/:churchId/:contentType/:contentId` | Público | — | Carregar conversas por tipo de conteúdo e ID |
| GET | `/:churchId/:id` | Público | — | Carregar uma única conversa por ID |
| POST | `/` | JWT | — | Criar ou atualizar conversas (lote) |
| POST | `/start` | JWT | — | Iniciar uma nova conversa com uma mensagem de comentário inicial |
| DELETE | `/:churchId/:id` | JWT | — | Deletar uma conversa |

### Controle de acesso de notas de pessoa

Conversas com `contentType: "person"` (a guia Notas em um registro de pessoa) ou `contentType: "personConfidential"` (a seção Notas Confidenciais) são portadas em cada caminho de leitura e escrita, incluindo as rotas de outra forma públicas, que retornam `401` para estes tipos de conteúdo. `person` requer a permissão MembershipApi **Pessoas / Edit**; `personConfidential` requer **Pessoas / View Confidential Notes**. Para chaves de API com escopo, `people:write` realiza ambas ações (o usuário da chave ainda deve ter a permissão de papel subjacente).

### Exemplo: Iniciar uma Conversa

```
POST /messaging/conversations/start
Authorization: Bearer <token>

{
  "groupId": "group-123",
  "contentType": "group",
  "contentId": "group-123",
  "title": "Weekly Discussion",
  "comment": "Welcome to this week"s discussion thread!"
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

Base path: `/messaging/messages`

| Método | Caminho | Auth | Permissão | Descrição |
|--------|--------|------|-----------|-----------|
| GET | `/conversation/:conversationId` | JWT | — | Carregar todas mensagens para uma conversa |
| GET | `/catchup/:churchId/:conversationId` | Público | — | Carregar todas mensagens para uma conversa (catchup público para live chat) |
| GET | `/:churchId/:id` | Público | — | Carregar uma única mensagem por ID |
| POST | `/` | JWT | — | Salvar mensagens (lote). Envia atualizações em tempo real e ativa notificações. Atualizar uma mensagem existente requer ser seu autor ou ter `content.edit`; o autor armazenado nunca é reatribuível |
| POST | `/send` | Público | — | Enviar mensagens (lote, público). Envia atualizações em tempo real via WebSocket e ativa notificações |
| POST | `/setCallout` | JWT | — | (legacy) Radiodifundir uma mensagem de callout em tempo real. Sem cliente ativo; live stream chat não renderiza mais callouts |
| DELETE | `/:churchId/:id` | JWT | — | Deletar uma mensagem e radiodifundir a deleção em tempo real. Consulte [Message moderation](#message-moderation) |

### Moderação de mensagem

Deletar uma mensagem é permitido para:

- o autor da mensagem;
- staff com `content.edit` (em qualquer lugar da igreja);
- **líderes de grupo**, para conversas com `contentType` de `group` ou `groupAnnouncement` cujo `contentId` é um grupo que eles lideram (`leaderGroupIds` no JWT).

Conversas de nota de pessoa (`person` / `personConfidential`) nunca são moderadas por líder — usam as permissões de nota (`people.edit`, `people.viewConfidentialNotes`).

Líderes conseguem apenas deletar, não editar: reescrever a mensagem de outro membro fica restrito ao autor e staff de `content.edit`.

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

Base path: `/messaging/privatemessages`

| Método | Caminho | Auth | Permissão | Descrição |
|--------|--------|------|-----------|-----------|
| GET | `/` | JWT | — | Carregar todas mensagens privadas para o usuário atual (inclui última mensagem por conversa, marca todos como lidos) |
| GET | `/existing/:personId` | JWT | — | Encontrar uma conversa privada existente com uma pessoa específica |
| GET | `/:id` | JWT | — | Carregar uma mensagem privada por ID (limpa notificação se endereçada ao usuário atual) |
| POST | `/` | JWT | — | Enviar mensagens privadas (lote). Ativa notificação push para recipiente |

## Notificações

Base path: `/messaging/notifications`

| Método | Caminho | Auth | Permissão | Descrição |
|--------|--------|------|-----------|-----------|
| GET | `/unreadCount` | JWT | — | Obter contagem de notificação não lida para o usuário atual |
| GET | `/my` | JWT | — | Carregar todas notificações para o usuário atual (marca todas como lidas) |
| GET | `/tmpEmail` | Público | — | Ativar digest de email de notificação diário (endpoint debug/cron) |
| GET | `/:churchId/person/:personId` | JWT | — | Carregar notificações para uma pessoa específica |
| GET | `/:churchId/:id` | JWT | — | Carregar uma notificação por ID |
| POST | `/` | JWT | — | Criar ou atualizar notificações (lote) |
| POST | `/create` | JWT | — | Criar notificações para múltiplas pessoas. Body: `{ peopleIds, contentType, contentId, message, link }` |
| POST | `/markRead/:churchId/:personId` | JWT | — | Marcar todas notificações como lidas para uma pessoa |
| POST | `/sendTest` | JWT | — | Enviar uma notificação push de teste. Body: `{ personId, title }` |
| POST | `/ping` | Público | — | Criar uma notificação de um gatilho externo. Body: `{ personId, churchId, contentType, contentId, message, triggeredByPersonId }` |
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

Base path: `/messaging/notificationpreferences`

Estende CRUD padrão. A classe base fornece POST `/` (criar ou atualizar, nenhuma permissão requerida).

| Método | Caminho | Auth | Permissão | Descrição |
|--------|--------|------|-----------|-----------|
| POST | `/` | JWT | — | Criar ou atualizar preferências de notificação (da classe base CRUD) |
| GET | `/my` | JWT | — | Carregar preferências de notificação para o usuário atual (auto-cria padrões se não existirem) |

## Conexões

Base path: `/messaging/connections`

Gerencia conexões WebSocket/tempo-real para chat, conversas de grupo, mensagens privadas e live streaming. Consulte [Arquitetura de Tempo Real](../../realtime) para o protocolo fim-a-fim.

| Método | Caminho | Auth | Permissão | Descrição |
|--------|--------|------|-----------|-----------|
| GET | `/:churchId/:conversationId` | Público | — | Carregar todas conexões para uma conversa |
| POST | `/` | Público | — | Registrar conexões (lote). Ativa uma radiodifusão de presença na conversa. Itens Body: `{ churchId, conversationId, socketId, displayName?, personId? }` |
| POST | `/setName` | Público | — | Atualizar o nome de exibição para uma conexão por socket ID. Body: `{ socketId, name }` |
| DELETE | `/:churchId/:conversationId/:socketId` | Público | — | Descartar uma conexão de uma conversa. Ativa uma radiodifusão de presença |
| POST | `/tmpSendAlert` | Público | — | Enviar um alerta de notificação para as conexões de uma pessoa. Body: `{ churchId, personId }` |

## Dispositivos

Base path: `/messaging/devices`

Gerencia registro de dispositivo para notificações push e emparelhamento de conteúdo (por exemplo, app Lessons em displays de TV).

| Método | Caminho | Auth | Permissão | Descrição |
|--------|--------|------|-----------|-----------|
| POST | `/enroll` | JWT | — | Enrolar ou atualizar um dispositivo (registro push móvel). Combina por token FCM ou ID de dispositivo |
| POST | `/enrollAnon` | Público | — | Enrolar um dispositivo anônimo e gerar um código de emparelhamento de 4 caracteres |
| POST | `/` | Público | — | Salvar dispositivos (lote) |
| GET | `/pair/:pairingCode` | JWT | — | Emparelhar um dispositivo usando seu código de emparelhamento. Opcional `?contentType=&contentId=` para atribuir conteúdo |
| GET | `/status/:deviceId` | Público | — | Checar status de emparelhamento de um dispositivo |
| GET | `/:churchId` | JWT | — | Carregar todos dispositivos para uma igreja |
| GET | `/:churchId/person/:personId` | JWT | — | Carregar todos dispositivos para uma pessoa |
| GET | `/:churchId/:id` | JWT | — | Carregar um dispositivo por ID |
| DELETE | `/:churchId/:id` | JWT | — | Deletar um dispositivo |

### Exemplo: Enrolar um Dispositivo

```
POST /messaging/devices/enroll
Authorization: Bearer <token>

{
  "fcmToken": "firebase-token-abc123",
  "appName": "B1Mobile",
  "label": "John"s iPhone",
  "deviceInfo": "iOS 17, iPhone 15"
}
```

```json
{
  "id": "device-001",
  "churchId": "church-789",
  "fcmToken": "firebase-token-abc123",
  "appName": "B1Mobile",
  "label": "John"s iPhone",
  "registrationDate": "2026-02-17T10:00:00.000Z",
  "lastActiveDate": "2026-02-17T10:00:00.000Z"
}
```

## Conteúdo de Dispositivo

Base path: `/messaging/devicecontents`

Gerencia atribuições de conteúdo para dispositivos emparelhados (por exemplo, qual aula é exibida em uma TV).

| Método | Caminho | Auth | Permissão | Descrição |
|--------|--------|------|-----------|-----------|
| GET | `/deviceId/:deviceId` | JWT | — | Carregar atribuições de conteúdo para um dispositivo |
| POST | `/` | JWT | — | Salvar atribuições de conteúdo de dispositivo (lote) |
| DELETE | `/:id` | JWT | — | Deletar uma atribuição de conteúdo de dispositivo |

## Texting

Base path: `/messaging/texting`

Gerencia provedores de SMS texting, mensagens de texto de grupo e rastreamento de entrega.

| Método | Caminho | Auth | Permissão | Descrição |
|--------|--------|------|-----------|-----------|
| GET | `/providers` | JWT | — | Carregar provedores de texting para a igreja (credenciais estão mascaradas) |
| GET | `/preview/:groupId` | JWT | — | Visualizar recipientes para um texto de grupo (contagens elegíveis, optado para fora, sem telefone) |
| GET | `/sent` | JWT | — | Carregar todos registros de mensagem de texto enviada para a igreja |
| GET | `/sent/:id/details` | JWT | — | Carregar um texto enviado com logs de entrega por recipiente |
| POST | `/providers` | JWT | — | Salvar provedores de texting (lote). Criptografa credenciais de API |
| POST | `/send` | JWT | — | Enviar SMS para todos membros elegíveis de um grupo. Body: `{ groupId, message }` |
| POST | `/sendPerson` | JWT | — | Enviar SMS para uma única pessoa. Body: `{ personId, phoneNumber, message }` |
| DELETE | `/providers/:id` | JWT | — | Deletar um provedor de texting |

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

Base path: `/messaging/emailTemplates`

Gerencia modelos de email reutilizáveis e envio de email modelado para grupos.

| Método | Caminho | Auth | Permissão | Descrição |
|--------|--------|------|-----------|-----------|
| GET | `/` | JWT | — | Carregar todos modelos de email para a igreja |
| GET | `/:id` | JWT | — | Carregar um único modelo de email por ID |
| GET | `/preview/:groupId` | JWT | — | Visualizar entrega de email para um grupo (contagem de recipiente elegível, membros sem email) |
| POST | `/` | JWT | — | Criar ou atualizar modelos de email (lote) |
| POST | `/send` | JWT | — | Enviar um email modelado para todos membros de um grupo. Body: `{ groupId, subject, htmlContent }` |
| DELETE | `/:id` | JWT | — | Deletar um modelo de email |

### Exemplo: Enviar Email para Grupo

```
POST /messaging/emailTemplates/send
Authorization: Bearer <token>

{
  "groupId": "group-123",
  "subject": "This Week"s Update - {{churchName}}",
  "htmlContent": "<p>Hello {{firstName}},</p><p>Here"s what"s happening this week...</p>"
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

**Campos de merge suportados:** `{{firstName}}`, `{{lastName}}`, `{{displayName}}`, `{{email}}`, `{{churchName}}`

## IPs Bloqueados

Base path: `/messaging/blockedips`

(legacy) Bloqueio de IP para live streaming chat. O cliente B1App não mais chama `POST /` — bloqueio de IP foi removido na migração de entrega unificada. A rota `/clear` ainda é invocada de servidor para servidor por `StreamingServiceController` quando serviços de streaming são salvos.

| Método | Caminho | Auth | Permissão | Descrição |
|--------|--------|------|-----------|-----------|
| POST | `/` | JWT | — | (legacy) Salvar IPs bloqueados (lote). Sem cliente ativo |
| POST | `/clear` | JWT | — | Limpar todos IPs bloqueados para serviços específicos. Body: `[{ serviceId, churchId }]` |

## Logs de Entrega

Base path: `/messaging/deliverylogs`

Rastreia status de entrega para mensagens enviadas (SMS, notificações push, email).

| Método | Caminho | Auth | Permissão | Descrição |
|--------|--------|------|-----------|-----------|
| GET | `/content/:contentType/:contentId` | JWT | — | Carregar logs de entrega por tipo de conteúdo e ID |
| GET | `/person/:personId` | JWT | — | Carregar logs de entrega para uma pessoa. Opcional `?startDate=&endDate=` filtros |
| GET | `/recent` | JWT | — | Carregar logs de entrega recente para a igreja. Opcional `?limit=` (padrão 100) |
| GET | `/:id` | JWT | — | Carregar um log de entrega por ID |

## Páginas Relacionadas

- [Arquitetura de Tempo Real](../../realtime) — Protocolo WebSocket, subscrições de sala e framework de entrega unificada
- [Notificações de Push Web](../../web-push) -- Subscrição de push do navegador e entrega
- [Endpoints de Associação](./membership) — Pessoas, grupos, papéis e identidade principal
- [Endpoints de Presença](./attendance) — Serviço e rastreamento de visita
- [Autenticação e Permissões](./authentication) -- Fluxo de login, JWT, OAuth e modelo de permissão
- [Estrutura de Módulo](../module-structure) -- Padrões de organização de código
