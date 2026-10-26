---
title: "Anwesenheit erfassen"
---

# Anwesenheit erfassen

<div class="article-intro">

Sobald Ihre Standorte, Gottesdienstzeiten und Gruppen eingerichtet sind, können Sie die Anwesenheit nach jeder Versammlung manuell erfassen. B1 Admin organisiert die Anwesenheit nach **Sitzungen** -- eine Sitzung pro Gruppe und Treffen. Sie legen die Sitzung an, markieren, wer anwesend war, und die Daten fließen direkt in Ihre Anwesenheitsberichte ein.

</div>

<div class="prereqs">
<h4>Bevor Sie beginnen</h4>

- Ihre Standorte, Gottesdienstzeiten und Gruppen müssen konfiguriert sein. Siehe [Anwesenheits-Einrichtung](setup.md), falls Sie das noch nicht getan haben.
- Bei den Gruppen, die Sie erfassen möchten, muss **Anwesenheit erfassen** aktiviert sein. Siehe [Anwesenheits-Einrichtung](setup.md) für Details.
- Sie benötigen die Berechtigung **Anwesenheit bearbeiten**, um die Anwesenheit zu speichern. Ehrenamtliche, die für Personen nur **Nur Namen von Personen anzeigen** haben, können die Anwesenheit trotzdem auf diesem Weg erfassen -- sie öffnen Kurse über **Gruppen** und sehen Mitglieder nur mit Namen. Siehe [Personen nur mit Namen](../settings/roles-permissions.md#people-names-only).

</div>

## Eine Sitzung anlegen

Eine Sitzung steht für ein Vorkommen eines Gruppentreffens -- zum Beispiel Ihre Klasse für die 1. bis 3. Klasse an einem bestimmten Sonntag.

1. Öffnen Sie **B1 Admin**, öffnen Sie das [Sprungmenü](../introduction.md#getting-around-with-the-jump-menu) (die Suchleiste oben links), klappen Sie **Personen** auf und klicken Sie auf **Gruppen**.
2. Wählen Sie die Gruppe aus, für die Sie die Anwesenheit erfassen möchten.
3. Klicken Sie im Abschnitt **Sitzungen** auf der Seite der Gruppe auf **Alle Sitzungen**.
4. Klicken Sie auf **Neu**, um eine neue Sitzung anzulegen.
5. Wenn die Gruppe einer Gottesdienstzeit zugewiesen ist, wählen Sie die **Gottesdienstzeit** aus. Handelt es sich um eine ungeplante Gruppe, erscheint dieses Feld nicht.
6. Wählen Sie das **Sitzungsdatum** aus -- dies kann heute, ein vergangenes oder ein zukünftiges Datum sein.
7. Klicken Sie auf **Speichern**.

### Sitzungen für jede Klasse einer Gottesdienstzeit anlegen

Wenn andere Gruppen zur selben Gottesdienstzeit zusammenkommen (zum Beispiel alle Kinderklassen am Sonntag um 9:00 Uhr), können Sie deren Sitzungen in einem Schritt anlegen, statt jede Gruppe einzeln aufzurufen.

1. Gehen Sie wie oben beschrieben vor und wählen Sie eine **Gottesdienstzeit** aus.
2. Aktivieren Sie **Auch für die anderen _N_ Gruppen in _Gottesdienstzeit_ anlegen**. Das Kontrollkästchen zeigt, wie viele andere Gruppen dieser Gottesdienstzeit zugewiesen sind. Es erscheint nur beim Anlegen einer neuen Sitzung und wenn mindestens eine weitere Gruppe zu dieser Zeit zusammenkommt.
3. Klicken Sie auf **Speichern**.

Es wird eine Sitzung für die aktuelle Gruppe und für jede der anderen Gruppen mit demselben Datum und derselben Gottesdienstzeit angelegt. Gruppen, die für dieses Datum und diese Gottesdienstzeit bereits eine Sitzung haben, werden übersprungen, sodass keine Dubletten entstehen.

:::tip
Sie können Sitzungen für vergangene Daten anlegen, um noch nicht erfasste Anwesenheit nachzutragen, oder sie im Voraus anlegen, damit sie bereit sind, wenn sich Ihre Gruppe trifft.
:::

## Sitzungsnotizen {#session-notes}

Jede Sitzung kann Notizen enthalten -- eine Zusammenfassung dessen, was behandelt wurde, Ankündigungen oder Gebetsanliegen.

1. Wenn Sie eine Sitzung anlegen oder nachdem Sie in der Liste auf das Symbol **Bearbeiten** (Stift) neben einer Sitzung geklickt haben, tippen Sie in das Feld **Notizen (was behandelt wurde, Ankündigungen, Gebetsanliegen)** unterhalb des Datums. Die Werkzeugleiste ermöglicht Fettschrift, Listen und Links.
2. Klicken Sie auf **Speichern**.

Die Notizen erscheinen oben in der Anwesenheitsliste der Sitzung. Sie sind außerdem die Treffen-Notizen, die die Mitglieder der Gruppe im Abschnitt **Treffen** auf der Seite der Gruppe auf B1.church lesen. Dort können Gruppenleitende sie ebenfalls schreiben und bearbeiten. Siehe [Gruppendetails](../../b1-church/groups/group-details.md#meeting-notes-and-attendance).

## Anwesenheit markieren

Wählen Sie eine Sitzung aus, um ihre Anwesenheitsliste anzuzeigen. Jedes Gruppenmitglied wird mit einem Kontrollkästchen aufgeführt, nach Nachnamen sortiert, und wer bereits als anwesend erfasst ist, ist angekreuzt.

1. Setzen Sie das Häkchen bei jeder Person, die teilgenommen hat. Mit **Alle auswählen** oder **Keine auswählen** ändern Sie alle Einträge auf einmal.
2. Die Anzahl oberhalb der Liste (zum Beispiel "12 von 15 anwesend") wird aktualisiert, während Sie Kontrollkästchen markieren.
3. Klicken Sie auf **Anwesenheit speichern**. Erst beim Speichern wird etwas erfasst, und eine Meldung bestätigt, wenn der Vorgang abgeschlossen ist. Wenn Sie den Browser-Tab schließen oder neu laden, während noch gespeichert wird, warnt Ihr Browser Sie vorher, damit die Änderungen nicht verloren gehen.

Wenn Sie jemanden, der bereits als anwesend erfasst war, abwählen und anschließend speichern, wird diese Person aus der Sitzung entfernt.

### Gäste hinzufügen

Um jemanden zu erfassen, der nicht Mitglied der Gruppe ist, suchen Sie ihn in der Personensuche neben der Anwesenheitsliste. Falls die Person noch nicht in Ihrer Datenbank ist, können Sie sie direkt aus der Suche anlegen. In beiden Fällen wird sie bereits angekreuzt zur Liste hinzugefügt. Klicken Sie auf **Anwesenheit speichern**, um sie zu erfassen.

Personen, die sich an einem Kiosk eingecheckt haben, zeigen einen Chip **Ehrenamtlich** oder **Gast**. Personen, die keine Gruppenmitglieder sind, zeigen einen Chip **Gast**.

## Prüfen, welche Gruppen noch Anwesenheit benötigen

Wenn mehrere Klassen zur selben Gottesdienstzeit zusammenkommen, können Sie auf einen Blick sehen, für welche davon die Anwesenheit an diesem Datum noch eingetragen werden muss.

1. Öffnen Sie eine Sitzung, die eine Gottesdienstzeit hat.
2. Klicken Sie oben in der Anwesenheitsliste auf **Wer fehlt noch die Anwesenheit**.
3. Ein Dialog listet jede Gruppe auf, die dieser Gottesdienstzeit zugewiesen ist, mit einer Zusammenfassung wie "5 von 8 Gruppen erfasst" oben.

Gruppen, bei denen für dieses Datum niemand als anwesend markiert ist, zeigen den Chip **Nicht erfasst** und stehen zuerst in der Liste. Gruppen mit erfasster Anwesenheit zeigen **Erfasst** mit der Anzahl der als anwesend markierten Personen (zum Beispiel "Erfasst (12)"). Klicken Sie auf den Namen einer Gruppe, um deren Sitzungen zu öffnen, wobei die Sitzung für dasselbe Datum bereits ausgewählt ist, sodass Sie die Anwesenheit sofort erfassen können. Hat die Gruppe für dieses Datum noch keine Sitzung, öffnet sich ihre Sitzungsliste, damit Sie eine anlegen können.

:::tip
Kombinieren Sie dies mit **Alle Klassen drucken** und dem [Anlegen von Sitzungen für jede Klasse einer Gottesdienstzeit](#adding-sessions-for-every-class-in-a-service-time): Legen Sie die Sitzungen an, verteilen Sie die Anwesenheitslisten und nutzen Sie dann **Wer fehlt noch die Anwesenheit**, um zu sehen, welche Listen noch nicht eingetragen wurden.
:::

## Eine Anwesenheitsliste drucken

Eine Anwesenheitsliste ist eine druckbare Klassenliste, die Lehrende von Hand markieren und Ihnen später zur Erfassung zurückgeben können. Jede Liste zeigt das Logo Ihrer Kirche (das **Logo für helle Hintergründe** aus [Website > Erscheinungsbild](../website/appearance.md), falls Sie eines hochgeladen haben) mit dem Namen der Kirche darunter, die Klasse, eine große Zeile **Datum** unterhalb des Klassennamens und die Gottesdienstzeit. Mitglieder werden in zwei Spalten aufgeführt (von oben nach unten die linke Spalte, dann die rechte), damit mehr Namen auf eine Seite passen. Jedes Mitglied hat die Kästchen **Anwesend** und **Abwesend**. Es gibt freie Zeilen für Besucher und einen Bereich **Lehrende / Notizen**.

- **Aus einer Sitzung** -- Klicken Sie oben in der Anwesenheitsliste der Sitzung auf das Symbol **Anwesenheitsliste drucken** (Drucker). Die Liste trägt das Datum der Sitzung.
- **Alle Klassen eines Gottesdienstes** -- Hat die Sitzung eine Gottesdienstzeit, klicken Sie auf **Alle Klassen drucken**, um eine Liste pro Klasse zu drucken, die dieser Gottesdienstzeit zugewiesen ist. Jede Klasse wird auf einer eigenen Seite gedruckt.
- **Aus der Mitgliederliste** -- Klicken Sie auf der Seite der Gruppe auf **Alle Mitglieder** und dann oberhalb der Mitgliederliste auf das Symbol **Anwesenheitsliste drucken**. Wählen Sie **Anwesenheitsliste** aus, um eine undatierte Liste zu drucken. Im selben Menü gibt es das Layout **Kontaktliste** mit Telefon, E-Mail und Adresse jedes Mitglieds -- siehe [Mitgliederliste drucken](../groups/group-members.md#printing-the-member-list).

Die Liste öffnet sich in einem neuen Tab, und der Druckdialog Ihres Browsers erscheint automatisch.

## Anwesenheit in eine Tabelle exportieren

Sie können einen Datensatz der Sitzung als CSV-Datei herunterladen, um ihn in Excel, Numbers oder Google Tabellen zu verwenden.

1. Öffnen Sie die Sitzung, die Sie exportieren möchten.
2. Klicken Sie oberhalb der Anwesenheitsliste auf die Schaltfläche **Exportieren**.
3. Öffnen Sie die heruntergeladene Datei in Ihrer Tabellenkalkulation.

## Erfasste Anwesenheit ansehen

Nach dem Erfassen der Sitzungen erscheinen die Daten in Ihren Anwesenheitsberichten.

- **Registerkarte Anwesenheitstrend** (unter **Alle Jahre** auf der Seite Anwesenheit) -- zeigt Trends der gesamten Kirche über die Zeit. Siehe [Anwesenheit nachverfolgen](tracking-attendance.md).
- **Registerkarte Gruppenanwesenheit** -- zeigt die Anwesenheit aufgeschlüsselt nach einzelnen Gruppen. Siehe [Anwesenheitsberichte](../reports/attendance-reports.md#group-attendance).

:::tip
Wenn eine gerade angelegte Sitzung nicht sofort in den Berichten erscheint, prüfen Sie, ob das Sitzungsdatum im Datumsbereich liegt, der in den Berichtsfiltern ausgewählt ist.
:::
