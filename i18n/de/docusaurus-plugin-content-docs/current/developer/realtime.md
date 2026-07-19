---
title: "Echtzeit-Architektur"
---

# Echtzeit-Architektur

<div class="article-intro">

ChurchApps verwendet ein einziges WebSocket-basiertes Zustellungs-Framework für jede Echtzeit-Oberfläche — Gruppen-Chat, private Nachrichten, Content-Notizen, den Live-Stream-Chat und Präsenz/Anwesenheit. Diese Seite dokumentiert das Protokoll, den Server und die Client-Primitive, die Konsumenten verwenden.

</div>

## Überblick

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

Das Protokoll besteht aus drei Teilen:

1. **Ein persistentes WebSocket** pro Browser-Tab, geöffnet von `SocketHelper`.
2. **Connection-Zeilen** (`POST /messaging/connections`), aufgezeichnet in der `connections`-Tabelle — diese markieren ein `(socketId, churchId, conversationId)`-Tupel als Abonnenten eines Raums.
3. **Serverseitiger Fan-out** durch `DeliveryHelper.sendConversationMessages()` — wenn eine Nachricht gespeichert wird (`POST /messaging/messages/send`), liest der Server die passenden Connection-Zeilen und pusht ein typisiertes Payload an jedes offene Socket.

Es gibt kein Socket.IO, kein Long-Polling-Fallback und keinen separaten Microservice. Das WebSocket läuft im selben Prozess wie die REST-API (`web`-Lambda für HTTP, `socket`-Lambda für WebSocket in AWS; ein kombinierter Prozess lokal und auf Railway).

## Ports und Transport

| Umgebung | HTTP | WebSocket |
|-------------|------|-----------|
| Lokale Entwicklung   | `8084` | `ws://localhost:8087` (separater `WebSocketServer`) |
| Railway / Docker / Single-Port-Hosts (`RAILWAY_ENVIRONMENT` oder `SELF_HOSTED` gesetzt) | gemeinsam | gemeinsamer HTTP-Server (`SocketHelper.attachToServer()`) |
| AWS Lambda  | API-Gateway-HTTP | API-Gateway-WebSocket (`$connect`-/`$disconnect`-/`$default`-Routen) |

Der Transport-Selektor ist die `deliveryProvider`-Konfiguration:

- `local` → rohe `ws`-Bibliothek; Clients verbinden sich mit `MessagingApiSocket` aus `CommonEnvironmentHelper`.
- `aws` → API-Gateway-WebSocket; der Server sendet Payloads über `@aws-sdk/client-apigatewaymanagementapi` an aktive Verbindungen.

Der Client muss nie wissen, welches im Einsatz ist — er spricht in beiden Fällen dasselbe JSON-Protokoll.

## Wire-Protokoll

Jeder Frame ist JSON der Form `PayloadInterface`:

```typescript
interface PayloadInterface {
  churchId: string;
  conversationId: string;  // der "Raum" — meist eine UUID, manchmal "alerts" oder "content-{type}-{id}"
  action: PayloadAction;
  data: unknown;
}

type PayloadAction =
  | "socketId"            // server → client, nach dem Connect, trägt die socketId für Raum-Beitritte
  | "message"             // server → client, neue Nachricht
  | "deleteMessage"       // server → client, Nachricht entfernt
  | "privateMessage"      // server → client, Badge-Zähl-Ping an den "alerts"-Raum des Empfängers, wenn eine Direktnachricht eskaliert; der Nachrichtentext selbst kommt über die normale "message"-Aktion innerhalb der offenen Konversation an
  | "reaction"            // server → client, Emoji-Reaktion an einer Nachricht umgeschaltet; data ist { messageId, conversationId, personId, emoji, added } (added=false bedeutet entfernt). Wird an den Konversationsraum gesendet über POST /messaging/messages/:messageId/reactions
  | "conversationActivity"// server → client, sekundäres "etwas ist passiert"-Signal für Content-Raum-Abonnenten
  | "attendance"          // server → client, Betrachterliste / Präsenz-Snapshot
  | "notification"        // server → client, generische Benachrichtigung (Zählungen usw.)
  | "reconnect"           // client-intern, lokal von SocketHelper ausgelöst, nachdem ein neuer socketId-Handshake nach einem Abbruch abgeschlossen ist — entweder ein Reconnect mit exponentiellem Backoff nach einem unerwarteten Schließen, oder ein sofortiger Reconnect, ausgelöst durch die Resume-Probe (Tab-Fokus/Sichtbarkeit/online); nie vom Server gesendet
  | "alert" | "callout";  // Legacy, siehe Connections-Endpunkt-Referenz
```

