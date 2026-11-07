---
title: "Söka efter personer"
description: "Sök i din People-katalog i B1 Admin på namn, sortera och välj kolumner i tabellvyn, skapa filter med Advanced Search och exportera träffarna till CSV."
---

# Söka efter personer

<div class="article-intro">

Sidan **Personer** visar din församlingskatalog som en sökbar lista över hushåll, eller som en sorterbar tabell över enskilda personer. Du kan snabbt hitta vem som helst i din församling, anpassa vilken information som visas och exportera dina resultat. Effektiv sökning är viktig för det dagliga administrativa arbetet i församlingen, till exempel när du följer upp besökare, tar fram kontaktlistor och hanterar medlemsregister.

</div>

## Träningsvideo

<YouTube id="7Y-tN9RmnDQ" title="Söka efter personer och skapa listor i B1" next="Anpassade fält, massredigering och export i B1" nextUrl="/docs/b1-admin/settings/custom-fields" />

<div class="prereqs">
<h4>Innan du börjar</h4>

- Du behöver ett aktivt B1 Admin-konto med behörighet att visa personer. Se [Roller och behörigheter](roles-permissions.md) om du är osäker på vilken åtkomstnivå du har.
- Din församlingskatalog bör innehålla personer. Om du inte har lagt till någon än, se [Lägga till personer](adding-people.md) eller [Importera data](importing-data.md).

</div>

## Hushåll och tabellvyer

Sidan Personer visar din katalog efter **hushåll**, grupperade alfabetiskt. Varje rad visar hushållets foton, dess namn (till exempel ”The Smith Family”) och namnen på alla i hushållet. Klicka på ett hushåll för att öppna huvudpersonens profil, eller klicka på en medlems namn för att öppna just den personen. En räknare ovanför listan visar hur många hushåll och personer som visas.

Använd växlaren **Visa som** ovanför listan för att byta mellan **Hushåll** och **Tabell**. Tabellvyn visar en person per rad och är där du kan sortera och välja kolumner (se nedan). B1 kommer ihåg ditt val på den här enheten.

