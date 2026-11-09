---
title: "Individuelle Felder"
description: "Individuelle Felder in B1 Admin definieren, um zusätzliche Angaben zu Personen zu erfassen, etwa Ablaufdaten von Führungszeugnissen oder T-Shirt-Größen, und anschließend danach suchen und filtern."
---

# Individuelle Felder

<div class="article-intro">

Mit **individuellen Feldern** erfassen Sie eigene Angaben in jedem Personendatensatz, für die B1 kein eingebautes Feld hat, zum Beispiel das Ablaufdatum eines Führungszeugnisses, eine T-Shirt-Größe oder den Status eines Taufkurses. Sie legen ein Feld einmal in den Einstellungen fest, tragen dann auf dem Profil jeder Person einen Wert ein und können danach suchen oder Listen darauf aufbauen. Das ersetzt die frühere Behelfslösung, für ein einzelnes Datum eigens ein Formular für Personen anzulegen.

</div>

## Schulungsvideo

<YouTube id="yUfDEbp2HQ4" title="Custom Fields, Bulk Editing, and Exporting in B1" next="Creating Groups and Adding Members in B1" nextUrl="/docs/b1-admin/groups/creating-groups" />

<div class="prereqs">
<h4>Bevor Sie beginnen</h4>

- Sie benötigen die Bearbeitungsberechtigung für **Personen**, um Felder zu definieren und Werte einzutragen, sowie Zugriff auf den Bereich **Einstellungen**. Wer die Berechtigung zum Anzeigen von Personen hat, kann die Werte sehen. Siehe [Rollen & Berechtigungen](./roles-permissions.md).
- Überlegen Sie vorab, was Sie erfassen möchten und welcher Typ am besten passt (Text, Zahl, Datum, Ja/Nein-Antwort oder Auswahlliste).

</div>

## Individuelle Felder öffnen

