---
title: "Clearstream"
description: "Yhdistä Clearstream SMS B1 Adminiin Zapierilla: lähetä viestejä uusista lahjoituksista ja lomakkeista sekä tuo vastaukset takaisin henkilöiksi."
---

# Clearstream

<div class="article-intro">

Käynnistä [Clearstream](https://clearstream.io)-tekstiviesti mistä tahansa B1-tapahtumasta, kuten uudesta henkilöstä, uudesta lahjoituksesta, lomakkeen lähetyksestä tai kalenterin päivityksestä, ja hae vastaukset takaisin B1-tietueiksi. Clearstreamin Zapier-sovellus tukee molempia suuntia, joten koko kytkentä on valmis resepti eikä vaadi omaa koodia.

</div>

<div class="prereqs">
<h4>Ennen aloittamista</h4>

- [Clearstream](https://clearstream.io)-tili, jossa on vähintään yksi lista ja SMS-kiintiö
- [Zapier](https://zapier.com)-tili
- B1Admin-käyttäjä, jolla on **Muokkaa asetuksia** -oikeus

</div>

## Mitä voit kytkeä

| Suunta | Käynnistin | Toiminto |
|---|---|---|
| B1 → Clearstream | B1 `person.created` | Clearstream: Create/Update Subscriber + Send Text to Number |
| B1 → Clearstream | B1 `donation.created` | Clearstream: Send Text to List (esim. talousryhmälle ilmoittaminen) |
| B1 → Clearstream | B1 `form.submission.created` | Clearstream: Send Text to a routing list (esim. rukouspyyntötiimille) |
| Clearstream → B1 | New Incoming Text | B1: Create Person; merkitse avainsanalla, jonka henkilö kirjoitti |

Clearstreamin Zapier-toiminnot: *Send Text to Number*, *Send Text to List*, *Create/Update Subscriber*, *Add Subscriber to Automated Workflow*, *Add Tag to Subscriber*, *Remove Subscriber From List*.

## Asennus

### 1. Luo B1-API-avain

**Asetukset → Kehittäjä → API-avaimet → Uusi API-avain**:

- `settings:write`: vaaditaan, jotta B1 voi rekisteröidä käynnistimen webhookin
- `people:read`: tarvitaan henkilön hakemiseen tapahtumasta (`personId` → nimi/puhelin/sähköposti)
- (Valinnainen) `people:write`, jos Clearstreamin vastausten pitää luoda B1-yhteystietoja

### 2. Rakenna "tekstiviesti uudesta lahjoituksesta" -Zap

1. **Käynnistin**: B1.church: New Donation
2. **Toiminto**: B1.church: Find Person (lahjoituksen `personId`)
3. **Toiminto**: Clearstream: Send Text to Number. Käytä vaiheen 2 henkilön puhelinnumeroa vastaanottajana ja kirjoita viesti (`"Thanks for your gift, {first}! …"`).

Ota Zap käyttöön. B1 rekisteröi lahjoitus-webhookin aktivoinnin yhteydessä, ja näet rivin `Zapier — donation.created` kohdassa **Asetukset → Kehittäjä → Webhookit**.

### 3. (Valinnainen) Hae vastaukset takaisin B1-tietueiksi

1. **Käynnistin**: Clearstream: New Incoming Text
2. **Toiminto**: Suodatin Zapierissa avainsanan mukaan, esim. jatka vain, jos viestin sisältö alkaa sanalla `PRAY`
3. **Toiminto**: B1.church: Find Person (puhelinnumeron mukaan)
4. **Toiminto**: Suodatin / Polku: jos henkilöä ei löydy, luo hänet; kummassakin tapauksessa tallenna viestin sisältö jonnekin (Slack, Google Sheet tai B1-lomakelähetys Webhooks by Zapierin kautta).

## Yleisiä reseptejä

### Vapaaehtoistiimin hälyttäminen

- **Käynnistin**: B1.church: New Form Submission (suodatettu rukouspyyntölomakkeen tunnuksella)
- **Toiminto**: Clearstream: Send Text to List, jossa lista on päivystävä pastoraalitiimisi. Kirjoita viesti muodossa `New prayer request: {data.questions.0.answer}`.

### Ensikertalaisten seurantasarja

- **Käynnistin**: B1.church: New Person, suodatettu B1-henkilötunnisteella "First-time visitor" (Ensikertainen vierailija)
- **Toiminto**: Clearstream: Add Subscriber to Automated Workflow. Yhdistä työnkulun tunnus valmiiseen 7 päivän tekstiviestisarjaan.

### Avainsanalla ryhmään liittyminen

- **Käynnistin**: Clearstream: New Incoming Text (suodatus avainsanalla `MENS`)
- **Toiminto**: B1.church: Find Person (puhelinnumeron mukaan); haarauta, jos ei löydy → Create Person
- **Toiminto**: B1.church: Add Group Member to the Men's Ministry group

## Rajoitukset ja huomiot

- **Clearstream laskuttaa SMS-viestit viestikohtaisesti.** Jokainen Send Text -toiminto kuluttaa yhden tai useampia krediittejä pituudesta ja vastaanottajien määrästä riippuen. Tarkista tilisi kiintiö.
- **Puhelinnumeron on oltava E.164-muodossa** (esim. `+15555550199`) *Send Text to Number* -toiminnossa. B1:n henkilötietue tallentaa sen, mitä siihen on syötetty. Jos muotoa ei voi taata, käytä *Formatter by Zapier — Numbers → Format Phone Number* -vaihetta.
- **B1:n puolelta ei vaadita otsaketta.** Clearstreamin todennus on kokonaan Clearstreamin Zapier-yhteydessä.

## Vianmääritys

- **Käynnistin ei koskaan laukea**: `Asetukset → Kehittäjä → Webhookit` pitäisi näyttää rivin `Zapier — <event>` Zapin käyttöönoton jälkeen. Jos ei näy, B1-API-avaimelta puuttuu `settings:write`. Luo avain uudelleen ja yhdistä uudelleen.
- **Clearstream palauttaa "Invalid phone number"**: vastaanottajakenttä ei ole E.164-muodossa. Lisää Format Phone Number -vaihe.
- **Send Text to List epäonnistuu virheeseen `403`**: Clearstream-API-käyttäjällä ei ole oikeutta kyseiseen listaan tai listan tunnus on väärä. Listojen tunnukset näkyvät Clearstreamin listan tietosivulla.

## Katso myös

- [Text In Church](./text-in-church.md): vaihtoehtoinen SMS-alusta, samankaltainen kytkentärakenne
- [Mobile Message](./mobile-message.md): kirkoille Yhdysvaltojen ulkopuolella
- [Zapier (yleiskatsaus)](../zapier.md): B1:n puoli kaikista Zapier-resepteistä
- [Clearstream API -dokumentaatio](https://api-docs.clearstream.io/): mukautettuihin integraatioihin Zapier-sovelluksen ulkopuolella
