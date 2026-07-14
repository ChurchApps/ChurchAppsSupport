---
title: "Web-Push-Benachrichtigungen"
---

# Web-Push-Benachrichtigungen

<div class="article-intro">

ChurchApps Web-Apps liefern Push-Benachrichtigungen über die W3C Web Push API -- der gleiche Mechanismus, der von Firebase Cloud Messaging auf der Serverseite verwendet wird, aber über den `PushManager` des Browsers statt FCM bereitgestellt. Ein einzelnes VAPID-Schlüsselpaar auf der MessagingApi deckt jeden Verbraucher ab (B1Admin, B1App, zukünftige PWAs).

</div>

## Wenn Push fired

Push ist eine Stufe in einem einzigen Lieferdurchgang innerhalb von `NotificationHelper.attemptDeliveryWithEscalation()` (`Api/src/modules/messaging/helpers/NotificationHelper.ts`): ein In-App-Präferenz-Gate, dann Socket-Lieferung und Push, die im gleichen Durchgang versucht werden (jede hinter ihrem eigenen Präferenz-Gate), dann E-Mail. Ein Empfänger, der die Kategorie stummgeschaltet hat, erreicht niemals Push. Socket-Lieferung, die erfolgreich ist, stoppt Push nicht länger -- jeder Benachrichtigungstyp verhält sich nun auf die gleiche Weise wie Privatnachrichten, daher zeigt eine installierte PWA, die sich im Hintergrund befindet, immer noch eine Benachrichtigung auf Betriebssystem-Ebene an, auch wenn eine Socket-Lieferung bereits gelandet ist; doppelte Banner werden stattdessen von der Service Worker auf Clientseite unterdrückt (siehe [Service Worker-Anforderung](#service-worker-requirement)). Geplante Erinnerungen und von Staff ausgelöste Broadcasts starten direkt auf der Push-Stufe, überspringen den Socket-Schritt vollständig. E-Mail bleibt Timer-gesteuert, eskalierende ungelesene Zeilen nach eigenem Zeitplan statt als Teil dieses Durchgangs.

Die häufigsten Pfade, die Push erreichen:

1. **Inhalts-Benachrichtigungen** -- eine Antwort auf eine Konversation, die die Person verfolgt, eine Erwähnung oder ein anderes Ereignis, das durch `NotificationHelper.createNotifications()` weitergeleitet wird.
2. **Privatnachrichten** -- eine direkte Nachricht durchläuft die gleiche Lieferfunktion und versucht immer Push neben Socket-Lieferung.
3. **Geplante Erinnerungen** -- Ereignis-, Aufgaben- und Serving-Erinnerungen, die vom Erinnerungs-Engine erweitert und versendet werden, die neue Vorkommen direkt auf der Push-Stufe starten.
4. **Von Staff ausgelöste Pushes** -- `POST /messaging/notifications/create`, `/ping` und `/group/send` für einmalige oder Gruppen-Broadcasts.

## Server-Flow

```
NotificationHelper.createNotifications(...) / checkShouldNotify(...) / ReminderEngine.scan(...)
  │
  └─ NotificationHelper.attemptDeliveryWithEscalation(...)
       ├─ In-App-Präferenz-Gate                  ← stummgeschaltete Empfänger bleiben hier stehen, kein Push
       ├─ gleicher Durchgang, beide versucht (keiner gatet den anderen):
       │    ├─ Socket-Lieferung über DeliveryHelper  ← übersprungen für Erinnerungen/Broadcasts (sie starten bei Push)
       │    └─ Push-Präferenz-Gate
       │         └─ WebPushHelper.sendBulkTypedMessages(tokens, title, body, type, contentId)
       │              └─ web-push library → VAPID-signiert POST → Browser-Push-Dienst
       └─ E-Mail-Präferenz-Gate → Timer-gesteuert, eskalierende ungelesene Zeilen separat
```

### Erforderliche Umgebungsvariablen

VAPID-Schlüssel werden in `Environment` gespeichert und müssen vorhanden sein, um Push zu aktivieren:

| Variable | Beschreibung |
|----------|-------------|
| `webPushPublicKey` | VAPID Public Key (base64url). Zurückgegeben an Clients via `GET /messaging/webpush/publicKey` |
| `webPushPrivateKey` | VAPID Private Key. Verwendet zum Signieren jeder ausgehenden Push |
| `webPushSubject` | `mailto:`-URI, die Push-Diensten gemeldet wird. Standardmäßig `mailto:support@churchapps.org` |

`WebPushHelper.isEnabled()` gibt `false` zurück, wenn einer der Schlüssel fehlt -- das Messaging-Modul funktioniert weiterhin, Push-Lieferungen sind einfach keine-op.

### Ein VAPID-Schlüsselpaar generieren

```bash
npx web-push generate-vapid-keys
```

Fügen Sie die Ausgabe zu Ihrer `.env` (lokal) oder AWS SSM Parameter Store (bereitgestellt) hinzu. Das Drehen von Schlüsseln macht jedes bestehende Abonnement ungültig -- Clients müssen sich beim nächsten Laden der Seite erneut registrieren.

## Storage-Modell

Web-Push-Abonnements werden in der bestehenden `devices`-Tabelle neben FCM-Gerätesätzen gespeichert. Sie werden durch ein `webpush:`-Präfix in der `fcmToken`-Spalte unterschieden:

```
fcmToken = "webpush:" + JSON.stringify({ endpoint, keys: { p256dh, auth } })
```

Dies ermöglicht einen einzigen `loadByPersonId`-Aufruf, um jedes Gerät, das ein Benutzer registriert hat, unabhängig von der Plattform zurückzugeben. `WebPushHelper.isWebPushToken(token)` und `decodeSubscription(token)` verarbeiten die Präfix-Logik.

## Endpoints

Basis-Pfad: `/messaging/webpush`

| Methode | Pfad | Auth | Beschreibung |
|---------|------|------|-------------|
| GET | `/publicKey` | Öffentlich | Gibt `{ publicKey, enabled }` zurück. Clients geben `publicKey` an `pushManager.subscribe({ applicationServerKey })` weiter |
| POST | `/subscribe` | JWT | Registriert (oder aktualisiert) ein Abonnement für den authentifizierten Benutzer. Text: `{ subscription: { endpoint, keys: { p256dh, auth } }, appName?, deviceInfo?, label? }` |
| POST | `/unsubscribe` | Öffentlich | Löscht jede Gerätezelle, deren `fcmToken` den angegebenen Endpunkt enthält. Text: `{ endpoint }` |
| DELETE | `/subscription/:id` | JWT | Löscht eine bestimmte Gerätezeile nach ihrer Server-seitigen ID |

## Client-Primitiv: `WebPushHelper`

`@churchapps/apphelper`'s `WebPushHelper` ist der einzelne Client-seitige Einstiegspunkt. Hosts konfigurieren ihn einmal beim Starten und rufen `subscribe()` nach dem Login auf.

```typescript
import { WebPushHelper } from "@churchapps/apphelper";

// In Ihrem App-Bootstrap (z.B., _app.tsx, layout.tsx)
WebPushHelper.configure({
  scope: "/",                // Service Worker-Bereich; passt sw.js-Registrierung
  appName: "B1AppPwa"        // gespeichert auf der Gerätezeile, nützlich zum Filtern nach Oberfläche
});

// Nach dem Login (und nach jedem userChurch-Wechsel)
await WebPushHelper.subscribe();
```

Verhalten, die Verbraucher kostenlos bekommen:

- **Funktionsprüfung** -- `isSupported()` gibt `false` auf Browsern ohne `serviceWorker` / `PushManager` / `Notification` zurück.
- **Cooldown** -- `canPromptNow()` erzwingt einen 7-Tage-Cooldown zwischen Prompts über `localStorage`, daher werden Benutzer, die den Betriebssystem-Prompt abgelehnt haben, nicht auf jeder Sitzung erneut gefragt.
- **Opt-out** -- `setOptedOut(true)` und `unsubscribe()` blockieren erneutes Prompting und entfernen die Server-seitige Gerätezeile.
- **Standalone-PWA-Erkennung** -- `isStandalone()` ermöglicht es Hosts, iOS-Push-Prompts hinter "Benutzer hat die PWA auf dem Startbildschirm installiert" zu gates (iOS erlaubt Push nur von installierten PWAs).
- **Erneute Registrierung bei Kirchen-Wechsel** -- `refreshEnrollment()` postet das bestehende Browser-Abonnement erneut gegen den neuen `userChurch`, ohne den Benutzer erneut zu prompting. Rufen Sie es vom `userChurch`-Wechsel-Handler aus auf.

### Service Worker-Anforderung

Der `PushManager` des Browsers löst ein Abonnement nur auf, wenn eine Service Worker im konfigurierten Bereich registriert ist. ChurchApps PWAs verwenden [Serwist](https://serwist.dev/) (Next.js Apps) oder workbox für Service Worker-Generierung. Da der Server jetzt immer Push neben Socket-Lieferung versucht (siehe [Wenn Push fired](#when-push-fires)), ist die Service Worker der Dedup-Punkt: Ihr `push`-Handler muss `showNotification` unterdrücken, wenn ein fokussierter/sichtbarer Client bereits auf dem Deep-Link-Ziel der Benachrichtigung ist, aber sollte das App-Badge immer aktualisieren, unabhängig davon, ob das Banner angezeigt wurde:

```javascript
// public/sw.js (oder was auch immer Serwist/workbox emittiert)
self.addEventListener("push", (event) => {
  const data = event.data?.json() ?? {};
  const title = data.title || "ChurchApps";
  const target = deepLinkFor(data.type, data.contentId, data);

  event.waitUntil((async () => {
    if (typeof data.badgeCount === "number") await updateAppBadge(data.badgeCount); // läuft immer, auch wenn das Banner unterdrückt ist

    const clients = await self.clients.matchAll({ type: "window", includeUncontrolled: true });
    // Gleicher Pfadname; für Privatnachrichten auch gleiche conversationId.
    const alreadyViewing = clients.some((client) => (client.focused || client.visibilityState === "visible") && clientMatchesTarget(client.url, target));
    if (alreadyViewing) return;

    await self.registration.showNotification(title, {
      body: data.body,
      data: { type: data.type, contentId: data.contentId, url: target },
      icon: "/icons/icon-192.png"
    });
  })());
});

self.addEventListener("notificationclick", (event) => {
  event.notification.close();
  const { url: target } = event.notification.data || {};
  event.waitUntil((async () => {
    const clients = await self.clients.matchAll({ type: "window", includeUncontrolled: true });

    const exact = clients.find((client) => clientMatchesTarget(client.url, target));
    if (exact) return exact.focus(); // bereits auf dem Ziel: Focus, nicht navigieren

    const mobileClient = clients.find((client) => new URL(client.url).pathname.startsWith("/mobile"));
    if (mobileClient) {
      await mobileClient.focus();
      return mobileClient.navigate(target);
    }

    return self.clients.openWindow(target);
  })());
});
```

`deepLinkFor` / `clientMatchesTarget` sind Verbraucher-spezifisch -- siehe `B1App/src/app/sw.ts` für die Referenzimplementierung. B1App routed `privateMessage` zu `/mobile/messages/:personId`, B1Admin routed `notification` zu seinem Benachrichtigungs-Panel usw.

## Betriebsnotizen

- **`gone: true`-Ergebnisse** -- `WebPushHelper.sendBulk` gibt `{ token, success, gone, errorMessage }` pro Empfänger zurück. Ein `gone: true`-Ergebnis (Push-Dienst antwortet `404` oder `410`) bedeutet, dass das Abonnement permanent ungültig ist; nachgelagerter Code in `NotificationHelper` löscht diese Gerätezeilen, damit sie nicht erneut versucht werden.
- **TTL** -- Push-Nachrichten werden mit `TTL: 86400` (24 Stunden) versendet. Wenn sich der Browser des Benutzers nicht innerhalb von 24 Stunden mit dem Push-Dienst verbindet, wird der Push abgebrochen.
- **Keine Wiederholungen** -- ein transienter Fehler (Timeout, 5xx) wird protokolliert und nicht erneut versucht. Push ist Best-Effort; die In-Page-Socket und die E-Mail-Benachrichtigungsstufe verarbeiten die Dauerhaftigkeitsgeschichte.
- **Deaktivierte Umgebungen** -- Staging- und Dev-Umgebungen können die VAPID-Schlüssel leer lassen; `WebPushHelper.isEnabled()` gibt `false` zurück und Pushes werden abgekürzt. Dies ist das beabsichtigte Verhalten für Umgebungen ohne ihre eigene VAPID-Identität.

## Verwandte Seiten

- [Benachrichtigungen-Architektur](./architecture/notifications) -- Der vollständige In-App-/Push-/E-Mail-Eskalations-Trichter und der Erinnerungs-Engine
- [Echtzeit-Architektur](./realtime) -- WebSocket-Lieferung; Push feuert jetzt aus dem gleichen In-App-Trichter neben Socket-Lieferung im gleichen Durchgang, nicht nur als Fallback, wenn eine Socket-Lieferung nicht landet
- [Messaging Endpoints](./api/endpoints/messaging) -- Benachrichtigungen, Geräte und der Rest der Messaging-Oberfläche
- [AppHelper](./shared-libraries/app-helper) -- Das npm-Paket, das `WebPushHelper` versendet
