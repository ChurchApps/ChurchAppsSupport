---
title: "Web-Push-Benachrichtigungen"
description: "VAPID-Schlüssel, den WebPushHelper-Client und die Behandlung im Service Worker einrichten, damit B1.church und B1 Admin Browser-Push-Benachrichtigungen an Mitglieder senden können."
---

# Web-Push-Benachrichtigungen {#web-push-notifications}

<div class="article-intro">

Die Web-Apps von ChurchApps senden Push-Benachrichtigungen über die W3C Web Push API -- denselben Mechanismus, den Firebase Cloud Messaging auf der Serverseite nutzt, jedoch über den nativen `PushManager` des Browsers statt über FCM. Ein einziges VAPID-Schlüsselpaar im MessagingApi deckt alle Anwendungen ab (B1Admin, B1App und künftige PWAs).

</div>

## Wann Push ausgelöst wird {#when-push-fires}

Push ist eine Stufe in einem einzigen Zustellungsdurchlauf innerhalb von `NotificationHelper.attemptDeliveryWithEscalation()` (`Api/src/modules/messaging/helpers/NotificationHelper.ts`): zuerst ein Gate für die In-App-Einstellungen, dann werden Socket-Zustellung und Push im selben Durchlauf versucht (jeweils hinter einem eigenen Einstellungs-Gate), danach E-Mail. Ein Empfänger, der die Kategorie stummgeschaltet hat, erreicht Push nie. Eine erfolgreiche Socket-Zustellung stoppt Push nicht mehr -- jeder Benachrichtigungstyp verhält sich nun so, wie es bei privaten Nachrichten schon immer der Fall war. So zeigt eine installierte PWA, die im Hintergrund läuft, auch dann eine Benachrichtigung auf Betriebssystemebene an, wenn eine Socket-Zustellung bereits angekommen ist; doppelte Banner unterdrückt stattdessen der Service Worker im Client (siehe [Anforderung an den Service Worker](#service-worker-requirement)). Geplante Erinnerungen und von Mitarbeitern ausgelöste Sendungen beginnen direkt auf der Push-Stufe und überspringen den Socket-Schritt vollständig. E-Mail bleibt zeitgesteuert: Sie eskaliert ungelesene Einträge nach eigenem Zeitplan und nicht als Teil dieses Durchlaufs.

Die häufigsten Wege, die zu Push führen:

1. **Inhaltsbenachrichtigungen** -- eine Antwort in einer Unterhaltung, der die Person folgt, eine Erwähnung oder ein anderes Ereignis, das über `NotificationHelper.createNotifications()` geleitet wird.
2. **Private Nachrichten** -- eine Direktnachricht läuft über dieselbe Zustellfunktion und versucht immer Push zusätzlich zur Socket-Zustellung.
3. **Geplante Erinnerungen** -- Veranstaltungs-, Aufgaben- und Dienst-Erinnerungen, die von der Erinnerungs-Engine expandiert und versendet werden; sie starten neue Vorkommen direkt auf der Push-Stufe.
4. **Von Mitarbeitern ausgelöste Pushes** -- `POST /messaging/notifications/create`, `/ping` und `/group/send` für einmalige oder Gruppen-Sendungen.
5. **Geplante Pushes von Mitarbeitern** -- `POST /messaging/scheduledNotifications` speichert einen Push für alle, die die App haben (`audience: "church"`), oder für eine Gruppe. Der 1-Minuten-Timer sendet ihn, sobald er fällig ist (siehe [Architektur der Benachrichtigungen](./architecture/notifications.md)). Ein gemeindeweiter Push ohne Link öffnet `/mobile/notifications`; ein Gruppen-Push ohne Link öffnet diese Gruppe.

## Ablauf auf dem Server {#server-flow}

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

| Umgebungsvariable | `Environment`-Einstellung | Beschreibung |
|----------|----------|-------------|
| `WEB_PUSH_PUBLIC_KEY` | `webPushPublicKey` | Öffentlicher VAPID-Schlüssel (base64url). Wird den Clients über `GET /messaging/webpush/publicKey` zurückgegeben |
| `WEB_PUSH_PRIVATE_KEY` | `webPushPrivateKey` | Privater VAPID-Schlüssel. Wird verwendet, um jeden ausgehenden Push zu signieren |
| `WEB_PUSH_SUBJECT` | `webPushSubject` | `mailto:`-URI, der an die Push-Dienste gemeldet wird. Standardwert ist `mailto:support@churchapps.org` |

`WebPushHelper.isEnabled()` gibt `false` zurück, wenn einer der beiden Schlüssel fehlt -- das Messaging-Modul arbeitet weiter, Push-Zustellungen laufen einfach ins Leere. Die mobile Seite der B1App teilt Mitgliedern dann mit, dass Push nicht aktiviert ist, statt die Einrichtung anzubieten.

### Ein VAPID-Schlüsselpaar erzeugen {#generating-a-vapid-key-pair}

```bash
npx web-push generate-vapid-keys
```

Fügen Sie die Ausgabe zu Ihrer `.env` (lokal) bzw. zum AWS SSM Parameter Store (bereitgestellt) hinzu. Das Rotieren der Schlüssel macht jedes bestehende Abonnement ungültig -- Clients müssen sich beim nächsten Seitenaufruf erneut anmelden.

## Speichermodell {#storage-model}

Web-Push-Abonnements werden in der bestehenden Tabelle `devices` zusammen mit den FCM-Gerätedatensätzen gespeichert. Sie werden anhand eines Präfixes `webpush:` in der Spalte `fcmToken` unterschieden:

```
fcmToken = "webpush:" + JSON.stringify({ endpoint, keys: { p256dh, auth } })
```

So gibt ein einziger Aufruf von `loadByPersonId` alle Geräte zurück, die ein Benutzer angemeldet hat, unabhängig von der Plattform. `WebPushHelper.isWebPushToken(token)` und `decodeSubscription(token)` übernehmen die Logik für das Präfix.

## Endpunkte {#endpoints}

Basispfad: `/messaging/webpush`

| Methode | Pfad | Authentifizierung | Beschreibung |
|--------|------|------|-------------|
| GET | `/publicKey` | Öffentlich | Gibt `{ publicKey, enabled }` zurück. Clients übergeben `publicKey` an `pushManager.subscribe({ applicationServerKey })` |
| POST | `/subscribe` | JWT | Registriert (oder aktualisiert) ein Abonnement für den angemeldeten Benutzer. Inhalt: `{ subscription: { endpoint, keys: { p256dh, auth } }, appName?, deviceInfo?, label? }` |
| POST | `/unsubscribe` | Öffentlich | Löscht jeden Gerätedatensatz, dessen `fcmToken` den angegebenen Endpunkt enthält. Inhalt: `{ endpoint }` |
| DELETE | `/subscription/:id` | JWT | Löscht einen bestimmten Gerätedatensatz anhand seiner serverseitigen ID |

## Client-Baustein: `WebPushHelper` {#client-primitive-webpushhelper}

Der `WebPushHelper` aus `@churchapps/apphelper` ist der einzige clientseitige Einstiegspunkt. Hosts konfigurieren ihn einmal beim Start und rufen `subscribe()` nach der Anmeldung auf.

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

Diese Funktionen stehen Consumern automatisch zur Verfügung:

- **Funktionsprüfung** -- `isSupported()` gibt `false` in Browsern ohne `serviceWorker` / `PushManager` / `Notification` zurück.
- **Sperrfrist** -- `canPromptNow()` erzwingt eine Sperrfrist von 7 Tagen zwischen Abfragen über `localStorage`, damit Nutzer, die die Abfrage des Betriebssystems abgelehnt haben, nicht bei jeder Sitzung erneut gefragt werden.
- **Abmeldung** -- `setOptedOut(true)` und `unsubscribe()` verhindern erneute Abfragen und entfernen den serverseitigen Gerätedatensatz.
- **Erkennung der Standalone-PWA** -- `isStandalone()` erlaubt Hosts, iOS-Push-Abfragen davon abhängig zu machen, dass der Benutzer die PWA auf dem Startbildschirm installiert hat (iOS erlaubt Push nur aus installierten PWAs).
- **Neu anmelden beim Gemeindewechsel** -- `refreshEnrollment()` sendet das bestehende Browser-Abonnement erneut für den neuen `userChurch`, ohne den Benutzer erneut abzufragen. Rufen Sie es im Handler für Änderungen von `userChurch` auf.

### Anforderung an den Service Worker {#service-worker-requirement}

Der `PushManager` des Browsers löst ein Abonnement nur auf, wenn an der konfigurierten Scope ein Service Worker registriert ist. Die PWAs von ChurchApps verwenden [Serwist](https://serwist.dev/) (Next.js-Apps) oder workbox zur Erzeugung des Service Workers. Da der Server nun immer Push zusätzlich zur Socket-Zustellung versucht (siehe [Wann Push ausgelöst wird](#when-push-fires)), ist der Service Worker der Punkt der Deduplizierung: Sein `push`-Handler muss `showNotification` unterdrücken, wenn ein fokussierter bzw. sichtbarer Client bereits auf dem Deep-Link-Ziel der Benachrichtigung ist. Das App-Badge muss er dagegen immer aktualisieren, unabhängig davon, ob das Banner angezeigt wurde:

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

`deepLinkFor` und `clientMatchesTarget` sind consumer-spezifisch -- siehe `B1App/src/app/sw.ts` für die Referenzimplementierung. B1App leitet `privateMessage` an `/mobile/messages/:personId` weiter, B1Admin leitet `notification` an sein Benachrichtigungs-Panel weiter usw.

## Hinweise zum Betrieb {#operational-notes}

- **`gone: true`-Ergebnisse** -- `WebPushHelper.sendBulk` gibt pro Empfänger `{ token, success, gone, errorMessage }` zurück. Ein Ergebnis mit `gone: true` (der Push-Dienst antwortete mit `404` oder `410`) bedeutet, dass das Abonnement dauerhaft ungültig ist; nachgelagerter Code in `NotificationHelper` löscht diese Gerätedatensätze, damit sie nicht erneut versucht werden.
- **TTL** -- Push-Nachrichten werden mit `TTL: 86400` (24 Stunden) gesendet. Verbindet sich der Browser des Benutzers innerhalb von 24 Stunden nicht mit dem Push-Dienst, wird die Nachricht verworfen.
- **Keine Wiederholungen** -- Ein vorübergehender Fehler (Timeout, 5xx) wird protokolliert und nicht wiederholt. Push erfolgt nach bestem Bemühen; die Socket-Verbindung der Seite und die E-Mail-Benachrichtigung sichern die Zuverlässigkeit ab.
- **Deaktivierte Umgebungen** -- Entwicklungsumgebungen können die VAPID-Schlüssel leer lassen; `WebPushHelper.isEnabled()` gibt dann `false` zurück, und Pushes werden sofort übersprungen. Das ist das beabsichtigte Verhalten für Umgebungen ohne eigene VAPID-Identität.

## Verwandte Seiten {#related-pages}

- [Architektur der Benachrichtigungen](./architecture/notifications.md) -- Der vollständige Trichter für In-App-, Push- und E-Mail-Eskalation sowie die Erinnerungs-Engine
- [Echtzeit-Architektur](./realtime.md) -- WebSocket-Zustellung; Push wird nun aus demselben In-App-Trichter zusammen mit der Socket-Zustellung im selben Durchlauf ausgelöst, nicht nur als Fallback, wenn eine Socket-Zustellung nicht ankommt
- [Messaging-Endpunkte](./api/endpoints/messaging.md) -- Benachrichtigungen, Geräte und der Rest der Messaging-Oberfläche
- [AppHelper](./shared-libraries/app-helper.md) -- Das npm-Paket, das `WebPushHelper` enthält
