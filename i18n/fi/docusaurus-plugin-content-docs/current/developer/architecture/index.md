---
title: "Arkkitehtuuri"
---

# Arkkitehtuuri

<div class="article-intro">

Nämä sivut ovat järjestelmien kokonaiskuvauksia, jotka kattavat useita repositorioita. Ne kuvaavat, miten ChurchAppsin keskeiset järjestelmät toimivat alusta loppuun sovellusten, API-moduulien ja jaettujen kirjastojen yli. Ne eivät kuvaa, miten yksittäinen projekti pystytetään. Lue ne ennen kuin muutat järjestelmän toimintaa. Lue [Asennus](../setup/), jotta saat projektin käyntiin, ja [API-osio](../api/), jos tarvitset endpoint-tason viitteitä.

</div>

## Ekosysteemi lyhyesti

ChurchAppsissa on noin 20 itsenäistä repositoriota (ei monorepo). Asiakassovellukset kommunikoivat pienen joukon taustapalvelujen API:ien kanssa HTTPS- ja WebSocket-yhteyksien kautta. Ne jakavat koodia `@churchapps`-nimiavaruudessa julkaistujen npm-pakettien avulla.

```
┌────────────────────────────────┐            ┌──────────────────────────────────────────────┐
│  Clients                       │            │  Api — core modular monolith (AWS Lambda)    │
│                                │            │                                              │
│  B1Admin    staff dashboard    │   HTTPS    │   membership    attendance    content        │
│  B1App      member portal +    │ ─────────▶ │   giving        messaging     doing          │
│             church websites    │            │                                              │
│  B1Checkin  check-in kiosk     │ ◀───WS───▶ │   one MySQL database per module (6 total)    │
│  B1Mobile   (maintenance-only) │            └──────────────────────────────────────────────┘
│  FreePlay   TV content player  │            ┌──────────────────────────────────────────────┐
└───────────────┬────────────────┘            │  LessonsApi — Lessons.church backend         │
                │                             └──────────────────────────────────────────────┘
                │  shared code via npm (@churchapps/*)
                ▼
   helpers (cross-app interfaces) · apphelper (React components) · apihelper (Express/server utilities)
```

Kaksi rakenteellista sääntöä muokkaa kaikkea, mitä tässä osiossa dokumentoidaan:

1. **Moduulit ovat eristettyjä.** Jokainen Api-moduuli omistaa oman tietokantansa ja taulunsa. Muut moduulit ja sovellukset pääsevät sen tietoihin vain REST-endpointtien kautta. Katso [Moduulirakenne](../api/module-structure).
2. **Jaettu koodi toimitetaan npm-paketteina.** Sovellukset eivät koskaan tuo toistensa lähdekoodia. Kaikki uudelleenkäytettävä ylittää repositoriorajat paketeissa `@churchapps/helpers`, `@churchapps/apphelper` tai `@churchapps/apihelper`. Katso [Jaetut kirjastot](../shared-libraries/).

## Järjestelmäkartat

