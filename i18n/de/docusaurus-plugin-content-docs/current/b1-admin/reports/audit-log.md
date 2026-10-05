---
title: "Audit-Protokoll"
---

# Audit-Protokoll

<div class="article-intro">

Das Audit-Protokoll verfolgt alle wichtigen Aktionen und Änderungen in Ihrem Kirchenverwaltungssystem. Verwenden Sie es, um Anmeldungsaktivitäten zu überprüfen, nachzuverfolgen, wer Änderungen an Personendatensätzen vorgenommen hat, Berechtigungsaktualisierungen zu überwachen und Verantwortlichkeit über Ihr Team hinweg zu gewährleisten.

</div>

<div class="prereqs">
<h4>Bevor Sie beginnen</h4>

- B1 Admin-Konto mit Server-Admin-Zugriff
- Navigieren Sie zu **Einstellungen**, um das Audit-Protokoll zu finden

</div>

## Audit-Protokoll anzeigen

1. Öffnen Sie das [Jump-Menü](../introduction.md#getting-around-with-the-jump-menu) (die Suchleiste oben links in B1 Admin) und erweitern Sie **Einstellungen**.
2. Klicken Sie auf **Audit-Protokoll**.
3. Das Protokoll zeigt aktuelle Einträge in einer Tabelle mit den folgenden Spalten:
   - **Datum** -- Wann die Aktion aufgetreten ist.
   - **Kategorie** -- Der Aktionstyp (farbkodiert für schnelle Überprüfung).
   - **Aktion** -- Was getan wurde (z. B. erstellen, aktualisieren, löschen, login_success).
   - **Entität** -- Der Typ und die ID des betroffenen Datensatzes.
   - **IP-Adresse** -- Die IP-Adresse des Benutzers, der die Aktion durchgeführt hat.
   - **Details** -- Eine Zusammenfassung der vorgenommenen spezifischen Änderungen.

## Protokoll filtern

Verwenden Sie die Filter oben auf der Seite, um die Ergebnisse einzugrenzen:

- **Kategorie** -- Nach Aktionstyp filtern:
  - **Alle Kategorien** -- Alles anzeigen.
  - **Anmeldung** -- Erfolgreiche und fehlgeschlagene Anmeldeversuche.
  - **Personen** -- Erstellen, Aktualisieren oder Löschen von Personendatensätzen.
  - **Berechtigungen** -- Berechtigungszuweisungen und -widerrufe.
  - **Spenden** -- Änderungen an Spendendatensätzen.
  - **Gruppen** -- Gruppenverwaltungsaktionen.
  - **Formulare** -- Formulareinreichungsaktivität.
  - **Einstellungen** -- Konfigurationsänderungen.
- **Startdatum** -- Einträge von diesem Datum an anzeigen.
- **Enddatum** -- Einträge bis zu diesem Datum anzeigen.

Klicken Sie auf **Suchen**, nachdem Sie Ihre Filter festgelegt haben, um die Ergebnisse zu aktualisieren.

## Kategorien verstehen

Jede Kategorie ist farbkodiert für schnelle Identifikation:

- **Anmeldung** -- Blauer Chip. Verfolgt erfolgreiche und fehlgeschlagene Anmeldeversuche.
- **Personen** -- Violetter Chip. Verfolgt Erstellen, Aktualisieren und Löschen von Personendatensätzen.
- **Berechtigungen** -- Roter Chip. Verfolgt, wenn Zugriffsrechte gewährt oder widerrufen werden.
- **Spenden** -- Grüner Chip. Verfolgt Änderungen an Spendendatensätzen.
- **Gruppen** -- Grauer Chip. Verfolgt Gruppenverwaltungsvorgänge.
- **Formulare** -- Orangefarbener Chip. Verfolgt Formulareinreichungsaktivität.
- **Einstellungen** -- Gelber Chip. Verfolgt Konfigurationsänderungen.

## Protokoll exportieren

Wenn Protokolleinträge angezeigt werden, wird eine Schaltfläche **CSV-Download** angezeigt. Klicken Sie darauf, um die aktuellen gefilterten Ergebnisse in eine Tabellenkalkulation zur Offline-Überprüfung oder Aufzeichnungsverwaltung zu exportieren.

## Seitennummerierung

Verwenden Sie die Seitennummerierungssteuerelemente am unteren Ende der Tabelle, um durch Ergebnisse zu navigieren. Sie können 25, 50 oder 100 Einträge pro Seite anzeigen.

:::info
Audit-Protokolleinträge werden automatisch ein Jahr lang beibehalten. Einträge, die älter als 365 Tage sind, werden entfernt, um das System performant zu halten.
:::

:::tip
Überprüfen Sie das Audit-Protokoll regelmäßig, besonders nach dem Onboarding neuer Teammitglieder oder nach bedeutenden Konfigurationsänderungen. Dies hilft, unerwartete Aktivitäten frühzeitig zu erkennen.
:::

## Verwandte Artikel

- [Rollen & Berechtigungen](../settings/roles-permissions) -- Verwaltung des Zugriffs
- [Datensicherheit](../settings/data-security) -- Verstehen Sie, wie Ihre Daten geschützt sind
- [Berichtübersicht](./index.md) -- Siehe alle verfügbaren Berichte
