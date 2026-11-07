---
title: "Näytön yhdistäminen"
description: "Yhdistä FreePlay-TV näyttöryhmän kalenteriin FreePlay Adminissa TV:n nelikirjaimisella koodilla, jotta se toistaa aikataulutettua sisältöä itsenäisesti."
---

# Näytön yhdistäminen

<div class="article-intro">

Jotta TV voidaan lisätä kalenteriin, yhdistä se **FreePlay Adminiin**. TV näyttää nelikirjaimisen koodin. Syötät tämän koodin osoitteessa [admin.freeplay.church](https://admin.freeplay.church) ja valitset näyttöryhmän, jonka kalenteria TV:n pitäisi seurata. Tämä tehdään vain kerran per TV.

</div>

<div class="prereqs">
<h4>Ennen aloittamista</h4>

- Asenna ja käynnistä FreePlay TV:llä. Katso [Aloittaminen](../getting-started/index.md)
- Ota seurakuntasi ChurchApps-kirjautuminen käyttöön, jotta voit kirjautua FreePlay Adminiin
- Halutessasi, [luo soittolista](./building-playlists.md) ja [ajoita se](./scheduling-the-calendar.md) ensin, jotta TV:llä on heti jotain toistettavaa

</div>

## Koodin näyttäminen TV:llä

1. Avaa TV:llä **Asetukset** sivupalkin alareunasta.
2. Valitse **Yhdistä kalenteriin**. Rivillä lukee **Ei yhdistetty**, jos TV ei ole vielä yhdistetty.
3. Näyttö **Yhdistä tämä näyttö** näyttää QR-koodin ja nelikirjaimisen yhdistämiskoodin viestillä **Skannaa puhelimellasi tai mene osoitteeseen freeplay.church/pair ja syötä tämä koodi**.
4. Koodin alapuolella **Odotetaan vahvistusta** sykkii, kun FreePlay odottaa, että viimeistelet yhdistämisen.

Koodi on voimassa 15 minuuttia, ja sen alla oleva laskuri näyttää jäljellä olevan ajan. Kun aika loppuu, FreePlay näyttää automaattisesti uuden koodin. Voit myös valita **Luo uusi koodi** saadaksesi tuoreen koodin tai **Peruuta** palataksesi Asetuksiin.

## Yhdistäminen FreePlay Adminissa

1. Skannaa QR-koodi puhelimellasi tai mene osoitteeseen **freeplay.church/pair** millä tahansa tietokoneella tai puhelimella. Kirjaudu sisään, jos sitä pyydetään. FreePlay Admin avaa **Yhdistä näyttö** -lomakkeen, johon koodi on jo täytetty.
   - Voit myös avata lomakkeen itse. Mene FreePlay Adminissa kohtaan **Näytöt** ja napsauta **Yhdistä näyttö**.
2. Tarkista **Yhdistämiskoodi**. Se on TV:llä näkyvät neljä kirjainta.
3. Anna **Nimi**, jotta voit erottaa tämän TV:n muista, esimerkiksi „Aula vasen”. Tämä on valinnainen.
4. Valitse kohdassa **Ryhmä** näyttöryhmä, jonka kalenteria tämän TV:n tulisi seurata. Jos haluat aloittaa uuden, valitse **＋ Uusi ryhmä…** ja anna **Uuden ryhmän nimi**.
5. Jätä kohdassa **Tila** valituksi **Ajoitettu**. TV toistaa sisältöä ryhmän kalenterin mukaan itsenäisesti.
6. Napsauta **Yhdistä**.

TV näyttää **Yhdistetty!** ja sen jälkeen **Ladataan aikataulua...**. Se lataa ajoitetun sisällön ja alkaa toistaa. Katso [Ajoitettu toisto TV:llä](./scheduled-playback.md).

:::info
Jos FreePlay Admin ilmoittaa **Tätä koodia ei tunnistettu TV:ksi**, tarkista koodi näytöltä. Jos se on vanhentunut, käytä TV:n nyt näyttämää uutta koodia.
:::

### Ajoitettu vs. manuaalinen

Kohdan **Tila** asetuksessa on kaksi vaihtoehtoa:

- **Ajoitettu** - Toistaa ryhmän kalenterin mukaan itsenäisesti. Kenenkään ei tarvitse painaa Käynnistä.
- **Manuaalinen** - Joku valitsee sisällön kaukosäätimellä. Manuaalinen näyttö näkyy edelleen **Näytöt**-listallasi, mutta se ei seuraa kalenteria, joten kenttä **Ryhmä** on poistettu käytöstä.

Voit vaihtaa näytön tilan myöhemmin valitsemalla **Muokkaa** [Näytöt-sivulta](./managing-screens.md).

## Yhdistäminen palvelusuunnitelmaan

Koodi näytöltä **Yhdistä tämä näyttö** toimii myös B1 Adminissa. Jos syötät sen siellä ja valitset suunnitelmatyypin kohdasta **Näytä suunnitelmat**, TV seuraa sitä suunnitelmatyyppiä kalenterin sijaan [Suunnitelmatilassa](../plan-mode/index.md). Katso [Laitteen yhdistäminen](../plan-mode/device-pairing.md).

## Yhdistyksen muuttaminen tai purkaminen TV:ltä

Kun TV on yhdistetty, rivi **Yhdistä kalenteriin** Asetuksissa näyttää sen näyttöryhmän nimen, jota TV seuraa. Valitse rivi avataksesi **Yhdistetty kohteeseen** -dialogin, jossa on kolme vaihtoehtoa:

- **Takaisin aikatauluun** - Sulkee dialogin ja palaa ajoitettuun soittimeen. Yhdistys ei muutu.
- **Pura yhdistys** - Lopettaa aikataulun seuraamisen. FreePlay avaa **Sisällön tarjoajat** -näytön.
- **Yhdistä eri kalenteriin** - Purkaa yhdistyksen ja näyttää uuden yhdistämiskoodin, jotta TV voidaan yhdistää uudelleen.

:::warning
Yhdistyksen purkaminen poistaa tälle kalenterille FreePlayn ladatut tiedostot.
:::

## Yhdistyksen purkaminen FreePlay Adminissa

1. Mene kohtaan **Näytöt** ja napsauta näytön nimeä.
2. Napsauta **Lisää** ja sitten **Pura yhdistys**.
3. Vahvista napsauttamalla uudelleen **Pura yhdistys**.

TV palaa näyttämään yhdistämiskoodia. Yhdistä se uudelleen, kun haluat sen takaisin käyttöön.

## Aiheeseen liittyvät artikkelit

- **[Näyttöjen ja ryhmien hallinta](./managing-screens.md)** - Nimeä näyttö uudelleen, siirrä se toiseen ryhmään tai tarkista sen lataukset
- **[Kalenterin ajoittaminen](./scheduling-the-calendar.md)** - Päätä, mitä ryhmän näytöt toistavat
- **[Yhdistämistilan valinta](../getting-started/pairing-modes.md)** - Vertaa Ajoitettua tilaa Suunnitelmatilaan ja sisällön tarjoajien selaamiseen itse
