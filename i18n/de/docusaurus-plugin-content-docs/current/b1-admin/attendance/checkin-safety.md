---
title: "Check-In-Sicherheit"
---

# Check-In-Sicherheit

<div class="article-intro">

B1 enthält eine Reihe von Kindersicherheitskontrollen für Check-ins: Raumkapazitätsgrenzen und Freiwilligenanzahl-zu-Kind-Verhältnisse, Alters- und Klassenstufen-Hinweise am Kiosk, Check-in-Typen, die Mitglieder, Gäste und Freiwillige unterscheiden, und eine Liste vertrauenswürdiger Abhol-Personen pro Haushalt, die beim Auschecken überprüft wird. Diese Seite zeigt, wie Sie jede Sicherheitsfunktion in B1 Admin konfigurieren.

</div>

<div class="prereqs">
<h4>Bevor Sie beginnen</h4>

- Richten Sie Ihre [Anwesenheitsstruktur](setup.md) und [Check-in-Kioske](check-in.md) ein
- Räume sind [Gruppen](../groups/creating-groups.md), die mit Gottesdienstzeiten verknüpft sind — die folgenden Sicherheitseinstellungen befinden sich auf der Gruppe
- Das Benachrichtigen von Eltern und Notfall-Broadcast erfordern einen verbundenen Texting-Anbieter ([Text In Church](../integrations/services/text-in-church), [Clearstream](../integrations/services/clearstream) oder Mutual Ministry)

</div>

## Raumkapazität und Raumschließung

Jeder Check-in-Raum (Gruppe) kann seine eigenen Limits durchsetzen. Öffnen Sie die Gruppe, klicken Sie auf das **Bleistiftsymbol**, um ihre Einstellungen zu bearbeiten, und finden Sie den Bereich **Check-In-Kapazität**:

- **Kapazität** -- Die maximale Anzahl von Personen, die auf einmal zu diesem Raum eingecheckt werden können. Wenn der Raum voll ist, wird der Check-in blockiert und der Kiosk nennt den vollen Raum.
- **Gästekapazität** -- Ein optionales separates Limit für die Anzahl der Gäste, die der Raum halten kann.
- **Für Check-In geschlossen** -- Setzen Sie auf **Ja**, um alle Check-ins zu diesem Raum sofort zu stoppen (z. B. wenn eine Klasse ausfällt oder ein Raum nicht verfügbar ist). Das Auschecken funktioniert weiterhin.

## Freiwilligenquoten

Im selben Bereich **Check-In-Kapazität** auf der Gruppe befinden sich auch Personalisierungsregeln:

- **Kinder pro Freiwilliger** -- Die maximale Anzahl von Kindern, die jeder eingecheckte Freiwillige betreuen kann (z. B. 5 bedeutet einen Freiwilligen pro fünf Kindern).
- **Mindestfreiwillige** -- Die kleinste Anzahl von Freiwilligen, die eingecheckt sein müssen, bevor Kinder zum Raum eingecheckt werden können.

