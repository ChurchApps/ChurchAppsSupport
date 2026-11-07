---
title: "Twilio-introduktion för kyrkor (utkast)"
description: "Utkast till kyrkägd Twilio-installation i B1, offentlig vägledning för registrering, kampanjexempel och checklista för godkännande."
---

# Utkast till introduktion av kyrkägd Twilio

:::caution Utkast för den föreslagna integrationen
Det här är ett föreslaget arbetsflöde. B1 har nu ett grundläggande **Twilio**-val under **Inställningar > Textmeddelanden** (Account SID, Auth Token, From Number och webhook för inkommande STOP). Se [Kyrkans inställningar: Textmeddelanden](../../b1-admin/settings/church-settings.md#texting). De ytterligare B1-inställningarna, kopplingen av samtycke och valideringsstegen nedan är krav för en framtida version, inte anvisningar för att hitta befintliga inställningar. Läs [det tekniska förslaget](./twilio-byok-proposal.md) för omfattning och beroenden. Twilios källor kontrollerades den 22 oktober 2026. Verifiera de aktuella kraven innan du skickar in en kampanj.
:::

## Den rekommenderade lösningen

Din kyrka äger sitt betalda Twilio-konto, telefonnumret, Messaging Service, faktureringen och kampanjregistreringen. B1 skulle skicka via dessa resurser med hjälp av inloggningsuppgifter som anges privat i kyrkans inställningar. Se till att minst två lämpliga administratörer i kyrkan har åtkomst till Twilio-kontot, aktivera kontosäkerhet och utse en person som ansvarar för samtycke, inkommande svar och avvisningsmeddelanden.

Den första version som föreslås omfattar ett lokalt amerikanskt nummer och ett tydligt beskrivet kyrkligt meddelandeprogram. Exemplen nedan använder den fiktiva **Grace Community Church** och programmet **Grace Church Updates** för gudstjänständringar, påminnelser om evenemang och schemaläggning av volontärer. Ersätt alla namn, domäner, frekvenser, kontakter och syften med kyrkans verkliga praxis. Dessa är kyrkspecifika exempel på Twilios regler, inte ett förgodkänt kampanjupplägg och inte ett löfte om godkännande.

## 1. Förbered den offentliga anmälningsupplevelsen i B1

Publicera en sida som `https://www.example.org/text-updates` på kyrkans B1-webbplats, med ett inbäddat offentligt B1-formulär eller en tydlig länk till dess fristående offentliga formulär. Publicera också `https://www.example.org/privacy` och `https://www.example.org/sms-terms`. Dessa adresser är platshållare. Skicka in de faktiska, nåbara webbadresserna.

För det föreslagna formuläret för SMS-anmälan:

| Inställning | Rekommenderad konfiguration |
|---|---|
| Åtkomst | Offentlig/utan begränsning. Aktiv under granskning och löpande anmälan. Tillgänglig utan inloggning |
| Formulärläge | Standardläge inledningsvis. Konversationsläge kräver det uttryckliga stödet för samtycke som beskrivs i det tekniska förslaget |
| Mobil | Tydligt märkt med landskod. Krävs endast när SMS-anmälan väljs, om det används i ett allmänt kontakt- eller evenemangsformulär |
| SMS-val | Separat, valfri kryssruta, avmarkerad som standard, kopplad till det specifika programmet och till mobilfältet |
| Upplysningar | Synliga bredvid SMS-valet: kyrka/program, meddelandets syfte och frekvens, eventuella avgifter, STOP, HELP, supportkontakt och klickbara länkar till integritetspolicy och villkor för SMS |
| Andra åtgärder | Gäster kan skicka in besökskortet, anmäla sig till ett evenemang eller begära information utan att anmäla sig till SMS |
| Bevis | Spara program, exakt telefonnummer, valt samtycke, inskickad uppgift, serverns tid och version av upplysningar/policy. Ett vanligt formulärsvar ensamt registrerar idag ingen i SMS-utskick |
| Automatisering av personer/grupper | Håll automatisk skapelse av personer och grupptilldelning avstängd för en inledande pilot av anmälan, om inte reglerna för befintlig matchning i kyrkan har granskats. Grupptilldelning är aldrig SMS-godkännandet |
| Befintliga automatiseringar | Anmäl inte alla som skickar formulär eller är medlemmar i en grupp till ett arbetsflöde för textmeddelanden. Endast den föreslagna verifierade kopplingen av samtycke får godkänna det programmet |
| Tackmeddelande | Bekräfta att formuläret togs emot, utan att påstå att någon är anmäld till SMS när rutan var avvisad eller bekräftelse/granskning fortfarande väntar |

En befintlig kryssruta i ett formulär kan illustrera formuläret, men B1 behöver fortfarande samtyckesloggen och spärrarna för utskick. Den nuvarande delade renderaren visar beskrivningar som ren text. Att skriva Markdown eller en URL där ger inte tillräcklig säkerhet för att policylänkarna blir klickbara. Implementationen måste tillhandahålla en tillgänglig samtyckeskontroll med faktiska länkar. Se [skapa formulär i B1](../../b1-admin/forms/creating-forms.md) och [det tekniska förslaget](./twilio-byok-proposal.md#consent-and-suppression-are-required-release-work).

Twilio kräver ett frivilligt och verifierbart medgivande. Paketera inte SMS tillsammans med obligatoriska medlemsvillkor, tillstånd för e-post eller telefon, samtycke till gåvor eller evenemangsanmälan. Ett mobilnummer på ett besökskort är i sig inget SMS-samtycke. Se Twilios [krav på frivilligt samtycke](https://www.twilio.com/docs/api/errors/30923) och [rekommendationer för kampanjer](https://help.twilio.com/hc/en-us/articles/26149060902555-A2P-10DLC-Campaign-Registration-Recommendations).

### Exempeltext för anmälan

Använd detta först när kyrkan har valt de faktiska syftena, avsändaren och frekvensen. Kryssrutan är valfri och börjar avmarkerad. Namnen på policyerna nedan måste vara länkar i det renderade formuläret.

> Ja, jag vill att Grace Community Church skickar textmeddelanden till mig via Grace Church Updates om gudstjänständringar, kyrkliga evenemang och volontärscheman från [registrerat kyrkonummer]. Förvänta dig högst 4 meddelanden per månad. Meddelande- och datataxor kan tillkomma. Svara STOP för att avsluta prenumerationen eller HELP för hjälp. Anmälan till SMS är frivillig och krävs inte för att delta, anmäla sig eller ge. Se vår integritetspolicy och våra villkor för SMS. Frågor: [kyrkans supportmail eller telefon].

”Högst 4” är ett exempel på ett åtagande, inte en gräns som Twilio föreskriver. Ersätt det med en frekvens som kyrkan faktiskt kan hålla. Om frekvensen varierar ska du upplysa om det öppet och beskriva den förväntade rytmen. Håll reklam eller ytterligare verksamhetsprogram utanför denna kryssruta, om inte deras syften och samtycke separat har bedömts.

För ett allmänt formulär för besökare eller evenemang måste det gå att skicka in med kryssrutan avmarkerad. Ett enbart SMS-formulär kan förklara att om man kryssar i rutan begär man anmälan, men det får aldrig göra att andra kyrkliga tjänster kräver anmälan. Bekräfta det faktiska beteendet både i mobil och på dator.

### Policyinnehåll att förbereda

Kyrkans integritetssida ska förklara vilka uppgifter den samlar in för textmeddelanden, hur den använder och skyddar dem samt sina rutiner för lagring och kontakt. Den ska tydligt ange att mobilnummer och samtycke till meddelanden inte säljs eller delas med tredje part eller närstående för deras marknadsföring eller reklam. Förklara korrekt den nödvändiga behandlingen hos tjänsteleverantörer. Påstå inte att kyrkan aldrig använder en personuppgiftsbiträde när den använder B1 och Twilio. Twilios [vägledning om integritetspolicy](https://www.twilio.com/docs/api/errors/30908) och [rekommendationer för kampanjer](https://help.twilio.com/hc/en-us/articles/26149060902555-A2P-10DLC-Campaign-Registration-Recommendations) är referensen för denna skillnad.

Villkoren för SMS ska identifiera kyrkan och programmet, syftena, den faktiska frekvensen, eventuella avgifter för meddelanden, instruktioner för STOP och HELP, supportkontakt och länken till integritetspolicyn. Inkludera ytterligare upplysningar som Twilios aktuella granskning begär. Policylänkarna på anmälningssidan ska exakt stämma överens med de webbadresser som lämnas in i kampanjen. Sedan den 30 juni 2026 kräver Twilio särskilda offentliga webbadresser för integritetspolicy och villkor för nya API-registreringar av kampanjer. Konsolens flöde samlar också in dem. [Twilios krav](https://www.twilio.com/en-us/changelog/a2p-10dlc-campaign-registration-will-require-privacy-policy-and-)

Detta är innehållskrav som ska tillämpas på kyrkans verkliga policyer. De ersätter inte kyrkans befintliga integritetsrutiner, och det är inte en generisk policy att klistra in utan kontroll.

## 2. Registrera kyrkan och dess meddelandeprogram i Twilio

1. Skapa eller använd ett **betalt konto som ägs av kyrkan** samt ett SMS-kapabelt lokalt amerikanskt nummer. Använd kyrkans juridiska namn, EIN/registreringsuppgifter för verksamheten, adress, webbplats och behörig företrädare konsekvent. Ersätt inte ChurchApps identitet eller någon annan kyrkas uppgifter.
2. Följ Twilios registreringsflöde för direktkunder för varumärke (Brand) för kyrkans faktiska enhetstyp. För ett berättigat ideellt företag, använd [vägledningen för ideella organisationer](https://www.twilio.com/docs/messaging/compliance/a2p-10dlc/onboarding-for-government-and-non-profit-agencies). Användningsfall för välgörenhet eller 501(c)(3) beror på behörighet. Kyrkans namn ensamt innebär inte att Twilio godkänner eller undantar verksamheten.
3. Skapa en dedikerad Messaging Service och skicka in den relevanta A2P 10DLC-kampanjen. Välj det användningsfall som sanningsenligt stämmer med de verkliga meddelandena och de alternativ som finns för det godkända varumärket. Exemplen här föreskriver ingen allmän användningskod för kyrkor.
4. Ange den offentliga anmälningsadressen, policyadresserna, en fullständig beskrivning av samtycke och meddelandeflöde samt de begärda exempelmeddelandena. Ta med varje verklig metod för anmälan och ställ in deklarationerna om inbäddade länkar och telefonnummer så att de stämmer med det faktiska innehållet. Ange inte anmälan via nyckelord eller dubbelt samtycke om inte det flödet finns och är testat.
5. Koppla avsändarnumret till tjänsten och den godkända kampanjen. Vänta på både kampanjens verifiering och **slutförd registrering av numret** innan du skickar något.

Håll dessa steg i kyrkans egen Twilio-konsol. Den föreslagna B1-integrationen skickar inga registreringar för kyrkor. Twilios [snabbstart för registrering](https://www.twilio.com/docs/messaging/compliance/a2p-10dlc/quickstart) och [resursen för kampanjer](https://www.twilio.com/docs/messaging/api/usapptoperson-resource) förklarar registreringsfälten och statusen. Ett nummer som väntar kan fortfarande blockera utskick även efter att kampanjen godkänts. [Registrering av nummer](https://www.twilio.com/docs/api/errors/30035)

### Exempel på kampanjbeskrivning

> Grace Community Church använder Grace Church Updates för att skicka ändringar i gudstjänstschemat, påminnelser om kyrkliga evenemang och meddelanden om volontärschema till personer som väljer detta program på vår offentliga kyrkwebbplats. Vi skickar högst fyra meddelanden per månad inom detta program. Mottagare kan när som helst avsluta dessa meddelanden. Programmet omfattar inte köpta kontakter, tredjepartsreklam eller insamlingsappeller.

Detta exempel passar endast en kyrka som faktiskt följer dessa gränser och undantag. Om påminnelser för volontärer ensamma överskrider den utlovade frekvensen måste du ändra programmets upplägg och upplysningen före inlämning.

### Exempel på beskrivning av meddelandeflödet

> Besökare öppnar [faktisk kyrkans anmälningsadress], anger sitt mobilnummer och väljer självständigt den valfria kryssrutan för Grace Church Updates. Rutan är avmarkerad när formuläret öppnas. Upplysningen anger Grace Community Church, beskriver ändringar i gudstjänster, påminnelser om evenemang och volontärscheman, anger den månatliga gränsen och möjliga avgifter samt förklarar STOP och HELP. Den visade integritetspolicyn och villkoren för SMS länkar till [faktisk integritetsadress] och [faktisk adress för villkor för SMS]. Att tacka nej till SMS hindrar inte deltagande i gudstjänst, evenemangsanmälan, gåvor eller användning av det allmänna kontaktformuläret. B1 registrerar det aktiva valet, telefonnumret, tidpunkten för inskickningen och versionen av upplysningen. Vi skickar detta program endast till dokumenterade prenumeranter och undertrycker utskick till dem som avregistrerat sig innan vi skickar något mer.

Anpassa stycket till det implementerade flödet. Om bekräftelse via telefon eller granskning av personal används, beskriv det väntande läget och det exakta aktiveringssteget. Om andra metoder används, ta med varje metod och dess bevis. Där anmälan sker bakom inloggning eller på papper begär Twilio offentliga, redigerade bevis för den faktiska upplevelsen av samtycke. Exponera aldrig ifyllda formulär eller medlemsuppgifter. [Vägledning om verifierbart samtycke](https://www.twilio.com/docs/api/errors/30923)

### Exempel på utgående meddelanden

Dessa är fiktiva exempel som ska anpassas. Använd äkta kyrkliga webbadresser och ersätt hakparenteser med verkliga värden innan du skickar in. Twilios API för kampanjer accepterar två till fem exempel. Exemplen ska identifiera kyrkan, återspegla det angivna syftet och innehålla en instruktion för avregistrering. [Fält för exempel i kampanjer](https://www.twilio.com/docs/messaging/api/usapptoperson-resource)

```text
Grace Community Church: Söndagens gudstjänst börjar kl. [tid] på grund av [anledning]. Mer information: [kyrkans webbadress]. Svara STOP för att avsluta sms.
```

```text
Grace Community Church: Påminnelse om att [kyrkligt evenemang] äger rum den [datum] kl. [tid]. Information: [webbadress för evenemanget]. Svara STOP för att avsluta sms.
```

```text
Grace Community Church: Du är schemalagd att tjänstgöra i [team] denna [dag]. Vänligen granska din plan: [webbadress till B1-portalen för kyrkan]. Svara STOP för att avsluta sms.
```

De hakparentesade webbadresserna beskriver exempelvariabler. De inskickade exemplen ska visa kyrkans verkliga domän och den faktiska länkstilen. En länk till en plan kan kräva inloggning, men anmälningssidan och de policyer som används för granskningen ska vara offentligt granskningsbara. Ta inte med privata anteckningar, barns uppgifter eller identifierbara medlemsuppgifter i exempel för godkännande. Håll exemplens innehåll i linje med vad B1:s mallar faktiskt skickar. Lova inte en svarsinkorg eller ett visst påminnelsebeteende som inte finns.

### Svar för STOP, START och HELP

Använd Twilios Advanced Opt-Out för dessa bekräftelser och anpassa kyrkans och programmets identitet samt supportuppgifterna. Exempel på svarsavsikt:

- **STOP:** Bekräfta att Grace Church Updates har avslutats och förklara det godkända sättet att återuppta.
- **START:** Bekräfta att samma program återupptas, inklusive dess identitet, frekvens och avgifter samt instruktioner för hjälp och avregistrering enligt det konfigurerade flödet.
- **HELP:** Identifiera Grace Community Church och ange den verkliga supportkontakten samt instruktioner för avregistrering.

Skicka ingen andra bekräftelse från B1 när Twilio redan har svarat. Ett HELP-svar är inte en anmälan. START får inte anmäla någon till ytterligare kyrkliga program eller visa personen i medlemskatalogen. [Twilio Advanced Opt-Out](https://www.twilio.com/docs/messaging/tutorials/advanced-opt-out)

## 3. Kontrollera godkännandepaketet före inlämning

- [ ] Kyrkans verkliga juridiska uppgifter, varumärkesidentitet på webbplatsen och kampanjens syfte stämmer överens.
- [ ] Anmälningssidan och det aktiva formuläret öppnas utan inloggning i ett privat webbläsarfönster, även i mobil.
- [ ] SMS-rutan är avmarkerad från start och kan avvisas medan besökaren slutför den primära åtgärden för besök eller evenemang.
- [ ] Programmets syfte, avsändare, faktisk frekvens, eventuella avgifter, STOP, HELP, supportkontakt och klickbara policylänkar visas bredvid SMS-valet.
- [ ] De exakta adresser till integritetspolicy och villkor som lämnas till Twilio är offentliga, fungerar utan inloggningsuppgifter och identifierar samma kyrka och program. Policyinnehållet stämmer överens med den faktiska behandlingen.
- [ ] Varje exempelmeddelande stämmer överens med programmet, den faktiska avsändaridentiteten och det förväntade beteendet för länkar och telefonnummer. Kampanjen beskriver varje verklig metod för samtycke.
- [ ] Redigerade skärmbilder visar det tomma formuläret, kryssrutan och upplysningarna samt policylänkarna så som granskarna kommer att se dem. Bevisen innehåller inga medlemsregister eller nycklar.
- [ ] Kyrkan har ett fungerande sätt att bevara bevis för samtycke och att respektera avregistreringar innan utskick, inklusive begäranden som tas emot per telefon eller e-post.

Dessa kontroller minskar onödiga felmatchningar. Twilio och dess granskningspartners fattar beslutet om godkännande. Behåll den verkliga anmälningssidan och policyadresserna tillgängliga även efter godkännandet, inte bara under granskningen.

## 4. Anslut och validera den framtida B1-integrationen

Efter att integrationen har lanserats ska den föreslagna inställningen för textmeddelanden samla in kyrkans Account SID, dedikerad API Key SID och hemlighet, separat Auth Token för webhooks, Messaging Service SID och vald avsändare. Skapa nycklar endast i kyrkans konsol och ange hemligheter endast i privata B1-inställningar. [Vägledning om Twilio API-nycklar](https://www.twilio.com/docs/iam/api-keys)

Kopiera de kyrkspecifika webhook-adresserna för inkommande meddelanden och leveransstatus som B1 tillhandahåller till motsvarande konfiguration i Twilio-tjänsten. Aktivera Advanced Opt-Out och kontrollera att inkommande meddelanden når den konfigurerade webhooken. B1 bör visa separata kontroller för inloggningsuppgifter, ägande av tjänst och avsändare, verifierad kampanj, slutförd registrering av nummer, verifiering av inkommande meddelanden och ett levererat testmeddelande. En sparad inloggningsuppgift eller ett godkänt API-anrop är inte slutlig leverans.

Om B1 inte programmatiskt kan kontrollera en registreringssignal ska du bekräfta det direkt i konsolen. Gränssnittet ska märka det daterade resultatet som bekräftat av administratör. Lös status för väntande eller misslyckade registreringar innan du aktiverar produktionsmeddelanden. Använd ett separat, uttryckligen begärt test till en verklig, samtyckande vuxen testmottagare och gå sedan igenom följande steg:

1. Bekräfta att en matchande dokumenterad anmälan skapar rätt samtyckespost för telefon och program. Ett nej eller ett byte av telefonnummer får inte tyst anmäla mottagaren.
2. Skicka ett testmeddelande, bekräfta mottagandet och jämför B1:s status med Twilio Message SID och leveransresultatet.
3. Svara STOP och kontrollera att manuella meddelanden, gruppmeddelanden, arbetsflöden och påminnelser hoppar över det telefonnumret. Synligheten i katalogen ska inte ändras.
4. Testa det dokumenterade flödet för återprenumeration inom samma program samt HELP-svaret. Kontrollera att det inte finns några dubbla bekräftelser och inga orelaterade ändringar av inställningar.

## 5. Underhåll programmet

Utse en ansvarig person i kyrkan som övervakar kampanjens och kontots status, saldo- och faktureringsvarningar, meddelandefel och inkommande svar i Twilio. Den föreslagna första versionen av B1 har ingen SMS-inkorg för konversationer. Publicera därför en verklig hjälpkontakt och kontrollera svaren, i stället för att anta att personalen ser dem i B1.

Håll historik över samtycke och avregistreringar, aktuella versioner av upplysningar och policyer, kampanjidentifierare och granskade bevis i kyrkans egna register. Klistra aldrig in nycklar eller mottagarlistor i offentliga supportärenden. När ett nummer, en tjänst, inloggningsuppgifter, anmälningsflöde, frekvens eller syfte ändras ska du kontrollera integrationen igen och uppdatera registrering och samtycke där det krävs innan utskicken återupptas. Granska delade hushållsnummer och ändrade nummer noggrant. Behörigheten följer det samtyckande telefonnumret och programmet, inte varje familjemedlems post.

Vid avvisning ska du läsa det faktiska Twilio-felet, rätta den specifika inkonsekvensen både på webbplatsen och i inlämningen och skicka in igen via kyrkans konsol. För avsändare som inte är registrerade eller väntar, vänta på att registreringen slutförs i stället för att byta nummer för att kringgå den. Använd [Twilios felsökning för registrering](https://www.twilio.com/docs/messaging/compliance/a2p-10dlc/troubleshooting-a2p-brands) och den tillhandahållna referensen för felkoder. Lova inte en fast handläggningstid.
