---
title: "Mailchimp"
---

# Mailchimp

<div class="article-intro">

Übertrage neue B1-Personen, Spender oder Gruppenmitglieder zu einer Mailchimp-Audienz, damit die nächste Willkommenserie, der Jahresende-Appell oder der Freiwilligen-Newsletter aus einer Liste zieht, die immer auf dem neuesten Stand ist. B1 hat keine integrierte Mailchimp-Synchronisierung – die Verdrahtung lebt vollständig in Zapier (oder Make): B1 feuert das Event, Mailchimp nimmt den Abonnenten auf.

</div>

<div class="prereqs">
<h4>Bevor du beginnst</h4>

- Ein [Mailchimp](https://mailchimp.com)-Konto mit mindestens einer Audienz, in die du B1-Personen drücken möchtest
- Ein [Zapier](https://zapier.com)-Konto (die kostenlose Version deckt kleine Kirchen ab)
- Ein B1Admin-Benutzer mit der Berechtigung **Bearbeite Einstellungen**, sodass du einen API-Schlüssel prägen kannst

</div>

## Was du verdrahten kannst

| Richtung | B1-Trigger | Mailchimp-Aktion |
|---|---|---|
| B1 → Mailchimp | `person.created` | Abonnenten hinzufügen/aktualisieren |
| B1 → Mailchimp | `donation.created` | Abonnent zu Tag hinzufügen (z. B. "Gab 2026") |
| B1 → Mailchimp | `group.member.added` | Abonnent zu Tag hinzufügen, der zu dieser Gruppe gehört |
| Mailchimp → B1 | Neuer Abonnent | B1 *Person erstellen* |

Die Mailchimp-Seite bietet viel mehr (Kampagnen, Segmente, Automatisierungen) – siehe [Mailchimp's Zapier-Integrations](https://zapier.com/apps/mailchimp/integrations) für die vollständige Liste. Alles, das aus der B1-Envelope zuordnungsbar ist, ist Fair Game.

## Einrichtung

### 1. Prägung eines B1 API-Schlüssels

Gehe in B1Admin zu **Einstellungen → Entwickler → API-Schlüssel → Neuer API-Schlüssel**. Gib ihm die Scopes, die der Zap benötigt:

- `settings:write` – erforderlich für den Trigger, um seinen Webhook zu registrieren
- `people:read` – damit der Zap Vor-/Nachname, E-Mail usw. lesen kann
- (Optional) `people:write`, wenn du auch eine Mailchimp → B1-Richtung planst

Speichern und kopiere die `cak_…`-Zeichenfolge – sie wird nur einmal angezeigt.

### 2. Erstelle den Zap

1. **Trigger:** `B1.church — Neue Person`. Bei der ersten Verwendung fragt dich Zapier, dich *bei B1.church anzumelden*; füge den API-Schlüssel ein.
2. **Aktion:** `Mailchimp — Abonnent hinzufügen/aktualisieren`. Ordne die Trigger-Ausgabe zu:
   - `data.contactInfo.email` → E-Mail-Adresse
   - `data.name.first` → Vorname
   - `data.name.last` → Nachname
   - (Optional) `data.id` → ein Mailchimp-Mergefeld, wenn du die B1-Personen-ID behalten möchtest.
3. Schalte den Zap ein. Zapier registriert einen `person.created`-Webhook auf B1 – überprüfe in **Einstellungen → Entwickler → Webhooks**, dass eine Zeile mit dem Namen "Zapier — person.created" erscheint.

Das ist es. Füge eine Person in B1Admin hinzu, um es zu überprüfen – der neue Abonnent erscheint innerhalb von Sekunden in Mailchimp.

## Häufige Rezepte

### Markiere Spender automatisch

- **Trigger** – B1: Neue Spende
- **Aktion** – B1: Finde Person (Nachschlag nach `personId`), um die E-Mail zu erhalten
- **Aktion** – Mailchimp: Abonnent zu Tag hinzufügen (Tag `Gab-2026`)

### Starte eine gruppenspezifische Willkommenserie

- **Trigger** – B1: Neues Gruppenmitglied, gefiltert nach `data.groupId`
- **Aktion** – Mailchimp: Abonnent zu Tag hinzufügen, benannt nach der Gruppe; löse deine bestehende Automatisierung von diesem Tag aus

### Bidirektional: Neue Mailchimp-Anmeldungen werden B1-Kontakte

- **Trigger** – Mailchimp: Neuer Abonnent
- **Aktion** – B1: Person erstellen (ordne Vor-/Nachname/E-Mail zu)

## Make-Alternative

Die [Mailchimp-App von Make](https://www.make.com/en/integrations/mailchimp) deckt 44 Module ab – die Verdrahtung ist identisch, wobei der B1 *Überwache Events*-Trigger Zapiers ersetzt. Siehe das Dokument [Make-Übersicht](../make) für die B1-Seite.

## Limits & Anmerkungen

- **Mailchimps kostenlose Version begrenzt Kontakte und Audizenzen** – ein Zap, der eine kostenlose Audienz über ihr Limit hinaus überlädt, wird mit `4xx Member limit reached` fehlgeschlagen. Mailchimps Protokolle machen dies offensichtlich.
- **Mailchimp dedupliziert nach E-Mail**, also das erneute Ausführen eines Zaps auf der gleichen B1-Person aktualisiert sie an Ort; es erstellt keine Duplikate.
- **Abmeldungen von Mailchimp fließen nicht zu B1 zurück.** Wenn du möchtest, dass Mailchimp-Abmeldungen die "Mail senden"-Präferenz von B1 löschen, erstelle den umgekehrten Zap explizit.

## Fehlerbehebung

- **Zap feuert nie** – Überprüfe `Einstellungen → Entwickler → Webhooks` für die Zeile `Zapier — person.created`. Wenn nicht vorhanden, fehlte der API-Schlüssel `settings:write`, als sich der Zap anschaltete. Neu prägen, neu verbinden, schalte den Zap aus und wieder ein.
- **`Member exists` Warnung auf Hinzufügen/Aktualisieren** – Schalte die Aktion von *Abonnent hinzufügen* zu *Abonnent hinzufügen/aktualisieren* um (das Verb ist wichtig). Die Upsert-Variante ist idempotent.
- **Vorname / Nachname kommen leer an** – B1's `data.name.first` und `data.name.last` werden nur gefüllt, wenn diese Felder auf der Person gesetzt sind. Ordne `data.name.display` als Fallback zu.

## Siehe auch

- [Zapier (Übersicht)](../zapier) – die B1-Seite jedes Zapier-Rezepts
- [Make (Übersicht)](../make) – gleiche Idee, visueller Builder
- [Webhooks (Developer-Referenz)](/docs/developer/api/webhooks#event-catalog)
