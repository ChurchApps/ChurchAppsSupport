---
title: "VOMO"
---

# VOMO

<div class="article-intro">

VOMO ist eine Freiwilligenengagement-Plattform – Personen melden sich für Projekte an, geben sich im Kiosk ab und sammeln Stunden. Wenn Sie VOMO für Freiwilligenplanung verwenden, aber B1 für Personendatensätze, kann Zapier Mitgliedschaft und Check-Ins zwischen ihnen synchronisieren, damit keine Seite driftet.

</div>

<div class="prereqs">
<h4>Bevor Sie Beginnen</h4>

- Ein [VOMO](https://vomo.org)-Konto auf einem Plan, der Zapier (check mit VOMO Support, wenn unsicher) offenlegt
- Ein [Zapier](https://zapier.com)-Konto
- Ein B1Admin-Benutzer mit der Berechtigung **Einstellungen bearbeiten**

</div>

## Was Sie verkabeln können

VOVOs Zapier-App stellt vier sofortige Auslöser und vier Aktionen zur Verfügung. Die Rezepte, die meisten Gemeinden möchten:

| Richtung | Auslöser | Aktion |
|---|---|---|
| VOMO → B1 | VOMO Mitgliedschaft (erstellt) | B1: Person suchen → Person erstellen (wenn neu) |
| VOMO → B1 | VOMO Kiosk Check-In | B1: Gruppenmitglied zu einer „Currently Serving"-Gruppe hinzufügen, oder als Anwesenheit zeichnen |
| B1 → VOMO | B1 `person.created` | VOMO: Organizer suchen (nach E-Mail); sonst benutzerdefinierten Schritt |
| Beide | VOMO Partizipation (Anmeldungen) | B1: Gruppenmitglied zu Projekt-Gruppe hinzufügen |

Die VOMO-Aktionen sind auf **Entwurfsprojekte** und **Suchen** nach vorhandenen Organisatoren/Projekten begrenzt – es gibt heute keine „Fügen Sie diese Person zu einem VOMO-Projekt hinzu"-Aktion. Die interessante Verkabelung ist meistens VOMO → B1.

## Setup

### 1. Prägen Sie einen B1 API-Schlüssel

**Einstellungen → Entwickler → API-Schlüssel → Neuer API-Schlüssel**. Geltungsbereiche:

- `people:read`, `people:write` – um Freiwillige als B1-Personen zu suchen und zu erstellen
- `groups:write` – um sie zu Serving-Team-Gruppen hinzuzufügen
- (Optional) `attendance:write` wenn Sie Kiosk-Check-Ins als Anwesenheit behandeln

### 2. Erstellen Sie den Mitgliedschafts-Sync-Zap

1. **Auslöser** – VOMO: Mitgliedschaft (Ereignis = `created`).
2. **Aktion** – B1.church: Person suchen, abgeglichen auf E-Mail.
3. **Filter / Path** – Gabelung auf gefunden vs. nicht gefunden:
   - Nicht gefunden → B1.church: Person erstellen, dann Gruppenmitglied zur entsprechenden Freiwilligengruppe hinzufügen.
   - Gefunden → B1.church: Gruppenmitglied direkt hinzufügen.
4. Schalten Sie ein. Neue VOMO-Freiwillige erscheinen jetzt in B1 mit der richtigen Gruppenmitgliedschaft.

### 3. (Optional) Erstellen Sie den Kiosk-Check-In-Zap

1. **Auslöser** – VOMO: Kiosk
2. **Aktion** – B1.church: Person suchen (nach E-Mail)
3. **Aktion** – Ihre Wahl:
   - *Wenn als Anwesenheit behandelt* – Webhooks by Zapier POST zu B1s `/attendance/visits` Endpoint (B1s Zapier-App hat noch keine First-Class *Record Attendance* Aktion). Der B1 [API-Schlüssel](/docs/developer/api/api-keys) geht in den `Authorization: Bearer cak_…` Header.
   - *Wenn als Gruppenmitgliedschaft behandelt* – B1.church: Gruppenmitglied mit einer „Currently Serving (Today)"-Gruppe hinzufügen, und ein zweiter Zap später am Tag entfernt sie via geplante Bereinigung.

## Häufige Rezepte

### Pro-Projekt-Gruppensynchronisierung

- **Auslöser** – VOMO: Partizipation (erstellt)
- **Aktion** – Filter by Zapier auf Projekt-ID, dann
- **Aktion** – B1.church: Gruppenmitglied zu einer B1-Gruppe hinzufügen, deren Name das VOMO-Projekt spiegelt.

Wenn das VOMO-Projekt endet, löschen Sie die B1-Gruppe manuell (oder koppeln Sie dies mit einem *Partizipation gelöscht* Auslöser, der sie entfernt).

### Senden Sie einen „Thanks for signing up" Text über SMS

Kettenverkettung VOMO-Partizipation → Clearstream-Textnachricht senden oder Text In Church Nachricht senden im gleichen Zap. Beide haben First-Class Zapier-Aktionen – siehe [Clearstream](./clearstream) und [Text In Church](./text-in-church).

### Erkennen Sie Dropout

Führen Sie einen täglichen Zapier *Schedule* Auslöser aus, der Find Organizer in VOMO für eine Liste von B1-Personen aufruft, die sich diesen Monat dem Serving Team anschlossen – wenn VOMO „nicht gefunden" gibt, haben sie VOMO nicht aktiviert und benötigen einen Anstoß.

## Limits & Notizen

- **E-Mail ist der Join-Schlüssel.** VOVOs Payloads stellen eine Benutzer-E-Mail zur Verfügung, aber keine B1-Personen-ID. Spender, die verschiedene E-Mails in jedem System verwenden, erstellen Duplikate.
- **Keine „Zu Projekt hinzufügen"-Aktion in VOVOs Zapier-App heute.** Wenn Sie B1 → VOMO Projekteintragung benötigen, würden Sie zu VOVOs REST-API von einem *Webhooks by Zapier*-Schritt posten, was eine benutzerdefinierte Integration ist.
- **VOVOs kostenlos / niedrigere Tiers können Zapier nicht enthalten.** Bestätigen Sie mit VOMO Support vor dem Versprechen eines Verkabelungsdatums.

## Fehlerbehebung

- **Auslöser wird niemals ausgelöst** – VOVOs sofortige Auslöser erfordern, dass das API-Token gültig bleibt. Testen Sie den Zap erneut; verbinden Sie VOMO, wenn das Token rotiert wurde.
- **B1 *Gruppenmitglied hinzufügen* fehlgeschlagen mit 422** – die Gruppen-ID in der Aktion existiert nicht. Öffnen Sie **B1Admin → Gruppen**, klicken Sie auf die Gruppe und kopieren Sie das URL-ID-Segment in den Zap-Schritt.
- **Doppelte B1-Personen von einem einzelnen VOMO-Freiwilligen** – sie haben sich wahrscheinlich unter einer anderen E-Mail angemeldet, als sie bereits in B1 hatten. Entweder standardisieren Sie E-Mails oder fügen Sie einen Zapier *Path* hinzu, der auch nach Telefon sucht, bevor er erstellt.

## Siehe auch

- [Zapier (Übersicht)](../zapier) – B1-Seite jedes Zapier-Rezepts
- [Clearstream](./clearstream), [Text In Church](./text-in-church) – koppeln Sie Freiwilligenanmeldungen mit SMS-Bestätigungen
- [Webhooks (Entwickler-Referenz)](/docs/developer/api/webhooks) – die Ereignisse, die VOMO auslösen kann
