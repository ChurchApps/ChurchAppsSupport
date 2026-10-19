---
title: "Daten exportieren"
---

# Daten exportieren

<div class="article-intro">

Mit B1 Admin können Sie Ihre Gemeindedaten exportieren, um sie in Tabellen zu verwenden, mit Ihrem Team zu teilen oder als Sicherung aufzubewahren. Ob Sie eine schnelle Liste mit Namen und E-Mail-Adressen oder einen vollständigen Datenbankexport benötigen – es gibt Optionen für jeden Bedarf.

</div>

<div class="prereqs">
<h4>Bevor Sie beginnen</h4>

- Sie benötigen ein aktives B1-Admin-Konto mit der Berechtigung, die Daten anzuzeigen, die Sie exportieren möchten. Siehe [Rollen & Berechtigungen](roles-permissions.md), wenn Sie sich über Ihre Zugriffsstufe nicht sicher sind.
- Für einen vollständigen Datenbankexport benötigen Sie Zugriff auf den Bereich **Einstellungen**.

</div>

## Export von der Seite Personen

Der schnellste Weg, Ihr Verzeichnis zu exportieren, führt direkt über die Seite **Personen**:

1. Öffnen Sie das [Sprungmenü](../introduction.md#getting-around-with-the-jump-menu) (das Suchfeld oben links in B1 Admin), klappen Sie **Personen** auf und klicken Sie auf **Personen**.
2. Verwenden Sie die Suchleiste oder Filter, um die gewünschten Ergebnisse einzugrenzen (oder lassen Sie sie ungefiltert, um alle zu exportieren). Siehe [Personen suchen](searching-people.md) für Tipps zum Filtern.
3. Klicken Sie im Kopfbereich der Seite Personen auf die Schaltfläche **Exportieren**.
4. Eine CSV-Datei mit den Personen aus Ihren aktuellen Ergebnissen wird auf Ihren Computer heruntergeladen. Sie enthält Name, Kontaktdaten, Adresse und weitere Standardfelder.

:::tip
Der Export umfasst alle Personen in Ihren aktuellen Ergebnissen. Führen Sie zuerst eine Suche aus, laden Sie eine [gespeicherte Liste](./lists.md) oder verwenden Sie die **erweiterte** Suche, um nur die Personen zu exportieren, die Sie benötigen.
:::

## Vollständiger Datenexport aus den Einstellungen {#full-data-export-from-settings}

Für einen vollständigen Export aller Ihrer B1-Daten (nicht nur der Personen) verwenden Sie das Exportwerkzeug in den Einstellungen:

1. Wählen Sie im Sprungmenü **Einstellungen > Einstellungen**.
2. Klicken Sie im linken Einstellungsmenü oben unter dem Namen Ihrer Gemeinde auf den Link **Import/Export**.
3. Wählen Sie im Auswahlmenü **Datenquelle** die Option **B1-Datenbank**.
4. Prüfen Sie die Datenvorschau und klicken Sie auf **Weiter zum Ziel**.
5. Wählen Sie **B1-Export-ZIP** als Exportziel.
6. Verfolgen Sie den Fortschritt des Exports, bis alle Einträge grüne Häkchen zeigen.
7. Die Exportdatei wird automatisch heruntergeladen. Suchen Sie im Ordner Downloads nach der Datei `B1Export`.
8. Entpacken Sie die Datei, um auf einzelne CSV-Dateien zuzugreifen (zum Beispiel `people.csv`), die Sie in Excel, Google Tabellen oder Numbers öffnen können.

:::info
Das B1-Export-ZIP ist eine vollständige Sicherung Ihrer Gemeindedaten. Es enthält:

- Personen (mit Fotos) und Haushalte, einschließlich der Abholkontakte des Haushalts
- Standorte, Gottesdienste und Gottesdienstzeiten
- Gruppen und Gruppenmitglieder
- Fonds und Spenden, einschließlich Gaben, die auf mehrere Fonds aufgeteilt sind
- Anwesenheit
- Formulare, Fragen, Einsendungen und Antworten
- Benutzerdefinierte Felder und ihre Werte
- Gespeicherte Personenlisten

Kann ein Foto einer Person während des Exports nicht heruntergeladen oder gelesen werden, wird dieses Foto übersprungen und der Export ohne es fortgesetzt.

Zum Wiederherstellen wählen Sie **B1-Import-ZIP** als Quelle und **B1-Datenbank** als Ziel (siehe [Daten importieren](./importing-data.md)). Haushalte, Abholkontakte und gespeicherte Listen werden zusammen mit den Personen wiederhergestellt. Die Filter gespeicherter Listen verweisen anschließend auf die wiederhergestellten Gruppen, Fonds, Standorte und benutzerdefinierten Felder.
:::

## Gruppendaten exportieren

Sie können auch die Mitgliederlisten einzelner Gruppen exportieren. Öffnen Sie auf der Seite **Gruppen** eine Gruppe und klicken Sie auf das **Herunterladen-Symbol**, um die Mitgliederliste dieser Gruppe zu exportieren. Weitere Informationen finden Sie unter [Gruppenmitglieder](../groups/group-members.md).

:::info
Exportierte CSV-Dateien funktionieren mit allen gängigen Tabellenkalkulationsprogrammen, darunter Microsoft Excel, Google Tabellen und Apple Numbers.
:::
