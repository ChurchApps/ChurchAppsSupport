---
title: "B1Appin käyttö"
description: "Löydä tiesi B1.church-jäsenportaalissa puhelimella tai tietokoneella: Koti-kojelauta, alavälilehtipalkki, Lisää-sivu ja Me-sivu."
---

# B1Appin käyttö

<div class="article-intro">

Jäsenportaali B1.churchissa on puhelimelle suunniteltu verkkosovellus, joka toimii polun `/mobile` alla. Se toimii millä tahansa selaimella, ja sen voi asentaa kotinäytölle. Tämä sivu kertoo etusivun koontinäytöstä, alareunan välilehtipalkista, Lisää-sivusta ja Minä-sivusta.

</div>

## Esittelyvideo

<YouTube id="8XKRZvvAbXg" title="Kierros B1.church-jäsensovelluksessa" next="Kierros B1 Check-Inissä" nextUrl="/docs/b1-checkin" />

<div class="prereqs">
<h4>Ennen aloittamista</h4>

- Sinun täytyy [kirjautua sisään](./logging-in.md), jotta näet henkilökohtaiset tietosi. Kirjautumattomat kävijät voivat silti selata julkista sisältöä, ja jos jokin toiminto vaatii tilin, heille näytetään **Kirjaudu sisään** -painike.

</div>

## Etusivu {#home}

Kun avaat osoitteen `https://yourchurchname.b1.church/mobile`, pääset **Etusivu**-koontinäytölle osoitteeseen `/mobile/dashboard`. Etusivu on jäsenportaalin aloitussivu. Sen alussa on tervehdys ("Hyvää huomenta", "Hyvää päivää" tai "Hyvää iltaa" etunimesi kanssa) ja tämänpäivän päivämäärä. Sen jälkeen tulevat osiot, jotka näkyvät vain silloin, kun ne ovat ajankohtaisia:

