---
title: "Web-Push-Benachrichtigungen"
---

# Web-Push-Benachrichtigungen

<div class="article-intro">

ChurchApps-Webanwendungen liefern Push-Benachrichtigungen über die W3C Web Push API — derselbe Mechanismus, der serverseitig von Firebase Cloud Messaging verwendet wird, jedoch über den nativen `PushManager` des Browsers statt über FCM ausgeliefert. Ein einziges VAPID-Schlüsselpaar auf der MessagingApi deckt jeden Consumer ab (B1Admin, B1App, zukünftige PWAs).

</div>

## Wann Push auslöst

Push ist eine Stufe in einem einzelnen Zustelldurchgang innerhalb von `NotificationHelper.attemptDeliveryWithEscalation()` (`Api/src/modules/messaging/helpers/NotificationHelper.ts`): ein In-App-Präferenz-Gate, dann werden Socket-Zustellung und Push im selben Durchgang versucht (jeweils hinter ihrem eigenen Präferenz-Gate), dann E-Mail. Ein Empfänger, der die Kategorie stummgeschaltet hat, erreicht Push nie. Eine erfolgreiche Socket-Zustellung stoppt Push nicht mehr — jeder Benachrichtigungstyp verhält sich jetzt so, wie private Nachrichten es schon immer taten, sodass eine installierte PWA im Hintergrund weiterhin eine Benachrichtigung auf Betriebssystemebene anzeigt, selbst wenn eine Socket-Zustellung bereits angekommen ist; doppelte Banner werden stattdessen clientseitig durch den Service Worker unterdrückt (siehe [Service-Worker-Anforderung](#service-worker-anforderung)). Geplante Erinnerungen und von Mitarbeitern ausgelöste Broadcasts starten direkt auf der Push-Stufe und überspringen den Socket-Schritt vollständig. E-Mail bleibt timergesteuert und eskaliert ungelesene Zeilen nach eigenem Zeitplan, statt Teil dieses Durchgangs zu sein.

Die häufigsten Wege, die Push erreichen:

1. **Content-Benachrichtigungen** — eine Antwort auf eine Konversation, der die Person folgt, eine Erwähnung oder ein anderes Ereignis, das über `NotificationHelper.createNotifications()` geleitet wird.
2. **Private Nachrichten** — eine Direktnachricht durchläuft dieselbe Zustellfunktion und versucht immer Push neben der Socket-Zustellung.
3. **Geplante Erinnerungen** — Ereignis-, Aufgaben- und Dienst-Erinnerungen, die von der Erinnerungsengine erweitert und ausgeliefert werden, welche neue Vorkommen direkt auf der Push-Stufe startet.
4. **Von Mitarbeitern ausgelöste Pushes** — `POST /messaging/notifications/create`, `/ping` und `/group/send` für einmalige oder Gruppen-Broadcasts.

## Server-Ablauf

```
NotificationHelper.createNotifications(...) / checkShouldNotify(...) / ReminderEngine.scan(...)
  │
  └─ NotificationHelper.attemptDeliveryWithEscalation(...)
       ├─ in-app preference gate                  ← muted recipients stop here, no push
       ├─ same pass, both attempted (neither gates the other):
       │    ├─ socket delivery via DeliveryHelper  ← skipped for reminders/broadcasts (they start at push)
       │    └─ push preference gate
       │         └─ WebPushHelper.sendBulkTypedMessages(tokens, title, body, type, contentId)
       │              └─ web-push library → VAPID-signed POST → browser push service
       └─ email preference gate → timer-driven, escalates unread rows separately
```

### Erforderliche Umgebungsvariablen

VAPID-Schlüssel werden in `Environment` gespeichert und müssen vorhanden sein, damit Push aktiviert werden kann:

| Variable | Beschreibung |
|----------|-------------|
| `webPushPublicKey` | VAPID Public Key (base64url). Wird über `GET /messaging/webpush/publicKey` an Clients zurückgegeben |
| `webPushPrivateKey` | VAPID Private Key. Wird verwendet, um jeden ausgehenden Push zu signieren |
| `webPushSubject` | `mailto:`-URI, die an Push-Dienste gemeldet wird. Standard ist `mailto:support@churchapps.org` |

`WebPushHelper.isEnabled()` gibt `false` zurück, wenn einer der beiden Schlüssel fehlt — das Messaging-Modul funktioniert weiter, Push-Zustellungen sind dann lediglich No-ops.

### Ein VAPID-Schlüsselpaar generieren

```bash
npx web-push generate-vapid-keys
```

Fügen Sie die Ausgabe zu Ihrer `.env` (lokal) oder dem AWS SSM Parameter Store (deployed) hinzu. Das Rotieren der Schlüssel macht jedes bestehende Abonnement ungültig — Clients müssen sich beim nächsten Seitenaufruf neu registrieren.

## Speichermodell

Web-Push-Abonnements werden in der bestehenden `devices`-Tabelle neben FCM-Gerätedatensätzen gespeichert. Sie werden durch ein `webpush:`-Präfix auf der Spalte `fcmToken` unterschieden:

```
fcmToken = "webpush:" + JSON.stringify({ endpoint, keys: { p256dh, auth } })
```

Dadurch kann ein einziger `loadByPersonId`-Aufruf jedes Gerät zurückgeben, das ein Benutzer registriert hat, unabhängig von der Plattform. `WebPushHelper.isWebPushToken(token)` und `decodeSubscription(token)` übernehmen die Präfix-Logik.

## Endpunkte

Basispfad: `/messaging/webpush`

| Methode | Pfad | Auth | Beschreibung |
|--------|------|------|-------------|
| GET | `/publicKey` | Öffentlich | Gibt `{ publicKey, enabled }` zurück. Clients übergeben `publicKey` an `pushManager.subscribe({ applicationServerKey })` |
| POST | `/subscribe` | JWT | Registriert (oder aktualisiert) ein Abonnement für den authentifizierten Benutzer. Body: `{ subscription: { endpoint, keys: { p256dh, auth } }, appName?, deviceInfo?, label? }` |
| POST | `/unsubscribe` | Öffentlich | Löscht jede Geräte-Zeile, deren `fcmToken` den angegebenen Endpunkt enthält. Body: `{ endpoint }` |
| DELETE | `/subscription/:id` | JWT | Löscht eine bestimmte Geräte-Zeile anhand ihrer serverseitigen ID |

## Client-Primitive: `WebPushHelper`

Der `WebPushHelper` von `@churchapps/apphelper` ist der einzige clientseitige Einstiegspunkt. Hosts konfigurieren ihn einmal beim Start und rufen nach dem Login `subscribe()` auf.

```typescript
import { WebPushHelper } from "@churchapps/apphelper";

// In your app's bootstrap (e.g., _app.tsx, layout.tsx)
WebPushHelper.configure({
  scope: "/",                // service worker scope; matches sw.js registration
  appName: "B1AppPwa"        // stored on the device row, useful for filtering by surface
});

// After login (and after every userChurch change)
await WebPushHelper.subscribe();
```

Verhalten, das Consumer kostenlos erhalten:

- **Fähigkeitsprüfung** — `isSupported()` gibt `false` zurück bei Browsern ohne `serviceWorker` / `PushManager` / `Notification`.
- **Abklingzeit** — `canPromptNow()` erzwingt eine 7-tägige Abklingzeit zwischen Aufforderungen über `localStorage`, damit Benutzer, die die Betriebssystem-Aufforderung ablehnen, nicht bei jeder Sitzung erneut gefragt werden.
- **Opt-out** — `setOptedOut(true)` und `unsubscribe()` blockieren erneutes Nachfragen und entfernen die serverseitige Geräte-Zeile.
- **Standalone-PWA-Erkennung** — `isStandalone()` erlaubt es Hosts, iOS-Push-Aufforderungen hinter „Benutzer hat die PWA auf dem Startbildschirm installiert" zu blockieren (iOS erlaubt Push nur von installierten PWAs).
- **Neuregistrierung beim Kirchenwechsel** — `refreshEnrollment()` postet das bestehende Browser-Abonnement erneut gegen die neue `userChurch`, ohne den Benutzer erneut zu fragen. Rufen Sie es vom `userChurch`-Änderungshandler aus auf.

### Service-Worker-Anforderung

Der `PushManager` des Browsers löst ein Abonnement nur auf, wenn ein Service Worker im konfigurierten Scope registriert ist. ChurchApps-PWAs verwenden [Serwist](https://serwist.dev/) (Next.js-Apps) oder Workbox zur Service-Worker-Generierung. Da der Server jetzt immer Push zusammen mit der Socket-Zustellung versucht (siehe [Wann Push auslöst](#wann-push-auslöst)), ist der Service Worker der Deduplizierungspunkt: sein `push`-Handler muss `showNotification` unterdrücken, wenn ein fokussierter/sichtbarer Client sich bereits auf dem Deep-Link-Ziel der Benachrichtigung befindet, sollte aber unabhängig davon, ob der Banner angezeigt wurde, immer das App-Badge aktualisieren:

```javascript
// public/sw.js (or whatever Serwist/workbox emits)
self.addEventListener("push", (event) => {
  const data = event.data?.json() ?? {};
  const title = data.title || "ChurchApps";
  const target = deepLinkFor(data.type, data.contentId, data);

  event.waitUntil((async () => {
    if (typeof data.badgeCount === "number") await updateAppBadge(data.badgeCount); // always runs, even if the banner is suppressed

    const clients = await self.clients.matchAll({ type: "window", includeUncontrolled: true });
    // Same pathname; for private messages, also same conversationId.
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
    if (exact) return exact.focus(); // already on the target: focus, don't navigate

    const mobileClient = clients.find((client) => new URL(client.url).pathname.startsWith("/mobile"));
    if (mobileClient) {
      await mobileClient.focus();
      return mobileClient.navigate(target);
    }

    return self.clients.openWindow(target);
  })());
});
```

`deepLinkFor` / `clientMatchesTarget` sind consumer-spezifisch — siehe `B1App/src/app/sw.ts` für die Referenzimplementierung. B1App routet `privateMessage` zu `/mobile/messages/:personId`, B1Admin routet `notification` zu seinem Alerts-Panel usw.

## Betriebshinweise

- **`gone: true`-Ergebnisse** — `WebPushHelper.sendBulk` gibt pro Empfänger `{ token, success, gone, errorMessage }` zurück. Ein Ergebnis mit `gone: true` (der Push-Dienst antwortete mit `404` oder `410`) bedeutet, dass das Abonnement dauerhaft ungültig ist; nachgelagerter Code in `NotificationHelper` löscht diese Geräte-Zeilen, damit sie nicht erneut versucht werden.
- **TTL** — Push-Nachrichten werden mit `TTL: 86400` (24 Stunden) gesendet. Verbindet sich der Browser des Benutzers innerhalb von 24 Stunden nicht mit dem Push-Dienst, wird der Push verworfen.
- **Keine Wiederholungsversuche** — ein vorübergehender Fehler (Timeout, 5xx) wird protokolliert und nicht wiederholt. Push ist Best-Effort; der In-Page-Socket und die E-Mail-Benachrichtigungsstufe übernehmen die Zuverlässigkeitsgeschichte.
- **Deaktivierte Umgebungen** — Staging- und Dev-Umgebungen können die VAPID-Schlüssel leer lassen; `WebPushHelper.isEnabled()` gibt dann `false` zurück und Pushes brechen kurzgeschlossen ab. Dies ist das beabsichtigte Verhalten für Umgebungen ohne eigene VAPID-Identität.

## Verwandte Seiten

- [Benachrichtigungsarchitektur](./architecture/notifications) -- Der vollständige In-App-/Push-/E-Mail-Eskalationstrichter und die Erinnerungsengine
- [Echtzeit-Architektur](./realtime) -- WebSocket-Zustellung; Push löst jetzt aus demselben In-App-Trichter neben der Socket-Zustellung im selben Durchgang aus, nicht mehr nur als Fallback, wenn eine Socket-Zustellung nicht ankommt
- [Messaging-Endpunkte](./api/endpoints/messaging) -- Benachrichtigungen, Geräte und der Rest der Messaging-Oberfläche
- [AppHelper](./shared-libraries/app-helper) -- Das npm-Paket, das `WebPushHelper` ausliefert
</content>
