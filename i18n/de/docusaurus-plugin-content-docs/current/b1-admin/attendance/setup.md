---
title: "Anmeldekonfiguration"
---

# Anmeldekonfiguration

<div class="article-intro">

Bevor Sie Anwesenheit nachverfolgen können, müssen Sie B1 Admin über die physischen Orte Ihrer Kirche, wann Gottesdienste stattfinden, und welche Gruppen sich bei jedem Gottesdienst treffen, informieren. Dieses einmalige Setup erstellt die Struktur, die alle Anwesenheitsverfolgung und Berichterstattung in Ihrer Kirche unterstützt.

</div>

<div class="prereqs">
<h4>Bevor Sie beginnen</h4>

- Sie benötigen ein aktives B1 Admin-Konto mit Berechtigung zur Verwaltung von Anwesenheit. Siehe [Rollen & Berechtigungen](../people/roles-permissions.md), wenn Sie sich über Ihre Zugriffsstufe unsicher sind.
- Wenn Sie planen, Gruppen zu Gottesdiensten zuzuweisen, stellen Sie sicher, dass Ihre [Gruppen zuerst erstellt werden](../groups/creating-groups.md).

</div>

## Schlüsselkonzepte

- **Standort** — ein physischer Ort, an dem sich Ihre Kirche trifft (z.B. "Hauptstandort", "Nordstandort"). Standorte werden unter **Einstellungen** verwaltet.
- **Gottesdienst** — eine regelmäßige Versammlung an einem Standort (z.B. "Sonntagsgottesdienst", "Wochenmitte").
- **Gottesdienstzeit** — eine bestimmte Uhrzeit, zu der ein Gottesdienst stattfindet (z.B. "9:00 Uhr", "11:00 Uhr").
- **Geplante Gruppe** — eine Gruppe, die einem bestimmten Gottesdienst zugewiesen ist. Die Anwesenheit wird im Kontext dieses Gottesdiensts nachverfolgt.
- **Ungeplante Gruppe** — eine Gruppe, die die Anwesenheit eigenständig nachverfolgt, ohne an einen Gottesdienst gebunden zu sein.

## Einrichten Ihrer Anwesenheitsstruktur

1. Öffnen Sie **B1 Admin**, klicken Sie auf das **Bereichsmenü** oben links (der Bereichsname mit dem kleinen Pfeil) und wählen Sie **Personen**.
2. Klicken Sie in der Navigationsleiste auf die Registerkarte **Anwesenheit**. Die Registerkarte **Setup** ist standardmäßig ausgewählt.
3. Klicken Sie auf **Standorte verwalten** (oben rechts im Setup-Bereich). Dies führt Sie zu **Einstellungen → Standorte**. Klicken Sie auf **Standort hinzufügen**, geben Sie den Namen Ihres Ortes ein (Adresse und Zeitzone sind optional) und klicken Sie auf **Speichern**.
4. Kehren Sie zu **Personen → Anwesenheit → Setup** zurück. Ihr Standort erscheint jetzt in der Setup-Tabelle.
5. Klicken Sie auf die **+-Schaltfläche in der Spalte Gottesdienst** unter Ihrem Standort. Geben Sie einen Gottesdienstnamen wie "Sonntagsgottesdienst" ein und klicken Sie auf **Speichern**.
6. Klicken Sie auf die **+-Schaltfläche in der Spalte Zeit** unter dem Gottesdienst. Geben Sie eine Uhrzeit wie "9:00 Uhr" ein und klicken Sie auf **Speichern**. Wiederholen Sie dies für jede Gottesdienstzeit.
7. Um eine Gruppe mit einer Gottesdienstzeit zu verbinden, öffnen Sie die Gruppe über die Registerkarte **Gruppen**, klicken Sie auf das **Bearbeiten**-Stiftsymbol und verwenden Sie **Gottesdienstzeit hinzufügen** — siehe den nächsten Abschnitt.

### Anwesenheitsverfolgung für eine Gruppe aktivieren

Bevor für eine Gruppe Anwesenheit erfasst werden kann, muss "Anwesenheit verfolgen" für diese Gruppe aktiviert werden.

1. Klicken Sie in der Seitenleiste auf **Gruppen** und wählen Sie die Gruppe.
2. Klicken Sie auf das **Bearbeiten**-Stiftsymbol.
3. Stellen Sie **Anwesenheit verfolgen** auf **Ja**.
4. Klicken Sie auf **Speichern**.

:::tip
Wenn Sie die Gruppe im vorherigen Schritt einem Gottesdienst zugewiesen haben, verwenden Sie auch die Option **Gottesdienst hinzufügen** auf dem Bearbeitungsbildschirm der Gruppe, um sie mit dem richtigen Gottesdienst zu verknüpfen. Dies stellt sicher, dass Sitzungen mit dem richtigen Standort und der richtigen Zeit verbunden sind.
:::

:::tip
Wenn sich eine Gruppe außerhalb eines regulären Gottesdiensts trifft — wie eine Kleingruppe unter der Woche, die ihre eigene Anwesenheit nachverfolgt — können Sie sie als ungeplante Gruppe belassen. Sie wird immer noch auf der Registerkarte "Gruppen" für die Anwesenheitsberichterstattung angezeigt.
:::

## Bearbeiten Ihres Setups

Sie können Ihr Setup jederzeit aktualisieren. Wählen Sie einen Standort, Gottesdienst oder eine Gruppe und klicken Sie auf **Bearbeiten**, um die Details zu ändern, oder auf **Löschen**, um ihn zu entfernen.

:::info
Das Entfernen eines Gottesdiensts löscht keine vergangenen Anwesenheitsdatensätze. Ihre historischen Daten bleiben erhalten, auch wenn Sie Ihren Plan ändern.
:::

## Was kommt danach

Sobald Ihre Standorte, Gottesdienste und Gruppen vorhanden sind, können Sie mit dem [Aufzeichnen von Anwesenheit](recording-attendance.md) oder dem Einrichten von [Selbstanmeldung](check-in.md) für Ihre Gottesdienste beginnen.
