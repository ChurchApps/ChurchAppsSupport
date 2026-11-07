---
title: "Self-Hosting with Docker"
description: "Instalați pe propriul calculator un stack privat B1 Admin, portal pentru membri, API și MySQL cu Docker, apoi actualizați-l și faceți backup cu comanda b1."
---

# Self-Hosting with Docker

<div class="article-intro">

Rulați propria instanță privată a B1 Admin, a portalului și site-ului web pentru membri B1, a API-ului și a unei baze de date MySQL pe orice mașină cu Docker — un server de acasă, un VPS mic sau un dispozitiv local. O singură comandă instalează totul, o singură comandă îl actualizează, iar fiecare actualizare face mai întâi o copie de rezervă. Dacă preferați să nu gestionați deloc un server, consultați [Self-Hosting on Railway](./railway-template.md) pentru varianta administrată.

</div>

## Pornire rapidă

<div class="prereqs">
<h4>Ce aveți nevoie</h4>

- O mașină Linux (sau macOS / Windows cu WSL sau Git Bash — utilitarul `b1` este un script bash) cu [Docker Engine](https://docs.docker.com/engine/install/) și Compose v2 (inclus în Docker Desktop)
- Aproximativ 2 GB de RAM și 5 GB de spațiu pe disc
- Pentru un site public: un nume de domeniu care indică spre mașină, cu porturile 80 și 443 accesibile

</div>

```bash
curl -fsSL https://raw.githubusercontent.com/ChurchApps/B1Admin/main/deploy/install.sh | bash -s -- --domain church.example.org
```

Omiteți `--domain` pentru a rula pe `http://localhost`. Programul de instalare creează un dosar `b1church`, scrie un fișier `.env` cu secrete generate proaspăt, descarcă imaginile pregătite din GitHub Container Registry și așteaptă până când API-ul raportează că este funcțional. Nimic nu se compilează pe mașina dvs., așa că prima pornire durează un minut sau două.

Când procesul se încheie:

1. Deschideți **https://church.example.org/admin** (sau http://localhost/admin) și apăsați **Register**. Primul cont devine automat administrator al serverului.
2. Urmați instrucțiunile din aplicație pentru a crea prima biserică. Site-ul și portalul pentru membri ai acesteia devin disponibile la **https://church.example.org/** imediat după creare.

Totul rulează sub un singur domeniu:

| Cale | Serviciu |
|------|----------|
| `/` | B1App — site-ul bisericii și portalul pentru membri |
| `/admin` | B1Admin — panoul personalului |
| `/api` | API, fișierele încărcate și websocket-ul pentru actualizări în timp real |

HTTPS este automat: proxy-ul [Caddy](https://caddyserver.com/) inclus obține și reînnoiește un certificat Let's Encrypt pentru domeniul din `.env`. Doar porturile 80 și 443 sunt expuse; baza de date este accesibilă doar din rețeaua Docker internă.

## Comanda `b1`

Programul de instalare lasă un script `deploy/b1` lângă `docker-compose.yml`. Este singurul lucru de care aveți nevoie zi de zi:

| Comandă | Ce face |
|---------|---------|
| `./deploy/b1 upgrade` | Descarcă ultima versiune, face o copie de rezervă, repornește și verifică dacă API-ul funcționează |
| `./deploy/b1 upgrade 2026.10.1` | Același lucru, fixat la o anumită versiune |
| `./deploy/b1 backup` | Salvează un instantaneu al bazei de date, al fișierelor încărcate și al `.env` în `backups/<timestamp>/` |
| `./deploy/b1 restore backups/<timestamp>` | Restaurează un instantaneu (API-ul se oprește în timpul acestui proces) |
| `./deploy/b1 rollback` | Restaurează cea mai recentă copie de rezervă, inclusiv versiunea în care a fost făcută |
| `./deploy/b1 status` | Versiunea instalată și starea containerelor |
| `./deploy/b1 logs api` | Urmărește jurnalele unui serviciu |

Versiunile sunt publicate ca un singur pachet versionat, astfel încât cele trei imagini se potrivesc întotdeauna. `B1_VERSION=stable` din `.env` urmărește ultima versiune; setați o versiune specifică pentru a o fixa. Notele de lansare se găsesc în [B1Admin releases](https://github.com/ChurchApps/B1Admin/releases).

## Configurare

Toate setările se află în `.env`, lângă `docker-compose.yml`. Programul de instalare completează cele obligatorii:

```bash
B1_VERSION=stable
DOMAIN=church.example.org
SITE_ADDRESS=church.example.org          # ce servește Caddy; http://localhost pentru o instalare locală
PUBLIC_URL=https://church.example.org    # cum ajung browserele și e-mailurile la site
MYSQL_ROOT_PASSWORD=…                    # generat
JWT_SECRET=…                             # generat
ENCRYPTION_KEY=…                         # generat, exact 32 de caractere — nu o schimbați niciodată după ce au fost stocate credențiale

# E-mail — foarte recomandat; fără el, membrii nu își pot reseta parolele
MAIL_SYSTEM=SMTP
SMTP_HOST=smtp.resend.com
SMTP_USER=resend
SMTP_PASS=re_xxxxxxxxx
SMTP_SECURE=false
SUPPORT_EMAIL=noreply@church.example.org
```

După ce editați `.env`, aplicați modificările cu `docker compose up -d`. Aplicațiile web își dau seama ce API să folosească din adresa din browser, deci schimbarea domeniului necesită doar actualizarea `SITE_ADDRESS` și `PUBLIC_URL` și o repornire — fără recompilare.

:::warning
Păstrați `.env` în siguranță. `ENCRYPTION_KEY` protejează credențialele stocate ale gateway-urilor de plată și ale spațiului de stocare; o copie de rezervă fără ea nu poate decripta aceste credențiale. `./deploy/b1 backup` include o copie a acestei chei din acest motiv.
:::

### Trecerea la un domeniu mai târziu

Dacă ați instalat pe `localhost` și doriți ulterior să fie public: indicați DNS-ul spre mașină, setați în `.env` `DOMAIN`, `SITE_ADDRESS` (doar domeniul) și `PUBLIC_URL` (`https://` + domeniul), apoi rulați `docker compose up -d`. Caddy obține un certificat la prima cerere.

## E-mail, donații, mai multe site-uri și integrări

Acestea funcționează exact ca pe Railway — aceleași variabile de mediu, setate în `.env` în loc de panoul Railway:

- **[E-mail / SMTP](./railway-template.md#1-email-highly-recommended)** — ghiduri pas cu pas pentru Resend, Brevo și Gmail
- **[Mai multe site-uri](./railway-template.md#3-multi-site-multiple-churches-on-one-instance)** — biserici nelimitate pe o instanță. `/` servește biserica al cărei slug este `DEFAULT_CHURCH_SLUG` (prima biserică este `church`); indicați domeniile suplimentare spre mașină și mapați-le în **Settings → Domains** din B1Admin
- **[Donații online](./railway-template.md#4-online-giving-stripe--paypal)** — configurate pentru fiecare biserică în interfața de administrare
- **[Integrări opționale](./railway-template.md#6-optional-feature-integrations)** — `OPENAI_API_KEY`, `YOUTUBE_API_KEY`, `PEXELS_KEY`, `VIMEO_TOKEN`, `API_BIBLE_KEY`, `GOOGLE_RECAPTCHA_SECRET_KEY`
- **[Notificări push](#push-notifications)** — `WEB_PUSH_*`; programul de instalare le lasă necompletate, deci notificările push sunt dezactivate până le adăugați

Invitațiile și alte e-mailuri trimise de biserică sunt activate automat pe o instanță self-hosted (serviciul găzduit le condiționează de o verificare manuală, pentru a proteja reputația expeditorului).

## Notificări push

Notificările push pentru browser și pentru aplicația web mobilă rămân dezactivate până când serverul are o pereche de chei VAPID. Programul de instalare nu creează una. Până le adăugați, pagina de notificări a aplicației web mobile indică faptul că notificările push nu sunt activate pentru site.

1. Generați o pereche de chei. Pentru aceasta este nevoie doar de Docker:

   ```bash
   docker run --rm node:lts-alpine npx --yes web-push generate-vapid-keys
   ```

2. Adăugați cele două valori în `.env`. `WEB_PUSH_SUBJECT` este opțional și reprezintă adresa de contact pe care o văd serviciile push:

   ```bash
   WEB_PUSH_PUBLIC_KEY=…
   WEB_PUSH_PRIVATE_KEY=…
   WEB_PUSH_SUBJECT=mailto:admin@example.org
   ```

3. Aplicați modificările:

   ```bash
   docker compose up -d
   ```

4. Pentru confirmare, deschideți **Server Admin → Server Health** în B1Admin. Ambele chei Web Push ar trebui să apară ca fiind configurate. Membrii pot apoi activa notificările din aplicația web mobilă.

:::warning
Păstrați aceleași chei după ce membrii s-au înscris. Dacă le schimbați, toate abonamentele existente devin invalide, iar fiecare dispozitiv trebuie să se înregistreze din nou.
:::

## Date, copii de rezervă și stocare a fișierelor

Trei volume Docker denumite păstrează toată starea:

| Volum | Conținut |
|-------|----------|
| `b1church_mysql-data` | Toate schemele bazei de date |
| `b1church_api-content` | Fișierele încărcate — fotografii, documente, imagini ale site-ului |
| `b1church_caddy-data` | Certificatele TLS |

`./deploy/b1 backup` scrie un instantaneu consecvent al primelor două, plus `.env`, în `backups/<timestamp>/`. Programați-l cu cron și copiați dosarul într-un loc din afara mașinii:

```
0 3 * * * cd /opt/b1church && ./deploy/b1 backup >> backups/backup.log 2>&1
```

Pentru biblioteci mari de media puteți trece stocarea fișierelor la S3 — setați `FILE_STORE=S3` și variabilele `AWS_*` descrise în secțiunea [Railway guide's File Storage](./railway-template.md#5-file-storage). Copiile de rezervă ale bazei de date nu includ obiectele din S3; activați versionarea bucket-ului acolo.

## Actualizare

```bash
./deploy/b1 upgrade
```

În ordine: descarcă versiunea, face o copie de rezervă, recreează containerele, rulează eventualele migrări ale bazei de date în timp ce pornește API-ul și așteaptă verificarea de funcționare a API-ului. Dacă ceva eșuează, se oprește și vă indică să rulați `./deploy/b1 rollback`, care restaurează acea copie de rezervă și versiunea anterioară. Migrările sunt doar înainte; revenirea înseamnă întotdeauna restaurarea instantaneului.

Actualizarea de la fișierul compose beta (cel care construia imaginile din sursă) funcționează în același mod, odată ce aveți un `.env`: implicit folosea `MYSQL_ROOT_PASSWORD=churchapps`, așa că includeți această valoare în `.env` împreună cu `PUBLIC_URL` și `SITE_ADDRESS`, înlocuiți `docker-compose.yml` și `deploy/` cu fișierele curente și rulați `./deploy/b1 upgrade`.

## Construirea din sursă

Dezvoltatorii pot construi imaginile local, în loc să le descarce:

```bash
docker compose -f docker-compose.yml -f docker-compose.build.yml up -d --build
```

`API_CONTEXT` și `B1APP_CONTEXT` din `.env` indică construcțiilor copiile locale ale codului (de exemplu `../Api`) sau o referință git.

## Depanare

| Simptom | Cauza probabilă | Soluție |
|---------|-----------------|---------|
| Containerul `api` se repornește în buclă | eroare de migrare sau parolă greșită pentru baza de date | `./deploy/b1 logs api` — migrarea afișează ce modul a eșuat |
| `api` scrie în jurnal "ENCRYPTION_KEY must be exactly 32 characters" | cheie modificată manual sau trunchiată în `.env` | restaurați cheia originală de 32 de caractere (generați una nouă doar dacă nu sunt stocate încă credențiale) |
| Browserul afișează un avertisment de certificat | DNS-ul nu indică încă aici sau porturile 80/443 sunt blocate | corectați DNS-ul sau firewall-ul; Caddy reîncearcă singur |
| `/` afișează un panou în loc de site-ul web | nu există încă nicio biserică sau `DEFAULT_CHURCH_SLUG` nu se potrivește | creați biserica sau setați slug-ul din **Settings → Church** |
| "Check your email", dar nu sosește niciun e-mail | `MAIL_SYSTEM=SMTP` cu credențiale greșite | corectați credențialele sau eliminați `MAIL_SYSTEM` pentru a dezactiva e-mailul |
| Aplicația web mobilă spune că notificările push nu sunt activate | nu există chei VAPID pe server | adăugați-le conform descrierii din [Notificări push](#push-notifications) |
| Funcțiile de chat / live nu funcționează | websocket-ul este blocat de un alt proxy din față | socket-ul se află pe `/api/` pe același port; permiteți anteturile `Upgrade` |
| `install` refuză: "database volume already exists" | rămășițe dintr-o instalare anterioară | `docker compose down -v` pentru a șterge totul, sau scrieți un `.env` și folosiți `upgrade` |

Încă blocat? Deschideți o problemă la [github.com/ChurchApps/ChurchAppsSupport/issues](https://github.com/ChurchApps/ChurchAppsSupport/issues) și includeți rezultatul comenzii `./deploy/b1 logs`.

## Articole conexe

- **[Self-Hosting on Railway](./railway-template.md)** — alternativa de găzduire administrată, plus ghidurile comune de configurare după implementare
- **[Initial Setup](../../getting-started/initial-setup.md)** — primii pași după crearea bisericii
- **[Local API Setup](../api/local-setup.md)** — rularea stivei direct pentru dezvoltare
