---
title: "Anwesenheit erfassen"
---

# Anwesenheit erfassen

<div class="article-intro">

Sobald Ihre Standorte, Gottesdienstzeiten und Gruppen eingerichtet sind, können Sie die Anwesenheit nach jeder Zusammenkunft manuell erfassen. B1 Admin organisiert die Anwesenheit in **Sitzungen** – eine Sitzung pro Gruppe und Zusammenkunftstermin. Sie legen die Sitzung an, markieren, wer anwesend war, und die Daten fließen direkt in Ihre Anwesenheitsberichte ein.

</div>

<div class="prereqs">
<h4>Bevor Sie beginnen</h4>

- Ihre Standorte, Gottesdienstzeiten und Gruppen müssen konfiguriert sein. Lesen Sie [Anwesenheits-Setup](setup.md), falls Sie das noch nicht getan haben.
- Die Gruppen, die Sie erfassen möchten, müssen **Anwesenheit erfassen** aktiviert haben. Einzelheiten finden Sie unter [Anwesenheits-Setup](setup.md).
- Zum Speichern der Anwesenheit benötigen Sie die Berechtigung **Anwesenheit bearbeiten**. Ehrenamtliche, die für Personen nur **Nur Namen von Personen anzeigen** haben, können die Anwesenheit trotzdem auf diese Weise erfassen: Sie öffnen Kurse über **Gruppen** und sehen die Mitglieder nur mit ihren Namen. Siehe [Personen – nur Namen](../settings/roles-permissions.md#people-names-only).

</div>

## Eine Sitzung anlegen

Eine Sitzung steht für ein einzelnes Treffen einer Gruppe – zum Beispiel Ihre Klasse für Kinder von der Vorschule bis zur 3. Klasse an einem bestimmten Sonntag.

1. Öffnen Sie **B1 Admin**, öffnen Sie das [Sprungmenü](../introduction.md#getting-around-with-the-jump-menu) (das Suchfeld oben links), klappen Sie **Personen** auf und klicken Sie auf **Gruppen**.
2. Wählen Sie die Gruppe aus, für die Sie die Anwesenheit erfassen möchten.
3. Klicken Sie im Abschnitt **Sitzungen** auf der Seite der Gruppe auf **Alle Sitzungen**.
4. Klicken Sie auf **Neu**, um eine neue Sitzung anzulegen.
5. Wenn die Gruppe einer Gottesdienstzeit zugeordnet ist, wählen Sie die **Gottesdienstzeit** aus. Handelt es sich um eine nicht eingeplante Gruppe, erscheint dieses Feld nicht.
6. Wählen Sie das **Sitzungsdatum** aus – dies kann heute, ein vergangenes oder ein zukünftiges Datum sein.
7. Klicken Sie auf **Speichern**.

### Sitzungen für jede Klasse einer Gottesdienstzeit anlegen {#adding-sessions-for-every-class-in-a-service-time}

Wenn andere Gruppen zur selben Gottesdienstzeit zusammenkommen (zum Beispiel alle Kinderklassen am Sonntag um 9:00 Uhr), können Sie deren Sitzungen in einem Schritt anlegen, statt jede Gruppe einzeln aufzurufen.

1. Gehen Sie wie oben beschrieben vor und wählen Sie eine **Gottesdienstzeit** aus.
2. Aktivieren Sie **Auch für die anderen _N_ Gruppen in _Gottesdienstzeit_ hinzufügen**. Das Kontrollkästchen zeigt an, wie viele weitere Gruppen dieser Gottesdienstzeit zugeordnet sind. Es erscheint nur beim Anlegen einer neuen Sitzung und nur, wenn mindestens eine weitere Gruppe zu dieser Zeit zusammenkommt.
3. Klicken Sie auf **Speichern**.

Es wird eine Sitzung für die aktuelle Gruppe und für jede der anderen Gruppen zum selben Datum und mit derselben Gottesdienstzeit angelegt. Gruppen, die für dieses Datum und diese Gottesdienstzeit bereits eine Sitzung haben, werden übersprungen, sodass keine Dubletten entstehen.

:::tip
Sie können Sitzungen für vergangene Termine anlegen, um Anwesenheit nachzutragen, die Sie noch nicht erfasst haben, oder sie im Voraus anlegen, damit sie bereit sind, wenn sich Ihre Gruppe trifft.
:::

## Sitzungsnotizen {#session-notes}

Jede Sitzung kann Notizen enthalten – eine Zusammenfassung des Behandelten, Ankündigungen oder Gebetsanliegen.

1. Tragen Sie beim Anlegen einer Sitzung oder nach einem Klick auf das Symbol **Bearbeiten** (Stift) neben einer Sitzung in der Liste im Feld **Notizen (Inhalt, Ankündigungen, Gebetsanliegen)** unter dem Datum etwas ein. Die Werkzeugleiste ermöglicht fettgedruckten Text, Listen und Links.
2. Klicken Sie auf **Speichern**.

Die Notizen erscheinen oben in der Anwesenheitsliste der Sitzung. Sie sind außerdem die Treffen-Notizen, die die Mitglieder der Gruppe im Abschnitt **Treffen** auf der Seite der Gruppe in B1.church lesen. Gruppenleitende können sie dort ebenfalls schreiben und bearbeiten. Siehe [Gruppendetails](../../b1-church/groups/group-details.md#meeting-notes-and-attendance).

## Anwesenheit markieren

Wählen Sie eine Sitzung aus, um ihre Anwesenheitsliste zu sehen. Jedes Gruppenmitglied wird mit einem Kontrollkästchen aufgeführt, nach Nachnamen sortiert, und wer bereits als anwesend erfasst ist, ist markiert.

1. Aktivieren Sie das Kontrollkästchen neben jeder Person, die teilgenommen hat. Mit **Alle auswählen** oder **Keine auswählen** ändern Sie alle Einträge gleichzeitig.
2. Die Anzahl oberhalb der Liste (zum Beispiel „12 von 15 anwesend“) wird aktualisiert, während Sie Kontrollkästchen aktivieren.
3. Klicken Sie auf **Anwesenheit speichern**. Erst nach dem Speichern wird etwas erfasst; eine Meldung bestätigt, wenn der Vorgang abgeschlossen ist.

Wenn Sie jemanden, der bereits als anwesend erfasst war, abwählen und dann speichern, wird diese Person aus der Sitzung entfernt.

### Gäste hinzufügen

Um jemanden zu erfassen, der kein Mitglied der Gruppe ist, suchen Sie ihn über die Personensuche neben der Anwesenheitsliste. Falls die Person noch nicht in Ihrer Datenbank ist, können Sie sie direkt aus der Suche anlegen. In beiden Fällen wird sie bereits angekreuzt in die Liste aufgenommen. Klicken Sie auf **Anwesenheit speichern**, um sie zu erfassen.

Personen, die sich an einem Kiosk eingecheckt haben, zeigen einen Chip **Ehrenamtlich** oder **Gast**. Personen, die keine Gruppenmitglieder sind, zeigen einen Chip **Gast**.

## Prüfen, welche Gruppen noch Anwesenheit brauchen

Wenn mehrere Klassen zur selben Gottesdienstzeit zusammenkommen, sehen Sie auf einen Blick, bei welchen Klassen für dieses Datum die Anwesenheit noch fehlt.

1. Öffnen Sie eine Sitzung mit einer Gottesdienstzeit.
2. Klicken Sie oben in der Anwesenheitsliste auf **Wer noch Anwesenheit braucht**.
3. Ein Dialog listet jede Gruppe auf, die dieser Gottesdienstzeit zugeordnet ist. Oben steht eine Zusammenfassung wie „5 von 8 Gruppen erfasst“.

Gruppen, bei denen für dieses Datum niemand als anwesend markiert ist, zeigen einen Chip **Nicht erfasst** und werden zuerst aufgelistet. Gruppen mit erfasster Anwesenheit zeigen **Erfasst** mit der Anzahl der anwesenden Personen (zum Beispiel „Erfasst (12)“). Klicken Sie auf den Namen einer Gruppe, um deren Sitzungen mit der Sitzung für dasselbe Datum bereits ausgewählt zu öffnen. So können Sie ihre Anwesenheit sofort erfassen. Hat die Gruppe für dieses Datum noch keine Sitzung, öffnet sich die Liste ihrer Sitzungen, damit Sie eine anlegen können.

:::tip
Kombinieren Sie dies mit **Alle Klassen drucken** und [dem Anlegen von Sitzungen für jede Klasse einer Gottesdienstzeit](#adding-sessions-for-every-class-in-a-service-time): Legen Sie die Sitzungen an, verteilen Sie die Anwesenheitslisten und nutzen Sie dann **Wer noch Anwesenheit braucht**, um zu sehen, welche Listen noch nicht eingetragen wurden.
:::

## Eine Anwesenheitsliste drucken

Eine Anwesenheitsliste ist eine druckbare Klassenliste, die Lehrkräfte von Hand markieren und Ihnen zum späteren Eintragen zurückgeben können. Jede Liste zeigt das Logo Ihrer Kirche (das **Logo für helle Hintergründe** aus [Website > Erscheinungsbild](../website/appearance.md), falls Sie eines hochgeladen haben) mit dem Namen der Kirche darunter, die Klasse, eine große Zeile **Datum** unter dem Klassennamen und die Gottesdienstzeit. Die Mitglieder stehen in zwei Spalten (zuerst die linke Spalte von oben nach unten, dann die rechte), damit mehr Namen auf eine Seite passen. Jedes Mitglied hat die Kästchen **Anwesend** und **Abwesend**. Es gibt freie Zeilen für Gäste und einen Bereich **Lehrkraft / Notizen**.

- **Aus einer Sitzung** – Klicken Sie oben in der Anwesenheitsliste der Sitzung auf das Symbol **Anwesenheitsliste drucken** (Drucker). Die Liste trägt das Datum der Sitzung.
- **Alle Klassen eines Gottesdienstes** – Wenn die Sitzung eine Gottesdienstzeit hat, klicken Sie auf **Alle Klassen drucken**, um für jede dieser Gottesdienstzeit zugeordnete Klasse eine Liste zu drucken. Jede Klasse wird auf einer eigenen Seite gedruckt.
- **Aus der Mitgliederliste** – Klicken Sie auf der Seite der Gruppe auf **Alle Mitglieder**, dann auf das Symbol **Anwesenheitsliste drucken** über der Mitgliederliste und wählen Sie **Anwesenheitsliste**, um eine undatierte Liste zu drucken. Im selben Menü gibt es das Layout **Kontaktliste** mit Telefonnummer, E-Mail-Adresse und Anschrift jedes Mitglieds. Siehe [Mitgliederliste drucken](../groups/group-members.md#printing-the-member-list).

Die Liste öffnet sich in einem neuen Tab, und der Druckdialog Ihres Browsers erscheint automatisch.

## Anwesenheit in eine Tabelle exportieren

Sie können eine Aufzeichnung der Sitzung als CSV-Datei herunterladen, um sie in Excel, Numbers oder Google Tabellen zu verwenden.

1. Öffnen Sie die Sitzung, die Sie exportieren möchten.
2. Klicken Sie oben in der Anwesenheitsliste auf die Schaltfläche **Exportieren**.
3. Öffnen Sie die heruntergeladene Datei in Ihrem Tabellenprogramm.

## Erfasste Anwesenheit ansehen

Nachdem Sie Sitzungen erfasst haben, erscheinen die Daten in Ihren Anwesenheitsberichten.

- **Tab Anwesenheitstrend** (unter **Alle Jahre** auf der Seite Anwesenheit) – zeigt gemeindeweite Trends im Zeitverlauf. Siehe [Anwesenheit verfolgen](tracking-attendance.md).
- **Tab Gruppenanwesenheit** – zeigt die Anwesenheit aufgeschlüsselt nach einzelnen Gruppen. Siehe [Anwesenheitsberichte](../reports/attendance-reports.md#group-attendance).

:::tip
Wenn eine gerade angelegte Sitzung nicht sofort in den Berichten erscheint, prüfen Sie, ob das Sitzungsdatum im Datumsbereich liegt, der in den Berichtsfiltern ausgewählt ist.
:::
