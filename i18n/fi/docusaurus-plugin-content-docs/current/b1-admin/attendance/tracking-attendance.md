---
title: "Osallistumisen seuranta"
description: "Tarkastele läsnäolotrendejä, suodata raportteja seurakunnan, palvelun tai ryhmän mukaan ja vie ryhmän läsnäolo Läsnäolo-sivulta B1 Adminissa."
---

# Osallistumisen seuranta

<div class="article-intro">

Kun kampuksesi, jumalanpalvelusajat ja ryhmät on määritetty, B1 Admin tekee osallistumistietojen tarkastelusta ja trendien havaitsemisesta helppoa. Osallistumissivu avautuu tämän viikon osallistumisen yhteenvetoon, ja sen **Kaikki vuodet** -raportit tarjoavat kaksi pääasiallista näkymää: **Osallistumisen kehitys** -välilehden seurakuntakattavia trendejä varten ja **Ryhmäosallistuminen** -välilehden ryhmätason tietoja varten. Näiden työkalujen avulla voit ymmärtää kasvukehityksiä, havaita laskevaa osallisuutta ja tehdä seurakuntasi toimintaa tukevia, dataan perustuvia päätöksiä.

</div>

<div class="prereqs">
<h4>Ennen aloittamista</h4>

- Osallistumisrakenteesi on oltava määritetty vähintään yhdellä kampuksella ja jumalanpalvelusajalla. Katso [Osallistumisen määrittäminen](setup.md), jos et ole vielä tehnyt tätä.
- Osallistumistiedot on kirjattava ennen kuin raportit näyttävät tuloksia. Tiedot voivat tulla [manuaalisesta kirjauksesta](recording-attendance.md) tai [itsepalvelun sisäänkirjautumisesta](check-in.md).

</div>

## Osallistumistrendien tarkastelu

1. Avaa **B1 Admin**, avaa [Hyppyvalikko](../introduction.md#getting-around-with-the-jump-menu) (hakupalkki vasemmassa yläkulmassa), laajenna **Ihmiset** ja klikkaa **Osallistuminen**.
2. Valitse **Kaikki vuodet** vasemmasta sarakkeesta. **Osallistumisen kehitys** -välilehti on oletuksena valittuna.
3. Raportti käynnistyy automaattisesti välilehden avautuessa ja näyttää kokonaisosallistumisen kullekin viikolle.

:::tip
Nopeaa katsausta nykyiseen viikkoon varten pääsivun Osallistuminen näyttää, kuinka monta ihmistä on tällä viikolla huoneessa, erittelyn huoneittain (ryhmittäin), mahdolliset vieraat sekä 13 viikon pylväskaavion sisäänkirjauksista. Raporttia ei tarvita.
:::

## Datan suodattaminen

Käytä **Suodata raportti** -laatikon suodattimia tulosten rajaamiseen ja klikkaa sitten **Suorita raportti**:

- **Kampus** -- valitse kampus nähdäksesi osallistumisen vain siltä paikalta.
- **Jumalanpalvelus** -- rajaa raportti yhteen jumalanpalvelukseen.
- **Jumalanpalvelusaika** -- valitse jumalanpalvelusaika tietyn tilaisuuden tarkasteluun.
- **Ryhmä** -- näytä yhden ryhmän osallistuminen.
- **Alkamispäivä** ja **Päättymispäivä** -- sisällytettävä päivämääräväli. Oletuksena raportti kattaa viimeisen vuoden, vuoden takaa tähän päivään, ja päättymispäivä sisältyy kokonaan.

Raportti näyttää pylväskaavion ja taulukon viikoittaisista kokonaiskäynneistä. Jokainen viikko on merkitty sen viikon sunnuntain päivämäärällä. Taulukossa on myös sarake **Tapaamispäivät**, joka listaa kyseisen viikon todelliset päivät, joina oli osallistumista (esimerkiksi "9/27, 9/30"). Näin näet, milloin keskiviikkotilaisuus lasketaan samaan viikkoon kuin sunnuntai.

:::info
Raportit käynnistyvät automaattisesti aina, kun avaat Osallistumisen kehitys -välilehden, joten näet aina ajantasaiset luvut ilman päivityspainiketta.
:::

## Ryhmäosallistuminen

**Ryhmäosallistuminen** -välilehti näyttää, kuka osallistui kuhunkin ryhmätapaamiseen. Tämä on hyödyllistä, kun haluat seurata tiettyä luokkaa, palvelutiimiä tai pienryhmää sen sijaan, että katsoisit kokonaisten jumalanpalvelusten lukuja.

1. **Kaikki vuodet** -raporteissa valitse **Ryhmäosallistuminen** -välilehti.
2. Valitse halutessasi **Kampus** ja **Jumalanpalvelus**.
3. Aseta **Alkamispäivä** ja **Päättymispäivä**. Oletuksena raportti kattaa edellisen sunnuntain tähän päivään.
4. Klikkaa **Suorita raportti**.

Tulokset ryhmitellään tapaamispäivän mukaan, sitten jumalanpalvelusajan ja ryhmän mukaan, ja kunkin ryhmän alla on listattu osallistuneet henkilöt. Jumalanpalvelusajat, ryhmät ja nimet on lajiteltu aakkosjärjestykseen, jotta kukin otsikko esiintyy kerran. Jokaisen henkilön rivillä näkyy myös sarake **Sisäänkirjautunut**, jossa on aika, jolloin osallistuminen kirjattiin (tyhjä, jos aikaa ei ole tallennettu), ja sarake **Jäsenyyden tila** (esimerkiksi Jäsen tai Vieras), jotta voit tunnistaa vieraat silmäyksellä.

Tietojen lataamiseksi klikkaa **Latausvaihtoehdot** ja valitse **Yhteenveto**. CSV-tiedostossa on yksi rivi per ryhmän jäsen, lajiteltuna ryhmän ja nimen mukaan. Lisäksi on sarake jokaiselle päivätylle tapaamiselle aikavälillä (esimerkiksi "Sunday - 9:00 AM (2026-09-27)"), ja jokainen solu on merkitty **läsnä** tai **poissa**.

:::tip
Ryhmäosallistuminen on erityisen arvokasta [pienryhmien](../groups/creating-groups.md) johtajille, jotka haluavat seurata ryhmänsä osallisuutta ajan kuluessa.
:::

## Vinkkejä osallistumistietojen käyttöön

- Tarkastele trendejä kuukausittain, jotta havaitset kausivaihtelut ajoissa.
- Vertaa kampuskohtaisia tietoja ymmärtääksesi, mitkä sijainnit kasvavat.
- Käytä ryhmätason raportteja seurataksesi [ryhmiä](../groups/group-members.md), joiden osallistuminen laskee.
- Yhdistä osallistumisnäkemykset [AI-haku](../people/ai-search.md) -työkaluun löytääksesi ihmisiä, jotka eivät ole osallistuneet viime aikoina.

## Liittyvät sivut

- [Osallistumisen kirjaaminen](recording-attendance.md) -- kirjaa osallistuminen manuaalisesti ryhmätapaamiseen
- [Kokonaismäärän kirjaus ja kehitys](headcount-entry.md) -- yksinkertaisempi kokonaismäärävaihtoehto omalla viikoittaisella trendikaaviolla
- [Sisäänkirjautuminen](check-in.md) -- ota käyttöön itsepalvelun sisäänkirjautuminen, jotta osallistuminen kirjautuu automaattisesti
