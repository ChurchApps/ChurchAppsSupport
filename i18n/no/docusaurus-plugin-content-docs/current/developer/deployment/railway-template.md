---
title: "Selvhosting på Railway"
---

# Selvhosting på Railway

<div class="article-intro">

ChurchApps publiserer en Railway-mal med ett klikk som gir kirken din sin egen private instans av B1 Admin, B1-medlemsportalen, API-et og en MySQL-database — alt sammen kjørende på infrastruktur du selv eier og betaler for direkte. Denne veiledningen får deg live på omtrent 15 minutter, og går deretter gjennom oppsettet etter distribusjon som de fleste kirker etter hvert ønsker.

</div>

## Hurtigstart

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/b1-template)

1. Klikk på **Deploy on Railway**-knappen ovenfor.
2. Logg inn på Railway (eller opprett en gratis konto) og legg til en betalingsmåte.
3. Klikk på **Deploy** uten å endre noe — hver variabel har en fornuftig standardverdi.
4. Vent 5–10 minutter på at de fire tjenestene blir grønne.
5. Åpne **B1Admin**-tjenestens URL, klikk på **Register**, og opprett kontoen din. Den første kontoen blir automatisk serveradministrator.
6. Følg meldingene i appen for å opprette din første kirke.

Det er alt. Du har nå en fullt fungerende ChurchApps-instans. Alt nedenfor er valgfri finpuss.

