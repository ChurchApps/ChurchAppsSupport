---
title: "Registro di audit e batch annullabili"
---

# Registro di audit e batch annullabili

<div class="article-intro">

Ogni mutazione avviata dall'utente nell'Api viene registrata — chi, cosa, quando, e da dove — in tutti i moduli, senza alcun cablaggio per controller. Sopra quel registro c'è uno strato batch: un'importazione o un'azione in blocco può essere contrassegnata come batch e successivamente **annullata** riga per riga, in stile Planning Center. Entrambi vivono in un'unica tabella `auditLogs` nel database di membership e sono guidati interamente da un unico punto di passaggio, `BaseController.actionWrapper`. Questa pagina mappa cosa viene controllato, dove risiedono i dati, i compromessi di prestazioni che lo determinano, e come l'annullamento inverte un batch in modo sicuro senza transazioni tra database.

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
        └─ X-Batch-Id presente ──▶ snapshot immagini-prima (rigoroso) ─▶ esegui azione ─▶ righe di audit taggate batchId
                                                                                           │
                                                                                           ▼
                                                             auditLogs  (DB membership, una tabella, tutti i moduli)
                                                                                           │
   POST /membership/batches/:id/undo ──▶ BatchUndoHelper ──▶ percorre le righe al contrario, per entità ┘
                                          conflict guard → ripristina / elimina / reinserisce