### Handshake

1. Der Client öffnet das Socket und sendet den Literal-String `"getId"`.
2. Der Server antwortet mit `{ action: "socketId", data: "<id>" }`.
3. Der Client speichert die `socketId` und verwendet sie als dritte Koordinate für jedes Raum-Abonnement.

### Einem Raum beitreten

Ein "Raum" ist einfach ein `(churchId, conversationId)`-Tupel. Um zu abonnieren, postet der Client eine `Connection`-Zeile:

```http
POST /messaging/connections
[
  {
    "churchId": "CHU00000001",
    "conversationId": "CON123…",
    "socketId": "abc123",
    "personId": null,            // optional; null für anonyme Live-Stream-Betrachter
    "displayName": "Anonymous4823"
  }
]
```

Das Posten löst außerdem einen `attendance`-Broadcast an die Konversation aus, sodass bestehende Abonnenten erfahren, dass ein neuer Betrachter beigetreten ist.

### Eine Nachricht senden

`POST /messaging/messages/send` (anonym erlaubt) oder `POST /messaging/messages/` (Auth erforderlich):

```json
[
  { "churchId": "CHU00000001", "conversationId": "CON123…", "displayName": "John Smith", "content": "Hello!", "messageType": "comment" }
]
```

Der Server speichert die Nachricht, dann sucht `DeliveryHelper.sendConversationMessages()` jede Connection-Zeile für diese `conversationId` heraus und sendet jedem Socket einen `{ action: "message", data: <message> }`-Frame.

Für Content-gebundene Konversationen (z. B. Notizen, die an eine Person angehängt sind) feuert ein zweiter Broadcast mit `action: "conversationActivity"` im synthetischen `"content-{type}-{id}"`-Raum, sodass Listenansicht-Konsumenten wissen, dass sie aktualisieren sollen, ohne die zugrunde liegende Konversation offen zu halten.

### Einen Raum verlassen

```http
DELETE /messaging/connections/:churchId/:conversationId/:socketId
```

Löscht die Connection-Zeile und löst einen finalen Attendance-Broadcast aus.

## Serverseitige Komponenten

| Datei | Rolle |
|------|------|
| `Api/src/modules/messaging/helpers/SocketHelper.ts` | Besitzt den `WebSocketServer`. Weist beim Connect eine `socketId` zu. Führt einen 30-Sekunden-Ping/Pong-Heartbeat aus (`startHeartbeat`), der jede Verbindung, die einen Pong verpasst, `terminate()`t und aufräumt. Räumt tote Sockets auf und löst beim Disconnect einen Attendance-Rebroadcast aus. Stellt `getLiveSocketIds()` und `reapStaleConnections()` bereit, verwendet vom 30-Minuten-Timer-Job zum Löschen veralteter `connections`-Zeilen — lokal durch Prüfen, welche socketIds noch im Prozess live sind, auf AWS als 24h-TTL-Backstop für verpasste `$disconnect`-Events (API Gateway deckelt Verbindungen bei ~2h, sodass dies eine lebendige Verbindung nicht reapen kann) |
| `Api/src/modules/messaging/helpers/DeliveryHelper.ts` | `sendConversationMessages(payload)` liest Verbindungen für den Raum und routet jeden Frame zum lokalen Socket oder zur AWS-API-Gateway-Verbindung. `sendAttendance(churchId, conversationId)` baut den Betrachter-Snapshot und broadcastet ihn |
| `Api/src/modules/messaging/controllers/ConnectionController.ts` | `POST /` tritt bei, `DELETE /:churchId/:conversationId/:socketId` verlässt, `POST /setName` aktualisiert den Anzeigenamen |
| `Api/src/modules/messaging/controllers/MessageController.ts` | `POST /send` (anonym) und `POST /` (authentifiziert) speichern und leiten dann weiter |
| `Api/src/modules/messaging/repositories/ConnectionRepo.ts` | `loadForConversation(churchId, conversationId)` ist die Quelle der Wahrheit dafür, wer abonniert ist |

