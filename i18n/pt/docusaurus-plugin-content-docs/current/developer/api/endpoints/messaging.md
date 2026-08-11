---
title: "Endpoints de Mensagens"
---

# Endpoints de Mensagens

<div class="article-intro">

O módulo de Mensagens gerencia conversas em tempo real, mensagens de chat, notificações push, entrega de SMS/email, conexões WebSocket, mensagens privadas, registro de dispositivo e provedores de envio de mensagens. Fornece a camada de comunicação usada em todos os aplicativos ChurchApps para chat de transmissão ao vivo e notificações assíncronas.

</div>

**Caminho base:** `/messaging`

## Conversas

Caminho base: `/messaging/conversations`

| Método | Caminho | Auth | Permissão | Descrição |
|--------|---------|------|-----------|-----------|
| GET | `/timeline/ids?ids=` | JWT | — | Carregue conversas por IDs separados por vírgula com primeira/última mensagem |
| GET | `/messages/:contentType/:contentId` | JWT | — | Carregue conversas para conteúdo com mensagens paginadas (`?page=&limit=`) |
| GET | `/posts` | JWT | — | Obtenha conversas do tipo post para os grupos do usuário atual |
| GET | `/posts/group/:groupId` | JWT | — | Obtenha conversas do tipo post para um grupo específico |
| GET | `/current/:churchId/:contentType/:contentId` | Público | — | Obtenha ou crie a conversa atual para conteúdo (descriptografa automaticamente contentId) |
| GET | `/:churchId/:contentType/:contentId` | Público | — | Carregue conversas por tipo de conteúdo e ID |
| GET | `/:churchId/:id` | Público | — | Carregue uma única conversa por ID |
| POST | `/` | JWT | — | Crie ou atualize conversas (lote) |
| POST | `/start` | JWT | — | Inicie uma nova conversa com uma mensagem de comentário inicial |
| DELETE | `/:churchId/:id` | JWT | — | Deletar uma conversa |

### Controle de acesso de notas de pessoa

Conversas com `contentType: "person"` (aba Notas em um registro de pessoa) ou `contentType: "personConfidential"` (seção de Notas Confidenciais) são barradas em cada caminho de leitura e escrita, incluindo as rotas públicas acima, que retornam `401` para esses tipos de conteúdo. `person` requer a permissão **Pessoas / Editar** da MembershipApi; `personConfidential` requer **Pessoas / Visualizar Notas Confidenciais**. Para chaves de API escopo, `people:write` carrega ambas as ações (o usuário da chave ainda deve manter a permissão de função subjacente).

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

| Método | Caminho | Auth | Permissão | Descrição |
|--------|---------|------|-----------|-----------|
| GET | `/conversation/:conversationId` | JWT | — | Carregue todas as mensagens de uma conversa |
| GET | `/catchup/:churchId/:conversationId` | Público | — | Carregue todas as mensagens de uma conversa (catchup público para chat ao vivo) |
| GET | `/:churchId/:id` | Público | — | Carregue uma única mensagem por ID |
| POST | `/` | JWT | — | Salve mensagens (lote). Envia atualizações em tempo real e dispara notificações |
| POST | `/send` | Público | — | Envie mensagens (lote, público). Envia atualizações em tempo real via WebSocket e dispara notificações |
| POST | `/setCallout` | JWT | — | (legado) Transmita uma mensagem de chamada em tempo real. Sem cliente ativo; chat de transmissão ao vivo não renderiza mais chamadas |
| DELETE | `/:churchId/:id` | JWT | — | Deletar uma mensagem e transmitir a exclusão em tempo real |

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

| Método | Caminho | Auth | Permissão | Descrição |
|--------|---------|------|-----------|-----------|
| GET | `/` | JWT | — | Carregue todas as mensagens privadas do usuário atual (inclui última mensagem por conversa, marca todas como lidas) |
| GET | `/existing/:personId` | JWT | — | Encontre uma conversa privada existente com uma pessoa específica |
| GET | `/:id` | JWT | — | Carregue uma mensagem privada por ID (limpa notificação se dirigida ao usuário atual) |
| POST | `/` | JWT | — | Envie mensagens privadas (lote). Dispara notificação push para o destinatário |

## Notificações

Caminho base: `/messaging/notifications`

