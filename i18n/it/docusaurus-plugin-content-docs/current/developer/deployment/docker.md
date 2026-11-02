---
title: "Self-hosting con Docker"
---

# Self-hosting con Docker

<div class="article-intro">

Esegui la tua istanza privata di B1 Admin, del portale dei membri e sito B1, dell'API e di un database MySQL su qualsiasi macchina con Docker -- un server domestico, un piccolo VPS o un server locale. Un solo comando la installa, un solo comando la aggiorna, e ogni aggiornamento crea prima un backup. Se preferisci non gestire affatto un server, vedi [Self-hosting su Railway](./railway-template) per l'alternativa gestita.

</div>

## Avvio rapido

<div class="prereqs">
<h4>Di cosa hai bisogno</h4>

- Una macchina Linux (oppure macOS / Windows con WSL o Git Bash -- l'helper `b1` è uno script bash) con [Docker Engine](https://docs.docker.com/engine/install/) e Compose v2 (incluso in Docker Desktop)
- Circa 2 GB di RAM e 5 GB di spazio su disco
- Per un sito pubblico: un nome di dominio che punti alla macchina, con le porte 80 e 443 raggiungibili

</div>

```bash
curl -fsSL https://raw.githubusercontent.com/ChurchApps/B1Admin/main/deploy/install.sh | bash -s -- --domain church.example.org
```

Ometti `--domain` per eseguire su `http://localhost`. L'installer crea una cartella `b1church`, scrive un `.env` con segreti appena generati, scarica le immagini precompilate da GitHub Container Registry e attende che l'API risulti in salute. Nulla viene compilato sulla tua macchina, quindi il primo avvio richiede un minuto o due.

Al termine:

1. Apri **https://church.example.org/admin** (oppure http://localhost/admin) e clicca su **Registrati**. Il primo account diventa automaticamente amministratore del server.
2. Segui le istruzioni dell'app per creare la tua prima chiesa. Il suo sito web e il portale dei membri sono online su **https://church.example.org/** non appena esiste.

Tutto funziona dietro un unico dominio:

| Percorso | Servizio |
|------|---------|
| `/` | B1App — sito web della chiesa e portale dei membri |
| `/admin` | B1Admin — dashboard dello staff |
| `/api` | API, file caricati e websocket per gli aggiornamenti in tempo reale |

L'HTTPS è automatico: il proxy [Caddy](https://caddyserver.com/) incluso ottiene e rinnova un certificato Let's Encrypt per il dominio in `.env`. Solo le porte 80 e 443 sono esposte; il database è raggiungibile solo dall'interno della rete Docker.

## Il comando `b1`

L'installer lascia uno script `deploy/b1` accanto a `docker-compose.yml`. È l'unica cosa di cui hai bisogno quotidianamente:

| Comando | Cosa fa |
|---------|--------------|
| `./deploy/b1 upgrade` | Scarica la release attuale, crea un backup, riavvia e verifica che l'API sia in salute |
| `./deploy/b1 upgrade 2026.10.1` | Uguale, fissato su una release specifica |
| `./deploy/b1 backup` | Crea uno snapshot del database, dei file caricati e di `.env` in `backups/<timestamp>/` |
| `./deploy/b1 restore backups/<timestamp>` | Ripristina uno snapshot (l'API si ferma durante l'operazione) |
| `./deploy/b1 rollback` | Ripristina il backup più recente, inclusa la release su cui è stato creato |
| `./deploy/b1 status` | Versione installata e stato di salute dei container |
| `./deploy/b1 logs api` | Segue i log di un servizio |

Le release vengono pubblicate come un unico pacchetto versionato così le tre immagini corrispondono sempre. `B1_VERSION=stable` in `.env` segue l'ultima release; impostalo su una versione specifica per fissarla. Le note di rilascio si trovano in [release di B1Admin](https://github.com/ChurchApps/B1Admin/releases).

## Configurazione

Tutte le impostazioni si trovano in `.env`, accanto a `docker-compose.yml`. L'installer compila quelle obbligatorie:

```bash
B1_VERSION=stable
DOMAIN=church.example.org
SITE_ADDRESS=church.example.org          # ciò che serve Caddy; http://localhost per un'installazione locale
PUBLIC_URL=https://church.example.org    # come browser ed email raggiungono il sito
MYSQL_ROOT_PASSWORD=…                    # generata
JWT_SECRET=…                             # generata
ENCRYPTION_KEY=…                         # generata, esattamente 32 caratteri — non cambiarla mai dopo aver salvato le credenziali

# Email — fortemente consigliata; senza, i membri non possono reimpostare la propria password
MAIL_SYSTEM=SMTP
SMTP_HOST=smtp.resend.com
SMTP_USER=resend
SMTP_PASS=re_xxxxxxxxx
SMTP_SECURE=false
SUPPORT_EMAIL=noreply@church.example.org
```

Dopo aver modificato `.env`, applica le modifiche con `docker compose up -d`. Le app web capiscono a quale API connettersi dall'indirizzo nel browser, quindi cambiare dominio richiede solo l'aggiornamento di `SITE_ADDRESS` e `PUBLIC_URL` e un riavvio -- nessuna ricompilazione.

:::warning
Conserva `.env` in un luogo sicuro. `ENCRYPTION_KEY` protegge le credenziali dei gateway di pagamento e dell'archiviazione; un backup senza di essa non può decifrarle. `./deploy/b1 backup` include una copia proprio per questo motivo.
:::

### Passare a un dominio in un secondo momento

Se hai installato su `localhost` e in seguito vuoi renderlo pubblico: punta il DNS alla macchina, imposta `DOMAIN`, `SITE_ADDRESS` (il dominio nudo) e `PUBLIC_URL` (`https://` + dominio) in `.env`, poi `docker compose up -d`. Caddy ottiene un certificato alla prima richiesta.

## Email, donazioni, multi-sito e integrazioni

Questi funzionano esattamente come su Railway -- le stesse variabili d'ambiente, impostate in `.env` anziché nella dashboard di Railway:

- **[Email / SMTP](./railway-template#1-email-highly-recommended)** — guide per i provider Resend, Brevo e Gmail
- **[Multi-sito](./railway-template#3-multi-site-multiple-churches-on-one-instance)** — chiese illimitate per istanza. `/` serve la chiesa il cui slug è `DEFAULT_CHURCH_SLUG` (la prima chiesa è `church`); punta i domini aggiuntivi alla macchina e mappali in **Impostazioni → Domini** di B1Admin
- **[Donazioni online](./railway-template#4-online-giving-stripe--paypal)** — configurate per chiesa nell'interfaccia di amministrazione
- **[Integrazioni opzionali](./railway-template#6-optional-feature-integrations)** — `OPENAI_API_KEY`, `YOUTUBE_API_KEY`, `PEXELS_KEY`, `VIMEO_TOKEN`, `API_BIBLE_KEY`, `GOOGLE_RECAPTCHA_SECRET_KEY`
- **[Notifiche push](#push-notifications)** — `WEB_PUSH_*`; l'installer lascia questi valori vuoti, quindi il push è disattivato finché non li aggiungi

Gli inviti e le altre email inviate dalla chiesa sono abilitati automaticamente su un'istanza self-hosted (il servizio ospitato li subordina a una revisione manuale per proteggere la reputazione del mittente).

## Notifiche push {#push-notifications}

Il push web per browser e app mobile resta disattivato finché il server non dispone di una coppia di chiavi VAPID. L'installer non ne crea una. Finché non la aggiungi, la pagina Notifiche dell'app web mobile indica che il push non è attivo per il sito.

1. Genera una coppia di chiavi. Serve solo Docker:

   ```bash
   docker run --rm node:lts-alpine npx --yes web-push generate-vapid-keys
   ```

2. Aggiungi i due valori a `.env`. `WEB_PUSH_SUBJECT` è facoltativo, ed è l'indirizzo di contatto che vedono i servizi push:

   ```bash
   WEB_PUSH_PUBLIC_KEY=…
   WEB_PUSH_PRIVATE_KEY=…
   WEB_PUSH_SUBJECT=mailto:admin@example.org
   ```

3. Applicali:

   ```bash
   docker compose up -d
   ```

4. Per verificare, apri **Amministrazione server → Stato del server** in B1Admin. Entrambe le chiavi Web Push devono risultare configurate. I membri possono quindi attivare le notifiche dall'app web mobile.

:::warning
Mantieni le stesse chiavi una volta che i membri si sono iscritti. Cambiarle invalida ogni iscrizione esistente, e ogni dispositivo deve registrarsi di nuovo.
:::

## Dati, backup e archiviazione dei file

Tre volumi Docker con nome contengono tutto lo stato:

| Volume | Contenuto |
|--------|----------|
| `b1church_mysql-data` | Tutti gli schemi del database |
| `b1church_api-content` | File caricati -- foto, documenti, immagini del sito web |
| `b1church_caddy-data` | Certificati TLS |

`./deploy/b1 backup` scrive uno snapshot coerente dei primi due più `.env` in `backups/<timestamp>/`. Pianificalo con cron e copia la cartella fuori dalla macchina:

```
0 3 * * * cd /opt/b1church && ./deploy/b1 backup >> backups/backup.log 2>&1
```

Per librerie multimediali di grandi dimensioni puoi passare l'archiviazione dei file a S3 -- imposta `FILE_STORE=S3` più le variabili `AWS_*` descritte nella [sezione Archiviazione dei file della guida Railway](./railway-template#5-file-storage). I backup del database non includono gli oggetti S3; attiva il versioning del bucket.

## Aggiornamento

```bash
./deploy/b1 upgrade
```

In sequenza: scarica la release, crea un backup, ricrea i container, esegue le migrazioni del database in sospeso all'avvio dell'API e attende il controllo di salute dell'API. Se qualcosa fallisce, si ferma e ti indica di eseguire `./deploy/b1 rollback`, che ripristina quel backup e la release precedente. Le migrazioni vanno solo in avanti; tornare indietro significa sempre ripristinare lo snapshot.

Aggiornare dal file compose beta (quello che compilava le immagini dal sorgente) funziona allo stesso modo una volta che hai un `.env`: usava `MYSQL_ROOT_PASSWORD=churchapps` per impostazione predefinita, quindi inseriscila in `.env` insieme a `PUBLIC_URL` e `SITE_ADDRESS`, sostituisci `docker-compose.yml` e `deploy/` con i file attuali ed esegui `./deploy/b1 upgrade`.

## Compilare dal sorgente

Gli sviluppatori possono compilare le immagini in locale invece di scaricarle:

```bash
docker compose -f docker-compose.yml -f docker-compose.build.yml up -d --build
```

`API_CONTEXT` e `B1APP_CONTEXT` in `.env` indirizzano le build verso checkout locali (ad esempio `../Api`) oppure verso un ref git.

## Risoluzione dei problemi

| Sintomo | Causa probabile | Soluzione |
|---------|--------------|-----------|
| Il container `api` si riavvia in loop | errore di migrazione o password del database errata | `./deploy/b1 logs api` — la migrazione indica quale modulo ha fallito |
| `api` registra "ENCRYPTION_KEY must be exactly 32 characters" | chiave modificata a mano o troncata in `.env` | ripristina la chiave originale di 32 caratteri (generane una nuova solo se non sono ancora memorizzate credenziali) |
| Il browser mostra un avviso sul certificato | DNS non ancora puntato qui, oppure porte 80/443 bloccate | correggi DNS / firewall; Caddy riprova da solo |
| `/` mostra una dashboard invece del sito web | nessuna chiesa ancora, oppure `DEFAULT_CHURCH_SLUG` non corrisponde | crea la chiesa, oppure imposta lo slug da **Impostazioni → Chiesa** |
| "Controlla la tua email" ma nessuna email arriva | `MAIL_SYSTEM=SMTP` con credenziali errate | correggi le credenziali, oppure rimuovi `MAIL_SYSTEM` per disattivare l'email |
| L'app web mobile dice che le notifiche push non sono attive | nessuna chiave VAPID sul server | aggiungile come descritto in [Notifiche push](#push-notifications) |
| Chat / funzioni live silenziose | websocket bloccato da un altro proxy davanti | il socket si trova su `/api/` sulla stessa porta; consenti gli header `Upgrade` |
| `install` rifiuta: "database volume already exists" | residui di un'installazione precedente | `docker compose down -v` per cancellare tutto, oppure scrivi un `.env` e usa `upgrade` |

Ancora bloccato? Apri una segnalazione su [github.com/ChurchApps/ChurchAppsSupport/issues](https://github.com/ChurchApps/ChurchAppsSupport/issues) allegando l'output di `./deploy/b1 logs`.

## Articoli correlati

- **[Self-hosting su Railway](./railway-template)** — alternativa di hosting gestito, insieme alle guide di configurazione post-deploy condivise
- **[Configurazione iniziale](../../getting-started/initial-setup)** — primi passi dopo la creazione della chiesa
- **[Setup locale dell'API](../api/local-setup)** — eseguire lo stack direttamente per lo sviluppo
