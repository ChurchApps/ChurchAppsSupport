---
title: "Self-Hosting on Railway"
description: "Implementați o instanță privată ChurchApps pe Railway în aproximativ 15 minute, apoi configurați e-mailul, domeniile personalizate, rutarea multi-biserică, donațiile și stocarea fișierelor pentru B1 Admin și B1App."
---

# Self-Hosting on Railway

<div class="article-intro">

ChurchApps publică un șablon Railway cu un singur clic [Railway](https://railway.com) care oferă bisericii tale propria instanță privată de B1 Admin, portalul pentru membri B1, API-ul și o bază de date MySQL — toate rulând pe infrastructura pe care o deții și o plătești direct. Acest ghid te pune online în aproximativ 15 minute și apoi parcurge configurarea post-implementare pe care majoritatea bisericilor o doresc în cele din urmă.

</div>

## Pornire rapidă

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/b1-template)

1. Fă clic pe butonul **Deploy on Railway** de mai sus.
2. Autentifică-te în Railway (sau creează un cont gratuit) și adaugă o metodă de plată.
3. Fă clic pe **Deploy** fără să modifici nimic — fiecare variabilă are o valoare implicită rezonabilă.
4. Așteaptă 5–10 minute până când cele patru servicii devin verzi.
5. Deschide URL-ul serviciului **B1Admin**, fă clic pe **Register** și creează-ți contul. Primul cont este automat administrator de server.
6. Urmează solicitările din aplicație pentru a crea prima ta biserică.

Atât. Acum ai o instanță ChurchApps complet funcțională. Tot ce urmează este opțional.

