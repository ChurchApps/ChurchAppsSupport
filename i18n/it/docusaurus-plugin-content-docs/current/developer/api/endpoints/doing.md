---
title: "Endpoint Doing"
---

# Endpoint Doing

<div class="article-intro">

Il modulo Doing gestisce la pianificazione dei culti, la programmazione dei volontari, la gestione delle attività e le automazioni. Fornisce strumenti per creare piani di culto con orari e posti, assegnare i volontari, gestire le date di indisponibilità, costruire gli elementi dell'ordine di culto, collegarsi a fornitori di contenuti esterni e configurare flussi di lavoro automatizzati con condizioni e azioni.

</div>

**Percorso base:** `/doing`

## Piani

Percorso base: `/doing/plans`

| Metodo | Percorso | Auth | Permesso | Descrizione |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | — | Elenca tutti i piani della chiesa |
| GET | `/:id` | JWT | — | Ottieni un piano tramite ID |
| GET | `/ids?ids=` | JWT | — | Ottieni più piani tramite ID separati da virgola |
| GET | `/types/:planTypeId` | JWT | — | Ottieni i piani per tipo di piano |
| GET | `/textRange?startDate=&endDate=&ministryId=&planTypeId=` | JWT | `texting.send` + modifica ministero | Anteprima dell'invio **Invia SMS ai volontari** della panoramica servizio: `{ totalMembers, eligibleCount, optedOutCount, noPhoneCount, capped }` per i volontari assegnati nell'intervallo (uno per persona; esclusi i disiscritti e i numeri mancanti; numeri condivisi deduplicati; limite di 200) |
| GET | `/presenter` | JWT | — | Ottieni i piani dei prossimi 7 giorni (vista presentatore) |
| GET | `/public/current/:planTypeId` | Pubblico | — | Ottieni il piano corrente per un tipo di piano |
| GET | `/public/signup/:churchId` | Pubblico | — | Piani aperti all'iscrizione autonoma, dal più vicino, ciascuno con i suoi posti di iscrizione autonoma (ordinati per `categoryName`, poi `name`, più `filledCount` degli incarichi Accettati/Non confermati) e orari. Nessun nome di volontario. Quando l'impostazione della chiesa `volunteerSignupNextOnly` è `"true"`, viene restituito solo il primo piano di ciascun tipo di piano |
| GET | `/signup/:planId/volunteers` | JWT | — | `[{ positionId, names }]` per i posti di iscrizione autonoma del piano (nomi visualizzati degli assegnatari Accettati/Non confermati). Restituisce `[]` a meno che `showVolunteerNames` del piano non sia attivo |
| POST | `/` | JWT | — | Crea o aggiorna piani (accetta un singolo oggetto o un array) |
| POST | `/copy/:id` | JWT | Modifica ministero | Copia un piano inclusi posti, orari, assegnazioni ed elementi dell'ordine di culto. Il corpo include `ministryId`, `serviceDate`, `copyMode` ("none", "positions", "all") e `copyServiceOrder` (booleano). Senza `targetPlanId` viene creato un nuovo piano, e `notes`, `signupDeadlineHours`, `showVolunteerNames` e `autoReplaceOnDecline` vengono ereditati dal piano di origine, salvo che il corpo li specifichi. Con `targetPlanId`, la copia riempie invece quel piano esistente (il chiamante deve poterlo modificare). L'opzione **Ripeti ogni settimana** di B1Admin chiama questo endpoint una volta per settimana, copiando ogni volta dal piano creato la settimana precedente |
| POST | `/textRange` | JWT | `texting.send` + modifica ministero | Invia un SMS a ogni volontario assegnato in un intervallo di date tramite il fornitore di SMS della chiesa. Corpo: `{ startDate, endDate, ministryId, planTypeId?, message }` (messaggio fino a 1600 caratteri; i campi unione vengono risolti per ciascun destinatario). Restituisce i conteggi di anteprima più `recipientCount`, `successCount`, `failCount` e `error` (`no_provider` o `insufficient_credits`) quando l'invio si interrompe in anticipo |
| POST | `/autofill/:id` | JWT | — | Riempi automaticamente le assegnazioni dei volontari per un piano. Corpo: `{ teams: [{ positionId, personIds }] }` |
| DELETE | `/:id` | JWT | — | Elimina un piano e tutti gli orari, le assegnazioni, i posti e gli elementi del piano collegati |

