---
title: "Benutzerdefinierte Felder"
---

# Benutzerdefinierte Felder

<div class="article-intro">

**Benutzerdefinierte Felder** ermöglichen es Ihnen, Ihre eigenen Informationen für jeden Personendatensatz zu verfolgen — Dinge, die B1 kein integriertes Feld für hat, wie ein Ablaufdatum des Hintergrund-Checks, eine T-Shirt-Größe oder einen Taufunterrichts-Status. Sie definieren ein Feld einmal in Einstellungen, füllen dann einen Wert auf jeder Personenprofil aus und suchen oder erstellen Listen danach. Dies ersetzt die ältere Problemlösung, einfach nur ein Formulär Personen zu erstellen, um einen einzelnen Datenpunkt zu speichern.

</div>

<div class="prereqs">
<h4>Bevor Sie beginnen</h4>

- Sie benötigen **Personen**-Bearbeitungsberechtigung, um Felder zu definieren und Werte auszufüllen, sowie Zugriff auf den **Einstellungen**-Bereich. Jeder mit Berechtigungen zum Anzeigen von Personen kann die Werte sehen. Siehe [Rollen & Berechtigungen](./roles-permissions.md).
- Entscheiden Sie, was Sie verfolgen möchten und welcher Typ am besten passt (Text, eine Zahl, ein Datum, eine Ja/Nein-Antwort oder eine Auswahlliste), bevor Sie starten.

</div>

## Benutzerdefinierte Felder öffnen

Gehen Sie in B1 Admin zu **Einstellungen** in der linken Seitenleiste und wählen Sie die **Benutzerdefinierte Felder**-Karte. Sie können auch direkt unter **/settings/custom-fields** dorthin gehen. Sie sehen eine Liste jedes Feldes, das Sie definiert haben, mit seinem **Namen** und **Feldtyp**. Wenn Sie noch keine erstellt haben, zeigt das Fenster *„Es wurden noch keine benutzerdefinierten Felder hinzugefügt."*

## Feld hinzufügen

1. Klicken Sie auf **Feld hinzufügen**.
2. Geben Sie im geöffneten Editor auf der rechten Seite einen **Namen** ein — dies ist das Label, das Personal auf Personenprofilen und bei der Suche sieht (z. B. *Background Check läuft ab*).
3. Wählen Sie einen **Feldtyp**:
   - **Textbox** — freier Text.
   - **Ganze Zahl** — Zahlen ohne Dezimalzahlen (z. B. eine Zählung).
   - **Dezimalzahl** — Zahlen, die Dezimalzahlen enthalten können.
   - **Datum** — ein Kalenderdatum.
   - **Ja/Nein** — eine einfache Ja-oder-Nein-Antwort.
   - **Mehrfachauswahl** — eine Auswahlliste. Wenn Sie diesen Typ auswählen, erscheint ein **Auswahl-Editor**, damit Sie jede Option hinzufügen können, die Personen auswählen können.
4. Klicken Sie auf **Speichern**.

Das Feld ist nun auf dem Profil jeder Person verfügbar.

:::info
Die Feldtypen sind dieselbe Reihe, die für [Formularfragen](../forms/creating-forms.md) verwendet wird, daher verhalten sich Werte konsistent in B1.
:::

## Feld bearbeiten

Klicken Sie auf eine beliebige Feldreihe in der Liste, um sie im Editor erneut zu öffnen. Ändern Sie den Namen, Typ oder die Auswahl und klicken Sie auf **Speichern**.

:::warning
Das Ändern des **Feldtyp** eines Feldes, das bereits Werte hat (z. B. von Textbox zu Datum), kann zuvor eingegebene Werte in einem Format hinterlassen, das nicht mehr zum neuen Typ passt. Ändern Sie Typen mit Vorsicht, sobald das Personal das Feld auszufüllen begonnen hat.
:::

## Feld löschen

Öffnen Sie ein Feld zum Bearbeiten und klicken Sie auf **Löschen**. Sie werden aufgefordert zu bestätigen: *„Sind Sie sicher, dass Sie dieses benutzerdefinierte Feld löschen möchten? Seine gespeicherten Werte werden ebenfalls entfernt."* Das Löschen eines Feldes entfernt es dauerhaft **und jeden Wert, der dafür auf allen Personen gespeichert ist** — dies kann nicht rückgängig gemacht werden.

## Werte ausfüllen auf einer Person

