---
title: "Make"
---

# Make

<div class="article-intro">

[Make](https://www.make.com) (aiemmin Integromat) on visuaalinen työnkulkujen automaatioalusta. Se muistuttaa Zapieria, mutta siinä on joustavampi logiikka ja edullisempi hinta suuressa mittakaavassa. Virallinen B1.church Make -sovellus mahdollistaa "skenaarioiden" rakentamisen. Ne reagoivat B1-tapahtumiin välittömästi ja kirjoittavat tietueita takaisin B1:een.

</div>

<div class="prereqs">
<h4>Ennen aloittamista</h4>

- [Make](https://www.make.com)-tili (ilmainen taso riittää pieniin työnkulkuihin)
- Seurakunnan ylläpitäjä, jolla on **Muokkaa asetuksia** -oikeus B1Adminissa
- Karkea käsitys skenaariosta, jonka haluat rakentaa

</div>

## Moduulit

| Tyyppi | Mitä | B1-tapahtuma / päätepiste |
|---|---|---|
| **Välitön laukaisin** | Tarkkaile tapahtumia | mikä tahansa tilattu B1-tapahtuma (`person.created`, `donation.created`, …) |
| **Toiminto** | Luo henkilö | lisää uuden henkilön |
| **Toiminto** | Lisää lahjoitus | kirjaa lahjoituksen |
| **Toiminto** | Lisää ryhmän jäsen | lisää henkilön ryhmään |
| **Haku** | Hae henkilöitä | etsii henkilöitä nimen tai sähköpostin perusteella |

Välitön laukaisin antaa sinun valita, mitä tapahtumaa kuunnellaan. Skenaariossa on yksi laukaisinmoduuli, ja se määritetään tapahtumakohtaisesti.

## Asennus

### 1. Luo B1-API-avain

1. Siirry B1Adminissa kohtaan **Asetukset → Kehittäjä → API-avaimet**.
2. Napsauta **Uusi API-avain**, nimeä se "Make" ja myönnä tarvitsemasi oikeudet.
3. **Lisää `settings:write`**, jos jokin skenaarioistasi käyttää välitöntä laukaisinta. Make rekisteröi webhookin puolestasi, kun skenaario käynnistetään.
4. Myönnä myös toimintamoduulien tarvitsemat oikeudet (esim. `donations:write` Lisää lahjoitus -moduulille).
5. Tallenna ja kopioi `cak_…`-avain.

### 2. Asenna yhteys

1. Luo Makessa uusi skenaario ja vedä **B1.church**-laukaisinmoduuli työtilaan.
2. Kun sinua pyydetään, valitse **Luo yhteys**. Liitä API-avain *API Key* -kenttään ja jätä *API Base URL* arvoon `https://api.churchapps.org` (ellet testaa testiympäristöä vasten).
3. Napsauta **Tallenna**. Make testaa avaimen lukemalla seurakuntasi profiilin.

Yhteys tallennetaan Make-tilillesi, ja se on käytettävissä kaikissa skenaarioissa.

### 3. Määritä laukaisin

1. Avaa **Tarkkaile tapahtumia** -moduulin asetukset.
2. Valitse haluamasi tapahtuma, esimerkiksi `donation.created`.
3. Tallenna. Make luo yksilöllisen webhook-osoitteen ja tallentaa sen sisäisesti.

### 4. Lisää seuraavat moduulit

Vedä työtilaan mikä tahansa Maken sadoista sovellusmoduuleista, kuten Mailchimp, Google Sheets, Slack, HubSpot tai oma HTTP-päätepisteesi. Yhdistä laukaisimen tuloste (`event`, `churchId`, `data.id`, `data.amount`, …) niiden syötekenttiin. Makessa on myös tasoitus-, iterointi-, reititys- ja aggregointimoduuleja, joilla voit rakentaa haarautuvia ja rinnakkaisia kulkuja, joita Zapierissa olisi vaikea toteuttaa.

### 5. Käynnistä skenaario

Kytke **Aktiivinen** päälle skenaarion otsikkorivillä. Make kutsuu B1:n `POST /membership/webhooks`-päätepistettä ja rekisteröi osoitteen. Tästä hetkestä lähtien jokainen vastaava B1-tapahtuma kulkee skenaarion läpi reaaliajassa.

Kun skenaario sammutetaan, kutsutaan `DELETE /membership/webhooks/{id}`, joten orpoja tilauksia ei jää jäljelle.

## Yleisiä reseptejä

### Synkronoi lahjoitukset Google Sheetiin talouden tarkastusta varten

- **Laukaisin** — B1: Tarkkaile tapahtumia (`donation.created`)
- **Toiminto** — Google Sheets: Lisää rivi. Yhdistä `data.donationDate`, `data.amount`, `data.personId`, `data.method` ja `data.batchId` taulukon sarakkeisiin.

### Ehdollinen Slack-ilmoitus lahjoituksen summan mukaan

- **Laukaisin** — B1: Tarkkaile tapahtumia (`donation.created`)
- **Reititin**:
  - Haara A — Suodatin: `data.amount >= 1000` → Slack: lähetä kanavalle `#major-gifts`
  - Haara B — oletushaara → Slack: lähetä kanavalle `#donations`

### Uusi henkilö → CRM + tervetuloviesti + Slack

- **Laukaisin** — B1: Tarkkaile tapahtumia (`person.created`)
- **Toiminto** — HubSpot: Luo yhteystieto
- **Toiminto** — Mailgun: Lähetä tervetuloviesti
- **Toiminto** — Slack: Ilmoita kanavalle `#new-people` (rinnakkain, käytä Makea reitittimen kautta)

## Miten välitön laukaisin toimii

Välitön laukaisin perustuu webhookiin eikä kyselyyn. Kun se aktivoidaan, Make kutsuu `POST /membership/webhooks`-päätepistettä generoidulla osoitteella ja valitsemallasi tapahtumalla. Kun tapahtuma tapahtuu B1:ssä, B1 lähettää viestin Makeen, ja skenaario suoritetaan muutamassa sekunnissa. Skenaarion poistaminen käytöstä poistaa webhookin.

Laukaisin käynnistyy vain tapahtumille, jotka tapahtuvat **skenaarion ollessa aktiivinen**. Aiempia tapahtumia ei käsitellä jälkikäteen.

## Rajoitukset ja huomiot

- **Yksi tapahtuma per Tarkkaile tapahtumia -moduuli.** Jos haluat kuunnella useita tapahtumia yhdessä skenaariossa, lisää useita laukaisinmoduuleja erillisiin skenaarioihin tai käytä yhtä moduulia yhdistetyllä tapahtumalistalla (katso alla).
- **Allekirjoituksen vahvistusta ei ole saatavilla.** Make ei välitä `X-B1-Signature`-otsaketta skenaarioon. Luottamusraja on Makessa skenaarikohtainen, arvaamaton webhook-osoite. Tämä on Makessa tavallista. Jos tarvitset eksplisiittisiä allekirjoitustarkistuksia, rakenna mukautettu integraatio [SDK:n](/docs/developer/api/webhooks#sdk-support) avulla.
- **Toimintojen määrä** — jokainen API-kutsu toimintomoduulista lasketaan Make-toimintokiintiöösi, eikä se vaikuta B1:n puolella mihinkään.

## Vianmääritys

- **Yhteyden testaus epäonnistuu** — yleisin syy on kirjoitusvirhe API-avaimessa. Kopioi avain uudelleen B1Administa. Koko avain näytetään vain kerran. Jos olet hukannut sen, luo uusi avain.
- **Laukaisinmoduuli ei aktivoidu** — tarkista B1Adminissa kohta **Asetukset → Kehittäjä → Webhookit**. Jos et näe riviä "Make — &lt;tapahtuma&gt;" skenaarion aktivoinnin jälkeen, avaimelta puuttuu `settings:write`-oikeus. Päivitä avain ja aktivoi skenaario uudelleen.
- **Toiminto palauttaa `403 Forbidden`** — API-avaimella ei ole kyseisen päätepisteen vaatimaa oikeutta. Esimerkiksi Lisää lahjoitus tarvitsee `donations:write`-oikeuden. Päivitä avain B1Adminissa ja testaa uudelleen.

## Sovelluksen mukauttaminen

B1.church Make -sovellus on avointa lähdekoodia. JSON-määrittelyt ovat `B1Integrations/Make/`-repositoriossa. Jos tarvitset moduulin, jota ei ole olemassa (esim. uuden toiminnon päätepisteelle, jota emme ole vielä kattaneet), avaa siellä issue tai pull request.

## Katso myös

- [Zapier](./zapier) — sama malli yksinkertaisemmalla käyttöliittymällä ja suuremmalla sovelluskatalogilla
- [Slack ja Discord](./slack-discord) — sisäänrakennetut chat-ilmoitukset ilman Makea
- [Webhookit (kehittäjäviite)](/docs/developer/api/webhooks)
