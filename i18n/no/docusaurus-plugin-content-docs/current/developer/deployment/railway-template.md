---
title: "Selvhosting på Railway"
---

# Selvhosting på Railway

<div class="article-intro">

ChurchApps publiserer en ett-klikks [Railway](https://railway.com)-mal som gir kirken din en egen privat instans av B1 Admin, B1-medlemsportalen, API-et og en MySQL-database — alt kjørende på infrastruktur du eier og betaler for direkte. Denne veiledningen får deg i gang på omtrent 15 minutter, og går deretter gjennom konfigurasjonen etter distribusjonen som de fleste kirker etter hvert vil ha.

</div>

## Hurtigstart

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/b1-template)

1. Klikk på knappen **Deploy on Railway** over.
2. Logg inn på Railway (eller opprett en gratis konto) og legg til et betalingskort.
3. Klikk **Deploy** uten å endre noe — hver variabel har en fornuftig standard.
4. Vent 5–10 minutter til de fire tjenestene blir grønne.
5. Åpne **B1Admin**-tjenestens URL, klikk **Register**, og opprett kontoen din. Den første kontoen blir automatisk serveradministrator.
6. Følg de innebygde veiledningene for å opprette din første kirke.

Det er alt. Du har nå en fullt fungerende ChurchApps-instans. Alt nedenfor er valgfri finpuss.