## Clientseitige Primitive (`@churchapps/apphelper`)

Alle fünf Primitive sind statische Singletons in `apphelper/src/helpers/`. Sie arbeiten so zusammen, dass jeder Tab **ein** WebSocket öffnet, egal wie viele Komponenten auf der Seite mounten.

### `SocketHelper`

Besitzt die einzelne WebSocket-Verbindung. Ein reentrantes `init()` ist idempotent — mehrere Komponenten können es aufrufen, ohne doppelte Sockets zu öffnen. Stellt bereit:

- `init()` — öffnet (oder nutzt wieder) das Socket und schließt den `getId`-Handshake ab. Löst sich auf, sobald der Handshake abgeschlossen ist, oder — nach einem 5s-Timeout — sobald die Hintergrund-Retry-Schleife übernommen hat; es lehnt nie ab, sodass Aufrufer einen fehlgeschlagenen ersten Connect nicht speziell behandeln müssen.
- `addHandler(action, id, fn)` / `removeHandler(id)` — Listener nach `action` registrieren/deregistrieren. Mehrere Handler können auf dieselbe Aktion hören.
- `setPersonChurch({ personId, churchId })` — für authentifizierte Aufrufer; löst ein `"alerts"`-Raum-Abonnement aus, sodass Push-Benachrichtigungen auf diesem Socket ankommen.
- `onSocketIdReady(fn)` — feuert bei jeder neuen socketId, nicht nur beim ersten Mal — beim initialen Handshake und bei jedem nachfolgenden Reconnect. Wird von `SubscriptionManager` genutzt, um ausstehende Beitritte zu leeren.
- `checkConnection()` — wird von den unten stehenden Resume-Listenern aufgerufen; verbindet sofort neu, wenn das Socket bereits geschlossen ist, oder sendet eine Liveness-Probe, wenn es offen aussieht.

