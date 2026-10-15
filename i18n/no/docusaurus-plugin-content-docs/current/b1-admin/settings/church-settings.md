---
title: "Kirkeinnstillinger"
---

# Kirkeinnstillinger

<div class="article-intro">

Siden for kirkeinnstillinger er der du konfigurerer kirkens grunnleggende informasjon, kontaktopplysninger og profil. Disse opplysningene brukes i alle ChurchApps-verktøy, inkludert nettstedet ditt på B1.church og appen B1 Mobil.

</div>

<div class="prereqs">
<h4>Før du begynner</h4>

- Du trenger tillatelsen «Rediger kirkeinnstillinger». Se [Roller og tillatelser](./roles-permissions.md) hvis du ikke har tilgang.
- Ha kirkens adresse, kontaktinformasjon og logo klare

</div>

## Redigere kirkeinformasjonen din

1. I B1 Admin åpner du [Hurtigmenyen](../introduction.md#getting-around-with-the-jump-menu) (søkefeltet øverst til venstre), utvider **Innstillinger**, og klikker på **Innstillinger**.
2. I seksjonen **Kirkeinformasjon** (øverst på siden) klikker du på **Rediger**.
3. Oppdater et av følgende felt:
   - **Kirkens navn** – Navnet som vises i alle ChurchApps-produkter.
   - **Adresse** – Kirkens fysiske adresse.
   - **Kontaktinformasjon** – Telefonnummer, e-post og andre kontaktdetaljer.
4. Klikk på **Lagre** for å bruke endringene.

## Sette opp underdomenet ditt

Kirken din får et gratis underdomene på **yourchurch.1.church**. Dette er nettadressen der medlemmer og besøkende kan finne kirkens nettilstedeværelse.

1. På innstillingssiden klikker du på **Rediger** i seksjonen **Kirkeinformasjon** og finner feltet **Underdomene**.
2. Skriv inn ønsket underdomene (for eksempel «gracechurch» for gracechurch.1.church).
3. Lagre endringene dine.

:::info
Underdomenet ditt må være unikt på tvers av alle ChurchApps-kirker. Hvis navnet du ønsker, er tatt, prøv å legge til byen eller staten din (for eksempel «gracechurch-dallas»).
:::

Hvis du vil at besøkende skal nå nettstedet ditt på ditt eget domene (for eksempel **www.gracechurch.org**), se [Egendefinert domene](./custom-domain.md).

## Konfigurere profil

Tilpass hvordan kirken din vises i alle ChurchApps-verktøy:

1. Last opp **kirkens logo** ved å klikke på logoområdet og velge en bildefil.
2. Legg til eventuelle ekstra **kirkebilder** som brukes på nettstedet ditt og i [mobilappen](./mobile-app.md).

:::tip
For best resultat, bruk en logo med gjennomsiktig bakgrunn i PNG-format. Da ser den bra ut på både lyse og mørke bakgrunner.
:::

## Første dag i uken

Velg hvilken dag kalenderne dine starter på. Rullegardinmenyen **Første dag i uken** i seksjonen Kirkeinfo er satt til **Søndag** som standard, men kan settes til hvilken som helst dag. Når den er endret, respekteres den i kalenderrutenettene i B1 Admin og i B1.church-medlemsportalen – gruppekalendere, kuraterte kalendere og arrangementseditoren legger alle ut ukene med dagen du velger som start.

## Region (dato- og telefonformat)

Innstillingen **Region** styrer hvordan datoer og klokkeslett skrives gjennom hele B1. Som standard bruker datoer det amerikanske formatet (for eksempel «Sep 28, 2026» og «9/28/2026»). Kirker utenfor USA kan bytte til sitt eget format – for eksempel viser valg av engelsk (Storbritannia) «28 Sept 2026» og «28/09/2026» i stedet.

1. På innstillingssiden klikker du på **Region** i listen til venstre, og deretter på **Rediger** i seksjonen **Region**.
2. Velg din region fra rullegardinmenyen **Region**. Hvert alternativ viser en eksempeldato, slik at du ser nøyaktig hvordan datoene vil se ut.
3. Klikk på **Lagre**.

Seksjonen Region viser deretter den valgte regionen, et eksempel på **datoformatet** og formatet for **telefonnumre**.

### Telefonnummerformat

Den samme regionseksjonen har en innstilling for **telefonnumre** som styrer hvordan telefonnumre legges inn på en persons registrering:

- **Internasjonalt (med landkode)** – standard. Telefonfelt viser en landvelger med flagg og lagrer numre med landkode (for eksempel +1 918 555 1234).
- **Lokalt (slik det skrives)** – telefonfelt blir vanlige tekstbokser og lagrer numre akkurat slik du skriver dem, uten at landkode legges til (for eksempel 0701 234 5678). Velg dette hvis kirken din skriver numre i et lokalt format og ikke vil at B1 skal legge til en landkode.

Når **Lokalt** er valgt, viser regionseksjonen også «Lokale telefonnumre» ved siden av regionen din.

:::tip
Tekstmeldinger fungerer best når numrene inkluderer landkode. Hvis du sender tekstmeldinger fra B1, behold formatet **Internasjonalt**, eller sørg for at numre du skriver inn i lokal modus inkluderer landkode.
:::

Regionen din gjelder for datoer og klokkeslett i B1 Admin og på B1.church-nettstedet og medlemsportalen din, inkludert prekener, blogginnlegg, gruppekalendere og tjenesteplaner, slik at medlemmene ser datoer i samme format som de ansatte.

## Tekstmeldinger {#texting}

Koble til en leverandør av tekstmeldinger for å sende SMS-meldinger til en person eller en hel gruppe fra B1 Admin. Tekstmeldinger sendes gjennom din egen konto hos leverandøren, så deres priser og grenser gjelder.

1. På innstillingssiden klikker du på **Tekstmeldinger** i listen til venstre, og deretter på **Rediger** i seksjonen **Tekstmeldinger**.
2. Velg en **leverandør**:
   - **Clearstream** – skriv inn en **API-nøkkel**. Opprett en i Clearstream-kontoinnstillingene dine under API Keys.
   - **Text In Church** – skriv inn en **API-nøkkel**. Be først Text In Church Support om tilgang til utvikler-API, og opprett deretter en nøkkel under Kontoinnstillinger > Developer API.
   - **Nalo Solutions** (Ghana) – skriv inn autentiseringsnøkkelen fra din Nalo Solutions-konto som **API-nøkkel**, og en **avsender-ID** (opptil 11 tegn) som Nalo har godkjent for deg.
3. Klikk på **Lagre**.

For å slutte med tekstmeldinger, sett **Leverandør** til **Ingen** og lagre. Dette fjerner den lagrede leverandøren.

### Melde av personer som svarer STOP

Når en leverandør er lagret, åpne Tekstmeldinger-seksjonen igjen med **Rediger**. Under leverandørinnstillingene viser et skrivebeskyttet felt **URL for innkommende (STOP) webhook** en nettadresse som er unik for kirken din. Klikk i feltet for å markere adressen, kopier den og lim den inn i leverandørens webhook-innstilling for innkommende meldinger (svar). Dette fungerer med alle leverandørene ovenfor som kan videresende innkommende svar til en webhook.

Etter dette, når noen svarer **STOP** (eller STOPALL, UNSUBSCRIBE, CANCEL, END, QUIT, OPTOUT eller REVOKE) på en av tekstmeldingene dine, finner B1 alle hvis mobilnummer samsvarer, markerer dem som avmeldt og slår av tekstpåminnelsene deres. De hoppes deretter over i gruppetekster. Andre svar ignoreres.

:::info
Dette bruker den samme avmeldingsinnstillingen som **Skjul meg fra medlemskatalogen**, så personer som svarer STOP vises også som **Skjult fra katalog** på profilen sin. Feltet vises bare når den lagrede leverandøren er valgt – hvis du bytter til en annen leverandør i rullegardinmenyen, lagre først for å se URL-en igjen.
:::

Når en leverandør er koblet til, ser ansatte med tillatelse til å sende tekstmeldinger en knapp **Tekst** på siden til en gruppe (**Send tekst til denne gruppen**) og til en person med mobiltelefon (**Send tekstmelding**). Skriv meldingen din og klikk på **Send**. Dialogen teller tegn og SMS-segmenter. For en gruppe viser den hvor mange medlemmer som får teksten før du sender:

- Medlemmer uten mobiltelefon registrert hoppes over.
- Medlemmer som har valgt **Skjul meg fra medlemskatalogen** telles som avmeldt og hoppes over.
- Familiemedlemmer som deler et mobilnummer får teksten bare én gang.

### Personliggjøre tekster med flettefelt {#personalizing-texts-with-merge-fields}

Under meldingsboksen viser tekstdialogen merkebrikker for plassholdere: **Fornavn**, **Etternavn**, **Visningsnavn** og **Kirkens navn**. Klikk på en brikke for å sette inn plassholderen (`{{firstName}}`, `{{lastName}}`, `{{displayName}}` eller `{{churchName}}`) ved markøren. Når teksten sendes, erstattes hver plassholder med mottakerens opplysninger, slik at en gruppetekst som `Hei {{firstName}}, vi sees på søndag!` når hvert medlem med deres eget navn. Plassholdere fungerer både for gruppetekster og tekster til en enkeltperson.

:::info
Grensen på 1 600 tegn gjelder meldingen slik du skriver den. Etter at plassholderne er fylt ut, kuttes enhver tekst som er lengre enn 1 600 tegn av ved den lengden.
:::

Tekster kan også sendes automatisk fra et steg i en [arbeidsflyt](../serving/workflows.md#sending-a-text) med handlingen **Send tekst**, som bruker samme leverandør og plassholdere.

## Fillagring

Som standard bruker filer du laster opp til nettstedet ditt (gjennom [Filer](../website/files.md)) og andre innholdsområder B1s gratis vertslagring, opptil 100 MB. Hvis du trenger mer plass, kan du koble til din egen skylagring i stedet – nye opplastinger går da direkte til kontoen din uten noen plattformgrense.

1. På innstillingssiden klikker du på **Fillagring** i listen til venstre, og deretter på **Rediger** i seksjonen **Fillagring**.
2. Velg en leverandør: **Google Drive**, **Dropbox**, **OneDrive** eller en **S3-kompatibel bucket** (AWS S3, Cloudflare R2, Backblaze B2 osv.).
3. For Google Drive, Dropbox eller OneDrive klikker du på **Koble til** og logger inn for å godkjenne tilgang. For en S3-kompatibel bucket skriver du inn tilgangsnøkkelen, hemmeligheten, bucket-navnet og grunn-URL-en for offentlig tilgang.
4. Klikk på **Lagre**.

:::info
Dette påvirker bare nye opplastinger til Filer på nettstedet ditt og lignende innholdsområder. Galleribilder, miniatyrbilder, logoer og personbilder blir alltid på B1s standardlagring.
:::

## Klassetrinnsopprykk

Hvis du registrerer **klassetrinn** for barn og elever, kan B1 automatisk flytte alle opp ett klassetrinn på en dato du velger (for eksempel 1. august) i stedet for at du må redigere hver profil for hånd.

1. På innstillingssiden klikker du på **Klassetrinnsopprykk** i listen til venstre, og deretter på **Rediger** i seksjonen **Klassetrinnsopprykk**.
2. Slå på bryteren (den viser **Aktivert**) og velg **Måned** og **Dag** for å flytte klassetrinn hvert år. På den datoen flytter alle med et klassetrinn opp ett trinn, og elever på 12. trinn blir **Uteksaminert**.
3. Lagre endringene dine.

For å stoppe automatisk opprykk, slå av bryteren slik at den viser **Deaktivert**, og lagre. Opprykksdatoen fjernes, og klassetrinnene endrer seg ikke lenger av seg selv.

## Frivillig påmelding {#volunteer-signup}

Som standard ser medlemmer som blar gjennom [frivillig påmelding](../../b1-church/serving/volunteer-signup.md), hver kommende uke med ledige posisjoner. Hvis listen blir lang, kan du vise bare neste uke for hver plantype i stedet.

1. På innstillingssiden klikker du på **Frivillig påmelding** i listen til venstre, og deretter på **Rediger** i seksjonen **Frivillig påmelding**.
2. Slå på **Vis kun neste uke for hver plantype**.
3. Lagre endringene dine.

Med dette påslått viser hver plantype bare sin neste kommende plan. Den påfølgende uken vises når den datoen har passert. Raden **Viste uker** i seksjonen viser **Bare neste uke for hver plantype** eller **Alle kommende uker**.

## Gaveprivatliv {#giving-privacy}

Personer med tilgang til gaver ser normalt en persons gavesummer på deres [personregistrering](../people/adding-people.md#editing-details). Hvis du heller ikke vil ha beløp på skjermen hver gang en registrering åpnes, kan du skjule dem til noen ber om å se dem.

1. På innstillingssiden klikker du på **Gaveprivatliv** i listen til venstre, og deretter på **Rediger** i seksjonen **Gaveprivatliv**.
2. Slå på **Skjul gaver på personregistreringer til man klikker**.
3. Lagre endringene dine.

Med dette påslått står det på gavekortet på en personregistrering «Gaver er skjult på personregistreringer». Klikk på **Vis gaver** for å laste inn og vise den personens gaver. Det skjules igjen når du åpner en annen person. Hvem som kan se gaver endres ikke: bare personer med gavetilgang ser kortet.

## Import og eksport

Lenken **Import/Eksport** under kirkens navn på innstillingssiden åpner et eget verktøy i et nytt nettleservindu. Bruk dette til å:

- Importere medlemsdata fra et annet system for kirkeadministrasjon.
- Eksportere dine ChurchApps-data for sikkerhetskopiering eller migrering.

Dette er spesielt nyttig når du setter opp kirken din for første gang og må overføre eksisterende registreringer til ChurchApps.

:::warning
Når du importerer data, ta alltid en sikkerhetskopi av de eksisterende registreringene dine først. Importoperasjoner legger til data i systemet ditt og kan skape dupliserte oppføringer hvis de kjøres flere ganger.
:::
