---
title: "Echtzeit-Architektur"
---

# Echtzeit-Architektur

<div class="article-intro">

ChurchApps verwendet ein einziges WebSocket-basiertes Zustellungs-Framework für jede Echtzeit-Oberfläche — Gruppenchat, private Nachrichten, Content-Notizen, den Live-Stream-Chat und Präsenz/Anwesenheit. Diese Seite dokumentiert das Protokoll, den Server und die Client-Primitiven, die von den Konsumenten verwendet werden.

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

1. **Ein persistenter WebSocket** pro Browser-Tab, geöffnet von `SocketHelper`.
2. **Verbindungszeilen** (`POST /messaging/connections`), die in der Tabelle `connections` gespeichert werden — sie markieren ein Tupel `(socketId, churchId, conversationId)` als Abonnent eines Raums.
3. **Serverseitiger Fan-out** durch `DeliveryHelper.sendConversationMessages()` — wenn eine Nachricht gespeichert wird (`POST /messaging/messages/send`), liest der Server die passenden Verbindungszeilen und sendet an jeden offenen Socket eine typisierte Payload.

Es gibt kein Socket.IO, kein Long-Polling-Fallback und keinen separaten Microservice. Der WebSocket läuft im selben Prozess wie die REST-API (`web`-Lambda für HTTP, `socket`-Lambda für WebSocket in AWS; ein kombinierter Prozess lokal und auf Railway).

## Ports und Transport

| Umgebung | HTTP | WebSocket |
|-------------|------|-----------|
| Lokale Entwicklung   | `8084` | `ws://localhost:8087` (separater `WebSocketServer`) |
| Railway / Docker / Single-Port-Hosts (`RAILWAY_ENVIRONMENT` oder `SELF_HOSTED` gesetzt) | gemeinsam genutzt | gemeinsamer HTTP-Server (`SocketHelper.attachToServer()`) |
| AWS Lambda  | API Gateway HTTP | API Gateway WebSocket (Routen `$connect` / `$disconnect` / `$default`) |

Der Transport-Selektor ist die Konfiguration `deliveryProvider`:

- `local` → rohe `ws`-Bibliothek; Clients verbinden sich mit `MessagingApiSocket` aus `CommonEnvironmentHelper`.
- `aws` → API Gateway WebSocket; der Server sendet Payloads an aktive Verbindungen über `@aws-sdk/client-apigatewaymanagementapi`.

Der Client muss nie wissen, welcher Transport verwendet wird — er spricht in beiden Fällen dasselbe JSON-Protokoll.

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
  | "socketId"            // Server → Client, nach dem Verbindungsaufbau, enthält die zu verwendende socketId für Raumbeitritte
  | "message"             // Server → Client, neue Nachricht
  | "deleteMessage"       // Server → Client, Nachricht entfernt
  | "privateMessage"      // Server → Client, Badge-Count-Ping an den "alerts"-Raum des Empfängers, wenn eine Direktnachricht eskaliert; der Nachrichtentext selbst kommt über die normale "message"-Aktion innerhalb der offenen Konversation
  | "reaction"            // Server → Client, Emoji-Reaktion auf einer Nachricht umgeschaltet; data ist { messageId, conversationId, personId, emoji, added } (added=false bedeutet entfernt). Wird per POST /messaging/messages/:messageId/reactions an den Konversationsraum übertragen
  | "conversationActivity"// Server → Client, sekundäres "es ist etwas passiert"-Signal für Abonnenten von Content-Räumen
  | "attendance"          // Server → Client, Zuschauerliste / Präsenz-Snapshot
  | "notification"        // Server → Client, generische Benachrichtigung (Zähler usw.)
  | "reconnect"           // client-intern, lokal von SocketHelper ausgelöst, nachdem nach einem Verbindungsabbruch ein neuer socketId-Handshake abgeschlossen wurde — entweder eine erneute Verbindung mit exponentiellem Backoff nach einem unerwarteten Schließen, oder eine sofortige erneute Verbindung, ausgelöst durch die Resume-Probe (Tab-Fokus/Sichtbarkeit/Online); wird nie vom Server gesendet
  | "alert" | "callout";  // veraltet, siehe Connections-Endpunkt-Referenz
