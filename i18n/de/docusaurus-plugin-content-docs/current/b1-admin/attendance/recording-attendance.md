---
title: "Anwesenheit erfassen"
---

# Anwesenheit erfassen

<div class="article-intro">

Sobald Ihre Standorte, Gottesdienstzeiten und Gruppen eingerichtet sind, können Sie die Anwesenheit nach jedem Treffen manuell erfassen. B1 Admin organisiert die Anwesenheit um **Sitzungen** herum -- eine Sitzung pro Gruppe und Treffendatum. Sie legen die Sitzung an, markieren, wer anwesend war, und die Daten fließen direkt in Ihre Anwesenheitsberichte ein.

</div>

<div class="prereqs">
<h4>Bevor Sie beginnen</h4>

- Ihre Standorte, Gottesdienstzeiten und Gruppen müssen eingerichtet sein. Wenn Sie dies noch nicht getan haben, lesen Sie [Einrichtung der Anwesenheit](setup.md).
- Bei den Gruppen, deren Anwesenheit Sie erfassen möchten, muss **Anwesenheit erfassen** aktiviert sein. Details finden Sie unter [Einrichtung der Anwesenheit](setup.md).

</div>

## Eine Sitzung anlegen

Eine Sitzung steht für ein einzelnes Treffen einer Gruppe -- zum Beispiel der Klasse Ihrer Kinder von der 1. bis zur 3. Klasse an einem bestimmten Sonntag.

