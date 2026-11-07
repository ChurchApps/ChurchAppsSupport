---
title: "Navigera i B1App"
---

# Navigera i B1App

<div class="article-intro">

Medlemsportalen i B1.church är en webbapp för telefon som finns under `/mobile`. Den fungerar i alla webbläsare och kan installeras på startskärmen. Den här sidan förklarar startpanelen, den nedre flikraden, sidan Mer och sidan Jag.

</div>

## Videoguide

<YouTube id="8XKRZvvAbXg" title="En rundtur i B1.church-medlemsappen" next="En rundtur i B1 Check-In" nextUrl="/docs/b1-checkin" />

<div class="prereqs">
<h4>Innan du börjar</h4>

- Du behöver vara [inloggad](./logging-in.md) för att se din personliga information. Besökare som inte är inloggade kan fortfarande bläddra bland offentligt innehåll, och där en funktion kräver ett konto visas en knapp för **Logga in**.

</div>

## Start {#home}

Om du öppnar `https://yourchurchname.b1.church/mobile` kommer du till panelen **Start** på `/mobile/dashboard`. Start är medlemsportalens startsida. Den börjar med en hälsning ("God morgon", "God eftermiddag" eller "God kväll", följt av ditt förnamn) och dagens datum. Därefter kommer avsnitt som bara visas när de är relevanta:

