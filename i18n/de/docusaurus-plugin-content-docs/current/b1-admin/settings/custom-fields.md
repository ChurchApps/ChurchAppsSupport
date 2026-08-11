---
title: "Benutzerdefinierte Felder"
---

# Benutzerdefinierte Felder

<div class="article-intro">

**Benutzerdefinierte Felder** ermöglichen es Ihnen, Ihre eigenen Informationen auf jedem Personendatensatz zu verfolgen -- Dinge, die B1 kein eingebautes Feld hat, wie ein Hintergrundcheck-Verfallsdatum, eine T-Shirt-Größe oder ein Taufklassen-Status. Sie definieren ein Feld einmal in Einstellungen, dann füllen Sie einen Wert auf dem Profil jeder Person aus und suchen oder bauen Listen darauf. Dies ersetzt die ältere Lösung, ein "Personen"-Formular nur zu erstellen, um ein einzelnes Datenelement zu speichern.

</div>

<div class="prereqs">
<h4>Voraussetzungen</h4>

- Sie benötigen **Personen**-Bearbeitungsberechtigung zum Definieren von Feldern und zum Ausfüllen von Werten, und Sie benötigen Zugriff auf den **Einstellungen**-Bereich. Jeder mit Berechtigung zur Ansicht von Personen kann die Werte sehen. Siehe [Rollen & Berechtigungen](./roles-permissions.md).
- Entscheiden Sie, was Sie verfolgen möchten und welcher Typ am besten passt (Text, eine Zahl, ein Datum, eine Ja/Nein-Antwort oder eine Ausnahmeliste), bevor Sie starten.

</div>

## Öffnen von benutzerdefinierten Feldern

Öffnen Sie in B1 Admin das **Bereichsmenü** in der oberen linken Ecke (der Bereichsname mit dem kleinen Pfeil), wählen Sie **Einstellungen** und wählen Sie die Karte **Benutzerdefinierte Felder**. Sie können auch direkt dort zu **/settings/custom-fields** gehen. Sie sehen eine Liste aller definierten Felder, die seinen **Namen** und **Feldtyp** anzeigt. Wenn Sie noch keine erstellt haben, liest das Panel *"Noch keine benutzerdefinierten Felder hinzugefügt".*

## Hinzufügen eines Feldes

1. Klicken Sie auf **Feld hinzufügen**.
2. Geben Sie im Editor, der auf der rechten Seite öffnet, einen **Namen** ein -- dies ist die Bezeichnung, die das Personal auf Personenprofilen und in der Suche sieht (z.B. *Hintergrundcheck läuft ab*).
3. Wählen Sie einen **Feldtyp**:
   - **Textfeld** -- freie Form kurzem Text.
   - **Ganze Zahl** -- Zahlen ohne Dezimalstellen (z.B. eine Zählung).
   - **Dezimalzahl** -- Zahlen, die Dezimalstellen enthalten können.
   - **Datum** -- ein Kalenderdatum.
   - **Ja/Nein** -- eine einfache Ja-oder-Nein-Antwort.
   - **Mehrfachauswahl** -- eine Ausnahmeliste. Wenn Sie diesen Typ wählen, wird ein **Ausnahmenwahl-Editor** angezeigt, sodass Sie jede Option hinzufügen können, die Personen wählen können.
4. Klicken Sie auf **Speichern**.

Das Feld ist jetzt auf jedem Personenprofil verfügbar.

:::info
Die Feldtypen sind der gleiche Satz, der für [Formularfragen](../forms/creating-forms.md) verwendet wird, sodass sich Werte konsistent über B1 verhalten.
:::

## Bearbeiten eines Feldes

Klicken Sie auf eine beliebige Feldreihe in der Liste, um sie im Editor erneut zu öffnen. Ändern Sie den Namen, den Typ oder die Ausnahmenwahlen und klicken Sie auf **Speichern**.

:::warning
Das Ändern des **Feldtyps** eines Feldes, das bereits Werte hat (z.B. von Textfeld zu Datum), kann zu früher eingegebenen Werten führen, die nicht mehr mit dem neuen Typ übereinstimmen. Ändern Sie Typen mit Vorsicht, sobald das Personal begonnen hat, das Feld auszufüllen.
:::

## Löschen eines Feldes

Öffnen Sie ein Feld zur Bearbeitung und klicken Sie auf **Löschen**. Sie werden aufgefordert, zu bestätigen: *"Möchten Sie dieses benutzerdefinierte Feld wirklich löschen? Seine gespeicherten Werte werden auch entfernt."* Das Löschen eines Feldes entfernt dauerhaft es **und jeden Wert, der darin gespeichert ist** für alle Personen -- dies kann nicht rückgängig gemacht werden.

