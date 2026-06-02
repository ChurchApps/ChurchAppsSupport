---
title: "Clearstream"
---

# Clearstream

<div class="article-intro">

Triggern Sie eine [Clearstream](https://clearstream.io) Textnachricht von jedem B1-Ereignis aus – neue Person, neue Gabe, Formular-Einsendung, Kalenderaktualisierung – und ziehen Sie Antworten als B1-Datensätze zurück. Clearstreams Zapier-App stellt beide Richtungen zur Verfügung, so dass die ganze Verkabelung ein Rezept und kein benutzerdefinierter Code ist.

</div>

<div class="prereqs">
<h4>Bevor Sie Beginnen</h4>

- Ein [Clearstream](https://clearstream.io)-Konto mit mindestens einer Liste und einer SMS-Zuordnung
- Ein [Zapier](https://zapier.com)-Konto
- Ein B1Admin-Benutzer mit der Berechtigung **Einstellungen bearbeiten**

</div>

## Was Sie verkabeln können

| Richtung | Auslöser | Aktion |
|---|---|---|
| B1 → Clearstream | B1 `person.created` | Clearstream: Subscriber erstellen/aktualisieren + Text zu Nummer senden |
| B1 → Clearstream | B1 `donation.created` | Clearstream: Text zu Liste senden (z.B. Finanzeam benachrichtigen) |
| B1 → Clearstream | B1 `form.submission.created` | Clearstream: Text zu Routing-Liste senden (z.B. Gebetsanforderungs-Team) |
| Clearstream → B1 | Neue eingehende Text | B1: Person erstellen; Tag mit dem Schlüsselwort, das sie textet |

Clearstreams Zapier-Aktionen: *Text zu Nummer senden*, *Text zu Liste senden*, *Subscriber erstellen/aktualisieren*, *Subscriber zu automatisiertem Workflow hinzufügen*, *Tag zu Subscriber hinzufügen*, *Subscriber aus Liste entfernen*.

## Setup

### 1. Prägen Sie einen B1 API-Schlüssel

**Einstellungen → Entwickler → API-Schlüssel → Neuer API-Schlüssel**:

- `settings:write` – erforderlich, damit B1 den Trigger-Webhook registriert
- `people:read` – nötig, um die Person aus dem Ereignis zu suchen (`personId` → Name/Telefon/E-Mail)
- (Optional) `people:write` wenn Clearstream-Antworten B1-Kontakte erstellen sollten

### 2. Erstellen Sie den „Text bei neuer Gabe" Zap

1. **Auslöser** – B1.church: Neue Spende
2. **Aktion** – B1.church: Person suchen (der Spende `personId`)
3. **Aktion** – Clearstream: Text zu Nummer senden. Verwenden Sie das Telefon der Person aus Schritt 2 als Empfänger, verfassen Sie die Nachricht (`"Thanks for your gift, {first}! …"`).

Schalten Sie den Zap ein. B1 registriert den Spenden-Webhook bei der Aktivierung; Sie sehen `Zapier — donation.created` in **Einstellungen → Entwickler → Webhooks** erscheinen.

### 3. (Optional) Ziehen Sie Antworten als B1-Datensätze zurück

1. **Auslöser** – Clearstream: Neue eingehende Text
2. **Aktion** – Filter nach Zapier zum Schlüsselwort – z.B. fahren Sie nur fort, wenn der Text-Body mit `PRAY` beginnt
3. **Aktion** – B1.church: Person suchen (nach Telefon)
4. **Aktion** – Filter / Path – wenn nicht gefunden, erstellen Sie sie; ordnen Sie in jedem Fall den Text-Body irgendwo ein (Slack, Google Sheet oder eine B1-Formular-Einsendung über Webhooks by Zapier).

## Häufige Rezepte

### Seelsorge-Team-Paging

- **Auslöser** – B1.church: Neue Formular-Einsendung (gefiltert auf die Gebetsanforderungs-Formular-ID)
- **Aktion** – Clearstream: Text zu Liste senden, wo die Liste Ihr On-Call-Seelsorgeteam ist. Verfassen Sie den Body als `New prayer request: {data.questions.0.answer}`.

### Erstkontakt-Verfolgungssequenz

- **Auslöser** – B1.church: Neue Person, gefiltert auf einen B1-Personen-Tag „First-time visitor"
- **Aktion** – Clearstream: Subscriber zu automatisiertem Workflow hinzufügen. Ordnen Sie die Workflow-ID einer vorgefertigten 7-Tage-Text-Tropffolge zu.

### Schlüsselwort-gesteuerte Gruppenbeitritt

- **Auslöser** – Clearstream: Neue eingehende Text (Filter zu Schlüsselwort `MENS`)
- **Aktion** – B1.church: Person suchen (nach Telefon); Gabelung bei nicht gefunden → Person erstellen
- **Aktion** – B1.church: Gruppenmitglied zur Herrenministerium-Gruppe hinzufügen

## Limits & Notizen

- **Clearstream misst SMS nach Nachricht.** Jede Send Text-Aktion verbraucht eine oder mehrere Credits abhängig von Länge und Anzahl der Empfänger – überprüfen Sie Ihr Plan-Kontingent.
- **Telefon muss im E.164-Format sein** (z.B. `+15555550199`) für *Text zu Nummer senden*. B1s Personeneintrag speichert, was eingegeben wurde; verwenden Sie einen *Formatter by Zapier – Nummern → Telefonnummer formatieren* Schritt, wenn Sie das Format nicht garantieren können.
- **Kein Header ist erforderlich von B1s Seite** – Clearstreams Auth lebt vollständig in seiner Zapier-Verbindung.

## Fehlerbehebung

- **Auslöser wird niemals ausgelöst** – `Einstellungen → Entwickler → Webhooks` sollte eine `Zapier — <event>`-Reihe nach dem Einschalten des Zaps zeigen. Wenn nicht, fehlt dem B1 API-Schlüssel `settings:write`. Prägen Sie erneut und verbinden Sie erneut.
- **Clearstream gibt „Invalid phone number" zurück** – das Empfänger-Feld ist nicht im E.164-Format. Fügen Sie einen Format-Telefonnummer-Schritt hinzu.
- **Text zu Liste fehlgeschlagen mit `403`** – der Clearstream API-Benutzer hat keine Berechtigung für diese Liste, oder die Listen-ID ist falsch. Listen-IDs sind auf der Clearstream-Listen-Detail-Seite sichtbar.

## Siehe auch

- [Text In Church](./text-in-church) – alternative SMS-Plattform, ähnliches Verkabelungsmuster
- [Mobile Message](./mobile-message) – für Gemeinden außerhalb der USA
- [Zapier (Übersicht)](../zapier) – B1-Seite jedes Zapier-Rezepts
- [Clearstream API-Dokumente](https://api-docs.clearstream.io/) – für benutzerdefinierte Integrationen über das Zapier-App hinaus
