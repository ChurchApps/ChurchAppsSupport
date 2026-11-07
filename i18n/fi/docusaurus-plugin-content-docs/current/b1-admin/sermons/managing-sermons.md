---
title: "Saarnojen hallinta"
description: "Hallitse saarnakirjastoa B1 Adminissa: lisää saarnoja YouTubesta, Vimeosta tai Facebookista, muokkaa tietoja ja luo seurakunnallesi podcast-syöte."
---

# Saarnojen hallinta

<div class="article-intro">

Saarnat-sivulla näkyy koko saarnakirjastosi. Täältä voit lisätä uusia saarnoja, muokata olemassa olevia merkintöjä ja järjestää sisältöäsi soittolistoittain. Jokainen saarna voi linkittää YouTubessa, Vimeossa tai Facebookissa isännöityyn videoon tai ääneen taikka mukautettuun URL-osoitteeseen.

</div>

<div class="prereqs">
<h4>Ennen aloittamista</h4>

- Tarvitset oikeuden **contentApi.streamingServices.edit**. Jos sinulla ei ole pääsyä, katso [Roolit ja oikeudet](../settings/roles-permissions.md).
- Luo vähintään yksi [soittolista](./playlists.md), johon saarnat järjestetään
- Valmistele videotunnukset tai URL-osoitteet YouTubesta, Vimeosta tai Facebookista

</div>

## Saarnakirjastosi tarkasteleminen

1. Avaa B1 Adminissa [Hyppyvalikko](../introduction.md#getting-around-with-the-jump-menu) (hakupalkki yläreunassa vasemmalla), laajenna **Saarnat** ja napsauta **Saarnat**.
2. Saarnat-sivulla näkyvät saarnamerkinnät taulukossa, jossa on kunkin saarnan **Soittolista**, otsikko ja **Julkaisupäivä**. Suodata luetteloa taulukon yläpuolella olevalla hakukentällä. Soittolistasi näkyvät taulukon vieressä olevassa **Soittolistat**-paneelissa.
3. Napsauta minkä tahansa saarnarivin **Muokkaa**-painiketta nähdäksesi tai muokataksesi sen tietoja.

## Saarnan lisääminen

1. Napsauta oikeassa yläkulmassa **Lisää saarna** -painiketta ja valitse avattavasta valikosta **Lisää saarna**.
2. Valitse **Soittolista**, johon saarna lisätään.
3. Valitse **Videopalveluntarjoaja** -- YouTube, Vimeo, Facebook tai Mukautettu URL. Suosittelemme YouTubea, sillä se toimii parhaiten B1-järjestelmän kanssa.
4. Kirjoita videotunnus tai URL-osoite ja napsauta **Hae**. YouTubea varten videotunnus on merkkijono, joka tulee YouTube-osoitteessa `v=`-merkinnän jälkeen.
5. Kun napsautat **Hae**, saarnan tiedot tuodaan automaattisesti, mukaan lukien julkaisupäivä, kesto, otsikko, kuvaus ja pienoiskuva.
6. Tee haluamasi muutokset ja napsauta **Tallenna**.

:::tip
Voit myös lisätä pysyvän suoratoiston URL-osoitteen valitsemalla **Lisää pysyvä suora URL** **Lisää saarna** -avattavasta valikosta. Tämä luo pysyvän yhteyden YouTube-kanavasi suoratoistoon kanavatunnuksesi avulla. Lisätietoja on kohdassa [Suoratoisto](./live-streaming.md).
:::

## Saarnan muokkaaminen

1. Avaa saarnan tiedot napsauttamalla kirjastossasi minkä tahansa saarnarivin **Muokkaa**-painiketta.
2. Päivitä otsikko, puhuja, päivämäärä, kuvaus, pienoiskuva tai medialinkit tarpeen mukaan.
3. Ota muutokset käyttöön napsauttamalla **Tallenna**.

## Saarnan tiedot

Jokainen saarnamerkintä voi sisältää:

- **Otsikko** -- Kävijöille näytettävä saarnan nimi
- **Puhuja** -- Saarnan pitäjä
- **Päivämäärä** -- Julkaisu- tai pitopäivä
- **Kuvaus** -- Yhteenveto saarnan sisällöstä
- **Pienoiskuva** -- Esikatselukuva, joka näkyy saarnakirjastossasi
- **Video- ja äänilinkit** -- URL-osoitteet saarnan mediaan YouTubessa, Vimeossa, Facebookissa tai mukautetussa palvelussa
- **Äänitiedoston URL (podcastia varten)** -- Suora linkki tämän saarnan MP3- tai M4A-tiedostoon. Liitä URL-osoite tai napsauta **Lataa ääni** ladataksesi tiedoston ja täyttääksesi kentän automaattisesti. Podcast-syötteeseen sisällytetään vain saarnat, joissa tämä kenttä (tai suora videotiedoston linkki) on täytetty.

## Podcast-syötteesi

Kun vähintään yhdellä saarnalla on ääni- tai videotiedosto liitettynä, B1 Admin luo kirkollesi podcastin RSS-syötteen automaattisesti. Mitään ei tarvitse ottaa käyttöön. Löydät syötteen saarnaluettelon alapuolella olevasta **Podcast-syöte**-paneelista: napsauta kopiointikuvaketta kopioidaksesi syötteen URL-osoitteen ja lähetä se sitten Apple Podcastsiin, Spotifyyn tai mihin tahansa muuhun podcast-hakemistoon.

:::info
Saarnat, jotka linkittävät vain upotettuun soittimeen (kuten YouTube- tai Vimeo-videotunnukseen), eivät näy podcast-syötteessä, sillä podcast-sovellukset tarvitsevat suoran, ladattavan mediatiedoston. Lisää **Äänitiedoston URL**, jotta saarna sisältyy syötteeseen.
:::

## Saarnan ajoittaminen suoratoistoon

Kun olet lisännyt saarnan, voit ajoittaa sen lähetettäväksi suoratoistosivullesi:

1. Valitse Hyppyvalikosta **Saarnat > Suoratoiston ajat**.
2. Muokkaa jumalanpalvelusta ja valitse **Videoasetukset**-kohdan avattavasta valikosta saarna.
3. Saarna toistetaan ajoitetun jumalanpalveluksen aikana.

:::info
Kun haluat tuoda useita saarnoja kerralla lisäämisen sijaan, käytä [Massatuonti](./bulk-import.md)-työkalua, joka hakee videot suoraan YouTube- tai Vimeo-tililtäsi.
:::

## Seuraavat vaiheet

- [Soittolistat](./playlists.md) -- Järjestä saarnat sarjoiksi
- [Suoratoisto](./live-streaming.md) -- Määritä suoratoistoaikataulusi
- [Massatuonti](./bulk-import.md) -- Tuo useita saarnoja kerralla