```

### Handshake

1. Der Client öffnet den Socket und sendet den literalen String `"getId"`.
2. Der Server antwortet mit `{ action: "socketId", data: "<id>" }`.
3. Der Client speichert die `socketId` und verwendet sie als dritte Koordinate für jedes Raum-Abonnement.

### Einem Raum beitreten

Ein "Raum" ist einfach ein Tupel `(churchId, conversationId)`. Um zu abonnieren, sendet der Client eine `Connection`-Zeile per POST:

```http
POST /messaging/connections
[
  {
    "churchId": "CHU00000001",
    "conversationId": "CON123…",
    "socketId": "abc123",
    "personId": null,            // optional; null für anonyme Live-Stream-Zuschauer
    "displayName": "Anonymous4823"
  }
]
```

Das Posten löst außerdem einen `attendance`-Broadcast in der Konversation aus, damit bestehende Abonnenten erfahren, dass ein neuer Zuschauer beigetreten ist.

### Eine Nachricht senden

`POST /messaging/messages/send` (anonym erlaubt) oder `POST /messaging/messages/` (Authentifizierung erforderlich):

```json
[
  { "churchId": "CHU00000001", "conversationId": "CON123…", "displayName": "John Smith", "content": "Hello!", "messageType": "comment" }
]
```

Der Server speichert die Nachricht, dann sucht `DeliveryHelper.sendConversationMessages()` jede Verbindungszeile für diese `conversationId` heraus und sendet jedem Socket einen Frame `{ action: "message", data: <message> }`.

Bei content-gebundenen Konversationen (z. B. Notizen, die an eine Person angehängt sind) wird zusätzlich ein zweiter Broadcast mit `action: "conversationActivity"` im synthetischen Raum `"content-{type}-{id}"` ausgelöst, damit Listenansichts-Konsumenten wissen, dass sie aktualisieren müssen, ohne die zugrunde liegende Konversation offen zu halten.

### Einen Raum verlassen

```http
DELETE /messaging/connections/:churchId/:conversationId/:socketId
```

Löscht die Verbindungszeile und löst einen abschließenden Attendance-Broadcast aus.

## Serverseitige Komponenten

| Datei | Rolle |
|------|------|
| `Api/src/modules/messaging/helpers/SocketHelper.ts` | Verwaltet den `WebSocketServer`. Weist beim Verbindungsaufbau eine `socketId` zu. Führt einen 30-Sekunden-Ping/Pong-Heartbeat aus (`startHeartbeat`), der jede Verbindung, die ein Pong verpasst, mit `terminate()` beendet und aufräumt. Räumt tote Sockets auf und löst beim Trennen einen erneuten Attendance-Broadcast aus. Stellt `getLiveSocketIds()` und `reapStaleConnections()` bereit, die vom 30-Minuten-Timer-Job verwendet werden, um veraltete `connections`-Zeilen zu löschen — lokal durch Prüfung, welche socketIds im Prozess noch aktiv sind, auf AWS als 24-Stunden-TTL-Absicherung für verpasste `$disconnect`-Ereignisse (API Gateway begrenzt Verbindungen auf ~2 Stunden, sodass dies keine lebende Verbindung entfernen kann) |
| `Api/src/modules/messaging/helpers/DeliveryHelper.ts` | `sendConversationMessages(payload)` liest Verbindungen für den Raum und leitet jeden Frame an den lokalen Socket oder die AWS-API-Gateway-Verbindung weiter. `sendAttendance(churchId, conversationId)` erstellt und sendet den Zuschauer-Snapshot |
| `Api/src/modules/messaging/controllers/ConnectionController.ts` | `POST /` tritt bei, `DELETE /:churchId/:conversationId/:socketId` verlässt, `POST /setName` aktualisiert den Anzeigenamen |
| `Api/src/modules/messaging/controllers/MessageController.ts` | `POST /send` (anonym) und `POST /` (authentifiziert) speichern und verteilen dann |
| `Api/src/modules/messaging/repositories/ConnectionRepo.ts` | `loadForConversation(churchId, conversationId)` ist die maßgebliche Quelle dafür, wer abonniert ist |

## Client-seitige Primitiven (`@churchapps/apphelper`)

Alle fünf Primitiven sind statische Singletons in `apphelper/src/helpers/`. Sie arbeiten so zusammen, dass jeder Tab **einen** WebSocket öffnet, egal wie viele Komponenten auf der Seite gemountet werden.

### `SocketHelper`

Verwaltet die einzelne WebSocket-Verbindung. Der wiedereintrittsfähige `init()`-Aufruf ist idempotent — mehrere Komponenten können ihn aufrufen, ohne doppelte Sockets zu öffnen. Stellt bereit:

- `init()` — öffnet den Socket (oder verwendet ihn erneut) und schließt den `getId`-Handshake ab. Wird aufgelöst, sobald der Handshake abgeschlossen ist, oder nach einem 5-Sekunden-Timeout, sobald die Hintergrund-Retry-Schleife übernommen hat; er wird nie abgelehnt, sodass Aufrufer einen fehlgeschlagenen ersten Verbindungsaufbau nicht gesondert behandeln müssen.
- `addHandler(action, id, fn)` / `removeHandler(id)` — registriert/entfernt Listener nach `action`. Mehrere Handler können dieselbe Aktion abhören.
- `setPersonChurch({ personId, churchId })` — für authentifizierte Aufrufer; löst ein Abonnement des `"alerts"`-Raums aus, damit Push-Benachrichtigungen an diesem Socket ankommen.
- `onSocketIdReady(fn)` — feuert bei jeder neuen socketId, nicht nur beim ersten Mal — beim initialen Handshake und bei jeder erneuten Verbindung. Wird von `SubscriptionManager` verwendet, um ausstehende Beitritte zu übermitteln.
- `checkConnection()` — wird von den unten beschriebenen Resume-Listenern aufgerufen; verbindet sich sofort neu, wenn der Socket bereits geschlossen ist, oder sendet eine Liveness-Probe, wenn er offen erscheint.

**Reconnect-Lebenszyklus.** Ein unerwartetes Schließen plant eine erneute Verbindung mit exponentiellem Backoff (1 s, verdoppelnd bis zu einer Obergrenze von 30 s). `SocketHelper` lauscht außerdem auf `online`, `focus`, `pageshow` und `visibilitychange` an `window`/`document`, um einen wiederaufgenommenen Tab zu erkennen: Wenn der Socket bereits geschlossen ist, verbindet er sich sofort neu und setzt den Backoff zurück; wenn er offen erscheint, sendet er eine `"getId"`-Liveness-Probe und erzwingt eine erneute Verbindung, wenn innerhalb von 3 s kein Frame eintrifft — dies erfasst halboffene Sockets, die zurückbleiben, nachdem ein mobiles Betriebssystem die App suspendiert hat. Nach einem erfolgreichen erneuten Handshake sendet `SocketHelper` die lokale Aktion `"reconnect"` (siehe [Wire-Protokoll](#wire-protokoll)) an jeden für diese Aktion registrierten Handler.

### `SubscriptionManager`

Referenzgezählte Raum-Mitgliedschaft. Mehrere Komponenten, die dieselbe Konversation abonnieren, registrieren nur eine einzige serverseitige Verbindungszeile.

```typescript
import { SubscriptionManager } from "@churchapps/apphelper";