```

Due fatti strutturali guidano tutto il resto:

1. **Lo strato controller è l'unico posto che conosce l'attore.** I repository non vedono mai `AuthenticatedUser`; solo i controller hanno `au`. I controller di ogni modulo passano già attraverso `BaseController.actionWrapper`, quindi è lì che l'auditing si aggancia — nessuna firma di repository cambia da nessuna parte.
2. **Una tabella serve tutti i moduli.** Le righe di audit per donazioni, presenze, contenuti, ecc. sono tutte scritte nella `auditLogs` del DB di membership tramite `RepoManager.getRepos("membership")`, anche da un controller non-membership. "Tutto ciò che Jane ha cambiato oggi" rimane una singola query.

## Cosa viene controllato

L'auditing è **attivo per default su ogni verbo mutante su ogni rotta**. `actionWrapper` ricava i campi di audit dalla richiesta senza alcuna configurazione per rotta:

| Campo | Ricavato da |
|-------|--------------|
| `module` | `this.moduleName` (il modulo proprietario) |
| `entityType` | ultimo segmento singolarizzato di `req.baseUrl` (ad es. `/membership/people` → `person`) |
| `category` | per default è `entityType` |
| `action` | `${entityType}_saved` per `POST /`, `${entityType}_deleted` per `DELETE /:id`, altrimenti `${entityType}_${method}:${routePath}` così le sotto-rotte non-CRUD (ad es. `task_post:/:id/move`) vengono catturate automaticamente |

`BaseController.AUDIT_REGISTRY` serve **solo per override e opt-out** — non è una allowlist. Una rotta vi compare per rinominare la sua categoria/entityType, per dichiarare `{ dbModule, table }` (che la rende capace di batch e annullamento), per contrassegnarla come `sensitive` (audita le mutazioni anonime), o per disattivarla con `optOut: true`.

**Elenco di opt-out** (percorsi di scrittura firehose che annegherebbero il registro): le `visits` / `visitsessions` / `sessions` / `checkin` delle presenze (la tempesta di check-in della domenica) e `messages` / `connections` / `devices` della messaggistica (chat e presenza). Tutto il resto viene registrato.

**Endpoint bulk** (`people/bulk-delete`, `people/bulk-update`, `groupmembers/bulk-add`, `groupmembers/bulk-remove`) sono registrati in `BULK_ROUTES` ed emettono **una riga di audit per ogni id toccato**, così un'importazione di 10mila persone produce 10mila righe — questa granularità per entità è esattamente ciò che rende il batch annullabile.

**Le mutazioni anonime** (`actionWrapperAnon` — donazioni guest, registrazioni guest, invii di moduli) vengono controllate solo per le rotte contrassegnate `sensitive` nel registro, scritte con `userId="anonymous"` più l'IP del client. Le donazioni guidano l'elenco; quel percorso ha una vera storia di regressioni.

### Redazione dei segreti e limiti di dimensione

Prima che qualsiasi payload `details` venga memorizzato, `AuditLogHelper.capDetails()` esegue `sanitizeValue()` su di esso:

- **Le chiavi segrete vengono redatte.** Qualsiasi campo il cui nome in minuscolo compare in `SENSITIVE_KEYS` (`password`, `token`, `cvv`, `cardnumber`, `routing_number`, `accesstoken`, `clientsecret`, …) viene sostituito con `"[redacted]"`.
- **Gli scalari enormi vengono spogliati.** Qualsiasi URI `data:` o stringa oltre i 4 KB (foto base64, blob) diventa `"[stripped]"`.
- **Le righe sovradimensionate vengono limitate.** Se il JSON serializzato supera ~64 KB, l'intero payload viene sostituito con `{ truncated: true }`. Le righe troncate rimangono visualizzabili — ma **non annullabili** (non c'è un'immagine prima/dopo da cui ripristinare).

## Dove risiedono i dati

Una singola tabella `auditLogs` nel database di **membership** supporta ogni modulo. Colonne: `id, churchId, userId, category, action, entityType, entityId, details (stringa JSON MEDIUMTEXT), ipAddress, module, batchId, created`. La migrazione `tools/migrations/membership/2026-07-04_audit_universal.ts` aggiunge `module` + `batchId`, allarga `details` da `TEXT` a `MEDIUMTEXT`, aggiunge gli indici `ix_auditLogs_batch (batchId)` e `ix_auditLogs_entity (churchId, module, entityType, entityId, created)`, e crea la tabella `batches`. La colonna `module` esiste proprio perché le collisioni di `entityType` tra moduli (`note`, `setting` esistono in diversi) rimangano filtrabili, e l'indice sull'entità è ciò che alimenta sia la cronologia per entità sia il conflict guard dell'annullamento.

Le scritture tra moduli passano attraverso `RepoManager.getRepos("membership")` dall'interno del wrapper. L'ordine è deliberato: **la scrittura principale si impegna nel DB del modulo per prima, l'inserimento di audit per secondo.** In modalità normale un fallimento dell'inserimento di audit viene inghiottito (`console.error`, Sentry lo raccoglie) — l'audit è consultivo e non deve mai far fallire una richiesta utente. In **modalità batch è rigoroso** (vedi sotto).

:::info Perché non trigger, CDC, o tabelle per modulo?
- **I trigger MySQL** non conoscono l'utente che agisce (la connessione non ha `au`), e significherebbe mantenere insiemi di trigger su ogni schema.
- **binlog / CDC** è un intero progetto infrastrutturale con lo stesso problema di identità dell'attore.
- **Passare `userId` attraverso ogni repository** significherebbe toccare centinaia di file per spostare informazioni che lo strato controller ha già.
- **Tabelle di audit per modulo** significherebbero 7× l'impianto e query fan-out per qualsiasi domanda tra moduli. Una tabella al punto di passaggio del controller è il design a minor codice che cattura comunque l'attore.
:::

## Posizione sulle prestazioni

Il percorso caldo è deliberatamente economico; il costo viene pagato solo dove acquista qualcosa.

- **Nessuna lettura-prima-della-scrittura sugli aggiornamenti normali.** Un salvataggio regolare **non** carica il vecchio record. I **valori dopo inviati** vengono memorizzati in `details.after`; l'interfaccia utente ricostruisce vecchio→nuovo al *momento della visualizzazione* confrontandoli con la riga di audit precedente dell'entità. Una query al momento della visualizzazione, costo zero al momento della scrittura. I campi mai toccati dal lancio semplicemente non mostrano alcun valore "vecchio" — accettabile.
- **I delete ottengono un'immagine prima.** `DELETE /:id` su una rotta del registro con `{ dbModule, table }` carica genericamente la riga per prima e la memorizza in `details.before`. I delete sono rari e l'immagine prima è l'intero valore forense.
- **La modalità batch è l'unica lettura-prima-della-scrittura sistematica**, ed è opt-in — un'operazione bulk/di importazione è già costosa, quindi N letture di snapshot sono il prezzo dell'annullamento.
- **Gli inserimenti di audit vengono attesi.** `actionWrapper` raccoglie le promise di log ed esegue `await Promise.allSettled(...)` prima di rispondere. Questo è l'invariante singolo più importante: su Lambda il contenitore **si congela nell'istante in cui la risposta ritorna**, quindi un inserimento non atteso viene eliminato silenziosamente. "Fire and forget" qui significa *gli errori non fanno mai fallire la richiesta*, non *non attendere* — un singolo inserimento sul pool di membership già caldo è ~1–3 ms.

## Batch e annullamento

Un **batch** raggruppa un insieme di mutazioni in modo che possano essere riviste e invertite insieme. Ci sono due modi per aprirne uno:

- **Esplicito:** `POST /membership/batches { label, source }` restituisce un `batchId`. Il client (B1Transfer, un'interfaccia di importazione B1Admin) invia poi `X-Batch-Id: <id>` su ogni salvataggio/eliminazione successivi. `POST /membership/batches/:id/complete` lo chiude e timbra `itemCount`.
- **Implicito:** i quattro endpoint bulk aprono, popolano e completano il proprio batch dentro la singola richiesta, restituendo il `batchId` nella risposta.

La tabella `batches` (DB membership): `id, churchId, userId, label, source, status (open|completed|undone|partial|failed), itemCount, created, completedAt, undoneAt`.

### La modalità batch è rigorosa

Quando `X-Batch-Id` è presente, `actionWrapper` stringe ogni protezione (`writeBatchAuditRows`):

1. Il batch deve esistere, essere `open`, e appartenere a `au.churchId` — altrimenti **403**.
2. La rotta deve essere batch-capable (`{ dbModule, table }` nel registro) — altrimenti **400**.
3. Prima che l'azione venga eseguita, le immagini prima per tutti gli id interessati vengono caricate in **una** query `WHERE id IN (...) AND churchId = ?`. Se quella lettura di snapshot fallisce, la richiesta **fallisce con 500 e l'azione non viene eseguita** — la modalità batch non deve mai produrre silenziosamente un registro non annullabile. (La modalità normale, al contrario, è best-effort e inghiotte i fallimenti di snapshot.)
4. Dopo che l'azione riesce, una riga di audit per entità viene scritta con `batchId`, `details.before`, e `details.after`, più un **marcatore di creazione** esplicito per le righe che il batch ha creato.

### Annullamento

`POST /membership/batches/:id/undo` (permesso: creatore del batch o `Permissions.server.admin`). Rifiuta se il batch non è `completed` o è più vecchio della **finestra di annullamento di 30 giorni**. `BatchUndoHelper.undo()` poi:

1. Carica le righe di audit del batch e **le raggruppa per `(module, entityType, entityId)`.** Un'entità toccata più volte all'interno di un batch viene invertita **una sola volta**, tornando al suo vero stato pre-batch — l'immagine prima più antica, o un delete se il batch l'ha creata. Questo è il motivo per cui l'annullamento non riproduce ingenuamente ogni riga: ripristinare uno snapshot intermedio a metà batch sarebbe sbagliato.
2. Per ogni entità, esegue prima il **conflict guard**: `auditLog.hasLaterModification()` chiede se esiste una voce di audit *successiva* per quella stessa `(module, entityType, entityId)` fuori da questo batch. In tal caso, l'entità è stata modificata dopo l'importazione — viene **saltata e segnalata**, mai sovrascritta. Questo riutilizza il registro di audit stesso come rilevatore di modifiche; non è necessaria alcuna colonna `modifiedAt` su nessuna tabella.
3. Inverte in base all'operazione registrata, risolvendo `{ dbModule, table }` dal registro e usando scritture Kysely generiche:
   - **created** → elimina definitivamente la riga.
   - **updated** → riscrive `details.before`.
   - **deleted** → reinserisce `details.before` (update-or-insert se una riga con quell'id è riemersa).
4. Ogni inversione viene essa stessa auditata (`action: "<entityType>_undone"`, nessun `batchId` — l'annullamento di un annullamento è fuori ambito).

L'operazione viene scelta in base al **marcatore di creazione** esplicito, non dedotta da un'immagine prima mancante — un'immagine prima legittimamente vuota o una riga troncata non deve essere scambiata per una creazione.

Il payload di risultato è `{ restored, skippedConflicts: [...], failed: [...], status }`; il batch passa a `undone` (pulito) o `partial`. **Non c'è transazione tra database** — l'annullamento è best-effort per riga, la stessa limitazione che Planning Center documenta per i profili uniti.

:::warning Le entità con effetti collaterali richiedono un hook `onUndo`
Invertire una creazione di `groupMember` deve anche scrivere `groupMemberHistory` ("left"), altrimenti l'analisi del churn si rompe silenziosamente — un invariante permanente del workspace. Tali entità registrano un callback `onUndo` in `AUDIT_REGISTRY` che restituisce `true` quando ha gestito completamente l'inversione, bypassando il percorso generico. `groupMembers` è il caso canonico (con chiave sull'id di riga nel percorso esplicito ma su `personId` negli endpoint bulk, e con storia tracciata su ogni aggiunta/rimozione).
:::

## Superfici di consumo

Entrambe le superfici di amministrazione sono **in corso**; l'intento:

| Superficie | Repo | Scopo |
|---------|------|---------|
| **Pagina Registro di audit** | B1Admin (ManageChurch → Audit Log) | Filtra per modulo/categoria/utente/entità e renderizza i diff vecchio→nuovo — per le modifiche confrontando con la voce di audit precedente dell'entità, per i delete da `details.before`. Alimentata da `GET /membership/auditlogs`, controllata da `Permissions.server.admin`. |
| **Pagina Batch** | B1Admin (stesso hub Impostazioni) | Elenca i batch con stato e conteggi, **Visualizza risultati** (le righe di audit del batch tramite `GET /membership/batches/:id/results`), e un pulsante **Annulla** che mostra il report dei conflitti saltati / falliti. |
| **Batch di importazione** | B1Transfer | Apre un batch, invia `X-Batch-Id` sulle sue normali chiamate di salvataggio, completa alla fine — le importazioni diventano annullabili senza nuovi endpoint di importazione. Il vecchio `importKey` rimane come marcatore di lignaggio solo-creazioni, sostituito per l'annullamento. |

## Trabocchetti che una futura modifica non deve reintrodurre

- **Gli inserimenti di audit devono rimanere attesi.** Un `AuditLogHelper.log(...)` non atteso viene eliminato dal congelamento di Lambda. Raccogli le promise e fai `await Promise.allSettled` prima di rispondere.
- **Kysely elimina `undefined` da `.set()`/`.values()`.** Al ripristino, una colonna cancellata sopravvivrebbe intatta. `BatchUndoHelper` converte ogni campo assente in `null` esplicito (`nullify`) — non aggirarlo mai per una scrittura diretta "più veloce".
- **La retention deve rimanere ben al di sopra della finestra di annullamento.** `AuditLogRepo.deleteOld()` viene eseguito sul timer notturno (retention predefinita di 365 giorni); la finestra di annullamento è di 30 giorni. Se la retention scendesse mai verso la finestra, i registri di annullamento verrebbero purgati sotto i batch aperti.
- **Le righe troncate non sono annullabili.** Un payload `{ truncated: true }` non ha immagine prima/dopo; l'annullamento lo segnala come `failed`, non indovina mai.
- **L'ordine è scrittura-modulo-poi-audit.** Non spostare mai l'inserimento di audit davanti alla scrittura reale, e mantienilo rigoroso-in-batch / consultivo-in-normale.

## Inventario dei file

| Area | File |
|------|-------|
| Wrapper / registro | `Api/src/shared/infrastructure/BaseController.ts` (`AUDIT_REGISTRY`, `BULK_ROUTES`, `actionWrapper`, `actionWrapperAnon`, snapshot + righe di scrittura) |
| Motore di annullamento | `Api/src/shared/infrastructure/BatchUndoHelper.ts` |
| Helper di audit | `Api/src/modules/membership/helpers/AuditLogHelper.ts` (`log`, `capDetails`/`sanitizeValue`, `diffFields`, `getClientIp`) |
| Controller | `Api/src/modules/membership/controllers/AuditLogController.ts`, `BatchController.ts` |
| Modelli / repository | `Api/src/modules/membership/models/AuditLog.ts`, `Batch.ts`; `repositories/AuditLogRepo.ts` (`loadFiltered`, `loadForBatch`, `hasLaterModification`, `deleteOld`), `BatchRepo.ts` |
| Migrazione | `Api/tools/migrations/membership/2026-07-04_audit_universal.ts` |
| UI Admin (in corso) | Pagine Audit Log + Batches di B1Admin; header import-batch di B1Transfer |

## Pagine correlate

- [Struttura del modulo](../api/module-structure) — come un controller non-membership raggiunge i repository di membership tramite `RepoManager`
- [Contributi](./giving) — i percorsi di scrittura delle donazioni che vengono auditati come `sensitive` anche quando anonimi
- [Endpoint di membership](../api/endpoints/membership) — la superficie REST che porta `X-Batch-Id` ed espone `/auditlogs` e `/batches`
