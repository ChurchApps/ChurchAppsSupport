---
title: "Anmeldungssicherheit"
---

# Anmeldungssicherheit

<div class="article-intro">

B1 bietet eine Reihe von Kindersicherheitskontrollen für die Anmeldung: Raumkapazitätsgrenzen und Freiwilligen-zu-Kind-Verhältnisse, Alters- und Klassenguidance am Kiosk, Anmeldungstypen, die Mitglieder, Gäste und Freiwillige unterscheiden, und eine vertrauenswürdige Abholungsliste pro Haushalt, die beim Auschecken verifiziert wird. Diese Seite behandelt, wie Sie jede Sicherheitsfunktion in B1 Admin konfigurieren.

</div>

<div class="prereqs">
<h4>Bevor Sie anfangen</h4>

- Richten Sie Ihre [Anwesenheitsstruktur](setup.md) und [Anmeldungs-Kiosks](check-in.md) ein
- Räume sind [Gruppen](../groups/creating-groups.md), die mit Gottesdienst-Zeiten verknüpft sind – die Sicherheitseinstellungen unten befinden sich in der Gruppe
- Seite-ein-Elternteil und Notfallübertragung erfordern einen verbundenen Textanbieter ([Text In Church](../integrations/services/text-in-church), [Clearstream](../integrations/services/clearstream), oder Mutual Ministry)

</div>

## Raumkapazität und Schließen eines Raumes

Jeder Anmeldungsraum (Gruppe) kann seine eigenen Grenzen durchsetzen. Öffnen Sie die Gruppe, klicken Sie auf das **Stiftsymbol**, um ihre Einstellungen zu bearbeiten, und finden Sie den Abschnitt **Anmeldungskapazität**:

- **Kapazität** – Die maximale Anzahl von Personen, die gleichzeitig in diesem Raum angemeldet werden können. Wenn der Raum voll ist, wird die Anmeldung blockiert und der Kiosk benennt den vollen Raum.
- **Gastkapazität** – Eine optionale separate Obergrenze für die Anzahl der Gäste, die der Raum halten kann.
- **Für Anmeldung geschlossen** – Auf **Ja** setzen, um alle Anmeldungen zu diesem Raum sofort zu stoppen (z. B. wenn eine Klasse storniert oder ein Raum nicht verfügbar ist). Abmeldungen funktionieren immer noch.

## Freiwilligen-Verhältnisse

Der gleiche Abschnitt **Anmeldungskapazität** in der Gruppe enthält Personalregeln:

- **Kinder pro Freiwilliger** – Die maximale Anzahl von Kindern, die jede angemeldete Freiwillige abdecken kann (z. B. 5 bedeutet einen Freiwilligen pro fünf Kindern).
- **Mindestanzahl von Freiwilligen** – Die kleinste Anzahl von Freiwilligen, die angemeldet sein müssen, bevor Kinder sich im Raum anmelden können.

