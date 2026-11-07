---
title: "Check-inin viimeistely"
description: "Viimeistele perheen sisäänkirjautuminen kioskilla B1 Checkinissä: huonemäärärajat, tarratulostus, noutokoodit ja sovelluksen seuraava vaihe."
---

# Check-inin viimeistely

<div class="article-intro">

Kun olet tarkistanut perheesi tiedot ja tehnyt tarvittavat ryhmämääritykset, olet valmis viimeistelemään check-inin. Tämä on viimeinen vaihe kioskityönkulussa: sovellus lähettää läsnäolotiedot, tulostaa tarrat ja palautuu valmiiksi seuraavaa perhettä varten.

</div>

<div class="prereqs">
<h4>Ennen aloittamista</h4>

- [Tarkista perheesi](./household-review.md) perheen tarkistusnäytöllä
- [Määritä ryhmät](./group-assignment.md) perheenjäsenille, jotka tarvitsevat kirjautumisen tiettyyn luokkaan tai ohjelmaan
- Halutessasi [lisää vieraat](./adding-guests.md), jotka tulevat perheesi mukana

</div>

## Näin teet check-inin

1. Napauta **perheen tarkistusnäytön** alareunassa olevaa **Check-in**-painiketta.
2. Sovellus lähettää läsnäolotiedot palvelimelle ja näyttää **onnistumisnäytön**, jossa on vihreä rasti ja tervetulotoivotus.

Siinä kaikki. Perheesi läsnäolo on kirjattu.

## Täydet huoneet ja suhdeluvut

Jos seurakuntasi on asettanut [turvarajoitukset](../../b1-admin/attendance/checkin-safety.md) huoneilleen, palvelin tarkistaa ne ennen tallennusta:

- Jos valittu huone on **täynnä tai suljettu**, check-in ei onnistu ja sovellus nimeää huoneen, jotta voit valita toisen.
- Jos jumalanpalveluksella on [check-in-aikataulu](../../b1-admin/attendance/setup.md#setting-a-check-in-schedule) ja sen check-in-ikkuna ei ole juuri nyt auki, check-in kyseisen palveluajan huoneisiin evätään myös. **Check-in ei vielä mahdollinen** -näyttö listaa huoneen syynä "check-in ei ole juuri nyt auki". Napauta **Vaihda huoneita** valitaksesi toisen palveluajan tai ryhmän. (Jo suljetut palveluajat näkyvät [perheen näytöllä](./household-review.md) merkinnällä **Suljettu**, eikä niitä voi valita. Tämän näet yleensä vain, jos ikkuna sulkeutuu kesken check-inin.)
- Perhe, joka teki check-inin aiemmalle palveluajalle, voi palata myöhemmin ja lisätä avoimen palveluajan, vaikka aiemman ikkunan aukiolo olisi päättynyt. Heidän aiemmat check-innsä säilyvät, eivätkä ne estä uutta check-iniä.
- Jos lasten huoneessa on **liian vähän vapaaehtoisia** suhdelukuun nähden, sovellus joko näyttää varoituksen, jonka henkilökunnan jäsen voi vahvistaa jatkaakseen, tai estää check-inin kokonaan. Tämä riippuu siitä, miten seurakuntasi on määrittänyt suhdelukujen valvonnan.

## Tarrojen tulostus

Jos verkkotulostin on määritetty, sovellus tulostaa tarrat automaattisesti check-inin jälkeen:

- **Nimitarrat** tulostetaan jokaiselle henkilölle, joka on määritetty ryhmään, jolla on **Tulosta nimilappu** -asetus käytössä. Nimitarrassa on henkilön nimi, hänen ryhmämääryksensä sekä mahdolliset allergia- ja muistiinpanotiedot.
- **Vanhempien noutolaput** tulostetaan, kun jokin sisäänkirjautunut henkilö kuuluu ryhmään, jolla on **Vanhempien nouto** -asetus käytössä. **Vapaaehtoisena** sisäänkirjautuneet ohitetaan, joten lastenhoitaja, joka palvelee Vanhempien nouto -huoneessa, ei saa noutolappua. Noutolapussa on lasten nimet, heidän ryhmämääryksensä ja yksilöllinen **4-merkkinen turvakoodi**.

:::info
Sama turvakoodi esiintyy sekä lapsen nimitarrassa että vanhemman noutolapussa. Noutohetkellä vapaaehtoiset vertaavat koodeja varmistaakseen, että oikea aikuinen hakee kunkin lapsen.
:::

Turvakoodi luodaan uudelleen jokaisen check-inin yhteydessä, ja se käyttää vain konsonantteja ja numeroita. Vokaalit on jätetty pois, jotta koodeista ei muodostu sopimattomia sanoja.

:::warning
Jos tarrat eivät tulostu, avaa hallintoasetukset napauttamalla **seurakunnan logoa** seitsemän kertaa ja napauta sitten **Vaihda tulostin** tarkistaaksesi tulostinyhteyden. Vianmääritysohjeet löydät kohdasta [Tulostimen asennus](../getting-started/printer-setup.md).
:::

## Mitä check-inin jälkeen tapahtuu

- Jos tulostin on määritetty, sovellus tulostaa kaikki tarrat ja palaa sen jälkeen automaattisesti **hakunäytölle**, valmiina seuraavaa perhettä varten.
- Jos tulostinta ei ole määritetty, sovellus palaa myös automaattisesti **hakunäytölle**.

Kummassakin tapauksessa onnistumisnäyttö pysyy näkyvissä vähintään 6 sekuntia sen ilmestymisestä (8 sekuntia, kun se juhlistaa jonkun läsnäolotavoitteen saavuttamista), jotta perheet näkevät check-inin onnistuneen. Jos tulostaminen kestää pidempään, sovellus palaa noin puolentoista sekunnin kuluttua tulostuksen päättymisestä.

Hakunäytölle palaamiseen ei tarvitse napauttaa mitään, sillä sovellus hoitaa siirtymän automaattisesti. Kun näyttö on ollut auki hetken, voit napauttaa sitä palataksesi heti. Napautus ensimmäisen puolentoista sekunnin aikana jätetään huomiotta, joten nopea kaksoisnapautus **Check-in**-painikkeeseen ei ohita näyttöä.

:::tip
Sovellus nollautuu kokonaan jokaisen check-inin jälkeen, joten ei ole vaaraa, että yksi perhe näkisi toisen perheen tietoja.
:::

## Mitä tallennetaan

Kun napautat **Check-in**-painiketta, sovellus lähettää palvelimelle seuraavat tiedot jokaisesta perheenjäsenestä, jolla on ryhmämääritys:

- Check-inin kohteena oleva **henkilö**
- **Palvelu**, johon hän osallistuu
- **Palveluaika** ja **ryhmä**, joihin hänet on määritetty

Nämä tiedot näkyvät B1 Adminissa Läsnäolo-osiossa, jossa seurakunnan ylläpitäjät voivat tarkastella ja hallita läsnäolotietoja. Lisätietoja on [check-inin hallintaohjeissa](../../b1-admin/attendance/check-in.md).
