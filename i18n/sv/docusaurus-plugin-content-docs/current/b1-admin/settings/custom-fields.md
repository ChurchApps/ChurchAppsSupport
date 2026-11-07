---
title: "Anpassade fält"
---

# Anpassade fält

<div class="article-intro">

**Anpassade fält** låter dig spara egen information på varje personpost, till exempel sådant som B1 inte har ett inbyggt fält för, som ett utgångsdatum för registerkontroll, en T-shirtstorlek eller status för dopklassen. Du definierar ett fält en gång under Inställningar och fyller sedan i ett värde på varje persons profil. Därefter kan du söka på fältet eller bygga listor utifrån det. Detta ersätter den äldre lösningen där man skapade ett personformulär bara för att lagra ett enda anpassat dataområde.

</div>

## Utbildningsvideo

<YouTube id="yUfDEbp2HQ4" title="Anpassade fält, massredigering och export i B1" next="Skapa grupper och lägga till medlemmar i B1" nextUrl="/docs/b1-admin/groups/creating-groups" />

<div class="prereqs">
<h4>Innan du börjar</h4>

- Du behöver redigeringsbehörighet för **Personer** för att definiera fält och fylla i värden, samt åtkomst till området **Inställningar**. Alla med visningsbehörighet för Personer kan se värdena. Se [Roller och behörigheter](./roles-permissions.md).
- Bestäm vad du vill spåra och vilken typ som passar bäst (text, ett tal, ett datum, ett ja/nej-svar eller en vallista) innan du börjar.

</div>

## Öppna Anpassade fält

