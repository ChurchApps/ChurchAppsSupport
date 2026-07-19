---
title: "Webhooks"
---

# Webhooks

<div class="article-intro">

Webhooks erlauben es einer Kirche, Echtzeit-Benachrichtigungen an Tools von Drittanbietern zu senden — Automatisierungsplattformen (Zapier, Make, n8n), CRMs, Buchhaltungssysteme oder alles, was einen HTTP-POST akzeptiert. Wenn sich eine Person, Gruppe oder ein Haushalt in B1 ändert, sendet B1 an jede für dieses Ereignis abonnierte URL eine signierte JSON-Payload.

</div>

<div class="prereqs">
<h4>Bevor Sie beginnen</h4>

- Ein Kirchenadministrator mit der Berechtigung **Kirchen-Einstellungen bearbeiten** registriert und verwaltet Webhooks
- Ihr empfangender Endpunkt muss über **HTTPS** unter einer öffentlichen Adresse erreichbar sein
- Sie benötigen eine Möglichkeit, das Signing-Secret sicher zu speichern — es wird nur einmal angezeigt

</div>

## Übersicht

Webhooks sind ausschließlich **ausgehend**: B1 ruft Ihren Endpunkt auf, nicht umgekehrt. Jeder Webhook ist ein Abonnement pro Kirche, bestehend aus einer Ziel-URL, einem Signing-Secret und einer Liste abonnierter Ereignisse.

Die Zustellung nutzt eine **dauerhafte Outbox**: Tritt ein abonniertes Ereignis ein, verzeichnet B1 eine Zustellungszeile, und ein Hintergrund-Worker sendet innerhalb von etwa einer Minute einen POST. Fehlgeschlagene Zustellungen werden mit exponentiellem Backoff erneut versucht. Es geht nichts verloren, wenn eine Zustellung langsam ist oder Ihr Endpunkt kurzzeitig nicht erreichbar ist.

## Einen Webhook registrieren

### In B1Admin

Gehen Sie zu **Einstellungen → Entwickler → Webhooks → Neuer Webhook**. Geben Sie einen Namen und die Payload-URL ein und wählen Sie die zu abonnierenden Ereignisse aus. Beim Speichern wird das **Signing-Secret einmalig angezeigt** — kopieren Sie es sofort und speichern Sie es zusammen mit Ihrer Integration. Es wird nie wieder angezeigt (Sie können es später rotieren, aber das Original lässt sich nicht erneut abrufen).

### Über die API

Alle Endpunkte liegen unter dem Basispfad `/membership/webhooks` des Membership-Moduls und erfordern entweder ein JWT eines Kirchenadministrators mit der Berechtigung `Settings / Edit`, **oder einen [API-Schlüssel](./api-keys), der mit dem Scope `settings:write` ausgestellt wurde**. Dieselben Routen akzeptieren beides. Das ist es, was Zapier und Make erlaubt, im Namen der Kirche Webhooks zu registrieren, sobald ein Zap oder Szenario aktiviert wird.

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

Die Antwort auf die Erstellung — und **nur** diese — enthält das `secret`:

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
| `GET /membership/webhooks` | Die Webhooks der Kirche auflisten (Secret ausgelassen) |
| `GET /membership/webhooks/events` | Der Katalog gültiger Ereignisnamen |
| `GET /membership/webhooks/:id` | Einen Webhook laden |
| `POST /membership/webhooks` | Erstellen (ohne `id`) oder aktualisieren (mit `id`) |
| `POST /membership/webhooks/:id/regenerate-secret` | Das Signing-Secret rotieren; liefert den neuen Wert einmalig zurück |
| `DELETE /membership/webhooks/:id` | Einen Webhook löschen |
| `GET /membership/webhooks/:id/deliveries` | Letzte Zustellungsversuche für einen Webhook |
| `GET /membership/webhooks/deliveries/:deliveryId` | Vollständige Payload und Antwort für eine Zustellung |
| `POST /membership/webhooks/deliveries/:deliveryId/redeliver` | Eine Zustellung erneut einreihen |

## Ereigniskatalog

Ereignisnamen folgen dem Muster `{entity}.{action}`. Die aktuelle Liste erhalten Sie über `GET /membership/webhooks/events`.

