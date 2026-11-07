---
title: "Self-hosting na Railway"
---

# Self-hosting na Railway

<div class="article-intro">

ChurchApps publikuje šablónu [Railway](https://railway.com) na nasadenie jedným kliknutím, ktorá vášmu kostolu poskytne vlastnú súkromnú inštanciu B1 Admin, členský portál B1, API a databázu MySQL. Všetko beží na infraštruktúre, ktorú vlastníte a platíte priamo. Tento návod vás dostane naživo asi za 15 minút a potom prejde konfiguráciou po nasadení, ktorú si väčšina kostolov časom želá.

</div>

## Rýchly štart

[![Nasadiť na Railway](https://railway.com/button.svg)](https://railway.com/deploy/b1-template)

1. Kliknite na tlačidlo **Nasadiť na Railway** vyššie.
2. Prihláste sa do Railway (alebo si vytvorte bezplatný účet) a pridajte platobnú metódu.
3. Kliknite na **Deploy** bez zmeny čohokoľvek. Každá premenná má rozumnú predvolenú hodnotu.
4. Počkajte 5–10 minút, kým štyri služby nezozelenajú.
5. Otvorte URL služby **B1Admin**, kliknite na **Register** a vytvorte si účet. Prvý účet sa automaticky stane serverovým administrátorom.
6. Podľa výziev v aplikácii vytvorte svoj prvý kostol.

To je všetko. Teraz máte plne funkčnú inštanciu ChurchApps. Všetko nižšie je voliteľné doladenie.

:::tip
Nasadenie je momentálne v **beta** verzii. Ak narazíte na niečo, čo dokumentácia nepokrýva, otvorte prosím issue na [github.com/ChurchApps/Api/issues](https://github.com/ChurchApps/Api/issues) a priložte logy nasadenia.
:::

<div class="prereqs">
<h4>Čo potrebujete</h4>

- Bezplatný účet [Railway](https://railway.com)
- Platobnú kartu uloženú v Railway (~15–25 USD mesačne pre malú zbor; pozri [Náklady](#costs))
- Asi 15 minút na počiatočné nasadenie
- *Voliteľné, ale neskôr silne odporúčané:* prihlasovacie údaje SMTP a vlastná doména

</div>

## Čo sa nasadzuje

Šablóna pripraví štyri služby v jednom projekte Railway:

| Služba | Účel | URL po nasadení |
|--------|------|-----------------|
| **MySQL** | Ukladá všetky dáta (jedna inštancia, viacero schém) | iba interne |
| **Api** | Backend pre členstvo, obsah, dary, účasť a ďalšie | `https://api-<id>.up.railway.app` |
| **B1Admin** | Webová aplikácia pre zamestnancov a administrátorov | `https://b1admin-<id>.up.railway.app` |
| **B1App** | Webová aplikácia pre členov a webová stránka kostola | `https://b1app-<id>.up.railway.app` |

Schémy databázy sa pri prvom spustení automaticky vytvoria pomocou štartovacej migrácie API.

## Konfigurácia pri prvom spustení

Keď je systém spustený, tu sú veci, ktoré si väčšina kostolov nastaví ako ďalšie, zhruba v poradí priority.

### 1. E-mail (dôrazne odporúčané)

Bez e-mailu sa členovia môžu registrovať a používať systém, ale **nemôžu si obnoviť zabudnuté heslá**. Musí to za nich urobiť administrátor. Nastavenie SMTP trvá asi 5 minút.

V paneli Railway otvorte službu **Api** → **Variables** a pridajte:

```
MAIL_SYSTEM=SMTP
SMTP_HOST=<your provider host>
SMTP_USER=<your username>
SMTP_PASS=<your password or API key>
SMTP_SECURE=false
SUPPORT_EMAIL=noreply@yourchurch.org
```

Stoja za pozornosť tri poskytovatelia:

#### Resend — najjednoduchšia bezplatná možnosť (100 e-mailov denne)

1. Zaregistrujte sa na [resend.com](https://resend.com).
2. Overte odosielaciu doménu (alebo na začiatok použite testovacieho odosielateľa `onboarding@resend.dev`).
3. Vytvorte API kľúč.
4. Nastavte `SMTP_HOST=smtp.resend.com`, `SMTP_USER=resend`, `SMTP_PASS=re_xxxxxxxxx`.

#### Gmail — zadarmo pre osobné použitie (~500 denne)

1. Zapnite 2-faktorové overovanie na účte Google.
2. Vytvorte [App Password](https://myaccount.google.com/apppasswords).
3. Nastavte `SMTP_HOST=smtp.gmail.com`, `SMTP_USER=your-address@gmail.com`, `SMTP_PASS=<the 16-character app password>`.

#### AWS SES — najlacnejšie pri veľkom objeme

1. Overte odosielaciu doménu v AWS.
2. Ak budete posielať na neoverené adresy, opustite SES sandbox.
3. Vytvorte prihlasovacie údaje SMTP v **SES → SMTP Settings → Create credentials**.
4. Nastavte `SMTP_HOST=email-smtp.us-east-2.amazonaws.com`, `SMTP_USER=AKIA...`, `SMTP_PASS=<SES SMTP password>`.

Po uložení premenných sa služba Api automaticky znova nasadí. Otestujte to vyvolaním obnovy hesla na testovacom účte.

:::warning
Ak nastavíte `MAIL_SYSTEM=SMTP` s nesprávnymi prihlasovacími údajmi, registrácia sa bude zdať úspešná, ale overovací e-mail nikdy nedorazí. Buď opravte prihlasovacie údaje, alebo zrušte `MAIL_SYSTEM`, aby sa systém vrátil do režimu bez e-mailu.
:::

### 2. Vlastné domény

Predvolené URL `*.up.railway.app` fungujú, ale väčšina kostolov chce vlastné.

Pre každú webovú službu (B1Admin a B1App):

1. V Railway otvorte službu → **Settings** → **Networking**.
2. Kliknite na **+ Custom Domain** a zadajte názov hostiteľa:
   - `admin.yourchurch.org` pre B1Admin
   - `app.yourchurch.org` (alebo `www`) pre B1App
3. Pridajte záznam CNAME, ktorý vám Railway zobrazí, do svojho poskytovateľa DNS.
4. Počkajte niekoľko minút, kým sa DNS rozšíri. Railway automaticky vydá certifikát TLS.

Potom aktualizujte premenné služby **Api**, aby odkazy v e-mailoch používali nové domény:

```
B1ADMIN_ROOT=https://admin.yourchurch.org
```

A v službe **B1Admin**:

```
REACT_APP_API_BASE=https://api.yourchurch.org   (if you also set a custom API domain)
REACT_APP_B1_WEBSITE_URL=https://{subdomain}.yourchurch.org
```

Token `{subdomain}` je doslovný. Za behu sa nahradí subdoménou každého kostola (pozri Viacero webov nižšie).

### 3. Viacero webov (viacero kostolov na jednej inštancii)

ChurchApps je navrhnutý ako multi-tenant. Jedno nasadenie môže hostiť ľubovoľný počet kostolov, každý s vlastnými ľuďmi, skupinami a webovou stránkou. Nové kostoly sa pridávajú výhradne cez administračné rozhranie, bez zmien infraštruktúry.

#### Pridávanie ďalších kostolov

1. V **B1 Admin** prejdite na **Settings → Manage Church → Switch Church → Create New**.
2. Každý kostol má jedinečný **slug subdomény** (napr. `firstchurch`, `gracecommunity`).
3. Nový kostol dostane vlastné dáta, členov, webovú stránku a nastavenie darov, úplne izolované od ostatných kostolov na tej istej inštancii.

#### Smerovanie každého kostola na vlastnú URL

Existujú dva spôsoby, ako kostoly sprístupniť verejne:

| Vzor | Príklad | Nastavenie |
|------|---------|------------|
| **Podľa cesty** (funguje hneď) | `app.yourchurch.org/firstchurch` | Žiadne ďalšie nastavenie |
| **Podľa subdomény** (čistejšie URL) | `firstchurch.yourchurch.org` | Wildcard DNS + wildcard vlastná doména |

Pre smerovanie podľa subdomény na Railway:

1. Vo svojom poskytovateľovi DNS vytvorte wildcard CNAME: `*.yourchurch.org → <b1app railway target>`.
2. V Railway, v službe B1App → **Settings → Networking**, pridajte `*.yourchurch.org` ako vlastnú doménu.
3. V službe **B1Admin** nastavte `REACT_APP_B1_WEBSITE_URL=https://{subdomain}.yourchurch.org`.

Po opätovnom nasadení sa web každého kostola automaticky sprístupní na `<their-subdomain>.yourchurch.org`.

:::info
Wildcard vlastné domény vyžadujú platený plán Railway. Smerovanie podľa cesty funguje na každom pláne a je funkčne rovnaké. V paneli s URL je len menej pekné.
:::

### 4. Online dary (Stripe / PayPal)

Dary sa nastavujú **pre každý kostol v administračnom rozhraní**, nie cez premenné prostredia. Tak môže každý kostol používať vlastný obchodný účet.

1. Získajte vývojárske prihlasovacie údaje na [Stripe](https://dashboard.stripe.com/) (Developers → API keys) alebo [PayPal](https://developer.paypal.com/) (My Apps & Credentials).
2. V B1 Admin prejdite na **Settings → Giving Settings**.
3. Vyberte svojho poskytovateľa, vložte verejný a tajný kľúč a nastavte spracovanie poplatkov.
4. Voliteľne pridajte `GOOGLE_RECAPTCHA_SECRET_KEY` do služby **Api** v Railway, aby ste verejné formuláre darov chránili pred botmi.

### 5. Úložisko súborov

Šablóna pripraví **trvalý zväzok 1 GB** pripojený k službe Api pre fotografie členov, súbory kázní a nahrané dokumenty.

Ak ho chcete zväčšiť, otvorte službu Api → **Volumes** a upravte posuvník veľkosti.

Pre väčšie nasadenia (100+ GB alebo veľa súčasných nahrávaní) prejdite na S3 nastavením týchto premenných v službe **Api**:

```
FILE_STORE=S3
AWS_S3_BUCKET=<your-bucket>
AWS_ACCESS_KEY_ID=<key>
AWS_SECRET_ACCESS_KEY=<secret>
AWS_REGION=us-east-2
```

Existujúce súbory v zväzku sa automaticky neprenesú. Pred zmenou premennej ich skopírujte do bucketu.

### 6. Voliteľné integrácie funkcií

Tieto integrácie odomykajú konkrétne funkcie a dajú sa pridať neskôr cez panel Railway. Nastavte ich v službe **Api**.

| Premenná | Funkcia, ktorú umožňuje |
|----------|-------------------------|
| `OPENAI_API_KEY` *alebo* `OPENROUTER_API_KEY` | Vyhľadávanie a návrhy obsahu s podporou AI |
| `YOUTUBE_API_KEY` | Vyhľadávanie a vkladanie kázní z YouTube |
| `PEXELS_KEY` | Výber stockových obrázkov pre tvorbu webu |
| `VIMEO_TOKEN` | Podpora kázní na Vimeo |
| `API_BIBLE_KEY` | Vyhľadávanie biblických veršov v lekciách a obsahu |
| `YOUVERSION_API_KEY` | Integrácia Biblie YouVersion |
| `WEB_PUSH_PUBLIC_KEY` + `WEB_PUSH_PRIVATE_KEY` | Push upozornenia v prehliadači ([vygenerujte pár kľúčov VAPID](./docker#push-notifications)) |
| `HUBSPOT_KEY` | Voliteľná synchronizácia CRM pre nové registrácie |

## Aktualizácie

Každá služba je prepojená so zodpovedajúcim repozitárom na GitHub. Nahrania do `main` v `ChurchApps/Api`, `ChurchApps/B1Admin` alebo `ChurchApps/B1App` spustia automatické nasadenie.

Ak chcete pripnúť konkrétnu verziu, zmeňte nastavenie **Branch** každej služby na tag alebo vetvu vydania. Pre produkciu sa to odporúča. Automatické nasadzovanie z `main` by vám priniesť aj prácu, ktorá ešte nie je hotová.

## Náklady

Reálne rozsahy pre malý kostol (do 200 členov, malá návštevnosť):

| Komponent | Približná mesačná cena |
|-----------|------------------------|
| Základ Railway | 5 USD |
| Plugin MySQL | 5 USD + ~1 USD úložisko |
| Výpočtový výkon 3 webových služieb | 3–10 USD spolu |
| Zväzok 1 GB | 0,25 USD |
| **Spolu** | **~15–25 USD mesačne** |

Náklady rastú lineárne s návštevnosťou, nahrávaním fotografií a veľkosťou databázy. Živé využitie zobrazuje Railway na karte **Usage** projektu. Nastavte tam limity výdavkov, aby ste obmedzili svoje riziko.

## Riešenie problémov

| Príznak | Pravdepodobná príčina | Riešenie |
|---------|----------------------|----------|
| Zostavenie zlyháva s `EBUSY: rmdir '/app/node_modules/.cache'` | Konflikt pripojenia cache Nixpacks | Nastavte `NIXPACKS_NO_CACHE=true` na dotknutej službe |
| Zostavenie B1Admin zlyháva s `Missing: @types/...` | Nezosynchronizovaný `package-lock.json` | Stiahnite najnovšiu verziu `main` |
| Nasadenie Api visí na "Deploying" | Kontrola stavu zlyháva, `/health` nevracia 200 | Zobrazte logy nasadenia; zvyčajne chýba povinná premenná prostredia |
| B1Admin zobrazuje "check your email", ale e-mail nedorazí | `MAIL_SYSTEM=SMTP` je nastavené, ale prihlasovacie údaje chýbajú alebo sú nesprávne | Opravte prihlasovacie údaje alebo zrušte `MAIL_SYSTEM`, aby sa e-mail vypol |
| Prihlásenie presmeruje na `api.churchapps.org` | `REACT_APP_STAGE` je `prod` | Nastavte `REACT_APP_STAGE=custom` na službe B1Admin |
| Všetky kostoly na subdoménach zobrazujú rovnaký obsah | `REACT_APP_B1_WEBSITE_URL` neobsahuje token `{subdomain}` | Nastavte napríklad `https://{subdomain}.yourchurch.org` |
| Vlastná doména zobrazuje "Application not found" | DNS sa ešte nerozšírilo alebo certifikát Railway čaká | Počkajte 5 minút; skontrolujte DNS príkazom `dig admin.yourchurch.org` |

Ak narazíte na niečo, čo tu nie je, otvorte issue na [github.com/ChurchApps/Api/issues](https://github.com/ChurchApps/Api/issues) a priložte logy nasadenia.

## Súvisiace články

- **[Self-hosting s Dockerom](./docker)** — Rovnaký stack na vlastnom hardvéri alebo VPS
- **[Počiatočné nastavenie](../../getting-started/initial-setup)** — Prvé kroky po vytvorení kostola
- **[Počiatočné nastavenie webu](../../b1-admin/website/initial-setup)** — Konfigurácia verejnej stránky kostola
- **[Nastavenia darov](../../b1-admin/donations/online-giving-setup)** — Pripojenie Stripe alebo PayPal
- **[Lokálne nastavenie API](../api/local-setup)** — Spustenie stacku lokálne na vývoj
- **[Nasadenie API (AWS)](./apis)** — Ako sa nasadzuje oficiálny SaaS ChurchApps
