---
title: "Mobiilisovelluksen asetukset"
description: "Määritä B1.church-jäsensovelluksen navigointivälilehdet, aloitusnäytön laatat, kirjautumiskehote ja jäsenluettelon yksityisyysasetukset B1 Adminissa."
---

# Mobiilisovelluksen asetukset

<div class="article-intro">

Mobiilisovelluksen asetukset -sivulla voit määrittää navigointivälilehdet, jotka näkyvät seurakuntasi jäsenille **B1.church-mobiilikokemuksessa (PWA)**. Voit päättää, mitkä välilehdet ovat näkyvissä, mihin ne linkittyvät ja miten ne näytetään.

</div>

## Koulutusvideo

<YouTube id="ydY7WGK16fE" title="Seurakuntasi jäsensovelluksen mukauttaminen B1:ssä" />

:::info Alkuperäinen B1 Mobile -sovellus on vanhentunut
Tässä määritetyt välilehdet toimitetaan [B1.church-progressiivisen verkkosovelluksen (PWA)](/docs/b1-church/getting-started/installing-pwa) kautta, joka on korvannut alkuperäisen B1 Mobile -sovelluksen. Jaa seurakuntasi asennussivu — `https://yourchurchname.b1.church/mobile/install` — jäsenillesi. Sivu opastaa heitä sovelluksen asentamisessa laitteelleen, eikä App Storesta tai Google Playsta tarvitse ladata mitään.
:::

<div class="prereqs">
<h4>Ennen aloittamista</h4>

- Tarvitset oikeuden "Edit Church Settings". Katso [Roolit ja oikeudet](./roles-permissions.md), jos sinulla ei ole pääsyä.
- Määritä ensin [Seurakunnan asetukset](./church-settings.md), mukaan lukien seurakuntasi nimi ja brändäys

</div>

## Navigointiasetusten avaaminen

