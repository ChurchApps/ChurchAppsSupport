---
title: "planvalidering og meddelelser"
---

# planvalidering og frivilligs meddelelser

<div class="article-intro">

B1 Admin automatisk tjekker dine planer til problemer før søndag -- uudfyldt positioner, tidsplanlægning konflikter og frivillige som har blokkeret datoen. Når alt ser godt ud, kan du underrette dit hele hold med et enkelt klik.

</div>

<div class="prereqs">
<h4>Før du begynder</h4>

- opbygning af en [tjeneste plan](./plans.md) og tildel frivillige til positioner
- Tilføj [tjeneste gange](./plans.md) til planen så konflikt opdagelse kan tjekke for overlappinger
- Sørg for at frivillige har B1 Mobile app installeret for at modtage push meddelelser

</div>

## validerings panelet

Hver plan har et **validerings** panel som kører automatisk når du opbygger det. Det tjekker tre ting:

### uudfyldt positioner
Hvis en position kræver flere folk end som for tiden tildelt, validerings panelet lister præcis hvad som stadig er behov -- for eksempel, *"lydteknik: 1 mere person behov."* Du kan se på en gang hvad et om din plan er fuldt besat før ugen kommer.

### tidsplanlægning konflikter
Hvis en frivillig tildeles til to positioner som overlapper i tid inden samme plan, validerings panelet flager konflikten -- for eksempel, *"Jane Smith: tid konflikt mellem lovsangs leder og børns check-in under søndag service."* Dette fanget dobbelt-bookings før de bliver et søndag morgen problem.

### blokkering datoer
frivillige kan indstille datoer de er utilgængelig i B1 Mobile. Hvis nogen er tildelt til en plan som falder inden for en af deres blokkering datoer, validerings panelet overflader konflikten automatisk så du kan finde en erstatning.

### kryds-plan konflikter
Validerings tjekker også på tværs af alle dine planer på en gang. Hvis den samme frivillig tildeles i to forskellige planer som overlapper i tid -- for eksempel, en 9am service og en 10am service som både kører til 10:30am -- B1 Admin vil flage den person som dobbelt-bookes på tværs af planer.

:::tip
Du skal ikke gøre noget til at køre validering -- det opdateres automatisk hver gang du tilføjer eller ændrer en opgave. bare hold en øje med panelet som du opbygger planen.
:::

## underrette frivillige

Når din plan er indstillet, kan du underrette alle tildelte frivillige på en gang direkte fra validerings panelet.

1. Åbn planen og rul ned til **validerings** panel
2. Hvis der er underrettede frivillige, vil du se en link viser hvor mange der skal underrettes (f.eks. *"underrette 8 frivillige"*)
3. Klik linket for at sende push meddelelser til alle som ikke endnu er underrettet
4. frivillige modtager en meddelelse på deres telefon som lader dem vide de er blevet planlagt og opfordrer dem til at bekræfte deres opgave

:::info
kun frivillige som endnu ikke er underrettet vil være inkluderet. Hvis du tilføjer nogen til planen senere, linket vil gendukke så du kan underrette det nye tilføjelse uden at genunderrette resten af holdet.
:::

:::warning
frivillige skal have B1 Mobile app installeret og meddelelser aktiveret for at modtage push meddelelser. Se [meddelelser vejledning](/docs/b1-mobile/community/notifications) til hvordan frivillige kan aktivere dette på deres enhed.
:::

## Relaterede artikler

- [tjenesteplaner](./plans.md)
- [automatiseringer](./automations.md)
- [B1 Mobile meddelelser](/docs/b1-mobile/community/notifications)
