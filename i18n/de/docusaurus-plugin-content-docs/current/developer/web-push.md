---
title: "Web-Push-Benachrichtigungen"
---

# Web-Push-Benachrichtigungen

ChurchApps-Web-Apps liefern Push-Benachrichtigungen über die W3C Web Push API -- der gleiche Mechanismus, der von Firebase Cloud Messaging auf der Server-Seite verwendet wird, aber über den Browser-nativen `PushManager` liefert.

## Wann Push feuert

Push ist eine Stufe bei einer einzelnen Zustellungs-Pass in `NotificationHelper.attemptDeliveryWithEscalation()`: ein In-App-Präferenz-Gate, dann Socket-Zustellung und Push-Versuch in der gleichen Pass (jeweils hinter seinem eigenen Präferenz-Gate), dann E-Mail.

Die häufigsten Pfade, die Push erreichen:

1. **Content-Benachrichtigungen** -- eine Antwort auf ein Gespräch, das die Person folgt
2. **Private Nachrichten** -- eine direkte Nachricht geht durch die gleiche Zustellungsfunktion
3. **Geplante Erinnerungen** -- Event-, Aufgaben- und Service-Erinnerungen
4. **Von Staff ausgelöste Pushes** -- einmalige oder Gruppen-Broadcasts

## Server-Fluss

```
NotificationHelper.createNotifications(...) / ReminderEngine.scan(...)
  │
  └─ NotificationHelper.attemptDeliveryWithEscalation(...)
       ├─ in-App Präferenz-Gate
       ├─ beide versucht (weder gates den anderen):
       │    ├─ Socket-Zustellung via DeliveryHelper
       │    └─ Push Präferenz-Gate
       │         └─ WebPushHelper.sendBulkTypedMessages(...)
       └─ E-Mail Präferenz-Gate
```

## Erforderliche Umgebungsvariablen

VAPID-Schlüssel werden in `Environment` gespeichert:

| Variable | Beschreibung |
|----------|-------------|
| `webPushPublicKey` | VAPID-Public-Schlüssel (base64url) |
| `webPushPrivateKey` | VAPID-Private-Schlüssel |
| `webPushSubject` | `mailto:` URI für Push-Services |

`WebPushHelper.isEnabled()` gibt `false` zurück, wenn ein Schlüssel fehlt.

## Generieren Sie ein VAPID-Schlüsselpaar

```bash
npx web-push generate-vapid-keys
```

Fügen Sie die Ausgabe zu Ihrer `.env` (lokal) oder AWS SSM Parameter Store (bereitgestellt) hinzu.

## Speichermodell

Web-Push-Abos werden in der bestehenden `devices`-Tabelle neben FCM-Geräte-Datensätzen gespeichert. Sie werden durch ein `webpush:` Präfix auf der `fcmToken`-Spalte unterschieden:

```
fcmToken = "webpush:" + JSON.stringify({ endpoint, keys: { p256dh, auth } })
```

## Endpunkte

Basispfad: `/messaging/webpush`

| Method | Path | Auth | Beschreibung |
|--------|------|------|-------------|
| GET | `/publicKey` | Public | Gibt `{ publicKey, enabled }` zurück |
| POST | `/subscribe` | JWT | Registriert (oder upserts) ein Abo |
| POST | `/unsubscribe` | Public | Löscht eine Geräte-Zeile |
| DELETE | `/subscription/:id` | JWT | Löscht eine spezifische Geräte-Zeile |

## Client-Primitiv: `WebPushHelper`

`WebPushHelper` ist der einzelne Client-seitige Einstiegspunkt:

```typescript
import { WebPushHelper } from "@churchapps/apphelper";

WebPushHelper.configure({
  scope: "/",
  appName: "B1AppPwa"
});

await WebPushHelper.subscribe();
```

Verbraucher erhalten kostenlos:

- **Fähigkeits-Prüfung** -- `isSupported()` gibt false auf Browsern ohne Service Worker zurück
- **Cooldown** -- `canPromptNow()` erzwingt einen 7-Tage-Cooldown zwischen Prompts
- **Opt-Out** -- `setOptedOut(true)` blockiert Re-Prompting
- **Standalone-PWA-Erkennung** -- `isStandalone()` erkennt iOS PWA-Installation
- **Erneutes Enrollen beim Kirchenwechsel** -- `refreshEnrollment()` repostet das bestehende Browser-Abo

## Service-Worker-Anforderung

Der Browser-`PushManager` löst ein Abo nur auf, wenn ein Service Worker am konfigurierten Scope registriert ist. ChurchApps PWAs verwenden Serwist (Next.js-Apps) oder Workbox für Service-Worker-Generierung.

Der Service Worker muss Benachrichtigungen unterdrücken, wenn ein fokussierter/sichtbarer Client bereits auf dem Deep-Link-Ziel der Benachrichtigung ist:

```javascript
self.addEventListener("push", (event) => {
  const data = event.data?.json() ?? {};
  const title = data.title || "ChurchApps";
  const target = deepLinkFor(data.type, data.contentId, data);

  event.waitUntil((async () => {
    if (typeof data.badgeCount === "number") await updateAppBadge(data.badgeCount);

    const clients = await self.clients.matchAll({ type: "window" });
    const alreadyViewing = clients.some((client) => client.focused && clientMatchesTarget(client.url, target));
    if (alreadyViewing) return;

    await self.registration.showNotification(title, {
      body: data.body,
      data: { type: data.type, contentId: data.contentId, url: target },
      icon: "/icons/icon-192.png"
    });
  })());
});
```

## Operationeile Anmerkungen

- **`gone: true` Ergebnisse** -- Ein `gone: true`-Ergebnis (Push-Service antwortet 404 oder 410) bedeutet, dass das Abo permanent ungültig ist
- **TTL** -- Push-Nachrichten werden mit `TTL: 86400` (24 Stunden) gesendet
- **Keine Wiederholungen** -- ein transienter Fehler wird protokolliert und nicht wiederholt
- **Deaktivierte Umgebungen** -- Staging- und Dev-Umgebungen können die VAPID-Schlüssel leer lassen
