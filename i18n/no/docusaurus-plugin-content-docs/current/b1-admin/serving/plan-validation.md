---
title: "Planvalidering og varsler"
description: "Sjekk tjenesteplaner i B1 Admin for ubesatte posisjoner, planleggingskonflikter og frivillige som har blokkert datoen, og send push-varsel til hele teamet med ett klikk."
---

# Planvalidering og varsler til frivillige

<div class="article-intro">

B1 Admin kontrollerer planene dine automatisk for problemer før søndag: ubesatte posisjoner, planleggingskonflikter og frivillige som har blokkert datoen. Når alt ser bra ut, kan du varsle hele teamet med ett enkelt klikk.

</div>

<div class="prereqs">
<h4>Før du begynner</h4>

- Opprett en [tjenesteplan](./plans.md) og tildel frivillige til posisjoner
- Legg til [gudstjenestetider](./plans.md) i planen, slik at konfliktsjekken kan finne overlapp
- Sørg for at de frivillige har [B1 App installert](../../b1-church/getting-started/installing-pwa.md) for å kunne motta push-varsler

</div>

## Valideringspanelet

Hver plan har et **Validering**-panel som kjører automatisk mens du lager planen. Det sjekker tre ting:

### Ubesatte posisjoner
Hvis en posisjon krever flere personer enn det som er tildelt, viser valideringspanelet nøyaktig hva som fortsatt mangler, for eksempel *«Lydtekniker: trenger 1 person til.»* Du ser med én gang om planen er fullt bemannet før uken starter.

### Planleggingskonflikter
Hvis en frivillig er tildelt to posisjoner som overlapper i tid innenfor samme plan, markerer valideringspanelet konflikten, for eksempel *«Jane Smith: tidskonflikt mellom Worship Leader og Barnesjekk under søndagsgudstjenesten.»* Dette fanger opp dobbeltbookinger før de blir et problem søndag morgen.

### Blokkerte datoer
Frivillige kan angi datoer de ikke er tilgjengelige i B1 App. Hvis noen er tildelt en plan som faller innenfor en av deres blokkerte datoer, viser valideringspanelet konflikten automatisk, slik at du kan finne en erstatning.

### Konflikter på tvers av planer
Valideringen sjekker også alle planene dine samtidig. Hvis samme frivillige er tildelt to ulike planer som overlapper i tid, for eksempel en gudstjeneste kl. 09.00 og en gudstjeneste kl. 10.00 som begge varer til kl. 10.30, markerer B1 Admin personen som dobbeltbooket på tvers av planer.

:::tip
Du trenger ikke gjøre noe for å kjøre validering. Den oppdateres automatisk hver gang du legger til eller endrer en tildeling. Hold bare øye med panelet mens du lager planen.
:::

## Varsle frivillige

Når planen er klar, kan du varsle alle tildelte frivillige samtidig direkte fra valideringspanelet.

1. Åpne planen og bla ned til **Validering**-panelet
2. Hvis det finnes frivillige som ikke er varslet, ser du en lenke som viser hvor mange som må varsles (f.eks. *«Varsle 8 frivillige»*)
3. Klikk på lenken for å sende push-varsler til alle som ikke har fått varsel ennå
4. De frivillige får et varsel på telefonen som forteller at de er satt opp på planen, og som ber dem bekrefte oppgaven sin

:::info
Bare frivillige som ikke er varslet ennå, blir med. Hvis du legger til noen i planen senere, vises lenken igjen, slik at du kan varsle den nye personen uten å varsle resten av teamet på nytt.
:::

### Planer med en bekreftelsesarbeidsflyt

Hvis innstillingene for planen angir en [bekreftelsesarbeidsflyt](./workflows.md#serving-assignment-confirmations), viser panelet meldingen *«Nye forespørsler bruker bekreftelsesarbeidsflyten. Varsler i appen forblir aktivert. Oppfølgingen stopper når hver forespørsel godtas eller avslås.»* I så fall gjelder følgende:

- Varslingslenken teller bare frivillige som ikke er varslet og heller ikke har svart ennå.
- Når du klikker på den, sendes det vanlige varselet i appen, og det opprettes ett kort per forespørsel på arbeidsflytens tavle. Deretter sender arbeidsflyten e-post- og tekstmeldingsoppfølging og, om nødvendig, overleverer forespørselen til noen som skal ringe.
- Planen må være publisert (ikke bare en utkast-plan), og arbeidsflyten må være aktiv. Ellers viser panelet meldingen *«Forespørslene kunne ikke sendes. Kontroller at den valgte arbeidsflyten er aktiv og at planen er publisert, og prøv igjen.»*

:::warning
De frivillige må ha B1 App installert på hjemmeskjermen og varsler aktivert for å kunne motta push-varsler. Se [Installere som app (PWA)](../../b1-church/getting-started/installing-pwa.md) for oppsettsinstruksjoner.
:::

## Relaterte artikler

- [Tjenesteplaner](./plans.md)
- [Arbeidsflyter](./workflows.md)
- [Installere B1.church PWA](/docs/b1-church/getting-started/installing-pwa)
