---
title: "Anwesenheits-Einrichtung"
---

# Anwesenheits-Einrichtung

<div class="article-intro">

Bevor Sie die Anwesenheit erfassen können, müssen Sie B1 Admin mitteilen, wo sich Ihre Kirche befindet, wann Gottesdienste stattfinden und welche Gruppen sich zu welchem Gottesdienst treffen. Diese einmalige Einrichtung schafft die Struktur, auf der die gesamte Anwesenheitserfassung und -auswertung Ihrer Kirche aufbaut.

</div>

## Schulungsvideo

<YouTube id="LQPc2gVlXvQ" title="Gottesdienste und Anwesenheit in B1 einrichten" next="Kinder-Check-in in B1 einrichten" nextUrl="/docs/b1-admin/guides/childrens-checkin" />

<div class="prereqs">
<h4>Bevor Sie beginnen</h4>

- Sie benötigen ein aktives B1-Admin-Konto mit der Berechtigung **Gottesdienste bearbeiten** für Anwesenheit. Die Option **Einrichtung** erscheint nur für Personen mit dieser Berechtigung; die bloße Ansicht der Anwesenheit reicht nicht aus. Siehe [Rollen & Berechtigungen](../people/roles-permissions.md), wenn Sie sich über Ihre Zugriffsstufe nicht sicher sind.
- Wenn Sie Gruppen Gottesdienstzeiten zuweisen möchten, stellen Sie sicher, dass Ihre [Gruppen angelegt sind](../groups/creating-groups.md).

</div>

## Grundbegriffe

- **Standort** – ein physischer Ort, an dem Ihre Kirche zusammenkommt (z. B. „Hauptstandort“, „Nordstandort“). Standorte werden unter **Einstellungen** verwaltet.
- **Gottesdienst** – eine wiederkehrende Zusammenkunft an einem Standort (z. B. „Sonntagsgottesdienst“, „Mittwochs“).
- **Gottesdienstzeit** – eine bestimmte Uhrzeit, zu der ein Gottesdienst stattfindet (z. B. „9:00 Uhr“, „11:00 Uhr“).
- **Geplante Gruppe** – eine Gruppe, die einer bestimmten Gottesdienstzeit zugewiesen ist. Die Anwesenheit wird im Kontext dieses Gottesdienstes erfasst.
- **Ungeplante Gruppe** – eine Gruppe, die ihre Anwesenheit eigenständig erfasst, ohne an eine Gottesdienstzeit gebunden zu sein.

## Ihre Anwesenheitsstruktur einrichten

