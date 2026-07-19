---
title: "Benutzerdefinierte Felder"
---

# Benutzerdefinierte Felder

<div class="article-intro">

**Benutzerdefinierte Felder** ermöglichen es dir, deine eigenen Informationen auf jedem Personenrecord zu verfolgen – Dinge, die B1 nicht als eingebautes Feld hat, wie ein Hintergrundscheck-Ablaufdatum, eine T-Shirt-Größe oder ein Taufklasse-Status. Du definierst ein Feld einmal in den Einstellungen, füllst dann auf jedem Personenprofil einen Wert aus und kannst darauf suchen oder Listen erstellen. Dies ersetzt den älteren Workaround, eine Personen-Formular nur zu erstellen, um ein einzelnes Stück benutzerdefinierter Daten zu speichern.

</div>

<div class="prereqs">
<h4>Bevor du beginnst</h4>

- Du benötigst die Berechtigung **Personen** bearbeiten, um Felder zu definieren und Werte auszufüllen, sowie Zugriff auf den Bereich **Einstellungen**. Jeder mit Berechtigung "Personen" anzeigen kann die Werte sehen. Siehe [Rollen & Berechtigungen](./roles-permissions.md).
- Entscheide, was du verfolgen möchtest und welcher Typ am besten passt (Text, eine Zahl, ein Datum, eine Ja/Nein-Antwort oder eine Pickliste), bevor du beginnst.

</div>

## Öffnen von benutzerdefinierten Feldern

Gehe in B1 Admin zu **Einstellungen** in der linken Seitenleiste und wähle die Karte **Benutzerdefinierte Felder**. Du kannst auch direkt dort hingehen at **/settings/custom-fields**. Du siehst eine Liste jedes Feldes, das du definiert hast, mit seinem **Namen** und **Feldtyp**. Wenn du noch keine erstellt hast, liest das Panel *"Keine benutzerdefinierten Felder wurden noch hinzugefügt."*

## Hinzufügen eines Feldes

1. Klicke auf **Feld hinzufügen**.
2. Gib im rechts öffnenden Editor einen **Namen** ein – dies ist das Label, das das Personal auf Personenprofilen und in der Suche sieht (z. B. *Hintergrundscheck läuft ab*).
3. Wähle einen **Feldtyp**:
   - **Textbox** – freier Form-Kurztext.
   - **Ganze Zahl** – Zahlen ohne Dezimalzahlen (z. B. eine Zählung).
   - **Dezimal** – Zahlen, die Dezimalzahlen enthalten können.
   - **Datum** – ein Kalenderdatum.
   - **Ja/Nein** – eine einfache Ja-oder-Nein-Antwort.
   - **Mehrfachauswahl** – eine Pickliste. Wenn du diesen Typ wählst, erscheint ein **Auswahls-Editor**, damit du jede Option hinzufügen kannst, die Personen auswählen können.
4. Klicke auf **Speichern**.

Das Feld ist jetzt auf dem Profil jeder Person verfügbar.

:::info
Die Feldtypen sind der gleiche Satz, der für [Formularfragen](../forms/creating-forms.md) verwendet wird, sodass Werte konsistent über B1 hinweg verhalten.
:::

## Bearbeiten eines Feldes

Klicke auf eine beliebige Feldzeile in der Liste, um sie im Editor erneut zu öffnen. Ändere den Namen, Typ oder Auswahlen und klicke auf **Speichern**.

:::warning
Das Ändern des **Feldtyps** eines Feldes, das bereits Werte hat (z. B. von Textbox zu Datum), kann dazu führen, dass zuvor eingegebene Werte in einem Format verbleiben, das nicht mehr zum neuen Typ passt. Ändere Typen mit Vorsicht, sobald das Personal begonnen hat, das Feld auszufüllen.
:::

## Löschen eines Feldes

Öffne ein Feld zum Bearbeiten und klicke auf **Löschen**. Du wirst aufgefordert zu bestätigen: *"Bist du sicher, dass du dieses benutzerdefinierte Feld löschen möchtest? Die gespeicherten Werte werden auch entfernt."* Das Löschen eines Feldes entfernt es dauerhaft **und jeden darauf gespeicherten Wert** auf allen Personen – dies kann nicht rückgängig gemacht werden.

