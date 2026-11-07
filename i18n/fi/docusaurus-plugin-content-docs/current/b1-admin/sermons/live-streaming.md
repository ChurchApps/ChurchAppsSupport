---
title: "Live Streaming"
---

# Live Streaming

<div class="article-intro">

Sivu Live Stream Times mahdollistaa kirkon striimausaikataulun määrittämisen, jumalanpalvelusaikojen hallinnan ja katsojakokemuksen mukauttamisen. Määritä toistuvat viikoittaiset jumalanpalvelukset tai kertaluonteiset tapahtumat, säädä chatin ja videon asetuksia ja hallitse, milloin striimi alkaa.

</div>

## Koulutusvideo

<YouTube id="tpEY-sEYW6A" title="Live-striimauksen määrittäminen B1:ssä" next="Kirkkosi jäsensovelluksen mukauttaminen B1:ssä" nextUrl="/docs/b1-admin/settings/mobile-app" />

<div class="prereqs">
<h4>Ennen aloittamista</h4>

- Tarvitset käyttöoikeuden **contentApi.streamingServices.edit**. Katso [Roolit ja käyttöoikeudet](../settings/roles-permissions.md), jos sinulla ei ole pääsyä.
- Pidä YouTube-kanavasi kanavatunnus valmiina, jos aiot käyttää automaattista live-striimausta
- Lisää vähintään yksi [saarna](managing-sermons) tai pysyvä live-URL striimin lähteeksi

</div>

Live-striimausta hallitaan kahdelta sivulta valikon **Saarnat**-osiossa: **Live Stream Times** striimin aikataulun hallintaan ja **Asetukset** striimaussivun välilehtien määrittämiseen.

## Jumalanpalvelusten hallinta

### Jumalanpalveluksen lisääminen

