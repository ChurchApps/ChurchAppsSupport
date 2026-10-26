---
title: "Endpoint di Presenze"
---

# Endpoint di Presenze

<div class="article-intro">

Il modulo Presenze gestisce le sedi dei campus, i servizi, gli orari dei servizi, le sessioni di presenza, le visite e le sessioni di visita. Fornisce l'infrastruttura per tenere traccia di chi ha partecipato a quale servizio o riunione di gruppo, supporta i flussi di check-in e offre report su andamento e riepiloghi delle presenze.

</div>

**Percorso base:** `/attendance`

## Campus

Percorso base: `/attendance/campuses`

Controller CRUD standard (estende GenericCrudController). Fornisce le route `getById`, `getAll`, `post` e `delete` tramite la classe base CRUD.

| Metodo | Percorso | Autenticazione | Permesso | Descrizione |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | — | Elenca tutti i campus della chiesa |
| GET | `/:id` | JWT | — | Ottiene un campus tramite ID |
| POST | `/` | JWT | Services.Edit | Crea o aggiorna campus |
| DELETE | `/:id` | JWT | Services.Edit | Elimina un campus |

## Servizi

Percorso base: `/attendance/services`

Estende GenericCrudController con le route CRUD `getById`, `getAll`, `post` e `delete`. Gli endpoint `getAll` (`GET /`) e `search` sono sovrascritti con implementazioni personalizzate.

| Metodo | Percorso | Autenticazione | Permesso | Descrizione |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | — | Elenca tutti i servizi (include le informazioni del campus) |
| GET | `/:id` | JWT | — | Ottiene un servizio tramite ID |
| GET | `/search?campusId=` | JWT | — | Cerca servizi tramite ID del campus |
| POST | `/` | JWT | Services.Edit | Crea o aggiorna servizi |
| DELETE | `/:id` | JWT | Services.Edit | Elimina un servizio |

### Esempio: cercare servizi per campus

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

## Orari dei servizi

Percorso base: `/attendance/servicetimes`

Estende GenericCrudController con le route CRUD `getById`, `post` e `delete`. Gli endpoint `getAll` e `search` sono implementazioni personalizzate.

