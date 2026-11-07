---
title: "Endpoint Doing"
description: "Riferimento endpoint dell'API Doing dietro piani di culto, incarichi di volontariato, attività e automazioni in B1 Admin, con percorsi, autenticazione e permessi."
---

# Endpoint Doing

<div class="article-intro">

Il modulo Doing gestisce la pianificazione dei culti, la programmazione dei volontari, la gestione delle attività e le automazioni. Fornisce strumenti per creare piani di servizio con orari e posizioni, assegnare volontari, gestire le date di indisponibilità, costruire gli elementi dell'ordine del culto, collegarsi a fornitori di contenuti esterni e configurare flussi di lavoro automatizzati con condizioni e azioni.

</div>

**Percorso base:** `/doing`

## Piani

Percorso base: `/doing/plans`

| Metodo | Percorso | Autenticazione | Permesso | Descrizione |
|--------|----------|----------------|----------|-------------|
| GET | `/` | JWT | — | Elenca tutti i piani della chiesa |
| GET | `/:id` | JWT | — | Ottiene un piano per ID |
| GET | `/ids?ids=` | JWT | — | Ottiene più piani tramite ID separati da virgole |
| GET | `/types/:planTypeId` | JWT | — | Ottiene i piani per tipo di piano |
| GET | `/textRange?startDate=&endDate=&ministryId=&planTypeId=` | JWT | `texting.send` + modifica del ministero | Anteprima della panoramica dei servizi che **Invia SMS ai volontari** invierebbe: `{ totalMembers, eligibleCount, optedOutCount, noPhoneCount, capped }` per i volontari assegnati nell'intervallo (uno per persona, con i rifiuti e i numeri mancanti saltati, i numeri condivisi deduplicati, limitato a 200) |
| GET | `/presenter` | JWT | — | Ottiene i piani dei prossimi 7 giorni (vista presentatore) |
| GET | `/confirmationWorkflows?ministryId=` | JWT | Modifica del ministero | Flussi di lavoro attivi di conferma delle assegnazioni di servizio (`workflowType = "assignmentConfirmation"`) che un piano può selezionare: `[{ id, name }]` |
| GET | `/public/current/:planTypeId` | Pubblico | — | Ottiene il piano attuale per un tipo di piano |
| GET | `/public/signup/:churchId` | Pubblico | — | Piani aperti all'iscrizione autonoma, dal più vicino, ciascuno con le sue posizioni di iscrizione autonoma (ordinate per `categoryName`, poi per `name`, più `filledCount` delle assegnazioni Accettate/Non confermate) e gli orari. Nessun nome di volontario. Quando l'impostazione della chiesa `volunteerSignupNextOnly` è `"true"`, viene restituito solo il primo piano di ogni tipo. Ogni `plan` include un `signupDeadline` calcolato (istante ISO, oppure `null`): `signupDeadlineHours` prima dell'orario di tipo `service` più precoce del piano (qualsiasi orario con data se non c'è un orario di culto; le 9:00 nel fuso orario della chiesa su `serviceDate` se il piano non ha orari) |
| GET | `/signup/:planId/volunteers` | JWT | — | `[{ positionId, names }]` per le posizioni di iscrizione autonoma del piano (nomi visualizzati degli assegnatari Accettati/Non confermati). Restituisce `[]` a meno che l'opzione `showVolunteerNames` del piano non sia attiva |
| POST | `/` | JWT | — | Crea o aggiorna i piani (accetta un singolo oggetto oppure un array). Imposta `confirmationWorkflowId` per far aderire il piano a un flusso di lavoro di conferma del servizio, oppure `null` per non aderire alle richieste future. Invia `signupDeadlineHours: null` per eliminare una scadenza; omettere il campo mantiene il valore salvato |
| POST | `/copy/:id` | JWT | Modifica del ministero | Copia un piano comprese posizioni, orari, assegnazioni ed elementi dell'ordine del culto. Il corpo include `ministryId`, `serviceDate`, `copyMode` ("none", "positions", "all") e `copyServiceOrder` (booleano). Senza `targetPlanId` viene creato un nuovo piano, e `notes`, `signupDeadlineHours`, `showVolunteerNames` e `autoReplaceOnDecline` vengono ereditati dal piano di origine, a meno che il corpo non li fornisca. Con `targetPlanId`, la copia riempie invece quel piano esistente (il chiamante deve poterlo modificare). L'opzione **Ripeti settimanalmente** di B1Admin chiama questo endpoint una volta per settimana, copiando ogni volta dal piano creato la settimana precedente |
| POST | `/textRange` | JWT | `texting.send` + modifica del ministero | Invia un SMS a ogni volontario assegnato in un intervallo di date tramite il fornitore di SMS della chiesa. Corpo: `{ startDate, endDate, ministryId, planTypeId?, message }` (messaggio fino a 1600 caratteri; i campi di unione vengono risolti per ciascun destinatario). Restituisce i conteggi dell'anteprima più `recipientCount`, `successCount`, `failCount` e `error` (`no_provider` oppure `insufficient_credits`) quando l'invio si interrompe prima del previsto |
| POST | `/:id/issueRequests` | JWT | Modifica del piano | Emette le nuove assegnazioni Non confermate e non ancora notificate del piano tramite il suo flusso di lavoro di conferma: segna ciascuna come notificata e avvia una scheda di flusso di lavoro per ogni assegnazione. Corpo vuoto; restituisce `{ issued }`. Fallisce a meno che il piano non sia pubblicato (non `prepared`), abbia un `confirmationWorkflowId` attivo con almeno un passaggio, e la sua scadenza per la risposta non sia già passata |
| POST | `/autofill/:id` | JWT | — | Compila automaticamente le assegnazioni dei volontari per un piano. Corpo: `{ teams: [{ positionId, personIds }] }` |
| DELETE | `/:id` | JWT | — | Elimina un piano e tutti gli orari, le assegnazioni, le posizioni e gli elementi del piano collegati |

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

