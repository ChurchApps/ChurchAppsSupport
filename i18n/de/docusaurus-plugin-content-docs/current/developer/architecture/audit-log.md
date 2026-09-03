---
title: "Audit-Protokoll und Rückgängig-Batches"
---

# Audit-Protokoll und Rückgängig-Batches

<div class="article-intro">

Jede von Benutzern initiierte Mutation in der Api wird aufgezeichnet – wer, was, wann und von wo – über alle Module hinweg, ohne jegliche pro-Controller-Verkabelung. Auf diesem Ledger sitzt eine Batch-Ebene: Ein Import oder eine Massenoperation kann als Batch gekennzeichnet und später **rückgängig gemacht** werden, Zeile für Zeile, Planning-Center-Stil. Beide leben in einer einzelnen Tabelle `auditLogs` in der Mitgliedschaftsdatenbank und werden vollständig von einem Chokepoint angetrieben, `BaseController.actionWrapper`. Diese Seite bildet das Audit ab, wo die Daten leben, die Performance-Tradeoffs, die sie prägen, und wie Undo einen Batch sicher ohne Cross-Database-Transaktionen umgekehrt.

</div>

## Übersicht

```
jede mutierende Anfrage (POST/PUT/PATCH/DELETE)
        │
        ▼
BaseController.actionWrapper ──▶ ableiten {module, entityType, category, action}
        │                         von req.baseUrl + Methode  (AUDIT_REGISTRY = Overrides/Opt-outs nur)
        │
        ├─ Normalmodus ─────────▶ Aktion ausführen ─▶ warten AuditLogHelper.log(nach-Werten)  ──┐
        │                                        (Löschen erfassen auch ein Vorher-Bild)     │
        │                                                                                  ▼
        └─ X-Batch-Id vorhanden ──▶ Schnappschuss Vorher-Bilder (streng) ─▶ Aktion ausführen ─▶ Audit-Zeilen mit batchId kennzeichnen
                                                                                           │
                                                                                           ▼
                                                             auditLogs  (Mitgliedschafts-DB, eine Tabelle, alle Module)
                                                                                           │
   POST /membership/batches/:id/undo ──▶ BatchUndoHelper ──▶ Zeilen rückwärts, pro Entität ┘
                                          Konfliktschutz → Wiederherstellen / Löschen / Neu einfügen
```

Zwei strukturelle Fakten treiben alles unten:

1. **Die Controller-Ebene ist der einzige Ort, der den Akteur kennt.** Repositorys sehen `AuthenticatedUser` nie; nur Controller halten `au`. Jeder Module's Controllers durchlaufen bereits `BaseController.actionWrapper`, so dass dort Auditing hakkt – keine Repo-Signaturen ändern sich irgendwo.
2. **Eine Tabelle dient alle Module.** Audit-Zeilen für Geben, Anwesenheit, Inhalt, usw. werden alle in die `auditLogs` der Mitgliedschafts-DB über `RepoManager.getRepos("membership")` geschrieben, auch von einem Nicht-Mitgliedschafts-Controller. "Alles, was Jane heute geändert hat" bleibt eine einzelne Abfrage.

## Was wird geprüft

Auditing ist **standardmäßig an für jedes mutieren Verb auf jeder Route**. `actionWrapper` leitet die Audit-Felder von der Anfrage mit Null pro-Route Config ab:

| Feld | Abgeleitet von |
|-------|--------------|
| `module` | `this.moduleName` (das besitzende Modul) |
| `entityType` | singularisiertes letztes Segment von `req.baseUrl` (z.B. `/membership/people` → `person`) |
| `category` | Standards zu `entityType` |
| `action` | `${entityType}_saved` für `POST /`, `${entityType}_deleted` für `DELETE /:id`, ansonsten `${entityType}_${method}:${routePath}` damit Nicht-CRUD Sub-Routen (z.B. `task_post:/:id/move`) automatisch erfasst werden |

`BaseController.AUDIT_REGISTRY` ist **nur für Overrides und Opt-outs** – es ist keine Allowliste. Eine Route erscheint dort, um ihre Kategorie/EntityType umzubenennen, um `{ dbModule, table }` zu deklarieren (was es batch- und undo-fähig macht), um sie `sensitive` zu markieren (Audit anonymer Mutationen), oder um sie mit `optOut: true` auszuschalten.

