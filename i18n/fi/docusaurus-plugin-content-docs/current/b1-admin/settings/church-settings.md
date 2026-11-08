---
title: "Seurakunnan asetukset"
description: "Määritä seurakuntasi nimi, osoite, aliverkkotunnus, aikavyöhyke, alueen muoto, tekstiviestipalveluntarjoaja ja tiedostojen tallennus B1 Adminin Seurakunnan asetukset -sivulla."
---

# Seurakunnan asetukset

<div class="article-intro">

Seurakunnan asetukset -sivulla määrität seurakuntasi perustiedot, yhteystiedot ja brändäyksen. Näitä tietoja käytetään kaikissa ChurchApps-työkaluissa, mukaan lukien B1.church-verkkosivustossasi ja B1 Appissa.

</div>

## Koulutusvideo

<YouTube id="634zSbzDkYA" title="Seurakunnan tietojen ja brändäyksen määrittäminen B1:ssä" next="Roolit, oikeudet ja tiimin kutsuminen B1:ssä" nextUrl="/docs/b1-admin/settings/roles-permissions" />

<div class="prereqs">
<h4>Ennen aloittamista</h4>

- Tarvitset oikeuden ”Muokkaa seurakunnan asetuksia”. Jos sinulla ei ole pääsyä, katso [Roolit ja oikeudet](./roles-permissions.md).
- Varmista, että sinulla on seurakuntasi osoite, yhteystiedot ja logo valmiina

</div>

## Seurakuntasi tietojen muokkaaminen

