---
title: "B1 Admin -yleiskatsaus"
---

# B1 Admin -yleiskatsaus

<div class="article-intro">

B1 Admin on seurakuntasi hallintanäkymä. Se tarjoaa työkalut kaikkien seurakunnan toimintojen hallintaan jäsenrekisteristä lahjoituksiin, verkkosivujen rakentamisesta suorien lähetysten järjestämiseen, kaikki yhdestä paikasta.

</div>

## Aloittaminen

1. Avaa selain ja siirry osoitteeseen [admin.b1.church](https://admin.b1.church)
2. Kirjaudu sisään käyttäjätunnuksellasi ja salasanallasi
3. Pääset **Kojelautaan**, aloitussivullesi. Se näyttää tämän viikon jumalanpalveluksen järjestyksen, kuka on sisäänkirjautunut ja palvelee reaaliajassa, asiat, jotka vaativat huomiotasi (kuten odottavat hyväksynnät tai liittymispyynnöt), avoimet tehtäväsi ja ryhmäsi

:::tip
Uusi B1 Adminin käyttäjä? Aloita [esittelystä](./introduction) videoesityksen vuoksi, ja siirry sitten [Asetuksiin](./settings/), jossa voit määrittää seurakuntasi tiedot ja kutsua tiimisi jäseniä.
:::

## Kojelautasi

Kojelauta on B1 Adminin aloitussivu (`/`). Se on rakennettu seurakuntasi viikoittaisen jumalanpalveluksen ympärille:

- **Tämän viikon jumalanpalvelus** -- nykyisen tai tulevan suunnitelman nimi ja jumalanpalveluksen järjestys, linkki koko suunnitelmaan
- **Reaaliaikainen tilanne** -- kun ihmiset alkavat kirjautua sisään sunnuntaina, sivu näyttää, montako on salissa, kuka palvelee tällä hetkellä, ensikertalaiset vierailijat sekä huonekohtaisen erittelyn kapasiteettipalkkeineen
- **Vaatii huomiota** -- odottavat hyväksynnät ja ryhmien liittymispyynnöt, jotka edellyttävät toimenpiteitä
- **Tehtäväni** ja **Ryhmäni** -- avoimet tehtäväsi (lisää uusi painikkeella **Lisää tehtävä** tai napsauta **Kaikki tehtävät** nähdäksesi koko listan) sekä ryhmät, joihin kuulut

Kojelaudan sisältö riippuu [roolistasi](./settings/roles-permissions.md). Esimerkiksi linkki koko suunnitelmaan näkyy vain, jos voit avata sen (voit muokata suunnitelmia, kuulut suunnitelman palvelutyöhön tai palvelet siinä), ja **Kaikki ryhmät** -linkki näkyy vain, jos voit hallita ryhmiä, nähdä ryhmien jäseniä tai nähdä henkilöitä.

:::tip
Jokaisen osion, mukaan lukien Saarnat, Kalenterit, Mobiili ja Asetukset, löydät B1 Adminin vasemmassa yläkulmassa olevasta [Hyppyvalikosta](./introduction.md#getting-around-with-the-jump-menu). Napsauta sitä tai paina **Ctrl+K** (tai **Cmd+K**), ja selaa tai ala kirjoittaa.
:::

## Keskeiset ominaisuudet

- **[Henkilöt](./people/)** - Hallitse seurakuntasi hakemistoa, lisää jäseniä, muokkaa tietoja joukkona ja selaa talouksittain tai lajiteltavana taulukkona. Jokainen henkilö avautuu omalle tietosivulleen, jossa hänen tiedot ovat vasemmalla ja läsnäolon, lahjoitusten, ryhmien, muistiinpanojen ja lomakkeiden yhteenvedot oikealla. Löydä äskettäin lisätyt henkilöt **Lisäyspäivä**-haulla. [Muistiinpanot](./people/notes) -sivu listaa viimeisimmät muistiinpanot henkilöistä, ryhmistä, tapahtumista ja työnkulkukorteista
- **[Ryhmät](./groups/)** - Luo ja järjestä seurakunnan ryhmät liittymispyynnöillä, jäsenhallinnalla, ryhmäsähköpostilla, henkilökohtaisilla ryhmäviesteillä, joissa on uudelleenkäytettäviä tekstipohjia ja Ryhmän nimi -paikkamerkki, sekä tulostettavilla yhteystietoluetteloilla. Jokainen ryhmä avautuu yhdelle sivulle, jossa toimet ovat vasemmalla ja jäsenten, kokousten, kalenterin ja terveystilanteen yhteenvedot oikealla
- **[Läsnäolo](./attendance/)** - Määritä kampukset ja jumalanpalvelusajat, seuraa nimettyä läsnäoloa tulostettavilla luokkien läsnäololistoilla, katso mitkä luokat odottavat vielä läsnäolon kirjaamista, kirjaa yksinkertaisia henkilömääriä trendiraportteineen, anna jokaiselle jumalanpalvelusajalle sisäänkirjautumisaikataulu, jotta itsepalvelu sisäänkirjautuminen aukeaa ja sulkeutuu itsestään kunkin kampuksen aikavyöhykkeen mukaan, ja anna ensikertalaisten vierailijoiden ilmoittautua [QR-koodin](./attendance/check-in#guest-registration-via-qr-code) kautta valitsemillasi kentillä
- **[Lahjoitukset](./donations/)** - Kirjaa lahjoituksia useissa valuutoissa, hallitse rahastoja, kirjaa yksittäinen lahja henkilön tietosivulta, tulosta eriä (yksi kerrallaan tai kaikki päivämäärävälin erät) seurakunnan kirjelomakkeelle rahastojen välisummineen, sulje erät, kun ne on laskettu, tuo erä CSV-tiedostosta, anna laskentatiimien kirjata lahjoituksia **Kirjaa lahjoituksia** -oikeudella, ja luo seurakunnan logolla tulostettavia lahjoitusselvityksiä
- **[Palvelutyö](./serving/)** - Koordinoi vapaaehtoisia, luo palvelusuunnitelmia (tai kopioi suunnitelma viikoittain eteenpäin enintään 12 viikkoa), lähetä muistutuksia push-viestinä, sähköpostilla tai tekstiviestinä, lähetä tekstiviesti kaikille aikataulutetuille **Tekstiviesti vapaaehtoisille** -toiminnolla, hallitse tehtäviä ja siirrä ihmiset vaiheittaisten työnkulkujen läpi, jotka voivat lähettää sähköposteja ja tekstiviestejä, ilmoittaa henkilökunnan jäsenelle, kirjata läsnäoloja ja seurata, ovatko vapaaehtoiset vahvistaneet palvelutehtävänsä. Ajastetut työnkulkusäännöt voivat löytää lakanneet säännölliset lahjoittajat, ja tulostetuista suunnitelmista jätetään tyhjät sarakkeet pois
- **[Lomakkeet](./forms/)** - Rakenna mukautettuja lomakkeita ilmoittautumisiin ja tiedonkeruuseen, lisää otsikkokuva, jaa itsenäisiä lomakkeita QR-koodilla ja liitä lomake ryhmään, jotta sen johtajat voivat lukea ja tulostaa vastaukset
- **[Raportit](./reports/)** - Tarkastele syntymäpäiväraportteja, läsnäoloraportteja ja lahjoitusraportteja
- **[Verkkosivusto](./website/)** - Rakenna ja hallitse seurakuntasi verkkosivustoa mukautetuilla navigointityyleillä, seuraa sivustosi ja B1-sovelluksesi käyntejä GA4-tunnuksellasi tai poista julkinen sivusto käytöstä ja pidä vain jäsenportaali
- **[Saarnat](./sermons/)** - Hallitse saarnakirjastoasi, suoria lähetyksiä ja automaattista podcast-syötettä
- **[Kalenterit](./calendars/)** - Luo kuratoituja kalentereita, hallitse huone- ja resurssivarauksia ja tarkastele saatavuutta. Tee [tapahtumailmoittautumisia](./calendars/paid-registrations) hinnoitelluilla osallistujatyypeillä, lisää osallistujia käsin veloittamatta heitä ja anna ihmisten ilmoittautua ja maksaa myöhemmin, kun seurakunnalla ei ole verkkolahjoituksia
- **[Asetukset](./settings/)** - Määritä kaikki yhdeltä vieritettävältä sivulta pikahyppyluettelolla: seurakunnan tiedot, alue, päivämäärä- ja puhelinnumeromuoto, tekstiviestit (mukaan lukien oma Twilio-tilisi), roolit jäsenmäärineen, oikeudet ja mukautetut henkilökentät

:::info
Napsauta kysymysmerkkikuvaketta minkä tahansa sivun oikeassa yläkulmassa saadaksesi nopean pääsyn ohjeisiin ja dokumentaatioon. Voit vaihtaa väriteeman (**Oletus**, **Klassinen** tai **Mukautettu**) tai vaihtaa vaalean ja tumman tilan välillä avaamalla käyttäjävalikkosi ja käyttämällä **Teemasasetuksia**. Suojaa tilisi todennussovelluksen koodilla ottamalla profiilissasi käyttöön [Kaksivaiheisen kirjautumisen](./profile/managing-profile#two-factor-sign-in).
:::

Tukea varten lähetä sähköpostia osoitteeseen [support@churchapps.org](mailto:support@churchapps.org).
