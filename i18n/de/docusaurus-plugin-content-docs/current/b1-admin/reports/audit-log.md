---
title: "Änderungsprotokoll"
description: "Prüfen Sie das Änderungsprotokoll in B1 Admin, um zu sehen, wer sich angemeldet, Personendatensätze bearbeitet oder Berechtigungen geändert hat, und exportieren Sie gefilterte Einträge als CSV."
---

# Änderungsprotokoll

<div class="article-intro">

Das Änderungsprotokoll erfasst alle wichtigen Aktionen und Änderungen in Ihrem Gemeindeverwaltungssystem. Nutzen Sie es, um Anmeldeaktivitäten zu prüfen, nachzuvollziehen, wer Personendatensätze geändert hat, Berechtigungsänderungen zu überwachen und die Nachvollziehbarkeit in Ihrem Team sicherzustellen.

</div>

<div class="prereqs">
<h4>Bevor Sie beginnen</h4>

- Eine Rolle mit der Berechtigung **Kircheneinstellungen bearbeiten** (im Abschnitt **Inhalt** der Berechtigungen einer Rolle; dieselbe Berechtigung, mit der sich **Einstellungen** öffnen lassen). Siehe [Rollen und Berechtigungen](../settings/roles-permissions.md).

</div>

## Das Änderungsprotokoll anzeigen {#viewing-the-audit-log}

