---
title: "Planvalidering og varsler"
---

# Planvalidering og frivilligvarsler

<div class="article-intro">

B1 Admin sjekker automatisk planene dine for problemer før søndag — ufylte stillinger, planleggingskonflikter og frivillige som har blokkert datoen. Når alt ser bra ut, kan du varsle hele laget med ett klikk.

</div>

<div class="prereqs">
<h4>Før du begynner</h4>

- Opprett en [tjensteplan](./plans.md) og tildel frivillige til stillinger
- Legg til [tjenestestider](./plans.md) til planen slik at konfliktdeteksjon kan sjekke for overlappinger
- Sørg for at frivillige har B1 Mobile-appen installert for å motta push-varsler

</div>

## Valideringspanelet

Hver plan har et **Validering**-panel som kjøres automatisk når du bygger det. Det sjekker tre ting:

### Ufylte stillinger
Hvis en stilling krever flere mennesker enn som er tildelt, viser valideringspanelet nøyaktig hva som fortsatt trengs — for eksempel *"Lydteknikk: 1 person trengs til."* Du kan raskt se om planen din er fullsatt før uken ankommer.

### Planleggingskonflikter
Hvis en frivillig er tildelt to stillinger som overlapper i tid innen samme plan, merker valideringspanelet konflikten — for eksempel *"Jane Smith: tidkonflikt mellom tilbedelsesleder og barneregistrering under søndagsgudstjeneste."* Dette fanger dobbelttimer før de blir et søndagsmorgensproblem.

### Blokkerte datoer
Frivillige kan angi datoer de ikke er tilgjengelige i B1 Mobile. Hvis noen er tildelt en plan som faller innenfor en av blokkdatoene deres, viser valideringspanelet konflikten automatisk slik at du kan finne en erstatning.

### Planovergreipende konflikter
Valideringen sjekker også alle planene dine på en gang. Hvis samme frivillig er tildelt i to ulike planer som overlapper i tid — for eksempel en 09.00-tjeneste og en 10.00-tjeneste som begge kjøres til 10.30 — vil B1 Admin merke personen som dobbelttilordnet på tvers av planer.

:::tip
Du trenger ikke å gjøre noe for å kjøre validering — den oppdateres automatisk hver gang du legger til eller endrer en tildelning. Bare hold øye med panelet når du bygger planen.
:::

## Varsling av frivillige

Når planen er klar, kan du varsle alle tildelte frivillige på en gang direkte fra valideringspanelet.

1. Åpne planen og scroll til panelet **Validering**
2. Hvis det er frivillige som ikke har fått varsel, vil du se en lenke som viser hvor mange som trenger varsling (f.eks. *"Varsle 8 frivillige"*)
3. Klikk lenken for å sende push-varsler til alle som ikke har blitt varslet ennå
4. Frivillige mottar en varsling på telefonen sin som lar dem vite at de er planlagt og ber dem bekrefte oppgaven sin

:::info
Bare frivillige som ikke har blitt varslet ennå vil bli inkludert. Hvis du legger til noen i planen senere, vises lenken på nytt slik at du kan varsle den nye tilføringen uten å varsle resten av laget på nytt.
:::

:::warning
Frivillige må ha B1.church-mobilopplevelsen installert (PWA på hjemmeskjermen, eller den foreldet B1 Mobile-native-appen for brukere som fortsatt har den) med varsler aktivert for å motta push-varsler. Se [Installering som en app (PWA)](/docs/b1-church/getting-started/installing-pwa) for oppsettsinstruksjoner.
:::

## Relaterte artikler

- [Tjenesteplaner](./plans.md)
- [Arbeidsflyter](./workflows.md)
- [Installering av B1.church PWA](/docs/b1-church/getting-started/installing-pwa)
