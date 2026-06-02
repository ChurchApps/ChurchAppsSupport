---
title: "Nettleser push-meldinger"
---

# Nettleser push-meldinger

<div class="article-intro">

ChurchApps nettapper leverer push-meldinger via W3C Web Push API -- samme mekanisme som brukes av Firebase Cloud Messaging på serverside, men levert gjennom nettleserens `PushManager` i stedet for FCM. En enkelt VAPID-nøkkelpar på MessagingApi dekker hver forbruker.

</div>

## Når push utløses

MessagingApi leverer en Web Push-melding i tre situasjoner:

1. **Gruppe / innholds-meldinger** -- noen svarer på en tråd brukeren følger eller nevnes i.
2. **Private meldinger** -- `POST /messaging/privatemessages` utløser push til mottakerens påmeldte enheter.
3. **Generiske meldinger** -- direkte kall til `POST /messaging/notifications/create`.

Push er **siste-ankers-nivå** i NotificationHelper sin eskalerings-stige. Hvis en mottaker har en aktiv WebSocket-tilkobling i relevant rom, mottar de meldingen in-app og push blir undertrykt.

## Server-flyt

```
NotificationHelper.checkShouldNotify(...)
  │
  ├─ in-page socket-levering via DeliveryHelper ← foretrukket
  │
  └─ NotificationHelper.<sendXxx>(...)
       └─ WebPushHelper.sendBulkTypedMessages(...)
            └─ web-push bibliotek → VAPID-signert POST
```

## Påkrevd miljøvariabler

VAPID-nøkler må være til stede for push å være aktivert:

| Variabel | Beskrivelse |
|----------|-------------|
| `webPushPublicKey` | VAPID offentlig nøkkel |
| `webPushPrivateKey` | VAPID privat nøkkel |
| `webPushSubject` | `mailto:` URI rapportert til push-tjenester |

## Lagring-modell

Web Push-abonnementer lagres i `devices`-tabellen sammen med FCM-enhets-poster. De skilles av et `webpush:`-prefiks på `fcmToken`-kolonnen.

## Sluttpunkter

Base-vei: `/messaging/webpush`

| Metode | Vei | Auth | Beskrivelse |
|--------|------|------|-------------|
| GET | `/publicKey` | Offentlig | Returnerer `{ publicKey, enabled }` |
| POST | `/subscribe` | JWT | Registrerer et abonnement |
| POST | `/unsubscribe` | Offentlig | Sletter enhets-rad |
| DELETE | `/subscription/:id` | JWT | Sletter en spesifikk enhet |

## Klient-primitiv: `WebPushHelper`

`@churchapps/apphelper` sitt `WebPushHelper` er enkelt-klient-inngangs-punkt.

```typescript
import { WebPushHelper } from "@churchapps/apphelper";

WebPushHelper.configure({
  scope: "/",
  appName: "B1AppPwa"
});

await WebPushHelper.subscribe();
```

Oppførsler som forbrukere får gratis:

- **Evne-sjekk** -- `isSupported()` returnerer `false` på nettlesere uten push
- **Cooldown** -- `canPromptNow()` håndhever 7-dagers cooldown
- **Opt-out** -- `setOptedOut(true)` blokkerer re-prompting
- **Standalone-PWA-deteksjon** -- `isStandalone()` lar varter gate iOS push-meldinger

## Relativt sider

- [Sanntidsarkitektur](./realtime) -- WebSocket-levering
- [Meldinger-sluttpunkter](./api/endpoints/messaging)
- [AppHelper](./shared-libraries/app-helper)

