---
title: "Kutingenisela ku-Railway"
---

# Kutingenisela ku-Railway

<div class="article-intro">

I-ChurchApps ishicilela ithempuleti yekucindzetela kanyekanye ye-[Railway](https://railway.com) lenika ibandla lakho i-instance yalo yangasese ye-B1 Admin, i-B1 member portal, i-API, kanye ne-database ye-MySQL -- konkhe kugijima ku-infrastructure lonayo futsi lokhokhela ngco. Lomhlahlandlela ukuletsa usebenta emaminithini lacishe abe ngu-15 bese uhamba ngekuhlelwa lokulandzela kufakwa (post-deploy) lokuvamile emabandla afuna kona.

</div>

## Kucala Ngekushesha

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/b1-template)

1. Cindzetela inkhinombolo **Deploy on Railway** lengetulu.
2. Ngena ku-Railway (kumbe wakhe i-akhawunti yamahhala) bese wengeta indlela yekukhokha.
3. Cindzetela **Deploy** ngaphandle kwekushintja nome ngutiphi -- ngalinye livariyebuli line-default lecondzile.
4. Linda emaminithi lasi-5-10 kute tinsita letine tibe luhlata.
5. Vula i-URL yesevisi ye-**B1Admin**, cindzetela **Register**, bese wakha i-akhawunti yakho. I-akhawunti yekucala iba ngu-server admin ngco.
6. Landzela imiyalo lengekhatsi kwelinhlelo kute wakhe libandla lakho lekucala.

Yikho loko. Sewunayo i-instance ye-ChurchApps lesebentako ngalokugcwele. Konkhe lokungentasi kungakhetsakala kuphela.

