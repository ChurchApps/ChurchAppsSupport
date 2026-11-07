---
title: "Käyttöpalautukset"
---

# Käyttöpalautukset

<div class="article-intro">

Jokainen seurakuntalainen tarvitsee joka vuosi yhteenvedon verovähennyskelpoisista lahjoituksistaan kirjanpitoonsa. B1 Admin tekee näiden yhteenvetojen luomisesta helppoa kaikille lahjoittajille kerralla, mikä säästää tuntikausia käsityötä.

</div>

<div class="prereqs">
<h4>Ennen aloittamista</h4>

- Varmista, että [rahastosi](funds.md) on merkitty oikein **Verovähennyskelpoiseksi** -- yhteenvetoihin sisällytetään vain verovähennyskelpoisille rahastoille tehdyt lahjoitukset
- Varmista, että kaikki lahjoitukset on [kirjattu](recording-donations.md) ja kaikki verkkotapahtumat on [tuotu Stripestä](stripe-import.md)

</div>

## Käyttöpalautusten avaaminen

1. Avaa **B1 Adminissa** [Jump-valikko](../introduction.md#getting-around-with-the-jump-menu) (hakupalkki yläreunan vasemmassa kulmassa) ja laajenna **Lahjoitukset**.
2. Valitse **Käyttöpalautukset**. Sivu **Erälahjoitusten yhteenvedot** avautuu.

## Yhteenvetojen luominen

1. Valitse paneelissa **Valitse vuosi** avattavasta valikosta **Vuosi**. Voit valita nykyisen vuoden tai jonkin viidestä edellisestä vuodesta.
2. Sivu lataa vain kyseisen vuoden (1. tammikuuta 31. joulukuuta) päivättyjä lahjoituksia, joten se aukeaa nopeasti, vaikka seurakunnallasi olisi useiden vuosien lahjoitushistoria. Kun valitset toisen vuoden, yhteenveto päivittyy kyseisen vuoden lahjoituksilla. Vuoden alla oleva **Yhteenveto**-paneeli näyttää kyseisen vuoden tilastot, muun muassa:
   - **Lahjoittajia yhteensä** -- lahjoittaneiden henkilöiden määrä
   - **Lahjoituksia yhteensä** -- yksittäisten lahjoituskirjausten määrä
   - **Summa yhteensä** -- kaikkien lahjoitusten yhteissumma euroina

## Yhteenvetojen lataaminen

Paneeli **Latausvaihtoehdot** tarjoaa kaksi tapaa toimittaa yhteenvedot lahjoittajille:

### Lataa CSV-tiedostoina

Kohdassa **Yksittäiset CSV-tiedostot** napsauta **Lataa ZIP** ladataksesi ZIP-tiedoston, joka sisältää erillisen CSV-tiedoston jokaiselle lahjoittajalle. Tästä on hyötyä, jos haluat lähettää yhteenvedot sähköpostitse yksitellen tai tuoda ne toiseen järjestelmään.

### Tulosta kaikki yhteenvedot

Kohdassa **Tulostettavat yhteenvedot** napsauta **Tulosta kaikki** (painike näyttää yhteenvetojen määrän) avataksesi selaimessa tulostettavan näkymän jokaisen lahjoittajan yhteenvedosta valitulta vuodelta. Sieltä voit lähettää ne tulostimeen selaimen tulostustoiminnolla. Jokainen yhteenveto alkaa uudelta sivulta, joten ne ovat valmiita taitettaviksi ja postitettaviksi, ja ne on järjestetty lahjoittajan sukunimen ja etunimen mukaan.

Jos olet ladannut **Vaalean taustan logon** kohdassa [Verkkosivusto > Ulkoasu](../website/appearance.md), se tulostuu keskitettynä jokaisen yhteenvedon yläosaan, yhteenvedon otsikon yläpuolelle. Tämä koskee sekä **Tulosta kaikki** -toimintoa että yksittäisen lahjoittajan yhteenvedon tulostamista hänen tietueestaan.

:::tip
Luo yhteenvedot jo tammikuun alussa, kun kirjaukset ovat vielä tuoreina. Tarkista ennen yhteenvetojen luomista kaksi kertaa, että rahastosi on merkitty oikein verovähennyskelpoisiksi -- yhteenvetoihin sisällytetään vain verovähennyskelpoisille rahastoille tehdyt lahjoitukset.
:::

:::info
Käyttöpalautuksiin sisältyvät vain lahjoitukset, jotka on kohdistettu rahastoille, joissa **Verovähennyskelpoinen** -asetus on käytössä. Jos rahastoa ei ole merkitty verovähennyskelpoiseksi, sen lahjoitukset eivät näy yhteenvedossa. Voit hallita tätä asetusta [Rahastot](funds.md)-sivulla.
:::

## Kuittimuodot Kanadalle, Australialle ja Uudelle-Seelannille

Yhdysvaltojen ulkopuoliset seurakunnat voivat vaihtaa yhteenvedon oman maansa virallisen kuittiasettelun mukaiseksi. Napsauta Käyttöpalautukset-sivun yläreunassa **Yhteenvedon muoto** -painiketta (tai siirry **Asetuksiin** ja avaa **Lahjoitukset**-osio) ja aseta **Yhteenvedon muoto** arvoon **Kanada**, **Australia** tai **Uusi-Seelanti**. Täytä sitten ilmestyvät kentät: rekisterinumerosi (CRA-rekisterinumero, ABN tai Uuden-Seelannin hyväntekeväisyysjärjestön rekisterinumero), organisaatiosi osoite, kuittien allekirjoittamiseen valtuutetun henkilön nimi sekä Kanadan osalta kaupunki, jossa kuitit annetaan.

Yhteenvedot sisältävät tämän jälkeen veroviranomaisen edellyttämät sanamuodot (Kanadan osalta "Official Receipt for Income Tax Purposes" CRA-viitteineen), kuittinumeron muodossa `VUOSI-LAHJOITTAJANTUNNUS`, vain verovähennyskelpoisista rahastoista lasketun hyväksyttävän summan sekä erillisen rivin kaikille lahjoituksille, jotka on tehty ei-verovähennyskelpoisille rahastoille. Lahjoittajat näkevät saman kuittilohkon, kun he tulostavat oman yhteenvetonsa B1.churchistä.

## Mitä jäsenet näkevät B1.churchissä

Sama **Lahjoitukset**-asetusosio ohjaa sitä, mitä jäsenet näkevät omalla lahjoitussivullaan B1.churchissä:

- **Jäsenen lahjoitushistoria** määrittää, mitkä vuodet jäsenet voivat nähdä. Oletus on **Kaikki vuodet**. **Vuoteen 2025 asti** (tai mikä tahansa muu vuosi) rajoittaa näkymän kyseiseen vuoteen, joten jäsenet eivät voi katsoa tai tulostaa myöhempää vuotta, ennen kuin sallit sen. Tämän avulla voit pitää nykyisen vuoden piilossa, kunnes olet viimeistellyt korjaukset ja hyvitykset. **Piilotettu** poistaa lahjoitushistorian, vuosittaiset yhteissummat ja yhteenvetojen tulostamisen kokonaan. Jäsenet voivat silti lahjoittaa.
- **Lahjoitusmuistiinpano** on lyhyt viesti, joka näkyy jäsenen lahjoitussivulla ja lahjoitushistoriassa sekä tulostuu jokaisen lahjoitusyhteenvedon alareunaan, myös täällä tulostettaviin yhteenvetoihin. Käytä sitä esimerkiksi hyvityskäytäntösi kertomiseen.

Nämä asetukset muuttavat ainoastaan sitä, mitä jäsenet näkevät. Voit edelleen tulostaa minkä tahansa vuoden tältä sivulta.

## Seuraavat vaiheet

Jos haluat tarkistaa lahjoitustiedot ennen yhteenvetojen luomista, siirry [Lahjoitusraportit](donation-reports.md)-sivulle tai tarkista yksittäiset [erät](batches.md).
