---
title: "Kirkeinnstillinger"
---

# Kirkeinnstillinger {#church-settings}

<div class="article-intro">

Siden Kirkeinnstillinger er der du konfigurerer kirkens grunnleggende informasjon, kontaktopplysninger og profilering. Disse opplysningene brukes i alle ChurchApps-verktøy, inkludert nettstedet ditt på B1.church og B1 Mobile-appen.

</div>

<div class="prereqs">
<h4>Før du begynner</h4>

- Du trenger tillatelsen «Rediger kirkeinnstillinger». Se [Roller og tillatelser](./roles-permissions.md) hvis du ikke har tilgang.
- Ha kirkens adresse, kontaktinformasjon og logo klar

</div>

## Redigere kirkeinformasjonen din {#editing-your-church-information}

1. I B1 Admin åpner du [Hurtigmenyen](../introduction.md#getting-around-with-the-jump-menu) (søkefeltet øverst til venstre), utvider **Innstillinger** og klikker på **Innstillinger**.
2. I delen **Kirkeinformasjon** (øverst på siden) klikker du på **Rediger**.
3. Oppdater hvilke som helst av følgende felt:
   - **Kirkens navn** – navnet som vises i alle ChurchApps-produkter.
   - **Adresse** – kirkens fysiske adresse.
   - **Kontaktinformasjon** – telefonnummer, e-post og andre kontaktdetaljer.
   - **Tidssone** – kirkens tidssone. Se [Tidssone](#time-zone) nedenfor.
4. Klikk på **Lagre** for å bruke endringene.

## Sette opp underdomenet ditt {#setting-up-your-subdomain}

Kirken din får et gratis underdomene på **dinkirke.1.church**. Dette er webadressen der medlemmer og besøkende kan finne kirkens nettilstedeværelse.

1. På siden Innstillinger klikker du på **Rediger** i delen **Kirkeinformasjon** og finner feltet **Underdomene**.
2. Skriv inn ønsket underdomene (for eksempel «nadekirken» for nadekirken.1.church).
3. Lagre endringene.

:::info
Underdomenet ditt må være unikt blant alle ChurchApps-kirker. Hvis navnet du ønsker er tatt, prøv å legge til by eller fylke (for eksempel «nadekirken-oslo»).
:::

Hvis du vil at besøkende skal nå nettstedet ditt på ditt eget domene (for eksempel **www.nadekirken.org**), se [Eget domene](./custom-domain.md).

## Konfigurere merkevarebygging {#configuring-branding}

Tilpass hvordan kirken din vises i alle ChurchApps-verktøy:

1. Last opp **kirkens logo** ved å klikke på logoområdet og velge en bildefil.
2. Legg til eventuelle ekstra **kirkebilder** som brukes på nettstedet ditt og i [mobilappen](./mobile-app.md).

:::tip
For best resultat bruk en logo med gjennomsiktig bakgrunn i PNG-format. Da ser den bra ut på både lyse og mørke bakgrunner.
:::

## Første ukedag {#first-day-of-week}

Velg hvilken dag kalenderne dine starter på. Nedtrekkslisten **Første ukedag** i delen Kirkeinformasjon er satt til **søndag** som standard, men kan settes til en hvilken som helst dag. Når du endrer den, brukes den i kalenderoppsettet i B1 Admin og på B1.church-medlemsportalen – gruppekalendere, kuraterte kalendere og hendelseseditoren viser alle uker som starter på dagen du velger.

## Tidssone {#time-zone}

Nedtrekkslisten **Tidssone** i delen **Kirkeinformasjon** setter kirkens tidssone (for eksempel *America/Chicago*). Velg **Ingen** for å la feltet stå tomt. Når du har lagret, vises sonen i sammendraget for Kirkeinformasjon.

B1 bruker denne tidssonen for tider som gjelder hele kirken, for eksempel påminnelser om hendelser og tidsplanene på dine [FreePlay](../../freeplay/scheduled-mode/scheduling-the-calendar.md)-TV-er. [Innsjekkplaner](../attendance/setup.md#setting-a-check-in-schedule) måles først i tidssonen til gudstjenestens [campus](./campuses.md), og bruker kun kirkens tidssone når campuset ikke har en. Hvis alle campusene dine ligger i samme tidssone, sett den både på kirken og på hvert campus.

## Region (dato- og telefonformat) {#region-date-and-phone-format}

Innstillingen **Region** styrer hvordan datoer og klokkeslett skrives i hele B1. Som standard brukes det amerikanske datoformatet (for eksempel «Sep 28, 2026» og «9/28/2026»). Kirker utenfor USA kan bytte til sitt eget format – for eksempel vil valget engelsk (Storbritannia) vise «28 Sept 2026» og «28/09/2026» i stedet.

1. På siden Innstillinger klikker du på **Region** i listen til venstre, og deretter på **Rediger** i delen **Region**.
2. Velg regionen din i nedtrekkslisten **Region**. Hvert valg viser en eksempeldato, slik at du kan se nøyaktig hvordan datoene blir seende ut.
3. Klikk på **Lagre**.

Delen Region viser deretter den valgte regionen, et eksempel på **Datoformat** og formatet for **Telefonnumre**.

### Telefonnummerformat {#phone-number-format}

Samme region-del har en innstilling for **Telefonnumre** som styrer hvordan telefonnumre legges inn på en persons post:

- **Internasjonal (med landskode)** – standard. Telefonfelt viser en landvelger med flagg og lagrer numrene med landskode (for eksempel +1 918 555 1234).
- **Lokal (slik det skrives)** – telefonfelt blir vanlige tekstbokser og lagrer numrene akkurat slik du skriver dem, uten landskode (for eksempel 0701 234 5678). Velg dette hvis kirken din skriver numre i lokalt format og ikke vil at B1 skal legge til landskode.

Når **Lokal** er valgt, viser delen Region også «Lokale telefonnumre» ved siden av regionen din.

:::tip
Tekstmeldinger fungerer best når numrene har landskode. Hvis du sender tekstmeldinger fra B1, behold formatet **Internasjonal**, eller sørg for at numre du skriver inn i lokal modus har landskode.
:::

Regionen din gjelder for datoer og klokkeslett i hele B1 Admin og på B1.church-nettstedet ditt og medlemsportalen, inkludert preken, blogginnlegg, gruppekalendere og tjenesteplaner, slik at medlemmene ser datoer i samme format som de ansatte.

## Tekstmeldinger {#texting}

Koble til en tekstmeldingsleverandør for å sende SMS til én person eller en hel gruppe fra B1 Admin. Meldingene sendes via din egen konto hos leverandøren, så deres priser og grenser gjelder.

1. På siden Innstillinger klikker du på **Tekstmeldinger** i listen til venstre, og deretter på **Rediger** i delen **Tekstmeldinger**.
2. Velg en **Leverandør**:
   - **Clearstream** – skriv inn en **API-nøkkel**. Opprett en i Clearstream under Kontoinnstillinger, under API Keys.
   - **Text In Church** – skriv inn en **API-nøkkel**. Be først Text In Churchs support om tilgang til utvikler-API, og opprett deretter en nøkkel under Kontoinnstillinger > Developer API.
   - **Nalo Solutions** (Ghana) – skriv inn autentiseringsnøkkelen fra din Nalo Solutions-konto som **API-nøkkel**, og en **Avsender-ID** (opptil 11 tegn) som Nalo har godkjent for deg.
3. Klikk på **Lagre**.

For å slutte med tekstmeldinger, sett **Leverandør** til **Ingen** og lagre. Dette fjerner den lagrede leverandøren.

### Melde av personer som svarer STOP {#opting-out-people-who-reply-stop}

Når en leverandør er lagret, åpner du delen Tekstmeldinger på nytt med **Rediger**. Under leverandørinnstillingene viser et skrivebeskyttet felt, **Webhook-URL for innkommende STOP**, en webadresse som er unik for kirken din. Klikk i feltet for å markere adressen, kopier den, og lim den inn i leverandørens innstilling for innkommende meldinger (svar) webhook. Dette fungerer med alle leverandørene ovenfor som kan videresende innkommende svar til en webhook.

Etter dette, når noen svarer **STOP** (eller STOPALL, UNSUBSCRIBE, CANCEL, END, QUIT, OPTOUT eller REVOKE) på en av meldingene dine, finner B1 alle med et mobilnummer som stemmer, markerer dem som avmeldt og slår av tekstpåminnelsene deres. De hoppes så over ved gruppemeldinger. Andre svar ignoreres.

:::info
Dette bruker samme avmeldingsinnstilling som **Skjul meg fra medlemskatalogen**, så personer som svarer STOP vises også som **Skjult fra katalog** på profilen sin. Feltet vises bare når den lagrede leverandøren er valgt – hvis du bytter til en annen leverandør i nedtrekkslisten, lagre først for å se URL-en igjen.
:::

Når en leverandør er tilkoblet, ser ansatte med tillatelse til å sende tekstmeldinger en knapp **Tekst** på siden til en gruppe (**Send tekst til gruppen**) og til en person med mobiltelefon (**Send tekstmelding**). Skriv meldingen din og klikk på **Send**. Dialogboksen teller tegn og SMS-segmenter. For en gruppe viser den hvor mange medlemmer som får meldingen før du sender:

- Medlemmer uten mobiltelefon registrert hoppes over.
- Medlemmer som har valgt **Skjul meg fra medlemskatalogen**, regnes som avmeldt og hoppes over.
- Familiemedlemmer som deler et mobilnummer får meldingen bare én gang.

### Tilpasse tekstmeldinger med flettefelt {#personalizing-texts-with-merge-fields}

Under meldingsboksen viser dialogboksen for tekst brikker med plassholdere: **Fornavn**, **Etternavn**, **Visningsnavn** og **Kirkens navn**. Klikk på en brikke for å sette inn plassholderen (`{{firstName}}`, `{{lastName}}`, `{{displayName}}` eller `{{churchName}}`) ved markøren. Når meldingen sendes, erstattes hver plassholder med mottakerens opplysninger, slik at en gruppemelding som `Hei {{firstName}}, vi ses på søndag!` når hvert medlem med sitt eget navn. Plassholdere fungerer både for gruppemeldinger og for meldinger til én person.

:::info
Grensen på 1 600 tegn gjelder meldingen slik du skriver den. Etter at plassholderne er fylt inn, kuttes all tekst lengre enn 1 600 tegn av ved den grensen.
:::

Tekstmeldinger kan også sendes automatisk fra et [arbeidsflyt](../serving/workflows.md#sending-a-text)-steg med handlingen **Send tekstmelding**, som bruker samme leverandør og plassholdere.

## Fillagring {#file-storage}

Som standard bruker filene du laster opp til nettstedet ditt (via [Filer](../website/files.md)) og andre innholdsområder B1s gratis lagring i skyen, opptil 100 MB. Hvis du trenger mer plass, kan du koble til din egen skylagring i stedet – nye opplastinger går da rett til din konto uten grense fra plattformen.

1. På siden Innstillinger klikker du på **Fillagring** i listen til venstre, og deretter på **Rediger** i delen **Fillagring**.
2. Velg en leverandør: **Google Drive**, **Dropbox**, **OneDrive** eller en **S3-kompatibel bucket** (AWS S3, Cloudflare R2, Backblaze B2 osv.).
3. For Google Drive, Dropbox eller OneDrive klikker du på **Koble til** og logger inn for å gi tilgang. For en S3-kompatibel bucket skriver du inn tilgangsnøkkel, hemmelig nøkkel, bucket-navn og grunn-URL for offentlig tilgang.
4. Klikk på **Lagre**.

:::info
Dette påvirker bare nye opplastinger til Filer på nettstedet ditt og lignende innholdsområder. Galleribilder, miniatyrbilder, logoer og personbilder blir alltid liggende på B1s standardlagring.
:::

## Opprykk til neste klassetrinn {#grade-promotion}

Hvis du følger med på **klassetrinn** for barn og elever, kan B1 automatisk flytte alle ett klassetrinn opp på en dato du velger (for eksempel 1. august), i stedet for at du må redigere hver profil for hånd.

1. På siden Innstillinger klikker du på **Opprykk til neste klassetrinn** i listen til venstre, og deretter på **Rediger** i delen **Opprykk til neste klassetrinn**.
2. Slå på bryteren (den viser **Aktivert**) og velg **Måned** og **Dag** for når klassetrinnene skal rykke opp hvert år. På den datoen flytter alle med et klassetrinn opp ett trinn, og elever på 12. trinn blir **Utdannet**.
3. Lagre endringene.

For å stoppe automatisk opprykk, slå av bryteren slik at den viser **Deaktivert**, og lagre. Opprykksdatoen fjernes, og klassetrinnene endres ikke lenger av seg selv.

## Frivillig påmelding {#volunteer-signup}

Som standard ser medlemmer som blar i [frivillig påmelding](../../b1-church/serving/volunteer-signup.md) alle kommende uker som har ledige plasser. Hvis listen blir lang, kan du i stedet vise bare neste uke for hver planType.

1. På siden Innstillinger klikker du på **Frivillig påmelding** i listen til venstre, og deretter på **Rediger** i delen **Frivillig påmelding**.
2. Slå på **Vis bare neste uke for hver planType**.
3. Lagre endringene.

Med dette påslått viser hver planType bare sin neste kommende plan. Den påfølgende uken vises når den datoen har passert. Raden **Viste uker** i delen viser **Bare neste uke for hver planType** eller **Alle kommende uker**.

## Personvern for gaver {#giving-privacy}

Personer med tilgang til gaver ser normalt en persons gavesummer på [personposten](../people/adding-people.md#editing-details). Hvis du heller ikke vil ha beløp på skjermen hver gang en post åpnes, kan du skjule dem til noen ber om å se dem.

1. På siden Innstillinger klikker du på **Personvern for gaver** i listen til venstre, og deretter på **Rediger** i delen **Personvern for gaver**.
2. Slå på **Skjul gaver på personposter til de klikkes på**.
3. Lagre endringene.

Med dette påslått står det på gavekortet på en personpost «Gaver er skjult på personposter». Klikk på **Vis gaver** for å laste inn og vise gavene til den personen. De skjules igjen når du åpner en annen person. Hvem som kan se gaver endres ikke: bare personer med tilgang til gaver ser kortet i det hele tatt.

## Import og eksport {#import-and-export}

Lenken **Import/eksport** under kirkens navn på siden Innstillinger åpner et eget verktøy i et nytt nettleservindu. Bruk det til å:

- Importere medlemsdata fra et annet system for kirkeadministrasjon.
- Eksportere ChurchApps-dataene dine for sikkerhetskopi eller flytting.

Dette er spesielt nyttig når du setter opp kirken din for første gang og trenger å overføre eksisterende poster til ChurchApps.

:::warning
Når du importerer data, må du alltid ta sikkerhetskopi av de eksisterende postene først. Importoperasjoner legger til data i systemet ditt og kan skape dupliserte poster hvis de kjøres flere ganger.
:::
