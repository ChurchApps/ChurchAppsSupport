---
title: "Skapa kalendrar"
---

# Skapa kalendrar

<div class="article-intro">

Att skapa en kalender i B1 Admin gör att du kan bygga en utvald vy av händelser genom att koppla en eller flera grupper. Händelser hanteras av gruppledare inom sina grupper, och din kalender visar dessa händelser på ett ställe. Administratörer med redigeringsbehörighet kan lägga till eller redigera händelser för alla grupper. Gruppledare som inte är administratörer kan bara hantera händelser för de grupper de leder.

</div>

## Utbildningsvideo

<YouTube id="Ko3kgsCSLFs" title="Skapa kalendrar, händelser och rumsbokningar i B1" next="Registrering till händelser och betalda evenemang i B1" nextUrl="/docs/b1-admin/calendars/paid-registrations" />

<div class="prereqs">
<h4>Innan du börjar</h4>

- Skapa de [grupper](../groups/creating-groups.md) vars händelser du vill ha med i din kalender
- Du behöver administrativ åtkomst till avsnittet Kalendrar i B1 Admin

</div>

## Skapa en ny kalender

1. I B1 Admin öppnar du [Hoppmenyn](../introduction.md#getting-around-with-the-jump-menu) (sökfältet längst upp till vänster), expanderar **Kalendrar** och klickar på **Kalendrar**.
2. Klicka på **Lägg till kalender** högst upp på sidan. Formuläret för ny kalender öppnas under kalenderlistan.
3. Ange ett **namn** för din kalender (till exempel "Ungdomsverksamhetens händelser" eller "Huvudkyrkans kalender").
4. Lägg till en valfri **beskrivning** så att ditt team förstår vad kalendern är till för.
5. Klicka på **Skapa** för att spara din nya kalender.

## Kalenderns detaljsida

Efter att du har skapat en kalender klickar du på **Hantera händelser** på dess rad för att öppna detaljsidan. Den här sidan har två huvudområden:

- **Vänster kolumn** -- Kalenderns namn med dess åtgärder (**Ny händelse**, **Redigera**, **Importera .ics** och **Skriv ut**), följt av listan **Grupper i kalendern** som visar vilka grupper som ingår i kalendern. Klicka på **Ta bort** bredvid en grupp för att ta bort den från kalendern.
- **Huvudområde** -- Vyn **Kalenderhändelser** som visar händelser från anslutna grupper, med knapparna **Prenumerera** och **Lägg till grupp** ovanför.

## Koppla grupper

Grupper som har händelser i kalendern visas automatiskt i listan **Grupper i kalendern** till vänster på detaljsidan.

1. Klicka på **Lägg till grupp** ovanför kalendern för att koppla en grupp till din kalender.
2. Välj gruppen i listrutan. Listan innehåller alla grupper i din kyrka, inte bara de grupper du tillhör.
3. Välj om du vill inkludera **alla händelser** från gruppen eller bara **specifika händelser**.
4. Klicka på **Spara**.

Varje händelse visas i kalendern bara en gång. Om du lägger till en hel grupp förs eventuella händelser från gruppen som du redan har lagt till en i taget in i gruppposten, och om du väljer specifika händelser från en grupp som redan finns i kalendern läggs inget nytt till. Endast grupper som lagts till som helhet visas under **Grupper i kalendern**.

### Importera en .ics-fil

Klicka på **Importera .ics** för att hämta händelser från en annan kalender. Välj den **grupp** som händelserna ska tillhöra, klicka sedan på **Välj .ics-fil** eller klistra in filens innehåll och klicka på **Importera**. Händelserna skapas i den gruppen, och gruppen läggs till i kalendern du importerade från, så att händelserna syns där direkt.

### Ta bort en händelse från kalendern

Klicka på en händelse i kalendern och klicka sedan på **Ta bort från kalender**. Detta tar bara bort händelsen från den här kalendern -- händelsen finns kvar i sin grupp. Om händelsen finns i kalendern för att hela dess grupp lagts till, tar borttagning bort alla gruppens händelser från den här kalendern (händelserna finns fortfarande kvar i gruppen). Om du vill radera en händelse permanent tar du bort den från [gruppens kalender](../groups/group-calendar.md).

:::tip
Att koppla grupper till din kalender är ett kraftfullt sätt att automatiskt samla händelser. När en gruppledare lägger till en händelse i sin [grupp](../groups/creating-groups.md) kan den flöda in i din kyrkoomfattande kalender utan extra arbete från din sida.
:::

:::info
Om du vill skapa en enda kalender som hämtar händelser från många grupper i din kyrka, se [Kuraterad kalender](curated-calendar) för ett smidigt tillvägagångssätt.
:::

## Lägga till och redigera händelser {#adding-and-editing-events}

Klicka på **Ny händelse** på kalenderns detaljsida för att lägga till en händelse, eller klicka på en händelse i kalendern och sedan på **Redigera** för att ändra den. Formuläret **Ny händelse** / **Redigera händelse** har följande fält:

- **Grupp** -- Gruppen som händelsen tillhör. Om din kyrka har händelsemallar kan du också välja en **mall** för att fylla i formuläret.
- **Titel**
- **Händelsefoto** -- Klicka på **Lägg till foto** (eller den tomma fotorutan) för att välja eller ladda upp en bild, beskuren till ett brett format på 16:9. Klicka på **Byt foto** för att ersätta den. Fotot visas överst på händelsens sida på din webbplats och som dess kort när ett Kalenderelement visar **Kommande händelser** (se [Visa händelser på din webbplats](#showing-events-on-your-website)).
- **Beskrivning** -- Visas på händelsens sida på din webbplats. Fetstil, listor och länkar stöds.
- **Start** och **Slut**, **Upprepas** och **Synlighet** (**Offentlig** eller **Privat**).
- **Taggar** -- Kommaseparerade etiketter, till exempel `youth, students`. Ett Kalenderelement på din webbplats kan ställas in så att det bara visar händelser med en viss tagg. Det här är samma fält **Taggar** som visas i händelsens registreringsinställningar.
- **Vem kan visa anteckningar** och **Vem kan skriva anteckningar** -- Vem som kan läsa och lägga till i händelsens anteckningar (se [Händelseanteckningar](#event-notes)). Välj **Endast personal** (standard), **Gruppledare** (ledare för händelsens grupp) eller **Gruppmedlemmar** (alla i händelsens grupp, inklusive dess ledare).
- **Rum** och **Resurser** -- Reservera utrymme och utrustning för händelsen. Se [Rum, resurser och schemaläggning](rooms-resources).

Klicka på **Spara**. Om händelsen upprepas ber B1 dig bekräfta, eftersom sparandet uppdaterar varje förekomst i serien.

### Händelseanteckningar {#event-notes}

Varje händelse har sin egen anteckningstråd för planering och uppföljning. Klicka på en händelse på kalenderns detaljsida; dialogrutan visar händelsens detaljer, dess påminnelser och dess **Anteckningar** nedanför. Skriv en anteckning och publicera den för att lägga till den i tråden.

Personal med behörighet att redigera innehåll eller administrera kalendrar kan alltid läsa och publicera händelseanteckningar. Inställningarna **Vem kan visa anteckningar** och **Vem kan skriva anteckningar** för händelsen avgör om händelsegruppens ledare eller medlemmar också kan göra det.

### Visa händelser på din webbplats {#showing-events-on-your-website}

För att lägga in en kalender på din webbplats lägger du till ett **Kalender**-element på en sida och väljer den här kalendern. Elementet kan visa en månadskalender eller ett rutnät med kort för kommande händelser, och kan begränsas till händelser med en viss tagg. Besökare som klickar på en händelse öppnar händelsens egna sida. Se [Använda kalenderelementet](../website/page-editor.md#using-the-calendar-element).

## Aktivera händelseregistrering {#enabling-event-registration}

Du kan aktivera registrering för vilken kalenderhändelse som helst så att medlemmar kan anmäla sig via B1-webbplatsen eller mobilappen.

1. Klicka på en befintlig händelse eller skapa en ny.
2. I händelseredigeraren växlar du **Registrering** för att aktivera den.
3. Konfigurera registreringsinställningarna:
   - **Kapacitet** (valfritt) -- Ange ett högsta antal registreringar. Lämna tomt för obegränsat.
   - **Registrering öppnar** -- Datum och tid då registreringen blir tillgänglig.
   - **Registrering stängs** -- Datum och tid då registreringen stängs.
   - **Taggar** -- Kommaseparerade etiketter (t.ex. "ungdom, reträtt, vbs") för att kategorisera händelser som går att anmäla sig till.
   - **Registreringsfrågor** -- Bifoga valfritt ett [formulär](../forms/creating-forms.md) så att deltagare kan svara på extra frågor (kostrestriktioner, T-shirtstorlek, nödkontakt med mera) som en del av anmälan. Välj **Ingen** för att hoppa över frågor.
   - **Aktivera väntelista** -- När händelsen blir fullbokad kan ytterligare deltagare gå med i en väntelista i stället för att nekas. Se [Betalda registreringar](paid-registrations#waitlist).
4. Spara händelsen.

För betalda händelser låter samma inställningssida dig definiera prissatta **Deltagartyper**, valfria **Val** (tillägg) och **Rabattkoder**, med betalning via din kyrkas givartjänst. Se [Betalda registreringar](paid-registrations) för den fullständiga genomgången.

När registrering är aktiverad ser medlemmar en knapp **Registrera dig för denna händelse** när de visar händelsen på [B1-webbplatsen](../../b1-church/events/registering) eller [B1-mobilappen](../../b1-mobile/events/registering). Om du har bifogat ett formulär ser deltagarna ett steg **Frågor** under registreringen, och deras svar sparas tillsammans med deras registrering.

:::info
Registreringsfrågor fungerar bara med formulär som **inte** är markerade som begränsade. Ett begränsat formulär hoppas över automatiskt vid registrering i stället för att visas, så använd ett obegränsat formulär när du bifogar frågor till en händelse.
:::

### Hantera registreringar

För att visa och hantera registreringar för dina händelser:

1. I hoppmenyn väljer du **Kalendrar > Registreringar**.
2. Du ser en tabell med alla händelser där registrering är aktiverad, med händelsens titel, datum, aktuellt antal registreringar jämfört med kapacitet och taggar.
3. Klicka på en händelse för att se hela listan över registreringar, inklusive namn, antal medlemmar, deltagartyper, betalningsstatus och registreringsdatum.
4. Från detaljsidan kan du:
   - **Lägg till deltagare** -- Registrera manuellt någon som anmält sig offline eller per telefon.
   - **Avboka** enskilda registreringar
   - **Ta bort** registreringar permanent
   - **Flytta upp** registreringar från väntelistan när en plats blir ledig
   - **Exportera CSV** -- Ladda ner alla registreringar, inklusive deltagartyper, val, betalningsbelopp och frågesvar

Om händelsen har bifogade registreringsfrågor visar detaljsidan även ett filter **Endast obesvarade frågor** för att snabbt hitta deltagare som ännu inte har skickat in svar, och en knapp **Visa svar** på varje besvarad registrering för att se deras svar. Betalda händelser lägger till en kolumn **Typ**, en kolumn **Betalda / Totalt**, antal per typ och en dialogruta med betalningsdetaljer -- se [Betalda registreringar](paid-registrations#the-registration-roster).

:::tip
Använd förloppsindikatorn för kapacitet för att följa hur snabbt händelser fylls på. Stapeln blir röd när en händelse är fullbokad eller överbokad.
:::

## Nästa steg

- [Kuraterad kalender](curated-calendar) -- Skapa en kalender som hämtar från flera grupper
- [Betalda registreringar](paid-registrations) -- Deltagartyper, tilläggsval, rabattkoder, betalningar och väntelistor
- [Guide för händelseregistrering](../guides/event-registration) -- Steg-för-steg-guide för att ställa in händelseregistrering
- [Översikt över kalendrar](./) -- Tillbaka till översikten över kalendrar
