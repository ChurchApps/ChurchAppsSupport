---
title: "Översikt över planer"
description: "Få en översikt över volontärers uppdrag för många gudstjänstdatum i B1 Admin, upptäck obesatta positioner och fyll i eller maila ditt team från ett rutnät."
---

# Översikt över planer

<div class="article-intro">

Översikten över planer ger dig en samlad bild av alla dina volontäruppdrag över flera gudstjänstdatum på en gång. I stället för att öppna varje plan separat kan du se vem som tjänstgör på varje position under de kommande veckorna i ett enda rutnät, och snabbt upptäcka eventuella luckor som fortfarande behöver fyllas.

</div>

<div class="prereqs">
<h4>Innan du börjar</h4>

- Skapa minst ett ministerium och en plantyp under tjänstgöringsområdet
- Skapa [tjänsteplaner](./plans.md) med datum och volontäruppdrag
- Se till att dina volontärer har lagts till i din [personkatalog](../people/adding-people.md)

</div>

## Öppna översikten

1. Öppna [Hoppmenyn](../introduction.md#getting-around-with-the-jump-menu) i B1 Admin (sökfältet överst till vänster), expandera **Tjänstgöring** och klicka på **Planer**.
2. Välj en **ministeriflik** överst på sidan.
3. Klicka på **Översikt** bredvid plantypen i listan **Plantyper**, eller öppna plantypen och klicka på **Översikt** överst på sidan.

Översikten omfattar den plantyp du öppnade den från. Klicka på plantypens namn överst i översikten för att återgå till dess planlista.

## Läsa översiktens rutnät

Översikten visar ett rutnät där:

- **Rader** representerar varje position (t.ex. "Musik: Gitarr", "Teknik: Projektion") grupperade efter kategori
- **Kolumner** representerar kommande gudstjänstdatum (t.ex. "14 apr", "21 apr")
- **Celler** visar namnet på den volontär som är tilldelad den positionen på det datumet

Celler som är markerade i **rött** är obemannade, det vill säga ingen volontär har tilldelats ännu. Det gör det enkelt att se bemanningsluckor med en blick, utan att behöva öppna varje plan separat.

:::tip
Volontärernas namn visas i förkortad form (förnamn och initial för efternamnet, t.ex. "John D.") för att hålla rutnätet kompakt när du har många positioner.
:::

## Tilldela volontärer direkt från översikten

Du behöver inte öppna enskilda planer för att fylla lediga platser. Klicka på valfri cell i rutnätet för att öppna ett tilldelningsfönster för den positionen och datumet. Där kan du:

- Välja en person från ditt team att tilldela positionen
- Klicka på **Ta bort** bredvid någon som redan är tilldelad för att ta bort personen från platsen
- Spara ändringen utan att lämna översikten

Det gör det möjligt att bemanna ett helt schema i ett svep. Arbeta över veckor och positioner utan att navigera in och ut ur enskilda planer.

## Schemalägg automatiskt från översikten

Klicka på **Schemalägg automatiskt** för att låta B1 fylla alla öppna, obemannade platser i det aktuella rutnätet samtidigt. För varje plan i vyn hämtar B1 kandidater från gruppen som är kopplad till varje position och fyller lediga platser automatiskt. Den rapporterar också hur många av de synliga planerna den lyckades fylla. Planerna fylls en i taget, så att samma volontär inte dubbelbokas på två datum i samma omgång.

:::info
Automatisk schemaläggning fyller endast platser som redan är tomma. Den ersätter aldrig en befintlig tilldelning.
:::

## Maila alla schemalagda

Klicka på **Maila volontärer** för att skicka ett meddelande till alla volontärer som är tilldelade någonstans inom det filtrerade datumintervallet och ministeriet, i en enda åtgärd, i stället för att maila plan för plan. B1 rapporterar hur många e-postmeddelanden som skickades och hur många som misslyckades.

## SMS:a alla schemalagda

Om din kyrka har en [SMS-leverantör](../settings/church-settings.md#texting) kopplad och du både kan redigera planer och skicka SMS, visas en knapp **SMS:a volontärer** överst i översikten.

1. Klicka på **SMS:a volontärer**.
2. Dialogrutan visar hur många volontärer som kommer att få SMS-et (till exempel "12 av 14 volontärer kommer att få detta SMS"), samt hur många som har avregistrerat sig från SMS och hur många som saknar telefonnummer i systemet.
3. Skriv ditt **Meddelande**. Du kan klicka på en platshållare för att infoga varje volontärs namn eller din kyrkas namn.
4. Klicka på **Skicka**. B1 rapporterar hur många SMS som skickades.

Varje volontär som är tilldelad inom datumintervallet får ett SMS till mobilnumret i sin profil, även om hen tjänstgör på flera datum. Personer som delar telefonnummer (till exempel en familjetelefon) får endast ett SMS. Volontärer som svarade STOP på ett tidigare SMS hoppas över.

:::info
SMS skickas via din kyrkas egen SMS-leverantör, så dess prissättning gäller. Om din kyrka slut på SMS-krediter stoppas sändningen och dialogrutan informerar dig om det. Ett enskilt utskick når högst 200 volontärer. Begränsa datumintervallet om du har fler.
:::

## Markera en volontärs schema

Använd rullgardinsmenyn **Markera** för att välja en person från ditt team. Varje cell där personen är tilldelad markeras i rutnätet, så att du kan se var hen redan tjänstgör innan du lägger till hen på en annan plats. Välj **Alla** för att stänga av markeringen.

## Filtrera översikten

Du kan justera vad översikten visar med hjälp av kontrollerna ovanför rutnätet. Rutnätet uppdateras så snart du ändrar dem.

- **Alla positioner / Endast obemannade**: Välj **Endast obemannade** för att dölja rader där alla datum redan är bemannade, så att du kan fokusera på de positioner som fortfarande behöver en volontär.
- **Startdatum / Slutdatum**: Som standard visar översikten 12 veckor framåt i tiden. Ange egna datum för att utöka eller begränsa intervallet.

## Exportera till CSV

Klicka på **Exportera CSV** för att ladda ned det aktuella rutnätet som ett kalkylblad. Exporten innehåller alla positioner och volontärtilldelningar för det filtrerade datumintervallet, vilket gör det enkelt att dela med ledare för ministerier eller skriva ut inför planeringsmöten.

:::info
CSV-exporten återspeglar de filter som för närvarande är aktiva. Endast de datum och den plantyp som visas i rutnätet ingår i nedladdningen.
:::

## Relaterade artiklar

- [Tjänsteplaner](./plans.md): Skapa och hantera enskilda tjänsteplaner
- [Gudstjänstordning](./service-order.md): Bygg upp gudstjänstordningen inom en plan
- [Schemalägga lektioner](./scheduling-lessons.md): Schemalägg lektioner tillsammans med dina tjänsteplaner
