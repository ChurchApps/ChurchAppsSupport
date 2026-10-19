---
title: "Selvhosting med Docker"
---

# Selvhosting med Docker

<div class="article-intro">

Kjør din egen private instans av B1 Admin, B1-medlemsportalen og nettstedet, API-et og en MySQL-database på hvilken som helst maskin med Docker — en hjemmeserver, en liten VPS eller en lokal boks. Én kommando installerer det, én kommando oppgraderer det, og hver oppgradering tar en sikkerhetskopi først. Hvis du helst ikke vil administrere en server i det hele tatt, se [Selvhosting på Railway](./railway-template) for det administrerte alternativet.

</div>

## Hurtigstart

<div class="prereqs">
<h4>Hva du trenger</h4>

- En Linux-maskin (eller macOS / Windows med WSL eller Git Bash — `b1`-hjelperen er et bash-skript) med [Docker Engine](https://docs.docker.com/engine/install/) og Compose v2 (inkludert i Docker Desktop)
- Omtrent 2 GB RAM og 5 GB diskplass
- For et offentlig nettsted: et domenenavn som peker til maskinen, med porter 80 og 443 tilgjengelige

</div>

```bash
curl -fsSL https://raw.githubusercontent.com/ChurchApps/B1Admin/main/deploy/install.sh | bash -s -- --domain church.example.org
```

Utelat `--domain` for å kjøre på `http://localhost`. Installasjonsprogrammet oppretter en `b1church`-mappe, skriver en `.env` med nylig genererte hemmeligheter, henter de ferdigbygde imagene fra GitHub Container Registry og venter til API-et melder at det er friskt. Ingenting bygges på din maskin, så første oppstart tar et minutt eller to.

Når det er ferdig:

1. Åpne **https://church.example.org/admin** (eller http://localhost/admin) og klikk **Registrer**. Den første kontoen blir automatisk serveradministrator.
2. Følg veiledningen i appen for å opprette din første kirke. Dens nettsted og medlemsportal er live på **https://church.example.org/** så snart den finnes.

Alt kjører bak ett domene:

| Sti | Tjeneste |
|-----|----------|
| `/` | B1App — kirkens nettsted og medlemsportal |
| `/admin` | B1Admin — dashbord for ansatte |
| `/api` | API, opplastede filer og websocket for direkteoppdateringer |

HTTPS er automatisk: den medfølgende [Caddy](https://caddyserver.com/)-proxyen henter og fornyer et Let's Encrypt-sertifikat for domenet i `.env`. Bare porter 80 og 443 er eksponert; databasen er bare tilgjengelig fra innsiden av Docker-nettverket.

## `b1`-kommandoen

Installasjonsprogrammet legger et `deploy/b1`-skript ved siden av `docker-compose.yml`. Det er det eneste du trenger til daglig bruk:

| Kommando | Hva den gjør |
|----------|--------------|
| `./deploy/b1 upgrade` | Henter gjeldende utgivelse, tar en sikkerhetskopi, starter på nytt og bekrefter at API-et er friskt |
| `./deploy/b1 upgrade 2026.10.1` | Samme, men låst til en bestemt utgivelse |
| `./deploy/b1 backup` | Tar et øyeblikksbilde av databasen, opplastede filer og `.env` i `backups/<timestamp>/` |
| `./deploy/b1 restore backups/<timestamp>` | Gjenoppretter et øyeblikksbilde (API-et stopper mens det kjører) |
| `./deploy/b1 rollback` | Gjenoppretter den nyeste sikkerhetskopien, inkludert utgivelsen den ble tatt på |
| `./deploy/b1 status` | Installert versjon og helsestatus for containere |
| `./deploy/b1 logs api` | Følger loggene til en tjeneste |

Utgivelser publiseres som én versjonert pakke, slik at de tre imagene alltid samsvarer. `B1_VERSION=stable` i `.env` følger siste utgivelse; sett en bestemt versjon for å låse den. Utgivelsesnotater ligger under [B1Admin-utgivelser](https://github.com/ChurchApps/B1Admin/releases).

## Konfigurasjon

Alle innstillinger ligger i `.env` ved siden av `docker-compose.yml`. Installasjonsprogrammet fyller ut de nødvendige:

```bash
B1_VERSION=stable
DOMAIN=church.example.org
SITE_ADDRESS=church.example.org          # what Caddy serves; http://localhost for a local install
PUBLIC_URL=https://church.example.org    # how browsers and emails reach the site
MYSQL_ROOT_PASSWORD=…                    # generated
JWT_SECRET=…                             # generated
ENCRYPTION_KEY=…                         # generated, exactly 32 characters — never change it after storing credentials

# Email — strongly recommended; without it members can't reset their own passwords
MAIL_SYSTEM=SMTP
SMTP_HOST=smtp.resend.com
SMTP_USER=resend
SMTP_PASS=re_xxxxxxxxx
SMTP_SECURE=false
SUPPORT_EMAIL=noreply@church.example.org
```

Etter å ha redigert `.env`, bruk endringene med `docker compose up -d`. Nettappene finner ut hvilket API de skal snakke med ut fra adressen i nettleseren, så hvis du bytter domene trenger du bare å oppdatere `SITE_ADDRESS` og `PUBLIC_URL` og starte på nytt — ingen ny bygging.

:::warning
Ta vare på `.env`. `ENCRYPTION_KEY` beskytter lagrede legitimasjoner for betalingsgateway og lagring; en sikkerhetskopi uten den kan ikke dekryptere dem. `./deploy/b1 backup` inkluderer en kopi av den av den grunn.
:::

### Flytte til et domene senere

Hvis du installerte på `localhost` og senere vil gjøre den offentlig: pek DNS mot maskinen, sett `DOMAIN`, `SITE_ADDRESS` (det rene domenet) og `PUBLIC_URL` (`https://` + domene) i `.env`, og kjør deretter `docker compose up -d`. Caddy henter et sertifikat ved den første forespørselen.

## E-post, gaver, flere nettsteder og integrasjoner

Disse fungerer akkurat som på Railway — de samme miljøvariablene, satt i `.env` i stedet for Railway-dashbordet:

- **[E-post / SMTP](./railway-template#1-email-highly-recommended)** — veiledninger for leverandørene Resend, Brevo og Gmail
- **[Flere nettsteder](./railway-template#3-multi-site-multiple-churches-on-one-instance)** — ubegrenset antall kirker per instans. `/` viser kirken hvis slug er `DEFAULT_CHURCH_SLUG` (den første kirken er `church`); pek ekstra domener mot boksen og koble dem under **Innstillinger → Domener** i B1Admin
- **[Online giving](./railway-template#4-online-giving-stripe--paypal)** — konfigureres per kirke i admin-grensesnittet
- **[Valgfrie integrasjoner](./railway-template#6-optional-feature-integrations)** — `OPENAI_API_KEY`, `YOUTUBE_API_KEY`, `PEXELS_KEY`, `VIMEO_TOKEN`, `API_BIBLE_KEY`, `WEB_PUSH_*`, `GOOGLE_RECAPTCHA_SECRET_KEY`

Invitasjoner og annen e-post sendt av kirken er aktivert automatisk på en selvhostet instans (den administrerte tjenesten krever manuell gjennomgang for disse for å beskytte avsenderens omdømme).

## Data, sikkerhetskopier og fillagring

Tre navngitte Docker-volumer holder all tilstand:

| Volum | Innhold |
|-------|---------|
| `b1church_mysql-data` | Alle databaseskjemaer |
| `b1church_api-content` | Opplastede filer — bilder, dokumenter, nettstedsbilder |
| `b1church_caddy-data` | TLS-sertifikater |

`./deploy/b1 backup` skriver et konsistent øyeblikksbilde av de to første pluss `.env` til `backups/<timestamp>/`. Planlegg det med cron og kopier mappen til et sted utenfor maskinen:

```
0 3 * * * cd /opt/b1church && ./deploy/b1 backup >> backups/backup.log 2>&1
```

For store mediebiblioteker kan du bytte fillagring til S3 — sett `FILE_STORE=S3` pluss `AWS_*`-variablene beskrevet i [Railway-veiledningens seksjon om fillagring](./railway-template#5-file-storage). Databasesikkerhetskopier inkluderer ikke S3-objekter; aktiver versjonering av bøtten der.

## Oppdatering

```bash
./deploy/b1 upgrade
```

I rekkefølge: henter utgivelsen, tar en sikkerhetskopi, gjenskaper containerne, kjører eventuelle ventende databasemigreringer når API-et starter, og venter på API-ets helsesjekk. Hvis noe feiler, stopper den og ber deg kjøre `./deploy/b1 rollback`, som gjenoppretter den sikkerhetskopien og den forrige utgivelsen. Migreringer er kun framover; å rulle tilbake betyr alltid å gjenopprette øyeblikksbildet.

Å oppgradere fra beta-compose-filen (den som bygde images fra kildekode) fungerer på samme måte når du har en `.env`: den brukte `MYSQL_ROOT_PASSWORD=churchapps` som standard, så legg det i `.env` sammen med `PUBLIC_URL` og `SITE_ADDRESS`, erstatt `docker-compose.yml` og `deploy/` med de gjeldende filene, og kjør `./deploy/b1 upgrade`.

## Bygge fra kildekode

Utviklere kan bygge imagene lokalt i stedet for å hente dem:

```bash
docker compose -f docker-compose.yml -f docker-compose.build.yml up -d --build
```

`API_CONTEXT` og `B1APP_CONTEXT` i `.env` peker byggene mot lokale kopier (f.eks. `../Api`) eller en git-referanse.

## Feilsøking

| Symptom | Sannsynlig årsak | Løsning |
|---------|------------------|---------|
| `api`-containeren starter på nytt i en løkke | migreringsfeil eller feil databasepassord | `./deploy/b1 logs api` — migreringen skriver ut hvilken modul som feilet |
| `api` logger "ENCRYPTION_KEY must be exactly 32 characters" | manuelt redigert eller avkortet nøkkel i `.env` | gjenopprett den opprinnelige 32-tegns nøkkelen (generer en ny bare hvis ingen legitimasjoner er lagret ennå) |
| Nettleseren viser en sertifikatadvarsel | DNS peker ikke hit ennå, eller port 80/443 er blokkert | fiks DNS / brannmur; Caddy prøver på nytt av seg selv |
| `/` viser et dashbord i stedet for nettstedet | ingen kirke ennå, eller `DEFAULT_CHURCH_SLUG` stemmer ikke | opprett kirken, eller sett slugen under **Innstillinger → Kirke** |
| "Sjekk e-posten din" men ingen e-post kommer | `MAIL_SYSTEM=SMTP` med feil legitimasjon | rett legitimasjonen, eller fjern `MAIL_SYSTEM` for å deaktivere e-post |
| Chat / live-funksjoner er stille | websocket blokkert av en annen proxy foran | socketen ligger på `/api/` over samme port; tillat `Upgrade`-headere |
| `install` nekter: "database volume already exists" | rester fra en tidligere installasjon | `docker compose down -v` for å slette, eller skriv en `.env` og bruk `upgrade` |

Fortsatt fast? Åpne en sak på [github.com/ChurchApps/ChurchAppsSupport/issues](https://github.com/ChurchApps/ChurchAppsSupport/issues) med utdata fra `./deploy/b1 logs`.

## Relaterte artikler

- **[Selvhosting på Railway](./railway-template)** — administrert hostingalternativ, samt de delte veiledningene for konfigurasjon etter distribusjon
- **[Førstegangsoppsett](../../getting-started/initial-setup)** — første steg etter at kirken din er opprettet
- **[Lokalt API-oppsett](../api/local-setup)** — kjøre stacken direkte for utvikling
