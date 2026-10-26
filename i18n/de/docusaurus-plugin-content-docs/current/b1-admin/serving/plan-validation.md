---
title: "Planvalidierung & Benachrichtigungen"
---

# Planvalidierung & Benachrichtigungen für Ehrenamtliche

<div class="article-intro">

B1 Admin prüft Ihre Pläne automatisch vor dem Sonntag auf Probleme: nicht besetzte Positionen, Terminkonflikte und Ehrenamtliche, die den Termin gesperrt haben. Wenn alles in Ordnung ist, können Sie Ihr gesamtes Team mit einem einzigen Klick benachrichtigen.

</div>

<div class="prereqs">
<h4>Bevor Sie beginnen</h4>

- Erstellen Sie einen [Gottesdienstplan](./plans.md) und weisen Sie Ehrenamtlichen Positionen zu
- Fügen Sie dem Plan [Gottesdienstzeiten](./plans.md) hinzu, damit die Konflikterkennung Überschneidungen prüfen kann
- Stellen Sie sicher, dass Ehrenamtliche die B1-Mobile-App installiert haben, um Push-Benachrichtigungen zu erhalten

</div>

## Das Validierungsfenster

Jeder Plan hat ein Fenster **Validierung**, das während der Planerstellung automatisch läuft. Es prüft drei Dinge:

### Nicht besetzte Positionen
Wenn für eine Position mehr Personen benötigt werden, als derzeit zugewiesen sind, listet das Validierungsfenster genau auf, was noch fehlt, zum Beispiel *„Tontechniker: 1 weitere Person benötigt.“* Sie sehen auf einen Blick, ob Ihr Plan vor Beginn der Woche vollständig besetzt ist.

### Terminkonflikte
Wenn ein Ehrenamtlicher zwei Positionen innerhalb desselben Plans zugewiesen bekommt, die sich zeitlich überschneiden, markiert das Validierungsfenster den Konflikt, zum Beispiel *„Jane Smith: Zeitkonflikt zwischen Worship Leader und Kinder-Check-in beim Sonntagsgottesdienst.“* So fallen Doppelbuchungen auf, bevor sie am Sonntagmorgen zum Problem werden.

### Sperrtermine
Ehrenamtliche können in der B1-Mobile-App Termine festlegen, an denen sie nicht verfügbar sind. Wenn jemand einem Plan zugewiesen ist, der in einen seiner Sperrtermine fällt, zeigt das Validierungsfenster den Konflikt automatisch an, damit Sie einen Ersatz finden können.

### Planübergreifende Konflikte
Die Validierung prüft außerdem alle Ihre Pläne gleichzeitig. Wenn dieselbe Person in zwei verschiedenen Plänen eingeteilt ist, die sich zeitlich überschneiden, zum Beispiel ein Gottesdienst um 9 Uhr und einer um 10 Uhr, die beide bis 10:30 Uhr laufen, markiert B1 Admin diese Person als planübergreifend doppelt gebucht.

:::tip
Sie müssen nichts tun, damit die Validierung läuft. Sie aktualisiert sich automatisch, sobald Sie eine Zuweisung hinzufügen oder ändern. Behalten Sie das Fenster einfach im Blick, während Sie den Plan erstellen.
:::

## Ehrenamtliche benachrichtigen

Sobald Ihr Plan steht, können Sie alle zugewiesenen Ehrenamtlichen direkt aus dem Validierungsfenster auf einmal benachrichtigen.

1. Öffnen Sie den Plan und scrollen Sie zum Fenster **Validierung**
2. Wenn es nicht benachrichtigte Ehrenamtliche gibt, sehen Sie einen Link, der anzeigt, wie viele benachrichtigt werden müssen (z. B. *„8 Ehrenamtliche benachrichtigen“*)
3. Klicken Sie auf den Link, um Push-Benachrichtigungen an alle zu senden, die noch nicht benachrichtigt wurden
4. Ehrenamtliche erhalten eine Benachrichtigung auf ihrem Telefon, die sie darüber informiert, dass sie eingeplant wurden, und sie bittet, ihre Zuweisung zu bestätigen

:::info
Es werden nur Ehrenamtliche berücksichtigt, die noch nicht benachrichtigt wurden. Wenn Sie später jemanden zum Plan hinzufügen, erscheint der Link erneut, sodass Sie die neue Person benachrichtigen können, ohne das übrige Team erneut zu benachrichtigen.
:::

### Pläne mit einem Bestätigungs-Workflow

Wenn die Einstellungen des Plans einen [Bestätigungs-Workflow](./workflows.md#serving-assignment-confirmations) benennen, zeigt das Fenster an: *„Neue Anfragen verwenden den Bestätigungs-Workflow. App-Benachrichtigungen bleiben aktiviert. Nachfassen endet, sobald jede Anfrage angenommen oder abgelehnt wird.“* In diesem Fall gilt Folgendes:

- Der Benachrichtigungslink zählt nur Ehrenamtliche, die noch nicht benachrichtigt wurden und noch nicht geantwortet haben.
- Ein Klick darauf sendet die übliche In-App-Benachrichtigung und erstellt pro Anfrage eine Karte auf dem Board des Workflows. Der Workflow sendet dann die E-Mail- und Textnachfassungen und übergibt die Anfrage bei Bedarf an jemanden, der anrufen soll.
- Der Plan muss veröffentlicht (nicht nur vorgemerkt) und der Workflow aktiv sein. Andernfalls zeigt das Fenster an: *„Anfragen konnten nicht versendet werden. Prüfen Sie, ob der ausgewählte Workflow aktiv ist und der Plan veröffentlicht wurde, und versuchen Sie es dann erneut.“*

:::warning
Ehrenamtliche müssen die mobile B1.church-Anwendung installiert haben (als PWA auf dem Startbildschirm oder die veraltete native B1-Mobile-App für Nutzer, die sie noch haben), und die Benachrichtigungen müssen aktiviert sein, um Push-Benachrichtigungen zu erhalten. Anleitungen zur Einrichtung finden Sie unter [Installation als App (PWA)](/docs/b1-church/getting-started/installing-pwa).
:::

## Verwandte Artikel

- [Gottesdienstpläne](./plans.md)
- [Workflows](./workflows.md)
- [Installation der B1.church-PWA](/docs/b1-church/getting-started/installing-pwa)
