---
title: "Anwesenheit erfassen"
---

# Anwesenheit erfassen

<div class="article-intro">

Sobald Ihre Campusse, Gottesdienstzeiten und Gruppen eingerichtet sind, können Sie die Anwesenheit nach jeder Zusammenkunft manuell erfassen. B1 Admin organisiert die Anwesenheit nach **Sitzungen** — eine Sitzung pro Gruppe und Versammlungsdatum. Sie legen die Sitzung an, markieren, wer anwesend war, und die Daten fließen direkt in Ihre Anwesenheitsberichte ein.

</div>

<div class="prereqs">
<h4>Bevor Sie beginnen</h4>

- Ihre Campusse, Gottesdienstzeiten und Gruppen müssen konfiguriert sein. Siehe [Einrichtung der Anwesenheit](setup.md), falls Sie dies noch nicht getan haben.
- Bei den Gruppen, die Sie erfassen möchten, muss **Anwesenheit verfolgen** aktiviert sein. Details finden Sie unter [Einrichtung der Anwesenheit](setup.md).

</div>

## Eine Sitzung anlegen

Eine Sitzung steht für eine Durchführung eines Gruppentreffens — zum Beispiel Ihre Klasse für die Klassen K bis 3 an einem bestimmten Sonntag.

1. Öffnen Sie **B1 Admin**, öffnen Sie das [Sprungmenü](../introduction.md#getting-around-with-the-jump-menu) (das Suchfeld oben links), klappen Sie **Personen** auf und klicken Sie auf **Gruppen**.
2. Wählen Sie die Gruppe aus, für die Sie die Anwesenheit erfassen möchten.
3. Klicken Sie im Abschnitt **Sitzungen** auf der Seite der Gruppe auf **Alle Sitzungen**.
4. Klicken Sie auf **Neu**, um eine neue Sitzung anzulegen.
5. Wenn die Gruppe einer Gottesdienstzeit zugeordnet ist, wählen Sie die **Gottesdienstzeit**. Handelt es sich um eine nicht geplante Gruppe, erscheint dieses Feld nicht.
6. Wählen Sie das **Sitzungsdatum** — dies kann heute, ein vergangenes oder ein zukünftiges Datum sein.
7. Klicken Sie auf **Speichern**.

### Sitzungen für jede Klasse einer Gottesdienstzeit anlegen {#adding-sessions-for-every-class-in-a-service-time}

Wenn andere Gruppen zur selben Gottesdienstzeit zusammenkommen (zum Beispiel alle Kinderklassen am Sonntag um 9:00 Uhr), können Sie deren Sitzungen in einem Schritt anlegen, statt jede Gruppe einzeln aufzurufen.

1. Gehen Sie wie oben beschrieben vor und wählen Sie eine **Gottesdienstzeit**.
2. Aktivieren Sie **Auch für die anderen _N_ Gruppen in _Gottesdienstzeit_ anlegen**. Das Kontrollkästchen zeigt an, wie viele andere Gruppen dieser Gottesdienstzeit zugeordnet sind. Es erscheint nur beim Anlegen einer neuen Sitzung und wenn sich mindestens eine weitere Gruppe zu dieser Zeit trifft.
3. Klicken Sie auf **Speichern**.

Für die aktuelle Gruppe und für jede der anderen Gruppen zur selben Gottesdienstzeit und am selben Datum wird eine Sitzung angelegt. Gruppen, die für dieses Datum und diese Gottesdienstzeit bereits eine Sitzung haben, werden übersprungen, sodass keine Dubletten entstehen.

:::tip
Sie können Sitzungen für vergangene Termine anlegen, um Anwesenheiten nachzutragen, die Sie noch nicht erfasst haben, oder sie im Voraus anlegen, damit sie bereit sind, wenn sich Ihre Gruppe trifft.
:::

## Sitzungsnotizen {#session-notes}

Jede Sitzung kann Notizen enthalten — eine Zusammenfassung des Behandelten, Ankündigungen oder Gebetsanliegen.

1. Geben Sie beim Anlegen einer Sitzung oder nach einem Klick auf das Symbol **Bearbeiten** (Stift) neben einer Sitzung in der Liste in das Feld **Notizen (Behandeltes, Ankündigungen, Gebetsanliegen)** unterhalb des Datums ein. Die Werkzeugleiste ermöglicht fettgedrucken Text, Listen und Links.
2. Klicken Sie auf **Speichern**.

Die Notizen erscheinen oben in der Anwesenheitsliste der Sitzung. Sie sind außerdem die Treffen-Notizen, die die Mitglieder der Gruppe im Abschnitt **Treffen** auf der Seite der Gruppe in B1.church lesen; dort können Gruppenleiter sie ebenfalls schreiben und bearbeiten. Siehe [Gruppendetails](../../b1-church/groups/group-details.md#meeting-notes-and-attendance).

## Anwesenheit markieren

Wählen Sie eine Sitzung aus, um deren Anwesenheitsliste zu sehen. Jedes Gruppenmitglied wird mit einem Kontrollkästchen aufgeführt, nach Nachnamen sortiert; wer bereits als anwesend erfasst ist, ist angehakt.

1. Aktivieren Sie das Kontrollkästchen neben jeder Person, die teilgenommen hat. Mit **Alle auswählen** oder **Keine auswählen** ändern Sie alle Einträge auf einmal.
2. Die Anzahl oberhalb der Liste (zum Beispiel „12 von 15 anwesend“) aktualisiert sich, während Sie Kästchen ankreuzen.
3. Klicken Sie auf **Anwesenheit speichern**. Bis Sie speichern, wird nichts erfasst; eine Meldung bestätigt, wenn der Speichervorgang abgeschlossen ist.

Wenn Sie eine Person, die bereits als anwesend erfasst war, abwählen und speichern, wird sie aus der Sitzung entfernt.

### Gäste hinzufügen

Um jemanden zu erfassen, der nicht Mitglied der Gruppe ist, suchen Sie ihn in der Personensuche neben der Anwesenheitsliste. Falls die Person noch nicht in Ihrer Datenbank steht, können Sie sie direkt aus der Suche heraus anlegen. In beiden Fällen wird sie bereits angehakt in die Liste aufgenommen. Klicken Sie auf **Anwesenheit speichern**, um sie zu erfassen.

Personen, die sich an einem Kiosk eingecheckt haben, zeigen ein Etikett **Ehrenamtlich** oder **Gast**. Personen, die keine Gruppenmitglieder sind, zeigen ein Etikett **Gast**.

## Prüfen, welche Gruppen noch eine Anwesenheit benötigen

Wenn mehrere Klassen zur selben Gottesdienstzeit zusammenkommen, sehen Sie auf einen Blick, bei welchen für dieses Datum die Anwesenheit noch eingetragen werden muss.

1. Öffnen Sie eine Sitzung mit einer Gottesdienstzeit.
2. Klicken Sie oben in der Anwesenheitsliste auf **Wer benötigt noch Anwesenheit**.
3. Ein Dialog listet jede Gruppe auf, die dieser Gottesdienstzeit zugeordnet ist, oben mit einer Zusammenfassung wie „5 von 8 Gruppen erfasst“.

Gruppen, bei denen für dieses Datum niemand als anwesend markiert wurde, zeigen ein Etikett **Nicht erfasst** und stehen zuerst. Gruppen mit erfasster Anwesenheit zeigen **Erfasst** mit der Anzahl der als anwesend markierten Personen (zum Beispiel „Entered (12)“). Klicken Sie auf den Namen einer Gruppe, um deren Sitzungen zu öffnen, wobei die Sitzung für dasselbe Datum bereits ausgewählt ist, sodass Sie deren Anwesenheit sofort erfassen können. Hat die Gruppe für dieses Datum noch keine Sitzung, öffnet sich ihre Sitzungsliste, damit Sie eine anlegen können.

:::tip
Kombinieren Sie dies mit **Alle Klassen drucken** und [dem Anlegen von Sitzungen für jede Klasse einer Gottesdienstzeit](#adding-sessions-for-every-class-in-a-service-time): Legen Sie die Sitzungen an, verteilen Sie die Anwesenheitslisten und nutzen Sie dann **Wer benötigt noch Anwesenheit**, um zu sehen, welche Listen noch nicht eingetragen wurden.
:::

## Eine Anwesenheitsliste drucken {#printing-a-roll-sheet}

Eine Anwesenheitsliste ist eine druckbare Klassenliste, die Lehrkräfte von Hand abhaken und Ihnen später zur Erfassung zurückgeben können. Jede Liste zeigt das Logo Ihrer Kirche (das **Logo für helle Hintergründe** aus [Website > Appearance](../website/appearance.md), sofern Sie eines hochgeladen haben) mit dem Kirchennamen darunter, die Klasse, eine große Zeile **Datum** unter dem Klassennamen und die Gottesdienstzeit. Mitglieder stehen in zwei Spalten (zuerst die linke Spalte von oben nach unten, dann die rechte), damit mehr Namen auf eine Seite passen, und jedes Mitglied hat die Kästchen **Anwesend** und **Abwesend**. Es gibt freie Zeilen für Gäste und einen Bereich **Lehrkraft / Notizen**.

- **Aus einer Sitzung** — Klicken Sie oben in der Anwesenheitsliste der Sitzung auf das Symbol **Anwesenheitsliste drucken** (Drucker). Die Liste trägt das Datum der Sitzung.
- **Alle Klassen eines Gottesdienstes** — Hat die Sitzung eine Gottesdienstzeit, klicken Sie auf **Alle Klassen drucken**, um für jede dieser Gottesdienstzeit zugeordnete Klasse eine Liste zu drucken. Jede Klasse wird auf einer eigenen Seite gedruckt.
- **Aus der Mitgliederliste** — Klicken Sie auf der Seite der Gruppe auf **Alle Mitglieder**, dann auf das Symbol **Anwesenheitsliste drucken** über der Mitgliederliste und wählen Sie **Anwesenheitsblatt**, um eine undatierte Liste zu drucken. Im selben Menü gibt es ein Layout **Kontaktliste** mit Telefon, E-Mail und Adresse jedes Mitglieds — siehe [Mitgliederliste drucken](../groups/group-members.md#printing-the-member-list).

Die Liste öffnet sich in einem neuen Tab, und der Druckdialog Ihres Browsers erscheint automatisch.

## Anwesenheit in eine Tabelle exportieren

Sie können eine Aufstellung der Sitzung als CSV-Datei herunterladen, um sie in Excel, Numbers oder Google Sheets zu verwenden.

1. Öffnen Sie die Sitzung, die Sie exportieren möchten.
2. Klicken Sie oben in der Anwesenheitsliste auf die Schaltfläche **Exportieren**.
3. Öffnen Sie die heruntergeladene Datei in Ihrer Tabellenkalkulation.

## Erfasste Anwesenheit anzeigen

Nach dem Erfassen der Sitzungen erscheinen die Daten in Ihren Anwesenheitsberichten.

- **Registerkarte Anwesenheitstrend** (unter **Alle Jahre** auf der Seite Attendance) — zeigt kirchenweite Trends im Zeitverlauf. Siehe [Anwesenheit nachverfolgen](tracking-attendance.md).
- **Registerkarte Gruppenanwesenheit** — zeigt die Anwesenheit aufgeschlüsselt nach einzelnen Gruppen. Siehe [Anwesenheitsberichte](../reports/attendance-reports.md#group-attendance).

:::tip
Wenn eine gerade angelegte Sitzung nicht sofort in den Berichten erscheint, prüfen Sie, ob das Sitzungsdatum innerhalb des in den Berichtsfiltern gewählten Zeitraums liegt.
:::
