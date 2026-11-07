---
title: "Web Push -ilmoitukset"
description: "VAPID-avaimet, WebPushHelper-asiakas ja service worker -käsittely, jotta B1.church ja B1 Admin voivat lähettää jäsenille selainpush-ilmoituksia."
---

# Web Push -ilmoitukset

<div class="article-intro">

ChurchApps-verkkosovellukset toimittavat push-ilmoituksia W3C Web Push API:n kautta. Palvelinpuolella käytetään samaa mekanismia kuin Firebase Cloud Messagingissa, mutta toimitus tapahtuu selaimen omalla `PushManager`-rajapinnalla FCM:n sijaan. Yksi VAPID-avainpari MessagingApi:ssa kattaa kaikki kuluttajat (B1Admin, B1App ja tulevat PWA:t).

</div>

## Milloin push-ilmoitus lähetetään

Push on yksi porras yhdessä toimituskierroksessa `NotificationHelper.attemptDeliveryWithEscalation()`-funktiossa (`Api/src/modules/messaging/helpers/NotificationHelper.ts`). Ensin tarkistetaan sovelluksen sisäiset asetukset, sitten yritetään samalla kierroksella sekä socket-toimitusta että push-ilmoitusta (kumpikin oman asetustarkistuksensa takana), ja lopuksi lähetetään sähköposti. Vastaanottaja, joka on mykistänyt kategorian, ei koskaan saa push-ilmoitusta. Socket-toimituksen onnistuminen ei enää estä push-ilmoitusta. Kaikki ilmoitustyypit toimivat nyt samoin kuin yksityisviestit aina ovat toimineet, joten taustalla oleva asennettu PWA näyttää silti käyttöjärjestelmän ilmoituksen, vaikka socket-toimitus olisi jo onnistunut. Päällekkäiset ilmoitukset estää sen sijaan palvelutyöntekijä selaimessa (katso [Palvelutyöntekijän vaatimus](#service-worker-requirement)). Ajastetut muistutukset ja henkilökunnan käynnistämät yleislähetykset alkavat suoraan push-portaalta ja ohittavat socket-vaiheen kokonaan. Sähköposti pysyy ajastimen ohjaamana: se nostaa lukemattomat rivit omalla aikataulullaan eikä osana tätä kierrosta.

Yleisimmät polut, jotka päätyvät push-vaiheeseen:

1. **Sisältöilmoitukset**: vastaus keskusteluun, jota henkilö seuraa, maininta tai muu tapahtuma, joka reititetään `NotificationHelper.createNotifications()`-funktion kautta.
2. **Yksityisviestit**: suora viesti kulkee samaa toimitusfunktiota pitkin ja yrittää aina push-ilmoitusta socket-toimituksen rinnalla.
3. **Ajastetut muistutukset**: tapahtuma-, tehtävä- ja palvelumuistutukset, jotka mumuttuvat ja lähetetään muistutusmoottorin kautta. Moottori aloittaa uudet esiintymät suoraan push-portaalta.
4. **Henkilökunnan käynnistämät push-ilmoitukset**: `POST /messaging/notifications/create`, `/ping` ja `/group/send` kertaluonteisille tai ryhmälähetyksille.

## Palvelimen kulku

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

### Vaadittavat ympäristömuuttujat

VAPID-avaimet tallennetaan `Environment`-asetuksiin, ja niiden on oltava olemassa, jotta push-ilmoitukset ovat käytössä:

| Ympäristömuuttuja | `Environment`-asetus | Kuvaus |
|----------|----------|-------------|
| `WEB_PUSH_PUBLIC_KEY` | `webPushPublicKey` | VAPID-julkinen avain (base64url). Palautetaan asiakkaille reitin `GET /messaging/webpush/publicKey` kautta |
| `WEB_PUSH_PRIVATE_KEY` | `webPushPrivateKey` | VAPID-yksityinen avain. Käytetään allekirjoittamaan jokainen lähtevä push-ilmoitus |
| `WEB_PUSH_SUBJECT` | `webPushSubject` | `mailto:`-URI, joka ilmoitetaan push-palveluille. Oletus on `mailto:support@churchapps.org` |

`WebPushHelper.isEnabled()` palauttaa arvon `false`, jos jompikumpi avaimista puuttuu. Viestimoduuli toimii edelleen, mutta push-toimitukset eivät tee mitään. B1App-mobiilisivusto kertoo jäsenille, ettei push-ilmoituksia ole otettu käyttöön, eikä tarjoa asennusta.

### VAPID-avainparin luominen

```bash
npx web-push generate-vapid-keys
```

Lisää tulos `.env`-tiedostoon (paikallisesti) tai AWS SSM Parameter Storeen (käyttöönotetuissa ympäristöissä). Avainten vaihtaminen mitätöi kaikki olemassa olevat tilaukset, ja asiakkaiden on rekisteröidyttävä uudelleen seuraavan sivulatauksen yhteydessä.

## Tallennusmalli

Web Push -tilaukset tallennetaan olemassa olevaan `devices`-tauluun FCM-laiterekisterien rinnalle. Ne erotetaan `fcmToken`-sarakkeen `webpush:`-etuliitteellä:

```
fcmToken = "webpush:" + JSON.stringify({ endpoint, keys: { p256dh, auth } })
```

Tämän ansiosta yksi `loadByPersonId`-kutsu palauttaa kaikki käyttäjän rekisteröidyt laitteet alustasta riippumatta. `WebPushHelper.isWebPushToken(token)` ja `decodeSubscription(token)` hoitavat etuliitteen käsittelyn.

## Päätepisteet

Perusreitti: `/messaging/webpush`

| Metodi | Reitti | Todennus | Kuvaus |
|--------|------|------|-------------|
| GET | `/publicKey` | Julkinen | Palauttaa `{ publicKey, enabled }`. Asiakkaat välittävät `publicKey`-arvon kohteeseen `pushManager.subscribe({ applicationServerKey })` |
| POST | `/subscribe` | JWT | Rekisteröi tai päivittää tilauksen todennetulle käyttäjälle. Runko: `{ subscription: { endpoint, keys: { p256dh, auth } }, appName?, deviceInfo?, label? }` |
| POST | `/unsubscribe` | Julkinen | Poistaa kaikki laiterivit, joiden `fcmToken` sisältää annetun endpointin. Runko: `{ endpoint }` |
| DELETE | `/subscription/:id` | JWT | Poistaa tietyn laiterivin palvelimen puolella olevan tunnisteen perusteella |

## Asiakaspuolen perusrakenne: `WebPushHelper`

`@churchapps/apphelper`-paketin `WebPushHelper` on ainoa asiakaspuolen käyttöpiste. Isäntäsovellukset määrittävät sen kerran käynnistyksessä ja kutsuvat `subscribe()`-funktiota kirjautumisen jälkeen.

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

Kuluttajat saavat seuraavat toiminnot valmiina:

- **Ominaisuuksien tarkistus**: `isSupported()` palauttaa `false` selaimissa, joista puuttuvat `serviceWorker`, `PushManager` tai `Notification`.
- **Odotusaika**: `canPromptNow()` noudattaa 7 päivän odotusaikaa kehotusten välillä `localStorage`-tallennuksen avulla. Näin käyttäjiltä, jotka ovat hylänneet käyttöjärjestelmän kehotuksen, ei kysytä uudelleen joka istunnossa.
- **Poisjäänti**: `setOptedOut(true)` ja `unsubscribe()` estävät uudelleen kysymisen ja poistavat palvelimen puolella olevan laiterivin.
- **Asennetun PWA:n tunnistus**: `isStandalone()` antaa isäntäsovelluksille mahdollisuuden rajata iOS-push-kehotukset tilanteeseen, jossa käyttäjä on asentanut PWA:n kotinäytölleen (iOS sallii push-ilmoitukset vain asennetuista PWA-sovelluksista).
- **Uudelleenrekisteröinti seurakuntaa vaihdettaessa**: `refreshEnrollment()` lähettää olemassa olevan selaimen tilauksen uudelleen uudelle `userChurch`-tietueelle kysymättä käyttäjältä uudelleen. Kutsu sitä `userChurch`-muutoksen käsittelijästä.

### Palvelutyöntekijän vaatimus

Selaimen `PushManager` ratkaisee tilauksen vain, jos määritetyssä laajuudessa on rekisteröity palvelutyöntekijä. ChurchApps-PWA:t käyttävät palvelutyöntekijöiden generointiin [Serwistiä](https://serwist.dev/) (Next.js-sovellukset) tai workboxia. Koska palvelin yrittää nyt aina push-ilmoitusta socket-toimituksen rinnalla (katso [Milloin push-ilmoitus lähetetään](#when-push-fires)), palvelutyöntekijä on päällekkäisyyksien estokohta. Sen `push`-käsittelijän on estettävä `showNotification`, kun fokusoitu tai näkyvä asiakas on jo ilmoituksen syväreitin kohteessa. Sovelluksen merkin päivitys on kuitenkin aina tehtävä, riippumatta siitä, näytettiinkö banneri:

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

`deepLinkFor` ja `clientMatchesTarget` ovat kuluttajakohtaisia. Katso viitetoteutus tiedostosta `B1App/src/app/sw.ts`. B1App reitittää `privateMessage`-tyypin polkuun `/mobile/messages/:personId` ja B1Admin reitittää `notification`-tyypin omaan hälytyspaneeliinsa.

## Käyttöön liittyviä huomioita

- **`gone: true` -tulokset**: `WebPushHelper.sendBulk` palauttaa jokaiselle vastaanottajalle objektin `{ token, success, gone, errorMessage }`. Tulos `gone: true` (push-palvelu vastasi tilalla `404` tai `410`) tarkoittaa, että tilaus on pysyvästi virheellinen. `NotificationHelper`in jatkokäsittely poistaa nämä laiterivit, jottei niitä yritetä uudelleen.
- **TTL**: push-viestit lähetetään arvolla `TTL: 86400` (24 tuntia). Jos käyttäjän selain ei yhdistä push-palveluun 24 tunnin kuluessa, push-viesti pudotetaan.
- **Ei uusia yrityksiä**:väliaikainen virhe (aikakatkaisu, 5xx) kirjataan lokiin, eikä sitä yritetä uudelleen. Push on parhaan yrityksen periaatteella toimiva. Pysyvyydestä huolehtivat sivun sisäinen socket ja sähköposti-ilmoitusporras.
- **Pois käytöstä olevat ympäristöt**: kehitysympäristöissä VAPID-avaimet voivat jäädä tyhjiksi. Tällöin `WebPushHelper.isEnabled()` palauttaa `false`, ja push-ilmoitukset ohitetaan. Tämä on tarkoitettu toiminta ympäristöissä, joilla ei ole omaa VAPID-identiteettiä.

## Aiheeseen liittyvät sivut

- [Ilmoitusten arkkitehtuuri](./architecture/notifications.md) -- Koko sovelluksen sisäisten, push- ja sähköposti-ilmoitusten porrastus sekä muistutusmoottori
- [Reaaliaikainen arkkitehtuuri](./realtime.md) -- WebSocket-toimitus. Push-ilmoitus lähtee nyt samasta sovelluksen sisäisestä kanavasta socket-toimituksen rinnalla samalla kierroksella, eikä vain varavaihtoehtona, kun socket-toimitus ei onnistu
- [Viestintärajapinnan päätepisteet](./api/endpoints/messaging.md) -- Ilmoitukset, laitteet ja muu viestintärajapinta
- [AppHelper](./shared-libraries/app-helper.md) -- npm-paketti, joka toimittaa `WebPushHelper`-luokan
