---
title: "Mailchimp"
---

# Mailchimp

<div class="article-intro">

Halten Sie ein Mailchimp-Publikum automatisch mit B1 synchron: Personen werden mit Name, E-Mail-Adresse und Telefonnummer übernommen, Gruppen- und Listenmitgliedschaften werden zu Mailchimp-Tags, und gelöschte Personen werden archiviert. Die Synchronisierung ist in B1 integriert – es ist kein Drittanbieterdienst erforderlich, es fallen keine Gebühren pro Aufgabe an, und Änderungen werden nahezu in Echtzeit übertragen und nicht erst nächtlich.

</div>

<div class="prereqs">
<h4>Bevor Sie beginnen</h4>

- Ein [Mailchimp](https://mailchimp.com)-Konto mit dem Publikum, das B1 verwalten soll
- Ein Mailchimp-**API-Schlüssel** (Mailchimp: Profilsymbol → **Konto & Abrechnung → Extras → API-Schlüssel**)
- Ihre **Publikums-ID** (Mailchimp: **Publikum → Einstellungen → Publikumsname und Standardwerte**)
- Ein B1Admin-Benutzer mit der Berechtigung **Einstellungen bearbeiten**

</div>

## Was synchronisiert wird

| Änderung in B1 | Auswirkung in Mailchimp |
|---|---|
| Person hinzugefügt oder aktualisiert | Abonnent hinzugefügt/aktualisiert (Vorname, Nachname, Telefon; neue Abonnenten erhalten den Status `subscribed`) |
| Person gelöscht (oder nach DSGVO entfernt) | Abonnent archiviert |
| Person tritt einer Gruppe bei | Tag mit dem Namen der Gruppe hinzugefügt |
| Person verlässt eine Gruppe | Dieses Tag entfernt |
| Person wird in eine gespeicherte Liste aufgenommen | Tag mit dem Namen der Liste hinzugefügt |
| Person verlässt eine gespeicherte Liste | Dieses Tag entfernt |

**Gespeicherte Listen sind in der Regel die bessere Tag-Quelle.** Eine gespeicherte Liste in B1 ist ein regelbasiertes Publikum, das sich selbst aktualisiert – etwa „alle am Standort Nord“ oder „Mitglieder, die E-Mails der Seelsorge zugestimmt haben“. Wenn Sie Ihre Mailchimp-Segmente auf Listen-Tags ausrichten, hält die Synchronisierung sie automatisch aktuell. Verwenden Sie Gruppen-Tags für Rundschreiben an Dienstteams.

Die Synchronisierung erfolgt **einseitig** (B1 → Mailchimp) und betrifft nur die Standardfelder von Mailchimp. Dadurch kann sie nicht mit Seriendruckfeldern oder Segmenten in Konflikt geraten, die Sie innerhalb von Mailchimp verwalten.

## Einrichtung

1. Gehen Sie in B1Admin zu **Einstellungen → Entwickler → Webhooks → Neuer Webhook**.
2. Setzen Sie **Connector-Typ** auf **Mailchimp**.
3. Fügen Sie Ihren **Mailchimp-API-Schlüssel** und Ihre **Publikums-ID** ein. Der Schlüssel wird verschlüsselt gespeichert und nie wieder angezeigt.
4. Die relevanten Ereignisse sind bereits vorausgewählt. Deaktivieren Sie alle, die Sie nicht möchten (z. B. Personenereignisse aktiviert lassen, aber Gruppen-Tags überspringen).
5. Speichern Sie. B1 überprüft Schlüssel und Publikum bei Mailchimp, bevor die Eingabe akzeptiert wird – ein Tippfehler führt sofort zu einer Fehlermeldung mit Begründung.

Mit **Test senden** können Sie die Verbindung jederzeit erneut überprüfen. Jeder Synchronisierungsversuch wird im Zustellungsverlauf des Webhooks mit der tatsächlichen Antwort von Mailchimp protokolliert. Fehlgeschlagene Zustellungen werden automatisch mit zunehmenden Abständen etwa fünf Tage lang wiederholt.

## Erstimport

Der Connector synchronisiert *Änderungen* ab dem Zeitpunkt, an dem er aktiviert ist; er übernimmt Ihr bestehendes Personenverzeichnis nicht rückwirkend. Für den Einrichtungstag gilt:

1. Gehen Sie in B1Admin zu **Personen**, suchen Sie die gewünschten Personen (oder führen Sie eine gespeicherte Liste aus) und klicken Sie auf **Exportieren**, um eine CSV-Datei herunterzuladen.
2. Verwenden Sie in Mailchimp **Publikum → Kontakte importieren**, um die CSV-Datei zu laden, und wenden Sie beim Import gegebenenfalls Tags an.

Wenn Sie den Erstimport über den Importer von Mailchimp durchführen, behalten Sie die Kontrolle über die Einwilligung – importieren Sie nur Personen, die tatsächlich zugestimmt haben, Ihre E-Mails zu erhalten. Ein Massenimport des gesamten Verzeichnisses als abonnierte Kontakte kann gegen die Nutzungsbedingungen von Mailchimp und gegen Anti-Spam-Gesetze (CAN-SPAM/DSGVO) verstoßen.

## Einschränkungen und Hinweise

- **Einseitige Synchronisierung.** Abmeldungen, Unzustellbarkeiten und Änderungen, die in Mailchimp vorgenommen werden, werden nicht nach B1 zurückübertragen. Eine Person, die sich in Mailchimp abgemeldet hat, kann trotzdem E-Mails erhalten, die direkt aus B1 versendet werden. Betrachten Sie Mailchimp daher als maßgebliche Quelle für die Einwilligung zu Massen-E-Mails.
- **Personen ohne E-Mail-Adresse werden übersprungen** (dies wird im Zustellungsverlauf protokolliert), da Mailchimp-Abonnenten anhand der E-Mail-Adresse zugeordnet werden.
- **Eine Änderung der E-Mail-Adresse legt einen neuen Abonnenten an.** Mailchimp identifiziert Personen anhand der E-Mail-Adresse. Wenn Sie die E-Mail-Adresse einer Person in B1 ändern, wird sie unter der neuen Adresse angelegt. Der alte Abonnent bleibt bestehen, bis Sie ihn in Mailchimp archivieren.
- **Nur Standardfelder werden synchronisiert** – Vorname, Nachname und Telefon. Mitgliedschaftsstatus, Standort und benutzerdefinierte B1-Felder werden in dieser Version nicht auf Seriendruckfelder von Mailchimp abgebildet. Verwenden Sie stattdessen Listen-Tags zur Segmentierung.
- **Tag-Namen entsprechen den Namen der Gruppen bzw. Listen.** Wenn Sie eine Gruppe oder Liste umbenennen, werden neue Tags unter dem neuen Namen vergeben. Das alte Tag bleibt bei bestehenden Abonnenten erhalten, bis Sie es in Mailchimp entfernen.
- **Die Kontingente von Mailchimp gelten weiterhin** – eine Synchronisierung, die ein kostenloses Publikum über sein Limit hinaus füllt, protokolliert Fehler vom Typ `Member limit reached` im Zustellungsverlauf.

## Weitere Rezepte (Zapier / Make)

Alles, was über die Publikumssynchronisierung hinausgeht – etwa Spender mit `donation.created` taggen, eine Synchronisierung von Mailchimp zurück nach B1 oder die Anbindung an eine andere E-Mail-Plattform (Constant Contact, Brevo usw.) – ist weiterhin über [Zapier](../zapier) oder [Make](../make) möglich. Beide reagieren auf dieselben Webhook-Ereignisse:

- **Spender taggen:** B1 *New Donation* → B1 *Find Person* → Mailchimp *Add Subscriber to Tag* (`Gave-2026`)
- **Zweiseitig:** Mailchimp *New Subscriber* → B1 *Create Person*

Falls Sie die Synchronisierung von Personen und Gruppen bisher über Zapier eingerichtet haben, deaktivieren Sie diese Zaps, sobald Sie den nativen Connector aktiviert haben. Wenn beide parallel laufen, wird jedes Ereignis doppelt verarbeitet, und Sie verbrauchen unnötig Zapier-Aufgaben.

## Fehlerbehebung

- **Speichern schlägt mit „Mailchimp rejected the API key“ fehl** – Der Schlüssel wurde widerrufen oder falsch eingegeben. Schlüssel enden auf ein Rechenzentrumskürzel wie `-us21`.
- **Speichern schlägt mit „audience not found“ fehl** – Die Publikums-ID existiert in diesem Konto nicht. Kopieren Sie sie aus **Publikum → Einstellungen → Publikumsname und Standardwerte** (nicht den Namen des Publikums).
- **Eine Person erscheint nie in Mailchimp** – Prüfen Sie den Zustellungsverlauf des Webhooks. „Skipped: person has no email address“ bedeutet genau das. Ein `4xx`-Fehler von Mailchimp zeigt die Ursache im Antworttext an.
- **Zustellungen sind vollständig ausgefallen** – Nach wiederholt fehlgeschlagenen Zustellungen wird der Webhook automatisch deaktiviert. Beheben Sie die Ursache (meist ein widerrufener Schlüssel), aktivieren Sie den Webhook wieder und prüfen Sie die Verbindung mit **Test senden**.

## Siehe auch

- [Webhooks (Entwicklerreferenz)](/docs/developer/api/webhooks) – die zugrunde liegende Technik, Ereigniskatalog, Semantik von Zustellung und Wiederholung
- [Gespeicherte Listen](/docs/b1-admin/people/lists) – regelbasierte Publikumslisten, die sich ideal auf Mailchimp-Tags abbilden lassen
- [Zapier (Übersicht)](../zapier) – für Rezepte, die über die Publikumssynchronisierung hinausgehen
