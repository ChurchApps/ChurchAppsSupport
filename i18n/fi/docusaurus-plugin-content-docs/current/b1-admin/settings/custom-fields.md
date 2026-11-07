---
title: "Mukautetut kentät"
description: "Määritä B1 Adminissa omia kenttiä henkilötietoihin, kuten taustatarkistuksen vanhenemispäivä tai paitakoko, ja hae ja suodata niiden perusteella."
---

# Mukautetut kentät

<div class="article-intro">

**Mukautetut kentät** antavat sinun seurata omia tietojasi jokaisella henkilötietueella. Voit esimerkiksi seurata taustatarkistuksen vanhenemispäivää, t-paidan kokoa tai kastekoulun tilaa, koska B1:ssä ei ole niille valmista kenttää. Määrität kentän kerran asetuksissa, täytät sitten arvon kunkin henkilön profiiliin ja voit hakea tai luoda listoja sen perusteella. Tämä korvaa vanhan tavan, jossa luotiin Henkilölomake pelkän mukautetun tiedon tallentamiseksi.

</div>

## Koulutusvideo

<YouTube id="yUfDEbp2HQ4" title="Mukautetut kentät, massamuokkaus ja vienti B1:ssä" next="Ryhmien luominen ja jäsenten lisääminen B1:ssä" nextUrl="/docs/b1-admin/groups/creating-groups" />

<div class="prereqs">
<h4>Ennen aloittamista</h4>

- Tarvitset **People**-muokkausoikeuden kenttien määrittämiseen ja arvojen täyttämiseen sekä pääsyn **Settings**-alueelle. Kuka tahansa, jolla on People-katseluoikeus, näkee arvot. Katso [Roolit ja käyttöoikeudet](./roles-permissions.md).
- Päätä ennen aloittamista, mitä haluat seurata ja mikä tyyppi sopii parhaiten (teksti, numero, päivämäärä, kyllä/ei-vastaus vai valintalista).

</div>

## Mukautettujen kenttien avaaminen

