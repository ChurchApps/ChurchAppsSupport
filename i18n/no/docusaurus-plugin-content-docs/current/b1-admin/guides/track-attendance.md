---
title: "Veiledning: Før oversikt over kirkens oppmøte"
description: "Før oversikt over oppmøte i B1 Admin ved å sette opp kampuser og gudstjenestetider, registrere det manuelt eller via selvinnsjekking, og lese rapporter."
---

# Før oversikt over kirkens oppmøte

<div class="article-intro">

Sett opp oppmøteregistrering for gudstjenestene og gruppene dine, fra konfigurering av kampuser og gudstjenestetider, til registrering av oppmøte manuelt eller via selvbetjent innsjekkingsapp, og til å se trender i rapportene. Når du er ferdig, har du et fullstendig bilde av hvem som er til stede og når.

</div>

<div class="prereqs">
<h4>Før du begynner</h4>

- B1 Admin-konto med administratortilgang
- [Personer lagt til i katalogen din](../people/adding-people.md)
- [Grupper opprettet](../groups/creating-groups.md) for tjenestene du vil følge

</div>

## Steg 1: Konfigurer kampuser og gudstjenester {#step-1-configure-campuses--services}

Definer hvor og når kirken din samles.

Følg veiledningen [Oppsett av oppmøte](../attendance/setup.md) for å:

1. I [Hurtigmenyen](../introduction.md#getting-around-with-the-jump-menu), velg **Personer > Oppmøte** og klikk på **Oppsett**
2. Legg til kampusen din (f.eks. «Hovedkampus») og gudstjenestene som holdes der
3. Legg til gudstjenestetider (f.eks. «Søndag kl. 09:00», «Søndag kl. 11:00», «Onsdag kl. 19:00»)

## Steg 2: Aktiver oppmøteregistrering for grupper {#step-2-enable-group-attendance-tracking}

Slå på oppmøteregistrering for gruppene du vil følge med på.

Følg veiledningen [Opprette grupper](../groups/creating-groups.md) for å:

1. Åpne hver gruppe du vil følge, klikk på **Rediger**, og sett **Registrer oppmøte** til **Ja**
2. Hvis gruppen møtes under en gudstjeneste, velg tidspunktet under **Legg til gudstjenestetid** og klikk på plusstegnet slik at oppmøtet registreres på riktig gudstjeneste. Klikk deretter på **Lagre**

:::info
Ikke alle grupper trenger oppmøteregistrering. Slå det på for grupper der du vil følge deltakelsen, som barneklasser, smågrupper, søndagsskole osv.
:::

## Steg 3: Registrer oppmøte manuelt {#step-3-record-attendance-manually}

Kryss av for hvem som var til stede på hver gudstjeneste og i hver gruppe.

Følg veiledningen [Registrere oppmøte](../attendance/recording-attendance.md) for å:

1. Åpne en gruppe, klikk på **Alle økter** i delen **Økter**, klikk på **Ny**, og velg **Gudstjenestetid** og **Øktdato**. Kryss av for **Legg også til for de andre _N_ gruppene i _gudstjenestetid_** for å opprette økter for alle klasser på den gudstjenestetiden samtidig.
2. Kryss av for hvem som var til stede, og klikk på **Lagre oppmøte**

Hvis du bare trenger et totaltall i stedet for navn (for eksempel for hovedgudstjenesten), klikk på **Registrer antall** på siden **Oppmøte** i stedet. Se [Registrering av antall](../attendance/headcount-entry.md).

:::tip
Manuell registrering fungerer godt for voksengudstjenester, smågrupper og situasjoner der en innsjekkingsterminal ikke er praktisk.
:::

## Steg 4: Sett opp selvinnsjekking (valgfritt) {#step-4-set-up-self-check-in-optional}

La medlemmene sjekke seg inn selv ved hjelp av en nettbrettterminal.

Følg veiledningen [Innsjekking](../attendance/check-in.md) for å:

1. Installere B1 Checkin-appen på et nettbrett for selvbetjent innsjekking
2. La medlemmer søke etter navnet sitt og sjekke seg inn selv og familien sin
3. Innsjekkingsregistreringer vises sammen med manuelt registrerte oppmøter, uten forskjell i dataene

:::info
For et komplett oppsett av barnearbeidet, inkludert maskinvare og skriverkonfigurasjon, se [veiledningen for barneinnsjekking](./childrens-checkin.md).
:::

## Steg 5: Se oppmøterapporter {#step-5-view-attendance-reports}

Få det store bildet av deltakelsen i kirken din.

Følg veiledningen [Oppmøterapporter](../reports/attendance-reports.md). På siden **Oppmøte**, klikk på **Alle år** for å finne disse rapportene som faner:

1. **Oppmøtetrend** — se oppmøte over tid for å oppdage vekst eller nedgang
2. **Trend for antall** — diagram over antalltotalene du har registrert for hånd
3. **Gruppeoppmøte** — se hvem som var til stede på hver gruppeøkt i et datointervall, med CSV-nedlasting

For en telling dag for dag for én gruppe, åpne rapporten **Daglig gruppeoppmøte** på **admin.b1.church/reports/dailyGroupAttendance**.

:::info
Oppmøterapportene kombinerer både manuelt registrert oppmøte og selvinnsjekking. Dataene vises likt uansett metode, og begge metodene mates inn i de samme rapportene.
:::

## Du er ferdig! {#youre-done}

Oppmøteregistreringen din er satt opp. Enten du registrerer oppmøte manuelt, bruker innsjekkingsappen, eller begge deler, havner alle dataene i de samme rapportene, slik at du har et tydelig bilde av deltakelsen i hele kirken.

## Relaterte artikler {#related-articles}

- [Oppsett av oppmøte](../attendance/setup.md) — konfigurer kampuser og gudstjenester
- [Registrering av antall](../attendance/headcount-entry.md) — før totaltall uten navn
- [Registrere oppmøte](../attendance/recording-attendance.md) — registrer oppmøte manuelt
- [Følge oppmøte](../attendance/tracking-attendance.md) — gjennomgå oppmøtetrender
- [Innsjekking](../attendance/check-in.md) — selvbetjent innsjekkingsapp
- [Opprette grupper](../groups/creating-groups.md) — sett opp grupper med oppmøteregistrering
- [Oppmøterapporter](../reports/attendance-reports.md) — se oppmøtetrender
- [Veiledning for barneinnsjekking](./childrens-checkin.md) — komplett oppsett av innsjekking i barnearbeidet
