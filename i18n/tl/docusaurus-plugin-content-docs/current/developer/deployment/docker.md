---
title: "Self-Hosting gamit ang Docker"
---

# Self-Hosting gamit ang Docker

<div class="article-intro">

Patakbuhin ang sarili mong pribadong instance ng B1 Admin, ang B1 member portal, ang API, at isang MySQL database sa kahit anong makina na may Docker — isang home server, isang $5 VPS, o isang on-prem box. Isang `docker compose up` ang bumubuo at nagpapatakbo sa lahat. Kung ayaw mong pamahalaan ang isang server, tingnan ang [Self-Hosting sa Railway](./railway-template) para sa managed na alternatibo.

</div>

## Mabilisang Simula

<div class="prereqs">
<h4>Ang Kailangan Mo</h4>

- [Docker Engine](https://docs.docker.com/engine/install/) na may Compose v2 (kasama na sa Docker Desktop)
- ~4 GB ng RAM na available habang ang unang build (ang mga web app ay binubuo mula sa source)
- Git, o kaya ang hilaw na file na `docker-compose.yml`

</div>

```bash
git clone https://github.com/ChurchApps/B1Admin.git
cd B1Admin
docker compose up -d
```

Tumatagal ang unang run ng 10–20 minuto: binubuo nito ang B1Admin mula sa iyong clone at binubuo ang API at B1App nang direkta mula sa kanilang mga GitHub repository. Ilang segundo lang ang susunod na pagsisimula.

Kapag naka-up na ang apat na serbisyo:

1. Buksan ang **http://localhost:3101** (B1 Admin).
2. I-click ang **Register** at gawin ang iyong account. Ang unang account ay awtomatikong server admin.
3. Sundin ang mga prompt sa loob ng app para gawin ang iyong unang simbahan.

Awtomatikong ginagawa ang mga database schema ng startup migration ng API container — walang kailangang manual na SQL.

| Serbisyo | URL |
|---------|-----|
| B1Admin (staff/admin) | http://localhost:3101 |
| B1App (member portal / website) | http://localhost:3000 |
| API | http://localhost:8084 |
| MySQL | internal lang (`mysql:3306` sa compose network) |

## Configuration

Lahat ng setting ay nasa isang `.env` file katabi ng `docker-compose.yml`. May gumaganang default ang bawat variable para sa localhost, kaya opsyonal ang file hanggang gusto mong i-customize ito.

```bash
# .env — lahat ay opsyonal; ipinapakita kasama ang mga default
MYSQL_ROOT_PASSWORD=churchapps
JWT_SECRET=please-change-this-jwt-secret
ENCRYPTION_KEY=PleaseChangeThisDockerDefaultKey   # eksaktong 32 na character

# Public URLs (baguhin ang mga ito kapag lumalabas ka na sa labas ng localhost)
API_URL=http://localhost:8084
B1ADMIN_URL=http://localhost:3101
B1APP_URL=http://localhost:3000
SOCKET_URL=ws://localhost:8084

# Email — tingnan ang seksyong Email ng Railway guide para sa mga walkthrough ng provider
MAIL_SYSTEM=
SMTP_HOST=
SMTP_USER=
SMTP_PASS=
SMTP_SECURE=false
SUPPORT_EMAIL=noreply@yourchurch.org
```

Bago talaga gamitin, palitan ang `MYSQL_ROOT_PASSWORD`, `JWT_SECRET`, at `ENCRYPTION_KEY` (kahit anong 32-character na string).

:::warning
Ang mga `*_URL` na value ay **naka-bake sa web apps sa build time** (karaniwang kilos ng Vite/Next.js). Ang pagbabago ng mga ito sa `.env` ay nangangailangan ng rebuild, hindi lang restart:

```bash
docker compose up -d --build
```
:::

Ang pagbabago ng password ng MySQL matapos ang unang paglunsad ay nangangailangan ding i-update ang password sa loob ng MySQL — pinapanatili ng volume ang mga lumang kredensyal.

## Paglalantad Nito sa Internet

Ilagay ang kahit anong reverse proxy sa harap at bigyan ang bawat serbisyo ng hostname. Gamit ang [Caddy](https://caddyserver.com/) ganito lang ito:

```
admin.yourchurch.org { reverse_proxy localhost:3101 }
app.yourchurch.org   { reverse_proxy localhost:3000 }
api.yourchurch.org   { reverse_proxy localhost:8084 }
```

Pagkatapos itakda ang mga URL sa `.env` at i-rebuild:

```bash
API_URL=https://api.yourchurch.org
B1ADMIN_URL=https://admin.yourchurch.org
B1APP_URL=https://app.yourchurch.org
SOCKET_URL=wss://api.yourchurch.org
```

```bash
docker compose up -d --build
```

Ibinabahagi ng WebSocket na ginagamit para sa chat at live notifications ang port ng API, kaya ang `SOCKET_URL` ay simpleng URL ng API na may `wss://`.

## Email, Giving, Multi-Site, at Integrations

Gumagana ang mga ito nang eksakto tulad ng sa Railway deployment — parehong mga environment variable, itinatakda sa iyong `.env` file sa halip na sa Railway dashboard (ipinapasa ng compose file ang mga ito sa API):

- **[Email / SMTP](./railway-template#1-email-highly-recommended)** — mahigpit na inirerekomenda; kung wala ito, hindi makaka-reset ng password ang mga miyembro
- **[Multi-site](./railway-template#3-multi-site-multiple-churches-on-one-instance)** — walang limitasyong bilang ng simbahan bawat instance, pinamamahalaan sa admin UI
- **[Online giving](./railway-template#4-online-giving-stripe--paypal)** — na-configure per-simbahan sa admin UI, hindi sa pamamagitan ng env vars
- **[Mga opsyonal na integration](./railway-template#6-optional-feature-integrations)** — `OPENAI_API_KEY`, `YOUTUBE_API_KEY`, `PEXELS_KEY`, `VIMEO_TOKEN`, `API_BIBLE_KEY`, `WEB_PUSH_PUBLIC_KEY`/`WEB_PUSH_PRIVATE_KEY`, `GOOGLE_RECAPTCHA_SECRET_KEY`

## Data, Backup, at File Storage

Dalawang named Docker volume ang naghahawak ng lahat ng state:

| Volume | Nilalaman |
|--------|----------|
| `mysql-data` | Lahat ng database schema |
| `api-content` | Mga na-upload na file — litrato, dokumento, mga larawan ng website (naka-mount sa `/app/content`) |

I-back up ang database gamit ang isang one-liner (i-schedule ito gamit ang cron):

```bash
docker compose exec mysql mysqldump -uroot -p"$MYSQL_ROOT_PASSWORD" --all-databases > backup-$(date +%F).sql
```

I-back up ang mga na-upload na file sa pamamagitan ng pagkopya ng volume:

```bash
docker run --rm -v b1admin_api-content:/data -v "$PWD":/backup alpine tar czf /backup/content-$(date +%F).tgz -C /data .
```

Para sa malalaking media library, maaari mong palitan ang file storage sa S3 sa halip na sa local volume — itakda ang `FILE_STORE=S3` kasama ang mga `AWS_*` variable na inilarawan sa [seksyong File Storage ng Railway guide](./railway-template#5-file-storage).

## Pag-update

Binubuo ang API at B1App mula sa `main` branch ng kanilang mga GitHub repo; binubuo ang B1Admin mula sa iyong lokal na clone.

```bash
git pull                              # i-update ang B1Admin
docker compose build --pull           # i-rebuild ang lahat ng image laban sa pinakabagong main
docker compose up -d
```

Awtomatikong tumatakbo ang mga database migration kapag nagsisimula ang API container.

Para mag-pin ng mga bersyon sa halip na sundan ang `main`, ituro ang mga build context sa isang tag sa `.env`:

```bash
API_CONTEXT=https://github.com/ChurchApps/Api.git#v1.2.3
B1APP_CONTEXT=https://github.com/ChurchApps/B1App.git#v1.2.3
```

Maaaring ituro ng mga developer ang parehong mga variable sa mga lokal na checkout (hal. `API_CONTEXT=../Api`).

## Pag-troubleshoot

| Sintomas | Malamang na Dahilan | Ayos |
|---------|--------------|-----|
| Paulit-ulit na nag-re-restart ang `api` container | Hindi pa handa ang MySQL o nabigo ang migration | `docker compose logs api` — ipinapakita ng migration kung aling module ang nabigo |
| Ang login ay nagre-redirect sa `api.churchapps.org` | Nabuo ang web app nang walang `custom` stage args | I-rebuild: `docker compose build --no-cache b1admin b1app` |
| Binago ang isang URL sa `.env` pero walang nangyari | Naka-bake ang mga URL sa build time | `docker compose up -d --build` |
| "Check your email" pero walang dumarating na email | `MAIL_SYSTEM=SMTP` na may maling kredensyal | Ayusin ang mga kredensyal, o alisin ang `MAIL_SYSTEM` para i-disable ang email |
| Tahimik ang Chat / live features | Hindi maabot ang `SOCKET_URL` mula sa browser | Dapat `wss://` sa likod ng HTTPS at naka-proxy sa port 8084 |
| Namamatay ang build sa maliit na VPS | Naubusan ng memory habang `next build` | Magdagdag ng swap, o mag-build sa ibang makina at `docker save`/`load` |

Natutulala pa rin? Magbukas ng issue sa [github.com/ChurchApps/ChurchAppsSupport/issues](https://github.com/ChurchApps/ChurchAppsSupport/issues) kasama ang output ng `docker compose logs`.

## Kaugnay na mga Artikulo

- **[Self-Hosting sa Railway](./railway-template)** — managed hosting na alternatibo, kasama ang mga ibinabahaging gabay sa post-deploy na configuration
- **[Initial Setup](../../getting-started/initial-setup)** — mga unang hakbang matapos magawa ang iyong simbahan
- **[Local API Setup](../api/local-setup)** — pagpapatakbo ng stack nang direkta para sa development
