---
title: "Personen suchen"
description: "Durchsuchen Sie das Personenverzeichnis von B1 Admin nach Namen, sortieren und wählen Sie Spalten in der Tabellenansicht, erstellen Sie Filter mit der erweiterten Suche und exportieren Sie Treffer als CSV."
---

# Personen suchen

<div class="article-intro">

Die Seite **Personen** zeigt Ihr Gemeindeverzeichnis als durchsuchbare Liste von Haushalten oder als sortierbare Tabelle einzelner Personen. Sie finden schnell jede Person in Ihrer Gemeinde, bestimmen, welche Informationen angezeigt werden, und exportieren Ihre Ergebnisse. Effizientes Suchen ist unverzichtbar für die tägliche Verwaltung, etwa beim Nachfassen bei Besuchern, beim Erstellen von Kontaktlisten und bei der Pflege von Mitgliederdatensätzen.

</div>

## Schulungsvideo {#training-video}

<YouTube id="7Y-tN9RmnDQ" title="Personen suchen und Listen in B1 erstellen" next="Eigene Felder, Massenbearbeitung und Export in B1" nextUrl="/docs/b1-admin/settings/custom-fields" />

<div class="prereqs">
<h4>Bevor Sie beginnen</h4>

- Sie benötigen ein aktives B1-Admin-Konto mit der Berechtigung, Personen einzusehen. Siehe [Rollen & Berechtigungen](roles-permissions.md), wenn Sie sich bei Ihrer Zugriffsstufe nicht sicher sind.
- Ihr Gemeindeverzeichnis sollte Personen enthalten. Wenn Sie noch niemanden hinzugefügt haben, lesen Sie [Personen hinzufügen](adding-people.md) oder [Daten importieren](importing-data.md).

</div>

## Ansicht nach Haushalten und Tabelle {#households-and-table-views}

Die Seite Personen listet Ihr Verzeichnis nach **Haushalt** auf, alphabetisch gruppiert. Jede Zeile zeigt die Fotos des Haushalts, seinen Namen (zum Beispiel „Familie Schmidt“) und die Namen aller Mitglieder. Klicken Sie auf einen Haushalt, um das Profil des Haushaltsvorstands zu öffnen, oder klicken Sie auf den Namen eines Mitglieds, um diese Person zu öffnen. Eine Anzeige über der Liste zeigt, wie viele Haushalte und Personen angezeigt werden.

Mit dem Schalter **Anzeigen als** über der Liste wechseln Sie zwischen **Haushalte** und **Tabelle**. Die Ansicht **Tabelle** listet eine Person pro Zeile auf und dort können Sie sortieren und Spalten auswählen (siehe unten). B1 merkt sich Ihre Auswahl auf diesem Gerät.