Sobald mindestens ein benutzerdefiniertes Feld vorhanden ist, befinden sich seine Werte direkt neben den integrierten Details auf jedem Personendatensatz — Sie sehen sie in **Persönliche Details** und bearbeiten sie auf demselben Formular, das Sie für die restlichen Informationen der Person verwenden. Nichts Zusätzliches erscheint, bis Sie Ihr erstes Feld definiert haben.

1. Öffnen Sie einen Personendatensatz in **Personen**.
2. Klicken Sie im **Persönliche Details**-Bereich auf die **Bearbeiten** (Bleistift)-Schaltfläche.
3. Scrollen Sie zum **Benutzerdefinierte Felder**-Bereich am Ende des Bearbeitungsformulars und füllen Sie einen Wert für jedes Feld aus. Jedes Feld zeigt die Eingabe, die seinem Typ entspricht — einen Datumsauswähler für Datumfelder, ein Ja/Nein-Dropdown für Ja/Nein-Felder, eine Auswahlliste für Mehrfachauswahl und so weiter.
4. Klicken Sie auf **Speichern**. Ihre benutzerdefinierten Feldwerte werden zusammen mit den restlichen Details der Person gespeichert.

Zurück auf dem Profil zeigt jedes Feld, das einen Wert hat, jetzt im **Persönliche Details**-Bereich (Ja/Nein-Antworten werden als *Ja* oder *Nein* angezeigt, und Mehrfachauswahl zeigt das Label der Option). Felder, die leer gelassen werden, sind einfach verborgen. Um einen Wert zu entfernen, bearbeiten Sie die Person, löschen Sie das Feld und speichern — ein leerer Wert wird aus dem Datensatz gelöscht, anstatt leer gespeichert zu werden.

:::tip
Der klassische Anwendungsfall ist die Freiwilligenssicherheit: Erstellen Sie ein **Datum**-Feld namens *Background Check läuft ab*, registrieren Sie das Ablaufdatum jedes Freiwilligen, dann erstellen Sie eine [Gespeicherte Liste](../people/lists.md), die alle Flaggen, deren Datum überschritten ist.
:::

## Suchen und Erstellen von Listen zu benutzerdefinierten Feldern

Benutzerdefinierte Felder sind vollständig durchsuchbar:

1. Öffnen Sie auf der Seite **Personen** die [Erweiterte Suche](../people/searching-people.md).
2. Erweitern Sie die **Benutzerdefinierte Felder**-Kategorie.
3. Aktivieren Sie das Feld, das Sie filtern möchten, wählen Sie einen Operator und geben Sie einen Wert ein. Die angebotenen Operatoren entsprechen dem Feldtyp:
   - **Textbox** — enthält, gleich, beginnt mit, endet mit.
   - **Ganze Zahl / Dezimalzahl** — gleich, größer als, größer als oder gleich, kleiner als, kleiner als oder gleich.
   - **Datum** — gleich, nach (größer als), vor (kleiner als).
   - **Ja/Nein** — gleich Ja oder Nein.
   - **Mehrfachauswahl** — gleich oder enthält eines der Auswahlen.

Speichern Sie eine benutzerdefinierte Feldsuche als [Liste](../people/lists.md). Listen sind Live-Abfragen, daher überprüft eine Liste, die auf *Background Check läuft ab ist vor heute* gebaut, jedes Mal, wenn Sie sie öffnen, jede Person neu — keine manuelle Wartung.

## Was beim Zusammenführen geschieht

Wenn Sie [zwei Personendatensätze zusammenführen](../people/adding-people.md), werden benutzerdefinierte Feldwerte automatisch übernommen. Die Person, die Sie behalten, behält ihre eigenen Werte; für jedes Feld, in dem nur die entfernte Person einen Wert hatte, wird dieser Wert übernommen, damit nichts verloren geht.

## Verwandte Artikel

- [Personen suchen](../people/searching-people.md) — erweiterte Suche, einschließlich der Benutzerdefinierte Felder-Kategorie
- [Gespeicherte Listen](../people/lists.md) — speichern Sie eine benutzerdefinierte Feldsuche und führen Sie sie live erneut aus
- [Rollen & Berechtigungen](./roles-permissions.md) — wer kann Felder definieren und Werte bearbeiten
- [Formulare erstellen](../forms/creating-forms.md) — für Multi-Frage-Datenerfassung, wo ein vollständiges Formular besser passt als einzelne Felder
