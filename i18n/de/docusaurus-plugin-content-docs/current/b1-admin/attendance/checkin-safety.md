---
title: "Check-In-Sicherheit"
---

# Check-In-Sicherheit

<div class="article-intro">

B1 enthält eine Reihe von Kindersicherheitskontrollen für das Check-In: Raumkapazitätsgrenzen und Betreuer-Kind-Verhältnisse, Alters- und Klassenstufenhinweise am Kiosk, Check-In-Typen, die zwischen Mitgliedern, Gästen und ehrenamtlichen Helfern unterscheiden, sowie eine vertrauenswürdige Abholliste pro Haushalt, die beim Check-Out überprüft wird. Diese Seite beschreibt, wie Sie jede Sicherheitsfunktion in B1 Admin konfigurieren.

</div>

<div class="prereqs">
<h4>Bevor Sie beginnen</h4>

- Richten Sie Ihre [Anwesenheitsstruktur](setup.md) und [Check-In-Kioske](check-in.md) ein
- Räume sind [Gruppen](../groups/creating-groups.md), die mit Gottesdienstzeiten verknüpft sind — die unten beschriebenen Sicherheitseinstellungen befinden sich in der Gruppe
- Eltern-Aufruf (Page-a-Parent) und Notfall-Rundruf erfordern einen verbundenen SMS-Anbieter ([Text In Church](../integrations/services/text-in-church), [Clearstream](../integrations/services/clearstream) oder Mutual Ministry)

</div>

## Raumkapazität und Schließen eines Raums

Jeder Check-In-Raum (Gruppe) kann seine eigenen Grenzwerte durchsetzen. Öffnen Sie die Gruppe, klicken Sie auf das **Stift-Symbol**, um ihre Einstellungen zu bearbeiten, und suchen Sie den Bereich **Check-In-Kapazität**:

- **Kapazität** -- Die maximale Anzahl an Personen, die gleichzeitig in diesem Raum eingecheckt sein können. Wenn der Raum voll ist, wird das Einchecken blockiert und der Kiosk nennt den vollen Raum.
- **Gästekapazität** -- Eine optionale separate Obergrenze dafür, wie viele Gäste der Raum aufnehmen kann.
- **Für Check-In geschlossen** -- Auf **Ja** setzen, um alle Check-Ins in diesen Raum sofort zu stoppen (zum Beispiel, wenn eine Klasse ausfällt oder ein Raum nicht verfügbar ist). Check-Outs funktionieren weiterhin.

## Betreuerverhältnisse

Derselbe Bereich **Check-In-Kapazität** in der Gruppe enthält auch Personalregeln:

- **Kinder pro Betreuer** -- Die maximale Anzahl an Kindern, die jeder eingecheckte ehrenamtliche Helfer betreuen kann (z. B. bedeutet 5 einen Betreuer pro fünf Kinder).
- **Mindestanzahl Betreuer** -- Die kleinste Anzahl an Betreuern, die eingecheckt sein müssen, bevor Kinder in den Raum eingecheckt werden können.

