---
title: "Audit-Log & rückgängig machbare Batches"
---

# Audit-Log & rückgängig machbare Batches

<div class="article-intro">

Jede vom Nutzer ausgelöste Mutation in der Api wird erfasst — wer, was, wann und von wo — über alle Module hinweg, ohne jede Verdrahtung pro Controller. Über diesem Journal sitzt eine Batch-Schicht: Ein Import oder eine Massenaktion kann als Batch markiert und später zeilenweise **rückgängig gemacht** werden, im Planning-Center-Stil. Beides lebt in einer einzigen `auditLogs`-Tabelle in der Membership-Datenbank und wird vollständig von einem einzigen Engpass gesteuert, `BaseController.actionWrapper`. Diese Seite bildet ab, was protokolliert wird, wo die Daten liegen, die Performance-Abwägungen, die das prägen, und wie das Rückgängigmachen einen Batch sicher umkehrt, ohne datenbankübergreifende Transaktionen.

</div>

## Überblick

```
every mutating request (POST/PUT/PATCH/DELETE)
        │
        ▼
BaseController.actionWrapper ──▶ derive {module, entityType, category, action}
        │                         from req.baseUrl + method  (AUDIT_REGISTRY = overrides/opt-outs only)
        │
        ├─ normal mode ─────────▶ run action ─▶ await AuditLogHelper.log(after-values)  ──┐
        │                                        (deletes also capture a before-image)     │
        │                                                                                  ▼
        └─ X-Batch-Id present ──▶ snapshot before-images (strict) ─▶ run action ─▶ audit rows tagged batchId
                                                                                           │
                                                                                           ▼
                                                             auditLogs  (membership DB, one table, all modules)
                                                                                           │
   POST /membership/batches/:id/undo ──▶ BatchUndoHelper ──▶ walk rows reverse, per entity ┘
                                          conflict guard → restore / delete / re-insert
```

Zwei strukturelle Tatsachen treiben alles unten Beschriebene an:

1. **Die Controller-Schicht ist die einzige Stelle, die den Akteur kennt.** Repositories sehen niemals `AuthenticatedUser`; nur Controller besitzen `au`. Die Controller jedes Moduls durchlaufen bereits `BaseController.actionWrapper`, also ist dort, wo die Auditierung ansetzt — keine Repo-Signaturen ändern sich irgendwo.
2. **Eine Tabelle bedient alle Module.** Audit-Zeilen für Giving, Anwesenheit, Content usw. werden alle über `RepoManager.getRepos("membership")` in die `auditLogs`-Tabelle der Membership-Datenbank geschrieben, sogar von einem Nicht-Membership-Controller aus. „Alles, was Jane heute geändert hat" bleibt eine einzige Abfrage.

## Was auditiert wird

Auditierung ist **standardmäßig für jedes mutierende Verb auf jeder Route aktiv**. `actionWrapper` leitet die Audit-Felder aus der Anfrage ab, ohne jegliche Konfiguration pro Route:

| Feld | Abgeleitet aus |
|-------|--------------|
| `module` | `this.moduleName` (das besitzende Modul) |
| `entityType` | Singularisiertes letztes Segment von `req.baseUrl` (z. B. `/membership/people` → `person`) |
| `category` | Standardmäßig `entityType` |
| `action` | `${entityType}_saved` für `POST /`, `${entityType}_deleted` für `DELETE /:id`, sonst `${entityType}_${method}:${routePath}`, sodass Nicht-CRUD-Unterrouten (z. B. `task_post:/:id/move`) automatisch erfasst werden |

`BaseController.AUDIT_REGISTRY` ist **nur für Überschreibungen und Opt-outs** — sie ist keine Allowlist. Eine Route erscheint dort, um ihre Kategorie/ihren Entitätstyp umzubenennen, um `{ dbModule, table }` zu deklarieren (was sie Batch- und Undo-fähig macht), um sie als `sensitive` zu markieren (anonyme Mutationen auditieren) oder um sie mit `optOut: true` abzuschalten.

**Opt-out-Liste** (Firehose-Schreibpfade, die das Journal überfluten würden): Anwesenheit `visits` / `visitsessions` / `sessions` / `checkin` (der Sonntags-Check-in-Sturm) und Messaging `messages` / `connections` / `devices` (Chat und Präsenz). Alles andere protokolliert.

