---
title: "Hantera inskickningar"
description: "Granska, skriv ut och tilldela om formulärinlämningar i B1 Admin, flytta svar till rätt person och följ upp besökskort och böneönskemål."
---

# Hantera inskickningar

<div class="article-intro">

När ditt formulär är publicerat börjar inskickningar komma in. Fliken **Formulärinskickningar** låter dig granska alla svar, se vem som har skickat in ett svar och använda uppgifterna för att följa upp med din församling i rätt tid.

</div>

<div class="prereqs">
<h4>Innan du börjar</h4>

- [Skapa ett formulär](./creating-forms.md) med minst en fråga
- Dela formuläret via dess publika webbadress eller bädda in det på din [webbplats](../website/managing-pages.md)

</div>

## Visa inskickningar

1. Öppna [Hoppmenyn](../introduction.md#getting-around-with-the-jump-menu) (sökfältet överst till vänster i B1 Admin), expandera **Personer** och klicka på **Formulär**.
2. Klicka på det formulär du vill granska.
3. Gå till fliken **Formulärinskickningar**.

Du ser en lista över alla svar som har kommit in för det formuläret. Varje inskickning visar svarandens uppgifter och datumet för inskickningen, följt av en kolumn för varje fråga i formuläret. Om ditt formulär har många frågor kan du scrolla tabellen åt sidan för att se resten av kolumnerna.

## Granska enskilda inskickningar

Klicka på valfri inskickning för att visa alla detaljer. Du ser alla svar som personen har lämnat på varje fråga i formuläret.

Klicka på **utskriftsikonen** bredvid inskickningen för att skriva ut personens ifyllda svar. Det är användbart för ett pappersarkiv eller ett signerat medgivande som du behöver spara. Utskriften visar din kyrkas logotyp (**logotypen för ljus bakgrund** från [Webbplats > Utseende](../website/appearance.md), om du har laddat upp en) centrerad överst, med din kyrkas namn under. Utskrifter använder alltid mörk text på vit bakgrund, även om du använder B1 Admin i mörkt läge. Detta skiljer sig från [utskrift av ett tomt formulär](./creating-forms.md#printing-a-blank-form); här skrivs en persons redan inskickade svar ut, inte en tom kopia. Samma utskriftsikon visas överallt där en inskickning visas, inklusive på en [persons profil](../people/adding-people.md#working-with-forms).

## Byta person på en inskickning

Om en inskickning är kopplad till fel person, till exempel om två familjemedlemmar delar en e-postadress, kan du flytta den till rätt person eller koppla bort den.

1. På fliken **Formulärinskickningar** klickar du på ikonen **Byt person** (två pilar) bredvid personens namn. Samma ikon visas bredvid en inskickning på en [persons profil](../people/adding-people.md#working-with-forms).
2. I dialogrutan **Byt person** söker du efter rätt person och klickar på **Flytta till denna person**.
3. Eller klicka på **Koppla bort (anonym)** för att lösgöra inskickningen från alla personer. Den visas då som **Anonym**.

Det är bara kopplingen som ändras. Svaren är desamma, och inga uppföljande e-postmeddelanden skickas igen.

:::info
För formulär som är inställda på att skapa en personpost gäller följande: när någon är inloggad på din kyrkas webbplats när den skickar in ett formulär, kopplas inskickningen till deras egen post, även om en annan person i din databas delar deras e-postadress. När du [slår ihop två personposter](../people/adding-people.md) flyttas den borttagna personens formulärinskickningar till den person du behåller.
:::

## Så samlas inskickningar in

Inskickningar kan komma in via flera kanaler:

- **Publik webbadress** -- Om ditt formulär har en publik webbadress (fristående formulär) kan vem som helst med länken skicka in ett svar. Dela webbadressen via e-post, sociala medier eller textmeddelanden.
- **Inbäddat på din webbplats** -- Formulär som är inbäddade på din B1-webbplats samlar in inskickningar automatiskt när besökare fyller i dem.
- **Internt bruk** -- Personal och volontärer kan också skicka in formulär för andras räkning direkt i B1 Admin.

:::tip
Kontrollera fliken **Formulärinskickningar** regelbundet för formulär som besökskort eller bönförfrågningar, så att du kan följa upp snabbt.
:::

## Använda inskickningsdata

Uppgifterna som samlas in via formulär kan hjälpa dig att:

- Följa upp eventanmälningar och planera därefter
- Följa upp med besökare eller nya medlemmar
- Samla in enkätsvar för planering av verksamheten
- Ta emot betalningar för evenemang eller program

:::info
Formulärmedlemmar med rollerna **Admin** eller **Endast visning** kan öppna fliken **Formulärinskickningar**. Se till att rätt personer i ditt team har tillgång till de formulär de behöver genom att hantera roller på fliken **Formulärmedlemmar**.
:::

:::info
Om ett fristående formulär [är kopplat till en grupp](./creating-forms.md#linking-a-form-to-a-group) kan gruppens ledare läsa och skriva ut dess inskickningar från gruppens sida på B1.church, utan att vara formulärmedlemmar. Ledare kan där också läsa svaren på anmälningsfrågor för gruppens evenemang. Se [Gruppdetaljer](../../b1-church/groups/group-details.md#linked-forms).
:::

:::tip
Om ett **fristående** formulär är inställt på att skapa en personpost visas även inskickningar som matchats mot en befintlig person i avsnittet **Formulär** på personens sida under Personer, inte bara formulär av typen Personer.
:::

## Nästa steg

- Lär dig hur du bygger och anpassar formulär i [Skapa formulär](./creating-forms.md)
- Lägg till personer från formulärinskickningar i din [personkatalog](../people/adding-people.md) för löpande uppföljning
- [Koppla ett formulär till en grupp](./creating-forms.md#linking-a-form-to-a-group) så att dess ledare kan läsa svaren, eller [lägg automatiskt till avsändare i gruppen](./creating-forms.md#automatically-adding-submitters-to-a-group) så att ett fristående anmälningsformulär bygger upp en egen deltagarlista
