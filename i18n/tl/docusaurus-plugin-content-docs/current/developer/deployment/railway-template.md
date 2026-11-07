---
title: "Self-Hosting sa Railway"
description: "I-deploy ang pribadong ChurchApps sa Railway sa mga 15 minuto, at i-configure ang email, custom domain, giving, at file storage para sa B1 Admin at B1App."
---

# Self-Hosting sa Railway

<div class="article-intro">

Naglalathala ang ChurchApps ng one-click na [Railway](https://railway.com) template na nagbibigay sa simbahan mo ng sarili nitong pribadong instance ng B1 Admin, ng B1 member portal, ng API, at ng MySQL database -- lahat ay tumatakbo sa imprastrakturang pag-aari mo at direktang binabayaran mo. Naka-live ka sa loob ng humigit-kumulang 15 minuto, pagkatapos ay tatalakayin ang post-deploy na configuration na gusto ng karamihan ng simbahan sa bandang huli.

</div>

## Mabilisang Simula

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/b1-template)

1. I-click ang butones na **Deploy on Railway** sa itaas.
2. Mag-sign in sa Railway (o gumawa ng libreng account) at maglagay ng paraan ng pagbabayad.
3. I-click ang **Deploy** nang hindi binabago ang anuman -- may makatwirang default ang bawat variable.
4. Maghintay ng 5–10 minuto para maging berde ang apat na serbisyo.
5. Buksan ang URL ng serbisyong **B1Admin**, i-click ang **Register**, at gumawa ng account mo. Ang unang account ay awtomatikong server admin.
6. Sundin ang mga prompt sa loob ng app para gumawa ng unang simbahan mo.

Iyon lang. Mayroon ka nang ganap na gumaganang ChurchApps instance. Ang lahat sa ibaba ay opsyonal na pagpapaganda.

