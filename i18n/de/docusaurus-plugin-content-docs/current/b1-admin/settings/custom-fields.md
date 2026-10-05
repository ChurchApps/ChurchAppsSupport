---
title: "Custom Fields"
---

# Custom Fields

<div class="article-intro">

**Custom Fields** ermöglichen es Ihnen, Ihre eigenen Informationen zu jedem Personendatensatz zu verfolgen – Dinge, die B1 nicht als built-in Feld hat, wie ein Ablaufdatum der Hintergrundüberprüfung, eine T-Shirt-Größe oder einen Status der Taufklasse. Sie definieren ein Feld einmal in Settings, füllen dann einen Wert auf jedem Personenprofil ein und können danach suchen oder Listen auf der Basis davon erstellen. Dies ersetzt den älteren Workaround, ein Personen-Formular nur zur Speicherung einer einzelnen Datendaten zu erstellen.

</div>

<div class="prereqs">
<h4>Bevor Sie beginnen</h4>

- Sie benötigen **People**-Bearbeitungsberechtigung, um Felder zu definieren und Werte einzufüllen, sowie Zugriff auf den **Settings**-Bereich. Jeder mit People View-Berechtigung kann die Werte sehen. Siehe [Rollen & Berechtigungen](./roles-permissions.md).
- Entscheiden Sie, was Sie verfolgen möchten und welcher Typ am besten passt (Text, eine Zahl, ein Datum, eine Ja/Nein-Antwort oder eine Pick-List), bevor Sie beginnen.

</div>

## Öffnen von Custom Fields

