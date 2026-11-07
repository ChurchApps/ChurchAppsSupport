---
title: "Palvelimen ylläpito"
---

# Palvelimen ylläpito

<div class="article-intro">

Palvelimen ylläpitotoiminnot ChurchAppsissa ovat käytettävissä vain käyttäjille, joilla on **Server.Admin**-oikeus. Näitä työkaluja käytetään alustan toimintaan, asiakastukeen ja vianmääritykseen kaikissa järjestelmän seurakunnissa.

</div>

:::warning Pääsy rajoitettu
Tällä sivulla kuvatut toiminnot vaativat **Server.Admin**-oikeuden, eivätkä ne ole käytettävissä tavallisille seurakunnan ylläpitäjille. Ne on tarkoitettu vain alustan operaattoreille ja tukihenkilöstölle.
:::

## Palvelimen ylläpitoon siirtyminen

Käyttäjät, joilla on Server.Admin-oikeus, pääsevät palvelimen ylläpitonäkymään B1 Administa:

1. Kirjaudu sisään osoitteessa [admin.b1.church](https://admin.b1.church)
2. Avaa [Hyppyvalikko](../b1-admin/introduction.md#getting-around-with-the-jump-menu), laajenna kohta **Asetukset** ja valitse **Server Admin**. (Pääset suoraan myös osoitteeseen `admin.b1.church/admin`.)
3. Palvelimen ylläpitonäkymä listaa osionsa vasemmalla kolmessa ryhmässä: **Hakemisto** (Seurakunnat, Käyttäjät, Käyttäjänä kirjautuminen), **Toiminnot** (Taustatyöt, Commons, Käyttötrendit) ja **Järjestelmä** (Käännöshaut, Palvelimen tila, Tietokantamigraatiot)

## Kaksivaiheisen kirjautumisen nollaus

Jos käyttäjällä on [kaksivaiheinen kirjautuminen](../b1-admin/profile/managing-profile.md#two-factor-sign-in) käytössä ja hän on menettänyt sekä puhelimensa että varakoodinsa, palvelimen ylläpitäjä voi poistaa kaksivaiheisen kirjautumisen käytöstä:

1. Avaa palvelimen ylläpitonäkymän **Käyttäjät**-osio ja etsi käyttäjä.
2. Käyttäjillä, joilla kaksivaiheinen kirjautuminen on käytössä, näkyy merkki **Kaksivaiheinen päällä**. Klikkaa sen vieressä **Nollaa 2FA**.
3. Vahvista kehote. Tee tämä vasta, kun olet varmistanut, kenen kanssa olet tekemisissä.

Käyttäjä voi sitten kirjautua pelkällä salasanalla ja määrittää kaksivaiheisen kirjautumisen uudelleen profiilistaan. Nollaukset kirjataan tapahtumalokiin nimellä `mfa_reset`. Päätepiste on `POST /membership/users/mfa/reset/:userId`, ja se vaatii Server.Admin-oikeuden.

## Käyttäjänä kirjautuminen

Käyttäjänä kirjautumisen avulla palvelimen ylläpitäjät voivat kirjautua toisen käyttäjän tilille tukea ja vianmääritystä varten. Siitä on hyötyä, kun selvitetään käyttäjien ilmoittamia ongelmia tai autetaan seurakuntia järjestelmiensä määrittämisessä.

### Käyttäjänä kirjautuminen

1. Avaa palvelimen ylläpitonäkymän **Käyttäjänä kirjautuminen** -osio.
2. Kirjoita käyttäjän nimi tai sähköpostiosoite hakukenttään.
3. Klikkaa **Hae** tai paina Enter-näppäintä.
4. Valitse hakutuloksista käyttäjä, jonka tilille haluat kirjautua.
5. Vahvista käyttäjänä kirjautuminen ilmestyvässä ikkunassa.
6. Sinut kirjataan sisään kyseisenä käyttäjänä ja ohjataan hänen tililleen.

### Tärkeitä huomioita

- Käyttäjänä kirjautuminen luo uuden istunnon kohdekäyttäjän oikeuksilla ja seurakuntien käyttöoikeuksilla.
- Oma ylläpitäjäistuntosi päättyy, kun kirjaudut käyttäjänä toiselle käyttäjälle.
- Kaikki käyttäjänä kirjautuneena tehdyt toimet kirjataan tapahtumalokiin.
- Palataksesi ylläpitäjätilillesi kirjaudu ulos ja takaisin sisään omilla tunnuksillasi.
- Käytä käyttäjänä kirjautumista vain tarvittaessa tukitarkoituksiin, ja ilmoita aina käyttäjille, kun pääset heidän tileilleen tukea varten.

### API-päätepiste

Käyttäjänä kirjautuminen perustuu Membership API:n päätepisteeseen `/users/:userId/impersonate`. Tekniset tiedot löydät sivulta [Membership-päätepisteet](/docs/developer/api/endpoints/membership#users).

### Turvallisuusnäkökohdat

- Käyttäjänä kirjautuminen vaatii Server.Admin-oikeuden. Oikeutta tulee myöntää harkiten ja vain luotettaville alustan operaattoreille.
- Kaikki käyttäjänä kirjautumiset kirjataan ylläpitäjän käyttäjätunnuksen ja kohdekäyttäjän tunnuksen kanssa.
- Seurakuntia ei ilmoiteta, kun käyttäjänä kirjautuminen tapahtuu, joten laadi selkeät käytännöt siitä, milloin ja miten tätä ominaisuutta käytetään.
- Harkitse käyttäjänä kirjautumistapahtumien dokumentointia tukipyyntöjärjestelmääsi vastuullisuuden vuoksi.

## Commons-moderointi

Commons on käyttäjien tuottaman sisällön yhteinen moderointijono eri tuotteissa. WorshipCommons-laulut, Lessons.church-oppitunnit, FreeShow-mallipohjat ja B1-verkkosivusuunnittelijan mallipohjat kulkevat kaikki samaa jonoa tuotekohtaisten tarkastustyökalujen sijaan.

### Commonsiin siirtyminen

1. Siirry palvelimen ylläpitonäkymän **Commons**-välilehdelle.
2. Näet kolme alavälilehteä: **Jono**, **Raportit** ja **Aineistot**.

Rajoitettu **musiikkieditori**-rooli näkee myös Jono-välilehden, mutta sillä ei voi hyväksyä lähetyksiä, jotka muuttavat laulun oikeuksia tai lisensointia.

### Jono

Jonossa näkyvät kaikki odottavat lähetykset kaikista tuotteista. Niitä voi suodattaa tuotteen ja aineistotyypin mukaan. Jokaisella rivillä näkyy, onko lähetys uusi aineisto, alkuperäisen tekijän muokkaus vai kolmannen osapuolen muokkaus. Rivillä näkyy myös lähettäjän hyväksyntähistoria ja se, kuinka kauan lähetys on odottanut. Yli 72 tuntia odottaneet lähetykset merkitään.

Klikkaa **Tarkista**, niin avautuu paneeli, jossa on kenttäkohtaiset erot, tiedostojen esikatselut ja upotettu vain luku -esikatselu kohteesta. Hyväksy tai hylkää lähetys pikanäppäimillä **a** ja **r**. Näppäimillä **j** ja **k** siirryt seuraavaan tai edelliseen lähetykseen paneelista poistumatta. Hylätessäsi sinun on valittava syy (esimerkiksi laatu, kaksoiskappale, lisensointi, CCLI, tekoäly tai aiheen ulkopuolinen) ja kirjoitettava huomautus.

### Raportit

Raportit-välilehdellä käsitellään julkaistuihin aineistoihin tehtyjä tekijänoikeus- sekä käytäntö- ja laatuilmoituksia. Ne on jaettu erillisiin Tekijänoikeus- ja Käytäntö ja muu -jonoihin sekä Ratkaistut-historiaan. Aloita raportin käsittely ottamalla se itsellesi. Ratkaise se sitten valitsemalla ratkaisu (hyväksytty, hylätty tai kaksoiskappale) ja toimenpide (ei mitään, poista julkaisusta tai poista).

### Aineistot

Aineistot-välilehti on haettava selain julkaistuille sisällöille. Siinä voit **Nostaa esiin** aineiston (se korostuu tuotteen etusivulla), **Poistaa julkaisusta** tai **Julkaista uudelleen** sen, tai **Poistaa** sen tekijänoikeus- tai käytäntösyyn perusteella.

Lauluja koskee lisäksi se, että tästä näkymästä laulu tulee **sunnuntaivalmiiksi**. Vain sunnuntaivalmiit laulut voivat näkyä seurakunnan B1 Adminin laulunhaussa. Tarkastaja avaa aineiston ja merkitsee jokaisen julkaistun sävellajin kohdalle **Kuunneltu**-merkinnän, kun on kuunnellut kappaleen läpi ja varmistanut, että nuotit, soinnut ja diat ovat kaikki paikallaan. Laulu on sunnuntaivalmis vasta, kun jokainen sävellaji on merkitty kuunnelluksi.

:::info
Commons-moderointi on vain henkilöstölle. Yksittäiset seurakunnat eivät näe tätä jonoa. Ainoa kohta, jossa yksittäisen seurakunnan B1 Admin käyttää Commons-tietoja, on [laulunhaun](/docs/b1-admin/serving/songs#free-songs-from-worshipcommons) osio „WorshipCommons — ilmainen“. Se näyttää vain laulut, jotka ovat jo käyneet tämän tarkastuksen läpi.
:::

Katso tietomallin ja lähetyksen elinkaaren kuvaus sivulta [Content Commons -arkkitehtuuri](/docs/developer/architecture/commons).

## Sähköpostin hyväksyntä ryhmille

Seurakunnat eivät voi lähettää seurakunnan kirjoittamia sähköposteja (ryhmäsähköpostit, lomakkeiden jatkoviestit, työnkulun sähköpostit ja tilikutsut), ennen kuin palvelimen ylläpitäjä on hyväksynyt ne. Näin estetään botin kautta rekisteröityjä seurakuntia käyttämästä yhteistä ChurchApps-lähetysosoitetta roskapostiin.

1. Avaa palvelimen ylläpitonäkymän **Seurakunnat**-välilehti.
2. Jokaisessa seurakunnassa näkyy **Ryhmäsähköposti**-merkki: **Hyväksytty** (vihreä) tai **Ei hyväksytty** (ääriviivat).
3. Klikkaa merkkiä ja vahvista, jos haluat hyväksyä seurakunnan tai peruuttaa hyväksynnän.

Seurakunnan henkilökunta pyytää hyväksyntää B1 Adminin Lähetä sähköposti -ikkunan painikkeella **Pyydä tarkistusta**. Pyyntö lähetetään tukiosoitteeseen, ja siinä ovat seurakunnan nimi, tunnus, rekisteröintipäivä, sijainti sekä pyytäjä. Seurakunta voi lähettää yhden pyynnön viikossa. Katso päivittäinen kiintiö ja bounce- ja valituspalautteesta automaattisesti johtuva keskeytys sivulta [Seurakunnan kirjoittamien sähköpostien rajat](/docs/developer/architecture/notifications#church-authored-email-limits).

## Tietokantamigraatiot

**Deploy Prod** -työnkulku käyttää vireillä olevat migraatiot itse. Hostatut tietokannat hyväksyvät yhteyksiä vain Api-verkon sisältä, joten GitHub-ajuri ei saa niihin yhteyttä. Sen sijaan heti `serverless deploy` -komennon jälkeen työnkulku kutsuu Api:n `migrate`-Lambdaa (`api-Prod-migrate`). Lambda ajaa jokaisen moduulin vireillä olevat migraatiot samalla ajurilla kuin tämä välilehti. Jos jokin moduuli epäonnistuu tai estyy, julkaisu epäonnistuu. **Rollback Prod** palauttaa vain Lambda-koodin. Jo käytetyt migraatiot pysyvät käytettyinä. **Tietokantamigraatiot**-välilehti on tarkoitettu tilan tarkistamiseen, sellaisten migraatioiden ajamiseen, joita julkaisu ei ajanut (esimerkiksi demoympäristössä, jonka julkaisu ei suorita migraatioita), ja moduulien alustamiseen, joilla ei ole historiaa. (Itse ylläpidetyissä Docker-asennuksissa migraatiot ajetaan edelleen automaattisesti, kun Api-kontti käynnistyy.)

Välilehdellä näkyy nykyinen ympäristö ja yksi rivi jokaiselle moduulille (membership, attendance, giving ja muut). Rivillä on tila, käytettyjen ja vireillä olevien migraatioiden määrä sekä viimeksi käytetty migraatio.

- **Aja vireillä olevat migraatiot** käyttää kaikki vireillä olevat migraatiot yksi moduuli kerrallaan järjestyksessä. Se pysähtyy ensimmäiseen virheeseen ja näyttää, mitä on käytetty kullekin moduulille.
- Moduuli, jonka merkki on **Ei historiaa**, on tietokanta, joka on olemassa ennen migraatioiden seurantaa. Sitä ei ajeta automaattisesti, koska se toistaisi vanhat datamigraatiot live-tauluilla. Klikkaa sen sijaan sen moduulin kohdalla **Tarkista skeema**. Api vertaa kunkin migraation luomia tauluja, sarakkeita ja indeksejä live-tietokantaan. Jokaiselle migraatiolle annetaan merkki: **Jo käytetty**, **Puuttuu**, **Osittain käytetty** tai **Vain data**. Tarkistus ei muuta mitään.
- Tarkistustuloksissa **Merkitse jo käytetyksi** kirjaa tunnistetut migraatiot migraatiohistoriaan ajamatta niitä (vahvistuksen jälkeen). Kaikki viimeiseen **Jo käytettyyn** migraatioon asti kirjataan, mukaan lukien **Vain data** -migraatiot tällä välillä. **Puuttuu**-migraatiot jäävät vireille, ja ne voi sen jälkeen ajaa normaalisti painikkeella **Aja vireillä olevat migraatiot**.
- **Osittain käytetty** -migraatio estää kirjaamisen. Jos migraation voi turvallisesti ajaa uudelleen (lue se ensin), valitse **Aja uudelleen**, jolloin se jää vireille ja ajetaan alusta.

Palvelimen ylläpitonäkymä ja komentorivityökalu (`yarn migrate:up`) käyttävät samaa Kysely-migraattoria ja samaa `kysely_migration`-taulua, joten ne ovat aina yhtä mieltä siitä, mitkä migraatiot on käytetty. Taustalla olevat päätepisteet ovat `GET /membership/serverHealth/migrations`, `POST /membership/serverHealth/migrations/:module/run`, `GET .../:module/detect` ja `POST .../:module/baseline`. Kaikki vaativat Server.Admin-oikeuden.

## Aiheeseen liittyvät sivut

- [Todennus ja oikeudet](/docs/developer/api/endpoints/authentication) — Oikeusmalli ja JWT-todennus
- [Membership-päätepisteet](/docs/developer/api/endpoints/membership) — Käyttäjien ja seurakuntien hallinnan API
- [Tapahtumaloki](/docs/b1-admin/reports/audit-log) — Seurakunnan toimintalokien tarkastelu
- [Content Commons -arkkitehtuuri](/docs/developer/architecture/commons) — Jaetun aineiston malli ja moderoinnin elinkaari
