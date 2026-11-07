---
title: "Palvelun valitseminen"
description: "Valitse osallistuttava palvelu B1 Checkinin palvelunäkymässä. Valinta määrittää palveluajat ja ryhmät, jotka näkyvät sisäänkirjautumisen loppuvaiheissa."
---

# Palvelun valitseminen

<div class="article-intro">

Jokaisen sisäänkirjautumisen ensimmäinen vaihe on valita, mihin palveluun osallistut. Palveluvalikko tulee näkyviin heti, kun sovellus on latautunut, ja se määrittää, mitkä palveluajat ja ryhmät ovat käytettävissä koko sisäänkirjautumisen ajan.

</div>

<div class="prereqs">
<h4>Ennen aloittamista</h4>

- [Kirjaudu sisään](../getting-started/logging-in.md) B1 Church Checkin -sovellukseen ja valitse seurakuntasi
- Varmista, että seurakunnan ylläpitäjä on [määrittänyt palvelut ja palveluajat](../../b1-admin/attendance/setup.md) B1 Adminissa

</div>

## Näin se toimii

1. Kirjauduttuasi sisään (tai automaattisen kirjautumisen jälkeen, kun palaat sovellukseen), sovellus näyttää **palveluvalikon**.
2. Näet luettelon kaikista seurakunnallesi määritetyistä palveluista. Jokainen palvelu näkyy korttina, jossa on palvelun nimi (esimerkiksi "Sunnuntaiaamu" tai "Keskiviikkoilta").
3. Napauta palvelua, johon osallistut.

Sovellus lataa palveluun liittyvät palveluajat ja ryhmät ja vie sinut sitten [jäsenhakunäkymään](./looking-up-members.md).

## Kun sisäänkirjautuminen ei ole auki

Jos ylläpitäjäsi on asettanut palveluajalle [sisäänkirjautumisaikataulun](../../b1-admin/attendance/setup.md#setting-a-check-in-schedule), sovellus sallii perheiden valita kyseisen palveluajan vain sen sisäänkirjautumisikkunan ollessa auki. Palveluajat, joiden ikkuna on tällä hetkellä kiinni, näkyvät edelleen [taloudenkatselunäkymässä](./household-review.md), mutta ne on merkitty **Suljettu**-tilaan (esimerkiksi **Suljettu · avautuu su klo 9.30**) eikä niissä ole ryhmäpainiketta.

Jos kaikki valitsemasi palvelun palveluajat ovat suljettuina, sovellus kertoo, milloin sisäänkirjautuminen avautuu, esimerkiksi: **"Tämän palvelun sisäänkirjautuminen avautuu su klo 9.30."** (Jos avautumisaikaa ei voida näyttää, sovellus kertoo: **"Sisäänkirjautuminen ei ole tällä hetkellä auki tälle palvelulle."**) Palaa palveluluetteloon napauttamalla **Takaisin** ja valitse toinen palvelu, tai odota, että ikkuna avautuu, ja yritä uudelleen.

:::info
Sisäänkirjautumisikkunat noudattavat palvelun kampuksen aikavyöhykettä. Jos kampukselle ei ole asetettu aikavyöhykettä, käytetään seurakuntasi aikavyöhykettä. Jos palveluajan avautumisaika näyttää väärältä, pyydä ylläpitäjää tarkistamaan aikavyöhyke kampuksen tai seurakunnan asetuksista. Taloudenkatselunäkymässä kioski käyttää myös tabletin omaa kelloa palveluaikojen avaamiseen ja sulkemiseen, joten varmista, että tabletin kellonaika ja aikavyöhyke ovat oikein.
:::

:::info
Ylläpitäjä määrittää palvelut B1 Adminissa Läsnäolo-osiossa. Jos et näe odottamaasi palvelua, pyydä ylläpitäjää tarkistamaan, että se on luotu [läsnäolon asetuksissa](../../b1-admin/attendance/setup.md).
:::

## Mitä taustalla tapahtuu

Kun valitset palvelun, sovellus hakee palvelimelta kolme asiaa:

- Kyseisen palvelun **palveluajat** (esimerkiksi yhdellä palvelulla voi olla klo 9.00 ja klo 11.00 -aikavälit).
- **Ryhmät**, jotka ovat käytettävissä kullakin palveluajalla (esimerkiksi Lastenhoito, Esikoulu, Alakoulu).
- **Ryhmien ja palveluaikojen väliset linkit**, jotka määrittävät, mitkä ryhmät ovat käytettävissä mihinkin aikaan.

Nämä tiedot tallennetaan paikallisesti, jotta loppu sisäänkirjautumisprosessi on nopea ja reagoiva.

:::tip
Jos seurakunnassasi on määritetty vain yksi palvelu, sinun on silti napautettava sitä jatkaaksesi. Sovellus ei valitse yhtä palvelua automaattisesti.
:::

## Seuraava vaihe

Kun olet valinnut palvelun, [etsit perheesi](./looking-up-members.md) puhelinnumeron tai nimen perusteella.
