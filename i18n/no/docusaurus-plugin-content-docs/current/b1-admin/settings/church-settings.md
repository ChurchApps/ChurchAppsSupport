---
title: "Kirkeinnstillinger"
description: "Angi navn, adresse, subdomene, tidssone, regionformat, tekstmeldingsleverandør og fillagring for menigheten din på siden Kirkeinnstillinger i B1 Admin."
---

# Kirkeinnstillinger

<div class="article-intro">

Siden Kirkeinnstillinger er der du konfigurerer menighetens grunnleggende informasjon, kontaktopplysninger og merkevare. Disse opplysningene brukes i alle ChurchApps-verktøy, inkludert B1.church-nettstedet ditt og B1-appen.

</div>

## Opplæringsvideo {#training-video}

<YouTube id="634zSbzDkYA" title="Sette opp kirkeinfo og merkevare i B1" next="Roller, tillatelser og invitere teamet ditt i B1" nextUrl="/docs/b1-admin/settings/roles-permissions" />

<div class="prereqs">
<h4>Før du begynner</h4>

- Du trenger tillatelsen «Rediger kirkeinnstillinger». Se [Roller og tillatelser](./roles-permissions.md) hvis du ikke har tilgang.
- Ha menighetens adresse, kontaktinformasjon og logo klar

</div>

## Redigere informasjon om menigheten {#editing-your-church-information}

