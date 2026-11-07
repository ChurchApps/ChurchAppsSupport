---
title: "Gruppförfrågningar om anslutning"
description: "Granska, godkänn eller avslå förfrågningar om att gå med i grupper i B1 Admin, hitta väntande förfrågningar som ledare eller admin och ange orsak vid avslag."
---

# Gruppförfrågningar om anslutning

<div class="article-intro">

När en grupp är konfigurerad med en anslutningspolicy som kräver godkännande kan personer skicka förfrågningar om att gå med. Gruppledare och administratörer granskar dessa förfrågningar och godkänner eller avslår dem. Detta ger din kyrka kontroll över gruppmedlemskap samtidigt som det blir enkelt för personer att visa intresse för att gå med.

</div>

## Instruktionsvideo

<YouTube id="1vj-suCiIsE" title="Gruppförfrågningar och gruppkalendrar i B1" next="Konfigurera gudstjänster och närvaro i B1" nextUrl="/docs/b1-admin/attendance/setup" />

<div class="prereqs">
<h4>Innan du börjar</h4>

- Du behöver behörighet att hantera grupper, eller så behöver du vara ledare för just den gruppen. Se [Roller och behörigheter](../people/roles-permissions.md) för mer information.
- Gruppen måste ha sin anslutningspolicy inställd på **Förfrågan** (godkännande krävs). Se [Skapa grupper](./creating-groups.md) för hur du konfigurerar anslutningspolicyer.

</div>

## Förstå anslutningspolicyer

Grupper kan ha tre olika anslutningspolicyer:

- **Öppen** -- Vem som helst kan gå med direkt utan godkännande
- **Förfrågan** -- Personer skickar en förfrågan om att gå med som kräver godkännande
- **Stängd** -- Ingen kan begära att gå med (medlemmar måste läggas till manuellt)

När en grupp använder policyn **Förfrågan** går alla anslutningsförsök genom godkännandeflödet som beskrivs på den här sidan.

## Visa väntande förfrågningar

### För gruppledare

1. I B1 Admin, öppna [Jump menu](../introduction.md#getting-around-with-the-jump-menu) och välj **People > Groups**
2. Klicka på gruppens namn
3. Avsnittet **Members** visar hur många förfrågningar som väntar. Klicka på **All members** -- väntande förfrågningar för den här gruppen visas överst i medlemslistan

### För administratörer

Administratörer med behörighet att hantera grupper kan se väntande förfrågningar för alla grupper:

1. I Jump menu, välj **People > Groups**
2. Klicka på knappen **pending requests** i sidhuvudet (till exempel "3 pending requests"). Den visas endast när det finns förfrågningar som väntar.
3. Granska alla väntande förfrågningar i hela kyrkan

## Granska en förfrågan om anslutning

Varje förfrågan om anslutning visar:

- **Personens namn och foto** -- Personen som begär att gå med
- **Valfritt meddelande** -- Ett personligt meddelande som förklarar varför de vill gå med (om ett sådant har lämnats)
- **Datum för förfrågan** -- När förfrågan skickades

För att granska en förfrågan:

1. Läs personens meddelande om de har lämnat ett
2. Klicka på personens namn för att visa deras profil vid behov
3. Bestäm om du vill godkänna eller avslå förfrågan

## Godkänna en förfrågan

1. Klicka på **Approve** vid förfrågan om anslutning
2. Personen läggs omedelbart till i gruppen som medlem
3. Den som begärde får ett meddelande om att förfrågan godkändes
4. Förfrågan markeras som godkänd i systemet

:::tip
När du godkänner en förfrågan blir personen en vanlig gruppmedlem. Du kan senare befordra dem till gruppledare vid behov från sidan [Group Members](./group-members.md).
:::

## Avslå en förfrågan

1. Klicka på **Decline** vid förfrågan om anslutning
2. Ange eventuellt en anledning till att du avslår (upp till 500 tecken)
3. Klicka på **Confirm**
4. Den som begärde får ett meddelande med din anledning till avslaget (om en sådan har angetts)
5. Förfrågan markeras som avslagen

:::info
Att ange en anledning till avslaget hjälper personen att förstå varför förfrågan inte godkändes och kan uppmuntra dem att försöka igen senare eller utforska andra grupper.
:::

## Godkänna från sidan Tasks

Varje förfrågan om anslutning skapar också en uppgift under **Serving &rarr; My Work** med titeln "*Person* requested to join *Group*." Uppgiften tilldelas gruppens ledare. Om gruppen ännu inte har någon ledare går den till personal med behörigheten **Group Members &gt; Edit**, eller till kyrkans domänadministratörer om ingen har den behörigheten. Personal och administratörer som får uppgiften på detta sätt får också ett meddelande med en länk direkt till den.

När du öppnar uppgiften visas den sökandes namn, gruppen och deras valfria meddelande, med knapparna **Approve** och **Decline** direkt på uppgiftskortet (Decline öppnar samma valfria anledningsfält som beskrivs ovan). Detta ger ledare ett andra, aviseringsbaserat sätt att hantera en förfrågan utan att öppna gruppens medlemslista.

När du avgör en förfrågan från något av dessa ställen -- gruppens medlemslista eller uppgiftskortet under Tasks -- stängs den överallt, så ledare ser aldrig en föråldrad uppgift för en förfrågan som någon redan har hanterat.

## Aviseringar

Systemet för förfrågningar om anslutning skickar aviseringar automatiskt:

- **När en förfrågan skickas** -- Alla gruppledare får ett meddelande. Om gruppen saknar ledare meddelas i stället personalen eller administratörerna som tilldelats uppgiften (se ovan).
- **När en förfrågan godkänns** -- Den som begärde får en bekräftelse
- **När en förfrågan avslås** -- Den som begärde får ett meddelande med eventuell anledning till avslaget

Aviseringar visas i användarens aviseringscenter på B1.church och i mobilappen. I B1 Admins aviseringsklocka öppnar du gruppen på din kyrkas B1.church-webbplats i en ny flik genom att klicka på en avisering om förfrågan om anslutning (eller på **View Details**).

## Hantera förfrågningar från medlemmens sida

Personer kan hantera sina egna förfrågningar om anslutning från B1.church:

- Se status för sina väntande förfrågningar på gruppens detaljsida
- Avbryta en väntande förfrågan om de ändrar sig
- Se om deras förfrågan godkändes eller avslogs

## Bästa praxis

- **Svara snabbt** -- Försök att granska förfrågningar inom 24-48 timmar så att personer inte behöver vänta
- **Var tydlig i avslagsanledningar** -- Hjälp personer att förstå nästa steg eller alternativa möjligheter
- **Kontrollera profiler** -- Granska personens profil för att se om de passar gruppen
- **Kommunicera förväntningar** -- Se till att gruppens beskrivning tydligt anger vem gruppen är till för

## Relaterade artiklar

- [Skapa grupper](./creating-groups.md) -- Lär dig att skapa grupper och konfigurera anslutningspolicyer
- [Group Members](./group-members.md) -- Hantera befintliga gruppmedlemmar
- [Group Calendar](./group-calendar.md) -- Schemalägg gruppmöten och evenemang
