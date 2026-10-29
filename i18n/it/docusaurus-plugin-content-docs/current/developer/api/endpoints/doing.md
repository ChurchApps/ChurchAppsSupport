---
title: "Endpoint di Doing"
---

# Endpoint di Doing

<div class="article-intro">

Il modulo Doing gestisce la pianificazione dei culti, la programmazione dei volontari, la gestione delle attività e le automazioni. Fornisce strumenti per creare piani di servizio con orari e posizioni, assegnare volontari, gestire le date di indisponibilità, costruire gli elementi dell'ordine del culto, collegarsi a fornitori di contenuti esterni e configurare flussi di lavoro automatizzati con condizioni e azioni.

</div>

**Percorso base:** `/doing`

## Piani

Percorso base: `/doing/plans`

| Metodo | Percorso | Auth | Permesso | Descrizione |
|--------|----------|------|----------|-------------|
| GET | `/` | JWT | — | Elenca tutti i piani della chiesa |
| GET | `/:id` | JWT | — | Ottiene un piano tramite ID |
| GET | `/ids?ids=` | JWT | — | Ottiene più piani tramite ID separati da virgole |
| GET | `/types/:planTypeId` | JWT | — | Ottiene i piani per tipo di piano |
| GET | `/textRange?startDate=&endDate=&ministryId=&planTypeId=` | JWT | `texting.send` + modifica del ministero | Visualizza in anteprima il riepilogo del servizio che **Text Volunteers** invierebbe: `{ totalMembers, eligibleCount, optedOutCount, noPhoneCount, capped }` per i volontari assegnati nell'intervallo (uno per persona, saltando chi ha rinunciato e i numeri mancanti, numeri condivisi deduplicati, limite di 200) |
| GET | `/presenter` | JWT | — | Ottiene i piani dei prossimi 7 giorni (vista presentatore) |
| GET | `/confirmationWorkflows?ministryId=` | JWT | Modifica del ministero | Flussi di conferma delle assegnazioni di servizio attivi (`workflowType = "assignmentConfirmation"`) selezionabili da un piano: `[{ id, name }]` |
| GET | `/public/current/:planTypeId` | Public | — | Ottiene il piano corrente per un tipo di piano |
| GET | `/public/signup/:churchId` | Public | — | Piani aperti all'iscrizione autonoma, dal più vicino, ciascuno con le sue posizioni di iscrizione autonoma (ordinate per `categoryName`, poi `name`, più `filledCount` delle assegnazioni Accepted/Unconfirmed) e orari. Nessun nome di volontario. Quando l'impostazione della chiesa `volunteerSignupNextOnly` è `"true"`, viene restituito solo il primo piano di ogni tipo di piano. Ogni `plan` include un `signupDeadline` calcolato (istante ISO, o `null`): `signupDeadlineHours` prima del primo orario di tipo `service` del piano (qualsiasi orario con data se non c'è un orario di culto; le 9:00 nel fuso orario della chiesa su `serviceDate` se il piano non ha orari) |
| GET | `/signup/:planId/volunteers` | JWT | — | `[{ positionId, names }]` per le posizioni di iscrizione autonoma del piano (nomi visualizzati degli assegnatari Accepted/Unconfirmed). Restituisce `[]` a meno che `showVolunteerNames` del piano non sia attivo |
| POST | `/` | JWT | — | Crea o aggiorna piani (accetta un singolo oggetto o un array). Imposta `confirmationWorkflowId` per aderire a un flusso di conferma del servizio, oppure `null` per disattivarlo per le richieste future. Invia `signupDeadlineHours: null` per rimuovere una scadenza; omettere il campo mantiene il valore salvato |
| POST | `/copy/:id` | JWT | Modifica del ministero | Copia un piano comprese posizioni, orari, assegnazioni ed elementi dell'ordine del culto. Il corpo include `ministryId`, `serviceDate`, `copyMode` ("none", "positions", "all") e `copyServiceOrder` (booleano). Senza `targetPlanId` viene creato un nuovo piano, e `notes`, `signupDeadlineHours`, `showVolunteerNames` e `autoReplaceOnDecline` vengono ereditati dal piano di origine, a meno che il corpo non li fornisca. Con `targetPlanId`, la copia riempie invece quel piano esistente (il chiamante deve poterlo modificare). L'opzione **Ripeti settimanalmente** di B1Admin chiama questo endpoint una volta per settimana, copiando ogni volta dal piano creato la settimana precedente |
| POST | `/textRange` | JWT | `texting.send` + modifica del ministero | Invia un messaggio a ogni volontario assegnato in un intervallo di date tramite il fornitore di SMS della chiesa. Corpo: `{ startDate, endDate, ministryId, planTypeId?, message }` (messaggio fino a 1600 caratteri; i campi di unione vengono risolti per ciascun destinatario). Restituisce i conteggi dell'anteprima più `recipientCount`, `successCount`, `failCount` e `error` (`no_provider` o `insufficient_credits`) quando l'invio si interrompe prima del previsto |
| POST | `/:id/issueRequests` | JWT | Modifica del piano | Invia le nuove assegnazioni Unconfirmed, non ancora notificate, del piano tramite il suo flusso di conferma: segna ciascuna come notificata e avvia una scheda del flusso per ogni assegnazione. Corpo vuoto; restituisce `{ issued }`. Fallisce se il piano non è pubblicato (non è `prepared`), non ha un `confirmationWorkflowId` attivo con almeno un passaggio, oppure se la scadenza per la risposta è già passata |
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

| Metodo | Percorso | Auth | Permesso | Descrizione |
|--------|----------|------|----------|-------------|
| GET | `/` | JWT | — | Elenca tutti i tipi di piano |
| GET | `/:id` | JWT | — | Ottiene un tipo di piano tramite ID |
| GET | `/ids?ids=` | JWT | — | Ottiene più tipi di piano tramite ID separati da virgole |
| GET | `/ministryId/:ministryId` | JWT | — | Ottiene i tipi di piano per un ministero |
| POST | `/` | JWT | — | Crea o aggiorna tipi di piano |
| DELETE | `/:id` | JWT | — | Elimina un tipo di piano |

## Elementi del piano

Percorso base: `/doing/planItems`

Gestisce gli elementi dell'ordine del culto (intestazioni, sezioni, canti, ecc.) organizzati in una struttura ad albero genitore-figlio.

| Metodo | Percorso | Auth | Permesso | Descrizione |
|--------|----------|------|----------|-------------|
| GET | `/:id` | JWT | — | Ottiene un elemento del piano tramite ID |
| GET | `/ids?ids=` | JWT | — | Ottiene più elementi del piano tramite ID separati da virgole |
| GET | `/plan/:planId` | JWT | — | Ottiene tutti gli elementi del piano (restituisce una struttura ad albero) |
| GET | `/presenter/:churchId/:planId` | Public | — | Ottiene gli elementi del piano per la vista presentatore (restituisce una struttura ad albero) |
| POST | `/` | JWT | — | Crea o aggiorna elementi del piano |
| POST | `/sort` | JWT | — | Aggiorna l'ordinamento di un elemento del piano (riordina i fratelli) |
| DELETE | `/:id` | JWT | — | Elimina un elemento del piano |

## Feed del piano

Percorso base: `/doing/planFeed`

Fornisce i feed degli elementi del piano per il presentatore. Se non esistono elementi del piano, li popola automaticamente dal feed della venue di Lessons.church usando il `contentId` del piano.

| Metodo | Percorso | Auth | Permesso | Descrizione |
|--------|----------|------|----------|-------------|
| GET | `/presenter/:churchId/:planId` | Public | — | Ottiene il feed del piano per il presentatore (si popola automaticamente dal feed della venue se vuoto) |

## Posizioni

Percorso base: `/doing/positions`

Estende la classe base CRUD (GET `/:id`, POST `/`, DELETE `/:id` — senza controlli dei permessi).

| Metodo | Percorso | Auth | Permesso | Descrizione |
|--------|----------|------|----------|-------------|
| GET | `/:id` | JWT | — | Ottiene una posizione tramite ID |
| GET | `/ids?ids=` | JWT | — | Ottiene più posizioni tramite ID separati da virgole |
| GET | `/plan/ids?planIds=` | JWT | — | Ottiene le posizioni di più piani tramite ID di piano separati da virgole |
| GET | `/plan/:planId` | JWT | — | Ottiene tutte le posizioni di un piano |
| POST | `/` | JWT | — | Crea o aggiorna posizioni |
| DELETE | `/:id` | JWT | — | Elimina una posizione |

## Orari

Percorso base: `/doing/times`

| Metodo | Percorso | Auth | Permesso | Descrizione |
|--------|----------|------|----------|-------------|
| GET | `/all` | JWT | — | Elenca tutti gli orari della chiesa |
| GET | `/:id` | JWT | — | Ottiene un orario tramite ID |
| GET | `/plans?planIds=` | JWT | — | Ottiene gli orari di più piani tramite ID di piano separati da virgole |
| GET | `/plan/:planId` | JWT | — | Ottiene tutti gli orari di un piano |
| POST | `/` | JWT | — | Crea o aggiorna orari |
| DELETE | `/:id` | JWT | — | Elimina un orario |

## Assegnazioni

Percorso base: `/doing/assignments`

| Metodo | Percorso | Auth | Permesso | Descrizione |
|--------|----------|------|----------|-------------|
| GET | `/my` | JWT | — | Ottiene le assegnazioni dell'utente corrente |
| GET | `/my/upcoming` | JWT | — | Fino a 20 assegnazioni dell'utente corrente su piani con data da ieri in poi (i piani in bozza, o `prepared`, vengono saltati), dalla più vicina: `{ assignmentId, status, positionName, planId, planName, serviceDate }`. Alimenta l'anteprima dei servizi nella home page dei membri |
| GET | `/:id` | JWT | — | Ottiene un'assegnazione tramite ID |
| GET | `/plan/ids?planIds=` | JWT | — | Ottiene le assegnazioni di più piani tramite ID di piano separati da virgole |
| GET | `/plan/:planId` | JWT | — | Ottiene tutte le assegnazioni di un piano |
| POST | `/` | JWT | — | Crea o aggiorna assegnazioni (imposta lo stato predefinito a "Unconfirmed") |
| POST | `/accept/:id` | JWT | — | Accetta un'assegnazione (deve essere la persona assegnata) |
| POST | `/decline/:id` | JWT | — | Rifiuta un'assegnazione (deve essere la persona assegnata) |
| POST | `/signup` | JWT | — | Iscrizione autonoma a una posizione. Corpo: `{ positionId }`. La posizione deve consentire l'iscrizione autonoma e avere posti disponibili; crea un'assegnazione Accepted. Respinta con "Signup deadline has passed" una volta superata la scadenza di iscrizione del piano (calcolata a ritroso dal primo orario del culto, come sopra) |
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

| Metodo | Percorso | Auth | Permesso | Descrizione |
|--------|----------|------|----------|-------------|
| GET | `/:id` | JWT | — | Ottiene una data di indisponibilità tramite ID |
| GET | `/ids?ids=` | JWT | — | Ottiene più date di indisponibilità tramite ID separati da virgole |
| GET | `/my` | JWT | — | Ottiene le date di indisponibilità dell'utente corrente |
| GET | `/upcoming` | JWT | — | Ottiene tutte le prossime date di indisponibilità della chiesa |
| POST | `/` | JWT | — | Crea o aggiorna date di indisponibilità (imposta `personId` all'utente corrente se non fornito) |
| DELETE | `/:id` | JWT | — | Elimina una data di indisponibilità |

## Attività

Percorso base: `/doing/tasks`

| Metodo | Percorso | Auth | Permesso | Descrizione |
|--------|----------|------|----------|-------------|
| GET | `/` | JWT | — | Ottiene le attività aperte dell'utente corrente |
| GET | `/:id` | JWT | — | Ottiene un'attività tramite ID |
| GET | `/:id/contact` | JWT | Può visualizzare la scheda | Informazioni di contatto della persona a cui si riferisce una scheda del flusso: `{ personId, displayName, mobilePhone, email }`. Permette a un incaricato di contatto assegnato senza accesso alle Persone di raggiungere la persona |
| GET | `/closed` | JWT | — | Ottiene le attività chiuse dell'utente corrente |
| GET | `/timeline?taskIds=` | JWT | — | Ottiene i dati della timeline per le attività tramite ID separati da virgole |
| GET | `/directoryUpdate/:personId` | JWT | — | Ottiene l'attività di aggiornamento della rubrica per una persona |
| POST | `/` | JWT | — | Crea o aggiorna attività. Aggiungi `?type=directoryUpdate` per gestire le attività di aggiornamento della rubrica (carica automaticamente le foto) |
| POST | `/:id/conversation` | JWT | `tasks.edit` o assegnatario della scheda | Collega la conversazione di note a una scheda. Corpo: `{ conversationId }`. Vince la prima conversazione collegata; le chiamate successive restituiscono la scheda invariata |
| POST | `/loadForGroups` | JWT | — | Carica le attività per gruppi specifici. Corpo: `{ groupIds: [], status: "Open" }` |

## Automazioni

Percorso base: `/doing/automations`

| Metodo | Percorso | Auth | Permesso | Descrizione |
|--------|----------|------|----------|-------------|
| GET | `/` | JWT | — | Elenca tutte le automazioni della chiesa |
| GET | `/:id` | JWT | — | Ottiene un'automazione tramite ID |
| GET | `/check` | Public | — | Avvia un controllo di tutte le automazioni |
| POST | `/` | JWT | — | Crea o aggiorna automazioni |
| DELETE | `/:id` | JWT | — | Elimina un'automazione |

## Azioni

Percorso base: `/doing/actions`

Le azioni definiscono cosa accade quando viene attivata un'automazione.

| Metodo | Percorso | Auth | Permesso | Descrizione |
|--------|----------|------|----------|-------------|
| GET | `/:id` | JWT | — | Ottiene un'azione tramite ID |
| GET | `/automation/:id` | JWT | — | Ottiene tutte le azioni di un'automazione |
| POST | `/` | JWT | — | Crea o aggiorna azioni |
| DELETE | `/:id` | JWT | — | Elimina un'azione |

## Condizioni

Percorso base: `/doing/conditions`

Le condizioni definiscono i criteri che attivano un'automazione.

| Metodo | Percorso | Auth | Permesso | Descrizione |
|--------|----------|------|----------|-------------|
| GET | `/:id` | JWT | — | Ottiene una condizione tramite ID |
| GET | `/automation/:id` | JWT | — | Ottiene tutte le condizioni di un'automazione |
| POST | `/` | JWT | — | Crea o aggiorna condizioni |
| DELETE | `/:id` | JWT | — | Elimina una condizione |

## Congiunzioni

Percorso base: `/doing/conjunctions`

Le congiunzioni collegano più condizioni in un'automazione (logica AND/OR).

| Metodo | Percorso | Auth | Permesso | Descrizione |
|--------|----------|------|----------|-------------|
| GET | `/:id` | JWT | — | Ottiene una congiunzione tramite ID |
| GET | `/automation/:id` | JWT | — | Ottiene tutte le congiunzioni di un'automazione |
| POST | `/` | JWT | — | Crea o aggiorna congiunzioni |
| DELETE | `/:id` | JWT | — | Elimina una congiunzione |

## Autorizzazioni dei fornitori di contenuti

Percorso base: `/doing/contentProviderAuths`

Estende la classe base CRUD (GET `/`, GET `/:id`, POST `/`, DELETE `/:id` — senza controlli dei permessi).

Gestisce i record di autenticazione OAuth per i fornitori di contenuti esterni (ad esempio le integrazioni con software di presentazione).

`accessToken` e `refreshToken` sono cifrati a riposo con `EncryptionHelper` e decifrati in lettura, quindi l'API restituisce comunque token in chiaro. I record salvati prima della cifratura contengono testo in chiaro (che non contiene mai `|`); vengono restituiti così come sono e cifrati la volta successiva in cui vengono salvati.

| Metodo | Percorso | Auth | Permesso | Descrizione |
|--------|----------|------|----------|-------------|
| GET | `/` | JWT | — | Elenca tutte le autorizzazioni dei fornitori di contenuti |
| GET | `/:id` | JWT | — | Ottiene un'autorizzazione dei fornitori di contenuti tramite ID |
| GET | `/ids?ids=` | JWT | — | Ottiene più autorizzazioni dei fornitori di contenuti tramite ID separati da virgole |
| GET | `/ministry/:ministryId` | JWT | — | Ottiene tutte le autorizzazioni dei fornitori di contenuti per un ministero |
| GET | `/ministry/:ministryId/:providerId` | JWT | — | Ottiene il record di autorizzazione per un ministero e un fornitore specifici |
| POST | `/` | JWT | — | Crea o aggiorna autorizzazioni dei fornitori di contenuti |
| DELETE | `/:id` | JWT | — | Elimina un'autorizzazione dei fornitori di contenuti |

## Proxy del fornitore

Percorso base: `/doing/providerProxy`

Inoltra le richieste ai fornitori di contenuti esterni (ad esempio ProPresenter, EasyWorship). Gestisce automaticamente il rinnovo dei token quando scadono.

| Metodo | Percorso | Auth | Permesso | Descrizione |
|--------|----------|------|----------|-------------|
| POST | `/browse` | JWT | — | Sfoglia i file del fornitore di contenuti. Corpo: `{ ministryId, providerId, path }` |
| POST | `/getPresentations` | JWT | — | Ottiene le presentazioni da un fornitore di contenuti. Corpo: `{ ministryId, providerId, path }` |
| POST | `/getPlaylist` | JWT | — | Ottiene una playlist da un fornitore di contenuti. Corpo: `{ ministryId, providerId, path, resolution }` |
| POST | `/getInstructions` | JWT | — | Ottiene le istruzioni per un elemento di contenuto. Corpo: `{ ministryId, providerId, path }` |
| POST | `/getExpandedInstructions` | JWT | — | Ottiene le istruzioni estese per un elemento di contenuto. Corpo: `{ ministryId, providerId, path }` |

## Pagine correlate

- [Endpoint di Membership](./membership) — Persone, gruppi, ruoli e permessi
- [Endpoint di Attendance](./attendance) — Tracciamento di culti e visite
- [Struttura del modulo](../module-structure) — Schemi di organizzazione del codice
