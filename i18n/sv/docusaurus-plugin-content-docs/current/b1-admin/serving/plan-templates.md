---
title: "Planmallar"
description: "Spara en gudstjänstplans ordning och positioner som en återanvändbar mall i B1 Admin och tillämpa den på kommande planer med ett klick."
---

# Planmallar

<div class="article-intro">

Planmallar låter dig spara en återanvändbar ögonblicksbild av en plans ordning för gudstjänsten eller dess positioner och tillämpa den på kommande planer med ett klick. Istället för att bygga upp samma struktur varje vecka sparar du den en gång och använder den på så många kommande planer som du behöver.

</div>

## Instruktionsvideo

<YouTube id="p8O9e4y7geA" title="Planmallar, uppgifter och arbetsflöden i B1" next="Skapa kalendrar, händelser och rumsbokningar i B1" nextUrl="/docs/b1-admin/calendars/creating-calendars" />

<div class="prereqs">
<h4>Innan du börjar</h4>

- Skapa minst en [serviceplan](plans.md) med en ordning för gudstjänsten eller positioner definierade
- Du behöver åtkomst till området Tjänst i B1 Admin

</div>

## Spara en plan som mall

1. Öppna en befintlig plan från området **Tjänst**.
2. I planens avsnitt **Ordning för gudstjänsten** klickar du på **Spara som mall**.
3. Ge mallen ett namn (till exempel "Vanlig söndag" eller "Lovsång + predikan").
4. Spara. Mallen fångar planens aktuella ordning för gudstjänsten, positioner och anteckningar just i det ögonblicket.

## Hantera mallar

Klicka på **Mallar** ovanför planlistan på valfri sida för en plantyp för att öppna **Planmallar**. Därifrån kan du:

- **Byt namn** – ändra mallens visningsnamn
- **Uppdatera från plan** – ersätta mallens innehåll med planens aktuella läge (användbart när du har förfinat din standardstruktur)
- **Tillämpa** – använda mallen på en eller flera kommande planer
- **Ta bort** – ta bort en mall som du inte längre behöver

## Tillämpa en mall på planer

1. Klicka på **Mallar** ovanför planlistan på sidan för plantypen.
2. Klicka på ikonen **Tillämpa** (kopieringsikonen) bredvid mallen du vill använda.
3. Välj vilka kommande planer som mallen ska tillämpas på genom att markera deras kryssrutor.
4. Välj vad som ska kopieras:
   - **Ordning för gudstjänsten** – ersätter de valda planernas objekt i ordningen för gudstjänsten med mallens objekt
   - **Positioner** – ersätter de valda planernas positioner (och deras tilldelningar) med mallens positioner
5. Klicka på **Tillämpa**.

Om mallen har anteckningar ersätter tillämpningen även de valda planernas anteckningar med mallens anteckningar.

:::warning
Att tillämpa positioner ersätter alla befintliga positioner och tilldelningar på de valda planerna. Kontrollera att du inte redan har schemalagt volontärer för dessa positioner innan du tillämpar mallen.
:::

:::tip
Tillämpa ordningen för gudstjänsten utan positioner när du vill ha en konsekvent struktur för sånger och predikan, men volontärerna redan är tilldelade olika varje vecka.
:::

## Starta en ny plan från en mall

Mallar delas mellan plantyperna i ett ministerium. När du klickar på **Ny plan** och ministeriet har mallar innehåller formuläret för den nya planen en lista med **Starta från mall**. Välj en mall och spara, så skapas den nya planen med mallens ordning för gudstjänsten, positioner och anteckningar. När du väljer en mall ersätts alternativen **Kopiera från föregående plan** för den planen.

## Håll mallarna uppdaterade

Om din standardstruktur för gudstjänsten ändras öppnar du mallhanteraren och använder **Uppdatera från plan** för att synkronisera mallen från din senaste plan, i stället för att bygga om den från början.

## Relaterade artiklar

- [Serviceplaner](plans.md) – Skapa och hantera enskilda serviceplaner
- [Översikt över planer](plans-overview.md) – Se alla kommande uppdrag i alla planer i ett rutnät
- [Ordning för gudstjänsten](service-order.md) – Bygg ordningen för gudstjänsten inom en plan
