---
title: "Google Sheets"
description: "Koppla B1 Admin till Google Sheets med tillägget B1 Export för att hämta Personer, Gåvor, Grupper och Närvaro till kalkylbladsflikar när du behöver."
---

# Google Sheets

<div class="article-intro">

**B1 Export** är det officiella Google Sheets-tillägget för B1.church. Det lägger till en sidopanel i valfritt kalkylblad som exporterar personer, gåvor, grupper eller närvaro från din B1-församling till namngivna flikar, på begäran och med ett klick. Tillägget körs helt inom användarens Google-konto. Utöver de skrivskyddade API-anrop som varje export gör har det ingen kontakt med ChurchApps servrar.

</div>

<div class="prereqs">
<h4>Innan du börjar</h4>

- Ett Google-konto med redigeringsbehörighet för kalkylbladet du vill exportera till
- En församlingsadministratör (eller någon med läsbehörighet för de data du vill exportera) som kan skapa en B1-API-nyckel
- Tillägget B1 Export installerat från Google Workspace Marketplace

</div>

## Vad som exporteras

| Menyval | Flik i kalkylbladet | Data |
|---|---|---|
| Exportera personer | `B1 People` | ID, Visningsnamn, Förnamn, Efternamn, E-post, Medlemsstatus |
| Exportera gåvor | `B1 Donations` | ID, Person-ID, Datum, Belopp, Metod, Batch-ID |
| Exportera grupper | `B1 Groups` | ID, Namn, Kategori, Antal medlemmar |
| Exportera närvaro | `B1 Attendance` | ID, Person-ID, Besöksdatum, Gudstjänst-ID, Grupp-ID |

Varje export **ersätter** innehållet i sin namngivna flik. Om du kör en export igen får du en ny ögonblicksbild, inte tillagda rader. Övriga flikar i kalkylbladet påverkas inte.

## Konfiguration

### 1. Skapa en B1-API-nyckel med rätt behörigheter

1. Gå i B1Admin till **Inställningar → Utvecklare → API-nycklar**.
2. Klicka på **Ny API-nyckel**, ge den namnet "Sheets Export" och ge den läsbehörighet för det du planerar att exportera:
   - `people:read` för personexporten
   - `donations:read` för gåvor
   - `groups:read` för grupper
   - `attendance:read` för närvaro
3. En nyckel som bara används för export behöver **inte** `settings:write`. Den behörigheten används endast av kopplingar som registrerar webhooks (Zapier / Make). Håll nyckeln så snäv som möjligt.
4. Spara och kopiera nyckeln `cak_…`.

### 2. Installera tillägget

1. Öppna kalkylbladet du vill exportera till.
2. **Tillägg → Tillägg → Hämta tillägg**.
3. Sök efter **B1 Export** och installera det. Google ber dig ge åtkomst till dina kalkylblad och till externa HTTP-anrop, så att tillägget kan anropa B1 API:et.

När installationen är klar visas **B1 Export** under menyn **Tillägg** i alla kalkylblad du öppnar med det här Google-kontot.

### 3. Anslut nyckeln

1. **Tillägg → B1 Export → Anslut…** (eller **B1 Export → Anslut…** i menyraden efter första öppningen).
2. Klistra in API-nyckeln i sidopanelen, lämna Base URL som `https://api.churchapps.org` (om du inte testar mot staging) och klicka på **Spara**.
3. Klicka på **Testa anslutning**. En grön text "Connection OK" bekräftar att nyckeln fungerar.

Nyckeln lagras i **användarspecifika egenskaper** (`PropertiesService.getUserProperties()`). Den är kopplad till ditt Google-konto, skrivs aldrig in i kalkylbladet och syns inte för andra redigerare av kalkylbladet.

## Köra en export

Gör något av följande:

- **Från menyn**: **Tillägg → B1 Export → Exportera personer** (eller Exportera gåvor / Exportera grupper / Exportera närvaro)
- **Från sidopanelen**: öppna sidopanelen (Anslut…) och klicka på rätt knapp för datamängden

En notis bekräftar när exporten är klar: "_N_ rad(er) skrevs till 'B1 People'."

## Bygga rapporter ovanpå

De exporterade flikarna är vanlig Google Sheets-data. Du kan bygga egen analys genom att referera till flikarna:

- En **sammanfattningsflik** med `=SUMIF('B1 Donations'!E:E, "card", 'B1 Donations'!D:D)` för att summera kortgåvor
- En **filtrerad vy** med bara medlemmar: `=FILTER('B1 People'!A:F, 'B1 People'!F:F = "Member")`
- Ett **diagram** över närvaroutvecklingen som hämtar data från `B1 Attendance`

När du kör exporten igen uppdateras underliggande flik och dina formler räknar om automatiskt.

## Schemalägga återkommande exporter

Tillägget körs på begäran som standard. För veckovisa eller månatliga exporter kan du använda Apps Scripts inbyggda tidsbaserade utlösare:

1. **Tillägg → Apps Script** i kalkylbladet (detta öppnar det bundna skriptet för tillägget).
2. Klicka på ikonen **⏰ Utlösare** i den vänstra sidopanelen.
3. Klicka på **Lägg till utlösare** för `exportPeople` (eller valfri exportfunktion). Välj *Tidsbaserad*, *Veckotimer*, till exempel *Varje måndag kl. 06.00*.

Exporten körs i bakgrunden under ditt Google-konto. Om API-nyckeln roteras eller återkallas skickar utlösaren ett e-postmeddelande till dig nästa gång den misslyckas.

## Behörigheter och integritet

- Tillägget begär endast `spreadsheets.currentonly` (det kan bara komma åt kalkylbladet det är öppet i) och `script.external_request` (så att `UrlFetchApp` kan anropa B1 API:et). Det ser **inte** din Drive, Gmail eller andra Google-data.
- B1 API-nyckeln lagras per användare. Andra redigerare av samma kalkylblad kan inte se den.
- Alla anrop till B1 API:et görs över HTTPS med `Authorization: Bearer cak_…`.

## Felsökning

- **"No API key set"**: öppna **Tillägg → B1 Export → Anslut…** och klistra in nyckeln.
- **"B1 rejected the API key (401)"**: nyckeln har återkallats eller är fel. Skapa en ny och klistra in den igen.
- **"This API key lacks permission for /giving/donations (403)"**: nyckeln saknar `donations:read`. Uppdatera nyckelns behörigheter i B1Admin.
- **Kalkylbladet uppdateras inte** efter en export: kontrollera att du tittar på rätt flik (`B1 People` osv.). Exporten skapar fliken om den inte finns.
- **"Quota exceeded"**: Apps Script har dagliga kvoter per användare för `UrlFetchApp` (vanligtvis tusentals anrop per dag). En stor församling med många poster kan behöva dela upp exporterna över flera dagar, eller använda [Make](./make.md) eller en egen integration för synkronisering med stora volymer.

## Anpassa tillägget

Tillägget är öppen källkod. Apps Script-projektet finns i repot `B1Integrations/GoogleSheetsAddon/`. Om du vill ha en kolumn som inte exporteras, en extra datamängd eller ett annat utdataformat kan du öppna ett ärende eller en pull request där.

## Se även

- [Zapier](./zapier.md): för synkronisering i realtid i stället för export på begäran
- [Make](./make.md): för synkronisering med mer avancerade transformationer
- [API-nycklar (utvecklarreferens)](/docs/developer/api/api-keys)
