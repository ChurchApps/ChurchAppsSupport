---
title: "Planprüfung & Benachrichtigungen"
description: "Prüfen Sie Dienstpläne in B1 Admin auf unbesetzte Positionen, Terminkonflikte und gesperrte Freiwillige und benachrichtigen Sie dann Ihr gesamtes Team mit einem Klick per Push."
---

# Planprüfung & Benachrichtigung der Freiwilligen {#plan-validation--volunteer-notifications}

<div class="article-intro">

B1 Admin prüft Ihre Pläne vor dem Sonntag automatisch auf Probleme -- unbesetzte Positionen, Terminkonflikte und Freiwillige, die sich diesen Termin freigehalten haben. Wenn alles in Ordnung ist, können Sie Ihr gesamtes Team mit einem einzigen Klick benachrichtigen.

</div>

<div class="prereqs">
<h4>Bevor Sie beginnen</h4>

- Erstellen Sie einen [Dienstplan](./plans.md) und weisen Sie Freiwillige den Positionen zu
- Fügen Sie dem Plan [Gottesdienstzeiten](./plans.md) hinzu, damit die Konfliktprüfung Überschneidungen erkennen kann
- Stellen Sie sicher, dass Freiwillige die [B1-App installiert](../../b1-church/getting-started/installing-pwa.md) haben, um Push-Benachrichtigungen zu erhalten

</div>

## Die Prüfungsansicht {#the-validation-panel}

Jeder Plan hat einen Bereich **Prüfung**, der während der Planung automatisch läuft. Öffnen Sie den Plan und klicken Sie auf **Dienst-Team verwalten**, um ihn neben den Positionen zu sehen. Die Planseite selbst zeigt unter **Dienst-Team** eine einzeilige Zusammenfassung (zum Beispiel „2 Konflikte · 3 nicht benachrichtigt“) mit einem Link **Prüfen** zur vollständigen Ansicht. Positionen, die noch Personen benötigen, werden ebenfalls auf der Planseite aufgelistet; die Zusammenfassungszeile zählt daher nur Konflikte und Freiwillige, die noch nicht benachrichtigt wurden.

Die Prüfung umfasst Folgendes:

### Unbesetzte Positionen {#unfilled-positions}
Benötigt eine Position mehr Personen, als aktuell zugewiesen sind, listet der Bereich der Prüfung genau auf, was noch fehlt -- zum Beispiel *„Sound Tech: 1 weitere Person benötigt.“* So sehen Sie auf einen Blick, ob Ihr Plan vollständig besetzt ist, bevor die Woche beginnt.

### Terminkonflikte {#scheduling-conflicts}
Ist ein Freiwilliger zwei Positionen zugewiesen, die sich im selben Plan zeitlich überschneiden, markiert die Prüfung den Konflikt -- zum Beispiel *„Jane Smith: Terminkonflikt zwischen Worship Leader und Children's Check-in während Sunday Service.“* So fallen Doppelbuchungen auf, bevor sie zu einem Problem am Sonntagmorgen werden.

### Sperrtermine {#blockout-dates}
Freiwillige können in der B1-App Termine angeben, an denen sie nicht verfügbar sind. Ist jemand einem Plan zugewiesen, der in einen seiner Sperrtermine fällt, zeigt der Prüfbereich den Konflikt automatisch an, damit Sie einen Ersatz finden können.

Gesperrte Freiwillige werden auch bei der Planung markiert. Auf der Seite des Dienst-Teams und im Dialog **Position zuweisen** erhält ihr Name ein rotes Abzeichen **Nicht verfügbar**; wenn Sie darüberfahren, sehen Sie die Termine (zum Beispiel *Gesperrt: Nov 22, 2026 – Nov 29, 2026*). Im Dialog **Position zuweisen** stehen sie nach allen anderen Mitgliedern des Teams, und Sie können sie dennoch zuweisen. Im Raster [Planübersicht](./plans-overview.md) kennzeichnet ein kleines rotes Kalendersymbol neben einem Namen denselben Sachverhalt.

Für Freiwillige, die die App nicht nutzen, können Mitarbeitende Sperrtermine für sie eintragen. Öffnen Sie das Team (über die Liste **Dienst-Teams** des Dienstbereichs) und scrollen Sie zur Karte **Sperrtermine** unterhalb der Mitgliederliste. Dort sehen Sie die kommenden Sperrtermine jedes Teammitglieds mit **Teammitglied**, **Von** und **Bis**:

1. Klicken Sie auf **Sperrtermin hinzufügen**.
2. Wählen Sie das **Teammitglied** aus und legen Sie das Datum **Von** und **Bis** fest.
3. Klicken Sie auf **Speichern**.

Um einen Sperrtermin zu entfernen, klicken Sie in seiner Zeile auf das Löschsymbol und bestätigen Sie. Das Hinzufügen und Entfernen von Sperrterminen erfordert die Berechtigung, Pläne zu bearbeiten; alle anderen, die das Team öffnen, sehen nur die Liste.

### Konflikte über mehrere Pläne hinweg {#cross-plan-conflicts}
Die Prüfung betrachtet auch alle Ihre Pläne gleichzeitig. Ist dieselbe Person in zwei verschiedenen Plänen eingeplant, die sich zeitlich überschneiden -- etwa ein Gottesdienst um 9 Uhr und einer um 10 Uhr, die beide bis 10:30 Uhr laufen --, markiert B1 Admin diese Person als doppelt gebucht über mehrere Pläne hinweg.

