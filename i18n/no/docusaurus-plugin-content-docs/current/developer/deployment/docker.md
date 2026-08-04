---
title: "Selvhosting med Docker"
---

# Selvhosting med Docker

<div class="article-intro">

Kjør din egen private instans av B1 Admin, B1-medlemsportalen, APIet, og en MySQL-database på hvilken som helst maskin med Docker — en hjemmeserver, en $5 VPS, eller en on-prem-boks. Én `docker compose up` bygger og starter alt. Hvis du heller ikke vil administrere en server i det hele tatt, se [Selvhosting på Railway](./railway-template) for det administrerte alternativet.

</div>

## Hurtigstart

<div class="prereqs">
<h4>Hva du trenger</h4>

- [Docker Engine](https://docs.docker.com/engine/install/) med Compose v2 (inkludert i Docker Desktop)
- ~4 GB tilgjengelig RAM under den første bygningen (nettappene bygges fra kildekode)
- Git, eller bare den rå `docker-compose.yml`-filen

</div>

```bash
git clone https://github.com/ChurchApps/B1Admin.git
cd B1Admin
docker compose up -d
```

Den første kjøringen tar 10–20 minutter: den bygger B1Admin fra din klone og bygger APIet og B1App direkte fra deres GitHub-repoer. Påfølgende oppstarter tar sekunder.

Når alle fire tjenestene er oppe:

1. Åpne **http://localhost:3101** (B1 Admin).
2. Klikk på **Registrer** og opprett kontoen din. Den første kontoen blir automatisk en serveradministrator.
3. Følg instruksjonene i appen for å opprette din første kirke.

Databaseskjemaene opprettes automatisk av API-containerens oppstartsmigrasjon — ingen manuell SQL nødvendig.

| Tjeneste | URL |
|---------|-----|
| B1Admin (ansatte/admin) | http://localhost:3101 |
| B1App (medlemsportal / nettsted) | http://localhost:3000 |
| API | http://localhost:8084 |
| MySQL | kun internt (`mysql:3306` på compose-nettverket) |

## Konfigurasjon

Alle innstillinger ligger i en `.env`-fil ved siden av `docker-compose.yml`. Hver variabel har en fungerende standardverdi for localhost, så filen er valgfri inntil du tilpasser noe.

```bash
# .env — alt er valgfritt; vist med standardverdier
MYSQL_ROOT_PASSWORD=churchapps
JWT_SECRET=please-change-this-jwt-secret
ENCRYPTION_KEY=PleaseChangeThisDockerDefaultKey   # nøyaktig 32 tegn

# Offentlige URL-er (endre disse når du eksponerer utover localhost)
API_URL=http://localhost:8084
B1ADMIN_URL=http://localhost:3101
B1APP_URL=http://localhost:3000
SOCKET_URL=ws://localhost:8084

# E-post — se e-post-seksjonen i Railway-guiden for leverandørgjennomganger
MAIL_SYSTEM=
SMTP_HOST=
SMTP_USER=
SMTP_PASS=
SMTP_SECURE=false
SUPPORT_EMAIL=noreply@yourchurch.org
```

Før reell bruk, endre `MYSQL_ROOT_PASSWORD`, `JWT_SECRET`, og `ENCRYPTION_KEY` (en hvilken som helst 32-tegns streng).

:::warning
`*_URL`-verdiene er **bakt inn i nettappene ved byggetidspunktet** (standard Vite-/Next.js-atferd). Å endre dem i `.env` krever en ombygging, ikke bare en omstart:

```bash
docker compose up -d --build
```
:::

Å endre MySQL-passordet etter første oppstart krever at du også oppdaterer passordet inne i MySQL — volumet beholder den gamle legitimasjonen.

## Å eksponere det mot internett

Sett en hvilken som helst reverse proxy foran og gi hver tjeneste et vertsnavn. Med [Caddy](https://caddyserver.com/) ser det slik ut:

```
admin.yourchurch.org { reverse_proxy localhost:3101 }
app.yourchurch.org   { reverse_proxy localhost:3000 }
api.yourchurch.org   { reverse_proxy localhost:8084 }
```

Sett deretter URL-ene i `.env` og bygg på nytt:

```bash
API_URL=https://api.yourchurch.org
B1ADMIN_URL=https://admin.yourchurch.org
B1APP_URL=https://app.yourchurch.org
SOCKET_URL=wss://api.yourchurch.org
```

```bash
docker compose up -d --build
```

WebSocket-en brukt for chat og live varsler deler port med APIet, så `SOCKET_URL` er bare API-URL-en med `wss://`.

## E-post, givertjeneste, multi-nettsted, og integrasjoner

Disse fungerer identisk med Railway-distribusjonen — de samme miljøvariablene, satt i din `.env`-fil i stedet for Railway-dashbordet (compose-filen sender dem videre til APIet):

- **[E-post / SMTP](./railway-template#1-email-highly-recommended)** — sterkt anbefalt; uten det kan ikke medlemmer tilbakestille passord
- **[Multi-nettsted](./railway-template#3-multi-site-multiple-churches-on-one-instance)** — ubegrenset antall kirker per instans, administrert i admin-grensesnittet
- **[Nettbasert givertjeneste](./railway-template#4-online-giving-stripe--paypal)** — konfigureres per kirke i admin-grensesnittet, ikke via miljøvariabler
- **[Valgfrie integrasjoner](./railway-template#6-optional-feature-integrations)** — `OPENAI_API_KEY`, `YOUTUBE_API_KEY`, `PEXELS_KEY`, `VIMEO_TOKEN`, `API_BIBLE_KEY`, `WEB_PUSH_PUBLIC_KEY`/`WEB_PUSH_PRIVATE_KEY`, `GOOGLE_RECAPTCHA_SECRET_KEY`

## Data, sikkerhetskopier, og fillagring

To navngitte Docker-volumer holder all tilstand:

| Volum | Innhold |
|--------|----------|
| `mysql-data` | Alle databaseskjemaer |
| `api-content` | Opplastede filer — bilder, dokumenter, nettstedbilder (montert på `/app/content`) |

Ta sikkerhetskopi av databasen med en enlinjer (planlegg den med cron):

```bash
docker compose exec mysql mysqldump -uroot -p"$MYSQL_ROOT_PASSWORD" --all-databases > backup-$(date +%F).sql
```

Ta sikkerhetskopi av opplastede filer ved å kopiere volumet:

```bash
docker run --rm -v b1admin_api-content:/data -v "$PWD":/backup alpine tar czf /backup/content-$(date +%F).tgz -C /data .
```

For store mediebiblioteker kan du bytte fillagring til S3 i stedet for det lokale volumet — sett `FILE_STORE=S3` pluss `AWS_*`-variablene beskrevet i [Railway-guidens fillagringsseksjon](./railway-template#5-file-storage).

## Oppdatering

APIet og B1App bygges fra `main`-grenen på sine GitHub-repoer; B1Admin bygges fra din lokale klone.

```bash
git pull                              # oppdater B1Admin
docker compose build --pull           # bygg alle bilder på nytt mot siste main
docker compose up -d
```

Databasemigrasjoner kjører automatisk når API-containeren starter.

For å låse versjoner i stedet for å følge `main`, pek byggekontekstene mot en tag i `.env`:

```bash
API_CONTEXT=https://github.com/ChurchApps/Api.git#v1.2.3
B1APP_CONTEXT=https://github.com/ChurchApps/B1App.git#v1.2.3
```

Utviklere kan peke de samme variablene mot lokale kloner (f.eks. `API_CONTEXT=../Api`).

## Feilsøking

| Symptom | Sannsynlig årsak | Fiks |
|---------|--------------|-----|
| `api`-containeren omstarter i en løkke | MySQL ikke klar eller migrasjonsfeil | `docker compose logs api` — migrasjonen skriver ut hvilken modul som feilet |
| Innlogging omdirigerer til `api.churchapps.org` | Nettappen ble bygget uten `custom`-byggetrinnsargumentene | Bygg på nytt: `docker compose build --no-cache b1admin b1app` |
| Endret en URL i `.env` men ingenting skjedde | URL-er bakes inn ved byggetidspunktet | `docker compose up -d --build` |
| "Sjekk e-posten din" men ingen e-post ankommer | `MAIL_SYSTEM=SMTP` med feil legitimasjon | Fiks legitimasjonen, eller fjern `MAIL_SYSTEM` for å deaktivere e-post |
| Chat / live-funksjoner tause | `SOCKET_URL` ikke tilgjengelig fra nettleseren | Må være `wss://` bak HTTPS og proxyet til port 8084 |
| Bygget dør på en liten VPS | Tom for minne under `next build` | Legg til swap, eller bygg på en annen maskin og bruk `docker save`/`load` |

Fortsatt fastlåst? Åpne en sak på [github.com/ChurchApps/ChurchAppsSupport/issues](https://github.com/ChurchApps/ChurchAppsSupport/issues) med utdataen fra `docker compose logs`.

## Relaterte artikler

- **[Selvhosting på Railway](./railway-template)** — administrert hostingalternativ, pluss de delte veiledningene for konfigurasjon etter distribusjon
- **[Første oppsett](../../getting-started/initial-setup)** — de første stegene etter at kirken din er opprettet
- **[Lokalt API-oppsett](../api/local-setup)** — å kjøre stabelen direkte for utvikling
