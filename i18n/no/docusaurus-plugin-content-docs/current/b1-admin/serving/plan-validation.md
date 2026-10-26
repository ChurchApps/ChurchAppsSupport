---
title: "Planvalidering og varsler"
---

# Planvalidering og varsling av frivillige

<div class="article-intro">

B1 Admin sjekker automatisk planene dine for problemer før søndag: ubesatte posisjoner, planleggingskonflikter og frivillige som har blokkert datoen. Når alt ser bra ut, kan du varsle hele teamet ditt med ett enkelt klikk.

</div>

<div class="prereqs">
<h4>Før du begynner</h4>

- Lag en [tjenesteplan](./plans.md) og tildel frivillige til posisjoner
- Legg til [tjenestetider](./plans.md) i planen, slik at konfliktsjekken kan se etter overlapp
- Kontroller at de frivillige har B1 Mobile-appen installert for å motta push-varsler

</div>

## Valideringspanelet

Hver plan har et **Validering**-panel som kjører automatisk mens du bygger planen. Det sjekker tre ting:

### Ubesatte posisjoner
Hvis en posisjon krever flere personer enn det som er tildelt, viser valideringspanelet nøyaktig hva som fortsatt mangler, for eksempel *«Lydtekniker: 1 person til trengs.»* Du ser med et blikk om planen er fullt bemannet før uken starter.

### Planleggingskonflikter
Hvis en frivillig er tildelt to posisjoner som overlapper i tid innenfor samme plan, flagger valideringspanelet konflikten, for eksempel *«Jane Smith: tidskonflikt mellom Gudstjenesteleder og Innsjekking for barn under søndagsgudstjenesten.»* Dette fanger opp dobbeltbookinger før de blir et problem en søndag morgen.

### Blokkerte datoer
Frivillige kan angi datoer de ikke er tilgjengelige i B1 Mobile. Hvis noen er tildelt en plan som faller innenfor en av datoene de har blokkert, viser valideringspanelet konflikten automatisk, slik at du kan finne en erstatning.

### Konflikter på tvers av planer
Valideringen sjekker også alle planene dine samtidig. Hvis samme frivillige er tildelt to ulike planer som overlapper i tid, for eksempel en gudstjeneste kl. 09.00 og en kl. 10.00 som begge varer til kl. 10.30, vil B1 Admin flagge personen som dobbeltbooket på tvers av planer.

:::tip
Du trenger ikke gjøre noe for å kjøre validering. Den oppdateres automatisk hver gang du legger til eller endrer en tildeling. Bare hold øye med panelet mens du bygger planen.
:::

## Varsle frivillige

Når planen er klar, kan du varsle alle tildelte frivillige samtidig direkte fra valideringspanelet.

1. Åpne planen og bla ned til **Validering**-panelet
2. Hvis det finnes frivillige som ikke er varslet, ser du en lenke som viser hvor mange som må varsles (f.eks. *«Varsle 8 frivillige»*)
3. Klikk på lenken for å sende push-varsler til alle som ikke har blitt varslet ennå
4. De frivillige får et varsel på telefonen som forteller at de er satt opp, og som ber dem bekrefte tildelingen sin

:::info
Bare frivillige som ennå ikke er varslet, blir med. Hvis du legger til noen i planen senere, vises lenken igjen, slik at du kan varsle den nye personen uten å varsle resten av teamet på nytt.
:::

### Planer med en bekreftelsesarbeidsflyt

Hvis innstillingene for planen angir en [bekreftelsesarbeidsflyt](./workflows.md#serving-assignment-confirmations), viser panelet *«Nye forespørsler bruker bekreftelsesarbeidsflyten. App-varsler er fortsatt aktivert. Oppfølgingen stopper når hver forespørsel er godtatt eller avslått.»* I så fall gjelder følgende:

- Varslingslenken teller bare frivillige som ikke er varslet og heller ikke har svart ennå.
- Når du klikker på den, sendes det vanlige varselet i appen, og det opprettes ett kort per forespørsel på arbeidsflytens tavle. Arbeidsflyten sender deretter e-post- og tekstmeldingsoppfølging og, hvis det trengs, gir forespørselen til en person som skal ringe.
- Planen må være publisert (ikke blyantmerket), og arbeidsflyten må være aktiv. Ellers viser panelet *«Forespørslene kunne ikke sendes. Kontroller at den valgte arbeidsflyten er aktiv og at planen er publisert, og prøv igjen.»*

:::warning
Frivillige må ha B1.church-mobilopplevelsen installert (PWA på startskjermen, eller den utdaterte B1 Mobile-native-appen for brukere som fortsatt har den), med varsler aktivert, for å motta push-varsler. Se [Installere som app (PWA)](/docs/b1-church/getting-started/installing-pwa) for oppsettsinstruksjoner.
:::

## Relaterte artikler

- [Tjenesteplaner](./plans.md)
- [Arbeidsflyter](./workflows.md)
- [Installere B1.church PWA](/docs/b1-church/getting-started/installing-pwa)
