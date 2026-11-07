---
title: "Työnkulut"
---

# Työnkulut

<div class="article-intro">

Työnkulut siirtävät ihmisiä vaiheiden läpi visuaalisella taululla. Jokainen henkilö on kortti, joka etenee vaiheesta toiseen: ensikertalaisvieraan seurannasta jäsenyysprosessiin ja ensilahjoittajan kiitospostiin, tai mihin tahansa muuhun, missä monia ihmisiä pitää seurata samojen vaiheiden läpi. Vaihe voi pyytää vapaaehtoista tekemään jotain (soittaa puhelu, käydä keskustelu) **ja** suorittaa itsenäisesti automaattisia toimintoja, kuten lähettää sähköpostin tai tekstiviestin, odottaa muutaman päivän tai lisätä henkilön ryhmään. Näin työnkulut hoitavat sekä ihmisen tekemän seurannan että sen ympärillä olevan rutiinityön. Työnkulut laajentavat [Tehtävät](./tasks.md) -toiminnon vedettäväksi Kanban-taululle, jotta kukaan ei putoa raoista.

</div>

<div class="prereqs">
<h4>Ennen aloittamista</h4>

- Varmista, että seurattavat henkilöt ovat olemassa B1 Adminissa
- Tutustu siihen, miten [Tehtävät](./tasks.md) toimivat, koska taulun jokainen kortti on tehtävä
- Jotta voit käyttää **Lähetä sähköposti** -toimintoa, luo ensin haluamasi sähköpostipohjat (hallitaan kohdassa **Asetukset → Sähköpostipohjat**)
- Jotta voit käyttää **Lähetä tekstiviesti** -toimintoa, yhdistä ensin [tekstiviestipalveluntarjoaja](../settings/church-settings.md#texting)
- Tarvitset sopivat Tehtävät-oikeudet. Korttien katselu, muokkaus ja työnkulkujen hallinta ovat erillisiä oikeustasoja (katso [Roolit ja oikeudet](../settings/roles-permissions.md))

</div>

## Työnkulkujen katselu

Avaa [Hyppyvalikko](../introduction.md#getting-around-with-the-jump-menu) (B1 Adminin yläreunan hakupalkki), laajenna kohta **Palveleminen** ja napsauta **Työnkulut**. Työnkulut näkyvät taulukossa, jossa on kunkin työnkulun **Luokka** ja **Tila** (**Aktiivinen** tai **Passiivinen**). Jos käytät luokkia, luettelon yläpuolella olevat välilehdet suodattavat luettelon luokan mukaan. Avaa työnkulun taulu napsauttamalla sitä.

## Työnkulun luominen

1. Napsauta Työnkulut-sivulla **Lisää työnkulku**.
2. Valitse, miten aloitat:
   - **Tyhjä työnkulku** -- aloita alusta ja rakenna omat vaiheesi.
   - **Pohjasta** -- aloita valmiilla vaiheiden joukolla, jota voit muokata. Sisäänrakennettuja pohjia ovat:
     - **Uuden vierailijan seuranta** -- Lähetä tervetuloviesti → Henkilökohtainen puhelu → Kutsu seuraavaan vaiheeseen → Yhteydessä
     - **Jäsenyysluokka** -- Ilmaise kiinnostus → Ilmoittaudu luokalle → Osallistu luokalle → Suorita jäsenyys
     - **Ensilahjoittajan kiitos** -- Lähetä kiitoskirje → Jaa lahjoituksen vaikutus → Hoidettu
     - **Palvelutehtävän vahvistus** -- Pyydä vastausta ja odota sitä → Soita vapaaehtoiselle vastaamattomasta pyynnöstä (katso [Palvelutehtävien vahvistukset](#serving-assignment-confirmations))

   Pohjan vaiheiden rakentaminen voi kestää hetken. Sen aikana **Lisää työnkulku** -painike näyttää tekstin **Luodaan...** eikä sitä voi napsauttaa uudelleen, joten päällekkäisiä työnkulkuja ei synny. Jos jokin menee pieleen, sivulla näkyy teksti *”Työnkulkua ei voitu luoda. Yritä uudelleen.”*
3. Anna työnkululle **Nimi**.
4. Halutessasi valitse **Luokka**, jotta liittyvät työnkulut ryhmittyvät yhteen. Voit luoda uuden luokan suoraan pudotusvalikosta.
   Tyhjän työnkulun kohdalla valitset myös sen **Työnkulun tarkoituksen**: **Ihmisten seuranta** (tavallinen tyyppi) tai **Palvelutehtävän vahvistus**. Tarkoitusta ei voi muuttaa työnkulun luomisen jälkeen.
5. Jätä työnkulku **Aktiiviseksi**, jotta ihmisiä voi lisätä siihen, tai aseta se **Passiiviseksi**, jolloin se piilotetaan lisäyslistoista.
6. Napsauta **Tallenna**.

:::tip
Käytä Työnkulut-luettelon **Monista**-painiketta kopioidaksesi olemassa olevan työnkulun, mukaan lukien sen vaiheet, automaattiset toiminnot ja reititys, uuden työnkulun lähtökohdaksi.
:::

## Taulun rakentaminen vaiheilla

Jokainen työnkulun taulu koostuu **vaiheista**, jotka näkyvät sarakkeina vasemmalta oikealle. Avaa työnkulku ja luo jokainen prosessisi vaihe painikkeella **Lisää vaihe**.

Kun lisäät tai muokkaat vaihetta, voit määrittää seuraavat asetukset:

- **Vaiheen nimi** -- sarakkeen otsikko (esimerkiksi ”Tervetulopuhelu” tai ”Odottaa ilmoittautumista”).
- **Määräaika (päivinä)** -- asettaa eräpäivän automaattisesti, kun kortti siirtyy tähän vaiheeseen. Eräpäivän ohittaneet kortit merkitään **Myöhässä**-tilaan.
- **Oletusvastuuhenkilö** -- henkilö tai ryhmä, jolle tämän vaiheen uudet kortit määräytyvät automaattisesti. Jos oletusvastuuhenkilö on henkilö, hän saa ilmoituksen, kun kortti on määrätty hänelle.
- **Automaattiset toiminnot** -- järjestelmän itsenäisesti suorittamat toimet, kun kortti saapuu (katso alla).
- **Reititys** -- minne kortti siirtyy, kun se poistuu vaiheesta (katso [Reititys](#routing-cards-with-outcomes-and-conditions)).

Raahaa vaihesarakkeet prosessisi mukaiseen järjestykseen. Järjestys määrittää myös oletusreitin, jota kortti kulkee, kun mikään muu reititys ei sovellu.

:::info
Tallenna uusi vaihe ensin. Automaattiset toiminnot ja reititys liittyvät vaiheeseen, joten editori avaa nämä osiot vasta, kun vaihe on olemassa.
:::

## Automaattiset toiminnot

Jokaisessa vaiheessa voi olla luettelo **automaattisista toiminnoista**, jotka suoritetaan itsestään heti, kun kortti **saapuu** vaiheeseen, ennen kuin kukaan koskee siihen. Näin vaihe sekä kehottaa vapaaehtoista että hoitaa seurantaan liittyvän rutiinityön.

Avaa vaiheen editorissa **Automaattiset toiminnot**, napsauta **Lisää toiminto**, valitse tyyppi ja täytä sen asetukset. Lisää niin monta kuin tarvitset; ne suoritetaan **ylhäältä alas järjestyksessä**. Tallenna vaihe napsauttamalla **Tallenna** tallentaaksesi vaiheen ja kaikki sen toiminnot yhdessä. Toiminnon poistaminen roskakorikuvakkeella tulee voimaan heti.

| Toiminto | Mitä se tekee |
|---|---|
| **Lähetä sähköposti** | Lähettää henkilölle valitsemasi sähköpostipohjan. Voit ohittaa aihekentän. |
| **Lähetä tekstiviesti** | Lähettää henkilölle kirjoittamasi viestin kirkkosi [tekstiviestipalveluntarjoajan](../settings/church-settings.md#texting) kautta. |
| **Odota** | Pysäyttää kortin määrän päiviä ennen jatkamista (katso alla). |
| **Lisää ryhmään** | Lisää henkilön valitsemaasi [ryhmään](../groups/index.md). |
| **Poista ryhmästä** | Poistaa henkilön valitsemastasi ryhmästä. |
| **Kirjaa osallistuminen** | Merkitsee henkilön läsnäolevaksi ryhmän käynnissä olevaan palvelukertaan (katso alla). |
| **Lisää työnkulkuun** | Aloittaa henkilön toisessa työnkulussa -- hyödyllinen prosessien välillä siirtymiseen. |
| **Lisää muistiinpano** | Tallentaa muistiinpanon kortin historiaan. |
| **Aseta kenttä** | Päivittää henkilön tietueen kentän: Jäsenyyden tila, Siviilisääty, Sukupuoli, Kaupunki, Osavaltio tai Postinumero. |
| **Webhook** | Lähettää kortin tiedot antamaasi ulkoiseen verkko-osoitteeseen (URL), jotta voidaan yhdistää muihin järjestelmiin. |
| **Luo tehtävä** | Luo [tehtävän](./tasks.md) antamallasi otsikolla ja kuvauksella, määrättynä valitsemallesi henkilölle. |
| **Ilmoita henkilölle** | Lähettää valitsemallesi työntekijälle tai vapaaehtoiselle sähköpostin ja B1-ilmoituksen kortista (katso alla). |

Kun kaikki vaiheen toiminnot ovat valmiit, kortti **jää kyseiseen vaiheeseen**, jotta joku voi käsitellä sitä -- paitsi jos vaiheessa on automaattinen reitti, joka siirtää kortin eteenpäin (katso [Täysin automaattiset vaiheet](#fully-automated-steps)).

:::info
Automaattiset toiminnot suoritetaan vain, kun kortti saapuu normaalia reittiä pitkin -- kun se lisätään ensimmäisen kerran, kun tulos tai automaattinen reitti tuo sen tai kun Odota-toiminto päättyy. Niitä **ei** suoriteta uudelleen, kun työntekijä siirtää kortin vaiheeseen käsin tai palauttaa sen, joten henkilö ei saa samaa sähköpostia kahdesti.
:::

### Sähköpostin lähettäminen

Valitse **Lähetä sähköposti**, valitse yksi sähköpostipohjistasi ja kirjoita halutessasi mukautettu aihe. Kun kortti saapuu vaiheeseen, henkilö saa sähköpostin automaattisesti. (Jos henkilöllä ei ole tallennettua sähköpostiosoitetta, vaihe ohittaa tämän toiminnon.) Pohjan [yhdistelykentät](../settings/email-templates.md#merge-fields), kuten `{{firstName}}`, täytetään henkilön omilla tiedoilla.

Kun sähköposti lähtee, kortin historiaan kirjataan **Sähköposti lähetetty**. Jos sitä ei voida lähettää -- esimerkiksi koska kirkkosi sähköpostia ei ole vielä hyväksytty tai päivittäinen raja on saavutettu -- merkintää ”Sähköposti lähetetty” ei lisätä.

:::info
Työnkulkujen sähköpostit lähtevät vasta, kun kirkkosi on hyväksytty lähettämään ryhmäsähköposteja, ja ne lasketaan kirkkosi päivittäiseen sähköpostirajaan. Katso [Ryhmäsähköpostin käyttöönotto kirkollesi](../groups/group-members.md#turning-on-group-email-for-your-church). Toiminto **Lähetä sähköposti** varoittaa vaiheen editorissa, kun nämä sähköpostit eivät lähde: *”Kirkkosi sähköpostia ei ole vielä hyväksytty...”*, jos hyväksyntä on kesken, tai *”Kirkkosi sähköposti on keskeytetty...”*, jos viimeaikaiset viestit ovat palautuneet tai merkitty roskapostiksi.
:::

### Osallistumisen kirjaaminen

Valitse **Kirjaa osallistuminen** ja napsauta **Valitse ryhmä** valitaksesi ryhmän, jolle osallistuminen kirjataan. Kun toiminto suoritetaan, henkilö merkitään läsnäolevaksi ryhmän käynnissä olevaan palvelukertaan -- aivan kuten jos hän olisi kirjautunut sisään. Tämä on hyödyllistä yhdessä laukaisimen kanssa, joka lisää ihmisiä työnkulkuun heidän saapuessaan, jolloin heidät lasketaan ilman erillistä sisäänkirjautumista.

- Osallistuminen mitataan sillä hetkellä, kun kortti **luotiin**, joten työnkulun aiemmat **Odota**-vaiheet eivät siirrä sitä palvelun ohi.
- Vain palvelukerrat, joille on määritetty päivä ja aloitusaika, lasketaan. Jos mikään ryhmän palvelukerroista ei ole käynnissä sillä hetkellä, mitään ei kirjata ja kortin historiaan tulee merkintä **Ei ajoitettua palvelua käynnissä -- osallistumista ei kirjattu**.
- Kun osallistuminen kirjataan, kortin historiassa näkyy **Osallistuminen kirjattu** ja sen perässä ryhmän nimi. Toiminnon suorittaminen uudelleen samalle palvelukerralle ei laske henkilöä kahdesti.

### Henkilön ilmoittaminen

Valitse **Ilmoita henkilölle**, napsauta **Valitse henkilö** ja kirjoita halutessasi **Viesti**. Kun kortti saapuu vaiheeseen, kyseinen henkilö saa sähköpostin ja B1-ilmoituksen, jossa on kortilla olevan henkilön nimi, työnkulun ja vaiheen nimet, viestisi sekä linkki kortin avaamiseen. Käytä tätä antamaan työntekijälle tai seurakunnan vastuuhenkilölle tiedoksi asiasta -- esimerkiksi *”Ilmoita pastorille, kun joku saavuttaa Jäsenyyshaastattelu-vaiheen.”* Kortin historiaan kirjataan **Ilmoitettu** ja henkilön nimi.

### Tekstiviestin lähettäminen

Valitse **Lähetä tekstiviesti** ja kirjoita **Tekstiviesti** (enintään 1 600 merkkiä). Kun kortti saapuu vaiheeseen, henkilö saa tekstiviestin matkapuhelimeensa. Voit personoida viestin napsauttamalla viestikentän alla olevaa merkkiä -- **Etunimi**, **Sukunimi**, **Näyttönimi** tai **Kirkon nimi** -- jolloin kohdistimen kohtaan lisätään `{{firstName}}`, `{{lastName}}`, `{{displayName}}` tai `{{churchName}}`. Jokainen täytetään henkilön tiedoilla, kun viesti lähetetään.

- Jos henkilöllä ei ole tallennettua matkapuhelinnumeroa, viestiä ei lähetetä ja kortin historiaan kirjataan **Tekstiviesti ohitettu: ei matkapuhelinta**.
- Jos henkilö on kieltäytynyt viesteistä, viestiä ei lähetetä ja kortin historiaan kirjataan **Tekstiviesti ohitettu: kieltäytynyt**.
- Kun tekstiviesti lähtee, kortin historiaan kirjataan **Tekstiviesti lähetetty**. Jos lähetys epäonnistuu -- esimerkiksi koska tekstiviestipalveluntarjoajaa ei ole yhdistetty tai kirkkosi tekstiviestikrediitit ovat loppuneet -- virhe kirjataan kortin historiaan, ja vaiheen jäljellä olevat toiminnot suoritetaan silti.

:::warning
Tekstiviestit lähetetään kirkkosi omaa [tekstiviestipalveluntarjoajaa](../settings/church-settings.md#texting) käyttäen. Jos palveluntarjoajaa ei ole yhdistetty, toiminnon editori varoittaa *”Tekstiviestipalveluntarjoajaa ei ole määritetty”*, eikä tekstiviestejä lähetetä.
:::

### Odottaminen muutaman päivän ajan (tiputussarjat)

Toiminto **Odota** pitää korttia asettamasi päivämäärän ajan. Odottamisen aikana kortin tilana näkyy **Lykätty**. B1 tarkistaa päättyneet odotukset 30 minuutin välein, joten kortti jatkaa puolen tunnin sisällä odotuksen päättymisestä. Kun odotus on ohi:

1. Kaikki **saman vaiheen jäljellä olevat toiminnot** suoritetaan -- joten voit rakentaa tiputussarjan, kuten **Lähetä sähköposti → Odota 3 päivää → Lähetä muistutussähköposti**.
2. Jos vaiheessa on automaattinen reitti, kortti siirtyy eteenpäin. Muussa tapauksessa se jää vaiheeseen, jotta joku voi ottaa sen käsiteltäväksi.

:::tip
**Odota**-toiminto vaiheen alussa on yksinkertainen tapa ”pidättää” kortti ennen kuin se näytetään vapaaehtoiselle -- esimerkiksi *Odota 7 päivää, sitten valmentaja ottaa yhteyttä*.
:::

## Ihmisten lisääminen kortteina

Ihmisiä voi lisätä tauluille useilla tavoilla:

- **Taulusta** -- Napsauta **Lisää kortti** vaihesarakkeen alareunassa ja valitse henkilö. Voit myös valita ryhmän, jolloin jokainen ryhmän jäsen lisätään kortiksi.
- **Henkilön tietueesta** -- Käytä henkilön sivulla **Lisää työnkulkuun** -toimintoa lisätäksesi hänet työnkulkuun.
- **Henkilöhaun kautta** -- Valitse useita henkilöitä ja käytä massatoimintoa **Lisää työnkulkuun** lisätäksesi heidät kaikki kerralla.
- **Automaattisesti laukaisimella** -- Lisää ihmisiä, kun jokin tapahtuu, kuten lomakkeen lähetys tai ensimmäinen lahjoitus (katso alla oleva [Laukaisimet](#triggers)).

Henkilön lisääminen käsin tai vaiheen **Lisää työnkulkuun** -toiminnolla ei koskaan anna hänelle toista avointa korttia samaan työnkulkuun. Jos hänellä on jo avoin kortti, hänet ohitetaan (massalisäyksessä uusia kortteja saavat vain ne henkilöt, joilla ei ole sellaista). Kun kortti on suljettu, henkilön voi lisätä uudelleen. Laukaisimet noudattavat sen sijaan omaa asetustaan **Vain kerran henkilöä kohden**.

## Taulun käsitteleminen

Avaa työnkulku nähdäksesi sen taulun. Jokainen kortti näyttää henkilön nimen, kenelle kortti on määrätty sekä eräpäivän tai tilan merkin (**Myöhässä** tai **Lykätty**). Vaihesarake näyttää myös pienet merkit niistä automaattisista toiminnoista, joita se suorittaa, sekä reititystietoja. Näin näet yhdellä silmäyksellä, miten kortit kulkevat.

- **Siirrä kortti** -- Raahaa kortti yhdestä sarakkeesta seuraavaan henkilön edistyessä.
- **Avaa kortti** -- Kaksoisnapsauta korttia (tai napsauta sitä), niin avautuu sen tietolaatikko, jossa voit vaihtaa vaihetta, määrätä korttia uudelleen, lisätä muistiinpanoja ja tarkastella jo tapahtunutta.

Kortin tietolaatikosta voit:

- **Määrätä** kortin toiselle henkilölle tai ryhmälle.
- **Lykätä** korttia 1 päivällä, 3 päivällä tai 1 viikolla piilottaaksesi sen eräpäivän väliaikaisesti.
- **Palauttaa** kortin edelliseen vaiheeseen tai **Ohittaa** sen seuraavaan vaiheeseen.
- **Lukitse vastuuhenkilö** -- säilytä sama vastuuhenkilö kortilla, vaikka se siirtyy vaiheiden välillä. Oletuksena kortin siirtäminen uuteen vaiheeseen määrää sen vaiheen oletusvastuuhenkilölle. Lukitseminen pitää nykyisen henkilön vastuussa koko ajan.
- **Merkitse valmiiksi** kortti viimeistelläksesi sen, tai valitse **Tulos**-painike, jos vaiheeseen on määritetty tuloksia (katso [Reititys](#routing-cards-with-outcomes-and-conditions)).
- **Poista kortti** -- Poista kortti taulusta viimeistelemättä sitä, esimerkiksi jos joku lisättiin virheellisesti. Vahvistuksen jälkeen kortti suljetaan ja poistetaan kaikkien listalta. Tuloksia, reittejä tai vaiheen toimintoja ei suoriteta, ja kortin historia säilyy merkinnällä **Poistettu**. Jos kyse on [palvelutehtävän vahvistuksesta](#serving-assignment-confirmations), kortin poistaminen sulkee pyynnön samalla tavalla.
- **Lisää muistiinpanoja** ja tarkastele kortin **Toimintaa** -- automaattisten toimintojen lokia (lähetetyt sähköpostit, odotukset jne.), jokaisen merkinnän päivämäärän ja kellonajan kanssa.

Henkilöä koskevan kortin tietolaatikko näyttää myös henkilön matkapuhelinnumeron ja sähköpostiosoitteen linkkeinä, joita napsauttamalla voit soittaa tai lähettää sähköpostia. Lisäksi siinä on linkki **Näytä profiili**, jos sinulla on oikeus katsoa henkilöitä. Kortille määrätty henkilö näkee puhelinnumeron ja sähköpostiosoitteen myös ilman pääsyä Henkilöihin.

Muistiinpanot tallennetaan kortin yhteyteen. Kuka tahansa, joka voi avata kortin -- mukaan lukien kortille määrätty henkilö tai ryhmä -- voi lukea muistiinpanot ja lisätä omansa. Ihmiset, jotka eivät voi avata korttia, eivät näe sen muistiinpanoja.

### Massatoiminnot

Valitse useiden korttien valintaruudut toimiakseen niihin yhdessä. Jos haluat valita kaikki vaiheen kortit kerralla, valitse **Valitse kaikki** -ruutu vaihesarakkeen otsikossa. Valinnan voi poistaa valitsemalla ruudun uudelleen. Työkalupalkki tulee näkyviin ja sen avulla voit **Merkitse valmiiksi**, **Lykkää**, **Määritä** (uudelleenmääritys) tai **Siirrä…** toiseen vaiheeseen kaikille valituille korteille kerralla.

## Reititys tuloksilla ja ehdoilla

Reititys määrittää, minne kortti siirtyy, kun se poistuu vaiheesta. Avaa vaiheen editori määrittääksesi kahden tyyppisen reitityksen.

### Tulospainikkeet

Tulokset ovat painikkeita, jotka näkyvät kortin tietolaatikossa, kun viimeistelet kortin kyseisessä vaiheessa. Yhden **Merkitse valmiiksi** -painikkeen sijaan voit tarjota valintoja, kuten ”Liittyi ryhmään” tai ”Ei kiinnostunut”. Jokainen tulos voi:

- Siirtää kortin **toiseen vaiheeseen** tässä työnkulussa,
- **Siirtää kortin kokonaan toiseen työnkulkuun**, tai
- **Sulkea** kortin.

Näin yksi päätös voi ohjata henkilön eri polkuja pitkin.

### Automaattinen reititys (ehdollinen)

Automaattiset reitit siirtävät kortin eteenpäin **heti, kun se saapuu vaiheeseen** (ja sen automaattisten toimintojen päätyttyä), ilman että kukaan napsauttaa mitään, jos henkilö täyttää asetetut ehdot. Lisää reitti, valitse kohdevaihe ja määritä yksi tai useampi **ehto** (esimerkiksi henkilön seurakuntayhteisö, ikä tai jäsenyyden tila). Tekstikentät voidaan täsmäyttää tarkasti tai käyttäen ehtoja **sisältää**, **alkaa** tai **päättyy**. Reitti ilman ehtoja täsmää kaikkiin.

Päivämääräehdot (Tämän päivän päivämäärä, Syntymäpäivä tai Hääpäivä) voivat verrata koko päivämäärää tai vain sen osaa -- viikonpäivää, **Kuukauden päivää**, **Kuukautta** tai kuluneita vuosia. Henkilön syntymäpäivän tai hääpäivän kohdalla **Kuukauden päivä** tarjoaa suhteellisen vaihtoehdon **Tänään**, joten ehto *Syntymäpäivä · Kuukauden päivä = Tänään* täsmää henkilöihin, joiden syntymäpäivä osuu tämän päivän kuukauden päivään. **Kuukausi** tarjoaa vaihtoehdot **Edellinen kuukausi**, **Nykyinen kuukausi** ja **Seuraava kuukausi**. Tällaiset suhteelliset arvot lasketaan kirkkosi aikavyöhykkeen mukaan, joten ne vastaavat kirkkosi kalenteripäivää eivätkä palvelimen päivää.

**Lahjoitukset**-ryhmän ehdoissa on **Lopettanut säännöllinen lahjoittaja**, joka löytää ihmiset, jotka lahjoittivat aiemmin säännöllisesti ja lopettivat sen. Aseta kolme lukua: *Lahjoitti vähintään* **3** *viimeisen* **12** *viikon aikana, eikä mitään viimeisen* **3** *viikon aikana* (nämä ovat oletusarvot). Viikot lasketaan taaksepäin tästä päivästä kirkkosi aikavyöhykkeessä, eikä peruutettua lahjoitusta lasketa. Ehto on hyödyllisin [aikataululaukaisimen](#schedule-triggers) yhteydessä -- esimerkiksi viikoittainen sääntö, joka lisää lopettaneet lahjoittajat pastoraalisen huolenpidon seurantatauluun. Ehto tarkastelee vain lahjoituspäiviä, ei summia, eikä kortit tai hälytykset koskaan näytä summia. Koska se paljastaa, ketkä ovat lopettaneet lahjoittamisen, vain ihmiset, jotka voivat nähdä lahjoituksia, näkevät tämän vaihtoehdon ja voivat lisätä, muuttaa tai poistaa sen.

Jos reitin ehtoja ei voida tarkistaa jostain syystä, reitin katsotaan olevan täsmäämätön. Kortti jää vaiheeseen (tai seuraa muuta täsmäävää reittiä) eikä jää jumiin.

:::info
Taulussa jokainen vaihesarake näyttää pieniä merkintöjä, jotka kuvaavat sen reititystä -- esimerkiksi tuloksen nimen tai ”jos täsmää” ja nuolen kohdevaiheeseen tai työnkulkuun.
:::

## Täysin automaattiset vaiheet

Voit tehdä vaiheesta täysin itsenäisen, jota kukaan ei käsittele. Anna vaiheelle sen **automaattiset toiminnot** ja lisää **automaattinen reitti** (ilman ehtoja), joka osoittaa seuraavaan vaiheeseen. Kun kortti saapuu, toiminnot suoritetaan ja reitti siirtää kortin heti eteenpäin -- kortti kulkee suoraan läpi.

:::tip
Yhdistä tämä **Odota**-toimintoon: *Lähetä tervetulosähköposti → Odota 3 päivää → siirry automaattisesti vaiheeseen ”Henkilökohtainen puhelu”.* Sähköposti ja ajoitus hoidetaan puolestasi, ja vapaaehtoinen näkee kortin vasta, kun on aika inhimilliselle kosketukselle.
:::

## Laukaisimet

Laukaisimet lisäävät ihmisiä työnkulkuun automaattisesti, kun jokin tapahtuu, joten sinun ei tarvitse koskaan lisätä kortteja käsin. Avaa työnkulun taulu, napsauta **Laukaisimet**-välilehteä ja sitten **Lisää laukaisin**. Laukaisimia on kahta tyyppiä:

### Tapahtumalaukaisimet

Käynnistyvät heti, kun tietue muuttuu B1:ssä. Valitse tapahtuma ja lisää halutessasi **ehtoja**, jotta vain täsmäävät henkilöt lisätään:

- **Henkilö · Luotu / Päivitetty** -- esim. lisää jokainen, jonka tila muuttuu tilaan *Vierailija* tai *Vieras* (tila, joka annetaan henkilöille, jotka rekisteröityvät itse).
- **Lahjoitus · Luotu** -- esim. lisää ensilahjoitus tai suuri lahjoitus kiitostyönkulkuun (täsmäytä summan, rahaston tai maksutavan mukaan).
- **Ryhmä · Jäsen liittyi** / **Ryhmä · Luotu**.
- **Lomake · Lähetetty** -- lisää jokainen, joka lähettää valitun lomakkeen (sopii hyvin kortille ”Olen uusi” tai ”Ota yhteyttä”).

### Aikataululaukaisimet

Toimivat toistuvasti -- päivittäin, viikoittain, kuukausittain tai vuosittain -- asetettujen ehtojen perusteella. Käytä näitä ajoitettuun tavoittamiseen, kuten *kaikki, joilla on syntymäpäivä tänään* (Syntymäpäivä · Kuukauden päivä = **Tänään**, kuukausi täsmää **Nykyiseen kuukauteen**) tai *kuukausittainen* tarkistus. Vaikka **Vain kerran henkilöä kohden** ei olisi päällä, aikataululaukaisin ei lisää samaa henkilöä uudelleen saman toistojakson sisällä (päivä, viikko, kuukausi tai vuosi sen mukaan, kuinka usein laukaisin toimii).

Jokaiselle laukaisimelle voit myös asettaa:

- **Aloitusvaiheen**, johon uusi kortti sijoittuu (oletuksena ensimmäinen vaihe).
- **Vain kerran henkilöä kohden** -- jotta laukaisin ei lisää samaa henkilöä työnkulkuun kahdesti. Kun tämä on päällä, jokainen, jolla on jo kortti tässä työnkulussa, ohitetaan.
  - **Lisää uudelleen, kun kortti on suljettu** -- näkyy, kun **Vain kerran henkilöä kohden** on päällä. Valitse tämä, jotta laukaisin voi lisätä henkilön uudelleen, kun hänen aiempi korttinsa tässä työnkulussa on suljettu. Henkilöllä ei koskaan ole samanaikaisesti kahta avointa korttia työnkulussa. Käytä tätä asioihin, jotka voivat tapahtua useammin kuin kerran, kuten palaaviin vieraisiin tai vuotuisiin prosesseihin.
- **Aktiivinen** -- kytke laukaisin päälle tai pois poistamatta sitä.

:::tip
Yhdistä **Lomake · Lähetetty** -laukaisin **Uuden vierailijan seuranta** -pohjaan, niin ”Yhteystietolomakkeesi” tai ”Olen uusi” -lomake muuttuu automaattiseksi seurantaputkeksi.
:::

## Palvelutehtävien vahvistukset

Erityinen työnkulun tyyppi voi seurata [palvelupyyntöjä](./plans.md#assigning-team-members), kunnes jokainen vapaaehtoinen hyväksyy tai hylkää ne. Ihmisten sijaan jokainen tämän taulun kortti seuraa **yhtä tehtävää** -- yhtä henkilöä yhdessä tehtävässä yhdessä suunnitelmassa. Kaksi roolia tai kaksi palvelua samalle henkilölle saavat erilliset kortit. Tämä on valinnainen: mikään ei muutu suunnitelmalle, ennen kuin valitset vahvistustyönkulun sen asetuksista.

### Käyttöönotto

1. Napsauta Työnkulut-sivulla **Lisää työnkulku** ja valitse pohja **Palvelutehtävän vahvistus**. (Tai aloita **Tyhjä työnkulku** ja aseta sen **Työnkulun tarkoitukseksi** **Palvelutehtävän vahvistus**.) Pohjasta luominen edellyttää oikeutta lähettää tekstiviestejä, koska siihen kuuluu tekstiviestivaihe.
2. Tarkista vaiheet. Pohja alkaa seuraavasti:
   - **Pyydä ja odota vastausta** -- lähettää palvelupyynnön sähköpostilla ja tekstiviestillä, odottaa 2 päivää, lähettää muistutussähköpostin, odottaa vielä 1 päivän ja siirtää kortin sitten automaattisesti eteenpäin.
   - **Soita vapaaehtoiselle vastaamattomasta pyynnöstä** -- vaihe, jossa henkilö soittaa vapaaehtoiselle, eräpäivä 1 päivä. Aseta tähän vaiheeseen **Oletusvastuuhenkilö**. Jos sitä ei ole asetettu, kortti menee palvelutyön johtajalle tai, jos johtajaa ei ole, palvelutyön tiimille.
3. Muokkaa odotuksia, viestejä ja vaiheita kirkkosi tarpeiden mukaan.
4. Avaa [suunnitelman asetukset](./plans.md#plan-settings) ja valitse tämä työnkulku kohdasta **Vahvistustyönkulku**.

Nämä työnkulut käyttävät toimintoa **Lähetä palvelupyyntö** toiminnon **Lähetä sähköposti** ja **Lähetä tekstiviesti** sijaan. Valitse **Sähköposti** tai **Tekstiviesti** ja halutessasi kirjoita **Pyynnön viesti**. Pyyntö sisältää aina tehtävän, suunnitelman, palvelupäivän ja linkin vastaamiseen. Voit käyttää viestissäsi kenttiä `{{planName}}`, `{{positionName}}` ja `{{serviceDate}}`. Jätä viesti tyhjäksi, jos haluat käyttää oletuspyyntöä. Vapaaehtoisten ilmoitusasetukset, tekstiviestien vastaanottosuostumus, tekstiviestipalveluntarjoajasi ja kirkkosi sähköpostin hyväksyntä ovat kaikki voimassa, ja jokainen ohitettu tai estetty yritys kirjataan kortille. Toiminnot **Lähetä sähköposti**, **Lähetä tekstiviesti** ja **Lisää työnkulkuun** eivät ole käytettävissä näillä tauluilla.

Vahvistustyönkulun **Laukaisimet**-välilehti selittää, miten kortit käynnistyvät, eikä tarjoa laukaisimia. Näitä työnkulkuja ei myöskään näy ihmisten **Lisää työnkulkuun** -luetteloissa.

### Miten kortit käynnistetään ja suljetaan

- Kortit käynnistyvät, kun ilmoitat vapaaehtoisille julkaistussa suunnitelmassa (katso [Vapaaehtoisten ilmoittaminen](./plan-validation.md#notifying-volunteers)). Jokainen uusi, vastaamaton tehtävä saa yhden kortin. Suunnitelman tallentaminen, julkaiseminen, kopiointi tai automaattinen täyttäminen ei itsessään ota yhteyttä kehenkään, eikä alustavasti ajoitetuista suunnitelmista lähde mitään.
- Vapaaehtoiset saavat edelleen tavallisen sovelluksen sisäisen ilmoituksen. Sähköpostin ja tekstiviestin seuranta tulee työnkulusta.
- Kun vapaaehtoinen **hyväksyy tai hylkää** tehtävän, hänen korttinsa suljetaan automaattisesti, samoin kuin siihen liitetyt seurantatehtävät.
- Kortin tietolaatikko näyttää tehtävän, palvelupäivän ja linkin suunnitelmaan. Painikkeen **Merkitse valmiiksi** sijaan painikkeessa lukee **Kirjaa seuranta tehdyksi**. Sen napsauttaminen kirjaa, että seuranta on tehty, mutta kortti pysyy avoimena ja määrättynä (näkyy tilana **Odottaa vastausta**), kunnes vapaaehtoinen vastaa tai vastausaika päättyy.
- Vastausaika on sen viimeisen palvelukerran loppu, jonka aikana tehtävän tiimi palvelee. Jos suunnitelmassa ei ole vastaavia kertoja, se on palvelupäivän loppu. Jos kukaan ei ole vastannut siihen mennessä, kortti suljetaan tilalla **Vastausaika umpeutui**, ja tehtävä **Tarkista vastaamaton palvelupyyntö** siirtyy kortin nykyiselle omistajalle tai palvelutyön johtajalle, jotta joku voi päättää, miten paikka täytetään. Tehtävä pysyy tilassa **Vahvistamaton**.
- Tehtävän poistaminen, sen henkilön, tehtävän tai päivämäärän muuttaminen, suunnitelman palauttaminen alustavaan tilaan tai suunnitelman vaihtaminen toiseen vahvistustyönkulkuun sulkee kortin. Susuljettua korttia ei avata uudelleen toisella **Ilmoita**-toiminnolla; lähetä uusi pyyntö lisäämällä uusi tehtävä.

:::info
Vahvistustyönkulun kautta lähetettyjen pyyntöjen osalta [vapaaehtoisten muistutukset](./plans.md#volunteer-reminders) lähetetään vain vapaaehtoisille, jotka ovat **hyväksyneet** tehtävän, jotta vastausta odottavat eivät saa muistutuksia työnkulun seurannan lisäksi.
:::

## Omat kortit

Vapaaehtoisten ja työntekijöiden ei tarvitse etsiä työtään jokaisen taulun läpi. Sivun **Omat työt** luettelo **Omat kortit** näyttää kaikki nykyiselle käyttäjälle määrätyt kortit kaikissa työnkulussa. Pääset sinne napsauttamalla **Omat kortit** Työnkulut-sivun yläreunassa tai avaamalla **Palveleminen > Omat työt** Hyppyvalikosta. Kortin napsauttaminen avaa sen tietopaneelin suoraan Omat työt -sivulla, jossa voit käsitellä kortin tai poistaa sen poistumatta sivulta. Jos voit katsella työnkulkuja, paneelissa on myös linkki **Avaa työnkulun taulu** kortin taululle.

## Raportit

Avaa työnkulku ja napsauta **Raportit** nähdäksesi sen analytiikan:

- **Myöhässä** -- niiden korttien määrä, joiden eräpäivä on ohi.
- **Kortit vaiheittain** -- kuinka monta korttia kussakin vaiheessa on tällä hetkellä, pylväskaaviona.
- **Suoritettu (30 päivää)** -- läpimenon määrä viimeisen 30 päivän ajalta, viivakaaviona.

Käytä näitä pullonkaulojen tunnistamiseen -- esimerkiksi vaihetta, johon kortit kasautuvat eivätkä koskaan etene.

## Liittyvät artikkelit

- [Tehtävät](./tasks.md) -- yksittäiset toimenpiteet, joiden varaan työnkulkukortit rakentuvat
- [Lomakkeet](../forms/index.md) -- lomakkeet, jotka voivat käynnistää työnkulkuja
- [Ryhmät](../groups/index.md) -- ryhmät, joihin toiminto **Lisää ryhmään** voi lisätä ihmisiä
- [Palvelusuunnitelmat](./plans.md) -- valitse suunnitelman palvelupyyntöihin vahvistustyönkulku
- [Roolit ja oikeudet](../settings/roles-permissions.md) -- määritä, kuka voi katsella, muokata ja hallita työnkulkuja
