---
title: "Roolit ja käyttöoikeudet"
description: "Määritä B1 Adminissa roolit, jotka säätelevät henkilökunnan ja vapaaehtoisten näkyvyyttä ja muokkausoikeuksia lahjoituksista henkilöihin ja ryhmiin."
---

# Roolit ja käyttöoikeudet

<div class="article-intro">

Roolien avulla voit hallita, mihin eri käyttäjät pääsevät ChurchApps-tililläsi. Voit luoda mukautettuja rooleja henkilökunnalle, vapaaehtoisille ja muille tiimin jäsenille, ja jokaiselle voi antaa oman käyttöoikeustasonsa, jotta tietosi pysyvät turvassa.

</div>

## Koulutusvideo

<YouTube id="ZzCIkinVMnE" title="Roolit, käyttöoikeudet ja tiimin kutsuminen B1:ssä" next="Palvelujen ja läsnäolon määrittäminen B1:ssä" nextUrl="/docs/b1-admin/attendance/setup" />

<div class="prereqs">
<h4>Ennen aloittamista</h4>

- Tarvitset Domain Admin -oikeudet tai roolin, jolla on oikeus hallita rooleja
- Varmista, että sinulla on luettelo tiimin jäsenistä ja alueista, joihin heidän pitää päästä
- Tutustu alla oleviin käyttöoikeusluokkiin, jotta voit suunnitella roolit

</div>

## Roolien avaaminen

