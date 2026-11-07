---
title: "B1 Admin – översikt"
---

# B1 Admin – översikt

<div class="article-intro">

B1 Admin är din instrumentpanel för församlingshantering. Här finns verktyg för att sköta alla delar av din församlings verksamhet, från medlemsregister och gåvor till webbplatsbygge och livesändningar, allt på ett ställe.

</div>

## Komma igång

1. Öppna webbläsaren och gå till [admin.b1.church](https://admin.b1.church)
2. Logga in med ditt användarnamn och lösenord
3. Du hamnar på **Dashboard**, din startsida. Där ser du veckans gudstjänstordning, vilka som checkat in och tjänstgör i realtid, sådant som kräver din uppmärksamhet (som väntande godkännanden eller medlemsansökningar), dina öppna uppgifter och dina grupper

:::tip
Ny i B1 Admin? Börja med [Introduktionen](./introduction) för en videogenomgång och besök sedan [Inställningar](./settings/) för att konfigurera dina församlingsuppgifter och bjuda in ditt team.
:::

## Din Dashboard

Dashboard är startsidan i B1 Admin (`/`). Den är uppbyggd kring församlingens veckogudstjänst:

- **Veckans gudstjänst** -- namnet på den nuvarande eller kommande planen och gudstjänstordningen, med en länk till hela planen
- **Livestatus** -- när folk börjar checka in på söndagen visar sidan hur många som är i salen, vilka som tjänstgör just nu, förstagångsbesökare och en översikt per rum med kapacitetsindikatorer
- **Needs Attention** -- väntande godkännanden och ansökningar om gruppmedlemskap som kräver åtgärd
- **My tasks** och **My Groups** -- dina öppna uppgifter (lägg till en med **Add Task** eller klicka på **All tasks** för hela listan) och de grupper du tillhör

Vad Dashboard visar beror på din [roll](./settings/roles-permissions.md). Till exempel visas länken till hela planen bara om du kan öppna den planen (du redigerar planer, tillhör planens tjänst eller tjänstgör på den), och länken **All groups** visas bara om du kan hantera grupper, se gruppmedlemmar eller se personer.

:::tip
Alla avsnitt, inklusive Sermons, Calendars, Mobile och Settings, finns i [snabbmenyn](./introduction.md#getting-around-with-the-jump-menu) längst upp till vänster i B1 Admin. Klicka på den eller tryck på **Ctrl+K** (eller **Cmd+K**), och bläddra eller börja skriva.
:::

## Viktiga funktioner

- **[People](./people/)** - Hantera församlingens register, lägg till medlemmar, redigera data i grupp och bläddra efter hushåll eller i en sorterbar tabell. Varje person öppnas på en enda postsida med personuppgifterna till vänster och sammanfattningar av närvaro, gåvor, grupper, anteckningar och formulär bredvid. Hitta nyligen tillagda personer med sökfunktionen **Date Added**. Sidan [Notes](./people/notes) visar de senaste anteckningarna för personer, grupper, händelser och arbetsflödeskort
- **[Groups](./groups/)** - Skapa och organisera församlingens grupper med ansökningar om medlemskap, medlemshantering, gruppmejl, personliga gruppmeddelanden med återanvändbara mallar och en platshållare för Group Name, samt utskrivbara kontaktlistor. Varje grupp öppnas på en sida med åtgärderna till vänster och sammanfattningar av medlemmar, sessioner, kalender och hälsa bredvid
- **[Attendance](./attendance/)** - Ställ in campus och gudstjänsttider, följ namngiven närvaro med utskrivbara klasslistor, se vilka klasser som ännu inte har registrerad närvaro, registrera enkla räknade besökare med trendrapporter, ge varje gudstjänsttid ett incheckningsschema så att självincheckningen öppnar och stängs automatiskt i respektive campus tidszon, och låt förstagångsbesökare anmäla sig via en [QR-kod](./attendance/check-in#guest-registration-via-qr-code) med de fält du väljer
- **[Donations](./donations/)** - Registrera gåvor i flera valutor, hantera fonder, logga en enskild gåva från en persons post, skriv ut batcher (en i taget eller alla batcher inom ett datumintervall) på församlingens brevpapper med delsummor per fond, stäng batcher när de har räknats, importera en batch från en CSV-fil, låt räkneteam registrera gåvor med behörigheten **Enter Donations** och skapa kontoutdrag som skrivs ut med församlingens logotyp
- **[Serving](./serving/)** - Samordna volontärer, skapa gudstjänstplaner (eller kopiera en plan framåt varje vecka i upp till 12 veckor), skicka påminnelser via push, mejl eller sms, skicka sms till alla schemalagda med **Text Volunteers**, hantera uppgifter och låt personer gå igenom steg-för-steg-arbetsflöden som kan skicka mejl och sms, meddela en medarbetare, registrera närvaro och följa upp om volontärer bekräftat sina tjänstgöringar. Schemalagda arbetsflödesregler kan hitta regelbundna givare som slutat ge, och utskrivna planer utelämnar tomma kolumner
- **[Forms](./forms/)** - Bygg anpassade formulär för anmälningar och datainsamling, lägg till en rubrikbild, dela fristående formulär med en QR-kod och koppla ett formulär till en grupp så att gruppledare kan läsa och skriva ut svaren
- **[Reports](./reports/)** - Visa rapporter om födelsedagar, närvaro och gåvor
- **[Website](./website/)** - Bygg och hantera din församlings webbplats med anpassade navigeringsstilar, följ besök på din webbplats och i din B1-app med ditt GA4-ID, eller stäng av den publika webbplatsen och behåll endast medlemsportalen
- **[Sermons](./sermons/)** - Hantera ditt predikningsbibliotek, livesändningar och ett automatiskt podcastflöde
- **[Calendars](./calendars/)** - Skapa kuraterade kalendrar, hantera bokningar av rum och resurser och se tillgänglighet. Ta emot [evenemangsanmälningar](./calendars/paid-registrations) med prissatta deltagartyper, lägg till deltagare manuellt utan att debitera dem och låt personer anmäla sig och betala senare om din församling inte har online-gåvor
- **[Settings](./settings/)** - Konfigurera allt på en enda rullbar sida med en snabblista: församlingsinformation, region, format för datum och telefonnummer, sms (inklusive ditt eget Twilio-konto), roller med antal medlemmar, behörigheter och anpassade personfält

:::info
Klicka på frågetecknet i det övre högra hörnet på valfri sida för snabb åtkomst till hjälp och dokumentation. Om du vill ändra färgtemat (**Default**, **Classic** eller **Custom**) eller växla mellan ljust och mörkt läge öppnar du din användarmeny och använder **Theme Preferences**. För att skydda ditt konto med en kod från en autentiseringsapp slår du på [tvåfaktorsinloggning](./profile/managing-profile#two-factor-sign-in) på din profil.
:::

För support, mejla [support@churchapps.org](mailto:support@churchapps.org).
