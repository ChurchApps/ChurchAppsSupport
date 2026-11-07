---
title: "Self-hosting på Railway"
---

# Self-hosting på Railway

<div class="article-intro">

ChurchApps publicerar en mall för Railway med ett klick [Railway](https://railway.com) som ger din kyrka en egen privat instans av B1 Admin, B1-medlemsportalen, API:et och en MySQL-databas. Allt körs på infrastruktur som du äger och betalar för direkt. Den här guiden får dig igång på cirka 15 minuter och går sedan igenom den konfiguration efter driftsättningen som de flesta kyrkor så småningom vill ha.

</div>

## Snabbstart

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/b1-template)

1. Klicka på knappen **Deploy on Railway** ovan.
2. Logga in på Railway (eller skapa ett gratis konto) och lägg till ett betalningssätt.
3. Klicka på **Deploy** utan att ändra något. Varje variabel har ett rimligt standardvärde.
4. Vänta 5–10 minuter tills de fyra tjänsterna visar grön status.
5. Öppna webbadressen för tjänsten **B1Admin**, klicka på **Register** och skapa ditt konto. Det första kontot blir automatiskt serveradministratör.
6. Följ anvisningarna i appen för att skapa din första kyrka.

Då är det klart. Du har nu en fullt fungerande ChurchApps-instans. Allt nedan är valfria förbättringar.