**Bulk-Endpunkte** (`people/bulk-delete`, `people/bulk-update`, `groupmembers/bulk-add`, `groupmembers/bulk-remove`) sind in `BULK_ROUTES` registriert und erzeugen **eine Audit-Zeile pro betroffener ID**, sodass ein Import von 10.000 Personen 10.000 Zeilen erzeugt — genau diese Granularität pro Entität ist es, was den Batch rückgängig machbar macht.

**Anonyme Mutationen** (`actionWrapperAnon` — Gastspenden, Gastanmeldung, Formulareinreichungen) werden nur für in der Registry als `sensitive` markierte Routen auditiert, geschrieben mit `userId="anonymous"` plus der Client-IP. Spenden führen die Liste an; dieser Pfad hat eine echte Regressionsgeschichte.

### Redaktion von Geheimnissen und Größenobergrenzen

Bevor irgendeine `details`-Payload gespeichert wird, führt `AuditLogHelper.capDetails()` `sanitizeValue()` darüber aus:

- **Geheime Schlüssel werden geschwärzt.** Jedes Feld, dessen kleingeschriebener Name in `SENSITIVE_KEYS` steht (`password`, `token`, `cvv`, `cardnumber`, `routing_number`, `accesstoken`, `clientsecret`, …), wird durch `"[redacted]"` ersetzt.
- **Riesige Skalare werden entfernt.** Jede `data:`-URI oder jeder String über 4 KB (Base64-Fotos, Blobs) wird zu `"[stripped]"`.
- **Übergroße Zeilen werden gedeckelt.** Wenn das serialisierte JSON ~64 KB überschreitet, wird die gesamte Payload durch `{ truncated: true }` ersetzt. Gekürzte Zeilen sind weiterhin einsehbar — aber **nicht rückgängig machbar** (es gibt kein Vorher-/Nachher-Bild, aus dem wiederhergestellt werden könnte).

## Wo die Daten liegen

Eine einzige `auditLogs`-Tabelle in der **Membership**-Datenbank bedient jedes Modul. Spalten: `id, churchId, userId, category, action, entityType, entityId, details (MEDIUMTEXT JSON string), ipAddress, module, batchId, created`. Die Migration `tools/migrations/membership/2026-07-04_audit_universal.ts` fügt `module` + `batchId` hinzu, erweitert `details` von `TEXT` auf `MEDIUMTEXT`, fügt die Indizes `ix_auditLogs_batch (batchId)` und `ix_auditLogs_entity (churchId, module, entityType, entityId, created)` hinzu und erstellt die Tabelle `batches`. Die Spalte `module` existiert genau deshalb, damit `entityType`-Kollisionen zwischen Modulen (`note`, `setting` existieren in mehreren) filterbar bleiben, und der Entitätsindex ist es, der sowohl die Historie pro Entität als auch den Konfliktwächter beim Rückgängigmachen antreibt.

Modulübergreifende Schreibvorgänge laufen innerhalb des Wrappers über `RepoManager.getRepos("membership")`. Die Reihenfolge ist bewusst gewählt: **Der Hauptschreibvorgang wird zuerst in der Modul-Datenbank committet, der Audit-Insert erst danach.** Im Normalmodus wird ein Fehler beim Audit-Insert verschluckt (`console.error`, Sentry greift ihn auf) — Audit ist beratend und darf niemals die Anfrage eines Nutzers scheitern lassen. Im **Batch-Modus ist es strikt** (siehe unten).

:::info Warum keine Trigger, CDC oder Tabellen pro Modul?
- **MySQL-Trigger** kennen den handelnden Nutzer nicht (die Verbindung hat kein `au`), und würde bedeuten, Trigger-Sätze über jedes Schema hinweg pflegen zu müssen.
- **binlog / CDC** ist ein ganzes Infrastrukturprojekt mit demselben Akteur-Identitätsproblem.
- **`userId` durch jedes Repo hindurchzuschleifen** würde Hunderte Dateien berühren, um Informationen zu bewegen, die die Controller-Schicht bereits hat.
- **Audit-Tabellen pro Modul** würden das 7-fache an Verrohrung und Fan-out-Abfragen für jede modulübergreifende Frage bedeuten. Eine Tabelle am Controller-Engpass ist das Design mit dem geringsten Code, das den Akteur dennoch erfasst.
:::

