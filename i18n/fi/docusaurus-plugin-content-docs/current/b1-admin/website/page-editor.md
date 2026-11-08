---
title: "Sivueditorin käyttö"
description: "Määritä sivueditori B1 Adminissa lisäämällä osioita ja elementtejä, muokkaamalla tyylejä, esikatselemalla mobiilinäkymää ja julkaisemalla luonnoksia. Kattaa myös kumoamisen ja versiohistorian."
---

# Sivueditorin käyttö

<div class="article-intro">

B1-sivueditori on visuaalinen vedä ja pudota -rakentaja, jonka avulla voit suunnitella seurakuntasi verkkosivujen sivut ilman koodin kirjoittamista. Voit lisätä osioita ja sisältölohkoja, muokata tyylejä, esikatsella työtäsi ja kumota muutoksia -- kaikki selaimesi kautta.

</div>

## Koulutusvideo

<YouTube id="m2B_JxmfFm4" title="Sivujen ja navigoinnin muokkaaminen B1:ssä" next="Mukautetun verkkotunnuksen liittäminen B1:een" nextUrl="/docs/b1-admin/settings/custom-domain" />

<div class="prereqs">
<h4>Ennen aloittamista</h4>

- Suorita [Alkuasetukset](./initial-setup.md) ja määritä verkkosivustosi
- Luo vähintään yksi sivu kohdassa [Sivujen hallinta](./managing-pages.md)
- Tarvitset **content.edit**-oikeuden päästäksesi editoriin

</div>

## Editorin avaaminen

