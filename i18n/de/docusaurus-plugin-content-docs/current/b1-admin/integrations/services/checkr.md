---
title: "Checkr"
---

# Checkr

<div class="article-intro">

[Checkr](https://checkr.com) führt Hintergrundüberprüfungen für Mitarbeiter und Freiwillige durch - ein nahezu universelles Bedürfnis für jede Kirche, die ein Kinder- oder Jugenddienst durchführt. B1 hat **kein eingebautes Hintergrundüberprüfungsfeature** - die Überprüfungsbestellung, das Verfolgen von Ergebnissen und die Überprüfung der Compliance leben alle in Checkr; das folgende Rezept verdrahtet nur B1-Ereignisse damit. Checkr hat keine Zapier-App, aber [Make.com's Checkr-Integration](https://www.make.com/en/integrations/checkr) ist verifiziert und stellt die Aktionen zur Verfügung, die du brauchst, um eine Überprüfung von einem B1-Ereignis aus zu starten.

</div>

<div class="prereqs">
<h4>Bevor du beginnst</h4>

- Ein [Checkr](https://checkr.com)-Konto mit API-Zugriff und mindestens einem konfigurierten Screening-Paket
- Ein [Make](https://www.make.com)-Konto
- Ein B1Admin-Benutzer mit der Berechtigung **Einstellungen bearbeiten**

</div>

## Was du verdrahten kannst

Make's Checkr-App stellt 1 Trigger und 6 Aktionen zur Verfügung:

| Richtung | B1 / Make Trigger | Aktion |
|---|---|---|
| B1 → Checkr | B1 `group.member.added` (gefiltert auf eine Freiwilligengruppe) | Checkr: Kandidaten erstellen → Hintergrund-Überprüfungseinladung erstellen |
| Checkr → B1 | Checkr Webhook (Einladungs-/Berichtsereignis) | B1: Personeneintrag aktualisieren (z. B. Tag "Checkr geleert") |

Make's Checkr-Aktionen: Kandidaten erstellen, Hintergrund-Überprüfungseinladung erstellen, Kandidaten abrufen, Bericht abrufen, Berichts-ETA abrufen, Einladung abrufen. Plus 4 Suchmodule.

## Einrichtung

### 1. Prägen Sie einen B1 API-Schlüssel

**Einstellungen → Entwickler → API-Schlüssel → Neuer API-Schlüssel**:

- `settings:write` — für den Trigger-Webhook
- `people:read` — um den Namen/die E-Mail der Person zu suchen, wenn eine Überprüfung gestartet wird
- (Optional) `people:write`, wenn du den Berichtsstatus als benutzerdefiniertes Feld oder Tag zurückschreiben möchtest

### 2. Erstelle das Szenario "Überprüfung bei Freiwilligeneintrag starten" in Make

1. **Trigger** — B1.church: Ereignisse beobachten (`group.member.added`).
2. **Filter** — fortfahren nur, wenn `data.groupId` mit deiner "Children's Volunteers"-Gruppe (oder äquivalent) übereinstimmt.
3. **Aktion** — B1.church: Person suchen (nach `data.personId`), um E-Mail + Vor-/Nachname zu erhalten.
4. **Aktion** — Checkr: Kandidaten erstellen. Ordne Vor-/Nachname/E-Mail aus Schritt 3 zu.
5. **Aktion** — Checkr: Hintergrund-Überprüfungseinladung erstellen. Ordne die neue Kandidaten-ID von Schritt 4 dem Feld *candidate_id* zu. Wähle das Screening-Paket (z. B. `tasker_standard` oder was auch immer dein Konto offenlegt).
6. (Optional) **Aktion** — Slack: Benachrichtige deinen Safe-Ministry-Koordinator, dass eine Überprüfung initiiert wurde.

Aktiviere das Szenario. Neue Freiwillige in der Zielgruppe erhalten automatisch eine Checkr-Einladung per E-Mail; sie füllen sie auf ihrem Telefon oder Laptop aus; Checkr führt die Überprüfung durch.

### 3. (Optional) Erhalte den Bericht zurück

1. **Trigger** — Checkr: Ereignisse beobachten (Webhook). Make registriert einen Checkr-Webhook bei Aktivierung.
2. **Filter** — fortfahren nur, wenn `event_type = report.completed`.
3. **Aktion** — Checkr: Bericht abrufen (verwende die Berichts-ID aus dem Webhook).
4. **Aktion** — B1.church: Person suchen (nach Kandidaten-E-Mail).
5. **Aktion** — Bedingter Slack / E-Mail: Benachrichtige den Koordinator mit dem Status `clear` / `consider` / `suspended`.

Hinweis: B1 hat heute kein eingebautes Feld "Hintergrund-Überprüfungsstatus". Die pragmatischen Optionen sind (a) das Ergebnis für die Überprüfung auf einen privaten Slack-Kanal posten, (b) es in ein Google Sheet für die Überprüfung schreiben oder (c) die Person zur Gruppe "Gecleanrte Freiwillige" in B1 hinzufügen.

## Häufige Rezepte

### Freiwillige alle 2 Jahre erneut überprüfen

Kombiniere das obige mit einem Make-Zeitplantrigger:

- **Trigger** — Make: Zeitplan (monatlich)
- **Aktion** — B1.church: Gruppenmitglieder für "Gecleanrte Freiwillige" auflisten
- **Aktion** — Nach Make filtern: Geleertdatum älter als 22 Monate
- **Aktion** — Checkr: Hintergrund-Überprüfungseinladung erstellen (dasselbe wie der erste Flow)

### Blockiere Stage-1-Zugriff, bis die Überprüfung abgeschlossen ist

Wenn deine Kirche die B1-Gruppenmitgliedschaft verwendet, um den Zugriff zu steuern (z. B. nur Mitglieder der "Geleerteten" Gruppe erscheinen in Zeitplänen), halte neue Freiwillige in einer Holding-Gruppe, bis das Checkr-Ereignis `report.completed` sie umdreht.

## Grenzen & Anmerkungen
