---
title: "Sisäänkirjautumisen turvallisuus"
description: "Määritä B1 Adminissa lasten turvallisuus: huoneiden kapasiteetti, vapaaehtoisten suhdeluvut, noutolistat ja vanhemmille lähtevät viestit."
---

# Sisäänkirjautumisen turvallisuus

<div class="article-intro">

B1 sisältää joukon lasten turvallisuuteen liittyviä sisäänkirjautumisen asetuksia: huoneiden enimmäiskapasiteetin ja vapaaehtoisten suhteen lapsiin, ikä- ja luokka-astesuosituksia infopisteessä, sisäänkirjautumistyyppejä, jotka erottavat jäsenet, vieraat ja vapaaehtoiset toisistaan, sekä kotitalouskohtaisen luotettujen noutajien listan, joka tarkistetaan uloskirjautumisen yhteydessä. Tällä sivulla kerrotaan, miten kukin turvallisuusominaisuus määritetään B1 Adminissa.

</div>

<div class="prereqs">
<h4>Ennen aloittamista</h4>

- Määritä [osallistumisen rakenne](setup.md) ja [sisäänkirjautumispisteet](check-in.md)
- Huoneet ovat [ryhmiä](../groups/creating-groups.md), jotka on linkitetty jumalanpalvelusaikoihin. Alla olevat turvallisuusasetukset määritetään ryhmässä.
- Kutsu vanhempi -toiminto ja hätälähetys vaativat yhdistetyn tekstiviestipalvelun ([Text In Church](../integrations/services/text-in-church.md), [Clearstream](../integrations/services/clearstream.md) tai Mutual Ministry)

</div>

## Huoneen kapasiteetti ja huoneen sulkeminen

Jokainen sisäänkirjautumishuone (ryhmä) voi noudattaa omia rajoituksiaan. Avaa ryhmä, napsauta **Edit** muokataksesi sen asetuksia ja etsi osio **Check-In Capacity**:

- **Capacity** -- Enimmäismäärä ihmisiä, jotka voidaan kirjata sisään tähän huoneeseen samanaikaisesti. Kun huone on täynnä, sisäänkirjautuminen siihen estetään ja infopiste ilmoittaa täydestä huoneesta.
- **Guest Capacity** -- Valinnainen erillinen raja sille, kuinka monta vierasta huoneeseen mahtuu.
- **Closed for Check-In** -- Aseta arvoon **Yes**, jolloin kaikki sisäänkirjautumiset tähän huoneeseen pysäytetään heti (esimerkiksi kun luokka peruutetaan tai huone ei ole käytettävissä). Uloskirjautuminen toimii edelleen.

## Vapaaehtoisten suhdeluvut

Ryhmän osio **Check-In Capacity** sisältää myös henkilöstömitoitusta koskevat säännöt:

- **Children per Volunteer** -- Enimmäismäärä lapsia, jotka kukin sisään kirjautunut vapaaehtoinen voi valvoa (esimerkiksi 5 tarkoittaa yhtä vapaaehtoista viittä lasta kohden).
- **Minimum Volunteers** -- Pienin määrä vapaaehtoisia, jotka on kirjattava sisään ennen kuin lapset voivat kirjautua huoneeseen.

