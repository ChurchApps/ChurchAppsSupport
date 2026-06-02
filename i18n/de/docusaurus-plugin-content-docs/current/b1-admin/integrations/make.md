---
title: "Make"
---

# Make

<div class="article-intro">

[Make](https://www.make.com) (ehemals Integromat) ist eine visuelle Workflow-Automatisierungsplattform – ähnlich in der Geistesart wie Zapier, mit flexiblerer Logik und einer günstigeren Rechnung im großen Maßstab. Die offizielle B1.church Make-App lässt Sie „Szenarien" erstellen, die sofort auf B1-Ereignisse reagieren und Datensätze zurück zu B1 schreiben.

</div>

<div class="prereqs">
<h4>Bevor Sie Beginnen</h4>

- Ein [Make](https://www.make.com)-Konto (die kostenlose Ebene deckt kleine Workflows ab)
- Ein Gemeinde-Admin mit der Berechtigung **Einstellungen bearbeiten** in B1Admin
- Eine grobe Idee des Szenarios, das Sie erstellen möchten

</div>

## Module

| Typ | Was | B1-Ereignis / Endpoint |
|---|---|---|
| **Sofortiger Auslöser** | Watch Events | ein beliebiges abonniertes B1-Ereignis (`person.created`, `donation.created`, …) |
| **Aktion** | Person erstellen | fügt eine neue Person hinzu |
| **Aktion** | Spende hinzufügen | zeichnet eine Spende auf |
| **Aktion** | Gruppenmitglied hinzufügen | fügt eine Person zu einer Gruppe hinzu |
| **Suche** | Personen suchen | findet Personen nach Name oder E-Mail |

Der sofortige Auslöser lässt Sie wählen, auf welches Ereignis Sie hören – ein Trigger-Modul pro Szenario, konfiguriert pro Ereignis.

## Setup

### 1. Erstellen Sie einen B1 API-Schlüssel

1. Gehen Sie in B1Admin zu **Einstellungen → Entwickler → API-Schlüssel**.
2. Klicken Sie auf **Neuer API-Schlüssel**, geben Sie ihm den Namen „Make" und gewähren Sie die Geltungsbereiche, die Sie benötigen.
3. **Schließen Sie `settings:write` ein**, wenn eines Ihrer Szenarien den sofortigen Auslöser verwendet – Make registriert einen Webhook in Ihrem Namen, wenn das Szenario eingeschaltet wird.
4. Gewähren Sie auch die Geltungsbereiche, die die Aktions-Module benötigen (z.B. `donations:write` für das Module „Spende hinzufügen").
5. Speichern und kopieren Sie den `cak_…`-Schlüssel.

### 2. Installieren Sie die Verbindung

1. Erstellen Sie in Make ein neues Szenario und ziehen Sie das **B1.church**-Trigger-Modul auf die Canvas.
2. Wenn Sie dazu aufgefordert werden, **Erstellen Sie eine Verbindung**. Fügen Sie den API-Schlüssel in das Feld *API-Schlüssel* ein und lassen Sie *API-Basis-URL* als `https://api.churchapps.org` (es sei denn, Sie testen gegen Staging).
3. Klicken Sie auf **Speichern** – Make testet den Schlüssel, indem es Ihr Gemeindeprofil liest.

Die Verbindung wird in Ihrem Make-Konto gespeichert und über Szenarien hinweg wiederverwendet.

### 3. Konfigurieren Sie den Auslöser

1. Öffnen Sie die Einstellungen des **Watch Events**-Moduls.
2. Wählen Sie das Ereignis, das Sie wünschen – z.B. `donation.created`.
3. Speichern. Make generiert eine eindeutige Webhook-URL und speichert sie intern.

### 4. Fügen Sie nachgelagerte Module hinzu

Ziehen Sie eines von Maches Hunderten von App-Modulen auf die Canvas – Mailchimp, Google Sheets, Slack, HubSpot, Ihr eigener HTTP-Endpoint usw. Ordnen Sie die Ausgabe des Auslösers (`event`, `churchId`, `data.id`, `data.amount`, …) in ihre Eingabefelder. Maches flatten / iterator / router / aggregator Module lassen Sie Verzweigungen und parallele Flows erstellen, die in Zapier schwierig wären.

### 5. Schalten Sie das Szenario ein

Schalten Sie **Aktiv** in der Szenario-Kopfzeile um. Make ruft B1s `POST /membership/webhooks` auf, um die URL zu registrieren. Von diesem Moment an fließt jedes entsprechende B1-Ereignis in Echtzeit durch das Szenario.

Das Ausschalten des Szenarios ruft `DELETE /membership/webhooks/{id}` auf, damit es keine verwaisten Abonnements gibt.

## Häufige Rezepte

### Spenden mit Google Sheet für Finanzbewertung synchronisieren

- **Auslöser** – B1: Watch Events (`donation.created`)
- **Aktion** – Google Sheets: Reihe hinzufügen. Ordnen Sie `data.donationDate`, `data.amount`, `data.personId`, `data.method`, `data.batchId` in die Spalten des Blatts.

### Bedingte Slack-Benachrichtigung nach Spendenbetrag

- **Auslöser** – B1: Watch Events (`donation.created`)
- **Router**:
  - Zweig A – Filter: `data.amount >= 1000` → Slack: Beitrag zu `#major-gifts`
  - Zweig B – Durchgang → Slack: Beitrag zu `#donations`

### Neue Person → CRM + Willkommens-E-Mail + Slack

- **Auslöser** – B1: Watch Events (`person.created`)
- **Aktion** – HubSpot: Kontakt erstellen
- **Aktion** – Mailgun: Willkommens-E-Mail senden
- **Aktion** – Slack: Benachrichtigung `#new-people` (parallel – verwenden Sie Maches Router)

## Wie der sofortige Auslöser funktioniert

Der sofortige Auslöser ist Webhook-gestützt, nicht abrufend – wenn aktiviert, ruft Make `POST /membership/webhooks` mit seiner generierten URL und dem Ereignis, das Sie gewählt haben, auf. Wenn das Ereignis in B1 auslöst, sendet B1 die Hülle an Maches URL und Ihr Szenario läuft innerhalb von Sekunden. Das Deaktivieren des Szenarios entfernt den Webhook.

Der Auslöser wird nur für Ereignisse ausgelöst, die **während das Szenario aktiv ist** auftreten. Es gibt kein Backfill.

## Limits & Notizen

- **Ein Ereignis pro Watch Events-Modul.** Um mehrere Ereignisse in einem Szenario zu hören, ziehen Sie mehrere Trigger-Module in getrennte Szenarien (oder verwenden Sie ein einzelnes Modul mit der zusammengeführten Ereignisliste – siehe unten).
- **Signatur-Verifizierung wird nicht offengelegt** – Make übergibt `X-B1-Signature` nicht an das Szenario; die Vertrauensgrenze ist Maches ungefährbare Pro-Szenario-Webhook-URL. Dies ist eine normale Make-Praxis. Wenn Sie explizite Signaturüberprüfungen benötigen, erstellen Sie stattdessen eine benutzerdefinierte Integration mit dem [SDK](/docs/developer/api/webhooks#sdk-support).
- **Betriebsanzahl** – Jeder API-Aufruf aus einem Aktions-Modul zählt gegen Ihr Make-Betriebskontingent, nicht gegen etwas in B1.

## Fehlerbehebung

- **Verbindungstest schlägt fehl** – am häufigsten ein Tippfehler im API-Schlüssel. Kopieren Sie ihn erneut aus B1Admin (der vollständige Schlüssel wird nur einmal angezeigt; wenn Sie ihn verloren haben, erstellen Sie einen neuen Schlüssel).
- **Trigger-Modul wird nicht aktiviert** – überprüfen Sie **Einstellungen → Entwickler → Webhooks** in B1Admin. Wenn Sie keinen „Make — &lt;event&gt;"-Eintrag sehen, nachdem Sie das Szenario aktiviert haben, fehlt dem Schlüssel `settings:write`. Aktualisieren Sie den Schlüssel und aktivieren Sie erneut.
- **Aktion gibt `403 Forbidden` zurück** – der API-Schlüssel hat nicht den Geltungsbereich für diesen Endpoint. Zum Beispiel benötigt „Spende hinzufügen" `donations:write`. Aktualisieren Sie den Schlüssel in B1Admin und testen Sie erneut.

## Anpassung der App

Die B1.church Make-App ist Open Source – die JSON-Definitionen leben im `B1Integrations/Make/`-Repository. Wenn Sie ein Modul benötigen, das nicht existiert (z.B. eine neue Aktion für einen Endpoint, den wir nicht abgedeckt haben), öffnen Sie ein Problem oder PR dort.

## Siehe auch

- [Zapier](./zapier) – gleiches Muster mit einer einfacheren UI und größerer App-Katalog
- [Slack & Discord](./slack-discord) – integrierte Chat-Benachrichtigungen ohne Make
- [Webhooks (Entwickler-Referenz)](/docs/developer/api/webhooks)