### Esempio: copiare un piano

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

## Tipi di piano

Percorso base: `/doing/planTypes`

Estende la classe CRUD di base (GET `/`, GET `/:id`, POST `/`, DELETE `/:id` — senza controlli sui permessi).

| Metodo | Percorso | Auth | Permesso | Descrizione |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | — | Elenca tutti i tipi di piano |
| GET | `/:id` | JWT | — | Ottieni un tipo di piano tramite ID |
| GET | `/ids?ids=` | JWT | — | Ottieni più tipi di piano tramite ID separati da virgola |
| GET | `/ministryId/:ministryId` | JWT | — | Ottieni i tipi di piano di un ministero |
| POST | `/` | JWT | — | Crea o aggiorna tipi di piano |
| DELETE | `/:id` | JWT | — | Elimina un tipo di piano |

## Elementi del piano

Percorso base: `/doing/planItems`

Gestisce gli elementi dell'ordine di culto (intestazioni, sezioni, canti, ecc.) organizzati in una struttura ad albero padre-figlio.

| Metodo | Percorso | Auth | Permesso | Descrizione |
|--------|------|------|------------|-------------|
| GET | `/:id` | JWT | — | Ottieni un elemento del piano tramite ID |
| GET | `/ids?ids=` | JWT | — | Ottieni più elementi del piano tramite ID separati da virgola |
| GET | `/plan/:planId` | JWT | — | Ottieni tutti gli elementi del piano (restituisce una struttura ad albero) |
| GET | `/presenter/:churchId/:planId` | Pubblico | — | Ottieni gli elementi del piano per la vista presentatore (restituisce una struttura ad albero) |
| POST | `/` | JWT | — | Crea o aggiorna elementi del piano |
| POST | `/sort` | JWT | — | Aggiorna l'ordinamento di un elemento del piano (riordina i fratelli) |
| DELETE | `/:id` | JWT | — | Elimina un elemento del piano |

## Feed del piano

Percorso base: `/doing/planFeed`

Fornisce i feed degli elementi del piano per il presentatore. Se non esistono elementi del piano, li popola automaticamente dal feed del venue di Lessons.church usando il `contentId` del piano.

| Metodo | Percorso | Auth | Permesso | Descrizione |
|--------|------|------|------------|-------------|
| GET | `/presenter/:churchId/:planId` | Pubblico | — | Ottieni il feed del piano per il presentatore (si popola automaticamente dal feed del venue se vuoto) |

## Posti

Percorso base: `/doing/positions`

Estende la classe CRUD di base (GET `/:id`, POST `/`, DELETE `/:id` — senza controlli sui permessi).

| Metodo | Percorso | Auth | Permesso | Descrizione |
|--------|------|------|------------|-------------|
| GET | `/:id` | JWT | — | Ottieni un posto tramite ID |
| GET | `/ids?ids=` | JWT | — | Ottieni più posti tramite ID separati da virgola |
| GET | `/plan/ids?planIds=` | JWT | — | Ottieni i posti di più piani tramite ID di piano separati da virgola |
| GET | `/plan/:planId` | JWT | — | Ottieni tutti i posti di un piano |
| POST | `/` | JWT | — | Crea o aggiorna posti |
| DELETE | `/:id` | JWT | — | Elimina un posto |

## Orari

Percorso base: `/doing/times`

| Metodo | Percorso | Auth | Permesso | Descrizione |
|--------|------|------|------------|-------------|
| GET | `/all` | JWT | — | Elenca tutti gli orari della chiesa |
| GET | `/:id` | JWT | — | Ottieni un orario tramite ID |
| GET | `/plans?planIds=` | JWT | — | Ottieni gli orari di più piani tramite ID di piano separati da virgola |
| GET | `/plan/:planId` | JWT | — | Ottieni tutti gli orari di un piano |
| POST | `/` | JWT | — | Crea o aggiorna orari |
| DELETE | `/:id` | JWT | — | Elimina un orario |

## Assegnazioni

Percorso base: `/doing/assignments`

