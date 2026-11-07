---
title: "Importera data"
description: "Importera befintliga personer, grupper, närvaro- och gåvoregister till B1 Admin med verktyget B1 Transfer eller exportera en säkerhetskopia när som helst."
---

# Importera data

<div class="article-intro">

Med verktyget B1 Transfer kan du enkelt föra över dina befintliga data till B1, oavsett om du börjar från ett kalkylblad, flyttar från en annan plattform för kyrkoadministration eller importerar gåvoregister. Du kan också använda verktyget för att exportera eller säkerhetskopiera dina data när som helst.

</div>

## Utbildningsvideo

<YouTube id="G-VnhzACYIU" title="Importera ditt personregister i B1" next="Söka efter personer och skapa listor i B1" nextUrl="/docs/b1-admin/people/searching-people" />

<div class="prereqs">
<h4>Innan du börjar</h4>

- Du behöver ett aktivt konto i B1 Admin med åtkomst till **Inställningar**.
- Ha dina data exporterade och redo från ditt tidigare system innan du börjar.
- Det här verktyget är avsett för den första datamigreringen. Om du redan har använt B1 under en tid kan en ny import skapa dubbletter av poster.

</div>

## Så öppnar du överföringsverktyget

1. Logga in i **B1 Admin**.
2. Öppna [hoppmenyn](../introduction.md#getting-around-with-the-jump-menu) (sökfältet längst upp till vänster), expandera **Inställningar** och klicka på **Inställningar**.
3. Klicka på länken **Import/Export** under din kyrkas namn överst i den vänstra inställningsmenyn.
4. Då öppnas verktyget **B1 Transfer** i en ny flik på [transfer.b1.church](https://transfer.b1.church).

Överföringsverktyget guidar dig genom fyra steg: Källa, Förhandsgranskning, Mål och Kör.

---

## Steg 1 - Välj din källa

Välj varifrån dina data kommer. Det finns sju alternativ:

- **B1-databas** — Hämtar data direkt från din befintliga B1-kyrka. Användbart för att göra en säkerhetskopia eller konvertera dina data till ett annat format. Du måste vara inloggad för att använda det här alternativet.
- **B1-importzip** — En zipfil i B1:s eget format. Den används främst för att återställa en tidigare B1-export. Om du läser in en B1-exportzip i **B1-databasen** återställs allt som exporten innehåller (se [Exportera data](./exporting-data.md#full-data-export-from-settings)). Om filen inte kan läsas visar verktyget felet i stället för att börja om.
- **Breeze-importzip** — En zipfil som innehåller exporterade filer från Breeze ChMS.
- **Planning Center-zip** — En zip- eller CSV-fil exporterad från Planning Center.
- **Anpassad CSV / Excel** — Valfri CSV- eller Excel-fil med personuppgifter. Efter uppladdningen kopplar du dina kolumner till B1-fält innan importen fortsätter.
- **Tithe.ly CSV** — En export av personer eller gåvor från Tithe.ly (CSV- eller Excel-format godkänns).
- **CCB / Pushpay CSV** — En CSV-export av personer eller gåvor från Church Community Builder eller Pushpay.

Du kan dra och släppa filen i uppladdningsytan eller klicka för att bläddra efter den.

---

## Steg 1b - Mappa dina fält (endast Anpassad CSV / Excel)

Om du valde **Anpassad CSV / Excel** visar verktyget efter uppladdningen av filen en skärm för fältmappning innan du går vidare till förhandsgranskningen.

Varje kolumn i din fil visas tillsammans med ett exempelvärde. För varje kolumn använder du rullgardinsmenyn för att välja motsvarande B1-fält. Verktyget identifierar automatiskt vanliga kolumnnamn som ”First Name”, ”Email” eller ”Zip Code”, men du bör granska varje rad och rätta det som verktyget har missat.

Tillgängliga B1-fält inkluderar:

- Förnamn, Efternamn, Mellannamn, Smeknamn, Visningsnamn, Titel/Prefix, Suffix
- E-post, Hemtelefon, Mobiltelefon, Arbetstelefon
- Adressrad 1, Adressrad 2, Ort, Län/delstat, Postnummer
- Födelsedatum, Bröllopsdag, Kön, Civilstånd, Medlemsstatus
- Hushålls- eller familjenamn
- Gruppnamn — kopplar personen till en grupp med namn
- **Anpassat fält (matchning på namn)** — sparar kolumnen i ett av din kyrkas [anpassade personfält](../settings/custom-fields.md). En ruta för **B1-fältnamn** visas, ifylld med kolumnrubriken. Ändra den till fältets namn exakt så som det visas i B1 (versaler och gemener spelar ingen roll).
- **Formulärsvar (anpassat fält)** — sparar kolumnens värde som ett anpassat fält kopplat till personens post. Om du använder det här alternativet får du ange ett namn för formuläret.

Datum kan anges i vanliga format, till exempel `9/17/1994`, och konverteras automatiskt. För anpassade fält accepterar Ja/Nej-fält värden som Yes, No, Y, N, True, False, 1 och 0, och flervalsfält accepterar antingen valets text eller dess värde.

:::info
Skapa dina anpassade personfält i B1 Admin innan du importerar. När importen är klar listar steget **Anpassade fält** de kolumnnamn som inte matchar något B1-fält och räknar de värden som inte passar fältets typ. Dessa värden hoppas över, och resten av importen slutförs ändå.
:::

Kolumner som du inte vill importera kan ställas in på **(Hoppa över)**. Minst ett namnfält (Förnamn eller Efternamn) måste vara mappat innan du kan gå vidare.

Klicka på **Bekräfta mappning och importera** för att gå vidare till förhandsgranskningen.

---

## Steg 2 - Förhandsgranska dina data

Efter uppladdningen visar verktyget en förhandsgranskning av allt som ska importeras. Använd flikarna för att granska varje datatyp:

- **Personer** — Listade per hushåll, med foton om sådana ingår.
- **Grupper** — Ordnade efter campus, gudstjänst, tid och kategori.
- **Närvaro** — Sessionsdatum, grupper och antal besök.
- **Gåvor** — Batcher, fonder, givare och belopp.
- **Formulär** — Formulärnamn och innehållstyper.

Granska noggrant innan du går vidare. Om något ser fel ut klickar du på **Börja om** och rättar källfilen.

---

## Steg 3 - Välj ditt mål

Välj vart du vill att data ska gå:

- **B1-databas** — Importerar direkt till din kyrkas B1-databas. Efter att du valt det här alternativet visar verktyget ett slutligt antal poster som ska läggas till. Klicka på **Starta överföring** för att bekräfta.
- **B1-exportzip** — Laddar ner dina data som en zipfil i B1-format som senare kan återställas med **B1-importzip**. Bra för säkerhetskopior.
- **Breeze-exportzip** — Konverterar dina data till Breeze-format.
- **Planning Center-zip** — Konverterar dina data till Planning Center-format.

:::warning
Källan och målet kan inte vara samma format. Om de matchar varnar verktyget för att förhindra oavsiktlig dubblering.
:::

---

## Steg 4 - Kör

Verktyget genomför överföringen och visar förloppet för varje steg:

- Campus, gudstjänster och tider
- Personer
- Foton
- Grupper och gruppmedlemmar
- Gåvor
- Närvaro
- Formulär, frågor, svar och formulärinlämningar
- Anpassade fält (när du mappat några kolumner för anpassade fält)
- Komprimering (endast för zipfilsmål)

När målet är **B1-databas** heter förloppskortet **Importförlopp** och avslutas med **Importen är klar!** (eller **Importen är klar med fel**). För zipfilsmål använder samma meddelanden ordet **Export**.

:::info
Vid återställning av en **B1-importzip** hoppas poster som pekar på något som inte längre finns i filen över i stället för att stoppa importen. Det gäller gruppmedlemskap för personer eller grupper som inte finns i zipfilen, närvaro för raderade grupper eller personer samt kopplingar mellan grupper och borttagna gudstjänsttider. Närvarosessioner som aldrig kopplats till en gudstjänsttid återställs fortfarande. På samma sätt, vid export, utelämnas ett foto som inte kan hämtas eller läsas så att steget **Foton** kan fortsätta.
:::

:::warning
Stäng inte webbläsaren medan överföringen pågår. Vänta tills alla steg visas som slutförda.
:::

---

## Förbereda en Breeze-importzip

1. I Breeze går du till **Inställningar** och klickar på **Export** i den vänstra sidomenyn.
2. Exportera tre separata filer: **People**, **Tags** och **Contributions**.
3. Markera alla tre filerna, högerklicka och packa dem i en enda zipfil.
   - På en Mac: markera filerna, högerklicka och välj **Komprimera**.
   - På en PC: markera filerna, högerklicka, välj **Skicka till** och sedan **Komprimerad (zippad) mapp**.
4. Ladda upp zipfilen med alternativet **Breeze-importzip** i steg 1.

Breeze-importen överför personer, grupper (taggar) och gåvoposter automatiskt.

---

## Förbereda en export från Planning Center

1. Logga in i Planning Center och öppna produkten **People**.
2. Klicka på **Lists** i den vänstra sidomenyn och skapa en lista som innehåller alla du vill föra över. (Om du redan har en lista över hela församlingen kan du använda den.)
3. Öppna listan och använd alternativet **export** för att ladda ner dina personer som en **CSV**-fil. Ta med de fält du vill behålla. Namn, e-post, telefon, adress, födelsedatum, kön och medlemsstatus förs alla över till B1.
4. Om Planning Center ger dig fler än en fil markerar du alla, högerklickar och packar dem i en enda zipfil.
   - På en Mac: markera filerna, högerklicka och välj **Komprimera**.
   - På en PC: markera filerna, högerklicka, välj **Skicka till** och sedan **Komprimerad (zippad) mapp**.
5. Ladda upp CSV-filen eller zipfilen med alternativet **Planning Center-zip** i steg 1.

Fortsätt till förhandsgranskningen efter uppladdningen och kontrollera att dina personer och hushåll ser rätt ut innan du kör importen.

---

## Förbereda en export från Tithe.ly

1. I Tithe.ly exporterar du dina data för **People** som en CSV- eller Excel-fil. Du kan också exportera en separat fil för **Giving** om du vill föra över gåvoposter.
2. Verktyget identifierar automatiskt om filen innehåller personuppgifter eller gåvouppgifter utifrån kolumnnamnen.
3. Ladda upp filen med alternativet **Tithe.ly CSV** i steg 1.

:::info
Tithe.ly-exporter kan importeras en fil i taget. Kör processen två gånger om du behöver importera personer och gåvor separat.
:::

---

## Förbereda en export från CCB eller Pushpay

1. I Church Community Builder eller Pushpay exporterar du dina **People**-data som en CSV-fil. Du kan också exportera en separat fil för gåvor/bidrag.
2. Verktyget identifierar automatiskt om filen innehåller personuppgifter eller gåvouppgifter utifrån kolumnnamnen.
3. Ladda upp filen med alternativet **CCB / Pushpay CSV** i steg 1.

---

## Efter importen

När överföringen är klar tar du några minuter att kontrollera dina data:

1. Bläddra till sidan [Personer](../people/adding-people.md) och granska några profiler slumpmässigt.
2. Bekräfta att namn, e-postadresser, telefonnummer och adresser har förts över korrekt.
3. Kontrollera att hushållskopplingarna stämmer. Varje persons hushållsroll (Huvudperson, Make/maka, Barn eller Övrig) förs över när källan har en sådan: kolumnen **householdRole** i en B1-importzip, **Family Role** i Breeze eller Tithe.ly och **Family Position** i CCB / Pushpay. Roller som ”Head of Household”, ”Primary”, ”Wife” eller ”Son” omvandlas till motsvarande B1-roll. Planning Center- och Anpassad CSV / Excel-importer saknar en rollkolumn, så de personerna sätts till **Övrig**. Du kan ändra en roll från personens hushåll på sidan [Personer](../people/adding-people.md#managing-households).
4. Granska importerade grupper och gåvoposter.

Om du upptäcker problem kan du redigera enskilda profiler från sidan Personer. Du kan också köra överföringsverktyget igen för att [exportera dina data](exporting-data.md) som en säkerhetskopia.
