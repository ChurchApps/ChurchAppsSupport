---
title: "Vlastní hosting na Railway"
description: "Nasaďte soukromou instanci ChurchApps na Railway za zhruba 15 minut, pak nastavte e-mail, vlastní domény, dary a úložiště souborů pro B1 Admin a B1App."
---

# Vlastní hosting na Railway

<div class="article-intro">

ChurchApps nabízí šablonu [Railway](https://railway.com) pro nasazení jedním kliknutím, která vaší církvi poskytne vlastní soukromou instanci B1 Admin, členského portálu B1, API a databáze MySQL. To vše běží na infrastruktuře, kterou vlastníte a platíte ji přímo. Tento návod vás zprovozní asi za 15 minut a poté projde konfigurací po nasazení, kterou si většina církví nakonec chce nastavit.

</div>

## Rychlý start

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/b1-template)

1. Klikněte na tlačítko **Deploy on Railway** výše.
2. Přihlaste se k Railway (nebo si vytvořte bezplatný účet) a přidejte platební metodu.
3. Klikněte na **Deploy**, aniž byste cokoli měnili. Každá proměnná má rozumnou výchozí hodnotu.
4. Počkejte 5–10 minut, než všechny čtyři služby zezelenají.
5. Otevřete URL služby **B1Admin**, klikněte na **Register** a vytvořte si účet. První účet se automaticky stane serverovým administrátorem.
6. Podle pokynů v aplikaci vytvořte svou první církev.

To je vše. Nyní máte plně funkční instanci ChurchApps. Vše níže je volitelné vylepšení.

