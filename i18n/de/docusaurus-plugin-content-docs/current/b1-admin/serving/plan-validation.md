---
title: "Planprüfung und Benachrichtigungen"
description: "Prüfen Sie Dienstpläne in B1 Admin auf unbesetzte Positionen, Terminkonflikte und gesperrte Freiwillige und benachrichtigen Sie dann Ihr gesamtes Team mit einem Klick per Push-Nachricht."
---

# Planprüfung und Benachrichtigungen für Freiwillige

<div class="article-intro">

B1 Admin prüft Ihre Pläne vor dem Sonntag automatisch auf Probleme – unbesetzte Positionen, Terminkonflikte und Freiwillige, die den Termin gesperrt haben. Wenn alles in Ordnung ist, können Sie Ihr gesamtes Team mit einem einzigen Klick benachrichtigen.

</div>

<div class="prereqs">
<h4>Bevor Sie beginnen</h4>

- Erstellen Sie einen [Dienstplan](./plans.md) und weisen Sie Freiwillige Positionen zu
- Fügen Sie dem Plan [Gottesdienstzeiten](./plans.md) hinzu, damit die Konfliktprüfung Überschneidungen erkennen kann
- Stellen Sie sicher, dass Freiwillige die [B1-App installiert](../../b1-church/getting-started/installing-pwa.md) haben, um Push-Nachrichten zu erhalten

</div>

## Der Bereich Prüfung {#the-validation-panel}

Jeder Plan hat einen Bereich **Prüfung**, der während der Erstellung automatisch läuft. Öffnen Sie den Plan und klicken Sie auf **Dienst-Team verwalten**, um ihn neben den Positionen zu sehen. Die Planseite selbst zeigt unter **Dienst-Team** eine einzeilige Zusammenfassung (zum Beispiel „2 Konflikte · 3 nicht benachrichtigt“) mit einem Link **Prüfen** zum vollständigen Bereich. Positionen, für die noch Personen fehlen, werden ebenfalls auf der Planseite aufgelistet, daher zählt die Zusammenfassungszeile nur Konflikte und Freiwillige, die noch nicht benachrichtigt wurden.

Der Bereich prüft Folgendes:

### Unbesetzte Positionen {#unfilled-positions}
Benötigt eine Position mehr Personen, als aktuell zugewiesen sind, listet der Prüfbereich genau auf, was noch fehlt – zum Beispiel *„Tontechnik: 1 weitere Person benötigt.“* So sehen Sie auf einen Blick, ob Ihr Plan vollständig besetzt ist, bevor die Woche beginnt.

### Terminkonflikte {#scheduling-conflicts}
Ist ein Freiwilliger zwei Positionen im selben Plan zugewiesen, die sich zeitlich überschneiden, markiert der Prüfbereich den Konflikt – zum Beispiel *„Jane Smith: Zeitkonflikt zwischen Anbetungsleitung und Kinder-Check-in beim Sonntagsgottesdienst.“* So fallen Doppelbuchungen auf, bevor sie zu einem Problem am Sonntagmorgen werden.

### Sperrtermine {#blockout-dates}
Freiwillige können in der B1-App Termine festlegen, an denen sie nicht verfügbar sind. Ist jemand einem Plan zugewiesen, der in einen seiner Sperrtermine fällt, zeigt der Prüfbereich den Konflikt automatisch an, damit Sie einen Ersatz finden können.

### Konflikte über mehrere Pläne hinweg {#cross-plan-conflicts}
Die Prüfung betrachtet außerdem alle Ihre Pläne gleichzeitig. Ist derselbe Freiwillige in zwei verschiedenen Plänen eingeplant, die sich zeitlich überschneiden – etwa ein Gottesdienst um 9 Uhr und einer um 10 Uhr, die beide bis 10:30 Uhr laufen –, markiert B1 Admin diese Person als doppelt gebucht über mehrere Pläne hinweg.

