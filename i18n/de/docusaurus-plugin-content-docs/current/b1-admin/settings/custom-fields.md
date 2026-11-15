---
title: "Benutzerdefinierte Felder"
description: "Definieren Sie in B1 Admin benutzerdefinierte Felder, um zusätzliche Angaben zu Personen zu erfassen, etwa Ablaufdaten von Führungszeugnissen oder Shirt-Größen, und suchen und filtern Sie dann danach."
---

# Benutzerdefinierte Felder

<div class="article-intro">

Mit **benutzerdefinierten Feldern** erfassen Sie eigene Angaben in jedem Personendatensatz – Dinge, für die B1 kein eingebautes Feld hat, etwa ein Ablaufdatum des Führungszeugnisses, eine T-Shirt-Größe oder den Status eines Taufkurses. Sie definieren ein Feld einmal in den Einstellungen, tragen danach auf dem Profil jeder Person einen Wert ein und suchen oder erstellen Listen darauf. Das ersetzt den früheren Umweg, ein Personenformular nur zum Speichern eines einzelnen eigenen Datums anzulegen.

</div>

## Schulungsvideo {#training-video}

<YouTube id="yUfDEbp2HQ4" title="Benutzerdefinierte Felder, Massenbearbeitung und Export in B1" next="Gruppen erstellen und Mitglieder hinzufügen in B1" nextUrl="/docs/b1-admin/groups/creating-groups" />

<div class="prereqs">
<h4>Bevor Sie beginnen</h4>

- Sie benötigen die Berechtigung **Kircheneinstellungen bearbeiten**, um die Einstellungsseite zu öffnen (und die Liste der Anreden zu speichern), sowie die Berechtigung **Personen bearbeiten**, um Felder zu definieren und Werte einzutragen. Wer die Personen anzeigen darf, sieht auch die Werte. Siehe [Rollen und Berechtigungen](./roles-permissions.md).
- Überlegen Sie vorab, was Sie erfassen möchten und welcher Typ am besten passt (Text, eine Zahl, ein Datum, eine Ja/Nein-Angabe oder eine Auswahlliste).

</div>

## Benutzerdefinierte Felder öffnen {#opening-custom-fields}

