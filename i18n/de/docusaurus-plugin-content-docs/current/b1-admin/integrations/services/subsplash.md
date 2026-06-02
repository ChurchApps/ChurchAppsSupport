---
title: "Subsplash"
---

# Subsplash

<div class="article-intro">

Wenn Sie Subsplash für Ihre Gemeinde-App, Spenden oder Formulare verwenden, aber B1 als System of Record für Personen und Spenden möchten, kann Subsplashs Zapier-App Spenden, neue Profile und Formular-Antworten in Echtzeit in B1 einleiten. Beachten Sie, dass Subsplashs Zapier-App derzeit **nur Auslöser** ist – die Verkabelung ist Einweg (Subsplash → B1).

</div>

<div class="prereqs">
<h4>Bevor Sie Beginnen</h4>

- Ein Subsplash-Konto auf einem Plan, der **API + Zapier** Zugriff enthält (fragen Sie Ihren Subsplash Client Success Manager – diese Gate hinter Plan-Ebene)
- Ein [Zapier](https://zapier.com)-Konto
- Ein B1Admin-Benutzer mit der Berechtigung **Einstellungen bearbeiten**

</div>

## Was Sie verkabeln können

Alle Auslöser unten sind Subsplashs. Die Aktionen sind B1s.

| Subsplash-Auslöser | B1-Aktion |
|---|---|
| Neue Spende | Person suchen → Spende hinzufügen (Person erstellen, wenn fehlend) |
| Neue Zusage | Spende hinzufügen (mit `notes` = „Pledge: …") |
| Neue Person erstellt | Person erstellen |
| Person aktualisiertes Profil | (keine direkte B1-Aktion – log zu einem Google Sheet zur manuellen Überprüfung) |
| Neue Formular-Antwort | Person erstellen + (optional) Gruppenmitglied hinzufügen basierend auf dem Formular |

Subsplash → B1 ist die einzige Richtung, die Subsplashs App rechts jetzt unterstützt.

## Setup

### 1. Prägen Sie einen B1 API-Schlüssel

In B1Admin: **Einstellungen → Entwickler → API-Schlüssel → Neuer API-Schlüssel**. Geltungsbereiche:

- `people:read` – um den Spender nach E-Mail zu suchen
- `people:write` – um ihn zu erstellen, wenn er nicht existiert
- `donations:write` – um die Gabe zu zeichnen
- (Kein `settings:write` erforderlich – Subsplash, nicht B1, ist Eigentümer des Auslösers hier.)

### 2. Verbinden Sie Subsplash mit Zapier

Folgen Sie [Subsplashs Zapier-Integrations-Handbuch](https://support.subsplash.com/en/articles/9825926-zapier-integration). Sie stellen einen API-Token aus dem Subsplash-Dashboard aus, den Zapier zur Authentifizierung der Auslöser-Seite verwendet.

### 3. Erstellen Sie den „Spende aufzeichnen" Zap

1. **Auslöser** – Subsplash: Neue Spende
2. **Aktion** – B1.church: Person suchen (nach E-Mail)
3. **Filter / Path** – Zweig auf „Person gefunden":
   - **Gefunden:** B1.church: Spende hinzufügen. Ordnen Sie Betrag, Datum, Fonds, Methode = „Online", Notizen = Subsplash-Transaktions-ID zu.
   - **Nicht gefunden:** B1.church: Person erstellen → B1.church: Spende hinzufügen (mit der neu erstellten Personen-ID).

Schalten Sie den Zap ein. Zukünftige Subsplash-Spenden fließen in **B1Admin → Spenden** innerhalb von Sekunden.

## Häufige Rezepte

### Senden Sie einen Dankestext, wenn eine erste Gabe ankommt

- **Auslöser** – Subsplash: Neue Spende
- **Aktion** – Filter by Zapier: fahren Sie nur fort, wenn es die erste Gabe des Spenders ist (verwenden Sie eine *Lookup Table* auf Spender-E-Mail gegen ein Google Sheet von Vorgänger-Gebern, oder einen Zapier *Paths* Schritt auf das Spender-Erstellungsdatum)
- **Aktion** – Mailchimp / SMTP / SendGrid: Senden Sie First-Gift Dankesnachricht
- **Aktion** – B1.church: Spende hinzufügen (wie üblich)

### Filtern Sie Zusagen aus dem normalen Spendenstrom

- **Auslöser** – Subsplash: Neue Zusage
- **Aktion** – B1.church: Spende hinzufügen mit `notes = "Pledge — Subsplash"` und einem Fonds namens `Pledges` (separat von Ihrem Betriebsfonds), damit Sie in **B1Admin → Spenden → Berichte** unabhängig auf Zusagen berichten können.

### Synchronisieren Sie neue App-Benutzer als B1-Personen

- **Auslöser** – Subsplash: Neue Person erstellt
- **Aktion** – B1.church: Person erstellen, Namen, E-Mail, Telefon ausfüllen. Tag in B1, indem Sie die neue Person zu einer Gruppe wie „Subsplash App Users" hinzufügen.

## Limits & Notizen

- **Subsplashs Zapier-App ist nur Auslöser.** Wenn Sie B1-Seite-Änderungen möchten (z.B. eine neue B1-Person zu Subsplash auch landen), müssen Sie diese Bridge von B1s Zapier-App-Auslöser bauen, der Subsplashs REST-API über einen benutzerdefinierten *Webhooks by Zapier – POST* Action aufruft. Das ist eine benutzerdefinierte Integration, kein Rezept.
- **API-Zugriff ist plangebunden.** Wenn die Zapier-Verbindung mit `403 Forbidden` fehlschlägt, enthält Ihr Subsplash-Plan wahrscheinlich keinen API-Zugriff – wenden Sie sich an Ihren Client Success Manager.
- **Fonds-Zuordnung ist manuell.** Subsplash übergibt einen Kampagnen- oder Kategorienamen; B1 benötigt eine numerische Fonds-ID. Entweder Hartcode den Fonds in den Zap oder warten Sie eine Zapier *Lookup Table* Zuordnung von Subsplash-Kampagnen zu B1-Fonds.

## Fehlerbehebung

- **Kein Auslöser wird nach einer Spende ausgelöst** – überprüfen Sie in Subsplashs Zapier-Dashboard, dass die Verbindung immer noch *Verbunden* angezeigt wird. Wenn das API-Token auf der Subsplash-Seite rotiert wurde, stoppt der Zap automatisch; verbinden Sie erneut.
- **B1 *Spende hinzufügen* fehlgeschlagen mit 422** – am häufigsten eine fehlende oder nicht erkannte `fundId`. Listen Sie Ihre Fonds über **B1Admin → Spenden → Fonds** auf und kopieren Sie die genaue ID in den Zap-Schritt.
- **Erste Gabe wird zweimal ausgelöst** – Subsplash liefert gelegentlich einen Auslöser erneut, wenn Zapier seine Ack verpasst hat. Fügen Sie einen *Filter by Zapier* auf die Spenden-ID (Subsplash sendet eine in der Payload) hinzu, um Duplikate zu entfernen.

## Siehe auch

- [Donorbox](./donorbox) – gleiches Rezept-Form, verschiedene Spendenplattform
- [Zapier (Übersicht)](../zapier) – B1-Seite jedes Zapier-Rezepts
- [Subsplash Zapier-Integrations-Handbuch](https://support.subsplash.com/en/articles/9825926-zapier-integration) (Subsplashs Dokumente)
