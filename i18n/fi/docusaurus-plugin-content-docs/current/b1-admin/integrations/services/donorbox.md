---
title: "Donorbox"
description: "Yhdistä Donorbox B1 Adminiin Zapierilla, jotta verkkolahjoitukset luovat lahjoitustietueet ja lahjoittajaprofiilit automaattisesti ilman manuaalista vientiä."
---

# Donorbox

<div class="article-intro">

Jos kirkkosi ottaa lahjoituksia Donorboxin kautta, mutta seuraa ihmisiä ja lahjoituskuitteja B1:ssä, voit antaa Donorboxin välittömien Zapier-laukaisimien luoda vastaavat lahjoituskirjaukset B1:een. Ne voivat myös luoda lahjoittajan B1-henkilöksi, jos häntä ei vielä ole. Manuaalista täsmäytystä tai kuukausittaista vientiä ei tarvita.

</div>

<div class="prereqs">
<h4>Ennen aloittamista</h4>

- [Donorbox](https://donorbox.org)-tili, jossa on vähintään yksi kampanja
- [Zapier](https://zapier.com)-tili
- B1Admin-käyttäjä, jolla on **Edit Settings** -oikeus

</div>

## Mitä voit yhdistää

| Suunta | Donorboxin laukaisin | B1-toiminto |
|---|---|---|
| Donorbox → B1 | New or Updated Donation (välitön) | Find Person → Add Donation |
| Donorbox → B1 | New or Updated Donor | Create Person |
| Donorbox → B1 | New or Updated Plan (toistuva) | Find Person → Add Donation (käytä Plan id:tä muistiinpanona) |

Donorbox julkaisee laukaisimensa **välittöminä**, eli ne käynnistyvät muutaman sekunnin kuluessa todellisesta lahjoituksesta. Viivettä ei ole.

## Asennus

### 1. Luo B1-API-avain

B1Adminissa: **Settings → Developer → API Keys → New API Key**. Oikeudet (scopes):

- `people:read`: lahjoittajan etsimiseen sähköpostilla
- `people:write`: luomaan lahjoittajan, jos hän on uusi
- `donations:write`: lahjoituksen kirjaamiseen

Tämän suunnan laukaisimet ovat Donorboxin, eivät B1:n, joten tässä ei tarvita `settings:write`-oikeutta.

### 2. Rakenna "record a donation" -Zap

1. **Laukaisin**: Donorbox: New Donation. Yhdistä Donorboxin API-avaimella (Donorboxissa: *Account → Profile → API Settings*).
2. **Toiminto**: B1.church: Find Person. Yhdistä lahjoittajan sähköposti laukaisimesta kenttään *Email*.
3. **Toiminto**: Filter by Zapier (valinnainen): jatka vain, jos lahjoittajaa ei löytynyt.
4. **Toiminto**: B1.church: Create Person. Yhdistä etu- ja sukunimi sekä sähköposti, jotta lahjoittaja tallentuu jäsenenä eikä pelkkänä lahjoituskirjauksena.
5. **Toiminto**: B1.church: Add Donation. Yhdistä:
   - Amount → `data.amount`
   - Donation Date → laukaisimen lahjoituspäivä
   - Fund → valitse B1-rahasto, joka vastaa Donorboxin kampanjaa (Zapier voi vaihtaa rahastoa suodattimen tai muotoilu-vaiheen perusteella)
   - Method → "Online"
   - Notes → Donorboxin tapahtuman tunnus (hyödyllinen täsmäytyksessä)

Ota Zap käyttöön. Seuraava todellinen lahjoitus Donorboxin kautta ilmestyy automaattisesti kohtaan **B1Admin → Donations**.

## Yleisiä reseptejä

### Yksi Zap per rahasto

Jos ajat useita Donorbox-kampanjoita, jotka vastaavat eri B1-rahastoja, selkein tapa on yksi Zap per kampanja, jonka alussa on Donorboxin *campaign*-suodatin. Silloin rahastovastaavuus on kiinteästi määritelty, eikä hakuvaihetta tarvita.

### Käsittele päivitetyt lahjoitukset korjauksina

Donorboxin *New or Updated Donation* käynnistyy myös muokkauksista. Käytä Zapierin *Path*-vaihetta kentässä `event_type` haarautumiseen: "new" → Add Donation, "updated" → Find Donation + Update. Huomaa, että B1:n Zapier-sovelluksessa ei tällä hetkellä ole Update Donation -toimintoa. Toistaiseksi kirjaa "updated"-tapahtumat Slack-kanavalle manuaalista tarkistusta varten.

### Lähetä toistuvien lahjoitusten muutokset Slack-kanavalle

- **Laukaisin**: Donorbox: New or Updated Plan
- **Toiminto**: Slack: Send Message kanavalle `#donations` (esim. "Plan changed: Sarahin kuukausilahjoitus on nyt 200 $")

## Rajoitukset ja huomiot

- **Yhdistä lahjoittajat sähköpostilla.** Donorbox ei jaa B1:n henkilötunnusta, joten ainoa pysyvä yhdistävä tieto on sähköposti. Lahjoittajat, jotka lahjoittavat eri sähköpostiosoitteella, luovat uuden B1-henkilön. Kuukausittaisessa täsmäytyksessä kannattaa etsiä tällaiset tapaukset.
- **Hyvitykset eivät näy erikseen.** Donorbox lähettää tilapäivityksen samaan lahjoitukseen. B1:n Zapier-sovelluksessa ei tällä hetkellä ole *Update Donation* -toimintoa, joten turvallinen tapa on kirjata hyvitystapahtumat erikseen ja säätää lahjoitusta käsin.
- **Testaa ensin Donorboxin hiekkalaatikossa (sandbox)**, jotta tuotanto-B1:een ei synny vääriä lahjoituksia. Donorbox antaa testitilan tunnukset, jotka ovat erillään tuotantotunnuksista.

## Vianmääritys

- **"Person not found" -varoitus joka kerta**: tämä on normaalia, jos vaiheet on järjestetty niin, että *Create Person* suoritetaan "ei löytynyt" -haarassa. Jos Create Person ei suoritu lainkaan, tarkista, että API-avaimella on `people:write`-oikeus.
- **Lahjoituksen summa on 100 kertaa liian suuri tai pieni**: Donorbox lähettää joissakin datamuodoissa senttejä ja joissakin dollareita. Jaa tarvittaessa 100:lla vaiheella *Formatter by Zapier — Numbers*.
- **Yhdestä lahjoituksesta syntyy kaksoiskappaleita**: Donorbox käynnistää sekä *New Donation* että *Updated Donation*. Suodata joko `event_type = "donation.succeeded"` tai rakenna kaksi Zapia, joiden suodattimet eivät mene päällekkäin.

## Katso myös

- [Zapier (yleiskatsaus)](../zapier.md): B1-puoli jokaisesta Zapier-reseptistä
- [Subsplash](./subsplash.md): toinen lahjoitusalusta, jolla on Zapier-sovellus
- [Mailchimp](./mailchimp.md): ketjuta "uusi lahjoitus" sähköpostitunnisteeksi
