---
title: "Tietojen tuominen"
---

# Tietojen tuominen

<div class="article-intro">

B1-siirtotyökalun avulla voit helposti tuoda olemassa olevat tietosi B1:een, olipa kyse sen aloittamisesta alusta taulukkolaskennasta, siirtymisestä toisesta seurakunnan hallintajärjestelmästä tai lahjoitustietojen tuonnista. Sitä voi käyttää myös tietojesi viemiseen tai varmuuskopiointiin milloin tahansa.

</div>

## Koulutusvideo

<YouTube id="G-VnhzACYIU" title="Ihmisten tietokannan tuominen B1:een" next="Ihmisten hakeminen ja listojen laatiminen B1:ssä" nextUrl="/docs/b1-admin/people/searching-people" />

<div class="prereqs">
<h4>Ennen aloittamista</h4>

- Tarvitset aktiivisen B1 Admin -tilin, jolla on pääsy **Settings**-osioon.
- Vie tietosi edellisestä järjestelmästä ja valmistele ne ennen aloittamista.
- Tämä työkalu on tarkoitettu tietojen alkuperäiseen siirtoon. Jos olet jo käyttänyt B1:tä jonkin aikaa, tietojen uudelleen tuominen voi luoda kaksoiskappaleita tietueista.

</div>

## Siirtotyökalun avaaminen

