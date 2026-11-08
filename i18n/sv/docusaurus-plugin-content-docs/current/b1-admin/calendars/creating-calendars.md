---
title: "Skapa kalendrar"
description: "Skapa en kalender i B1 Admin, koppla grupper eller importera .ics-filer och hantera dess händelser, anmälningar och anteckningar på ett ställe."
---

# Skapa kalendrar

<div class="article-intro">

Att skapa en kalender i B1 Admin gör att du kan bygga en samlad vy av händelser genom att koppla en eller flera grupper. Händelser hanteras av gruppledare inom sina respektive grupper, och din kalender visar dessa händelser på ett och samma ställe. Administratörer med redigeringsbehörighet kan lägga till eller redigera händelser för alla grupper. Gruppledare som inte är administratörer kan endast hantera händelser för de grupper de leder.

</div>

## Utbildningsvideo

<YouTube id="Ko3kgsCSLFs" title="Skapa kalendrar, händelser och lokalbokningar i B1" next="Eventanmälan och betalda evenemang i B1" nextUrl="/docs/b1-admin/calendars/paid-registrations" />

<div class="prereqs">
<h4>Innan du börjar</h4>

- Skapa de [grupper](../groups/creating-groups.md) vars händelser du vill ta med i din kalender
- Du behöver administrativ åtkomst till avsnittet Kalendrar i B1 Admin

</div>

## Skapa en ny kalender

