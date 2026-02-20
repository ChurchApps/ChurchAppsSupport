---
title: "Variabili di Ambiente"
---

# Variabili di Ambiente

<div class="article-intro">

Ogni progetto ChurchApps utilizza un file `.env` per la configurazione locale. Ogni progetto include un file di esempio che si copia e personalizza. Questa pagina copre le variabili di ambiente per le API, le applicazioni web e le applicazioni mobile, incluso come scegliere tra target API di staging e locali.

</div>

<div class="prereqs">
<h4>Prima di Iniziare</h4>

- Installa i [prerequisiti](./prerequisites) per il tuo progetto
- Clona il repository del progetto su cui vuoi lavorare
- Consulta la [Panoramica del Progetto](./project-overview) per capire quali moduli API servono al tuo progetto

</div>

## Modello Generale

1. Cerca `dotenv.sample.txt` o `.env.sample` nella radice del progetto.
2. Copialo in `.env`.
3. Modifica i valori secondo necessità.

```bash
# Esempio per un progetto con .env.sample
cp .env.sample .env

# Esempio per un progetto con dotenv.sample.txt
cp dotenv.sample.txt .env
```

:::warning
**Non committare mai i file `.env` nel controllo di versione.** Contengono segreti come credenziali del database, chiavi API e segreti JWT. Tutti i progetti ChurchApps includono `.env` in `.gitignore`, ma controlla sempre due volte prima di committare.
:::

## Scelta del Target API

La decisione più importante è dove il tuo frontend punta per le chiamate API. Ci sono due opzioni:

### Opzione 1: API di Staging (Consigliato per lo Sviluppo Frontend)

Utilizza l'ambiente di staging condiviso. Nessuna configurazione locale di API o database necessaria.

```bash
# Pattern URL base
https://api.staging.churchapps.org/{module}

# Esempio URL dei moduli
https://api.staging.churchapps.org/membership
https://api.staging.churchapps.org/attendance
https://api.staging.churchapps.org/content
https://api.staging.churchapps.org/giving
https://api.staging.churchapps.org/messaging
https://api.staging.churchapps.org/doing
```

### Opzione 2: API Locale

Esegui il progetto Api sulla tua macchina. Richiede MySQL 8.0+ con i database creati per ogni modulo. Vedi la guida alla [configurazione API locale](../api/local-setup).

```bash
# Pattern URL base
http://localhost:8084/{module}

# Esempio URL dei moduli
http://localhost:8084/membership
http://localhost:8084/attendance
http://localhost:8084/content
http://localhost:8084/giving
http://localhost:8084/messaging
http://localhost:8084/doing
```

---

## Variabili di Ambiente delle API

Il progetto principale **Api** (`.env.sample`) ha la maggior parte della configurazione. Ecco le variabili chiave:

### Impostazioni Condivise

| Variabile | Descrizione | Esempio |
|-----------|-------------|---------|
| `ENVIRONMENT` | Ambiente di runtime | `dev` |
| `SERVER_PORT` | Porta HTTP per il server di sviluppo locale | `8084` |
| `ENCRYPTION_KEY` | Chiave di crittografia a 192 bit per dati sensibili | `aSecretKeyOfExactly192BitsLength` |
| `JWT_SECRET` | Segreto per la firma dei JSON Web Token | `jwt-secret-dev` |
| `FILE_STORE` | Dove memorizzare i file caricati (`disk` o `s3`) | `disk` |
| `CORS_ORIGIN` | Origini CORS consentite (`*` per lo sviluppo locale) | `*` |

### Connessioni al Database

Ogni modulo API ha il proprio database MySQL e la propria stringa di connessione:

| Variabile | Database |
|-----------|----------|
| `MEMBERSHIP_CONNECTION_STRING` | `mysql://root:password@localhost:3306/membership` |
| `ATTENDANCE_CONNECTION_STRING` | `mysql://root:password@localhost:3306/attendance` |
| `CONTENT_CONNECTION_STRING` | `mysql://root:password@localhost:3306/content` |
| `GIVING_CONNECTION_STRING` | `mysql://root:password@localhost:3306/giving` |
| `MESSAGING_CONNECTION_STRING` | `mysql://root:password@localhost:3306/messaging` |
| `DOING_CONNECTION_STRING` | `mysql://root:password@localhost:3306/doing` |

:::tip
Aggiorna `root:password` con le tue credenziali MySQL effettive. Ogni database deve essere creato prima di eseguire l'API. Usa `npm run initdb` per creare lo schema per tutti i moduli, o `npm run initdb:membership` per un singolo modulo.
:::

### Impostazioni WebSocket

| Variabile | Descrizione | Esempio |
|-----------|-------------|---------|
| `SOCKET_PORT` | Porta per il server WebSocket | `8087` |
| `SOCKET_URL` | URL WebSocket per la connessione dei client | `ws://localhost:8087` |

---

## Variabili di Ambiente delle Applicazioni Web

### B1Admin (React + Vite)

File di esempio: `.env.sample`

