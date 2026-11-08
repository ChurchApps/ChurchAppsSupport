---
title: "Kirkeinnstillinger"
description: "Angi navn, adresse, underdomene, tidssone, regionformat, SMS-leverandør og fillagring for kirken din på siden Kirkeinnstillinger i B1 Admin."
---

# Kirkeinnstillinger

<div class="article-intro">

Siden Kirkeinnstillinger er der du konfigurerer kirkens grunnleggende informasjon, kontaktopplysninger og merkevare. Disse opplysningene brukes i alle ChurchApps-verktøy, inkludert B1.church-nettstedet ditt og B1 App.

</div>

## Opplæringsvideo

<YouTube id="634zSbzDkYA" title="Oppsett av kirkeinformasjon og merkevare i B1" next="Roller, tillatelser og invitasjon av teamet ditt i B1" nextUrl="/docs/b1-admin/settings/roles-permissions" />

<div class="prereqs">
<h4>Før du begynner</h4>

- Du trenger tillatelsen «Rediger kirkeinnstillinger». Se [Roller og tillatelser](./roles-permissions.md) hvis du ikke har tilgang.
- Ha kirkens adresse, kontaktinformasjon og logo klar

</div>

## Redigere kirkeinformasjonen din

1. I B1 Admin åpner du [Hurtigmenyen](../introduction.md#getting-around-with-the-jump-menu) (søkefeltet øverst til venstre), utvider **Innstillinger** og klikker på **Innstillinger**.
2. I delen **Kirkeinformasjon** (øverst på siden) klikker du på **Rediger**.
3. Oppdater et av følgende felt:
   - **Kirkenavn** -- Navnet som vises på tvers av alle ChurchApps-produkter.
   - **Adresse** -- Kirkens fysiske adresse.
   - **Kontaktinformasjon** -- Telefonnummer, e-post og andre kontaktopplysninger.
   - **Tidssone** -- Kirkens tidssone. Se [Tidssone](#time-zone) nedenfor.
4. Klikk på **Lagre** for å bruke endringene.

## Sette opp underdomenet ditt

Kirken din får et gratis underdomene på **dinkirke.1.church**. Dette er nettadressen medlemmer og besøkende kan bruke for å finne kirkens nettilstedeværelse.

1. På Innstillinger-siden klikker du på **Rediger** i delen **Kirkeinformasjon** og finner feltet **Underdomene**.
2. Skriv inn ønsket underdomene (for eksempel «gracechurch» for gracechurch.1.church).
3. Lagre endringene.

:::info
Underdomenet ditt må være unikt blant alle kirker i ChurchApps. Hvis navnet du ønsker allerede er tatt, kan du prøve å legge til by eller region (for eksempel «gracechurch-dallas»).
:::

Hvis du vil at besøkende skal nå nettstedet ditt på et eget domene (for eksempel **`www.gracechurch.org`**), se [Egendefinert domene](./custom-domain.md).

## Konfigurere merkevare

Tilpass hvordan kirken din framstår på tvers av alle ChurchApps-verktøy:

1. Last opp **kirkelogoen** din ved å klikke på logoområdet og velge en bildefil.
2. Legg til eventuelle andre **kirkebilder** som brukes på nettstedet ditt og i [mobilappen](./mobile-app.md).

:::tip
For best resultat bør du bruke en logo med gjennomsiktig bakgrunn i PNG-format. Da ser den bra ut på både lys og mørk bakgrunn.
:::

## Første dag i uken

Velg hvilken dag kalendrene dine starter på. Nedtrekkslisten **Første dag i uken** i delen Kirkeinformasjon står som standard på **søndag**, men kan settes til en hvilken som helst dag. Når du har endret den, brukes den i kalenderrutenettene i B1 Admin og i medlemsportalen på B1.church. Gruppekalendere, tilpassede kalendere og hendelseseditoren viser alle ukene med startdagen du velger.

## Tidssone

Nedtrekkslisten **Tidssone** i delen **Kirkeinformasjon** angir kirkens tidssone (for eksempel *America/Chicago*). Velg **Ingen** for å la feltet stå tomt. Når du har lagret, vises sonen i oppsummeringen av kirkeinformasjonen.

B1 bruker denne tidssonen for tider som gjelder hele kirken, for eksempel påminnelser om hendelser og planene på [FreePlay](../../freeplay/scheduled-mode/scheduling-the-calendar.md)-TV-ene dine. [Innsjekkingsplaner](../attendance/setup.md#setting-a-check-in-schedule) måles først i tidssonen til gudstjenestens [menighet](./campuses.md), og bruker kirkens tidssone bare hvis menigheten ikke har en egen. Hvis alle menighetene dine ligger i samme tidssone, angir du den både for kirken og for hver menighet.

## Region (format for dato og telefon)

Innstillingen **Region** styrer hvordan datoer og klokkeslett skrives i hele B1. Som standard brukes det amerikanske datoformatet (for eksempel «Sep 28, 2026» og «9/28/2026»). Kirker utenfor USA kan bytte til sitt eget format. Hvis du for eksempel velger engelsk (Storbritannia), vises «28 Sept 2026» og «28/09/2026» i stedet.

1. På Innstillinger-siden klikker du på **Region** i listen til venstre, og deretter på **Rediger** i delen **Region**.
2. Velg regionen din i nedtrekkslisten **Region**. Hvert alternativ viser en eksempeldato, slik at du ser nøyaktig hvordan datoene vil se ut.
3. Klikk på **Lagre**.

Delen Region viser deretter den valgte regionen, et eksempel på **datoformatet** og formatet for **telefonnumre**.

### Format for telefonnumre

Den samme delen Region har en innstilling for **telefonnumre** som styrer hvordan telefonnumre legges inn på en persons profil:

- **Internasjonal (med landskode)** -- standard. Telefonfeltene viser en velger med landsflagg og lagrer numrene med landskode (for eksempel +1 918 555 1234).
- **Lokal (slik det skrives)** -- telefonfeltene blir vanlige tekstfelt, og numrene lagres akkurat slik du skriver dem, uten landskode (for eksempel 0701 234 5678). Velg dette hvis kirken din skriver numre i et lokalt format og ikke vil at B1 skal legge til landskode.

Når **Lokal** er valgt, viser delen Region også «Lokale telefonnumre» ved siden av regionen din.

:::tip
SMS fungerer best når numrene inkluderer landskode. Hvis du sender SMS fra B1, bør du beholde formatet **Internasjonal**, eller sørge for at numrene du skriver inn i lokal modus har landskode.
:::

Regionen din gjelder datoer og klokkeslett i B1 Admin og på B1.church-nettstedet og medlemsportalen din, inkludert preken, blogginnlegg, gruppekalendere og tjenesteplaner. Dermed ser medlemmene datoene i samme format som de ansatte dine.

## SMS {#texting}

Koble til en SMS-leverandør for å sende SMS-meldinger til en person eller en hel gruppe fra B1 Admin. Meldingene sendes gjennom din egen konto hos leverandøren, så leverandørens priser og grenser gjelder.

1. På Innstillinger-siden klikker du på **SMS** i listen til venstre, og deretter på **Rediger** i delen **SMS**.
2. Velg en **leverandør**:
   - **Clearstream** -- skriv inn en **API-nøkkel**. Opprett en nøkkel under API Keys i kontoinnstillingene dine hos Clearstream.
   - **Text In Church** -- skriv inn en **API-nøkkel**. Be først Text In Church Support om tilgang til utvikler-API, og opprett deretter en nøkkel i delen Developer API under Account Settings > Developer API.
   - **Nalo Solutions** (Ghana) -- skriv inn autentiseringsnøkkelen fra Nalo Solutions-kontoen din som **API-nøkkel**, og en **avsender-ID** (opptil 11 tegn) som Nalo har godkjent for deg.
   - **Twilio** -- bruk kirkens egen Twilio-konto. Twilio fakturerer deg direkte. Kopier **Account SID** og **Auth Token** fra [Twilio Console](https://console.twilio.com), og skriv inn et **avsendernummer** -- et Twilio-telefonnummer registrert for A2P 10DLC, i et format som `+15551234567`. Etter lagring limer du inn webhook-adressen for innkommende meldinger (se nedenfor) i feltet **A message comes in** for nummeret i Twilio, slik at STOP-svar også registreres i B1.
3. Klikk på **Lagre**.

For å slutte å sende SMS, velg **Ingen** som **leverandør** og lagre. Da fjernes den lagrede leverandøren.

### Melde av personer som svarer STOP

Når en leverandør er lagret, åpner du SMS-delen igjen med **Rediger**. Under leverandørinnstillingene vises et skrivebeskyttet felt, **webhook-adresse for STOP (innkommende)**, med en nettadresse som er unik for kirken din. Klikk i feltet for å markere adressen, kopier den, og lim den inn i webhook-innstillingen for innkommende meldinger (svar) hos SMS-leverandøren din. Dette fungerer med alle leverandørene ovenfor som kan videresende innkommende svar til en webhook.

Når noen svarer **STOP** (eller STOPALL, UNSUBSCRIBE, CANCEL, END, QUIT, OPTOUT eller REVOKE) på en av meldingene dine, finner B1 alle med et mobilnummer som stemmer, markerer dem som avmeldt, og slår av SMS-påminnelsene deres. De blir deretter hoppet over i gruppemeldinger. Andre svar ignoreres.

:::info
Dette bruker den samme avmeldingsinnstillingen som **Skjul meg fra medlemskatalogen**. Personer som svarer STOP vises derfor også som **Skjult fra katalogen** på profilen sin. Feltet vises bare når den lagrede leverandøren er valgt. Hvis du bytter til en annen leverandør i nedtrekkslisten, må du lagre først for å se nettadressen igjen.
:::

Når en leverandør er koblet til, ser ansatte med tillatelse til å sende SMS en knapp for **SMS** på siden til en gruppe (**Send SMS til denne gruppen**) og til en person med mobiltelefon (**Send SMS**). Skriv meldingen og klikk på **Send**. Dialogboksen teller tegn og SMS-segmenter. For en gruppe viser den hvor mange medlemmer som får meldingen før du sender:

- Medlemmer uten mobilnummer registrert hoppes over.
- Medlemmer som har valgt **Skjul meg fra medlemskatalogen**, telles som avmeldt og hoppes over.
- Familiemedlemmer som deler et mobilnummer, får meldingen bare én gang.

### Personliggjøre meldinger med flettefelt {#personalizing-texts-with-merge-fields}

Under meldingsboksen viser SMS-dialogen merkebrikker for **Fornavn**, **Etternavn**, **Visningsnavn** og **Kirkenavn**. Klikk på en brikke for å sette inn plassholderen (`{{firstName}}`, `{{lastName}}`, `{{displayName}}` eller `{{churchName}}`) der markøren står. Når meldingen sendes, erstattes hver plassholder med detaljene til mottakeren. En gruppemelding som `Hei {{firstName}}, vi sees søndag!` når dermed hvert medlem med sitt eget navn. Plassholdere fungerer både i gruppemeldinger og i meldinger til én person. Meldinger til en gruppe har i tillegg en brikke for **Gruppenavn** (`{{groupName}}`), som erstattes med gruppens navn.

For å gjenbruke en melding lagrer du den som en [SMS-mal](./email-templates.md#text-templates) (en e-postmal i kategorien **SMS**), og velger den under **Last inn mal (valgfritt)** øverst i SMS-vinduet.

:::info
Grensen på 1 600 tegn gjelder meldingen slik du skriver den. Etter at plassholderne er fylt ut, kuttes all tekst som er lengre enn 1 600 tegn av ved denne grensen.
:::

Meldinger kan også sendes automatisk fra et steg i en [arbeidsflyt](../serving/workflows.md#sending-a-text) med handlingen **Send SMS**. Den bruker samme leverandør og de samme plassholderne.

## Fillagring

Som standard bruker filer du laster opp til nettstedet ditt (gjennom [Filer](../website/files.md)) og andre innholdsområder B1s gratis hostede lagring, opptil 100 MB. Hvis du trenger mer plass, kan du i stedet koble til din egen skylagring. Nye opplastinger går da rett til din konto, uten grense fra plattformen.

1. På Innstillinger-siden klikker du på **Fillagring** i listen til venstre, og deretter på **Rediger** i delen **Fillagring**.
2. Velg en leverandør: **Google Drive**, **Dropbox**, **OneDrive** eller en **S3-kompatibel bøtte** (AWS S3, Cloudflare R2, Backblaze B2 osv.).
3. For Google Drive, Dropbox eller OneDrive klikker du på **Koble til** og logger inn for å gi tilgang. For en S3-kompatibel bøtte skriver du inn tilgangsnøkkel, hemmelig nøkkel, bøttenavn og grunn-URL for offentlig tilgang.
4. Klikk på **Lagre**.

:::info
Dette påvirker bare nye opplastinger til filene på nettstedet ditt og lignende innholdsområder. Galleribilder, miniatyrbilder, logoer og bilder av personer blir alltid liggende på B1s standardlagring.
:::

## Klassetrinnsopprykk

Hvis du registrerer **klassetrinn** for barn og elever, kan B1 automatisk flytte alle opp ett klassetrinn på en dato du velger (for eksempel 1. august), i stedet for at du må redigere hver profil for hånd.

1. På Innstillinger-siden klikker du på **Klassetrinnsopprykk** i listen til venstre, og deretter på **Rediger** i delen **Klassetrinnsopprykk**.
2. Slå på bryteren (den viser **Aktivert**), og velg **måned** og **dag** for når klassetrinnene skal rykke opp hvert år. På den datoen flyttes alle med klassetrinn opp ett trinn, og elever på 12. trinn blir **Uteksaminert**.
3. Lagre endringene.

For å slutte med automatisk opprykk slår du av bryteren, så den viser **Deaktivert**, og lagrer. Opprykksdatoen fjernes, og klassetrinnene endres ikke lenger av seg selv.

## Frivilligregistrering {#volunteer-signup}

Som standard ser medlemmer som blar i [frivilligregistreringer](../../b1-church/serving/volunteer-signup.md), alle kommende uker med ledige plasser. Hvis listen blir lang, kan du i stedet vise bare neste uke for hver planttype.

1. På Innstillinger-siden klikker du på **Frivilligregistrering** i listen til venstre, og deretter på **Rediger** i delen **Frivilligregistrering**.
2. Slå på **Vis bare neste uke for hver planttype**.
3. Lagre endringene.

Når dette er på, viser hver planttype bare sin neste kommende plan. Neste uke vises når datoen har passert. Raden **Viste uker** i delen står enten som **Bare neste uke for hver planttype** eller **Alle kommende uker**.

## Personvern for gaver {#giving-privacy}

Personer med tilgang til gaver ser vanligvis en persons gavesummer på [personprofilen](../people/adding-people.md#editing-details). Hvis du heller ikke vil ha beløp synlige hver gang en profil åpnes, kan du skjule dem til noen spør etter dem.

1. På Innstillinger-siden klikker du på **Personvern for gaver** i listen til venstre, og deretter på **Rediger** i delen **Personvern for gaver**.
2. Slå på **Skjul gaver på personprofiler til man klikker**.
3. Lagre endringene.

Når dette er på, står det «Gaver er skjult på personprofiler» på gavekortet på en personprofil. Klikk på **Vis gaver** for å laste inn og vise gavene til personen. De skjules igjen når du åpner en annen person. Hvem som kan se gaver endres ikke: bare personer med tilgang til gaver ser kortet.

## Import og eksport

Lenken **Import/eksport** under kirkens navn på Innstillinger-siden åpner et eget verktøy i et nytt nettleservindu. Bruk det til å:

- Importere medlemsdata fra et annet system for kirkeadministrasjon.
- Eksportere ChurchApps-dataene dine for sikkerhetskopiering eller flytting.

Dette er særlig nyttig når du setter opp kirken din for første gang og trenger å overføre eksisterende registreringer til ChurchApps.

:::warning
Når du importerer data, bør du alltid ta sikkerhetskopi av eksisterende registreringer først. Importer legger til data i systemet ditt og kan skape dupliserte oppføringer hvis de kjøres flere ganger.
:::
