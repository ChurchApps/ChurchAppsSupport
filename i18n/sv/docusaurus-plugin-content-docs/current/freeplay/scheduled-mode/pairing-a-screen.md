---
title: "Att koppla en skärm"
---

# Att koppla en skärm

<div class="article-intro">

För att lägga en TV på en kalender kopplar du den till **FreePlay Admin**. TV-skärmen visar en fyrbokstavskod. Du anger den koden på [admin.freeplay.church](https://admin.freeplay.church) och väljer skärmgruppen vars kalender TV:n ska följa. Du gör detta bara en gång per TV.

</div>

<div class="prereqs">
<h4>Innan du börjar</h4>

- Installera och starta FreePlay på TV:n. Se [Komma igång](../getting-started/)
- Ha ett ChurchApps-konto för din församling så att du kan logga in i FreePlay Admin
- Valfritt: [skapa en spellista](./building-playlists) och [schemalägg den](./scheduling-the-calendar) först, så att TV:n har något att spela direkt

</div>

## Visa koden på TV:n

1. Öppna **Inställningar** längst ned i sidomenyn på TV:n.
2. Välj **Koppla till en kalender**. Raden visar **Inte kopplad** om TV:n ännu inte är kopplad.
3. Skärmen **Koppla den här skärmen** visar en QR-kod och en fyrbokstavskod för koppling, med meddelandet **Skanna med din telefon, eller gå till freeplay.church/pair och ange den här koden**.
4. Under koden blinkar **Väntar på bekräftelse** medan FreePlay väntar på att du ska slutföra kopplingen.

Koden gäller i 15 minuter, och en nedräkning under den visar hur mycket tid som återstår. När tiden är slut visar FreePlay automatiskt en ny kod. Du kan också välja **Generera ny kod** för en ny kod, eller **Avbryt** för att gå tillbaka till Inställningar.

## Koppla i FreePlay Admin

1. Skanna QR-koden med din telefon, eller gå till **freeplay.church/pair** på valfri dator eller telefon. Logga in om du uppmanas att göra det. FreePlay Admin öppnar formuläret **Koppla skärm** med koden redan ifylld.
   - Du kan också öppna formuläret själv. Gå till **Skärmar** i FreePlay Admin och klicka på **Koppla skärm**.
2. Kontrollera **Kopplingskoden**. Det är de fyra bokstäverna på TV:n.
3. Ange en **Etikett** så att du kan skilja den här TV:n från de andra, till exempel "Entré vänster". Detta är valfritt.
4. Under **Grupp** väljer du skärmgruppen vars kalender den här TV:n ska följa. För att skapa en ny grupp väljer du **＋ Ny grupp…** och anger ett **Namn på ny grupp**.
5. Under **Läge** lämnar du **Schemalagt** valt. TV:n spelar då upp enligt gruppens kalender av sig själv.
6. Klicka på **Koppla**.

TV:n visar **Ansluten!** och därefter **Läser in ditt schema...**. Den laddar ner det som är schemalagt och börjar spela upp. Se [Schemalagd uppspelning på TV:n](./scheduled-playback).

:::info
Om FreePlay Admin säger **Den koden matchade ingen TV**, kontrollera koden på skärmen. Om den har gått ut, använd den nya kod som TV:n visar just nu.
:::

### Schemalagt kontra manuellt

Inställningen **Läge** har två alternativ:

- **Schemalagt** - Spelar upp enligt gruppens kalender av sig själv. Ingen behöver trycka på Start.
- **Manuellt** - Någon väljer innehåll med fjärrkontrollen. En manuell skärm visas fortfarande i din lista över **Skärmar**, men den följer ingen kalender, så fältet **Grupp** är inaktiverat.

Du kan ändra en skärms läge senare via **Redigera** på [sidan Skärmar](./managing-screens).

## Koppla till en tjänsteplan i stället

Koden på skärmen **Koppla den här skärmen** fungerar även i B1 Admin. Om du anger den där och väljer en plantyp under **Visa planer för**, följer TV:n den plantypen i [Planläge](../plan-mode/) i stället för en kalender. Se [Koppla din enhet](../plan-mode/device-pairing).

## Ändra eller koppla bort från TV:n

När TV:n är kopplad visar raden **Koppla till en kalender** i **Inställningar** namnet på skärmgruppen den följer. Välj raden för att öppna dialogrutan **Kopplad till**, som har tre alternativ:

- **Tillbaka till schemat** - Stänger dialogrutan och går tillbaka till den schemalagda spelaren. Ingenting med kopplingen ändras.
- **Koppla bort** - Slutar följa ett schema. FreePlay öppnar skärmen **Innehållsleverantörer**.
- **Koppla till en annan kalender** - Kopplar bort och visar sedan en ny kopplingskod så att du kan koppla TV:n igen.

:::warning
Att koppla bort tar bort de filer som FreePlay laddade ner för den kalendern.
:::

## Koppla bort i FreePlay Admin

1. Gå till **Skärmar** och klicka på skärmens etikett.
2. Klicka på **Mer** och sedan på **Koppla bort**.
3. Klicka på **Koppla bort** igen för att bekräfta.

TV:n går tillbaka till att visa en kopplingskod. Koppla den igen när du vill att den ska användas.

## Relaterade artiklar

- **[Hantera skärmar och grupper](./managing-screens)** - Byt namn på en skärm, flytta den till en annan grupp eller kontrollera dess nedladdningar
- **[Schemalägga kalendern](./scheduling-the-calendar)** - Bestäm vad gruppens skärmar spelar upp
- **[Välja ett kopplingsläge](../getting-started/pairing-modes)** - Jämför schemalagt läge med planläge och bläddra i leverantörer själv
