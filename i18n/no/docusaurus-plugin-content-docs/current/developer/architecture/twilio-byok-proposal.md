---
title: "Twilio BYOK (forslag)"
description: "Foreslått kirkeeid Twilio-integrasjon, samtykkemodell, omfang for implementering og kriterier for utgivelse."
---

# Forslag om Twilio BYOK-integrasjon

:::caution Forslag — ikke en tilgjengelig integrasjon
Dette er en design for gjennomgang av vedlikeholdere, basert på offentlig kildekode og Twilio-dokumentasjon gjennomgått 22. oktober 2026. Siden da er en grunnleggende Twilio-leverandør sluppet (`@churchapps/texting` 0.6.0 og B1 Admin **Settings > Texting**): kirken legger inn sin Account SID, Auth Token og et From-nummer (leverandøren godtar også en Messaging Service SID som begynner med `MG`, men kolonnen `fromNumber` er fortsatt `varchar(20)`, for kort for en SID på 34 tegn). Tekstmeldinger sendes med én forespørsel per mottaker gjennom Twilios Messages API, og STOP-svar når B1 gjennom den eksisterende webhooken for innkommende meldinger. Se [Kirkeinnstillinger: Texting](../../b1-admin/settings/church-settings.md#texting). Samtykkemodellen, håndteringen av avansert reservasjon, leveringsstatus og kontroller av klarhet for oppsett som beskrives nedenfor, er fortsatt forslag og ikke levert oppførsel. Den tilhørende [utkastet til kirkens onboarding](./twilio-byok-onboarding-draft) inneholder foreslått veiledning for oppsett og eksempler spesifikke for kirker.
:::

## Anbefalt løsning

Legg Twilio til i B1s eksisterende leverandørsystem for tekstmeldinger, med **en kirkeeid Twilio-konto, API-legitimasjon, Messaging Service og et SMS-kapabelt telefonnummer**. Kirken registrerer sin egen juridiske enhet og sin egen meldingskampanje, betaler Twilio direkte, vedlikeholder samtykket fra mottakerne og håndterer godkjenning i Twilio Console. ChurchApps leverer integrasjonen og dokumentasjonen.

Start med ett meldingsprogram, én Messaging Service og ett lokalt amerikansk 10DLC-avsendernummer per B1-kirke. Støtt enkeltmeldinger, gruppemeldinger, arbeidsflytmeldinger og påminnelser om påmelding gjennom de eksisterende B1-skjermene. Et rimelig første program dekker endringer i gudstjenester, arrangementspåminnelser og planlegging av frivillige, når alle tre er beskrevet i kirkens samtykke og i den godkjente kampanjen. Innsamling eller markedsføringsmeldinger krever et eget vurdert omfang og eget samtykke. Ikke legg dem stille til i dette programmet.

| Ansvar | Kirke | B1 / ChurchApps |
|---|---|---|
| Twilio-konto, fakturering, eierskap til nummer | Eier og administrerer dem | Oppretter ikke en plattformkonto og selger ikke kreditt videre |
| Merkevare, kampanje, registrering av nummer | Sender inn korrekt informasjon om kirken; håndterer gjennomgang og rettelser | Forklarer forutsetningene og leser tilgjengelig informasjon om klarhet |
| Påmeldingsside, retningslinjer, meldingens formål | Publiserer og vedlikeholder dem | Leverer kompatible skjemakontroller, eksempler og samtykkeregistreringer |
| Mottakernes kvalifisering og håndtering av STOP | Gjennomgår dokumentasjon for samtykke og ber om samtykke som er mottatt utenfor SMS | Håndhever samtykke, undertrykking, tillatelser og signerte webhooks |
| Levering og brukerstøtte | Følger med på feil fra Twilio, kontohelse og innkommende svar | Viser status for innsending og levering uten å love godkjenning |

Utsett en ChurchApps-eid overordnet Twilio-konto, underkontoer for kunder, kjøp av nummer, innsending til Trust Hub, fakturering, en samtaleinnboks, MMS/WhatsApp, internasjonal sending og onboarding for gratisnummer. Gratisnummer er en egen vei for verifisert avsender, ikke en omgåelse av registrering. Disse grensene holder den første utgivelsen på linje med B1s eksisterende modell med egen leverandør (bring-your-own-provider).

## Eksisterende grunnlag og mangler

Følgende observasjoner er knyttet til kildekodeøyeblikksbilder, og er ikke en antakelse om hva som faktisk er satt i drift:

| Komponent | Eksisterende oppførsel | Konsekvens |
|---|---|---|
| [Leverandørregister og kontrakt](https://github.com/ChurchApps/Packages/tree/68c93d610031d3ed56d3582055413e851c5cb2ee/texting/src) | `ITextingProvider` har sending av enkeltmeldinger og grupper, validering, valgfrie funksjoner for abonnenter/lister og en leverandør-meldings-ID i resultatene. Ingen Twilio-adapter er registrert. | Legg til Twilio i `@churchapps/texting`; den trenger verken oppretting av abonnenter eller lister som leverandøren administrerer. |
| [Innstillinger for tekstmeldinger](https://github.com/ChurchApps/B1Admin/blob/e33cc2386d96e2e3cb24e760d458a72b699c71c3/src/settings/components/TextingSettingsEdit.tsx) | Clearstream, Text In Church og Nalo kan velges; MinistryStuff er funksjonsstyrt. Redigering og lagring av avsender gjelder foreløpig bare Nalo. | Legg til egne Twilio-felt, validering, lagring av avsender og hjelp ved onboarding. Et oppføring i rullegardinmenyen alene er ikke nok. |
| [Kontroller](https://github.com/ChurchApps/Api/blob/82eda28b6803754548ce007bd52177a21700f118/src/modules/messaging/controllers/TextingController.ts) og [modulgateway](https://github.com/ChurchApps/Api/blob/82eda28b6803754548ce007bd52177a21700f118/src/shared/modules/MessagingModuleGateway.ts) | Legitimasjon krypteres og maskeres; manuelle og automatiske sendinger finner kirkens leverandør. Gruppesendinger fjerner dobbeltoppføringer av delte telefonnumre. | Gjenbruk disse banene og bevar tilgangskontrollen. Legg nye samtykke- og klarhetskontroller i en felles serverbane, slik at arbeidsflyter ikke kan omgå dem. |
| [STOP-hjelper](https://github.com/ChurchApps/Api/blob/82eda28b6803754548ce007bd52177a21700f118/src/modules/messaging/helpers/SmsOptOutHelper.ts) | Tolker Twilio-lignende `From`/`Body`; validerer et token i kirkens URL; setter `person.optedOut` og slår av SMS-påminnelser. Andre svar ignoreres. | Dette er et nyttig utgangspunkt, ikke en fullstendig Twilio-webhook. Legg til Twilio-signaturer og en egen tilstand for SMS-abonnement. |
| [Skjema for meldinger](https://github.com/ChurchApps/Api/blob/82eda28b6803754548ce007bd52177a21700f118/tools/migrations/messaging/2026-04-03_initial_schema.ts) | Lagrer `apiKey`, `apiSecret` og et `fromNumber` på 20 tegn; leveringslogger lagrer øyeblikkelig suksess eller feil, ikke leverandør-ID-er eller endelige leveringstilstander. | Et sendernummer i E.164-format passer; en Messaging Service SID på 34 tegn trenger eget felt. Legg til varig lagring av leverandørens meldings-ID og status. |
| [Offentlig skjemaside](https://github.com/ChurchApps/B1App/blob/5ca19ee4ef947235b8ffba9fbb35af42d0dcb41d/src/app/%5BsdSlug%5D/%28public%29/%5BpageSlug%5D/%5Bid%5D/components/FormPage.tsx), [felles skjemarenderer](https://github.com/ChurchApps/Packages/blob/68c93d610031d3ed56d3582055413e851c5cb2ee/apphelper/src/forms/components/QuestionEdit.tsx) og [kontroller for innsendinger](https://github.com/ChurchApps/Api/blob/82eda28b6803754548ce007bd52177a21700f118/src/modules/membership/controllers/FormSubmissionController.ts) | Ubegrensede skjemaer og valgfrie avkrysningsbokser finnes. Beskrivelser er ren tekst. Innsendinger beholder svarene, men meldingsbanen har ingen samtykkeregister for det enkelte kampanjeprogrammet. | Legg til en konfigurert kontroll for SMS-samtykke med ekte lenker til retningslinjer og lagring av bevis på serversiden. En generell avkrysningsboks eller gruppemedlemskap må ikke automatisk gi tillatelse til SMS. |

[Dokumentasjonen om kirkeinnstillinger](../../b1-admin/settings/church-settings#texting) forklarer også at det gjeldende flagget for reservasjon deles med personvern i katalogen. Denne koblingen er et problem før utgivelse: svaret START må aldri endre synligheten i katalogen.

## Konfigurasjon og utforming av legitimasjon

Bruk eksplisitte, tilleggsbaserte konfigurasjonsfelt i stedet for å overbelaste `fromNumber` eller lagre strukturerte data i en API-nøkkelstreng:

| Felt | Foreslått formål |
|---|---|
| `accountSid` | Kirkeeid Twilio-konto/prosjektidentifikator (`AC…`) |
| `apiKey`, `apiSecret` | Dedikert Twilio API Key SID (`SK…`) og hemmelighet for utgående API-tilgang; kryptert og maskert |
| `webhookAuthToken` | Kontoens Auth Token, brukt av Twilio-SDK-en til å validere innkommende signaturer; krypteres og maskeres separat |
| `messagingServiceSid` | Kirkens Messaging Service (`MG…`, 34 tegn) |
| `fromNumber` | Valgt SMS-kapabelt nummer i E.164-format, verifisert som avsender i den kontoen/tjenesten |
| Programkonfigurasjon | Stabil program-ID, navn, tillatte formål, URL-er for påmelding og retningslinjer, og versjon av opplysningstekst |

Twilio [foretrekker API-nøkler for REST-autentisering](https://www.twilio.com/docs/iam/api-keys). Bruk de smaleste testede nøkkeltillatelsene som dekker sending og de nødvendige skrivebeskyttede oppsettskontrollene. Kontoens Auth Token trengs fortsatt for [standard kontroll av Twilio-webhook-signatur](https://www.twilio.com/docs/usage/security). Forklar dette skillet i brukergrensesnittet: en API-hemmelighet er ikke en webhook-Auth Token. Legitimasjon skal bare ligge i den serverside innstillingslageret, aldri på offentlige sider, i skjemasvar, i nettleserforespørsler om sending eller i supportsaker.

Kirken oppretter og administrerer disse ressursene i Console. B1s valideringshandling må bare lese den konfigurerte tjenesten, avsenderne og registreringsinformasjonen. Den må ikke kjøpe nummer, opprette kampanjer, endre Twilio-innstillinger eller sende en testmelding som en bieffekt. Tilby en egen, eksplisitt testsending som bare er begrenset til en kvalifisert mottaker som har samtykket.

Bevar maskert legitimasjon bare når du redigerer den samme lagrede leverandøren. Ved bytte til Twilio må det kreves egen legitimasjon, og foreldede leverandørspesifikke verdier må fjernes. Overfør ikke en maskert Clearstream- eller Nalo-nøkkel til en Twilio-konfigurasjon.

Avgrens alle innlastinger og oppdateringer til den autentiserte B1-kirken. Knytt tilbakekall til en lagret integrasjon og forventet Twilio-konto/tjeneste/avsender, og avvis motstridende tilordninger på tvers av kirker. Rotasjon av legitimasjon og frakobling av leverandør må ugyldiggjøre klarhet og pause køede sendinger, uten å slette samtykke eller historiske leveringsdata.

## Samtykke og undertrykking er påkrevd arbeid før utgivelse

Innfør abonnementsposter knyttet til telefonnummer for Twilio-programmet, pluss hendelser for samtykke og undertrykking som bare kan legges til. Foreslått minimum av bevis er: kirke-ID, program-ID, normalisert telefonnummer, eventuell verifisert kobling til en person, bekreftende handling, kilde-skjema-ID eller innsendings-ID eller gjennomgått ekstern dokumentasjon, tidsstempel fra serveren, tekst og versjon av opplysningen, kilde-URL, URL-er for retningslinjer, og hendelser for tilbaketrekking og ny start. Begrens tilgang og oppbevaringstid i henhold til kirkens eksisterende retningslinjer for datasikkerhet.

Bruk tilstander som `unknown`, `pending`, `active` og `suppressed`. Eksisterende mobilnumre, importerte kontakter, oppmøte, gaver, gruppemedlemskap, `person.optedOut = false` og `allowSms` er ikke bekreftende samtykke til programmet. Import av dokumentert samtykke skal være en handling som krever tillatelse, er revisjonsført og har registrert kilde. En migrering må ikke melde alle inn.

For den første nettflyten bruker du B1s standard modus for offentlige skjemaer. Legg til et eksplisitt konfigurert spørsmål om SMS-samtykke som starter uten avkrysning, forblir valgfritt, viser klikkbare lenker til retningslinjer og knyttes til ett program og ett mobilfelt. Valider koblingen på serversiden, og lagre den viste opplysningen når et bekreftende svar lagres. Utled aldri samtykke fra vilkårlige spørsmålsetiketter, samtalebasert KI eller arbeidsflytmedlemskap. Aktiver en samtalebasert ekvivalent først etter at den eksplisitte bekreftende interaksjonen og registreringen av bevis er testet.

En innsending uten avkrysning oppretter ingen abonnement og må ikke trekke tilbake andres eksisterende samtykke. Knytt samtykket til det innsendte telefonnummeret. Ansatte kan avklare tvetydige koblinger til personer uten å slå sammen husstander. Et endret mobilnummer trenger eget samtykke. For anonyme skjemaer må du innføre misbrukskontroller og gjøre eventuell verifisering av eierskap til nummeret eller et dobbelt opt-in-trinn eksplisitt; en avkrysset boks alene beviser ikke hvem som eier et telefonnummer. Hvis bekreftelse brukes, skal abonnementet forbli `pending` til den er fullført, og den nøyaktige flyten skal beskrives i registreringsmaterialet.

For Twilio skiller du SMS-undertrykking fra synlighet i katalogen. Migrer konservativt eventuell eldre reservasjon til en undertrykkingspost; la andre eldre mottakere være `unknown`. En eksplisitt, dokumentert ny påmelding kan etablere SMS-samtykke, mens personvernet i katalogen forblir uendret. Bevar andre leverandørers oppførsel til deres migreringer er vurdert separat.

Ved hver faktiske sending må integrasjonen for kirken være aktivert og klar, det må finnes gjeldende samtykke til programmet for det eksakte telefonnummeret, det må ikke finnes undertrykking på telefonnivå, og den eksisterende tillatelsen for den som kaller må være til stede. Påminnelser må i tillegg respektere `allowSms`, innstillinger for kategorier og stille timer. Kontroller på nytt etter køsetting, løs opp flettefelt, normaliser og valider numre, og fjern dobbeltoppføringer på telefonnummer. STOP undertrykker alle sendinger for tjenesten/programmet, inkludert manuelle sendinger og arbeidsflyter. Det må også dekke alle personer som deler det telefonnummeret.

Gjengi kirkens identitet og STOP-instruksen konsekvent i den felles Twilio-sendebanen, og vis den endelige SMS-teksten og antall segmenter før sending. Ekspansjon av flettefelt og håndtering av lengde må bevare disse elementene; avkort ikke instruksen for reservasjon stille. Hold eksempler og faktiske maler for påminnelser og arbeidsflyter på linje.

## Twilio-sendinger, svar og leveringstilstand

Implementer `TwilioProvider.sendMessage` gjennom Messages API med den valgte Messaging Service og avsenderen. Returner en leverandørmeldings-SID og et resultat som er akseptert/sendt; HTTP-aksept er ikke levering til mobilen. En gruppesending bruker resultat per mottaker i inndatarekkefølge.

Begrens samtidige utgående forespørsler for **både** `sendBulk` og enkeltsendinger: den nåværende grenen for flettefelt sprer `sendMessage`-kall. Lagre sendeintensjon og arbeid som kan kreves for grupper som ikke får plass innenfor en forespørselsbudsjett; gjenbruk den eksisterende distribusjonsmodellen i stedet for å kreve at kirker kjører en annen tjeneste. Prøv på nytt ved kjente midlertidige feil og begrensningsfeil med backoff. Behandle tvetydige tidsavbrudd som ukjente utfall som må avstemmes, ikke som en instruksjon om å sende på nytt blindt, siden det kan gi dobbelte meldinger og dobbel belastning.

Konfigurer kirkespesifikke URL-er for innkommende meldinger og statustilbakekall. Valider `X-Twilio-Signature` med SDK-en, den nøyaktige konfigurerte eksterne URL-en, de opprinnelige skjemaparametrene og den tilsvarende Auth Token for kontoen. En hemmelig URL alene er ikke nok. Knytt tilbakekall til lagrede poster for kirke/konto/meldinger, håndter duplikater og tilbakekall som kommer før sendingsresultatet er lagret, og hindre at eldre hendelser overskriver en endelig status. Returner tom TwiML som bekreftelse på innkommende meldinger, og et passende suksessvar for statushendelser. [Twilio-sikkerhet](https://www.twilio.com/docs/usage/security), [statustilbakekall](https://www.twilio.com/docs/messaging/guides/track-outbound-message-status)

Anbefal **Advanced Opt-Out** i Messaging Service. Twilio eier bekreftelsene for STOP/START/HELP; B1 bruker autentiserte `OptOutType`-hendelser uten å sende dupliserte bekreftelser. STOP registrerer undertrykking med én gang. START gjenoppretter bare et kjent abonnement til dette samme opplyste programmet, med en ny hendelse for ny start; det må ikke melde en ny telefon inn i urelaterte meldinger eller slå på innstillinger for påminnelser. HELP melder ingen inn. Andre innkommende svar er fortsatt utenfor omfanget av B1-innboksen; kirker trenger en dokumentert måte å følge dem opp i Twilio på. [Advanced Opt-Out](https://www.twilio.com/docs/messaging/tutorials/advanced-opt-out)

Lagre Twilio-meldings-SID-en, bindingen til konto/tjeneste, tidspunkt for innsending, endelig status/feilkode og tidspunkt for tilbakekallet sammen med leveringsloggen. Vis køet/akseptert, levert, feilet, ikke levert eller ukjent på riktig måte. Behold det eksisterende svarkontraktet for andre leverandører, og definer om aggregerte suksesstall viser innsending eller levering.

## Oppsettklarhet og kontroll av godkjenning

Vis tydelige kontrollpunkter for legitimasjon, eierskap til tjeneste/avsender, verifisering av kampanje, registrering av nummer, webhook-kontroller og en levert røyktest. Vis aldri et enkelt grønt merke for «godkjent» bare fordi legitimasjonen fungerer.

For lokale amerikanske numre leser du tjenestens [Usa2p-kampanjeressurs](https://www.twilio.com/docs/messaging/api/usapptoperson-resource) og krever at den relevante kampanjen er `VERIFIED`. Verifiser separat at det valgte telefonnummeret er knyttet til tjenesten og har fullført registreringen av nummeret: en godkjent kampanje kan fortsatt ha et nummer som venter. Der en støttet lese-API ikke viser et nødvendig signal, vis **manuell verifisering i Console kreves**, og registrer kirkeadministratorens daterte bekreftelse som nettopp det. Ikke merk den som verifisert via API. Automatiske hendelser for registrering av nummer kan komme som en oppfølging. [Feil ved registrering av nummer](https://www.twilio.com/docs/api/errors/30035), [hendelser for A2P-registrering](https://www.twilio.com/docs/messaging/compliance/a2p-10dlc/event-streams-setup)

Krev oppdaterte kontroller før sending aktiveres. Registrer når og hvordan klarheten ble kontrollert, la foreldede kontroller utløpe, og pause ved tilbakekalt legitimasjon, endrede avsendere, feil ved registrering eller vedvarende kontofeil. At en røyktest leveres bekrefter den testede banen, ikke universell godkjenning fra operatører eller samtykke fra mottakere. Utkastet som følger med spesifiserer kirkens kontroller før innsending, før lansering og i den løpende driften.

## Repository og utgivelsesplan

[Retningslinjene for bidrag i organisasjonen](https://github.com/ChurchApps/.github/blob/main/CONTRIBUTING.md) sender forespørsler om nye funksjoner i B1 til ChurchAppsSupport og implementeringsPR-er til de eide repositoriene. Bruk én sentral forespørsel om funksjon, og knytt fokuserte implementeringsPR-er til den:

1. **ChurchAppsSupport:** gjennomgå dette designet og utkastet til onboarding før Twilio presenteres som en tilgjengelig funksjon for brukere.
2. **Packages:** legg til Twilio-adapteren, eksplisitt delt konfigurasjon/grensesnitt og gjengivelse av skjema for SMS-samtykke der det deles av B1Admin/B1App. Inkluder changesets og publiser gjennom den eksisterende utgivelsesarbeidsflyten før konsumenter oppdateres.
3. **Api:** legg til tilleggsmigreringer for metadata om integrasjoner, samtykke/undertrykking og leveringstilstander; implementer validering av konfigurasjon, felles sendekontroller, lagring av bevis fra skjemaer, håndtering av webhooks og varig lagring av utsendinger.
4. **B1Admin:** legg til konfigurasjons- og klarhetsgrensesnitt for Twilio, administrasjon av program og samtykke, lagring av avsender som tar hensyn til leverandør, og nøyaktig rapportering av levering. Gi ingen overstyring av SMS-samtykke gjennom vanlige endringer av personer.
5. **B1App:** verifiser den offentlige skjemasiden/-siden og opplevelsen med lenker til retningslinjer mot de delte kontrollene, inkludert anonyme besøkende og mobilbrukere. Det trengs ingen egen Twilio-klient i nettleseren.
6. **ChurchAppsSupport:** etter utgivelse gjør du utkastet til onboarding om til støttede sider om innstillinger/hjelp, legger til faktiske skjermbilder, lenker til det fra innstillingene for tekstmeldinger, og ordner oversettelser.

Rull ut skjema og delte pakker før konsumentene. Hold Twilio funksjonsstyrt for et lite pilotprogram der man må velge det aktivt; eksisterende leverandører må fortsette å fungere. Tilbakerulling deaktiverer Twilio-utsending og avbryter ikke-innsendte jobber, men bevarer reservasjoner og bevis. Den må ikke automatisk bytte mottakere til en annen leverandør eller avsender.

## Vurdering av innsats

Planleggingsestimat for en bidragsyter som er kjent med økosystemet. Ingen produksjonslegitimasjon eller levende SMS ble brukt i denne vurderingen:

| Arbeid | Utviklerdager |
|---|---|
| Adapter, utvidelser av konfigurasjon/skjema, grensesnitt for innstillinger | 2–3 |
| Samtykke for telefon/program, uavhengig undertrykking, felles sendekontroller, integrasjon med offentlig skjema | 3–5 |
| Signerte tilbakekall, lagring av levering, avgrenset og varig utsending | 2–3 |
| Grensesnitt for klarhet, veiledning for kirker, integrasjons- og regresjonstesting, rettelser i pilot | 3–4 |
| **Anbefalt omfang for lansering** | **10–15 totalt** |

Et grunnleggende proof of concept for adapter og innstillinger er omtrent 1–2 dager. Et estimat for bare avsender utelater samtykke- og onboardingarbeidet som trengs for denne anbefalingen. Ekstern gjennomgangstid hos Twilio og operatører kommer i tillegg og varierer. Prosjektet bør ikke love en dato for godkjenning eller et godkjenningsutfall.

## Akseptkriterier

- [ ] Kirken eier og betaler for kontoen, tjenesten, den registrerte avsenderen og kampanjen; ingen Twilio-konto administrert av ChurchApps er påkrevd.
- [ ] Legitimasjon er kryptert/maskert, avgrenset til leietaker, kan roteres, og finnes ikke i logger eller offentlig innhold; validering er skrivebeskyttet.
- [ ] Valgfritt samtykke uten avkrysning viser ekte lenker til retningslinjer og lagrer bevis for program/telefon/opplysning på serversiden; å si nei gir fortsatt tillatelse til hovedhandlingen i skjemaet.
- [ ] Alle manuelle baner, gruppebaner, baner for flettefelt, arbeidsflyter og påminnelser håndhever samme kvalifiseringskontroll for Twilio. Ukjente, uten samtykke, med endret telefon eller undertrykte mottakere hoppes over med en nyttig begrunnelse; gjengivelsen bevarer identiteten til kirken og STOP-instruksene etter ekspansjon og håndtering av lengde.
- [ ] Eldre synlighet i katalogen melder ikke inn mottakere; STOP/START endrer aldri synligheten i katalogen eller urelaterte innstillinger. Tilfeller med delt telefonnummer og på tvers av kirker er testet.
- [ ] Signert STOP/START/HELP, ugyldige signaturer, feil kontoer eller tjenester, dupliserte hendelser, gjenspilte skjemainnsendinger og forfalskede koblinger for samtykke er dekket.
- [ ] Størrelse på grupper, tidsavbrudd, hastighetsbegrensninger, delvis feil, tvetydige utfall, løpsforhold i tilbakekall og hendelser som kommer i feil rekkefølge er testet uten dobbel sending.
- [ ] Godkjenning av kampanje og fullført registrering av nummer er atskilt fra validering av legitimasjon. Manuell dokumentasjon er tydelig merket; utdaterte eller tilbakekalte kontroller blokkerer sending.
- [ ] En pilotkirke kontrollerer sin påmeldingsside, flyten når skjemaet blir avslått og godtatt, de eksakte URL-ene til retningslinjene og en testmottaker som har samtykket, gjennom innsending, levering, undertrykking ved STOP og tillatt ny påmelding.
- [ ] Eksisterende innstillinger og sendeatferd for Clearstream, Text In Church og Nalo består regresjonskontroller; hjelpeteksten skiller forslag fra utgitte funksjoner.
