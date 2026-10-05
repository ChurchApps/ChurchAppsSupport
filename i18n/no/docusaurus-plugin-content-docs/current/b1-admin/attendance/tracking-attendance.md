---
title: "Følge opp oppmøte"
---

# Følge opp oppmøte

<div class="article-intro">

Når campuser, samlingstidspunkter og grupper er satt opp, gjør B1 Admin det enkelt å gå gjennom oppmøtedata og se trender. Oppmøtesiden har to rapportvisninger -- fanen **Oppmøtetrend** for trender i hele menigheten og fanen **Gruppeoppmøte** for detaljer på gruppenivå. Bruk disse verktøyene til å forstå vekstmønstre, oppdage synkende engasjement og ta datadrevne beslutninger for menigheten.

</div>

<div class="prereqs">
<h4>Før du begynner</h4>

- Strukturen for oppmøte må være satt opp med minst én campus og ett samlingstidspunkt. Se [Oppsett av oppmøte](setup.md) hvis du ikke har gjort dette ennå.
- Oppmøtedata må være registrert før rapportene viser resultater. Dataene kan komme fra [manuell registrering](recording-attendance.md) eller [selvinnsjekking](check-in.md).

</div>

## Se oppmøtetrender

1. Åpne **B1 Admin**, åpne [Jump-menyen](../introduction.md#getting-around-with-the-jump-menu) (søkefeltet øverst til venstre), utvid **Personer** og klikk på **Oppmøte**.
2. Klikk på fanen **Oppmøtetrend**.
3. Rapporten kjøres automatisk når fanen åpnes, og viser totalt oppmøte for hver uke.

## Filtrere dataene

Bruk filtrene i boksen **Filtrer rapport** for å avgrense resultatene, og klikk deretter på **Kjør rapport**:

- **Campus** -- velg en campus for å se oppmøte bare for den lokasjonen.
- **Gudstjeneste** -- begrens rapporten til én gudstjeneste.
- **Samlingstidspunkt** -- velg et samlingstidspunkt for å se nærmere på en bestemt samling.
- **Gruppe** -- vis oppmøte for én enkelt gruppe.
- **Startdato** og **Sluttdato** -- datointervallet som skal tas med. Som standard dekker rapporten det siste året, fra ett år siden til og med i dag, og sluttdatoen tas med i sin helhet.

Rapporten viser et søylediagram og en tabell med totalt antall besøk per uke. Hver uke er merket med datoen for ukens søndag. Tabellen har også en kolonne **Øktdatoer** som viser de faktiske datoene i uken som hadde oppmøte (for eksempel «27.9., 30.9.»), slik at du kan se når en samling midt i uken telles med i samme uke som søndagen.

:::info
Rapportene kjøres automatisk hver gang du åpner fanen Oppmøtetrend, så du ser alltid oppdaterte tall uten å trenge å klikke på en oppdateringsknapp.
:::

## Gruppeoppmøte

Fanen **Gruppeoppmøte** viser hvem som var til stede på hver gruppeøkt. Dette er nyttig når du vil følge en bestemt klasse, et tjenesteteam eller en smågruppe i stedet for å se på de samlede tallene for gudstjenesten.

1. Velg fanen **Gruppeoppmøte**.
2. Velg eventuelt en **Campus** og en **Gudstjeneste**.
3. Angi **Startdato** og **Sluttdato**. Som standard dekker rapporten fra siste søndag til i dag.
4. Klikk på **Kjør rapport**.

Resultatene grupperes etter øktdato, deretter etter samlingstidspunkt og gruppe, med personene som møtte opp, oppført under hver gruppe. Samlingstidspunkter, grupper og navn sorteres alfabetisk, slik at hver overskrift bare vises én gang. Hver persons rad har også en kolonne **Sjekket inn** med tidspunktet oppmøtet ble registrert (tom hvis ingen tid er lagret) og en kolonne **Medlemsstatus** (for eksempel Medlem eller Besøkende), slik at du lett kan oppdage gjester.

For å laste ned dataene klikker du på **Nedlastingsalternativer** og velger **Sammendrag**. CSV-filen har én rad per gruppemedlem, sortert etter gruppe og deretter navn, og en kolonne for hver daterte økt i perioden (for eksempel «Søndag - 9.00 (2026-09-27)») merket **til stede** eller **fraværende**.

:::tip
Gruppeoppmøte er særlig verdifullt for ledere av [smågrupper](../groups/creating-groups.md) som vil følge engasjementet i gruppen over tid.
:::

## Tips for bruk av oppmøtedata

- Gå gjennom trendene hver måned for å fange opp sesongmønstre tidlig.
- Sammenlign data på campusnivå for å se hvilke lokasjoner som vokser.
- Bruk rapporter på gruppenivå til å følge opp [grupper](../groups/group-members.md) med synkende oppmøte.
- Kombiner innsikt fra oppmøte med verktøyet [AI-søk](../people/ai-search.md) for å finne personer som ikke har vært til stede nylig.

## Relaterte sider

- [Registrere oppmøte](recording-attendance.md) -- registrer oppmøte manuelt for en gruppeøkt
- [Registrering av opptelling og trend](headcount-entry.md) -- et enklere alternativ med bare totalt antall, med eget ukentlig trenddiagram
- [Innsjekking](check-in.md) -- sett opp selvinnsjekking slik at oppmøte registreres automatisk