:::tip
Distribusjonen er for øyeblikket i **beta**. Hvis du støter på noe dokumentasjonen ikke dekker, kan du åpne en sak på [github.com/ChurchApps/Api/issues](https://github.com/ChurchApps/Api/issues) med distribusjonsloggene vedlagt.
:::

<div class="prereqs">
<h4>Hva du trenger</h4>

- En gratis [Railway](https://railway.com)-konto
- Et kredittkort registrert hos Railway (~15–25 dollar/måned for en liten menighet; se [Kostnader](#kostnader))
- Omtrent 15 minutter for den innledende distribusjonen
- *Valgfritt, men sterkt anbefalt senere:* SMTP-legitimasjon og et tilpasset domene

</div>

## Hva som distribueres

Malen setter opp fire tjenester i ett enkelt Railway-prosjekt:

| Tjeneste | Formål | URL etter distribusjon |
|---------|---------|------------------|
| **MySQL** | Lagrer alle data (én instans, flere skjemaer) | kun internt |
| **Api** | Backend for medlemskap, innhold, giving, oppmøte, osv. | `https://api-<id>.up.railway.app` |
| **B1Admin** | Nettapp for stab/administrasjon | `https://b1admin-<id>.up.railway.app` |
| **B1App** | Medlemsvendt nettapp og kirkens nettsted | `https://b1app-<id>.up.railway.app` |

Databaseskjemaer opprettes automatisk ved første oppstart av API-ets oppstartsmigrering.

## Førstegangskonfigurasjon

Nå som du er oppe og går, er her tingene de fleste kirker setter opp neste, omtrent i prioritert rekkefølge.

### 1. E-post (sterkt anbefalt)

Uten e-post kan medlemmer fortsatt registrere seg og bruke systemet, men **de kan ikke tilbakestille glemte passord** — en administrator må gjøre det for dem. Å sette opp SMTP tar omtrent 5 minutter.

I Railway-dashbordet åpner du **Api**-tjenesten → **Variables**, og legger til:

```
MAIL_SYSTEM=SMTP
SMTP_HOST=<your provider host>
SMTP_USER=<your username>
SMTP_PASS=<your password or API key>
SMTP_SECURE=false
SUPPORT_EMAIL=noreply@yourchurch.org
```

Tre leverandører verdt å kjenne til:

#### Resend — enkleste gratisalternativ (100 e-poster/dag)

1. Registrer deg på [resend.com](https://resend.com).
2. Verifiser et avsenderdomene (eller bruk testavsenderen `onboarding@resend.dev` for å komme i gang).
3. Opprett en API-nøkkel.
4. Sett `SMTP_HOST=smtp.resend.com`, `SMTP_USER=resend`, `SMTP_PASS=re_xxxxxxxxx`.

#### Gmail — gratis for personlig bruk (~500/dag)

1. Aktiver tofaktorautentisering på Google-kontoen.
2. Opprett et [app-passord](https://myaccount.google.com/apppasswords).
3. Sett `SMTP_HOST=smtp.gmail.com`, `SMTP_USER=your-address@gmail.com`, `SMTP_PASS=<det 16-tegns app-passordet>`.

#### AWS SES — billigst i stor skala

1. Verifiser et avsenderdomene i AWS.
2. Flytt ut av SES-sandkassen hvis du skal sende til ikke-verifiserte adresser.
3. Opprett SMTP-legitimasjon under **SES → SMTP Settings → Create credentials**.
4. Sett `SMTP_HOST=email-smtp.us-east-2.amazonaws.com`, `SMTP_USER=AKIA...`, `SMTP_PASS=<SES SMTP-passord>`.

Etter at variablene er lagret, distribueres Api-tjenesten på nytt automatisk. Test det ved å utløse en passordtilbakestilling på en testkonto.

:::warning
Hvis du setter `MAIL_SYSTEM=SMTP` med feil legitimasjon, vil registreringen se ut til å lykkes, men bekreftelses-e-posten kommer aldri fram. Fiks enten legitimasjonen, eller fjern `MAIL_SYSTEM` for å falle tilbake til modus uten e-post.
:::

### 2. Tilpassede domener

Standard-URL-ene med `*.up.railway.app` fungerer, men de fleste kirker vil ha sine egne.

For hver nettjeneste (B1Admin og B1App):

1. Åpne tjenesten i Railway → **Settings** → **Networking**.
2. Klikk på **+ Custom Domain** og skriv inn vertsnavnet:
   - `admin.yourchurch.org` for B1Admin
   - `app.yourchurch.org` (eller `www`) for B1App
3. Legg til CNAME-posten Railway viser deg, hos DNS-leverandøren din.
4. Vent noen minutter på at DNS-en forplanter seg. Railway setter opp TLS-sertifikatet automatisk.

Oppdater deretter variablene til **Api**-tjenesten slik at lenker i e-poster bruker de nye domenene:

```
B1ADMIN_ROOT=https://admin.yourchurch.org
```

Og på **B1Admin**-tjenesten:

```
REACT_APP_API_BASE=https://api.yourchurch.org   (if you also set a custom API domain)
REACT_APP_B1_WEBSITE_URL=https://{subdomain}.yourchurch.org
```

`{subdomain}`-symbolet er bokstavelig — det erstattes ved kjøretid med hver kirkes subdomene (se Flere kirker nedenfor).

### 3. Flere kirker (flere kirker på én instans)

ChurchApps er utviklet for å være flerleietaker (multi-tenant) — én distribusjon kan huse et hvilket som helst antall kirker, hver med sine egne personer, grupper og nettsted. Nye kirker legges til utelukkende gjennom administrasjonsgrensesnittet; ingen infrastrukturendringer er nødvendige.

#### Legge til flere kirker

1. I **B1 Admin**, gå til **Settings → Manage Church → Switch Church → Create New**.
2. Hver kirke har en unik **subdomene-slug** (f.eks. `firstchurch`, `gracecommunity`).
3. Den nye kirken får sine egne data, medlemmer, nettsted og giving-oppsett, fullstendig isolert fra andre kirker på samme instans.

#### Rute hver kirke til sin egen URL

To måter å eksponere kirker offentlig på:

| Mønster | Eksempel | Oppsett |
|---------|---------|-------|
| **Sti-basert** (fungerer rett ut av boksen) | `app.yourchurch.org/firstchurch` | Ingen ekstra oppsett |
| **Subdomene-basert** (ryddigere URL-er) | `firstchurch.yourchurch.org` | Wildcard-DNS + wildcard tilpasset domene |

For **subdomene-basert** ruting på Railway:

1. Opprett en wildcard-CNAME hos DNS-leverandøren din: `*.yourchurch.org → <b1app railway target>`.
2. I Railway, på B1App-tjenesten → **Settings → Networking**, legg til `*.yourchurch.org` som et tilpasset domene.
3. På **B1Admin**-tjenesten setter du `REACT_APP_B1_WEBSITE_URL=https://{subdomain}.yourchurch.org`.

Etter ny distribusjon serveres hver kirkes nettsted automatisk på `<their-subdomain>.yourchurch.org`.

:::info
Wildcard tilpassede domener krever en betalt Railway-plan. Sti-basert ruting fungerer på alle planer og er funksjonelt identisk — bare mindre pen i adresselinjen.
:::

### 4. Nettbasert giving (Stripe / PayPal)

Giving konfigureres **per kirke inne i administrasjonsgrensesnittet**, ikke via miljøvariabler — slik kan hver kirke bruke sin egen forhandlerkonto.

1. Hent utviklerlegitimasjon fra [Stripe](https://dashboard.stripe.com/) (Developers → API keys) eller [PayPal](https://developer.paypal.com/) (My Apps & Credentials).
2. I B1 Admin går du til **Settings → Giving Settings**.
3. Velg leverandøren din, lim inn de offentlige og hemmelige nøklene, og konfigurer gebyrhåndtering.
4. Legg eventuelt til `GOOGLE_RECAPTCHA_SECRET_KEY` på **Api**-tjenesten i Railway for å beskytte offentlige donasjonsskjemaer mot roboter.

### 5. Fillagring

Malen setter opp et **1 GB vedvarende volum** montert på Api-tjenesten for medlemsbilder, prekenfiler og opplastede dokumenter.

For å utvide det: åpne Api-tjenesten → **Volumes** → juster størrelsesglideren.

For større distribusjoner (100+ GB eller mange samtidige opplastinger), bytt til S3 ved å sette disse på **Api**-tjenesten:

```
FILE_STORE=S3
AWS_S3_BUCKET=<your-bucket>
AWS_ACCESS_KEY_ID=<key>
AWS_SECRET_ACCESS_KEY=<secret>
AWS_REGION=us-east-2
```

Eksisterende filer i volumet migreres ikke automatisk — kopier dem til bøtta før du slår om variabelen.

### 6. Valgfrie funksjonsintegrasjoner

Disse låser opp spesifikke funksjoner og kan alle legges til senere via Railway-dashbordet. Sett dem på **Api**-tjenesten.

| Variabel | Funksjon den aktiverer |
|----------|--------------------|
| `OPENAI_API_KEY` *eller* `OPENROUTER_API_KEY` | AI-assistert søk og innholdsforslag |
| `YOUTUBE_API_KEY` | YouTube-prekensøk og -innbygging |
| `PEXELS_KEY` | Velger for lagerbilder til nettstedsbyggeren |
| `VIMEO_TOKEN` | Vimeo-prekenstøtte |
| `API_BIBLE_KEY` | Bibelversoppslag i leksjoner og innhold |
| `YOUVERSION_API_KEY` | YouVersion Bibel-integrasjon |
| `WEB_PUSH_PUBLIC_KEY` + `WEB_PUSH_PRIVATE_KEY` | Push-varsler i nettleser (generer et VAPID-nøkkelpar) |
| `HUBSPOT_KEY` | Valgfri CRM-synkronisering for nye registreringer |

## Oppdatering

Hver tjeneste er koblet til sitt respektive GitHub-repositorium. Push til `main` på `ChurchApps/Api`, `ChurchApps/B1Admin`, eller `ChurchApps/B1App` utløser automatiske ny-distribusjoner.

For å låse til en bestemt versjon, endre **Branch**-innstillingen på hver tjeneste til en tag eller utgivelsesgren. Dette er det anbefalte oppsettet for produksjon — automatisk distribusjon fra `main` betyr at du arver eventuelt pågående arbeid.

## Kostnader

Realistiske spenn for en liten kirke (under 200 medlemmer, lav trafikk):

| Komponent | Omtrentlig månedlig kostnad |
|-----------|---------------------|
| Railway-grunnpris | 5 dollar |
| MySQL-utvidelse | 5 dollar + ~1 dollar lagring |
| 3 nettjenester, beregningskraft | 3–10 dollar samlet |
| 1 GB volum | 0,25 dollar |
| **Totalt** | **~15–25 dollar/måned** |

Kostnadene skalerer lineært med trafikk, bildeopplastinger og databasestørrelse. Railway viser sanntidsforbruk i prosjektets **Usage**-fane — sett utgiftsgrenser der for å begrense eksponeringen din.

## Feilsøking

| Symptom | Sannsynlig årsak | Løsning |
|---------|--------------|-----|
| Bygging feiler med `EBUSY: rmdir '/app/node_modules/.cache'` | Nixpacks cache-monteringskonflikt | Sett `NIXPACKS_NO_CACHE=true` på den berørte tjenesten |
| Bygging feiler på B1Admin med `Missing: @types/...` | Usynkronisert `package-lock.json` | Hent siste `main` |
| Api-distribusjon henger på «Deploying» | Helsesjekk feiler — `/health` returnerer ikke 200 | Se distribusjonsloggene; vanligvis en manglende påkrevd miljøvariabel |
| B1Admin viser «check your email», men ingen e-post kommer fram | `MAIL_SYSTEM=SMTP` satt, men legitimasjon mangler/feil | Fiks legitimasjonen, eller fjern `MAIL_SYSTEM` for å deaktivere e-post |
| Innlogging omdirigerer til `api.churchapps.org` | `REACT_APP_STAGE` er `prod` | Sett `REACT_APP_STAGE=custom` på B1Admin-tjenesten |
| Subdomene-kirker viser alle samme innhold | `REACT_APP_B1_WEBSITE_URL` inneholder ikke `{subdomain}`-symbolet | Sett den til f.eks. `https://{subdomain}.yourchurch.org` |
| Tilpasset domene viser «Application not found» | DNS har ikke forplantet seg ennå, eller Railway-sertifikatet venter | Vent 5 minutter; sjekk DNS med `dig admin.yourchurch.org` |

Hvis du støter på noe som ikke står på denne listen, kan du åpne en sak på [github.com/ChurchApps/Api/issues](https://github.com/ChurchApps/Api/issues) med distribusjonsloggene vedlagt.

## Relaterte artikler

- **[Selvhosting med Docker](./docker)** — Samme stack på din egen maskinvare eller VPS
- **[Innledende oppsett](../../getting-started/initial-setup)** — Første skritt etter at kirken din er opprettet
- **[Innledende oppsett av nettsted](../../b1-admin/website/initial-setup)** — Konfigurer kirkens offentlige nettsted
- **[Innstillinger for giving](../../b1-admin/donations/online-giving-setup)** — Koble til Stripe eller PayPal
- **[Lokalt API-oppsett](../api/local-setup)** — Kjøre stacken lokalt for utvikling
- **[API-distribusjon (AWS)](./apis)** — Hvordan den offisielle ChurchApps-SaaS-en distribueres
