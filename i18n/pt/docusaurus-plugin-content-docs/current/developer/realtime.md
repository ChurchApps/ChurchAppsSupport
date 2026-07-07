---
title: "Arquitetura em Tempo Real"
---

# Arquitetura em Tempo Real

<div class="article-intro">

O ChurchApps usa uma única estrutura de entrega baseada em WebSocket para cada superfície em tempo real -- chat de grupo, mensagens privadas, notas de conteúdo, chat de transmissão ao vivo e presença/atendimento. Esta página documenta o protocolo, o servidor e as primitivas do cliente que os consumidores usam.

</div>

## Visão Geral

```
┌────────────────────┐                ┌────────────────────────────┐
│ Browser / B1Admin  │                │  MessagingApi (Lambda)     │
│ Browser / B1App    │ ─── WS ─────▶  │  ┌───────────────────────┐ │
│  - SocketHelper    │                │  │ SocketHelper (server) │ │
│  - SubscriptionMgr │   POST /msg ──▶│  │ MessageController     │ │
│  - ConversationStore│  POST /conn ─▶│  │ ConnectionController  │ │
│  - PresenceStore   │ ◀── action ──  │  │ DeliveryHelper        │ │
└────────────────────┘                │  └───────────────────────┘ │
                                      └────────────────────────────┘
```

O protocolo tem três peças:

1. **Um WebSocket persistente** por aba do navegador, aberto por `SocketHelper`.
2. **Linhas de conexão** (`POST /messaging/connections`) registradas na tabela `connections` -- estas marcam uma tupla `(socketId, churchId, conversationId)` como assinante de uma sala.
3. **Fan-out do lado do servidor** por `DeliveryHelper.sendConversationMessages()` -- quando uma mensagem é salva (`POST /messaging/messages/send`), o servidor lê as linhas de conexão correspondentes e envia um payload tipado para cada socket aberto.

Não há Socket.IO, sem fallback de long-polling e sem microsserviço separado. O WebSocket roda no mesmo processo que a API REST (`web` Lambda para HTTP, `socket` Lambda para WebSocket no AWS; um processo combinado localmente e no Railway).

## Portas e transporte

| Ambiente | HTTP | WebSocket |
|----------|------|-----------|
| Dev local | `8084` | `ws://localhost:8087` (servidor `WebSocketServer` separado) |
| Railway / hosts com porta única | compartilhado | servidor HTTP compartilhado (`SocketHelper.attachToServer()`) |
| AWS Lambda | API Gateway HTTP | API Gateway WebSocket (rotas `$connect` / `$disconnect` / `$default`) |

O seletor de transporte é a config `deliveryProvider`:

- `local` → biblioteca `ws` bruta; clientes se conectam ao `MessagingApiSocket` do `CommonEnvironmentHelper`.
- `aws` → API Gateway WebSocket; o servidor posta payloads para conexões ativas via `@aws-sdk/client-apigatewaymanagementapi`.

O cliente nunca precisa saber qual está em uso -- ele fala o mesmo protocolo JSON de qualquer forma.

## Protocolo de transmissão

Cada quadro é JSON da forma `PayloadInterface`:

```typescript
interface PayloadInterface {
  churchId: string;
  conversationId: string;  // a "sala" -- geralmente um UUID, às vezes "alerts" ou "content-{type}-{id}"
  action: PayloadAction;
  data: unknown;
}

type PayloadAction =
  | "socketId"            // servidor → cliente, após conectar, carrega o socketId para usar em junções de sala
  | "message"             // servidor → cliente, nova mensagem
  | "deleteMessage"       // servidor → cliente, mensagem removida
  | "privateMessage"      // servidor → cliente, ping de contagem de crachá para a sala "alerts" do destinatário quando uma mensagem direta escala; o corpo da mensagem em si chega via a ação "message" ordinária dentro da conversa aberta
  | "reaction"            // servidor → cliente, reação emoji alterada em uma mensagem; dados é { messageId, conversationId, personId, emoji, added } (added=false significa removido). Transmissão para a sala de conversa por POST /messaging/messages/:messageId/reactions
  | "conversationActivity"// servidor → cliente, sinal secundário "algo aconteceu" para assinantes de sala de conteúdo
  | "attendance"          // servidor → cliente, lista de visualizadores / snapshot de presença
  | "notification"        // servidor → cliente, notificação genérica (contagens, etc.)
  | "reconnect"           // cliente-interno, despachado localmente por SocketHelper após um novo handshake de socketId completo seguindo uma queda -- seja um reconexão com backoff exponencial após um fechamento inesperado, ou reconexão imediata acionada pela sonda de retomada (tab focus/visibility/online); nunca enviado pelo servidor
  | "alert" | "callout";  // legado, veja referência do endpoint Connections
```

