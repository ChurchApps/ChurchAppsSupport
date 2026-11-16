---
title: "Endpoint Doing"
description: "Riferimento degli endpoint dell'API Doing per piani di servizio, assegnazioni di volontari, attività e automazioni in B1 Admin, con percorsi, autenticazione e permessi."
---

# Endpoint Doing {#doing-endpoints}

<div class="article-intro">

Il modulo Doing gestisce la pianificazione dei servizi, la programmazione dei volontari, la gestione delle attività e le automazioni. Fornisce strumenti per creare piani di servizio con orari e posizioni, assegnare volontari, gestire le date di indisponibilità, costruire gli elementi dell'ordine del servizio, collegarsi a fornitori di contenuti esterni e configurare flussi di lavoro automatici con condizioni e azioni.

</div>

**Percorso base:** `/doing`

## Piani {#plans}

Percorso base: `/doing/plans`

| Metodo | Percorso | Autenticazione | Permesso | Descrizione |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | — | Elenca tutti i piani della chiesa |
| GET | `/:id` | JWT | — | Ottiene un piano tramite ID |
| GET | `/ids?ids=` | JWT | — | Ottiene più piani tramite ID separati da virgole |
| GET | `/types/:planTypeId` | JWT | — | Ottiene i piani per tipo di piano |
| GET | `/textRange?startDate=&endDate=&ministryId=&planTypeId=` | JWT | `texting.send` + modifica del ministero | Visualizza in anteprima la panoramica dei servizi che **Invia SMS ai volontari** invierebbe: `{ totalMembers, eligibleCount, optedOutCount, noPhoneCount, capped }` per i volontari assegnati nell'intervallo (uno per persona, saltando chi ha rinunciato e i numeri mancanti, deduplicando i numeri condivisi, con un limite di 200) |
| GET | `/presenter` | JWT | — | Ottiene i piani dei prossimi 7 giorni (vista presentatore) |
| GET | `/confirmationWorkflows?ministryId=` | JWT | Modifica del ministero | Flussi di conferma degli incarichi di servizio attivi (`workflowType = "assignmentConfirmation"`) che un piano può selezionare: `[{ id, name }]` |
| GET | `/public/current/:planTypeId` | Pubblico | — | Ottiene il piano corrente per un tipo di piano |
| GET | `/public/signup/:churchId` | Pubblico | — | Piani aperti all'iscrizione autonoma, dal più vicino, ciascuno con le posizioni di iscrizione autonoma (ordinate per `categoryName`, poi per `name`, con `filledCount` delle assegnazioni Accettate/Non confermate) e gli orari. Nessun nome di volontario. Quando l'impostazione della chiesa `volunteerSignupNextOnly` è `"true"`, viene restituito solo il primo piano di ogni tipo di piano. Ogni `plan` include un `signupDeadline` calcolato (istante ISO, oppure `null`): `signupDeadlineHours` prima del primo orario di tipo `service` del piano (qualsiasi orario con data se non c'è un orario di servizio; le 9:00 nel fuso orario della chiesa in `serviceDate` se il piano non ha orari) |
| GET | `/signup/:planId/volunteers` | JWT | — | `[{ positionId, names }]` per le posizioni di iscrizione autonoma del piano (nomi visualizzati degli assegnatari Accettati/Non confermati). Restituisce `[]` a meno che l'opzione `showVolunteerNames` del piano non sia attiva |
| POST | `/` | JWT | — | Crea o aggiorna piani (accetta un singolo oggetto oppure un array). Imposta `confirmationWorkflowId` per aderire a un flusso di conferma degli incarichi, oppure `null` per uscirne per le richieste future. Invia `signupDeadlineHours: null` per rimuovere una scadenza; omettere il campo mantiene il valore salvato |
| POST | `/copy/:id` | JWT | Modifica del ministero | Copia un piano con posizioni, orari, assegnazioni ed elementi dell'ordine del servizio. Il corpo include `ministryId`, `serviceDate`, `copyMode` ("none", "positions", "all") e `copyServiceOrder` (booleano). Senza `targetPlanId` viene creato un nuovo piano, e `notes`, `signupDeadlineHours`, `showVolunteerNames` e `autoReplaceOnDecline` vengono ereditati dal piano di origine, salvo che il corpo li specifichi. Con `targetPlanId`, la copia riempie quel piano esistente (il chiamante deve poterlo modificare). L'opzione **Ripeti settimanalmente** di B1Admin chiama questo endpoint una volta per settimana, copiando ogni volta dal piano creato la settimana precedente |
| POST | `/textRange` | JWT | `texting.send` + modifica del ministero | Invia un SMS a ogni volontario assegnato in un intervallo di date tramite il fornitore SMS della chiesa. Corpo: `{ startDate, endDate, ministryId, planTypeId?, message }` (messaggio fino a 1600 caratteri; i campi di unione vengono risolti per ogni destinatario). Restituisce i conteggi di anteprima più `recipientCount`, `successCount`, `failCount` e `error` (`no_provider` o `insufficient_credits`) quando l'invio si interrompe prima del previsto |
| POST | `/:id/issueRequests` | JWT | Modifica del piano | Invia le nuove assegnazioni Non confermate e non ancora notificate del piano tramite il suo flusso di conferma: segna ciascuna come notificata e avvia una scheda di flusso per ogni assegnazione. Corpo vuoto; restituisce `{ issued }`. Fallisce a meno che il piano non sia pubblicato (non `prepared`), abbia un `confirmationWorkflowId` attivo con almeno un passaggio, e la scadenza per la risposta non sia già passata |
| POST | `/autofill/:id` | JWT | — | Compila automaticamente le assegnazioni dei volontari per un piano. Corpo: `{ teams: [{ positionId, personIds }] }` |
| DELETE | `/:id` | JWT | — | Elimina un piano e tutti gli orari, le assegnazioni, le posizioni e gli elementi del piano collegati |

### Esempio: copiare un piano {#example-copy-a-plan}

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

## Tipi di piano {#plan-types}

Percorso base: `/doing/planTypes`

Estende la classe base CRUD (GET `/`, GET `/:id`, POST `/`, DELETE `/:id` — senza controlli dei permessi).

| Metodo | Percorso | Autenticazione | Permesso | Descrizione |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | — | Elenca tutti i tipi di piano |
| GET | `/:id` | JWT | — | Ottiene un tipo di piano tramite ID |
| GET | `/ids?ids=` | JWT | — | Ottiene più tipi di piano tramite ID separati da virgole |
| GET | `/ministryId/:ministryId` | JWT | — | Ottiene i tipi di piano di un ministero |
| POST | `/` | JWT | — | Crea o aggiorna tipi di piano |
| DELETE | `/:id` | JWT | — | Elimina un tipo di piano |

## Elementi del piano {#plan-items}

Percorso base: `/doing/planItems`

Gestisce gli elementi dell'ordine del servizio (intestazioni, sezioni, canti, ecc.) organizzati in una struttura ad albero padre-figlio.

| Metodo | Percorso | Autenticazione | Permesso | Descrizione |
|--------|------|------|------------|-------------|
| GET | `/:id` | JWT | — | Ottiene un elemento del piano tramite ID |
| GET | `/ids?ids=` | JWT | — | Ottiene più elementi del piano tramite ID separati da virgole |
| GET | `/plan/:planId` | JWT | — | Ottiene tutti gli elementi di un piano (restituisce una struttura ad albero) |
| GET | `/presenter/:churchId/:planId` | Pubblico | — | Ottiene gli elementi del piano per la vista presentatore (restituisce una struttura ad albero) |
| POST | `/` | JWT | — | Crea o aggiorna elementi del piano |
| POST | `/sort` | JWT | — | Aggiorna l'ordine di un elemento del piano (riordina i fratelli) |
| DELETE | `/:id` | JWT | — | Elimina un elemento del piano |

## Feed del piano {#plan-feed}

Percorso base: `/doing/planFeed`

Fornisce i feed degli elementi del piano per il presentatore. Se non esistono elementi del piano, li compila automaticamente dal feed della sede di Lessons.church usando il `contentId` del piano.

| Metodo | Percorso | Autenticazione | Permesso | Descrizione |
|--------|------|------|------------|-------------|
| GET | `/presenter/:churchId/:planId` | Pubblico | — | Ottiene il feed del piano per il presentatore (si compila automaticamente dal feed della sede se è vuoto) |

## Posizioni {#positions}

Percorso base: `/doing/positions`

Estende la classe base CRUD (GET `/:id`, POST `/`, DELETE `/:id` — senza controlli dei permessi).

| Metodo | Percorso | Autenticazione | Permesso | Descrizione |
|--------|------|------|------------|-------------|
| GET | `/:id` | JWT | — | Ottiene una posizione tramite ID |
| GET | `/ids?ids=` | JWT | — | Ottiene più posizioni tramite ID separati da virgole |
| GET | `/plan/ids?planIds=` | JWT | — | Ottiene le posizioni di più piani tramite ID di piani separati da virgole |
| GET | `/plan/:planId` | JWT | — | Ottiene tutte le posizioni di un piano |
| POST | `/` | JWT | — | Crea o aggiorna posizioni |
| DELETE | `/:id` | JWT | — | Elimina una posizione |

## Orari {#times}

Percorso base: `/doing/times`

| Metodo | Percorso | Autenticazione | Permesso | Descrizione |
|--------|------|------|------------|-------------|
| GET | `/all` | JWT | — | Elenca tutti gli orari della chiesa |
| GET | `/:id` | JWT | — | Ottiene un orario tramite ID |
| GET | `/plans?planIds=` | JWT | — | Ottiene gli orari di più piani tramite ID di piani separati da virgole |
| GET | `/plan/:planId` | JWT | — | Ottiene tutti gli orari di un piano |
| POST | `/` | JWT | — | Crea o aggiorna orari |
| DELETE | `/:id` | JWT | — | Elimina un orario |

## Assegnazioni {#assignments}

Percorso base: `/doing/assignments`

| Metodo | Percorso | Autenticazione | Permesso | Descrizione |
|--------|------|------|------------|-------------|
| GET | `/my` | JWT | — | Ottiene le assegnazioni dell'utente corrente |
| GET | `/my/upcoming` | JWT | — | Fino a 20 delle assegnazioni dell'utente corrente su piani con data da ieri in poi (si saltano i piani in attesa di conferma o `prepared`), dal più vicino: `{ assignmentId, status, positionName, planId, planName, serviceDate }`. Alimenta l'anteprima dei servizi nella home page dei membri |
| GET | `/:id` | JWT | — | Ottiene un'assegnazione tramite ID |
| GET | `/plan/ids?planIds=` | JWT | — | Ottiene le assegnazioni di più piani tramite ID di piani separati da virgole |
| GET | `/plan/:planId` | JWT | — | Ottiene tutte le assegnazioni di un piano |
| POST | `/` | JWT | — | Crea o aggiorna assegnazioni (lo stato predefinito è "Unconfirmed") |
| POST | `/accept/:id` | JWT | — | Accetta un'assegnazione (deve essere la persona assegnata) |
| POST | `/decline/:id` | JWT | — | Rifiuta un'assegnazione (deve essere la persona assegnata) |
| POST | `/signup` | JWT | — | Iscrizione autonoma a una posizione. Corpo: `{ positionId }`. La posizione deve consentire l'iscrizione autonoma e avere posto disponibile; crea un'assegnazione Accettata. Rifiutata con "Signup deadline has passed" quando è trascorsa la scadenza di iscrizione del piano (conteggiata a ritroso dal primo orario di servizio, come sopra) |
| DELETE | `/signup/:id` | JWT | — | Rimuove la tua iscrizione autonoma. Rifiutata con "Removal deadline has passed" dopo la scadenza di iscrizione del piano |
| DELETE | `/:id` | JWT | — | Elimina un'assegnazione |

### Esempio: accettare un'assegnazione {#example-accept-an-assignment}

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

## Date di indisponibilità {#blockout-dates}

Percorso base: `/doing/blockoutDates`

Estende la classe base CRUD (GET `/:id`, DELETE `/:id` — senza controlli dei permessi).

| Metodo | Percorso | Autenticazione | Permesso | Descrizione |
|--------|------|------|------------|-------------|
| GET | `/:id` | JWT | — | Ottiene una data di indisponibilità tramite ID |
| GET | `/ids?ids=` | JWT | — | Ottiene più date di indisponibilità tramite ID separati da virgole |
| GET | `/my` | JWT | — | Ottiene le date di indisponibilità dell'utente corrente |
| GET | `/upcoming` | JWT | — | Ottiene tutte le prossime date di indisponibilità della chiesa |
| POST | `/` | JWT | — | Crea o aggiorna date di indisponibilità (imposta `personId` sull'utente corrente se non fornito) |
| DELETE | `/:id` | JWT | — | Elimina una data di indisponibilità |

## Attività {#tasks}

Percorso base: `/doing/tasks`

| Metodo | Percorso | Autenticazione | Permesso | Descrizione |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | — | Ottiene le attività aperte dell'utente corrente |
| GET | `/:id` | JWT | — | Ottiene un'attività tramite ID |
| GET | `/:id/contact` | JWT | Può visualizzare la scheda | Contatti della persona a cui si riferisce una scheda di flusso: `{ personId, displayName, mobilePhone, email }`. Permette a un incaricato che non ha accesso alle Persone di contattare la persona |
| GET | `/closed` | JWT | — | Ottiene le attività chiuse dell'utente corrente |
| GET | `/timeline?taskIds=` | JWT | — | Ottiene i dati della cronologia delle attività tramite ID di attività separati da virgole |
| GET | `/directoryUpdate/:personId` | JWT | — | Ottiene l'attività di aggiornamento della directory per una persona |
| POST | `/` | JWT | — | Crea o aggiorna attività. Aggiungi `?type=directoryUpdate` per gestire le attività di aggiornamento della directory (carica automaticamente le foto). Cambiare `assignedToId` di un'attività esistente aggiunge una voce "Riassegnata da ... a ..." alla cronologia nel suo `data` |
| POST | `/:id/conversation` | JWT | `tasks.edit` o assegnatario della scheda | Collega la conversazione delle note a una scheda. Corpo: `{ conversationId }`. Vince la prima conversazione collegata; le chiamate successive restituiscono la scheda invariata |
| POST | `/loadForGroups` | JWT | — | Carica le attività di gruppi specifici. Corpo: `{ groupIds: [], status: "Open" }` |
| DELETE | `/:id` | JWT | `tasks.edit` | Elimina definitivamente un'attività semplice. Restituisce 400 per le schede di flusso (usa gli endpoint delle schede) e per le richieste di eliminazione account (decidile dall'azione di revisione) |

## Automazioni {#automations}

Percorso base: `/doing/automations`

| Metodo | Percorso | Autenticazione | Permesso | Descrizione |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | — | Elenca tutte le automazioni della chiesa |
| GET | `/:id` | JWT | — | Ottiene un'automazione tramite ID |
| GET | `/check` | Pubblico | — | Avvia un controllo di tutte le automazioni |
| POST | `/` | JWT | — | Crea o aggiorna automazioni |
| DELETE | `/:id` | JWT | — | Elimina un'automazione |

## Azioni {#actions}

Percorso base: `/doing/actions`

Le azioni definiscono cosa succede quando un'automazione viene attivata.

| Metodo | Percorso | Autenticazione | Permesso | Descrizione |
|--------|------|------|------------|-------------|
| GET | `/:id` | JWT | — | Ottiene un'azione tramite ID |
| GET | `/automation/:id` | JWT | — | Ottiene tutte le azioni di un'automazione |
| POST | `/` | JWT | — | Crea o aggiorna azioni |
| DELETE | `/:id` | JWT | — | Elimina un'azione |

## Condizioni {#conditions}

Percorso base: `/doing/conditions`

Le condizioni definiscono i criteri che attivano un'automazione.

| Metodo | Percorso | Autenticazione | Permesso | Descrizione |
|--------|------|------|------------|-------------|
| GET | `/:id` | JWT | — | Ottiene una condizione tramite ID |
| GET | `/automation/:id` | JWT | — | Ottiene tutte le condizioni di un'automazione |
| POST | `/` | JWT | — | Crea o aggiorna condizioni |
| DELETE | `/:id` | JWT | — | Elimina una condizione |

## Congiunzioni {#conjunctions}

Percorso base: `/doing/conjunctions`

Le congiunzioni collegano più condizioni in un'automazione (logica E/O).

| Metodo | Percorso | Autenticazione | Permesso | Descrizione |
|--------|------|------|------------|-------------|
| GET | `/:id` | JWT | — | Ottiene una congiunzione tramite ID |
| GET | `/automation/:id` | JWT | — | Ottiene tutte le congiunzioni di un'automazione |
| POST | `/` | JWT | — | Crea o aggiorna congiunzioni |
| DELETE | `/:id` | JWT | — | Elimina una congiunzione |

## Autorizzazioni dei fornitori di contenuti {#content-provider-auths}

Percorso base: `/doing/contentProviderAuths`

Estende la classe base CRUD (GET `/`, GET `/:id`, POST `/`, DELETE `/:id` — senza controlli dei permessi).

Gestisce i record di autenticazione OAuth per i fornitori di contenuti esterni (ad esempio, le integrazioni con software di presentazione).

`accessToken` e `refreshToken` sono cifrati a riposo con `EncryptionHelper` e decifrati alla lettura, quindi l'API restituisce comunque i token in chiaro. I record salvati prima della cifratura contengono testo in chiaro (che non include mai `|`); vengono restituiti così come sono e cifrati al salvataggio successivo.

| Metodo | Percorso | Autenticazione | Permesso | Descrizione |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | — | Elenca tutte le autorizzazioni dei fornitori di contenuti |
| GET | `/:id` | JWT | — | Ottiene un'autorizzazione di fornitore di contenuti tramite ID |
| GET | `/ids?ids=` | JWT | — | Ottiene più autorizzazioni di fornitori di contenuti tramite ID separati da virgole |
| GET | `/ministry/:ministryId` | JWT | — | Ottiene tutte le autorizzazioni dei fornitori di contenuti di un ministero |
| GET | `/ministry/:ministryId/:providerId` | JWT | — | Ottiene il record di autorizzazione per un ministero e un fornitore specifici |
| POST | `/` | JWT | — | Crea o aggiorna autorizzazioni dei fornitori di contenuti |
| DELETE | `/:id` | JWT | — | Elimina un'autorizzazione di fornitore di contenuti |

## Proxy del fornitore {#provider-proxy}

Percorso base: `/doing/providerProxy`

Inoltra le richieste ai fornitori di contenuti esterni (ad esempio ProPresenter, EasyWorship). Gestisce automaticamente il rinnovo dei token quando scadono.

| Metodo | Percorso | Autenticazione | Permesso | Descrizione |
|--------|------|------|------------|-------------|
| POST | `/browse` | JWT | — | Sfoglia i file del fornitore di contenuti. Corpo: `{ ministryId, providerId, path }` |
| POST | `/getPresentations` | JWT | — | Ottiene le presentazioni da un fornitore di contenuti. Corpo: `{ ministryId, providerId, path }` |
| POST | `/getPlaylist` | JWT | — | Ottiene una playlist da un fornitore di contenuti. Corpo: `{ ministryId, providerId, path, resolution }` |
| POST | `/getInstructions` | JWT | — | Ottiene le istruzioni per un elemento di contenuto. Corpo: `{ ministryId, providerId, path }` |
| POST | `/getExpandedInstructions` | JWT | — | Ottiene le istruzioni estese per un elemento di contenuto. Corpo: `{ ministryId, providerId, path }` |

## Pagine correlate {#related-pages}

- [Endpoint di Membership](./membership.md) — Persone, gruppi, ruoli e permessi
- [Endpoint di Presenze](./attendance.md) — Tracciamento di servizi e visite
- [Struttura del modulo](../module-structure.md) — Schemi di organizzazione del codice
