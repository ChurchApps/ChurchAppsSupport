---
title: "Anwesenheits-Setup"
---

# Anwesenheits-Setup

<div class="article-intro">

Bevor Sie die Anwesenheit erfassen können, müssen Sie B1 Admin mitteilen, wo sich die Standorte Ihrer Kirche befinden, wann die Gottesdienste stattfinden und welche Gruppen bei welchem Gottesdienst zusammenkommen. Dieses einmalige Setup legt die Struktur fest, auf der die gesamte Anwesenheitserfassung und Berichterstattung Ihrer Kirche aufbaut.

</div>

<div class="prereqs">
<h4>Bevor Sie beginnen</h4>

- Sie benötigen ein aktives B1-Admin-Konto mit der Berechtigung, die Anwesenheit zu verwalten. Falls Sie unsicher sind, welche Zugriffsstufe Sie haben, lesen Sie [Rollen & Berechtigungen](../people/roles-permissions.md).
- Wenn Sie Gruppen Gottesdienstzeiten zuweisen möchten, stellen Sie sicher, dass Ihre [Gruppen angelegt](../groups/creating-groups.md) sind.

</div>

## Grundbegriffe

- **Standort** – ein physischer Ort, an dem sich Ihre Kirche versammelt (z. B. „Hauptstandort“, „Nordstandort“). Standorte werden unter **Einstellungen** verwaltet.
- **Gottesdienst** – eine regelmäßig stattfindende Zusammenkunft an einem Standort (z. B. „Sonntagsgottesdienst“, „Mitte der Woche“).
- **Gottesdienstzeit** – eine bestimmte Uhrzeit, zu der ein Gottesdienst stattfindet (z. B. „9:00 Uhr“, „11:00 Uhr“).
- **Eingeplante Gruppe** – eine Gruppe, die einer bestimmten Gottesdienstzeit zugeordnet ist. Die Anwesenheit wird im Kontext dieses Gottesdienstes erfasst.
- **Nicht eingeplante Gruppe** – eine Gruppe, die ihre Anwesenheit eigenständig erfasst, ohne an eine Gottesdienstzeit gebunden zu sein.

## Ihre Anwesenheitsstruktur einrichten

