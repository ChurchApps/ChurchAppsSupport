---
title: "Self-Hosting på Railway"
description: "Deploy en privat ChurchApps-instans på Railway på ca. 15 minutter, og konfigurer e-mail, egne domæner, flere kirker, givning og filopbevaring."
---

# Self-Hosting på Railway

<div class="article-intro">

ChurchApps udgiver en one-click [Railway](https://railway.com)-skabelon, der giver din kirke sin egen private instans af B1 Admin, B1-medlemsportalen, API'et og en MySQL-database — alt sammen kørende på infrastruktur, du ejer og betaler for direkte. Denne guide får dig i gang på cirka 15 minutter og gennemgår derefter den konfiguration efter udrulning, som de fleste kirker til sidst ønsker.

</div>

## Hurtig start

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/b1-template)

1. Klik på knappen **Deploy on Railway** ovenfor.
2. Log ind på Railway (eller opret en gratis konto), og tilføj en betalingsmetode.
3. Klik på **Deploy** uden at ændre noget — hver variabel har en fornuftig standardværdi.
4. Vent 5–10 minutter, til de fire tjenester bliver grønne.
5. Åbn URL'en for tjenesten **B1Admin**, klik på **Register**, og opret din konto. Den første konto bliver automatisk en serveradministrator.
6. Følg vejledningen i appen for at oprette din første kirke.

Så er det klaret. Du har nu en fuldt fungerende ChurchApps-instans. Alt nedenfor er valgfri finpudsning.

