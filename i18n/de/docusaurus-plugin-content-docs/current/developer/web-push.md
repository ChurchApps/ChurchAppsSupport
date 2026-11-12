---
title: "Web-Push-Benachrichtigungen"
description: "VAPID-Schlüssel, den WebPushHelper-Client und die Behandlung im Service Worker einrichten, damit B1.church und B1 Admin Browser-Push-Benachrichtigungen an Mitglieder zustellen können."
---

# Web-Push-Benachrichtigungen

<div class="article-intro">

Die Web-Apps von ChurchApps liefern Push-Benachrichtigungen über die W3C-Web-Push-API -- denselben Mechanismus, den Firebase Cloud Messaging serverseitig nutzt, hier jedoch über die native `PushManager`-Schnittstelle des Browsers. Ein einziges VAPID-Schlüsselpaar im MessagingApi deckt jeden Client ab (B1Admin, B1App und künftige PWAs).

</div>

## Wann Push ausgelöst wird {#when-push-fires}

Push ist eine Stufe in einem einzigen Zustelldurchlauf innerhalb von `NotificationHelper.attemptDeliveryWithEscalation()` (`Api/src/modules/messaging/helpers/NotificationHelper.ts`): zuerst ein In-App-Präferenz-Gate, dann Socket-Zustellung und Push, die im selben Durchlauf versucht werden (jeweils hinter ihrem eigenen Präferenz-Gate), dann E-Mail. Ein Empfänger, der die Kategorie stummgeschaltet hat, erreicht Push nie. Eine erfolgreiche Socket-Zustellung stoppt Push nicht mehr -- jeder Benachrichtigungstyp verhält sich nun so, wie Direktnachrichten es schon immer taten, sodass eine im Hintergrund laufende installierte PWA trotzdem eine Benachrichtigung auf Betriebssystemebene anzeigt, auch wenn eine Socket-Zustellung bereits angekommen ist. Doppelte Banner unterdrückt stattdessen der Service Worker auf dem Client (siehe [Anforderung an den Service Worker](#service-worker-requirement)). Geplante Erinnerungen und von Mitarbeitern ausgelöste Rundsendungen beginnen direkt auf der Push-Stufe und überspringen den Socket-Schritt vollständig. E-Mail bleibt zeitgesteuert und eskaliert ungelesene Zeilen nach eigenem Zeitplan, statt Teil dieses Durchlaufs zu sein.

Die häufigsten Wege zu Push:

1. **Inhaltsbenachrichtigungen** -- eine Antwort in einer Unterhaltung, der die Person folgt, eine Erwähnung oder ein anderes Ereignis, das über `NotificationHelper.createNotifications()` geleitet wird.
2. **Private Nachrichten** -- eine Direktnachricht läuft über dieselbe Zustellfunktion und versucht Push immer zusätzlich zur Socket-Zustellung.
3. **Geplante Erinnerungen** -- Veranstaltungs-, Aufgaben- und Dienst-Erinnerungen, die von der Erinnerungsengine expandiert und versendet werden; sie starten neue Vorkommen direkt auf der Push-Stufe.
4. **Von Mitarbeitern ausgelöste Pushes** -- `POST /messaging/notifications/create`, `/ping` und `/group/send` für einmalige oder gruppenbezogene Rundsendungen.
5. **Geplante Pushes des Personals** -- `POST /messaging/scheduledNotifications` speichert einen Push für alle mit der App (`audience: "church"`) oder für eine Gruppe; der Minuten-Timer sendet ihn, sobald er fällig ist (siehe [Architektur für Benachrichtigungen](./architecture/notifications.md)). Ein gemeindeweiter Push ohne Link öffnet `/mobile/notifications`; ein Gruppenpush ohne Link öffnet diese Gruppe.

## Serverablauf {#server-flow}

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

### Erforderliche Umgebungsvariablen {#required-environment-variables}

VAPID-Schlüssel werden in `Environment` gespeichert und müssen vorhanden sein, damit Push aktiviert ist:

| Umgebungsvariable | Einstellung in `Environment` | Beschreibung |
|----------|----------|-------------|
| `WEB_PUSH_PUBLIC_KEY` | `webPushPublicKey` | Öffentlicher VAPID-Schlüssel (base64url). Wird Clients über `GET /messaging/webpush/publicKey` übergeben |
| `WEB_PUSH_PRIVATE_KEY` | `webPushPrivateKey` | Privater VAPID-Schlüssel. Signiert jeden ausgehenden Push |
| `WEB_PUSH_SUBJECT` | `webPushSubject` | `mailto:`-URI, die den Push-Diensten gemeldet wird. Standard ist `mailto:support@churchapps.org` |

`WebPushHelper.isEnabled()` gibt `false` zurück, wenn einer der beiden Schlüssel fehlt -- das Messaging-Modul arbeitet weiter, Push-Zustellungen bleiben einfach wirkungslos. Die mobile B1App-Seite teilt Mitgliedern dann mit, dass Push nicht aktiviert ist, statt eine Einrichtung anzubieten.

### Ein VAPID-Schlüsselpaar erzeugen {#generating-a-vapid-key-pair}

```bash
npx web-push generate-vapid-keys
```

Trage die Ausgabe in deine `.env` (lokal) oder in den AWS SSM Parameter Store (bereitgestellt) ein. Das Rotieren von Schlüsseln macht jedes bestehende Abonnement ungültig -- Clients müssen sich beim nächsten Laden der Seite erneut registrieren.

## Speichermodell {#storage-model}

Web-Push-Abonnements werden in der bestehenden Tabelle `devices` gespeichert, neben den FCM-Gerätedatensätzen. Sie sind an einem Präfix `webpush:` in der Spalte `fcmToken` zu erkennen:

```
fcmToken = "webpush:" + JSON.stringify({ endpoint, keys: { p256dh, auth } })
```

So liefert ein einziger Aufruf von `loadByPersonId` jedes Gerät, das ein Benutzer registriert hat, unabhängig von der Plattform. `WebPushHelper.isWebPushToken(token)` und `decodeSubscription(token)` übernehmen die Behandlung des Präfixes.

## Endpunkte {#endpoints}

Basispfad: `/messaging/webpush`

| Methode | Pfad | Auth | Beschreibung |
|--------|------|------|-------------|
| GET | `/publicKey` | Öffentlich | Gibt `{ publicKey, enabled }` zurück. Clients übergeben `publicKey` an `pushManager.subscribe({ applicationServerKey })` |
| POST | `/subscribe` | JWT | Registriert (oder aktualisiert) ein Abonnement für den angemeldeten Benutzer. Body: `{ subscription: { endpoint, keys: { p256dh, auth } }, appName?, deviceInfo?, label? }` |
| POST | `/unsubscribe` | Öffentlich | Löscht jede Gerätezeile, deren `fcmToken` den angegebenen Endpunkt enthält. Body: `{ endpoint }` |
| DELETE | `/subscription/:id` | JWT | Löscht eine bestimmte Gerätezeile anhand ihrer serverseitigen ID |

## Client-Baustein: `WebPushHelper` {#client-primitive-webpushhelper}

Der `WebPushHelper` aus `@churchapps/apphelper` ist der einzige clientseitige Einstiegspunkt. Hosts konfigurieren ihn einmal beim Start und rufen nach der Anmeldung `subscribe()` auf.

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

Diese Verhaltensweisen erhalten Anwender automatisch:

- **Funktionsprüfung** -- `isSupported()` gibt `false` in Browsern ohne `serviceWorker` / `PushManager` / `Notification` zurück.
- **Abkühlphase** -- `canPromptNow()` erzwingt eine Wartezeit von 7 Tagen zwischen Abfragen über `localStorage`, damit Nutzer, die die Abfrage des Betriebssystems verwerfen, nicht bei jeder Sitzung erneut gefragt werden.
- **Abmeldung** -- `setOptedOut(true)` und `unsubscribe()` verhindern erneutes Fragen und entfernen die Gerätezeile auf dem Server.
- **Erkennung der eigenständigen PWA** -- `isStandalone()` erlaubt Hosts, iOS-Push-Abfragen davon abhängig zu machen, dass der Nutzer die PWA auf dem Startbildschirm installiert hat (iOS erlaubt Push nur aus installierten PWAs).
- **Erneute Registrierung bei Gemeindewechsel** -- `refreshEnrollment()` sendet das bestehende Browser-Abonnement erneut für die neue `userChurch`, ohne den Nutzer erneut zu fragen. Rufe es im Handler für die Änderung von `userChurch` auf.

### Anforderung an den Service Worker {#service-worker-requirement}

Der `PushManager` des Browsers löst ein Abonnement nur auf, wenn ein Service Worker auf dem konfigurierten Scope registriert ist. Die PWAs von ChurchApps verwenden [Serwist](https://serwist.dev/) (Next.js-Apps) oder Workbox zur Erzeugung des Service Workers. Da der Server nun Push immer zusätzlich zur Socket-Zustellung versucht (siehe [Wann Push ausgelöst wird](#when-push-fires)), ist der Service Worker der Punkt der Deduplizierung: Sein `push`-Handler muss `showNotification` unterdrücken, wenn ein fokussierter oder sichtbarer Client bereits das Ziel des Deep-Links der Benachrichtigung anzeigt, muss das App-Abzeichen aber in jedem Fall aktualisieren, auch wenn das Banner unterdrückt wird:

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

`deepLinkFor` und `clientMatchesTarget` sind anwendungsspezifisch -- die Referenzimplementierung findest du in `B1App/src/app/sw.ts`. B1App leitet `privateMessage` an `/mobile/messages/:personId` weiter, B1Admin leitet `notification` an sein Benachrichtigungsfeld weiter usw.

## Betriebshinweise {#operational-notes}

- **Ergebnisse mit `gone: true`** -- `WebPushHelper.sendBulk` gibt `{ token, success, gone, errorMessage }` je Empfänger zurück. Ein Ergebnis mit `gone: true` (der Push-Dienst antwortete mit `404` oder `410`) bedeutet, dass das Abonnement dauerhaft ungültig ist; nachgelagerter Code in `NotificationHelper` löscht diese Gerätezeilen, damit sie nicht erneut versucht werden.
- **TTL** -- Push-Nachrichten werden mit `TTL: 86400` (24 Stunden) gesendet. Verbindet sich der Browser des Nutzers innerhalb von 24 Stunden nicht mit dem Push-Dienst, wird der Push verworfen.
- **Keine Wiederholungen** -- Ein vorübergehender Fehler (Zeitüberschreitung, 5xx) wird protokolliert und nicht wiederholt. Push ist nach bestem Bemühen; die Dauerhaftigkeit übernehmen der Socket auf der Seite und die E-Mail-Benachrichtigungsstufe.
- **Deaktivierte Umgebungen** -- Entwicklungsumgebungen können die VAPID-Schlüssel leer lassen; `WebPushHelper.isEnabled()` gibt dann `false` zurück und Pushes werden sofort verworfen. Dies ist das vorgesehene Verhalten für Umgebungen ohne eigene VAPID-Identität.

## Verwandte Seiten {#related-pages}

- [Architektur für Benachrichtigungen](./architecture/notifications.md) -- der vollständige Trichter für In-App-, Push- und E-Mail-Eskalation sowie die Erinnerungsengine
- [Echtzeit-Architektur](./realtime.md) -- WebSocket-Zustellung; Push wird nun aus demselben In-App-Trichter zusammen mit der Socket-Zustellung im selben Durchlauf ausgelöst, nicht nur als Ausweichlösung, wenn eine Socket-Zustellung nicht ankommt
- [Messaging-Endpunkte](./api/endpoints/messaging.md) -- Benachrichtigungen, Geräte und der übrige Messaging-Bereich
- [AppHelper](./shared-libraries/app-helper.md) -- das npm-Paket, das `WebPushHelper` ausliefert
