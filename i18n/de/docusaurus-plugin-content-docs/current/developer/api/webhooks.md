---
title: "Webhooks"
---

# Webhooks

<div class="article-intro">

Mit Webhooks kann eine Kirche Echtzeit-Benachrichtigungen an Drittanbieter-Tools pushen -- Automatisierungsplattformen (Zapier, Make, n8n), CRMs, Buchhaltungssysteme oder alles, das einen HTTP-POST akzeptiert. Wenn sich eine Person, Gruppe oder ein Haushalt in B1 ändert, sendet B1 eine signierte JSON-Nutzlast an jede URL, die für dieses Ereignis abonniert ist.

</div>

<div class="prereqs">
<h4>Bevor Sie beginnen</h4>

- Ein Kirchenadmin mit der Berechtigung **Einstellungen bearbeiten** registriert und verwaltet Webhooks
- Ihr Empfangsendpunkt muss unter **HTTPS** unter einer öffentlichen Adresse erreichbar sein
- Haben Sie eine Möglichkeit, das Signier-Geheimnis sicher zu speichern -- es wird nur einmal angezeigt

</div>

## Übersicht

Webhooks sind **nur ausgehend**: B1 ruft Ihren Endpunkt auf, Sie rufen nicht B1 auf. Jeder Webhook ist ein kirchenspezifisches Abonnement, das aus einer Ziel-URL, einem Signier-Geheimnis und einer Liste abonnierter Ereignisse besteht.

Die Zustellung erfolgt über einen **dauerhaften Postausgang**: Wenn ein abonniertes Ereignis eintritt, speichert B1 eine Zustellungszeile auf und ein Hintergrund-Worker POSTs sie innerhalb von etwa einer Minute. Fehlgeschlagene Zustellungen werden mit exponentiellem Backoff erneut versucht. Nichts geht verloren, wenn eine Zustellung langsam ist oder Ihr Endpunkt vorübergehend ausfällt.

## Registrieren eines Webhooks

### In B1Admin

Gehen Sie zu **Einstellungen → Webhooks → Neuer Webhook**. Geben Sie einen Namen, die Payload-URL ein und wählen Sie die Ereignisse aus, die Sie abonnieren möchten. Beim Speichern wird das **Signier-Geheimnis einmalig angezeigt** -- kopieren Sie es sofort und speichern Sie es mit Ihrer Integration. Es wird nie wieder angezeigt (Sie können es später rotieren, aber Sie können das Original nicht abrufen).

### Via API

Alle Endpunkte befinden sich unter dem Mitgliedschaftsmodul-Basispfad `/membership/webhooks` und erfordern entweder einen JWT von einem Kirchenadmin mit der Berechtigung `Einstellungen / Bearbeiten` **oder einen [API-Schlüssel](./api-keys) mit Umfang `settings:write`**. Die gleichen Routen akzeptieren beide. Dies ermöglicht es Zapier und Make, Webhooks im Namen der Kirche zu registrieren, wenn ein Zap oder ein Szenario aktiviert wird.

```http
POST /membership/webhooks
Authorization: Bearer <jwt>
Content-Type: application/json

{
  "name": "Zapier — neue Mitglieder",
  "url": "https://hooks.zapier.com/hooks/catch/123/abc",
  "events": ["person.created", "person.updated", "group.member.added"]
}
```

Die Erstellungsantwort -- **und nur** die Erstellungsantwort -- enthält das `Geheimnis`:

```json
{
  "id": "a1b2c3d4e5f",
  "name": "Zapier — neue Mitglieder",
  "url": "https://hooks.zapier.com/hooks/catch/123/abc",
  "events": ["person.created", "person.updated", "group.member.added"],
  "active": true,
  "secret": "9f86d081884c7d659a2feaa0c55ad015a3bf4f1b2b0b822c"
}
```

| Methode & Pfad | Zweck |
|---|---|
| `GET /membership/webhooks` | Webhooks der Kirche auflisten (Geheimnis weggelassen) |
| `GET /membership/webhooks/events` | Der Katalog gültiger Ereignisnamen |
| `GET /membership/webhooks/:id` | Einen Webhook laden |
| `POST /membership/webhooks` | Erstellen (ohne `id`) oder aktualisieren (mit `id`) |
| `POST /membership/webhooks/:id/regenerate-secret` | Signier-Geheimnis rotieren; gibt den neuen Wert einmal zurück |
| `DELETE /membership/webhooks/:id` | Webhook löschen |
| `GET /membership/webhooks/:id/deliveries` | Aktuelle Zustellungsversuche für einen Webhook |
| `GET /membership/webhooks/deliveries/:deliveryId` | Vollständige Nutzlast und Antwort für eine Zustellung |
| `POST /membership/webhooks/deliveries/:deliveryId/redeliver` | Eine Zustellung erneut in die Warteschlange stellen |

## Ereigniskatalog

Ereignisnamen folgen dem Muster `{Entität}.{Aktion}`. Abrufen der Live-Liste aus `GET /membership/webhooks/events`.

