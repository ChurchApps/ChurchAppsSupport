---
title: "Echtzeit-Architektur"
---

# Echtzeit-Architektur

ChurchApps verwendet ein einzelnes WebSocket-basiertes Zustellungs-Framework für jede Echtzeit-Oberfläche -- Gruppen-Chat, private Nachrichten, Inhalts-Notizen, den Live-Stream-Chat und Präsenz/Anwesenheit.

## Überblick

Das Protokoll hat drei Teile:

1. **Ein persistenter WebSocket** pro Browser-Tab, geöffnet von `SocketHelper`.
2. **Verbindungs-Zeilen** (`POST /messaging/connections`) -- markieren einen `(socketId, churchId, conversationId)` Tupel als Abonnent eines Raums.
3. **Server-seitige Fan-Out** von `DeliveryHelper.sendConversationMessages()` -- wenn eine Nachricht gespeichert wird, liest der Server die entsprechenden Verbindungs-Zeilen und pusht eine typisierte Nutzlast zu jedem offenen Socket.

## Ports und Transport

| Umgebung | HTTP | WebSocket |
|----------|------|-----------|
| Lokale Dev | `8084` | `ws://localhost:8087` |
| Railway | shared | shared HTTP Server |
| AWS Lambda | API Gateway HTTP | API Gateway WebSocket |

## Wire-Protokoll

Jeder Frame ist JSON der Form `PayloadInterface`:

```typescript
interface PayloadInterface {
  churchId: string;
  conversationId: string;
  action: PayloadAction;
  data: unknown;
}
```

Aktionen umfassen:
- `socketId` -- Server → Client, trägt die socketId für Raum-Joins
- `message` -- Server → Client, neue Nachricht
- `deleteMessage` -- Server → Client, Nachricht entfernt
- `attendance` -- Server → Client, Zuschauer-Liste / Präsenz-Snapshot
- `notification` -- Server → Client, generische Benachrichtigung
- `reconnect` -- Client-intern, nach einem neuen socketId-Handshake

## Server-seitige Komponenten

| Datei | Rolle |
|------|------|
| `SocketHelper.ts` | Besitzt den WebSocket-Server |
| `DeliveryHelper.ts` | Routet Nachrichten zu Sockets |
| `ConnectionController.ts` | POST zum Beitreten, DELETE zum Verlassen |
| `MessageController.ts` | Nachrichten speichern und fan-out |
| `ConnectionRepo.ts` | Abonnenten-Quelle |

## Client-seitige Primitives (@churchapps/apphelper)

Alle fünf Primitives sind statische Singletons:

- `SocketHelper` -- Besitzt die einzelne WebSocket-Verbindung
- `SubscriptionManager` -- Ref-gezählte Raum-Mitgliedschaft
- `ConversationStore` -- In-Memory-Cache
- `PresenceStore` -- Spiegelt ConversationStore für Zuschauer
- `NotificationService` -- Boot für authentifizierte Anrufer

## Live-Stream-Chat

Der Live-Stream verwendet zwei `contentType`s:

- `streamingLive` -- der öffentliche Chat-Tab
- `streamingLiveHost` -- ein privater Raum nur für Staff

## Muster und Fallstricke

- **Öffnen Sie nicht Ihr eigenes WebSocket.** `SocketHelper` ist ein Singleton.
- **Überspringen Sie nicht `SubscriptionManager`.** Direkte POST-Aufrufe funktionieren, verlieren aber Ref-Counting.
- **Handler-IDs müssen pro Aktion eindeutig sein.**
- **Raum-IDs sind opaque Strings.**
- **Authentifizierung wird an der REST-Grenze überprüft, nicht am Socket.**
