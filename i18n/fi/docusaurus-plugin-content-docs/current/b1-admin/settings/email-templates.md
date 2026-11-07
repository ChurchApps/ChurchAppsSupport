---
title: "Sähköpostipohjat"
---

# Sähköpostipohjat

<div class="article-intro">

Sähköpostipohjien avulla voit tallentaa uudelleenkäytettävää sähköpostisisältöä, kuten tervetulotoivotuksen, tapahtumamuistutuksen tai lahjoitusten kiitosviestin. Näin voit (tai [työnkulku](../serving/workflows.md)) lähettää sen yhdellä napsautuksella kirjoittamatta sitä joka kerta alusta alkaen. Samassa luettelossa ovat myös tekstiviestipohjat, joita käytetään ryhmä- ja henkilökohtaisissa tekstiviestiikkunoissa.

</div>

<div class="prereqs">
<h4>Ennen aloittamista</h4>

- Tarvitset pääsyn B1 Adminin Asetukset-osioon.

</div>

## Sähköpostipohjien avaaminen

1. Avaa B1 Adminissa [Hyppyvalikko](../introduction.md#getting-around-with-the-jump-menu) (hakupalkki vasemmassa yläkulmassa) ja laajenna kohta **Asetukset**.
2. Napsauta **Sähköpostipohjat**.
3. Näet luettelon olemassa olevista pohjista, niiden aiheen, kategorian ja viimeisimmän muokkauspäivän kanssa.

## Pohjan luominen

1. Napsauta **Uusi pohja**.
2. Anna **Pohjan nimi**, jolla tunnistat sen luettelossa, ja valitse **Kategoria** (Yleinen, Tapahtumat, Ryhmät, Lahjoitukset, Tervetuloa tai Teksti), joka auttaa järjestämään pohjat. Valitse **Teksti**, jos haluat luoda tekstiviestipohjan (katso alla [Tekstiviestipohjat](#text-templates)).
3. Kirjoita **Aihe**-rivi.
4. Kirjoita **Sisältö** muokkaimella, joka tukee muotoiltua tekstiä.
5. Napsauta **Tallenna**.

## Yhdistämiskentät

Lisää yhdistämiskenttä napsauttamalla Aihe- tai Sisältö-kentän yläpuolella olevaa kenttäpainiketta. Napsauta ensin tekstikenttää kohtaan, johon haluat kentän, ja napsauta sitten painiketta. Kohdistin pysyy paikallaan, joten voit jatkaa kirjoittamista heti lisätyn kentän jälkeen. Jos napsautat sisällön painiketta ilman, että olet ensin napsauttanut sisällön tekstikenttää, kenttä lisätään sisällön loppuun. Kun sähköposti lähetetään, kukin yhdistämiskenttä korvataan vastaanottajan todellisilla tiedoilla:

- `{{firstName}}`, `{{lastName}}`, `{{displayName}}` -- Vastaanottajan nimi
- `{{email}}` -- Vastaanottajan sähköpostiosoite
- `{{churchName}}` -- Seurakuntasi nimi

## Tekstiviestipohjat

Kategorian **Teksti** pohja on tavallinen tekstiviesti eikä sähköposti:

- Sillä ei ole aihetta. Muokkain korvataan **Tekstiviesti**-ruudulla, joka on pelkkää tekstiä ja johon mahtuu enintään 1 600 merkkiä.
- Ruudun yläpuolella olevat yhdistämiskenttäpainikkeet lisäävät kohdistimen kohtaan kentät `{{firstName}}`, `{{lastName}}`, `{{displayName}}`, `{{email}}` tai `{{churchName}}`.
- Tekstiviestipohjat näkyvät [ryhmän](../groups/group-members.md#texting-group-members) tai yksittäisen henkilön Teksti-ikkunan **Lataa pohja (valinnainen)** -valitsimessa. Valinta täyttää viestin, ja voit silti muokata sitä ennen lähettämistä.
- Ne eivät näy sähköpostipohjien valitsimissa, mukaan lukien työnkulun **Lähetä sähköposti** -toiminto.

Tekstiviestien lähettäminen edellyttää yhdistettyä [tekstiviestipalvelua](./church-settings.md#texting).

## Pohjan esikatselu

Napsauta **Esikatselu** nähdäksesi, miltä aihe ja sisältö näyttävät, kun yhdistämiskentät on täytetty esimerkkitiedoilla. Voit tehdä tämän ennen tallentamista tai lähettämistä.

## Pohjan käyttäminen

Tallennettuja pohjia voi valita, kun laadit sähköpostia henkilöille tai ryhmälle, ja ne ovat käytettävissä toimintona [Työnkulkuissa](../serving/workflows.md). Ennen kuin seurakuntasi voi lähettää niitä, ChurchAppsin tiimin on hyväksyttävä ryhmäsähköpostin käyttö kerran. Katso [Ryhmäsähköpostin käyttöönotto seurakunnallesi](../groups/group-members.md#turning-on-group-email-for-your-church).

## Muokkaaminen ja poistaminen

Päivitä pohja napsauttamalla sen vieressä olevaa **Muokkaa**-kuvaketta tai poista se pysyvästi **Poista**-kuvakkeella.

## Seuraavat vaiheet

- [Työnkulut](../serving/workflows.md) -- Käynnistä pohjan mukainen sähköposti automaattisesti sääntöjen perusteella