Öffnen Sie in B1 Admin das [Jump-Menü](../introduction.md#getting-around-with-the-jump-menu) (die Suchleiste oben links), wählen Sie **Settings > Settings** und wählen Sie die **Custom Fields**-Karte. Sie können auch direkt unter **/settings/custom-fields** dorthin gehen. Sie sehen eine Liste aller Felder, die Sie definiert haben, mit ihrem **Name** und **Field Type**. Wenn Sie noch keine erstellt haben, liest sich das Fenster *"No custom fields have been added yet."*

## Ein Feld hinzufügen

1. Klicken Sie auf **Add Field**.
2. Geben Sie im Editor, der auf der rechten Seite geöffnet wird, einen **Name** ein – dies ist das Label, das Mitarbeiter auf Personenprofilen und in der Suche sehen (z. B. *Background check expires*).
3. Wählen Sie einen **Field Type**:
   - **Textbox** — freiformatiger Kurztext.
   - **Whole Number** — Zahlen ohne Dezimalstellen (z. B. eine Anzahl).
   - **Decimal** — Zahlen, die Dezimalstellen enthalten können.
   - **Date** — ein Kalenderdatum.
   - **Yes/No** — eine einfache Ja-oder-Nein-Antwort.
   - **Multiple Choice** — eine Pick-List. Wenn Sie diesen Typ wählen, wird ein **choices editor** angezeigt, damit Sie jede Option hinzufügen können, aus der Personen auswählen können.
4. Klicken Sie auf **Save**.

Das Feld ist jetzt auf jedem Personenprofil verfügbar.

:::info
Die Feldtypen sind derselbe Satz, der für [Formularfragen](../forms/creating-forms.md) verwendet wird, daher verhalten sich Werte in B1 konsistent.
:::

## Ein Feld bearbeiten

Klicken Sie auf eine Feldzeile in der Liste, um sie im Editor erneut zu öffnen. Ändern Sie den Namen, Typ oder Auswahlmöglichkeiten und klicken Sie auf **Save**.

:::warning
Das Ändern des **Field Type** eines Feldes, das bereits Werte hat (z. B. von Textbox zu Date), kann zuvor eingegebene Werte in einem Format hinterlassen, das nicht mehr mit dem neuen Typ übereinstimmt. Ändern Sie Typen vorsichtig, sobald Mitarbeiter begonnen haben, das Feld auszufüllen.
:::

## Ein Feld löschen

Öffnen Sie ein Feld zur Bearbeitung und klicken Sie auf **Delete**. Sie werden aufgefordert zu bestätigen: *"Are you sure you wish to delete this custom field? Its stored values will also be removed."* Das Löschen eines Feldes entfernt es dauerhaft **und jeden gespeicherten Wert dafür** auf allen Personen – dies kann nicht rückgängig gemacht werden.

## Werte auf einer Person ausfüllen

Sobald mindestens ein Custom Field existiert, befinden sich seine Werte direkt neben den eingebauten Details auf jedem Personendatensatz – Sie sehen sie in **Personal Details** und bearbeiten sie im gleichen Formular, das Sie für den Rest der Personendetails verwenden. Nichts zusätzliches wird angezeigt, bis Sie Ihr erstes Feld definiert haben.

1. Öffnen Sie die Datei einer Person unter **People**.
2. Klicken Sie im Abschnitt **Personal Details** auf die Schaltfläche **Edit** (Stift).
3. Scrollen Sie zum Bereich **Custom Fields** am unteren Ende des Bearbeitungsformulars und füllen Sie einen Wert für jedes Feld aus. Jedes Feld zeigt die Eingabe, die seinem Typ entspricht – einen Datepicker für Date-Felder, ein Ja/Nein-Dropdown für Yes/No-Felder, eine Pick-List für Multiple Choice usw.
4. Klicken Sie auf **Save**. Ihre Custom-Field-Werte werden zusammen mit dem Rest der Personendetails gespeichert.

Zurück auf dem Profil zeigt jedes Feld, das einen Wert hat, jetzt im Abschnitt **Personal Details** an (Ja/Nein-Antworten lesen als *Yes* oder *No*, und Multiple Choice zeigt das Label der Option). Leere Felder sind einfach verborgen. Um einen Wert zu entfernen, bearbeiten Sie die Person, löschen Sie das Feld und speichern Sie – ein leerer Wert wird aus dem Datensatz gelöscht, anstatt als leer gespeichert zu werden.

:::tip
Der klassische Anwendungsfall ist die Sicherheit von Freiwilligen: erstellen Sie ein **Date**-Feld namens *Background check expires*, notieren Sie das Datum jedes Freiwilligen, dann erstellen Sie eine [Saved List](../people/lists.md), die jeden kennzeichnet, dessen Datum überschritten ist.
:::

## Suchen und Erstellen von Listen auf Custom Fields

Custom Fields sind vollständig durchsuchbar:

1. Öffnen Sie auf der **People**-Seite die [Advanced Search](../people/searching-people.md).
2. Erweitern Sie die **Custom Fields**-Kategorie.
3. Aktivieren Sie das Feld, nach dem Sie filtern möchten, wählen Sie einen Operator und geben Sie einen Wert ein. Die angebotenen Operatoren entsprechen dem Typ des Feldes:
   - **Textbox** — contains, equals, starts with, ends with.
   - **Whole Number / Decimal** — equals, greater than, greater than or equal, less than, less than or equal.
   - **Date** — equals, after (greater than), before (less than).
   - **Yes/No** — equals Yes or No.
   - **Multiple Choice** — equals or contains one of the choices.

Speichern Sie jede Custom-Field-Suche als [List](../people/lists.md). Listen sind Live-Abfragen, daher re-prüft eine Liste, die auf *Background check expires is before today* aufgebaut ist, jedes Mal jede Person, wenn Sie sie öffnen – kein manueller Aufwand.

## Anzeige eines Custom Fields als Spalte

Um die Werte eines Feldes für alle auf einmal zu sehen, fügen Sie es als Spalte auf der **People**-Seite hinzu. Öffnen Sie die Column Chooser, wechseln Sie zur **Custom**-Registerkarte und aktivieren Sie das Feld. Der Wert jeder Person wird in seiner eigenen Spalte neben den eingebauten angezeigt. Siehe [Showing Custom Fields as Columns](../people/searching-people.md#showing-custom-fields-as-columns).

## Was beim Zusammenführen passiert

Wenn Sie [zwei Personendatensätze zusammenführen](../people/adding-people.md), werden Custom-Field-Werte automatisch übertragen. Die Person, die Sie behalten, behält ihre eigenen Werte; für jedes Feld, bei dem nur die entfernte Person einen Wert hatte, wird dieser Wert kopiert, damit nichts verloren geht.

## Verwandte Artikel

- [Searching People](../people/searching-people.md) — erweiterte Suche, einschließlich der Custom Fields-Kategorie, und Anzeige von Custom Fields als Spalten
- [Saved Lists](../people/lists.md) — speichern Sie eine Custom-Field-Suche und führen Sie sie erneut aus
- [Rollen & Berechtigungen](./roles-permissions.md) — wer kann Felder definieren und Werte bearbeiten
- [Creating Forms](../forms/creating-forms.md) — für Multi-Question-Datenerfassung, bei der ein vollständiges Formular besser passt als einzelne Felder
