---
title: "Planvalidering og varsler"
---

# Planvalidering og frivilligvarsler

<div class="article-intro">

B1 Admin sjekker automatisk planene dine for problemer før søndag — ubesatte posisjoner, planleggingskonflikter og frivillige som har blokkert datoen. Når alt ser bra ut, kan du varsle hele teamet ditt med ett klikk.

</div>

<div class="prereqs">
<h4>Før du begynner</h4>

- Opprett en [tjenesteplan](./plans.md) og tildel frivillige til posisjoner
- Legg til [gudstjenestetider](./plans.md) i planen slik at konfliktdeteksjon kan sjekke for overlappinger
- Sørg for at frivillige har B1 Mobile-appen installert for å motta push-varsler

</div>

## Valideringspanelet

Hver plan har et **Validering**-panel som kjøres automatisk mens du bygger den. Det sjekker tre ting:

### Ubesatte posisjoner
Hvis en posisjon krever flere personer enn det som er tildelt for øyeblikket, lister valideringspanelet nøyaktig hva som fortsatt trengs — for eksempel, *"Lydtekniker: 1 person til trengs."* Du kan se med et blikk om planen din er fullt bemannet før uken kommer.

### Planleggingskonflikter
Hvis en frivillig er tildelt to posisjoner som overlapper i tid innenfor samme plan, flagger valideringspanelet konflikten — for eksempel, *"Jane Smith: tidskonflikt mellom Lovsangleder og Barneinnsjekking under Søndagsgudstjenesten."* Dette fanger opp dobbeltbookinger før de blir et problem søndag morgen.

### Blokkeringsdatoer
Frivillige kan sette datoer de ikke er tilgjengelige i B1 Mobile. Hvis noen er tildelt en plan som faller innenfor en av deres blokkeringsdatoer, viser valideringspanelet konflikten automatisk slik at du kan finne en erstatning.

### Konflikter på tvers av planer
Valideringen sjekker også på tvers av alle planene dine samtidig. Hvis den samme frivillige er tildelt i to forskjellige planer som overlapper i tid — for eksempel en kl. 9-gudstjeneste og en kl. 10-gudstjeneste som begge varer til kl. 10:30 — vil B1 Admin flagge den personen som dobbeltbooket på tvers av planer.

:::tip
Du trenger ikke å gjøre noe for å kjøre validering — den oppdateres automatisk hver gang du legger til eller endrer en tildeling. Bare hold et øye med panelet mens du bygger planen.
:::

## Varsle frivillige

Når planen din er klar, kan du varsle alle tildelte frivillige samtidig direkte fra valideringspanelet.

1. Åpne planen og bla ned til **Validering**-panelet
2. Hvis det er uvarslete frivillige, vil du se en lenke som viser hvor mange som trenger å bli varslet (f.eks., *"Varsle 8 frivillige"*)
3. Klikk på lenken for å sende push-varsler til alle som ikke har blitt varslet ennå
4. Frivillige mottar et varsel på telefonen som forteller dem at de er planlagt og ber dem bekrefte tildelingen sin

:::info
Bare frivillige som ikke er varslet ennå vil bli inkludert. Hvis du legger til noen i planen senere, vil lenken dukke opp igjen slik at du kan varsle den nye tilføyelsen uten å varsle resten av teamet på nytt.
:::

:::warning
Frivillige må ha B1 Mobile-appen installert og varsler aktivert for å motta push-varselet. Se [veiledningen for Varsler](/docs/b1-mobile/community/notifications) for hvordan frivillige kan aktivere dette på enheten sin.
:::

## Relaterte artikler

- [Tjenesteplaner](./plans.md)
- [Automatiseringer](./automations.md)
- [B1 Mobile Varsler](/docs/b1-mobile/community/notifications)
