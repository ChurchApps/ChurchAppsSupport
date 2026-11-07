---
title: "VOMO"
description: "Yhdistä VOMO-vapaaehtoisilmoittautumiset ja kioskikirjautumiset B1 Adminin henkilöihin ja ryhmiin Zapierilla, API-avaimen oikeudet mukaan lukien."
---

# VOMO

<div class="article-intro">

VOMO on vapaaehtoistoiminnan alusta. Ihmiset ilmoittautuvat projekteihin, kirjautuvat sisään kioskilla ja kerryttävät tunteja. Jos käytät VOMOa vapaaehtoisten aikatauluttamiseen mutta B1:tä henkilötietoihin, Zapier voi synkronoida jäsenyydet ja sisäänkirjautumiset näiden välillä, jotta molemmat puolet pysyvät ajan tasalla.

</div>

<div class="prereqs">
<h4>Ennen aloittamista</h4>

- [VOMO](https://vomo.org)-tili tilauksella, jossa Zapier on käytössä (kysy VOMOn tuesta, jos et ole varma)
- [Zapier](https://zapier.com)-tili
- B1Admin-käyttäjä, jolla on **Muokkaa asetuksia** -oikeus

</div>

## Mitä voit yhdistää

VOMOn Zapier-sovellus tarjoaa neljä välitöntä laukaisinta ja neljä toimintoa. Yleisimmät reseptit, joita kirkot haluavat:

| Suunta | Laukaisin | Toiminto |
|---|---|---|
| VOMO → B1 | VOMO Membership (luotu) | B1: Find Person → Create Person (jos henkilö on uusi) |
| VOMO → B1 | VOMO-kioskin sisäänkirjautuminen | B1: Add Group Member ryhmään ”Currently Serving” tai kirjaus läsnäoloksi |
| B1 → VOMO | B1 `person.created` | VOMO: Find Organizer (sähköpostilla); muuten mukautettu vaihe |
| Kumpi tahansa | VOMO Participation (ilmoittautumiset) | B1: Add Group Member projektikohtaiseen ryhmään |

VOMOn toiminnot rajoittuvat **projektiluonnosten luomiseen** ja olemassa olevien organisoijien ja projektien **etsimiseen**. Tällä hetkellä ei ole toimintoa, jolla henkilö lisätään VOMO-projektiin. Mielenkiintoisin yhdistäminen tapahtuu pääosin VOMO → B1 -suunnassa.

## Asennus

### 1. Luo B1-API-avain

**Asetukset → Kehittäjä → API-avaimet → Uusi API-avain**. Oikeudet:

- `people:read`, `people:write`: vapaaehtoisten etsimiseen ja luomiseen B1-henkilöinä
- `groups:write`: lisäämään heidät palveluryhmiin
- (Valinnainen) `attendance:write`, jos käsittelet kioskin sisäänkirjautumisia läsnäolona

### 2. Rakenna jäsenyyksien synkronointi-Zap

1. **Laukaisin**: VOMO: Membership (tapahtuma = `created`).
2. **Toiminto**: B1.church: Find Person, sovitettuna sähköpostilla.
3. **Suodatin / polku**: haarautuu sen mukaan, löytyikö henkilö:
   - Ei löytynyt → B1.church: Create Person, minkä jälkeen Add Group Member sopivaan vapaaehtoisryhmään.
   - Löytyi → B1.church: Add Group Member suoraan.
4. Ota käyttöön. Uudet VOMO-vapaaehtoiset näkyvät nyt B1:ssä oikealla ryhmäjäsenyydellä.

### 3. (Valinnainen) Rakenna kioskin sisäänkirjautumis-Zap

1. **Laukaisin**: VOMO: Kiosk
2. **Toiminto**: B1.church: Find Person (sähköpostilla)
3. **Toiminto**, valitse yksi:
   - *Jos käsittelet sisäänkirjautumiset läsnäolona*: Webhooks by Zapier POST -pyyntö B1:n `/attendance/visits`-päätepisteeseen (B1:n Zapier-sovelluksessa ei vielä ole omaa *Record Attendance* -toimintoa). B1:n [API-avain](/docs/developer/api/api-keys) lisätään otsikkoon `Authorization: Bearer cak_…`.
   - *Jos käsittelet sisäänkirjautumiset ryhmäjäsenyytenä*: B1.church: Add Group Member ryhmään ”Currently Serving (Today)”, ja myöhemmin päivällä toinen Zap poistaa heidät ajastetulla siivouksella.

## Yleisiä reseptejä

### Projektikohtainen ryhmäsynkronointi

- **Laukaisin**: VOMO: Participation (created)
- **Toiminto**: Suodata Zapierissa projektin tunnuksen mukaan, minkä jälkeen
- **Toiminto**: B1.church: Add Group Member B1-ryhmään, jonka nimi vastaa VOMO-projektia.

Kun VOMO-projekti päättyy, tyhjennä B1-ryhmä manuaalisesti tai yhdistä tämä *Participation deleted* -laukaisimeen, joka poistaa jäsenet.

### Lähetä ”kiitos ilmoittautumisesta” -tekstiviesti

Ketjuta VOMO Participation → Clearstream Send Text tai Text In Church Send Message samassa Zapissa. Molemmilla on omat ensiluokkaiset Zapier-toimintonsa. Katso [Clearstream](./clearstream.md) ja [Text In Church](./text-in-church.md).

### Tunnista poisjääminen

Aja päivittäinen Zapier *Schedule* -laukaisin, joka kutsuu VOMOssa Find Organizer -toimintoa niille B1-henkilöille, jotka liittyivät palvelutiimiin tässä kuussa. Jos VOMO palauttaa ”not found”, he eivät ole aktivoineet VOMOa, ja heille kannattaa lähettää muistutus.

## Rajoitukset ja huomiot

- **Sähköposti on yhdistävä tunniste.** VOMOn tiedot sisältävät käyttäjän sähköpostin, mutta eivät B1:n henkilötunnusta. Lahjoittajat, jotka käyttävät eri sähköposteja kummassakin järjestelmässä, luovat kaksoiskappaleita.
- **Ei ”Add to Project” -toimintoa VOMOn Zapier-sovelluksessa.** Jos tarvitset B1 → VOMO -projektiilmoittautumisen, lähetä POST-pyyntö VOMOn REST-rajapintaan vaiheesta *Webhooks by Zapier*. Tämä on mukautettu integraatio.
- **VOMOn ilmaisilla tai alemmilla tasoilla ei välttämättä ole Zapieria.** Varmista VOMOn tuesta ennen kuin lupaat yhdistämisen aikataulun.

## Vianmääritys

- **Laukaisin ei koskaan käynnisty**: VOMOn välittömät laukaisimet vaativat, että API-tunnus pysyy voimassa. Testaa Zap uudelleen ja yhdistä VOMO uudelleen, jos tunnus on vaihdettu.
- **B1 *Add Group Member* epäonnistuu virheellä 422**: toiminnossa käytetty ryhmätunnus ei ole olemassa. Avaa **B1Admin → Groups**, valitse ryhmä ja kopioi URL-osoitteen tunnusosa Zap-vaiheeseen.
- **Yksi VOMO-vapaaehtoinen luo kaksoiskappaleita B1:ssä**: he ovat todennäköisesti ilmoittautuneet eri sähköpostilla kuin mikä heillä jo oli B1:ssä. Joko yhtenäistä sähköpostit tai lisää Zapier *Path*, joka etsii myös puhelinnumeron perusteella ennen luomista.

## Katso myös

- [Zapier (yleiskatsaus)](../zapier.md): B1:n puoli jokaisesta Zapier-reseptistä
- [Clearstream](./clearstream.md), [Text In Church](./text-in-church.md): yhdistä vapaaehtoisten ilmoittautumiset tekstiviestivahvistuksiin
- [Webhookit (kehittäjän viiteohje)](/docs/developer/api/webhooks): tapahtumat, joilla VOMO voi käynnistyä
