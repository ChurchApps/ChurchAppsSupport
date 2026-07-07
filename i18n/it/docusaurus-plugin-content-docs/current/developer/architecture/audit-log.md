---
title: "Registro di audit e batch annullabili"
---

# Registro di audit e batch annullabili

<div class="article-intro">

Ogni mutazione avviata dall'utente nell'Api viene registrata — chi, cosa, quando, e da dove — in tutti i moduli, senza alcun cablaggio per controller. Su quel registro è costruito uno strato batch: un'importazione o un'azione in massa può essere contrassegnata come batch e successivamente **annullata** riga per riga, in stile Planning Center. Entrambe si trovano in una singola tabella `auditLogs` nel database di appartenenza e sono guidate interamente da un unico punto di controllo, `BaseController.actionWrapper`. Questa pagina mappa cosa viene controllato, dove risiedono i dati, i compromessi di prestazione che lo determinano, e come l'annullamento inverte un batch in modo sicuro senza transazioni tra database.

</div>

## Panoramica

```
ogni richiesta mutante (POST/PUT/PATCH/DELETE)
        │
        ▼
BaseController.actionWrapper ──▶ ricava {module, entityType, category, action}
        │                         da req.baseUrl + method  (AUDIT_REGISTRY = solo override/opt-out)
        │
        ├─ modalità normale ─────────▶ esegui azione ─▶ attendi AuditLogHelper.log(valori-dopo)  ──┐
        │                                        (i delete catturano anche un'immagine prima)      │
        │                                                                                  ▼
        └─ X-Batch-Id presente ──▶ snapshot immagini-prima (rigorose) ─▶ esegui azione ─▶ righe di audit contrassegnate batchId
                                                                                           │
                                                                                           ▼
                                                             auditLogs  (DB appartenenza, una tabella, tutti i moduli)
                                                                                           │
   POST /membership/batches/:id/undo ──▶ BatchUndoHelper ──▶ cammina righe al contrario, per entità ┘
                                          conflict guard → ripristina / elimina / reinserisci
```

Due fatti strutturali guidano tutto il resto:

1. **Lo strato controller è l'unico posto che conosce l'attore.** I repository non vedono mai `AuthenticatedUser`; solo i controller hanno `au`. Tutti i controller di ogni modulo passano già attraverso `BaseController.actionWrapper`, quindi è lì che l'auditing si aggancia — nessuna firma di repo cambia da nessuna parte.
2. **Una tabella serve tutti i moduli.** Le righe di audit per donazioni, presenze, contenuti, ecc. sono tutte scritte nel `auditLogs` del DB di appartenenza tramite `RepoManager.getRepos("membership")`, anche da un controller non di appartenenza. "Tutto quello che Jane ha cambiato oggi" rimane una singola query.

## Cosa viene controllato

Il controllo è **attivo per default su ogni verbo mutante su ogni rotta**. `actionWrapper` ricava i campi di audit dalla richiesta senza alcuna configurazione per rotta:

| Campo | Ricavato da |
|-------|------------|
| `module` | `this.moduleName` (il modulo proprietario) |
| `entityType` | ultimo segmento singolarizzato di `req.baseUrl` (ad es. `/membership/people` → `person`) |
| `category` | per default è `entityType` |
| `action` | `${entityType}_saved` per `POST /`, `${entityType}_deleted` per `DELETE /:id`, altrimenti `${entityType}_${method}:${routePath}` così le rotte non CRUD sub (ad es. `task_post:/:id/move`) vengono catturate automaticamente |

`BaseController.AUDIT_REGISTRY` è **solo per override e opt-out** — non è una whitelist. Una rotta appare lì per rinominare la sua categoria/entityType, per dichiarare `{ dbModule, table }` (che la rende batch-capable e undo-capable), per contrassegnarla come `sensitive` (controlla mutazioni anonime), o per spegnerla con `optOut: true`.

**Elenco di opt-out** (percorsi di scrittura firehose che annicherebbero il registro): le `visits` / `visitsessions` / `sessions` / `checkin` di presenza (la tempesta di check-in domenicale) e `messages` / `connections` / `devices` di messaggistica (chat e presenza). Tutto il resto si registra.

**Endpoint bulk** (`people/bulk-delete`, `people/bulk-update`, `groupmembers/bulk-add`, `groupmembers/bulk-remove`) sono registrati in `BULK_ROUTES` ed emettono **una riga di audit per id toccato**, così un'importazione di 10k persone produce 10k righe — quella granularità per entità è esattamente quello che rende il batch annullabile.

