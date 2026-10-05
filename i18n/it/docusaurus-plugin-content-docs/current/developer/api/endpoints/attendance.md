---
title: "Endpoint Presenze"
---

# Endpoint Presenze

<div class="article-intro">

Il modulo Presenze gestisce le sedi, i servizi, gli orari di servizio, le sessioni di presenze, le visite e le sessioni di visita. Fornisce l'infrastruttura per tracciare chi ha partecipato a quale servizio o riunione di gruppo, supporta i flussi di lavoro di check-in e offre il reporting di tendenze e riepilogate delle presenze.

</div>

**Percorso base:** `/attendance`

## Sedi

Percorso base: `/attendance/campuses`

Controller CRUD standard (estende GenericCrudController). Fornisce i percorsi `getById`, `getAll`, `post` e `delete` tramite la classe base CRUD.

| Method | Path | Auth | Permission | Description |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | — | Elenca tutte le sedi della chiesa |
| GET | `/:id` | JWT | — | Ottieni una sede per ID |
| POST | `/` | JWT | Services.Edit | Crea o aggiorna sedi |
| DELETE | `/:id` | JWT | Services.Edit | Elimina una sede |

## Servizi

Percorso base: `/attendance/services`

Estende GenericCrudController con percorsi CRUD `getById`, `getAll`, `post` e `delete`. Gli endpoint `getAll` (`GET /`) e `search` sono sovrascritti con implementazioni personalizzate.

| Method | Path | Auth | Permission | Description |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | — | Elenca tutti i servizi (include informazioni sulla sede) |
| GET | `/:id` | JWT | — | Ottieni un servizio per ID |
| GET | `/search?campusId=` | JWT | — | Cerca servizi per ID sede |
| POST | `/` | JWT | Services.Edit | Crea o aggiorna servizi |
| DELETE | `/:id` | JWT | Services.Edit | Elimina un servizio |

### Esempio: Cerca Servizi per Sede

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

## Orari di Servizio

Percorso base: `/attendance/servicetimes`

Estende GenericCrudController con percorsi CRUD `getById`, `post` e `delete`. Gli endpoint `getAll` e `search` sono implementazioni personalizzate.

| Method | Path | Auth | Permission | Description |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | — | Elenca tutti gli orari di servizio. Filtra per `?serviceId=`. Aggiungi `?include=groups` per aggiungere dati di gruppo |
| GET | `/:id` | JWT | — | Ottieni un orario di servizio per ID |
| GET | `/search?campusId=&serviceId=` | JWT | — | Cerca orari di servizio per sede e servizio |
| GET | `/public/:churchId` | Public | — | Ottieni l'albero sede → servizio → orario per una chiesa. Alimenta l'elemento `serviceTimes` del generatore di siti web |
| POST | `/` | JWT | Services.Edit | Crea o aggiorna orari di servizio |
| DELETE | `/:id` | JWT | Services.Edit | Elimina un orario di servizio |

## Orari di Servizio del Gruppo

Percorso base: `/attendance/groupservicetimes`

Collega i gruppi a orari di servizio specifici.

| Method | Path | Auth | Permission | Description |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | — | Elenca tutte le associazioni gruppo-ora-servizio. Filtra per `?groupId=` per ottenere associazioni con nomi di servizio |
| GET | `/:id` | JWT | — | Ottieni un'associazione gruppo-ora-servizio per ID |
| POST | `/` | JWT | Services.Edit | Crea o aggiorna associazioni gruppo-ora-servizio |
| DELETE | `/:id` | JWT | Services.Edit | Elimina un'associazione gruppo-ora-servizio |

## Registri di Presenze

Percorso base: `/attendance/attendancerecords`

Fornisce viste aggregate di sola lettura dei dati delle presenze per il reporting e la visualizzazione.

| Method | Path | Auth | Permission | Description |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | Attendance.View | Carica i registri di presenze per una persona. Richiede `?personId=` |
| GET | `/tree` | JWT | — | Carica l'albero completo delle presenze (sedi, servizi, orari di servizio, gruppi) |
| GET | `/trend?campusId=&serviceId=&serviceTimeId=&groupId=` | JWT | Attendance.View Summary | Carica i dati della tendenza delle presenze con filtri facoltativi |
| GET | `/groups?serviceId=&week=` | JWT | Attendance.View | Carica le presenze del gruppo per un servizio in una data settimana |
| GET | `/sessionStatus?serviceTimeId=&date=` | JWT | Attendance.View | Per ogni gruppo assegnato all'orario di servizio, restituisci `{ groupId, sessionId, attendanceCount }` per quella data (`date` è `YYYY-MM-DD`; `sessionId` è null quando il gruppo non ha una sessione). Sostiene la finestra di dialogo **Chi Ancora Necessita di Presenze** di B1Admin |
| GET | `/search?campusId=&serviceId=&serviceTimeId=&groupId=&startDate=&endDate=` | JWT | Attendance.View | Cerca i registri di presenze con filtri (sede, servizio, orario di servizio, gruppo, intervallo di date) |

