---
title: "Benutzerdefinierte Felder"
---

# Benutzerdefinierte Felder

<div class="article-intro">

**Benutzerdefinierte Felder** ermöglichen es Ihnen, Ihre eigenen Informationen auf jedem Personendatensatz zu verfolgen – Dinge, die B1 kein eingebautes Feld hat, wie ein Hintergrundcheck-Verfallsdatum, eine T-Shirt-Größe oder einen Taufklassenstatus. Sie definieren ein Feld einmal in den Einstellungen, füllen dann einen Wert auf dem Profil jeder Person aus und suchen oder erstellen Listen danach. Dies ersetzt den älteren Workaround, ein Personen-Formular nur zu erstellen, um ein einzelnes Datenelement zu speichern.

</div>

<div class="prereqs">
<h4>Bevor Sie beginnen</h4>

- Sie benötigen eine **Personen**-Bearbeitungsberechtigung, um Felder zu definieren und Werte auszufüllen, sowie Zugriff auf den Bereich **Einstellungen**. Jeder mit Personen-Betrachtungsberechtigung kann die Werte sehen. Siehe [Rollen & Berechtigungen](./roles-permissions.md).
- Entscheiden Sie, was Sie verfolgen möchten und welcher Typ am besten passt (Text, eine Zahl, ein Datum, eine Ja/Nein-Antwort oder eine Auswahlliste), bevor Sie beginnen.

</div>

## Benutzerdefinierte Felder öffnen

Gehen Sie in B1 Admin zu **Einstellungen** in der linken Seitenleiste und wählen Sie die Karte **Benutzerdefinierte Felder** aus. Sie können auch direkt unter **/settings/custom-fields** dorthin gehen. Sie sehen eine Liste aller von Ihnen definierten Felder mit dem **Namen** und **Feldtyp**. Wenn Sie noch keine erstellt haben, zeigt das Panel "Noch keine benutzerdefinierten Felder wurden hinzugefügt".

## Ein Feld hinzufügen

1. Klicken Sie **Feld hinzufügen**.
2. Geben Sie im rechts öffnenden Editor einen **Namen** ein – dies ist das Label, das Mitarbeiter auf Personenprofilen und in der Suche sehen (z.B. *Background-Check läuft ab*).
3. Wählen Sie einen **Feldtyp**:
   - **Textfeld** -- freier Text (kurz).
   - **Ganze Zahl** -- Zahlen ohne Dezimalstellen (z.B. eine Zählung).
   - **Dezimal** -- Zahlen, die Dezimalstellen enthalten können.
   - **Datum** -- ein Kalenderdatum.
   - **Ja/Nein** -- eine einfache Ja-oder-Nein-Antwort.
   - **Mehrfachauswahl** -- eine Auswahlliste. Wenn Sie diesen Typ wählen, wird ein **Choices-Editor** angezeigt, damit Sie jede Option hinzufügen können, die Personen auswählen können.
4. Klicken Sie **Speichern**.

Das Feld ist jetzt auf dem Profil jeder Person verfügbar.

:::info
Die Feldtypen sind die gleiche Gruppe, die für [Formularfragen](../forms/creating-forms.md) verwendet wird, daher verhalten sich Werte in B1 konsistent.
:::

## Ein Feld bearbeiten

Klicken Sie auf jede Feldzeile in der Liste, um sie im Editor erneut zu öffnen. Ändern Sie den Namen, den Typ oder die Optionen und klicken Sie **Speichern**.

:::warning
Das Ändern des **Feldtyps** eines Feldes, das bereits Werte hat (z.B. von Textfeld zu Datum), kann zuvor eingegebene Werte in einem Format hinterlassen, das nicht mehr zum neuen Typ passt. Ändern Sie Typen mit Vorsicht, sobald Mitarbeiter begonnen haben, das Feld auszufüllen.
:::

## Ein Feld löschen

Öffnen Sie ein Feld zur Bearbeitung und klicken Sie **Löschen**. Sie werden aufgefordert zu bestätigen: *"Sind Sie sicher, dass Sie dieses benutzerdefinierte Feld löschen möchten? Seine gespeicherten Werte werden ebenfalls entfernt."* Das Löschen eines Feldes entfernt es **und jeden Wert, der darauf gespeichert ist** für alle Personen dauerhaft – dies kann nicht rückgängig gemacht werden.

## Werte auf einer Person ausfüllen

