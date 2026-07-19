---
title: "Checkr"
---

# Checkr

<div class="article-intro">

[Checkr](https://checkr.com) führt Überprüfungen des Hintergunds für Personal und Freiwillige durch – ein nahezu universales Bedürfnis für jede Kirche, die ein Kinder- oder Jugendprogramm betreibt. B1 hat **keine integrierten Hintergrundprüfungs-Funktion** – das Bestellen von Überprüfungen, das Verfolgen von Ergebnissen und die Überprüfungs-Compliance befinden sich alle in Checkr; das Rezept unten verbindet nur B1-Events damit. Checkr hat keine Zapier-App, aber [die Checkr-Integration von Make.com](https://www.make.com/en/integrations/checkr) ist verifiziert und bietet die Aktionen, die du brauchst, um eine Überprüfung von einem B1-Event aus zu starten.

</div>

<div class="prereqs">
<h4>Bevor du beginnst</h4>

- Ein [Checkr](https://checkr.com)-Konto mit API-Zugriff und mindestens einem konfigurierten Screening-Paket
- Ein [Make](https://www.make.com)-Konto
- Ein B1Admin-Benutzer mit der Berechtigung **Bearbeite Einstellungen**

</div>

## Was du verdrahten kannst

Die Checkr-App von Make bietet 1 Trigger und 6 Aktionen:

| Richtung | B1 / Make-Trigger | Aktion |
|---|---|---|
| B1 → Checkr | B1 `group.member.added` (gefiltert zu einer Freiwilligengruppe) | Checkr: Kandidat erstellen → Hintergrundüberprüfungseinladung erstellen |
| Checkr → B1 | Checkr-Webhook (Einladungs- / Reportereignis) | B1: Datensatz der Person aktualisieren (z. B. Tag "Checkr genehmigt") |

Die Checkr-Aktionen von Make: Kandidat erstellen, Hintergrundüberprüfungseinladung erstellen, Kandidaten abrufen, Report abrufen, Report-ETA abrufen, Einladung abrufen. Sowie 4 Suchmodule.

## Einrichtung

### 1. Prägung eines B1 API-Schlüssels

**Einstellungen → Entwickler → API-Schlüssel → Neuer API-Schlüssel**:

- `settings:write` – für den Trigger-Webhook
- `people:read` – um den Namen/die E-Mail der Person nachzuschlagen, wenn eine Überprüfung beginnt
- (Optional) `people:write`, wenn du den Report-Status als benutzerdefiniertes Feld oder Tag zurückschreiben möchtest

### 2. Erstelle das Szenario "Überprüfung bei Freiwilligen-Anmeldung starten" in Make

1. **Trigger** – B1.church: Überwache Events (`group.member.added`).
2. **Filter** – nur fortfahren, wenn `data.groupId` deiner "Kinderbetreuer" (oder äquivalent) Gruppe entspricht.
3. **Aktion** – B1.church: Finde Person (nach `data.personId`), um E-Mail + Vor-/Nachname zu erhalten.
4. **Aktion** – Checkr: Kandidat erstellen. Ordne Vor-/Nachname/E-Mail von Schritt 3 zu.
5. **Aktion** – Checkr: Hintergrundüberprüfungseinladung erstellen. Ordne die neue Kandidaten-ID aus Schritt 4 dem Feld *candidate_id* zu. Wähle das Screening-Paket (z. B. `tasker_standard` oder was auch immer dein Konto bietet).
6. (Optional) **Aktion** – Slack: Benachrichtige deinen Sicherheitsministerium-Koordinator, dass eine Überprüfung eingeleitet wurde.

Schalte das Szenario ein. Neue Freiwillige in der Zielgruppe erhalten automatisch eine Checkr-Einladung per E-Mail; sie füllen sie auf ihrem Telefon oder Laptop aus; Checkr führt das Screening durch.

### 3. (Optional) Erhalte den Report zurück

1. **Trigger** – Checkr: Überwache Events (Webhook). Make registriert ein Checkr-Webhook bei der Aktivierung.
2. **Filter** – nur fortfahren, wenn `event_type = report.completed`.
3. **Aktion** – Checkr: Report abrufen (verwende die Report-ID vom Webhook).
4. **Aktion** – B1.church: Finde Person (nach Kandidaten-E-Mail).
5. **Aktion** – Bedingtes Slack / E-Mail: Benachrichtige den Koordinator mit dem Status `clear` / `consider` / `suspended`.

Anmerkung: B1 hat heute kein integriertes Feld "Hintergrundprüfungsstatus". Die pragmatischen Optionen sind (a) das Ergebnis in einen privaten Slack-Kanal für die Überprüfung posten, (b) es in ein Google Sheet zur Prüfung schreiben, oder (c) die Person bei `clear` zu einer B1-Gruppe "Genehmigte Freiwillige" hinzufügen.

## Häufige Rezepte

### Freiwillige alle 2 Jahre erneut überprüfen

Kombiniere das obige mit einem Make-Zeitplan-Trigger:

- **Trigger** – Make: Zeitplan (monatlich)
- **Aktion** – B1.church: Gruppenmitglieder auflistet für "Genehmigte Freiwillige"
- **Aktion** – Filtere nach Make: Genehmigungsdatum älter als 22 Monate
- **Aktion** – Checkr: Hintergrundüberprüfungseinladung erstellen (wie beim anfänglichen Flow)

### Stage 1-Zugriff blockieren, bis die Überprüfung abgeschlossen ist

Wenn deine Kirche die B1-Gruppenmitgliedschaft verwendet, um den Zugriff zu begrenzen (z. B. erscheinen nur "Genehmigte" Gruppenmitglieder in Dienststplänen), behalte neue Freiwillige in einer Wartegruppe, bis das Checkr-Ereignis `report.completed` sie wechselt.

## Limits & Anmerkungen

- **Checkr ist nur für die USA** für die meisten Screening-Pakete. Australische, britische und kanadische Kirchen benötigen eine Alternative.
- **Preisgestaltung** ist pro Überprüfung – jedes "Einladung erstellen" in Make kostet eine echte Überprüfung. Teste zunächst in Checkrs Sandbox-/Staging-Konto (Die Checkr-App von Make respektiert die Anmeldedaten, die du in der Verbindung übergibst, sodass das Tauschen von Anmeldedaten zwischen Sandbox/Live wechselt).
- **Checkr API-Zugriff ist Plan-gated.** Kleinere Checkr-Konten können auf einem UI-only-Tier sein; kontaktiere Checkr, um API zu aktivieren.

## Fehlerbehebung

- **Kandidat erstellen fehlgeschlagen mit `403`** – Das Checkr API-Token ist schreibgeschützt oder hat keine richtigen Kontoberechtigungen. Stelle es vom Checkr-Dashboard mit Schreib-Umfang neu aus.
- **Einladung kommt nie an** – Überprüfe die E-Mail des Kandidaten in Schritt 3; B1 kann ein leeres E-Mail-Feld für diese Person haben. Füge einen E-Mail-erforderlich-Filter vor dem Checkr-Schritt hinzu.
- **Webhook-Trigger feuert nicht** – Checkrs Webhook-Registrierung schlägt manchmal stillschweigend fehl, wenn dein Make-Konto nicht auf einem Tier bezahlt ist, der ausgehende Webhooks unterstützt. Überprüfe auf der Seite *Webhooks* des Checkr-Dashboards, dass die URL von Make aufgelistet ist.

## Siehe auch

- [Make (Übersicht)](../make) – B1-Seite jedes Make-Szenarios
- [Mobile Nachricht](./mobile-message) – für SMS-Anbieter ohne Zapier-Apps, gleiches Webhooks/HTTP-Muster wie die Checkr-Make-Verdrahtung
- [Checkr API-Dokumente](https://docs.checkr.com/)
