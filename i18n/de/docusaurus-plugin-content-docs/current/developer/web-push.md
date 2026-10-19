---
title: "Web-Push-Benachrichtigungen"
---

# Web-Push-Benachrichtigungen

<div class="article-intro">

ChurchApps-Web-Apps liefern Push-Benachrichtigungen über die W3C-Web-Push-API -- denselben Mechanismus, den Firebase Cloud Messaging serverseitig verwendet, jedoch zugestellt über den nativen `PushManager` des Browsers statt über FCM. Ein einziges VAPID-Schlüsselpaar im MessagingApi deckt alle Nutzer ab (B1Admin, B1App und künftige PWAs).

</div>

## Wann Push ausgelöst wird {#when-push-fires}

Push ist eine Stufe in einem einzigen Zustelldurchlauf innerhalb von `NotificationHelper.attemptDeliveryWithEscalation()` (`Api/src/modules/messaging/helpers/NotificationHelper.ts`): zuerst eine Prüfung der In-App-Einstellungen, dann Socket-Zustellung und Push, die im selben Durchlauf versucht werden (jeweils hinter eigenen Einstellungsprüfungen), anschließend E-Mail. Ein Empfänger, der die Kategorie stummgeschaltet hat, erreicht Push nie. Eine erfolgreiche Socket-Zustellung hält Push nicht mehr auf -- jeder Benachrichtigungstyp verhält sich nun so, wie private Nachrichten es schon immer getan haben. Dadurch zeigt eine installierte PWA, die im Hintergrund läuft, auch dann eine Betriebssystem-Benachrichtigung an, wenn eine Socket-Zustellung bereits erfolgt ist; doppelte Banner unterdrückt stattdessen der Service Worker auf dem Client (siehe [Anforderung an den Service Worker](#service-worker-requirement)). Geplante Erinnerungen und von Mitarbeitern ausgelöste Rundsendungen beginnen direkt auf der Push-Stufe und überspringen den Socket-Schritt vollständig. E-Mail bleibt zeitgesteuert: Ungelesene Einträge werden nach eigenem Zeitplan eskaliert und nicht als Teil dieses Durchlaufs.

Die häufigsten Wege, die zu Push führen:

1. **Inhaltsbenachrichtigungen** -- eine Antwort auf eine Unterhaltung, der die Person folgt, eine Erwähnung oder ein anderes Ereignis, das über `NotificationHelper.createNotifications()` geleitet wird.
2. **Private Nachrichten** -- eine Direktnachricht durchläuft dieselbe Zustellfunktion und versucht immer Push zusammen mit der Socket-Zustellung.
3. **Geplante Erinnerungen** -- Erinnerungen zu Veranstaltungen, Aufgaben und Diensten, die von der Erinnerungs-Engine expandiert und verschickt werden; sie starten neue Vorkommen direkt auf der Push-Stufe.
4. **Von Mitarbeitern ausgelöste Pushes** -- `POST /messaging/notifications/create`, `/ping` und `/group/send` für einmalige oder Gruppen-Rundsendungen.

## Serverablauf

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

VAPID-Schlüssel werden in `Environment` gespeichert und müssen vorhanden sein, damit Push aktiviert ist:

| Variable | Beschreibung |
|----------|-------------|
| `webPushPublicKey` | Öffentlicher VAPID-Schlüssel (base64url). Wird Clients über `GET /messaging/webpush/publicKey` zurückgegeben |
| `webPushPrivateKey` | Privater VAPID-Schlüssel. Wird verwendet, um jeden ausgehenden Push zu signieren |
| `webPushSubject` | `mailto:`-URI, die an die Push-Dienste gemeldet wird. Standardwert ist `mailto:support@churchapps.org` |

`WebPushHelper.isEnabled()` gibt `false` zurück, wenn einer der beiden Schlüssel fehlt -- das Messaging-Modul funktioniert weiter, Push-Zustellungen werden einfach nicht ausgeführt.

### Ein VAPID-Schlüsselpaar erzeugen

```bash
npx web-push generate-vapid-keys
```

Fügen Sie die Ausgabe in Ihre `.env` (lokal) oder den AWS SSM Parameter Store (bereitgestellt) ein. Das Rotieren der Schlüssel macht jedes bestehende Abonnement ungültig -- Clients müssen sich beim nächsten Laden der Seite erneut registrieren.

## Speichermodell

Web-Push-Abonnements werden in der bestehenden Tabelle `devices` neben den FCM-Gerätedatensätzen gespeichert. Sie werden über das Präfix `webpush:` in der Spalte `fcmToken` unterschieden:

```
fcmToken = "webpush:" + JSON.stringify({ endpoint, keys: { p256dh, auth } })
```

Dadurch gibt ein einziger Aufruf von `loadByPersonId` alle Geräte zurück, die ein Benutzer registriert hat, unabhängig von der Plattform. `WebPushHelper.isWebPushToken(token)` und `decodeSubscription(token)` übernehmen die Behandlung des Präfixes.

## Endpunkte

Basispfad: `/messaging/webpush`

| Methode | Pfad | Auth | Beschreibung |
|--------|------|------|-------------|
| GET | `/publicKey` | Öffentlich | Gibt `{ publicKey, enabled }` zurück. Clients übergeben `publicKey` an `pushManager.subscribe({ applicationServerKey })` |
| POST | `/subscribe` | JWT | Registriert (oder aktualisiert) ein Abonnement für den angemeldeten Benutzer. Body: `{ subscription: { endpoint, keys: { p256dh, auth } }, appName?, deviceInfo?, label? }` |
| POST | `/unsubscribe` | Öffentlich | Löscht jede Gerätezeile, deren `fcmToken` den angegebenen Endpunkt enthält. Body: `{ endpoint }` |
| DELETE | `/subscription/:id` | JWT | Löscht eine bestimmte Gerätezeile anhand ihrer serverseitigen ID |

## Client-Baustein: `WebPushHelper`

Der `WebPushHelper` von `@churchapps/apphelper` ist der einzige clientseitige Einstiegspunkt. Hosts konfigurieren ihn einmal beim Start und rufen nach der Anmeldung `subscribe()` auf.

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

Folgendes erhalten Konsumenten automatisch:

- **Funktionsprüfung** -- `isSupported()` gibt `false` in Browsern ohne `serviceWorker` / `PushManager` / `Notification` zurück.
- **Abklingzeit** -- `canPromptNow()` erzwingt zwischen Abfragen über `localStorage` eine Wartezeit von 7 Tagen, damit Nutzer, die die Betriebssystem-Abfrage abgelehnt haben, nicht bei jeder Sitzung erneut gefragt werden.
- **Abmeldung** -- `setOptedOut(true)` und `unsubscribe()` verhindern erneute Abfragen und entfernen die serverseitige Gerätezeile.
- **Erkennung der eigenständigen PWA** -- `isStandalone()` ermöglicht es Hosts, iOS-Push-Abfragen davon abhängig zu machen, dass der Nutzer die PWA auf dem Startbildschirm installiert hat (iOS erlaubt Push nur aus installierten PWAs).
- **Neu registrieren bei Kirchenwechsel** -- `refreshEnrollment()` sendet das bestehende Browser-Abonnement mit dem neuen `userChurch` erneut, ohne den Nutzer erneut zu fragen. Rufen Sie es aus dem Handler für die Änderung von `userChurch` auf.

### Anforderung an den Service Worker {#service-worker-requirement}

Der `PushManager` des Browsers liefert nur dann ein Abonnement, wenn an der konfigurierten Scope ein Service Worker registriert ist. ChurchApps-PWAs verwenden [Serwist](https://serwist.dev/) (Next.js-Apps) oder Workbox zur Erzeugung des Service Workers. Da der Server nun immer versucht, Push zusammen mit der Socket-Zustellung zu senden (siehe [Wann Push ausgelöst wird](#when-push-fires)), ist der Service Worker der Punkt der Duplikatvermeidung: Sein `push`-Handler muss `showNotification` unterdrücken, wenn ein fokussierter oder sichtbarer Client bereits auf das Deep-Link-Ziel der Benachrichtigung zeigt. Das App-Badge sollte aber immer aktualisiert werden, unabhängig davon, ob das Banner angezeigt wurde:

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

`deepLinkFor` und `clientMatchesTarget` sind anwendungsspezifisch -- die Referenzimplementierung finden Sie in `B1App/src/app/sw.ts`. B1App leitet `privateMessage` an `/mobile/messages/:personId` weiter, B1Admin leitet `notification` an sein Benachrichtigungsfenster weiter usw.

## Betriebshinweise

- **`gone: true`-Ergebnisse** -- `WebPushHelper.sendBulk` gibt pro Empfänger `{ token, success, gone, errorMessage }` zurück. Ein Ergebnis mit `gone: true` (der Push-Dienst antwortete mit `404` oder `410`) bedeutet, dass das Abonnement dauerhaft ungültig ist; nachgelagerter Code in `NotificationHelper` löscht diese Gerätezeilen, damit sie nicht erneut versucht werden.
- **TTL** -- Push-Nachrichten werden mit `TTL: 86400` (24 Stunden) gesendet. Wenn sich der Browser des Nutzers innerhalb von 24 Stunden nicht mit dem Push-Dienst verbindet, wird der Push verworfen.
- **Keine Wiederholungen** -- Ein vorübergehender Fehler (Zeitüberschreitung, 5xx) wird protokolliert und nicht wiederholt. Push erfolgt nach bestem Bemühen; die Socket-Verbindung der Seite und die E-Mail-Benachrichtigungsstufe sorgen für die Verlässlichkeit.
- **Deaktivierte Umgebungen** -- Entwicklungsumgebungen können die VAPID-Schlüssel leer lassen; `WebPushHelper.isEnabled()` gibt dann `false` zurück und Pushes werden sofort übersprungen. Dies ist das beabsichtigte Verhalten für Umgebungen ohne eigene VAPID-Identität.

## Verwandte Seiten

- [Benachrichtigungsarchitektur](./architecture/notifications) -- Der vollständige Eskalationstrichter für In-App, Push und E-Mail sowie die Erinnerungs-Engine
- [Echtzeit-Architektur](./realtime) -- WebSocket-Zustellung; Push wird nun aus demselben In-App-Trichter zusammen mit der Socket-Zustellung im selben Durchlauf ausgelöst, nicht nur als Ersatz, wenn eine Socket-Zustellung nicht ankommt
- [Messaging-Endpunkte](./api/endpoints/messaging) -- Benachrichtigungen, Geräte und der übrige Messaging-Bereich
- [AppHelper](./shared-libraries/app-helper) -- Das npm-Paket, das `WebPushHelper` enthält
