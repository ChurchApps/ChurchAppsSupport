---
title: "Webhookit"
description: "Ota käyttöön reaaliaikaiset webhookit B1 Administa: rekisteröi päätepisteet, valitse tapahtumat, vahvista HMAC-allekirjoitukset, käsittele uudelleenyritykset ja lähetä epäonnistuneet tiedot uudelleen."
---

# Webhookit

<div class="article-intro">

Webhookien avulla seurakunta voi lähettää reaaliaikaisia ilmoituksia kolmannen osapuolen työkaluihin: automaatiopalveluihin (Zapier, Make, n8n), asiakkuudenhallintajärjestelmiin (CRM), kirjanpitojärjestelmiin tai mihin tahansa, joka hyväksyy HTTP POST -pyyntöjä. Kun henkilö, ryhmä tai perhe muuttuu B1:ssä, B1 lähettää allekirjoitetun JSON-sisällön jokaiseen tähän tapahtumaan tilattuun URL-osoitteeseen.

</div>

<div class="prereqs">
<h4>Ennen aloittamista</h4>

- Seurakunnan ylläpitäjä, jolla on oikeus **Muokkaa kirkon asetuksia**, rekisteröi webhookit ja hallinnoi niitä
- Vastaanottavan päätepisteen on oltava saavutettavissa **HTTPS**-yhteydellä julkisessa osoitteessa
- Sinulla on oltava keino tallentaa allekirjoitusavain turvallisesti, sillä se näytetään vain kerran

</div>

## Yleiskatsaus

Webhookit ovat vain **lähteviä**: B1 kutsuu päätepistettäsi, sinä et kutsu B1:tä. Jokainen webhook on seurakuntakohtainen tilaus, johon kuuluvat kohde-URL-osoite, allekirjoitusavain ja luettelo tilatuista tapahtumista.

Toimitus käyttää **kestävää lähtöjonoa** (durable outbox): kun tilattu tapahtuma tapahtuu, B1 tallentaa toimitusrivin, ja taustapalvelu lähettää sen POST-pyyntönä noin minuutin kuluessa. Epäonnistuneet toimitukset yritetään uudelleen eksponentiaalisella viiveellä. Mitään ei katoa, vaikka toimitus olisi hidas tai päätepisteesi olisi hetkellisesti alhaalla.

## Webhookin rekisteröinti

### B1Admin-sovelluksessa

Siirry kohtaan **Asetukset → Kehittäjä → Webhookit → Uusi webhook**. Anna nimi, hyötykuorman URL-osoite ja valitse tapahtumat, joihin haluat tilata. Tallennuksen jälkeen **allekirjoitusavain näytetään kerran**. Kopioi se heti ja tallenna integraatioosi. Sitä ei näytetä enää uudelleen. Voit kiertää avaimen myöhemmin, mutta alkuperäistä avainta et voi noutaa.

### API:n kautta

Kaikki päätepisteet sijaitsevat Membership-moduulin perusreitin `/membership/webhooks` alla. Ne vaativat joko JWT-tunnisteen seurakunnan ylläpitäjältä, jolla on oikeus `Settings / Edit`, **tai [API-avaimen](./api-keys.md), joka on luotu `settings:write`-laajuudella**. Samat reitit hyväksyvät molemmat. Tämän ansiosta Zapier ja Make voivat rekisteröidä webhookit seurakunnan puolesta, kun Zap tai scenario otetaan käyttöön.

```http
POST /membership/webhooks
Authorization: Bearer <jwt>
Content-Type: application/json

{
  "name": "Zapier — new members",
  "url": "https://hooks.zapier.com/hooks/catch/123/abc",
  "events": ["person.created", "person.updated", "group.member.added"]
}
```

Luontivastaus, ja **vain** luontivastaus, sisältää `secret`-kentän:

```json
{
  "id": "a1b2c3d4e5f",
  "name": "Zapier — new members",
  "url": "https://hooks.zapier.com/hooks/catch/123/abc",
  "events": ["person.created", "person.updated", "group.member.added"],
  "active": true,
  "secret": "9f86d081884c7d659a2feaa0c55ad015a3bf4f1b2b0b822c"
}
```

| Menetelmä ja polku | Tarkoitus |
|---|---|
| `GET /membership/webhooks` | Luettele seurakunnan webhookit (salaisuus jätetään pois) |
| `GET /membership/webhooks/events` | Kelvollisten tapahtumanimien luettelo |
| `GET /membership/webhooks/:id` | Lataa yksi webhook |
| `POST /membership/webhooks` | Luo (ilman `id`:tä) tai päivitä (`id` mukana) |
| `POST /membership/webhooks/:id/regenerate-secret` | Kierrä allekirjoitusavain; palauttaa uuden arvon kerran |
| `DELETE /membership/webhooks/:id` | Poista webhook |
| `GET /membership/webhooks/:id/deliveries` | Webhookin viimeaikaiset toimitusyritykset |
| `GET /membership/webhooks/deliveries/:deliveryId` | Yhden toimituksen koko hyötykuorma ja vastaus |
| `POST /membership/webhooks/deliveries/:deliveryId/redeliver` | Aseta toimitus uudelleen jonoon |

