---
title: "Audit-Protokoll"
---

# Audit-Protokoll

<div class="article-intro">

Das Audit-Protokoll verfolgt alle wesentlichen Aktionen und Änderungen in Ihrem Kirchenmanagementsystem. Verwenden Sie es, um die Anmeldungs-Aktivität zu überprüfen, nachzuverfolgung, wer Änderungen an Personendatensätzen vorgenommen hat, Berechtigungs-Updates zu überwachen und Verantwortlichkeit über Ihr Team zu wahren.

</div>

<div class="prereqs">
<h4>Bevor Sie beginnen</h4>

- B1 Admin-Konto mit Server-Admin-Zugriff
- Navigieren Sie zu **Einstellungen**, um das Audit-Protokoll zu finden

</div>

## Das Audit-Protokoll anzeigen

1. Gehen Sie zu **Einstellungen** in B1 Admin.
2. Wählen Sie **Audit-Protokoll**.
3. Das Protokoll zeigt aktuelle Einträge in einer Tabelle mit den folgenden Spalten:
   - **Datum** — Wann die Aktion vorkam.
   - **Kategorie** — Die Art der Aktion (farbcodiert zum schnellen Scannen).
   - **Aktion** — Was gemacht wurde (z.B. erstellen, aktualisieren, löschen, login_success).
   - **Entity** — Der Typ und die ID des betroffenen Datensatzes.
   - **IP-Adresse** — Die IP-Adresse des Benutzers, der die Aktion durchgeführt hat.
   - **Details** — Eine Zusammenfassung der spezifischen Änderungen.

## Das Protokoll filtern

Verwenden Sie die Filter oben auf der Seite, um die Ergebnisse einzugrenzen:

- **Kategorie** — Nach Aktionstyp filtern:
  - **Alle Kategorien** — Alles anzeigen.
  - **Anmeldung** — Anmeldungs-Erfolge und Fehler.
  - **Personen** — Erstellen, aktualisieren oder löschen von Personendatensätzen.
  - **Berechtigungen** — Berechtigungs-Zuschüsse und Widerrufe.
  - **Spenden** — Spenden-Datensatz-Änderungen.
  - **Gruppen** — Gruppen-Verwaltungs-Aktionen.
  - **Formulare** — Formular-Einreichungs-Aktivität.
  - **Einstellungen** — Konfigurationsänderungen.
- **Start-Datum** — Zeige Einträge von diesem Datum an.
- **End-Datum** — Zeige Einträge bis zu diesem Datum.

Klicken Sie auf **Suche** nach dem Einstellen Ihrer Filter, um die Ergebnisse zu aktualisieren.

## Kategorien verstehen

Jede Kategorie ist farbcodiert zum schnellen Identifizierung:

- **Anmeldung** — Blauer Chip. Verfolgt erfolgreiche und fehlgeschlagene Anmeldungs-Versuche.
- **Personen** — Lila Chip. Verfolgt Personendatensatz-Ersteller, Aktualisierungen und Löschungen.
- **Berechtigungen** — Roter Chip. Verfolgt, wenn Zugangsrechte gewährt oder entzogen werden.
- **Spenden** — Grüner Chip. Verfolgt Spenden-Datensatz-Änderungen.
- **Gruppen** — Grauer Chip. Verfolgt Gruppen-Verwaltungs-Operationen.
- **Formulare** — Orange Chip. Verfolgt Formular-Einreichungs-Aktivität.
- **Einstellungen** — Gelber Chip. Verfolgt Konfigurationsänderungen.

## Das Protokoll exportieren

Wenn Protokoll-Einträge angezeigt werden, erscheint eine **CSV-Download**-Schaltfläche. Klicken Sie darauf, um die aktuellen gefilterten Ergebnisse in eine Tabellenkalkulation für die Offline-Überprüfung oder Aufzeichnungszwecke zu exportieren.

## Pagination

Verwenden Sie die Paginierungs-Steuerungen am unteren Rand der Tabelle, um durch Ergebnisse zu navigieren. Sie können 25, 50 oder 100 Einträge pro Seite anzeigen.

:::info
Audit-Protokoll-Einträge werden automatisch ein Jahr lang aufbewahrt. Einträge älter als 365 Tage werden entfernt, um die System-Performance zu erhalten.
:::

:::tip
Überprüfen Sie das Audit-Protokoll regelmäßig, besonders nach dem Onboarding neuer Team-Mitglieder oder nachdem bedeutende Konfigurationsänderungen vorgenommen wurden. Dies hilft, unerwartet Aktivität früh zu identifizieren.
:::

## Verwandte Artikel

- [Rollen & Berechtigungen](../settings/roles-permissions) -- Verwalten Sie, wer Zugriff auf was hat
- [Datensicherheit](../settings/data-security) -- Verstehen Sie, wie Ihre Daten geschützt werden
- [Berichte-Übersicht](./index) -- Siehe alle verfügbaren Berichte
