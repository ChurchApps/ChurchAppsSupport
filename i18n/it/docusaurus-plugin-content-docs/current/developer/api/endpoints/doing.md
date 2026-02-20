---
title: "Endpoint Doing"
---

# Endpoint Doing

<div class="article-intro">

Il modulo Doing gestisce la pianificazione dei servizi, la programmazione dei volontari, la gestione delle attività e le automazioni. Fornisce strumenti per creare piani di servizio con orari e posizioni, assegnare volontari, gestire le date di indisponibilità, costruire elementi dell'ordine del servizio, collegarsi a fornitori di contenuti esterni e configurare flussi di lavoro automatizzati con condizioni e azioni.

</div>

**Percorso base:** `/doing`

## Piani

Percorso base: `/doing/plans`

| Metodo | Percorso | Auth | Permesso | Descrizione |
|--------|----------|------|----------|-------------|
| GET | `/` | JWT | — | Elenca tutti i piani per la chiesa |
| GET | `/:id` | JWT | — | Ottieni un piano per ID |
| GET | `/ids?ids=` | JWT | — | Ottieni più piani per ID separati da virgola |
| GET | `/types/:planTypeId` | JWT | — | Ottieni i piani per tipo di piano |
| GET | `/presenter` | JWT | — | Ottieni i piani per i prossimi 7 giorni (vista presentatore) |
| GET | `/public/current/:planTypeId` | Pubblico | — | Ottieni il piano corrente per un tipo di piano |
| POST | `/` | JWT | — | Crea o aggiorna piani (accetta oggetto singolo o array) |
| POST | `/copy/:id` | JWT | — | Copia un piano includendo posizioni, orari, assegnazioni ed elementi dell'ordine del servizio. Il body include `copyMode` ("none", "positions", "all") e `copyServiceOrder` (booleano) |
| POST | `/autofill/:id` | JWT | — | Compila automaticamente le assegnazioni dei volontari per un piano. Body: `{ teams: [{ positionId, personIds }] }` |
| DELETE | `/:id` | JWT | — | Elimina un piano e tutti gli orari, assegnazioni, posizioni ed elementi correlati |

### Esempio: Copia un Piano

```
POST /doing/plans/copy/abc-123
Authorization: Bearer <token>

{
  "serviceDate": "2026-03-01T10:00:00.000Z",
  "copyMode": "all",
  "copyServiceOrder": true
}
```

```json
{
  "id": "def-456",
  "churchId": "church-1",
  "serviceDate": "2026-03-01T10:00:00.000Z"
}
```

## Tipi di Piano

Percorso base: `/doing/planTypes`

Estende la classe base CRUD (GET `/`, GET `/:id`, POST `/`, DELETE `/:id` — nessun controllo dei permessi).

| Metodo | Percorso | Auth | Permesso | Descrizione |
|--------|----------|------|----------|-------------|
| GET | `/` | JWT | — | Elenca tutti i tipi di piano |
| GET | `/:id` | JWT | — | Ottieni un tipo di piano per ID |
| GET | `/ids?ids=` | JWT | — | Ottieni più tipi di piano per ID separati da virgola |
| GET | `/ministryId/:ministryId` | JWT | — | Ottieni i tipi di piano per un ministero |
| POST | `/` | JWT | — | Crea o aggiorna tipi di piano |
| DELETE | `/:id` | JWT | — | Elimina un tipo di piano |

## Elementi del Piano

Percorso base: `/doing/planItems`

Gestisce gli elementi dell'ordine del servizio (intestazioni, sezioni, canti, ecc.) organizzati in una struttura ad albero padre-figlio.

| Metodo | Percorso | Auth | Permesso | Descrizione |
|--------|----------|------|----------|-------------|
| GET | `/:id` | JWT | — | Ottieni un elemento del piano per ID |
| GET | `/ids?ids=` | JWT | — | Ottieni più elementi del piano per ID separati da virgola |
| GET | `/plan/:planId` | JWT | — | Ottieni tutti gli elementi del piano per un piano (restituisce struttura ad albero) |
| GET | `/presenter/:churchId/:planId` | Pubblico | — | Ottieni gli elementi del piano per la vista presentatore (restituisce struttura ad albero) |
| POST | `/` | JWT | — | Crea o aggiorna elementi del piano |
| POST | `/sort` | JWT | — | Aggiorna l'ordine di ordinamento per un elemento del piano (riordina i fratelli) |
| DELETE | `/:id` | JWT | — | Elimina un elemento del piano |

## Feed del Piano

Percorso base: `/doing/planFeed`

Fornisce i feed degli elementi del piano per il presentatore. Se non esistono elementi del piano, popola automaticamente dal feed della sede Lessons.church utilizzando il `contentId` del piano.

| Metodo | Percorso | Auth | Permesso | Descrizione |
|--------|----------|------|----------|-------------|
| GET | `/presenter/:churchId/:planId` | Pubblico | — | Ottieni il feed del piano per il presentatore (popola automaticamente dal feed della sede se vuoto) |