| Variabile | Descrizione | Esempio (Staging) |
|-----------|-------------|-------------------|
| `REACT_APP_STAGE` | Nome dell'ambiente | `demo` |
| `PORT` | Porta del server di sviluppo | `3101` |
| `REACT_APP_MEMBERSHIP_API` | URL API Membership | `https://api.staging.churchapps.org/membership` |
| `REACT_APP_ATTENDANCE_API` | URL API Attendance | `https://api.staging.churchapps.org/attendance` |
| `REACT_APP_GIVING_API` | URL API Giving | `https://api.staging.churchapps.org/giving` |
| `REACT_APP_CONTENT_ROOT` | URL distribuzione contenuti | `https://content.staging.churchapps.org` |
| `REACT_APP_GOOGLE_ANALYTICS` | ID Google Analytics (opzionale) | `UA-123456789-1` |

Per lo sviluppo API locale, decommenta e utilizza le varianti `localhost`:

```bash
REACT_APP_MEMBERSHIP_API=http://localhost:8084/membership
REACT_APP_ATTENDANCE_API=http://localhost:8084/attendance
REACT_APP_GIVING_API=http://localhost:8084/giving
REACT_APP_CONTENT_API=http://localhost:8084/content
REACT_APP_DOING_API=http://localhost:8084/doing
REACT_APP_MESSAGING_API=http://localhost:8084/messaging
```

### B1App (Next.js)

File di esempio: `.env.sample`

| Variabile | Descrizione | Esempio (Staging) |
|-----------|-------------|-------------------|
| `NEXT_PUBLIC_MEMBERSHIP_API` | URL API Membership | `https://api.staging.churchapps.org/membership` |
| `NEXT_PUBLIC_ATTENDANCE_API` | URL API Attendance | `https://api.staging.churchapps.org/attendance` |
| `NEXT_PUBLIC_GIVING_API` | URL API Giving | `https://api.staging.churchapps.org/giving` |
| `NEXT_PUBLIC_MESSAGING_API` | URL API Messaging | `https://api.staging.churchapps.org/messaging` |
| `NEXT_PUBLIC_CONTENT_API` | URL API Content | `https://api.staging.churchapps.org/content` |
| `NEXT_PUBLIC_CONTENT_ROOT` | URL distribuzione contenuti | `https://staging.churchapps.org/content` |
| `NEXT_PUBLIC_CHURCH_APPS_URL` | URL base ChurchApps | `https://staging.churchapps.org` |
| `NEXT_PUBLIC_GOOGLE_ANALYTICS` | ID Google Analytics (opzionale) | `UA-123456789-1` |

:::info
Next.js richiede il prefisso `NEXT_PUBLIC_` per qualsiasi variabile di ambiente che deve essere disponibile nel browser. Le variabili solo server non necessitano di questo prefisso.
:::

### LessonsApp (Next.js)

File di esempio: `dotenv.sample.txt`

| Variabile | Descrizione | Esempio (Staging) |
|-----------|-------------|-------------------|
| `STAGE` | Stage dell'ambiente | `staging` |
| `NEXT_PUBLIC_LESSONS_API` | URL API Lessons | `https://api.staging.lessons.church` |
| `NEXT_PUBLIC_CONTENT_ROOT` | URL distribuzione contenuti | `https://api.staging.lessons.church/content` |
| `NEXT_PUBLIC_CHURCH_APPS_URL` | URL base ChurchApps | `https://staging.churchapps.org` |

---

## Variabili di Ambiente delle Applicazioni Mobile

### B1Mobile (React Native / Expo)

File di esempio: `dotenv.sample.txt`

| Variabile | Descrizione | Esempio (Staging) |
|-----------|-------------|-------------------|
| `STAGE` | Nome dell'ambiente | `dev` |
| `MEMBERSHIP_API` | URL API Membership | `https://api.staging.churchapps.org/membership` |
| `MESSAGING_API` | URL API Messaging | `https://api.staging.churchapps.org/messaging` |
| `ATTENDANCE_API` | URL API Attendance | `https://api.staging.churchapps.org/attendance` |
| `GIVING_API` | URL API Giving | `https://api.staging.churchapps.org/giving` |
| `DOING_API` | URL API Doing | `https://api.staging.churchapps.org/doing` |
| `CONTENT_API` | URL API Content | `https://api.churchapps.org/content` |
| `CONTENT_ROOT` | URL distribuzione contenuti | `https://content.staging.churchapps.org` |
| `LESSONS_ROOT` | URL sito Lessons | `https://staging.lessons.church` |

:::info
Le applicazioni mobile non usano il prefisso `REACT_APP_` o `NEXT_PUBLIC_`. L'accesso alle variabili di ambiente è gestito dalla configurazione di Expo.
:::

---

## Riferimento Rapido: Posizioni dei File di Esempio

| Progetto | File di Esempio |
|----------|-----------------|
| Api | `.env.sample` |
| B1Admin | `.env.sample` |
| B1App | `.env.sample` |
| B1Mobile | `dotenv.sample.txt` |
| B1Checkin | `dotenv.sample.txt` |
| LessonsApp | `dotenv.sample.txt` |
| AskApi | `dotenv.sample.txt` |
