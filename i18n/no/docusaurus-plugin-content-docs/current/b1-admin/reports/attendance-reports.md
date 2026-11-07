---
title: "Oppmøterapporter"
description: "Bruk de tre oppmøterapportene i B1 Admin (Attendance Trend, Group Attendance, Daily Group Attendance), se hva hver viser, og kjør og eksporter dem."
---

# Oppmøterapporter

<div class="article-intro">

B1 Admin tilbyr tre oppmøterapporter som hjelper deg å forstå hvordan folk engasjerer seg i gudstjenestene og gruppene dine. Hver rapport gir et annet perspektiv på oppmøtedataene dine, fra overordnede trender til daglige oversikter.

</div>

<div class="prereqs">
<h4>Før du begynner</h4>

- Sørg for at oppmøte [følges konsekvent](../attendance/tracking-attendance.md) for gudstjenestene og gruppene dine
- Kontroller at [gruppene](../groups/creating-groups.md) og gudstjenestene dine er konfigurert i B1 Admin
- Du trenger de riktige [tillatelsene](../settings/roles-permissions.md) for å åpne rapportene

</div>

## Oppmøtetrend

Rapporten Oppmøtetrend viser hvordan oppmøtet endrer seg over tid for gudstjenestene dine.

1. Gå direkte til **admin.b1.church/reports/attendanceTrend** i nettleseren din (rapporter har ingen oppføring i navigasjonsmenyen -- det enkleste er å bokmerke adressen for å komme tilbake til den). Den samme rapporten finnes også på siden Oppmøte: klikk **Alle år**, og velg deretter fanen **Oppmøtetrend**.
2. Velg eventuelt et **kirkested**, en **gudstjeneste**, en **gudstjenestetid** eller en **gruppe** for å filtrere resultatene.
3. Angi **startdato** og **sluttdato**. Som standard dekker rapporten det siste året, fra ett år siden til i dag, og sluttdatoen tas med i sin helhet. Klikk **Kjør rapport**.
4. Rapporten viser et søylediagram og en tabell med totale besøk per uke. Hver uke er merket med datoen for den ukens søndag, og kolonnen **Gudstjenestedatoer** i tabellen lister de faktiske datoene i den uken som hadde oppmøte (for eksempel «9/27, 9/30»).

Denne rapporten er nyttig for å oppdage mønstre som sesongnedgang, vekst eller effekten av spesielle arrangementer.

## Gruppeoppmøte {#group-attendance}

Rapporten Gruppeoppmøte viser hvem som deltok på hver gruppesamling i et datointervall.

1. Gå direkte til **admin.b1.church/reports/groupAttendance** i nettleseren din, eller klikk på siden Oppmøte **Alle år** og velg fanen **Gruppeoppmøte**.
2. Velg eventuelt et **kirkested** og en **gudstjeneste**.
3. Angi **startdato** og **sluttdato**. Som standard dekker rapporten fra forrige søndag til i dag, og sluttdatoen tas med i sin helhet.
4. Klikk **Kjør rapport**.

Resultatene grupperes etter øktdato, deretter gudstjenestetid, deretter gruppe, med personene som deltok listet under hver gruppe. Gudstjenestetider, grupper og navn sorteres alfabetisk. Ved siden av hvert navn viser kolonnen **Sjekket inn** tidspunktet oppmøtet ble registrert (tom når det ikke finnes noe klokkeslett), og kolonnen **Medlemsstatus** viser statusen deres, for eksempel Medlem eller Besøkende. Økter for grupper som ikke samles på en gudstjenestetid er også med; de vises uten gudstjenestetid.

For å laste ned et regneark, klikker du **Nedlastingsalternativer** og velger **Sammendrag**. CSV-filen har:

- Én rad per medlem av hver gruppe som samlet seg i datointervallet, sortert etter gruppe og deretter navn.
- Personens navn og gruppenavnet i de første kolonnene.
- Én kolonne per datert økt, navngitt med tjeneste, gudstjenestetid og dato (for eksempel «Søndag - 09.00 (2026-09-27)»), der hver person er merket **til stede** eller **fraværende**. En økt uten gudstjenestetid får bare datoen som navn.

Bruk denne rapporten til å sammenligne oppmøte på tvers av grupper og identifisere hvilke grupper som vokser eller trenger oppmerksomhet.

## Daglig gruppeoppmøte

Rapporten Daglig gruppeoppmøte (med tittelen **Gruppeoppmøte per dag**) gir en teller dag for dag over hvor mange som deltok i én gruppe.

1. Gå direkte til **admin.b1.church/reports/dailyGroupAttendance** i nettleseren din.
2. Bruk nedtrekkslistene **Kirkested**, **Gudstjeneste** og **Gudstjenestetid** for å snevre inn listen, og velg deretter **gruppen** du vil gjennomgå.
3. Kjør rapporten. Den lister opp hver dag gruppen samlet seg, eldste først, med **datoen** og antallet **deltakere** registrert den dagen.

Denne rapporten gir detaljert innsikt, som er nyttig for å forstå variasjon fra uke til uke eller å identifisere bestemte dager med uvanlig høyt eller lavt oppmøte.

:::tip
Bruk rapporten Oppmøtetrend for en overordnet oversikt, og rapporten Daglig gruppeoppmøte når du trenger å gå i dybden på bestemte datoer.
:::

## Praktisk bruk

- **Planlegging** -- Bruk oppmøtetrender til å planlegge plasser, bemanning og ressurser for kommende gudstjenester.
- **Oppsøkende arbeid** -- Oppdag tidlig nedgang i oppmøte, slik at du kan følge opp medlemmene.
- **Styrerapporter** -- Ta med oppmøtedata i de regelmessige lederrapportene dine for å vise hvordan tjenesten har det.
- **Evaluering av arrangementer** -- Sammenlign oppmøte før og etter spesielle arrangementer for å måle effekten.

:::warning
Oppmøtedata registreres gjennom gruppene og innsjekkingsprosessene for gudstjenestene dine. Hvis oppmøte ikke følges konsekvent, vil ikke rapportene dine gjenspeile den faktiske deltakelsen riktig. Se [Følge opp oppmøte](../attendance/tracking-attendance.md) for oppsettsinstruksjoner.
:::
