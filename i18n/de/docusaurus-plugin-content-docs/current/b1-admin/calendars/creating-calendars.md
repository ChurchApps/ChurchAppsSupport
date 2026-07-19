---
title: "Kalender erstellen"
---

# Kalender erstellen

<div class="article-intro">

Das Erstellen eines Kalenders in B1 Admin ermöglicht dir, eine kuratierte Ansicht von Events zu erstellen, indem du eine oder mehrere Gruppen verbindest. Events werden von Gruppenleitern innerhalb ihrer Gruppen verwaltet, und dein Kalender zeigt diese Events an einem Ort an. Selbst ein Domänen-Admin kann Events nicht direkt im Kalender-Bereich hinzufügen oder bearbeiten, es sei denn, sie sind Leiter der Gruppe, zu der die Events gehören.

</div>

<div class="prereqs">
<h4>Bevor du beginnst</h4>

- Richte die [Gruppen](../groups/creating-groups.md) ein, deren Events du in deinen Kalender aufnehmen möchtest
- Du benötigst Administratorzugriff auf den Bereich Kalender in B1 Admin

</div>

## Einen neuen Kalender erstellen

1. Gehe in B1 Admin zu **Website**, dann zum Bereich **Kalender**.
2. Klicke auf **Kalender hinzufügen**.
3. Gib einen **Namen** für deinen Kalender ein (z. B. "Events des Jugendministeriums" oder "Hauptkirchenkalender").
4. Füge eine optionale **Beschreibung** hinzu, um deinem Team zu helfen, zu verstehen, wofür dieser Kalender ist.
5. Klicke auf **Erstellen**, um deinen neuen Kalender zu speichern.

## Die Kalender-Detailseite

Nach dem Erstellen eines Kalenders, klicke darauf, um die Detailseite zu öffnen. Diese Seite hat zwei Hauptbereiche:

- **Linke Spalte** – Eine Ansicht des Kalenders mit Events aus verbundenen Gruppen.
- **Rechte Spalte** – Die Liste der zugehörigen Gruppen. Hier verwaltest du, welche Gruppen in diesem Kalender enthalten sind.

## Gruppen verbinden

Gruppen, die Events im Kalender haben, erscheinen automatisch in der Gruppenliste auf der rechten Seite der Detailseite.

1. Klicke auf **Hinzufügen** im Bereich Gruppen, um eine Gruppe mit deinem Kalender zu verknüpfen.
2. Wähle die Gruppe aus dem Dropdown-Menü.
3. Wähle, ob du **alle Events** aus dieser Gruppe oder nur **bestimmte Events** aufnehmen möchtest.
4. Klicke auf **Speichern**.

:::tip
Das Verbinden von Gruppen mit deinem Kalender ist eine leistungsstarke Möglichkeit, Events automatisch zu aggregieren. Wenn ein Gruppenleiter ein Event zu seiner [Gruppe](../groups/creating-groups.md) hinzufügt, kann es in deinen kirchenweiten Kalender fließen, ohne dass du zusätzliche Arbeit leistest.
:::

:::info
Wenn du einen einzelnen Kalender erstellen möchtest, der Events aus vielen Gruppen in deiner Kirche zusammenzieht, siehe [Kuratierter Kalender](curated-calendar) für einen rationalen Ansatz.
:::

## Registrierung für Events aktivieren

Du kannst die Registrierung für jeden Kalender-Event aktivieren, damit Mitglieder sich über die B1-Website oder die mobile App anmelden können.

