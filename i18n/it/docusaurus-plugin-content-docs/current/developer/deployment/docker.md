---
title: "Self-Hosting con Docker"
---

# Self-Hosting con Docker

<div class="article-intro">

Esegui la tua istanza privata di B1 Admin, del portale membri e del sito B1, dell'API e di un database MySQL su qualsiasi macchina con Docker — un server domestico, un piccolo VPS o un server in sede. Un solo comando la installa, un solo comando la aggiorna, e ogni aggiornamento crea prima un backup. Se preferisci non gestire affatto un server, consulta [Self-Hosting su Railway](./railway-template) per l'alternativa gestita.

</div>

## Avvio rapido

<div class="prereqs">
<h4>Cosa ti serve</h4>

- Una macchina Linux (oppure macOS / Windows con WSL o Git Bash — l'helper `b1` è uno script bash) con [Docker Engine](https://docs.docker.com/engine/install/) e Compose v2 (incluso in Docker Desktop)
- Circa 2 GB di RAM e 5 GB di spazio su disco
- Per un sito pubblico: un nome di dominio che punti alla macchina, con le porte 80 e 443 raggiungibili

</div>

```bash
curl -fsSL https://raw.githubusercontent.com/ChurchApps/B1Admin/main/deploy/install.sh | bash -s -- --domain church.example.org
```

Ometti `--domain` per eseguire l'installazione su `http://localhost`. Il programma di installazione crea una cartella `b1church`, scrive un file `.env` con segreti appena generati, scarica le immagini precompilate dal GitHub Container Registry e attende che l'API risulti operativa. Non viene compilato nulla sulla tua macchina, quindi il primo avvio richiede un minuto o due.

Al termine:

1. Apri **https://church.example.org/admin** (oppure http://localhost/admin) e fai clic su **Registrati**. Il primo account diventa automaticamente amministratore del server.
2. Segui le istruzioni a schermo per creare la tua prima chiesa. Il suo sito web e il portale membri saranno online all'indirizzo **https://church.example.org/** non appena verrà creata.

Tutto funziona dietro un unico dominio:

| Percorso | Servizio |
|------|---------|
| `/` | B1App — sito web della chiesa e portale membri |
| `/admin` | B1Admin — dashboard del personale |
| `/api` | API, file caricati e websocket per gli aggiornamenti in tempo reale |

HTTPS è automatico: il proxy [Caddy](https://caddyserver.com/) incluso ottiene e rinnova un certificato Let's Encrypt per il dominio indicato in `.env`. Solo le porte 80 e 443 sono esposte; il database è raggiungibile solo dall'interno della rete Docker.

## Il comando `b1`

Il programma di installazione lascia uno script `deploy/b1` accanto a `docker-compose.yml`. È l'unica cosa che ti serve nell'uso quotidiano:

| Comando | Cosa fa |
|---------|--------------|
| `./deploy/b1 upgrade` | Scarica la release corrente, crea un backup, riavvia e verifica che l'API sia operativa |
| `./deploy/b1 upgrade 2026.10.1` | Come sopra, ma fissato a una release specifica |
| `./deploy/b1 backup` | Crea uno snapshot del database, dei file caricati e di `.env` in `backups/<timestamp>/` |
| `./deploy/b1 restore backups/<timestamp>` | Ripristina uno snapshot (l'API si ferma durante l'operazione) |
| `./deploy/b1 rollback` | Ripristina il backup più recente, inclusa la release su cui è stato creato |
| `./deploy/b1 status` | Versione installata e stato di salute dei container |
| `./deploy/b1 logs api` | Segui i log di un servizio |

Le release vengono pubblicate come un unico pacchetto versionato, così le tre immagini corrispondono sempre. `B1_VERSION=stable` in `.env` segue l'ultima release; impostalo su una versione specifica per fissarla. Le note di rilascio si trovano in [release di B1Admin](https://github.com/ChurchApps/B1Admin/releases).

## Configurazione

Tutte le impostazioni si trovano in `.env`, accanto a `docker-compose.yml`. Il programma di installazione compila quelle obbligatorie:

```bash
B1_VERSION=stable
DOMAIN=church.example.org
SITE_ADDRESS=church.example.org          # what Caddy serves; http://localhost for a local install
PUBLIC_URL=https://church.example.org    # how browsers and emails reach the site
MYSQL_ROOT_PASSWORD=…                    # generated
JWT_SECRET=…                             # generated
ENCRYPTION_KEY=…                         # generated, exactly 32 characters — never change it after storing credentials

# Email — strongly recommended; without it members can't reset their own passwords
MAIL_SYSTEM=SMTP
SMTP_HOST=smtp.resend.com
SMTP_USER=resend
SMTP_PASS=re_xxxxxxxxx
SMTP_SECURE=false
SUPPORT_EMAIL=noreply@church.example.org
```

Dopo aver modificato `.env`, applicala con `docker compose up -d`. Le applicazioni web determinano a quale API collegarsi dall'indirizzo nel browser, quindi cambiare dominio richiede solo l'aggiornamento di `SITE_ADDRESS` e `PUBLIC_URL` e un riavvio — nessuna ricompilazione.

:::warning
Conserva `.env` in modo sicuro. `ENCRYPTION_KEY` protegge le credenziali memorizzate del gateway di pagamento e dello storage; un backup senza di essa non può decifrarle. `./deploy/b1 backup` include una copia proprio per questo motivo.
:::

### Passare a un dominio in un secondo momento

Se hai installato su `localhost` e in seguito vuoi renderlo pubblico: punta il DNS alla macchina, imposta `DOMAIN`, `SITE_ADDRESS` (solo il dominio) e `PUBLIC_URL` (`https://` + dominio) in `.env`, quindi esegui `docker compose up -d`. Caddy ottiene un certificato alla prima richiesta.

## Email, donazioni, multi-sito e integrazioni

Funzionano esattamente come su Railway — le stesse variabili d'ambiente, impostate in `.env` invece che nel pannello di Railway:

- **[Email / SMTP](./railway-template#1-email-highly-recommended)** — guide ai provider Resend, Brevo e Gmail
- **[Multi-sito](./railway-template#3-multi-site-multiple-churches-on-one-instance)** — chiese illimitate per istanza. `/` serve la chiesa il cui slug è `DEFAULT_CHURCH_SLUG` (la prima chiesa è `church`); punta gli eventuali domini aggiuntivi alla macchina e mappali in **Impostazioni → Domini** in B1Admin
- **[Donazioni online](./railway-template#4-online-giving-stripe--paypal)** — configurate per chiesa nell'interfaccia di amministrazione
- **[Integrazioni opzionali](./railway-template#6-optional-feature-integrations)** — `OPENAI_API_KEY`, `YOUTUBE_API_KEY`, `PEXELS_KEY`, `VIMEO_TOKEN`, `API_BIBLE_KEY`, `WEB_PUSH_*`, `GOOGLE_RECAPTCHA_SECRET_KEY`

Gli inviti e le altre email inviate dalla chiesa sono abilitati automaticamente su un'istanza self-hosted (il servizio ospitato li sottopone a una revisione manuale per tutelare la reputazione del mittente).

## Dati, backup e archiviazione dei file

Tre volumi Docker con nome contengono tutti i dati:

| Volume | Contenuto |
|--------|----------|
| `b1church_mysql-data` | Tutti gli schemi del database |
| `b1church_api-content` | File caricati — foto, documenti, immagini del sito web |
| `b1church_caddy-data` | Certificati TLS |

`./deploy/b1 backup` scrive uno snapshot coerente dei primi due, più `.env`, in `backups/<timestamp>/`. Pianificalo con cron e copia la cartella in un luogo diverso dalla macchina:

```
0 3 * * * cd /opt/b1church && ./deploy/b1 backup >> backups/backup.log 2>&1
```

Per librerie multimediali di grandi dimensioni puoi passare l'archiviazione dei file a S3 — imposta `FILE_STORE=S3` insieme alle variabili `AWS_*` descritte nella [sezione Archiviazione dei file della guida Railway](./railway-template#5-file-storage). I backup del database non includono gli oggetti S3; abilita il versionamento del bucket.

## Aggiornamento

```bash
./deploy/b1 upgrade
```

In sequenza: scarica la release, crea un backup, ricrea i container, esegue le eventuali migrazioni del database in sospeso all'avvio dell'API e attende il controllo di integrità dell'API. Se qualcosa fallisce, si ferma e ti indica di eseguire `./deploy/b1 rollback`, che ripristina quel backup e la release precedente. Le migrazioni procedono solo in avanti; tornare indietro significa sempre ripristinare lo snapshot.

Se stai aggiornando dal file compose della beta (quello che compilava le immagini dal codice sorgente), il procedimento è lo stesso una volta che disponi di un `.env`: la versione beta usava `MYSQL_ROOT_PASSWORD=churchapps` come predefinito, quindi inseriscilo in `.env` insieme a `PUBLIC_URL` e `SITE_ADDRESS`, sostituisci `docker-compose.yml` e `deploy/` con i file attuali ed esegui `./deploy/b1 upgrade`.

## Compilare dal codice sorgente

Gli sviluppatori possono compilare localmente le immagini invece di scaricarle:

```bash
docker compose -f docker-compose.yml -f docker-compose.build.yml up -d --build
```

`API_CONTEXT` e `B1APP_CONTEXT` in `.env` indirizzano le compilazioni verso copie locali del codice (ad es. `../Api`) oppure verso un riferimento git.

## Risoluzione dei problemi

| Sintomo | Causa probabile | Soluzione |
|---------|--------------|-----|
| Il container `api` si riavvia in continuazione | errore di migrazione o password del database errata | `./deploy/b1 logs api` — la migrazione indica quale modulo ha fallito |
| `api` registra "ENCRYPTION_KEY must be exactly 32 characters" | chiave in `.env` modificata a mano o troncata | ripristina la chiave originale di 32 caratteri (generane una nuova solo se non sono ancora memorizzate credenziali) |
| Il browser mostra un avviso sul certificato | il DNS non punta ancora qui, oppure le porte 80/443 sono bloccate | correggi DNS / firewall; Caddy riprova da solo |
| `/` mostra una dashboard invece del sito web | nessuna chiesa ancora, oppure `DEFAULT_CHURCH_SLUG` non corrisponde | crea la chiesa, oppure imposta lo slug da **Impostazioni → Chiesa** |
| "Controlla la tua email" ma nessuna email arriva | `MAIL_SYSTEM=SMTP` con credenziali errate | correggi le credenziali, oppure rimuovi `MAIL_SYSTEM` per disattivare le email |
| Chat / funzioni in tempo reale silenziose | websocket bloccato da un altro proxy davanti | il socket si trova su `/api/` sulla stessa porta; consenti gli header `Upgrade` |
| `install` rifiuta: "database volume already exists" | residui di un'installazione precedente | `docker compose down -v` per cancellare tutto, oppure scrivi un `.env` e usa `upgrade` |

Ancora bloccato? Apri una segnalazione su [github.com/ChurchApps/ChurchAppsSupport/issues](https://github.com/ChurchApps/ChurchAppsSupport/issues) allegando l'output di `./deploy/b1 logs`.

## Articoli correlati

- **[Self-Hosting su Railway](./railway-template)** — alternativa di hosting gestito, più le guide di configurazione condivise post-deploy
- **[Configurazione iniziale](../../getting-started/initial-setup)** — primi passi dopo la creazione della chiesa
- **[Configurazione locale dell'API](../api/local-setup)** — esecuzione dello stack direttamente per lo sviluppo
