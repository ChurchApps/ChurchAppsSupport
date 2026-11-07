---
title: "Twilio-onboarding for kirker (udkast)"
description: "Udkast til kirkeejet Twilio-opsætning i B1, offentlig tilmeldingsvejledning, kampagneeksempler og godkendelsestjekliste."
---

# Onboarding af kirkeejet Twilio (udkast)

:::caution Udkast til den foreslåede integration
Dette er en foreslået arbejdsgang. B1 har nu et grundlæggende **Twilio**-valg under **Settings > Texting** (Account SID, Auth Token, From Number og det indgående STOP-webhook) -- se [Church Settings: Texting](../../b1-admin/settings/church-settings.md#texting). De ekstra B1-opsætningsmuligheder, samtykkekortlægningen og valideringstrinene nedenfor er krav til en fremtidig udgivelse, ikke instruktioner til at finde eksisterende indstillinger. Læs det [tekniske forslag](./twilio-byok-proposal.md) for omfang og afhængigheder. Twilio-kilderne blev senest kontrolleret den 22. oktober 2026; verificér de aktuelle krav, før en kampagne indsendes.
:::

## Den anbefalede ordning

Jeres kirke ejer sin betalte Twilio-konto, telefonnummer, Messaging Service, fakturering og kampagneregistrering. B1 ville sende via disse ressourcer med legitimationsoplysninger, der indtastes privat i kirkeindstillingerne. Mindst to relevante kirkeadministratorer skal have adgang til Twilio-kontoen, kontosikkerhed skal være aktiveret, og en person skal være ansvarlig for samtykke, indgående svar og afvisningsmeddelelser.

Den første udgivelse, der foreslås her, dækker ét lokalt amerikansk nummer og ét tydeligt beskrevet kirkeligt beskedprogram. Eksemplerne nedenfor bruger det fiktive program **Grace Church Updates** fra **Grace Community Church** til ændringer af gudstjenester, begivenhedspåmindelser og planlægning af frivillige. Erstat alle navne, domæner, hyppigheder, kontaktoplysninger og formål med kirkens faktiske praksis. Dette er kirkespecifikke eksempler på Twilios regler, ikke en forhåndsgodkendt kampagne eller et løfte om godkendelse.

## 1. Forbered den offentlige B1-tilmeldingsoplevelse

Offentliggør en side, fx `https://www.example.org/text-updates`, på kirkens B1-hjemmeside, med en indlejret offentlig B1-formular eller et tydeligt link til dens selvstændige offentlige formular. Offentliggør også `https://www.example.org/privacy` og `https://www.example.org/sms-terms`. Disse adresser er pladsholdere; indsend de faktiske, tilgængelige URL'er.

For den foreslåede sms-tilmeldingsformular:

| Indstilling | Anbefalet konfiguration |
|---|---|
| Adgang | Offentlig/uden begrænsning; aktiv under gennemgang og løbende tilmelding; tilgængelig uden login |
| Formtilstand | Standardtilstand i starten; samtaletilstand kræver den eksplicitte samtykkestøtte, der beskrives i det tekniske forslag |
| Mobil | Tydeligt mærket med landekode; kræves kun, når man vælger sms-tilmelding, hvis den bruges i en generel forbindelses-/begivenhedsformular |
| Sms-valg | Separat valgfri afkrydsningsboks, ikke markeret som standard, knyttet til det specifikke program og mobilfeltet |
| Oplysninger | Synlige ved siden af sms-valget: kirke/program, beskedens formål og hyppighed, mulige takster, STOP, HELP, supportkontakt og rigtige klikbare links til privatlivspolitik/sms-vilkår |
| Andre handlinger | Gæster kan indsende forbindelseskortet, tilmelde sig en begivenhed eller anmode om information uden at tilvælge sms |
| Dokumentation | Gem program, præcist telefonnummer, valgt samtykke, kildeindsendelse, servertidspunkt og version af oplysninger/politik; et almindeligt formularsvar alene tilmelder i dag ingen |
| Automatisering af personer/grupper | Slå automatisk oprettelse af personer/gruppetildeling fra i en indledende tilmeldingspilot, medmindre det er gennemgået for kirkens eksisterende matchningsregler. Gruppetildeling er aldrig sms-godkendelsen. |
| Eksisterende automatiseringer | Tilmeld ikke alle formularindsendere eller gruppemedlemmer i et tekstbeskedsflow. Kun den foreslåede verificerede samtykkekortlægning må godkende det program. |
| Takketekst | Bekræft, at formularen er modtaget, uden at hævde sms-tilmelding, når boksen er fravalgt, eller bekræftelse/gennemgang stadig afventer. |

Et eksisterende afkrydsningsspørgsmål kan illustrere formularen, men B1 har stadig brug for samtykkeregistret og afsendelsesportene. Den nuværende fælles renderer viser beskrivelser som almindelig tekst; at skrive Markdown eller en URL dér er ikke tilstrækkelig sikkerhed for, at politiklinkene er klikbare. Implementeringen skal levere en tilgængelig samtykkekontrol med faktiske links. Se [oprettelse af B1-formularer](../../b1-admin/forms/creating-forms.md) og det [tekniske forslag](./twilio-byok-proposal.md#consent-and-suppression-are-required-release-work).

Twilio kræver et frivilligt, verificerbart tilvalg. Læg ikke sms sammen med obligatoriske medlemsvilkår, tilladelser til e-mail/telefon, donationssamtykke eller begivenhedstilmelding. Et mobilnummer på et besøgskort er i sig selv ikke sms-samtykke. Se Twilios [krav til frivilligt samtykke](https://www.twilio.com/docs/api/errors/30923) og [anbefalinger til kampagner](https://help.twilio.com/hc/en-us/articles/26149060902555-A2P-10DLC-Campaign-Registration-Recommendations).

### Eksempel på tilmeldingstekst

Brug dette først, når kirken har valgt de faktiske formål, afsender og hyppighed. Afkrydsningsboksen er valgfri og starter umarkeret; politiknavnene nedenfor skal være links i den gengivne formular.

> Ja, jeg ønsker, at Grace Community Church sender mig sms'er via Grace Church Updates om ændringer af gudstjenester, kirkebegivenheder og frivilligplaner fra [registreret kirkenummer]. Forvent op til 4 beskeder om måneden. Beskeds- og datatakster kan gælde. Svar STOP for at afmelde eller HELP for hjælp. Sms-tilmelding er valgfri og kræves ikke for at deltage, tilmelde sig eller give. Se vores privatlivspolitik og sms-vilkår. Spørgsmål: [kirkens supportmail eller telefon].

“Op til 4” er et eksempel på en forpligtelse, ikke en grænse fastsat af Twilio. Erstat den med en hyppighed, kirken faktisk kan overholde; hvis hyppigheden varierer, skal det oplyses ærligt, og den forventede rytme beskrives. Hold reklamer eller yderligere kirkelige programmer uden for denne afkrydsningsboks, medmindre deres formål og samtykke er vurderet særskilt.

For en generel besøgs-/begivenhedsformular skal indsendelse med denne boks umarkeret stadig lykkes. En dedikeret sms-only-formular må forklare, at afkrydsning anmoder om tilmelding, men den må aldrig gøre urelaterede kirkelige tjenester afhængige af tilmelding. Bekræft den faktiske adfærd både på telefon og computer.

### Politikindhold, der skal forberedes

Kirkens privatlivsside bør forklare, hvilke oplysninger den indsamler til tekstbeskeder, hvordan den bruger og beskytter dem, samt sin praksis for opbevaring og kontakt. Den bør tydeligt angive, at mobilnumre og beskedsamtykke ikke sælges eller deles med tredjeparter eller tilknyttede virksomheder til deres markedsførings- eller reklameformål. Forklar nødvendig behandling hos tjenesteudbydere præcist; påstå ikke, at kirken aldrig bruger en databehandler, mens den bruger B1 og Twilio. Twilios [vejledning om privatlivspolitik](https://www.twilio.com/docs/api/errors/30908) og [anbefalinger til kampagner](https://help.twilio.com/hc/en-us/articles/26149060902555-A2P-10DLC-Campaign-Registration-Recommendations) er referencen for denne skelnen.

Sms-vilkårene bør angive kirken og programmet, formål, faktisk hyppighed, mulige beskedtakster, STOP/HELP-instruktioner, supportkontakt og privatlivslinket; inkluder yderligere oplysninger, som Twilios aktuelle gennemgang kræver. Tilmeldingssidens politiklinks skal præcist svare til de URL'er, der er indsendt i kampagnen. Fra den 30. juni 2026 kræver Twilio dedicerede, offentlige URL'er til privatliv og vilkår for nye API-kampagneregistreringer; Console-flowet indsamler dem også. [Twilio-krav](https://www.twilio.com/en-us/changelog/a2p-10dlc-campaign-registration-will-require-privacy-policy-and-)

Dette er indholdskrav, der skal anvendes på kirkens faktiske politikker; de er ikke en erstatning for kirkens eksisterende privatlivspraksis eller en generisk politik, der indsættes uden kontrol.

## 2. Registrer kirken og dens beskedprogram hos Twilio

1. Opret eller brug en **betalt konto, som ejes af kirken**, og et sms-kompatibelt lokalt amerikansk nummer. Brug kirkens juridiske navn, EIN/virksomhedsregistreringsoplysninger, adresse, hjemmeside og bemyndigede repræsentant konsekvent. Erstat ikke ChurchApps' identitet eller en anden kirkes oplysninger.
2. Følg Twilios Brand-registreringsflow for direkte kunder, der gælder for kirkens faktiske enhedstype. For en berettiget nonprofitorganisation: brug [vejledningen til nonprofit-registrering](https://www.twilio.com/docs/messaging/compliance/a2p-10dlc/onboarding-for-government-and-non-profit-agencies). Anvendelsestilfælde for velgørenhed/501(c)(3) afhænger af berettigelse; en kirkes navn alene etablerer ikke Twilio-godkendelse eller fritagelse.
3. Opret en dedikeret Messaging Service og indsend den relevante A2P 10DLC-kampagne. Vælg det anvendelsestilfælde, der ærligt svarer til de faktiske beskeder og de muligheder, der er tilgængelige for det godkendte Brand; eksemplerne her foreskriver ikke en universel kode for kirkers anvendelsestilfælde.
4. Angiv den offentlige tilmeldings-URL, politik-URL'erne, den fulde beskrivelse af tilvalg/beskedflow og de ønskede eksempelbeskeder. Inkluder hver faktisk tilmeldingsmetode; sæt erklæringerne om indlejrede links/telefonnumre, så de svarer til det faktiske indhold. Angiv ikke nøgleordstilmelding eller dobbelt tilvalg, medmindre det flow findes og er testet.
5. Knyt afsendernummeret til tjenesten og den godkendte kampagne. Vent på både kampagneverificering **og fuldført nummerregistrering**, før der sendes.

Gennemfør disse trin i kirkens egen Twilio Console. Den foreslåede B1-integration indsender ikke registreringer for kirker. Twilios [hurtigstart til registrering](https://www.twilio.com/docs/messaging/compliance/a2p-10dlc/quickstart) og [kampagneressource](https://www.twilio.com/docs/messaging/api/usapptoperson-resource) forklarer registreringsfelterne og statussen. Et ventende nummer kan stadig blokere afsendelse, efter en kampagne er godkendt. [Nummerregistrering](https://www.twilio.com/docs/api/errors/30035)

### Eksempel på kampagnebeskrivelse

> Grace Community Church bruger Grace Church Updates til at sende ændringer af gudstjenesteplaner, påmindelser om kirkebegivenheder og meddelelser om frivilligplanlægning til personer, der vælger dette program på vores offentlige kirkehjemmeside. Vi sender højst fire beskeder om måneden under dette program. Modtagerne kan til enhver tid stoppe beskederne. Programmet omfatter ikke købte kontakter, tredjepartsreklamer eller indsamlingsopfordringer.

Dette eksempel passer kun til en kirke, der faktisk overholder disse begrænsninger og udelukkelser. Hvis påmindelser til frivillige alene overskrider den lovede hyppighed, skal programmets udformning og oplysningerne ændres, før der indsendes.

### Eksempel på beskedflow

> Besøgende åbner [faktisk URL til kirkens tilmelding], indtaster deres mobilnummer og vælger selvstændigt den valgfri afkrydsningsboks for Grace Church Updates. Den er umarkeret, når formularen åbnes. Oplysningen nævner Grace Community Church, beskriver ændringer af gudstjenester, begivenhedspåmindelser og frivilligplaner, angiver den månedlige grænse og mulige takster og forklarer STOP og HELP. De viste links til privatlivspolitik og sms-vilkår går til [faktisk URL til privatlivspolitik] og [faktisk URL til sms-vilkår]. At fravælge sms forhindrer ikke deltagelse, begivenhedstilmelding, givertjeneste eller brug af den almindelige forbindelsesformular. B1 registrerer det bekræftende valg, telefonnummeret, indsendelsestidspunktet og versionen af oplysningerne. Vi sender dette program kun til de dokumenterede abonnenter og undertrykker afmeldinger, før yderligere afsendelser.

Tilpas dette afsnit til det implementerede flow. Hvis telefonbekræftelse eller medarbejdergennemgang bruges, beskriv den ventende tilstand og det præcise aktiveringstrin. Hvis andre metoder bruges, inkluder hver metode og dens dokumentation. Hvor tilmelding sker bag et login eller på papir, beder Twilio om offentlig, redigeret dokumentation af den faktiske tilvalgsoplevelse; eksponer aldrig udfyldte formularer eller medlemsdata. [Vejledning om verificerbart tilvalg](https://www.twilio.com/docs/api/errors/30923)

### Eksempler på udgående beskeder

Dette er fiktive eksempler, der skal tilpasses; brug ægte kirke-URL'er, og erstat værdier i klammer, før indsendelse. Twilios kampagne-API accepterer to til fem eksempler. Eksemplerne skal identificere kirken, afspejle det angivne formål og indeholde en instruktion om afmelding. [Felter for kampagneeksempler](https://www.twilio.com/docs/messaging/api/usapptoperson-resource)

```text
Grace Community Church: Sunday's service will start at [time] due to [reason]. Details: [church website URL]. Reply STOP to end texts.
```

```text
Grace Community Church: A reminder that [church event] is on [date] at [time]. Information: [church event URL]. Reply STOP to end texts.
```

```text
Grace Community Church: You are scheduled to serve on [team] this [day]. Please review your plan: [B1 church portal URL]. Reply STOP to end texts.
```

URL'erne i klammer beskriver eksempelvariabler; de indsendte eksempler skal vise kirkens rigtige domæne og den faktiske linkstil. Et link til en plan kan kræve login, men tilmeldingssiden og de politikker, der bruges til vurderingen, skal kunne gennemgås offentligt. Inkluder ikke private noter, børneoplysninger eller identificerbare medlemsoplysninger i godkendelseseksempler. Hold eksemplets indhold i overensstemmelse med det, B1's skabeloner faktisk sender; lov ikke en svarindbakke eller en bestemt påmindelsesadfærd, der ikke er tilgængelig.

### STOP-, START- og HELP-svar

Brug Twilio Messaging Service Advanced Opt-Out til disse bekræftelser, og tilpas kirkens/programmets identitet og supportoplysninger. Eksempel på svarintention:

- **STOP:** Bekræft, at Grace Church Updates er stoppet, og forklar den understøttede måde at genoptage på.
- **START:** Bekræft genoptagelse af det samme program, inklusive dets identitet, rytme/takster og hjælpe- og stopinstruktioner, som det konfigurerede flow kræver.
- **HELP:** Identificér Grace Community Church, og angiv den faktiske supportkontakt og afmeldingsinstruktioner.

Send ikke en anden B1-bekræftelse, når Twilio allerede har svaret. Et HELP-svar er ikke tilmelding. START må ikke tilmelde nogen til yderligere kirkeprogrammer eller vise dem i medlemskataloget. [Twilio Advanced Opt-Out](https://www.twilio.com/docs/messaging/tutorials/advanced-opt-out)

## 3. Gennemgå godkendelsespakken, før indsendelse

- [ ] Kirkens faktiske juridiske/Brand-oplysninger, hjemmesideidentitet og kampagneformål stemmer overens.
- [ ] Tilmeldingssiden og den aktive formular åbnes uden login i et privat browservindue, også på en mobilenhed.
- [ ] Sms-boksen starter umarkeret og kan fravælges, mens den primære besøgs-/begivenhedshandling gennemføres.
- [ ] Programformål, afsender, faktisk hyppighed, mulige gebyrer, STOP, HELP, supportkontakt og klikbare politiklinks vises ved siden af sms-valget.
- [ ] De præcise privatlivs-/vilkår-URL'er, der er angivet til Twilio, er offentlige, fungerer uden legitimationsoplysninger og identificerer samme kirke/program. Politikindholdet stemmer overens med den faktiske behandling.
- [ ] Hvert eksempel på en besked svarer til programmet, den faktiske afsenderidentitet og den forventede link-/telefonadfærd. Kampagnen beskriver hver faktisk tilvalgsmetode.
- [ ] Redigerede skærmbilleder viser den tomme formular, afkrydsningsboks/oplysninger og politiklinks, som gennemgangspersoner vil se dem. Dokumentationen indeholder ingen medlemsoplysninger eller nøgler.
- [ ] Kirken har en driftsmæssig måde at opbevare samtykkedokumentation og respektere tilbagetrækninger, før der sendes, herunder anmodninger modtaget pr. telefon/e-mail.

Disse kontroller reducerer unødvendige uoverensstemmelser; Twilio og dets gennemgangspartnere træffer godkendelsesbeslutningen. Hold den faktiske tilmeldingsside og de faktiske politik-URL'er tilgængelige også efter godkendelse, ikke kun under gennemgangen.

## 4. Tilslut og valider den fremtidige B1-integration

Når integrationen er udgivet, bør den foreslåede Texting-opsætning indsamle kirkens Account SID, dedikeret API Key SID/hemmelighed, separat webhook-Auth Token, Messaging Service SID og valgt afsender. Opret nøgler kun i kirkens Console, og indtast hemmeligheder kun i de private B1-indstillinger. [Vejledning om Twilio API-nøgler](https://www.twilio.com/docs/iam/api-keys)

Kopiér de kirkespecifikke webhook-URL'er for indgående beskeder og leveringsstatus, som B1 leverer, ind i den tilsvarende Twilio-tjenestekonfiguration. Aktivér Advanced Opt-Out, og kontrollér, at indgående beskeder når den konfigurerede webhook. B1 bør vise separate kontroller for legitimationsoplysninger, ejerskab af tjeneste/afsender, verificeret kampagne, fuldført nummerregistrering, verificering af indgående beskeder og den leverede testbesked. En gemt legitimationsoplysning eller en accepteret API-anmodning er ikke endelig levering.

Hvis B1 ikke programmatisk kan kontrollere et registreringssignal, bekræft det direkte i Console; brugerfladen skal mærke det daterede resultat som bekræftet af administrator. Løs ventende/mislykkede statusser, før produktionsbeskeder aktiveres. Brug en separat, eksplicit anmodet test til en reel, samtykkende voksen testmodtager, og derefter:

1. Bekræft, at en tilsvarende dokumenteret tilmelding opretter den korrekte telefon-/programsamtykkeoptegnelse; fravalg eller et skift af telefonnummer må ikke stille og roligt tilmelde en modtager.
2. Send én test, bekræft modtagelsen, og sammenlign B1-statussen med Twilio Message SID og leveringsresultatet.
3. Svar STOP, og kontrollér, at manuelle tekster, gruppetekster, flow og påmindelser springer over det telefonnummer. Synligheden i kataloget bør ikke ændre sig.
4. Afprøv det dokumenterede flow for genabonnement til samme program og HELP-svaret; kontrollér, at der ikke er dobbelte bekræftelser og ingen urelaterede præferenceændringer.

## 5. Vedligehold programmet

Udpeg en kirkeejer til at overvåge kampagne-/kontostatus, saldo- og faktureringsadvarsler, beskedfejl og indgående svar i Twilio. Den foreslåede første B1-udgivelse har ingen samtale-sms-indbakke, så offentliggør og overvåg en reel hjælpekontakt, og kontrollér svar i stedet for at antage, at medarbejdere ser dem i B1.

Opbevar historik over samtykke og tilbagetrækning, aktuelle versioner af oplysninger/politikker, kampagneidentifikatorer og redigeret godkendelsesdokumentation i kirkestyrede optegnelser. Indsæt aldrig nøgler eller modtagerlister i offentlige supportsager. Når et nummer, en tjeneste, legitimationsoplysninger, tilmeldingsflow, hyppighed eller formål ændres, skal integrationen kontrolleres igen, og registrering/samtykke opdateres, hvor det kræves, før der genoptages. Gennemgå delte husstandsnumre og ændrede numre omhyggeligt; berettigelse følger det samtykkende telefonnummer og programmet, ikke hvert familiemedlems optegnelse.

Ved afvisning skal du læse den faktiske Twilio-fejl, rette den specifikke uoverensstemmelse både på hjemmesiden og i indsendelsen og indsende igen gennem kirkens Console. For uregistrerede/ventende afsendere skal du vente på, at registreringen er fuldført i stedet for at skifte numre for at komme uden om den. Brug [Twilios fejlfinding ved registrering](https://www.twilio.com/docs/messaging/compliance/a2p-10dlc/troubleshooting-a2p-brands) og den medfølgende fejlkodereference. Angiv ikke en fast behandlingstid.
