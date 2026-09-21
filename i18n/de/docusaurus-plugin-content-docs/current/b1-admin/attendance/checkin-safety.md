---
title: # Check-In Sicherheit
---
<div class="article-intro">

B1 enthält eine Reihe von Kinderschutzfunktionen für den Check-in: Kapazitätsgrenzen für Räume und Betreuer-Kind-Verhältnisse, Alters- und Klassenstufenhinweise am Kiosk, Check-in-Typen zur Unterscheidung von Mitgliedern, Gästen und Mitarbeitenden sowie eine Liste vertrauenswürdiger Abholberechtigter pro Haushalt, die beim Check-out überprüft wird. Diese Seite erklärt, wie Sie jede Sicherheitsfunktion in B1 Admin konfigurieren.

</div>

<div class="prereqs">
<h4>Bevor Sie beginnen</h4>

- Richten Sie Ihre [Anwesenheitsstruktur](setup.md) und [Check-in-Kioske](check-in.md) ein
- Räume sind [Gruppen](../groups/creating-groups.md), die mit Gottesdienstzeiten verknüpft sind — die untenstehenden Sicherheitseinstellungen befinden sich in der Gruppe
- Elternruf und Notfall-Rundruf erfordern einen verbundenen SMS-Anbieter ([Text In Church](../integrations/services/text-in-church), [Clearstream](../integrations/services/clearstream) oder Mutual Ministry)

</div>

## Raumkapazität und Schließen eines Raums

Jeder Check-in-Raum (jede Gruppe) kann eigene Grenzwerte durchsetzen. Öffnen Sie die Gruppe, klicken Sie auf das **Stiftsymbol**, um die Einstellungen zu bearbeiten, und suchen Sie den Abschnitt **Check-In Capacity**:

- **Capacity** -- Die maximale Anzahl an Personen, die gleichzeitig in diesem Raum eingecheckt sein können. Wenn der Raum voll ist, wird der Check-in dorthin blockiert und der Kiosk nennt den vollen Raum.
- **Guest Capacity** -- Eine optionale separate Obergrenze dafür, wie viele Gäste der Raum aufnehmen kann.
- **Closed for Check-In** -- Auf **Yes** setzen, um alle Check-ins in diesen Raum sofort zu stoppen (zum Beispiel, wenn eine Klasse ausfällt oder ein Raum nicht verfügbar ist). Check-outs funktionieren weiterhin.

## Betreuungsschlüssel

Derselbe Abschnitt **Check-In Capacity** in der Gruppe enthält Personalregeln:

- **Children per Volunteer** -- Die maximale Anzahl an Kindern, die jede eingecheckte Mitarbeiterin bzw. jeder eingecheckte Mitarbeiter betreuen kann (z. B. bedeutet 5 eine Betreuungsperson pro fünf Kinder).
- **Minimum Volunteers** -- Die kleinste Anzahl an Mitarbeitenden, die eingecheckt sein müssen, bevor Kinder in den Raum einchecken können.

