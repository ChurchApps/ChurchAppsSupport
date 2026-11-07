---
title: "Checkr"
description: "Yhdistä B1 Adminin vapaaehtoisilmoittautumiset Checkr-taustatarkastuksiin Make.comilla. Valinnaiset hälytykset turvallisuuskoordinaattorille."
---

# Checkr

<div class="article-intro">

[Checkr](https://checkr.com) tarjoaa taustatarkistuspalvelun työntekijöille ja vapaaehtoisille. Se on lähes jokaisen lasten- tai nuorisotyötä tekevän seurakunnan tarve. B1:ssä **ei ole sisäänrakennettua taustatarkistusominaisuutta**. Tarkistusten tilaaminen, tulosten seuranta ja turvallisuusvaatimusten noudattaminen tapahtuvat kaikki Checkrissä. Alla oleva ohje yhdistää vain B1:n tapahtumat Checkriin. Checkrille ei ole Zapier-sovellusta, mutta [Make.comin Checkr-integraatio](https://www.make.com/en/integrations/checkr) on vahvistettu, ja se tarjoaa tarvittavat toiminnot taustatarkistuksen käynnistämiseen B1-tapahtumasta.

</div>

<div class="prereqs">
<h4>Ennen aloittamista</h4>

- [Checkr](https://checkr.com)-tili, jossa on API-käyttöoikeus ja vähintään yksi määritetty tarkistuspaketti
- [Make](https://www.make.com)-tili
- B1Admin-käyttäjä, jolla on **Edit Settings** -oikeus

</div>

## Mitä voit yhdistää

Make-sovelluksen Checkr-sovellus tarjoaa 1 laukaisimen ja 6 toimintoa:

| Suunta | B1 / Make-laukaisin | Toiminto |
|---|---|---|
| B1 → Checkr | B1 `group.member.added` (suodatettu vapaaehtoisryhmään) | Checkr: Create Candidate → Create Background Check Invitation |
| Checkr → B1 | Checkr-webhook (kutsu- tai raporttitapahtuma) | B1: Päivitä henkilön tietue (esim. tunniste ”Checkr cleared”) |

Make-sovelluksen Checkr-toiminnot: Create Candidate, Create Background Check Invitation, Get Candidate, Get Report, Get Report's ETA ja Get an Invitation. Lisäksi on 4 hakumoduulia.

## Asetukset

### 1. Luo B1-API-avain

**Settings → Developer → API Keys → New API Key**:

- `settings:write`: laukaisimen webhookia varten
- `people:read`: henkilön nimen ja sähköpostiosoitteen hakemiseen tarkistusta aloitettaessa
- (Valinnainen) `people:write`, jos haluat kirjoittaa raportin tilan takaisin mukautettuna kenttänä tai tunnisteena

### 2. Rakenna Make-skenaario ”Käynnistä tarkistus vapaaehtoisilmoittautumisen yhteydessä”

1. **Laukaisin**: B1.church: Watch Events (`group.member.added`).
2. **Suodatin**: jatka vain, jos `data.groupId` vastaa ryhmää ”Children's Volunteers” (tai vastaavaa).
3. **Toiminto**: B1.church: Find Person (`data.personId`-kentän perusteella), jotta saat sähköpostiosoitteen sekä etu- ja sukunimen.
4. **Toiminto**: Checkr: Create Candidate. Kartoita etunimi, sukunimi ja sähköposti vaiheesta 3.
5. **Toiminto**: Checkr: Create Background Check Invitation. Kartoita vaiheessa 4 luodun ehdokkaan tunniste kenttään *candidate_id*. Valitse tarkistuspaketti (esim. `tasker_standard` tai mikä tahansa tilisi tarjoama paketti).
6. (Valinnainen) **Toiminto**: Slack: ilmoita turvallisen toiminnan koordinaattorille, että tarkistus on aloitettu.

Ota skenaario käyttöön. Kohderyhmän uudet vapaaehtoiset saavat automaattisen Checkr-kutsun sähköpostiinsa. He täyttävät sen puhelimellaan tai kannettavalla tietokoneellaan, ja Checkr suorittaa tarkistuksen.

### 3. (Valinnainen) Vastaanota raportti takaisin

1. **Laukaisin**: Checkr: Watch Events (webhook). Make rekisteröi Checkr-webhookin skenaarion aktivoitaessa.
2. **Suodatin**: jatka vain, jos `event_type = report.completed`.
3. **Toiminto**: Checkr: Get Report (käytä webhookista saatua raportin tunnistetta).
4. **Toiminto**: B1.church: Find Person (ehdokkaan sähköpostiosoitteen perusteella).
5. **Ehdollinen toiminto**: Slack- tai sähköposti-ilmoitus koordinaattorille tilalla `clear`, `consider` tai `suspended`.

Huomio: B1:ssä ei tällä hetkellä ole sisäänrakennettua ”taustatarkistuksen tila” -kenttää. Käytännölliset vaihtoehdot ovat (a) lähettää tulos yksityiseen Slack-kanavaan tarkastettavaksi, (b) kirjoittaa se Google Sheetiin tarkastusta varten tai (c) lisätä henkilö B1-ryhmään ”Cleared volunteers” tilalla `clear`.

## Yleisiä ohjeita

### Tarkista vapaaehtoiset uudelleen 2 vuoden välein

Yhdistä yllä oleva ohje Make-aikataululaukaisimeen:

- **Laukaisin**: Make: Schedule (kuukausittain)
- **Toiminto**: B1.church: List Group Members ryhmälle ”Cleared volunteers”
- **Toiminto**: Suodatin Makessa: hyväksymispäivä on yli 22 kuukautta vanha
- **Toiminto**: Checkr: Create Background Check Invitation (sama kuin alkuperäisessä kulussa)

### Estä pääsy vaiheeseen 1, kunnes tarkistus on valmis

Jos seurakuntasi käyttää B1-ryhmäjäsenyyttä pääsyn rajoittamiseen (esim. palvelusaikatauluissa näkyvät vain ryhmän ”Cleared” jäsenet), pidä uudet vapaaehtoiset väliaikaisessa ryhmässä, kunnes Checkrin tapahtuma `report.completed` muuttaa heidän tilansa.

## Rajoitukset ja huomiot

- **Checkr toimii pääosin vain Yhdysvalloissa**, sillä useimmat tarkistuspaketit ovat vain USA:n markkinoille. Australialaisten, brittiläisten ja kanadalaisten seurakuntien on käytettävä jotakin muuta palvelua.
- **Hinnoittelu** perustuu tarkistuksiin. Jokainen Create Invitation -toiminto Makessa käyttää todellisen tarkistuksen. Testaa ensin Checkrin hiekkalaatikko- tai testitilillä. Make-sovelluksen Checkr-yhteys käyttää yhteydessä annettuja tunnuksia, joten tunnusten vaihtaminen vaihtaa hiekkalaatikon ja tuotantoympäristön välillä.
- **Checkrin API-käyttö riippuu tilauksesta.** Pienemmillä Checkr-tileillä voi olla vain käyttöliittymä. Ota yhteyttä Checkriin, jos haluat ottaa API-käytön käyttöön.

## Vianmääritys

- **Create Candidate epäonnistuu virheellä `403`**: Checkr-API-tunnus on vain luku -tilassa tai sillä ei ole tarvittavia tilioikeuksia. Luo tunnus uudelleen Checkr-hallintapaneelista kirjoitusoikeudella.
- **Kutsu ei koskaan saavu**: tarkista ehdokkaan sähköpostiosoite vaiheessa 3. B1:ssä voi olla tyhjä sähköpostikenttä kyseiselle henkilölle. Lisää sähköpostia vaativa suodatin ennen Checkr-vaihetta.
- **Webhook-laukaisin ei käynnisty**: Checkrin webhook-rekisteröinti voi joskus epäonnistua hiljaa, jos Make-tilisi ei ole maksullisella tasolla, joka tukee lähteviä webhookeja. Tarkista Checkrin hallintapaneelin *Webhooks*-sivulta, että Maken osoite on listalla.

## Katso myös

- [Make (yleiskatsaus)](../make.md): B1:n puoli jokaisesta Make-skenaariosta
- [Mobile Message](./mobile-message.md): SMS-palveluntarjoajille, joilla ei ole Zapier-sovellusta. Käyttää samaa Webhooks- ja HTTP-kaavaa kuin Checkrin Make-yhteys.
- [Checkr API -dokumentaatio](https://docs.checkr.com/)
