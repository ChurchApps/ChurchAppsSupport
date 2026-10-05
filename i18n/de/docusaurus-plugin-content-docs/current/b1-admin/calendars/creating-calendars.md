---
title: "Kalender erstellen"
---

# Kalender erstellen

<div class="article-intro">

Wenn Sie einen Kalender in B1 Admin erstellen, können Sie eine kuratierte Ansicht von Ereignissen erstellen, indem Sie eine oder mehrere Gruppen verbinden. Ereignisse werden von Gruppenführern innerhalb ihrer Gruppen verwaltet, und Ihr Kalender zeigt diese Ereignisse an einer Stelle an. Administratoren mit Bearbeitungszugriff können Ereignisse für jede Gruppe hinzufügen oder bearbeiten. Nicht-Administrator-Gruppenführer können nur Ereignisse für Gruppen verwalten, die sie leiten.

</div>

<div class="prereqs">
<h4>Bevor Sie beginnen</h4>

- Richten Sie die [Gruppen](../groups/creating-groups.md) ein, deren Ereignisse Sie in Ihren Kalender aufnehmen möchten
- Sie benötigen Administratorzugriff auf den Kalenderbereich in B1 Admin

</div>

## Neuen Kalender erstellen

1. In B1 Admin öffnen Sie das [Jump-Menü](../introduction.md#getting-around-with-the-jump-menu) (die Suchleiste oben links), erweitern Sie **Kalender** und klicken Sie auf **Kalender**.
2. Klicken Sie auf **Kalender hinzufügen**.
3. Geben Sie einen **Namen** für Ihren Kalender ein (zum Beispiel „Jugendbeteiligung Ereignisse" oder „Hauptkirchen-Kalender").
4. Fügen Sie optional eine **Beschreibung** hinzu, um Ihrem Team zu helfen, den Zweck dieses Kalenders zu verstehen.
5. Klicken Sie auf **Erstellen**, um Ihren neuen Kalender zu speichern.

## Die Seite Kalenderdetails

Nach dem Erstellen eines Kalenders klicken Sie darauf, um die Detailseite zu öffnen. Diese Seite hat zwei Hauptbereiche:

- **Linke Spalte** -- Eine Ansicht des Kalenders mit Ereignissen, die von verbundenen Gruppen eingezogen werden.
- **Rechte Spalte** -- Die Liste der zugeordneten Gruppen. Hier können Sie verwalten, welche Gruppen in diesem Kalender enthalten sind.

## Gruppen verbinden

Gruppen, die Ereignisse im Kalender haben, werden automatisch in der Gruppenliste auf der rechten Seite der Detailseite angezeigt.

1. Klicken Sie auf **Hinzufügen** im Bereich Gruppen, um eine Gruppe mit Ihrem Kalender zu verknüpfen.
2. Wählen Sie die Gruppe aus der Dropdown-Liste.
3. Wählen Sie, ob Sie **alle Ereignisse** aus dieser Gruppe oder nur **bestimmte Ereignisse** einbeziehen möchten.
4. Klicken Sie auf **Speichern**.

:::tip
Das Verbinden von Gruppen mit Ihrem Kalender ist eine leistungsstarke Möglichkeit, Ereignisse automatisch zu aggregieren. Wenn ein Gruppenführer ein Ereignis zu seiner [Gruppe](../groups/creating-groups.md) hinzufügt, kann es ohne zusätzliche Arbeit in Ihren kirchenweiten Kalender einfließen.
:::

:::info
Wenn Sie einen einzelnen Kalender erstellen möchten, der Ereignisse von vielen Gruppen in Ihrer Kirche einfließen lässt, siehe [Kuratierter Kalender](curated-calendar) für einen optimierten Ansatz.
:::

## Ereignisregistrierung aktivieren

Sie können die Registrierung für jedes Ereignis aktivieren, damit sich Mitglieder über die B1-Website oder die mobile App anmelden können.

1. Klicken Sie auf ein bestehendes Ereignis oder erstellen Sie ein neues.
2. Im Ereignis-Editor schalten Sie **Registrierung** ein, um sie zu aktivieren.
3. Konfigurieren Sie die Registrierungseinstellungen:
   - **Kapazität** (optional) -- Legen Sie eine maximale Anzahl von Registrierungen fest. Lassen Sie leer für unbegrenzt.
   - **Registrierung öffnet sich** -- Das Datum und die Uhrzeit, wann die Registrierung verfügbar wird.
   - **Registrierung schließt** -- Das Datum und die Uhrzeit, wann die Registrierung geschlossen wird.
   - **Tags** -- Durch Kommas getrennte Labels (z.B. „jugend, retreat, vbs"), um registrierbare Ereignisse zu kategorisieren.
   - **Registrierungsfragen** -- Befestigen Sie optional ein [Formular](../forms/creating-forms.md), damit Registranten zusätzliche Fragen beantworten (Ernährungseinschränkungen, T-Shirt-Größe, Notfallkontakt usw.) als Teil der Anmeldung. Wählen Sie **Keine** um Fragen zu überspringen.
   - **Warteliste aktivieren** -- Wenn das Ereignis voll wird, können zusätzliche Registranten sich stattdessen auf eine Warteliste eintragen, anstatt abgelehnt zu werden. Siehe [Bezahlte Registrierungen](paid-registrations#waitlist).
4. Speichern Sie das Ereignis.

Für bezahlte Ereignisse können Sie auf derselben Einstellungsseite Preis-**Teilnehmertypen**, optionale **Auswahl** (Add-ons) und **Rabattcodes** definieren, mit Zahlungen, die über Ihren Kirchengeber eingezogen werden. Siehe [Bezahlte Registrierungen](paid-registrations) für die vollständige Anleitung.

Sobald die Registrierung aktiviert ist, sehen Mitglieder eine Schaltfläche **Für dieses Ereignis registrieren**, wenn sie das Ereignis auf der [B1-Website](../../b1-church/events/registering) oder [B1 Mobile App](../../b1-mobile/events/registering) anzeigen. Wenn Sie ein Formular angehängt haben, sehen Registranten während der Registrierung einen **Fragen**-Schritt, und ihre Antworten werden mit ihrer Registrierung gespeichert.

:::info
Registrierungsfragen funktionieren nur mit Formularen, die **nicht** als Eingeschränkt markiert sind. Ein eingeschränktes Formular wird automatisch während der Registrierung übersprungen, anstatt angezeigt zu werden. Verwenden Sie daher ein nicht eingeschränktes Formular, wenn Sie Fragen an ein Ereignis anhängen.
:::

### Registrierungen verwalten

So zeigen Sie Registrierungen für Ihre Ereignisse an und verwalten sie:

1. Im Jump-Menü wählen Sie **Kalender > Registrierungen**.
2. Sie sehen eine Tabelle mit allen Ereignissen mit aktivierter Registrierung, die den Ereignistitel, das Datum, die aktuelle Registrierungsanzahl gegenüber der Kapazität und Tags anzeigt.
3. Klicken Sie auf ein Ereignis, um die vollständige Liste der Registrierungen anzuzeigen, einschließlich Namen, Memberanzahl, Teilnehmertypen, Zahlungsstatus und Registrierungsdatum.
4. Auf der Detailseite können Sie:
   - **Teilnehmer hinzufügen** -- Jemanden manuell registrieren, der sich offline oder telefonisch angemeldet hat.
   - **Stornieren** einzelner Registrierungen
   - Registrierungen dauerhaft **löschen**
   - Wartelisten-Registrierungen **befördern**, wenn ein Platz frei wird
   - **CSV exportieren** -- Alle Registrierungen herunterladen, einschließlich Teilnehmertypen, Auswahl, Zahlungsbeträge und Antworten auf Fragen

Wenn das Ereignis Registrierungsfragen angehängt hat, zeigt die Detailseite auch einen Filter **Nur unbeantwortete Fragen**, um Registranten schnell zu finden, die noch keine Antworten eingereicht haben, und eine Schaltfläche **Antworten anzeigen** auf jeder beantworteten Registrierung, um ihre Antworten zu sehen. Bezahlte Ereignisse fügen eine Spalte **Typ**, eine Spalte **Bezahlt / Gesamt**, Pro-Typ-Zählungen und einen Zahlungsdetail-Dialog hinzu -- siehe [Bezahlte Registrierungen](paid-registrations#the-registration-roster).

:::tip
Verwenden Sie die Kapazitätsfortschrittsleiste, um zu überwachen, wie schnell Ereignisse aufgefüllt werden. Die Leiste wird rot, wenn ein Ereignis die Kapazität erreicht oder überschreitet.
:::

## Nächste Schritte

- [Kuratierter Kalender](curated-calendar) -- Erstellen Sie einen Kalender, der von mehreren Gruppen zieht
- [Bezahlte Registrierungen](paid-registrations) -- Teilnehmertypen, Add-on-Auswahl, Rabattcodes, Zahlungen und Wartelisten
- [Leitfaden zur Ereignisregistrierung](../guides/event-registration) -- Schritt-für-Schritt-Anleitung zum Einrichten von Ereignisregistrierungen
- [Kalenderübersicht](./) -- Zurück zur Kalenderübersicht
