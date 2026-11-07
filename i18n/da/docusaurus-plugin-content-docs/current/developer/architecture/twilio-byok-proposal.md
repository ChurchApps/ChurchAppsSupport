---
title: "Twilio BYOK (forslag)"
description: "Foreslået kirkeejet Twilio-integration, samtykkemodel, implementeringsomfang og kriterier for udgivelse."
---

# Forslag til Twilio BYOK-integration

:::caution Forslag — ikke en tilgængelig integration
Dette er et design til gennemgang af vedligeholdere, baseret på offentlig kildekode og Twilios dokumentation gennemgået den 22. oktober 2026. Siden da er en grundlæggende Twilio-udbyder udgivet (`@churchapps/texting` 0.6.0 og B1 Admin **Settings > Texting**): kirken indtaster sin Account SID, Auth Token og et afsendernummer. Udbyderen accepterer også en Messaging Service SID, der starter med `MG`, men kolonnen `fromNumber` er stadig `varchar(20)`, hvilket er for kort til et 34 tegn langt SID. Beskeder sendes med én anmodning pr. modtager via Twilios Messages API, og STOP-svar når B1 via det eksisterende indgående webhook. Se [Kirkeindstillinger: Tekstbeskeder](../../b1-admin/settings/church-settings.md#texting). Samtykkemodellen, håndteringen af Advanced Opt-Out, leveringsstatus og kontrollerne af opsætningsparathed nedenfor er stadig forslag, ikke udgivet funktionalitet. Det [udkast til kirkens onboarding](./twilio-byok-onboarding-draft.md), der følger med, indeholder foreslået opsætningsvejledning og eksempler specifikke for kirker.
:::

## Anbefalet løsning

Tilføj Twilio til B1's eksisterende udbydersystem for tekstbeskeder med **en kirkeejet Twilio-konto, API-legitimationsoplysninger, en Messaging Service og et SMS-kapabelt telefonnummer**. Kirken registrerer sin egen juridiske enhed og sin egen beskedkampagne, betaler Twilio direkte, vedligeholder samtykke fra modtagerne og håndterer godkendelse i Twilio Console. ChurchApps leverer integrationen og dokumentationen.

Start med ét beskedprogram, én Messaging Service og ét lokalt amerikansk 10DLC-afsendernummer pr. B1-kirke. Understøt enkeltbeskeder, gruppebeskeder, workflow-beskeder og tilmeldingspåmindelser via de eksisterende B1-skærme. Et rimeligt første program dækker ændringer i gudstjenesten, begivenhedspåmindelser og planlægning af frivillige, når alle tre er beskrevet i kirkens samtykke og i den godkendte kampagne. Indsamling af midler eller markedsføringsbeskeder kræver et særskilt vurderet omfang og eget samtykke; de må ikke stilles op i dette program uden videre.

| Ansvar | Kirken | B1 / ChurchApps |
|---|---|---|
| Twilio-konto, fakturering, ejerskab af numre | Ejer og administrerer dem | Opretter ikke en platformskonto og videresælger ikke kreditter |
| Brand, kampagne, registrering af numre | Indsender korrekte oplysninger om kirken; håndterer gennemgang og rettelser | Forklarer forudsætningerne og læser tilgængelige oplysninger om parathed |
| Tilmeldingsside, politikker, beskedens formål | Udgiver og vedligeholder dem | Leverer kompatible formularelementer, eksempler og samtykkeregistreringer |
| Modtagernes berettigelse og håndtering af STOP | Gennemgår dokumentation for samtykke og anmoder om samtykke, der er modtaget uden for SMS | Håndhæver samtykke, undertrykkelse, tilladelser og signerede webhooks |
| Levering og support | Overvåger Twilio-fejl, kontoens tilstand og indgående svar | Viser status for indsendelse og levering uden at love godkendelse |

Udsæt en ChurchApps-ejet Twilio-overordnet konto, kundeunderkonti, køb af numre, indsendelser til Trust Hub, fakturering, en samtaleindbakke, MMS/WhatsApp, internationalt afsendelse og onboarding af gratis numre (toll-free). Gratis numre er en separat vej med verificeret afsender og er ikke en omgåelse af registreringen. Disse grænser sikrer, at den første udgivelse følger B1's eksisterende model med egen udbyder.

## Eksisterende grundlag og huller

Følgende observationer er knyttet til kildekodens øjebliksbilleder og er ikke en antagelse om, hvad der er udrullet i øjeblikket:

| Komponent | Eksisterende adfærd | Konsekvens |
|---|---|---|
| [Udbyderregister og kontrakt](https://github.com/ChurchApps/Packages/tree/68c93d610031d3ed56d3582055413e851c5cb2ee/texting/src) | `ITextingProvider` har afsendelse af enkeltbeskeder og grupper, validering, valgfrie funktioner for abonnenter/lister og et udbyder-meddelelses-ID i resultaterne. Der er ingen registreret Twilio-adapter. | Tilføj Twilio i `@churchapps/texting`; den har hverken brug for oprettelse af abonnenter eller udbyderstyrede lister. |
| [Indstillinger for tekstbeskeder](https://github.com/ChurchApps/B1Admin/blob/e33cc2386d96e2e3cb24e760d458a72b699c71c3/src/settings/components/TextingSettingsEdit.tsx) | Clearstream, Text In Church og Nalo kan vælges; MinistryStuff er funktionsstyret. Redigering og lagring af afsender er i øjeblikket specifik for Nalo. | Tilføj eksplicitte Twilio-felter, validering, lagring af afsender og hjælp til opsætningen. En post i rullelisten alene er ikke nok. |
| [Controller](https://github.com/ChurchApps/Api/blob/82eda28b6803754548ce007bd52177a21700f118/src/modules/messaging/controllers/TextingController.ts) og [modulgateway](https://github.com/ChurchApps/Api/blob/82eda28b6803754548ce007bd52177a21700f118/src/shared/modules/MessagingModuleGateway.ts) | Legitimationsoplysninger krypteres og maskeres; manuelle og automatiske afsendelser finder kirkens udbyder. Gruppeafsendelser fjerner dubletter af delte telefonnumre. | Genbrug disse veje og bevar autorisationen. Placer nye porte for samtykke og parathed i en fælles serversti, så workflows ikke kan omgå dem. |
| [STOP-hjælper](https://github.com/ChurchApps/Api/blob/82eda28b6803754548ce007bd52177a21700f118/src/modules/messaging/helpers/SmsOptOutHelper.ts) | Læser Twilio-lignende `From`/`Body`; validerer et kirke-URL-token; sætter `person.optedOut` og deaktiverer SMS-påmindelser. Andre svar ignoreres. | Det er et nyttigt udgangspunkt, men ikke et komplet Twilio-webhook. Tilføj Twilio-signaturer og en uafhængig SMS-abonnementstilstand. |
| [Beskedskema](https://github.com/ChurchApps/Api/blob/82eda28b6803754548ce007bd52177a21700f118/tools/migrations/messaging/2026-04-03_initial_schema.ts) | Gemmer `apiKey`, `apiSecret` og et 20 tegn langt `fromNumber`. Leveringslogger gemmer øjeblikkelig succes/fejl, ikke udbyder-ID'er eller endelige leveringstilstande. | Et afsendernummer i E.164-format passer; et 34 tegn langt Messaging Service-SID kræver sit eget felt. Tilføj varig lagring af udbyderens meddelelses- og statusdata. |
| [Offentlig formularside](https://github.com/ChurchApps/B1App/blob/5ca19ee4ef947235b8ffba9fbb35af42d0dcb41d/src/app/%5BsdSlug%5D/%28public%29/%5BpageSlug%5D/%5Bid%5D/components/FormPage.tsx), [fælles formularrenderer](https://github.com/ChurchApps/Packages/blob/68c93d610031d3ed56d3582055413e851c5cb2ee/apphelper/src/forms/components/QuestionEdit.tsx) og [controller for indsendelser](https://github.com/ChurchApps/Api/blob/82eda28b6803754548ce007bd52177a21700f118/src/modules/membership/controllers/FormSubmissionController.ts) | Formularer uden begrænsninger og valgfrie afkrydsningsfelter findes. Beskrivelser er almindelig tekst. Indsendelser gemmer svarene, men tekstbeskedvejen har ingen samtykkeprotokol for den enkelte kampagne. | Tilføj et konfigureret samtykkefelt til SMS med rigtige links til politikker og registrering af bevis på serversiden. Et generisk afkrydsningsfelt eller medlemskab af en gruppe må ikke automatisk give tilladelse til SMS. |

Den [brugervendte dokumentation om kirkeindstillinger](../../b1-admin/settings/church-settings.md#texting) forklarer også, at det nuværende fravalgsflag deles med privatlivsindstillingen i kataloget. Den kobling er en udgivelsesbekymring: svar med START må aldrig ændre synligheden i kataloget.

## Konfiguration og design af legitimationsoplysninger

Brug eksplicitte, additive konfigurationsfelter i stedet for at overbelaste `fromNumber` eller gemme strukturerede data i en API-nøgle-streng:

| Felt | Foreslået formål |
|---|---|
| `accountSid` | Kirkeejet Twilio-konto-/projektidentifikator (`AC…`) |
| `apiKey`, `apiSecret` | Dedikeret Twilio API Key SID (`SK…`) og hemmelighed til udgående API-adgang; krypteret og maskeret |
| `webhookAuthToken` | Kontoens Auth Token, som Twilio-SDK'et bruger til at validere indgående signaturer; krypteret og maskeret separat |
| `messagingServiceSid` | Kirkens Messaging Service (`MG…`, 34 tegn) |
| `fromNumber` | Valgt SMS-kapabelt nummer i E.164-format, verificeret som afsender i kontoen/tjenesten |
| Programkonfiguration | Stabilt program-ID, navn, tilladte formål, URL'er til tilmelding/politikker og version af oplysningerne |

Twilio [foretrækker API-nøgler til REST-autentificering](https://www.twilio.com/docs/iam/api-keys). Brug de smalleste testede nøglerettigheder, der dækker afsendelse og de nødvendige skrivebeskyttede kontroller af opsætningen. Kontoens Auth Token er stadig nødvendig til [standardkontrollen af Twilio-webhookens signatur](https://www.twilio.com/docs/usage/security). Forklar denne forskel i brugerfladen: en API-hemmelighed er ikke et webhook-Auth Token. Gem legitimationsoplysninger udelukkende i den serverside indstillingslager, aldrig på offentlige sider, i formularsvar, i browserens afsendelsesanmodninger eller i supportsager.

Kirken opretter og administrerer disse ressourcer i Console. B1's valideringshandling må kun læse den konfigurerede tjeneste, afsendere og registreringsoplysninger. Den må ikke købe numre, oprette kampagner, ændre Twilio-indstillinger eller sende en testbesked som en bivirkning. Tilbyd en særskilt, eksplicit handling til testafsendelse, begrænset til en berettiget modtager, der har givet samtykke.

Bevar maskerede legitimationsoplysninger kun, når den samme gemte udbyder redigeres. Skift til Twilio skal kræve egne legitimationsoplysninger og rydde forældede udbyderspecifikke værdier; overfør ikke en maskeret Clearstream- eller Nalo-nøgle til en Twilio-konfiguration.

Afgræns alle indlæsninger og opdateringer til den godkendte B1-kirke. Bind callbacks til en gemt integration og den forventede Twilio-konto/tjeneste/afsender, og afvis modstridende tildelinger på tværs af kirker. Rotation af legitimationsoplysninger og afbrydelse af udbyderen skal ugyldiggøre parathed og sætte ventende afsendelser på pause uden at slette samtykke eller historiske leveringsdata.

## Samtykke og undertrykkelse er påkrævet arbejde før udgivelse

Introducer abonnementsposter bundet til telefonnummeret for Twilio-programmet samt hændelser for samtykke/undertrykkelse, der kun tilføjes. Det foreslåede minimum af dokumentation er: kirke-ID, program-ID, normaliseret telefonnummer, eventuel verificeret tilknytning til en person, bekræftende handling, kilde-formular-ID/indsendelses-ID eller gennemgået ekstern dokumentation, tidsstempel fra serveren, tekst og version af oplysningerne, kilde-URL, URL'er til politikker og hændelser for tilbagetrækning/genstart. Begræns adgangen og opbevaringstiden i henhold til kirkens eksisterende politik for datasikkerhed.

Brug tilstande som `unknown`, `pending`, `active` og `suppressed`. Eksisterende mobilnumre, importerede kontakter, deltagelse, donationer, gruppemedlemskab, `person.optedOut = false` og `allowSms` er ikke et bekræftende samtykke til programmet. Import af dokumenteret samtykke skal være en handling med tilladelse, der revideres og har en registreret kilde; en migrering må ikke tilmelde alle.

Til det første webflow bruger du B1's standardtilstand for offentlige formularer. Tilføj et eksplicit konfigureret spørgsmål om samtykke til SMS, som starter uden markering, forbliver valgfrit, viser klikbare links til politikker og knyttes til ét program og ét mobilfelt. Valider denne kobling på serveren, og gem den viste oplysning som et øjebliksbillede, når et bekræftende svar gemmes. Udled aldrig samtykke fra vilkårlige spørgsmålstekster, samtaler med AI eller medlemskab af et workflow. Aktivér en samtalebaseret pendant først, når dens eksplicitte bekræftende interaktion og registrering af dokumentation er testet.

En indsendelse uden markering opretter intet abonnement og må ikke trække en andens eksisterende samtykke tilbage. Bind samtykket til det indsendte telefonnummer; medarbejdere kan afklare tvetydige tilknytninger til personer uden at flette husstandsposter sammen. Et ændret mobilnummer kræver sit eget samtykke. Til anonyme formularer skal der anvendes beskyttelse mod misbrug, og ethvert trin til verifikation af nummerets ejerskab eller dobbelt tilmelding skal være eksplicit; et afkrydset felt alene beviser ikke, hvem der ejer telefonnummeret. Hvis der bruges en bekræftelse, skal abonnementet forblive afventende, indtil den er gennemført, og det præcise forløb skal beskrives i registreringsmaterialet.

For Twilio skal undertrykkelse af SMS holdes adskilt fra synlighed i kataloget. Migrér konservativt eventuelle ældre fravalg til en undertrykkelsespost; andre ældre modtagere forbliver `unknown`. En eksplicit, dokumenteret ny tilmelding kan etablere samtykke til SMS, mens privatlivsindstillingen i kataloget forbliver uændret. Bevar de øvrige udbyderes adfærd, indtil deres migreringer er gennemgået separat.

Ved hver faktisk afsendelse skal integrationen for kirken være aktiveret/klar, der skal være aktuelt samtykke til programmet for det præcise telefonnummer, der må ikke være undertrykkelse på telefonnummerniveau, og den eksisterende tilladelse for den, der foretager kaldet, skal være til stede. Påmindelser respekterer desuden `allowSms`, præferencer for kategorier og stille timer. Kontrollér igen efter købsanmodningen er sat i kø, opløs flettefelter, normalisér og valider numre, og fjern dubletter pr. telefonnummer. STOP undertrykker al afsendelse for tjenesten/programmet, herunder manuelle afsendelser og workflows; det skal også dække alle personer, der deler det telefonnummer.

Vis kirkens identitet og STOP-instruktionen konsekvent i den fælles Twilio-afsendelsesvej, og vis en forhåndsvisning af det endelige antal SMS/segmenter. Udfyldning af flettefelter og håndtering af længde skal bevare disse elementer; afkort ikke stille og roligt instruktionen om fravalg. Hold eksempler og de faktiske skabeloner til påmindelser og workflows i overensstemmelse.

## Twilio-afsendelser, svar og leveringsstatus

Implementér `TwilioProvider.sendMessage` via Messages API med den valgte Messaging Service og afsender. Returnér et SID for udbyderens besked og et resultat af typen accepteret/indsendt; HTTP-accept er ikke levering til modtagerens telefon. En gruppeafsendelse bruger resultater pr. modtager i inputrækkefølge.

Begræns samtidigheden for udgående beskeder for **både** `sendBulk` og enkeltafsendelser: den nuværende gren med flettefelter kører `sendMessage`-kald parallelt. Gem hensigten med afsendelsen og arbejde, der kan gøres krav på, for grupper, der ikke kan være inden for et budget for én anmodning; genbrug den eksisterende udrulningsmodel i stedet for at kræve, at kirker kører en anden tjeneste. Forsøg igen ved kendte midlertidige fejl og grænsefejl med backoff. Behandl tvetydige timeouts som ukendte resultater, der skal afstemmes, og ikke som en instruktion om blindt at sende igen med risiko for dublerede beskeder og gebyrer.

Konfigurer kirkespecifikke URL'er til indgående beskeder og statuscallbacks. Valider `X-Twilio-Signature` med SDK'et, den præcise konfigurerede eksterne URL, de oprindelige formularparametre og det tilsvarende Auth Token for kontoen. En hemmelig URL alene er ikke tilstrækkelig. Knyt callbacks til gemte poster for kirke/konto/besked, håndtér dubletter og callbacks, der ankommer, før resultatet af afsendelsen er gemt, og forhindr ældre hændelser i at overskrive en endelig status. Returnér tomt TwiML som kvittering for indgående beskeder og et passende successvar for statushændelser. [Twilio-sikkerhed](https://www.twilio.com/docs/usage/security), [statuscallbacks](https://www.twilio.com/docs/messaging/guides/track-outbound-message-status)

Anbefal Messaging Service **Advanced Opt-Out**. Twilio står for bekræftelserne af STOP/START/HELP; B1 bruger autentificerede `OptOutType`-hændelser uden at sende dublerede bekræftelser. STOP registrerer undertrykkelse med det samme. START genopretter kun et kendt abonnement til dette samme oplyste program, med en ny genstartshændelse; det må ikke tilmelde et nyt telefonnummer til ikke-relaterede beskeder eller aktivere påmindelsespræferencer. HELP tilmelder ikke nogen. Andre indgående svar ligger uden for B1's indbakkes omfang; kirker har brug for en dokumenteret måde at følge dem op på i Twilio. [Advanced Opt-Out](https://www.twilio.com/docs/messaging/tutorials/advanced-opt-out)

Gem Twilios besked-SID, binding til konto/tjeneste, tidspunkt for indsendelse, endelig status/fejlkode og tidspunkt for callback sammen med leveringsloggen. Vis køet/accepteret, leveret, mislykket, ikke leveret eller ukendt korrekt. Bevar den eksisterende svarkontrakt for de øvrige udbydere, og definér, om samlede succestal betyder indsendelse eller levering.

## Opsætningsparathed og validering af godkendelse

Vis særskilte kontrolpunkter for legitimationsoplysninger, ejerskab af tjeneste/afsender, verifikation af kampagne, registrering af nummer, kontrol af webhooks og en leveret testbesked. Vis aldrig et enkelt grønt mærke "godkendt" blot fordi legitimationsoplysningerne virker.

For lokale amerikanske numre læses tjenestens [Usa2p-kampagneressource](https://www.twilio.com/docs/messaging/api/usapptoperson-resource), og den relevante kampagne skal være `VERIFIED`. Verificér desuden særskilt, at det valgte telefonnummer er knyttet til tjenesten og har gennemført registreringen af nummeret: en godkendt kampagne kan stadig have et nummer, der er afventende. Hvis en understøttet læse-API ikke eksponerer et nødvendigt signal, vises **manuel verifikation i Console påkrævet**, og kirkeadministratorens daterede bekræftelse registreres som netop dette; mærk den ikke som API-verificeret. Automatiske hændelser ved registrering af nummer kan være en opfølgning. [Fejl ved registrering af nummer](https://www.twilio.com/docs/api/errors/30035), [hændelser ved A2P-registrering](https://www.twilio.com/docs/messaging/compliance/a2p-10dlc/event-streams-setup)

Kræv aktuelle kontroller, før afsendelse aktiveres. Registrér hvornår og hvordan parathed blev kontrolleret, lad forældede kontroller udløbe, og sæt på pause ved tilbagekaldte legitimationsoplysninger, ændrede afsendere, fejl ved registrering eller vedvarende kontofejl. At en testbesked leveres bekræfter kun den testede vej, ikke generel godkendelse hos mobiludbyderne eller samtykke fra modtageren. Udkastet til onboarding beskriver kirkens kontroller før indsendelse, før lancering og i den løbende drift.

## Repository- og udgivelsesplan

[Organisationens bidragsguide](https://github.com/ChurchApps/.github/blob/main/CONTRIBUTING.md) sender forslag til nye funktioner i B1 til ChurchAppsSupport og implementerings-PR'er til de repositories, der ejer koden. Brug ét centralt forslag til funktion og knyt fokuserede implementerings-PR'er til det:

1. **ChurchAppsSupport:** gennemgå dette design og udkastet til onboarding, før Twilio præsenteres som en tilgængelig funktion for brugerne.
2. **Packages:** tilføj Twilio-adapteren, eksplicit delt konfiguration/delte grænseflader og gengivelse af formularer til SMS-samtykke, hvor det deles af B1Admin/B1App. Inkludér changesets og publicér via den eksisterende udgivelsesworkflow, før forbrugerne opdateres.
3. **Api:** tilføj additive migreringer for integrationsmetadata, samtykke/undertrykkelse og leveringsstatus; implementér validering af konfiguration, fælles porte for afsendelse, indsamling af dokumentation fra formularer, håndtering af webhooks og varig lagring af afsendelser.
4. **B1Admin:** tilføj brugerflade for konfiguration og parathed for Twilio, administration af program/samtykke, afsenderlagring der er udbyderbevidst, og præcis rapportering af levering. Eksponér ingen overstyring af samtykke til SMS via almindelig redigering af personer.
5. **B1App:** verificér den offentlige formular/side og oplevelsen med links til politikker mod de delte kontroller, inklusive anonyme besøgende og besøgende på mobil. Der er ingen særskilt Twilio-klient i browseren.
6. **ChurchAppsSupport:** efter udgivelsen omdannes udkastet til onboarding til understøttede sider med indstillinger og hjælp, tilføjes rigtige skærmbilleder, linkes fra indstillingerne for tekstbeskeder, og oversættelser arrangeres.

Udrul skemaet og de delte pakker før forbrugerne. Hold Twilio funktionsstyret til en lille pilot med tilvalg; de eksisterende udbydere skal fortsat virke. Tilbagerulning deaktiverer afsendelse via Twilio og annullerer ikke-indsendte jobs, mens fravalg og dokumentation bevares; den må ikke automatisk skifte modtagere til en anden udbyder eller afsender.

## Estimat af indsats

Planlægningsestimat for en bidragyder, der kender økosystemet; der er ikke brugt produktionslegitimationsoplysninger eller levende SMS i denne vurdering:

| Arbejde | Udviklerdage |
|---|---|
| Adapter, udvidelser af konfiguration/skema, brugerflade for indstillinger | 2–3 |
| Samtykke pr. telefonnummer/program, uafhængig undertrykkelse, fælles porte for afsendelse, integration med offentlig formular | 3–5 |
| Signerede callbacks, lagring af levering, afgrænset/varig afsendelse | 2–3 |
| Brugerflade for parathed, vejledning til kirken, test af integration og regression, rettelser fra pilot | 3–4 |
| **Anbefalet omfang ved lancering** | **10–15 i alt** |

Et simpelt proof of concept for adapter/indstillinger er cirka 1–2 dage. Et estimat, der kun dækker afsendelse, udelukker det samtykke- og onboardingarbejde, som denne anbefaling kræver. Gennemgangstid hos Twilio/mobiludbyderne er separat og varierer; projektet må ikke love en dato for godkendelse eller et godkendelsesresultat.

## Acceptkriterier

- [ ] Kirken ejer og betaler for kontoen, tjenesten, den registrerede afsender og kampagnen; der kræves ingen Twilio-konto administreret af ChurchApps.
- [ ] Legitimationsoplysninger er krypteret/maskeret, afgrænset til kirken, kan roteres og findes ikke i logfiler eller offentligt indhold; valideringen er skrivebeskyttet.
- [ ] Valgfrit samtykke uden markering viser rigtige links til politikker og gemmer program-, telefonnummer- og oplysningsdokumentation på serveren; afvisning tillader stadig den primære handling i formularen.
- [ ] Alle manuelle stier, gruppestier, stier med flettefelter, workflow-stier og påmindelsesstier håndhæver den samme berettigelsesport for Twilio. Modtagere med ukendt status, uden samtykke, med ændret telefonnummer eller undertrykkede modtagere springes over med en nyttig begrundelse; gengivelsen bevarer identiteten for kirken og STOP-instruktionerne efter udvidelse og længdehåndtering.
- [ ] Privatlivsindstillingen i kataloget for ældre data tilmelder ingen modtagere; STOP/START ændrer aldrig synligheden i kataloget eller ikke-relaterede præferencer. Tilfælde med delte telefonnumre og på tværs af kirker er testet.
- [ ] Signerede STOP/START/HELP, ugyldige signaturer, forkerte konti/tjenester, dublerede hændelser, gensendte indsendelser af formularer og forfalskede koblinger til samtykke er dækket.
- [ ] Gruppestørrelse/timeouts, grænser for hastighed, delvise fejl, tvetydige resultater, kapløb mellem callbacks og leveringshændelser i forkert rækkefølge er testet uden dublerede afsendelser.
- [ ] Godkendelse af kampagne og fuldført registrering af nummer er adskilt fra validering af legitimationsoplysninger. Manuel dokumentation er tydeligt mærket; forældet eller tilbagekaldt parathed blokerer afsendelser.
- [ ] En pilotkirke kontrollerer sin tilmeldingsside, de afviste og accepterede formularforløb, de præcise URL'er til politikker og en testmodtager, der har givet samtykke, gennem indsendelse, levering, undertrykkelse ved STOP og tilladt genindmeldelse.
- [ ] De eksisterende indstillinger og afsendelsesadfærd for Clearstream, Text In Church og Nalo består regressionstests; hjælpetekster skelner mellem forslag og udgivne funktioner.
