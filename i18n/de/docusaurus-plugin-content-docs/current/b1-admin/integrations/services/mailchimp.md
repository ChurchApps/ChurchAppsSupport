---
title: "Mailchimp"
---

# Mailchimp

<div class="article-intro">

Leiten Sie neue B1-Personen, Geber oder Gruppenmitglieder in eine Mailchimp-Zielgruppe weiter, damit die nächste Willkommensserie, Jahresabschluss-Appell oder Freiwilligenbrief aus einer Liste zieht, die immer aktuell ist. Die Verkabelung lebt vollständig in Zapier (oder Make) – B1 feuert das Ereignis, Mailchimp nimmt den Abonnenten auf.

</div>

<div class="prereqs">
<h4>Bevor Sie Beginnen</h4>

- Ein [Mailchimp](https://mailchimp.com)-Konto mit mindestens einer Zielgruppe, in die Sie B1-Personen drücken möchten
- Ein [Zapier](https://zapier.com)-Konto (die kostenlose Ebene deckt kleine Gemeinden ab)
- Ein B1Admin-Benutzer mit der Berechtigung **Einstellungen bearbeiten**, damit Sie einen API-Schlüssel prägen können

</div>

## Was Sie verkabeln können

| Richtung | B1-Auslöser | Mailchimp-Aktion |
|---|---|---|
| B1 → Mailchimp | `person.created` | Abonnent hinzufügen/aktualisieren |
| B1 → Mailchimp | `donation.created` | Abonnent zu Tag hinzufügen (z.B. „Gab in 2026") |
| B1 → Mailchimp | `group.member.added` | Abonnent zu Tag scoped zu dieser Gruppe hinzufügen |
| Mailchimp → B1 | Neuer Abonnent | B1 *Person erstellen* |

Die Mailchimp-Seite stellt viel mehr zur Verfügung (Kampagnen, Segmente, Automationen) – siehe [Mailchimp Zapier Trigger](https://zapier.com/apps/mailchimp/integrations) für die vollständige Liste. Alles Zuordnbare aus der B1-Hülle ist fair.

## Setup

### 1. Prägen Sie einen B1 API-Schlüssel

In B1Admin gehen Sie zu **Einstellungen → Entwickler → API-Schlüssel → Neuer API-Schlüssel**. Geben Sie ihm die Geltungsbereiche, die der Zap benötigt:

- `settings:write` – erforderlich, damit der Auslöser seinen Webhook registriert
- `people:read` – damit der Zap Vor-/Nach-Name, E-Mail usw. lesen kann
- (Optional) `people:write` wenn Sie auch eine Mailchimp → B1 Richtung planen

Speichern und kopieren Sie den `cak_…` String – er wird nur einmal angezeigt.

### 2. Erstellen Sie den Zap

1. **Auslöser:** `B1.church — Neue Person`. Bei der ersten Verwendung fordert Zapier Sie auf, *Sign in to B1.church* zu machen; fügen Sie den API-Schlüssel ein.
2. **Aktion:** `Mailchimp — Abonnent hinzufügen/aktualisieren`. Ordnen Sie die Auslöser-Ausgabe zu:
   - `data.contactInfo.email` → E-Mail-Adresse
   - `data.name.first` → Vorname
   - `data.name.last` → Nachname
   - (Optional) `data.id` → ein Mailchimp-Merge-Feld, wenn Sie B1s Personen-ID daneben halten möchten.
3. Schalten Sie den Zap ein. Zapier registriert einen `person.created` Webhook auf B1 – überprüfen Sie in **Einstellungen → Entwickler → Webhooks**, dass eine Reihe namens „Zapier — person.created" erscheint.

Das ist alles. Fügen Sie eine Person in B1Admin hinzu, um zu bestätigen – der neue Abonnent erscheint in Mailchimp innerhalb von Sekunden.

## Häufige Rezepte

### Tag-Geber automatisch

- **Auslöser** – B1: Neue Spende
- **Aktion** – B1: Person suchen (Lookup nach `personId`) um die E-Mail zu bekommen
- **Aktion** – Mailchimp: Abonnent zu Tag hinzufügen (Tag `Gave-2026`)

### Eröffnen Sie eine gruppespezifische Willkommensserie

- **Auslöser** – B1: Neues Gruppenmitglied, gefiltert nach `data.groupId`
- **Aktion** – Mailchimp: Abonnent zu Tag hinzufügen, der nach der Gruppe benannt ist; lösen Sie Ihre bestehende Automatisierung aus, die aus diesem Tag ausgelöst wird

### Zwei-Wege: neue Mailchimp-Anmeldungen werden zu B1-Kontakten

- **Auslöser** – Mailchimp: Neuer Abonnent
- **Aktion** – B1: Person erstellen (Vor-/Nach-/E-Mail zuordnen)

## Make-Alternative

Maches [Mailchimp-App](https://www.make.com/en/integrations/mailchimp) umfasst 44 Module – die Verkabelung ist identisch, mit B1 *Watch Events* Auslöser ersetzen Zapiers. Siehe [Make Übersicht-Dokumentation](../make) für die B1-Seite.

## Limits & Notizen

- **Mailchimps kostenlose Ebene begrenzt Kontakte und Zielgruppen** – ein Zap, der eine kostenlose Zielgruppe über ihre Grenze hinaus überschwemmt, beginnt mit `4xx Member limit reached` zu irren. Mailchimps Protokolle machen dies offensichtlich.
- **Mailchimp dedupliziert nach E-Mail**, so dass das erneute Ausführen eines Zaps auf der gleichen B1-Person ihn an Ort und Stelle aktualisiert; es erstellt keine Duplikate.
- **Abmeldungen von Mailchimp fließen nicht zurück zu B1.** Wenn Sie möchten, dass Mailchimp-Abmeldungen B1s „Send Mail"-Einstellung löschen, bauen Sie den reverse Zap explizit.

## Fehlerbehebung

- **Zap wird niemals ausgelöst** – überprüfen Sie `Einstellungen → Entwickler → Webhooks` auf die `Zapier — person.created` Reihe. Wenn fehlend, fehlte dem API-Schlüssel `settings:write`, als der Zap eingeschaltet wurde. Prägen Sie erneut, verbinden Sie erneut, schalten Sie den Zap aus und wieder ein.
- **`Member exists` Warnung auf Hinzufügen/Aktualisieren** – Wechseln Sie die Aktion von *Abonnent hinzufügen* zu *Abonnent hinzufügen/aktualisieren* (das Verb ist wichtig). Die Upsert-Variante ist idempotent.
- **Vorname / Nachname kommen leer an** – B1s `data.name.first` und `data.name.last` werden nur gefüllt, wenn diese Felder auf der Person gesetzt sind. Ordnen Sie `data.name.display` als Fallback zu.

## Siehe auch

- [Zapier (Übersicht)](../zapier) – die B1-Seite jedes Zapier-Rezepts
- [Make (Übersicht)](../make) – gleiche Idee, visueller Builder
- [Webhooks (Entwickler-Referenz)](/docs/developer/api/webhooks#event-catalog)
