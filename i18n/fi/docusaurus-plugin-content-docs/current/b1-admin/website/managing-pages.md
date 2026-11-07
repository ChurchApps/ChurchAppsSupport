---
title: "Sivujen hallinta"
---

# Sivujen hallinta

<div class="article-intro">

Verkkosivujen sivut -näkymä on keskuspaikkasi kaikkien kirkkosi verkkosivujen sivujen luomiseen, muokkaamiseen ja järjestämiseen. Tästä yhdestä näkymästä voit hallita sekä sivujesi sisältöä että sivustosi navigaatiota.

</div>

<div class="prereqs">
<h4>Ennen aloittamista</h4>

- Suorita [Alkuasetukset](initial-setup), jotta voit määrittää verkkotunnuksen ja sivuston perusasetukset
- Valmistele sisältösi ja kuvasi. Lataa ensin mediatiedostot [Tiedostot](files)-hallinnan kautta.

</div>

:::info
Jos seurakunnallasi on useampi kuin yksi verkkosivusto (esimerkiksi erilliset sivustot kampuksittain), käytä Verkkosivujen sivut -näkymän yläreunan sivustovaihtajaa siirtyäksesi sivustojen välillä. Jokaisella sivustolla on omat sivunsa, navigaationsa ja [ulkoasu](appearance)-asetuksensa.
:::

## Sivutyyppien ymmärtäminen

**Sivut**-taulukko listaa kaikki sivustosi sivut **polun** ja **otsikon** mukaan. Sivuja on kahta tyyppiä:

- **Generoidut** -- Järjestelmän seurakuntasi tietojen perusteella automaattisesti luomat sivut (esimerkiksi ryhmäsivu, saarnasivu tai erillinen sivu jokaiselle kirjastossasi olevalle saarnalle). Nämä sivut näyttävät **Generoitu**-merkin ja päivittyvät itsestään tietojesi muuttuessa.
- **Mukautetut** -- Itse luomasi sivut omalla sisällöllä ja asettelulla.

Voit muuttaa minkä tahansa automaattisesti generoidun sivun mukautetuksi sivuksi, jos haluat täyden hallinnan sen sisällöstä ja suunnittelusta. Napsauta generoidun sivun vieressä **Muunna** ja vahvista valinta.

## Sivujen lisääminen ja muokkaaminen

1. Napsauta **Lisää sivu** -painiketta Verkkosivujen sivut -näkymän oikeassa yläkulmassa.
2. Valitse sivutyyppi (tyhjä tai pohja) ja anna sivulle nimi.
3. Avaa [sivueditori](page-editor) napsauttamalla minkä tahansa sivun vieressä **Muokkaa sisältöä**. Siellä voit lisätä osioita, tekstiä, kuvia ja muita elementtejä.
4. Päivitä sivun otsikko, URL-polku ja muut metatiedot napsauttamalla sivun vieressä **Sivun asetukset**.
5. Avaa julkaistu sivu uudessa välilehdessä napsauttamalla sivun polkua **Polku**-sarakkeessa. Näet silloin tarkalleen, miltä sivu näyttää kävijöille.

:::tip
Aseta etusivusi URL-poluksi pelkkä `/`. Kaikille muille sivuille käytä kuvaavaa polkua, kuten `/about` tai `/contact`.
:::

### Sivun asetukset

Avaa **Sivun asetukset** millä tahansa sivulla ja määritä:

- **Otsikko ja URL-polku** -- Sivun nimi ja sen osoite sivustollasi.
- **Näkyvyys** -- Valitse, kuka sivun voi nähdä: kaikki, vain jäsenet, vain henkilökunta tai tietyn ryhmän jäsenet. Tämä on nopea tapa rajata yksityinen sivu (kuten henkilökunnan resurssisivu) ilman erillistä salasanaa.
- **Metakuvaus** -- Lyhyt yhteenveto, joka näkyy hakukoneiden tuloksissa ja sosiaalisen median linkkien esikatselussa.
- **Uudelleenohjaukset** -- Ohjaa vanha URL-polku tälle sivulle, jotta poistettuun sivuun johtavat linkit ja kirjanmerkit toimivat edelleen.

## Navigaation hallinta

Verkkosivujen sivut -näkymän oikealla puolella oleva **Päänavigaatio**-paneeli näyttää navigaatiolinkkisi. Nämä linkit ohjaavat valikkoa, jonka kävijät näkevät verkkosivustollasi.

1. Luo uusi navigaatiolinkki napsauttamalla **Lisää**. Voit osoittaa linkin mihin tahansa sivustosi sivuun tai ulkoiseen URL-osoitteeseen.
2. Järjestä linkit uudelleen vetämällä ja pudottamalla ne haluamaasi järjestykseen. Voit myös sijoittaa linkkejä pudotusvalikoiden luomiseksi emokohteen alle.
3. Napsauta mitä tahansa linkkiä avataksesi sen **Linkin asetukset**. Niissä voit muuttaa tekstiä, URL-osoitetta tai emosivua.
4. Poistaaksesi linkin navigaatiosta avaa sen **Linkin asetukset** ja napsauta **Poista**.

:::info
Navigaatiolinkin poistaminen ei poista itse sivua. Sivu on edelleen olemassa, ja siihen pääsee suoraan sen URL-osoitteella. Se ei vain enää näy valikossa.
:::

