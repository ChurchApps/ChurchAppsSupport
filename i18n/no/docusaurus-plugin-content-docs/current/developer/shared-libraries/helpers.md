---
title: "Helpers"
---

# Helpers

<div class="article-intro">

Pakken `@churchapps/helpers` gir grunnleggende verktøy brukt av alle ChurchApps-prosjekter, både frontend og backend. Den er rammeverksuavhengig og inkluderer vanlige hjelpere som `DateHelper`, `ApiHelper`, `CurrencyHelper`, pluss de delte TypeScript-grensesnittene som utgjør datakontrakten mellom apper og API-er.

</div>

<div class="prereqs">
<h4>Før du begynner</h4>

- Installer **Node.js** og **Git** -- se [Forutsetninger](../setup/prerequisites)
- Gjør deg kjent med oppsettet og utgivelsesflyten til [Packages-arbeidsområdet](./index.md)

</div>

## Hvem bruker dette

Hvert ChurchApps-API (kjerne-Api-et, AskApi og LessonsApi) og hver nettfrontend (B1Admin, B1App, B1Transfer, LessonsApp) avhenger av denne pakken direkte. Frontendene får også mange av eksportene dens (`ApiHelper`, `DateHelper`, `UserHelper`, og andre grensesnitt) re-eksportert gjennom [`@churchapps/apphelper`](./app-helper). De andre delte pakkene erklærer den som en peer-avhengighet, slik at hver app løser opp nøyaktig én kopi.

## Oppsett for lokal utvikling

Denne pakken bor i [Packages](https://github.com/ChurchApps/Packages)-arbeidsområdet sammen med de andre delte bibliotekene:

1. Klon arbeidsområdet:

   ```bash
   git clone https://github.com/ChurchApps/Packages.git
   ```

2. Installer avhengigheter ved roten av arbeidsområdet:

   ```bash
   cd Packages && yarn install
   ```

3. Bygg (kompilerer TypeScript til `dist/`):

   ```bash
   yarn workspace @churchapps/helpers build
   ```

   Eller kjør `yarn build` ved roten for å bygge hver pakke i avhengighetsrekkefølge.

For å teste endringer inne i et konsumerende prosjekt, bruk en midlertidig Yarn-portal -- se [Lokal utvikling mot en konsumerende app](./index.md#local-development-against-a-consuming-app).

## Publisering

Utgivelser går gjennom changesets fremfor manuelle versjonsøkninger:

1. Kjør `yarn changeset` ved roten av arbeidsområdet og velg `@churchapps/helpers` med riktig type versjonsøkning; commit den genererte changeset-filen sammen med endringen din.
2. Når du er klar til å publisere, kjør `yarn publish-all` ved roten -- den øker versjoner, skriver CHANGELOG-er, bygger i avhengighetsrekkefølge og publiserer til npm.

Nye delte grensesnitt legges i `helpers/src/interfaces/` og re-eksporteres gjennom pakkens samlefil. Nettstedsbyggerens elementtype-katalog (`ElementTypes.ts` — 35 typer med sine answers-skjemaer) bor også her; det er kontrakten som deles av apphelper-rendererne, redigeringsskjemaene i B1Admin, og AI-genereringsinstruksene (se [Nettstedsbyggerarkitektur](../architecture/website-builder)).

:::warning
Siden denne pakken brukes av hvert ChurchApps-prosjekt, har endringer her stor innvirkning. En utgivelse av `helpers` øker automatisk versjonen av `apihelper` og `apphelper` slik at avhengighetsområdene deres holdes oppdatert. Test med en Yarn-portal i minst ett konsumerende API og én konsumerende nettapp før publisering.
:::

## Relaterte artikler

- **[ApiHelper](./api-helper)** -- Server-side verktøy som avhenger av denne pakken
- **[AppHelper](./app-helper)** -- React-komponenter som avhenger av denne pakken
- **[Oversikt over delte biblioteker](./index.md)** -- Arbeidsområdeoppsett, utgivelsesflyt og lokal-lenke-arbeidsflyt
