---
title: "Webhooks"
---

# Webhooks

<div class="article-intro">

Webhooks lassen eine Kirche Echtzeit-Benachrichtigungen an Tools von Drittanbietern senden — Automatisierungsplattformen (Zapier, Make, n8n), CRMs, Buchhaltungssysteme oder alles, das einen HTTP POST akzeptiert. Wenn eine Person, Gruppe oder ein Haushalt sich in B1 ändert, sendet B1 eine signierte JSON-Payload an jede URL, die für diesen Event abonniert ist.

</div>

<div class="prereqs">
<h4>Vor dem Start</h4>

- Ein Kirchen-Admin mit der **Bearbeite Kirchen-Einstellungen**-Berechtigung registriert und verwaltet Webhooks
- Ihr Empfänger-Endpunkt muss über **HTTPS** unter einer öffentlichen Adresse erreichbar sein
- Haben Sie eine Möglichkeit, das Signing-Secret sicher zu speichern — es wird nur einmal angezeigt

</div>

## Übersicht

Webhooks sind **nur ausgehend**: B1 ruft Ihren Endpunkt auf, Sie rufen nicht B1 auf. Jeder Webhook ist ein pro-Kirchen-Abonnement, bestehend aus einer Ziel-URL, einem Signing-Secret und einer Liste abonnierter Events.

Die Lieferung nutzt einen **dauerhaften Outbox**: Wenn ein abonnierter Event auftritt, verzeichnet B1 eine Lieferungszeile und ein Background Worker POSTet sie innerhalb etwa einer Minute. Fehlgeschlagene Lieferungen werden mit exponentieller Backoff erneut versucht. Nichts geht verloren, wenn eine Lieferung langsam ist oder Ihr Endpunkt kurzzeitig ausfällt.

## Webhook registrieren

### In B1Admin

Gehen Sie zu **Einstellungen → Entwickler → Webhooks → Neuer Webhook**. Geben Sie einen Namen, die Payload-URL und wählen Sie die Events aus, die Sie abonnieren möchten. Bei Save wird das **Signing-Secret genau einmal angezeigt** — kopieren Sie es sofort und speichern Sie es mit Ihrer Integration. Es wird nie wieder angezeigt (Sie können es später drehen, aber Sie können das Original nicht abrufen).

### Über die API

Alle Endpunkte befinden sich unter dem Membership-Modul Basispfad `/membership/webhooks` und erfordern entweder ein JWT von einem Kirchen-Admin mit der `Settings / Edit`-Berechtigung, **oder einen [API-Schlüssel](./api-keys), der mit dem `settings:write`-Scope geprägt wurde**. Die gleichen Routes akzeptieren beide. Dies ist es, was Zapier und Make ermöglicht, Webhooks im Namen der Kirche zu registrieren, wenn ein Zap oder Szenario eingeschaltet wird.

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

Die Create-Antwort — und **nur** die Create-Antwort — enthält das `secret`:

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
| `GET /membership/webhooks` | Die Webhooks der Kirche auflisten (Secret weggelassen) |
| `GET /membership/webhooks/events` | Der Katalog gültiger Event-Namen |
| `GET /membership/webhooks/:id` | Einen Webhook laden |
| `POST /membership/webhooks` | Erstellen (keine `id`) oder aktualisieren (mit `id`) |
| `POST /membership/webhooks/:id/regenerate-secret` | Das Signing-Secret drehen; gibt den neuen Wert einmal zurück |
| `DELETE /membership/webhooks/:id` | Einen Webhook löschen |
| `GET /membership/webhooks/:id/deliveries` | Kürzliche Lieferungsversuche für einen Webhook |
| `GET /membership/webhooks/deliveries/:deliveryId` | Vollständige Payload und Response für eine Lieferung |
| `POST /membership/webhooks/deliveries/:deliveryId/redeliver` | Eine Lieferung erneut in die Warteschlange |

## Event-Katalog

Event-Namen folgen dem Muster `{entity}.{action}`. Rufen Sie die Live-Liste von `GET /membership/webhooks/events` auf.

