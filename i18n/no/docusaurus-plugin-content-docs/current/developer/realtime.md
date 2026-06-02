---
title: "Sanntidsarkitektur"
---

# Sanntidsarkitektur

<div class="article-intro">

ChurchApps bruker et enkelt WebSocket-basert leveringsrammeverk for hver sanntidsflate -- gruppechat, private meldinger, innholds-notater, direkte stream-chat og tilstedeværelse/frammøte. Denne siden dokumenterer protokollen, serveren og klientprimitiver som forbrukere bruker.

</div>

## Oversikt

Protokollen har tre deler:

1. **En vedvarende WebSocket** per nettleser-tab, åpnet av `SocketHelper`.
2. **Tilkoblings-rader** (`POST /messaging/connections`) registrert i `connections`-tabellen -- disse markerer en `(socketId, churchId, conversationId)`-tuple som abonnent på et rom.
3. **Serverside fan-out** av `DeliveryHelper.sendConversationMessages()` -- når en melding lagres (`POST /messaging/messages/send`), leser serveren matchende tilkoblings-rader og skyver en typet last til hvert åpent socket.

Det er ingen Socket.IO, ingen long-polling fallback og ingen separat mikrotjeneste.

## Porter og transport

| Miljø | HTTP | WebSocket |
|---|---|---|
| Lokal utvikling | `8084` | `ws://localhost:8087` |
| Railway / enkelt-port varter | delt | delt HTTP-server |
| AWS Lambda | API Gateway HTTP | API Gateway WebSocket |

## Ledning protokoll

Hver ramme er JSON av formen `PayloadInterface`:

```typescript
interface PayloadInterface {
  churchId: string;
  conversationId: string;
  action: PayloadAction;
  data: unknown;
}
```

### Handshake

1. Klient åpner socketen og sender bokstavens `"getId"`.
2. Server svarer med `{ action: "socketId", data: "<id>" }`.
3. Klient lagrer `socketId` og bruker det som tredje koordinat av hvert rom-abonnement.

### Bli med i et rom

Å være medlem av et rom skjer ved å poste en `Connection`-rad.

### Sending av en melding

`POST /messaging/messages/send` (anonym-tillatt) eller `POST /messaging/messages/` (auth-påkrevd):

Serveren lagrer meldingen, deretter `DeliveryHelper.sendConversationMessages()` slår opp hver tilkoblings-rad for det `conversationId` og sender hver socket en ramme.

### Forlate et rom

```http
DELETE /messaging/connections/:churchId/:conversationId/:socketId
```

Sletter tilkoblings-raden og utløser en endelig tilstedeværelse-kringkasting.

## Server-side-komponenter

| Fil | Rolle |
|------|------|
| `Api/src/modules/messaging/helpers/SocketHelper.ts` | Eier `WebSocketServer`. Tildeler `socketId` på koble. Rydder opp døde sockets |
| `Api/src/modules/messaging/helpers/DeliveryHelper.ts` | `sendConversationMessages(payload)` leser tilkoblinger for rommet |
| `Api/src/modules/messaging/controllers/ConnectionController.ts` | `POST /` blir med, `DELETE` forlater |
| `Api/src/modules/messaging/controllers/MessageController.ts` | `POST /send` (anonym) lagrer og fanner ut |

## Klient-side primitives (`@churchapps/apphelper`)

Alle fem primitiver er statiske singletons. De samarbeider slik at hvert tab åpner **en** WebSocket.

### `SocketHelper`

Eier enkelt-WebSocket-tilkoblingen. Re-entrant `init()` er idempotent.

### `SubscriptionManager`

Ref-talt rom-medlemskap. Flere komponenter som abonnerer på samme samtale registrerer bare en serverside-tilkoblings-rad.

### `ConversationStore`

In-minne cache nøklet etter `conversationId`.

### `PresenceStore`

Speilinger `ConversationStore` sitt mønster for `attendance`-handlingen.

### `NotificationService`

Top-level boot for **autentiserte** anropere.

## Live-stream chat

Live-strømmen er den største anonym-forbrukeren av rammeverket.

## Relaterte sider

- [Meldinger-sluttpunkter](./api/endpoints/messaging) -- Full REST-flate
- [Nettbrowser push-meldinger](./web-push) -- Nettleser push, separat fra in-side socket-levering