1. Klicke auf ein vorhandenes Event oder erstelle ein neues.
2. Aktiviere im Event-Editor die **Registrierung**.
3. Konfiguriere die Registrierungseinstellungen:
   - **Kapazität** (optional) – Stelle eine maximale Anzahl von Registrierungen ein. Lass das Feld leer für unbegrenzt.
   - **Registrierung öffnet** – Das Datum und die Uhrzeit, wenn die Registrierung verfügbar wird.
   - **Registrierung schließt** – Das Datum und die Uhrzeit, wenn die Registrierung geschlossen wird.
   - **Tags** – Kommagetrennte Bezeichnungen (z. B. "Jugend, Rückzug, Bibelschule"), um registrierbare Events zu kategorisieren.
   - **Registrierungsfragen** – Füge optional ein [Formular](../forms/creating-forms.md) an, damit Anmeldende zusätzliche Fragen beantworten (Diätbeschränkungen, T-Shirt-Größe, Notfallkontakt usw.) im Rahmen der Anmeldung. Wähle **Keine**, um Fragen zu überspringen.
   - **Warteliste aktivieren** – Wenn das Event voll ist, können zusätzliche Anmeldende sich in eine Warteliste eintragen, anstatt abgewiesen zu werden. Siehe [Bezahlte Anmeldungen](paid-registrations#waitlist).
4. Speichere das Event.

Für kostenpflichtige Events ermöglicht dir die gleiche Einstellungsseite, Preis-**Teilnehmertypen**, optionale **Auswahlen** (Add-ons) und **Rabattcodes** zu definieren, wobei die Zahlung über den Spendenanbieter deiner Kirche erfolgt. Siehe [Bezahlte Anmeldungen](paid-registrations) für die vollständige Anleitung.

Sobald die Registrierung aktiviert ist, werden Mitglieder einen **Schaltfläche "Registriere dich für diesen Event"** sehen, wenn sie das Event auf der [B1-Website](../../b1-church/events/registering) oder [B1-Mobile-App](../../b1-mobile/events/registering) anschauen. Wenn du ein Formular angehängt hast, sehen Anmeldende während der Registrierung einen **Fragen**-Schritt und ihre Antworten werden mit ihrer Registrierung gespeichert.

:::info
Registrierungsfragen funktioniert nur mit Formularen, die **nicht** als Eingeschränkt markiert sind. Ein eingeschränktes Formular wird bei der Registrierung automatisch übersprungen, anstatt angezeigt zu werden, verwende daher ein nicht eingeschränktes Formular, wenn du Fragen an ein Event anhängst.
:::

### Registrierungen verwalten

Um Registrierungen für deine Events anzuzeigen und zu verwalten:

1. Navigiere zur Seite **Registrierungen** in B1 Admin.
2. Du siehst eine Tabelle aller Events mit aktivierter Registrierung, die den Event-Titel, das Datum, die aktuelle Anzahl der Registrierungen vs. Kapazität und Tags zeigen.
3. Klicke auf ein Event, um die vollständige Liste der Registrierungen anzuzeigen, einschließlich Namen, Mitgliederzahl, Teilnehmertypen, Zahlungsstatus und Registrierungsdatum.
4. Von der Detailseite kannst du:
   - **Teilnehmer hinzufügen** – Manuell jemanden registrieren, der sich offline oder telefonisch angemeldet hat.
   - **Absagen** einzelner Registrierungen
   - **Löschen** Registrierungen dauerhaft
   - **Befördern** Wartelistenregistrierungen, wenn sich ein Platz öffnet
   - **CSV exportieren** – Lade alle Registrierungen herunter, einschließlich Teilnehmertypen, Auswahlen, Zahlungsbeträge und Antworten zu Fragen

Wenn das Event Registrierungsfragen angehängt hat, zeigt die Detailseite auch einen Filter **Nur unbeantwortete Fragen** um schnell Anmeldende zu finden, die noch keine Antworten eingereicht haben, und eine Schaltfläche **Antworten anzeigen** für jede beantwortete Registrierung um ihre Antworten zu sehen. Kostenpflichtige Events fügen eine **Typ**-Spalte, eine **Bezahlt / Insgesamt**-Spalte, Zählungen pro Typ und einen Dialog mit Zahlungsdetails hinzu – siehe [Bezahlte Anmeldungen](paid-registrations#the-registration-roster).

:::tip
Verwende die Kapazitäts-Fortschrittsleiste, um zu überwachen, wie schnell sich Events füllen. Die Leiste wird rot, wenn ein Event mit oder über der Kapazität ist.
:::

## Nächste Schritte

- [Kuratierter Kalender](curated-calendar) – Erstelle einen Kalender, der aus mehreren Gruppen zieht
- [Bezahlte Anmeldungen](paid-registrations) – Teilnehmertypen, Add-on-Auswahlen, Rabattcodes, Zahlungen und Wartelisten
- [Anleitung zur Event-Registrierung](../guides/event-registration) – Schrittweise Anleitung zum Einrichten der Event-Registrierung
- [Kalender-Übersicht](./) – Zurück zur Kalender-Übersicht