Mitarbeitende zählen für diese Regeln, wenn sie sich am Kiosk mit dem Typ **Volunteer** einchecken (siehe [Check-in-Typen](#check-in-types) unten).

### Warnen oder Blockieren wählen

Wie streng die Betreuungsschlüssel durchgesetzt werden, ist eine gemeindeweite Einstellung:

1. Gehen Sie in B1 Admin zu **Settings > Manage Church** und öffnen Sie die Kachel **Check-In**.
2. Legen Sie **Volunteer Ratio Enforcement** fest:
   - **Warn (allow with confirmation)** -- Der Kiosk zeigt eine Warnung an, wenn ein Raum den Betreuungsschlüssel überschreitet oder die Mindestanzahl an Mitarbeitenden unterschreitet, und eine Mitarbeiterin bzw. ein Mitarbeiter kann den Vorgang trotzdem bestätigen. Dies ist die Standardeinstellung.
   - **Block (prevent check-in)** -- Der Check-in in den Raum wird verweigert, bis genügend Mitarbeitende eingecheckt sind.

:::info
Capacity und Closed for Check-In sind immer harte Grenzen — die Auswahl zwischen Warnen und Blockieren gilt nur für Betreuungsschlüssel.
:::

## Check-in-Typen

Bei jedem Check-in wird erfasst, ob die Person ein **Member**, ein **Guest** oder ein **Volunteer** ist. Der Typ wird über Chips auf dem Haushaltsbildschirm des Kiosks ausgewählt (Member ist die Standardeinstellung). Die Typen fließen in die Sicherheitsregeln ein — Mitarbeitende sorgen für die Abdeckung des Betreuungsschlüssels, und Gäste werden auf die Guest Capacity des Raums angerechnet.

## Alters- und Klassenstufenhinweise für Räume

Sie können jedem Raum Alters- oder Klassenstufengrenzen zuweisen, damit der Kiosk Familien zu passenden Räumen leitet:

- Verwenden Sie in den Einstellungen der Gruppe den Abschnitt **Age & Grade**, um das Mindest-/Höchstalter (Jahre und Monate) und/oder die Klassenstufe für den Raum festzulegen.
- Am Kiosk werden Räume, für die ein Kind infrage kommt, hervorgehoben, und Räume, für die es nicht infrage kommt, ausgegraut. Ein ausgegrauter Raum kann mit einer Bestätigung durch Mitarbeitende dennoch gewählt werden — der Hinweis blockiert nie vollständig.

Klassenstufen werden zum **Klassenstufen-Aufstiegsdatum** Ihrer Gemeinde umgestellt:

1. Gehen Sie in B1 Admin zu **Settings > Manage Church** und öffnen Sie die Kachel für den Klassenstufenaufstieg.
2. Legen Sie Monat und Tag fest, an dem Ihre Gemeinde Schülerinnen und Schüler versetzt (zum Beispiel 1. August). Alter und Klassenstufen am Kiosk werden zum jeweils letzten Aufstiegsdatum berechnet.

## Vertrauenswürdige und nicht autorisierte Abholberechtigte

Jeder Haushalt kann eine Liste von Personen führen, die seine Kinder abholen dürfen — oder eben nicht.

1. Öffnen Sie die Seite einer Person unter **People** und suchen Sie die Karte **Pickup**.
2. Klicken Sie auf **Add**. Suchen Sie nach einer vorhandenen Person oder fügen Sie jemanden hinzu, der nicht im System ist, indem Sie **Name**, **Relationship** und ein Foto eingeben.
3. Legen Sie den **Status** fest:
   - **Trusted** -- Beim Check-out erscheint diese Person als antippbare Abholkarte mit Foto, was eine schnelle, verifizierte Abholung ermöglicht.
   - **Not Authorized** -- Wenn jemand unter diesem Namen eine Abholung versucht, blockiert der Kiosk den Check-out mit einer Warnung. Mitarbeitende können dies übergehen, und die Übersteuerung wird im Anwesenheitsdatensatz festgehalten.

Klicken Sie auf den Status-Chip einer Person auf der Karte, um zwischen Trusted und Not Authorized zu wechseln.

:::tip
Fügen Sie vertrauenswürdigen Abholberechtigten nach Möglichkeit immer Fotos hinzu — der Check-out-Bildschirm zeigt das Foto an, damit Mitarbeitende die vor ihnen stehende Person visuell überprüfen können.
:::

## Elternruf und Notfall-Rundruf

Beide Funktionen versenden SMS über den verbundenen SMS-Anbieter Ihrer Gemeinde — es gibt keinen integrierten SMS-Dienst, daher muss zuerst einer der unterstützten Anbieter konfiguriert werden.

- **Elternruf** -- Vom Check-out-Bildschirm eines besetzten Kiosks aus können Mitarbeitende den Eltern/Erziehungsberechtigten eines eingecheckten Kindes eine SMS senden (zum Beispiel: „Bitte kommen Sie in die Kinderbetreuung").
- **Notfall-Rundruf** -- Über die Admin-Einstellungen des Kiosks können Mitarbeitende allen Erziehungsberechtigten der eingecheckten Haushalte für den ausgewählten Gottesdienst gleichzeitig eine SMS senden. Zum Senden muss zur Bestätigung **EMERGENCY** eingegeben werden.

Personen, die dem SMS-Versand widersprochen haben oder für die keine Mobilnummer hinterlegt ist, werden automatisch übersprungen — der Kiosk meldet, wie viele Nachrichten gesendet und wie viele übersprungen wurden.

Die Anleitung aus Kiosk-Sicht finden Sie unter [Check-out & Kindersicherheit](../../b1-checkin/check-in/checking-out).

## Verwandte Artikel

- [Check-in](check-in.md) — Kiosk-Einrichtung und Hardware
- [Check-out & Kindersicherheit](../../b1-checkin/check-in/checking-out) — die Abläufe für Kiosk-Check-out, Abholüberprüfung und Elternruf
- [Gruppen erstellen](../groups/creating-groups.md) — wo sich die Raumeinstellungen befinden
- [Anwesenheits-Einrichtung](setup.md) — Gottesdienste, Gottesdienstzeiten und Raumzuweisungen
- [Mindestalter für private Nachrichten](../settings/mobile-app.md#member-directory--messaging-settings) — blockiert neue private Nachrichtenkonversationen mit Kindern, während sie im Verzeichnis verbleiben