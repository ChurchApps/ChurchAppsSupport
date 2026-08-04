---
title: "Endpoint Attendance"
---

# Endpoint Attendance

<div class="article-intro">

Il modulo Attendance gestisce le sedi (campus), i servizi, gli orari dei servizi, le sessioni di presenza, le visite e le sessioni di visita. Fornisce l'infrastruttura per tracciare chi ha partecipato a quale servizio o riunione di gruppo, supporta i flussi di check-in e offre report sulle tendenze e sui riepiloghi delle presenze.

</div>

**Percorso base:** `/attendance`

## Campus

Percorso base: `/attendance/campuses`

Controller CRUD standard (estende GenericCrudController). Fornisce le route `getById`, `getAll`, `post` e `delete` tramite la classe base CRUD.

| Metodo | Percorso | Auth | Permesso | Descrizione |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | — | Elenca tutti i campus della chiesa |
| GET | `/:id` | JWT | — | Ottiene un campus per ID |
| POST | `/` | JWT | Services.Edit | Crea o aggiorna i campus |
| DELETE | `/:id` | JWT | Services.Edit | Elimina un campus |

## Services

Percorso base: `/attendance/services`

Estende GenericCrudController con le route CRUD `getById`, `getAll`, `post` e `delete`. Gli endpoint `getAll` (`GET /`) e `search` sono sovrascritti con implementazioni personalizzate.

| Metodo | Percorso | Auth | Permesso | Descrizione |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | — | Elenca tutti i servizi (include le informazioni sul campus) |
| GET | `/:id` | JWT | — | Ottiene un servizio per ID |
| GET | `/search?campusId=` | JWT | — | Cerca i servizi per ID campus |
| POST | `/` | JWT | Services.Edit | Crea o aggiorna i servizi |
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

## Service Times

Percorso base: `/attendance/servicetimes`

Estende GenericCrudController con le route CRUD `getById`, `post` e `delete`. Gli endpoint `getAll` e `search` sono implementazioni personalizzate.

| Metodo | Percorso | Auth | Permesso | Descrizione |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | — | Elenca tutti gli orari dei servizi. Filtra con `?serviceId=`. Aggiungi `?include=groups` per includere i dati dei gruppi |
| GET | `/:id` | JWT | — | Ottiene un orario di servizio per ID |
| GET | `/search?campusId=&serviceId=` | JWT | — | Cerca gli orari dei servizi per campus e servizio |
| GET | `/public/:churchId` | Public | — | Ottiene l'albero campus → servizio → orario per una chiesa. Alimenta l'elemento `serviceTimes` del website builder |
| POST | `/` | JWT | Services.Edit | Crea o aggiorna gli orari dei servizi |
| DELETE | `/:id` | JWT | Services.Edit | Elimina un orario di servizio |

## Group Service Times

Percorso base: `/attendance/groupservicetimes`

Collega i gruppi a specifici orari di servizio.

| Metodo | Percorso | Auth | Permesso | Descrizione |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | — | Elenca tutte le associazioni gruppo-orario di servizio. Filtra con `?groupId=` per ottenere le associazioni con i nomi dei servizi |
| GET | `/:id` | JWT | — | Ottiene un'associazione gruppo-orario di servizio per ID |
| POST | `/` | JWT | Services.Edit | Crea o aggiorna le associazioni gruppo-orario di servizio |
| DELETE | `/:id` | JWT | Services.Edit | Elimina un'associazione gruppo-orario di servizio |

## Attendance Records

Percorso base: `/attendance/attendancerecords`

Fornisce viste aggregate in sola lettura dei dati di presenza per il reporting e la visualizzazione.

| Metodo | Percorso | Auth | Permesso | Descrizione |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | Attendance.View | Carica i record di presenza per una persona. Richiede `?personId=` |
| GET | `/tree` | JWT | — | Carica l'intero albero delle presenze (campus, servizi, orari, gruppi) |
| GET | `/trend?campusId=&serviceId=&serviceTimeId=&groupId=` | JWT | Attendance.View Summary | Carica i dati di tendenza delle presenze con filtri opzionali |
| GET | `/groups?serviceId=&week=` | JWT | Attendance.View | Carica la presenza di gruppo per un servizio in una determinata settimana |
| GET | `/search?campusId=&serviceId=&serviceTimeId=&groupId=&startDate=&endDate=` | JWT | Attendance.View | Cerca i record di presenza con filtri (campus, servizio, orario del servizio, gruppo, intervallo di date) |