## Performance-Haltung

Der Hot Path ist bewusst günstig gehalten; die Kosten fallen nur dort an, wo sie sich lohnen.

- **Kein Lesen-vor-Schreiben bei normalen Updates.** Ein normales Speichern lädt den alten Datensatz **nicht**. Die **eingereichten Nachher-Werte** werden in `details.after` gespeichert; die UI rekonstruiert Alt→Neu zum *Anzeigezeitpunkt*, indem sie gegen die vorherige Audit-Zeile der Entität abgleicht. Eine Abfrage zum Anzeigezeitpunkt, keine Kosten zum Schreibzeitpunkt. Felder, die seit dem Start nie berührt wurden, zeigen einfach keinen „alten" Wert — akzeptabel.
- **Löschungen erhalten ein Vorher-Bild.** `DELETE /:id` auf einer Registry-Route mit `{ dbModule, table }` lädt die Zeile zuerst generisch und speichert sie in `details.before`. Löschungen sind selten, und das Vorher-Bild ist der gesamte forensische Wert.
- **Batch-Modus ist das einzige systematische Lesen-vor-Schreiben**, und es ist Opt-in — eine Bulk-/Import-Operation ist bereits teuer, sodass N Snapshot-Lesevorgänge der Preis für das Rückgängigmachen sind.
- **Audit-Inserts werden awaited.** `actionWrapper` sammelt die Log-Promises und führt `await Promise.allSettled(...)` aus, bevor zurückgegeben wird. Das ist die wichtigste einzelne Invariante: Auf Lambda **friert der Container in dem Moment ein, in dem die Antwort zurückgegeben wird**, sodass ein nicht awaited Insert stillschweigend verworfen wird. „Fire and forget" bedeutet hier *Fehler lassen die Anfrage nie scheitern*, nicht *nicht awaiten* — ein einzelner Insert auf dem bereits warmen Membership-Pool dauert ~1–3 ms.

## Batches und Rückgängigmachen

Ein **Batch** gruppiert eine Menge von Mutationen, sodass sie zusammen überprüft und rückgängig gemacht werden können. Es gibt zwei Wege, einen zu eröffnen:

- **Explizit:** `POST /membership/batches { label, source }` liefert eine `batchId`. Der Client (B1Transfer, eine B1Admin-Import-UI) sendet dann `X-Batch-Id: <id>` bei jedem nachfolgenden Speichern/Löschen. `POST /membership/batches/:id/complete` schließt ihn und stempelt `itemCount`.
- **Implizit:** Die vier Bulk-Endpunkte eröffnen, füllen und vervollständigen ihren eigenen Batch innerhalb der einzelnen Anfrage und geben die `batchId` in der Antwort zurück.

Die `batches`-Tabelle (Membership-DB): `id, churchId, userId, label, source, status (open|completed|undone|partial|failed), itemCount, created, completedAt, undoneAt`.

### Der Batch-Modus ist strikt

Wenn `X-Batch-Id` vorhanden ist, verschärft `actionWrapper` jede Schutzmaßnahme (`writeBatchAuditRows`):

1. Der Batch muss existieren, `open` sein und `au.churchId` gehören — sonst **403**.
2. Die Route muss Batch-fähig sein (`{ dbModule, table }` in der Registry) — sonst **400**.
3. Bevor die Aktion läuft, werden Vorher-Bilder für alle betroffenen IDs in **einer** `WHERE id IN (...) AND churchId = ?`-Abfrage geladen. Wenn dieser Snapshot-Lesevorgang fehlschlägt, schlägt die Anfrage **mit 500 fehl, und die Aktion wird nicht ausgeführt** — der Batch-Modus darf niemals stillschweigend ein nicht rückgängig machbares Journal erzeugen. (Der Normalmodus dagegen ist Best-Effort und verschluckt Snapshot-Fehler.)
4. Nachdem die Aktion erfolgreich war, wird eine Audit-Zeile pro Entität mit `batchId`, `details.before` und `details.after` geschrieben, plus ein expliziter **Erstellungs-Marker** für Zeilen, die der Batch erstellt hat.

