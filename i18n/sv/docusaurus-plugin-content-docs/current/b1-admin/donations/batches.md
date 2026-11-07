---
title: "Gåvobatcher"
description: "Gruppera gåvor i insamlingssatser i B1 Admin och stäng, skriv ut eller exportera varje sats så att summorna stämmer med banköverföringarna."
---

# Gåvobatcher

<div class="article-intro">

Batcher samlar dina gåvor så att de blir enklare att följa upp och stämma av. En vanlig batch motsvarar en enskild insamling, till exempel ett söndagsoffer eller en särskild händelse. Med batcher håller du ordning på dina uppgifter och kan enkelt kontrollera att de stämmer överens med de faktiska insättningarna.

</div>

<div class="prereqs">
<h4>Innan du börjar</h4>

- Se till att du har [lagt upp dina fonder](funds.md) så att de finns tillgängliga när du registrerar gåvor
- Du behöver behörigheten **Visa gåvosammanfattningar**, **Redigera gåvor** eller **Registrera gåvor** för att se sidan Batcher (se [Vem kan ändra en batch](#who-can-change-a-batch))

</div>

## Sidan Batcher

När du går till **Gåvor > Batcher** ser du en lista över dina batcher. Varje rad visar:

- **Namn** -- den etikett du gav batchen
- **Datum** -- datumet för insamlingen
- **Gåvor** -- antalet enskilda gåvor i batchen
- **Summa** -- det sammanlagda beloppet i kronor
- **Status** -- **Öppen** eller **Stängd** (se [Stänga och öppna en batch igen](#closing-and-reopening-a-batch))

Ovanför listan kan du med årsknapparna visa endast batcher från ett visst år, eller **Alla** batcher. En sammanfattning på en rad visar antalet batcher, antalet gåvor och den totala summan för de visade batcherna.

## Skapa en ny batch

1. Klicka på **Lägg till batch** högst upp på sidan.
2. Ange ett beskrivande namn (t.ex. "Söndagsoffer - 9 feb").
3. Välj datumet för insamlingen.
4. Klicka på **Spara**.

Din nya batch visas i listan och är redo för att du ska lägga till gåvor.

## Arbeta med batcher

- **Visa gåvor** -- klicka på ett batchnamn för att öppna det och se alla enskilda gåvor det innehåller. Därifrån kan du lägga till, redigera eller ta bort gåvor, eller klicka på **Importera CSV** för att lägga till många gåvor samtidigt från ett kalkylblad (se [Importera gåvor från en CSV-fil](recording-donations.md#importing-donations-from-a-csv-file)).
- **Redigera batchens uppgifter** -- klicka på knappen **Redigera** på en batchrad för att ändra dess namn eller datum. Endast personer med behörigheten **Redigera gåvor** kan ta bort en batch.
- **Sortera** -- använd kolumnrubrikerna för att sortera batcherna efter namn eller datum.
- **Exportera** -- klicka på **Exportera** högst upp på sidan för att ladda ner de visade batcherna som ett kalkylblad (CSV).
- **Misslyckade händelser** -- om din betalningsleverantör har rapporterat problem visas en knapp för **Misslyckade händelser** (med antalet olösta händelser) högst upp på sidan. Klicka på den för att visa eller dölja listan över händelser under batcherna.
- **Importera från Stripe** -- klicka på **Importera saknade Stripe-transaktioner** högst upp på sidan för att öppna verktyget [Stripe-import](stripe-import.md). Knappen visas endast när din församlings givarportal är Stripe.

## Vem som registrerade varje gåva

Varje gåva som registreras i en batch visar **Inmatad av** och personens namn under givarens namn, så att du kan se vem som registrerade den utan en signaturlista. B1 registrerar detta automatiskt utifrån den person som är inloggad, och om gåvan redigeras senare ändras inte uppgiften. Gåvor som importerats med **Importera CSV** visar den person som kördde importen.

Onlinegåvor, gåvor som lagts till med verktyget [Stripe-import](stripe-import.md), samt gåvor som registrerades innan detta lades till i november 2026 visar inget namn.

## Stänga och öppna en batch igen

När en batch har räknats och satts in på kontot ska du stänga den, så att gåvorna förblir exakt som de var när du stängde den.

1. Öppna batchen.
2. Klicka på **Stäng batch** högst upp på sidan.

Statusmärket bredvid batchnamnet ändras från **Öppen** till **Stängd**, batchen visar **Stängd** i kolumnen **Status** på sidan Batcher, och en notis högst upp i batchen förklarar att den är stängd. Medan en batch är stängd kan personer med behörigheten **Registrera gåvor** fortfarande se den, men de kan inte lägga till, redigera eller ta bort dess gåvor eller ändra batchens namn eller datum.

För att kunna göra ändringar igen öppnar du batchen och klickar på **Öppna batch igen**. Nya batcher är alltid öppna från början.

:::info
Endast personer med behörigheten **Redigera gåvor** ser knapparna **Stäng batch** och **Öppna batch igen**. De kan dessutom fortfarande ändra gåvor i en stängd batch om en rättelse behövs, utan att öppna batchen igen.
:::

## Vem kan ändra en batch

Två [rollbehörigheter](../settings/roles-permissions.md) gör det möjligt för någon att arbeta med batcher:

- **Redigera gåvor** -- full åtkomst: lägga till och ta bort batcher, stänga och öppna dem igen, samt lägga till, redigera eller ta bort vilken gåva som helst, oavsett om batchen är öppen eller stängd.
- **Registrera gåvor** -- för räkneteam och volontärer som registrerar insamlade medel. De kan lägga till batcher samt lägga till, redigera eller ta bort gåvor, men endast medan batchen är öppen. De kan inte ta bort batcher, stänga eller öppna dem igen, eller ändra gåvor som kommit in via onlinegivande.

Den som har behörigheten **Registrera gåvor** men inte **Visa gåvosammanfattningar** ser **Gåvor** i menyn i B1 Admin, som leder direkt till sidan Batcher. **Sammanfattning**, **Fonder**, **Kampanjer** och **Gåvobesked** är dolda för dem. För att kunna öppna en batch och se gåvorna i den behöver rollen även behörigheten **Visa gåvor**.

:::tip
En vanlig konfiguration är en roll "Räkneteam" med behörigheterna **Registrera gåvor** och **Visa gåvor**, samt en kassör med **Redigera gåvor** som stänger varje batch när insättningen har stämts av.
:::

## Skriva ut en batch

Öppna en batch och klicka på **Skriv ut** ovanför gåvolistan för att skriva ut ett pappersexemplar till ditt räkneteam eller dina insättningsarkiv. Utskriften innehåller:

- Din församlings brevhuvud -- din logotyp (**Logotyp för ljus bakgrund** från [Webbplats > Utseende](../website/appearance.md), om du har laddat upp en) med din församlings namn under den -- följt av batchens namn och batchens datum
- Varje gåva i batchen, med givarens namn, vem som registrerade den, metod, anteckningar, datum och belopp (återbetalda gåvor är överstrukna och markerade som återbetalda)
- **Delsummor per fond** -- den totala summan som givits till varje fond i batchen
- **Batchens summa** -- det sammanlagda beloppet för hela batchen

Knappen **Skriv ut** visas först när batchen innehåller minst en gåva.

### Skriva ut flera batcher samtidigt

För att skriva ut alla batcher från en period på en gång -- till exempel alla insättningar från förra månaden -- klicka på **Skriv ut** högst upp på sidan **Batcher**, bredvid **Exportera**. Sidan **Skriv ut batcher** öppnas med ett **Startdatum** och ett **Slutdatum** som motsvarar batcherna på skärmen: 1 januari till 31 december för det år du valde, eller från det tidigaste till det senaste batchdatumet när **Alla** är valt. Ändra något av datumen för att välja ett annat intervall.

Varje batch med datum inom intervallet (inklusive start- och slutdatum) skrivs ut i datumordning, en batch per sida, med samma layout som vid utskrift av en enskild batch. Batcher utan gåvor utelämnas, och om ingen av batcherna i intervallet har gåvor visas meddelandet "Inga batcher med gåvor i det här datumintervallet." Klicka på **Skriv ut** för att öppna din webbläsares utskriftsdialog, eller på **Stäng** för att återgå till batchlistan.

## Exportera en batch till QuickBooks Online

Öppna en batch och klicka på **Exportera för QuickBooks** för att ladda ner batchen som en verifikation som QuickBooks Online kan importera (**Settings > Import Data > Journal Entries**). Filen innehåller en debet på **Undeposited Funds** för batchens summa och en kredit per fond, där varje fonds namn används som kontonamn. QuickBooks ber dig matcha dessa namn mot din kontoplan under importen, så namnge dina fonder på samma sätt som din bokförare namnger intäktskonton, eller mappa dem en gång vid importen.

:::tip
Namnge dina batcher konsekvent så att de är lätta att hitta senare. Om du tar med datum och insamlingstyp (t.ex. "Söndag förmiddag - 2025-02-09") hålls din lista ordnad när den växer.
:::

## Nästa steg

När du har en batch kan du läsa [Registrera gåvor](recording-donations.md) för att lära dig hur du lägger till enskilda gåvor i den. Du kan också [importera Stripe-transaktioner](stripe-import.md) för att automatiskt skapa batcher från onlinegivande.
