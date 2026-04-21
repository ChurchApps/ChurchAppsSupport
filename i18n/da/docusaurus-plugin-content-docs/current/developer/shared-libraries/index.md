---
title: "Delte biblioteker"
---

# Delte biblioteker

<div class="article-intro">

ChurchApps delt kode udgives til npm under `@churchapps/*` scope. Disse pakker giver almindelige værktøjer, serversideshjælpere og React-komponenter, der forbruges af alle ChurchApps-projekter som almindelige npm-afhængigheder.

</div>

## Pakker

| Package | Beskrivelse | Brugt af |
|---------|-------------|---------|
| [`@churchapps/helpers`](./helpers) | Grundlæggende værktøjer (DateHelper, ApiHelper osv.) | Alle projekter |
| [`@churchapps/apihelper`](./api-helper) | Serversidesværktøjer til Express.js | Alle API'er |
| [`@churchapps/apphelper`](./app-helper) | Delte React-komponenter og værktøjer | Alle webapps |

## Lokal udvikling med `npm link`

Når du udvikler et delt bibliotek sammen med et forbrugerprojekt, skal du bruge `npm link` til at teste ændringer uden at publicere til npm:

```bash
# Build og link biblioteket
cd Helpers && npm run build && npm link

# Link det til forbrugerprojektet
cd ../Api && npm link @churchapps/helpers
```

Dette opretter en symlink fra forbrugerprojektets `node_modules/@churchapps/helpers` til dit lokale build-output, så ændringer afspejles med det samme efter genopbygning.

:::tip
Husk at køre `npm run build` i bibliotekprojektet efter at foretage ændringer -- forbrugerprojektet læser fra den kompilerede `dist/`-mappe, ikke kilden.
:::

:::warning
`npm link`-forbindelser nulstilles, når du kører `npm install` i forbrugerprojektet. Du skal køre kommandoen `npm link @churchapps/<package>` igen efter at installere afhængigheder.
:::
