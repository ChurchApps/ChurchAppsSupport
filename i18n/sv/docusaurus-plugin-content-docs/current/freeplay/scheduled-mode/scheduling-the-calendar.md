---
title: "Planera kalendern"
description: "Schemalägg spellistor, gudstjänstplaner eller leverantörsmappar på skärmgrupper i FreePlay Admins kalender, veckovis eller engångs, med standardloopar som reserv."
---

# Planera kalendern

<div class="article-intro">

Sidan **Kalender** i FreePlay Admin styr vad varje skärmgrupp spelar och när. Lägg till ett schema för en spellista, en gudstjänstplan eller en leverantörsmapp, och ställ in att det upprepas varje vecka eller spelas en gång. När inget är schemalagt spelas gruppens standardloop.

</div>

<div class="prereqs">
<h4>Innan du börjar</h4>

- Skapa minst en skärmgrupp. Se [Hantera skärmar och grupper](./managing-screens.md#screen-groups)
- [Bygg en spellista](./building-playlists.md), eller ha en plantyp uppsatt i B1 Admin

</div>

## Läsa kalendern

1. Gå till **Kalender**.
2. Välj en skärmgrupp bland flikarna högst upp. Varje flik visar hur många scheman gruppen har.
3. Veckovyn går från måndag till söndag, kl. 06:00 till 22:00. En röd linje markerar den aktuella tiden.
4. Använd pilarna för att gå till föregående eller nästa vecka, eller klicka på **Idag** för att återgå till denna vecka.

Sidans underrubrik visar vilken tidszon som används för kalendern. Scheman följer din kyrkas tidszon, som du ställer in i B1 Admin under [Kyrkans information](../../b1-admin/settings/church-settings.md#time-zone). Om din kyrka inte har någon tidszon angiven använder FreePlay din campus tidszon. Kalendern och dina TV-apparater använder samma tidszon, så ett block som placeras kl. 09:00 i kalendern spelas kl. 09:00 på skärmen, även om din dator är inställd på en annan tidszon.

Scheman är färgkodade efter typ. En förklaringsruta visar färgerna:

- **Standardloop** - Randig bakgrund, visas bakom allt när gruppen har en standardloop
- **Spellista**
- **Gudstjänstplan**
- **Leverantörsmapp**

Varje block visar sitt namn, och högre block visar även tiderna, om det upprepas (**varje vecka** eller **en gång**) och vad som händer när det slutar i förtid.

## Ange standardloopen

Standardloopen spelas på gruppens skärmar när inget är schemalagt.

1. Klicka på **Standardloop…** i sidhuvudet på sidan **Kalender**. Om en standardloop redan är inställd visar knappen **Standardloop:** följt av spellistans namn.
2. Välj en **Spellista**, eller välj **Ingen – skärmen blir mörk**.
3. Klicka på **Spara**.

## Lägga till ett schema

Det finns tre sätt att börja ett nytt schema:

- Klicka på en tom plats i kalendern. Formuläret öppnas med den dagen och halvtimmen redan ifyllda.
- Klicka på **Lägg till schema** i sidhuvudet.
- Välj **Lägg till schema** i kommandopaletten (**Ctrl+K** eller **⌘K**).

Fyll sedan i formuläret:

1. **Spela** - Välj vad som ska spelas:
   - **Spellistor** - Valfri spellista du har byggt
   - **Gudstjänstplaner** - En plantyp från B1 Admin, markerad **(aktuell plan)**. Skärmen spelar den plan som är aktuell för plantypen varje vecka, inklusive Go Curriculum-lektioner (även anpassade), som använder Go-inloggningen kopplad till plantypens verksamhetsgren
   - **Leverantörsmapp…** - Öppnar **Välj en leverantörsmapp**. Bläddra till en mapp och klicka på **Använd denna mapp**. För att välja en annan mapp senare, klicka på **Ändra**
2. **Upprepas** - Välj de veckodagar schemat ska spelas. För ett enskilt datum i stället, aktivera **En gång** och välj **Datum**.
3. **Start** och **Slut** - Tiderna då schemat startar och stoppar.
4. **Om det slutar tidigt** - Vad som ska hända när innehållet tar slut före sluttiden:
   - **Loopa till sluttiden** - Börjar om från början. Bra för skyltloopar, meddelanden och nedräkningar
   - **Lärarstyrd** - Bilder väntar på lärarens fjärrkontroll. Lektionen förblir synlig efter sluttiden tills sista bilden
   - **Spela en gång, återgå sedan till standardloopen**
5. För schemán som upprepas, ställ in **Startar** till första datumet. Under **Slutar** väljer du **Aldrig**, eller väljer **På datum** och anger ett **Slutdatum**.
6. Klicka på **Spara**.

:::info
**Lärarstyrd** ersatte det äldre alternativet "håll sista bilden kvar". Scheman som sparats med det alternativet spelas nu som lärarstyrda.
:::

## Redigera eller ta bort ett schema

1. Klicka på schemats block i kalendern.
2. Ändra valfritt fält och klicka på **Spara**, eller klicka på **Ta bort** för att radera schemat.

## Överlappande scheman

Om två scheman överlappar visar formuläret en varning: **Överlappar ett annat schema. Det som startar senare vinner.** Medan det senare schemat körs spelar skärmarna upp det. När det slutar återgår de till det tidigare schemat om det fortfarande pågår.

## Hur skärmarna plockar upp ändringar

Parkopplade skärmar laddar ner allt som är schemalagt för de kommande 7 dagarna och kontrollerar själva om det finns ändringar. Du behöver inte röra TV-apparaten efter att du redigerat kalendern. För att se när en skärm har allt den behöver, kontrollera **Klar t.o.m.** på [Skärmsidan](./managing-screens.md).

## Relaterade artiklar

- **[Bygga spellistor](./building-playlists.md)** - Skapa de spellistor du schemalägger
- **[Schemalagd uppspelning på TV:n](./scheduled-playback.md)** - Hur lärarstyrda lektioner och fjärrkontrollen fungerar på TV:n
- **[Hantera skärmar och grupper](./managing-screens.md)** - Lägg till grupper och kontrollera varje skärms nedladdningar
- **[Behåll bara en del av varje lektion](/docs/b1-admin/serving/scheduling-lessons#keeping-only-part-of-every-lesson)** - Trimma varje schemalagd lektion i en plantyp till de delar ditt rum spelar
