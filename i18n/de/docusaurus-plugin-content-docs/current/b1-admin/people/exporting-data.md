---
title: "Daten exportieren"
---

# Daten exportieren

<div class="article-intro">

B1 Admin ermöglicht es Ihnen, Ihre Gemeindedaten zu exportieren, damit Sie sie in Tabellenkalkulationen verwenden, mit Ihrem Team teilen oder eine Sicherungskopie erstellen können. Ob Sie eine schnelle Liste von Namen und E-Mails oder einen vollständigen Datenbankexport benötigen -- es gibt Optionen für Ihre Bedürfnisse.

</div>

<div class="prereqs">
<h4>Bevor Sie beginnen</h4>

- Sie benötigen ein aktives B1 Admin-Konto mit Berechtigung zur Ansicht der Daten, die Sie exportieren möchten. Siehe [Rollen & Berechtigungen](roles-permissions.md), wenn Sie sich über Ihre Zugangsstufe unsicher sind.
- Für einen vollständigen Datenbankexport benötigen Sie Zugang zum Bereich **Einstellungen**.

</div>

## Export von der Personenseite

Der schnellste Weg, Ihr Verzeichnis zu exportieren, ist direkt von der Seite **Personen**:

1. Navigieren Sie in der linken Seitenleiste zu **Personen**.
2. Verwenden Sie die Suchleiste oder Filter, um die gewünschten Ergebnisse einzugrenzen (oder lassen Sie sie ungefiltert, um alle zu exportieren). Siehe [Personen suchen](searching-people.md) für Tipps zum Filtern.
3. Verwenden Sie die **Spaltenauswahl**, um zu wählen, welche Spalten im Export enthalten sein sollen (zum Beispiel Name, E-Mail, Telefon, Adresse).
4. Klicken Sie auf die Schaltfläche **Exportieren**.
5. Eine CSV-Datei wird auf Ihren Computer heruntergeladen, mit den aktuell in der Tabelle angezeigten Daten.

:::tip
Passen Sie Ihre Spalten vor dem Export an. Die CSV-Datei enthält genau die Spalten, die Sie sichtbar haben, sodass Sie den Export an Ihre Bedürfnisse anpassen können, ohne die Datei nachbearbeiten zu müssen.
:::

## Vollständiger Datenexport aus den Einstellungen

Für einen vollständigen Export aller Ihrer B1-Daten (nicht nur Personen) verwenden Sie das Export-Werkzeug in den Einstellungen:

1. Klicken Sie in der linken Seitenleiste auf **Einstellungen**.
2. Klicken Sie in der oberen Navigation auf **Import/Export**.
3. Wählen Sie **B1 Database** aus dem Dropdown-Menü **Datenquelle**.
4. Überprüfen Sie die Datenvorschau und klicken Sie auf **Weiter zum Ziel**.
5. Wählen Sie **B1 Export Zip** als Exportziel.
6. Verfolgen Sie den Exportfortschritt, bis alle Elemente grüne Häkchen zeigen.
7. Die Exportdatei wird automatisch heruntergeladen. Suchen Sie die `B1Export`-Datei in Ihrem Download-Ordner.
8. Entpacken Sie die Datei, um auf einzelne CSV-Dateien (wie `people.csv`) zuzugreifen, die Sie in Excel, Google Sheets oder Numbers öffnen können.

:::info
Vollständige Datenexporte umfassen Personen, Gruppen, Spenden, Anwesenheit und mehr -- alles in Ihrer B1-Datenbank. Dies ist auch eine gute Möglichkeit, regelmäßig eine Sicherungskopie Ihrer Gemeindeaufzeichnungen zu erstellen.
:::

## Gruppendaten exportieren

Sie können auch Mitgliederlisten für einzelne Gruppen exportieren. Öffnen Sie auf der Seite **Gruppen** eine Gruppe und klicken Sie auf das **Download-Symbol**, um die Mitgliederliste dieser Gruppe zu exportieren. Siehe [Gruppenmitglieder](../groups/group-members.md) für weitere Details.

:::info
Exportierte CSV-Dateien funktionieren mit allen gängigen Tabellenkalkulationsanwendungen, einschließlich Microsoft Excel, Google Sheets und Apple Numbers.
:::
