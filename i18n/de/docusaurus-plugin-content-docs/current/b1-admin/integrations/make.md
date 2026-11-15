---
title: "Make"
description: "Verbinden Sie B1 Admin mit Make, um Abläufe zu automatisieren: API-Schlüssel erstellen, den B1.church-Auslöser und die Aktionen einrichten und häufige Fehler beheben."
---

# Make

<div class="article-intro">

[Make](https://www.make.com) (früher Integromat) ist eine visuelle Plattform zur Workflow-Automatisierung – ähnlich wie Zapier, mit flexibler Logik und im großen Maßstab günstiger. Die offizielle Make-App für B1.church ermöglicht es Ihnen, „Szenarien“ zu erstellen, die sofort auf B1-Ereignisse reagieren und Datensätze zurück nach B1 schreiben.

</div>

:::caution Noch nicht verfügbar
Die Make-App für B1.church ist noch nicht im App-Verzeichnis von Make veröffentlicht. Daher können Sie die unten beschriebenen **B1.church**-Module heute noch nicht zu einem Szenario hinzufügen. Verwenden Sie bis dahin [Zapier](./zapier.md) oder rufen Sie die [REST-API](/docs/developer/api) von B1 über das Modul **HTTP – Anfrage senden** in Make mit einem [API-Schlüssel](/docs/developer/api/api-keys) auf. Alles Folgende beschreibt, wie die App nach der Veröffentlichung funktionieren wird.
:::

<div class="prereqs">
<h4>Bevor Sie beginnen</h4>

- Ein [Make](https://www.make.com)-Konto (der kostenlose Tarif reicht für kleine Abläufe)
- Eine Gemeindeadministration mit der Berechtigung **Einstellungen bearbeiten** in B1Admin
- Eine grobe Vorstellung von dem Szenario, das Sie erstellen möchten

</div>

## Module {#modules}

| Typ | Was | B1-Ereignis / Endpunkt |
|---|---|---|
| **Sofortiger Auslöser** | Ereignisse beobachten | jedes abonnierte B1-Ereignis (`person.created`, `donation.created`, …) |
| **Aktion** | Person erstellen | fügt eine neue Person hinzu |
| **Aktion** | Spende hinzufügen | erfasst eine Spende |
| **Aktion** | Gruppenmitglied hinzufügen | fügt eine Person einer Gruppe hinzu |
| **Suche** | Personen suchen | findet Personen nach Name oder E-Mail-Adresse |

Der sofortige Auslöser lässt Sie wählen, auf welches Ereignis er hört – ein Auslösemodul pro Szenario, je Ereignis konfiguriert.

## Einrichtung {#setup}

### 1. Einen B1-API-Schlüssel erstellen {#1-create-a-b1-api-key}

1. Gehen Sie in B1Admin zu **Einstellungen → Entwickler → API-Schlüssel**.
2. Klicken Sie auf **Neuer API-Schlüssel**, benennen Sie ihn „Make“ und vergeben Sie die benötigten Berechtigungen.
3. **Nehmen Sie `settings:write` auf**, wenn eines Ihrer Szenarien den sofortigen Auslöser verwendet – Make registriert beim Einschalten des Szenarios in Ihrem Namen einen Webhook.
4. Vergeben Sie außerdem die Berechtigungen, die die Aktionsmodule benötigen (z. B. `donations:write` für das Modul Spende hinzufügen).
5. Speichern Sie und kopieren Sie den Schlüssel `cak_…`.

### 2. Die Verbindung einrichten {#2-install-the-connection}

1. Erstellen Sie in Make ein neues Szenario und ziehen Sie das Auslösemodul **B1.church** auf die Arbeitsfläche.
2. Wenn Sie dazu aufgefordert werden, wählen Sie **Verbindung erstellen**. Fügen Sie den API-Schlüssel in das Feld *API-Schlüssel* ein und lassen Sie *API-Basis-URL* als `https://api.churchapps.org` (außer Sie testen gegen die Testumgebung).
3. Klicken Sie auf **Speichern** – Make prüft den Schlüssel, indem es Ihr Gemeindeprofil liest.

Die Verbindung wird in Ihrem Make-Konto gespeichert und in allen Szenarien wiederverwendet.

### 3. Den Auslöser konfigurieren {#3-configure-the-trigger}

1. Öffnen Sie die Einstellungen des Moduls **Ereignisse beobachten**.
2. Wählen Sie das gewünschte Ereignis – z. B. `donation.created`.
3. Speichern Sie. Make erzeugt eine eindeutige Webhook-URL und speichert sie intern.

### 4. Nachgelagerte Module hinzufügen {#4-add-downstream-modules}

Ziehen Sie beliebige der hunderten App-Module von Make auf die Arbeitsfläche – Mailchimp, Google Tabellen, Slack, HubSpot, Ihren eigenen HTTP-Endpunkt usw. Ordnen Sie die Ausgabe des Auslösers (`event`, `churchId`, `data.id`, `data.amount`, …) den Eingabefeldern zu. Die Module zum Flachmachen, Iterieren, Verzweigen und Aggregieren von Make ermöglichen verzweigte und parallele Abläufe, die in Zapier nur schwer umzusetzen wären.

### 5. Das Szenario einschalten {#5-turn-the-scenario-on}

Schalten Sie in der Kopfzeile des Szenarios **Aktiv** ein. Make ruft `POST /membership/webhooks` der B1-API auf, um die URL zu registrieren. Ab diesem Moment läuft jedes passende B1-Ereignis in Echtzeit durch das Szenario.

Beim Ausschalten des Szenarios wird `DELETE /membership/webhooks/{id}` aufgerufen, damit keine verwaisten Abonnements zurückbleiben.

## Häufige Rezepte {#common-recipes}

### Spenden zur Prüfung durch die Finanzabteilung in eine Google Tabelle übernehmen {#sync-donations-to-a-google-sheet-for-finance-review}

- **Auslöser** – B1: Ereignisse beobachten (`donation.created`)
- **Aktion** – Google Tabellen: Zeile hinzufügen. Ordnen Sie `data.donationDate`, `data.amount`, `data.personId`, `data.method` und `data.batchId` den Spalten der Tabelle zu.

### Bedingte Slack-Benachrichtigung je nach Spendenbetrag {#conditional-slack-notification-by-donation-amount}

- **Auslöser** – B1: Ereignisse beobachten (`donation.created`)
- **Router**:
  - Zweig A – Filter: `data.amount >= 1000` → Slack: in `#major-gifts` posten
  - Zweig B – Rest → Slack: in `#donations` posten

### Neue Person → CRM + Willkommens-E-Mail + Slack {#new-person--crm--welcome-email--slack}

- **Auslöser** – B1: Ereignisse beobachten (`person.created`)
- **Aktion** – HubSpot: Kontakt erstellen
- **Aktion** – Mailgun: Willkommens-E-Mail senden
- **Aktion** – Slack: in `#new-people` benachrichtigen (parallel – nutzen Sie dafür den Router von Make)

## So funktioniert der sofortige Auslöser {#how-the-instant-trigger-works}

Der sofortige Auslöser basiert auf Webhooks, nicht auf Abfragen. Beim Aktivieren ruft Make `POST /membership/webhooks` mit seiner erzeugten URL und dem gewählten Ereignis auf. Tritt das Ereignis in B1 ein, sendet B1 die Nachricht an die URL von Make, und Ihr Szenario läuft innerhalb von Sekunden. Beim Deaktivieren des Szenarios wird der Webhook entfernt.

Der Auslöser startet nur bei Ereignissen, die **während das Szenario aktiv ist** eintreten. Eine nachträgliche Verarbeitung älterer Ereignisse gibt es nicht.

## Einschränkungen und Hinweise {#limits--notes}

- **Ein Ereignis pro Modul „Ereignisse beobachten“.** Um auf mehrere Ereignisse zu hören, erstellen Sie je Ereignis ein eigenes Szenario.
- **Die Signaturprüfung wird nicht bereitgestellt** – Make gibt `X-B1-Signature` nicht an das Szenario weiter; die Vertrauensgrenze ist die nicht erratbare, pro Szenario eindeutige Webhook-URL von Make. Dies ist bei Make üblich. Wenn Sie explizite Signaturprüfungen benötigen, erstellen Sie stattdessen eine eigene Integration mit dem [SDK](/docs/developer/api/webhooks#sdk-support).
- **Anzahl der Operationen** – jeder API-Aufruf eines Aktionsmoduls zählt auf Ihr Operationskontingent in Make, nicht auf die Seite von B1.

## Fehlerbehebung {#troubleshooting}

- **Der Verbindungstest schlägt fehl** – meist ein Tippfehler im API-Schlüssel. Kopieren Sie ihn erneut aus B1Admin (der vollständige Schlüssel wird nur einmal angezeigt; haben Sie ihn verloren, erstellen Sie einen neuen).
- **Das Auslösemodul wird nicht aktiviert** – prüfen Sie in B1Admin unter **Einstellungen → Entwickler → Webhooks**. Wenn nach dem Aktivieren des Szenarios keine Zeile „Make – &lt;Ereignis&gt;“ erscheint, fehlt dem Schlüssel `settings:write`. Aktualisieren Sie den Schlüssel und aktivieren Sie das Szenario erneut.
- **Eine Aktion liefert `403 Forbidden`** – dem API-Schlüssel fehlt die Berechtigung für diesen Endpunkt. Spende hinzufügen benötigt zum Beispiel `donations:write`. Aktualisieren Sie den Schlüssel in B1Admin und testen Sie erneut.

## Fehlt ein Modul? {#missing-a-module}

Wenn Sie ein Modul benötigen, das es nicht gibt (z. B. eine neue Aktion für einen Endpunkt, den wir noch nicht abdecken), schreiben Sie an [support@churchapps.org](mailto:support@churchapps.org). Bis dahin kann das Modul **HTTP – Anfrage senden** in Make jeden B1-Endpunkt mit einem Header `Authorization: Bearer cak_…` aufrufen.

## Siehe auch {#see-also}

- [Zapier](./zapier.md) – dasselbe Muster mit einer einfacheren Oberfläche und einem größeren App-Katalog
- [Slack & Discord](./slack-discord.md) – eingebaute Chat-Benachrichtigungen ohne Make
- [Webhooks (Entwickler-Referenz)](/docs/developer/api/webhooks)