## Tapahtumaluettelo

Tapahtumanimet noudattavat mallia `{entity}.{action}`. Hae ajantasainen luettelo osoitteesta `GET /membership/webhooks/events`.

| Tapahtuma | Käynnistyy, kun |
|---|---|
| `person.created` | Henkilö lisätään |
| `person.updated` | Henkilön tietoja muutetaan |
| `person.destroyed` | Henkilö poistetaan |
| `household.created` | Perhe lisätään |
| `household.updated` | Perhettä muutetaan |
| `household.destroyed` | Perhe poistetaan |
| `group.created` | Ryhmä lisätään |
| `group.updated` | Ryhmää muutetaan |
| `group.destroyed` | Ryhmä poistetaan |
| `group.member.added` | Henkilö lisätään ryhmään |
| `group.member.removed` | Henkilö poistetaan ryhmästä |
| `donation.created` | Lahjoitus kirjataan: manuaalisesti, verkossa tai siirtymisessä tilasta käsittelyssä valmiiksi |
| `donation.updated` | Lahjoituskirjausta muokataan |
| `attendance.recorded` | Käynti kirjataan (manuaalisesti tai sisäänkirjautumisella) |
| `session.created` | Uusi läsnäolojakso luodaan (manuaalisesti tai automaattisesti ensimmäisellä sisäänkirjautumisella) |
| `form.submission.created` | Lomake lähetetään |
| `event.created` | Kalenteritapahtuma lisätään |
| `event.updated` | Kalenteritapahtumaa muokataan |
| `event.destroyed` | Kalenteritapahtuma poistetaan |

## Hyötykuorman muoto

Jokainen toimitus on HTTP `POST` -pyyntö, jossa on JSON-runko ja seuraavat otsikkotiedot:

| Otsake | Kuvaus |
|---|---|
| `Content-Type` | Aina `application/json` |
| `X-B1-Event` | Tapahtuman nimi, esim. `person.created` |
| `X-B1-Delivery-Id` | Tämän toimitusyrityksen yksilöllinen tunniste. Käytä sitä kaksoiskappaleiden tunnistamiseen. |
| `X-B1-Signature` | Raakarungon HMAC-SHA256-allekirjoitus (ks. alla) |
| `X-B1-Timestamp` | Pyynnön lähetyshetki Unix-aikaleimana sekunteina |
| `User-Agent` | `B1-Webhooks/1.0` |

Runko kääritään muuttuneen resurssin ympärille pieneen kuoreen:

```json
{
  "event": "person.created",
  "churchId": "AbC123XyZ90",
  "occurredAt": "2026-05-17T14:32:08.114Z",
  "data": {
    "id": "Pq7Rs2Tu4Vw",
    "churchId": "AbC123XyZ90",
    "name": { "display": "Jordan Rivera", "first": "Jordan", "last": "Rivera" },
    "contactInfo": { "email": "jordan@example.com" }
  }
}
```

`*.destroyed`-tapahtumissa `data` sisältää vain poistetun tietueen `id`- ja `churchId`-kentät.

Tapahtumat, joiden hyötykuormat viittaavat muihin tietueisiin tunnisteiden avulla, sisältävät myös luettavia nimiä, jotka ratkaistaan toimitushetkellä: `personName` ja `groupName` ryhmän jäsenyystapahtumissa, `personName` läsnäolo-, lahjoitus- ja listan jäsenyystapahtumissa, `groupName` tapahtumassa `session.created` sekä `formName` (ja `personName`, jos lomakelähetys liittyy henkilöön) tapahtumassa `form.submission.created`.

## Liitintyypit

Oletustoimitusmuoto on yllä kuvattu JSON-kuori, eli `connectorType: "standard"`. [Slackia ja Discordia](/docs/b1-admin/integrations/slack-discord) varten sama webhook-moottori lähettää sen sijaan chat-muotoisen viestin, jonka nämä palvelut hyväksyvät suoraan:

| `connectorType` | Lähetettävä runko | Käyttötarkoitus |
|---|---|---|
| `"standard"` (oletus) | `{event, churchId, occurredAt, data}` -kuori, allekirjoitettu | Kirjoitat oman integraation tai osoitat Zapieriin, Makeen tai omaan palvelimeen |
| `"slack"` | `{ "text": "💝 New donation: $50.00" }` | Lähetät suoraan Slackin Incoming Webhook -URL-osoitteeseen |
| `"discord"` | `{ "content": "💝 New donation: $50.00" }` | Lähetät suoraan Discord-kanavan webhook-URL-osoitteeseen |
| `"mailchimp"` | ei sovellu, koska liitin kutsuu Mailchimpin API:a itse | Haluat [yleisön synkronoinnin](/docs/b1-admin/integrations/services/mailchimp) ilman isännöitävää URL-osoitetta |

Liitintyyppi asetetaan webhook-editorin **Liitintyyppi**-pudotusvalikosta tai `POST /membership/webhooks` -rungon kentällä `connectorType`. Allekirjoitettu `X-B1-Signature`-otsake lähetetään edelleen Slack- ja Discord-toimituksissa (ne jättävät sen huomiotta vahingoittamatta mitään), joten webhookin vaihtaminen myöhemmin takaisin tyyppiin `standard` ei vaadi uudelleen allekirjoittamista.

Slack ja Discord ovat pelkkiä rungon muotoiluja: moottori lähettää edelleen seurakunnan antamaan URL-osoitteeseen. `mailchimp` on ensimmäinen liitin, joka hallitsee itse HTTP-vuorovaikutuksensa. Jokaisesta tapahtumasta se lähettää todennettuja upsert-, archive- ja tag-pyyntöjä Mailchimpin API:in (`MailchimpConnector.deliver`). Sen tunnistetiedot (`{apiKey, audienceId}`) tallennetaan AES-salattuina kenttään `webhooks.connectorConfig`, ja API:n kautta ne ovat vain kirjoitettavissa. Mailchimp-webhookit hyväksyvät vain henkilö-, ryhmän jäsen- ja listan jäsen -tapahtumat. Tallennusreitti tarkistaa avaimen ja yleisön Mailchimpiltä ennen hyväksymistä. Toimitusrivit tallentavat tavallisen kuoren, joten toimitusloki näyttää, mitä B1 vastaanotti, Mailchimpin vastauksen rinnalla. Kartoittamattomat tilanteet (henkilö ilman sähköpostia, tapahtuma ilman kartoitusta) merkitään onnistuneiksi vastausrungolla `Skipped:`, eikä niitä yritetä uudelleen.

## Testitoimitukset

Jokaisessa webhook-editorissa on painike **Lähetä testitapahtuma**. Vastaava API-kutsu on `POST /membership/webhooks/:id/test`. Testireitti rakentaa synteettisen hyötykuorman ensimmäiselle tilatulle tapahtumalle ja lähettää sen synkronisesti oikeaa allekirjoitettua toimitusreittiä pitkin (Slackille ja Discordille myös `formatForConnector`-funktion kautta). Se palauttaa tuloksena olevan toimitusrivin, mukaan lukien `responseStatus` ja `responseBody`. Käytä sitä yhteyden ja allekirjoituksen käsittelyn varmistamiseen ennen integraation ottamista oikeaan käyttöön. `mailchimp`-webhookeissa testi tarkistaa sen sijaan tallennetut tunnistetiedot Mailchimpin API:ssa, koska synteettinen tapahtuma kirjoittaisi väärän tilaajan seurakunnan oikeaan yleisöön. Se palauttaa toimitusmuotoisen tuloksen luomatta riviä.

## Allekirjoitusten vahvistaminen

Vahvista aina `X-B1-Signature` ennen kuin luotat hyötykuormaan. Allekirjoitus on `sha256=` ja sen perässä **raakapyynnön rungon** hex-muotoinen HMAC-SHA256, jonka avaimena on allekirjoitusavaimesi. Laske allekirjoitus vastaanottamillesi tavuille. Älä muodosta JSON-dataa uudelleen jäsennetystä objektista.

**Node.js**

```js
const crypto = require("crypto");

function isValid(rawBody, signatureHeader, secret) {
  const expected = "sha256=" + crypto.createHmac("sha256", secret).update(rawBody, "utf8").digest("hex");
  const a = Buffer.from(expected);
  const b = Buffer.from(signatureHeader || "");
  return a.length === b.length && crypto.timingSafeEqual(a, b);
}
```

**Python**

```python
import hashlib, hmac

def is_valid(raw_body: bytes, signature_header: str, secret: str) -> bool:
    expected = "sha256=" + hmac.new(secret.encode(), raw_body, hashlib.sha256).hexdigest()
    return hmac.compare_digest(expected, signature_header or "")
```

**PHP**

