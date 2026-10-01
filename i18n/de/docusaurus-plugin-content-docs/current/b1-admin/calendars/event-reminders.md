---
title: "Erinnerungen zu Veranstaltungen"
---
# Erinnerungen zu Veranstaltungen

<div class="article-intro">

Veranstaltungserinnerungen benachrichtigen automatisch die richtigen Personen, bevor eine Veranstaltung stattfindet -- zum Beispiel: „Nicht verpassen! Der Workshop für Pflegekräfte beginnt morgen um 9:00 Uhr." Sie richten eine Erinnerung einmal für die Veranstaltung ein, und B1 versendet sie planmäßig über Push-Benachrichtigungen und E-Mail. Mitglieder können in ihren eigenen [Benachrichtigungseinstellungen](../../b1-church/getting-started/notification-preferences) festlegen, welche Erinnerungen sie erhalten.

</div>

<div class="prereqs">
<h4>Bevor Sie beginnen</h4>

- Erstellen Sie die Veranstaltung, an die Sie erinnern möchten (siehe [Kalender erstellen](creating-calendars))
- Um angemeldete Teilnehmende zu erreichen, [aktivieren Sie die Anmeldung](creating-calendars) für die Veranstaltung
- Um eine ganze Gruppe zu erreichen, stellen Sie sicher, dass die Veranstaltung zu einer [Gruppe](../groups/creating-groups) mit Mitgliedern gehört

</div>

## Eine Erinnerung einrichten

Erinnerungen konfigurieren Sie im Bereich **Erinnerungen** der Veranstaltung.

- Wenn Sie eine **neue Veranstaltung erstellen**, öffnen Sie den Bereich **Erinnerungen** im Veranstaltungseditor, bevor Sie speichern.
- Bei einer **bestehenden Veranstaltung** öffnen Sie die Seite **Anmeldedetails** der Veranstaltung (über den Bereich **Anmeldungen**), um die Erinnerung hinzuzufügen oder zu ändern.

