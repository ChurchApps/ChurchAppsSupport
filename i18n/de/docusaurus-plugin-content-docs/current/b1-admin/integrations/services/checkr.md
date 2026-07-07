---
title: "Checkr"
---

# Checkr

<div class="article-intro">

[Checkr](https://checkr.com) führt Hintergrundüberprüfungen für Mitarbeiter und Freiwillige durch -- eine nahezu universelle Anforderung für jede Kirche, die ein Kinder- oder Jugendprogramm durchführt. B1 hat **keine integrierte Hintergrundüberprüfungsfunktion** -- das Bestellen von Überprüfungen, das Verfolgen von Ergebnissen und die Überprüfung der Einhaltung existieren alle in Checkr; das folgende Rezept verdrahtet nur B1-Ereignisse darin. Checkr hat keine Zapier-App, aber [Make.coms Checkr-Integration](https://www.make.com/en/integrations/checkr) ist verifiziert und legt die Aktionen dar, die Sie benötigen, um eine Überprüfung von einem B1-Ereignis auszulösen.

</div>

<div class="prereqs">
<h4>Bevor Sie anfangen</h4>

- Ein [Checkr](https://checkr.com)-Konto mit API-Zugriff und mindestens einem konfigurierten Screening-Paket
- Ein [Make](https://www.make.com)-Konto
- Ein B1Admin-Benutzer mit der Berechtigung **Einstellungen bearbeiten**

</div>

## Was Sie verdrahten können

Make's Checkr-App legt 1 Trigger und 6 Aktionen dar:

| Richtung | B1 / Make Trigger | Aktion |
|---|---|---|
| B1 → Checkr | B1 `group.member.added` (gefiltert zu einer Freiwilligengruppe) | Checkr: Kandidaten erstellen → Hintergrund-Check-Einladung erstellen |
| Checkr → B1 | Checkr Webhook (Einladung / Bericht-Ereignis) | B1: Die Personenakte aktualisieren (z.B. Tag "Checkr freigegeben") |

Make's Checkr-Aktionen: Kandidaten erstellen, Hintergrund-Check-Einladung erstellen, Kandidaten abrufen, Bericht abrufen, ETA des Berichts abrufen, eine Einladung abrufen. Plus 4 Suchmodule.

## Einrichtung

### 1. Prägen Sie einen B1 API-Schlüssel

**Einstellungen → Entwickler → API-Schlüssel → Neuer API-Schlüssel**:

- `settings:write` — für den Trigger-Webhook
- `people:read` — zum Nachschlagen des Namens/der E-Mail der Person beim Starten einer Überprüfung
- (Optional) `people:write`, wenn Sie den Berichtstatus als benutzerdefiniertes Feld oder Tag zurückschreiben möchten

### 2. Erstellen Sie das Szenario "Überprüfung beim Freiwilligen-Signup starten" in Make

1. **Trigger** — B1.church: Watch Events (`group.member.added`).
2. **Filter** — Fahren Sie nur fort, wenn `data.groupId` Ihrer "Kinder-Freiwilligen" (oder ähnlich) Gruppe entspricht.
3. **Aktion** — B1.church: Person suchen (nach `data.personId`), um E-Mail + Vor-/Nachname zu erhalten.
4. **Aktion** — Checkr: Kandidaten erstellen. Ordnen Sie Vor-/Nach-/E-Mail von Schritt 3 zu.
5. **Aktion** — Checkr: Hintergrund-Check-Einladung erstellen. Ordnen Sie die neue Kandidaten-ID von Schritt 4 dem Feld *candidate_id* zu. Wählen Sie das Screening-Paket (z.B. `tasker_standard` oder was auch immer Ihr Konto legt dar).
6. (Optional) **Aktion** — Slack: Benachrichtigen Sie Ihren Koordinator für sichere Ministerien, dass eine Überprüfung eingeleitet wurde.

Schalten Sie das Szenario ein. Neue Freiwillige in der Zielgruppe erhalten eine automatische Checkr-Einladung per E-Mail; sie erledigen sie auf ihrem Telefon oder Laptop; Checkr führt die Überprüfung aus.

### 3. (Optional) Empfangen Sie den Bericht zurück

1. **Trigger** — Checkr: Watch Events (Webhook). Make registriert einen Checkr-Webhook bei Aktivierung.
2. **Filter** — Fahren Sie nur fort, wenn `event_type = report.completed`.
3. **Aktion** — Checkr: Bericht abrufen (verwenden Sie die Bericht-ID aus dem Webhook).
4. **Aktion** — B1.church: Person suchen (nach Kandidaten-E-Mail).
5. **Aktion** — Bedingter Slack / E-Mail: Benachrichtigen Sie den Koordinator mit dem Status `clear` / `consider` / `suspended`.

Hinweis: B1 hat heute kein integriertes Feld "Hintergrund-Check-Status". Die pragmatischen Optionen sind (a) das Ergebnis in einen privaten Slack-Kanal zur Überprüfung posten, (b) es in ein Google Sheet für Audit schreiben oder (c) die Person bei `clear` zu einer "Freigegebene Freiwillige" B1-Gruppe hinzufügen.

## Allgemeine Rezepte

### Re-Screen-Freiwillige alle 2 Jahre

Kombinieren Sie das Obige mit einem Make-Schedule-Trigger:

- **Trigger** — Make: Schedule (monatlich)
- **Aktion** — B1.church: Gruppenmitglieder für "Freigegebene Freiwillige" auflisten
- **Aktion** — Filtern Sie nach Make: Freigabe-Datum älter als 22 Monate
- **Aktion** — Checkr: Hintergrund-Check-Einladung erstellen (wie beim ursprünglichen Fluss)

### Block Stage 1 Zugriff, bis die Überprüfung abgeschlossen ist

Wenn Ihre Kirche die B1-Gruppenmitgliedschaft zum Gating-Zugriff verwendet (z.B. erscheinen nur "Freigegebene" Gruppenmitglieder in Serving-Zeitplänen), halten Sie neue Freiwillige in einer Holding-Gruppe, bis das Checkr `report.completed`-Ereignis sie umschaltet.

## Grenzen & Hinweise

- **Checkr ist nur USA-weit** für die meisten Screening-Pakete. Australische, UK und kanadische Kirchen benötigen eine Alternative.
- **Preisgestaltung** ist pro Überprüfung — jedes Create Invitation in Make verbrennt eine echte Überprüfung. Testen Sie zuerst im Checkr-Sandbox-/Staging-Konto (Make's Checkr-App respektiert die Anmeldeinformationen, die Sie in der Verbindung übergeben, so dass das Austauschen von Anmeldeinformationen Sandbox/Live umschaltet).
- **Checkr API-Zugriff ist plan-gated.** Kleinere Checkr-Konten können auf einer UI-Only-Stufe sein; wenden Sie sich an Checkr, um API zu aktivieren.

## Fehlerbehebung

- **Create Candidate schlägt mit `403` fehl** — das Checkr API-Token ist schreibgeschützt oder hat nicht die richtigen Kontoberechtigungen. Geben Sie es aus dem Checkr-Dashboard mit Schreibbereich aus.
- **Einladung kommt nie an** — Überprüfen Sie die E-Mail des Kandidaten in Schritt 3; B1 kann ein leeres E-Mail-Feld für diese Person haben. Fügen Sie einen erforderlichen E-Mail-Filter vor dem Checkr-Schritt hinzu.
- **Webhook-Trigger wird nicht ausgelöst** — Checkr's Webhook-Registrierung schlägt manchmal still fehl, wenn Ihr Make-Konto nicht auf einem bezahlten Tier ist, der ausgehende Webhooks unterstützt. Überprüfen Sie auf der Seite Checkr's Dashboard *Webhooks*, dass die URL von Make aufgelistet ist.

## Siehe auch

- [Make (Überblick)](../make) -- B1-Seite jeden Make-Szenarios
- [Mobile-Nachricht](./mobile-message) -- für SMS-Anbieter-ohne-Zapier-Apps, gleiches Webhooks/HTTP-Muster wie Checkr Make-Verdrahtung
- [Checkr API-Dokumentation](https://docs.checkr.com/)
