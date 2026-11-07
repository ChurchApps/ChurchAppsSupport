---
title: "Tapahtumamuistutukset"
description: "Määritä B1 Adminissa tapahtumamuistutukset push-, sähköposti- ja tekstiviestinä. Valitse ajoitus, vastaanottajat ja oma viesti."
---

# Tapahtumamuistutukset

<div class="article-intro">

Tapahtumamuistutukset ilmoittavat automaattisesti oikeille henkilöille ennen tapahtumaa -- esimerkiksi: "Älä missaa! Terveydenhuollon työpaja alkaa huomenna klo 9.00." Määrität muistutuksen kerran tapahtumalle, ja B1 lähettää sen ajoitetusti push-ilmoituksena, sähköpostitse ja, jos seurakunnassasi on tekstiviestipalvelu käytössä, tekstiviestinä. Jäsenet voivat hallita, mitä muistutuksia he saavat, omista [Ilmoitusasetuksistaan](../../b1-church/getting-started/notification-preferences.md).

</div>

<div class="prereqs">
<h4>Ennen aloittamista</h4>

- Luo tapahtuma, josta haluat muistuttaa (katso [Kalenterien luominen](./creating-calendars.md))
- Jotta voit tavoittaa ilmoittautuneet osallistujat, [ota ilmoittautuminen käyttöön](./creating-calendars.md) tapahtumalle
- Jotta voit tavoittaa koko ryhmän, varmista, että tapahtuma kuuluu [ryhmään](../groups/creating-groups.md), jossa on jäseniä

</div>

## Muistutuksen asettaminen

Muistutuksia määritetään tapahtuman **Muistutukset**-osiossa.

- Kun **luot uuden tapahtuman**, laajenna **Muistutukset**-osio tapahtumaeditorissa ennen tallentamista.
- Olemassa olevalle tapahtumalle avaa tapahtuman **Ilmoittautumistiedot**-sivu (**Ilmoittautumiset**-osiosta), jotta voit lisätä tai muuttaa sen muistutusta.

