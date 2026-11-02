---
title: "Personen suchen"
---

# Personen suchen

<div class="article-intro">

Die Seite **Personen** zeigt Ihr Kirchenverzeichnis als durchsuchbare Liste von Haushalten oder als sortierbare Tabelle einzelner Personen. Sie finden schnell jede Person Ihrer Gemeinde, bestimmen, welche Angaben angezeigt werden, und exportieren Ihre Ergebnisse. Effizientes Suchen ist für die tägliche Verwaltung unerlässlich – etwa beim Nachfassen bei Besuchern, beim Erstellen von Kontaktlisten und bei der Pflege von Mitgliederdaten.

</div>

## Schulungsvideo

<YouTube id="7Y-tN9RmnDQ" title="Personen suchen und Listen erstellen in B1" next="Eigene Felder, Massenbearbeitung und Export in B1" nextUrl="/docs/b1-admin/settings/custom-fields" />

<div class="prereqs">
<h4>Bevor Sie beginnen</h4>

- Sie benötigen ein aktives B1-Admin-Konto mit der Berechtigung, Personen anzuzeigen. Siehe [Rollen & Berechtigungen](roles-permissions.md), wenn Sie sich über Ihre Zugriffsstufe nicht sicher sind.
- Ihr Kirchenverzeichnis sollte Personen enthalten. Wenn Sie noch niemanden angelegt haben, lesen Sie [Personen hinzufügen](adding-people.md) oder [Daten importieren](importing-data.md).

</div>

## Haushalte und Tabellenansichten

Die Seite Personen listet Ihr Verzeichnis nach **Haushalt**, alphabetisch gruppiert. Jede Zeile zeigt die Fotos des Haushalts, seinen Namen (zum Beispiel „Familie Schmidt“) und die Namen aller Angehörigen. Klicken Sie auf einen Haushalt, um das Profil des Haushaltsvorstands zu öffnen, oder auf den Namen eines Mitglieds, um diese Person zu öffnen. Eine Anzahl über der Liste zeigt, wie viele Haushalte und Personen angezeigt werden.

Verwenden Sie den Schalter **Anzeigen als** über der Liste, um zwischen **Haushalte** und **Tabelle** zu wechseln. Die Ansicht **Tabelle** listet eine Person pro Zeile und ist die Ansicht, in der Sie sortieren und Spalten auswählen können (siehe unten). B1 merkt sich Ihre Wahl auf diesem Gerät.

