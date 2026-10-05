---
title: "Kirkeinnstillinger"
---

# Kirkeinnstillinger

<div class="article-intro">

På siden Kirkeinnstillinger konfigurerer du grunnleggende informasjon om kirken din, kontaktopplysninger og profilering. Disse opplysningene brukes i alle ChurchApps-verktøyene, inkludert B1.church-nettstedet ditt og B1 Mobile-appen.

</div>

<div class="prereqs">
<h4>Før du begynner</h4>

- Du trenger tillatelsen «Rediger kirkeinnstillinger». Se [Roller og tillatelser](./roles-permissions.md) hvis du ikke har tilgang.
- Ha kirkens adresse, kontaktinformasjon og logo klare

</div>

## Redigere kirkeinformasjonen

1. I B1 Admin åpner du [Jump-menyen](../introduction.md#getting-around-with-the-jump-menu) (søkefeltet øverst til venstre), utvider **Innstillinger** og klikker på **Innstillinger**.
2. Åpne delen **Kirkeinformasjon** og klikk på rediger-ikonet (blyanten).
3. Oppdater feltene du ønsker:
   - **Kirkens navn** -- Navnet som vises i alle ChurchApps-produkter.
   - **Adresse** -- Kirkens fysiske adresse.
   - **Kontaktinformasjon** -- Telefonnummer, e-post og andre kontaktopplysninger.
4. Klikk på **Lagre** for å ta i bruk endringene.

## Sette opp underdomenet ditt

Kirken din får et gratis underdomene på **dinkirke.1.church**. Dette er nettadressen der medlemmer og besøkende finner kirkens tilstedeværelse på nett.

1. På siden Innstillinger finner du feltet **Underdomene**.
2. Skriv inn ønsket underdomene (for eksempel «gracechurch» for gracechurch.1.church).
3. Lagre endringene.

:::info
Underdomenet må være unikt blant alle ChurchApps-kirker. Hvis det ønskede navnet er opptatt, kan du prøve å legge til byen eller fylket ditt (for eksempel «gracechurch-oslo»).
:::

Hvis du vil at besøkende skal nå nettstedet ditt på ditt eget domene (for eksempel **www.gracechurch.org**), se [Eget domene](./custom-domain.md).

## Konfigurere profilering

Tilpass hvordan kirken din vises i alle ChurchApps-verktøyene:

1. Last opp **kirkens logo** ved å klikke på logoområdet og velge en bildefil.
2. Legg til eventuelle andre **kirkebilder** som brukes på nettstedet og i [mobilappen](./mobile-app.md).

:::tip
For best resultat bruker du en logo med gjennomsiktig bakgrunn i PNG-format. Da ser den bra ut både på lyse og mørke bakgrunner.
:::

## Første dag i uken

Velg hvilken dag kalenderne dine starter på. Nedtrekksmenyen **Første dag i uken** i delen Kirkeinformasjon er som standard **søndag**, men kan settes til en hvilken som helst dag. Når den er endret, respekteres den i kalenderrutenett i B1 Admin og i medlemsportalen på B1.church -- gruppekalendere, kuraterte kalendere og hendelsesredigereren legger alle ut ukene med start på dagen du velger.

## Region (datoformat)

Innstillingen **Region** styrer hvordan datoer og klokkeslett skrives i hele B1. Som standard bruker datoer amerikansk format (for eksempel «Sep 28, 2026» og «9/28/2026»). Kirker utenfor USA kan bytte til sitt eget format -- for eksempel viser valget engelsk (Storbritannia) «28 Sept 2026» og «28/09/2026» i stedet.

1. På siden Innstillinger finner du kortet **Region** og klikker for å redigere det.
2. Velg region i nedtrekksmenyen **Region**. Hvert alternativ viser en eksempeldato, slik at du ser nøyaktig hvordan datoene kommer til å se ut.
3. Klikk på **Lagre**.

Kortet Region viser deretter den valgte regionen og et eksempel på **Datoformat**.

Regionen din gjelder for datoer og klokkeslett i hele B1 Admin og på B1.church-nettstedet og medlemsportalen din, inkludert prekener, blogginnlegg, gruppekalendere og tjenesteplaner, slik at medlemmene ser datoer i samme format som de ansatte.

## Tekstmeldinger

Koble til en tekstmeldingsleverandør for å sende SMS til en person eller en hel gruppe fra B1 Admin. Meldingene sendes via din egen konto hos leverandøren, så leverandørens priser og begrensninger gjelder.

1. På siden Innstillinger finner du kortet **Tekstmeldinger** og klikker for å redigere det.
2. Velg en **Leverandør**:
   - **Clearstream** -- skriv inn en **API-nøkkel**. Opprett en i Clearstream-kontoinnstillingene under API Keys.
   - **Text In Church** -- skriv inn en **API-nøkkel**. Be først Text In Church Support om tilgang til utvikler-API, og opprett deretter en nøkkel i kontoinnstillingene under Developer API.
   - **Nalo Solutions** (Ghana) -- skriv inn autentiseringsnøkkelen fra Nalo Solutions-kontoen din som **API-nøkkel**, og en **Avsender-ID** (opptil 11 tegn) som Nalo har godkjent for deg.
3. Klikk på **Lagre**.

For å slutte å sende tekstmeldinger setter du **Leverandør** til **Ingen** og lagrer. Da fjernes den lagrede leverandøren.

Når en leverandør er koblet til, ser medarbeidere med tillatelse til å sende tekstmeldinger et tekstikon i toppen av en gruppe (**Send SMS til denne gruppen**) og av en person med mobiltelefon (**Send tekstmelding**). Skriv meldingen og klikk på **Send**. Dialogen teller tegn og SMS-segmenter. For en gruppe viser den hvor mange medlemmer som får meldingen før du sender:

- Medlemmer uten registrert mobiltelefon hoppes over.
- Medlemmer som valgte **Skjul meg fra medlemsregisteret** regnes som reservert og hoppes over.
- Familiemedlemmer som deler mobilnummer får meldingen bare én gang.

### Personalisere tekstmeldinger med flettefelt

Under meldingsboksen viser tekstdialogen plassholderbrikker: **Fornavn**, **Etternavn**, **Visningsnavn** og **Kirkens navn**. Klikk på en brikke for å sette inn plassholderen (`{{firstName}}`, `{{lastName}}`, `{{displayName}}` eller `{{churchName}}`) der markøren står. Når meldingen sendes, erstattes hver plassholder med mottakerens opplysninger, slik at en gruppemelding som `Hei {{firstName}}, vi sees på søndag!` når hvert medlem med deres eget navn. Plassholdere fungerer både for gruppemeldinger og meldinger til én enkelt person.

:::info
Grensen på 1 600 tegn gjelder meldingen slik du skriver den. Etter at plassholderne er fylt ut, kuttes all tekst som er lengre enn 1 600 tegn ved den lengden.
:::

Tekstmeldinger kan også sendes automatisk fra et trinn i en [arbeidsflyt](../serving/workflows.md#sending-a-text) med handlingen **Send SMS**, som bruker den samme leverandøren og de samme plassholderne.

## Fillagring

Som standard bruker filer du laster opp til nettstedet ditt (via [Filer](../website/files.md)) og andre innholdsområder B1s gratis vertsbaserte lagring, opptil 100 MB. Hvis du trenger mer plass, kan du koble til din egen skylagring i stedet -- nye opplastinger går da rett til kontoen din uten grense fra plattformen.

1. På siden Innstillinger finner du kortet **Fillagring** og klikker for å redigere det.
2. Velg en leverandør: **Google Drive**, **Dropbox**, **OneDrive** eller en **S3-kompatibel bøtte** (AWS S3, Cloudflare R2, Backblaze B2 osv.).
3. For Google Drive, Dropbox eller OneDrive klikker du på **Koble til** og logger inn for å gi tilgang. For en S3-kompatibel bøtte skriver du inn tilgangsnøkkel, hemmelig nøkkel, bøttenavn og offentlig URL-base.
4. Klikk på **Lagre**.

:::info
Dette påvirker bare nye opplastinger til Filer på nettstedet ditt og lignende innholdsområder. Galleribilder, miniatyrbilder, logoer og personbilder blir alltid værende på B1s standardlagring.
:::

## Klassetrinnsopprykk

Hvis du registrerer **Klassetrinn** på barn og ungdom, kan B1 automatisk rykke alle opp ett klassetrinn på en dato du velger (for eksempel 1. august), i stedet for at du må redigere hver profil for hånd.

1. På siden Innstillinger finner du alternativet **Klassetrinnsopprykk**.
2. Slå på bryteren (den viser **Aktivert**) og velg **Måned** og **Dag** for opprykk hvert år. På den datoen rykker alle med et klassetrinn opp ett trinn, og elever på 12. trinn blir **Uteksaminert**.
3. Lagre endringene.

For å stoppe automatisk opprykk slår du bryteren av slik at den viser **Deaktivert**, og lagrer. Opprykksdatoen fjernes, og klassetrinn endres ikke lenger av seg selv.

## Import og eksport

Knappen **Import/eksport** i toppen av Innstillinger åpner et eget verktøy i et nytt nettleservindu. Bruk det til å:

- Importere medlemsdata fra et annet kirkeadministrasjonssystem.
- Eksportere ChurchApps-dataene dine for sikkerhetskopiering eller flytting.

Dette er særlig nyttig når du først setter opp kirken din og må overføre eksisterende registre til ChurchApps.

:::warning
Når du importerer data, bør du alltid sikkerhetskopiere eksisterende registre først. Importer legger data til i systemet ditt og kan opprette dupliserte oppføringer hvis de kjøres flere ganger.
:::
