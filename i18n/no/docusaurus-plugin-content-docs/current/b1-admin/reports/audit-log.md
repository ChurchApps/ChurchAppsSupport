---
title: "Revisjonslogg"
---

# Revisjonslogg

<div class="article-intro">

Revisjonsloggen sporer alle signifikante handlinger og endringer på tvers av kirkestyrssystemet ditt. Bruk det til å gjennomgå påloggingsaktivitet, spore hvem som gjorde endringer i personsposter, overvåke tillatelsesoppdateringer og opprettholde ansvarlighet på tvers av laget ditt.

</div>

<div class="prereqs">
<h4>Før du begynner</h4>

- B1 Admin-konto med serveradministratoradgang
- Gå til **Innstillinger** for å finne revisjonsloggen

</div>

## Visning av revisjonslogg

1. Gå til **Innstillinger** i B1 Admin.
2. Velg **Revisjonslogg**.
3. Loggen viser nylige oppføringer i en tabell med følgende kolonner:
   - **Dato** -- Når handlingen skjedde.
   - **Kategori** -- Typen handling (fargekodiert for rask skanning).
   - **Handling** -- Hva som ble gjort (f.eks. opprett, oppdater, slett, login_success).
   - **Enhet** -- Typen og ID-en til posten som ble påvirket.
   - **IP-adresse** -- IP-adressen til brukeren som utførte handlingen.
   - **Detaljer** -- Et sammendrag av de spesifikke endringene som ble gjort.

## Filtrering av loggen

Bruk filtrene øverst på siden for å begrense resultatene:

- **Kategori** -- Filtrer etter handlingstype:
  - **Alle kategorier** -- Vis alt.
  - **Pålogging** -- Påloggingssuksesser og -feil.
  - **Folk** -- Opprett, oppdater eller slett personsposter.
  - **Tillatelser** -- Tillatelsestildelinger og -tilbakalinger.
  - **Donasjoner** -- Donasjonpostendringer.
  - **Grupper** -- Gruppeadministrasjonshandlinger.
  - **Skjemaer** -- Skjemainnsendelsesaktivitet.
  - **Innstillinger** -- Konfigurasjonsendrigner.
- **Startdato** -- Vis oppføringer fra denne datoen fremover.
- **Sluttdato** -- Vis oppføringer opp til denne datoen.

Klikk **Søk** etter å ha angitt filtrene for å oppdatere resultatene.

## Forstå kategorier

Hver kategori er fargekodert for rask identifikasjon:

- **Pålogging** -- Blå brikke. Sporer påloggingsforsøk med suksess og feil.
- **Folk** -- Lilla brikke. Sporer personpostopprettelser, oppdateringer og slettinger.
- **Tillatelser** -- Rød brikke. Sporer når tilgangsrettigheter tildeles eller tilbakekalles.
- **Donasjoner** -- Grønn brikke. Sporer donasjonpostendringer.
- **Grupper** -- Grå brikke. Sporer gruppeadministrasjonsoperasjoner.
- **Skjemaer** -- Oransje brikke. Sporer skjemainnsendelsesaktivitet.
- **Innstillinger** -- Gul brikke. Sporer konfigurasjonsendrninger.

## Eksport av loggen

Når loggoppføringer vises, vises en **CSV-nedlastings**-knapp. Klikk den for å eksportere gjeldende filtrerte resultater til et regneark for offline-gjennomgang eller registrering.

## Paginering

Bruk pagineringskontrollene nederst i tabellen for å navigere gjennom resultatene. Du kan vise 25, 50 eller 100 oppføringer per side.

:::info
Revisjonsloggoppføringer beholdes automatisk i ett år. Oppføringer eldre enn 365 dager fjernes for å holde systemet effektivt.
:::

:::tip
Gjennomgå revisjonsloggen regelmessig, spesielt etter å ha innlandet nye teammedlemmer eller gjort betydelige konfigurasjonsendringer. Det hjelper til med å identifisere uventet aktivitet tidlig.
:::

## Relaterte artikler

- [Roller og tillatelser](../settings/roles-permissions) -- Administrer hvem som har tilgang til hva
- [Datasikkerhet](../settings/data-security) -- Forstå hvordan dataene dine er beskyttet
- [Rapportoversikt](./index.md) -- Se alle tilgjengelige rapporter
