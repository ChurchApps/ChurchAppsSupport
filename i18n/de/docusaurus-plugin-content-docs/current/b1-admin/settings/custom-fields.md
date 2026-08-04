---
title: "Benutzerdefinierte Felder"
---

# Benutzerdefinierte Felder

<div class="article-intro">

Mit **Benutzerdefinierten Feldern** können Sie eigene Informationen zu jedem Personendatensatz erfassen — Dinge, für die B1 kein eingebautes Feld hat, wie ein Ablaufdatum für eine Hintergrundüberprüfung, eine T-Shirt-Größe oder den Status eines Taufkurses. Sie definieren ein Feld einmal in den Einstellungen, füllen dann im Profil jeder Person einen Wert aus und können danach suchen oder Listen darauf aufbauen. Dies ersetzt den älteren Behelf, ein Personen-Formular nur zu erstellen, um ein einzelnes benutzerdefiniertes Datenelement zu speichern.

</div>

<div class="prereqs">
<h4>Bevor Sie beginnen</h4>

- Sie benötigen die Bearbeitungsberechtigung für **Personen**, um Felder zu definieren und Werte auszufüllen, sowie Zugriff auf den Bereich **Einstellungen**. Jeder mit Anzeigeberechtigung für Personen kann die Werte sehen. Siehe [Rollen & Berechtigungen](./roles-permissions.md).
- Entscheiden Sie vor dem Start, was Sie erfassen möchten und welcher Typ am besten passt (Text, eine Zahl, ein Datum, eine Ja/Nein-Antwort oder eine Auswahlliste).

</div>

## Benutzerdefinierte Felder öffnen

Gehen Sie in B1 Admin in der linken Seitenleiste zu **Einstellungen** und wählen Sie die Karte **Benutzerdefinierte Felder**. Sie können auch direkt unter **/settings/custom-fields** dorthin gelangen. Sie sehen eine Liste aller von Ihnen definierten Felder mit **Name** und **Feldtyp**. Falls Sie noch keine erstellt haben, zeigt das Panel „Es wurden noch keine benutzerdefinierten Felder hinzugefügt."

## Ein Feld hinzufügen

1. Klicken Sie auf **Feld hinzufügen**.
2. Geben Sie im rechts geöffneten Editor einen **Namen** ein — dies ist die Bezeichnung, die Mitarbeiter in Personenprofilen und in der Suche sehen (zum Beispiel *Hintergrundüberprüfung läuft ab*).
3. Wählen Sie einen **Feldtyp**:
   - **Textfeld** — frei formulierbarer Kurztext.
   - **Ganze Zahl** — Zahlen ohne Dezimalstellen (zum Beispiel eine Anzahl).
   - **Dezimalzahl** — Zahlen, die Dezimalstellen enthalten können.
   - **Datum** — ein Kalenderdatum.
   - **Ja/Nein** — eine einfache Ja-oder-Nein-Antwort.
   - **Mehrfachauswahl** — eine Auswahlliste. Wenn Sie diesen Typ wählen, erscheint ein **Auswahl-Editor**, in dem Sie jede Option hinzufügen können, aus der Personen wählen können.
4. Klicken Sie auf **Speichern**.

Das Feld ist jetzt in jedem Personenprofil verfügbar.

:::info
Die Feldtypen sind dieselben, die auch bei [Formularfragen](../forms/creating-forms.md) verwendet werden, sodass sich Werte in ganz B1 einheitlich verhalten.
:::

## Ein Feld bearbeiten

Klicken Sie auf eine beliebige Feldzeile in der Liste, um sie erneut im Editor zu öffnen. Ändern Sie Name, Typ oder Auswahlmöglichkeiten und klicken Sie auf **Speichern**.

:::warning
Das Ändern des **Feldtyps** eines Feldes, das bereits Werte enthält (zum Beispiel von Textfeld zu Datum), kann dazu führen, dass zuvor eingegebene Werte in einem Format vorliegen, das nicht mehr zum neuen Typ passt. Ändern Sie Typen mit Vorsicht, sobald Mitarbeiter begonnen haben, das Feld auszufüllen.
:::

## Ein Feld löschen

Öffnen Sie ein Feld zum Bearbeiten und klicken Sie auf **Löschen**. Sie werden um Bestätigung gebeten: „Möchten Sie dieses benutzerdefinierte Feld wirklich löschen? Die gespeicherten Werte werden ebenfalls entfernt." Das Löschen eines Feldes entfernt es dauerhaft **und jeden dafür bei allen Personen gespeicherten Wert** — dies kann nicht rückgängig gemacht werden.

