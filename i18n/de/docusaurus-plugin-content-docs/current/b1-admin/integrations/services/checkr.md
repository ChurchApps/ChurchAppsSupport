---
title: "Checkr"
---

# Checkr

<div class="article-intro">

[Checkr](https://checkr.com) führt Hintergrundüberprüfungen für Personal und Freiwillige durch – ein nahezu universelles Bedürfnis für jede Gemeinde, die ein Kinder- oder Jugendprogramm betreibt. Checkr hat keine Zapier-App, aber [Make.coms Checkr-Integration](https://www.make.com/en/integrations/checkr) ist verifiziert und stellt die Aktionen zur Verfügung, die Sie benötigen, um eine Überprüfung von einem B1-Ereignis aus zu starten.

</div>

<div class="prereqs">
<h4>Bevor Sie Beginnen</h4>

- Ein [Checkr](https://checkr.com)-Konto mit API-Zugriff und mindestens einem konfigurierten Screening-Paket
- Ein [Make](https://www.make.com)-Konto
- Ein B1Admin-Benutzer mit der Berechtigung **Einstellungen bearbeiten**

</div>

## Was Sie verkabeln können

Maches Checkr-App stellt 1 Auslöser und 6 Aktionen zur Verfügung:

| Richtung | B1 / Make Auslöser | Aktion |
|---|---|---|
| B1 → Checkr | B1 `group.member.added` (gefiltert auf eine Freiwilligengruppe) | Checkr: Kandidat erstellen → Hintergrundprüfungs-Einladung erstellen |
| Checkr → B1 | Checkr-Webhook (Einladungs- / Berichtereignis) | B1: Personeneintrag aktualisieren (z.B. Tag „Checkr freigegeben") |

Maches Checkr-Aktionen: Kandidat erstellen, Hintergrundprüfungs-Einladung erstellen, Kandidat abrufen, Bericht abrufen, Berichts-ETA abrufen, Einladung abrufen. Plus 4 Such-Module.

## Setup

### 1. Prägen Sie einen B1 API-Schlüssel

**Einstellungen → Entwickler → API-Schlüssel → Neuer API-Schlüssel**:

- `settings:write` – für den Trigger-Webhook
- `people:read` – um den Namen/die E-Mail der Person nachzuschlagen, wenn Sie eine Überprüfung starten
- (Optional) `people:write` wenn Sie den Berichtstatus als benutzerdefiniertes Feld oder Tag zurückschreiben möchten

### 2. Erstellen Sie das Szenario „Überprüfung beim Freiwilligenanmelden starten" in Make

1. **Auslöser** – B1.church: Watch Events (`group.member.added`).
2. **Filter** – fahren Sie nur fort, wenn `data.groupId` Ihrer „Children's Volunteers" (oder gleichwertig) Gruppe entspricht.
3. **Aktion** – B1.church: Person suchen (nach `data.personId`) um E-Mail + Vor-/Nachname zu erhalten.
4. **Aktion** – Checkr: Kandidat erstellen. Ordnen Sie Vor-/Nach-/E-Mail von Schritt 3 zu.
5. **Aktion** – Checkr: Hintergrundprüfungs-Einladung erstellen. Ordnen Sie die neue Kandidaten-ID von Schritt 4 dem Feld *candidate_id* zu. Wählen Sie das Screening-Paket (z.B. `tasker_standard` oder was Ihr Konto zeigt).
6. (Optional) **Aktion** – Slack: benachrichtigen Sie Ihren Sicherheits-Koordinator, dass eine Überprüfung eingeleitet wurde.

Schalten Sie das Szenario ein. Neue Freiwillige in der angestrebten Gruppe erhalten automatisch eine Checkr-Einladung per E-Mail; sie füllen sie auf ihrem Telefon oder Laptop aus; Checkr läuft auf dem Bildschirm.

### 3. (Optional) Erhalten Sie den Bericht zurück

1. **Auslöser** – Checkr: Watch Events (Webhook). Make registriert einen Checkr-Webhook bei der Aktivierung.
2. **Filter** – fahren Sie nur fort, wenn `event_type = report.completed`.
3. **Aktion** – Checkr: Bericht abrufen (verwenden Sie die Berichts-ID aus dem Webhook).
4. **Aktion** – B1.church: Person suchen (nach Kandidaten-E-Mail).
5. **Aktion** – Bedingte Slack / E-Mail: benachrichtigen Sie den Koordinator mit `clear` / `consider` / `suspended` Status.

Hinweis: B1 hat heute kein integriertes Feld „Background-Check-Status". Die praktischen Optionen sind (a) das Ergebnis in einen privaten Slack-Kanal zur Überprüfung posten, (b) es in einem Google Sheet zur Überprüfung schreiben oder (c) die Person beim `clear` zu einer Gruppe „Freigegebene Freiwillige" in B1 hinzufügen.

## Häufige Rezepte

### Freiwillige alle 2 Jahre erneut überprüfen

Kombinieren Sie das Obige mit einem Make-Schedule-Auslöser:

- **Auslöser** – Make: Schedule (monatlich)
- **Aktion** – B1.church: List Group Members für „Cleared volunteers"
- **Aktion** – Filter nach Make: freigegeben Datum älter als 22 Monate
- **Aktion** – Checkr: Hintergrundprüfungs-Einladung erstellen (gleiches wie der erste Flow)

### Blockieren Sie Stufe 1 Zugang, bis die Überprüfung abgeschlossen ist

Wenn Ihre Gemeinde B1-Gruppenmitgliedschaft verwendet, um Zugriff zu gewähren (z.B. nur Mitglieder der „Cleared"-Gruppe erscheinen in Dienstverpflichtungsplänen), halten Sie neue Freiwillige in einer Warteschlange-Gruppe, bis das Checkr `report.completed`-Ereignis sie umschaltet.

## Limits & Notizen

- **Checkr ist nur in den USA** für die meisten Screening-Pakete. Australische, UK und kanadische Gemeinden benötigen eine Alternative.
- **Preise** sind pro Überprüfung – jede Create Invitation in Make brennt eine echte Überprüfung. Testen Sie zuerst in Checkrs Sandbox / Staging-Konto (Maches Checkr-App respektiert die Anmeldedaten, die Sie in der Verbindung übergeben, also wechselt das Tauschen von Anmeldedaten Sandbox/Live).
- **Checkr API-Zugriff ist plangebunden.** Kleinere Checkr-Konten können sich auf einer UI-only-Ebene befinden; wenden Sie sich an Checkr, um API zu aktivieren.

## Fehlerbehebung

- **Create Candidate fehlgeschlagen mit `403`** – das Checkr API-Token ist schreibgeschützt oder hat die richtigen Kontoberechtigungen nicht. Stellen Sie es aus dem Checkr-Dashboard mit Schreib-Geltungsbereich neu aus.
- **Einladung kommt nie an** – überprüfen Sie die E-Mail des Kandidaten in Schritt 3; B1 kann ein leeres E-Mail-Feld für diese Person haben. Fügen Sie vor dem Checkr-Schritt einen E-Mail-erforderlich-Filter hinzu.
- **Webhook-Auslöser wird nicht ausgelöst** – Checkrs Webhook-Registrierung schlägt manchmal still fehl, wenn Ihr Make-Konto nicht auf einer bezahlten Ebene ist, die ausgehende Webhooks unterstützt. Überprüfen Sie auf Checkrs Dashboard *Webhooks*-Seite, dass Maches URL aufgeführt ist.

## Siehe auch

- [Make (Übersicht)](../make) – B1-Seite jedes Make-Szenarios
- [Mobile Message](./mobile-message) – für SMS-Anbieter ohne Zapier-Apps, gleiches Webhooks/HTTP-Verkabelungsmuster wie die Checkr Make-Verkabelung
- [Checkr API-Dokumente](https://docs.checkr.com/)
