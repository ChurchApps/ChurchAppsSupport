---
title: "Daten exportieren"
---

# Daten exportieren

<div class="article-intro">

Mit B1 Admin können Sie Ihre Gemeindedaten exportieren, um sie in Tabellenkalkulationen zu verwenden, mit Ihrem Team zu teilen oder als Sicherungskopie aufzubewahren. Ob Sie eine schnelle Liste mit Namen und E-Mail-Adressen oder einen vollständigen Datenbankexport benötigen, es stehen Optionen für beide Fälle zur Verfügung.

</div>

<div class="prereqs">
<h4>Bevor Sie beginnen</h4>

- Sie benötigen ein aktives B1-Admin-Konto mit der Berechtigung, die Daten anzuzeigen, die Sie exportieren möchten. Lesen Sie [Rollen & Berechtigungen](roles-permissions.md), wenn Sie sich über Ihre Zugriffsstufe nicht sicher sind.
- Für einen vollständigen Datenbankexport benötigen Sie Zugriff auf den Bereich **Einstellungen**.

</div>

## Export über die Seite Personen

Der schnellste Weg, Ihr Verzeichnis zu exportieren, führt direkt über die Seite **Personen**:

1. Öffnen Sie das [Sprungmenü](../introduction.md#getting-around-with-the-jump-menu) (die Suchleiste oben links in B1 Admin), klappen Sie **Personen** auf und klicken Sie auf **Personen**.
2. Verwenden Sie die Suchleiste oder Filter, um die Ergebnisse einzugrenzen, die Sie exportieren möchten (oder lassen Sie die Ansicht ungefiltert, um alle Personen zu exportieren). Hinweise zum Filtern finden Sie unter [Personen suchen](searching-people.md).
3. Klicken Sie im Kopfbereich der Seite Personen auf die Schaltfläche **Exportieren**.
4. Eine CSV-Datei wird auf Ihren Computer heruntergeladen. Sie enthält die Personen aus Ihren aktuellen Ergebnissen mit Name, Kontaktdaten, Adresse und weiteren Standardfeldern.

:::tip
Der Export umfasst alle Personen in Ihren aktuellen Ergebnissen. Führen Sie zuerst eine Suche aus, laden Sie eine [gespeicherte Liste](./lists.md) oder verwenden Sie die **Erweiterte** Suche, um nur die Personen zu exportieren, die Sie benötigen.
:::

## Vollständiger Datenexport über die Einstellungen

Für einen vollständigen Export aller Ihrer B1-Daten (nicht nur der Personen) verwenden Sie das Exportwerkzeug in den Einstellungen:

1. Wählen Sie im Sprungmenü **Einstellungen > Einstellungen**.
2. Klicken Sie im linken Einstellungsmenü oben unter dem Namen Ihrer Gemeinde auf den Link **Import/Export**.
3. Wählen Sie im Dropdown-Menü **Datenquelle** die Option **B1-Datenbank**.
4. Prüfen Sie die Datenvorschau und klicken Sie auf **Weiter zum Ziel**.
5. Wählen Sie als Exportziel **B1-Export-ZIP** aus.
6. Verfolgen Sie den Fortschritt des Exports, bis alle Einträge grüne Häkchen zeigen.
7. Die Exportdatei wird automatisch heruntergeladen. Suchen Sie im Ordner Downloads nach der Datei `B1Export`.
8. Entpacken Sie die Datei, um auf einzelne CSV-Dateien zuzugreifen (etwa `people.csv`), die Sie in Excel, Google Tabellen oder Numbers öffnen können.

:::info
Das B1-Export-ZIP ist eine vollständige Sicherungskopie Ihrer Gemeindedaten. Es enthält:

- Personen (mit Fotos) und Haushalte, einschließlich der Abholkontakte des Haushalts
- Standorte, Gottesdienste und Gottesdienstzeiten
- Gruppen und Gruppenmitglieder
- Fonds und Spenden, einschließlich Gaben, die auf mehrere Fonds aufgeteilt wurden
- Anwesenheit
- Formulare, Fragen, Einsendungen und Antworten
- Eigene Felder und ihre Werte
- Gespeicherte Personenlisten

Zum Wiederherstellen wählen Sie als Quelle **B1-Import-ZIP** und als Ziel **B1-Datenbank** (siehe [Daten importieren](./importing-data.md)). Haushalte, Abholkontakte und gespeicherte Listen werden zusammen mit den Personen wiederhergestellt. Die Filter gespeicherter Listen verweisen anschließend auf die wiederhergestellten Gruppen, Fonds, Standorte und eigenen Felder.
:::

## Gruppendaten exportieren

Sie können außerdem die Mitgliederlisten einzelner Gruppen exportieren. Öffnen Sie auf der Seite **Gruppen** eine Gruppe und klicken Sie auf das **Download-Symbol**, um die Mitgliederliste dieser Gruppe zu exportieren. Weitere Details finden Sie unter [Gruppenmitglieder](../groups/group-members.md).

:::info
Exportierte CSV-Dateien funktionieren mit allen gängigen Tabellenkalkulationsprogrammen, darunter Microsoft Excel, Google Tabellen und Apple Numbers.
:::
