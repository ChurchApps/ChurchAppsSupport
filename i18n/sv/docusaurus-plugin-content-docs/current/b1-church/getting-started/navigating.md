---
title: "Navigera i B1App"
description: "Hitta rätt i B1.church medlemsportal på telefon eller dator: startsidan Hem, den nedre flikraden, sidan Mer och sidan Jag."
---

# Navigera i B1App

<div class="article-intro">

Medlemsportalen i B1.church är en webbapp för telefon som finns under `/mobile`. Den fungerar i alla webbläsare och kan installeras på hemskärmen. Den här sidan förklarar startsidan Hem, den nedre flikraden, sidan Mer och sidan Jag.

</div>

## Introduktionsvideo

<YouTube id="8XKRZvvAbXg" title="En rundtur i B1.church medlemsapp" next="En rundtur i B1 Check-In" nextUrl="/docs/b1-checkin" />

<div class="prereqs">
<h4>Innan du börjar</h4>

- Du behöver vara [inloggad](./logging-in.md) för att se dina personliga uppgifter. Besökare som inte är inloggade kan fortfarande läsa publikt innehåll och får en knapp för **Logga in** där en funktion kräver ett konto.

</div>

## Hem {#home}

Om du öppnar `https://dittkyrkonamn.b1.church/mobile` kommer du till startsidan **Hem** på `/mobile/dashboard`. Hem är portalens startsida. Den börjar med en hälsning ("God morgon", "God eftermiddag" eller "God kväll" följt av ditt förnamn) och dagens datum. Därefter visas avsnitt som bara syns när de är relevanta:

- **Fototaggar** -- flikar som din kyrka har försett med en bild (inklusive Dagens vers) visas som fototaggar under kyrkans namn. Beroende på kyrkans val visas de i ett rutnät med två kolumner, en rad som du sveper i sidled (som också kan röra sig av sig själv), eller en lista med en liten miniatyrbild bredvid varje namn. Se [Startskärmens taggar](../../b1-admin/settings/mobile-app.md#home-screen-tiles). När raden med sidled innehåller fler taggar än vad som ryms på skärmen visar en rad med prickar under den var du befinner dig. Tryck på en prick för att hoppa till den taggen. Raden fortsätter framåt och börjar om från första taggen efter den sista. Alla fliker med bild visas här, även en flik som också har en plats i flikraden.
- **Senaste predikan** -- kyrkans nyaste predikan, med en länk **Alla predikningar**
- **Dagens vers** -- dagens vers. Tryck på den för att öppna hela sidan [Dagens vers](../content/verse-of-the-day.md)
- **Du tjänstgör** -- dina nästa kommande tjänstgöringsuppdrag, med en länk **Alla planer**. Om något uppdrag fortfarande väntar på ditt svar visas de först med en etikett **Behöver svar** samt knapparna **Acceptera** och **Avböj**, så att du kan svara direkt från Hem (**Avböj** frågar först om du är säker). Annars visar dina nästa uppdrag en etikett **Accepterad** eller **Bekräftad**. Tryck på ett uppdrag för att öppna dess plan.
- **Dina grupper** -- upp till tre av dina grupper med mötestid och plats, och en länk **Alla grupper**
- **Kommande evenemang** -- när du är inloggad visas dina tre nästa gruppevenemang och evenemangsanmälningar tillsammans, i datumordning, var och en med datum och tid (och en miniatyrbild om evenemanget har en bild). Varje rad har en etikett **Evenemang** (ett evenemang från en grupp du tillhör) eller **Anmälan** (ett evenemang du [har anmält dig till](../events/registering.md)). Ett evenemang du är anmäld till visas bara en gång, som en anmälan. Tryck på ett evenemang för att öppna dess grupps evenemang, eller på en anmälan för att öppna dina [anmälningar](../events/my-registrations.md). Tryck på **Alla kommande evenemang** för att öppna hela listan över kommande på din [sida Jag](./me-page.md#upcoming), som också innehåller dina tjänstgöringsuppdrag och anmälningar.
- **Mina närvaro** och **Mina formulär** -- om din kyrka slår på dem visas hur många gånger du har närvarat de senaste 90 dagarna med dina två senaste besök, och dina två senaste formulärinskickningar, med länkar till hela listorna. Dessa visas alltid på din [sida Jag](./me-page.md) oavsett inställning. Se [Avsnitt på startskärmen](../../b1-admin/settings/mobile-app.md#home-screen-sections).
- **Givande** -- hur mycket du har gett i år (under "Given i" det aktuella året), en knapp **Ge** (visas endast om din kyrka erbjuder onlinegivande) och en länk **Historik** till din [gåvohistorik](../giving/donation-history.md). Döljs om din kyrka har begränsat medlemmarnas givandehistorik till ett tidigare år eller dolt den. I så fall visas kyrkans verktyg för givande i stället som en knapp under **Mer från**.
- **Mer från** *din kyrka* -- knappar för övriga verktyg som din kyrka har slagit på och som inte redan finns i flikraden eller visas ovan. De du använder mest flyttas först.

Avsnitten för tjänstgöring, grupper, närvaro, formulär och givande visas bara när du är inloggad, din kyrka har slagit på verktyget och du har något att visa, till exempel ett kommande uppdrag eller minst en grupp. På dator är Hem uppdelat i två kolumner.

Om du inte är inloggad visar Hem en rubrik **Välkommen** i stället för hälsningen, med en kort uppmaning ("Logga in för att se dina grupper, givande och mer.") och en knapp **Logga in**. Uppmaningen visas även när din kyrka ännu inte har ställt in något annat för Hem. Din kyrka kan ändra texten i uppmaningen eller dölja den. Se [Inställningar för mobilappen](../../b1-admin/settings/mobile-app.md#home-screen-sign-in-prompt). När den är dold kan du fortfarande logga in från sidan **Mer** eller sidan **Jag**.

## Den nedre flikraden

På telefon är en flikrad fast placerad längst ned på skärmen:

- **Hem** -- alltid första fliken
- Upp till tre av de flikar som din kyrka har konfigurerat
- **Mer** -- öppnar sidan Mer

Inbyggda skärmar (till exempel Grupper, Givande eller Planer) får flikplatserna först. Eventuella lediga platser går till kyrkans egna anpassade sidor. Endast länkar till externa webbplatser och Dagens vers får aldrig en flik. Om din kyrka har konfigurerat fler flikar än det finns plats för försvinner de inte: de visas på sidan **Mer** och i avsnittet **Mer från** på Hem. Kyrkans administratörer ställer in flikordningen i B1 Admin under **Mobil → Navigering**.

### Mappflikar {#folder-tabs}

Din kyrka kan gruppera flera flikar i en **mapp**. En mapp visas som vilken annan flik som helst, i flikraden, på sidan **Mer** eller som en fototagg på Hem. Om du trycker på den öppnas en skärm med mappens namn som listar flikarna i mappen. Om alla flikar i mappen har en bild visas de som fototaggar. Annars visas de som en lista. Länkar till externa webbplatser i en mapp öppnas i en ny webbläsarflik. Flikar i en mapp visas endast på mappens skärm, inte i flikraden eller på sidan **Mer**. En mapp utan något synligt innehåll för dig döljs.

## På dator

På en bredare skärm, till exempel en dator eller en stor surfplatta, ersätts den nedre flikraden av en rubrikrad över skärmen i din kyrkas färg. Den visar kyrkans logotyp, eller dess namn om ingen logotyp är vald (klicka på den för att gå tillbaka till Hem), **Hem**, upp till fem av de flikar som din kyrka har konfigurerat, och **Mer**, med aviseringsikonen och din profilbild till höger. När du öppnar en detaljskärm visas en länk **Tillbaka** ovanför sidinnehållet.

## Sidan Mer

När du trycker på **Mer** öppnas sidan Mer på `/mobile/more`. Den innehåller:

- Ditt namn och din bild, med en länk **Redigera profil** -- se [Redigera din profil](./editing-your-profile.md)
- Alla flikar som din kyrka har konfigurerat, i ordning, under kyrkans namn. Länkar till externa webbplatser öppnas i en ny webbläsarflik.
- Ett avsnitt **Konto** med:
  - **Mig** -- din personliga sida (endast när du är inloggad)
  - **Utseende** -- växla mellan **Ljust läge** och **Mörkt läge**
  - **Adminportal** -- visas endast om du har administratörsbehörighet i din kyrka. Den öppnar B1 Admin i en ny flik.
  - **Installera appen** -- öppnar [installationsanvisningarna](./installing-pwa.md) på `/mobile/install` (döljs när appen är installerad)
- **Logga ut**, eller en knapp **Logga in** om du inte är inloggad
- Din kyrkas namn och en länk till integritetspolicyn

## Rubrikraden

På telefon visar raden överst på varje skärm:

- Din kyrkas logotyp (eller namnet, om kyrkan inte har laddat upp någon logotyp) på Hem och de andra huvudskärmarna, eller en tillbakapil när du har gått in i en detaljskärm. Skärmens titel visas överst på själva sidan.
- En **klocka**-ikon för aviseringar och meddelanden, med en markering för olästa objekt -- se [Aviseringar och meddelanden](#notifications-and-messages) nedan
- Din **profilbild**, som öppnar din profil på `/mobile/profileEdit` -- se [Redigera din profil](./editing-your-profile.md)

Klockan och profilbilden visas bara när du är inloggad.

## Aviseringar och meddelanden

När du trycker på klockan öppnas en panel med två avsnitt:

- **Meddelanden** -- dina senaste privata samtal, med en länk **Nytt meddelande** för att starta ett nytt
- **Aviseringar** -- dina senaste aviseringar, med en markering **Ny** på olästa. Tryck på en avisering för att gå till den grupp, plan eller konversation den kommer från.

Varje avsnitt visar hur många olästa objekt det har. Tryck på **Visa alla** längst ned för att öppna hela inkorgen på `/mobile/notifications`.

## Sidor med avsnitt

Detaljsidor -- en grupp, en plan, din sida Jag, skärmarna Planer och Givande -- är uppbyggda som en sida med avsnitt i stället för flikar. Varje avsnitt visar en kort förhandsvisning, och en länk i avsnittets rubrik (till exempel **Alla medlemmar**, **Alla evenemang** eller **Fullständig gudstjänstordning**) öppnar hela listan. En länk **Tillbaka till** överst i vyn tar dig tillbaka till sidan du kom ifrån.

## Sidan Jag

**Jag** (`/mobile/me`) är din personliga startpunkt. Den visar ditt namn och din bild med knapparna **Redigera profil** och **Inställningar** ([aviseringsinställningar](./notification-preferences.md)). Därefter visas vad som är på väg för dig: tjänstgöringsuppdrag, evenemangsanmälningar och gruppevenemang. Sedan följer ditt hushåll, dina grupper, din [givmildhet](../giving/index.md) i år, de formulär du har skickat in, din närvarohistorik, dina [anmälningar](../events/my-registrations.md) samt dina senaste aviseringar och meddelanden. Se [Sidan Jag](./me-page.md) för mer information.

Om du inte är inloggad visar sidan Jag i stället en knapp **Logga in**.

## Installera på hemskärmen

Medlemsportalen är en progressiv webbapp (PWA). Besök `/mobile/install` (eller välj **Installera appen** på sidan Mer) för steg-för-steg-anvisningar för din enhet. När appen är installerad öppnas den i helskärm från hemskärmen utan webbläsarens gränssnitt. Se [Installera som app (PWA)](./installing-pwa.md).

## Din kyrkas publika webbplats

Utanför medlemsportalen har din kyrkas publika webbplats en egen navigering i sidhuvudet, med länkar som dina administratörer har ställt in -- sidor som [predikningar](../content/sermons.md), [Bibeln](../content/bible.md), [livesändningar](../content/live-streaming.md) och en publik gruppförteckning. På telefon finns dessa länkar bakom hamburgerikonen längst upp till höger i sidhuvudet.

:::info
Flikarna och verktygen du ser varierar mellan kyrkor. Administratörerna styr vilka avsnitt som är synliga för medlemmar via B1 Admin. Om du inte ser en funktion som beskrivs här kan det vara så att din kyrka inte har slagit på den.
:::
