---
title: "Webhooks"
---

# Webhooks

<div class="article-intro">

Webhooks ermöglichen es einer Kirche, Echtzeit-Benachrichtigungen an Drittanbieter-Tools zu senden — Automatisierungsplattformen (Zapier, Make, n8n), CRMs, Buchhaltungssysteme oder alles, was einen HTTP-POST akzeptiert. Wenn sich eine Person, Gruppe oder ein Haushalt in B1 ändert, sendet B1 eine signierte JSON-Payload an jede URL, die dieses Ereignis abonniert hat.

</div>

<div class="prereqs">
<h4>Bevor Sie beginnen</h4>

- Ein Kirchenadministrator mit der Berechtigung **Kircheneinstellungen bearbeiten** registriert und verwaltet Webhooks
- Ihr empfangender Endpunkt muss über **HTTPS** unter einer öffentlichen Adresse erreichbar sein
- Halten Sie eine Möglichkeit bereit, das Signing Secret sicher zu speichern — es wird nur einmal angezeigt

</div>

## Überblick

Webhooks sind ausschließlich **ausgehend**: B1 ruft Ihren Endpunkt auf, Sie rufen nicht B1 auf. Jeder Webhook ist ein Abonnement pro Kirche, bestehend aus einer Ziel-URL, einem Signing Secret und einer Liste abonnierter Ereignisse.

Die Zustellung nutzt eine **dauerhafte Outbox**: Wenn ein abonniertes Ereignis eintritt, zeichnet B1 eine Zustellzeile auf, und ein Hintergrundprozess sendet den POST innerhalb von etwa einer Minute. Fehlgeschlagene Zustellungen werden mit exponentiellem Backoff wiederholt. Nichts geht verloren, wenn eine Zustellung langsam ist oder Ihr Endpunkt kurzzeitig nicht erreichbar ist.

## Einen Webhook registrieren

### In B1Admin

Gehen Sie zu **Einstellungen → Entwickler → Webhooks → Neuer Webhook**. Geben Sie einen Namen, die Payload-URL ein und wählen Sie die zu abonnierenden Ereignisse aus. Beim Speichern wird das **Signing Secret einmalig angezeigt** — kopieren Sie es sofort und speichern Sie es zusammen mit Ihrer Integration. Es wird nie wieder angezeigt (Sie können es später rotieren, aber das Original nicht erneut abrufen).

### Über die API

Alle Endpunkte liegen unter dem Basis-Pfad `/membership/webhooks` des Membership-Moduls und erfordern entweder ein JWT eines Kirchenadministrators mit der Berechtigung `Settings / Edit`, **oder einen [API-Schlüssel](./api-keys) mit dem Scope `settings:write`**. Dieselben Routen akzeptieren beides. Das ermöglicht es Zapier und Make, im Namen der Kirche Webhooks zu registrieren, wenn ein Zap oder ein Szenario aktiviert wird.

```http
POST /membership/webhooks
Authorization: Bearer <jwt>
Content-Type: application/json

{
  "name": "Zapier — new members",
  "url": "https://hooks.zapier.com/hooks/catch/123/abc",
  "events": ["person.created", "person.updated", "group.member.added"]
}
```

Die Erstellungsantwort — und **nur** die Erstellungsantwort — enthält das `secret`:

```json
{
  "id": "a1b2c3d4e5f",
  "name": "Zapier — new members",
  "url": "https://hooks.zapier.com/hooks/catch/123/abc",
  "events": ["person.created", "person.updated", "group.member.added"],
  "active": true,
  "secret": "9f86d081884c7d659a2feaa0c55ad015a3bf4f1b2b0b822c"
}
```

| Methode & Pfad | Zweck |
|---|---|
| `GET /membership/webhooks` | Listet die Webhooks der Kirche auf (Secret ausgelassen) |
| `GET /membership/webhooks/events` | Der Katalog gültiger Ereignisnamen |
| `GET /membership/webhooks/:id` | Lädt einen Webhook |
| `POST /membership/webhooks` | Erstellt (ohne `id`) oder aktualisiert (mit `id`) |
| `POST /membership/webhooks/:id/regenerate-secret` | Rotiert das Signing Secret; gibt den neuen Wert einmalig zurück |
| `DELETE /membership/webhooks/:id` | Löscht einen Webhook |
| `GET /membership/webhooks/:id/deliveries` | Letzte Zustellversuche für einen Webhook |
| `GET /membership/webhooks/deliveries/:deliveryId` | Vollständige Payload und Antwort für eine Zustellung |
| `POST /membership/webhooks/deliveries/:deliveryId/redeliver` | Reiht eine Zustellung erneut in die Warteschlange ein |