await SubscriptionManager.joinRoom(conversationId, churchId, personId, displayName);
// ... Komponente rendert, empfängt Socket-Frames über ConversationStore.subscribe ...
await SubscriptionManager.leaveRoom(conversationId, churchId);
```

Drei Verhaltensweisen, die Konsumenten kostenlos erhalten:

- **Entprelltes Verlassen (300 ms)** — übersteht das doppelte Mount/Unmount von Reacts StrictMode sowie kurze Remount-Zyklen, ohne das serverseitige Abonnement zu verlieren; `reset()` bricht außerdem alle ausstehenden entprellten Verlassen-Vorgänge ab.
- **Wiedereintritt nach Reconnect** — `SubscriptionManager` merkt sich die `personId`/`displayName`, mit denen jeder Raum betreten wurde, sodass beim `"reconnect"`-Ereignis von `SocketHelper` (und bei jedem `onSocketIdReady`-Aufruf) jede aktive Verbindungszeile mit intakter Identität erneut gepostet wird. Wiedereintritte werden pro socketId dedupliziert, sodass derselbe Reconnect denselben Raum nicht zweimal erneut postet.
- **Späte Bindung der socketId** — `joinRoom` erfasst die Absicht, bevor der Socket seinen Handshake abgeschlossen hat; der eigentliche `POST /connections`-Aufruf erfolgt bei `onSocketIdReady`.

### `ConversationStore`

In-Memory-Cache, indiziert nach `conversationId`. Registriert die Socket-Handler `message` / `deleteMessage` / `privateMessage` genau einmal und wendet eingehende Frames auf die aktuell geöffneten Konversationen an.

```typescript
import { ConversationStore } from "@churchapps/apphelper";

