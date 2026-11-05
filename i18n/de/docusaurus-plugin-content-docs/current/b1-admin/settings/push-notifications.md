---
title: "Push-Benachrichtigungen"
---

# Push-Benachrichtigungen

<div class="article-intro">

Die Seite **Push-Benachrichtigungen** lässt Sie eine Push-Benachrichtigung an alle senden, die die B1.church-App Ihrer Kirche nutzen, oder an eine einzelne Gruppe -- entweder sofort oder zu einem Zeitpunkt, den Sie festlegen. Die Seite listet außerdem die Benachrichtigungen auf, die noch versendet werden sollen, damit Sie sie bearbeiten, sofort senden oder abbrechen können, und zeigt, wie zuletzt versendete Benachrichtigungen zugestellt wurden.

</div>

<div class="prereqs">
<h4>Bevor Sie beginnen</h4>

- Um an **Alle mit der App** zu senden, benötigen Sie die Berechtigung **Inhalte bearbeiten**. Um an eine Gruppe zu senden, benötigen Sie **Gruppenmitglieder bearbeiten**. Mit einer dieser Berechtigungen erscheint die Seite **Push-Benachrichtigungen** unter **Mobil**. Siehe [Rollen und Berechtigungen](./roles-permissions.md).
- Benachrichtigungen erreichen nur Mitglieder, die die [B1.church-App](/docs/b1-church/getting-started/installing-pwa) installiert und Benachrichtigungen erlaubt haben.

</div>

## Die Seite öffnen

1. Öffnen Sie in B1 Admin das [Sprungmenü](../introduction.md#getting-around-with-the-jump-menu) (die Suchleiste oben links) und klappen Sie **Mobil** auf.
2. Klicken Sie auf **Push-Benachrichtigungen** (`/mobile/notifications`).

Alle Zeiten auf der Seite werden in der Zeitzone Ihrer Kirche angezeigt (oder in der Zeitzone Ihres Browsers, falls die Kirche keine festgelegt hat). Die Seite nennt die verwendete Zeitzone, zum Beispiel *"Zeiten sind in America/Chicago."*

## Eine Benachrichtigung senden oder planen

1. Klicken Sie oben auf der Seite auf **Benachrichtigung senden**.
2. Wählen Sie unter **Zielgruppe** entweder **Alle mit der App** oder eine Ihrer Gruppen.
3. Füllen Sie die Benachrichtigung aus:
   - **Titel** *(erforderlich)* -- Eine kurze Zusammenfassung, bis zu 80 Zeichen.
   - **Nachricht** *(erforderlich)* -- Der Text der Benachrichtigung, bis zu 240 Zeichen.
   - **Link zur App oder zum Flyer** *(optional)* -- Ein relativer App-Pfad (zum Beispiel `/mobile/groups`) oder eine vollständige `https://`-URL, die sich beim Antippen der Benachrichtigung öffnet. Ohne Link öffnet eine gemeindeweite Benachrichtigung die Benachrichtigungsliste des Mitglieds, eine Gruppenbenachrichtigung öffnet die betreffende Gruppe.
   - **Bild-URL** *(optional)* -- Ein `https://`-Bild, das auf unterstützten Geräten mit der Benachrichtigung angezeigt wird.
4. Wählen Sie unter **Wann** entweder **Jetzt senden** oder **Später senden** und wählen Sie ein **Sendedatum** und eine Uhrzeit. Der Zeitpunkt muss in der Zukunft liegen.
5. Klicken Sie auf **Benachrichtigung senden** (oder auf **Benachrichtigung planen** bei einer geplanten Benachrichtigung).

Eine Vorschau im Dialog zeigt, wie die Benachrichtigung aussehen wird und wie viele Personen sie erhalten können. Eine sofort gesendete Benachrichtigung braucht mindestens eine erreichbare Person. Eine geplante Benachrichtigung kann auch gespeichert werden, wenn noch niemand erreichbar ist, da die Empfänger beim Versand erneut geprüft werden.

Nach dem Planen bestätigt der Dialog den Sendezeitpunkt und erinnert Sie daran, dass Sie die Benachrichtigung unter **Mobil > Push-Benachrichtigungen** ansehen, bearbeiten oder abbrechen können.

:::tip
Sie können eine Benachrichtigung auch direkt von der Seite einer Gruppe über deren Schaltfläche **Benachrichtigen** an eine Gruppe senden oder planen. Siehe [Push-Benachrichtigungen an Gruppenmitglieder senden](../groups/group-members.md#sending-push-notifications-to-group-members).
:::

## Geplante Benachrichtigungen verwalten

Die Karte **Geplant** listet Benachrichtigungen auf, die noch versendet werden sollen, mit ihrer Zeit **Senden um**, der **Zielgruppe** und dem Text **Benachrichtigung**. Jede hat drei Aktionen:

- **Bearbeiten** -- Titel, Nachricht, Link, Bild oder Sendezeit ändern. Die Zielgruppe lässt sich nicht ändern; brechen Sie die Benachrichtigung in diesem Fall ab und erstellen Sie eine neue.
- **Jetzt senden** -- Sendet sie sofort, statt zu warten. Bestätigen Sie mit **Jetzt senden**.
- **Abbrechen** -- Verhindert den Versand. Bestätigen Sie mit **Benachrichtigung abbrechen**.

Wartet nichts, zeigt die Karte den Text *"Nichts ist geplant."*

## Zuletzt gesendete Benachrichtigungen prüfen

Die Karte **Kürzlich** listet Benachrichtigungen auf, die gesendet oder gestoppt wurden, mit ihrer Zeit **Gesendet am**, der **Zielgruppe**, dem Text **Benachrichtigung** und dem **Status**:

- **Gesendet: X von Y** -- Wie viele Personen der Zielgruppe erreicht wurden.
- **Fehlgeschlagen** -- Der Versand ist fehlgeschlagen, mit der Fehlermeldung. B1 versucht einen fehlgeschlagenen Versand bis zu dreimal, bevor er als fehlgeschlagen markiert wird.
- **Abgebrochen** -- Jemand hat sie abgebrochen, bevor sie versendet wurde.
- **Verpasst (der Sendezeitpunkt ist verstrichen)** -- Sie konnte nicht innerhalb von 30 Minuten nach dem Sendezeitpunkt versendet werden, daher wurde sie übersprungen statt verspätet gesendet.

## Wer eine Benachrichtigung erhält

- **Alle mit der App** erreicht jede Person Ihrer Kirche, die die B1.church-App mit erlaubten Benachrichtigungen installiert hat, außer der Person, die sie gesendet hat.
- Eine Gruppenbenachrichtigung erreicht die Mitglieder der Gruppe, die die App mit erlaubten Benachrichtigungen haben.
- Mitglieder, die in ihren [Benachrichtigungseinstellungen](/docs/b1-church/getting-started/notification-preferences) die Push-Benachrichtigungen für **Gemeindeankündigungen** ausgeschaltet haben, erhalten keine gemeindeweiten Benachrichtigungen.

## Verwandte Artikel

- [Push-Benachrichtigungen an Gruppenmitglieder senden](../groups/group-members.md#sending-push-notifications-to-group-members)
- [Einstellungen der mobilen App](./mobile-app.md)
- [Veranstaltungserinnerungen](../calendars/event-reminders.md)
- [Benachrichtigungseinstellungen](/docs/b1-church/getting-started/notification-preferences)