Freiwillige zählen zu diesen Regeln, wenn sie sich mit dem Typ **Freiwilliger** am Kiosk einchecken (siehe [Check-In-Typen](#check-in-typen) unten).

### Warnen oder Blockieren wählen

Wie streng Quoten durchgesetzt werden, ist eine kirchenweite Einstellung:

1. Gehen Sie in B1 Admin zu **Einstellungen > Gemeinde verwalten** und öffnen Sie die **Check-In**-Kachel.
2. Legen Sie **Durchsetzung des Freiwilligenverhältnisses** fest:
   - **Warnen (mit Bestätigung erlauben)** -- Der Kiosk zeigt eine Warnung, wenn ein Raum über Quote oder unter seinen Mindestfreiwilligen liegt, und ein Mitarbeiter kann bestätigen, um trotzdem fortzufahren. Dies ist die Standard.
   - **Blockieren (Check-in verhindern)** -- Der Check-in zum Raum wird verweigert, bis genug Freiwillige eingecheckt sind.

:::info
Kapazität und Geschlossen für Check-In sind immer harte Grenzen — die Warn-/Blockierungsauswahl gilt nur für Freiwilligenquoten.
:::

## Check-In-Typen

Jeder Check-in registriert, ob die Person ein **Mitglied**, ein **Gast** oder ein **Freiwilliger** ist. Der Typ wird mit Chips auf dem Haushalt-Bildschirm des Kiosks ausgewählt (Mitglied ist die Standard). Typen bedienen die Sicherheitsregeln — Freiwillige bieten Quotenabdeckung, und Gäste zählen gegen die Gästekapazität des Raums.

## Alters- und Klassenstufen-Raumführung

Sie können jedem Raum Alters- oder Klassenstufen-Grenzen geben, damit der Kiosk Familien zu passenden Räumen leitet:

- Verwenden Sie in den Gruppeneinstellungen den Bereich **Alter & Klassenstufe**, um das Mindest-/Maximalter (Jahre und Monate) und/oder die Klassenstufe für den Raum festzulegen.
- Am Kiosk werden Räume, für die ein Kind qualifiziert ist, hervorgehoben, und Räume, für die nicht, werden abgeblendet. Ein abgedimmter Raum kann immer noch mit einer Mitarbeiterbestätigung ausgewählt werden — die Führung blockiert niemals hart.

Klassenstufen werden an Ihrem Gemeinde-**Klassenstufenförderungsdatum** umgestellt:

1. Gehen Sie in B1 Admin zu **Einstellungen > Gemeinde verwalten** und öffnen Sie die Klassenstufenförderungs-Kachel.
2. Legen Sie den Monat und Tag fest, an dem Ihre Gemeinde Schüler befördert (z. B. 1. August). Altersangaben und Klassenstufen am Kiosk werden zum letzten Förderungsdatum berechnet.

## Vertrauenswürdige und nicht autorisierte Abholpersonen

Jeder Haushalt kann eine Liste von Personen führen, die — oder nicht — berechtigt sind, seine Kinder abzuholen.

1. Öffnen Sie die Seite einer Person in **Personen** und finden Sie die **Abholungs**-Karte.
2. Klicken Sie auf **Hinzufügen**. Suchen Sie nach einer vorhandenen Person, oder fügen Sie jemanden hinzu, der nicht im System ist, indem Sie seinen **Namen**, **Beziehung** und ein Foto eingeben.
3. Legen Sie den **Status** fest:
   - **Vertrauenswürdig** -- Beim Auschecken erscheint diese Person als tippbare Abholungs-Karte mit ihrem Foto, was einen überprüften Abholer schnell macht.
   - **Nicht autorisiert** -- Wenn jemand bei dieser Name versucht, abzuholen, blockiert der Kiosk das Auschecken mit einer Warnung. Ein Mitarbeiter kann es überschreiben, und die Überschreibung wird im Anwesenheitsdatensatz aufgezeichnet.

Klicken Sie auf die Status-Chip einer Person auf der Karte, um zwischen Vertrauenswürdig und Nicht autorisiert umzuschalten.

:::tip
Fügen Sie vertrauenswürdigen Abholpersonen nach Möglichkeit Fotos hinzu — der Auschecken-Bildschirm zeigt das Foto an, damit Freiwillige die Person vor ihnen visuell überprüfen können.
:::

## Eltern benachrichtigen und Notfall-Broadcast

Beide Funktionen senden Textnachrichten über den Texting-Anbieter Ihrer Gemeinde — es gibt keinen integrierten SMS-Service, daher muss zuerst einer der unterstützten Anbieter konfiguriert werden.

- **Eltern benachrichtigen** -- Von der Auschecken-Bildschirm eines bemannten Kiosks können Mitarbeiter einen eingecheckten Kindergrundschulkinder die Eltern/Erziehungsberechtigten (z. B. „Bitte kommen Sie zur Kindertagesstätte") texten.
- **Notfall-Broadcast** -- Von den Admin-Einstellungen des Kiosks können Mitarbeiter jeden eingecheckten Haushalt für den ausgewählten Gottesdienst auf einmal die Erziehungsberechtigten texten. Das Senden erfordert das Eingeben von **EMERGENCY**, um zu bestätigen.

Personen, die sich aus Texten abgemeldet haben oder keine Mobiltelefonnummer in der Datei haben, werden automatisch übersprungen — der Kiosk zeigt, wie viele Nachrichten gesendet und wie viele übersprungen wurden.

Weitere Informationen finden Sie in der Kiosk-Navigation in [Auschecken & Kindersicherheit](../../b1-checkin/check-in/checking-out).

## Verwandte Artikel

- [Check-In](check-in.md) — Kiosk-Einrichtung und Hardware
- [Auschecken & Kindersicherheit](../../b1-checkin/check-in/checking-out) — der Kiosk-Auschecken, Abholungsüberprüfung und Benachrichtigungsflows
- [Gruppen erstellen](../groups/creating-groups.md) — wo die Raumeinstellungen sind
- [Anwesenheitseinrichtung](setup.md) — Gottesdienste, Gottesdienstzeiten und Raumzuweisungen
