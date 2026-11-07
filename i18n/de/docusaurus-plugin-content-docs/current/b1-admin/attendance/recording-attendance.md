---
title: "Anwesenheit erfassen"
description: "Erfassen Sie in B1 Admin die Anwesenheit für jedes Gruppentreffen: Sitzung anlegen, Teilnehmende markieren, Notizen speichern und Anwesenheitslisten drucken oder als Tabelle exportieren."
---

# Anwesenheit erfassen

<div class="article-intro">

Sobald Ihre Standorte, Gottesdienstzeiten und Gruppen eingerichtet sind, können Sie die Anwesenheit nach jeder Zusammenkunft manuell erfassen. B1 Admin organisiert die Anwesenheit nach **Sitzungen** – eine Sitzung pro Gruppe und Versammlungstermin. Sie legen die Sitzung an, markieren, wer anwesend war, und die Daten fließen direkt in Ihre Anwesenheitsberichte ein.

</div>

## Schulungsvideo

<YouTube id="gS8h2rhyMys" title="Anwesenheit in B1 erfassen und auswerten" next="Gottesdienste planen und Ehrenamtliche einteilen in B1" nextUrl="/docs/b1-admin/serving/plans" />

<div class="prereqs">
<h4>Bevor Sie beginnen</h4>

- Ihre Standorte, Gottesdienstzeiten und Gruppen müssen konfiguriert sein. Siehe [Anwesenheits-Einrichtung](setup.md), falls Sie das noch nicht getan haben.
- Die Gruppen, deren Anwesenheit Sie erfassen möchten, müssen **Anwesenheit erfassen** aktiviert haben. Details finden Sie unter [Anwesenheits-Einrichtung](setup.md).
- Zum Speichern der Anwesenheit benötigen Sie die Berechtigung **Anwesenheit bearbeiten**. Ehrenamtliche, die für Personen nur **Nur Namen von Personen anzeigen** haben, können die Anwesenheit trotzdem auf diesem Weg erfassen – sie öffnen Kurse unter **Gruppen** und sehen Mitglieder nur mit Namen. Siehe [Nur Namen von Personen](../settings/roles-permissions.md#people-names-only).

</div>

## Eine Sitzung anlegen

Eine Sitzung steht für ein einzelnes Treffen einer Gruppe – zum Beispiel Ihre Klasse für die Klassenstufen K bis 3 an einem bestimmten Sonntag.

1. Öffnen Sie **B1 Admin**, öffnen Sie das [Sprungmenü](../introduction.md#getting-around-with-the-jump-menu) (das Suchfeld oben links), klappen Sie **Personen** auf und klicken Sie auf **Gruppen**.
2. Wählen Sie die Gruppe aus, für die Sie die Anwesenheit erfassen möchten.
3. Klicken Sie im Abschnitt **Sitzungen** auf der Seite der Gruppe auf **Alle Sitzungen**.
4. Klicken Sie auf **Neu**, um eine neue Sitzung anzulegen.
5. Wenn der Gruppe eine Gottesdienstzeit zugewiesen ist, wählen Sie die **Gottesdienstzeit** aus. Handelt es sich um eine ungeplante Gruppe, erscheint dieses Feld nicht.
6. Wählen Sie das **Sitzungsdatum** – das kann heute, ein vergangenes oder ein zukünftiges Datum sein.
7. Klicken Sie auf **Speichern**.

### Sitzungen für jede Klasse einer Gottesdienstzeit anlegen {#adding-sessions-for-every-class-in-a-service-time}

Wenn andere Gruppen zur selben Gottesdienstzeit zusammenkommen (zum Beispiel alle Kinderklassen am Sonntag um 9:00 Uhr), können Sie deren Sitzungen in einem Schritt anlegen, statt jede Gruppe einzeln aufzurufen.

1. Gehen Sie wie oben beschrieben vor und wählen Sie eine **Gottesdienstzeit**.
2. Aktivieren Sie **Auch für die anderen _N_ Gruppen in _Gottesdienstzeit_ anlegen**. Das Kontrollkästchen zeigt an, wie viele andere Gruppen dieser Gottesdienstzeit zugewiesen sind. Es erscheint nur beim Anlegen einer neuen Sitzung und wenn mindestens eine weitere Gruppe zu dieser Zeit zusammenkommt.
3. Klicken Sie auf **Speichern**.

Es wird eine Sitzung für die aktuelle Gruppe und für jede der anderen Gruppen am selben Datum und zur selben Gottesdienstzeit angelegt. Gruppen, die für dieses Datum und diese Gottesdienstzeit bereits eine Sitzung haben, werden übersprungen, sodass keine Doppelungen entstehen.

:::tip
Sie können Sitzungen für vergangene Daten anlegen, um noch nicht erfasste Anwesenheiten nachzutragen, oder sie im Voraus anlegen, damit sie bereit sind, wenn sich Ihre Gruppe trifft.
:::

## Sitzungsnotizen {#session-notes}

Jede Sitzung kann Notizen enthalten – eine Zusammenfassung dessen, was behandelt wurde, Ankündigungen oder Gebetsanliegen.

1. Wenn Sie eine Sitzung anlegen oder nach dem Klick auf das Symbol **Bearbeiten** (Stift) neben einer Sitzung in der Liste, geben Sie im Feld **Notizen (was behandelt wurde, Ankündigungen, Gebetsanliegen)** unter dem Datum Text ein. Die Werkzeugleiste ermöglicht fett formatierten Text, Listen und Links.
2. Klicken Sie auf **Speichern**.

Die Notizen erscheinen oben in der Anwesenheitsliste der Sitzung. Sie sind außerdem die Treffen-Notizen, die die Mitglieder der Gruppe im Abschnitt **Treffen** auf der Seite der Gruppe auf B1.church lesen; dort können auch Gruppenleitende sie schreiben und bearbeiten. Siehe [Gruppendetails](../../b1-church/groups/group-details.md#meeting-notes-and-attendance).

## Anwesenheit markieren

Wählen Sie eine Sitzung aus, um deren Anwesenheitsliste zu sehen. Jedes Gruppenmitglied wird mit einem Kontrollkästchen aufgeführt, nach Nachnamen sortiert, und wer bereits als anwesend erfasst ist, ist angehakt.

1. Aktivieren Sie das Kontrollkästchen neben jeder Person, die anwesend war. Mit **Alle auswählen** oder **Keine auswählen** ändern Sie alle Einträge auf einmal.
2. Die Anzahl über der Liste (zum Beispiel „12 von 15 anwesend“) aktualisiert sich, während Sie Kästchen anklicken.
3. Klicken Sie auf **Anwesenheit speichern**. Erst beim Speichern wird etwas erfasst, und eine Meldung bestätigt, wenn das Speichern abgeschlossen ist. Wenn Sie den Browser-Tab schließen oder neu laden, während noch gespeichert wird, warnt Ihr Browser Sie vorher, damit die Änderungen nicht verloren gehen.

Wenn Sie jemanden, der bereits als anwesend erfasst war, abwählen und speichern, wird diese Person aus der Sitzung entfernt.

### Gäste hinzufügen

Um eine Person zu erfassen, die nicht Mitglied der Gruppe ist, suchen Sie sie über die Personensuche neben der Anwesenheitsliste. Ist sie noch nicht in Ihrer Datenbank, können Sie sie direkt aus der Suche anlegen. In beiden Fällen wird sie bereits angehakt in die Liste aufgenommen. Klicken Sie auf **Anwesenheit speichern**, um sie zu erfassen.

Personen, die sich am Kiosk eingecheckt haben, zeigen einen Chip **Ehrenamtlich** oder **Gast**. Personen, die keine Gruppenmitglieder sind, zeigen einen Chip **Gast**.

## Prüfen, welche Gruppen noch eine Anwesenheit benötigen

Wenn mehrere Klassen zur selben Gottesdienstzeit zusammenkommen, sehen Sie auf einen Blick, bei welchen für dieses Datum die Anwesenheit noch fehlt.

1. Öffnen Sie eine Sitzung, die eine Gottesdienstzeit hat.
2. Klicken Sie oben in der Anwesenheitsliste auf **Wer braucht noch eine Anwesenheit**.
3. Ein Dialog listet jede Gruppe auf, die dieser Gottesdienstzeit zugewiesen ist, mit einer Zusammenfassung wie „5 von 8 Gruppen erfasst“ oben.

Gruppen, bei denen für dieses Datum niemand als anwesend markiert ist, zeigen einen Chip **Nicht erfasst** und werden zuerst aufgeführt. Gruppen mit erfasster Anwesenheit zeigen **Erfasst** mit der Anzahl der als anwesend markierten Personen (zum Beispiel „Erfasst (12)“). Klicken Sie auf den Namen einer Gruppe, um deren Sitzungen mit der Sitzung für dasselbe Datum bereits ausgewählt zu öffnen, und erfassen Sie deren Anwesenheit direkt. Hat die Gruppe für dieses Datum noch keine Sitzung, öffnet sich ihre Sitzungsliste, damit Sie eine anlegen können.

:::tip
Kombinieren Sie dies mit **Alle Klassen drucken** und [dem Anlegen von Sitzungen für jede Klasse einer Gottesdienstzeit](#adding-sessions-for-every-class-in-a-service-time): Legen Sie die Sitzungen an, verteilen Sie die Anwesenheitslisten und verwenden Sie dann **Wer braucht noch eine Anwesenheit**, um zu sehen, welche Listen noch nicht eingetragen wurden.
:::

## Eine Anwesenheitsliste drucken {#printing-a-roll-sheet}

Eine Anwesenheitsliste ist eine druckbare Klassenliste, die Lehrkräfte von Hand markieren und Ihnen zurückgeben können, damit Sie sie später erfassen. Jede Liste zeigt das Logo Ihrer Kirche (das **Logo für helle Hintergründe** aus [Website > Erscheinungsbild](../website/appearance.md), falls Sie eines hochgeladen haben) mit dem Kirchennamen darunter, die Klasse, eine große Zeile **Datum** unter dem Klassennamen und die Gottesdienstzeit. Die Mitglieder stehen in zwei Spalten (erst die linke Spalte von oben nach unten, dann die rechte), damit mehr Namen auf eine Seite passen, und jedes Mitglied hat die Kästchen **Anwesend** und **Abwesend**. Es gibt leere Zeilen für Besucher und einen Bereich **Lehrkraft / Notizen**.

- **Aus einer Sitzung** – Klicken Sie oben in der Anwesenheitsliste der Sitzung auf das Symbol **Anwesenheitsliste drucken** (Drucker). Die Liste trägt das Datum der Sitzung und zeigt die Gottesdienstzeit dieser Sitzung.
- **Alle Klassen eines Gottesdienstes** – Hat die Sitzung eine Gottesdienstzeit, klicken Sie auf **Alle Klassen drucken**, um eine Liste pro Klasse dieser Gottesdienstzeit zu drucken. Jede Klasse wird auf einer eigenen Seite gedruckt.
- **Aus der Mitgliederliste** – Klicken Sie auf der Seite der Gruppe auf **Alle Mitglieder** und dann auf das Symbol **Anwesenheitsliste drucken** oberhalb der Mitgliederliste. Wählen Sie **Anwesenheitsliste**, um eine undatierte Liste zu drucken. Im selben Menü gibt es das Layout **Kontaktliste** mit Telefon, E-Mail und Adresse jedes Mitglieds – siehe [Mitgliederliste drucken](../groups/group-members.md#printing-the-member-list).

Die Liste öffnet sich in einem neuen Tab, und der Druckdialog Ihres Browsers erscheint automatisch.

## Anwesenheit in eine Tabelle exportieren

Sie können einen Datensatz der Sitzung als CSV-Datei herunterladen, um sie in Excel, Numbers oder Google Tabellen zu verwenden.

1. Öffnen Sie die Sitzung, die Sie exportieren möchten.
2. Klicken Sie oben in der Anwesenheitsliste auf die Schaltfläche **Exportieren**.
3. Öffnen Sie die heruntergeladene Datei in Ihrem Tabellenkalkulationsprogramm.

## Erfasste Anwesenheit einsehen

Nach dem Erfassen von Sitzungen erscheinen die Daten in Ihren Anwesenheitsberichten.

- **Registerkarte Anwesenheitstrend** (unter **Alle Jahre** auf der Seite Anwesenheit) – zeigt gemeindeweite Trends im Zeitverlauf. Siehe [Anwesenheit auswerten](tracking-attendance.md).
- **Registerkarte Gruppenanwesenheit** – zeigt die Anwesenheit aufgeschlüsselt nach einzelnen Gruppen. Siehe [Anwesenheitsberichte](../reports/attendance-reports.md#group-attendance).

:::tip
Wenn eine soeben angelegte Sitzung nicht sofort in den Berichten erscheint, prüfen Sie, ob das Sitzungsdatum innerhalb des in den Berichtsfiltern gewählten Datumsbereichs liegt.
:::
