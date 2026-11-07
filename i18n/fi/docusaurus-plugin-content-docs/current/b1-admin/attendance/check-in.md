---
title: "Itsepalvelu-sisäänkirjautuminen: B1 Checkin ja B1 Admin"
sidebar_label: "Sisäänkirjaus"
description: "Määritä itsepalvelu-sisäänkirjautuminen B1 Checkin -sovelluksella: laitteet, kioskitilit, aikataulut, brändäys ja QR-vieraskirjautuminen."
---

# Sisäänkirjaus

<div class="article-intro">

B1 Admin tukee itsesisäänkirjautumista palveluihin **B1 Checkin** -sovelluksen kautta. Jäsenet voivat kirjata itsensä ja perheensä sisään kioskeilla tai omilla laitteilla saapuessaan, mikä nopeuttaa prosessia ja vähentää vapaaehtoisten työmäärää. Jokainen sisäänkirjautuminen tallennetaan automaattisesti läsnäoloksi.

</div>

<div class="prereqs">
<h4>Ennen aloittamista</h4>

- Kampuksesi, palveluajat ja ryhmät on määritettävä [Läsnäolon asetuksissa](setup.md).
- Tarvitset [ihmiset tietokantaasi](../people/adding-people.md) ja [taloudet](../people/adding-people.md#managing-households) määritettynä, jotta perheet voivat kirjautua sisään yhdessä.
- Tarvitset tabletin ja mahdollisesti Brother-tarrakirjoittimen (katso alla olevat [laitesuositukset](#recommended-hardware)).

</div>

## Miten se toimii

B1 Checkin -sovellus yhdistyy B1 Adminin läsnäoloasetuksiin. Kun jäsen kirjautuu sisään, hänen läsnäolonsa kirjataan automaattisesti oikealle kampukselle, palveluajalle ja ryhmälle. Sinun ei tarvitse syöttää läsnäoloa käsin henkilölle, joka käyttää sisäänkirjausjärjestelmää.

## Sisäänkirjauksen määrittäminen

1. **Määritä ensin läsnäolorakenne.** Siirry B1 Adminissa kohtaan **People > Attendance** ja napsauta **Setup** varmistaaksesi, että kampuksesi, palveluajat ja ryhmät ovat paikallaan. Sisäänkirjaussovellus tarvitsee tätä määritystä. Voit halutessasi antaa jokaiselle palveluajalle [sisäänkirjausaikataulun](setup.md#setting-a-check-in-schedule), jotta sisäänkirjaus aukeaa ja sulkeutuu automaattisesti joka viikko. Aikataulut käyttävät palvelun kampuksen aikavyöhykettä tai seurakuntasi aikavyöhykettä, jos kampukselle ei ole asetettu omaa. Kioski merkitsee palveluajat, joiden ikkuna on suljettu, tilaan **Closed** ja kertoo perheille, milloin sisäänkirjaus avautuu. Lisätietoja: [Läsnäolon asetukset](setup.md).
2. **Asenna B1 Checkin -sovellus** laitteisiin, joita aiot käyttää. Sovellus on saatavilla seuraavilla alustoilla:
   - **iPad/iOS:** [Apple App Store](https://apps.apple.com/us/app/b1-church-check-in/id6775081998)
   - **Android/Samsung-tabletit:** [Google Play Store](https://play.google.com/store/apps/details?id=church.b1.checkin)
   - **Amazon Fire -tabletit:** [Amazon App Store](https://www.amazon.com/Live-Church-Solutions-B1-Check-In/dp/B0FW5HKRB5/)
3. **Kirjaudu B1 Checkin -sovellukseen** tilillä, jolla on **Checkin**-läsnäolo-oikeus (tai **Edit Attendance**). Katso [Sisäänkirjauskioskin tilit](../settings/roles-permissions.md#check-in-kiosk-accounts).
4. **Valitse kampus ja palveluaika** käynnissä olevaa kokoontumista varten.
5. Jäsenet voivat nyt etsiä nimensä laitteelta ja kirjautua sisään.

:::tip
Sijoita sisäänkirjauslaitteet näkyville ja helposti saavutettaville paikoille, kuten aulan sisäänkäynteihin tai tervetuloapisteisiin. Lyhyt ilmoitus palveluiden aikana auttaa jäseniä tietämään, että vaihtoehto on käytettävissä.
:::

:::tip
Jos seurakunnallasi on useita kampuksia, sinun on toistettava määritys jokaiselle kampukselle [Läsnäolon asetuksissa](setup.md). Jokainen sisäänkirjauslaite voidaan määrittää eri kampukselle.
:::

## Suositellut laitteet

**Tabletit**, kaikki nämä toimivat hyvin sovelluksen kanssa:

- **Kompakti:** Samsung Galaxy Tab A7 Lite 8.7"
- **Suuri näyttö:** Samsung Galaxy Tab A8 10.5"
- **Budjettivaihtoehto:** Amazon Fire HD 10

**Tulostimet**, sisäänkirjaus toimii Brother-tarrakirjoittimien kanssa nimilappujen tulostamiseen:

- **Paras:** Brother QL-1110NWB (tukee useita tabletteja Bluetooth- ja WiFi-yhteydellä)
- **Hyvä:** Brother QL-810W (tukee useita tabletteja WiFi-yhteydellä)
- **Budjetti:** Brother QL-1100 (vain WiFi)

**Tarrat:** Brother DK-1201 (1-1/7" x 3-1/2")

:::warning
Vain Brother-tarrakirjoittimet ovat yhteensopivia B1 Checkin -sovelluksen kanssa. Muiden merkkien tulostimet eivät toimi nimilappujen tulostamisessa.
:::

:::info
Yhdistä tulostin samaan WiFi-verkkoon kuin tabletti noudattamalla tulostimesi asennusohjeita. Brother-tulostinajurit ja asennusoppaat löytyvät [Brotherin tukisivustolta](https://support.brother.com).
:::

## Kioskin ulkoasun mukauttaminen

Voit mukauttaa B1 Checkin -sovelluksen ulkoasua vastaamaan seurakuntasi brändiä. Siirry B1 Adminissa kohtaan **Mobile > B1 CheckIn** ja määritä **Kiosk Theme** -kortilla:

### Värit

Mukauta kahdeksan väriasetusta vastaamaan seurakuntasi brändiä:

- **Primary** ja **Primary Contrast** -- Pääbrändiväri ja sen tekstiväri.
- **Secondary** ja **Secondary Contrast** -- Korostusväri ja sen tekstiväri.
- **Header Background** ja **Subheader Background** -- Kioskin yläosan alueiden värit.
- **Button Background** ja **Button Text** -- Interaktiivisten painikkeiden värit.

### Taustakuva

Lataa valinnainen taustakuva kioskin tervetuloa- ja hakunäkymiin. Suositeltu koko on 1920x1080 pikseliä.

### Lepotila ja näytönsäästäjä

Määritä näytönsäästäjä, joka aktivoituu inaktiivisuusjakson jälkeen:

1. Kytke lepotila **päälle** tai **pois**.
2. Aseta **timeout** eli kuinka monta sekuntia inaktiivisuutta odotetaan ennen näytönsäästäjän alkamista (vähintään 10 sekuntia).
3. Lisää yksi tai useampi **slide** -- jokaisessa diassa on kuva ja näyttöaika (vähintään 3 sekuntia).

:::tip
Käytä lepotilaa näyttämään ilmoituksia, tulevia tapahtumia tai tervetuloviestejä silloin, kun kioskia ei käytetä aktiivisesti.
:::

## Vierasrekisteröinti QR-koodilla

Sisäänkirjauskioski voi näyttää QR-koodin, jonka vierailijat skannaavat rekisteröidäkseen itsensä ja perheensä omalla puhelimellaan. Tämä nopeuttaa sisäänkirjausta ensikertalaisille vierailijoille.

Kun vieras skannaa QR-koodin, hänet ohjataan [vierasrekisteröintisivulle](../../b1-church/checkin/guest-registration.md), jossa hän syöttää perheensä nimet ja muut tiedot, joita haluat kysyä. Vapaaehtoinen voi sitten etsiä hänet kioskilta ja kirjata hänet sisään.

### QR-vierasrekisteröinnin käyttöönotto

Kytkeäksesi QR-koodin näytön päälle:

1. Avaa B1 Adminissa [Jump-valikko](../introduction.md#getting-around-with-the-jump-menu) (hakupalkki vasemmassa yläkulmassa) ja laajenna **Mobile**.
2. Napsauta **B1 CheckIn**.
3. Kytke **QR Guest Registration** päälle ja napsauta **Save**.

:::note
Tämä asetus on kohdassa **Mobile > B1 CheckIn** (sama sivu kuin **Kiosk Theme** -kortti), ei Attendance-kohdassa. **Kiosk**-toiminnossa Attendance-sivulla on linkki tälle sivulle.
:::

Kun kytkin on päällä, alla kuvatut muut asetukset näkyvät samassa **QR Guest Registration** -kortissa. Napsauta kortin **Save**-painiketta, kun olet muuttanut jotakin niistä.

### Ilmoittautumiskenttien valinta

**Sign-up fields** -valintaluettelo määrittää, mitä rekisteröintilomake kysyy. **First Name** ja **Last Name** ovat aina lomakkeella ja pakollisia jokaiselle perheenjäsenelle. Jokaiselle muulle kentälle kytke **Include** päälle, jotta kenttä lisätään lomakkeelle, ja kytke sitten **Required** päälle, jos vieraiden on täytettävä se. **Required** voidaan kytkeä päälle vain lisätylle kentälle, ja **Include**-kytkimen kytkeminen pois tyhjentää kentän.

| Kenttä | Kysytään | Oletuksena mukana |
|-------|-----------|---------------------|
| **Email** | Vain ensisijainen yhteyshenkilö | Kyllä (valinnainen) |
| **Phone** | Vain ensisijainen yhteyshenkilö | Kyllä (valinnainen) |
| **Home address** | Kerran perheelle -- katuosoite, osoiterivi 2, kaupunki, osavaltio ja postinumero. Kun kenttä on pakollinen, kaikki paitsi osoiterivi 2 on täytettävä. Osoite tallennetaan jokaiselle perheenjäsenelle. | Ei |
| **Birth date** | Jokainen perheenjäsen | Ei |
| **Gender** | Jokainen perheenjäsen | Ei |
| **Marital status** | Vain ensisijainen yhteyshenkilö | Ei |
| **Grade** | Jokainen perheenjäsen (PreK–12 tai Graduated) | Ei |
| **Comments** | Kerran, perheenjäsenten alapuolella olevaan laatikkoon (enintään 1 000 merkkiä) | Ei |

Kenttiä, jotka kytket pois, ei koskaan tallenneta, vaikka joku lähettäisi ne ilmoittautumiseen muulla tavalla. Kommentit tallennetaan muistiinpanona ensisijaisen yhteyshenkilön tietoihin (merkittynä ”Guest sign-up”), joten voit lukea ne hänen profiilinsa **Notes**-osiosta.

### Vieraiden lisääminen ryhmään

Käytä **Add new guests to group** -asetusta lisätäksesi kaikki ilmoittautuneet automaattisesti yhteen ryhmistäsi, esimerkiksi ”Newcomers”-ryhmään tai tämän viikonlopun tapahtuman ryhmään. Valitse **None** (oletus), jos et halua tätä. Vieraat eivät koskaan näe tai valitse ryhmää; se asetetaan vain täällä. Vaihda ryhmä ennen jokaista tapahtumaa, jotta voit seurata kyseisen tapahtuman vieraita yhdessä.

### Läsnäolon kirjaaminen

Kun ryhmä on valittu, näkyviin tulee **Also record attendance** -kytkin. Kytke se päälle, jotta vieraat merkitään läsnä heti ilmoittautuessaan, eikä sinun tarvitse kirjata heitä erikseen sisään.

Läsnäolo kirjataan vain, jos ilmoittautuminen tapahtuu jonkin valitun ryhmän **ajastetun** palveluajan aikana:

- Ryhmä on linkitetty yhteen tai useampaan palveluaikaan, ja näillä palveluajoilla on oltava [sisäänkirjausaikataulu](setup.md#setting-a-check-in-schedule) (**Day** ja **Start Time**).
- ”Aikana” tarkoittaa palveluajan sisäänkirjausikkunaa: se alkaa **Open check-in** -minuuttia ennen alkua ja päättyy **Close check-in** -minuuttia lopun jälkeen (tai alun jälkeen, jos loppuaikaa ei ole asetettu; jos loppuaikaa eikä sulkemisminuutteja ole, päivän loppuun asti). Aikavyöhyke on sama kuin sisäänkirjausaikataulun.
- Jokainen perheenjäsen merkitään läsnä ryhmässä jokaiselle sen palveluajalle, joka on auki sillä hetkellä, tämän päivän päivämäärälle.
- Ilmoittautumiset muina aikoina tai ryhmälle, jonka palveluajoilla ei ole aikataulua, lisätään ryhmään, mutta niitä ei lasketa läsnäoleviksi.

### Otsikkokuva

Kohdassa **Header photo** napsauta **Change photo** valitaksesi tai ladataksesi kuvan (rajattu 16:9-muotoon), joka näytetään rekisteröintisivun yläosassa oletusikonin sijaan. Napsauta **Remove** palataksesi ikoniin.

### Rekisteröintilinkin jakaminen

Kun QR-vierasrekisteröinti on käytössä, kortin alareunaan ilmestyy osio **Share registration QR code**. Sen avulla voit ohjata vieraita rekisteröintilomakkeelle kioskin QR-koodin lisäksi kahdella tavalla:

- **Copy link** — kopioi rekisteröintilinkin, jotta voit liittää sen seurakuntasi verkkosivuille, sähköposteihin tai muualle verkkoon.
- **Download PNG** — lataa QR-koodin kuvana, jonka voit tulostaa lentolehtisiin, kirkkolehtiin tai kylttiin.

:::tip
Lisää rekisteröintilinkki seurakuntasi verkkosivujen ”Plan Your Visit” - tai ”I'm New” -sivulle, jotta vieraat voivat rekisteröityä jo ennen saapumistaan.
:::

### Mitä tapahtuu vieraan ilmoittautumisen jälkeen

B1 etsii ensin ihmisiä, jotka ovat jo **People**-osiossa. Perheenjäsen yhdistetään olemassa olevaan henkilöön, kun täsmälleen yksi henkilö on samalla etunimellä ja samalla sähköpostilla tai puhelinnumerolla. Lapsi, joka on syötetty ilman sähköpostia tai puhelinta, yhdistetään etunimen perusteella jo yhdistettyyn talouteen. Yhdistettyjä henkilöitä käytetään sellaisinaan: ilmoittautuminen ei koskaan muuta heidän tietojaan tai jäsenyysstatustaan. Jokainen uusi henkilö liittyy yhdistettyyn talouteen.

Kun kukaan ei täsmää, ilmoittautuminen luo uuden talouden, joka on nimetty ensisijaisen yhteyshenkilön sukunimen mukaan, ja henkilötietueen jokaiselle perheenjäsenelle. Kaikki uudet henkilöt lisätään **People**-osioon jäsenyysstatuksella **Visitor**, ja ensisijainen yhteyshenkilö on talouden päämies.

Yhdistetyt ja uudet henkilöt lisätään valitsemaasi ryhmään (jos he eivät ole jo siinä), ja heidän läsnäolonsa kirjataan, kun se on käytössä. Kommentit tallennetaan muistiinpanona ensisijaiselle yhteyshenkilölle.

Jos haluat seurata ilmoittautuneita automaattisesti, lisää [työnkulun laukaisin](../serving/workflows.md#triggers), kuten **Person · Created** ehdolla *Membership Status is Visitor*, tai **Group · Member Joined** yllä valitsemallesi ryhmälle.

## Mitä tallennetaan

Jokainen sisäänkirjautuminen luo läsnäolotietueen B1 Adminissa. Voit tarkastella näitä tietueita [Attendance](tracking-attendance.md)-sivulla ja [ryhmän](../groups/group-members.md) istunnoissa samalla tavalla kuin manuaalisesti syötettyä läsnäoloa. Tiedot näkyvät samassa muodossa, sillä molemmat tavat syöttävät samoihin raportteihin.