1. Öffnen Sie **B1 Admin**, öffnen Sie das [Sprungmenü](../introduction.md#getting-around-with-the-jump-menu) (das Suchfeld oben links) und klappen Sie **Personen** auf.
2. Klicken Sie auf **Anwesenheit** und dann in der linken Spalte auf **Einrichtung**. Die Tabelle **Gottesdienststruktur** öffnet sich, oben mit Zählungen Ihrer Standorte, Gottesdienstzeiten sowie geplanten und ungeplanten Gruppen. Die Zählungen aktualisieren sich, sobald Sie in der Tabelle etwas hinzufügen, bearbeiten oder entfernen.
3. Klicken Sie auf **Standorte verwalten** (oben rechts im Bereich **Gottesdienststruktur**). Dadurch gelangen Sie zu **Einstellungen → Standorte**. Klicken Sie auf **Standort hinzufügen**, geben Sie den Namen Ihres Standorts ein (Adresse und Zeitzone sind optional) und klicken Sie auf **Speichern**.
4. Kehren Sie zu **Personen → Anwesenheit** zurück und klicken Sie auf **Einrichtung**. Ihr Standort erscheint nun in der Einrichtungstabelle.
5. Klicken Sie unter Ihrem Standort in der Spalte **Gottesdienst** auf die Schaltfläche **+**. Geben Sie einen Gottesdienstnamen wie „Sonntagsgottesdienst“ ein und klicken Sie auf **Speichern**.
6. Klicken Sie unter dem Gottesdienst in der Spalte **Zeit** auf die Schaltfläche **+**. Geben Sie einen Namen für die **Gottesdienstzeit** ein, z. B. „9:00 Uhr“, füllen Sie optional den [Check-in-Zeitplan](#setting-a-check-in-schedule) aus und klicken Sie auf **Speichern**. Wiederholen Sie dies für jede Gottesdienstzeit.
7. Um eine Gruppe mit einer Gottesdienstzeit zu verbinden, öffnen Sie die Gruppe unter **Personen > Gruppen**, klicken Sie auf **Bearbeiten** und verwenden Sie **Gottesdienstzeit hinzufügen** – siehe den nächsten Abschnitt.

### Anwesenheitserfassung für eine Gruppe aktivieren

Bevor für eine Gruppe Anwesenheit erfasst werden kann, muss **Anwesenheit erfassen** für diese Gruppe aktiviert sein.

1. Wählen Sie im Sprungmenü **Personen > Gruppen** und wählen Sie die Gruppe aus.
2. Klicken Sie unter dem Namen der Gruppe auf die Schaltfläche **Bearbeiten**.
3. Setzen Sie **Anwesenheit erfassen** auf **Ja**.
4. Klicken Sie auf **Speichern**.

:::tip
Wenn Sie der Gruppe im vorherigen Schritt eine Gottesdienstzeit zugewiesen haben, verwenden Sie zusätzlich die Option **Gottesdienstzeit hinzufügen** auf der Bearbeitungsseite der Gruppe, um sie mit dem richtigen Gottesdienst zu verknüpfen. So werden Sitzungen dem richtigen Standort und der richtigen Zeit zugeordnet.
:::

:::tip
Wenn eine Gruppe außerhalb eines regulären Gottesdienstes zusammenkommt – etwa ein Hauskreis unter der Woche, der seine Anwesenheit selbst erfasst –, können Sie sie als ungeplante Gruppe belassen. Sie erscheint trotzdem im Bericht **Gruppenanwesenheit**.
:::

## Einen Check-in-Zeitplan festlegen {#setting-a-check-in-schedule}

Jede Gottesdienstzeit kann optional einen Check-in-Zeitplan haben, damit sich das [Selbst-Check-in](check-in.md) jede Woche automatisch öffnet und schließt. Ohne Zeitplan ist der Check-in für diese Gottesdienstzeit jederzeit verfügbar (solange der Raum nicht aus anderen Gründen geschlossen ist, etwa weil er voll ist).

1. Klicken Sie in der Ansicht **Einrichtung** in der Spalte **Zeit** auf den Namen einer Gottesdienstzeit (oder legen Sie eine neue an).
2. Wählen Sie unter **Check-in-Zeitplan** den **Tag** der Woche, an dem die Gottesdienstzeit stattfindet.
3. Legen Sie die **Startzeit** und optional die **Endzeit** fest.
4. Geben Sie **Check-in öffnen (Minuten vor Beginn)** ein – zum Beispiel öffnet `30` den Check-in eine halbe Stunde vor Beginn des Gottesdienstes.
5. Geben Sie **Check-in schließen (Minuten nach Ende)** ein – zum Beispiel hält `15` den Check-in noch 15 Minuten nach der Endzeit geöffnet. Wenn Sie keine Endzeit festgelegt haben, wird dies ab der Startzeit gerechnet.
6. Klicken Sie auf **Speichern**.

Der Zeitplan wiederholt sich jede Woche und wird in der Zeitzone des Standorts des Gottesdienstes gemessen. Hat dieser Standort keine Zeitzone, wird stattdessen die [Zeitzone](../settings/church-settings.md#time-zone) Ihrer Kirche verwendet, danach die Zeitzone Ihres ersten Standorts mit einer Zeitzone und schließlich die Ostküstenzeit (America/New_York). Öffnet der Check-in zur falschen Uhrzeit, prüfen Sie die **Zeitzone** des Standorts unter [Standorte](../settings/campuses.md). Um einen Zeitplan zu entfernen, setzen Sie **Tag** wieder auf **Kein Zeitplan** und klicken Sie auf **Speichern**. Ein Zeitplan wird nur wirksam, wenn sowohl ein **Tag** als auch eine **Startzeit** festgelegt sind.

Solange das Check-in-Fenster einer Gottesdienstzeit geschlossen ist:

- **Selbst-Check-in auf B1.church** zeigt diese Gottesdienstzeit als **Geschlossen** an (oder zum Beispiel als **Geschlossen · öffnet So 9:30 Uhr**), und sie kann nicht ausgewählt werden. Sind alle Zeiten eines Gottesdienstes geschlossen, sehen Familien, wann der Check-in öffnet, etwa „Check-in öffnet So 9:30 Uhr“.
- **Die App B1 Checkin am Kiosk** zeigt die Gottesdienstzeit ebenfalls als **Geschlossen** mit dem Öffnungszeitpunkt an. Sind alle Zeiten eines Gottesdienstes geschlossen, nennt der Kiosk, wann der Check-in für diesen Gottesdienst öffnet. Wurde jemand bereits für eine geschlossene Gottesdienstzeit eingecheckt, zeigt seine Gruppe stattdessen **Eingecheckt**. Schließt das Fenster während eines Check-ins, bricht der Kiosk den Vorgang nicht ab, sondern zeigt einen Bildschirm **Noch nicht einchecken möglich** mit dem betroffenen Raum, damit die Familie einen anderen Raum wählen kann.

Ein Haushalt, der sich bereits für einen früheren Gottesdienst eingecheckt hat, kann zurückkommen und eine spätere, geöffnete Gottesdienstzeit hinzufügen – auch dann, wenn das frühere Fenster bereits geschlossen ist. Die bestehenden Check-ins bleiben erhalten.

:::tip
Legen Sie ein großzügiges Öffnungsfenster fest (zum Beispiel 45 Minuten vor Beginn), damit früh eintreffende Familien und Ehrenamtliche einchecken können, und ein kurzes Schließfenster, damit Verspätete auch nach Beginn des Gottesdienstes noch einchecken können.
:::

## Ihre Einrichtung bearbeiten

Sie können Ihre Einrichtung jederzeit aktualisieren. Wählen Sie einen Standort, eine Gottesdienstzeit oder eine Gruppe aus und klicken Sie auf **Bearbeiten**, um die Angaben zu ändern, oder auf **Löschen**, um sie zu entfernen.

:::info
Das Entfernen einer Gottesdienstzeit löscht keine vergangenen Anwesenheitsdaten. Ihre Historie bleibt erhalten, selbst wenn Sie Ihren Zeitplan ändern.
:::

## Wie geht es weiter?

Sobald Ihre Standorte, Gottesdienstzeiten und Gruppen eingerichtet sind, können Sie mit der [manuellen Erfassung der Anwesenheit](recording-attendance.md) beginnen oder das [Selbst-Check-in](check-in.md) für Ihre Gottesdienste einrichten.
