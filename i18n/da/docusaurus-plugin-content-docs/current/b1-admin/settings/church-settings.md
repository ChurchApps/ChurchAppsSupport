---
title: "Kirkeindstillinger"
description: "Indstil navn, adresse, underdomæne, tidszone, regionsformat, sms-udbyder og fillager for din kirke på siden Kirkeindstillinger i B1 Admin."
---

# Kirkeindstillinger

<div class="article-intro">

Siden Kirkeindstillinger er her, du konfigurerer din kirkes grundlæggende oplysninger, kontaktoplysninger og branding. Disse oplysninger bruges på tværs af alle ChurchApps-værktøjer, herunder din B1.church-hjemmeside og B1 App.

</div>

## Introduktionsvideo

<YouTube id="634zSbzDkYA" title="Opsætning af kirkeoplysninger og branding i B1" next="Roller, tilladelser og invitation af dit team i B1" nextUrl="/docs/b1-admin/settings/roles-permissions" />

<div class="prereqs">
<h4>Før du går i gang</h4>

- Du skal have tilladelsen "Rediger kirkeindstillinger". Se [Roller og tilladelser](./roles-permissions.md), hvis du ikke har adgang.
- Har din kirkes adresse, kontaktoplysninger og logo klar

</div>

## Redigering af dine kirkeoplysninger