- **Kuvalaatat** -- seurakuntasi antamat kuvavälilehdet (mukaan lukien Päivän jae) näkyvät kuvalaattoina seurakuntasi nimen alla. Seurakuntasi valinnasta riippuen ne ovat kaksisarakkeisena ruudukkona, vaakasuuntaan pyyhkäistävänä rivinä (joka voi myös liikkua itsekseen) tai listana, jossa on pieni pikkukuva nimen vieressä. Katso [Kotinäytön laatat](../../b1-admin/settings/mobile-app.md#home-screen-tiles). Jokainen kuvavälilehti näkyy täällä, myös sellainen, jolla on oma paikkansa välilehtipalkissa.
- **Viimeisin saarna** -- seurakuntasi uusin saarna, ja linkki **Kaikki saarnat**
- **Päivän jae** -- tämän päivän jae. Napauta sitä, niin avautuu koko [Päivän jae](../content/verse-of-the-day.md) -sivu.
- **Palvelet** -- seuraavat tulevat palvelutehtäväsi ja linkki **Kaikki suunnitelmat**. Jos jokin tehtävä odottaa vastaustasi, ne näytetään ensin merkin **Vastaus tarvitaan** kanssa sekä painikkeilla **Hyväksy** ja **Hylkää**, jolloin voit vastata suoraan Etusivulta (**Hylkää** pyytää ensin vahvistuksen). Muuten seuraavissa tehtävissäsi näkyy merkki **Hyväksytty** tai **Vahvistettu**. Napauta tehtävää, niin avautuu sen suunnitelma.
- **Ryhmäsi** -- enintään kolme ryhmääsi kokoontumisaikoineen ja -paikkoineen sekä linkki **Kaikki ryhmät**
- **Tulevat tapahtumat** -- kun olet kirjautunut sisään, näet seuraavat kolme tulevaa tapahtumaa ryhmistä, joihin kuulut. Jokaisessa on päivämäärä ja kellonaika (sekä pikkukuva, jos tapahtumassa on kuva). Napauta tapahtumaa, niin avautuu sen ryhmän tapahtumat. Napauta **Kaikki tulevat tapahtumat**, niin avautuu koko tulevien tapahtumien luettelo [Minä-sivullasi](./me-page.md#upcoming). Se sisältää myös palvelutehtäväsi ja ilmoittautumisesi.
- **Osallistumiseni** ja **Lomakkeeni** -- jos seurakuntasi on ottanut ne käyttöön, näet kuinka monta kertaa olet osallistunut viimeisten 90 päivän aikana, kaksi viimeisintä käyntiäsi sekä kaksi viimeisintä lomakkeen lähetystäsi. Niissä on linkit koko luetteloihin. Nämä näkyvät aina myös [Minä-sivullasi](./me-page.md) riippumatta asetuksesta. Katso [Kotinäytön osiot](../../b1-admin/settings/mobile-app.md#home-screen-sections).
- **Lahjoitukset** -- kuinka paljon olet lahjoittanut tänä vuonna (”Lahjoitettu” kuluvan vuoden osalta), **Lahjoita**-painike (näkyy vain, jos seurakuntasi tarjoaa verkkolahjoituksia) ja **Historia**-linkki [lahjoitushistoriaasi](../giving/donation-history.md) varten. Osio on piilotettu, jos seurakuntasi on rajoittanut jäsenten lahjoitushistorian aiempaan vuoteen tai piilottanut sen. Tällöin seurakuntasi lahjoitustyökalu näkyy painikkeena kohdassa **Lisää kohteesta**.
- **Lisää kohteesta** *seurakuntasi* -- painikkeet muille työkaluille, jotka seurakuntasi on ottanut käyttöön eivätkä ole jo välilehtipalkissa tai yllä näkyvinä. Eniten käyttämäsi työkalut siirtyvät ensimmäisiksi.

Palvelu-, ryhmä-, osallistumis-, lomake- ja lahjoitusosiot näkyvät vain, kun olet kirjautunut sisään, seurakuntasi on ottanut kyseisen työkalun käyttöön ja sinulla on näytettävää. Esimerkiksi tulevan palvelutehtävän tai vähintään yhden ryhmän tulisi olla olemassa. Tietokoneella Etusivu on jaettu kahteen sarakkeeseen.

Jos et ole kirjautunut sisään, Etusivulla näkyy otsikon **Tervetuloa** sijaan tervehdyksen tilalla lyhyt kehotus ("Kirjaudu sisään nähdäksesi ryhmäsi, lahjoituksesi ja muuta.") sekä **Kirjaudu sisään** -painike. Kehotus näkyy myös silloin, kun seurakuntasi ei ole vielä määrittänyt Etusivulle muuta sisältöä. Seurakuntasi voi muotoilla tekstin uudelleen tai piilottaa sen. Katso [Mobiilisovelluksen asetukset](../../b1-admin/settings/mobile-app.md#home-screen-sign-in-prompt). Kun kehotus on piilotettu, voit silti kirjautua sisään **Lisää**-sivulta tai **Minä**-sivulta.

## Alareunan välilehtipalkki

Puhelimessa välilehtipalkki on kiinnitetty ruudun alareunaan:

- **Etusivu** -- aina ensimmäisenä välilehtenä
- Enintään kolme seurakuntasi määrittämää välilehteä
- **Lisää** -- avaa Lisää-sivun

Sisäänrakennetut näytöt (kuten Ryhmät, Lahjoitukset tai Suunnitelmat) saavat välilehtipaikat ensin. Vapaana olevat paikat menevät seurakuntasi omille sivuille. Ulkoisiin verkkosivuihin johtavat linkit ja Päivän jae eivät koskaan saa omaa välilehteä. Jos seurakuntasi on määrittänyt enemmän välilehtiä kuin mahtuu, loput eivät katoa: ne näkyvät **Lisää**-sivulla ja Etusivun osiossa **Lisää kohteesta**. Seurakunnan ylläpitäjät asettavat välilehtien järjestyksen B1 Adminissa kohdassa **Mobiili → Navigaatio**.

## Tietokoneella

Laajemmalla näytöllä, kuten tietokoneella tai suurella tabletilla, alareunan välilehtipalkin tilalla on ruudun yläreunassa seurakuntasi väreissä oleva otsikkopalkki. Siinä näkyvät seurakuntasi logo tai nimi, jos logoa ei ole asetettu (napsauttamalla pääset takaisin Etusivulle), **Etusivu**, enintään viisi seurakuntasi määrittämää välilehteä ja **Lisää**. Oikealla näkyvät kellokuvake ja profiilikuvasi. Kun avaat yksityiskohtanäytön, sivun sisällön yläpuolelle ilmestyy **Takaisin**-linkki.

## Lisää-sivu

Kun napautat **Lisää**, avautuu Lisää-sivu osoitteeseen `/mobile/more`. Sivulla on:

- Nimesi ja kuvasi sekä linkki **Muokkaa profiilia** -- katso [Profiilin muokkaaminen](./editing-your-profile.md)
- Kaikki seurakuntasi määrittämät välilehdet järjestyksessä seurakuntasi nimen alla. Ulkoisiin verkkosivuihin johtavat linkit avautuvat uudessa selainvälilehdessä.
- **Tili**-osio, jossa on:
  - **Minä** -- henkilökohtainen sivusi (vain kirjautuneille)
  - **Ulkoasu** -- vaihda tilojen **Vaalea tila** ja **Tumma tila** välillä
  - **Ylläpitoportaali** -- näkyy vain, jos sinulla on seurakunnassasi ylläpitäjän oikeudet. Se avaa B1 Adminin uuteen välilehteen.
  - **Asenna sovellus** -- avaa [asennusohjeet](./installing-pwa.md) osoitteessa `/mobile/install`. Painike piilotetaan, kun sovellus on asennettu.
- **Kirjaudu ulos**, tai **Kirjaudu sisään** -painike, jos et ole kirjautunut sisään
- Seurakuntasi nimi ja linkki tietosuojakäytäntöön

## Sovelluspalkki

Puhelimessa jokaisen näytön yläreunassa oleva palkki näyttää seuraavat:

- Seurakuntasi logon (tai nimen, jos seurakunta ei ole ladannut logoa) Etusivulla ja muilla pääsivuilla tai takaisin-nuolen, kun olet siirtynyt yksityiskohtanäytölle. Näytön otsikko näkyy itse sivun yläosassa.
- **Kellokuvakkeen** ilmoituksia ja viestejä varten. Lukemattomat kohteet näkyvät merkkinä. Katso [Ilmoitukset ja viestit](#notifications-and-messages) alempana.
- **Profiilikuvasi**, joka avaa profiilisi osoitteessa `/mobile/profileEdit` -- katso [Profiilin muokkaaminen](./editing-your-profile.md)

Kellokuvake ja profiilikuva näkyvät vain, kun olet kirjautunut sisään.

## Ilmoitukset ja viestit

Kun napautat kellokuvaketta, avautuu paneeli, jossa on kaksi osiota:

- **Viestit** -- uusimmat yksityiset keskustelusi, ja linkki **Uusi viesti** uuden keskustelun aloittamiseksi
- **Ilmoitukset** -- uusimmat ilmoituksesi, ja lukemattomissa on merkki **Uusi**. Napauta ilmoitusta, niin pääset ryhmään, suunnitelmaan tai keskusteluun, josta se tuli.

Kummassakin osiossa näkyy, montako lukematonta kohdetta siinä on. Napauta alareunan **Näytä kaikki** -linkkiä, niin avautuu koko postilaatikkosi osoitteessa `/mobile/notifications`.

## Osioja sisältävät sivut

Yksityiskohtasivut, eli ryhmä, suunnitelma, Minä-sivu sekä Suunnitelmat- ja Lahjoitukset-näytöt, on jaettu osioiksi välilehtien sijaan. Jokainen osio näyttää lyhyen esikatselun. Osion otsikon linkki (kuten **Kaikki jäsenet**, **Kaikki tapahtumat** tai **Koko jumalanpalveluksen järjestys**) avaa koko luettelon. Näkymän yläreunassa oleva **Takaisin kohtaan** -linkki vie sinut takaisin sivulle, josta tulit.

## Minä-sivu

**Minä** (`/mobile/me`) on henkilökohtainen keskuksesi. Siinä näkyvät nimesi ja kuvasi painikkeineen **Muokkaa profiilia** ja **Asetukset** ([ilmoitusasetukset](./notification-preferences.md)). Sen jälkeen tulevat sinua odottavat asiat: palvelutehtävät, tapahtumailmoittautumiset ja ryhmätapahtumat. Seuraavaksi ovat taloutesi, ryhmäsi, tämän vuoden [lahjoituksesi](../giving/index.md), lähettämäsi lomakkeet, osallistumishistoriasi, [ilmoittautumisesi](../events/my-registrations.md) sekä viimeisimmät ilmoituksesi ja viestisi. Katso lisätietoja kohdasta [Minä-sivu](./me-page.md).

Jos et ole kirjautunut sisään, Minä-sivulla näkyy sen sijaan **Kirjaudu sisään** -painike.

## Asentaminen kotinäytölle

Jäsenportaali on progressiivinen verkkosovellus (PWA). Avaa osoite `/mobile/install` tai valitse Lisää-sivulta **Asenna sovellus** saadaksesi laitteellesi sopivat vaiheittaiset ohjeet. Kun sovellus on asennettu, se avautuu koko näytön tilassa kotinäytöltäsi ilman selaimen työkalupalkkeja. Katso [Sovelluksen asentaminen (PWA)](./installing-pwa.md).

## Seurakuntasi julkinen verkkosivusto

Jäsenportaalin ulkopuolella seurakuntasi julkisella verkkosivustolla on oma ylänavigaationsa, jossa on ylläpitäjiesi määrittämiä linkkejä. Mukana ovat sivut kuten [saarnat](../content/sermons.md), [Raamattu](../content/bible.md), [suoratoisto](../content/live-streaming.md) ja julkinen ryhmäluettelo. Puhelimessa nämä linkit ovat otsikon oikeassa yläkulmassa olevan hampurilaiskuvakkeen takana.

:::info
Näkyvät välilehdet ja työkalut vaihtelevat seurakunnittain. Ylläpitäjät säätelevät B1 Adminin kautta, mitkä osiot jäsenet näkevät. Jos et näe tässä kuvattua toimintoa, seurakuntasi ei ehkä ole ottanut sitä käyttöön.
:::
