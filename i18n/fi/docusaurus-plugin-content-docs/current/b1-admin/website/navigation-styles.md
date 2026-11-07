---
title: "Navigointityylit"
description: "Mukauta kiinteiden ja läpinäkyvien verkkosivun navigointipalkkien värit B1 Adminissa, myös linkkien, kohdistuksen ja aktiivisen tilan värit."
---

# Navigointityylit

<div class="article-intro">

Muokkaa seurakuntasi verkkosivuston navigointipalkin värejä brändisi mukaisiksi. Voit määrittää värit sekä yhtenäiselle taustalle että läpinäkyvälle peittokerrokselle, jolloin hallitset täysin sitä, miltä navigointi näyttää eri sivuilla.

</div>

<div class="prereqs">
<h4>Ennen aloittamista</h4>

- Tarvitset luvan seurakuntasi verkkosivuston hallintaan. Lisätietoja on kohdassa [Roolit ja oikeudet](../people/roles-permissions.md).
- Valmistele brändisi värit, mukaan lukien heksadesimaaliset värikoodit (esim. #03A9F4).
- Ymmärrä ero yhtenäisen ja läpinäkyvän navigointityylin välillä verkkosivustollasi.

</div>

## Navigointitilojen ymmärtäminen

Verkkosivustosi navigointi voi näkyä kahdella eri tyylillä sivusta riippuen:

- **Yhtenäinen navigointi** -- Navigointipalkki, jossa on taustaväri. Käytetään tyypillisesti sisältösivuilla.
- **Läpinäkyvä navigointi** -- Navigointi, joka peittää sivun sisällön. Käytetään tyypillisesti sivuilla, joilla on kuvia koko sivun kokoisena tai koko ruudun taustoja.

Voit muokata molempien tilojen värejä itsenäisesti.

## Navigointityylien avaaminen

1. Avaa B1 Adminissa [Hyppyvalikko](../introduction.md#getting-around-with-the-jump-menu) (hakupalkki vasemmassa yläkulmassa) ja laajenna kohta **Verkkosivusto**
2. Napsauta **Ulkoasu**
3. Napsauta **Tyyliasetukset**-luettelossa **Navigointi**

**Navigoinnin tyylittely** -editorissa on kaksi korttia: **Ylätunniste (yhtenäinen)** ja **Ylätunniste sankarikuvan päällä (läpinäkyvä)**.

## Yhtenäisen navigoinnin määrittäminen

Yhtenäinen navigointi näkyy taustavärillä navigointipalkin takana. Nämä asetukset ovat **Ylätunniste (yhtenäinen)** -kortilla. Voit muokata seuraavia:

### Taustaväri

1. Käännä **Ohita**-kytkin kohdalle **Taustaväri**
2. Napsauta värinvalitsinta
3. Valitse haluamasi taustaväri
4. Oletusväri on valkoinen (#FFFFFF)

### Linkkien väri

1. Käännä **Ohita**-kytkin kohdalle **Linkin väri**
2. Valitse navigointilinkkien tekstin väri
3. Tämä vaikuttaa linkkeihin niiden oletustilassa
4. Oletusväri on tumman harmaa (#555555)

### Linkin kohdistuksen väri

1. Käännä **Ohita**-kytkin kohdalle **Linkin kohdistuksen väri**
2. Valitse väri, johon linkit vaihtuvat, kun käyttäjä vie hiiren niiden päälle
3. Tämä antaa visuaalista palautetta klikattavista linkeistä
4. Oletusväri on vaaleansininen (#03A9F4)

### Aktiivinen väri

1. Käännä **Ohita**-kytkin kohdalle **Aktiivisen linkin väri**
2. Valitse väri nykyisen sivun linkille
3. Tämä auttaa käyttäjiä tietämään, millä sivulla he ovat
4. Oletusväri on vaaleansininen (#03A9F4)

## Läpinäkyvän navigoinnin määrittäminen

Läpinäkyvä navigointi peittää sivun sisällön ilman taustaa. Nämä asetukset ovat **Ylätunniste sankarikuvan päällä (läpinäkyvä)** -kortilla. Voit muokata seuraavia:

### Linkkien väri

1. Käännä **Ohita**-kytkin kohdalle **Linkin väri**
2. Valitse väri, joka erottuu hyvin sivun taustasta
3. Vaaleat värit toimivat usein parhaiten tummien taustojen päällä
4. Oletusväri on tumman harmaa (#555555)

### Linkin kohdistuksen väri

1. Käännä **Ohita**-kytkin kohdalle **Linkin kohdistuksen väri**
2. Valitse kohdistustilan väri
3. Varmista, että väri näkyy sivun taustaa vasten
4. Oletusväri on vaaleansininen (#03A9F4)

### Aktiivinen väri

1. Käännä **Ohita**-kytkin kohdalle **Aktiivisen linkin väri**
2. Valitse aktiivisen sivun osoittimen väri
3. Sen pitäisi erottua, mutta sopia silti ulkoasuun
4. Oletusväri on vaaleansininen (#03A9F4)

:::info
Läpinäkyvällä navigoinnilla ei ole taustavärin asetusta, koska se peittää sivun sisällön suoraan.
:::

## Muutosten tallentaminen

1. Kun olet määrittänyt värit, napsauta **Tallenna navigointi**
2. Muutokset tulevat heti voimaan julkaistulla verkkosivustollasi
3. Tarkista navigointi molemmissa tiloissa käymällä verkkosivustollasi

## Palauttaminen oletusasetuksiin

Jos haluat palata oletusväreihin:

1. Poista mukautettujen värien **Ohita**-kytkimet käytöstä
2. Napsauta **Tallenna navigointi**
3. Navigointi palautuu oletusvärimalliin

Voit myös napsauttaa **Peruuta**, jolloin kaikki muutokset hylätään tallentamatta niitä.

## Parhaat käytännöt

### Värikontrasti

- **Luettavuus** -- Varmista, että linkkien väreillä on riittävä kontrasti taustaa vasten
- **WCAG-yhteensopivuus** -- Pyri vähintään 4,5:1 kontrastisuhteeseen saavutettavuuden takaamiseksi
- **Testaa molemmat tilat** -- Esikatsele sivustoasi sekä yhtenäisellä että läpinäkyvällä navigoinnilla

### Brändin johdonmukaisuus

- **Käytä brändisi värejä** -- Sovita värit logoosi ja verkkosivuston teemaan
- **Rajoita väripaletti** -- Pysy 2-3 värissä yhtenäisen ilmeen säilyttämiseksi
- **Huomioi kuvasi** -- Jos käytät läpinäkyvää navigointia, testaa sitä tyypillisiä sivun taustoja vasten

### Kohdistus- ja aktiivitilat

- **Selkeä palaute** -- Tee kohdistustilasta selvästi erilainen kuin tavallisista linkeistä
- **Erota aktiiviset sivut** -- Käytä selvästi erottuvaa väriä, jotta käyttäjät tietävät, missä he ovat
- **Sujuvat siirtymät** -- Järjestelmä animoi värimuutokset automaattisesti

## Vianmääritys

### Värit eivät näytä oikeilta

- **Tyhjennä välimuisti** -- Selaimen välimuisti voi näyttää vanhat värit
- **Tarkista heksadesimaalikoodit** -- Varmista, että syötit kelvolliset heksadesimaaliset värikoodit
- **Testaa eri taustoilla** -- Värit voivat näyttää erilaisilta sivusta riippuen

### Navigointi ei näy

- **Läpinäkyvä tila** -- Jos käytät läpinäkyvää navigointia vaaleiden kuvien päällä, tumma teksti voi olla vaikea erottaa
- **Ratkaisu** -- Säädä linkkien värejä tai käytä tummempia sivun taustoja
- **Vaihtoehto** -- Lisää navigointialueelle hienovarainen varjo tai taustapeite

## Tekniset tiedot

Navigointityylit tallennetaan JSON-muodossa ja sovelletaan CSS-muuttujien avulla:

- Muutokset tulevat voimaan heti ilman sivuston uudelleenrakentamista
- Värit periytyvät kaikille navigointielementeille
- Ohitukset ovat valinnaisia; asettamattomat värit käyttävät teeman oletusarvoja

## Aiheeseen liittyvät artikkelit

- [Ulkoasu](./appearance.md) -- Mukauta verkkosivustosi yleistä ilmettä
- [Sivujen hallinta](./managing-pages.md) -- Luo ja järjestä verkkosivujesi sivuja
- [Sivueditori](./page-editor.md) -- Suunnittele sivujen asettelu ja sisältö