## Posizioni

Percorso base: `/doing/positions`

Estende la classe base CRUD (GET `/:id`, POST `/`, DELETE `/:id` — nessun controllo dei permessi).

| Metodo | Percorso | Auth | Permesso | Descrizione |
|--------|----------|------|----------|-------------|
| GET | `/:id` | JWT | — | Ottieni una posizione per ID |
| GET | `/ids?ids=` | JWT | — | Ottieni più posizioni per ID separati da virgola |
| GET | `/plan/ids?planIds=` | JWT | — | Ottieni le posizioni per più piani per ID piano separati da virgola |
| GET | `/plan/:planId` | JWT | — | Ottieni tutte le posizioni per un piano |
| POST | `/` | JWT | — | Crea o aggiorna posizioni |
| DELETE | `/:id` | JWT | — | Elimina una posizione |

## Orari

Percorso base: `/doing/times`

| Metodo | Percorso | Auth | Permesso | Descrizione |
|--------|----------|------|----------|-------------|
| GET | `/all` | JWT | — | Elenca tutti gli orari per la chiesa |
| GET | `/:id` | JWT | — | Ottieni un orario per ID |
| GET | `/plans?planIds=` | JWT | — | Ottieni gli orari per più piani per ID piano separati da virgola |
| GET | `/plan/:planId` | JWT | — | Ottieni tutti gli orari per un piano |
| POST | `/` | JWT | — | Crea o aggiorna orari |
| DELETE | `/:id` | JWT | — | Elimina un orario |

## Assegnazioni

Percorso base: `/doing/assignments`

| Metodo | Percorso | Auth | Permesso | Descrizione |
|--------|----------|------|----------|-------------|
| GET | `/my` | JWT | — | Ottieni le assegnazioni per l'utente corrente |
| GET | `/:id` | JWT | — | Ottieni un'assegnazione per ID |
| GET | `/plan/ids?planIds=` | JWT | — | Ottieni le assegnazioni per più piani per ID piano separati da virgola |
| GET | `/plan/:planId` | JWT | — | Ottieni tutte le assegnazioni per un piano |
| POST | `/` | JWT | — | Crea o aggiorna assegnazioni (lo stato predefinito è "Non confermato") |
| POST | `/accept/:id` | JWT | — | Accetta un'assegnazione (deve essere la persona assegnata) |
| POST | `/decline/:id` | JWT | — | Rifiuta un'assegnazione (deve essere la persona assegnata) |
| DELETE | `/:id` | JWT | — | Elimina un'assegnazione |

### Esempio: Accetta un'Assegnazione

```
POST /doing/assignments/accept/assign-123
Authorization: Bearer <token>
```

```json
{
  "id": "assign-123",
  "personId": "person-456",
  "positionId": "pos-789",
  "planId": "plan-abc",
  "status": "Accepted"
}
```

## Date di Indisponibilità

Percorso base: `/doing/blockoutDates`

Estende la classe base CRUD (GET `/:id`, DELETE `/:id` — nessun controllo dei permessi).

