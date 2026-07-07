---
title: "Kalender erstellen"
---

# Kalender erstellen

<div class="article-intro">

Das Erstellen eines Kalenders in B1 Admin ermöglicht es Ihnen, eine kuratierte Ansicht von Ereignissen zu erstellen, indem Sie eine oder mehrere Gruppen verbinden. Ereignisse werden von Gruppenleitern innerhalb ihrer Gruppen verwaltet, und Ihr Kalender zeigt diese Ereignisse an einem Ort an. Selbst ein Domain-Admin kann Ereignisse nicht direkt im Kalenderbereich hinzufügen oder bearbeiten, es sei denn, sie sind Leiter der Gruppe, zu der die Ereignisse gehören.

</div>

<div class="prereqs">
<h4>Bevor Sie anfangen</h4>

- Richten Sie die [Gruppen](../groups/creating-groups.md) ein, deren Ereignisse Sie in Ihren Kalender aufnehmen möchten
- Sie benötigen administrativen Zugriff auf den Bereich Kalender in B1 Admin

</div>

## Neuen Kalender erstellen

1. Navigieren Sie in B1 Admin zu **Website** und dann zum Bereich **Kalender**.
2. Klicken Sie auf **Kalender hinzufügen**.
3. Geben Sie einen **Namen** für Ihren Kalender ein (z.B. "Youth Ministry Events" oder "Main Church Calendar").
4. Fügen Sie optional eine **Beschreibung** hinzu, um Ihrem Team zu helfen zu verstehen, wofür dieser Kalender bestimmt ist.
5. Klicken Sie auf **Erstellen**, um Ihren neuen Kalender zu speichern.

## Die Kalenderdetailseite

Nach dem Erstellen eines Kalenders klicken Sie darauf, um die Detailseite zu öffnen. Diese Seite hat zwei Hauptbereiche:

- **Linke Spalte** -- Eine Ansicht des Kalenders mit Ereignissen, die von verbundenen Gruppen eingezogen werden.
- **Rechte Spalte** -- Die zugehörige Gruppenliste. Hier können Sie verwalten, welche Gruppen in diesem Kalender enthalten sind.

## Gruppen verbinden

Gruppen mit Ereignissen im Kalender erscheinen automatisch in der Gruppenliste auf der rechten Seite der Detailseite.

1. Klicken Sie auf **Hinzufügen** im Bereich Gruppen, um eine Gruppe mit Ihrem Kalender zu verknüpfen.
2. Wählen Sie die Gruppe aus dem Dropdown aus.
3. Wählen Sie, ob Sie **alle Ereignisse** dieser Gruppe oder nur **spezifische Ereignisse** einbeziehen möchten.
4. Klicken Sie auf **Speichern**.

:::tip
Das Verbinden von Gruppen mit Ihrem Kalender ist eine leistungsstarke Möglichkeit, Ereignisse automatisch zu aggregieren. Wenn ein Gruppenleiter ein Ereignis in seiner [Gruppe](../groups/creating-groups.md) hinzufügt, kann es ohne zusätzliche Arbeit in Ihren Kirchen-Kalender fließen.
:::

:::info
Wenn Sie einen einzelnen Kalender erstellen möchten, der Ereignisse aus vielen Gruppen in Ihrer Kirche zusammenführt, siehe [Kuratierter Kalender](curated-calendar) für einen vereinfachten Ansatz.
:::

## Ereignisregistrierung aktivieren

Sie können die Registrierung für alle Kalenderereignisse aktivieren, damit Mitglieder sich über die B1-Website oder die mobile App anmelden können.

