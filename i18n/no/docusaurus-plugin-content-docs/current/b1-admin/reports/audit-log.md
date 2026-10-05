---
title: "Revisjonslogg"
---

# Revisjonslogg

<div class="article-intro">

Revisjonsloggen registrerer alle viktige handlinger og endringer i menighetsadministrasjonssystemet. Bruk den til å gå gjennom påloggingsaktivitet, se hvem som har gjort endringer i personregistreringer, følge med på tillatelsesoppdateringer og sikre ansvarlighet i teamet.

</div>

<div class="prereqs">
<h4>Før du begynner</h4>

- B1 Admin-konto med serveradministratortilgang
- Gå til **Innstillinger** for å finne revisjonsloggen

</div>

## Vise revisjonsloggen

1. Åpne [Jump-menyen](../introduction.md#getting-around-with-the-jump-menu) (søkefeltet øverst til venstre i B1 Admin) og utvid **Innstillinger**.
2. Klikk på **Revisjonslogg**.
3. Loggen viser de siste oppføringene i en tabell med følgende kolonner:
   - **Dato** -- Når handlingen skjedde.
   - **Kategori** -- Typen handling (fargekodet for rask skanning).
   - **Handling** -- Hva som ble gjort (f.eks. create, update, delete, login_success).
   - **Enhet** -- Typen og ID-en til posten som ble berørt.
   - **IP-adresse** -- IP-adressen til brukeren som utførte handlingen.
   - **Detaljer** -- Et sammendrag av de konkrete endringene som ble gjort.

## Filtrere loggen

Bruk filtrene øverst på siden for å snevre inn resultatene:

- **Kategori** -- Filtrer etter handlingstype:
  - **Alle kategorier** -- Vis alt.
  - **Pålogging** -- Vellykkede og mislykkede påloggingsforsøk.
  - **Personer** -- Opprettelse, oppdatering eller sletting av personregistreringer.
  - **Tillatelser** -- Tildeling og tilbakekalling av tillatelser.
  - **Donasjoner** -- Endringer i donasjonsregistreringer.
  - **Grupper** -- Handlinger knyttet til gruppeadministrasjon.
  - **Skjemaer** -- Aktivitet knyttet til innsendte skjemaer.
  - **Innstillinger** -- Endringer i konfigurasjonen.
- **Startdato** -- Vis oppføringer fra og med denne datoen.
- **Sluttdato** -- Vis oppføringer til og med denne datoen.

Klikk på **Søk** etter at du har angitt filtrene, for å oppdatere resultatene.

## Forstå kategoriene

Hver kategori er fargekodet for rask identifikasjon:

- **Pålogging** -- Blå merkelapp. Registrerer vellykkede og mislykkede påloggingsforsøk.
- **Personer** -- Lilla merkelapp. Registrerer opprettelse, oppdatering og sletting av personregistreringer.
- **Tillatelser** -- Rød merkelapp. Registrerer når tilgangsrettigheter gis eller trekkes tilbake.
- **Donasjoner** -- Grønn merkelapp. Registrerer endringer i donasjonsregistreringer.
- **Grupper** -- Grå merkelapp. Registrerer gruppeadministrasjon.
- **Skjemaer** -- Oransje merkelapp. Registrerer aktivitet knyttet til innsendte skjemaer.
- **Innstillinger** -- Gul merkelapp. Registrerer endringer i konfigurasjonen.

## Eksportere loggen

Når loggoppføringer vises, dukker det opp en knapp for **CSV-nedlasting**. Klikk på den for å eksportere de gjeldende filtrerte resultatene til et regneark for gjennomgang offline eller arkivering.

## Sideinndeling

Bruk sidekontrollene nederst i tabellen for å bla gjennom resultatene. Du kan vise 25, 50 eller 100 oppføringer per side.

:::info
Oppføringer i revisjonsloggen oppbevares automatisk i ett år. Oppføringer som er eldre enn 365 dager, fjernes for å holde systemet raskt.
:::

:::tip
Gå gjennom revisjonsloggen jevnlig, særlig etter at du har tatt imot nye teammedlemmer eller gjort store endringer i konfigurasjonen. Det hjelper deg å oppdage uventet aktivitet tidlig.
:::

## Relaterte artikler

- [Roller og tillatelser](../settings/roles-permissions) -- Administrer hvem som har tilgang til hva
- [Datasikkerhet](../settings/data-security) -- Forstå hvordan dataene dine beskyttes
- [Rapportoversikt](./index.md) -- Se alle tilgjengelige rapporter
