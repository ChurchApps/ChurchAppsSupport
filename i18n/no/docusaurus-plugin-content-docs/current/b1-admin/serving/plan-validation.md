---
title: "Planvalidering og varsler"
description: "Sjekk gudstjenesteplaner i B1 Admin for ubesatte posisjoner, planleggingskonflikter og frivillige som har blokkert datoen, og send push-varsel til hele teamet med ett klikk."
---

# Planvalidering og varsler til frivillige

<div class="article-intro">

B1 Admin sjekker planene dine automatisk for problemer før søndag — ubesatte posisjoner, planleggingskonflikter og frivillige som har blokkert datoen. Når alt ser bra ut, kan du varsle hele teamet ditt med ett klikk.

</div>

<div class="prereqs">
<h4>Før du begynner</h4>

- Opprett en [gudstjenesteplan](./plans.md) og tilordne frivillige til posisjoner
- Legg til [gudstjenestetider](./plans.md) på planen, slik at konfliktdeteksjon kan se etter overlapp
- Kontroller at de frivillige har [B1-appen installert](../../b1-church/getting-started/installing-pwa.md) for å motta push-varsler

</div>

## Valideringspanelet {#the-validation-panel}

Hver plan har et panel for **Validering** som kjører automatisk mens du bygger den. Åpne planen og klikk på **Administrer tjenesteteam** for å se det ved siden av posisjonene. Selve planssiden viser en oppsummeringslinje under **Tjenesteteam** (for eksempel «2 konflikter · 3 ikke varslet») med en lenke til **Gjennomgå** for hele panelet. Posisjoner som fortsatt trenger folk, listes også på planssiden, så oppsummeringslinjen teller bare konflikter og frivillige som ikke er varslet.

Panelet sjekker følgende:

### Ubesatte posisjoner {#unfilled-positions}
Hvis en posisjon krever flere personer enn det som er tilordnet akkurat nå, lister valideringspanelet nøyaktig hva som fortsatt trengs — for eksempel *«Lydtekniker: 1 person til trengs.»* Du ser med et blikk om planen din er fullt bemannet før uken kommer.

### Planleggingskonflikter {#scheduling-conflicts}
Hvis en frivillig er tilordnet to posisjoner som overlapper i tid innenfor samme plan, markerer valideringspanelet konflikten — for eksempel *«Jane Smith: tidskonflikt mellom Lovsangsleder og Barnesjekk-inn under søndagsgudstjenesten.»* Dette fanger opp dobbeltbooking før det blir et problem en søndag morgen.

### Blokkerte datoer {#blockout-dates}
Frivillige kan angi datoer de ikke er tilgjengelige i B1-appen. Hvis noen er tilordnet en plan som faller innenfor en av deres blokkerte datoer, viser valideringspanelet konflikten automatisk, slik at du kan finne en erstatning.

### Konflikter på tvers av planer {#cross-plan-conflicts}
Valideringen sjekker også alle planene dine samtidig. Hvis den samme frivillige er tilordnet to ulike planer som overlapper i tid — for eksempel en gudstjeneste kl. 09 og en gudstjeneste kl. 10 som begge varer til kl. 10:30 — markerer B1 Admin personen som dobbeltbooket på tvers av planer.

### Planleggingspreferanser {#scheduling-preferences}
Hvis en frivillig har [planleggingspreferanser](./plans.md#scheduling-preferences), varsler panelet deg når et oppdrag strider mot dem: når de er planlagt flere ganger denne måneden enn deres **Maks antall ganger per måned**, når ingen av planens tider samsvarer med deres **Foretrukne gudstjenestetider**, eller når de har bedt om ikke å tjene samme dag som husstanden sin, og et familiemedlem også er planlagt.

Når alt stemmer, står det **Planen er gyldig.** i panelet.

:::tip
Du trenger ikke gjøre noe for å kjøre validering — den oppdateres automatisk hver gang du legger til eller endrer et oppdrag. Følg bare med på panelet mens du bygger planen.
:::

## Varsle frivillige {#notifying-volunteers}

Når planen er klar, kan du varsle alle tilordnede frivillige samtidig direkte fra valideringspanelet.

1. Åpne planen og klikk på **Administrer tjenesteteam** (eller **Gjennomgå** på planens oppsummeringslinje) for å se panelet **Validering**
2. Hvis det finnes frivillige som ikke er varslet, ser du en lenke som viser hvor mange som må varsles (f.eks. *«Varsle 8 frivillige»*). Når alle er varslet, står det **Alle frivillige er varslet.** i panelet.
3. Klikk på lenken for å sende push-varsler til alle som ikke er varslet ennå
4. De frivillige får et varsel på telefonen sin som forteller at de er planlagt og ber dem bekrefte oppdraget sitt

:::info
Bare frivillige som ikke er varslet ennå, blir med. Hvis du legger til noen i planen senere, vises lenken igjen, slik at du kan varsle den nye personen uten å varsle resten av teamet på nytt.
:::

### Publisere en foreløpig plan {#publishing-a-penciled-in-plan}

Hvis planen er [foreløpig](./plans.md#plan-settings), kan ikke de frivillige se oppdragene sine ennå, og panelet viser *«Foreløpig — frivillige kan ikke se disse oppdragene ennå.»* med en knapp i stedet for varslingslenken:

- **Publiser plan** gjør oppdragene synlige.
- **Publiser og varsle** (vises når noen frivillige ikke er varslet, for eksempel *«Publiser og varsle 8 frivillige»*) gjør oppdragene synlige og varsler disse frivillige med en gang.

Bekreft i dialogen for å publisere.

### Planer med en bekreftelsesarbeidsflyt {#plans-with-a-confirmation-workflow}

Hvis innstillingene for planen angir en [bekreftelsesarbeidsflyt](./workflows.md#serving-assignment-confirmations), viser panelet *«Nye forespørsler bruker bekreftelsesarbeidsflyten. Appvarsler er fortsatt aktivert. Oppfølging stopper når hver forespørsel er akseptert eller avslått.»* I så fall:

- Varslingslenken teller bare frivillige som ikke er varslet og heller ikke har svart ennå.
- Ved å klikke på den sendes det vanlige appvarselet, og det starter ett kort per forespørsel på arbeidsflytens tavle. Arbeidsflyten sender deretter oppfølging via e-post og tekstmelding og, hvis nødvendig, overleverer forespørselen til noen som skal ringe.
- Planen må være publisert (ikke foreløpig), og arbeidsflyten må være aktiv. Ellers viser panelet *«Forespørslene kunne ikke sendes. Kontroller at den valgte arbeidsflyten er aktiv og at planen er publisert, og prøv igjen.»*

:::warning
Frivillige må ha B1-appen installert på startskjermen og varsler slått på for å motta push-varsler. Se [Installere som app (PWA)](../../b1-church/getting-started/installing-pwa.md) for oppsettinstruksjoner.
:::

## Relaterte artikler {#related-articles}

- [Gudstjenesteplaner](./plans.md)
- [Arbeidsflyter](./workflows.md)
- [Installere B1.church PWA](/docs/b1-church/getting-started/installing-pwa)