## Ereigniskatalog

Ereignisnamen folgen dem Muster `{entity}.{action}`. Rufen Sie die aktuelle Liste über `GET /membership/webhooks/events` ab.

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
| `donation.created` | Eine Spende erfasst wird — manuelle Eingabe, online oder der Übergang von pending zu complete |
| `donation.updated` | Ein Spendendatensatz bearbeitet wird |
| `attendance.recorded` | Ein Besuch protokolliert wird (manuelle Eingabe oder Check-in) |
| `session.created` | Eine neue Anwesenheits-Sitzung erstellt wird (manuell oder automatisch beim ersten Check-in) |
| `form.submission.created` | Ein Formular übermittelt wird |
| `event.created` | Ein Kalenderereignis hinzugefügt wird |
| `event.updated` | Ein Kalenderereignis bearbeitet wird |
| `event.destroyed` | Ein Kalenderereignis gelöscht wird |

## Payload-Format

Jede Zustellung ist ein HTTP-`POST` mit einem JSON-Body und folgenden Headern:

| Header | Beschreibung |
|---|---|
| `Content-Type` | Immer `application/json` |
| `X-B1-Event` | Der Ereignisname, z. B. `person.created` |
| `X-B1-Delivery-Id` | Eindeutige ID für diesen Zustellversuch — zur Deduplizierung verwenden |
| `X-B1-Signature` | HMAC-SHA256-Signatur des Roh-Bodys (siehe unten) |
| `X-B1-Timestamp` | Unix-Epoch-Sekunden zum Zeitpunkt des Sendens der Anfrage |
| `User-Agent` | `B1-Webhooks/1.0` |

Der Body umschließt die geänderte Ressource in einem kleinen Umschlag:

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

Ereignisse, deren Payloads andere Datensätze per ID referenzieren, führen zusätzlich lesbare Namen mit, die zum Zeitpunkt der Zustellung aufgelöst werden: `personName` und `groupName` bei den Gruppenmitgliedschafts-Ereignissen, `personName` bei Anwesenheits-, Spenden- und Listenmitgliedschafts-Ereignissen, `groupName` bei `session.created` sowie `formName` (plus `personName`, wenn die Übermittlung mit einer Person verknüpft ist) bei `form.submission.created`.

## Connector-Typen

Das Standard-Zustellformat ist der oben beschriebene JSON-Umschlag — `connectorType: "standard"`. Für [Slack und Discord](/docs/b1-admin/integrations/slack-discord) postet dieselbe Webhook-Engine stattdessen eine chat-förmige Nachricht, die diese Dienste direkt akzeptieren:

| `connectorType` | Gesendeter Body | Verwenden, wenn |
|---|---|---|
| `"standard"` (Standard) | Signierter Umschlag `{event, churchId, occurredAt, data}` | Sie eine eigene Integration schreiben oder auf Zapier / Make / einen eigenen Server zeigen |
| `"slack"` | `{ "text": "💝 New donation: $50.00" }` | Sie direkt an eine Slack-Incoming-Webhook-URL posten |
| `"discord"` | `{ "content": "💝 New donation: $50.00" }` | Sie direkt an eine Discord-Kanal-Webhook-URL posten |

Der Connector-Typ wird im Dropdown **Connector-Typ** im Webhook-Editor festgelegt, oder über `connectorType` im Body von `POST /membership/webhooks`. Der signierte Header `X-B1-Signature` wird auch für Slack/Discord-Zustellungen weiterhin gesendet (sie ignorieren ihn folgenlos), sodass ein späteres Zurückschalten eines Webhooks auf `standard` kein erneutes Signieren erfordert.

## Test-Zustellungen

Jeder Webhook-Editor besitzt eine Schaltfläche **Testereignis senden** — der entsprechende API-Aufruf ist `POST /membership/webhooks/:id/test`. Die Test-Route erstellt eine synthetische Payload für das erste abonnierte Ereignis, versendet sie synchron über den echten, signierten Zustellpfad (und über `formatForConnector` für Slack/Discord) und gibt die resultierende Zustellzeile einschließlich `responseStatus` und `responseBody` zurück. Nutzen Sie dies, um Konnektivität und Signaturbehandlung zu bestätigen, bevor Sie die Integration produktiv einschalten.