## Ausfüllen von Werten auf einer Person

Sobald mindestens ein benutzerdefiniertes Feld vorhanden ist, leben seine Werte direkt neben den eingebauten Details auf jedem Personendatensatz -- Sie sehen sie in **Personaldetails** und bearbeiten sie auf dem gleichen Formular, das Sie für den Rest der Personalinformationen verwenden. Nichts Zusätzliches erscheint, bis Sie Ihr erstes Feld definiert haben.

1. Öffnen Sie einen Personendatensatz in **Personen**.
2. Klicken Sie in der **Personaldetails**-Sektion auf die Schaltfläche **Bearbeiten** (Stift).
3. Scrollen Sie zum **Benutzerdefinierte Felder**-Bereich unten im Bearbeitungsformular und füllen Sie einen Wert für jedes Feld aus. Jedes Feld zeigt die Eingabe, die seinem Typ entspricht -- einen Datumswähler für Datums-Felder, ein Ja/Nein-Dropdown für Ja/Nein-Felder, eine Ausnahmeliste für Mehrfachauswahl usw.
4. Klicken Sie auf **Speichern**. Ihre benutzerdefinierten Feldwerte werden zusammen mit dem Rest der Personalinformationen gespeichert.

Zurück auf dem Profil zeigt jedes Feld, das einen Wert hat, jetzt in der **Personaldetails**-Sektion an (Ja/Nein-Antworten lesen als *Ja* oder *Nein*, und Mehrfachauswahl zeigt die Bezeichnung der Ausnahmenwahl). Felder, die leer gelassen werden, werden einfach verborgen. Um einen Wert zu entfernen, bearbeiten Sie die Person, löschen Sie das Feld und speichern Sie -- ein leerer Wert wird gelöscht aus dem Datensatz, anstatt als leer gespeichert zu werden.

:::tip
Der klassische Fall ist Freiwilligensicherheit: erstellen Sie ein **Datum**-Feld namens *Hintergrundcheck läuft ab*, zeichnen Sie das Datum jedes Freiwilligen auf, dann erstellen Sie eine [gespeicherte Liste](../people/lists.md), die alle kennzeichnet, deren Datum überschritten wurde.
:::

## Suchen und Bauen von Listen auf benutzerdefinierten Feldern

Benutzerdefinierte Felder sind vollständig durchsuchbar:

1. Öffnen Sie auf der **Personen**-Seite die [erweiterte Suche](../people/searching-people.md).
2. Erweitern Sie die Kategorie **Benutzerdefinierte Felder**.
3. Aktivieren Sie das Feld, auf das Sie filtern möchten, wählen Sie einen Operator und geben Sie einen Wert ein. Die angebotenen Operatoren passen zum Feldtyp:
   - **Textfeld** -- enthält, ist gleich, beginnt mit, endet mit.
   - **Ganze Zahl / Dezimalzahl** -- ist gleich, größer als, größer oder gleich, kleiner als, kleiner oder gleich.
   - **Datum** -- ist gleich, nach (größer als), vor (kleiner als).
   - **Ja/Nein** -- gleich Ja oder Nein.
   - **Mehrfachauswahl** -- gleich oder enthält eine der Ausnahmenwahlen.

Speichern Sie jede benutzerdefinierte Feldsuche als [Liste](../people/lists.md). Listen sind Live-Abfragen, sodass eine Liste, die auf *Hintergrundcheck läuft ab, ist vor heute* gebaut ist, jedes Mal überprüft, wenn Sie es öffnen, ob Sie es öffnen -- keine manuelle Wartung.

## Was beim Zusammenführen passiert

Wenn Sie [zwei Personendatensätze zusammenführen](../people/adding-people.md), werden benutzerdefinierte Feldwerte automatisch übertragen. Die Person, die Sie behalten, behält ihre eigenen Werte; für jedes Feld, bei dem nur die entfernte Person einen Wert hatte, wird dieser Wert kopiert, sodass nichts verloren geht.

## Verwandte Artikel

- [Personen suchen](../people/searching-people.md) -- erweiterte Suche, einschließlich der Kategorie "Benutzerdefinierte Felder"
- [Gespeicherte Listen](../people/lists.md) -- speichern Sie eine benutzerdefinierte Feldsuche und führen Sie sie live erneut aus
- [Rollen & Berechtigungen](./roles-permissions.md) -- wer kann Felder definieren und Werte bearbeiten
- [Formulare erstellen](../forms/creating-forms.md) -- für Multi-Frage-Datenerfassung, wo eine vollständiges Formular besser passt als einzelne Felder
