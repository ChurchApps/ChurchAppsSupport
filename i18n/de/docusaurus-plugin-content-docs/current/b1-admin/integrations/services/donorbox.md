---
title: "Donorbox"
---

# Donorbox

<div class="article-intro">

Wenn Ihre Gemeinde Spenden über Donorbox entgegennimmt, aber Personen und Konten in B1 verfolgt, können Donorboxs sofortige Zapier-Auslöser passende Spendendatensätze in B1 erstellen – und den Spender als B1-Person erstellen, wenn er noch nicht existiert. Keine manuelle Abstimmung, kein monatlicher Export.

</div>

<div class="prereqs">
<h4>Bevor Sie Beginnen</h4>

- Ein [Donorbox](https://donorbox.org)-Konto mit mindestens einer Kampagne
- Ein [Zapier](https://zapier.com)-Konto
- Ein B1Admin-Benutzer mit der Berechtigung **Einstellungen bearbeiten**

</div>

## Was Sie verkabeln können

| Richtung | Donorbox-Auslöser | B1-Aktion |
|---|---|---|
| Donorbox → B1 | Neue oder aktualisierte Spende (sofort) | Person suchen → Spende hinzufügen |
| Donorbox → B1 | Neuer oder aktualisierter Spender | Person erstellen |
| Donorbox → B1 | Neuer oder aktualisierter Plan (wiederkehrend) | Spende hinzufügen (Plankennung als Notiz verwenden) |

Donorbox veröffentlicht seine Auslöser als **sofortig** – sie werden innerhalb von Sekunden nach einer echten Spende ausgelöst. Kein Abruf-Verzug.

## Setup

### 1. Prägen Sie einen B1 API-Schlüssel

In B1Admin: **Einstellungen → Entwickler → API-Schlüssel → Neuer API-Schlüssel**. Geltungsbereiche:

- `people:read` – um den Spender nach E-Mail zu suchen
- `people:write` – um ihn zu erstellen, wenn er neu ist
- `donations:write` – um die Gabe zu zeichnen

Auslöser in dieser Richtung sind Donorboxs, nicht B1s, also benötigen Sie hier nicht `settings:write`.

### 2. Erstellen Sie den „Spende aufzeichnen" Zap

1. **Auslöser** – Donorbox: Neue Spende. Verbinden Sie mit Donorboxs API-Schlüssel (in Donorbox: *Account → Profil → API-Einstellungen*).
2. **Aktion** – B1.church: Person suchen. Ordnen Sie die Spender-E-Mail aus dem Auslöser dem Feld *E-Mail* zu.
3. **Aktion** – Filter by Zapier (optional): fahren Sie nur fort, wenn der Spender nicht gefunden wurde, dann…
4. **Aktion** – B1.church: Person erstellen. Ordnen Sie Vor-/Nach-/E-Mail zu, damit der Spender als Mitglied landet, nicht nur als Gabe-Datensatz.
5. **Aktion** – B1.church: Spende hinzufügen. Ordnen Sie zu:
   - Betrag → `data.amount`
   - Spendendatum → Spendendatum des Auslösers
   - Fonds → Wählen Sie den B1-Fonds, der der Donorbox-Kampagne entspricht (Zapier lässt Sie Fonds basierend auf einem Filter- oder Formatter-Schritt wechseln)
   - Methode → „Online"
   - Notizen → Donorbox-Transaktions-ID (praktisch bei der Abstimmung)

Schalten Sie den Zap ein. Die nächste Live-Spende über Donorbox landet in **B1Admin → Spenden** automatisch.

## Häufige Rezepte

### Ein Zap pro Fonds

Wenn Sie mehrere Donorbox-Kampagnen führen, die zu separaten B1-Fonds zuordnen, ist das sauberste Layout ein Zap pro Kampagne mit einem Donorbox *campaign* Filter oben – auf diese Weise ist die Fonds-Zuordnung hartcodiert und Sie überspringen den Lookup-Schritt.

### Aktualisierte Spenden als Korrektionen behandeln

Donorboxs *Neue oder aktualisierte Spende* wird auch bei Bearbeitungen ausgelöst. Verwenden Sie einen Zapier *Path*-Schritt auf `event_type`, um zu gabeln: „new" → Spende hinzufügen, „updated" → Spende suchen + Aktualisieren (Hinweis: B1s Zapier-App hat derzeit keine Update-Spende-Aktion – vorerst melden Sie „updated"-Ereignisse in einem Slack-Kanal zur manuellen Überprüfung).

### Synchronisieren Sie wiederkehrende Planänderungen mit einem Slack-Kanal

- **Auslöser** – Donorbox: Neuer oder aktualisierter Plan
- **Aktion** – Slack: Nachricht zu `#donations` senden (z.B. „Plan geändert — Sarahs monatliche Gabe beträgt jetzt $200")

## Limits & Notizen

- **Spender nach E-Mail abgleichen.** Donorbox teilt B1s Personen-ID nicht mit; der einzige dauerhafte Join-Schlüssel ist E-Mail. Spender, die unter einer anderen E-Mail geben, erstellen eine neue B1-Person – Ihre monatliche Abstimmung sollte nach diesen suchen.
- **Rückerstattungen werden nicht separat verfügbar gemacht** – Donorbox gibt eine Statusaktualisierung für die gleiche Spende aus. B1s Zapier-App hat derzeit keine *Spende aktualisieren*-Aktion; das sichere Muster heute ist, Rückerstattungsereignisse aus dem Verkehr zu registrieren und die Spende manuell anzupassen.
- **Testen Sie zuerst in Donorboxs Sandbox**, um zu vermeiden, dass falsche Gaben in Produktions-B1 erstellt werden. Donorbox bietet Test-Modus-Anmeldedaten getrennt von Live.

## Fehlerbehebung

- **„Person nicht gefunden" Warnung bei jedem Lauf** – das ist in Ordnung, wenn Sie die Schritte so bestellt haben, dass eine *Person erstellen*-Aktion im not-found-Zweig läuft. Wenn der Create Person-Schritt auch nie läuft, überprüfen Sie doppelt, dass der API-Schlüssel `people:write` hat.
- **Spendenbetrag sieht 100-mal zu groß oder klein aus** – Donorbox sendet Cents in einigen Payload-Varianten und Dollar in anderen. Verwenden Sie einen *Formatter by Zapier – Nummern*-Schritt, um durch 100 zu teilen, wenn nötig.
- **Doppelte Spenden aus einer einzelnen Gabe** – Donorbox feuert sowohl *Neue Spende* als auch *Spende aktualisiert* aus. Filtern Sie entweder zu `event_type = "donation.succeeded"` oder erstellen Sie zwei Zaps mit nicht überlappenden Filtern.

## Siehe auch

- [Zapier (Übersicht)](../zapier) – die B1-Seite jedes Zapier-Rezepts
- [Subsplash](./subsplash) – eine weitere Spendenplattform mit einer Zapier-App
- [Mailchimp](./mailchimp) – Kettenverkettung „neue Gabe" in ein E-Mail-Tag
