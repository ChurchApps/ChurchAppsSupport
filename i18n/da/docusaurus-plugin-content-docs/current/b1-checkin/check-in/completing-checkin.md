---
title: "Fuldførelse af check-in"
---

# Fuldførelse af check-in

<div class="article-intro">

Når du har gennemgået din husstand og foretaget nødvendige gruppe tildelinger, er du klar til at afslutte checkin. Dette er det sidste trin i kiosk arbejdsgangen -- appen sender fremmøde, udskriver labels og nulstiller til næste familie.

</div>

<div class="prereqs">
<h4>Før du starter</h4>

- [Gennemgå din husstand](./household-review) på husstands oversigten
- [Tildel grupper](./group-assignment) til ethvert familiemedlem, som skal checke ind i en bestemt klasse eller program
- Du kan eventuelt [tilføje gæster](./adding-guests), som besøger med din familie

</div>

## Sådan checkes du ind

1. Fra **husstands oversigten** skal du trykke på **Check-in** knappen nederst på skærmen.
2. Appen sender fremmøde data til serveren og viser en **success skærm** med et grønt flueben og en velkomstbesked.

Det er alt, hvad der skal til. Din families fremmøde er blevet registreret.

## Label udskrivning

Hvis en netværksprinter er konfigureret, udskriver appen automatisk labels efter check-in:

- **Navne labels** udskrives for hver person, som er tildelt en gruppe, der har **Udskriv navneskilt** indstillingen aktiveret. Navne labels inkluderer personens navn, deres gruppe tildeling og allergi/noter information, hvis nogen er på fil.
- **Forælder afhentning slips** udskrives når en hvilken som helst indcheckede person er i en gruppe, der har **Forælder afhentning** indstillingen aktiveret. Afhentning slip viser børnene, deres gruppe tildelinger og en unik **4-tegns sikkerhedskode**.

:::info
Den samme sikkerhedskode vises på både barnets navneskilt og forælderens afhentning slip. Ved afhentning tid matcher frivillige koderne for at verificere, at den rigtige voksen afhenter hvert barn.
:::

Sikkerhedskoden genereres frisk for hver check-in og bruger kun konsonanter og cifre (vokaler er udelukket for at undgå at danne upassende ord).

:::warning
Hvis labels ikke udskrives, skal du åbne Admin indstillinger ved at trykke på **kirke logoet** syv gange, og derefter skal du trykke på **Skift printer** for at verificere printer forbindelsen. Se [Printer opsætning](../getting-started/printer-setup) for fejlfinding trin.
:::

## Hvad sker der efter check-in

- Hvis en printer er konfigureret, udskriver appen alle labels og returnerer derefter automatisk til **opslags skærmen**, klar til næste familie.
- Hvis ingen printer er konfigureret, vises success skærmen i et par sekunder og returnerer derefter automatisk til **opslags skærmen**.

Du behøver ikke at trykke på noget for at komme tilbage til opslags skærmen -- appen håndterer overgangen automatisk.

:::tip
Appen nulstilles helt efter hver check-in, så der er ingen risiko for, at en familie ser en anden families information.
:::

## Hvad bliver registreret

Når du trykker **Check-in**, sender appen følgende til serveren for hvert husstandsmedlem, som har en gruppe tildeling:

- **Personen**, som checkes ind
- **Servisen**, som de deltager i
- **Servin tiden** og **gruppen**, som de er tildelt til

Disse data vises i B1 Admin under afsnittet Fremmøde, hvor dine kirke administratorer kan se og administrere fremmøde records. Se [check-in administrationsguiden](../../b1-admin/attendance/check-in.md) for detaljer.
