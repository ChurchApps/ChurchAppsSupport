---
title: "Hantera sidor"
---

# Hantera sidor

<div class="article-intro">

Vyn Webbplatsens sidor är din centrala plats för att skapa, redigera och ordna alla sidor på din kyrkas webbplats. Du kan hantera både sidornas innehåll och webbplatsens navigering från den här enda skärmen.

</div>

<div class="prereqs">
<h4>Innan du börjar</h4>

- Slutför [Första inställningen](initial-setup) för att konfigurera din domän och grundläggande webbplatsinställningar
- Ha ditt innehåll och dina bilder redo. Använd [Filer](files) för att ladda upp mediefiler först.

</div>

:::info
Om din kyrka har fler än en webbplats (till exempel separata webbplatser per församling) använder du webbplatsväxlaren överst i vyn Webbplatsens sidor för att växla mellan dem. Varje webbplats har egna sidor, navigering och [utseendeinställningar](appearance).
:::

## Förstå sidtyper

Tabellen **Sidor** listar varje sida på din webbplats efter **Sökväg** och **Titel**. Det finns två typer av sidor:

- **Genererad** -- Sidor som skapats automatiskt av systemet utifrån din kyrkas data (till exempel en sida för grupper, en sida för predikningar eller en individuell sida för varje predikan i ditt bibliotek). Dessa sidor visar en märkning **Genererad** och uppdateras automatiskt när dina data ändras.
- **Anpassad** -- Sidor som du har skapat själv med eget innehåll och egen layout.

Du kan omvandla vilken automatiskt genererad sida som helst till en anpassad sida om du vill ha full kontroll över innehåll och design. Klicka på **Konvertera** bredvid den genererade sidan och bekräfta.

## Lägga till och redigera sidor

1. Klicka på knappen **Lägg till sida** uppe till höger i vyn Webbplatsens sidor.
2. Välj en sidtyp (tom sida eller en mall) och ge sidan ett namn.
3. Klicka på **Redigera innehåll** bredvid valfri sida för att öppna [sidredigeraren](page-editor), där du kan lägga till sektioner, text, bilder och andra element.
4. Klicka på **Sidinställningar** bredvid en sida för att uppdatera sidans titel, URL-sökväg och andra metadata.
5. Klicka på en sidas sökväg i kolumnen **Sökväg** för att öppna den publicerade sidan i en ny flik och se exakt hur den ser ut för besökare.

:::tip
För startsidan anger du URL-sökvägen till bara `/`. För alla andra sidor använder du en beskrivande sökväg som `/about` eller `/contact`.
:::

### Sidinställningar

Öppna **Sidinställningar** på valfri sida för att konfigurera:

- **Titel och URL-sökväg** -- Sidans namn och dess adress på din webbplats.
- **Synlighet** -- Välj vem som kan se sidan: alla, endast medlemmar, endast personal eller medlemmar i specifika grupper. Det här är ett snabbt sätt att skydda en privat sida (som en resurssida för personal) utan separat lösenord.
- **Metabeskrivning** -- En kort sammanfattning som visas i sökmotorresultat och i förhandsvisningar av länkar i sociala medier.
- **Omdirigeringar** -- Peka en gammal URL-sökväg till den här sidan, så att länkar och bokmärken till en borttagen sida fortsätter att fungera.

## Hantera navigering

Panelen **Huvudnavigering** på högra sidan av vyn Webbplatsens sidor visar dina navigeringslänkar. De här länkarna styr menyn som besökare ser på din webbplats.

1. Klicka på **Lägg till** för att skapa en ny navigeringslänk. Du kan peka den till vilken sida som helst på din webbplats eller till en extern URL.
2. Om du vill ordna om länkarna drar du och släpper dem i önskad ordning. Du kan också nästla länkar under ett överordnat objekt för att skapa rullgardinsmenyer.
3. Klicka på valfri länk för att öppna dess **Länkinställningar**, där du kan ändra text, URL eller överordnad sida.
4. Om du vill ta bort en länk från navigeringen öppnar du dess **Länkinställningar** och klickar på **Ta bort**.

:::info
Om du tar bort en navigeringslänk raderas inte själva sidan. Sidan finns kvar och kan fortfarande nås direkt via sin URL -- den visas bara inte i menyn.
:::

