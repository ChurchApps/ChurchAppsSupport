---
title: "Web-Push-Benachrichtigungen"
description: "VAPID-Schlüssel, WebPushHelper-Client und Service Worker einrichten, damit B1.church und B1 Admin Browser-Push-Nachrichten an Mitglieder senden können."
---

# Web-Push-Benachrichtigungen

<div class="article-intro">

Die Web-Apps von ChurchApps liefern Push-Benachrichtigungen über die W3C-Web-Push-API aus — denselben Mechanismus, den Firebase Cloud Messaging auf der Serverseite verwendet, hier aber über die native `PushManager` des Browsers statt über FCM. Ein einziges VAPID-Schlüsselpaar auf der MessagingApi deckt alle Verbraucher ab (B1Admin, B1App und künftige PWAs).

</div>

## Wann Push ausgelöst wird {#when-push-fires}

Push ist eine Stufe in einem einzigen Zustellungsdurchlauf innerhalb von `NotificationHelper.attemptDeliveryWithEscalation()` (`Api/src/modules/messaging/helpers/NotificationHelper.ts`): zuerst eine Sperre nach In-App-Einstellungen, danach werden Socket-Zustellung und Push im selben Durchlauf versucht (jeweils hinter einer eigenen Einstellungssperre), anschließend E-Mail. Ein Empfänger, der die Kategorie stummgeschaltet hat, erreicht Push nie. Eine erfolgreiche Socket-Zustellung stoppt Push nicht mehr — jeder Benachrichtigungstyp verhält sich nun so, wie es bei Direktnachrichten schon immer der Fall war. Eine installierte PWA, die im Hintergrund läuft, zeigt daher auch dann eine Benachrichtigung auf Betriebssystemebene an, wenn die Socket-Zustellung bereits angekommen ist; doppelte Banner unterdrückt stattdessen der Service Worker auf dem Client (siehe [Anforderung an den Service Worker](#service-worker-requirement)). Geplante Erinnerungen und von Mitarbeitenden ausgelöste Rundsendungen starten direkt auf der Push-Stufe und überspringen den Socket-Schritt vollständig. E-Mail bleibt zeitgesteuert: Sie eskaliert ungelesene Einträge nach eigenem Zeitplan und ist kein Teil dieses Durchlaufs.

Die häufigsten Wege, die zu Push führen:

1. **Inhaltsbenachrichtigungen** — eine Antwort in einer Unterhaltung, der die Person folgt, eine Erwähnung oder ein anderes Ereignis, das über `NotificationHelper.createNotifications()` geleitet wird.
2. **Direktnachrichten** — eine Direktnachricht durchläuft dieselbe Zustellungsfunktion und versucht immer Push zusätzlich zur Socket-Zustellung.
3. **Geplante Erinnerungen** — Erinnerungen zu Veranstaltungen, Aufgaben und Diensten, die von der Erinnerungs-Engine aufgelöst und versandt werden; sie starten neue Vorkommen direkt auf der Push-Stufe.
4. **Von Mitarbeitenden ausgelöste Pushes** — `POST /messaging/notifications/create`, `/ping` und `/group/send` für einmalige oder gruppenbezogene Rundsendungen.

## Ablauf auf dem Server

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

| Umgebungsvariable | Einstellung in `Environment` | Beschreibung |
|----------|----------|-----------|
| `WEB_PUSH_PUBLIC_KEY` | `webPushPublicKey` | Öffentlicher VAPID-Schlüssel (base64url). Wird Clients über `GET /messaging/webpush/publicKey` zurückgegeben |
| `WEB_PUSH_PRIVATE_KEY` | `webPushPrivateKey` | Privater VAPID-Schlüssel. Wird verwendet, um jeden ausgehenden Push zu signieren |
| `WEB_PUSH_SUBJECT` | `webPushSubject` | `mailto:`-URI, die den Push-Diensten angegeben wird. Standard ist `mailto:support@churchapps.org` |

`WebPushHelper.isEnabled()` liefert `false`, sobald einer der beiden Schlüssel fehlt — das Messaging-Modul arbeitet weiter, Push-Zustellungen werden aber übersprungen. Die mobile Website von B1App teilt Mitgliedern dann mit, dass Push nicht aktiviert ist, statt eine Einrichtung anzubieten.

### Ein VAPID-Schlüsselpaar erzeugen

```bash
npx web-push generate-vapid-keys
```

Tragen Sie die Ausgabe in Ihre `.env` (lokal) bzw. in den AWS Systems Manager Parameter Store (in bereitgestellten Umgebungen) ein. Ein Wechsel der Schlüssel macht jedes bestehende Abonnement ungültig — Clients müssen sich beim nächsten Laden der Seite erneut registrieren.

## Speichermodell

Web-Push-Abonnements werden in der bestehenden Tabelle `devices` gespeichert, zusammen mit den FCM-Geräteeinträgen. Sie sind über das Präfix `webpush:` in der Spalte `fcmToken` zu erkennen:

```
fcmToken = "webpush:" + JSON.stringify({ endpoint, keys: { p256dh, auth } })
```

So liefert ein einziger Aufruf von `loadByPersonId` jedes Gerät, das ein Benutzer registriert hat, unabhängig von der Plattform. `WebPushHelper.isWebPushToken(token)` und `decodeSubscription(token)` übernehmen die Behandlung des Präfixes.

## Endpunkte

Basispfad: `/messaging/webpush`

| Methode | Pfad | Auth | Beschreibung |
|--------|------|------|-------------|
| GET | `/publicKey` | Öffentlich | Liefert `{ publicKey, enabled }`. Clients übergeben `publicKey` an `pushManager.subscribe({ applicationServerKey })` |
| POST | `/subscribe` | JWT | Registriert (oder aktualisiert) ein Abonnement für den angemeldeten Benutzer. Body: `{ subscription: { endpoint, keys: { p256dh, auth } }, appName?, deviceInfo?, label? }` |
| POST | `/unsubscribe` | Öffentlich | Löscht jede Gerätezeile, deren `fcmToken` den angegebenen Endpunkt enthält. Body: `{ endpoint }` |
| DELETE | `/subscription/:id` | JWT | Löscht eine bestimmte Gerätezeile anhand ihrer serverseitigen ID |

## Client-Baustein: `WebPushHelper`

Der `WebPushHelper` aus `@churchapps/apphelper` ist der einzige clientseitige Einstiegspunkt. Die Host-Anwendung konfiguriert ihn einmal beim Start und ruft nach der Anmeldung `subscribe()` auf.

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

Diese Verhaltensweisen erhalten Verbraucher automatisch:

- **Prüfung der Fähigkeit** — `isSupported()` liefert `false` in Browsern ohne `serviceWorker` / `PushManager` / `Notification`.
- **Abkühlzeit** — `canPromptNow()` erzwingt über `localStorage` eine Wartezeit von 7 Tagen zwischen Abfragen, damit Benutzer, die die Abfrage des Betriebssystems abgelehnt haben, nicht bei jeder Sitzung erneut gefragt werden.
- **Abmelden** — `setOptedOut(true)` und `unsubscribe()` verhindern erneutes Nachfragen und entfernen die Gerätezeile auf dem Server.
- **Erkennung der eigenständigen PWA** — `isStandalone()` erlaubt Host-Anwendungen, Push-Abfragen auf iOS davon abhängig zu machen, dass der Benutzer die PWA auf dem Startbildschirm installiert hat (iOS erlaubt Push nur aus installierten PWAs).
- **Erneute Registrierung beim Wechsel der Gemeinde** — `refreshEnrollment()` sendet das bestehende Browser-Abonnement mit der neuen `userChurch` erneut, ohne den Benutzer erneut zu fragen. Rufen Sie es im Handler für die Änderung von `userChurch` auf.

### Anforderung an den Service Worker {#service-worker-requirement}

Der `PushManager` des Browsers löst ein Abonnement nur auf, wenn am konfigurierten Gültigkeitsbereich ein Service Worker registriert ist. Die PWAs von ChurchApps verwenden [Serwist](https://serwist.dev/) (Next.js-Apps) oder Workbox, um den Service Worker zu erzeugen. Da der Server nun immer Push zusammen mit der Socket-Zustellung versucht (siehe [Wann Push ausgelöst wird](#when-push-fires)), ist der Service Worker der Punkt der Deduplizierung: Sein Handler `push` muss `showNotification` unterdrücken, wenn ein fokussierter bzw. sichtbarer Client bereits auf dem Ziel des Deep-Links der Benachrichtigung ist. Das Abzeichen der App muss dagegen immer aktualisiert werden, unabhängig davon, ob das Banner angezeigt wurde.

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

`deepLinkFor` und `clientMatchesTarget` hängen von der jeweiligen Anwendung ab — die Referenzimplementierung finden Sie in `B1App/src/app/sw.ts`. B1App leitet `privateMessage` nach `/mobile/messages/:personId`, B1Admin leitet `notification` in sein Benachrichtigungsfeld um usw.

## Betriebshinweise

- **Ergebnisse mit `gone: true`** — `WebPushHelper.sendBulk` liefert pro Empfänger `{ token, success, gone, errorMessage }`. Ein Ergebnis mit `gone: true` (der Push-Dienst antwortete mit `404` oder `410`) bedeutet, dass das Abonnement dauerhaft ungültig ist; nachgelagerter Code in `NotificationHelper` löscht diese Gerätezeilen, damit sie nicht erneut versucht werden.
- **TTL** — Push-Nachrichten werden mit `TTL: 86400` (24 Stunden) gesendet. Verbindet sich der Browser des Benutzers innerhalb von 24 Stunden nicht mit dem Push-Dienst, wird die Nachricht verworfen.
- **Keine Wiederholungen** — ein vorübergehender Fehler (Zeitüberschreitung, 5xx) wird protokolliert und nicht wiederholt. Push ist eine Zustellung nach bestem Bemühen; die Dauerhaftigkeit übernehmen der Socket direkt auf der Seite und die E-Mail-Benachrichtigung.
- **Deaktivierte Umgebungen** — Entwicklungsumgebungen dürfen die VAPID-Schlüssel leer lassen; `WebPushHelper.isEnabled()` liefert dann `false`, und Pushes werden sofort übersprungen. Dies ist das vorgesehene Verhalten für Umgebungen ohne eigene VAPID-Identität.

## Verwandte Seiten

- [Benachrichtigungsarchitektur](./architecture/notifications.md) — die vollständige Eskalation In-App/Push/E-Mail und die Erinnerungs-Engine
- [Echtzeit-Architektur](./realtime.md) — WebSocket-Zustellung; Push wird nun zusammen mit der Socket-Zustellung im selben Durchlauf des In-App-Ablaufs ausgelöst, nicht mehr nur als Ersatz, wenn eine Socket-Zustellung nicht ankommt
- [Messaging-Endpunkte](./api/endpoints/messaging.md) -- Benachrichtigungen, Geräte und der übrige Messaging-Bereich
- [AppHelper](./shared-libraries/app-helper.md) -- Das npm-Paket, das `WebPushHelper` enthält
