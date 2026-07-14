---
title: "Echtzeit-Architektur"
---

# Echtzeit-Architektur

<div class="article-intro">

ChurchApps nutzt ein einziges WebSocket-basiertes Liefersystem für jede Echtzeit-Oberfläche — Gruppenchat, private Nachrichten, Inhalts-Notizen, Live-Stream-Chat und Präsenz/Anwesenheit. Diese Seite dokumentiert das Protokoll, den Server und die Client-Primitive, die Konsumenten nutzen.

</div>

## Übersicht

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

Das Protokoll hat drei Teile:

1. **Ein persistenter WebSocket** pro Browser-Tab, geöffnet von `SocketHelper`.
2. **Verbindungs-Zeilen** (`POST /messaging/connections`) in der `connections`-Tabelle aufgezeichnet — diese kennzeichnen ein `(socketId, churchId, conversationId)` Tupel als Abonnent eines Raums.
3. **Server-seitige Fan-Out** von `DeliveryHelper.sendConversationMessages()` — wenn eine Nachricht gespeichert wird (`POST /messaging/messages/send`) liest der Server die passenden Verbindungs-Zeilen und schiebt eine typisierte Payload an jeden offenen Socket.

Es gibt kein Socket.IO, kein Long-Polling Fallback und keinen separaten Microservice. Der WebSocket läuft im gleichen Prozess wie die REST API (`web` Lambda für HTTP, `socket` Lambda für WebSocket im AWS; ein kombinierter Prozess lokal und auf Railway).

## Ports und Transport

| Umgebung | HTTP | WebSocket |
|-------------|------|-----------|
| Lokale Entwicklung | `8084` | `ws://localhost:8087` (separater `WebSocketServer`) |
| Railway / Docker / Single-Port-Hosts (`RAILWAY_ENVIRONMENT` oder `SELF_HOSTED` gesetzt) | geteilt | geteilt HTTP Server (`SocketHelper.attachToServer()`) |
| AWS Lambda | API Gateway HTTP | API Gateway WebSocket (`$connect` / `$disconnect` / `$default` Routes) |

Der Transport-Selector ist die `deliveryProvider` Konfiguration:

- `local` → Rohe `ws` Library; Clients verbinden sich zu `MessagingApiSocket` von `CommonEnvironmentHelper`.
- `aws` → API Gateway WebSocket; der Server postet Payloads zu aktiven Verbindungen über `@aws-sdk/client-apigatewaymanagementapi`.

Der Client muss nie wissen, welcher in Nutzung ist — er spricht das gleiche JSON-Protokoll entweder so.

## Wire-Protokoll

Jeder Frame ist JSON der Form `PayloadInterface`:

```typescript
interface PayloadInterface {
  churchId: string;
  conversationId: string;  // der "Raum" — üblicherweise eine UUID, manchmal "alerts" oder "content-{type}-{id}"
  action: PayloadAction;
  data: unknown;
}

type PayloadAction =
  | "socketId"            // server → client, nach Verbindung, trägt die socketId um für Room-Joins zu nutzen
  | "message"             // server → client, neue Nachricht
  | "deleteMessage"       // server → client, Nachricht entfernt
  | "privateMessage"      // server → client, Badge-Count Ping zum Empfänger's "alerts" Raum wenn eine direkte Nachricht eskaliert; der Nachrichtentext selbst kommt über die ordinäre "message" Action innen der offenen Konversation
  | "reaction"            // server → client, Emoji Reaktion umgeschaltet auf einer Nachricht; Daten sind { messageId, conversationId, personId, emoji, added } (added=false bedeutet entfernt). Broadcast zum Konversations-Raum von POST /messaging/messages/:messageId/reactions
  | "conversationActivity"// server → client, sekundäres "etwas passiert" Signal für Content-Room Abonnenten
  | "attendance"          // server → client, Zuschauer-Liste / Präsenz-Snapshot
  | "notification"        // server → client, generische Benachrichtigung (Zähler usw.)
  | "reconnect"           // client-intern, lokal dispatched durch SocketHelper nach einer neuen socketId Handshake vollständig nach einem Drop — entweder eine exponential-backoff Wiederverbindung nach einem unerwarteten Close oder eine unmittelbare Wiederverbindung triggered durch die Resume-Prüfung (Tab-Fokus/Sichtbarkeit/Online); wird nie vom Server gesendet
  | "alert" | "callout";  // Legacy, siehe Connections Endpunkt Referenz
```

### Handshake

