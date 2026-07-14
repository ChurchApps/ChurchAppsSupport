---
title: "Audit Log & rückgängig machbare Batches"
---

# Audit Log & rückgängig machbare Batches

<div class="article-intro">

Jede von Benutzern initiierte Mutation in der Api wird aufgezeichnet – wer, was, wann und von wo – über alle Module hinweg, ohne spezielle Pro-Controller-Verkabelung. Auf diesem Ledger sitzt eine Batch-Schicht: Ein Import oder eine Massaktion kann als Batch gekennzeichnet werden und später **rückgängig gemacht** Zeile für Zeile, Planning-Center-artig. Beide befinden sich in einer einzigen `auditLogs`-Tabelle in der Mitgliedschaftsdatenbank und werden vollständig von einem Engpass gesteuert, `BaseController.actionWrapper`. Diese Seite verweist auf, was geprüft wird, wo die Daten leben, die Leistungs-Trade-Offs, die sie formen, und wie Rückgängigmachen einen Batch sicher ohne Datenbank-übergreifende Transaktionen umkehrt.

</div>

## Übersicht

```
jede mutierende Anfrage (POST/PUT/PATCH/DELETE)
        │
        ▼
BaseController.actionWrapper ──▶ ableiten {module, entityType, category, action}
        │                         von req.baseUrl + Methode  (AUDIT_REGISTRY = nur Übersteuerungen/Opt-outs)
        │
        ├─ normaler Modus ─────────▶ führe Aktion aus ─▶ await AuditLogHelper.log(Werte nach)  ──┐
        │                                                 (Löschungen erfassen auch ein Bild davor)  │
        │                                                                                            ▼
        └─ X-Batch-Id vorhanden ──▶ Snapshot Bilder davor (streng) ─▶ Aktion ausführen ─▶ Audit-Zeilen mit batchId-Tag
                                                                                             │
                                                                                             ▼
                                                               auditLogs  (Mitgliedschafts-DB, eine Tabelle, alle Module)
                                                                                             │
   POST /membership/batches/:id/undo ──▶ BatchUndoHelper ──▶ gehe Zeilen umgekehrt, pro Entität ┘
                                          Konflikt-Schutz → wiederherstellen / löschen / neu einfügen
```

Zwei strukturelle Fakten treiben alles unten:

1. **Die Controller-Schicht ist der einzige Ort, der den Akteur kennt.** Repositories sehen niemals `AuthenticatedUser`; nur Controller halten `au`. Jedes Modul-Controller läuft bereits durch `BaseController.actionWrapper`, daher ist das der Ort, an dem die Prüfung einhakt – keine Repository-Signaturen ändern sich irgendwo.
2. **Eine Tabelle dient allen Modulen.** Audit-Zeilen für Spenden, Anwesenheit, Inhalt usw. werden alle in die `auditLogs` der Mitgliedschafts-DB über `RepoManager.getRepos("membership")` geschrieben, auch von einem Nicht-Mitgliedschafts-Controller aus. "Alles, was Jane heute geändert hat" bleibt eine einzelne Abfrage.

## Was geprüft wird

Prüfung ist **standardmäßig aktiviert für jeden mutuierenden Verb auf jeder Route**. `actionWrapper` leitet die Prüfungsfelder aus der Anfrage ab ohne spezielle Pro-Route-Konfiguration:

| Feld | Abgeleitet von |
|-------|--------------|
| `module` | `this.moduleName` (das besitzende Modul) |
| `entityType` | Singularisiert letztes Segment von `req.baseUrl` (z.B. `/membership/people` → `person`) |
| `category` | Standardwert auf `entityType` |
| `action` | `${entityType}_saved` für `POST /`, `${entityType}_deleted` für `DELETE /:id`, sonst `${entityType}_${method}:${routePath}` damit nicht-CRUD-Unter-Routen (z.B. `task_post:/:id/move`) automatisch erfasst werden |

