---
title: "Saatavuuskalenteri"
description: "Määritä B1 Adminissa varattavat tilat ja laitteet, lisää valmistelu- ja purkuajat ja hallitse toistuvat tai hyväksyntää vaativat varaukset kalenterissa."
---

# Saatavuuskalenteri

<div class="article-intro">

Saatavuuskalenterin avulla näet kaikkien seurakuntasi huone- ja resurssivarausten kokonaiskuvan. Täältä voit nähdä, mitä on ajastettu, havaita päällekkäisyydet ennen kuin ne syntyvät, ja varata huoneen tai resurssin mihin tahansa tapahtumaan suoraan.

</div>

<div class="prereqs">
<h4>Ennen aloittamista</h4>

- Luo vähintään yksi [huone tai resurssi](./rooms-resources.md) Huoneet ja resurssit -osiossa
- Tarvitset muokkausoikeuden B1 Adminin Kalenterit-osioon

</div>

## Saatavuuskalenterin avaaminen

Avaa B1 Adminissa [Hyppyvalikko](../introduction.md#getting-around-with-the-jump-menu) (haku­palkki vasemmassa yläkulmassa), laajenna **Kalenterit** ja napsauta **Saatavuus**.

## Kalenterin lukeminen

Kalenteri näyttää oletuksena nykyisen kuukauden. Voit siirtyä eteen- ja taaksepäin yläreunan nuolilla tai vaihtaa kuukausi-, viikko- ja päivänäkymän välillä.

Jokainen tapahtuma on värikoodattu varauksen tilan mukaan:

| Väri | Merkitys |
|-------|---------|
| Vihreä | Hyväksytty |
| Oranssi | Hyväksyntä odottaa |
| Harmaa | Estetty (ei käytettävissä) |

Tapahtuman päälle vietäessä hiiren osoitin näyttää tapahtuman otsikon sekä huoneen tai resurssin, johon se on liitetty.

## Suodattaminen huoneen tai resurssin mukaan

Käytä vasemmassa yläkulmassa olevaa **Huone / Resurssi** -pudotusvalikkoa rajataksesi kalenterin yhteen huoneeseen tai resurssiin. Valitse **Kaikki huoneet ja resurssit** palataksesi täyteen näkymään.

## Huoneen tai resurssin varaaminen

1. Napsauta sivun yläreunassa olevaa **Varaa**-painiketta.
2. Avautuvassa ikkunassa täytä tapahtuman tiedot:
   - **Otsikko** — tapahtuman nimi
   - **Alku** ja **Loppu** päivämäärä/aika
   - **Näkyvyys** — Julkinen tai Yksityinen
   - **Huoneet** — valitse yksi tai useampi varattava huone
   - **Resurssit** — valitse yksi tai useampi varattava resurssi
3. Voit halutessasi asettaa **Valmistelu**- ja **Purku**-ajat (minuutteina). Nämä pidentävät varausta molemmista päistä, jotta tila on varattu valmisteluun ja siivoukseen, vaikka tapahtuman alku- ja loppuaika pysyvät samoina.
4. Toistaaksesi varauksen, valitse **Toistuu** ja määritä toistuvuus:
   - **Toista joka** -- aseta väli (esimerkiksi joka 2. viikko).
   - **Taajuus** -- Päivittäin, Viikoittain tai Kuukausittain. Viikoittainen mahdollistaa tiettyjen viikonpäivien valinnan; kuukausittainen mahdollistaa kiinteän kuukauden päivän tai suhteellisen kaavan, kuten "toinen tiistai".
   - **Päättyy** -- Ei koskaan, tiettynä päivänä tai asetetun tapahtumakertojen määrän jälkeen.
5. Jos haluat määrittää mukautetun varausajan (eri kuin tapahtuman alku ja loppu), valitse **Mukautettu varausaika** ja syötä ikkunan alku- ja loppuaika. Käytä tätä, kun huoneen on oltava käytettävissä tapahtuman ilmoitettujen aikojen ulkopuolella.
6. Lähetä varaus napsauttamalla **Tallenna**.

:::info
Jos huoneelle tai resurssille on määritetty **Hyväksyntäryhmä**, varaus näkyy **Odottaa**-tilassa, kunnes kyseisen ryhmän johtaja hyväksyy sen. Katso hyväksyntäprosessi artikkelista [Kalenterin hyväksynnät](./approvals.md).
:::

:::tip
Kalenteri korostaa mahdolliset päällekkäisyydet ennen tallentamista. Jos näet päällekkäisyysvaroituksen, muuta aikoja tai valitse toinen huone.
:::

## Aiheeseen liittyvät artikkelit

- [Huoneet, resurssit ja ajoitus](./rooms-resources.md) — varattavien tilojen ja laitteiden määrittäminen
- [Kalenterin hyväksynnät](./approvals.md) — varauspyyntöjen hyväksyminen tai hylkääminen
- [Kalenterien luominen](./creating-calendars.md) — tapahtumakalenterien hallinta
