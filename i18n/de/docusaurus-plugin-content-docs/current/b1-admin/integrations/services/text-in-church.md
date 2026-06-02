---
title: "Text In Church"
---

# Text In Church

<div class="article-intro">

[Text In Church](https://textinchurch.com) bündelt SMS plus Tropf-Workflows und Connect-Card-Automationen. Seine Zapier-App stellt beide Richtungen zur Verfügung – Leiten Sie B1-Ereignisse in einen Text In Church-Workflow ein und ziehen Sie Connect-Card- oder neue-Kontakt-Auslöser aus der anderen Seite zu B1 heraus.

</div>

<div class="prereqs">
<h4>Bevor Sie Beginnen</h4>

- Ein [Text In Church](https://textinchurch.com)-Konto auf einem Plan, der die Zapier-Integration enthält
- Ein [Zapier](https://zapier.com)-Konto
- Ein B1Admin-Benutzer mit der Berechtigung **Einstellungen bearbeiten**

</div>

## Was Sie verkabeln können

| Richtung | Auslöser | Aktion |
|---|---|---|
| B1 → Text In Church | B1 `person.created` | Person erstellen/aktualisieren + Zu Gruppe hinzufügen |
| B1 → Text In Church | B1 `form.submission.created` | Textnachricht über das entsprechende Team senden |
| B1 → Text In Church | B1 `group.member.added` | Zu Gruppe hinzufügen (Gruppenmitgliedschaft spiegeln) |
| Text In Church → B1 | Connect Card eingereicht | B1: Person erstellen + Gruppenmitglied hinzufügen |
| Text In Church → B1 | Person erstellt | B1: Person erstellen |
| Text In Church → B1 | Person beigetreten Gruppe | B1: Gruppenmitglied hinzufügen |

Text In Church Aktionen umfassen auch *Textnachricht senden*, *Stimmübertragung senden*, *Aufgabe erstellen*, *Person/Gruppe suchen* und Gruppenmitgliedschaft hinzufügen/entfernen.

## Setup

### 1. Prägen Sie einen B1 API-Schlüssel

**Einstellungen → Entwickler → API-Schlüssel → Neuer API-Schlüssel**:

- `settings:write` – erforderlich für B1-ausgelöste Zaps
- `people:read`, `people:write` – um die Person zu finden oder zu erstellen
- `groups:write` – für Gruppensynchronisierung
- (Optional) `donations:write` wenn Sie Geschenk-Bestätigungen zu TIC verkabeln

### 2. Verbinden Sie Text In Church mit Zapier

Folgen Sie [Text In Churchs Zapier-Integrations-Handbuch](https://help.textinchurch.com/en/articles/3943363-text-in-church-s-zapier-integration). Sie generieren einen API-Token aus dem TIC-Dashboard.

### 3. Erstellen Sie den Connect-Card-zu-B1-Zap

Die häufigste Richtung. Connect Cards, die von TIC abgefeuert werden, werden automatisch zu neuen B1-Personen.

1. **Auslöser** – Text In Church: Connect Card eingereicht.
2. **Aktion** – B1.church: Person suchen (nach E-Mail).
3. **Path** – Zweig auf gefunden / nicht gefunden:
   - Nicht gefunden → B1.church: Person erstellen.
   - Gefunden → Fortfahren.
4. **Aktion** – B1.church: Gruppenmitglied zu einer „New Contact"-Gruppe hinzufügen.

Schalten Sie den Zap ein. Die nächste Connect Card, die über TIC eingereicht wird, landen in **B1Admin → People** automatisch.

## Häufige Rezepte

### Triggern Sie einen Connect-Card-Style-Workflow von einem B1-Formular

- **Auslöser** – B1.church: Neue Formular-Einsendung (Filter auf die „I'm new here"-Formular-ID)
- **Aktion** – Text In Church: Person erstellen/aktualisieren, Zuordnung der Formular-E-Mail / Telefon / Name-Antworten
- **Aktion** – Text In Church: Zu Gruppe hinzufügen, wo die Gruppe einen vorgefertigten Willkommens-Workflow angefügt hat

### Spiegeln Sie Gruppenmitgliedschaft

- **Auslöser** – B1.church: Neues Gruppenmitglied, gefiltert auf eine bestimmte `groupId`
- **Aktion** – Text In Church: Zu Gruppe hinzufügen (gleiche Person, Spiegel-Gruppe). Koppeln Sie mit einem `group.member.removed` Zap, wenn Sie vollständigen Sync möchten.

### Pagen Sie einen Leader, wenn jemand beitritt

- **Auslöser** – B1.church: Neues Gruppenmitglied
- **Aktion** – Text In Church: Textnachricht senden, Empfänger = Telefon des Group Leaders, Body = `"{first} {last} just joined {group}"`.

## Limits & Notizen

- **TICs Zapier-App Gates hinter Plan-Tier.** Wenn die Zapier-Integration im TIC-Dashboard ausgegraut ist, wenden Sie sich an TIC-Support, um sie auf Ihrem Plan zu aktivieren.
- **Gruppen-IDs sind TICs, nicht B1s.** Bei der Spiegelung werden Sie eine Zuordnungstabelle irgendwo führen (eine Zapier *Lookup Table* oder hardcodiert pro Zap).
- **Textnachricht-Kosten Credits senden.** Jeder Zap, der *Textnachricht senden* feiert, verbraucht aus Ihrem TIC SMS-Kontingent.

## Fehlerbehebung

- **Connect-Card-Auslöser wird nicht ausgelöst** – TIC benötigt den Zapier-Integrations-Schalter ein. Überprüfen Sie auch, dass das Formular, das Sie getestet haben, als „Connect Card" konfiguriert ist, nicht als generische Umfrage.
- **Person in B1 erstellen fehlgeschlagen mit 401** – der API-Schlüssel ist falsch, widerrufen oder fehlend `people:write`. Prägen Sie erneut.
- **Doppelte B1-Personen** – TIC sendet sowohl *Person erstellt* als auch *Connect Card eingereicht* für das gleiche Ereignis. Wählen Sie einen als Ihre Wahrheitsquelle und fügen Sie einen Zapier Filter auf den anderen hinzu.

## Siehe auch

- [Clearstream](./clearstream) – alternative SMS-Plattform mit ähnlichem Zapier-Form
- [Zapier (Übersicht)](../zapier) – B1-Seite jedes Zapier-Rezepts
- [Text In Church Zapier-Handbuch](https://help.textinchurch.com/en/articles/3943363-text-in-church-s-zapier-integration) (TICs Dokumente)
