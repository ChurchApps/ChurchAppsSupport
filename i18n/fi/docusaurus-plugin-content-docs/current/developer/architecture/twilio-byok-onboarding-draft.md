---
title: "Twilio-seurakuntaliittymän käyttöönotto (luonnos)"
description: "Luonnos seurakunnan omasta B1-Twilio-asetuksesta, julkisista rekisteröitymisohjeista, kampanjaesimerkeistä ja hyväksyntätarkistuslistasta."
---

# Seurakunnan omistaman Twilion käyttöönoton luonnos

:::caution Ehdotetun integraation luonnos
Tämä on ehdotettu työnkulku. B1:ssä on nyt perus-**Twilio**-valinta kohdassa **Asetukset > Tekstiviestit** (Account SID, Auth Token, From Number ja saapuvan STOP-viestin webhook). Katso [Seurakunnan asetukset: Tekstiviestit](../../b1-admin/settings/church-settings.md#texting). Alla kuvatut lisäasetukset B1:ssä, suostumusten yhdistäminen ja vahvistusvaiheet ovat tulevan julkaisun vaatimuksia, eivät ohjeita olemassa olevien asetusten etsimiseen. Lue [tekninen ehdotus](./twilio-byok-proposal.md) laajuudesta ja riippuvuuksista. Twilion lähteet tarkistettiin 22. lokakuuta 2026; varmista ajantasaiset vaatimukset ennen kampanjan lähettämistä.
:::

## Suositeltu järjestely

Seurakunta omistaa maksullisen Twilio-tilinsä, puhelinnumeronsa, Messaging Service -palvelunsa, laskutuksensa ja kampanjarekisteröinnin. B1 lähettäisi viestit näiden resurssien kautta käyttäen tunnuksia, jotka syötetään yksityisesti seurakunnan asetuksiin. Pidä Twilio-tiliin pääsy vähintään kahdella sopivalla seurakunnan ylläpitäjällä, ota tilin suojaus käyttöön ja nimeä henkilö, joka vastaa suostumuksista, saapuvista vastauksista ja hylkäysilmoituksista.

Tässä ehdotetussa ensimmäisessä julkaisussa on yksi yhdysvaltalainen paikallisnumero ja yksi selkeästi kuvattu seurakunnan viestiohjelma. Alla olevissa esimerkeissä käytetään kuvitteellista **Grace Community Church** -seurakuntaa ja ohjelmaa **Grace Church Updates**, joka lähettää tietoja jumalanpalveluksen muutoksista, tapahtumamuistutuksia ja vapaaehtoisvuorojen ilmoituksia. Korvaa jokainen nimi, verkkotunnus, lähetystiheys, yhteystieto ja tarkoitus seurakunnan todellisella käytännöllä. Nämä ovat seurakuntakohtaisia esimerkkejä Twilion säännöistä, eivät ennalta hyväksyttyä kampanjaa tai lupausta hyväksynnästä.

## 1. Valmistele julkinen B1-rekisteröitymiskokemus

Julkaise seurakunnan B1-verkkosivustolla sivu, kuten `https://www.example.org/text-updates`, johon on upotettu julkinen B1-lomake tai selkeä linkki itsenäiseen julkiseen lomakkeeseen. Julkaise myös `https://www.example.org/privacy` ja `https://www.example.org/sms-terms`. Nämä osoitteet ovat paikanvaraajia; lähetä todelliset, saavutettavissa olevat URL-osoitteet.

Ehdotettua tekstiviestilomaketta varten:

| Asetus | Suositeltu määritys |
|---|---|
| Käyttöoikeus | Julkinen/rajoittamaton; aktiivinen tarkistuksen ja jatkuvan rekisteröitymisen ajan; käytettävissä ilman kirjautumista |
| Lomakkeen tila | Alussa vakiotila; keskustelutila vaatii tekniseen ehdotukseen kuvatun eksplisiittisen suostumustuen |
| Matkapuhelin | Selkeästi merkitty maatunnuksella; vaaditaan vain, kun valitaan tekstiviestirekisteröinti, jos sitä käytetään yleisen yhteys- tai tapahtumalomakkeen sisällä |
| Tekstiviestivalinta | Erillinen valinnainen valintaruutu, oletuksena ei valittuna, yhdistettynä tiettyyn ohjelmaan ja matkapuhelinkenttään |
| Tiedotukset | Näkyvissä tekstiviestivalinnan vieressä: seurakunta/ohjelma, viestien tarkoitus ja tiheys, mahdolliset maksut, STOP, HELP, tukiyhteys sekä todelliset klikattavat tietosuojakäytännön ja tekstiviestiehtojen linkit |
| Muut toiminnot | Vierailijat voivat lähettää yhteystietolomakkeen, ilmoittautua tapahtumaan tai pyytää tietoa liittymättä tekstiviestiohjelmaan |
| Todisteet | Tallenna ohjelma, tarkka puhelinnumero, valittu suostumus, lähetetty lomake, palvelimen aika sekä tiedotuksen ja käytännön versio; pelkkä tavallinen lomakevastaus ei tällä hetkellä rekisteröi ketään |
| Henkilö- ja ryhmäautomaatiot | Pidä automaattinen henkilön luonti ja ryhmäosoitus pois päältä alustavassa rekisteröintipilotissa, ellei seurakunnan nykyisiä vastaavuussääntöjä ole tarkistettu. Ryhmäosoitus ei koskaan ole tekstiviestin lupa. |
| Nykyiset automaatiot | Älä rekisteröi jokaista lomakkeen lähettäjää tai ryhmän jäsentä tekstiviestityönkulkuun. Vain ehdotettu vahvistettu suostumusyhdistys voi oikeuttaa tämän ohjelman. |
| Kiitosviesti | Vahvista, että lomake on vastaanotettu, mutta älä väitä rekisteröityneesi tekstiviesteihin, jos valintaruutu on jätetty valitsematta tai vahvistus tai tarkistus on vielä kesken. |

Nykyinen valintaruutukysymys voi havainnollistaa lomaketta, mutta B1 tarvitsee silti suostumuskirjanpidon ja lähetysrajoitukset. Nykyinen yhteinen renderöijä näyttää kuvaukset pelkkänä tekstinä, joten Markdownin tai URL-osoitteen kirjoittaminen sinne ei riitä takaamaan, että käytäntölinkit ovat klikattavia. Toteutuksen on tarjottava saavutettava suostumusvalinta, jossa on oikeat linkit. Katso [B1-lomakkeiden luominen](../../b1-admin/forms/creating-forms.md) ja [tekninen ehdotus](./twilio-byok-proposal.md#consent-and-suppression-are-required-release-work).

Twilio vaatii vapaaehtoisen ja todennettavissa olevan suostumuksen. Älä yhdistä tekstiviestilupaa pakollisiin jäsenehtoihin, sähköposti- tai puhelinlupiin, lahjoitussuostumukseen tai tapahtumailmoittautumiseen. Kävijäkortin matkapuhelinnumero ei sellaisenaan ole tekstiviestisuostumus. Katso Twilion [vapaaehtoisen suostumuksen vaatimukset](https://www.twilio.com/docs/api/errors/30923) ja [kampanjasuositukset](https://help.twilio.com/hc/en-us/articles/26149060902555-A2P-10DLC-Campaign-Registration-Recommendations).

### Esimerkki rekisteröitymisteksteistä

Käytä tätä vasta, kun seurakunta on valinnut todelliset tarkoitukset, lähettäjän ja tiheyden. Valintaruutu on valinnainen ja alussa valitsematta; alla mainittujen käytäntöjen nimien on oltava linkkejä valmiissa lomakkeessa.

> Kyllä, haluan Grace Community Churchin lähettävän minulle Grace Church Updates -ohjelman kautta tekstiviestejä jumalanpalveluksen muutoksista, seurakunnan tapahtumista ja vapaaehtoisvuoroista numerosta [rekisteröity seurakunnan numero]. Viestejä voi tulla enintään 4 kuukaudessa. Viesti- ja datamaksut voivat soveltua. Vastaa STOP lopettaaksesi tai HELP saadaksesi apua. Tekstiviestiin liittyminen on vapaaehtoista, eikä se ole edellytys osallistumiselle, ilmoittautumiselle tai lahjoittamiselle. Katso tietosuojakäytäntömme ja tekstiviestiehtomme. Kysymykset: [seurakunnan tukisähköposti tai puhelin].

”Enintään 4” on esimerkkisitoumus, ei Twilion asettama raja. Korvaa se tiheydellä, jonka seurakunta todella pystyy toteuttamaan. Jos tiheys vaihtelee, kerro se rehellisesti ja kuvaa odotettu rytmi. Pidä myyntiin tai kampanjointiin liittyvät vetoomukset tai muut seurakunnan ohjelmat tämän valintaruudun ulkopuolella, ellei niiden tarkoitusta ja suostumusta ole erikseen arvioitu.

Yleisellä kävijä- tai tapahtumalomakkeella lomakkeen pitää onnistua, vaikka tämä ruutu on jätetty valitsematta. Pelkkä tekstiviestilomake voi selittää, että ruudun valinta pyytää rekisteröitymistä, mutta se ei saa koskaan tehdä muista seurakunnan palveluista riippuvaisia rekisteröitymisestä. Vahvista todellinen toiminta sekä puhelimella että tietokoneella.

### Laadittavat käytäntösisällöt

Seurakunnan tietosuojasivun pitää selittää, mitä tietoja tekstiviestejä varten kerätään, miten niitä käytetään ja suojataan sekä säilytys- ja yhteydenottokäytännöt. Sen pitää selvästi todeta, että matkapuhelinnumeroita ja viestilupia ei myydä eikä jaeta kolmansille osapuolille tai tytäryhtiöille heidän markkinointiinsa tai mainontaansa. Selitä tarpeelliset palveluntarjoajien käsittelyt täsmällisesti; älä väitä, ettei seurakunta käytä mitään palveluntarjoajaa, jos se käyttää B1:tä ja Twilioa. Twilion [tietosuojaohjeet](https://www.twilio.com/docs/api/errors/30908) ja [kampanjasuositukset](https://help.twilio.com/hc/en-us/articles/26149060902555-A2P-10DLC-Campaign-Registration-Recommendations) ovat tämän erottelun vertailukohta.

Tekstiviestiehtojen pitää tunnistaa seurakunta ja ohjelma, tarkoitukset, todellinen tiheys, mahdolliset viestimaksut, STOP- ja HELP-ohjeet, tukiyhteys ja tietosuojalinkki. Lisää kaikki muut tiedotukset, joita Twilion nykyinen tarkistus vaatii. Valintaruudun käytäntölinkkien on vastattava tarkalleen kampanjassa lähetettyjä URL-osoitteita. Twilio vaatii 26. kesäkuuta 2026 lähtien uusiin API-kampanjarekisteröintehin julkiset ja omistetut tietosuoja- ja ehto-URL-osoitteet; sen Console-prosessi kerää ne myös. [Twilion vaatimus](https://www.twilio.com/en-us/changelog/a2p-10dlc-campaign-registration-will-require-privacy-policy-and-)

Nämä ovat sisältövaatimuksia, jotka pitää soveltaa seurakunnan todellisiin käytäntöihin. Ne eivät korvaa seurakunnan olemassa olevia tietosuojakäytäntöjä, eikä niitä pidä kopioida yleisenä käytäntönä tarkistamatta.

## 2. Rekisteröi seurakunta ja sen viestiohjelma Twiliessä

1. Luo tai käytä **seurakunnan omistamaa maksullista tiliä** ja SMS-yhteensopivaa yhdysvaltalaista paikallisnumeroa. Käytä seurakunnan virallista nimeä, Y-tunnusta tai vastaavaa rekisteröintitietoa, osoitetta, verkkosivustoa ja valtuutetun edustajan tietoja johdonmukaisesti. Älä korvaa niitä ChurchAppsin tai minkään muun seurakunnan tiedoilla.
2. Noudata Twilion suoran asiakkaan Brand-rekisteröintiprosessia seurakunnan todelliselle yhteisötyypille. Kelpaavalle voittoa tavoittelemattomalle organisaatiolle käytä [voittoa tavoittelemattomien rekisteröintiohjeita](https://www.twilio.com/docs/messaging/compliance/a2p-10dlc/onboarding-for-government-and-non-profit-agencies). Hyväntekeväisyys- tai 501(c)(3)-käyttö riippuu kelpoisuudesta; pelkkä seurakunnan nimi ei osoita Twilion hyväksyntää tai vapautusta.
3. Luo oma Messaging Service ja lähetä asiaankuuluva A2P 10DLC -kampanja. Valitse käyttötapaus, joka vastaa totuudenmukaisesti todellisia viestejä ja sitä Brandia, joka on hyväksytty; tässä mainitut esimerkit eivät määrää yleistä seurakunnan käyttötapauskoodia.
4. Anna julkinen rekisteröitymisosoite, käytäntö-URL-osoitteet, täydellinen suostumuksen ja viestivirran kuvaus sekä pyydetyt esimerkkiviestit. Ilmoita kaikki todelliset rekisteröitymistavat ja aseta linkki- ja puhelinnumeroilmoitukset vastaamaan todellista sisältöä. Älä ilmoita avainsanarekisteröitymistä tai kaksinkertaista vahvistusta, ellei sitä ole olemassa ja testattu.
5. Liitä lähetysnumero palveluun ja hyväksyttyyn kampanjaan. Odota sekä kampanjan vahvistusta että **valmista numeron rekisteröintiä** ennen lähettämistä.

Pidä nämä vaiheet seurakunnan omassa Twilio-konsolissa. Ehdotettu B1-integraatio ei lähetä rekisteröintejä seurakuntien puolesta. Twilion [rekisteröinnin pikaohje](https://www.twilio.com/docs/messaging/compliance/a2p-10dlc/quickstart) ja [kampanjaresurssi](https://www.twilio.com/docs/messaging/api/usapptoperson-resource) selittävät rekisteröintikentät ja tilat. Odottava numero voi estää lähettämisen, vaikka kampanja olisi hyväksytty. [Numeron rekisteröinti](https://www.twilio.com/docs/api/errors/30035)

### Esimerkki kampanjan kuvauksesta

> Grace Community Church käyttää Grace Church Updates -ohjelmaa lähettämään jumalanpalveluksen aikataulumuutoksia, seurakunnan tapahtumien muistutuksia ja vapaaehtoisvuorojen ilmoituksia ihmisille, jotka valitsevat tämän ohjelman seurakunnan julkisella verkkosivulla. Lähetämme tämän ohjelman puitteissa enintään neljä viestiä kuukaudessa. Vastaanottajat voivat lopettaa viestit milloin tahansa. Ohjelma ei sisällä ostettuja yhteystietoja, kolmannen osapuolen mainontaa eikä varainkeruuvetoomuksia.

Tämä esimerkki sopii vain seurakunnalle, joka todella noudattaa näitä rajoja ja poikkeuksia. Jos pelkät vapaaehtoismuistutukset ylittävät luvatun tiheyden, muuta ohjelman suunnittelua ja tiedotusta ennen lähettämistä.

### Esimerkki viestivirran kuvauksesta

> Kävijät avaavat [todellinen seurakunnan rekisteröitymisosoite], syöttävät matkapuhelinnumeronsa ja valitsevat erikseen valinnaisen Grace Church Updates -valintaruudun. Ruutu on valitsematta, kun lomake avautuu. Tiedotus nimeää Grace Community Churchin, kuvaa jumalanpalvelusmuutokset, tapahtumamuistutukset ja vapaaehtoisvuorot, ilmoittaa kuukausirajan ja mahdolliset maksut sekä selittää STOP- ja HELP-ohjeet. Näytetyt tietosuojakäytäntö- ja tekstiviestiehtolinkit vievät osoitteisiin [todellinen tietosuojan URL] ja [todellinen tekstiviestiehtojen URL]. Tekstiviestien hylkääminen ei estä osallistumista, tapahtumaan ilmoittautumista, lahjoittamista tai yleisen yhteyslomakkeen käyttöä. B1 tallentaa myönteisen valinnan, puhelinnumeron, lähetysajan ja tiedotuksen version. Lähetämme tätä ohjelmaa vain dokumentoiduille tilaajille ja estämme peruutetut tilaukset ennen uusia lähetyksiä.

Mukauta tämä kappale toteutettuun virtaan. Jos käytetään puhelinvahvistusta tai henkilökunnan tarkistusta, kuvaa odottava tila ja tarkka aktivointivaihe. Jos käytetään muita tapoja, sisällytä jokainen tapa ja sen todisteet. Jos rekisteröityminen tapahtuu kirjautumisen takana tai paperilla, Twilio pyytää julkisia, tiedot poistettuja todisteita todellisesta suostumuskokemuksesta; älä koskaan paljasta täytettyjä lomakkeita tai jäsentietoja. [Todennettavan suostumuksen ohjeet](https://www.twilio.com/docs/api/errors/30923)

### Esimerkki lähtevistä viesteistä

Nämä ovat kuvitteellisia näytteitä, joita pitää mukauttaa; käytä aitoja seurakunnan URL-osoitteita ja korvaa hakasulkeissa olevat arvot ennen lähettämistä. Twilion kampanjarajapinta hyväksyy kahdesta viiteen näytettä. Näytteiden pitää tunnistaa seurakunta, vastata ilmoitettua tarkoitusta ja sisältää ohje uloskirjautumiseen. [Kampanjanäytteen kentät](https://www.twilio.com/docs/messaging/api/usapptoperson-resource)

```text
Grace Community Church: Sunnuntain jumalanpalvelus alkaa kello [aika] syystä [syy]. Lisätiedot: [seurakunnan verkkosivun URL]. Vastaa STOP lopettaaksesi viestit.
```

```text
Grace Community Church: Muistutus, että [seurakunnan tapahtuma] on [päivämäärä] kello [aika]. Tiedot: [seurakunnan tapahtuman URL]. Vastaa STOP lopettaaksesi viestit.
```

```text
Grace Community Church: Sinut on merkitty palvelemaan tiimissä [tiimi] tänä [päivänä]. Tarkista suunnitelma: [B1-seurakuntaportaalin URL]. Vastaa STOP lopettaaksesi viestit.
```

Hakasulkeissa olevat URL-osoitteet kuvaavat esimerkkimuuttujia; lähetetyissä näytteissä pitää näkyä seurakunnan todellinen verkkotunnus ja todellinen linkkityyli. Suunnitelmaan johtava linkki voi vaatia kirjautumisen, mutta rekisteröitymissivun ja tarkistukseen käytettyjen käytäntöjen pitää olla julkisesti tarkasteltavissa. Älä sisällytä hyväksyntänäytteisiin yksityisiä muistiinpanoja, lasten tietoja tai tunnistettavia jäsentietoja. Pidä näytesisältö yhdenmukaisena sen kanssa, mitä B1:n mallit todella lähettävät; älä lupaa vastausten postilaatikkoa tai tiettyä muistutuskäyttäytymistä, joka ei ole saatavilla.

### STOP-, START- ja HELP-vastaukset

Käytä näihin vahvistuksiin Twilion Messaging Service Advanced Opt-Out -toimintoa ja mukauta seurakunnan ja ohjelman tunnistetiedot sekä tukitiedot. Esimerkkivastausten tarkoitus:

- **STOP:** Vahvista, että Grace Church Updates on lopetettu, ja selitä tuettu tapa aloittaa uudelleen.
- **START:** Vahvista saman ohjelman jatkuminen, mukaan lukien sen tunnistetiedot, tiheys/maksut ja ohje- ja lopetusohjeet määritetyn virran vaatimalla tavalla.
- **HELP:** Tunnista Grace Community Church ja anna todellinen tukiyhteys sekä uloskirjautumisohjeet.

Älä lähetä toista B1-vahvistusta, jos Twilio on jo vastannut. HELP-vastaus ei ole rekisteröitymistä. START ei saa ilmoittaa ihmistä muihin seurakunnan ohjelmiin tai näkyä jäsenhakemistossa. [Twilio Advanced Opt-Out](https://www.twilio.com/docs/messaging/tutorials/advanced-opt-out)

## 3. Tarkista hyväksyntäpaketti ennen lähettämistä

- [ ] Seurakunnan todelliset laillinen nimi/Brand-tiedot, verkkosivuston identiteetti ja kampanjan tarkoitus täsmäävät.
- [ ] Rekisteröitymissivu ja aktiivinen lomake avautuvat ilman kirjautumista yksityisessä selaimessa, myös mobiililaitteella.
- [ ] Tekstiviestiruutu on alussa valitsematta ja sen voi jättää valitsematta samalla kun suorittaa vierailija- tai tapahtumatoiminnon.
- [ ] Ohjelman tarkoitus, lähettäjä, todellinen tiheys, mahdolliset maksut, STOP, HELP, tukiyhteys ja klikattavat käytäntölinkit näkyvät tekstiviestivalinnan vieressä.
- [ ] Twilionille annetut täsmälliset tietosuoja- ja ehto-URL-osoitteet ovat julkisia, toimivat ilman tunnuksia ja tunnistavat saman seurakunnan ja ohjelman. Käytäntösisältö vastaa todellista käsittelyä.
- [ ] Jokainen näytteviesti vastaa ohjelmaa, todellista lähettäjän identiteettiä ja odotettua linkki- tai puhelinnumerokäyttäytymistä. Kampanja kuvaa jokaisen todellisen suostumustavan.
- [ ] Tiedot poistetut kuvakaappaukset näyttävät tyhjän lomakkeen, valintaruudun ja tiedotukset sekä käytäntölinkit niin kuin tarkastajat ne näkevät. Todisteissa ei ole jäsentietoja eikä avaimia.
- [ ] Seurakunnalla on toimiva tapa säilyttää suostumustodisteet ja kunnioittaa peruutuksia ennen lähettämistä, mukaan lukien puhelimitse tai sähköpostitse tulleet pyynnöt.

Nämä tarkistukset vähentävät vältettävissä olevia ristiriitoja; Twilio ja sen tarkastuskumppanit tekevät hyväksyntäpäätöksen. Pidä todelliset rekisteröitymissivu ja käytäntö-URL-osoitteet saatavilla hyväksynnän jälkeenkin, ei vain tarkistuksen aikana.

## 4. Yhdistä ja vahvista tuleva B1-integraatio

Integraation julkaisun jälkeen ehdotetun Tekstiviestit-asetuksen pitää kerätä seurakunnan Account SID, oma API Key SID ja salaisuus, erillinen webhook-todennustunnus, Messaging Service SID ja valittu lähettäjä. Luo avaimet vain seurakunnan omassa konsolissa ja syötä salaisuudet vain yksityisiin B1-asetuksiin. [Twilion API-avainohjeet](https://www.twilio.com/docs/iam/api-keys)

Kopioi B1:n antamat seurakuntakohtaiset saapuvien viestien ja toimitustilan webhook-URL-osoitteet vastaavaan Twilio-palvelun määritykseen. Ota Advanced Opt-Out käyttöön ja tarkista, että saapuvat viestit saapuvat määritettyyn webhookiin. B1:n pitää näyttää erilliset tarkistukset tunnuksille, palvelun ja lähettäjän omistajuudelle, vahvistetulle kampanjalle, valmiille numeron rekisteröinnille, saapuvien viestien vahvistukselle ja onnistuneelle testiviestille. Tallennettu tunnus tai hyväksytty API-pyyntö ei ole lopullinen toimitus.

Jos B1 ei voi ohjelmallisesti tarkistaa rekisteröintisignaalia, vahvista se suoraan konsolissa; käyttöliittymän pitää merkitä päivätty tulos ylläpitäjän vahvistamaksi. Ratkaise odottava tai epäonnistunut tila ennen tuotantoviestien käyttöönottoa. Käytä erillistä, erikseen pyydettyä testiä todelliselle suostuneelle aikuiselle testivastaanottajalle, ja sen jälkeen:

1. Vahvista, että vastaava dokumentoitu rekisteröityminen luo oikean puhelin- ja ohjelmasuostumuksen tietueen; tekstiviestien hylkääminen tai puhelinnumeron vaihtaminen ei saa rekisteröidä vastaanottajaa hiljaa.
2. Lähetä yksi testiviesti, vahvista vastaanotto ja vertaa B1:n tilaa Twilion Message SID:hen ja toimitustulokseen.
3. Vastaa STOP ja tarkista, että manuaaliset viestit, ryhmäviestit, työnkulut ja muistutukset ohittavat tämän puhelinnumeron. Hakemiston näkyvyys ei saa muuttua.
4. Testaa dokumentoitu saman ohjelman uudelleentilausvirta ja HELP-vastaus; varmista, ettei tule kaksoisvahvistuksia eikä muita, ei-liittyviä asetusmuutoksia.

## 5. Ylläpidä ohjelmaa

Nimeä seurakunnan omistaja, joka seuraa kampanjan ja tilin tilaa, saldo- ja laskutushälytyksiä, viestivirheitä sekä saapuvia vastauksia Twiliessä. Ehdotetussa ensimmäisessä B1-julkaisussa ei ole keskustelevaa tekstiviestien postilaatikkoa, joten julkaise ja seuraa todellista tukiyhteystietoa ja tarkista vastaukset sen sijaan, että oletat henkilökunnan näkevän ne B1:ssä.

Pidä suostumus- ja peruutushistoria, nykyiset tiedotus- ja käytäntöversiot, kampanjatunnisteet ja tiedot poistetut hyväksyntätodisteet seurakunnan hallinnoimissa tietueissa. Älä koskaan liitä avaimia tai vastaanottajaluetteloita julkisiin tukipyyntöihin. Kun numero, palvelu, tunnukset, rekisteröitymisvirta, tiheys tai tarkoitus muuttuu, tarkista integraatio uudelleen ja päivitä rekisteröinti ja suostumukset tarvittaessa ennen jatkamista. Tarkista huolellisesti kotitalouksien yhteiset numerot ja vaihdetut numerot; oikeus perustuu suostuneeseen puhelimeen ja ohjelmaan, ei jokaisen perheenjäsenen tietueeseen.

Hylkäyksen tapauksessa lue Twilion todellinen virheilmoitus, korjaa tietty epäjohdonmukaisuus sekä verkkosivustolla että lähetyksessä ja lähetä uudelleen seurakunnan konsolin kautta. Rekisteröimättömille tai odottaville lähettäjille odota rekisteröinnin valmistumista sen sijaan, että vaihtaisit numeroita toimiakseen ympäri sitä. Käytä [Twilion rekisteröinnin vianmääritystä](https://www.twilio.com/docs/messaging/compliance/a2p-10dlc/troubleshooting-a2p-brands) ja annettua virhekoodiviitettä. Älä lupaa kiinteää käsittelyaikaa.
