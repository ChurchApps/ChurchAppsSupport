---
title: "Gedeelde bibliotheken"
description: "Dokumentacja pakietów npm @churchapps współdzielonych przez B1 Admin, B1.church i API, oraz konfiguracja workspace Packages i wydawanie przez changesets."
---

# Gedeelde bibliotheken

<div class="article-intro">

Gedeelde code van ChurchApps wordt gepubliceerd op npm onder de scope `@churchapps/*`. Alle gedeelde pakketten staan in één repository -- [Packages](https://github.com/ChurchApps/Packages) -- die wordt beheerd als een Yarn (Berry)-workspace en wordt geversioneerd met [changesets](https://github.com/changesets/changesets).

</div>

## Pakketten

| Pakket | Beschrijving | Gebruikt door |
|--------|--------------|---------------|
| [`@churchapps/helpers`](./helpers.md) | Basislaag: framework-onafhankelijke hulpfuncties en de gedeelde TypeScript-interfaces die het gegevenscontract tussen apps vormen | Alle projecten |
| [`@churchapps/apihelper`](./api-helper.md) | Server-side Express-hulpprogramma's: authenticatie, basiscontrollers, databasetoegang, AWS- en e-mailintegraties | Alle API's |
| [`@churchapps/apphelper`](./app-helper.md) | Gedeelde React-componenten en functiemodules (inloggen, donaties, formulieren, markdown, website) | Alle webapps |
| `@churchapps/content-providers` | Abstractielaag over externe contentproviders (Lessons.church, Planning Center, Dropbox en andere) | Api, B1Admin, B1App, FreePlay |
| `@churchapps/integration-sdk` | Toolkit voor het bouwen van B1.church-integraties: webhookverificatie, getypeerde REST-client, OAuth-hulpfuncties | Externe integratieontwikkelaars |
| `@churchapps/texting` | Abstractielaag voor sms-providers (Text In Church, Clearstream, Mutual Ministry, MinistryStuff, Nalo Solutions, Twilio) | Api |

De afhankelijkheidsrichting loopt strikt naar beneden: apps zijn afhankelijk van `apihelper` en `apphelper`, die `@churchapps/helpers` declareren als een **peer dependency**, zodat elke app precies één exemplaar ervan gebruikt.

## Werkruimte instellen

```bash
git clone https://github.com/ChurchApps/Packages.git
cd Packages
yarn install
yarn build
```

De repository gebruikt Yarn Berry (het veld `packageManager` in de root is bepalend) met één lockfile. `yarn build` bouwt alle pakketten in afhankelijkheidsvolgorde; `yarn test` voert de tests van alle pakketten uit.

## Publiceren met Changesets

Elke wijziging in een pakket wordt uitgebracht met een changeset:

1. Voer `yarn changeset` uit in de hoofdmap van de werkruimte. Kies het pakket (of de pakketten) die je hebt aangepast, het type versieverhoging (patch = fix, minor = nieuwe export of functie, major = breaking change) en schrijf een samenvatting van één regel -- deze wordt de CHANGELOG-vermelding.
2. Commit het gegenereerde `.changeset/*.md`-bestand samen met je codewijziging. Een pre-commit-hook blokkeert commits die de broncode van een pakket wijzigen zonder een gestage changeset.
3. Wanneer je klaar bent om te publiceren, voer je `yarn publish-all` uit in de hoofdmap. Dit verwerkt de openstaande changesets (versies ophogen, CHANGELOG's schrijven, interne afhankelijkheidsbereiken synchroniseren), bouwt alles in afhankelijkheidsvolgorde en publiceert de bijgewerkte pakketten naar npm. Commit daarna en push de versieverhogingen.

:::warning
Voer nooit een kale `npm publish` uit binnen één pakket -- dit slaat de bouwvolgorde en het versiebeheer over die het releasescript afhandelt. Publiceren vereist een npm-account met publicatierechten voor de `@churchapps`-scope.
:::

## Lokale ontwikkeling tegen een consumerende app

Binnen de werkruimte bouwen pakketten rechtstreeks tegen hun zusterpakketten -- er is geen koppeling nodig. Om een niet-gepubliceerde pakketbuild te testen binnen een consumerende app (B1Admin, B1App, enz.), voeg je tijdelijk een Yarn-portal toe in de consument:

```bash
# in het consumerende project
yarn link ../Packages/helpers
# ... testen ...
yarn unlink ../Packages/helpers && yarn install
```

Bouw eerst het pakket (`yarn build` in de hoofdmap van de werkruimte) -- de consument leest de gecompileerde `dist/`-uitvoer, niet de broncode.

:::warning
`yarn link` schrijft een portal-resolutie in het `package.json` van de consument. Commit deze nooit -- voer altijd `yarn unlink` uit en installeer opnieuw wanneer je klaar bent.
:::
