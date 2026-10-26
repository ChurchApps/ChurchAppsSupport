---
title: "Oppmøterapporter"
---

# Oppmøterapporter

<div class="article-intro">

B1 Admin tilbyr tre oppmøterapporter som hjelper deg å forstå hvordan folk deltar i gudstjenestene og gruppene dine. Hver rapport gir et annet perspektiv på oppmøtedataene dine, fra overordnede trender til daglige oversikter.

</div>

<div class="prereqs">
<h4>Før du begynner</h4>

- Sørg for at oppmøte [registreres konsekvent](../attendance/tracking-attendance.md) for gudstjenestene og gruppene dine
- Sørg for at [gruppene](../groups/creating-groups.md) og gudstjenestene dine er konfigurert i B1 Admin
- Du trenger de riktige [tillatelsene](../settings/roles-permissions.md) for å åpne rapporter

</div>

## Oppmøtetrend

Rapporten Attendance Trend viser hvordan oppmøtet endrer seg over tid for gudstjenestene dine.

1. Gå direkte til **admin.b1.church/reports/attendanceTrend** i nettleseren din (rapporter har ingen oppføring i navigasjonsmenyen — det enkleste er å bokmerke adressen for å komme tilbake til den). Den samme rapporten finnes også på Attendance-siden: klikk på **All years**, og velg deretter fanen **Attendance Trend**.
2. Velg eventuelt et **Campus**, en **Service**, et **Service Time** eller en **Group** for å filtrere resultatene.
3. Angi **Start Date** og **End Date**. Som standard dekker rapporten det siste året, fra ett år siden og til i dag, og sluttdatoen tas med i sin helhet. Klikk på **Run Report**.
4. Rapporten viser et stolpediagram og en tabell med totalt antall besøk per uke. Hver uke er merket med datoen for den ukens søndag, og tabellens kolonne **Session Dates** lister de faktiske datoene i den uken som hadde oppmøte (for eksempel «9/27, 9/30»).

Denne rapporten er nyttig for å oppdage mønstre som sesongsvingninger, vekst eller effekten av spesielle arrangementer.

## Gruppeoppmøte

Rapporten Group Attendance viser hvem som deltok på hver gruppesamling i et datointervall.

1. Gå direkte til **admin.b1.church/reports/groupAttendance** i nettleseren din, eller klikk på **All years** på Attendance-siden og velg fanen **Group Attendance**.
2. Velg eventuelt et **Campus** og en **Service**.
3. Angi **Start Date** og **End Date**. Som standard dekker rapporten fra siste søndag til i dag, og sluttdatoen tas med i sin helhet.
4. Klikk på **Run Report**.

Resultatene er gruppert etter samlingsdato, deretter gudstjenestetidspunkt, deretter gruppe, med personene som deltok listet under hver gruppe. Gudstjenestetidspunkter, grupper og navn er sortert alfabetisk. Ved siden av hver persons navn viser kolonnen **Checked In** tidspunktet oppmøtet ble registrert (tomt når det ikke finnes noe tidspunkt), og kolonnen **Membership Status** viser statusen deres, for eksempel Member eller Visitor.

For å laste ned et regneark, klikk på **Download Options** og velg **Summary**. CSV-filen har:

- En rad per medlem av hver gruppe som møttes i datointervallet, sortert etter gruppe og deretter navn.
- Personens navn og gruppenavnet i de første kolonnene.
- En kolonne per datert samling, navngitt med gudstjeneste, gudstjenestetidspunkt og dato (for eksempel «Sunday - 9:00 AM (2026-09-27)»), der hver person er markert som **present** eller **absent**.

Bruk denne rapporten til å sammenligne oppmøte mellom grupper og identifisere hvilke grupper som vokser eller trenger oppfølging.

## Daglig gruppeoppmøte

Rapporten Daily Group Attendance (med tittelen **Group attendance by day**) gir en teller for hver dag som viser hvor mange som deltok i én gruppe.

1. Gå direkte til **admin.b1.church/reports/dailyGroupAttendance** i nettleseren din.
2. Bruk nedtrekkslistene **Campus**, **Service** og **Service Time** for å snevre inn listen, og velg deretter **Group** du vil gå gjennom.
3. Kjør rapporten. Den lister opp hver dag gruppen møttes, eldste først, med **Date** og antallet **Attendees** registrert den dagen.

Denne rapporten gir detaljert innsikt, som er nyttig for å forstå variasjoner fra uke til uke eller identifisere bestemte dager med uvanlig høyt eller lavt oppmøte.

:::tip
Bruk rapporten Attendance Trend for en overordnet oversikt, og rapporten Daily Group Attendance når du trenger å dykke ned i bestemte datoer.
:::

## Praktisk bruk

- **Planlegging** -- Bruk oppmøtetrender til å planlegge sitteplasser, bemanning og ressurser for kommende gudstjenester.
- **Oppsøkende arbeid** -- Oppdag tidlig nedgang i oppmøtet slik at du kan følge opp medlemmer.
- **Styrerapporter** -- Ta med oppmøtedata i de regelmessige lederrapportene dine for å vise hvordan menighetens arbeid går.
- **Evaluering av arrangementer** -- Sammenlign oppmøte før og etter spesielle arrangementer for å måle effekten.

:::warning
Oppmøtedata registreres gjennom innsjekkingsprosessene for gruppene og gudstjenestene dine. Hvis oppmøte ikke registreres konsekvent, vil ikke rapportene dine gjenspeile det faktiske deltakelsesnivået. Se [Følge oppmøte](../attendance/tracking-attendance.md) for oppsettsinstruksjoner.
:::