### Handshake

1. Cliente abre o socket e envia a string literal `"getId"`.
2. Servidor responde com `{ action: "socketId", data: "<id>" }`.
3. Cliente armazena o `socketId` e o usa como a terceira coordenada de cada subscrição de sala.

### Entrando em uma sala

Uma "sala" é apenas uma tupla `(churchId, conversationId)`. Para se inscrever, o cliente posta uma linha `Connection`:

```http
POST /messaging/connections
[
  {
    "churchId": "CHU00000001",
    "conversationId": "CON123…",
    "socketId": "abc123",
    "personId": null,            // opcional; null para visualizadores anônimos de transmissão ao vivo
    "displayName": "Anonymous4823"
  }
]
```

Postar também dispara uma transmissão de `attendance` na conversa para que assinantes existentes saibam que um novo visualizador entrou.

### Enviando uma mensagem

`POST /messaging/messages/send` (anônimo permitido) ou `POST /messaging/messages/` (requer autenticação):

```json
[
  { "churchId": "CHU00000001", "conversationId": "CON123…", "displayName": "John Smith", "content": "Hello!", "messageType": "comment" }
]
```

O servidor salva a mensagem, depois `DeliveryHelper.sendConversationMessages()` procura cada linha de conexão para esse `conversationId` e envia a cada socket um quadro `{ action: "message", data: <message> }`.

Para conversas vinculadas a conteúdo (por exemplo, notas anexadas a uma pessoa), uma segunda transmissão com `action: "conversationActivity"` dispara na sala sintética `"content-{type}-{id}"` para que consumidores de vista de lista saibam para atualizar sem manter a conversa subjacente aberta.

### Saindo de uma sala

```http
DELETE /messaging/connections/:churchId/:conversationId/:socketId
```

Limpa a linha de conexão e dispara uma transmissão de atendimento final.

## Componentes do lado do servidor

| Arquivo | Papel |
|---------|-------|
| `Api/src/modules/messaging/helpers/SocketHelper.ts` | Possui o `WebSocketServer`. Atribui `socketId` na conexão. Executa um heartbeat de ping/pong de 30s (`startHeartbeat`) que `terminate()`s e limpa qualquer conexão que perca um pong. Limpa sockets mortos e dispara uma retransmissão de atendimento na desconexão. Expõe `getLiveSocketIds()` e `reapStaleConnections()`, usados pelo job de timer de 30 minutos para excluir linhas `connections` obsoletas -- localmente verificando quais socketIds ainda estão vivos em processo, no AWS como um backstop de TTL de 24h para eventos `$disconnect` perdidos (API Gateway limita conexões em ~2h, então isto não pode colher uma ativa) |
| `Api/src/modules/messaging/helpers/DeliveryHelper.ts` | `sendConversationMessages(payload)` lê conexões para a sala e roteia cada quadro para o socket local ou a conexão AWS API Gateway. `sendAttendance(churchId, conversationId)` constrói e transmite o snapshot do visualizador |
| `Api/src/modules/messaging/controllers/ConnectionController.ts` | `POST /` entra, `DELETE /:churchId/:conversationId/:socketId` sai, `POST /setName` atualiza nome de exibição |
| `Api/src/modules/messaging/controllers/MessageController.ts` | `POST /send` (anônimo) e `POST /` (autenticado) salva depois distribui |
| `Api/src/modules/messaging/repositories/ConnectionRepo.ts` | `loadForConversation(churchId, conversationId)` é a fonte de verdade para quem está inscrito |

## Primitivas do lado do cliente (`@churchapps/apphelper`)

Todas as cinco primitivas são singletons estáticos em `apphelper/src/helpers/`. Elas cooperam para que cada aba abra **um** WebSocket não importa quantos componentes montem na página.

### `SocketHelper`