`BaseController.AUDIT_REGISTRY` ist **nur für Übersteuerungen und Opt-outs** – es ist keine Allowlist. Eine Route wird dort angezeigt, um ihre Kategorie/entityType umzubenennen, um `{ dbModule, table }` zu deklarieren (das macht sie Batch- und Undo-fähig), um sie als `sensitive` zu markieren (anonyme Mutationen prüfen), oder um sie mit `optOut: true` auszuschalten.

**Opt-out-Liste** (Feuerhydrant-Schreib-Pfade, die das Ledger ertränken würden): Anwesenheit `visits` / `visitsessions` / `sessions` / `checkin` (der Sonntags-Check-in-Sturm) und Messaging `messages` / `connections` / `devices` (Chat und Präsenz). Alles andere protokolliert.

**Massenendpoints** (`people/bulk-delete`, `people/bulk-update`, `groupmembers/bulk-add`, `groupmembers/bulk-remove`) werden in `BULK_ROUTES` registriert und geben **eine Audit-Zeile pro betroffene ID** aus, daher produziert eine 10k-Personen-Einfügung 10k Zeilen – genau diese Pro-Entitäts-Granularität macht den Batch rückgängig machbar.

**Anonyme Mutationen** (`actionWrapperAnon` – Gast-Spenden, Gast-Registrierung, Formular-Einfügungen) werden nur für Registry-flagged `sensitive` Routen geprüft, geschrieben mit `userId="anonymous"` plus der Client-IP. Spenden führen die Liste; dieser Pfad hat eine echte Regressionsgeschichte.

### Geheimnis-Schwärzung und Größenlimits

Bevor eine `details`-Nutzlast gespeichert wird, führt `AuditLogHelper.capDetails()` `sanitizeValue()` aus:

- **Geheimschlüssel werden geschwärzt.** Jedes Feld, dessen kleingeschriebener Name in `SENSITIVE_KEYS` ist (`password`, `token`, `cvv`, `cardnumber`, `routing_number`, `accesstoken`, `clientsecret`, …), wird durch `"[redacted]"` ersetzt.
- **Riesige Skalare werden entfernt.** Jeder `data:` URI oder String über 4 KB (base64 Fotos, Blobs) wird zu `"[stripped]"`.
- **Übergroße Zeilen werden begrenzt.** Falls die serialisierte JSON über ~64 KB überschreitet, wird die ganze Nutzlast durch `{ truncated: true }` ersetzt. Begrenzte Zeilen sind weiterhin sichtbar – aber **nicht rückgängig machbar** (es gibt kein Bild davor/danach zum Wiederherstellen).

## Wo die Daten leben

Eine einzelne `auditLogs`-Tabelle in der **Mitgliedschafts**-Datenbank unterstützt jedes Modul. Spalten: `id, churchId, userId, category, action, entityType, entityId, details (MEDIUMTEXT JSON Zeichenkette), ipAddress, module, batchId, created`. Die Migration `tools/migrations/membership/2026-07-04_audit_universal.ts` fügt `module` + `batchId` hinzu, verbreitert `details` von `TEXT` zu `MEDIUMTEXT`, fügt Indizes `ix_auditLogs_batch (batchId)` und `ix_auditLogs_entity (churchId, module, entityType, entityId, created)` hinzu, und erstellt die `batches`-Tabelle. Die `module`-Spalte existiert genau daher, dass `entityType`-Kollisionen über Module hinweg (`note`, `setting` existieren in mehreren) filtrig bleiben, und der Entitäts-Index ist, was das Rückgängigmachen des Konflikt-Schutzes sowohl Pro-Entitäts-Geschichte als auch antreibt.

