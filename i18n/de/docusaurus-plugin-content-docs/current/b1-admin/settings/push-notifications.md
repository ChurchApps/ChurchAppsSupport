---
title: "Push-Benachrichtigungen"
description: "Push-Benachrichtigungen an alle mit der App Ihrer Gemeinde oder an eine Gruppe aus B1 Admin senden oder planen und anschließend bearbeiten, senden, abbrechen oder entfernen."
---

# Push-Benachrichtigungen

<div class="article-intro">

Die Seite **Push-Benachrichtigungen** unter **Mobile** erlaubt es Ihnen, eine Push-Benachrichtigung an alle zu senden, die die App Ihrer Gemeinde nutzen, oder an die Mitglieder einer Gruppe, sofort oder zu einem Zeitpunkt Ihrer Wahl. Die Seite listet alles Geplante auf, sodass Sie eine Benachrichtigung bearbeiten, sofort senden oder abbrechen können, bevor sie verschickt wird. Außerdem zeigt sie den Verlauf der letzten Benachrichtigungen, den Sie leeren können.

</div>

<div class="prereqs">
<h4>Bevor Sie beginnen</h4>

- Um an **Alle mit der App** zu senden, benötigen Sie die Berechtigung, Inhalte zu bearbeiten. Um an eine Gruppe zu senden, benötigen Sie die Berechtigung, Gruppenmitglieder zu bearbeiten. Siehe [Rollen & Berechtigungen](./roles-permissions.md).
- Mitglieder erhalten Pushes erst, nachdem sie [die App Ihrer Gemeinde installiert](../../b1-church/getting-started/installing-pwa.md) und Benachrichtigungen erlaubt haben.

</div>

## Die Seite öffnen

Gehen Sie in B1 Admin zu **Mobile** und klicken Sie auf **Push-Benachrichtigungen**. Die Seite hat eine Karte **Geplant** und eine Karte **Letzte**. Zeitangaben auf der Seite beziehen sich auf die Zeitzone Ihrer Gemeinde (oder auf die Ihres Computers, falls die Gemeinde keine festgelegt hat). Die Zeitzone wird oberhalb der Liste der Geplanten genannt.

## Eine Benachrichtigung senden oder planen

1. Klicken Sie auf **Benachrichtigung senden**.
2. Wählen Sie die **Zielgruppe**: **Alle mit der App** oder eine Ihrer Gruppen. Sie sehen nur die Auswahl, die Ihre Berechtigungen erlauben.
3. B1 zeigt an, wie viele Personen der Push erreichen wird, zum Beispiel *42 von 60 Personen, die die App nutzen, haben Push aktiviert*, und wie viele Push ausgeschaltet haben. Sie selbst sind vom eigenen Push ausgenommen.
4. Wählen Sie unter **Wann** entweder **Jetzt senden** oder **Später senden** und legen Sie ein **Senden am**-Datum und eine Uhrzeit in der Zukunft fest.
5. Geben Sie einen **Titel** (bis zu 80 Zeichen) und eine **Nachricht** (bis zu 240 Zeichen) ein.
6. Fügen Sie optional einen **Link zum Öffnen oder Flyer-URL** (eine `https`-Adresse oder ein App-Pfad wie `/mobile/groups`) hinzu, den der Push beim Antippen öffnet, und eine **Bild-URL** (eine `https`-Adresse), die zusammen mit dem Push angezeigt wird.
7. Klicken Sie auf **Benachrichtigung senden** (oder **Benachrichtigung planen**).

Bei einem geplanten Push werden die erreichbaren Personen beim Versand erneut geprüft. Wer in der Zwischenzeit einer Gruppe beitritt oder Benachrichtigungen einschaltet, wird also berücksichtigt.

Sie können auch von der Seite einer Gruppe aus über **Benachrichtigen** an eine Gruppe senden. Siehe [Push-Benachrichtigungen an Gruppenmitglieder senden](../groups/group-members.md#sending-push-notifications-to-group-members).

:::tip
Hat ein Push keinen Link, öffnet ein Antippen bei einem gemeindeweiten Push die Benachrichtigungsliste der App und bei einem Gruppen-Push die Seite der Gruppe.
:::

## Geplante Benachrichtigungen verwalten

Die Karte **Geplant** listet jede Benachrichtigung, die noch auf den Versand wartet, mit ihrer Zeit **Senden am**, der **Zielgruppe**, dem Titel und der Nachricht. Für jede können Sie:

- **Bearbeiten** -- die Zielgruppe, die Zeit oder den Text ändern und anschließend auf **Änderungen speichern** klicken.
- **Jetzt senden** -- sie sofort senden, statt zu warten.
- **Abbrechen** -- den Versand verhindern. Eine abgebrochene Benachrichtigung wandert in die Karte Letzte.

Eine Benachrichtigung, die gerade versendet wird, zeigt **Wird gesendet** und kann nicht mehr geändert werden.

## Letzte Benachrichtigungen

Die Karte **Letzte** listet Benachrichtigungen, die versendet wurden oder angehalten wurden, jeweils mit einem **Status**:

| Status | Bedeutung |
|--------|-----------|
| **Gesendet: X von Y** | Der Push wurde versendet. *Y* Personen hätten ihn erhalten können, *X* haben ihn als Push-Benachrichtigung bekommen. |
| **Verpasst (Sendezeit abgelaufen)** | Die Benachrichtigung war mehr als 30 Minuten überfällig, als B1 sie senden wollte. Daher wurde sie nicht gesendet. |
| **Fehlgeschlagen** | Der Versand ist dreimal gescheitert. Der Fehler wird unter dem Status angezeigt. |
| **Abgebrochen** | Jemand hat sie abgebrochen, bevor sie versendet wurde. |

Um eine Benachrichtigung aus der Liste zu entfernen, klicken Sie in ihrer Zeile auf **Entfernen**. Um die Liste zu leeren, klicken Sie oben auf der Karte auf **Alle löschen**. Dies entfernt jede gesendete, fehlgeschlagene und abgebrochene Benachrichtigung, die Sie verwalten dürfen. Beide Aktionen verlangen eine Bestätigung, und keine lässt sich rückgängig machen. Das Entfernen einer Benachrichtigung nimmt sie Personen, die sie bereits erhalten haben, nicht wieder weg.

:::info
Mitglieder, die in ihren [Benachrichtigungseinstellungen](../../b1-church/getting-started/notification-preferences.md) **Gemeinde-Ankündigungen** abgeschaltet haben, erhalten diese Pushes nicht, egal ob sie an alle oder an eine Gruppe gesendet werden.
:::

## Verwandte Artikel

- [Einstellungen der mobilen App](./mobile-app.md)
- [Gruppenmitglieder](../groups/group-members.md)
- [Rollen & Berechtigungen](./roles-permissions.md)
- [Benachrichtigungseinstellungen](../../b1-church/getting-started/notification-preferences.md)
