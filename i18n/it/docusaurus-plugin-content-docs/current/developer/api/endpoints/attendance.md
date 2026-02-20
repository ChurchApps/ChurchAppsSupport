---
title: "Endpoint Attendance"
---

# Endpoint Attendance

<div class="article-intro">

Il modulo Attendance gestisce le sedi dei campus, i servizi, gli orari dei servizi, le sessioni di presenza, le visite e le sessioni di visita. Fornisce l'infrastruttura per tracciare chi ha partecipato a quale servizio o riunione di gruppo, supporta i flussi di lavoro del check-in e offre report di tendenza e riepilogo delle presenze.

</div>

**Percorso base:** `/attendance`

## Campus

Percorso base: `/attendance/campuses`

Controller CRUD standard (estende GenericCrudController). Fornisce le route `getById`, `getAll`, `post` e `delete` tramite la classe base CRUD.

| Metodo | Percorso | Auth | Permesso | Descrizione |
|--------|----------|------|----------|-------------|
| GET | `/` | JWT | — | Lista tutti i campus della chiesa |
| GET | `/:id` | JWT | — | Ottieni un campus per ID |
| POST | `/` | JWT | Services.Edit | Crea o aggiorna campus |
| DELETE | `/:id` | JWT | Services.Edit | Elimina un campus |

## Servizi

Percorso base: `/attendance/services`

Estende GenericCrudController con route CRUD `getById`, `getAll`, `post` e `delete`. Gli endpoint `getAll` (`GET /`) e `search` sono sovrascritti con implementazioni personalizzate.

| Metodo | Percorso | Auth | Permesso | Descrizione |
|--------|----------|------|----------|-------------|
| GET | `/` | JWT | — | Lista tutti i servizi (include info campus) |
| GET | `/:id` | JWT | — | Ottieni un servizio per ID |
| GET | `/search?campusId=` | JWT | — | Cerca servizi per ID campus |
| POST | `/` | JWT | Services.Edit | Crea o aggiorna servizi |
| DELETE | `/:id` | JWT | Services.Edit | Elimina un servizio |

### Esempio: Cerca Servizi per Campus

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

## Orari dei Servizi

Percorso base: `/attendance/servicetimes`

Estende GenericCrudController con route CRUD `getById`, `post` e `delete`. Gli endpoint `getAll` e `search` sono implementazioni personalizzate.

| Metodo | Percorso | Auth | Permesso | Descrizione |
|--------|----------|------|----------|-------------|
| GET | `/` | JWT | — | Lista tutti gli orari dei servizi. Filtra per `?serviceId=`. Aggiungi `?include=groups` per appendere i dati dei gruppi |
| GET | `/:id` | JWT | — | Ottieni un orario servizio per ID |
| GET | `/search?campusId=&serviceId=` | JWT | — | Cerca orari servizio per campus e servizio |
| POST | `/` | JWT | Services.Edit | Crea o aggiorna orari dei servizi |
| DELETE | `/:id` | JWT | Services.Edit | Elimina un orario servizio |

## Orari Servizio dei Gruppi

Percorso base: `/attendance/groupservicetimes`

Collega i gruppi a specifici orari di servizio.

| Metodo | Percorso | Auth | Permesso | Descrizione |
|--------|----------|------|----------|-------------|
| GET | `/` | JWT | — | Lista tutte le associazioni gruppo-orario servizio. Filtra per `?groupId=` per ottenere le associazioni con i nomi dei servizi |
| GET | `/:id` | JWT | — | Ottieni un'associazione gruppo-orario servizio per ID |
| POST | `/` | JWT | Services.Edit | Crea o aggiorna associazioni gruppo-orario servizio |
| DELETE | `/:id` | JWT | Services.Edit | Elimina un'associazione gruppo-orario servizio |

## Registrazioni Presenze

Percorso base: `/attendance/attendancerecords`

Fornisce viste aggregate di sola lettura dei dati di presenza per reporting e visualizzazione.

| Metodo | Percorso | Auth | Permesso | Descrizione |
|--------|----------|------|----------|-------------|
| GET | `/` | JWT | Attendance.View | Carica registrazioni presenze per una persona. Richiede `?personId=` |
| GET | `/tree` | JWT | — | Carica l'albero completo delle presenze (campus, servizi, orari servizio, gruppi) |
| GET | `/trend?campusId=&serviceId=&serviceTimeId=&groupId=` | JWT | Attendance.View Summary | Carica dati di tendenza presenze con filtri opzionali |
| GET | `/groups?serviceId=&week=` | JWT | Attendance.View | Carica presenze dei gruppi per un servizio in una data settimana |
| GET | `/search?campusId=&serviceId=&serviceTimeId=&groupId=&startDate=&endDate=` | JWT | Attendance.View | Cerca registrazioni presenze con filtri (campus, servizio, orario servizio, gruppo, intervallo date) |