1. Klicken Sie auf ein vorhandenes Ereignis oder erstellen Sie ein neues.
2. Schalten Sie im Ereigniseditor **Registrierung** ein.
3. Konfigurieren Sie die Registrierungseinstellungen:
   - **Kapazität** (optional) -- Legen Sie eine maximale Anzahl von Registrierungen fest. Lassen Sie blank für unbegrenzt.
   - **Registrierung öffnet** -- Das Datum und die Uhrzeit, zu der die Registrierung verfügbar wird.
   - **Registrierung schließt** -- Das Datum und die Uhrzeit, zu der die Registrierung schließt.
   - **Tags** -- Komma-getrennte Bezeichnungen (z.B. "youth, retreat, vbs"), um registrierbare Ereignisse zu kategorisieren.
   - **Registrierungsfragen** -- Fügen Sie optional ein [Formular](../forms/creating-forms.md) an, damit Registranten zusätzliche Fragen beantworten (Ernährungseinschränkungen, T-Shirt-Größe, Notfallkontakt usw.) als Teil der Anmeldung. Wählen Sie **Keine**, um Fragen zu überspringen.
   - **Warteliste aktivieren** -- Wenn das Ereignis voll ist, lassen Sie zusätzliche Registranten sich stattdessen auf eine Warteliste anmelden. Siehe [Kostenpflichtige Registrierungen](paid-registrations#warteliste).
4. Speichern Sie das Ereignis.

Für bezahlte Ereignisse können Sie auf derselben Einstellungsseite Preis **Teilnehmertypen**, optionale **Auswahlmöglichkeiten** (Add-Ons) und **Rabattcodes** definieren, wobei die Zahlung über den Spendendienstanbieter Ihrer Kirche erfolgt. Siehe [Kostenpflichtige Registrierungen](paid-registrations) für die vollständige Anleitung.

Nachdem die Registrierung aktiviert wurde, werden die Mitglieder eine Schaltfläche **Für dieses Ereignis registrieren** sehen, wenn sie das Ereignis auf der [B1-Website](../../b1-church/events/registering) oder der [B1 Mobile App](../../b1-mobile/events/registering) anzeigen. Wenn Sie ein Formular angehängt haben, sehen Registranten während der Registrierung einen **Fragen**-Schritt und ihre Antworten werden in ihrer Registrierung gespeichert.

:::info
Registrierungsfragen funktionieren nur mit Formularen, die **nicht** als Eingeschränkt markiert sind. Ein eingeschränktes Formular wird während der Registrierung automatisch übersprungen, anstatt angezeigt zu werden. Verwenden Sie daher ein nicht eingeschränktes Formular, wenn Sie Fragen an ein Ereignis anhängen.
:::

### Registrierungen verwalten

So zeigen Sie Registrierungen für Ihre Ereignisse an und verwalten sie:

1. Navigieren Sie zur Seite **Registrierungen** in B1 Admin.
2. Sie sehen eine Tabelle mit allen Ereignissen mit aktivierter Registrierung, die den Ereignistitel, das Datum, die aktuelle Registrierungsanzahl gegenüber der Kapazität und die Tags anzeigt.
3. Klicken Sie auf ein Ereignis, um die vollständige Liste der Registrierungen zu sehen, einschließlich Namen, Mitgliederzahl, Teilnehmertypen, Zahlungsstatus und Registrierungsdatum.
4. Auf der Detailseite können Sie:
   - **Teilnehmer hinzufügen** -- Registrieren Sie manuell jemanden, der sich offline oder telefonisch angemeldet hat.
   - **Stornieren** einzelne Registrierungen
   - **Löschen** Registrierungen dauerhaft
   - **Befördern** Wartelisten-Registrierungen, wenn ein Platz frei wird
   - **CSV exportieren** -- Laden Sie alle Registrierungen herunter, einschließlich Teilnehmertypen, Auswahlmöglichkeiten, Zahlungsbeträge und Antworten auf Fragen

Wenn das Ereignis angehängte Registrierungsfragen hat, zeigt die Detailseite auch einen Filter **Nur unbeantwortete Fragen** an, um Registranten schnell zu finden, die noch keine Antworten eingereicht haben, und eine Schaltfläche **Antworten anzeigen** für jede beantwortete Registrierung, um ihre Antworten zu sehen. Bezahlte Ereignisse fügen eine Spalte **Typ** hinzu, eine Spalte **Bezahlt / Gesamt**, Pro-Typ-Zähler und einen Dialog mit Zahlungsdetails -- siehe [Kostenpflichtige Registrierungen](paid-registrations#das-registrierungsroster).

:::tip
Verwenden Sie die Kapazitätsfortschrittsleiste, um zu überwachen, wie schnell Ereignisse voll werden. Die Leiste wird rot, wenn ein Ereignis bei oder über der Kapazität liegt.
:::

## Nächste Schritte

- [Kuratierter Kalender](curated-calendar) -- Erstellen Sie einen Kalender, der von mehreren Gruppen zieht
- [Kostenpflichtige Registrierungen](paid-registrations) -- Teilnehmertypen, Add-On-Auswahlmöglichkeiten, Rabattcodes, Zahlungen und Wartelisten
- [Ereignisregistrierungs-Anleitung](../guides/event-registration) -- Schritt-für-Schritt-Anleitung zum Einrichten der Ereignisregistrierung
- [Kalenderübersicht](./) -- Zurück zur Kalenderübersicht