:::tip
Implementarea se află în prezent în **beta**. Dacă întâmpini ceva ce documentația nu acoperă, te rugăm să deschizi o problemă la [github.com/ChurchApps/Api/issues](https://github.com/ChurchApps/Api/issues), atașând jurnalele de implementare.
:::

<div class="prereqs">
<h4>Ce ai nevoie</h4>

- Un cont gratuit [Railway](https://railway.com)
- Un card de credit asociat contului Railway (~15–25 USD/lună pentru o congregație mică; vezi [Costuri](#costs))
- Aproximativ 15 minute pentru implementarea inițială
- *Opțional, dar foarte recomandat ulterior:* credențiale SMTP și un domeniu personalizat

</div>

## Ce se implementează

Șablonul pregătește patru servicii într-un singur proiect Railway:

| Serviciu | Scop | URL după implementare |
|---------|------|------------------|
| **MySQL** | Stochează toate datele (o instanță, mai multe scheme) | doar intern |
| **Api** | Backend pentru membri, conținut, donații, prezență etc. | `https://api-<id>.up.railway.app` |
| **B1Admin** | Aplicația web pentru personal/administratori | `https://b1admin-<id>.up.railway.app` |
| **B1App** | Aplicația web pentru membri și site-ul bisericii | `https://b1app-<id>.up.railway.app` |

Schemele bazei de date sunt create automat la prima pornire, de migrarea de pornire a API-ului.

## Configurare inițială

Acum că instanța funcționează, iată lucrurile pe care majoritatea bisericilor le configurează în continuare, aproximativ în ordinea priorității.

### 1. E-mail (foarte recomandat)

Fără e-mail, membrii se pot înregistra și pot folosi sistemul, dar **nu își pot reseta parolele uitate** — un administrator trebuie să o facă pentru ei. Configurarea SMTP durează aproximativ 5 minute.

În panoul Railway, deschide serviciul **Api** → **Variables** și adaugă:

```
MAIL_SYSTEM=SMTP
SMTP_HOST=<gazda furnizorului tău>
SMTP_USER=<numele tău de utilizator>
SMTP_PASS=<parola sau cheia API>
SMTP_SECURE=false
SUPPORT_EMAIL=noreply@yourchurch.org
```

Trei furnizori merită cunoscuți:

#### Resend — cea mai simplă opțiune gratuită (100 de e-mailuri/zi)

1. Înscrie-te la [resend.com](https://resend.com).
2. Verifică un domeniu de expediere (sau folosește expeditorul de test `onboarding@resend.dev` pentru a începe).
3. Creează o cheie API.
4. Setează `SMTP_HOST=smtp.resend.com`, `SMTP_USER=resend`, `SMTP_PASS=re_xxxxxxxxx`.

#### Gmail — gratuit pentru uz personal (~500/zi)

1. Activează autentificarea în doi pași pentru contul Google.
2. Creează o [parolă pentru aplicații](https://myaccount.google.com/apppasswords).
3. Setează `SMTP_HOST=smtp.gmail.com`, `SMTP_USER=your-address@gmail.com`, `SMTP_PASS=<parola pentru aplicații de 16 caractere>`.

#### AWS SES — cel mai ieftin la scară mare

1. Verifică un domeniu de expediere în AWS.
2. Ieși din sandbox-ul SES dacă vei trimite către adrese neverificate.
3. Creează credențiale SMTP la **SES → SMTP Settings → Create credentials**.
4. Setează `SMTP_HOST=email-smtp.us-east-2.amazonaws.com`, `SMTP_USER=AKIA...`, `SMTP_PASS=<parola SMTP SES>`.

După salvarea variabilelor, serviciul Api se redeployează automat. Testează-l declanșând o resetare a parolei pentru un cont de test.

:::warning
Dacă setezi `MAIL_SYSTEM=SMTP` cu credențiale greșite, înregistrarea va părea reușită, dar e-mailul de verificare nu sosește niciodată. Fie corectează credențialele, fie elimină `MAIL_SYSTEM` pentru a reveni la modul fără e-mail.
:::

### 2. Domenii personalizate

Adresele implicite `*.up.railway.app` funcționează, dar majoritatea bisericilor își doresc propriul domeniu.

Pentru fiecare serviciu web (B1Admin și B1App):

1. Deschide serviciul în Railway → **Settings** → **Networking**.
2. Fă clic pe **+ Custom Domain** și introdu numele de gazdă:
   - `admin.yourchurch.org` pentru B1Admin
   - `app.yourchurch.org` (sau `www`) pentru B1App
3. Adaugă înregistrarea CNAME pe care ți-o arată Railway la furnizorul tău DNS.
4. Așteaptă câteva minute până se propagă DNS-ul. Railway emite automat certificatul TLS.

Apoi actualizează variabilele serviciului **Api**, astfel încât linkurile din e-mailuri să folosească noile domenii:

```
B1ADMIN_ROOT=https://admin.yourchurch.org
```

Și pe serviciul **B1Admin**:

```
REACT_APP_API_BASE=https://api.yourchurch.org   (dacă setezi și un domeniu personalizat pentru API)
REACT_APP_B1_WEBSITE_URL=https://{subdomain}.yourchurch.org
```

Simbolul `{subdomain}` este literal — este înlocuit la rulare cu subdomeniul fiecărei biserici (vezi Multi-Site mai jos).

### 3. Multi-Site (mai multe biserici pe o singură instanță)

ChurchApps este multi-tenant prin design — o singură implementare poate găzdui oricâte biserici, fiecare cu propriii membri, grupuri și site-ul web. Bisericile noi se adaugă exclusiv din interfața de administrare; nu sunt necesare modificări de infrastructură.

#### Adăugarea altor biserici

1. În **B1 Admin**, navighează la **Settings → Manage Church → Switch Church → Create New**.
2. Fiecare biserică are un **slug de subdomeniu** unic (de ex. `firstchurch`, `gracecommunity`).
3. Noua biserică primește propriile date, membri, site web și configurare a donațiilor, complet izolate de celelalte biserici de pe aceeași instanță.

#### Direcționarea fiecărei biserici către propriul URL

Există două moduri de a expune bisericile public:

| Model | Exemplu | Configurare |
|---------|---------|-------------|
| **Pe bază de cale** (funcționează din prima) | `app.yourchurch.org/firstchurch` | Nicio configurare suplimentară |
| **Pe bază de subdomeniu** (URL-uri mai curate) | `firstchurch.yourchurch.org` | DNS wildcard + domeniu personalizat wildcard |

Pentru direcționarea **pe bază de subdomeniu** pe Railway:

1. În furnizorul tău DNS, creează un CNAME wildcard: `*.yourchurch.org → <ținta Railway a b1app>`.
2. În Railway, pe serviciul B1App → **Settings → Networking**, adaugă `*.yourchurch.org` ca domeniu personalizat.
3. Pe serviciul **B1Admin**, setează `REACT_APP_B1_WEBSITE_URL=https://{subdomain}.yourchurch.org`.

După redeploy, site-ul fiecărei biserici este servit automat la `<subdomeniul-lor>.yourchurch.org`.

:::info
Domeniile personalizate wildcard necesită un plan Railway plătit. Direcționarea pe bază de cale funcționează pe toate planurile și este identică din punct de vedere funcțional — doar mai puțin elegantă în bara de adrese.
:::

### 4. Donații online (Stripe / PayPal)

Donațiile se configurează **pentru fiecare biserică în interfața de administrare**, nu prin variabile de mediu — astfel, fiecare biserică își poate folosi propriul cont comercial.

1. Obține credențialele de dezvoltator de la [Stripe](https://dashboard.stripe.com/) (Developers → API keys) sau [PayPal](https://developer.paypal.com/) (My Apps & Credentials).
2. În B1 Admin, mergi la **Settings → Giving Settings**.
3. Alege furnizorul, lipește cheile Publică și Secretă și configurează modul de gestionare a comisioanelor.
4. Opțional, adaugă `GOOGLE_RECAPTCHA_SECRET_KEY` la serviciul **Api** în Railway, pentru a proteja formularele publice de donații de boți.

### 5. Stocarea fișierelor

Șablonul pregătește un **volum persistent de 1 GB** montat pe serviciul Api, pentru fotografiile membrilor, fișierele cu predici și documentele încărcate.

Pentru a-l mări: deschide serviciul Api → **Volumes** → ajustează glisorul de dimensiune.

Pentru implementări mai mari (100+ GB sau multe încărcări simultane), treci la S3 setând următoarele pe serviciul **Api**:

```
FILE_STORE=S3
AWS_S3_BUCKET=<your-bucket>
AWS_ACCESS_KEY_ID=<key>
AWS_SECRET_ACCESS_KEY=<secret>
AWS_REGION=us-east-2
```

Fișierele existente din volum nu se migrează automat — copiază-le în bucket înainte de a schimba variabila.

### 6. Integrări opționale de funcționalități

Acestea activează funcționalități specifice și pot fi adăugate oricând mai târziu din panoul Railway. Setează-le pe serviciul **Api**.

| Variabilă | Funcționalitate activată |
|----------|--------------------|
| `OPENAI_API_KEY` *sau* `OPENROUTER_API_KEY` | Căutare și sugestii de conținut asistate de IA |
| `YOUTUBE_API_KEY` | Căutarea și inserarea predicilor de pe YouTube |
| `PEXELS_KEY` | Selector de imagini stock pentru constructorul de site-uri |
| `VIMEO_TOKEN` | Suport pentru predici de pe Vimeo |
| `API_BIBLE_KEY` | Căutări de versete biblice în lecții și conținut |
| `YOUVERSION_API_KEY` | Integrare cu YouVersion Bible |
| `WEB_PUSH_PUBLIC_KEY` + `WEB_PUSH_PRIVATE_KEY` | Notificări push în browser ([generează o pereche de chei VAPID](./docker.md#push-notifications)) |
| `HUBSPOT_KEY` | Sincronizare opțională cu CRM pentru înregistrările noi |

## Actualizare

Fiecare serviciu este conectat la depozitul GitHub corespunzător. Push-urile pe `main` din `ChurchApps/Api`, `ChurchApps/B1Admin` sau `ChurchApps/B1App` declanșează redeploy-uri automate.

Pentru a fixa o versiune specifică, schimbă setarea **Branch** de pe fiecare serviciu la o etichetă (tag) sau o ramură de lansare. Aceasta este configurația recomandată pentru producție — implementarea automată de pe `main` îți aduce și lucrările în curs de dezvoltare.

## Costuri

Intervale reale pentru o biserică mică (sub 200 de membri, trafic redus):

| Componentă | Cost lunar aproximativ |
|-----------|---------------------|
| Bază Railway | 5 USD |
| Plugin MySQL | 5 USD + ~1 USD stocare |
| Calcul pentru 3 servicii web | 3–10 USD combinat |
| Volum de 1 GB | 0,25 USD |
| **Total** | **~15–25 USD/lună** |

Costurile cresc liniar odată cu traficul, încărcările de fotografii și dimensiunea bazei de date. Railway afișează utilizarea în timp real în fila **Usage** a proiectului — setează acolo limite de cheltuieli pentru a-ți plafona expunerea.

## Depanare

| Simptom | Cauză probabilă | Remediere |
|---------|--------------|-----|
| Build-ul eșuează cu `EBUSY: rmdir '/app/node_modules/.cache'` | Conflict de montare a cache-ului Nixpacks | Setează `NIXPACKS_NO_CACHE=true` pe serviciul afectat |
| Build-ul eșuează pe B1Admin cu `Missing: @types/...` | `package-lock.json` nesincronizat | Trage ultima versiune de pe `main` |
| Implementarea Api rămâne blocată la „Deploying” | Verificarea de sănătate eșuează — `/health` nu returnează 200 | Vezi jurnalele de implementare; de obicei lipsește o variabilă de mediu obligatorie |
| B1Admin afișează „check your email”, dar nu sosește niciun e-mail | `MAIL_SYSTEM=SMTP` setat, dar credențiale lipsă sau greșite | Corectează credențialele sau elimină `MAIL_SYSTEM` pentru a dezactiva e-mailul |
| Autentificarea redirecționează către `api.churchapps.org` | `REACT_APP_STAGE` este `prod` | Setează `REACT_APP_STAGE=custom` pe serviciul B1Admin |
| Toate bisericile din subdomenii afișează același conținut | `REACT_APP_B1_WEBSITE_URL` nu include simbolul `{subdomain}` | Setează-l la, de exemplu, `https://{subdomain}.yourchurch.org` |
| Domeniul personalizat afișează „Application not found” | DNS-ul nu s-a propagat încă sau certificatul Railway este în așteptare | Așteaptă 5 minute; verifică DNS-ul cu `dig admin.yourchurch.org` |

Dacă întâmpini ceva ce nu este în această listă, deschide o problemă la [github.com/ChurchApps/Api/issues](https://github.com/ChurchApps/Api/issues), atașând jurnalele de implementare.

## Articole similare

- **[Self-Hosting with Docker](./docker.md)** — Aceeași stivă pe propriul hardware sau VPS
- **[Initial Setup](../../getting-started/initial-setup.md)** — Primii pași după ce biserica ta este creată
- **[Website Initial Setup](../../b1-admin/website/initial-setup.md)** — Configurează site-ul public al bisericii tale
- **[Giving Settings](../../b1-admin/donations/online-giving-setup.md)** — Conectează Stripe sau PayPal
- **[Local API Setup](../api/local-setup.md)** — Rularea stivei local, pentru dezvoltare
- **[API Deployment (AWS)](./apis.md)** — Cum este implementat SaaS-ul oficial ChurchApps
