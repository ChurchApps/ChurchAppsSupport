---
title: "Kalender erstellen"
---

# Kalender erstellen

<div class="article-intro">

Das Erstellen eines Kalenders in B1 Admin ermöglicht es Ihnen, eine kuratierte Ansicht von Ereignissen durch Verbindung einer oder mehrerer Gruppen zu erstellen. Ereignisse werden von Gruppenleiters innerhalb ihrer Gruppen verwaltet, und Ihr Kalender zeigt diese Ereignisse an einem Ort an. Selbst ein Domain Admin kann Ereignisse direkt im Kalenderbereich nicht hinzufügen oder bearbeiten, es sei denn, sie sind ein Leiter der Gruppe, der die Ereignisse gehören.

</div>

<div class="prereqs">
<h4>Bevor Sie beginnen</h4>

- Richten Sie die [Gruppen](../groups/creating-groups.md) ein, deren Ereignisse Sie in Ihren Kalender einbeziehen möchten
- Sie benötigen Verwaltungszugriff auf den Bereich Kalender in B1 Admin

</div>

## Erstellen Sie einen neuen Kalender

1. Gehen Sie in B1 Admin zu **Website**, dann zum Bereich **Kalender**.
2. Klicken Sie auf **Kalender hinzufügen**.
3. Geben Sie einen **Namen** für Ihren Kalender ein (z. B. „Ereignisse der Jugendministerium" oder „Hauptkirchenkalender").
4. Fügen Sie optional eine **Beschreibung** hinzu, um Ihrem Team zu helfen zu verstehen, wofür dieser Kalender bestimmt ist.
5. Klicken Sie auf **Erstellen**, um Ihren neuen Kalender zu speichern.

## Die Kalender-Detailseite

Nach dem Erstellen eines Kalenders klicken Sie darauf, um die Detailseite zu öffnen. Diese Seite hat zwei Hauptbereiche:

- **Linke Spalte** – Eine Ansicht des Kalenders, die Ereignisse von verbundenen Gruppen anzeigt.
- **Rechte Spalte** – Die Liste der verbundenen Gruppen. Hier verwalten Sie, welche Gruppen in diesen Kalender enthalten sind.

## Verbinden Sie Gruppen

Gruppen mit Ereignissen im Kalender erscheinen automatisch in der Gruppenliste auf der rechten Seite der Detailseite.

1. Klicken Sie auf **Hinzufügen** im Bereich Gruppen, um eine Gruppe mit Ihrem Kalender zu verknüpfen.
2. Wählen Sie die Gruppe aus dem Dropdown.
3. Wählen Sie, ob Sie **alle Ereignisse** aus dieser Gruppe oder nur **bestimmte Ereignisse** einbeziehen möchten.
4. Klicken Sie auf **Speichern**.

:::tip
Die Verbindung von Gruppen mit Ihrem Kalender ist eine leistungsstarke Möglichkeit, Ereignisse automatisch zu aggregieren. Wenn ein Gruppenleiter ein Ereignis zu seiner [Gruppe](../groups/creating-groups.md) hinzufügt, kann es ohne zusätzliche Arbeit von Ihnen in Ihren Kirchenkalender fließen.
:::

:::info
Wenn Sie einen einzelnen Kalender erstellen möchten, der Ereignisse von vielen Gruppen in Ihrer Kirche abruft, siehe [Kurierter Kalender](curated-calendar) für einen vereinfachten Ansatz.
:::

## Aktivieren Sie die Ereignisregistrierung

Sie können die Registrierung für beliebige Kalenderereignisse aktivieren, damit Mitglieder sich über die B1 Website oder die mobile App anmelden können.

