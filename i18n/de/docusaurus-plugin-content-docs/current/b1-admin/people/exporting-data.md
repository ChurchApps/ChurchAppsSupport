---
title: "Daten exportieren"
description: "Exportieren Sie Personen als CSV, Gruppenmitgliederlisten oder ein vollständiges B1-Datenbank-Backup aus B1 Admin und erfahren Sie, was die B1-Export-ZIP-Datei enthält."
---

# Daten exportieren

<div class="article-intro">

Mit B1 Admin können Sie Ihre Gemeindedaten exportieren, um sie in Tabellen zu verwenden, mit Ihrem Team zu teilen oder ein Backup aufzubewahren. Ob Sie eine schnelle Liste mit Namen und E-Mail-Adressen oder einen vollständigen Datenbankexport brauchen – es gibt Optionen für Ihren Bedarf.

</div>

<div class="prereqs">
<h4>Bevor Sie beginnen</h4>

- Sie benötigen ein aktives B1-Admin-Konto mit der Berechtigung, die Daten einzusehen, die Sie exportieren möchten. Siehe [Rollen & Berechtigungen](roles-permissions.md), wenn Sie sich bei Ihrer Zugriffsstufe nicht sicher sind.
- Für einen vollständigen Datenbankexport benötigen Sie Zugriff auf den Bereich **Einstellungen**.

</div>

## Export von der Seite Personen {#exporting-from-the-people-page}

Der schnellste Weg, Ihr Verzeichnis zu exportieren, führt direkt über die Seite **Personen**:

1. Öffnen Sie das [Sprungmenü](../introduction.md#getting-around-with-the-jump-menu) (die Suchleiste oben links in B1 Admin), klappen Sie **Personen** auf und klicken Sie auf **Personen**.
2. Nutzen Sie die Suchleiste oder Filter, um die Ergebnisse einzugrenzen, die Sie exportieren möchten (oder lassen Sie sie ungefiltert, um alle Personen zu exportieren). Tipps zum Filtern finden Sie unter [Personen suchen](searching-people.md).
3. Klicken Sie im Seitenkopf der Seite Personen auf die Schaltfläche **Exportieren**.
4. Eine CSV-Datei namens `people.csv` wird auf Ihren Computer heruntergeladen. Sie enthält die Personen aus Ihren aktuellen Ergebnissen mit Name, Kontaktdaten, Adresse und anderen Standardfeldern. Haben Sie nicht gesucht, enthält der Export Ihr gesamtes Verzeichnis, auch wenn die Seite nur den ersten Teil anzeigt.

:::tip
Der Export umfasst alle Personen in Ihren aktuellen Ergebnissen. Führen Sie zuerst eine Suche aus, laden Sie eine [gespeicherte Liste](./lists.md) oder nutzen Sie die **erweiterte** Suche, um nur die Personen zu exportieren, die Sie benötigen.
:::

## Vollständiger Datenexport aus den Einstellungen {#full-data-export-from-settings}

Für einen vollständigen Export aller Ihrer B1-Daten (nicht nur der Personen) nutzen Sie das Exportwerkzeug in den Einstellungen:

1. Wählen Sie im Sprungmenü **Einstellungen > Einstellungen**.
2. Klicken Sie im linken Einstellungsmenü oben unter dem Namen Ihrer Gemeinde auf den Link **Import/Export**.
3. Wählen Sie im Dropdown **Datenquelle** die Option **B1-Datenbank**.
4. Prüfen Sie die Vorschau der Daten und klicken Sie auf **Weiter zum Ziel**.
5. Wählen Sie **B1-Export-ZIP** als Exportziel.
6. Verfolgen Sie den Fortschritt des Exports, bis alle Einträge grüne Häkchen zeigen.
7. Die Exportdatei wird automatisch heruntergeladen. Suchen Sie die Datei `B1Export` in Ihrem Downloadordner.
8. Entpacken Sie die Datei, um auf einzelne CSV-Dateien zuzugreifen (etwa `people.csv`), die Sie in Excel, Google Tabellen oder Numbers öffnen können.

:::info
Die B1-Export-ZIP-Datei ist ein vollständiges Backup Ihrer Gemeindedaten. Sie enthält:

- Personen (mit Fotos) und Haushalte, einschließlich der Kontakte für die Abholung von Kindern im Haushalt
- Standorte, Gottesdienste und Gottesdienstzeiten
- Gruppen und Gruppenmitglieder
- Fonds und Spenden, einschließlich Gaben, die auf mehrere Fonds aufgeteilt wurden
- Anwesenheit
- Formulare, Fragen, Einsendungen und Antworten
- Eigene Felder und deren Werte
- Gespeicherte Personenlisten

Lässt sich das Foto einer Person während des Exports nicht herunterladen oder lesen, wird dieses Foto übersprungen und der Export läuft ohne es weiter.

Zur Wiederherstellung wählen Sie **B1-Import-ZIP** als Quelle und **B1-Datenbank** als Ziel (siehe [Daten importieren](./importing-data.md)). Haushalte, Abholkontakte und gespeicherte Listen werden zusammen mit den Personen wiederhergestellt. Die Filter gespeicherter Listen verweisen anschließend auf die wiederhergestellten Gruppen, Fonds, Standorte und Eigenfelder.
:::

## Gruppendaten exportieren {#exporting-group-data}

Sie können auch Mitgliederlisten einzelner Gruppen exportieren. Öffnen Sie auf der Seite **Gruppen** eine Gruppe und klicken Sie auf das **Download-Symbol**, um die Mitgliederliste dieser Gruppe zu exportieren. Weitere Details finden Sie unter [Gruppenmitglieder](../groups/group-members.md).

:::info
Exportierte CSV-Dateien funktionieren mit allen gängigen Tabellenkalkulationsprogrammen, darunter Microsoft Excel, Google Tabellen und Apple Numbers.
:::
