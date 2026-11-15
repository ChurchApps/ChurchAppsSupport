---
title: "Anwesenheitseinrichtung"
description: "Richten Sie in B1 Admin Standorte, Gottesdienste, Gottesdienstzeiten und Gruppenzuordnungen ein, damit Anwesenheitserfassung und Check-in-Zeitpläne in Ihrer ganzen Kirche funktionieren."
---

# Anwesenheitseinrichtung

<div class="article-intro">

Bevor Sie die Anwesenheit erfassen können, müssen Sie B1 Admin mitteilen, wo sich Ihre Kirche befindet, wann Gottesdienste stattfinden und welche Gruppen sich bei welchem Gottesdienst treffen. Diese einmalige Einrichtung schafft die Struktur, auf der die gesamte Anwesenheitserfassung und Berichterstattung in Ihrer Kirche aufbaut.

</div>

## Schulungsvideo {#training-video}

<YouTube id="LQPc2gVlXvQ" title="Gottesdienste und Anwesenheit in B1 einrichten" next="Kinder-Check-in in B1 einrichten" nextUrl="/docs/b1-admin/guides/childrens-checkin" />

<div class="prereqs">
<h4>Bevor Sie beginnen</h4>

- Sie benötigen ein aktives B1-Admin-Konto mit der Anwesenheitsberechtigung **Gottesdienste bearbeiten**. Die Option **Einrichtung** erscheint nur für Personen mit dieser Berechtigung; das bloße Anzeigen der Anwesenheit reicht nicht aus. Siehe [Rollen & Berechtigungen](../people/roles-permissions.md), wenn Sie Ihre Zugriffsstufe nicht kennen.
- Wenn Sie Gruppen Gottesdienstzeiten zuordnen möchten, stellen Sie sicher, dass Ihre [Gruppen angelegt sind](../groups/creating-groups.md).

</div>

## Grundbegriffe {#key-concepts}

- **Standort** – ein physischer Ort, an dem sich Ihre Kirche trifft (z. B. „Hauptstandort“, „Nordstandort“). Standorte werden unter **Einstellungen** verwaltet.
- **Gottesdienst** – eine regelmäßig stattfindende Zusammenkunft an einem Standort (z. B. „Sonntagsgottesdienst“, „Mittwochsabend“).
- **Gottesdienstzeit** – ein bestimmter Zeitpunkt, zu dem ein Gottesdienst stattfindet (z. B. „9:00 Uhr“, „11:00 Uhr“).
- **Gruppe mit Zeitplan** – eine Gruppe, die einer bestimmten Gottesdienstzeit zugeordnet ist. Die Anwesenheit wird im Kontext dieses Gottesdienstes erfasst.
- **Gruppe ohne Zeitplan** – eine Gruppe, die die Anwesenheit eigenständig erfasst, ohne an eine Gottesdienstzeit gebunden zu sein.

## Ihre Anwesenheitsstruktur einrichten {#setting-up-your-attendance-structure}

