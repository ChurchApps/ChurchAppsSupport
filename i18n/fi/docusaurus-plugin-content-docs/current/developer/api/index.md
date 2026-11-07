---
title: "API"
---

# API

<div class="article-intro">

ChurchApps-API on **modulaarinen monoliitti**, eli yksi koodikanta, joka palvelee kuutta tietomoduulia, joista jokaisella on oma tietokantansa. Tämä arkkitehtuuri tuo mikropalveluiden organisatorisia hyötyjä (selkeät rajat, itsenäiset tietovarastot) yhden käyttöönoton operatiivisella yksinkertaisuudella.

</div>

## Moduulit

| Moduuli | Tarkoitus |
|--------|---------|
| **Membership** | Henkilöt, ryhmät, taloudet, käyttöoikeudet |
| **Attendance** | Jumalanpalvelukset, istunnot, sisäänkirjautumistiedot |
| **Content** | Sivut, osiot, elementit, suoratoisto |
| **Giving** | Lahjoitukset, rahastot, maksujen käsittely |
| **Messaging** | Keskustelut, ilmoitukset, sähköposti |
| **Doing** | Tehtävät, suunnitelmat, tehtävänjaot |

## Teknologiapino

- **Ajoympäristö:** Node.js 24.x ja TypeScript (ES-moduulit)
- **Kehys:** Express
- **Riippuvuuksien injektointi:** Inversify (reititys koristeiden avulla)
- **Tietokanta:** MySQL -- yksi tietokanta moduulia kohden, kullakin oma yhteysallas
- **Todennus:** JWT-pohjainen todennus `CustomAuthProvider`-luokan kautta
- **Käyttöönotto:** AWS Lambda Serverless Framework v3:n avulla

## Portit

| Protokolla | Portti | Kuvaus |
|----------|------|-------------|
| HTTP | `8084` | Pääasiallinen REST API |
| WebSocket | `8087` | Reaaliaikaiset socket-yhteydet |

## Lambda-funktiot

Kun API otetaan käyttöön AWS:ssä, se toimii kuutena Lambda-funktiona:

- **`web`** -- Käsittelee kaikki HTTP-pyynnöt
- **`socket`** -- Hallinnoi WebSocket-yhteyksiä
- **`timer15Min`** -- Suoritetaan 30 minuutin välein sähköposti-ilmoituksia varten (nimi on historiallinen)
- **`timerMidnight`** -- Suoritetaan päivittäin yhteenvetosähköposteja ja ylläpitotehtäviä varten
- **`timerScheduledTasks`** -- Suoritetaan päivittäin erääntyneitä automaatioita ja myöhässä olevien työnkulkujen käsittelyä varten
- **`timerWebhooks`** -- Suoritetaan minuutin välein jonotettujen lähtevien webhookien toimittamiseksi

## Jaetut kirjastot

API käyttää kahta jaettua ChurchApps-pakettia:

- **[`@churchapps/helpers`](../shared-libraries/helpers)** -- Perustyökalut (DateHelper, ApiHelper jne.)
- **[`@churchapps/apihelper`](../shared-libraries/api-helper)** -- Express-palvelimen apuvälineet, mukaan lukien todennus, tietokantaapuvälineet ja AWS-integraatiot

:::info
API käyttää ES-moduuleja (`"type": "module"` tiedostossa `package.json`). Varmista, että tuonti-lauseesi käyttävät ES-moduulien syntaksia.
:::

## Tässä osiossa

- **[Paikallinen asennus](./local-setup)** -- Kloonaa, määritä ja suorita API paikallisesti
- **[Tietokanta](./database)** -- Moduulikohtainen tietokantarakenne, skeemaskriptit ja tietojen käyttömallit
- **[Moduulin rakenne](./module-structure)** -- Ohjaimet, repositoriot, mallit ja todennus
- **[API-avaimet](./api-keys)** -- Henkilökohtaiset käyttöoikeustunnukset skripteille ja liittimille
- **[Yhdistetyt sovellukset (OAuth)](./connected-apps)** -- Monivuokraajainen OAuth-kulku kolmannen osapuolen sovelluksille
- **[Webhookit](./webhooks)** -- Tapahtumailmoitusten lähettäminen ulkoisiin järjestelmiin
- **[MCP-palvelin](./mcp)** -- Model Context Protocol -päätepiste, joka tarjoaa API:n tekoälyavustajille
- **[Päätepisteviite](./endpoints/)** -- Täydellinen REST API -dokumentaatio kaikille moduuleille
