---
title: "Twilio BYOK (förslag)"
description: "Föreslagen kyrkägd Twilio-integration, samtyckesmodell, omfattning av implementationen och kriterier för lansering."
---

# Förslag till Twilio BYOK-integration

:::caution Förslag — inte en tillgänglig integration
Detta är en design för granskning av underhållare, baserad på publik källkod och Twilios dokumentation som granskades den 22 oktober 2026. Sedan dess har en grundläggande Twilio-leverantör lanserats (`@churchapps/texting` 0.6.0 och B1 Admin **Inställningar > Texting**). Kyrkan anger sitt Account SID, sin Auth Token och ett avsändarnummer. Leverantören accepterar också ett Messaging Service SID som börjar med `MG`, men kolumnen `fromNumber` är fortfarande `varchar(20)`, vilket är för kort för ett SID på 34 tecken. SMS skickas med en begäran per mottagare via Twilios Messages API, och STOP-svar når B1 via den befintliga inkommande webhooken. Se [Kyrkoinställningar: Texting](../../b1-admin/settings/church-settings.md#texting). Samtyckesmodellen, hanteringen av Advanced Opt-Out, leveransstatus och kontroller av beredskap för installationen nedan är fortfarande förslag, inte levererat beteende. Det kompletterande [utkastet till kyrkans onboarding](./twilio-byok-onboarding-draft.md) innehåller föreslagen installationsvägledning och kyrkspecifika exempel.
:::

## Rekommenderad väg

Lägg till Twilio i B1:s befintliga system för SMS-leverantörer med **ett kyrkägt Twilio-konto, egna API-uppgifter, en Messaging Service och ett SMS-kapabelt telefonnummer**. Kyrkan registrerar sin egen juridiska enhet och sin egen meddelandekampanj, betalar Twilio direkt, underhåller mottagarnas samtycke och hanterar godkännandet i Twilio Console. ChurchApps tillhandahåller integrationen och dokumentationen.

Börja med ett meddelandeprogram, en Messaging Service och en amerikansk lokal 10DLC-avsändare per B1-kyrka. Stöd enskilda SMS, gruppSMS, arbetsflödes-SMS och påminnelser om opt-in via de befintliga B1-skärmarna. Ett rimligt första program omfattar gudstjänständringar, eventpåminnelser och volontärschemaläggning, under förutsättning att alla tre beskrivs i kyrkans samtycke och i den godkända kampanjen. Insamling eller reklam kräver en separat bedömd omfattning och eget samtycke. Lägg inte till sådant i det här programmet utan att det har beslutats särskilt.

| Ansvar | Kyrkan | B1 / ChurchApps |
|---|---|---|
| Twilio-konto, fakturering, nummerägande | Äger och administrerar dem | Tillhandahåller inte ett plattformskonto och säljer inte krediter vidare |
| Varumärke, kampanj, nummerregistrering | Lämnar korrekt kyrkoinformation och hanterar granskning och rättelser | Förklarar förutsättningarna och läser tillgänglig information om beredskap |
| Anmälningssida, policyer, meddelandets syfte | Publicerar och underhåller dem | Tillhandahåller kompatibla formulärkontroller, exempel och samtyckesregistreringar |
| Mottagarens behörighet och STOP-hantering | Granskar bevis för samtycke och begär återkallelser som tagits emot utanför SMS | Tillämpar samtycke, spärrar, behörigheter och signerade webhooks |
| Leverans och support | Bevakar Twilios fel, kontohälsa och inkommande svar | Visar status för inlämning och leverans utan att lova godkännande |

Skjut upp följande: ett ChurchApps-ägt huvudkonto för Twilio, kundunderkonton, köp av nummer, inlämningar till Trust Hub, fakturering, en konversationsinkorg, MMS/WhatsApp, internationell sändning och onboarding för tollfria nummer. Tollfria nummer är en separat väg för verifierade avsändare, inte en genväg förbi registreringen. Dessa avgränsningar håller den första utgåvan i linje med B1:s befintliga modell för egen leverantör (bring-your-own-provider).

## Befintlig grund och brister

Följande iakttagelser är kopplade till källkodens ögonblicksbilder och är inget antagande om vad som för närvarande är i drift:

| Komponent | Befintligt beteende | Konsekvens |
|---|---|---|
| [Leverantörsregister och kontrakt](https://github.com/ChurchApps/Packages/tree/68c93d610031d3ed56d3582055413e851c5cb2ee/texting/src) | `ITextingProvider` har enskilda och massutskick, validering, valfria funktioner för prenumeranter och listor samt ett leverantörsmeddelande-ID i resultaten. Ingen Twilio-adapter är registrerad. | Lägg till Twilio i `@churchapps/texting`. Den behöver varken skapande av prenumeranter eller leverantörshanterade listor. |
| [Inställningar för SMS](https://github.com/ChurchApps/B1Admin/blob/e33cc2386d96e2e3cb24e760d458a72b699c71c3/src/settings/components/TextingSettingsEdit.tsx) | Clearstream, Text In Church och Nalo kan väljas. MinistryStuff styrs av funktionsflaggor. Redigering och sparande av avsändare är för närvarande specifikt för Nalo. | Lägg till explicita fält för Twilio, validering, sparande av avsändare och hjälp vid onboarding. Ett alternativ i rullgardinsmenyn räcker inte. |
| [Controller](https://github.com/ChurchApps/Api/blob/82eda28b6803754548ce007bd52177a21700f118/src/modules/messaging/controllers/TextingController.ts) och [modulgateway](https://github.com/ChurchApps/Api/blob/82eda28b6803754548ce007bd52177a21700f118/src/shared/modules/MessagingModuleGateway.ts) | Uppgifter krypteras och maskeras. Manuella och automatiska utskick löser kyrkans leverantör. Grupputskick deduplicerar delade telefonnummer. | Återanvänd dessa vägar och bevara behörighetskontrollen. Lägg nya grindar för samtycke och beredskap i en gemensam serverväg, så att arbetsflöden inte kan kringgå dem. |
| [STOP-hjälpare](https://github.com/ChurchApps/Api/blob/82eda28b6803754548ce007bd52177a21700f118/src/modules/messaging/helpers/SmsOptOutHelper.ts) | Tolkar Twilio-liknande `From`/`Body`, validerar en token för kyrkans URL, sätter `person.optedOut` och inaktiverar SMS-påminnelser. Andra svar ignoreras. | Det är en användbar utgångspunkt, inte en komplett Twilio-webhook. Lägg till Twilio-signaturer och ett separat tillstånd för SMS-prenumeration. |
| [Schema för meddelanden](https://github.com/ChurchApps/Api/blob/82eda28b6803754548ce007bd52177a21700f118/tools/migrations/messaging/2026-04-03_initial_schema.ts) | Lagrar `apiKey`, `apiSecret` och ett `fromNumber` på 20 tecken. Leveransloggar lagrar omedelbar framgång eller fel, inte leverans-ID:n eller slutliga leveranstillstånd. | Ett E.164-avsändarnummer passar. Ett Messaging Service SID på 34 tecken behöver ett eget fält. Lägg till varaktig lagring av leverans-ID och status. |
| [Offentlig formulärsida](https://github.com/ChurchApps/B1App/blob/5ca19ee4ef947235b8ffba9fbb35af42d0dcb41d/src/app/%5BsdSlug%5D/%28public%29/%5BpageSlug%5D/%5Bid%5D/components/FormPage.tsx), [gemensam formulärrenderare](https://github.com/ChurchApps/Packages/blob/68c93d610031d3ed56d3582055413e851c5cb2ee/apphelper/src/forms/components/QuestionEdit.tsx) och [controller för formulärinlämningar](https://github.com/ChurchApps/Api/blob/82eda28b6803754548ce007bd52177a21700f118/src/modules/membership/controllers/FormSubmissionController.ts) | Formulär utan begränsningar och valfria kryssrutor finns. Beskrivningar är ren text. Inlämningar sparar svar, men SMS-vägen saknar ett samtyckesregister för respektive kampanj. | Lägg till en konfigurerad kontroll för SMS-samtycke med riktiga länkar till policyer och insamling av bevis på servern. En generell kryssruta eller gruppmedlemskap får inte automatiskt ge tillstånd för SMS. |

[Användardokumentationen för kyrkoinställningar](../../b1-admin/settings/church-settings.md#texting) förklarar också att den nuvarande flaggan för avregistrering delas med integritetsinställningen för katalogen. Den kopplingen är ett problem för utgåvan: att svara START får aldrig ändra synligheten i katalogen.

## Konfiguration och design av uppgifter

Använd explicita, additiva konfigurationsfält i stället för att överbelasta `fromNumber` eller lagra strukturerad data i en API-nyckelsträng:

| Fält | Föreslaget syfte |
|---|---|
| `accountSid` | Kyrkans Twilio-konto- eller projektidentifierare (`AC…`) |
| `apiKey`, `apiSecret` | Dedikerat Twilio API Key SID (`SK…`) och hemlighet för utgående API-åtkomst. Krypteras och maskeras. |
| `webhookAuthToken` | Kontots Auth Token som Twilio SDK använder för att validera inkommande signaturer. Krypteras och maskeras separat. |
| `messagingServiceSid` | Kyrkans Messaging Service (`MG…`, 34 tecken) |
| `fromNumber` | Valt SMS-kapabelt nummer i E.164-format, verifierat som avsändare i kontot eller tjänsten |
| Programkonfiguration | Stabilt program-ID, namn, tillåtna syften, URL:er för anmälan och policyer samt version av upplysningen |

Twilio [föredrar API-nycklar för REST-autentisering](https://www.twilio.com/docs/iam/api-keys). Använd de snävaste testade nyckelbehörigheterna som täcker sändning och de nödvändiga skrivskyddade kontrollerna av installationen. Kontots Auth Token behövs fortfarande för [standardkontrollen av Twilio-webhookens signatur](https://www.twilio.com/docs/usage/security). Förklara den skillnaden i gränssnittet. En API-hemlighet är inte en Auth Token för webhooks. Förvara uppgifterna uteslutande i serverns inställningslager, aldrig på offentliga sidor, i svar på formulär, i begäranden om utskick från webbläsaren eller i supportärenden.

Kyrkan skapar och hanterar dessa resurser i Console. B1:s valideringsåtgärd får bara läsa den konfigurerade tjänsten, avsändarna och registreringsinformationen. Den får inte köpa nummer, skapa kampanjer, ändra Twilio-inställningar eller skicka ett testmeddelande som en bieffekt. Tillhandahåll en separat, uttrycklig åtgärd för testutskick som bara gäller en berättigad mottagare som har samtyckt.

Bevara maskerade uppgifter endast när man redigerar samma sparade leverantör. Byte till Twilio ska kräva egna uppgifter och rensa inaktuella leverantörsspecifika värden. För inte med sig en maskerad Clearstream- eller Nalo-nyckel in i en Twilio-konfiguration.

Avgränsa varje inläsning och uppdatering till den autentiserade B1-kyrkan. Bind callbacks till en sparad integration och till förväntat Twilio-konto, tjänst och avsändare, och avvisa motstridiga tilldelningar mellan kyrkor. Rotation av uppgifter och frånkoppling av leverantören ska ogiltigförklara beredskapen och pausa köade utskick, utan att radera samtycke eller historiska leveransregister.

## Samtycke och avregistrering är nödvändigt arbete före lansering

Inför prenumerationsposter kopplade till telefonnummer för Twilio-programmet, samt endast-tillägg-register för samtycke och avregistrering. Föreslaget minimum för bevis är: kyrk-ID, program-ID, normaliserat telefonnummer, eventuell verifierad koppling till person, en uttrycklig handling, käll-formulärets ID eller inlämnings-ID eller granskat externt bevis, serverns tidsstämpel, upplysningens text och version, käll-URL, URL:er för policyer samt händelser för återkallelse och återstart. Begränsa åtkomst och lagringstid enligt kyrkans befintliga policy för datasäkerhet.

Använd tillstånd som `unknown`, `pending`, `active` och `suppressed`. Befintliga mobilnummer, importerade kontakter, närvaro, gåvor, gruppmedlemskap, `person.optedOut = false` och `allowSms` är inte ett uttryckligt samtycke till programmet. Att importera dokumenterat samtycke ska vara en åtgärd som kräver behörighet och granskas, med en registrerad källa. En migrering får inte registrera alla.

För det inledande webbflödet ska du använda B1:s standardläge för offentliga formulär. Lägg till en uttryckligen konfigurerad SMS-samtyckesfråga som börjar avmarkerad, förblir valfri, visar klickbara länkar till policyer och kopplas till ett program och ett mobilfält. Validera kopplingen på servern och spara en ögonblicksbild av den visade upplysningen när ett jakande svar sparas. Härled aldrig samtycke från godtyckliga frågeetiketter, konversationell AI eller arbetsflödesmedlemskap. Aktivera en konversationell motsvarighet först när dess uttryckliga jakande interaktion och registrering av bevis har testats.

En inlämning utan ifylld kryssruta skapar ingen prenumeration och får inte återkalla någon annans befintliga samtycke. Koppla samtycket till det inlämnade telefonnumret. Personal kan lösa tvetydiga kopplingar till personer utan att slå ihop hushållsposter. Ett ändrat mobilnummer behöver ett eget samtycke. För anonyma formulär ska du tillämpa skydd mot missbruk och göra alla steg för verifiering av nummerägande eller dubbel bekräftelse uttryckliga. En ifylld kryssruta ensam bevisar inte vem som äger telefonnumret. Om bekräftelse används ska prenumerationen förbli väntande tills den är slutförd, och det exakta flödet ska beskrivas i registreringsmaterialet.

För Twilio ska du skilja SMS-spärrar från synlighet i katalogen. Migrera konservativt eventuell äldre avregistrering till en spärrpost. Lämna övriga äldre mottagare som `unknown`. En uttrycklig, dokumenterad ny registrering kan etablera SMS-samtycke medan integritetsinställningen för katalogen förblir oförändrad. Bevara beteendet för andra leverantörer tills deras migreringar har granskats separat.

Vid varje faktiskt utskick krävs att integrationen för kyrkan är aktiverad och redo, att det finns aktuellt programsamtycke för exakt det telefonnumret, att numret inte är spärrat på telefonnivå och att den befintliga behörigheten för avsändaren finns. Påminnelser respekterar dessutom `allowSms`, kategoriinställningar och tysta timmar. Kontrollera igen efter köläggningen, lös ut sammanslagningsfält, normalisera och validera nummer och deduplicera efter telefonnummer. STOP spärrar alla utskick för tjänsten eller programmet, inklusive manuella utskick och arbetsflöden. Det ska också täcka alla personer som delar det telefonnumret.

Visa kyrkans identitet och STOP-instruktionen konsekvent i den gemensamma Twilio-utskicksvägen och förhandsgranska det slutliga antalet SMS och segment. Expansion av sammanslagningsfält och hantering av längd ska bevara dessa delar. Avkorta inte STOP-instruktionen i tysthet. Håll exempel och faktiska mallar för påminnelser och arbetsflöden i linje med varandra.

## Twilio-utskick, svar och leveransstatus

Implementera `TwilioProvider.sendMessage` via Messages API med den valda Messaging Service och avsändaren. Returnera ett SID för leverantörens meddelande och ett resultat som anger accepterat eller inlämnat. HTTP-godkännande är inte leverans till mottagarens telefon. Ett grupputskick ger resultat per mottagare i indatans ordning.

Begränsa samtidigheten för utgående trafik för **både** `sendBulk` och enskilda utskick. Den nuvarande grenen för sammanslagningsfält skickar många `sendMessage`-anrop parallellt. Spara avsikten att skicka och arbete som kan göras anspråk på för grupper som inte ryms inom en begäranbudget. Återanvänd den befintliga driftmodellen i stället för att kräva att kyrkor kör en annan tjänst. Försök igen vid kända tillfälliga fel och begränsning av anropsfrekvens med backoff. Behandla oklara timeouts som okända resultat som ska avstämmas. De får inte leda till att meddelandet skickas om blint, vilket riskerar dubbla SMS och dubbla avgifter.

Konfigurera webhook-URL:er för inkommande meddelanden och statusåterrapportering för kyrkan. Validera `X-Twilio-Signature` med SDK:n, den exakta externa URL:en, de ursprungliga formulärparametrarna och den matchande Auth Token för kontot. En hemlig URL ensam räcker inte. Koppla callbacks till sparade poster för kyrka, konto och meddelande. Hantera dubbletter och callbacks som kommer innan resultatet av utskicket har sparats. Förhindra att äldre händelser skriver över en slutlig status. Returnera tom TwiML för bekräftelse av inkommande meddelande och ett lämpligt framgångssvar för statushändelser. [Twilios säkerhet](https://www.twilio.com/docs/usage/security), [statusåterrapportering](https://www.twilio.com/docs/messaging/guides/track-outbound-message-status)

Rekommendera **Advanced Opt-Out** för Messaging Service. Twilio äger bekräftelserna för STOP, START och HELP. B1 använder autentiserade `OptOutType`-händelser utan att skicka dubbla bekräftelser. STOP registrerar spärren omedelbart. START återställer endast en känd prenumeration på just detta samtyckta program, med en ny händelse för återstart. Det får inte registrera ett nytt telefonnummer för orelaterade meddelanden eller aktivera påminnelsepreferenser. HELP registrerar ingen. Andra inkommande svar ligger utanför B1:s inkorg. Kyrkor behöver ett dokumenterat sätt att bevaka dem i Twilio. [Advanced Opt-Out](https://www.twilio.com/docs/messaging/tutorials/advanced-opt-out)

Spara Twilio-meddelandets SID, bindningen till konto och tjänst, tidpunkten för inlämning, slutlig status eller felkod och tidpunkten för callbacken tillsammans med leveransloggen. Visa köat eller accepterat, levererat, misslyckat, ej levererat eller okänt korrekt. Bevara det befintliga svarskontraktet för andra leverantörer och definiera om sammanlagda framgångsantal representerar inlämning eller leverans.

## Beredskap för installationen och validering av godkännande

Visa tydliga kontrollpunkter för uppgifter, ägande av tjänst och avsändare, verifiering av kampanj, nummerregistrering, kontroller av webhooks och ett levererat testutskick. Visa aldrig en enda grön ”godkänd”-badge bara för att uppgifterna fungerar.

För lokala amerikanska nummer ska du läsa tjänstens [Usa2p-kampanjresurs](https://www.twilio.com/docs/messaging/api/usapptoperson-resource) och kräva att den relevanta kampanjen har status `VERIFIED`. Verifiera separat att det valda telefonnumret är kopplat till tjänsten och har slutfört nummerregistreringen. En godkänd kampanj kan fortfarande ha ett nummer som väntar. Om ett stödjande läs-API inte visar en nödvändig signal ska du visa **manuell verifiering i Console krävs** och registrera kyrkans administratörs daterade bekräftelse som just detta. Markera den inte som API-verifierad. Automatiska händelser för nummerregistrering kan vara en uppföljning. [Fel vid nummerregistrering](https://www.twilio.com/docs/api/errors/30035), [händelser för A2P-registrering](https://www.twilio.com/docs/messaging/compliance/a2p-10dlc/event-streams-setup)

Kräv aktuella kontroller innan sändning aktiveras. Registrera när och hur beredskapen kontrollerades, låt inaktuella kontroller löpa ut och pausa vid återkallade uppgifter, ändrade avsändare, registreringsfel eller ihållande kontofel. Att ett testutskick levereras bekräftar den testade vägen, inte universellt godkännande från operatörer eller mottagarnas samtycke. Det kompletterande utkastet beskriver kyrkans kontroller före inlämning, före lansering och i den löpande driften.

## Repository och plan för utgåvan

[Organisationens riktlinjer för bidrag](https://github.com/ChurchApps/.github/blob/main/CONTRIBUTING.md) anger att funktionsönskemål för B1 ska lämnas till ChurchAppsSupport och implementeringar i PR:er till de ansvariga repositorierna. Använd en central begäran om funktion och länka fokuserade implementerings-PR:er till den:

1. **ChurchAppsSupport:** granska denna design och utkastet till onboarding innan Twilio presenteras som en tillgänglig funktion för användare.
2. **Packages:** lägg till Twilio-adaptern, explicita gemensamma konfigurationer och gränssnitt samt rendering av formulär för SMS-samtycke där det delas av B1Admin och B1App. Inkludera changesets och publicera via den befintliga releaseprocessen innan konsumenterna uppdateras.
3. **Api:** lägg till additiva migreringar för integrationens metadata, samtycke och spärrar samt tillstånd för leverans. Implementera validering av konfiguration, gemensamma grindar för utskick, insamling av bevis från formulär, webhook-hantering och varaktig lagring av utskick.
4. **B1Admin:** lägg till gränssnitt för Twilio-konfiguration och beredskap, hantering av program och samtycke, avsändarsparande som är medveten om leverantören och korrekt rapportering av leverans. Exponera ingen överskrivning av SMS-samtycke via vanliga personredigeringar.
5. **B1App:** verifiera upplevelsen av offentligt formulär och sidor med policylänkar mot de gemensamma kontrollerna, inklusive för anonyma besökare och besökare på mobil. Ingen separat Twilio-klient i webbläsaren behövs.
6. **ChurchAppsSupport:** efter lanseringen gör du om utkastet till onboarding till publicerade inställnings- och hjälpsidor, lägger till riktiga skärmbilder, länkar det från inställningarna för Texting och ordnar översättningar.

Driftsätt schema och delade paket före konsumenterna. Håll Twilio bakom funktionsflagga för en liten pilot med frivilligt deltagande. Befintliga leverantörer måste fortsätta fungera. Återställning ska inaktivera Twilio-utskick och avbryta ej inskickade jobb, samtidigt som avregistreringar och bevis bevaras. Den får inte automatiskt växla mottagare till en annan leverantör eller avsändare.

## Bedömning av arbetsinsats

Planeringsuppskattning för en bidragsgivare som känner ekosystemet väl. Inga produktionsuppgifter eller riktiga SMS användes i bedömningen:

| Arbete | Utvecklardagar |
|---|---|
| Adapter, utökningar av konfiguration och schema, gränssnitt för inställningar | 2–3 |
| Samtycke per telefon och program, separat spärr, gemensamma grindar för utskick, integration med offentliga formulär | 3–5 |
| Signerade callbacks, lagring av leveranser, avgränsad och varaktig utskicksprocess | 2–3 |
| Gränssnitt för beredskap, guide för kyrkor, integrations- och regressionstestning, rättelser från pilotfasen | 3–4 |
| **Rekommenderad omfattning för lansering** | **10–15 totalt** |

Ett grundläggande proof of concept för adapter och inställningar tar ungefär 1–2 dagar. En uppskattning enbart för avsändaren utesluter det arbete med samtycke och onboarding som rekommendationen kräver. Extern granskningstid hos Twilio och operatörer räknas separat och varierar. Projektet ska inte utlova ett datum för godkännande eller ett godkännandeutfall.

## Acceptanskriterier

- [ ] Kyrkan äger och betalar för kontot, tjänsten, den registrerade avsändaren och kampanjen. Inget Twilio-konto som hanteras av ChurchApps krävs.
- [ ] Uppgifterna är krypterade och maskerade, avgränsade till kyrkan, kan roteras och finns inte i loggar eller offentligt innehåll. Validering är skrivskyddad.
- [ ] En valfri, omarkerad samtyckesruta visar riktiga policylänkar och sparar bevis på servern för program, telefonnummer och upplysning. Att avböja tillåter fortfarande formulärets huvudsakliga åtgärd.
- [ ] Alla manuella vägar, gruppvägar, vägar med sammanslagningsfält, arbetsflöden och påminnelser tillämpar samma behörighetskontroll för Twilio. Okända, icke samtyckta, ändrade eller spärrade mottagare hoppas över med en användbar orsak. Rendering bevarar kyrkans identitet och STOP-instruktionen efter expansion och hantering av längd.
- [ ] Äldre synlighet i katalogen registrerar inga mottagare. STOP och START ändrar aldrig synligheten i katalogen eller orelaterade inställningar. Fall med delat telefonnummer och flera kyrkor är testade.
- [ ] Signerade STOP-, START- och HELP-händelser, ogiltiga signaturer, fel konto eller fel tjänst, dubbla händelser, återspelade formulärinlämningar och förfalskade kopplingar för samtycke är täckta.
- [ ] Gruppstorlek, timeouts, begränsning av anropsfrekvens, partiella fel, oklara utfall, kapplöpningar mellan callbacks och leveranshändelser i fel ordning är testade utan dubbla utskick.
- [ ] Godkännande av kampanj och slutförd nummerregistrering skiljs från validering av uppgifter. Manuella bevis är tydligt märkta. Inaktuell eller återkallad beredskap blockerar utskick.
- [ ] En pilotkyrka kontrollerar sin anmälningssida, vägarna för avböjt och godkänt formulär, exakta URL:er för policyer och ett testmottagare som har samtyckt, genom inlämning, leverans, STOP-spärr och tillåten återregistrering.
- [ ] Befintliga inställningar och utskicksbeteende för Clearstream, Text In Church och Nalo klarar regressionskontroller. Hjälptexterna skiljer förslag från släppta funktioner.