| Ereignis | Wird ausgelöst, wenn |
|---|---|
| `person.created` | Eine Person wird hinzugefügt |
| `person.updated` | Ein Personeneintrag wird geändert |
| `person.destroyed` | Eine Person wird gelöscht |
| `household.created` | Ein Haushalt wird hinzugefügt |
| `household.updated` | Ein Haushalt wird geändert |
| `household.destroyed` | Ein Haushalt wird gelöscht |
| `group.created` | Eine Gruppe wird hinzugefügt |
| `group.updated` | Eine Gruppe wird geändert |
| `group.destroyed` | Eine Gruppe wird gelöscht |
| `group.member.added` | Eine Person wird einer Gruppe hinzugefügt |
| `group.member.removed` | Eine Person wird aus einer Gruppe entfernt |
| `donation.created` | Ein Geschenk wird aufgezeichnet |
| `donation.updated` | Ein Spendeneintrag wird bearbeitet |
| `attendance.recorded` | Ein Besuch wird protokolliert |
| `session.created` | Eine neue Anwesenheitssitzung wird erstellt |
| `form.submission.created` | Ein Formular wird eingereicht |
| `event.created` | Ein Kalenderereignis wird hinzugefügt |
| `event.updated` | Ein Kalenderereignis wird bearbeitet |
| `event.destroyed` | Ein Kalenderereignis wird gelöscht |

## Payload-Format

Jede Zustellung ist ein HTTP `POST` mit einem JSON-Text und folgenden Headern:

| Header | Beschreibung |
|---|---|
| `Content-Type` | Immer `application/json` |
| `X-B1-Event` | Der Ereignisname, z.B. `person.created` |
| `X-B1-Delivery-Id` | Eindeutige ID für diesen Zustellungsversuch |
| `X-B1-Signature` | HMAC-SHA256-Signatur des Rohtext |
| `X-B1-Timestamp` | Unix-Epoch-Sekunden, wenn die Anfrage gesendet wurde |
| `User-Agent` | `B1-Webhooks/1.0` |

Der Text umhüllt die geänderte Ressource in einer kleinen Hülle:

```json
{
  "event": "person.created",
  "churchId": "AbC123XyZ90",
  "occurredAt": "2026-05-17T14:32:08.114Z",
  "data": {
    "id": "Pq7Rs2Tu4Vw",
    "churchId": "AbC123XyZ90",
    "name": { "display": "Jordan Rivera", "first": "Jordan", "last": "Rivera" },
    "contactInfo": { "email": "jordan@example.com" }
  }
}
```

Für `*.destroyed`-Ereignisse enthält `data` nur die `id` und `churchId` des gelöschten Datensatzes.

## Connector-Typen

Das Standard-Zustellungsformat ist die oben beschriebene JSON-Hülle -- `connectorType: "standard"`. Für Slack und Discord postet die gleiche Webhook-Engine stattdessen eine Chat-geformte Nachricht, die diese Dienste direkt akzeptieren:

| `connectorType` | Gesendeter Text | Verwenden Sie, wenn |
|---|---|---|
| `"standard"` (Standard) | `{event, churchId, occurredAt, data}` Hülle, signiert | Sie schreiben Ihre eigene Integration oder zeigen auf Zapier / Make / einen benutzerdefinierten Server |
| `"slack"` | `{ "text": "💝 Neue Spende: $50,00" }` | Sie posten direkt auf eine Slack-Incoming-Webhook-URL |
| `"discord"` | `{ "content": "💝 Neue Spende: $50,00" }` | Sie posten direkt auf einen Discord-Kanal-Webhook |

## Test-Zustellungen

Jeder Webhook-Editor hat eine Schaltfläche **Test-Ereignis senden** -- der entsprechende API-Aufruf ist `POST /membership/webhooks/:id/test`.

## Signaturen überprüfen

Überprüfen Sie immer `X-B1-Signature`, bevor Sie einer Nutzlast vertrauen.

**Node.js**

```js
const crypto = require("crypto");

function isValid(rawBody, signatureHeader, secret) {
  const expected = "sha256=" + crypto.createHmac("sha256", secret).update(rawBody, "utf8").digest("hex");
  const a = Buffer.from(expected);
  const b = Buffer.from(signatureHeader || "");
  return a.length === b.length && crypto.timingSafeEqual(a, b);
}
```

**Python**

```python
import hashlib, hmac

def is_valid(raw_body: bytes, signature_header: str, secret: str) -> bool:
    expected = "sha256=" + hmac.new(secret.encode(), raw_body, hashlib.sha256).hexdigest()
    return hmac.compare_digest(expected, signature_header or "")
```

**PHP**

```php
function isValid(string $rawBody, string $signatureHeader, string $secret): bool {
    $expected = "sha256=" . hash_hmac("sha256", $rawBody, $secret);
    return hash_equals($expected, $signatureHeader ?? "");
}
```

## SDK-Unterstützung

Für Node.js enthält `@churchapps/integration-sdk` einen typisierten Verifizierer und eine Express-Middleware.

## Zustellung & Wiederholungen

Ihr Endpunkt sollte so schnell wie möglich mit einem `2xx`-Status antworten.

Fehlgeschlagene Zustellungen werden mit exponentiellem Backoff erneut versucht -- **16 Versuche über etwa 5 Tage**.

Die Zustellung ist **mindestens einmal**: Eine Zustellung kann mehr als einmal ankommen. Verwenden Sie den Header `X-B1-Delivery-Id` zur Deduplizierung.

## Inspizieren und Erneut Zustellung

Der Webhook-Editor in B1Admin zeigt eine Tabelle **Aktuelle Zustellungen**.

## URL-Anforderungen

Ihr Endpunkt muss ein öffentlich erreichbarer HTTPS-Service sein.