## Signaturen überprüfen

Überprüfen Sie immer `X-B1-Signature`, bevor Sie einer Payload vertrauen. Die Signatur ist `sha256=` gefolgt vom Hex-HMAC-SHA256 des **rohen Anfrage-Bodys**, geschlüsselt mit Ihrem Signing Secret. Berechnen Sie sie über die empfangenen Bytes — serialisieren Sie das geparste JSON nicht erneut.

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

Weisen Sie jede Anfrage zurück, deren Signatur nicht übereinstimmt. Optional können Sie auch Anfragen zurückweisen, deren `X-B1-Timestamp` mehr als ein paar Minuten alt ist, um Replay-Fenster zu begrenzen.

## SDK-Unterstützung

Für Node.js liefert `@churchapps/integration-sdk` einen typisierten Verifier und eine Express-Middleware, die die Erfassung des Roh-Bodys, die Signaturprüfung und das Parsen des Umschlags für Sie übernimmt:

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

Das SDK stellt außerdem `WebhookVerifier.verify(secret, rawBody, signatureHeader)` für Nicht-Express-Laufzeiten bereit (Serverless-Funktionen, Fastify usw.). Siehe das Paket auf npm.

## Zustellung & Wiederholungsversuche

Ihr Endpunkt sollte so schnell wie möglich mit einem `2xx`-Status antworten — idealerweise nachdem die Arbeit nur in eine Warteschlange eingereiht wurde, nicht nachdem sie verarbeitet wurde. Jede Nicht-`2xx`-Antwort, ein Verbindungsfehler oder eine Antwort langsamer als **10 Sekunden** zählt als fehlgeschlagene Zustellung.

Fehlgeschlagene Zustellungen werden mit exponentiellem Backoff wiederholt — **16 Versuche über etwa 5 Tage**. Das Intervall wächst von 1 Minute über mehrere Stunden bis zu 3-tägigen Abständen für die letzten Versuche. Nach dem 16. fehlgeschlagenen Versuch wird die Zustellung als `exhausted` markiert und aufgegeben.

Die Zustellung erfolgt **mindestens einmal**: Eine Zustellung kann mehr als einmal eintreffen (zum Beispiel, wenn Ihr Endpunkt erfolgreich ist, die Antwort aber verloren geht). Verwenden Sie den Header `X-B1-Delivery-Id` zur Deduplizierung — verarbeiten Sie jede ID nur einmal und behandeln Sie Wiederholungen als No-ops.

### Automatische Deaktivierung

Wenn ein Webhook **drei aufeinanderfolgende erschöpfte Zustellungen** produziert, deaktiviert B1 ihn automatisch. Beheben Sie Ihren Endpunkt und aktivieren Sie den Webhook anschließend in B1Admin erneut (oder über `POST /membership/webhooks` mit `"active": true`).

## Überprüfen & Erneut zustellen

Der Webhook-Editor in B1Admin zeigt eine Tabelle **Letzte Zustellungen** — Ereignis, Status, Versuchsanzahl, Antwortcode und Zeitstempel. Die Auswahl einer Zeile zeigt die vollständige gesendete Payload und die zurückgekommene Antwort.

Verwenden Sie **Erneut zustellen**, um eine vergangene Zustellung mit ihrer ursprünglichen Payload erneut in die Warteschlange einzureihen — nützlich, nachdem ein Fehler in Ihrem Endpunkt behoben wurde, oder um Ereignisse nachzuliefern, die Ihr Endpunkt verpasst hat, während er nicht erreichbar war.

## Anforderungen an die URL

Da Webhook-URLs von der Kirche bereitgestellt werden, setzt B1 Schutzmaßnahmen gegen Server-Side Request Forgery durch. Eine Webhook-URL wird abgelehnt — bei der Registrierung und erneut vor jeder Zustellung überprüft —, wenn sie:

- nicht **`https`** verwendet
- auf `localhost`, einen `.local`-/`.internal`-Hostnamen zeigt, oder
- zu einer **privaten, Loopback-, Link-Local- oder Cloud-Metadaten**-IP-Adresse aufgelöst wird

Ihr Endpunkt muss ein öffentlich erreichbarer HTTPS-Dienst sein.
