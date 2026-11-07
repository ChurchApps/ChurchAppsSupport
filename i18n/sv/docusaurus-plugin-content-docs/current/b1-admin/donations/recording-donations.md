---
title: "Registrera gåvor"
---

# Registrera gåvor

<div class="article-intro">

Du registrerar gåvor i B1 Admin via systemet för satser (batches). Du skapar en sats som representerar en insamling, till exempel en söndagsoffer, och lägger sedan till de enskilda gåvorna i satsen. Det håller dina givarregister ordnade och gör det enkelt att stämma av.

</div>

<div class="prereqs">
<h4>Innan du börjar</h4>

- Ställ in dina [fonder](funds.md) så att du kan tilldela gåvor till rätt kategorier
- Skapa en [sats](batches.md) för de gåvor du ska registrera
- Se till att givarna finns i din [personkatalog](../people/adding-people.md) så att du kan söka upp dem när du registrerar gåvor
- Du behöver **Redigera gåvor**, eller **Registrera gåvor** tillsammans med **Visa gåvor**, för att lägga in gåvor i en sats (se [Vem kan ändra en sats](batches.md#who-can-change-a-batch))

</div>

## Skapa en sats och lägga till gåvor

1. Öppna i **B1 Admin** [hoppmenyn](../introduction.md#getting-around-with-the-jump-menu) (sökfältet uppe till vänster), expandera **Gåvor** och klicka på **Satser**.
2. Klicka på **Lägg till sats** överst på sidan.
3. Ange ett namn för satsen (t.ex. ”Söndagsoffer – 5 jan”) och välj datum. Klicka på **Spara**.
4. Din nya sats visas i listan med noll gåvor och 0,00 $.
5. Klicka på **satsens namn** för att öppna den.

## Registrera enskilda gåvor

1. På satsens detaljsida visas registreringspanelen bredvid listan över gåvor. Under **Välj person eller anonym** skriver du givarens namn i sökfältet för att hitta personen, eller klickar på **Anonym**. (Om du klickar på **Lägg till gåva** överst på sidan hoppar du till den här panelen.)
2. När du har valt en person visar formuläret fält för **Datum**, **Metod** (Check, Kontant, Kort eller Naturagåva), **Fond**, **Anteckningar**, **Belopp** och **Checknummer** (eller **Sista 4 siffrorna** för kortgåvor, eller **Föremål** för att beskriva en naturagåva). Klicka på **Ändra** bredvid givarens namn för att välja någon annan.
3. Fyll i uppgifterna och klicka på **Lägg till gåva** (eller tryck på Enter).
4. Gåvan läggs till i listan över gåvor, och formuläret nollställs så att du kan registrera nästa.

:::info
Om satsen har [stängts](batches.md#closing-and-reopening-a-batch) döljs registreringspanelen och länkarna **Redigera** för alla som saknar **Redigera gåvor**, och en notis överst i satsen anger att den är stängd. Be någon med **Redigera gåvor** att öppna satsen igen.
:::

:::tip
Du kan snabbt registrera flera gåvor i rad utan att lämna satsens sida. Formuläret nollställs efter varje post, så att du kan gå igenom en hög med checkar eller kuvert effektivt.
:::

## Importera gåvor från en CSV-fil {#importing-donations-from-a-csv-file}

Om dina gåvor redan finns i ett kalkylblad, till exempel en export från ett annat givarsystem eller en räkneteams sammanställning, kan du importera dem till en sats i stället för att skriva in varje gåva.

1. Öppna satsen och klicka på **Importera CSV** överst på sidan. (Knappen visas när du kan ändra satsen och din kyrka har minst en [fond](funds.md).)
2. Klicka på **Välj CSV-fil** och välj din fil. Filen behöver en rubrikrad, och kolumnerna kan komma i valfri ordning:
   - **Belopp** (obligatoriskt; `Total` fungerar också) -- Valutasymboler och kommatecken ignoreras, så `$1,250.00` är godtagbart. Beloppet måste vara större än noll.
   - **Datum** -- Använd ett format som `2026-10-25` eller `10/25/2026`. Om fältet är tomt används satsens datum.
   - **Fond** -- Fondens namn, matchas oberoende av versaler och gemener. Om fältet är tomt används din första fond.
   - **Metod** -- **Check**, **Kontant**, **Kort** eller **Naturagåva**. Om fältet är tomt används **Check**.
   - **Checknummer** -- Checkens nummer (eller annan betalningsinformation).
   - **Anteckningar**
   - **E-post**, **Namn**, eller **Förnamn** och **Efternamn** -- Används för att matcha givaren mot någon i din databas. Ett namn skrivet som ”Smith, John” tolkas som ”John Smith”.
3. Granska förhandsvisningen. Varje rad visar sitt radnummer, givaren enligt filen, **Matchning**, fonden och beloppet:
   - Ett personnamn betyder att givaren har matchats. B1 matchar först på e-post, sedan på exakt namn, och bara när exakt en person passar in.
   - **Ej hittad – anonym** betyder att ingen entydig matchning hittades. Gåvan importeras som anonym, och ”Importerad som:” med givarens namn läggs till i dess anteckningar så att du kan tilldela den senare.
   - Ett rött meddelande som **Ogiltigt belopp**, **Okänd fond**, **Okänd metod** eller **Ogiltigt datum** innebär att den raden hoppas över. Rätta filen och välj den igen för att inkludera den.
4. Klicka på **Importera** (knappen visar hur många rader som kommer att importeras). Gåvorna läggs till i satsen.

:::tip
Efter importen använder du **Redigera** på en anonym gåva för att välja rätt person. Anteckningen ”Importerad som:” visar vem filen angav som givare.
:::

## Logga en gåva från en persons post

Om du vill registrera en enskild gåva utan att öppna en sats öppnar du givarens post under **Personer** och klickar på **Logga en gåva** (i givarsammanfattningen, eller i personens översikt över gåvor).

1. Ange **Datum** och **Belopp**.
2. Välj **Fond** och **Metod** (Check, Kontant, Kort eller Naturagåva), och ange vid behov **Checknummer**, **Sista 4 siffrorna** eller **Föremål** (för naturagåvor).
3. Lägg eventuellt till **Anteckningar** och klicka sedan på **Spara**.

Gåvan sparas i satsen för det datumet. Om det inte finns någon sats för datumet ännu skapas en åt dig, med datumet som namn.

## Dela upp en gåva på flera fonder

Ibland ger en givare till mer än en fond i en och samma transaktion. Så här hanterar du det:

1. Klicka under registreringspanelen på länken **den fullständiga gåvoredigeraren** (eller klicka på **Redigera** på en befintlig gåvorad).
2. I den fullständiga redigeraren lägger du till belopp på olika fonder. Summan beräknas automatiskt från beloppen per fond.
3. Klicka på **Spara** för att uppdatera gåvan.

:::info
Att dela upp gåvor på flera fonder är vanligt när en givare skriver en enda check avsedd för flera ändamål, till exempel Allmän fond och Missionen.
:::

## Redigera eller ta bort gåvor

Om du vill redigera en gåva klickar du på knappen **Redigera** på gåvans rad i satsen. Du kan ändra datum, belopp, fond, betalningsmetod (Check, Kontant, Kort eller Naturagåva) eller någon annan uppgift. För en naturagåva märker redigeraren fältet för detaljer **Föremål** så att du kan beskriva vad som gavs. Klicka på **Spara** när du är klar.

:::tip
Raden under satsens namn överst på sidan uppdateras automatiskt och visar satsens datum, antalet gåvor och den sammanlagda summan i kronor och ören när du lägger till eller redigerar poster. Använd den för att stämma av mot din insättningslapp.
:::

## Återbetala en gåva

Om en givare debiterats av misstag eller ber om att få tillbaka sina pengar kan du återbetala en genomförd gåva direkt från redigeringsvyn, utan att behöva gå till din betalningsleverantörs instrumentpanel.

1. Öppna gåvan och klicka på **Redigera**.
2. Klicka på knappen **Återbetala** bredvid Ta bort längst ned i formuläret.
3. Bekräfta dialogrutan: ”Återbetala den här gåvan i sin helhet via betalningsleverantören? Detta kan inte ångras.”

Gåvan återbetalas i sin helhet via den ursprungliga betalningsleverantören och markeras **Återbetald** i dina gåvolistor.

:::warning
Återbetalningar är endast fullständiga – det finns inget sätt att återbetala ett delbelopp från B1 Admin. Återbetalningen kan heller inte ångras när den har bekräftats.
:::

:::info
Knappen **Återbetala** visas endast för gåvor som betalats online (de har en transaktion hos betalningsleverantören) och som fortfarande har status **Slutförd**. Manuellt registrerade gåvor (kontant, check) har ingen transaktion hos betalningsleverantören att återbetala – redigera eller ta bort dem i stället.
:::

## Skriva ut ett kvitto för en gåva

När någon lämnar in en check, betalar för ett evenemang eller en t-shirt, eller när en besökande organisation tar med sig en gåva, kan du skriva ut ett kvitto för just den gåvan i stället för för en hel sats eller ett årsbesked.

1. Öppna satsen som innehåller gåvan.
2. Klicka på **Kvitto** bredvid **Redigera** på gåvans rad. Du kan också klicka på **Kvitto** längst ned i formuläret Redigera gåva.
3. Klicka på **Skriv ut**, eller på **Stäng** för att gå tillbaka.

Kvittot använder samma layout som givarbeskedet: din kyrka och givaren (eller ”Anonym”), gåvans datum och metod, varje fond och belopp, anteckningen, din Givande-notis och det officiella kvittoblocket om du har angett ett **Beskedsformat** (se [Givarbesked](giving-statements.md)). Kvittonumret i blocket är gåvans ID.

:::info
Formuleringen ”inga varor eller tjänster” skrivs endast ut när alla fonder i gåvan är markerade som avdragsgilla. Om någon del av gåvan gick till en fond som inte är avdragsgill, till exempel en evenemangsavgift eller ett köp, utelämnas formuleringen så att kvittot framstår som en betalning snarare än en välgörenhetsgåva.
:::

:::tip
Onlinegåvor får redan ett automatiskt tackmejl, så kvittot är främst användbart för gåvor som du registrerar manuellt.
:::

## Nästa steg

- Granska dina poster med [Gåvorapporter](donation-reports.md) för att kontrollera att de är korrekta
- Vid årsskiftet tar du fram [Givarbesked](giving-statements.md) för dina givare
