---
title: "Uppgifter"
---

# Uppgifter

<div class="article-intro">

Med uppgifter kan du tilldela åtgärder till personer eller grupper i din församling. Oavsett om det är en engångsgöromål eller ett återkommande ansvar hjälper uppgifter dig att följa upp vad som behöver göras och vem som ansvarar för det, så att ingenting glöms bort.

</div>

<div class="prereqs">
<h4>Innan du börjar</h4>

- Kontrollera att de personer eller [grupper](../groups/creating-groups.md) som du vill tilldela uppgifter till finns i B1 Admin
- Välj **Serving > Mitt arbete** i [Hoppmenyn](../introduction.md#getting-around-with-the-jump-menu) för att se uppgifter

</div>

## Visa uppgifter

Välj **Serving > Mitt arbete** i Hoppmenyn (eller sök efter "Mitt arbete"). Listan **Uppgifter** visar varje uppgifts titel, vilken person eller grupp den gäller, vem den är tilldelad till, när den skapades och dess status. Dina [arbetsflödeskort](./workflows.md) visas bredvid under **Mina kort**. Mottagare kan också se och arbeta med sina kort och öppna uppgifter från skärmen **Jag** i B1-appen.

Använd flikarna ovanför listan för att växla mellan uppgifterna **Tilldelat mig**, **Tilldelat mina grupper** och **Begärt av mig**. Varje flik visar hur många uppgifter den innehåller.

:::tip
Som standard visas endast öppna uppgifter. Välj **Stängda** ovanför listan för att i stället se slutförda uppgifter.
:::

## Skapa en uppgift

1. På sidan **Mitt arbete** klickar du på **Lägg till uppgift**. Formuläret **Ny uppgift** öppnas.
2. Klicka eventuellt i rutan **Gäller** och välj den person eller grupp som uppgiften handlar om. Lämna rutan tom för en enkel att-göra-punkt som inte handlar om någon särskild person, till exempel en påminnelse till dig själv.
3. Klicka i rutan **Tilldela till**. I fönstret **Välj en person eller grupp** söker du på fliken **Person**, eller byter till fliken **Grupp** och söker efter en grupp, och väljer sedan resultatet.
4. Ange en **Titel** för uppgiften.
5. Välj eventuellt ett **Förfallodatum**.
6. Lägg till **Anteckningar** med detaljer eller instruktioner för mottagaren.
7. Klicka på **Spara**.

Uppgiften visas nu i uppgiftslistan och syns för mottagaren på deras startsida och i mobilappen.

## Hantera en uppgift

Klicka på en uppgift för att öppna dess detaljsida. Därifrån kan du:

- **Stänga eller öppna uppgiften igen** -- Klicka på **Stäng uppgift** när arbetet är klart, eller på **Öppna uppgift igen** för att öppna den på nytt.
- **Tilldela uppgiften på nytt** -- Klicka på **Tilldela** för att välja en annan person eller grupp.
- **Ändra vem den gäller** -- Klicka på **Koppla** för att välja en annan person eller grupp, eller välj **Ingen person eller grupp** för att ta bort kopplingen.
- **Ändra förfallodatumet** -- Välj ett datum i fältet **Förfaller**; det sparas när du klickar utanför fältet. (Uppgifter som skapats för en [bekräftelse av tjänstetilldelning](./workflows.md#serving-assignment-confirmations) visar sitt förfallodatum men kan inte ändras här.)
- **Lägga till anteckningar** -- Skriv uppdateringar eller detaljer för mottagaren i uppgiftens anteckningar.
- **Ställa in påminnelser** -- Se [Påminnelser för uppgifter](#task-reminders) nedan.

## Påminnelser för uppgifter

En uppgift med förfallodatum kan påminna mottagaren innan den förfaller.

1. På uppgiftens sida klickar du på **Redigera** bredvid **Påminnelser**.
2. Slå på **Skicka påminnelser för den här uppgiften**.
3. Under **När ska påminnelserna skickas?** väljer du upp till tre tidpunkter: **7 dagar före**, **3 dagar före**, **1 dag före** eller **Samma dag**.
4. Ange **Tidpunkt på dygnet** och eventuellt ett **Meddelande**.
5. Under **Skicka via** väljer du **Push**, **E-post** och, om din församling har en [sms-leverantör](../settings/church-settings.md#texting) kopplad, **Sms**.
6. Klicka på **Spara påminnelser**.

Om uppgiften saknar förfallodatum varnar B1 dig om att inga påminnelser skickas förrän ett datum har angetts i fältet **Förfaller**. Sms-påminnelser når endast personer som har slagit på **Textmeddelanden** i sina [aviseringsinställningar](../../b1-church/getting-started/notification-preferences.md), och varje sms kan kosta din församling pengar.

## Uppgiftens livscykel

1. En ny uppgift får statusen **Öppen**.
2. Mottagaren får ett meddelande och kan visa uppgiften från sin startsida, under **Serving > Mitt arbete** eller i mobilappen.
3. När arbetet är klart klickar mottagaren (eller en administratör) på **Stäng uppgift**.
4. Stängda uppgifter döljs från standardvyn men kan fortfarande hittas genom att välja **Stängda** ovanför uppgiftslistan.

:::info
B1 Admin skapar inte längre återkommande uppgifter enligt ett schema. För upprepad uppföljning av personer använder du ett [arbetsflöde](./workflows.md) med en [schematrigger](./workflows.md#schedule-triggers).
:::

:::tip
När du vill flytta många personer genom samma steg, till exempel uppföljning av nya besökare eller en medlemsprocess, använd [Arbetsflöden](./workflows.md). Arbetsflöden gör uppgifter till kort på en tavla med dra-och-släpp, med steg, förfallodatum och routing.
:::

:::info
Vissa uppgifter skapas automatiskt av andra delar av B1 och öppnas med ett särskilt granskningskort i stället för den vanliga vyn för anteckningar och omtilldelning. [Begäran om gruppanslutning](../groups/group-join-requests.md#approving-from-the-tasks-page), [begäran om ändring av profil](../profile/approving-profile-changes.md) och [begäran om radering av konto](../profile/account-deletion.md) fungerar alla på det här sättet.
:::

## Nästa steg

- Led personer genom en process i flera steg med [Arbetsflöden](./workflows.md)
- Använd [Arbetsflöden](./workflows.md) för att automatiskt föra personer genom upprepade processer
- Använd uppgifter tillsammans med [Gudstjänstplaner](./plans.md) för att följa upp åtgärder inför gudstjänstförberedelser
