---
title: "Self-hosting su Railway"
---

# Self-hosting su Railway

<div class="article-intro">

ChurchApps pubblica un modello one-click [Railway](https://railway.com) che fornisce alla tua chiesa la sua istanza privata di B1 Admin, il portale dei membri B1, l'API e un database MySQL — tutto in esecuzione su un'infrastruttura che possiedi e per cui paghi direttamente. Questa guida ti mette online in circa 15 minuti e poi percorre la configurazione post-distribuzione che la maggior parte delle chiese alla fine vuole.

</div>

## Avvio rapido

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/b1-template)

1. Fai clic sul pulsante **Deploy on Railway** sopra.
2. Accedi a Railway (o crea un account gratuito) e aggiungi un metodo di pagamento.
3. Fai clic su **Deploy** senza cambiare nulla — ogni variabile ha un valore predefinito sensato.
4. Aspetta 5–10 minuti affinché i quattro servizi diventino verdi.
5. Apri l'URL del servizio **B1Admin**, fai clic su **Registrati**, e crea il tuo account. Il primo account è automaticamente un amministratore del server.
6. Segui i prompt in-app per creare la tua prima chiesa.

È tutto. Ora hai un'istanza ChurchApps completamente funzionante. Tutto quanto segue è opzionale.

:::tip
Il deploy è attualmente in **beta**. Se riscontri qualcosa che i doc non coprono, apri un problema su [github.com/ChurchApps/Api/issues](https://github.com/ChurchApps/Api/issues) con i log di deploy allegati.
:::

<div class="prereqs">
<h4>Quello che ti serve</h4>

- Un account [Railway](https://railway.com) gratuito
- Una carta di credito su file con Railway (~$15–25/mese per una piccola congregazione; vedi [Costi](#costs))
- Circa 15 minuti per il deploy iniziale
- *Consigliato ma facoltativo in seguito:* credenziali SMTP e un dominio personalizzato

</div>

## Cosa viene distribuito

Il modello fornisce quattro servizi in un singolo progetto Railway:

| Servizio | Scopo | URL dopo il deploy |
|---------|---------|------------------|
| **MySQL** | Archivia tutti i dati (un'istanza, più schemi) | solo interno |
| **Api** | Backend per iscritti, contenuto, donazioni, presenza, ecc. | `https://api-<id>.up.railway.app` |
| **B1Admin** | App web per staff/admin | `https://b1admin-<id>.up.railway.app` |
| **B1App** | App web rivolta ai membri e sito della chiesa | `https://b1app-<id>.up.railway.app` |

Gli schemi del database vengono creati automaticamente al primo avvio dalla migrazione di avvio dell'API.

## Configurazione al primo avvio

Ora che sei online, ecco le cose che la maggior parte delle chiese configurano in seguito, più o meno in ordine di priorità.

### 1. Email (Altamente consigliato)

Senza email, i membri possono ancora registrarsi e utilizzare il sistema, ma **non possono reimpostare le password dimenticate** — un amministratore deve farlo per loro. Configurare SMTP richiede circa 5 minuti.

Nel dashboard Railway, apri il servizio **Api** → **Variables**, e aggiungi:

```
MAIL_SYSTEM=SMTP
SMTP_HOST=<your provider host>
SMTP_USER=<your username>
SMTP_PASS=<your password or API key>
SMTP_SECURE=false
SUPPORT_EMAIL=noreply@yourchurch.org
```

Tre provider che vale la pena conoscere:

#### Resend — opzione gratuita più semplice (100 email/giorno)

1. Iscriviti su [resend.com](https://resend.com).
2. Verifica un dominio di invio (o utilizza il mittente di test `onboarding@resend.dev` per iniziare).
3. Crea una chiave API.
4. Imposta `SMTP_HOST=smtp.resend.com`, `SMTP_USER=resend`, `SMTP_PASS=re_xxxxxxxxx`.

#### Gmail — gratuito per uso personale (~500/giorno)

1. Abilita l'autenticazione a due fattori sull'account Google.
2. Crea una [password dell'app](https://myaccount.google.com/apppasswords).
3. Imposta `SMTP_HOST=smtp.gmail.com`, `SMTP_USER=your-address@gmail.com`, `SMTP_PASS=<the 16-character app password>`.

#### AWS SES — più economico su larga scala

1. Verifica un dominio di invio in AWS.
2. Esci dalla sandbox di SES se invierai a indirizzi non verificati.
3. Crea credenziali SMTP sotto **SES → SMTP Settings → Create credentials**.
4. Imposta `SMTP_HOST=email-smtp.us-east-2.amazonaws.com`, `SMTP_USER=AKIA...`, `SMTP_PASS=<SES SMTP password>`.

Dopo aver salvato le variabili, il servizio Api viene ridistribuito automaticamente. Testalo attivando una reimpostazione della password su un account di test.

:::warning
Se imposti `MAIL_SYSTEM=SMTP` con credenziali non valide, la registrazione apparirà riuscita ma l'email di verifica non arriverà mai. Correggi le credenziali o annulla `MAIL_SYSTEM` per tornare alla modalità senza email.
:::

### 2. Domini personalizzati

Gli URL predefiniti `*.up.railway.app` funzionano, ma la maggior parte delle chiese vuole i propri.

Per ogni servizio web (B1Admin e B1App):

1. Apri il servizio in Railway → **Settings** → **Networking**.
2. Fai clic su **+ Custom Domain** e immetti il nome host:
   - `admin.yourchurch.org` per B1Admin
   - `app.yourchurch.org` (o `www`) per B1App
3. Aggiungi il record CNAME che Railway mostra al tuo provider DNS.
4. Aspetta alcuni minuti affinché il DNS si propaghi. Railway fornisce il certificato TLS automaticamente.

Quindi aggiorna le variabili del servizio **Api** affinché i link nelle email utilizzino i nuovi domini:

```
B1ADMIN_ROOT=https://admin.yourchurch.org
```

E sul servizio **B1Admin**:

```
REACT_APP_API_BASE=https://api.yourchurch.org   (if you also set a custom API domain)
REACT_APP_B1_WEBSITE_URL=https://{subdomain}.yourchurch.org
```

Il token `{subdomain}` è letterale — viene sostituito a runtime con il sottodominio di ogni chiesa (vedi Multi-Site di seguito).

### 3. Multi-sito (più chiese in un'istanza)

ChurchApps è multi-tenant per progettazione — una distribuzione può ospitare un numero qualsiasi di chiese, ognuna con le proprie persone, gruppi e sito web. Le nuove chiese vengono aggiunte interamente tramite l'interfaccia utente di amministrazione; nessun cambiamento all'infrastruttura necessario.

#### Aggiunta di chiese aggiuntive

1. In **B1 Admin**, vai a **Impostazioni → Manage Church → Switch Church → Create New**.
2. Ogni chiesa ha uno slug **sottodominio** univoco (ad es. `firstchurch`, `gracecommunity`).
3. La nuova chiesa riceve i suoi dati, membri, sito web e configurazione di donazioni, completamente isolati dalle altre chiese sulla stessa istanza.

#### Routing di ogni chiesa al suo URL

Due modi per esporre le chiese pubblicamente:

| Pattern | Esempio | Setup |
|---------|---------|-------|
| **Path-based** (funziona subito) | `app.yourchurch.org/firstchurch` | Nessun setup extra |
| **Subdomain-based** (URL più puliti) | `firstchurch.yourchurch.org` | DNS wildcard + dominio personalizzato wildcard |

Per il routing **basato su sottodominio** su Railway:

1. Nel tuo provider DNS, crea un CNAME wildcard: `*.yourchurch.org → <b1app railway target>`.
2. In Railway, sul servizio B1App → **Settings → Networking**, aggiungi `*.yourchurch.org` come dominio personalizzato.
3. Sul servizio **B1Admin**, imposta `REACT_APP_B1_WEBSITE_URL=https://{subdomain}.yourchurch.org`.

Dopo la ridistribuzione, il sito di ogni chiesa viene servito su `<their-subdomain>.yourchurch.org` automaticamente.

:::info
I domini personalizzati wildcard richiedono un piano Railway a pagamento. Il routing basato su percorso funziona su ogni piano ed è funzionalmente identico — solo meno carino nella barra degli indirizzi.
:::

### 4. Donazioni online (Stripe / PayPal)

Le donazioni sono configurate **per chiesa all'interno dell'interfaccia utente di amministrazione**, non tramite variabili di ambiente — in questo modo ogni chiesa può utilizzare il proprio account commerciale.

1. Ottieni credenziali per sviluppatori da [Stripe](https://dashboard.stripe.com/) (Developers → API keys) o [PayPal](https://developer.paypal.com/) (My Apps & Credentials).
2. In B1 Admin, vai a **Settings → Giving Settings**.
3. Scegli il tuo provider, incolla le chiavi Public e Secret, e configura la gestione delle commissioni.
4. Facoltativamente aggiungi `GOOGLE_RECAPTCHA_SECRET_KEY` al servizio **Api** in Railway per proteggere i moduli di donazione pubblici dai bot.

### 5. Archiviazione file

Il modello fornisce un **volume persistente da 1 GB** montato sul servizio Api per foto dei membri, file di sermoni e documenti caricati.

Per ingrandirlo: apri il servizio Api → **Volumes** → regola il cursore della dimensione.

Per distribuzioni più grandi (100+ GB o molti caricamenti simultanei), passa a S3 impostando questi sul servizio **Api**:

```
FILE_STORE=S3
AWS_S3_BUCKET=<your-bucket>
AWS_ACCESS_KEY_ID=<key>
AWS_SECRET_ACCESS_KEY=<secret>
AWS_REGION=us-east-2
```

I file esistenti nel volume non migrano automaticamente — copiare nel bucket prima di capovolgere la variabile.

### 6. Integrazioni facoltative

Questi sbloccano funzioni specifiche e possono essere aggiunti in seguito tramite il dashboard Railway. Impostali sul servizio **Api**.

| Variabile | Funzione che abilita |
|----------|--------------------|
| `OPENAI_API_KEY` *o* `OPENROUTER_API_KEY` | Ricerca assistita da AI e suggerimenti di contenuto |
| `YOUTUBE_API_KEY` | Ricerca e incorporamento di sermoni YouTube |
| `PEXELS_KEY` | Selettore di immagini stock per il generatore di siti web |
| `VIMEO_TOKEN` | Supporto di sermoni Vimeo |
| `API_BIBLE_KEY` | Ricerche di versetti biblici in lezioni e contenuti |
| `YOUVERSION_API_KEY` | Integrazione della Bibbia YouVersion |
| `WEB_PUSH_PUBLIC_KEY` + `WEB_PUSH_PRIVATE_KEY` | Notifiche push del browser (genera una coppia di chiavi VAPID) |
| `HUBSPOT_KEY` | Sincronizzazione facoltativa di CRM per nuove registrazioni |

## Aggiornamento

Ogni servizio è collegato al suo repository GitHub rispettivo. I push su `main` su `ChurchApps/Api`, `ChurchApps/B1Admin` o `ChurchApps/B1App` attivano le ridistribuzioni automatiche.

Per bloccare una versione specifica, modifica l'impostazione **Branch** su ogni servizio in un tag o ramo di rilascio. Questo è il setup consigliato per la produzione — la redistribuzione automatica da `main` significa che erediti qualsiasi lavoro in corso.

## Costi

Intervalli reali per una piccola chiesa (meno di 200 membri, traffico leggero):

| Componente | Costo mensile approssimativo |
|-----------|---------------------|
| Base di Railway | $5 |
| Plugin MySQL | $5 + ~$1 archiviazione |
| 3 servizi web compute | $3–10 combinati |
| Volume 1 GB | $0.25 |
| **Totale** | **~$15–25/mese** |

I costi si ridimensionano linearmente con il traffico, i caricamenti di foto e le dimensioni del database. Railway mostra l'utilizzo live nella scheda **Usage** del progetto — imposta i limiti di spesa lì per limitare l'esposizione.

## Risoluzione dei problemi

| Sintomo | Causa probabile | Fix |
|---------|--------------|-----|
| Build fallisce con `EBUSY: rmdir '/app/node_modules/.cache'` | Conflitto di mount della cache Nixpacks | Imposta `NIXPACKS_NO_CACHE=true` sul servizio interessato |
| Build fallisce su B1Admin con `Missing: @types/...` | `package-lock.json` desincronizzato | Estrai l'ultimo `main` |
| Api deploy si blocca su "Deploying" | Healthcheck fallito — `/health` non restituisce 200 | Visualizza i log di deploy; di solito una variabile di ambiente richiesta mancante |
| B1Admin mostra "check your email" ma nessuna email arriva | `MAIL_SYSTEM=SMTP` impostato ma credenziali mancanti/errate | Correggi le credenziali, o annulla `MAIL_SYSTEM` per disabilitare l'email |
| Il login reindirizza a `api.churchapps.org` | `REACT_APP_STAGE` è `prod` | Imposta `REACT_APP_STAGE=custom` sul servizio B1Admin |
| Le chiese sottodominio mostrano tutti lo stesso contenuto | `REACT_APP_B1_WEBSITE_URL` non include il token `{subdomain}` | Impostalo su es. `https://{subdomain}.yourchurch.org` |
| Il dominio personalizzato mostra "Application not found" | DNS non ancora propagato, o certificato Railway in sospeso | Aspetta 5 minuti; controlla il DNS con `dig admin.yourchurch.org` |

Se riscontri qualcosa non in questo elenco, apri un problema su [github.com/ChurchApps/Api/issues](https://github.com/ChurchApps/Api/issues) con i log di deploy allegati.

## Articoli correlati

- **[Initial Setup](../../getting-started/initial-setup)** — Primi passi dopo la creazione della tua chiesa
- **[Website Initial Setup](../../b1-admin/website/initial-setup)** — Configura il sito pubblico della tua chiesa
- **[Giving Settings](../../b1-admin/donations/online-giving-setup)** — Collega Stripe o PayPal
- **[Local API Setup](../api/local-setup)** — Esecuzione dello stack localmente per lo sviluppo
- **[API Deployment (AWS)](./apis)** — Come viene distribuito il SaaS ChurchApps ufficiale