| Método | Caminho | Auth | Permissão | Descrição |
|--------|---------|------|-----------|-----------|
| GET | `/unreadCount` | JWT | — | Obtenha contagem de notificação não lida para o usuário atual |
| GET | `/my` | JWT | — | Carregue todas as notificações do usuário atual (marca todas como lidas) |
| GET | `/tmpEmail` | Público | — | Dispare resumo de email de notificação diária (endpoint de depuração/cron) |
| GET | `/:churchId/person/:personId` | JWT | — | Carregue notificações para uma pessoa específica |
| GET | `/:churchId/:id` | JWT | — | Carregue uma notificação por ID |
| POST | `/` | JWT | — | Crie ou atualize notificações (lote) |
| POST | `/create` | JWT | — | Crie notificações para várias pessoas. Corpo: `{ peopleIds, contentType, contentId, message, link }` |
| POST | `/markRead/:churchId/:personId` | JWT | — | Marque todas as notificações como lidas para uma pessoa |
| POST | `/sendTest` | JWT | — | Envie uma notificação push de teste. Corpo: `{ personId, title }` |
| POST | `/ping` | Público | — | Crie uma notificação a partir de um gatilho externo. Corpo: `{ personId, churchId, contentType, contentId, message, triggeredByPersonId }` |
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

| Método | Caminho | Auth | Permissão | Descrição |
|--------|---------|------|-----------|-----------|
| POST | `/` | JWT | — | Crie ou atualize preferências de notificação (da classe base CRUD) |
| GET | `/my` | JWT | — | Carregue preferências de notificação do usuário atual (cria padrões automaticamente se nenhum existir) |

## Conexões

Caminho base: `/messaging/connections`

Gerencia conexões WebSocket/tempo real para chat, conversas em grupo, mensagens privadas e transmissão ao vivo. Consulte [Arquitetura de Tempo Real](../../realtime) para o protocolo end-to-end.

| Método | Caminho | Auth | Permissão | Descrição |
|--------|---------|------|-----------|-----------|
| GET | `/:churchId/:conversationId` | Público | — | Carregue todas as conexões de uma conversa |
| POST | `/` | Público | — | Registre conexões (lote). Dispara uma transmissão de atendimento na conversa. Itens do corpo: `{ churchId, conversationId, socketId, displayName?, personId? }` |
| POST | `/setName` | Público | — | Atualize o nome de exibição de uma conexão por ID de socket. Corpo: `{ socketId, name }` |
| DELETE | `/:churchId/:conversationId/:socketId` | Público | — | Solte uma conexão de uma conversa. Dispara uma transmissão de atendimento |
| POST | `/tmpSendAlert` | Público | — | Envie um alerta de notificação para as conexões de uma pessoa. Corpo: `{ churchId, personId }` |

## Dispositivos

Caminho base: `/messaging/devices`

Gerencia registro de dispositivo para notificações push e emparelhamento de conteúdo (ex: aplicativo Lessons em displays de TV).

| Método | Caminho | Auth | Permissão | Descrição |
|--------|---------|------|-----------|-----------|
| POST | `/enroll` | JWT | — | Inscreva ou atualize um dispositivo (registro de push móvel). Corresponde por token FCM ou ID de dispositivo |
| POST | `/enrollAnon` | Público | — | Inscreva um dispositivo anônimo e gere um código de emparelhamento de 4 caracteres |
| POST | `/` | Público | — | Salve dispositivos (lote) |
| GET | `/pair/:pairingCode` | JWT | — | Emparelhe um dispositivo usando seu código de emparelhamento. Opcional `?contentType=&contentId=` para atribuir conteúdo |
| GET | `/status/:deviceId` | Público | — | Verifique status de emparelhamento de um dispositivo |
| GET | `/:churchId` | JWT | — | Carregue todos os dispositivos de uma igreja |
| GET | `/:churchId/person/:personId` | JWT | — | Carregue todos os dispositivos de uma pessoa |
| GET | `/:churchId/:id` | JWT | — | Carregue um dispositivo por ID |
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

Gerencia atribuições de conteúdo para dispositivos emparelhados (ex: qual lição é exibida em uma TV).

