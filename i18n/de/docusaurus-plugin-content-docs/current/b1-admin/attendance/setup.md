---
title: "Anwesenheits-Einrichtung"
---

# Anwesenheits-Einrichtung

<div class="article-intro">

Bevor Sie die Anwesenheit erfassen können, müssen Sie B1 Admin mitteilen, wo sich Ihre Kirche befindet, wann Gottesdienste stattfinden und welche Gruppen sich zu welchem Gottesdienst treffen. Diese einmalige Einrichtung schafft die Struktur, auf der die gesamte Anwesenheitserfassung und -berichterstattung in Ihrer Kirche aufbaut.

</div>

<div class="prereqs">
<h4>Bevor Sie beginnen</h4>

- Sie benötigen ein aktives B1-Admin-Konto mit der Berechtigung, die Anwesenheit zu verwalten. Siehe [Rollen & Berechtigungen](../people/roles-permissions.md), wenn Sie sich über Ihre Zugriffsstufe unsicher sind.
- Wenn Sie Gruppen Gottesdienstzeiten zuweisen möchten, stellen Sie sicher, dass Ihre [Gruppen angelegt sind](../groups/creating-groups.md).

</div>

## Grundbegriffe

- **Standort** -- ein physischer Ort, an dem Ihre Kirche zusammenkommt (z. B. "Hauptstandort", "Nordstandort"). Standorte werden unter **Einstellungen** verwaltet.
- **Gottesdienst** -- eine wiederkehrende Versammlung an einem Standort (z. B. "Sonntagsgottesdienst", "Mittwochs").
- **Gottesdienstzeit** -- eine bestimmte Uhrzeit, zu der ein Gottesdienst stattfindet (z. B. "9:00 Uhr", "11:00 Uhr").
- **Geplante Gruppe** -- eine Gruppe, die einer bestimmten Gottesdienstzeit zugewiesen ist. Die Anwesenheit wird im Kontext dieses Gottesdienstes erfasst.
- **Ungeplante Gruppe** -- eine Gruppe, die ihre Anwesenheit eigenständig erfasst, ohne an eine Gottesdienstzeit gebunden zu sein.

## Ihre Anwesenheitsstruktur einrichten

