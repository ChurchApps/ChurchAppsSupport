---
title: "Anwesenheits-Setup"
---

# Anwesenheits-Setup

<div class="article-intro">

Bevor Sie Anwesenheit verfolgen können, müssen Sie B1 Admin über die physischen Standorte Ihrer Kirche, die Dienstzeiten und die Gruppen, die sich bei jedem Gottesdienst treffen, informieren. Dieses einmalige Setup schafft die Grundstruktur, die die gesamte Anwesenheitsverfolgung und Berichterstattung in Ihrer Kirche unterstützt.

</div>

<div class="prereqs">
<h4>Bevor Sie beginnen</h4>

- Sie benötigen ein aktives B1 Admin-Konto mit der Berechtigung zur Verwaltung der Anwesenheit. Siehe [Rollen & Berechtigungen](../people/roles-permissions.md), wenn Sie sich über Ihre Zugriffsstufe unsicher sind.
- Wenn Sie planen, Gruppen Dienstzeiten zuzuweisen, stellen Sie sicher, dass Ihre [Gruppen erstellt](../groups/creating-groups.md) wurden.

</div>

## Wichtige Konzepte

- **Standort** -- ein physischer Ort, an dem sich Ihre Kirche trifft (z. B. "Hauptstandort", "Nördlicher Standort"). Standorte werden unter **Einstellungen** verwaltet.
- **Gottesdienst** -- eine wiederkehrende Versammlung an einem Standort (z. B. "Sonntagsgottesdienst", "Mittwochgottesdienst").
- **Dienstzeit** -- eine bestimmte Zeit, zu der ein Gottesdienst stattfindet (z. B. "9:00 Uhr", "11:00 Uhr").
- **Geplante Gruppe** -- eine Gruppe, die einer bestimmten Dienstzeit zugewiesen ist. Die Anwesenheit wird im Zusammenhang mit diesem Gottesdienst verfolgt.
- **Ungeplante Gruppe** -- eine Gruppe, die die Anwesenheit eigenständig verfolgt, ohne an eine Dienstzeit gebunden zu sein.

## Einrichten Ihrer Anwesenheitsstruktur

1. Öffnen Sie **B1 Admin**, klicken Sie auf das **Abschnittsmenü** in der oberen linken Ecke (der Abschnittsname mit dem kleinen Pfeil) und wählen Sie **Personen**.
2. Klicken Sie in der Navigationsleiste auf die Registerkarte **Anwesenheit**. Die Registerkarte **Setup** ist standardmäßig ausgewählt.
3. Klicken Sie auf **Standorte verwalten** (oben rechts im Setup-Panel). Dies führt Sie zu **Einstellungen → Standorte**. Klicken Sie auf **Standort hinzufügen**, geben Sie den Namen Ihres Standorts ein (Adresse und Zeitzone sind optional) und klicken Sie auf **Speichern**.
4. Kehren Sie zu **Personen → Anwesenheit → Setup** zurück. Ihr Standort wird nun in der Setupta beelle angezeigt.
5. Klicken Sie auf die **+ Schaltfläche in der Spalte "Gottesdienst"** unter Ihrem Standort. Geben Sie einen Gottesdiensnamen wie "Sonntagsgottesdienst" ein und klicken Sie auf **Speichern**.
6. Klicken Sie auf die **+ Schaltfläche in der Spalte "Zeit"** unter dem Gottesdienst. Geben Sie eine Zeit wie "9:00 Uhr" ein und klicken Sie auf **Speichern**. Wiederholen Sie dies für jede Dienstzeit.
7. Um eine Gruppe mit einer Dienstzeit zu verbinden, öffnen Sie die Gruppe aus der Registerkarte **Gruppen**, klicken Sie auf den Stift zum **Bearbeiten** und verwenden Sie **Dienstzeit hinzufügen** -- siehe den nächsten Abschnitt.

### Aktivieren der Anwesenheitsverfolgung für eine Gruppe

Bevor eine Gruppe Anwesenheit aufzeichnen kann, muss die Funktion "Anwesenheit verfolgen" für diese Gruppe aktiviert werden.

1. Öffnen Sie das **Abschnittsmenü** in der oberen linken Ecke und wählen Sie **Personen**, klicken Sie dann auf die Registerkarte **Gruppen** und wählen Sie die Gruppe.
2. Klicken Sie auf das **Bearbeiten**-Stiftsymbol.
3. Stellen Sie **Anwesenheit verfolgen** auf **Ja**.
4. Klicken Sie auf **Speichern**.

:::tip
Wenn Sie die Gruppe im vorherigen Schritt einer Dienstzeit zugewiesen haben, verwenden Sie auch die Option **Dienstzeit hinzufügen** auf dem Bearbeitungsbildschirm der Gruppe, um sie mit der richtigen Dienstzeit zu verknüpfen. Dies stellt sicher, dass Sitzungen mit dem richtigen Standort und der richtigen Zeit verbunden sind.
:::

:::tip
Wenn sich eine Gruppe außerhalb eines regulären Gottesdienstes trifft -- wie eine Wochengruppe, die ihre eigene Anwesenheit verfolgt -- können Sie sie als ungeplante Gruppe belassen. Sie wird immer noch auf der Registerkarte "Gruppen" für die Anwesenheitsberichterstattung angezeigt.
:::

## Bearbeitung Ihres Setups

Sie können Ihr Setup jederzeit aktualisieren. Wählen Sie einen Standort, eine Dienstzeit oder eine Gruppe und klicken Sie auf **Bearbeiten**, um die Details zu ändern, oder auf **Löschen**, um sie zu entfernen.

:::info
Das Entfernen einer Dienstzeit löscht keine bisherigen Anwesenheitseinträge. Ihre historischen Daten werden beibehalten, auch wenn Sie Ihren Zeitplan ändern.
:::

## Nächste Schritte

Sobald Ihre Standorte, Dienstzeiten und Gruppen eingerichtet sind, können Sie [Anwesenheit aufzeichnen](recording-attendance.md) oder [Selbstcheck-in](check-in.md) für Ihre Gottesdienste einrichten.
