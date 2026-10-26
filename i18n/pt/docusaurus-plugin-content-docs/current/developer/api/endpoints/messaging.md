---
title: "Endpoints de Mensagens"
---

# Endpoints de Mensagens

<div class="article-intro">

O módulo Messaging gerencia conversas em tempo real, mensagens de chat, notificações push, entrega de SMS e e-mail, conexões WebSocket, mensagens privadas, registro de dispositivos e provedores de mensagens de texto. Ele oferece a camada de comunicação usada em todos os aplicativos do ChurchApps, tanto para o chat de transmissões ao vivo quanto para notificações assíncronas.

</div>

**Caminho base:** `/messaging`

## Conversas

Caminho base: `/messaging/conversations`

| Método | Caminho | Autenticação | Permissão | Descrição |
|--------|---------|--------------|-----------|-----------|
| GET | `/timeline/ids?ids=` | JWT | — | Carregar conversas por IDs separados por vírgula, com a primeira e a última mensagem |
| GET | `/messages/:contentType/:contentId` | JWT | — | Carregar conversas de um conteúdo com mensagens paginadas (`?page=&limit=`) |
| GET | `/posts` | JWT | — | Obter conversas do tipo publicação dos grupos do usuário atual |
| GET | `/posts/group/:groupId` | JWT | — | Obter conversas do tipo publicação de um grupo específico |
| GET | `/notes/feed?section=&limit=&before=` | JWT | — | Notas mais recentes de todos os registros, para a página de Notas do B1 Admin. `section` é `people`, `groups`, `events` ou `workflows` (caso contrário, 400); `limit` tem padrão 25 (máximo 100); `before` é o cursor da página anterior. Cada nota ainda passa pela regra do próprio tipo (permissão People Edit / de notas confidenciais, líderes do grupo, visualizadores de eventos, visualizadores de cards de fluxo de trabalho), de modo que quem chama só vê notas que poderia abrir. O texto da nota é cortado em 300 caracteres |
| GET | `/current/:churchId/:contentType/:contentId` | Público | — | Obter ou criar a conversa atual de um conteúdo (descriptografa o contentId automaticamente) |
| GET | `/:churchId/:contentType/:contentId` | Público | — | Carregar conversas por tipo de conteúdo e ID |
| GET | `/:churchId/:id` | Público | — | Carregar uma única conversa pelo ID |
| POST | `/` | JWT | — | Criar ou atualizar conversas (em lote) |
| POST | `/start` | JWT | — | Iniciar uma nova conversa com uma mensagem de comentário inicial |
| DELETE | `/:churchId/:id` | JWT | — | Excluir uma conversa |

### Controle de acesso às notas de pessoas

Conversas com `contentType: "person"` (a aba Notas de um registro de pessoa) ou `contentType: "personConfidential"` (a seção Notas Confidenciais) são controladas em todos os caminhos de leitura e escrita, inclusive nas rotas públicas acima, que retornam `401` para esses tipos de conteúdo. `person` exige a permissão **People / Edit** do MembershipApi; `personConfidential` exige **People / View Confidential Notes**. Para chaves de API com escopo, `people:write` abrange ambas as ações (o usuário da chave ainda precisa ter a permissão de função subjacente).

### Controle de acesso às notas de grupos e eventos {#group-and-event-notes-access-control}

Mais dois tipos de conteúdo de notas são controlados da mesma forma, em todos os caminhos de leitura e escrita (inclusive nas rotas públicas acima), e nunca ficam abertos a postagens anônimas:

- **`groupNote`** (`contentId` = ID do grupo) -- o feed de **Notas de líderes** de um grupo. Somente os líderes desse grupo (`leaderGroupIds` no JWT) podem ler ou postar. Nenhuma permissão de equipe concede acesso, incluindo `content.edit` e as permissões de participação em grupos.
- **`eventNote`** (`contentId` = ID do evento) -- as notas de um evento do calendário. Equipe com `content.edit` ou **Calendars / Admin** sempre pode ler e postar. Caso contrário, o acesso segue o `notesViewRole` (leitura) e o `notesPostRole` (postagem) do evento: `staff` (o padrão, usado quando o campo é `null`) não permite a mais ninguém; `leaders` permite os líderes do grupo do evento; e `members` permite os membros e líderes do grupo do evento. Um evento sem `groupId` é restrito à equipe.

### Controle de acesso às notas de cards de fluxo de trabalho

