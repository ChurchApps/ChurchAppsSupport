---
title: "Henkilöiden haku"
description: "Hae henkilöitä B1 Adminissa nimellä, lajittele taulukkonäkymää, rakenna suodattimia Laajennetulla haulla ja vie osumat CSV:nä."
---

# Henkilöiden haku

<div class="article-intro">

**Henkilöt**-sivu näyttää seurakuntasi hakemiston haettavana listana talouksista tai lajiteltavana taulukkona yksittäisistä henkilöistä. Voit löytää nopeasti kenet tahansa seurakuntalaisen, mukauttaa näytettäviä tietoja ja viedä tulokset tiedostoon. Tehokas haku on olennaista päivittäisissä seurakunnan hallintotehtävissä, kuten vierailijoiden seurannassa, yhteystietolistojen laatimisessa ja jäsentietojen ylläpidossa.

</div>

## Koulutusvideo

<YouTube id="7Y-tN9RmnDQ" title="Henkilöiden haku ja listojen luominen B1:ssä" next="Mukautetut kentät, massamuokkaus ja vienti B1:ssä" nextUrl="/docs/b1-admin/settings/custom-fields" />

<div class="prereqs">
<h4>Ennen aloittamista</h4>

- Tarvitset aktiivisen B1 Admin -tilin, jolla on oikeus tarkastella henkilöitä. Katso [Roolit ja oikeudet](roles-permissions.md), jos et ole varma käyttöoikeuksistasi.
- Seurakuntasi hakemistossa pitäisi olla henkilöitä. Jos et ole vielä lisännyt ketään, katso [Henkilöiden lisääminen](adding-people.md) tai [Tietojen tuonti](importing-data.md).

</div>

## Taloudet ja taulukkonäkymät

Henkilöt-sivu listaa hakemistosi **talouksittain** aakkosjärjestyksessä. Jokaisella rivillä näkyvät talouden valokuvat, sen nimi (esimerkiksi "Smithin perhe") ja kaikkien siihen kuuluvien nimet. Napsauta taloutta avataksesi talouden pääasiallisen henkilön profiilin tai napsauta jonkun jäsenen nimeä avataksesi kyseisen henkilön profiilin. Luettelon yläpuolella näkyy, montako taloutta ja henkilöä on näkyvissä.

Vaihda luettelon yläpuolella olevalla **Näytä muodossa** -valitsimella **Taloudet** ja **Taulukko** välillä. **Taulukko**-näkymässä jokainen henkilö on omalla rivillään, ja siinä voit lajitella tietoja ja valita sarakkeita (katso alla). B1 muistaa valintasi tällä laitteella.