const conv = await ConversationStore.loadByConversationId(conversationId, churchId);
// ↑ verwendet /messages/conversation/:id bei Authentifizierung, /messages/catchup/:churchId/:id bei Anonymität

const unsubscribe = ConversationStore.subscribe(conversationId, (conv) => {
  setMessages(conv.messages);  // erneutes Rendern mit dem neuesten Snapshot
});
// ...
unsubscribe();
ConversationStore.forget(conversationId);  // optionale explizite Bereinigung
```

Authentifizierte Aufrufer erhalten außerdem eine **Personen-Hydrierung** — `personId`s in eingehenden Nachrichten werden über eine gecachte `GET /people/ids`-Abfrage zu `PersonInterface`-Objekten aufgelöst. Anonyme Aufrufer überspringen dies.

Beim `"reconnect"`-Ereignis von `SocketHelper` ruft `ConversationStore` jede Konversation erneut ab, die derzeit aktive `subscribe`-Listener hat, und stellt so Nachrichten wieder her, die während der Verbindungsunterbrechung verpasst wurden. Anonyme Konversationen überspringen dieses Nachholen, wenn ihre `churchId` nie erfasst wurde (der Nachhol-Endpunkt benötigt eine).

### `PresenceStore`

Spiegelt das Muster von `ConversationStore` für die `attendance`-Aktion. Abonnenten erhalten einen `PresenceSnapshot { conversationId, totalViewers, viewers }`, wann immer der Server die Präsenz erneut sendet. Identische Snapshots werden vor der Benachrichtigung dedupliziert, sodass Reconnect-Stürme keine unnötigen Neu-Renderings auslösen.

```typescript
import { PresenceStore } from "@churchapps/apphelper";