1. Öffnen Sie das [Sprungmenü](../introduction.md#getting-around-with-the-jump-menu) (die Suchleiste oben links in B1 Admin) und klappen Sie **Einstellungen** auf.
2. Klicken Sie auf **Änderungsprotokoll**.
3. Das Protokoll zeigt die neuesten Einträge in einer Tabelle mit den folgenden Spalten:
   - **Datum** -- Wann die Aktion stattgefunden hat.
   - **Modul** -- Der Bereich von B1, in dem die Änderung vorgenommen wurde (zum Beispiel Mitgliederverwaltung oder Spenden).
   - **Kategorie** -- Die Art des Datensatzes oder der Aktion (farblich markiert, damit sie sich schnell erfassen lässt).
   - **Aktion** -- Was getan wurde (z. B. Spende gespeichert, Anmeldung erfolgreich, Notiz aktualisiert).
   - **Objekt** -- Die Art und ID des betroffenen Datensatzes.
   - **IP-Adresse** -- Die IP-Adresse des Benutzers, der die Aktion ausgeführt hat.
4. Klicken Sie auf den Pfeil am Anfang einer Zeile, um deren Details zu sehen: eine Tabelle mit jedem geänderten Feld samt **Alter Wert** und **Neuer Wert** oder den **Gelöschter Datensatz** bei einer Löschung.

## Das Protokoll filtern {#filtering-the-log}

Verwenden Sie die Filter oben auf der Seite, um die Ergebnisse einzugrenzen:

- **Modul** -- Nach Bereich filtern: **Alle Module**, **Personen**, **Spenden**, **Anwesenheit**, **Nachrichten**, **Inhalt**, **Dienste** oder **Lektionen**.
- **Kategorie** -- Nach Aktionsart filtern:
  - **Alle Kategorien** -- Alles anzeigen.
  - **Anmeldung** -- Erfolgreiche und fehlgeschlagene Anmeldungen.
  - **Personen** -- Anlegen, Aktualisieren oder Löschen von Personendatensätzen.
  - **Berechtigungen** -- Erteilen und Entziehen von Berechtigungen.
  - **Spenden** -- Änderungen an Spendendatensätzen.
  - **Gruppen** -- Aktionen zur Gruppenverwaltung.
  - **Formulare** -- Aktivität bei Formulareinreichungen.
  - **Einstellungen** -- Konfigurationsänderungen.
- **Startdatum** -- Einträge ab diesem Datum anzeigen.
- **Enddatum** -- Einträge bis zu diesem Datum anzeigen.

Klicken Sie nach dem Festlegen Ihrer Filter auf **Suchen**, um die Ergebnisse zu aktualisieren.

## Die Kategorien verstehen {#understanding-categories}

Die Kategorie jedes Eintrags wird als farbiges Etikett angezeigt, damit sie sich schnell erkennen lässt:

- **login** -- Blaues Etikett. Erfasst erfolgreiche und fehlgeschlagene Anmeldeversuche.
- **person** -- Blaues Etikett. Erfasst das Anlegen, Aktualisieren und Löschen von Personendatensätzen.
- **permission** -- Rotes Etikett. Erfasst, wann Zugriffsrechte erteilt oder entzogen werden.
- **donation** -- Grünes Etikett. Erfasst Änderungen an Spendendatensätzen.
- **form** -- Oranges Etikett. Erfasst Aktivität bei Formulareinreichungen.
- **group** sowie weitere Kategorien (etwa **userchurch**) -- Graues Etikett.

## Notizverlauf bei Personen und Gruppen {#note-history-on-people-and-groups}

Wenn Sie das Änderungsprotokoll öffnen können, sehen Sie auch einen Nachweis geänderter Notizen direkt dort, wo die Notizen stehen, auf dem Reiter **Notizen** einer Person oder Gruppe:

1. Eine bearbeitete Notiz zeigt **(bearbeitet · Verlauf anzeigen)** neben ihrem Datum. Klicken Sie darauf, um das Änderungsprotokoll zu öffnen, gefiltert auf den Notizverlauf dieser Person bzw. Gruppe.
2. Eine gelöschte Notiz hinterlässt an ihrer Stelle eine ausgegraute Markierung **Gelöschte Notiz**, die anzeigt, wer sie geschrieben hat, wann sie veröffentlicht und wann sie gelöscht wurde. Klicken Sie auf **Verlauf anzeigen**, um dasselbe gefilterte Protokoll zu öffnen.
3. Klappen Sie im gefilterten Protokoll einen Eintrag **Notiz aktualisiert** oder **Notiz gelöscht** auf, um den alten Text und das Konto zu sehen, das die Änderung vorgenommen hat. Klicken Sie auf **Alle anzeigen**, um den Filter zu entfernen.
4. In der Spalte **Objekt** führt die ID einer Personen- oder Gruppennotiz zurück zu den Notizen dieser Person bzw. Gruppe.

Mitarbeitende, die das Änderungsprotokoll nicht öffnen können, sehen die Notizliste ohne diese Markierungen.

## Das Protokoll exportieren {#exporting-the-log}

Wenn Protokolleinträge angezeigt werden, erscheint oben auf der Seite die Schaltfläche **CSV exportieren**. Klicken Sie darauf, um die aktuell gefilterten Ergebnisse als Tabelle für die Prüfung offline oder für Ihre Unterlagen zu exportieren.

## Seitennavigation {#pagination}

Verwenden Sie die Seitensteuerung unten in der Tabelle, um durch die Ergebnisse zu blättern. Sie können 25, 50 (Standard) oder 100 Einträge pro Seite anzeigen.

:::info
Einträge im Änderungsprotokoll werden automatisch ein Jahr lang aufbewahrt. Einträge, die älter als 365 Tage sind, werden entfernt, damit das System leistungsfähig bleibt.
:::

:::tip
Prüfen Sie das Änderungsprotokoll regelmäßig, besonders nachdem neue Teammitglieder eingearbeitet wurden oder grundlegende Konfigurationsänderungen vorgenommen wurden. So fallen unerwartete Aktivitäten frühzeitig auf.
:::

## Verwandte Artikel {#related-articles}

- [Rollen und Berechtigungen](../settings/roles-permissions.md) -- Festlegen, wer worauf Zugriff hat
- [Datensicherheit](../settings/data-security.md) -- Erfahren Sie, wie Ihre Daten geschützt sind
- [Übersicht Berichte](./index.md) -- Alle verfügbaren Berichte anzeigen
