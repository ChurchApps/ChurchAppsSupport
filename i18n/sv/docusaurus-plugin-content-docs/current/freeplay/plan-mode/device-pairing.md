---
title: "Parkoppla din enhet"
description: "Koppla en FreePlay-TV till en plantyp i B1 Admin med en fyrabokstavskod på skärmen och ladda sedan ner planens media för uppspelning i Plan Mode."
---

# Parkoppla din enhet

<div class="article-intro">

För att använda planeringsläget parkopplar du din TV med en plantyp i B1 Admin. FreePlay visar en kort parkopplingskod på TV:n. Du anger den koden i B1 Admin och väljer vilken plantyp som ska följas. TV:n hämtar sedan den planens innehåll automatiskt varje vecka.

</div>

<div class="prereqs">
<h4>Innan du börjar</h4>

- Installera och starta FreePlay. Se [Komma igång](../getting-started/index.md)
- Ha åtkomst till **B1 Admin** på en dator eller telefon för att slutföra parkopplingen

</div>

## Skapa parkopplingskoden

1. Öppna **Inställningar** längst ner i sidofältet på TV:n.
2. Välj **Parkoppla till en kalender**.
3. FreePlay visar en parkopplingskod med fyra bokstäver i stor text, bredvid en QR-kod.
4. Under koden visar en pulserande indikator **Väntar på bekräftelse** att FreePlay väntar på att du ska slutföra parkopplingen.

Samma kod fungerar för [Schemalagt läge](../scheduled-mode/index.md) i FreePlay Admin och för planeringsläget i B1 Admin. QR-koden och adressen **freeplay.church/pair** på skärmen öppnar FreePlay Admin. För planeringsläget ignorerar du dem och anger koden i B1 Admin enligt beskrivningen nedan.

## Ange koden i B1 Admin

1. Gå till **Profil** > **Enheter** i B1 Admin och klicka på **Lägg till skärm**.
2. Ange de fyra bokstäverna från TV:n i **Parkopplingskod**.
3. Under **Visa planer för** väljer du den plantyp som den här skärmen ska följa, till exempel "Söndagsgudstjänst".
4. Spara.

FreePlay kontrollerar var few sekund om parkopplingen är klar. När B1 Admin har bekräftat den visar TV:n **Ansluten!** och går vidare till skärmen för nedladdning av planen.

## Ladda ned innehåll för planen

Efter parkopplingen laddar FreePlay den aktuella planen för den plantypen. Den visar:

- Planens namn och tjänstedatum
- Lektionens namn, om planen innehåller lektionsinnehåll
- En förloppsindikator som visar **Laddar ned objekt X av Y**

När alla mediefiler har laddats ned visas knappen **Starta plan**. Tryck på **Välj** på fjärrkontrollen för att starta uppspelningen.

:::tip
Planen uppdateras automatiskt varje timme. Om någon ändrar planen under dagen hämtar FreePlay ändringarna av sig själv.
:::

## Om parkopplingen misslyckas

Om FreePlay inte kan skapa en parkopplingskod (till exempel på grund av ett nätverksproblem) visas ett felmeddelande med knappen **Försök igen**. Kontrollera att TV:n är ansluten till internet och försök igen.

:::warning
Parkopplingskoder upphör att gälla efter 15 minuter. FreePlay visar en ny kod automatiskt när den gamla löper ut, och du kan välja **Skapa ny kod** när som helst. Om koden du angav inte fungerar använder du den kod som TV:n visar just nu.
:::

## Relaterade artiklar

- **[Översikt över planeringsläget](./index.md)** - Hur planeringsläget skiljer sig från schemalagt läge
- **[Parkoppla en skärm](../scheduled-mode/pairing-a-screen.md)** - Parkoppla samma TV till en kalender i FreePlay Admin i stället
- **[Spela upp innehåll](../content-providers/playing-content.md)** - Reglage för uppspelning av plan
