---
title: "Mobile Message"
---

# Mobile Message

<div class="article-intro">

[Mobile Message](https://mobilemessage.com.au) ist eine australische SMS-API – beliebt bei AU-Gemeinden, da sie lokale Nummern und wettbewerbsfähige AU-Preise bietet, wo Clearstream und Text In Church US-zentrisch sind. Mobile Message hat heute keine Zapier-App der ersten Klasse, aber es veröffentlicht eine öffentliche REST-API, so dass Sie B1-Ereignisse mit **Webhooks by Zapier** (oder Maches HTTP-Modul) in ein paar Minuten zu Mobile Message Texten verkabeln können.

</div>

<div class="prereqs">
<h4>Bevor Sie Beginnen</h4>

- Ein [Mobile Message](https://mobilemessage.com.au)-Konto mit einer registrierten Sender-ID und API-Anmeldedaten (API-Benutzername + Passwort unter *Account → API-Einstellungen*)
- Ein [Zapier](https://zapier.com)-Konto (oder [Make](https://www.make.com))
- Ein B1Admin-Benutzer mit der Berechtigung **Einstellungen bearbeiten**

</div>

## Was Sie verkabeln können

Die API von Mobile Message ist „SMS senden"-förmig – keine Auslöser, nur ausgehende Texte. So sind die Rezepte alle B1 → SMS:

| Richtung | B1-Auslöser | Ergebnis |
|---|---|---|
| B1 → Mobile Message | `person.created` | Willkommenstext zur neuen Person |
| B1 → Mobile Message | `donation.created` | Dankestextnachricht zum Spender |
| B1 → Mobile Message | `form.submission.created` | Pagen Sie das On-Call-Team |
| B1 → Mobile Message | `event.created` | Erinnerungsbertragung zu einer Liste |

## Setup

### 1. Prägen Sie einen B1 API-Schlüssel

**Einstellungen → Entwickler → API-Schlüssel → Neuer API-Schlüssel**:

- `settings:write` – für den Trigger-Webhook zur Registrierung
- `people:read` – um die Telefonnummer des Empfängers von einer `personId` zu suchen

### 2. Bauen Sie den Zap mit Webhooks by Zapier

1. **Auslöser** – B1.church: Wählen Sie das Ereignis, das Sie wünschen (z.B. Neue Spende).
2. **Aktion** – B1.church: Person suchen (mit `data.personId`) um die Telefonnummer und den Namen zu bekommen.
3. **Aktion** – Webhooks by Zapier: **POST**. Konfigurieren Sie wie folgt.

Die Einstellungen des POST-Schritts:

- **URL** — `https://api.mobilemessage.com.au/v1/messages`
- **Payload-Typ** — JSON
- **Daten** —
  ```json
  {
    "messages": [
      {
        "to": "{{step2_phone}}",
        "message": "Thanks for your gift, {{step2_first_name}}!",
        "sender": "YourChurch"
      }
    ]
  }
  ```
- **Header** — `Content-Type: application/json` (Webhooks by Zapier fügt dies automatisch hinzu)
- **Basis-Authentifizierung** — setzen Sie das Feld *Basis-Authentifizierung* auf `<api_username>|<api_password>` (Zapier konvertiert das zum richtigen `Authorization: Basic …` Header)

Schalten Sie den Zap ein. Senden Sie eine Test-Gabe in B1Admin, um zu überprüfen, dass ein Text ankommt.

## Häufige Rezepte

### Ereigniserinnerungen am Morgen des Events

- **Auslöser** – Schedule by Zapier (täglich, 7 Uhr)
- **Aktion** – B1.church: Ereignisse heute suchen (oder einen Find-Schritt mit einem festen Datumfilter verwenden, oder Todays Ereignisliste in einem Google Sheet speichern)
- **Aktion** – Webhooks by Zapier: POST zu Mobile Message mit der Ereignisliste an eine registrierte Abonnenten-Gruppe

### Verwenden Sie den Batch-Endpoint für eine Listen-Übertragung

Machen Sie Endpoint `/v1/messages` akzeptiert bis zu 10.000 Nachrichten pro Aufruf. Um an eine B1-Gruppe zu übertragen:

- **Auslöser** – B1.church: Neue Formular-Einsendung (Filter zu einem bestimmten Formular)
- **Aktion** – B1.church: List Group Members für eine Zielgruppe (via einen *Webhooks by Zapier – GET* Schritt auf `/membership/groupmembers?groupId=…`)
- **Aktion** – Formatter by Zapier → Utilities → Line-Itemize die Antwort in ein `messages` Array
- **Aktion** – Webhooks by Zapier: POST das volle Array zu `/v1/messages`

### Make-Alternative

Wenn Sie Make bevorzugen, ziehen Sie das **HTTP – Make a request** Modul nach dem B1 Watch Events Auslöser, konfigurieren Sie es auf die gleiche Weise (POST, Basis-Authentifizierung, JSON-Body). Siehe [Make Übersicht](../make) für die B1-Seite.

## Limits & Notizen

- **Basis-Authentifizierung ist die einzige Authentifizierungsmethode** – Mobile Message stellt einen Benutzernamen und ein Passwort vom Dashboard aus. Behandeln Sie beide als Geheimnisse.
- **`sender` muss eine registrierte Sender-ID** auf Ihrem Mobile Message-Konto sein, oder der Send gibt `400 Invalid sender` zurück. AU-Regelungen erfordern Sender-Registrierung.
- **AU-Telefonnummern** können `0412345678` (lokal) oder `+61412345678` (international) sein. Die API akzeptiert beide, normalisiert aber auf `+61…`, wenn Sie auch ins Ausland senden.
- **Bis zu 10.000 Nachrichten pro Anfrage** – nützlich für Übertragungen, aber eine einzelne B1-Webhook-Lieferung wird selten eine Liste emit, die so groß ist; reservieren Sie den Batch-Endpoint für geplante Bulk-Zaps.

## Fehlerbehebung

- **POST gibt `401 Unauthorized` zurück** – Basis-Authentifizierungs-Anmeldedaten sind falsch. Kopieren Sie erneut aus dem Mobile Message-Dashboard *Account → API-Einstellungen*. Beachten Sie, dass der Benutzername standardmäßig Ihre Konto-E-Mail ist, kein separater API-Schlüssel.
- **POST gibt `400 Invalid sender` zurück** – der `sender` Wert ist keine registrierte Sender-ID auf Ihrem Konto. Registrieren Sie es zuerst im Mobile Message-Dashboard.
- **Text kommt an, ist aber gekürzt** – Mobile Message teilt Nachrichten über ~160 Zeichen in mehrere Teile auf; Sie werden pro Teil berechnet. Überprüfen Sie den Response-Body – er teilt Ihnen die Teilanzahl mit.

## Siehe auch

- [Clearstream](./clearstream), [Text In Church](./text-in-church) – alternative SMS-Anbieter mit nativen Zapier-Apps (kein Webhooks-by-Zapier-Schritt erforderlich)
- [Zapier (Übersicht)](../zapier) – B1-Seite jedes Zapier-Rezepts
- [Mobile Message API-Dokumente](https://mobilemessage.com.au/api-documentation)