const unsubscribe = PresenceStore.subscribe(conversationId, (snapshot) => {
  setViewerCount(snapshot.totalViewers);
});
```

### `NotificationService`

Übergeordneter Boot-Vorgang für **authentifizierte** Aufrufer. Umschließt `SocketHelper.init()`, setzt den Personen-/Kirchenkontext (der automatisch dem `"alerts"`-Raum beitritt) und ruft `ConversationStore.ensureHandlers()` / `PresenceStore.ensureHandlers()` / `SubscriptionManager.setupRejoin()` genau einmal auf. Er registriert außerdem seinen eigenen `"reconnect"`-Handler, der Benachrichtigungs-/PN-Zähler neu lädt, sodass Badges sich nach einer unterbrochenen Verbindung erholen.

```typescript
await NotificationService.getInstance().initialize(userContext);
```

Anonyme Abläufe (der Live-Stream-Chat ist das kanonische Beispiel) überspringen `NotificationService` und rufen die Primitiven direkt auf — siehe `B1App/src/helpers/StreamChatManager.ts` für eine Referenzimplementierung.

## Live-Stream-Chat

Der Live-Stream ist der größte anonyme Konsument des Frameworks. Er verwendet zwei `contentType`s für die Raum-Abgrenzung:

- `streamingLive` — der öffentliche Chat-Tab auf `/stream` (ein Raum pro `streamingService`).
- `streamingLiveHost` — ein privater Raum, der nur für Mitarbeiter mit der Berechtigung `contentApi.chat.host` sichtbar ist. Die Raum-ID wird serverseitig verschlüsselt (`GET /streamingServices/:id/hostChat`), sodass beiläufiges Scraping sie nicht offenlegt.

`B1App/src/helpers/StreamChatManager.ts` startet beide Räume über die vereinheitlichten Primitiven — es gibt keinen live-stream-spezifischen Socket-Code mehr.

## Muster und Stolperfallen

- **Öffnen Sie keinen eigenen WebSocket.** `SocketHelper` ist aus gutem Grund ein Singleton. Wenn Sie eine benutzerdefinierte Aktion abhören müssen, registrieren Sie einen Handler am bestehenden Socket über `SocketHelper.addHandler`.
- **Umgehen Sie `SubscriptionManager` nicht.** Direkte `POST /connections`-Aufrufe funktionieren, verlieren aber Referenzzählung, entprelltes Verlassen und Wiedereintritt nach Reconnect. Gruppenchat- und PN-Konsumenten laufen alle über `SubscriptionManager`.
- **Handler-IDs müssen pro Aktion eindeutig sein.** `SocketHelper.addHandler(action, id, fn)` verwendet `(action, id)` als Schlüssel; die Wiederverwendung derselben ID für zwei Listener ersetzt den ersten. Die vereinheitlichten Stores verwenden IDs wie `"ConversationStore-Message"` und `"PresenceStore-Attendance"`, um Konflikte mit Konsumenten-IDs zu vermeiden.
- **Raum-IDs sind opake Strings.** Die meisten sind Konversations-UUIDs, aber das System unterstützt außerdem `"alerts"` (personenbezogene Benachrichtigungen), `"content-{type}-{id}"` (synthetische Activity-Räume) und die verschlüsselten `streamingLiveHost`-IDs.
- **Die Authentifizierung wird an der REST-Grenze geprüft, nicht am Socket.** Das Beitreten zu einem Raum per `POST /connections` ist anonym erlaubt; die Zugriffskontrolle erfolgt beim Senden der Nachricht (der Message-Controller entscheidet, welche `messageType`s ein anonymer Aufrufer senden darf).

## Verwandte Seiten

- [Architektur der Benachrichtigungen](./architecture/notifications) -- Der In-App-/Push-/E-Mail-Eskalationstrichter, den dieser Transport speist
- [Messaging-Endpunkte](./api/endpoints/messaging) -- Vollständige REST-Oberfläche für Nachrichten, Konversationen, Verbindungen, Geräte
- [Web-Push-Benachrichtigungen](./web-push) -- Browser-Push, getrennt von der In-Page-Socket-Zustellung
- [AppHelper](./shared-libraries/app-helper) -- Das npm-Paket, das die Client-Primitiven bereitstellt
- [Modulstruktur](./api/module-structure) -- Wie das Messaging-Modul serverseitig organisiert ist