Cross-Module-Schreibvorgänge durchlaufen `RepoManager.getRepos("membership")` von innen im Wrapper. Die Reihenfolge ist absichtlich: **Der Hauptschreibvorgang begeht sich zuerst in der Modul-DB, der Audit-Insert ist Sekunde.** Im normalen Modus ist ein Audit-Insert-Fehler verschluckt (`console.error`, Sentry würde es aufgreifen) – Prüfung ist Empfehlung und darf eine Benutzeranforderung niemals fehlschlagen lassen. Im **Batch-Modus ist es streng** (siehe unten).

:::info Warum nicht Trigger, CDC oder Pro-Modul-Tabellen?
- **MySQL-Trigger** kennen den handelnden Benutzer nicht (die Verbindung hat kein `au`), und würden bedeuten, Trigger-Sätze über jedes Schema hinweg zu pflegen.
- **binlog / CDC** ist ein ganzes Infrastruktur-Projekt mit dem gleichen Akteur-Identitäts-Problem.
- **Threading `userId` durch jedes Repo** würde Hunderte von Dateien berühren, um Informationen zu bewegen, die die Controller-Schicht bereits hat.
- **Pro-Modul-Audit-Tabellen** würden 7× die Rohrleitungen bedeuten und Fan-out-Abfragen für jede Cross-Modul-Frage. Eine Tabelle beim Controller-Engpass ist das geringste-Code-Design, das immer noch den Akteur erfasst.
:::

## Leistungshaltung

Der heiße Pfad ist absichtlich billig; die Kosten werden nur bezahlt, wo es etwas kauft.

- **Kein Lese-vor-Schreib bei normalen Updates.** Eine regelmäßige Speicherung **lädt nicht** den alten Datensatz. Die **eingereichten Werte nach** werden in `details.after` gespeichert; die UI rekonstruiert alt→neu zur *Betrachtungs*-Zeit, indem sie gegen die vorherige Audit-Zeile der Entität unterscheidet. Eine Abfrage zu Betrachtungszeit, Nullkosten zu Schreibzeit. Felder, die niemals seit dem Start berührt wurden, zeigen einfach keinen "alten" Wert – akzeptabel.
- **Löschungen bekommen ein Bild davor.** `DELETE /:id` auf eine Registry-Route mit `{ dbModule, table }` lädt die Zeile zuerst allgemein und speichert sie in `details.before`. Löschungen sind selten und das Bild davor ist der ganze forensische Wert.
- **Batch-Modus ist der einzige systematische Lese-vor-Schreib**, und es ist Opt-in – ein Massenvorgang/Import ist bereits teuer, daher sind N Snapshot-Lesevorgänge der Preis des Rückgängigmachens.
- **Audit-Insert werden erwartet.** `actionWrapper` sammelt die Protokoll-Versprechen und `await Promise.allSettled(...)` bevor es zurückgibt. Dies ist die einzeln wichtigste Invariante: auf Lambda gefriert der Container **augenblicklich, wenn die Antwort zurückgibt**, daher ist ein unerwarteter Insert still dropped. "Feuer und vergessen" hier bedeutet *Fehler schlagen die Anfrage nie fehl*, nicht *nicht erwarten* – ein einzelner Insert im bereits warmen Mitgliedschafts-Pool ist ~1–3 ms.

## Batches und Rückgängigmachen

Ein **Batch** gruppiert einen Satz von Mutationen, damit sie zusammen überprüft und rückgängig gemacht werden können. Es gibt zwei Wege, einen zu öffnen:

- **Explizit:** `POST /membership/batches { label, source }` gibt eine `batchId` zurück. Der Client (B1Transfer, eine B1Admin-Import-UI) sendet dann `X-Batch-Id: <id>` auf jedem nachfolgenden Speichern/Löschen. `POST /membership/batches/:id/complete` schließt ihn und `itemCount` wird geprägt.
- **Implizit:** die vier Massenendpoints öffnen, füllen und schließen ihren eigenen Batch in der einzelnen Anfrage, geben die `batchId` in der Antwort zurück.

Die `batches`-Tabelle (Mitgliedschafts-DB): `id, churchId, userId, label, source, status (open|completed|undone|partial|failed), itemCount, created, completedAt, undoneAt`.

