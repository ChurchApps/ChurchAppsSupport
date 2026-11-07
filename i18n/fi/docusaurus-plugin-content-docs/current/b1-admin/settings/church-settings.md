---
title: "Kirkon asetukset"
---

# Kirkon asetukset

<div class="article-intro">

Kirkon asetukset -sivulla määrität kirkkosi perustiedot, yhteystiedot ja brändäyksen. Näitä tietoja käytetään kaikissa ChurchApps-työkaluissa, mukaan lukien B1.church-verkkosivustossasi ja B1 Mobile -sovelluksessa.

</div>

## Koulutusvideo

<YouTube id="634zSbzDkYA" title="Kirkkotietojen ja brändäyksen määrittäminen B1:ssä" next="Roolit, oikeudet ja tiimin kutsuminen B1:ssä" nextUrl="/docs/b1-admin/settings/roles-permissions" />

<div class="prereqs">
<h4>Ennen aloittamista</h4>

- Tarvitset oikeuden "Muokkaa kirkon asetuksia". Jos sinulla ei ole pääsyä, katso [Roolit ja oikeudet](./roles-permissions.md).
- Varmista, että sinulla on kirkkosi osoite, yhteystiedot ja logo valmiina

</div>

## Kirkkotietojen muokkaaminen

1. Avaa B1 Adminissa [Hyppyvalikko](../introduction.md#getting-around-with-the-jump-menu) (hakupalkki sivun vasemmassa yläkulmassa), laajenna kohta **Asetukset** ja napsauta **Asetukset**.
2. Napsauta **Kirkon tiedot** -osiossa (sivun yläosassa) **Muokkaa**.
3. Päivitä jokin seuraavista kentistä:
   - **Kirkon nimi** -- Nimi, joka näkyy kaikissa ChurchApps-tuotteissa.
   - **Osoite** -- Kirkkosi fyysinen osoite.
   - **Yhteystiedot** -- Puhelinnumero, sähköposti ja muut yhteystiedot.
   - **Aikavyöhyke** -- Kirkkosi aikavyöhyke. Katso alla [Aikavyöhyke](#time-zone).
4. Ota muutokset käyttöön napsauttamalla **Tallenna**.

## Alidomainin määrittäminen

Kirkkosi saa ilmaisen alidomainin osoitteeseen **kirkkosi.1.church**. Tämä on verkko-osoite, josta jäsenet ja vierailijat voivat tavoittaa kirkkosi verkkoläsnäolon.

1. Napsauta Asetukset-sivulla **Kirkon tiedot** -osiossa **Muokkaa** ja etsi kenttä **Alidomain**.
2. Kirjoita haluamasi alidomain (esimerkiksi "gracechurch" osoitteelle gracechurch.1.church).
3. Tallenna muutokset.

:::info
Alidomainin on oltava ainutlaatuinen kaikkien ChurchApps-kirkkojen kesken. Jos haluamasi nimi on jo käytössä, kokeile lisätä kaupungin tai osavaltion nimi (esimerkiksi "gracechurch-dallas").
:::

Jos haluat, että vierailijat tavoittavat sivustosi omalla verkkotunnuksellasi (esimerkiksi **`www.gracechurch.org`**), katso [Oma verkkotunnus](./custom-domain.md).

## Brändäyksen määrittäminen

Mukauta, miltä kirkkosi näyttää kaikissa ChurchApps-työkaluissa:

1. Lataa **kirkon logo** napsauttamalla logoaluetta ja valitsemalla kuvatiedosto.
2. Lisää tarvittaessa muita **kirkon kuvia**, joita käytetään verkkosivustollasi ja [mobiilisovelluksessa](./mobile-app.md).

:::tip
Parhaan tuloksen saat käyttämällä PNG-muotoista logoa, jossa on läpinäkyvä tausta. Tämä varmistaa, että logo näyttää hyvältä sekä vaaleilla että tummilla taustoilla.
:::

## Viikon ensimmäinen päivä

Valitse, mistä päivästä kalenterisi alkavat. **Viikon ensimmäinen päivä** -pudotusvalikko Kirkon tiedot -osiossa on oletuksena **sunnuntai**, mutta voit asettaa minkä tahansa päivän. Kun muutat asetusta, se otetaan huomioon B1 Adminin ja B1.church-jäsenportaalin kalenteriruudukoissa. Ryhmäkalenterit, kuratoidut kalenterit ja tapahtumaeditori näyttävät kaikki viikot alkamaan valitsemastasi päivästä.

## Aikavyöhyke

**Aikavyöhyke**-pudotusvalikko Kirkon tiedot -osiossa asettaa kirkkosi aikavyöhykkeen (esimerkiksi *America/Chicago*). Valitse **Ei mitään**, jos haluat jättää kentän tyhjäksi. Tallennuksen jälkeen vyöhyke näkyy Kirkon tiedot -yhteenvedossa.

B1 käyttää tätä aikavyöhykettä koko kirkkoa koskevissa ajoissa, kuten tapahtumamuistutuksissa ja [FreePlay](../../freeplay/scheduled-mode/scheduling-the-calendar.md)-televisioidesi aikatauluissa. [Sisäänkirjautumisaikataulut](../attendance/setup.md#setting-a-check-in-schedule) lasketaan ensisijaisesti jumalanpalveluksen [kampuksen](./campuses.md) aikavyöhykkeen mukaan, ja kirkon aikavyöhykettä käytetään vain, jos kampuksella ei ole omaa. Jos kaikki kampuksesi ovat samassa aikavyöhykkeessä, aseta se sekä kirkolle että jokaiselle kampukselle.

## Alue (päivämäärä- ja puhelinnumeromuoto)

**Alue**-asetus määrittää, miten päivämäärät ja kellonajat kirjoitetaan koko B1:ssä. Oletuksena päivämäärät noudattavat Yhdysvaltojen muotoa (esimerkiksi "Sep 28, 2026" ja "9/28/2026"). Yhdysvaltojen ulkopuoliset kirkot voivat vaihtaa omaan muotoonsa. Jos valitset esimerkiksi englannin (Yhdistynyt kuningaskunta), näkyy sen sijaan "28 Sept 2026" ja "28/09/2026".

1. Napsauta Asetukset-sivulla vasemmanpuoleisesta luettelosta **Alue** ja napsauta sitten **Alue**-osiossa **Muokkaa**.
2. Valitse alueesi **Alue**-pudotusvalikosta. Jokainen vaihtoehto näyttää esimerkkipäivämäärän, jotta näet tarkalleen, miltä päivämäärät näyttävät.
3. Napsauta **Tallenna**.

Alue-osiossa näkyy sen jälkeen valitsemasi alue, esimerkki **Päivämäärämuodosta** sekä **Puhelinnumerot**-muoto.

### Puhelinnumeromuoto

Samassa Alue-osiossa on **Puhelinnumerot**-asetus, joka määrittää, miten puhelinnumerot syötetään henkilön tietueeseen:

- **Kansainvälinen (maatunnuksen kanssa)** -- oletus. Puhelinkentissä on maaliputken valitsin, ja numerot tallennetaan maatunnuksen kanssa (esimerkiksi +1 918 555 1234).
- **Paikallinen (kirjoitettuna)** -- puhelinkentät ovat tavallisia tekstikenttiä, ja numerot tallennetaan täsmälleen sellaisina kuin kirjoitat ne, ilman maatunnusta (esimerkiksi 0701 234 5678). Valitse tämä, jos kirkkosi kirjoittaa numerot paikallisessa muodossa eikä halua B1:n lisäävän maatunnusta.

Kun **Paikallinen** on valittuna, Alue-osio näyttää alueesi vieressä myös tekstin "Paikalliset puhelinnumerot".

:::tip
Tekstiviestit toimivat parhaiten, kun numerot sisältävät maatunnuksen. Jos lähetät tekstiviestejä B1:stä, pidä **Kansainvälinen**-muoto käytössä tai varmista, että Paikallinen-tilassa kirjoittamasi numerot sisältävät maatunnuksen.
:::

Alueesi koskee päivämääriä ja kellonaikoja B1 Adminissa sekä B1.church-verkkosivustollasi ja jäsenportaalissa. Tämä kattaa saarnat, blogikirjoitukset, ryhmäkalenterit ja palvelusuunnitelmat, joten jäsenet näkevät päivämäärät samassa muodossa kuin henkilökunta.

## Tekstiviestit {#texting}

Yhdistä tekstiviestipalveluntarjoaja, jotta voit lähettää tekstiviestejä yksittäiselle henkilölle tai koko ryhmälle B1 Administa. Viestit lähetetään palveluntarjoajan kanssa tekemäsi tilin kautta, joten palveluntarjoajan hinnoittelu ja rajoitukset koskevat niitä.

1. Napsauta Asetukset-sivulla vasemmanpuoleisesta luettelosta **Tekstiviestit** ja napsauta sitten **Tekstiviestit**-osiossa **Muokkaa**.
2. Valitse **Palveluntarjoaja**:
   - **Clearstream** -- syötä **API-avain**. Luo avain Clearstream-tilisi Tilin asetuksista kohdassa API-avaimet.
   - **Text In Church** -- syötä **API-avain**. Pyydä ensin Text In Church -tuesta kehittäjän API-käyttöoikeus ja luo sitten avain Tilin asetukset > Kehittäjän API -osiossa.
   - **Nalo Solutions** (Ghana) -- syötä Nalo Solutions -tilisi todennusavain **API-avaimeksi** sekä **Lähettäjän tunnus** (enintään 11 merkkiä), jonka Nalo on hyväksynyt sinulle.
   - **Twilio** -- käytä kirkkosi omaa Twilio-tiliä; Twilio laskuttaa sinua suoraan. Kopioi **Tilin SID** ja **Todennustunnus** [Twilio-konsolista](https://console.twilio.com) ja syötä **Lähtevä numero** -- Twilio-puhelinnumero, joka on rekisteröity A2P 10DLC -palveluun, muodossa `+15551234567`. Tallennuksen jälkeen liitä saapuvan viestin webhook-osoite (katso alla) Twilion numeron **Kun viesti saapuu** -webhookiin, jotta STOP-vastaukset tallentuvat myös B1:een.
3. Napsauta **Tallenna**.

Lopettaaksesi tekstiviestien lähettämisen aseta **Palveluntarjoaja** arvoon **Ei mitään** ja tallenna. Tämä poistaa tallennetun palveluntarjoajan.

### STOP-vastanneiden poistaminen tekstiviestilistalta

Kun palveluntarjoaja on tallennettu, avaa Tekstiviestit-osio uudelleen **Muokkaa**-painikkeella. Palveluntarjoajan asetusten alapuolella näkyy vain luettavissa oleva kenttä **Saapuvan (STOP) webhook-osoite**, jossa on kirkkosi uniikki verkko-osoite. Napsauta kenttää valitaksesi osoitteen, kopioi se ja liitä se palveluntarjoajasi saapuvien viestien (vastausten) webhook-asetukseen. Tämä toimii kaikkien yllä olevien palveluntarjoajien kanssa, jotka voivat välittää saapuvat vastaukset webhookiin.

Tämän jälkeen, kun joku vastaa **STOP** (tai STOPALL, UNSUBSCRIBE, CANCEL, END, QUIT, OPTOUT tai REVOKE) johonkin viestiisi, B1 etsii kaikki, joiden matkapuhelinnumero vastaa, merkitsee heidät pois tilaajista ja poistaa heidän tekstimuistutuksensa käytöstä. Ryhmäviestit ohittavat heidät sen jälkeen. Muita vastauksia ei huomioida.

:::info
Tämä käyttää samaa pois tilaajista -asetusta kuin **Piilota minut jäsenluettelosta**, joten STOP-vastanneet näkyvät profiilissaan myös tilassa **Piilotettu jäsenluettelosta**. Kenttä näkyy vain, kun tallennettu palveluntarjoaja on valittuna. Jos vaihdat pudotusvalikon toiseen palveluntarjoajaan, tallenna ensin nähdäksesi osoitteen uudelleen.
:::

Kun palveluntarjoaja on yhdistetty, henkilökunta, jolla on lupa lähettää tekstiviestejä, näkee ryhmän sivulla painikkeen **Teksti** (**Lähetä teksti tälle ryhmälle**) ja henkilön sivulla, jolla on matkapuhelinnumero, painikkeen **Lähetä tekstiviesti**. Kirjoita viestisi ja napsauta **Lähetä**. Valintaikkuna laskee merkit ja SMS-osat. Ryhmälle se näyttää ennen lähettämistä, kuinka monta jäsentä saa viestin:

- Jäsenet, joiden matkapuhelinnumeroa ei ole tallennettu, ohitetaan.
- Jäsenet, jotka ovat valinneet **Piilota minut jäsenluettelosta**, lasketaan pois tilaajista ja ohitetaan.
- Perheenjäsenet, jotka jakavat saman matkapuhelinnumeron, saavat viestin vain kerran.

### Viestien personointi yhdistelykentillä {#personalizing-texts-with-merge-fields}

Viestikentän alapuolella Teksti-valintaikkuna näyttää paikkamerkkipainikkeet: **Etunimi**, **Sukunimi**, **Näyttönimi** ja **Kirkon nimi**. Napsauta painiketta lisätäksesi sen paikkamerkin (`{{firstName}}`, `{{lastName}}`, `{{displayName}}` tai `{{churchName}}`) kohdistimen kohtaan. Kun viesti lähetetään, jokainen paikkamerkki korvataan vastaanottajan tiedoilla. Esimerkiksi ryhmäviesti `Hei {{firstName}}, nähdään sunnuntaina!` tavoittaa jokaisen jäsenen omalla nimellään. Paikkamerkit toimivat sekä ryhmäviesteissä että yksittäiselle henkilölle lähetettävissä viesteissä. Ryhmäviesteissä on lisäksi **Ryhmän nimi** -painike (`{{groupName}}`), joka korvataan ryhmän nimellä.

Viestin uudelleenkäyttämiseksi tallenna se [tekstipohjana](./email-templates.md#text-templates) (sähköpostipohja, jonka luokka on **Teksti**) ja valitse se Teksti-ikkunan yläosassa olevasta kohdasta **Lataa pohja (valinnainen)**.

:::info
1 600 merkin raja koskee viestiä sellaisena kuin kirjoitat sen. Kun paikkamerkit on täytetty, yli 1 600 merkin pituinen teksti katkaistaan tuon pituuteen.
:::

Viestejä voidaan lähettää myös automaattisesti [työnkulun](../serving/workflows.md#sending-a-text) vaiheesta **Lähetä teksti** -toiminnolla. Se käyttää samaa palveluntarjoajaa ja samoja paikkamerkkejä.

## Tiedostojen tallennus

Oletuksena verkkosivustollesi ([Tiedostot](../website/files.md)-osion kautta) ladatut tiedostot ja muut sisältöalueet käyttävät B1:n ilmaista isännöityä tallennustilaa, enintään 100 Mt. Jos tarvitset enemmän tilaa, voit yhdistää oman pilvitallennuksesi. Uudet lataukset menevät silloin suoraan tilillesi ilman alustan rajoitusta.

1. Napsauta Asetukset-sivulla vasemmanpuoleisesta luettelosta **Tiedostojen tallennus** ja napsauta sitten **Tiedostojen tallennus** -osiossa **Muokkaa**.
2. Valitse palveluntarjoaja: **Google Drive**, **Dropbox**, **OneDrive** tai **S3-yhteensopiva säilö** (AWS S3, Cloudflare R2, Backblaze B2 jne.).
3. Google Drivea, Dropboxia tai OneDrivea varten napsauta **Yhdistä** ja kirjaudu sisään valtuuttaaksesi pääsyn. S3-yhteensopivaa säilöä varten syötä käyttöavaimesi, salainen avaimesi, säilön nimi ja julkinen URL-perusosoite.
4. Napsauta **Tallenna**.

:::info
Tämä koskee vain uusia latauksia verkkosivustosi Tiedostoihin ja vastaaviin sisältöalueisiin. Galleriakuvat, pikkukuvat, logot ja henkilökuvat pysyvät aina B1:n oletustallennustilassa.
:::

## Luokan nousu

Jos seuraat lasten ja opiskelijoiden **Luokkaa**, B1 voi siirtää kaikki automaattisesti yhden luokan ylemmäs valitsemanasi päivänä (esimerkiksi 1. elokuuta). Sinun ei tarvitse muokata jokaista profiilia käsin.

1. Napsauta Asetukset-sivulla vasemmanpuoleisesta luettelosta **Luokan nousu** ja napsauta sitten **Luokan nousu** -osiossa **Muokkaa**.
2. Kytke kytkin päälle (se näyttää tilan **Käytössä**) ja valitse **Kuukausi** sekä **Päivä**, jolloin luokat nousevat joka vuosi. Tuona päivänä kaikki, joilla on luokka, siirtyvät yhden luokan ylemmäs, ja 12. luokan oppilaat merkitään tilaan **Valmistunut**.
3. Tallenna muutokset.

Voit lopettaa automaattisen luokan noususiirron kytkemällä kytkimen pois päältä, jolloin se näyttää tilan **Ei käytössä**, ja tallentamalla. Nousupäivä poistetaan, eivätkä luokat muutu enää itsestään.

## Vapaaehtoisilmoittautuminen {#volunteer-signup}

Oletuksena jäsenet, jotka selaavat [vapaaehtoisilmoittautumisia](../../b1-church/serving/volunteer-signup.md), näkevät kaikki tulevat viikot, joissa on avoimia tehtäviä. Jos lista on pitkä, voit näyttää kullekin suunnitelmatyypille vain seuraavan viikon.

1. Napsauta Asetukset-sivulla vasemmanpuoleisesta luettelosta **Vapaaehtoisilmoittautuminen** ja napsauta sitten **Vapaaehtoisilmoittautuminen**-osiossa **Muokkaa**.
2. Kytke päälle **Näytä vain kunkin suunnitelmatyypin seuraava viikko**.
3. Tallenna muutokset.

Kun tämä on päällä, jokainen suunnitelmatyyppi näyttää vain seuraavan tulevan suunnitelmansa. Seuraava viikko ilmestyy, kun päivämäärä on mennyt ohi. Osion rivi **Näytetyt viikot** kertoo joko **Vain kunkin suunnitelmatyypin seuraava viikko** tai **Kaikki tulevat viikot**.

## Lahjoitusten yksityisyys {#giving-privacy}

Henkilöillä, joilla on lahjoitusoikeudet, on yleensä näkyvissä henkilön [henkilötietueessa](../people/adding-people.md#editing-details) olevat lahjoitussummat. Jos et halua summien näkyvän ruudulla joka kerta, kun tietue avataan, voit piilottaa ne, kunnes joku pyytää niitä.

1. Napsauta Asetukset-sivulla vasemmanpuoleisesta luettelosta **Lahjoitusten yksityisyys** ja napsauta sitten **Lahjoitusten yksityisyys** -osiossa **Muokkaa**.
2. Kytke päälle **Piilota lahjoitukset henkilötietueissa, kunnes niitä napsautetaan**.
3. Tallenna muutokset.

Kun tämä on päällä, henkilötietueen lahjoituskortissa lukee "Lahjoitukset on piilotettu henkilötietueissa." Napsauta **Näytä lahjoitukset** ladataksesi ja näyttääksesi kyseisen henkilön lahjoitukset. Ne piiloutuvat uudelleen, kun avaat toisen henkilön tietueen. Se, kuka voi nähdä lahjoitukset, ei muutu: lahjoituskortin näkevät vain henkilöt, joilla on lahjoitusten käyttöoikeus.

## Tuonti ja vienti

Asetukset-sivulla kirkkosi nimen alla oleva linkki **Tuonti/Vienti** avaa erillisen työkalun uuteen selainikkunaan. Sillä voit:

- Tuoda jäsentietoja toisesta kirkkojen hallintajärjestelmästä.
- Viedä ChurchApps-tietosi varmuuskopiointia tai siirtoa varten.

Tämä on erityisen hyödyllistä, kun otat kirkkosi käyttöön ensimmäistä kertaa ja sinun täytyy siirtää olemassa olevia tietueita ChurchAppsiin.

:::warning
Varmuuskopioi aina olemassa olevat tietueet ennen tietojen tuomista. Tuontitoiminnot lisäävät tietoja järjestelmään ja voivat luoda kaksoiskappaleita, jos niitä ajetaan useita kertoja.
:::