1. Avaa B1 Adminissa [Jump-valikko](../introduction.md#getting-around-with-the-jump-menu) (hakupalkki vasemmassa yläkulmassa), laajenna **Saarnat** ja valitse **Live Stream Times**.
2. Luo uusi ajoitettu jumalanpalvelus napsauttamalla sivun yläreunan **Add Service** -painiketta. Olemassa olevat jumalanpalvelukset on listattu taulukkoon, jossa näkyy kunkin jumalanpalveluksen nimi, aika, palveluntarjoaja ja kesto. Muuttaaksesi riviä napsauta sen muokkauskuvaketta.
3. Anna **Service Name** (esimerkiksi "Sunday Morning").
4. Aseta **Service Time** -- valitse päivä ja kellonaika, jolloin jumalanpalvelus alkaa.
5. Aseta **Recurs Weekly** arvoon **Yes** säännöllisille viikoittaisille jumalanpalveluksille tai arvoon **No** kertaluonteiselle tapahtumalle.

### Chatin ja videon asetusten määrittäminen

6. Kohdassa **Chat Settings** määritä, kuinka monta minuuttia ennen jumalanpalvelusta ja sen jälkeen chat otetaan käyttöön. Näin vierailijat voivat aloittaa keskustelun ennen jumalanpalvelua ja jatkaa sitä sen jälkeen.
7. Kohdassa **Video Settings** määritä, kuinka aikaisin videostriimi käynnistyy laskentaa tai ennakkosisältöä varten. Chat avautuu tätä määrää minuutteja *ennen* aikaisen videon alkua, joten chatin "minuuttia ennen" -asetuksen vieressä näkyvä aika lasketaan yhteen molemmat luvut. Esimerkiksi 10.00 alkavassa jumalanpalveluksessa, jossa chat on auki 15 minuuttia ennen ja video alkaa 5 minuuttia aikaisemmin, chat avautuu klo 9.40.
8. Valitse pudotusvalikosta, mikä saarna toistetaan:
   - **Latest Sermon** -- Toistaa automaattisesti viimeksi lisätyn videosi.
   - **Current Live Service** -- Toistaa nykyisen live-striimisi YouTubesta kanavatunnuksesi avulla.
   - Voit myös valita minkä tahansa jo tallentamasi saarnan.
9. Napsauta **Save** tallentaaksesi jumalanpalveluksen aikataulun.

:::info
Jumalanpalvelus päivittyy automaattisesti joka viikko, jos se on asetettu toistuvaksi. Se pysyy samassa paikallisessa kellonajassa, kun kesäaika alkaa tai päättyy. Voit lisätä niin monta jumalanpalvelusta kuin tarvitset. Vierailijat näkevät striimaussivullasi seuraavan ajoitetun jumalanpalveluksen ajan.
:::

## Striimaussivun asetukset

Jos haluat mukauttaa live-striimisi vieressä näkyviä välilehtiä ja linkkejä, avaa Jump-valikko, laajenna **Saarnat** ja napsauta **Asetukset**. Sivu **Stream Settings** näyttää **Content Tabs** -luettelosi.

### Välilehtien lisääminen

1. Lisää uusi välilehti live-striimisivullesi napsauttamalla **Add**-painiketta.
2. Valitse **Link Type**: **External URL** mukautetulle linkille tai jokin valmiiksi suunnitelluista **Chat**- tai **Prayer**-välilehdistä.
3. Chat-välilehdelle anna sille nimi kenttään **Tab Text**, ja asennus on valmis.
4. Linkitettyä välilehteä varten anna välilehden nimi, valitse kuvake napsauttamalla kuvakepainiketta ja syötä URL-osoite.
5. Määrittämäsi välilehdet näkyvät live-striimisivulla, jotta katsojat voivat käyttää lisäresursseja ja vuorovaikutteisia ominaisuuksia.

### Striimisi esikatselu

Napsauta **Live Stream Times** -sivun yläreunassa **View Your Stream** -painiketta nähdäksesi, miltä live-striimisivusi näyttää vierailijoille, mukaan lukien logosi, jumalanpalvelusajat ja määrittämäsi välilehdet.

## YouTube-live-striimin määrittäminen

Jos haluat yhdistää YouTube-kanavasi automaattista live-striimausta varten:

1. Siirry kohtaan **Saarnat** ja napsauta **Add Sermon**, valitse sitten **Add Permanent Live URL**.
2. Videon palveluntarjoajaksi on oletuksena **Current YouTube Live Stream**. Anna **YouTube Channel ID** -kanavatunnuksesi.
3. Lisää otsikko ja kuvaus ja napsauta **Save**.
4. Luo **Live Stream Times** -sivulla jumalanpalvelus ja valitse pysyvä live-URL-osoitteesi saarnan pudotusvalikosta.

:::tip
Löydät YouTube-kanavatunnuksesi siirtymällä YouTube-kanavasi lisäasetuksiin ja kopioimalla Channel ID -arvon.
:::

## Värien ja logon mukauttaminen

Live-striimisivusi käyttää verkkosivustosi [Ulkoasu](../website/appearance)-asetuksia:

- Otsikossa käytetään **vaaleaa korostusväriä** tummalla tekstillä.
- Sivupalkissa käytetään **tummaa korostusväriä** vaalealla tekstillä.
- **Vaalean taustan logosi** näkyy striimaussivulla. Käytä kuvaa, jonka taustaa on läpinäkyvä ja kuvasuhde 4:1.

Muuttaaksesi näitä siirry kohtaan **Website** ja sitten **Appearance** ja päivitä [Väripaletti](../website/appearance#color-palette) ja [Logo](../website/appearance#logo-and-branding) -asetuksesi.

## Striimaajien lisääminen

Antaaksesi tiimin jäsenille pääsyn vain juontajille tarkoitettuun chattiin julkisen chatin rinnalla:

1. Valitse Jump-valikosta **Settings > Roles**.
2. Napsauta plus-painiketta ja valitse **Add Custom Role**.
3. Nimeä rooli "Streaming Host" ja napsauta **Save**.
4. Napsauta uutta roolia ja napsauta sitten **Members**-osiossa **Add** lisätäksesi henkilöitä.
5. Vieritä alas kohtaan **Edit Permissions**, laajenna **Content**-osio ja valitse **Host Chat**.

Kun juontajat kirjautuvat live-striimisivulle, julkisen chatin rinnalle ilmestyy yksityinen **Host Chat** -välilehti, jossa henkilökunta voi keskustella lähetyksen aikana.

:::info
Lisätietoja roolien luomisesta ja käyttöoikeuksien hallinnasta on kohdassa [Roolit ja käyttöoikeudet](../settings/roles-permissions.md).
:::

## Vianmääritys

Jos automaattinen YouTube-live-striimisi ei näy oikein käytettäessä vaihtoehtoa "Current YouTube Live Stream" kanavatunnuksellasi, kokeile seuraavaa:

**Oireet:**
- Live-striimin upotus näyttää tekstin "Video unavailable"
- Sivu latautuu, mutta videota ei näy
- Suorat YouTube-upotukset toimivat, mutta automaattinen kanavan live-striimi ei toimi

**Ratkaisu:**
Tarkista YouTube-kanavasi vanhat tai tulevat ajoitetut live-striimit ja poista ne:

1. Siirry YouTube Studioon.
2. Avaa **Content** ja sitten **Live**.
3. Etsi vanhoja ajoitettuja lähetyksiä tai tulevia ajoitettuja striimejä.
4. Poista nämä vanhat tai ajoitetut live-striimimerkinnät.
5. Testaa live-striimisivusi uudelleen.

:::warning
YouTuben automaattinen kanavan live-striimin upotus voi estyä, jos kanavallasi on useita ajoitettuja tai menneitä live-striimimerkintöjä. Niiden poistaminen antaa YouTubelle mahdollisuuden tunnistaa nykyisen live-striimisi ja näyttää se oikein.
:::

**Lisävaatimukset:**
- Live-striimisi on asetettava tilaan **Public** (ei Unlisted eikä Private).
- Upottaminen on sallittava YouTube-striimiasetuksissasi.
- Varmista, että käytät palveluntarjoajaa **Current YouTube Live Stream** (kanavatunnuksella), et palveluntarjoajaa **YouTube** (videotunnuksella).

## Seuraavat vaiheet

- [Saarnojen hallinta](managing-sermons) -- Lisää saarnoja kirjastoosi
- [Soittolistat](playlists) -- Järjestä saarnat sarjoiksi
