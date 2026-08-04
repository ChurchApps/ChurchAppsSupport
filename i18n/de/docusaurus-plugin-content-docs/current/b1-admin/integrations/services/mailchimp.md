---
title: "Mailchimp"
---

# Mailchimp

<div class="article-intro">

Leite neue B1-Personen, Geber oder Gruppenmitglieder in eine Mailchimp-Audience, damit die nächste Willkommensserie, der Jahresend-Appell oder der Freiwilligen-Newsletter aus einer Liste abruft, die immer aktuell ist. B1 hat keine eingebaute Mailchimp-Synchronisierung - die Verdrahtung lebt ganz in Zapier (oder Make): B1 triggert das Ereignis, Mailchimp nimmt den Abonnenten auf.

</div>

<div class="prereqs">
<h4>Bevor du beginnst</h4>

- Ein [Mailchimp](https://mailchimp.com)-Konto mit mindestens einer Audience, in die B1-Personen übertragen werden sollen
- Ein [Zapier](https://zapier.com)-Konto (der kostenlose Tarif reicht für kleine Kirchen)
- Ein B1Admin-Benutzer mit der Berechtigung **Einstellungen bearbeiten**, damit du einen API-Schlüssel prägen kannst

</div>

## Was du verdrahten kannst

| Richtung | B1 Trigger | Mailchimp Aktion |
|---|---|---|
| B1 → Mailchimp | `person.created` | Abonnenten hinzufügen/aktualisieren |
| B1 → Mailchimp | `donation.created` | Abonnenten zum Tag hinzufügen (z. B. "2026 gegeben") |
| B1 → Mailchimp | `group.member.added` | Abonnenten zum gruppenbezogenen Tag hinzufügen |
| Mailchimp → B1 | Neuer Abonnent | B1 *Person erstellen* |

Die Mailchimp-Seite stellt viel mehr zur Verfügung (Kampagnen, Segmente, Automationen) - siehe [Mailchimp's Zapier Trigger](https://zapier.com/apps/mailchimp/integrations) für die vollständige Liste. Alles, das der B1-Umschlag zuordnungsfähig ist, ist fair.

## Einrichtung

### 1. Prägen Sie einen B1 API-Schlüssel

Gehe in B1Admin zu **Einstellungen → Entwickler → API-Schlüssel → Neuer API-Schlüssel**. Gib ihm die Scopes, die der Zap benötigt:

- `settings:write` — erforderlich, damit der Trigger seinen Webhook registriert
- `people:read` — damit der Zap Vor-/Nachname, E-Mail usw. lesen kann
- (Optional) `people:write`, wenn du auch eine Mailchimp → B1 Richtung planst

Speichern und kopiere die `cak_…` Zeichenkette - sie wird nur einmal angezeigt.

### 2. Erstelle den Zap

1. **Trigger:** `B1.church — Neue Person`. Bei der ersten Verwendung fragt Zapier dich auf, dich *bei B1.church anzumelden*; füge den API-Schlüssel ein.
2. **Aktion:** `Mailchimp — Abonnenten hinzufügen/aktualisieren`. Ordne die Triggerausgabe zu:
   - `data.contactInfo.email` → E-Mail-Adresse
   - `data.name.first` → Vorname
   - `data.name.last` → Nachname
   - (Optional) `data.id` → ein Mailchimp-Mergefeld, wenn du die B1-Personen-ID zusammen halten möchtest.
3. Aktiviere den Zap. Zapier registriert einen `person.created` Webhook auf B1 - überprüfe in **Einstellungen → Entwickler → Webhooks**, dass eine Zeile namens "Zapier — person.created" erscheint.

Das ist alles. Füge in B1Admin eine Person hinzu, um dies zu bestätigen - der neue Abonnent erscheint innerhalb von Sekunden in Mailchimp.

## Häufige Rezepte

### Automatisch Geber markieren

- **Trigger** — B1: Neue Spende
- **Aktion** — B1: Person suchen (nach `personId` nachschlagen), um die E-Mail zu erhalten
- **Aktion** — Mailchimp: Abonnenten zum Tag hinzufügen (Tag `Gave-2026`)

### Starte eine gruppenspezifische Willkommensserie

- **Trigger** — B1: Neues Gruppenmitglied, gefiltert nach `data.groupId`
- **Aktion** — Mailchimp: Abonnenten zum Tag hinzufügen, benannt nach der Gruppe; triggere deine bestehende Automatisierung diesen Tag

### Zweiwegfunktion: neue Mailchimp-Anmeldungen werden zu B1-Kontakten

- **Trigger** — Mailchimp: Neuer Abonnent
- **Aktion** — B1: Person erstellen (Vor-/Nachname/E-Mail zuordnen)

## Make-Alternative

Make's [Mailchimp-App](https://www.make.com/en/integrations/mailchimp) umfasst 44 Module - die Verdrahtung ist identisch, wobei Make's B1 *Watch Events* Trigger Zapier's ersetzt. Siehe das [Make Übersichtsdokument](../make) für die B1-Seite.

## Grenzen & Anmerkungen