| Event | Schießt wenn |
|---|---|
| `person.created` | Eine Person wird hinzugefügt |
| `person.updated` | Ein Personendatensatz wird geändert |
| `person.destroyed` | Eine Person wird gelöscht |
| `household.created` | Ein Haushalt wird hinzugefügt |
| `household.updated` | Ein Haushalt wird geändert |
| `household.destroyed` | Ein Haushalt wird gelöscht |
| `group.created` | Eine Gruppe wird hinzugefügt |
| `group.updated` | Eine Gruppe wird geändert |
| `group.destroyed` | Eine Gruppe wird gelöscht |
| `group.member.added` | Eine Person wird zu einer Gruppe hinzugefügt |
| `group.member.removed` | Eine Person wird aus einer Gruppe entfernt |
| `donation.created` | Ein Geschenk wird aufgezeichnet — manuelle Eintrag, Online oder die ausstehende → vollständige Umwandlung |
| `donation.updated` | Ein Spendendatensatz wird bearbeitet |
| `attendance.recorded` | Ein Besuch wird protokolliert (manuelle Eintrag oder Check-in) |
| `session.created` | Eine neue Anwesenheitssitzung wird erstellt (manuell oder automatisch beim ersten Check-in) |
| `form.submission.created` | Ein Formular wird eingereicht |
| `event.created` | Ein Kalender-Event wird hinzugefügt |
| `event.updated` | Ein Kalender-Event wird bearbeitet |
| `event.destroyed` | Ein Kalender-Event wird gelöscht |

## Payload-Format

Jede Lieferung ist ein HTTP `POST` mit JSON-Body und diesen Headern:

| Header | Beschreibung |
|---|---|
| `Content-Type` | Immer `application/json` |
| `X-B1-Event` | Der Event-Name, z.B. `person.created` |
| `X-B1-Delivery-Id` | Eindeutige ID für diesen Lieferungsversuch — nutzen Sie sie zum Deduplizieren |
| `X-B1-Signature` | HMAC-SHA256-Signatur des Rohdaten-Body (siehe unten) |
| `X-B1-Timestamp` | Unix-Epoche Sekunden, wenn der Request gesendet wurde |
| `User-Agent` | `B1-Webhooks/1.0` |

Der Body umhüllt die geänderte Ressource in einer kleinen Umhüllung:

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

Für `*.destroyed` Events enthält `data` nur die `id` und `churchId` des gelöschten Datensatzes.

Events, deren Payloads andere Datensätze nach ID referenzieren, enthalten auch lesbare Namen, die zur Lieferungszeit aufgelöst werden: `personName` und `groupName` bei Group-Membership-Events, `personName` bei Attendance, Donation und List-Membership-Events, `groupName` bei `session.created` und `formName` (plus `personName`, wenn die Einreichung an eine Person gebunden ist) bei `form.submission.created`.

## Connector-Typen

Das Standard-Lieferungsformat ist die oben beschriebene JSON-Umhüllung — `connectorType: "standard"`. Für [Slack und Discord](/docs/b1-admin/integrations/slack-discord) postet die gleiche Webhook-Engine stattdessen eine Chat-geformte Nachricht, die diese Services direkt akzeptieren:

| `connectorType` | Body gesendet | Nutzen wenn |
|---|---|---|
| `"standard"` (standard) | `{event, churchId, occurredAt, data}` Umhüllung, signiert | Sie schreiben Ihre eigene Integration, oder zeigen auf Zapier / Make / einen benutzerdefinierten Server |
| `"slack"` | `{ "text": "💝 New donation: $50.00" }` | Sie postet direkt zu einer Slack Incoming Webhook URL |
| `"discord"` | `{ "content": "💝 New donation: $50.00" }` | Sie postet direkt zu einer Discord Kanal Webhook URL |

Der Connector-Typ wird im **Connector Type** Dropdown im Webhook-Editor oder über `connectorType` im `POST /membership/webhooks` Body gesetzt. Der signierte `X-B1-Signature`-Header wird immer noch für Slack/Discord-Lieferungen gesendet (sie ignorieren ihn harmlos), so dass das Umschalten eines Webhooks zurück zu `standard` später keine Neuzeichnung erfordert.

## Test-Lieferungen

Jeder Webhook-Editor hat einen **Test-Event senden**-Button — der entsprechende API-Aufruf ist `POST /membership/webhooks/:id/test`. Die Test-Route erstellt eine synthetische Payload für den ersten abonnierten Event, versendet ihn synchron durch den echten signierten-Lieferung-Pfad (und durch `formatForConnector` für Slack/Discord) und gibt die resultierende Lieferungszeile einschließlich `responseStatus` und `responseBody` zurück. Nutzen Sie es um Konnektivität und Signatur-Handling zu bestätigen, bevor Sie die Integration für echt einschalten.

## Signaturen verifizieren