| Metodo | Percorso | Auth | Permesso | Descrizione |
|--------|------|------|------------|-------------|
| GET | `/my` | JWT | — | Ottieni le assegnazioni dell'utente corrente |
| GET | `/my/upcoming` | JWT | — | Fino a 20 assegnazioni dell'utente corrente su piani con data da ieri in poi (i piani in bozza o `prepared` vengono saltati), dal più vicino: `{ assignmentId, status, positionName, planId, planName, serviceDate }`. Alimenta l'anteprima dei servizi nella home del membro |
| GET | `/:id` | JWT | — | Ottieni un'assegnazione tramite ID |
| GET | `/plan/ids?planIds=` | JWT | — | Ottieni le assegnazioni di più piani tramite ID di piano separati da virgola |
| GET | `/plan/:planId` | JWT | — | Ottieni tutte le assegnazioni di un piano |
| POST | `/` | JWT | — | Crea o aggiorna assegnazioni (lo stato predefinito è "Unconfirmed") |
| POST | `/accept/:id` | JWT | — | Accetta un'assegnazione (deve essere la persona assegnata) |
| POST | `/decline/:id` | JWT | — | Rifiuta un'assegnazione (deve essere la persona assegnata) |
| DELETE | `/:id` | JWT | — | Elimina un'assegnazione |

### Esempio: accettare un'assegnazione

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

## Date di indisponibilità

Percorso base: `/doing/blockoutDates`

Estende la classe CRUD di base (GET `/:id`, DELETE `/:id` — senza controlli sui permessi).

