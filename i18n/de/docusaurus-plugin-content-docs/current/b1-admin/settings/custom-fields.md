---
title: "Benutzerdefinierte Felder"
---

# Benutzerdefinierte Felder

<div class="article-intro">

**Benutzerdefinierte Felder** ermöglichen es Ihnen, Ihre eigenen Informationen in jedem Personendatensatz zu verfolgen — Dinge, die B1 nicht in einem integrierten Feld hat, wie ein Verfallsdatum für Hintergrundprüfungen, eine T-Shirt-Größe oder einen Tauflektus-Status. Sie definieren ein Feld einmalig in Einstellungen, füllen dann einen Wert in dem Profil jeder Person aus und suchen oder erstellen Listen danach. Dies ersetzt die ältere Umgehungslösung, ein Personenformular nur zum Speichern eines einzelnen benutzerdefinierten Datenstücks zu erstellen.

</div>

<div class="prereqs">
<h4>Vor dem Start</h4>

- Sie benötigen die Berechtigung **People** Bearbeitungsrecht, um Felder zu definieren und Werte auszufüllen, und Zugriff auf den Bereich **Settings**. Jeder mit der Berechtigung People-Ansicht kann die Werte sehen. Siehe [Roles & Permissions](./roles-permissions.md).
- Entscheiden Sie, was Sie verfolgen möchten und welcher Typ am besten passt (Text, eine Nummer, ein Datum, eine Ja/Nein-Antwort oder eine Auswahlliste), bevor Sie beginnen.

</div>

## Öffnen von benutzerdefinierten Feldern

Öffnen Sie in B1 Admin das **Bereichsmenü** in der oberen linken Ecke (der Bereichsname mit dem kleinen Pfeil), wählen Sie **Settings** und wählen Sie die Karte **Custom Fields**. Sie können auch direkt dorthin gehen unter **/settings/custom-fields**. Sie sehen eine Liste aller Felder, die Sie definiert haben, die ihren **Namen** und **Feldtyp** zeigen. Wenn Sie noch keine erstellt haben, liest das Bedienfeld *"No custom fields have been added yet."*

## Hinzufügen eines Feldes

1. Klicken Sie auf **Add Field**.
2. Geben Sie im geöffneten Editor auf der rechten Seite einen **Namen** ein — dies ist das Etikett, das Mitarbeiter in Personenprofilen und in der Suche sehen (z. B. *Background check expires*).
3. Wählen Sie einen **Feldtyp**:
   - **Textbox** — freier Text.
   - **Whole Number** — Zahlen ohne Dezimalzahlen (z. B. eine Anzahl).
   - **Decimal** — Zahlen, die Dezimalzahlen enthalten können.
   - **Date** — ein Kalenderdatum.
   - **Yes/No** — eine einfache Ja-oder-Nein-Antwort.
   - **Multiple Choice** — eine Auswahlliste. Wenn Sie diesen Typ auswählen, erscheint ein **Choices-Editor**, damit Sie jede Option hinzufügen können, die Personen auswählen können.
4. Klicken Sie auf **Save**.

Das Feld ist nun auf jedem Personenprofil verfügbar.

:::info
Die Feldtypen sind der gleiche Satz, der für [Formfragen](../forms/creating-forms.md) verwendet wird, daher verhalten sich Werte konsistent über B1 hinweg.
:::

## Bearbeiten eines Feldes

Klicken Sie auf eine beliebige Feldzeile in der Liste, um sie im Editor erneut zu öffnen. Ändern Sie den Namen, den Typ oder die Auswahlmöglichkeiten und klicken Sie auf **Save**.

:::warning
Das Ändern des **Feldtyps** eines Feldes, das bereits Werte enthält (z. B. von Textbox zu Date) kann früher eingegebene Werte in einem Format hinterlassen, das nicht mehr dem neuen Typ entspricht. Ändern Sie Typen mit Vorsicht, sobald Mitarbeiter das Feld ausgefüllt haben.
:::

## Löschen eines Feldes

Öffnen Sie ein Feld zum Bearbeiten und klicken Sie auf **Delete**. Sie werden aufgefordert, zu bestätigen: *"Are you sure you wish to delete this custom field? Its stored values will also be removed."* Das Löschen eines Feldes entfernt es dauerhaft **und jeden für alle Personen darin gespeicherten Wert** — dies kann nicht rückgängig gemacht werden.