| Metodo | Percorso | Autenticazione | Permesso | Descrizione |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | — | Elenca tutti gli orari dei servizi. Filtra con `?serviceId=`. Aggiungi `?include=groups` per includere i dati dei gruppi. Ogni riga include un booleano calcolato `checkinOpen` (falso solo quando l'orario del servizio ha una pianificazione di check-in la cui finestra è chiusa in questo momento). La finestra è misurata nel fuso orario del campus del servizio, poi nel fuso orario della chiesa, poi nel primo campus che ne ha uno, infine `America/New_York` |
| GET | `/:id` | JWT | — | Ottiene un orario di servizio tramite ID |
| GET | `/search?campusId=&serviceId=` | JWT | — | Cerca orari di servizio per campus e servizio |
| GET | `/public/:churchId` | Pubblico | — | Ottiene l'albero campus → servizio → orario per una chiesa. Alimenta l'elemento `serviceTimes` del website builder |
| POST | `/` | JWT | Services.Edit | Crea o aggiorna orari di servizio. Campi di pianificazione facoltativi: `dayOfWeek` (0 = domenica … 6), `startTime` / `endTime` (`HH:mm`), `checkinOpenMinutes` (prima dell'inizio), `checkinCloseMinutes` (dopo la fine). Il check-in è limitato da orario solo quando sono impostati sia `dayOfWeek` sia `startTime` |
| DELETE | `/:id` | JWT | Services.Edit | Elimina un orario di servizio |

## Orari di servizio dei gruppi

Percorso base: `/attendance/groupservicetimes`

Collega i gruppi a specifici orari di servizio.

| Metodo | Percorso | Autenticazione | Permesso | Descrizione |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | — | Elenca tutte le associazioni gruppo-orario di servizio. Filtra con `?groupId=` per ottenere le associazioni con i nomi dei servizi |
| GET | `/:id` | JWT | — | Ottiene un'associazione gruppo-orario di servizio tramite ID |
| POST | `/` | JWT | Services.Edit | Crea o aggiorna associazioni gruppo-orario di servizio |
| DELETE | `/:id` | JWT | Services.Edit | Elimina un'associazione gruppo-orario di servizio |

## Record di presenza

Percorso base: `/attendance/attendancerecords`

Fornisce viste aggregate di sola lettura dei dati di presenza per report e visualizzazione.

| Metodo | Percorso | Autenticazione | Permesso | Descrizione |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | Attendance.View | Carica i record di presenza di una persona. Richiede `?personId=` |
| GET | `/my` | JWT | — | Limitato all'utente: i record di presenza del membro autenticato degli ultimi 12 mesi, dal più recente. Restituisce `401` se l'utente non è collegato a una persona. Alimenta la sezione **My Attendance** della pagina B1 Me |
| GET | `/tree` | JWT | — | Carica l'albero completo delle presenze (campus, servizi, orari di servizio, gruppi) |
| GET | `/trend?campusId=&serviceId=&serviceTimeId=&groupId=` | JWT | Attendance.View Summary | Carica i dati di andamento delle presenze con filtri facoltativi |
| GET | `/groups?serviceId=&week=` | JWT | Attendance.View | Carica le presenze dei gruppi per un servizio in una data settimana |
| GET | `/sessionStatus?serviceTimeId=&date=` | JWT | Attendance.View | Per ogni gruppo assegnato all'orario di servizio, restituisce `{ groupId, sessionId, attendanceCount }` per quella data (`date` è `YYYY-MM-DD`; `sessionId` è null quando il gruppo non ha una sessione). Alimenta la finestra **Who Still Needs Attendance** di B1Admin |
| GET | `/search?campusId=&serviceId=&serviceTimeId=&groupId=&startDate=&endDate=` | JWT | Attendance.View | Cerca record di presenza con filtri (campus, servizio, orario di servizio, gruppo, intervallo di date) |

### Esempio: andamento delle presenze

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

## Sessioni

Percorso base: `/attendance/sessions`

Estende GenericCrudController con le route CRUD `getById` e `delete`. Gli endpoint `getAll` e `save` sono implementazioni personalizzate che consentono anche ai leader di gruppo di gestire le sessioni dei propri gruppi.

| Metodo | Percorso | Autenticazione | Permesso | Descrizione |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | Attendance.View o Group Leader | Elenca tutte le sessioni. Filtra con `?groupId=` (include i nomi). I leader di gruppo possono visualizzare le sessioni dei propri gruppi |
| GET | `/:id` | JWT | Attendance.View | Ottiene una sessione tramite ID |
| POST | `/` | JWT | Attendance.Edit o Group Leader | Crea o aggiorna sessioni. I leader di gruppo possono salvare le sessioni dei propri gruppi |
| DELETE | `/:id` | JWT | Attendance.Edit | Elimina una sessione |

## Visite

Percorso base: `/attendance/visits`

Gestisce i singoli record di visita (una persona che partecipa in una data specifica) e fornisce il flusso di check-in.

| Metodo | Percorso | Autenticazione | Permesso | Descrizione |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | Attendance.View | Elenca tutte le visite. Filtra con `?personId=` |
| GET | `/:id` | JWT | Attendance.View | Ottiene una visita tramite ID |
| GET | `/checkin?serviceId=&peopleIds=` | JWT | Attendance.View o Attendance.Checkin | Carica i dati di check-in delle persone per un servizio. Restituisce le visite con le sessioni di visita dell'ultima data registrata |
| POST | `/` | JWT | Attendance.Edit | Crea o aggiorna visite |
| POST | `/checkin?serviceId=&peopleIds=` | JWT | Attendance.Edit o Attendance.Checkin | Invia i dati di check-in. Crea/aggiorna visite e sessioni di visita, rimuove i record obsoleti |
| DELETE | `/:id` | JWT | Attendance.Edit | Elimina una visita |

### Esempio: flusso di check-in

**Passaggio 1 -- Carica i dati di check-in esistenti:**

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

**Passaggio 2 -- Invia il check-in:**

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

Se un orario di servizio di destinazione ha una pianificazione di check-in e la sua finestra è chiusa (misurata nello stesso ordine di fusi orari che privilegia il campus usato per `checkinOpen`), non viene salvato nulla e la risposta è `409 { "error": "notOpen", "groups": [{ "groupId", "groupName", "reason": "notOpen" }] }`. Anche le violazioni di capienza e di rapporto volontari restituiscono 409 (`error: "capacity"` o `"ratio"`). Le sessioni che una persona ha già oggi (reinviate con ogni check-in) saltano il controllo della finestra, così un nucleo familiare può aggiungere un orario di servizio aperto dopo che la finestra di uno precedente si è chiusa.

## Sessioni di visita

Percorso base: `/attendance/visitsessions`

Gestisce l'associazione tra visite e sessioni (a quale sessione specifica una persona ha partecipato durante una visita). Fornisce inoltre un endpoint di registrazione rapida e un endpoint di download/esportazione.

| Metodo | Percorso | Autenticazione | Permesso | Descrizione |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | Attendance.View o Group Leader | Elenca le sessioni di visita. Filtra con `?sessionId=`. I leader di gruppo possono visualizzare le sessioni di visita dei propri gruppi |
| GET | `/:id` | JWT | Attendance.View | Ottiene una sessione di visita tramite ID |
| GET | `/download/:sessionId` | JWT | Attendance.View | Scarica le presenze di una sessione (restituisce i nomi delle persone con lo stato presente/assente) |
| POST | `/` | JWT | Attendance.Edit | Crea o aggiorna sessioni di visita |
| POST | `/log` | JWT | Attendance.Edit o Group Leader | Registra rapidamente la presenza di una persona in una sessione. Crea automaticamente la visita se necessario. I leader di gruppo possono registrare le presenze dei propri gruppi |
| DELETE | `/:id` | JWT | Attendance.Edit | Elimina una sessione di visita tramite ID |
| DELETE | `/?personId=&sessionId=` | JWT | Attendance.Edit o Group Leader | Rimuove una persona da una sessione. Elimina la sessione di visita e la visita padre se non restano sessioni. I leader di gruppo possono rimuovere le presenze dei propri gruppi |

### Esempio: registrazione rapida della presenza

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

### Esempio: scaricare le presenze di una sessione

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

## Serie di presenze

Percorso base: `/attendance/streaks`

Tiene traccia delle serie di presenze delle singole persone, ovvero le settimane consecutive in cui una persona ha partecipato. Utile per metriche di coinvolgimento e gamification.

| Metodo | Percorso | Autenticazione | Permesso | Descrizione |
|--------|------|------|------------|-------------|
| GET | `/person/:personId` | JWT | — | Carica le serie di presenze di una persona |

## Pagine correlate

- [Endpoint di Membership](./membership) — Persone, gruppi, ruoli e gestione della chiesa
- [Autenticazione e permessi](./authentication) — Flusso di accesso, JWT, modello dei permessi
- [Struttura del modulo](../module-structure) — Schemi di organizzazione del codice