**Mutazioni anonime** (`actionWrapperAnon` — donazioni guest, registrazioni guest, invii di moduli) vengono controllate solo per le rotte registry-flagged `sensitive`, scritte con `userId="anonymous"` più l'IP del client. Le donazioni guidano l'elenco; quel percorso ha una vera storia di regressione.

### Redazione di segreti e limiti di dimensione

Prima che qualsiasi payload `details` sia memorizzato, `AuditLogHelper.capDetails()` esegue `sanitizeValue()` su di esso:

- **Le chiavi segrete vengono redatte.** Qualsiasi campo il cui nome minuscolo è in `SENSITIVE_KEYS` (`password`, `token`, `cvv`, `cardnumber`, `routing_number`, `accesstoken`, `clientsecret`, …) viene sostituito con `"[redacted]"`.
- **Gli scalari enormi vengono spogliati.** Qualsiasi URI `data:` o stringa su 4 KB (foto base64, blob) diventa `"[stripped]"`.
- **Le righe di grandi dimensioni vengono limitate.** Se il JSON serializzato supera ~64 KB l'intero payload viene sostituito con `{ truncated: true }`. Le righe troncate sono ancora visualizzabili — ma **non annullabili** (non c'è un'immagine prima/dopo per ripristinare).

## Dove risiedono i dati

Una singola tabella `auditLogs` nel database di **appartenenza** supporta ogni modulo. Colonne: `id, churchId, userId, category, action, entityType, entityId, details (MEDIUMTEXT stringa JSON), ipAddress, module, batchId, created`. La migrazione `tools/migrations/membership/2026-07-04_audit_universal.ts` aggiunge `module` + `batchId`, allarga `details` da `TEXT` a `MEDIUMTEXT`, aggiunge indici `ix_auditLogs_batch (batchId)` e `ix_auditLogs_entity (churchId, module, entityType, entityId, created)`, e crea la tabella `batches`. La colonna `module` esiste precisamente così le collisioni `entityType` tra moduli (`note`, `setting` esistono in vari) rimangono filtrabili, e l'indice entità è quello che alimenta sia la cronologia per entità che il conflict guard di undo.

Le scritture tra moduli passano attraverso `RepoManager.getRepos("membership")` dall'interno del wrapper. L'ordine è deliberato: **il main write si impegna nel DB del modulo per primo, l'insert di audit secondo.** In modalità normale un fallimento di audit-insert è ingoiato (`console.error`, Sentry lo raccoglie) — l'audit è consultivo e non deve mai fallire una richiesta utente. In **modalità batch è rigoroso** (vedi sotto).

:::info Perché non trigger, CDC, o tabelle per modulo?
- **I trigger MySQL** non conoscono l'utente agente (la connessione non ha `au`), e significherebbe mantenere insiemi di trigger su ogni schema.
- **binlog / CDC** è un intero progetto infrastrutturale con lo stesso problema di identità dell'attore.
- **Threading `userId` attraverso ogni repo** significherebbe toccare centinaia di file per spostare informazioni che lo strato controller ha già.
- **Tabelle di audit per modulo** significherebbe 7× l'impianto e query fan-out per qualsiasi domanda tra moduli. Una tabella al punto di controllo controller è il design least-code che cattura ancora l'attore.
:::

## Posizione sulle prestazioni

Il percorso caldo è deliberatamente economico; il costo è pagato solo dove acquista qualcosa.

- **Nessuna lettura-prima-scrittura su normali aggiornamenti.** Un salvataggio regolare non carica il vecchio record. I **valori after inviati** sono memorizzati in `details.after`; l'interfaccia utente ricostruisce vecchio→nuovo al *tempo di visualizzazione* diffondendo contro la precedente riga di audit dell'entità. Una query al tempo di visualizzazione, zero costo al tempo di scrittura. I campi mai toccati dal lancio semplicemente non mostrano alcun valore "vecchio" — accettabile.
- **I delete ottengo un'immagine prima.** `DELETE /:id` su una rotta registry con `{ dbModule, table }` carica genericamente la riga per primo e la memorizza in `details.before`. I delete sono rari e l'immagine before è l'intero valore forense.
- **La modalità batch è l'unica lettura-prima-scrittura sistematica**, ed è opt-in — un'operazione bulk/importazione è già costosa, quindi N letture di snapshot sono il prezzo dell'undo.
- **Gli insert di audit vengono attesi.** `actionWrapper` raccoglie le promesse di log e `attendi Promise.allSettled(...)` prima di ritornare. Questo è il singolo invariante più importante: su Lambda il contenitore **congela l'istante in cui la risposta ritorna**, così un insert non atteso viene silenziosamente eliminato. "Fire and forget" qui significa *gli errori non falliscono mai la richiesta*, non *non attendi* — un singolo insert sul pool di appartenenza già caldo è ~1–3 ms.

