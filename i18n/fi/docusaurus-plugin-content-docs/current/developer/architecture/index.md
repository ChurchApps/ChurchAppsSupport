---
title: "Arkkitehtuuri"
description: "Järjestelmäkartat eri repositorioiden yli, jotka näyttävät, miten lahjoitukset, sisäänkirjautumiset, ilmoitukset ja verkkosivustot toimivat B1 Adminissa, B1.churchissa ja Apissa ennen niiden muuttamista."
---

# Arkkitehtuuri

<div class="article-intro">

Nämä sivut ovat järjestelmäkarttoja eri repositorioiden yli: ne dokumentoivat, miten ChurchAppsin keskeinen järjestelmä toimii alusta loppuun sovellusten, API-moduulien ja jaettujen kirjastojen kautta. Ne eivät kuvaa, miten yksittäinen projekti on määritetty. Lue ne ennen järjestelmän toiminnan muuttamista. Lue [Asennus](../setup/index.md), jos haluat saada projektin käyntiin, ja [API-osio](../api/index.md) päätepistekohtaista viitettä varten.

</div>

## Ekosysteemi yhdellä silmäyksellä

ChurchAppsissa on noin 20 itsenäistä repositoriota (ei monorepo). Asiakassovellukset puhuvat pienen joukon taustapalvelu-API:iden kanssa HTTPS:n ja WebSocketin kautta. Ne jakavat koodia npm-paketeilla, jotka on julkaistu `@churchapps`-nimiavaruudessa.

```
┌────────────────────────────────┐            ┌──────────────────────────────────────────────┐
│  Clients                       │            │  Api — core modular monolith (AWS Lambda)    │
│                                │            │                                              │
│  B1Admin    staff dashboard    │   HTTPS    │   membership    attendance    content        │
│  B1App      member portal +    │ ─────────▶ │   giving        messaging     doing          │
│             church websites    │            │                                              │
│  B1Checkin  check-in kiosk     │ ◀───WS───▶ │   one MySQL database per module (6 total)    │
│                                │            └──────────────────────────────────────────────┘
│  FreePlay   TV content player  │            ┌──────────────────────────────────────────────┐
└───────────────┬────────────────┘            │  LessonsApi — Lessons.church backend         │
                │                             └──────────────────────────────────────────────┘
                │  shared code via npm (@churchapps/*)
                ▼
   helpers (cross-app interfaces) · apphelper (React components) · apihelper (Express/server utilities)
```

Kaksi rakenteellista sääntöä muokkaa kaikkea tämän osion dokumentaatiota:

1. **Moduulit ovat eristettyjä.** Jokainen Api-moduuli omistaa oman tietokantansa ja taulunsa. Muut moduulit ja sovellukset pääsevät sen dataan vain sen REST-päätepisteiden kautta. Katso [Moduulirakenne](../api/module-structure.md).
2. **Jaettu koodi toimitetaan npm-paketteina.** Sovellukset eivät tuo toistensa lähdekoodia. Uudelleenkäytettävä koodi ylittää repositoriorajat `@churchapps/helpers`-, `@churchapps/apphelper)`- tai `@churchapps/apihelper`-paketin kautta. Katso [Jaetut kirjastot](../shared-libraries/index.md).

## Järjestelmäkartat