1. Avaa B1 Adminissa [Hyppyvalikko](../introduction.md#getting-around-with-the-jump-menu) (hakupalkki vasemmassa yläkulmassa) ja laajenna **Mobile**.
2. Napsauta **Navigation** (`/mobile/navigation`).
3. Navigation-sivulla näkyvät nykyiset sovelluksesi välilehdet.

## Uuden välilehden lisääminen

1. Napsauta sivun yläosassa olevaa **Add Tab** -painiketta.
2. Täytä välilehden tiedot:
   - **Name** -- Välilehdessä näkyvä nimi (esimerkiksi "Sermons" tai "Give").
   - **Icon** -- Valitse välilehdelle kuvake napsauttamalla kuvakevalitsinta.
   - **Image** -- Napsauta **Select Image** (tai **Change Image**) ja lisää välilehdelle kuva. Kuvalliset välilehdet näkyvät sovelluksen aloitusnäytöllä kuvalaattoina -- katso [Aloitusnäytön laatat](#home-screen-tiles).
   - **Tab Type** -- Valitse vaihtoehdoista, kuten Bible, Live Stream, Donation, Website ja muut.
   - **URL** -- Anna web-osoite, johon välilehti linkittyy.
   - **Visibility** -- Määritä, kuka näkee tämän välilehden (kaikki, vain jäsenet jne.). Jos kyseessä on **Member Directory** -välilehti, tämä määrittää vain, kuka näkee itse välilehden. Se, ketkä voivat avata hakemiston, asetetaan Member portal -sivun **Show in Directory** -asetuksella (katso [Jäsenhakemiston ja viestinnän asetukset](#member-directory--messaging-settings)).
3. Tallenna välilehti napsauttamalla **Save Tab** -painiketta.

## Olemassa olevan välilehden muokkaaminen

1. Napsauta mitä tahansa välilehteä **App Tabs** -luettelossa.
2. Päivitä välilehden nimi, kuvake, URL, tyyppi tai näkyvyysasetukset.
3. Ota muutokset käyttöön napsauttamalla **Save Tab**.

## Välilehtien järjestäminen uudelleen

Voit muuttaa mobiilisovelluksen välilehtien järjestystä. Järjestä välilehdet uudelleen vetämällä ja pudottamalla niitä luettelossa. Tällä sivulla näkyvä järjestys vastaa sitä järjestystä, jossa jäsenesi näkevät ne sovelluksessa.

:::info
Jotkin välilehdet voivat ilmestyä automaattisesti, kun tietyt ehdot täyttyvät -- esimerkiksi Live Stream -välilehti voi näkyä, kun suoratoisto on käynnissä. Manuaalisesti lisätyt välilehdet antavat sinulle täyden hallinnan siitä, mitä jäsenesi näkevät koko ajan.
:::

:::tip
Pidä välilehtien määrä hallittavana. Kolme–viisi välilehteä toimii useimmille seurakunnille hyvin. Liian monet välilehdet voivat sekoittaa jäsenesi navigoinnin.
:::

## Jäsenhakemiston ja viestinnän asetukset

**Member portal** -kohta samassa Mobile-osiossa sisältää asetukset, jotka ohjaavat jäsenhakemistoa ja yksityisviestintää B1.church-kokemuksessa:

- **Directory Approval Group** -- Ryhmä, joka tarkistaa jäsenhakemiston päivitykset ja [tilin poistopyynnöt](../profile/account-deletion.md) ennen niiden voimaantuloa.
- **Show in Directory** -- Kuka voi avata jäsenhakemiston ja kuka siihen on listattu: **Admins Only**, **Members and Above** (oletus), **Regular Attendees and Above** tai **Visitors and Above**. Henkilöt, joiden jäsenyysstatus on valitsemaasi tasoa alempi, eivät näe hakemistoa eivätkä ole siinä listattuina. **Admins Only** sulkee hakemiston kaikilta muilta paitsi henkilöstöltä, jolla on People &gt; View -oikeus (pelkkä Staff-jäsenyysstatus ei riitä). Heillä on aina pääsy hakemistoon ja näkyvyys kaikkiin jäseniin asetuksesta riippumatta. Vieraita ei koskaan sisällytetä, koska jokainen, joka rekisteröityy verkossa itse, aloittaa vieraana.
- **Visibility Preference** -- Asettaa seurakuntakohtaisen oletuksen jäsenille, jotka eivät ole vielä valinneet omaa asetustaan. **Address**, **Phone Number** ja **Email** kullakin on oma pudotusvalikkonsa, ja samat viisi tasoa ovat käytettävissä kaikkialla, missä näkyvyyttä määritetään:
  - **Everyone** -- näkyvissä kenelle tahansa, myös anonyymeille vierailijoille
  - **Members** -- näkyvissä vain henkilöille, joilla on Member- tai Staff-tietue
  - **Groups Only** -- näkyvissä vain henkilöille, jotka jakavat ryhmän tämän henkilön kanssa, sekä henkilöstölle
  - **My Group Leaders and Staff** -- näkyvissä vain tämän henkilön jäseninä olevien ryhmien ohjaajille sekä henkilöstölle
  - **Staff Only** -- näkyvissä vain henkilöstölle (kenelle tahansa, jonka jäsenyysstatus on Staff tai jolla on People &gt; View -oikeus) sekä henkilölle itselleen

  "Staff" näissä tasoissa tarkoittaa ketä tahansa, jonka jäsenyysstatus on Staff tai jolla on People &gt; View -oikeus. Ryhmämuutokset astuvat voimaan heti: henkilö, joka liittyy ryhmään tai nimetään ryhmän ohjaajaksi, näkee kyseisen ryhmän jäsenten vastaavat **Groups Only**- tai **My Group Leaders and Staff** -tiedot kirjautumatta ulos ja takaisin sisään.

  Jäsenet voivat ohittaa nämä oletukset omalla tietueellaan B1.church PWA:n profiilinsa **Privacy**-välilehdeltä -- katso [Profiilisi muokkaaminen](/docs/b1-church/getting-started/me-page).
- **Minimum Age for Private Messages** -- Lapsiturvallisuuden säätö. B1 ei avaa **uutta** yksityisviestikeskustelua, jos kumpikaan osapuoli on tätä ikää nuorempi. Ikä perustuu syntymäaikaan (kotitalouden rooli käytetään varana, jos syntymäaikaa ei ole tallennettu). Alle tuon iän olevat henkilöt ovat edelleen täysin näkyvissä hakemistossa -- ainoastaan suora viestintä estetään **molempiin suuntiin** kaikilta, myös henkilöstöltä. Ryhmäkeskustelut ja lapsen vanhempien viestittely toimivat edelleen. Vaihtoehdot ovat Off, 13, 16 tai 18; oletus on **18**. Olemassa olevat keskustelut eivät vaikuta.

:::tip
Koska ikärajatarkistus perustuu syntymäaikoihin, varmista, että seurakuntasi lasten syntymäajat on täytetty. Tämä asetus kuuluu samaan lapsiturvallisuuden kokonaisuuteen kuin [lasten sisäänkirjautumisen turvallisuusasetukset](../attendance/checkin-safety.md).
:::

### Aloitusnäytön kirjautumiskehote

Vierailijat, jotka avaavat sovelluksen [aloitusnäytön](/docs/b1-church/getting-started/navigating#home) kirjautumatta sisään, näkevät **Sign In** -painikkeen vieressä lyhyen kehotteen -- oletuksena *"Sign in to see your groups, giving, and more."* Member portal -sivun (`/mobile/b1-mobile`) **Home screen sign-in prompt** -asetukset mahdollistavat sen muuttamisen:

- **Show sign-in prompt on the app home screen** -- Poista tämä käytöstä, jotta kehote ja **Sign In** -painike piilotetaan aloitusnäytöltä. Vierailijat voivat silti kirjautua sisään sovelluksen valikosta.
- **Sign-in prompt text** -- Korvaa oletusteksti omalla viestilläsi (enintään 150 merkkiä). Jätä tyhjäksi käyttääksesi oletusta. Tämä kenttä on pois käytöstä, kun kehote on kytketty pois päältä.

Ota muutokset käyttöön napsauttamalla **Save**. **Saved**-viesti vahvistaa muutoksen. Tallennus päivittää sovelluksen välimuistissa olevat asetukset, joten muutos näkyy seuraavan kerran, kun aloitusnäyttö latautuu.

### Aloitusnäytön laatat

Välilehdet, joissa on kuva (katso **Image** kohdassa [Uuden välilehden lisääminen](#adding-a-new-tab)), näkyvät sovelluksen [aloitusnäytöllä](/docs/b1-church/getting-started/navigating#home) kuvalaattoina seurakuntasi nimellä varustetussa osiossa. Tähän kuuluu myös Verse of the Day -välilehti, jos annat sille kuvan. Kuvalliset välilehdet näkyvät silti myös välilehtipalkissa.

Member portal -sivun (`/mobile/b1-mobile`) **Home screen tiles** -asetus ohjaa näiden laattojen asettelua. Valitse **Layout**:

- **Grid** -- Kaksi laattaa riviä kohden (oletus). Kun laattoja on pariton määrä, ensimmäinen laatta kattaa koko leveyden.
- **Scrolling row** -- Yksi rivi laattoja, joita jäsenet pyyhkäisevät sivusuunnassa.
- **Scrolling (automatic)** -- Sama sivusuuntainen rivi, mutta se liikkuu myös itsestään ja siirtyy yhden laatan eteenpäin noin neljän sekunnin välein, palaten alkuun lopussa. Se pysähtyy, kun jäsen koskee riviin, viepi hiiren sen päälle tai siirtyy siihen sarkainnäppäimellä, ja jatkuu muutaman sekunnin kuluttua. Laitteilla, joilla liikkeen vähentäminen on päällä, rivi pysyy paikallaan ja toimii kuten **Scrolling row**.
- **List** -- Luettelo, jossa on pieni kuvakeskikuva kunkin välilehden nimen vieressä.

Ota muutokset käyttöön napsauttamalla **Save**.

### Aloitusnäytön osiot

Kirjautuneet jäsenet näkevät aina oman läsnäolohistoriansa ja lähettämänsä lomakkeet [Me-sivulla](/docs/b1-church/getting-started/me-page). Member portal -sivun (`/mobile/b1-mobile`) **Home screen sections** -kytkimet voivat näyttää ne myös aloitusnäytöllä:

- **Show My Attendance on Home** -- Lisää **My Attendance** -osion, jossa on, kuinka monta kertaa jäsen on osallistunut viimeisen 90 päivän aikana, hänen kaksi viimeisintä käyntiään ja **History**-linkki täydelliseen läsnäololuetteloon.
- **Show My Forms on Home** -- Lisää **My Forms** -osion, jossa on jäsenen kaksi viimeisintä lomakelähetystä ja **All forms** -linkki.

Molemmat ovat oletuksena pois päältä. Osio näkyy vain kirjautuneille jäsenille, joilla on vähintään yksi näytettävä tietue. Ota muutokset käyttöön napsauttamalla **Save**.

## Missä nämä välilehdet näkyvät

Tässä määrittämäsi välilehdet näkyvät **B1.church PWA:ssa**, jonka jäsenesi asentavat mistä tahansa sivusta osoitteessa `https://yourchurchname.b1.church`. Tällä sivulla tekemäsi muutokset näkyvät seuraavan kerran, kun jäsen avaa sovelluksen.

Puhelimella alareunan välilehtipalkissa näkyvät **Home**, enintään kolme välilehteäsi ja **More**. Tietokoneella yläpalkissa näkyy enintään viisi. Sisäänrakennetut näkymät (kuten Sermons, Giving tai Groups) saavat paikat ensin, ja **Internal Page** -välilehdet täyttävät mahdolliset vapaat paikat. **External URL**- ja **Verse of the Day** -välilehdille ei koskaan anneta paikkaa. Jokainen välilehti, myös ne, jotka eivät mahdu palkkiin, luetellaan sovelluksen **More**-sivulla. Katso [Navigointi B1Appissa](/docs/b1-church/getting-started/navigating), mitä jäsenet näkevät. Välilehtiä näytetään myös vanhentuneessa [B1 Mobile -natiivisovelluksessa](/docs/b1-church/index.md) niille jäsenille, jotka sitä vielä käyttävät, mutta se sovellus on vanhentunut eikä sitä enää päivitetä.

## Seuraavat vaiheet

- [Seurakunnan asetukset](./church-settings.md) -- Määritä seurakuntasi tiedot ja brändäys
- [Roolit ja oikeudet](./roles-permissions.md) -- Hallitse tiimisi käyttöoikeuksia
