---
title: "Personen suchen"
---

# Personen suchen

<div class="article-intro">

Die Seite **Personen** zeigt Ihr Gemeindeverzeichnis als durchsuchbare Liste von Haushalten oder als sortierbare Tabelle einzelner Personen. Sie finden schnell jede Person in Ihrer Gemeinde, passen an, welche Angaben angezeigt werden, und exportieren Ihre Ergebnisse. Effizientes Suchen ist unverzichtbar für die tägliche Verwaltung der Kirche, etwa für die Nachverfolgung von Besuchern, das Erstellen von Kontaktlisten und die Pflege der Mitgliederdaten.

</div>

## Einführungsvideo

<YouTube id="7Y-tN9RmnDQ" title="Personen suchen und Listen in B1 erstellen" next="Benutzerdefinierte Felder, Massenbearbeitung und Export in B1" nextUrl="/docs/b1-admin/settings/custom-fields" />

<div class="prereqs">
<h4>Bevor Sie beginnen</h4>

- Sie benötigen ein aktives B1-Admin-Konto mit der Berechtigung, Personen anzusehen. Siehe [Rollen & Berechtigungen](roles-permissions.md), wenn Sie sich über Ihre Zugriffsstufe unsicher sind.
- Ihr Gemeindeverzeichnis sollte Personen enthalten. Wenn Sie noch niemanden angelegt haben, siehe [Personen hinzufügen](adding-people.md) oder [Daten importieren](importing-data.md).

</div>

## Haushalte und Tabellenansichten

Die Seite Personen listet Ihr Verzeichnis nach **Haushalt**, alphabetisch gruppiert. Jede Zeile zeigt die Fotos des Haushalts, seinen Namen (zum Beispiel "Familie Schmidt") und die Namen aller Mitglieder. Klicken Sie auf einen Haushalt, um das Profil des Haushaltsvorstands zu öffnen, oder klicken Sie auf den Namen eines Mitglieds, um diese Person zu öffnen. Über der Liste zeigt eine Anzahl, wie viele Haushalte und Personen angezeigt werden.

Verwenden Sie den Umschalter **Ansicht als** über der Liste, um zwischen **Haushalte** und **Tabelle** zu wechseln. Die Ansicht **Tabelle** listet eine Person pro Zeile auf und ist die Ansicht, in der Sie sortieren und Spalten auswählen können (siehe unten). B1 merkt sich Ihre Auswahl auf diesem Gerät.

Standardmäßig lädt die Seite nur den ersten Teil Ihres Verzeichnisses. Wenn Sie mehr Personen haben, klicken Sie unterhalb der Liste auf **Alle Mitglieder anzeigen**, um alle zu laden.

## Schnellsuche

Das Feld **Haushalt oder Person suchen** oben auf der Seite Personen hilft Ihnen, Mitglieder in Echtzeit zu finden:

1. Klicken Sie oben auf der Seite Personen in das **Suchfeld**.
2. Beginnen Sie, einen Namen einzugeben.
3. Die Ergebnisse werden beim Tippen automatisch gefiltert (es gibt eine kurze Verzögerung von etwa einer halben Sekunde, damit nicht bei jedem Tastendruck gesucht wird).
4. Die Liste darunter zeigt nur die passenden Ergebnisse.

Klicken Sie auf **Zurücksetzen** (unterhalb des Suchfeldes), um die Suche zurückzusetzen und wieder Ihr gesamtes Verzeichnis anzuzeigen.

:::tip
Sie müssen nicht die Eingabetaste drücken. Die Suche läuft automatisch, sobald Sie aufhören zu tippen.
:::

## Ergebnisse sortieren

In der Ansicht **Tabelle** sind Personen zuerst nach Nachname und dann nach Vorname sortiert. Sie können das Verzeichnis auf andere Weise sortieren, indem Sie auf eine beliebige Spaltenüberschrift klicken:

1. Klicken Sie auf eine **Spaltenüberschrift** (zum Beispiel **Name** oder **E-Mail**), um nach dieser Spalte zu sortieren.
2. Klicken Sie erneut auf dieselbe Überschrift, um die Sortierreihenfolge umzukehren.

So finden Sie Personen leicht alphabetisch, nach Alter oder nach einer anderen sichtbaren Spalte.

## Spalten anpassen

