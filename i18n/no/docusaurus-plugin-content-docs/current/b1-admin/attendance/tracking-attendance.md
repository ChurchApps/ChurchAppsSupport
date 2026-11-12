---
title: "Følge oppmøte"
description: "Gjennomgå trender for oppmøte, filtrer rapporter etter menighet, gudstjeneste eller gruppe, og eksporter gruppeoppmøte fra siden Attendance i B1 Admin."
---

# Følge oppmøte

<div class="article-intro">

Når menighetene, gudstjenestetidspunktene og gruppene dine er satt opp, gjør B1 Admin det enkelt å gjennomgå oppmøtedata og oppdage trender. Siden Attendance åpnes med et sammendrag av dette ukens oppmøte, og rapportene under **All years** gir to hovedvisninger – fanen **Attendance Trend** for trender i hele menigheten og fanen **Group Attendance** for detaljer per gruppe – pluss fanen **Headcount Trend** for [antallstotaler](headcount-entry.md). Bruk disse verktøyene til å forstå vekstmønstre, oppdage synkende engasjement og ta beslutninger basert på data for menigheten din.

</div>

<div class="prereqs">
<h4>Før du begynner</h4>

- Oppmøtestrukturen din må være satt opp med minst én menighet og ett gudstjenestetidspunkt. Se [Oppmøteoppsett](setup.md) hvis du ikke har gjort dette ennå.
- Oppmøtedata må være registrert før rapportene viser resultater. Data kan komme fra [manuell registrering](recording-attendance.md) eller [selvinnsjekking](check-in.md).

</div>

## Se trender for oppmøte {#viewing-attendance-trends}

1. Åpne **B1 Admin**, åpne [hurtigmenyen](../introduction.md#getting-around-with-the-jump-menu) (søkefeltet øverst til venstre), utvid **People** og klikk **Attendance**.
2. Klikk **All years** i venstre kolonne. Fanen **Attendance Trend** er valgt som standard.
3. Rapporten kjøres automatisk når fanen åpnes, og viser totalt oppmøte for hver uke.

:::tip
For en rask oversikt over inneværende uke viser hovedsiden for Attendance hvor mange som er i rommet denne uken, en fordeling per rom (gruppe), eventuelle gjester og et søylediagram over innsjekkinger for de siste 13 ukene – uten at det trengs noen rapport.
:::

## Filtrere dataene {#filtering-your-data}

Bruk filtrene i boksen **Filter Report** for å snevre inn resultatene, og klikk deretter **Run Report**:

- **Campus** – velg en menighet for å se oppmøte bare for den lokasjonen.
- **Service** – begrens rapporten til én gudstjeneste.
- **Service Time** – velg et gudstjenestetidspunkt for å gå i dybden på en bestemt samling.
- **Group** – vis oppmøte for en enkelt gruppe.
- **Start Date** og **End Date** – datoperioden som skal inkluderes. Som standard dekker rapporten siste år, fra for ett år siden og til i dag, og sluttdatoen er med i sin helhet.

Rapporten viser et søylediagram og en tabell med totalt antall besøk per uke. Bruk utskriftsikonet for å skrive den ut, eller **Download Options** for å lagre dataene. Hver uke er merket med datoen for søndagen i den uken. Tabellen har også en kolonne **Session Dates** som lister de faktiske datoene i uken som hadde oppmøte (for eksempel «9/27, 9/30»), slik at du kan se når en samling midt i uken telles i samme uke som søndag.

:::info
Rapportene kjøres automatisk hver gang du åpner fanen Attendance Trend, slik at du alltid ser oppdaterte tall uten å måtte klikke på en oppdateringsknapp.
:::

## Group Attendance {#group-attendance}

Fanen **Group Attendance** viser hvem som var til stede på hver gruppesamling. Dette er nyttig når du vil følge en bestemt klasse, et tjenesteteam eller en smågruppe i stedet for å se på de samlede tallene for gudstjenestene.

1. På rapportsiden **All years** velger du fanen **Group Attendance**.
2. Velg eventuelt en **Campus** og en **Service**.
3. Angi **Start Date** og **End Date**. Som standard dekker rapporten fra forrige søndag til i dag.
4. Klikk **Run Report**.

Resultatene grupperes etter dato for samlingen, deretter etter gudstjenestetidspunkt og gruppe, med personene som var til stede listet under hver gruppe. Gudstjenestetidspunkter, grupper og navn sorteres alfabetisk, slik at hver overskrift bare vises én gang. Hver persons rad viser også en kolonne **Checked In** med tidspunktet oppmøtet ble registrert (tomt når det ikke finnes noe tidspunkt) og en kolonne **Membership Status** (for eksempel Member eller Visitor), slik at du raskt kan se gjester.

For å laste ned dataene klikker du **Download Options** og velger **Summary**. CSV-filen har én rad per gruppemedlem, sortert etter gruppe og deretter navn, og en kolonne for hver datert samling i perioden (for eksempel «Sunday - 9:00 AM (2026-09-27)»), merket **present** eller **absent**.

:::tip
Gruppeoppmøte er særlig verdifullt for [smågruppeledere](../groups/creating-groups.md) som vil følge engasjementet i gruppen sin over tid.
:::

## Tips for bruk av oppmøtedata {#tips-for-using-attendance-data}

- Gjennomgå trender månedlig for å oppdage sesongmønstre tidlig.
- Sammenlign data per menighet for å forstå hvilke lokasjoner som vokser.
- Bruk rapporter på gruppenivå til å følge opp [grupper](../groups/group-members.md) som viser synkende oppmøte.
- Kombiner innsikt om oppmøte med verktøyet [AI-søk](../people/ai-search.md) for å finne personer som ikke har kommet nylig.

## Relaterte sider {#related-pages}

- [Registrering av oppmøte](recording-attendance.md) – før inn oppmøte manuelt for en gruppesamling
- [Registrering av antall og trend](headcount-entry.md) – et enklere alternativ med totalt antall og egen ukentlig trendgraf
- [Innsjekking](check-in.md) – sett opp selvinnsjekking slik at oppmøte registreres automatisk
