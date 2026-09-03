---
title: "Audit Log e Batch Undoable"
---

# Audit Log e Batch Undoable

<div class="article-intro">

Ogni mutazione avviata dall'utente nell'Api viene registrata — chi, cosa, quando e da dove — in tutti i moduli, senza alcun wiring per-controller. Su quel registro è costruito un livello batch: un'importazione o un'azione in blocco può essere taggata come batch e successivamente **annullata** riga per riga, nello stile di Planning Center. Entrambi vivono in una singola tabella `auditLogs` nel database di membership e sono guidati interamente da un singolo punto di strozzatura, `BaseController.actionWrapper`.

</div>

## Panoramica

Ogni richiesta di mutazione (POST/PUT/PATCH/DELETE) passa attraverso `BaseController.actionWrapper`, che deriva i campi di audit dalla richiesta. Modalità normale: esegui l'azione e registra. Modalità batch: scatta le immagini prima dell'azione e registra con il `batchId`.

## Cosa Viene Registrato

L'audit è **attivo per impostazione predefinita su ogni verbo mutante su ogni route**. Gli audit registry sono principalmente per override e opt-out — gli endpoint bulk emettono **una riga di audit per id toccato**, rendendo il batch facilmente undoable.

## Dove Vivono i Dati

Una singola tabella `auditLogs` nel database **membership** supporta ogni modulo. Colonne: `id, churchId, userId, category, action, entityType, entityId, details (MEDIUMTEXT JSON string), ipAddress, module, batchId, created`.

Prima di archiviare qualsiasi payload `details`, `AuditLogHelper.capDetails()` esegue `sanitizeValue()` su di esso:

- **I tasti segreti vengono redatti.** Qualsiasi campo il cui nome minuscolo si trova in `SENSITIVE_KEYS` viene sostituito con `"[redacted]"`.
- **Gli scalari enormi vengono rimossi.** Qualsiasi string over 4 KB diventa `"[stripped]"`.
- **Le righe sovradimensionate vengono limitate.** Se il JSON serializzato supera ~64 KB l'intero payload viene sostituito con `{ truncated: true }`.

## Batch e Undo

Un **batch** raggruppa un insieme di mutazioni in modo che possano essere esaminate e invertite insieme. Quando `POST /membership/batches/:id/undo` viene chiamato, `BatchUndoHelper.undo()` carica le righe di audit del batch, le raggruppa per entità e le inverte:

- **created** → hard-delete la riga.
- **updated** → scrivi `details.before` indietro.
- **deleted** → re-insert `details.before`.

Il conflitto guard protegge dalle modifiche apportate dopo il batch: se un'entità è stata modificata successivamente, viene saltata e segnalata.