1. Avaa B1 Adminissa [Pikavalikko](../introduction.md#getting-around-with-the-jump-menu) (hakupalkki vasemmassa yläkulmassa), laajenna **Website** ja napsauta **Pages**.
2. Etsi muokattava sivu Pages-taulukosta ja napsauta **Edit Content**.

Editori avautuu koko näytön tilassa. Vasen paneeli näyttää sivurakenteesi ja käytettävissä olevat sisältöelementit; keskialue näyttää sivusi reaaliaikaisen esikatselun.

:::info
Editori näkyy aina vaaleassa tilassa riippumatta B1 Adminin teema-asetuksesta, ja se käyttää [Ulkoasu](./appearance.md)-kohdassa valitsemiasi otsikko- ja leipätekstin fontteja. Tämä varmistaa, että esikatselu vastaa tarkasti sitä, miltä sivusi näyttää verkkosivuston kävijöille.
:::

## Sivun rakenne: osiot ja elementit

Jokainen sivu rakentuu kahdelle tasolle:

- **Osiot** -- Ylimmän tason säiliöt, jotka jakavat sivun vaakasuuntaisiin kaistoihin (esimerkiksi pääkuva-osio, sisältölohko tai alatunnisteen nauha). Jokaisella sivulla on oltava vähintään yksi osio ennen kuin voit lisätä sisältöä.
- **Elementit** -- Yksittäiset sisältöpalat osion sisällä, kuten teksti, kuvat, painikkeet, kortit, lomakkeet ja kalenterit.

### Osion lisääminen

1. Napsauta **Add Section** (tai vasemman paneelin yläosan **+**-painiketta).
2. Valitse, miten aloitat:
   - **Mallipohjasta** -- selaa osiomallien galleriaa luokittain (Hero, About, Services, Giving jne.) ja napsauta yhtä lisätäksesi sen valmiiksi tyyliteltynä ja täytettynä osiona. Voit muokata kaikkea sen lisäämisen jälkeen.
   - **Tyhjä osio** -- valitse sarakeasettelu (yksi sarake, kaksi saraketta, kolme saraketta jne.) ja rakenna alusta.
3. Uusi osio näkyy esikatselussa. Napsauta sitä valitaksesi sen ja määrittääksesi taustavärin, täytön ja muut tyyliasetukset.

### Osion asettelun vaihtaminen

Oletko jo rakentanut osion, mutta haluat erilaisen rakenteen? Käytä osion asettelunvaihtajaa vaihtaaksesi sarakejärjestyksen galleriasta toiseen säilyttäen olemassa olevan sisältösi ja elementtisi paikoillaan.

### Elementtien lisääminen osioon

1. Napsauta osion sisällä esikatselussa valitaksesi sen.
2. Napsauta **Add Content** ja valitse elementtityyppi listasta:
   - **Text** -- Otsikot, kappaleet ja muotoiltu teksti
   - **Image** -- Lataa kuva tai linkitä siihen
   - **Button** -- Napsautettava toimintakehotuslinkki
   - **Card** -- Kuva, jossa on otsikko ja kuvaus
   - **Form** -- Upota [lomake](../forms/creating-forms.md) suoraan sivulle. Jos lomakkeella on [otsikkokuva](../forms/creating-forms.md#adding-a-header-photo), se näkyy kysymysten yläpuolella
   - **Calendar** -- Näytä tapahtumakalenteri
   - **FAQ** -- Haitarimaiset kysymys- ja vastauslohkot
   - **Video** -- Upota video URL-osoitteen perusteella
   - **Groups Browser** -- Suodatettava hakemisto kaikista seurakunnan ryhmistä, valinnaisine haku-, kategoria- ja tunnistesuodattimineen. Sen **Layout** voi olla **Grid** (oletus) tai **Scrolling (automatic)** -- katso [Vierittävät asettelut](#scrolling-layouts)
   - **Group List** -- Julkisten ryhmiesi laatat, valinnaisesti vain tietyn tunnisteen ryhmät. Sen **Layout** voi olla **Grid** (oletus; enintään kolme laattaa riviä kohden) tai **Scrolling (automatic)** -- katso [Vierittävät asettelut](#scrolling-layouts)
   - **Icon Feature** -- Kuvake, jossa on otsikko ja lyhyt kuvaus piirteiden tai palvelutehtävien esittelyyn
   - **Gallery** -- Useiden valokuvien ruudukko tai masonry-asettelu
   - **Testimonial** -- Yksi tai useampi lainaus kirjoittajan nimen, roolin ja kuvan kanssa
   - **Social Icons** -- Linkitetyt kuvakkeet seurakuntasi sosiaalisen median profiileihin: Facebook, Instagram, WhatsApp, YouTube, X, TikTok, Vimeo ja Podcast. Täytä linkki jokaiselle näytettävälle; **WhatsAppille** käytä `https://wa.me/`-linkkiä numerollasi tai ryhmän kutsulinkkiä
   - **Countdown** -- Ajastin, joka laskee alaspäin päivämäärään tai viikoittaiseen jumalanpalveluksen aikaan
   - **Stats** -- Rivi isoja numeroita nimikkeineen (jäsenet, vuodet, kampukset)
   - **Campaign Progress** -- Reaaliaikainen edistymispalkki lahjoituskampanjalle, joka näyttää kohdesummaan kerätyn kokonaissumman
   - **Staff Grid** -- Valokuvakortit ryhmän jäsenille; ryhmän **public roster** -asetuksen on oltava päällä
   - **Service Times** -- Kampustesi jumalanpalvelusaikataulu, haettu automaattisesti osallistumisasetuksista
   - **Sermons** -- Saarnakirjastosi koko selaimena tai ruudukko-, luettelo- tai viimeisimmät esille nostava asettelu
   - **Map** -- Upotettu kartta, joka on keskitetty seurakuntasi osoitteeseen
   - **Table** -- Yksinkertainen rivi- ja sarakeruudukko taulukkomuotoiselle sisällölle
   - **Text with Photo** -- Teksti ja kuva vierekkäin
   - **Logo** -- Seurakuntasi logo, haettu [Ulkoasusta](./appearance.md)
   - **Live Stream** -- Live-lähetyksesi soitin, upotettuna suoraan sivulle
   - **Podcast** -- Luettelo jaksoista ulkoisesta podcast-RSS-syötteestä, jonka URL-osoitteen annat. Asetuksilla määrität, montako jaksoa näytetään ja näytetäänkö päivämäärät ja kuvaukset. Jokaisella jaksolla live-sivustolla on äänisoitin ja **Download**-linkki, joka tallentaa jakson äänitiedoston jakson otsikon nimellä. Tämä on tarkoitettu minkä tahansa podcast-syötteen esittelyyn sivustollasi. Jos haluat julkaista omat saarnasi podcastina, katso [Saarnojen hallinta](../sermons/managing-sermons.md#your-podcast-feed)
   - **Donation** -- Lahjoituspainike tai upotettu lahjoituslomake
   - **HTML** -- Oma raakaa HTML-koodia edistyneisiin käyttötarkoituksiin, kuten kolmannen osapuolen widgetin upottamiseen (katso [HTML-elementin käyttö](#using-the-html-element))
   - **iFrame** -- Upota ulkoinen sisältö URL-osoitteen perusteella
3. Määritä elementti ilmestyvällä asetuspaneelilla.

### HTML-elementin käyttö

**HTML**-elementissä on kaksi laatikkoa:

- **HTML Content** -- Sivulla näytettävä merkintä. Kaikki tähän lisäämäsi `<script>`-tagit suoritetaan verkkosivustollasi.
- **JavaScript (exclude script tag)** -- Skriptikoodi, joka suoritetaan sivun latautuessa. Voit myös liittää tähän toimittajan upotuskoodinpätkän sen `<script>`-tageineen, ja se suoritetaan verkkosivustolla.

Jos liität JavaScript-laatikkoon pelkän web-osoitteen (kuten kuvalinkin), laatikko muuttuu punaiseksi varoituksella *"This is a web address, not JavaScript."* Pelkkä osoite tässä laatikossa ei tee mitään. Kuvan näyttämiseksi käytä **Image**-elementtiä tai laita `<img src="...">` **HTML Content** -kenttään.

### Calendar-elementin käyttö {#using-the-calendar-element}

**Calendar**-elementti näyttää tapahtumia yhdestä kalenteristasi:

1. Valitse kohdassa **Select** **Group Calendar** (yhden ryhmän tapahtumat -- luettelossa ovat ryhmät, joihin kuulut) tai **Curated Calendar** (kalenteri, jonka rakensit kohdassa **Calendars**; katso [Curated Calendar](../calendars/curated-calendar.md)).
2. Valitse kohdassa **Select Calendar** ryhmä tai kalenteri.
3. Valitse kohdassa **Display**, miten se näytetään:
   - **Month calendar** -- Kuukausiruudukko, jossa kävijät voivat selata. Jokainen tapahtuma on värjätty ryhmän mukaan, jolle se kuuluu, joten ryhmän tapahtumilla on sama väri jokaisella kalenterilla. B1 valitsee värit automaattisesti, eikä mitään tarvitse määrittää.
   - **Upcoming events** -- Ruudukko seuraavien 12 tapahtuman laatoista. Toistuva tapahtuma näytetään kerran seuraavana päivänään. Jokainen laatta näyttää tapahtuman kuvan (tai sen otsikon teemasi tummalla värillä, jos kuvaa ei ole), päivämääramerkin, päivän ja kellonajan sekä kuvauksen ensimmäisen rivin. Laattojen yläpuolella oleva **Subscribe**-painike antaa kävijöiden kopioida kalenterin ICS-linkin tai ladata sen. Tälle näytölle ilmestyy **Layout**-asetus: **Grid** (oletus) tai **Scrolling (automatic)**, joka asettaa laatat yhdelle riville, joka vierii itsestään (katso [Vierittävät asettelut](#scrolling-layouts)). **Curated Calendar** -kalenterille käännä **Group badge** -asetus päälle, jotta jokaisen tapahtuman ryhmän nimi näkyy laatan oikeassa yläkulmassa ryhmän kalenterivärillä. Arkistoitujen tai luottamuksellisten ryhmien tapahtumissa ei ole merkkiä.
4. Jos haluat näyttää vain osan tapahtumista, kirjoita tagi kenttään **Only events tagged** -- esimerkiksi `youth`. Näkyviin tulevat vain tapahtumat, joiden **Tags**-kenttä sisältää tuon sanan. Jätä kenttä tyhjäksi, jos haluat näyttää kaikki tapahtumat. Tagit asetetaan jokaiselle tapahtumalle; katso [Tapahtumien lisääminen ja muokkaaminen](../calendars/creating-calendars.md#adding-and-editing-events).

Molemmissa näytöissä tapahtuman napsauttaminen avaa oman sivunsa verkkosivustolla. Tapahtumasivulla on tapahtuman kuva, otsikko, päivämäärä ja kellonaika sekä kuvaus, lisäksi laatikko, jossa on **When** (toistuvan tapahtuman toistokuvio mukaan lukien) ja **Where** (sille varatut tilat). Siinä on myös **Register for this Event** -painike, kun ilmoittautuminen on käytössä, sekä **Add to my calendar** -linkki, joka lataa tapahtuman kalenteritiedostona. Sivu on rakennettu niin, että hakukoneet voivat näyttää tapahtuman päivämäärän ja tiedot hakutuloksissaan. Sivuillasi näkyvien curated-kalenterien tapahtumasivut (seuraavan kuuden kuukauden tapahtumat) on lisäksi listattu sivustosi sivukartassa, jotta hakukoneet löytävät ne.

### Vierittävät asettelut {#scrolling-layouts}

**Scrolling (automatic)** -asettelu **Groups Browser**-, **Group List**- ja Calendar-elementin **Upcoming events** -näytössä asettaa laatat yhdelle riville ruudukon sijaan. Puhelimessa jokainen laatta täyttää rivin; tietokoneella kaksi laattaa mahtuu rinnakkain. Kun laattoja on enemmän kuin mahtuu, rivi:

- Siirtyy eteenpäin yhden laatan verran noin neljän sekunnin välein ja palaa ensimmäiseen laattaan viimeisen jälkeen.
- Pysähtyy, kun kävijä viepi hiiren sen päälle, koskettaa sitä tai siirtyy siihen sarkainnäppäimellä, ja jatkuu muutaman sekunnin kuluttua.
- Näyttää pisterivin sen alla, yksi piste per laatta. Nykyisen laatan piste on täytetty. Kävijät voivat napsauttaa pistettä hypätäkseen kyseiseen laattaan.

Laitteissa, joissa liike on vähennetty, rivi pysyy paikallaan, ja kävijät pyyhkäisevät tai vierittävät sitä itse. Jos kaikki laatat mahtuvat, rivi ei liiku eikä pisteitä näy.

### Sisällön järjestäminen uudelleen

Vedä osioita tai elementtejä kunkin kohteen vasemmalla puolella olevasta kahvasta (kuusi pistettä) järjestääksesi ne uudelleen. Voit vetää elementtejä osion sisällä tai siirtää niitä osioiden välillä.

## Sivusi tyylittely

### Osion tyylit

Napsauta mitä tahansa osiota avataksesi sen tyylipaneelin. Voit asettaa:

- **Background** -- Yksivärinen, liukuväri tai kuva. Kun käytät kuvaa taustana, **Focal Point** -valitsimella voit napsauttaa kohdan, joka pysyy keskitettynä osion skaalautuessa. **Overlay**-värivaihtoehdolla voit lisätä kuvan päälle puoliläpinäkyvän sävytyksen tekstin luettavuuden parantamiseksi.
- **Padding** -- Ylä- ja alatilan etäisyys osion sisällä
- **Width** -- Koko leveys tai keskitetty/rajattu leveys
- **Dividers** -- Koristeelliset muotoerottimet (aalto, viisto, kaari, kolmio ja muut) osion yläreunassa tai alareunassa, värin, korkeuden ja peilausasetusten kanssa

### Elementtien tyylit

Napsauta mitä tahansa elementtiä avataksesi sen tyylipaneelin. Yleisiä asetuksia ovat fontin koko, väri, tasaus, marginaali ja täyte. Kuville voit asettaa vaihtoehtoisen tekstin (alt-teksti) ja linkkien kohteet.

### Mukautettu CSS

Edistyneempään tyylittelyyn jokaisessa osiossa ja elementissä on **Custom CSS** -kenttä, johon voit kirjoittaa omia CSS-sääntöjäsi. Ne rajautuvat kyseiseen elementtiin, joten ne eivät vahingossa vaikuta muuhun sivuun.

:::tip
Jos haluat soveltaa tyylejä koko verkkosivustoosi, kuten mukautettua fonttia tai yleistä väriä, käytä yksittäisten sivujen mukautetun CSS:n sijaan [Ulkoasu](./appearance.md)-asetuksia.
:::

## Sivusi esikatselu

Käytä työkalurivin esikatseluvalintoja nähdäksesi, miltä sivusi näyttää eri näyttökokoilla:

- **Desktop** -- Koko leveyden selainnäkymä
- **Mobile** -- Kapea puhelinkokoinen näkymä

Puhelimissa rivin sarakkeet pinoutuvat yksi toisensa alle täydellä leveydellä, ellet aseta riviasetuksissa niille **Mobile Width** -arvoa. Saarna- ja podcast-luettelot pinoavat myös jokaisen jakson tekstin pikkukuvansa alle puhelimissa.

Nähdäksesi live-sivun täsmälleen niin kuin kävijät sen näkevät, palaa Pages-luetteloon ja napsauta sivun polkua. Se avautuu uuteen selainvälilehteen.

## Saavutettavuuden tarkistaminen

Napsauta työkalurivin **Accessibility**-kuvaketta tehdäksesi nopean tarkistuksen yleisistä ongelmista, kuten kuvista, joista puuttuu alt-teksti, heikosta värikontrastista tai otsikoista, jotka ovat väärässä järjestyksessä. Jokainen ongelma linkittyy suoraan elementtiin, joka vaatii huomiota, joten voit korjata sen paikan päällä.

## Muutosten kumoaminen

Editori seuraa muokkaushistoriaasi automaattisesti. Käytä työkalurivin painikkeita tai pikanäppäimiä navigointiin:

- **Undo** (Ctrl+Z / Cmd+Z) -- Peruuta viimeisin toimintosi
- **Redo** (Ctrl+Shift+Z tai Ctrl+Y / Cmd+Shift+Z) -- Tee uudelleen peruuttamasi toiminto

Voit myös palauttaa sivun aiempaan tilannekuvaan. Napsauta työkalurivin **View history** -painiketta nähdäksesi luettelon tallennetuista tilannekuvista kuvauksineen. Napsauta mitä tahansa merkintää palataksesi siihen kohtaan.

:::warning
Tilannekuvan palauttaminen korvaa nykyisen sivusisältösi tilannekuvan versiolla. Tätä ei voi perua tavallisella kumoa-painikkeella. Tallenna nykyisen tilanteesi tilannekuva ennen vanhan palauttamista, jos haluat säilyttää mahdollisuuden palata siihen.
:::

## Tallentaminen ja julkaiseminen

Muutokset tallennetaan automaattisesti työskennellessäsi. Työkalurivin tilanilmaisin näyttää, onko muutoksesi tallennettu.

### Luonnos- ja julkaistu tila

Sivuilla voi olla **published**-tila, joka määrää, milloin kävijät näkevät muutoksesi. Työkalurivi näyttää nykyisen tilan kertovalla tilamerkillä:

- **Live on save** -- Sivu ei käytä julkaisutyönkulkua. Jokainen tallennettu muutos menee heti käyttöön. Tämä on uusien sivujen oletus.
- **Unpublished changes** -- Sivu on julkaistu aiemmin, mutta olet tehnyt muutoksia viimeisimmän julkaisun jälkeen. Kävijät näkevät edelleen aiemmin julkaistun version.
- **Published** -- Sivu on live-tilassa, ja tallennettu sisältösi vastaa sitä, mitä kävijät näkevät.

Julkaistaksesi muutoksesi napsauta työkalurivin **Publish**-painiketta. Sivu tulee heti näkyviin.

Palataksesi viimeksi julkaistuun versioon vaikuttamatta siihen, mitä kävijät näkevät, avaa ylivuotovalikko (⋮) ja napsauta **Discard unpublished changes**.

Lopettaaksesi julkaisutyönkulun käytön avaa ylivuotovalikko ja napsauta **Turn off publishing**. Muokkaukset menevät sen jälkeen taas heti käyttöön.

:::tip
Käytä luonnos- ja julkaisutyönkulkua, kun haluat valmistella sivun, esimerkiksi tulevaa tapahtumaa varten, ja tehdä siitä näkyvän vasta oikealla hetkellä. Rakenna ja esikatsele sivu, ja napsauta sitten Publish, kun olet valmis.
:::

## Liittyvät artikkelit

- [Sivujen hallinta](./managing-pages.md) -- Luo sivuja, aseta URL-osoitteet ja hallitse sivuston navigointia
- [Ulkoasu](./appearance.md) -- Aseta koko sivuston värit, fontit ja brändäys
- [Tiedostot](./files.md) -- Lataa kuvia ja asiakirjoja käytettäviksi editorissa
- [Lomakkeiden luominen](../forms/creating-forms.md) -- Rakenna lomakkeita, joita voit upottaa sivuille
