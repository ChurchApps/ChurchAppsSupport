---
title: "Mailchimp"
---

# Mailchimp

<div class="article-intro">

Leiten Sie neue B1-Personen, Spender oder Gruppenmitglieder in eine Mailchimp-Zielgruppe, damit die nächste Willkommensserie, Jahresendaktion oder der Freiwilligen-Newsletter aus einer stets aktuellen Liste schöpft. B1 hat keine integrierte Mailchimp-Synchronisierung -- die Verbindung erfolgt vollständig in Zapier (oder Make): B1 löst das Ereignis aus, Mailchimp nimmt den Abonnenten auf.

</div>

<div class="prereqs">
<h4>Bevor Sie beginnen</h4>

- Ein [Mailchimp](https://mailchimp.com)-Konto mit mindestens einer Zielgruppe, in die B1-Personen übertragen werden sollen
- Ein [Zapier](https://zapier.com)-Konto (die kostenlose Stufe reicht für kleine Kirchen)
- Ein B1Admin-Benutzer mit der Berechtigung **Einstellungen bearbeiten**, damit Sie einen API-Schlüssel erstellen können

</div>

## Was Sie verbinden können

| Richtung | B1-Trigger | Mailchimp-Aktion |
|---|---|---|
| B1 → Mailchimp | `person.created` | Abonnent hinzufügen/aktualisieren |
| B1 → Mailchimp | `donation.created` | Abonnent zu Tag hinzufügen (z. B. „Hat 2026 gespendet") |
| B1 → Mailchimp | `group.member.added` | Abonnent zu einem auf diese Gruppe bezogenen Tag hinzufügen |
| Mailchimp → B1 | Neuer Abonnent | B1 *Person erstellen* |

Die Mailchimp-Seite bietet noch viel mehr (Kampagnen, Segmente, Automatisierungen) -- die vollständige Liste finden Sie unter [Mailchimps Zapier-Triggern](https://zapier.com/apps/mailchimp/integrations). Alles, was sich aus dem B1-Umschlag abbilden lässt, ist möglich.

## Einrichtung

### 1. Einen B1-API-Schlüssel erstellen

Gehen Sie in B1Admin zu **Einstellungen → Entwickler → API-Schlüssel → Neuer API-Schlüssel**. Geben Sie ihm die Bereiche, die der Zap benötigt:

- `settings:write` -- erforderlich, damit der Trigger seinen Webhook registrieren kann
- `people:read` -- damit der Zap Vor-/Nachname, E-Mail usw. lesen kann
- (Optional) `people:write`, wenn Sie auch eine Richtung Mailchimp → B1 planen

Speichern und den `cak_…`-String kopieren -- er wird nur einmal angezeigt.

### 2. Den Zap erstellen

1. **Trigger:** `B1.church — Neue Person`. Bei der ersten Verwendung fordert Zapier Sie auf, sich *bei B1.church anzumelden*; fügen Sie den API-Schlüssel ein.
2. **Aktion:** `Mailchimp — Abonnent hinzufügen/aktualisieren`. Ordnen Sie die Trigger-Ausgabe zu:
   - `data.contactInfo.email` → E-Mail-Adresse
   - `data.name.first` → Vorname
   - `data.name.last` → Nachname
   - (Optional) `data.id` → ein Mailchimp-Merge-Feld, wenn Sie die B1-Personen-ID mitführen möchten.
3. Aktivieren Sie den Zap. Zapier registriert einen `person.created`-Webhook bei B1 -- überprüfen Sie unter **Einstellungen → Entwickler → Webhooks**, ob eine Zeile namens „Zapier — person.created" erscheint.

Das war's. Fügen Sie eine Person in B1Admin hinzu, um zu bestätigen -- der neue Abonnent erscheint innerhalb von Sekunden in Mailchimp.

## Gängige Rezepte

### Spender automatisch taggen

- **Trigger** -- B1: Neue Spende
- **Aktion** -- B1: Person suchen (Nachschlagen per `personId`), um die E-Mail zu erhalten
- **Aktion** -- Mailchimp: Abonnent zu Tag hinzufügen (Tag `Gave-2026`)

### Eine gruppenspezifische Willkommensserie auslösen

- **Trigger** -- B1: Neues Gruppenmitglied, gefiltert nach `data.groupId`
- **Aktion** -- Mailchimp: Abonnent zu einem nach der Gruppe benannten Tag hinzufügen; Ihre bestehende Automatisierung durch dieses Tag auslösen

### Zweiseitig: neue Mailchimp-Anmeldungen werden B1-Kontakte

- **Trigger** -- Mailchimp: Neuer Abonnent
- **Aktion** -- B1: Person erstellen (Vorname/Nachname/E-Mail zuordnen)

## Make-Alternative

Makes [Mailchimp-App](https://www.make.com/en/integrations/mailchimp) deckt 44 Module ab -- die Verbindung ist identisch, wobei Zapiers Trigger durch B1s *Ereignisse überwachen*-Trigger ersetzt wird. Die B1-Seite finden Sie im [Make-Übersichtsdokument](../make).

## Einschränkungen & Hinweise

- **Mailchimps kostenlose Stufe begrenzt Kontakte und Zielgruppen** -- ein Zap, der eine kostenlose Zielgruppe über ihr Limit hinaus überschwemmt, beginnt mit Fehlern der Art `4xx Mitgliederlimit erreicht`. Mailchimps Protokolle machen dies deutlich.
- **Mailchimp dedupliziert nach E-Mail**, sodass ein erneuter Lauf eines Zaps auf dieselbe B1-Person diese aktualisiert, statt Duplikate zu erstellen.
- **Abmeldungen von Mailchimp fließen nicht zurück zu B1.** Wenn Mailchimp-Abmeldungen die B1-Einstellung „E-Mail senden" löschen sollen, erstellen Sie den umgekehrten Zap explizit.

## Fehlerbehebung

- **Zap löst nie aus** -- überprüfen Sie `Einstellungen → Entwickler → Webhooks` auf die Zeile `Zapier — person.created`. Falls sie fehlt, fehlte dem API-Schlüssel beim Aktivieren des Zaps `settings:write`. Erstellen Sie ihn neu, verbinden Sie ihn erneut und schalten Sie den Zap aus und wieder ein.
- **Warnung „Member exists" bei Hinzufügen/Aktualisieren** -- wechseln Sie die Aktion von *Abonnent hinzufügen* zu *Abonnent hinzufügen/aktualisieren* (das Verb ist entscheidend). Die Upsert-Variante ist idempotent.
- **Vor-/Nachname kommen leer an** -- B1s `data.name.first` und `data.name.last` sind nur ausgefüllt, wenn diese Felder bei der Person gesetzt sind. Ordnen Sie `data.name.display` als Fallback zu.

## Siehe auch

- [Zapier (Übersicht)](../zapier) -- die B1-Seite jedes Zapier-Rezepts
- [Make (Übersicht)](../make) -- dieselbe Idee, visueller Builder
- [Webhooks (Entwicklerreferenz)](/docs/developer/api/webhooks#event-catalog)
