---
title: "Oppmøterapporter"
---

# Oppmøterapporter

<div class="article-intro">

B1 Admin tilbyr tre oppmøterapporter som hjelper deg å forstå hvordan folk engasjerer seg i gudstjenestene og gruppene dine. Hver rapport gir et annet perspektiv på oppmøtedataene dine, fra overordnede trender til daglige oversikter.

</div>

<div class="prereqs">
<h4>Før du begynner</h4>

- Sørg for at oppmøte [føres konsekvent](../attendance/tracking-attendance.md) for gudstjenestene og gruppene dine
- Sørg for at [gruppene](../groups/creating-groups.md) og gudstjenestene dine er konfigurert i B1 Admin
- Du trenger de riktige [tillatelsene](../settings/roles-permissions.md) for å åpne rapportene

</div>

## Oppmøtetrend

Rapporten Oppmøtetrend viser hvordan oppmøtet endrer seg over tid for gudstjenestene dine.

1. Gå direkte til **admin.b1.church/reports/attendanceTrend** i nettleseren din (rapporter har ingen oppføring i navigasjonsmenyen — det enkleste er å bokmerke adressen for å komme tilbake til den). Den samme rapporten finnes også på Oppmøte-siden: klikk **Alle år**, og velg deretter fanen **Oppmøtetrend**.
2. Velg eventuelt en **Kampus**, **Gudstjeneste**, **Gudstjenestetid** eller **Gruppe** for å filtrere resultatene.
3. Angi **Startdato** og **Sluttdato**. Som standard dekker rapporten det siste året, fra ett år siden til i dag, og sluttdatoen er inkludert i sin helhet. Klikk **Kjør rapport**.
4. Rapporten viser et stolpediagram og en tabell med totalt antall besøk per uke. Hver uke merkes med datoen for søndagen i den uken, og kolonnen **Øktdatoer** i tabellen lister de faktiske datoene i den uken som hadde oppmøte (for eksempel «27.9, 30.9»).

Denne rapporten er nyttig for å oppdage mønstre som sesongmessige nedganger, vekst eller effekten av spesielle arrangementer.

## Gruppeoppmøte

Rapporten Gruppeoppmøte viser hvem som deltok på hver gruppeøkt i et datointervall.

1. Gå direkte til **admin.b1.church/reports/groupAttendance** i nettleseren din, eller klikk **Alle år** på Oppmøte-siden og velg fanen **Gruppeoppmøte**.
2. Velg eventuelt en **Kampus** og **Gudstjeneste**.
3. Angi **Startdato** og **Sluttdato**. Som standard dekker rapporten fra siste søndag til i dag, og sluttdatoen er inkludert i sin helhet.
4. Klikk **Kjør rapport**.

Resultatene grupperes etter øktdato, deretter gudstjenestetid, deretter gruppe, med personene som deltok listet under hver gruppe. Gudstjenestetider, grupper og navn sorteres alfabetisk. Ved siden av hvert navn viser kolonnen **Innsjekket** tidspunktet oppmøtet ble registrert (tomt når det ikke finnes et tidspunkt), og kolonnen **Medlemsstatus** viser statusen deres, for eksempel Medlem eller Besøkende. Økter for grupper som ikke møtes på en gudstjenestetid er også med; de vises uten gudstjenestetid.

For å laste ned et regneark, klikk **Nedlastingsalternativer** og velg **Sammendrag**. CSV-filen har:

- Én rad per medlem av hver gruppe som møttes i datointervallet, sortert etter gruppe og deretter navn.
- Personens navn og gruppenavnet i de første kolonnene.
- Én kolonne per datert økt, navngitt med gudstjenesten, gudstjenestetiden og datoen (for eksempel «Søndag - 09:00 (2026-09-27)»), med hver person markert **tilstede** eller **fraværende**. En økt uten gudstjenestetid navngis kun med datoen.

Bruk denne rapporten til å sammenligne oppmøte på tvers av grupper og finne ut hvilke grupper som vokser eller trenger oppmerksomhet.

## Daglig gruppeoppmøte

Rapporten Daglig gruppeoppmøte (med tittelen **Gruppeoppmøte etter dag**) gir en dag-for-dag-telling av hvor mange personer som deltok i én gruppe.

1. Gå direkte til **admin.b1.church/reports/dailyGroupAttendance** i nettleseren din.
2. Bruk nedtrekkslistene **Kampus**, **Gudstjeneste** og **Gudstjenestetid** for å snevre inn listen, og velg deretter **Gruppen** du vil se på.
3. Kjør rapporten. Den lister opp hver dag gruppen møttes, eldste først, med **Dato** og antallet **Deltakere** registrert den dagen.

Denne rapporten gir detaljert innsikt, og er nyttig for å forstå variasjon fra uke til uke eller for å identifisere spesifikke dager med uvanlig høyt eller lavt oppmøte.

:::tip
Bruk rapporten Oppmøtetrend for en overordnet oversikt, og rapporten Daglig gruppeoppmøte når du trenger å gå i dybden på bestemte datoer.
:::

## Praktisk bruk

- **Planlegging** — bruk oppmøtetrender til å planlegge sitteplasser, bemanning og ressurser for kommende gudstjenester.
- **Oppsøking** — oppdag tegn på synkende oppmøte tidlig, slik at du kan følge opp medlemmer.
- **Styrerapporter** — ta med oppmøtedata i de regelmessige lederrapportene dine for å vise hvordan tjenesten har det.
- **Evaluering av arrangementer** — sammenlign oppmøte før og etter spesielle arrangementer for å måle effekten.

:::warning
Oppmøtedata registreres gjennom innsjekkingsprosessene for gruppene og gudstjenestene dine. Hvis oppmøte ikke føres konsekvent, vil ikke rapportene dine gjenspeile den faktiske deltakelsen. Se [Følge opp oppmøte](../attendance/tracking-attendance.md) for oppsettsinstruksjoner.
:::