### Esempio: tendenza delle presenze

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

## Sessions

Percorso base: `/attendance/sessions`

Estende GenericCrudController con le route CRUD `getById` e `delete`. Gli endpoint `getAll` e `save` sono implementazioni personalizzate che permettono anche ai leader di gruppo di gestire le sessioni per i propri gruppi.

| Metodo | Percorso | Auth | Permesso | Descrizione |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | Attendance.View o Group Leader | Elenca tutte le sessioni. Filtra con `?groupId=` (include i nomi). I leader di gruppo possono visualizzare le sessioni dei propri gruppi |
| GET | `/:id` | JWT | Attendance.View | Ottiene una sessione per ID |
| POST | `/` | JWT | Attendance.Edit o Group Leader | Crea o aggiorna le sessioni. I leader di gruppo possono salvare le sessioni per i propri gruppi |
| DELETE | `/:id` | JWT | Attendance.Edit | Elimina una sessione |

## Visits

Percorso base: `/attendance/visits`

Gestisce i record di visita individuali (una persona che partecipa in una data specifica) e fornisce il flusso di check-in.

| Metodo | Percorso | Auth | Permesso | Descrizione |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | Attendance.View | Elenca tutte le visite. Filtra con `?personId=` |
| GET | `/:id` | JWT | Attendance.View | Ottiene una visita per ID |
| GET | `/checkin?serviceId=&peopleIds=` | JWT | Attendance.View o Attendance.Checkin | Carica i dati di check-in per le persone in un servizio. Restituisce le visite con le sessioni di visita dall'ultima data registrata |
| POST | `/` | JWT | Attendance.Edit | Crea o aggiorna le visite |
| POST | `/checkin?serviceId=&peopleIds=` | JWT | Attendance.Edit o Attendance.Checkin | Invia i dati di check-in. Crea/aggiorna le visite e le sessioni di visita, rimuove i record obsoleti |
| DELETE | `/:id` | JWT | Attendance.Edit | Elimina una visita |

### Esempio: flusso di check-in

**Passo 1 -- Caricare i dati di check-in esistenti:**

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

**Passo 2 -- Inviare il check-in:**

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

## Visit Sessions

Percorso base: `/attendance/visitsessions`

Gestisce l'associazione tra visite e sessioni (a quale sessione specifica una persona ha partecipato durante una visita). Fornisce anche un endpoint di registrazione rapida e un endpoint di download/esportazione.

| Metodo | Percorso | Auth | Permesso | Descrizione |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | Attendance.View o Group Leader | Elenca le sessioni di visita. Filtra con `?sessionId=`. I leader di gruppo possono visualizzare le sessioni di visita dei propri gruppi |
| GET | `/:id` | JWT | Attendance.View | Ottiene una sessione di visita per ID |
| GET | `/download/:sessionId` | JWT | Attendance.View | Scarica le presenze per una sessione (restituisce i nomi delle persone con lo stato presente/assente) |
| POST | `/` | JWT | Attendance.Edit | Crea o aggiorna le sessioni di visita |
| POST | `/log` | JWT | Attendance.Edit o Group Leader | Registra rapidamente la presenza di una persona a una sessione. Crea automaticamente la visita se necessario. I leader di gruppo possono registrare le presenze per i propri gruppi |
| DELETE | `/:id` | JWT | Attendance.Edit | Elimina una sessione di visita per ID |
| DELETE | `/?personId=&sessionId=` | JWT | Attendance.Edit o Group Leader | Rimuove una persona da una sessione. Elimina la sessione di visita e la visita padre se non restano più sessioni. I leader di gruppo possono rimuovere le presenze per i propri gruppi |

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

### Esempio: scaricare la presenza di una sessione

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

## Streaks

Percorso base: `/attendance/streaks`

Traccia le serie di presenze consecutive per i singoli individui -- settimane consecutive in cui una persona ha partecipato. Utile per le metriche di coinvolgimento e la gamification.

| Metodo | Percorso | Auth | Permesso | Descrizione |
|--------|------|------|------------|-------------|
| GET | `/person/:personId` | JWT | — | Carica le serie di presenze per una persona |

## Pagine correlate

- [Endpoint Membership](./membership) — Persone, gruppi, ruoli e gestione della chiesa
- [Autenticazione e permessi](./authentication) — Flusso di login, JWT, modello dei permessi
- [Struttura dei moduli](../module-structure) — Pattern di organizzazione del codice
