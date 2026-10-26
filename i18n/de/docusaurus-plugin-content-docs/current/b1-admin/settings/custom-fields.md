---
title: "Benutzerdefinierte Felder"
---

# Benutzerdefinierte Felder

<div class="article-intro">

Mit **benutzerdefinierten Feldern** können Sie eigene Informationen zu jedem Personendatensatz erfassen – zum Beispiel ein Ablaufdatum der Hintergrundprüfung, eine T-Shirt-Größe oder den Status eines Taufkurses, für die B1 kein eingebautes Feld hat. Sie definieren ein Feld einmal in den Einstellungen, füllen dann auf dem Profil jeder Person einen Wert aus und können danach suchen oder Listen erstellen. Das ersetzt die bisherige Notlösung, ein Personenformular nur zum Speichern eines einzelnen Zusatzwerts anzulegen.

</div>

## Einführungsvideo

<YouTube id="yUfDEbp2HQ4" title="Custom Fields, Bulk Editing, and Exporting in B1" next="Creating Groups and Adding Members in B1" nextUrl="/docs/b1-admin/groups/creating-groups" />

<div class="prereqs">
<h4>Bevor Sie beginnen</h4>

- Sie benötigen die Berechtigung **Personen** zum Bearbeiten, um Felder zu definieren und Werte einzutragen, sowie Zugriff auf den Bereich **Einstellungen**. Wer die Berechtigung Personen zum Anzeigen hat, kann die Werte sehen. Siehe [Rollen & Berechtigungen](./roles-permissions.md).
- Legen Sie vorab fest, was Sie erfassen möchten und welcher Typ am besten passt (Text, eine Zahl, ein Datum, eine Ja/Nein-Angabe oder eine Auswahlliste).

</div>

## Benutzerdefinierte Felder öffnen

