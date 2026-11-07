---
title: "Kampukset"
description: "Määritä B1 Adminissa kampukset, jotta voit seurata henkilöiden ja ryhmien toimipistettä ja suodattaa henkilöt, osallistumiset ja demografian sijainnin mukaan."
---

# Kampukset

<div class="article-intro">

Jos kirkkosi kokoontuu useammassa kuin yhdessä paikassa, **Kampukset** auttavat seuraamaan, mihin toimipaikkaan kukin henkilö ja ryhmä kuuluu. Kun kampukset on määritetty, ne näkyvät vaihtoehtoina henkilöprofiileissa, läsnäolon asetuksissa ja Demografia-näkymässä. Monipaikkaiset seurakunnat voivat suodattaa, hakea ja raportoida kampuksen mukaan kaikkialla B1 Adminissa.

</div>

<div class="prereqs">
<h4>Ennen aloittamista</h4>

- Tarvitset käyttöoikeuden **Muokkaa kirkon asetuksia** kampusten hallintaan. Katso [Roolit ja käyttöoikeudet](./roles-permissions.md).

</div>

## Kampusasetusten avaaminen

Avaa B1 Adminissa [Hyppyvalikko](../introduction.md#getting-around-with-the-jump-menu) (hakupalkki vasemmassa yläkulmassa), valitse **Asetukset > Asetukset** ja napsauta vasemmassa luettelossa **Kampukset**, jolloin siirryt **Kampukset**-osioon. Pääset siihen myös suoraan osoitteessa **/settings/campuses**. Näet luettelon kaikista määritetyistä kampuksista nimineen, sijaintineen ja aikavyöhykkeineen.

## Kampuksen lisääminen

1. Napsauta **Lisää kampus**.
2. Täytä kampuksen tiedot:
   - **Nimi** *(pakollinen)* — näyttönimi, joka näkyy kaikkialla B1 Adminissa (esimerkiksi "Pääkampus" tai "Pohjoiskampus").
   - **Osoite** — kampuksen katuosoite (käytetään tiedoksi; ei ole sama kuin kirkon pääosoite kirkon asetuksissa).
   - **Kaupunki / Osavaltio / Postinumero** — kampuksen sijainti.
   - **Aikavyöhyke** — tämän kampuksen IANA-aikavyöhyke (esimerkiksi *America/Chicago*). Tämän kampuksen jumalanpalvelusten [sisäänkirjautumisaikataulut](../attendance/setup.md#setting-a-check-in-schedule) avautuvat ja sulkeutuvat tässä aikavyöhykkeessä. Jos arvo on **Ei mitään**, käytetään kirkkosi [aikavyöhykettä](./church-settings.md#time-zone). Tämä on hyödyllinen, jos kampukset sijaitsevat eri aikavyöhykkeillä.
   - **Verkkosivusto** — valinnainen URL-osoite kampuksen omille verkkosivuille.
3. Napsauta **Tallenna**.

## Kampuksen muokkaaminen

Napsauta mitä tahansa kampusrivia luettelossa, jolloin sen muokkausnäkymä avautuu oikealle puolelle. Päivitä kentät ja napsauta **Tallenna**.

## Kampuksen poistaminen

Avaa kampus muokattavaksi ja napsauta **Poista**. Sinulta pyydetään vahvistusta. Kampuksen poistaminen ei poista siihen liitettyjä henkilöitä, vaan heidän kampuskenttänsä jää vain tyhjäksi.

## Henkilöiden liittäminen kampukseen

Kampusten luomisen jälkeen henkilökunta voi liittää henkilön kampukseen henkilön profiilista:

1. Avaa henkilön tietue kohdassa **Henkilöt**.
2. Napsauta **Muokkaa**.
3. Valitse kampus **Kampus**-pudotusvalikosta.
4. Napsauta **Tallenna**.

Voit myös päivittää kampuksen useille henkilöille kerralla Henkilöt-sivulta. Valitse useita henkilöitä, käytä **Massamuokkausta** ja aseta Kampus-kenttä kaikille yhdellä kertaa.

## Suodattaminen kampuksen mukaan

Kun kampukset on määritetty, voit suodattaa B1 Adminissa kampuksen mukaan:

- **Henkilöhaku** — lisää Kampus-ehto laajennetussa haussa tai lataa [tallennettu luettelo](../people/lists.md), joka on rajattu kampukseen.
- **Demografia** — [Demografia-näkymässä](../people/demographics.md) näkyy Kampus-rengaskaavio, kun vähintään yhdelle henkilölle on määritetty kampus.
- **Läsnäolon asetukset** — jokainen läsnäoloon liittyvä jumalanpalveluksen ajankohta voidaan liittää kampukseen.

:::tip
Yhden toimipaikan seurakunnan ei tarvitse määrittää kampuksia. Kaikki kampusominaisuudet ovat valinnaisia. Jos kampuksia ei ole, kampuskentät ja kaaviot yksinkertaisesti eivät näy.
:::

## Aiheeseen liittyvät artikkelit

- [Kirkon asetukset](./church-settings.md) — kirkkosi pääosoite ja brändäys (erillään kampusten osoitteista)
- [Demografia](../people/demographics.md) — Kampus-jakaumakaavio
- [Läsnäolon asetukset](../attendance/setup.md) — liitä jumalanpalveluksen ajankohdat kampukseen
- [Massamuokkaus](../people/bulk-editing.md) — liitä kampus useille henkilöille kerralla
