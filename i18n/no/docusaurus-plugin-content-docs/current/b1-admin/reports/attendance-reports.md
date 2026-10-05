---
title: "Oppmøterapporter"
---

# Oppmøterapporter

<div class="article-intro">

B1 Admin har tre oppmøterapporter som hjelper deg å forstå hvordan folk engasjerer seg i gudstjenestene og gruppene dine. Hver rapport gir et ulikt perspektiv på oppmøtedataene, fra overordnede trender til oppdelinger dag for dag.

</div>

<div class="prereqs">
<h4>Før du begynner</h4>

- Sørg for at oppmøtet blir [registrert jevnlig](../attendance/tracking-attendance.md) for gudstjenestene og gruppene dine
- Sørg for at [gruppene](../groups/creating-groups.md) og gudstjenestene dine er konfigurert i B1 Admin
- Du trenger de nødvendige [tillatelsene](../settings/roles-permissions.md) for å få tilgang til rapporter

</div>

## Oppmøtetrend

Rapporten Oppmøtetrend viser hvordan oppmøtet endrer seg over tid for gudstjenestene dine.

1. Gå direkte til **admin.b1.church/reports/attendanceTrend** i nettleseren (rapporter har ingen oppføring i navigasjonsmenyen — det enkleste er å lage et bokmerke for adressen). Den samme rapporten finnes også i fanen **Oppmøtetrend** på siden Oppmøte.
2. Velg eventuelt en **Menighet**, **Gudstjeneste**, **Gudstjenestetidspunkt** eller **Gruppe** for å filtrere resultatene.
3. Angi **Startdato** og **Sluttdato**. Som standard dekker rapporten det siste året, fra ett år siden til og med i dag, og sluttdatoen er med i sin helhet. Klikk på **Kjør rapport**.
4. Rapporten viser et stolpediagram og en tabell over totalt antall besøk per uke. Hver uke er merket med datoen for ukens søndag, og kolonnen **Øktdatoer** i tabellen viser de faktiske datoene i uken som hadde oppmøte (for eksempel «9/27, 9/30»).

Denne rapporten er nyttig for å oppdage mønstre som sesongbaserte nedganger, vekstutvikling eller virkningen av spesielle arrangementer.

## Gruppeoppmøte

Rapporten Gruppeoppmøte viser hvem som var til stede på hver gruppesamling i en datoperiode.

1. Gå direkte til **admin.b1.church/reports/groupAttendance** i nettleseren, eller åpne fanen **Gruppeoppmøte** på siden Oppmøte.
2. Velg eventuelt en **Menighet** og en **Gudstjeneste**.
3. Angi **Startdato** og **Sluttdato**. Som standard dekker rapporten fra siste søndag til og med i dag, og sluttdatoen er med i sin helhet.
4. Klikk på **Kjør rapport**.

Resultatene grupperes etter øktdato, deretter gudstjenestetidspunkt og så gruppe, med de som var til stede oppført under hver gruppe. Gudstjenestetidspunkt, grupper og navn sorteres alfabetisk. Ved siden av hver persons navn viser kolonnen **Innsjekket** tidspunktet oppmøtet ble registrert (tom hvis det ikke finnes noe tidspunkt), og kolonnen **Medlemsstatus** viser statusen deres, for eksempel Medlem eller Besøkende.

For å laste ned et regneark klikker du på **Nedlastingsalternativer** og velger **Sammendrag**. CSV-filen har:

- Én rad per medlem i hver gruppe som møttes i datoperioden, sortert etter gruppe og deretter navn.
- Personens navn og gruppenavnet i de første kolonnene.
- Én kolonne per daterte økt, navngitt med gudstjeneste, gudstjenestetidspunkt og dato (for eksempel «Sunday - 9:00 AM (2026-09-27)»), der hver person er markert som **til stede** eller **fraværende**.

Bruk denne rapporten til å sammenligne oppmøtet på tvers av grupper og se hvilke grupper som vokser eller trenger oppmerksomhet.

## Daglig gruppeoppmøte

Rapporten Daglig gruppeoppmøte gir en dag-for-dag-oppdeling av oppmøtedataene for gruppene dine.

1. Gå direkte til **admin.b1.church/reports/dailyGroupAttendance** i nettleseren.
2. Angi **datoperioden** for rapporten.
3. Velg **gruppen(e)** du vil gå gjennom.
4. Rapporten viser oppmøtetall for hver enkelt dag i perioden.

Denne rapporten gir detaljert innsikt, noe som er nyttig for å forstå variasjoner fra uke til uke eller finne bestemte dager med uvanlig høyt eller lavt oppmøte.

:::tip
Bruk rapporten Oppmøtetrend for en overordnet oversikt, og rapporten Daglig gruppeoppmøte når du trenger å se nærmere på bestemte datoer.
:::

## Praktiske bruksområder

- **Planlegging** -- Bruk oppmøtetrender til å planlegge sitteplasser, bemanning og ressurser til kommende gudstjenester.
- **Omsorg og oppfølging** -- Oppdag mønstre med synkende oppmøte tidlig, slik at du kan følge opp medlemmene.
- **Styrerapporter** -- Ta med oppmøtedata i de jevnlige rapportene til ledelsen for å vise hvordan det står til i arbeidet.
- **Evaluering av arrangementer** -- Sammenlign oppmøtet før og etter spesielle arrangementer for å måle effekten.

:::warning
Oppmøtedata registreres gjennom innsjekkingen i gruppene og gudstjenestene dine. Hvis oppmøtet ikke registreres jevnlig, gjenspeiler ikke rapportene det faktiske deltakelsen. Se [Registrere oppmøte](../attendance/tracking-attendance.md) for veiledning i oppsett.
:::
