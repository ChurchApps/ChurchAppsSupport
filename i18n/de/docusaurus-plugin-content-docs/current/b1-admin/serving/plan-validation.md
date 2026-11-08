---
title: "Planvalidierung & Benachrichtigungen"
description: "Prüfe Dienstpläne in B1 Admin auf unbesetzte Positionen, Terminkonflikte und gesperrte Ehrenamtliche und benachrichtige dann dein gesamtes Team mit einem Klick per Push-Nachricht."
---

# Planvalidierung & Benachrichtigung von Ehrenamtlichen

<div class="article-intro">

B1 Admin prüft deine Pläne vor dem Sonntag automatisch auf Probleme: unbesetzte Positionen, Terminkonflikte und Ehrenamtliche, die den Termin gesperrt haben. Wenn alles in Ordnung ist, kannst du dein gesamtes Team mit einem einzigen Klick benachrichtigen.

</div>

<div class="prereqs">
<h4>Bevor du beginnst</h4>

- Erstelle einen [Dienstplan](./plans.md) und weise den Positionen Ehrenamtliche zu
- Füge dem Plan [Gottesdienstzeiten](./plans.md) hinzu, damit die Konflikterkennung Überschneidungen prüfen kann
- Stelle sicher, dass Ehrenamtliche die [B1 App installiert haben](../../b1-church/getting-started/installing-pwa.md), um Push-Benachrichtigungen zu erhalten

</div>

## Das Validierungsfeld

Jeder Plan verfügt über ein **Validierungsfeld**, das während der Planerstellung automatisch läuft. Es prüft drei Dinge:

### Unbesetzte Positionen
Wenn eine Position mehr Personen benötigt, als aktuell zugewiesen sind, listet das Validierungsfeld genau auf, was noch fehlt, zum Beispiel *„Tontechnik: 1 weitere Person benötigt.“* So siehst du auf einen Blick, ob dein Plan vor der Woche vollständig besetzt ist.

### Terminkonflikte
Wenn einem Ehrenamtlichen zwei Positionen zugewiesen sind, die sich innerhalb desselben Plans zeitlich überschneiden, markiert das Validierungsfeld den Konflikt, zum Beispiel *„Jane Smith: Zeitkonflikt zwischen Gottesdienstleitung und Kinder-Check-in während des Sonntagsgottesdienstes.“* So werden Doppelbuchungen erkannt, bevor sie zu einem Problem am Sonntagmorgen werden.

### Sperrtermine
Ehrenamtliche können in der B1 App Termine festlegen, an denen sie nicht verfügbar sind. Wenn jemand einem Plan zugewiesen wird, der in einen seiner Sperrtermine fällt, zeigt das Validierungsfeld den Konflikt automatisch an, damit du einen Ersatz finden kannst.

### Planübergreifende Konflikte
Die Validierung prüft außerdem alle deine Pläne gleichzeitig. Wenn dieselbe Person in zwei verschiedenen Plänen eingeteilt ist, die sich zeitlich überschneiden, zum Beispiel ein Gottesdienst um 9 Uhr und einer um 10 Uhr, die beide bis 10:30 Uhr laufen, markiert B1 Admin diese Person als planübergreifend doppelt gebucht.

:::tip
Du musst nichts tun, damit die Validierung läuft. Sie aktualisiert sich automatisch, sobald du eine Zuweisung hinzufügst oder änderst. Behalte das Feld einfach im Blick, während du den Plan erstellst.
:::

## Ehrenamtliche benachrichtigen

Sobald dein Plan steht, kannst du alle zugewiesenen Ehrenamtlichen direkt aus dem Validierungsfeld gleichzeitig benachrichtigen.

1. Öffne den Plan und scrolle zum **Validierungsfeld**
2. Wenn es noch nicht benachrichtigte Ehrenamtliche gibt, siehst du einen Link mit der Anzahl, die noch benachrichtigt werden müssen (z. B. *„8 Ehrenamtliche benachrichtigen“*)
3. Klicke auf den Link, um Push-Nachrichten an alle zu senden, die noch keine Benachrichtigung erhalten haben
4. Ehrenamtliche erhalten auf ihrem Smartphone eine Benachrichtigung, dass sie eingeplant wurden, und werden gebeten, ihre Zuweisung zu bestätigen

:::info
Es werden nur Ehrenamtliche berücksichtigt, die noch keine Benachrichtigung erhalten haben. Wenn du später jemanden zum Plan hinzufügst, erscheint der Link erneut, sodass du die neue Person benachrichtigen kannst, ohne das übrige Team erneut zu benachrichtigen.
:::

### Pläne mit einem Bestätigungsablauf

Wenn in den Einstellungen des Plans ein [Bestätigungsablauf](./workflows.md#serving-assignment-confirmations) hinterlegt ist, zeigt das Feld den Hinweis *„Neue Anfragen verwenden den Bestätigungsablauf. App-Benachrichtigungen bleiben aktiviert. Nachfassaktionen enden, sobald jede Anfrage angenommen oder abgelehnt wurde.“* In diesem Fall gilt:

- Der Benachrichtigungslink zählt nur Ehrenamtliche, die noch nicht benachrichtigt wurden und noch nicht geantwortet haben.
- Ein Klick darauf sendet die übliche In-App-Benachrichtigung und erstellt pro Anfrage eine Karte auf dem Board des Ablaufs. Der Ablauf versendet dann die E-Mail- und Textnachrichten zur Nachfassung und übergibt die Anfrage bei Bedarf an eine Person, die anrufen muss.
- Der Plan muss veröffentlicht sein (nicht nur als Entwurf vorgemerkt), und der Ablauf muss aktiv sein. Andernfalls zeigt das Feld den Hinweis *„Anfragen konnten nicht versendet werden. Prüfe, ob der ausgewählte Ablauf aktiv und der Plan veröffentlicht ist, und versuche es dann erneut.“*

:::warning
Damit Ehrenamtliche Push-Benachrichtigungen erhalten, muss die B1 App auf ihrem Startbildschirm installiert sein und Benachrichtigungen müssen aktiviert sein. Anleitungen zur Einrichtung findest du unter [Installation als App (PWA)](../../b1-church/getting-started/installing-pwa.md).
:::

## Verwandte Artikel

- [Dienstpläne](./plans.md)
- [Abläufe](./workflows.md)
- [Installation der B1.church PWA](/docs/b1-church/getting-started/installing-pwa)
