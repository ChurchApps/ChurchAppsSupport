---
title: "Self-Hosting med Docker"
description: "Installer en privat B1 Admin, medlemsportal, API og MySQL-stak på din egen maskine med Docker, og opgrader og sikkerhedskopier med b1-kommandoen."
---

# Self-Hosting med Docker

<div class="article-intro">

Kør din egen private instans af B1 Admin, B1-medlemsportalen og hjemmesiden, API'et og en MySQL-database på enhver maskine med Docker — en hjemmeserver, en lille VPS eller en boks on-prem. Én kommando installerer det, én kommando opgraderer det, og hver opgradering tager først en backup. Hvis du helst slet ikke vil administrere en server, se [Self-Hosting på Railway](./railway-template.md) for det administrerede alternativ.

</div>

## Hurtig start

<div class="prereqs">
<h4>Det skal du bruge</h4>

- En Linux-maskine (eller macOS / Windows med WSL eller Git Bash — `b1`-hjælperen er et bash-script) med [Docker Engine](https://docs.docker.com/engine/install/) og Compose v2 (inkluderet i Docker Desktop)
- Cirka 2 GB RAM og 5 GB diskplads
- For et offentligt websted: et domænenavn, der peger på maskinen, med porte 80 og 443 tilgængelige

</div>

```bash
curl -fsSL https://raw.githubusercontent.com/ChurchApps/B1Admin/main/deploy/install.sh | bash -s -- --domain church.example.org
```

Udelad `--domain` for at køre på `http://localhost`. Installationsprogrammet opretter en mappe `b1church`, skriver en `.env` med nyligt genererede hemmeligheder, henter de færdigbyggede images fra GitHub Container Registry og venter, til API'et melder sig som sundt. Intet bygges på din maskine, så den første opstart tager et minut eller to.

Når det er færdigt:

1. Åbn `https://church.example.org/admin` (eller http://localhost/admin) og klik på **Register**. Den første konto bliver automatisk serveradministrator.
2. Følg vejledningen i appen for at oprette din første kirke. Dens hjemmeside og medlemsportal er tilgængelige på `https://church.example.org/`, så snart den er oprettet.

Alt kører bag ét domæne:

| Sti | Tjeneste |
|------|---------|
| `/` | B1App — kirkens hjemmeside og medlemsportal |
| `/admin` | B1Admin — personaleoversigt |
| `/api` | API, uploadede filer og websocket til live-opdateringer |

HTTPS er automatisk: den medfølgende [Caddy](https://caddyserver.com/)-proxy henter og fornyer et Let's Encrypt-certifikat for domænet i `.env`. Kun porte 80 og 443 er åbne; databasen kan kun nås fra det interne Docker-netværk.

## Kommandoen `b1`

Installationsprogrammet efterlader et script `deploy/b1` ved siden af `docker-compose.yml`. Det er det eneste, du har brug for i det daglige:

| Kommando | Hvad den gør |
|---------|--------------|
| `./deploy/b1 upgrade` | Henter den aktuelle udgivelse, tager en backup, genstarter og kontrollerer, at API'et er sundt |
| `./deploy/b1 upgrade 2026.10.1` | Samme, men fastlåst til en bestemt udgivelse |
| `./deploy/b1 backup` | Tager et øjebliksbillede af databasen, uploadede filer og `.env` i `backups/<tidsstempel>/` |
| `./deploy/b1 restore backups/<tidsstempel>` | Gendanner et øjebliksbillede (API'et stoppes, mens det kører) |
| `./deploy/b1 rollback` | Gendanner den nyeste backup, inklusive den udgivelse den blev taget på |
| `./deploy/b1 status` | Installeret version og containernes sundhedstilstand |
| `./deploy/b1 logs api` | Følg logfilerne for en tjeneste løbende |

Udgivelser offentliggøres som ét versioneret bundt, så de tre images altid passer sammen. `B1_VERSION=stable` i `.env` følger den seneste udgivelse; sæt en bestemt version for at fastlåse den. Udgivelsesnoter findes under [B1Admin-udgivelser](https://github.com/ChurchApps/B1Admin/releases).

## Konfiguration

Alle indstillinger ligger i `.env` ved siden af `docker-compose.yml`. Installationsprogrammet udfylder de nødvendige:

```bash
B1_VERSION=stable
DOMAIN=church.example.org
SITE_ADDRESS=church.example.org          # det Caddy serverer; http://localhost ved en lokal installation
PUBLIC_URL=https://church.example.org    # hvordan browsere og e-mails når frem til webstedet
MYSQL_ROOT_PASSWORD=…                    # genereret
JWT_SECRET=…                             # genereret
ENCRYPTION_KEY=…                         # genereret, præcis 32 tegn — ændr den aldrig, når der er gemt legitimationsoplysninger

# E-mail — stærkt anbefalet; uden den kan medlemmer ikke nulstille deres egne adgangskoder
MAIL_SYSTEM=SMTP
SMTP_HOST=smtp.resend.com
SMTP_USER=resend
SMTP_PASS=re_xxxxxxxxx
SMTP_SECURE=false
SUPPORT_EMAIL=noreply@church.example.org
```

Efter at have redigeret `.env`, anvendes ændringerne med `docker compose up -d`. Webapps finder ud af, hvilken API de skal tale med, ud fra adressen i browseren. Hvis du ændrer domænet, skal du derfor kun opdatere `SITE_ADDRESS` og `PUBLIC_URL` og genstarte — ingen ny build er nødvendig.

:::warning
Pas godt på `.env`. `ENCRYPTION_KEY` beskytter gemte legitimationsoplysninger til betalingsgateways og lagring; en backup uden den kan ikke dekryptere dem. `./deploy/b1 backup` indeholder en kopi af nøglen af netop den grund.
:::

### Flytning til et domæne senere

Hvis du installerede på `localhost` og senere vil gøre den offentlig: peg DNS på maskinen, og angiv `DOMAIN`, `SITE_ADDRESS` (det nøgne domæne) og `PUBLIC_URL` (`https://` + domæne) i `.env`. Kør derefter `docker compose up -d`. Caddy henter et certifikat ved den første forespørgsel.

## E-mail, donationer, flere websteder og integrationer

Disse fungerer præcis som på Railway — de samme miljøvariabler, men sat i `.env` i stedet for i Railway-dashboardet:

- **[E-mail / SMTP](./railway-template.md#1-email-highly-recommended)** — vejledninger for Resend, Brevo og Gmail
- **[Flere websteder](./railway-template.md#3-multi-site-multiple-churches-on-one-instance)** — ubegrænset antal kirker pr. instans. `/` viser den kirke, hvis slug er `DEFAULT_CHURCH_SLUG` (den første kirke hedder `church`); peg yderligere domæner mod boksen og tilknyt dem under **Settings → Domains** i B1Admin
- **[Online donationer](./railway-template.md#4-online-giving-stripe--paypal)** — konfigureres pr. kirke i admin-grænsefladen
- **[Valgfrie integrationer](./railway-template.md#6-optional-feature-integrations)** — `OPENAI_API_KEY`, `YOUTUBE_API_KEY`, `PEXELS_KEY`, `VIMEO_TOKEN`, `API_BIBLE_KEY`, `GOOGLE_RECAPTCHA_SECRET_KEY`
- **[Push-notifikationer](#push-notifikationer)** — `WEB_PUSH_*`; installationsprogrammet lader disse være tomme, så push er slået fra, indtil du tilføjer dem

Invitationer og anden e-mail, som kirken sender, aktiveres automatisk på en selvhostet instans. (Den hostede tjeneste kræver manuel gennemgang af disse for at beskytte afsenderens omdømme.)

## Push-notifikationer

Browser- og mobil-webpush forbliver slået fra, indtil serveren har et VAPID-nøglepar. Installationsprogrammet opretter ikke et sådant. Indtil du tilføjer det, viser siden Notifikationer i mobil-webappen, at push ikke er slået til for webstedet.

1. Generer et nøglepar. Dette kræver kun Docker:

   ```bash
   docker run --rm node:lts-alpine npx --yes web-push generate-vapid-keys
   ```

2. Tilføj de to værdier i `.env`. `WEB_PUSH_SUBJECT` er valgfri og er den kontaktadresse, som push-tjenesterne ser:

   ```bash
   WEB_PUSH_PUBLIC_KEY=…
   WEB_PUSH_PRIVATE_KEY=…
   WEB_PUSH_SUBJECT=mailto:admin@example.org
   ```

3. Anvend dem:

   ```bash
   docker compose up -d
   ```

4. For at bekræfte det, åbn **Server Admin → Server Health** i B1Admin. Begge Web Push-nøgler bør vises som konfigureret. Medlemmer kan derefter slå notifikationer til fra mobil-webappen.

:::warning
Behold de samme nøgler, når medlemmerne er tilmeldt. Ændrer du dem, bliver alle eksisterende abonnementer ugyldige, og hver enhed skal registrere sig igen.
:::

## Data, backups og fillagring

Tre navngivne Docker-volumener indeholder al tilstand:

| Volumen | Indhold |
|--------|----------|
| `b1church_mysql-data` | Alle databaseskemaer |
| `b1church_api-content` | Uploadede filer — billeder, dokumenter, billeder til hjemmesiden |
| `b1church_caddy-data` | TLS-certifikater |

`./deploy/b1 backup` skriver et konsistent øjebliksbillede af de to første samt `.env` til `backups/<tidsstempel>/`. Planlæg den med cron, og kopier mappen et andet sted hen, væk fra maskinen:

```
0 3 * * * cd /opt/b1church && ./deploy/b1 backup >> backups/backup.log 2>&1
```

Ved store mediebiblioteker kan du skifte fillagringen til S3 — sæt `FILE_STORE=S3` samt de `AWS_*`-variabler, der beskrives i [afsnittet om fillagring i Railway-vejledningen](./railway-template.md#5-file-storage). Databasebackups indeholder ikke S3-objekter; aktiver versionering på bucket'en dér.

## Opdatering

```bash
./deploy/b1 upgrade
```

I rækkefølge: henter udgivelsen, tager en backup, genopbygger containerne, kører eventuelle ventende databasemigreringer, når API'et starter, og venter på API'ets sundhedstjek. Hvis noget fejler, stopper den og beder dig køre `./deploy/b1 rollback`, som gendanner den backup og den forrige udgivelse. Migreringer går kun fremad; at rulle tilbage betyder altid at gendanne øjebliksbilledet.

Opgradering fra beta-compose-filen (den, der byggede images fra kildekoden) fungerer på samme måde, når du har en `.env`: den brugte som standard `MYSQL_ROOT_PASSWORD=churchapps`, så læg det i `.env` sammen med `PUBLIC_URL` og `SITE_ADDRESS`, erstat `docker-compose.yml` og `deploy/` med de aktuelle filer, og kør `./deploy/b1 upgrade`.

## Bygning fra kildekode

Udviklere kan bygge images lokalt i stedet for at hente dem:

```bash
docker compose -f docker-compose.yml -f docker-compose.build.yml up -d --build
```

`API_CONTEXT` og `B1APP_CONTEXT` i `.env` peger builds på lokale kopier (f.eks. `../Api`) eller en git-reference.

## Fejlfinding

| Symptom | Sandsynlig årsag | Løsning |
|---------|--------------|-----|
| `api`-containeren genstarter i en løkke | migreringsfejl eller forkert databaseadgangskode | `./deploy/b1 logs api` — migreringen viser, hvilket modul der fejlede |
| `api` logger "ENCRYPTION_KEY must be exactly 32 characters" | nøglen i `.env` er redigeret i hånden eller afkortet | gendan den oprindelige 32-tegns nøgle (generer kun en ny, hvis der endnu ikke er gemt legitimationsoplysninger) |
| Browseren viser en certifikatadvarsel | DNS peger ikke herhen endnu, eller port 80/443 er blokeret | ret DNS / firewall; Caddy forsøger automatisk igen |
| `/` viser et dashboard i stedet for hjemmesiden | ingen kirke endnu, eller `DEFAULT_CHURCH_SLUG` stemmer ikke | opret kirken, eller sæt slug'en under **Settings → Church** |
| "Check your email", men ingen e-mail kommer | `MAIL_SYSTEM=SMTP` med forkerte legitimationsoplysninger | ret legitimationsoplysningerne, eller fjern `MAIL_SYSTEM` for at slå e-mail fra |
| Mobil-webappen siger, at push-notifikationer ikke er slået til | ingen VAPID-nøgler på serveren | tilføj dem som beskrevet under [Push-notifikationer](#push-notifikationer) |
| Chat-/live-funktioner er tavse | websocket blokeret af en anden proxy foran | socketen ligger på `/api/` over samme port; tillad `Upgrade`-headere |
| `install` nægter: "database volume already exists" | rester fra en tidligere installation | `docker compose down -v` for at slette alt, eller skriv en `.env` og brug `upgrade` |

Stadig kørt fast? Opret en issue på [github.com/ChurchApps/ChurchAppsSupport/issues](https://github.com/ChurchApps/ChurchAppsSupport/issues) med outputtet fra `./deploy/b1 logs`.

## Relaterede artikler

- **[Self-Hosting på Railway](./railway-template.md)** — alternativ administreret hosting samt de fælles vejledninger til konfiguration efter udrulning
- **[Indledende opsætning](../../getting-started/initial-setup.md)** — første skridt, efter din kirke er oprettet
- **[Lokal API-opsætning](../api/local-setup.md)** — kørsel af stakken direkte til udvikling