1. Öffnen Sie **B1 Admin**, öffnen Sie das [Sprungmenü](../introduction.md#getting-around-with-the-jump-menu) (die Suchleiste oben links) und klappen Sie **Personen** auf.
2. Klicken Sie auf **Anwesenheit** und dann in der linken Spalte auf **Einrichtung**. Die Tabelle **Gottesdienststruktur** öffnet sich, oben mit der Anzahl Ihrer Standorte, Gottesdienstzeiten, Gruppen mit und ohne Zeitplan sowie der Gesamtzahl der Gruppen. Die Zahlen aktualisieren sich, sobald Sie in der Tabelle etwas hinzufügen, bearbeiten oder entfernen. Jeder Standort listet seine Gottesdienste, deren Zeiten und die jeder Zeit zugeordneten Gruppen auf, nach Kategorie gruppiert (ein Dienstteam erscheint unter dem Namen seines Dienstbereichs). Gruppen, die die Anwesenheit erfassen, aber keine Gottesdienstzeit haben, werden unten unter **Nicht zugeordnet** aufgelistet.
3. Klicken Sie auf **Standorte verwalten** (oben rechts im Bereich **Gottesdienststruktur**). Dies führt Sie zu **Einstellungen → Standorte**. Klicken Sie auf **Standort hinzufügen**, geben Sie den Namen Ihres Standorts ein (Adresse und Zeitzone sind optional) und klicken Sie auf **Speichern**.
4. Kehren Sie zu **Personen → Anwesenheit** zurück und klicken Sie auf **Einrichtung**. Ihr Standort erscheint nun in der Einrichtungstabelle.
5. Klicken Sie unter Ihrem Standort auf die Schaltfläche **+** in der Spalte **Gottesdienst**. Geben Sie einen Gottesdienstnamen wie „Sonntagsgottesdienst“ ein und klicken Sie auf **Speichern**.
6. Klicken Sie unter dem Gottesdienst auf die Schaltfläche **+** in der Spalte **Zeit**. Geben Sie einen Namen für die **Gottesdienstzeit** wie „9:00 Uhr“ ein, füllen Sie optional den [Check-in-Zeitplan](#setting-a-check-in-schedule) aus und klicken Sie auf **Speichern**. Wiederholen Sie dies für jede Gottesdienstzeit.
7. Um eine Gruppe mit einer Gottesdienstzeit zu verbinden, öffnen Sie die Gruppe über **Personen > Gruppen**, klicken Sie auf **Bearbeiten** und verwenden Sie **Gottesdienstzeit hinzufügen** – siehe den nächsten Abschnitt.

### Anwesenheit für eine Gruppe aktivieren {#enabling-track-attendance-on-a-group}

Bevor für eine Gruppe Anwesenheit erfasst werden kann, muss **Anwesenheit erfassen** für diese Gruppe aktiviert sein.

1. Wählen Sie im Sprungmenü **Personen > Gruppen** und wählen Sie die Gruppe aus.
2. Klicken Sie unter dem Namen der Gruppe auf die Schaltfläche **Bearbeiten**.
3. Setzen Sie **Anwesenheit erfassen** auf **Ja**.
4. Klicken Sie auf **Speichern**.

:::tip
Wenn Sie die Gruppe im vorherigen Schritt einer Gottesdienstzeit zugeordnet haben, verwenden Sie auf dem Bearbeitungsbildschirm der Gruppe außerdem die Option **Gottesdienstzeit hinzufügen**, um sie mit dem richtigen Gottesdienst zu verknüpfen. So ist sichergestellt, dass Sitzungen dem richtigen Standort und der richtigen Zeit zugeordnet sind.
:::

:::tip
Wenn sich eine Gruppe außerhalb eines regulären Gottesdienstes trifft – etwa ein Hauskreis am Mittwoch, der seine Anwesenheit eigenständig erfasst –, können Sie sie als Gruppe ohne Zeitplan belassen. Sie erscheint trotzdem im Bericht **Anwesenheit in Gruppen**.
:::

## Einen Check-in-Zeitplan festlegen {#setting-a-check-in-schedule}

Jede Gottesdienstzeit kann einen optionalen Check-in-Zeitplan haben, sodass sich der [Selbst-Check-in](check-in.md) jede Woche automatisch öffnet und schließt. Ohne Zeitplan bleibt der Check-in für diese Gottesdienstzeit jederzeit verfügbar (solange der Raum nicht aus anderen Gründen geschlossen ist, etwa weil er voll ist).

1. Klicken Sie in der Ansicht **Einrichtung** in der Spalte **Zeit** auf den Namen einer Gottesdienstzeit (oder fügen Sie eine neue hinzu).
2. Wählen Sie unter **Check-in-Zeitplan** den **Tag** der Woche, an dem die Gottesdienstzeit stattfindet.
3. Legen Sie die **Startzeit** und optional die **Endzeit** fest.
4. Geben Sie **Check-in öffnen (Minuten vor Beginn)** ein – zum Beispiel öffnet `30` den Check-in eine halbe Stunde vor Beginn des Gottesdienstes.
5. Geben Sie **Check-in schließen (Minuten nach Ende)** ein – zum Beispiel hält `15` den Check-in noch 15 Minuten nach der Endzeit geöffnet. Wenn Sie keine Endzeit festgelegt haben, wird dies ab der Startzeit gezählt. Wenn Sie sowohl **Endzeit** als auch **Check-in schließen** leer lassen, bleibt der Check-in bis zum Ende dieses Tages geöffnet.
6. Klicken Sie auf **Speichern**.

Der Zeitplan wiederholt sich jede Woche und wird in der Zeitzone des Standorts des Gottesdienstes gemessen. Hat dieser Standort keine Zeitzone, wird stattdessen die [Zeitzone](../settings/church-settings.md#time-zone) Ihrer Kirche verwendet, danach die Zeitzone Ihres ersten Standorts, der eine hat, und schließlich die Ostküstenzeit (America/New_York). Wenn der Check-in zur falschen Uhrzeit öffnet, prüfen Sie die **Zeitzone** des Standorts unter [Standorte](../settings/campuses.md). Um einen Zeitplan zu entfernen, setzen Sie **Tag** zurück auf **Kein Zeitplan** und klicken Sie auf **Speichern**. Ein Zeitplan wird nur wirksam, wenn sowohl ein **Tag** als auch eine **Startzeit** festgelegt sind.

Während das Check-in-Fenster einer Gottesdienstzeit geschlossen ist:

- Der **Selbst-Check-in auf B1.church** zeigt diese Gottesdienstzeit als **Geschlossen** an (oder zum Beispiel als **Geschlossen · öffnet So 9:30 Uhr**), und sie kann nicht ausgewählt werden. Wenn keine Zeit eines Gottesdienstes geöffnet ist, sehen Familien, wann der Check-in öffnet, etwa „Check-in öffnet So 9:30 Uhr.“
- Die Kiosk-App **B1 Checkin** zeigt die Gottesdienstzeit ebenfalls als **Geschlossen** mit dem Öffnungszeitpunkt an. Sind alle Zeiten eines Gottesdienstes geschlossen, nennt der Kiosk, wann der Check-in für diesen Gottesdienst öffnet. Wer bereits für eine geschlossene Gottesdienstzeit eingecheckt ist, sieht stattdessen seine Gruppe mit **Eingecheckt**. Schließt ein Fenster während eines Check-ins, kann der Kiosk ihn nicht abschließen und zeigt einen Bildschirm **Noch nicht einchecken möglich** mit dem betroffenen Raum, damit die Familie einen anderen wählen kann.

Ein Haushalt, der bereits für eine frühere Gottesdienstzeit eingecheckt hat, kann später zurückkommen und eine spätere, geöffnete Gottesdienstzeit hinzufügen – auch dann, wenn das frühere Fenster bereits geschlossen ist. Ihre bestehenden Check-ins bleiben erhalten.

:::tip
Legen Sie ein großzügiges Öffnungsfenster fest (zum Beispiel 45 Minuten vor Beginn), damit früh ankommende Familien und Freiwillige einchecken können, und ein kurzes Schließfenster, damit Nachzügler auch nach Beginn des Gottesdienstes noch einchecken können.
:::

## Ihre Einrichtung bearbeiten {#editing-your-setup}

Sie können Ihre Einrichtung jederzeit aktualisieren:

- **Gottesdienste und Gottesdienstzeiten** – Klicken Sie in der Tabelle auf den Namen eines Gottesdienstes oder einer Gottesdienstzeit, um das zugehörige Formular zu öffnen. Ändern Sie die Angaben und klicken Sie auf **Speichern**, oder klicken Sie auf **Löschen**, um sie zu entfernen.
- **Standorte** – Klicken Sie auf **Standorte verwalten**, um Standorte unter **Einstellungen** hinzuzufügen, umzubenennen oder zu entfernen.
- **Gruppen** – Klicken Sie auf den Namen einer Gruppe, um sie zu öffnen, und dann auf **Bearbeiten**, um ihre Gottesdienstzeiten zu ändern oder **Anwesenheit erfassen** ein- oder auszuschalten.

Die Schaltfläche **Check-in-Kiosk, QR-Code und Etiketten** oben in der Tabelle führt Sie zu den [B1-CheckIn-Einstellungen](check-in.md).

:::info
Das Entfernen einer Gottesdienstzeit löscht keine vergangenen Anwesenheitseinträge. Ihre historischen Daten bleiben erhalten, auch wenn Sie Ihren Zeitplan ändern.
:::

## Wie es weitergeht {#whats-next}

Sobald Ihre Standorte, Gottesdienstzeiten und Gruppen eingerichtet sind, können Sie mit dem [Erfassen der Anwesenheit](recording-attendance.md) manuell beginnen oder den [Selbst-Check-in](check-in.md) für Ihre Gottesdienste einrichten.
