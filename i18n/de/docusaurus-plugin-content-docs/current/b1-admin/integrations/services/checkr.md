---
title: "Checkr"
---

# Checkr

<div class="article-intro">

[Checkr](https://checkr.com) führt Background-Checks für Mitarbeiter und Freiwillige durch -- ein nahezu universelles Bedürfnis für jede Kirche mit einem Kinder- oder Jugendprogramm. B1 hat **keine integrierte Background-Check-Funktion** -- das Bestellen von Prüfungen, das Verfolgen von Ergebnissen und die Einhaltung von Screening-Vorgaben finden alle in Checkr statt; das folgende Rezept verbindet lediglich B1-Ereignisse damit. Checkr hat keine Zapier-App, aber [Make.coms Checkr-Integration](https://www.make.com/en/integrations/checkr) ist verifiziert und stellt die Aktionen bereit, die Sie benötigen, um eine Prüfung von einem B1-Ereignis aus zu starten.

</div>

<div class="prereqs">
<h4>Bevor Sie beginnen</h4>

- Ein [Checkr](https://checkr.com)-Konto mit API-Zugang und mindestens einem konfigurierten Screening-Paket
- Ein [Make](https://www.make.com)-Konto
- Ein B1Admin-Benutzer mit der Berechtigung **Einstellungen bearbeiten**

</div>

## Was Sie verbinden können

Die Checkr-App von Make bietet 1 Trigger und 6 Aktionen:

| Richtung | B1-/Make-Trigger | Aktion |
|---|---|---|
| B1 → Checkr | B1 `group.member.added` (gefiltert auf eine Freiwilligengruppe) | Checkr: Kandidat erstellen → Einladung zur Background-Prüfung erstellen |
| Checkr → B1 | Checkr-Webhook (Einladungs-/Berichtsereignis) | B1: Den Datensatz der Person aktualisieren (z. B. Tag „Checkr freigegeben") |

Checkr-Aktionen von Make: Kandidat erstellen, Einladung zur Background-Prüfung erstellen, Kandidat abrufen, Bericht abrufen, geschätzte Ankunftszeit des Berichts abrufen, Einladung abrufen. Plus 4 Suchmodule.

## Einrichtung

### 1. Einen B1-API-Schlüssel erstellen

**Einstellungen → Entwickler → API-Schlüssel → Neuer API-Schlüssel**:

- `settings:write` -- für den Trigger-Webhook
- `people:read` -- um beim Starten einer Prüfung Name/E-Mail der Person nachzuschlagen
- (Optional) `people:write`, wenn Sie den Berichtsstatus als benutzerdefiniertes Feld oder Tag zurückschreiben möchten

### 2. Das Szenario „Prüfung bei Freiwilligenanmeldung starten" in Make erstellen

1. **Trigger** -- B1.church: Ereignisse überwachen (`group.member.added`).
2. **Filter** -- nur fortfahren, wenn `data.groupId` mit Ihrer Gruppe „Kinderdienst-Freiwillige" (oder Äquivalent) übereinstimmt.
3. **Aktion** -- B1.church: Person suchen (nach `data.personId`), um E-Mail sowie Vor-/Nachname zu erhalten.
4. **Aktion** -- Checkr: Kandidat erstellen. Vor-/Nachname/E-Mail aus Schritt 3 zuordnen.
5. **Aktion** -- Checkr: Einladung zur Background-Prüfung erstellen. Die neue Kandidaten-ID aus Schritt 4 dem Feld *candidate_id* zuordnen. Wählen Sie das Screening-Paket (z. B. `tasker_standard` oder was Ihr Konto sonst bietet).
6. (Optional) **Aktion** -- Slack: Ihren Koordinator für sichere Dienste benachrichtigen, dass eine Prüfung eingeleitet wurde.

Aktivieren Sie das Szenario. Neue Freiwillige in der Zielgruppe erhalten automatisch eine Checkr-Einladung per E-Mail; sie schließen diese auf ihrem Telefon oder Laptop ab; Checkr führt die Prüfung durch.

### 3. (Optional) Den Bericht zurückerhalten

1. **Trigger** -- Checkr: Ereignisse überwachen (Webhook). Make registriert bei Aktivierung einen Checkr-Webhook.
2. **Filter** -- nur fortfahren, wenn `event_type = report.completed`.
3. **Aktion** -- Checkr: Bericht abrufen (mit der Berichts-ID aus dem Webhook).
4. **Aktion** -- B1.church: Person suchen (nach Kandidaten-E-Mail).
5. **Aktion** -- Bedingtes Slack / E-Mail: Den Koordinator mit dem Status `clear` / `consider` / `suspended` benachrichtigen.

Hinweis: B1 hat heute kein integriertes Feld für den „Background-Check-Status". Die pragmatischen Optionen sind (a) das Ergebnis zur Überprüfung in einen privaten Slack-Kanal posten, (b) es zur Prüfung in ein Google Sheet schreiben oder (c) die Person bei `clear` zu einer B1-Gruppe „Freigegebene Freiwillige" hinzufügen.

## Gängige Rezepte

### Freiwillige alle 2 Jahre erneut prüfen

Kombinieren Sie das Obige mit einem Make-Zeitplan-Trigger:

- **Trigger** -- Make: Zeitplan (monatlich)
- **Aktion** -- B1.church: Gruppenmitglieder für „Freigegebene Freiwillige" auflisten
- **Aktion** -- Nach Make filtern: freigegebenes Datum älter als 22 Monate
- **Aktion** -- Checkr: Einladung zur Background-Prüfung erstellen (wie im ursprünglichen Ablauf)

### Zugang zu Stufe 1 bis zum Abschluss der Prüfung blockieren

Wenn Ihre Kirche die B1-Gruppenmitgliedschaft nutzt, um den Zugang zu steuern (z. B. erscheinen nur Mitglieder der Gruppe „Freigegeben" in Dienstplänen), halten Sie neue Freiwillige in einer Warteschlangengruppe, bis das Checkr-Ereignis `report.completed` sie umschaltet.

## Einschränkungen & Hinweise

- **Checkr ist US-only** für die meisten Screening-Pakete. Kirchen in Australien, Großbritannien und Kanada benötigen eine Alternative.
- **Die Preisgestaltung erfolgt pro Prüfung** -- jede „Einladung erstellen"-Aktion in Make verbraucht eine echte Prüfung. Testen Sie zunächst im Sandbox-/Staging-Konto von Checkr (Makes Checkr-App respektiert die im Verbindungsformular übergebenen Anmeldedaten, sodass ein Wechsel der Anmeldedaten zwischen Sandbox und Live umschaltet).
- **Der API-Zugang von Checkr ist tarifabhängig.** Kleinere Checkr-Konten befinden sich möglicherweise auf einer reinen UI-Stufe; kontaktieren Sie Checkr, um API-Zugang zu aktivieren.

## Fehlerbehebung

- **„Kandidat erstellen" schlägt mit `403` fehl** -- das Checkr-API-Token ist schreibgeschützt oder hat nicht die richtigen Kontoberechtigungen. Erstellen Sie es im Checkr-Dashboard mit Schreibrechten neu.
- **Einladung kommt nie an** -- überprüfen Sie die E-Mail des Kandidaten in Schritt 3; B1 hat möglicherweise ein leeres E-Mail-Feld für diese Person. Fügen Sie vor dem Checkr-Schritt einen Filter für erforderliche E-Mail hinzu.
- **Webhook-Trigger löst nicht aus** -- Checkrs Webhook-Registrierung schlägt manchmal stillschweigend fehl, wenn Ihr Make-Konto nicht auf einer kostenpflichtigen Stufe ist, die ausgehende Webhooks unterstützt. Überprüfen Sie im Dashboard von Checkr unter *Webhooks*, ob die URL von Make aufgeführt ist.

## Siehe auch

- [Make (Übersicht)](../make) -- die B1-Seite jedes Make-Szenarios
- [Mobile Message](./mobile-message) -- für SMS-Anbieter ohne Zapier-App, dasselbe Webhooks-/HTTP-Muster wie die Checkr-Make-Verbindung
- [Checkr-API-Dokumentation](https://docs.checkr.com/)
