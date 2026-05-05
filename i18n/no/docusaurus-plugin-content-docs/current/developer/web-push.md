---
title: "Web Push-varsler"
---

# Web Push-varsler

:::info Teknisk dokumentasjon
Denne siden inneholder teknisk implementasjonsdokumentasjon.
For fullstendig engelsk dokumentasjon, se [Web Push Notifications](/docs/developer/web-push) (engelsk versjon).
:::

<div class="article-intro">

ChurchApps webapper leverer push-varsler via W3C Web Push API -- samme mekanisme brukt av Firebase Cloud Messaging på serversiden, men levert gjennom nettleserens native \`PushManager\` i stedet for FCM. Et enkelt VAPID-nøkkelpar på MessagingApi dekker hver forbruker (B1Admin, B1App, fremtidige PWA-er).

</div>

## Når push utløses

MessagingApi leverer en Web Push-melding i tre situasjoner:

1. **Gruppe-/innholdsvarsler** -- noen svarer på en tråd brukeren følger eller er nevnt i.
2. **Private meldinger** -- \`POST /messaging/privatemessages\` utløser en push til mottakerens registrerte enheter.
3. **Generiske varsler** -- direkte anrop til \`POST /messaging/notifications/create\` eller \`/ping\`.

For fullstendig dokumentasjon på engelsk, se [Web Push Notifications](/docs/developer/web-push).