### Einplanungspräferenzen {#scheduling-preferences}
Hat ein Freiwilliger [Einplanungspräferenzen](./plans.md#scheduling-preferences) festgelegt, warnt der Bereich, wenn eine Zuweisung dagegen verstößt: wenn er in diesem Monat häufiger eingeplant ist als seine **Maximale Anzahl pro Monat**, wenn keine der Zeiten des Plans zu seinen **Bevorzugten Gottesdienstzeiten** passt oder wenn er nicht am selben Tag wie sein Haushalt dienen möchte und ein Haushaltsmitglied ebenfalls eingeplant ist.

Ist alles in Ordnung, zeigt der Bereich **Plan ist gültig.** an.

:::tip
Sie müssen nichts tun, damit die Prüfung läuft -- sie aktualisiert sich automatisch, jedes Mal wenn Sie eine Zuweisung hinzufügen oder ändern. Behalten Sie den Bereich einfach im Blick, während Sie den Plan erstellen.
:::

## Freiwillige benachrichtigen {#notifying-volunteers}

Sobald Ihr Plan steht, können Sie alle zugewiesenen Freiwilligen direkt aus dem Prüfbereich gemeinsam benachrichtigen.

1. Öffnen Sie den Plan und klicken Sie auf **Dienst-Team verwalten** (oder auf **Prüfen** in der Zusammenfassungszeile des Plans), um den Bereich **Prüfung** zu sehen.
2. Gibt es noch nicht benachrichtigte Freiwillige, sehen Sie einen Link mit der Anzahl, die benachrichtigt werden müssen (z. B. *„8 Freiwillige benachrichtigen“*). Sobald alle benachrichtigt wurden, zeigt der Bereich **Alle Freiwilligen benachrichtigt.** an.
3. Klicken Sie auf den Link, um Push-Benachrichtigungen an alle zu senden, die noch nicht benachrichtigt wurden.
4. Die Freiwilligen erhalten auf ihrem Telefon eine Benachrichtigung, dass sie eingeplant wurden, und werden gebeten, ihre Zuweisung zu bestätigen.

:::info
Nur Freiwillige, die noch nicht benachrichtigt wurden, werden berücksichtigt. Wenn Sie später jemanden zum Plan hinzufügen, erscheint der Link erneut, sodass Sie nur die neue Person benachrichtigen können, ohne das übrige Team erneut anzuschreiben.
:::

### Einen vorläufig eingeplanten Plan veröffentlichen {#publishing-a-penciled-in-plan}

Ist der Plan [vorläufig eingeplant](./plans.md#plan-settings), können Freiwillige ihre Zuweisungen noch nicht sehen, und der Bereich zeigt *„Vorläufig eingeplant -- Freiwillige können diese Zuweisungen noch nicht sehen.“* mit einer Schaltfläche anstelle des Benachrichtigungslinks:

- **Plan veröffentlichen** macht die Zuweisungen sichtbar.
- **Veröffentlichen und benachrichtigen** (wird angezeigt, wenn einige Freiwillige noch nicht benachrichtigt wurden, z. B. *„Veröffentlichen und benachrichtigen (8 Freiwillige)“*) macht die Zuweisungen sichtbar und benachrichtigt diese Freiwilligen sofort.

Bestätigen Sie im Dialog, um zu veröffentlichen.

### Pläne mit einem Bestätigungs-Workflow {#plans-with-a-confirmation-workflow}

Nennen die Einstellungen des Plans einen [Bestätigungs-Workflow](./workflows.md#serving-assignment-confirmations), zeigt der Bereich *„Neue Anfragen verwenden den Bestätigungs-Workflow. App-Benachrichtigungen bleiben aktiv. Nachfassaktionen enden, sobald jede Anfrage angenommen oder abgelehnt wird.“* In diesem Fall gilt:

- Der Benachrichtigungslink zählt nur Freiwillige, die noch nicht benachrichtigt wurden und noch nicht geantwortet haben.
- Ein Klick darauf sendet die übliche In-App-Benachrichtigung und legt für jede Anfrage eine Karte auf dem Board des Workflows an. Der Workflow versendet dann die E-Mail- und SMS-Erinnerungen und übergibt die Anfrage bei Bedarf an eine Person, die anrufen soll.
- Der Plan muss veröffentlicht (nicht vorläufig eingeplant) und der Workflow muss aktiv sein. Andernfalls zeigt der Bereich *„Anfragen konnten nicht versendet werden. Prüfen Sie, ob der ausgewählte Workflow aktiv und der Plan veröffentlicht ist, und versuchen Sie es dann erneut.“*

:::warning
Damit Freiwillige Push-Benachrichtigungen erhalten, müssen sie die B1-App auf ihrem Startbildschirm installiert und Benachrichtigungen aktiviert haben. Anleitung zur Einrichtung finden Sie unter [Als App installieren (PWA)](../../b1-church/getting-started/installing-pwa.md).
:::

## Verwandte Artikel {#related-articles}

- [Dienstpläne](./plans.md)
- [Workflows](./workflows.md)
- [Die B1.church-PWA installieren](/docs/b1-church/getting-started/installing-pwa)
