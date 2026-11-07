---
title: "Givningsbesked"
description: "Skapa årsbesked för alla givare i B1 Admin och ladda ner dem som CSV-filer eller skriv ut dem för utskick med avdragsgilla summor."
---

# Givningsbesked

<div class="article-intro">

Vid slutet av varje år behöver dina givare en sammanställning av sina skattemässigt avdragsgilla gåvor för sina egna register. B1 Admin gör det enkelt att skapa dessa besked för alla givare samtidigt, vilket sparar dig många timmars manuellt arbete.

</div>

<div class="prereqs">
<h4>Innan du börjar</h4>

- Kontrollera att dina [fonder](funds.md) är korrekt markerade som **Skattemässigt avdragsgilla** -- endast gåvor till skattemässigt avdragsgilla fonder visas på besked
- Se till att alla gåvor har [registrerats](recording-donations.md) och att eventuella onlinetransaktioner har [importerats från Stripe](stripe-import.md)

</div>

## Öppna givningsbesked

1. I **B1 Admin**, öppna [Hoppmenyn](../introduction.md#getting-around-with-the-jump-menu) (sökfältet överst till vänster) och expandera **Donationer**.
2. Klicka på **Givningsbesked**. Sidan **Batchvisa givningsbesked** öppnas.

## Skapa besked

1. I panelen **Välj år** väljer du **År** i rullgardinsmenyn. Du kan välja innevarande år eller något av de fem föregående åren.
2. Sidan laddar endast de donationer som är daterade under det året (1 januari till 31 december), så den öppnas snabbt även om din kyrka har många år av givandehistorik. När du väljer ett annat år uppdateras sammanfattningen med det årets donationer. Panelen **Sammanfattning** under året visar statistik för det året, bland annat:
   - **Totalt antal givare** -- antalet personer som gav
   - **Totalt antal donationer** -- antalet enskilda donationsposter
   - **Totalt belopp** -- det sammanlagda beloppet för alla gåvor

## Ladda ned besked

Panelen **Nedladdningsalternativ** ger dig två sätt att få besked till dina givare:

### Ladda ned som CSV-filer

Under **Enskilda CSV-filer** klickar du på **Ladda ned ZIP** för att hämta en ZIP-fil som innehåller en separat CSV-fil för varje givare. Det här är användbart om du vill skicka besked individuellt via e-post eller importera dem till ett annat system.

### Skriv ut alla besked

Under **Utskriftsbara besked** klickar du på **Skriv ut alla** (knappen visar antalet besked) för att öppna en utskriftsvänlig vy med varje givares besked för valt år i din webbläsare. Därifrån använder du webbläsarens utskriftsfunktion för att skicka dem till en skrivare. Varje besked börjar på en ny sida så att de är redo att vikas och skickas, och bescheden är sorterade efter givarens efternamn och sedan förnamn.

Om du har laddat upp en **Logotyp för ljus bakgrund** under [Webbplats > Utseende](../website/appearance.md) skrivs den ut centrerad överst på varje besked, ovanför beskedets rubrik. Detta gäller både **Skriv ut alla** och ett enskilt givarbesked som skrivs ut från dess post.

:::tip
Kör dina besked tidigt i januari medan uppgifterna fortfarande är färska. Kontrollera dubbelt att dina fonder är korrekt markerade som skattemässigt avdragsgilla innan du skapar besked -- endast gåvor till skattemässigt avdragsgilla fonder tas med.
:::

:::info
Givningsbesked innehåller endast donationer som är kopplade till fonder där inställningen **Skattemässigt avdragsgilla** är aktiverad. Om en fond inte är markerad som skattemässigt avdragsgill kommer dess donationer inte att visas på beskedet. Du kan hantera den här inställningen på sidan [Fonder](funds.md).
:::

## Kvittoformat för Kanada, Australien och Nya Zeeland

Kyrkor utanför USA kan byta beskedet till sitt lands officiella kvittolayout. Klicka på **Beskedsformat** överst på sidan Givningsbesked (eller gå till **Inställningar** och öppna avsnittet **Givande**), och ställ in **Beskedsformat** till **Kanada**, **Australien** eller **Nya Zeeland**. Fyll sedan i de fält som visas: ditt registreringsnummer (CRA-registreringsnummer, ABN eller registreringsnummer för välgörenhetsorganisation i Nya Zeeland), din organisations adress, namnet på den person som är behörig att signera kvitton och, för Kanada, staden där kvitton utfärdas.

Bescheden innehåller då den text som din skattemyndighet förväntar sig (för Kanada "Officiellt kvitto för inkomstskatteändamål" med CRA-referensen), ett kvittonummer i formen `YEAR-DONORID`, det berättigade beloppet som endast räknas från skattemässigt avdragsgilla fonder, samt en separat rad för eventuella gåvor till icke avdragsgilla fonder. Givare ser samma kvittoblock när de skriver ut sitt eget besked från B1.church.

## Vad medlemmar ser i B1.church

Samma avsnitt **Givande** i inställningarna styr vad medlemmar ser på sin egen givarsida i B1.church:

- **Givandehistorik för medlemmar** avgör vilka år medlemmar kan se. **Alla år** är standard. **Till och med 2025** (eller något annat år) stoppar vid det året, så att medlemmar inte kan visa eller skriva ut ett senare år förrän du tillåter det. Använd detta för att hålla inne innevarande år medan du slutför rättelser och återbetalningar. **Dold** tar bort givandehistorik, årssummor och utskrift av besked helt. Medlemmar kan fortfarande ge.
- **Givandenotering** är ett kort meddelande som visas på medlemmens givarsida och i givandehistoriken, och skrivs ut längst ned på varje givningsbesked, inklusive de besked du skriver ut här. Använd den för saker som din återbetalningspolicy.

Dessa inställningar ändrar endast vad medlemmar ser. Du kan fortfarande skriva ut vilket år som helst från den här sidan.

## Nästa steg

Om du behöver granska donationsuppgifter innan du skapar besked kan du besöka sidan [Donationsrapporter](donation-reports.md) eller kontrollera enskilda [batcher](batches.md).
