---
title: "Registrering av antall og trend"
description: "Registrer et samlet antall for en gudstjeneste eller gruppe i B1 Admin uten en navngitt deltakerliste, og følg totalene uke for uke i rapporten Headcount Trend."
---

# Registrering av antall og trend

<div class="article-intro">

Med antallsregistrering kan du føre opp et enkelt samlet oppmøtetall – for en gudstjeneste, et gudstjenestetidspunkt eller en gruppe – uten å sjekke inn en navngitt deltakerliste. Bruk dette når du bare trenger å vite «hvor mange var her», og kombiner det med rapporten Headcount Trend for å følge tallet over tid.

</div>

<div class="prereqs">
<h4>Før du begynner</h4>

- Menighetene, gudstjenestene og gudstjenestetidspunktene dine må være satt opp. Se [oppmøteoppsett](setup.md).
- For å registrere et antall kreves tillatelsen **Attendance &gt; Edit**; for å se trendrapporten kreves **Attendance &gt; View**. Se [Roller og tillatelser](../settings/roles-permissions.md).

</div>

:::info
Antallsregistrering er et rent totalalternativ til [Registrering av oppmøte](recording-attendance.md). Hvis du trenger å vite **hvem** som var til stede – for eksempel for å følge opp personer som ikke har vært tilbake – fortsett å bruke navngitt oppmøte per samling i en gruppes Sessions. Antallsregistreringer lagrer bare et tall.
:::

## Registrere et antall {#recording-a-headcount}

1. Åpne **B1 Admin**, åpne [hurtigmenyen](../introduction.md#getting-around-with-the-jump-menu) (søkefeltet øverst til venstre), utvid **People** og klikk **Attendance**.
2. Klikk **Enter headcount** i venstre kolonne.
3. Fyll ut skjemaet:
   - **Service** *(påkrevd)*
   - **Service Time** – la den stå på **All service times** for å registrere et totalt antall for alle gudstjenestens tidspunkter
   - **Group** – valgfritt; bare grupper der Track Attendance er slått på, vises i listen. La feltet stå tomt for «Ingen gruppe (hele gudstjenesten)».
   - **Date**
   - **Headcount** – det totale antallet personer til stede (et heltall, 0 eller mer)
4. Klikk **Save**.

Tabellen **Recent Headcounts** ved siden av skjemaet viser de siste registreringene dine med dato, gudstjeneste, gudstjenestetidspunkt, gruppe og antall. Klikk på en rad for å laste den tilbake inn i skjemaet hvis du må rette eller slette den.

## Rapporten Headcount Trend {#headcount-trend-report}

1. Klikk **All years** i venstre kolonne på den samme siden **Attendance**, og velg fanen **Headcount Trend**.
2. Rapporten kjøres når fanen åpnes. For å snevre inn kan du velge en **Campus**, **Service**, **Service Time** eller **Group** og klikke **Run Report**. Det finnes ikke noe datofilter – rapporten dekker alle uker som har et antall.

Rapporten viser de registrerte antallene summert per uke, både som linjediagram og som tabell – i samme rapportstil som [fanene Attendance Trend og Group Attendance](tracking-attendance.md). Antall som er registrert for inneværende uke, vises også under **Headcounts this week** på hovedsiden for Attendance.

## Relaterte sider {#related-pages}

- [Registrering av oppmøte](recording-attendance.md) – navngitt oppmøte per person og per samling
- [Følge oppmøte](tracking-attendance.md) – rapporter for oppmøte og trend i grupper
- [Oppmøteoppsett](setup.md) – konfigurer menigheter, gudstjenester og gudstjenestetidspunkter