:::tip
Nasazení je momentálně ve verzi **beta**. Pokud narazíte na něco, co dokumentace nepokrývá, otevřete prosím issue na [github.com/ChurchApps/Api/issues](https://github.com/ChurchApps/Api/issues) a přiložte logy nasazení.
:::

<div class="prereqs">
<h4>Co potřebujete</h4>

- Bezplatný účet na [Railway](https://railway.com)
- Platební karta uložená u Railway (~$15–25 měsíčně pro malý sbor; viz [Náklady](#costs))
- Asi 15 minut na první nasazení
- *Volitelné, ale velmi doporučené později:* přihlašovací údaje SMTP a vlastní doména

</div>

## Co se nasazuje

Šablona vytvoří čtyři služby v jediném projektu Railway:

| Služba | Účel | URL po nasazení |
|--------|------|-----------------|
| **MySQL** | Ukládá všechna data (jedna instance, více schémat) | pouze interně |
| **Api** | Backend pro členství, obsah, dary, docházku atd. | `https://api-<id>.up.railway.app` |
| **B1Admin** | Webová aplikace pro zaměstnance a administrátory | `https://b1admin-<id>.up.railway.app` |
| **B1App** | Webová aplikace pro členy a webové stránky církve | `https://b1app-<id>.up.railway.app` |

Databázová schémata se při prvním spuštění vytvoří automaticky pomocí migrace API při startu.

## Počáteční konfigurace

Když už máte systém spuštěný, zde jsou věci, které si většina církví nastaví jako další, přibližně v pořadí priority.

### 1. E-mail (vysoce doporučeno)

Bez e-mailu se členové mohou stále registrovat a používat systém, ale **nemohou obnovit zapomenutá hesla**. To musí za ně udělat administrátor. Nastavení SMTP zabere asi 5 minut.

V přehledu Railway otevřete službu **Api** → **Variables** a přidejte:

```
MAIL_SYSTEM=SMTP
SMTP_HOST=<your provider host>
SMTP_USER=<your username>
SMTP_PASS=<your password or API key>
SMTP_SECURE=false
SUPPORT_EMAIL=noreply@yourchurch.org
```

Stojí za zmínku tři poskytovatelé:

#### Resend – nejjednodušší bezplatná možnost (100 e-mailů denně)

1. Zaregistrujte se na [resend.com](https://resend.com).
2. Ověřte odesílací doménu (nebo začněte testovacím odesílatelem `onboarding@resend.dev`).
3. Vytvořte API klíč.
4. Nastavte `SMTP_HOST=smtp.resend.com`, `SMTP_USER=resend`, `SMTP_PASS=re_xxxxxxxxx`.

#### Gmail – zdarma pro osobní použití (~500 denně)

1. Zapněte dvoufaktorové ověření u účtu Google.
2. Vytvořte [heslo aplikace](https://myaccount.google.com/apppasswords).
3. Nastavte `SMTP_HOST=smtp.gmail.com`, `SMTP_USER=your-address@gmail.com`, `SMTP_PASS=<16místné heslo aplikace>`.

#### AWS SES – nejlevnější ve velkém měřítku

1. Ověřte odesílací doménu v AWS.
2. Pokud budete posílat na neověřené adresy, vyjměte účet ze sandboxu SES.
3. Vytvořte přihlašovací údaje SMTP v **SES → SMTP Settings → Create credentials**.
4. Nastavte `SMTP_HOST=email-smtp.us-east-2.amazonaws.com`, `SMTP_USER=AKIA...`, `SMTP_PASS=<heslo SMTP pro SES>`.

Po uložení proměnných se služba Api automaticky znovu nasadí. Otestujte to vyvoláním obnovy hesla na testovacím účtu.

:::warning
Pokud nastavíte `MAIL_SYSTEM=SMTP` se špatnými přihlašovacími údaji, registrace se zdánlivě povede, ale ověřovací e-mail nikdy nedorazí. Buď opravte přihlašovací údaje, nebo zrušte `MAIL_SYSTEM`, aby se systém vrátil do režimu bez e-mailu.
:::

### 2. Vlastní domény

Výchozí URL `*.up.railway.app` fungují, ale většina církví chce vlastní.

U každé webové služby (B1Admin a B1App):

1. Otevřete službu v Railway → **Settings** → **Networking**.
2. Klikněte na **+ Custom Domain** a zadejte název hostitele:
   - `admin.yourchurch.org` pro B1Admin
   - `app.yourchurch.org` (nebo `www`) pro B1App
3. Přidejte záznam CNAME, který vám Railway zobrazí, do svého poskytovatele DNS.
4. Počkejte několik minut, než se DNS rozšíří. Railway automaticky vystaví certifikát TLS.

Poté aktualizujte proměnné služby **Api**, aby odkazy v e-mailech používaly nové domény:

```
B1ADMIN_ROOT=https://admin.yourchurch.org
```

A u služby **B1Admin**:

```
REACT_APP_API_BASE=https://api.yourchurch.org   (if you also set a custom API domain)
REACT_APP_B1_WEBSITE_URL=https://{subdomain}.yourchurch.org
```

Token `{subdomain}` je doslovný. Za běhu se nahradí subdoménou každé církve (viz Více webů níže).

### 3. Více webů (více církví v jedné instanci)

ChurchApps je od začátku navrženo jako multi-tenant. Jedno nasazení může hostit libovolný počet církví, každou se svými lidmi, skupinami a webovými stránkami. Nové církve se přidávají výhradně přes administrační rozhraní a žádné změny infrastruktury nejsou potřeba.

#### Přidávání dalších církví

1. V **B1 Admin** přejděte na **Settings → Manage Church → Switch Church → Create New**.
2. Každá církev má jedinečný **slug subdomény** (např. `firstchurch`, `gracecommunity`).
3. Nová církev získá vlastní data, členy, webové stránky a nastavení darů, plně oddělené od ostatních církví na stejné instanci.

#### Směrování každé církve na vlastní URL

Existují dva způsoby, jak církve zveřejnit:

| Způsob | Příklad | Nastavení |
|--------|---------|-----------|
| **Podle cesty** (funguje ihned) | `app.yourchurch.org/firstchurch` | Bez dalšího nastavení |
| **Podle subdomény** (čistší URL) | `firstchurch.yourchurch.org` | Wildcard DNS + wildcard vlastní doména |

Pro směrování **podle subdomény** na Railway:

1. V poskytovateli DNS vytvořte wildcard CNAME: `*.yourchurch.org → <cíl b1app na Railway>`.
2. Na Railway, u služby B1App → **Settings → Networking**, přidejte `*.yourchurch.org` jako vlastní doménu.
3. U služby **B1Admin** nastavte `REACT_APP_B1_WEBSITE_URL=https://{subdomain}.yourchurch.org`.

Po novém nasazení bude web každé církve automaticky dostupný na `<jejich-subdoména>.yourchurch.org`.

:::info
Wildcard vlastní domény vyžadují placený tarif Railway. Směrování podle cesty funguje na každém tarifu a je funkčně stejné. Je jen méně hezké v adresním řádku.
:::

### 4. Online dary (Stripe / PayPal)

Dary se nastavují **pro každou církev zvlášť v administračním rozhraní**, ne pomocí proměnných prostředí. Každá církev tak může používat vlastní obchodní účet.

1. Získejte vývojářské přihlašovací údaje na [Stripe](https://dashboard.stripe.com/) (Developers → API keys) nebo [PayPal](https://developer.paypal.com/) (My Apps & Credentials).
2. V B1 Admin přejděte na **Settings → Giving Settings**.
3. Vyberte poskytovatele, vložte veřejný a tajný klíč a nastavte zpracování poplatků.
4. Volitelně přidejte `GOOGLE_RECAPTCHA_SECRET_KEY` do služby **Api** na Railway, aby veřejné formuláře darů chránily před boty.

### 5. Úložiště souborů

Šablona vytvoří **1 GB trvalý svazek** připojený ke službě Api pro fotografie členů, soubory kázání a nahrané dokumenty.

Chcete-li jej zvětšit, otevřete službu Api → **Volumes** a upravte posuvník velikosti.

Pro větší nasazení (100+ GB nebo mnoho současných nahrávání) přepněte na S3 nastavením těchto proměnných u služby **Api**:

```
FILE_STORE=S3
AWS_S3_BUCKET=<your-bucket>
AWS_ACCESS_KEY_ID=<key>
AWS_SECRET_ACCESS_KEY=<secret>
AWS_REGION=us-east-2
```

Stávající soubory ve svazku se automaticky nepřenesou. Před přepnutím proměnné je zkopírujte do bucketu.

### 6. Volitelné integrace funkcí

Tyto proměnné odemknou konkrétní funkce a všechny je lze přidat později v přehledu Railway. Nastavte je u služby **Api**.

| Proměnná | Funkce, kterou zpřístupňuje |
|----------|-----------------------------|
| `OPENAI_API_KEY` *nebo* `OPENROUTER_API_KEY` | Vyhledávání a návrhy obsahu s pomocí AI |
| `YOUTUBE_API_KEY` | Vyhledávání a vkládání kázání z YouTube |
| `PEXELS_KEY` | Výběr stock obrázků pro tvorbu webu |
| `VIMEO_TOKEN` | Podpora kázání na Vimeo |
| `API_BIBLE_KEY` | Vyhledávání biblických veršů v lekcích a obsahu |
| `YOUVERSION_API_KEY` | Integrace Bible YouVersion |
| `WEB_PUSH_PUBLIC_KEY` + `WEB_PUSH_PRIVATE_KEY` | Push oznámení v prohlížeči ([vygenerujte pár klíčů VAPID](./docker.md#push-notifications)) |
| `HUBSPOT_KEY` | Volitelná synchronizace CRM pro nové registrace |

## Aktualizace

Každá služba je propojena s příslušným repozitářem na GitHubu. Pushe do větve `main` v repozitářích `ChurchApps/Api`, `ChurchApps/B1Admin` nebo `ChurchApps/B1App` automaticky spouštějí nové nasazení.

Chcete-li zafixovat konkrétní verzi, změňte nastavení **Branch** u každé služby na tag nebo větev vydání. Toto je doporučené nastavení pro produkci, protože automatické nasazení z `main` znamená, že převezmete i veškerou rozpracovanou práci.

## Náklady

Reálné rozsahy pro malou církev (do 200 členů, nízký provoz):

| Komponenta | Přibližné měsíční náklady |
|------------|---------------------------|
| Základ Railway | $5 |
| Plugin MySQL | $5 + ~$1 za úložiště |
| Výpočetní výkon 3 webových služeb | $3–10 celkem |
| Svazek 1 GB | $0.25 |
| **Celkem** | **~$15–25 měsíčně** |

Náklady rostou lineárně s provozem, nahráváním fotografií a velikostí databáze. Railway zobrazuje aktuální využití na kartě **Usage** projektu. Nastavte tam limity útrat, abyste omezili své riziko.

## Řešení problémů

| Příznak | Pravděpodobná příčina | Řešení |
|---------|-----------------------|--------|
| Sestavení selže s `EBUSY: rmdir '/app/node_modules/.cache'` | Konflikt připojení cache Nixpacks | Nastavte `NIXPACKS_NO_CACHE=true` u dotčené služby |
| Sestavení B1Admin selže s `Missing: @types/...` | Nesynchronizovaný `package-lock.json` | Stáhněte nejnovější `main` |
| Nasazení Api se zasekne na „Deploying“ | Kontrola stavu selhává, `/health` nevrací 200 | Zobrazte logy nasazení. Obvykle chybí povinná proměnná prostředí |
| B1Admin zobrazí „check your email“, ale žádný e-mail nedorazí | `MAIL_SYSTEM=SMTP` je nastaveno, ale přihlašovací údaje chybí nebo jsou špatné | Opravte přihlašovací údaje, nebo zrušte `MAIL_SYSTEM` a e-maily vypněte |
| Přihlášení přesměruje na `api.churchapps.org` | `REACT_APP_STAGE` je `prod` | Nastavte `REACT_APP_STAGE=custom` u služby B1Admin |
| Všechny církve na subdoménách zobrazují stejný obsah | `REACT_APP_B1_WEBSITE_URL` neobsahuje token `{subdomain}` | Nastavte např. `https://{subdomain}.yourchurch.org` |
| Vlastní doména zobrazuje „Application not found“ | DNS ještě není rozšířen nebo čeká certifikát Railway | Počkejte 5 minut. Zkontrolujte DNS příkazem `dig admin.yourchurch.org` |

Pokud narazíte na něco, co v tomto seznamu není, otevřete issue na [github.com/ChurchApps/Api/issues](https://github.com/ChurchApps/Api/issues) a přiložte logy nasazení.

## Související články

- **[Vlastní hosting s Dockerem](./docker.md)** — Stejný stack na vlastním hardwaru nebo VPS
- **[Počáteční nastavení](../../getting-started/initial-setup.md)** — První kroky po vytvoření církve
- **[Počáteční nastavení webu](../../b1-admin/website/initial-setup.md)** — Nastavte veřejné webové stránky církve
- **[Nastavení darů](../../b1-admin/donations/online-giving-setup.md)** — Propojte Stripe nebo PayPal
- **[Místní nastavení API](../api/local-setup.md)** — Spuštění stacku lokálně pro vývoj
- **[Nasazení API (AWS)](./apis.md)** — Jak je oficiální SaaS ChurchApps nasazen
