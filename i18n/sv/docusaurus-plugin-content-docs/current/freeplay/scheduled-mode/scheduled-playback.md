---
title: "Schemalagd uppspelning på TV:n"
---

# Schemalagd uppspelning på TV:n

<div class="article-intro">

När en TV har kopplats till en kalender sköter FreePlay resten. Den laddar ner veckan framåt, byter innehåll vid de schemalagda tiderna och fortsätter spela från sitt eget lagringsutrymme om internet går ner. En lärare eller volontär kan ändå pausa, hoppa över och navigera med TV:ns fjärrkontroll.

</div>

<div class="prereqs">
<h4>Innan du börjar</h4>

- [Koppla TV:n till en kalender](./pairing-a-screen)
- [Lägg något i kalendern](./scheduling-the-calendar), eller ange en standardslinga för skärmens grupp

</div>

## Vad TV:n gör på egen hand

- **Öppnar direkt schemat** - När en kopplad TV startar FreePlay går den direkt till den schemalagda spelaren
- **Laddar ner i förväg** - FreePlay laddar ner alla filer som är schemalagda för de kommande 7 dagarna, plus standardslingan, och spelar från de nedladdade filerna
- **Spelar enligt klockan** - Vid varje schemalagd starttid byter skärmen till det innehållet. När inget är schemalagt spelas gruppens standardslinga
- **Söker efter ändringar** - FreePlay kontrollerar regelbundet FreePlay Admin efter ändringar i kalendern och laddar ner allt nytt
- **Åtgärdar trasiga filer** - Om en nedladdad fil inte går att spela hoppar FreePlay över den och laddar ner den igen

Innan de första filerna har kommit visar skärmen **Laddar schema...** eller **Laddar ner X av Y filer**. Om inget är schemalagt och gruppen saknar standardslinga visas **Inget är schemalagt just nu**.

## Informationspanelen

Tryck på **Välj** på fjärrkontrollen för att öppna informationspanelen. Den stängs av sig själv efter några sekunder. Panelen visar:

- **Övre högra hörnet** - **Klar t.o.m.** följt av ett datum när allt fram till det datumet är nedladdat, eller **Laddar ner** medan filer fortfarande kommer in. Under det visas hur många filer som är nedladdade och en förloppsindikator
- **Nedre vänstra hörnet** - Namnet på det som spelas (eller **Standardslinga**), vilket objekt som visas på skärmen och vad som kommer härnäst och när
- **Senast kontrollerad** - När FreePlay senast kontrollerade om schemaändringar

Panelen har också tre knappar:

- **Fäst den här spellistan** - Håll det aktuella innehållet i en loop och ignorera kalendern. Välj **Lossa spellistan** för att återgå till schemat
- **Bläddra i innehåll** - Lämna den schemalagda spelaren för att bläddra bland dina anslutna leverantörer
- **Inställningar** - Öppna FreePlays inställningar, där du kan [koppla bort eller koppla till en annan kalender](./pairing-a-screen#changing-or-unpairing-from-the-tv)

:::tip
För att återgå till schemat efter att du bläddrat, tryck på **Tillbaka** på fjärrkontrollen från skärmen **Innehållsleverantörer**, eller öppna **Inställningar**, välj **Koppla till en kalender** och välj **Tillbaka till schemat**. En kopplad TV återgår också till den schemalagda spelaren varje gång FreePlay kommer tillbaka i förgrunden, och den öppnar alltid till den schemalagda spelaren.
:::

## Fjärrkontrollens knappar

| Fjärrknapp | Åtgärd |
|---|---|
| **Välj** | Öppna informationspanelen |
| **Spela/Pausa** | Pausa eller återuppta. En play-ikon visas när uppspelningen är pausad |
| **Högerpil** | Nästa bild eller video |
| **Vänsterpil** | Föregående bild eller video |
| **Uppil** | Öppna bildöversikten för att hoppa till valfri bild |
| **Snabbspola framåt** | Hoppa 10 sekunder framåt i en video |
| **Spola bakåt** | Hoppa 10 sekunder bakåt i en video |
| **Tillbaka** | Stäng bildöversikten eller informationspanelen, eller öppna informationspanelen |

Nästa och föregående stannar inom det innehåll som spelas just nu. De hoppar bara från sista objektet till det första när schemat är inställt på att loopa. Snabbspola framåt och spola bakåt fungerar bara under en video. De gör ingenting på en bild.

### Hoppa till en bild

Tryck på **Upp** för att öppna bildöversikten. Den visar alla objekt i den aktuella spellistan eller lektionen. Flytta till det du vill ha och tryck på **Välj** för att hoppa direkt dit.

## Lektioner i lärarens takt

När ett schema är inställt på **Lärarstyrd** går bildspel inte vidare av sig själva. Läraren går framåt med **Högerpil**. En video spelas till slutet och går sedan vidare till nästa objekt.

En lektion i lärarstyrt läge stannar kvar på skärmen efter sin schemalagda sluttid tills läraren når sista bilden och den är klar. Därefter går skärmen vidare till nästa schemalagda objekt. Det förhindrar att en lektion som drar över tiden avbryts mitt i.

## Presentera från en webbläsare

Du kan också spela upp en skärms kalender i en webbläsare. I FreePlay Admin öppnar du skärmen från sidan **Skärmar** och klickar på **Presentera i webbläsaren**. Webbläsaren följer skärmens kalender på samma sätt som TV:n, och kontrollfältet visar vad som kommer härnäst. Använd **Mellanslag** för att pausa, **←** / **→** för att hoppa, **F** för helskärm och **Esc** för att avsluta.

## Relaterade artiklar

- **[Schemalägga kalendern](./scheduling-the-calendar)** - Ange vad som spelas och vad som händer när det är klart tidigt
- **[Hantera skärmar och grupper](./managing-screens)** - Kontrollera varje skärms nedladdningar från FreePlay Admin
- **[Spela upp innehåll](../content-providers/playing-content)** - Spelarkontroller när du spelar upp innehåll själv
