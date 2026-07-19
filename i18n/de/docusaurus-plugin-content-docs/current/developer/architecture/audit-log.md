---
title: "Audit Log & rückgängig machbare Batches"
---

# Audit Log & rückgängig machbare Batches

<div class="article-intro">

Jede von einem Benutzer ausgelöste Mutation in der Api wird aufgezeichnet — wer, was, wann und von wo — über alle Module hinweg, ganz ohne modulweise Verkabelung pro Controller. Auf diesem Ledger sitzt eine Batch-Schicht: Ein Import oder eine Massenaktion kann als Batch markiert und später Zeile für Zeile **rückgängig gemacht** werden, im Planning-Center-Stil. Beide leben in einer einzigen `auditLogs`-Tabelle in der Membership-Datenbank und werden vollständig von einem einzigen Engpasspunkt gesteuert, `BaseController.actionWrapper`. Diese Seite beschreibt, was protokolliert wird, wo die Daten liegen, welche Performance-Kompromisse das Design prägen und wie Undo einen Batch sicher rückgängig macht, ohne datenbankübergreifende Transaktionen zu benötigen.

</div>

## Übersicht

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

Zwei strukturelle Tatsachen bestimmen alles Folgende:

1. **Die Controller-Schicht ist der einzige Ort, der den handelnden Benutzer kennt.** Repositories sehen niemals `AuthenticatedUser`; nur Controller halten `au`. Die Controller aller Module durchlaufen bereits `BaseController.actionWrapper`, weshalb genau dort das Auditing eingehängt wird — an keiner Stelle ändern sich Repository-Signaturen.
2. **Eine Tabelle bedient alle Module.** Audit-Zeilen für Giving, Attendance, Content usw. werden alle über `RepoManager.getRepos("membership")` in die `auditLogs`-Tabelle der Membership-DB geschrieben, selbst von einem Nicht-Membership-Controller aus. „Alles, was Jane heute geändert hat“ bleibt eine einzige Abfrage.

## Was protokolliert wird

Auditing ist **standardmäßig aktiv für jedes mutierende Verb auf jeder Route**. `actionWrapper` leitet die Audit-Felder ohne jede Konfiguration pro Route aus der Anfrage ab:

| Feld | Abgeleitet aus |
|-------|--------------|
| `module` | `this.moduleName` (das besitzende Modul) |
| `entityType` | singularisiertes letztes Segment von `req.baseUrl` (z. B. `/membership/people` → `person`) |
| `category` | Standardwert ist `entityType` |
| `action` | `${entityType}_saved` für `POST /`, `${entityType}_deleted` für `DELETE /:id`, sonst `${entityType}_${method}:${routePath}`, sodass Nicht-CRUD-Unterrouten (z. B. `task_post:/:id/move`) automatisch erfasst werden |

`BaseController.AUDIT_REGISTRY` dient **ausschließlich Überschreibungen und Opt-outs** — sie ist keine Allowlist. Eine Route erscheint dort, um ihre Kategorie/ihren entityType umzubenennen, um `{ dbModule, table }` zu deklarieren (was sie Batch- und Undo-fähig macht), um sie als `sensitive` zu markieren (Audit anonymer Mutationen) oder um sie mit `optOut: true` abzuschalten.

**Opt-out-Liste** (Feuerwehrschlauch-Schreibpfade, die das Ledger überfluten würden): Attendance `visits` / `visitsessions` / `sessions` / `checkin` (der Sonntags-Check-in-Sturm) sowie Messaging `messages` / `connections` / `devices` (Chat und Präsenz). Alles andere wird protokolliert.

**Bulk-Endpunkte** (`people/bulk-delete`, `people/bulk-update`, `groupmembers/bulk-add`, `groupmembers/bulk-remove`) sind in `BULK_ROUTES` registriert und erzeugen **eine Audit-Zeile pro betroffener ID** — ein Import von 10.000 Personen erzeugt also 10.000 Zeilen. Genau diese Granularität pro Entität ist es, die den Batch rückgängig machbar macht.

