---
title: "Web-Push-Benachrichtigungen"
---

# Web-Push-Benachrichtigungen

<div class="article-intro">

ChurchApps Web-Apps liefern Push-Benachrichtigungen über die W3C Web Push API -- denselben Mechanismus, der von Firebase Cloud Messaging auf der Serverseite verwendet wird, aber über den nativen PushManager des Browsers geliefert. Ein einzelnes VAPID-Schlüsselpaar auf der MessagingApi deckt jeden Consumer ab.

</div>

## Wann Push ausgelöst wird

Die MessagingApi liefert eine Web-Push-Nachricht in drei Situationen:

1. **Gruppen-/Inhaltsbenachrichtigungen** -- jemand antwortet auf einen Thread
2. **Private Nachrichten** -- POST /messaging/privatemessages löst einen Push aus
3. **Generische Benachrichtigungen** -- direkte Aufrufe von POST /messaging/notifications/create

Push ist die letzte-Resort-Stufe. Wenn ein Empfänger eine aktive WebSocket-Verbindung hat, erhält er die Nachricht in der App und Push wird unterdrückt.

## Server-Flow

NotificationHelper überprüft zuerst die In-Page-Socket-Zustellung, dann falls nötig WebPushHelper.sendBulkTypedMessages.

### Erforderliche Umgebungsvariablen

| Variable | Beschreibung |
|----------|-------------|
| webPushPublicKey | VAPID Public Key (base64url) |
| webPushPrivateKey | VAPID Private Key |
| webPushSubject | mailto:-URI |

### VAPID-Schlüsselpaar generieren



## Speichermodell

Web-Push-Subscriptions werden in der devices-Tabelle mit webpush:-Präfix gespeichert.

## Endpunkte

Basispfad: /messaging/webpush

- GET /publicKey -- Gibt publicKey zurück
- POST /subscribe -- Registriert Subscription
- POST /unsubscribe -- Löscht Subscription
- DELETE /subscription/:id -- Löscht nach ID

## Client-Primitive: WebPushHelper



Verhaltensweisen: Fähigkeitsprüfung, Cooldown, Opt-out, Standalone-PWA-Erkennung.

## Verwandte Seiten

- [Real-time Architecture](./realtime)
- [Messaging Endpoints](./api/endpoints/messaging)
- [AppHelper](./shared-libraries/app-helper)
