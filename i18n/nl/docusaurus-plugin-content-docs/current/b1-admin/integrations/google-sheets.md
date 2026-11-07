---
title: "Google Sheets"
description: "Koppel B1 Admin aan Google Sheets met de B1 Export-add-on om People, Donations, Groups en Attendance op verzoek in spreadsheet-tabbladen te halen."
---

# Google Sheets

<div class="article-intro">

**B1 Export** is de officiële Google Sheets-add-on voor B1.church. Hiermee voeg je een zijbalk toe aan elke spreadsheet die People, Donations, Groups of Attendance uit je B1-kerk exporteert naar genoemde tabbladen, op verzoek en met één klik. De add-on draait volledig binnen het Google-account van de gebruiker. Afgezien van de alleen-lezen API-aanroepen die bij elke export horen, raakt hij de servers van ChurchApps niet aan.

</div>

<div class="prereqs">
<h4>Voordat je begint</h4>

- Een Google-account met bewerkingsrechten voor de spreadsheet waarnaar je wilt exporteren
- Een kerkbeheerder (of iemand met leesrechten voor de gegevens die je wilt exporteren) die een B1 API-sleutel kan aanmaken
- De B1 Export-add-on, geïnstalleerd vanuit de Google Workspace Marketplace

</div>

## Wat wordt geëxporteerd

| Menu-item | Tabblad | Gegevens |
|---|---|---|
| Export People | `B1 People` | ID, Display Name, First, Last, Email, Membership Status |
| Export Donations | `B1 Donations` | ID, Person ID, Date, Amount, Method, Batch ID |
| Export Groups | `B1 Groups` | ID, Name, Category, Member Count |
| Export Attendance | `B1 Attendance` | ID, Person ID, Visit Date, Service ID, Group ID |

Elke export **vervangt** de inhoud van het bijbehorende tabblad. Als je een export opnieuw uitvoert, krijg je een nieuwe momentopname en worden er geen rijen toegevoegd. Andere tabbladen in de spreadsheet blijven ongewijzigd.

## Instellen

### 1. Maak een B1 API-sleutel met de juiste scopes

1. Ga in B1Admin naar **Instellingen → Ontwikkelaar → API-sleutels**.
2. Klik op **Nieuwe API-sleutel**, geef hem de naam "Sheets Export" en geef de **lees**-scopes die bij je export horen:
   - `people:read` voor de People-export
   - `donations:read` voor Donations
   - `groups:read` voor Groups
   - `attendance:read` voor Attendance
3. Een sleutel die alleen voor exports wordt gebruikt, heeft `settings:write` **niet** nodig. Die scope is alleen bedoeld voor connectors die webhooks registreren (Zapier / Make). Houd deze sleutel dus beperkt.
4. Sla op en kopieer de `cak_…`-sleutel.

### 2. Installeer de add-on

1. Open de spreadsheet waarnaar je wilt exporteren.
2. Ga naar **Extensies → Add-ons → Add-ons ophalen**.
3. Zoek naar **B1 Export** en installeer de add-on. Google vraagt om toegang tot je spreadsheets en tot externe HTTP-verzoeken, zodat de add-on de B1 API kan aanroepen.

Na de installatie verschijnt er een item **B1 Export** onder het menu **Extensies** van elke spreadsheet die je met dit Google-account opent.

### 3. Verbind de sleutel

1. Ga naar **Extensies → B1 Export → Verbinden…** (of kies na de eerste keer **B1 Export → Verbinden…** in de menubalk).
2. Plak de API-sleutel in de zijbalk, laat de Base URL op `https://api.churchapps.org` staan (tenzij je op de testomgeving werkt) en klik op **Opslaan**.
3. Klik op **Verbinding testen**. Een groene melding "Connection OK" bevestigt dat de sleutel werkt.

De sleutel wordt opgeslagen in **eigenschappen per gebruiker** (`PropertiesService.getUserProperties()`). Hij is gekoppeld aan jouw Google-account, wordt nooit in de spreadsheet geschreven en is niet zichtbaar voor andere editors van de spreadsheet.

