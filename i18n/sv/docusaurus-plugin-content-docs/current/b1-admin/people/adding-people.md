---
title: "Lägga till personer"
---

# Lägga till personer

<div class="article-intro">

Avsnittet Personer är grunden i B1 Admin. Det är din kyrkas medlemsdatabas. Alla andra funktioner (grupper, närvaro, gåvor, formulär) kopplas till personposter. Den här guiden visar hur du lägger till någon i databasen, redigerar uppgifterna och kopplar familjemedlemmar till hushåll.

</div>

## Utbildningsvideo

<YouTube id="NTL1UDQpx8s" title="Lägga till personer och hushåll i B1" next="Importera din persondatabas i B1" nextUrl="/docs/b1-admin/people/importing-data" />

<div class="prereqs">
<h4>Innan du börjar</h4>

- Du behöver ett aktivt B1 Admin-konto med behörighet att hantera personer. Se [Roller och behörigheter](roles-permissions.md) om du inte är säker på vilken åtkomst du har.
- Om du ska lägga till fler än några få personer kan du i stället använda verktyget [CSV-import](importing-data.md).

</div>

## Lägga till en person

1. Gå till B1.church Admin-instrumentpanelen.
2. Öppna [Hoppmenyn](../introduction.md#getting-around-with-the-jump-menu) (sökfältet överst till vänster), expandera **People** och klicka på **People**.
3. Klicka på knappen **Add Person** i sidhuvudet. Sidan scrollar ner till formuläret **Add New Person** under katalogen.
4. Fyll i personens **First Name**, **Last Name** och **Email** och klicka sedan på **Add**.

Personens profilsida öppnas, redo för fler uppgifter.

:::tip
Om du flyttar från ett annat kyrkohanteringssystem kan du med funktionen [Importera data](importing-data.md) föra över hela katalogen från en CSV-fil. Det går betydligt snabbare än att lägga till personer en i taget.
:::

### Varningar om dubbletter

Om e-postadressen (eller, när du skapar en person från det fullständiga redigeringsformuläret, telefonnumret eller samma förnamn + efternamn + födelsedatum) matchar någon som redan finns i din databas, visas dialogrutan **Possible Duplicate** innan den nya posten sparas. Den listar varje matchande person med e-post, telefon och födelsedatum så att du kan jämföra.

- Klicka på **Use Existing** bredvid en matchning för att använda den personens post i stället för att skapa en ny.
- Klicka på **Create Anyway** för att lägga till den nya personen trots att en möjlig matchning hittades.

Dubblettkontrollen görs endast när du skapar en helt ny person. Redigering av en befintlig post utlöser aldrig den. Funktionen förhindrar bara nya dubbletter. Den slår inte ihop två befintliga poster.

## Redigera uppgifter

1. På personens profilsida klickar du på knappen **Edit** under kontaktuppgifterna till vänster.
2. Fyll i ytterligare uppgifter i formuläret **Personal Details**, till exempel en **Title** (välj Mr, Mrs, Miss, Ms, Dr, Prof, Rev eller Pastor i listan, eller skriv en egen, högst 10 tecken), mellannamn, medlemsstatus (**Visitor**, **Guest**, **Regular Attendee**, **Member**, **Staff**, **Inactive** eller **Deceased**), datum, adress, telefonnummer och (för barn och elever) årskurs och skola.
3. Klicka på **Save** för att spara de personliga uppgifterna.

Till vänster på profilen visas personens foto, namn, medlemsstatus, kontaktuppgifter, värden för eventuella [anpassade fält](../settings/custom-fields.md) och hushåll. Under hushållet visar **Added** när posten skapades (gäller endast personer som lagts till sedan slutet av oktober 2026). Klicka på fotot för att byta bild. Under knappen **Edit** finns några fler åtgärder: **Workflow** (lägg till personen i ett [arbetsflöde](../serving/workflows.md)), **Merge**, **Export** och **Export Data**.

Resten av profilen visar en sammanfattning för varje typ av relaterad information:

- **Attendance** visar vilka av de senaste veckorna personen deltog och de senaste besöken. Klicka på **All years** för hela besökshistoriken, med campus, gudstjänst, gudstjänsttid, grupp och kolumnen **Checked In** med tiden för incheckning i kiosken (visas som ett streck för besök utan incheckning i kiosk). Du kan också klicka på **Print** för att skriva ut historiken. Utskriften har din kyrkas logotyp och namn centrerat överst, ovanför personens namn. För kyrkovida trender i stället för en enskild persons historik, se [Följa närvaro](../attendance/tracking-attendance.md).
- **Donations** visar årets gåvor, inklusive gåvor till fonder som inte är avdragsgilla. Klicka på **All years** för hela [gåvohistoriken](../donations/recording-donations.md) eller på **Log a gift** för att registrera en ny gåva. Om din kyrka har aktiverat [Giving Privacy](../settings/church-settings.md#giving-privacy) döljs beloppen tills du klickar på **Show giving**.
- **Groups** listar personens [gruppmedlemskap](../groups/group-members.md). Med **Joined** visas det datum då personen gick med i respektive grupp, om det finns registrerat.
- **Notes** visar de senaste anteckningarna om personen (själavård, uppföljningar med mera). Klicka på **All notes** för att läsa och lägga till anteckningar. Varje anteckning visar vem som skrev den samt datum och klockslag. För att se de senaste anteckningarna för alla samtidigt, använd sidan [Notes](./notes.md).
- **Forms** listar personens formulär och om respektive formulär har skickats in (se [Arbeta med formulär](#working-with-forms) nedan).

När du öppnar någon av de fullständiga vyerna klickar du på länken **Back to** med personens namn överst för att återvända till profilen.

## Skicka e-post till en person

Om personen har en e-postadress registrerad visas knappen **Email** under kontaktuppgifterna till vänster på profilen.

1. Klicka på **Email** på personens profil.
2. Dialogrutan **Email** öppnas med personens namn i rubriken och visar **Sending to** med personens adress.
3. Välj eventuellt en sparad mall under **Load Template (optional)**.
4. Ange ett **Subject** och skriv meddelandet.
5. Klicka på **Send Email**.

Om du i stället vill skriva meddelandet i ditt eget e-postprogram klickar du på **Open in my email app**.

:::info
E-post som skickas från B1 följer samma godkännandeprocess och dagliga gränser som gruppmail. Om din kyrka ännu inte har godkänts ber dialogrutan dig begära en granskning. Du kan fortfarande klicka på **Open in my email app** under tiden. Se [Aktivera gruppmail för din kyrka](../groups/group-members.md#turning-on-group-email-for-your-church). Användare utan behörighet att redigera gruppmedlemmar öppnas direkt i e-postprogrammet när de klickar på **Email**.
:::

## Arbeta med formulär

Du kan fylla i anpassade formulär direkt från en persons profil. Det är användardefinierade formulär som du kan skapa genom att följa guiden [Skapa formulär](../forms/creating-forms.md).

1. På personens profil hittar du avsnittet **Forms**. Där listas varje formulär och om det har blivit **Submitted** eller **Not submitted**.
2. Klicka på ett formulärs namn för att öppna det (eller på **All forms** för att se hela listan).
3. Klicka på **edit icon** (pennan) för formuläret, fyll i uppgifterna och klicka på **Save**.

När ett formulär har skickats in klickar du på **print icon** (skrivarikonen) bredvid det för att skriva ut personens ifyllda svar. Om personen har ett enda inskick av ett formulär visas **Submitted** med datumet ovanför svaren.

Om ett inskick hamnade hos fel person klickar du på ikonen **Change person** (två pilar) bredvid det för att flytta det till någon annan eller koppla bort det. Se [Byta person för ett inskick](../forms/managing-submissions.md#changing-the-person-on-a-submission).

:::info
Formulär som är kopplade till en persons profil använder formulärtypen **People**. Om du behöver ett fristående formulär, till exempel för en eventanmälan, se alternativet [Stand Alone form](../forms/creating-forms.md) i formulärguiden.
:::

:::tip
Om du bara behöver följa upp en eller två extra uppgifter om personer, till exempel ett datum, ett tal eller ett ja/nej-svar, använd i stället [Anpassade fält](../settings/custom-fields.md) istället för ett formulär. De är snabbare att fylla i och går att söka efter direkt i Avancerad sökning.
:::

## Hantera hushåll {#managing-households}

Med hushåll kan du koppla ihop familjemedlemmar. Det är särskilt användbart vid [incheckning](../attendance/check-in.md), där en förälder kan checka in alla sina barn samtidigt.

1. På en persons profil klickar du på **Edit** bredvid rubriken **Household** till vänster.
2. Redigeraren för hushåll öppnas. Välj **household role** för den aktuella personen (till exempel Head, Spouse, Child eller Other).
3. Klicka på ikonen **Add** för att lägga till ytterligare en hushållsmedlem.
4. Under **Add Household Member** skriver du personens namn i sökrutan och trycker på **Enter** eller klickar på sökikonen. (Innan du skriver visas en kort lista över **Recent people**.)
5. När personen visas i resultaten klickar du på namnet eller på lägg till-ikonen bredvid.
6. Välj hushållsroll och klicka på **Save** för att slutföra hushållsinställningen.
