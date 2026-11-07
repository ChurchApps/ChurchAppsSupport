---
title: "Stripe-tuonti"
description: "Tuo Stripe-lahjoitukset B1 Adminiin esikatselun kautta, joka merkitsee veloitukset uusiksi, jo tuoduiksi tai ohitetuiksi ennen tuonnin vahvistamista."
---

# Stripe-tuonti

<div class="article-intro">

Jos vastaanotat verkkolahjoituksia Stripen kautta, Stripe-tuonti -työkalun avulla voit tuoda nämä tapahtumat B1 Adminiin, jolloin kaikki lahjoitustiedot ovat yhdessä paikassa. Tästä on erityisesti hyötyä, kun haluat löytää tapahtumia, joita ei synkronoitu automaattisesti.

</div>

<div class="prereqs">
<h4>Ennen aloittamista</h4>

- Tee [Verkkolahjoitusten asetukset](online-giving-setup.md), jotta yhdistät Stripe-tilisi B1 Adminiin. **Stripe-tuonti** -valikon kohta ja Erät-sivun painike näkyvät vain, kun seurakuntasi lahjoitusyhteyskäytävä on Stripe, ja vain henkilöille, jotka voivat muokata lahjoituksia
- Varmista, että Stripe-kojelaudallasi on lahjoituksia haluamaltasi aikaväliltä

</div>

## Miten se toimii

Tuontiprosessi noudattaa kaksivaiheista työnkulkua: ensin esikatsot, mitä tuodaan, ja sitten vahvistat tuonnin. Tämä koeajotapa antaa sinulle mahdollisuuden tarkistaa kaikki ennen kuin tietueita luodaan.

## Transaktioiden tuominen

1. Siirry **B1 Adminissa** kohtaan **Lahjoitukset > Stripe-tuonti**. (Voit myös napsauttaa **Tuo puuttuvat Stripe-tapahtumat** -linkkiä **Erät**-sivun yläosassa.)
2. **Stripe-tuonti**-sivu avautuu.
3. Valitse tuotavien tapahtumien **aikaväli**.
4. Napsauta **Esikatsele** suorittaaksesi koeajon.

## Esikatselun tarkistaminen

Esikatselussa näkyy jokainen Stripen tapahtuma ja sen tilamerkki:

- **Uusi** -- tapahtumaa ei ole vielä tuotu, ja se sisällytetään, jos jatkat.
- **On jo tuotu** -- tapahtuma on jo B1 Adminissa, ja se ohitetaan.
- **Ohitettu** -- tapahtuma on jätetty pois muusta syystä (esim. hyvitys tai epäonnistunut veloitus).

Sivun yläosan yhteenvetoosiossa näkyy kunkin luokan tapahtumien kokonaismäärä ja niihin liittyvät dollarimäärät.

:::info
Esikatseluvaihe ei luo mitään tietueita. Se on vain lukutila, jonka avulla voit tarkistaa, mitä tapahtuu, ennen kuin vahvistat toiminnon.
:::

## Tuonnin viimeistely

1. Tarkista esikatselun tulokset ja yhteissummat.
2. Napsauta **Tuo puuttuvat** tuodaksesi kaikki **Uusi**-merkityt tapahtumat.
3. Kun tuonti on valmis, kunkin tapahtuman vieressä olevat tilamerkit päivittyvät näyttämään tuloksen.

## Vinkkejä Stripe-tuonnin käyttöön

- Suorita tuonti säännöllisesti (viikoittain tai kuukausittain), jotta tietosi pysyvät ajan tasalla.
- Jos tapahtuma näkyy merkintänä **On jo tuotu**, B1 Adminissa on jo vastaava tietue -- toimenpiteitä ei tarvita.
- Käytä aikavälisuodatinta, jos haluat keskittyä tiettyyn ajanjaksoon, kun etsit tiettyjä tapahtumia.

:::tip
Tuonnin jälkeen siirry [Erät](batches.md)-sivulle varmistaaksesi, että tuodut lahjoitukset näkyvät oikein ja summat vastaavat Stripe-kojelaudallasi näkyviä summia.
:::

## Seuraavat vaiheet

- Tarkista [Lahjoitusraportit](donation-reports.md) ja vertaa tuotuja tapahtumia muihin lahjoitustietoihin
- Varmista, että tuodut lahjoitukset on liitetty oikeisiin [rahastoihin](funds.md), jotta [lahjoitustodistukset](giving-statements.md) ovat oikein