Conversas com `contentType: "workflowCard"` (as notas de um card de fluxo de trabalho, em que `contentId` é o ID da tarefa do card) só podem ser lidas e escritas por quem pode abrir esse card: um usuário com a permissão **Tasks / View** do DoingApi, ou a pessoa ou o grupo ao qual o card está atribuído, pelo qual foi criado ou ao qual se refere. Todos os outros recebem `401` em qualquer caminho de leitura, inclusive nas rotas públicas acima. A conversa de um card é associada por meio do próprio card, com `POST /doing/tasks/:id/conversation` (corpo `{ "conversationId": "..." }`; a primeira conversa associada prevalece), que podem ser chamados pelos editores do card e pelo responsável atribuído.

### Exemplo: iniciar uma conversa

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
|--------|---------|--------------|-----------|-----------|
| GET | `/conversation/:conversationId` | JWT | — | Carregar todas as mensagens de uma conversa |
| GET | `/catchup/:churchId/:conversationId` | Público | — | Carregar todas as mensagens de uma conversa (recuperação pública para o chat ao vivo) |
| GET | `/:churchId/:id` | Público | — | Carregar uma única mensagem pelo ID |
| POST | `/` | JWT | — | Salvar mensagens (em lote). Envia atualizações em tempo real e aciona notificações. Atualizar uma mensagem existente exige ser o autor ou ter `content.edit`; o autor armazenado nunca pode ser alterado |
| POST | `/send` | Público | — | Enviar mensagens (em lote, público). Envia atualizações em tempo real via WebSocket e aciona notificações |
| POST | `/setCallout` | JWT | — | (legado) Transmitir em tempo real uma mensagem de destaque. Nenhum cliente ativo; o chat da transmissão ao vivo não exibe mais destaques |
| DELETE | `/:churchId/:id` | JWT | — | Excluir uma mensagem e transmitir a exclusão em tempo real. Consulte [Moderação de mensagens](#message-moderation) |

### Moderação de mensagens {#message-moderation}

A exclusão de uma mensagem é permitida para:

- o autor da mensagem;
- a equipe com `content.edit` (em qualquer lugar da igreja);
- **líderes de grupo**, para conversas com `contentType` `group` ou `groupAnnouncement` cujo `contentId` seja um grupo que eles lideram (`leaderGroupIds` no JWT).

Conversas de notas de pessoas (`person` / `personConfidential`) nunca são moderadas por líderes -- usam as permissões de notas (`people.edit`, `people.viewConfidentialNotes`).

Líderes podem apenas excluir, não editar: reescrever a mensagem de outro membro continua restrito ao autor e à equipe com `content.edit`.

### Exemplo: enviar uma mensagem

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
|--------|---------|--------------|-----------|-----------|
| GET | `/` | JWT | — | Carregar todas as mensagens privadas do usuário atual (inclui a última mensagem de cada conversa e marca todas como lidas) |
| GET | `/existing/:personId` | JWT | — | Localizar uma conversa privada existente com uma pessoa específica |
| GET | `/:id` | JWT | — | Carregar uma mensagem privada pelo ID (limpa a notificação se for endereçada ao usuário atual) |
| POST | `/` | JWT | — | Enviar mensagens privadas (em lote). Dispara notificação push para o destinatário |

## Notificações

Caminho base: `/messaging/notifications`

| Método | Caminho | Autenticação | Permissão | Descrição |
|--------|---------|--------------|-----------|-----------|
| GET | `/unreadCount` | JWT | — | Obter a quantidade de notificações não lidas do usuário atual |
| GET | `/my` | JWT | — | Carregar todas as notificações do usuário atual (marca todas como lidas) |
| GET | `/tmpEmail` | Público | — | Acionar o resumo diário de notificações por e-mail (endpoint de depuração/cron) |
| GET | `/:churchId/person/:personId` | JWT | — | Carregar notificações de uma pessoa específica |
| GET | `/:churchId/:id` | JWT | — | Carregar uma notificação pelo ID |
| POST | `/` | JWT | — | Criar ou atualizar notificações (em lote) |
| POST | `/create` | JWT | — | Criar notificações para várias pessoas. Corpo: `{ peopleIds, contentType, contentId, message, link }` |
| POST | `/markRead/:churchId/:personId` | JWT | — | Marcar todas as notificações de uma pessoa como lidas |
| POST | `/sendTest` | JWT | — | Enviar uma notificação push de teste. Corpo: `{ personId, title }` |
| POST | `/ping` | Público | — | Criar uma notificação a partir de um gatilho externo. Corpo: `{ personId, churchId, contentType, contentId, message, triggeredByPersonId }` |
| DELETE | `/:churchId/:id` | JWT | — | Excluir uma notificação |

### Exemplo: criar notificações

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
|--------|---------|--------------|-----------|-----------|
| GET | `/categories` | JWT | — | Listar as categorias de notificação com seus canais padrão e permitidos |
| GET | `/my` | JWT | — | Carregar as preferências de notificação do usuário atual (cria os padrões automaticamente se não existirem) |
| POST | `/` | JWT | — | Salvar as preferências do usuário atual. Corpo: qualquer um de `allowPush`, `allowSms`, `emailFrequency`, `masterMute`, `quietHoursStart`, `quietHoursEnd`, `timeZone`, `maxPushPerDay`, mais `overrides: [{ categoryKey, channel, optedIn }]` opcional (o canal pode ser `push`, `email`, `in_app` ou `sms`; categorias bloqueadas são ignoradas). `allowSms` é a autorização do membro para lembretes por texto. Ainda é aceito o corpo legado em formato de array de linhas |

## Conexões

Caminho base: `/messaging/connections`

Gerencia as conexões WebSocket/em tempo real para chat, conversas de grupos, mensagens privadas e transmissões ao vivo. Consulte [Arquitetura em tempo real](../../realtime) para o protocolo completo de ponta a ponta.

| Método | Caminho | Autenticação | Permissão | Descrição |
|--------|---------|--------------|-----------|-----------|
| GET | `/:churchId/:conversationId` | Público | — | Carregar todas as conexões de uma conversa |
| POST | `/` | Público | — | Registrar conexões (em lote). Aciona uma transmissão de presença na conversa. Itens do corpo: `{ churchId, conversationId, socketId, displayName?, personId? }` |
| POST | `/setName` | Público | — | Atualizar o nome de exibição de uma conexão pelo ID do socket. Corpo: `{ socketId, name }` |
| DELETE | `/:churchId/:conversationId/:socketId` | Público | — | Remover uma conexão de uma conversa. Aciona uma transmissão de presença |
| POST | `/tmpSendAlert` | Público | — | Enviar um alerta de notificação para as conexões de uma pessoa. Corpo: `{ churchId, personId }` |

## Dispositivos

Caminho base: `/messaging/devices`

Gerencia o registro de dispositivos para notificações push e pareamento de conteúdo (por exemplo, o aplicativo Lessons em telas de TV).

| Método | Caminho | Autenticação | Permissão | Descrição |
|--------|---------|--------------|-----------|-----------|
| POST | `/enroll` | JWT | — | Registrar ou atualizar um dispositivo (registro de push móvel). Localiza por token FCM ou ID do dispositivo |
| POST | `/enrollAnon` | Público | — | Registrar um dispositivo anônimo e gerar um código de pareamento de 4 caracteres |
| POST | `/` | Público | — | Salvar dispositivos (em lote) |
| GET | `/pair/:pairingCode` | JWT | — | Parear um dispositivo usando seu código de pareamento. `?contentType=&contentId=` opcionais para atribuir conteúdo |
| GET | `/status/:deviceId` | Público | — | Verificar o status de pareamento de um dispositivo |
| GET | `/:churchId` | JWT | — | Carregar todos os dispositivos de uma igreja |
| GET | `/:churchId/person/:personId` | JWT | — | Carregar todos os dispositivos de uma pessoa |
| GET | `/:churchId/:id` | JWT | — | Carregar um dispositivo pelo ID |
| DELETE | `/:churchId/:id` | JWT | — | Excluir um dispositivo |

### Exemplo: registrar um dispositivo

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
|--------|---------|--------------|-----------|-----------|
| GET | `/deviceId/:deviceId` | JWT | — | Carregar as atribuições de conteúdo de um dispositivo |
| POST | `/` | JWT | — | Salvar atribuições de conteúdo de dispositivos (em lote) |
| DELETE | `/:id` | JWT | — | Excluir uma atribuição de conteúdo de dispositivo |

## Mensagens de texto

Caminho base: `/messaging/texting`

Gerencia provedores de SMS, envio de mensagens de texto para grupos e acompanhamento de entrega.

| Método | Caminho | Autenticação | Permissão | Descrição |
|--------|---------|--------------|-----------|-----------|
| GET | `/providers` | JWT | — | Carregar os provedores de texto da igreja (as credenciais são mascaradas) |
| GET | `/status` | JWT | — | `{ enabled }` -- indica se a igreja tem um provedor de texto habilitado. Qualquer usuário autenticado da igreja; usado para exibir as opções **Text** somente quando for possível enviar mensagens |
| GET | `/inboundUrl` | JWT | `texting.send` ou `settings.edit` | `{ url }` -- a URL de webhook de entrada (STOP) da igreja, para colar no provedor |
| POST | `/inbound/:churchId/:token` | Público | — | Webhook de mensagens de entrada do provedor. `token` é um HMAC do ID da igreja. Uma resposta que seja exatamente uma palavra de parada (`STOP`, `STOPALL`, `UNSUBSCRIBE`, `CANCEL`, `END`, `QUIT`, `OPTOUT`, `REVOKE`) marca todas as pessoas correspondentes como `optedOut` e desativa o `allowSms` delas. Retorna `{ optedOut: <count> }`; outras respostas retornam `{ optedOut: 0 }` |
| GET | `/preview/:groupId` | JWT | — | Visualizar os destinatários de uma mensagem de texto para um grupo (contagens de elegíveis, com opt-out e sem telefone) |
| GET | `/sent` | JWT | — | Carregar todos os registros de mensagens de texto enviadas da igreja |
| GET | `/sent/:id/details` | JWT | — | Carregar uma mensagem de texto enviada com os registros de entrega por destinatário |
| POST | `/providers` | JWT | — | Salvar provedores de texto (em lote). Criptografa as credenciais de API |
| POST | `/send` | JWT | — | Enviar um SMS para todos os membros elegíveis de um grupo. Corpo: `{ groupId, message }`. Os campos de mesclagem (`{{firstName}}`, `{{lastName}}`, `{{displayName}}`, `{{churchName}}`) são resolvidos para cada destinatário |
| POST | `/sendPerson` | JWT | — | Enviar um SMS para uma única pessoa. Corpo: `{ personId, phoneNumber, message }`. Os campos de mesclagem são resolvidos, e o texto resolvido é o que fica registrado |
| DELETE | `/providers/:id` | JWT | — | Excluir um provedor de texto |

### Exemplo: enviar mensagem de texto para um grupo

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
|--------|---------|--------------|-----------|-----------|
| GET | `/` | JWT | — | Carregar todos os modelos de e-mail da igreja |
| GET | `/:id` | JWT | — | Carregar um modelo de e-mail pelo ID |
| GET | `/sendStatus` | JWT | `groupMembers.edit` ou `tasks.admin` | O status de e-mail de grupos da igreja: `{ approved, paused, remaining, requested }`. O diálogo Send Email do B1Admin e a ação **Send email** do fluxo de trabalho o utilizam para alertar quando o e-mail não será enviado |
| POST | `/requestApproval` | JWT | `groupMembers.edit` | Pedir ao suporte a aprovação da igreja para e-mails de grupos (no máximo uma vez por igreja por semana) |
| GET | `/preview/:groupId` | JWT | — | Visualizar a entrega de e-mail para um grupo (contagem de destinatários elegíveis, membros sem e-mail) |
| POST | `/` | JWT | — | Criar ou atualizar modelos de e-mail (em lote) |
| POST | `/send` | JWT | — | Enviar um e-mail com modelo para todos os membros de um grupo. Corpo: `{ groupId, subject, htmlContent }` |
| DELETE | `/:id` | JWT | — | Excluir um modelo de e-mail |

### Exemplo: enviar e-mail para um grupo

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

(legado) Bloqueio de IP para o chat de transmissões ao vivo. O cliente B1App não chama mais `POST /` -- o bloqueio de IP foi removido na migração para entrega unificada. A rota `/clear` ainda é invocada de servidor para servidor pelo `StreamingServiceController` quando os serviços de transmissão são salvos.

| Método | Caminho | Autenticação | Permissão | Descrição |
|--------|---------|--------------|-----------|-----------|
| POST | `/` | JWT | — | (legado) Salvar IPs bloqueados (em lote). Nenhum cliente ativo |
| POST | `/clear` | JWT | — | Limpar todos os IPs bloqueados de serviços específicos. Corpo: `[{ serviceId, churchId }]` |

## Registros de entrega

Caminho base: `/messaging/deliverylogs`

Acompanha o status de entrega das mensagens enviadas (SMS, notificações push e e-mail).

| Método | Caminho | Autenticação | Permissão | Descrição |
|--------|---------|--------------|-----------|-----------|
| GET | `/content/:contentType/:contentId` | JWT | — | Carregar registros de entrega por tipo de conteúdo e ID |
| GET | `/person/:personId` | JWT | — | Carregar registros de entrega de uma pessoa. `?startDate=&endDate=` opcionais para filtrar |
| GET | `/recent` | JWT | — | Carregar os registros de entrega recentes da igreja. `?limit=` opcional (padrão 100) |
| GET | `/:id` | JWT | — | Carregar um registro de entrega pelo ID |

## Páginas relacionadas

- [Arquitetura em tempo real](../../realtime) -- protocolo WebSocket, assinaturas de salas e a estrutura de entrega unificada
- [Notificações push na web](../../web-push) -- Cadastro e entrega de push no navegador
- [Endpoints de Membresia](./membership) -- Pessoas, grupos, funções e identidade central
- [Endpoints de Presença](./attendance) -- Rastreamento de cultos e visitas
- [Autenticação e Permissões](./authentication) -- Fluxo de login, JWT, OAuth, modelo de permissões
- [Estrutura do módulo](../module-structure) -- Padrões de organização do código
