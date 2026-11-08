---
title: "Planvalidering og notifikationer"
description: "Tjek tjenesteplaner i B1 Admin for ubesatte positioner, planlægningskonflikter og frivillige, der har meldt forhindringer, og send derefter push-notifikationer til hele dit team med ét klik."
---

# Planvalidering og notifikationer til frivillige

<div class="article-intro">

B1 Admin kontrollerer automatisk dine planer for problemer før søndagen: ubesatte positioner, planlægningskonflikter og frivillige, der har meldt, at de ikke kan på datoen. Når alt ser godt ud, kan du give hele dit team besked med ét klik.

</div>

<div class="prereqs">
<h4>Før du går i gang</h4>

- Opret en [tjenesteplan](./plans.md) og tildel frivillige til positionerne
- Tilføj [gudstjenestetider](./plans.md) til planen, så konfliktregistreringen kan finde overlap
- Sørg for, at de frivillige har [B1 App installeret](../../b1-church/getting-started/installing-pwa.md), så de kan modtage push-notifikationer

</div>

## Valideringspanelet

Hver plan har et **Validering**-panel, der kører automatisk, mens du opbygger planen. Det kontrollerer tre ting:

### Ubesatte positioner
Hvis en position kræver flere personer, end der er tildelt i øjeblikket, viser valideringspanelet præcis, hvad der stadig mangler, for eksempel *„Lydtekniker: 1 person mere mangler.“* Du kan se med et blik, om planen er fuldt bemandet, inden ugen begynder.

### Planlægningskonflikter
Hvis en frivillig er tildelt to positioner, der overlapper i tid inden for samme plan, markerer valideringspanelet konflikten, for eksempel *„Jane Smith: tidskonflikt mellem Lovsangsleder og Børne-check-in under søndagsgudstjenesten.“* Det fanger dobbeltbookinger, før de bliver et problem en søndag morgen.

### Frahold-datoer
Frivillige kan angive datoer, hvor de ikke er til rådighed, i B1 App. Hvis en person er tildelt en plan, der falder inden for en af deres frahold-datoer, viser valideringspanelet konflikten automatisk, så du kan finde en erstatning.

### Konflikter på tværs af planer
Valideringen kontrollerer også alle dine planer samtidig. Hvis den samme frivillige er tildelt to forskellige planer, der overlapper i tid, for eksempel en gudstjeneste kl. 9 og en kl. 10, der begge varer til kl. 10.30, markerer B1 Admin personen som dobbeltbooket på tværs af planer.

:::tip
Du behøver ikke gøre noget for at køre validering. Den opdateres automatisk, hver gang du tilføjer eller ændrer en tildeling. Hold bare øje med panelet, mens du opbygger planen.
:::

## Underretning af frivillige

Når din plan er klar, kan du give besked til alle tildelte frivillige på én gang direkte fra valideringspanelet.

1. Åbn planen og rul ned til **Validering**-panelet
2. Hvis der er frivillige, der ikke er underrettet, ser du et link, der viser, hvor mange der skal have besked (f.eks. *„Underret 8 frivillige“*)
3. Klik på linket for at sende push-notifikationer til alle, der endnu ikke er underrettet
4. De frivillige modtager en notifikation på deres telefon, der fortæller, at de er planlagt, og beder dem bekræfte deres tildeling

:::info
Kun frivillige, der endnu ikke er underrettet, bliver medtaget. Hvis du tilføjer en person til planen senere, vises linket igen, så du kan underrette den nye person uden at underrette resten af teamet igen.
:::

### Planer med en bekræftelsesproces

Hvis planens indstillinger angiver en [bekræftelsesproces](./workflows.md#serving-assignment-confirmations), viser panelet *„Nye anmodninger bruger bekræftelsesprocessen. App-advarsler forbliver aktiveret. Opfølgninger stopper, når hver anmodning accepteres eller afvises.“* I så fald gælder følgende:

- Underretningslinket tæller kun frivillige, der ikke er underrettet, og som endnu ikke har svaret.
- Når du klikker på det, sendes den sædvanlige advarsel i appen, og der oprettes ét kort pr. anmodning på processens tavle. Processen sender derefter e-mail- og sms-opfølgninger og overdrager, hvis det er nødvendigt, anmodningen til en person, der skal ringe.
- Planen skal være publiceret (ikke kun blyantsskitse), og processen skal være aktiv. Ellers viser panelet *„Anmodningerne kunne ikke sendes. Kontroller, at den valgte proces er aktiv, og at planen er publiceret, og prøv igen.“*

:::warning
Frivillige skal have B1 App installeret på deres startskærm med notifikationer aktiveret for at modtage push-notifikationer. Se [Installation som app (PWA)](../../b1-church/getting-started/installing-pwa.md) for opsætningsvejledning.
:::

## Relaterede artikler

- [Tjenesteplaner](./plans.md)
- [Processer](./workflows.md)
- [Installation af B1.church PWA](/docs/b1-church/getting-started/installing-pwa)
