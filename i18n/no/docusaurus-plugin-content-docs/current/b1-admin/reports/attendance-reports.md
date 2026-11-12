---
title: "Oppmøterapporter"
description: "Få tilgang til B1 Admins tre oppmøterapporter (Oppmøtetrend, Gruppeoppmøte, Daglig gruppeoppmøte) og se hva hver enkelt viser, med trinn for å kjøre og eksportere dem."
---

# Oppmøterapporter

<div class="article-intro">

B1 Admin har tre oppmøterapporter som hjelper deg å forstå hvordan folk deltar i gudstjenestene og gruppene dine. Hver rapport gir et annet perspektiv på oppmøtedataene, fra overordnede trender til daglige oversikter.

</div>

<div class="prereqs">
<h4>Før du begynner</h4>

- Sørg for at oppmøte blir [registrert konsekvent](../attendance/tracking-attendance.md) for gudstjenestene og gruppene dine
- Kontroller at [gruppene](../groups/creating-groups.md) og gudstjenestene dine er satt opp i B1 Admin
- Du trenger riktige [tillatelser](../settings/roles-permissions.md) for å åpne rapportene

</div>

## Oppmøtetrend {#attendance-trend}

Rapporten Oppmøtetrend viser hvordan oppmøtet for gudstjenestene dine endrer seg over tid.

1. Gå direkte til **admin.b1.church/reports/attendanceTrend** i nettleseren din (rapportene har ingen oppføring i navigasjonsmenyen, så det enkleste er å bokmerke adressen). Rapporten finnes også på siden for oppmøte: klikk på **Alle år**, og velg deretter fanen **Oppmøtetrend**.
2. Du kan eventuelt velge en **menighetsenhet**, **gudstjeneste**, **gudstjenestetid** eller **gruppe** for å filtrere resultatene.
3. Angi **startdato** og **sluttdato**. Som standard dekker rapporten det siste året, fra ett år siden og til i dag, og sluttdatoen er med hele veien. Klikk på **Kjør rapport**.
4. Rapporten viser et stolpediagram og en tabell med totalt antall besøk per uke. Hver uke er merket med datoen for søndagen i den uken, og kolonnen **Sesjonsdatoer** i tabellen viser de faktiske datoene i uken som hadde oppmøte (for eksempel «9/27, 9/30»).

Denne rapporten er nyttig for å oppdage mønstre som sesongsvingninger, vekst eller effekten av spesielle arrangementer.

:::tip
Visningen **Alle år** på siden for oppmøte har også en fane for **Medlemstall-trend** mellom de to andre. Den viser diagram over de samlede medlemstallene du legger inn manuelt (i stedet for enkeltregistreringer) for hver uke. Den har de samme filtrene for **Menighetsenhet**, **Gudstjeneste**, **Gudstjenestetid** og **Gruppe**.
:::

## Gruppeoppmøte {#group-attendance}

Rapporten Gruppeoppmøte viser hvem som deltok på hver gruppesamling i et gitt datointervall.

1. Gå direkte til **admin.b1.church/reports/groupAttendance** i nettleseren din, eller klikk på **Alle år** på siden for oppmøte og velg fanen **Gruppeoppmøte**.
2. Du kan eventuelt velge en **menighetsenhet** og en **gudstjeneste**.
3. Angi **startdato** og **sluttdato**. Som standard dekker rapporten fra siste søndag til i dag, og sluttdatoen er med hele veien.
4. Klikk på **Kjør rapport**.

Resultatene er gruppert etter sesjonsdato, deretter gudstjenestetid, deretter gruppe, med personene som deltok listet under hver gruppe. Gudstjenestetider, grupper og navn er sortert alfabetisk. Ved siden av hvert navn viser kolonnen **Registrert** tidspunktet oppmøtet ble registrert (tom når det ikke finnes et tidspunkt), og kolonnen **Medlemsstatus** viser statusen, for eksempel Medlem eller Gjest. Sesjoner for grupper som ikke samles på en bestemt gudstjenestetid er også med; de vises uten gudstjenestetid.

For å laste ned et regneark klikker du på **Nedlastingsalternativer** og velger **Sammendrag**. CSV-filen inneholder:

- En rad per medlem av hver gruppe som samlet seg i datointervallet, sortert etter gruppe og deretter navn.
- Personens navn og gruppenavnet i de første kolonnene.
- Én kolonne per datert sesjon, navngitt etter gudstjeneste, gudstjenestetid og dato (for eksempel «Søndag - 09:00 (2026-09-27)»), der hver person er markert som **til stede** eller **fraværende**. En sesjon uten gudstjenestetid får bare datoen som navn.

Bruk denne rapporten til å sammenligne oppmøte mellom grupper og finne ut hvilke grupper som vokser, eller som trenger oppmerksomhet.

## Daglig gruppeoppmøte {#daily-group-attendance}

Rapporten Daglig gruppeoppmøte (med tittelen **Gruppeoppmøte etter dag**) gir en daglig telling av hvor mange personer som deltok i én gruppe.

1. Gå direkte til **admin.b1.church/reports/dailyGroupAttendance** i nettleseren din.
2. Bruk nedtrekkslistene **Menighetsenhet**, **Gudstjeneste** og **Gudstjenestetid** for å begrense listen, og velg deretter **gruppen** du vil se på.
3. Kjør rapporten. Den lister opp hver dag gruppen samlet seg, eldste først, med **dato** og antall **deltakere** registrert den dagen.

Denne rapporten gir detaljert innsikt, og er nyttig for å forstå variasjon fra uke til uke eller for å finne bestemte dager med uvanlig høyt eller lavt oppmøte.

:::tip
Bruk rapporten Oppmøtetrend for en overordnet oversikt, og rapporten Daglig gruppeoppmøte når du trenger å gå i dybden på bestemte datoer.
:::

## Praktisk bruk {#practical-uses}

- **Planlegging** -- Bruk oppmøtetrender til å planlegge plassering, bemanning og ressurser til kommende gudstjenester.
- **Oppsøkende arbeid** -- Oppdag tidlig avtagende oppmøte, slik at du kan følge opp medlemmer.
- **Styrerapporter** -- Ta med oppmøtedata i de faste lederrapportene for å vise hvor sunn tjenesten er.
- **Evaluering av arrangementer** -- Sammenlign oppmøte før og etter spesielle arrangementer for å måle effekten.

:::warning
Oppmøtedata registreres gjennom innsjekkingsprosessene for gruppene og gudstjenestene dine. Hvis oppmøte ikke registreres konsekvent, vil ikke rapportene gi et riktig bilde av faktisk deltakelse. Se [Registrere oppmøte](../attendance/tracking-attendance.md) for oppsettsinstruksjoner.
:::
