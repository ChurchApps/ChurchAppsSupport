---
title: "Tilihistoria"
---

# Tilihistoria

<div class="article-intro">

Tilihistoria kirjaa kaikki merkittävät toiminnot ja muutokset kirkonhallintajärjestelmässäsi. Sen avulla voit tarkastella kirjautumistapahtumia, seurata, kuka on tehnyt muutoksia henkilötietoihin, valvoa käyttöoikeuksien päivityksiä ja pitää tiimisi vastuullisuuden ajan tasalla.

</div>

<div class="prereqs">
<h4>Ennen aloittamista</h4>

- B1 Admin -tili, jolla on palvelinjärjestelmänvalvojan käyttöoikeudet
- Siirry kohtaan **Asetukset** löytääksesi tilihistorian

</div>

## Tilihistorian tarkastelu

1. Avaa [Hyppyvalikko](../introduction.md#getting-around-with-the-jump-menu) (hakupalkki B1 Adminin vasemmassa yläkulmassa) ja laajenna kohta **Asetukset**.
2. Napsauta **Tilihistoria**.
3. Loki näyttää viimeisimmät merkinnät taulukossa, jossa on seuraavat sarakkeet:
   - **Päivämäärä** -- Milloin toiminto tapahtui.
   - **Luokka** -- Toiminnon tyyppi (värikoodattu nopeaa silmäilyä varten).
   - **Toiminto** -- Mitä tehtiin (esim. create, update, delete, login_success).
   - **Kohde** -- Tietueen tyyppi ja tunnus, johon toiminto vaikutti.
   - **IP-osoite** -- Toiminnon suorittaneen käyttäjän IP-osoite.
   - **Tiedot** -- Yhteenveto tehdyistä erityisistä muutoksista.

## Lokin suodattaminen

Rajaa tuloksia sivun yläosan suodattimilla:

- **Luokka** -- Suodata toiminnon tyypin mukaan:
  - **Kaikki luokat** -- Näytä kaikki.
  - **Kirjautuminen** -- Onnistuneet ja epäonnistuneet kirjautumiset.
  - **Henkilöt** -- Henkilötietueiden luominen, päivittäminen tai poistaminen.
  - **Käyttöoikeudet** -- Käyttöoikeuksien myöntäminen ja peruuttaminen.
  - **Lahjoitukset** -- Lahjoitustietueiden muutokset.
  - **Ryhmät** -- Ryhmien hallintatoiminnot.
  - **Lomakkeet** -- Lomakkeiden lähetystoiminta.
  - **Asetukset** -- Määritysmuutokset.
- **Alkupäivä** -- Näytä tämän päivän jälkeiset merkinnät.
- **Loppupäivä** -- Näytä tähän päivään asti tehdyt merkinnät.

Päivitä tulokset napsauttamalla **Hae**-painiketta, kun olet asettanut suodattimet.

## Luokkien ymmärtäminen

Jokainen luokka on värikoodattu, jotta sen tunnistaa nopeasti:

- **Kirjautuminen** -- Sininen merkki. Kirjaa onnistuneet ja epäonnistuneet kirjautumisyritykset.
- **Henkilöt** -- Violetti merkki. Kirjaa henkilötietueiden luomiset, päivitykset ja poistot.
- **Käyttöoikeudet** -- Punainen merkki. Kirjaa, milloin käyttöoikeuksia myönnetään tai peruutetaan.
- **Lahjoitukset** -- Vihreä merkki. Kirjaa lahjoitustietueiden muutokset.
- **Ryhmät** -- Harmaa merkki. Kirjaa ryhmien hallintatoiminnot.
- **Lomakkeet** -- Oranssi merkki. Kirjaa lomakkeiden lähetystoiminnan.
- **Asetukset** -- Keltainen merkki. Kirjaa määritysmuutokset.

## Lokin vieminen

Kun lokimerkinnät näkyvät, sivulle ilmestyy **CSV-lataus**-painike. Napsauta sitä viedäksesi nykyiset suodatetut tulokset taulukkolaskentaohjelmaan offline-tarkastelua tai kirjanpitoa varten.

## Sivutus

Siirry tulosten välillä taulukon alareunan sivutuspainikkeilla. Voit näyttää 25, 50 tai 100 merkintää sivulla.

:::info
Tilihistorian merkinnät säilytetään automaattisesti yhden vuoden ajan. Yli 365 päivää vanhat merkinnät poistetaan, jotta järjestelmä pysyy suorituskykyisenä.
:::

:::tip
Tarkastele tilihistoriaa säännöllisesti, erityisesti uusien tiimin jäsenten perehdytyksen jälkeen tai merkittävien asetusmuutosten yhteydessä. Se auttaa havaitsemaan odottamattoman toiminnan ajoissa.
:::

## Aiheeseen liittyvät artikkelit

- [Roolit ja käyttöoikeudet](../settings/roles-permissions) -- Hallitse, kenellä on pääsy mihinkin
- [Tietoturva](../settings/data-security) -- Tutustu siihen, miten tietojasi suojataan
- [Raporttien yleiskatsaus](./index.md) -- Katso kaikki käytettävissä olevat raportit