1. Klicken Sie auf ein vorhandenes Ereignis oder erstellen Sie ein neues.
2. Aktivieren Sie im Ereignis-Editor den Schalter **Registrierung**.
3. Konfigurieren Sie die Registrierungseinstellungen:
   - **Kapazität** (optional) – Legen Sie eine maximale Anzahl von Registrierungen fest. Lassen Sie es leer für unbegrenzt.
   - **Registrierung öffnet sich** – Das Datum und die Uhrzeit, wenn die Registrierung verfügbar wird.
   - **Registrierung schließt sich** – Das Datum und die Uhrzeit, wenn die Registrierung geschlossen wird.
   - **Tags** – Durch Kommas getrennte Etiketten (z. B. „Jugend, Rückzug, VBS"), um registrierbare Ereignisse zu kategorisieren.
   - **Registrierungsfragen** – Befestigen Sie optional ein [Formular](../forms/creating-forms.md), damit Registrierende zusätzliche Fragen beantworten (Ernährungseinschränkungen, T-Shirt-Größe, Notfallkontakt usw.) als Teil der Anmeldung. Wählen Sie **Keine**, um Fragen zu überspringen.
   - **Warteliste aktivieren** – Wenn das Ereignis voll wird, lassen Sie zusätzliche Registrierende einer Warteliste beitreten, anstatt sie abzulehnen. Siehe [Bezahlte Registrierungen](paid-registrations#waitlist).
4. Speichern Sie das Ereignis.

Für bezahlte Ereignisse können Sie auf derselben Einstellungsseite Preis-**Teilnehmertypen**, optionale **Auswahlmöglichkeiten** (Add-Ons) und **Rabattcodes** definieren, mit Zahlung über den Spendenanbieter Ihrer Kirche. Siehe [Bezahlte Registrierungen](paid-registrations) für den vollständigen Durchgang.

Sobald die Registrierung aktiviert ist, sehen Mitglieder eine Schaltfläche **Für dieses Ereignis registrieren**, wenn sie das Ereignis auf der [B1 Website](../../b1-church/events/registering) oder der [B1 Mobile App](../../b1-mobile/events/registering) anzeigen. Wenn Sie ein Formular angehängt haben, sehen Registrierende einen Schritt **Fragen** während der Registrierung und ihre Antworten werden mit ihrer Registrierung gespeichert.

:::info
Registrierungsfragen funktioniert nur mit Formularen, die **nicht** als eingeschränkt gekennzeichnet sind. Ein eingeschränktes Formular wird während der Registrierung automatisch übersprungen, anstatt angezeigt zu werden. Verwenden Sie also ein uneingeschränktes Formular beim Anhängen von Fragen an ein Ereignis.
:::

### Verwalten Sie Registrierungen

Um Registrierungen für Ihre Ereignisse anzuzeigen und zu verwalten:

1. Navigieren Sie zur Seite **Registrierungen** in B1 Admin.
2. Sie sehen eine Tabelle aller Ereignisse mit aktivierter Registrierung, die den Ereignistitel, das Datum, die aktuelle Registrierungsanzahl versus Kapazität und Tags zeigt.
3. Klicken Sie auf ein Ereignis, um die vollständige Liste der Registrierungen anzuzeigen, einschließlich Namen, Mitgliederzahl, Teilnehmertypen, Zahlungsstatus und Registrierungsdatum.
4. Von der Detailseite aus können Sie:
   - **Teilnehmer hinzufügen** – Jemanden manuell registrieren, der sich offline oder telefonisch angemeldet hat.
   - **Registrierungen stornieren**
   - **Registrierungen permanent löschen**
   - **Wartelisten-Registrierungen fördern**, wenn sich ein Platz öffnet
   - **CSV exportieren** – Laden Sie alle Registrierungen herunter, einschließlich Teilnehmertypen, Auswahlmöglichkeiten, Zahlungsbeträge und Frageantworten

Wenn das Ereignis Registrierungsfragen angehängt hat, zeigt die Detailseite auch einen Filter **Nur unbeantwortete Fragen**, um schnell Registrierende zu finden, die noch keine Antworten eingereicht haben, und eine Schaltfläche **Antworten anzeigen** für jede beantwortete Registrierung, um ihre Antworten anzuzeigen. Bezahlte Ereignisse fügen eine Spalte **Typ**, eine Spalte **Bezahlt / Gesamt** und Pro-Typ-Zähler hinzu – siehe [Bezahlte Registrierungen](paid-registrations#the-registration-roster).

:::tip
Verwenden Sie die Kapazitäts-Fortschrittsleiste, um zu überwachen, wie schnell Ereignisse gefüllt werden. Die Leiste wird rot, wenn ein Ereignis bei oder über Kapazität ist.
:::

## Nächste Schritte

- [Kurierter Kalender](curated-calendar) – Erstellen Sie einen Kalender, der aus mehreren Gruppen abruft
- [Bezahlte Registrierungen](paid-registrations) – Teilnehmertypen, Add-On-Auswahlmöglichkeiten, Rabattcodes, Zahlungen und Wartelisten
- [Ereignisregistrierungs-Anleitung](../guides/event-registration) – Schritt-für-Schritt-Anleitung zum Einrichten der Ereignisregistrierung
- [Kalender Übersicht](./) – Zurück zur Kalender Übersicht
