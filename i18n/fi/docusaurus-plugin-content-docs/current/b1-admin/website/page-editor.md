---
title: "Sivueditorin käyttäminen"
---

# Sivueditorin käyttäminen

<div class="article-intro">

B1-sivueditori on visuaalinen vedä ja pudota -rakentaja, jonka avulla voit suunnitella kirkkosi verkkosivujen sivut ilman koodin kirjoittamista. Voit lisätä osioita ja sisältölohkoja, muokata tyylejä, esikatsella työtäsi ja kumota muutoksia. Kaikki tämä tapahtuu selaimessa.

</div>

## Koulutusvideo

<YouTube id="m2B_JxmfFm4" title="Sivujen ja navigoinnin muokkaaminen B1:ssä" next="Mukautetun verkkotunnuksen liittäminen B1:een" nextUrl="/docs/b1-admin/settings/custom-domain" />

<div class="prereqs">
<h4>Ennen aloittamista</h4>

- Suorita [alkuasetukset](initial-setup), jotta verkkosivustosi on määritetty
- Luo vähintään yksi sivu kohdassa [Sivujen hallinta](managing-pages)
- Tarvitset **content.edit**-oikeuden päästäksesi editoriin

</div>

## Editorin avaaminen

1. Avaa B1 Adminissa [Jump-valikko](../introduction.md#getting-around-with-the-jump-menu) (hakupalkki ylävasemmalla), laajenna kohta **Website** ja valitse **Pages**.
2. Etsi muokattava sivu Pages-taulukosta ja valitse **Edit Content**.

Editori avautuu koko näytön tilassa. Vasemmassa paneelissa näkyy sivusi rakenne ja käytettävissä olevat sisältöelementit. Keskialueella on sivusi reaaliaikainen esikatselu.

:::info
Editori näytetään aina vaaleassa tilassa B1 Adminin teema-asetuksesta riippumatta. Se käyttää otsikko- ja leipätekstin fontteja, jotka valitsit kohdassa [Ulkoasu](appearance). Näin esikatselu vastaa tarkasti sitä, miltä sivusi näyttää verkkosivujen kävijöille.
:::

## Sivun rakenne: osiot ja elementit

Jokainen sivu koostuu kahdesta tasosta:

- **Osiot** -- Ylimmän tason säiliöt, jotka jakavat sivusi vaakasuuntaisiin kaistoihin (esimerkiksi pääkuvaosio, sisältölohko tai alatunnisteen kaista). Jokaisessa sivussa on oltava vähintään yksi osio ennen kuin voit lisätä sisältöä.
- **Elementit** -- Yksittäiset sisältöosat, jotka sijoitetaan osion sisään, kuten teksti, kuvat, painikkeet, kortit, lomakkeet ja kalenterit.

### Osion lisääminen

1. Valitse **Add Section** (tai paneelin yläreunan **+**-painike).
2. Valitse, miten aloitat:
   - **Mallipohjasta** -- Selaa osiomallien galleriaa luokittain (Hero, About, Services, Giving jne.) ja valitse yksi lisätäksesi sen täysin muotoiltuna, valmiiksi täytettynä osiona. Voit muokata kaikkea sen lisäämisen jälkeen.
   - **Tyhjä osio** -- Valitse sarakeasettelu (yksi sarake, kaksi saraketta, kolme saraketta jne.) ja rakenna osio alusta.
3. Uusi osio näkyy esikatselussa. Valitse se ja määritä sen taustaväri, täyte ja muut tyyliasetukset.

### Osion asettelun vaihtaminen

Jos olet jo rakentanut osion, mutta haluat toisenlaisen rakenteen, käytä osion asettelunvaihtajaa. Sillä voit vaihtaa sarakejärjestelyn galleriasta toiseen säilyttäen olemassa olevan sisältösi ja elementtisi paikoillaan.

### Elementtien lisääminen osioon

1. Valitse osio napsauttamalla sitä esikatselussa.
2. Valitse **Add Content** ja valitse elementtityyppi luettelosta:
   - **Text** -- Otsikot, kappaleet ja muotoiltu teksti
   - **Image** -- Lataa kuva tai linkitä siihen
   - **Button** -- Napsautettava toimintakehotuslinkki
   - **Card** -- Kuva, jossa on otsikko ja kuvaus
   - **Form** -- Upota [lomake](../forms/creating-forms) suoraan sivulle. Jos lomakkeessa on [otsikkokuva](../forms/creating-forms.md#adding-a-header-photo), se näkyy kysymysten yläpuolella
   - **Calendar** -- Näytä tapahtumakalenteri
   - **FAQ** -- Haitarimaiset kysymys- ja vastauslohkot
   - **Video** -- Upota video URL-osoitteella
   - **Groups Browser** -- Suodatettava hakemisto kaikista kirkon ryhmistä, valinnaisella haulla, kategoriasuodattimella ja tunnisteen suodattimella
   - **Icon Feature** -- Kuvake, jossa on otsikko ja lyhyt kuvaus, esimerkiksi palvelun tai toiminnan esittelyyn
   - **Gallery** -- Useiden kuvien ruudukko tai muurausasettelu
   - **Testimonial** -- Yksi tai useampi lainaus kirjoittajan nimellä, tehtävällä ja kuvalla
   - **Social Icons** -- Linkitetyt kuvakkeet kirkkosi somekanaville: Facebook, Instagram, WhatsApp, YouTube, X, TikTok, Vimeo ja Podcast. Täytä linkki jokaiselle näytettävälle kanavalle. **WhatsAppia** varten käytä `https://wa.me/`-linkkiä numerollasi tai ryhmäkutsulinkilläsi
   - **Countdown** -- Ajastin, joka laskee aikaa päivämäärään tai viikoittaiseen jumalanpalveluksen aikaan
   - **Stats** -- Rivi suuria lukuja nimikkeineen (jäsenet, vuodet, kampukset)
   - **Campaign Progress** -- Elävä edistymispalkki lahjoituskampanjalle, joka näyttää rahastotavoitteeseen kerätyn summan
   - **Staff Grid** -- Valokuvakortit ryhmän jäsenille. Ryhmän **julkinen luettelo** -asetuksen on oltava päällä
   - **Service Times** -- Kampustesi jumalanpalvelusaikataulu, joka haetaan automaattisesti osallistumisasetuksista
   - **Sermons** -- Saarnakirjastosi koko selaimena tai ruudukko-, luettelo- tai esillä olevan uusimman asettelussa
   - **Map** -- Upotettu kartta, joka on keskitetty kirkkosi osoitteeseen
   - **Table** -- Yksinkertainen rivien ja sarakkeiden ruudukko taulukkomaiselle sisällölle
   - **Text with Photo** -- Teksti ja kuva vierekkäin
   - **Logo** -- Kirkkosi logo, haettuna kohdasta [Ulkoasu](appearance)
   - **Live Stream** -- Suorasähköisen lähetyksesi soitin, upotettuna suoraan sivulle
   - **Podcast** -- Luettelo jaksoista, jotka haetaan antamasi ulkoisen podcast-RSS-syötteen URL-osoitteesta. Voit määrittää, kuinka monta jaksoa näytetään ja näytetäänkö päivämäärät ja kuvaukset. Live-sivustolla jokaisessa jaksossa on äänisoitin ja **Download**-linkki, joka tallentaa jakson äänitiedoston jakson otsikon mukaisella nimellä. Tämä on tarkoitettu minkä tahansa podcast-syötteen esittelyyn sivustollasi. Jos haluat julkaista omat saarnasi podcastina, katso sen sijaan [Saarnojen hallinta](../sermons/managing-sermons.md#your-podcast-feed)
   - **Donation** -- Lahjoituspainike tai upotettu lahjoituslomake
   - **HTML** -- Oma raakа HTML-koodi edistyneisiin käyttötarkoituksiin, kuten kolmannen osapuolen widgetin upottamiseen (katso [HTML-elementin käyttö](#using-the-html-element))
   - **iFrame** -- Upota ulkoista sisältöä URL-osoitteella
3. Määritä elementti avautuvassa asetuspaneelissa.

### HTML-elementin käyttö

**HTML**-elementissä on kaksi ruutua:

- **HTML Content** -- Merkintä, joka näytetään sivulla. Kaikki tähän lisäämäsi `<script>`-tagit suoritetaan live-sivustollasi.
- **JavaScript (exclude script tag)** -- Skriptikoodi, joka suoritetaan sivun latautuessa. Voit myös liittää tähän toimittajan upotuskoodinpätkän sen `<script>`-tageineen, ja se suoritetaan live-sivustolla.

Jos liität JavaScript-ruutuun pelkän verkko-osoitteen (kuten kuvalinkin), ruutu muuttuu punaiseksi varoituksella *"This is a web address, not JavaScript."* Pelkkä osoite tässä ruudussa ei tee mitään. Kuvan näyttämiseksi käytä **Image**-elementtiä tai lisää `<img src="...">` kenttään **HTML Content**.

### Calendar-elementin käyttö {#using-the-calendar-element}

**Calendar**-elementti näyttää tapahtumia jostakin kalenteristasi:

1. Kohdassa **Select** valitse **Group Calendar** (yhden ryhmän tapahtumat -- luettelossa näkyvät ryhmät, joiden jäsen olet) tai **Curated Calendar** (kalenteri, jonka rakensit kohdassa **Calendars**; katso [Curated Calendar](../calendars/curated-calendar)).
2. Kohdassa **Select Calendar** valitse ryhmä tai kalenteri.
3. Kohdassa **Display** valitse, miten se näytetään:
   - **Month calendar** -- Kuukausiruudukko, jonka kävijät voivat selata.
   - **Upcoming events** -- Ruudukko seuraavien 12 tulevan tapahtuman kortteja. Toistuva tapahtuma näytetään kerran sen seuraavana päivänä. Jokaisessa kortissa on tapahtuman kuva (tai sen otsikko teemasi tummalla värillä, jos kuvaa ei ole), päivämääräkahva, päivä ja kellonaika sekä kuvauksen ensimmäinen rivi. Korttien yläpuolella oleva **Subscribe**-painike antaa kävijöiden kopioida kalenterin ICS-linkin tai ladata sen. Tälle näkymälle näkyy **Layout**-asetus: **Grid** (oletus) tai **Scrolling (automatic)**, jolloin kortit ovat yhdessä rivissä, joka vierii automaattisesti.
4. Jos haluat näyttää vain osan tapahtumista, kirjoita tunniste kenttään **Only events tagged** -- esimerkiksi `youth`. Näkyviin tulevat vain tapahtumat, joiden **Tags**-kentässä on tämä sana. Jätä kenttä tyhjäksi, jos haluat näyttää kaikki tapahtumat. Tunnisteet asetetaan jokaiselle tapahtumalle; katso [Tapahtumien lisääminen ja muokkaaminen](../calendars/creating-calendars.md#adding-and-editing-events).

Kummassakin näkymässä tapahtumaa napsauttamalla avautuu sen oma sivu verkkosivustollasi. Tapahtumasivulla näkyvät tapahtumakuva, otsikko, päivämäärä ja kellonaika sekä kuvaus. Lisäksi siinä on ruutu, jossa on **When** (toistuvan tapahtuman toistokuvio mukaan lukien) ja **Where** (tapahtumaa varten varatut huoneet). Jos ilmoittautuminen on käytössä, sivulla on myös painike **Register for this Event**. Lisäksi on linkki **Add to my calendar**, joka lataa tapahtuman kalenteritiedostona. Sivu on rakennettu niin, että hakukoneet voivat näyttää tapahtuman päivämäärän ja tiedot hakutuloksissaan. Sivustosi sivukartassa on myös listattu sivuillasi näkyvien curated-kalenterien tapahtumasivut (kuuden seuraavan kuukauden tapahtumat), jotta hakukoneet löytävät ne.

### Sisällön järjestäminen uudelleen

Vedä osioita tai elementtejä kunkin kohteen vasemmalla puolella olevasta kahvakuvakkeesta (kuusi pistettä) ja järjestä ne uudelleen. Voit vetää elementtejä osion sisällä tai siirtää niitä osioiden välillä.

## Sivusi tyylittely

### Osion tyylit

Napsauta mitä tahansa osiota avataksesi sen tyylipaneelin. Voit asettaa:

- **Background** -- Yksivärinen, liukuväri tai kuva. Kun käytät kuvataustaa, **Focal Point** -valitsimella voit napsauttaa ja määrittää, mikä kuvan osa pysyy keskellä osion skaalautuessa. **Overlay**-värivaihtoehdolla voit lisätä kuvan päälle puoliläpinäkyvän sävyn tekstin luettavuuden parantamiseksi.
- **Padding** -- Osion sisäinen yläreunan ja alareunan väli
- **Width** -- Koko leveys tai keskitetty/rajattu
- **Dividers** -- Koristeelliset muotoerottimet (aalto, viisto, kaari, kolmio ja muut) osion yläreunassa tai alareunassa värin, korkeuden ja peilausasetusten kanssa

### Elementtien tyylit

Napsauta mitä tahansa elementtiä avataksesi sen tyylipaneelin. Yleisiä asetuksia ovat fonttikoko, väri, tasaus, marginaali ja täyte. Kuville voit asettaa vaihtoehtoisen tekstin (alt-teksti) ja linkin kohteen.

### Mukautettu CSS

Edistyneempää tyylittelyä varten jokaisessa osiossa ja elementissä on kenttä **Custom CSS**, johon voit kirjoittaa omia CSS-sääntöjä. Ne rajautuvat kyseiseen elementtiin, joten ne eivät vahingossa vaikuta muuhun sivuun.

:::tip
Jos haluat soveltaa tyylejä koko sivustoosi, kuten mukautetun fontin tai yleisen värin, käytä [Ulkoasu](appearance)-asetuksia yksittäisten sivujen mukautetun CSS:n sijaan.
:::

## Sivusi esikatselu

Käytä työkalupalkin esikatseluasetuksia tarkistaaksesi, miltä sivusi näyttää eri näytönkoilla:

- **Desktop** -- Koko leveyden selainnäkymä
- **Mobile** -- Kapea puhelimen kokoinen näkymä

Puhelimissa rivin sarakkeet asettuvat päällekkäin koko leveydeltä, ellet aseta niille **Mobile Width** -arvoa rivin asetuksissa. Saarna- ja podcast-luettelot asettavat myös jokaisen jakson tekstin kuvakkeen alle puhelimissa.

Jos haluat nähdä live-sivun täsmälleen samassa muodossa kuin kävijät, palaa Pages-luetteloon ja napsauta sivun polkua. Se avautuu uuteen selainvälilehteen.

## Saavutettavuuden tarkistaminen

Napsauta työkalupalkin **Accessibility**-kuvaketta tehdäksesi nopean tarkistuksen yleisimmille ongelmille, kuten kuville puuttuville alt-teksteille, heikolle värikontrastille tai epäjärjestyksessä oleville otsikoille. Jokainen ongelma linkittyy suoraan siihen elementtiin, joka vaatii huomiota, joten voit korjata sen paikan päällä.

## Muutosten kumoaminen

Editori seuraa muokkaushistoriaasi automaattisesti. Käytä työkalupalkin painikkeita tai pikanäppäimiä:

- **Undo** (Ctrl+Z / Cmd+Z) -- Kumoa viimeisin toimintosi
- **Redo** (Ctrl+Shift+Z tai Ctrl+Y / Cmd+Shift+Z) -- Tee kumottu toiminto uudelleen

Voit myös palauttaa sivun aiempaan tilannekuvaan. Napsauta työkalupalkin **View history** -kohtaa nähdäksesi luettelon tallennetuista tilannekuvista kuvauksineen. Napsauta mitä tahansa merkintää palauttaaksesi sen kohdan.

:::warning
Tilannekuvan palauttaminen korvaa nykyisen sivusisältösi tilannekuvan versiolla. Tätä ei voi kumota tavallisella kumoa-painikkeella. Tallenna nykyisen tilanteesi tilannekuva ennen vanhan palauttamista, jos haluat säilyttää mahdollisuuden palata siihen.
:::

## Tallentaminen ja julkaiseminen

Muutokset tallentuvat automaattisesti työskennellessäsi. Työkalupalkin tilanilmaisin näyttää, onko muutoksesi tallennettu.

### Luonnos- ja julkaistu tila

Sivuilla voi olla **julkaistu**-tila, joka määrittää, milloin kävijät näkevät muutoksesi. Työkalupalkki näyttää nykyisen tilan tilamerkin:

- **Live on save** -- Sivu ei käytä julkaisutyönkulkua. Jokainen tallennettu muutos menee heti näkyviin. Tämä on uusien sivujen oletus.
- **Unpublished changes** -- Sivu on julkaistu aiemmin, mutta olet tehnyt muutoksia viimeisen julkaisun jälkeen. Kävijät näkevät edelleen aiemmin julkaistun version.
- **Published** -- Sivu on live-tilassa, ja tallennettu sisältösi vastaa sitä, mitä kävijät näkevät.

Voit julkaista muutoksesi napsauttamalla työkalupalkin **Publish**-painiketta. Sivu on heti live-tilassa.

Jos haluat palata viimeisimpään julkaistuun versioon vaikuttamatta siihen, mitä kävijät näkevät, avaa ylivuotovalikko (⋮) ja valitse **Discard unpublished changes**.

Jos haluat lopettaa julkaisutyönkulun käytön, avaa ylivuotovalikko ja valitse **Turn off publishing**. Muokkaukset menevät sen jälkeen jälleen heti live-tilaan.

:::tip
Käytä luonnos- ja julkaisutyönkulkua, kun haluat valmistella sivun esimerkiksi tulevaa tapahtumaa varten ja tehdä siitä näkyvän vasta oikealla hetkellä. Rakenna ja esikatsele sivu ja napsauta sitten **Publish**, kun olet valmis.
:::

## Aiheeseen liittyvät artikkelit

- [Sivujen hallinta](managing-pages) -- Luo sivuja, aseta URL-osoitteita ja hallitse sivuston navigointia
- [Ulkoasu](appearance) -- Aseta koko sivustoa koskevat värit, fontit ja brändäys
- [Tiedostot](files) -- Lataa editorissa käytettäviä kuvia ja asiakirjoja
- [Lomakkeiden luominen](../forms/creating-forms) -- Rakenna lomakkeita, jotka voit upottaa sivuille