**Anonyme Mutationen** (`actionWrapperAnon` — Gastspenden, Gastregistrierung, Formularübermittlungen) werden nur für in der Registry als `sensitive` markierte Routen protokolliert, geschrieben mit `userId="anonymous"` plus der Client-IP. Spenden führen diese Liste an; dieser Pfad hat eine echte Regressionshistorie.

### Redaktion von Geheimnissen und Größenbeschränkungen

Bevor eine `details`-Payload gespeichert wird, führt `AuditLogHelper.capDetails()` `sanitizeValue()` darüber aus:

- **Geheime Schlüssel werden geschwärzt.** Jedes Feld, dessen kleingeschriebener Name in `SENSITIVE_KEYS` steht (`password`, `token`, `cvv`, `cardnumber`, `routing_number`, `accesstoken`, `clientsecret`, …), wird durch `"[redacted]"` ersetzt.
- **Große Skalarwerte werden entfernt.** Jede `data:`-URI oder jeder String über 4 KB (base64-Fotos, Blobs) wird zu `"[stripped]"`.
- **Übergroße Zeilen werden gekappt.** Überschreitet das serialisierte JSON etwa 64 KB, wird die gesamte Payload durch `{ truncated: true }` ersetzt. Gekappte Zeilen bleiben zwar einsehbar — sind aber **nicht rückgängig machbar** (es gibt kein Vorher-/Nachher-Bild, aus dem wiederhergestellt werden könnte).

## Wo die Daten liegen

Eine einzige `auditLogs`-Tabelle in der **Membership**-Datenbank versorgt jedes Modul. Spalten: `id, churchId, userId, category, action, entityType, entityId, details (MEDIUMTEXT JSON-String), ipAddress, module, batchId, created`. Die Migration `tools/migrations/membership/2026-07-04_audit_universal.ts` fügt `module` + `batchId` hinzu, erweitert `details` von `TEXT` auf `MEDIUMTEXT`, fügt die Indizes `ix_auditLogs_batch (batchId)` und `ix_auditLogs_entity (churchId, module, entityType, entityId, created)` hinzu und erstellt die `batches`-Tabelle. Die `module`-Spalte existiert genau deshalb, damit `entityType`-Kollisionen über Module hinweg (`note`, `setting` existieren in mehreren) filterbar bleiben, und der Entity-Index ist es, der sowohl die Historie pro Entität als auch den Konflikt-Schutz beim Undo antreibt.

Modulübergreifende Schreibvorgänge laufen von innerhalb des Wrappers über `RepoManager.getRepos("membership")`. Die Reihenfolge ist bewusst gewählt: **Der eigentliche Schreibvorgang wird zuerst in der Modul-DB committet, der Audit-Insert folgt danach.** Im Normalmodus wird ein fehlgeschlagener Audit-Insert verschluckt (`console.error`, Sentry greift es auf) — Auditing ist beratend und darf eine Benutzeranfrage niemals zum Scheitern bringen. Im **Batch-Modus ist das strikt** (siehe unten).

:::info Warum nicht Trigger, CDC oder Tabellen pro Modul?
- **MySQL-Trigger** kennen den handelnden Benutzer nicht (die Verbindung besitzt kein `au`) und würden bedeuten, Trigger-Sets über jedes Schema hinweg pflegen zu müssen.
- **binlog / CDC** ist ein ganzes Infrastrukturprojekt mit demselben Problem der Akteur-Identität.
- **`userId` durch jedes Repository durchzureichen** würde Hunderte Dateien anfassen, nur um Informationen zu bewegen, die die Controller-Schicht bereits besitzt.
- **Audit-Tabellen pro Modul** würden das 7-Fache an Verkabelung und Fan-out-Abfragen für jede modulübergreifende Frage bedeuten. Eine Tabelle am Engpasspunkt des Controllers ist das Design mit dem geringsten Code-Aufwand, das trotzdem den Akteur erfasst.
:::

## Performance-Haltung

Der Hot Path ist bewusst günstig gehalten; die Kosten fallen nur dort an, wo sie sich lohnen.