1. Aktivieren Sie **Erinnerungen aktivieren**.
2. Wählen Sie **Wann** gesendet werden soll. Wählen Sie bis zu drei Zeitpunkte: **7 Tage vorher**, **3 Tage vorher**, **1 Tag vorher** und **Am Tag selbst**.
3. Legen Sie die **Tageszeit** fest, zu der die Erinnerung verschickt werden soll (Standard ist **9:00 Uhr**, in der lokalen Zeitzone Ihrer Gemeinde).
4. Wählen Sie, **wer** erinnert werden soll (siehe [Wer wird erinnert](#who-gets-reminded) unten).
5. Fügen Sie optional eine **Nachricht** hinzu. Lassen Sie sie leer, um den Standardtext zu verwenden, oder schreiben Sie Ihren eigenen -- Sie können `{{eventTitle}}` einfügen, was durch den Namen der Veranstaltung ersetzt wird.
6. Wählen Sie die **Kanäle**: **Push**-Benachrichtigung, **E-Mail** oder beides.
7. Speichern Sie die Veranstaltung.

Während Sie Änderungen vornehmen, zeigt eine **Live-Vorschau** ungefähr, wie viele Personen erinnert werden, wie viele Teilnehmende nicht erreicht werden können und die nächsten geplanten Versandzeiten -- so können Sie vor dem Speichern prüfen, ob die Erinnerung stimmt.

## Wer wird erinnert

Die Einstellung **Wer** legt fest, an wen die Erinnerung geht:

- **Nur Angemeldete** -- Alle für die Veranstaltung angemeldeten Personen, die mit einem Personendatensatz verknüpft sind. Dies ist die Standardeinstellung, wenn für die Veranstaltung die Anmeldung aktiviert ist, damit eine Erinnerung für eine kleine Veranstaltung mit Anmeldung nicht versehentlich an eine ganze Gruppe geht.
- **Nur Haushaltsvorstände / Anmeldende** -- Eine Erinnerung pro Anmeldung (an die Person, die sich angemeldet hat), statt an jedes Familienmitglied der Anmeldung.
- **Gruppenmitglieder** -- Alle in der Gruppe der Veranstaltung. Dies ist die Standardeinstellung, wenn die Veranstaltung keine Anmeldung verwendet.
- **Automatisch** -- Verwendet die Angemeldeten, wenn die Anmeldung aktiviert ist, andernfalls die Gruppe.

:::info
Gäste, die nur namentlich hinzugefügt wurden (ohne verknüpften Personendatensatz), können keine Erinnerung erhalten, da es kein Konto, kein Gerät und keine E-Mail-Adresse gibt, an die gesendet werden könnte. Die Vorschau zeigt Ihnen, wie viele Teilnehmende in diese Gruppe fallen, damit es keine Überraschungen gibt. Mitglieder, die der Kommunikation widersprochen haben, werden ebenfalls übersprungen.
:::

## Wann Erinnerungen gesendet werden

- Erinnerungen werden zur **von Ihnen gewählten Tageszeit** in der lokalen Zeitzone Ihrer Gemeinde zu jedem der ausgewählten Zeitpunkte ausgelöst.
- Wenn Sie **Datum oder Uhrzeit der Veranstaltung ändern**, werden die ausstehenden Erinnerungen automatisch neu geplant -- Sie müssen die Erinnerung nicht bearbeiten.
- Wenn Sie **die Veranstaltung löschen** (oder einen einzelnen Termin einer wiederkehrenden Veranstaltung absagen), werden deren ausstehende Erinnerungen automatisch storniert.
- Wiederkehrende Veranstaltungen werden automatisch behandelt: Jeder bevorstehende Termin erhält seine eigene Erinnerung.

:::tip
Erinnerungen werden **zuerst per Push gesendet, mit E-Mail als Rückfalloption**. Wenn ein Mitglied Push-Benachrichtigungen aktiviert hat, erhält es eine Push-Nachricht; andernfalls erhält es stattdessen eine E-Mail. Mitglieder wählen in ihren [Benachrichtigungseinstellungen](../../b1-church/getting-started/notification-preferences) pro Benachrichtigungstyp aus, welche Kanäle sie wünschen.
:::

## Was Mitglieder steuern können

Erinnerungen berücksichtigen immer die [Benachrichtigungseinstellungen](../../b1-church/getting-started/notification-preferences) des jeweiligen Mitglieds. Ein Mitglied kann:

- **Veranstaltungserinnerungen** für Push oder E-Mail deaktivieren und andere Benachrichtigungen aktiviert lassen.
- **Ruhezeiten** festlegen, damit nicht dringende Benachrichtigungen bis zu einer angemessenen Zeit warten.

Sie können die Entscheidung eines Mitglieds, Veranstaltungserinnerungen abzubestellen, nicht übergehen -- so bleibt B1 konform mit den Anti-Spam-Vorschriften und Mitglieder behalten die Kontrolle über ihren Posteingang.

## Erinnerungen für Dienste

Freiwillige, die in einem Plan eingeteilt sind, erhalten eine separate **Diensterinnerung** mit den Plandetails und, sofern sie noch nicht geantwortet haben, den Schaltflächen **Annehmen / Ablehnen** direkt in der E-Mail. Diese Erinnerungen werden am Plantyp konfiguriert und nicht an einem Kalendertermin -- siehe [Freiwillige am Sonntag](../guides/sunday-volunteers) für die Funktionsweise von Einteilung und Erinnerungen für Freiwillige.

## Nächste Schritte

- [Benachrichtigungseinstellungen](../../b1-church/getting-started/notification-preferences) -- Was Mitglieder steuern können
- [Anleitung zur Veranstaltungsanmeldung](../guides/event-registration) -- Anmeldung einrichten, damit Erinnerungen Teilnehmende erreichen
- [Kalender erstellen](creating-calendars) -- Zurück zur Kalendereinrichtung