1. Ota **Ota muistutukset käyttöön** käyttöön.
2. Valitse **Milloin** lähetetään. Valitse enintään kolme ajankohtaa: **7 päivää ennen**, **3 päivää ennen**, **1 päivä ennen** ja **Tapahtumapäivänä**.
3. Aseta **Kellonaika**, jolloin muistutus lähetetään (oletus on **9.00**, seurakuntasi [aikavyöhykkeellä](../settings/church-settings.md#time-zone)).
4. Valitse, **ketä** muistutetaan (katso alla [Ketä muistutetaan](#who-gets-reminded)).
5. Lisää halutessasi **Viesti**. Jätä kenttä tyhjäksi, jos haluat oletussanamuodon, tai kirjoita oma viesti -- voit sisällyttää siihen `{{eventTitle}}`-kohdan, ja se korvataan tapahtuman nimellä.
6. Valitse **Kanavat**: **Push-ilmoitus**, **Sähköposti** ja, jos seurakunnallasi on [tekstiviestipalveluntarjoaja](../settings/church-settings.md#texting) yhdistettynä, **Tekstiviesti**.
7. Tallenna tapahtuma.

Muutosten aikana **live-esikatselu** näyttää suurin piirtein, kuinka monta henkilöä muistutetaan, kuinka monta osallistujaa ei ole tavoitettavissa ja seuraavat ajoitetut lähetysajat -- jotta voit varmistaa, että muistutus on oikein ennen tallentamista.

## Ketä muistutetaan

**Ketä**-asetus määrittää, kenelle muistutus menee:

- **Vain ilmoittautuneet** -- Kaikki tapahtumaan ilmoittautuneet, jotka on linkitetty henkilötietueeseen. Tämä on oletus, kun tapahtumassa on ilmoittautuminen käytössä, joten pienen ilmoittautumistapahtuman muistutus ei koskaan vahingossa mene koko ryhmälle.
- **Perheenpäät / ilmoittautujat** -- Yksi muistutus per ilmoittautuminen (ilmoittautunut henkilö) sen sijaan, että muistutettaisiin jokaista ilmoittautumiseen kuuluvaa perheenjäsentä.
- **Ryhmän jäsenet** -- Kaikki tapahtuman ryhmän jäsenet. Tämä on oletus, kun tapahtumassa ei käytetä ilmoittautumista.
- **Automaattinen** -- Käyttää ilmoittautuneita, kun ilmoittautuminen on käytössä, muuten ryhmää.

:::info
Pelkällä nimellä lisätyille vieraille (ilman linkitettyä henkilötietuetta) ei voi lähettää muistutusta, koska heillä ei ole tiliä, laitetta eikä sähköpostiosoitetta, johon viesti voitaisiin lähettää. Esikatselu kertoo, kuinka monta osallistujaa kuuluu tähän ryhmään, jotta yllätyksiltä vältytään. Myös jäsenet, jotka ovat kieltäytyneet viestinnästä, ohitetaan.
:::

## Milloin muistutukset lähetetään

- Muistutukset lähtevät **valitsemaasi kellonaikaan** seurakuntasi paikallisella aikavyöhykkeellä jokaisena valitsemanasi ajankohtana.
- Jos **muutat tapahtuman päivämäärää tai kellonaikaa**, odottavat muistutukset ajoitetaan automaattisesti uudelleen -- muistutusta ei tarvitse muokata.
- Jos **poistat tapahtuman** (tai peruutat toistuvan tapahtuman yksittäisen esiintymän), sen odottavat muistutukset peruutetaan automaattisesti.
- Toistuvat tapahtumat käsitellään automaattisesti: jokaiselle tulevalle esiintymälle tehdään oma muistutus.

:::tip
Muistutukset lähetetään **ensisijaisesti push-ilmoituksena, ja sähköposti toimii varakanavana**. Jos jäsenellä on push-ilmoitukset käytössä, hän saa push-ilmoituksen; jos ei, hän saa sen sijaan sähköpostin. Jäsenet valitsevat ilmoitustyypeittäin, mitkä kanavat haluavat, [Ilmoitusasetuksissaan](../../b1-church/getting-started/notification-preferences.md).
:::

## Tekstiviestimuistutukset

**Tekstiviesti**-kanava näkyy vain, kun seurakunnassasi on tekstiviestipalveluntarjoaja yhdistettynä. Tekstiviestit lähetetään seurakuntasi tekstiviestipalveluntarjoajan kautta, ja jokainen viesti voi maksaa seurakunnallesi. Ne lähetetään push- tai sähköpostimuistutuksen lisäksi, ja vain henkilöille, jotka:

- ovat ottaneet **Tekstiviestit** käyttöön [Ilmoitusasetuksissaan](../../b1-church/getting-started/notification-preferences.md), ja
- ovat merkinneet profiiliinsa matkapuhelinnumeron.

Jokainen viesti alkaa seurakuntasi nimellä, pysyy yhdessä tekstiviestissä ja päättyy tekstiin "Vastaa STOP lopettaaksesi." Jokainen, joka vastaa STOP, lopettaa seurakuntasi tekstiviestien vastaanottamisen. Jotta STOP-vastaukset tavoittavat B1:n, liitä **saapuvan (STOP) webhook-URL-osoitteen** [tekstiviestiasetuksistasi](../settings/church-settings.md#texting) palveluntarjoajasi saapuvien viestien webhookiin.

## Mitä jäsenet voivat hallita

Muistutukset noudattavat aina kunkin jäsenen [Ilmoitusasetuksia](../../b1-church/getting-started/notification-preferences.md). Jäsen voi:

- kytkeä **Tapahtumamuistutukset** pois päältä push-, sähköposti- tai tekstiviestikanavalta, pitäen muut ilmoitukset päällä.
- kytkeä tekstiviestimuistutukset päälle tai pois **Tekstiviestit**-asetuksella.
- asettaa **hiljaiset tunnit**, jolloin ei-kiireelliset ilmoitukset odottavat sopivaan aikaan.

Et voi ohittaa jäsenen päätöstä kieltäytyä tapahtumamuistutuksista -- tämä pitää B1:n roskapostisääntöjen mukaisena ja jättää jäsenet hallitsemaan omaa postilaatikkoaan.

## Palvelumuistutukset

Suunnitelmaan merkityt vapaaehtoiset saavat erillisen **palvelumuistutuksen**, jossa on suunnitelman tiedot ja, jos he eivät ole vielä vastanneet, **Hyväksy / Hylkää** -painikkeet suoraan sähköpostissa. Nämä muistutukset määritetään suunnitelmatyypille kalenteritapahtuman sijaan, ja ne voidaan lähettää myös tekstiviestinä. Katso [Vapaaehtoisten muistutukset](../serving/plans.md#volunteer-reminders) ja [Sunnuntain vapaaehtoiset](../guides/sunday-volunteers.md), joista selviää, miten vapaaehtoisten ajoitus ja muistutukset toimivat.

## Seuraavat askeleet

- [Ilmoitusasetukset](../../b1-church/getting-started/notification-preferences.md) -- Mitä jäsenet voivat hallita
- [Tapahtumien ilmoittautumisopas](../guides/event-registration.md) -- Ota ilmoittautuminen käyttöön, jotta muistutukset tavoittavat osallistujat
- [Kalenterien luominen](./creating-calendars.md) -- Palaa kalenterin määritykseen
