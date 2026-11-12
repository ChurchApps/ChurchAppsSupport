---
title: "Mailchimp"
description: "Synchronisieren Sie Personen aus B1 Admin sowie Gruppen- und Listenmitgliedschaften als Markierungen mit einer Mailchimp-Zielgruppe – mit Einrichtung, Erstimport und Schritten zur Fehlerbehebung."
---

# Mailchimp

<div class="article-intro">

Halten Sie eine Mailchimp-Zielgruppe automatisch mit B1 synchron: Personen werden mit Name, E-Mail-Adresse und Telefonnummer übernommen, Gruppen- und Listenmitgliedschaften werden zu Mailchimp-Markierungen, und gelöschte Personen werden archiviert. Die Synchronisation ist in B1 integriert – kein Dienst eines Drittanbieters, keine Abrechnung pro Vorgang, und Änderungen kommen nahezu in Echtzeit an statt nachts nach Zeitplan.

</div>

<div class="prereqs">
<h4>Bevor Sie beginnen</h4>

- Ein [Mailchimp](https://mailchimp.com)-Konto mit der Zielgruppe, die B1 verwalten soll
- Ein Mailchimp-**API-Schlüssel** (Mailchimp: Profilsymbol → **Konto & Abrechnung → Extras → API-Schlüssel**)
- Ihre **Zielgruppen-ID** (Mailchimp: **Zielgruppe → Einstellungen → Name und Standardwerte der Zielgruppe**)
- Ein B1Admin-Benutzer mit der Berechtigung **Einstellungen bearbeiten**

</div>

## Was synchronisiert wird {#what-syncs}

| Änderung in B1 | Auswirkung in Mailchimp |
|---|---|
| Person hinzugefügt oder aktualisiert | Abonnent hinzugefügt/aktualisiert (Vorname, Nachname, Telefon; neue Abonnenten erhalten den Status `subscribed`) |
| Person gelöscht (oder nach DSGVO entfernt) | Abonnent archiviert |
| Person tritt einer Gruppe bei | Markierung mit dem Namen der Gruppe hinzugefügt |
| Person verlässt eine Gruppe | Diese Markierung entfernt |
| Person wird in eine gespeicherte Liste aufgenommen | Markierung mit dem Namen der Liste hinzugefügt |
| Person verlässt eine gespeicherte Liste | Diese Markierung entfernt |

**Gespeicherte Listen sind meist die bessere Quelle für Markierungen.** Eine [gespeicherte Liste](/docs/b1-admin/people/lists) in B1 ist eine regelbasierte Zielgruppe, die sich selbst fortlaufend neu berechnet – etwa „alle am Standort Nord“ oder „Mitglieder, die E-Mails der Seelsorge zugestimmt haben“. Verweisen Sie Ihre Mailchimp-Segmente auf die Markierungen der Listen; die Synchronisation hält sie aktuell. Verwenden Sie Gruppenmarkierungen für Rundschreiben an Dienst-Teams.

Die Synchronisation läuft **nur in eine Richtung** (B1 → Mailchimp) und verändert nur die Standardfelder von Mailchimp. Dadurch kann sie nicht mit Zusammenführungsfeldern oder Segmenten kollidieren, die Sie in Mailchimp verwalten.

## Einrichtung {#setup}

1. Gehen Sie in B1Admin zu **Einstellungen → Entwickler → Webhooks → Neuer Webhook**.
2. Setzen Sie den **Connector-Typ** auf **Mailchimp**.
3. Fügen Sie Ihren **Mailchimp-API-Schlüssel** und Ihre **Zielgruppen-ID** ein. Der Schlüssel wird verschlüsselt gespeichert und danach nie wieder angezeigt.
4. Die relevanten Ereignisse sind bereits ausgewählt; entfernen Sie die Auswahl bei allen, die Sie nicht möchten (lassen Sie z. B. Personenereignisse aktiv, aber verzichten Sie auf Gruppenmarkierungen).
5. Speichern Sie. B1 prüft Schlüssel und Zielgruppe bei Mailchimp, bevor die Angaben übernommen werden – ein Tippfehler schlägt sofort mit einer Begründung fehl.

Öffnen Sie den Webhook jederzeit erneut und klicken Sie auf **Testereignis senden**, um die Verbindung erneut zu prüfen (bei Mailchimp werden Schlüssel und Zielgruppe geprüft, statt einen Beispielabonnenten zu senden). Jeder Synchronisationsversuch wird im Zustellverlauf des Webhooks mit der tatsächlichen Antwort von Mailchimp protokolliert. Fehlgeschlagene Zustellungen werden automatisch mit zunehmenden Wartezeiten etwa fünf Tage lang wiederholt.

## Erstimport {#initial-import}

Der Connector synchronisiert *Änderungen* ab dem Moment, in dem er eingeschaltet ist; er überträgt nicht rückwirkend Ihr bestehendes Verzeichnis. Für den Einrichtungstag gilt:

1. Gehen Sie in B1Admin zu **Personen**, suchen Sie die gewünschten Personen (oder führen Sie eine gespeicherte Liste aus) und klicken Sie auf **Exportieren**, um eine CSV-Datei herunterzuladen.
2. Verwenden Sie in Mailchimp **Zielgruppe → Kontakte importieren**, um die CSV-Datei zu laden, und vergeben Sie beim Import eventuelle Markierungen.

Wenn Sie den Erstimport über den Importer von Mailchimp abwickeln, behalten Sie die Kontrolle über die Einwilligung – importieren Sie nur Personen, die tatsächlich zugestimmt haben, Ihre E-Mails zu erhalten. Ein Massenimport eines ganzen Verzeichnisses als abonnierte Kontakte kann gegen die Nutzungsbedingungen von Mailchimp und gegen Anti-Spam-Gesetze (CAN-SPAM/DSGVO) verstoßen.

## Einschränkungen und Hinweise {#limits--notes}

- **Synchronisation nur in eine Richtung.** Abmeldungen, Unzustellbarkeiten und Änderungen, die in Mailchimp vorgenommen werden, fließen nicht zurück nach B1. Eine Person, die sich in Mailchimp abgemeldet hat, kann trotzdem E-Mails erhalten, die direkt aus B1 versendet werden. Betrachten Sie Mailchimp daher als maßgebliche Quelle für die Einwilligung zu Massen-E-Mails.
- **Personen ohne E-Mail-Adresse werden übersprungen** (im Zustellverlauf entsprechend protokolliert) – Mailchimp-Abonnenten werden über die E-Mail-Adresse identifiziert.
- **Eine Änderung der E-Mail-Adresse erzeugt einen neuen Abonnenten.** Mailchimp erkennt Personen über die E-Mail-Adresse. Ändern Sie also die Adresse einer Person in B1, wird sie unter der neuen Adresse hinzugefügt; der alte Abonnent bleibt bestehen, bis Sie ihn in Mailchimp archivieren.
- **Nur Standardfelder werden synchronisiert** – Vorname, Nachname, Telefon. Mitgliedschaftsstatus, Standort und eigene B1-Felder werden in dieser Version nicht auf Zusammenführungsfelder von Mailchimp abgebildet; verwenden Sie stattdessen Listenmarkierungen zur Segmentierung.
- **Markierungsnamen entsprechen den Namen der Gruppen bzw. Listen.** Wenn Sie eine Gruppe oder Liste umbenennen, werden neue Markierungen unter dem neuen Namen vergeben. Die alte Markierung bleibt bei bestehenden Abonnenten erhalten, bis Sie sie in Mailchimp entfernen.
- **Die Kontaktlimits von Mailchimp gelten weiterhin** – bringt eine Synchronisation eine kostenlose Zielgruppe über ihr Limit, werden im Zustellverlauf Fehler `Member limit reached` protokolliert.

## Weitere Rezepte (Zapier / Make) {#other-recipes-zapier--make}

Alles, was über die Synchronisation der Zielgruppe hinausgeht – Spender mit `donation.created` markieren, eine umgekehrte Richtung von Mailchimp nach B1 oder die Synchronisation mit einer ganz anderen E-Mail-Plattform (Constant Contact, Brevo usw.) –, ist weiterhin über [Zapier](../zapier.md) oder [Make](../make.md) möglich. Beide lösen auf denselben Webhook-Ereignissen aus:

- **Spender markieren:** B1 *Neue Spende* → B1 *Person suchen* → Mailchimp *Abonnent einer Markierung hinzufügen* (`Gave-2026`)
- **Zwei Richtungen:** Mailchimp *Neuer Abonnent* → B1 *Person erstellen*

Wenn Sie die Synchronisation von Personen und Gruppen bereits über Zapier eingerichtet hatten, schalten Sie diese Zaps nach dem Aktivieren des integrierten Connectors aus. Laufen beide, wird jedes Ereignis doppelt verarbeitet, und Sie verbrauchen Zapier-Aufgaben ohne Nutzen.

## Fehlerbehebung {#troubleshooting}

- **Das Speichern schlägt mit „Mailchimp rejected the API key“ fehl** – der Schlüssel wurde widerrufen oder falsch eingegeben. Schlüssel enden auf ein Rechenzentrumskürzel wie `-us21`.
- **Das Speichern schlägt mit „audience not found“ fehl** – die Zielgruppen-ID existiert unter diesem Konto nicht. Kopieren Sie sie aus **Zielgruppe → Einstellungen → Name und Standardwerte der Zielgruppe** (sie ist nicht der Name der Zielgruppe).
- **Eine Person erscheint nie in Mailchimp** – prüfen Sie den Zustellverlauf des Webhooks. „Skipped: person has no email address“ bedeutet genau das; ein Fehler `4xx` von Mailchimp zeigt den Grund im Antworttext.
- **Die Zustellung ist ganz eingestellt** – nach wiederholt erschöpften Zustellungen schaltet sich der Webhook automatisch ab. Beheben Sie die Ursache (meist ein widerrufener Schlüssel), aktivieren Sie den Webhook wieder und prüfen Sie mit **Testereignis senden**.

## Siehe auch {#see-also}

- [Webhooks (Entwickler-Referenz)](/docs/developer/api/webhooks) – die Technik dahinter, Ereigniskatalog, Semantik von Zustellung und Wiederholung
- [Gespeicherte Listen](/docs/b1-admin/people/lists) – regelbasierte Zielgruppen, die sich natürlich auf Mailchimp-Markierungen abbilden lassen
- [Zapier (Überblick)](../zapier.md) – für Rezepte, die über die Synchronisation der Zielgruppe hinausgehen
