---
title: "Personen suchen"
---

# Personen suchen

<div class="article-intro">

Die Seite **Personen** zeigt Ihr Kirchenverzeichnis in einer durchsuchbaren, sortierbaren Tabelle an. Sie können schnell jemanden in Ihrer Gemeinde finden, anpassen, welche Informationen angezeigt werden, und Ihre Ergebnisse exportieren. Eine effiziente Suche ist für alltägliche Aufgaben der Kirchenverwaltung wie die Nachverfolgung von Besuchern, die Erstellung von Kontaktlisten und die Verwaltung von Mitgliederdatensätzen unerlässlich.

</div>

<div class="prereqs">
<h4>Bevor Sie beginnen</h4>

- Sie benötigen ein aktives B1 Admin-Konto mit Berechtigung zum Anzeigen von Personen. Weitere Informationen finden Sie unter [Rollen & Berechtigungen](roles-permissions.md), falls Sie unsicher sind, welchen Zugriff Sie haben.
- Ihr Kirchenverzeichnis sollte Personen enthalten. Falls Sie noch niemanden hinzugefügt haben, lesen Sie [Personen hinzufügen](adding-people.md) oder [Daten importieren](importing-data.md).

</div>

## Schnellsuche

Mit der Suchleiste oben auf der Seite „Personen" können Sie Mitglieder in Echtzeit finden:

1. Klicken Sie auf das **Suchfeld** oben auf der Seite „Personen".
2. Geben Sie einen Namen, eine E-Mail oder ein anderes Schlüsselwort ein.
3. Ergebnisse werden automatisch gefiltert, während Sie eingeben (es gibt eine kurze Verzögerung von etwa einer halben Sekunde, damit die Suche nicht bei jedem Tastendruck ausgeführt wird).
4. Die Tabelle unten wird aktualisiert und zeigt nur die übereinstimmenden Ergebnisse.

:::tip
Sie müssen nicht die Eingabetaste drücken. Die Suche wird automatisch ausgeführt, nachdem Sie fertig eingeben.
:::

## Ergebnisse sortieren

Sie können das Verzeichnis sortieren, indem Sie auf einen beliebigen Spaltenkopf in der Tabelle klicken:

1. Klicken Sie auf einen **Spaltenkopf** (z. B. **Name** oder **E-Mail**), um nach dieser Spalte zu sortieren.
2. Klicken Sie auf denselben Kopf erneut, um die Sortierreihenfolge umzukehren.

Dies erleichtert es, Personen alphabetisch, nach Alter oder nach einer anderen sichtbaren Spalte zu finden.

## Spalten anpassen

Nicht alle Informationen müssen gleichzeitig sichtbar sein. Sie können auswählen, welche Spalten in der Tabelle angezeigt werden:

1. Suchen Sie das **Dropdown-Menü Spaltenwähler** oben in der Tabelle.
2. Aktivieren oder deaktivieren Sie Spalten, um sie anzuzeigen oder auszublenden. Verfügbare Spalten umfassen:
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

### Benutzerdefinierte Felder als Spalten anzeigen

Der Spaltenwähler hat zwei Registerkarten: **Standard** enthält die oben aufgelisteten integrierten Spalten, und **Benutzerdefiniert** enthält die [benutzerdefinierten Felder](../settings/custom-fields.md) Ihrer Kirche sowie die Fragen aus allen Personen-Formularen. Aktivieren Sie auf der Registerkarte **Benutzerdefiniert** ein benutzerdefiniertes Feld, um es als Spalte hinzuzufügen, und der Wert jeder Person für dieses Feld wird in der Tabelle angezeigt. Werte werden auf die gleiche Weise angezeigt wie im Profil der Person -- Ja/Nein-Felder zeigen *Ja* oder *Nein*, Felder mit mehreren Optionen zeigen das Label der Option, und Daten werden als Kurzdaten angezeigt. Personen ohne einen Wert für das Feld zeigen eine leere Zelle.

:::info
Ihre Spaltenauswahl beeinflusst, was enthalten ist, wenn Sie nach CSV exportieren. Passen Sie die Spalten vor dem Export an, um genau die benötigten Daten zu erhalten.
:::

## Seitennummerierung

Wenn Ihr Verzeichnis viele Datensätze hat, werden Ergebnisse auf mehrere Seiten aufgeteilt. Verwenden Sie die **Seitennummerierungssteuerelemente** am unteren Ende der Tabelle, um zwischen Seiten zu navigieren. Die aktuelle Seite und die Gesamtanzahl der Datensätze werden angezeigt, damit Sie immer wissen, wo Sie sich in der Liste befinden.

:::tip
Wenn Sie mehr Ergebnisse auf einmal sehen möchten, verfeinern Sie Ihre Suche, um die Liste einzugrenzen, anstatt durch ein großes Verzeichnis zu blättern.
:::

## Suchergebnisse exportieren

Sie können Ihre aktuellen Suchergebnisse jederzeit als CSV-Datei herunterladen:

1. Wenden Sie alle gewünschten Suchfilter an.
2. Passen Sie Ihre Spalten an, um die benötigten Daten zu enthalten.
3. Klicken Sie auf die Schaltfläche **Exportieren**.
4. Eine CSV-Datei wird auf Ihren Computer heruntergeladen und ist bereit, in Excel, Google Sheets oder einer beliebigen Tabellenkalkulation geöffnet zu werden.

Weitere Informationen zum Export finden Sie unter [Daten exportieren](./exporting-data.md).

:::tip
Für komplexere Abfragen -- wie das Finden von Personen, die in den letzten drei Monaten nicht anwesend waren -- versuchen Sie die Funktion [KI-Suche](./ai-search.md), mit der Sie mithilfe von Fragen in natürlicher Sprache suchen können.
:::

## Erweiterte Suche

Mit der erweiterten Suche können Sie genaue Filter erstellen, indem Sie Bedingungen kombinieren. Öffnen Sie sie auf der Seite „Personen" und erweitern Sie dann eine Kategorie und aktivieren Sie die Felder, nach denen Sie filtern möchten, und wählen Sie für jedes einen Operator und einen Wert. Kategorien umfassen **Namen**, **Demografische Daten**, **Kontakt**, **Mitgliedschaft**, **Aktivität** (Spenden und Anwesenheit) und **Benutzerdefinierte Felder**.

Die Kategorie **Benutzerdefinierte Felder** listet die [benutzerdefinierten Felder](../settings/custom-fields.md) Ihrer Kirche auf -- die Felder, die Sie in „Einstellungen" definieren, um Ihre eigenen Informationen zu verfolgen (z. B. ein Ablaufdatum der Hintergrundüberprüfung). Die angebotenen Operatoren entsprechen dem Typ des Felds: Textfelder unterstützen *enthält / gleich / beginnt mit / endet mit*, Zahlenfelder unterstützen die Vergleichsoperatoren, Datumsfelder unterstützen *gleich / nach / vor*, und Ja/Nein- und Felder mit mehreren Optionen ermöglichen es Ihnen, einen Wert auszuwählen. Jedes Feld, das Sie hier filtern können, kann als Live-[Liste](./lists.md) gespeichert werden.

## Suchen als Listen speichern

Nach Ausführung einer Suche wird auf der Seite „Personen" eine Schaltfläche **Als Liste speichern** (Lesezeichen-Symbol) in der Kopfzeile angezeigt. Klicken Sie darauf, um Ihre aktuelle Abfrage unter einem Namen und einer optionalen Kategorie zu speichern, damit Sie sie in zukünftigen Sitzungen sofort erneut laden können. Weitere Informationen finden Sie unter [Gespeicherte Listen](./lists.md).
