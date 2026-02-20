---
title: "Endpoints de Mensagens"
---

# Endpoints de Mensagens

<div class="article-intro">

O módulo de Mensagens gerencia conversas em tempo real, mensagens de chat, notificações push, entrega de SMS/email, conexões WebSocket, mensagens privadas, registro de dispositivos e provedores de mensagens de texto. Ele fornece a camada de comunicação usada em todas as aplicações do ChurchApps tanto para chat de transmissão ao vivo quanto para notificações assíncronas.

</div>

**Caminho base:** `/messaging`

## Conversas

Caminho base: `/messaging/conversations`

| Método | Caminho | Auth | Permissão | Descrição |
|--------|---------|------|-----------|-----------|
| GET | `/timeline/ids?ids=` | JWT | — | Carregar conversas por IDs separados por vírgula com primeira/última mensagens |
| GET | `/messages/:contentType/:contentId` | JWT | — | Carregar conversas para conteúdo com mensagens paginadas (`?page=&limit=`) |
| GET | `/posts` | JWT | — | Obter conversas tipo post dos grupos do usuário atual |
| GET | `/posts/group/:groupId` | JWT | — | Obter conversas tipo post de um grupo específico |
| GET | `/current/:churchId/:contentType/:contentId` | Público | — | Obter ou criar a conversa atual para conteúdo (auto-descriptografa contentId) |
| GET | `/:churchId/:contentType/:contentId` | Público | — | Carregar conversas por tipo de conteúdo e ID |
| GET | `/:churchId/:id` | Público | — | Carregar uma única conversa por ID |
| POST | `/` | JWT | — | Criar ou atualizar conversas (lote) |
| POST | `/start` | JWT | — | Iniciar uma nova conversa com uma mensagem de comentário inicial |
| DELETE | `/:churchId/:id` | JWT | — | Excluir uma conversa |

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
| GET | `/conversation/:conversationId` | JWT | — | Carregar todas as mensagens de uma conversa |
| GET | `/catchup/:churchId/:conversationId` | Público | — | Carregar todas as mensagens de uma conversa (atualização pública para chat ao vivo) |
| GET | `/:churchId/:id` | Público | — | Carregar uma única mensagem por ID |
| POST | `/` | JWT | — | Salvar mensagens (lote). Envia atualizações em tempo real e aciona notificações |
| POST | `/send` | Público | — | Enviar mensagens (lote, público). Envia atualizações em tempo real via WebSocket e aciona notificações |
| POST | `/setCallout` | JWT | — | Transmitir uma mensagem de destaque para uma conversa em tempo real |
| DELETE | `/:churchId/:id` | JWT | — | Excluir uma mensagem e transmitir a exclusão em tempo real |

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
| GET | `/` | JWT | — | Carregar todas as mensagens privadas do usuário atual (inclui última mensagem por conversa, marca todas como lidas) |
| GET | `/existing/:personId` | JWT | — | Encontrar uma conversa privada existente com uma pessoa específica |
| GET | `/:id` | JWT | — | Carregar uma mensagem privada por ID (limpa notificação se endereçada ao usuário atual) |
| POST | `/` | JWT | — | Enviar mensagens privadas (lote). Aciona notificação push para o destinatário |

## Notificações

Caminho base: `/messaging/notifications`

| Método | Caminho | Auth | Permissão | Descrição |
|--------|---------|------|-----------|-----------|
| GET | `/unreadCount` | JWT | — | Obter contagem de notificações não lidas do usuário atual |
| GET | `/my` | JWT | — | Carregar todas as notificações do usuário atual (marca todas como lidas) |
| GET | `/tmpEmail` | Público | — | Acionar resumo diário de notificações por email (endpoint de depuração/cron) |
| GET | `/:churchId/person/:personId` | JWT | — | Carregar notificações de uma pessoa específica |
| GET | `/:churchId/:id` | JWT | — | Carregar uma notificação por ID |
| POST | `/` | JWT | — | Criar ou atualizar notificações (lote) |
| POST | `/create` | JWT | — | Criar notificações para múltiplas pessoas. Body: `{ peopleIds, contentType, contentId, message, link }` |
| POST | `/markRead/:churchId/:personId` | JWT | — | Marcar todas as notificações como lidas para uma pessoa |
| POST | `/sendTest` | JWT | — | Enviar uma notificação push de teste. Body: `{ personId, title }` |
| POST | `/ping` | Público | — | Criar uma notificação a partir de um gatilho externo. Body: `{ personId, churchId, contentType, contentId, message, triggeredByPersonId }` |
| DELETE | `/:churchId/:id` | JWT | — | Excluir uma notificação |

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
| POST | `/` | JWT | — | Criar ou atualizar preferências de notificação (da classe base CRUD) |
| GET | `/my` | JWT | — | Carregar preferências de notificação do usuário atual (cria padrões automaticamente se não existirem) |

## Conexões

Caminho base: `/messaging/connections`

Gerencia conexões WebSocket/tempo real para chat de transmissão ao vivo.

| Método | Caminho | Auth | Permissão | Descrição |
|--------|---------|------|-----------|-----------|
| GET | `/:churchId/:conversationId` | Público | — | Carregar todas as conexões de uma conversa |
| POST | `/` | Público | — | Registrar conexões (lote). Numera automaticamente usuários anônimos e envia atualizações de presença/IPs bloqueados |
| POST | `/setName` | Público | — | Atualizar o nome de exibição de uma conexão por ID de socket. Body: `{ socketId, name }` |
| POST | `/tmpSendAlert` | Público | — | Enviar um alerta de notificação para as conexões de uma pessoa. Body: `{ churchId, personId }` |

