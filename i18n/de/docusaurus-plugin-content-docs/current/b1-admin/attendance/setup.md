---
title: "Anwesenheitseinrichtung"
---

# Anwesenheitseinrichtung

<div class="article-intro">

Bevor Sie Teilnahme verfolgen können, müssen Sie B1 Admin über die physischen Standorte Ihrer Kirche, wann Gottesdienste stattfinden, und welche Gruppen in jedem Service zusammenkommen, informieren. Dieses einmalige Setup erstellt die Struktur, die alle Teilnahmeverfolgung und -berichte über Ihre Kirche hinweg antreibt.

</div>

<div class="prereqs">
<h4>Bevor Sie beginnen</h4>

- Sie benötigen ein aktives B1 Admin-Konto mit Berechtigung zum Verwalten von Teilnahme. Siehe [Rollen & Berechtigungen](../people/roles-permissions.md), falls Sie sich über Ihre Zugriffsstufe nicht sicher sind.
- Wenn Sie vorhaben, Gruppen zu Gottesdienstzeiten zuzuweisen, stellen Sie sicher, dass Ihre [Gruppen zuerst erstellt werden](../groups/creating-groups.md).

</div>

## Schlüsselkonzepte

- **Standort** – ein physischer Ort, an dem sich Ihre Kirche trifft (z.B. "Hauptstandort", "Nordstandort"). Standorte werden unter **Einstellungen** verwaltet.
- **Service** – ein regelmäßiges Treffen an einem Standort (z.B. "Sonntagsgottesdienst", "Mittwochveranstaltung").
- **Gottesdienstzeit** – eine bestimmte Zeit, zu der ein Service stattfindet (z.B. "9:00 Uhr", "11:00 Uhr").
- **Geplante Gruppe** – eine Gruppe, die einer bestimmten Gottesdienstzeit zugeordnet ist. Teilnahme wird im Kontext dieses Services verfolgt.
- **Ungeplante Gruppe** – eine Gruppe, die Teilnahme auf eigene Faust verfolgt, ohne an eine Gottesdienstzeit gebunden zu sein.

## Einrichtung Ihrer Anwesenheitsstruktur