:::tip
Distribusjonen er for øyeblikket i **beta**. Hvis du møter noe dokumentasjonen ikke dekker, åpne gjerne en sak på [github.com/ChurchApps/Api/issues](https://github.com/ChurchApps/Api/issues) med distribusjonslogger vedlagt.
:::

<div class="prereqs">
<h4>Hva du trenger</h4>

- En gratis [Railway](https://railway.com)-konto
- Et kredittkort registrert hos Railway (~$15–25/måned for en liten menighet; se [Kostnader](#costs))
- Omtrent 15 minutter for den første distribusjonen
- *Valgfritt men sterkt anbefalt senere:* SMTP-legitimasjon og et eget domene

</div>

## Hva som distribueres

Malen klargjør fire tjenester i ett Railway-prosjekt:

| Tjeneste | Formål | URL etter distribusjon |
|---------|---------|------------------|
| **MySQL** | Lagrer alle data (én instans, flere skjemaer) | kun intern |
| **Api** | Backend for membership, content, giving, attendance osv. | `https://api-<id>.up.railway.app` |
| **B1Admin** | Web-app for personale/administratorer | `https://b1admin-<id>.up.railway.app` |
| **B1App** | Webapp for medlemmer og kirkens nettsted | `https://b1app-<id>.up.railway.app` |

Databaseskjemaene opprettes automatisk ved første oppstart av API-ets migrering ved oppstart.

## Førstegangskonfigurasjon

Nå som du er oppe, er dette de tingene de fleste kirker setter opp neste, omtrent i prioritert rekkefølge.

### 1. E-post (sterkt anbefalt) {#1-email-highly-recommended}

Uten e-post kan medlemmer fortsatt registrere seg og bruke systemet, men **de kan ikke tilbakestille glemte passord** — en administrator må gjøre det for dem. Å sette opp SMTP tar omtrent 5 minutter.

I Railway-dashbordet åpner du **Api**-tjenesten → **Variables**, og legger til:

```
MAIL_SYSTEM=SMTP
SMTP_HOST=<din leverandørs vert>
SMTP_USER=<ditt brukernavn>
SMTP_PASS=<ditt passord eller API-nøkkel>
SMTP_SECURE=false
SUPPORT_EMAIL=noreply@yourchurch.org
```

Tre leverandører er verdt å vite om:

#### Resend — enkleste gratisalternativ (100 e-poster/dag)

1. Registrer deg på [resend.com](https://resend.com).
2. Verifiser et avsenderdomene (eller bruk testavsenderen `onboarding@resend.dev` for å starte).
3. Opprett en API-nøkkel.
4. Sett `SMTP_HOST=smtp.resend.com`, `SMTP_USER=resend`, `SMTP_PASS=re_xxxxxxxxx`.

#### Gmail — gratis til personlig bruk (~500/dag)

1. Aktiver tofaktorautentisering på Google-kontoen.
2. Opprett et [App-passord](https://myaccount.google.com/apppasswords).
3. Sett `SMTP_HOST=smtp.gmail.com`, `SMTP_USER=din-adresse@gmail.com`, `SMTP_PASS=<app-passordet på 16 tegn>`.

#### AWS SES — billigst i stor skala

1. Verifiser et avsenderdomene i AWS.
2. Gå ut av SES-sandkassen hvis du skal sende til ikke-verifiserte adresser.
3. Opprett SMTP-legitimasjon under **SES → SMTP Settings → Create credentials**.
4. Sett `SMTP_HOST=email-smtp.us-east-2.amazonaws.com`, `SMTP_USER=AKIA...`, `SMTP_PASS=<SES SMTP-passordet>`.

Etter at du har lagret variablene, distribueres Api-tjenesten på nytt automatisk. Test ved å starte en tilbakestilling av passord på en testkonto.

:::warning
Hvis du setter `MAIL_SYSTEM=SMTP` med feil legitimasjon, vil registreringen se ut til å lykkes, men bekreftelses-e-posten kommer aldri. Enten fiks legitimasjonen, eller fjern `MAIL_SYSTEM` for å gå tilbake til modus uten e-post.
:::

### 2. Egne domener

De standard `*.up.railway.app`-URL-ene fungerer, men de fleste kirker vil ha sine egne.

For hver webtjeneste (B1Admin og B1App):

1. Åpne tjenesten i Railway → **Settings** → **Networking**.
2. Klikk **+ Custom Domain** og skriv inn vertsnavnet:
   - `admin.yourchurch.org` for B1Admin
   - `app.yourchurch.org` (eller `www`) for B1App
3. Legg til CNAME-posten Railway viser deg hos din DNS-leverandør.
4. Vent noen minutter til DNS propagerer. Railway klargjør TLS-sertifikatet automatisk.

Oppdater deretter variablene på **Api**-tjenesten slik at lenker i e-poster bruker de nye domenene:

```
B1ADMIN_ROOT=https://admin.yourchurch.org
```

Og på **B1Admin**-tjenesten:

```
REACT_APP_API_BASE=https://api.yourchurch.org   (hvis du også setter et eget API-domene)
REACT_APP_B1_WEBSITE_URL=https://{subdomain}.yourchurch.org
```

`{subdomain}`-merket er bokstavelig — det erstattes ved kjøretid med hver kirkes underdomene (se Flere nettsteder nedenfor).

### 3. Flere nettsteder (flere kirker på én instans) {#3-multi-site-multiple-churches-on-one-instance}

ChurchApps er multi-tenant ved design — én distribusjon kan være vert for et hvilket som helst antall kirker, hver med sine egne personer, grupper og nettsted. Nye kirker legges til helt gjennom admin-grensesnittet; ingen infrastrukturendringer er nødvendige.

#### Legge til flere kirker

1. I **B1 Admin** går du til **Settings → Manage Church → Switch Church → Create New**.
2. Hver kirke har en unik **underdomene-slug** (f.eks. `firstchurch`, `gracecommunity`).
3. Den nye kirken får sine egne data, medlemmer, nettsted og gavekonfigurasjon, fullt isolert fra andre kirker på samme instans.

#### Rute hver kirke til sin egen URL

To måter å eksponere kirker offentlig på:

| Mønster | Eksempel | Oppsett |
|---------|---------|---------|
| **Stibasert** (fungerer ut av boksen) | `app.yourchurch.org/firstchurch` | Ingen ekstra oppsett |
| **Underdomenebasert** (penere URL-er) | `firstchurch.yourchurch.org` | Wildcard-DNS + wildcard-egendomene |

For **underdomenebasert** ruting på Railway:

1. I DNS-leverandøren din oppretter du en wildcard-CNAME: `*.yourchurch.org → <b1app Railway-mål>`.
2. I Railway, på B1App-tjenesten → **Settings → Networking**, legger du til `*.yourchurch.org` som eget domene.
3. På **B1Admin**-tjenesten setter du `REACT_APP_B1_WEBSITE_URL=https://{subdomain}.yourchurch.org`.

Etter ny distribusjon serveres hver kirkes nettsted på `<deres-underdomene>.yourchurch.org` automatisk.

:::info
Wildcard-egendomener krever en betalt Railway-plan. Stibasert ruting fungerer på alle planer og er funksjonelt identisk — bare mindre pen i adressefeltet.
:::

### 4. Nettbasert giving (Stripe / PayPal) {#4-online-giving-stripe--paypal}

Giving konfigureres **per kirke i admin-grensesnittet**, ikke via miljøvariabler — slik kan hver kirke bruke sin egen forhandlerkonto.

1. Hent utviklerlegitimasjon fra [Stripe](https://dashboard.stripe.com/) (Developers → API keys) eller [PayPal](https://developer.paypal.com/) (My Apps & Credentials).
2. I B1 Admin går du til **Settings → Giving Settings**.
3. Velg leverandør, lim inn de offentlige og hemmelige nøklene, og konfigurer håndtering av gebyrer.
4. Du kan eventuelt legge til `GOOGLE_RECAPTCHA_SECRET_KEY` på **Api**-tjenesten i Railway for å beskytte offentlige givskjemaer mot roboter.

### 5. Fillagring {#5-file-storage}

Malen klargjør et **1 GB vedvarende volum** montert på Api-tjenesten for medlemsbilder, prekenfiler og opplastede dokumenter.

For å øke det: åpne Api-tjenesten → **Volumes** → juster størrelsesglidebryteren.

For større distribusjoner (100+ GB eller mange samtidige opplastinger) bytter du til S3 ved å sette disse på **Api**-tjenesten:

```
FILE_STORE=S3
AWS_S3_BUCKET=<din-bøtte>
AWS_ACCESS_KEY_ID=<nøkkel>
AWS_SECRET_ACCESS_KEY=<hemmelighet>
AWS_REGION=us-east-2
```

Eksisterende filer i volumet migreres ikke automatisk — kopier dem til bøtten før du bytter variabelen.

### 6. Valgfrie funksjonsintegrasjoner {#6-optional-feature-integrations}

Disse låser opp bestemte funksjoner og kan alle legges til senere via Railway-dashbordet. Sett dem på **Api**-tjenesten.

| Variabel | Funksjonen den aktiverer |
|----------|--------------------|
| `OPENAI_API_KEY` *eller* `OPENROUTER_API_KEY` | KI-assistert søk og innholdsforslag |
| `YOUTUBE_API_KEY` | YouTube-prekensøk og innbygging |
| `PEXELS_KEY` | Stockbildevelger for nettstedsbyggeren |
| `VIMEO_TOKEN` | Vimeo-prekenstøtte |
| `API_BIBLE_KEY` | Bibelversoppslag i leksjoner og innhold |
| `YOUVERSION_API_KEY` | YouVersion Bible-integrasjon |
| `WEB_PUSH_PUBLIC_KEY` + `WEB_PUSH_PRIVATE_KEY` | Push-varsler i nettleseren ([generer et VAPID-nøkkelpar](./docker#push-notifications)) |
| `HUBSPOT_KEY` | Valgfri CRM-synkronisering for nye registreringer |

## Oppdatering

Hver tjeneste er koblet til sitt respektive GitHub-repo. Pushes til `main` på `ChurchApps/Api`, `ChurchApps/B1Admin` eller `ChurchApps/B1App` utløser automatiske nye distribusjoner.

For å låse en bestemt versjon endrer du **Branch**-innstillingen på hver tjeneste til en tagg eller utgivelsesgren. Dette er det anbefalte oppsettet for produksjon — automatisk distribusjon fra `main` gir deg også pågående arbeid.

## Kostnader {#costs}

Reelle intervaller for en liten kirke (under 200 medlemmer, lav trafikk):

| Komponent | Ca. månedlig kostnad |
|-----------|---------------------|
| Railway-grunnavgift | $5 |
| MySQL-plugin | $5 + ~$1 lagring |
| 3 webtjenester beregningskraft | $3–10 samlet |
| 1 GB volum | $0,25 |
| **Totalt** | **~$15–25/måned** |

Kostnadene skalerer lineært med trafikk, bildeopplastinger og databasestørrelse. Railway viser sitt løpende forbruk under prosjektets **Usage**-fane — sett forbruksgrenser der for å begrense eksponeringen din.

## Feilsøking

| Symptom | Sannsynlig årsak | Løsning |
|---------|--------------|-----------|
| Bygget mislykkes med `EBUSY: rmdir '/app/node_modules/.cache'` | Konflikt i Nixpacks-cachemontering | Sett `NIXPACKS_NO_CACHE=true` på den berørte tjenesten |
| Bygget mislykkes på B1Admin med `Missing: @types/...` | Utdatert `package-lock.json` | Hent siste `main` |
| Api-distribusjonen henger på «Deploying» | Helsesjekken feiler — `/health` returnerer ikke 200 | Se distribusjonslogger; vanligvis en manglende obligatorisk miljøvariabel |
| B1Admin viser «check your email», men ingen e-post kommer | `MAIL_SYSTEM=SMTP` er satt, men legitimasjonen mangler/er feil | Fiks legitimasjonen, eller fjern `MAIL_SYSTEM` for å slå av e-post |
| Innlogging sender deg til `api.churchapps.org` | `REACT_APP_STAGE` er `prod` | Sett `REACT_APP_STAGE=custom` på B1Admin-tjenesten |
| Underdomenekirker viser alle samme innhold | `REACT_APP_B1_WEBSITE_URL` mangler `{subdomain}`-merket | Sett den til f.eks. `https://{subdomain}.yourchurch.org` |
| Eget domene viser «Application not found» | DNS ikke propagert ennå, eller Railway-sertifikatet venter | Vent 5 minutter; sjekk DNS med `dig admin.yourchurch.org` |

Hvis du møter noe som ikke står på denne listen, åpne en sak på [github.com/ChurchApps/Api/issues](https://github.com/ChurchApps/Api/issues) med distribusjonslogger vedlagt.

## Relaterte artikler

- **[Selvhosting med Docker](./docker)** — samme stack på din egen maskinvare eller VPS
- **[Første oppsett](../../getting-started/initial-setup)** — første steg etter at kirken din er opprettet
- **[Oppsett av nettsted](../../b1-admin/website/initial-setup)** — konfigurer kirkens offentlige nettsted
- **[Innstillinger for giving](../../b1-admin/donations/online-giving-setup)** — koble til Stripe eller PayPal
- **[Lokalt API-oppsett](../api/local-setup)** — kjøre stacken lokalt for utvikling
- **[API-distribusjon (AWS)](./apis)** — hvordan den offisielle ChurchApps-SaaS-tjenesten distribueres
