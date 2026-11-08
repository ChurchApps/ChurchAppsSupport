---
title: "Mobiilisovelluksen asetukset"
description: "Määritä B1 Adminissa B1.church-jäsensovelluksen navigointivälilehdet, aloitusnäytön laatat, kirjautumiskehote ja jäsenhakemiston yksityisyysasetukset."
---

# Mobiilisovelluksen asetukset

<div class="article-intro">

Mobiilisovelluksen asetukset -sivulla voit määrittää navigointivälilehdet, jotka näkyvät seurakuntasi jäsenille **B1.church-mobiilikokemuksessa (PWA)**. Voit valita, mitkä välilehdet ovat näkyvissä, mihin ne linkittävät ja miten ne näytetään.

</div>

## Koulutusvideo

<YouTube id="ydY7WGK16fE" title="Seurakuntasi jäsensovelluksen mukauttaminen B1:ssä" />

:::info
Tässä määritetyt välilehdet näkyvät B1-sovelluksessa, jonka jäsenet voivat [asentaa progressiivisena web-sovelluksena (PWA)](../../b1-church/getting-started/installing-pwa.md). Jaa seurakuntasi asennussivu — `https://yourchurchname.b1.church/mobile/install` — jäsenille. Sivu opastaa heitä sovelluksen asentamisessa laitteelleen, eikä sovelluskaupasta tai Google Play -kaupasta tarvitse ladata mitään.
:::

<div class="prereqs">
<h4>Ennen aloittamista</h4>

- Tarvitset oikeuden "Edit Church Settings". Katso [Roolit ja oikeudet](./roles-permissions.md), jos sinulla ei ole pääsyä.
- Määritä ensin [Seurakunnan asetukset](./church-settings.md), mukaan lukien seurakuntasi nimi ja brändäys

</div>

## Navigointiasetusten avaaminen