### Rückgängigmachen

`POST /membership/batches/:id/undo` (Berechtigung: Batch-Ersteller oder `Permissions.server.admin`). Es verweigert, wenn der Batch nicht `completed` ist oder älter als das **30-Tage-Rückgängigmach-Fenster**. `BatchUndoHelper.undo()` tut dann:

1. Lädt die Audit-Zeilen des Batches und **gruppiert sie nach `(module, entityType, entityId)`.** Eine Entität, die innerhalb eines Batches mehrfach berührt wurde, wird **einmal** zurückgesetzt, auf ihren wahren Zustand vor dem Batch — das früheste Vorher-Bild, oder eine Löschung, wenn der Batch sie erstellt hat. Deshalb spielt das Rückgängigmachen nicht naiv jede Zeile erneut ab: das Wiederherstellen eines mittleren Batch-Zwischenschritts wäre falsch.
2. Für jede Entität läuft zuerst der **Konfliktwächter**: `auditLog.hasLaterModification()` fragt, ob eine *spätere* Audit-Eintragung für dieselbe `(module, entityType, entityId)` außerhalb dieses Batches existiert. Wenn ja, wurde die Entität nach dem Import bearbeitet — sie wird **übersprungen und gemeldet**, niemals überschrieben. Das nutzt das Audit-Log selbst als Änderungsdetektor wieder; keine `modifiedAt`-Spalten werden auf irgendeiner Tabelle benötigt.
3. Kehrt gemäß der erfassten Operation um, löst `{ dbModule, table }` aus der Registry auf und verwendet generische Kysely-Schreibvorgänge:
   - **created** → Zeile hart löschen.
   - **updated** → `details.before` zurückschreiben.
   - **deleted** → `details.before` erneut einfügen (Update-oder-Insert, wenn eine Zeile mit dieser ID wieder aufgetaucht ist).
4. Jede Umkehrung wird selbst auditiert (`action: "<entityType>_undone"`, ohne `batchId` — Rückgängigmachen des Rückgängigmachens ist außerhalb des Umfangs).

Die Operation wird aus dem expliziten **Erstellungs-Marker** gewählt, nicht aus einem fehlenden Vorher-Bild abgeleitet — ein legitim leeres Vorher-Bild oder eine gekürzte Zeile dürfen nicht fälschlich für eine Erstellung gehalten werden.

Die Ergebnis-Payload ist `{ restored, skippedConflicts: [...], failed: [...], status }`; der Batch wechselt zu `undone` (sauber) oder `partial`. **Es gibt keine datenbankübergreifende Transaktion** — Rückgängigmachen ist Best-Effort pro Zeile, dieselbe Einschränkung, die Planning Center für zusammengeführte Profile dokumentiert.

