---
title: "Meddelanden"
---

# Meddelanden

<div class="article-intro">

FreePlay kan spela upp en mapp med meddelandebilder på din TV, till exempel i entréhallen eller innan lektionen börjar. Du väljer en mapp från en av dina anslutna innehållsleverantörer, FreePlay laddar ner bilderna till enheten, och ett **Meddelanden**-objekt visas i sidofältet så att du kan starta loopen när som helst.

</div>

<div class="prereqs">
<h4>Innan du börjar</h4>

- [Anslut till en innehållsleverantör](./connecting-providers) som innehåller dina meddelandebilder, till exempel Dropbox eller OneDrive
- Lägg de bilder eller videor du vill loopa i en gemensam mapp hos leverantören

</div>

## Välj mappen för meddelanden

1. Öppna **Inställningar** längst ner i sidofältet och välj sedan **Leverantörer**
2. Välj den anslutna leverantör som innehåller dina bilder (den visar en **Ansluten**-badge) för att öppna dess **Leverantörsinställningar**
3. Välj **Använd för meddelanden**
4. Bläddraren **Välj mappen för meddelanden** öppnas. Navigera genom mapparna tills du hittar den med dina bilder, och välj sedan den mappen (eller valfri fil i den)
5. FreePlay laddar ner bilderna och går tillbaka till **Leverantörsinställningar**, där raden nu visar **Loopar "*mappnamn*" -- *antal* bilder nedladdade**

Endast en mapp används för meddelanden åt gången. Om du väljer en mapp från en annan leverantör ersätts den tidigare mappen.

## Spela upp meddelanden

När bilderna har laddats ner visas ett **Meddelanden**-objekt nära toppen av sidofältet (under **Dagens plan**, om din TV visar det). Välj det för att starta loopen.

- Bilder visas på skärmen i 15 sekunder, om inte leverantören har angett en egen visningstid för filen
- Videor spelas till slutet innan nästa bild visas
- Efter den sista bilden börjar loopen om från den första
- Om mappen bara innehåller en video upprepas den på samma plats

Loopen spelas upp från filerna som sparats på enheten, så den fortsätter att köra utan internetanslutning. Du kan använda samma fjärrkontroll som för allt annat innehåll. Se [Spela upp innehåll](./playing-content).

## Uppdatera bilderna

FreePlay kontrollerar mappen för meddelanden varje gång appen startar, laddar ner nya bilder och tar bort bilder som har raderats från mappen.

Om du vill kontrollera direkt öppnar du leverantörens **Leverantörsinställningar** och väljer **Sök efter uppdateringar av meddelanden**. Raden visar **Uppdaterad** tillsammans med antalet bilder när kontrollen är klar.

:::info
Om FreePlay inte kan nå leverantören, eller om mappen är tom, fortsätter den att spela upp de bilder den redan har. Om du vill sluta använda meddelanden helt stänger du av dem enligt beskrivningen nedan.
:::

:::warning
En bild som ersätts med en ny version under samma filnamn laddas inte ner igen. För att ändra en bild lägger du till den som en ny fil och tar bort den gamla.
:::

## Stäng av meddelanden

Öppna leverantörens **Leverantörsinställningar** och välj **Använd för meddelanden** igen. FreePlay slutar använda mappen, tar bort de nedladdade bilderna från enheten och tar bort **Meddelanden** från sidofältet.

Om du kopplar bort leverantören stängs även de meddelanden som kom från den av.

## Relaterade artiklar

- **[Ansluta till leverantörer](./connecting-providers)** - Anslut leverantören som innehåller dina bilder
- **[Bläddra i och ladda ner innehåll](./browsing-content)** - Bläddra bland en leverantörs mappar och spela upp innehåll efter behov
- **[Spela upp innehåll](./playing-content)** - Uppspelningskontroller för din TV-fjärrkontroll
