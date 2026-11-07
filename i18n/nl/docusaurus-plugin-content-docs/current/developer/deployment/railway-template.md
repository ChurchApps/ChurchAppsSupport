---
title: "Zelf hosten op Railway"
---

# Zelf hosten op Railway

<div class="article-intro">

ChurchApps publiceert een sjabloon van [Railway](https://railway.com) waarmee je met één klik je eigen privé-instantie van B1 Admin, het B1-ledenportaal, de API en een MySQL-database krijgt. Alles draait op infrastructuur die je zelf bezit en rechtstreeks betaalt. Deze handleiding brengt je in ongeveer 15 minuten online en loopt daarna de configuratie na de deployment door die de meeste kerken uiteindelijk willen instellen.

</div>

## Snel starten

[![Deploy op Railway](https://railway.com/button.svg)](https://railway.com/deploy/b1-template)

1. Klik op de knop **Deploy on Railway** hierboven.
2. Meld je aan bij Railway (of maak een gratis account aan) en voeg een betaalmethode toe.
3. Klik op **Deploy** zonder iets te wijzigen. Elke variabele heeft een zinvolle standaardwaarde.
4. Wacht 5 tot 10 minuten tot de vier services groen worden.
5. Open de URL van de service **B1Admin**, klik op **Registreren** en maak je account aan. Het eerste account wordt automatisch een serverbeheerder.
6. Volg de meldingen in de app om je eerste kerk aan te maken.

Dat is alles. Je hebt nu een volledig werkende ChurchApps-instantie. Alles hieronder is optioneel.

:::tip
De deployment is momenteel in **beta**. Als je iets tegenkomt wat niet in de documentatie staat, open dan een issue op [github.com/ChurchApps/Api/issues](https://github.com/ChurchApps/Api/issues) en voeg de deploymentlogboeken toe.
:::

<div class="prereqs">
<h4>Wat je nodig hebt</h4>

- Een gratis [Railway](https://railway.com)-account
- Een creditcard die bij Railway is opgeslagen (ongeveer $15–25 per maand voor een kleine gemeente; zie [Kosten](#costs))
- Ongeveer 15 minuten voor de eerste deployment
- *Optioneel, maar later sterk aanbevolen:* SMTP-gegevens en een eigen domein

</div>

## Wat er wordt geïnstalleerd

Het sjabloon zet vier services op in één Railway-project:

| Service | Doel | URL na deployment |
|---------|------|-------------------|
| **MySQL** | Slaat alle gegevens op (één instantie, meerdere schema's) | alleen intern |
| **Api** | Backend voor leden, content, giving, aanwezigheid enzovoort | `https://api-<id>.up.railway.app` |
| **B1Admin** | Webapp voor medewerkers en beheerders | `https://b1admin-<id>.up.railway.app` |
| **B1App** | Webapp voor leden en de website van de kerk | `https://b1app-<id>.up.railway.app` |

De databaseschema's worden automatisch aangemaakt bij de eerste start, via de startmigratie van de API.

## Eerste configuratie

Nu je online bent, volgen hier de dingen die de meeste kerken hierna instellen, ongeveer in volgorde van belangrijkheid.

### 1. E-mail (sterk aanbevolen)

Zonder e-mail kunnen leden zich nog steeds registreren en het systeem gebruiken, maar **ze kunnen geen vergeten wachtwoorden opnieuw instellen**. Een beheerder moet dat dan voor hen doen. SMTP instellen duurt ongeveer 5 minuten.

Open in het Railway-dashboard de service **Api** → **Variables** en voeg toe:

```
MAIL_SYSTEM=SMTP
SMTP_HOST=<de host van je provider>
SMTP_USER=<je gebruikersnaam>
SMTP_PASS=<je wachtwoord of API-sleutel>
SMTP_SECURE=false
SUPPORT_EMAIL=noreply@uwkerk.org
```

Drie providers die de moeite waard zijn om te kennen:

#### Resend: eenvoudigste gratis optie (100 e-mails per dag)

1. Meld je aan op [resend.com](https://resend.com).
2. Verifieer een verzenddomein (of gebruik de testafzender `onboarding@resend.dev` om te beginnen).
3. Maak een API-sleutel aan.
4. Stel in: `SMTP_HOST=smtp.resend.com`, `SMTP_USER=resend`, `SMTP_PASS=re_xxxxxxxxx`.

#### Gmail: gratis voor persoonlijk gebruik (ongeveer 500 per dag)

1. Schakel tweestapsverificatie in voor het Google-account.
2. Maak een [app-wachtwoord](https://myaccount.google.com/apppasswords) aan.
3. Stel in: `SMTP_HOST=smtp.gmail.com`, `SMTP_USER=jouw-adres@gmail.com`, `SMTP_PASS=<het app-wachtwoord van 16 tekens>`.

#### AWS SES: goedkoopst op schaal

1. Verifieer een verzenddomein in AWS.
2. Haal het account uit de SES-sandbox als je wilt verzenden naar niet-geverifieerde adressen.
3. Maak SMTP-gegevens aan onder **SES → SMTP Settings → Create credentials**.
4. Stel in: `SMTP_HOST=email-smtp.us-east-2.amazonaws.com`, `SMTP_USER=AKIA...`, `SMTP_PASS=<het SES SMTP-wachtwoord>`.

Nadat je de variabelen hebt opgeslagen, wordt de service Api automatisch opnieuw gedeployd. Test dit door op een testaccount een wachtwoord-reset te starten.

:::warning
Als je `MAIL_SYSTEM=SMTP` instelt met onjuiste gegevens, lijkt de registratie te slagen, maar komt de verificatie-e-mail nooit aan. Corrigeer dan de gegevens of verwijder `MAIL_SYSTEM` zodat het systeem terugvalt op de modus zonder e-mail.
:::

### 2. Eigen domeinen

De standaard-URL's `*.up.railway.app` werken, maar de meeste kerken willen een eigen domein.

Doe dit voor elke webservice (B1Admin en B1App):

1. Open de service in Railway → **Settings** → **Networking**.
2. Klik op **+ Custom Domain** en voer de hostnaam in:
   - `admin.uwkerk.org` voor B1Admin
   - `app.uwkerk.org` (of `www`) voor B1App
3. Voeg het CNAME-record dat Railway toont toe bij je DNS-provider.
4. Wacht enkele minuten tot de DNS is doorgevoerd. Railway vraagt het TLS-certificaat automatisch aan.

Werk daarna de variabelen van de service **Api** bij, zodat links in e-mails de nieuwe domeinen gebruiken:

```
B1ADMIN_ROOT=https://admin.uwkerk.org
```

En op de service **B1Admin**:

```
REACT_APP_API_BASE=https://api.uwkerk.org   (als je ook een eigen API-domein instelt)
REACT_APP_B1_WEBSITE_URL=https://{subdomain}.uwkerk.org
```

Het token `{subdomain}` is letterlijk bedoeld. Het wordt tijdens het draaien vervangen door het subdomein van elke kerk (zie Meerdere locaties hieronder).

### 3. Meerdere locaties (meerdere kerken op één instantie)

ChurchApps is van oorsprong multi-tenant. Eén deployment kan een willekeurig aantal kerken hosten, elk met eigen mensen, groepen en website. Nieuwe kerken worden volledig via de beheerinterface toegevoegd. Er zijn geen wijzigingen aan de infrastructuur nodig.

#### Extra kerken toevoegen

1. Ga in **B1 Admin** naar **Settings → Manage Church → Switch Church → Create New**.
2. Elke kerk heeft een unieke **subdomeinslug** (bijvoorbeeld `eersterk`, `genadegemeente`).
3. De nieuwe kerk krijgt eigen gegevens, leden, website en giving-instellingen, volledig gescheiden van andere kerken op dezelfde instantie.

#### Elke kerk naar een eigen URL routeren

Er zijn twee manieren om kerken publiek beschikbaar te maken:

| Patroon | Voorbeeld | Instelling |
|---------|-----------|------------|
| **Op pad gebaseerd** (werkt direct) | `app.uwkerk.org/eersterk` | Geen extra instelling |
| **Op subdomein gebaseerd** (schonere URL's) | `eersterk.uwkerk.org` | Wildcard-DNS + wildcard-domein |

Voor routering op **subdomein** in Railway:

1. Maak bij je DNS-provider een wildcard-CNAME aan: `*.uwkerk.org → <b1app Railway-doel>`.
2. Voeg in Railway, bij de service B1App → **Settings → Networking**, `*.uwkerk.org` toe als eigen domein.
3. Stel op de service **B1Admin** in: `REACT_APP_B1_WEBSITE_URL=https://{subdomain}.uwkerk.org`.

Na de herdeployment wordt de site van elke kerk automatisch aangeboden op `<hun-subdomein>.uwkerk.org`.

:::info
Wildcard-domeinen vereisen een betaald Railway-abonnement. Routering op pad werkt op elk abonnement en is functioneel identiek. Alleen de URL is minder mooi.
:::

### 4. Online giving (Stripe / PayPal)

Giving wordt **per kerk ingesteld in de beheerinterface**, niet via omgevingsvariabelen. Zo kan elke kerk een eigen merchantaccount gebruiken.

1. Haal ontwikkelaarsgegevens op bij [Stripe](https://dashboard.stripe.com/) (Developers → API keys) of [PayPal](https://developer.paypal.com/) (My Apps & Credentials).
2. Ga in B1 Admin naar **Settings → Giving Settings**.
3. Kies je provider, plak de publieke en geheime sleutels en stel de kostenverwerking in.
4. Voeg eventueel `GOOGLE_RECAPTCHA_SECRET_KEY` toe aan de service **Api** in Railway om openbare donatieformulieren tegen bots te beschermen.

### 5. Bestandsopslag

Het sjabloon zet een **persistent volume van 1 GB** klaar, gekoppeld aan de service Api, voor ledenfoto's, preekbestanden en geüploade documenten.

Om het te vergroten: open de service Api → **Volumes** → pas de schuif voor de grootte aan.

Voor grotere installaties (100+ GB of veel gelijktijdige uploads) schakel je over naar S3 door deze instellingen op de service **Api** te zetten:

```
FILE_STORE=S3
AWS_S3_BUCKET=<je-bucket>
AWS_ACCESS_KEY_ID=<sleutel>
AWS_SECRET_ACCESS_KEY=<geheim>
AWS_REGION=us-east-2
```

Bestaande bestanden in het volume worden niet automatisch gemigreerd. Kopieer ze naar de bucket voordat je de variabele omzet.

### 6. Optionele functie-integraties

Deze activeren specifieke functies en kunnen later allemaal via het Railway-dashboard worden toegevoegd. Stel ze in op de service **Api**.

| Variabele | Functie die het activeert |
|-----------|---------------------------|
| `OPENAI_API_KEY` *of* `OPENROUTER_API_KEY` | AI-ondersteunde zoekopdrachten en contentsuggesties |
| `YOUTUBE_API_KEY` | Zoeken naar en insluiten van preken op YouTube |
| `PEXELS_KEY` | Keuze van stockafbeeldingen voor de websitebouwer |
| `VIMEO_TOKEN` | Ondersteuning voor preken op Vimeo |
| `API_BIBLE_KEY` | Opzoeken van bijbelverzen in lessen en content |
| `YOUVERSION_API_KEY` | Integratie met YouVersion-bijbel |
| `WEB_PUSH_PUBLIC_KEY` + `WEB_PUSH_PRIVATE_KEY` | Pushmeldingen in de browser ([genereer een VAPID-sleutelpaar](./docker#push-notifications)) |
| `HUBSPOT_KEY` | Optionele CRM-synchronisatie voor nieuwe registraties |

## Bijwerken

Elke service is gekoppeld aan de bijbehorende GitHub-repository. Pushes naar `main` in `ChurchApps/Api`, `ChurchApps/B1Admin` of `ChurchApps/B1App` starten automatisch een nieuwe deployment.

Om een specifieke versie vast te zetten, wijzig je de instelling **Branch** van elke service naar een tag of releasebranch. Dit is de aanbevolen opzet voor productie. Automatisch deployen vanaf `main` betekent dat je ook werk in uitvoering meeneemt.

## Kosten

Praktijkbedragen voor een kleine kerk (minder dan 200 leden, weinig verkeer):

| Onderdeel | Ongeveer kosten per maand |
|-----------|---------------------------|
| Railway-basis | $5 |
| MySQL-plugin | $5 + ongeveer $1 opslag |
| Rekenkracht voor 3 webservices | $3–10 samen |
| Volume van 1 GB | $0,25 |
| **Totaal** | **ongeveer $15–25 per maand** |

De kosten stijgen naarmate er meer verkeer, foto-uploads en een grotere database zijn. Railway toont het actuele gebruik op het tabblad **Usage** van het project. Stel daar spendinglimieten in om je uitgaven te beperken.

## Probleemoplossing

| Symptoom | Waarschijnlijke oorzaak | Oplossing |
|----------|-------------------------|-----------|
| Build mislukt met `EBUSY: rmdir '/app/node_modules/.cache'` | Conflict met de Nixpacks-cache | Zet `NIXPACKS_NO_CACHE=true` op de betreffende service |
| Build mislukt op B1Admin met `Missing: @types/...` | `package-lock.json` is niet meer synchroon | Haal de laatste versie van `main` op |
| Deployment van Api blijft hangen bij "Deploying" | Healthcheck mislukt: `/health` geeft geen 200 terug | Bekijk de deploymentlogboeken. Meestal ontbreekt een verplichte omgevingsvariabele |
| B1Admin toont "check your email", maar er komt geen e-mail | `MAIL_SYSTEM=SMTP` is ingesteld, maar de gegevens ontbreken of zijn onjuist | Corrigeer de gegevens of verwijder `MAIL_SYSTEM` om e-mail uit te schakelen |
| Inloggen leidt naar `api.churchapps.org` | `REACT_APP_STAGE` is `prod` | Zet `REACT_APP_STAGE=custom` op de service B1Admin |
| Alle kerken met een subdomein tonen dezelfde content | `REACT_APP_B1_WEBSITE_URL` bevat het token `{subdomain}` niet | Stel het in op bijvoorbeeld `https://{subdomain}.uwkerk.org` |
| Eigen domein toont "Application not found" | DNS is nog niet doorgevoerd of het Railway-certificaat is nog in behandeling | Wacht 5 minuten en controleer de DNS met `dig admin.uwkerk.org` |

Staat je probleem niet in deze lijst? Open dan een issue op [github.com/ChurchApps/Api/issues](https://github.com/ChurchApps/Api/issues) en voeg de deploymentlogboeken toe.

## Gerelateerde artikelen

- **[Zelf hosten met Docker](./docker)**: dezelfde stack op je eigen hardware of VPS
- **[Eerste instellingen](../../getting-started/initial-setup)**: eerste stappen nadat je kerk is aangemaakt
- **[Eerste websiteconfiguratie](../../b1-admin/website/initial-setup)**: je openbare site van de kerk instellen
- **[Giving-instellingen](../../b1-admin/donations/online-giving-setup)**: Stripe of PayPal koppelen
- **[Lokale API-installatie](../api/local-setup)**: de stack lokaal draaien voor ontwikkeling
- **[API-deployment (AWS)](./apis)**: hoe de officiële ChurchApps-SaaS wordt gedeployd
