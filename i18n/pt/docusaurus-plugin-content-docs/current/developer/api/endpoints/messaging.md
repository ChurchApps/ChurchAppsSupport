---
title: "Endpoints de Mensagens"
description: "Referência dos endpoints da API de mensagens do ChurchApps: conversas, regras de acesso às notas, mensagens de texto, modelos de e-mail, notificações e dispositivos."
---

# Endpoints de Mensagens

<div class="article-intro">

O módulo de Mensagens gerencia conversas em tempo real, mensagens de chat, notificações push, entrega de SMS e e-mail, conexões WebSocket, mensagens privadas, registro de dispositivos e provedores de envio de mensagens de texto. Ele fornece a camada de comunicação usada em todos os aplicativos ChurchApps, tanto para o chat de transmissões ao vivo quanto para notificações assíncronas.

</div>

**Caminho base:** `/messaging`

## Conversas

Caminho base: `/messaging/conversations`

| Método | Caminho | Autenticação | Permissão | Descrição |
|--------|---------|--------------|-----------|-----------|
| GET | `/timeline/ids?ids=` | JWT | — | Carrega conversas por IDs separados por vírgula, com a primeira e a última mensagem |
| GET | `/messages/:contentType/:contentId` | JWT | — | Carrega conversas de um conteúdo com mensagens paginadas (`?page=&limit=`) |
| GET | `/posts` | JWT | — | Obtém conversas do tipo publicação dos grupos do usuário atual |
| GET | `/posts/group/:groupId` | JWT | — | Obtém conversas do tipo publicação de um grupo específico |
| GET | `/notes/feed?section=&limit=&before=` | JWT | — | Notas mais recentes de todos os registros, para a página de Notas do B1 Admin. `section` pode ser `people`, `groups`, `events` ou `workflows` (retorna 400 em outros casos); `limit` tem padrão 25 (máximo 100); `before` é o cursor da página anterior. Cada nota ainda precisa passar pela regra do seu próprio tipo (permissão de Pessoas / Editar ou notas confidenciais, líderes do grupo, visualizadores de eventos, visualizadores de cards de fluxo de trabalho), então quem chama só vê notas que poderia abrir. O texto da nota é cortado em 300 caracteres |
| GET | `/current/:churchId/:contentType/:contentId` | Pública | — | Obtém ou cria a conversa atual para um conteúdo (descriptografa o contentId automaticamente) |
| GET | `/:churchId/:contentType/:contentId` | Pública | — | Carrega conversas por tipo de conteúdo e ID |
| GET | `/:churchId/:id` | Pública | — | Carrega uma única conversa pelo ID |
| POST | `/` | JWT | — | Cria ou atualiza conversas (em lote) |
| POST | `/start` | JWT | — | Inicia uma nova conversa com uma mensagem de comentário inicial |
| DELETE | `/:churchId/:id` | JWT | — | Exclui uma conversa |

### Controle de acesso às notas de pessoas

Conversas com `contentType: "person"` (a aba Notas de um registro de pessoa) ou `contentType: "personConfidential"` (a seção de Notas Confidenciais) são protegidas em todos os caminhos de leitura e escrita, incluindo as rotas públicas acima, que retornam `401` para esses tipos de conteúdo. `person` exige a permissão **Pessoas / Editar** da API de Membros; `personConfidential` exige **Pessoas / Ver Notas Confidenciais**. Para chaves de API com escopo, `people:write` cobre as duas ações (o usuário da chave ainda precisa ter a permissão do papel subjacente).

### Controle de acesso às notas de grupos e eventos {#group-and-event-notes-access-control}

Outros dois tipos de nota são protegidos da mesma forma, em todos os caminhos de leitura e escrita (incluindo as rotas públicas acima), e nunca ficam abertos para publicação anônima:

- **`groupNote`** (`contentId` = ID do grupo) -- o feed de **Notas dos líderes** de um grupo. Somente os líderes desse grupo (`leaderGroupIds` no JWT) podem ler ou publicar. Nenhuma permissão de equipe concede acesso, incluindo `content.edit` e as permissões de participação em grupos.
- **`eventNote`** (`contentId` = ID do evento) -- as notas de um evento do calendário. A equipe com `content.edit` ou **Calendários / Administrador** sempre pode ler e publicar. Caso contrário, o acesso segue os campos `notesViewRole` (leitura) e `notesPostRole` (publicação) do evento: `staff` (o padrão, usado quando o campo é `null`) não permite acesso a mais ninguém; `leaders` permite os líderes do grupo do evento; e `members` permite os membros e líderes do grupo do evento. Um evento sem `groupId` é restrito à equipe.

