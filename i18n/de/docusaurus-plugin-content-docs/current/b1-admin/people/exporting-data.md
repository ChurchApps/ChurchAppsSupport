---
title: "Daten exportieren"
---

# Daten exportieren

<div class="article-intro">

B1 Admin ermöglicht es Ihnen, Ihre Kirchendaten zu exportieren, um sie in Tabellenkalkulationen zu verwenden, mit Ihrem Team zu teilen oder ein Backup zu erstellen. Egal ob Sie eine schnelle Liste von Namen und E-Mails benötigen oder einen vollständigen Datenbankexport – es gibt Optionen, die Ihren Anforderungen entsprechen.

</div>

<div class="prereqs">
<h4>Bevor Sie beginnen</h4>

- Sie benötigen ein aktives B1 Admin-Konto mit Berechtigung zum Anzeigen der Daten, die Sie exportieren möchten. Siehe [Rollen & Berechtigungen](roles-permissions.md), wenn Sie sich nicht sicher sind, welches Zugriffsniveau Sie haben.
- Für einen vollständigen Datenbankexport benötigen Sie Zugriff auf den Bereich **Einstellungen**.

</div>

## Export von der Seite "Personen"

Der schnellste Weg zum Exportieren Ihres Verzeichnisses ist direkt von der Seite **Personen**:

1. Öffnen Sie das [Jump-Menü](../introduction.md#getting-around-with-the-jump-menu) (die Suchleiste oben links in B1 Admin), erweitern Sie **Personen** und klicken Sie auf **Personen**.
2. Verwenden Sie die Suchleiste oder Filter, um die Ergebnisse zu begrenzen, die Sie exportieren möchten (oder lassen Sie es ungefiltert, um alle zu exportieren). Siehe [Personen suchen](searching-people.md) für Tipps zum Filtern.
3. Verwenden Sie den **Spaltenselektor**, um auszuwählen, welche Spalten Sie in den Export einbeziehen möchten (z. B. Name, E-Mail, Telefon, Adresse).
4. Klicken Sie auf die Schaltfläche **Exportieren**.
5. Eine CSV-Datei wird auf Ihren Computer heruntergeladen mit den Daten, die derzeit in der Tabelle angezeigt werden.

:::tip
Passen Sie Ihre Spalten vor dem Export an. Die CSV-Datei enthält genau die Spalten, die Sie sichtbar haben, sodass Sie den Export nach Ihren Anforderungen anpassen können, ohne die Datei danach zu bearbeiten.
:::

## Vollständiger Datenexport aus Einstellungen

Für einen vollständigen Export aller Ihrer B1-Daten (nicht nur Personen) verwenden Sie das Export-Tool in Einstellungen:

1. Wählen Sie im Jump-Menü **Einstellungen > Einstellungen** aus.
2. Klicken Sie auf die Schaltfläche **Import/Export** oben rechts in der Kopfzeile der Seite.
3. Wählen Sie **B1-Datenbank** aus der Dropdown-Liste **Datenquelle**.
4. Überprüfen Sie die Datenvorschau und klicken Sie auf **Zum Ziel fortfahren**.
5. Wählen Sie **B1 Export Zip** als Exportziel.
6. Überwachen Sie den Export-Fortschritt, bis alle Elemente grüne Häkchen zeigen.
7. Die Exportdatei wird automatisch heruntergeladen. Suchen Sie nach der Datei `B1Export` in Ihrem Download-Ordner.
8. Entpacken Sie die Datei, um auf einzelne CSV-Dateien zuzugreifen (z. B. `people.csv`), die Sie in Excel, Google Sheets oder Numbers öffnen können.

:::info
Vollständige Datenexporte enthalten Personen, Gruppen, Spenden, Besucherzahlen und vieles mehr – alles in Ihrer B1-Datenbank. Dies ist auch eine großartige Möglichkeit, ein regelmäßiges Backup Ihrer Kirchenunterlagen zu erstellen.
:::

## Gruppendaten exportieren

Sie können auch Mitgliederlisten für einzelne Gruppen exportieren. Öffnen Sie auf der Seite **Gruppen** eine Gruppe und klicken Sie auf das **Download-Symbol**, um die Mitgliederliste dieser Gruppe zu exportieren. Siehe [Gruppenmitglieder](../groups/group-members.md) für weitere Details.

:::info
Exportierte CSV-Dateien funktionieren mit allen großen Tabellenkalkulationsprogrammen, einschließlich Microsoft Excel, Google Sheets und Apple Numbers.
:::
