---
title: "Web-Push-Benachrichtigungen"
---

# Web-Push-Benachrichtigungen

<div class="article-intro">

ChurchApps Web-Apps liefern Push-Benachrichtigungen über die W3C Web Push API -- der gleiche Mechanismus, der von Firebase Cloud Messaging auf der Server-Seite verwendet wird, aber über den `PushManager` des Browsers statt FCM geliefert.

</div>

## When push fires

Die MessagingApi liefert eine Web-Push-Nachricht in drei Situationen:

1. **Gruppen-/Inhaltsbenachrichtigungen** -- jemand antwortet auf einen Thread, dem der Benutzer folgt
2. **Private Nachrichten** -- `POST /messaging/privatemessages` triggert einen Push an die eingeschriebenen Geräte des Empfängers
3. **Generische Benachrichtigungen** -- direkte Aufrufe zu `POST /messaging/notifications/create`

Push ist die **Notfallebene** in `NotificationHelper`'s Eskalationsleiter.

## Server flow

```
NotificationHelper.checkShouldNotify(...)
  │
  ├─ in-page socket delivery ← preferred
  │
  └─ NotificationHelper.<sendXxx>(...)
       └─ WebPushHelper.sendBulkTypedMessages(...)
            └─ web-push library → VAPID-signed POST
```

## Required environment variables

VAPID-Schlüssel müssen vorhanden sein, damit der Push aktiviert ist:

| Variable | Description |
|----------|-------------|
| `webPushPublicKey` | VAPID-Öffentlicher Schlüssel |
| `webPushPrivateKey` | VAPID-Privater Schlüssel |
| `webPushSubject` | `mailto:` URI |

## Generating a VAPID key pair

```bash
npx web-push generate-vapid-keys
```

## Storage model

Web-Push-Abonnements werden in der vorhandenen `devices`-Tabelle gespeichert.

## Endpoints

Base path: `/messaging/webpush`

| Method | Path | Auth | Description |
|--------|------|------|-------------|
| GET | `/publicKey` | Public | Gibt `{ publicKey, enabled }` zurück |
| POST | `/subscribe` | JWT | Registriert ein Abonnement |
| POST | `/unsubscribe` | Public | Löscht ein Geräte-Zeile |
| DELETE | `/subscription/:id` | JWT | Löscht eine spezifische Geräte-Zeile |

## Client primitive: `WebPushHelper`

`@churchapps/apphelper`'s `WebPushHelper` ist der einzige Client-seitige Entry Point.

## Service worker requirement

Der Browser's `PushManager` benötigt einen registrierten Service Worker.

## Operational notes

- Eine `gone: true`-Antwort bedeutet, die Subscription ist permanent ungültig
- TTL: Push-Nachrichten werden mit `TTL: 86400` (24 Stunden) gesendet
- Keine Wiederholungen: Ein transienter Fehler wird protokolliert und nicht wiederholt
- Deaktivierte Umgebungen: Staging- und Dev-Umgebungen können die VAPID-Schlüssel leer lassen

## Related Pages

- [Real-time Architecture](./realtime)
- [Messaging Endpoints](./api/endpoints/messaging)
- [AppHelper](./shared-libraries/app-helper)