Vapaaehtoiset lasketaan näihin sääntöihin, kun he kirjautuvat sisään infopisteessä tyypillä **Volunteer** (katso [Sisäänkirjautumisen tyypit](#check-in-types) alla).

### Varoitus vai esto

Suhdelukujen tiukkuus määritetään koko seurakuntaa koskevalla asetuksella:

1. Siirry B1 Adminissa kohtaan **Settings** ja avaa osio **Check-In**.
2. Aseta **Volunteer Ratio Enforcement**:
   - **Warn (allow with confirmation)** -- Infopiste näyttää varoituksen, jos huoneessa on liikaa lapsia suhteessa vapaaehtoisiin tai vapaaehtoisia on alle minimimäärän. Henkilökunnan jäsen voi vahvistaa jatkamisen. Tämä on oletusarvo.
   - **Block (prevent check-in)** -- Sisäänkirjautuminen huoneeseen evätään, kunnes riittävä määrä vapaaehtoisia on kirjattu sisään.

:::info
Capacity ja Closed for Check-In ovat aina ehdottomia rajoja. Varoitus/esto-valinta koskee vain vapaaehtoisten suhdelukuja.
:::

## Sisäänkirjautumisen tyypit

Jokaisessa sisäänkirjautumisessa tallennetaan, onko henkilö **Member**, **Guest** vai **Volunteer**. Tyyppi valitaan infopisteen kotitalousnäkymän sirukkeilla (oletusarvo on Member). Tyypit ohjaavat turvallisuussääntöjä: vapaaehtoiset kattavat suhdeluvut, ja vieraat lasketaan huoneen Guest Capacity -rajaan.

## Ikä- ja luokka-asteohjaus huoneille

Voit antaa jokaiselle huoneelle ikä- tai luokka-asterajat, jotta infopiste ohjaa perheet sopiviin huoneisiin:

- Ryhmän asetuksissa käytä osiota **Age & Grade** ja aseta huoneelle vähimmäis- ja enimmäisikä (vuodet ja kuukaudet) ja/tai luokka-aste.
- Infopisteessä huoneet, joihin lapsi kuuluu, korostetaan ja huoneet, joihin hän ei kuulu, himmennetään. Himmennetyn huoneen voi silti valita henkilökunnan vahvistuksella. Ohjaus ei koskaan estä kirjautumista kokonaan.

Luokka-asteet siirtyvät seurakuntasi **grade promotion date** -päivänä:

1. Siirry B1 Adminissa kohtaan **Settings** ja avaa osio **Grade Promotion**.
2. Aseta kuukausi ja päivä, jolloin seurakuntasi siirtää oppilaat seuraavalle luokalle (esimerkiksi 1. elokuuta). Iät ja luokka-asteet infopisteessä lasketaan viimeisimmän siirtopäivän mukaan.

## Luotetut ja valtuuttamattomat noutajat

Jokaiseen kotitalouteen voi liittyä lista ihmisistä, joiden saa tai ei saa noutaa sen lapsia.

1. Avaa henkilön sivu kohdassa **People** ja etsi kortti **Pickup**.
2. Napsauta **Add**. Hae olemassa oleva henkilö tai lisää järjestelmään kuulumaton henkilö syöttämällä hänen **Name**, **Relationship** ja valokuva.
3. Aseta **Status**:
   - **Trusted** -- Uloskirjautumisessa tämä henkilö näkyy napautettavana noutokorttina valokuvineen, mikä nopeuttaa varmennettua noutoa.
   - **Not Authorized** -- Jos joku yrittää noutaa lapsen tällä nimellä, infopiste estää uloskirjautumisen varoituksella. Henkilökunnan jäsen voi ohittaa eston, ja ohitus kirjataan sisäänkirjautumistietueeseen.

Vaihda henkilön tilaa napauttamalla kortin tilasirua, jolloin tila vaihtuu Trusted ja Not Authorized välillä.

:::tip
Lisää valokuvat luotettuihin noutajiin aina kun mahdollista. Uloskirjautumisnäkymä näyttää kuvan, jotta vapaaehtoiset voivat tarkistaa edessään seisovan henkilön.
:::

## Vanhemman hälyttäminen ja hätätiedote

Molemmat ominaisuudet lähettävät tekstiviestejä seurakuntasi yhdistetyn tekstiviestipalvelun kautta. B1:ssä ei ole sisäänrakennettua tekstiviestipalvelua, joten yksi tuetuista palveluista on ensin määritettävä.

- **Page a parent** -- Henkilökunta voi lähettää tekstiviestin sisään kirjatun lapsen vanhemmille tai huoltajille miehitetyn infopisteen uloskirjautumisnäkymästä (esimerkiksi "Tulkaa ystävällisesti lastenhoitohuoneeseen").
- **Emergency broadcast** -- Henkilökunta voi lähettää infopisteen ylläpitoasetuksista tekstiviestin kaikkien valitun jumalanpalveluksen sisään kirjattujen kotitalouksien huoltajille kerralla. Lähettäminen vaatii, että kirjoitat **EMERGENCY** vahvistukseksi.

Henkilöt, jotka ovat kieltäytyneet tekstiviesteistä tai joiden matkapuhelinnumeroa ei ole tallennettu, ohitetaan automaattisesti. Infopiste ilmoittaa, montako viestiä lähetettiin ja montako ohitettiin.

Katso infopisteen puolen ohjeet artikkelista [Uloskirjautuminen ja lasten turvallisuus](../../b1-checkin/check-in/checking-out.md).

## Aiheeseen liittyvät artikkelit

- [Sisäänkirjautuminen](check-in.md) — infopisteen asetukset ja laitteisto
- [Uloskirjautuminen ja lasten turvallisuus](../../b1-checkin/check-in/checking-out.md) — infopisteen uloskirjautuminen, noudon varmennus ja kutsuprosessit
- [Ryhmien luominen](../groups/creating-groups.md) — missä huoneasetukset sijaitsevat
- [Osallistumisen asetukset](setup.md) — jumalanpalvelukset, jumalanpalvelusajat ja huonemääritykset
- [Vähimmäisikä yksityisviesteille](../settings/mobile-app.md#member-directory--messaging-settings) — estää uudet yksityisviestikeskustelut lasten kanssa, mutta pitää lapset hakemistossa