### Controle de acesso às notas de cards de fluxo de trabalho

Conversas com `contentType: "workflowCard"` (as notas de um card de fluxo de trabalho, em que `contentId` é o ID da tarefa do card) só podem ser lidas e escritas por quem pode abrir esse card: um usuário com a permissão **Tarefas / Ver** da API de Doing, ou a pessoa ou grupo ao qual o card está atribuído, do qual foi criado ou ao qual se refere. Todos os demais recebem `401` em qualquer caminho de leitura, incluindo as rotas públicas acima. A conversa de um card é vinculada através do próprio card, com `POST /doing/tasks/:id/conversation` (corpo `{ "conversationId": "..." }`; a primeira conversa vinculada prevalece), que pode ser chamado pelos editores do card e pelo seu responsável.

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
|--------|---------|--------------|-----------|-----------|
| GET | `/conversation/:conversationId` | JWT | — | Carrega todas as mensagens de uma conversa |
| GET | `/catchup/:churchId/:conversationId` | Pública | — | Carrega todas as mensagens de uma conversa (recuperação pública para chat ao vivo) |
| GET | `/:churchId/:id` | Pública | — | Carrega uma única mensagem pelo ID |
| POST | `/` | JWT | — | Salva mensagens (em lote). Envia atualizações em tempo real e dispara notificações. Atualizar uma mensagem existente exige ser o autor ou ter `content.edit`; o autor armazenado nunca pode ser alterado |
| POST | `/send` | Pública | — | Envia mensagens (em lote, público). Envia atualizações em tempo real via WebSocket e dispara notificações |
| POST | `/setCallout` | JWT | — | (legado) Transmite uma mensagem de destaque em tempo real. Não há cliente ativo; o chat de transmissão ao vivo não exibe mais destaques |
| DELETE | `/:churchId/:id` | JWT | — | Exclui uma mensagem e transmite a exclusão em tempo real. Veja [Moderação de mensagens](#message-moderation) |

### Moderação de mensagens

A exclusão de uma mensagem é permitida para:

- o autor da mensagem;
- a equipe com `content.edit` (em toda a igreja);
- **líderes de grupo**, para conversas com `contentType` de `group` ou `groupAnnouncement` cujo `contentId` seja um grupo que eles lideram (`leaderGroupIds` no JWT).

Conversas de notas de pessoas (`person` / `personConfidential`) nunca são moderadas por líderes; elas usam as permissões de notas (`people.edit`, `people.viewConfidentialNotes`).

Os líderes podem excluir, mas não editar: reescrever a mensagem de outro membro continua restrito ao autor e à equipe com `content.edit`.

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

## Mensagens Privadas

Caminho base: `/messaging/privatemessages`

| Método | Caminho | Autenticação | Permissão | Descrição |
|--------|---------|--------------|-----------|-----------|
| GET | `/` | JWT | — | Carrega todas as mensagens privadas do usuário atual (inclui a última mensagem de cada conversa e marca todas como lidas) |
| GET | `/existing/:personId` | JWT | — | Localiza uma conversa privada existente com uma pessoa específica |
| GET | `/:id` | JWT | — | Carrega uma mensagem privada pelo ID (limpa a notificação, se for endereçada ao usuário atual) |
| POST | `/` | JWT | — | Envia mensagens privadas (em lote). Dispara notificação push para o destinatário |

## Notificações

Caminho base: `/messaging/notifications`

| Método | Caminho | Autenticação | Permissão | Descrição |
|--------|---------|--------------|-----------|-----------|
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

## Preferências de Notificação

Caminho base: `/messaging/notificationpreferences`

| Método | Caminho | Autenticação | Permissão | Descrição |
|--------|---------|--------------|-----------|-----------|
| GET | `/categories` | JWT | — | Lista as categorias de notificação com seus canais padrão e permitidos |
| GET | `/my` | JWT | — | Carrega as preferências de notificação do usuário atual (cria os padrões automaticamente, se não existirem) |
| POST | `/` | JWT | — | Salva as preferências do usuário atual. Corpo: qualquer um dos campos `allowPush`, `allowSms`, `emailFrequency`, `masterMute`, `quietHoursStart`, `quietHoursEnd`, `timeZone`, `maxPushPerDay`, além de `overrides: [{ categoryKey, channel, optedIn }]` opcional (o canal pode ser `push`, `email`, `in_app` ou `sms`; categorias bloqueadas são ignoradas). `allowSms` é a permissão do membro para receber lembretes por mensagem de texto. Ainda é aceito o formato legado de lista de linhas |

## Conexões

Caminho base: `/messaging/connections`

Gerencia as conexões WebSocket/em tempo real para chat, conversas de grupos, mensagens privadas e transmissões ao vivo. Veja [Arquitetura em Tempo Real](../../realtime.md) para o protocolo completo.

| Método | Caminho | Autenticação | Permissão | Descrição |
|--------|---------|--------------|-----------|-----------|
| GET | `/:churchId/:conversationId` | Pública | — | Carrega todas as conexões de uma conversa |
| POST | `/` | Pública | — | Registra conexões (em lote). Dispara uma transmissão de presença na conversa. Itens do corpo: `{ churchId, conversationId, socketId, displayName?, personId? }` |
| POST | `/setName` | Pública | — | Atualiza o nome de exibição de uma conexão pelo ID do socket. Corpo: `{ socketId, name }` |
| DELETE | `/:churchId/:conversationId/:socketId` | Pública | — | Remove uma conexão de uma conversa. Dispara uma transmissão de presença |
| POST | `/tmpSendAlert` | Pública | — | Envia um alerta de notificação para as conexões de uma pessoa. Corpo: `{ churchId, personId }` |

## Dispositivos

Caminho base: `/messaging/devices`

Gerencia o registro de dispositivos para notificações push e pareamento de conteúdo (por exemplo, o aplicativo Lessons em telas de TV).

| Método | Caminho | Autenticação | Permissão | Descrição |
|--------|---------|--------------|-----------|-----------|
| POST | `/enroll` | JWT | — | Registra ou atualiza um dispositivo (registro de push para celular). Localiza o dispositivo pelo token FCM ou pelo ID do dispositivo |
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
  "appName": "B1App",
  "label": "John's iPhone",
  "deviceInfo": "iOS 17, iPhone 15"
}
```

```json
{
  "id": "device-001",
  "churchId": "church-789",
  "fcmToken": "firebase-token-abc123",
  "appName": "B1App",
  "label": "John's iPhone",
  "registrationDate": "2026-02-17T10:00:00.000Z",
  "lastActiveDate": "2026-02-17T10:00:00.000Z"
}
```

## Conteúdos de Dispositivos

Caminho base: `/messaging/devicecontents`

Gerencia as atribuições de conteúdo para dispositivos pareados (por exemplo, qual lição é exibida em uma TV).

| Método | Caminho | Autenticação | Permissão | Descrição |
|--------|---------|--------------|-----------|-----------|
| GET | `/deviceId/:deviceId` | JWT | — | Carrega as atribuições de conteúdo de um dispositivo |
| POST | `/` | JWT | — | Salva as atribuições de conteúdo dos dispositivos (em lote) |
| DELETE | `/:id` | JWT | — | Exclui uma atribuição de conteúdo de dispositivo |

## Mensagens de Texto (SMS)

Caminho base: `/messaging/texting`

Gerencia provedores de SMS, envio de mensagens de texto para grupos e acompanhamento de entregas.

| Método | Caminho | Autenticação | Permissão | Descrição |
|--------|---------|--------------|-----------|-----------|
| GET | `/providers` | JWT | — | Carrega os provedores de texto da igreja (as credenciais são mascaradas) |
| GET | `/status` | JWT | — | `{ enabled }` — indica se a igreja tem um provedor de texto habilitado. Qualquer usuário autenticado da igreja pode consultar; usado para exibir as opções **Texto** somente quando as mensagens podem ser enviadas |
| GET | `/inboundUrl` | JWT | `texting.send` ou `settings.edit` | `{ url }` — a URL de webhook de entrada (STOP) da igreja, a ser colada no provedor |
| POST | `/inbound/:churchId/:token` | Pública | — | Webhook de mensagens recebidas do provedor. `token` é um HMAC do ID da igreja. Uma resposta que seja exatamente uma palavra de descadastro (`STOP`, `STOPALL`, `UNSUBSCRIBE`, `CANCEL`, `END`, `QUIT`, `OPTOUT`, `REVOKE`) marca todas as pessoas correspondentes como `optedOut` e desativa o `allowSms` delas. Retorna `{ optedOut: <count> }`; outras respostas retornam `{ optedOut: 0 }` |
| GET | `/preview/:groupId` | JWT | — | Prévia dos destinatários de uma mensagem de texto para grupo (contagens de elegíveis, descadastrados e sem telefone) |
| GET | `/sent` | JWT | — | Carrega todos os registros de mensagens de texto enviadas pela igreja |
| GET | `/sent/:id/details` | JWT | — | Carrega uma mensagem de texto enviada com os registros de entrega por destinatário |
| POST | `/providers` | JWT | — | Salva provedores de texto (em lote). Criptografa as credenciais da API |
| POST | `/send` | JWT | — | Envia um SMS para todos os membros elegíveis de um grupo. Corpo: `{ groupId, message }`. Os campos de mesclagem (`{{firstName}}`, `{{lastName}}`, `{{displayName}}`, `{{churchName}}`) são resolvidos para cada destinatário |
| POST | `/sendPerson` | JWT | — | Envia um SMS para uma única pessoa. Corpo: `{ personId, phoneNumber, message }`. Os campos de mesclagem são resolvidos, e o texto resolvido é o que fica registrado |
| DELETE | `/providers/:id` | JWT | — | Exclui um provedor de texto |

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

## Modelos de E-mail

Caminho base: `/messaging/emailTemplates`

Gerencia modelos de e-mail reutilizáveis e o envio de e-mails com modelo para grupos.

| Método | Caminho | Autenticação | Permissão | Descrição |
|--------|---------|--------------|-----------|-----------|
| GET | `/` | JWT | — | Carrega todos os modelos de e-mail da igreja |
| GET | `/:id` | JWT | — | Carrega um modelo de e-mail pelo ID |
| GET | `/sendStatus` | JWT | `groupMembers.edit` ou `tasks.admin` | Status de e-mail de grupos da igreja: `{ approved, paused, remaining, requested }`. O diálogo Enviar E-mail do B1Admin e a ação **Enviar e-mail** do fluxo de trabalho usam esse dado para avisar quando o e-mail não será enviado |
| POST | `/requestApproval` | JWT | `groupMembers.edit` | Pede ao suporte a aprovação da igreja para e-mails de grupo (no máximo uma vez por igreja por semana) |
| GET | `/preview/:groupId` | JWT | — | Prévia da entrega de e-mail para um grupo (quantidade de destinatários elegíveis, membros sem e-mail) |
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

## IPs Bloqueados

Caminho base: `/messaging/blockedips`

(legado) Bloqueio de IPs para o chat de transmissões ao vivo. O cliente B1App não chama mais `POST /` — o bloqueio de IPs foi removido na migração para entrega unificada. A rota `/clear` ainda é invocada de servidor para servidor pelo `StreamingServiceController` quando os serviços de transmissão são salvos.

| Método | Caminho | Autenticação | Permissão | Descrição |
|--------|---------|--------------|-----------|-----------|
| POST | `/` | JWT | — | (legado) Salva IPs bloqueados (em lote). Não há cliente ativo |
| POST | `/clear` | JWT | — | Limpa todos os IPs bloqueados de serviços específicos. Corpo: `[{ serviceId, churchId }]` |

## Registros de Entrega

Caminho base: `/messaging/deliverylogs`

Acompanha o status de entrega das mensagens enviadas (SMS, notificações push e e-mail).

| Método | Caminho | Autenticação | Permissão | Descrição |
|--------|---------|--------------|-----------|-----------|
| GET | `/content/:contentType/:contentId` | JWT | — | Carrega os registros de entrega por tipo de conteúdo e ID |
| GET | `/person/:personId` | JWT | — | Carrega os registros de entrega de uma pessoa. `?startDate=&endDate=` opcional para filtrar |
| GET | `/recent` | JWT | — | Carrega os registros de entrega mais recentes da igreja. `?limit=` opcional (padrão 100) |
| GET | `/:id` | JWT | — | Carrega um registro de entrega pelo ID |

## Páginas Relacionadas

- [Arquitetura em Tempo Real](../../realtime.md) -- protocolo WebSocket, assinaturas de salas e o framework de entrega unificada
- [Notificações Push na Web](../../web-push.md) -- registro e entrega de notificações push no navegador
- [Endpoints de Membros](./membership.md) -- pessoas, grupos, papéis e identidade central
- [Endpoints de Presença](./attendance.md) -- acompanhamento de cultos e visitas
- [Autenticação e Permissões](./authentication.md) -- fluxo de login, JWT, OAuth e modelo de permissões
- [Estrutura do Módulo](../module-structure.md) -- padrões de organização do código