| Ereignis | Löst aus, wenn |
|---|---|
| `person.created` | Eine Person hinzugefügt wird |
| `person.updated` | Ein Personendatensatz geändert wird |
| `person.destroyed` | Eine Person gelöscht wird |
| `household.created` | Ein Haushalt hinzugefügt wird |
| `household.updated` | Ein Haushalt geändert wird |
| `household.destroyed` | Ein Haushalt gelöscht wird |
| `group.created` | Eine Gruppe hinzugefügt wird |
| `group.updated` | Eine Gruppe geändert wird |
| `group.destroyed` | Eine Gruppe gelöscht wird |
| `group.member.added` | Eine Person zu einer Gruppe hinzugefügt wird |
| `group.member.removed` | Eine Person aus einer Gruppe entfernt wird |
| `donation.created` | Eine Gabe erfasst wird — manuelle Eingabe, online oder der Übergang von ausstehend zu abgeschlossen |
| `donation.updated` | Ein Spendendatensatz bearbeitet wird |
| `attendance.recorded` | Ein Besuch protokolliert wird (manuelle Eingabe oder Check-in) |
| `session.created` | Eine neue Anwesenheits-Session erstellt wird (manuell oder automatisch beim ersten Check-in) |
| `form.submission.created` | Ein Formular übermittelt wird |
| `event.created` | Ein Kalendertermin hinzugefügt wird |
| `event.updated` | Ein Kalendertermin bearbeitet wird |
| `event.destroyed` | Ein Kalendertermin gelöscht wird |

## Payload-Format

Jede Zustellung ist ein HTTP-`POST` mit einem JSON-Body und folgenden Headern:

| Header | Beschreibung |
|---|---|
| `Content-Type` | Immer `application/json` |
| `X-B1-Event` | Der Ereignisname, z. B. `person.created` |
| `X-B1-Delivery-Id` | Eindeutige ID für diesen Zustellungsversuch — zum Deduplizieren verwenden |
| `X-B1-Signature` | HMAC-SHA256-Signatur des rohen Body (siehe unten) |
| `X-B1-Timestamp` | Unix-Epoch-Sekunden zum Zeitpunkt des Sendens der Anfrage |
| `User-Agent` | `B1-Webhooks/1.0` |

Der Body umhüllt die geänderte Ressource in einer kleinen Umschlagstruktur:

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

Bei `*.destroyed`-Ereignissen enthält `data` nur die `id` und `churchId` des gelöschten Datensatzes.

Ereignisse, deren Payloads andere Datensätze per ID referenzieren, tragen zusätzlich lesbare Namen, die zum Zustellungszeitpunkt aufgelöst werden: `personName` und `groupName` bei den Gruppenmitgliedschafts-Ereignissen, `personName` bei Anwesenheits-, Spenden- und Listenmitgliedschafts-Ereignissen, `groupName` bei `session.created` sowie `formName` (plus `personName`, wenn die Übermittlung an eine Person gebunden ist) bei `form.submission.created`.

## Connector-Typen

Das Standard-Zustellformat ist die obige JSON-Umschlagstruktur — `connectorType: "standard"`. Für [Slack und Discord](/docs/b1-admin/integrations/slack-discord) postet dieselbe Webhook-Engine stattdessen eine chat-förmige Nachricht, die diese Dienste direkt akzeptieren:

| `connectorType` | Gesendeter Body | Verwenden, wenn |
|---|---|---|
| `"standard"` (Standard) | Signierte Umschlagstruktur `{event, churchId, occurredAt, data}` | Sie Ihre eigene Integration schreiben oder auf Zapier / Make / einen eigenen Server zeigen |
| `"slack"` | `{ "text": "💝 New donation: $50.00" }` | Sie direkt an eine Slack-Incoming-Webhook-URL posten |
| `"discord"` | `{ "content": "💝 New donation: $50.00" }` | Sie direkt an eine Discord-Kanal-Webhook-URL posten |

Der Connector-Typ wird im Dropdown **Connector Type** im Webhook-Editor gesetzt, oder über `connectorType` im Body von `POST /membership/webhooks`. Der signierte `X-B1-Signature`-Header wird bei Slack-/Discord-Zustellungen weiterhin gesendet (sie ignorieren ihn folgenlos), sodass das spätere Zurückschalten eines Webhooks auf `standard` kein erneutes Signieren erfordert.

## Testzustellungen

Jeder Webhook-Editor besitzt eine Schaltfläche **Send Test Event** — der entsprechende API-Aufruf ist `POST /membership/webhooks/:id/test`. Die Test-Route baut eine synthetische Payload für das erste abonnierte Ereignis, versendet sie synchron über den echten signierten Zustellpfad (und über `formatForConnector` bei Slack/Discord) und liefert die resultierende Zustellungszeile inklusive `responseStatus` und `responseBody` zurück. Nutzen Sie sie, um Konnektivität und Signaturprüfung zu bestätigen, bevor Sie die Integration produktiv schalten.

## Signaturen prüfen

