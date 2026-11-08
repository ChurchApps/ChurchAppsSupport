---
title: "Itsesisäänkirjautumisen käyttöönotto B1 Checkinin ja B1 Adminin avulla"
sidebar_label: "Sisäänkirjautuminen"
description: "Ota jumalanpalveluksiin itsesisäänkirjautuminen käyttöön B1 Adminin B1 Checkin -sovelluksella: laitteet, kioskitilit, aikataulut, brändäys ja QR-koodilla tapahtuva vierasrekisteröinti."
---

# Sisäänkirjautuminen

<div class="article-intro">

B1 Admin tukee itsesisäänkirjautumista jumalanpalveluksiin oheissovelluksen **B1 Checkin** avulla. Jäsenet voivat kirjautua itse itsensä ja perheensä sisään kioskeilla tai omistetuilla laitteilla saapuessaan, mikä nopeuttaa prosessia ja vähentää vapaaehtoisten työmäärää. Jokainen sisäänkirjautuminen kirjautuu automaattisesti läsnäoloksi.

</div>

<div class="prereqs">
<h4>Ennen aloittamista</h4>

- Seurakuntasi kampukset, jumalanpalveluksien ajat ja ryhmät on määritettävä [Läsnäolon asetuksissa](setup.md).
- Tarvitset [henkilöitä tietokannassasi](../people/adding-people.md) ja [talouksia](../people/adding-people.md#managing-households), jotta perheet voivat kirjautua sisään yhdessä.
- Tarvitset tabletin ja mahdollisesti Brother-tarrakirjoittimen (katso [laitesuositukset](#recommended-hardware) alla).

</div>

## Miten se toimii

B1 Checkin -sovellus yhdistyy B1 Adminin läsnäoloasetuksiin. Kun jäsen kirjautuu sisään, hänen läsnäolonsa kirjataan automaattisesti oikealle kampukselle, oikeaan jumalanpalveluksen aikaan ja oikeaan ryhmään. Sinun ei tarvitse syöttää läsnäoloa käsin kenellekään, joka käyttää sisäänkirjautumisjärjestelmää.

## Sisäänkirjautumisen käyttöönotto

1. **Määritä ensin läsnäolon rakenne.** Siirry B1 Adminissa kohtaan **Ihmiset > Läsnäolo** ja valitse **Asetukset** varmistaaksesi, että kampukset, jumalanpalveluksien ajat ja ryhmät ovat paikallaan. Sisäänkirjautumissovellus perustuu tähän määritykseen. Voit halutessasi antaa jokaiselle jumalanpalveluksen ajalle [sisäänkirjautumisaikataulun](setup.md#setting-a-check-in-schedule), jotta sisäänkirjautuminen avautuu ja sulkeutuu automaattisesti joka viikko. Aikataulut käyttävät jumalanpalveluksen kampuksen aikavyöhykettä tai seurakuntasi aikavyöhykettä, jos kampukselle ei ole asetettu omaa. Kioski näyttää jumalanpalveluksen ajat, joiden aikaikkuna on suljettu, merkittynä **Suljettu**-tilaan ja kertoo perheille, milloin sisäänkirjautuminen avautuu. Lisätietoja on kohdassa [Läsnäolon asetukset](setup.md).
2. **Asenna B1 Checkin -sovellus** laitteisiin, joita aiot käyttää. Sovellus on saatavilla seuraavilla alustoilla:
   - **iPad/iOS:** [Apple App Store](https://apps.apple.com/us/app/b1-church-check-in/id6775081998)
   - **Android/Samsung-tabletit:** [Google Play Store](https://play.google.com/store/apps/details?id=church.b1.checkin)
   - **Amazon Fire -tabletit:** [Amazon App Store](https://www.amazon.com/Live-Church-Solutions-B1-Check-In/dp/B0FW5HKRB5/)
3. **Kirjaudu B1 Checkin -sovellukseen** käyttämällä tiliä, jolla on **Checkin**-läsnäolo-oikeus (tai **Muokkaa läsnäoloa**). Katso [Sisäänkirjautumiskioskien tilit](../settings/roles-permissions.md#check-in-kiosk-accounts).
4. **Valitse kampus ja jumalanpalveluksen aika** meneillään olevaa tilaisuutta varten.
5. Jäsenet voivat nyt etsiä nimensä laitteelta ja kirjautua sisään.

:::tip
Sijoita sisäänkirjautumislaitteet näkyviin ja helposti saavutettaviin paikkoihin, kuten aulan sisäänkäynteihin tai tervetuloapisteisiin. Lyhyt ilmoitus jumalanpalveluksessa auttaa jäseniä tietämään, että vaihtoehto on käytettävissä.
:::

:::tip
Jos seurakunnallasi on useita kampuksia, sinun on toistettava asetukset jokaiselle kampukselle kohdassa [Läsnäolon asetukset](setup.md). Jokainen sisäänkirjautumislaite voidaan määrittää eri kampukselle.
:::

## Suositellut laitteistot

**Tabletit** – nämä kaikki toimivat hyvin sovelluksen kanssa:

- **Kompakti:** Samsung Galaxy Tab A7 Lite 8,7"
- **Suuri näyttö:** Samsung Galaxy Tab A8 10,5"
- **Budjettiystävällinen:** Amazon Fire HD 10

**Tulostimet** – sisäänkirjautuminen toimii Brother-tarrakirjoittimilla nimilappujen tulostamiseen:

- **Paras:** Brother QL-1110NWB (tukee useita tabletteja Bluetoothin ja WiFin kautta)
- **Hyvä:** Brother QL-810W (tukee useita tabletteja WiFin kautta)
- **Budjettiystävällinen:** Brother QL-1100 (vain WiFi)

**Tarrat:** Brother DK-1201 (1-1/7" x 3-1/2")

:::warning
Ainoastaan Brother-tarrakirjoittimet ovat yhteensopivia B1 Checkin -sovelluksen kanssa. Muiden merkkien tulostimet eivät toimi nimilappujen tulostamisessa.
:::

:::info
Noudata tulostimesi asennusohjeita yhdistääksesi sen samaan WiFi-verkkoon kuin tablettisi. Brother-tulostinajurit ja asennusoppaat löytyvät [Brotherin tukisivustolta](https://support.brother.com).
:::

## Kioskin ulkoasun mukauttaminen

Voit mukauttaa B1 Checkin -sovelluksen ulkoasua vastaamaan seurakuntasi brändiä. Siirry B1 Adminissa kohtaan **Mobiili > B1 CheckIn** ja käytä **Kioskin teema** -korttia määrittääksesi seuraavat:

### Värit

Mukauta kahdeksan väriasetusta vastaamaan seurakuntasi brändiä:

- **Ensisijainen** ja **Ensisijaisen kontrasti** – Pääbrändin väri ja sen tekstin väri.
- **Toissijainen** ja **Toissijaisen kontrasti** – Korostusväri ja sen tekstin väri.
- **Ylätunnisteen tausta** ja **Alatunnisteen tausta** – Kioskin ylätunnisteiden värit.
- **Painikkeen tausta** ja **Painikkeen teksti** – Vuorovaikutteisten painikkeiden värit.

### Taustakuva

Lataa valinnainen taustakuva kioskin tervetulo- ja hakunäkymiin. Suositeltu koko on 1920x1080 pikseliä.

### Lepotila / näytönsäästäjä

Määritä näytönsäästäjä, joka aktivoituu tietyn toimettomuusajan jälkeen:

1. Kytke lepotila **päälle** tai **pois**.
2. Aseta **aikakatkaisu** (kuinka monta sekuntia toimettomuutta ennen näytönsäästäjän käynnistymistä, vähintään 10 sekuntia).
3. Lisää yksi tai useampi **dia** – jokaisessa diassa on kuva ja näyttöaika (vähintään 3 sekuntia).

:::tip
Käytä lepotilaa näyttämään ilmoituksia, tulevia tapahtumia tai tervetuloviestejä silloin, kun kioskia ei käytetä aktiivisesti.
:::

## Vierasrekisteröinti QR-koodilla

Sisäänkirjautumiskioski voi näyttää QR-koodin, jonka vierailijat skannaavat rekisteröidäkseen itsensä ja perheensä omalla puhelimellaan. Tämä nopeuttaa sisäänkirjautumista ensikertalaisille vieraille.

Kun vieras skannaa QR-koodin, hänet ohjataan [vierasrekisteröintisivulle](../../b1-church/checkin/guest-registration.md), jossa hän syöttää perheensä nimet ja muut tiedot, jotka päätät kysyä. Vapaaehtoinen voi sitten etsiä hänet kioskilta ja kirjata hänet sisään.

### QR-vierasrekisteröinnin käyttöönotto

Näyttääksesi QR-koodin:

1. Avaa B1 Adminissa [pikavalikko](../introduction.md#getting-around-with-the-jump-menu) (hakupalkki vasemmassa yläkulmassa) ja laajenna kohta **Mobiili**.
2. Valitse **B1 CheckIn**.
3. Kytke **QR-vierasrekisteröinti** päälle ja valitse **Tallenna**.

:::note
Tämä asetus on kohdassa **Mobiili > B1 CheckIn** (sama sivu kuin **Kioskin teema** -kortti), ei Läsnäolo-osiossa. Läsnäolosivun **Kioski**-toiminto sisältää linkin tälle sivulle.
:::

Kun kytkin on päällä, muut alla olevat asetukset näkyvät samassa **QR-vierasrekisteröinti**-kortissa. Valitse kortista **Tallenna** aina, kun muutat jotakin niistä.

### Rekisteröintilomakkeen kenttien valinta

**Ilmoittautumiskentät**-luettelo määrittää, mitä rekisteröintilomake kysyy. **Etunimi** ja **Sukunimi** ovat aina lomakkeella, ja ne ovat pakollisia jokaiselle perheenjäsenelle. Muiden kenttien kohdalla kytke **Sisällytä** päälle, jos haluat lisätä kentän lomakkeelle, ja kytke sitten **Pakollinen** päälle, jos vieraiden on täytettävä se. **Pakollinen** voidaan kytkeä päälle vain sisällytetylle kentälle, ja **Sisällytä** -kytkimen poistaminen tyhjentää sen.

| Kenttä | Kysytään | Oletuksena mukana |
|--------|----------|-------------------|
| **Titteli** | Jokaiselta perheenjäseneltä pudotusvalikosta nimen edessä (Mr, Mrs, Miss, Ms, Dr, Prof, Rev, Pastor) | Ei |
| **Sähköposti** | Vain pääyhteyshenkilöltä | Kyllä (valinnainen) |
| **Puhelin** | Jokaiselta perheenjäseneltä. Kun kenttä on pakollinen, vain pääyhteyshenkilön on täytettävä se. | Kyllä (valinnainen) |
| **Taloudessa toimiva rooli** | Pääyhteyshenkilön jälkeen jokaiselta perheenjäseneltä – Puoliso, Lapsi tai Muu. Pääyhteyshenkilö on uuden talouden päämies. Henkilö ilman roolia tallennetaan roolilla Muu. | Kyllä (valinnainen) |
| **Kotiosoite** | Kerran koko perheelle – katuosoite, osoiterivi 2, kaupunki, osavaltio ja postinumero. Kun kenttä on pakollinen, kaikki paitsi osoiterivi 2 on täytettävä. Osoite tallennetaan jokaiselle perheenjäsenelle. | Ei |
| **Syntymäaika** | Jokaiselta perheenjäseneltä | Ei |
| **Sukupuoli** | Jokaiselta perheenjäseneltä | Ei |
| **Siviilisääty** | Vain pääyhteyshenkilöltä | Ei |
| **Luokka** | Jokaiselta perheenjäseneltä (PreK–12 tai Valmistunut) | Ei |
| **Kommentit** | Kerran, perheenjäsenten alapuolella olevaan laatikkoon (enintään 1 000 merkkiä) | Ei |

Kentät, jotka poistat käytöstä, eivät koskaan tallennu, vaikka joku lähettäisi ne ilmoittautumiseen muulla tavalla. Kommentit tallennetaan muistiinpanona pääyhteyshenkilön tietueeseen (merkittynä "Vieraan ilmoittautuminen"), joten voit lukea ne hänen profiilinsa **Muistiinpanot**-osiosta.

### Vieraiden lisääminen ryhmään

Käytä **Lisää uudet vieraat ryhmään** -asetusta, jotta kaikki ilmoittautuvat lisätään automaattisesti yhteen ryhmistäsi – esimerkiksi ryhmään "Uudet kävijät" tai ryhmään tämän viikonlopun tapahtumaa varten. Valitse **Ei mitään** (oletus), jos et halua tätä. Vieraat eivät näe tai valitse ryhmää; se asetetaan vain täällä. Vaihda ryhmää ennen jokaista tapahtumaa, jotta voit seurata kyseisen tapahtuman vieraita yhdessä.

### Läsnäolon kirjaaminen

Kun ryhmä on valittu, näkyviin tulee kytkin **Kirjaa myös läsnäolo**. Kytke se päälle, jotta vieraat merkitään läsnä oleviksi heti ilmoittautuessaan, eikä sinun tarvitse kirjata heitä erikseen sisään.

Läsnäolo kirjataan vain, jos ilmoittautuminen tapahtuu valitun ryhmän **ajoitettujen** jumalanpalveluksien aikana:

- Ryhmän on oltava linkitetty yhteen tai useampaan jumalanpalveluksen aikaan, ja näillä jumalanpalveluksen ajoilla on oltava [sisäänkirjautumisaikataulu](setup.md#setting-a-check-in-schedule) (**Päivä** ja **Aloitusaika**).
- "Aikana" tarkoittaa, että ilmoittautuminen tapahtuu jumalanpalveluksen sisäänkirjautumisikkunan sisällä – alkaen **Avaa sisäänkirjautuminen** -minuuttia ennen aloitusta ja päättyen **Sulje sisäänkirjautuminen** -minuuttia lopetuksen jälkeen (tai aloituksen jälkeen, jos lopetusaikaa ei ole asetettu; jos lopetusaikaa tai sulkemisminuutteja ei ole, ikkuna päättyy kyseisen päivän loppuun). Aikavyöhyke on sama, jota sisäänkirjautumisaikataulu käyttää.
- Jokainen perheenjäsen merkitään läsnä olevaksi ryhmässä jokaisen sen jumalanpalveluksen osalta, joka on tuolloin auki, tämän päivän päivämäärällä.
- Ilmoittautumiset muuna aikana tai ryhmälle, jonka jumalanpalveluksilla ei ole aikataulua, lisätään ryhmään, mutta niitä ei lasketa osallistujiksi.

### Otsikkokuva

Kohdassa **Otsikkokuva** valitse **Vaihda kuva** valitaksesi tai ladataksesi kuvan (rajattu 16:9-muotoon), joka näytetään rekisteröintisivun yläosassa oletuskuvakkeen sijaan. Valitse **Poista** palataksesi kuvakkeeseen.

### Rekisteröintilinkin jakaminen

Kun QR-vierasrekisteröinti on käytössä, kortin alareunaan ilmestyy osio **Jaa rekisteröinnin QR-koodi**. Se tarjoaa kaksi tapaa ohjata vieraita rekisteröintilomakkeelle kioskin QR-koodin lisäksi:

- **Kopioi linkki** – kopioi rekisteröintiosoitteen, jotta voit liittää sen seurakuntasi verkkosivuille, sähköposteihin tai muualle verkossa.
- **Lataa PNG** – lataa QR-koodin kuvana, jonka voit tulostaa esitteisiin, kirkkotiedotteisiin tai kylttiin.

:::tip
Lisää rekisteröintilinkki seurakuntasi verkkosivujen sivulle "Suunnittele vierailusi" tai "Olen uusi", jotta vieraat voivat rekisteröityä jo ennen saapumistaan.
:::

### Mitä tapahtuu vieraan ilmoittautumisen jälkeen

B1 etsii ensin henkilöitä, jotka ovat jo **Ihmisissä**. Perheenjäsen yhdistetään olemassa olevaan henkilöön, kun täsmälleen yhdellä henkilöllä on sama etunimi ja sama sähköposti tai puhelinnumero. Lapsi, joka on syötetty ilman sähköpostia tai puhelinta, yhdistetään etunimen perusteella yhdistetyn talouden sisällä. Yhdistettyjä henkilöitä käytetään sellaisinaan – ilmoittautuminen ei koskaan muuta heidän tietojaan tai jäsenyyden tilaa – ja kaikki uudet liittyvät yhdistettyyn talouteen.

Jos kukaan ei täsmää, ilmoittautuminen luo uuden talouden, joka nimetään pääyhteyshenkilön sukunimen mukaan, ja jokaiselle perheenjäsenelle luodaan henkilötietue. Kaikki uudet lisätään kohtaan **Ihmiset** jäsenyyden tilalla **Vierailija**, ja pääyhteyshenkilö on talouden päämies.

Yhdistetyt ja uudet henkilöt lisätään valitsemaasi ryhmään (jos he eivät ole siinä jo), ja heidän läsnäolonsa kirjataan, jos se on käytössä. Kommentit tallennetaan muistiinpanona pääyhteyshenkilölle.

Voit seurata vieraita automaattisesti lisäämällä [työnkulun käynnistimen](../serving/workflows.md#triggers), kuten **Henkilö · Luotu** ehdolla *Jäsenyyden tila on Vierailija*, tai **Ryhmä · Jäsen liittyi** valitsemallesi ryhmälle.

## Mitä kirjataan

Jokainen sisäänkirjautuminen luo läsnäolotietueen B1 Adminiin. Voit tarkastella näitä tietueita [Läsnäolo](tracking-attendance.md)-sivulla ja jokaisen [ryhmän](../groups/group-members.md) tapaamisissa samalla tavalla kuin manuaalisesti syötetty läsnäolo. Tiedot näkyvät samalla tavalla molemmissa tapauksissa, ja molemmat menetelmät syöttävät samoihin raportteihin.