Verifizieren Sie immer `X-B1-Signature`, bevor Sie eine Payload vertrauen. Die Signatur ist `sha256=` gefolgt vom Hex HMAC-SHA256 des **Rohdaten-Request-Body** mit Ihrem Signing-Secret verschlüsselt. Berechnen Sie es über die Bytes, die Sie erhalten haben — serialisieren Sie das geparste JSON nicht erneut.

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

Lehnen Sie jeden Request ab, dessen Signatur nicht passt. Optional lehnen Sie auch Requests ab, deren `X-B1-Timestamp` älter als ein paar Minuten ist, um Replay-Fenster zu begrenzen.

## SDK-Unterstützung

Für Node.js, `@churchapps/integration-sdk` versendet einen typisierten Verifier und eine Express Middleware, die die Rohdaten-Erfassung, Signaturprüfung und Umhüllungs-Parsing für Sie handhabt:

```ts
import express from "express";
import { b1WebhookMiddleware } from "@churchapps/integration-sdk";

const app = express();
// Erfassen Sie den Rohdaten-Body, bevor JSON-Parsing — erforderlich, damit die Signatur immer noch verifiziert.
app.use(express.json({ verify: (req, _res, buf) => { (req as any).rawBody = buf; } }));

app.post("/webhooks/b1", b1WebhookMiddleware({ secret: process.env.B1_WEBHOOK_SECRET! }), (req, res) => {
  const env = req.b1Webhook!;
  switch (env.event) {
    case "donation.created": console.log("new gift", env.data.amount); break;
  }
  res.sendStatus(200);
});
```

Das SDK exponiert auch `WebhookVerifier.verify(secret, rawBody, signatureHeader)` für nicht-Express-Runtimes (Serverless-Funktionen, Fastify, etc.). Siehe das Paket auf npm.

## Lieferung & Wiederholungen

Ihr Endpunkt sollte so schnell wie möglich mit einem `2xx`-Status antworten — idealerweise nur nach dem Einreihen der Arbeit, nicht nach dem Verarbeiten davon. Jede nicht-`2xx`-Antwort, ein Verbindungsfehler oder eine Antwort langsamer als **10 Sekunden** zählt als fehlgeschlagene Lieferung.

Fehlgeschlagene Lieferungen werden mit exponentieller Backoff erneut versucht — **16 Versuche über grob 5 Tage**. Das Intervall wächst von 1 Minute, durch Stunden, bis zu 3-Tages-Lücken für die letzten Versuche. Nach dem 16. fehlgeschlagenen Versuch wird die Lieferung als `exhausted` gekennzeichnet und aufgegeben.

Lieferung ist **mindestens einmalig**: Eine Lieferung kann mehr als einmal ankommen (zum Beispiel, wenn Ihr Endpunkt erfolgreich ist, aber die Antwort verloren geht). Nutzen Sie den `X-B1-Delivery-Id`-Header zum Deduplizieren — verarbeiten Sie jede ID nur einmal und behandeln Sie Wiederholungen als Nulloperationen.

### Automatisches Deaktivieren

Wenn ein Webhook **drei aufeinanderfolgende erschöpfte Lieferungen** erzeugt, deaktiviert B1 ihn automatisch. Reparieren Sie Ihren Endpunkt, dann re-aktivieren Sie den Webhook in B1Admin (oder über `POST /membership/webhooks` mit `"active": true`).

## Inspizieren & Neu-Liefern

Der Webhook-Editor in B1Admin zeigt eine **Recent Deliveries**-Tabelle — Event, Status, Versuchsanzahl, Response-Code und Zeitstempel. Die Auswahl einer Zeile enthüllt die vollständige Payload, die gesendet wurde und die Antwort, die zurückkam.

Nutzen Sie **Redeliver**, um jede frühere Lieferung mit ihrer ursprünglichen Payload erneut in die Warteschlange zu stellen — hilfreich nach dem Reparieren eines Bugs in Ihrem Endpunkt, oder um Events zu backfüllen, die Ihr Endpunkt verpasst hat, während es außer Betrieb war.

## URL-Anforderungen

Da Webhook-URLs Kirchen-versorgend sind, erzwingt B1 Schutzmaßnahmen gegen Server-seitige Request-Fälschung. Eine Webhook-URL wird abgelehnt — bei Registrierung und erneut geprüft vor jeder Lieferung — wenn sie:

- nicht **`https`** nutzt
- auf `localhost`, einen `.local` / `.internal`-Hostnamen zeigt, oder
- zu einer **privaten, Loopback-, Link-lokalen oder Cloud-Metadata** IP-Adresse auflöst

Ihr Endpunkt muss ein öffentlich erreichbarer HTTPS-Dienst sein.
