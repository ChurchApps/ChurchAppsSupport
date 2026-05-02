---
title: "Self-Hosting on Railway"
---

# Self-Hosting on Railway

<div class="article-intro">

ChurchApps publishes a one-click [Railway](https://railway.com) template that gives your church its own private instance of B1 Admin, the B1 member portal, the API, and a MySQL database — all running on infrastructure you own and pay for directly. This guide gets you live in about 15 minutes and then walks through the post-deploy configuration most churches eventually want.

</div>

## Quick Start

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/b1-template)

1. Click the **Deploy on Railway** button above.
2. Sign in to Railway (or create a free account) and add a payment method.
3. Click **Deploy** without changing anything — every variable has a sensible default.
4. Wait 5–10 minutes for the four services to turn green.
5. Open the **B1Admin** service URL, click **Register**, and create your account. The first account is automatically a server admin.
6. Follow the in-app prompts to create your first church.

That's it. You now have a fully working ChurchApps instance. Everything below is optional polish.

:::tip
The deploy is currently in **beta**. If you hit something the docs don't cover, please open an issue at [github.com/ChurchApps/Api/issues](https://github.com/ChurchApps/Api/issues) with deploy logs attached.
:::

<div class="prereqs">
<h4>What You Need</h4>

- A free [Railway](https://railway.com) account
- A credit card on file with Railway (~$15–25/month for a small congregation; see [Costs](#costs))
- About 15 minutes for the initial deploy
- *Optional but strongly recommended later:* SMTP credentials and a custom domain

</div>

## What Gets Deployed

The template provisions four services in a single Railway project:

| Service | Purpose | URL after deploy |
|---------|---------|------------------|
| **MySQL** | Stores all data (one instance, multiple schemas) | internal only |
| **Api** | Backend for membership, content, giving, attendance, etc. | `https://api-<id>.up.railway.app` |
| **B1Admin** | Staff/admin web app | `https://b1admin-<id>.up.railway.app` |
| **B1App** | Member-facing web app and church website | `https://b1app-<id>.up.railway.app` |

Database schemas are created automatically on first launch by the API's startup migration.

## First-Time Configuration

Now that you're up, here are the things most churches set up next, roughly in priority order.

### 1. Email (Highly Recommended)

Without email, members can still register and use the system, but **they can't reset forgotten passwords** — an admin has to do it for them. Setting up SMTP takes about 5 minutes.

In the Railway dashboard, open the **Api** service → **Variables**, and add:

```
MAIL_SYSTEM=SMTP
SMTP_HOST=<your provider host>
SMTP_USER=<your username>
SMTP_PASS=<your password or API key>
SMTP_SECURE=false
SUPPORT_EMAIL=noreply@yourchurch.org
```

Three providers worth knowing about:

#### Resend — simplest free option (100 emails/day)

1. Sign up at [resend.com](https://resend.com).
2. Verify a sending domain (or use the `onboarding@resend.dev` test sender to start).
3. Create an API key.
4. Set `SMTP_HOST=smtp.resend.com`, `SMTP_USER=resend`, `SMTP_PASS=re_xxxxxxxxx`.

#### Gmail — free for personal use (~500/day)

1. Enable 2-factor auth on the Google account.
2. Create an [App Password](https://myaccount.google.com/apppasswords).
3. Set `SMTP_HOST=smtp.gmail.com`, `SMTP_USER=your-address@gmail.com`, `SMTP_PASS=<the 16-character app password>`.

#### AWS SES — cheapest at scale

1. Verify a sending domain in AWS.
2. Move out of SES sandbox if you'll send to non-verified addresses.
3. Create SMTP credentials under **SES → SMTP Settings → Create credentials**.
4. Set `SMTP_HOST=email-smtp.us-east-2.amazonaws.com`, `SMTP_USER=AKIA...`, `SMTP_PASS=<SES SMTP password>`.

After saving the variables, the Api service redeploys automatically. Test it by triggering a password reset on a test account.

:::warning
If you set `MAIL_SYSTEM=SMTP` with bad credentials, registration will appear to succeed but the verification email never arrives. Either fix the credentials or unset `MAIL_SYSTEM` to fall back to no-email mode.
:::

### 2. Custom Domains

The default `*.up.railway.app` URLs work, but most churches want their own.

For each web service (B1Admin and B1App):

1. Open the service in Railway → **Settings** → **Networking**.
2. Click **+ Custom Domain** and enter the hostname:
   - `admin.yourchurch.org` for B1Admin
   - `app.yourchurch.org` (or `www`) for B1App
3. Add the CNAME record Railway shows you to your DNS provider.
4. Wait a few minutes for DNS to propagate. Railway provisions the TLS certificate automatically.

Then update the **Api** service variables so links in emails use the new domains:

```
B1ADMIN_ROOT=https://admin.yourchurch.org
```

And on the **B1Admin** service:

```
REACT_APP_API_BASE=https://api.yourchurch.org   (if you also set a custom API domain)
REACT_APP_B1_WEBSITE_URL=https://{subdomain}.yourchurch.org
```

The `{subdomain}` token is literal — it's replaced at runtime with each church's subdomain (see Multi-Site below).

### 3. Multi-Site (Multiple Churches on One Instance)

ChurchApps is multi-tenant by design — one deployment can host any number of churches, each with its own people, groups, and website. New churches are added entirely through the admin UI; no infrastructure changes needed.

#### Adding additional churches

1. In **B1 Admin**, navigate to **Settings → Manage Church → Switch Church → Create New**.
2. Each church has a unique **subdomain slug** (e.g. `firstchurch`, `gracecommunity`).
3. The new church gets its own data, members, website, and giving setup, fully isolated from other churches on the same instance.

#### Routing each church to its own URL

Two ways to expose churches publicly:

| Pattern | Example | Setup |
|---------|---------|-------|
| **Path-based** (works out of the box) | `app.yourchurch.org/firstchurch` | No extra setup |
| **Subdomain-based** (cleaner URLs) | `firstchurch.yourchurch.org` | Wildcard DNS + wildcard custom domain |

For **subdomain-based** routing on Railway:

1. In your DNS provider, create a wildcard CNAME: `*.yourchurch.org → <b1app railway target>`.
2. In Railway, on the B1App service → **Settings → Networking**, add `*.yourchurch.org` as a custom domain.
3. On the **B1Admin** service, set `REACT_APP_B1_WEBSITE_URL=https://{subdomain}.yourchurch.org`.

After redeploy, each church's site is served at `<their-subdomain>.yourchurch.org` automatically.

:::info
Wildcard custom domains require a paid Railway plan. Path-based routing works on every plan and is functionally identical — just less pretty in the URL bar.
:::

### 4. Online Giving (Stripe / PayPal)

Giving is configured **per-church inside the admin UI**, not via environment variables — that way each church can use its own merchant account.

1. Get developer credentials from [Stripe](https://dashboard.stripe.com/) (Developers → API keys) or [PayPal](https://developer.paypal.com/) (My Apps & Credentials).
2. In B1 Admin, go to **Settings → Giving Settings**.
3. Choose your provider, paste the Public and Secret keys, and configure fee handling.
4. Optionally add `GOOGLE_RECAPTCHA_SECRET_KEY` to the **Api** service in Railway to protect public donation forms from bots.

### 5. File Storage

The template provisions a **1 GB persistent volume** mounted on the Api service for member photos, sermon files, and uploaded documents.

To grow it: open the Api service → **Volumes** → adjust the size slider.

For larger deployments (100+ GB or many concurrent uploads), switch to S3 by setting these on the **Api** service:

```
FILE_STORE=S3
AWS_S3_BUCKET=<your-bucket>
AWS_ACCESS_KEY_ID=<key>
AWS_SECRET_ACCESS_KEY=<secret>
AWS_REGION=us-east-2
```

Existing files in the volume don't migrate automatically — copy them to the bucket before flipping the variable.

### 6. Optional Feature Integrations

These unlock specific features and can all be added later via the Railway dashboard. Set them on the **Api** service.

| Variable | Feature it enables |
|----------|--------------------|
| `OPENAI_API_KEY` *or* `OPENROUTER_API_KEY` | AI-assisted search and content suggestions |
| `YOUTUBE_API_KEY` | YouTube sermon search and embedding |
| `PEXELS_KEY` | Stock-image picker for website builder |
| `VIMEO_TOKEN` | Vimeo sermon support |
| `API_BIBLE_KEY` | Bible verse lookups in lessons and content |
| `YOUVERSION_API_KEY` | YouVersion Bible integration |
| `WEB_PUSH_PUBLIC_KEY` + `WEB_PUSH_PRIVATE_KEY` | Browser push notifications (generate a VAPID keypair) |
| `HUBSPOT_KEY` | Optional CRM sync for new registrations |

## Updating

Each service is linked to its respective GitHub repo. Pushes to `main` on `ChurchApps/Api`, `ChurchApps/B1Admin`, or `ChurchApps/B1App` trigger automatic redeploys.

To pin a specific version, change the **Branch** setting on each service to a tag or release branch. This is the recommended setup for production — auto-deploying from `main` means you inherit any in-progress work.

## Costs

Real-world ranges for a small church (under 200 members, light traffic):

| Component | Approx monthly cost |
|-----------|---------------------|
| Railway base | $5 |
| MySQL plugin | $5 + ~$1 storage |
| 3 web services compute | $3–10 combined |
| 1 GB volume | $0.25 |
| **Total** | **~$15–25/month** |

Costs scale linearly with traffic, photo uploads, and database size. Railway shows live usage in the project's **Usage** tab — set spending limits there to cap your exposure.

## Troubleshooting

| Symptom | Likely cause | Fix |
|---------|--------------|-----|
| Build fails with `EBUSY: rmdir '/app/node_modules/.cache'` | Nixpacks cache mount conflict | Set `NIXPACKS_NO_CACHE=true` on the affected service |
| Build fails on B1Admin with `Missing: @types/...` | Out-of-sync `package-lock.json` | Pull the latest `main` |
| Api deploy hangs at "Deploying" | Healthcheck failing — `/health` not returning 200 | View deploy logs; usually a missing required env var |
| B1Admin shows "check your email" but no email arrives | `MAIL_SYSTEM=SMTP` set but credentials missing/wrong | Fix the credentials, or unset `MAIL_SYSTEM` to disable email |
| Login redirects to `api.churchapps.org` | `REACT_APP_STAGE` is `prod` | Set `REACT_APP_STAGE=custom` on the B1Admin service |
| Subdomain churches all show the same content | `REACT_APP_B1_WEBSITE_URL` doesn't include `{subdomain}` token | Set it to e.g. `https://{subdomain}.yourchurch.org` |
| Custom domain shows "Application not found" | DNS not yet propagated, or Railway cert pending | Wait 5 minutes; check DNS with `dig admin.yourchurch.org` |

If you hit something not on this list, open an issue at [github.com/ChurchApps/Api/issues](https://github.com/ChurchApps/Api/issues) with the deploy logs attached.

## Related Articles

- **[Initial Setup](../../getting-started/initial-setup)** — First steps after your church is created
- **[Website Initial Setup](../../b1-admin/website/initial-setup)** — Configure your church's public site
- **[Giving Settings](../../b1-admin/donations/online-giving-setup)** — Wire up Stripe or PayPal
- **[Local API Setup](../api/local-setup)** — Running the stack locally for development
- **[API Deployment (AWS)](./apis)** — How the official ChurchApps SaaS is deployed