| Método | Caminho | Auth | Permissão | Descrição |
|--------|---------|------|-----------|-----------|
| GET | `/deviceId/:deviceId` | JWT | — | Carregue atribuições de conteúdo de um dispositivo |
| POST | `/` | JWT | — | Salve atribuições de conteúdo de dispositivo (lote) |
| DELETE | `/:id` | JWT | — | Deletar uma atribuição de conteúdo de dispositivo |

## Envio de Mensagens

Caminho base: `/messaging/texting`

Gerencia provedores de SMS de envio de mensagens, mensagens de texto em grupo e rastreamento de entrega.

| Método | Caminho | Auth | Permissão | Descrição |
|--------|---------|------|-----------|-----------|
| GET | `/providers` | JWT | — | Carregue provedores de envio de mensagens da igreja (credenciais são mascaradas) |
| GET | `/preview/:groupId` | JWT | — | Visualize destinatários para um texto em grupo (contagem elegível, optada, sem telefone) |
| GET | `/sent` | JWT | — | Carregue todos os registros de mensagem de texto enviados da igreja |
| GET | `/sent/:id/details` | JWT | — | Carregue um texto enviado com logs de entrega por destinatário |
| POST | `/providers` | JWT | — | Salve provedores de envio de mensagens (lote). Criptografa credenciais de API |
| POST | `/send` | JWT | — | Envie um SMS para todos os membros elegíveis de um grupo. Corpo: `{ groupId, message }` |
| POST | `/sendPerson` | JWT | — | Envie um SMS para uma pessoa individual. Corpo: `{ personId, phoneNumber, message }` |
| DELETE | `/providers/:id` | JWT | — | Deletar um provedor de envio de mensagens |

### Exemplo: Enviar Texto em Grupo

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

| Método | Caminho | Auth | Permissão | Descrição |
|--------|---------|------|-----------|-----------|
| GET | `/` | JWT | — | Carregue todos os modelos de email da igreja |
| GET | `/:id` | JWT | — | Carregue um único modelo de email por ID |
| GET | `/preview/:groupId` | JWT | — | Visualize entrega de email para um grupo (contagem de destinatário elegível, membros sem email) |
| POST | `/` | JWT | — | Crie ou atualize modelos de email (lote) |
| POST | `/send` | JWT | — | Envie um email com modelo para todos os membros de um grupo. Corpo: `{ groupId, subject, htmlContent }` |
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

(legado) Bloqueio de IP para chat de transmissão ao vivo. O cliente B1App não chama mais `POST /` — bloqueio de IP foi removido na migração de entrega unificada. A rota `/clear` ainda é invocada servidor-a-servidor por `StreamingServiceController` quando serviços de transmissão são salvos.

| Método | Caminho | Auth | Permissão | Descrição |
|--------|---------|------|-----------|-----------|
| POST | `/` | JWT | — | (legado) Salve IPs bloqueados (lote). Nenhum cliente ativo |
| POST | `/clear` | JWT | — | Limpe todos os IPs bloqueados para serviços específicos. Corpo: `[{ serviceId, churchId }]` |

## Logs de Entrega

Caminho base: `/messaging/deliverylogs`

Rastreia status de entrega para mensagens enviadas (SMS, notificações push, email).

| Método | Caminho | Auth | Permissão | Descrição |
|--------|---------|------|-----------|-----------|
| GET | `/content/:contentType/:contentId` | JWT | — | Carregue logs de entrega por tipo de conteúdo e ID |
| GET | `/person/:personId` | JWT | — | Carregue logs de entrega de uma pessoa. Opcional `?startDate=&endDate=` filtros |
| GET | `/recent` | JWT | — | Carregue logs de entrega recentes da igreja. Opcional `?limit=` (padrão 100) |
| GET | `/:id` | JWT | — | Carregue um log de entrega por ID |

## Páginas Relacionadas

- [Arquitetura de Tempo Real](../../realtime) -- Protocolo WebSocket, inscrições de sala e framework de entrega unificado
- [Notificações Web Push](../../web-push) -- Inscrição de push de navegador e entrega
- [Endpoints de Associação](./membership) -- Pessoas, grupos, funções e identidade principal
- [Endpoints de Participação](./attendance) -- Rastreamento de serviço e visita
- [Autenticação e Permissões](./authentication) -- Fluxo de login, JWT, OAuth, modelo de permissão
- [Estrutura de Módulo](../module-structure) -- Padrões de organização de código