:::tip
Kasalukuyang nasa **beta** ang deploy. Kung may makaharap kang bagay na hindi sakop ng dokumentasyon, magbukas ng issue sa [github.com/ChurchApps/Api/issues](https://github.com/ChurchApps/Api/issues) at ilakip ang deploy logs.
:::

<div class="prereqs">
<h4>Ano ang Kailangan Mo</h4>

- Libreng account sa [Railway](https://railway.com)
- Credit card na naka-file sa Railway (~$15–25/buwan para sa maliit na kongregasyon; tingnan ang [Costs](#costs))
- Mga 15 minuto para sa paunang deploy
- *Opsyonal pero lubos na inirerekomenda sa bandang huli:* SMTP credential at custom na domain

</div>

## Ano ang Dine-deploy

Naglalaan ang template ng apat na serbisyo sa iisang Railway project:

| Serbisyo | Layunin | URL pagkatapos ng deploy |
|---------|---------|------------------|
| **MySQL** | Nag-iimbak ng lahat ng datos (isang instance, maraming schema) | internal lang |
| **Api** | Backend para sa membership, content, giving, attendance, atbp. | `https://api-<id>.up.railway.app` |
| **B1Admin** | Web app ng staff/admin | `https://b1admin-<id>.up.railway.app` |
| **B1App** | Web app na nakaharap sa miyembro at website ng simbahan | `https://b1app-<id>.up.railway.app` |

Awtomatikong nalilikha ang mga database schema sa unang paglunsad sa pamamagitan ng startup migration ng API.

## Unang Configuration

Ngayong nakatakbo na ito, narito ang mga bagay na karaniwang sine-set up ng mga simbahan susunod, halos ayon sa prayoridad.

### 1. Email (Lubos na Inirerekomenda) {#1-email-highly-recommended}

Kung walang email, makakapagparehistro at makakagamit pa rin ng sistema ang mga miyembro, pero **hindi nila maire-reset ang nakalimutang password** -- kailangan itong gawin ng admin para sa kanila. Ang pag-set up ng SMTP ay humigit-kumulang 5 minuto.

Sa Railway dashboard, buksan ang serbisyong **Api** → **Variables**, at idagdag:

```
MAIL_SYSTEM=SMTP
SMTP_HOST=<host ng iyong provider>
SMTP_USER=<iyong username>
SMTP_PASS=<iyong password o API key>
SMTP_SECURE=false
SUPPORT_EMAIL=noreply@yourchurch.org
```

Tatlong provider na sulit malaman:

#### Resend -- pinakasimpleng libreng opsyon (100 email/araw)

1. Mag-sign up sa [resend.com](https://resend.com).
2. I-verify ang isang sending domain (o gamitin ang test sender na `onboarding@resend.dev` para magsimula).
3. Gumawa ng API key.
4. Itakda ang `SMTP_HOST=smtp.resend.com`, `SMTP_USER=resend`, `SMTP_PASS=re_xxxxxxxxx`.

#### Gmail -- libre para sa personal na gamit (~500/araw)

1. I-enable ang 2-factor auth sa Google account.
2. Gumawa ng [App Password](https://myaccount.google.com/apppasswords).
3. Itakda ang `SMTP_HOST=smtp.gmail.com`, `SMTP_USER=your-address@gmail.com`, `SMTP_PASS=<ang 16-character na app password>`.

#### AWS SES -- pinakamura sa malaking sukat

1. I-verify ang isang sending domain sa AWS.
2. Lumabas sa SES sandbox kung magpapadala ka sa mga hindi na-verify na address.
3. Gumawa ng SMTP credential sa ilalim ng **SES → SMTP Settings → Create credentials**.
4. Itakda ang `SMTP_HOST=email-smtp.us-east-2.amazonaws.com`, `SMTP_USER=AKIA...`, `SMTP_PASS=<SES SMTP password>`.

Pagkatapos i-save ang mga variable, awtomatikong mag-re-deploy ang serbisyong Api. Subukan ito sa pamamagitan ng pag-trigger ng password reset sa test account.

:::warning
Kung itatakda mo ang `MAIL_SYSTEM=SMTP` na may maling credential, mukhang matagumpay ang registration pero hindi kailanman dumarating ang verification email. Ayusin ang credential o alisin ang `MAIL_SYSTEM` para bumalik sa no-email mode.
:::

### 2. Mga Custom Domain

Gumagana ang default na URL na `*.up.railway.app`, pero karamihan ng simbahan ay gustong magkaroon ng sarili nila.

Para sa bawat web service (B1Admin at B1App):

1. Buksan ang serbisyo sa Railway → **Settings** → **Networking**.
2. I-click ang **+ Custom Domain** at ilagay ang hostname:
   - `admin.yourchurch.org` para sa B1Admin
   - `app.yourchurch.org` (o `www`) para sa B1App
3. Idagdag ang CNAME record na ipinapakita ng Railway sa iyong DNS provider.
4. Maghintay ng ilang minuto para ma-propagate ang DNS. Awtomatikong ginagawa ng Railway ang TLS certificate.

Pagkatapos, i-update ang mga variable ng serbisyong **Api** para tumuro sa mga bagong domain ang mga link sa email:

```
B1ADMIN_ROOT=https://admin.yourchurch.org
```

At sa serbisyong **B1Admin**:

```
REACT_APP_API_BASE=https://api.yourchurch.org   (kung nagtakda ka rin ng custom na API domain)
REACT_APP_B1_WEBSITE_URL=https://{subdomain}.yourchurch.org
```

Literal ang token na `{subdomain}` -- pinapalitan ito sa runtime ng subdomain ng bawat simbahan (tingnan ang Multi-Site sa ibaba).

### 3. Multi-Site (Maraming Simbahan sa Iisang Instance) {#3-multi-site-multiple-churches-on-one-instance}

Multi-tenant ang ChurchApps sa disenyo -- kayang mag-host ng iisang deployment ng anumang bilang ng simbahan, bawat isa ay may sariling mga tao, grupo, at website. Ganap sa pamamagitan ng admin UI idinadagdag ang mga bagong simbahan; walang kailangang baguhin sa imprastraktura.

#### Pagdaragdag ng karagdagang simbahan

1. Sa **B1 Admin**, pumunta sa **Settings → Manage Church → Switch Church → Create New**.
2. Bawat simbahan ay may natatanging **subdomain slug** (hal. `firstchurch`, `gracecommunity`).
3. Ang bagong simbahan ay makakakuha ng sarili nitong data, miyembro, website, at giving setup, ganap na hiwalay sa ibang simbahan sa parehong instance.

#### Pagturo ng bawat simbahan sa sarili nitong URL

Dalawang paraan para ilantad ang mga simbahan sa publiko:

| Pattern | Halimbawa | Setup |
|---------|---------|-------|
| **Nakabatay sa path** (gumagana kaagad) | `app.yourchurch.org/firstchurch` | Walang dagdag na setup |
| **Nakabatay sa subdomain** (mas malinis na URL) | `firstchurch.yourchurch.org` | Wildcard DNS + wildcard custom domain |

Para sa routing na **nakabatay sa subdomain** sa Railway:

1. Sa iyong DNS provider, gumawa ng wildcard CNAME: `*.yourchurch.org → <b1app railway target>`.
2. Sa Railway, sa serbisyong B1App → **Settings → Networking**, idagdag ang `*.yourchurch.org` bilang custom domain.
3. Sa serbisyong **B1Admin**, itakda ang `REACT_APP_B1_WEBSITE_URL=https://{subdomain}.yourchurch.org`.

Pagkatapos ng redeploy, awtomatikong ihahain ang site ng bawat simbahan sa `<their-subdomain>.yourchurch.org`.

:::info
Nangangailangan ng bayad na plan ng Railway ang mga wildcard custom domain. Gumagana ang routing na nakabatay sa path sa bawat plan at halos magkapareho ang gamit -- mas pangit lang sa address bar.
:::

### 4. Online Giving (Stripe / PayPal) {#4-online-giving-stripe--paypal}

Naka-configure ang giving **kada simbahan sa loob ng admin UI**, hindi sa pamamagitan ng environment variable -- para magamit ng bawat simbahan ang sarili nitong merchant account.

1. Kumuha ng developer credential mula sa [Stripe](https://dashboard.stripe.com/) (Developers → API keys) o [PayPal](https://developer.paypal.com/) (My Apps & Credentials).
2. Sa B1 Admin, pumunta sa **Settings → Giving Settings**.
3. Piliin ang iyong provider, i-paste ang Public at Secret key, at i-configure ang paghawak ng bayarin.
4. Opsyonal, idagdag ang `GOOGLE_RECAPTCHA_SECRET_KEY` sa serbisyong **Api** sa Railway para protektahan ang mga pampublikong donation form laban sa bot.

### 5. File Storage {#5-file-storage}

Naglalaan ang template ng **1 GB na persistent volume** na naka-mount sa serbisyong Api para sa mga larawan ng miyembro, sermon file, at mga na-upload na dokumento.

Para palakihin ito: buksan ang serbisyong Api → **Volumes** → ayusin ang slider ng laki.

Para sa mas malalaking deployment (100+ GB o maraming sabay-sabay na upload), lumipat sa S3 sa pamamagitan ng pagtatakda ng mga ito sa serbisyong **Api**:

```
FILE_STORE=S3
AWS_S3_BUCKET=<your-bucket>
AWS_ACCESS_KEY_ID=<key>
AWS_SECRET_ACCESS_KEY=<secret>
AWS_REGION=us-east-2
```

Hindi awtomatikong lumilipat ang umiiral na file sa volume -- kopyahin ang mga ito sa bucket bago palitan ang variable.

### 6. Mga Opsyonal na Integration ng Feature {#6-optional-feature-integrations}

Ina-unlock ng mga ito ang partikular na feature at maaaring idagdag sa bandang huli sa pamamagitan ng Railway dashboard. Itakda ang mga ito sa serbisyong **Api**.

| Variable | Feature na pinagagana nito |
|----------|--------------------|
| `OPENAI_API_KEY` *o* `OPENROUTER_API_KEY` | Paghahanap na tinutulungan ng AI at mga mungkahi sa nilalaman |
| `YOUTUBE_API_KEY` | Paghahanap at pag-embed ng sermon sa YouTube |
| `PEXELS_KEY` | Picker ng stock na larawan para sa website builder |
| `VIMEO_TOKEN` | Suporta sa sermon sa Vimeo |
| `API_BIBLE_KEY` | Paghahanap ng bersikulo sa Bibliya sa mga aralin at nilalaman |
| `YOUVERSION_API_KEY` | Integration ng YouVersion Bible |
| `WEB_PUSH_PUBLIC_KEY` + `WEB_PUSH_PRIVATE_KEY` | Browser push notification ([gumawa ng VAPID keypair](./docker.md#push-notifications)) |
| `HUBSPOT_KEY` | Opsyonal na CRM sync para sa mga bagong registration |

## Pag-update

Naka-link ang bawat serbisyo sa kaukulang GitHub repo nito. Ang mga push sa `main` ng `ChurchApps/Api`, `ChurchApps/B1Admin`, o `ChurchApps/B1App` ay nagti-trigger ng awtomatikong redeploy.

Para mag-pin ng partikular na bersyon, palitan ang setting na **Branch** ng bawat serbisyo sa isang tag o release branch. Ito ang inirerekomendang setup para sa production -- ang awtomatikong pag-deploy mula sa `main` ay nangangahulugang sasalo ka sa anumang gawaing nasa progreso pa.

## Mga Gastos {#costs}

Mga tunay na saklaw para sa maliit na simbahan (wala pang 200 miyembro, magaan na trapiko):

| Bahagi | Tinatayang buwanang gastos |
|-----------|---------------------|
| Railway base | $5 |
| MySQL plugin | $5 + ~$1 storage |
| Compute ng 3 web service | $3–10 pinagsama |
| 1 GB volume | $0.25 |
| **Kabuuan** | **~$15–25/buwan** |

Tumataas nang linear ang gastos kasabay ng trapiko, mga upload ng larawan, at laki ng database. Ipinapakita ng Railway ang live na paggamit sa tab na **Usage** ng project -- magtakda ng spending limit doon para limitahan ang iyong exposure.

## Troubleshooting

| Sintomas | Malamang na sanhi | Ayos |
|---------|--------------|-----|
| Pumapalya ang build sa `EBUSY: rmdir '/app/node_modules/.cache'` | Banggaan ng cache mount ng Nixpacks | Itakda ang `NIXPACKS_NO_CACHE=true` sa apektadong serbisyo |
| Pumapalya ang build ng B1Admin sa `Missing: @types/...` | Hindi nakasabay na `package-lock.json` | Hilahin ang pinakabagong `main` |
| Nabibitin ang deploy ng Api sa "Deploying" | Pumapalya ang healthcheck -- hindi nagbabalik ng 200 ang `/health` | Tingnan ang deploy logs; kadalasan ay kulang na kinakailangang env variable |
| Nagpapakita ang B1Admin ng "check your email" pero walang dumarating na email | Nakatakda ang `MAIL_SYSTEM=SMTP` pero kulang o mali ang credential | Ayusin ang credential, o alisin ang `MAIL_SYSTEM` para i-disable ang email |
| Nagre-redirect ang login sa `api.churchapps.org` | `REACT_APP_STAGE` ay `prod` | Itakda ang `REACT_APP_STAGE=custom` sa serbisyong B1Admin |
| Pare-pareho ang content ng lahat ng simbahang subdomain | Walang `{subdomain}` token ang `REACT_APP_B1_WEBSITE_URL` | Itakda sa halimbawang `https://{subdomain}.yourchurch.org` |
| Nagpapakita ng "Application not found" ang custom domain | Hindi pa na-propagate ang DNS, o nakabinbin ang cert ng Railway | Maghintay ng 5 minuto; suriin ang DNS gamit ang `dig admin.yourchurch.org` |

Kung may makaharap kang bagay na wala sa listahang ito, magbukas ng issue sa [github.com/ChurchApps/Api/issues](https://github.com/ChurchApps/Api/issues) at ilakip ang deploy logs.

## Mga Kaugnay na Artikulo

- **[Self-Hosting gamit ang Docker](./docker.md)** -- Ang parehong stack sa sarili mong hardware o VPS
- **[Initial Setup](../../getting-started/initial-setup.md)** -- Mga unang hakbang pagkatapos malikha ang simbahan mo
- **[Website Initial Setup](../../b1-admin/website/initial-setup.md)** -- I-configure ang pampublikong site ng simbahan mo
- **[Giving Settings](../../b1-admin/donations/online-giving-setup.md)** -- Ikonekta ang Stripe o PayPal
- **[Local API Setup](../api/local-setup.md)** -- Pagpapatakbo ng stack nang lokal para sa development
- **[API Deployment (AWS)](./apis.md)** -- Kung paano dine-deploy ang opisyal na ChurchApps SaaS