- **Kein Read-before-Write bei normalen Updates.** Ein regulärer Save lädt den alten Datensatz **nicht**. Die **übermittelten Nachher-Werte** werden in `details.after` gespeichert; die UI rekonstruiert Alt→Neu erst zum *Anzeigezeitpunkt*, indem sie gegen die vorherige Audit-Zeile der Entität abgleicht. Eine Abfrage zum Anzeigezeitpunkt, null Kosten beim Schreiben. Felder, die seit dem Launch nie angefasst wurden, zeigen schlicht keinen „alten“ Wert — das ist akzeptabel.
- **Löschungen erhalten ein Vorher-Bild.** `DELETE /:id` auf einer Registry-Route mit `{ dbModule, table }` lädt die Zeile zunächst generisch und speichert sie in `details.before`. Löschungen sind selten, und das Vorher-Bild ist der gesamte forensische Wert.
- **Der Batch-Modus ist das einzige systematische Read-before-Write**, und er ist Opt-in — eine Bulk-/Import-Operation ist ohnehin schon teuer, daher sind die N Snapshot-Lesevorgänge der Preis für Undo.
- **Audit-Inserts werden awaited.** `actionWrapper` sammelt die Log-Promises und führt `await Promise.allSettled(...)` aus, bevor zurückgegeben wird. Das ist die wichtigste Invariante überhaupt: Auf Lambda friert der Container **in dem Moment ein, in dem die Antwort zurückgegeben wird**, sodass ein nicht awaiteter Insert stillschweigend verworfen würde. „Fire and forget“ bedeutet hier *Fehler dürfen die Anfrage nie zum Scheitern bringen*, nicht *nicht awaiten* — ein einzelner Insert im bereits warmen Membership-Pool kostet etwa 1–3 ms.

## Batches und Undo

Ein **Batch** gruppiert eine Menge von Mutationen, sodass sie gemeinsam überprüft und rückgängig gemacht werden können. Es gibt zwei Wege, einen Batch zu öffnen:

- **Explizit:** `POST /membership/batches { label, source }` liefert eine `batchId`. Der Client (B1Transfer, eine B1Admin-Import-UI) sendet dann `X-Batch-Id: <id>` bei jedem nachfolgenden Save/Delete. `POST /membership/batches/:id/complete` schließt ihn ab und schreibt `itemCount` fest.
- **Implizit:** Die vier Bulk-Endpunkte öffnen, befüllen und schließen ihren eigenen Batch innerhalb derselben einzelnen Anfrage und liefern die `batchId` in der Antwort zurück.

Die `batches`-Tabelle (Membership-DB): `id, churchId, userId, label, source, status (open|completed|undone|partial|failed), itemCount, created, completedAt, undoneAt`.

### Der Batch-Modus ist strikt

Ist `X-Batch-Id` vorhanden, verschärft `actionWrapper` jede Schutzmaßnahme (`writeBatchAuditRows`):

1. Der Batch muss existieren, `open` sein und zu `au.churchId` gehören — sonst **403**.
2. Die Route muss batch-fähig sein (`{ dbModule, table }` in der Registry) — sonst **400**.
3. Bevor die Aktion läuft, werden Vorher-Bilder für alle betroffenen IDs in **einer einzigen** `WHERE id IN (...) AND churchId = ?`-Abfrage geladen. Schlägt dieser Snapshot-Lesevorgang fehl, **scheitert die Anfrage mit 500 und die Aktion wird nicht ausgeführt** — der Batch-Modus darf niemals stillschweigend ein nicht rückgängig machbares Ledger erzeugen. (Der Normalmodus dagegen arbeitet nach Best-Effort-Prinzip und verschluckt Snapshot-Fehler.)
4. Nach erfolgreicher Aktion wird pro Entität eine Audit-Zeile mit `batchId`, `details.before` und `details.after` geschrieben, plus ein expliziter **Create-Marker** für vom Batch erzeugte Zeilen.

### Undo