**Opt-out-Liste** (Firehose-Schreibpfade, die das Ledger ertränken würden): Anwesenheits `visits` / `visitsessions` / `sessions` / `checkin` (der Sonntags-Check-in-Sturm) und Messaging `messages` / `connections` / `devices` (Chat und Präsenz). Alles andere protokolliert.

**Bulk-Endpunkte** (`people/bulk-delete`, `people/bulk-update`, `groupmembers/bulk-add`, `groupmembers/bulk-remove`) sind in `BULK_ROUTES` registriert und geben **eine Audit-Zeile pro betroffene ID** aus, so dass ein 10k-Personen-Import 10k Zeilen produziert – diese Pro-Entität Granularität ist genau, was den Batch rückgängig machbar macht.

**Anonyme Mutationen** (`actionWrapperAnon` – Gastegebung, Gastregistrierung, Formulareinreichungen) werden nur für Registry-gekennzeichnete `sensitive` Routen geprüft, geschrieben mit `userId="anonymous"` plus der Client-IP. Spenden führen die Liste an; dieser Pfad hat eine echte Regressions-Geschichte.

### Geheimnisses Redaktion und Größenkappen

Bevor irgendeine `details` Nutzlast gespeichert wird, führt `AuditLogHelper.capDetails()` `sanitizeValue()` über sie aus:

- **Geheimnisvollen Schlüssel werden redigiert.** Jedes Feld, dessen Kleinbuchstabenname in `SENSITIVE_KEYS` ist (`password`, `token`, `cvv`, `cardnumber`, `routing_number`, `accesstoken`, `clientsecret`, …), wird durch `"[redacted]"` ersetzt.
- **Riesige Skalare werden entfernt.** Jede `data:` URI oder String über 4 KB (Base64-Fotos, Blobs) wird zu `"[stripped]"`.
- **Überdimensionierte Zeilen sind gekürzt.** Wenn der serialisierte JSON ~64 KB überschreitet, wird die gesamte Nutzlast durch `{ truncated: true }` ersetzt. Gekürzte Zeilen sind immer noch einsehbar – aber **nicht rückgängig machbar** (es gibt kein Vor-/Nachher-Bild, um es wiederherzustellen).

## Wo die Daten leben

Eine einzige `auditLogs` Tabelle in der **Mitgliedschafts**-Datenbank stützt jedes Modul. Spalten: `id, churchId, userId, category, action, entityType, entityId, details (MEDIUMTEXT JSON-String), ipAddress, module, batchId, created`. Die Migration `tools/migrations/membership/2026-07-04_audit_universal.ts` fügt `module` + `batchId` hinzu, verbreitert `details` von `TEXT` zu `MEDIUMTEXT`, fügt Indizes `ix_auditLogs_batch (batchId)` und `ix_auditLogs_entity (churchId, module, entityType, entityId, created)` hinzu, und erstellt die Tabelle `batches`. Die Spalte `module` existiert genau deshalb, um `entityType` Kollisionen über Module (`note`, `setting` existieren in mehreren) filtermbar zu halten, und der Entität-Index ist, was beide Pro-Entität-Historie und den Undo-Konfliktschutz macht.

Cross-Modul-Schriften gehen durch `RepoManager.getRepos("membership")` von innen der Wrapper. Die Reihenfolge ist absichtlich: **die Haupt-Schrift macht in der Modul-DB zuerst Commit, die Audit-Einfügung zweiten.** Im normalen Modus wird ein Audit-Einfügungsfehler geschluckt (`console.error`, Sentry nimmt es auf) – Audit ist beratend und muss eine Benutzeranfrage nie fehlschlagen. Im **Batch-Modus ist es streng** (siehe unten).