1. Avaa B1 Adminissa [Hyppyvalikko](../introduction.md#getting-around-with-the-jump-menu) (hakupalkki vasemmassa yläkulmassa), laajenna **Asetukset** ja valitse **Asetukset**.
2. Napsauta **Seurakunnan tiedot** -osiossa (sivun yläosassa) **Muokkaa**.
3. Päivitä jokin seuraavista kentistä:
   - **Seurakunnan nimi** – Nimi, joka näkyy kaikissa ChurchApps-tuotteissa.
   - **Osoite** – Seurakuntasi fyysinen osoite.
   - **Yhteystiedot** – Puhelinnumero, sähköposti ja muut yhteystiedot.
   - **Aikavyöhyke** – Seurakuntasi aikavyöhyke. Katso alla [Aikavyöhyke](#time-zone).
4. Ota muutokset käyttöön napsauttamalla **Tallenna**.

## Aliverkkotunnuksen määrittäminen

Seurakuntasi saa ilmaisen aliverkkotunnuksen osoitteeseen **seurakuntasi.1.church**. Tämä on verkko-osoite, jonka kautta jäsenet ja vierailijat voivat tavoittaa seurakuntasi verkkoläsnäolon.

1. Napsauta Asetukset-sivulla **Seurakunnan tiedot** -osiossa **Muokkaa** ja etsi **Aliverkkotunnus**-kenttä.
2. Kirjoita haluamasi aliverkkotunnus (esimerkiksi ”gracechurch” osoitteeseen gracechurch.1.church).
3. Tallenna muutokset.

:::info
Aliverkkotunnuksen täytyy olla yksilöllinen kaikkien ChurchApps-seurakuntien joukossa. Jos haluamasi nimi on jo käytössä, lisää siihen kaupunkisi tai osavaltiosi (esimerkiksi ”gracechurch-dallas”).
:::

Jos haluat, että vierailijat tavoittavat sivustosi omalla verkkotunnuksellasi (esimerkiksi **`www.gracechurch.org`**), katso [Mukautettu verkkotunnus](./custom-domain.md).

## Brändäyksen määrittäminen

Muokkaa, miten seurakuntasi näkyy kaikissa ChurchApps-työkaluissa:

1. Lataa **seurakunnan logo** napsauttamalla logoaluetta ja valitsemalla kuvatiedosto.
2. Lisää muita **seurakunnan kuvia**, joita käytetään verkkosivustollasi ja [mobiilisovelluksessa](./mobile-app.md).

:::tip
Parhaan tuloksen saat käyttämällä PNG-muotoista logoa, jonka tausta on läpinäkyvä. Näin logo näyttää hyvältä sekä vaalealla että tummalla taustalla.
:::

## Viikon ensimmäinen päivä

Valitse, mistä päivästä kalenterisi alkavat. Seurakunnan tiedot -osion **Viikon ensimmäinen päivä** -valikon oletusarvo on **sunnuntai**, mutta voit asettaa minkä tahansa päivän. Kun muutat asetusta, se otetaan huomioon kaikissa kalenterinäkymissä B1 Adminissa ja B1.church-jäsenportaalissa. Ryhmäkalenterit, kuratoidut kalenterit ja tapahtumaeditori sijoittavat viikot alkamaan valitsemastasi päivästä.

## Aikavyöhyke

Seurakunnan tiedot -osion **Aikavyöhyke**-valikko määrittää seurakuntasi aikavyöhykkeen (esimerkiksi *America/Chicago*). Valitse **Ei mitään**, jos haluat jättää kentän tyhjäksi. Tallennuksen jälkeen aikavyöhyke näkyy Seurakunnan tiedot -yhteenvedossa.

B1 käyttää tätä aikavyöhykettä seurakuntakohtaisiin aikoihin, kuten tapahtumamuistutuksiin ja [FreePlay](../../freeplay/scheduled-mode/scheduling-the-calendar.md)-televisioidesi aikatauluihin. [Sisäänkirjautumisaikataulut](../attendance/setup.md#setting-a-check-in-schedule) lasketaan ensisijaisesti jumalanpalveluksen [seurakuntakeskuksen](./campuses.md) aikavyöhykkeen mukaan. Seurakunnan aikavyöhykettä käytetään vain, jos seurakuntakeskuksella ei ole omaa. Jos kaikki seurakuntakeskuksesi sijaitsevat samassa aikavyöhykkeessä, aseta se sekä seurakunnalle että jokaiselle seurakuntakeskukselle.

## Alue (päivämäärä- ja puhelinnumeromuoto)

**Alue**-asetus määrittää, miten päivämäärät ja kellonajat kirjoitetaan koko B1:ssä. Oletuksena päivämäärät käyttävät Yhdysvaltain muotoa (esimerkiksi ”Sep 28, 2026” ja ”9/28/2026”). Yhdysvaltojen ulkopuoliset seurakunnat voivat vaihtaa omaan muotoonsa. Jos valitset esimerkiksi englannin (Yhdistynyt kuningaskunta), näkyviin tulee ”28 Sept 2026” ja ”28/09/2026”.

1. Napsauta Asetukset-sivulla vasemmalla olevasta luettelosta **Alue** ja napsauta sitten **Alue**-osiossa **Muokkaa**.
2. Valitse alueesi **Alue**-valikosta. Jokaisessa vaihtoehdossa näkyy esimerkkipäivämäärä, jotta näet tarkalleen, miltä päivämäärät näyttävät.
3. Napsauta **Tallenna**.

Alue-osiossa näkyy sitten valitsemasi alue, esimerkki **Päivämäärän muodosta** ja **Puhelinnumeroiden** muoto.

### Puhelinnumeroiden muoto

Samassa Alue-osiossa on **Puhelinnumerot**-asetus, joka määrittää, miten puhelinnumerot syötetään henkilön tietueeseen:

- **Kansainvälinen (maatunnuksella)** – oletus. Puhelinkentissä on maaliputkuvan valitsin, ja numerot tallennetaan maatunnuksella (esimerkiksi +1 918 555 1234).
- **Paikallinen (kirjoitettu sellaisenaan)** – puhelinkentistä tulee tavallisia tekstikenttiä, ja numerot tallennetaan täsmälleen niin kuin kirjoitat ne, ilman maatunnusta (esimerkiksi 0701 234 5678). Valitse tämä, jos seurakuntasi kirjoittaa numerot paikallisessa muodossa eikä halua, että B1 lisää maatunnuksen.

Kun **Paikallinen** on valittuna, Alue-osio näyttää alueesi vieressä myös tekstin ”Paikalliset puhelinnumerot”.

:::tip
Tekstiviestit toimivat parhaiten, kun numeroissa on maatunnus. Jos lähetät tekstiviestejä B1:stä, käytä **Kansainvälistä** muotoa tai varmista, että Paikallinen-tilassa kirjoittamissasi numeroissa on maatunnus.
:::

Alueesi koskee päivämääriä ja kellonaikoja koko B1 Adminissa sekä B1.church-verkkosivustollasi ja jäsenportaalissa. Tämä kattaa myös saarnat, blogikirjoitukset, ryhmäkalenterit ja palvelusuunnitelmat, joten jäsenet näkevät päivämäärät samassa muodossa kuin henkilökuntasi.

## Tekstiviestit {#texting}

Yhdistä tekstiviestipalveluntarjoaja, jotta voit lähettää tekstiviestejä yksittäiselle henkilölle tai koko ryhmälle B1 Administa. Viestit lähetetään palveluntarjoajan kanssa tekemäsi oman tilin kautta, joten palveluntarjoajan hinnoittelu ja rajoitukset koskevat niitä.

1. Napsauta Asetukset-sivulla vasemmalla olevasta luettelosta **Tekstiviestit** ja napsauta sitten **Tekstiviestit**-osiossa **Muokkaa**.
2. Valitse **Palveluntarjoaja**:
   - **Clearstream** – syötä **API-avain**. Luo avain Clearstreamin tilin asetuksissa kohdassa API Keys.
   - **Text In Church** – syötä **API-avain**. Pyydä ensin Text In Church -tuesta kehittäjän API-käyttöoikeutta, ja luo sitten avain kohdassa Account Settings > Developer API.
   - **Nalo Solutions** (Ghana) – syötä Nalo Solutions -tilisi todennusavain **API-avaimeksi** ja **Lähettäjän tunnus** (enintään 11 merkkiä), jonka Nalo on hyväksynyt sinulle.
   - **Twilio** – käytä seurakuntasi omaa Twilio-tiliä. Twilio laskuttaa sinua suoraan. Kopioi **Account SID** ja **Auth Token** [Twilio-konsolista](https://console.twilio.com) ja syötä **Lähettävä numero** eli A2P 10DLC:lle rekisteröity Twilio-puhelinnumero muodossa `+15551234567`. Tallennuksen jälkeen liitä saapuvan viestin webhook-osoite (katso alla) Twilion numeron kenttään **A message comes in**, jotta STOP-vastaukset tallentuvat myös B1:een.
3. Napsauta **Tallenna**.

Voit lopettaa tekstiviestien lähettämisen asettamalla **Palveluntarjoaja**-kentäksi **Ei mitään** ja tallentamalla. Tämä poistaa tallennetun palveluntarjoajan.

### STOP-vastaajien poistaminen tekstiviestilistalta

Kun palveluntarjoaja on tallennettu, avaa Tekstiviestit-osio uudelleen painamalla **Muokkaa**. Palveluntarjoajan asetusten alapuolella on vain luettavissa oleva kenttä **Saapuvan (STOP) webhookin URL-osoite**. Se näyttää seurakuntasi omaa verkko-osoitetta. Napsauta kenttää valitaksesi osoitteen, kopioi se ja liitä se palveluntarjoajasi saapuvien viestien (vastausten) webhook-asetukseen. Tämä toimii kaikilla edellä mainituilla palveluntarjoajilla, jotka voivat välittää saapuvat vastaukset webhookiin.

Tämän jälkeen, kun joku vastaa tekstiviestiisi **STOP** (tai STOPALL, UNSUBSCRIBE, CANCEL, END, QUIT, OPTOUT tai REVOKE), B1 etsii kaikki, joiden matkapuhelinnumero täsmää, merkitsee heidät pois tilaajista ja poistaa heiltä tekstimuistutukset käytöstä. Heitä ohitetaan sen jälkeen ryhmäviesteissä. Muut vastaukset jätetään huomiotta.

:::info
Tämä käyttää samaa poisjäämisasetusta kuin **Piilota minut jäsenluettelosta**, joten STOP-vastanneet näkyvät myös profiilissaan merkittyinä **Piilotettu jäsenluettelosta**. Kenttä näkyy vain, kun tallennettu palveluntarjoaja on valittuna. Jos vaihdat valikossa toiseen palveluntarjoajaan, tallenna ensin, jotta näet URL-osoitteen uudelleen.
:::

Kun palveluntarjoaja on yhdistetty, henkilöstö, jolla on lupa lähettää viestejä, näkee ryhmän sivulla painikkeen **Teksti** (**Lähetä viesti tälle ryhmälle**) ja henkilön sivulla, jos henkilöllä on matkapuhelin, painikkeen **Lähetä tekstiviesti**. Kirjoita viestisi ja napsauta **Lähetä**. Valintaikkuna laskee merkit ja SMS-osat. Ryhmälle se näyttää ennen lähettämistä, montako jäsentä saa viestin:

- Jäseniä, joilla ei ole matkapuhelinnumeroa tallennettuna, ohitetaan.
- Jäseniä, jotka ovat valinneet **Piilota minut jäsenluettelosta**, pidetään poisjääneinä ja ohitetaan.
- Perheenjäsenet, jotka jakavat saman matkapuhelinnumeron, saavat viestin vain kerran.

### Viestien personointi yhdistelykentillä {#personalizing-texts-with-merge-fields}

Viestikentän alapuolella Teksti-valintaikkunassa on paikkamerkkipainikkeet: **Etunimi**, **Sukunimi**, **Näyttönimi** ja **Seurakunnan nimi**. Napsauta painiketta lisätäksesi sen paikkamerkin (`{{firstName}}`, `{{lastName}}`, `{{displayName}}`, tai `{{churchName}}`) kohdistimen kohtaan. Kun viesti lähetetään, jokainen paikkamerkki korvataan vastaanottajan tiedoilla. Esimerkiksi ryhmäviesti `Hei {{firstName}}, nähdään sunnuntaina!` tavoittaa jokaisen jäsenen omalla nimellään. Paikkamerkit toimivat sekä ryhmäviesteissä että yksittäiselle henkilölle lähetettävissä viesteissä. Ryhmäviesteissä on lisäksi painike **Ryhmän nimi** (`{{groupName}}`), joka korvataan ryhmän nimellä.

Voit käyttää viestiä uudelleen tallentamalla sen [tekstipohjana](./email-templates.md#text-templates) (sähköpostipohja, jonka luokka on **Teksti**) ja valitsemalla sen Teksti-ikkunan yläosan kohdasta **Lataa pohja (valinnainen)**.

:::info
1 600 merkin raja koskee viestiä sellaisena kuin kirjoitat sen. Kun paikkamerkit on täytetty, yli 1 600 merkkiä pitkä teksti katkaistaan tuohon pituuteen.
:::

Viestejä voidaan lähettää myös automaattisesti [työnkulun](../serving/workflows.md#sending-a-text) vaiheesta **Lähetä teksti** -toiminnolla. Se käyttää samaa palveluntarjoajaa ja paikkamerkkejä.

## Tiedostojen tallennus

Oletuksena verkkosivustollesi ([Tiedostot](../website/files.md)-osion kautta) ladatut tiedostot ja muut sisältöalueet käyttävät B1:n ilmaista isännöityä tallennustilaa, enintään 100 Mt. Jos tarvitset enemmän tilaa, voit yhdistää oman pilvitallennuksesi. Uudet lataukset menevät tällöin suoraan omalle tilillesi ilman alustan rajoitusta.

1. Napsauta Asetukset-sivulla vasemmalla olevasta luettelosta **Tiedostojen tallennus** ja napsauta sitten **Tiedostojen tallennus** -osiossa **Muokkaa**.
2. Valitse palveluntarjoaja: **Google Drive**, **Dropbox**, **OneDrive** tai **S3-yhteensopiva säilö** (AWS S3, Cloudflare R2, Backblaze B2 jne.).
3. Google Drivea, Dropboxia tai OneDrivea varten napsauta **Yhdistä** ja kirjaudu sisään valtuuttaaksesi käytön. S3-yhteensopivaa säilöä varten syötä käyttöavaimesi, salainen avaimesi, säilön nimi ja julkinen URL-perusosoite.
4. Napsauta **Tallenna**.

:::info
Tämä koskee vain uusia latauksia verkkosivustosi Tiedostoihin ja vastaaviin sisältöalueisiin. Galleriakuvat, pikkukuvat, logot ja henkilökuvat pysyvät aina B1:n oletustallennustilassa.
:::

## Luokan siirto

Jos seuraat **Luokkaa** lapsilta ja opiskelijoilta, B1 voi siirtää kaikki yhden luokan ylemmäksi valitsemanasi päivänä (esimerkiksi 1. elokuuta). Sinun ei tarvitse muokata jokaista profiilia erikseen.

1. Napsauta Asetukset-sivulla vasemmalla olevasta luettelosta **Luokan siirto** ja napsauta sitten **Luokan siirto** -osiossa **Muokkaa**.
2. Käännä kytkin päälle (se näyttää **Käytössä**) ja valitse **Kuukausi** ja **Päivä**, jolloin luokat siirretään vuosittain. Tuona päivänä jokainen luokan omaava siirtyy yhden luokan ylemmäksi, ja 12. luokan oppilaista tulee **Valmistuneita**.
3. Tallenna muutokset.

Jos haluat lopettaa automaattisen siirron, käännä kytkin pois päältä niin, että se näyttää **Ei käytössä**, ja tallenna. Siirtopäivämäärä poistetaan, eivätkä luokat enää muutu itsestään.

## Vapaaehtoisilmoittautuminen {#volunteer-signup}

Oletuksena jäsenet, jotka selaavat [vapaaehtoisilmoittautumisia](../../b1-church/serving/volunteer-signup.md), näkevät kaikki tulevat viikot, joilla on avoimia paikkoja. Jos luettelo käy pitkäksi, voit näyttää kullekin palvelutyypille vain seuraavan viikon.

1. Napsauta Asetukset-sivulla vasemmalla olevasta luettelosta **Vapaaehtoisilmoittautuminen** ja napsauta sitten **Vapaaehtoisilmoittautuminen**-osiossa **Muokkaa**.
2. Käännä päälle **Näytä vain kunkin suunnitelmatyypin seuraava viikko**.
3. Tallenna muutokset.

Kun tämä on päällä, kukin suunnitelmatyyppi näyttää vain seuraavan tulevan suunnitelmansa. Seuraava viikko ilmestyy, kun kyseinen päivämäärä on mennyt. Osion rivillä **Näytettävät viikot** lukee **Vain kunkin suunnitelmatyypin seuraava viikko** tai **Kaikki tulevat viikot**.

## Lahjoitusten yksityisyys {#giving-privacy}

Henkilöillä, joilla on lahjoitusten käyttöoikeus, on yleensä näkyvissä henkilön [henkilötietue](../people/adding-people.md#editing-details)-sivulla hänen lahjoitussummansa. Jos et halua, että summat näkyvät joka kerta, kun tietue avataan, voit piilottaa ne, kunnes joku pyytää niitä.

1. Napsauta Asetukset-sivulla vasemmalla olevasta luettelosta **Lahjoitusten yksityisyys** ja napsauta sitten **Lahjoitusten yksityisyys** -osiossa **Muokkaa**.
2. Käännä päälle **Piilota lahjoitukset henkilötietueissa, kunnes niitä napsautetaan**.
3. Tallenna muutokset.

Kun tämä on päällä, henkilötietueen lahjoituskortissa lukee ”Lahjoitukset on piilotettu henkilötietueissa”. Napsauta **Näytä lahjoitukset** ladataksesi ja näyttääksesi kyseisen henkilön lahjoitukset. Ne piilotetaan taas, kun avaat toisen henkilön tietueen. Lahjoitusten näkemisen oikeudet eivät muutu: lahjoituskortin näkevät vain ne, joilla on lahjoitusten käyttöoikeus.

## Tuonti ja vienti

Asetukset-sivulla seurakuntasi nimen alla oleva linkki **Tuonti/vienti** avaa erillisen työkalun uuteen selainikkunaan. Sen avulla voit:

- Tuoda jäsentietoja toisesta seurakuntahallintajärjestelmästä.
- Viedä ChurchApps-tietosi varmuuskopiota tai siirtoa varten.

Tämä on erityisen hyödyllistä, kun otat seurakuntasi käyttöön ensimmäistä kertaa ja tarvitset siirtää olemassa olevat tietueet ChurchAppsiin.

:::warning
Varmuuskopioi olemassa olevat tietueesi aina ennen tietojen tuontia. Tuontitoiminnot lisäävät tietoja järjestelmään, ja ne voivat luoda kaksoiskappaleita, jos niitä suoritetaan useita kertoja.
:::
