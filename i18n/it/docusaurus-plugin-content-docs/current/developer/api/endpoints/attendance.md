---
title: "Endpoint di Presenze"
description: "Riferimento per l'API delle presenze in B1 Admin e B1 Checkin: campus, servizi, orari dei servizi, sessioni, visite, regole di check-in ed endpoint di esportazione."
---

# Endpoint di Presenze {#attendance-endpoints}

<div class="article-intro">

Il modulo Presenze gestisce le sedi dei campus, i servizi, gli orari dei servizi, le sessioni di presenza, le visite e le sessioni di visita. Fornisce l'infrastruttura per tenere traccia di chi ha partecipato a quale servizio o riunione di gruppo, supporta i flussi di check-in e offre report su andamento e riepiloghi delle presenze.

</div>

**Percorso base:** `/attendance`

## Campus {#campuses}

Percorso base: `/attendance/campuses`

Controller CRUD standard (estende GenericCrudController). Fornisce le route `getById`, `getAll`, `post` e `delete` tramite la classe base CRUD.

| Metodo | Percorso | Autenticazione | Permesso | Descrizione |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | — | Elenca tutti i campus della chiesa |
| GET | `/:id` | JWT | — | Ottiene un campus tramite ID |
| POST | `/` | JWT | Services.Edit | Crea o aggiorna campus |
| DELETE | `/:id` | JWT | Services.Edit | Elimina un campus |

## Servizi {#services}

Percorso base: `/attendance/services`

Estende GenericCrudController con le route CRUD `getById`, `getAll`, `post` e `delete`. Gli endpoint `getAll` (`GET /`) e `search` sono sovrascritti con implementazioni personalizzate.

| Metodo | Percorso | Autenticazione | Permesso | Descrizione |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | — | Elenca tutti i servizi (include le informazioni sul campus) |
| GET | `/:id` | JWT | — | Ottiene un servizio tramite ID |
| GET | `/search?campusId=` | JWT | — | Cerca servizi tramite ID del campus |
| POST | `/` | JWT | Services.Edit | Crea o aggiorna servizi |
| DELETE | `/:id` | JWT | Services.Edit | Elimina un servizio |

### Esempio: cercare servizi per campus {#example-search-services-by-campus}

```
GET /attendance/services/search?campusId=abc-123
Authorization: Bearer <token>
```

```json
[
  {
    "id": "svc-001",
    "churchId": "church-123",
    "campusId": "abc-123",
    "name": "Sunday Morning"
  }
]
```

## Orari dei servizi {#service-times}

Percorso base: `/attendance/servicetimes`

Estende GenericCrudController con le route CRUD `getById`, `post` e `delete`. Gli endpoint `getAll` e `search` sono implementazioni personalizzate.

