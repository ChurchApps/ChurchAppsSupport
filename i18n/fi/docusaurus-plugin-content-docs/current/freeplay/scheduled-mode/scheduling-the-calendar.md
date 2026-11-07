---
title: "Kalenterin ajastaminen"
description: "Luo viikko- tai kertaluonteinen aikataulu FreePlay Adminin kalenteriin: soittolistat, palvelusuunnitelmat ja kansiot näyttöryhmille, oletuslooppi varalla."
---

# Kalenterin ajastaminen

<div class="article-intro">

FreePlay Adminin **Kalenteri**-sivulla määritetään, mitä kukin näyttöryhmä toistaa ja milloin. Lisää aikataulu soittolistalle, palvelusuunnitelmalle tai palveluntarjoajan kansiolle ja aseta se toistumaan viikoittain tai toistettavaksi kerran. Kun mitään ei ole ajastettu, ryhmän oletussilmukka toistuu.

</div>

<div class="prereqs">
<h4>Ennen aloittamista</h4>

- Luo vähintään yksi näyttöryhmä. Katso [Näyttöjen ja ryhmien hallinta](./managing-screens.md#screen-groups)
- [Rakenna soittolista](./building-playlists.md) tai varmista, että B1 Adminissa on määritetty suunnitelmatyyppi

</div>

## Kalenterin lukeminen

1. Siirry kohtaan **Kalenteri**.
2. Valitse näyttöryhmä sivun yläreunan välilehdiltä. Jokainen välilehti näyttää, kuinka monta aikataulua ryhmällä on.
3. Viikkonäkymä kulkee maanantaista sunnuntaihin klo 6–22. Punainen viiva merkitsee nykyisen ajan.
4. Siirry edelliseen tai seuraavaan viikkoon nuolilla tai palaa tälle viikolle napsauttamalla **Tänään**.

Sivun alaotsikko näyttää kalenterin käyttämän aikavyöhykkeen. Aikataulut noudattavat seurakuntasi aikavyöhykettä, joka asetetaan B1 Adminissa kohdassa [Seurakunnan tiedot](../../b1-admin/settings/church-settings.md#time-zone). Jos seurakunnalle ei ole asetettu aikavyöhykettä, FreePlay käyttää kampuksesi aikavyöhykettä. Kalenteri ja TV:t käyttävät samaa aikavyöhykettä, joten kalenterissa klo 9.00 alkava lohko toistuu näytöllä klo 9.00, vaikka tietokoneesi olisi asetettu toiseen aikavyöhykkeeseen.

Aikataulut on värikoodattu tyypin mukaan. Värien selitykset löytyvät selitteestä:

- **Oletussilmukka** - Viistoraidoitettu tausta, näkyy kaiken takana, kun ryhmällä on oletussilmukka
- **Soittolista**
- **Palvelusuunnitelma**
- **Palveluntarjoajan kansio**

Jokainen lohko näyttää nimensä. Korkeammat lohkot näyttävät myös kellonajat, sen toistuuko aikataulu (**viikoittain** vai **kerran**) ja mitä tapahtuu, kun sisältö päättyy aikaisemmin.

## Oletussilmukan asettaminen

Oletussilmukka toistuu ryhmän näytöillä aina, kun mitään ei ole ajastettu.

1. Napsauta **Kalenteri**-sivulla otsikkorivin painiketta **Oletussilmukka…**. Jos oletussilmukka on jo asetettu, painikkeessa lukee **Oletussilmukka:** ja sen perässä soittolistan nimi.
2. Valitse **Soittolista** tai valitse **Ei mitään — näyttö pimenee**.
3. Napsauta **Tallenna**.

## Aikataulun lisääminen

Uuden aikataulun voi aloittaa kolmella tavalla:

- Napsauta kalenterin tyhjää kohtaa. Lomake avautuu niin, että päivä ja puolen tunnin jakso ovat jo valmiina.
- Napsauta otsikkorivin painiketta **Lisää aikataulu**.
- Valitse **Lisää aikataulu** komentopaletista (**Ctrl+K** tai **⌘K**).

Täytä sitten lomake:

1. **Toista** - Valitse, mitä toistetaan:
   - **Soittolistat** - Mikä tahansa rakentamasi soittolista
   - **Palvelusuunnitelmat** - B1 Adminissa määritetty suunnitelmatyyppi, merkitty **(nykyinen suunnitelma)**. Näyttö toistaa joka viikko kyseisen suunnitelmatyypin nykyisen suunnitelman, mukaan lukien Go-opetussuunnitelman oppitunnit (myös muokatut), jotka käyttävät suunnitelmatyypin palvelutyöhön linkitettyä Go-kirjautumista
   - **Palveluntarjoajan kansio…** - Avaa **Valitse palveluntarjoajan kansio**. Selaa kansioon ja napsauta **Käytä tätä kansiota**. Jos haluat valita myöhemmin toisen kansion, napsauta **Vaihda**
2. **Toistuu** - Valitse viikonpäivät, joina aikataulu toistetaan. Jos haluat yhden päivämäärän, ota käyttöön **Kerran** ja valitse **Päivämäärä**.
3. **Alkaa** ja **Päättyy** - Kellonajat, jolloin aikataulu alkaa ja loppuu.
4. **Jos se päättyy aikaisin** - Mitä tehdään, kun sisältö loppuu ennen päättymisaikaa:
   - **Silmukka päättymisaikaan asti** - Aloittaa alusta. Sopii kylttisilmukoille, ilmoituksille ja laskureille
   - **Opettajan tahdissa** - Diat odottavat opettajan kaukosäädintä. Oppitunti pysyy näkyvissä päättymisajan jälkeen, kunnes viimeinen dia on esitetty
   - **Toista kerran ja palaa sitten oletussilmukkaan**
5. Toistuvissa aikatauluissa aseta **Alkaa** ensimmäiseksi päivämääräksi. Kohdassa **Päättyy** valitse **Ei koskaan** tai valitse **Tiettynä päivänä** ja syötä **Päättymispäivä**.
6. Napsauta **Tallenna**.

:::info
**Opettajan tahdissa** korvasi vanhemman vaihtoehdon "pidä viimeinen dia näkyvissä". Sillä tallennetut aikataulut toistuvat nyt opettajan tahdissa.
:::

## Aikataulun muokkaaminen tai poistaminen

1. Napsauta aikataulun lohkoa kalenterissa.
2. Muuta mitä tahansa kenttää ja napsauta **Tallenna**, tai poista aikataulu napsauttamalla **Poista**.

## Päällekkäiset aikataulut

Jos kaksi aikataulua menee päällekkäin, lomakkeessa näkyy varoitus: **Menee päällekkäin toisen aikataulun kanssa. Myöhemmin alkava voittaa.** Kun myöhempi aikataulu on käynnissä, näytöt toistavat sitä. Kun se päättyy, näytöt palaavat aikaisempaan aikatauluun, jos se on vielä käynnissä.

## Miten näytöt noutavat muutokset

Paritetut näytöt lataavat kaiken seuraavan 7 päivän aikana ajastetun sisällön ja tarkistavat muutokset itsenäisesti. Kalenterin muokkaamisen jälkeen TV:tä ei tarvitse koskea. Nähdäksesi, milloin näytöllä on kaikki tarvittava, katso **Valmis asti** [Näytöt-sivulta](./managing-screens.md).

## Aiheeseen liittyvät artikkelit

- **[Soittolistojen rakentaminen](./building-playlists.md)** - Luo ajastettavat soittolistat
- **[Ajastettu toisto TV:llä](./scheduled-playback.md)** - Miten opettajan tahdissa toistuvat oppitunnit ja kaukosäädin toimivat TV:llä
- **[Näyttöjen ja ryhmien hallinta](./managing-screens.md)** - Lisää ryhmiä ja tarkista kunkin näytön lataukset
- **[Vain osan jokaisesta oppitunnista säilyttäminen](/docs/b1-admin/serving/scheduling-lessons#keeping-only-part-of-every-lesson)** - Rajaa jokainen ajastettu oppitunti suunnitelmatyypissä niihin osiin, jotka huoneesi toistaa
