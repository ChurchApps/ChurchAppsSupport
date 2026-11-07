---
title: "Påminnelser om evenemang"
---

# Påminnelser om evenemang

<div class="article-intro">

Påminnelser om evenemang skickar automatiskt ut meddelanden till rätt personer innan ett evenemang börjar, till exempel "Missa inte! Hälsoworkshopen börjar imorgon kl. 09:00." Du ställer in en påminnelse en gång på evenemanget, och B1 skickar ut den enligt schema via pushnotiser, e-post och, om din kyrka har sms konfigurerat, textmeddelanden. Medlemmar kan själva styra vilka påminnelser de får via sina egna [Aviseringsinställningar](../../b1-church/getting-started/notification-preferences).

</div>

<div class="prereqs">
<h4>Innan du börjar</h4>

- Skapa evenemanget du vill påminna om (se [Skapa kalendrar](creating-calendars))
- För att nå registrerade deltagare, [aktivera registrering](creating-calendars) för evenemanget
- För att nå en hel grupp, se till att evenemanget tillhör en [grupp](../groups/creating-groups) med medlemmar

</div>

## Ställa in en påminnelse

Du ställer in påminnelser i avsnittet **Påminnelser** för evenemanget.

- När du **skapar ett nytt evenemang** expanderar du avsnittet **Påminnelser** i evenemangseditorn innan du sparar.
- För ett **befintligt evenemang** öppnar du evenemangets sida **Registreringsuppgifter** (från avsnittet **Registreringar**) för att lägga till eller ändra påminnelsen.

1. Aktivera **Aktivera påminnelser**.
2. Välj **När** påminnelsen ska skickas. Välj upp till tre tidpunkter: **7 dagar före**, **3 dagar före**, **1 dag före** och **Samma dag**.
3. Ange **Klockslag** när påminnelsen ska skickas (standard är **09:00**, enligt din kyrkas [tidszon](../settings/church-settings.md#time-zone)).
4. Välj **Vem** som ska få påminnelsen (se [Vem får påminnelsen](#who-gets-reminded) nedan).
5. Lägg eventuellt till ett **Meddelande**. Lämna fältet tomt för att använda standardtexten, eller skriv egen text. Du kan använda `{{eventTitle}}`, som ersätts med evenemangets namn.
6. Välj **Kanaler**: **Push**, **E-post** och, om din kyrka har en [sms-leverantör](../settings/church-settings.md#texting) ansluten, **Textmeddelande**.
7. Spara evenemanget.

När du gör ändringar visar en **liveförhandsgranskning** ungefär hur många personer som kommer att få påminnelsen, hur många deltagare som inte kan nås och nästa schemalagda utskickstider. Då kan du kontrollera att påminnelsen ser rätt ut innan du sparar.

## Vem får påminnelsen

Inställningen **Vem** styr vem påminnelsen går till:

- **Endast registrerade** -- Alla som är registrerade för evenemanget och kopplade till en personpost. Detta är standard när registrering är aktiverad för evenemanget, så att en påminnelse för ett litet registrerat evenemang aldrig av misstag skickas till en hel grupp.
- **Endast anmälningsansvariga** -- En påminnelse per registrering (den person som gjorde anmälan), i stället för till varje familjemedlem på registreringen.
- **Gruppmedlemmar** -- Alla i evenemangets grupp. Detta är standard när evenemanget inte använder registrering.
- **Automatisk** -- Använder registrerade när registrering är aktiverad, annars gruppen.

:::info
Gäster som bara har lagts till med namn (utan kopplad personpost) kan inte få någon påminnelse, eftersom det inte finns något konto, någon enhet eller någon e-postadress att skicka till. Förhandsgranskningen visar hur många deltagare som tillhör den här gruppen, så att det inte blir några överraskningar. Medlemmar som har valt bort kommunikation hoppas också över.
:::

## När påminnelser skickas

- Påminnelser skickas vid **den tidpunkt du väljer**, enligt din kyrkas lokala tidszon, för var och en av de förskjutningar du har valt.
- Om du **ändrar evenemangets datum eller tid** schemaläggs väntande påminnelser automatiskt om. Du behöver inte redigera påminnelsen.
- Om du **tar bort evenemanget** (eller avbokar ett enskilt tillfälle i ett återkommande evenemang) avbryts dess väntande påminnelser automatiskt.
- Återkommande evenemang hanteras automatiskt: varje kommande tillfälle får en egen påminnelse.

:::tip
Påminnelser skickas **först som push, med e-post som reserv**. Om en medlem har pushnotiser aktiverade får de en push. Om inte får de ett e-postmeddelande i stället. Medlemmar väljer vilka kanaler de vill ha per typ av avisering i sina [Aviseringsinställningar](../../b1-church/getting-started/notification-preferences).
:::

## Textpåminnelser

Kanalen **Textmeddelande** visas bara när din kyrka har en sms-leverantör ansluten. Textmeddelanden skickas via din kyrkas sms-leverantör, och varje textmeddelande kan kosta din kyrka pengar. De skickas utöver eventuella push- eller e-postpåminnelser, och endast till personer som:

- Har aktiverat **Textmeddelanden** i sina [Aviseringsinställningar](../../b1-church/getting-started/notification-preferences), och
- Har ett mobilnummer i sin profil.

Varje textmeddelande börjar med din kyrkas namn, hålls till ett enda sms och slutar med "Svara STOP för att avregistrera dig." Den som svarar STOP slutar att få textmeddelanden från din kyrka. För att STOP-svar ska nå B1 måste du klistra in **webbadressen för inkommande STOP-webhook** från dina [sms-inställningar](../settings/church-settings.md#texting) i din leverantörs webhook för inkommande meddelanden.

## Vad medlemmar kan styra

Påminnelser respekterar alltid varje medlems [Aviseringsinställningar](../../b1-church/getting-started/notification-preferences). En medlem kan:

- Stänga av **Påminnelser om evenemang** för push, e-post eller textmeddelanden och samtidigt behålla andra aviseringar.
- Slå på eller av textpåminnelser med **Textmeddelanden**.
- Ställa in **tysta timmar** så att icke-brådskande aviseringar väntar till en lämplig tid.

Du kan inte åsidosätta en medlems val att avregistrera sig från påminnelser om evenemang. Detta gör att B1 följer reglerna mot skräppost och att medlemmarna behåller kontrollen över sin inkorg.

## Påminnelser för tjänstgöring

Volontärer som är schemalagda för en plan får en separat **tjänstgöringspåminnelse** med planens detaljer och, om de ännu inte har svarat, knapparna **Acceptera / Avböj** direkt i e-postmeddelandet. Dessa påminnelser ställs in på plantypen i stället för på ett kalenderevenemang, och kan också skickas som textmeddelanden. Se [Volontärpåminnelser](../serving/plans#volunteer-reminders) och [Söndagsvolontärer](../guides/sunday-volunteers) för hur schemaläggning och påminnelser för volontärer fungerar.

## Nästa steg

- [Aviseringsinställningar](../../b1-church/getting-started/notification-preferences) -- Vad medlemmar kan styra
- [Guide för evenemangsregistrering](../guides/event-registration) -- Ställ in registrering så att påminnelser kan nå deltagarna
- [Skapa kalendrar](creating-calendars) -- Tillbaka till kalenderinställningar
