---
title: "Self-hosting su Railway"
---

# Self-hosting su Railway

<div class="article-intro">

ChurchApps pubblica un template [Railway](https://railway.com) con un clic che offre alla tua chiesa un'istanza privata di B1 Admin, del portale dei membri B1, dell'API e di un database MySQL -- tutto in esecuzione su un'infrastruttura di tua proprietà e che paghi direttamente. Questa guida ti porta online in circa 15 minuti, poi illustra la configurazione post-deploy che molte chiese prima o poi vogliono.

</div>

## Avvio rapido

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/b1-template)

1. Clicca sul pulsante **Deploy on Railway** qui sopra.
2. Accedi a Railway (oppure crea un account gratuito) e aggiungi un metodo di pagamento.
3. Clicca su **Deploy** senza modificare nulla -- ogni variabile ha un valore predefinito sensato.
4. Attendi 5–10 minuti che i quattro servizi diventino verdi.
5. Apri l'URL del servizio **B1Admin**, clicca su **Registrati** e crea il tuo account. Il primo account diventa automaticamente amministratore del server.
6. Segui le istruzioni dell'app per creare la tua prima chiesa.

Fatto. Ora hai un'istanza ChurchApps completamente funzionante. Tutto ciò che segue è facoltativo.

:::tip
Il deploy è attualmente in **beta**. Se incontri qualcosa che la documentazione non copre, apri una segnalazione su [github.com/ChurchApps/Api/issues](https://github.com/ChurchApps/Api/issues) allegando i log del deploy.
:::

<div class="prereqs">
<h4>Di cosa hai bisogno</h4>

- Un account [Railway](https://railway.com) gratuito
- Una carta di credito registrata su Railway (~15–25 $/mese per una piccola comunità; vedi [Costi](#costs))
- Circa 15 minuti per il deploy iniziale
- *Facoltativo ma fortemente consigliato più avanti:* credenziali SMTP e un dominio personalizzato

</div>

## Cosa viene distribuito

Il template configura quattro servizi in un unico progetto Railway:

| Servizio | Scopo | URL dopo il deploy |
|---------|---------|------------------|
| **MySQL** | Archivia tutti i dati (una sola istanza, più schemi) | solo interno |
| **Api** | Backend per membership, contenuti, donazioni, presenze, ecc. | `https://api-<id>.up.railway.app` |
| **B1Admin** | App web per lo staff e gli amministratori | `https://b1admin-<id>.up.railway.app` |
| **B1App** | App web per i membri e sito web della chiesa | `https://b1app-<id>.up.railway.app` |

Gli schemi del database vengono creati automaticamente al primo avvio dalla migrazione di avvio dell'API.

## Configurazione iniziale

Ora che il sistema è online, ecco le cose che la maggior parte delle chiese configura subito dopo, più o meno in ordine di priorità.

### 1. Email (fortemente consigliata) {#1-email-highly-recommended}

Senza email, i membri possono comunque registrarsi e usare il sistema, ma **non possono reimpostare la password dimenticata** -- deve farlo un amministratore al posto loro. Configurare SMTP richiede circa 5 minuti.

Nella dashboard di Railway, apri il servizio **Api** → **Variables** e aggiungi:

```
MAIL_SYSTEM=SMTP
SMTP_HOST=<your provider host>
SMTP_USER=<your username>
SMTP_PASS=<your password or API key>
SMTP_SECURE=false
SUPPORT_EMAIL=noreply@yourchurch.org
```

Tre provider da conoscere:

#### Resend — l'opzione gratuita più semplice (100 email/giorno)

1. Registrati su [resend.com](https://resend.com).
2. Verifica un dominio di invio (oppure usa il mittente di prova `onboarding@resend.dev` per iniziare).
3. Crea una chiave API.
4. Imposta `SMTP_HOST=smtp.resend.com`, `SMTP_USER=resend`, `SMTP_PASS=re_xxxxxxxxx`.

#### Gmail — gratuito per uso personale (~500/giorno)

1. Attiva l'autenticazione a due fattori sull'account Google.
2. Crea una [Password per le app](https://myaccount.google.com/apppasswords).
3. Imposta `SMTP_HOST=smtp.gmail.com`, `SMTP_USER=tuo-indirizzo@gmail.com`, `SMTP_PASS=<la password per le app di 16 caratteri>`.

#### AWS SES — il più economico su larga scala

1. Verifica un dominio di invio in AWS.
2. Esci dalla sandbox di SES se invierai a indirizzi non verificati.
3. Crea le credenziali SMTP in **SES → Impostazioni SMTP → Crea credenziali**.
4. Imposta `SMTP_HOST=email-smtp.us-east-2.amazonaws.com`, `SMTP_USER=AKIA...`, `SMTP_PASS=<la password SMTP di SES>`.

Dopo aver salvato le variabili, il servizio Api viene ridistribuito automaticamente. Verificalo avviando un reset della password su un account di prova.

:::warning
Se imposti `MAIL_SYSTEM=SMTP` con credenziali errate, la registrazione sembrerà riuscita ma l'email di verifica non arriverà mai. Correggi le credenziali oppure rimuovi `MAIL_SYSTEM` per tornare alla modalità senza email.
:::

### 2. Domini personalizzati

Gli URL predefiniti `*.up.railway.app` funzionano, ma la maggior parte delle chiese vuole i propri.

Per ogni servizio web (B1Admin e B1App):

1. Apri il servizio in Railway → **Settings** → **Networking**.
2. Clicca su **+ Custom Domain** e inserisci il nome host:
   - `admin.tuachiesa.org` per B1Admin
   - `app.tuachiesa.org` (oppure `www`) per B1App
3. Aggiungi il record CNAME che Railway ti mostra al tuo provider DNS.
4. Attendi qualche minuto che il DNS si propaghi. Railway emette automaticamente il certificato TLS.

Poi aggiorna le variabili del servizio **Api** così i link nelle email usano i nuovi domini:

```
B1ADMIN_ROOT=https://admin.tuachiesa.org
```

E sul servizio **B1Admin**:

```
REACT_APP_API_BASE=https://api.tuachiesa.org   (se imposti anche un dominio API personalizzato)
REACT_APP_B1_WEBSITE_URL=https://{subdomain}.tuachiesa.org
```

Il token `{subdomain}` è letterale -- viene sostituito a runtime con il sottodominio di ogni chiesa (vedi Multi-sito più sotto).

### 3. Multi-sito (più chiese su un'unica istanza) {#3-multi-site-multiple-churches-on-one-instance}

ChurchApps è multi-tenant per progettazione -- un unico deployment può ospitare un numero qualsiasi di chiese, ciascuna con le proprie persone, gruppi e sito web. Le nuove chiese si aggiungono interamente dall'interfaccia di amministrazione; non servono modifiche all'infrastruttura.

#### Aggiungere altre chiese

1. In **B1 Admin**, vai su **Impostazioni → Gestisci chiesa → Cambia chiesa → Crea nuova**.
2. Ogni chiesa ha uno **slug di sottodominio** univoco (ad esempio `primachiesa`, `comunitagrazia`).
3. La nuova chiesa ottiene i propri dati, membri, sito web e configurazione delle donazioni, completamente isolati dalle altre chiese della stessa istanza.

#### Instradare ogni chiesa verso il proprio URL

Due modi per esporre pubblicamente le chiese:

| Schema | Esempio | Configurazione |
|---------|---------|---------|
| **Basato sul percorso** (funziona subito) | `app.tuachiesa.org/primachiesa` | Nessuna configurazione aggiuntiva |
| **Basato sul sottodominio** (URL più puliti) | `primachiesa.tuachiesa.org` | DNS con wildcard + dominio personalizzato con wildcard |

Per il routing **basato sul sottodominio** su Railway:

1. Nel tuo provider DNS, crea un CNAME con wildcard: `*.tuachiesa.org → <destinazione Railway di b1app>`.
2. In Railway, sul servizio B1App → **Settings → Networking**, aggiungi `*.tuachiesa.org` come dominio personalizzato.
3. Sul servizio **B1Admin**, imposta `REACT_APP_B1_WEBSITE_URL=https://{subdomain}.tuachiesa.org`.

Dopo la ridistribuzione, il sito di ogni chiesa è servito automaticamente su `<sottodominio>.tuachiesa.org`.

:::info
I domini personalizzati con wildcard richiedono un piano Railway a pagamento. Il routing basato sul percorso funziona su ogni piano ed è funzionalmente identico -- solo meno bello nella barra degli indirizzi.
:::

### 4. Donazioni online (Stripe / PayPal) {#4-online-giving-stripe--paypal}

Le donazioni si configurano **per chiesa dall'interfaccia di amministrazione**, non tramite variabili d'ambiente -- così ogni chiesa può usare il proprio conto commerciante.

1. Ottieni le credenziali per sviluppatori da [Stripe](https://dashboard.stripe.com/) (Developers → API keys) oppure [PayPal](https://developer.paypal.com/) (My Apps & Credentials).
2. In B1 Admin, vai su **Impostazioni → Impostazioni donazioni**.
3. Scegli il tuo provider, incolla le chiavi Pubblica e Segreta e configura la gestione delle commissioni.
4. Facoltativamente aggiungi `GOOGLE_RECAPTCHA_SECRET_KEY` al servizio **Api** in Railway per proteggere i moduli di donazione pubblici dai bot.

### 5. Archiviazione dei file {#5-file-storage}

Il template configura un **volume persistente da 1 GB** montato sul servizio Api per le foto dei membri, i file dei sermoni e i documenti caricati.

Per aumentarlo: apri il servizio Api → **Volumes** → regola il cursore della dimensione.

Per distribuzioni più grandi (100+ GB o molti caricamenti simultanei), passa a S3 impostando queste variabili sul servizio **Api**:

```
FILE_STORE=S3
AWS_S3_BUCKET=<your-bucket>
AWS_ACCESS_KEY_ID=<key>
AWS_SECRET_ACCESS_KEY=<secret>
AWS_REGION=us-east-2
```

I file già presenti nel volume non vengono migrati automaticamente -- copiali nel bucket prima di cambiare la variabile.

### 6. Integrazioni opzionali di funzionalità {#6-optional-feature-integrations}

Queste sbloccano funzionalità specifiche e possono essere aggiunte in seguito dalla dashboard di Railway. Impostale sul servizio **Api**.

| Variabile | Funzionalità abilitata |
|----------|--------------------|
| `OPENAI_API_KEY` *oppure* `OPENROUTER_API_KEY` | Ricerca assistita dall'IA e suggerimenti per i contenuti |
| `YOUTUBE_API_KEY` | Ricerca e incorporamento dei sermoni da YouTube |
| `PEXELS_KEY` | Selettore di immagini di repertorio per il costruttore di siti web |
| `VIMEO_TOKEN` | Supporto dei sermoni su Vimeo |
| `API_BIBLE_KEY` | Ricerca di versetti biblici nelle lezioni e nei contenuti |
| `YOUVERSION_API_KEY` | Integrazione con YouVersion Bible |
| `WEB_PUSH_PUBLIC_KEY` + `WEB_PUSH_PRIVATE_KEY` | Notifiche push nel browser ([genera una coppia di chiavi VAPID](./docker#push-notifications)) |
| `HUBSPOT_KEY` | Sincronizzazione CRM facoltativa per le nuove registrazioni |

## Aggiornamenti

Ogni servizio è collegato al rispettivo repository GitHub. I push su `main` di `ChurchApps/Api`, `ChurchApps/B1Admin` o `ChurchApps/B1App` attivano ridistribuzioni automatiche.

Per fissare una versione specifica, cambia l'impostazione **Branch** di ogni servizio su un tag o un branch di release. Questa è la configurazione consigliata per la produzione -- distribuire automaticamente da `main` significa ereditare anche il lavoro ancora in corso.

## Costi {#costs}

Intervalli reali per una piccola chiesa (meno di 200 membri, traffico leggero):

| Componente | Costo mensile indicativo |
|-----------|---------------------|
| Base Railway | 5 $ |
| Plugin MySQL | 5 $ + ~1 $ di archiviazione |
| Calcolo dei 3 servizi web | 3–10 $ in totale |
| Volume da 1 GB | 0,25 $ |
| **Totale** | **~15–25 $/mese** |

I costi crescono in modo lineare con il traffico, i caricamenti di foto e le dimensioni del database. Railway mostra l'utilizzo in tempo reale nella scheda **Usage** del progetto -- imposta lì dei limiti di spesa per contenere l'esposizione.

## Risoluzione dei problemi

| Sintomo | Causa probabile | Soluzione |
|---------|--------------|-----------|
| La build fallisce con `EBUSY: rmdir '/app/node_modules/.cache'` | conflitto della cache mount di Nixpacks | Imposta `NIXPACKS_NO_CACHE=true` sul servizio interessato |
| La build di B1Admin fallisce con `Missing: @types/...` | `package-lock.json` non sincronizzato | Aggiorna con l'ultimo `main` |
| Il deploy dell'Api resta bloccato su "Deploying" | healthcheck fallito -- `/health` non restituisce 200 | Controlla i log di deploy; di solito manca una variabile d'ambiente obbligatoria |
| B1Admin mostra "controlla la tua email" ma nessuna email arriva | `MAIL_SYSTEM=SMTP` impostato ma credenziali mancanti o errate | Correggi le credenziali, oppure rimuovi `MAIL_SYSTEM` per disattivare l'email |
| Il login reindirizza a `api.churchapps.org` | `REACT_APP_STAGE` è `prod` | Imposta `REACT_APP_STAGE=custom` sul servizio B1Admin |
| Tutte le chiese con sottodominio mostrano lo stesso contenuto | `REACT_APP_B1_WEBSITE_URL` non include il token `{subdomain}` | Impostalo ad esempio su `https://{subdomain}.tuachiesa.org` |
| Il dominio personalizzato mostra "Application not found" | DNS non ancora propagato, oppure certificato Railway in attesa | Attendi 5 minuti; verifica il DNS con `dig admin.tuachiesa.org` |

Se incontri qualcosa che non compare in questo elenco, apri una segnalazione su [github.com/ChurchApps/Api/issues](https://github.com/ChurchApps/Api/issues) allegando i log di deploy.

## Articoli correlati

- **[Self-hosting con Docker](./docker)** — lo stesso stack sul proprio hardware o VPS
- **[Configurazione iniziale](../../getting-started/initial-setup)** — primi passi dopo la creazione della chiesa
- **[Configurazione iniziale del sito web](../../b1-admin/website/initial-setup)** — configura il sito pubblico della chiesa
- **[Impostazioni donazioni](../../b1-admin/donations/online-giving-setup)** — collega Stripe o PayPal
- **[Setup locale dell'API](../api/local-setup)** — eseguire lo stack in locale per lo sviluppo
- **[Deployment dell'API (AWS)](./apis)** — come viene distribuito il SaaS ufficiale di ChurchApps
