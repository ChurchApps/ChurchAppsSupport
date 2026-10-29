---
title: "Kirkeinnstillinger"
---

# Kirkeinnstillinger

<div class="article-intro">

Siden Kirkeinnstillinger er der du konfigurerer kirkens grunnleggende informasjon, kontaktopplysninger og profil. Disse opplysningene brukes på tvers av alle ChurchApps-verktøy, inkludert B1.church-nettstedet ditt og B1 Mobile-appen.

</div>

## Opplæringsvideo

<YouTube id="634zSbzDkYA" title="Sette opp kirkeinfo og profil i B1" next="Roller, tillatelser og invitere teamet ditt i B1" nextUrl="/docs/b1-admin/settings/roles-permissions" />

<div class="prereqs">
<h4>Før du begynner</h4>

- Du trenger tillatelsen «Rediger kirkeinnstillinger». Se [Roller og tillatelser](./roles-permissions.md) hvis du ikke har tilgang.
- Ha kirkens adresse, kontaktopplysninger og logo klare

</div>

## Redigere kirkeinformasjonen din

1. I B1 Admin åpner du [Hurtigmenyen](../introduction.md#getting-around-with-the-jump-menu) (søkefeltet øverst til venstre), utvider **Innstillinger** og klikker **Innstillinger**.
2. I seksjonen **Kirkeinformasjon** (øverst på siden) klikker du **Rediger**.
3. Oppdater noen av disse feltene:
   - **Kirkens navn** — navnet som vises på tvers av alle ChurchApps-produkter.
   - **Adresse** — kirkens fysiske adresse.
   - **Kontaktinformasjon** — telefonnummer, e-post og andre kontaktdetaljer.
   - **Tidssone** — kirkens tidssone. Se [Tidssone](#time-zone) nedenfor.
4. Klikk **Lagre** for å bruke endringene.

## Sette opp underdomenet ditt

Kirken din får et gratis underdomene på **dinkirke.1.church**. Dette er nettadressen der medlemmer og besøkende kan finne kirkens nettilstedeværelse.

1. På innstillingssiden klikker du **Rediger** i seksjonen **Kirkeinformasjon** og finner feltet **Underdomene**.
2. Skriv inn ønsket underdomene (for eksempel «nadenkirken» for nadenkirken.1.church).
3. Lagre endringene.

:::info
Underdomenet ditt må være unikt på tvers av alle ChurchApps-kirker. Hvis navnet du ønsker er tatt, prøv å legge til byen eller fylket ditt (for eksempel «nadenkirken-bergen»).
:::

Hvis du vil at besøkende skal nå nettstedet ditt på ditt eget domene (for eksempel **`www.nadenkirken.no`**), se [Eget domene](./custom-domain.md).

## Konfigurere profilen

Tilpass hvordan kirken din vises på tvers av alle ChurchApps-verktøy:

1. Last opp **kirkens logo** ved å klikke på logoområdet og velge en bildefil.
2. Legg til eventuelle ekstra **kirkebilder** som brukes på nettstedet ditt og i [mobilappen](./mobile-app.md).

:::tip
For best resultat bruk en logo med gjennomsiktig bakgrunn i PNG-format. Dette sikrer at den ser bra ut på både lys og mørk bakgrunn.
:::

## Første dag i uken

Velg hvilken dag kalenderne dine starter på. Rullegardinmenyen **Første dag i uken** i seksjonen Kirkeinfo er satt til **søndag** som standard, men kan settes til hvilken som helst dag. Når den er endret, respekteres den i kalenderrutene i B1 Admin og i B1.church-medlemsportalen — gruppekalendere, kuraterte kalendere og hendelseseditoren legger alle ut ukene med dagen du velger.

## Tidssone

Rullegardinmenyen **Tidssone** i seksjonen **Kirkeinformasjon** setter kirkens tidssone (for eksempel *Europe/Oslo*). Velg **Ingen** for å la den stå tom. Når den er lagret, vises sonen i sammendraget av kirkeinformasjon.

B1 bruker denne tidssonen for tider som gjelder hele kirken, for eksempel påminnelser om arrangementer og planene på [FreePlay](../../freeplay/scheduled-mode/scheduling-the-calendar.md)-skjermene dine. [Innsjekkingsplaner](../attendance/setup.md#setting-a-check-in-schedule) måles i tidssonen til gudstjenestens [kampus](./campuses.md) først, og bruker kirkens tidssone bare når den kampusen ikke har en. Hvis kampusene dine alle er i samme tidssone, sett den både på kirken og på hver kampus.

## Region (format for dato og telefonnummer)

Innstillingen **Region** styrer hvordan datoer og klokkeslett skrives gjennom hele B1. Som standard bruker datoer det amerikanske formatet (for eksempel «28. sep. 2026» og «9/28/2026»). Kirker utenfor USA kan bytte til sitt eget format — for eksempel viser valg av norsk bokmål datoer som «28.09.2026».

1. På innstillingssiden klikker du **Region** i listen til venstre, og deretter **Rediger** i seksjonen **Region**.
2. Velg regionen din fra rullegardinmenyen **Region**. Hvert alternativ viser en prøvedato, slik at du ser nøyaktig hvordan datoene vil se ut.
3. Klikk **Lagre**.

Seksjonen Region viser deretter den valgte regionen din, en prøve av **Datoformat** og formatet for **Telefonnumre**.

### Format for telefonnummer

Den samme seksjonen Region har en innstilling **Telefonnumre** som styrer hvordan telefonnumre legges inn på en persons post:

- **Internasjonalt (med landkode)** — standard. Telefonfelt viser en landvelger med flagg og lagrer numre med landkode (for eksempel +47 123 45 678).
- **Lokalt (slik det skrives)** — telefonfelt blir vanlige tekstbokser og lagrer numre nøyaktig slik du skriver dem, uten landkode (for eksempel 123 45 678). Velg dette hvis kirken din skriver numre i lokalt format og ikke vil at B1 skal legge til en landkode.

Når **Lokalt** er valgt, viser seksjonen Region også «Lokale telefonnumre» ved siden av regionen din.

:::tip
Tekstmelding fungerer best når numrene inkluderer landkoden. Hvis du sender tekster fra B1, behold formatet **Internasjonalt**, eller sørg for at numre du skriver inn i lokal modus inkluderer landkoden.
:::

Regionen din gjelder for datoer og klokkeslett i hele B1 Admin og på B1.church-nettstedet og medlemsportalen din, inkludert taler, blogginnlegg, gruppekalendere og gudstjenesteplaner, slik at medlemmer ser datoer i samme format som de ansatte.

## Tekstmeldinger {#texting}

Koble til en tekstmeldingstjeneste for å sende SMS til en person eller en hel gruppe fra B1 Admin. Tekster sendes gjennom din egen konto hos tjenesteleverandøren, så deres priser og grenser gjelder.

1. På innstillingssiden klikker du **Tekstmeldinger** i listen til venstre, og deretter **Rediger** i seksjonen **Tekstmeldinger**.
2. Velg en **leverandør**:
   - **Clearstream** — skriv inn en **API-nøkkel**. Opprett en i Clearstream-kontoinnstillingene dine under API-nøkler.
   - **Text In Church** — skriv inn en **API-nøkkel**. Be Text In Churchs støtte om tilgang til utvikler-API først, og opprett deretter en nøkkel under Kontoinnstillinger > Utvikler-API.
   - **Nalo Solutions** (Ghana) — skriv inn autentiseringsnøkkelen fra Nalo Solutions-kontoen din som **API-nøkkel**, og en **Avsender-ID** (opptil 11 tegn) som Nalo har godkjent for deg.
   - **Twilio** — bruk kirkens egen Twilio-konto; Twilio fakturerer deg direkte. Kopier **Account SID** og **Auth Token** fra [Twilio-konsollen](https://console.twilio.com), og skriv inn et **Avsendernummer** — et Twilio-telefonnummer registrert for A2P 10DLC, i et format som `+4712345678`. Etter lagring limer du inn webhook-URL-en for innkommende meldinger (se under) i feltet **En melding kommer inn** for nummeret i Twilio, slik at STOPP-svar også registreres i B1.
3. Klikk **Lagre**.

For å slutte med tekstmeldinger setter du **Leverandør** til **Ingen** og lagrer. Dette fjerner den lagrede leverandøren.

### Melde av personer som svarer STOPP

Når en leverandør er lagret, åpner du tekstmeldingsseksjonen på nytt med **Rediger**. Under leverandørinnstillingene viser et skrivebeskyttet felt **URL for innkommende (STOPP)-webhook** en nettadresse som er unik for kirken din. Klikk på feltet for å markere adressen, kopier den, og lim den inn i leverandørens innstilling for webhook for innkommende meldinger (svar). Dette fungerer med alle leverandørene over som kan videresende innkommende svar til en webhook.

Etter det, når noen svarer **STOPP** (eller STOPALL, UNSUBSCRIBE, CANCEL, END, QUIT, OPTOUT eller REVOKE) på en av tekstene dine, finner B1 alle hvis mobilnummer stemmer, markerer dem som reservert, og slår av tekstpåminnelsene deres. De hoppes deretter over i gruppetekster. Andre svar ignoreres.

:::info
Dette bruker samme reservasjonsinnstilling som **Skjul meg fra medlemskatalogen**, så personer som svarer STOPP vises også som **Skjult fra katalog** på profilen sin. Feltet vises bare mens den lagrede leverandøren er valgt — hvis du bytter rullegardinmenyen til en annen leverandør, lagre først for å se nettadressen igjen.
:::

Når en leverandør er koblet til, ser ansatte med tillatelse til å sende tekster en knapp **Tekst** på siden for en gruppe (**Send tekst til denne gruppen**) og for en person med mobiltelefon (**Send tekstmelding**). Skriv meldingen din og klikk **Send**. Dialogen teller tegn og SMS-segmenter. For en gruppe viser den hvor mange medlemmer som får teksten før du sender:

- Medlemmer uten mobiltelefon registrert hoppes over.
- Medlemmer som valgte **Skjul meg fra medlemskatalogen** telles som reservert og hoppes over.
- Familiemedlemmer som deler et mobilnummer får teksten bare én gang.

### Personalisere tekster med flettefelt {#personalizing-texts-with-merge-fields}

Under meldingsboksen viser tekstdialogen plassholderbrikker: **Fornavn**, **Etternavn**, **Visningsnavn** og **Kirkens navn**. Klikk en brikke for å sette inn plassholderen (`{{firstName}}`, `{{lastName}}`, `{{displayName}}` eller `{{churchName}}`) ved markøren. Når teksten sendes, erstattes hver plassholder med mottakerens opplysninger, slik at en gruppetekst som `Hei {{firstName}}, vi sees på søndag!` når hvert medlem med sitt eget navn. Plassholdere fungerer både for gruppetekster og tekster til en enkelt person. Tekster til en gruppe tilbyr også en brikke **Gruppenavn** (`{{groupName}}`), som erstattes med gruppens navn.

For å gjenbruke en melding lagrer du den som en [tekstmal](./email-templates.md#text-templates) (en e-postmal med kategorien **Tekst**) og velger den fra **Last inn mal (valgfritt)** øverst i tekstvinduet.

:::info
Grensen på 1 600 tegn gjelder meldingen slik du skriver den. Etter at plassholderne er fylt ut, kuttes tekster som er lengre enn 1 600 tegn av ved den lengden.
:::

Tekster kan også sendes automatisk fra et [arbeidsflyt](../serving/workflows.md#sending-a-text)-trinn med handlingen **Send tekst**, som bruker samme leverandør og plassholdere.

## Fillagring

Som standard bruker filer du laster opp til nettstedet ditt (gjennom [Filer](../website/files.md)) og andre innholdsområder B1s gratis vertslagring, opptil 100 MB. Hvis du trenger mer plass, kan du koble til din egen skylagring i stedet — nye opplastinger går da rett til din konto uten plattformgrense.

1. På innstillingssiden klikker du **Fillagring** i listen til venstre, og deretter **Rediger** i seksjonen **Fillagring**.
2. Velg en leverandør: **Google Drive**, **Dropbox**, **OneDrive** eller en **S3-kompatibel bucket** (AWS S3, Cloudflare R2, Backblaze B2 osv.).
3. For Google Drive, Dropbox eller OneDrive klikker du **Koble til** og logger inn for å gi tilgang. For en S3-kompatibel bucket skriver du inn tilgangsnøkkelen, hemmeligheten, bucket-navnet og basis-URL-en for offentlig tilgang.
4. Klikk **Lagre**.

:::info
Dette påvirker bare nye opplastinger til filene på nettstedet ditt og lignende innholdsområder. Galleribilder, miniatyrbilder, logoer og personbilder blir alltid på B1s standardlagring.
:::

## Klassetrinnsopprykk

Hvis du registrerer **Klassetrinn** på barn og elever, kan B1 automatisk flytte alle opp ett klassetrinn på en dato du velger (for eksempel 1. august), i stedet for at du må redigere hver profil for hånd.

1. På innstillingssiden klikker du **Klassetrinnsopprykk** i listen til venstre, og deretter **Rediger** i seksjonen **Klassetrinnsopprykk**.
2. Slå bryteren på (den viser **Aktivert**) og velg **Måned** og **Dag** for å flytte opp klassetrinn hvert år. På den datoen flyttes alle med et klassetrinn opp ett trinn, og elever på 12. trinn blir **Utdannet**.
3. Lagre endringene.

For å stoppe automatisk opprykk slår du bryteren av, slik at den viser **Deaktivert**, og lagrer. Opprykksdatoen fjernes, og klassetrinn endres ikke lenger av seg selv.

## Frivillig påmelding {#volunteer-signup}

Som standard ser medlemmer som blar i [frivillig påmelding](../../b1-church/serving/volunteer-signup.md) hver kommende uke som har ledige plasser. Hvis listen blir lang, kan du vise bare neste uke for hver plantype i stedet.

1. På innstillingssiden klikker du **Frivillig påmelding** i listen til venstre, og deretter **Rediger** i seksjonen **Frivillig påmelding**.
2. Slå på **Vis bare neste uke for hver plantype**.
3. Lagre endringene.

Med dette på viser hver plantype bare sin neste kommende plan. Neste uke vises når den datoen har passert. Raden **Viste uker** i seksjonen viser **Bare neste uke for hver plantype** eller **Alle kommende uker**.

## Gaveprivat {#giving-privacy}

Personer med tilgang til gaver ser vanligvis en persons gavesummer på [personposten](../people/adding-people.md#editing-details). Hvis du heller ikke vil ha beløp på skjermen hver gang en post åpnes, kan du skjule dem til noen ber om det.

1. På innstillingssiden klikker du **Gaveprivat** i listen til venstre, og deretter **Rediger** i seksjonen **Gaveprivat**.
2. Slå på **Skjul gaver på personposter til de klikkes**.
3. Lagre endringene.

Med dette på viser gavekortet på en personpost teksten «Gaver er skjult på personposter.». Klikk **Vis gaver** for å laste og vise den personens gaver. Det skjules igjen når du åpner en annen person. Hvem som kan se gaver endres ikke: bare personer med gavetilgang ser kortet.

## Import og eksport

Lenken **Import/eksport** under kirkens navn på innstillingssiden åpner et eget verktøy i et nytt nettleservindu. Bruk dette til å:

- Importere medlemsdata fra et annet system for kirkeadministrasjon.
- Eksportere ChurchApps-dataene dine for sikkerhetskopi eller flytting.

Dette er spesielt nyttig når du setter opp kirken din for første gang og trenger å overføre eksisterende poster til ChurchApps.

:::warning
Når du importerer data, ta alltid sikkerhetskopi av eksisterende poster først. Importoperasjoner legger til data i systemet og kan lage dupliserte oppføringer hvis de kjøres flere ganger.
:::
