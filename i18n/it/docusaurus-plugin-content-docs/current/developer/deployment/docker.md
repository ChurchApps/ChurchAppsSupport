---
title: "Self-hosting con Docker"
---

# Self-hosting con Docker

<div class="article-intro">

Esegui la tua istanza privata di B1 Admin, del portale membri B1, dell'API e di un database MySQL su qualsiasi macchina con Docker — un server domestico, un VPS da 5$, o una macchina on-prem. Un solo `docker compose up` costruisce e avvia tutto. Se preferisci non gestire affatto un server, vedi [Self-hosting su Railway](./railway-template) per l'alternativa gestita.

</div>

## Avvio rapido

<div class="prereqs">
<h4>Cosa ti serve</h4>

- [Docker Engine](https://docs.docker.com/engine/install/) con Compose v2 (incluso in Docker Desktop)
- ~4 GB di RAM disponibili durante la build iniziale (le app web vengono costruite dal sorgente)
- Git, oppure semplicemente il file `docker-compose.yml` grezzo

</div>

```bash
git clone https://github.com/ChurchApps/B1Admin.git
cd B1Admin
docker compose up -d
```

La prima esecuzione richiede 10–20 minuti: costruisce B1Admin dal tuo clone e costruisce l'API e B1App direttamente dai loro repository GitHub. Gli avvii successivi richiedono secondi.

Quando tutti e quattro i servizi sono attivi:

1. Apri **http://localhost:3101** (B1 Admin).
2. Clicca **Registrati** e crea il tuo account. Il primo account è automaticamente un amministratore del server.
3. Segui le indicazioni nell'app per creare la tua prima chiesa.

Gli schemi del database vengono creati automaticamente dalla migrazione di avvio del container dell'API — nessun SQL manuale richiesto.

| Servizio | URL |
|---------|-----|
| B1Admin (staff/admin) | http://localhost:3101 |
| B1App (portale membri / sito web) | http://localhost:3000 |
| API | http://localhost:8084 |
| MySQL | solo interno (`mysql:3306` sulla rete compose) |

## Configurazione

Tutte le impostazioni vivono in un file `.env` accanto a `docker-compose.yml`. Ogni variabile ha un valore predefinito funzionante per localhost, quindi il file è opzionale finché non lo personalizzi.

```bash
# .env — tutto è opzionale; mostrato con i valori predefiniti
MYSQL_ROOT_PASSWORD=churchapps
JWT_SECRET=please-change-this-jwt-secret
ENCRYPTION_KEY=PleaseChangeThisDockerDefaultKey   # esattamente 32 caratteri

# URL pubblici (cambiali quando esponi oltre localhost)
API_URL=http://localhost:8084
B1ADMIN_URL=http://localhost:3101
B1APP_URL=http://localhost:3000
SOCKET_URL=ws://localhost:8084

# Email — vedi la sezione Email della guida Railway per le procedure guidate dei provider
MAIL_SYSTEM=
SMTP_HOST=
SMTP_USER=
SMTP_PASS=
SMTP_SECURE=false
SUPPORT_EMAIL=noreply@yourchurch.org
```

Prima dell'uso reale, cambia `MYSQL_ROOT_PASSWORD`, `JWT_SECRET`, ed `ENCRYPTION_KEY` (qualsiasi stringa di 32 caratteri).

:::warning
I valori `*_URL` sono **incorporati nelle app web al momento della build** (comportamento standard di Vite/Next.js). Cambiarli in `.env` richiede una ricostruzione, non solo un riavvio:

```bash
docker compose up -d --build
```
:::

Cambiare la password MySQL dopo il primo avvio richiede l'aggiornamento della password anche dentro MySQL — il volume mantiene le vecchie credenziali.

## Esporlo a Internet

Metti qualsiasi reverse proxy davanti e assegna a ogni servizio un hostname. Con [Caddy](https://caddyserver.com/) è così:

```
admin.yourchurch.org { reverse_proxy localhost:3101 }
app.yourchurch.org   { reverse_proxy localhost:3000 }
api.yourchurch.org   { reverse_proxy localhost:8084 }
```

Poi imposta gli URL in `.env` e ricostruisci:

```bash
API_URL=https://api.yourchurch.org
B1ADMIN_URL=https://admin.yourchurch.org
B1APP_URL=https://app.yourchurch.org
SOCKET_URL=wss://api.yourchurch.org
```

```bash
docker compose up -d --build
```

Il WebSocket usato per la chat e le notifiche live condivide la porta dell'API, quindi `SOCKET_URL` è semplicemente l'URL dell'API con `wss://`.

## Email, contributi, multi-sito e integrazioni

Questi funzionano in modo identico alla distribuzione Railway — le stesse variabili d'ambiente, impostate nel tuo file `.env` invece che nella dashboard Railway (il file compose le passa all'API):

- **[Email / SMTP](./railway-template#1-email-highly-recommended)** — fortemente consigliato; senza email i membri non possono reimpostare le password
- **[Multi-sito](./railway-template#3-multi-site-multiple-churches-on-one-instance)** — chiese illimitate per istanza, gestite nell'interfaccia amministrativa
- **[Contributi online](./railway-template#4-online-giving-stripe--paypal)** — configurati per chiesa nell'interfaccia amministrativa, non tramite variabili d'ambiente
- **[Integrazioni facoltative](./railway-template#6-optional-feature-integrations)** — `OPENAI_API_KEY`, `YOUTUBE_API_KEY`, `PEXELS_KEY`, `VIMEO_TOKEN`, `API_BIBLE_KEY`, `WEB_PUSH_PUBLIC_KEY`/`WEB_PUSH_PRIVATE_KEY`, `GOOGLE_RECAPTCHA_SECRET_KEY`

## Dati, backup e archiviazione file

Due volumi Docker denominati contengono tutto lo stato:

| Volume | Contenuto |
|--------|----------|
| `mysql-data` | Tutti gli schemi del database |
| `api-content` | File caricati — foto, documenti, immagini del sito (montato su `/app/content`) |

Fai il backup del database con una riga sola (schedulala con cron):

```bash
docker compose exec mysql mysqldump -uroot -p"$MYSQL_ROOT_PASSWORD" --all-databases > backup-$(date +%F).sql
```

Fai il backup dei file caricati copiando il volume:

```bash
docker run --rm -v b1admin_api-content:/data -v "$PWD":/backup alpine tar czf /backup/content-$(date +%F).tgz -C /data .
```

Per librerie multimediali di grandi dimensioni puoi passare l'archiviazione dei file a S3 invece del volume locale — imposta `FILE_STORE=S3` più le variabili `AWS_*` descritte nella [sezione Archiviazione file della guida Railway](./railway-template#5-file-storage).

## Aggiornamento

L'API e B1App si costruiscono dal branch `main` dei loro repository GitHub; B1Admin si costruisce dal tuo clone locale.

```bash
git pull                              # aggiorna B1Admin
docker compose build --pull           # ricostruisci tutte le immagini contro l'ultimo main
docker compose up -d
```

Le migrazioni del database vengono eseguite automaticamente all'avvio del container dell'API.

Per fissare le versioni invece di seguire `main`, punta i contesti di build a un tag in `.env`:

```bash
API_CONTEXT=https://github.com/ChurchApps/Api.git#v1.2.3
B1APP_CONTEXT=https://github.com/ChurchApps/B1App.git#v1.2.3
```

Gli sviluppatori possono puntare le stesse variabili a checkout locali (ad es. `API_CONTEXT=../Api`).

## Risoluzione dei problemi

| Sintomo | Causa probabile | Soluzione |
|---------|--------------|-----|
| Il container `api` si riavvia in loop | MySQL non pronto o migrazione fallita | `docker compose logs api` — la migrazione stampa quale modulo è fallito |
| Il login reindirizza a `api.churchapps.org` | App web costruita senza gli argomenti dello stage `custom` | Ricostruisci: `docker compose build --no-cache b1admin b1app` |
| Cambiato un URL in `.env` ma non è successo nulla | Gli URL sono incorporati al momento della build | `docker compose up -d --build` |
| "Controlla la tua email" ma nessuna email arriva | `MAIL_SYSTEM=SMTP` con credenziali errate | Correggi le credenziali, o rimuovi `MAIL_SYSTEM` per disabilitare l'email |
| Chat / funzioni live silenziose | `SOCKET_URL` irraggiungibile dal browser | Deve essere `wss://` dietro HTTPS e proxato alla porta 8084 |
| La build muore su un piccolo VPS | Memoria esaurita durante `next build` | Aggiungi swap, oppure costruisci su un'altra macchina e usa `docker save`/`load` |

Ancora bloccato? Apri un issue su [github.com/ChurchApps/ChurchAppsSupport/issues](https://github.com/ChurchApps/ChurchAppsSupport/issues) con l'output di `docker compose logs`.

## Articoli correlati

- **[Self-hosting su Railway](./railway-template)** — alternativa di hosting gestito, più le guide di configurazione post-distribuzione condivise
- **[Configurazione iniziale](../../getting-started/initial-setup)** — primi passi dopo la creazione della tua chiesa
- **[Configurazione API locale](../api/local-setup)** — eseguire lo stack direttamente per lo sviluppo
