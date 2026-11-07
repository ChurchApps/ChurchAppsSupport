---
title: "Self-Hosting with Docker"
---

# Self-Hosting with Docker

<div class="article-intro">

Kör en egen privat instans av B1 Admin, B1-medlemsportalen och webbplatsen, API:et och en MySQL-databas på vilken maskin som helst med Docker — en hemserver, en liten VPS eller en lokal server. Ett kommando installerar den, ett kommando uppgraderar den, och varje uppgradering tar först en säkerhetskopia. Om du hellre inte vill sköta någon server alls, se [Self-Hosting på Railway](./railway-template) för det hanterade alternativet.

</div>

## Snabbstart

<div class="prereqs">
<h4>Det här behöver du</h4>

- En Linux-maskin (eller macOS / Windows med WSL eller Git Bash — `b1`-hjälpverktyget är ett bash-skript) med [Docker Engine](https://docs.docker.com/engine/install/) och Compose v2 (ingår i Docker Desktop)
- Cirka 2 GB RAM och 5 GB diskutrymme
- För en publik webbplats: ett domännamn som pekar mot maskinen, med portarna 80 och 443 åtkomliga

</div>

```bash
curl -fsSL https://raw.githubusercontent.com/ChurchApps/B1Admin/main/deploy/install.sh | bash -s -- --domain church.example.org
```

Utelämna `--domain` för att köra på `http://localhost`. Installeraren skapar en mapp `b1church`, skriver en `.env`-fil med nyligen genererade hemligheter, hämtar de färdigbyggda avbildningarna från GitHub Container Registry och väntar tills API:et rapporterar att det är friskt. Ingenting byggs på din maskin, så den första starten tar en minut eller två.

När installationen är klar:

1. Öppna **https://church.example.org/admin** (eller http://localhost/admin) och klicka på **Registrera**. Det första kontot blir automatiskt serveradministratör.
2. Följ anvisningarna i appen för att skapa din första församling. Dess webbplats och medlemsportal är aktiva på **https://church.example.org/** så snart den finns.

Allt körs bakom en och samma domän:

| Sökväg | Tjänst |
|------|---------|
| `/` | B1App — församlingens webbplats och medlemsportal |
| `/admin` | B1Admin — personalens kontrollpanel |
| `/api` | API, uppladdade filer och websocket för liveuppdateringar |

HTTPS sköts automatiskt: den medföljande proxyn [Caddy](https://caddyserver.com/) hämtar och förnyar ett Let's Encrypt-certifikat för domänen i `.env`. Endast portarna 80 och 443 är exponerade; databasen går bara att nå inifrån Docker-nätverket.

## Kommandot `b1`

Installeraren lämnar ett skript `deploy/b1` bredvid `docker-compose.yml`. Det är det enda du behöver i det dagliga arbetet:

| Kommando | Vad det gör |
|---------|--------------|
| `./deploy/b1 upgrade` | Hämtar den aktuella versionen, tar en säkerhetskopia, startar om och kontrollerar att API:et är friskt |
| `./deploy/b1 upgrade 2026.10.1` | Samma, men låst till en specifik version |
| `./deploy/b1 backup` | Tar en ögonblicksbild av databasen, uppladdade filer och `.env` i `backups/<tidsstämpel>/` |
| `./deploy/b1 restore backups/<tidsstämpel>` | Återställer en ögonblicksbild (API:et stoppas under tiden) |
| `./deploy/b1 rollback` | Återställer den senaste säkerhetskopian, inklusive den version den togs på |
| `./deploy/b1 status` | Installerad version och containrarnas hälsa |
| `./deploy/b1 logs api` | Följer loggarna för en tjänst |

Versionerna publiceras som ett enda versionsnumrerat paket, så de tre avbildningarna alltid stämmer överens. `B1_VERSION=stable` i `.env` följer den senaste versionen; ange en specifik version för att låsa den. Versionsanteckningar finns under [B1Admin-versioner](https://github.com/ChurchApps/B1Admin/releases).

## Konfiguration

Alla inställningar finns i `.env` bredvid `docker-compose.yml`. Installeraren fyller i de obligatoriska:

```bash
B1_VERSION=stable
DOMAIN=church.example.org
SITE_ADDRESS=church.example.org          # det Caddy serverar; http://localhost för en lokal installation
PUBLIC_URL=https://church.example.org    # hur webbläsare och e-post når webbplatsen
MYSQL_ROOT_PASSWORD=…                    # genererad
JWT_SECRET=…                             # genererad
ENCRYPTION_KEY=…                         # genererad, exakt 32 tecken — ändra aldrig efter att inloggningsuppgifter har lagrats

# E-post — starkt rekommenderat; utan den kan medlemmar inte återställa sina egna lösenord
MAIL_SYSTEM=SMTP
SMTP_HOST=smtp.resend.com
SMTP_USER=resend
SMTP_PASS=re_xxxxxxxxx
SMTP_SECURE=false
SUPPORT_EMAIL=noreply@church.example.org
```

Efter att du ändrat `.env` tillämpar du ändringen med `docker compose up -d`. Webbapparna avgör vilket API de ska använda utifrån adressen i webbläsaren, så om du byter domän behöver du bara uppdatera `SITE_ADDRESS` och `PUBLIC_URL` och starta om — ingen ombyggnad krävs.

:::warning
Förvara `.env` säkert. `ENCRYPTION_KEY` skyddar lagrade uppgifter för betalningsgateways och lagring; en säkerhetskopia utan nyckeln kan inte dekryptera dem. `./deploy/b1 backup` innehåller en kopia av nyckeln av just den anledningen.
:::

### Att flytta till en domän senare

Om du installerade på `localhost` och senare vill göra den publik: peka DNS mot maskinen, ange `DOMAIN`, `SITE_ADDRESS` (den nakna domänen) och `PUBLIC_URL` (`https://` + domän) i `.env`, kör sedan `docker compose up -d`. Caddy hämtar ett certifikat vid första förfrågan.

## E-post, gåvor, flera webbplatser och integrationer

Dessa fungerar exakt som på Railway — samma miljövariabler, men satta i `.env` i stället för i Railway-panelen:

- **[E-post / SMTP](./railway-template#1-email-highly-recommended)** — genomgångar för leverantörerna Resend, Brevo och Gmail
- **[Flera webbplatser](./railway-template#3-multi-site-multiple-churches-on-one-instance)** — obegränsat antal församlingar per instans. `/` visar den församling vars slug är `DEFAULT_CHURCH_SLUG` (den första församlingen är `church`); peka extra domäner mot servern och koppla dem under **Inställningar → Domäner** i B1Admin
- **[Onlinegåvor](./railway-template#4-online-giving-stripe--paypal)** — konfigureras per församling i administrationsgränssnittet
- **[Valfria integrationer](./railway-template#6-optional-feature-integrations)** — `OPENAI_API_KEY`, `YOUTUBE_API_KEY`, `PEXELS_KEY`, `VIMEO_TOKEN`, `API_BIBLE_KEY`, `GOOGLE_RECAPTCHA_SECRET_KEY`
- **[Pushnotiser](#pushnotiser)** — `WEB_PUSH_*`; installeraren lämnar dessa tomma, så push är avstängt tills du lägger till dem

Inbjudningar och annan e-post som församlingen skickar aktiveras automatiskt på en självhostad instans. (Den hanterade tjänsten kräver en manuell granskning för detta för att skydda avsändarens renommé.)

## Pushnotiser

Push-notiser i webbläsaren och i mobilwebben är avstängda tills servern har ett VAPID-nyckelpar. Installeraren skapar inget sådant. Tills du lägger till det visar sidan Notiser i mobilwebbappen att push inte är aktiverat för webbplatsen.

1. Generera ett nyckelpar. Detta kräver bara Docker:

   ```bash
   docker run --rm node:lts-alpine npx --yes web-push generate-vapid-keys
   ```

2. Lägg till de två värdena i `.env`. `WEB_PUSH_SUBJECT` är valfri och är den kontaktadress som push-tjänsterna ser:

   ```bash
   WEB_PUSH_PUBLIC_KEY=…
   WEB_PUSH_PRIVATE_KEY=…
   WEB_PUSH_SUBJECT=mailto:admin@example.org
   ```

3. Tillämpa ändringarna:

   ```bash
   docker compose up -d
   ```

4. För att bekräfta, öppna **Serveradministration → Serverhälsa** i B1Admin. Båda Web Push-nycklarna bör visas som konfigurerade. Medlemmar kan då aktivera notiser från mobilwebbappen.

:::warning
Behåll samma nycklar när medlemmar väl har registrerat sig. Om du ändrar dem blir alla befintliga prenumerationer ogiltiga, och varje enhet måste registrera sig på nytt.
:::

## Data, säkerhetskopior och fillagring

Tre namngivna Docker-volymer innehåller all data:

| Volym | Innehåll |
|--------|----------|
| `b1church_mysql-data` | Alla databasscheman |
| `b1church_api-content` | Uppladdade filer — foton, dokument, bilder till webbplatsen |
| `b1church_caddy-data` | TLS-certifikat |

`./deploy/b1 backup` skriver en konsekvent ögonblicksbild av de två första plus `.env` till `backups/<tidsstämpel>/`. Schemalägg den med cron och kopiera mappen till någonstans utanför maskinen:

```
0 3 * * * cd /opt/b1church && ./deploy/b1 backup >> backups/backup.log 2>&1
```

För stora mediabibliotek kan du byta fillagring till S3 — ange `FILE_STORE=S3` plus `AWS_*`-variablerna som beskrivs i avsnittet [Fillagring i Railway-guiden](./railway-template#5-file-storage). Databassäkerhetskopior innehåller inte S3-objekt; aktivera versionshantering för bucketen.

## Uppdatering

```bash
./deploy/b1 upgrade
```

I ordning: hämtar versionen, tar en säkerhetskopia, skapar om containrarna, kör eventuella väntande databasmigreringar när API:et startar och väntar på API:ets hälsokontroll. Om något misslyckas stannar den och säger åt dig att köra `./deploy/b1 rollback`, som återställer den säkerhetskopian och den föregående versionen. Migreringar går bara framåt; att göra en återställning innebär alltid att snapshoten återställs.

Om du uppgraderar från beta-compose-filen (den som byggde avbildningar från källkod) fungerar det på samma sätt när du väl har en `.env`: den använde som standard `MYSQL_ROOT_PASSWORD=churchapps`, så lägg in det i `.env` tillsammans med `PUBLIC_URL` och `SITE_ADDRESS`, ersätt `docker-compose.yml` och `deploy/` med de aktuella filerna och kör `./deploy/b1 upgrade`.

## Bygga från källkod

Utvecklare kan bygga avbildningarna lokalt i stället för att hämta dem:

```bash
docker compose -f docker-compose.yml -f docker-compose.build.yml up -d --build
```

`API_CONTEXT` och `B1APP_CONTEXT` i `.env` pekar byggena mot lokala kopior (t.ex. `../Api`) eller en git-referens.

## Felsökning

| Symptom | Troligen orsak | Åtgärd |
|---------|--------------|-----|
| Containern `api` startar om i en loop | migreringsfel eller fel databaslösenord | `./deploy/b1 logs api` — migreringen skriver ut vilken modul som misslyckades |
| `api` loggar "ENCRYPTION_KEY must be exactly 32 characters" | nyckeln i `.env` har redigerats för hand eller klippts av | återställ den ursprungliga 32-teckensnyckeln (generera en ny bara om inga inloggningsuppgifter lagrats ännu) |
| Webbläsaren visar en certifikatvarning | DNS pekar inte hit än, eller portarna 80/443 är blockerade | åtgärda DNS / brandvägg; Caddy försöker igen av sig självt |
| `/` visar en instrumentpanel i stället för webbplatsen | ingen församling finns än, eller `DEFAULT_CHURCH_SLUG` stämmer inte | skapa församlingen, eller ange slugen under **Inställningar → Församling** |
| "Kontrollera din e-post" men inget mejl kommer | `MAIL_SYSTEM=SMTP` med felaktiga uppgifter | rätta uppgifterna, eller ta bort `MAIL_SYSTEM` för att stänga av e-post |
| Mobilwebbappen säger att pushnotiser inte är aktiverade | inga VAPID-nycklar på servern | lägg till dem enligt beskrivningen i [Pushnotiser](#pushnotiser) |
| Chatt / livefunktioner fungerar inte | websocket blockeras av en annan proxy framför | socketen ligger på `/api/` över samma port; tillåt `Upgrade`-headers |
| `install` vägrar: "database volume already exists" | rester från en tidigare installation | `docker compose down -v` för att rensa, eller skriv en `.env` och använd `upgrade` |

Fortfarande fast? Öppna ett ärende på [github.com/ChurchApps/ChurchAppsSupport/issues](https://github.com/ChurchApps/ChurchAppsSupport/issues) och bifoga utdata från `./deploy/b1 logs`.

## Relaterade artiklar

- **[Self-Hosting på Railway](./railway-template)** — alternativ med hanterad hosting, samt de gemensamma guiderna för konfiguration efter driftsättning
- **[Första installationen](../../getting-started/initial-setup)** — första stegen efter att din församling har skapats
- **[Lokal API-installation](../api/local-setup)** — att köra stacken direkt för utveckling
