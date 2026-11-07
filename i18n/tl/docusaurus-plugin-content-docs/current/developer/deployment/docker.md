---
title: "Self-Hosting gamit ang Docker"
description: "I-install ang pribadong B1 Admin, member portal, API, at MySQL stack sa sarili mong makina gamit ang Docker, at i-upgrade at i-backup gamit ang b1 command."
---

# Self-Hosting gamit ang Docker

<div class="article-intro">

Patakbuhin ang sarili mong pribadong instance ng B1 Admin, ng B1 member portal at website, ng API, at ng MySQL database sa anumang makina na may Docker -- isang home server, maliit na VPS, o on-prem na box. Iisang command ang nag-i-install nito, iisang command ang nag-a-upgrade, at kumukuha muna ng backup ang bawat upgrade. Kung ayaw mong magmintina ng server, tingnan ang [Self-Hosting on Railway](./railway-template.md) para sa managed na alternatibo.

</div>

## Mabilisang Simula

<div class="prereqs">
<h4>Ano ang Kailangan Mo</h4>

- Isang Linux na makina (o macOS / Windows na may WSL o Git Bash -- ang helper na `b1` ay isang bash script) na may [Docker Engine](https://docs.docker.com/engine/install/) at Compose v2 (kasama sa Docker Desktop)
- Mga 2 GB na RAM at 5 GB na disk
- Para sa pampublikong site: isang domain name na nakaturo sa makina, at naaabot ang mga port 80 at 443

</div>

```bash
curl -fsSL https://raw.githubusercontent.com/ChurchApps/B1Admin/main/deploy/install.sh | bash -s -- --domain church.example.org
```

Huwag isama ang `--domain` para tumakbo sa `http://localhost`. Gumagawa ang installer ng folder na `b1church`, nagsusulat ng `.env` na may bagong-gawang secret, humihila ng mga prebuilt na image mula sa GitHub Container Registry, at naghihintay hanggang iulat ng API na healthy. Walang binubuo sa makina mo, kaya isa o dalawang minuto ang unang start.

Kapag natapos na:

1. Buksan ang **https://church.example.org/admin** (o http://localhost/admin) at i-click ang **Register**. Ang unang account ay awtomatikong server admin.
2. Sundin ang mga prompt sa loob ng app para gumawa ng unang simbahan mo. Live na ang website at member portal nito sa **https://church.example.org/** sa sandaling mabuo ito.

Lahat ay tumatakbo sa likod ng iisang domain:

| Path | Serbisyo |
|------|---------|
| `/` | B1App -- website ng simbahan at member portal |
| `/admin` | B1Admin -- dashboard ng staff |
| `/api` | API, mga na-upload na file, at ang websocket ng live na update |

Awtomatiko ang HTTPS: kumukuha at nagre-renew ang kasamang proxy na [Caddy](https://caddyserver.com/) ng Let's Encrypt na certificate para sa domain sa `.env`. Tanging ang mga port 80 at 443 ang nakalantad; naaabot ang database mula lang sa loob ng Docker network.

## Ang command na `b1`

Nag-iiwan ang installer ng script na `deploy/b1` sa tabi ng `docker-compose.yml`. Ito ang tanging kailangan mo araw-araw:

| Command | Ano ang ginagawa nito |
|---------|--------------|
| `./deploy/b1 upgrade` | Hilahin ang kasalukuyang release, kumuha ng backup, i-restart, at i-verify na healthy ang API |
| `./deploy/b1 upgrade 2026.10.1` | Pareho, naka-pin sa partikular na release |
| `./deploy/b1 backup` | I-snapshot ang database, mga na-upload na file, at `.env` sa `backups/<timestamp>/` |
| `./deploy/b1 restore backups/<timestamp>` | Ibalik ang snapshot (hihinto muna ang API habang tumatakbo ito) |
| `./deploy/b1 rollback` | Ibalik ang pinakabagong backup, kasama ang release kung saan ito kinuha |
| `./deploy/b1 status` | Naka-install na bersyon at kalusugan ng container |
| `./deploy/b1 logs api` | Sundan ang logs ng isang serbisyo |

Inilalabas ang mga release bilang iisang bersyon-nakamarkang bundle para laging magkakatugma ang tatlong image. Sinusundan ng `B1_VERSION=stable` sa `.env` ang pinakabagong release; itakda ito sa partikular na bersyon para mag-pin. Nasa ilalim ng [B1Admin releases](https://github.com/ChurchApps/B1Admin/releases) ang mga release note.

## Configuration

Nasa `.env` sa tabi ng `docker-compose.yml` ang lahat ng setting. Pinupunan ng installer ang mga kailangan:

```bash
B1_VERSION=stable
DOMAIN=church.example.org
SITE_ADDRESS=church.example.org          # ano ang ihahain ng Caddy; http://localhost para sa lokal na install
PUBLIC_URL=https://church.example.org    # paano nakakarating ang mga browser at email sa site
MYSQL_ROOT_PASSWORD=…                    # nabuo
JWT_SECRET=…                             # nabuo
ENCRYPTION_KEY=…                         # nabuo, eksaktong 32 character -- huwag kailanman palitan pagkatapos mag-store ng credential

# Email -- lubos na inirerekomenda; kung wala, hindi makakapag-reset ng sariling password ang mga miyembro
MAIL_SYSTEM=SMTP
SMTP_HOST=smtp.resend.com
SMTP_USER=resend
SMTP_PASS=re_xxxxxxxxx
SMTP_SECURE=false
SUPPORT_EMAIL=noreply@church.example.org
```

Pagkatapos i-edit ang `.env`, ilapat ito gamit ang `docker compose up -d`. Tinutukoy ng mga web app kung aling API ang kakausapin mula sa address sa browser, kaya ang pagpapalit ng domain ay kailangan lang i-update ang `SITE_ADDRESS` at `PUBLIC_URL` at mag-restart -- walang rebuild.

:::warning
Ingatan ang `.env`. Pinoprotektahan ng `ENCRYPTION_KEY` ang mga naka-store na credential ng payment gateway at storage; ang backup na walang ito ay hindi maide-decrypt ang mga iyon. Kasama sa `./deploy/b1 backup` ang kopya nito para sa dahilang iyon.
:::

### Paglipat sa domain sa hinaharap

Kung nag-install ka sa `localhost` at gusto mo itong gawing pampubliko sa bandang huli: ituro ang DNS sa makina, itakda ang `DOMAIN`, `SITE_ADDRESS` (ang bare na domain) at `PUBLIC_URL` (`https://` + domain) sa `.env`, pagkatapos `docker compose up -d`. Kukuha ng certificate ang Caddy sa unang request.

## Email, Giving, Multi-Site, at mga Integration

Gumagana ang mga ito nang eksakto gaya sa Railway -- parehong environment variable, itinakda sa `.env` sa halip na sa Railway dashboard:

- **[Email / SMTP](./railway-template.md#1-email-highly-recommended)** -- mga gabay ng provider para sa Resend, Brevo, at Gmail
- **[Multi-site](./railway-template.md#3-multi-site-multiple-churches-on-one-instance)** -- walang limitasyong simbahan kada instance. Ang `/` ay naghahain ng simbahang ang slug ay `DEFAULT_CHURCH_SLUG` (ang unang simbahan ay `church`); ituro ang mga dagdag na domain sa box at i-map ang mga ito sa ilalim ng **Settings → Domains** sa B1Admin
- **[Online giving](./railway-template.md#4-online-giving-stripe--paypal)** -- naka-configure kada simbahan sa admin UI
- **[Mga opsyonal na integration](./railway-template.md#6-optional-feature-integrations)** -- `OPENAI_API_KEY`, `YOUTUBE_API_KEY`, `PEXELS_KEY`, `VIMEO_TOKEN`, `API_BIBLE_KEY`, `GOOGLE_RECAPTCHA_SECRET_KEY`
- **[Push notifications](#push-notifications)** -- `WEB_PUSH_*`; blangko ang iniiwan ng installer, kaya naka-off ang push hangga't hindi mo idinadagdag ang mga ito

Awtomatikong naka-enable sa self-hosted na instance ang mga imbitasyon at iba pang email na ipinapadala ng simbahan (ginagawang manual na review muna ng hosted na serbisyo ang mga ito para protektahan ang reputasyon ng sender nito).

## Push Notifications {#push-notifications}

Nananatiling naka-off ang browser at mobile web push hangga't walang VAPID key pair ang server. Hindi gumagawa ng isa ang installer. Hangga't hindi mo ito idinadagdag, sinasabi ng pahina ng Notifications ng mobile web app na hindi naka-on ang push para sa site.

1. Gumawa ng key pair. Docker lang ang kailangan nito:

   ```bash
   docker run --rm node:lts-alpine npx --yes web-push generate-vapid-keys
   ```

2. Idagdag ang dalawang halaga sa `.env`. Opsyonal ang `WEB_PUSH_SUBJECT`, at ito ang contact address na nakikita ng mga push service:

   ```bash
   WEB_PUSH_PUBLIC_KEY=…
   WEB_PUSH_PRIVATE_KEY=…
   WEB_PUSH_SUBJECT=mailto:admin@example.org
   ```

3. Ilapat ang mga ito:

   ```bash
   docker compose up -d
   ```

4. Para makumpirma, buksan ang **Server Admin → Server Health** sa B1Admin. Dapat ipakitang naka-configure ang parehong Web Push key. Maaaring i-on na ng mga miyembro ang notification mula sa mobile web app.

:::warning
Panatilihin ang parehong key kapag nakapag-enroll na ang mga miyembro. Kapag binago ang mga ito, mawawalan ng bisa ang bawat umiiral na subscription, at kailangang magparehistro muli ang bawat device.
:::

## Data, Backup, at File Storage

Tatlong pinangalanang Docker volume ang naglalaman ng lahat ng estado:

| Volume | Nilalaman |
|--------|----------|
| `b1church_mysql-data` | Lahat ng database schema |
| `b1church_api-content` | Mga na-upload na file -- mga larawan, dokumento, website image |
| `b1church_caddy-data` | Mga TLS certificate |

Sumusulat ang `./deploy/b1 backup` ng pare-parehong snapshot ng unang dalawa kasama ang `.env` sa `backups/<timestamp>/`. Mag-iskedyul gamit ang cron at kopyahin ang folder sa labas ng makina:

```
0 3 * * * cd /opt/b1church && ./deploy/b1 backup >> backups/backup.log 2>&1
```

Para sa malalaking media library, maaari mong ilipat ang file storage sa S3 -- itakda ang `FILE_STORE=S3` kasama ang mga variable na `AWS_*` na inilarawan sa [seksyong File Storage ng Railway guide](./railway-template.md#5-file-storage). Hindi kasama sa database backup ang mga S3 object; i-enable ang bucket versioning doon.

## Pag-update

```bash
./deploy/b1 upgrade
```

Sa pagkakasunod: hinihila ang release, kumukuha ng backup, muling binubuo ang mga container, pinapatakbo ang anumang nakabinbing database migration habang nagsisimula ang API, at naghihintay sa health check ng API. Kung may pumalpak, hihinto ito at sasabihin sa iyong patakbuhin ang `./deploy/b1 rollback`, na nagbabalik sa backup na iyon at sa nakaraang release. Forward-only ang mga migration; ang rollback ay laging nangangahulugang ibalik ang snapshot.

Ang pag-upgrade mula sa beta compose file (ang nagbu-build ng image mula sa source) ay gumagana rin sa parehong paraan kapag mayroon ka nang `.env`: ginamit nito ang `MYSQL_ROOT_PASSWORD=churchapps` bilang default, kaya ilagay iyon sa `.env` kasama ang `PUBLIC_URL` at `SITE_ADDRESS`, palitan ang `docker-compose.yml` at `deploy/` ng kasalukuyang mga file, at patakbuhin ang `./deploy/b1 upgrade`.

## Pagbuo mula sa source

Maaaring buuin ng mga developer ang mga image nang lokal sa halip na hilahin ang mga ito:

```bash
docker compose -f docker-compose.yml -f docker-compose.build.yml up -d --build
```

Itinuturo ng `API_CONTEXT` at `B1APP_CONTEXT` sa `.env` ang mga build sa mga lokal na checkout (hal. `../Api`) o sa isang git ref.

## Troubleshooting

| Sintomas | Malamang na sanhi | Ayos |
|---------|--------------|-----|
| Paulit-ulit na nagre-restart ang container na `api` | Pumalpak ang migration o mali ang database password | `./deploy/b1 logs api` -- ipinapakita ng migration kung aling module ang pumalpak |
| Nagsasabi ang `api` ng "ENCRYPTION_KEY must be exactly 32 characters" | Hinawakan nang manual o naputol na key sa `.env` | Ibalik ang orihinal na 32-character na key (gumawa lang ng bago kung wala pang naka-store na credential) |
| Nagpapakita ang browser ng babala sa certificate | Hindi pa nakaturo rito ang DNS, o nakaharang ang port 80/443 | Ayusin ang DNS / firewall; awtomatikong sumusubok muli ang Caddy |
| Dashboard ang lumalabas sa `/` sa halip na website | Walang simbahan pa, o hindi tumutugma ang `DEFAULT_CHURCH_SLUG` | Gumawa ng simbahan, o itakda ang slug mula sa **Settings → Church** |
| "Check your email" pero walang dumarating na email | `MAIL_SYSTEM=SMTP` na may maling credential | Ayusin ang credential, o alisin ang `MAIL_SYSTEM` para i-disable ang email |
| Sinasabi ng mobile web app na hindi naka-on ang push notification | Walang VAPID key ang server | Idagdag ang mga ito gaya ng inilarawan sa [Push Notifications](#push-notifications) |
| Tahimik ang chat / live feature | Hinaharangan ng ibang proxy sa harap ang websocket | Nasa `/api/` ang socket sa parehong port; payagan ang mga header na `Upgrade` |
| Tumatanggi ang `install`: "database volume already exists" | Mga natira mula sa naunang install | `docker compose down -v` para burahin, o sumulat ng `.env` at gamitin ang `upgrade` |

Natigil pa rin? Magbukas ng issue sa [github.com/ChurchApps/ChurchAppsSupport/issues](https://github.com/ChurchApps/ChurchAppsSupport/issues) kasama ang output ng `./deploy/b1 logs`.

## Mga Kaugnay na Artikulo

- **[Self-Hosting on Railway](./railway-template.md)** -- alternatibong managed na hosting, kasama ang mga shared na gabay sa configuration pagkatapos ng deploy
- **[Initial Setup](../../getting-started/initial-setup.md)** -- mga unang hakbang pagkatapos malikha ang iyong simbahan
- **[Local API Setup](../api/local-setup.md)** -- pagpapatakbo ng stack nang direkta para sa development