Öffnen Sie in B1 Admin das [Sprungmenü](../introduction.md#getting-around-with-the-jump-menu) (die Suchleiste oben links), wählen Sie **Einstellungen > Einstellungen** und klicken Sie in der linken Liste auf **Benutzerdefinierte Felder**, um zum Abschnitt **Benutzerdefinierte Felder** zu scrollen. Sie gelangen auch direkt unter **/settings/custom-fields** dorthin. Sie sehen eine Liste aller definierten Felder mit ihrem **Namen** und **Feldtyp**. Haben Sie noch keines angelegt, lautet der Bereich *„Es wurden noch keine benutzerdefinierten Felder hinzugefügt.“*

## Anreden {#titles}

Die Karte **Anreden** oben im Abschnitt Benutzerdefinierte Felder enthält die Anreden, die im Feld **Anrede** angeboten werden, wenn jemand eine Person anlegt oder bearbeitet – in B1 Admin und in der B1-App (dem Profil-Editor und dem Gästeanmeldeformular). Die Liste beginnt mit Mr, Mrs, Miss, Ms, Dr, Prof, Rev und Pastor.

1. Geben Sie eine Anrede in **Neue Anrede** ein (bis zu 10 Zeichen), etwa *Diakon* oder *Ältester*, und klicken Sie auf **Anrede hinzufügen**.
2. Um eine Anrede von der Liste zu nehmen, klicken Sie auf das **×** an ihrem Chip.
3. Klicken Sie auf **Speichern**. Eine Meldung *Anreden gespeichert.* bestätigt die Änderung. Wenn Sie eine Anrede hinzufügen, die bereits in der Liste steht, erscheint *Diese Anrede ist bereits in der Liste.*

:::tip
Das Feld Anrede akzeptiert weiterhin freie Eingaben, sodass Mitarbeitende und Mitglieder auch eine Anrede eingeben können, die nicht in der Liste steht. Wenn Sie eine Anrede aus der Liste entfernen, ändert sich nichts bei Personen, die sie bereits haben.
:::

## Ein Feld hinzufügen {#adding-a-field}

1. Klicken Sie auf **Feld hinzufügen**.
2. Geben Sie im Editor, der sich rechts öffnet, einen **Namen** ein – das ist die Bezeichnung, die Mitarbeitende auf Personenprofilen und in der Suche sehen (zum Beispiel *Führungszeugnis läuft ab*).
3. Wählen Sie einen **Feldtyp**:
   - **Textfeld** — frei eingebbarer kurzer Text.
   - **Ganze Zahl** — Zahlen ohne Nachkommastellen (zum Beispiel eine Anzahl).
   - **Dezimalzahl** — Zahlen, die Nachkommastellen enthalten können.
   - **Datum** — ein Kalenderdatum.
   - **Ja/Nein** — eine einfache Ja-oder-nein-Angabe.
   - **Auswahl** — eine Auswahlliste. Wenn Sie diesen Typ wählen, erscheint ein **Editor für Auswahlmöglichkeiten**, in dem Sie jede Option hinzufügen, die Menschen auswählen können.
4. Klicken Sie auf **Speichern**.

Das Feld steht nun auf dem Profil jeder Person zur Verfügung.

:::info
Die Feldtypen entsprechen denselben, die für [Formularfragen](../forms/creating-forms.md) verwendet werden. Werte verhalten sich daher in ganz B1 einheitlich.
:::

## Ein Feld bearbeiten {#editing-a-field}

Klicken Sie in der Liste auf eine beliebige Feldzeile, um sie im Editor erneut zu öffnen. Ändern Sie Name, Typ oder Auswahlmöglichkeiten und klicken Sie auf **Speichern**.

:::warning
Eine Änderung des **Feldtyps** bei einem Feld, das bereits Werte enthält (etwa von Textfeld auf Datum), kann dazu führen, dass zuvor eingetragene Werte nicht mehr zum neuen Typ passen. Ändern Sie Typen mit Bedacht, sobald Mitarbeitende das Feld auszufüllen begonnen haben.
:::

## Ein Feld löschen {#deleting-a-field}

Öffnen Sie ein Feld zur Bearbeitung und klicken Sie auf **Löschen**. Sie werden um Bestätigung gebeten: *„Sind Sie sicher, dass Sie dieses benutzerdefinierte Feld löschen möchten? Die gespeicherten Werte werden ebenfalls entfernt.“* Das Löschen eines Feldes entfernt es dauerhaft **und alle darin gespeicherten Werte** bei allen Personen – dies lässt sich nicht rückgängig machen.

## Werte bei einer Person eintragen {#filling-in-values-on-a-person}

Sobald mindestens ein benutzerdefiniertes Feld existiert, stehen seine Werte direkt neben den eingebauten Angaben im Datensatz jeder Person – Sie sehen sie links im Profil neben den Kontaktdaten und bearbeiten sie im selben Formular, das Sie für die übrigen Angaben der Person nutzen. Erst nach dem Definieren des ersten Feldes erscheint etwas Zusätzliches.

1. Öffnen Sie den Datensatz einer Person unter **Personen**.
2. Klicken Sie links im Profil unter den Kontaktdaten der Person auf die Schaltfläche **Bearbeiten**.
3. Scrollen Sie unten im Bearbeitungsformular zum Bereich **Benutzerdefinierte Felder** und tragen Sie für jedes Feld einen Wert ein. Jedes Feld zeigt die Eingabe, die zu seinem Typ passt – eine Datumsauswahl bei Datumsfeldern, eine Ja/Nein-Auswahl bei Ja/Nein-Feldern, eine Auswahlliste bei Auswahl-Feldern usw.
4. Klicken Sie auf **Speichern**. Die Werte der benutzerdefinierten Felder werden zusammen mit den übrigen Angaben der Person gespeichert.

Zurück im Profil erscheint jedes Feld mit einem Wert unter den Kontaktdaten der Person als *Feldname: Wert* (Ja/Nein-Antworten lauten *Ja* oder *Nein*, und bei Auswahlfeldern steht die Bezeichnung der Option). Leere Felder bleiben einfach ausgeblendet. Um einen Wert zu entfernen, bearbeiten Sie die Person, leeren Sie das Feld und speichern Sie – ein leerer Wert wird aus dem Datensatz gelöscht und nicht als leer gespeichert.

:::tip
Der klassische Anwendungsfall ist die Sicherheit Ehrenamtlicher: Legen Sie ein **Datumsfeld** namens *Führungszeugnis läuft ab* an, erfassen Sie für jede ehrenamtlich tätige Person das Datum und erstellen Sie dann eine [gespeicherte Liste](../people/lists.md), die alle markiert, deren Datum überschritten ist.
:::

## Nach benutzerdefinierten Feldern suchen und Listen erstellen {#searching-and-building-lists-on-custom-fields}

Benutzerdefinierte Felder sind vollständig durchsuchbar:

1. Öffnen Sie auf der Seite **Personen** die [erweiterte Suche](../people/searching-people.md).
2. Klappen Sie die Kategorie **Benutzerdefinierte Felder** auf.
3. Aktivieren Sie das Feld, nach dem Sie filtern möchten, wählen Sie einen Operator und geben Sie einen Wert ein. Die angebotenen Operatoren richten sich nach dem Feldtyp:
   - **Textfeld** — enthält, ist gleich, beginnt mit, endet mit.
   - **Ganze Zahl / Dezimalzahl** — ist gleich, größer als, größer oder gleich, kleiner als, kleiner oder gleich.
   - **Datum** — ist gleich, nach (größer als), vor (kleiner als).
   - **Ja/Nein** — ist gleich Ja oder Nein.
   - **Auswahl** — ist gleich oder enthält eine der Auswahlmöglichkeiten.

Speichern Sie jede Suche über benutzerdefinierte Felder als [Liste](../people/lists.md). Listen sind Live-Abfragen: Eine Liste mit *Führungszeugnis läuft ab ist vor heute* prüft jede Person bei jedem Öffnen erneut – ganz ohne manuelle Pflege.

## Ein benutzerdefiniertes Feld als Spalte anzeigen {#showing-a-custom-field-as-a-column}

Um die Werte eines Feldes für alle auf einmal zu sehen, fügen Sie es als Spalte auf der Seite **Personen** hinzu. Stellen Sie **Anzeigen als** auf **Tabelle** um, klicken Sie im Seitenkopf auf das Symbol **Spalten auswählen**, wechseln Sie zum Reiter **Benutzerdefiniert** und aktivieren Sie das Feld. Der Wert jeder Person erscheint dann in einer eigenen Spalte neben den eingebauten Spalten. Siehe [Benutzerdefinierte Felder als Spalten anzeigen](../people/searching-people.md#showing-custom-fields-as-columns).

## Was beim Zusammenführen geschieht {#what-happens-on-merge}

Wenn Sie [zwei Personendatensätze zusammenführen](../people/adding-people.md), werden die Werte benutzerdefinierter Felder automatisch übernommen. Die Person, die Sie behalten, behält ihre eigenen Werte; bei jedem Feld, für das nur die entfernte Person einen Wert hatte, wird dieser Wert übertragen, damit nichts verloren geht.

## Verwandte Artikel {#related-articles}

- [Personen suchen](../people/searching-people.md) — erweiterte Suche, einschließlich der Kategorie Benutzerdefinierte Felder, und das Anzeigen benutzerdefinierter Felder als Spalten
- [Gespeicherte Listen](../people/lists.md) — eine Suche über benutzerdefinierte Felder speichern und live erneut ausführen
- [Rollen und Berechtigungen](./roles-permissions.md) — wer Felder definieren und Werte bearbeiten darf
- [Formulare erstellen](../forms/creating-forms.md) — für die Erfassung mehrerer Fragen, wenn ein vollständiges Formular besser passt als einzelne Felder
