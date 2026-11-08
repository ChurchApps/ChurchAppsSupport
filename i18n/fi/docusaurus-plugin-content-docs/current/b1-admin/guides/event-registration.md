---
title: "Opas: Tapahtumailmoittautumisen määrittäminen"
description: "Määritä tapahtumailmoittautumislomake B1 Adminissa, kerää osallistujien tiedot ja valinnaiset maksut, upota lomake seurakuntasi verkkosivustolle ja seuraa ilmoittautumisia."
---

# Tapahtumailmoittautumisen määrittäminen

<div class="article-intro">

Luo tapahtumailmoittautumislomake, kerää osallistujien tiedot ja valinnaiset maksut, upota lomake seurakuntasi verkkosivustolle ja hallitse saapuvia ilmoittautumisia. Lopuksi sinulla on jaettava ilmoittautumissivu mihin tahansa seurakunnan tapahtumaan.

</div>

:::info
**Kaksi tapaa hoitaa tapahtumailmoittautuminen:** Tämä opas käsittelee **lomakepohjaista ilmoittautumista**, joka antaa sinulle täyden hallinnan mukautettuihin kenttiin ja maksujen keräämiseen. Yksinkertaisempiin tapahtumiin, joissa tarvitset vain tiedon siitä, kuka on tulossa, käytä kalenteriin sisäänrakennettua **natiivia tapahtumailmoittautumista** -- katso asennusohjeet kohdasta [Kalentereiden luominen](../calendars/creating-calendars.md#enabling-event-registration). Natiivi ilmoittautuminen mahdollistaa jäsenten ilmoittautumisen suoraan sivustolta [B1.church tai B1 App](../../b1-church/events/registering.md), ja siinä ovat käytössä osallistujamäärän seuranta, päivämääräikkunat ja sähköpostivahvistukset.
:::

<div class="prereqs">
<h4>Ennen aloittamista</h4>

- B1 Admin -tili, jolla on ylläpitäjän käyttöoikeudet
- Maksujen keräämistä varten: [Stripe on ensin määritettava](../donations/online-giving-setup.md)

</div>

## Vaihe 1: Luo itsenäinen lomake

Itsenäisillä lomakkeilla on oma julkinen URL-osoite, jonka kuka tahansa voi avata. Tämä sopii täydellisesti tapahtumailmoittautumiseen.

Seuraa [Lomakkeiden luominen](../forms/creating-forms.md)-opasta ja tee seuraavaa:

1. Siirry kohtaan Lomakkeet ja valitse Lisää lomake
2. Valitse tyypiksi "Stand Alone" -- tämä antaa lomakkeelle oman julkisen URL-osoitteen
3. Nimeä lomake tapahtuman mukaan (esim. "Miesten retriitti -ilmoittautuminen", "VBS-ilmoittautuminen")

## Vaihe 2: Lisää kysymyksiä

Rakenna kentät, jotka haluat kerätä ilmoittautujilta.

Lisää kysymykset seuraamalla [Lomakkeiden luominen](../forms/creating-forms.md#adding-questions)-opasta:

1. Siirry Kysymykset-välilehdelle ja lisää kentät tarvitsemillesi tiedoille: nimi, sähköposti, puhelinnumero, ruokavaliorajoitukset, T-paidan koko, hätäyhteystieto jne.
2. Käytä monivalintaa vaihtoehdoille, kuten ateriatoiveille tai istuntovalinnoille

:::warning
Maksukenttätyyppi edellyttää, että Stripe on määritetty. Jos et ole vielä ottanut verkkolahjoituksia käyttöön, katso [Verkkolahjoitusten määrittäminen](../donations/online-giving-setup.md) ennen maksukenttien lisäämistä.
:::

## Vaihe 3: Määritä lomakkeen asetukset

Hallitse, milloin ja miten ilmoittautumislomake on saatavilla.

1. Aseta saatavuuspäivämäärät, jos ilmoittautuminen on avoinna vain rajoitetun ajan
2. Kopioi julkinen URL-osoite -- voit jakaa sen suoraan
3. Lisää lomakkeen jäseniksi henkilöitä, joilla on Ylläpitäjä- tai Vain katselu -rooli, jotta he voivat auttaa vastausten hallinnassa

## Vaihe 4: Upota verkkosivustollesi

Varmista, että ilmoittautumislomake löytyy helposti, lisäämällä se seurakuntasi verkkosivustolle.

Seuraa [Sivujen hallinta](../website/managing-pages.md)-opasta ja tee seuraavaa:

1. Lisää B1-verkkosivuston editorissa sivulle uusi osio ja valitse Lomake-elementti
2. Valitse ilmoittautumislomakkeesi listasta

:::tip
Jaa itsenäinen URL-osoite myös sähköpostitse, sosiaalisessa mediassa ja seurakunnan tiedotteissa. Mitä useammassa paikassa lomake näkyy, sitä enemmän ilmoittautumisia saat.
:::

## Vaihe 5: Hallitse vastauksia

Seuraa ilmoittautumisia niiden saapuessa ja vie tiedot tarvittaessa ulos.

Seuraa [Vastausten hallinta](../forms/managing-submissions.md)-opasta ja tee seuraavaa:

1. Tarkista vastaukset niiden saapuessa Vastaukset-välilehdeltä
2. Vie tiedot CSV-muotoon laskentataulukoita, osallistujamäärän seurantaa tai tapahtumavastaavien kanssa jakamista varten

## Valmista tuli!

Tapahtumasi ilmoittautuminen on käynnissä. Jaa linkki, upota se verkkosivustollesi ja seuraa ilmoittautumisia B1 Administa. Kun tapahtuma on ohi, vie lopullinen lista talteen kirjanpitoasi varten.

## Liittyvät artikkelit

- [Lomakkeiden luominen](../forms/creating-forms.md) -- luo lomakkeita eri kenttätyypeillä
- [Vastausten hallinta](../forms/managing-submissions.md) -- tarkastele ja vie lomakevastaukset
- [Sivujen hallinta](../website/managing-pages.md) -- upota lomakkeita verkkosivustollesi
- [Verkkolahjoitusten määrittäminen](../donations/online-giving-setup.md) -- vaaditaan maksukentille
