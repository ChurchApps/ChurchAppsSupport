---
title: "Änderungsprotokoll"
description: "Das Änderungsprotokoll in B1 Admin prüfen, um zu sehen, wer sich angemeldet, Personendatensätze bearbeitet oder Berechtigungen geändert hat, und gefilterte Einträge als CSV exportieren."
---

# Änderungsprotokoll

<div class="article-intro">

Das Änderungsprotokoll erfasst alle wichtigen Aktionen und Änderungen in Ihrem Gemeindeverwaltungssystem. Nutzen Sie es, um Anmeldeaktivitäten zu prüfen, nachzuvollziehen, wer Personendatensätze geändert hat, Berechtigungsänderungen zu überwachen und die Nachvollziehbarkeit im Team sicherzustellen.

</div>

<div class="prereqs">
<h4>Bevor Sie beginnen</h4>

- B1-Admin-Konto mit Serveradministrator-Zugriff
- Öffnen Sie **Einstellungen**, um das Änderungsprotokoll zu finden

</div>

## Das Änderungsprotokoll ansehen

1. Öffnen Sie das [Sprungmenü](../introduction.md#getting-around-with-the-jump-menu) (die Suchleiste oben links in B1 Admin) und klappen Sie **Einstellungen** auf.
2. Klicken Sie auf **Änderungsprotokoll**.
3. Das Protokoll zeigt die neuesten Einträge in einer Tabelle mit folgenden Spalten:
   - **Datum** -- Wann die Aktion stattgefunden hat.
   - **Kategorie** -- Die Art der Aktion (farblich markiert, damit sie schnell erkennbar ist).
   - **Aktion** -- Was getan wurde (z. B. create, update, delete, login_success).
   - **Objekt** -- Die Art und ID des betroffenen Datensatzes.
   - **IP-Adresse** -- Die IP-Adresse der Person, die die Aktion ausgeführt hat.
   - **Details** -- Eine Zusammenfassung der konkreten Änderungen.

## Das Protokoll filtern

Verwenden Sie die Filter oben auf der Seite, um die Ergebnisse einzugrenzen:

- **Kategorie** -- Nach Aktionsart filtern:
  - **Alle Kategorien** -- Alles anzeigen.
  - **Anmeldung** -- Erfolgreiche und fehlgeschlagene Anmeldungen.
  - **Personen** -- Anlegen, Ändern oder Löschen von Personendatensätzen.
  - **Berechtigungen** -- Erteilte und entzogene Berechtigungen.
  - **Spenden** -- Änderungen an Spendenbuchungen.
  - **Gruppen** -- Aktionen zur Gruppenverwaltung.
  - **Formulare** -- Aktivität bei Formulareinsendungen.
  - **Einstellungen** -- Konfigurationsänderungen.
- **Startdatum** -- Einträge ab diesem Datum anzeigen.
- **Enddatum** -- Einträge bis zu diesem Datum anzeigen.

Klicken Sie nach dem Festlegen der Filter auf **Suchen**, um die Ergebnisse zu aktualisieren.

## Die Kategorien verstehen

Jede Kategorie ist farblich markiert, damit sie schnell erkennbar ist:

- **Anmeldung** -- Blaues Etikett. Erfasst erfolgreiche und fehlgeschlagene Anmeldeversuche.
- **Personen** -- Lila Etikett. Erfasst das Anlegen, Ändern und Löschen von Personendatensätzen.
- **Berechtigungen** -- Rotes Etikett. Erfasst, wann Zugriffsrechte erteilt oder entzogen werden.
- **Spenden** -- Grünes Etikett. Erfasst Änderungen an Spendenbuchungen.
- **Gruppen** -- Graues Etikett. Erfasst Vorgänge der Gruppenverwaltung.
- **Formulare** -- Orangefarbenes Etikett. Erfasst Aktivität bei Formulareinsendungen.
- **Einstellungen** -- Gelbes Etikett. Erfasst Konfigurationsänderungen.

## Notizverlauf bei Personen und Gruppen

Wenn Sie das Änderungsprotokoll öffnen können, sehen Sie außerdem die Spur geänderter Notizen direkt dort, wo die Notizen stehen, nämlich im Reiter **Notizen** einer Person oder Gruppe:

1. Eine bearbeitete Notiz zeigt neben ihrem Datum **(bearbeitet · Verlauf ansehen)**. Klicken Sie darauf, um das Änderungsprotokoll zu öffnen, gefiltert auf den Notizverlauf dieser Person oder Gruppe.
2. Eine gelöschte Notiz hinterlässt an ihrer Stelle eine ausgegraute Markierung **Gelöschte Notiz**. Sie zeigt, wer sie geschrieben hat, wann sie veröffentlicht und wann sie gelöscht wurde. Klicken Sie auf **Verlauf anzeigen**, um dasselbe gefilterte Protokoll zu öffnen.
3. Im gefilterten Protokoll können Sie einen Eintrag **Notiz geändert** oder **Notiz gelöscht** aufklappen, um den alten Text und das Konto zu sehen, das die Änderung vorgenommen hat. Klicken Sie auf **Alle anzeigen**, um den Filter zu entfernen.
4. In der Spalte **Objekt** verweist die ID einer Personen- oder Gruppennotiz zurück auf die Notizen dieser Person oder Gruppe.

Mitarbeitende, die das Änderungsprotokoll nicht öffnen können, sehen die Notizliste ohne diese Markierungen.

## Das Protokoll exportieren

Sobald Protokolleinträge angezeigt werden, erscheint eine Schaltfläche **CSV-Download**. Klicken Sie darauf, um die aktuell gefilterten Ergebnisse als Tabelle zu exportieren, zur Prüfung offline oder zur Dokumentation.

## Seitennavigation

Verwenden Sie die Seitensteuerung unten in der Tabelle, um durch die Ergebnisse zu blättern. Sie können 25, 50 oder 100 Einträge pro Seite anzeigen.

:::info
Einträge im Änderungsprotokoll werden automatisch ein Jahr lang aufbewahrt. Einträge, die älter als 365 Tage sind, werden entfernt, damit das System leistungsfähig bleibt.
:::

:::tip
Prüfen Sie das Änderungsprotokoll regelmäßig, besonders nach der Einarbeitung neuer Teammitglieder oder größeren Konfigurationsänderungen. So erkennen Sie unerwartete Aktivitäten früh.
:::

## Verwandte Artikel

- [Rollen & Berechtigungen](../settings/roles-permissions.md) -- Festlegen, wer worauf Zugriff hat
- [Datensicherheit](../settings/data-security.md) -- Wie Ihre Daten geschützt werden
- [Übersicht über Berichte](./index.md) -- Alle verfügbaren Berichte ansehen