### Planungspräferenzen {#scheduling-preferences}
Hat ein Freiwilliger [Planungspräferenzen](./plans.md#scheduling-preferences), warnt Sie der Bereich, wenn eine Zuweisung dagegen verstößt: wenn er in diesem Monat häufiger eingeplant ist als seine **Maximale Anzahl pro Monat**, wenn keine der Zeiten des Plans zu seinen **Bevorzugten Gottesdienstzeiten** passt oder wenn er gebeten hat, nicht am selben Tag wie sein Haushalt zu dienen, und ein Haushaltsmitglied ebenfalls eingeplant ist.

Stimmt alles, lautet die Anzeige im Bereich **Plan ist gültig.**

:::tip
Sie müssen nichts tun, um die Prüfung auszuführen – sie aktualisiert sich automatisch, sobald Sie eine Zuweisung hinzufügen oder ändern. Behalten Sie den Bereich einfach im Blick, während Sie den Plan erstellen.
:::

## Freiwillige benachrichtigen {#notifying-volunteers}

Sobald Ihr Plan steht, können Sie alle zugewiesenen Freiwilligen auf einmal direkt aus dem Prüfbereich benachrichtigen.

1. Öffnen Sie den Plan und klicken Sie auf **Dienst-Team verwalten** (oder auf **Prüfen** in der Zusammenfassungszeile des Plans), um den Bereich **Prüfung** zu sehen.
2. Gibt es Freiwillige, die noch nicht benachrichtigt wurden, sehen Sie einen Link mit der Anzahl, die benachrichtigt werden müssen (z. B. *„8 Freiwillige benachrichtigen“*). Sobald alle benachrichtigt wurden, lautet die Anzeige im Bereich **Alle Freiwilligen benachrichtigt.**
3. Klicken Sie auf den Link, um Push-Nachrichten an alle zu senden, die noch nicht benachrichtigt wurden.
4. Freiwillige erhalten eine Benachrichtigung auf ihrem Telefon, die ihnen mitteilt, dass sie eingeplant wurden, und sie auffordert, ihre Zuweisung zu bestätigen.

:::info
Es werden nur Freiwillige berücksichtigt, die noch nicht benachrichtigt wurden. Fügen Sie später jemanden zum Plan hinzu, erscheint der Link erneut, sodass Sie nur die neue Person benachrichtigen können, ohne das übrige Team erneut anzuschreiben.
:::

### Einen vorläufig eingeplanten Plan veröffentlichen {#publishing-a-penciled-in-plan}

Ist der Plan [vorläufig eingeplant](./plans.md#plan-settings), können Freiwillige ihre Zuweisungen noch nicht sehen. Der Bereich zeigt dann *„Vorläufig eingeplant – Freiwillige können diese Zuweisungen noch nicht sehen.“* und statt des Benachrichtigungslinks eine Schaltfläche:

- **Plan veröffentlichen** macht die Zuweisungen sichtbar.
- **Veröffentlichen und benachrichtigen** (angezeigt, wenn einige Freiwillige noch nicht benachrichtigt wurden, z. B. *„8 Freiwillige veröffentlichen und benachrichtigen“*) macht die Zuweisungen sichtbar und benachrichtigt diese Freiwilligen sofort.

Bestätigen Sie im Dialogfeld, um zu veröffentlichen.

### Pläne mit Bestätigungs-Workflow {#plans-with-a-confirmation-workflow}

Nennen die Einstellungen des Plans einen [Bestätigungs-Workflow](./workflows.md#serving-assignment-confirmations), zeigt der Bereich *„Neue Anfragen verwenden den Bestätigungs-Workflow. App-Benachrichtigungen bleiben aktiviert. Nachfassen endet, sobald jede Anfrage angenommen oder abgelehnt wird.“* In diesem Fall gilt:

- Der Benachrichtigungslink zählt nur Freiwillige, die noch nicht benachrichtigt wurden und noch nicht geantwortet haben.
- Ein Klick darauf sendet die übliche Benachrichtigung in der App und legt pro Anfrage eine Karte auf der Tafel des Workflows an. Der Workflow übernimmt dann das Nachfassen per E-Mail und SMS und übergibt die Anfrage bei Bedarf an jemanden, der anrufen soll.
- Der Plan muss veröffentlicht sein (nicht vorläufig eingeplant), und der Workflow muss aktiv sein. Andernfalls zeigt der Bereich *„Anfragen konnten nicht versendet werden. Prüfen Sie, ob der gewählte Workflow aktiv und der Plan veröffentlicht ist, und versuchen Sie es dann erneut.“*

:::warning
Damit Freiwillige Push-Nachrichten erhalten, muss die B1-App auf ihrem Startbildschirm installiert und die Benachrichtigungen aktiviert sein. Anleitungen zur Einrichtung finden Sie unter [Installation als App (PWA)](../../b1-church/getting-started/installing-pwa.md).
:::

## Verwandte Artikel {#related-articles}

- [Dienstpläne](./plans.md)
- [Workflows](./workflows.md)
- [Installieren der B1.church-PWA](/docs/b1-church/getting-started/installing-pwa)
