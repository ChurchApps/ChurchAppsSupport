---
title: "Asennus"
description: "Valitse paikallinen kehityspolku ChurchAppsin projekteille: etutyö jaettuihin demo-API:ihin tai koko pino paikallisesti MySQL:llä backend-muutoksiin."
---

# Asennus

<div class="article-intro">

Tämä osio opastaa sinut paikallisen kehitysympäristön pystyttämisessä ChurchAppsin projekteille. Voit joko osoittaa frontendisi jaettuihin demo-rajapintoihin nopeaa kehitystä varten tai ajaa koko pinon paikallisesti backend-työtä varten.

</div>

## Kaksi lähestymistapaa

Paikallista kehitystä voi tehdä kahdella tavalla, riippuen siitä, kuinka suuren osan pinosta tarvitset:

### 1. Käytä demo-rajapintoja (helpoin tapa)

Jos työskentelet **frontend-projektin** parissa (verkkosovellus, mobiilisovellus tai työpöytäsovellus), nopein tapa on osoittaa paikallinen sovelluksesi jaettuihin demo-rajapintoihin. Tietokantaa tai backendin asennusta ei tarvita.

Demo-rajapinnan perus-URL on:

```
https://api.demo.churchapps.org
```

Jokainen API-moduuli on saatavilla tämän perusosoitteen alla olevalla polulla, esimerkiksi:

```
https://api.demo.churchapps.org/membership
https://api.demo.churchapps.org/attendance
https://api.demo.churchapps.org/giving
```

Demoympäristö ajaa `main`-haaran uusimman koodin, ja sen esimerkkidata luodaan uudelleen joka yö, joten älä odota, että mitään luomasi säilyy siellä. (Aiempi staging-ympäristö, `api.staging.churchapps.org`, on lopetettu. Jotkin esimerkki-`.env`-tiedostot saattavat yhä listata staging-URL-osoitteita -- korvaa ne demo- tai paikallisilla URL-osoitteilla.)

:::tip
Tämän lähestymistavan avulla voit aloittaa frontend-muutokset minuuteissa. Se on suositeltu tapa useimmille kontribuoijille.
:::

### 2. Aja kaikki paikallisesti

Jos sinun täytyy muokata API-koodia tai työskennellä offline-tilassa, voit ajaa koko pinon paikallisesti. Tämä vaatii MySQL 8.0+:n ja lisäasetuksia. Katso yksityiskohtaiset ohjeet oppaasta [API:n paikallinen asennus](../api/local-setup.md).

## Aloittaminen

Seuraa näitä sivuja järjestyksessä:

1. **[Esivaatimukset](./prerequisites.md)** -- Asenna tarvittavat työkalut (Node.js, Git, MySQL jne.)
2. **[Projektin yleiskatsaus](./project-overview.md)** -- Ymmärrä, mitä projekteja on olemassa ja mitä ne tekevät
3. **[Ympäristömuuttujat](./environment-variables.md)** -- Määritä `.env`-tiedostosi, jotta kaikki yhdistyy toisiinsa

:::info
Jokainen ChurchApps-projekti on itsenäinen Git-repositorio. Sinun tarvitsee kloonata vain ne projektit, joita haluat kehittää.
:::