1. Öffnen Sie **B1 Admin**, öffnen Sie das [Jump-Menü](../introduction.md#getting-around-with-the-jump-menu) (die Suchleiste oben links), und erweitern Sie **Personen**.
2. Klicken Sie auf **Teilnahme** und dann links auf **Einrichtung**. Die Tabelle **Service-Struktur** wird geöffnet, mit Anzahlen Ihrer Standorte, Gottesdienstzeiten sowie geplanter und ungeplanter Gruppen oben.
3. Klicken Sie auf **Standorte verwalten** (oben rechts im Bereich **Service-Struktur**). Dies führt Sie zu **Einstellungen → Standorte**. Klicken Sie auf **Standort hinzufügen**, geben Sie den Namen Ihres Standorts ein (Adresse und Zeitzone sind optional), und klicken Sie auf **Speichern**.
4. Kehren Sie zu **Personen → Teilnahme** zurück und klicken Sie auf **Einrichtung**. Ihr Standort wird nun in der Einrichtungstabelle angezeigt.
5. Klicken Sie auf die **+ Schaltfläche in der Service-Spalte** unter Ihrem Standort. Geben Sie einen Service-Namen wie "Sonntagsgottesdienst" ein und klicken Sie auf **Speichern**.
6. Klicken Sie auf die **+ Schaltfläche in der Zeit-Spalte** unter dem Service. Geben Sie einen Namen für die **Gottesdienstzeit** wie "9:00 Uhr" ein, füllen Sie optional den [Anmeldeplan](#setting-a-check-in-schedule) aus und klicken Sie auf **Speichern**. Wiederholen Sie dies für jede Gottesdienstzeit.
7. Um eine Gruppe mit einer Gottesdienstzeit zu verbinden, öffnen Sie die Gruppe aus **Personen > Gruppen**, klicken Sie auf **Bearbeiten**, und verwenden Sie **Gottesdienstzeit hinzufügen** – siehe den nächsten Abschnitt.

### Teilnahmeverfolgung in einer Gruppe aktivieren

Bevor eine Gruppe Teilnahme aufgezeichnet werden kann, muss die Teilnahmeverfolgung für diese Gruppe aktiviert werden.

1. Wählen Sie im Jump-Menü **Personen > Gruppen** und wählen Sie die Gruppe aus.
2. Klicken Sie auf die Schaltfläche **Bearbeiten** unter dem Namen der Gruppe.
3. Setzen Sie **Teilnahme verfolgen** auf **Ja**.
4. Klicken Sie auf **Speichern**.

:::tip
Wenn Sie die Gruppe im vorherigen Schritt einer Gottesdienstzeit zugeordnet haben, verwenden Sie auch die Option **Gottesdienstzeit hinzufügen** auf dem Bearbeitungsbildschirm der Gruppe, um sie mit dem richtigen Service zu verknüpfen. Dies stellt sicher, dass Sitzungen mit dem richtigen Standort und der richtigen Zeit verbunden sind.
:::

:::tip
Wenn sich eine Gruppe außerhalb eines regulären Services trifft – wie eine wöchentliche kleine Gruppe, die ihre eigene Teilnahme verfolgt – können Sie sie als ungeplante Gruppe belassen. Sie wird immer noch im Bericht **Gruppenteilnahme** für die Teilnahmeberichterstellung angezeigt.
:::

## Anmeldeplan festlegen {#setting-a-check-in-schedule}

Jede Gottesdienstzeit kann einen optionalen Anmeldeplan haben, damit sich die [Selbstanmeldung](check-in.md) jede Woche automatisch öffnet und schließt. Ohne Plan bleibt die Anmeldung für diese Gottesdienstzeit jederzeit verfügbar (solange der Raum nicht aus anderen Gründen geschlossen ist, etwa weil er voll ist).

1. Klicken Sie in der Ansicht **Einrichtung** auf den Namen einer Gottesdienstzeit in der Spalte **Zeit** (oder fügen Sie eine neue hinzu).
2. Wählen Sie unter **Anmeldeplan** den **Tag** aus, an dem die Gottesdienstzeit stattfindet.
3. Legen Sie die **Startzeit** und optional die **Endzeit** fest.
4. Geben Sie **Anmeldung öffnen (Minuten vor Beginn)** ein – zum Beispiel öffnet `30` die Anmeldung eine halbe Stunde vor Beginn des Gottesdienstes.
5. Geben Sie **Anmeldung schließen (Minuten nach Ende)** ein – zum Beispiel hält `15` die Anmeldung 15 Minuten nach der Endzeit geöffnet. Wenn Sie keine Endzeit festgelegt haben, wird dies ab der Startzeit gerechnet.
6. Klicken Sie auf **Speichern**.

Der Plan verwendet die Ortszeit Ihrer Kirche und wiederholt sich jede Woche. Um einen Plan zu entfernen, setzen Sie den **Tag** zurück auf **Kein Plan** und klicken Sie auf **Speichern**. Ein Plan wird nur wirksam, wenn sowohl ein **Tag** als auch eine **Startzeit** festgelegt sind.

Während das Anmeldefenster einer Gottesdienstzeit geschlossen ist:

- Die **Selbstanmeldung auf B1.church** blendet diese Gottesdienstzeit aus. Wenn keine der Gottesdienstzeiten eines Services geöffnet ist, sehen Familien die Meldung "Die Anmeldung ist für diesen Service gerade nicht geöffnet."
- Die **B1 Checkin-Kiosk-App** schließt keine Anmeldung in die Gruppen dieser Gottesdienstzeit ab. Der Kiosk zeigt einen Bildschirm **Noch nicht anmeldbar** mit dem betroffenen Raum, damit die Familie einen anderen auswählen kann.

:::tip
Legen Sie ein großzügiges Öffnungsfenster fest (zum Beispiel 45 Minuten vor Beginn), damit früh ankommende Familien und Freiwillige sich anmelden können, und ein kurzes Schließfenster, damit Spätankommende sich noch anmelden können, sobald der Gottesdienst begonnen hat.
:::

## Einrichtung bearbeiten

Sie können Ihre Einrichtung jederzeit aktualisieren. Wählen Sie einen Standort, eine Gottesdienstzeit oder eine Gruppe aus und klicken Sie auf **Bearbeiten**, um ihre Details zu ändern, oder auf **Löschen**, um sie zu entfernen.

:::info
Das Entfernen einer Gottesdienstzeit löscht keine bisherigen Teilnahmeeintragungen. Ihre historischen Daten werden auch bei Zeitplanänderungen beibehalten.
:::

## Was kommt als nächstes

Sobald Ihre Standorte, Gottesdienstzeiten und Gruppen eingerichtet sind, können Sie beginnen, [Teilnahme manuell aufzuzeichnen](recording-attendance.md) oder die [Selbstanmeldung](check-in.md) für Ihre Services einzurichten.
