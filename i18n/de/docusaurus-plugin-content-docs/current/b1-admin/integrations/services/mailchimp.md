---
title: "Mailchimp"
---

# Mailchimp

<div class="article-intro">

Leiten Sie neue B1-Personen, Spender oder Gruppenmitglieder in eine Mailchimp-Zielgruppe weiter, damit die nächste Willkommensreihe, der Jahresendappell oder der Freiwilligenbrief von einer Liste zieht, die immer aktualisiert wird. B1 hat keinen integrierten Mailchimp-Sync -- die Verdrahtung existiert vollständig in Zapier (oder Make): B1 feuert das Ereignis, Mailchimp nimmt den Abonnenten auf.

</div>

<div class="prereqs">
<h4>Bevor Sie anfangen</h4>

- Ein [Mailchimp](https://mailchimp.com)-Konto mit mindestens einer Zielgruppe, in die Sie B1-Personen verschieben möchten
- Ein [Zapier](https://zapier.com)-Konto (der kostenlose Tier deckt kleine Kirchen)
- Ein B1Admin-Benutzer mit der Berechtigung **Einstellungen bearbeiten**, damit Sie einen API-Schlüssel prägen können

</div>

## Was Sie verdrahten können

| Richtung | B1 Trigger | Mailchimp Aktion |
|---|---|---|
| B1 → Mailchimp | `person.created` | Abonnenten hinzufügen/aktualisieren |
| B1 → Mailchimp | `donation.created` | Abonnenten zum Tag hinzufügen (z.B. "Gab in 2026") |
| B1 → Mailchimp | `group.member.added` | Abonnent zu Tag hinzufügen, der dieser Gruppe zugeordnet ist |
| Mailchimp → B1 | Neuer Abonnent | B1 *Person erstellen* |

Die Mailchimp-Seite legt viel mehr dar (Kampagnen, Segmente, Automationen) -- siehe [Mailchimps Zapier-Trigger](https://zapier.com/apps/mailchimp/integrations) für die vollständige Liste. Alles, das aus der B1-Umschlag abgebildet werden kann, ist fair.

## Einrichtung

### 1. Prägen Sie einen B1 API-Schlüssel

Gehen Sie in B1Admin zu **Einstellungen → Entwickler → API-Schlüssel → Neuer API-Schlüssel**. Geben Sie ihm die Bereiche, die der Zap benötigt:

- `settings:write` — erforderlich, damit der Trigger seinen Webhook registriert
- `people:read` -- damit der Zap Vor-/Nachname, E-Mail usw. lesen kann
- (Optional) `people:write`, wenn Sie auch eine Mailchimp → B1-Richtung planen

Speichern und kopieren Sie die `cak_…` Zeichenkette -- sie wird nur einmal angezeigt.

### 2. Erstellen Sie den Zap

1. **Trigger:** `B1.church — Neue Person`. Bei der ersten Verwendung fragt Zapier Sie auf, sich bei *B1.church* anzumelden; fügen Sie den API-Schlüssel ein.
2. **Aktion:** `Mailchimp — Abonnent hinzufügen/aktualisieren`. Ordnen Sie die Trigger-Ausgabe zu:
   - `data.contactInfo.email` → E-Mail-Adresse
   - `data.name.first` → Vorname
   - `data.name.last` → Nachname
   - (Optional) `data.id` → ein Mailchimp-Fusionsfeld, wenn Sie B1's Person-ID daneben behalten möchten.
3. Schalten Sie den Zap ein. Zapier registriert einen `person.created` Webhook auf B1 -- überprüfen Sie in **Einstellungen → Entwickler → Webhooks**, dass eine Zeile mit dem Namen "Zapier — person.created" angezeigt wird.

Das ist alles. Fügen Sie eine Person in B1Admin hinzu, um zu bestätigen -- der neue Abonnent wird in Mailchimp innerhalb von Sekunden angezeigt.

## Allgemeine Rezepte

### Tag Spender automatisch

- **Trigger** — B1: Neue Spende
- **Aktion** — B1: Person suchen (nachschlagen nach `personId`), um die E-Mail zu erhalten
- **Aktion** — Mailchimp: Abonnent zum Tag hinzufügen (Tag `Gab-2026`)

### Legen Sie eine gruppespezifische Willkommensreihe ab

- **Trigger** — B1: Neues Gruppenmitglied, gefiltert nach `data.groupId`
- **Aktion** — Mailchimp: Abonnent zum Tag hinzufügen, benannt nach der Gruppe; lösen Sie Ihre vorhandene Automatisierung mit diesem Tag aus

### Bidirektional: Neue Mailchimp-Anmeldungen werden zu B1-Kontakten

- **Trigger** — Mailchimp: Neuer Abonnent
- **Aktion** — B1: Person erstellen (Vor-/Nach-/E-Mail zuordnen)

## Make-Alternative

Make's [Mailchimp-App](https://www.make.com/en/integrations/mailchimp) deckt 44 Module ab -- die Verdrahtung ist identisch, wobei der B1 *Watch Events*-Trigger Zapier's ersetzt. Siehe das [Make Überblick-Dokument](../make) für die B1-Seite.

## Grenzen & Hinweise

- **Mailchimp's kostenlose Tier deckt Kontakte und Zielgruppen ab** -- ein Zap, der eine kostenlose Zielgruppe über ihrem Limit überflutetet, beginnt mit `4xx Member limit reached` zu fehlern. Mailchimps Protokolle machen dies offensichtlich.
- **Mailchimp dedupliziert nach E-Mail**, daher wird das erneute Ausführen eines Zap auf derselben B1-Person an Ort und Stelle aktualisiert; es erstellt keine Duplikate.
- **Abmeldungen von Mailchimp fließen nicht zurück zu B1.** Wenn Sie möchten, dass Mailchimp-Abmeldungen B1's "Mail senden"-Präferenz löschen, erstellen Sie den umgekehrten Zap explizit.

## Fehlerbehebung

- **Zap wird nie ausgelöst** -- überprüfen Sie `Einstellungen → Entwickler → Webhooks` für die Zeile `Zapier — person.created`. Falls fehlend, fehlte dem API-Schlüssel `settings:write`, als der Zap eingeschaltet wurde. Neu prägen, erneut verbinden, schalten Sie den Zap aus und ein.
- **`Member exists` Warnung on Add/Update** -- wechseln Sie die Aktion von *Abonnent hinzufügen* zu *Abonnent hinzufügen/aktualisieren* (das Verb ist wichtig). Die Upsert-Variante ist idempotent.
- **Vorname / Nachname kommen leer an** -- B1's `data.name.first` und `data.name.last` werden nur ausgefüllt, wenn diese Felder auf der Person eingestellt sind. Ordnen Sie `data.name.display` als Fallback zu.

## Siehe auch

- [Zapier (Überblick)](../zapier) -- die B1-Seite jeden Zapier-Rezepts
- [Make (Überblick)](../make) -- gleiche Idee, visueller Builder
- [Webhooks (Entwickler-Referenz)](/docs/developer/api/webhooks#event-catalog)