1. Avaa B1 Adminissa [Hyppyvalikko](../introduction.md#getting-around-with-the-jump-menu) (hakupalkki vasemmassa yläkulmassa) ja laajenna kohta **Mobile**.
2. Napsauta **Navigation** (`/mobile/navigation`).
3. Navigation-sivu näyttää sovelluksesi nykyiset välilehdet.

## Uuden välilehden lisääminen

1. Napsauta sivun yläosassa **Add Tab** -painiketta.
2. Täytä välilehden tiedot:
   - **Name** -- Välilehdessä näkyvä nimi (esimerkiksi ”Saarnat” tai ”Lahjoita”).
   - **Icon** -- Napsauta kuvakkeen valitsinta ja valitse välilehdelle kuvake.
   - **Image** -- Napsauta **Select Image** (tai **Change Image**) ja lisää välilehdelle kuva. Kuvalliset välilehdet näkyvät sovelluksen aloitusnäytössä kuvalaattoina -- katso [Aloitusnäytön laatat](#home-screen-tiles).
   - **Tab Type** -- Valitse vaihtoehdoista, kuten Bible, Live Stream, Donation, Website ja muut.
   - **URL** -- Anna verkko-osoite, johon välilehti linkittää.
   - **Visibility** -- Määritä, kuka näkee välilehden (kaikki, vain jäsenet jne.). Jos kyseessä on **Member Directory** -välilehti, tämä asetus määrittää vain sen, kuka näkee itse välilehden. Kuka voi avata hakemiston, määritetään **Show in Directory** -asetuksella Member portal -sivulla (katso [Jäsenhakemiston ja viestien asetukset](#member-directory--messaging-settings)).
3. Lisää välilehti sovellukseesi napsauttamalla **Save Tab**.

## Olemassa olevan välilehden muokkaaminen

1. Napsauta mitä tahansa **App Tabs** -luettelon välilehteä.
2. Päivitä välilehden nimi, kuvake, URL, tyyppi tai näkyvyysasetukset.
3. Ota muutokset käyttöön napsauttamalla **Save Tab**.

## Välilehtien järjestyksen muuttaminen

Voit muuttaa välilehtien järjestystä mobiilisovelluksessa. Järjestele välilehtiä luettelossa vetämällä ja pudottamalla. Tällä sivulla näkyvä järjestys vastaa sitä järjestystä, jonka jäsenesi näkevät sovelluksessa.

:::info
Jotkin välilehdet voivat ilmestyä automaattisesti, kun tietyt ehdot täyttyvät. Esimerkiksi Live Stream -välilehti voi näkyä, kun suora lähetys on käynnissä. Manuaalisesti lisätyt välilehdet antavat sinulle täyden hallinnan siitä, mitä jäsenesi näkevät koko ajan.
:::

:::tip
Pidä välilehtien määrä hallittavana. Kolmesta viiteen välilehteä toimii useimmille seurakunnille hyvin. Liian monet välilehdet voivat tehdä navigoinnista sekavaa jäsenillesi.
:::

## Jäsenhakemiston ja viestien asetukset

Mobile-osiossa oleva **Member portal** -kohta sisältää asetukset, jotka ohjaavat jäsenhakemistoa ja yksityisiä viestejä B1.church-kokemuksessa:

- **Directory Approval Group** -- Ryhmä, joka tarkistaa jäsenhakemiston päivitykset ja [tilin poistopyynnöt](../profile/account-deletion.md) ennen kuin ne tulevat voimaan.
- **Show in Directory** -- Kuka voi avata jäsenhakemiston ja kuka siinä on listattu: **Admins Only**, **Members and Above** (oletus), **Regular Attendees and Above** tai **Visitors and Above**. Henkilöt, joiden jäsenyysstatus on valitsemaasi tasoa alempi, eivät näe hakemistoa eivätkä ole siinä listattuina. **Admins Only** sulkee hakemiston kaikilta muilta paitsi henkilökunnalta, jolla on People &gt; View -oikeus (pelkkä Staff-jäsenyysstatus ei riitä). Heillä on aina pääsy hakemistoon ja he näkevät kaikki, asetuksesta riippumatta. Vieraita ei koskaan sisällytetä, koska jokainen, joka rekisteröityy verkossa itse, aloittaa vieraana.
- **Visibility Preference** -- Asettaa seurakuntakohtaisen oletuksen jäsenille, jotka eivät ole vielä valinneet omaa asetustaan. **Address**, **Phone Number** ja **Email** kullakin on oma pudotusvalikkonsa, ja samat viisi tasoa ovat käytettävissä kaikkialla, missä näkyvyyttä määritetään:
  - **Everyone** -- näkyvissä kaikille, myös anonyymeille kävijöille
  - **Members** -- näkyvissä vain henkilöille, joilla on Member- tai Staff-tietue
  - **Groups Only** -- näkyvissä vain henkilöille, jotka jakavat ryhmän tämän henkilön kanssa, sekä henkilökunnalle
  - **My Group Leaders and Staff** -- näkyvissä vain niiden ryhmien johtajille, joihin tämä henkilö kuuluu, sekä henkilökunnalle
  - **Staff Only** -- näkyvissä vain henkilökunnalle (kuka tahansa, jonka jäsenyysstatus on Staff tai jolla on People &gt; View -oikeus), sekä henkilölle itselleen

  ”Henkilökunta” näissä tasoissa tarkoittaa ketä tahansa, jonka jäsenyysstatus on Staff tai jolla on People &gt; View -oikeus. Ryhmämuutokset astuvat voimaan heti: henkilö, joka liittyy ryhmään tai nimetään ryhmän johtajaksi, näkee kyseisen ryhmän jäsenten vastaavat **Groups Only** - tai **My Group Leaders and Staff** -tiedot kirjautumatta ulos ja takaisin sisään.

  Jäsenet voivat ohittaa nämä oletukset omassa tietueessaan profiilinsa **Privacy**-välilehdeltä B1.church PWA:ssa -- katso [Profiilisi muokkaaminen](/docs/b1-church/getting-started/me-page).
- **Minimum Age for Private Messages** -- Lapsen turvallisuuden hallintakeino. B1 ei avaa **uutta** yksityisen viestin keskustelua, jos jompikumpi osapuoli on tätä ikää nuorempi. Ikä perustuu syntymäaikaan (talouden rooli käytetään vararatkaisuna, jos syntymäaikaa ei ole tallennettu). Alle-ikäiset ovat edelleen täysin näkyvissä hakemistossa -- vain suora viestintä on estetty, **molempiin suuntiin**, kaikilta, myös henkilökunnalta. Ryhmäkeskustelut ja lapsen vanhempien viestiminen toimivat edelleen. Vaihtoehdot ovat Off, 13, 16 tai 18; oletus on **18**. Olemassa olevat keskustelut eivät muutu.

:::tip
Koska alaikärajan tarkistus perustuu syntymäaikoihin, varmista, että seurakuntasi lasten syntymäajat on täytetty. Tämä asetus kuuluu samaan lapsiturvallisuusperheeseen kuin [lähtöturvallisuuden hallinta](../attendance/checkin-safety.md).
:::

### Aloitusnäytön kirjautumiskehote

Kävijät, jotka avaavat sovelluksen [aloitusnäytön](/docs/b1-church/getting-started/navigating#home) kirjautumatta sisään, näkevät lyhyen kehotteen -- oletuksena *”Kirjaudu sisään nähdäksesi ryhmäsi, lahjoituksesi ja muuta.”* -- **Sign In** -painikkeen vieressä. Member portal -sivun (`/mobile/b1-mobile`) **Home screen sign-in prompt** -asetukset antavat sinun muuttaa sitä:

- **Show sign-in prompt on the app home screen** -- Poista tämä käytöstä piilottaaksesi sekä kehotteen että **Sign In** -painikkeen aloitusnäytöltä. Kävijät voivat silti kirjautua sisään sovellusvalikosta.
- **Sign-in prompt text** -- Korvaa oletussanamuoto omalla viestilläsi (enintään 150 merkkiä). Jätä kenttä tyhjäksi käyttääksesi oletusta. Tämä ruutu on poissa käytöstä, kun kehote on pois päältä.

Ota muutokset käyttöön napsauttamalla **Save**. **Saved**-viesti vahvistaa muutoksen. Tallennus päivittää sovelluksen välimuistissa olevat asetukset, joten muutos näkyy seuraavan kerran, kun aloitusnäyttö latautuu.

### Aloitusnäytön laatat

Välilehdet, joissa on kuva (katso **Image** kohdassa [Uuden välilehden lisääminen](#adding-a-new-tab)), näkyvät sovelluksen [aloitusnäytöllä](/docs/b1-church/getting-started/navigating#home) kuvalaattoina osiossa, jonka otsikossa on seurakuntasi nimi. Tähän kuuluu myös Verse of the Day -välilehti, jos annat sille kuvan. Kuvalliset välilehdet näkyvät myös välilehtipalkissa.

Member portal -sivun (`/mobile/b1-mobile`) **Home screen tiles** -asetus ohjaa näiden laattojen asettelua. Valitse **Layout**:

- **Grid** -- Kaksi laattaa riviä kohti (oletus). Kun laattoja on pariton määrä, ensimmäinen laatta vie koko leveyden.
- **Scrolling row** -- Yksi laattarivi, jota jäsenet pyyhkäisevät sivusuunnassa.
- **Scrolling (automatic)** -- Sama sivusuuntainen rivi, mutta se liikkuu myös itsestään: se etenee yhden laatan verran noin neljän sekunnin välein ja palaa viimeisen jälkeen takaisin ensimmäiseen laattaan. Se pysähtyy, kun jäsen koskettaa riviä, viepi hiiren sen päälle tai siirtyy siihen sarkainnäppäimellä, ja jatkuu muutaman sekunnin kuluttua. Laitteissa, joissa liikkeen vähentäminen on päällä, rivi pysyy paikallaan ja toimii kuten **Scrolling row**.
- **List** -- Luettelo, jossa on pieni kuvakeskustelu kunkin välilehden nimen vieressä.

Molemmissa vierityksen asetteluissa, kun laattoja on enemmän kuin mahtuu ruudulle, laattojen alle ilmestyy pisterivi: yksi piste laattaa kohti, ja nykyisen laatan piste on täytetty. Jäsenet voivat napauttaa pistettä siirtyäkseen siihen laattaan.

Ota asetukset käyttöön napsauttamalla **Save**.

### Aloitusnäytön osiot

Kirjautuneilla jäsenillä on aina näkyvissä oma osallistumishistoriansa ja lähettämänsä lomakkeet [Me-sivulla](/docs/b1-church/getting-started/me-page). **Home screen sections** -kytkimillä samalla Member portal -sivulla (`/mobile/b1-mobile`) voit näyttää ne myös aloitusnäytöllä:

- **Show My Attendance on Home** -- Lisää **My Attendance** -osion, jossa näkyy, kuinka monta kertaa jäsen on osallistunut viimeisen 90 päivän aikana, hänen kaksi viimeisintä käyntiään ja **History**-linkki täydelliseen osallistumisluetteloon.
- **Show My Forms on Home** -- Lisää **My Forms** -osion, jossa näkyy jäsenen kaksi viimeisintä lomakelähetystä ja **All forms** -linkki.

Molemmat ovat oletuksena pois päältä. Osio näkyy vain kirjautuneille jäsenille, joilla on vähintään yksi näytettävä tietue. Ota muutokset käyttöön napsauttamalla **Save**.

## Missä nämä välilehdet näkyvät

Tässä määrittämäsi välilehdet näkyvät **B1.church PWA:ssa**, jonka jäsenesi asentavat mistä tahansa sivusta osoitteessa `https://yourchurchname.b1.church`. Tällä sivulla tekemäsi muutokset näkyvät, kun jäsen avaa sovelluksen seuraavan kerran.

Puhelimella alapalkki näyttää **Home**-välilehden, enintään kolme omaa välilehteäsi ja **More**-välilehden. Tietokoneella yläpalkissa on enintään viisi. Sisäänrakennetut näytöt (kuten Sermons, Giving tai Groups) saavat paikat ensin, ja **Internal Page** -välilehdet täyttävät vapaana jääneet paikat. **External URL** - ja **Verse of the Day** -välilehdille ei koskaan anneta paikkaa. Jokainen välilehti, myös ne, jotka eivät mahdu palkkiin, on listattu sovelluksen **More**-sivulla.

Välilehdet, jotka on sijoitettu **Folder**-välilehden sisään, ovat poikkeus: ne näkyvät vain kansion omalla näytöllä, jonka jäsenet avaavat napauttamalla kansiota. Kyseinen näyttö näyttää välilehdet kuvalaattoina, jos jokaisella niistä on kuva, muuten luettelona. Kansio, jossa ei ole yhtään jäsenen näkemää välilehteä, on piilotettu kyseiseltä jäseneltä. Katso [Kansiovälilehdet](../../b1-church/getting-started/navigating.md#folder-tabs). Katso [B1Appin navigointi](../../b1-church/getting-started/navigating.md), mitä jäsenet näkevät.

## Seuraavat vaiheet

- [Seurakunnan asetukset](./church-settings.md) -- Määritä seurakuntasi tiedot ja brändäys
- [Roolit ja oikeudet](./roles-permissions.md) -- Hallitse tiimisi käyttöoikeuksia