Ehrenamtliche Helfer zählen für diese Regeln, wenn sie am Kiosk mit dem Typ **Ehrenamtlicher Helfer** einchecken (siehe [Check-In-Typen](#check-in-typen) unten).

### Warnen vs. Blockieren wählen

Wie streng die Verhältnisse durchgesetzt werden, ist eine gemeindeweite Einstellung:

1. Gehen Sie in B1 Admin zu **Einstellungen > Gemeinde verwalten** und öffnen Sie die Kachel **Check-In**.
2. Legen Sie die **Durchsetzung des Betreuerverhältnisses** fest:
   - **Warnen (mit Bestätigung zulassen)** -- Der Kiosk zeigt eine Warnung an, wenn ein Raum das Verhältnis überschreitet oder die Mindestanzahl an Betreuern unterschreitet, und ein Mitarbeiter kann bestätigen, um trotzdem fortzufahren. Dies ist die Standardeinstellung.
   - **Blockieren (Check-In verhindern)** -- Das Einchecken in den Raum wird verweigert, bis genügend Betreuer eingecheckt sind.

:::info
Kapazität und „Für Check-In geschlossen" sind immer feste Grenzwerte — die Wahl zwischen Warnen/Blockieren gilt nur für die Betreuerverhältnisse.
:::

## Check-In-Typen

Bei jedem Check-In wird erfasst, ob die Person ein **Mitglied**, ein **Gast** oder ein **Ehrenamtlicher Helfer** ist. Der Typ wird über Chips auf dem Haushalts-Bildschirm des Kiosks ausgewählt (Mitglied ist die Standardeinstellung). Die Typen fließen in die Sicherheitsregeln ein — ehrenamtliche Helfer decken das Verhältnis ab, und Gäste zählen gegen die Gästekapazität des Raums.

## Alters- und Klassenstufen-Hinweise für Räume

Sie können jedem Raum Alters- oder Klassenstufengrenzen zuweisen, damit der Kiosk Familien zu passenden Räumen leitet:

- Legen Sie in den Gruppeneinstellungen im Bereich **Alter & Klassenstufe** das Mindest-/Höchstalter (Jahre und Monate) und/oder die Klassenstufe für den Raum fest.
- Am Kiosk werden Räume, für die ein Kind qualifiziert ist, hervorgehoben, während nicht passende Räume abgeblendet dargestellt werden. Ein abgeblendeter Raum kann mit Mitarbeiterbestätigung trotzdem ausgewählt werden — der Hinweis blockiert niemals zwingend.

Klassenstufen wechseln am **Klassenstufen-Aufstiegsdatum** Ihrer Gemeinde:

1. Gehen Sie in B1 Admin zu **Einstellungen > Gemeinde verwalten** und öffnen Sie die Kachel für den Klassenstufen-Aufstieg.
2. Legen Sie Monat und Tag fest, an dem Ihre Gemeinde Schüler befördert (zum Beispiel 1. August). Alter und Klassenstufe am Kiosk werden zum jeweils letzten Aufstiegsdatum berechnet.

## Vertrauenswürdige und nicht autorisierte Abholpersonen

Jeder Haushalt kann eine Liste von Personen führen, die zur Abholung ihrer Kinder berechtigt sind — oder nicht.

1. Öffnen Sie die Seite einer Person unter **Personen** und suchen Sie die Karte **Abholung**.
2. Klicken Sie auf **Hinzufügen**. Suchen Sie nach einer vorhandenen Person, oder fügen Sie jemanden hinzu, der nicht im System ist, indem Sie **Name**, **Beziehung** und ein Foto eingeben.
3. Legen Sie den **Status** fest:
   - **Vertrauenswürdig** -- Beim Check-Out erscheint diese Person als antippbare Abholkarte mit Foto, was eine verifizierte Abholung beschleunigt.
   - **Nicht autorisiert** -- Wenn jemand versucht, unter diesem Namen abzuholen, blockiert der Kiosk den Check-Out mit einer Warnung. Ein Mitarbeiter kann dies überschreiben, und die Überschreibung wird im Anwesenheitsdatensatz vermerkt.

Klicken Sie auf den Status-Chip einer Person auf der Karte, um zwischen Vertrauenswürdig und Nicht autorisiert zu wechseln.

:::tip
Fügen Sie vertrauenswürdigen Abholpersonen wann immer möglich Fotos hinzu — der Check-Out-Bildschirm zeigt das Foto, damit ehrenamtliche Helfer die Person vor ihnen visuell überprüfen können.
:::

## Eltern-Aufruf und Notfall-Rundruf

Beide Funktionen senden Textnachrichten über den verbundenen SMS-Anbieter Ihrer Gemeinde — es gibt keinen eingebauten SMS-Dienst, daher muss zunächst einer der unterstützten Anbieter konfiguriert werden.

- **Eltern aufrufen** -- Vom Check-Out-Bildschirm eines besetzten Kiosks aus können Mitarbeiter den Eltern/Erziehungsberechtigten eines eingecheckten Kindes eine SMS schicken (zum Beispiel „Bitte kommen Sie in den Kleinkindbereich").
- **Notfall-Rundruf** -- Über die Admin-Einstellungen des Kiosks können Mitarbeiter allen Erziehungsberechtigten aller für den ausgewählten Gottesdienst eingecheckten Haushalte gleichzeitig eine SMS senden. Zum Senden muss zur Bestätigung **EMERGENCY** eingetippt werden.

Personen, die SMS abbestellt haben oder für die keine Mobilnummer hinterlegt ist, werden automatisch übersprungen — der Kiosk meldet, wie viele Nachrichten gesendet und wie viele übersprungen wurden.

Siehe die Anleitung aus Kiosksicht in [Check-Out & Kindersicherheit](../../b1-checkin/check-in/checking-out).

## Verwandte Artikel

- [Check-In](check-in.md) — Kiosk-Einrichtung und Hardware
- [Check-Out & Kindersicherheit](../../b1-checkin/check-in/checking-out) — der Check-Out am Kiosk, Abholverifizierung und Aufruf-Abläufe
- [Gruppen erstellen](../groups/creating-groups.md) — wo die Raumeinstellungen liegen
- [Anwesenheits-Einrichtung](setup.md) — Gottesdienste, Gottesdienstzeiten und Raumzuweisungen
