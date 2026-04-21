---
title: "Shared Libraries"
---

# Shared Libraries

<div class="article-intro">

ChurchApps gedeelde code wordt naar npm gepubliceerd onder het `@churchapps/*`-bereik. Deze pakketten bieden gemeenschappelijke utilities, serverutilities en React-onderdelen die door alle ChurchApps-projecten als reguliere npm-afhankelijkheden worden gebruikt.

</div>

## Pakketten

| Package | Beschrijving | Used By |
|---------|-------------|---------|
| [`@churchapps/helpers`](./helpers) | Basisutilities (DateHelper, ApiHelper, enz.) | Alle projecten |
| [`@churchapps/apihelper`](./api-helper) | Express.js-serverutilities | Alle API's |
| [`@churchapps/apphelper`](./app-helper) | Gedeelde React-onderdelen en utilities | Alle web-apps |

## Lokale Ontwikkeling met `npm link`

Bij het ontwikkelen van een gedeelde bibliotheek naast een verbruikend project, kunt u `npm link` gebruiken om wijzigingen zonder publicatie naar npm te testen:

```bash
# Bouw en koppel de bibliotheek
cd Helpers && npm run build && npm link

# Koppel het in het verbruikende project
cd ../Api && npm link @churchapps/helpers
```

Dit maakt een symlink van de `node_modules/@churchapps/helpers`van het verbruikende project naar uw lokale bouwoutput, dus wijzigingen worden onmiddellijk weerspiegeld na herbouwen.

:::tip
Onthoud dat u `npm run build` in het bibliotheekproject moet uitvoeren na het maken van wijzigingen -- het verbruikende project leest van de gecompileerde `dist/`-map, niet van de bron.
:::

:::warning
`npm link`-verbindingen worden opnieuw ingesteld wanneer u `npm install` in het verbruikende project uitvoert. U moet de `npm link @churchapps/<package>`-commando opnieuw uitvoeren na het installeren van afhankelijkheden.
:::
