---
title: "Näyttöjen ja ryhmien hallinta"
description: "Tarkista FreePlay-TV:iden valmius sunnuntaiksi, muokkaa näyttöasetuksia ja luo ryhmiä, jotka jakavat yhden kalenterin FreePlay Adminissa."
---

# Näyttöjen ja ryhmien hallinta

<div class="article-intro">

Sivu **Näytöt** FreePlay Adminissa listaa kaikki kirkkoosi yhdistetyt TV-laitteet, niiden nykyisen toiston ja sen, ovatko ne valmiina sunnuntaiksi. Hallitset täällä myös **näyttöryhmiä**. Saman ryhmän näytöt jakavat yhden kalenterin ja yhden oletussilmukan.

</div>

<div class="prereqs">
<h4>Ennen aloittamista</h4>

- Kirjaudu FreePlay Adminiin osoitteessa [admin.freeplay.church](https://admin.freeplay.church)
- [Yhdistä vähintään yksi näyttö](./pairing-a-screen.md)

</div>

## Näytöt-sivu

Sivun yläreunassa kolme lukua antaa nopean terveystarkistuksen:

- **Online nyt** - Näytöt, jotka ovat kirjautuneet viimeisen 15 minuutin aikana
- **Valmiina sunnuntaiksi** - Kuinka monta ajastettua näyttöä on ladannut kaiken tähän tulevaan sunnuntaihin asti
- **Vaatii huomiota** - Näytöt, jotka ovat offline-tilassa tai joista puuttuu tiedostoja

Tämän alapuolella käytä hakua **Hae näyttöjä** löytääksesi näytön nimikkeen, ryhmän tai sen, mitä se toistaa. Suodatinpainikkeet rajaavat listan vaihtoehtoihin **Kaikki**, **Ajastetut**, **Manuaaliset**, **Vaatii huomiota** tai yhteen ryhmään. Vaihda näkymien **Taulukko** ja **Ruudukko** välillä oikealla olevasta kytkimestä.

Jokainen näyttö näyttää seuraavat tiedot:

- **Nimike** ja laitemalli
- **Ryhmä**
- **Tila** - **Ajastettu** tai **Manuaalinen**
- **Toistossa nyt** - Mitä ruudulla on juuri nyt. Manuaalisissa näytöissä näkyy **Luokkahuone · opettaja painaa Käynnistä**
- **Valmis asti** - Päivämäärä, johon asti näyttö on ladannut sisältöä. Jos tiedostoja ei ladattu, näkyy sen sijaan **N tiedostoa puuttuu**. Uusi näyttö näyttää **Odotetaan ensimmäistä synkronointia**
- **Viimeksi nähty** - Milloin näyttö viimeksi kirjautui. Näyttö, joka ei ole kirjautunut pitkään aikaan, näyttää **Offline**, ja sellainen, joka ei ole koskaan yhdistynyt, näyttää **Ei koskaan nähty**

Käytä **Esitä**-painiketta toistaaksesi näytön kalenterin selaimessa tai **Muokkaa**-painiketta muuttaaksesi asetuksia.

## Näytön tarkastelu

Napsauta näytön nimikettä avataksesi sen sivun. Vasemmalla:

- **Esitä selaimessa** - Toista tämän näytön kalenteri koko ruudulla selaimessa, samoin kuin se näyttäisi TV:ssä. Katso [Esittäminen selaimesta](./scheduled-playback.md#presenting-from-a-browser)
- **Muokkaa** - Muuta nimikettä, ryhmää tai tilaa
- **Lisää** > **Irrota** - Katkaise yhteys TV:hen. Se palaa näyttämään yhdistämiskoodia

Sivun muut osiot ovat:

- **Nyt ja seuraavaksi** - Mitä toistetaan nyt ja mihin asti, sen jälkeen kaikki seuraavien 7 päivän aikana ajastettu sisältö. Napsauta **Avaa kalenteri** siirtyäksesi tämän ryhmän kalenteriin
- **Lataukset** - **Valmis asti** -päivämäärä, kun kaikki on ladattu, tai luettelo puuttuvista tiedostoista
- **Laite** - Laitteen tunnus, alusta, malli, FreePlay-sovelluksen versio, IP-osoite, käytetty ja vapaa tallennustila, viimeksi nähty ja tila
- **Viimeisimmät** - Viimeisin toiminta, jonka näyttö on raportoinut

:::tip
Jos näyttö näyttää puuttuvia tiedostoja, varmista että se on online-tilassa ja että sillä on vapaata tallennustilaa. TV lataa puuttuvat tiedostot itse seuraavan kerran, kun se kirjautuu.
:::

## Näytön muokkaaminen

1. Napsauta näytön vierestä tai sen sivulta **Muokkaa**.
2. Muuta **Nimike**, **Ryhmä** tai **Tila** (**Ajastettu** tai **Manuaalinen**).
3. Napsauta **Tallenna**.

Näytön siirtäminen toiseen ryhmään vaihtaa sen kyseisen ryhmän kalenteriin.

## Näyttöryhmät

Näyttöryhmä on joukko näyttöjä, jotka toistavat samaa sisältöä samaan aikaan, kuten "Aula" tai "Lastensiipi". Jokaisella ryhmällä on oma kalenteri, ja sillä voi olla **oletussilmukka**, joka toistuu aina, kun mitään ei ole ajastettu.

Ryhmien hallitsemiseksi napsauta **Ryhmät** **Näytöt**-sivun yläreunassa. **Näyttöryhmät**-luettelo näyttää kunkin ryhmän nimen, näyttöjen määrän ja oletussilmukan. Napsauta **Näytöt** palataksesi takaisin.

### Ryhmän lisääminen

1. **Näyttöryhmät**-näkymässä napsauta **Lisää ryhmä**.
2. Kirjoita **Nimi**, esimerkiksi "Aula".
3. Valitse **Oletussilmukka**-soittolista tai jätä asetukseksi **Ei mitään — näyttö pimenee**.
4. Napsauta **Tallenna**.

Voit myös luoda ryhmän yhdistäessäsi näyttöä valitsemalla **＋ Uusi ryhmä…** **Ryhmä**-kentästä.

### Ryhmän muokkaaminen tai poistaminen

1. Napsauta ryhmän vierestä **Muokkaa**.
2. Muuta nimeä tai oletussilmukkaa ja napsauta sitten **Tallenna**.
3. Poistaaksesi ryhmän napsauta **Poista** ja vahvista.

:::warning
Ryhmän poistaminen poistaa myös sen aikataulun. Ryhmän näytöt pimenevät, kunnes siirrät ne toiseen ryhmään.
:::

## Liittyvät artikkelit

- **[Näytön yhdistäminen](./pairing-a-screen.md)** - Lisää uusi TV
- **[Kalenterin ajastaminen](./scheduling-the-calendar.md)** - Määritä, mitä kukin ryhmä toistaa, ja sen oletussilmukka
- **[Ajastettu toisto TV:ssä](./scheduled-playback.md)** - Mitä "Valmis asti" -päivämäärä tarkoittaa itse TV:ssä