## Werte bei einer Person ausfüllen

Sobald mindestens ein benutzerdefiniertes Feld existiert, befinden sich seine Werte direkt neben den eingebauten Details im Datensatz jeder Person — Sie sehen sie unter **Persönliche Details** und bearbeiten sie im selben Formular, das Sie für die übrigen Informationen der Person verwenden. Es erscheint nichts Zusätzliches, bis Sie Ihr erstes Feld definiert haben.

1. Öffnen Sie den Datensatz einer Person unter **Personen**.
2. Klicken Sie im Bereich **Persönliche Details** auf die Schaltfläche **Bearbeiten** (Stift).
3. Scrollen Sie zum Bereich **Benutzerdefinierte Felder** am Ende des Bearbeitungsformulars und füllen Sie für jedes Feld einen Wert aus. Jedes Feld zeigt die zu seinem Typ passende Eingabe — einen Datumswähler für Datumsfelder, ein Ja/Nein-Dropdown für Ja/Nein-Felder, eine Auswahlliste für Mehrfachauswahl usw.
4. Klicken Sie auf **Speichern**. Ihre benutzerdefinierten Feldwerte werden zusammen mit den übrigen Details der Person gespeichert.

Zurück im Profil wird jedes Feld mit einem Wert nun im Bereich **Persönliche Details** angezeigt (Ja/Nein-Antworten werden als *Ja* oder *Nein* dargestellt, und Mehrfachauswahl zeigt die Bezeichnung der Option). Leer gelassene Felder sind einfach ausgeblendet. Um einen Wert zu entfernen, bearbeiten Sie die Person, leeren Sie das Feld und speichern Sie — ein leerer Wert wird aus dem Datensatz gelöscht, statt als leer gespeichert zu werden.

:::tip
Der klassische Anwendungsfall ist die Sicherheit von ehrenamtlichen Helfern: Erstellen Sie ein **Datum**-Feld namens *Hintergrundüberprüfung läuft ab*, erfassen Sie das Datum jedes Helfers, und erstellen Sie dann eine [Gespeicherte Liste](../people/lists.md), die jeden markiert, dessen Datum verstrichen ist.
:::

## Suchen und Listen auf Basis benutzerdefinierter Felder erstellen

Benutzerdefinierte Felder sind vollständig durchsuchbar:

1. Öffnen Sie auf der Seite **Personen** die [Erweiterte Suche](../people/searching-people.md).
2. Erweitern Sie die Kategorie **Benutzerdefinierte Felder**.
3. Aktivieren Sie das Feld, nach dem Sie filtern möchten, wählen Sie einen Operator und geben Sie einen Wert ein. Die angebotenen Operatoren richten sich nach dem Feldtyp:
   - **Textfeld** — enthält, entspricht, beginnt mit, endet mit.
   - **Ganze Zahl / Dezimalzahl** — entspricht, größer als, größer als oder gleich, kleiner als, kleiner als oder gleich.
   - **Datum** — entspricht, nach (größer als), vor (kleiner als).
   - **Ja/Nein** — entspricht Ja oder Nein.
   - **Mehrfachauswahl** — entspricht oder enthält eine der Optionen.

Speichern Sie jede Suche nach benutzerdefinierten Feldern als [Liste](../people/lists.md). Listen sind Live-Abfragen, sodass eine Liste, die auf *Hintergrundüberprüfung läuft vor heute ab* aufbaut, jedes Mal beim Öffnen erneut jede Person prüft — ohne manuellen Pflegeaufwand.

## Was beim Zusammenführen passiert

Wenn Sie [zwei Personendatensätze zusammenführen](../people/adding-people.md), werden die Werte benutzerdefinierter Felder automatisch übernommen. Die Person, die Sie behalten, behält ihre eigenen Werte; für jedes Feld, bei dem nur die entfernte Person einen Wert hatte, wird dieser Wert übernommen, sodass nichts verloren geht.

## Verwandte Artikel

- [Personen suchen](../people/searching-people.md) — erweiterte Suche, einschließlich der Kategorie Benutzerdefinierte Felder
- [Gespeicherte Listen](../people/lists.md) — eine Suche nach benutzerdefinierten Feldern speichern und live erneut ausführen
- [Rollen & Berechtigungen](./roles-permissions.md) — wer Felder definieren und Werte bearbeiten kann
- [Formulare erstellen](../forms/creating-forms.md) — für die Erfassung mehrerer Fragen, wenn ein vollständiges Formular besser passt als einzelne Felder