:::info Warum nicht Trigger, CDC oder pro-Modul-Tabellen?
- **MySQL-Trigger** kennen den handelnden Benutzer nicht (die Verbindung hat keinen `au`), und würden Trigger-Sets über jeden Schema warten.
- **binlog / CDC** ist ein ganzes Infrastruktur-Projekt mit dem gleichen Akteur-Identitäts-Problem.
- **Threading `userId` durch jedes Repo** würde hunderte von Dateien berühren, um Informationen zu verschieben, die die Controller-Ebene bereits hat.
- **Pro-Modul-Audit-Tabellen** würde 7× die Rohrleitungen bedeuten und Fan-out-Abfragen für jede Cross-Modul-Frage. Eine Tabelle am Controller Chokepoint ist das Least-Code-Design, das den Akteur immer noch erfasst.
:::

## Performance-Haltung

Der heißer Pfad ist bewusst günstig; die Kosten werden nur bezahlt, wo es etwas kauft.

- **Keine Lese-vor-Schreibe beim normalen Update.** Ein regulärer Save **lädt den alten Datensatz nicht**. Die **eingereichten Nach-Werte** werden in `details.after` gespeichert; das UI rekonstruiert alt→neu bei *Ansicht*-Zeit durch Diffing gegen den vorherigen Audit-Eintrag der Entität. Eine Abfrage bei Ansicht-Zeit, Null-Kosten bei Schreib-Zeit. Felder, die seit dem Start nie angerührt werden, zeigen einfach keinen "alten" Wert – akzeptabel.
- **Löschen bekommt ein Vorher-Bild.** `DELETE /:id` auf einer Registry-Route mit `{ dbModule, table }` lädt die Zeile zuerst allgemein und speichert sie in `details.before`. Löschen sind selten und das Vorher-Bild ist der gesamte forensische Wert.
- **Batch-Modus ist die einzige systematische Lese-vor-Schreibe**, und es ist Opt-in – eine Bulk/Import-Operation ist bereits teuer, so dass N Schnappschuss-Lesevorgänge der Preis des Undo.
- **Audit-Einfügungen sind Await.** `actionWrapper` sammelt die Log-Versprechen und `await Promise.allSettled(...)` bevor sie zurückkehrt. Dies ist die einzeln wichtigste Invariante: auf Lambda friert der Container die Sekunde ein, die die Antwort zurückkehrt, so dass ein unerwarteter Einfügung stillschweigend verworfen wird. "Fire and forget" bedeutet hier *Fehler nicht die Anfrage fehlschlag*, nicht *nicht Await* – ein einzelner Einfügung auf dem bereits warmen Mitgliedschafts-Pool ist ~1–3 ms.

## Batches und Undo

Ein **Batch** gruppiert einen Satz Mutationen, so dass sie gemeinsam überprüft und umgekehrt werden können. Es gibt zwei Wege, einen zu öffnen:

- **Explizit:** `POST /membership/batches { label, source }` gibt ein `batchId` zurück. Der Client (B1Transfer, eine B1Admin Import UI) sendet dann `X-Batch-Id: <id>` auf jedem nachfolgenden Speichern/Löschen. `POST /membership/batches/:id/complete` schließt ihn und stemmt `itemCount`.
- **Implizit:** Die vier Bulk-Endpunkte öffnen, füllen und vollständigen ihren eigenen Batch innerhalb des einzelnen Anfrage, gibt `batchId` in der Antwort zurück.

Die Tabelle `batches` (Mitgliedschafts-DB): `id, churchId, userId, label, source, status (open|completed|undone|partial|failed), itemCount, created, completedAt, undoneAt`.

### Batch-Modus ist streng

Wenn `X-Batch-Id` vorhanden ist, straffen `actionWrapper` jeden Wächter (`writeBatchAuditRows`):

1. Der Batch muss vorhanden sein, `open` sein und zu `au.churchId` gehören – ansonsten **403**.
2. Die Route muss Batch-fähig sein (`{ dbModule, table }` in der Registry) – ansonsten **400**.
3. Bevor die Aktion ausgeführt wird, werden Vorher-Bilder für alle betroffenen IDs in **einer** `WHERE id IN (...) AND churchId = ?` Abfrage geladen. Wenn diese Schnappschuss-Lese fehlschlägt, **fehlschlägt die Anfrage 500 und die Aktion wird nicht ausgeführt** – Batch-Modus muss einen Un-undoable-Ledger stillschweigend nicht produzieren. (Normalmodus dagegen ist Best-Effort und schluckt Schnappschuss-Fehler.)
4. Nach der erfolgreichen Aktion wird eine Audit-Zeile pro Entität mit `batchId`, `details.before` und `details.after` geschrieben, plus eine explizite **Create-Markierung** für Zeilen, die der Batch erstellt hat.

