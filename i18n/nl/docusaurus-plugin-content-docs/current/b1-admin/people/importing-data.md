---
title: "Gegevens importeren"
---

# Gegevens importeren

<div class="article-intro">

B1 Admin maakt het gemakkelijk om uw bestaande ledengegevens in het systeem in te voeren. Of u van een ander kerkbeheersysteem migreert of gegevens van een spreadsheet laadt, de importgereedschappen sparen u van het handmatig invoeren van elke persoon. U kunt uit een CSV-bestand importeren of rechtstreeks van Breeze ChMS migreren.

</div>

<div class="prereqs">
<h4>Voordat u begint</h4>

- U hebt een actief B1 Admin-account nodig met toegang tot **Instellingen**. Zie [Rollen en machtigingen](roles-permissions.md) als u niet zeker bent over uw toegangsniveau.
- Zorg ervoor dat uw ledengegevens klaar zijn in een spreadsheet of geëxporteerd vanuit uw vorige systeem.
- Als u van Breeze migreert, zorg er dan voor dat u uw bestanden Personen, Labels en Bijdragen eerst uit Breeze hebt geëxporteerd.

</div>

## Importeren uit CSV

Als u ledengegevens in een spreadsheet of ander systeem hebt, kunt u deze importeren met behulp van een CSV-bestand (door komma's gescheiden waarden).

1. Ga naar **Instellingen** in de linkerzijbalk.
2. Klik op **Importeren/exporteren** in de bovenste navigatie.
3. Selecteer **B1 Importeren ZIP** in de vervolgkeuzelijst **Gegevensbron**.
4. Klik op de link om **voorbeeldbestanden** te downloaden, zodat u de verwachte indeling kunt zien.
5. Open het voorbeeldbestand `people.csv` en vervang de voorbeeldgegevens door uw eigen. Houd de koppelingrijij intact.
6. Als u ledenfotos hebt, voegt u deze toe aan de map met behulp van afbeeldingen van 400x300 pixels, waarbij u ze benoemt zodat zij overeenkomen met de `importKey` nummers in uw CSV.
7. Comprimeer uw bewerkte bestanden in een zip-bestand.
8. Ga terug naar B1 Admin en klik op **Uploaden** en selecteer uw zip-bestand.
9. Controleer de gegevensvoorvertoning en klik op **Doorgaan naar bestemming**.
10. Controleer of **B1-database** is geselecteerd, bekijk de importsamenvatting en klik op **Overdracht starten**.
11. Wacht tot het importeren is voltooid en klik vervolgens op **Ga naar B1** om naar uw dashboard terug te keren.

:::tip
Download en controleer altijd de voorbeeldbestanden eerst. Als u de verwachte kolomindeling aanpast, worden importfouten voorkomen.
:::

:::warning
Het importeren van gegevens voegt nieuwe gegevens toe aan uw database. Als u hetzelfde bestand twee keer importeert, krijgt u mogelijk dubbele gegevens. Controleer uw bestand zorgvuldig voordat u de overdracht start.
:::

## Importeren uit Breeze ChMS

Als u van Breeze migreert, beschikt B1 over een speciale importoptie die de conversie automatisch verwerkt.

1. Ga in Breeze naar **Instellingen** en klik op **Exporteren** in de linkerzijbalk.
2. Exporteer drie bestanden: **Personen**, **Labels** en **Bijdragen**.
3. Selecteer alle drie geëxporteerde bestanden, klik met de rechtermuisknop en comprimeer deze in één zip-bestand.
4. Ga in B1 Admin naar **Instellingen** vervolgens **Importeren/exporteren**.
5. Selecteer **Breeze Importeren ZIP** in de vervolgkeuzelijst **Gegevensbron**.
6. Upload uw zip-bestand en volg de stappen op het scherm om het importeren te controleren en voltooien.

:::info
De Breeze-import brengt personen, foto's, groepen, donaties, aanwezigheid, formulieren en meer over -- waardoor u in één stap een volledige migratie krijgt.
:::

## Na het importeren

Zodra uw importeren is voltooid, neemt u een paar minuten de tijd om uw gegevens te controleren:

1. Blader door de pagina [Personen](../people/adding-people.md) en controleer enkele profielen.
2. Bevestig dat namen, e-mails, telefoonnummers en adressen correct zijn aangekomen.
3. Controleer of huishoudbindingen intact zijn.
4. Controleer [groepen](../groups/creating-groups.md) of labels die zijn geïmporteerd.

Als u problemen opmerkt, kunt u afzonderlijke profielen rechtstreeks vanuit de pagina Personen bewerken. U kunt ook [uw gegevens exporteren](exporting-data.md) op elk moment om een back-up te maken.