1. I B1 Admin skal du åbne [Jump-menuen](../introduction.md#getting-around-with-the-jump-menu) (søgefeltet øverst til venstre), udvide **Indstillinger** og klikke på **Indstillinger**.
2. I afsnittet **Kirkeoplysninger** (øverst på siden) klikker du på **Rediger**.
3. Opdater et eller flere af følgende felter:
   - **Kirkens navn** – Navnet, der vises på tværs af alle ChurchApps-produkter.
   - **Adresse** – Din kirkes fysiske adresse.
   - **Kontaktoplysninger** – Telefonnummer, e-mail og andre kontaktoplysninger.
   - **Tidszone** – Din kirkes tidszone. Se [Tidszone](#time-zone) nedenfor.
4. Klik på **Gem** for at anvende dine ændringer.

## Opsætning af dit underdomæne

Din kirke får et gratis underdomæne på **dinkirke.1.church**. Det er webadressen, hvor medlemmer og besøgende kan finde din kirkes online tilstedeværelse.

1. På siden Indstillinger klikker du på **Rediger** i afsnittet **Kirkeoplysninger** og finder feltet **Underdomæne**.
2. Indtast dit ønskede underdomæne (for eksempel "gracechurch" for gracechurch.1.church).
3. Gem dine ændringer.

:::info
Dit underdomæne skal være unikt på tværs af alle ChurchApps-kirker. Hvis dit ønskede navn er taget, kan du prøve at tilføje din by eller region (for eksempel "gracechurch-dallas").
:::

Hvis du vil have, at besøgende kan nå dit websted på dit eget domæne (for eksempel **`www.gracechurch.org`**), se [Tilpasset domæne](./custom-domain.md).

## Konfiguration af branding

Tilpas, hvordan din kirke fremstår på tværs af alle ChurchApps-værktøjer:

1. Upload dit **kirkelogo** ved at klikke på logoområdet og vælge en billedfil.
2. Tilføj eventuelle yderligere **kirkebilleder**, der bruges på din hjemmeside og i [mobilappen](./mobile-app.md).

:::tip
For bedste resultat skal du bruge et logo med transparent baggrund i PNG-format. Det sikrer, at det ser godt ud på både lyse og mørke baggrunde.
:::

## Ugens første dag

Vælg hvilken dag dine kalendere starter på. Rullemenuen **Ugens første dag** i afsnittet Kirkeoplysninger er som standard sat til **søndag**, men kan indstilles til en hvilken som helst dag. Når den er ændret, bruges den på tværs af kalendergitre i B1 Admin og medlemsportalen på B1.church. Gruppekalendere, kuraterede kalendere og begivenhedseditoren viser alle uger, der starter på den dag, du vælger.

## Tidszone

Rullemenuen **Tidszone** i afsnittet **Kirkeoplysninger** angiver din kirkes tidszone (for eksempel *America/Chicago*). Vælg **Ingen**, hvis du vil lade feltet være tomt. Når den er gemt, vises zonen i oversigten over kirkeoplysninger.

B1 bruger denne tidszone til kirkedækkende tidspunkter, for eksempel begivenhedspåmindelser og tidsplanerne på dine [FreePlay](../../freeplay/scheduled-mode/scheduling-the-calendar.md)-skærme. [Check-in-tidsplaner](../attendance/setup.md#setting-a-check-in-schedule) måles først i tidszonen for gudstjenestens [campus](./campuses.md) og bruger kun kirkens tidszone, hvis campus ikke har en. Hvis alle dine campusser ligger i samme tidszone, skal du angive den både for kirken og for hvert campus.

## Region (dato- og telefonformat)

Indstillingen **Region** styrer, hvordan datoer og tidspunkter skrives i hele B1. Som standard bruger datoer det amerikanske format (for eksempel "Sep 28, 2026" og "9/28/2026"). Kirker uden for USA kan skifte til deres eget format. For eksempel viser valget af engelsk (Storbritannien) i stedet "28 Sept 2026" og "28/09/2026".

1. På siden Indstillinger klikker du på **Region** i den venstre liste og derefter på **Rediger** i afsnittet **Region**.
2. Vælg din region i rullemenuen **Region**. Hver mulighed viser en eksempeldato, så du kan se præcis, hvordan datoerne kommer til at se ud.
3. Klik på **Gem**.

Afsnittet Region viser derefter din valgte region, et eksempel på **Datoformat** og dit **Telefonnummerformat**.

### Telefonnummerformat

Det samme afsnit Region indeholder indstillingen **Telefonnumre**, som styrer, hvordan telefonnumre indtastes på en persons profil:

- **International (med landekode)** – standard. Telefonfelterne viser en flagvælger og gemmer numre med landekoden (for eksempel +1 918 555 1234).
- **Lokal (som skrevet)** – telefonfelterne bliver almindelige tekstfelter og gemmer numre præcis, som du skriver dem, uden at landekoden tilføjes (for eksempel 0701 234 5678). Vælg dette, hvis din kirke skriver numre i et lokalt format og ikke ønsker, at B1 tilføjer en landekode.

Når **Lokal** er valgt, viser afsnittet Region også "Lokale telefonnumre" ved siden af din region.

:::tip
Sms-udsendelse virker bedst, når numrene har landekoden. Hvis du sender sms'er fra B1, så behold formatet **International**, eller sørg for, at numre, du skriver i tilstanden Lokal, har landekoden.
:::

Din region gælder for datoer og tidspunkter i B1 Admin og på din B1.church-hjemmeside og medlemsportal, herunder prædikener, blogindlæg, gruppekalendere og tjenesteplaner, så medlemmerne ser datoer i samme format som dit personale.

## Sms-udsendelse {#texting}

Forbind en sms-udbyder for at sende sms'er til en person eller en hel gruppe fra B1 Admin. Sms'erne sendes via din egen konto hos udbyderen, så udbyderens priser og begrænsninger gælder.

1. På siden Indstillinger klikker du på **Sms-udsendelse** i den venstre liste og derefter på **Rediger** i afsnittet **Sms-udsendelse**.
2. Vælg en **Udbyder**:
   - **Clearstream** – indtast en **API-nøgle**. Opret en i dine Clearstream-kontoindstillinger under API Keys.
   - **Text In Church** – indtast en **API-nøgle**. Bed først Text In Church Support om adgang til udviklerens API, og opret derefter en nøgle i sektionen Account Settings > Developer API.
   - **Nalo Solutions** (Ghana) – indtast auth-nøglen fra din Nalo Solutions-konto som **API-nøgle** og et **Afsender-ID** (op til 11 tegn), som Nalo har godkendt for dig.
   - **Twilio** – brug din kirkes egen Twilio-konto; Twilio fakturerer dig direkte. Kopiér **Account SID** og **Auth Token** fra [Twilio Console](https://console.twilio.com), og indtast et **Afsendernummer** – et Twilio-telefonnummer registreret til A2P 10DLC, i et format som `+15551234567`. Efter at have gemt, indsæt URL'en til indgående webhook (se nedenfor) i nummerets **A message comes in**-webhook i Twilio, så STOP-svar også registreres i B1.
3. Klik på **Gem**.

For at stoppe med at sende sms'er skal du sætte **Udbyder** til **Ingen** og gemme. Dette fjerner den gemte udbyder.

### Afmelding af personer, der svarer STOP

Når en udbyder er gemt, skal du åbne sms-afsnittet igen med **Rediger**. Under udbyderindstillingerne vises et skrivebeskyttet felt, **Indgående (STOP) webhook-URL**, med en webadresse, der er unik for din kirke. Klik i feltet for at markere adressen, kopiér den og indsæt den i din sms-udbyders indstilling for indgående beskeder (svar) webhook. Dette virker med alle de ovennævnte udbydere, der kan videresende indgående svar til en webhook.

Herefter, når nogen svarer **STOP** (eller STOPALL, UNSUBSCRIBE, CANCEL, END, QUIT, OPTOUT eller REVOKE) på en af dine sms'er, finder B1 alle, hvis mobilnummer matcher, markerer dem som afmeldt og slår deres sms-påmindelser fra. De springes derefter over ved gruppe-sms'er. Andre svar ignoreres.

:::info
Dette bruger den samme afmeldingsindstilling som **Skjul mig fra medlemskataloget**, så personer, der svarer STOP, også vises som **Skjult fra katalog** på deres profil. Feltet vises kun, når den gemte udbyder er valgt. Hvis du skifter rullemenuen til en anden udbyder, skal du gemme først for at se URL'en igen.
:::

Når en udbyder er forbundet, ser medarbejdere med tilladelse til at sende sms'er en knap **Sms** på en gruppes side (**Send sms til denne gruppe**) og på en persons side, hvis personen har et mobilnummer (**Send sms**). Skriv din besked og klik på **Send**. Dialogen tæller tegn og SMS-segmenter. For en gruppe viser den, hvor mange medlemmer der får beskeden, før du sender:

- Medlemmer uden et registreret mobilnummer springes over.
- Medlemmer, der har valgt **Skjul mig fra medlemskataloget**, tælles som afmeldte og springes over.
- Familiemedlemmer, der deler et mobilnummer, får kun beskeden én gang.

### Personalisering af sms'er med flettefelter {#personalizing-texts-with-merge-fields}

Under beskedfeltet viser sms-dialogen pladsholder-chips: **Fornavn**, **Efternavn**, **Visningsnavn** og **Kirkens navn**. Klik på en chip for at indsætte dens pladsholder (`{{firstName}}`, `{{lastName}}`, `{{displayName}}` eller `{{churchName}}`) ved din markør. Når sms'en sendes, erstattes hver pladsholder med modtagerens oplysninger. En gruppe-sms som `Hej {{firstName}}, vi ses søndag!` når derfor frem til hvert medlem med deres eget navn.

Pladsholdere virker både til gruppe-sms'er og sms'er til en enkelt person. Sms'er til en gruppe tilbyder også en chip **Gruppenavn** (`{{groupName}}`), som erstattes med gruppens navn.

For at genbruge en besked skal du gemme den som en [sms-skabelon](./email-templates.md#text-templates) (en e-mailskabelon med kategorien **Text**) og vælge den under **Indlæs skabelon (valgfrit)** øverst i sms-vinduet.

:::info
Grænsen på 1.600 tegn gælder for beskeden, mens du skriver den. Når pladsholderne er udfyldt, afkortes tekst, der er længere end 1.600 tegn, ved denne længde.
:::

Sms'er kan også sendes automatisk fra et [workflow](../serving/workflows.md#sending-a-text)-trin med handlingen **Send sms**, som bruger den samme udbyder og de samme pladsholdere.

## Fillager

Som standard bruger filer, du uploader til din hjemmeside (via [Filer](../website/files.md)) og andre indholdsområder, B1's gratis hostede lager med op til 100 MB. Hvis du har brug for mere plads, kan du i stedet forbinde din egen cloud-lagring. Nye uploads går så direkte til din konto uden platformens grænse.

1. På siden Indstillinger klikker du på **Fillager** i den venstre liste og derefter på **Rediger** i afsnittet **Fillager**.
2. Vælg en udbyder: **Google Drive**, **Dropbox**, **OneDrive** eller en **S3-kompatibel bucket** (AWS S3, Cloudflare R2, Backblaze B2 osv.).
3. For Google Drive, Dropbox eller OneDrive klikker du på **Forbind** og logger ind for at godkende adgang. For en S3-kompatibel bucket indtaster du din adgangsnøgle, hemmelige nøgle, bucketnavn og basis-URL til offentlig adgang.
4. Klik på **Gem**.

:::info
Dette påvirker kun nye uploads til dine hjemmesidefiler og lignende indholdsområder. Galleribilleder, miniaturer, logoer og personfotos bliver altid på B1's standardlager.
:::

## Klassetrin-oprykning

Hvis du registrerer **Klassetrin** for børn og elever, kan B1 automatisk rykke alle et klassetrin op på en dato, du vælger (for eksempel 1. august). Det betyder, at du ikke selv behøver at redigere hver profil.

1. På siden Indstillinger klikker du på **Klassetrin-oprykning** i den venstre liste og derefter på **Rediger** i afsnittet **Klassetrin-oprykning**.
2. Slå kontakten til (den viser **Aktiveret**) og vælg **Måned** og **Dag**, hvor klassetrin skal rykkes op hvert år. På den dato rykker alle med et klassetrin ét trin op, og 12. klasse bliver til **Dimitteret**.
3. Gem dine ændringer.

For at stoppe automatisk oprykning slår du kontakten fra, så den viser **Deaktiveret**, og gemmer. Oprykningsdatoen fjernes, og klassetrin ændrer sig ikke længere af sig selv.

## Frivilligtilmelding {#volunteer-signup}

Som standard ser medlemmer, der gennemser [frivilligtilmeldinger](../../b1-church/serving/volunteer-signup.md), alle kommende uger, hvor der er ledige positioner. Hvis listen bliver lang, kan du i stedet kun vise den næste uge for hver planstype.

1. På siden Indstillinger klikker du på **Frivilligtilmelding** i den venstre liste og derefter på **Rediger** i afsnittet **Frivilligtilmelding**.
2. Slå **Vis kun den næste uge for hver planstype** til.
3. Gem dine ændringer.

Når dette er aktiveret, viser hver planstype kun sin næste kommende plan. Den efterfølgende uge vises, når datoen er passeret. Rækken **Viste uger** i afsnittet viser enten **Kun den næste uge for hver planstype** eller **Alle kommende uger**.

## Gavefortrolighed {#giving-privacy}

Personer med adgang til gaver ser normalt en persons gavetotaler på deres [personpost](../people/adding-people.md#editing-details). Hvis du hellere ikke vil have beløb vist på skærmen, hver gang en post åbnes, kan du skjule dem, indtil nogen beder om at se dem.

1. På siden Indstillinger klikker du på **Gavefortrolighed** i den venstre liste og derefter på **Rediger** i afsnittet **Gavefortrolighed**.
2. Slå **Skjul gaver på personposter, indtil der klikkes** til.
3. Gem dine ændringer.

Når dette er aktiveret, står der på gavekortet på en personpost "Gaver er skjult på personposter." Klik på **Vis gaver** for at indlæse og vise denne persons gaver. Det skjules igen, når du åbner en anden person. Hvem der kan se gaver, ændres ikke: kun personer med gaveadgang ser kortet.

## Import og eksport

Linket **Import/Eksport** under din kirkes navn på siden Indstillinger åbner et særligt værktøj i et nyt browservindue. Brug det til at:

- Importere medlemsdata fra et andet kirkeadministrationssystem.
- Eksportere dine ChurchApps-data til backup eller migrering.

Dette er især nyttigt, når du første gang opsætter din kirke og skal overføre eksisterende poster til ChurchApps.

:::warning
Når du importerer data, skal du altid tage backup af dine eksisterende poster først. Importhandlinger tilføjer data til dit system og kan oprette dubletter, hvis de køres flere gange.
:::