Estende la classe base CRUD (GET `/`, GET `/:id`, POST `/`, DELETE `/:id` — senza controlli dei permessi).

| Metodo | Percorso | Autenticazione | Permesso | Descrizione |
|--------|----------|----------------|----------|-------------|
| GET | `/` | JWT | — | Elenca tutti i tipi di piano |
| GET | `/:id` | JWT | — | Ottiene un tipo di piano per ID |
| GET | `/ids?ids=` | JWT | — | Ottiene più tipi di piano tramite ID separati da virgole |
| GET | `/ministryId/:ministryId` | JWT | — | Ottiene i tipi di piano di un ministero |
| POST | `/` | JWT | — | Crea o aggiorna i tipi di piano |
| DELETE | `/:id` | JWT | — | Elimina un tipo di piano |

## Elementi del piano

Percorso base: `/doing/planItems`

Gestisce gli elementi dell'ordine del culto (intestazioni, sezioni, canti, ecc.) organizzati in una struttura ad albero genitore-figlio.

| Metodo | Percorso | Autenticazione | Permesso | Descrizione |
|--------|----------|----------------|----------|-------------|
| GET | `/:id` | JWT | — | Ottiene un elemento del piano per ID |
| GET | `/ids?ids=` | JWT | — | Ottiene più elementi del piano tramite ID separati da virgole |
| GET | `/plan/:planId` | JWT | — | Ottiene tutti gli elementi del piano per un piano (restituisce la struttura ad albero) |
| GET | `/presenter/:churchId/:planId` | Pubblico | — | Ottiene gli elementi del piano per la vista presentatore (restituisce la struttura ad albero) |
| POST | `/` | JWT | — | Crea o aggiorna gli elementi del piano |
| POST | `/sort` | JWT | — | Aggiorna l'ordinamento di un elemento del piano (riordina i fratelli) |
| DELETE | `/:id` | JWT | — | Elimina un elemento del piano |

## Feed del piano

