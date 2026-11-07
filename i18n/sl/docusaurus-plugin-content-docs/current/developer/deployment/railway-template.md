---
title: "Samostojno gostovanje na Railwayu"
description: "Namestite zasebno instanco ChurchApps na Railway v približno 15 minutah ter nastavite e-pošto, lastne domene, usmerjanje, darovanje in datoteke za B1 Admin."
---

# Samostojno gostovanje na Railwayu

<div class="article-intro">

ChurchApps objavlja predlogo [Railway](https://railway.com) za namestitev z enim klikom, ki vaši cerkvi da lastno zasebno instanco storitev B1 Admin, člansko spletno mesto B1, API in podatkovno bazo MySQL, vse na infrastrukturi, ki jo imate v lasti in za katero neposredno plačujete. Ta vodnik vas v približno 15 minutah pripelje do delujoče namestitve, nato pa vas popelje skozi konfiguracijo po namestitvi, ki si jo večina cerkva na koncu želi.

</div>

## Hitri začetek

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/b1-template)

1. Kliknite zgornji gumb **Deploy on Railway**.
2. Prijavite se v Railway (ali ustvarite brezplačen račun) in dodajte plačilno metodo.
3. Kliknite **Deploy**, ne da bi karkoli spremenili – vsaka spremenljivka ima smiselno privzeto vrednost.
4. Počakajte 5–10 minut, da vseh štiri storitve postanejo zelene.
5. Odprite URL storitve **B1Admin**, kliknite **Register** in ustvarite svoj račun. Prvi račun samodejno postane strežniški skrbnik.
6. Sledite navodilom v aplikaciji, da ustvarite prvo cerkev.

To je vse. Zdaj imate popolnoma delujočo instanco ChurchApps. Vse spodaj je neobvezno izpopolnjevanje.