`POST /membership/batches/:id/undo` (Berechtigung: Batch-Ersteller oder `Permissions.server.admin`). Der Vorgang wird verweigert, wenn der Batch nicht `completed` ist oder das **30-Tage-Undo-Fenster** überschritten ist. `BatchUndoHelper.undo()` tut dann Folgendes:

1. Lädt die Audit-Zeilen des Batches und **gruppiert sie nach `(module, entityType, entityId)`.** Eine Entität, die innerhalb eines Batches mehrfach angefasst wurde, wird **genau einmal** zurückgesetzt — auf ihren tatsächlichen Zustand vor dem Batch: das früheste Vorher-Bild, oder eine Löschung, falls der Batch sie erzeugt hat. Deshalb spielt Undo die Zeilen nicht naiv nacheinander ab: Einen zwischenzeitlichen Mid-Batch-Snapshot wiederherzustellen wäre falsch.
2. Für jede Entität läuft **zuerst der Konflikt-Schutz**: `auditLog.hasLaterModification()` fragt, ob für dieselbe `(module, entityType, entityId)` außerhalb dieses Batches ein *späterer* Audit-Eintrag existiert. Falls ja, wurde die Entität nach dem Import bearbeitet — sie wird **übersprungen und gemeldet**, niemals überschrieben. Das nutzt das Audit-Log selbst als Änderungs-Detektor; es sind keine `modifiedAt`-Spalten auf irgendeiner Tabelle nötig.
3. Setzt gemäß der protokollierten Operation zurück, löst `{ dbModule, table }` aus der Registry auf und nutzt generische Kysely-Schreibvorgänge:
   - **created** → Zeile hart löschen.
   - **updated** → `details.before` zurückschreiben.
   - **deleted** → `details.before` neu einfügen (Update-oder-Insert, falls in der Zwischenzeit eine Zeile mit dieser ID wieder aufgetaucht ist).
4. Jede Rücksetzung wird selbst protokolliert (`action: "<entityType>_undone"`, ohne `batchId` — Undo-von-Undo ist außerhalb des Scopes).

Die Operation wird anhand des expliziten **Create-Markers** gewählt, nicht aus einem fehlenden Vorher-Bild abgeleitet — ein legitim leeres Vorher-Bild oder eine gekappte Zeile darf nicht fälschlich als Erstellung interpretiert werden.

Die Ergebnis-Payload ist `{ restored, skippedConflicts: [...], failed: [...], status }`; der Batch wechselt zu `undone` (sauber) oder `partial`. **Es gibt keine datenbankübergreifende Transaktion** — Undo arbeitet pro Zeile nach Best-Effort-Prinzip, dieselbe Einschränkung, die Planning Center für zusammengeführte Profile dokumentiert.

:::warning Entitäten mit Nebenwirkungen brauchen einen `onUndo`-Hook
Wird die Erstellung eines `groupMember` rückgängig gemacht, muss auch ein `groupMemberHistory`-Eintrag ("left") geschrieben werden, sonst brechen die Fluktuations-Analysen stillschweigend — eine feste Invariante im Projekt. Solche Entitäten registrieren einen `onUndo`-Callback in `AUDIT_REGISTRY`, der `true` zurückgibt, wenn er die Rücksetzung vollständig selbst behandelt hat, und damit den generischen Pfad umgeht. `groupMembers` ist der kanonische Fall (auf dem expliziten Pfad über die Zeilen-ID adressiert, bei Bulk-Endpunkten über `personId`, und bei jedem Hinzufügen/Entfernen historisch nachverfolgt).
:::

## Konsumierende Oberflächen

Beide Admin-Oberflächen sind **noch in Arbeit**; die Zielsetzung:

| Oberfläche | Repo | Zweck |
|---------|------|---------|
| **Audit-Log-Seite** | B1Admin (ManageChurch → Audit Log) | Filtern nach Modul/Kategorie/Benutzer/Entität und Rendern von Alt→Neu-Diffs — bei Edits durch Abgleich mit dem vorherigen Eintrag der Entität, bei Löschungen aus `details.before`. Bedient von `GET /membership/auditlogs`, geschützt durch `Permissions.server.admin`. |
| **Batches-Seite** | B1Admin (derselbe Settings-Hub) | Auflistung der Batches mit Status und Zähler, **View Results** (die Audit-Zeilen des Batches über `GET /membership/batches/:id/results`) sowie ein **Undo**-Button, der den Bericht über übersprungene Konflikte / Fehler anzeigt. |
| **Import-Batches** | B1Transfer | Öffnet einen Batch, sendet `X-Batch-Id` bei seinen normalen Save-Aufrufen, schließt ihn am Ende ab — Importe werden rückgängig machbar, ohne neue Import-Endpunkte zu benötigen. Der bisherige `importKey` bleibt als reine Erstellungs-Herkunftsmarkierung erhalten, wird aber für Undo abgelöst. |

## Fallstricke, die eine zukünftige Änderung nicht wieder einführen darf

- **Audit-Inserts müssen awaited bleiben.** Ein nicht awaiteter `AuditLogHelper.log(...)`-Aufruf wird durch das Lambda-Einfrieren verworfen. Promises sammeln und `await Promise.allSettled` vor dem Return.
- **Kysely verwirft `undefined` aus `.set()`/`.values()`.** Beim Wiederherstellen würde eine geleerte Spalte unverändert bleiben. `BatchUndoHelper` wandelt jedes fehlende Feld explizit in `null` um (`nullify`) — dies darf für einen „schnelleren“ direkten Schreibvorgang niemals umgangen werden.
- **Die Aufbewahrungsfrist muss deutlich über dem Undo-Fenster liegen.** `AuditLogRepo.deleteOld()` läuft im nächtlichen Timer (Standard-Aufbewahrung 365 Tage); das Undo-Fenster beträgt 30 Tage. Sinkt die Aufbewahrungsfrist jemals in Richtung dieses Fensters, werden Undo-Ledger unter offenen Batches weggelöscht.
- **Gekappte Zeilen sind nicht rückgängig machbar.** Eine `{ truncated: true }`-Payload besitzt kein Vorher-/Nachher-Bild; Undo meldet sie als `failed`, ohne zu raten.
- **Die Reihenfolge ist Modul-Schreibvorgang-dann-Audit.** Der Audit-Insert darf niemals vor den eigentlichen Schreibvorgang vorgezogen werden, und er muss im Batch-Modus strikt, im Normalmodus beratend bleiben.

## Datei-Inventar

| Bereich | Dateien |
|------|-------|
| Wrapper / Registry | `Api/src/shared/infrastructure/BaseController.ts` (`AUDIT_REGISTRY`, `BULK_ROUTES`, `actionWrapper`, `actionWrapperAnon`, Snapshot + Write-Rows) |
| Undo-Engine | `Api/src/shared/infrastructure/BatchUndoHelper.ts` |
| Audit-Helper | `Api/src/modules/membership/helpers/AuditLogHelper.ts` (`log`, `capDetails`/`sanitizeValue`, `diffFields`, `getClientIp`) |
| Controller | `Api/src/modules/membership/controllers/AuditLogController.ts`, `BatchController.ts` |
| Modelle / Repositories | `Api/src/modules/membership/models/AuditLog.ts`, `Batch.ts`; `repositories/AuditLogRepo.ts` (`loadFiltered`, `loadForBatch`, `hasLaterModification`, `deleteOld`), `BatchRepo.ts` |
| Migration | `Api/tools/migrations/membership/2026-07-04_audit_universal.ts` |
| Admin-UI (in Arbeit) | B1Admin Audit-Log- + Batches-Seiten; B1Transfer Import-Batch-Header |

## Verwandte Themen

- [Modulstruktur](../api/module-structure) — wie ein Nicht-Membership-Controller über `RepoManager` die Membership-Repositories erreicht
- [Giving](./giving) — die Spenden-Schreibpfade, die auch anonym als `sensitive` protokolliert werden
- [Membership-Endpunkte](../api/endpoints/membership) — die REST-Oberfläche, die `X-Batch-Id` trägt und `/auditlogs` sowie `/batches` bereitstellt
