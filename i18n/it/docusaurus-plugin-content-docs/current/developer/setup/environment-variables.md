---
title: "Variabili d'ambiente"
---

# Variabili d'ambiente

<div class="article-intro">

Ogni progetto ChurchApps usa un file `.env` per la configurazione locale. Ogni progetto include un file di esempio che copi e personalizzi. Questa pagina descrive le variabili d'ambiente per API, app web e app mobili, inclusa la scelta tra le API demo e quelle locali.

</div>

<div class="prereqs">
<h4>Prima di iniziare</h4>

- Installa i [prerequisiti](./prerequisites) per il tuo progetto
- Clona il repository del progetto su cui vuoi lavorare
- Consulta la [Panoramica dei progetti](./project-overview) per capire di quali moduli API ha bisogno il tuo progetto

</div>

## Schema generale

1. Cerca `dotenv.sample.txt` o `.env.sample` nella radice del progetto.
2. Copialo in `.env`.
3. Modifica i valori secondo necessità.

```bash
# Example for a project with .env.sample
cp .env.sample .env

# Example for a project with dotenv.sample.txt
cp dotenv.sample.txt .env
```

:::warning
**Non committare mai i file `.env` nel controllo di versione.** Contengono segreti come credenziali del database, chiavi API e segreti JWT. Tutti i progetti ChurchApps includono `.env` nel file `.gitignore`, ma controlla sempre prima di committare.
:::

## Scegliere la destinazione dell'API

La decisione più importante è dove il frontend punta per le chiamate API. Le opzioni sono due:

### Opzione 1: API demo (consigliata per lo sviluppo frontend)

Usa l'ambiente demo condiviso. Non serve alcuna API o database locale. Esegue l'ultimo codice di `main` e i suoi dati di esempio vengono ricaricati ogni notte.

```bash
# Base URL pattern
https://api.demo.churchapps.org/{module}

# Example module URLs
https://api.demo.churchapps.org/membership
https://api.demo.churchapps.org/attendance
https://api.demo.churchapps.org/content
https://api.demo.churchapps.org/giving
https://api.demo.churchapps.org/messaging
https://api.demo.churchapps.org/doing
```