### Esempio: Tendenza Presenze

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

Estende GenericCrudController con route CRUD `getById` e `delete`. Gli endpoint `getAll` e `save` sono implementazioni personalizzate che permettono anche ai leader di gruppo di gestire le sessioni per i propri gruppi.

| Metodo | Percorso | Auth | Permesso | Descrizione |
|--------|----------|------|----------|-------------|
| GET | `/` | JWT | Attendance.View o Leader di Gruppo | Lista tutte le sessioni. Filtra per `?groupId=` (include nomi). I leader di gruppo possono visualizzare le sessioni dei propri gruppi |
| GET | `/:id` | JWT | Attendance.View | Ottieni una sessione per ID |
| POST | `/` | JWT | Attendance.Edit o Leader di Gruppo | Crea o aggiorna sessioni. I leader di gruppo possono salvare sessioni per i propri gruppi |
| DELETE | `/:id` | JWT | Attendance.Edit | Elimina una sessione |

## Visite

Percorso base: `/attendance/visits`

Gestisce le registrazioni individuali delle visite (una persona che partecipa in una data specifica) e fornisce il flusso di lavoro del check-in.

| Metodo | Percorso | Auth | Permesso | Descrizione |
|--------|----------|------|----------|-------------|
| GET | `/` | JWT | Attendance.View | Lista tutte le visite. Filtra per `?personId=` |
| GET | `/:id` | JWT | Attendance.View | Ottieni una visita per ID |
| GET | `/checkin?serviceId=&peopleIds=` | JWT | Attendance.View o Attendance.Checkin | Carica dati di check-in per persone a un servizio. Restituisce visite con sessioni di visita dall'ultima data registrata |
| POST | `/` | JWT | Attendance.Edit | Crea o aggiorna visite |
| POST | `/checkin?serviceId=&peopleIds=` | JWT | Attendance.Edit o Attendance.Checkin | Invia dati di check-in. Crea/aggiorna visite e sessioni di visita, rimuove i record obsoleti |
| DELETE | `/:id` | JWT | Attendance.Edit | Elimina una visita |

### Esempio: Flusso di Check-in

**Passo 1 -- Carica dati di check-in esistenti:**

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

**Passo 2 -- Invia check-in:**

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

## Sessioni di Visita

Percorso base: `/attendance/visitsessions`

Gestisce l'associazione tra visite e sessioni (a quale sessione specifica una persona ha partecipato durante una visita). Fornisce anche un endpoint di registrazione rapida e un endpoint di download/esportazione.

| Metodo | Percorso | Auth | Permesso | Descrizione |
|--------|----------|------|----------|-------------|
| GET | `/` | JWT | Attendance.View o Leader di Gruppo | Lista sessioni di visita. Filtra per `?sessionId=`. I leader di gruppo possono visualizzare le sessioni di visita per i propri gruppi |
| GET | `/:id` | JWT | Attendance.View | Ottieni una sessione di visita per ID |
| GET | `/download/:sessionId` | JWT | Attendance.View | Scarica le presenze per una sessione (restituisce nomi persone con stato presente/assente) |
| POST | `/` | JWT | Attendance.Edit | Crea o aggiorna sessioni di visita |
| POST | `/log` | JWT | Attendance.Edit o Leader di Gruppo | Registra rapidamente la presenza di una persona a una sessione. Crea automaticamente la visita se necessario. I leader di gruppo possono registrare le presenze per i propri gruppi |
| DELETE | `/:id` | JWT | Attendance.Edit | Elimina una sessione di visita per ID |
| DELETE | `/?personId=&sessionId=` | JWT | Attendance.Edit o Leader di Gruppo | Rimuovi una persona da una sessione. Elimina la sessione di visita e la visita padre se non rimangono sessioni. I leader di gruppo possono rimuovere le presenze per i propri gruppi |

### Esempio: Registrazione Rapida Presenze

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

### Esempio: Download Presenze della Sessione

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

## Pagine Correlate

- [Endpoint Membership](./membership) — Persone, gruppi, ruoli e gestione della chiesa
- [Autenticazione e Permessi](./authentication) — Flusso di login, JWT, modello dei permessi
- [Struttura dei Moduli](../module-structure) — Pattern di organizzazione del codice