Verifizieren Sie `X-B1-Signature` immer, bevor Sie einer Payload vertrauen. Die Signatur ist `sha256=` gefolgt vom hexadezimalen HMAC-SHA256 des **rohen Anfrage-Body**, geschlüsselt mit Ihrem Signing-Secret. Berechnen Sie sie über die empfangenen Bytes — serialisieren Sie das geparste JSON nicht neu.

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

Lehnen Sie jede Anfrage ab, deren Signatur nicht übereinstimmt. Optional können Sie auch Anfragen ablehnen, deren `X-B1-Timestamp` älter als wenige Minuten ist, um das Replay-Zeitfenster zu begrenzen.

## SDK-Unterstützung

Für Node.js liefert `@churchapps/integration-sdk` einen typisierten Verifier sowie eine Express-Middleware, die die Erfassung des rohen Body, die Signaturprüfung und das Parsen der Umschlagstruktur für Sie übernimmt:

```ts
import express from "express";
import { b1WebhookMiddleware } from "@churchapps/integration-sdk";

const app = express();
// Capture the raw body before JSON parsing — required so the signature still verifies.
app.use(express.json({ verify: (req, _res, buf) => { (req as any).rawBody = buf; } }));

app.post("/webhooks/b1", b1WebhookMiddleware({ secret: process.env.B1_WEBHOOK_SECRET! }), (req, res) => {
  const env = req.b1Webhook!;
  switch (env.event) {
    case "donation.created": console.log("new gift", env.data.amount); break;
  }
  res.sendStatus(200);
});
```

Das SDK stellt außerdem `WebhookVerifier.verify(secret, rawBody, signatureHeader)` für Nicht-Express-Laufzeitumgebungen bereit (Serverless-Funktionen, Fastify usw.). Siehe das Paket auf npm.

## Zustellung & Wiederholungen

Ihr Endpunkt sollte so schnell wie möglich mit einem `2xx`-Status antworten — idealerweise nachdem die Arbeit nur eingereiht, nicht bereits verarbeitet wurde. Jede Nicht-`2xx`-Antwort, ein Verbindungsfehler oder eine Antwort langsamer als **10 Sekunden** zählt als fehlgeschlagene Zustellung.

Fehlgeschlagene Zustellungen werden mit exponentiellem Backoff erneut versucht — **16 Versuche über rund 5 Tage**. Das Intervall wächst von 1 Minute über Stunden bis hin zu 3-Tage-Lücken bei den letzten Versuchen. Nach dem 16. fehlgeschlagenen Versuch wird die Zustellung als `exhausted` markiert und aufgegeben.

Die Zustellung erfolgt **mindestens einmal**: Eine Zustellung kann mehr als einmal ankommen (zum Beispiel, wenn Ihr Endpunkt erfolgreich verarbeitet, die Antwort aber verloren geht). Nutzen Sie den Header `X-B1-Delivery-Id` zum Deduplizieren — verarbeiten Sie jede ID nur einmal und behandeln Sie Wiederholungen als No-ops.

### Automatische Deaktivierung

Erzeugt ein Webhook **drei aufeinanderfolgende erschöpfte Zustellungen**, deaktiviert B1 ihn automatisch. Beheben Sie das Problem an Ihrem Endpunkt und aktivieren Sie den Webhook anschließend in B1Admin erneut (oder über `POST /membership/webhooks` mit `"active": true`).

## Prüfen & erneut zustellen

Der Webhook-Editor in B1Admin zeigt eine Tabelle **Recent Deliveries** — Ereignis, Status, Versuchsanzahl, Antwortcode und Zeitstempel. Die Auswahl einer Zeile zeigt die vollständige gesendete Payload sowie die zurückgekommene Antwort.

Nutzen Sie **Redeliver**, um jede vergangene Zustellung mit ihrer ursprünglichen Payload erneut einzureihen — hilfreich, nachdem ein Fehler in Ihrem Endpunkt behoben wurde, oder um Ereignisse nachzuliefern, die Ihr Endpunkt während einer Ausfallzeit verpasst hat.

## Anforderungen an die URL

Da Webhook-URLs von der Kirche bereitgestellt werden, setzt B1 Schutzmaßnahmen gegen Server-Side Request Forgery durch. Eine Webhook-URL wird abgelehnt — bei der Registrierung und erneut vor jeder Zustellung geprüft —, wenn sie:

- kein **`https`** verwendet
- auf `localhost`, einen `.local`-/`.internal`-Hostnamen zeigt, oder
- zu einer **privaten, Loopback-, Link-Local- oder Cloud-Metadaten**-IP-Adresse auflöst

Ihr Endpunkt muss ein öffentlich erreichbarer HTTPS-Dienst sein.
