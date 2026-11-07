---
title: "Registrera närvaro"
description: "Registrera närvaro vid varje gruppmöte i B1 Admin: skapa ett tillfälle, markera vem som deltog, spara anteckningar och skriv ut närvarolistor eller exportera till kalkylblad."
---

# Registrera närvaro

<div class="article-intro">

När dina campus, gudstjänsttider och grupper är inställda kan du registrera närvaro manuellt efter varje sammankomst. B1 Admin organiserar närvaro kring **sessioner**, en session per grupp och mötesdatum. Du skapar sessionen, markerar vilka som var närvarande, och uppgifterna matas direkt in i dina närvarorapporter.

</div>

## Utbildningsvideo

<YouTube id="gS8h2rhyMys" title="Registrera och följ närvaro i B1" next="Skapa planer och schemalägga volontärer i B1" nextUrl="/docs/b1-admin/serving/plans" />

<div class="prereqs">
<h4>Innan du börjar</h4>

- Dina campus, gudstjänsttider och grupper måste vara konfigurerade. Se [Närvaroinställningar](setup.md) om du inte har gjort det än.
- Grupperna du vill följa måste ha **Följ närvaro** aktiverat. Se [Närvaroinställningar](setup.md) för detaljer.
- Du behöver behörigheten **Redigera närvaro** för att spara närvaro. Volontärer som endast har **Visa endast namn på personer** kan fortfarande registrera närvaro på detta sätt. De öppnar klasser från **Grupper** och ser medlemmar endast med namn. Se [Endast namn på personer](../settings/roles-permissions.md#people-names-only).

</div>

## Skapa en session

En session representerar ett tillfälle av ett gruppmöte, till exempel din klass för K–3:e klass en specifik söndag.

1. Öppna **B1 Admin**, öppna [Hoppmenyn](../introduction.md#getting-around-with-the-jump-menu) (sökfältet uppe till vänster), expandera **Personer** och klicka på **Grupper**.
2. Välj gruppen du vill registrera närvaro för.
3. Under avsnittet **Sessioner** på gruppens sida klickar du på **Alla sessioner**.
4. Klicka på **Ny** för att skapa en ny session.
5. Om gruppen är kopplad till en gudstjänsttid väljer du **Gudstjänsttid**. Om det är en icke-schemalagd grupp visas inte det här fältet.
6. Välj **Sessionsdatum**. Det kan vara idag, ett tidigare datum eller ett framtida datum.
7. Klicka på **Spara**.

### Lägga till sessioner för varje klass i en gudstjänsttid

Om andra grupper möts vid samma gudstjänsttid (till exempel alla dina barnklasser kl. 09.00 på söndagar) kan du skapa deras sessioner i ett steg i stället för att besöka varje grupp.

1. Följ stegen ovan och välj en **Gudstjänsttid**.
2. Markera **Lägg även till för de andra _N_ grupperna i _gudstjänsttiden_**. Kryssrutan visar hur många andra grupper som är kopplade till gudstjänsttiden. Den visas endast när du lägger till en ny session och minst en annan grupp möts vid den tiden.
3. Klicka på **Spara**.

En session skapas för den aktuella gruppen och för varje annan grupp på samma datum och gudstjänsttid. Grupper som redan har en session för det datumet och gudstjänsttiden hoppas över, så du får inga dubbletter.

:::tip
Du kan skapa sessioner för tidigare datum för att komma ikapp med närvaro som du ännu inte har registrerat, eller skapa dem i förväg så att de är redo när din grupp möts.
:::

## Sessionsanteckningar {#session-notes}

Varje session kan ha anteckningar, till exempel en sammanfattning av vad som togs upp, meddelanden eller bönepunkter.

1. När du lägger till en session, eller efter att du klickat på ikonen **Redigera** (pennan) bredvid en session i listan, skriver du i rutan **Anteckningar (vad som togs upp, meddelanden, bönepunkter)** under datumet. Verktygsfältet låter dig lägga till fetstil, listor och länkar.
2. Klicka på **Spara**.

Anteckningarna visas överst i sessionens närvarolista. De är också mötesanteckningarna som gruppens medlemmar läser i avsnittet **Möten** på gruppens sida i B1.church, där gruppledare också kan skriva och redigera dem. Se [Gruppdetaljer](../../b1-church/groups/group-details.md#meeting-notes-and-attendance).

## Registrera närvaro

Välj en session för att se dess närvarolista. Varje gruppmedlem visas med en kryssruta, sorterad efter efternamn, och alla som redan är registrerade som närvarande är markerade.

1. Markera rutan bredvid varje person som deltog. Använd **Markera alla** eller **Avmarkera alla** för att ändra alla på en gång.
2. Antalet ovanför listan (till exempel "12 av 15 närvarande") uppdateras när du markerar rutor.
3. Klicka på **Spara närvaro**. Ingenting registreras förrän du sparar, och ett meddelande bekräftar när sparandet är klart. Om du försöker stänga eller ladda om webbläsarfliken medan ett sparande pågår varnar webbläsaren dig först, så att ändringarna inte går förlorade.

Om du avmarkerar någon som redan var registrerad som närvarande och sedan sparar, tas personen bort från sessionen.

### Lägga till besökare

För att registrera någon som inte är medlem i gruppen söker du efter personen i personsökningen bredvid närvarolistan. Om personen inte finns i din databas ännu kan du skapa den från sökningen. Oavsett vilket läggs personen till i listan redan markerad. Klicka på **Spara närvaro** för att registrera personen.

Personer som checkat in vid en kiosk visar en etikett för **Volontär** eller **Gäst**. Personer som inte är gruppmedlemmar visar en etikett för **Gäst**.

## Kontrollera vilka grupper som fortfarande behöver närvaro

När flera klasser möts vid samma gudstjänsttid kan du se direkt vilka som fortfarande behöver att deras närvaro registreras för det datumet.

1. Öppna en session som har en gudstjänsttid.
2. Klicka på **Vem behöver fortfarande närvaro?** överst i närvarolistan.
3. En dialogruta listar varje grupp som är kopplad till gudstjänsttiden, med en sammanfattning som "5 av 8 grupper registrerade" överst.

Grupper där ingen är markerad som närvarande för det datumet visar en etikett för **Ej registrerad** och listas först. Grupper som har närvaro visar **Registrerad** med antalet personer som markerats som närvarande (till exempel "Registrerad (12)"). Klicka på en grupps namn för att öppna gruppens sessioner med sessionen för samma datum redan vald, så att du kan registrera närvaro direkt. Om gruppen inte har någon session för det datumet ännu öppnas dess sessionslista så att du kan lägga till en.

:::tip
Kombinera detta med **Skriv ut alla klasser** och [att lägga till sessioner för varje klass i en gudstjänsttid](#adding-sessions-for-every-class-in-a-service-time). Skapa sessionerna, dela ut närvarolistor och använd sedan **Vem behöver fortfarande närvaro?** för att se vilka listor som ännu inte har registrerats.
:::

## Skriva ut en närvarolista

En närvarolista är en utskriftsbar klasslista som lärare kan markera för hand och lämna tillbaka till dig för att registrera senare. Varje lista visar din kyrkas logotyp (**Logotyp för ljus bakgrund** från [Webbplats > Utseende](../website/appearance.md), om du har laddat upp en) med kyrkans namn under, klassen, en stor **Datum**-rad under klassnamnet och gudstjänsttiden. Medlemmarna listas i två kolumner (läs nedåt i den vänstra kolumnen och sedan den högra) så att fler namn ryms på en sida, och varje medlem har rutorna **Närvarande** och **Frånvarande**. Det finns tomma rader för besökare och ett område för **Lärare / Anteckningar**.

- **Från en session**: Klicka på ikonen **Skriv ut närvarolista** (skrivaren) överst i sessionens närvarolista. Listan är daterad med sessionens datum och visar sessionens gudstjänsttid.
- **Alla klasser för en gudstjänst**: Om sessionen har en gudstjänsttid klickar du på **Skriv ut alla klasser** för att skriva ut en lista per klass som är kopplad till gudstjänsttiden. Varje klass skrivs ut på sin egen sida.
- **Från medlemslistan**: På gruppens sida klickar du på **Alla medlemmar**, klickar sedan på ikonen **Skriv ut närvarolista** ovanför medlemslistan och väljer **Närvarolista** för att skriva ut en lista utan datum. Samma meny har en layout för **Kontaktlista** med varje medlems telefon, e-post och adress. Se [Skriva ut medlemslistan](../groups/group-members.md#printing-the-member-list).

Listan öppnas i en ny flik och webbläsarens utskriftsdialog visas automatiskt.

## Exportera närvaro till ett kalkylblad

Du kan ladda ner en post av sessionen som en CSV-fil för att använda i Excel, Numbers eller Google Sheets.

1. Öppna sessionen du vill exportera.
2. Klicka på knappen **Exportera** överst i närvarolistan.
3. Öppna den nedladdade filen i ditt kalkylprogram.

Filen har en rad per gruppmedlem med namn och om personen var närvarande eller frånvarande, plus sessionens datum och sessionens anteckningar.

## Visa registrerad närvaro

Efter att du har registrerat sessioner visas uppgifterna i dina närvarorapporter.

- **Flik för närvarotrend** (under **Alla år** på sidan Närvaro): visar trender för hela kyrkan över tid. Se [Följ närvaro](tracking-attendance.md).
- **Flik för gruppnärvaro**: visar närvaro uppdelad per enskild grupp. Se [Närvarorapporter](../reports/attendance-reports.md#group-attendance).

:::tip
Om en session du just skapade inte visas i rapporterna direkt, kontrollera att sessionsdatumet ligger inom datumintervallet som valts i rapportens filter.
:::