**Reconnect-Lebenszyklus.** Ein unerwartetes Schließen plant einen Reconnect mit exponentiellem Backoff (1s, verdoppelnd bis zu einem 30s-Deckel). `SocketHelper` hört außerdem auf `online`, `focus`, `pageshow` und `visibilitychange` an `window`/`document`, um einen wiederaufgenommenen Tab zu erkennen: Ist das Socket bereits geschlossen, verbindet es sofort neu und setzt den Backoff zurück; sieht es offen aus, sendet es eine `"getId"`-Liveness-Probe und erzwingt einen Reconnect, falls innerhalb von 3s kein Frame ankommt — das fängt halb-offene Sockets ab, die zurückbleiben, nachdem ein mobiles Betriebssystem die App suspendiert hat. Bei einem erfolgreichen erneuten Handshake versendet `SocketHelper` die lokale `"reconnect"`-Aktion (siehe [Wire-Protokoll](#wire-protokoll)) an jeden registrierten Handler für diese Aktion.

### `SubscriptionManager`

Referenzgezählte Raum-Mitgliedschaft. Mehrere Komponenten, die dieselbe Konversation abonnieren, registrieren nur eine serverseitige Connection-Zeile.

```typescript
import { SubscriptionManager } from "@churchapps/apphelper";

await SubscriptionManager.joinRoom(conversationId, churchId, personId, displayName);
// ... Komponente rendert, empfängt Socket-Frames über ConversationStore.subscribe ...
await SubscriptionManager.leaveRoom(conversationId, churchId);
```

Drei Verhaltensweisen, die Konsumenten kostenlos erhalten:

- **Entprelltes Verlassen (300 ms)** — übersteht die doppelte Mount-/Unmount-Zyklen und kurzen Remount-Zyklen des React-StrictMode, ohne das serverseitige Abonnement zu verlieren; `reset()` bricht außerdem alle ausstehenden entprellten Verlassen-Vorgänge ab.
- **Reconnect-Rejoin** — `SubscriptionManager` merkt sich die `personId`/`displayName`, die zum Beitritt in jeden Raum verwendet wurden, sodass es beim `"reconnect"`-Event von `SocketHelper` (und bei jedem `onSocketIdReady`-Aufruf) jede aktive Connection-Zeile mit intakter Identität erneut postet. Rejoins werden pro socketId dedupliziert, sodass derselbe Reconnect einen Raum nicht doppelt postet.
- **Spätes Binden der socketId** — `joinRoom` zeichnet die Absicht auf, bevor das Socket seinen Handshake abschließt; das eigentliche `POST /connections` feuert bei `onSocketIdReady`.

### `ConversationStore`

In-Memory-Cache, gekeyt nach `conversationId`. Registriert `message`-/`deleteMessage`-/`privateMessage`-Socket-Handler genau einmal und wendet eingehende Frames auf alle aktuell offenen Konversationen an.

```typescript
import { ConversationStore } from "@churchapps/apphelper";

const conv = await ConversationStore.loadByConversationId(conversationId, churchId);
// ↑ verwendet /messages/conversation/:id, wenn authentifiziert, /messages/catchup/:churchId/:id, wenn anonym

const unsubscribe = ConversationStore.subscribe(conversationId, (conv) => {
  setMessages(conv.messages);  // mit dem neuesten Snapshot neu rendern
});
// ...
unsubscribe();
ConversationStore.forget(conversationId);  // optionale explizite Bereinigung
```

Authentifizierte Aufrufer erhalten außerdem **Personen-Hydrierung** — `personId`s auf eingehenden Nachrichten werden über einen gecachten `GET /people/ids`-Lookup zu `PersonInterface`-Objekten aufgelöst. Anonyme Aufrufer überspringen dies.

Beim `"reconnect"`-Event von `SocketHelper` ruft `ConversationStore` jede Konversation mit aktuell aktiven `subscribe`-Listenern erneut ab und stellt so Nachrichten wieder her, die verpasst wurden, während das Socket down war. Anonyme Konversationen überspringen dieses Catch-up, wenn ihre `churchId` nie aufgezeichnet wurde (der Catch-up-Endpunkt benötigt eine).

### `PresenceStore`

Spiegelt das Muster von `ConversationStore` für die `attendance`-Aktion. Abonnenten erhalten einen `PresenceSnapshot { conversationId, totalViewers, viewers }`, wann immer der Server die Präsenz erneut broadcastet. Identische Snapshots werden vor der Benachrichtigung dedupliziert, sodass Reconnect-Stürme keine unnötigen Re-Renders auslösen.

```typescript
import { PresenceStore } from "@churchapps/apphelper";

const unsubscribe = PresenceStore.subscribe(conversationId, (snapshot) => {
  setViewerCount(snapshot.totalViewers);
});
```

### `NotificationService`

Top-Level-Boot für **authentifizierte** Aufrufer. Umschließt `SocketHelper.init()`, setzt den Personen-/Kirchenkontext (der automatisch dem `"alerts"`-Raum beitritt) und ruft `ConversationStore.ensureHandlers()` / `PresenceStore.ensureHandlers()` / `SubscriptionManager.setupRejoin()` genau einmal auf. Es registriert außerdem seinen eigenen `"reconnect"`-Handler, der Benachrichtigungs-/PM-Zählungen neu lädt, sodass Badges sich nach einer abgebrochenen Verbindung erholen.

```typescript
await NotificationService.getInstance().initialize(userContext);
```

Anonyme Abläufe (der Live-Stream-Chat ist das kanonische Beispiel) überspringen `NotificationService` und rufen die Primitive direkt auf — siehe `B1App/src/helpers/StreamChatManager.ts` als Referenzimplementierung.

## Live-Stream-Chat

Der Live-Stream ist der größte anonyme Konsument des Frameworks. Er verwendet zwei `contentType`s für das Raum-Scoping:

- `streamingLive` — der öffentliche Chat-Tab auf `/stream` (ein Raum pro `streamingService`).
- `streamingLiveHost` — ein privater Raum, sichtbar nur für Mitarbeiter mit der Berechtigung `contentApi.chat.host`. Die Raum-ID ist serverseitig verschlüsselt (`GET /streamingServices/:id/hostChat`), sodass beiläufiges Scraping sie nicht enthüllt.

`B1App/src/helpers/StreamChatManager.ts` bootet beide Räume über die vereinheitlichten Primitive — es gibt keinen live-stream-spezifischen Socket-Code mehr.

## Muster und Fallstricke

- **Öffnen Sie kein eigenes WebSocket.** `SocketHelper` ist aus gutem Grund ein Singleton. Wenn Sie auf eine benutzerdefinierte Aktion hören müssen, registrieren Sie einen Handler am bestehenden Socket über `SocketHelper.addHandler`.
- **Umgehen Sie nicht `SubscriptionManager`.** Direkte `POST /connections`-Aufrufe funktionieren, verlieren aber Referenzzählung, entprelltes Verlassen und Reconnect-Rejoin. Gruppen-Chat- und PM-Konsumenten gehen alle über `SubscriptionManager`.
- **Handler-IDs müssen pro Aktion eindeutig sein.** `SocketHelper.addHandler(action, id, fn)` keyt nach `(action, id)`; die Wiederverwendung derselben ID für zwei Listener ersetzt den ersten. Die vereinheitlichten Stores verwenden IDs wie `"ConversationStore-Message"` und `"PresenceStore-Attendance"`, um sich klar von Konsumenten-IDs abzugrenzen.
- **Raum-IDs sind opake Strings.** Die meisten sind Konversations-UUIDs, aber das System unterstützt auch `"alerts"` (per-Person-Benachrichtigungen), `"content-{type}-{id}"` (synthetische Activity-Räume) und die verschlüsselten `streamingLiveHost`-IDs.
- **Authentifizierung wird an der REST-Grenze geprüft, nicht am Socket.** Einem Raum über `POST /connections` beizutreten ist anonym erlaubt; Zugriffskontrolle passiert zum Zeitpunkt des Nachrichtenversands (der Message-Controller entscheidet, welche `messageType`s ein anonymer Aufrufer senden darf).

## Verwandte Seiten

- [Benachrichtigungs-Architektur](./architecture/notifications) -- Der In-App-/Push-/E-Mail-Eskalationstrichter, den dieser Transport speist
- [Messaging-Endpunkte](./api/endpoints/messaging) -- Vollständige REST-Oberfläche für Nachrichten, Konversationen, Verbindungen, Geräte
- [Web-Push-Benachrichtigungen](./web-push) -- Browser-Push, getrennt von der In-Page-Socket-Zustellung
- [AppHelper](./shared-libraries/app-helper) -- Das npm-Paket, das die Client-Primitive ausliefert
- [Modulstruktur](./api/module-structure) -- Wie das Messaging-Modul serverseitig organisiert ist