## Een export uitvoeren

Doe een van de volgende dingen:

- **Via het menu**: **Extensies → B1 Export → Export People** (of Donations / Groups / Attendance)
- **Via de zijbalk**: open de zijbalk (Verbinden…) en klik op de knop van de gewenste dataset

Er verschijnt een melding wanneer de export klaar is: "_N_ row(s) written to 'B1 People'."

## Rapporten bouwen op basis van de gegevens

De geëxporteerde tabbladen zijn gewone Google Sheets-gegevens. Je bouwt je eigen analyses door naar die tabbladen te verwijzen:

- Een **overzichtstabblad** met `=SUMIF('B1 Donations'!E:E, "card", 'B1 Donations'!D:D)` om de totale kaartgiften op te tellen
- Een **gefilterde weergave** van alleen leden met `=FILTER('B1 People'!A:F, 'B1 People'!F:F = "Member")`
- Een **grafiek** van aanwezigheidstrends op basis van `B1 Attendance`

Wanneer je de export opnieuw uitvoert, wordt het onderliggende tabblad ververst en worden je formules automatisch bijgewerkt.

## Terugkerende exports plannen

De add-on werkt standaard op verzoek. Voor wekelijkse of maandelijkse exports gebruik je de ingebouwde tijdgestuurde triggers van Apps Script:

1. Ga in de spreadsheet naar **Extensies → Apps Script**. Dit opent het aan de add-on gekoppelde script.
2. Klik in de linker zijbalk op het pictogram **⏰ Triggers**.
3. Klik op **Trigger toevoegen** voor `exportPeople` (of een andere exportfunctie). Kies *Tijdgestuurd*, *Weektimer*, bijvoorbeeld *Elke maandag om 6:00*.

De export draait op de achtergrond onder jouw Google-account. Als de API-sleutel wordt vervangen of ingetrokken, stuurt de trigger je een e-mail de volgende keer dat hij faalt.

## Machtigingen en privacy

- De add-on vraagt alleen `spreadsheets.currentonly` (hij kan alleen de spreadsheet aanpassen waarin hij is geopend) en `script.external_request` (zodat `UrlFetchApp` de B1 API kan aanroepen). Hij heeft **geen** toegang tot je Drive, Gmail of andere Google-gegevens.
- De B1 API-sleutel wordt per gebruiker opgeslagen. Andere editors van dezelfde spreadsheet kunnen hem niet zien.
- Alle B1 API-aanroepen verlopen via HTTPS met `Authorization: Bearer cak_…`.

## Problemen oplossen

- **"No API key set"**: open **Extensies → B1 Export → Verbinden…** en plak de sleutel.
- **"B1 rejected the API key (401)"**: de sleutel is ingetrokken of onjuist. Maak een nieuwe aan en plak die.
- **"This API key lacks permission for /giving/donations (403)"**: de sleutel heeft geen `donations:read`. Pas de scopes van de sleutel aan in B1Admin.
- **Het tabblad wordt niet ververst** na het uitvoeren: controleer of je naar de *juiste* tabbladnaam kijkt (`B1 People` enzovoort). De export maakt het tabblad aan als het nog niet bestond.
- **"Quota exceeded"**: Apps Script legt per gebruiker dagelijkse limieten op aan `UrlFetchApp` (meestal duizenden aanroepen per dag). Een grote kerk met veel records moet de exports mogelijk over meerdere dagen verdelen, of gebruikt [Make](./make.md) of een maatwerkintegratie voor synchronisatie met veel gegevens.

## De add-on aanpassen

De add-on is open source. Het Apps Script-project staat in de repository `B1Integrations/GoogleSheetsAddon/`. Als je een kolom wilt die we niet exporteren, een extra dataset, of een ander uitvoerformaat, open dan daar een issue of pull request.

## Zie ook

- [Zapier](./zapier.md): voor synchronisatie in realtime in plaats van een export op verzoek
- [Make](./make.md): voor synchronisatie met complexere transformaties
- [API-sleutels (ontwikkelaarsreferentie)](/docs/developer/api/api-keys)
