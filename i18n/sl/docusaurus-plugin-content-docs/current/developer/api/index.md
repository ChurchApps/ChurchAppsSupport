---
title: "API"
description: "Pojasni modularno zasnovo API-ja ChurchApps, šest podatkovnih modulov, tehnološki sklad, vrata in funkcije Lambda ter povezave do navodil za razvijalce."
---

# API

<div class="article-intro">

API ChurchApps je **modularni monolit** -- ena kodna baza, ki služi šestim podatkovnim modulom, vsak s svojo podatkovno bazo. Ta arhitektura vam daje organizacijske prednosti mikrostoritev (jasne meje, neodvisna podatkovna skladišča) z operativno preprostostjo ene same namestitve.

</div>

## Moduli

| Modul | Namen |
|--------|---------|
| **Člani** | Osebe, skupine, gospodinjstva, dovoljenja |
| **Udeležba** | Storitve, seje, zapisi prijav |
| **Vsebina** | Strani, razdelki, elementi, pretakanje |
| **Darovanja** | Donacije, skladi, obdelava plačil |
| **Sporočanje** | Pogovori, obvestila, e-pošta |
| **Opravila** | Naloge, načrti, dodelitve |

## Tehnološki sklad

- **Izvajalno okolje:** Node.js 24.x s TypeScriptom (moduli ES)
- **Ogrodje:** Express
- **Vbrizgavanje odvisnosti:** Inversify (usmerjanje na podlagi dekoratorjev)
- **Podatkovna baza:** MySQL -- ena podatkovna baza na modul, vsaka s svojim bazenom povezav
- **Avtentikacija:** overjanje na podlagi JWT prek `CustomAuthProvider`
- **Namestitev:** AWS Lambda prek ogrodja Serverless Framework v3

## Vrata

| Protokol | Vrata | Opis |
|----------|------|-------------|
| HTTP | `8084` | Glavni REST API |
| WebSocket | `8087` | Povezave socket v realnem času |

## Funkcije Lambda

Ko je API nameščen v AWS, se izvaja kot šest funkcij Lambda:

- **`web`** -- Obdeluje vse HTTP zahteve
- **`socket`** -- Upravlja povezave WebSocket
- **`timer15Min`** -- Izvaja se vsakih 30 minut za obvestila po e-pošti (ime je zgodovinsko)
- **`timerMidnight`** -- Izvaja se dnevno za povzetke po e-pošti in vzdrževalna opravila
- **`timerScheduledTasks`** -- Izvaja se dnevno za zapadle avtomatizacije in obdelavo zamujenih delovnih tokov
- **`timerWebhooks`** -- Izvaja se vsako minuto za dostavo čakajočih odhodnih webhookov

## Skupne knjižnice

API je odvisen od dveh skupnih paketov ChurchApps:

- **[`@churchapps/helpers`](../shared-libraries/helpers.md)** -- Osnovna orodja (DateHelper, ApiHelper itd.)
- **[`@churchapps/apihelper`](../shared-libraries/api-helper.md)** -- Pripomočki strežnika Express, vključno z avtentikacijo, pomočniki za podatkovno bazo in integracijami AWS

:::info
API uporablja module ES (`"type": "module"` v `package.json`). Poskrbite, da vaši uvozi uporabljajo sintakso modulov ES.
:::

## V tem razdelku

- **[Lokalna namestitev](./local-setup.md)** -- Klonirajte, nastavite in zaženite API lokalno
- **[Podatkovna baza](./database.md)** -- Arhitektura ene podatkovne baze na modul, skripte sheme in vzorci dostopa do podatkov
- **[Struktura modulov](./module-structure.md)** -- Krmilniki, repozitoriji, modeli in avtentikacija
- **[Ključi API](./api-keys.md)** -- Osebni dostopni žetoni za skripte in povezovalnike
- **[Povezane aplikacije (OAuth)](./connected-apps.md)** -- Večnajemniški tok OAuth za aplikacije tretjih oseb
- **[Webhooki](./webhooks.md)** -- Pošiljanje obvestil o dogodkih zunanjim sistemom
- **[Strežnik MCP](./mcp.md)** -- Končna točka Model Context Protocol, ki API izpostavi pomočnikom umetne inteligence
- **[Referenca končnih točk](./endpoints/index.md)** -- Popolna dokumentacija REST API za vse module
