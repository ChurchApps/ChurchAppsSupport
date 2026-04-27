---
title: "Self-Hosting on Railway"
---

# Self-Hosting on Railway

<div class="article-intro">

ChurchApps is published as a one-click [Railway](https://railway.com) template. Deploying it gives your church its own private instance of B1 Admin, the B1 member portal, the API, and a MySQL database — all running on infrastructure you own and pay for directly. This page walks through the deploy and the choices you'll be asked to make.

</div>

<div class="prereqs">
<h4>Before You Begin</h4>

- A free [Railway](https://railway.com) account
- A credit card on file with Railway (the free trial runs out quickly; expect ~$5/month base + metered usage for a small congregation)
- About 15 minutes for the initial deploy and verification
- *Optional but recommended:* a sender email account and SMTP credentials (see [Email Configuration](#email-configuration))

</div>

## What Gets Deployed

The template provisions four services in a single Railway project:

| Service | Purpose | URL after deploy |
|---------|---------|------------------|
| **MySQL** | Stores all data (one instance, multiple schemas) | internal only |
| **Api** | Backend for membership, content, giving, attendance, etc. | `https://api-<id>.up.railway.app` |
| **B1Admin** | Staff/admin web app | `https://b1admin-<id>.up.railway.app` |
| **B1App** | Member-facing web app and church website | `https://b1app-<id>.up.railway.app` |

All four start automatically. Database schemas are created on first launch by the Api's startup migration.

## Step 1 — Click Deploy

1. Open the published template page (your support team will provide the link)
2. Click **Deploy on Railway**
3. Sign in to Railway when prompted
4. Railway will ask you to authorize the **Railway GitHub App** so it can pull the source code from `github.com/ChurchApps/{Api,B1Admin,B1App}`. Approve.

## Step 2 — Fill in Variables

Railway will show a form asking for the template's variables. **All are optional** — you can leave everything blank and the system will still deploy and work for self-registration. The fields you'll see:

### Email (recommended but optional)

| Variable | What to enter | Where to get it |
|----------|---------------|------------------|
| `MAIL_SYSTEM` | `SMTP` to enable email; leave blank to disable | — |
| `SMTP_HOST` | e.g. `smtp.resend.com`, `smtp.gmail.com`, `email-smtp.us-east-2.amazonaws.com` | Your provider |
| `SMTP_USER` | Provider username or API key name | Your provider |
| `SMTP_PASS` | Provider password or API key secret | Your provider |
| `SMTP_SECURE` | `false` for port 587 (most providers) or `true` for port 465 | Your provider's docs |
| `SUPPORT_EMAIL` | Sender address that appears in "from" — e.g. `noreply@yourchurch.org` | You choose |

If left blank, ChurchApps runs in **no-email mode**: members can self-register and use the system, but they cannot recover lost passwords through self-service. An admin must reset passwords via the user list in B1 Admin.

See [Email Configuration](#email-configuration) below for provider-specific details.

### Optional integrations

These unlock specific features and can all be added later via the Railway dashboard.

| Variable | Feature it enables |
|----------|--------------------|
| `OPENAI_API_KEY` *or* `OPENROUTER_API_KEY` | AI-assisted search and content suggestions |
| `STRIPE_SECRET_KEY` | Online giving |
| `GOOGLE_RECAPTCHA_SECRET_KEY` | Bot protection on public forms |
| `YOUTUBE_API_KEY`, `PEXELS_KEY`, `VIMEO_TOKEN` | Sermon and stock-image content selection |
| `API_BIBLE_KEY`, `YOUVERSION_API_KEY` | Bible verse lookups in lessons and content |
| `WEB_PUSH_PUBLIC_KEY` + `WEB_PUSH_PRIVATE_KEY` | Browser push notifications |

### Generated for you

These are filled in automatically by the template. You don't need to touch them:

- `JWT_SECRET`, `ENCRYPTION_KEY` — random secure values
- All `*_CONNECTION_STRING` variables — wired to the included MySQL service
- All `*_PUBLIC_DOMAIN` references — wired between services

## Step 3 — Wait for the First Deploy

The first build takes about 5–10 minutes per service because Railway builds them in parallel from source. You'll see four cards in the project canvas turn green as they come online:

1. **MySQL** comes up first (~30 seconds)
2. **Api** builds, runs database migrations, then starts (~3–5 minutes)
3. **B1Admin** builds and serves the static React app (~3–5 minutes)
4. **B1App** builds the Next.js bundle and starts (~5–8 minutes)

If any service shows red ("Failed"), click into it → **Deployments** → **View Logs** to see the build output.

## Step 4 — Create Your First Account

1. Open the **B1Admin** service URL (visible on the service card in the dashboard)
2. Click **Register**
3. Enter your name, email, and password
4. The first account created is automatically granted **server admin** access

If email is configured, you'll receive a verification code by email. If email is not configured, you'll be taken straight to the "set password" screen — no verification step.

## Step 5 — Create Your Church

After registering and signing in, B1 Admin walks you through creating your church record. This sets up the initial database rows for people, groups, services, and the website.

See [Initial Setup](../../getting-started/initial-setup) for what to do next.

## Email Configuration

Three commonly-used providers and how to plug them in:

### Resend (simplest free option — 100 emails/day)

1. Sign up at [resend.com](https://resend.com)
2. Verify a sending domain (or use the `onboarding@resend.dev` test sender)
3. Create an API key
4. In Railway, set:

```
MAIL_SYSTEM=SMTP
SMTP_HOST=smtp.resend.com
SMTP_USER=resend
SMTP_PASS=re_xxxxxxxxx
SMTP_SECURE=false
SUPPORT_EMAIL=noreply@yourdomain.org
```

### Gmail (free for personal use, ~500/day)

1. Enable 2-factor auth on your Google account
2. Create an [App Password](https://myaccount.google.com/apppasswords)
3. In Railway, set:

```
MAIL_SYSTEM=SMTP
SMTP_HOST=smtp.gmail.com
SMTP_USER=your-gmail-address@gmail.com
SMTP_PASS=<the 16-character app password>
SMTP_SECURE=false
SUPPORT_EMAIL=your-gmail-address@gmail.com
```

### AWS SES (cheapest at scale)

1. Verify a sending domain in your AWS account
2. Move out of SES sandbox if needed
3. Create SMTP credentials under **SES → SMTP Settings → Create credentials**
4. In Railway, set:

```
MAIL_SYSTEM=SMTP
SMTP_HOST=email-smtp.us-east-2.amazonaws.com
SMTP_USER=AKIA...
SMTP_PASS=<SES SMTP password>
SMTP_SECURE=false
SUPPORT_EMAIL=noreply@yourdomain.org
```

:::tip
After changing email variables, the Api service redeploys automatically. Test by triggering a password reset on a test account.
:::

## Custom Domains

To use your own domain instead of `*.up.railway.app`:

1. In the Railway dashboard, open each web service → **Settings** → **Networking**
2. Click **+ Custom Domain** and enter the hostname (e.g. `admin.yourchurch.org`)
3. Add the CNAME record Railway shows you to your DNS
4. Wait for the DNS to propagate (usually a few minutes)
5. Update the **Api** service's `B1ADMIN_ROOT` variable to the new admin domain so verification emails point at the right place

## File Storage

The template provisions a **1 GB persistent volume** mounted at `/app/content` on the Api service. Member photos, sermon files, and uploaded documents go there. To grow it, open the Api service → **Volumes** → adjust size.

For larger deployments, configure S3 instead by setting:

```
FILE_STORE=S3
AWS_S3_BUCKET=<your-bucket>
AWS_ACCESS_KEY_ID=<key>
AWS_SECRET_ACCESS_KEY=<secret>
AWS_REGION=us-east-2
```

## Updating

The services are linked to GitHub. Each push to `main` on `ChurchApps/Api`, `ChurchApps/B1Admin`, or `ChurchApps/B1App` triggers an automatic redeploy.

To pin a specific version, change the **Branch** setting on each service to a tag or release branch.

## Costs

Real-world ranges for a small church (under 200 members, light traffic):

| Component | Approx monthly cost |
|-----------|---------------------|
| Railway base | $5 |
| MySQL plugin | $5 + ~$1 storage |
| 3 web services compute | $3–10 combined |
| 1 GB volume | $0.25 |
| **Total** | **~$15–25/month** |

Costs scale linearly with traffic, photo uploads, and database size. Railway shows live usage in the project's **Usage** tab.

## Troubleshooting

| Symptom | Likely cause | Fix |
|---------|--------------|-----|
| Build fails with `EBUSY: rmdir '/app/node_modules/.cache'` | Nixpacks cache mount conflict | Set `NIXPACKS_NO_CACHE=true` on the affected service |
| Build fails on B1Admin with `Missing: @types/...` | Out-of-sync `package-lock.json` | Already addressed in main; pull the latest version |
| Api deploy hangs at "Deploying" | Healthcheck failing — check `/health` returns 200 | View deploy logs; usually a missing required env var |
| B1Admin shows "check your email" but no email sent | `MAIL_SYSTEM=SMTP` set but credentials missing or wrong | Either provide working SMTP creds or set `MAIL_SYSTEM=` (empty) |
| Login redirects to `api.churchapps.org` | `REACT_APP_STAGE` set to `prod` | Set `REACT_APP_STAGE=custom` on the B1Admin service |

If you hit something not on this list, open an issue at [github.com/ChurchApps/Api/issues](https://github.com/ChurchApps/Api/issues) with the deploy logs attached.

## Related Articles

- **[Initial Setup](../../getting-started/initial-setup)** — First steps after your church is created
- **[Local API Setup](../api/local-setup)** — Running the stack locally for development
- **[API Deployment (AWS)](./apis)** — How the official ChurchApps SaaS is deployed
