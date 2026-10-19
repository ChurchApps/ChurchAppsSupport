---
title: "Endpoints de Mensagens"
---

# Endpoints de Mensagens

<div class="article-intro">

O módulo de Mensagens gerencia conversas em tempo real, mensagens de chat, notificações push, envio de SMS/e-mail, conexões WebSocket, mensagens privadas, registro de dispositivos e provedores de envio de texto. Ele fornece a camada de comunicação usada em todos os aplicativos da ChurchApps, tanto para o chat de transmissões ao vivo quanto para notificações assíncronas.

</div>

**Caminho base:** `/messaging`

## Conversas

Caminho base: `/messaging/conversations`

| Método | Caminho | Autenticação | Permissão | Descrição |
|--------|------|------|------------|-------------|
| GET | `/timeline/ids?ids=` | JWT | — | Carrega conversas pelos IDs separados por vírgula, com a primeira e a última mensagem |
| GET | `/messages/:contentType/:contentId` | JWT | — | Carrega conversas de um conteúdo com mensagens paginadas (`?page=&limit=`) |
| GET | `/posts` | JWT | — | Obtém as conversas do tipo publicação dos grupos do usuário atual |
| GET | `/posts/group/:groupId` | JWT | — | Obtém as conversas do tipo publicação de um grupo específico |
| GET | `/current/:churchId/:contentType/:contentId` | Pública | — | Obtém ou cria a conversa atual do conteúdo (descriptografa o contentId automaticamente) |
| GET | `/:churchId/:contentType/:contentId` | Pública | — | Carrega conversas por tipo de conteúdo e ID |
| GET | `/:churchId/:id` | Pública | — | Carrega uma única conversa pelo ID |
| POST | `/` | JWT | — | Cria ou atualiza conversas (em lote) |
| POST | `/start` | JWT | — | Inicia uma nova conversa com uma mensagem de comentário inicial |
| DELETE | `/:churchId/:id` | JWT | — | Exclui uma conversa |

### Controle de acesso às anotações de pessoas

Conversas com `contentType: "person"` (a aba Anotações de um registro de pessoa) ou `contentType: "personConfidential"` (a seção Anotações Confidenciais) são controladas em todos os caminhos de leitura e gravação, inclusive nas rotas públicas acima, que retornam `401` para esses tipos de conteúdo. `person` exige a permissão **Pessoas / Editar** do MembershipApi; `personConfidential` exige **Pessoas / Ver Anotações Confidenciais**. Para chaves de API com escopo, `people:write` abrange as duas ações (o usuário da chave ainda precisa ter a permissão de função subjacente).

### Controle de acesso às anotações de grupos e eventos {#group-and-event-notes-access-control}

Mais dois tipos de conteúdo de anotação são controlados da mesma forma, em todos os caminhos de leitura e gravação (inclusive nas rotas públicas acima), e nunca ficam abertos para publicação anônima:

- **`groupNote`** (`contentId` = ID do grupo) -- o feed **Anotações dos líderes** de um grupo. Somente os líderes desse grupo (`leaderGroupIds` no JWT) podem ler ou publicar. Nenhuma permissão de equipe concede acesso, incluindo `content.edit` e as permissões de participação em grupos.
- **`eventNote`** (`contentId` = ID do evento) -- as anotações de um evento do calendário. Membros da equipe com `content.edit` ou **Calendários / Admin** sempre podem ler e publicar. Caso contrário, o acesso segue os campos `notesViewRole` (leitura) e `notesPostRole` (publicação) do evento: `staff` (o padrão, usado quando o campo é `null`) não permite acesso a mais ninguém, `leaders` permite os líderes do grupo do evento, e `members` permite os membros e líderes do grupo do evento. Um evento sem `groupId` é restrito à equipe.

### Controle de acesso às anotações de cartões de fluxo de trabalho

Conversas com `contentType: "workflowCard"` (as anotações de um cartão de fluxo de trabalho, em que `contentId` é o ID da tarefa do cartão) só podem ser lidas e gravadas por quem consegue abrir esse cartão: um usuário com a permissão **Tarefas / Ver** do DoingApi, ou a pessoa ou grupo a quem o cartão está atribuído, criado por ou sobre. Todos os demais recebem `401` em todos os caminhos de leitura, inclusive nas rotas públicas acima. A conversa de um cartão é vinculada por meio do próprio cartão com `POST /doing/tasks/:id/conversation` (corpo `{ "conversationId": "..." }`; vale a primeira conversa vinculada), que podem ser chamadas pelos editores do cartão e por seu responsável.