:::warning Entitäten mit Nebeneffekten brauchen einen `onUndo`-Hook
Das Rückgängigmachen einer `groupMember`-Erstellung muss auch `groupMemberHistory` schreiben („left"), sonst brechen die Fluktuationsanalysen stillschweigend — eine feste Arbeitsbereichs-Invariante. Solche Entitäten registrieren einen `onUndo`-Callback in `AUDIT_REGISTRY`, der `true` zurückgibt, wenn er die Umkehrung vollständig behandelt hat, und dabei den generischen Pfad umgeht. `groupMembers` ist der kanonische Fall (geschlüsselt nach Zeilen-ID auf dem expliziten Pfad, aber nach `personId` auf Bulk-Endpunkten, und bei jedem Hinzufügen/Entfernen historienverfolgt).
:::

## Konsumenten-Oberflächen

Beide Admin-Oberflächen sind **in Arbeit**; die Absicht:

| Oberfläche | Repo | Zweck |
|---------|------|-------|
| **Audit-Log-Seite** | B1Admin (ManageChurch → Audit-Log) | Filtern nach Modul/Kategorie/Nutzer/Entität und Alt→Neu-Diffs rendern — bei Bearbeitungen durch Abgleich mit der vorherigen Eintragung der Entität, bei Löschungen aus `details.before`. Basiert auf `GET /membership/auditlogs`, abgesichert durch `Permissions.server.admin`. |
| **Batches-Seite** | B1Admin (dieselbe Settings-Zentrale) | Listet Batches mit Status und Zählungen auf, **Ergebnisse anzeigen** (die Audit-Zeilen des Batches über `GET /membership/batches/:id/results`) und eine **Rückgängig**-Schaltfläche, die den Bericht über übersprungene Konflikte/Fehlschläge anzeigt. |
| **Import-Batches** | B1Transfer | Eröffnet einen Batch, sendet `X-Batch-Id` bei seinen normalen Speicher-Aufrufen, vervollständigt am Ende — Importe werden rückgängig machbar, ohne neue Import-Endpunkte. Der veraltete `importKey` bleibt als reine Herkunfts-Markierung für Erstellungen erhalten, für das Rückgängigmachen jedoch abgelöst. |

## Fallstricke, die eine zukünftige Änderung nicht wieder einführen darf

- **Audit-Inserts müssen awaited bleiben.** Ein nicht awaiteter `AuditLogHelper.log(...)` wird vom Lambda-Einfrieren verworfen. Promises sammeln und `await Promise.allSettled` ausführen, bevor zurückgegeben wird.
- **Kysely verwirft `undefined` aus `.set()`/`.values()`.** Bei der Wiederherstellung würde eine geleerte Spalte unangetastet überleben. `BatchUndoHelper` wandelt jedes fehlende Feld in ein explizites `null` um (`nullify`) — dies niemals für einen „schnelleren" direkten Schreibvorgang umgehen.
- **Die Aufbewahrung muss deutlich über dem Rückgängigmach-Fenster bleiben.** `AuditLogRepo.deleteOld()` läuft im nächtlichen Timer (Standard-Aufbewahrung 365 Tage); das Rückgängigmach-Fenster beträgt 30 Tage. Sollte die Aufbewahrung jemals in Richtung des Fensters sinken, werden Rückgängigmach-Journale unter offenen Batches weggeräumt.
- **Gekürzte Zeilen sind nicht rückgängig machbar.** Eine `{ truncated: true }`-Payload hat kein Vorher-/Nachher-Bild; das Rückgängigmachen meldet sie als `failed`, rät niemals.
- **Die Reihenfolge ist Modul-Schreiben-dann-Audit.** Den Audit-Insert niemals vor den echten Schreibvorgang stellen, und ihn strikt-im-Batch/beratend-im-Normalmodus halten.

## Datei-Inventar

| Bereich | Dateien |
|------|-------|
| Wrapper / Registry | `Api/src/shared/infrastructure/BaseController.ts` (`AUDIT_REGISTRY`, `BULK_ROUTES`, `actionWrapper`, `actionWrapperAnon`, Snapshot + Schreib-Zeilen) |
| Undo-Engine | `Api/src/shared/infrastructure/BatchUndoHelper.ts` |
| Audit-Helfer | `Api/src/modules/membership/helpers/AuditLogHelper.ts` (`log`, `capDetails`/`sanitizeValue`, `diffFields`, `getClientIp`) |
| Controller | `Api/src/modules/membership/controllers/AuditLogController.ts`, `BatchController.ts` |
| Modelle / Repos | `Api/src/modules/membership/models/AuditLog.ts`, `Batch.ts`; `repositories/AuditLogRepo.ts` (`loadFiltered`, `loadForBatch`, `hasLaterModification`, `deleteOld`), `BatchRepo.ts` |
| Migration | `Api/tools/migrations/membership/2026-07-04_audit_universal.ts` |
| Admin-UI (in Arbeit) | B1Admin-Seiten Audit-Log + Batches; B1Transfer-Import-Batch-Header |

## Verwandte Seiten

- [Modulstruktur](../api/module-structure) — wie ein Nicht-Membership-Controller die Membership-Repos über `RepoManager` erreicht
- [Giving](./giving) — die Spenden-Schreibpfade, die als `sensitive` auditiert werden, auch wenn sie anonym sind
- [Membership-Endpunkte](../api/endpoints/membership) — die REST-Oberfläche, die `X-Batch-Id` trägt und `/auditlogs` und `/batches` bereitstellt