```php
function isValid(string $rawBody, string $signatureHeader, string $secret): bool {
    $expected = "sha256=" . hash_hmac("sha256", $rawBody, $secret);
    return hash_equals($expected, $signatureHeader ?? "");
}
```

Hylkää kaikki pyynnöt, joiden allekirjoitus ei täsmää. Voit halutessasi hylätä myös pyynnöt, joiden `X-B1-Timestamp` on yli muutaman minuutin vanha. Tämä rajoittaa toistohyökkäysten aikaikkunaa.

## SDK-tuki

Node.js:ssä `@churchapps/integration-sdk` sisältää tyypitetyn vahvistimen ja Express-välikerroksen. Se hoitaa puolestasi raakarungon tallennuksen, allekirjoituksen tarkistuksen ja kuoren jäsentämisen:

```ts
import express from "express";
import { b1WebhookMiddleware } from "@churchapps/integration-sdk";

const app = express();
// Capture the raw body before JSON parsing — required so the signature still verifies.
app.use(express.json({ verify: (req, _res, buf) => { (req as any).rawBody = buf; } }));

app.post("/webhooks/b1", b1WebhookMiddleware({ secret: process.env.B1_WEBHOOK_SECRET! }), (req, res) => {
  const env = req.b1Webhook!;
  switch (env.event) {
    case "donation.created": console.log("new gift", env.data.amount); break;
  }
  res.sendStatus(200);
});
```

SDK tarjoaa myös `WebhookVerifier.verify(secret, rawBody, signatureHeader)`-funktion muille ajoympäristöille kuin Expressille, kuten serverless-funktioille tai Fastifylle. Katso lisätietoja paketista npm-rekisterissä.

## Toimitus ja uudelleenyritykset

Päätepisteesi tulisi vastata `2xx`-tilakoodilla mahdollisimman nopeasti, mieluiten heti työn jonottamisen jälkeen eikä sen käsittelyn jälkeen. Mikä tahansa muu kuin `2xx`-vastaus, yhteysvirhe tai yli **10 sekunnin** vastausaika lasketaan epäonnistuneeksi toimitukseksi.

Epäonnistuneet toimitukset yritetään uudelleen eksponentiaalisella viiveellä: **16 yritystä noin 5 päivän aikana**. Väli kasvaa minuutista tunteihin, ja viimeisissä yrityksissä väli on jopa 3 päivää. 16. epäonnistuneen yrityksen jälkeen toimitus merkitään tilaan `exhausted` ja se hylätään.

Toimitus on **vähintään kerran** -periaatteella: sama toimitus voi saapua useammin kuin kerran, esimerkiksi jos päätepisteesi onnistuu, mutta vastaus katoaa. Tunnista kaksoiskappaleet `X-B1-Delivery-Id`-otsakkeen avulla. Käsittele kukin tunniste vain kerran ja käsittele toistuvat tapaukset tyhjätoimintoina.

### Automaattinen poistaminen käytöstä

Jos webhook tuottaa **kolme peräkkäistä `exhausted`-toimitusta**, B1 poistaa sen automaattisesti käytöstä. Korjaa päätepisteesi ja ota sitten webhook uudelleen käyttöön B1Admin-sovelluksessa tai `POST /membership/webhooks` -pyynnön kautta, jossa `"active": true`.

## Tarkastelu ja uudelleenlähetys

B1Admin-sovelluksen webhook-editori näyttää taulukon **Viimeisimmät toimitukset**. Siinä ovat tapahtuma, tila, yritysten määrä, vastauskoodi ja aikaleima. Valitsemalla rivin näet koko lähetetyn hyötykuorman ja saadun vastauksen.

Käytä **Lähetä uudelleen** -toimintoa asettaaksesi minkä tahansa aiemman toimituksen uudelleen jonoon alkuperäisellä hyötykuormalla. Tästä on hyötyä, kun olet korjannut päätepisteesi virheen tai haluat täydentää tapahtumat, jotka päätepisteesi menetti sen ollessa alhaalla.

## URL-osoitteiden vaatimukset

Koska webhook-URL-osoitteet ovat seurakunnan antamia, B1 estää palvelinpuolen pyyntöjen väärentämisen (SSRF). Webhook-URL-osoite hylätään sekä rekisteröitäessä että uudelleen tarkistettaessa ennen jokaista toimitusta, jos se:

- ei käytä **`https`**-yhteyskäytäntöä
- osoittaa `localhost`-osoitteeseen, `.local`- tai `.internal`-isäntänimeen, tai
- ratkeaa **yksityiseen, loopback-, link-local- tai pilvimetatietojen** IP-osoitteeseen

Päätepisteesi on oltava julkisesti saavutettavissa oleva HTTPS-palvelu.
