---
title: "Arbetsflöden"
---

# Arbetsflöden

<div class="article-intro">

Arbetsflöden för människor genom en serie steg på en visuell tavla. Varje person blir ett kort som förflyttas från ett steg till nästa, från uppföljning av en förstagångsgäst till en medlemsprocess och ett tackmeddelande till en förstagångsgivare, och allt annat där du behöver följa många personer genom samma steg. Ett steg kan be en volontär att göra något (ringa ett samtal, föra ett samtal) **och** köra automatiska åtgärder på egen hand, till exempel skicka ett e-postmeddelande eller sms, vänta några dagar eller lägga till personen i en grupp. Arbetsflöden hanterar alltså både den mänskliga uppföljningen och det rutinarbete som omger den. Arbetsflöden bygger vidare på [Uppgifter](./tasks.md) och ger en dra-och-släpp-tavla i Kanban-stil, så att ingen och ingenting faller mellan stolarna.

</div>

<div class="prereqs">
<h4>Innan du börjar</h4>

- Se till att de personer du vill följa finns i B1 Admin
- Sätt dig in i hur [Uppgifter](./tasks.md) fungerar, eftersom varje kort på en tavla är en uppgift
- För att använda åtgärden **Skicka e-post** behöver du först skapa de e-postmallar du vill skicka (hanteras under **Inställningar → E-postmallar**)
- För att använda åtgärden **Skicka sms** behöver du först koppla en [sms-leverantör](../settings/church-settings.md#texting)
- Du behöver rätt behörighet för uppgifter. Att visa, redigera kort och hantera arbetsflöden är separata behörighetsnivåer (se [Roller och behörigheter](../settings/roles-permissions.md))

</div>

## Visa arbetsflöden

Öppna [Hoppmenyn](../introduction.md#getting-around-with-the-jump-menu) (sökfältet överst till vänster i B1 Admin), expandera **Tjänst** och klicka på **Arbetsflöden**. Dina arbetsflöden visas i en tabell med varje flödes **Kategori** och **Status** (**Aktiv** eller **Inaktiv**). Om du använder kategorier kan flikarna ovanför listan filtrera den efter kategori. Klicka på ett arbetsflöde för att öppna dess tavla.

## Skapa ett arbetsflöde

1. Klicka på **Lägg till arbetsflöde** på sidan Arbetsflöden.
2. Välj hur du vill börja:
   - **Tomt arbetsflöde** -- börja från början och bygg dina egna steg.
   - **Från en mall** -- börja med en färdig uppsättning steg som du kan redigera. Inbyggda mallar inkluderar:
     - **Uppföljning av nya besökare** -- Skicka välkomstmejl → Personligt telefonsamtal → Bjud in till nästa steg → Kopplad
     - **Medlemskapsklass** -- Visa intresse → Anmäl dig till klassen → Delta i klassen → Slutför medlemskapet
     - **Tack till förstagångsgivare** -- Skicka tackkort → Dela med sig av givandets effekt → Förvaltare
     - **Bekräftelse av tjänsteuppdrag** -- Begär och vänta på svar → Ring volontären om obesvarad förfrågan (se [Bekräftelser av tjänsteuppdrag](#serving-assignment-confirmations))

   Att bygga en mallens steg kan ta en stund. Medan det pågår visar knappen **Lägg till arbetsflöde** texten **Skapar...** och kan inte klickas igen, så att du inte får en dubblett. Om något går fel visar sidan meddelandet *"Arbetsflödet kunde inte skapas. Försök igen."*
3. Ge arbetsflödet ett **Namn**.
4. Tilldela eventuellt en **Kategori** för att gruppera relaterade arbetsflöden. Du kan skapa en ny kategori direkt från rullgardinsmenyn.
   För ett tomt arbetsflöde väljer du också dess **Syfte**: **Uppföljning av personer** (den vanliga typen) eller **Bekräftelse av tjänsteuppdrag**. Syftet kan inte ändras när arbetsflödet har skapats.
5. Låt arbetsflödet vara **Aktivt** så att personer kan läggas till i det, eller ställ in det på **Inaktivt** för att dölja det från listorna för att lägga till i arbetsflöde.
6. Klicka på **Spara**.

:::tip
Använd knappen **Duplicera** i listan över arbetsflöden för att kopiera ett befintligt arbetsflöde, inklusive dess steg, automatiska åtgärder och routing, som utgångspunkt för ett nytt.
:::

## Bygg tavlan med steg

Varje arbetsflödestavla består av **steg**, som visas som kolumner från vänster till höger. Öppna ett arbetsflöde och använd **Lägg till steg** för att skapa varje etapp i din process.

När du lägger till eller redigerar ett steg kan du konfigurera:

- **Stegnamn** -- kolumnrubriken (till exempel "Välkomstsamtal" eller "Väntar på anmälan").
- **Förfaller om (dagar)** -- ställer automatiskt in ett förfallodatum när ett kort kommer till detta steg. Kort som passerat förfallodatumet markeras som **Försenad**.
- **Standardansvarig** -- personen eller gruppen som nya kort på detta steg automatiskt tilldelas. När standardansvarig är en person får de en avisering om att ett kort har tilldelats dem.
- **Automatiska åtgärder** -- saker som systemet gör på egen hand när ett kort anländer (se nedan).
- **Routing** -- vart kortet går när det lämnar steget (se [Routing](#routing-cards-with-outcomes-and-conditions)).

Dra stegkolumnerna i den ordning som motsvarar din process. Ordningen definierar också standardvägen ett kort tar när ingen annan routing gäller.

:::info
Spara ett nytt steg först. Automatiska åtgärder och routing knyts till steget, så redigeraren låser upp de avsnitten när steget finns.
:::

## Automatiska åtgärder

Varje steg kan innehålla en lista med **automatiska åtgärder** som körs av sig själva i samma ögonblick som ett kort **kommer in** i steget -- innan någon rör det. Så här kan ett steg både uppmana en volontär *och* sköta rutinarbetet kring uppföljningen.

I steg-redigeraren öppnar du **Automatiska åtgärder**, klickar på **Lägg till åtgärd**, väljer en typ och fyller i dess inställningar. Lägg till så många du behöver; de körs **uppifrån och ner i ordning**. Klicka på **Spara** för steget för att spara steget och alla dess åtgärder tillsammans. Att ta bort en åtgärd med papperskorgsikonen gäller direkt.

| Åtgärd | Vad den gör |
|---|---|
| **Skicka e-post** | Skickar personen en e-postmall som du väljer. Du kan åsidosätta ämnesraden. |
| **Skicka sms** | Skickar personen ett meddelande du skriver, via din kyrkas [sms-leverantör](../settings/church-settings.md#texting). |
| **Vänta** | Pausar kortet i ett antal dagar innan det fortsätter (se nedan). |
| **Lägg till i grupp** | Lägger till personen i en [grupp](../groups/index.md) du väljer. |
| **Ta bort från grupp** | Tar bort personen från en grupp du väljer. |
| **Registrera närvaro** | Markerar personen som närvarande vid en pågående gruppsamling (se nedan). |
| **Lägg till i arbetsflöde** | Startar personen i ett annat arbetsflöde -- användbart för överlämning mellan processer. |
| **Lägg till anteckning** | Registrerar en anteckning i kortets historik. |
| **Ange fält** | Uppdaterar ett fält i personens post: Medlemsstatus, Civilstånd, Kön, Ort, Län eller Postnummer. |
| **Webhook** | Skickar kortets uppgifter till en extern webbadress (URL) som du anger, för att koppla till andra system. |
| **Skapa uppgift** | Skapar en [uppgift](./tasks.md) med den titel och beskrivning du anger, tilldelad den du väljer. |
| **Meddela person** | Skickar en medarbetare eller volontär du väljer ett e-postmeddelande och ett B1-meddelande om kortet (se nedan). |

När alla åtgärder för ett steg har slutförts **vilar kortet på det steget** så att en person kan arbeta med det -- om inte steget har en automatisk route som flyttar det vidare (se [Helt automatiserade steg](#fully-automated-steps)).

:::info
Automatiska åtgärder körs endast när ett kort kommer in via det vanliga flödet -- när det först läggs till, när ett utfall eller en automatisk route för in det, eller efter att en Vänta-åtgärd är klar. De körs **inte** igen när en medarbetare manuellt drar ett kort till steget eller skickar tillbaka det, så att en person inte får samma e-post två gånger.
:::

### Skicka e-post

Välj **Skicka e-post**, välj en av dina e-postmallar och skriv eventuellt en egen ämnesrad. När ett kort kommer in i steget får personen det e-postmeddelandet automatiskt. (Om personen inte har någon e-postadress registrerad hoppar steget helt enkelt över denna åtgärd.) [Sammanfogningsfält](../settings/email-templates.md#merge-fields) i mallen, till exempel `{{firstName}}`, fylls i med personens egna uppgifter.

När e-postmeddelandet skickas registrerar kortets historik **E-post skickad**. Om det inte kan skickas -- till exempel för att din kyrkas e-post ännu inte är godkänd eller den dagliga gränsen har nåtts -- läggs ingen post "E-post skickad" till.

:::info
E-post från arbetsflöden skickas bara efter att din kyrka har godkänts för att skicka gruppmejl, och de räknas mot kyrkans dagliga e-postgräns. Se [Aktivera gruppmejl för din kyrka](../groups/group-members.md#turning-on-group-email-for-your-church). Åtgärden **Skicka e-post** varnar dig i steg-redigeraren när dessa e-postmeddelanden inte kommer att skickas: *"Din kyrkas e-post har ännu inte godkänts..."* om godkännandet fortfarande väntar, eller *"Din kyrkas e-post är pausad..."* om nyligen skickade meddelanden har studsat eller rapporterats som skräppost.
:::

### Registrera närvaro

Välj **Registrera närvaro** och klicka på **Välj grupp** för att välja den grupp vars närvaro ska registreras. När åtgärden körs markeras personen som närvarande vid den gruppens pågående gudstjänsttid -- precis som om personen hade checkat in. Detta är användbart tillsammans med en utlösare som lägger till personer i arbetsflödet när de anländer, så att de räknas utan separat incheckning.

- Närvaron mäts vid det ögonblick kortet **skapades**, så en **Vänta**-åtgärd tidigare i arbetsflödet flyttar inte den förbi gudstjänsten.
- Endast gudstjänsttider med dag och starttid räknas. Om ingen av gruppens gudstjänsttider pågår i det ögonblicket registreras inget och kortets historik noterar **Ingen schemalagd gudstjänst pågår — närvaro registrerades inte**.
- När närvaro registreras visar kortets historik **Närvaro registrerad** följt av gruppens namn. Om åtgärden körs igen för samma gudstjänst räknas personen inte två gånger.

### Meddela en person

Välj **Meddela person**, klicka på **Välj person** och skriv eventuellt ett **Meddelande**. När ett kort kommer in i steget får den personen ett e-postmeddelande och ett B1-meddelande med namnet på personen på kortet, arbetsflödets och stegets namn, ditt meddelande och en länk för att öppna kortet. Använd det för att ge en medarbetare eller ledare för en tjänst en förvarning -- till exempel *"Meddela pastorn när någon når steget Medlemsintervju."* Kortets historik registrerar **Meddelad** följt av personens namn.

### Skicka ett sms

Välj **Skicka sms** och skriv **Sms-meddelandet** (upp till 1 600 tecken). När ett kort kommer in i steget får personen sms:et i sin mobiltelefon. För att personifiera meddelandet klickar du på en bricka under meddelanderutan -- **Förnamn**, **Efternamn**, **Visningsnamn** eller **Kyrkans namn** -- för att infoga `{{firstName}}`, `{{lastName}}`, `{{displayName}}` eller `{{churchName}}` vid markören. Varje fält fylls i med personens uppgifter när sms:et skickas.

- Om personen inte har något mobilnummer registrerat skickas inget sms och kortets historik registrerar **Sms hoppades över: inget mobilnummer**.
- Om personen har avregistrerat sig skickas inget sms och kortets historik registrerar **Sms hoppades över: avregistrerad**.
- När sms:et skickas registrerar kortets historik **Sms skickat**. Om sändningen misslyckas -- till exempel för att ingen sms-leverantör är ansluten eller din kyrka har slut på sms-krediter -- loggas felet i kortets historik och stegets återstående åtgärder körs ändå.

:::warning
Sms skickas via din kyrkas egen [sms-leverantör](../settings/church-settings.md#texting). Om ingen leverantör är ansluten varnar åtgärdsredigeraren *"Ingen sms-leverantör är konfigurerad"* och sms:en skickas inte.
:::

### Vänta några dagar (droppsekvenser)

Åtgärden **Vänta** håller kvar ett kort i det antal dagar du anger. Medan det väntar visas kortet som **Pausat**. B1 kontrollerar avslutade väntetider var 30:e minut, så ett kort fortsätter inom ungefär en halvtimme efter att väntetiden har gått ut. När väntetiden är över:

1. Alla **återstående åtgärder i samma steg** körs -- så att du kan bygga en droppsekvens som **Skicka e-post → Vänta 3 dagar → Skicka en påminnelsemejl**.
2. Sedan, om steget har en automatisk route, flyttas kortet vidare; annars vilar det på steget tills en person tar hand om det.

:::tip
En **Vänta** i början av ett steg är ett enkelt sätt att "hålla" ett kort innan det visas för en volontär -- till exempel *Vänta 7 dagar, sedan når en coach ut*.
:::

## Lägga till personer som kort

Det finns flera sätt att lägga till personer på en tavla:

- **Från tavlan** -- Klicka på **Lägg till kort** längst ner i en stegkolumn och välj en person. Du kan också välja en grupp, och varje medlem i gruppen läggs till som ett kort.
- **Från en persons post** -- Använd **Lägg till i arbetsflöde** på en persons sida för att placera dem i ett arbetsflöde.
- **Från sökning av personer** -- Markera flera personer och använd den massvisa åtgärden **Lägg till i arbetsflöde** för att lägga till alla på en gång.
- **Automatiskt med en utlösare** -- Lägg till personer när något händer, till exempel ett formulärsvar eller en första gåva (se [Utlösare](#triggers) nedan).

Att lägga till någon för hand, eller med en stegåtgärd **Lägg till i arbetsflöde**, ger aldrig en andra öppen kort på samma arbetsflöde. Om de redan har ett öppet kort hoppas de över (vid massvis tillägg får bara de personer utan kort nya kort). När deras kort har stängts kan du lägga till dem igen. Utlösare följer i stället sin egen inställning **Endast en gång per person**.

## Arbeta med tavlan

Öppna ett arbetsflöde för att se dess tavla. Varje kort visar personens namn, vem det är tilldelat, och en förfallodatum- eller statusbricka (**Försenad** eller **Pausat**). En stegkolumn visar också små märken för eventuella automatiska åtgärder den kör och annotationer för dess routing, vilket ger dig en överblick över hur kort flödar.

- **Flytta ett kort** -- Dra ett kort från en kolumn till nästa när personen går vidare.
- **Öppna ett kort** -- Dubbelklicka på ett kort (eller klicka på det) för att öppna dess detaljlåda, där du kan ändra steg, tilldela om, lägga till anteckningar och granska det som redan har hänt.

Från kortlådan kan du:

- **Tilldela** kortet till en annan person eller grupp.
- **Pausa** kortet i 1 dag, 3 dagar eller 1 vecka för att tillfälligt dölja dess förfallodatum.
- **Skicka tillbaka** till föregående steg eller **Hoppa över** till nästa steg.
- **Fäst tilldelning** -- behåll samma ägare på kortet även när det flyttas mellan steg. Som standard tilldelas kortet om till det nya stegets standardansvarige när det flyttas; fästning behåller den nuvarande personen ansvarig genom hela processen.
- **Slutför** kortet för att avsluta det, eller välj en knapp för **Utfall** om steget har utfall konfigurerade (se [Routing](#routing-cards-with-outcomes-and-conditions)).
- **Ta bort kort** -- Ta bort ett kort från tavlan utan att slutföra det, till exempel när någon lagts till av misstag. Efter bekräftelse stängs kortet och tas bort från allas lista. Inga utfall, routes eller stegåtgärder körs, och dess historik bevaras med en post för **Borttagen**. För ett [bekräftelsekort för tjänsteuppdrag](#serving-assignment-confirmations) stänger borttagning av kortet förfrågan på samma sätt.
- **Lägg till anteckningar** och granska kortets **Aktivitet** -- en logg över automatiska åtgärder som har körts (skickade e-postmeddelanden, väntetider med mera), var och en med datum och tid för när den inträffade.

För ett kort om en person visar lådan också personens mobilnummer och e-post som länkar som du kan trycka på för att ringa eller mejla, plus en länk **Visa profil** om du har behörighet att visa personer. Personen som kortet är tilldelat ser telefonnumret och e-posten även utan åtkomst till Personer.

Anteckningar sparas med kortet. Alla som kan öppna kortet -- inklusive personen eller gruppen det är tilldelat -- kan läsa anteckningarna och lägga till sina egna. Personer som inte kan öppna kortet kan inte se dess anteckningar.

### Massåtgärder

Markera kryssrutorna på flera kort för att agera på dem tillsammans. För att välja alla kort i ett steg på en gång, markera rutan **Markera alla** i stegets kolumnrubrik; markera den igen för att avmarkera. En verktygsfält visas där du kan **Slutför**, **Pausa**, **Tilldela** (tilldela om) eller **Flytta till…** ett annat steg för alla valda kort samtidigt.

## Routing av kort med utfall och villkor

Routing styr vart ett kort går när det lämnar ett steg. Öppna ett stegs redigerare för att konfigurera två typer av routing.

### Utfallsknappar

Utfall är knappar som visas i kortlådan när du slutför ett kort på det steget. I stället för en enda knapp **Slutför** kan du erbjuda val som "Gick med i en grupp" eller "Inte intresserad". Varje utfall kan:

- Skicka kortet till **ett annat steg** i detta arbetsflöde,
- **Överlämna kortet** till ett helt annat arbetsflöde, eller
- **Stänga** kortet.

Detta gör att ett enda beslut kan förgrena personen till olika vägar.

### Automatisk routing (villkorad)

Automatiska routes flyttar ett kort vidare **i samma ögonblick som det kommer in i ett steg** (och efter att dess automatiska åtgärder är klara), utan att någon klickar, om personen uppfyller en uppsättning villkor. Lägg till en route, välj målsteget och definiera ett eller flera **villkor** (till exempel en persons campus, ålder eller medlemsstatus). Textfält kan matchas exakt eller med **innehåller**, **börjar med** eller **slutar med**. En route utan villkor matchar alla.

Datumvillkor (Dagens datum, Födelsedatum eller Årsdag) kan jämföra hela datumet eller bara en del av det -- veckodagen, **Dag i månaden**, **Månad** eller förflutna år. För en persons Födelsedatum eller Årsdag erbjuder **Dag i månaden** ett relativt alternativ **Idag**, så att ett villkor som *Födelsedatum · Dag i månaden = Idag* matchar personer vars födelsedag infaller på dagens dag i månaden. **Månad** erbjuder **Föregående månad**, **Innevarande månad** och **Nästa månad**. Relativa värden som dessa beräknas utifrån din kyrkas tidszon, så de stämmer med din kyrkas kalenderdag i stället för serverns.

Villkorsgruppen **Givande** har **Tidigare regelbunden givare**, som hittar personer som tidigare gav regelbundet och sedan slutade. Ange tre tal: *Gav under minst* **3** *av de senaste* **12** *veckorna, sedan inget under de senaste* **3** *veckorna* (det är standardvärdena). Veckorna räknas bakåt från idag i din kyrkas tidszon, och en återbetald gåva räknas inte. Det är mest användbart med en [schemalagd utlösare](#schedule-triggers) -- till exempel en veckovis regel som lägger till tidigare givare i en uppföljning inom själavård. Villkoret tittar bara på gåvodatum, aldrig belopp, och kort och aviseringar visar aldrig belopp. Eftersom det avslöjar vilka som slutat ge ser bara personer som kan visa donationer alternativet och kan lägga till, ändra eller ta bort det.

Om ett routevillkor av någon anledning inte kan kontrolleras behandlas routen som att den inte matchar. Kortet stannar kvar på steget (eller följer en annan route som matchar) i stället för att fastna.

:::info
På tavlan visar varje stegkolumn små annotationer som beskriver dess routing -- till exempel en utfallsetikett eller "om den matchar" följt av en pil till målsteget eller arbetsflödet.
:::

## Helt automatiserade steg

Du kan låta ett steg köra helt av sig självt, utan att någon arbetar med det. Ge steget dess **automatiska åtgärder** och lägg till en **automatisk route** (utan villkor) som pekar på nästa steg. När ett kort kommer in körs åtgärderna, och sedan för routen det vidare omedelbart -- kortet går rakt igenom.

:::tip
Kombinera detta med **Vänta**: *Skicka välkomstmejl → Vänta 3 dagar → gå automatiskt vidare till steget "Personligt samtal".* E-posten och tidpunkten sköts åt dig, och en volontär ser kortet först när det är dags för den mänskliga kontakten.
:::

## Utlösare

Utlösare lägger till personer i ett arbetsflöde automatiskt när något händer, så att du aldrig behöver lägga till kort för hand. På en arbetsflödestavla klickar du på fliken **Utlösare** och sedan på **Lägg till utlösare**. Det finns två typer:

### Händelseutlösare

Aktiveras så snart en post ändras i B1. Välj händelsen och lägg eventuellt till **villkor** så att endast matchande personer läggs till:

- **Person · Skapad / Uppdaterad** -- t.ex. lägg till alla vars status blir *Besökare* eller *Gäst* (statusen för personer som registrerat sig själva).
- **Donation · Skapad** -- t.ex. lägg till en första gåva eller en stor gåva i ett tackarbetsflöde (matcha på belopp, fond eller metod).
- **Grupp · Medlem gick med** / **Grupp · Skapad**.
- **Formulär · Inskickat** -- lägg till alla som skickar in ett valt formulär (perfekt för ett kort "Jag är ny" eller "Kontakta oss").

### Schemalagda utlösare

Körs återkommande -- dagligen, veckovis, månadsvis eller årligen -- mot en uppsättning villkor. Använd dem för tidsbaserad kontakt, till exempel *alla vars födelsedag är idag* (Födelsedatum · Dag i månaden = **Idag**, med månaden matchad mot **Innevarande månad**) eller en *månatlig* avstämning. Även utan **Endast en gång per person** lägger en schemalagd utlösare inte till samma person igen inom en upprepningsperiod (en dag, vecka, månad eller år, beroende på hur ofta den körs).

För alla utlösare kan du dessutom ställa in:

- **Startsteg** som det nya kortet hamnar på (standard är första steget).
- **Endast en gång per person** -- så att samma person inte läggs till i arbetsflödet två gånger av utlösaren. Med detta aktiverat hoppas alla som redan har ett kort i detta arbetsflöde över.
  - **Lägg till igen efter att kortet stängts** -- visas när **Endast en gång per person** är aktiverat. Markera det för att låta utlösaren lägga till någon igen när deras tidigare kort i detta arbetsflöde har stängts. En person får fortfarande aldrig två öppna kort i arbetsflödet samtidigt. Använd detta för saker som kan hända fler än en gång, till exempel en återkommande gäst eller en årlig process.
- **Aktiv** -- slå på eller av utlösaren utan att ta bort den.

:::tip
Kombinera en utlösare **Formulär · Inskickat** med mallen **Uppföljning av nya besökare** för att göra ditt kort "Kontakta oss" eller "Jag är ny" till en automatisk uppföljningsprocess.
:::

## Bekräftelser av tjänsteuppdrag

En speciell typ av arbetsflöde kan följa upp [tjänsteförfrågningar](./plans.md#assigning-team-members) tills varje volontär accepterar eller avböjer. I stället för personer spårar varje kort på denna tavla **ett uppdrag** -- en person på en position i en plan. Två roller eller två gudstjänster för samma person får separata kort. Detta är frivilligt: ingenting ändras för en plan förrän du väljer ett bekräftelsearbetsflöde i dess inställningar.

### Så här konfigurerar du ett

1. Klicka på **Lägg till arbetsflöde** på sidan Arbetsflöden och välj mallen **Bekräftelse av tjänsteuppdrag**. (Eller börja med ett **Tomt arbetsflöde** och ställ in dess **Syfte** på **Bekräftelse av tjänsteuppdrag**.) Att skapa från mallen kräver behörighet att skicka sms, eftersom den innehåller ett sms-steg.
2. Granska stegen. Mallen börjar med:
   - **Begär och vänta på svar** -- skickar tjänsteförfrågan via e-post och sms, väntar 2 dagar, skickar ett påminnelsemejl, väntar 1 dag till och flyttar sedan kortet vidare automatiskt.
   - **Ring volontären om obesvarad förfrågan** -- ett steg för en person att ringa volontären, med förfallodatum om 1 dag. Ange en **Standardansvarig** på detta steg. Om det saknar en, går kortet till ministeriets ledare, eller till ministerieteamet om det inte finns någon ledare.
3. Redigera väntetider, meddelanden och steg så att de passar din kyrka.
4. Öppna [planens inställningar](./plans.md#plan-settings) och välj detta arbetsflöde under **Bekräftelsearbetsflöde**.

Dessa arbetsflöden använder åtgärden **Skicka tjänsteförfrågan** i stället för **Skicka e-post** och **Skicka sms**. Välj **E-post** eller **Sms** och skriv eventuellt ett **Förfrågningsmeddelande**. Förfrågan innehåller alltid rollen, planen, tjänstedatumet och en länk för att svara; du kan använda `{{planName}}`, `{{positionName}}` och `{{serviceDate}}` i ditt meddelande. Lämna meddelandet tomt för att använda standardförfrågan. Volontärernas aviseringsinställningar, sms-samtycke, din sms-leverantör och din kyrkas e-postgodkännande gäller alla, och varje överhoppat eller blockerat försök registreras på kortet. **Skicka e-post**, **Skicka sms** och **Lägg till i arbetsflöde** är inte tillgängliga på dessa tavlor.

Fliken **Utlösare** på ett bekräftelsearbetsflöde förklarar hur kort startas i stället för att erbjuda utlösare, och dessa arbetsflöden visas inte i listorna för **Lägg till i arbetsflöde** för personer.

### Hur kort startas och stängs

- Kort startar när du **Meddelar** volontärer på en publicerad plan (se [Meddela volontärer](./plan-validation.md#notifying-volunteers)). Varje ny, obesvarad tilldelning får ett kort. Att spara, publicera, kopiera eller automatiskt fylla i en plan kontaktar inte någon på egen hand, och planer som är preliminärt schemalagda skickar ingenting.
- Volontärer får fortfarande det vanliga aviseringen i appen. E-post- och sms-uppföljning kommer från arbetsflödet.
- När volontären **accepterar eller avböjer** stängs deras kort automatiskt, tillsammans med eventuella uppföljningsuppgifter som är kopplade till det.
- Kortlådan visar positionen, tjänstedatumet och en länk till planen. I stället för **Slutför** står knappen **Registrera uppföljning gjord**. Ett klick på den registrerar att någon har följt upp, men kortet förblir öppet och tilldelat (visas som **Väntar på svar**) tills volontären svarar eller svarsfristen passerar.
- Svarsfristen är slutet på den sista gudstjänsttiden som positionens team tjänstgör vid. Om planen inte har några matchande tider är det slutet på tjänstedagen. Om ingen har svarat då stängs kortet med **Svarsfristen har passerat** och en uppgift **Granska obesvarad tjänsteförfrågan** skickas till kortets nuvarande ägare eller ministeriets ledare så att någon kan besluta hur platsen ska täckas. Tilldelningen förblir **Obekräftad**.
- Att ta bort tilldelningen, ändra dess person, position eller plandatum, återställa planen till preliminärt schemalagd, eller byta planen till ett annat bekräftelsearbetsflöde stänger kortet. Ett stängt kort öppnas aldrig igen av en ny **Meddela**; lägg till en ny tilldelning för att skicka en ny förfrågan.

:::info
För förfrågningar som skickats via ett bekräftelsearbetsflöde går [volontärpåminnelser](./plans.md#volunteer-reminders) endast till volontärer som har **accepterat**, så att personer som väntar på att svara inte får påminnelser utöver arbetsflödets uppföljningar.
:::

## Mina kort

Volontärer och medarbetare behöver inte leta igenom varje tavla för att hitta sitt arbete. Listan **Mina kort** på sidan **Mitt arbete** visar alla kort som är tilldelade den aktuella användaren i alla arbetsflöden. För att komma dit klickar du på **Mina kort** överst på sidan Arbetsflöden, eller öppnar **Tjänst > Mitt arbete** i Hoppmenyn. Om du klickar på ett kort öppnas dess detaljpanel direkt på sidan Mitt arbete, där du kan arbeta med kortet eller ta bort det utan att lämna sidan. Om du kan visa arbetsflöden har panelen också en länk **Öppna arbetsflödestavla** till tavlan som kortet tillhör.

## Rapporter

Öppna ett arbetsflöde och klicka på **Rapporter** för att se analys för det arbetsflödet:

- **Försenade** -- antalet kort som passerat sitt förfallodatum.
- **Kort per steg** -- hur många kort som för närvarande finns på varje steg, visat som ett kolumndiagram.
- **Slutförda (30 dagar)** -- genomströmning under de senaste 30 dagarna, visat som ett linjediagram.

Använd dessa för att upptäcka flaskhalsar -- till exempel ett steg där kort hopar sig och aldrig går vidare.

## Relaterade artiklar

- [Uppgifter](./tasks.md) -- de enskilda åtgärdspunkterna som arbetsflödeskort bygger på
- [Formulär](../forms/index.md) -- skapa de formulär som kan utlösa arbetsflöden
- [Grupper](../groups/index.md) -- de grupper som åtgärden "Lägg till i grupp" kan placera personer i
- [Tjänsteplaner](./plans.md) -- välj ett bekräftelsearbetsflöde för en plans tjänsteförfrågningar
- [Roller och behörigheter](../settings/roles-permissions.md) -- styr vem som kan visa, redigera och hantera arbetsflöden