:::tip
Namestitev je trenutno v **beta** različici. Če naletite na nekaj, česar dokumentacija ne pokriva, odprite prijavo težave na [github.com/ChurchApps/Api/issues](https://github.com/ChurchApps/Api/issues) in priložite dnevnike namestitve.
:::

<div class="prereqs">
<h4>Kaj potrebujete</h4>

- Brezplačen račun [Railway](https://railway.com)
- Kreditno kartico, shranjeno pri Railwayu (~15–25 $/mesec za majhno občino; glejte [Stroški](#costs))
- Približno 15 minut za začetno namestitev
- *Neobvezno, a zelo priporočljivo kasneje:* poverilnice SMTP in lastno domeno

</div>

## Kaj se namesti

Predloga v enem projektu Railway ustvari štiri storitve:

| Storitev | Namen | URL po namestitvi |
|----------|-------|-------------------|
| **MySQL** | Shranjuje vse podatke (ena instanca, več shem) | samo interno |
| **Api** | Zaledje za člane, vsebine, darovanja, obiskovanost itd. | `https://api-<id>.up.railway.app` |
| **B1Admin** | Spletna aplikacija za osebje/skrbnike | `https://b1admin-<id>.up.railway.app` |
| **B1App** | Spletna aplikacija za člane in spletno mesto cerkve | `https://b1app-<id>.up.railway.app` |

Podatkovne sheme se ob prvem zagonu samodejno ustvarijo z zagonsko migracijo API-ja.

## Prva konfiguracija

Zdaj, ko ste pripravljeni, so tukaj stvari, ki jih večina cerkva nastavi najprej, približno po prednosti.

### 1. E-pošta (zelo priporočljivo)

Brez e-pošte se lahko člani še vedno registrirajo in uporabljajo sistem, vendar **ne morejo ponastaviti pozabljenih gesel** – to mora namesto njih storiti skrbnik. Nastavitev SMTP traja približno 5 minut.

V nadzorni plošči Railway odprite storitev **Api** → **Variables** in dodajte:

```
MAIL_SYSTEM=SMTP
SMTP_HOST=<gostitelj vašega ponudnika>
SMTP_USER=<vaše uporabniško ime>
SMTP_PASS=<vaše geslo ali ključ API>
SMTP_SECURE=false
SUPPORT_EMAIL=noreply@yourchurch.org
```

Trije ponudniki, ki jih je vredno poznati:

#### Resend – najpreprostejša brezplačna možnost (100 e-poštnih sporočil/dan)

1. Registrirajte se na [resend.com](https://resend.com).
2. Preverite domeno za pošiljanje (ali za začetek uporabite testnega pošiljatelja `onboarding@resend.dev`).
3. Ustvarite ključ API.
4. Nastavite `SMTP_HOST=smtp.resend.com`, `SMTP_USER=resend`, `SMTP_PASS=re_xxxxxxxxx`.

#### Gmail – brezplačno za osebno uporabo (~500/dan)

1. Na Google računu omogočite dvostopenjsko preverjanje.
2. Ustvarite [geslo aplikacije](https://myaccount.google.com/apppasswords).
3. Nastavite `SMTP_HOST=smtp.gmail.com`, `SMTP_USER=vas-naslov@gmail.com`, `SMTP_PASS=<16-mestno geslo aplikacije>`.

#### AWS SES – najcenejša možnost pri večjem obsegu

1. V AWS preverite domeno za pošiljanje.
2. Če boste pošiljali na nepreverjene naslove, izstopite iz peskovnika SES.
3. Ustvarite poverilnice SMTP pod **SES → SMTP Settings → Create credentials**.
4. Nastavite `SMTP_HOST=email-smtp.us-east-2.amazonaws.com`, `SMTP_USER=AKIA...`, `SMTP_PASS=<geslo SES SMTP>`.

Po shranjevanju spremenljivk se storitev Api samodejno znova namesti. Preizkusite tako, da na testnem računu sprožite ponastavitev gesla.

:::warning
Če nastavite `MAIL_SYSTEM=SMTP` z napačnimi poverilnicami, se bo registracija videti uspešna, potrditveno sporočilo pa nikoli ne bo prispelo. Popravite poverilnice ali odstranite `MAIL_SYSTEM`, da se vrnete v način brez e-pošte.
:::

### 2. Lastne domene

Privzeti URL-ji `*.up.railway.app` delujejo, vendar si večina cerkva želi svoje.

Za vsako spletno storitev (B1Admin in B1App):

1. V Railwayu odprite storitev → **Settings** → **Networking**.
2. Kliknite **+ Custom Domain** in vnesite gostiteljsko ime:
   - `admin.yourchurch.org` za B1Admin
   - `app.yourchurch.org` (ali `www`) za B1App
3. Zapis CNAME, ki ga prikaže Railway, dodajte pri svojem ponudniku DNS.
4. Počakajte nekaj minut, da se DNS razširi. Railway samodejno pridobi certifikat TLS.

Nato posodobite spremenljivke storitve **Api**, da bodo povezave v e-poštnih sporočilih kazale na nove domene:

```
B1ADMIN_ROOT=https://admin.yourchurch.org
```

Na storitvi **B1Admin**:

```
REACT_APP_API_BASE=https://api.yourchurch.org   (če nastavljate tudi lastno domeno API)
REACT_APP_B1_WEBSITE_URL=https://{subdomain}.yourchurch.org
```

Oznaka `{subdomain}` je dobesedna – med izvajanjem jo nadomesti poddomena vsake cerkve (glejte Več spletnih mest spodaj).

### 3. Več spletnih mest (več cerkva na eni instanci)

ChurchApps je po zasnovi več-najemniški – ena namestitev lahko gosti poljubno število cerkva, vsaka s svojimi člani, skupinami in spletnim mestom. Nove cerkve se dodajajo izključno prek skrbniškega vmesnika; infrastrukturnih sprememb ni treba.

#### Dodajanje dodatnih cerkva

1. V **B1 Admin** pojdite na **Settings → Manage Church → Switch Church → Create New**.
2. Vsaka cerkev ima edinstveno **oznako poddomene** (npr. `firstchurch`, `gracecommunity`).
3. Nova cerkev dobi lastne podatke, člane, spletno mesto in nastavitev darovanj, popolnoma ločene od drugih cerkva na isti instanci.

#### Usmerjanje vsake cerkve na njen URL

Cerkve lahko javno izpostavite na dva načina:

| Vzorec | Primer | Nastavitev |
|--------|--------|------------|
| **Na podlagi poti** (deluje takoj) | `app.yourchurch.org/firstchurch` | Ni dodatne nastavitve |
| **Na podlagi poddomene** (čistejši URL-ji) | `firstchurch.yourchurch.org` | Džoker DNS + džoker lastna domena |

Za usmerjanje na podlagi poddomene na Railwayu:

1. V svojem ponudniku DNS ustvarite džoker CNAME: `*.yourchurch.org → <b1app cilj Railway>`.
2. V Railwayu na storitvi B1App → **Settings → Networking** dodajte `*.yourchurch.org` kot lastno domeno.
3. Na storitvi **B1Admin** nastavite `REACT_APP_B1_WEBSITE_URL=https://{subdomain}.yourchurch.org`.

Po ponovni namestitvi bo spletno mesto vsake cerkve samodejno dostopno na `<njihova-poddomena>.yourchurch.org`.

:::info
Džoker lastne domene zahtevajo plačni paket Railway. Usmerjanje na podlagi poti deluje v vseh paketih in je funkcionalno enako – le manj lepo v naslovni vrstici.
:::

### 4. Spletno darovanje (Stripe / PayPal)

Darovanja se nastavljajo **za vsako cerkev posebej v skrbniškem vmesniku**, ne prek spremenljivk okolja – tako lahko vsaka cerkev uporablja svoj trgovski račun.

1. Pridobite razvijalske poverilnice pri [Stripe](https://dashboard.stripe.com/) (Developers → API keys) ali [PayPal](https://developer.paypal.com/) (My Apps & Credentials).
2. V B1 Admin pojdite na **Settings → Giving Settings**.
3. Izberite ponudnika, prilepite javni in tajni ključ ter nastavite obravnavo provizij.
4. Neobvezno dodajte `GOOGLE_RECAPTCHA_SECRET_KEY` na storitev **Api** v Railwayu, da zaščitite javne obrazce za darovanja pred botovi.

### 5. Shranjevanje datotek

Predloga ustvari **1 GB trajen zvezek**, pripet na storitev Api, za fotografije članov, datoteke pridig in naložene dokumente.

Za povečanje: odprite storitev Api → **Volumes** → prilagodite drsnik velikosti.

Za večje namestitve (100+ GB ali veliko sočasnih nalaganj) preklopite na S3 tako, da na storitvi **Api** nastavite:

```
FILE_STORE=S3
AWS_S3_BUCKET=<vaš-bucket>
AWS_ACCESS_KEY_ID=<ključ>
AWS_SECRET_ACCESS_KEY=<skrivnost>
AWS_REGION=us-east-2
```

Obstoječe datoteke na zvezku se ne selijo samodejno – pred preklopom spremenljivke jih kopirajte v bucket.

### 6. Neobvezne funkcijske integracije

Te omogočajo določene funkcije in jih je mogoče dodati kasneje prek nadzorne plošče Railway. Nastavite jih na storitvi **Api**.

| Spremenljivka | Funkcija, ki jo omogoča |
|---------------|-------------------------|
| `OPENAI_API_KEY` *ali* `OPENROUTER_API_KEY` | Iskanje in predlogi vsebin s pomočjo UI |
| `YOUTUBE_API_KEY` | Iskanje in vdelava pridig z YouTuba |
| `PEXELS_KEY` | Izbirnik slik iz zbirk za graditelj spletnih mest |
| `VIMEO_TOKEN` | Podpora za pridige na Vimeu |
| `API_BIBLE_KEY` | Iskanje bibličnih verzov v lekcijah in vsebinah |
| `YOUVERSION_API_KEY` | Integracija z YouVersion Bible |
| `WEB_PUSH_PUBLIC_KEY` + `WEB_PUSH_PRIVATE_KEY` | Potisna obvestila v brskalniku ([ustvarite par ključev VAPID](./docker.md#push-notifications)) |
| `HUBSPOT_KEY` | Neobvezna sinhronizacija s CRM za nove registracije |

## Posodabljanje

Vsaka storitev je povezana z ustreznim repozitorijem na GitHubu. Potisi v `main` v `ChurchApps/Api`, `ChurchApps/B1Admin` ali `ChurchApps/B1App` sprožijo samodejno ponovno namestitev.

Če želite zapeti določeno različico, na vsaki storitvi spremenite nastavitev **Branch** na oznako ali vejo izdaje. To je priporočena nastavitev za produkcijo – samodejna namestitev iz `main` prevzame tudi delo v teku.

## Stroški

Realne ocene za majhno cerkev (manj kot 200 članov, majhen promet):

| Komponenta | Približni mesečni stroški |
|------------|---------------------------|
| Osnovni paket Railway | 5 $ |
| Vtičnik MySQL | 5 $ + ~1 $ za shranjevanje |
| Računska moč 3 spletnih storitev | 3–10 $ skupaj |
| 1 GB zvezek | 0,25 $ |
| **Skupaj** | **~15–25 $/mesec** |

Stroški se linearno povečujejo s prometom, nalaganjem fotografij in velikostjo baze. Railway prikazuje sprotno porabo na zavihku **Usage** projekta – tam nastavite omejitve porabe, da omejite tveganje.

## Odpravljanje težav

| Simptom | Verjeten vzrok | Rešitev |
|---------|----------------|---------|
| Gradnja ne uspe z `EBUSY: rmdir '/app/node_modules/.cache'` | Konflikt pripetja predpomnilnika Nixpacks | Na prizadeti storitvi nastavite `NIXPACKS_NO_CACHE=true` |
| Gradnja na B1Admin ne uspe z `Missing: @types/...` | Neusklajena datoteka `package-lock.json` | Povlecite najnovejši `main` |
| Namestitev Api obvisi pri „Deploying“ | Preverjanje stanja ne uspe – `/health` ne vrača 200 | Oglejte si dnevnike namestitve; običajno manjka zahtevana spremenljivka okolja |
| B1Admin prikaže „preverite e-pošto“, vendar nobena ne prispe | `MAIL_SYSTEM=SMTP` je nastavljen, poverilnice pa manjkajo ali so napačne | Popravite poverilnice ali odstranite `MAIL_SYSTEM`, da onemogočite e-pošto |
| Prijava preusmeri na `api.churchapps.org` | `REACT_APP_STAGE` je `prod` | Na storitvi B1Admin nastavite `REACT_APP_STAGE=custom` |
| Vse cerkve s poddomenami prikazujejo isto vsebino | `REACT_APP_B1_WEBSITE_URL` ne vsebuje oznake `{subdomain}` | Nastavite npr. `https://{subdomain}.yourchurch.org` |
| Lastna domena prikazuje „Application not found“ | DNS se še ni razširil ali certifikat Railway čaka | Počakajte 5 minut; preverite DNS z `dig admin.yourchurch.org` |

Če naletite na nekaj, česar ni na tem seznamu, odprite prijavo težave na [github.com/ChurchApps/Api/issues](https://github.com/ChurchApps/Api/issues) in priložite dnevnike namestitve.

## Sorodni članki

- **[Samostojno gostovanje z Dockerjem](./docker.md)** — Isti sklad na lastni strojni opremi ali VPS
- **[Začetna nastavitev](../../getting-started/initial-setup.md)** — Prvi koraki po ustvarjenju cerkve
- **[Začetna nastavitev spletnega mesta](../../b1-admin/website/initial-setup.md)** — Konfiguracija javnega spletnega mesta vaše cerkve
- **[Nastavitve darovanj](../../b1-admin/donations/online-giving-setup.md)** — Povežite Stripe ali PayPal
- **[Lokalna nastavitev API](../api/local-setup.md)** — Zagon sklada lokalno za razvoj
- **[Namestitev API (AWS)](./apis.md)** — Kako je uradni ChurchApps SaaS nameščen