:::tip
Driftsättningen är för närvarande i **beta**. Om du stöter på något som inte täcks av dokumentationen, öppna gärna ett ärende på [github.com/ChurchApps/Api/issues](https://github.com/ChurchApps/Api/issues) och bifoga driftsättningsloggarna.
:::

<div class="prereqs">
<h4>Det här behöver du</h4>

- Ett kostnadsfritt [Railway](https://railway.com)-konto
- Ett kreditkort registrerat hos Railway (ca 15–25 USD/månad för en liten församling; se [Kostnader](#costs))
- Cirka 15 minuter för den första driftsättningen
- *Valfritt men starkt rekommenderat senare:* SMTP-uppgifter och en egen domän

</div>

## Vad som driftsätts

Mallen skapar fyra tjänster i ett enda Railway-projekt:

| Tjänst | Syfte | Webbadress efter driftsättning |
|--------|-------|--------------------------------|
| **MySQL** | Lagrar all data (en instans, flera scheman) | endast intern |
| **Api** | Backend för medlemskap, innehåll, gåvor, närvaro m.m. | `https://api-<id>.up.railway.app` |
| **B1Admin** | Webbapp för personal och administratörer | `https://b1admin-<id>.up.railway.app` |
| **B1App** | Webbapp för medlemmar och kyrkans webbplats | `https://b1app-<id>.up.railway.app` |

Databasscheman skapas automatiskt vid första starten av API:ets startmigrering.

## Konfiguration vid första användningen

Nu när allt är igång följer här de saker som de flesta kyrkor ställer in härnäst, ungefär i prioritetsordning.

### 1. E-post (starkt rekommenderat)

Utan e-post kan medlemmar fortfarande registrera sig och använda systemet, men **de kan inte återställa glömda lösenord**. En administratör måste göra det åt dem. Att konfigurera SMTP tar cirka 5 minuter.

Öppna tjänsten **Api** i Railway-instrumentpanelen → **Variables** och lägg till:

```
MAIL_SYSTEM=SMTP
SMTP_HOST=<your provider host>
SMTP_USER=<your username>
SMTP_PASS=<your password or API key>
SMTP_SECURE=false
SUPPORT_EMAIL=noreply@yourchurch.org
```

Tre leverantörer värda att känna till:

#### Resend: enklaste kostnadsfria alternativet (100 e-postmeddelanden/dag)

1. Registrera dig på [resend.com](https://resend.com).
2. Verifiera en avsändardomän (eller använd testavsändaren `onboarding@resend.dev` för att komma igång).
3. Skapa en API-nyckel.
4. Ange `SMTP_HOST=smtp.resend.com`, `SMTP_USER=resend` och `SMTP_PASS=re_xxxxxxxxx`.

#### Gmail: kostnadsfritt för personligt bruk (ca 500/dag)

1. Aktivera tvåstegsverifiering på Google-kontot.
2. Skapa ett [appLösenord](https://myaccount.google.com/apppasswords).
3. Ange `SMTP_HOST=smtp.gmail.com`, `SMTP_USER=din-adress@gmail.com` och `SMTP_PASS=<appLösenordet med 16 tecken>`.

#### AWS SES: billigast i stor skala

1. Verifiera en avsändardomän i AWS.
2. Lämna SES-sandlådan om du ska skicka till ej verifierade adresser.
3. Skapa SMTP-uppgifter under **SES → SMTP Settings → Create credentials**.
4. Ange `SMTP_HOST=email-smtp.us-east-2.amazonaws.com`, `SMTP_USER=AKIA...` och `SMTP_PASS=<SES SMTP-lösenord>`.

När variablerna har sparats startas tjänsten Api om automatiskt. Testa genom att begära en lösenordsåterställning på ett testkonto.

:::warning
Om du anger `MAIL_SYSTEM=SMTP` med felaktiga uppgifter kommer registreringen att verka lyckas, men verifieringsmejlet kommer aldrig fram. Rätta antingen uppgifterna eller ta bort `MAIL_SYSTEM` för att gå tillbaka till läget utan e-post.
:::

### 2. Egna domäner

De standardmässiga webbadresserna `*.up.railway.app` fungerar, men de flesta kyrkor vill ha egna.

För varje webbtjänst (B1Admin och B1App):

1. Öppna tjänsten i Railway → **Settings** → **Networking**.
2. Klicka på **+ Custom Domain** och ange värdnamnet:
   - `admin.yourchurch.org` för B1Admin
   - `app.yourchurch.org` (eller `www`) för B1App
3. Lägg till den CNAME-post som Railway visar hos din DNS-leverantör.
4. Vänta några minuter tills DNS har spridits. Railway skapar TLS-certifikatet automatiskt.

Uppdatera sedan variablerna för tjänsten **Api** så att länkar i e-post pekar på de nya domänerna:

```
B1ADMIN_ROOT=https://admin.yourchurch.org
```

Och på tjänsten **B1Admin**:

```
REACT_APP_API_BASE=https://api.yourchurch.org   (if you also set a custom API domain)
REACT_APP_B1_WEBSITE_URL=https://{subdomain}.yourchurch.org
```

Token:en `{subdomain}` är bokstavlig. Den ersätts vid körning med varje kyrkas underdomän (se Flera webbplatser nedan).

### 3. Flera webbplatser (flera kyrkor på en instans)

ChurchApps är till sin design flerhyresgäst. En enda driftsättning kan vara värd för hur många kyrkor som helst, där var och en har sina egna personer, grupper och webbplats. Nya kyrkor läggs till helt via administrationsgränssnittet, utan några infrastrukturändringar.

#### Lägga till fler kyrkor

1. I **B1 Admin** går du till **Settings → Manage Church → Switch Church → Create New**.
2. Varje kyrka har en unik **underdomän** (till exempel `firstchurch` eller `gracecommunity`).
3. Den nya kyrkan får sina egna data, medlemmar, webbplats och gåvoinställningar, helt isolerade från andra kyrkor på samma instans.

#### Dirigera varje kyrka till sin egen webbadress

Det finns två sätt att exponera kyrkor offentligt:

| Mönster | Exempel | Konfiguration |
|---------|---------|---------------|
| **Sökväg** (fungerar direkt) | `app.yourchurch.org/firstchurch` | Ingen extra konfiguration |
| **Underdomän** (renare webbadresser) | `firstchurch.yourchurch.org` | Wildcard-DNS och wildcard-domän |

För routning via **underdomän** på Railway:

1. Skapa en wildcard-CNAME hos din DNS-leverantör: `*.yourchurch.org → <b1app railway target>`.
2. I Railway, på tjänsten B1App → **Settings → Networking**, lägg till `*.yourchurch.org` som egen domän.
3. På tjänsten **B1Admin**, ange `REACT_APP_B1_WEBSITE_URL=https://{subdomain}.yourchurch.org`.

Efter omstart serveras varje kyrkas webbplats automatiskt på `<deras-underdomän>.yourchurch.org`.

:::info
Wildcard-domäner kräver en betald Railway-plan. Routning via sökväg fungerar på alla planer och är funktionellt identisk, den ser bara sämre ut i adressfältet.
:::

### 4. Onlinegivande (Stripe / PayPal)

Givande konfigureras **per kyrka i administrationsgränssnittet**, inte via miljövariabler. På så sätt kan varje kyrka använda sitt eget handlarkonto.

1. Hämta utvecklaruppgifter från [Stripe](https://dashboard.stripe.com/) (Developers → API keys) eller [PayPal](https://developer.paypal.com/) (My Apps & Credentials).
2. I B1 Admin går du till **Settings → Giving Settings**.
3. Välj leverantör, klistra in de publika och hemliga nycklarna och konfigurera hur avgifter hanteras.
4. Lägg eventuellt till `GOOGLE_RECAPTCHA_SECRET_KEY` på tjänsten **Api** i Railway för att skydda offentliga gåvoformulär mot bottar.

### 5. Fillagring

Mallen skapar en **beständig volym på 1 GB** som monteras på tjänsten Api för medlemsfoton, predikningsfiler och uppladdade dokument.

För att utöka den öppnar du tjänsten Api → **Volumes** och justerar storleksreglaget.

För större driftsättningar (100 GB eller fler, eller många samtidiga uppladdningar) kan du byta till S3 genom att ange följande på tjänsten **Api**:

```
FILE_STORE=S3
AWS_S3_BUCKET=<your-bucket>
AWS_ACCESS_KEY_ID=<key>
AWS_SECRET_ACCESS_KEY=<secret>
AWS_REGION=us-east-2
```

Befintliga filer i volymen flyttas inte automatiskt. Kopiera dem till bucketen innan du ändrar variabeln.

### 6. Valfria funktionsintegrationer

Dessa aktiverar särskilda funktioner och kan alla läggas till senare via Railway-instrumentpanelen. Ange dem på tjänsten **Api**.

| Variabel | Funktion den aktiverar |
|----------|------------------------|
| `OPENAI_API_KEY` *eller* `OPENROUTER_API_KEY` | AI-assisterad sökning och innehållsförslag |
| `YOUTUBE_API_KEY` | Sökning och inbäddning av predikningar från YouTube |
| `PEXELS_KEY` | Bildväljare för stockbilder i webbplatsbyggaren |
| `VIMEO_TOKEN` | Stöd för predikningar på Vimeo |
| `API_BIBLE_KEY` | Uppslag av bibelverser i lektioner och innehåll |
| `YOUVERSION_API_KEY` | Integration med YouVersion-bibeln |
| `WEB_PUSH_PUBLIC_KEY` + `WEB_PUSH_PRIVATE_KEY` | Pushnotiser i webbläsaren ([generera ett VAPID-nyckelpar](./docker#push-notifications)) |
| `HUBSPOT_KEY` | Valfri CRM-synkronisering för nya registreringar |

## Uppdatera

Varje tjänst är kopplad till sitt respektive GitHub-repo. Push till `main` på `ChurchApps/Api`, `ChurchApps/B1Admin` eller `ChurchApps/B1App` utlöser automatiska omstarter.

För att låsa en specifik version ändrar du inställningen **Branch** på varje tjänst till en tagg eller releasegren. Detta är den rekommenderade konfigurationen för produktion, eftersom automatisk driftsättning från `main` innebär att du får med pågående arbete.

## Kostnader

Verkliga intervall för en liten kyrka (under 200 medlemmar, låg trafik):

| Komponent | Ungefärlig månadskostnad |
|-----------|--------------------------|
| Railway-bas | 5 USD |
| MySQL-tillägg | 5 USD + ca 1 USD lagring |
| Beräkningskapacitet för 3 webbtjänster | 3–10 USD sammanlagt |
| Volym på 1 GB | 0,25 USD |
| **Totalt** | **ca 15–25 USD/månad** |

Kostnaderna skalar linjärt med trafik, fotouppladdningar och databasstorlek. Railway visar aktuell användning under fliken **Usage** i projektet. Ange förbrukningsgränser där för att begränsa din exponering.

## Felsökning

| Symptom | Trolig orsak | Åtgärd |
|---------|--------------|--------|
| Bygget misslyckas med `EBUSY: rmdir '/app/node_modules/.cache'` | Konflikt med Nixpacks cache-montering | Ange `NIXPACKS_NO_CACHE=true` på den berörda tjänsten |
| Bygget misslyckas på B1Admin med `Missing: @types/...` | Inaktuell `package-lock.json` | Hämta senaste `main` |
| Api-driftsättningen hänger sig på "Deploying" | Hälsokontrollen misslyckas, `/health` returnerar inte 200 | Visa driftsättningsloggarna. Oftast saknas en obligatorisk miljövariabel |
| B1Admin visar "check your email" men inget e-postmeddelande kommer | `MAIL_SYSTEM=SMTP` är satt men uppgifterna saknas eller är felaktiga | Rätta uppgifterna, eller ta bort `MAIL_SYSTEM` för att inaktivera e-post |
| Inloggningen omdirigerar till `api.churchapps.org` | `REACT_APP_STAGE` är `prod` | Ange `REACT_APP_STAGE=custom` på tjänsten B1Admin |
| Underdomänkyrkor visar alla samma innehåll | `REACT_APP_B1_WEBSITE_URL` innehåller inte token:en `{subdomain}` | Ange till exempel `https://{subdomain}.yourchurch.org` |
| Egen domän visar "Application not found" | DNS har ännu inte spridits, eller Railway-certifikatet väntar | Vänta 5 minuter och kontrollera DNS med `dig admin.yourchurch.org` |

Om du stöter på något som inte står på den här listan, öppna ett ärende på [github.com/ChurchApps/Api/issues](https://github.com/ChurchApps/Api/issues) och bifoga driftsättningsloggarna.

## Relaterade artiklar

- **[Self-hosting med Docker](./docker)**: Samma stack på egen hårdvara eller en VPS
- **[Första konfigurationen](../../getting-started/initial-setup)**: Första stegen efter att din kyrka har skapats
- **[Webbplatsens grundinställningar](../../b1-admin/website/initial-setup)**: Konfigurera kyrkans offentliga webbplats
- **[Inställningar för givande](../../b1-admin/donations/online-giving-setup)**: Koppla upp Stripe eller PayPal
- **[Lokal API-konfiguration](../api/local-setup)**: Köra stacken lokalt för utveckling
- **[API-driftsättning (AWS)](./apis)**: Hur den officiella ChurchApps SaaS-tjänsten driftsätts