1. Client öffnet den Socket und sendet die wörtliche Zeichenkette `"getId"`.
2. Server antwortet mit `{ action: "socketId", data: "<id>" }`.
3. Client speichert die `socketId` und nutzt sie als dritte Koordinate jeder Room-Abonnement.

### Einen Raum beitreten

Ein "Raum" ist nur ein `(churchId, conversationId)` Tupel. Um zu abonnieren, postet der Client eine `Connection` Zeile:

```http
POST /messaging/connections
[
  {
    "churchId": "CHU00000001",
    "conversationId": "CON123…",
    "socketId": "abc123",
    "personId": null,            // optional; null für anonym Live-Stream Zuschauer
    "displayName": "Anonymous4823"
  }
]
```

Posting triggert auch einen `attendance` Broadcast auf der Konversation so existierende Abonnenten lernen, dass ein neuer Zuschauer beigetreten ist.

### Eine Nachricht senden

`POST /messaging/messages/send` (anonym-erlaubt) oder `POST /messaging/messages/` (auth-erforderlich):

```json
[
  { "churchId": "CHU00000001", "conversationId": "CON123…", "displayName": "John Smith", "content": "Hello!", "messageType": "comment" }
]
```

Der Server speichert die Nachricht, dann `DeliveryHelper.sendConversationMessages()` sucht jede Verbindungs-Zeile für diesen `conversationId` und sendet jeden Socket ein `{ action: "message", data: <message> }` Frame.

Für Inhalts-gebundene Konversationen (z.B. Notizen an eine Person gebunden) ein zweiter Broadcast mit `action: "conversationActivity"` schießt im synthetischen `"content-{type}-{id}"` Raum so List-View Konsumenten wissen, dass sie ohne die darunterliegende Konversation offen zu halten erfrischen können.

### Einen Raum verlassen

```http
DELETE /messaging/connections/:churchId/:conversationId/:socketId
```

Löscht die Verbindungs-Zeile und triggert einen abschließenden Attendance-Broadcast.

## Server-seitige Komponenten

| Datei | Rolle |
|------|------|
| `Api/src/modules/messaging/helpers/SocketHelper.ts` | Besitzt den `WebSocketServer`. Weist `socketId` auf Verbindung zu. Läuft einen 30s Ping/Pong Heartbeat (`startHeartbeat`), der jeden Socket der einen Pong vermisst `terminate()` und bereinigt. Bereinigt Dead Sockets und triggert einen Attendance-Rebroadcast bei Trennung. Exponiert `getLiveSocketIds()` und `reapStaleConnections()`, nutzt vom 30-Minuten-Timer-Job um stale `connections` Zeilen zu löschen — lokal durch Checking welche socketIds noch in-process lebendig sind, auf AWS als 24h-TTL Backstop für verpasste `$disconnect` Events (API Gateway caps Verbindungen bei ~2h, daher kann das nie eine lebendige ein reapen) |
| `Api/src/modules/messaging/helpers/DeliveryHelper.ts` | `sendConversationMessages(payload)` liest Verbindungen für den Raum und routet jeden Frame zum lokalen Socket oder der AWS API Gateway Verbindung. `sendAttendance(churchId, conversationId)` baut und broadcastet den Zuschauer-Snapshot |
| `Api/src/modules/messaging/controllers/ConnectionController.ts` | `POST /` beitreten, `DELETE /:churchId/:conversationId/:socketId` verlassen, `POST /setName` Anzeigenamens aktualisieren |
| `Api/src/modules/messaging/controllers/MessageController.ts` | `POST /send` (anonym) und `POST /` (authed) speichern dann fan out |
| `Api/src/modules/messaging/repositories/ConnectionRepo.ts` | `loadForConversation(churchId, conversationId)` ist die Quelle der Wahrheit für wer abonniert |

## Client-seitige Primitive (`@churchapps/apphelper`)

Alle fünf Primitive sind statische Singletons in `apphelper/src/helpers/`. Sie kooperieren so dass jeder Tab **einen** WebSocket öffnet unabhängig davon wie viele Komponenten auf der Seite mounten.

### `SocketHelper`

Besitzt die einzelne WebSocket-Verbindung. Re-entrant `init()` ist idempotent — mehrere Komponenten können es aufrufen ohne doppelte Sockets zu öffnen. Exponiert:

