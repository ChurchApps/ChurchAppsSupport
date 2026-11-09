---
title: "Revisjonslogg"
description: "Gå gjennom revisjonsloggen i B1 Admin for å se hvem som logget inn, redigerte personposter eller endret tillatelser, og eksporter filtrerte oppføringer til CSV."
---

# Revisjonslogg

<div class="article-intro">

Revisjonsloggen registrerer alle viktige handlinger og endringer i menighetens administrasjonssystem. Bruk den til å gå gjennom innloggingsaktivitet, følge med på hvem som har endret personposter, overvåke endringer i tillatelser og opprettholde ansvarlighet i teamet ditt.

</div>

<div class="prereqs">
<h4>Før du begynner</h4>

- B1 Admin-konto med tilgang som serveradministrator
- Gå til **Innstillinger** for å finne revisjonsloggen

</div>

## Vise revisjonsloggen

1. Åpne [hurtigmenyen](../introduction.md#getting-around-with-the-jump-menu) (søkefeltet øverst til venstre i B1 Admin) og utvid **Innstillinger**.
2. Klikk **Revisjonslogg**.
3. Loggen viser nylige oppføringer i en tabell med følgende kolonner:
   - **Dato** -- Når handlingen skjedde.
   - **Kategori** -- Typen handling (fargekodet for rask oversikt).
   - **Handling** -- Hva som ble gjort (for eksempel create, update, delete, login_success).
   - **Enhet** -- Typen og ID-en til posten som ble berørt.
   - **IP-adresse** -- IP-adressen til brukeren som utførte handlingen.
   - **Detaljer** -- Et sammendrag av de konkrete endringene som ble gjort.

## Filtrere loggen

Bruk filtrene øverst på siden for å snevre inn resultatene:

- **Kategori** -- Filtrer etter type handling:
  - **Alle kategorier** -- Vis alt.
  - **Innlogging** -- Vellykkede og mislykkede innlogginger.
  - **Personer** -- Opprette, oppdatere eller slette personposter.
  - **Tillatelser** -- Tildeling og fjerning av tillatelser.
  - **Donasjoner** -- Endringer i donasjonsposter.
  - **Grupper** -- Handlinger for gruppeadministrasjon.
  - **Skjemaer** -- Aktivitet for skjemainnsendinger.
  - **Innstillinger** -- Endringer i konfigurasjonen.
- **Startdato** -- Vis oppføringer fra og med denne datoen.
- **Sluttdato** -- Vis oppføringer frem til og med denne datoen.

Klikk **Søk** etter at du har satt filtrene for å oppdatere resultatene.

## Forstå kategoriene

Hver kategori er fargekodet for rask identifisering:

- **Innlogging** -- Blå brikke. Registrerer vellykkede og mislykkede innloggingsforsøk.
- **Personer** -- Lilla brikke. Registrerer opprettelse, oppdatering og sletting av personposter.
- **Tillatelser** -- Rød brikke. Registrerer når tilganger gis eller fjernes.
- **Donasjoner** -- Grønn brikke. Registrerer endringer i donasjonsposter.
- **Grupper** -- Grå brikke. Registrerer handlinger for gruppeadministrasjon.
- **Skjemaer** -- Oransje brikke. Registrerer aktivitet for skjemainnsendinger.
- **Innstillinger** -- Gul brikke. Registrerer endringer i konfigurasjonen.

## Notathistorikk på personer og grupper

Hvis du kan åpne revisjonsloggen, ser du også en oversikt over endrede notater rett der notatene finnes, på en persons eller gruppes fane **Notater**:

1. Et redigert notat viser **(redigert · vis historikk)** ved siden av datoen. Klikk på det for å åpne revisjonsloggen filtrert til notathistorikken for den personen eller gruppen.
2. Et slettet notat etterlater en nedtonet markering **Slettet notat** i stedet, som viser hvem som skrev det, når det ble lagt ut, og når det ble slettet. Klikk **Vis historikk** for å åpne samme filtrerte logg.
3. I den filtrerte loggen utvider du en oppføring for **Notat oppdatert** eller **Notat slettet** for å se den gamle teksten og kontoen som gjorde endringen. Klikk **Vis alle** for å fjerne filteret.
4. I kolonnen **Enhet** lenker ID-en til et person- eller gruppenotat tilbake til den personens eller gruppens notater.

Ansatte som ikke kan åpne revisjonsloggen, ser notatlisten uten disse markeringene.

## Eksportere loggen

Når loggoppføringer vises, dukker det opp en knapp for **CSV-nedlasting**. Klikk på den for å eksportere de gjeldende filtrerte resultatene til et regneark for gjennomgang offline eller arkivering.

## Paginering

Bruk sidekontrollene nederst i tabellen for å bla gjennom resultatene. Du kan vise 25, 50 eller 100 oppføringer per side.

:::info
Oppføringer i revisjonsloggen lagres automatisk i ett år. Oppføringer som er eldre enn 365 dager, fjernes for å holde systemet raskt.
:::

:::tip
Gå gjennom revisjonsloggen jevnlig, særlig etter at du har tatt inn nye teammedlemmer eller gjort større endringer i konfigurasjonen. Det hjelper deg å oppdage uventet aktivitet tidlig.
:::

## Relaterte artikler

- [Roller og tillatelser](../settings/roles-permissions.md) -- Administrer hvem som har tilgang til hva
- [Datasikkerhet](../settings/data-security.md) -- Forstå hvordan dataene dine er beskyttet
- [Oversikt over rapporter](./index.md) -- Se alle tilgjengelige rapporter