| Metodo | Percorso | Auth | Permesso | Descrizione |
|--------|------|------|------------|-------------|
| GET | `/:id` | JWT | — | Ottieni una data di indisponibilità tramite ID |
| GET | `/ids?ids=` | JWT | — | Ottieni più date di indisponibilità tramite ID separati da virgola |
| GET | `/my` | JWT | — | Ottieni le date di indisponibilità dell'utente corrente |
| GET | `/upcoming` | JWT | — | Ottieni tutte le prossime date di indisponibilità della chiesa |
| POST | `/` | JWT | — | Crea o aggiorna date di indisponibilità (imposta di default personId sull'utente corrente se non fornito) |
| DELETE | `/:id` | JWT | — | Elimina una data di indisponibilità |

## Attività

Percorso base: `/doing/tasks`

| Metodo | Percorso | Auth | Permesso | Descrizione |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | — | Ottieni le attività aperte dell'utente corrente |
| GET | `/:id` | JWT | — | Ottieni un'attività tramite ID |
| GET | `/:id/contact` | JWT | Può visualizzare la scheda | Recapiti della persona a cui si riferisce una scheda di flusso di lavoro: `{ personId, displayName, mobilePhone, email }`. Consente a un addetto assegnato senza accesso alle Persone di contattare la persona |
| GET | `/closed` | JWT | — | Ottieni le attività chiuse dell'utente corrente |
| GET | `/timeline?taskIds=` | JWT | — | Ottieni i dati della cronologia per le attività tramite ID separati da virgola |
| GET | `/directoryUpdate/:personId` | JWT | — | Ottieni l'attività di aggiornamento del registro per una persona |
| POST | `/` | JWT | — | Crea o aggiorna attività. Aggiungi `?type=directoryUpdate` per gestire le attività di aggiornamento del registro (carica automaticamente le foto) |
| POST | `/:id/conversation` | JWT | `tasks.edit` o assegnatario della scheda | Collega la conversazione delle note a una scheda. Corpo: `{ conversationId }`. Vince la prima conversazione collegata; le chiamate successive restituiscono la scheda invariata |
| POST | `/loadForGroups` | JWT | — | Carica le attività per gruppi specifici. Corpo: `{ groupIds: [], status: "Open" }` |

## Automazioni

Percorso base: `/doing/automations`

| Metodo | Percorso | Auth | Permesso | Descrizione |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | — | Elenca tutte le automazioni della chiesa |
| GET | `/:id` | JWT | — | Ottieni un'automazione tramite ID |
| GET | `/check` | Pubblico | — | Avvia un controllo di tutte le automazioni |
| POST | `/` | JWT | — | Crea o aggiorna automazioni |
| DELETE | `/:id` | JWT | — | Elimina un'automazione |

## Azioni

Percorso base: `/doing/actions`

Le azioni definiscono cosa succede quando un'automazione viene attivata.

| Metodo | Percorso | Auth | Permesso | Descrizione |
|--------|------|------|------------|-------------|
| GET | `/:id` | JWT | — | Ottieni un'azione tramite ID |
| GET | `/automation/:id` | JWT | — | Ottieni tutte le azioni di un'automazione |
| POST | `/` | JWT | — | Crea o aggiorna azioni |
| DELETE | `/:id` | JWT | — | Elimina un'azione |

## Condizioni

Percorso base: `/doing/conditions`

Le condizioni definiscono i criteri che attivano un'automazione.

| Metodo | Percorso | Auth | Permesso | Descrizione |
|--------|------|------|------------|-------------|
| GET | `/:id` | JWT | — | Ottieni una condizione tramite ID |
| GET | `/automation/:id` | JWT | — | Ottieni tutte le condizioni di un'automazione |
| POST | `/` | JWT | — | Crea o aggiorna condizioni |
| DELETE | `/:id` | JWT | — | Elimina una condizione |

## Congiunzioni

Percorso base: `/doing/conjunctions`

Le congiunzioni collegano più condizioni in un'automazione (logica AND/OR).

| Metodo | Percorso | Auth | Permesso | Descrizione |
|--------|------|------|------------|-------------|
| GET | `/:id` | JWT | — | Ottieni una congiunzione tramite ID |
| GET | `/automation/:id` | JWT | — | Ottieni tutte le congiunzioni di un'automazione |
| POST | `/` | JWT | — | Crea o aggiorna congiunzioni |
| DELETE | `/:id` | JWT | — | Elimina una congiunzione |

## Autorizzazioni dei fornitori di contenuti

Percorso base: `/doing/contentProviderAuths`

Estende la classe CRUD di base (GET `/`, GET `/:id`, POST `/`, DELETE `/:id` — senza controlli sui permessi).

Gestisce i record di autenticazione OAuth per i fornitori di contenuti esterni (ad esempio le integrazioni con software di presentazione).

| Metodo | Percorso | Auth | Permesso | Descrizione |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | — | Elenca tutte le autorizzazioni dei fornitori di contenuti |
| GET | `/:id` | JWT | — | Ottieni un'autorizzazione di un fornitore di contenuti tramite ID |
| GET | `/ids?ids=` | JWT | — | Ottieni più autorizzazioni dei fornitori di contenuti tramite ID separati da virgola |
| GET | `/ministry/:ministryId` | JWT | — | Ottieni tutte le autorizzazioni dei fornitori di contenuti di un ministero |
| GET | `/ministry/:ministryId/:providerId` | JWT | — | Ottieni il record di autorizzazione per un ministero e un fornitore specifici |
| POST | `/` | JWT | — | Crea o aggiorna autorizzazioni dei fornitori di contenuti |
| DELETE | `/:id` | JWT | — | Elimina un'autorizzazione di un fornitore di contenuti |

## Proxy del fornitore

Percorso base: `/doing/providerProxy`

Inoltra le richieste ai fornitori di contenuti esterni (ad esempio ProPresenter, EasyWorship). Gestisce automaticamente il rinnovo dei token quando scadono.

| Metodo | Percorso | Auth | Permesso | Descrizione |
|--------|------|------|------------|-------------|
| POST | `/browse` | JWT | — | Sfoglia i file del fornitore di contenuti. Corpo: `{ ministryId, providerId, path }` |
| POST | `/getPresentations` | JWT | — | Ottieni le presentazioni da un fornitore di contenuti. Corpo: `{ ministryId, providerId, path }` |
| POST | `/getPlaylist` | JWT | — | Ottieni una playlist da un fornitore di contenuti. Corpo: `{ ministryId, providerId, path, resolution }` |
| POST | `/getInstructions` | JWT | — | Ottieni le istruzioni per un elemento di contenuto. Corpo: `{ ministryId, providerId, path }` |
| POST | `/getExpandedInstructions` | JWT | — | Ottieni le istruzioni estese per un elemento di contenuto. Corpo: `{ ministryId, providerId, path }` |

## Pagine correlate

- [Endpoint Membership](./membership) — Persone, gruppi, ruoli e permessi
- [Endpoint Attendance](./attendance) — Tracciamento di servizi e visite
- [Struttura del modulo](../module-structure) — Schemi di organizzazione del codice
