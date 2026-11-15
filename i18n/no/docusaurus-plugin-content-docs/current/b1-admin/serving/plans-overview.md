---
title: "Planoversikt"
description: "Få et fugleperspektiv på frivillige oppdrag over mange tjenestedatoer i B1 Admin, finn ubesatte posisjoner, og fyll inn eller send e-post til teamet ditt fra ett rutenett."
---

# Planoversikt

<div class="article-intro">

Planoversikten gir deg et fugleperspektiv på alle frivillige oppdrag over flere tjenestedatoer samtidig. I stedet for å åpne hver plan enkeltvis, kan du se hvem som tjener i hver posisjon på tvers av kommende uker i ett rutenett, og raskt finne hull som fortsatt må fylles.

</div>

<div class="prereqs">
<h4>Før du begynner</h4>

- Opprett minst én tjeneste og plantype i tjenesteområdet
- Opprett [gudstjenesteplaner](./plans.md) med datoer og frivillige oppdrag
- Kontroller at de frivillige er lagt til i [personkatalogen](../people/adding-people.md) din

</div>

## Åpne oversikten {#accessing-the-overview}

1. I B1 Admin åpner du [Hurtigmenyen](../introduction.md#getting-around-with-the-jump-menu) (søkefeltet øverst til venstre), utvider **Tjeneste** og klikker på **Planer**.
2. Velg en **fane for tjeneste** øverst på siden.
3. Klikk på **Oversikt** ved siden av plantypen i listen **Plantyper**, eller åpne plantypen og klikk på **Oversikt** øverst på siden.

Oversikten gjelder plantypen du åpnet den fra. Klikk på plantypens navn øverst i oversikten for å gå tilbake til planlisten.

## Lese oversiktsrutenettet {#reading-the-overview-grid}

Oversikten viser et rutenett der:

- **Rader** representerer hver posisjon (f.eks. «Musikk: Gitar», «Teknikk: Projisering») gruppert etter kategori
- **Kolonner** representerer kommende tjenestedatoer (f.eks. «14. apr», «21. apr»)
- **Celler** viser navnet på den frivillige som er tilordnet posisjonen på den datoen

Celler uthevet i **rødt** er ubesatte — ingen frivillig er tilordnet ennå. Dette gjør det enkelt å se bemanningshull med et blikk, uten å åpne hver plan enkeltvis.

:::tip
Navnene til frivillige vises i en forkortet form (fornavn og første bokstav i etternavnet, f.eks. «John D.») for å holde rutenettet kompakt når du har mange posisjoner.
:::

## Tilordne frivillige direkte fra oversikten {#assigning-volunteers-directly-from-the-overview}

Du trenger ikke åpne enkeltplaner for å fylle ledige plasser. Klikk på en hvilken som helst celle i rutenettet for å åpne et tilordningspanel for den posisjonen og datoen. Derfra kan du:

- Klikke på et teammedlems navn for å tilordne dem til posisjonen (eller, for en posisjon uten frivilliggruppe, søke etter hvem som helst i menigheten din)
- Klikke på ikonet **Fjern** (X) ved siden av noen som allerede er tilordnet, og bekrefte, for å ta dem av plassen
- Klikke på **Ferdig** for å lukke panelet uten å forlate oversikten

Dette gjør det mulig å bemanne en hel plan i ett pass — jobbe på tvers av uker og posisjoner uten å navigere inn og ut av enkeltplaner.

## Automatisk planlegging fra oversikten {#auto-scheduling-from-the-overview}

Klikk på **Planlegg automatisk** og bekreft for å la B1 fylle alle ledige, ubesatte plasser i det gjeldende rutenettet på én gang. For hver plan i visningen henter den kandidater fra gruppen knyttet til hver posisjon og fyller tomme plasser automatisk, og rapporterer hvor mange av de synlige planene den klarte å fylle (for eksempel «Planlagt automatisk for 3 av 4 planer»). Posisjoner uten frivilliggruppe hoppes over. Planer fylles én om gangen, slik at den samme frivillige ikke dobbeltbookes på to datoer i samme pass.

:::info
Automatisk planlegging fyller bare plasser som allerede er tomme — den erstatter aldri et eksisterende oppdrag.
:::

## Sende e-post til alle som er planlagt {#emailing-everyone-scheduled}

Klikk på **Send e-post til frivillige** og bekreft for å sende et varsel til hver frivillig som er tilordnet hvor som helst i det gjeldende filtrerte datointervallet og tjenesten, i én handling, i stedet for å sende e-post plan for plan. B1 rapporterer hvor mange e-poster som ble sendt, og hvor mange som feilet.

## Sende tekstmelding til alle som er planlagt {#texting-everyone-scheduled}

Hvis menigheten din har en [tekstmeldingsleverandør](../settings/church-settings.md#texting) koblet til, og du både kan redigere planer og sende tekstmeldinger, vises en knapp for **Send tekstmelding til frivillige** øverst i oversikten.

1. Klikk på **Send tekstmelding til frivillige**.
2. Dialogen viser hvor mange frivillige som vil motta meldingen (for eksempel «12 av 14 frivillige vil motta denne meldingen»), i tillegg til hvor mange som har reservert seg mot tekstmeldinger, og hvor mange som ikke har et telefonnummer registrert.
3. Skriv inn **meldingen** din. Du kan klikke på en plassholder for å sette inn hver frivilligs navn eller menighetens navn.
4. Klikk på **Send**. B1 rapporterer hvor mange tekstmeldinger som ble sendt.

Hver frivillig som er tilordnet i datointervallet, får én tekstmelding på mobilnummeret som står på profilen deres, selv om de tjener på flere datoer. Personer som deler et telefonnummer (for eksempel en familietelefon), får bare én tekstmelding. Frivillige som svarte STOP på en tidligere melding, hoppes over.

:::info
Tekstmeldinger sendes gjennom menighetens egen tekstmeldingsleverandør, så prisene deres gjelder. Hvis menigheten din er tom for tekstmeldingskreditt, stopper sendingen, og dialogen forteller deg det. En enkelt sending når maksimalt 200 frivillige; begrens datointervallet hvis du har flere.
:::

## Fremheve en frivilligs plan {#highlighting-a-volunteers-schedule}

Bruk nedtrekkslisten **Fremhev** for å velge en person fra teamet ditt — hver celle der de er tilordnet, blir markert i rutenettet, slik at du kan se alle stedene de allerede tjener før du legger dem til i en annen plass. Velg **Alle** for å slå av fremhevingen.

## Filtrere oversikten {#filtering-the-overview}

Du kan justere hva oversikten viser ved hjelp av kontrollene over rutenettet. Rutenettet oppdateres så snart du endrer dem.

- **Alle posisjoner / Bare ubesatte** — Velg **Bare ubesatte** for å skjule rader der alle datoer allerede er fylt, slik at du kan fokusere på posisjoner som fortsatt trenger en frivillig.
- **Startdato / Sluttdato** — Som standard viser oversikten 12 uker fram i tid. Skriv inn egendefinerte datoer for å utvide eller begrense intervallet.

## Eksportere til CSV {#exporting-to-csv}

Klikk på **Eksporter CSV** for å laste ned det gjeldende rutenettet som et regneark. Eksporten inkluderer alle posisjoner og frivillige oppdrag for det filtrerte datointervallet, noe som gjør det enkelt å dele med ledere i tjenesten eller skrive ut til planleggingsmøter.

:::info
CSV-eksporten gjenspeiler filtrene som er brukt akkurat nå — bare datoene og plantypen som vises i rutenettet, er med i nedlastingen.
:::

## Relaterte artikler {#related-articles}

- [Gudstjenesteplaner](./plans.md) — Opprett og administrer enkeltplaner for gudstjenester
- [Gudstjenesterekkefølge](./service-order.md) — Bygg gudstjenesterekkefølgen innenfor en plan
- [Planlegge leksjoner](./scheduling-lessons.md) — Planlegg leksjoner sammen med gudstjenesteplanene dine