1. Avaa B1 Adminissa [Jump-valikko](../introduction.md#getting-around-with-the-jump-menu) (hakupalkki vasemmassa yläkulmassa) ja laajenna **Asetukset**.
2. Napsauta **Roolit**.
3. Roolit-sivulla näkyvät kaikki seurakuntasi tällä hetkellä määritellyt roolit. **Jäsenet**-sarake näyttää, kuinka monta käyttäjää kussakin roolissa on, ja **(Kaikki)**-rivillä lukee **Kaikki käyttäjät**.

## Roolit-sivun rakenne

Roolit-sivu on jaettu kahteen paneeliin:

- **Vasen puoli** -- Näyttää valitussa roolissa olevien jäsenten luettelon.
- **Oikea puoli** -- Näyttää roolille määritettävät käyttöoikeusasetukset.

Napsauta mitä tahansa roolin nimeä, jos haluat tarkastella ja hallita sen jäseniä ja käyttöoikeuksia.

## Käyttäjien lisääminen rooliin

1. Valitse rooli, johon haluat lisätä jäseniä.
2. Etsi henkilö vasemmalla puolella olevan **hakukentän** avulla.
3. Valitse henkilö hakutuloksista.
4. Henkilö lisätään rooliin heti.

## Käyttäjien poistaminen roolista

1. Valitse rooli, jossa poistettava käyttäjä on.
2. Etsi henkilö vasemmalla puolella olevasta jäsenluettelosta.
3. Napsauta hänen nimensä vieressä olevaa **poistopainiketta**.

## Käyttöoikeuksien määrittäminen

Jokaiselle roolille voidaan myöntää pääsy tiettyihin B1 Adminin osiin. **Muokkaa käyttöoikeuksia** -paneelissa käyttöoikeudet on ryhmitelty osioihin, jotka voit laajentaa, kuten **Läsnäolo**, **Sisältö**, **Lahjoitukset**, **Lomakkeet ja suunnitelmat**, **Oppitunnit**, **Viestintä**, **Henkilöt ja ryhmät** ja **Tehtävät**. Kirjoita **Suodata käyttöoikeuksia** -ruutuun, jos haluat näyttää vain vastaavat käyttöoikeudet.

Valitse tai poista valinta käyttöoikeudesta, jos haluat myöntää tai poistaa sen roolilta. Jokaisen osion otsikko näyttää, kuinka monta sen käyttöoikeutta roolilla on, esimerkiksi **2 / 5**, ja luku päivittyy, kun valitset tai poistat valintoja.

### Lahjoitusten käyttöoikeudet

**Lahjoitukset**-osiossa on nämä käyttöoikeudet:

- **Näytä lahjoitusyhteenvedot** -- näet Lahjoitukset-osion, mukaan lukien Yhteenveto-, Erät-, Rahastot-, Kampanjat- ja Lahjoitustodistukset-sivut.
- **Näytä lahjoitukset** -- näet yksittäiset lahjoitukset, kuten erän sisältämät lahjat.
- **Muokkaa lahjoituksia** -- täysi hallinta: voit lisätä, muokata ja poistaa lahjoituksia ja eriä sekä [sulkea ja avata eriä uudelleen](../donations/batches.md#closing-and-reopening-a-batch).
- **Syötä lahjoituksia** -- voit lisätä eriä sekä syöttää, muokata ja poistaa lahjoituksia, mutta vain erissä, jotka ovat vielä auki. Henkilöt, joilla on vain tämä käyttöoikeus, eivät voi poistaa eriä, sulkea tai avata niitä eivätkä muuttaa verkkolahjoituksina tulleita lahjoituksia.
- **Muokkaa asetuksia** -- hallitse lahjoitusasetuksia.

Henkilö, jolla on **Syötä lahjoituksia** -käyttöoikeus mutta ei **Näytä lahjoitusyhteenvedot** -käyttöoikeutta, näkee Lahjoitukset-kohdassa vain **Erät**-sivun. Anna laskentatiimin roolille sekä **Syötä lahjoituksia**- että **Näytä lahjoitukset** -käyttöoikeus, jotta he voivat avata erän ja nähdä syöttämänsä lahjat. Lisätietoja on kohdassa [Kuka voi muuttaa erää](../donations/batches.md#who-can-change-a-batch).

### Vain henkilöiden nimet

**Henkilöt ja ryhmät** -osioon kuuluu **Näytä vain henkilöiden nimet** -käyttöoikeus. Käytä sitä vapaaehtoisille, jotka tarvitsevat henkilöiden etsimiseen nimellä -- esimerkiksi valitakseen jonkun hakukentästä -- ilman pääsyä koko hakemistoon. Pelkällä tällä käyttöoikeudella henkilö:

- Voi hakea henkilöitä nimellä ja nähdä äskettäin lisättyjen henkilöiden luettelon, mutta näkee vain kunkin henkilön nimen, valokuvan ja jäsenyyden tilan
- Ei voi hakea sähköpostiosoitteella, nähdä yhteystietoja tai avata **Henkilöt**-hakemistoa

Yhdistä **Näytä vain henkilöiden nimet** **Näytä läsnäolo**- tai **Muokkaa läsnäoloa** -käyttöoikeuteen vapaaehtoisille, jotka kirjaavat luokkien läsnäoloa. Tällöin valikon **Henkilöt** kohta avaa **Ryhmät**-sivun, jolta he voivat avata **Kaikki ryhmät** -luettelon ja nähdä kunkin luokan jäsenten nimet ja istunnot. **Muokkaa läsnäoloa** -käyttöoikeudella he voivat myös [kirjata läsnäolon](../attendance/recording-attendance.md) ja lisätä vierailijoita hakemalla heidän nimiään. Nimet eivät ole linkkejä henkilötietueisiin, ja luottamukselliset ryhmät pysyvät piilossa, ellei vapaaehtoinen ole ryhmän jäsen.

B1 Admin piilottaa linkit ja painikkeet, jotka vaativat käyttöoikeuksia, joita roolilla ei ole. Esimerkiksi **Kaikki ryhmät** -luettelo on käytettävissä vain henkilöille, jotka voivat muokata ryhmiä, nähdä ryhmän jäseniä tai henkilöitä, tai joilla on **Näytä vain henkilöiden nimet** yhdessä **Näytä läsnäolo** tai **Muokkaa läsnäoloa** -käyttöoikeuden kanssa (muut ohjataan takaisin Kojelautaan). Läsnäolon asetukset näkyvät vain **Muokkaa palveluja** -käyttöoikeudella. Ryhmän **Sähköposti**-painike näkyy vain henkilöille, joilla on **Muokkaa ryhmän jäseniä** -käyttöoikeus (sitä tarvitaan ryhmäsähköpostin lähettämiseen). Ryhmän jäsenluettelon tulostamiseen tarvitaan **Näytä ryhmän jäsenet** -käyttöoikeus tai ryhmän johtaminen. Kalenteritapahtuman poistaminen vaatii **Muokkaa sisältöä** -käyttöoikeuden (tai oman odottavan pyynnön peruuttamisen).

### Kirjautumistilit kioskilla

Tilillä, jolla kirjaudutaan [B1 Checkin](../../b1-checkin/getting-started/logging-in.md) -kioskille, on oltava **Sisäänkirjaus**-käyttöoikeus **Läsnäolo**-osiossa (tai **Muokkaa läsnäoloa**). Pelkällä **Sisäänkirjaus**-käyttöoikeudella kioski voi hakea perheitä nimellä tai puhelinnumerolla, kirjata ne sisään ja ulos sekä näyttää, kuka saa noutaa lapsen, ilman pääsyä Henkilöt-hakemistoon.

Sisäänkirjausta ei enää myönnetä **(Kaikki)**-rivin kautta. Se, että henkilö on roolissa, jolla on muita käyttöoikeuksia, ei anna hänelle oikeutta käyttää kioskia. Lisää **Sisäänkirjaus** roolille, kuten "Sisäänkirjauksen vapaaehtoiset", ja lisää kioskitilit siihen.

:::warning
**Domain Adminilla** on täysi pääsy kaikille ChurchApps-tilisi osille. Heidän käyttöoikeuksiaan ei voi muokata tai rajoittaa. Käytä tätä roolia vain luotetuimmille ylläpitäjillesi.
:::

:::tip
Luo erityisiä rooleja, kuten "Rahastonhoitaja", jolla on vain **Lahjoitukset**-käyttöoikeus, "Laskentatiimi", jolla on **Syötä lahjoituksia** ja **Näytä lahjoitukset** -käyttöoikeudet, tai "Sisäänkirjauksen vapaaehtoinen", jolla on vain **Läsnäolo**-käyttöoikeus. Tämä noudattaa vähimmän oikeuden periaatetta ja pitää tietosi turvassa. Lisätietoja siitä, miten ChurchApps suojaa tietojasi, on kohdassa [Tietoturva](./data-security.md).
:::