**Taulukko**-näkymässä henkilön jäsenyystila näkyy hänen nimensä alla. Jokaisella seitsemällä tilalla on oma värinsä, sama kuin henkilön profiilissa. Henkilöt, joiden talousroolina on **Lapsi**, näyttävät tilan vieressä myös **Lapsi**-tunnisteen. Voit merkitä henkilön lapseksi asettamalla hänen roolinsa hänen profiilissaan olevassa [talouspaneelissa](./adding-people.md#managing-households).

Oletuksena sivu lataa hakemistosi ensimmäisen osan. Jos henkilöitä on enemmän, napsauta luettelon alla olevaa **Näytä kaikki jäsenet** -painiketta ladataksesi kaikki.

## Pikahaku

Henkilöt-sivun yläosassa oleva **Etsi talous tai henkilö** -kenttä auttaa löytämään jäseniä reaaliajassa:

1. Napsauta **hakukenttää** Henkilöt-sivun yläosassa.
2. Ala kirjoittaa nimeä.
3. Tulokset suodattuvat automaattisesti kirjoittaessasi (pieni viive, noin puoli sekuntia, estää haun käynnistymisen jokaisesta näppäinpainalluksesta).
4. Alla oleva luettelo päivittyy näyttämään vain vastaavat tulokset.

Napsauta **Tyhjennä** (hakukentän alla) nollataksesi haun ja näyttääksesi koko hakemistosi uudelleen.

:::tip
Enter-näppäintä ei tarvitse painaa. Haku käynnistyy automaattisesti, kun lopetat kirjoittamisen.
:::

## Tulosten lajittelu

**Taulukko**-näkymässä henkilöt on listattu sukunimen, sitten etunimen mukaan. Voit lajitella hakemiston toisin napsauttamalla mitä tahansa sarakkeen otsikkoa:

1. Napsauta **sarakkeen otsikkoa** (esimerkiksi **Nimi** tai **Sähköposti**) lajitellaksesi sen mukaan.
2. Napsauta samaa otsikkoa uudelleen kääntääksesi lajittelujärjestyksen.

Näin on helppo löytää henkilöitä aakkosjärjestyksessä, iän mukaan tai minkä tahansa muun näkyvän sarakkeen mukaan.

## Sarakkeiden mukauttaminen

Kaikkea tietoa ei tarvitse näyttää kerralla. Voit valita, mitkä sarakkeet taulukossa näkyvät:

1. Napsauta **Valitse sarakkeet** -kuvaketta Henkilöt-sivun otsikkorivillä. (Sarakkeet koskevat **Taulukko**-näkymää.)
2. Valitse tai poista valinta sarakkeista näyttääksesi tai piilottaaksesi ne. Käytettävissä olevat sarakkeet ovat:
   - **Valokuva**
   - **Nimi**
   - **Sähköposti**
   - **Puhelin**
   - **Osoite**
   - **Syntymäaika**
   - **Ikä**
   - **Sukupuoli**
   - **Jäsenyystila**
   - **Kampus**
   - **Lisäyspäivä** -- milloin henkilön tietue luotiin
3. Taulukko päivittyy heti valintojesi mukaan. Sulje **Valitse sarakkeet** -valintaikkuna napsauttamalla **Valmis**.

### Mukautettujen kenttien näyttäminen sarakkeina

Sarakevalitsimessa on kaksi välilehteä: **Perus** sisältää yllä luetellut sisäänrakennetut sarakkeet, ja **Mukautetut** sisältää seurakuntasi [mukautetut kentät](../settings/custom-fields.md) sekä kysymykset mahdollisista Henkilöt-lomakkeista. Valitse mukautettu kenttä **Mukautetut**-välilehdeltä lisätäksesi sen sarakkeeksi, jolloin jokaisen henkilön arvo kyseiselle kentälle näkyy taulukossa. Arvot näytetään samalla tavalla kuin henkilön profiilissa: Kyllä/Ei-kentät näyttävät *Kyllä* tai *Ei*, monivalintakentät näyttävät vaihtoehdon nimen ja päivämäärät näytetään lyhyinä päivämäärinä. Henkilöillä, joilla ei ole arvoa kyseiselle kentälle, solu on tyhjä.

## Hakutulosten vieminen

Voit ladata nykyiset hakutulokset CSV-tiedostona milloin tahansa:

1. Ota käyttöön haluamasi haku tai suodattimet.
2. Napsauta **Vie**-painiketta Henkilöt-sivun otsikkorivillä.
3. CSV-tiedosto ladataan tietokoneellesi, ja sen voi avata Excelissä, Google Sheetsissä tai missä tahansa taulukkolaskentaohjelmassa.

Lisätietoja viennistä on kohdassa [Tietojen vienti](./exporting-data.md).

:::tip
Monimutkaisempiin kyselyihin, kuten niiden henkilöiden etsimiseen, jotka eivät ole käyneet tilaisuuksissa viimeisen kolmen kuukauden aikana, kokeile [Tekoälyhakua](./ai-search.md). Sen avulla voit hakea kysymällä tavallisella kielellä.
:::

## Edistynyt haku

Edistyneen haun avulla voit luoda tarkkoja suodattimia yhdistelemällä ehtoja. Avaa se napsauttamalla Henkilöt-sivulla hakukentän alla olevaa **Edistynyt**-painiketta. Laajenna sitten kategoria ja valitse kentät, joilla haluat suodattaa (voit napsauttaa kentän nimeä tai sen valintaruutua). Valitse jokaiselle kentälle operaattori ja arvo. Kategorioita ovat **Nimet**, **Demografia**, **Yhteystiedot**, **Jäsenyys**, **Toiminta** (lahjoitukset ja läsnäolo) ja **Mukautetut kentät**.

Löytääksesi uusia henkilöitä avaa **Jäsenyys** ja valitse **Lisäyspäivä**. Oletuksena asetuksena on **viimeisen N päivän aikana**, johon on täytetty 30, joten voit löytää kaikki viimeisen kuukauden aikana lisätyt yhdellä napsautuksella. Voit muuttaa päivien määrää tai vaihtaa asetukseen *yhtä suuri kuin / jälkeen / ennen* valitaksesi päivämäärän. **Syntymäaika** ja **Hääpäivä** tarjoavat myös vaihtoehdon **viimeisen N päivän aikana**. Lisäyspäivä tallennetaan vain henkilöille, jotka on luotu lokakuun 2026 lopun jälkeen. Sitä aiemmin lisätyillä henkilöillä ei ole päivämäärää, joten tämä suodatin ei löydä heitä.

**Mukautetut kentät** -kategoriassa luetellaan seurakuntasi [mukautetut kentät](../settings/custom-fields.md) eli kentät, jotka määrität Asetuksissa omien tietojesi seurantaan (esimerkiksi taustatarkistuksen vanhenemispäivä). Tarjottavat operaattorit vastaavat kunkin kentän tyyppiä: tekstikentät tukevat *sisältää / on yhtä suuri kuin / alkaa / päättyy*, numerokentät vertailuoperaattoreita, päivämääräkentät *yhtä suuri kuin / jälkeen / ennen*, ja Kyllä/Ei- sekä monivalintakentät antavat valita arvon. Mitä tahansa kenttää, jolla voit suodattaa täällä, voi tallentaa elävänä [listana](./lists.md).

## Hakujen tallentaminen listoina

Kun olet suorittanut haun, Henkilöt-sivun otsikkoriville ilmestyy **Tallenna listana** -painike. Napsauta sitä tallentaaksesi nykyisen kyselysi nimellä ja halutessasi kategorialla, jolloin voit ladata sen välittömästi myöhemmissä istunnoissa. Katso lisätietoja kohdasta [Tallennetut listat](./lists.md).