Possui a conexão WebSocket única. `init()` re-entrante é idempotente -- múltiplos componentes podem chamá-lo sem abrir sockets duplicados. Expõe:

- `init()` -- abre (ou reutiliza) o socket e completa o handshake `getId`. Resolve uma vez que o handshake completa ou, após um timeout de 5s, uma vez que o loop de retry de fundo tomou conta; nunca rejeita, portanto chamadores não precisam especial-caseá-lo de forma falhada na primeira conexão.
- `addHandler(action, id, fn)` / `removeHandler(id)` -- registra/desregistra ouvintes por `action`. Múltiplos manipuladores podem ouvir a mesma ação.
- `setPersonChurch({ personId, churchId })` -- para chamadores autenticados; dispara uma subscrição de sala `"alerts"` para que notificações push cheguem neste socket.
- `onSocketIdReady(fn)` -- dispara em cada novo socketId, não apenas o primeiro -- o handshake inicial e cada reconexão subsequente. Usado por `SubscriptionManager` para descarregar junções pendentes.
- `checkConnection()` -- invocado pelos ouvintes de retomada abaixo; reconecta imediatamente se o socket já está fechado, ou envia uma sonda de vivacidade se parecer aberto.

**Ciclo de reconexão.** Um fechamento inesperado agenda uma reconexão com backoff exponencial (1s, dobrando até um cap de 30s). `SocketHelper` também ouve `online`, `focus`, `pageshow` e `visibilitychange` em `window`/`document` para detectar uma aba retomada: se o socket já está fechado ele reconecta imediatamente e reseta o backoff; se parece aberto, ele envia uma sonda de vivacidade `"getId"` e força uma reconexão se nenhum quadro chegar dentro de 3s -- isto detecta sockets meio-abertos deixados para trás depois que um OS móvel suspende o app. Em um re-handshake bem-sucedido, `SocketHelper` despacha a ação `"reconnect"` local (veja [Protocolo de transmissão](#protocolo-de-transmissão)) para cada manipulador registrado para essa ação.

### `SubscriptionManager`

Associação de sala ref-counted. Múltiplos componentes inscrevendo-se na mesma conversa só registram uma linha de conexão do lado do servidor.

```typescript
import { SubscriptionManager } from "@churchapps/apphelper";

await SubscriptionManager.joinRoom(conversationId, churchId, personId, displayName);
// ... componente renderiza, recebe quadros de socket via ConversationStore.subscribe ...
await SubscriptionManager.leaveRoom(conversationId, churchId);
```

Três comportamentos que consumidores obtêm gratuitamente:

- **Leave debounced (300 ms)** -- sobrevive a dupla mount/unmount do React StrictMode e ciclos de remount curtos sem soltar a subscrição do lado do servidor; `reset()` também cancela qualquer saída debounced pendente.
- **Reconexão rejoin** -- `SubscriptionManager` lembra o `personId`/`displayName` usado para entrar em cada sala, então no evento `"reconnect"` do `SocketHelper` (e em cada chamada `onSocketIdReady`) ele re-posta cada linha de conexão ativa com identidade intacta. Reentradas são deduped por socketId para que a mesma reconexão não re-poste uma sala duas vezes.
- **Socketid de ligação tardia** -- `joinRoom` registra intenção antes do socket terminar seu handshake; o `POST /connections` real dispara em `onSocketIdReady`.

### `ConversationStore`

Cache em memória indexado por `conversationId`. Registra manipuladores de socket `message` / `deleteMessage` / `privateMessage` exatamente uma vez e aplica quadros de entrada para quaisquer conversas atualmente abertas.

```typescript
import { ConversationStore } from "@churchapps/apphelper";

const conv = await ConversationStore.loadByConversationId(conversationId, churchId);
// ↑ usa /messages/conversation/:id quando autenticado, /messages/catchup/:churchId/:id quando anônimo

const unsubscribe = ConversationStore.subscribe(conversationId, (conv) => {
  setMessages(conv.messages);  // re-renderiza com o snapshot mais recente
});
// ...
unsubscribe();
ConversationStore.forget(conversationId);  // limpeza explícita opcional
```

Chamadores autenticados também obtêm **hidratação de pessoas** -- `personId`s em mensagens recebidas são resolvidos para objetos `PersonInterface` via uma busca `GET /people/ids` cacheada. Chamadores anônimos pulam isso.

No evento `"reconnect"` do `SocketHelper`, `ConversationStore` refetcha cada conversa que atualmente tem ouvintes `subscribe` ativos, recuperando mensagens perdidas enquanto o socket estava inativo. Conversas anônimas pulam esse catch-up se seu `churchId` nunca foi registrado (o endpoint de catch-up requer um).

### `PresenceStore`

Espelha o padrão do `ConversationStore` para a ação `attendance`. Assinantes recebem um `PresenceSnapshot { conversationId, totalViewers, viewers }` sempre que o servidor retransmite presença. Snapshots idênticos são deduped antes de notificar, então tempestades de reconexão não disparam re-renderizações desnecessárias.

```typescript
import { PresenceStore } from "@churchapps/apphelper";

const unsubscribe = PresenceStore.subscribe(conversationId, (snapshot) => {
  setViewerCount(snapshot.totalViewers);
});
```

### `NotificationService`

Boot de nível superior para chamadores **autenticados**. Envolve `SocketHelper.init()`, define o contexto de pessoa/igreja (que auto-entra na sala `"alerts"`), e chama `ConversationStore.ensureHandlers()` / `PresenceStore.ensureHandlers()` / `SubscriptionManager.setupRejoin()` exatamente uma vez. Também registra seu próprio manipulador `"reconnect"` que recarrega contagens de notificação/PM, então crachás se recuperam depois de uma conexão caída.

```typescript
await NotificationService.getInstance().initialize(userContext);
```

Fluxos anônimos (o chat de transmissão ao vivo é o exemplo canônico) pulam `NotificationService` e chamam as primitivas diretamente -- veja `B1App/src/helpers/StreamChatManager.ts` para uma implementação de referência.

## Chat de transmissão ao vivo

A transmissão ao vivo é o maior consumidor anônimo da estrutura. Ela usa dois `contentType`s para escopo de sala:

- `streamingLive` -- a aba de chat pública em `/stream` (uma sala por `streamingService`).
- `streamingLiveHost` -- uma sala privada visível apenas para staff com permissão `contentApi.chat.host`. O id da sala é encriptado no servidor (`GET /streamingServices/:id/hostChat`) para que scraping casual não o revele.

`B1App/src/helpers/StreamChatManager.ts` bota ambas as salas via as primitivas unificadas -- não há mais código de socket específico de transmissão ao vivo.

## Padrões e armadilhas

- **Não abra seu próprio WebSocket.** `SocketHelper` é um singleton por uma razão. Se você precisar ouvir uma ação customizada, registre um manipulador no socket existente via `SocketHelper.addHandler`.
- **Não contorne `SubscriptionManager`.** Chamadas diretas `POST /connections` funcionam mas perdem contagem de ref, saída debounced e reconexão rejoin. Chat de grupo e consumidores de PM todos vão através de `SubscriptionManager`.
- **Ids de manipulador devem ser únicos por ação.** `SocketHelper.addHandler(action, id, fn)` indexa por `(action, id)`; reutilizar o mesmo id para dois ouvintes substitui o primeiro. As lojas unificadas usam ids como `"ConversationStore-Message"` e `"PresenceStore-Attendance"` para se manterem claros de ids de consumidor.
- **Ids de sala são strings opacas.** Maioria são UUIDs de conversa mas o sistema também suporta `"alerts"` (notificações por pessoa), `"content-{type}-{id}"` (salas de atividade sintética), e ids `streamingLiveHost` encriptados.
- **Autenticação é verificada no limite REST, não no socket.** Entrar em uma sala por `POST /connections` é anônimo-permitido; controle de acesso acontece na hora do envio de mensagem (o controlador de mensagem decide quais `messageType`s um chamador anônimo pode enviar).

## Páginas Relacionadas

- [Arquitetura de Notificações](./architecture/notifications) -- O funil de escalação em app/push/email que este transporte alimenta
- [Endpoints de Mensagens](./api/endpoints/messaging) -- Superfície REST completa para mensagens, conversas, conexões, dispositivos
- [Notificações Web Push](./web-push) -- Push do navegador, separado da entrega de socket na página
- [AppHelper](./shared-libraries/app-helper) -- O pacote npm que envia as primitivas do cliente
- [Estrutura do Módulo](./api/module-structure) -- Como o módulo de mensagens é organizado no lado do servidor