1. Öppna [Hoppmenyn](../introduction.md#getting-around-with-the-jump-menu) i B1 Admin (sökfältet uppe till vänster), expandera **Kalendrar** och klicka på **Kalendrar**.
2. Klicka på **Lägg till kalender** överst på sidan. Formuläret för ny kalender öppnas under kalenderlistan.
3. Ange ett **namn** för din kalender (till exempel "Ungdomsverksamhetens händelser" eller "Huvudkalender för kyrkan").
4. Lägg till en valfri **beskrivning** för att hjälpa ditt team att förstå vad den här kalendern är till för.
5. Klicka på **Skapa** för att spara din nya kalender.

## Kalenderns detaljsida

När du har skapat en kalender klickar du på **Hantera händelser** på dess rad för att öppna detaljsidan. Den här sidan har två huvudområden:

- **Vänster kolumn** -- Kalenderns namn med dess åtgärder (**Ny händelse**, **Redigera**, **Importera .ics** och **Skriv ut**), följt av listan **Grupper i kalendern** som visar vilka grupper som ingår i den här kalendern. Klicka på **Ta bort** bredvid en grupp för att ta bort den från kalendern.
- **Huvudyta** -- Vyn **Kalenderhändelser** som visar händelser hämtade från kopplade grupper, med knapparna **Prenumerera** och **Lägg till grupp** ovanför.

## Koppla grupper

Grupper som har händelser i kalendern visas automatiskt i listan **Grupper i kalendern** på vänster sida av detaljsidan.

1. Klicka på **Lägg till grupp** ovanför kalendern för att koppla en grupp till din kalender.
2. Välj gruppen i rullgardinsmenyn. Listan innehåller alla grupper i din kyrka, inte bara de grupper du själv är med i.
3. Välj om du vill inkludera **alla händelser** från gruppen eller endast **specifika händelser**.
4. Klicka på **Spara**.

Varje händelse visas bara en gång i kalendern. Om du lägger till en hel grupp förs eventuella av dess händelser som du redan lagt till en och en in i gruppposten, och om du väljer specifika händelser från en grupp som redan finns i kalendern läggs inget nytt till. Endast grupper som lagts till som helhet visas under **Grupper i kalendern**.

### Importera en .ics-fil

Klicka på **Importera .ics** för att hämta händelser från en annan kalender. Välj den **grupp** som händelserna ska tillhöra, klicka sedan på **Välj .ics-fil** eller klistra in filens innehåll, och klicka på **Importera**. Händelserna skapas i den gruppen, och gruppen läggs till i kalendern du importerade till, så att händelserna syns där direkt.

### Ta bort en händelse från kalendern

Klicka på en händelse i kalendern och klicka sedan på **Ta bort från kalender**. Detta tar bara bort händelsen från den här kalendern -- själva händelsen finns kvar i sin grupp. Om händelsen finns i kalendern för att hela dess grupp lagts till, tas alla gruppens händelser bort från den här kalendern (händelserna finns då kvar i gruppen). Om du vill radera en händelse permanent gör du det från [gruppens kalender](../groups/group-calendar.md).

:::tip
Att koppla grupper till din kalender är ett effektivt sätt att automatiskt samla händelser. När en gruppledare lägger till en händelse i sin [grupp](../groups/creating-groups.md) kan den flöda in i din kyrkoomfattande kalender utan något extra arbete från din sida.
:::

:::info
Om du vill skapa en enda kalender som hämtar händelser från många grupper i hela din kyrka, se [Kuraterad kalender](./curated-calendar.md) för ett smidigare tillvägagångssätt.
:::

## Lägga till och redigera händelser {#adding-and-editing-events}

Klicka på **Ny händelse** på kalenderns detaljsida för att lägga till en händelse, eller klicka på en händelse i kalendern och sedan på **Redigera** för att ändra den. Formuläret **Ny händelse** / **Redigera händelse** har följande fält:

- **Grupp** -- Gruppen som händelsen tillhör. Om din kyrka har händelsemallar kan du också välja en **Mall** för att fylla i formuläret.
- **Titel**
- **Evenemangsbild** -- Klicka på **Lägg till bild** (eller den tomma bildrutan) för att välja eller ladda upp en bild, beskuren i ett brett 16:9-format. Klicka på **Byt bild** för att ersätta den. Bilden visas överst på händelsens sida på din webbplats och som dess kort när ett Kalenderelement visar **Kommande händelser** (se [Visa händelser på din webbplats](#showing-events-on-your-website)).
- **Beskrivning** -- Visas på händelsens sida på din webbplats. Fetstil, listor och länkar stöds.
- **Start** och **Slut**, **Upprepas** och **Synlighet** (**Offentlig** eller **Privat**).
- **Taggar** -- Kommaseparerade etiketter, till exempel `youth, students`. Ett Kalenderelement på din webbplats kan ställas in så att det bara visar händelser med en viss tagg. Detta är samma fält **Taggar** som visas i händelsens anmälningsinställningar.
- **Vem kan se anteckningar** och **Vem kan skriva anteckningar** -- Vem som kan läsa och lägga till i händelsens anteckningar (se [Händelseanteckningar](#event-notes)). Välj **Endast personal** (standardvalet), **Gruppledare** (ledarna för händelsens grupp) eller **Gruppmedlemmar** (alla i händelsens grupp, inklusive dess ledare).
- **Rum** och **Resurser** -- Reservera utrymme och utrustning för händelsen. Se [Rum, resurser och schemaläggning](./rooms-resources.md).

Klicka på **Spara**. Om händelsen upprepas ber B1 dig bekräfta, eftersom sparandet uppdaterar varje tillfälle i serien.

### Händelseanteckningar {#event-notes}

Varje händelse har en egen anteckningstråd för planering och uppföljning. Klicka på en händelse i kalenderns detaljvy; dialogrutan visar händelsens detaljer, dess påminnelser och dess **Anteckningar** nedanför. Skriv en anteckning och publicera den för att lägga till den i tråden.

Personal med behörighet att redigera innehåll eller administrera kalendrar kan alltid läsa och publicera händelseanteckningar. Inställningarna **Vem kan se anteckningar** och **Vem kan skriva anteckningar** för händelsen avgör om gruppens ledare eller medlemmar också kan göra det.

### Visa händelser på din webbplats {#showing-events-on-your-website}

För att lägga till en kalender på din webbplats lägger du till ett **Kalender**-element på en sida och väljer denna kalender. Elementet kan visa en månadskalender eller ett rutnät med kommande händelsekort, och kan begränsas till händelser med en viss tagg. Besökare som klickar på en händelse öppnar dess egna händelsesida. Se [Använda Kalenderelementet](../website/page-editor.md#using-the-calendar-element).

## Aktivera eventanmälan {#enabling-event-registration}

Du kan aktivera anmälan för vilken kalenderhändelse som helst så att medlemmar kan anmäla sig via B1-webbplatsen eller mobilappen.

1. Klicka på en befintlig händelse eller skapa en ny.
2. Aktivera **Anmälan** i händelseredigeraren.
3. Konfigurera anmälningsinställningarna:
   - **Kapacitet** (valfritt) -- Ange ett högsta antal anmälningar. Lämna tomt för obegränsat antal.
   - **Anmälan öppnar** -- Datum och klockslag när anmälan blir tillgänglig.
   - **Anmälan stänger** -- Datum och klockslag när anmälan stängs.
   - **Taggar** -- Kommaseparerade etiketter (t.ex. "youth, retreat, vbs") för att kategorisera händelser som går att anmäla sig till.
   - **Anmälningsfrågor** -- Bifoga valfritt ett [formulär](../forms/creating-forms.md) så att deltagarna besvarar extra frågor (kostrestriktioner, t-shirtstorlek, nödkontakt med mera) som en del av anmälan. Välj **Ingen** för att hoppa över frågorna.
   - **Aktivera väntelista** -- När händelsen blir fullbokad kan ytterligare deltagare ställa sig på en väntelista i stället för att avvisas. Se [Betalda anmälningar](./paid-registrations.md#waitlist).
4. Spara händelsen.

För betalda händelser låter samma inställningssida dig definiera prissatta **Deltagartyper**, valfria **Val** (tillägg) och **Rabattkoder**, med betalning som tas emot via din kyrkas givartjänst. Se [Betalda anmälningar](./paid-registrations.md) för hela genomgången.

När anmälan är aktiverad ser medlemmar en knapp med texten **Anmäl dig till denna händelse** när de visar händelsen på [B1.church eller i B1-appen](../../b1-church/events/registering.md). Om du bifogat ett formulär ser deltagarna ett steg med **Frågor** under anmälan, och deras svar sparas tillsammans med anmälan.

:::info
Anmälningsfrågor fungerar bara med formulär som **inte** är markerade som begränsade. Ett begränsat formulär hoppas automatiskt över under anmälan i stället för att visas, så använd ett obegränsat formulär när du bifogar frågor till en händelse.
:::

### Hantera anmälningar

Så här visar och hanterar du anmälningar till dina händelser:

1. Välj i Hoppmenyn **Kalendrar > Anmälningar**.
2. Du ser en tabell med alla händelser där anmälan är aktiverad, med händelsens titel, datum, aktuellt antal anmälningar jämfört med kapaciteten, och taggar.
3. Klicka på en händelse för att se hela listan över anmälningar, inklusive namn, antal medlemmar, deltagartyper, betalningsstatus och anmälningsdatum.
4. Från detaljsidan kan du:
   - **Lägg till deltagare** -- Anmäl manuellt någon som anmält sig offline eller per telefon.
   - **Avboka** enskilda anmälningar
   - **Radera** anmälningar permanent
   - **Flytta upp** anmälningar från väntelistan när en plats blir ledig
   - **Exportera CSV** -- Ladda ner alla anmälningar, inklusive deltagartyper, val, betalningsbelopp och svar på frågor

Om händelsen har bifogade anmälningsfrågor visar detaljsidan också ett filter **Endast obesvarade frågor** för att snabbt hitta deltagare som ännu inte skickat in sina svar, och en knapp **Visa svar** på varje besvarad anmälan för att se deras svar. Betalda händelser lägger till en kolumn **Typ**, en kolumn **Betalda / Totalt**, antal per typ och en dialogruta med betalningsdetaljer -- se [Betalda anmälningar](./paid-registrations.md#the-registration-roster).

:::tip
Använd förloppsindikatorn för kapacitet för att följa hur snabbt händelserna fylls. Indikatorn blir röd när en händelse är fullbokad eller överbokad.
:::

## Nästa steg

- [Kuraterad kalender](./curated-calendar.md) -- Skapa en kalender som hämtar från flera grupper
- [Betalda anmälningar](./paid-registrations.md) -- Deltagartyper, tilläggsval, rabattkoder, betalningar och väntelistor
- [Guide för eventanmälan](../guides/event-registration.md) -- Steg-för-steg-guide för att ställa in eventanmälan
- [Översikt över kalendrar](./index.md) -- Tillbaka till översikten över kalendrar