- **Bildrutor** -- flikar som din kyrka har försett med en bild (inklusive Dagens vers) visas som bildrutor under kyrkans namn. Beroende på kyrkans val visas de i ett rutnät med två kolumner, en rad du sveper i sidled (som också kan röra sig av sig själv) eller en lista med en liten miniatyrbild bredvid varje namn. Se [Rutor på startskärmen](../../b1-admin/settings/mobile-app.md#home-screen-tiles). Varje bildflik visas här, även en som också har en plats i flikraden.
- **Senaste predikan** -- kyrkans senaste predikan, med en länk **Alla predikningar**
- **Dagens vers** -- dagens vers. Tryck på den för att öppna hela sidan [Dagens vers](../content/verse-of-the-day.md).
- **Du tjänstgör** -- dina nästa kommande tjänstgöringsuppdrag, med en länk **Alla planer**. Om något uppdrag fortfarande väntar på ditt svar visas de först, med en märkning **Behöver svar** och knapparna **Acceptera** och **Avböj**, så att du kan svara direkt från startsidan. (**Avböj** ber dig bekräfta först.) Annars visar dina nästa uppdrag märkningen **Accepterad** eller **Bekräftad**. Tryck på ett uppdrag för att öppna dess plan.
- **Dina grupper** -- upp till tre av dina grupper med mötestid och plats, samt en länk **Alla grupper**
- **Kommande händelser** -- när du är inloggad visas de tre nästa kommande händelserna från de grupper du tillhör, var och en med datum och tid (och en miniatyrbild om händelsen har en bild). Tryck på en händelse för att öppna händelserna för dess grupp. Tryck på **Alla kommande händelser** för att öppna den fullständiga listan på din [sida Jag](./me-page.md#upcoming), som också innehåller dina tjänstgöringsuppdrag och anmälningar.
- **Min närvaro** och **Mina formulär** -- om din kyrka aktiverar dem visas hur många gånger du har varit närvarande de senaste 90 dagarna, med dina två senaste besök, och dina två senaste formulärinskickningar, med länkar till hela listorna. Dessa visas alltid på din [sida Jag](./me-page.md) oavsett. Se [Avsnitt på startskärmen](../../b1-admin/settings/mobile-app.md#home-screen-sections).
- **Givande** -- hur mycket du har gett i år (”Given under” innevarande år), en knapp **Ge** (visas bara när din kyrka erbjuder onlinegivande) och en länk **Historik** till din [givarhistorik](../giving/donation-history.md). Avsnittet är dolt om din kyrka har begränsat medlemmarnas givarhistorik till ett tidigare år eller dolt den. I så fall visas kyrkans verktyg för givande i stället som en knapp under **Mer från**.
- **Mer från** *din kyrka* -- knappar för de övriga verktyg din kyrka har aktiverat och som inte redan finns i flikraden eller visas ovan. De du använder mest flyttas först.

Avsnitten för tjänstgöring, grupper, närvaro, formulär och givande visas bara när du är inloggad, din kyrka har aktiverat verktyget och det finns något att visa, till exempel ett kommande uppdrag eller minst en grupp. På en dator är startsidan uppdelad i två kolumner.

Om du inte är inloggad visar startsidan en rubrik **Välkommen** i stället för hälsningen, med en kort uppmaning ("Logga in för att se dina grupper, ditt givande och mer.") och en knapp **Logga in**. Uppmaningen visas även om din kyrka ännu inte har ställt in något annat för startsidan. Din kyrka kan formulera om uppmaningen eller dölja den. Se [Inställningar för mobilappen](../../b1-admin/settings/mobile-app.md#home-screen-sign-in-prompt). När den är dold kan du fortfarande logga in från sidan **Mer** eller sidan **Jag**.

## Den nedre flikraden

På en telefon sitter en flikrad fast längst ned på skärmen:

- **Start** -- alltid första fliken
- Upp till tre av de flikar din kyrka har konfigurerat
- **Mer** -- öppnar sidan Mer

Inbyggda skärmar, som Grupper, Givande eller Planer, får flikplatserna först. Eventuella lediga platser går till kyrkans egna sidor. Endast länkar till externa webbplatser och Dagens vers får aldrig en egen flik. Om din kyrka har konfigurerat fler flikar än det ryms går de inte förlorade. De visas i stället på sidan **Mer** och i avsnittet **Mer från** på startsidan. Kyrkoadministratörer anger flikordningen i B1 Admin under **Mobil → Navigering**.

## På en dator

På en större skärm, till exempel en dator eller en stor surfplatta, ersätts den nedre flikraden av en rubrikrad överst på skärmen i din kyrkas färg. Rubrikraden visar din kyrkas logotyp, eller dess namn om ingen logotyp är angiven (klicka på det för att gå tillbaka till Start), **Start**, upp till fem av de flikar din kyrka har konfigurerat, och **Mer**. Till höger visas klockan och din profilbild. När du öppnar en detaljskärm visas en länk **Tillbaka** ovanför sidinnehållet.

## Sidan Mer

Om du trycker på **Mer** öppnas sidan Mer på `/mobile/more`. Den innehåller:

- Ditt namn och foto, med en länk **Redigera profil**. Se [Redigera din profil](./editing-your-profile.md).
- Alla flikar din kyrka har konfigurerat, i ordning, under din kyrkas namn. Länkar till externa webbplatser öppnas i en ny webbläsarflik.
- Avsnittet **Konto** med:
  - **Jag** -- din personliga sida (endast när du är inloggad)
  - **Utseende** -- växla mellan **Ljust läge** och **Mörkt läge**
  - **Administratörsportal** -- visas bara om du har administratörsbehörighet i din kyrka. Den öppnar B1 Admin i en ny flik.
  - **Installera appen** -- öppnar [installationsanvisningarna](./installing-pwa.md) på `/mobile/install` (dold när appen är installerad)
- **Logga ut**, eller knappen **Logga in** om du inte är inloggad
- Din kyrkas namn och en länk till integritetspolicyn

## Appens övre fält

På en telefon visar fältet överst på varje skärm:

- Din kyrkas logotyp (eller kyrkans namn, om ingen logotyp har laddats upp) på Start och övriga huvudskärmar, eller en tillbakapil när du har gått in på en detaljskärm. Skärmens titel visas överst på själva sidan.
- En **klocka** för aviseringar och meddelanden, med en märkning för olästa objekt. Se [Aviseringar och meddelanden](#notifications-and-messages) nedan.
- Din **profilbild**, som öppnar din profil på `/mobile/profileEdit`. Se [Redigera din profil](./editing-your-profile.md).

Klockan och profilbilden visas bara när du är inloggad.

## Aviseringar och meddelanden

Om du trycker på klockan öppnas en panel med två avsnitt:

- **Meddelanden** -- dina senaste privata konversationer, med en länk **Nytt meddelande** för att starta en ny
- **Aviseringar** -- dina senaste aviseringar, med märkningen **Ny** på olästa. Tryck på en avisering för att gå till gruppen, planen eller konversationen den kommer från.

Varje avsnitt visar hur många olästa objekt det har. Tryck på **Visa alla** längst ned för att öppna hela inkorgen på `/mobile/notifications`.

## Sidor med avsnitt

Detaljsidor, som en grupp, en plan, din sida Jag eller skärmarna Planer och Givande, är uppbyggda som en sida med avsnitt i stället för flikar. Varje avsnitt visar en kort förhandsvisning. En länk i avsnittets rubrik, till exempel **Alla medlemmar**, **Alla händelser** eller **Hela gudstjänstordningen**, öppnar hela listan. En länk **Tillbaka till** överst i vyn tar dig tillbaka till sidan du kom från.

## Sidan Jag

**Jag** (`/mobile/me`) är din personliga startpunkt. Den visar ditt namn och foto, med knapparna **Redigera profil** och **Inställningar** ([aviseringsinställningar](./notification-preferences.md)). Därefter visas vad som väntar på dig: tjänstgöringsuppdrag, eventanmälningar och gruppevenemang. Sedan följer ditt hushåll, dina grupper, ditt [givande](../giving/) i år, formulären du har skickat in, din närvarohistorik, dina [anmälningar](../events/my-registrations.md) samt dina senaste aviseringar och meddelanden. Se [Sidan Jag](./me-page) för detaljer.

Om du inte är inloggad visar sidan Jag i stället en knapp **Logga in**.

## Installera på startskärmen

Medlemsportalen är en progressiv webbapp (PWA). Öppna `/mobile/install`, eller välj **Installera appen** på sidan Mer, för steg-för-steg-anvisningar för din enhet. När appen är installerad öppnas den i helskärm från startskärmen, utan webbläsarens gränssnitt. Se [Installera som app (PWA)](./installing-pwa.md).

## Din kyrkas publika webbplats

Utanför medlemsportalen har din kyrkas publika webbplats en egen navigering i sidhuvudet, med länkar som dina administratörer har ställt in. Det gäller sidor som [predikningar](../content/sermons.md), [Bibeln](../content/bible.md), [livesändningar](../content/live-streaming.md) och en publik grupplista. På en telefon finns dessa länkar bakom hamburgerikonen längst upp till höger i sidhuvudet.

:::info
Flikarna och verktygen du ser varierar mellan kyrkor. Administratörer styr vilka avsnitt medlemmarna kan se via B1 Admin. Om du inte ser en funktion som beskrivs här kan det vara att din kyrka inte har aktiverat den.
:::