Nicht jede Information muss gleichzeitig sichtbar sein. Sie können festlegen, welche Spalten in der Tabelle erscheinen:

1. Klicken Sie im Seitenkopf von Personen auf das Symbol **Spalten auswählen**. (Spalten gelten für die Ansicht **Tabelle**.)
2. Markieren oder entfernen Sie Spalten, um sie ein- oder auszublenden. Verfügbare Spalten sind unter anderem:
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
3. Die Tabelle wird sofort an Ihre Auswahl angepasst. Klicken Sie auf **Fertig**, um den Dialog **Spalten auswählen** zu schließen.

### Benutzerdefinierte Felder als Spalten anzeigen

Der Spaltenauswähler hat zwei Reiter: **Standard** enthält die oben aufgeführten eingebauten Spalten, und **Benutzerdefiniert** enthält die [benutzerdefinierten Felder](../settings/custom-fields.md) Ihrer Kirche sowie die Fragen aus allen Personenformularen. Markieren Sie auf dem Reiter **Benutzerdefiniert** ein Feld, um es als Spalte hinzuzufügen; der Wert jeder Person für dieses Feld erscheint dann in der Tabelle. Die Werte werden genauso dargestellt wie im Profil der Person -- Ja/Nein-Felder zeigen *Ja* oder *Nein*, Auswahlfelder mit mehreren Optionen zeigen die Bezeichnung der Option, und Datumsangaben werden als Kurzdatum angezeigt. Personen ohne Wert für das Feld zeigen eine leere Zelle.

## Suchergebnisse exportieren

Sie können Ihre aktuellen Suchergebnisse jederzeit als CSV-Datei herunterladen:

1. Wenden Sie die gewünschte Suche oder Filter an.
2. Klicken Sie im Seitenkopf von Personen auf die Schaltfläche **Exportieren**.
3. Eine CSV-Datei wird auf Ihren Computer heruntergeladen, die Sie in Excel, Google Sheets oder einem anderen Tabellenprogramm öffnen können.

Weitere Einzelheiten zum Exportieren finden Sie unter [Daten exportieren](./exporting-data.md).

:::tip
Für anspruchsvollere Abfragen -- etwa um alle zu finden, die seit drei Monaten nicht mehr da waren -- probieren Sie die Funktion [KI-Suche](./ai-search.md), mit der Sie in einfacher Sprache suchen können.
:::

## Erweiterte Suche

Die erweiterte Suche ermöglicht präzise Filter durch die Kombination mehrerer Bedingungen. Öffnen Sie sie, indem Sie unterhalb des Suchfeldes auf der Seite Personen auf **Erweitert** klicken. Klappen Sie dann eine Kategorie auf und markieren Sie die Felder, nach denen Sie filtern möchten (Sie können auf den Namen des Feldes oder auf sein Kästchen klicken), und wählen Sie für jedes einen Operator und einen Wert. Zu den Kategorien gehören **Namen**, **Demografie**, **Kontakt**, **Mitgliedschaft**, **Aktivität** (Spenden und Anwesenheit) und **Benutzerdefinierte Felder**.

Die Kategorie **Benutzerdefinierte Felder** listet die [benutzerdefinierten Felder](../settings/custom-fields.md) Ihrer Kirche auf -- die Felder, die Sie in den Einstellungen definieren, um eigene Angaben zu erfassen (etwa ein Ablaufdatum der Hintergrundprüfung). Die angebotenen Operatoren richten sich nach dem Typ jedes Feldes: Textfelder unterstützen *enthält / ist gleich / beginnt mit / endet mit*, Zahlenfelder unterstützen die Vergleichsoperatoren, Datumsfelder unterstützen *ist gleich / nach / vor*, und Ja/Nein- sowie Auswahlfelder mit mehreren Optionen lassen Sie einen Wert auswählen. Jedes Feld, nach dem Sie hier filtern können, lässt sich als dynamische [Liste](./lists.md) speichern.

## Suchen als Listen speichern

Nach einer Suche erscheint im Seitenkopf von Personen die Schaltfläche **Als Liste speichern**. Klicken Sie darauf, um Ihre aktuelle Abfrage unter einem Namen und optional einer Kategorie zu speichern, damit Sie sie in späteren Sitzungen sofort wieder laden können. Weitere Einzelheiten finden Sie unter [Gespeicherte Listen](./lists.md).