1. Öffnen Sie **B1 Admin**, öffnen Sie das [Sprungmenü](../introduction.md#getting-around-with-the-jump-menu) (das Suchfeld oben links) und klappen Sie **Personen** auf.
2. Klicken Sie auf **Anwesenheit** und dann in der linken Spalte auf **Setup**. Die Tabelle **Gottesdienststruktur** öffnet sich. Oben sehen Sie die Anzahl Ihrer Standorte, Gottesdienstzeiten sowie eingeplanter und nicht eingeplanter Gruppen.
3. Klicken Sie auf **Standorte verwalten** (oben rechts im Bereich **Gottesdienststruktur**). Sie gelangen zu **Einstellungen → Standorte**. Klicken Sie auf **Standort hinzufügen**, geben Sie den Namen Ihres Standorts ein (Adresse und Zeitzone sind optional) und klicken Sie auf **Speichern**.
4. Kehren Sie zu **Personen → Anwesenheit** zurück und klicken Sie auf **Setup**. Ihr Standort erscheint nun in der Setup-Tabelle.
5. Klicken Sie unter Ihrem Standort in der Spalte **Gottesdienst** auf die Schaltfläche **+**. Geben Sie einen Gottesdienstnamen wie „Sonntagsgottesdienst“ ein und klicken Sie auf **Speichern**.
6. Klicken Sie unter dem Gottesdienst in der Spalte **Zeit** auf die Schaltfläche **+**. Geben Sie einen Namen für die **Gottesdienstzeit** ein, etwa „9:00 Uhr“. Füllen Sie optional den [Check-in-Zeitplan](#setting-a-check-in-schedule) aus und klicken Sie auf **Speichern**. Wiederholen Sie dies für jede Gottesdienstzeit.
7. Um eine Gruppe mit einer Gottesdienstzeit zu verbinden, öffnen Sie die Gruppe unter **Personen > Gruppen**, klicken Sie auf **Bearbeiten** und verwenden Sie **Gottesdienstzeit hinzufügen** – siehe den nächsten Abschnitt.

### Anwesenheitserfassung für eine Gruppe aktivieren

Bevor für eine Gruppe Anwesenheit erfasst werden kann, muss **Anwesenheit erfassen** für diese Gruppe aktiviert sein.

1. Wählen Sie im Sprungmenü **Personen > Gruppen** und wählen Sie die Gruppe aus.
2. Klicken Sie unter dem Namen der Gruppe auf die Schaltfläche **Bearbeiten**.
3. Setzen Sie **Anwesenheit erfassen** auf **Ja**.
4. Klicken Sie auf **Speichern**.

:::tip
Wenn Sie der Gruppe im vorherigen Schritt eine Gottesdienstzeit zugewiesen haben, nutzen Sie zusätzlich die Option **Gottesdienstzeit hinzufügen** auf der Bearbeitungsseite der Gruppe, um sie mit dem richtigen Gottesdienst zu verknüpfen. So sind Sitzungen mit dem richtigen Standort und der richtigen Zeit verbunden.
:::

:::tip
Wenn sich eine Gruppe außerhalb eines regulären Gottesdienstes trifft – etwa ein Hauskreis mitten in der Woche, der seine Anwesenheit selbst erfasst –, können Sie sie als nicht eingeplante Gruppe belassen. Sie erscheint trotzdem im Bericht **Gruppenanwesenheit**.
:::

## Einen Check-in-Zeitplan festlegen {#setting-a-check-in-schedule}

Jede Gottesdienstzeit kann einen optionalen Check-in-Zeitplan haben, damit sich das [Selbst-Check-in](check-in.md) jede Woche automatisch öffnet und schließt. Ohne Zeitplan bleibt der Check-in für diese Gottesdienstzeit jederzeit verfügbar (solange der Raum nicht aus anderen Gründen geschlossen ist, etwa weil er voll ist).

1. Klicken Sie in der Ansicht **Setup** in der Spalte **Zeit** auf den Namen einer Gottesdienstzeit (oder legen Sie eine neue an).
2. Wählen Sie unter **Check-in-Zeitplan** den **Tag** der Woche, an dem die Gottesdienstzeit stattfindet.
3. Legen Sie die **Startzeit** und optional die **Endzeit** fest.
4. Geben Sie **Check-in öffnen (Minuten vor Beginn)** ein – zum Beispiel öffnet `30` den Check-in eine halbe Stunde vor Beginn des Gottesdienstes.
5. Geben Sie **Check-in schließen (Minuten nach Ende)** ein – zum Beispiel bleibt der Check-in mit `15` noch 15 Minuten nach der Endzeit geöffnet. Wenn Sie keine Endzeit festgelegt haben, wird dies ab der Startzeit gerechnet.
6. Klicken Sie auf **Speichern**.

Der Zeitplan wiederholt sich jede Woche und wird in der Zeitzone des Standorts des Gottesdienstes berechnet. Hat dieser Standort keine Zeitzone, wird stattdessen die [Zeitzone](../settings/church-settings.md#time-zone) Ihrer Kirche verwendet, danach die Zeitzone Ihres ersten Standorts mit einer Zeitzone und schließlich die Ostküstenzeit (America/New_York). Öffnet der Check-in zur falschen Uhrzeit, prüfen Sie die **Zeitzone** des Standorts unter [Standorte](../settings/campuses.md). Um einen Zeitplan zu entfernen, setzen Sie **Tag** wieder auf **Kein Zeitplan** und klicken Sie auf **Speichern**. Ein Zeitplan wird nur wirksam, wenn sowohl ein **Tag** als auch eine **Startzeit** festgelegt sind.

Solange das Check-in-Fenster einer Gottesdienstzeit geschlossen ist:

- Das **Selbst-Check-in auf B1.church** zeigt diese Gottesdienstzeit als **Geschlossen** an (oder beispielsweise als **Geschlossen · öffnet So 9:30 Uhr**) und sie kann nicht ausgewählt werden. Sind alle Zeiten eines Gottesdienstes geschlossen, sehen Familien, wann der Check-in öffnet, etwa „Check-in öffnet So 9:30 Uhr“.
- Der **Kiosk der App B1 Checkin** zeigt die Gottesdienstzeit ebenfalls als **Geschlossen** mit dem Öffnungszeitpunkt an. Sind alle Zeiten eines Gottesdienstes geschlossen, nennt der Kiosk, wann der Check-in für diesen Gottesdienst öffnet. Wurde jemand bereits für eine geschlossene Gottesdienstzeit eingecheckt, zeigt sein Raum stattdessen **Eingecheckt**. Schließt das Fenster während eines Check-ins, bricht der Kiosk den Vorgang ab und zeigt den Bildschirm **Check-in noch nicht möglich** mit dem betroffenen Raum, damit die Familie einen anderen Raum wählen kann.

Eine Familie, die bereits für eine frühere Gottesdienstzeit eingecheckt hat, kann auch danach noch zurückkommen und eine spätere, geöffnete Gottesdienstzeit hinzufügen – selbst wenn das frühere Fenster bereits geschlossen ist. Ihre bestehenden Check-ins bleiben erhalten.

:::tip
Legen Sie ein großzügiges Öffnungsfenster fest (zum Beispiel 45 Minuten vor Beginn), damit früh ankommende Familien und Ehrenamtliche einchecken können, und ein kurzes Schließfenster, damit Nachzügler nach Beginn des Gottesdienstes noch einchecken können.
:::

## Ihr Setup bearbeiten

Sie können Ihr Setup jederzeit aktualisieren. Wählen Sie einen Standort, eine Gottesdienstzeit oder eine Gruppe aus und klicken Sie auf **Bearbeiten**, um die Details zu ändern, oder auf **Löschen**, um sie zu entfernen.

:::info
Das Entfernen einer Gottesdienstzeit löscht keine vergangenen Anwesenheitsdaten. Ihr Verlauf bleibt auch dann erhalten, wenn Sie Ihren Zeitplan ändern.
:::

## Wie geht es weiter

Sobald Ihre Standorte, Gottesdienstzeiten und Gruppen eingerichtet sind, können Sie [die Anwesenheit erfassen](recording-attendance.md) oder das [Selbst-Check-in](check-in.md) für Ihre Gottesdienste einrichten.