Öffnen Sie in B1 Admin das [Sprungmenü](../introduction.md#getting-around-with-the-jump-menu) (die Suchleiste oben links), wählen Sie **Einstellungen > Einstellungen** und klicken Sie in der linken Liste auf **Individuelle Felder**, um zum Abschnitt **Individuelle Felder** zu scrollen. Sie können auch direkt unter **/settings/custom-fields** dorthin gelangen. Sie sehen eine Liste aller definierten Felder mit ihrem **Namen** und ihrem **Feldtyp**. Haben Sie noch keine angelegt, steht im Bereich *„Es wurden noch keine individuellen Felder hinzugefügt.“*

## Anreden

Die Karte **Anreden** oben im Abschnitt Individuelle Felder listet die Anreden auf, die im Feld **Anrede** erscheinen, wenn jemand eine Person in B1 Admin oder in der B1-App anlegt oder bearbeitet (im Profil-Editor und im Gästeanmeldungsformular). Die Liste beginnt mit Herr, Frau, Fräulein, Divers, Dr., Prof., Pfr. und Pastor.

1. Geben Sie eine Anrede in **Neue Anrede** ein (bis zu 10 Zeichen), zum Beispiel *Diakon* oder *Ältester*, und klicken Sie auf **Anrede hinzufügen**.
2. Um eine Anrede von der Liste zu nehmen, klicken Sie auf das **×** ihres Chips.
3. Klicken Sie auf **Speichern**.

:::tip
Das Feld Anrede erlaubt weiterhin freie Eingaben. Mitarbeitende und Mitglieder können also auch eine Anrede eintragen, die nicht in der Liste steht. Das Entfernen einer Anrede aus der Liste ändert nichts an Personen, die sie bereits haben.
:::

## Ein Feld hinzufügen

1. Klicken Sie auf **Feld hinzufügen**.
2. Geben Sie im Editor, der sich rechts öffnet, einen **Namen** ein. Das ist die Bezeichnung, die Mitarbeitende auf Personenprofilen und bei der Suche sehen (zum Beispiel *Führungszeugnis läuft ab*).
3. Wählen Sie einen **Feldtyp**:
   - **Textfeld** — freier Kurztext.
   - **Ganzzahl** — Zahlen ohne Nachkommastellen (zum Beispiel eine Anzahl).
   - **Dezimalzahl** — Zahlen, die Nachkommastellen haben können.
   - **Datum** — ein Kalenderdatum.
   - **Ja/Nein** — eine einfache Ja-oder-nein-Antwort.
   - **Multiple Choice** — eine Auswahlliste. Wenn Sie diesen Typ wählen, erscheint ein **Editor für Auswahlmöglichkeiten**, in dem Sie jede Option hinzufügen, die Personen auswählen können.
4. Klicken Sie auf **Speichern**.

Das Feld steht jetzt auf dem Profil jeder Person zur Verfügung.

:::info
Die Feldtypen sind dieselben wie bei [Formularfragen](../forms/creating-forms.md). Werte verhalten sich daher in ganz B1 gleich.
:::

## Ein Feld bearbeiten

Klicken Sie auf eine beliebige Feldzeile in der Liste, um sie im Editor erneut zu öffnen. Ändern Sie Name, Typ oder Auswahlmöglichkeiten und klicken Sie auf **Speichern**.

:::warning
Wenn Sie den **Feldtyp** eines Feldes ändern, das bereits Werte hat (zum Beispiel von Textfeld auf Datum), können bereits eingetragene Werte in einem Format vorliegen, das nicht mehr zum neuen Typ passt. Ändern Sie Typen mit Bedacht, sobald Mitarbeitende das Feld befüllt haben.
:::

## Ein Feld löschen

Öffnen Sie ein Feld zum Bearbeiten und klicken Sie auf **Löschen**. Sie werden um eine Bestätigung gebeten: *„Sind Sie sicher, dass Sie dieses individuelle Feld löschen möchten? Die gespeicherten Werte werden ebenfalls entfernt.“* Das Löschen eines Feldes entfernt es dauerhaft **und jeden dafür gespeicherten Wert** bei allen Personen. Dies lässt sich nicht rückgängig machen.

## Werte einer Person eintragen

Sobald mindestens ein individuelles Feld existiert, stehen seine Werte direkt neben den eingebauten Angaben im Datensatz jeder Person. Sie sehen sie zusammen mit den Kontaktdaten links im Profil und bearbeiten sie im selben Formular wie die übrigen Angaben. Vor dem ersten definierten Feld erscheint nichts Zusätzliches.

1. Öffnen Sie den Datensatz einer Person unter **Personen**.
2. Klicken Sie links im Profil unterhalb der Kontaktdaten auf die Schaltfläche **Bearbeiten**.
3. Scrollen Sie unten im Bearbeitungsformular zum Bereich **Individuelle Felder** und tragen Sie für jedes Feld einen Wert ein. Jedes Feld zeigt die Eingabe, die zu seinem Typ passt: eine Datumsauswahl bei Datumsfeldern, ein Dropdown Ja/Nein bei Ja/Nein-Feldern, eine Auswahlliste bei Multiple Choice und so weiter.
4. Klicken Sie auf **Speichern**. Die Werte der individuellen Felder werden zusammen mit den übrigen Angaben der Person gespeichert.

Zurück auf dem Profil erscheint jedes Feld mit Wert unterhalb der Kontaktdaten als *Feldname: Wert* (Ja/Nein-Antworten werden als *Ja* oder *Nein* angezeigt, Multiple Choice zeigt die Bezeichnung der Option). Leere Felder werden einfach ausgeblendet. Um einen Wert zu entfernen, bearbeiten Sie die Person, leeren Sie das Feld und speichern Sie. Ein leerer Wert wird aus dem Datensatz gelöscht und nicht als leer gespeichert.

:::tip
Der klassische Anwendungsfall ist die Sicherheit Ehrenamtlicher. Legen Sie ein **Datumsfeld** namens *Führungszeugnis läuft ab* an, tragen Sie für jede ehrenamtliche Person das Datum ein und erstellen Sie dann eine [gespeicherte Liste](../people/lists.md), die alle markiert, deren Datum überschritten ist.
:::

## Nach individuellen Feldern suchen und Listen erstellen

Individuelle Felder sind vollständig durchsuchbar:

1. Öffnen Sie auf der Seite **Personen** die [erweiterte Suche](../people/searching-people.md).
2. Klappen Sie die Kategorie **Individuelle Felder** auf.
3. Setzen Sie ein Häkchen bei dem Feld, nach dem Sie filtern möchten, wählen Sie einen Operator und geben Sie einen Wert ein. Die angebotenen Operatoren richten sich nach dem Typ des Feldes:
   - **Textfeld** — enthält, ist gleich, beginnt mit, endet mit.
   - **Ganzzahl / Dezimalzahl** — ist gleich, größer als, größer oder gleich, kleiner als, kleiner oder gleich.
   - **Datum** — ist gleich, nach (größer als), vor (kleiner als).
   - **Ja/Nein** — ist gleich Ja oder Nein.
   - **Multiple Choice** — ist gleich oder enthält eine der Auswahlmöglichkeiten.

Speichern Sie jede Suche über individuelle Felder als [Liste](../people/lists.md). Listen sind Live-Abfragen. Eine Liste mit *Führungszeugnis läuft ab liegt vor heute* prüft daher bei jedem Öffnen alle Personen erneut, ohne dass Sie etwas pflegen müssen.

## Ein individuelles Feld als Spalte anzeigen

Um die Werte eines Feldes für alle gleichzeitig zu sehen, fügen Sie es auf der Seite **Personen** als Spalte hinzu. Stellen Sie **Ansicht als** auf **Tabelle**, klicken Sie im Seitenkopf auf das Symbol **Spalten auswählen**, wechseln Sie zum Reiter **Individuell** und setzen Sie ein Häkchen bei dem Feld. Der Wert jeder Person erscheint dann in einer eigenen Spalte neben den eingebauten Spalten. Siehe [Individuelle Felder als Spalten anzeigen](../people/searching-people.md#showing-custom-fields-as-columns).

## Was beim Zusammenführen passiert

Wenn Sie [zwei Personendatensätze zusammenführen](../people/adding-people.md), werden die Werte individueller Felder automatisch übernommen. Die Person, die Sie behalten, behält ihre eigenen Werte. Hatte nur die entfernte Person bei einem Feld einen Wert, wird dieser Wert übernommen, damit nichts verloren geht.

## Verwandte Artikel

- [Personen suchen](../people/searching-people.md) — erweiterte Suche, einschließlich der Kategorie Individuelle Felder, und Anzeige individueller Felder als Spalten
- [Gespeicherte Listen](../people/lists.md) — eine Suche über individuelle Felder speichern und live erneut ausführen
- [Rollen & Berechtigungen](./roles-permissions.md) — wer Felder definieren und Werte bearbeiten darf
- [Formulare erstellen](../forms/creating-forms.md) — für Datenerfassung mit mehreren Fragen, wenn ein ganzes Formular besser passt als einzelne Felder
