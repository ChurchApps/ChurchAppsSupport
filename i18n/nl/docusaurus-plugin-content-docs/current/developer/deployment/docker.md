---
title: "Zelf hosten met Docker"
description: "Installeer een privé B1 Admin-, ledenportaal-, API- en MySQL-stack met Docker, en werk die bij en maak er back-ups van met het b1-commando."
---

# Zelf hosten met Docker

<div class="article-intro">

Draai je eigen privé-instantie van B1 Admin, de B1-ledenportal en -website, de API en een MySQL-database op elke machine met Docker: een thuisserver, een kleine VPS of een on-premises server. Eén commando installeert alles, één commando voert een upgrade uit, en elke upgrade maakt eerst een back-up. Wil je helemaal geen server beheren? Bekijk dan [Zelf hosten op Railway](./railway-template.md) voor het beheerde alternatief.

</div>

## Snel aan de slag

<div class="prereqs">
<h4>Wat je nodig hebt</h4>

- Een Linux-machine (of macOS / Windows met WSL of Git Bash; het `b1`-hulpprogramma is een bash-script) met [Docker Engine](https://docs.docker.com/engine/install/) en Compose v2 (inbegrepen in Docker Desktop)
- Ongeveer 2 GB RAM en 5 GB schijfruimte
- Voor een publieke site: een domeinnaam die naar de machine verwijst, met poorten 80 en 443 bereikbaar

</div>

```bash
curl -fsSL https://raw.githubusercontent.com/ChurchApps/B1Admin/main/deploy/install.sh | bash -s -- --domain church.example.org
```

Laat `--domain` weg om te draaien op `http://localhost`. Het installatieprogramma maakt een map `b1church` aan, schrijft een `.env`-bestand met vers gegenereerde geheimen, haalt de vooraf gebouwde images op uit GitHub Container Registry en wacht tot de API meldt dat hij gezond is. Er wordt niets op je eigen machine gebouwd, dus de eerste start duurt een minuut of twee.

Wanneer het klaar is:

1. Open **https://church.example.org/admin** (of http://localhost/admin) en klik op **Registreren**. Het eerste account wordt automatisch een serverbeheerder.
2. Volg de meldingen in de app om je eerste kerk aan te maken. De website en ledenportal zijn direct live op **https://church.example.org/** zodra die bestaat.

Alles draait achter één domein:

| Pad | Service |
|------|---------|
| `/` | B1App: kerkwebsite en ledenportal |
| `/admin` | B1Admin: dashboard voor medewerkers |
| `/api` | API, geüploade bestanden en de websocket voor live-updates |

HTTPS werkt automatisch: de meegeleverde [Caddy](https://caddyserver.com/)-proxy verkrijgt en vernieuwt een Let's Encrypt-certificaat voor het domein in `.env`. Alleen poorten 80 en 443 staan open; de database is alleen binnen het Docker-netwerk bereikbaar.

## Het `b1`-commando

Het installatieprogramma plaatst een `deploy/b1`-script naast `docker-compose.yml`. Dit is het enige wat je dagelijks nodig hebt:

| Opdracht | Wat het doet |
|---------|--------------|
| `./deploy/b1 upgrade` | Haalt de huidige release op, maakt een back-up, herstart en controleert of de API gezond is |
| `./deploy/b1 upgrade 2026.10.1` | Hetzelfde, vastgezet op een specifieke release |
| `./deploy/b1 backup` | Maakt een momentopname van de database, geüploade bestanden en `.env` in `backups/<timestamp>/` |
| `./deploy/b1 restore backups/<timestamp>` | Zet een momentopname terug (de API stopt terwijl dit draait) |
| `./deploy/b1 rollback` | Herstelt de nieuwste back-up, inclusief de release waarop die is gemaakt |
| `./deploy/b1 status` | Geïnstalleerde versie en gezondheid van de containers |
| `./deploy/b1 logs api` | Volgt de logs van een service |

Releases worden gepubliceerd als één versiebundel, zodat de drie images altijd op elkaar aansluiten. `B1_VERSION=stable` in `.env` volgt de nieuwste release; stel een specifieke versie in om vast te zetten. Releasenotities vind je onder [B1Admin releases](https://github.com/ChurchApps/B1Admin/releases).

## Configuratie

Alle instellingen staan in `.env`, naast `docker-compose.yml`. Het installatieprogramma vult de verplichte instellingen in:

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

Pas je wijzigingen in `.env` toe met `docker compose up -d`. De webapps bepalen met welke API ze moeten praten op basis van het adres in de browser. Als je het domein wijzigt, hoef je dus alleen `SITE_ADDRESS` en `PUBLIC_URL` aan te passen en de services te herstarten; je hoeft niets opnieuw te bouwen.

:::warning
Bewaar `.env` goed. `ENCRYPTION_KEY` beschermt opgeslagen gegevens van betalingsproviders en opslagdiensten; een back-up zonder deze sleutel kan die gegevens niet ontsleutelen. `./deploy/b1 backup` bevat daarom een kopie ervan.
:::

### Later naar een domein verhuizen

Heb je geïnstalleerd op `localhost` en wil je later publiek toegankelijk maken? Laat DNS naar de machine verwijzen, stel in `.env` `DOMAIN`, `SITE_ADDRESS` (het kale domein) en `PUBLIC_URL` (`https://` + domein) in, en voer daarna `docker compose up -d` uit. Caddy haalt een certificaat op bij het eerste verzoek.

## E-mail, giften, meerdere sites en integraties

Deze werken precies zoals op Railway: dezelfde omgevingsvariabelen, maar ingesteld in `.env` in plaats van in het Railway-dashboard:

- **[E-mail / SMTP](./railway-template.md#1-email-highly-recommended)**: stappenplannen per provider voor Resend, Brevo en Gmail
- **[Meerdere sites](./railway-template.md#3-multi-site-multiple-churches-on-one-instance)**: onbeperkt aantal kerken per instantie. `/` toont de kerk waarvan de slug `DEFAULT_CHURCH_SLUG` is (de eerste kerk is `church`). Wijs extra domeinen naar de machine en koppel ze onder **Settings → Domains** in B1Admin
- **[Online geven](./railway-template.md#4-online-giving-stripe--paypal)**: per kerk ingesteld in de beheerinterface
- **[Optionele integraties](./railway-template.md#6-optional-feature-integrations)**: `OPENAI_API_KEY`, `YOUTUBE_API_KEY`, `PEXELS_KEY`, `VIMEO_TOKEN`, `API_BIBLE_KEY`, `GOOGLE_RECAPTCHA_SECRET_KEY`
- **[Pushmeldingen](#push-notifications)**: `WEB_PUSH_*`; het installatieprogramma laat deze leeg, dus push staat uit totdat je ze toevoegt

Uitnodigingen en andere e-mails van de kerk worden op een zelf gehoste instantie automatisch ingeschakeld. De gehoste service zet deze achter een handmatige controle om de reputatie van de afzender te beschermen.

## Pushmeldingen

Browser- en mobiele webpushmeldingen blijven uit totdat de server een VAPID-sleutelpaar heeft. Het installatieprogramma maakt er geen aan. Totdat je er een toevoegt, meldt de pagina Meldingen van de mobiele webapp dat pushmeldingen niet zijn ingeschakeld voor de site.

1. Genereer een sleutelpaar. Hiervoor heb je alleen Docker nodig:

   ```bash
   docker run --rm node:lts-alpine npx --yes web-push generate-vapid-keys
   ```

2. Voeg de twee waarden toe aan `.env`. `WEB_PUSH_SUBJECT` is optioneel en is het contactadres dat pushdiensten zien:

   ```bash
   WEB_PUSH_PUBLIC_KEY=…
   WEB_PUSH_PRIVATE_KEY=…
   WEB_PUSH_SUBJECT=mailto:admin@example.org
   ```

3. Pas ze toe:

   ```bash
   docker compose up -d
   ```

4. Om te controleren of het werkt, open je **Server Admin → Server Health** in B1Admin. Beide Web Push-sleutels zouden als ingesteld moeten worden weergegeven. Leden kunnen daarna meldingen inschakelen in de mobiele webapp.

:::warning
Houd dezelfde sleutels zodra leden zich hebben aangemeld. Als je ze wijzigt, werkt elk bestaand abonnement niet meer en moet elk apparaat zich opnieuw registreren.
:::

## Gegevens, back-ups en bestandsopslag

Drie benoemde Docker-volumes bevatten alle gegevens:

| Volume | Inhoud |
|--------|----------|
| `b1church_mysql-data` | Alle databaseschema's |
| `b1church_api-content` | Geüploade bestanden: foto's, documenten, afbeeldingen voor de website |
| `b1church_caddy-data` | TLS-certificaten |

`./deploy/b1 backup` schrijft een consistente momentopname van de eerste twee, plus `.env`, naar `backups/<timestamp>/`. Plan deze met cron en kopieer de map naar een locatie buiten de machine:

```
0 3 * * * cd /opt/b1church && ./deploy/b1 backup >> backups/backup.log 2>&1
```

Voor grote mediabibliotheken kun je de bestandsopslag overzetten naar S3. Stel `FILE_STORE=S3` in, plus de `AWS_*`-variabelen die worden beschreven in de sectie Bestandsopslag van de [Railway-gids](./railway-template.md#5-file-storage). Databaseback-ups bevatten geen S3-objecten; schakel daarvoor bucketversiebeheer in.

## Bijwerken

```bash
./deploy/b1 upgrade
```

Dit doet achtereenvolgens het volgende: de release ophalen, een back-up maken, de containers opnieuw aanmaken, eventuele openstaande databasemigraties uitvoeren terwijl de API start, en wachten op de gezondheidscontrole van de API. Als er iets misgaat, stopt het proces en krijg je de melding om `./deploy/b1 rollback` uit te voeren. Dat herstelt die back-up en de vorige release. Migraties werken alleen vooruit; terugdraaien betekent altijd de momentopname herstellen.

Upgraden vanaf het beta-compose-bestand (het bestand dat images bouwde vanuit de broncode) werkt op dezelfde manier zodra je een `.env` hebt. Standaard gebruikte dit `MYSQL_ROOT_PASSWORD=churchapps`, dus zet dat in `.env` samen met `PUBLIC_URL` en `SITE_ADDRESS`. Vervang daarna `docker-compose.yml` en `deploy/` door de huidige bestanden en voer `./deploy/b1 upgrade` uit.

## Bouwen vanuit de broncode

Ontwikkelaars kunnen de images lokaal bouwen in plaats van ze op te halen:

```bash
docker compose -f docker-compose.yml -f docker-compose.build.yml up -d --build
```

`API_CONTEXT` en `B1APP_CONTEXT` in `.env` wijzen de builds naar lokale kopieën (bijvoorbeeld `../Api`) of naar een git-referentie.

## Problemen oplossen

| Symptoom | Waarschijnlijke oorzaak | Oplossing |
|---------|--------------|-----|
| De `api`-container herstart in een lus | migratiefout of verkeerd databasewachtwoord | `./deploy/b1 logs api`: de migratie toont welke module is mislukt |
| `api` logt "ENCRYPTION_KEY must be exactly 32 characters" | handmatig bewerkte of afgekapte sleutel in `.env` | herstel de originele sleutel van 32 tekens (genereer alleen een nieuwe als er nog geen gegevens zijn opgeslagen) |
| De browser toont een certificaatwaarschuwing | DNS wijst nog niet hierheen, of poort 80/443 is geblokkeerd | los DNS of de firewall op; Caddy probeert het automatisch opnieuw |
| `/` toont een dashboard in plaats van de website | nog geen kerk, of `DEFAULT_CHURCH_SLUG` komt niet overeen | maak de kerk aan, of stel de slug in via **Settings → Church** |
| "Controleer je e-mail" maar er komt geen e-mail aan | `MAIL_SYSTEM=SMTP` met onjuiste gegevens | corrigeer de gegevens, of verwijder `MAIL_SYSTEM` om e-mail uit te schakelen |
| De mobiele webapp meldt dat pushmeldingen niet zijn ingeschakeld | geen VAPID-sleutels op de server | voeg ze toe zoals beschreven onder [Pushmeldingen](#push-notifications) |
| Chat- en livefuncties werken niet | websocket geblokkeerd door een andere proxy ervoor | de socket staat op `/api/` via dezelfde poort; sta `Upgrade`-headers toe |
| `install` weigert met "database volume already exists" | restanten van een eerdere installatie | voer `docker compose down -v` uit om alles te wissen, of schrijf een `.env` en gebruik `upgrade` |

Nog steeds vastgelopen? Open een issue op [github.com/ChurchApps/ChurchAppsSupport/issues](https://github.com/ChurchApps/ChurchAppsSupport/issues) en voeg de uitvoer van `./deploy/b1 logs` toe.

## Gerelateerde artikelen

- **[Zelf hosten op Railway](./railway-template.md)**: beheerd hostingalternatief, plus de gedeelde gidsen voor configuratie na de implementatie
- **[Eerste instelling](../../getting-started/initial-setup.md)**: eerste stappen nadat je kerk is aangemaakt
- **[Lokale API-instelling](../api/local-setup.md)**: de stack rechtstreeks draaien voor ontwikkeling
