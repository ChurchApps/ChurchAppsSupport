---
title: "Delte biblioteker"
---

# Delte biblioteker

<div class="article-intro">

ChurchApps delt kode publiseres til npm under `@churchapps/*`-omfanget. Disse pakkene tilbyr vanlige verktøy, serversidehjelpere og React-komponenter som brukes av alle ChurchApps-prosjekter som vanlige npm-avhengigheter.

</div>

## Pakker

| Pakke | Beskrivelse | Brukes av |
|-------|-------------|-----------|
| [`@churchapps/helpers`](./helpers) | Basisverktøy (DateHelper, ApiHelper osv.) | Alle prosjekter |
| [`@churchapps/apihelper`](./api-helper) | Serverside Express.js-verktøy | Alle API-er |
| [`@churchapps/apphelper`](./app-helper) | Delte React-komponenter og verktøy | Alle webapper |

## Lokal utvikling med `npm link`

Når du utvikler et delt bibliotek sammen med et prosjekt som bruker det, bruk `npm link` for å teste endringer uten å publisere til npm:

```bash
# Bygg og lenk biblioteket
cd Helpers && npm run build && npm link

# Lenk det inn i det konsumerende prosjektet
cd ../Api && npm link @churchapps/helpers
```

Dette oppretter en symbolsk lenke fra det konsumerende prosjektets `node_modules/@churchapps/helpers` til din lokale byggeutdata, slik at endringer reflekteres umiddelbart etter ombygging.

:::tip
Husk å kjøre `npm run build` i bibliotekprosjektet etter å ha gjort endringer -- det konsumerende prosjektet leser fra den kompilerte `dist/`-mappen, ikke kildekoden.
:::

:::warning
`npm link`-tilkoblinger tilbakestilles hver gang du kjører `npm install` i det konsumerende prosjektet. Du må kjøre `npm link @churchapps/<pakke>`-kommandoen på nytt etter installering av avhengigheter.
:::
