---
title: "Selvhosting med Docker"
description: "Installer en privat B1 Admin, medlemsportal, API og MySQL-stakk på egen maskin med Docker, og oppgrader og sikkerhetskopier den med b1-kommandoen."
---

# Selvhosting med Docker

<div class="article-intro">

Kjør din egen private instans av B1 Admin, B1-medlemsportalen og nettstedet, API-et og en MySQL-database på en hvilken som helst maskin med Docker — en hjemmeserver, en liten VPS eller en lokal boks. Én kommando installerer den, én kommando oppgraderer den, og hver oppgradering tar først en sikkerhetskopi. Hvis du heller ikke vil drifte en server i det hele tatt, se [Selvhosting på Railway](./railway-template.md) for det administrerte alternativet.

</div>

## Hurtigstart

<div class="prereqs">
<h4>Hva du trenger</h4>

- En Linux-maskin (eller macOS / Windows med WSL eller Git Bash — `b1`-hjelperen er et bash-skript) med [Docker Engine](https://docs.docker.com/engine/install/) og Compose v2 (inkludert i Docker Desktop)
- Omtrent 2 GB RAM og 5 GB diskplass
- For et offentlig nettsted: et domenenavn peker mot maskinen, med port 80 og 443 tilgjengelige

</div>

```bash
curl -fsSL https://raw.githubusercontent.com/ChurchApps/B1Admin/main/deploy/install.sh | bash -s -- --domain church.example.org
```

Utelat `--domain` for å kjøre på `http://localhost`. Installasjonsprogrammet oppretter en mappe `b1church`, skriver en `.env` med nyopprettede hemmeligheter, henter de ferdigbygde imagene fra GitHub Container Registry, og venter til API-et melder helse. Ingenting bygges på maskinen din, så første oppstart tar et minutt eller to.

Når det er ferdig:

1. Åpne **https://church.example.org/admin** (eller http://localhost/admin) og klikk **Register**. Den første kontoen blir automatisk serveradministrator.
2. Følg de innebygde veiledningene for å opprette din første kirke. Dens nettsted og medlemsportal er live på **https://church.example.org/** så snart den finnes.

Alt kjører bak ett domene:

| Sti | Tjeneste |
|------|----------|
| `/` | B1App — kirkens nettsted og medlemsportal |
| `/admin` | B1Admin — personalets dashbord |
| `/api` | API, opplastede filer og websocket for direkteoppdateringer |

HTTPS er automatisk: den medfølgende [Caddy](https://caddyserver.com/)-proxyen henter og fornyer et Let's Encrypt-sertifikat for domenet i `.env`. Bare port 80 og 443 er eksponert; databasen kan nås fra innsiden av Docker-nettverket.

## `b1`-kommandoen

Installasjonsprogrammet legger et skript `deploy/b1` ved siden av `docker-compose.yml`. Det er det eneste du trenger i daglig bruk:

| Kommando | Hva den gjør |
|---------|--------------|
| `./deploy/b1 upgrade` | Hent gjeldende utgivelse, ta en sikkerhetskopi, start på nytt, og bekreft at API-et er friskt |
| `./deploy/b1 upgrade 2026.10.1` | Samme, men låst til en bestemt utgivelse |
| `./deploy/b1 backup` | Ta et øyeblikksbilde av databasen, opplastede filer og `.env` i `backups/<tidsstempel>/` |
| `./deploy/b1 restore backups/<tidsstempel>` | Legg et øyeblikksbilde tilbake (API-et stoppes mens den kjører) |
| `./deploy/b1 rollback` | Gjenopprett den nyeste sikkerhetskopien, inkludert utgivelsen den ble tatt på |
| `./deploy/b1 status` | Installert versjon og helsetilstand for containerne |
| `./deploy/b1 logs api` | Følg en tjenestes logger |

Utgivelser publiseres som ett versjonert knippe slik at de tre imagene alltid samsvarer. `B1_VERSION=stable` i `.env` følger den nyeste utgivelsen; sett en bestemt versjon for å låse den. Utgivelsesnotater ligger under [B1Admin-utgivelser](https://github.com/ChurchApps/B1Admin/releases).

## Konfigurasjon

Alle innstillinger ligger i `.env` ved siden av `docker-compose.yml`. Installasjonsprogrammet fyller inn de obligatoriske:

```bash
B1_VERSION=stable
DOMAIN=church.example.org
SITE_ADDRESS=church.example.org          # det Caddy serverer; http://localhost for en lokal installasjon
PUBLIC_URL=https://church.example.org    # hvordan nettlesere og e-poster når nettstedet
MYSQL_ROOT_PASSWORD=…                    # generert
JWT_SECRET=…                             # generert
ENCRYPTION_KEY=…                         # generert, nøyaktig 32 tegn — endre den aldri etter at legitimasjon er lagret

# E-post — sterkt anbefalt; uten den kan ikke medlemmer tilbakestille egne passord
MAIL_SYSTEM=SMTP
SMTP_HOST=smtp.resend.com
SMTP_USER=resend
SMTP_PASS=re_xxxxxxxxx
SMTP_SECURE=false
SUPPORT_EMAIL=noreply@church.example.org
```

Etter at du har redigert `.env`, bruk den med `docker compose up -d`. Nettappene finner ut hvilket API de skal snakke med ut fra adressen i nettleseren, så når du bytter domene holder det å oppdatere `SITE_ADDRESS` og `PUBLIC_URL` og starte på nytt — ingen ombygging.

:::warning
Ta vare på `.env`. `ENCRYPTION_KEY` beskytter lagrede legitimasjoner for betalingsgatewayer og lagring; en sikkerhetskopi uten den kan ikke dekryptere dem. `./deploy/b1 backup` inkluderer en kopi av nettopp den grunnen.
:::

### Flytte til et domene senere

Hvis du installerte på `localhost` og senere vil ha den offentlig: pek DNS mot maskinen, sett `DOMAIN`, `SITE_ADDRESS` (det rene domenet) og `PUBLIC_URL` (`https://` + domene) i `.env`, og kjør deretter `docker compose up -d`. Caddy henter et sertifikat ved første forespørsel.

## E-post, gaver, flere nettsteder og integrasjoner

Disse fungerer nøyaktig som på Railway — de samme miljøvariablene, satt i `.env` i stedet for Railway-dashbordet:

- **[E-post / SMTP](./railway-template.md#1-email-highly-recommended)** — leverandørgjennomganger for Resend, Brevo og Gmail
- **[Flere nettsteder](./railway-template.md#3-multi-site-multiple-churches-on-one-instance)** — ubegrenset antall kirker per instans. `/` serverer kirken hvis slug er `DEFAULT_CHURCH_SLUG` (den første kirken er `church`); pek ekstra domener mot boksen og koble dem under **Settings → Domains** i B1Admin
- **[Nettbasert giving](./railway-template.md#4-online-giving-stripe--paypal)** — konfigureres per kirke i admin-grensesnittet
- **[Valgfrie integrasjoner](./railway-template.md#6-optional-feature-integrations)** — `OPENAI_API_KEY`, `YOUTUBE_API_KEY`, `PEXELS_KEY`, `VIMEO_TOKEN`, `API_BIBLE_KEY`, `GOOGLE_RECAPTCHA_SECRET_KEY`
- **[Push-varsler](#push-notifications)** — `WEB_PUSH_*`; installasjonsprogrammet lar disse stå tomme, så push er av til du legger dem til

Invitasjoner og annen e-post sendt av kirken aktiveres automatisk på en selvhostet instans (den hostede tjenesten låser disse bak en manuell gjennomgang for å beskytte avsenderomdømmet).

## Push-varsler {#push-notifications}

Nettlesere- og mobil-webpush er av til serveren har et VAPID-nøkkelpar. Installasjonsprogrammet lager ikke et. Helt til du legger det til, sier varslingssiden i mobilwebappen at push ikke er slått på for nettstedet.

1. Generer et nøkkelpar. Dette krever bare Docker:

   ```bash
   docker run --rm node:lts-alpine npx --yes web-push generate-vapid-keys
   ```

2. Legg de to verdiene til i `.env`. `WEB_PUSH_SUBJECT` er valgfri, og er kontaktadressen push-tjenestene ser:

   ```bash
   WEB_PUSH_PUBLIC_KEY=…
   WEB_PUSH_PRIVATE_KEY=…
   WEB_PUSH_SUBJECT=mailto:admin@example.org
   ```

3. Bruk dem:

   ```bash
   docker compose up -d
   ```

4. For å bekrefte, åpne **Server Admin → Server Health** i B1Admin. Begge Web Push-nøklene skal vises som konfigurert. Medlemmer kan deretter slå på varsler fra mobilwebappen.

:::warning
Behold de samme nøklene når medlemmer først har registrert seg. Å endre dem ugyldiggjør hvert eneste abonnement, og hver enhet må registrere seg på nytt.
:::

## Data, sikkerhetskopier og fillagring

Tre navngitte Docker-volumer holder all tilstand:

| Volum | Innhold |
|--------|----------|
| `b1church_mysql-data` | Alle databaseskjemaer |
| `b1church_api-content` | Opplastede filer — bilder, dokumenter, nettstedbilder |
| `b1church_caddy-data` | TLS-sertifikater |

`./deploy/b1 backup` skriver et konsistent øyeblikksbilde av de to første pluss `.env` til `backups/<tidsstempel>/`. Planlegg det med cron og kopier mappen til et sted utenfor maskinen:

```
0 3 * * * cd /opt/b1church && ./deploy/b1 backup >> backups/backup.log 2>&1
```

For store mediebiblioteker kan du bytte fillagring til S3 — sett `FILE_STORE=S3` pluss `AWS_*`-variablene beskrevet i [Railway-veiledningens avsnitt om fillagring](./railway-template.md#5-file-storage). Databasesikkerhetskopier inkluderer ikke S3-objekter; aktiver versjonering av bøtten der.

## Oppdatering

```bash
./deploy/b1 upgrade
```

I rekkefølge: henter utgivelsen, tar en sikkerhetskopi, gjenskaper containerne, kjører eventuelle ventende databasemigreringer når API-et starter, og venter på API-ets helsesjekk. Hvis noe mislykkes, stopper den og ber deg kjøre `./deploy/b1 rollback`, som gjenoppretter den sikkerhetskopien og den forrige utgivelsen. Migreringer er bare framover; å rulle tilbake betyr alltid å gjenopprette øyeblikksbildet.

Å oppgradere fra beta-compose-filen (den som bygde images fra kildekode) fungerer på samme måte når du har en `.env`: den brukte `MYSQL_ROOT_PASSWORD=churchapps` som standard, så legg det i `.env` sammen med `PUBLIC_URL` og `SITE_ADDRESS`, erstatt `docker-compose.yml` og `deploy/` med de gjeldende filene, og kjør `./deploy/b1 upgrade`.

## Bygge fra kildekode

Utviklere kan bygge imagene lokalt i stedet for å hente dem:

```bash
docker compose -f docker-compose.yml -f docker-compose.build.yml up -d --build
```

`API_CONTEXT` og `B1APP_CONTEXT` i `.env` peker byggene mot lokale kopier (f.eks. `../Api`) eller en git-ref.

## Feilsøking

| Symptom | Sannsynlig årsak | Løsning |
|---------|--------------|-----------|
| `api`-containeren starter på nytt i en løkke | migreringsfeil eller feil databasepassord | `./deploy/b1 logs api` — migreringen skriver ut hvilken modul som feilet |
| `api` logger «ENCRYPTION_KEY must be exactly 32 characters» | håndredigert eller avkortet nøkkel i `.env` | gjenopprett den opprinnelige 32-tegns nøkkelen (generer en ny bare hvis ingen legitimasjon er lagret ennå) |
| Nettleseren viser en sertifikatadvarsel | DNS peker ikke hit ennå, eller port 80/443 er blokkert | fiks DNS / brannmur; Caddy prøver igjen av seg selv |
| `/` viser et dashbord i stedet for nettstedet | ingen kirke ennå, eller `DEFAULT_CHURCH_SLUG` stemmer ikke | opprett kirken, eller sett slugen fra **Settings → Church** |
| «Check your email», men ingen e-post kommer | `MAIL_SYSTEM=SMTP` med feil legitimasjon | fiks legitimasjonen, eller fjern `MAIL_SYSTEM` for å slå av e-post |
| Mobilwebappen sier at push-varsler ikke er slått på | ingen VAPID-nøkler på serveren | legg dem til som beskrevet i [Push-varsler](#push-notifications) |
| Chat / live-funksjoner er stille | websocket blokkert av en annen proxy foran | socketen ligger på `/api/` over samme port; tillat `Upgrade`-headere |
| `install` avviser: «database volume already exists» | rester fra en tidligere installasjon | `docker compose down -v` for å slette, eller skriv en `.env` og bruk `upgrade` |

Fortsatt fast? Åpne en sak på [github.com/ChurchApps/ChurchAppsSupport/issues](https://github.com/ChurchApps/ChurchAppsSupport/issues) med utdata fra `./deploy/b1 logs`.

## Relaterte artikler

- **[Selvhosting på Railway](./railway-template.md)** — administrert vertsalternativ, pluss de delte veiledningene for konfigurasjon etter distribusjon
- **[Første oppsett](../../getting-started/initial-setup.md)** — første steg etter at kirken din er opprettet
- **[Lokalt API-oppsett](../api/local-setup.md)** — kjøre stacken direkte for utvikling
