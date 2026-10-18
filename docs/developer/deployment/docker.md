---
title: "Self-Hosting with Docker"
---

# Self-Hosting with Docker

<div class="article-intro">

Run your own private instance of B1 Admin, the B1 member portal and website, the API, and a MySQL database on any machine with Docker — a home server, a small VPS, or an on-prem box. One command installs it, one command upgrades it, and every upgrade takes a backup first. If you'd rather not manage a server at all, see [Self-Hosting on Railway](./railway-template) for the managed alternative.

</div>

## Quick Start

<div class="prereqs">
<h4>What You Need</h4>

- A Linux machine (or macOS / Windows with WSL or Git Bash — the `b1` helper is a bash script) with [Docker Engine](https://docs.docker.com/engine/install/) and Compose v2 (included in Docker Desktop)
- About 2 GB of RAM and 5 GB of disk
- For a public site: a domain name pointed at the machine, with ports 80 and 443 reachable

</div>

```bash
curl -fsSL https://raw.githubusercontent.com/ChurchApps/B1Admin/main/deploy/install.sh | bash -s -- --domain church.example.org
```

Leave out `--domain` to run on `http://localhost`. The installer creates a `b1church` folder, writes a `.env` with freshly generated secrets, pulls the prebuilt images from GitHub Container Registry, and waits until the API reports healthy. Nothing is built on your machine, so the first start takes a minute or two.

When it finishes:

1. Open **https://church.example.org/admin** (or http://localhost/admin) and click **Register**. The first account is automatically a server admin.
2. Follow the in-app prompts to create your first church. Its website and member portal are live at **https://church.example.org/** as soon as it exists.

Everything runs behind one domain:

| Path | Service |
|------|---------|
| `/` | B1App — church website and member portal |
| `/admin` | B1Admin — staff dashboard |
| `/api` | API, uploaded files, and the live-updates websocket |

HTTPS is automatic: the bundled [Caddy](https://caddyserver.com/) proxy obtains and renews a Let's Encrypt certificate for the domain in `.env`. Only ports 80 and 443 are exposed; the database is reachable from inside the Docker network only.

## The `b1` command

The installer leaves a `deploy/b1` script next to `docker-compose.yml`. It is the only thing you need day to day:

| Command | What it does |
|---------|--------------|
| `./deploy/b1 upgrade` | Pull the current release, take a backup, restart, and verify the API is healthy |
| `./deploy/b1 upgrade 2026.10.1` | Same, pinned to a specific release |
| `./deploy/b1 backup` | Snapshot the database, uploaded files, and `.env` into `backups/<timestamp>/` |
| `./deploy/b1 restore backups/<timestamp>` | Put a snapshot back (the API stops while it runs) |
| `./deploy/b1 rollback` | Restore the newest backup, including the release it was taken on |
| `./deploy/b1 status` | Installed version and container health |
| `./deploy/b1 logs api` | Follow a service's logs |

Releases are published as one versioned bundle so the three images always match. `B1_VERSION=stable` in `.env` tracks the latest release; set it to a specific version to pin. Release notes live under [B1Admin releases](https://github.com/ChurchApps/B1Admin/releases).

## Configuration

All settings live in `.env` next to `docker-compose.yml`. The installer fills in the required ones:

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

After editing `.env`, apply it with `docker compose up -d`. The web apps work out which API to talk to from the address in the browser, so changing the domain only needs `SITE_ADDRESS` and `PUBLIC_URL` updated and a restart — no rebuild.

:::warning
Keep `.env` safe. `ENCRYPTION_KEY` protects stored payment-gateway and storage credentials; a backup without it cannot decrypt them. `./deploy/b1 backup` includes a copy for that reason.
:::

### Moving to a domain later

If you installed on `localhost` and later want it public: point DNS at the machine, set `DOMAIN`, `SITE_ADDRESS` (the bare domain) and `PUBLIC_URL` (`https://` + domain) in `.env`, then `docker compose up -d`. Caddy fetches a certificate on the first request.

## Email, Giving, Multi-Site, and Integrations

These work exactly as on Railway — the same environment variables, set in `.env` instead of the Railway dashboard:

- **[Email / SMTP](./railway-template#1-email-highly-recommended)** — provider walkthroughs for Resend, Brevo, and Gmail
- **[Multi-site](./railway-template#3-multi-site-multiple-churches-on-one-instance)** — unlimited churches per instance. `/` serves the church whose slug is `DEFAULT_CHURCH_SLUG` (the first church is `church`); point extra domains at the box and map them under **Settings → Domains** in B1Admin
- **[Online giving](./railway-template#4-online-giving-stripe--paypal)** — configured per church in the admin UI
- **[Optional integrations](./railway-template#6-optional-feature-integrations)** — `OPENAI_API_KEY`, `YOUTUBE_API_KEY`, `PEXELS_KEY`, `VIMEO_TOKEN`, `API_BIBLE_KEY`, `WEB_PUSH_*`, `GOOGLE_RECAPTCHA_SECRET_KEY`

Invitations and other church-sent email are enabled automatically on a self-hosted instance (the hosted service gates these behind a manual review to protect its sender reputation).

## Data, Backups, and File Storage

Three named Docker volumes hold all state:

| Volume | Contents |
|--------|----------|
| `b1church_mysql-data` | All database schemas |
| `b1church_api-content` | Uploaded files — photos, documents, website images |
| `b1church_caddy-data` | TLS certificates |

`./deploy/b1 backup` writes a consistent snapshot of the first two plus `.env` to `backups/<timestamp>/`. Schedule it with cron and copy the folder somewhere off the machine:

```
0 3 * * * cd /opt/b1church && ./deploy/b1 backup >> backups/backup.log 2>&1
```

For large media libraries you can switch file storage to S3 — set `FILE_STORE=S3` plus the `AWS_*` variables described in the [Railway guide's File Storage section](./railway-template#5-file-storage). Database backups do not include S3 objects; enable bucket versioning there.

## Updating

```bash
./deploy/b1 upgrade
```

In order: pulls the release, takes a backup, recreates the containers, runs any pending database migrations as the API starts, and waits for the API's health check. If anything fails it stops and tells you to run `./deploy/b1 rollback`, which restores that backup and the previous release. Migrations are forward-only; rolling back always means restoring the snapshot.

Upgrading from the beta compose file (the one that built images from source) works the same way once you have a `.env`: it used `MYSQL_ROOT_PASSWORD=churchapps` by default, so put that in `.env` along with `PUBLIC_URL` and `SITE_ADDRESS`, replace `docker-compose.yml` and `deploy/` with the current files, and run `./deploy/b1 upgrade`.

## Building from source

Developers can build the images locally instead of pulling them:

```bash
docker compose -f docker-compose.yml -f docker-compose.build.yml up -d --build
```

`API_CONTEXT` and `B1APP_CONTEXT` in `.env` point the builds at local checkouts (e.g. `../Api`) or a git ref.

## Troubleshooting

| Symptom | Likely cause | Fix |
|---------|--------------|-----|
| `api` container restarts in a loop | migration failure or wrong database password | `./deploy/b1 logs api` — the migration prints which module failed |
| Browser shows a certificate warning | DNS not pointing here yet, or port 80/443 blocked | fix DNS / firewall; Caddy retries on its own |
| `/` shows a dashboard instead of the website | no church yet, or `DEFAULT_CHURCH_SLUG` doesn't match | create the church, or set the slug from **Settings → Church** |
| "Check your email" but no email arrives | `MAIL_SYSTEM=SMTP` with bad credentials | fix credentials, or unset `MAIL_SYSTEM` to disable email |
| Chat / live features silent | websocket blocked by another proxy in front | the socket is on `/api/` over the same port; allow `Upgrade` headers |
| `install` refuses: "database volume already exists" | leftovers from an earlier install | `docker compose down -v` to wipe, or write a `.env` and use `upgrade` |

Still stuck? Open an issue at [github.com/ChurchApps/ChurchAppsSupport/issues](https://github.com/ChurchApps/ChurchAppsSupport/issues) with the output of `./deploy/b1 logs`.

## Related Articles

- **[Self-Hosting on Railway](./railway-template)** — managed hosting alternative, plus the shared post-deploy configuration guides
- **[Initial Setup](../../getting-started/initial-setup)** — first steps after your church is created
- **[Local API Setup](../api/local-setup)** — running the stack directly for development