Avaa B1 Adminissa [Hyppyvalikko](../introduction.md#getting-around-with-the-jump-menu) (hakupalkki vasemmassa yläkulmassa), valitse **Settings > Settings** ja napsauta vasemmalla olevasta luettelosta **Custom Fields**. Näin siirryt **Custom Fields** -osioon. Pääset siihen myös suoraan osoitteessa **/settings/custom-fields**. Näet luettelon kaikista määrittämistäsi kentistä, ja siinä näkyvät **Name** ja **Field Type**. Jos et ole vielä luonut yhtään kenttää, paneelissa lukee *"No custom fields have been added yet."*

## Kentän lisääminen

1. Napsauta **Add Field**.
2. Kirjoita oikealle aukeavaan editoriin **Name**. Tämä on nimi, jonka henkilömuodostajat näkevät henkilöprofiileissa ja haussa (esimerkiksi *Background check expires*).
3. Valitse **Field Type**:
   - **Textbox**: vapaamuotoinen lyhyt teksti.
   - **Whole Number**: kokonaisluvut ilman desimaaleja (esimerkiksi lukumäärä).
   - **Decimal**: luvut, joissa voi olla desimaaleja.
   - **Date**: kalenteripäivämäärä.
   - **Yes/No**: yksinkertainen kyllä- tai ei-vastaus.
   - **Multiple Choice**: valintalista. Kun valitset tämän tyypin, avautuu **choices editor**, jolla lisäät jokaisen vaihtoehdon, jonka ihmiset voivat valita.
4. Napsauta **Save**.

Kenttä on nyt käytettävissä jokaisen henkilön profiilissa.

:::info
Kenttätyypit ovat samat kuin [lomakkeen kysymyksissä](../forms/creating-forms.md), joten arvot toimivat B1:ssä yhdenmukaisesti.
:::

## Kentän muokkaaminen

Napsauta mitä tahansa kenttärivia luettelossa avataksesi sen uudelleen editorissa. Muuta nimeä, tyyppiä tai vaihtoehtoja ja napsauta **Save**.

:::warning
Jos muutat jo arvoja sisältävän kentän **Field Type** -tyyppiä (esimerkiksi Textbox-tyypistä Date-tyyppiin), aiemmin syötetyt arvot voivat jäädä muotoon, joka ei enää vastaa uutta tyyppiä. Muuta tyyppejä varoen, kun henkilökunta on jo alkanut täyttää kenttää.
:::

## Kentän poistaminen

Avaa kenttä muokattavaksi ja napsauta **Delete**. Sinua pyydetään vahvistamaan toiminto: *"Are you sure you wish to delete this custom field? Its stored values will also be removed."* Kentän poistaminen poistaa sen pysyvästi **sekä kaikki sille tallennetut arvot** kaikilta henkilöiltä. Tätä ei voi peruuttaa.

## Arvojen täyttäminen henkilölle

Kun vähintään yksi mukautettu kenttä on olemassa, sen arvot näkyvät suoraan kunkin henkilön tietojen yhteydessä. Ne näkyvät yhdessä sisäänrakennettujen tietojen kanssa, ja niitä muokataan samalla lomakkeella, jota käytät muiden henkilötietojen muokkaamiseen. Mitään ylimääräistä ei ilmesty näkyviin ennen kuin olet määrittänyt ensimmäisen kentän.

1. Avaa henkilön tietue kohdasta **People**.
2. Napsauta profiilin vasemmalla puolella, henkilön yhteystietojen alapuolella, painiketta **Edit**.
3. Vieri muokkauslomakkeen alareunassa kohtaan **Custom Fields** ja täytä arvo jokaiselle kentälle. Jokainen kenttä näyttää tyyppiään vastaavan syöttökentän: päivämäärävalitsimen Date-kentille, kyllä/ei-pudotusvalikon Yes/No-kentille, valintalistan Multiple Choice -kentille ja niin edelleen.
4. Napsauta **Save**. Mukautetut kenttien arvot tallentuvat yhdessä henkilön muiden tietojen kanssa.

Profiilissa kaikki kentät, joilla on arvo, näkyvät henkilön yhteystietojen alapuolella muodossa *Kentän nimi: arvo*. Kyllä/ei-vastaukset näkyvät muodossa *Yes* tai *No*, ja Multiple Choice -kentissä näkyy vaihtoehdon nimi. Tyhjät kentät piilotetaan. Jos haluat poistaa arvon, muokkaa henkilöä, tyhjennä kenttä ja tallenna. Tyhjä arvo poistetaan tietueesta eikä sitä tallenneta tyhjänä.

:::tip
Tyypillinen käyttötapaus on vapaaehtoisten turvallisuus: luo **Date**-kenttä nimeltä *Background check expires*, kirjaa jokaisen vapaaehtoisen päivämäärä ja luo sitten [tallennettu lista](../people/lists.md), joka merkitsee ne, joiden päivämäärä on mennyt umpeen.
:::

## Haku ja listojen luominen mukautettujen kenttien perusteella

Mukautettujen kenttien perusteella voi hakea täysin:

1. Avaa **People**-sivulla [Laajennettu haku](../people/searching-people.md).
2. Laajenna **Custom Fields** -luokka.
3. Valitse kenttä, jonka perusteella haluat suodattaa, valitse operaattori ja kirjoita arvo. Tarjolla olevat operaattorit vastaavat kentän tyyppiä:
   - **Textbox**: sisältää, on yhtä kuin, alkaa, päättyy.
   - **Whole Number / Decimal**: on yhtä kuin, suurempi kuin, suurempi tai yhtä suuri kuin, pienempi kuin, pienempi tai yhtä suuri kuin.
   - **Date**: on yhtä kuin, jälkeen (suurempi kuin), ennen (pienempi kuin).
   - **Yes/No**: on yhtä kuin Yes tai No.
   - **Multiple Choice**: on yhtä kuin tai sisältää yhden valinnan.

Voit tallentaa minkä tahansa mukautetun kentän haun [listana](../people/lists.md). Listat ovat reaaliaikaisia kyselyjä, joten lista, joka on luotu ehdolla *Background check expires is before today*, tarkistaa jokaisen henkilön aina, kun avaat sen. Ylläpitoa ei tarvita.

## Mukautetun kentän näyttäminen sarakkeena

Jos haluat nähdä kentän arvot kaikilta kerralla, lisää kenttä **People**-sivun sarakkeeksi. Vaihda **View as** -valinta arvoon **Table**, napsauta sivun yläosassa kuvaketta **Select columns**, siirry **Custom**-välilehdelle ja valitse kenttä. Jokaisen henkilön arvo näkyy omassa sarakkeessaan sisäänrakennettujen sarakkeiden vieressä. Katso [Mukautettujen kenttien näyttäminen sarakkeina](../people/searching-people.md#showing-custom-fields-as-columns).

## Mitä tapahtuu yhdistettäessä

Kun [yhdistät kaksi henkilötietuetta](../people/adding-people.md), mukautettujen kenttien arvot siirtyvät automaattisesti. Säilytettävä henkilö pitää omat arvonsa. Jos kentässä on arvo vain poistettavalla henkilöllä, arvo kopioidaan, joten mitään ei katoa.

## Aiheeseen liittyvät artikkelit

- [Henkilöiden haku](../people/searching-people.md): laajennettu haku, mukaan lukien Custom Fields -luokka, ja mukautettujen kenttien näyttäminen sarakkeina
- [Tallennetut listat](../people/lists.md): tallenna mukautetun kentän haku ja suorita se uudelleen reaaliajassa
- [Roolit ja käyttöoikeudet](./roles-permissions.md): kuka voi määrittää kenttiä ja muokata arvoja
- [Lomakkeiden luominen](../forms/creating-forms.md): monikysymyksiseen tiedonkeruuseen, jossa koko lomake sopii paremmin kuin yksittäiset kentät