In der Ansicht **Tabelle** erscheint der Mitgliedschaftsstatus jeder Person unter ihrem Namen. Jeder der sieben Status hat eine eigene Farbe, dieselbe, die auch im Profil der Person verwendet wird. Wer als Haushaltsrolle **Kind** hat, zeigt außerdem neben dem Status eine Markierung **Kind**. Um jemanden als Kind zu kennzeichnen, legen Sie seine Rolle im [Haushaltsbereich](./adding-people.md#managing-households) auf seinem Profil fest.

Standardmäßig lädt die Seite nur den ersten Teil Ihres Verzeichnisses. Wenn Sie mehr Personen haben, klicken Sie unter der Liste auf **Alle Mitglieder anzeigen**, um alle zu laden.

## Schnellsuche {#quick-search}

Das Feld **Haushalt oder Person finden** oben auf der Seite Personen hilft Ihnen, Mitglieder in Echtzeit zu finden:

1. Klicken Sie oben auf der Seite Personen in das **Suchfeld**.
2. Beginnen Sie, einen Namen einzugeben.
3. Die Ergebnisse werden während des Tippens automatisch gefiltert (mit einer kurzen Verzögerung von etwa einer halben Sekunde, damit die Suche nicht bei jedem Tastendruck ausgelöst wird).
4. Die Liste darunter aktualisiert sich und zeigt nur die passenden Ergebnisse.

Klicken Sie auf **Zurücksetzen** (unter dem Suchfeld), um die Suche zurückzusetzen und wieder Ihr gesamtes Verzeichnis anzuzeigen.

:::tip
Sie müssen nicht die Eingabetaste drücken. Die Suche läuft automatisch, sobald Sie aufhören zu tippen.
:::

## Ergebnisse sortieren {#sorting-results}

In der Ansicht **Tabelle** sind Personen nach Nachname, dann Vorname sortiert. Sie können das Verzeichnis anders sortieren, indem Sie auf eine beliebige Spaltenüberschrift klicken:

1. Klicken Sie auf eine **Spaltenüberschrift** (zum Beispiel **Name** oder **E-Mail**), um nach dieser Spalte zu sortieren.
2. Klicken Sie auf dieselbe Überschrift erneut, um die Sortierreihenfolge umzukehren.

Der erste Klick sortiert die Spalte aufsteigend (A bis Z, vom Jüngsten zum Ältesten, frühestes Datum zuerst), und der Pfeil neben der Überschrift zeigt die Richtung an. Personen ohne Wert in dieser Spalte stehen immer am Ende. So finden Sie Personen leicht alphabetisch, nach Alter oder nach jeder anderen sichtbaren Spalte. B1 merkt sich die Sortierung auf diesem Gerät, sodass die Tabelle nach dem Neuladen der Seite oder bei einem späteren Besuch genauso sortiert bleibt.

## Spalten anpassen {#customizing-columns}

Nicht jede Information muss gleichzeitig sichtbar sein. Sie können wählen, welche Spalten in der Tabelle erscheinen:

1. Klicken Sie im Seitenkopf der Seite Personen auf das Symbol **Spalten auswählen**. (Spalten gelten für die Ansicht **Tabelle**; wenn Sie eine Spalte anhaken, wechselt die Seite daher auch in die Ansicht **Tabelle**.)
2. Setzen oder entfernen Sie die Häkchen bei den Spalten, um sie ein- oder auszublenden. Der Reiter **Standard** bietet:
   - **Foto** und **Anzeigename** (standardmäßig angezeigt)
   - **Nachname**, **Vorname** und **Zweiter Vorname**
   - **Adresse**, **Ort**, **Bundesland** und **PLZ**
   - **Haupt-E-Mail** und **Haupt-Telefon** (die Mobilnummer oder, falls keine Mobilnummer vorhanden ist, die Festnetz- oder Geschäftsnummer)
   - **Geburtsdatum**, **Geburtstag (ohne Jahr)** und **Alter**
   - **Geschlecht**, **Mitgliedschaftsstatus**, **Standort**, **Familienstand** und **Hochzeitstag**
   - **Hinweise für das Namensschild**
   - **Hinzugefügt am** -- wann der Datensatz der Person angelegt wurde
   - **Löschoption** -- fügt jeder Zeile ein Löschsymbol hinzu (nur verfügbar, wenn Sie Personen bearbeiten dürfen)
3. Die Tabelle aktualisiert sich sofort entsprechend Ihrer Auswahl. Klicken Sie auf **Fertig** (oder **Schließen**), um den Dialog **Spalten auswählen** zu schließen. B1 merkt sich Ihre Spalten auf diesem Gerät.

### Eigene Felder als Spalten anzeigen {#showing-custom-fields-as-columns}

Der Spaltenauswähler hat zwei Reiter: **Standard** enthält die oben aufgeführten integrierten Spalten, **Eigene** enthält die [Eigenen Felder](../settings/custom-fields.md) Ihrer Gemeinde zusammen mit den Fragen aus allen Personenformularen. Haken Sie auf dem Reiter **Eigene** ein Eigenfeld an, um es als Spalte hinzuzufügen; der Wert jeder Person für dieses Feld erscheint dann in der Tabelle. Die Werte werden genauso angezeigt wie im Profil der Person: Ja/Nein-Felder zeigen *Ja* oder *Nein*, Auswahlfelder zeigen die Bezeichnung der Option, und Datumsangaben werden als Kurzdatum angezeigt. Personen ohne Wert für das Feld sehen eine leere Zelle.


## Suchergebnisse exportieren {#exporting-search-results}

Sie können Ihre aktuellen Suchergebnisse jederzeit als CSV-Datei herunterladen:

1. Wenden Sie die gewünschten Suchen oder Filter an.
2. Klicken Sie im Seitenkopf der Seite Personen auf die Schaltfläche **Exportieren**.
3. Eine CSV-Datei wird auf Ihren Computer heruntergeladen und lässt sich in Excel, Google Tabellen oder einem anderen Tabellenprogramm öffnen.

Weitere Details zum Exportieren finden Sie unter [Daten exportieren](./exporting-data.md).

:::tip
Für anspruchsvollere Abfragen -- etwa um alle zu finden, die in den letzten drei Monaten nicht teilgenommen haben -- probieren Sie die Funktion [KI-Suche](./ai-search.md). Dort können Sie mit einfachen Fragen in natürlicher Sprache suchen.
:::

## Erweiterte Suche {#advanced-search}

Mit der erweiterten Suche erstellen Sie präzise Filter, indem Sie Bedingungen kombinieren. Öffnen Sie sie, indem Sie auf der Seite Personen unter dem Suchfeld auf **Erweitert** klicken. Klappen Sie dann eine Kategorie auf und markieren Sie die Felder, nach denen Sie filtern möchten (Sie können auf den Namen des Feldes oder auf sein Kästchen klicken), und wählen Sie für jedes Feld einen Operator und einen Wert. Zu den Kategorien gehören **Namen**, **Demografie**, **Kontaktdaten**, **Mitgliedschaft & Gruppen** (Mitgliedschaftsstatus, Standort, Hinzugefügt am und Gruppenmitgliedschaft), **Aktivität** (Spenden und Anwesenheit) und **Eigene Felder**.

Es gibt keine Suchschaltfläche: Die Ergebnisse aktualisieren sich etwa eine halbe Sekunde nach jeder Filteränderung automatisch, und Personen müssen jeden angehakten Filter erfüllen. Die aktivierten Filter erscheinen als Chips über den Kategorien -- klicken Sie auf das **x** eines Chips, um diesen Filter zu entfernen, oder auf **Alle löschen**, um alle zu entfernen. Klicken Sie erneut auf **Erweitert**, um das Panel wieder auszublenden.

Um neue Personen zu finden, öffnen Sie **Mitgliedschaft & Gruppen** und markieren Sie **Hinzugefügt am**. Es beginnt mit **in den letzten N Tagen** und dem Wert 30, sodass Sie mit einem Klick alle finden, die im letzten Monat hinzugefügt wurden. Ändern Sie die Anzahl der Tage oder wechseln Sie zu *ist gleich / nach / vor*, um ein Datum auszuwählen. **Geburtsdatum** und **Hochzeitstag** bieten ebenfalls **in den letzten N Tagen** an. Das Datum „Hinzugefügt am“ wird nur für Personen erfasst, die seit Ende Oktober 2026 angelegt wurden. Personen, die früher hinzugefügt wurden, haben kein Datum, daher findet dieser Filter sie nicht.

Die Kategorie **Eigene Felder** listet die [Eigenen Felder](../settings/custom-fields.md) Ihrer Gemeinde auf -- die Felder, die Sie in den Einstellungen definieren, um eigene Informationen zu erfassen (etwa ein Ablaufdatum für eine Hintergrundprüfung). Die angebotenen Operatoren richten sich nach dem Typ jedes Feldes: Textfelder unterstützen *enthält / ist gleich / beginnt mit / endet mit*, Zahlenfelder die Vergleichsoperatoren, Datumsfelder *ist gleich / nach / vor*, und bei Ja/Nein- und Auswahlfeldern wählen Sie einen Wert. Jedes Feld, nach dem Sie hier filtern können, lässt sich als laufende [Liste](./lists.md) speichern.

## Suchen als Listen speichern {#saving-searches-as-lists}

Nachdem Sie eine Suche mit mindestens einer Person ausgeführt haben, erscheint im Seitenkopf der Seite Personen die Schaltfläche **Als Liste speichern** (für Mitarbeitende, die Personen bearbeiten dürfen). Klicken Sie darauf, um Ihre aktuelle Abfrage unter einem Namen und optional einer Kategorie zu speichern, damit Sie sie bei künftigen Sitzungen sofort wieder öffnen können. Alle Einzelheiten finden Sie unter [Gespeicherte Listen](./lists.md).
