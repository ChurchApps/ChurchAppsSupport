---
title: "Navigeringsstilar"
---

# Navigeringsstilar

<div class="article-intro">

Anpassa färgerna på navigeringsfältet på din kyrkas webbplats så att de matchar din grafiska profil. Du kan ställa in färger både för solida bakgrunder och för transparenta överlägg, vilket ger dig full kontroll över hur navigeringen ser ut på olika sidor.

</div>

<div class="prereqs">
<h4>Innan du börjar</h4>

- Du behöver behörighet att hantera din kyrkas webbplats. Se [Roller och behörigheter](../people/roles-permissions.md) för mer information.
- Ha dina varumärkesfärger redo, inklusive hexadecimala färgkoder (t.ex. #03A9F4).
- Förstå skillnaden mellan solida och transparenta navigeringsstilar på din webbplats.

</div>

## Förstå navigeringslägen

Din webbplatsnavigering kan visas i två olika stilar beroende på sida:

- **Solid navigering** -- Navigeringsfält med en bakgrundsfärg, vanligtvis använt på innehållssidor
- **Transparent navigering** -- Navigering som ligger ovanpå sidans innehåll, vanligtvis använt på sidor med huvudbilder eller helskärmsbakgrunder

Du kan anpassa färgerna för båda lägena oberoende av varandra.

## Öppna navigeringsstilar

1. I B1 Admin öppnar du [Hoppmenyn](../introduction.md#getting-around-with-the-jump-menu) (sökfältet överst till vänster) och expanderar **Webbplats**
2. Klicka på **Utseende**
3. I listan **Stilinställningar** klickar du på **Navigering**

Redigeraren **Navigeringsstilar** har två kort: **Sidhuvud (solid)** och **Sidhuvud över huvudbild (transparent)**.

## Ställa in solid navigering

Solid navigering visas med en bakgrundsfärg bakom navigeringsfältet. Dessa inställningar finns på kortet **Sidhuvud (solid)**. Du kan anpassa:

### Bakgrundsfärg

1. Slå på reglaget **Åsidosätt** för **Bakgrundsfärg**
2. Klicka på färgväljaren
3. Välj önskad bakgrundsfärg
4. Standardfärgen är vit (#FFFFFF)

### Länkfärg

1. Slå på reglaget **Åsidosätt** för **Länkfärg**
2. Välj färgen för länkarnas text i navigeringen
3. Detta påverkar länkar i sitt normala tillstånd
4. Standardfärgen är mörkgrå (#555555)

### Länkfärg vid musöverföring

1. Slå på reglaget **Åsidosätt** för **Länkfärg vid musöverföring**
2. Välj den färg som länkar får när användare för muspekaren över dem
3. Detta ger visuell återkoppling för länkar som går att klicka på
4. Standardfärgen är ljusblå (#03A9F4)

### Färg för aktiv länk

1. Slå på reglaget **Åsidosätt** för **Färg för aktiv länk**
2. Välj färgen för länken till den sida som är aktuell
3. Detta hjälper användarna att se vilken sida de befinner sig på
4. Standardfärgen är ljusblå (#03A9F4)

## Ställa in transparent navigering

Transparent navigering ligger ovanpå sidans innehåll utan bakgrund. Dessa inställningar finns på kortet **Sidhuvud över huvudbild (transparent)**. Du kan anpassa:

### Länkfärg

1. Slå på reglaget **Åsidosätt** för **Länkfärg**
2. Välj en färg som kontrasterar väl mot sidans bakgrund
3. Ljusa färger fungerar ofta bäst över mörka bakgrunder
4. Standardfärgen är mörkgrå (#555555)

### Länkfärg vid musöverföring

1. Slå på reglaget **Åsidosätt** för **Länkfärg vid musöverföring**
2. Välj färgen för musöverföringsläget
3. Se till att den syns mot sidans bakgrund
4. Standardfärgen är ljusblå (#03A9F4)

### Färg för aktiv länk

1. Slå på reglaget **Åsidosätt** för **Färg för aktiv länk**
2. Välj färgen som visar vilken sida som är aktiv
3. Den ska synas tydligt men ändå passa in i din design
4. Standardfärgen är ljusblå (#03A9F4)

:::info
Transparent navigering har ingen inställning för bakgrundsfärg, eftersom den ligger direkt ovanpå sidans innehåll.
:::

## Spara dina ändringar

1. När du har ställt in färgerna klickar du på **Spara navigering**
2. Dina ändringar börjar gälla direkt på din publicerade webbplats
3. Besök din webbplats för att se navigeringen i båda lägena

## Återställa till standardvärden

Om du vill gå tillbaka till standardfärgerna:

1. Slå av reglagen **Åsidosätt** för de anpassade färgerna
2. Klicka på **Spara navigering**
3. Navigeringen återgår till standardfärgschemat

Du kan också klicka på **Avbryt** för att kasta alla ändringar utan att spara.

## Bästa praxis

### Färgkontrast

- **Läsbarhet** -- Se till att länkfärgerna har tillräcklig kontrast mot bakgrunden
- **WCAG-efterlevnad** -- Sikta på minst 4,5:1 kontrastförhållande för tillgänglighet
- **Testa båda lägena** -- Förhandsgranska din webbplats med både solid och transparent navigering

### Varumärkeskonsekvens

- **Använd dina varumärkesfärger** -- Matcha din logotyp och webbplatsens tema
- **Begränsa din palett** -- Håll dig till 2-3 färger för ett enhetligt intryck
- **Tänk på dina bilder** -- Om du använder transparent navigering, testa den mot typiska sidbakgrunder

### Tillstånd för hovring och aktiv länk

- **Tydlig återkoppling** -- Gör så att färgen vid musöverföring tydligt skiljer sig från vanliga länkar
- **Särskilj aktiva sidor** -- Använd en tydlig färg så att användarna vet var de befinner sig
- **Mjuka övergångar** -- Systemet animerar färgändringar automatiskt

## Felsökning

### Färgerna ser fel ut

- **Rensa cacheminnet** -- Webbläsarens cache kan visa gamla färger
- **Kontrollera hexkoderna** -- Se till att du har angett giltiga hexadecimala färgkoder
- **Testa mot olika bakgrunder** -- Färgerna kan se annorlunda ut beroende på sidan

### Navigeringen syns inte

- **Transparent läge** -- Om du använder transparent navigering över ljusa bilder kan mörk text vara svår att se
- **Lösning** -- Justera länkfärgerna eller använd mörkare sidbakgrunder
- **Alternativ** -- Lägg till en diskret skugga eller ett bakgrundsöverlägg över navigeringsområdet

## Tekniska detaljer

Navigeringsstilar lagras som JSON och tillämpas med hjälp av CSS-variabler:

- Ändringarna träder i kraft direkt utan att webbplatsen behöver byggas om
- Färgerna påverkar alla navigeringselement
- Anpassningar är valfria; färger som inte är angivna använder temats standardvärden

## Relaterade artiklar

- [Utseende](./appearance.md) -- Anpassa webbplatsens övergripande utseende och känsla
- [Hantera sidor](./managing-pages.md) -- Skapa och organisera webbplatsens sidor
- [Sidredigeraren](./page-editor.md) -- Utforma sidlayouter och innehåll