1. Kirjaudu sisään **B1 Adminiin**.
2. Avaa [Hyppyvalikko](../introduction.md#getting-around-with-the-jump-menu) (hakupalkki vasemmassa yläkulmassa), laajenna **Settings** ja napsauta **Settings**.
3. Napsauta **Import/Export**-linkkiä seurakuntasi nimen alla vasemmanpuoleisen asetusvalikon yläosassa.
4. Tämä avaa **B1 Transfer** -työkalun uudessa välilehdessä osoitteessa [transfer.b1.church](https://transfer.b1.church).

Siirtotyökalu opastaa sinut neljän vaiheen läpi: Source, Preview, Destination ja Run.

---

## Vaihe 1 - Valitse lähde

Valitse, mistä tietosi tulevat. Vaihtoehtoja on seitsemän:

- **B1 Database** — Hakee tiedot suoraan nykyisestä B1-seurakunnastasi. Hyödyllinen varmuuskopion tekemiseen tai tietojen muuntamiseen toiseen muotoon. Tämän vaihtoehdon käyttämiseen on kirjauduttava sisään.
- **B1 Import Zip** — B1:n omassa muodossa oleva zip-tiedosto. Sitä käytetään pääasiassa aiemman B1-viennin palauttamiseen. Kun B1 Export Zip -tiedosto ladataan takaisin **B1 Database** -vaihtoehdon kautta, palautuu kaikki, mitä vienti sisältää (katso [Tietojen vieminen](./exporting-data.md#full-data-export-from-settings)). Jos tiedostoa ei voida lukea, työkalu näyttää virheen eikä aloita alusta.
- **Breeze Import Zip** — Zip-tiedosto, joka sisältää Breeze ChMS:stä viedyt tiedostot.
- **Planning Center Zip** — Planning Centeristä viety zip- tai CSV-tiedosto.
- **Custom CSV / Excel** — Mikä tahansa CSV- tai Excel-tiedosto, joka sisältää henkilötietoja. Tiedoston lataamisen jälkeen sinun on yhdistettävä sarakkeet B1:n kenttiin ennen tuonnin jatkamista.
- **Tithe.ly CSV** — Tithe.lyn henkilö- tai lahjoitustietojen vientitiedosto (CSV- tai Excel-muoto kelpaa).
- **CCB / Pushpay CSV** — Church Community Builderin tai Pushpayn henkilö- tai lahjoitustietojen vienti CSV-muodossa.

Voit vetää tiedoston latausalueelle tai napsauttaa ja selata sitä.

---

## Vaihe 1b - Yhdistä kentät (vain Custom CSV / Excel)

Jos valitsit **Custom CSV / Excel**, tiedoston lataamisen jälkeen työkalu näyttää kenttien yhdistämisnäkymän ennen esikatselua.

Tiedoston jokainen sarake on listattu esimerkkiarvon kanssa. Valitse kullekin sarakkeelle pudotusvalikosta vastaava B1-kenttä. Työkalu tunnistaa automaattisesti yleiset sarakenimet, kuten "First Name", "Email" tai "Zip Code", mutta sinun kannattaa tarkistaa jokainen rivi ja korjata kaikki, mitä työkalu ei tunnistanut.

Käytettävissä olevia B1-kenttiä ovat muun muassa:

- First Name, Last Name, Middle Name, Nickname, Display Name, Title/Prefix, Suffix
- Email, Home Phone, Mobile Phone, Work Phone
- Address Line 1, Address Line 2, City, State, Zip Code
- Birth Date, Anniversary, Gender, Marital Status, Membership Status
- Household/Family Name
- Group Name — lisää henkilön ryhmään nimen perusteella
- **Custom Field (match by name)** — tallentaa sarakkeen yhteen seurakuntasi [mukautetuista henkilökentistä](../settings/custom-fields.md). Ruutu **B1 field name** ilmestyy, ja siihen on täytetty sarakkeen otsikko. Muuta sitä kirjoittamalla kentän nimi täsmälleen niin kuin se näkyy B1:ssä (isot ja pienet kirjaimet eivät ratkaise).
- **Form Answer (custom field)** — tallentaa sarakkeen arvon henkilön tietueeseen liitettynä mukautettuna kenttänä. Jos käytät tätä vaihtoehtoa, sinulta kysytään lomakkeen nimeä.

Päivämäärät voivat olla yleisissä muodoissa, kuten `9/17/1994`, ja ne muunnetaan automaattisesti. Mukautetuissa kentissä kyllä/ei-kentät hyväksyvät arvot, kuten Yes, No, Y, N, True, False, 1 ja 0. Monivalintakentät hyväksyvät joko valinnan tekstin tai sen arvon.

:::info
Luo mukautetut henkilökentät B1 Adminissa ennen tuontia. Kun tuonti on valmis, **Custom Fields** -vaihe listaa sarakenimet, jotka eivät vastaa mitään B1-kenttää, ja laskee arvot, jotka eivät sovi kentän tyyppiin. Nämä arvot ohitetaan, ja muu tuonti valmistuu silti.
:::

Sarakkeet, joita et halua tuoda, voi asettaa valintaan **(Skip)**. Vähintään yksi nimikenttä (First Name tai Last Name) on yhdistettävä, ennen kuin voit jatkaa.

Napsauta **Confirm Mapping & Import** siirtyäksesi esikatseluun.

---

## Vaihe 2 - Tarkista tietosi

Lataamisen jälkeen työkalu näyttää esikatselun kaikesta, mitä tuodaan. Käytä välilehtiä tarkistaaksesi kunkin tietotyypin:

- **People** — Listattu talouksittain, kuvat mukaan lukien, jos niitä on sisällytetty.
- **Groups** — Järjestetty kampuksen, palvelun, ajan ja luokan mukaan.
- **Attendance** — Istuntojen päivämäärät, ryhmät ja käyntimäärät.
- **Donations** — Erät, rahastot, lahjoittajat ja summat.
- **Forms** — Lomakkeiden nimet ja sisältötyypit.

Tarkista tiedot huolellisesti ennen jatkamista. Jos jokin näyttää väärältä, napsauta **Start Over** ja korjaa lähdetiedostosi.

---

## Vaihe 3 - Valitse kohde

Valitse, minne haluat tiedot viedä:

- **B1 Database** — Tuo tiedot suoraan seurakuntasi B1-tietokantaan. Tämän valinnan jälkeen työkalu näyttää lopullisen määrän lisättäviä tietueita. Vahvista napsauttamalla **Start Transfer**.
- **B1 Export Zip** — Lataa tietosi B1-muotoisena zip-tiedostona, joka voidaan palauttaa myöhemmin **B1 Import Zip** -vaihtoehdolla. Hyvä varmuuskopioihin.
- **Breeze Export Zip** — Muuntaa tietosi Breeze-muotoon.
- **Planning Center Zip** — Muuntaa tietosi Planning Center -muotoon.

:::warning
Lähde- ja kohdemuoto eivät voi olla samat. Jos ne ovat samat, työkalu varoittaa, jotta tietoja ei kaksinkertaisteta vahingossa.
:::

---

## Vaihe 4 - Suorita

Työkalu käsittelee siirron ja näyttää edistymisen jokaisen vaiheen osalta:

- Campuses, Services ja Times
- People
- Photos
- Groups ja Group Members
- Donations
- Attendance
- Forms, Questions, Answers ja Form Submissions
- Custom Fields (kun olet yhdistänyt mukautettuja kenttäsarakkeita)
- Compressing (vain zip-tiedostokohteille)

Kun kohteena on **B1 Database**, edistymiskortin otsikko on **Import Progress** ja se päättyy viestiin **Import Complete!** (tai **Import Completed with Errors**). Zip-tiedostokohteille samat viestit sanovat **Export**.

:::info
Kun palautat **B1 Import Zip** -tiedostoa, tietueet, jotka viittaavat johonkin, mitä ei enää ole tiedostossa, ohitetaan eikä tuonti pysähdy. Näitä ovat ryhmäjäsenyydet henkilöille tai ryhmille, joita ei ole zip-tiedostossa, läsnäolo poistetuille ryhmille tai henkilöille sekä linkit ryhmien ja poistettujen palveluaikojen välillä. Läsnäolo-istunnot, joita ei koskaan liitetty palveluaikaan, palautetaan silti. Samoin viennin aikana kuva, jota ei voi ladata tai lukea, jätetään pois, jotta **Photos**-vaihe jatkuu.
:::

:::warning
Älä sulje selainta, kun siirto on käynnissä. Odota, kunnes kaikki vaiheet näkyvät valmiina.
:::

---

## Breeze Import Zip -tiedoston valmistelu

1. Siirry Breezessä kohtaan **Settings** ja napsauta vasemmanpuoleisessa valikossa **Export**.
2. Vie kolme erillistä tiedostoa: **People**, **Tags** ja **Contributions**.
3. Valitse kaikki kolme tiedostoa, napsauta hiiren oikealla painikkeella ja pakkaa ne yhdeksi zip-tiedostoksi.
   - Macilla: valitse tiedostot, napsauta hiiren oikealla painikkeella ja valitse **Compress**.
   - PC:llä: valitse tiedostot, napsauta hiiren oikealla painikkeella, valitse **Send to** ja sitten **Compressed (zipped) folder**.
4. Lataa zip-tiedosto vaiheessa 1 kohdassa **Breeze Import Zip**.

Breeze-tuonti siirtää henkilöt, ryhmät (tagit) ja lahjoitustiedot automaattisesti.

---

## Planning Center -viennin valmistelu

1. Kirjaudu Planning Centeriin ja avaa tuote **People**.
2. Napsauta vasemmanpuoleisessa valikossa **Lists** ja luo lista, joka sisältää kaikki, jotka haluat siirtää. (Jos sinulla on jo lista koko seurakunnastasi, käytä sitä.)
3. Avaa lista ja lataa henkilösi **CSV**-tiedostona käyttämällä sen **export**-vaihtoehtoa. Sisällytä kentät, jotka haluat säilyttää. Nimi, sähköposti, puhelin, osoite, syntymäaika, sukupuoli ja jäsenyyden tila siirtyvät kaikki B1:een.
4. Jos Planning Center antaa useamman kuin yhden tiedoston, valitse ne kaikki, napsauta hiiren oikealla painikkeella ja pakkaa ne yhdeksi zip-tiedostoksi.
   - Macilla: valitse tiedostot, napsauta hiiren oikealla painikkeella ja valitse **Compress**.
   - PC:llä: valitse tiedostot, napsauta hiiren oikealla painikkeella, valitse **Send to** ja sitten **Compressed (zipped) folder**.
5. Lataa CSV- tai zip-tiedosto vaiheessa 1 kohdassa **Planning Center Zip**.

Tiedoston lataamisen jälkeen siirry esikatseluun ja varmista, että henkilösi ja taloutesi näyttävät oikeilta, ennen kuin suoritat tuonnin.

---

## Tithe.ly-viennin valmistelu

1. Vie Tithe.lyssä **People**-tietosi CSV- tai Excel-tiedostona. Voit myös viedä erillisen **Giving**-tiedoston, jos haluat tuoda lahjoitustietueita.
2. Työkalu tunnistaa automaattisesti sarakenimien perusteella, sisältääkö tiedosto henkilö- vai lahjoitustietoja.
3. Lataa tiedosto vaiheessa 1 kohdassa **Tithe.ly CSV**.

:::info
Tithe.lyn vientitiedostot voi tuoda yksi kerrallaan. Suorita prosessi kahdesti, jos haluat tuoda henkilö- ja lahjoitustiedot erikseen.
:::

---

## CCB- tai Pushpay-viennin valmistelu

1. Vie Church Community Builderissa tai Pushpayssa **People**-tietosi CSV-tiedostona. Voit myös viedä erillisen lahjoitus- tai maksutiedoston.
2. Työkalu tunnistaa automaattisesti sarakenimien perusteella, sisältääkö tiedosto henkilö- vai lahjoitustietoja.
3. Lataa tiedosto vaiheessa 1 kohdassa **CCB / Pushpay CSV**.

---

## Tuonnin jälkeen

Kun siirto on valmis, käytä muutama minuutti tietojesi tarkistamiseen:

1. Selaa [People](../people/adding-people.md)-sivua ja tarkista muutama profiili satunnaisesti.
2. Varmista, että nimet, sähköpostiosoitteet, puhelinnumerot ja osoitteet siirtyivät oikein.
3. Tarkista, että taloudet ovat ehjiä. Jokaisen henkilön taloudessa oleva rooli (Head, Spouse, Child tai Other) siirtyy mukana, jos lähteessä on sellainen: **householdRole**-sarake B1 Import Zip -tiedostossa, **Family Role** Breezessä tai Tithe.lyssä ja **Family Position** CCB:ssä tai Pushpayssa. Roolit, kuten "Head of Household", "Primary", "Wife" tai "Son", muunnetaan vastaavaksi B1-rooliksi. Planning Center- ja Custom CSV / Excel -tuonneissa ei ole roolisaraketta, joten nämä henkilöt asetetaan rooliin **Other**. Voit muuttaa roolin henkilön taloudesta [People](../people/adding-people.md#managing-households)-sivulla.
4. Tarkista tuodut ryhmät ja lahjoitustiedot.

Jos huomaat ongelmia, voit muokata yksittäisiä profiileja People-sivulta. Voit myös suorittaa siirtotyökalun uudelleen, jotta [viet tietosi](exporting-data.md) varmuuskopioksi.
