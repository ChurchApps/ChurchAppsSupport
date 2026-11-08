---
title: "Variabili d'ambiente"
description: "Configura i file .env per i progetti ChurchApps, scegli l'API demo condivisa o una locale e compila le variabili per B1 Admin, B1.church, B1 Checkin e altri."
---

# Variabili d'ambiente

<div class="article-intro">

Ogni progetto ChurchApps utilizza un file `.env` per la configurazione locale. Ogni progetto include un file di esempio che copi e personalizzi. Questa pagina descrive le variabili d'ambiente per API, app web e app mobili, incluso come scegliere tra la destinazione demo e quella locale.

</div>

<div class="prereqs">
<h4>Prima di iniziare</h4>

- Installa i [prerequisiti](./prerequisites.md) per il progetto che ti interessa
- Clona il repository del progetto su cui vuoi lavorare
- Consulta la [Panoramica del progetto](./project-overview.md) per capire di quali moduli API ha bisogno il tuo progetto

</div>

## Schema generale

1. Cerca `dotenv.sample.txt` o `.env.sample` nella radice del progetto.
2. Copialo come `.env`.
3. Modifica i valori secondo necessità.

```bash
# Esempio per un progetto con .env.sample
cp .env.sample .env

# Esempio per un progetto con dotenv.sample.txt
cp dotenv.sample.txt .env
```

:::warning
**Non committare mai i file `.env` nel controllo di versione.** Contengono dati sensibili come credenziali del database, chiavi API e segreti JWT. Tutti i progetti ChurchApps includono `.env` nel file `.gitignore`, ma verifica sempre prima di committare.
:::

## Scegliere la destinazione API

La decisione più importante riguarda l'indirizzo a cui il frontend invia le chiamate API. Le opzioni sono due:

### Opzione 1: API demo (consigliata per lo sviluppo frontend)

Usa l'ambiente demo condiviso. Non è necessario configurare un'API o un database in locale. Esegue l'ultima versione del codice da `main`, e i dati di esempio vengono ricaricati ogni notte.

```bash
# Schema dell'URL di base
https://api.demo.churchapps.org/{module}

# Esempi di URL dei moduli
https://api.demo.churchapps.org/membership
https://api.demo.churchapps.org/attendance
https://api.demo.churchapps.org/content
https://api.demo.churchapps.org/giving
https://api.demo.churchapps.org/messaging
https://api.demo.churchapps.org/doing
```

