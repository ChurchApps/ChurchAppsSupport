---
title: "Audit-Log"
---

# Audit-Log

<div class="article-intro">

Das Audit-Log verfolgt alle wichtigen Aktionen und Änderungen in Ihrem Kirchengemeinde-Verwaltungssystem. Verwenden Sie es, um Anmeldeaktivitäten zu überprüfen, nachzuverfolgen, wer Personendatensätze geändert hat, Berechtigungsaktualisierungen zu überwachen und Verantwortlichkeit über Ihr Team hinweg zu wahren.

</div>

<div class="prereqs">
<h4>Bevor Sie beginnen</h4>

- B1 Admin-Konto mit Server-Admin-Zugriff
- Navigieren Sie zu **Einstellungen**, um das Audit-Log zu finden

</div>

## Das Audit-Log ansehen

1. Gehen Sie zu **Einstellungen** in B1 Admin.
2. Wählen Sie **Audit-Log**.
3. Das Log zeigt kürzliche Einträge in einer Tabelle mit den folgenden Spalten an:
   - **Datum** -- Wann die Aktion erfolgte.
   - **Kategorie** -- Die Art der Aktion (farbig codiert für schnelles Scannen).
   - **Aktion** -- Was getan wurde (z.B. erstellen, aktualisieren, löschen, login_success).
   - **Entität** -- Der Typ und die ID des betroffenen Datensatzes.
   - **IP-Adresse** -- Die IP-Adresse des Benutzers, der die Aktion ausgeführt hat.
   - **Details** -- Eine Zusammenfassung der spezifischen Änderungen.

## Das Log filtern

Verwenden Sie die Filter oben auf der Seite, um die Ergebnisse einzugrenzen:

- **Kategorie** -- Nach Aktionstyp filtern:
  - **Alle Kategorien** -- Alles anzeigen.
  - **Anmeldung** -- Anmeldeerfolge und -fehler.
  - **Personen** -- Erstellen, Aktualisieren oder Löschen von Personendatensätzen.
  - **Berechtigungen** -- Gewährung und Entzug von Berechtigungen.
  - **Spenden** -- Änderungen an Spendendatensätzen.
  - **Gruppen** -- Gruppenverwaltungsaktionen.
  - **Formulare** -- Formulareinreichungsaktivität.
  - **Einstellungen** -- Konfigurationsänderungen.
- **Startdatum** -- Einträge von diesem Datum an anzeigen.
- **Enddatum** -- Einträge bis zu diesem Datum anzeigen.

Klicken Sie auf **Suche**, nachdem Sie Ihre Filter eingestellt haben, um die Ergebnisse zu aktualisieren.

## Kategorien verstehen

Jede Kategorie ist farblich codiert, um schnelle Identifikation zu ermöglichen:

- **Anmeldung** -- Blauer Chip. Verfolgt erfolgreiche und fehlgeschlagene Anmeldeversuche.
- **Personen** -- Violetter Chip. Verfolgt Personendatensätze erstellen, aktualisieren und löschen.
- **Berechtigungen** -- Roter Chip. Verfolgt, wenn Zugriffsrechte gewährt oder entzogen werden.
- **Spenden** -- Grüner Chip. Verfolgt Änderungen an Spendendatensätzen.
- **Gruppen** -- Grauer Chip. Verfolgt Gruppenverwaltungsvorgänge.
- **Formulare** -- Orangener Chip. Verfolgt Formulareinreichungsaktivität.
- **Einstellungen** -- Gelber Chip. Verfolgt Konfigurationsänderungen.

## Das Log exportieren

Wenn Log-Einträge angezeigt werden, erscheint eine Schaltfläche **CSV-Download**. Klicken Sie darauf, um die aktuellen gefilterten Ergebnisse in eine Tabellenkalkulation zu exportieren, um sie offline zu überprüfen oder zu speichern.

## Paginierung

Verwenden Sie die Paginierungssteuerelemente am unteren Rand der Tabelle, um durch Ergebnisse zu navigieren. Sie können 25, 50 oder 100 Einträge pro Seite anzeigen.

:::info
Audit-Log-Einträge werden automatisch für ein Jahr aufbewahrt. Einträge, die älter als 365 Tage sind, werden entfernt, um das System leistungsfähig zu halten.
:::

:::tip
Überprüfen Sie das Audit-Log regelmäßig, besonders nach dem Onboarding neuer Mitglieder oder nach umfangreichen Konfigurationsänderungen. Dies hilft dabei, unerwartete Aktivitäten frühzeitig zu identifizieren.
:::

## Verwandte Artikel

- [Rollen & Berechtigungen](../settings/roles-permissions) -- Verwalten Sie, wer auf was zugreifen kann
- [Datensicherheit](../settings/data-security) -- Verstehen Sie, wie Ihre Daten geschützt werden
- [Berichte-Übersicht](./index.md) -- Sehen Sie alle verfügbaren Berichte
