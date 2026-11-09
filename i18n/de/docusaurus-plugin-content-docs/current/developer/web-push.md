---
title: "Web-Push-Benachrichtigungen"
description: "VAPID-Schlüssel, den WebPushHelper-Client und die Behandlung im Service Worker einrichten, damit B1.church und B1 Admin Browser-Push-Benachrichtigungen an Mitglieder zustellen können."
---

# Web-Push-Benachrichtigungen

<div class="article-intro">

Die Web-Apps von ChurchApps stellen Push-Benachrichtigungen über die W3C Web Push API zu. Das ist derselbe Mechanismus, den Firebase Cloud Messaging serverseitig verwendet, hier aber über den nativen `PushManager` des Browsers statt über FCM. Ein einziges VAPID-Schlüsselpaar in der MessagingApi deckt jeden Verbraucher ab (B1Admin, B1App und künftige PWAs).

</div>

## Wann Push ausgelöst wird {#when-push-fires}

Push ist eine Stufe in einem einzigen Zustellvorgang innerhalb von `NotificationHelper.attemptDeliveryWithEscalation()` (`Api/src/modules/messaging/helpers/NotificationHelper.ts`). Zuerst kommt ein In-App-Präferenz-Gate, dann werden Socket-Zustellung und Push im selben Durchlauf versucht (jeweils mit eigenem Präferenz-Gate), danach E-Mail. Ein Empfänger, der die Kategorie stummgeschaltet hat, erreicht Push nie. Eine erfolgreiche Socket-Zustellung stoppt Push nicht mehr. Jeder Benachrichtigungstyp verhält sich jetzt so, wie Direktnachrichten es schon immer taten. Deshalb zeigt eine im Hintergrund laufende installierte PWA trotz bereits erfolgter Socket-Zustellung eine Benachrichtigung auf Betriebssystemebene an. Doppelte Banner unterdrückt stattdessen der Service Worker auf dem Client (siehe [Anforderung an den Service Worker](#service-worker-requirement)). Geplante Erinnerungen und von Mitarbeitenden ausgelöste Sendungen beginnen direkt auf der Push-Stufe und überspringen den Socket-Schritt. E-Mail bleibt zeitgesteuert. Sie eskaliert ungelesene Zeilen nach eigenem Zeitplan und nicht als Teil dieses Durchlaufs.

Die häufigsten Wege, die zu Push führen:

1. **Inhaltsbenachrichtigungen** -- eine Antwort in einer Unterhaltung, der die Person folgt, eine Erwähnung oder ein anderes Ereignis, das über `NotificationHelper.createNotifications()` geleitet wird.
2. **Direktnachrichten** -- eine Direktnachricht läuft über dieselbe Zustellfunktion und versucht immer Push zusätzlich zur Socket-Zustellung.
3. **Geplante Erinnerungen** -- Veranstaltungs-, Aufgaben- und Dienst-Erinnerungen, die der Erinnerungsmotor expandiert und zustellt. Er startet neue Vorkommen direkt auf der Push-Stufe.
4. **Von Mitarbeitenden ausgelöste Pushes** -- `POST /messaging/notifications/create`, `/ping` und `/group/send` für einmalige oder Gruppen-Sendungen.
5. **Geplante Pushes von Mitarbeitenden** -- `POST /messaging/scheduledNotifications` speichert einen Push für alle mit der App (`audience: "church"`) oder für eine Gruppe. Der Ein-Minuten-Timer sendet ihn bei Fälligkeit (siehe [Architektur der Benachrichtigungen](./architecture/notifications.md)). Ein gemeindeweiter Push ohne Link öffnet `/mobile/notifications`. Ein Gruppen-Push ohne Link öffnet die jeweilige Gruppe.

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

Die VAPID-Schlüssel stehen in `Environment`. Sie müssen vorhanden sein, damit Push aktiviert ist:

| Umgebungsvariable | Einstellung in `Environment` | Beschreibung |
|----------|----------|-------------|
| `WEB_PUSH_PUBLIC_KEY` | `webPushPublicKey` | Öffentlicher VAPID-Schlüssel (base64url). Wird über `GET /messaging/webpush/publicKey` an Clients zurückgegeben |
| `WEB_PUSH_PRIVATE_KEY` | `webPushPrivateKey` | Privater VAPID-Schlüssel. Signiert jeden ausgehenden Push |
| `WEB_PUSH_SUBJECT` | `webPushSubject` | `mailto:`-URI, der an die Push-Dienste gemeldet wird. Standard ist `mailto:support@churchapps.org` |

`WebPushHelper.isEnabled()` gibt `false` zurück, wenn einer der beiden Schlüssel fehlt. Das Messaging-Modul arbeitet dann weiter, Push-Zustellungen laufen aber ins Leere. Die mobile Seite von B1App teilt Mitgliedern dann mit, dass Push nicht aktiviert ist, statt eine Einrichtung anzubieten.

### Ein VAPID-Schlüsselpaar erzeugen

```bash
npx web-push generate-vapid-keys
```

Tragen Sie die Ausgabe in Ihre `.env` (lokal) oder in den AWS Systems Manager Parameter Store (deployt) ein. Das Rotieren der Schlüssel macht alle bestehenden Abonnements ungültig. Clients müssen sich beim nächsten Laden der Seite erneut registrieren.

## Speichermodell

Web-Push-Abonnements liegen in der bestehenden Tabelle `devices` neben den FCM-Gerätedatensätzen. Sie sind an einem Präfix `webpush:` in der Spalte `fcmToken` zu erkennen:

```
fcmToken = "webpush:" + JSON.stringify({ endpoint, keys: { p256dh, auth } })
```

So liefert ein einziger Aufruf von `loadByPersonId` alle Geräte, die ein Benutzer registriert hat, unabhängig von der Plattform. `WebPushHelper.isWebPushToken(token)` und `decodeSubscription(token)` übernehmen die Präfixlogik.

## Endpunkte

Basispfad: `/messaging/webpush`

| Methode | Pfad | Auth | Beschreibung |
|--------|------|------|-------------|
| GET | `/publicKey` | Öffentlich | Liefert `{ publicKey, enabled }`. Clients übergeben `publicKey` an `pushManager.subscribe({ applicationServerKey })` |
| POST | `/subscribe` | JWT | Registriert (oder aktualisiert) ein Abonnement für den angemeldeten Benutzer. Body: `{ subscription: { endpoint, keys: { p256dh, auth } }, appName?, deviceInfo?, label? }` |
| POST | `/unsubscribe` | Öffentlich | Löscht jede Gerätezeile, deren `fcmToken` den angegebenen Endpunkt enthält. Body: `{ endpoint }` |
| DELETE | `/subscription/:id` | JWT | Löscht eine bestimmte Gerätezeile anhand ihrer serverseitigen ID |

## Client-Baustein: `WebPushHelper`

`WebPushHelper` aus `@churchapps/apphelper` ist der einzige clientseitige Einstiegspunkt. Hosts konfigurieren ihn einmal beim Start und rufen `subscribe()` nach der Anmeldung auf.

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

Diese Verhaltensweisen bekommen Verbraucher kostenlos:

- **Funktionsprüfung** -- `isSupported()` gibt `false` in Browsern zurück, denen `serviceWorker`, `PushManager` oder `Notification` fehlt.
- **Abkühlphase** -- `canPromptNow()` erzwingt über `localStorage` eine Wartezeit von 7 Tagen zwischen Abfragen. So wird nicht bei jeder Sitzung erneut gefragt, wenn Nutzende die Systemabfrage abgelehnt haben.
- **Abmeldung** -- `setOptedOut(true)` und `unsubscribe()` verhindern erneutes Nachfragen und entfernen die serverseitige Gerätezeile.
- **Erkennung der eigenständigen PWA** -- `isStandalone()` erlaubt Hosts, iOS-Push-Abfragen erst zu zeigen, wenn die Nutzenden die PWA auf dem Startbildschirm installiert haben. Auf iOS ist Push nur aus installierten PWAs möglich.
- **Neu registrieren beim Gemeindewechsel** -- `refreshEnrollment()` sendet das bestehende Browser-Abo erneut für den neuen `userChurch`, ohne die Nutzenden erneut zu fragen. Rufen Sie es im Handler für den Wechsel von `userChurch` auf.

### Anforderung an den Service Worker {#service-worker-requirement}

Der `PushManager` des Browsers liefert nur dann ein Abonnement, wenn unter dem konfigurierten Scope ein Service Worker registriert ist. Die PWAs von ChurchApps verwenden [Serwist](https://serwist.dev/) (Next.js-Apps) oder Workbox, um den Service Worker zu erzeugen. Da der Server Push jetzt immer zusammen mit der Socket-Zustellung versucht (siehe [Wann Push ausgelöst wird](#when-push-fires)), ist der Service Worker der Punkt der Deduplizierung. Sein `push`-Handler muss `showNotification` unterdrücken, wenn ein fokussiertes oder sichtbares Fenster bereits das Ziel des Deep-Links der Benachrichtigung zeigt. Das Abzeichen der App muss er aber unabhängig davon immer aktualisieren, ob das Banner angezeigt wurde:

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

`deepLinkFor` und `clientMatchesTarget` sind anwendungsspezifisch. Die Referenzimplementierung steht in `B1App/src/app/sw.ts`. B1App leitet `privateMessage` nach `/mobile/messages/:personId`, B1Admin leitet `notification` in sein Benachrichtigungsfenster usw.

## Betriebshinweise

- **Ergebnisse mit `gone: true`** -- `WebPushHelper.sendBulk` liefert je Empfänger `{ token, success, gone, errorMessage }`. Ein Ergebnis mit `gone: true` (der Push-Dienst antwortete mit `404` oder `410`) bedeutet, dass das Abo dauerhaft ungültig ist. Der nachgelagerte Code in `NotificationHelper` löscht diese Gerätezeilen, damit sie nicht erneut versucht werden.
- **TTL** -- Push-Nachrichten werden mit `TTL: 86400` (24 Stunden) gesendet. Verbindet sich der Browser des Nutzers innerhalb von 24 Stunden nicht mit dem Push-Dienst, wird die Nachricht verworfen.
- **Keine Wiederholungen** -- Ein vorübergehender Fehler (Zeitüberschreitung, 5xx) wird protokolliert und nicht wiederholt. Push erfolgt nach bestem Bemühen. Für Verlässlichkeit sorgen die Socket-Verbindung auf der Seite und die E-Mail-Stufe.
- **Deaktivierte Umgebungen** -- Entwicklungsumgebungen können die VAPID-Schlüssel leer lassen. `WebPushHelper.isEnabled()` liefert dann `false`, und Pushes werden sofort übersprungen. Das ist gewollt für Umgebungen ohne eigene VAPID-Identität.

## Verwandte Seiten

- [Architektur der Benachrichtigungen](./architecture/notifications.md) -- der vollständige Trichter für In-App, Push und E-Mail sowie der Erinnerungsmotor
- [Echtzeit-Architektur](./realtime.md) -- WebSocket-Zustellung. Push wird jetzt im selben Durchlauf wie die Socket-Zustellung aus demselben In-App-Trichter ausgelöst, nicht nur als Ausweichlösung, wenn eine Socket-Zustellung nicht ankommt
- [Messaging-Endpunkte](./api/endpoints/messaging.md) -- Benachrichtigungen, Geräte und der Rest der Messaging-Oberfläche
- [AppHelper](./shared-libraries/app-helper.md) -- das npm-Paket, das `WebPushHelper` enthält
