---
title: "Mobile Message"
description: "Verbinden Sie Ereignisse aus B1 Admin über Zapier- oder Make-Webhooks mit Mobile Message, einer australischen SMS-API, um Willkommens-, Spenden- und Erinnerungs-SMS zu versenden."
---

# Mobile Message

<div class="article-intro">

[Mobile Message](https://mobilemessage.com.au) ist eine australische SMS-API – bei Gemeinden in Australien beliebt, weil sie lokale Rufnummern und wettbewerbsfähige Preise für Australien bietet, während Clearstream und Text In Church stärker auf die USA ausgerichtet sind. Mobile Message hat heute keine eigenständige Zapier-App, veröffentlicht aber eine öffentliche REST-API. Daher können Sie B1-Ereignisse über **Webhooks by Zapier** (oder das HTTP-Modul von Make) in wenigen Minuten mit SMS von Mobile Message verbinden.

</div>

<div class="prereqs">
<h4>Bevor Sie beginnen</h4>

- Ein [Mobile Message](https://mobilemessage.com.au)-Konto mit einer registrierten Absender-ID und API-Zugangsdaten (API-Benutzername + Passwort unter *Konto → API-Einstellungen*)
- Ein [Zapier](https://zapier.com)-Konto (oder [Make](https://www.make.com))
- Ein B1Admin-Benutzer mit der Berechtigung **Einstellungen bearbeiten**

</div>

## Was Sie verbinden können {#what-you-can-wire-up}

Die API von Mobile Message dient dem Versand von SMS – es gibt keine Auslöser, nur ausgehende Nachrichten. Daher sind alle Rezepte von B1 → SMS:

| Richtung | Auslöser in B1 | Ergebnis |
|---|---|---|
| B1 → Mobile Message | `person.created` | Willkommens-SMS an die neue Person |
| B1 → Mobile Message | `donation.created` | Dank-SMS an den Spender |
| B1 → Mobile Message | `form.submission.created` | Den diensthabenden Teams eine Nachricht schicken |
| B1 → Mobile Message | `event.created` | Erinnerungs-Rundnachricht an eine Liste |

## Einrichtung {#setup}

### 1. Einen B1-API-Schlüssel erstellen {#1-mint-a-b1-api-key}

**Einstellungen → Entwickler → API-Schlüssel → Neuer API-Schlüssel**:

- `settings:write` – damit der Auslöser-Webhook registriert werden kann
- `people:read` – um die Telefonnummer des Empfängers anhand einer `personId` nachzuschlagen

### 2. Den Zap mit Webhooks by Zapier erstellen {#2-build-the-zap-with-webhooks-by-zapier}

1. **Auslöser** – B1.church: Wählen Sie das gewünschte Ereignis (z. B. Neue Spende).
2. **Aktion** – B1.church: Person suchen (mit `data.personId`), um Telefonnummer und Namen zu erhalten.
3. **Aktion** – Webhooks by Zapier: **POST**. Konfigurieren Sie wie unten beschrieben.

Die Einstellungen des POST-Schritts:

- **URL** – `https://api.mobilemessage.com.au/v1/messages`
- **Nutzlast-Typ** – JSON
- **Daten** –
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
- **Header** – `Content-Type: application/json` (Webhooks by Zapier fügt dies automatisch hinzu)
- **Basisauthentifizierung** – tragen Sie im Feld *Basic Auth* `<api_username>|<api_password>` ein (Zapier wandelt dies in den richtigen Header `Authorization: Basic …` um)

Schalten Sie den Zap ein. Senden Sie in B1Admin eine Test-Spende, um zu prüfen, ob eine SMS ankommt.

## Häufige Rezepte {#common-recipes}

### Ereigniserinnerungen am Morgen des Termins {#event-reminders-the-morning-of}

- **Auslöser** – Schedule by Zapier (täglich, 7 Uhr)
- **Aktion** – Halten Sie die heutige Veranstaltungsliste in einer Google Tabelle (oder einer anderen App, die Zapier lesen kann) und suchen Sie die heutigen Zeilen – die Zapier-App von B1 hat keine Aktion zum Finden von Veranstaltungen
- **Aktion** – Webhooks by Zapier: POST an Mobile Message mit der Veranstaltungsliste an eine registrierte Empfängergruppe

### Den Batch-Endpunkt für eine Listen-Rundnachricht nutzen {#use-the-batch-endpoint-for-a-list-broadcast}

Der Endpunkt `/v1/messages` von Mobile Message nimmt pro Aufruf bis zu 10.000 Nachrichten entgegen. Um an eine Gruppe in B1 zu senden:

- **Auslöser** – B1.church: Neue Formular-Einsendung (auf ein bestimmtes Formular gefiltert)
- **Aktion** – Webhooks by Zapier: GET `/membership/groupmembers?groupId=…`, um die Mitglieder der Zielgruppe aufzulisten (die Zapier-App von B1 hat dafür keine Listenaktion; senden Sie den API-Schlüssel als Header `Authorization: Bearer cak_…`)
- **Aktion** – Formatter by Zapier → Utilities → Line-itemize: Antwort in ein Array `messages` umwandeln
- **Aktion** – Webhooks by Zapier: das vollständige Array per POST an `/v1/messages` senden

### Alternative mit Make {#make-alternative}

Wenn Sie Make bevorzugen, fügen Sie nach dem Auslöser „Ereignisse beobachten“ von B1 das Modul **HTTP – Anfrage senden** hinzu und konfigurieren Sie es genauso (POST, Basic Auth, JSON-Body). Den B1-Teil erläutert die [Make-Übersicht](../make.md) – beachten Sie, dass die Make-App für B1.church noch nicht veröffentlicht ist.

## Einschränkungen und Hinweise {#limits--notes}

- **Basic Auth ist die einzige Authentifizierungsmethode** – Mobile Message stellt im Dashboard einen Benutzernamen und ein Passwort aus. Behandeln Sie beides wie Geheimnisse.
- **`sender` muss eine registrierte Absender-ID** in Ihrem Mobile-Message-Konto sein, sonst liefert der Versand `400 Invalid sender`. Die Vorschriften in Australien verlangen eine Registrierung des Absenders.
- **Australische Telefonnummern** können als `0412345678` (national) oder `+61412345678` (international) angegeben werden. Die API akzeptiert beides; vereinheitlichen Sie auf `+61…`, wenn Sie auch ins Ausland senden.
- **Bis zu 10.000 Nachrichten pro Anfrage** – nützlich für Rundnachrichten, doch eine einzelne Webhook-Zustellung von B1 wird selten eine so große Liste erzeugen; nutzen Sie den Batch-Endpunkt für geplante Massen-Zaps.

## Fehlerbehebung {#troubleshooting}

- **POST liefert `401 Unauthorized`** – die Basic-Auth-Zugangsdaten sind falsch. Kopieren Sie sie erneut aus dem Dashboard von Mobile Message unter *Konto → API-Einstellungen*. Beachten Sie, dass der Benutzername standardmäßig Ihre Konto-E-Mail-Adresse ist und kein eigener API-Schlüssel.
- **POST liefert `400 Invalid sender`** – der Wert von `sender` ist keine registrierte Absender-ID in Ihrem Konto. Registrieren Sie ihn zuerst im Dashboard von Mobile Message.
- **Die SMS kommt an, ist aber abgeschnitten** – Mobile Message teilt Nachrichten über etwa 160 Zeichen in mehrere Teile auf; abgerechnet wird pro Teil. Prüfen Sie den Antworttext – er nennt Ihnen die Anzahl der Teile.

## Siehe auch {#see-also}

- [Clearstream](./clearstream.md), [Text In Church](./text-in-church.md) – alternative SMS-Anbieter mit eigenen Zapier-Apps (kein Schritt Webhooks by Zapier nötig)
- [Zapier (Überblick)](../zapier.md) – die B1-Seite jedes Zapier-Rezepts
- [Dokumentation der API von Mobile Message](https://mobilemessage.com.au/api-documentation)