I tabellvyn visas varje persons medlemsstatus under namnet, och var och en av de sju statusarna har sin egen färg, samma som används på personens profil. Den som har hushållsrollen **Barn** visar dessutom en **Barn**-tagg bredvid statusen. För att markera någon som barn, ange deras roll i [hushållspanelen](./adding-people.md#managing-households) på deras profil.

Som standard laddar sidan den första delen av din katalog. Om du har fler personer klickar du på **Visa alla medlemmar** under listan för att ladda alla.

## Snabbsökning

Sökrutan **Hitta ett hushåll eller en person** högst upp på sidan Personer låter dig hitta medlemmar i realtid:

1. Klicka i **sökrutan** högst upp på sidan Personer.
2. Börja skriva ett namn.
3. Resultaten filtreras automatiskt medan du skriver (det finns en kort fördröjning på cirka en halv sekund, så att sökningen inte körs vid varje tangenttryckning).
4. Listan nedanför uppdateras och visar endast de matchande resultaten.

Klicka på **Rensa** (under sökrutan) för att återställa sökningen och visa hela katalogen igen.

:::tip
Du behöver inte trycka på Enter. Sökningen körs automatiskt när du slutar skriva.
:::

## Sortera resultat

I tabellvyn listas personer efter efternamn, sedan förnamn. Du kan sortera katalogen på ett annat sätt genom att klicka på valfri kolumnrubrik:

1. Klicka på en **kolumnrubrik** (till exempel **Namn** eller **E-post**) för att sortera efter den kolumnen.
2. Klicka på samma rubrik igen för att vända sorteringsordningen.

Detta gör det enkelt att hitta personer alfabetiskt, efter ålder eller efter någon annan synlig kolumn.

## Anpassa kolumner

Inte all information behöver vara synlig samtidigt. Du kan välja vilka kolumner som visas i tabellen:

1. Klicka på ikonen **Välj kolumner** i sidhuvudet på sidan Personer. (Kolumner gäller för tabellvyn.)
2. Markera eller avmarkera kolumner för att visa eller dölja dem. Tillgängliga kolumner är bland annat:
   - **Foto**
   - **Namn**
   - **E-post**
   - **Telefon**
   - **Adress**
   - **Födelsedatum**
   - **Ålder**
   - **Kön**
   - **Medlemsstatus**
   - **Campus**
   - **Datum tillagt** -- när personens post skapades
3. Tabellen uppdateras direkt för att spegla dina val. Klicka på **Klar** för att stänga dialogrutan **Välj kolumner**.

### Visa anpassade fält som kolumner

Kolumnväljaren har två flikar: **Standard** innehåller de inbyggda kolumnerna som listas ovan, och **Anpassad** innehåller din församlings [anpassade fält](../settings/custom-fields.md) tillsammans med frågorna från eventuella formulär för personer. Markera ett anpassat fält på fliken **Anpassad** för att lägga till det som kolumn, så visas varje persons värde för fältet i tabellen. Värden visas på samma sätt som på personens profil: Ja/Nej-fält visar *Ja* eller *Nej*, flervalsfält visar alternativets etikett och datum visas som korta datum. Personer utan något värde för fältet visar en tom cell.

## Exportera sökresultat

Du kan när som helst ladda ner dina aktuella sökresultat som en CSV-fil:

1. Tillämpa de sökningar eller filter du vill ha.
2. Klicka på knappen **Exportera** i sidhuvudet på sidan Personer.
3. En CSV-fil laddas ner till din dator, redo att öppnas i Excel, Google Sheets eller valfritt kalkylprogram.

För mer information om export, se [Exportera data](./exporting-data.md).

:::tip
För mer avancerade frågor -- till exempel för att hitta alla som inte har närvarat under de senaste tre månaderna -- prova funktionen [AI-sökning](./ai-search.md), som låter dig söka med vanliga språkfrågor.
:::

## Avancerad sökning

Avancerad sökning låter dig skapa exakta filter genom att kombinera villkor. Öppna den genom att klicka på **Avancerat** under sökrutan på sidan Personer, expandera sedan en kategori och markera de fält du vill filtrera på (du kan klicka på fältets namn eller på dess kryssruta), och välj en operator och ett värde för varje fält. Kategorierna omfattar **Namn**, **Demografi**, **Kontakt**, **Medlemskap**, **Aktivitet** (gåvor och närvaro) och **Anpassade fält**.

För att hitta nya personer, öppna **Medlemskap** och markera **Datum tillagt**. Det börjar på **under de senaste N dagarna** med 30 ifyllt, så att du med ett klick kan hitta alla som lagts till under den senaste månaden. Ändra antalet dagar, eller byt till *är lika med / efter / före* för att välja ett datum. **Födelsedatum** och **Årsdag** erbjuder också **under de senaste N dagarna**. Datum tillagt registreras endast för personer som skapats sedan slutet av oktober 2026; personer som lagts till tidigare har inget datum, så det här filtret hittar dem inte.

Kategorin **Anpassade fält** listar din församlings [anpassade fält](../settings/custom-fields.md) -- de fält du definierar under Inställningar för att spåra din egen information (till exempel ett utgångsdatum för registerutdrag). Operatorerna som erbjuds matchar varje fälts typ: textfält stöder *innehåller / är lika med / börjar med / slutar med*, sifferfält stöder jämförelseoperatorerna, datumfält stöder *är lika med / efter / före*, och Ja/Nej- och flervalsfält låter dig välja ett värde. Alla fält du kan filtrera på här kan sparas som en levande [lista](./lists.md).

## Spara sökningar som listor

Efter att du kört en sökning visas knappen **Spara som lista** i sidhuvudet på sidan Personer. Klicka på den för att spara din aktuella fråga under ett namn och en valfri kategori, så att du snabbt kan läsa in den igen i framtida sessioner. Se [Sparade listor](./lists.md) för fullständig information.
