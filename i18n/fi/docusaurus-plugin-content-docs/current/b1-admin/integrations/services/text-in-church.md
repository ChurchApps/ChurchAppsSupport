---
title: "Text In Church"
description: "Yhdistä B1 Admin ja Text In Church Zapierilla: luo API-avain, rakenna yhteyskorttien B1-Zap ja peilaa ryhmäjäsenyydet."
---

# Text In Church

<div class="article-intro">

[Text In Church](https://textinchurch.com) yhdistää tekstiviestit, drip-työnkulut ja yhteystietokorttien automaatiot. Sen Zapier-sovellus tukee molempia suuntia: B1-tapahtumat voidaan ohjata Text In Church -työnkulkuun, ja yhteystietokorttien tai uusien yhteystietojen laukaisimet voidaan siirtää toiseen suuntaan B1:een.

</div>

<div class="prereqs">
<h4>Ennen aloittamista</h4>

- [Text In Church](https://textinchurch.com) -tili, jonka tilaukseen kuuluu Zapier-integraatio
- [Zapier](https://zapier.com) -tili
- B1Admin-käyttäjä, jolla on **Muokkaa asetuksia** -oikeus

</div>

## Mitä voit yhdistää

| Suunta | Laukaisin | Toiminto |
|---|---|---|
| B1 → Text In Church | B1 `person.created` | Luo/päivitä henkilö + lisää ryhmään |
| B1 → Text In Church | B1 `form.submission.created` | Lähetä tekstiviesti asianomaisen tiimin kautta |
| B1 → Text In Church | B1 `group.member.added` | Lisää ryhmään (peilaa ryhmän jäsenyys) |
| Text In Church → B1 | Connect Card Submitted | B1: Luo henkilö + lisää ryhmän jäsen |
| Text In Church → B1 | Person Created | B1: Luo henkilö |
| Text In Church → B1 | Person Joined Group | B1: Lisää ryhmän jäsen |

Text In Church -toimintoihin kuuluvat myös *Lähetä tekstiviesti*, *Lähetä äänilähetys*, *Luo tehtävä*, *Etsi henkilö/ryhmä* sekä ryhmäjäsenyyden lisäys ja poisto.

## Asennus

### 1. Luo B1 API -avain

**Asetukset → Kehittäjä → API-avaimet → Uusi API-avain**:

- `settings:write` — vaaditaan B1:stä käynnistettäville Zapeille
- `people:read`, `people:write` — henkilön etsimiseen tai luomiseen
- `groups:write` — ryhmien synkronointiin
- (Valinnainen) `donations:write`, jos haluat yhdistää lahjavahvistukset TIC:iin

### 2. Yhdistä Text In Church Zapieriin

Seuraa [Text In Churchin Zapier-integraation ohjetta](https://help.textinchurch.com/en/articles/3943363-text-in-church-s-zapier-integration). Ohjeen mukaan API-tunnus luodaan TIC-hallintapaneelissa.

### 3. Rakenna yhteystietokortista B1:een -Zap

Tämä on yleisin suunta. TIC:stä lähetetyistä yhteystietokorteista luodaan automaattisesti uusia henkilöitä B1:een.

1. **Laukaisin** — Text In Church: Connect Card Submitted.
2. **Toiminto** — B1.church: Etsi henkilö (sähköpostin perusteella).
3. **Haara** — haarauta löytyneen tai ei löytyneen mukaan:
   - Ei löytynyt → B1.church: Luo henkilö.
   - Löytyi → jatka.
4. **Toiminto** — B1.church: Lisää ryhmän jäsen ryhmään "New Contact".

Ota Zap käyttöön. Seuraava TIC:n kautta lähetetty yhteystietokortti päätyy automaattisesti kohtaan **B1Admin → Henkilöt**.

## Yleisiä reseptejä

### Käynnistä yhteystietokortin kaltainen työnkulku B1-lomakkeesta

- **Laukaisin** — B1.church: Uusi lomakkeen lähetys (suodatettuna lomakkeen "I'm new here" tunnuksella)
- **Toiminto** — Text In Church: Luo/päivitä henkilö, kohdistaen lomakkeen sähköposti-, puhelin- ja nimivastaukset
- **Toiminto** — Text In Church: Lisää ryhmään, jossa on valmiina liitetty tervetulotyönkulku

### Peilaa ryhmän jäsenyys

- **Laukaisin** — B1.church: Uusi ryhmän jäsen, suodatettuna tietyllä `groupId`-tunnuksella
- **Toiminto** — Text In Church: Lisää ryhmään (sama henkilö, peilattu ryhmä). Jos haluat täyden synkronoinnin, yhdistä tähän `group.member.removed`-Zap.

### Hälytä johtaja, kun joku liittyy ryhmään

- **Laukaisin** — B1.church: Uusi ryhmän jäsen
- **Toiminto** — Text In Church: Lähetä tekstiviesti, vastaanottaja = ryhmän johtajan puhelinnumero, viesti = `"{first} {last} liittyi juuri ryhmään {group}"`.

## Rajoitukset ja huomioita

- **TIC:n Zapier-sovellus vaatii tietyn tilaustason.** Jos Zapier-integraatio on harmaana TIC-hallintapaneelissa, ota yhteyttä TIC:n tukeen ja pyydä sen ottamista käyttöön tilauksellesi.
- **Ryhmä-tunnukset ovat TIC:n, eivät B1:n.** Peilatessa tarvitset jonkinlaisen vastaavuustaulukon (Zapierin *Lookup Table* tai kovakoodattu kullekin Zapille erikseen).
- **Tekstiviestin lähetys kuluttaa krediittejä.** Jokainen *Lähetä tekstiviesti* -toimintoa käyttävä Zap kuluttaa TIC:n SMS-kiintiötäsi.

## Vianmääritys

- **Connect Card -laukaisin ei käynnisty** — TIC:ssä täytyy olla Zapier-integraation kytkin päällä. Varmista myös, että testaamasi lomake on määritetty "Connect Card" -lomakkeeksi, ei yleiseksi kyselyksi.
- **Henkilön luonti B1:ssä epäonnistuu virheeseen 401** — API-avain on väärä, peruutettu tai siltä puuttuu `people:write`. Luo uusi avain.
- **B1:ssä on kaksoiskappaleita henkilöistä** — TIC lähettää saman tapahtuman perusteella sekä *Person Created* että *Connect Card Submitted* -ilmoitukset. Valitse yksi lähde totuuden lähteeksi ja lisää toiseen Zapierin Filter-suodatin.

## Katso myös

- [Clearstream](./clearstream.md) — vaihtoehtoinen SMS-alusta, jolla on samankaltainen Zapier-rakenne
- [Zapier (yleiskatsaus)](../zapier.md) — B1-puoli kaikista Zapier-resepteistä
- [Text In Church Zapier -opas](https://help.textinchurch.com/en/articles/3943363-text-in-church-s-zapier-integration) (TIC:n dokumentaatio)