1. I B1 Admin åpner du [Hurtigmenyen](../introduction.md#getting-around-with-the-jump-menu) (søkefeltet øverst til venstre), utvider **Innstillinger** og klikker på **Innstillinger**.
2. I delen **Kirkeinformasjon** (øverst på siden) klikker du på **Rediger**.
3. Oppdater hvilke som helst av følgende felt:
   - **Kirkenavn** *(obligatorisk)* -- Navnet som vises i alle ChurchApps-produkter.
   - **Subdomene** *(obligatorisk)* -- Din gratis B1-webadresse. Se [Sette opp subdomenet ditt](#setting-up-your-subdomain) nedenfor.
   - **Adresselinje 1**, **Adresselinje 2**, **By**, **Stat**, **Postnummer** og **Land** -- Menighetens fysiske adresse.
   - **Første dag i uken** -- Se [Første dag i uken](#first-day-of-week) nedenfor.
   - **Tidssone** -- Menighetens tidssone. Se [Tidssone](#time-zone) nedenfor.
4. Klikk på **Lagre** for å bruke endringene, eller **Avbryt** for å forkaste dem.

Kirkenavnet, subdomenet og adressen vises også i panelet øverst til venstre på siden Innstillinger.

## Sette opp subdomenet ditt {#setting-up-your-subdomain}

Menigheten din får et gratis subdomene på **yourchurch.b1.church**. Dette er webadressen medlemmer og besøkende bruker for å nå menighetens nettilstedeværelse.

1. På siden Innstillinger klikker du på **Rediger** i delen **Kirkeinformasjon** og finner feltet **Subdomene**.
2. Skriv inn ønsket subdomene (for eksempel «gracechurch» for gracechurch.b1.church).
3. Lagre endringene.

:::info
Subdomenet ditt må være unikt blant alle ChurchApps-menigheter. Hvis ønsket navn er tatt, kan du prøve å legge til by eller stat (for eksempel «gracechurch-dallas»).
:::

Hvis du vil at besøkende skal nå nettstedet ditt på ditt eget domene (for eksempel **`www.gracechurch.org`**), se [Eget domene](./custom-domain.md).

## Konfigurere merkevare {#configuring-branding}

Logoen og fargene dine settes ikke på siden Innstillinger. Last opp menighetens logo og velg fargene dine under **Nettside > Utseende** -- se [Logo og merkevare](../website/appearance.md#logo-and-branding). Fargene som brukes av B1-appen, medlemsportalen og innsjekkingskiosken settes under **Mobil > App-tema** -- se [App-tema](./mobile-app.md#app-theme).

## Generelt (støttekontakt) {#general-support-contact}

Delen **Generelt** inneholder din **støttekontakt**: e-postadressen eller lenken til kontaktskjemaet folk bruker for å nå menigheten din. Klikk på **Rediger** i delen **Generelt**, skriv inn den i feltet **Lenke**, og klikk på **Lagre**. Inntil du angir en, viser delen **Ikke angitt**.

## Første dag i uken {#first-day-of-week}

Velg hvilken dag kalenderne dine starter på. Nedtrekkslisten **Første dag i uken** i delen Kirkeinfo er satt til **søndag** som standard, men kan settes til hvilken som helst dag. Når den er endret, brukes den i kalenderrutenettene i B1 Admin og i B1.church-medlemsportalen -- gruppekalendere, kuraterte kalendere og arrangementseditoren viser alle uker som starter på dagen du velger.

## Tidssone {#time-zone}

Nedtrekkslisten **Tidssone** i delen **Kirkeinformasjon** setter menighetens tidssone (for eksempel *America/Chicago*). Velg **Ingen** for å la feltet stå tomt. Når den er lagret, vises sonen i sammendraget for kirkeinformasjon.

B1 bruker denne tidssonen for tidspunkter som gjelder hele menigheten, for eksempel påminnelser om arrangementer og planene for TV-ene dine med [FreePlay](../../freeplay/scheduled-mode/scheduling-the-calendar.md). [Innsjekkingsplaner](../attendance/setup.md#setting-a-check-in-schedule) måles først i tidssonen til gudstjenestens [menighetsenhet](./campuses.md), og bruker menighetens tidssone bare når menighetsenheten ikke har en. Hvis alle menighetsenhetene dine ligger i samme tidssone, setter du den både på menigheten og på hver menighetsenhet.

## Region (dato- og telefonformat) {#region-date-and-phone-format}

Innstillingen **Region** styrer hvordan datoer og klokkeslett skrives gjennom hele B1. Som standard bruker datoer det amerikanske formatet (for eksempel «Sep 28, 2026» og «9/28/2026»). Menigheter utenfor USA kan bytte til sitt eget format -- for eksempel viser valget av norsk (Norge) «28. sep. 2026» og «28.09.2026».

1. På siden Innstillinger klikker du på **Region** i listen til venstre, og deretter på **Rediger** i delen **Region**.
2. Velg regionen din i nedtrekkslisten **Region**. Hvert alternativ viser en eksempeldato, slik at du kan se nøyaktig hvordan datoene vil se ut.
3. Klikk på **Lagre**.

Delen Region viser deretter valgt region, et eksempel på **datoformatet** og ditt format for **telefonnumre**.

### Format for telefonnumre {#phone-number-format}

Den samme delen Region har en innstilling for **Telefonnumre** som styrer hvordan telefonnumre skrives inn på en persons registrering:

- **Internasjonalt (med landskode)** -- standard. Telefonfelt viser en landvelger med flagg og lagrer numre med landskoden (for eksempel +1 918 555 1234).
- **Lokalt (som skrevet)** -- telefonfelt blir vanlige tekstbokser og lagrer numre akkurat slik du skriver dem, uten å legge til landskode (for eksempel 012 34 567). Velg dette hvis menigheten din skriver numre i lokalt format og ikke vil at B1 skal legge til landskode.

Når **Lokalt** er valgt, viser delen Region også «Lokale telefonnumre» ved siden av regionen din.

:::tip
Tekstmeldinger fungerer best når numrene inkluderer landskoden. Hvis du sender tekstmeldinger fra B1, behold formatet **Internasjonalt**, eller sørg for at numre du skriver inn i lokal modus inkluderer landskoden.
:::

Regionen din gjelder for datoer og klokkeslett i B1 Admin og på B1.church-nettstedet og medlemsportalen din, inkludert preken, blogginnlegg, gruppekalendere og tjenesteplaner, slik at medlemmene ser datoer i samme format som de ansatte gjør.

## Tekstmeldinger {#texting}

Koble til en tekstmeldingsleverandør for å sende SMS til en person eller en hel gruppe fra B1 Admin. Tekstmeldinger sendes gjennom din egen konto hos leverandøren, så deres priser og grenser gjelder.

1. På siden Innstillinger klikker du på **Tekstmeldinger** i listen til venstre, og deretter på **Rediger** i delen **Tekstmeldinger**.
2. Velg en **leverandør**:
   - **Clearstream** -- skriv inn en **API-nøkkel**. Opprett en i Clearstream-kontoinnstillingene dine under API-nøkler.
   - **Text In Church** -- skriv inn en **API-nøkkel**. Be først Text In Church Support om tilgang til utvikler-API, og opprett deretter en nøkkel under Kontoinnstillinger > Utvikler-API.
   - **Nalo Solutions** (Ghana) -- skriv inn autorisasjonsnøkkelen fra Nalo Solutions-kontoen din som **API-nøkkel**, og en **avsender-ID** (opptil 11 tegn) som Nalo har godkjent for deg.
   - **Twilio** -- bruk menighetens egen Twilio-konto; Twilio fakturerer deg direkte. Kopier **Account SID** og **Auth Token** fra [Twilio Console](https://console.twilio.com), og skriv inn et **avsendernummer** -- et Twilio-telefonnummer registrert for A2P 10DLC, i et format som `+15551234567`. Etter lagring limer du inn webhook-adressen for innkommende meldinger (se nedenfor) i nummerets webhook **En melding kommer inn** i Twilio, slik at STOP-svar også registreres i B1.
3. Klikk på **Lagre**.

For å slutte med tekstmeldinger setter du **Leverandør** til **Ingen** og lagrer. Dette fjerner den lagrede leverandøren.

### Melde av personer som svarer STOP {#opting-out-people-who-reply-stop}

Når en leverandør er lagret, åpner du delen Tekstmeldinger igjen med **Rediger**. Under innstillingene for leverandøren vises et skrivebeskyttet felt for **webhook-adresse for innkommende STOP**, en webadresse som er unik for menigheten din. Klikk i feltet for å markere adressen, kopier den, og lim den inn i leverandørens innstilling for webhook for innkommende meldinger (svar). Dette fungerer med alle leverandørene over som kan videresende innkommende svar til en webhook.

Etter dette, når noen svarer **STOP** (eller STOPALL, UNSUBSCRIBE, CANCEL, END, QUIT, OPTOUT eller REVOKE) på en av tekstmeldingene dine, finner B1 alle med et mobilnummer som stemmer, markerer dem som avmeldt og slår av tekstpåminnelsene deres. De hoppes deretter over ved gruppetekster. Andre svar ignoreres.

:::info
Dette bruker samme avmeldingsinnstilling som **Skjul meg fra medlemskatalogen**, så personer som svarer STOP vises også som **Skjult fra katalogen** på profilen sin. Feltet vises bare når den lagrede leverandøren er valgt -- hvis du bytter til en annen leverandør i nedtrekkslisten, må du lagre først for å se adressen igjen.
:::

Når en leverandør er koblet til, ser medarbeidere med tillatelse til å sende tekstmeldinger en knapp **Tekst** på siden for en gruppe (**Send tekst til denne gruppen**) og for en person med mobiltelefon (**Send tekstmelding**). Skriv inn meldingen og klikk på **Send**. Dialogen teller tegn og SMS-segmenter. For en gruppe viser den hvor mange medlemmer som får teksten før du sender:

- Medlemmer uten mobiltelefon registrert hoppes over.
- Medlemmer som har valgt **Skjul meg fra medlemskatalogen** telles som avmeldt og hoppes over.
- Familiemedlemmer som deler et mobilnummer får teksten bare én gang.

### Tilpasse tekster med flettefelt {#personalizing-texts-with-merge-fields}

Under meldingsboksen viser tekstdialogen plassholderbrikker: **Fornavn**, **Etternavn**, **Visningsnavn** og **Menighetsnavn**. Klikk på en brikke for å sette inn plassholderen (`{{firstName}}`, `{{lastName}}`, `{{displayName}}` eller `{{churchName}}`) der markøren står. Når teksten sendes, erstattes hver plassholder med mottakerens opplysninger, slik at en gruppetekst som `Hi {{firstName}}, see you Sunday!` når hvert medlem med sitt eget navn. Plassholdere fungerer både for gruppetekster og tekster til en enkelt person. Tekster til en gruppe tilbyr i tillegg en brikke for **Gruppenavn** (`{{groupName}}`), som erstattes med gruppens navn.

For å gjenbruke en melding kan du lagre den som en [tekstmal](./email-templates.md#text-templates) (en e-postmal med kategorien **Tekst**) og velge den fra **Last inn mal (valgfritt)** øverst i tekstvinduet.

:::info
Grensen på 1 600 tegn gjelder meldingen slik du skriver den. Etter at plassholderne er fylt inn, kuttes all tekst som er lengre enn 1 600 tegn av ved den lengden.
:::

Tekstmeldinger kan også sendes automatisk fra et steg i en [arbeidsflyt](../serving/workflows.md#sending-a-text) med handlingen **Send tekstmelding**, som bruker samme leverandør og plassholdere.

## Fillagring {#file-storage}

Som standard bruker filer du laster opp til nettstedet ditt (gjennom [Filer](../website/files.md)) og andre innholdsområder B1s gratis vertsbaserte lagring, opptil 100 MB. Hvis du trenger mer plass, kan du koble til din egen skylagring i stedet -- nye opplastinger går da rett til din konto uten grense fra plattformen.

1. På siden Innstillinger klikker du på **Fillagring** i listen til venstre, og deretter på **Rediger** i delen **Fillagring**.
2. Velg en **leverandør**: **Google Drive**, **Dropbox** eller **S3-kompatibel bøtte (S3, R2, B2)** (AWS S3, Cloudflare R2, Backblaze B2 osv.). **ChurchApps (gratis)** er den innebygde lagringen.
3. For Google Drive eller Dropbox klikker du på **Koble til konto** og logger inn for å gi tilgang. Et merke **Konto tilkoblet** vises når det fungerte; du må koble til før du kan lagre. For en S3-kompatibel bøtte skriver du inn **Access Key Id**, **Secret Access Key**, **Bøtte**, **Endepunkt** (la stå tom for AWS), **Region** og **Base-URL for offentlig tilgang**. **Bøtte** og **Base-URL for offentlig tilgang** er obligatoriske, og bøtten må tillate offentlig lesing og CORS-opplastinger fra B1.
4. Klikk på **Lagre**.

For å gå tilbake til gratis lagring velger du **ChurchApps (gratis)** og lagrer. Filer som allerede er lastet opp, blir der de er.

:::info
Dette gjelder bare nye opplastinger til filene på nettstedet ditt og lignende innholdsområder. Galleribilder, miniatyrbilder, logoer og bilder av personer blir alltid på B1s standardlagring.
:::

## Giving {#giving}

Delen **Giving** kobler til betalingsleverandøren din og setter menighetens valuta for nettgiving og betalte påmeldinger. Se [Oppsett for nettgiving](../donations/online-giving-setup.md). Den vises bare for personer som kan redigere innstillinger for giving.

## Innsjekking {#check-in}

Delen **Innsjekking** setter **håndheving av frivilligforhold** -- om innsjekking bare skal gi en advarsel (**Advar (tillat med bekreftelse)**) eller stoppe innsjekkingen (**Blokker (forhindre innsjekking)**) når et rom mangler frivillige. Se [Frivilligforhold](../attendance/checkin-safety.md#volunteer-ratios). Lenken **Innsjekkingskiosk, QR og etiketter** under den åpner innstillingene for kiosken på siden Mobil.

## Klassetrinnsopprykk {#grade-promotion}

Hvis du registrerer **klassetrinn** for barn og elever, kan B1 automatisk flytte alle opp ett klassetrinn på en dato du velger (for eksempel 1. august), i stedet for at du må redigere hver profil for hånd.

1. På siden Innstillinger klikker du på **Klassetrinnsopprykk** i listen til venstre, og deretter på **Rediger** i delen **Klassetrinnsopprykk**.
2. Slå på bryteren (den viser **Aktivert**) og velg **måned** og **dag** for når klassetrinnene skal flyttes opp hvert år. På den datoen flyttes alle med et klassetrinn opp ett trinn, og elever på 12. trinn blir **Uteksaminert**.
3. Lagre endringene dine.

For å stanse automatisk opprykk slår du av bryteren, så den viser **Deaktivert**, og lagrer. Opprykksdatoen fjernes, og klassetrinnene endres ikke lenger av seg selv.

## Frivillig påmelding {#volunteer-signup}

Som standard ser medlemmer som blar i [frivillig påmelding](../../b1-church/serving/volunteer-signup.md) hver kommende uke som har ledige plasser. Hvis listen blir lang, kan du i stedet vise bare neste uke for hver plantype.

1. På siden Innstillinger klikker du på **Frivillig påmelding** i listen til venstre, og deretter på **Rediger** i delen **Frivillig påmelding**.
2. Slå på **Vis bare neste uke for hver plantype**.
3. Lagre endringene dine.

Med dette på viser hver plantype bare sin neste kommende plan. Den følgende uken vises når datoen er passert. Raden **Uker som vises** i delen viser **Bare neste uke for hver plantype** eller **Alle kommende uker**.

## Personvern for giving {#giving-privacy}

Personer med tilgang til giving ser normalt en persons givingsoversikt på [personregistreringen](../people/adding-people.md#editing-details). Hvis du heller ikke vil ha beløp på skjermen hver gang en registrering åpnes, kan du skjule dem til noen ber om det.

1. På siden Innstillinger klikker du på **Personvern for giving** i listen til venstre, og deretter på **Rediger** i delen **Personvern for giving**.
2. Slå på **Skjul giving på personregistreringer til det klikkes på**.
3. Lagre endringene dine.

Med dette på viser givingskortet på en personregistrering teksten «Giving er skjult på personregistreringer». Klikk på **Vis giving** for å laste inn og vise den personens giving. Den skjules igjen når du åpner en annen person. Hvem som kan se giving endres ikke: bare personer med tilgang til giving ser kortet.

## Import og eksport {#import-and-export}

Lenken **Import/eksport** under menighetens navn på siden Innstillinger åpner et eget verktøy i et nytt nettleservindu. Bruk det til å:

- Importere medlemsdata fra et annet system for kirkeadministrasjon.
- Eksportere ChurchApps-dataene dine for sikkerhetskopi eller flytting.

Dette er spesielt nyttig når du setter opp menigheten din for første gang og må overføre eksisterende registreringer til ChurchApps.

:::warning
Når du importerer data, ta alltid sikkerhetskopi av de eksisterende registreringene dine først. Importeringer legger til data i systemet ditt, og kan lage dupliserte oppføringer hvis de kjøres flere ganger.
:::