## Dispositivos

Caminho base: `/messaging/devices`

Gerencia registro de dispositivos para notificações push e pareamento de conteúdo (ex: app Lessons em displays de TV).

| Método | Caminho | Auth | Permissão | Descrição |
|--------|---------|------|-----------|-----------|
| POST | `/enroll` | JWT | — | Registrar ou atualizar um dispositivo (registro push móvel). Corresponde por token FCM ou ID do dispositivo |
| POST | `/enrollAnon` | Público | — | Registrar um dispositivo anônimo e gerar um código de pareamento de 4 caracteres |
| POST | `/` | Público | — | Salvar dispositivos (lote) |
| GET | `/pair/:pairingCode` | JWT | — | Parear um dispositivo usando seu código de pareamento. Opcional `?contentType=&contentId=` para atribuir conteúdo |
| GET | `/status/:deviceId` | Público | — | Verificar status de pareamento de um dispositivo |
| GET | `/:churchId` | JWT | — | Carregar todos os dispositivos de uma igreja |
| GET | `/:churchId/person/:personId` | JWT | — | Carregar todos os dispositivos de uma pessoa |
| GET | `/:churchId/:id` | JWT | — | Carregar um dispositivo por ID |
| DELETE | `/:churchId/:id` | JWT | — | Excluir um dispositivo |

### Exemplo: Registrar um Dispositivo

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

## Conteúdos de Dispositivos

Caminho base: `/messaging/devicecontents`

Gerencia atribuições de conteúdo para dispositivos pareados (ex: qual lição é exibida em uma TV).

| Método | Caminho | Auth | Permissão | Descrição |
|--------|---------|------|-----------|-----------|
| GET | `/deviceId/:deviceId` | JWT | — | Carregar atribuições de conteúdo de um dispositivo |
| POST | `/` | JWT | — | Salvar atribuições de conteúdo de dispositivos (lote) |
| DELETE | `/:id` | JWT | — | Excluir uma atribuição de conteúdo de dispositivo |

## Mensagens de Texto

Caminho base: `/messaging/texting`

Gerencia provedores de mensagens de texto SMS, envio de texto para grupos e rastreamento de entrega.

| Método | Caminho | Auth | Permissão | Descrição |
|--------|---------|------|-----------|-----------|
| GET | `/providers` | JWT | — | Carregar provedores de mensagens de texto da igreja (credenciais são mascaradas) |
| GET | `/preview/:groupId` | JWT | — | Pré-visualizar destinatários de um texto para grupo (contagens de elegíveis, opt-out, sem telefone) |
| GET | `/sent` | JWT | — | Carregar todos os registros de mensagens de texto enviadas da igreja |
| GET | `/sent/:id/details` | JWT | — | Carregar um texto enviado com logs de entrega por destinatário |
| POST | `/providers` | JWT | — | Salvar provedores de mensagens de texto (lote). Criptografa credenciais de API |
| POST | `/send` | JWT | — | Enviar um SMS para todos os membros elegíveis de um grupo. Body: `{ groupId, message }` |
| POST | `/sendPerson` | JWT | — | Enviar um SMS para uma única pessoa. Body: `{ personId, phoneNumber, message }` |
| DELETE | `/providers/:id` | JWT | — | Excluir um provedor de mensagens de texto |

### Exemplo: Enviar Texto para Grupo

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

## IPs Bloqueados

Caminho base: `/messaging/blockedips`

Gerencia bloqueio de IP para conversas de chat de transmissão ao vivo.

| Método | Caminho | Auth | Permissão | Descrição |
|--------|---------|------|-----------|-----------|
| POST | `/` | JWT | — | Salvar IPs bloqueados (lote). Transmite lista atualizada de bloqueios para a conversa |
| POST | `/clear` | JWT | — | Limpar todos os IPs bloqueados para serviços específicos. Body: `[{ serviceId, churchId }]` |

## Logs de Entrega

Caminho base: `/messaging/deliverylogs`

Rastreia status de entrega de mensagens enviadas (SMS, notificações push, email).

| Método | Caminho | Auth | Permissão | Descrição |
|--------|---------|------|-----------|-----------|
| GET | `/content/:contentType/:contentId` | JWT | — | Carregar logs de entrega por tipo de conteúdo e ID |
| GET | `/person/:personId` | JWT | — | Carregar logs de entrega de uma pessoa. Filtros opcionais `?startDate=&endDate=` |
| GET | `/recent` | JWT | — | Carregar logs de entrega recentes da igreja. Opcional `?limit=` (padrão 100) |
| GET | `/:id` | JWT | — | Carregar um log de entrega por ID |

## Páginas Relacionadas

- [Endpoints de Membros](./membership) -- Pessoas, grupos, papéis e identidade central
- [Endpoints de Presença](./attendance) -- Rastreamento de cultos e visitas
- [Autenticação e Permissões](./authentication) -- Fluxo de login, JWT, OAuth, modelo de permissões
- [Estrutura do Módulo](../module-structure) -- Padrões de organização de código