| Sivu | Mitä se kattaa | Alueet |
|------|----------------|-------|
| [Ilmoitukset ja muistutukset](./notifications) | Miten järjestelmä ilmoittaa ihmiselle asioista: kaksi lähetysovea, kanavien eskalointiketju ja muistutusmoottori | Api (messaging), B1Admin, B1App |
| [Reaaliaikainen arkkitehtuuri](../realtime) | WebSocket-toimitusrakenne, joka on chatin, läsnäolon ja sovelluksen sisäisen toimituksen taustalla | Api (messaging), kaikki web-sovellukset |
| [Web-push-ilmoitukset](../web-push) | Selaimen push-kanava: VAPID-avaimet, tilausten tallennus ja toimitus | Api (messaging), kaikki web-sovellukset |
| [Lahjoitukset](./giving) | Maksunvälittäjät ja maksuyhdyskäytävät, lahjoitusvirrat, rahastot ja erät, yhdyskäytävien webhookit | Api (giving), apphelper, B1App, B1Admin |
| [Tapahtumailmoittautumiset](./registrations) | Ilmoittautumisten kaupallinen malli: osallistujatyypit, valinnat, alennuskoodit, maksut lahjoitusyhdyskäytävän kautta sekä odotuslista | Api (content + giving), B1App, B1Admin |
| [Sisäänkirjautumiset](./check-ins) | Kioskilla ja itsepalvelussa tapahtuva sisäänkirjautuminen, osallistumistietojen malli, huoneiden reititys, lasten turvallisuuskerros ja tarrojen tulostus | B1Checkin, B1App, B1Admin, Api (attendance + membership) |
| [Verkkosivurakentaja](./website-builder) | Sivun, osion ja elementin puu, elementtityyppien sopimus ja renderöijät, blogi, käyttöoikeuden vaativat sivut, SEO ja tekoälygenerointi | Api (content), AskApi, helpers/apphelper, B1Admin, B1App |
| [Verkkosivujen reititys ja useat sivustot](./websites) | Miten pyyntö ratkaistaan seurakunnaksi ja tietylle sivustolle, useiden sivustojen `siteId`-tietomalli sekä Caddy-reunapalvelin mukautetuille domaineille | B1App, Api (membership + content), B1Admin |
| [Integraatiot](./integrations) | Laajennuspinta: OAuth, API-avaimet, webhookit, sisältölähteet ja MCP | Api, jaetut kirjastot, ulkoiset sovellukset |
| [Tapahtumaloki ja peruutettavat erät](./audit-log) | Oletuksena päällä oleva jokaisen muutoksen kirjaus kontrollerin solmukohdassa sekä erätaso, joka tekee tuonneista ja joukkotoimista peruutettavia | Api (kaikki moduulit), B1Admin, B1Transfer |
| [MinistryStuff](./ministrystuff) | Maksullinen tallennus- ja tekstiviestiluottopalvelu: jaettuun JWT-tunnistukseen perustuva identiteetti, palvelu-avaimella tehtävä S2S-viestintä, tekstiviesti- ja tallennuspalveluntarjoajien rajapinnat sekä Stripe-laskutus | MinistryStuffApi, MinistryStuffWeb, Api (content + messaging), texting/apihelper-paketit, B1Admin |
| [Oma tallennustila](./byos-storage) | Seurakunnat voivat linkittää Google Drivebin, Dropboxin, OneDriven tai S3-yhteensopivan säilön ilmaisen 100 Mt:n rajan ylittäviin latauksiin: OAuth-yhdistäminen, palvelukohtaiset lataustavat ja julkinen latausuudelleenohjaus | Api (content + membership), helpers/apphelper-paketit, B1Admin, B1App |
| [Sisältöyhteisöt](./commons) | Yhteinen aineisto- ja lähetysrunko tuotteiden väliselle käyttäjien luomalle sisällölle sekä yksi vain henkilökunnalle tarkoitettu moderointijono B1Adminin palvelinhallinnassa | Api (commons module), B1Admin, WorshipCommons, Lessons.church, FreeShow |

:::tip
Kun muutos muuttaa jonkin näistä järjestelmistä toimintaa, ei vain yhden sovelluksen sivua, vastaava järjestelmäkartta tulee päivittää samassa työssä. Näin tämä osio pysyy luotettavana ensimmäisenä pysähdyspaikkana uusille osallistujille.
:::

## Ehdotukset

Nämä asiakirjat kuvaavat arviointiin ehdotettua työtä eivätkä saatavilla olevaa tuotteen toimintaa.

| Ehdotus | Mitä se kattaa |
|---|---|
| [Twilio BYOK](./twilio-byok-proposal) | Seurakunnan omistama tili, avaimet, palvelu ja puhelinnumero; integraation laajuus, suostumus, toimitus, arviot ja julkaisutarkistukset |
| [Twilio-seurakunnan perehdytysluonnos](./twilio-byok-onboarding-draft) | Ehdotetut B1-rekisteröintilomakkeen asetukset, seurakuntakohtaiset kampanjaesimerkit sekä hyväksymis- ja toimintatarkistuslistat |
