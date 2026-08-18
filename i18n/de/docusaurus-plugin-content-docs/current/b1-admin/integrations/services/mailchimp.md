---
title: "Mailchimp"
---

# Mailchimp

<div class="article-intro">

Halten Sie eine Mailchimp-Audience automatisch mit B1 synchronisiert: Personen werden mit ihrem Namen, E-Mail und Telefon importiert; Gruppen- und Listenmitgliedschaften werden zu Mailchimp-Tags; gelöschte Personen werden archiviert. Die Synchronisation ist in B1 integriert – kein Drittanbieterdienst, keine aufgabenbasierte Abrechnung und Änderungen erfolgen in Echtzeit statt nach einem nächtlichen Zeitplan.

</div>

<div class="prereqs">
<h4>Bevor Sie beginnen</h4>

- Ein [Mailchimp](https://mailchimp.com)-Konto mit der Audience, die B1 verwalten soll
- Ein **API-Schlüssel** von Mailchimp (Mailchimp: Profilsymbol → **Konto und Abrechnung → Extras → API-Schlüssel**)
- Ihre **Audience-ID** (Mailchimp: **Audience → Einstellungen → Name und Standardeinstellungen der Audience**)
- Ein B1Admin-Benutzer mit der Berechtigung **Einstellungen bearbeiten**

</div>

## Was wird synchronisiert

| B1-Änderung | Mailchimp-Effekt |
|---|---|
| Person hinzugefügt oder aktualisiert | Abonnent hinzugefügt/aktualisiert (Vorname, Nachname, Telefon; neue Abonnenten kommen als `abonniert` an) |
| Person gelöscht (oder DSGVO-gelöscht) | Abonnent archiviert |
| Person tritt einer Gruppe bei | Tag mit Namen der Gruppe hinzugefügt |
| Person verlässt eine Gruppe | Dieses Tag entfernt |
| Person betritt eine gespeicherte Liste | Tag mit Namen der Liste hinzugefügt |
| Person verlässt eine gespeicherte Liste | Dieses Tag entfernt |

**Gespeicherte Listen sind normalerweise die bessere Tag-Quelle.** Eine B1-[gespeicherte Liste](/docs/b1-admin/people/lists) ist eine regelbasierte Audience, die sich selbst neu bewertet – „alle im North-Campus", „Mitglieder, die sich für pastorale E-Mails anmeldeten". Richten Sie Ihre Mailchimp-Segmente auf Listenmarkierungen ein und die Synchronisation behält diese bei; verwenden Sie Gruppen-Tags für Mailing-Listen des Diensteamts.

Die Synchronisation ist **unidirektional** (B1 → Mailchimp) und berührt nur die Standardfelder von Mailchimp, sodass sie nicht mit Merge-Feldern oder Segmenten in Konflikt geraten kann, die Sie in Mailchimp verwalten.

## Konfiguration

1. Gehen Sie in B1Admin zu **Einstellungen → Entwickler → Webhooks → Webhook hinzufügen**.
2. Stellen Sie **Connector-Typ** auf **Mailchimp** ein.
3. Fügen Sie Ihren **Mailchimp API-Schlüssel** und **Audience-ID** ein. Der Schlüssel wird verschlüsselt gespeichert und nie wieder angezeigt.
4. Die relevanten Ereignisse sind bereits ausgewählt; deaktivieren Sie die, die Sie nicht möchten (z. B. Personenereignisse aktivieren, aber Gruppen-Tags überspringen).
5. Speichern Sie. B1 überprüft den Schlüssel und die Audience anhand von Mailchimp, bevor es akzeptiert wird – ein Tippfehler schlägt sofort mit einem Grund fehl.

Verwenden Sie **Test senden** jederzeit, um die Verbindung erneut zu überprüfen. Jeder Synchronisierungsversuch wird im Lieferverlauf des Webhooks mit der tatsächlichen Antwort von Mailchimp protokolliert, und fehlgeschlagene Lieferungen werden automatisch mit Backoff für etwa fünf Tage erneut versucht.

## Erstmaliger Import

Der Connector synchronisiert *Änderungen* ab dem Moment, in dem er aktiv ist; es erfolgt keine Rückfüllung Ihres vorhandenen Verzeichnisses. Für den Einrichtungstag:

1. Gehen Sie in B1Admin zu **Personen**, suchen Sie nach den Personen, die Sie möchten (oder führen Sie eine gespeicherte Liste aus), und klicken Sie auf **Exportieren**, um eine CSV herunterzuladen.
2. Verwenden Sie in Mailchimp **Audience → Kontakte importieren**, um die CSV zu laden und Tags während des Imports anzuwenden.

Wenn Sie die Erstausstattung über Mailchimps Importer durchführen, behalten Sie die Kontrolle über die Einwilligungsfrage – importieren Sie nur Personen, die tatsächlich zugestimmt haben, Ihre E-Mails zu erhalten. Das Massenimportieren eines ganzen Verzeichnisses als abonnierte Kontakte kann gegen Mailchimps Bedingungen und Anti-Spam-Gesetze (CAN-SPAM/DSGVO) verstoßen.

## Einschränkungen und Hinweise

- **Unidirektionale Synchronisation.** Abmeldungen, Bounces und Bearbeitungen in Mailchimp fließen nicht zu B1 zurück. Jemand, der sich in Mailchimp abmeldet, kann trotzdem E-Mails erhalten, die direkt von B1 versendet werden – behandeln Sie Mailchimp als Quelle der Wahrheit für die Zustimmung zum Massen-E-Mail-Versand.
- **Personen ohne E-Mail-Adresse werden übersprungen** (protokolliert im Lieferverlauf) – Mailchimp-Abonnenten werden durch E-Mail identifiziert.
- **E-Mail-Adressänderungen erstellen einen neuen Abonnenten.** Mailchimp identifiziert Personen durch E-Mail, sodass das Ändern der E-Mail einer Person in B1 sie unter der neuen Adresse hinzufügt; der alte Abonnent bleibt bestehen, bis Sie ihn in Mailchimp archivieren.
- **Nur Standardfelder werden synchronisiert** – Vorname, Nachname, Telefon. Mitgliedschaftsstatus, Campus und benutzerdefinierte B1-Felder werden in dieser Version nicht auf Mailchimp-Merge-Felder abgebildet; verwenden Sie stattdessen Listenmarkierungen zum Segmentieren.
- **Tag-Namen sind die Gruppen-/Listennamen.** Das Umbenennen einer Gruppe oder Liste führt zu einer neuen Markierung; das alte Tag bleibt auf vorhandenen Abonnenten, bis es in Mailchimp entfernt wird.
- **Mailchimps Kontaktlimits gelten weiterhin** – eine Synchronisation, die eine Audience des kostenlosen Plans über die Obergrenze hinaus treibt, protokolliert `Member limit reached`-Fehler im Lieferverlauf.

## Andere Rezepte (Zapier / Make)

Alles über die Audience-Synchronisation hinaus – das Markieren von Gebern bei `donation.created`, eine Mailchimp → B1-Rückrichtung oder die Synchronisation mit einer anderen E-Mail-Plattform (Constant Contact, Brevo usw.) – ist über [Zapier](../zapier) oder [Make](../make) verfügbar, das bei denselben Webhook-Ereignissen ausgelöst wird:

- **Geber markieren:** B1 *New Donation* → B1 *Find Person* → Mailchimp *Add Subscriber to Tag* (`Gave-2026`)
- **Bidirektional:** Mailchimp *New Subscriber* → B1 *Create Person*

Wenn Sie zuvor die Personen-/Gruppensynchronisation über Zapier verdrahtet haben, schalten Sie diese Zaps nach der Aktivierung des nativen Connectors aus – wenn Sie beide ausführen, wird jedes Ereignis doppelt verarbeitet und verbrennt Zapier-Aufgaben für nichts.

## Fehlerbehebung

- **Speichern schlägt mit „Mailchimp hat den API-Schlüssel abgelehnt" fehl** – der Schlüssel wurde widerrufen oder falsch eingegeben. Schlüssel müssen mit einem Rechenzentrum-Suffix wie `-us21` enden.
- **Speichern schlägt mit „Audience nicht gefunden" fehl** – die Audience-ID existiert nicht unter diesem Konto. Kopieren Sie sie aus **Audience → Einstellungen → Name und Standardeinstellungen der Audience** (es ist nicht der Name der Audience).
- **Eine Person erschien nie in Mailchimp** – überprüfen Sie den Lieferverlauf des Webhooks. "Übersprungen: Person hat keine E-Mail-Adresse" bedeutet genau das; a `4xx` von Mailchimp zeigt den Grund im Response-Text.
- **Lieferungen wurden vollständig beendet** – nach wiederholten erschöpften Lieferungen wird der Webhook automatisch deaktiviert. Beheben Sie die Ursache (normalerweise ein widerrufener Schlüssel), reaktivieren Sie ihn und verwenden Sie **Test senden**, um zu bestätigen.

## Siehe auch

- [Webhooks (Entwicklerreferenz)](/docs/developer/api/webhooks) – die zugrunde liegende Engine, Ereigniskatalog, Lieferungs-/Wiederholungssemantik
- [Gespeicherte Listen](/docs/b1-admin/people/lists) – regelbasierte Audiences, die sich natürlich auf Mailchimp-Tags abbilden
- [Zapier (Übersicht)](../zapier) – für Rezepte über die Audience-Synchronisation hinaus
