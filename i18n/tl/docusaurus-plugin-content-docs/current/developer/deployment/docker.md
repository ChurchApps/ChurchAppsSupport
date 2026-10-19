---
title: "Self-Hosting gamit ang Docker"
---

# Self-Hosting gamit ang Docker

<div class="article-intro">

Patakbuhin ang sarili mong pribadong instance ng B1 Admin, ang B1 member portal at website, ang API, at isang MySQL database sa anumang makina na may Docker — isang home server, maliit na VPS, o on-prem na kahon. Isang command lang ang nag-i-install nito, isang command ang nag-a-upgrade, at ang bawat upgrade ay kumukuha muna ng backup. Kung ayaw mong magpatakbo ng server, tingnan ang [Self-Hosting sa Railway](./railway-template) para sa managed na alternatibo.

</div>

## Mabilis na Pagsisimula

<div class="prereqs">
<h4>Ano ang Kailangan Mo</h4>

- Isang Linux machine (o macOS / Windows na may WSL o Git Bash — ang `b1` helper ay bash script) na may [Docker Engine](https://docs.docker.com/engine/install/) at Compose v2 (kasama sa Docker Desktop)
- Mga 2 GB na RAM at 5 GB na disk
- Para sa public na site: domain name na nakaturo sa makina, na may ports 80 at 443 na maaabot

</div>

```bash
curl -fsSL https://raw.githubusercontent.com/ChurchApps/B1Admin/main/deploy/install.sh | bash -s -- --domain church.example.org
```

Iwanan ang `--domain` para tumakbo sa `http://localhost`. Gumagawa ang installer ng folder na `b1church`, nagsusulat ng `.env` na may bagong gawang mga secret, humihila ng mga prebuilt na image mula sa GitHub Container Registry, at naghihintay hanggang mag-report ang API na healthy. Walang binubuo sa makina mo, kaya isa o dalawang minuto ang unang pagsisimula.

Kapag natapos na ito:

1. Buksan ang **https://church.example.org/admin** (o http://localhost/admin) at i-click ang **Register**. Ang unang account ay awtomatikong server admin.
2. Sundin ang mga in-app prompt para gumawa ng unang simbahan mo. Live na ang website at member portal nito sa **https://church.example.org/** sa sandaling mabuo ito.

Lahat ay tumatakbo sa likod ng iisang domain:

| Path | Serbisyo |
|------|---------|
| `/` | B1App — website ng simbahan at member portal |
| `/admin` | B1Admin — staff dashboard |
| `/api` | API, mga na-upload na file, at ang live-updates websocket |

HTTPS ay awtomatiko: kinukuha at nire-renew ng kasamang [Caddy](https://caddyserver.com/) proxy ang Let's Encrypt certificate para sa domain sa `.env`. Ang ports 80 at 443 lamang ang nakalantad; ang database ay maaabot lamang mula sa loob ng Docker network.

## Ang `b1` command

Nag-iiwan ang installer ng script na `deploy/b1` sa tabi ng `docker-compose.yml`. Ito lamang ang kailangan mo araw-araw:

| Command | Ano ang ginagawa nito |
|---------|--------------|
| `./deploy/b1 upgrade` | Kunin ang kasalukuyang release, kumuha ng backup, i-restart, at i-verify na healthy ang API |
| `./deploy/b1 upgrade 2026.10.1` | Kapareho, naka-pin sa partikular na release |
| `./deploy/b1 backup` | I-snapshot ang database, mga na-upload na file, at `.env` sa `backups/<timestamp>/` |
| `./deploy/b1 restore backups/<timestamp>` | Ibalik ang snapshot (humihinto ang API habang tumatakbo ito) |
| `./deploy/b1 rollback` | Ibalik ang pinakabagong backup, kasama ang release kung saan ito kinuha |
| `./deploy/b1 status` | Naka-install na bersyon at kalusugan ng container |
| `./deploy/b1 logs api` | Sundan ang logs ng isang serbisyo |

Inilalathala ang mga release bilang iisang versioned bundle para laging magkakatugma ang tatlong image. Ang `B1_VERSION=stable` sa `.env` ay sumusunod sa pinakabagong release; itakda ito sa partikular na bersyon para mag-pin. Ang release notes ay nasa ilalim ng [B1Admin releases](https://github.com/ChurchApps/B1Admin/releases).

## Configuration

Lahat ng setting ay nasa `.env` sa tabi ng `docker-compose.yml`. Pinupunan ng installer ang mga kinakailangan:

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

Pagkatapos i-edit ang `.env`, ilapat ito gamit ang `docker compose up -d`. Alam ng web apps kung aling API ang kakausapin mula sa address sa browser, kaya ang pagpapalit ng domain ay kailangan lamang i-update ang `SITE_ADDRESS` at `PUBLIC_URL` at mag-restart — walang kailangang i-rebuild.

:::warning
Ingatan ang `.env`. Pinoprotektahan ng `ENCRYPTION_KEY` ang mga naka-imbak na credential ng payment gateway at storage; hindi madedecrypt ng backup na walang ito. Kasama ng `./deploy/b1 backup` ang kopya nito para sa dahilang iyon.
:::

### Paglipat sa domain sa hinaharap

Kung na-install mo sa `localhost` at gusto mo itong gawing public mamaya: ituro ang DNS sa makina, itakda ang `DOMAIN`, `SITE_ADDRESS` (ang bare domain) at `PUBLIC_URL` (`https://` + domain) sa `.env`, pagkatapos ay `docker compose up -d`. Kukunin ng Caddy ang certificate sa unang request.

## Email, Giving, Multi-Site, at Integrations

Gumagana ang mga ito nang eksaktong kapareho sa Railway — ang parehong environment variable, na itinakda sa `.env` sa halip na Railway dashboard:

- **[Email / SMTP](./railway-template#1-email-highly-recommended)** — mga gabay ng provider para sa Resend, Brevo, at Gmail
- **[Multi-site](./railway-template#3-multi-site-multiple-churches-on-one-instance)** — walang limitasyong simbahan kada instance. Ang `/` ay naghahatid ng simbahang may slug na `DEFAULT_CHURCH_SLUG` (ang unang simbahan ay `church`); ituro ang mga dagdag na domain sa kahon at imapa ang mga ito sa ilalim ng **Settings → Domains** sa B1Admin
- **[Online giving](./railway-template#4-online-giving-stripe--paypal)** — naka-configure kada simbahan sa admin UI
- **[Optional integrations](./railway-template#6-optional-feature-integrations)** — `OPENAI_API_KEY`, `YOUTUBE_API_KEY`, `PEXELS_KEY`, `VIMEO_TOKEN`, `API_BIBLE_KEY`, `WEB_PUSH_*`, `GOOGLE_RECAPTCHA_SECRET_KEY`

Awtomatikong naka-enable ang mga imbitasyon at iba pang email na ipinapadala ng simbahan sa self-hosted na instance (ginagawa ng hosted service na nangangailangan ng manual na review ang mga ito para protektahan ang reputasyon ng sender nito).

## Data, Backup, at File Storage

Tatlong named Docker volume ang nagtataglay ng lahat ng estado:

| Volume | Nilalaman |
|--------|----------|
| `b1church_mysql-data` | Lahat ng database schema |
| `b1church_api-content` | Mga na-upload na file — larawan, dokumento, website images |
| `b1church_caddy-data` | TLS certificate |

`./deploy/b1 backup` ay nagsusulat ng consistent na snapshot ng unang dalawa at ng `.env` sa `backups/<timestamp>/`. I-schedule ito gamit ang cron at kopyahin ang folder sa labas ng makina:

```
0 3 * * * cd /opt/b1church && ./deploy/b1 backup >> backups/backup.log 2>&1
```

Para sa malalaking media library, maaari mong ilipat ang file storage sa S3 — itakda ang `FILE_STORE=S3` kasama ang mga `AWS_*` variable na inilarawan sa [File Storage section ng Railway guide](./railway-template#5-file-storage). Hindi kasama sa database backup ang S3 objects; i-enable ang bucket versioning doon.

## Pag-update

```bash
./deploy/b1 upgrade
```

Ayon sa pagkakasunod: kinukuha ang release, kumukuha ng backup, nire-recreate ang mga container, pinapatakbo ang anumang nakabinbing database migration habang nagsisimula ang API, at naghihintay sa health check ng API. Kung may pumalpak, hihinto ito at sasabihing patakbuhin ang `./deploy/b1 rollback`, na magbabalik sa backup na iyon at sa nakaraang release. Forward-only ang mga migration; ang rollback ay palaging nangangahulugang pagbabalik ng snapshot.

Ang pag-upgrade mula sa beta compose file (yung nag-build ng image mula sa source) ay gumagana rin nang pareho kapag mayroon ka nang `.env`: ginamit nito ang `MYSQL_ROOT_PASSWORD=churchapps` bilang default, kaya ilagay iyon sa `.env` kasama ang `PUBLIC_URL` at `SITE_ADDRESS`, palitan ang `docker-compose.yml` at `deploy/` ng kasalukuyang mga file, at patakbuhin ang `./deploy/b1 upgrade`.

## Pagbuo mula sa source

Maaaring i-build ng mga developer ang image nang lokal sa halip na hilahin ang mga ito:

```bash
docker compose -f docker-compose.yml -f docker-compose.build.yml up -d --build
```

Ang `API_CONTEXT` at `B1APP_CONTEXT` sa `.env` ay tumuturo sa mga build sa mga lokal na checkout (hal. `../Api`) o sa git ref.

## Troubleshooting

| Sintomas | Malamang na dahilan | Ayos |
|---------|--------------|-----|
| `api` container paulit-ulit na nagre-restart | pumalpak na migration o maling database password | `./deploy/b1 logs api` — ipinapakita ng migration kung aling module ang pumalpak |
| `api` nagla-log ng "ENCRYPTION_KEY must be exactly 32 characters" | binago o pinutol ang key sa `.env` | ibalik ang orihinal na 32-character na key (gumawa lamang ng bago kung wala pang naka-imbak na credential) |
| Nagpapakita ang browser ng certificate warning | hindi pa nakaturo ang DNS dito, o naka-block ang port 80/443 | ayusin ang DNS / firewall; kusang nagre-retry ang Caddy |
| `/` nagpapakita ng dashboard sa halip na website | walang simbahan pa, o hindi tugma ang `DEFAULT_CHURCH_SLUG` | gumawa ng simbahan, o itakda ang slug mula sa **Settings → Church** |
| "Check your email" pero walang dumarating na email | `MAIL_SYSTEM=SMTP` na may maling credential | ayusin ang credential, o alisin ang `MAIL_SYSTEM` para i-disable ang email |
| Tahimik ang Chat / live features | hinaharangan ng ibang proxy sa harap ang websocket | nasa `/api/` ang socket sa parehong port; payagan ang `Upgrade` headers |
| Tumatangging mag-install: "database volume already exists" | mga labi mula sa naunang install | `docker compose down -v` para burahin, o sumulat ng `.env` at gamitin ang `upgrade` |

Stuck pa rin? Magbukas ng issue sa [github.com/ChurchApps/ChurchAppsSupport/issues](https://github.com/ChurchApps/ChurchAppsSupport/issues) kasama ang output ng `./deploy/b1 logs`.

## Mga Kaugnay na Artikulo

- **[Self-Hosting sa Railway](./railway-template)** — alternatibong managed hosting, kasama ang mga shared na gabay sa configuration pagkatapos ng deploy
- **[Paunang Setup](../../getting-started/initial-setup)** — mga unang hakbang pagkatapos malikha ang simbahan mo
- **[Local API Setup](../api/local-setup)** — pagpapatakbo ng stack nang direkta para sa development