:::tip
Udrulningen er i øjeblikket i **beta**. Hvis du støder på noget, dokumentationen ikke dækker, så opret venligst en issue på [github.com/ChurchApps/Api/issues](https://github.com/ChurchApps/Api/issues) og vedhæft deploy-logfilerne.
:::

<div class="prereqs">
<h4>Det skal du bruge</h4>

- En gratis [Railway](https://railway.com)-konto
- Et kreditkort registreret hos Railway (~$15–25/måned for en lille menighed; se [Omkostninger](#costs))
- Cirka 15 minutter til den første udrulning
- *Valgfrit, men på det kraftigste anbefalet senere:* SMTP-legitimationsoplysninger og et eget domæne

</div>

## Hvad der bliver udrullet

Skabelonen opretter fire tjenester i ét Railway-projekt:

| Tjeneste | Formål | URL efter udrulning |
|----------|--------|---------------------|
| **MySQL** | Gemmer alle data (én instans, flere skemaer) | kun internt |
| **Api** | Backend til medlemskab, indhold, donationer, fremmøde m.m. | `https://api-<id>.up.railway.app` |
| **B1Admin** | Webapp til personale/administratorer | `https://b1admin-<id>.up.railway.app` |
| **B1App** | Webapp til medlemmer og kirkens hjemmeside | `https://b1app-<id>.up.railway.app` |

Databaseskemaerne oprettes automatisk ved første opstart af API'ets migrering ved opstart.

## Førstegangskonfiguration

Nu hvor systemet kører, er her de ting, de fleste kirker sætter op næst, nogenlunde i prioriteret rækkefølge.

### 1. E-mail (anbefales kraftigt)

Uden e-mail kan medlemmer stadig registrere sig og bruge systemet, men **de kan ikke nulstille glemte adgangskoder** — en administrator skal gøre det for dem. Opsætning af SMTP tager cirka 5 minutter.

Åbn i Railway-dashboardet tjenesten **Api** → **Variables**, og tilføj:

```
MAIL_SYSTEM=SMTP
SMTP_HOST=<your provider host>
SMTP_USER=<your username>
SMTP_PASS=<your password or API key>
SMTP_SECURE=false
SUPPORT_EMAIL=noreply@yourchurch.org
```

Tre udbydere, du bør kende til:

#### Resend — den enkleste gratis mulighed (100 e-mails/dag)

1. Opret dig på [resend.com](https://resend.com).
2. Verificér et afsenderdomæne (eller brug test-afsenderen `onboarding@resend.dev` for at komme i gang).
3. Opret en API-nøgle.
4. Sæt `SMTP_HOST=smtp.resend.com`, `SMTP_USER=resend`, `SMTP_PASS=re_xxxxxxxxx`.

#### Gmail — gratis til personlig brug (~500/dag)

1. Aktivér 2-faktor-godkendelse på Google-kontoen.
2. Opret en [App-adgangskode](https://myaccount.google.com/apppasswords).
3. Sæt `SMTP_HOST=smtp.gmail.com`, `SMTP_USER=din-adresse@gmail.com`, `SMTP_PASS=<app-adgangskoden på 16 tegn>`.

#### AWS SES — billigst i stor skala

1. Verificér et afsenderdomæne i AWS.
2. Forlad SES-sandkassen, hvis du vil sende til ikke-verificerede adresser.
3. Opret SMTP-legitimationsoplysninger under **SES → SMTP Settings → Create credentials**.
4. Sæt `SMTP_HOST=email-smtp.us-east-2.amazonaws.com`, `SMTP_USER=AKIA...`, `SMTP_PASS=<SES SMTP-adgangskoden>`.

Når variablerne er gemt, bliver Api-tjenesten automatisk udrullet igen. Test det ved at udløse en nulstilling af adgangskode på en testkonto.

:::warning
Hvis du sætter `MAIL_SYSTEM=SMTP` med forkerte legitimationsoplysninger, vil registreringen se ud til at lykkes, men bekræftelsesmailen kommer aldrig frem. Enten ret legitimationsoplysningerne, eller fjern `MAIL_SYSTEM` for at falde tilbage til tilstanden uden e-mail.
:::

### 2. Egne domæner

De standardmæssige `*.up.railway.app`-URL'er fungerer, men de fleste kirker ønsker deres eget.

For hver webtjeneste (B1Admin og B1App):

1. Åbn tjenesten i Railway → **Settings** → **Networking**.
2. Klik på **+ Custom Domain**, og indtast værtsnavnet:
   - `admin.yourchurch.org` for B1Admin
   - `app.yourchurch.org` (eller `www`) for B1App
3. Tilføj den CNAME-post, Railway viser dig, hos din DNS-udbyder.
4. Vent et par minutter, til DNS er udbredt. Railway udsteder TLS-certifikatet automatisk.

Opdatér derefter variablerne for tjenesten **Api**, så links i e-mails peger på de nye domæner:

```
B1ADMIN_ROOT=https://admin.yourchurch.org
```

Og på tjenesten **B1Admin**:

```
REACT_APP_API_BASE=https://api.yourchurch.org   (hvis du også har sat et eget API-domæne)
REACT_APP_B1_WEBSITE_URL=https://{subdomain}.yourchurch.org
```

Tokenet `{subdomain}` er bogstaveligt — det bliver erstattet under kørsel med hver kirkes underdomæne (se Multi-Site nedenfor).

### 3. Multi-Site (flere kirker på én instans)

ChurchApps er multi-tenant i sit design — én udrulning kan huse et vilkårligt antal kirker, hver med egne personer, grupper og hjemmeside. Nye kirker tilføjes udelukkende via admin-brugerfladen; der kræves ingen infrastrukturændringer.

#### Tilføjelse af flere kirker

1. I **B1 Admin** navigerer du til **Settings → Manage Church → Switch Church → Create New**.
2. Hver kirke har et unikt **underdomænenavn** (f.eks. `firstchurch`, `gracecommunity`).
3. Den nye kirke får sine egne data, medlemmer, hjemmeside og donationsopsætning, fuldt isoleret fra andre kirker på samme instans.

#### Routing af hver kirke til sin egen URL

To måder at eksponere kirker offentligt på:

| Mønster | Eksempel | Opsætning |
|---------|----------|-----------|
| **Stibaseret** (virker straks) | `app.yourchurch.org/firstchurch` | Ingen ekstra opsætning |
| **Underdomænebaseret** (pænere URL'er) | `firstchurch.yourchurch.org` | Wildcard-DNS + wildcard-domæne |

For **underdomænebaseret** routing på Railway:

1. Opret i din DNS-udbyders system en wildcard-CNAME: `*.yourchurch.org → <b1app railway target>`.
2. I Railway, på tjenesten B1App → **Settings → Networking**, tilføj `*.yourchurch.org` som eget domæne.
3. På tjenesten **B1Admin** sættes `REACT_APP_B1_WEBSITE_URL=https://{subdomain}.yourchurch.org`.

Efter ny udrulning serveres hver kirkes side automatisk på `<deres-underdomæne>.yourchurch.org`.

:::info
Wildcard-domæner kræver en betalt Railway-plan. Stibaseret routing virker på alle planer og er funktionelt identisk — blot mindre pæn i adresselinjen.
:::

### 4. Online-donationer (Stripe / PayPal)

Donationer konfigureres **pr. kirke i admin-brugerfladen**, ikke via miljøvariabler — på den måde kan hver kirke bruge sin egen forhandlerkonto.

1. Hent udviklerlegitimationsoplysninger hos [Stripe](https://dashboard.stripe.com/) (Developers → API keys) eller [PayPal](https://developer.paypal.com/) (My Apps & Credentials).
2. I B1 Admin går du til **Settings → Giving Settings**.
3. Vælg din udbyder, indsæt de offentlige og hemmelige nøgler, og konfigurer håndteringen af gebyrer.
4. Tilføj eventuelt `GOOGLE_RECAPTCHA_SECRET_KEY` til tjenesten **Api** i Railway for at beskytte offentlige donationsformularer mod bots.

### 5. Fillagring

Skabelonen opretter en **1 GB vedvarende volumen**, monteret på tjenesten Api, til medlemsfotos, prædikenfiler og uploadede dokumenter.

For at udvide den: åbn tjenesten Api → **Volumes** → juster størrelsesskyderen.

Til større udrulninger (100+ GB eller mange samtidige uploads) skiftes til S3 ved at sætte disse på tjenesten **Api**:

```
FILE_STORE=S3
AWS_S3_BUCKET=<your-bucket>
AWS_ACCESS_KEY_ID=<key>
AWS_SECRET_ACCESS_KEY=<secret>
AWS_REGION=us-east-2
```

Eksisterende filer på volumen migreres ikke automatisk — kopiér dem til bucketen, før du ændrer variablen.

### 6. Valgfrige funktionsintegrationer

Disse åbner for specifikke funktioner og kan alle tilføjes senere via Railway-dashboardet. Sæt dem på tjenesten **Api**.

| Variabel | Funktion den aktiverer |
|----------|------------------------|
| `OPENAI_API_KEY` *eller* `OPENROUTER_API_KEY` | AI-assisteret søgning og indholdsforslag |
| `YOUTUBE_API_KEY` | Søgning og indlejring af YouTube-prædikener |
| `PEXELS_KEY` | Billedvælger med stockfotos til hjemmesidebyggeren |
| `VIMEO_TOKEN` | Understøttelse af Vimeo-prædikener |
| `API_BIBLE_KEY` | Slåning op i bibelvers i lektioner og indhold |
| `YOUVERSION_API_KEY` | YouVersion-bibelintegration |
| `WEB_PUSH_PUBLIC_KEY` + `WEB_PUSH_PRIVATE_KEY` | Push-notifikationer i browseren ([generér et VAPID-nøglepar](./docker.md#push-notifications)) |
| `HUBSPOT_KEY` | Valgfri CRM-synkronisering af nye registreringer |

## Opdatering

Hver tjeneste er forbundet med sit respektive GitHub-repo. Push til `main` på `ChurchApps/Api`, `ChurchApps/B1Admin` eller `ChurchApps/B1App` udløser automatiske genudrulninger.

For at fastlåse en bestemt version skal du ændre indstillingen **Branch** på hver tjeneste til et tag eller en release-gren. Dette er den anbefalede opsætning til produktion — automatisk udrulning fra `main` betyder, at du arver alt igangværende arbejde.

## Omkostninger

Realistiske intervaller for en lille kirke (under 200 medlemmer, lav trafik):

| Komponent | Cirka månedlig omkostning |
|-----------|---------------------------|
| Railway-grundgebyr | $5 |
| MySQL-plugin | $5 + ~$1 lagerplads |
| 3 webtjenesters beregningskraft | $3–10 samlet |
| 1 GB volumen | $0,25 |
| **I alt** | **~$15–25/måned** |

Omkostningerne skalerer lineært med trafik, fotouploads og databasestørrelse. Railway viser det aktuelle forbrug under fanen **Usage** i projektet — sæt forbrugsgrænser dér for at begrænse din eksponering.

## Fejlfinding

| Symptom | Sandsynlig årsag | Løsning |
|---------|------------------|---------|
| Build fejler med `EBUSY: rmdir '/app/node_modules/.cache'` | Konflikt i Nixpacks-cachemount | Sæt `NIXPACKS_NO_CACHE=true` på den berørte tjeneste |
| Build fejler på B1Admin med `Missing: @types/...` | Usynkroniseret `package-lock.json` | Hent den seneste `main` |
| Api-udrulningen hænger på "Deploying" | Healthcheck fejler — `/health` returnerer ikke 200 | Se deploy-logfilerne; typisk mangler en påkrævet miljøvariabel |
| B1Admin viser "check your email", men ingen e-mail kommer | `MAIL_SYSTEM=SMTP` er sat, men legitimationsoplysningerne mangler/er forkerte | Ret legitimationsoplysningerne, eller fjern `MAIL_SYSTEM` for at deaktivere e-mail |
| Login omdirigerer til `api.churchapps.org` | `REACT_APP_STAGE` er `prod` | Sæt `REACT_APP_STAGE=custom` på tjenesten B1Admin |
| Underdomænekirker viser alle det samme indhold | `REACT_APP_B1_WEBSITE_URL` indeholder ikke tokenet `{subdomain}` | Sæt det til f.eks. `https://{subdomain}.yourchurch.org` |
| Eget domæne viser "Application not found" | DNS er endnu ikke udbredt, eller Railway-certifikatet afventer | Vent 5 minutter; tjek DNS med `dig admin.yourchurch.org` |

Hvis du støder på noget, der ikke står på denne liste, så opret en issue på [github.com/ChurchApps/Api/issues](https://github.com/ChurchApps/Api/issues) og vedhæft deploy-logfilerne.

## Relaterede artikler

- **[Self-Hosting med Docker](./docker.md)** — Samme stak på din egen hardware eller VPS
- **[Første opsætning](../../getting-started/initial-setup.md)** — Første skridt, efter din kirke er oprettet
- **[Opsætning af hjemmeside](../../b1-admin/website/initial-setup.md)** — Konfigurér din kirkes offentlige side
- **[Donationsindstillinger](../../b1-admin/donations/online-giving-setup.md)** — Tilslut Stripe eller PayPal
- **[Lokal API-opsætning](../api/local-setup.md)** — Kør stakken lokalt til udvikling
- **[API-udrulning (AWS)](./apis.md)** — Sådan udrulles ChurchApps' officielle SaaS
