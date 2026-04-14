---
title: "Planvalidering og frivilligvarsler"
---

# Planvalidering og frivilligvarsler

<div class="article-intro">

B1 Admin kontrollerer automatisk planene dine for problemer før søndagen -- ufylte posisjoner, planleggingskonflikter og frivillige som har blokkert datoen. Når alt ser bra ut, kan du varsle hele teamet ditt med ett klikk.

</div>

<div class="prereqs">
<h4>Før du begynner</h4>

- Opprett en [serviceplan](./plans.md) og tilordne frivillige til posisjoner
- Legg til [servicetider](./plans.md) til planen slik at konfliktdeteksjon kan kontrollere for overlappinger
- Kontroller at frivillige har B1 Mobile-appen installert for å motta pushvarsler

</div>

## Valideringspanelet

Hver plan har et **Validering**-panel som kjøres automatisk når du bygger det. Det kontrollerer tre ting:

### Ufylte posisjoner
Hvis en posisjon krever flere personer enn de som er tilordnet for øyeblikket, viser valideringspanelet nøyaktig hva som fortsatt trengs -- for eksempel, *"Lydtekniker: 1 person til nødvendig."* Du kan se på et øyeblikk om planen din er fullt bemannt før uken ankommer.

### Planleggingskonflikter
Hvis en frivillig er tilordnet to posisjoner som overlapper i tid innenfor samme plan, markerer valideringspanelet konflikten -- for eksempel, *"Jane Smith: tidskonflikti mellom Forkynnelsesleder og barnesjekk under søndagstjeneste."* Dette fanger dobbeltbookinger før de blir et søndagsmorgensproblem.

### Blokkutdatoer
Frivillige kan angi datoer de er utilgjenglige i B1 Mobile. Hvis noen er tilordnet en plan som faller innenfor en av blokkutdatoene, viser valideringspanelet konflikten automatisk slik at du kan finne en erstatning.

### Tverrplankonflikt
Valideringen kontrollerer også på tvers av alle planene dine på en gang. Hvis samme frivillig er tilordnet i to ulike planer som overlapper i tid -- for eksempel en 09:00-tjeneste og en 10:00-tjeneste som begge kjøres til 10:30 -- vil B1 Admin markere denne personen som dobbeltbooket på tvers av planer.

:::tip
Du trenger ikke å gjøre noe for å kjøre validering -- den oppdateres automatisk hver gang du legger til eller endrer en oppgave. Bare hold øynene på panelet mens du bygger planen.
:::

## Varsling av frivillige

Når planen er satt, kan du varsle alle tildelte frivillige på en gang direkte fra valideringspanelet.

1. Åpne planen og rull ned til **Validering**-panelet
2. Hvis det er uvarslede frivillige, vil du se en lenke som viser hvor mange som trenger varsling (f.eks. *"Varsle 8 frivillige"*)
3. Klikk på lenken for å sende pushvarsler til alle som ikke er varslede ennå
4. Frivillige mottar en varsling på telefonen som forteller dem at de har blitt planlagt og oppfordrer dem til å bekrefte oppgaven

:::info
Bare frivillige som ikke er varslede ennå vil bli inkludert. Hvis du legger til noen i planen senere, vil lenken vises igjen slik at du kan varsle tilføyelsen uten å varsle resten av teamet igjen.
:::

:::warning
Frivillige må ha B1 Mobile-appen installert og varsler aktivert for å motta pushvarslingen. Se [Varselguiden](/docs/b1-mobile/community/notifications) for hvordan frivillige kan aktivere dette på enheten sin.
:::

## Relaterte artikler

- [Serviceplan](./plans.md)
- [Automatiseringer](./automations.md)
- [B1 Mobile Varsler](/docs/b1-mobile/community/notifications)