In der Ansicht **Tabelle** erscheint der Mitgliedsstatus jeder Person unter ihrem Namen, und jeder der sieben Status hat seine eigene Farbe – dieselbe, die auch im Profil der Person verwendet wird. Wer in seiner Haushaltsrolle als **Kind** eingetragen ist, zeigt außerdem neben dem Status ein Schildchen **Kind**. Um jemanden als Kind zu kennzeichnen, legen Sie seine Rolle im [Haushaltsbereich](./adding-people.md#managing-households) auf seinem Profil fest.

Standardmäßig lädt die Seite nur den ersten Teil Ihres Verzeichnisses. Haben Sie mehr Personen, klicken Sie unterhalb der Liste auf **Alle Mitglieder anzeigen**, um alle zu laden.

## Schnellsuche

Das Feld **Haushalt oder Person suchen** oben auf der Seite Personen findet Mitglieder in Echtzeit:

1. Klicken Sie oben auf der Seite Personen in das **Suchfeld**.
2. Beginnen Sie, einen Namen einzugeben.
3. Die Ergebnisse werden beim Tippen automatisch gefiltert (mit einer kurzen Verzögerung von etwa einer halben Sekunde, damit die Suche nicht bei jedem Tastendruck ausgelöst wird).
4. Die Liste darunter aktualisiert sich und zeigt nur die passenden Ergebnisse.

Klicken Sie auf **Zurücksetzen** (unterhalb des Suchfelds), um die Suche zurückzusetzen und wieder Ihr gesamtes Verzeichnis anzuzeigen.

:::tip
Sie müssen nicht die Eingabetaste drücken. Die Suche läuft automatisch, sobald Sie aufhören zu tippen.
:::

## Ergebnisse sortieren

In der Ansicht **Tabelle** sind Personen nach Nachname, dann Vorname sortiert. Sie können das Verzeichnis auf andere Weise sortieren, indem Sie auf eine beliebige Spaltenüberschrift klicken:

1. Klicken Sie auf eine **Spaltenüberschrift** (z. B. **Name** oder **E-Mail**), um nach dieser Spalte zu sortieren.
2. Klicken Sie erneut auf dieselbe Überschrift, um die Sortierreihenfolge umzukehren.

So finden Sie Personen leicht alphabetisch, nach Alter oder nach einer anderen sichtbaren Spalte.

## Spalten anpassen

Nicht jede Angabe muss gleichzeitig sichtbar sein. Sie können wählen, welche Spalten in der Tabelle erscheinen:

1. Klicken Sie im Seitenkopf von Personen auf das Symbol **Spalten auswählen**. (Spalten gelten für die Ansicht **Tabelle**.)
2. Aktivieren oder deaktivieren Sie Spalten, um sie ein- oder auszublenden. Verfügbare Spalten sind unter anderem:
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
   - **Hinzugefügt am** – wann der Datensatz der Person angelegt wurde
3. Die Tabelle wird sofort an Ihre Auswahl angepasst. Klicken Sie auf **Fertig**, um den Dialog **Spalten auswählen** zu schließen.

### Eigene Felder als Spalten anzeigen {#showing-custom-fields-as-columns}

Der Spaltenauswahl hat zwei Registerkarten: **Standard** enthält die oben aufgeführten eingebauten Spalten, und **Benutzerdefiniert** enthält Ihre [eigenen Felder](../settings/custom-fields.md) der Kirche sowie die Fragen aus allen Formularen für Personen. Aktivieren Sie auf der Registerkarte **Benutzerdefiniert** ein eigenes Feld, um es als Spalte hinzuzufügen; der Wert jeder Person für dieses Feld erscheint dann in der Tabelle. Die Werte werden genauso dargestellt wie im Profil der Person: Ja/Nein-Felder zeigen *Ja* oder *Nein*, Multiple-Choice-Felder zeigen die Bezeichnung der Option und Datumsangaben werden als Kurzdatum angezeigt. Personen ohne Wert für das Feld zeigen eine leere Zelle.

## Suchergebnisse exportieren

Sie können Ihre aktuellen Suchergebnisse jederzeit als CSV-Datei herunterladen:

1. Wenden Sie die gewünschten Suchen oder Filter an.
2. Klicken Sie im Seitenkopf von Personen auf die Schaltfläche **Exportieren**.
3. Eine CSV-Datei wird auf Ihren Computer heruntergeladen, bereit zum Öffnen in Excel, Google Tabellen oder einem anderen Tabellenkalkulationsprogramm.

Weitere Details zum Export finden Sie unter [Daten exportieren](./exporting-data.md).

:::tip
Für anspruchsvollere Abfragen – etwa um alle zu finden, die in den letzten drei Monaten nicht anwesend waren – probieren Sie die Funktion [KI-Suche](./ai-search.md), mit der Sie in einfacher Sprache fragen können.
:::

## Erweiterte Suche {#advanced-search}

Mit der erweiterten Suche erstellen Sie präzise Filter, indem Sie Bedingungen kombinieren. Öffnen Sie sie, indem Sie auf der Seite Personen unterhalb des Suchfelds auf **Erweitert** klicken. Klappen Sie dann eine Kategorie auf und aktivieren Sie die Felder, nach denen Sie filtern möchten (Sie können auf den Namen des Feldes oder sein Kontrollkästchen klicken), und wählen Sie für jedes einen Operator und einen Wert. Kategorien sind **Namen**, **Demografie**, **Kontakt**, **Mitgliedschaft**, **Aktivität** (Spenden und Anwesenheit) und **Eigene Felder**.

Um neue Personen zu finden, öffnen Sie **Mitgliedschaft** und aktivieren Sie **Hinzugefügt am**. Es beginnt mit **in den letzten N Tagen** und 30 als Vorgabe, sodass Sie mit einem Klick alle finden, die im letzten Monat hinzugefügt wurden; ändern Sie die Anzahl der Tage oder wechseln Sie zu *gleich / nach / vor*, um ein Datum auszuwählen. **Geburtsdatum** und **Hochzeitstag** bieten ebenfalls **in den letzten N Tagen** an. Das Datum „Hinzugefügt am“ wird nur für Personen erfasst, die seit Ende Oktober 2026 angelegt wurden; ältere Personen haben kein Datum, daher findet dieser Filter sie nicht.

Der Bereich **Eigene Felder** listet die [eigenen Felder](../settings/custom-fields.md) Ihrer Kirche auf – die Felder, die Sie unter Einstellungen definieren, um eigene Angaben zu erfassen (zum Beispiel ein Ablaufdatum der Führungszeugnisprüfung). Die angebotenen Operatoren entsprechen dem Typ jedes Feldes: Textfelder unterstützen *enthält / gleich / beginnt mit / endet mit*, Zahlenfelder die Vergleichsoperatoren, Datumsfelder *gleich / nach / vor*, und Ja/Nein- sowie Multiple-Choice-Felder lassen Sie einen Wert auswählen. Jedes Feld, nach dem Sie hier filtern können, lässt sich als dynamische [Liste](./lists.md) speichern.

## Suchen als Listen speichern

Nach einer Suche erscheint im Seitenkopf von Personen die Schaltfläche **Als Liste speichern**. Klicken Sie darauf, um Ihre aktuelle Abfrage unter einem Namen und optional einer Kategorie zu speichern, sodass Sie sie in künftigen Sitzungen sofort wieder aufrufen können. Details finden Sie unter [Gespeicherte Listen](./lists.md).