## Sivustolaajuiset kytkimet

**Päänavigaatio**-paneelin linkkien alapuolella on kaksi kytkintä, jotka koskevat koko seurakunnan verkkosivustoa:

- **Näytä kirjautuminen** -- Näyttää **Kirjaudu**-painikkeen verkkosivustosi navigaatiopalkissa.
- **Poista julkinen verkkosivusto käytöstä** -- Sammuttaa julkisen verkkosivustosi. Käytä tätä, jos seurakuntasi käyttää B1:tä vain jäsenportaalinaan, lahjoituksiin ja ilmoittautumisiin ja pitää pääsivustonsa muualla.

### Mitä julkisen verkkosivuston poistaminen käytöstä tekee

Kun **Poista julkinen verkkosivusto käytöstä** on päällä:

- Jokainen julkinen sivu, mukaan lukien etusivu ja mukautetut sivut, ohjaa kirjautumattomat kävijät kirjautumisnäkymään. Kirjauduttuaan sisään he palaavat pyytämälleen sivulle.
- Kirjautuneet jäsenet näkevät koko verkkosivuston normaalisti, mukaan lukien navigaation ja sisäänrakennetut **Generoidut** sivut (kuten Ryhmät ja Saarnat). Generoidut sivut eivät enää näy Sivut-taulukossa.
- Hakukoneille kerrotaan, ettei sivustoa tule indeksoida. Sivukartta on tyhjä, ja `robots.txt` estää kaiken indeksoinnin.

Nämä linkit toimivat edelleen, joten jäsenet ja vierailijat pääsevät niihin:

- Kirjautuminen ja uloskirjautuminen
- Jäsenportaali (kaikki polun `/mobile` alla)
- [Tapahtumailmoittautumisen](../guides/event-registration.md) linkit ja vierailijoiden ilmoittautuminen

Kytkimen alle ilmestyy varoitus, kun julkinen verkkosivusto on pois päältä. Kytke kytkin uudelleen päälle tuodaksesi sivusi takaisin. Mitään ei poisteta sivuston ollessa pois käytöstä.

:::info
Tämä asetus koskee koko seurakuntaasi. Jos sinulla on useampi kuin yksi sivusto, se sammuttaa ne kaikki, ei vain sivustovaihtajassa valittua.
:::

## Vinkkejä sivuston järjestämiseen

- Pidä päänavigaatiosi viidessä tai kuudessa kohdassa, jotta kävijät löytävät asiat nopeasti.
- Käytä sisäkkäisiä linkkejä aiheeseen liittyville alasivuille (esimerkiksi ”Meistä” -pudotusvalikko, jossa on ”Meidän tiimimme”, ”Uskomme” ja ”Historia”).
- Tarkista navigaatio puhelimella, jotta varmistat sen toimivan hyvin pienemmillä näytöillä.
- Anna sivuille selkeät, kuvaavat nimet, jotka auttavat kävijöitä ymmärtämään, mitä he sivulta löytävät.

:::tip
Voit lisätä sivuillesi [lomakkeita](../forms/creating-forms.md), joilla keräät ilmoittautumisia, rukouspyyntöjä tai muita tietoja kävijöiltä.
:::

## Aloittaminen sivupohjasta

Jos rakennat sivustoasi alusta alkaen, voit käynnistää sen **Sivupohjan** avulla sivu kerrallaan luomisen sijaan. Sivupohja luo joukon valmiita sivuja, kuten etusivun, tietoja, yhteys, lahjoitukset ja muita, joissa on paikkamerkkisisältöä ja valmiiksi kytketyt navigaatiolinkit.

1. Napsauta Sivut-näkymässä **Aloita pohjasta** -painiketta (**Lisää sivu** -painikkeen vieressä).
2. Selaa saatavilla olevia pohjia ja napsauta yhtä nähdäksesi sen sivurakenteen.
3. Kun löydät mieluisesi, napsauta **Käytä pohjaa**.
4. Sivut, joita ei vielä ole, luodaan ja lisätään navigaatioon. Olemassa olevat sivut jätetään ennalleen.

Pohjan käyttämisen jälkeen avaa jokainen sivu [sivueditorissa](page-editor) ja korvaa paikkamerkkiteksti ja kuvat seurakuntasi todellisella sisällöllä.

:::info
Sivupohjat luovat sivurakenteen ja navigaation. Ne eivät ohita sivustosi väriteemaa tai fontteja. Niitä hallitaan [Ulkoasu](appearance)-osiossa.
:::

## Kuvan lightbox

Kun kävijät napsauttavat kuvaa verkkosivustollasi, se avautuu koko näytön kokoisena lightbox-peittona. Näin ihmiset voivat katsella valokuvia suuremmassa koossa poistumatta sivulta. Mitään määrityksiä ei tarvita. Lightbox otetaan automaattisesti käyttöön sivusisällön kuville.

## Seuraavat vaiheet

- [Alkuasetukset](initial-setup) -- Ensimmäisen käyttökerran asennusohjeet
- [Sivueditorin käyttäminen](page-editor) -- Opi rakentamaan ja tyylittelemään sivun sisältöä
- [Ulkoasu](appearance) -- Mukauta sivustosi visuaalista teemaa
- [Tiedostot](files) -- Lataa ja hallitse sivujesi mediatiedostoja
