---
title: "Revisjonlogg"
---

# Revisjonlogg

<div class="article-intro">

Revisjonloggen sporer alle betydelige handlinger og endringer på tvers av kirkens styringssystem. Bruk den til å gjennomgå påloggingsaktivitet, spore hvem som gjorde endringer i personposter, overvåke tillateelsesoppdateringer og oppretthold ansvarlighet på tvers av teamet.

</div>

<div class="prereqs">
<h4>Før du begynner</h4>

- B1 Admin-konto med servereig administrering
- Gå til **Innstillinger** for å finne revisjonloggen

</div>

## Visning av revisjonloggen

1. Gå til **Innstillinger** i B1 Admin.
2. Velg **Revisjonlogg**.
3. Loggen viser nylige poster i en tabell med følgende kolonner:
   - **Dato** -- Når handlingen oppsto.
   - **Kategori** -- Handlingstypen (fargekodifisert for rask skanning).
   - **Handling** -- Hva som ble gjort (f.eks. opprett, oppdater, slett, login_success).
   - **Enhet** -- Typen og ID-en til posten som ble påvirket.
   - **IP-adresse** -- IP-adressen til brukeren som utførte handlingen.
   - **Detaljer** -- Et sammendrag av de spesifikke endringene som ble gjort.

## Filtrering av loggen

Bruk filtrene øverst på siden for å begrense resultatene:

- **Kategori** -- Filtrer etter handlingstype:
  - **Alle kategorier** -- Vis alt.
  - **Pålogging** -- Påloggingssuksesser og feil.
  - **Personer** -- Opprettelse, oppdatering eller sletting av personposter.
  - **Tillatelseser** -- Tillatelsestildelinger og tilbakekalinger.
  - **Donasjoner** -- Donasjonspostendringer.
  - **Grupper** -- Gruppestyringshandlinger.
  - **Skjemaer** -- Skjemainutsendelsesaktivitet.
  - **Innstillinger** -- Konfigurasjonsendringer.
- **Startdato** -- Vis poster fra denne datoen fremover.
- **Sluttdato** -- Vis poster fram til denne datoen.

Klikk **Søk** etter å ha angitt filtrene for å oppdatere resultatene.

## Forståelse av kategorier

Hver kategori er fargekodifisert for rask identifikasjon:

- **Pålogging** -- Blå brikke. Sporer vellykkede og mislykkede påloggingsforsøk.
- **Personer** -- Lilla brikke. Sporer opprettelse, oppdatering og sletting av personposter.
- **Tillatelseser** -- Rød brikke. Sporer når tilgangsrettigheter blir gitt eller tilbakekalt.
- **Donasjoner** -- Grønn brikke. Sporer donasjonspostendringer.
- **Grupper** -- Grå brikke. Sporer gruppestyringsoperasjoner.
- **Skjemaer** -- Oransje brikke. Sporer skjemainutsendelsesaktivitet.
- **Innstillinger** -- Gul brikke. Sporer konfigurasjonsendringer.

## Eksportering av loggen

Når logposter vises, vises en **CSV-nedlastingsknapp**. Klikk den for å eksportere de filtrerte resultatene til et regneark for offline-gjennomgang eller registerføring.

## Sideinndeling

Bruk sideinndeligingskontrollene nederst i tabellen for å navigere gjennom resultatene. Du kan vise 25, 50 eller 100 poster per side.

:::info
Revisjonloggposter oppbevares automatisk i ett år. Poster eldre enn 365 dager fjernes for å holde systemet driftssikkert.
:::

:::tip
Gjennomgå revisjonloggen regelmessig, spesielt etter å ha innført nye teammedlemmer eller gjort betydelige konfigurasjonsendringer. Det hjelper til med å identifisere uventet aktivitet tidlig.
:::

## Relaterte artikler

- [Roller & Tillatelser](../settings/roles-permissions) -- Administrer hvem som har tilgang til hva
- [Datasikkerhet](../settings/data-security) -- Forstå hvordan dataene dine er beskyttet
- [Rapporteroversikt](./index.md) -- Se alle tilgjengelige rapporter