:::tip
Kufakwa kusekungeke, ku-**beta**. Nangabe uhlangabetane nalokungakabhalwa kuma-doks, vula i-issue ku-[github.com/ChurchApps/Api/issues](https://github.com/ChurchApps/Api/issues) unamatsele ema-log ekufaka.
:::

<div class="prereqs">
<h4>Loko Lokudzingeka</h4>

- I-akhawunti ye-[Railway](https://railway.com) yamahhala
- Ikhadi lekukhokha lelifakiwe ku-Railway (cishe ngu-$15-25/inyanga ebandleni lelincane; bona [Tindleko](#costs))
- Emaminithi lacishe abe ngu-15 ekufakweni kwekucala
- *Akudzingeki kodvwa kuncocedwa kakhulu kamuva:* ema-credential e-SMTP kanye nedomeni lakhetsekile

</div>

## Loko Lokufakwako

Ithempuleti inika tisita letine ku-phrojekthi yinye ye-Railway:

| Sisita | Injongo | I-URL ngemuva kwekufakwa |
|---------|---------|------------------|
| **MySQL** | Igcina onkhe emininingwane (instance yinye, ema-schema lamanyenti) | ngekhatsi kuphela |
| **Api** | I-Backend ye-membership, kucuketfwe, kunikela, kuba khona, njll. | `https://api-<id>.up.railway.app` |
| **B1Admin** | Uhlelo lwe-web lwabaphatsi/basebenti | `https://b1admin-<id>.up.railway.app` |
| **B1App** | Uhlelo lwe-web lolubukelwa ngemalungu kanye nesayithi yebandla | `https://b1app-<id>.up.railway.app` |

Ema-schema e-database akhiwa ngco ekucaleni kokugijimiswa ngeluhambo lwe-startup migration ye-API.

## Kuhlelwa Kwesikhatsi Sekucala

Njengobe sewusebenta, nawa emazinga lamanyenti emabandla lawahlelako kamuva, ngekulandzelana kwebubaluleko.

### 1. I-Email (Kuncocedwa Kakhulu)

Ngaphandle kwe-email, emalungu asakwati kubhalisa nekusebentisa luhlelo, kodvwa **akakwati kubuyisela emaphasiwedi labakhohliwe** -- umphatsi kufanele awenzele loko. Kuhlela i-SMTP kutsatsa emaminithi lacishe abe ngu-5.

Ku-dashboard ye-Railway, vula sisita se-**Api** → **Variables**, bese wengeta:

```
MAIL_SYSTEM=SMTP
SMTP_HOST=<your provider host>
SMTP_USER=<your username>
SMTP_PASS=<your password or API key>
SMTP_SECURE=false
SUPPORT_EMAIL=noreply@yourchurch.org
```

Bakaniki labatsatfu labafanele wabati:

#### Resend -- sincumo lesilula kakhulu semahhala (ema-imeyili langu-100 ngelilanga)

1. Bhalisa ku-[resend.com](https://resend.com).
2. Chaka idomeni lekutfumela (kumbe sebentisa umtfumeli wekuhlola i-`onboarding@resend.dev` kucala).
3. Yakha inkhinombolo ye-API.
4. Hlela i-`SMTP_HOST=smtp.resend.com`, `SMTP_USER=resend`, `SMTP_PASS=re_xxxxxxxxx`.

#### Gmail -- yamahhala ekusebentiseni kwemuntfu (cishe u-500/lilanga)

1. Vula i-2-factor auth ku-akhawunti ye-Google.
2. Yakha i-[App Password](https://myaccount.google.com/apppasswords).
3. Hlela i-`SMTP_HOST=smtp.gmail.com`, `SMTP_USER=your-address@gmail.com`, `SMTP_PASS=<liphasiwedi lelinetinhlamvu letili-16>`.

#### AWS SES -- lishibhile kakhulu nakukhuliswako

1. Chaka idomeni lekutfumela ku-AWS.
2. Phuma ku-SES sandbox nangabe utawutfumela kuma-adiresi langakachakiswa.
3. Yakha ema-credential e-SMTP ngaphansi kwe-**SES → SMTP Settings → Create credentials**.
4. Hlela i-`SMTP_HOST=email-smtp.us-east-2.amazonaws.com`, `SMTP_USER=AKIA...`, `SMTP_PASS=<liphasiwedi le-SES SMTP>`.

Ngemuva kwekugcina emavariyebuli, sisita se-Api sifaka kabusha ngco. Sihlole ngekucalisa kubuyiselwa kwephasiwedi ku-akhawunti yekuhlola.

:::warning
Nangabe uhlela i-`MAIL_SYSTEM=SMTP` ngema-credential lamabi, kubhaliswa kutakubonakala kuphumelela kodvwa i-imeyili yekuchaka ayikafiki. Lungisa ema-credential, kumbe susa i-`MAIL_SYSTEM` kute ubuyele endleleni yekungabi khona ne-imeyili.
:::

### 2. Emadomeni Akhetsekile

Ema-URL la-`*.up.railway.app` la-default asebenta, kodvwa emanyenti emabandla afuna aweto.

Ngasinye sisita se-web (B1Admin ne-B1App):

1. Vula sisita ku-Railway → **Settings** → **Networking**.
2. Cindzetela **+ Custom Domain** bese ufaka ligama le-host:
   - `admin.yourchurch.org` ye-B1Admin
   - `app.yourchurch.org` (kumbe `www`) ye-B1App
3. Engeta irekhodi le-CNAME lelikhonjiswa yi-Railway ku-DNS provider yakho.
4. Linda emaminithi lambalwa kute i-DNS isabalale. I-Railway ikhipha sitifiketi se-TLS ngco.

Bese buyeketa emavariyebuli esisita se-**Api** kute tikhombiswano ku-emeyili tisebentise emadomeni lamasha:

```
B1ADMIN_ROOT=https://admin.yourchurch.org
```

Nase-sisita se-**B1Admin**:

```
REACT_APP_API_BASE=https://api.yourchurch.org   (nangabe futsi uhlele idomeni lakhetsekile le-API)
REACT_APP_B1_WEBSITE_URL=https://{subdomain}.yourchurch.org
```

Lithokheni le-`{subdomain}` licwebekile -- lishintjwa nge-runtime ngesubdomain yebandla ngalinye (bona Multi-Site ngentasi).

### 3. Emasayithi Lamanyenti (Emabandla Lamanyenti ku-Instance Yinye)

I-ChurchApps yakhelwe kutsi ibe multi-tenant -- kufakwa kunye kungasingatsa noma ngumaphi emabandla, ngalinye linebantfu balo, emacembu, kanye nesayithi yalo. Emabandla lamasha engetwa ngco ngeluhambo lwe-admin UI; akudzingi kushintjwa kwe-infrastructure.

#### Kwengeta emabandla lengetiwe

1. Ku-**B1 Admin**, hamba uye ku-**Settings → Manage Church → Switch Church → Create New**.
2. Ngalinye libandla linelithuluzi lelikhetsekile le-**subdomain slug** (sibonelo, `firstchurch`, `gracecommunity`).
3. Libandla lelisha litfola imininingwane yalo, emalungu, sayithi, kanye nekuhlelwa kwekunikela, kucondzeke ngalokugcwele kulamanye emabandla ku-instance leyinye.

#### Kusombulula ibandla ngalinye ku-URL yalo

Tindlela letimbili tekukhombisa emabandla emphakatsini:

| Iphetheni | Sibonelo | Kuhlelwa |
|---------|---------|-------|
| **Ngendlela (Path-based)** (isebenta ngco) | `app.yourchurch.org/firstchurch` | Akukho kuhlelwa lokwengeteliwe |
| **Nge-subdomain** (ema-URL lacoceke kakhulu) | `firstchurch.yourchurch.org` | Wildcard DNS + wildcard custom domain |

Ekusombululeni nge-subdomain ku-Railway:

1. Ku-DNS provider yakho, yakha i-wildcard CNAME: `*.yourchurch.org → <b1app railway target>`.
2. Ku-Railway, kusisita se-B1App → **Settings → Networking**, engeta i-`*.yourchurch.org` njengedomeni lakhetsekile.
3. Kusisita se-**B1Admin**, hlela i-`REACT_APP_B1_WEBSITE_URL=https://{subdomain}.yourchurch.org`.

Ngemuva kwekufaka kabusha, sayithi yebandla ngalinye ikhontiswa ku-`<their-subdomain>.yourchurch.org` ngco.

:::info
Emadomeni lakhetsekile la-wildcard adzinga luhlelo lolukhokhelwako lwe-Railway. Kusombulula ngendlela (path-based) kusebenta kuwo onkhe emahlelo futsi kuyafana ngekusebenta -- kumane kungabukeki kahle ku-URL bar.
:::

### 4. Kunikela Ngco (Stripe / PayPal)

Kunikela kuhlelwa **ngalinye libandla ngekhatsi kwe-admin UI**, hhayi ngemavariyebuli endzawo -- ngendlela leyo ibandla ngalinye lingasebentisa i-akhawunti yalo yekukhokha.

1. Tfola ema-credential etfutfukisi kusuka ku-[Stripe](https://dashboard.stripe.com/) (Developers → API keys) kumbe [PayPal](https://developer.paypal.com/) (My Apps & Credentials).
2. Ku-B1 Admin, hamba uye ku-**Settings → Giving Settings**.
3. Khetsa umniketi wakho, faka Ema-key la-Public ne-Secret, bese uhlela kuphatfwa kwemalipesenti.
4. Ungangeta i-`GOOGLE_RECAPTCHA_SECRET_KEY` kusisita se-**Api** ku-Railway kute uvikele ema-fomu enikelo emphakatsini kuma-bot.

### 5. Kugcinwa Kwemafayela

Ithempuleti inika i-**1 GB persistent volume** legcotjwe kusisita se-Api yemidvwebo yemalungu, emafayela etshumayelo, kanye nemibhalo lelayishiwe.

Kukukhulisa: vula sisita se-Api → **Volumes** → shintja i-slider yebukhulu.

Kukufakwa lokukhulu (100+ GB kumbe kulayishwa lokunyenti kanyekanye), shintjela ku-S3 ngekuhlela loku kusisita se-**Api**:

```
FILE_STORE=S3
AWS_S3_BUCKET=<your-bucket>
AWS_ACCESS_KEY_ID=<key>
AWS_SECRET_ACCESS_KEY=<secret>
AWS_REGION=us-east-2
```

Emafayela lakhona ku-volume akatfutfuki ngco -- akopishe ku-bucket ngaphambi kwekushintja livariyebuli.

### 6. Kuhlanganiswa Kwemisebenti Lokungakhetsakala

Loku kuvula tici letikhetsekile futsi konkhe kungangeta kamuva ngeluhambo lwe-dashboard ye-Railway. Kuhlele kusisita se-**Api**.

| Ivariyebuli | Sici lesikuvulako |
|----------|--------------------|
| `OPENAI_API_KEY` *kumbe* `OPENROUTER_API_KEY` | Kusesha nekusikelwa kwekucuketfwe lokusizwa yi-AI |
| `YOUTUBE_API_KEY` | Kusesha netshumayelo te-YouTube |
| `PEXELS_KEY` | Sikhetsi semidvwebo yesitolo se-website builder |
| `VIMEO_TOKEN` | Kusekelwa kwetshumayelo te-Vimeo |
| `API_BIBLE_KEY` | Kufunwa kwemavesi eliBhayibheli etifundvweni nasekucuketfweni |
| `YOUVERSION_API_KEY` | Kuhlanganiswa ne-YouVersion Bible |
| `WEB_PUSH_PUBLIC_KEY` + `WEB_PUSH_PRIVATE_KEY` | Tatiso te-push te-browser (khiphe i-VAPID keypair) |
| `HUBSPOT_KEY` | Kuhlanganiswa kwe-CRM lokungakhetsakala kubhaliswa lokusha |

## Kubuyeketa

Sisita ngasinye sixhume ku-repository yaso ye-GitHub. Kucindzetela ku-`main` ku-`ChurchApps/Api`, `ChurchApps/B1Admin`, kumbe `ChurchApps/B1App` kucalisa kufakwa kabusha ngco.

Kubopha vasyini lekhetsekile, shintja kuhlelwa kwe-**Branch** kusisita ngasinye kube liphawu (tag) kumbe luhlaka lokukhishwa. Loku yikuhlelwa lokuncocedwako ku-production -- kufaka kabusha ngco kusuka ku-`main` kusho kutsi udla lifa lemsebenti losaqhubeka.

## Tindleko

Emazinga engempela ebandla lelincane (ngaphansi kwemalungu langu-200, traffic lencane):

| Incenye | Litfuba lelilinganiselwe ngenyanga |
|-----------|---------------------|
| I-base ye-Railway | $5 |
| I-plugin ye-MySQL | $5 + cishe ~$1 sitorage |
| Kucubungula kwetisita letintsatfu te-web | $3-10 kuhlanganisiwe |
| I-1 GB volume | $0.25 |
| **Sewundzawonye** | **cishe ~$15-25/inyanga** |

Tindleko tikhula njengendlela ye-traffic, kulayishwa kwemidvwebo, kanye nebukhulu be-database. I-Railway ikhombisa kusetjentiswa ngesikhatsi lesiphilako ku-**Usage** tab yephrojekthi. Hlela imikhawulo yekusebentisa lapho kute unciphise loko lokungakubita.

## Kulungisa Tinkinga

| Luphawu | Imbangela levamile | Sicondziso |
|---------|--------------|-----|
| Kwakha kwehluleka nge-`EBUSY: rmdir '/app/node_modules/.cache'` | Kutsintsana kwe-cache mount ye-Nixpacks | Hlela i-`NIXPACKS_NO_CACHE=true` kusisita lesitsintekile |
| Kwakha kwehluleka ku-B1Admin nge-`Missing: @types/...` | I-`package-lock.json` lengahambisani | Donsa i-`main` lensha kakhulu |
| Kufakwa kwe-Api kubambeka ku-"Deploying" | Healthcheck iyehluleka -- `/health` ayibuyisi 200 | Buka ema-logi ekufakwa; lokuvamile ivariyebuli yendzawo ledzingekako lelahlekile |
| I-B1Admin ikhombisa "check your email" kodvwa akukho imeyili lefikako | `MAIL_SYSTEM=SMTP` ihlelwe kodvwa ema-credential ayekho/ayalungile | Lungisa ema-credential, kumbe susa i-`MAIL_SYSTEM` kute uvimbe imeyili |
| Kungena kubuyisela ku-`api.churchapps.org` | I-`REACT_APP_STAGE` ngu-`prod` | Hlela i-`REACT_APP_STAGE=custom` kusisita se-B1Admin |
| Emabandla e-subdomain onkhe akhombisa kucuketfwe lokufanako | I-`REACT_APP_B1_WEBSITE_URL` ayihlanganisi lithokheni le-`{subdomain}` | Yihlele ibe sib. `https://{subdomain}.yourchurch.org` |
| Idomeni lekhetsekile likhombisa "Application not found" | I-DNS ayikakasabalali, kumbe sitifiketi se-Railway sisalindzile | Linda emaminithi lasi-5; hlola i-DNS nge-`dig admin.yourchurch.org` |

Nangabe uhlangabetane nalokungekho kuloluhla, vula i-issue ku-[github.com/ChurchApps/Api/issues](https://github.com/ChurchApps/Api/issues) unamatsele ema-logi ekufakwa.

## Emahloko Lahlobene

- **[Kutingenisela nge-Docker](./docker)** -- Lesitulo lesifanako kuhadwe lakho lwakho kumbe VPS
- **[Kuhlelwa Kwekucala](../../getting-started/initial-setup)** -- Tinyatselo tekucala ngemuva kwekutsi libandla lakho likhiwe
- **[Website Initial Setup](../../b1-admin/website/initial-setup)** -- Hlela sayithi yebandla lakho lebonwa ngumphakatsi
- **[Giving Settings](../../b1-admin/donations/online-giving-setup)** -- Xhuma i-Stripe kumbe i-PayPal
- **[API Local Setup](../api/local-setup)** -- Kugijimisa situlo ngasekhaya ekutfutfukiseni
- **[API Deployment (AWS)](./apis)** -- Kutsi i-ChurchApps SaaS lesemtsetweni ifakwa njani
