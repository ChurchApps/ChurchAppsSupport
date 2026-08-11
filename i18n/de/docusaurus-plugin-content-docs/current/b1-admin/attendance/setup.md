---
title: "Anwesenheit Einrichtung"
---

# Anwesenheit Einrichtung

<div class="article-intro">

Bevor Sie die Anwesenheit verfolgen können, müssen Sie B1 Admin von den physischen Orten Ihrer Kirche, von wann Gottesdienste stattfinden und welche Gruppen bei jedem Gottesdienst treffen, berichten. Dieses einmalige Setup erstellt die Struktur, die die gesamte Anwesenheitsverfolgung und Berichterstellung in Ihrer Kirche ermöglicht.

</div>

<div class="prereqs">
<h4>Voraussetzungen</h4>

- Sie benötigen ein aktives B1 Admin-Konto mit Berechtigung zur Verwaltung der Anwesenheit. Siehe [Rollen & Berechtigungen](../people/roles-permissions.md), wenn Sie sich über Ihre Zugriffsstufe unsicher sind.
- Wenn Sie beabsichtigen, Gruppen Gottesdienstzeiten zuzuweisen, stellen Sie sicher, dass Ihre [Gruppen erstellt](../groups/creating-groups.md) sind.

</div>

## Schlüsselkonzepte

- **Standort** -- ein physischer Ort, an dem sich Ihre Kirche trifft (z.B. "Hauptstandort", "Nordstandort"). Standorte werden unter **Einstellungen** verwaltet.
- **Gottesdienst** -- eine wiederkehrende Versammlung an einem Standort (z.B. "Sonntagsgottesdienst", "Mittwoch").
- **Gottesdienstzeit** -- eine bestimmte Zeit, zu der ein Gottesdienst stattfindet (z.B. "9:00 Uhr", "11:00 Uhr").
- **Geplante Gruppe** -- eine Gruppe, die einer bestimmten Gottesdienstzeit zugewiesen ist. Die Anwesenheit wird im Zusammenhang dieser Gottesdienstzeit verfolgt.
- **Ungeplante Gruppe** -- eine Gruppe, die ihre Anwesenheit unabhängig verfolgt, ohne an eine Gottesdienstzeit gebunden zu sein.

## Einrichtung Ihrer Anwesenheitsstruktur

1. Öffnen Sie **B1 Admin**, klicken Sie auf das **Bereichsmenü** in der oberen linken Ecke (der Bereichsname mit dem kleinen Pfeil) und wählen Sie **Personen**.
2. Klicken Sie in der Navigationsleiste auf die **Anwesenheit**-Registerkarte. Die **Einrichtungs**-Registerkarte ist standardmäßig ausgewählt.
3. Klicken Sie auf **Standorte verwalten** (oben rechts im Setup-Fenster). Dies führt Sie zu **Einstellungen → Standorte**. Klicken Sie auf **Standort hinzufügen**, geben Sie den Namen Ihres Standorts ein (Adresse und Zeitzone sind optional) und klicken Sie auf **Speichern**.
4. Kehren Sie zu **Personen → Anwesenheit → Einrichtung** zurück. Ihr Standort wird jetzt in der Setup-Tabelle angezeigt.
5. Klicken Sie auf die **+ Schaltfläche in der Dienstleistungs-Spalte** unter Ihrem Standort. Geben Sie einen Dienstnamen wie "Sonntagsgottesdienst" ein und klicken Sie auf **Speichern**.
6. Klicken Sie auf die **+ Schaltfläche in der Zeit-Spalte** unter dem Gottesdienst. Geben Sie eine Zeit wie "9:00 Uhr" ein und klicken Sie auf **Speichern**. Wiederholen Sie dies für jede Gottesdienstzeit.
7. Um eine Gruppe mit einer Gottesdienstzeit zu verbinden, öffnen Sie die Gruppe auf der **Gruppen**-Registerkarte, klicken Sie auf das **Bearbeitungs**-Stift und verwenden Sie **Gottesdienstzeit hinzufügen** -- siehe den nächsten Abschnitt.

### Aktivieren der Verfolgung der Anwesenheit für eine Gruppe

Bevor eine Gruppe Anwesenheit aufzeichnen kann, muss die Verfolgung der Anwesenheit für diese Gruppe aktiviert werden.

1. Klicken Sie auf **Gruppen** in der Seitenleiste und wählen Sie die Gruppe.
2. Klicken Sie auf das **Bearbeitungs**-Stift-Symbol.
3. Stellen Sie **Anwesenheit verfolgen** auf **Ja** ein.
4. Klicken Sie auf **Speichern**.

:::tip
Wenn Sie die Gruppe in dem vorherigen Schritt einer Gottesdienstzeit zugewiesen haben, verwenden Sie auch die Option **Gottesdienstzeit hinzufügen** auf dem Bearbeitungsbildschirm der Gruppe, um sie mit der richtigen Gottesdienstzeit zu verbinden. Dies stellt sicher, dass Sitzungen mit dem richtigen Standort und der richtigen Zeit verbunden sind.
:::

:::tip
Wenn eine Gruppe sich außerhalb eines regulären Gottesdienstes trifft -- wie eine kleine Wochenmittagsgruppe, die ihre eigene Anwesenheit verfolgt -- können Sie sie als ungeplante Gruppe belassen. Sie wird trotzdem auf der Gruppen-Registerkarte für die Anwesenheitsberichterstattung angezeigt.
:::

## Bearbeitung Ihres Setups

Sie können Ihr Setup jederzeit aktualisieren. Wählen Sie einen Standort, eine Gottesdienstzeit oder eine Gruppe und klicken Sie auf **Bearbeiten**, um deren Details zu ändern, oder auf **Löschen**, um sie zu entfernen.

:::info
Das Entfernen einer Gottesdienstzeit löscht keine vergangenen Anwesenheitsdatensätze. Ihre historischen Daten werden erhalten, selbst wenn Sie Ihren Zeitplan ändern.
:::

## Nächste Schritte

Nachdem Ihre Standorte, Gottesdienstzeiten und Gruppen vorhanden sind, sind Sie bereit, mit dem [Aufzeichnen der Anwesenheit](recording-attendance.md) zu beginnen, entweder manuell oder durch das Einrichten des [Self-Service Check-in](check-in.md) für Ihre Gottesdienste.
