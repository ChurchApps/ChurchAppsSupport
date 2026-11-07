---
title: "Opas: Tapahtumailmoittautumisen määrittäminen"
description: "Määritä B1 Adminissa tapahtumailmoittautumislomake osallistujatietojen ja maksujen keräämiseen, upota se verkkosivulle ja seuraa ilmoittautumisia."
---

# Tapahtumailmoittautumisen määrittäminen

<div class="article-intro">

Luo tapahtumailmoittautumislomake, kerää osallistujien tiedot ja valinnaiset maksut, upota se seurakuntasi verkkosivustolle ja hallitse saapuvia ilmoittautumisia. Lopuksi sinulla on jaettava ilmoittautumissivu mihin tahansa seurakunnan tapahtumaan.

</div>

:::info
**Kaksi tapaa hoitaa tapahtumailmoittautumista:** Tämä opas käsittelee **lomakepohjaista ilmoittautumista**, jonka avulla hallitset täysin mukautettuja kenttiä ja maksujen keräämistä. Yksinkertaisempiin tapahtumiin, joissa tarvitset vain tiedon siitä, kuka on tulossa, käytä kalenteriin sisäänrakennettua **natiivia tapahtumailmoittautumista** -- katso asennusohjeet kohdasta [Kalenterien luominen](../calendars/creating-calendars.md#enabling-event-registration). Natiivi ilmoittautuminen mahdollistaa jäsenten ilmoittautumisen suoraan [B1-verkkosivustolta](../../b1-church/events/registering.md) ja [mobiilisovelluksesta](../../b1-mobile/events/registering.md) kapasiteetin seurannalla, päivämääräikkunoilla ja sähköpostivahvistuksilla.
:::

<div class="prereqs">
<h4>Ennen aloittamista</h4>

- B1 Admin -tili, jolla on ylläpitäjän oikeudet
- Maksujen keräämiseksi [Stripe on ensin määritettävä](../donations/online-giving-setup.md)

</div>

## Vaihe 1: Luo itsenäinen lomake

Itsenäisillä lomakkeilla on oma julkinen URL-osoite, johon kuka tahansa pääsee käsiksi – täydellinen tapahtumailmoittautumiseen.

Noudata oppaan [Lomakkeiden luominen](../forms/creating-forms.md) ohjeita:

1. Siirry Lomakkeisiin-osioon ja napsauta Lisää lomake
2. Valitse tyypiksi ”Stand Alone” – tämä antaa lomakkeellesi oman julkisen URL-osoitteen
3. Nimeä lomake tapahtuman mukaan (esim. ”Miesten retriitin ilmoittautuminen”, ”VBS-ilmoittautuminen”)

## Vaihe 2: Lisää kysymyksiä

Rakenna kentät, joilla kerätään ilmoittautujilta tarvittavat tiedot.

Lisää kysymykset noudattamalla oppaan [Lomakkeiden luominen](../forms/creating-forms.md#adding-questions) ohjeita:

1. Siirry Kysymykset-välilehdelle ja lisää kentät tarvitsemillesi tiedoille: nimi, sähköposti, puhelin, ruokavaliorajoitukset, T-paidan koko, hätäyhteystieto jne.
2. Käytä monivalintaa vaihtoehdoille, kuten ateriatoiveille tai istuntovalinnoille

:::warning
Maksukenttätyyppi edellyttää, että Stripe on määritetty. Jos et ole vielä ottanut käyttöön verkkolahjoituksia, katso ohjeet kohdasta [Verkkolahjoitusten määrittäminen](../donations/online-giving-setup.md) ennen maksukenttien lisäämistä.
:::

## Vaihe 3: Määritä lomakkeen asetukset

Hallitse, milloin ja miten ilmoittautumislomake on saatavilla.

1. Aseta saatavuuspäivämäärät, jos ilmoittautumisen tulisi olla auki vain rajallisen ajan
2. Kopioi julkinen URL-osoite – voit jakaa sen suoraan
3. Lisää lomakkeen jäseniksi henkilöitä, joilla on Admin- tai View Only -rooli, auttamaan vastausten hallinnassa

## Vaihe 4: Upota verkkosivustollesi

Tee ilmoittautumislomakkeesta helposti löydettävä lisäämällä se seurakuntasi verkkosivustolle.

Noudata oppaan [Sivujen hallinta](../website/managing-pages.md) ohjeita:

1. Lisää B1-verkkosivuston editorissa sivulle uusi osio ja valitse Lomake-elementti
2. Valitse ilmoittautumislomake luettelosta

:::tip
Jaa itsenäinen URL-osoite myös sähköpostitse, sosiaalisessa mediassa ja seurakunnan tiedotteissa – mitä useampaan paikkaan se näkyy, sitä enemmän ilmoittautumisia saat.
:::

## Vaihe 5: Hallitse vastauksia

Seuraa ilmoittautumisia niiden saapuessa ja vie tiedot tarvittaessa.

Noudata oppaan [Lomakevastausten hallinta](../forms/managing-submissions.md) ohjeita:

1. Tarkista vastaukset niiden saapuessa Vastaukset-välilehdeltä
2. Vie tiedot CSV-muodossa laskentataulukoihin, osallistujamäärien seurantaan tai jaettavaksi tapahtumakoordinaattoreille

## Valmista!

Tapahtumailmoittautumisesi on käynnissä. Jaa linkki, upota se verkkosivustollesi ja seuraa ilmoittautumisia B1 Administa. Kun tapahtuma on ohi, vie lopullinen lista arkistoasi varten.

## Aiheeseen liittyvät artikkelit

- [Lomakkeiden luominen](../forms/creating-forms.md) — rakenna lomakkeita eri kenttätyypeillä
- [Lomakevastausten hallinta](../forms/managing-submissions.md) — tarkista ja vie lomakevastaukset
- [Sivujen hallinta](../website/managing-pages.md) — upota lomakkeita verkkosivustollesi
- [Verkkolahjoitusten määrittäminen](../donations/online-giving-setup.md) — vaaditaan maksukenttiin