I B1 Admin öppnar du [Hoppmenyn](../introduction.md#getting-around-with-the-jump-menu) (sökfältet uppe till vänster), väljer **Inställningar > Inställningar** och klickar på **Anpassade fält** i listan till vänster för att rulla till avsnittet **Anpassade fält**. Du kan också gå direkt dit på **/settings/custom-fields**. Du ser en lista över alla fält du har definierat, med **Namn** och **Fälttyp**. Om du inte har skapat några ännu står det *„Inga anpassade fält har lagts till ännu.”*

## Lägga till ett fält

1. Klicka på **Lägg till fält**.
2. I redigeraren som öppnas till höger anger du ett **Namn**. Det här är etiketten som personalen ser på personprofiler och i sökningar, till exempel *Registerkontroll går ut*.
3. Välj en **Fälttyp**:
   - **Textruta**: fri kort text.
   - **Heltal**: tal utan decimaler, till exempel ett antal.
   - **Decimaltal**: tal som kan innehålla decimaler.
   - **Datum**: ett kalenderdatum.
   - **Ja/Nej**: ett enkelt ja- eller nejsvar.
   - **Flervalsalternativ**: en vallista. När du väljer den här typen visas en **redigerare för svarsalternativ** där du kan lägga till de alternativ som personer kan välja mellan.
4. Klicka på **Spara**.

Fältet är nu tillgängligt på varje persons profil.

:::info
Fälttyperna är samma uppsättning som används för [formulärfrågor](../forms/creating-forms.md), så värdena beter sig konsekvent i hela B1.
:::

## Redigera ett fält

Klicka på en fältrad i listan för att öppna den igen i redigeraren. Ändra namn, typ eller alternativ och klicka sedan på **Spara**.

:::warning
Om du ändrar **Fälttyp** för ett fält som redan har värden, till exempel från Textruta till Datum, kan tidigare angivna värden hamna i ett format som inte längre stämmer med den nya typen. Ändra typer med försiktighet när personalen har börjat fylla i fältet.
:::

## Ta bort ett fält

Öppna ett fält för redigering och klicka på **Ta bort**. Du får en bekräftelsefråga: *„Är du säker på att du vill ta bort detta anpassade fält? Dess lagrade värden tas också bort.”* När du tar bort ett fält tas det permanent bort tillsammans med **alla värden som lagrats för det** på alla personer. Detta kan inte ångras.

## Fylla i värden för en person

När minst ett anpassat fält finns visas dess värden tillsammans med de inbyggda uppgifterna på varje persons post. Du ser dem bredvid personens kontaktuppgifter till vänster på profilen och redigerar dem i samma formulär som övriga uppgifter om personen. Inget extra visas förrän du har definierat ditt första fält.

1. Öppna en persons post under **Personer**.
2. Klicka på knappen **Redigera** till vänster på profilen, under personens kontaktuppgifter.
3. Scrolla ner till området **Anpassade fält** längst ned i redigeringsformuläret och fyll i ett värde för varje fält. Varje fält visar det inmatningsfält som passar dess typ: en datumväljare för datumfält, en ja/nej-rullista för ja/nej-fält, en vallista för flervalsalternativ och så vidare.
4. Klicka på **Spara**. Värdena för de anpassade fälten sparas tillsammans med resten av personens uppgifter.

Tillbaka på profilen visas varje fält som har ett värde under personens kontaktuppgifter som *Fältnamn: värde*. Ja/nej-svar visas som *Ja* eller *Nej*, och flervalsalternativ visar alternativets etikett. Tomma fält döljs. För att ta bort ett värde redigerar du personen, rensar fältet och sparar. Ett tomt värde tas bort från posten i stället för att lagras som tomt.

:::tip
Det klassiska användningsfallet är säkerhet bland volontärer. Skapa ett **Datum**-fält med namnet *Registerkontroll går ut*, registrera varje volontärs datum och bygg sedan en [sparad lista](../people/lists.md) som flaggar alla vars datum har passerat.
:::

## Söka och bygga listor utifrån anpassade fält

Anpassade fält kan sökas fullt ut:

1. På sidan **Personer** öppnar du [Avancerad sökning](../people/searching-people.md).
2. Expandera kategorin **Anpassade fält**.
3. Markera fältet du vill filtrera på, välj en operator och ange ett värde. De operatorer som erbjuds beror på fältets typ:
   - **Textruta**: innehåller, är lika med, börjar med, slutar med.
   - **Heltal / Decimaltal**: är lika med, större än, större än eller lika med, mindre än, mindre än eller lika med.
   - **Datum**: är lika med, efter (större än), före (mindre än).
   - **Ja/Nej**: är Ja eller Nej.
   - **Flervalsalternativ**: är lika med eller innehåller ett av alternativen.

Spara valfri sökning på anpassade fält som en [lista](../people/lists.md). Listor är levande frågor, så en lista byggd på *Registerkontroll går ut är före idag* kontrollerar alla personer på nytt varje gång du öppnar den. Ingen manuell uppdatering behövs.

## Visa ett anpassat fält som kolumn

För att se ett fälts värden för alla samtidigt lägger du till det som kolumn på sidan **Personer**. Byt **Visa som** till **Tabell**, klicka på ikonen **Välj kolumner** i sidhuvudet, byt till fliken **Anpassad** och markera fältet. Varje persons värde visas i en egen kolumn bredvid de inbyggda. Se [Visa anpassade fält som kolumner](../people/searching-people.md#showing-custom-fields-as-columns).

## Vad händer vid sammanslagning

När du [slår ihop två personposter](../people/adding-people.md) följer värden för anpassade fält automatiskt med. Personen du behåller behåller sina egna värden. För varje fält där endast den borttagna personen hade ett värde kopieras det värdet över, så inget går förlorat.

## Relaterade artiklar

- [Söka personer](../people/searching-people.md): avancerad sökning, inklusive kategorin Anpassade fält, och visning av anpassade fält som kolumner
- [Sparade listor](../people/lists.md): spara en sökning på anpassade fält och kör den igen live
- [Roller och behörigheter](./roles-permissions.md): vem som kan definiera fält och redigera värden
- [Skapa formulär](../forms/creating-forms.md): för insamling av data med flera frågor, där ett helt formulär passar bättre än enskilda fält
