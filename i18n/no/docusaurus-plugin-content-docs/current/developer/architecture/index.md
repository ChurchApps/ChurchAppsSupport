---
title: "Arkitektur"
---

# Arkitektur

<div class="article-intro">

Disse sidene er tvers-repo systemkart: de dokumenterer hvordan et kjernechurchApps-system fungerer end-to-end -- på tvers av appene, API-modulene og de delte bibliotekene -- snarere enn hvordan ett enkelt prosjekt er satt opp.

</div>

## Økosystemet på et øyeblikk

ChurchApps er ~20 uavhengige repositorier (ikke et monorepo). Klientapper snakker til et lite sett med backend-API-er over HTTPS og WebSocket, og deler kode gjennom npm-pakker som er publisert under `@churchapps`-omfanget.

To strukturelle regler former alt som er dokumentert i denne seksjonen:

1. **Moduler er isolert.** Hver Api-modul eier databasen og tabellene; andre moduler og apper når dataene kun gjennom REST-endepunktene.
2. **Delt kode leveres som npm-pakker.** Apper importerer aldri hverandres kilder; noe som gjenbrukes krysser repogrensenergier gjennom `@churchapps/helpers`, `@churchapps/apphelper`, eller `@churchapps/apihelper`.

## Systemkart

| Side | Hva den dekker | Spenner |
|------|----------------|--------|
| [Notifications & Reminders](./notifications) | Hvordan alt forteller en person noe | Api (messaging), B1Admin, B1App |
| [Real-time Architecture](../realtime) | WebSocket-leveringsrammeverket | Api (messaging), alle web-apper |
| [Giving](./giving) | Betalingsleverandører, donasjonsflyt, gateway-webhooks | Api (giving), B1App, B1Admin |
| [Website Builder](./website-builder) | Side/seksjons/element-treet, element-typen kontakt og renderes, blog, tilgangsgatede sider | Api (content), AskApi, hjelpere/apphelper, B1Admin, B1App |
| [Integrations](./integrations) | Utvidelsesflaten: OAuth, API-nøkler, webhooks, innholdsleverandører, MCP | Api, delte biblioteker, eksterne apper |
| [Bring-Your-Own Storage](./byos-storage) | Kirker lenker Google Drive, Dropbox, OneDrive eller en S3-kompatibel bøtte for opplastinger | Api (content + membership), hjelpere/apphelper-pakker, B1Admin, B1App |
| [Content Commons](./commons) | Den delte eiendelsspinen bak tvers-produkt bruker-generert innhold | Api (commons-modul), B1Admin |

:::tip
Når en endring endrer hvordan ett av disse systemene fungerer -- ikke bare en side innenfor en app -- bør det tilsvarende systemkartet oppdateres i samme innsats.
:::

