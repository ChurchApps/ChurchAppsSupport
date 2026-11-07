---
title: "Kalenterin hyväksynnät"
---

# Kalenterin hyväksynnät

<div class="article-intro">

Hyväksynnät-sivulla ylläpitäjät tarkastelevat ja käsittelevät odottavat huone- ja resurssivarauspyynnöt sekä kalenteritapahtumat, jotka vaativat hyväksynnän ennen julkaisua.

</div>

<div class="prereqs">
<h4>Ennen aloittamista</h4>

- Määritä huoneille tai resursseille **Hyväksyntäryhmä** kohdassa [Huoneet ja resurssit](rooms-resources)
- Tarvitset **Calendars Admin** -oikeuden tai **content.edit**-oikeuden

</div>

## Hyväksyntöjen avaaminen

Avaa B1 Adminissa [Hyppyvalikko](../introduction.md#getting-around-with-the-jump-menu) (hakupalkki vasemmassa yläkulmassa), laajenna **Kalenterit** ja napsauta **Hyväksynnät**. Tässä näkyvät odottavat varauspyynnöt ja tarkastusta odottavat tapahtumat.

## Varauspyynnöt

Kun ryhmä luo tapahtuman ja pyytää huonetta tai resurssia, pyyntö näkyy osiossa **Huone- ja resurssipyynnöt**. Jokaisella rivillä näkyy:

- Tapahtuman nimi sekä päivämäärä ja kellonaika
- Pyydetty huone tai resurssi (monikäyttöisten resurssien kohdalla myös määrä)
- Tilamerkki, joka kertoo, onko pyynnössä ristiriitoja

### Ristiriitojen merkinnät

Jos pyyntö menee päällekkäin toisen varauksen tai estoajan kanssa samalle huoneelle tai resurssille, pyynnön tilassa näkyy **Ristiriitoja**-merkki. Vie hiiri merkin päälle nähdäksesi tiedot. Pyynnöt ilman päällekkäisyyksiä näyttävät **Ei ristiriitoja**. Tarkista ristiriitaiset pyynnöt huolellisesti ennen kummankaan hyväksymistä.

### Hyväksyminen tai hylkääminen

Napsauta minkä tahansa varauspyynnön kohdalla **Hyväksy** tai **Hylkää** (hylkäämisessä järjestelmä pyytää ensin vahvistusta). Pyynnön tehnyttä ryhmää ilmoitetaan päätöksestä. Hyväksytyt varaukset lukitaan kyseiseen huoneeseen tai resurssiin tapahtuman ajaksi. Hylätyt varaukset vapauttavat paikan muille.

Kun napsautat **Hyväksy**, avautuu **Hyväksy varaus** -ikkuna, jossa voit julkaista tapahtuman samalla kertaa:

1. Valitse **Julkaise julkiselle kalenterille**, jos haluat tehdä tapahtumasta julkisen ryhmänsä kalenterissa. Jos jätät valinnan pois, varaus hyväksytään muuttamatta tapahtuman näkyvyyttä.
2. Kun **Julkaise julkiselle kalenterille** on valittu, voit halutessasi valita **Lisää myös kalenteriin** -valikosta kuratoidun kalenterin ja lisätä tapahtuman myös [kuratoituun kalenteriin](curated-calendar). Jätä arvoksi **Ei mitään**, jos et halua lisätä. (Tämä vaihtoehto näkyy vain, jos sinulla on **content.edit**-oikeus.)
3. Napsauta **Hyväksy**.

## Odottavat tapahtumat

Jos kalenterisi työnkulkuun kuuluu tapahtumien hyväksyminen ennen kuin ne näkyvät yleisölle, odottavat tapahtumat näkyvät osiossa **Tapahtumapyynnöt**. Napsauta **Hyväksy** julkaistaksesi tapahtuman kalenteriin tai **Hylkää** ilmoittaaksesi lähettäjälle, että muutoksia tarvitaan.

:::tip
Jos haluat vaatia hyväksynnän tietylle huoneelle, määritä sille hyväksyntäryhmä kohdassa [Huoneet ja resurssit](rooms-resources). Oikeudet omaavat ryhmät voivat sitten pyytää huonetta tapahtumia luodessaan, ja nämä pyynnöt siirtyvät tälle sivulle.
:::

## Liittyvät artikkelit

- [Huoneet, resurssit ja ajoitus](rooms-resources) — määritä varattavat huoneet ja resurssit
- [Kalenterien luominen](creating-calendars) — hallitse kalentereita ja tapahtumia