- `init()` — öffnen (oder re-nutzen) den Socket und den `getId` Handshake vollständig. Resolved einmal der Handshake vollständig oder, nach einem 5s Timeout, einmal die Background Retry-Loop übernommen hat; es lehnt nie ab, daher Aufrufer müssen keinen Failed First Connect Spezialfall.
- `addHandler(action, id, fn)` / `removeHandler(id)` — registrieren/abmelden Listener nach `action`. Mehrere Handler können zum gleichen Action hören.
- `setPersonChurch({ personId, churchId })` — für authentifizierte Aufrufer; triggert einen `"alerts"` Raum-Abonnement so Push-Benachrichtigungen auf diesen Socket kommen.
- `onSocketIdReady(fn)` — schießt auf jeder neuen socketId, nicht nur der ersten — das anfängliche Handshake und jeden späteren Reconnect. Nutzt von `SubscriptionManager` um ausstehende Joins zu leeren.
- `checkConnection()` — invoked durch die Resume Listener unten; reconnectiert unmittelbar wenn der Socket bereits geschlossen ist, oder sendet eine Liveness-Probe wenn es offen aussieht.

**Reconnect Lebensdauer.** Ein unerwarteter Close terminiert einen Reconnect mit exponentieller Backoff (1s, verdopplung bis zu einer 30s Kappe). `SocketHelper` hört auch auf `online`, `focus`, `pageshow` und `visibilitychange` auf `window`/`document` um einen Resumed Tab zu erkennen: wenn der Socket bereits geschlossen ist reconnectiert er unmittelbar und setzt Backoff zurück; wenn es offen aussieht sendet er eine `"getId"` Liveness-Probe und erzwingt einen Reconnect wenn kein Frame innerhalb von 3s kommt — dies fängt halb-offene Sockets nach auf, die ein Mobile OS die App suspendiert hinterlässt. Auf einem erfolgreich Re-Handshake dispatched `SocketHelper` die lokale `"reconnect"` Action (siehe [Wire protocol](#wire-protocol)) an jeden registrierten Handler für diese Action.

### `SubscriptionManager`

Ref-gezählter Room-Membership. Mehrere Komponenten zum gleichen Konversation abonnieren registrieren nur eine Server-seitige Verbindungs-Zeile.

```typescript
import { SubscriptionManager } from "@churchapps/apphelper";

await SubscriptionManager.joinRoom(conversationId, churchId, personId, displayName);
// ... Komponente rendert, erhält Socket Frames über ConversationStore.subscribe ...
await SubscriptionManager.leaveRoom(conversationId, churchId);
```

Drei Verhalten die Konsumenten kostenlos bekommen:

- **Debounced Leave (300 ms)** — überlebt React StrictMode's Double Mount/Unmount und kurze Remount Zyklen ohne die Server-seitige Abonnement zu fallen; `reset()` bricht auch alle ausstehenden debounced Verlasse ab.
- **Reconnect Rejoin** — `SubscriptionManager` merkt sich die `personId`/`displayName` nutzt um jeden Raum beizutreten, daher auf `SocketHelper`'s `"reconnect"` Event (und auf jedem `onSocketIdReady` Anruf) postet es jede aktive Verbindungs-Zeile erneut mit Identität intakt. Rejoins sind dedupliziert pro socketId daher der gleiche Reconnect postet keinen Raum zweimal.
- **Late-Binding socketId** — `joinRoom` Records Intent vor den Socket finisht sein Handshake; das tatsächliche `POST /connections` schießt auf `onSocketIdReady`.

### `ConversationStore`

In-Speicher Cache gerangiert nach `conversationId`. Registriert `message` / `deleteMessage` / `privateMessage` Socket Handler genau einmal und wende inbound Frames auf welche Konversationen gerade offen an.

```typescript
import { ConversationStore } from "@churchapps/apphelper";

const conv = await ConversationStore.loadByConversationId(conversationId, churchId);
// ↑ nutzt /messages/conversation/:id wenn authentifiziert, /messages/catchup/:churchId/:id wenn anonym

const unsubscribe = ConversationStore.subscribe(conversationId, (conv) => {
  setMessages(conv.messages);  // re-render mit dem letzten Snapshot
});
// ...
unsubscribe();
ConversationStore.forget(conversationId);  // optional explizite Bereinigung
```

Authentifizierte Aufrufer bekommen auch **Personen-Hydration** — `personId`s auf inbound Nachrichten werden zu `PersonInterface` Objekten über einen gecachten `GET /people/ids` Lookup aufgelöst. Anonym-Aufrufer Skip dies.

Auf `SocketHelper`'s `"reconnect"` Event, `ConversationStore` refetches jede Konversation die gerade aktive `subscribe` Listener hat, erholt sich Nachrichten die verpasst wurden während der Socket unten war. Anonym-Konversationen skip dies Catch-Up wenn ihr `churchId` nie aufgezeichnet wurde (der Catch-Up-Endpunkt erfordert einen).

### `PresenceStore`

Spiegelt `ConversationStore`'s Muster für die `attendance` Action. Abonnenten empfangen einen `PresenceSnapshot { conversationId, totalViewers, viewers }` immer wenn der Server die Präsenz rebroadcasted. Identische Snapshots sind dedupliziert vor Benachrichtigung, daher Reconnect Stürme triggern nicht unn ötige Re-Renders.

```typescript
import { PresenceStore } from "@churchapps/apphelper";

const unsubscribe = PresenceStore.subscribe(conversationId, (snapshot) => {
  setViewerCount(snapshot.totalViewers);
});
```

### `NotificationService`

Top-Level Boot für **authentifizierte** Aufrufer. Wrappt `SocketHelper.init()`, setzt den Person/Kirchen-Context (die Auto-beitritte den `"alerts"` Raum), und ruft `ConversationStore.ensureHandlers()` / `PresenceStore.ensureHandlers()` / `SubscriptionManager.setupRejoin()` genau einmal. Sie registriert auch ihren eigenen `"reconnect"` Handler, der Benachrichtigungs/PM Zähler neu lädt, daher Badges erholen sich nach einer fallen Verbindung.

```typescript
await NotificationService.getInstance().initialize(userContext);
```

Anonym-Flows (der Live-Stream-Chat ist das kanonische Beispiel) skip `NotificationService` und rufen die Primitive direkt auf — siehe `B1App/src/helpers/StreamChatManager.ts` für eine Referenz-Implementierung.

## Live-Stream-Chat

Der Live-Stream ist der größte anonym Konsument des Frameworks. Sie nutzt zwei `contentType`s für Room-Geltungsbereich:

- `streamingLive` — der öffentliche Chat-Tab auf `/stream` (ein Raum pro `streamingService`).
- `streamingLiveHost` — ein privater Raum sichtbar nur für Staff mit der `contentApi.chat.host` Berechtigung. Die Raum-ID ist verschlüsselt auf dem Server (`GET /streamingServices/:id/hostChat`) daher beiläufiges Scraping enthüllt es nicht.

`B1App/src/helpers/StreamChatManager.ts` boots beide Räume über die einheitlichen Primitive — es gibt keine Live-Stream-spezifischen Socket-Code mehr.

## Muster und Fallstricke

- **Öffnen Sie keinen eigenen WebSocket.** `SocketHelper` ist ein Singleton dafür. Wenn Sie eine benutzer-definierte Action hören müssen, registrieren Sie einen Handler auf dem existierenden Socket über `SocketHelper.addHandler`.
- **Umgehen Sie nicht `SubscriptionManager`.** Direkte `POST /connections` Aufrufe funktionieren aber verlieren Ref Zählung, debounced Leave und Reconnect Rejoin. Gruppen-Chat und PM Konsumenten gehen alle durch `SubscriptionManager`.
- **Handler IDs müssen eindeutig pro Action sein.** `SocketHelper.addHandler(action, id, fn)` Schlüssel nach `(action, id)`; Wiedernutzen der gleichen id für zwei Listener ersetzt den ersten. Die einheitlichen Stores nutzen IDs wie `"ConversationStore-Message"` und `"PresenceStore-Attendance"` um klarer der Konsumenten IDs zu bleiben.
- **Room IDs sind opake Zeichenketten.** Die meisten sind Konversation UUIDs aber das System unterstützt auch `"alerts"` (Pro-Person Benachrichtigungen), `"content-{type}-{id}"` (synthetische Activity-Räume) und die verschlüsselten `streamingLiveHost` IDs.
- **Authentifizierung ist bei der REST-Grenze überprüft, nicht dem Socket.** Einen Raum über `POST /connections` beizutreten ist anonym-erlaubt; Zugriffskontrolle geschieht bei Nachricht-Sende-Zeit (der Nachrichtencontroller entscheidet welche `messageType`s ein anonym Aufrufer senden kann).

## Verwandte Seiten

- [Benachrichtigungen Architektur](./architecture/notifications) — Die In-App/Push/E-Mail Escalation Trichter dieser Transport speist in
- [Messaging Endpunkte](./api/endpoints/messaging) — Vollständige REST-Oberfläche für Nachrichten, Konversationen, Verbindungen, Geräte
- [Web Push-Benachrichtigungen](./web-push) — Browser Push, getrennt von In-Page Socket-Lieferung
- [AppHelper](./shared-libraries/app-helper) — Das npm Paket das den Client Primitive versendet
- [Modulstruktur](./api/module-structure) — Wie das Messaging-Modul Server-seitig organisiert ist
