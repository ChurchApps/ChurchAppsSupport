---
title: "Self-Hosting with Docker"
---

# Self-Hosting with Docker

<div class="article-intro">

Run your own private instance of B1 Admin, the B1 Membro portal, the API, and a MySQL database on any machine with Docker — a home server, a $5 VPS, or an on-prem box. One `docker compose up` builds and starts everything. If you'd rather not manage a server at all, see [Self-Hosting on Railway](./railway-template) for the managed alternative.

</div>

## Quick Start

<div class="prereqs">
<h4>What You Need</h4>

- [Docker Engine](https://docs.docker.com/engine/install/) with Compose v2 (included in Docker Desktop)
- ~4 GB of RAM Disponibile during the initial build (the web apps are built from source)
- Git, or just the raw `docker-compose.yml` file

</div>

```bash
git clone https://github.com/ChurchApps/B1Admin.git
cd B1Admin
docker compose up -d
```

The first run takes 10–20 minutes: it builds B1Admin from your clone and builds the API and B1App directly from their GitHub repositories. Subsequent starts are seconds.

When all four Servizi are up:

1. Apri **http://localhost:3101** (B1 Admin).
2. Fai clic **Register** and Crea your Account. The first Account is automatically a server admin.
3. Follow the in-app prompts Per Crea your first church.

Database schemas are created automatically by the API container's startup migration — No manual SQL Obbligatorio.

| Servizio | URL |
|---------|-----|
| B1Admin (Staff/admin) | http://localhost:3101 |
| B1App (Membro portal / website) | http://localhost:3000 |
| API | http://localhost:8084 |
| MySQL | internal only (`mysql:3306` on the compose network) |

## Configurazione

All Impostazioni live in a `.env` file Avanti Per `docker-compose.yml`. Every variable has a working default for localhost, so the file is Facoltativo until you customize.

```bash
# .env — everything is optional; shown with defaults
MYSQL_ROOT_PASSWORD=churchapps
JWT_SECRET=please-change-this-jwt-secret
ENCRYPTION_KEY=PleaseChangeThisDockerDefaultKey   # exactly 32 characters

# Public URLs (change these when exposing beyond localhost)
API_URL=http://localhost:8084
B1ADMIN_URL=http://localhost:3101
B1APP_URL=http://localhost:3000
SOCKET_URL=ws://localhost:8084

# Email — see the Railway guide's Email section for provider walkthroughs
MAIL_SYSTEM=
SMTP_HOST=
SMTP_USER=
SMTP_PASS=
SMTP_SECURE=false
SUPPORT_EMAIL=noreply@yourchurch.org
```

Before real use, change `MYSQL_ROOT_PASSWORD`, `JWT_SECRET`, and `ENCRYPTION_KEY` (any 32-character string).

:::warning
The `*_URL` values are **baked into the web apps at build Ora** (standard Vite/Avanti.js behavior). Changing them in `.env` requires a rebuild, not just a restart:

```bash
docker compose up -d --build
```
:::

Changing the MySQL password after first launch requires updating the password inside MySQL too — the volume keeps the old credentials.

## Exposing It Per the Internet

Put any reverse proxy in front and give each Servizio a hostname. With [Caddy](https://caddyserver.com/) it's this:

```
admin.yourchurch.org { reverse_proxy localhost:3101 }
app.yourchurch.org   { reverse_proxy localhost:3000 }
api.yourchurch.org   { reverse_proxy localhost:8084 }
```

Then set the URLs in `.env` and rebuild:

```bash
API_URL=https://api.yourchurch.org
B1ADMIN_URL=https://admin.yourchurch.org
B1APP_URL=https://app.yourchurch.org
SOCKET_URL=wss://api.yourchurch.org
```

```bash
docker compose up -d --build
```

The WebSocket used for chat and live notifications shares the API's port, so `SOCKET_URL` is just the API URL with `wss://`.

## Email, Giving, Multi-Site, and Integrations

These work identically Per the Railway deployment — the same environment variables, set in your `.env` file instead of the Railway dashboard (the compose file passes them through Per the API):

- **[Email / SMTP](./railway-template#1-email-highly-recommended)** — strongly recommended; without it Membri can't reset passwords
- **[Multi-site](./railway-template#3-multi-site-multiple-churches-on-one-instance)** — unlimited churches per instance, managed in the admin UI
- **[Online giving](./railway-template#4-online-giving-stripe--paypal)** — configured per-church in the admin UI, not via env vars
- **[Optional integrations](./railway-template#6-optional-feature-integrations)** — `OPENAI_API_KEY`, `YOUTUBE_API_KEY`, `PEXELS_KEY`, `VIMEO_TOKEN`, `API_BIBLE_KEY`, `WEB_PUSH_PUBLIC_KEY`/`WEB_PUSH_PRIVATE_KEY`, `GOOGLE_RECAPTCHA_SECRET_KEY`

## Data, Backups, and File Storage

Two named Docker volumes hold all state:

| Volume | Contents |
|--------|----------|
| `mysql-data` | All database schemas |
| `api-content` | Uploaded files — photos, documents, website images (mounted at `/app/content`) |

Indietro up the database with a one-liner (schedule it with cron):

```bash
docker compose exec mysql mysqldump -uroot -p"$MYSQL_ROOT_PASSWORD" --all-databases > backup-$(date +%F).sql
```

Indietro up uploaded files by copying the volume:

```bash
docker run --rm -v b1admin_api-content:/data -v "$PWD":/backup alpine tar czf /backup/content-$(date +%F).tgz -C /data .
```

For large media libraries you can switch file storage Per S3 instead of the local volume — set `FILE_STORE=S3` plus the `AWS_*` variables described in the [Railway guide's File Storage section](./railway-template#5-file-storage).

## Updating

The API and B1App build from the `main` branch of their GitHub repos; B1Admin builds from your local clone.

```bash
git pull                              # update B1Admin
docker compose build --pull           # rebuild all images against latest main
docker compose up -d
```

Database migrations run automatically when the API container starts.

Per pin versions instead of tracking `main`, point the build contexts at a tag in `.env`:

```bash
API_CONTEXT=https://github.com/ChurchApps/Api.git#v1.2.3
B1APP_CONTEXT=https://github.com/ChurchApps/B1App.git#v1.2.3
```

Developers can point the same variables at local checkouts (e.g. `API_CONTEXT=../Api`).

## Troubleshooting

| Symptom | Likely cause | Fix |
|---------|--------------|-----|
| `api` container restarts in a loop | MySQL not ready or migration failure | `docker compose logs api` — the migration prints which module failed |
| Login redirects Per `api.churchapps.org` | Web app built without the `custom` stage args | Rebuild: `docker compose build --No-cache b1admin b1app` |
| Changed a URL in `.env` but nothing happened | URLs are baked at build Ora | `docker compose up -d --build` |
| "Check your email" but No email arrives | `MAIL_SYSTEM=SMTP` with bad credentials | Fix credentials, or unset `MAIL_SYSTEM` Per disable email |
| Chat / live features silent | `SOCKET_URL` unreachable from the browser | Must be `wss://` behind HTTPS and proxied Per port 8084 |
| Build dies on a small VPS | Out of memory during `Avanti build` | Aggiungi swap, or build on another machine and `docker Salva`/`load` |

Still stuck? Apri an issue at [github.com/ChurchApps/ChurchAppsSupport/issues](https://github.com/ChurchApps/ChurchAppsSupport/issues) with the output of `docker compose logs`.

## Articoli Correlati

- **[Self-Hosting on Railway](./railway-template)** — managed hosting alternative, plus the shared post-deploy Configurazione guides
- **[Initial Setup](../../getting-started/initial-setup)** — first steps after your church is created
- **[Local API Setup](../api/local-setup)** — running the stack directly for development
