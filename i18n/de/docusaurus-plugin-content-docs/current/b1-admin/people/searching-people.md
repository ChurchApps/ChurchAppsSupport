---
title: "Personen suchen"
---

# Personen suchen

<div class="article-intro">

Die Seite **Personen** zeigt das Verzeichnis Ihrer Kirche in einer durchsuchbaren, sortierbaren Tabelle an. Sie können jeden in Ihrer Gemeinde schnell finden, anpassen, welche Informationen angezeigt werden, und Ihre Ergebnisse exportieren. Effizientes Suchen ist unerlässlich für alltägliche Verwaltungsaufgaben der Kirche wie die Nachverfolgung von Besuchern, die Vorbereitung von Kontaktlisten und die Verwaltung von Mitgliederdaten.

</div>

<div class="prereqs">
<h4>Bevor Sie beginnen</h4>

- Sie benötigen ein aktives B1-Admin-Konto mit Berechtigung, Personen anzuzeigen. Siehe [Rollen & Berechtigungen](roles-permissions.md), wenn Sie sich über Ihre Zugriffsebene nicht sicher sind.
- Ihr Kirchenverzeichnis sollte Personen enthalten. Wenn Sie noch niemanden hinzugefügt haben, siehe [Personen hinzufügen](adding-people.md) oder [Daten importieren](importing-data.md).

</div>

## Schnellsuche

Die Suchleiste oben auf der Personenseite ermöglicht es Ihnen, Mitglieder in Echtzeit zu finden:

1. Klicken Sie oben auf der Personenseite auf das **Suchfeld**.
2. Beginnen Sie, einen Namen, eine E-Mail oder ein anderes Schlüsselwort einzugeben.
3. Die Ergebnisse filtern sich automatisch während der Eingabe (es gibt eine kurze Verzögerung von etwa einer halben Sekunde, damit die Suche nicht bei jedem Tastendruck ausgelöst wird).
4. Die Tabelle unten wird aktualisiert, um nur die passenden Ergebnisse anzuzeigen.

:::tip
Sie müssen nicht die Eingabetaste drücken. Die Suche wird automatisch ausgeführt, nachdem Sie mit der Eingabe aufgehört haben.
:::

## Ergebnisse sortieren

Sie können das Verzeichnis sortieren, indem Sie auf eine beliebige Spaltenüberschrift in der Tabelle klicken:

1. Klicken Sie auf eine **Spaltenüberschrift** (zum Beispiel **Name** oder **E-Mail**), um nach dieser Spalte zu sortieren.
2. Klicken Sie erneut auf dieselbe Überschrift, um die Sortierreihenfolge umzukehren.

Dies erleichtert das Auffinden von Personen alphabetisch, nach Alter oder nach jeder anderen sichtbaren Spalte.

## Spalten anpassen

Nicht jede Information muss gleichzeitig sichtbar sein. Sie können auswählen, welche Spalten in der Tabelle erscheinen:

1. Suchen Sie das **Spaltenauswahl-Dropdown** oben in der Tabelle.
2. Aktivieren oder deaktivieren Sie Spalten, um sie ein- oder auszublenden. Verfügbare Spalten sind:
   - **Foto**
   - **Name**
   - **E-Mail**
   - **Telefon**
   - **Adresse**
   - **Geburtsdatum**
   - **Alter**
   - **Geschlecht**
   - **Mitgliedschaftsstatus**
   - **Campus**
3. Die Tabelle wird sofort aktualisiert, um Ihre Auswahl widerzuspiegeln.

:::info
Ihre Spaltenauswahl wirkt sich darauf aus, was beim CSV-Export enthalten ist. Passen Sie die Spalten vor dem Export an, um genau die Daten zu erhalten, die Sie benötigen.
:::

## Paginierung

Wenn Ihr Verzeichnis viele Datensätze enthält, werden die Ergebnisse auf mehrere Seiten aufgeteilt. Verwenden Sie die **Paginierungssteuerung** unten in der Tabelle, um zwischen Seiten zu wechseln. Die aktuelle Seite und die Gesamtanzahl der Datensätze werden angezeigt, sodass Sie immer wissen, wo Sie sich in der Liste befinden.

:::tip
Wenn Sie mehr Ergebnisse auf einmal sehen möchten, verfeinern Sie Ihre Suche, um die Liste einzugrenzen, statt sich durch ein großes Verzeichnis zu blättern.
:::

## Suchergebnisse exportieren

Sie können Ihre aktuellen Suchergebnisse jederzeit als CSV-Datei herunterladen:

1. Wenden Sie die gewünschten Suchen oder Filter an.
2. Passen Sie Ihre Spalten an, um die benötigten Daten einzuschließen.
3. Klicken Sie auf die Schaltfläche **Export**.
4. Eine CSV-Datei wird auf Ihren Computer heruntergeladen, bereit zum Öffnen in Excel, Google Sheets oder jeder Tabellenkalkulationsanwendung.

Weitere Details zum Exportieren finden Sie unter [Daten exportieren](./exporting-data.md).

:::tip
Für erweiterte Abfragen -- wie das Finden aller, die in den letzten drei Monaten nicht anwesend waren -- versuchen Sie die Funktion [KI-Suche](./ai-search.md), mit der Sie mit Fragen in natürlicher Sprache suchen können.
:::

## Erweiterte Suche

Mit der erweiterten Suche können Sie präzise Filter erstellen, indem Sie Bedingungen kombinieren. Öffnen Sie sie von der Personenseite aus, erweitern Sie dann eine Kategorie und aktivieren Sie die Felder, nach denen Sie filtern möchten, wobei Sie für jedes einen Operator und einen Wert wählen. Kategorien umfassen **Namen**, **Demografie**, **Kontakt**, **Mitgliedschaft**, **Aktivität** (Spenden und Anwesenheit) und **Benutzerdefinierte Felder**.

Die Kategorie **Benutzerdefinierte Felder** listet die [Benutzerdefinierten Felder](../settings/custom-fields.md) Ihrer Kirche auf -- die Felder, die Sie in den Einstellungen definieren, um Ihre eigenen Informationen zu verfolgen (wie ein Ablaufdatum für eine Background-Prüfung). Die angebotenen Operatoren entsprechen dem Typ jedes Feldes: Textfelder unterstützen *enthält / entspricht / beginnt mit / endet mit*, Zahlenfelder unterstützen die Vergleichsoperatoren, Datumsfelder unterstützen *entspricht / nach / vor*, und Ja/Nein- sowie Mehrfachauswahlfelder lassen Sie einen Wert auswählen. Jedes Feld, nach dem Sie hier filtern können, kann als lebende [Liste](./lists.md) gespeichert werden.

## Suchen als Listen speichern

Nach einer Suche erscheint in der Kopfzeile der Personenseite eine Schaltfläche **Als Liste speichern** (Lesezeichen-Symbol). Klicken Sie darauf, um Ihre aktuelle Abfrage unter einem Namen und optional einer Kategorie zu speichern, sodass Sie sie in zukünftigen Sitzungen sofort neu laden können. Vollständige Details finden Sie unter [Gespeicherte Listen](./lists.md).
