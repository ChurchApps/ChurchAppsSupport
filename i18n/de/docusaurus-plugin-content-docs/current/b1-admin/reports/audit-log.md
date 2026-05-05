---
title: "Prüfprotokoll"
---

# Prüfprotokoll

<div class="article-intro">

Das Prüfprotokoll verfolgt alle wichtigen Aktionen und Änderungen in Ihrem Kirchenverwaltungssystem. Verwenden Sie es, um Anmeldeaktivitäten zu überprüfen, nachzuverfolgen, wer Änderungen an Personendatensätzen vorgenommen hat, Berechtigungsaktualisierungen zu überwachen und die Rechenschaftspflicht in Ihrem Team aufrechtzuerhalten.

</div>

<div class="prereqs">
<h4>Bevor Sie beginnen</h4>

- B1 Admin-Konto mit Server-Administrator-Zugriff
- Navigieren Sie zu **Settings**, um das Prüfprotokoll zu finden

</div>

## Anzeigen des Prüfprotokolls

1. Gehen Sie zu **Settings** in B1 Admin.
2. Wählen Sie **Audit Log**.
3. Das Protokoll zeigt aktuelle Einträge in einer Tabelle mit folgenden Spalten an:
   - **Date** -- Wann die Aktion erfolgt ist.
   - **Category** -- Die Art der Aktion (farbcodiert für schnelles Scannen).
   - **Action** -- Was getan wurde (z. B. create, update, delete, login_success).
   - **Entity** -- Der Typ und die ID des betroffenen Datensatzes.
   - **IP Address** -- Die IP-Adresse des Benutzers, der die Aktion durchgeführt hat.
   - **Details** -- Eine Zusammenfassung der spezifischen Änderungen.

## Filtern des Protokolls

Verwenden Sie die Filter am oberen Rand der Seite, um die Ergebnisse einzugrenzen:

- **Category** -- Nach Aktionstyp filtern:
  - **All Categories** -- Alles anzeigen.
  - **Login** -- Erfolgreiche und fehlgeschlagene Anmeldungen.
  - **People** -- Erstellen, Aktualisieren oder Löschen von Personendatensätzen.
  - **Permissions** -- Gewährung und Widerruf von Berechtigungen.
  - **Donations** -- Änderungen an Spendendatensätzen.
  - **Groups** -- Gruppenverwaltungsaktionen.
  - **Forms** -- Formularübermittlungsaktivität.
  - **Settings** -- Konfigurationsänderungen.
- **Start Date** -- Einträge ab diesem Datum anzeigen.
- **End Date** -- Einträge bis zu diesem Datum anzeigen.

Klicken Sie nach dem Festlegen Ihrer Filter auf **Search**, um die Ergebnisse zu aktualisieren.

## Kategorien verstehen

Jede Kategorie ist farbcodiert für schnelle Identifikation:

- **Login** -- Blauer Chip. Verfolgt erfolgreiche und fehlgeschlagene Anmeldeversuche.
- **People** -- Violetter Chip. Verfolgt Erstellen, Aktualisieren und Löschen von Personendatensätzen.
- **Permissions** -- Roter Chip. Verfolgt, wann Zugriffsrechte gewährt oder widerrufen werden.
- **Donations** -- Grüner Chip. Verfolgt Änderungen an Spendendatensätzen.
- **Groups** -- Grauer Chip. Verfolgt Gruppenverwaltungsoperationen.
- **Forms** -- Oranger Chip. Verfolgt Formularübermittlungsaktivität.
- **Settings** -- Gelber Chip. Verfolgt Konfigurationsänderungen.

## Exportieren des Protokolls

Wenn Protokolleinträge angezeigt werden, erscheint eine **CSV download**-Schaltfläche. Klicken Sie darauf, um die aktuellen gefilterten Ergebnisse in eine Tabellenkalkulation für die Offline-Überprüfung oder Aufzeichnung zu exportieren.

## Paginierung

Verwenden Sie die Paginierungssteuerelemente am unteren Rand der Tabelle, um durch die Ergebnisse zu navigieren. Sie können 25, 50 oder 100 Einträge pro Seite anzeigen.

:::info
Prüfprotokolleinträge werden automatisch ein Jahr lang aufbewahrt. Einträge, die älter als 365 Tage sind, werden entfernt, um die Systemleistung aufrechtzuerhalten.
:::

:::tip
Überprüfen Sie das Prüfprotokoll regelmäßig, besonders nach dem Onboarding neuer Teammitglieder oder nach bedeutenden Konfigurationsänderungen. Es hilft, unerwartete Aktivitäten frühzeitig zu erkennen.
:::

## Verwandte Artikel

- [Roles & Permissions](../settings/roles-permissions) -- Verwalten Sie, wer auf was zugreifen kann
- [Data Security](../settings/data-security) -- Verstehen Sie, wie Ihre Daten geschützt werden
- [Reports Overview](./index.md) -- Sehen Sie alle verfügbaren Berichte