1. Öffnen Sie **B1 Admin**, öffnen Sie das [Sprungmenü](../introduction.md#getting-around-with-the-jump-menu) (die Suchleiste oben links), klappen Sie **Personen** auf und klicken Sie auf **Gruppen**.
2. Wählen Sie die Gruppe aus, für die Sie die Anwesenheit erfassen möchten.
3. Klicken Sie im Abschnitt **Sitzungen** auf der Seite der Gruppe auf **Alle Sitzungen**.
4. Klicken Sie auf **Neu**, um eine neue Sitzung anzulegen.
5. Wenn der Gruppe eine Gottesdienstzeit zugeordnet ist, wählen Sie die **Gottesdienstzeit**. Handelt es sich um eine Gruppe ohne feste Zeit, erscheint dieses Feld nicht.
6. Wählen Sie das **Sitzungsdatum** -- dies kann heute, ein vergangenes oder ein zukünftiges Datum sein.
7. Klicken Sie auf **Speichern**.

### Sitzungen für jede Klasse einer Gottesdienstzeit anlegen

Wenn andere Gruppen zur selben Gottesdienstzeit zusammenkommen (zum Beispiel alle Kinderklassen am Sonntag um 9:00 Uhr), können Sie deren Sitzungen in einem Schritt anlegen, statt jede Gruppe einzeln aufzurufen.

1. Gehen Sie wie oben beschrieben vor und wählen Sie eine **Gottesdienstzeit**.
2. Aktivieren Sie **Auch für die anderen _N_ Gruppen in _Gottesdienstzeit_ hinzufügen**. Das Kästchen zeigt an, wie vielen anderen Gruppen diese Gottesdienstzeit zugeordnet ist. Es erscheint nur beim Anlegen einer neuen Sitzung und wenn sich mindestens eine weitere Gruppe zu dieser Zeit trifft.
3. Klicken Sie auf **Speichern**.

Es wird eine Sitzung für die aktuelle Gruppe und für jede der anderen Gruppen mit demselben Datum und derselben Gottesdienstzeit angelegt. Gruppen, die für dieses Datum und diese Gottesdienstzeit bereits eine Sitzung haben, werden übersprungen, Dubletten entstehen also nicht.

:::tip
Sie können Sitzungen für vergangene Termine anlegen, um noch nicht erfasste Anwesenheiten nachzutragen, oder sie im Voraus anlegen, damit sie bereit sind, wenn Ihre Gruppe sich trifft.
:::

## Anwesenheit markieren

Wählen Sie eine Sitzung aus, um deren Anwesenheitsliste zu sehen. Jedes Gruppenmitglied wird mit einem Kästchen aufgeführt, nach Nachnamen sortiert, und wer bereits als anwesend erfasst wurde, ist angekreuzt.

1. Aktivieren Sie das Kästchen neben jeder Person, die anwesend war. Mit **Alle auswählen** oder **Keine auswählen** ändern Sie alle Einträge auf einmal.
2. Die Anzahl über der Liste (zum Beispiel „12 von 15 anwesend“) aktualisiert sich, während Sie Kästchen ankreuzen.
3. Klicken Sie auf **Anwesenheit speichern**. Erst mit dem Speichern wird etwas erfasst. Eine Meldung bestätigt, wenn der Vorgang abgeschlossen ist.

Wenn Sie jemanden, der bereits als anwesend erfasst war, abwählen und anschließend speichern, wird diese Person aus der Sitzung entfernt.

### Gäste hinzufügen

Um eine Person zu erfassen, die nicht Mitglied der Gruppe ist, suchen Sie sie in der Personensuche neben der Anwesenheitsliste. Wenn sie noch nicht in Ihrer Datenbank steht, können Sie sie direkt aus der Suche anlegen. In beiden Fällen wird sie der Liste bereits angekreuzt hinzugefügt. Klicken Sie auf **Anwesenheit speichern**, um sie zu erfassen.

Personen, die sich an einem Kiosk eingecheckt haben, zeigen eine Markierung **Freiwilliger** oder **Gast**. Personen, die keine Gruppenmitglieder sind, zeigen eine Markierung **Gast**.

## Prüfen, welche Gruppen noch eine Anwesenheit benötigen

Wenn mehrere Klassen zur selben Gottesdienstzeit zusammenkommen, können Sie auf einen Blick sehen, für welche davon die Anwesenheit an diesem Datum noch eingetragen werden muss.

1. Öffnen Sie eine Sitzung, die eine Gottesdienstzeit hat.
2. Klicken Sie oben in der Anwesenheitsliste auf **Wer benötigt noch Anwesenheit**.
3. Ein Dialog listet jede Gruppe auf, die dieser Gottesdienstzeit zugeordnet ist. Oben steht eine Zusammenfassung wie „5 von 8 Gruppen erfasst“.

Gruppen, bei denen für dieses Datum niemand als anwesend markiert wurde, zeigen eine Markierung **Nicht erfasst** und stehen zuerst. Gruppen mit erfasster Anwesenheit zeigen **Erfasst** mit der Anzahl der als anwesend markierten Personen (zum Beispiel „Erfasst (12)“). Klicken Sie auf den Namen einer Gruppe, um deren Sitzungen zu öffnen, wobei die Sitzung für dasselbe Datum bereits ausgewählt ist. So können Sie deren Anwesenheit sofort erfassen. Hat die Gruppe für dieses Datum noch keine Sitzung, öffnet sich ihre Sitzungsliste, damit Sie eine anlegen können.

:::tip
Kombinieren Sie dies mit **Alle Klassen drucken** und [dem Anlegen von Sitzungen für jede Klasse einer Gottesdienstzeit](#adding-sessions-for-every-class-in-a-service-time): Legen Sie die Sitzungen an, verteilen Sie die Anwesenheitslisten und nutzen Sie dann **Wer benötigt noch Anwesenheit**, um zu sehen, welche Listen noch nicht erfasst wurden.
:::

## Eine Anwesenheitsliste drucken

Eine Anwesenheitsliste ist eine druckbare Klassenliste, die Lehrkräfte von Hand markieren und Ihnen zurückgeben können, um sie später zu erfassen. Jede Liste zeigt das Logo Ihrer Gemeinde (das **Logo für helle Hintergründe** aus [Website > Erscheinungsbild](../website/appearance.md), sofern Sie eines hochgeladen haben) mit dem Namen der Gemeinde darunter, die Klasse, eine große Zeile **Datum** unter dem Klassennamen und die Gottesdienstzeit. Die Mitglieder sind in zwei Spalten aufgeführt (von oben nach unten in der linken Spalte, dann in der rechten), damit mehr Namen auf eine Seite passen. Jedes Mitglied hat die Kästchen **Anwesend** und **Abwesend**. Außerdem gibt es freie Zeilen für Gäste und einen Bereich **Lehrkraft / Notizen**.

- **Aus einer Sitzung** -- Klicken Sie oben in der Anwesenheitsliste der Sitzung auf das Symbol **Anwesenheitsliste drucken** (Drucker). Die Liste trägt das Datum der Sitzung.
- **Alle Klassen eines Gottesdienstes** -- Hat die Sitzung eine Gottesdienstzeit, klicken Sie auf **Alle Klassen drucken**, um für jede dieser Gottesdienstzeit zugeordnete Klasse eine Liste zu drucken. Jede Klasse wird auf einer eigenen Seite gedruckt.
- **Aus der Mitgliederliste** -- Klicken Sie auf der Seite der Gruppe auf **Alle Mitglieder** und dann oberhalb der Mitgliederliste auf das Symbol **Anwesenheitsliste drucken**. Wählen Sie **Anwesenheitsliste**, um eine Liste ohne Datum zu drucken. Im selben Menü gibt es das Layout **Kontaktliste** mit Telefonnummer, E-Mail-Adresse und Anschrift jedes Mitglieds. Siehe [Mitgliederliste drucken](../groups/group-members.md#printing-the-member-list).

Die Liste öffnet sich in einem neuen Tab, und der Druckdialog Ihres Browsers erscheint automatisch.

## Anwesenheit in eine Tabelle exportieren

Sie können einen Nachweis der Sitzung als CSV-Datei herunterladen, um sie in Excel, Numbers oder Google Tabellen zu verwenden.

1. Öffnen Sie die Sitzung, die Sie exportieren möchten.
2. Klicken Sie oben in der Anwesenheitsliste auf die Schaltfläche **Exportieren**.
3. Öffnen Sie die heruntergeladene Datei in Ihrem Tabellenkalkulationsprogramm.

## Erfasste Anwesenheit anzeigen

Nachdem Sie Sitzungen erfasst haben, erscheinen die Daten in Ihren Anwesenheitsberichten.

- **Registerkarte Anwesenheitstrend** (unter **Alle Jahre** auf der Seite Anwesenheit) -- zeigt gemeindeweite Trends im Zeitverlauf. Siehe [Anwesenheit verfolgen](tracking-attendance.md).
- **Registerkarte Gruppenanwesenheit** -- zeigt die Anwesenheit aufgeschlüsselt nach einzelnen Gruppen. Siehe [Anwesenheitsberichte](../reports/attendance-reports.md#group-attendance).

:::tip
Wenn eine Sitzung, die Sie gerade angelegt haben, nicht sofort in den Berichten erscheint, prüfen Sie, ob das Sitzungsdatum im Datumsbereich liegt, der in den Berichtsfiltern ausgewählt ist.
:::