## Övergripande reglage för webbplatsen

Under länkarna i panelen **Huvudnavigering** finns två reglage som gäller hela din kyrkas webbplats:

- **Visa inloggning** -- Visar en knapp för **Logga in** i webbplatsens navigeringsfält.
- **Inaktivera publik webbplats** -- Stänger av din publika webbplats. Använd det om din kyrka bara använder B1 för medlemsportalen, gåvor och anmälningar, och har sin huvudsakliga webbplats på en annan plats.

### Vad det innebär att inaktivera den publika webbplatsen

När **Inaktivera publik webbplats** är på:

- Varje publik sida, inklusive startsidan och dina anpassade sidor, skickar besökare som inte är inloggade till inloggningsskärmen. Efter att de har loggat in går de tillbaka till sidan de bad om.
- Inloggade medlemmar ser hela webbplatsen som vanligt, inklusive din navigering och de inbyggda **genererade** sidorna (till exempel Grupper och Predikningar). Genererade sidor visas inte längre i tabellen Sidor.
- Sökmotorer får besked om att inte indexera webbplatsen. Webbplatskartan är tom och `robots.txt` blockerar all genomsökning.

Dessa länkar fortsätter att fungera, så medlemmar och gäster kan fortfarande nå dem:

- Inloggning och utloggning
- Medlemsportalen (allt under `/mobile`)
- [Länkar för eventanmälan](../guides/event-registration.md) och gästanmälan

En varning visas under reglaget så länge den publika webbplatsen är avstängd. Slå av reglaget igen för att få tillbaka dina sidor. Ingenting raderas medan webbplatsen är inaktiverad.

:::info
Den här inställningen gäller hela din kyrka. Om du har fler än en webbplats stänger den av alla, inte bara den som är vald i webbplatsväxlaren.
:::

## Tips för att ordna din webbplats

- Håll din översta navigering till fem eller sex objekt så att besökare snabbt hittar det de söker.
- Använd nästlade länkar för relaterade underordnade sidor (till exempel en rullgardinsmeny "Om oss" med "Vårt team", "Tro och lära" och "Historia").
- Granska din navigering i en telefon för att se till att den fungerar bra på mindre skärmar.
- Ge sidorna tydliga, beskrivande namn som hjälper besökare att förstå vad de kan hitta.

:::tip
Du kan lägga till [formulär](../forms/creating-forms.md) på dina sidor för att samla in anmälningar, bönenamn eller annan information från besökare.
:::

## Börja från en webbplatsmall

Om du bygger din webbplats från grunden kan du starta den med en **Webbplatsmall** i stället för att skapa sidor en i taget. En webbplatsmall skapar en uppsättning färdiga sidor -- startsida, om oss, kontakt, ge och andra -- med platshållartext och navigeringslänkar redan kopplade.

1. På skärmen Sidor klickar du på knappen **Starta från en mall** (bredvid knappen **Lägg till sida**).
2. Bläddra bland de tillgängliga mallarna och klicka på en för att förhandsgranska dess sidstruktur.
3. När du hittar en du gillar klickar du på **Tillämpa mall**.
4. Sidor som inte redan finns skapas och läggs till i din navigering. Befintliga sidor lämnas orörda.

När du har tillämpat en mall öppnar du varje sida i [sidredigeraren](page-editor) och ersätter platshållartexten och bilderna med din kyrkas riktiga innehåll.

:::info
Webbplatsmallar skapar sidstruktur och navigering. De ändrar inte din webbplats färgschema eller typsnitt -- de styrs av [Utseende](appearance).
:::

## Bildförstoring

När besökare klickar på en bild på din webbplats öppnas den i en helskärmsvy över sidan. Det gör att människor kan se foton i större format utan att lämna sidan. Ingen konfiguration krävs -- bildförstoringen aktiveras automatiskt för bilder i ditt sidinnehåll.

## Nästa steg

- [Första inställningen](initial-setup) -- Instruktioner för första gången du ställer in din webbplats
- [Använda sidredigeraren](page-editor) -- Lär dig att bygga och formatera sidinnehåll
- [Utseende](appearance) -- Anpassa din webbplats visuella tema
- [Filer](files) -- Ladda upp och hantera mediefiler för dina sidor