1. Öffnen Sie **B1 Admin**, öffnen Sie das [Sprungmenü](../introduction.md#getting-around-with-the-jump-menu) (die Suchleiste oben links) und klappen Sie **Personen** auf.
2. Klicken Sie auf **Anwesenheit** und dann in der linken Spalte auf **Einrichtung**. Die Tabelle **Gottesdienststruktur** öffnet sich, mit oben angezeigten Zählwerten Ihrer Standorte, Gottesdienstzeiten sowie geplanter und ungeplanter Gruppen. Die Zählwerte aktualisieren sich, sobald Sie in der Tabelle etwas hinzufügen, bearbeiten oder entfernen.
3. Klicken Sie auf **Standorte verwalten** (oben rechts im Bereich **Gottesdienststruktur**). Dies führt Sie zu **Einstellungen → Standorte**. Klicken Sie auf **Standort hinzufügen**, geben Sie den Namen Ihres Standorts ein (Adresse und Zeitzone sind optional) und klicken Sie auf **Speichern**.
4. Kehren Sie zu **Personen → Anwesenheit** zurück und klicken Sie auf **Einrichtung**. Ihr Standort erscheint nun in der Einrichtungstabelle.
5. Klicken Sie unter Ihrem Standort auf die Schaltfläche **+ in der Spalte Gottesdienst**. Geben Sie einen Gottesdienstnamen wie "Sonntagsgottesdienst" ein und klicken Sie auf **Speichern**.
6. Klicken Sie unter dem Gottesdienst auf die Schaltfläche **+ in der Spalte Zeit**. Geben Sie einen Namen für die **Gottesdienstzeit** ein, etwa "9:00 Uhr", füllen Sie optional den [Check-in-Zeitplan](#setting-a-check-in-schedule) aus und klicken Sie auf **Speichern**. Wiederholen Sie dies für jede Gottesdienstzeit.
7. Um eine Gruppe mit einer Gottesdienstzeit zu verbinden, öffnen Sie die Gruppe unter **Personen > Gruppen**, klicken Sie auf **Bearbeiten** und verwenden Sie **Gottesdienstzeit hinzufügen** -- siehe den nächsten Abschnitt.

### Anwesenheit für eine Gruppe aktivieren

Bevor für eine Gruppe Anwesenheit erfasst werden kann, muss **Anwesenheit erfassen** für diese Gruppe aktiviert sein.

1. Wählen Sie im Sprungmenü **Personen > Gruppen** und wählen Sie die Gruppe aus.
2. Klicken Sie unterhalb des Gruppennamens auf die Schaltfläche **Bearbeiten**.
3. Setzen Sie **Anwesenheit erfassen** auf **Ja**.
4. Klicken Sie auf **Speichern**.

:::tip
Wenn Sie die Gruppe im vorherigen Schritt einer Gottesdienstzeit zugewiesen haben, verwenden Sie zusätzlich die Option **Gottesdienstzeit hinzufügen** auf der Bearbeitungsseite der Gruppe, um sie mit dem richtigen Gottesdienst zu verknüpfen. So werden die Sitzungen mit dem richtigen Standort und der richtigen Uhrzeit verbunden.
:::

:::tip
Findet eine Gruppe außerhalb eines regulären Gottesdienstes statt -- etwa ein kleiner Mittwochskreis, der seine Anwesenheit selbst erfasst -- können Sie sie als ungeplante Gruppe belassen. Sie erscheint trotzdem im Bericht **Gruppenanwesenheit**.
:::

## Einen Check-in-Zeitplan festlegen

Jede Gottesdienstzeit kann einen optionalen Check-in-Zeitplan haben, damit sich der [Selbst-Check-in](check-in.md) jede Woche automatisch öffnet und schließt. Ohne Zeitplan steht der Check-in für diese Gottesdienstzeit jederzeit zur Verfügung (solange der Raum nicht aus anderen Gründen geschlossen ist, etwa weil er voll ist).

1. Klicken Sie in der Ansicht **Einrichtung** in der Spalte **Zeit** auf den Namen einer Gottesdienstzeit (oder legen Sie eine neue an).
2. Wählen Sie unter **Check-in-Zeitplan** den **Tag** der Woche aus, an dem die Gottesdienstzeit stattfindet.
3. Legen Sie die **Startzeit** und optional die **Endzeit** fest.
4. Geben Sie **Check-in öffnen (Minuten vor Beginn)** ein -- zum Beispiel öffnet `30` den Check-in eine halbe Stunde vor Beginn des Gottesdienstes.
5. Geben Sie **Check-in schließen (Minuten nach Ende)** ein -- zum Beispiel bleibt der Check-in mit `15` noch 15 Minuten nach der Endzeit geöffnet. Haben Sie keine Endzeit festgelegt, wird dies ab der Startzeit gerechnet.
6. Klicken Sie auf **Speichern**.

Der Zeitplan wiederholt sich jede Woche und wird in der Zeitzone des Standorts des Gottesdienstes gemessen. Hat dieser Standort keine Zeitzone, wird stattdessen die [Zeitzone](../settings/church-settings.md#time-zone) Ihrer Kirche verwendet, danach die Zeitzone Ihres ersten Standorts, der eine hat, und schließlich die Ostküstenzeit (America/New_York). Öffnet sich der Check-in zur falschen Uhrzeit, prüfen Sie die **Zeitzone** des Standorts unter [Standorte](../settings/campuses.md). Um einen Zeitplan zu entfernen, setzen Sie **Tag** zurück auf **Kein Zeitplan** und klicken Sie auf **Speichern**. Ein Zeitplan wirkt nur, wenn sowohl ein **Tag** als auch eine **Startzeit** festgelegt sind.

Während das Check-in-Zeitfenster einer Gottesdienstzeit geschlossen ist:

- **Selbst-Check-in auf B1.church** führt diese Gottesdienstzeit als **Geschlossen** auf (oder beispielsweise als **Geschlossen · öffnet So 9:30 Uhr**) und sie kann nicht ausgewählt werden. Sind alle Zeiten eines Gottesdienstes geschlossen, sehen Familien, wann der Check-in öffnet, etwa "Check-in öffnet So 9:30 Uhr".
- **Die Kiosk-App B1 Checkin** zeigt die Gottesdienstzeit ebenfalls als **Geschlossen** mit dem Zeitpunkt der Öffnung an. Sind alle Zeiten eines Gottesdienstes geschlossen, teilt der Kiosk mit, wann der Check-in für diesen Gottesdienst öffnet. Wer bereits für eine geschlossene Gottesdienstzeit eingecheckt ist, sieht seine Gruppe stattdessen mit **Eingecheckt**. Schließt ein Zeitfenster während eines Check-ins, kann der Kiosk ihn nicht abschließen und zeigt den Bildschirm **Noch nicht einchecken möglich** mit dem betroffenen Raum, damit die Familie einen anderen auswählen kann.

Ein Haushalt, der bereits für eine frühere Gottesdienstzeit eingecheckt ist, kann auch dann zurückkommen und eine spätere, geöffnete Gottesdienstzeit hinzufügen, wenn das frühere Zeitfenster bereits geschlossen ist. Bestehende Check-ins bleiben erhalten.

:::tip
Legen Sie ein großzügiges Öffnungsfenster fest (zum Beispiel 45 Minuten vor Beginn), damit früh eintreffende Familien und Ehrenamtliche einchecken können, und ein kurzes Schließfenster, damit Verspätete noch einchecken können, sobald der Gottesdienst begonnen hat.
:::

## Ihre Einrichtung bearbeiten

Sie können Ihre Einrichtung jederzeit aktualisieren. Wählen Sie einen Standort, eine Gottesdienstzeit oder eine Gruppe aus und klicken Sie auf **Bearbeiten**, um die Details zu ändern, oder auf **Löschen**, um sie zu entfernen.

:::info
Das Entfernen einer Gottesdienstzeit löscht keine vergangenen Anwesenheitsdaten. Ihre historischen Daten bleiben erhalten, auch wenn Sie Ihren Zeitplan ändern.
:::

## Wie es weitergeht

Sobald Ihre Standorte, Gottesdienstzeiten und Gruppen eingerichtet sind, können Sie mit der [Anwesenheitserfassung](recording-attendance.md) manuell beginnen oder den [Selbst-Check-in](check-in.md) für Ihre Gottesdienste einrichten.