| Metodo | Percorso | Auth | Permesso | Descrizione |
|--------|----------|------|----------|-------------|
| GET | `/:id` | JWT | — | Ottieni una data di indisponibilità per ID |
| GET | `/ids?ids=` | JWT | — | Ottieni più date di indisponibilità per ID separati da virgola |
| GET | `/my` | JWT | — | Ottieni le date di indisponibilità per l'utente corrente |
| GET | `/upcoming` | JWT | — | Ottieni tutte le prossime date di indisponibilità per la chiesa |
| POST | `/` | JWT | — | Crea o aggiorna date di indisponibilità (imposta personId sull'utente corrente se non fornito) |
| DELETE | `/:id` | JWT | — | Elimina una data di indisponibilità |

## Attività

Percorso base: `/doing/tasks`

| Metodo | Percorso | Auth | Permesso | Descrizione |
|--------|----------|------|----------|-------------|
| GET | `/` | JWT | — | Ottieni le attività aperte per l'utente corrente |
| GET | `/:id` | JWT | — | Ottieni un'attività per ID |
| GET | `/closed` | JWT | — | Ottieni le attività chiuse per l'utente corrente |
| GET | `/timeline?taskIds=` | JWT | — | Ottieni i dati della timeline per le attività per ID attività separati da virgola |
| GET | `/directoryUpdate/:personId` | JWT | — | Ottieni l'attività di aggiornamento directory per una persona |
| POST | `/` | JWT | — | Crea o aggiorna attività. Aggiungi `?type=directoryUpdate` per gestire le attività di aggiornamento directory (carica automaticamente le foto) |
| POST | `/loadForGroups` | JWT | — | Carica le attività per gruppi specifici. Body: `{ groupIds: [], status: "Open" }` |

## Automazioni

Percorso base: `/doing/automations`

| Metodo | Percorso | Auth | Permesso | Descrizione |
|--------|----------|------|----------|-------------|
| GET | `/` | JWT | — | Elenca tutte le automazioni per la chiesa |
| GET | `/:id` | JWT | — | Ottieni un'automazione per ID |
| GET | `/check` | Pubblico | — | Attiva un controllo di tutte le automazioni |
| POST | `/` | JWT | — | Crea o aggiorna automazioni |
| DELETE | `/:id` | JWT | — | Elimina un'automazione |

## Azioni

Percorso base: `/doing/actions`

Le azioni definiscono cosa succede quando un'automazione viene attivata.

| Metodo | Percorso | Auth | Permesso | Descrizione |
|--------|----------|------|----------|-------------|
| GET | `/:id` | JWT | — | Ottieni un'azione per ID |
| GET | `/automation/:id` | JWT | — | Ottieni tutte le azioni per un'automazione |
| POST | `/` | JWT | — | Crea o aggiorna azioni |
| DELETE | `/:id` | JWT | — | Elimina un'azione |

## Condizioni

Percorso base: `/doing/conditions`

Le condizioni definiscono i criteri che attivano un'automazione.

| Metodo | Percorso | Auth | Permesso | Descrizione |
|--------|----------|------|----------|-------------|
| GET | `/:id` | JWT | — | Ottieni una condizione per ID |
| GET | `/automation/:id` | JWT | — | Ottieni tutte le condizioni per un'automazione |
| POST | `/` | JWT | — | Crea o aggiorna condizioni |
| DELETE | `/:id` | JWT | — | Elimina una condizione |

## Congiunzioni

Percorso base: `/doing/conjunctions`

Le congiunzioni collegano più condizioni insieme in un'automazione (logica AND/OR).

| Metodo | Percorso | Auth | Permesso | Descrizione |
|--------|----------|------|----------|-------------|
| GET | `/:id` | JWT | — | Ottieni una congiunzione per ID |
| GET | `/automation/:id` | JWT | — | Ottieni tutte le congiunzioni per un'automazione |
| POST | `/` | JWT | — | Crea o aggiorna congiunzioni |
| DELETE | `/:id` | JWT | — | Elimina una congiunzione |

## Autenticazioni Fornitori di Contenuti

Percorso base: `/doing/contentProviderAuths`

Estende la classe base CRUD (GET `/`, GET `/:id`, POST `/`, DELETE `/:id` — nessun controllo dei permessi).

Gestisce i record di autenticazione OAuth per fornitori di contenuti esterni (es. integrazioni con software di presentazione).

| Metodo | Percorso | Auth | Permesso | Descrizione |
|--------|----------|------|----------|-------------|
| GET | `/` | JWT | — | Elenca tutte le autenticazioni dei fornitori di contenuti |
| GET | `/:id` | JWT | — | Ottieni un'autenticazione del fornitore di contenuti per ID |
| GET | `/ids?ids=` | JWT | — | Ottieni più autenticazioni dei fornitori di contenuti per ID separati da virgola |
| GET | `/ministry/:ministryId` | JWT | — | Ottieni tutte le autenticazioni dei fornitori di contenuti per un ministero |
| GET | `/ministry/:ministryId/:providerId` | JWT | — | Ottieni il record di autenticazione per un ministero e fornitore specifici |
| POST | `/` | JWT | — | Crea o aggiorna autenticazioni dei fornitori di contenuti |
| DELETE | `/:id` | JWT | — | Elimina un'autenticazione del fornitore di contenuti |

## Proxy Fornitore

Percorso base: `/doing/providerProxy`

Esegue il proxy delle richieste verso fornitori di contenuti esterni (es. ProPresenter, EasyWorship). Gestisce automaticamente l'aggiornamento dei token quando scadono.

| Metodo | Percorso | Auth | Permesso | Descrizione |
|--------|----------|------|----------|-------------|
| POST | `/browse` | JWT | — | Sfoglia i file del fornitore di contenuti. Body: `{ ministryId, providerId, path }` |
| POST | `/getPresentations` | JWT | — | Ottieni le presentazioni da un fornitore di contenuti. Body: `{ ministryId, providerId, path }` |
| POST | `/getPlaylist` | JWT | — | Ottieni una playlist da un fornitore di contenuti. Body: `{ ministryId, providerId, path, resolution }` |
| POST | `/getInstructions` | JWT | — | Ottieni le istruzioni per un elemento di contenuto. Body: `{ ministryId, providerId, path }` |
| POST | `/getExpandedInstructions` | JWT | — | Ottieni le istruzioni espanse per un elemento di contenuto. Body: `{ ministryId, providerId, path }` |

## Pagine Correlate

- [Endpoint Membership](./membership) — Persone, gruppi, ruoli e permessi
- [Endpoint Attendance](./attendance) — Tracciamento servizi e visite
- [Struttura dei Moduli](../module-structure) — Pattern di organizzazione del codice