| Sivu | Mitä se kattaa | Ulottuvuus |
|------|----------------|-------|
| [Ilmoitukset ja muistutukset](./notifications.md) | Miten mikä tahansa kertoo henkilölle jotain: kaksi lähetysovea, kanavan eskalaatioketju ja muistutusmoottori | Api (messaging), B1Admin, B1App |
| [Reaaliaikainen arkkitehtuuri](../realtime.md) | WebSocket-toimituskehys, jonka varassa ovat chat, läsnäolo ja sovelluksen sisäinen toimitus | Api (messaging), kaikki web-sovellukset |
| [Web Push -ilmoitukset](../web-push.md) | Selaimen push-kanava: VAPID-avaimet, tilausten tallennus ja toimitus | Api (messaging), kaikki web-sovellukset |
| [Lahjoitukset](./giving.md) | Maksunvälittäjät ja -yhdyskäytävät, lahjoitusvirrat, rahastot ja erät, yhdyskäytävän webhookit | Api (giving), apphelper, B1App, B1Admin |
| [Tapahtumarekisteröinnit](./registrations.md) | Rekisteröintien kaupallinen malli: osallistujatyypit, valinnat, alennuskoodit, maksut lahjoitusyhdyskäytävän kautta ja odotuslista | Api (content + giving), B1App, B1Admin |
| [Sisäänkirjautumiset](./check-ins.md) | Kioski- ja itsepalvelusisäänkirjautuminen, osallistumistietomalli, huonereititys, lasten turvallisuuskerros ja tarrojen tulostus | B1Checkin, B1App, B1Admin, Api (attendance + membership) |
| [Verkkosivurakentaja](./website-builder.md) | Sivun, osion ja elementin puu, elementtityypin sopimus ja renderöijät, blogi, käyttöoikeuspohjaiset sivut, SEO ja tekoälygenerointi | Api (content), AskApi, helpers/apphelper, B1Admin, B1App |
| [Verkkosivujen reititys ja monisivustot](./websites.md) | Miten pyyntö ratkeaa seurakunnaksi ja tietyksi sivustoksi, monisivustojen `siteId`-tietomalli ja Caddy-mukautettujen domainien reuna | B1App, Api (membership + content), B1Admin |
| [Integraatiot](./integrations.md) | Laajennuspinta: OAuth, API-avaimet, webhookit, sisältöpalvelut ja MCP | Api, jaetut kirjastot, ulkoiset sovellukset |
| [Tapahtumaloki ja peruttavat erät](./audit-log.md) | Oletuksena päällä oleva kaikkien muutosten auditointi kontrollerin pääsykohdassa sekä erätaso, joka tekee tuonneista ja joukkotoimista peruttavia | Api (kaikki moduulit), B1Admin, B1Transfer |
| [MinistryStuff](./ministrystuff.md) | Maksullinen tallennus- ja tekstiviestiluottopalvelu: jaettu JWT-identiteetti, palveluavaimella tehtävä S2S-viestintä, tekstiviesti- ja tallennuspalveluntarjoajien saumat sekä Stripe-laskutus | MinistryStuffApi, MinistryStuffWeb, Api (content + messaging), texting/apihelper-paketit, B1Admin |
| [Omat tallennustilat (Bring-Your-Own Storage)](./byos-storage.md) | Seurakunnat yhdistävät Google Driveen, Dropboxiin, OneDriveen tai S3-yhteensopivaan säilöön ilmaisen 100 Mt:n ylittäviä latauksia varten: OAuth-yhdistäminen, palveluntarjoajakohtaiset latausmuodot ja julkinen latausuudelleenohjaus | Api (content + membership), helpers/apphelper-paketit, B1Admin, B1App |
| [Sisältöyhteisö](./commons.md) | Jaettu resurssi- ja lähetysrunko tuotteiden välisen käyttäjien luoman sisällön taustalla sekä yksi ainoa vain henkilökunnalle tarkoitettu moderointijono B1Admin Server Adminissa | Api (commons module), B1Admin, WorshipCommons, Lessons.church, FreeShow |

:::tip
Kun muutos muuttaa jonkin näistä järjestelmistä toimintaa, ei vain yhden sovelluksen sisällä olevaa sivua, vastaava järjestelmäkartta tässä on päivitettävä samassa työssä. Näin tämä osio pysyy luotettavana ensimmäisenä pysäkkinä uusille osallistujille.
:::

## Ehdotukset

Nämä asiakirjat kuvaavat ehdotettua työtä arvioitavaksi eivätkä saatavilla olevaa tuotteen toimintaa.

| Ehdotus | Mitä se kattaa |
|---|---|
| [Twilio BYOK](./twilio-byok-proposal.md) | Seurakunnan omistama tili, avaimet, palvelu ja puhelinnumero; integraation laajuus, suostumus, toimitus, arviot ja julkaisutarkistukset |
| [Twilio-seurakuntaliittymän luonnos](./twilio-byok-onboarding-draft.md) | Ehdotetut B1-rekisteröintilomakkeen asetukset, seurakuntakohtaiset kampanjaesimerkit sekä hyväksymis- ja toimintatarkistuslistat |