Sobald mindestens ein benutzerdefiniertes Feld existiert, befinden sich seine Werte direkt neben den eingebauten Details auf jedem Personendatensatz – Sie sehen sie in **Persönliche Details** und bearbeiten sie auf dem gleichen Formular, das Sie für den Rest der Informationen der Person verwenden. Nichts Besonderes erscheint, bis Sie Ihr erstes Feld definiert haben.

1. Öffnen Sie einen Personendatensatz in **Personen**.
2. Klicken Sie im Abschnitt **Persönliche Details** auf die Schaltfläche **Bearbeiten** (Bleistift).
3. Scrollen Sie zum Abschnitt **Benutzerdefinierte Felder** am Ende des Bearbeitungsformulars und füllen Sie einen Wert für jedes Feld aus. Jedes Feld zeigt die Eingabe, die zum Typ passt – einen Datepicker für Datumsfelder, ein Ja/Nein-Dropdown für Ja/Nein-Felder, eine Auswahlliste für Mehrfachauswahl usw.
4. Klicken Sie **Speichern**. Ihre benutzerdefinierten Feldwerte werden zusammen mit dem Rest der Personaliendetails des Ortes gespeichert.

Auf dem Profil zeigt jedes Feld, das einen Wert hat, nun im Abschnitt **Persönliche Details** an (Ja/Nein-Antworten werden als *Ja* oder *Nein* gelesen, und Mehrfachauswahl zeigt das Label der Option). Leere Felder sind einfach verborgen. Um einen Wert zu entfernen, bearbeiten Sie die Person, löschen Sie das Feld und speichern Sie – ein leerer Wert wird gelöscht, anstatt leer gespeichert zu werden.

:::tip
Der klassische Anwendungsfall ist die Freiwilligensicherheit: Erstellen Sie ein **Datum**-Feld namens *Background-Check läuft ab*, notieren Sie das Datum jedes Freiwilligen, und erstellen Sie dann eine [Gespeicherte Liste](../people/lists.md), die jeden kennzeichnet, dessen Datum abgelaufen ist.
:::

## Suchen und Erstellen von Listen auf benutzerdefinierten Feldern

Benutzerdefinierte Felder sind vollständig durchsuchbar:

1. Öffnen Sie auf der Seite **Personen** die [Erweiterte Suche](../people/searching-people.md).
2. Erweitern Sie die Kategorie **Benutzerdefinierte Felder**.
3. Aktivieren Sie das Feld, das Sie filtern möchten, wählen Sie einen Operator und geben Sie einen Wert ein. Die angebotenen Operatoren entsprechen dem Typ des Feldes:
   - **Textfeld** -- enthält, gleich, beginnt mit, endet mit.
   - **Ganze Zahl / Dezimal** -- gleich, größer als, größer oder gleich, kleiner als, kleiner oder gleich.
   - **Datum** -- gleich, danach (größer als), davor (kleiner als).
   - **Ja/Nein** -- gleich Ja oder Nein.
   - **Mehrfachauswahl** -- gleich oder enthält einen der Optionen.

Speichern Sie jede benutzerdefinierte Feldsuche als [Liste](../people/lists.md). Listen sind Live-Abfragen, daher überprüft eine List, die auf *Background-Check läuft ab vor heute* aufgebaut ist, jedes Mal, wenn Sie sie öffnen, jede Person neu – kein manueller Aufwand nötig.

## Was beim Zusammenführen passiert

Wenn Sie [zwei Personendatensätze zusammenführen](../people/adding-people.md), werden benutzerdefinierte Feldwerte automatisch übertragen. Die Person, die Sie behalten, behält ihre eigenen Werte; für jedes Feld, bei dem nur die entfernte Person einen Wert hatte, wird dieser Wert kopiert, damit nichts verloren geht.

## Verwandte Artikel

- [Personen suchen](../people/searching-people.md) -- Erweiterte Suche, einschließlich der Kategorie Benutzerdefinierte Felder
- [Gespeicherte Listen](../people/lists.md) -- Speichern Sie eine Suche mit benutzerdefinierten Feldern und führen Sie sie live erneut aus
- [Rollen & Berechtigungen](./roles-permissions.md) -- wer Felder definieren und Werte bearbeiten kann
- [Formulare erstellen](../forms/creating-forms.md) -- für Multi-Frage-Datensammlung, bei der ein vollständiges Formular besser passt als einzelne Felder