:::warning
L'ambiente di staging (`api.staging.churchapps.org`, `api.staging.lessons.church` e gli host correlati) è stato dismesso. Alcuni file `.env` di esempio potrebbero ancora contenere URL di staging: sostituiscili con i valori demo o locali indicati in questa pagina. Non esiste un'API Lessons condivisa non di produzione: se ne hai bisogno, esegui [LessonsApi](https://github.com/ChurchApps/LessonsApi) in locale (ascolta sulla porta `8090`).
:::

### Opzione 2: API locale

Esegui il progetto Api sulla tua macchina. Richiede MySQL 8.0 o superiore con i database creati per ogni modulo. Vedi la guida [configurazione locale dell'API](../api/local-setup).

```bash
# Base URL pattern
http://localhost:8084/{module}

# Example module URLs
http://localhost:8084/membership
http://localhost:8084/attendance
http://localhost:8084/content
http://localhost:8084/giving
http://localhost:8084/messaging
http://localhost:8084/doing
```

---

## Variabili d'ambiente dell'API

Il progetto **Api** principale (`.env.sample`) è quello con più configurazioni. Ecco le variabili principali:

### Impostazioni comuni

| Variabile | Descrizione | Esempio |
|-----------|-------------|---------|
| `ENVIRONMENT` | Ambiente di esecuzione | `dev` |
| `SERVER_PORT` | Porta HTTP per il server di sviluppo locale | `8084` |
| `ENCRYPTION_KEY` | Chiave di cifratura a 192 bit per i dati sensibili | `aSecretKeyOfExactly192BitsLength` |
| `JWT_SECRET` | Segreto per firmare i JSON Web Token | `jwt-secret-dev` |
| `FILE_STORE` | Dove archiviare i file caricati (`disk` o `s3`) | `disk` |
| `CORS_ORIGIN` | Origini CORS consentite (`*` per lo sviluppo locale) | `*` |

### Connessione al database

Un unico URL di base punta l'API a MySQL. L'API ricava un database per ogni modulo (`/membership`, `/attendance`, `/content`, `/giving`, `/messaging`, `/doing`, `/reporting`) a partire da questa base.

| Variabile | Esempio |
|-----------|---------|
| `API_DATABASE_URL` | `mysql://root:password@localhost:3306` |

:::tip
Sostituisci `root:password` con le tue credenziali MySQL effettive. Ogni database di modulo deve esistere prima di avviare l'API. Usa `npm run initdb` per creare lo schema di tutti i moduli, oppure `npm run initdb:membership` per un singolo modulo.
:::

### Impostazioni WebSocket

| Variabile | Descrizione | Esempio |
|-----------|-------------|---------|
| `SOCKET_PORT` | Porta per il server WebSocket | `8087` |
| `SOCKET_URL` | URL WebSocket a cui si connettono i client | `ws://localhost:8087` |

---

## Variabili d'ambiente delle app web

### B1Admin (React + Vite)

File di esempio: `.env.sample`

| Variabile | Descrizione | Esempio (Demo) |
|-----------|-------------|----------------|
| `REACT_APP_STAGE` | Nome dell'ambiente | `demo` |
| `PORT` | Porta del server di sviluppo | `3101` |
| `REACT_APP_API_BASE` | Unico URL di base per tutte le API ChurchApps (`/membership`, `/attendance`, `/content`, `/giving`, `/messaging`, `/doing`, `/reporting` vengono aggiunti automaticamente) | `https://api.demo.churchapps.org` |
| `REACT_APP_CONTENT_ROOT` | URL di distribuzione dei contenuti | `https://democontent.churchapps.org` |
| `REACT_APP_GOOGLE_ANALYTICS` | ID di Google Analytics (facoltativo) | `UA-123456789-1` |

Per lo sviluppo con un'API locale, punta l'URL di base al tuo stack locale:

```bash
REACT_APP_API_BASE=http://localhost:8084
```

### B1App (Next.js)

File di esempio: `.env.sample`

| Variabile | Descrizione | Esempio (Demo) |
|-----------|-------------|----------------|
| `NEXT_PUBLIC_API_BASE` | Unico URL di base per tutte le API ChurchApps (`/membership`, `/attendance`, `/content`, `/giving`, `/messaging`, `/doing`, `/reporting` vengono aggiunti automaticamente) | `https://api.demo.churchapps.org` |
| `NEXT_PUBLIC_CONTENT_ROOT` | URL di distribuzione dei contenuti | `https://democontent.churchapps.org` |
| `NEXT_PUBLIC_GOOGLE_ANALYTICS` | ID di Google Analytics (facoltativo) | `UA-123456789-1` |

:::info
Next.js richiede il prefisso `NEXT_PUBLIC_` per ogni variabile d'ambiente che deve essere disponibile nel browser. Le variabili solo lato server non necessitano di questo prefisso.
:::

### LessonsApp (Next.js)

File di esempio: `dotenv.sample.txt`

| Variabile | Descrizione | Esempio (API Lessons locale) |
|-----------|-------------|------------------------------|
| `STAGE` | Fase dell'ambiente (lasciala non impostata o imposta `dev` per lo sviluppo locale) | `dev` |
| `NEXT_PUBLIC_LESSONS_API` | URL dell'API Lessons | `http://localhost:8090` |
| `NEXT_PUBLIC_CONTENT_ROOT` | URL di distribuzione dei contenuti | `http://localhost:8090/content` |
| `NEXT_PUBLIC_API_BASE` | Base dell'API ChurchApps usata per l'accesso (considerata solo se `STAGE` non è impostata o è `dev`) | `https://api.demo.churchapps.org` |

---

## Variabili d'ambiente delle app mobili

### B1Mobile (React Native / Expo)

File di esempio: `dotenv.sample.txt`

| Variabile | Descrizione | Esempio (Demo) |
|-----------|-------------|----------------|
| `STAGE` | Nome dell'ambiente | `dev` |
| `MEMBERSHIP_API`, `ATTENDANCE_API`, `GIVING_API`, `DOING_API`, `MESSAGING_API`, `CONTENT_API` | Un URL per ogni modulo API ChurchApps (ciascuno usa la produzione se non impostato) | `https://api.demo.churchapps.org/membership` |
| `LESSONS_API` | API Lessons (host separato; non esiste una versione condivisa non di produzione) | `https://api.lessons.church` |
| `CONTENT_ROOT` | URL di distribuzione dei contenuti | `https://democontent.churchapps.org` |
| `LESSONS_ROOT` | URL del sito Lessons | `https://lessons.church` |

:::info
Le app mobili non usano i prefissi `REACT_APP_` o `NEXT_PUBLIC_`. L'accesso alle variabili d'ambiente è gestito dalla configurazione di Expo.
:::

---

## Riferimento rapido: posizione dei file di esempio

| Progetto | File di esempio |
|----------|-----------------|
| Api | `.env.sample` |
| B1Admin | `.env.sample` |
| B1App | `.env.sample` |
| B1Mobile | `dotenv.sample.txt` |
| B1Checkin | `dotenv.sample.txt` |
| LessonsApp | `dotenv.sample.txt` |
| AskApi | `dotenv.sample.txt` |