## Füllen von Werten in einer Person

Sobald mindestens ein benutzerdefiniertes Feld existiert, sind seine Werte direkt neben den eingebauten Details auf jedem Personenrecord – du sehst sie in **Persönliche Details** und bearbeitest sie auf der gleichen Form, die du für den Rest der Personensdaten verwendest. Nichts Zusätzliches erscheint, bis du dein erstes Feld definiert hast.

1. Öffne einen Personenrecord in **Personen**.
2. Klicke im Bereich **Persönliche Details** auf den Button **Bearbeiten** (Stift).
3. Scrolle zum Bereich **Benutzerdefinierte Felder** am unteren Ende des Bearbeitungsformulars und fülle einen Wert für jedes Feld ein. Jedes Feld zeigt die Eingabe, die seinem Typ entspricht – eine Datumsauswahl für Datumsfelder, ein Ja/Nein-Dropdown für Ja/Nein-Felder, eine Pickliste für Mehrfachauswahl, usw.
4. Klicke auf **Speichern**. Deine Werte für benutzerdefinierte Felder werden zusammen mit dem Rest der Personensdaten gespeichert.

Auf dem Profil zeigt jedes Feld, das einen Wert hat, jetzt in der Sektion **Persönliche Details** (Ja/Nein-Antworten werden als *Ja* oder *Nein* gelesen, und Mehrfachauswahl zeigt das Label der Option). Felder, die leer gelassen werden, sind einfach verborgen. Um einen Wert zu entfernen, bearbeite die Person, lösche das Feld und speichere – ein leerer Wert wird gelöscht aus dem Record statt als blank gespeichert.

:::tip
Der klassische Use Case ist Freiwilligen-Sicherheit: erstelle ein **Datum**-Feld namens *Hintergrundscheck läuft ab*, speichere das Ablaufdatum jedes Freiwilligen, dann erstelle eine [Gespeicherte Liste](../people/lists.md), die jeden flaggt, dessen Datum vorbei ist.
:::

## Suchen und Listen auf benutzerdefinierten Feldern erstellen

Benutzerdefinierte Felder sind vollständig durchsuchbar:

1. Öffne auf der Seite **Personen** die [Erweiterte Suche](../people/searching-people.md).
2. Erweitere die Kategorie **Benutzerdefinierte Felder**.
3. Aktiviere das Feld, auf dem du filtern möchtest, wähle einen Operator und gib einen Wert ein. Die angebotenen Operatoren passen zum Typ des Feldes:
   - **Textbox** – enthält, gleich, beginnt mit, endet mit.
   - **Ganze Zahl / Dezimal** – gleich, größer als, größer als oder gleich, kleiner als, kleiner als oder gleich.
   - **Datum** – gleich, nach (größer als), vor (kleiner als).
   - **Ja/Nein** – gleich Ja oder Nein.
   - **Mehrfachauswahl** – gleich oder enthält eine der Auswahlen.

Speichere eine benutzerdefinierte Feldsuche als [Liste](../people/lists.md). Listen sind Live-Abfragen, daher eine Liste auf *Hintergrundscheck läuft ab ist vor heute* re-checks jede Person jedes Mal, wenn du sie öffnest – kein manueller Aufwand.

## Was bei der Zusammenführung passiert

Wenn du [zwei Personenrecords zusammenführst](../people/adding-people.md), werden Werte für benutzerdefinierte Felder automatisch übertragen. Die Person, die du bewahrst, behält ihre eigenen Werte; für jedes Feld, in dem nur die entfernte Person einen Wert hatte, wird dieser Wert kopiert, sodass nichts verloren geht.

## Verwandte Artikel

- [Personen suchen](../people/searching-people.md) – erweiterte Suche, einschließlich der Kategorie "Benutzerdefinierte Felder"
- [Gespeicherte Listen](../people/lists.md) – speichere eine Suche für benutzerdefinierte Felder und führe sie live erneut aus
- [Rollen & Berechtigungen](./roles-permissions.md) – wer kann Felder definieren und Werte bearbeiten
- [Formulare erstellen](../forms/creating-forms.md) – für Datenerfassung mit mehreren Fragen, wo eine vollständige Form besser passt als einzelne Felder