Öffnen Sie in B1 Admin das [Jump-Menü](../introduction.md#getting-around-with-the-jump-menu) (die Suchleiste oben links), wählen Sie **Einstellungen > Einstellungen** und klicken Sie in der linken Liste auf **Benutzerdefinierte Felder**, um zum Abschnitt **Benutzerdefinierte Felder** zu gelangen. Sie können auch direkt unter **/settings/custom-fields** dorthin wechseln. Sie sehen eine Liste aller definierten Felder mit ihrem **Namen** und dem **Feldtyp**. Wenn Sie noch keine angelegt haben, steht im Bereich *„No custom fields have been added yet.“*

## Ein Feld hinzufügen

1. Klicken Sie auf **Feld hinzufügen**.
2. Geben Sie im rechts geöffneten Editor einen **Namen** ein. Dies ist die Bezeichnung, die Mitarbeitende auf Personenprofilen und in der Suche sehen (zum Beispiel *Hintergrundprüfung läuft ab*).
3. Wählen Sie einen **Feldtyp**:
   - **Textfeld** – freier, kurzer Text.
   - **Ganzzahl** – Zahlen ohne Dezimalstellen (zum Beispiel eine Anzahl).
   - **Dezimalzahl** – Zahlen mit Dezimalstellen.
   - **Datum** – ein Kalenderdatum.
   - **Ja/Nein** – eine einfache Ja-oder-Nein-Angabe.
   - **Mehrfachauswahl** – eine Auswahlliste. Bei diesem Typ erscheint ein **Editor für die Auswahlmöglichkeiten**, in dem Sie jede Option hinzufügen, die Personen auswählen können.
4. Klicken Sie auf **Speichern**.

Das Feld steht nun auf dem Profil jeder Person zur Verfügung.

:::info
Die Feldtypen entsprechen denen der [Formularfragen](../forms/creating-forms.md), sodass sich die Werte in B1 überall gleich verhalten.
:::

## Ein Feld bearbeiten

Klicken Sie auf eine beliebige Feldzeile in der Liste, um sie im Editor erneut zu öffnen. Ändern Sie Name, Typ oder Auswahlmöglichkeiten und klicken Sie auf **Speichern**.

:::warning
Wenn Sie den **Feldtyp** eines Feldes ändern, das bereits Werte enthält (zum Beispiel von Textfeld zu Datum), können vorhandene Werte in einem Format vorliegen, das nicht mehr zum neuen Typ passt. Ändern Sie Typen daher mit Bedacht, sobald Mitarbeitende begonnen haben, das Feld auszufüllen.
:::

## Ein Feld löschen

Öffnen Sie ein Feld zum Bearbeiten und klicken Sie auf **Löschen**. Sie werden um eine Bestätigung gebeten: *„Are you sure you wish to delete this custom field? Its stored values will also be removed.“* Beim Löschen eines Feldes wird es zusammen **mit allen gespeicherten Werten** bei allen Personen dauerhaft entfernt. Dies kann nicht rückgängig gemacht werden.

## Werte bei einer Person eintragen

Sobald mindestens ein benutzerdefiniertes Feld vorhanden ist, stehen seine Werte direkt neben den eingebauten Angaben im Datensatz jeder Person. Angezeigt werden sie zusammen mit den Kontaktdaten links im Profil, bearbeitet werden sie im selben Formular wie die übrigen Angaben der Person. Erst nachdem Sie das erste Feld definiert haben, erscheint etwas Zusätzliches.

1. Öffnen Sie den Datensatz einer Person unter **Personen**.
2. Klicken Sie links im Profil unter den Kontaktdaten der Person auf die Schaltfläche **Bearbeiten**.
3. Scrollen Sie unten zum Bereich **Benutzerdefinierte Felder** im Bearbeitungsformular und tragen Sie für jedes Feld einen Wert ein. Jedes Feld zeigt die Eingabe, die zu seinem Typ passt – einen Datumsauswahl für Datumsfelder, eine Ja/Nein-Auswahl für Ja/Nein-Felder, eine Auswahlliste für Mehrfachauswahl usw.
4. Klicken Sie auf **Speichern**. Ihre Werte für benutzerdefinierte Felder werden zusammen mit den übrigen Angaben der Person gespeichert.

Zurück auf dem Profil wird jedes Feld mit einem Wert unterhalb der Kontaktdaten der Person als *Feldname: Wert* angezeigt. Ja/Nein-Antworten erscheinen als *Ja* oder *Nein*, und bei Mehrfachauswahl wird die Bezeichnung der Option angezeigt. Leere Felder werden einfach ausgeblendet. Um einen Wert zu entfernen, bearbeiten Sie die Person, leeren das Feld und speichern. Ein leerer Wert wird aus dem Datensatz gelöscht und nicht als leer gespeichert.

:::tip
Der klassische Anwendungsfall ist die Sicherheit ehrenamtlicher Mitarbeitender: Legen Sie ein **Datumsfeld** namens *Hintergrundprüfung läuft ab* an, tragen Sie das Datum für jede ehrenamtliche Person ein und erstellen Sie dann eine [gespeicherte Liste](../people/lists.md), die alle markiert, deren Datum bereits überschritten ist.
:::

## Nach benutzerdefinierten Feldern suchen und Listen erstellen

Benutzerdefinierte Felder sind vollständig durchsuchbar:

1. Öffnen Sie auf der Seite **Personen** die [erweiterte Suche](../people/searching-people.md).
2. Klappen Sie die Kategorie **Benutzerdefinierte Felder** auf.
3. Aktivieren Sie das Feld, nach dem Sie filtern möchten, wählen Sie einen Operator und geben Sie einen Wert ein. Die angebotenen Operatoren richten sich nach dem Feldtyp:
   - **Textfeld** – enthält, ist gleich, beginnt mit, endet mit.
   - **Ganzzahl / Dezimalzahl** – ist gleich, größer als, größer oder gleich, kleiner als, kleiner oder gleich.
   - **Datum** – ist gleich, nach (größer als), vor (kleiner als).
   - **Ja/Nein** – ist gleich Ja oder Nein.
   - **Mehrfachauswahl** – ist gleich einer der Auswahlmöglichkeiten oder enthält sie.

Speichern Sie jede Suche über benutzerdefinierte Felder als [Liste](../people/lists.md). Listen sind Live-Abfragen. Eine Liste mit *Hintergrundprüfung läuft ab liegt vor heute* prüft daher bei jedem Öffnen alle Personen neu, ohne dass Sie manuell etwas pflegen müssen.

## Ein benutzerdefiniertes Feld als Spalte anzeigen

Um die Werte eines Feldes für alle gleichzeitig zu sehen, fügen Sie es als Spalte auf der Seite **Personen** hinzu. Stellen Sie **Ansicht als** auf **Tabelle** um, klicken Sie im Seitenkopf auf das Symbol **Spalten auswählen**, wechseln Sie zur Registerkarte **Benutzerdefiniert** und aktivieren Sie das Feld. Der Wert jeder Person erscheint dann in einer eigenen Spalte neben den eingebauten Spalten. Siehe [Benutzerdefinierte Felder als Spalten anzeigen](../people/searching-people.md#showing-custom-fields-as-columns).

## Verhalten beim Zusammenführen

Wenn Sie [zwei Personendatensätze zusammenführen](../people/adding-people.md), werden die Werte benutzerdefinierter Felder automatisch übernommen. Die Person, die Sie behalten, behält ihre eigenen Werte. Bei jedem Feld, für das nur die entfernte Person einen Wert hatte, wird dieser Wert übernommen, damit nichts verloren geht.

## Verwandte Artikel

- [Personen suchen](../people/searching-people.md) – erweiterte Suche, einschließlich der Kategorie Benutzerdefinierte Felder, und die Anzeige benutzerdefinierter Felder als Spalten
- [Gespeicherte Listen](../people/lists.md) – eine Suche über benutzerdefinierte Felder speichern und live erneut ausführen
- [Rollen & Berechtigungen](./roles-permissions.md) – wer Felder definieren und Werte bearbeiten darf
- [Formulare erstellen](../forms/creating-forms.md) – für mehrstufige Datenerfassung, wenn sich ein vollständiges Formular besser eignet als einzelne Felder