### Exemplo: Iniciar uma conversa

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
|--------|------|------|------------|-------------|
| GET | `/conversation/:conversationId` | JWT | — | Carrega todas as mensagens de uma conversa |
| GET | `/catchup/:churchId/:conversationId` | Pública | — | Carrega todas as mensagens de uma conversa (recuperação pública para o chat ao vivo) |
| GET | `/:churchId/:id` | Pública | — | Carrega uma única mensagem pelo ID |
| POST | `/` | JWT | — | Salva mensagens (em lote). Envia atualizações em tempo real e dispara notificações. Atualizar uma mensagem existente exige ser o autor ou ter `content.edit`; o autor armazenado nunca pode ser reatribuído |
| POST | `/send` | Pública | — | Envia mensagens (em lote, público). Envia atualizações em tempo real via WebSocket e dispara notificações |
| POST | `/setCallout` | JWT | — | (legado) Transmite uma mensagem de destaque em tempo real. Sem cliente ativo; o chat de transmissão ao vivo não exibe mais destaques |
| DELETE | `/:churchId/:id` | JWT | — | Exclui uma mensagem e transmite a exclusão em tempo real. Consulte [Moderação de mensagens](#message-moderation) |

### Moderação de mensagens {#message-moderation}

A exclusão de uma mensagem é permitida para:

- o autor da mensagem;
- membros da equipe com `content.edit` (em qualquer lugar da igreja);
- **líderes de grupo**, para conversas com `contentType` de `group` ou `groupAnnouncement` cujo `contentId` seja um grupo que eles lideram (`leaderGroupIds` no JWT).

Conversas de anotações de pessoas (`person` / `personConfidential`) nunca são moderadas por líderes; elas usam as permissões de anotações (`people.edit`, `people.viewConfidentialNotes`).

Os líderes podem apenas excluir, não editar: reescrever a mensagem de outro membro continua restrito ao autor e à equipe com `content.edit`.

### Exemplo: Enviar uma mensagem

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

## Mensagens privadas

Caminho base: `/messaging/privatemessages`

| Método | Caminho | Autenticação | Permissão | Descrição |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | — | Carrega todas as mensagens privadas do usuário atual (inclui a última mensagem de cada conversa e marca todas como lidas) |
| GET | `/existing/:personId` | JWT | — | Localiza uma conversa privada existente com uma pessoa específica |
| GET | `/:id` | JWT | — | Carrega uma mensagem privada pelo ID (limpa a notificação se for endereçada ao usuário atual) |
| POST | `/` | JWT | — | Envia mensagens privadas (em lote). Dispara uma notificação push para o destinatário |

## Notificações

Caminho base: `/messaging/notifications`

| Método | Caminho | Autenticação | Permissão | Descrição |
|--------|------|------|------------|-------------|
| GET | `/unreadCount` | JWT | — | Obtém a quantidade de notificações não lidas do usuário atual |
| GET | `/my` | JWT | — | Carrega todas as notificações do usuário atual (marca todas como lidas) |
| GET | `/tmpEmail` | Pública | — | Dispara o resumo diário de notificações por e-mail (endpoint de depuração/cron) |
| GET | `/:churchId/person/:personId` | JWT | — | Carrega as notificações de uma pessoa específica |
| GET | `/:churchId/:id` | JWT | — | Carrega uma notificação pelo ID |
| POST | `/` | JWT | — | Cria ou atualiza notificações (em lote) |
| POST | `/create` | JWT | — | Cria notificações para várias pessoas. Corpo: `{ peopleIds, contentType, contentId, message, link }` |
| POST | `/markRead/:churchId/:personId` | JWT | — | Marca todas as notificações de uma pessoa como lidas |
| POST | `/sendTest` | JWT | — | Envia uma notificação push de teste. Corpo: `{ personId, title }` |
| POST | `/ping` | Pública | — | Cria uma notificação a partir de um gatilho externo. Corpo: `{ personId, churchId, contentType, contentId, message, triggeredByPersonId }` |
| DELETE | `/:churchId/:id` | JWT | — | Exclui uma notificação |

### Exemplo: Criar notificações

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

## Preferências de notificação

Caminho base: `/messaging/notificationpreferences`

| Método | Caminho | Autenticação | Permissão | Descrição |
|--------|------|------|------------|-------------|
| GET | `/categories` | JWT | — | Lista as categorias de notificação com seus canais padrão e permitidos |
| GET | `/my` | JWT | — | Carrega as preferências de notificação do usuário atual (cria os padrões automaticamente se não existirem) |
| POST | `/` | JWT | — | Salva as preferências do usuário atual. Corpo: qualquer um de `allowPush`, `allowSms`, `emailFrequency`, `masterMute`, `quietHoursStart`, `quietHoursEnd`, `timeZone`, `maxPushPerDay`, mais `overrides: [{ categoryKey, channel, optedIn }]` opcional (o canal pode ser `push`, `email`, `in_app` ou `sms`; categorias bloqueadas são ignoradas). `allowSms` é a permissão do membro para lembretes por mensagem de texto. Um corpo legado no formato de lista de linhas ainda é aceito |

## Conexões

Caminho base: `/messaging/connections`

Gerencia as conexões WebSocket/em tempo real para chat, conversas de grupos, mensagens privadas e transmissões ao vivo. Consulte [Arquitetura em tempo real](../../realtime) para o protocolo completo.

| Método | Caminho | Autenticação | Permissão | Descrição |
|--------|------|------|------------|-------------|
| GET | `/:churchId/:conversationId` | Pública | — | Carrega todas as conexões de uma conversa |
| POST | `/` | Pública | — | Registra conexões (em lote). Dispara uma transmissão de presença na conversa. Itens do corpo: `{ churchId, conversationId, socketId, displayName?, personId? }` |
| POST | `/setName` | Pública | — | Atualiza o nome de exibição de uma conexão pelo ID do socket. Corpo: `{ socketId, name }` |
| DELETE | `/:churchId/:conversationId/:socketId` | Pública | — | Remove uma conexão de uma conversa. Dispara uma transmissão de presença |
| POST | `/tmpSendAlert` | Pública | — | Envia um alerta de notificação para as conexões de uma pessoa. Corpo: `{ churchId, personId }` |

## Dispositivos

Caminho base: `/messaging/devices`

Gerencia o registro de dispositivos para notificações push e pareamento de conteúdo (por exemplo, o aplicativo Lessons em TVs).

| Método | Caminho | Autenticação | Permissão | Descrição |
|--------|------|------|------------|-------------|
| POST | `/enroll` | JWT | — | Registra ou atualiza um dispositivo (registro de push para celular). Localiza pelo token FCM ou pelo ID do dispositivo |
| POST | `/enrollAnon` | Pública | — | Registra um dispositivo anônimo e gera um código de pareamento de 4 caracteres |
| POST | `/` | Pública | — | Salva dispositivos (em lote) |
| GET | `/pair/:pairingCode` | JWT | — | Pareia um dispositivo usando seu código de pareamento. `?contentType=&contentId=` opcional para atribuir conteúdo |
| GET | `/status/:deviceId` | Pública | — | Verifica o status de pareamento de um dispositivo |
| GET | `/:churchId` | JWT | — | Carrega todos os dispositivos de uma igreja |
| GET | `/:churchId/person/:personId` | JWT | — | Carrega todos os dispositivos de uma pessoa |
| GET | `/:churchId/:id` | JWT | — | Carrega um dispositivo pelo ID |
| DELETE | `/:churchId/:id` | JWT | — | Exclui um dispositivo |

### Exemplo: Registrar um dispositivo

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

## Conteúdos de dispositivos

Caminho base: `/messaging/devicecontents`

Gerencia as atribuições de conteúdo para dispositivos pareados (por exemplo, qual lição é exibida em uma TV).

| Método | Caminho | Autenticação | Permissão | Descrição |
|--------|------|------|------------|-------------|
| GET | `/deviceId/:deviceId` | JWT | — | Carrega as atribuições de conteúdo de um dispositivo |
| POST | `/` | JWT | — | Salva as atribuições de conteúdo do dispositivo (em lote) |
| DELETE | `/:id` | JWT | — | Exclui uma atribuição de conteúdo de dispositivo |

## Envio de SMS

Caminho base: `/messaging/texting`

Gerencia os provedores de SMS, o envio de mensagens de texto para grupos e o acompanhamento de entregas.

| Método | Caminho | Autenticação | Permissão | Descrição |
|--------|------|------|------------|-------------|
| GET | `/providers` | JWT | — | Carrega os provedores de SMS da igreja (as credenciais ficam mascaradas) |
| GET | `/status` | JWT | — | `{ enabled }` — indica se a igreja tem um provedor de SMS ativo. Qualquer usuário autenticado da igreja; usado para mostrar as opções **Texto** somente quando for possível enviar mensagens de texto |
| GET | `/inboundUrl` | JWT | `texting.send` ou `settings.edit` | `{ url }` — a URL de webhook de entrada (STOP) da igreja para colar no provedor |
| POST | `/inbound/:churchId/:token` | Pública | — | Webhook de mensagens recebidas do provedor. `token` é um HMAC do ID da igreja. Uma resposta que seja exatamente uma palavra de parada (`STOP`, `STOPALL`, `UNSUBSCRIBE`, `CANCEL`, `END`, `QUIT`, `OPTOUT`, `REVOKE`) marca todas as pessoas correspondentes como `optedOut` e desativa o `allowSms` delas. Retorna `{ optedOut: <count> }`; outras respostas retornam `{ optedOut: 0 }` |
| GET | `/preview/:groupId` | JWT | — | Prévia dos destinatários de uma mensagem de texto para um grupo (contagens de elegíveis, que cancelaram o recebimento e sem telefone) |
| GET | `/sent` | JWT | — | Carrega todos os registros de mensagens de texto enviadas pela igreja |
| GET | `/sent/:id/details` | JWT | — | Carrega uma mensagem de texto enviada com os registros de entrega de cada destinatário |
| POST | `/providers` | JWT | — | Salva os provedores de SMS (em lote). Criptografa as credenciais de API |
| POST | `/send` | JWT | — | Envia um SMS para todos os membros elegíveis de um grupo. Corpo: `{ groupId, message }`. Os campos de mesclagem (`{{firstName}}`, `{{lastName}}`, `{{displayName}}`, `{{churchName}}`) são resolvidos para cada destinatário |
| POST | `/sendPerson` | JWT | — | Envia um SMS para uma única pessoa. Corpo: `{ personId, phoneNumber, message }`. Os campos de mesclagem são resolvidos, e o texto resolvido é o que fica registrado |
| DELETE | `/providers/:id` | JWT | — | Exclui um provedor de SMS |

### Exemplo: Enviar mensagem de texto para um grupo

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

## Modelos de e-mail

Caminho base: `/messaging/emailTemplates`

Gerencia modelos de e-mail reutilizáveis e o envio de e-mails com modelo para grupos.

| Método | Caminho | Autenticação | Permissão | Descrição |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | — | Carrega todos os modelos de e-mail da igreja |
| GET | `/:id` | JWT | — | Carrega um único modelo de e-mail pelo ID |
| GET | `/preview/:groupId` | JWT | — | Prévia da entrega de e-mails para um grupo (contagem de destinatários elegíveis, membros sem e-mail) |
| POST | `/` | JWT | — | Cria ou atualiza modelos de e-mail (em lote) |
| POST | `/send` | JWT | — | Envia um e-mail com modelo para todos os membros de um grupo. Corpo: `{ groupId, subject, htmlContent }` |
| DELETE | `/:id` | JWT | — | Exclui um modelo de e-mail |

### Exemplo: Enviar e-mail para um grupo

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

**Campos de mesclagem compatíveis:** `{{firstName}}`, `{{lastName}}`, `{{displayName}}`, `{{email}}`, `{{churchName}}`

## IPs bloqueados

Caminho base: `/messaging/blockedips`

(legado) Bloqueio de IPs para o chat de transmissão ao vivo. O cliente B1App não chama mais `POST /` — o bloqueio de IPs foi removido na migração para entrega unificada. A rota `/clear` ainda é chamada de servidor para servidor pelo `StreamingServiceController` quando os serviços de transmissão são salvos.

| Método | Caminho | Autenticação | Permissão | Descrição |
|--------|------|------|------------|-------------|
| POST | `/` | JWT | — | (legado) Salva IPs bloqueados (em lote). Sem cliente ativo |
| POST | `/clear` | JWT | — | Limpa todos os IPs bloqueados de serviços específicos. Corpo: `[{ serviceId, churchId }]` |

## Registros de entrega

Caminho base: `/messaging/deliverylogs`

Acompanha o status de entrega das mensagens enviadas (SMS, notificações push e e-mail).

| Método | Caminho | Autenticação | Permissão | Descrição |
|--------|------|------|------------|-------------|
| GET | `/content/:contentType/:contentId` | JWT | — | Carrega os registros de entrega por tipo de conteúdo e ID |
| GET | `/person/:personId` | JWT | — | Carrega os registros de entrega de uma pessoa. `?startDate=&endDate=` opcionais para filtrar |
| GET | `/recent` | JWT | — | Carrega os registros de entrega mais recentes da igreja. `?limit=` opcional (padrão 100) |
| GET | `/:id` | JWT | — | Carrega um registro de entrega pelo ID |

## Páginas relacionadas

- [Arquitetura em tempo real](../../realtime) -- protocolo WebSocket, assinaturas de salas e a estrutura de entrega unificada
- [Notificações Push na Web](../../web-push) -- registro e entrega de notificações push no navegador
- [Endpoints de Membros](./membership) -- pessoas, grupos, funções e identidade central
- [Endpoints de Presença](./attendance) -- registro de cultos e visitas
- [Autenticação e Permissões](./authentication) -- fluxo de login, JWT, OAuth, modelo de permissões
- [Estrutura do módulo](../module-structure) -- padrões de organização do código