| Metodo | Percorso | Autenticazione | Permesso | Descrizione |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | — | Elenca tutti gli orari dei servizi. Filtra con `?serviceId=`. Aggiungi `?include=groups` per includere i dati dei gruppi. Ogni riga include un booleano calcolato `checkinOpen` (falso solo quando l'orario del servizio ha una pianificazione di check-in la cui finestra è chiusa in questo momento). La finestra è misurata nel fuso orario del campus del servizio, poi nel fuso orario della chiesa, poi nel primo campus che ne ha uno, infine `America/New_York` |
| GET | `/:id` | JWT | — | Ottiene un orario di servizio tramite ID |
| GET | `/search?campusId=&serviceId=` | JWT | — | Cerca orari dei servizi per campus e servizio |
| GET | `/public/:churchId` | Pubblico | — | Ottiene l'albero campus → servizio → orario per una chiesa. Alimenta l'elemento `serviceTimes` del website builder |
| POST | `/` | JWT | Services.Edit | Crea o aggiorna orari dei servizi. Campi di pianificazione facoltativi: `dayOfWeek` (0 = domenica … 6), `startTime` / `endTime` (`HH:mm`), `checkinOpenMinutes` (prima dell'inizio), `checkinCloseMinutes` (dopo la fine). Il check-in è vincolato all'orario solo quando sono impostati sia `dayOfWeek` sia `startTime` |
| DELETE | `/:id` | JWT | Services.Edit | Elimina un orario di servizio |

## Orari di servizio dei gruppi {#group-service-times}

Percorso base: `/attendance/groupservicetimes`

Collega i gruppi a orari di servizio specifici.

| Metodo | Percorso | Autenticazione | Permesso | Descrizione |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | — | Elenca tutte le associazioni gruppo-orario di servizio. Filtra con `?groupId=` per ottenere le associazioni con i nomi dei servizi |
| GET | `/:id` | JWT | — | Ottiene un'associazione gruppo-orario di servizio tramite ID |
| POST | `/` | JWT | Services.Edit | Crea o aggiorna associazioni gruppo-orario di servizio |
| DELETE | `/:id` | JWT | Services.Edit | Elimina un'associazione gruppo-orario di servizio |

## Record di presenza {#attendance-records}

Percorso base: `/attendance/attendancerecords`

Fornisce viste aggregate di sola lettura dei dati di presenza per report e visualizzazione.

| Metodo | Percorso | Autenticazione | Permesso | Descrizione |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | Attendance.View | Carica i record di presenza di una persona. Richiede `?personId=` |
| GET | `/my` | JWT | — | Limitato a te: i record di presenza del membro connesso degli ultimi 12 mesi, dal più recente. Restituisce `401` se l'utente non è collegato a una persona. Alimenta la sezione **Le mie presenze** della pagina Me di B1 |
| GET | `/tree` | JWT | — | Carica l'albero completo delle presenze (campus, servizi, orari dei servizi, gruppi) |
| GET | `/trend?campusId=&serviceId=&serviceTimeId=&groupId=` | JWT | Attendance.View Summary | Carica i dati dell'andamento delle presenze con filtri facoltativi |
| GET | `/groups?serviceId=&week=` | JWT | Attendance.View | Carica le presenze dei gruppi per un servizio in una data settimana |
| GET | `/sessionStatus?serviceTimeId=&date=` | JWT | Attendance.View | Per ogni gruppo assegnato all'orario del servizio, restituisce `{ groupId, sessionId, attendanceCount }` per quella data (`date` è `YYYY-MM-DD`; `sessionId` è null quando il gruppo non ha una sessione). Alimenta la finestra **Chi deve ancora registrare le presenze** di B1Admin |
| GET | `/search?campusId=&serviceId=&serviceTimeId=&groupId=&startDate=&endDate=` | JWT | Attendance.View | Cerca record di presenza con filtri (campus, servizio, orario del servizio, gruppo, intervallo di date) |

### Esempio: andamento delle presenze {#example-attendance-trend}

```
GET /attendance/attendancerecords/trend?serviceId=svc-001
Authorization: Bearer <token>
```

```json
[
  { "week": "2025-01-05", "count": 142 },
  { "week": "2025-01-12", "count": 156 },
  { "week": "2025-01-19", "count": 138 }
]
```

## Sessioni {#sessions}

Percorso base: `/attendance/sessions`

Estende GenericCrudController con le route CRUD `getById` e `delete`. Gli endpoint `getAll` e `save` sono implementazioni personalizzate che consentono anche ai leader dei gruppi di gestire le sessioni dei propri gruppi.

| Metodo | Percorso | Autenticazione | Permesso | Descrizione |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | Attendance.View o Group Leader | Elenca tutte le sessioni. Filtra con `?groupId=` (include i nomi). I leader dei gruppi possono visualizzare le sessioni dei propri gruppi |
| GET | `/:id` | JWT | Attendance.View | Ottiene una sessione tramite ID |
| POST | `/` | JWT | Attendance.Edit o Group Leader | Crea o aggiorna sessioni. I leader dei gruppi possono salvare sessioni per i propri gruppi |
| DELETE | `/:id` | JWT | Attendance.Edit | Elimina una sessione |

## Visite {#visits}

Percorso base: `/attendance/visits`

Gestisce i singoli record di visita (una persona che partecipa in una data specifica) e fornisce il flusso di check-in.

| Metodo | Percorso | Autenticazione | Permesso | Descrizione |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | Attendance.View | Elenca tutte le visite. Filtra con `?personId=` |
| GET | `/:id` | JWT | Attendance.View | Ottiene una visita tramite ID |
| GET | `/checkin?serviceId=&peopleIds=` | JWT | Attendance.View o Attendance.Checkin | Carica i dati di check-in delle persone per un servizio. Restituisce le visite con le sessioni di visita dell'ultima data registrata |
| GET | `/active?peopleIds=` | JWT | Attendance.View o Attendance.Checkin | Le visite di oggi delle persone indicate che non sono ancora state registrate in uscita, con le sessioni di visita e le sessioni compilate. `peopleIds` (separati da virgole) è obbligatorio; senza di esso restituisce 400. Usato dal check-out per nome di B1Checkin |
| POST | `/` | JWT | Attendance.Edit | Crea o aggiorna visite |
| POST | `/checkin?serviceId=&peopleIds=` | JWT | Attendance.Edit o Attendance.Checkin | Invia i dati di check-in. Crea/aggiorna visite e sessioni di visita, rimuove i record obsoleti |
| DELETE | `/:id` | JWT | Attendance.Edit | Elimina una visita |

### Esempio: flusso di check-in {#example-check-in-flow}

**Passo 1 -- Carica i dati di check-in esistenti:**

```
GET /attendance/visits/checkin?serviceId=svc-001&peopleIds=person-1,person-2
Authorization: Bearer <token>
```

```json
[
  {
    "id": "visit-001",
    "personId": "person-1",
    "visitDate": "2025-01-19T00:00:00.000Z",
    "visitSessions": [
      {
        "id": "vs-001",
        "sessionId": "sess-001",
        "visitId": "visit-001",
        "session": {
          "id": "sess-001",
          "groupId": "group-001",
          "serviceTimeId": "st-001",
          "sessionDate": "2025-01-19T00:00:00.000Z"
        }
      }
    ]
  }
]
```

**Passo 2 -- Invia il check-in:**

```
POST /attendance/visits/checkin?serviceId=svc-001&peopleIds=person-1,person-2
Authorization: Bearer <token>

[
  {
    "personId": "person-1",
    "visitSessions": [
      {
        "session": { "serviceTimeId": "st-001", "groupId": "group-001" }
      }
    ]
  }
]
```

Se un orario di servizio coinvolto ha una pianificazione di check-in e la sua finestra è chiusa (misurata nello stesso ordine di fusi orari, prima il campus, di `checkinOpen`), non viene salvato nulla e la risposta è `409 { "error": "notOpen", "groups": [{ "groupId", "groupName", "reason": "notOpen" }] }`. Anche le violazioni di capienza e di rapporto con i volontari restituiscono 409 (`error: "capacity"` oppure `"ratio"`). Le sessioni che una persona possiede già oggi (reinviate a ogni check-in) saltano il controllo della finestra, così un nucleo familiare può aggiungere un orario di servizio ancora aperto anche se la finestra di uno precedente è già chiusa.

## Sessioni di visita {#visit-sessions}

Percorso base: `/attendance/visitsessions`

Gestisce l'associazione tra visite e sessioni (quale sessione specifica una persona ha frequentato durante una visita). Fornisce anche un endpoint di registrazione rapida e un endpoint di download/esportazione.

| Metodo | Percorso | Autenticazione | Permesso | Descrizione |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | Attendance.View o Group Leader | Elenca le sessioni di visita. Filtra con `?sessionId=`. I leader dei gruppi possono visualizzare le sessioni di visita dei propri gruppi |
| GET | `/:id` | JWT | Attendance.View | Ottiene una sessione di visita tramite ID |
| GET | `/download/:sessionId` | JWT | Attendance.View | Scarica le presenze di una sessione (restituisce i nomi delle persone con lo stato presente/assente) |
| POST | `/` | JWT | Attendance.Edit | Crea o aggiorna sessioni di visita |
| POST | `/log` | JWT | Attendance.Edit o Group Leader | Registrazione rapida della presenza di una persona in una sessione. Crea automaticamente la visita se necessario. I leader dei gruppi possono registrare le presenze per i propri gruppi |
| DELETE | `/:id` | JWT | Attendance.Edit | Elimina una sessione di visita tramite ID |
| DELETE | `/?personId=&sessionId=` | JWT | Attendance.Edit o Group Leader | Rimuove una persona da una sessione. Elimina la sessione di visita e la visita padre se non restano sessioni. I leader dei gruppi possono rimuovere le presenze dei propri gruppi |

### Esempio: registrazione rapida della presenza {#example-quick-log-attendance}

```
POST /attendance/visitsessions/log
Authorization: Bearer <token>

{
  "personId": "person-001",
  "visitSessions": [
    { "sessionId": "sess-001" }
  ]
}
```

```json
{}
```

### Esempio: scaricare le presenze di una sessione {#example-download-session-attendance}

```
GET /attendance/visitsessions/download/sess-001
Authorization: Bearer <token>
```

```json
[
  {
    "id": "vs-001",
    "personId": "person-001",
    "visitId": "visit-001",
    "sessionDate": "2025-01-19T00:00:00.000Z",
    "personName": "John Smith",
    "status": "present"
  },
  {
    "id": "",
    "personId": "person-002",
    "visitId": "",
    "sessionDate": "2025-01-19T00:00:00.000Z",
    "personName": "Jane Doe",
    "status": "absent"
  }
]
```

## Serie di presenze {#streaks}

Percorso base: `/attendance/streaks`

Tiene traccia delle serie di presenze delle singole persone -- settimane consecutive in cui una persona ha partecipato. Utile per metriche di coinvolgimento e meccaniche di gamification.

| Metodo | Percorso | Autenticazione | Permesso | Descrizione |
|--------|------|------|------------|-------------|
| GET | `/person/:personId` | JWT | — | Carica le serie di presenze di una persona |

## Pagine correlate {#related-pages}

- [Endpoint di Membership](./membership.md) — Persone, gruppi, ruoli e gestione della chiesa
- [Autenticazione e permessi](./authentication.md) — Flusso di accesso, JWT, modello dei permessi
- [Struttura del modulo](../module-structure.md) — Schemi di organizzazione del codice