## Auffüllen von Werten für eine Person

Sobald mindestens ein benutzerdefiniertes Feld vorhanden ist, befinden sich dessen Werte direkt neben den integrierten Details in jedem Personendatensatz — Sie sehen sie in **Personal Details** und bearbeiten sie im gleichen Formular, das Sie für den Rest der Personeninformationen verwenden. Nichts zusätzliches wird angezeigt, bis Sie Ihr erstes Feld definiert haben.

1. Öffnen Sie einen Personendatensatz in **People**.
2. Klicken Sie im Abschnitt **Personal Details** auf die Schaltfläche **Edit** (Stiftsymbol).
3. Scrollen Sie zum Bereich **Custom Fields** unten im Bearbeitungsformular und füllen Sie einen Wert für jedes Feld aus. Jedes Feld zeigt die Eingabe, die seinem Typ entspricht — eine Datumsauswahl für Date-Felder, ein Ja/Nein-Dropdown für Yes/No-Felder, eine Auswahlliste für Multiple Choice usw.
4. Klicken Sie auf **Save**. Ihre benutzerdefinierten Feldwerte werden zusammen mit den Rest der Personeninformationen gespeichert.

Zurück auf dem Profil zeigt jedes Feld, das einen Wert hat, jetzt im Bereich **Personal Details** (Ja/Nein-Antworten lesen als *Yes* oder *No*, und Multiple Choice zeigt das Etikett der Option). Felder, die leer gelassen werden, werden einfach verborgen. Um einen Wert zu entfernen, bearbeiten Sie die Person, löschen Sie das Feld und speichern Sie — ein leerer Wert wird aus dem Datensatz gelöscht, anstatt als leer gespeichert zu werden.

:::tip
Der klassische Anwendungsfall ist die Freiwilligensicherheit: Erstellen Sie ein **Date**-Feld namens *Background check expires*, zeichnen Sie das Datum jedes Freiwilligen auf, und erstellen Sie dann eine [Saved List](../people/lists.md), die jeden Flaggen, dessen Datum vorbei ist.
:::

## Suchen und Erstellen von Listen für benutzerdefinierte Felder

Benutzerdefinierte Felder sind vollständig durchsuchbar:

1. Öffnen Sie auf der Seite **People** die [Advanced Search](../people/searching-people.md).
2. Erweitern Sie die Kategorie **Custom Fields**.
3. Aktivieren Sie das Feld, nach dem Sie filtern möchten, wählen Sie einen Operator und geben Sie einen Wert ein. Die angebotenen Operatoren entsprechen dem Feldtyp:
   - **Textbox** — contains, equals, starts with, ends with.
   - **Whole Number / Decimal** — equals, greater than, greater than or equal, less than, less than or equal.
   - **Date** — equals, after (greater than), before (less than).
   - **Yes/No** — equals Yes or No.
   - **Multiple Choice** — equals or contains one of the choices.

Speichern Sie jede benutzerdefinierte Feldsuche als [List](../people/lists.md). Listen sind Live-Abfragen, daher wird eine Liste, die auf *Background check expires is before today* erstellt wurde, jedes Mal neu überprüft, wenn Sie sie öffnen — keine manuelle Pflege.

## Was beim Zusammenführen passiert

Wenn Sie [zwei Personendatensätze zusammenführen](../people/adding-people.md), werden benutzerdefinierte Feldwerte automatisch übernommen. Die Person, die Sie behalten, bleibt bei ihren eigenen Werten; für jedes Feld, in dem nur die entfernte Person einen Wert hatte, wird dieser Wert kopiert, damit nichts verloren geht.

## Verwandte Artikel

- [Searching People](../people/searching-people.md) — Erweiterte Suche, einschließlich der Kategorie Custom Fields
- [Saved Lists](../people/lists.md) — speichern Sie eine benutzerdefinierte Feldsuche und führen Sie sie live erneut aus
- [Roles & Permissions](./roles-permissions.md) — wer Felder definieren und Werte bearbeiten kann
- [Creating Forms](../forms/creating-forms.md) — für die Erfassung von Fragen mit mehreren Fragen, wenn ein vollständiges Formular besser passt als einzelne Felder
