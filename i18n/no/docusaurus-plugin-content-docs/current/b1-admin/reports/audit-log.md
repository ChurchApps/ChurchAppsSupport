---
title: "Revisjonslogg"
description: "Gå gjennom revisjonsloggen i B1 Admin for å se hvem som logget inn, redigerte personregistreringer eller endret tillatelser, og eksporter filtrerte oppføringer til CSV."
---

# Revisjonslogg

<div class="article-intro">

Revisjonsloggen registrerer alle viktige handlinger og endringer i kirkeadministrasjonssystemet ditt. Bruk den til å gå gjennom innloggingsaktivitet, følge med på hvem som har gjort endringer i personregistreringer, overvåke oppdateringer av tillatelser og ha oversikt over ansvar i teamet ditt.

</div>

<div class="prereqs">
<h4>Før du begynner</h4>

- En rolle med tillatelsen **Rediger kirkeinnstillinger** (i delen **Innhold** i en rolles tillatelser; den samme tillatelsen som åpner **Innstillinger**). Se [Roller og tillatelser](../settings/roles-permissions.md).

</div>

## Se revisjonsloggen {#viewing-the-audit-log}

1. Åpne [Hurtigmenyen](../introduction.md#getting-around-with-the-jump-menu) (søkefeltet øverst til venstre i B1 Admin) og utvid **Innstillinger**.
2. Klikk på **Revisjonslogg**.
3. Loggen viser nylige oppføringer i en tabell med følgende kolonner:
   - **Dato** -- Når handlingen skjedde.
   - **Modul** -- Delen av B1 endringen ble gjort i (for eksempel medlemskap eller giving).
   - **Kategori** -- Typen registrering eller handling (fargekodet for rask oversikt).
   - **Handling** -- Hva som ble gjort (f.eks. Gave lagret, Innlogging vellykket, Notat oppdatert).
   - **Enhet** -- Typen og ID-en til registreringen som ble berørt.
   - **IP-adresse** -- IP-adressen til brukeren som utførte handlingen.
4. Klikk på pilen i starten av en rad for å se detaljene: en tabell med hvert endret felt, med **gammel verdi** og **ny verdi**, eller den **slettede registreringen** ved sletting.

## Filtrere loggen {#filtering-the-log}

Bruk filtrene øverst på siden for å begrense resultatene:

- **Modul** -- Filtrer etter område: **Alle moduler**, **Personer**, **Giving**, **Oppmøte**, **Meldinger**, **Innhold**, **Tjeneste** eller **Leksjoner**.
- **Kategori** -- Filtrer etter handlingstype:
  - **Alle kategorier** -- Vis alt.
  - **Innlogging** -- Vellykkede og mislykkede innlogginger.
  - **Personer** -- Opprettelse, oppdatering eller sletting av personregistreringer.
  - **Tillatelser** -- Tildeling og fjerning av tillatelser.
  - **Gaver** -- Endringer i gaveregistreringer.
  - **Grupper** -- Handlinger for gruppeadministrasjon.
  - **Skjemaer** -- Aktivitet for innsendte skjemaer.
  - **Innstillinger** -- Endringer i konfigurasjon.
- **Startdato** -- Vis oppføringer fra og med denne datoen.
- **Sluttdato** -- Vis oppføringer frem til og med denne datoen.

Klikk på **Søk** etter at du har satt filtrene for å oppdatere resultatene.

## Forstå kategoriene {#understanding-categories}

Kategorien for hver oppføring vises som en brikke med farge for rask identifisering:

- **login** -- Blå brikke. Registrerer vellykkede og mislykkede innloggingsforsøk.
- **person** -- Blå brikke. Registrerer opprettelse, oppdatering og sletting av personregistreringer.
- **permission** -- Rød brikke. Registrerer når tilganger gis eller fjernes.
- **donation** -- Grønn brikke. Registrerer endringer i gaveregistreringer.
- **form** -- Oransje brikke. Registrerer aktivitet for innsendte skjemaer.
- **group**, **settings** og andre kategorier (for eksempel **userchurch**) -- Grå brikke.

## Notathistorikk for personer og grupper {#note-history-on-people-and-groups}

Hvis du kan åpne revisjonsloggen, ser du også en oversikt over endrede notater rett der notatene finnes, på fanen **Notater** for en person eller gruppe:

1. Et redigert notat viser **(redigert · vis historikk)** ved siden av datoen. Klikk på det for å åpne revisjonsloggen filtrert til notathistorikken for denne personen eller gruppen.
2. Et slettet notat etterlater en nedtonet markør for **Slettet notat** på sin plass, som viser hvem som skrev det, når det ble lagt ut og når det ble slettet. Klikk på **Vis historikk** for å åpne samme filtrerte logg.
3. I den filtrerte loggen kan du utvide en oppføring for **Notat oppdatert** eller **Notat slettet** for å se den gamle teksten og kontoen som gjorde endringen. Klikk på **Vis alle** for å fjerne filteret.
4. I kolonnen **Enhet** kobler ID-en til et person- eller gruppenotat tilbake til notatene for den personen eller gruppen.

Ansatte som ikke kan åpne revisjonsloggen ser notatlisten uten disse markørene.

## Eksportere loggen {#exporting-the-log}

Når loggoppføringer vises, dukker det opp en knapp for **Eksporter CSV** øverst på siden. Klikk på den for å eksportere de gjeldende filtrerte resultatene til et regneark for gjennomgang offline eller arkivering.

## Paginering {#pagination}

Bruk navigasjonen for sider nederst i tabellen for å bla gjennom resultatene. Du kan vise 25, 50 (standard) eller 100 oppføringer per side.

:::info
Oppføringer i revisjonsloggen lagres automatisk i ett år. Oppføringer som er eldre enn 365 dager fjernes for å holde systemet raskt.
:::

:::tip
Gå gjennom revisjonsloggen regelmessig, særlig etter at nye teammedlemmer er satt i gang eller når du gjør større konfigurasjonsendringer. Den hjelper deg å oppdage uventet aktivitet tidlig.
:::

## Relaterte artikler {#related-articles}

- [Roller og tillatelser](../settings/roles-permissions.md) -- Administrer hvem som har tilgang til hva
- [Datasikkerhet](../settings/data-security.md) -- Forstå hvordan dataene dine er beskyttet
- [Oversikt over rapporter](./index.md) -- Se alle tilgjengelige rapporter