### Undo

`POST /membership/batches/:id/undo` (Berechtigung: Batch-Ersteller oder `Permissions.server.admin`). Es weigert sich, wenn der Batch nicht `completed` ist oder älter als das Fenster **30-Tag Undo** ist. `BatchUndoHelper.undo()` dann:

1. Lädt die Audit-Zeilen des Batch und **gruppiert sie nach `(module, entityType, entityId)`.** Eine Entität, die mehrmals innerhalb eines Batches berührt wird, wird **einmal** umgekehrt, zurück zu ihrer echten Vor-Batch-State – das früheste Vorher-Bild, oder ein Löschen, wenn der Batch es erstellt hat. Dies ist, warum Undo nicht naiv jede Zeile wiedergibt: Ein Zwischenbild einer Mid-Batch-Snapshot wiederherstellen würde falsch sein.
2. Für jede Entität führt der **Konfliktschutz zuerst** aus: `auditLog.hasLaterModification()` fragt, ob ein *späterer* Audit-Eintrag für das gleiche `(module, entityType, entityId)` außerhalb dieses Batches vorhanden ist. Wenn ja, wurde die Entität nach dem Import bearbeitet – sie wird **übersprungen und berichtet**, niemals überschrieben. Dies wiederverwendet das Audit-Protokoll selbst als Modifikationsdetektor; keine `modifiedAt` Spalten sind auf jeder Tabelle erforderlich.
3. Umgekehrt pro dem aufgezeichneten op, wird `{ dbModule, table }` aus der Registry aufgelöst und verwendet generische Kysely-Schriften:
   - **created** → hart-löschen die Zeile.
   - **updated** → schreiben `details.before` zurück.
   - **deleted** → neu einfügen `details.before` (Update-oder-Einfügen, wenn eine Zeile mit dieser ID erneut auftaucht).
4. Jede Umkehrung wird selbst geprüft (`action: "<entityType>_undone"`, kein `batchId` – Undo-of-Undo ist außerhalb des Umfangs).

Der op wird aus der expliziten **Create-Markierung** gewählt, nicht aus einem fehlenden Vorher-Bild abgeleitet – ein legitimes leeres Vorher-Bild oder eine gekürzte Zeile darf nicht mit einem Create verwechselt werden.

Das Ergebnis der Nutzlast ist `{ restored, skippedConflicts: [...], failed: [...], status }`; der Batch wechselt zu `undone` (sauber) oder `partial`. **Es gibt keine Cross-DB-Transaktion** – Undo ist Best-Effort pro Zeile, die gleiche Einschränkung, die Planning Center für zusammengeführte Profile dokumentiert.

:::warning Seite-Effekt-Entitäten benötigen einen `onUndo` Hook
Eine `groupMember` Erstellen zu umzukehren muss auch `groupMemberHistory` schreiben ("links"), oder Churn Analytics stillschweigend brechen – ein permanenter Arbeitsbereich Invariante. Solche Entitäten registrieren einen `onUndo` Rückruf in `AUDIT_REGISTRY`, der `true` zurückgibt, wenn er die Umkehrung vollständig behandelt hat, umgeht den generischen Pfad. `groupMembers` ist der kanonische Fall (durch Zeilen-ID auf dem expliziten Pfad gekennzeichnet, aber durch `personId` auf Bulk-Endpunkten, und History-Nachverfolgung auf jedem hinzufügen/entfernen).
:::

## Consumer-Oberflächen

Beide Admin-Oberflächen sind **im Fortschritt**; die Absicht:

| Oberfläche | Repo | Zweck |
|---------|------|---------|
| **Audit-Protokoll-Seite** | B1Admin (ManageChurch → Audit-Protokoll) | Filter nach Modul/Kategorie/Benutzer/Entität und Alt→Neu Diffs rendern – für Bearbeitungen durch Diffing gegen den vorherigen Eintrag der Entität, für Löschen von `details.before`. Gesichert durch `GET /membership/auditlogs`, im Tor durch `Permissions.server.admin`. |
| **Batches-Seite** | B1Admin (gleiche Einstellungs-Hub) | Batch-Listen mit Status und Zählern, **Ergebnisse ansehen** (die Batch's Audit-Zeilen über `GET /membership/batches/:id/results`), und ein Knopf **Undo**, der den übersprungenen-Konflikt / fehlgeschlagen-Report Oberflächen. |
| **Batch importieren** | B1Transfer | Öffnen Sie einen Batch, senden Sie `X-Batch-Id` auf seiner normalen Speichern Anrufe, komplett am Ende – Importe werden rückgängig machbar mit keinen neuen Import Endpunkten. Die alte `importKey` bleibt als eine Erstellt-nur Lineage-Markierung, übertroffen für Undo. |

## Gotchas ein zukünftiger Wechsel muss nicht regrediert werden

- **Audit-Einfügungen müssen Await bleiben.** Un-Await `AuditLogHelper.log(...)` wird durch die Lambda-Gefrierzeit verworfen. Sammeln Sie Versprechen und `await Promise.allSettled` bevor Sie zurückkehren.
- **Kysely tropft `undefined` von `.set()`/`.values()`.** Bei der Wiederherstellung würde eine geleerte Spalte unberührt überleben. `BatchUndoHelper` konvertiert jedes abwesende Feld zu explizit `null` (`nullify`) – übergeht es nie für einen "schnelleren" direkt Schreib.
- **Aufbewahrung muss gut über dem Undo-Fenster bleiben.** `AuditLogRepo.deleteOld()` wird auf dem nächtlichen Timer ausgeführt (Standard 365-Tage-Aufbewahrung); das Undo-Fenster ist 30 Tage. Wenn die Aufbewahrung jemals zum Fenster neigt, werden Undo-Ledger aus unter offenen Batches gelöscht.
- **Gekürzte Zeilen sind nicht rückgängig machbar.** Eine `{ truncated: true }` Nutzlast hat kein Vor-/Nachher-Bild; Undo berichtet es als `failed`, vermutet nie.
- **Reihenfolge ist Modul-Schreib-dann-Audit.** Verschieben Sie die Audit-Einfügung nie vor der echten Schreib, und halten Sie sie streng-im-Batch / beratend-im-Normalmodus.

## Datei-Inventar

| Bereich | Dateien |
|------|-------|
| Wrapper / Registry | `Api/src/shared/infrastructure/BaseController.ts` (`AUDIT_REGISTRY`, `BULK_ROUTES`, `actionWrapper`, `actionWrapperAnon`, Schnappschuss + Schreib-Zeilen) |
| Undo-Engine | `Api/src/shared/infrastructure/BatchUndoHelper.ts` |
| Audit-Helfer | `Api/src/modules/membership/helpers/AuditLogHelper.ts` (`log`, `capDetails`/`sanitizeValue`, `diffFields`, `getClientIp`) |
| Controller | `Api/src/modules/membership/controllers/AuditLogController.ts`, `BatchController.ts` |
| Modelle / Repos | `Api/src/modules/membership/models/AuditLog.ts`, `Batch.ts`; `repositories/AuditLogRepo.ts` (`loadFiltered`, `loadForBatch`, `hasLaterModification`, `deleteOld`), `BatchRepo.ts` |
| Migration | `Api/tools/migrations/membership/2026-07-04_audit_universal.ts` |
| Admin-UI (im Fortschritt) | B1Admin Audit-Protokoll + Batches-Seiten; B1Transfer Import-Batch-Kopfzeile |

## Verwandte Seiten

- [Modulstruktur](../api/module-structure) – wie ein Nicht-Mitgliedschafts-Controller die Mitgliedschafts-Repos durch `RepoManager` erreicht
- [Geben](./giving) – die Spenden-Schreibpfade, die als `sensitive` geprüft werden, auch wenn anonym
- [Mitgliedschafts-Endpunkte](../api/endpoints/membership) – die REST-Oberfläche, die `X-Batch-Id` trägt und `/auditlogs` und `/batches` ausäußert
