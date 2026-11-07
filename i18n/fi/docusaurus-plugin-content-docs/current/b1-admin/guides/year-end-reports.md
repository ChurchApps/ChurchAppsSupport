---
title: "Guide: Luo vuosiraportit lahjoituksista"
description: "Viimeistele B1 Adminissa vuoden lahjoituskirjaukset, tarkista rahastojen verotusasetukset ja luo kaikille lahjoittajille verovähennyskelpoiset lahjoitustodistukset."
---

# Luo vuosiraportit lahjoituksista

<div class="article-intro">

Käy läpi vuoden lopun prosessi: lahjoitustietojen viimeistely, rahastoasetusten tarkistus ja verokelpoisten lahjoitustodistusten luonti jokaiselle lahjoittajalle. Tämä tehdään yleensä tammikuun alussa edelliselle kalenterivuodelle.

</div>

<div class="prereqs">
<h4>Ennen aloittamista</h4>

- B1 Admin -tili, jolla on taloushallinnon käyttöoikeudet
- Lahjoitukset kirjattu koko vuoden ajan (verkossa Stripen kautta ja/tai manuaalisesti)
- Pääsy Stripe-tiliisi, jos hyväksyt verkkolahjoituksia

</div>

## Vaihe 1: Tuo Stripe-tapahtumat lopullisina

Varmista, että kaikki vuoden lopun verkkolahjoitukset ovat järjestelmässäsi.

Seuraa [Stripe-tuonnin](../donations/stripe-import.md) ohjeita:

1. Siirry kohtaan Lahjoitukset > Stripe-tuonti
2. Valitse vuoden lopun kattava aikaväli (esim. 1.12.–31.12.)
3. Napsauta ensin Esikatselu tarkistaaksesi tiedot ja sen jälkeen Tuo puuttuvat viimeistelläksesi tuonnin

:::warning
Suorita tämä tuonti ennen lahjoitustodistusten luontia. Kaikki tuomatta jääneet tapahtumat puuttuvat lahjoittajien todistuksilta.
:::

## Vaihe 2: Tarkista lahjoitusraportit

Varmista, että tietosi ovat oikein ennen todistusten luontia.

Seuraa [Lahjoitusraporttien](../donations/donation-reports.md) ohjeita:

1. Tarkista koko vuoden lahjoitusyhteenveto
2. Vertaa rahastokohtaisia summia pankkitiliotteisiin ja selvitä mahdolliset poikkeamat
3. Tarvittaessa avaa yksittäiset erät ja tarkista lahjoittajakohtaiset tiedot

## Vaihe 3: Tarkista rahaston verotuksellinen asema

Varmista, että jokaisen rahaston verokelpoisuusasetus on oikein, jotta todistukset ovat tarkkoja.

Seuraa [Rahastojen](../donations/funds.md) ohjeita:

1. Avaa jokainen rahasto ja varmista, että verokelpoisuusasetus on oikein

:::info
Lahjoitustodistuksille sisältyvät vain verokelpoisiksi merkityille rahastoille tehdyt lahjoitukset. Jos rahaston pitäisi olla verokelpoinen mutta sitä ei ole merkitty sellaiseksi, päivitä se ennen todistusten luontia.
:::

## Vaihe 4: Luo lahjoitustodistukset

Luo lahjoittajillesi viralliset lahjoitustodistukset.

Seuraa [Lahjoitustodistusten](../donations/giving-statements.md) ohjeita:

1. Siirry kohtaan **Lahjoitukset > Lahjoitustodistukset**
2. Valitse vuosi pudotusvalikosta ja tarkista yhteenvetotiedot
3. Valitse latausmenetelmä:
   - **Lataa ZIP** — yksittäiset CSV-tiedostot, yksi lahjoittajaa kohden
   - **Tulosta kaikki** — tulostettava näkymä, jossa jokainen todistus on omalla sivullaan ja kirkkosi logo yläreunassa (jos olet ladannut sellaisen)

:::tip
Luo todistukset tammikuun alussa, kun tiedot ovat vielä tuoreita. Näin ehdit korjata mahdolliset ongelmat ennen postitusta.
:::

## Vaihe 5: Jaa lahjoittajille

Varmista, että todistukset päätyvät lahjoittajille.

1. Tulosta ja postita todistukset tai lähetä yksittäiset CSV-tiedostot lahjoittajille sähköpostitse
2. Jäsenet voivat myös tarkastella omaa lahjoitushistoriaansa ja tulostaa todistuksia kohdassa [B1.church](../../b1-church/giving/donation-history.md) sekä [B1 Mobile -sovelluksessa](../../b1-church/giving/donation-history.md)

## Valmista tuli!

Vuoden lahjoitusraporttisi ovat valmiit. Lahjoittajillasi on verokelpoiset todistukset, ja kirjanpitosi vuodelta on viimeistelty.

## Liittyvät artikkelit

- [Stripe-tuonti](../donations/stripe-import.md) — tuo verkkotapahtumat
- [Lahjoitusraportit](../donations/donation-reports.md) — tarkastele lahjoitustrendejä ja summia
- [Rahastot](../donations/funds.md) — hallinnoi rahastoja ja verokelpoisuusasetuksia
- [Lahjoitustodistukset](../donations/giving-statements.md) — luo vuoden lopun todistukset
- [Lahjoitusten kirjaaminen](../donations/recording-donations.md) — kirjaa käteis- ja shekkilahjoitukset manuaalisesti
- [Lahjoitushistoria (verkko)](../../b1-church/giving/donation-history.md) — jäsenten itsepalvelunäkymä
- [Verkkolahjoitusten käyttöönotto -opas](./online-giving.md) — Stripen ja lahjoitusten alustava määritys
