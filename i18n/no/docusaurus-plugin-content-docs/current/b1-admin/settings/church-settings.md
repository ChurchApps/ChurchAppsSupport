---
title: "Kirkeinnstillinger"
---

# Kirkeinnstillinger

<div class="article-intro">

Siden Kirkeinnstillinger er der du konfigurerer kirkens grunnleggende informasjon, kontaktopplysninger og merkevare. Disse opplysningene brukes i alle ChurchApps-verktøy, inkludert B1.church-nettstedet ditt og B1 Mobile-appen.

</div>

<div class="prereqs">
<h4>Før du begynner</h4>

- Du trenger tillatelsen «Rediger kirkeinnstillinger». Se [Roller og tillatelser](./roles-permissions.md) hvis du ikke har tilgang.
- Ha kirkens adresse, kontaktopplysninger og logo klar

</div>

## Redigere kirkens informasjon

1. I B1 Admin åpner du [Hurtigmenyen](../introduction.md#getting-around-with-the-jump-menu) (søkefeltet øverst til venstre), utvider **Innstillinger** og klikker på **Innstillinger**.
2. I seksjonen **Kirkeinformasjon** (øverst på siden) klikker du på **Rediger**.
3. Oppdater hvilke som helst av disse feltene:
   - **Kirkens navn** -- navnet som vises i alle ChurchApps-produkter.
   - **Adresse** -- kirkens fysiske adresse.
   - **Kontaktinformasjon** -- telefonnummer, e-post og andre kontaktopplysninger.
   - **Tidssone** -- kirkens tidssone. Se [Tidssone](#time-zone) nedenfor.
4. Klikk på **Lagre** for å ta i bruk endringene dine.

## Sette opp underdomenet ditt

Kirken din får et gratis underdomene på **dinkirke.1.church**. Dette er webadressen der medlemmer og besøkende kan finne kirkens nettilstedeværelse.

1. På innstillingssiden klikker du på **Rediger** i seksjonen **Kirkeinformasjon** og finner feltet **Underdomene**.
2. Skriv inn ønsket underdomene (for eksempel «nadenkirke» for nadenkirke.1.church).
3. Lagre endringene dine.

:::info
Underdomenet ditt må være unikt på tvers av alle ChurchApps-kirker. Hvis navnet du ønsker er tatt, prøv å legge til byen eller fylket ditt (for eksempel «nadenkirke-oslo»).
:::

Hvis du vil at besøkende skal nå nettstedet ditt på ditt eget domene (for eksempel **`www.nadenkirke.no`**), se [Eget domene](./custom-domain.md).

## Konfigurere merkevare

Tilpass hvordan kirken din vises i alle ChurchApps-verktøy:

1. Last opp **kirkelogoen** din ved å klikke på logoområdet og velge en bildefil.
2. Legg til eventuelle ekstra **kirkebilder** som brukes på nettstedet ditt og i [mobilappen](./mobile-app.md).

:::tip
For best resultat bruker du en logo med transparent bakgrunn i PNG-format. Dette sikrer at den ser bra ut på både lys og mørk bakgrunn.
:::

## Første dag i uken

Velg hvilken dag kalenderne dine starter på. Rullegardinlisten **Første dag i uken** i seksjonen Kirkeinformasjon er satt til **søndag** som standard, men kan settes til hvilken dag som helst. Når du har endret den, respekteres den i kalenderrutenettene i B1 Admin og i B1.church-medlemsportalen — gruppekalendere, kuraterte kalendere og hendelseseditoren legger alle ut ukene med start på dagen du velger.

## Tidssone {#time-zone}

Rullegardinlisten **Tidssone** i seksjonen **Kirkeinformasjon** setter kirkens tidssone (for eksempel *America/Chicago*). Velg **Ingen** for å la feltet stå tomt. Når du har lagret, vises sonen i sammendraget for kirkeinformasjon.

B1 bruker denne tidssonen for kirkeomfattende tider, for eksempel påminnelser om hendelser og tidsplanene på [FreePlay](../../freeplay/scheduled-mode/scheduling-the-calendar.md)-TV-ene dine. [Innsjekkingsplaner](../attendance/setup.md#setting-a-check-in-schedule) måles først i tidssonen til gudstjenestens [campus](./campuses.md), og bruker kirkens tidssone bare når campusen ikke har en. Hvis alle campusene dine er i samme tidssone, setter du den både på kirken og på hver campus.

## Region (dato- og telefonformat)

Innstillingen **Region** styrer hvordan datoer og klokkeslett skrives i hele B1. Som standard bruker datoer det amerikanske formatet (for eksempel «Sep 28, 2026» og «9/28/2026»). Kirker utenfor USA kan bytte til sitt eget format — for eksempel viser valget norsk (Norge) «28. sep. 2026» og «28.09.2026».

1. På innstillingssiden klikker du på **Region** i listen til venstre, og deretter på **Rediger** i seksjonen **Region**.
2. Velg regionen din fra rullegardinlisten **Region**. Hvert alternativ viser en eksempeldato, slik at du kan se nøyaktig hvordan datoene vil se ut.
3. Klikk på **Lagre**.

Seksjonen Region viser deretter den valgte regionen, et eksempel på **datoformatet** og formatet for **telefonnumre**.

### Format for telefonnumre

Den samme seksjonen Region har en innstilling for **telefonnumre** som styrer hvordan telefonnumre legges inn på en persons post:

- **Internasjonalt (med landkode)** -- standard. Telefonfelt viser en landflaggvelger og lagrer numre med landkode (for eksempel +47 912 34 567).
- **Lokalt (slik det skrives)** -- telefonfelt blir vanlige tekstbokser og lagrer numre akkurat slik du skriver dem, uten landkode (for eksempel 912 34 567). Velg dette hvis kirken din skriver numre i et lokalt format og ikke vil at B1 skal legge til en landkode.

Når **Lokalt** er valgt, viser seksjonen Region også «Lokale telefonnumre» ved siden av regionen din.

:::tip
Tekstmeldinger fungerer best når numrene inkluderer landkoden. Hvis du sender tekstmeldinger fra B1, bruk formatet **Internasjonalt**, eller sørg for at numre du skriver inn i lokal modus inkluderer landkoden.
:::

Regionen din gjelder for datoer og klokkeslett i hele B1 Admin og på B1.church-nettstedet ditt og medlemsportalen, inkludert preken, blogginnlegg, gruppekalendere og tjenesteplaner, slik at medlemmene ser datoer i samme format som de ansatte.

## Tekstmeldinger {#texting}

Koble til en leverandør av tekstmeldinger for å sende SMS-meldinger til en person eller en hel gruppe fra B1 Admin. Tekstmeldinger sendes gjennom din egen konto hos leverandøren, så prisene og grensene deres gjelder.

1. På innstillingssiden klikker du på **Tekstmeldinger** i listen til venstre, og deretter på **Rediger** i seksjonen **Tekstmeldinger**.
2. Velg en **leverandør**:
   - **Clearstream** -- skriv inn en **API-nøkkel**. Opprett en i Clearstream-kontoinnstillingene dine under API-nøkler.
   - **Text In Church** -- skriv inn en **API-nøkkel**. Be Text In Church Support om tilgang til utvikler-API først, og opprett deretter en nøkkel i avsnittet Utvikler-API under Kontoinnstillinger.
   - **Nalo Solutions** (Ghana) -- skriv inn autentiseringsnøkkelen fra Nalo Solutions-kontoen din som **API-nøkkel**, og en **avsender-ID** (opptil 11 tegn) som Nalo har godkjent for deg.
   - **Twilio** -- bruk kirkens egen Twilio-konto; Twilio fakturerer deg direkte. Kopier **Account SID** og **Auth Token** fra [Twilio-konsollen](https://console.twilio.com), og skriv inn et **Fra-nummer** — et Twilio-telefonnummer registrert for A2P 10DLC, i et format som `+15551234567`. Etter at du har lagret, limer du inn webhook-URL-en for innkommende meldinger (se nedenfor) i feltet **A message comes in** for nummeret i Twilio, slik at STOP-svar også registreres i B1.
3. Klikk på **Lagre**.

For å slutte å sende tekstmeldinger setter du **Leverandør** til **Ingen** og lagrer. Dette fjerner den lagrede leverandøren.

### Melde av personer som svarer STOP

Når en leverandør er lagret, åpner du seksjonen Tekstmeldinger på nytt med **Rediger**. Under leverandørinnstillingene vises et skrivebeskyttet felt **URL for innkommende STOP-webhook**, en webadresse som er unik for kirken din. Klikk i feltet for å markere adressen, kopier den og lim den inn i leverandørens innstilling for webhook for innkommende meldinger (svar). Dette fungerer med alle leverandørene ovenfor som kan videresende innkommende svar til en webhook.

Etter det, når noen svarer **STOP** (eller STOPALL, UNSUBSCRIBE, CANCEL, END, QUIT, OPTOUT eller REVOKE) på en av meldingene dine, finner B1 alle med et mobilnummer som stemmer, markerer dem som reservert og slår av tekstpåminnelsene deres. De hoppes deretter over i gruppetekster. Andre svar ignoreres.

:::info
Dette bruker den samme reservasjonsinnstillingen som **Skjul meg fra medlemskatalogen**, så personer som svarer STOP vises også som **Skjult fra katalog** på profilen sin. Feltet vises bare når den lagrede leverandøren er valgt — hvis du bytter til en annen leverandør i rullegardinlisten, må du lagre først for å se URL-en igjen.
:::

Når en leverandør er koblet til, ser ansatte med tillatelse til å sende tekstmeldinger en knapp **Tekst** på siden for en gruppe (**Send tekst til gruppen**) og for en person med mobilnummer (**Send tekstmelding**). Skriv meldingen din og klikk på **Send**. Dialogboksen teller tegn og SMS-segmenter. For en gruppe viser den hvor mange medlemmer som får teksten før du sender:

- Medlemmer uten mobilnummer registrert hoppes over.
- Medlemmer som har valgt **Skjul meg fra medlemskatalogen** telles som reservert og hoppes over.
- Familiemedlemmer som deler et mobilnummer, får teksten bare én gang.

### Personalisere tekster med flettefelt {#personalizing-texts-with-merge-fields}

Under meldingsboksen viser tekstdialogen plassholderbrikker: **Fornavn**, **Etternavn**, **Visningsnavn** og **Kirkenavn**. Klikk på en brikke for å sette inn plassholderen (`{{firstName}}`, `{{lastName}}`, `{{displayName}}` eller `{{churchName}}`) der markøren står. Når teksten sendes, erstattes hver plassholder med mottakerens opplysninger, slik at en gruppetekst som `Hei {{firstName}}, vi ses på søndag!` når hvert medlem med sitt eget navn. Plassholdere fungerer både for gruppetekster og tekster til én person.

:::info
Grensen på 1 600 tegn gjelder meldingen slik du skriver den. Etter at plassholderne er fylt inn, kuttes all tekst som er lengre enn 1 600 tegn av ved den lengden.
:::

Tekster kan også sendes automatisk fra et trinn i en [arbeidsflyt](../serving/workflows.md#sending-a-text) med handlingen **Send tekst**, som bruker samme leverandør og plassholdere.

## Fillagring

Som standard bruker filene du laster opp til nettstedet ditt (gjennom [Filer](../website/files.md)) og andre innholdsområder B1s gratis lagring på nett, opptil 100 MB. Hvis du trenger mer plass, kan du koble til din egen skylagring i stedet — nye opplastinger går da direkte til din konto uten plassgrense.

1. På innstillingssiden klikker du på **Fillagring** i listen til venstre, og deretter på **Rediger** i seksjonen **Fillagring**.
2. Velg en leverandør: **Google Drive**, **Dropbox**, **OneDrive** eller en **S3-kompatibel bucket** (AWS S3, Cloudflare R2, Backblaze B2 osv.).
3. For Google Drive, Dropbox eller OneDrive klikker du på **Koble til** og logger inn for å gi tilgang. For en S3-kompatibel bucket skriver du inn tilgangsnøkkel, hemmelighet, bucket-navn og grunn-URL for offentlig tilgang.
4. Klikk på **Lagre**.

:::info
Dette gjelder bare nye opplastinger til Filer på nettstedet ditt og lignende innholdsområder. Galleribilder, miniatyrbilder, logoer og bilder av personer blir alltid liggende på B1s standardlagring.
:::

## Klassetrinnopprykk

Hvis du registrerer **klassetrinn** for barn og elever, kan B1 automatisk flytte alle opp ett klassetrinn på en dato du velger (for eksempel 1. august) i stedet for at du må redigere hver profil for hånd.

1. På innstillingssiden klikker du på **Klassetrinnopprykk** i listen til venstre, og deretter på **Rediger** i seksjonen **Klassetrinnopprykk**.
2. Slå på bryteren (den viser **Aktivert**) og velg **måned** og **dag** for å flytte opp klassetrinn hvert år. På den datoen flytter alle med et klassetrinn seg opp ett trinn, og elever i 12. klasse blir **Uteksaminert**.
3. Lagre endringene dine.

For å stoppe automatisk opprykk slår du av bryteren slik at den viser **Deaktivert**, og lagrer. Opprykksdatoen fjernes, og klassetrinn endres ikke lenger av seg selv.

## Frivilligpåmelding {#volunteer-signup}

Som standard ser medlemmer som blar i [frivilligpåmeldinger](../../b1-church/serving/volunteer-signup.md), hver kommende uke som har åpne posisjoner. Hvis listen blir lang, kan du i stedet vise bare neste uke for hver planstype.

1. På innstillingssiden klikker du på **Frivilligpåmelding** i listen til venstre, og deretter på **Rediger** i seksjonen **Frivilligpåmelding**.
2. Slå på **Vis bare neste uke for hver planstype**.
3. Lagre endringene dine.

Med dette påslått viser hver planstype bare sin neste kommende plan. Den påfølgende uken vises når datoen er passert. Raden **Uker som vises** i seksjonen viser **Bare neste uke for hver planstype** eller **Alle kommende uker**.

## Personvern for giving {#giving-privacy}

Personer med tilgang til giving ser normalt en persons givertotaler på [personposten](../people/adding-people.md#editing-details). Hvis du heller ikke vil ha beløp på skjermen hver gang en post åpnes, kan du skjule dem til noen ber om å se dem.

1. På innstillingssiden klikker du på **Personvern for giving** i listen til venstre, og deretter på **Rediger** i seksjonen **Personvern for giving**.
2. Slå på **Skjul giving på personposter til de klikkes på**.
3. Lagre endringene dine.

Med dette påslått står det på givingkortet på en personpost «Giving er skjult på personposter». Klikk på **Vis giving** for å laste inn og vise givingen til den personen. Den skjules igjen når du åpner en annen person. Hvem som kan se giving endres ikke: bare personer med tilgang til giving ser kortet.

## Import og eksport

Lenken **Import/eksport** under kirkens navn på innstillingssiden åpner et eget verktøy i et nytt nettleservindu. Bruk det til å:

- Importere medlemsdata fra et annet system for kirkeadministrasjon.
- Eksportere ChurchApps-dataene dine for sikkerhetskopi eller migrering.

Dette er spesielt nyttig når du setter opp kirken din for første gang og trenger å overføre eksisterende poster til ChurchApps.

:::warning
Når du importerer data, må du alltid ta sikkerhetskopi av de eksisterende postene først. Importoperasjoner legger til data i systemet ditt og kan skape duplikater hvis de kjøres flere ganger.
:::
