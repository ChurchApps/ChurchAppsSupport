---
title: "Check-in-n viimeistely"
description: "Viimeistele perheen kioskikirjautuminen B1 Checkin -sovelluksessa: huoneiden rajat, nimilappujen tulostus, noutoturvakoodit ja sovelluksen seuraava vaihe."
---

# Check-in-n viimeistely

<div class="article-intro">

Kun olet tarkistanut taloudesi ja tehnyt tarvittavat ryhmämääritykset, olet valmis viimeistelemään check-inin. Tämä on kioskityönkulun viimeinen vaihe: sovellus lähettää osallistumistiedot, tulostaa tarrat ja nollaantuu seuraavaa perhettä varten.

</div>

<div class="prereqs">
<h4>Ennen aloittamista</h4>

- [Tarkista talouden tiedot](./household-review.md) talouden tarkistusnäytöllä
- [Määritä ryhmät](./group-assignment.md) niille perheenjäsenille, jotka tarvitsevat kirjautumisen tiettyyn luokkaan tai ohjelmaan
- Valinnaisesti [lisää vieraat](./adding-guests.md), jotka vierailevat perheesi kanssa

</div>

## Check-in-prosessi

1. Napauta **talouden tarkistusnäytöltä** näytön alareunassa olevaa **Check-in**-painiketta.
2. Sovellus lähettää osallistumistiedot palvelimelle ja näyttää **onnistumisnäytön**, jossa on vihreä rasti ja tervetulotoivotus.

Siinä kaikki. Perheesi osallistuminen on kirjattu.

Jos joku valitsemistasi henkilöistä on jo kirjautunut tämän jumalanpalveluksen tai tilaisuuden osalta tänään, ensin avautuu ikkuna **Already Checked In**, joka nimeää kyseiset henkilöt. Napauta **Check In Again** tallentaaksesi heidän uudet ryhmävalintansa tai **Cancel** palataksesi talouden näytölle.

## Täydet huoneet ja vapaaehtoisten suhdeluvut

Jos seurakuntasi on määrittänyt huoneilleen [turvarajat](../../b1-admin/attendance/checkin-safety.md), palvelin tarkistaa ne ennen tallennusta:

- Jos valittu huone on **täynnä tai suljettu**, check-in ei onnistu ja sovellus nimeää huoneen, jotta voit valita toisen.
- Jos tilaisuusajalla on [check-in-aikataulu](../../b1-admin/attendance/setup.md#setting-a-check-in-schedule) ja sen check-in-ikkuna ei ole juuri nyt auki, check-in kyseisen tilaisuusajan huoneisiin evätään myös. Näyttö **Can't check in yet** luettelee huoneen syynä "check-in isn't open right now"; napauta **Change Rooms** valitaksesi toisen tilaisuusajan tai ryhmän. (Jo suljetut tilaisuusajat näkyvät **Closed**-merkintänä [talouden näytöllä](./household-review.md) eikä niitä voi valita, joten tämän näkeminen tapahtuu yleensä vain, jos ikkuna sulkeutuu kesken check-inin.)
- Talous, joka on kirjautunut aiempaan tilaisuusaikaan, voi palata myöhemmin ja lisätä avoinna olevan tilaisuusajan, vaikka aiempi ikkuna olisi jo sulkeutunut. Heidän olemassa olevat kirjautumisensa säilyvät eivätkä estä uutta check-iniä.
- Jos lasten huoneessa on **vapaaehtoisia liian vähän** suhdelukuun nähden, sovellus joko näyttää varoituksen, jonka henkilökunnan jäsen voi vahvistaa jatkaakseen, tai estää check-inin kokonaan. Tämä riippuu siitä, miten seurakuntasi on määrittänyt suhdeluvun valvonnan.

## Tarrojen tulostus

Jos verkkotulostin on määritetty, sovellus tulostaa tarrat automaattisesti check-inin jälkeen:

- **Nimilaput** tulostetaan jokaiselle henkilölle, joka on määritetty ryhmään, jossa **Print Nametag** -asetus on käytössä. Nimilaput sisältävät henkilön nimen, ryhmämäärityksen sekä mahdolliset allergia- ja muistiinpanotiedot.
- **Vanhempien noutolaput** tulostetaan, kun jokainen kirjautunut henkilö on ryhmässä, jossa **Parent Pickup** -asetus on käytössä. Henkilöt, jotka on kirjattu **Volunteer**-rooliin, ohitetaan, joten Parent Pickup -huoneessa palvelevaa lastenhoitajaa ei tulosteta noutolappua. Noutolapussa luetellaan lapset, heidän ryhmämääritykset ja yksilöllinen **4-merkkinen turvakoodi**.

:::info
Sama turvakoodi esiintyy sekä lapsen nimilapussa että vanhemman noutolapussa. Noutohetkellä vapaaehtoiset vertaavat koodeja varmistaakseen, että oikea aikuinen hakee kunkin lapsen.
:::

Turvakoodi luodaan jokaisella check-inillä uudelleen, ja se koostuu vain konsonanteista ja numeroista (vokaaleja ei käytetä, jotta vältetään sopimattomien sanojen muodostuminen).

:::warning
Jos tarrat eivät tulostu, avaa ylläpitoasetukset napauttamalla **seurakunnan logoa** seitsemän kertaa ja napauta sitten **Change Printer** tarkistaaksesi tulostinyhteyden. Vianmääritysohjeet löydät kohdasta [Tulostimen asennus](../getting-started/printer-setup.md).
:::

## Mitä tapahtuu check-inin jälkeen

- Jos tulostin on määritetty, sovellus tulostaa kaikki tarrat ja palaa sen jälkeen automaattisesti **hakunäytölle** valmiina seuraavaa perhettä varten.
- Jos tulostinta ei ole määritetty, sovellus palaa myös automaattisesti **hakunäytölle**.

Molemmissa tapauksissa onnistumisnäyttö pysyy auki vähintään 6 sekuntia sen ilmestymisestä (8 sekuntia, kun juhlitaan jonkun osallistumistavoitetta), jotta perheet näkevät check-inin onnistuneen. Jos tulostus kestää tätä pidempään, sovellus palaa noin puolitoista sekuntia tulostuksen päättymisen jälkeen.

Hakunäytölle palaamiseen sinun ei tarvitse napauttaa mitään, sillä sovellus hoitaa siirtymän automaattisesti. Kun näyttö on ollut auki hetken, voit napauttaa sitä palataksesi heti; napautus ensimmäisen puolentoista sekunnin aikana ohitetaan, joten nopea kaksoisnapautus **Check-in**-painikkeeseen ei ohita näyttöä.

:::tip
Sovellus nollautuu täysin jokaisen check-inin jälkeen, joten ei ole vaaraa, että yksi perhe näkisi toisen perheen tietoja.
:::

## Mitä tallennetaan

Kun napautat **Check-in**-painiketta, sovellus lähettää palvelimelle seuraavat tiedot jokaisesta talouden jäsenestä, jolla on ryhmämääritys:

- **Henkilö**, joka kirjataan sisään
- **Tilaisuus**, johon hän osallistuu
- **Tilaisuusaika** ja **ryhmä**, johon hänet on määritetty

Nämä tiedot näkyvät B1 Adminissa Attendance-osiossa, jossa seurakunnan ylläpitäjät voivat tarkastella ja hallita osallistumistietoja. Lisätietoja on [check-in-ylläpito-oppaassa](../../b1-admin/attendance/check-in.md).
