---
title: "Helpers"
---

# Helpers

<div class="article-intro">

`@churchapps/helpers`-pakken gir grunnleggende verktøy brukt av alle ChurchApps-prosjekter, både frontend og backend. Det er rammeverk-agnostisk og inkluderer vanlige hjelpere som `DateHelper`, `ApiHelper`, `CurrencyHelper`, pluss de delte TypeScript-grensesnittene som danner datakontrakten mellom apper og APIer.

</div>

<div class="prereqs">
<h4>Før du begynner</h4>

- Installer **Node.js** og **Git** -- se [Forutsetninger](../setup/prerequisites)
- Gjør deg kjent med [Packages-arbeidsområdet](./index.md) oppsett og frigjøringsflyt

</div>

## Hvem forbruker dette

Hver ChurchApps API (kjerne Api, AskApi og LessonsApi) og hver nettfrontend (B1Admin, B1App, B1Transfer, LessonsApp) avhenger av denne pakken direkte. Frontender får også mange av eksportene (`ApiHelper`, `DateHelper`, `UserHelper` og andre grensesnitt) gjeneksportert gjennom [`@churchapps/apphelper`](./app-helper). De andre delte pakkeene erklærer det som en peer-avhengighet slik at hver app løser nøyaktig en kopi.

## Oppsett for lokal utvikling

Denne pakken bor i [Packages](https://github.com/ChurchApps/Packages)-arbeidsområdet sammen med de andre delte bibliotekene:

1. Klon arbeidsområdet:

   ```bash
   git clone https://github.com/ChurchApps/Packages.git
   ```

2. Installer avhengigheter ved arbeidsområderoten:

   ```bash
   cd Packages && yarn install
   ```

3. Bygg (kompiler TypeScript til `dist/`):

   ```bash
   yarn workspace @churchapps/helpers build
   ```

   Eller kjør `yarn build` ved roten for å bygge hver pakke i avhengighetsrekkefølge.

For å teste endringer i et forbrukende prosjekt, bruk en midlertidig Yarn-portal -- se [Lokal utvikling mot en forbrukerapp](./index.md#local-development-against-a-consuming-app).

## Publisering

Frigjøringer går gjennom changesets snarere enn manuelle versjonsbump:

1. Kjør `yarn changeset` ved arbeidsområderoten og velg `@churchapps/helpers` med den passende bump-typen; commit den genererte changeset-filen med endringen din.
2. Når du er klar til å frigjøre, kjør `yarn publish-all` ved roten -- den bumper versjoner, skriver CHANGELOGs, bygger i avhengighetsrekkefølge og publiserer til npm.

Nye delte grensesnitt går i `helpers/src/interfaces/` og gjeneksporteres gjennom pakkefatet. Nettstedsbyggerens element-typekatalog (`ElementTypes.ts` — 35 typer med deres answer-skjemaer) bor også her; det er kontrakten delt av apphelper-renderere, B1Admin-redigeringsformer og AI-generasjonsinstruks (se [Nettstedsbyggerarkitektur](../architecture/website-builder)).

:::warning
Siden denne pakken brukes av hvert ChurchApps-prosjekt, har endringer her bred innvirkning. En frigjøring av `helpers` bumper automatisk `apihelper` og `apphelper` slik at deres avhengighetsrekker holder seg gjeldende. Test med en Yarn-portal i minst en forbruke-API og en forbruke-nettapp før publisering.
:::

## Relaterte artikler

- **[ApiHelper](./api-helper)** -- Server-side verktøy som avhenger av denne pakken
- **[AppHelper](./app-helper)** -- React-komponenter som avhenger av denne pakken
- **[Oversikt over delte biblioteker](./index.md)** -- Arbeidsområdeoppsett, frigjøringsflyt og lokal-link-arbeitsflyt