## Batch e undo

Un **batch** raggruppa un insieme di mutazioni in modo che possano essere riviste e invertite insieme. Ci sono due modi per aprirne uno:

- **Esplicito:** `POST /membership/batches { label, source }` ritorna un `batchId`. Il client (B1Transfer, un'interfaccia di importazione B1Admin) invia quindi `X-Batch-Id: <id>` su ogni salvataggio/elimina successivo. `POST /membership/batches/:id/complete` lo chiude e timbra `itemCount`.
- **Implicito:** i quattro endpoint bulk aprono, popolano, e completano il loro batch proprio dentro la singola richiesta, ritornando il `batchId` nella risposta.

La tabella `batches` (DB di appartenenza): `id, churchId, userId, label, source, status (open|completed|undone|partial|failed), itemCount, created, completedAt, undoneAt`.

### La modalità batch è rigorosa

Quando `X-Batch-Id` è presente, `actionWrapper` stringe ogni protezione (`writeBatchAuditRows`):

1. Il batch deve esistere, essere `open`, e appartenere a `au.churchId` — altrimenti **403**.
2. La rotta deve essere batch-capable (`{ dbModule, table }` nel registry) — altrimenti **400**.
3. Prima che l'azione esegua, le immagini before per tutti gli id interessati vengono caricate in **una** query `WHERE id IN (...) AND churchId = ?`. Se quella lettura di snapshot fallisce, la richiesta **fallisce 500 e l'azione non esegue** — la modalità batch non deve mai produrre silenziosamente un registro non-annullabile. (La modalità normale, per contrasto, è best-effort e ingoia i fallimenti di snapshot.)
4. Dopo che l'azione riesce, una riga di audit per entità viene scritta con `batchId`, `details.before`, e `details.after`, più un **marcatore di creazione** esplicito per le righe che il batch ha creato.

### Undo

`POST /membership/batches/:id/undo` (permesso: creatore del batch o `Permissions.server.admin`). Rifiuta se il batch non è `completed` o è più vecchio della **finestra undo di 30 giorni**. `BatchUndoHelper.undo()` poi:

1. Carica le righe di audit del batch e **le raggruppa per `(module, entityType, entityId)`.** Un'entità toccata più volte all'interno di un batch viene invertita **una volta**, tornando al suo vero stato pre-batch — l'immagine before più antica, o un delete se il batch l'ha creato. Questo è perché undo non replica naivamente ogni riga: ripristinare uno snapshot intermedio mid-batch sarebbe sbagliato.
2. Per ogni entità, esegue prima il **conflict guard**: `auditLog.hasLaterModification()` chiede se qualsiasi voce di audit *successiva* esiste per quella stessa `(module, entityType, entityId)` fuori da questo batch. Se così, l'entità è stata modificata dopo l'importazione — è **saltata e segnalata**, mai schiacciata. Questo riusa il registro di audit stesso come rilevatore di modifica; nessuna colonna `modifiedAt` è necessaria su alcuna tabella.
3. Inverte per l'op registrato, risolvendo `{ dbModule, table }` dal registry e utilizzando scritture Kysely generiche:
   - **created** → hard-delete la riga.
   - **updated** → scrivi `details.before` indietro.
   - **deleted** → reinserisci `details.before` (update-or-insert se una riga con quell'id è risorta).
4. Ogni inversione è essa stessa controllata (`action: "<entityType>_undone"`, nessun `batchId` — undo-of-undo è fuori di portata).

L'op è scelto dal **marcatore di creazione** esplicito, non è dedotto da un'immagine before mancante — un'immagine before legittimamente vuota o una riga troncata non deve essere scambiata per una creazione.

Il payload di risultato è `{ restored, skippedConflicts: [...], failed: [...], status }`; il batch si muove a `undone` (pulito) o `partial`. **Non c'è transazione tra DB** — undo è best-effort per riga, la stessa limitazione che Planning Center documenta per i profili fusi.

:::warning Le entità di effetto collaterale richiedono un hook `onUndo`
Invertire una creazione di `groupMember` deve anche scrivere `groupMemberHistory` ("left"), o le analitiche di churn silenziosamente si rompono — un invariante di workspace permanente. Tali entità registrano un callback `onUndo` in `AUDIT_REGISTRY` che ritorna `true` quando ha completamente gestito l'inversione, aggirando il percorso generico. `groupMembers` è il caso canonico (keyed da row id sul percorso esplicito ma da `personId` su endpoint bulk, e tracciato-storia su ogni aggiungi/rimuovi).
:::

## Superfici di consumo

Entrambe le superfici di amministrazione sono **in corso**; l'intento:

| Superficie | Repo | Scopo |
|---------|------|---------|
| **Pagina di registro di audit** | B1Admin (ManageChurch → Audit Log) | Filtra per modulo/categoria/utente/entità e renderizza diff vecchio→nuovo — per modifiche diffondendo contro la voce di audit precedente dell'entità, per delete da `details.before`. Supportato da `GET /membership/auditlogs`, controllato da `Permissions.server.admin`. |
| **Pagina batch** | B1Admin (stesso hub Impostazioni) | Elenca batch con stato e conteggi, **Visualizza risultati** (le righe di audit del batch tramite `GET /membership/batches/:id/results`), e un pulsante **Undo** che presenta il rapporto saltato-conflitto / fallito. |
| **Importa batch** | B1Transfer | Apri un batch, invia `X-Batch-Id` sulle sue normali chiamate di salvataggio, completa alla fine — le importazioni diventano annullabili senza endpoint di importazione nuovi. Il `importKey` legacy rimane come marcatore di lignaggio solo-creazioni, sostituito per undo. |

## Tranelli che una futura modifica non deve regressione

- **Gli insert di audit devono rimanere attesi.** `AuditLogHelper.log(...)` non atteso viene eliminato dal congelamento Lambda. Raccogli promesse e `attendi Promise.allSettled` prima di ritornare.
- **Kysely elimina `undefined` da `.set()`/`.values()`.** Al ripristino, una colonna cancellata sopravviverebbe intatta. `BatchUndoHelper` converte ogni campo assente in `null` esplicito (`nullify`) — non agirare mai per una scrittura diretta "più veloce".
- **La retention deve rimanere ben al di sopra della finestra undo.** `AuditLogRepo.deleteOld()` esegue sul timer notturno (retention predefinita di 365 giorni); la finestra undo è di 30 giorni. Se la retention scende mai verso la finestra, i registri di undo vengono purificati da sotto batch aperti.
- **Le righe troncate non sono annullabili.** Un payload `{ truncated: true }` non ha immagine before/after; undo lo segnala come `failed`, mai indovina.
- **L'ordine è module-write-then-audit.** Non spostare mai l'insert di audit davanti alla vera scrittura, e mantenerlo rigoroso-in-batch / consultivo-in-normale.

## Inventario file

| Area | File |
|------|-------|
| Wrapper / registry | `Api/src/shared/infrastructure/BaseController.ts` (`AUDIT_REGISTRY`, `BULK_ROUTES`, `actionWrapper`, `actionWrapperAnon`, snapshot + write-rows) |
| Motore di undo | `Api/src/shared/infrastructure/BatchUndoHelper.ts` |
| Aiutante di audit | `Api/src/modules/membership/helpers/AuditLogHelper.ts` (`log`, `capDetails`/`sanitizeValue`, `diffFields`, `getClientIp`) |
| Controller | `Api/src/modules/membership/controllers/AuditLogController.ts`, `BatchController.ts` |
| Modelli / repo | `Api/src/modules/membership/models/AuditLog.ts`, `Batch.ts`; `repositories/AuditLogRepo.ts` (`loadFiltered`, `loadForBatch`, `hasLaterModification`, `deleteOld`), `BatchRepo.ts` |
| Migrazione | `Api/tools/migrations/membership/2026-07-04_audit_universal.ts` |
| Interfaccia utente di amministrazione (in corso) | B1Admin Audit Log + Batches pages; B1Transfer import-batch header |

## Pagine correlate

- [Struttura del modulo](../api/module-structure) — come un controller non di appartenenza raggiunge i repo di appartenenza attraverso `RepoManager`
- [Donazioni](./giving) — i percorsi di scrittura di donazione che vengono controllati come `sensitive` anche quando anonimi
- [Endpoint di appartenenza](../api/endpoints/membership) — la superficie REST che porta `X-Batch-Id` ed espone `/auditlogs` e `/batches`