:::warning
L'ambiente di staging (`api.staging.churchapps.org`, `api.staging.lessons.church` e gli host correlati) è stato dismesso. Alcuni file `.env` di esempio potrebbero contenere ancora URL di staging; sostituiscili con i valori demo o locali indicati in questa pagina. Non esiste un'API Lessons condivisa per ambienti non di produzione: esegui [LessonsApi](https://github.com/ChurchApps/LessonsApi) in locale (ascolta sulla porta `8090`) quando ne hai bisogno.
:::

### Opzione 2: API locale

Esegui il progetto Api sulla tua macchina. Richiede MySQL 8.0+ con i database creati per ciascun modulo. Consulta la guida [configurazione locale dell'API](../api/local-setup.md).

```bash
# Schema dell'URL di base
http://localhost:8084/{module}

# Esempi di URL dei moduli
http://localhost:8084/membership
http://localhost:8084/attendance
http://localhost:8084/content
http://localhost:8084/giving
http://localhost:8084/messaging
http://localhost:8084/doing
```

---

## Variabili d'ambiente dell'API

Il progetto **Api** principale (`.env.sample`) ha la configurazione più articolata. Ecco le variabili principali:

### Impostazioni comuni

| Variabile | Descrizione | Esempio |
|----------|-------------|---------|
| `ENVIRONMENT` | Ambiente di esecuzione | `dev` |
| `SERVER_PORT` | Porta HTTP per il server di sviluppo locale | `8084` |
| `ENCRYPTION_KEY` | Chiave di cifratura a 192 bit per i dati sensibili | `aSecretKeyOfExactly192BitsLength` |
| `JWT_SECRET` | Segreto per la firma dei JSON Web Token | `jwt-secret-dev` |
| `FILE_STORE` | Dove archiviare i file caricati (`disk` o `s3`) | `disk` |
| `CORS_ORIGIN` | Origini CORS consentite (`*` per lo sviluppo locale) | `*` |

### Connessione al database

Un unico URL di base indirizza l'API verso MySQL. L'API ricava da questa base un database per modulo (`/membership`, `/attendance`, `/content`, `/giving`, `/messaging`, `/doing`, `/reporting`).

| Variabile | Esempio |
|----------|---------|
| `API_DATABASE_URL` | `mysql://root:password@localhost:3306` |

:::tip
Sostituisci `root:password` con le tue credenziali MySQL effettive. Ogni database per modulo deve esistere prima di avviare l'API. Usa `npm run initdb` per creare lo schema di tutti i moduli, oppure `npm run initdb:membership` per un singolo modulo.
:::

### Impostazioni WebSocket

| Variabile | Descrizione | Esempio |
|----------|-------------|---------|
| `SOCKET_PORT` | Porta del server WebSocket | `8087` |
| `SOCKET_URL` | URL WebSocket a cui si connettono i client | `ws://localhost:8087` |

---

## Variabili d'ambiente delle app web

### B1Admin (React + Vite)

File di esempio: `.env.sample`

| Variabile | Descrizione | Esempio (Demo) |
|----------|-------------|----------------|
| `REACT_APP_STAGE` | Nome dell'ambiente | `demo` |
| `PORT` | Porta del server di sviluppo | `3101` |
| `REACT_APP_API_BASE` | Unico URL di base per tutte le API ChurchApps (`/membership`, `/attendance`, `/content`, `/giving`, `/messaging`, `/doing`, `/reporting` vengono aggiunti automaticamente) | `https://api.demo.churchapps.org` |
| `REACT_APP_CONTENT_ROOT` | URL di distribuzione dei contenuti | `https://democontent.churchapps.org` |
| `REACT_APP_GOOGLE_ANALYTICS` | ID di Google Analytics (facoltativo) | `UA-123456789-1` |

Per lo sviluppo con API locale, punta l'URL di base al tuo stack locale:

```bash
REACT_APP_API_BASE=http://localhost:8084
```

### B1App (Next.js)

File di esempio: `.env.sample`

| Variabile | Descrizione | Esempio (Demo) |
|----------|-------------|----------------|
| `NEXT_PUBLIC_API_BASE` | Unico URL di base per tutte le API ChurchApps (`/membership`, `/attendance`, `/content`, `/giving`, `/messaging`, `/doing`, `/reporting` vengono aggiunti automaticamente) | `https://api.demo.churchapps.org` |
| `NEXT_PUBLIC_CONTENT_ROOT` | URL di distribuzione dei contenuti | `https://democontent.churchapps.org` |
| `NEXT_PUBLIC_GOOGLE_ANALYTICS` | ID di Google Analytics (facoltativo) | `UA-123456789-1` |

:::info
Next.js richiede il prefisso `NEXT_PUBLIC_` per ogni variabile d'ambiente che deve essere disponibile nel browser. Le variabili utilizzate solo lato server non necessitano di questo prefisso.
:::

### LessonsApp (Next.js)

File di esempio: `dotenv.sample.txt`

| Variabile | Descrizione | Esempio (LessonsApi locale) |
|----------|-------------|----------------------------|
| `STAGE` | Stage dell'ambiente (lasciala non impostata o imposta `dev` per lo sviluppo locale) | `dev` |
| `NEXT_PUBLIC_LESSONS_API` | URL dell'API Lessons | `http://localhost:8090` |
| `NEXT_PUBLIC_CONTENT_ROOT` | URL di distribuzione dei contenuti | `http://localhost:8090/content` |
| `NEXT_PUBLIC_API_BASE` | Base dell'API ChurchApps usata per l'accesso (considerata solo quando `STAGE` non è impostata o è `dev`) | `https://api.demo.churchapps.org` |

---

## Variabili d'ambiente delle app mobili

### B1Checkin (React Native / Expo)

File di esempio: `dotenv.sample.txt`

| Variabile | Descrizione | Esempio |
|----------|-------------|---------|
| `EXPO_PUBLIC_STAGE` | Seleziona l'insieme di API a cui si connette l'app: `dev` (API locale su `http://127.0.0.1:8084`), `staging` oppure `prod` (il valore predefinito se non impostata) | `dev` |

B1Checkin utilizza solo i moduli API Membership e Attendance, oltre all'URL di distribuzione dei contenuti; i loro indirizzi per ciascun stage sono impostati in `src/helpers/EnvironmentHelper.ts`.

:::info
Expo include nel bundle dell'app solo le variabili con il prefisso `EXPO_PUBLIC_`. Riavvia il server di sviluppo con `yarn start --reset-cache` dopo aver modificato `.env`.
:::

---

## Riferimento rapido: posizione dei file di esempio

| Progetto | File di esempio |
|---------|-----------------|
| Api | `.env.sample` |
| B1Admin | `.env.sample` |
| B1App | `.env.sample` |
| B1Checkin | `dotenv.sample.txt` |
| LessonsApp | `dotenv.sample.txt` |
| AskApi | `dotenv.sample.txt` |