### Batch-Modus ist streng

Wenn `X-Batch-Id` vorhanden ist, verstärkt `actionWrapper` jeden Schutz (`writeBatchAuditRows`):

1. Der Batch muss existieren, `open` sein und zu `au.churchId` gehören – sonst **403**.
2. Die Route muss Batch-fähig sein (`{ dbModule, table }` in der Registry) – sonst **400**.
3. Bevor die Aktion läuft, werden Bilder davor für alle betroffenen IDs in **einer** `WHERE id IN (...) AND churchId = ?` Abfrage geladen. Falls dieser Snapshot-Lesevorgang fehlschlägt, **schlägt die Anfrage 500 fehl und die Aktion führt nicht aus** – Batch-Modus muss niemals still ein nicht-undoables Ledger produzieren. (Normaler Modus ist im Gegensatz Best-Effort und verschluckt Snapshot-Fehler.)
4. Nach Erfolg der Aktion wird eine Audit-Zeile pro Entität mit `batchId`, `details.before` und `details.after` geschrieben, plus ein expliziter **Erstellen-Marker** für Zeilen, die der Batch erstellt hat.

### Rückgängigmachen

`POST /membership/batches/:id/undo` (Berechtigung: Batch-Ersteller oder `Permissions.server.admin`). Es weigert sich, wenn der Batch nicht `completed` ist oder älter als das **30-Tage-Rückgängigmachen-Fenster** ist. `BatchUndoHelper.undo()` dann:

1. Lädt die Audit-Zeilen des Batch und **gruppiert sie nach `(module, entityType, entityId)`.** Eine Entität, die mehrere Male in einem Batch berührt wird, wird **einmal** umgekehrt, zurück zu ihrem wahren Pre-Batch-Zustand – das früheste Bild davor, oder ein Löschen, wenn der Batch es erstellt hat. Das ist, warum Rückgängigmachen nicht naiv jede Zeile abspielt: Das Wiederherstellen einer zwischenzeitlichen Mid-Batch-Momentaufnahme wäre falsch.
2. Für jede Entität, führt der **Konflikt-Schutz zuerst aus**: `auditLog.hasLaterModification()` fragt, ob irgendein *späterer* Audit-Eintrag für das gleiche `(module, entityType, entityId)` außerhalb dieses Batch existiert. Falls ja, wurde die Entität nach dem Import bearbeitet – sie wird **übersprungen und gemeldet**, niemals überschrieben. Dies nutzt das Audit-Log selbst als Modifikations-Detektor; keine `modifiedAt`-Spalten sind auf jeder Tabelle nötig.
3. Kehrt pro der aufgezeichneten Op um, löst `{ dbModule, table }` aus der Registry auf und nutzt generische Kysely-Schreibvorgänge:
   - **created** → Hart-löschen die Zeile.
   - **updated** → schreibe `details.before` zurück.
   - **deleted** → füge `details.before` wieder ein (Update-oder-Einfügen, falls eine Zeile mit dieser ID wieder auftauchte).
4. Jede Umkehrung wird selbst geprüft (`action: "<entityType>_undone"`, keine `batchId` – Rückgängigmachen-von-Rückgängigmachen ist außer Reichweite).

Die Op wird aus dem expliziten **Erstellen-Marker** gewählt, nicht aus einem fehlenden Bild davor abgeleitet – ein legitimes leeres Bild davor oder eine gekürzte Zeile muss nicht mit einer Erstellung verwechselt werden.

Die Ergebnis-Nutzlast ist `{ restored, skippedConflicts: [...], failed: [...], status }`; der Batch wechselt zu `undone` (sauber) oder `partial`. **Es gibt keine Cross-DB-Transaktion** – Rückgängigmachen ist Best-Effort pro Zeile, die gleiche Einschränkung, die Planning Center für zusammengeführte Profile dokumentiert.
