---
title: "Granskningslogg"
---

# Granskningslogg

<div class="article-intro">

Granskningsloggen spårar alla viktiga åtgärder och ändringar i ditt kyrkohanteringssystem. Använd den för att granska inloggningsaktivitet, följa vem som har ändrat personposter, övervaka uppdateringar av behörigheter och upprätthålla ansvarstagande i ditt team.

</div>

<div class="prereqs">
<h4>Innan du börjar</h4>

- B1 Admin-konto med åtkomst till serveradministratör
- Gå till **Inställningar** för att hitta granskningsloggen

</div>

## Visa granskningsloggen

1. Öppna [Hoppmenyn](../introduction.md#getting-around-with-the-jump-menu) (sökfältet överst till vänster i B1 Admin) och expandera **Inställningar**.
2. Klicka på **Granskningslogg**.
3. Loggen visar de senaste posterna i en tabell med följande kolumner:
   - **Datum** -- När åtgärden inträffade.
   - **Kategori** -- Typen av åtgärd (färgkodad för snabb överblick).
   - **Åtgärd** -- Vad som gjordes (t.ex. create, update, delete, login_success).
   - **Entitet** -- Typen och ID:t för posten som påverkades.
   - **IP-adress** -- IP-adressen för användaren som utförde åtgärden.
   - **Detaljer** -- En sammanfattning av de specifika ändringarna.

## Filtrera loggen

Använd filtren överst på sidan för att begränsa resultaten:

- **Kategori** -- Filtrera efter typ av åtgärd:
  - **Alla kategorier** -- Visa allt.
  - **Inloggning** -- Lyckade och misslyckade inloggningar.
  - **Personer** -- Skapa, uppdatera eller ta bort personposter.
  - **Behörigheter** -- Beviljade och återkallade behörigheter.
  - **Gåvor** -- Ändringar i gåvoposter.
  - **Grupper** -- Åtgärder för gruppadministration.
  - **Formulär** -- Aktivitet kopplad till formulärinlämningar.
  - **Inställningar** -- Konfigurationsändringar.
- **Startdatum** -- Visa poster från och med detta datum.
- **Slutdatum** -- Visa poster fram till och med detta datum.

Klicka på **Sök** efter att du har angett filtren för att uppdatera resultaten.

## Förstå kategorierna

Varje kategori är färgkodad för snabb identifiering:

- **Inloggning** -- Blå etikett. Spårar lyckade och misslyckade inloggningsförsök.
- **Personer** -- Lila etikett. Spårar skapande, uppdatering och borttagning av personposter.
- **Behörigheter** -- Röd etikett. Spårar när åtkomsträttigheter beviljas eller återkallas.
- **Gåvor** -- Grön etikett. Spårar ändringar i gåvoposter.
- **Grupper** -- Grå etikett. Spårar åtgärder för gruppadministration.
- **Formulär** -- Orange etikett. Spårar aktivitet kopplad till formulärinlämningar.
- **Inställningar** -- Gul etikett. Spårar konfigurationsändringar.

## Exportera loggen

När loggposter visas syns en knapp för **CSV-nedladdning**. Klicka på den för att exportera de aktuella filtrerade resultaten till ett kalkylblad för offlinegranskning eller arkivering.

## Sidnumrering

Använd sidnumreringen längst ner i tabellen för att navigera mellan resultaten. Du kan visa 25, 50 eller 100 poster per sida.

:::info
Poster i granskningsloggen sparas automatiskt i ett år. Poster som är äldre än 365 dagar tas bort för att systemet ska fungera optimalt.
:::

:::tip
Granska granskningsloggen regelbundet, särskilt efter att du har introducerat nya teammedlemmar eller gjort betydande konfigurationsändringar. Det hjälper dig att upptäcka oväntad aktivitet tidigt.
:::

## Relaterade artiklar

- [Roller och behörigheter](../settings/roles-permissions) -- Hantera vem som har åtkomst till vad
- [Datasäkerhet](../settings/data-security) -- Läs om hur dina data skyddas
- [Översikt över rapporter](./index.md) -- Se alla tillgängliga rapporter
