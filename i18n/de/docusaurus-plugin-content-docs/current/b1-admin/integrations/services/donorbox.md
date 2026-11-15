---
title: "Donorbox"
description: "Verbinden Sie Donorbox mit B1 Admin über Zapier, damit Online-Spenden automatisch Spendenaufzeichnungen und Spenderprofile in B1 anlegen – ohne manuellen Export."
---

# Donorbox

<div class="article-intro">

Wenn Ihre Gemeinde Spenden über Donorbox entgegennimmt, Personen und Bescheinigungen aber in B1 verwaltet, können Sie die sofortigen Zapier-Auslöser von Donorbox passende Spendenaufzeichnungen in B1 erstellen lassen – und den Spender als B1-Person anlegen, falls er noch nicht existiert. Kein manueller Abgleich, kein monatlicher Export.

</div>

<div class="prereqs">
<h4>Bevor Sie beginnen</h4>

- Ein [Donorbox](https://donorbox.org)-Konto mit mindestens einer Kampagne
- Ein [Zapier](https://zapier.com)-Konto
- Ein B1Admin-Benutzer mit der Berechtigung **Einstellungen bearbeiten**

</div>

## Was Sie verbinden können {#what-you-can-wire-up}

| Richtung | Auslöser bei Donorbox | Aktion in B1 |
|---|---|---|
| Donorbox → B1 | Neue oder aktualisierte Spende (sofort) | Person suchen → Spende hinzufügen |
| Donorbox → B1 | Neuer oder aktualisierter Spender | Person erstellen |
| Donorbox → B1 | Neuer oder aktualisierter Plan (wiederkehrend) | Person suchen → Spende hinzufügen (Plan-ID als Notiz verwenden) |

Donorbox stellt seine Auslöser als **sofortig** bereit – sie feuern innerhalb von Sekunden nach einer echten Spende. Es gibt keine Verzögerung durch Abfragen.

## Einrichtung {#setup}

### 1. Einen B1-API-Schlüssel erstellen {#1-mint-a-b1-api-key}

In B1Admin: **Einstellungen → Entwickler → API-Schlüssel → Neuer API-Schlüssel**. Berechtigungen:

- `people:read` – um den Spender anhand der E-Mail-Adresse nachzuschlagen
- `people:write` – um ihn anzulegen, falls er neu ist
- `donations:write` – um die Gabe zu erfassen

- `settings:write` – Zapier prüft beim Verbinden jeden B1-Schlüssel gegen die Webhook-Liste von B1; ohne diese Berechtigung schlägt die Verbindung fehl (auch wenn hier Donorbox und nicht B1 den Auslöser besitzt)

### 2. Den Zap „Spende erfassen“ erstellen {#2-build-the-record-a-donation-zap}

1. **Auslöser** – Donorbox: Neue Spende. Verbinden Sie ihn mit dem API-Schlüssel von Donorbox (in Donorbox: *Konto → Profil → API-Einstellungen*).
2. **Aktion** – B1.church: Person suchen. Ordnen Sie die E-Mail-Adresse des Spenders aus dem Auslöser dem Feld *E-Mail* zu.
3. **Aktion** – B1.church: Spende hinzufügen. Ordnen Sie zu:
   - Person → die ID aus Schritt 2
   - Betrag → der Spendenbetrag aus dem Auslöser
   - Spendendatum → das Spendendatum aus dem Auslöser
   - Fonds → wählen Sie den B1-Fonds, der der Donorbox-Kampagne entspricht (Zapier lässt Sie die Fonds anhand eines Filters oder eines Formatter-Schritts wechseln)
   - Methode → „Online“
   - Notizen → Transaktions-ID von Donorbox (praktisch beim Abgleich)

Schalten Sie den Zap ein. Die nächste Live-Spende über Donorbox landet automatisch unter **B1Admin → Spenden**.

Die Funktion *Person suchen* von B1 bricht den Zap mit dem Fehler „No person found“ ab, wenn niemand diese E-Mail-Adresse hat. Daher kann ein Filterschritt nicht darauf verzweigen. Um Erstspender zu behandeln, aktivieren Sie die Fehlerbehandlung von Zapier für den Schritt Person suchen und führen Sie im Fehlerpfad B1.church: Person erstellen (Vor-/Nachname/E-Mail zuordnen) und danach Spende hinzufügen mit der ID der neuen Person aus. Alternativ führen Sie den Zap *Neuer Spender* → *Person erstellen* aus der Tabelle oben aus, damit Spender in B1 bereits existieren, bevor ihre Gabe eingeht.

## Häufige Rezepte {#common-recipes}

### Ein Zap pro Fonds {#one-zap-per-fund}

Wenn Sie mehrere Donorbox-Kampagnen betreiben, die separaten B1-Fonds zugeordnet sind, ist die sauberste Anordnung ein Zap pro Kampagne mit einem Filter nach *Kampagne* von Donorbox ganz oben. So ist die Fonds-Zuordnung fest hinterlegt und Sie sparen sich den Nachschlageschritt.

### Aktualisierte Spenden als Korrekturen behandeln {#treat-updated-donations-as-corrections}

Der Auslöser *Neue oder aktualisierte Spende* von Donorbox feuert auch bei Bearbeitungen. Verwenden Sie einen Zapier-Schritt *Pfad* auf `event_type`, um zu verzweigen: „new“ → Spende hinzufügen, „updated“ → Spende suchen + aktualisieren (Hinweis: Die Zapier-App von B1 hat derzeit keine Aktion „Spende aktualisieren“ – protokollieren Sie „updated“-Ereignisse vorerst in einem Slack-Kanal zur manuellen Prüfung).

### Änderungen wiederkehrender Pläne in einen Slack-Kanal übernehmen {#sync-recurring-plan-changes-to-a-slack-channel}

- **Auslöser** – Donorbox: Neuer oder aktualisierter Plan
- **Aktion** – Slack: Nachricht senden an `#donations` (z. B. „Plan geändert – Saras monatliche Gabe beträgt jetzt 200 $“)

## Einschränkungen und Hinweise {#limits--notes}

- **Spender über die E-Mail-Adresse zuordnen.** Donorbox teilt die Person-ID von B1 nicht; der einzige dauerhafte Verknüpfungsschlüssel ist die E-Mail-Adresse. Spender, die unter einer anderen E-Mail-Adresse geben, legen eine neue B1-Person an – Ihr monatlicher Abgleich sollte danach suchen.
- **Rückerstattungen werden nicht gesondert angezeigt** – Donorbox sendet bei derselben Spende eine Statusaktualisierung. Die Zapier-App von B1 hat derzeit keine Aktion *Spende aktualisieren*; das sichere Vorgehen ist derzeit, Rückerstattungsereignisse außerhalb von B1 zu protokollieren und die Spende manuell anzupassen.
- **Testen Sie zuerst in der Sandbox von Donorbox**, um keine erfundenen Gaben im Produktivsystem von B1 zu erzeugen. Donorbox stellt Testzugangsdaten getrennt von den Live-Zugangsdaten bereit.

## Fehlerbehebung {#troubleshooting}

- **Fehler „No person found“** – der Spender ist noch nicht in B1 (oder hat unter einer anderen E-Mail-Adresse gegeben). Richten Sie den oben beschriebenen Fehlerpfad ein und prüfen Sie, ob der API-Schlüssel `people:write` besitzt, damit *Person erstellen* ausgeführt werden kann.
- **Der Spendenbetrag wirkt 100-mal zu groß oder zu klein** – Donorbox sendet je nach Variante der Nutzdaten teils Cent, teils Dollar. Verwenden Sie bei Bedarf einen Schritt *Formatter by Zapier — Numbers*, um durch 100 zu teilen.
- **Doppelte Spenden aus einer einzigen Gabe** – Donorbox feuert sowohl *Neue Spende* als auch *Aktualisierte Spende*. Filtern Sie entweder auf `event_type = "donation.succeeded"` oder erstellen Sie zwei Zaps mit sich nicht überschneidenden Filtern.

## Siehe auch {#see-also}

- [Zapier (Überblick)](../zapier.md) – die B1-Seite jedes Zapier-Rezepts
- [Subsplash](./subsplash.md) – eine weitere Spendenplattform mit Zapier-App
- [Mailchimp](./mailchimp.md) – „Neue Gabe“ mit einer E-Mail-Markierung verknüpfen
