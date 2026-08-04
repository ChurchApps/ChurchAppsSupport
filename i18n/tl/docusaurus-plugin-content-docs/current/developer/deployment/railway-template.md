---
title: "Self-Hosting sa Railway"
---

# Self-Hosting sa Railway

<div class="article-intro">

Naglalathala ang ChurchApps ng isang one-click na [Railway](https://railway.com) template na nagbibigay sa inyong simbahan ng sarili nitong pribadong instance ng B1 Admin, ang B1 member portal, ang API, at isang MySQL database — lahat ay tumatakbo sa infrastructure na sarili ninyong pag-aari at direktang binabayaran. Dadalhin kayo ng gabay na ito nang live sa humigit-kumulang 15 minuto at pagkatapos ay dadaanan ang post-deploy configuration na kalaunan ay ninanais ng karamihan ng mga simbahan.

</div>

## Mabilisang Simula

[![Deploy sa Railway](https://railway.com/button.svg)](https://railway.com/deploy/b1-template)

1. I-click ang **Deploy on Railway** button sa itaas.
2. Mag-sign in sa Railway (o lumikha ng libreng account) at magdagdag ng paraan ng pagbabayad.
3. I-click ang **Deploy** nang hindi binabago ang anuman — bawat variable ay may makatwirang default.
4. Maghintay ng 5–10 minuto para maging berde ang apat na serbisyo.
5. Buksan ang URL ng **B1Admin** service, i-click ang **Register**, at gawin ang inyong account. Ang unang account ay awtomatikong isang server admin.
6. Sundin ang mga in-app prompt upang likhain ang inyong unang simbahan.

Iyon na. Mayroon na kayong isang ganap na gumaganang ChurchApps instance. Ang lahat sa ibaba ay opsyonal na polish.

:::tip
Ang deploy ay kasalukuyang nasa **beta**. Kung may makasagupa kayong hindi saklaw ng mga dokumento, mangyaring magbukas ng isyu sa [github.com/ChurchApps/Api/issues](https://github.com/ChurchApps/Api/issues) na may kalakip na deploy logs.
:::

<div class="prereqs">
<h4>Ano ang Kailangan Ninyo</h4>

- Isang libreng [Railway](https://railway.com) account
- Isang credit card na naka-file sa Railway (~$15–25/buwan para sa isang maliit na kongregasyon; tingnan ang [Costs](#costs))
- Humigit-kumulang 15 minuto para sa unang deploy
- *Opsyonal ngunit lubos na inirerekomenda mamaya:* SMTP credentials at isang custom domain

</div>

## Ano ang Nai-deploy

Nagbibigay ang template ng apat na serbisyo sa iisang Railway project:

| Serbisyo | Layunin | URL pagkatapos ng deploy |
|---------|---------|------------------|
| **MySQL** | Nag-iimbak ng lahat ng data (isang instance, maraming schema) | internal lamang |
| **Api** | Backend para sa membership, content, giving, attendance, atbp. | `https://api-<id>.up.railway.app` |
| **B1Admin** | Staff/admin web app | `https://b1admin-<id>.up.railway.app` |
| **B1App** | Member-facing web app at website ng simbahan | `https://b1app-<id>.up.railway.app` |

Ang mga database schema ay awtomatikong nalilikha sa unang paglunsad ng startup migration ng API.

## Unang-Pagkakataong Configuration

Ngayong nakabangon na kayo, narito ang mga bagay na kalaunan ay isinasaayos ng karamihan ng mga simbahan, halos ayon sa priority order.

### 1. Email (Lubos na Inirerekomenda)

Nang walang email, maaari pa ring magparehistro at gumamit ng sistema ang mga miyembro, ngunit **hindi nila mare-reset ang mga nakalimutang password** — kailangang gawin iyon ng isang admin para sa kanila. Ang pag-setup ng SMTP ay tumatagal lang ng humigit-kumulang 5 minuto.

Sa Railway dashboard, buksan ang **Api** service → **Variables**, at magdagdag ng:

```
MAIL_SYSTEM=SMTP
SMTP_HOST=<your provider host>
SMTP_USER=<your username>
SMTP_PASS=<your password or API key>
SMTP_SECURE=false
SUPPORT_EMAIL=noreply@yourchurch.org
```

Tatlong provider na dapat malaman:

#### Resend — pinakasimpleng libreng opsyon (100 email/araw)

1. Mag-sign up sa [resend.com](https://resend.com).
2. I-verify ang isang sending domain (o gamitin muna ang test sender na `onboarding@resend.dev`).
3. Lumikha ng API key.
4. Itakda ang `SMTP_HOST=smtp.resend.com`, `SMTP_USER=resend`, `SMTP_PASS=re_xxxxxxxxx`.

#### Gmail — libre para sa personal na paggamit (~500/araw)

1. I-enable ang 2-factor auth sa Google account.
2. Lumikha ng isang [App Password](https://myaccount.google.com/apppasswords).
3. Itakda ang `SMTP_HOST=smtp.gmail.com`, `SMTP_USER=your-address@gmail.com`, `SMTP_PASS=<ang 16-character na app password>`.

#### AWS SES — pinakamura sa malaking sukat

1. I-verify ang isang sending domain sa AWS.
2. Lumabas sa SES sandbox kung magpapadala kayo sa mga non-verified na address.
3. Lumikha ng SMTP credentials sa ilalim ng **SES → SMTP Settings → Create credentials**.
4. Itakda ang `SMTP_HOST=email-smtp.us-east-2.amazonaws.com`, `SMTP_USER=AKIA...`, `SMTP_PASS=<SES SMTP password>`.

Pagkatapos i-save ang mga variable, awtomatikong mag-re-deploy ang Api service. Subukan ito sa pamamagitan ng pag-trigger ng password reset sa isang test account.

:::warning
Kung itatakda ninyo ang `MAIL_SYSTEM=SMTP` na may maling credentials, ang pagpaparehistro ay magmumukhang matagumpay ngunit hindi kailanman darating ang verification email. Ayusin ang credentials, o alisin ang `MAIL_SYSTEM` upang bumalik sa no-email mode.
:::

### 2. Mga Custom Domain

Gumagana ang mga default na `*.up.railway.app` na URL, ngunit karamihan sa mga simbahan ay gustong magkaroon ng sarili nila.

Para sa bawat web service (B1Admin at B1App):

1. Buksan ang serbisyo sa Railway → **Settings** → **Networking**.
2. I-click ang **+ Custom Domain** at ipasok ang hostname:
   - `admin.yourchurch.org` para sa B1Admin
   - `app.yourchurch.org` (o `www`) para sa B1App
3. Idagdag ang CNAME record na ipinapakita ng Railway sa inyong DNS provider.
4. Maghintay ng ilang minuto para kumalat ang DNS. Awtomatikong nagbibigay ang Railway ng TLS certificate.

Pagkatapos, i-update ang mga variable ng **Api** service upang gamitin ng mga link sa email ang mga bagong domain:

```
B1ADMIN_ROOT=https://admin.yourchurch.org
```

At sa **B1Admin** service:

```
REACT_APP_API_BASE=https://api.yourchurch.org   (kung magtatakda rin kayo ng custom API domain)
REACT_APP_B1_WEBSITE_URL=https://{subdomain}.yourchurch.org
```

Ang `{subdomain}` token ay literal — pinapalitan ito sa runtime ng subdomain ng bawat simbahan (tingnan ang Multi-Site sa ibaba).

### 3. Multi-Site (Maraming Simbahan sa Iisang Instance)

Ang ChurchApps ay multi-tenant sa disenyo — isang deployment ay maaaring maglingkod sa anumang bilang ng mga simbahan, bawat isa ay may sariling mga tao, grupo, at website. Ang mga bagong simbahan ay idinaragdag nang buo sa pamamagitan ng admin UI; walang kinakailangang pagbabago sa infrastructure.

#### Pagdaragdag ng karagdagang mga simbahan

1. Sa **B1 Admin**, mag-navigate sa **Settings → Manage Church → Switch Church → Create New**.
2. Bawat simbahan ay may natatanging **subdomain slug** (hal. `firstchurch`, `gracecommunity`).
3. Ang bagong simbahan ay makakakuha ng sariling data, miyembro, website, at giving setup, ganap na hiwalay sa ibang simbahan sa parehong instance.

#### Pag-route ng bawat simbahan sa sariling URL

Dalawang paraan upang ilantad ang mga simbahan nang publiko:

| Pattern | Halimbawa | Setup |
|---------|---------|-------|
| **Path-based** (gumagana agad) | `app.yourchurch.org/firstchurch` | Walang karagdagang setup |
| **Subdomain-based** (mas malinis na URL) | `firstchurch.yourchurch.org` | Wildcard DNS + wildcard custom domain |

Para sa **subdomain-based** na routing sa Railway:

1. Sa inyong DNS provider, lumikha ng wildcard CNAME: `*.yourchurch.org → <b1app railway target>`.
2. Sa Railway, sa B1App service → **Settings → Networking**, magdagdag ng `*.yourchurch.org` bilang custom domain.
3. Sa **B1Admin** service, itakda ang `REACT_APP_B1_WEBSITE_URL=https://{subdomain}.yourchurch.org`.

Pagkatapos ng redeploy, awtomatikong maglilingkod ang site ng bawat simbahan sa `<their-subdomain>.yourchurch.org`.

:::info
Ang mga wildcard custom domain ay nangangailangan ng bayad na Railway plan. Gumagana ang path-based routing sa bawat plan at functionally identical ito — mas hindi lang gaanong maganda tingnan sa URL bar.
:::

### 4. Online Giving (Stripe / PayPal)

Ang giving ay naka-configure **bawat simbahan sa loob ng admin UI**, hindi sa pamamagitan ng environment variable — sa ganoong paraan ang bawat simbahan ay maaaring gumamit ng sariling merchant account.

1. Kumuha ng developer credentials mula sa [Stripe](https://dashboard.stripe.com/) (Developers → API keys) o [PayPal](https://developer.paypal.com/) (My Apps & Credentials).
2. Sa B1 Admin, pumunta sa **Settings → Giving Settings**.
3. Piliin ang inyong provider, i-paste ang Public at Secret keys, at i-configure ang fee handling.
4. Opsyonal na magdagdag ng `GOOGLE_RECAPTCHA_SECRET_KEY` sa **Api** service sa Railway upang protektahan ang mga pampublikong donation form laban sa mga bot.

### 5. File Storage

Ang template ay naglalaan ng isang **1 GB persistent volume** na naka-mount sa Api service para sa mga larawan ng miyembro, sermon file, at mga na-upload na dokumento.

Upang palakihin ito: buksan ang Api service → **Volumes** → ayusin ang size slider.

Para sa mas malalaking deployment (100+ GB o maraming sabay-sabay na upload), lumipat sa S3 sa pamamagitan ng pagtatakda nito sa **Api** service:

```
FILE_STORE=S3
AWS_S3_BUCKET=<your-bucket>
AWS_ACCESS_KEY_ID=<key>
AWS_SECRET_ACCESS_KEY=<secret>
AWS_REGION=us-east-2
```

Ang mga umiiral nang file sa volume ay hindi awtomatikong lumilipat — kopyahin muna ang mga ito sa bucket bago i-flip ang variable.

### 6. Opsyonal na Feature Integrations

Ang mga ito ay nagbubukas ng mga tiyak na feature at maaaring lahat idagdag mamaya sa pamamagitan ng Railway dashboard. Itakda ang mga ito sa **Api** service.

| Variable | Feature na pinapagana |
|----------|--------------------|
| `OPENAI_API_KEY` *o* `OPENROUTER_API_KEY` | AI-assisted na paghahanap at mga suhestiyon ng content |
| `YOUTUBE_API_KEY` | YouTube sermon search at embedding |
| `PEXELS_KEY` | Stock-image picker para sa website builder |
| `VIMEO_TOKEN` | Suporta sa Vimeo sermon |
| `API_BIBLE_KEY` | Mga Bible verse lookup sa mga lesson at content |
| `YOUVERSION_API_KEY` | YouVersion Bible integration |
| `WEB_PUSH_PUBLIC_KEY` + `WEB_PUSH_PRIVATE_KEY` | Mga browser push notification (gumawa ng VAPID keypair) |
| `HUBSPOT_KEY` | Opsyonal na CRM sync para sa mga bagong pagpaparehistro |

## Pag-update

Ang bawat serbisyo ay naka-link sa sarili nitong GitHub repo. Ang mga push sa `main` sa `ChurchApps/Api`, `ChurchApps/B1Admin`, o `ChurchApps/B1App` ay nag-tri-trigger ng awtomatikong mga redeploy.

Upang i-pin ang isang tiyak na bersyon, baguhin ang **Branch** setting sa bawat serbisyo sa isang tag o release branch. Ito ang inirerekomendang setup para sa production — ang auto-deploying mula sa `main` ay nangangahulugang mamanahin ninyo ang anumang in-progress na trabaho.

## Costs

Mga tunay na saklaw para sa isang maliit na simbahan (mas mababa sa 200 miyembro, magaan na trapiko):

| Component | Tinatayang gastos bawat buwan |
|-----------|---------------------|
| Railway base | $5 |
| MySQL plugin | $5 + ~$1 storage |
| 3 web services compute | $3–10 combined |
| 1 GB volume | $0.25 |
| **Total** | **~$15–25/buwan** |

Ang mga gastos ay lumalaki nang linear kasabay ng trapiko, mga pag-upload ng larawan, at laki ng database. Ipinapakita ng Railway ang live usage sa **Usage** tab ng project — magtakda ng mga spending limit doon upang limitahan ang inyong exposure.

## Troubleshooting

| Sintomas | Malamang na Sanhi | Ayos |
|---------|--------------|-----|
| Nabigo ang build na may `EBUSY: rmdir '/app/node_modules/.cache'` | Salungatan sa Nixpacks cache mount | Itakda ang `NIXPACKS_NO_CACHE=true` sa apektadong serbisyo |
| Nabigo ang build sa B1Admin na may `Missing: @types/...` | Hindi naka-sync na `package-lock.json` | I-pull ang pinakabagong `main` |
| Nabibitin ang Api deploy sa "Deploying" | Nabigo ang healthcheck — ang `/health` ay hindi nagbabalik ng 200 | Tingnan ang deploy logs; karaniwan itong nawawalang required env var |
| Nagpapakita ang B1Admin ng "check your email" ngunit walang dumarating na email | Nakatakda ang `MAIL_SYSTEM=SMTP` ngunit kulang o mali ang credentials | Ayusin ang credentials, o alisin ang `MAIL_SYSTEM` upang i-disable ang email |
| Nagre-redirect ang login sa `api.churchapps.org` | Ang `REACT_APP_STAGE` ay `prod` | Itakda ang `REACT_APP_STAGE=custom` sa B1Admin service |
| Ang lahat ng subdomain na simbahan ay nagpapakita ng parehong content | Ang `REACT_APP_B1_WEBSITE_URL` ay hindi naglalaman ng `{subdomain}` token | Itakda ito sa hal. `https://{subdomain}.yourchurch.org` |
| Nagpapakita ang custom domain ng "Application not found" | Hindi pa kumakalat ang DNS, o nakabinbin ang cert ng Railway | Maghintay ng 5 minuto; suriin ang DNS gamit ang `dig admin.yourchurch.org` |

Kung may makasagupa kayong wala sa listahang ito, magbukas ng isyu sa [github.com/ChurchApps/Api/issues](https://github.com/ChurchApps/Api/issues) na may kalakip na deploy logs.

## Kaugnay na Artikulo

- **[Self-Hosting gamit ang Docker](./docker)** — Parehong stack sa inyong sariling hardware o VPS
- **[Unang Setup](../../getting-started/initial-setup)** — Mga unang hakbang pagkatapos malikha ang inyong simbahan
- **[Unang Setup ng Website](../../b1-admin/website/initial-setup)** — I-configure ang pampublikong site ng inyong simbahan
- **[Giving Settings](../../b1-admin/donations/online-giving-setup)** — I-wire up ang Stripe o PayPal
- **[Local API Setup](../api/local-setup)** — Pagpapatakbo ng stack nang lokal para sa development
- **[API Deployment (AWS)](./apis)** — Kung paano na-deploy ang opisyal na ChurchApps SaaS
