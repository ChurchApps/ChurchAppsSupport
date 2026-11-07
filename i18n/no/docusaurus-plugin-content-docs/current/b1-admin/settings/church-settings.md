---
title: "Kirkeinnstillinger"
description: "Angi navn, adresse, subdomene, tidssone, regionformat, SMS-leverandør og fillagring for menigheten din på siden Church Settings i B1 Admin."
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

1. I B1 Admin åpner du [hurtigmenyen](../introduction.md#getting-around-with-the-jump-menu) (søkefeltet øverst til venstre), utvider **Innstillinger** og klikker **Innstillinger**.
2. I delen **Kirkeinformasjon** (øverst på siden) klikker du **Rediger**.
3. Oppdater et hvilket som helst av følgende felt:
   - **Kirkens navn** -- Navnet som vises på tvers av alle ChurchApps-produkter.
   - **Adresse** -- Kirkens fysiske adresse.
   - **Kontaktinformasjon** -- Telefonnummer, e-post og andre kontaktopplysninger.
   - **Tidssone** -- Kirkens tidssone. Se [Tidssone](#time-zone) nedenfor.
4. Klikk **Lagre** for å bruke endringene.

## Sette opp underdomenet ditt

Kirken din får et gratis underdomene på **dinkirke.1.church**. Dette er nettadressen medlemmer og besøkende bruker for å nå kirkens nettilstedeværelse.

1. På siden Innstillinger klikker du **Rediger** i delen **Kirkeinformasjon** og finner feltet **Underdomene**.
2. Skriv inn ønsket underdomene (for eksempel «nådekirken» for nadekirken.1.church).
3. Lagre endringene.

:::info
Underdomenet ditt må være unikt blant alle ChurchApps-kirker. Hvis navnet du ønsker er tatt, prøv å legge til byen eller staten din (for eksempel «nådekirken-bergen»).
:::

Hvis du vil at besøkende skal nå nettstedet ditt på ditt eget domene (for eksempel **`www.nadekirken.org`**), se [Eget domene](./custom-domain.md).

## Konfigurere profilen

Tilpass hvordan kirken din vises på tvers av alle ChurchApps-verktøy:

1. Last opp **kirkens logo** ved å klikke på logoområdet og velge en bildefil.
2. Legg til eventuelle ekstra **kirkebilder** som brukes på nettstedet ditt og i [mobilappen](./mobile-app.md).

:::tip
For best resultat bruk en logo med gjennomsiktig bakgrunn i PNG-format. Da ser den bra ut på både lyse og mørke bakgrunner.
:::

## Første dag i uken

Velg hvilken dag kalenderne dine starter på. Nedtrekkslisten **Første dag i uken** i delen Kirkeinfo er satt til **søndag** som standard, men kan settes til hvilken som helst dag. Når den er endret, respekteres den i kalenderrutenettene i B1 Admin og i B1.church-medlemsportalen -- gruppekalendere, utvalgte kalendere og arrangementseditoren legger alle ut uker som starter på dagen du velger.

## Tidssone {#time-zone}

Nedtrekkslisten **Tidssone** i delen **Kirkeinformasjon** setter kirkens tidssone (for eksempel *America/Chicago*). Velg **Ingen** for å la feltet stå tomt. Når du har lagret, vises sonen i kirkeinfo-oppsummeringen.

B1 bruker denne tidssonen for kirkedekkende tidspunkter, for eksempel påminnelser om arrangementer og tidsplanene på dine [FreePlay](../../freeplay/scheduled-mode/scheduling-the-calendar.md)-TV-er. [Innsjekkingsplaner](../attendance/setup.md#setting-a-check-in-schedule) måles i tidssonen til gudstjenestens [kirkested](./campuses.md) først, og bruker kirkens tidssone bare når kirkestedet ikke har en. Hvis alle kirkestedene dine er i samme tidssone, sett den både på kirken og på hvert kirkested.

## Region (dato- og telefonformat)

Innstillingen **Region** styrer hvordan datoer og klokkeslett skrives i hele B1. Som standard bruker datoer det amerikanske formatet (for eksempel «Sep 28, 2026» og «9/28/2026»). Kirker utenfor USA kan bytte til sitt eget format -- for eksempel vises «28 Sept 2026» og «28/09/2026» hvis du velger norsk.

1. På siden Innstillinger klikker du **Region** i listen til venstre, og deretter **Rediger** i delen **Region**.
2. Velg regionen din i nedtrekkslisten **Region**. Hvert alternativ viser en eksempeldato, slik at du ser nøyaktig hvordan datoene vil se ut.
3. Klikk **Lagre**.

Delen Region viser deretter den valgte regionen, et eksempel på **datoformatet** og ditt format for **Telefonnumre**.

### Format for telefonnumre

Den samme delen Region har en innstilling for **Telefonnumre** som styrer hvordan telefonnumre skrives inn på en persons post:

- **Internasjonal (med landskode)** -- standard. Telefonfelt viser en landsflaggvelger og lagrer numre med landskode (for eksempel +47 912 34 567).
- **Lokal (som skrevet)** -- telefonfelt blir vanlige tekstbokser og lagrer numre akkurat slik du skriver dem, uten å legge til landskode (for eksempel 912 34 567). Velg dette hvis kirken din skriver numre i et lokalt format og ikke vil at B1 skal legge til landskode.

Når **Lokal** er valgt, viser delen Region også «Lokale telefonnumre» ved siden av regionen din.

:::tip
SMS fungerer best når numrene har landskode. Hvis du sender SMS fra B1, behold formatet **Internasjonal**, eller sørg for at numre du skriver inn i lokal modus har landskode.
:::

Regionen din gjelder for datoer og klokkeslett i hele B1 Admin og på B1.church-nettstedet ditt og medlemsportalen, inkludert prekener, blogginnlegg, gruppekalendere og tjenesteplaner, slik at medlemmene ser datoer i samme format som de ansatte.

## SMS {#texting}

Koble til en SMS-leverandør for å sende SMS-meldinger til en person eller en hel gruppe fra B1 Admin. SMS-meldinger sendes via din egen konto hos leverandøren, så deres priser og grenser gjelder.

1. På siden Innstillinger klikker du **SMS** i listen til venstre, og deretter **Rediger** i delen **SMS**.
2. Velg en **leverandør**:
   - **Clearstream** -- skriv inn en **API-nøkkel**. Lag en i Clearstream-kontoinnstillingene dine under API-nøkler.
   - **Text In Church** -- skriv inn en **API-nøkkel**. Be først Text In Church-support om tilgang til utvikler-API, og lag deretter en nøkkel i seksjonen Kontoinnstillinger > Utvikler-API.
   - **Nalo Solutions** (Ghana) -- skriv inn autentiseringsnøkkelen fra Nalo Solutions-kontoen din som **API-nøkkel**, og en **avsender-ID** (opptil 11 tegn) som Nalo har godkjent for deg.
   - **Twilio** -- bruk kirkens egen Twilio-konto; Twilio fakturerer deg direkte. Kopier **Account SID** og **Auth Token** fra [Twilio-konsollen](https://console.twilio.com), og skriv inn et **fra-nummer** -- et Twilio-telefonnummer registrert for A2P 10DLC, i et format som `+4791234567`. Etter lagring limer du inn webhook-URL-en for innkommende meldinger (se nedenfor) i nummerets **Melding kommer inn**-webhook i Twilio, slik at STOPP-svar også registreres i B1.
3. Klikk **Lagre**.

For å slutte med SMS, sett **Leverandør** til **Ingen** og lagre. Dette fjerner den lagrede leverandøren.

### Melde av personer som svarer STOPP

Når en leverandør er lagret, åpner du SMS-delen igjen med **Rediger**. Under leverandørinnstillingene viser et skrivebeskyttet felt **URL for innkommende (STOPP)-webhook** en nettadresse som er unik for kirken din. Klikk i feltet for å markere adressen, kopier den, og lim den inn i leverandørens innstilling for webhook for innkommende meldinger (svar). Dette fungerer med alle leverandørene over som kan videresende innkommende svar til en webhook.

Etter dette, når noen svarer **STOPP** (eller STOPALL, UNSUBSCRIBE, CANCEL, END, QUIT, OPTOUT eller REVOKE) på en av meldingene dine, finner B1 alle med et mobilnummer som samsvarer, markerer dem som avmeldt og slår av deres SMS-påminnelser. De hoppes deretter over i gruppe-SMS. Andre svar ignoreres.

:::info
Dette bruker den samme avmeldingsinnstillingen som **Skjul meg fra medlemskatalogen**, så personer som svarer STOPP vises også som **Skjult fra katalog** på profilen sin. Feltet vises bare når den lagrede leverandøren er valgt -- hvis du bytter til en annen leverandør i nedtrekkslisten, lagre først for å se URL-en igjen.
:::

Når en leverandør er koblet til, ser ansatte med tillatelse til å sende SMS en knapp **SMS** på siden til en gruppe (**Send SMS til denne gruppen**) og til en person med mobiltelefon (**Send SMS-melding**). Skriv meldingen din og klikk **Send**. Dialogen teller tegn og SMS-segmenter. For en gruppe viser den hvor mange medlemmer som får meldingen før du sender:

- Medlemmer uten mobiltelefon registrert hoppes over.
- Medlemmer som har valgt **Skjul meg fra medlemskatalogen** telles som avmeldt og hoppes over.
- Familiemedlemmer som deler et mobilnummer får meldingen bare én gang.

### Personalisere SMS med flettefelt {#personalizing-texts-with-merge-fields}

Under meldingsboksen viser SMS-dialogen plassholderbrikker: **Fornavn**, **Etternavn**, **Visningsnavn** og **Kirkens navn**. Klikk en brikke for å sette inn plassholderen (`{{firstName}}`, `{{lastName}}`, `{{displayName}}` eller `{{churchName}}`) der markøren står. Når meldingen sendes, erstattes hver plassholder med mottakerens egne opplysninger, så en gruppe-SMS som `Hei {{firstName}}, vi sees søndag!` når hvert medlem med sitt eget navn. Plassholdere fungerer både for gruppe-SMS og SMS til en enkelt person. SMS til en gruppe tilbyr også en brikke for **Gruppenavn** (`{{groupName}}`), som erstattes med gruppens navn.

For å gjenbruke en melding, lagre den som en [SMS-mal](./email-templates.md#text-templates) (en e-postmal med kategorien **SMS**) og velg den fra **Last inn mal (valgfritt)** øverst i SMS-vinduet.

:::info
Grensen på 1 600 tegn gjelder meldingen slik du skriver den. Etter at plassholderne er fylt ut, kuttes SMS-meldinger som er lengre enn 1 600 tegn av ved den lengden.
:::

SMS kan også sendes automatisk fra et [arbeidsflyt](../serving/workflows.md#sending-a-text)-steg med handlingen **Send SMS**, som bruker samme leverandør og plassholdere.

## Fillagring

Som standard bruker filer du laster opp til nettstedet ditt (via [Filer](../website/files.md)) og andre innholdsområder B1s gratis vertsbaserte lagring, opptil 100 MB. Hvis du trenger mer plass, kan du koble til din egen skylagring i stedet -- nye opplastinger går da rett til din konto uten plattformgrense.

1. På siden Innstillinger klikker du **Fillagring** i listen til venstre, og deretter **Rediger** i delen **Fillagring**.
2. Velg en leverandør: **Google Drive**, **Dropbox**, **OneDrive** eller en **S3-kompatibel bøtte** (AWS S3, Cloudflare R2, Backblaze B2 osv.).
3. For Google Drive, Dropbox eller OneDrive klikker du **Koble til** og logger inn for å gi tilgang. For en S3-kompatibel bøtte skriver du inn tilgangsnøkkelen, hemmeligheten, bøttenavnet og basis-URL-en for offentlig tilgang.
4. Klikk **Lagre**.

:::info
Dette påvirker bare nye opplastinger til Filer på nettstedet ditt og lignende innholdsområder. Galleribilder, miniatyrbilder, logoer og personbilder blir alltid liggende på B1s standardlagring.
:::

## Klassetrinnsopprykk

Hvis du følger **klassetrinn** for barn og elever, kan B1 automatisk flytte alle opp ett trinn på en dato du velger (for eksempel 1. august), i stedet for at du må redigere hver profil for hånd.

1. På siden Innstillinger klikker du **Klassetrinnsopprykk** i listen til venstre, og deretter **Rediger** i delen **Klassetrinnsopprykk**.
2. Slå på bryteren (den viser **Aktivert**) og velg **Måned** og **Dag** for å flytte opp klassetrinn hvert år. På den datoen flytter alle med et klassetrinn seg opp ett trinn, og elever på 12. trinn blir **Uteksaminert**.
3. Lagre endringene.

For å stoppe automatisk opprykk, slå bryteren av så den viser **Deaktivert**, og lagre. Opprykksdatoen fjernes, og klassetrinn endres ikke lenger av seg selv.

## Påmelding for frivillige {#volunteer-signup}

Som standard ser medlemmer som blar i [påmelding for frivillige](../../b1-church/serving/volunteer-signup.md) alle kommende uker som har ledige plasser. Hvis listen blir lang, kan du i stedet vise bare neste uke for hver plantype.

1. På siden Innstillinger klikker du **Påmelding for frivillige** i listen til venstre, og deretter **Rediger** i delen **Påmelding for frivillige**.
2. Slå på **Vis bare neste uke for hver plantype**.
3. Lagre endringene.

Med dette på viser hver plantype bare sin neste kommende plan. Neste uke vises når den datoen har passert. Raden **Viste uker** i delen leser **Bare neste uke for hver plantype** eller **Alle kommende uker**.

## Gavepersonvern {#giving-privacy}

Personer med tilgang til giver-informasjon ser normalt en persons gavesummer på [personposten](../people/adding-people.md#editing-details). Hvis du heller ikke vil ha beløp på skjermen hver gang en post åpnes, kan du skjule dem til noen spør om dem.

1. På siden Innstillinger klikker du **Gavepersonvern** i listen til venstre, og deretter **Rediger** i delen **Gavepersonvern**.
2. Slå på **Skjul gaver på personposter til de klikkes**.
3. Lagre endringene.

Med dette på står det på gavekortet på en personpost «Gaver er skjult på personposter.». Klikk **Vis gaver** for å laste inn og vise den personens gaver. Det skjules igjen når du åpner en annen person. Hvem som kan se gaver endres ikke: bare personer med gavetilgang ser kortet i det hele tatt.

## Import og eksport

Lenken **Import/eksport** under kirkens navn på siden Innstillinger åpner et eget verktøy i et nytt nettleservindu. Bruk det til å:

- Importere medlemsdata fra et annet system for kirkeadministrasjon.
- Eksportere ChurchApps-data for sikkerhetskopiering eller migrering.

Dette er særlig nyttig når du setter opp kirken din for første gang og trenger å overføre eksisterende poster til ChurchApps.

:::warning
Når du importerer data, ta alltid sikkerhetskopi av de eksisterende postene først. Importer legger til data i systemet ditt og kan skape dobbeltregistreringer hvis de kjøres flere ganger.
:::
