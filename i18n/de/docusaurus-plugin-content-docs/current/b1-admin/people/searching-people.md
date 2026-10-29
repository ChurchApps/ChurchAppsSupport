---
title: "Personen suchen"
---

# Personen suchen

<div class="article-intro">

Die Seite **Personen** zeigt Ihr Kirchenverzeichnis als durchsuchbare Liste von Haushalten oder als sortierbare Tabelle einzelner Personen. Sie können schnell jede Person in Ihrer Gemeinde finden, festlegen, welche Angaben angezeigt werden, und Ihre Ergebnisse exportieren. Effiziente Suche ist für die tägliche Verwaltung unverzichtbar, etwa beim Nachfassen bei Besuchern, beim Erstellen von Kontaktlisten und bei der Pflege der Mitgliederdaten.

</div>

## Schulungsvideo

<YouTube id="7Y-tN9RmnDQ" title="Personen suchen und Listen erstellen in B1" next="Benutzerdefinierte Felder, Massenbearbeitung und Export in B1" nextUrl="/docs/b1-admin/settings/custom-fields" />

<div class="prereqs">
<h4>Bevor Sie beginnen</h4>

- Sie benötigen ein aktives B1-Admin-Konto mit der Berechtigung, Personen anzuzeigen. Siehe [Rollen & Berechtigungen](roles-permissions.md), wenn Sie sich über Ihre Zugriffsstufe nicht sicher sind.
- Ihr Kirchenverzeichnis sollte Personen enthalten. Haben Sie noch niemanden hinzugefügt, lesen Sie [Personen hinzufügen](adding-people.md) oder [Daten importieren](importing-data.md).

</div>

## Haushalte und Tabellenansichten

Die Seite Personen listet Ihr Verzeichnis nach **Haushalt**, alphabetisch gruppiert. Jede Zeile zeigt die Fotos des Haushalts, seinen Namen (zum Beispiel "Familie Schmidt") und die Namen aller Mitglieder. Klicken Sie auf einen Haushalt, um das Profil des Haushaltsvorstands zu öffnen, oder auf den Namen eines Mitglieds, um diese Person zu öffnen. Oberhalb der Liste zeigt eine Zählung, wie viele Haushalte und Personen angezeigt werden.

Verwenden Sie den Umschalter **Ansicht als** über der Liste, um zwischen **Haushalte** und **Tabelle** zu wechseln. Die Ansicht **Tabelle** listet eine Person pro Zeile und dort können Sie sortieren und Spalten auswählen (siehe unten). B1 merkt sich Ihre Auswahl auf diesem Gerät.

Standardmäßig lädt die Seite den ersten Teil Ihres Verzeichnisses. Haben Sie mehr Personen, klicken Sie unterhalb der Liste auf **Alle Mitglieder anzeigen**, um alle zu laden.

## Schnellsuche

Das Feld **Haushalt oder Person suchen** oben auf der Seite Personen findet Mitglieder in Echtzeit:

1. Klicken Sie oben auf der Seite Personen in das **Suchfeld**.
2. Beginnen Sie, einen Namen einzugeben.
3. Die Ergebnisse werden während der Eingabe automatisch gefiltert (mit einer kurzen Verzögerung von etwa einer halben Sekunde, damit die Suche nicht bei jedem Tastendruck startet).
4. Die Liste darunter aktualisiert sich und zeigt nur die passenden Ergebnisse.

Klicken Sie auf **Leeren** (unterhalb des Suchfeldes), um die Suche zurückzusetzen und wieder Ihr gesamtes Verzeichnis anzuzeigen.

:::tip
Sie müssen nicht **Enter** drücken. Die Suche läuft automatisch, sobald Sie aufhören zu tippen.
:::

## Ergebnisse sortieren

In der Ansicht **Tabelle** werden Personen nach Nachname, dann nach Vorname aufgelistet. Sie können das Verzeichnis anders sortieren, indem Sie auf eine beliebige Spaltenüberschrift klicken:

1. Klicken Sie auf eine **Spaltenüberschrift** (zum Beispiel **Name** oder **E-Mail**), um nach dieser Spalte zu sortieren.
2. Klicken Sie dieselbe Überschrift erneut, um die Sortierreihenfolge umzukehren.

So finden Sie Personen leicht alphabetisch, nach Alter oder nach einer anderen sichtbaren Spalte.

## Spalten anpassen

Nicht jede Information muss gleichzeitig sichtbar sein. Sie können wählen, welche Spalten in der Tabelle erscheinen:

1. Klicken Sie im Seitenkopf der Seite Personen auf das Symbol **Spalten auswählen**. (Die Spalten gelten für die Ansicht **Tabelle**.)
2. Setzen oder entfernen Sie Häkchen bei den Spalten, um sie ein- oder auszublenden. Verfügbare Spalten sind unter anderem:
   - **Foto**
   - **Name**
   - **E-Mail**
   - **Telefon**
   - **Adresse**
   - **Geburtsdatum**
   - **Alter**
   - **Geschlecht**
   - **Mitgliedsstatus**
   - **Standort**
   - **Hinzugefügt am** -- wann der Datensatz der Person angelegt wurde