Freiwillige zählen zu diesen Regeln, wenn sie sich mit dem **Freiwilligen**-Typ am Kiosk anmelden (siehe [Anmeldungstypen](#anmeldungstypen) unten).

### Warnung oder Blockierung auswählen

Wie streng Verhältnisse durchgesetzt werden, ist eine kirchenweite Einstellung:

1. Gehen Sie in B1 Admin zu **Einstellungen** und öffnen Sie den **Anmeldungs**-Abschnitt.
2. Legen Sie **Durchsetzung des Freiwilligen-Verhältnisses** fest:
   - **Warnen (mit Bestätigung erlauben)** – Der Kiosk zeigt eine Warnung an, wenn ein Raum über dem Verhältnis liegt oder die Mindestzahl seiner Freiwilligen nicht erreicht, und ein Mitarbeiter kann die Bestätigung geben, um trotzdem fortzufahren. Dies ist die Standardeinstellung.
   - **Blockieren (Anmeldung verhindern)** – Die Anmeldung zum Raum wird verweigert, bis genug Freiwillige angemeldet sind.

:::info
Kapazität und Für Anmeldung geschlossen sind immer harte Grenzen – die Wahl zwischen Warnen/Blockieren gilt nur für Freiwilligenquoten.
:::

## Anmeldungstypen

Jede Anmeldung erfasst, ob die Person ein **Mitglied**, **Gast** oder **Freiwilliger** ist. Der Typ wird mit Chips auf dem Kiosk-Haushaltsbildschirm gewählt (Mitglied ist die Standardvorgabe). Typen speisen in die Sicherheitsregeln ein – Freiwillige bieten Quotenabdeckung, und Gäste zählen gegen die Gastkapazität des Raumes.

## Alters- und Klassenzimmer-Anleitung

Sie können für jeden Raum Alters- oder Klassengrenzen festlegen, damit der Kiosk Familien zu angemessenen Räumen leitet:

- Verwenden Sie in den Einstellungen der Gruppe den Abschnitt **Altersgruppe & Klasse**, um das Mindest-/Höchstalter (Jahre und Monate) und/oder die Klassenstufe für den Raum festzulegen.
- Am Kiosk werden Räume, für die sich ein Kind qualifiziert, hervorgehoben und Räume, für die das Kind sich nicht qualifiziert, sind abgeblendet. Ein abgeblendeter Raum kann immer noch mit einer Mitarbeiterbestätigung gewählt werden – die Anleitung blockiert nie hart.

Klassen rollen am **Klassenwechseldatum** Ihrer Kirche um:

1. Gehen Sie in B1 Admin zu **Einstellungen** und öffnen Sie den Abschnitt **Klassenwechsel**.
2. Legen Sie Monat und Tag fest, an dem Ihre Kirche Schüler befördert (z. B. 1. August). Altersangaben und Klassen am Kiosk werden zum letzten Klassenwechseldatum berechnet.

## Vertrauenswürdige und nicht autorisierte Abholpersonen

Jeder Haushalt kann eine Liste von Personen führen, die – oder nicht – zum Abholen seiner Kinder berechtigt sind.

1. Öffnen Sie die Seite einer Person unter **Personen** und finden Sie die Karte **Abholung**.
2. Klicken Sie auf **Hinzufügen**. Suchen Sie eine vorhandene Person oder fügen Sie jemanden, der nicht im System ist, hinzu, indem Sie seinen **Namen**, **Verhältnis** und ein Foto eingeben.
3. Stellen Sie den **Status** ein:
   - **Vertrauenswürdig** – Beim Auschecken wird diese Person als tippbare Abholungskarte mit ihrem Foto angezeigt, was eine verifizierte Abholung schnell macht.
   - **Nicht autorisiert** – Wenn jemand versucht, sich unter diesem Namen abzuholen, blockiert der Kiosk das Auschecken mit einer Warnung. Ein Mitarbeiter kann außer Kraft setzen, und das Außerkraftsetzen wird im Anwesenheitsdatensatz aufgezeichnet.

Klicken Sie auf den Status-Chip einer Person auf der Karte, um zwischen Vertrauenswürdig und Nicht autorisiert umzuschalten.

:::tip
Fügen Sie vertrauenswürdigen Abholpersonen nach Möglichkeit Fotos hinzu – der Auschecken-Bildschirm zeigt das Foto, damit Freiwillige die Person vor ihnen visuell überprüfen können.
:::

## Seite-ein-Elternteil und Notfallübertragung

Beide Funktionen senden Textnachrichten über den verbundenen Textanbieter Ihrer Kirche – es gibt keinen integrierten SMS-Dienst, daher muss zunächst einer der unterstützten Anbieter konfiguriert werden.

- **Seite ein Elternteil** – Von einem bemannten Kiosk aus können Mitarbeiter einem angemeldeten Kind Texte an die Eltern/Erziehungsberechtigten senden (z. B. "Bitte kommen Sie zum Säuglingszimmer").
- **Notfallübertragung** – Von den Admin-Einstellungen des Kiosks können Mitarbeiter gleichzeitig Textnachrichten an die Erziehungsberechtigten aller angemeldeten Haushalte für den ausgewählten Gottesdienst senden. Das Senden erfordert die Eingabe von **NOTFALL** zur Bestätigung.

Personen, die Texte abgelehnt haben oder die keine Mobilnummer in der Datei haben, werden automatisch übersprungen – der Kiosk meldet, wie viele Nachrichten gesendet wurden und wie viele übersprungen wurden.

Siehe die Kiosk-seitige Anleitung unter [Auschecken & Kindersicherheit](../../b1-checkin/check-in/checking-out).

## Verwandte Artikel

- [Anmeldung](check-in.md) – Kiosk-Setup und Hardware
- [Auschecken & Kindersicherheit](../../b1-checkin/check-in/checking-out) – der Kiosk-Auschecken, Abholverifizierung und Seitenvorgänge
- [Gruppen erstellen](../groups/creating-groups.md) – wo die Raumeinstellungen leben
- [Anwesenheits-Einrichtung](setup.md) – Gottesdienste, Gottesdienst-Zeiten und Raumzuweisungen
- [Mindestalter für private Nachrichten](../settings/mobile-app.md#member-directory--messaging-settings) – blockiert neue Privatnachrichten-Unterhaltungen mit Kindern, während sie im Verzeichnis bleiben