Percorso base: `/doing/planFeed`

Fornisce i feed degli elementi del piano per il presentatore. Se non esistono elementi del piano, li popola automaticamente dal feed della venue di Lessons.church usando il `contentId` del piano.

| Metodo | Percorso | Autenticazione | Permesso | Descrizione |
|--------|----------|----------------|----------|-------------|
| GET | `/presenter/:churchId/:planId` | Pubblico | — | Ottiene il feed del piano per il presentatore (si popola automaticamente dal feed della venue se vuoto) |

## Posizioni

Percorso base: `/doing/positions`

Estende la classe base CRUD (GET `/:id`, POST `/`, DELETE `/:id` — senza controlli dei permessi).

| Metodo | Percorso | Autenticazione | Permesso | Descrizione |
|--------|----------|----------------|----------|-------------|
| GET | `/:id` | JWT | — | Ottiene una posizione per ID |
| GET | `/ids?ids=` | JWT | — | Ottiene più posizioni tramite ID separati da virgole |
| GET | `/plan/ids?planIds=` | JWT | — | Ottiene le posizioni di più piani tramite ID di piano separati da virgole |
| GET | `/plan/:planId` | JWT | — | Ottiene tutte le posizioni di un piano |
| POST | `/` | JWT | — | Crea o aggiorna le posizioni |
| DELETE | `/:id` | JWT | — | Elimina una posizione |

## Orari

Percorso base: `/doing/times`

| Metodo | Percorso | Autenticazione | Permesso | Descrizione |
|--------|----------|----------------|----------|-------------|
| GET | `/all` | JWT | — | Elenca tutti gli orari della chiesa |
| GET | `/:id` | JWT | — | Ottiene un orario per ID |
| GET | `/plans?planIds=` | JWT | — | Ottiene gli orari di più piani tramite ID di piano separati da virgole |
| GET | `/plan/:planId` | JWT | — | Ottiene tutti gli orari di un piano |
| POST | `/` | JWT | — | Crea o aggiorna gli orari |
| DELETE | `/:id` | JWT | — | Elimina un orario |

## Assegnazioni

Percorso base: `/doing/assignments`

| Metodo | Percorso | Autenticazione | Permesso | Descrizione |
|--------|----------|----------------|----------|-------------|
| GET | `/my` | JWT | — | Ottiene le assegnazioni dell'utente corrente |
| GET | `/my/upcoming` | JWT | — | Fino a 20 assegnazioni dell'utente corrente su piani con data da ieri in poi (si saltano i piani con penciled-in, oppure `prepared`), dalla più vicina: `{ assignmentId, status, positionName, planId, planName, serviceDate }`. Alimenta l'anteprima del servizio nella home page del membro |
| GET | `/:id` | JWT | — | Ottiene un'assegnazione per ID |
| GET | `/plan/ids?planIds=` | JWT | — | Ottiene le assegnazioni di più piani tramite ID di piano separati da virgole |
| GET | `/plan/:planId` | JWT | — | Ottiene tutte le assegnazioni di un piano |
| POST | `/` | JWT | — | Crea o aggiorna le assegnazioni (imposta di default lo stato su "Unconfirmed") |
| POST | `/accept/:id` | JWT | — | Accetta un'assegnazione (deve essere la persona assegnata) |
| POST | `/decline/:id` | JWT | — | Rifiuta un'assegnazione (deve essere la persona assegnata) |
| POST | `/signup` | JWT | — | Iscrizione autonoma a una posizione. Corpo: `{ positionId }`. La posizione deve consentire l'iscrizione autonoma e avere posto; crea un'assegnazione Accepted. Respinta con "Signup deadline has passed" una volta superata la scadenza di iscrizione del piano (calcolata a ritroso dal suo primo orario di culto, come sopra) |
| DELETE | `/signup/:id` | JWT | — | Rimuove la propria iscrizione autonoma. Respinta con "Removal deadline has passed" dopo la scadenza di iscrizione del piano |
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

