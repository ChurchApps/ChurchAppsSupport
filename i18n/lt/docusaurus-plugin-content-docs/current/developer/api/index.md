---
title: "API"
description: "ChurchApps API modulinio monolito dizainas, šeši duomenų moduliai, technologijų stekas, prievadai ir Lambda funkcijos, su nuorodomis į kūrėjų dokumentus."
---

# API

<div class="article-intro">

ChurchApps API yra **modulinis monolitas** -- viena kodo bazė, aptarnaujanti šešis duomenų modulius, kiekvienas su savo duomenų baze. Tokia architektūra suteikia mikroservisų organizacinius privalumus (aiškias ribas, nepriklausomas duomenų saugyklas) ir kartu vieno diegimo operacinį paprastumą.

</div>

## Moduliai

| Modulis | Paskirtis |
|--------|---------|
| **Nariai** | Asmenys, grupės, namų ūkiai, leidimai |
| **Lankomumas** | Pamaldos, sesijos, registracijos įrašai |
| **Turinys** | Puslapiai, skyriai, elementai, transliacijos |
| **Aukojimai** | Aukos, fondai, mokėjimų apdorojimas |
| **Pranešimai** | Pokalbiai, pranešimai, el. paštas |
| **Veikla** | Užduotys, planai, paskyrimai |

## Technologijų rinkinys

- **Vykdymo aplinka:** Node.js 24.x su TypeScript (ES moduliai)
- **Karkasas:** Express
- **Priklausomybių injekcija:** Inversify (maršrutizavimas pagrįstas dekoratoriais)
- **Duomenų bazė:** MySQL -- po vieną duomenų bazę kiekvienam moduliui, kiekviena su savo ryšių telkiniu
- **Autentifikacija:** JWT pagrindu veikianti autentifikacija per `CustomAuthProvider`
- **Diegimas:** AWS Lambda naudojant Serverless Framework v3

## Prievadai

| Protokolas | Prievadas | Aprašymas |
|----------|-----------|-------------|
| HTTP | `8084` | Pagrindinis REST API |
| WebSocket | `8087` | Realaus laiko soketų ryšiai |

## Lambda funkcijos

Diegiant į AWS, API veikia kaip šešios Lambda funkcijos:

- **`web`** -- apdoroja visas HTTP užklausas
- **`socket`** -- valdo WebSocket ryšius
- **`timer15Min`** -- vykdoma kas 30 minučių el. laiškų pranešimams (pavadinimas istorinis)
- **`timerMidnight`** -- vykdoma kasdien skaitmeninių laiškų ir priežiūros užduotims
- **`timerScheduledTasks`** -- vykdoma kasdien, skirta suplanuotoms automatizacijoms ir vėluojantiems darbo srautams apdoroti
- **`timerWebhooks`** -- vykdoma kas minutę, siunčiant eilėje laukiančius išeinančius webhook'us

## Bendrosios bibliotekos

API priklauso nuo dviejų bendrųjų ChurchApps paketų:

- **[`@churchapps/helpers`](../shared-libraries/helpers.md)** -- bazinės pagalbinės priemonės (DateHelper, ApiHelper ir kt.)
- **[`@churchapps/apihelper`](../shared-libraries/api-helper.md)** -- Express serverio pagalbinės priemonės, įskaitant autentifikaciją, duomenų bazės pagalbines funkcijas ir AWS integracijas

:::info
API naudoja ES modulius (`package.json` faile nurodyta `"type": "module"`). Įsitikinkite, kad jūsų importai naudoja ES modulių sintaksę.
:::

## Šis skyrius

- **[Vietinis diegimas](./local-setup.md)** -- klonuokite, sukonfigūruokite ir paleiskite API lokaliai
- **[Duomenų bazė](./database.md)** -- architektūra su atskira duomenų baze kiekvienam moduliui, schemos skriptai ir duomenų prieigos modeliai
- **[Modulio struktūra](./module-structure.md)** -- valdikliai, saugyklos, modeliai ir autentifikacija
- **[API raktai](./api-keys.md)** -- asmeniniai prieigos žetonai skriptams ir jungtims
- **[Susietos programos (OAuth)](./connected-apps.md)** -- daugianuomininkė OAuth eiga trečiųjų šalių programoms
- **[Webhook'ai](./webhooks.md)** -- įvykių pranešimų siuntimas išorinėms sistemoms
- **[MCP serveris](./mcp.md)** -- Model Context Protocol galinis taškas, atveriantis API DI asistentams
- **[Galinių taškų žinynas](./endpoints/index.md)** -- pilna REST API dokumentacija visiems moduliams
