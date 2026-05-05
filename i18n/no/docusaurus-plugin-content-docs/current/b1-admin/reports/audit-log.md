---
title: "Revisjonslogg"
---

# Revisjonslogg

<div class="article-intro">

Revisjon

sloggen sporer alle viktige handlinger og endringer på tvers av kirkestyringsystemet ditt. Bruk den til å gjennomgå påloggingsaktivitet, spore hvem som gjorde endringer i personposter, overvåke tillatelsesoppdateringer og opprettholde ansvar på tvers av teamet ditt.

</div>

<div class="prereqs">
<h4>Før du begynner</h4>

- B1 Admin-konto med serveradministratortilgang
- Naviger til **Innstillinger** for å finne revisj

onsloggen

</div>

## Se revisjoonsloggen

1. Gå til **Innstillinger** i B1 Admin.
2. Velg **Revisjonslogg**.
3. Loggen viser nylige oppføringer i en tabell med følgende kolonner:
   - **Dato** -- Når handlingen skjedde.
   - **Kategori** -- Typen handling (fargekodet for rask skanning).
   - **Handling** -- Hva som ble gjort (f.eks. create, update, delete, login_success).
   - **Enhet** -- Typen og ID-en til posten som ble påvirket.
   - **IP-adresse** -- IP-adressen til brukeren som utførte handlingen.
   - **Detaljer** -- Et sammendrag av de spesifikke endringene som ble gjort.

## Filtrere loggen

Bruk filtrene øverst på siden for å begrense resultatene:

- **Kategori** -- Filtrer etter handlingstype:
  - **Alle kategorier** -- Vis alt.
  - **Pålogging** -- Vellykkede og mislykkede pålogginger.
  - **Personer** -- Oppretting, oppdatering eller sletting av personposter.
  - **Tillatelser** -- Tillatelser gitt og trukket tilbake.
  - **Donasjoner** -- Endringer i donasjonsregistreringer.
  - **Grupper** -- Gruppeadministrasjonshandlinger.
  - **Skjemaer** -- Skjemainnsendingsaktivitet.
  - **Innstillinger** -- Konfigurasjonsendringer.
- **Startdato** -- Vis oppføringer fra denne datoen og fremover.
- **Sluttdato** -- Vis oppføringer opp til denne datoen.

Klikk **Søk** etter å ha satt filtrene for å oppdatere resultatene.

## Forstå kategorier

Hver kategori er fargekodet for rask identifisering:

- **Pålogging** -- Blå chip. Sporer vellykkede og mislykkede påloggingsforsøk.
- **Personer** -- Lilla chip. Sporer oppretting, oppdatering og sletting av personposter.
- **Tillatelser** -- Rød chip. Sporer når tilgangsrettigheter gis eller trekkes tilbake.
- **Donasjoner** -- Grønn chip. Sporer endringer i donasjonsregistreringer.
- **Grupper** -- Grå chip. Sporer gruppeadministrasjonsoperasjoner.
- **Skjemaer** -- Oransje chip. Sporer skjemainnsendingsaktivitet.
- **Innstillinger** -- Gul chip. Sporer konfigurasjonsendringer.

## Eksportere loggen

Når loggoppføringer vises, vises en **CSV-nedlastingsknapp**. Klikk på den for å eksportere gjeldende filtrerte resultater til et regneark for offline gjennomgang eller journalføring.

## Paginering

Bruk pagineringskontrollene nederst i tabellen for å navigere gjennom resultatene. Du kan vise 25, 50 eller 100 oppføringer per side.

:::info
Revisjonsloggoppføringer beholdes automatisk i ett år. Oppføringer eldre enn 365 dager fjernes for å holde systemet ytelseseffektivt.
:::

:::tip
Gjennomgå revisjoonsloggen jevnlig, spesielt etter å ha tatt inn nye teammedlemmer eller gjort betydelige konfigurasjonsendringer. Det hjelper med å identifisere uventet aktivitet tidlig.
:::

## Relaterte artikler

- [Roller og tillatelser](../settings/roles-permissions) -- Administrer hvem som har tilgang til hva
- [Datasikkerhet](../settings/data-security) -- Forstå hvordan dataene dine beskyttes
- [Rapportoversikt](./index.md) -- Se alle tilgjengelige rapporter