Estende la classe base CRUD (GET `/:id`, DELETE `/:id` — senza controlli dei permessi).

| Metodo | Percorso | Autenticazione | Permesso | Descrizione |
|--------|----------|----------------|----------|-------------|
| GET | `/:id` | JWT | — | Ottiene una data di indisponibilità per ID |
| GET | `/ids?ids=` | JWT | — | Ottiene più date di indisponibilità tramite ID separati da virgole |
| GET | `/my` | JWT | — | Ottiene le date di indisponibilità dell'utente corrente |
| GET | `/upcoming` | JWT | — | Ottiene tutte le prossime date di indisponibilità della chiesa |
| POST | `/` | JWT | — | Crea o aggiorna le date di indisponibilità (imposta di default personId sull'utente corrente se non fornito) |
| DELETE | `/:id` | JWT | — | Elimina una data di indisponibilità |

## Attività

Percorso base: `/doing/tasks`

| Metodo | Percorso | Autenticazione | Permesso | Descrizione |
|--------|----------|----------------|----------|-------------|
| GET | `/` | JWT | — | Ottiene le attività aperte per l'utente corrente |
| GET | `/:id` | JWT | — | Ottiene un'attività per ID |
| GET | `/:id/contact` | JWT | Può visualizzare la scheda | Informazioni di contatto della persona a cui si riferisce una scheda di flusso di lavoro: `{ personId, displayName, mobilePhone, email }`. Permette a un chiamante assegnato senza accesso a Persone di raggiungere la persona |
| GET | `/closed` | JWT | — | Ottiene le attività chiuse per l'utente corrente |
| GET | `/timeline?taskIds=` | JWT | — | Ottiene i dati della timeline per le attività tramite ID separati da virgole |
| GET | `/directoryUpdate/:personId` | JWT | — | Ottiene l'attività di aggiornamento della rubrica per una persona |
| POST | `/` | JWT | — | Crea o aggiorna le attività. Aggiungi `?type=directoryUpdate` per gestire le attività di aggiornamento della rubrica (carica automaticamente le foto) |
| POST | `/:id/conversation` | JWT | `tasks.edit` oppure assegnatario della scheda | Allega la conversazione di note a una scheda. Corpo: `{ conversationId }`. Vince la prima conversazione allegata; le chiamate successive restituiscono la scheda invariata |
| POST | `/loadForGroups` | JWT | — | Carica le attività per gruppi specifici. Corpo: `{ groupIds: [], status: "Open" }` |

## Automazioni

Percorso base: `/doing/automations`

| Metodo | Percorso | Autenticazione | Permesso | Descrizione |
|--------|----------|----------------|----------|-------------|
| GET | `/` | JWT | — | Elenca tutte le automazioni della chiesa |
| GET | `/:id` | JWT | — | Ottiene un'automazione per ID |
| GET | `/check` | Pubblico | — | Avvia un controllo di tutte le automazioni |
| POST | `/` | JWT | — | Crea o aggiorna le automazioni |
| DELETE | `/:id` | JWT | — | Elimina un'automazione |

## Azioni

Percorso base: `/doing/actions`

Le azioni definiscono cosa succede quando un'automazione viene attivata.

| Metodo | Percorso | Autenticazione | Permesso | Descrizione |
|--------|----------|----------------|----------|-------------|
| GET | `/:id` | JWT | — | Ottiene un'azione per ID |
| GET | `/automation/:id` | JWT | — | Ottiene tutte le azioni di un'automazione |
| POST | `/` | JWT | — | Crea o aggiorna le azioni |
| DELETE | `/:id` | JWT | — | Elimina un'azione |

## Condizioni

Percorso base: `/doing/conditions`

Le condizioni definiscono i criteri che attivano un'automazione.

| Metodo | Percorso | Autenticazione | Permesso | Descrizione |
|--------|----------|----------------|----------|-------------|
| GET | `/:id` | JWT | — | Ottiene una condizione per ID |
| GET | `/automation/:id` | JWT | — | Ottiene tutte le condizioni di un'automazione |
| POST | `/` | JWT | — | Crea o aggiorna le condizioni |
| DELETE | `/:id` | JWT | — | Elimina una condizione |

## Congiunzioni

Percorso base: `/doing/conjunctions`

Le congiunzioni collegano più condizioni in un'automazione (logica AND/OR).

| Metodo | Percorso | Autenticazione | Permesso | Descrizione |
|--------|----------|----------------|----------|-------------|
| GET | `/:id` | JWT | — | Ottiene una congiunzione per ID |
| GET | `/automation/:id` | JWT | — | Ottiene tutte le congiunzioni di un'automazione |
| POST | `/` | JWT | — | Crea o aggiorna le congiunzioni |
| DELETE | `/:id` | JWT | — | Elimina una congiunzione |

## Autorizzazioni dei fornitori di contenuti

Percorso base: `/doing/contentProviderAuths`

Estende la classe base CRUD (GET `/`, GET `/:id`, POST `/`, DELETE `/:id` — senza controlli dei permessi).

Gestisce i record di autenticazione OAuth per i fornitori di contenuti esterni (ad esempio le integrazioni con software di presentazione).

`accessToken` e `refreshToken` sono cifrati a riposo con `EncryptionHelper` e decifrati alla lettura, quindi l'API restituisce comunque i token in chiaro. I record salvati prima della cifratura contengono testo in chiaro (che non contiene mai `|`); vengono restituiti così come sono e cifrati la volta successiva in cui vengono salvati.

| Metodo | Percorso | Autenticazione | Permesso | Descrizione |
|--------|----------|----------------|----------|-------------|
| GET | `/` | JWT | — | Elenca tutte le autorizzazioni dei fornitori di contenuti |
| GET | `/:id` | JWT | — | Ottiene un'autorizzazione del fornitore di contenuti per ID |
| GET | `/ids?ids=` | JWT | — | Ottiene più autorizzazioni dei fornitori di contenuti tramite ID separati da virgole |
| GET | `/ministry/:ministryId` | JWT | — | Ottiene tutte le autorizzazioni dei fornitori di contenuti di un ministero |
| GET | `/ministry/:ministryId/:providerId` | JWT | — | Ottiene il record di autorizzazione per un ministero e un fornitore specifici |
| POST | `/` | JWT | — | Crea o aggiorna le autorizzazioni dei fornitori di contenuti |
| DELETE | `/:id` | JWT | — | Elimina un'autorizzazione del fornitore di contenuti |

## Proxy del fornitore

Percorso base: `/doing/providerProxy`

Inoltra le richieste ai fornitori di contenuti esterni (ad esempio ProPresenter, EasyWorship). Gestisce automaticamente il rinnovo dei token quando scadono.

| Metodo | Percorso | Autenticazione | Permesso | Descrizione |
|--------|----------|----------------|----------|-------------|
| POST | `/browse` | JWT | — | Sfoglia i file del fornitore di contenuti. Corpo: `{ ministryId, providerId, path }` |
| POST | `/getPresentations` | JWT | — | Ottiene le presentazioni da un fornitore di contenuti. Corpo: `{ ministryId, providerId, path }` |
| POST | `/getPlaylist` | JWT | — | Ottiene una playlist da un fornitore di contenuti. Corpo: `{ ministryId, providerId, path, resolution }` |
| POST | `/getInstructions` | JWT | — | Ottiene le istruzioni per un elemento di contenuto. Corpo: `{ ministryId, providerId, path }` |
| POST | `/getExpandedInstructions` | JWT | — | Ottiene le istruzioni espanse per un elemento di contenuto. Corpo: `{ ministryId, providerId, path }` |

## Pagine correlate

- [Endpoint Membership](./membership.md) — Persone, gruppi, ruoli e permessi
- [Endpoint Presenze](./attendance.md) — Tracciamento di culti e visite
- [Struttura del modulo](../module-structure.md) — Schemi di organizzazione del codice