3. Die Tabelle aktualisiert sich sofort entsprechend Ihrer Auswahl. Klicken Sie auf **Fertig**, um den Dialog **Spalten auswählen** zu schließen.

### Benutzerdefinierte Felder als Spalten anzeigen

Die Spaltenauswahl hat zwei Reiter: **Standard** enthält die oben aufgeführten eingebauten Spalten, und **Benutzerdefiniert** enthält Ihre [benutzerdefinierten Felder](../settings/custom-fields.md) der Kirche sowie die Fragen aus allen Formularen für Personen. Setzen Sie auf dem Reiter **Benutzerdefiniert** ein Häkchen bei einem benutzerdefinierten Feld, um es als Spalte hinzuzufügen. Der Wert jeder Person für dieses Feld erscheint dann in der Tabelle. Die Werte werden genauso angezeigt wie im Profil der Person: Ja/Nein-Felder zeigen *Ja* oder *Nein*, Auswahlfelder zeigen die Bezeichnung der Option und Datumsangaben erscheinen als Kurzdatum. Personen ohne Wert für das Feld erhalten eine leere Zelle.


## Suchergebnisse exportieren

Sie können Ihre aktuellen Suchergebnisse jederzeit als CSV-Datei herunterladen:

1. Wenden Sie die gewünschten Suchen oder Filter an.
2. Klicken Sie im Seitenkopf der Seite Personen auf die Schaltfläche **Exportieren**.
3. Eine CSV-Datei wird auf Ihren Computer heruntergeladen und kann in Excel, Google Tabellen oder jedem anderen Tabellenkalkulationsprogramm geöffnet werden.

Weitere Details zum Export finden Sie unter [Daten exportieren](./exporting-data.md).

:::tip
Für anspruchsvollere Abfragen -- etwa um alle zu finden, die in den letzten drei Monaten nicht anwesend waren -- probieren Sie die Funktion [KI-Suche](./ai-search.md), mit der Sie in einfacher Sprache fragen können.
:::

## Erweiterte Suche

Die erweiterte Suche ermöglicht es, präzise Filter aus mehreren Bedingungen zu bilden. Öffnen Sie sie, indem Sie auf der Seite Personen unterhalb des Suchfeldes auf **Erweitert** klicken. Klappen Sie dann eine Kategorie auf und setzen Sie ein Häkchen bei den Feldern, nach denen Sie filtern möchten (Sie können auf den Namen des Feldes oder auf sein Kästchen klicken). Wählen Sie für jedes Feld einen Operator und einen Wert. Zu den Kategorien gehören **Namen**, **Demografie**, **Kontakt**, **Mitgliedschaft**, **Aktivität** (Spenden und Anwesenheit) und **Benutzerdefinierte Felder**.

Um neue Personen zu finden, öffnen Sie **Mitgliedschaft** und setzen Sie ein Häkchen bei **Hinzugefügt am**. Es startet mit **in den letzten N Tagen** und vorausgefüllten 30, sodass Sie mit einem Klick alle finden, die im letzten Monat hinzugefügt wurden. Ändern Sie die Anzahl der Tage oder wechseln Sie zu *gleich / nach / vor*, um ein bestimmtes Datum auszuwählen. **Geburtsdatum** und **Hochzeitstag** bieten ebenfalls **in den letzten N Tagen** an. Das Datum "Hinzugefügt am" wird nur für Personen erfasst, die seit Ende Oktober 2026 angelegt wurden. Früher hinzugefügte Personen haben kein Datum, daher findet dieser Filter sie nicht.

Die Kategorie **Benutzerdefinierte Felder** listet die [benutzerdefinierten Felder](../settings/custom-fields.md) Ihrer Kirche auf -- die Felder, die Sie in den Einstellungen definieren, um eigene Informationen festzuhalten (etwa das Ablaufdatum einer Führungszeugnisprüfung). Die angebotenen Operatoren richten sich nach dem Typ jedes Feldes: Textfelder unterstützen *enthält / gleich / beginnt mit / endet mit*, Zahlenfelder die Vergleichsoperatoren, Datumsfelder *gleich / nach / vor*, und Ja/Nein- sowie Auswahlfelder lassen Sie einen Wert auswählen. Jedes Feld, nach dem Sie hier filtern können, lässt sich als dynamische [Liste](./lists.md) speichern.

## Suchen als Listen speichern

Nach einer Suche erscheint im Seitenkopf der Seite Personen die Schaltfläche **Als Liste speichern**. Klicken Sie darauf, um Ihre aktuelle Abfrage unter einem Namen und optional einer Kategorie zu speichern. So können Sie sie in späteren Sitzungen sofort wieder laden. Alle Einzelheiten finden Sie unter [Gespeicherte Listen](./lists.md).
