---
title: "Twilio-kirkeonboarding (utkast)"
description: "Utkast til B1-oppsett av Twilio eid av kirken, offentlig veiledning for påmelding, kampanjeeksempler og godkjenningssjekkliste."
---

# Kirkeeid Twilio-onboarding – utkast

:::caution Utkast for den foreslåtte integrasjonen
Dette er en foreslått arbeidsflyt. B1 har nå et grunnleggende **Twilio**-valg under **Innstillinger > Tekstmeldinger** (Account SID, Auth Token, From Number og den innkommende STOP-webhooken) – se [Kirkeinnstillinger: Tekstmeldinger](../../b1-admin/settings/church-settings.md#texting). De ekstra oppsettskontrollene i B1, samtykkekartleggingen og valideringstrinnene nedenfor er krav for en fremtidig utgivelse, ikke instruksjoner om å finne eksisterende innstillinger. Les den [tekniske forslaget](./twilio-byok-proposal) for omfang og avhengigheter. Twilio-kildene ble sjekket 22. oktober 2026; verifiser gjeldende krav før du sender inn en kampanje.
:::

## Den anbefalte ordningen

Kirken din eier sin betalte Twilio-konto, telefonnummer, Messaging Service, fakturering og kampanjeregistrering. B1 ville sende via disse ressursene med legitimasjon lagt inn privat i kirkeinnstillingene. Behold minst to passende kirkeadministratorer med tilgang til Twilio-kontoen, aktiver kontosikkerhet og tildel en person ansvarlig for samtykke, innkommende svar og avvisningsmeldinger.

Den første utgivelsen som foreslås her dekker ett lokalt amerikansk nummer og ett tydelig beskrevet kirkemeldingsprogram. Eksemplene nedenfor bruker det fiktive programmet **Grace Church Updates** fra **Grace Community Church** for gudstjenesteendringer, arrangementspåminnelser og frivillig-planlegging. Erstatt hvert navn, domene, frekvens, kontakt og formål med kirkens faktiske praksis. Dette er kirkespesifikke eksempler på Twilios regler, ikke en forhåndsgodkjent kampanje eller et løfte om godkjenning.

## 1. Forbered den offentlige B1-påmeldingsopplevelsen

Publiser en side som `https://www.example.org/text-updates` på kirkens B1-nettsted, med et innebygd offentlig B1-skjema eller en tydelig lenke til dets frittstående offentlige skjema. Publiser også `https://www.example.org/privacy` og `https://www.example.org/sms-terms`. Disse adressene er plassholdere; send inn de faktiske URL-ene som kan nås.

For det foreslåtte SMS-påmeldingsskjemaet:

| Innstilling | Anbefalt konfigurasjon |
|---|---|
| Tilgang | Offentlig/ubegrenset; aktiv under gjennomgang og løpende påmelding; tilgjengelig uten innlogging |
| Skjemamodus | Standardmodus først; samtalemodus krever den eksplisitte samtykkestøtten beskrevet i den tekniske forslaget |
| Mobil | Tydelig merket med landskode; påkrevd kun når SMS-påmelding velges, hvis det brukes inne i et generelt tilkoblings- eller arrangementsskjema |
| SMS-valg | Egen valgfri avkrysningsboks, ikke avkrysset som standard, knyttet til det spesifikke programmet og mobilfeltet |
| Opplysninger | Synlig ved siden av SMS-valget: kirke/program, meldingens formål og frekvens, mulige takster, STOP, HELP, supportkontakt og klikkbare lenker til personvernerklæring og SMS-vilkår |
| Andre handlinger | Gjester kan sende inn tilkoblingskortet, melde seg på et arrangement eller be om informasjon uten å melde seg på SMS |
| Bevis | Lagre program, nøyaktig telefonnummer, valgt samtykke, kildeinnsendingen, serverens tid og versjonen av opplysninger/policy; et vanlig skjemasvar alene melder ingen på i dag |
| Automatisering av personer/grupper | Hold automatisk personopprettelse og gruppetilordning av for et innledende påmeldingspilotprosjekt, med mindre det er gjennomgått mot kirkens eksisterende samsvarsregler. Gruppetilordning er aldri SMS-autorisasjonen. |
| Eksisterende automatiseringer | Meld ikke alle skjemainnsendere eller gruppemedlemmer inn i en tekstarbeidsflyt. Bare den foreslåtte verifiserte samtykkekartleggingen kan autorisere det programmet. |
| Takketekst | Bekreft at skjemaet er mottatt, uten å hevde SMS-påmelding når boksen ble avslått eller bekreftelse/gjennomgang fortsatt står igjen. |

Et eksisterende avkrysningsboks-spørsmål kan illustrere skjemaet, men B1 trenger fortsatt samtykkeloggen og sendingsportene. Den nåværende delte rendereren viser beskrivelser som ren tekst; å skrive Markdown eller en URL der er ikke tilstrekkelig sikkerhet for at policy-lenker er klikkbare. Implementeringen må levere en tilgjengelig samtykkekontroll med faktiske lenker. Se [opprette B1-skjemaer](../../b1-admin/forms/creating-forms) og den [tekniske forslaget](./twilio-byok-proposal#consent-and-suppression-are-required-release-work).

Twilio krever et frivillig, verifiserbart opt-in. Ikke bunt SMS med påkrevde medlemsvilkår, e-post- og telefontillatelser, gavesamtykke eller arrangementspåmelding. Et mobilnummer på et besøkskort er i seg selv ikke SMS-samtykke. Se Twilios [krav til frivillig samtykke](https://www.twilio.com/docs/api/errors/30923) og [kampanjeanbefalinger](https://help.twilio.com/hc/en-us/articles/26149060902555-A2P-10DLC-Campaign-Registration-Recommendations).

### Eksempel på påmeldingstekst

Bruk dette først etter at kirken har valgt de faktiske formålene, avsenderen og frekvensen. Avkrysningsboksen er valgfri og starter uten avkrysning; policy-navnene nedenfor må være lenker i det gjengitte skjemaet.

> Ja, jeg vil at Grace Community Church skal sende meg tekstmeldinger gjennom Grace Church Updates om gudstjenesteendringer, kirkearrangementer og frivillig-planlegging fra [registrert kirkenummer]. Forvent opptil 4 meldinger hver måned. Meldings- og datatakster kan gjelde. Svar STOP for å melde deg av eller HELP for hjelp. SMS-påmelding er valgfri og kreves ikke for å delta, melde seg på eller gi. Se vår personvernerklæring og våre SMS-vilkår. Spørsmål: [kirkens supportadresse eller telefon].

«Opptil 4» er et eksempel på en forpliktelse, ikke en grense foreskrevet av Twilio. Erstatt den med en frekvens kirken faktisk kan holde; hvis frekvensen varierer, opplys om det ærlig og beskriv forventet kadens. Hold salgsfremmende appeller eller ekstra menighetsprogrammer utenfor denne avkrysningsboksen, med mindre deres formål og samtykke er vurdert separat.

For et generelt besøks- eller arrangementsskjema må innsending med denne boksen uten avkrysning fortsatt lykkes. Et dedikert SMS-skjema kan forklare at avkrysning ber om påmelding, men det må aldri gjøre at urelaterte kirketjenester avhenger av påmelding. Bekreft den faktiske oppførselen på både telefon og datamaskin.

### Policyinnhold som må forberedes

Kirkens personvernside bør forklare hvilken informasjon den samler inn for tekstmeldinger, hvordan den bruker og beskytter den, og sin praksis for oppbevaring og kontakt. Den bør tydelig si at mobilnumre og meldingssamtykke ikke selges eller deles med tredjeparter eller tilknyttede selskaper for deres markedsføring eller salgsfremmende bruk. Forklar nødvendig behandling hos tjenesteleverandører korrekt; ikke hevd at kirken aldri bruker en databehandler mens den bruker B1 og Twilio. Twilios [veiledning om personvernerklæring](https://www.twilio.com/docs/api/errors/30908) og [kampanjeanbefalinger](https://help.twilio.com/hc/en-us/articles/26149060902555-A2P-10DLC-Campaign-Registration-Recommendations) er referansen for dette skillet.

SMS-vilkårene bør identifisere kirken og programmet, formål, faktisk frekvens, mulige meldingsavgifter, STOP- og HELP-instruksjoner, supportkontakt og personvernlenken, og inkludere eventuelle ekstra opplysninger Twilio ber om i sin nåværende gjennomgang. Samsvar policy-lenkene på påmeldingssiden nøyaktig med URL-ene som sendes inn i kampanjen. Siden 30. juni 2026 krever Twilio dedikerte offentlige URL-er for personvern og vilkår for nye API-kampanjeregistreringer; deres Console-flyt samler dem også inn. [Twilio-krav](https://www.twilio.com/en-us/changelog/a2p-10dlc-campaign-registration-will-require-privacy-policy-and-)

Dette er innholdskrav som skal brukes på kirkens faktiske policyer, ikke en erstatning for dens eksisterende personvernpraksis og heller ikke en generisk policy å lime inn uten å sjekke.

## 2. Registrer kirken og dens meldingsprogram i Twilio

1. Opprett eller bruk en **betalt konto eid av kirken** og et SMS-kapabelt lokalt amerikansk nummer. Bruk kirkens juridiske navn, EIN/forretningsregistreringsinformasjon, adresse, nettsted og autorisert representant konsekvent. Ikke bruk ChurchApps' identitet eller en annen kirkes informasjon.
2. Følg Twilios registreringsflyt for direkte kunder for kirkens faktiske enhetstype. For en kvalifisert ideell organisasjon, bruk [veiledningen for registrering av ideelle organisasjoner](https://www.twilio.com/docs/messaging/compliance/a2p-10dlc/onboarding-for-government-and-non-profit-agencies). Veldedighets- og 501(c)(3)-bruk avhenger av kvalifisering; en kirkes navn alene etablerer ikke Twilio-godkjenning eller unntak.
3. Opprett en dedikert Messaging Service og send inn den relevante A2P 10DLC-kampanjen. Velg bruksområdet som ærlig samsvarer med de reelle meldingene og alternativene den godkjente Brand-en har; eksemplene her foreskriver ikke en universell brukskode for kirker.
4. Oppgi den offentlige påmeldings-URL-en, policy-URL-ene, en full beskrivelse av opt-in- og meldingsflyten og de forespurte eksempelmeldingene. Ta med alle reelle påmeldingsmetoder, og sett erklæringene om innebygde lenker og telefonnumre slik at de samsvarer med faktisk innhold. Ikke oppgi nøkkelordpåmelding eller dobbel opt-in med mindre den flyten finnes og er testet.
5. Knytt avsendernummeret til tjenesten og den godkjente kampanjen. Vent på både kampanjeverifisering **og fullført nummerregistrering** før du sender.

Hold disse trinnene i kirkens egen Twilio Console. Den foreslåtte B1-integrasjonen sender ikke inn registreringer for kirker. Twilios [registreringshurtigstart](https://www.twilio.com/docs/messaging/compliance/a2p-10dlc/quickstart) og [kampanjeressurs](https://www.twilio.com/docs/messaging/api/usapptoperson-resource) forklarer registreringsfeltene og statusen. Et ventende nummer kan fortsatt blokkere sending etter at en kampanje er godkjent. [Nummerregistrering](https://www.twilio.com/docs/api/errors/30035)

### Eksempel på kampanjebeskrivelse

> Grace Community Church bruker Grace Church Updates til å sende endringer i gudstjenesteplanen, påminnelser om kirkearrangementer og varsler om frivillig-planlegging til personer som velger dette programmet på vårt offentlige kirkenettsted. Vi sender høyst fire meldinger per måned under dette programmet. Mottakere kan stoppe disse meldingene når som helst. Dette programmet omfatter ikke kjøpte kontakter, tredjepartspromoteringer eller innsamlingsappeller.

Dette eksemplet passer kun en kirke som faktisk følger disse grensene og unntakene. Hvis frivillig-påminnelser alene overstiger den lovede frekvensen, må du endre programdesignen og opplysningen før innsending.

### Eksempel på meldingsflytbeskrivelse

> Besøkende åpner [faktisk kirkens påmeldings-URL], skriver inn mobilnummeret sitt og velger uavhengig den valgfrie Grace Church Updates-avkrysningsboksen. Den er ikke avkrysset når skjemaet åpnes. Opplysningen nevner Grace Community Church, beskriver gudstjenesteendringer, arrangementspåminnelser og frivillig-planlegging, oppgir månedsgrensen og mulige takster, og forklarer STOP og HELP. Den viste personvernerklæringen og SMS-vilkårene lenker til [faktisk personvern-URL] og [faktisk SMS-vilkår-URL]. Å avslå SMS hindrer ikke oppmøte, arrangementspåmelding, gaver eller bruk av det generelle tilkoblingsskjemaet. B1 registrerer det bekreftende valget, telefonnummeret, innsendingstidspunktet og opplysningsversjonen. Vi sender dette programmet kun til de dokumenterte abonnentene og undertrykker tilbaketrekninger før videre sending.

Tilpass det avsnittet til den implementerte flyten. Hvis telefonbekreftelse eller gjennomgang av personale brukes, beskriv den ventende tilstanden og det nøyaktige aktiveringssteget. Hvis andre metoder brukes, ta med hver metode og dens bevis. Der påmelding skjer bak en innlogging eller på papir, ber Twilio om offentlig, redigert bevis for den faktiske opt-in-opplevelsen; eksponer aldri fullførte skjemaer eller medlemsdata. [Veiledning om verifiserbart opt-in](https://www.twilio.com/docs/api/errors/30923)

### Eksempler på utgående meldinger

Dette er fiktive eksempler å tilpasse; bruk ekte kirke-URL-er og erstatt verdiene i hakeparenteser før innsending. Twilios kampanje-API godtar to til fem eksempler. Eksemplene bør identifisere kirken, samsvare med det oppgitte formålet og inkludere en instruks for avmelding. [Kampanjens eksempelfelter](https://www.twilio.com/docs/messaging/api/usapptoperson-resource)

```text
Grace Community Church: Sunday's service will start at [time] due to [reason]. Details: [church website URL]. Reply STOP to end texts.
```

```text
Grace Community Church: A reminder that [church event] is on [date] at [time]. Information: [church event URL]. Reply STOP to end texts.
```

```text
Grace Community Church: You are scheduled to serve on [team] this [day]. Please review your plan: [B1 church portal URL]. Reply STOP to end texts.
```

URL-ene i hakeparenteser beskriver eksempelvariabler; de innsendte eksemplene bør vise det faktiske kirkedomenet og den faktiske lenkestilen. En lenke til en plan kan kreve innlogging, men påmeldingssiden og policyene som brukes til vurdering bør være offentlig gjennomgangsbare. Ta ikke med private notater, barns informasjon eller identifiserbare medlemsdetaljer i godkjenningseksempler. Hold eksempelinnholdet i samsvar med det B1-malene faktisk sender; ikke lov en svarinnboks eller en bestemt påminnelsesatferd som ikke er tilgjengelig.

### STOP-, START- og HELP-svar

Bruk Twilio Messaging Service Advanced Opt-Out for disse bekreftelsene, og tilpass kirke- og programidentiteten og støttedetaljene. Eksempel på svarintensjon:

- **STOP:** Bekreft at Grace Church Updates har stoppet, og forklar den støttede måten å gjenoppta på.
- **START:** Bekreft gjenopptakelse av det samme programmet, inkludert dets identitet, frekvens/takster og hjelp- og stoppinstruksjoner slik den konfigurerte flyten krever.
- **HELP:** Identifiser Grace Community Church og oppgi den faktiske supportkontakten og instruksjoner for avmelding.

Ikke send en andre B1-bekreftelse når Twilio allerede har svart. Et HELP-svar er ikke påmelding. START må ikke melde noen på ekstra kirkeprogrammer eller avsløre dem i medlemskatalogen. [Twilio Advanced Opt-Out](https://www.twilio.com/docs/messaging/tutorials/advanced-opt-out)

## 3. Sjekk godkjenningspakken før innsending

- [ ] Kirkens faktiske juridiske og Brand-informasjon, nettstedsidentitet og kampanjeformål stemmer overens.
- [ ] Påmeldingssiden og det aktive skjemaet åpnes uten innlogging i et privat nettleservindu, også på en mobilenhet.
- [ ] SMS-boksen starter uten avkrysning og kan avslås mens hovedhandlingen for besøkende eller arrangement fullføres.
- [ ] Programformål, avsender, faktisk frekvens, mulige kostnader, STOP, HELP, supportkontakt og klikkbare policy-lenker vises ved siden av SMS-valget.
- [ ] De nøyaktige personvern- og vilkårs-URL-ene oppgitt til Twilio er offentlige, fungerer uten legitimasjon og identifiserer samme kirke og program. Policyinnholdet stemmer overens med faktisk behandling.
- [ ] Hver eksempelmelding samsvarer med programmet, den faktiske avsenderidentiteten og forventet lenke- og telefonnummeroppførsel. Kampanjen beskriver hver reell opt-in-metode.
- [ ] Redigerte skjermbilder viser det tomme skjemaet, avkrysningsboksen og opplysningene, og policy-lenkene slik gjennomgangsfolk vil se dem. Beviset inneholder ingen medlemsregistreringer eller nøkler.
- [ ] Kirken har en operativ måte å oppbevare samtykkebevis på og respektere tilbaketrekninger før sending, inkludert forespørsler mottatt per telefon eller e-post.

Disse sjekkene reduserer unngåelige avvik; Twilio og deres gjennomgangspartnere tar godkjenningsbeslutningen. Hold den reelle påmeldingssiden og policy-URL-ene tilgjengelige etter godkjenning, ikke bare under gjennomgang.

## 4. Koble til og valider den fremtidige B1-integrasjonen

Etter at integrasjonen er sendt, bør dens foreslåtte tekstoppsett samle inn kirkens Account SID, dedikert API Key SID og hemmelighet, separat webhook Auth Token, Messaging Service SID og valgt avsender. Opprett nøkler kun i kirkens Console, og legg inn hemmeligheter kun i private B1-innstillinger. [Twilio API-nøkkelveiledning](https://www.twilio.com/docs/iam/api-keys)

Kopier de kirkespesifikke innkommende webhook-URL-ene og webhook-URL-ene for leveringsstatus som B1 oppgir, inn i den tilsvarende Twilio-tjenestekonfigurasjonen. Aktiver Advanced Opt-Out og kontroller at innkommende meldinger når den konfigurerte webhooken. B1 bør vise separate kontroller for legitimasjon, eierskap til tjeneste og avsender, verifisert kampanje, fullført nummerregistrering, verifisering av innkommende meldinger og den bestått testleveransen. En lagret legitimasjon eller en akseptert API-forespørsel er ikke endelig levering.

Hvis B1 ikke kan sjekke et registreringssignal programmatisk, bekreft det direkte i Console; grensesnittet må merke det daterte resultatet som bekreftet av administrator. Løs ventende eller mislykket status før tekstmeldinger i produksjon aktiveres. Bruk en separat, eksplisitt forespurt test til en reell samtykkende voksen testmottaker, deretter:

1. Bekreft at en samsvarende dokumentert påmelding oppretter riktig samtykkepost for telefon og program. Avslag eller et telefonnummerbytte må ikke stille melde en mottaker inn.
2. Send én test, bekreft mottak, og sammenlign B1-statusen med Twilio Message SID og leveringsutfallet.
3. Svar STOP og kontroller at manuelle tekster, gruppetekster, arbeidsflyter og påminnelser hopper over det telefonnummeret. Katalogsynlighet bør ikke endre seg.
4. Test den dokumenterte gjenabonneringsflyten for samme program og HELP-svaret; bekreft at det ikke finnes dupliserte bekreftelser og ingen urelaterte preferanseendringer.

## 5. Vedlikehold programmet

Utpek en kirkeeier til å overvåke kampanje- og kontostatus, saldo- og faktureringsvarsler, meldingsfeil og innkommende svar i Twilio. Den foreslåtte første B1-utgivelsen har ingen samtalebasert SMS-innboks, så publiser og overvåk en reell hjelpekontakt og sjekk svar i stedet for å anta at staben ser dem i B1.

Hold samtykke- og tilbaketrekningshistorikk, gjeldende versjoner av opplysninger og policy, kampanjeidentifikatorer og redigert godkjenningsbevis i kirkekontrollerte registre. Lim aldri inn nøkler eller mottakerlister i offentlige supportsaker. Når et nummer, en tjeneste, legitimasjon, påmeldingsflyt, frekvens eller formål endres, kontroller integrasjonen på nytt og oppdater registrering og samtykke der det kreves, før du gjenopptar. Gå nøye gjennom delte husstandsnumre og endrede numre; kvalifisering følger det samtykkende telefonnummeret og programmet, ikke hvert familiemedlems registrering.

Ved avvisning leser du den faktiske Twilio-feilen, korrigerer den spesifikke inkonsistensen både på nettstedet og i innsendingen, og sender inn på nytt via kirkens Console. For uregistrerte eller ventende avsendere venter du på at registreringen fullføres i stedet for å bytte nummer for å omgå den. Bruk [Twilios feilsøking for registrering](https://www.twilio.com/docs/messaging/compliance/a2p-10dlc/troubleshooting-a2p-brands) og den oppgitte feilkodereferansen. Ikke lov en fast behandlingstid.
