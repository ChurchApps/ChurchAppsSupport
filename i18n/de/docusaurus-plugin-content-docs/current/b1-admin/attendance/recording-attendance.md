---
title: "Anwesenheit erfassen"
---

# Anwesenheit erfassen

<div class="article-intro">

Sobald Ihre Standorte, Gottesdienstzeiten und Gruppen eingerichtet sind, können Sie die Anwesenheit nach jeder Zusammenkunft manuell erfassen. B1 Admin organisiert die Anwesenheit nach **Sitzungen** -- eine Sitzung pro Gruppe und Treffen. Sie legen die Sitzung an, markieren, wer anwesend war, und die Daten fließen direkt in Ihre Anwesenheitsberichte ein.

</div>

## Schulungsvideo

<YouTube id="gS8h2rhyMys" title="Anwesenheit in B1 erfassen und nachverfolgen" />

<div class="prereqs">
<h4>Bevor Sie beginnen</h4>

- Ihre Standorte, Gottesdienstzeiten und Gruppen müssen konfiguriert sein. Siehe [Anwesenheits-Einrichtung](setup.md), falls Sie das noch nicht getan haben.
- Die Gruppen, die Sie erfassen möchten, müssen **Anwesenheit erfassen** aktiviert haben. Siehe [Anwesenheits-Einrichtung](setup.md) für Details.
- Sie benötigen die Berechtigung **Anwesenheit bearbeiten**, um die Anwesenheit zu speichern. Ehrenamtliche, die für Personen nur **Nur Namen von Personen anzeigen** haben, können die Anwesenheit trotzdem auf diese Weise erfassen -- sie öffnen Kurse über **Gruppen** und sehen Mitglieder nur mit Namen. Siehe [Nur Namen von Personen](../settings/roles-permissions.md#people-names-only).

</div>

## Eine Sitzung anlegen

Eine Sitzung stellt eine einzelne Durchführung eines Gruppentreffens dar -- zum Beispiel Ihren Kinderkreis Klasse K bis 3 an einem bestimmten Sonntag.

1. Öffnen Sie **B1 Admin**, öffnen Sie das [Sprungmenü](../introduction.md#getting-around-with-the-jump-menu) (die Suchleiste oben links), klappen Sie **Personen** auf und klicken Sie auf **Gruppen**.
2. Wählen Sie die Gruppe aus, für die Sie die Anwesenheit erfassen möchten.
3. Klicken Sie im Abschnitt **Sitzungen** auf der Seite der Gruppe auf **Alle Sitzungen**.
4. Klicken Sie auf **Neu**, um eine neue Sitzung anzulegen.
5. Wenn die Gruppe einer Gottesdienstzeit zugewiesen ist, wählen Sie die **Gottesdienstzeit**. Handelt es sich um eine ungeplante Gruppe, erscheint dieses Feld nicht.
6. Wählen Sie das **Sitzungsdatum** -- dies kann heute, ein vergangenes oder ein zukünftiges Datum sein.
7. Klicken Sie auf **Speichern**.

### Sitzungen für jeden Kurs einer Gottesdienstzeit anlegen

Wenn andere Gruppen zur selben Gottesdienstzeit zusammenkommen (zum Beispiel alle Kinderkurse am Sonntag um 9:00 Uhr), können Sie deren Sitzungen in einem Schritt anlegen, statt jede Gruppe einzeln aufzurufen.

1. Gehen Sie wie oben beschrieben vor und wählen Sie eine **Gottesdienstzeit**.
2. Aktivieren Sie **Auch für die anderen _N_ Gruppen bei _Gottesdienstzeit_ hinzufügen**. Das Kontrollkästchen zeigt, wie viele weitere Gruppen dieser Gottesdienstzeit zugewiesen sind. Es erscheint nur beim Anlegen einer neuen Sitzung und wenn mindestens eine weitere Gruppe zu dieser Zeit zusammenkommt.
3. Klicken Sie auf **Speichern**.

Für die aktuelle Gruppe und für jede der anderen Gruppen zur selben Gottesdienstzeit und am selben Datum wird eine Sitzung angelegt. Gruppen, die für dieses Datum und diese Gottesdienstzeit bereits eine Sitzung haben, werden übersprungen, sodass keine Duplikate entstehen.

:::tip
Sie können Sitzungen für vergangene Daten anlegen, um nachträglich Anwesenheit zu erfassen, die Sie noch nicht festgehalten haben, oder sie im Voraus anlegen, damit sie bereit sind, wenn sich Ihre Gruppe trifft.
:::

## Sitzungsnotizen {#session-notes}

Jede Sitzung kann Notizen enthalten -- eine Zusammenfassung des Behandelten, Ankündigungen oder Gebetsanliegen.

1. Geben Sie beim Anlegen einer Sitzung oder nach einem Klick auf das Symbol **Bearbeiten** (Stift) neben einer Sitzung in der Liste im Feld **Notizen (Behandeltes, Ankündigungen, Gebetsanliegen)** unter dem Datum etwas ein. Die Werkzeugleiste ermöglicht fett formatierten Text, Listen und Links.
2. Klicken Sie auf **Speichern**.

Die Notizen erscheinen oben in der Anwesenheitsliste der Sitzung. Sie sind außerdem die Treffen-Notizen, die die Mitglieder der Gruppe im Abschnitt **Treffen** auf der Seite der Gruppe auf B1.church lesen. Dort können Gruppenleitungen sie ebenfalls schreiben und bearbeiten. Siehe [Gruppendetails](../../b1-church/groups/group-details.md#meeting-notes-and-attendance).

## Anwesenheit markieren

Wählen Sie eine Sitzung aus, um ihre Anwesenheitsliste zu sehen. Jedes Gruppenmitglied wird mit einem Kontrollkästchen aufgeführt, nach Nachnamen sortiert, und wer bereits als anwesend erfasst ist, ist markiert.

1. Aktivieren Sie das Kontrollkästchen neben jeder Person, die anwesend war. Mit **Alle auswählen** oder **Keine auswählen** ändern Sie alle Einträge auf einmal.
2. Die Anzahl über der Liste (zum Beispiel "12 von 15 anwesend") aktualisiert sich, während Sie Kontrollkästchen aktivieren.
3. Klicken Sie auf **Anwesenheit speichern**. Erst mit dem Speichern wird etwas erfasst, und eine Meldung bestätigt, wenn der Vorgang abgeschlossen ist. Versuchen Sie, den Browser-Tab zu schließen oder neu zu laden, während noch gespeichert wird, warnt Ihr Browser Sie vorher, damit die Änderungen nicht verloren gehen.

Wenn Sie jemanden, der bereits als anwesend erfasst war, abwählen und speichern, wird diese Person aus der Sitzung entfernt.

### Gäste hinzufügen

Um jemanden zu erfassen, der nicht Mitglied der Gruppe ist, suchen Sie ihn in der Personensuche neben der Anwesenheitsliste. Falls die Person noch nicht in Ihrer Datenbank ist, können Sie sie direkt aus der Suche anlegen. In beiden Fällen wird sie bereits angekreuzt in die Liste aufgenommen. Klicken Sie auf **Anwesenheit speichern**, um sie zu erfassen.

Personen, die sich an einem Kiosk eingecheckt haben, zeigen einen Kennzeichnungs-Chip **Ehrenamtlich** oder **Gast** an. Personen, die keine Gruppenmitglieder sind, zeigen einen Chip **Gast**.

## Prüfen, welche Gruppen noch Anwesenheit benötigen

Wenn mehrere Kurse zur selben Gottesdienstzeit stattfinden, können Sie auf einen Blick sehen, für welche noch die Anwesenheit für dieses Datum eingetragen werden muss.

1. Öffnen Sie eine Sitzung, die eine Gottesdienstzeit hat.
2. Klicken Sie oben in der Anwesenheitsliste auf **Wer fehlt noch die Anwesenheit**.
3. Ein Dialog listet jede Gruppe auf, die dieser Gottesdienstzeit zugewiesen ist, oben mit einer Zusammenfassung wie "5 von 8 Gruppen erfasst".

Gruppen, bei denen für dieses Datum niemand als anwesend markiert ist, zeigen einen Chip **Nicht erfasst** und stehen zuerst. Gruppen mit erfasster Anwesenheit zeigen **Erfasst** mit der Anzahl der als anwesend markierten Personen (zum Beispiel "Erfasst (12)"). Klicken Sie auf den Namen einer Gruppe, um deren Sitzungen mit der Sitzung für dasselbe Datum bereits ausgewählt zu öffnen, damit Sie deren Anwesenheit sofort erfassen können. Hat die Gruppe für dieses Datum noch keine Sitzung, öffnet sich ihre Sitzungsliste, damit Sie eine anlegen können.

:::tip
Kombinieren Sie dies mit **Alle Kurse drucken** und [Sitzungen für jeden Kurs einer Gottesdienstzeit anlegen](#adding-sessions-for-every-class-in-a-service-time): Legen Sie die Sitzungen an, verteilen Sie die Anwesenheitsbögen und prüfen Sie dann mit **Wer fehlt noch die Anwesenheit**, welche Bögen noch nicht eingetragen wurden.
:::

## Einen Anwesenheitsbogen drucken

Ein Anwesenheitsbogen ist eine druckbare Kursliste, die Lehrkräfte von Hand markieren und Ihnen später zur Erfassung zurückgeben können. Jeder Bogen zeigt das Logo Ihrer Kirche (das **Logo für helle Hintergründe** aus [Website > Erscheinungsbild](../website/appearance.md), falls Sie eines hochgeladen haben) mit dem Kirchennamen darunter, den Kurs, eine große Zeile **Datum** unter dem Kursnamen und die Gottesdienstzeit. Die Mitglieder stehen in zwei Spalten (zuerst die linke Spalte von oben nach unten, dann die rechte), damit mehr Namen auf eine Seite passen. Jedes Mitglied hat die Kästchen **Anwesend** und **Abwesend**. Es gibt freie Zeilen für Gäste und einen Bereich **Lehrkraft / Notizen**.

- **Aus einer Sitzung** -- Klicken Sie oben in der Anwesenheitsliste der Sitzung auf das Symbol **Anwesenheitsbogen drucken** (Drucker). Der Bogen trägt das Datum der Sitzung und zeigt deren Gottesdienstzeit.
- **Alle Kurse eines Gottesdienstes** -- Hat die Sitzung eine Gottesdienstzeit, klicken Sie auf **Alle Kurse drucken**, um einen Bogen für jeden Kurs dieser Gottesdienstzeit zu drucken. Jeder Kurs wird auf einer eigenen Seite gedruckt.
- **Aus der Mitgliederliste** -- Klicken Sie auf der Seite der Gruppe auf **Alle Mitglieder**, dann auf das Symbol **Anwesenheitsbogen drucken** über der Mitgliederliste und wählen Sie **Anwesenheitsbogen**, um einen undatierten Bogen zu drucken. Im selben Menü gibt es das Layout **Kontaktliste** mit Telefon, E-Mail und Adresse jedes Mitglieds -- siehe [Mitgliederliste drucken](../groups/group-members.md#printing-the-member-list).

Der Bogen öffnet sich in einem neuen Tab, und der Druckdialog Ihres Browsers erscheint automatisch.

## Anwesenheit in eine Tabelle exportieren

Sie können eine Aufzeichnung der Sitzung als CSV-Datei herunterladen, um sie in Excel, Numbers oder Google Tabellen zu verwenden.

1. Öffnen Sie die Sitzung, die Sie exportieren möchten.
2. Klicken Sie oben in der Anwesenheitsliste auf die Schaltfläche **Exportieren**.
3. Öffnen Sie die heruntergeladene Datei in Ihrem Tabellenkalkulationsprogramm.

## Erfasste Anwesenheit anzeigen

Nach dem Erfassen von Sitzungen erscheinen die Daten in Ihren Anwesenheitsberichten.

- **Registerkarte Anwesenheitstrend** (unter **Alle Jahre** auf der Seite Anwesenheit) -- zeigt kirchenweite Trends im Zeitverlauf. Siehe [Anwesenheit nachverfolgen](tracking-attendance.md).
- **Registerkarte Gruppenanwesenheit** -- zeigt die Anwesenheit aufgeschlüsselt nach einzelnen Gruppen. Siehe [Anwesenheitsberichte](../reports/attendance-reports.md#group-attendance).

:::tip
Falls eine gerade angelegte Sitzung nicht sofort in den Berichten erscheint, prüfen Sie, ob das Sitzungsdatum im Datumsbereich liegt, der in den Berichtsfiltern ausgewählt ist.
:::
