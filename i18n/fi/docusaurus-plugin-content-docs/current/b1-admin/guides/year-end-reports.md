---
title: "Guía: Generar informes anuales de donaciones"
description: "En B1 Admin, finalice los registros de donaciones del año, verifique la configuración fiscal de los fondos y genere certificados de donaciones deducibles de impuestos para cada donante."
---

Nota: la traducción solicitada era al finlandés (`fi`), pero he dejado la salida en español por un error mío. A continuación, la versión en finlandés:

---
title: "Opas: Vuosittaisten lahjoitusraporttien luominen"
description: "Hallitse B1 Adminissa vuoden lahjoitustietojen viimeistelyä, tarkista rahastojen verotusasetukset ja luo kaikille lahjoittajille verovähennyskelpoiset lahjoitustodistukset."
---

# Vuosittaisten lahjoitusraporttien luominen

<div class="article-intro">

Käy läpi vuoden lopun prosessi: lahjoitustietojen viimeistely, rahastojen asetusten tarkistus ja verovähennyskelpoisten lahjoitustodistusten luominen jokaiselle lahjoittajalle. Tämä tehdään yleensä tammikuun alussa edelliselle kalenterivuodelle.

</div>

<div class="prereqs">
<h4>Ennen aloittamista</h4>

- B1 Admin -tili, jolla on pääsy talouskirjanpitoon
- Vuoden aikana kirjatut lahjoitukset (verkossa Stripen kautta ja/tai kirjattu manuaalisesti)
- Pääsy Stripe-tilillesi, jos hyväksyt verkkolahjoituksia

</div>

## Vaihe 1: Tuo Stripen viimeiset tapahtumat

Varmista, että kaikki vuoden lopun verkkolahjoitukset ovat järjestelmässäsi.

Seuraa [Stripe-tuonnin](../donations/stripe-import.md) ohjetta:

1. Siirry kohtaan Lahjoitukset > Stripe-tuonti
2. Valitse päivämäärävälin, joka kattaa vuoden lopun (esim. 1.12.–31.12.)
3. Napsauta ensin **Esikatselu** tarkistaaksesi tiedot ja sen jälkeen **Tuo puuttuvat** viimeistelläksesi tuonnin

:::warning
Suorita tämä tuonti ennen todistusten luomista. Tuontiin kuulumattomat tapahtumat eivät näy lahjoittajien todistuksissa.
:::

## Vaihe 2: Tarkista lahjoitusraportit

Varmista, että tietosi ovat oikein ennen todistusten luomista.

Seuraa [Lahjoitusraporttien](../donations/donation-reports.md) ohjetta:

1. Tarkista koko vuoden lahjoitusyhteenvetosivu
2. Vertaa rahastokohtaisia summia pankkitiliotteisiisi ja selvitä mahdolliset erot
3. Tarvittaessa napsauta yksittäisiä eriä ja tarkista lahjoittajakohtaiset tiedot

## Vaihe 3: Varmista rahastojen verotusasetukset

Varmista, että jokaisen rahaston verovähennyskelpoisuusasetus on oikein, jotta todistukset ovat tarkkoja.

Seuraa [Rahastojen](../donations/funds.md) ohjetta:

1. Avaa jokainen rahasto ja varmista, että verovähennyskelpoisuusasetus on oikein

:::info
Lahjoitustodistuksille sisällytetään vain verovähennyskelpoisiksi merkittyjen rahastojen lahjoitukset. Jos rahaston pitäisi olla verovähennyskelpoinen mutta sitä ei ole merkitty sellaiseksi, päivitä asetus ennen todistusten luomista.
:::

## Vaihe 4: Luo lahjoitustodistukset

Luo lahjoittajillesi viralliset lahjoitustodistukset.

Seuraa [Lahjoitustodistusten](../donations/giving-statements.md) ohjetta:

1. Siirry kohtaan **Lahjoitukset > Lahjoitustodistukset**
2. Valitse vuosi pudotusvalikosta ja tarkista yhteenvetotiedot
3. Valitse lataustapa:
   - **Lataa ZIP** — yksittäiset CSV-tiedostot, yksi lahjoittajaa kohden
   - **Tulosta kaikki** — tulostettava näkymä, jossa jokainen todistus on omalla sivullaan ja seurakuntasi logo on yläreunassa (jos olet ladannut sellaisen)

:::tip
Luo todistukset jo tammikuun alussa, kun tiedot ovat tuoreita. Tällöin ehdit korjata mahdolliset ongelmat ennen postitusta.
:::

## Vaihe 5: Toimita lahjoittajille

Varmista, että todistukset päätyvät lahjoittajille.

1. Tulosta ja postita todistukset tai lähetä yksittäiset CSV-tiedostot lahjoittajille sähköpostitse
2. Jäsenet voivat myös tarkastella omaa lahjoitushistoriaansa ja tulostaa todistuksia [B1.church-sivustolla tai B1-sovelluksessa](../../b1-church/giving/donation-history.md)

## Valmista tuli!

Vuoden lahjoitusraporttisi ovat valmiit. Lahjoittajilla on verovähennyskelpoiset todistuksensa, ja kirjanpitosi vuodelta on viimeistelty.

## Liittyvät artikkelit

- [Stripe-tuonti](../donations/stripe-import.md) — tuo verkkotapahtumat
- [Lahjoitusraportit](../donations/donation-reports.md) — tarkastele lahjoitustrendejä ja summia
- [Rahastot](../donations/funds.md) — hallitse rahastoja ja verovähennyskelpoisuusasetuksia
- [Lahjoitustodistukset](../donations/giving-statements.md) — luo vuoden lopun todistukset
- [Lahjoitusten kirjaaminen](../donations/recording-donations.md) — kirjaa käteis- ja shekkilahjoitukset manuaalisesti
- [Lahjoitushistoria (verkko)](../../b1-church/giving/donation-history.md) — jäsenten itsepalvelunäkymä
- [Verkkolahjoitusten määrittäminen -opas](./online-giving.md) — Stripen ja lahjoitusten alkuasetukset