### Esempio: Tendenza di Presenze

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

Estende GenericCrudController con percorsi CRUD `getById` e `delete`. Gli endpoint `getAll` e `save` sono implementazioni personalizzate che consentono anche ai leader del gruppo di gestire le sessioni per i loro gruppi.

| Method | Path | Auth | Permission | Description |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | Attendance.View or Group Leader | Elenca tutte le sessioni. Filtra per `?groupId=` (include nomi). I leader del gruppo possono visualizzare le sessioni per i loro gruppi |
| GET | `/:id` | JWT | Attendance.View | Ottieni una sessione per ID |
| POST | `/` | JWT | Attendance.Edit or Group Leader | Crea o aggiorna sessioni. I leader del gruppo possono salvare le sessioni per i loro gruppi |
| DELETE | `/:id` | JWT | Attendance.Edit | Elimina una sessione |

## Visite

Percorso base: `/attendance/visits`

Gestisce i record di visita individuali (una persona che frequenta in una data specifica) e fornisce il flusso di lavoro di check-in.

| Method | Path | Auth | Permission | Description |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | Attendance.View | Elenca tutte le visite. Filtra per `?personId=` |
| GET | `/:id` | JWT | Attendance.View | Ottieni una visita per ID |
| GET | `/checkin?serviceId=&peopleIds=` | JWT | Attendance.View or Attendance.Checkin | Carica i dati di check-in per le persone a un servizio. Restituisce le visite con le sessioni di visita dall'ultima data registrata |
| POST | `/` | JWT | Attendance.Edit | Crea o aggiorna visite |
| POST | `/checkin?serviceId=&peopleIds=` | JWT | Attendance.Edit or Attendance.Checkin | Invia i dati di check-in. Crea/aggiorna visite e sessioni di visita, rimuove i record non aggiornati |
| DELETE | `/:id` | JWT | Attendance.Edit | Elimina una visita |

### Esempio: Flusso di Check-In

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

## Sessioni di Visita

Percorso base: `/attendance/visitsessions`

Gestisce l'associazione tra visite e sessioni (quale sessione specifica una persona ha frequentato durante una visita). Fornisce anche un endpoint di registro rapido e un endpoint di download/esportazione.

| Method | Path | Auth | Permission | Description |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | Attendance.View or Group Leader | Elenca le sessioni di visita. Filtra per `?sessionId=`. I leader del gruppo possono visualizzare le sessioni di visita per i loro gruppi |
| GET | `/:id` | JWT | Attendance.View | Ottieni una sessione di visita per ID |
| GET | `/download/:sessionId` | JWT | Attendance.View | Scarica le presenze per una sessione (restituisce nomi delle persone con stato presente/assente) |
| POST | `/` | JWT | Attendance.Edit | Crea o aggiorna sessioni di visita |
| POST | `/log` | JWT | Attendance.Edit or Group Leader | Registra rapidamente la presenza di una persona a una sessione. Crea automaticamente una visita se necessario. I leader del gruppo possono registrare le presenze per i loro gruppi |
| DELETE | `/:id` | JWT | Attendance.Edit | Elimina una sessione di visita per ID |
| DELETE | `/?personId=&sessionId=` | JWT | Attendance.Edit or Group Leader | Rimuovi una persona da una sessione. Elimina la sessione di visita e la visita padre se non rimangono sessioni. I leader del gruppo possono rimuovere le presenze per i loro gruppi |

### Esempio: Registrazione Rapida di Presenze

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

### Esempio: Scarica le Presenze della Sessione

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

## Sequenze

Percorso base: `/attendance/streaks`

Traccia le sequenze di presenze per gli individui -- settimane consecutive in cui una persona ha frequentato. Utile per le metriche di coinvolgimento e la gamificazione.

| Method | Path | Auth | Permission | Description |
|--------|------|------|------------|-------------|
| GET | `/person/:personId` | JWT | — | Carica le sequenze di presenze per una persona |

## Pagine Correlate

- [Endpoint di Iscrizione](./membership) — Persone, gruppi, ruoli e gestione della chiesa
- [Autenticazione e Autorizzazioni](./authentication) — Flusso di accesso, JWT, modello di autorizzazione
- [Struttura dei Moduli](../module-structure) — Modelli di organizzazione del codice
