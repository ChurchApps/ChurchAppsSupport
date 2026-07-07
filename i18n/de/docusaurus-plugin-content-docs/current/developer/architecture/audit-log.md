---
title: "Audit-Protokoll & Rückgängigmachbare Stapel"
---

# Audit-Protokoll & Rückgängigmachbare Stapel

<div class="article-intro">

Jede vom Benutzer eingeleitet Mutation in der API wird aufgezeichnet — wer, was, wann und woher — über alle Module hinweg, ohne Module-spezifische Verkabelung. Darüber sitzt eine Stapelschicht: Ein Import oder eine Massenaktion kann als Stapel markiert und später **rückgängig gemacht** werden, Zeile für Zeile, Planning-Center-Stil. Beide leben in einer einzelnen `auditLogs`-Tabelle in der Mitgliedschaftsdatenbank und werden vollständig von einem Choke-Punkt angetrieben, `BaseController.actionWrapper`. Diese Seite zeigt, was überwacht wird, wo die Daten sind, die Leistungs-Trade-offs, die es prägen, und wie Rückgängigmachen einen Stapel sicher ohne cross-database Transaktionen rückgängig macht.

</div>

Die Struktur umfasst:
- **Wrapper & Registry** im Controller-Schicht
- **Rückgängigmachungs-Engine** für Stapel-Umkehrung  
- **Audit-Helfer** für Protokollierung und Datensicherung
- **Repositories & Modelle** für Audit-Daten
- **Admin-Oberflächen** in B1Admin und B1Transfer für Überwachung und Rückgängigmachen

Zwei strukturelle Fakten sind grundlegend:

1. **Die Controller-Schicht ist der einzige Ort, der den Akteur kennt.** Repositories sehen niemals `AuthenticatedUser`; nur Controller halten `au`. Jedes Modul-Controllers gehen bereits durch `BaseController.actionWrapper`, also ist das, wo Überwachung eingehakt wird — keine Repository-Signaturen ändern sich überall.
2. **Eine Tabelle bedient alle Module.** Überwachungszeilen für Spenden, Anwesenheit, Inhalt usw. werden alle in die `auditLogs`-Tabelle der Mitgliedschaftsdatenbank geschrieben über `RepoManager.getRepos("membership")`, sogar von einem nicht-Mitgliedschafts-Controller. „Alles, was Jane heute änderte" bleibt eine einzelne Abfrage.

Das Rückgängigmachen von Stapeln ist streng: vor-Bilder werden geladen, Konflikte werden geprüft gegen spätere Änderungen, und jede Umkehrung wird selbst überwacht. Batch-Status-Zustände sind `open|completed|undone|partial|failed`.

Siehe verwandte Dokumentation für vollständige Details und Implementierungen.
