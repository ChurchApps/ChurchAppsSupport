---
title: "Webhooks"
---

# Webhooks

<div class="article-intro">

Mit Webhooks kann eine Kirche Echtzeit-Benachrichtigungen an Drittanbieter-Tools pushen – Automatisierungsplattformen (Zapier, Make, n8n), CRMs, Buchhaltungssysteme oder alles, das einen HTTP POST akzeptiert. Wenn sich eine Person, Gruppe oder ein Haushalt in B1 ändert, sendet B1 eine signierte JSON-Nutzlast an jede URL, die sich für dieses Ereignis abonniert hat.

</div>

<div class="prereqs">
<h4>Bevor Sie beginnen</h4>

- Ein Kirchenadministrator mit der Berechtigung **Kircheneinstellungen bearbeiten** registriert und verwaltet Webhooks
- Ihr Empfangs-Endpunkt muss über **HTTPS** unter einer öffentlichen Adresse erreichbar sein
- Haben Sie eine Möglichkeit, das Signierungsgeheimnis sicher zu speichern – es wird nur einmal angezeigt

</div>

## Übersicht

Webhooks sind **nur ausgehend**: B1 ruft Ihren Endpunkt auf, Sie rufen nicht B1 auf. Jeder Webhook ist ein Pro-Kirchen-Abonnement, das aus einer Ziel-URL, einem Signierungsgeheimnis und einer Liste abonnierter Ereignisse besteht.

Die Zustellung verwendet eine **dauerhafte Postausgangsbox**: Wenn ein abonniertes Ereignis auftritt, zeichnet B1 eine Zustellungsreihe auf und ein Hintergrundprozess POSTet sie innerhalb von etwa einer Minute. Fehlgeschlagene Zustellungen werden mit exponentiellem Backoff erneut versucht. Nichts geht verloren, wenn eine Zustellung langsam ist oder Ihr Endpunkt kurzzeitig ausfällt.

## Webhook registrieren

### In B1Admin

Gehen Sie zu **Einstellungen → Entwickler → Webhooks → Neuer Webhook**. Geben Sie einen Namen, die Nutzlast-URL und die Ereignisse ein, die Sie abonnieren möchten. Beim Speichern wird das **Signierungsgeheimnis genau einmal angezeigt** – kopieren Sie es sofort und speichern Sie es mit Ihrer Integration. Es wird niemals wieder angezeigt (Sie können es später rotieren, aber Sie können das Original nicht abrufen).

### Über die API

Alle Endpunkte liegen unter dem Basisweg des Mitgliedschaftsmoduls `/membership/webhooks` und erfordern entweder ein JWT von einem Kirchenadministrator mit der Berechtigung `Settings / Edit`, **oder einen [API-Schlüssel](./api-keys) mit dem Umfang `settings:write`**. Die gleichen Routen akzeptieren beide. Dies ist, was Zapier und Make Webhooks im Namen der Kirche registrieren können, wenn ein Zap oder Szenario aktiviert wird.

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

Die Erstellungsantwort – **und nur** die Erstellungsantwort – enthält das `secret`:

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
| `GET /membership/webhooks` | Die Webhooks der Kirche auflisten (geheim weggelassen) |
| `GET /membership/webhooks/events` | Der Katalog gültiger Ereignisnamen |
| `GET /membership/webhooks/:id` | Einen Webhook laden |
| `POST /membership/webhooks` | Erstellen (keine `id`) oder aktualisieren (mit `id`) |
| `POST /membership/webhooks/:id/regenerate-secret` | Das Signierungsgeheimnis rotieren; gibt den neuen Wert einmal zurück |
| `DELETE /membership/webhooks/:id` | Einen Webhook löschen |
| `GET /membership/webhooks/:id/deliveries` | Aktuelle Zustellungsversuche für einen Webhook |
| `GET /membership/webhooks/deliveries/:deliveryId` | Vollständige Nutzlast und Antwort für eine Zustellung |
| `POST /membership/webhooks/deliveries/:deliveryId/redeliver` | Eine Zustellung erneut in die Warteschlange stellen |

## Ereigniskatalog

Ereignisnamen folgen dem Muster `{entity}.{action}`. Rufen Sie die Live-Liste aus `GET /membership/webhooks/events` ab.

| Ereignis | Wird aktiviert, wenn |
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
| `donation.created` | Ein Geschenk aufgezeichnet wird – manuelle Eingabe, online oder der Übergang von ausstehend zu abgeschlossen |
| `donation.updated` | Ein Spendendatensatz bearbeitet wird |
| `attendance.recorded` | Ein Besuch protokolliert wird (manuelle Eingabe oder Check-in) |
| `session.created` | Eine neue Anwesenheitssitzung erstellt wird (manuell oder auto beim ersten Check-in) |
| `form.submission.created` | Ein Formular wird eingereicht |
| `event.created` | Ein Kalenderereignis hinzugefügt wird |
| `event.updated` | Ein Kalenderereignis bearbeitet wird |
| `event.destroyed` | Ein Kalenderereignis gelöscht wird |

## Nutzlastformat

Jede Zustellung ist ein HTTP `POST` mit einem JSON-Text und diesen Kopfzeilen:

| Kopfzeile | Beschreibung |
|---|---|
| `Content-Type` | Immer `application/json` |
| `X-B1-Event` | Der Ereignisname, z.B. `person.created` |
| `X-B1-Delivery-Id` | Eindeutige ID für diesen Zustellungsversuch – verwenden Sie sie zum Deduplizieren |
| `X-B1-Signature` | HMAC-SHA256-Signatur des rohen Texts (siehe unten) |
| `X-B1-Timestamp` | Unix-Epochensekunden, wenn die Anfrage gesendet wurde |
| `User-Agent` | `B1-Webhooks/1.0` |

Der Text umgibt die geänderte Ressource in einem kleinen Umschlag:

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

Bei `*.destroyed` Ereignissen enthält `data` nur die `id` und `churchId` des gelöschten Datensatzes.

Ereignisse, deren Nutzlasten andere Datensätze nach ID referenzieren, enthalten auch menschenlesbare Namen, die zum Zeitpunkt der Zustellung aufgelöst werden: `personName` und `groupName` bei den Gruppenmitgliedschaftsereignissen, `personName` bei Anwesenheit, Spende und Listenmitgliedschaftsereignissen, `groupName` bei `session.created` und `formName` (plus `personName`, wenn die Einreichung an eine Person gebunden ist) bei `form.submission.created`.

## Connector-Typen

Das standardmäßige Zustellungsformat ist der oben genannte JSON-Umschlag – `connectorType: "standard"`. Für [Slack und Discord](/docs/b1-admin/integrations/slack-discord) postet die gleiche Webhook-Engine stattdessen eine Chat-geformte Nachricht, die diese Dienste direkt akzeptieren:

| `connectorType` | Gesendeter Text | Verwenden Sie, wenn |
|---|---|---|
| `"standard"` (Standard) | `{event, churchId, occurredAt, data}` Umschlag, signiert | Sie schreiben Ihre eigene Integration, oder zeigen Sie auf Zapier / Make / einen benutzerdefinierten Server |
| `"slack"` | `{ "text": "💝 Neue Spende: $50.00" }` | Sie senden direkt an eine Slack Incoming Webhook URL |
| `"discord"` | `{ "content": "💝 Neue Spende: $50.00" }` | Sie senden direkt an einen Discord-Kanal-Webhook |
| `"mailchimp"` | N/A – der Connector ruft Mailchimp's API selbst auf | Sie möchten [Audience-Synchronisierung](/docs/b1-admin/integrations/services/mailchimp) ohne URL zum Hosten |

Der Connector-Typ wird in der Dropdown **Connector-Typ** im Webhook-Editor festgelegt oder über `connectorType` im `POST /membership/webhooks` Text. Die signierte `X-B1-Signature` Kopfzeile wird weiterhin bei Slack/Discord-Zustellungen gesendet (sie ignorieren sie harmlos), also erfordert das Zurückschalten eines Webhooks auf `standard` später kein Neusignieren.

Slack und Discord sind reine Text-Umformungen – die Engine postet weiterhin auf die von der Kirche bereitgestellte URL. `mailchimp` ist der erste Connector, der sein HTTP-Austausch besitzt: pro Ereignis gibt er authentifizierte upsert/archive/tag-Anfragen gegen Mailchimp's API aus (`MailchimpConnector.deliver`), und seine Anmeldedaten (`{apiKey, audienceId}`) werden AES-verschlüsselt in `webhooks.connectorConfig` gespeichert, nur Schreiben über die API. Mailchimp-Webhooks akzeptieren nur Person-, Gruppenmitglieds- und Listenmitgliedschaftsereignisse; die Speicherroute überprüft den Schlüssel und die Audience gegen Mailchimp, bevor sie akzeptiert werden. Zustellungsreihen speichern den Standardumschlag, so dass das Zustellungsprotokoll zeigt, was B1 sah, neben der Antwort von Mailchimp. Unmapped Situationen (Person ohne E-Mail, Ereignis ohne Mapping) werden als erfolgreich mit einem `Skipped:` Antwort-Text abgeschlossen, anstatt Wiederholungen zu verbrennen.

## Test-Zustellungen

Jeder Webhook-Editor hat einen Knopf **Test-Ereignis senden** – der entsprechende API-Aufruf ist `POST /membership/webhooks/:id/test`. Die Test-Route erstellt eine synthetische Nutzlast für das erste abonnierte Ereignis, leitet sie synchron durch den realen signierten Zustellungspfad (und durch `formatForConnector` für Slack/Discord) und gibt die resultierende Zustellungsreihe einschließlich `responseStatus` und `responseBody` zurück. Verwenden Sie es, um die Konnektivität und Signaturbehandlung zu bestätigen, bevor Sie die Integration für real einschalten. Bei `mailchimp` Webhooks überprüft der Test stattdessen die gespeicherten Anmeldedaten gegen die Mailchimp API (ein synthetisches Ereignis würde einen gefälschten Abonnenten in die echte Audience der Kirche schreiben) und gibt ein zustellungsförmiges Ergebnis ohne Zeilenerstellung zurück.

## Signaturen überprüfen

Überprüfen Sie immer `X-B1-Signature`, bevor Sie einer Nutzlast vertrauen. Die Signatur ist `sha256=` gefolgt vom Hex-HMAC-SHA256 des **rohen Anfragetexts**, der mit Ihrem Signierungsgeheimnis versichert ist. Berechnen Sie es über den Bytes, die Sie erhalten haben – serialisieren Sie den geparsten JSON nicht neu.

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

Lehnen Sie jede Anfrage ab, deren Signatur nicht übereinstimmt. Optional lehnen Sie auch Anfragen ab, deren `X-B1-Timestamp` älter als einige Minuten ist, um Replay-Fenster zu begrenzen.

## SDK-Unterstützung

Für Node.js versand `@churchapps/integration-sdk` ein typisierter Verifizier und eine Express-Middleware, die die Erfassung des rohen Texts, die Signaturprüfung und das Umschlag-Parsing für Sie handhabt:

```ts
import express from "express";
import { b1WebhookMiddleware } from "@churchapps/integration-sdk";

const app = express();
// Erfassen Sie den rohen Text vor dem JSON-Parsen – erforderlich, damit die Signatur weiterhin überprüft wird.
app.use(express.json({ verify: (req, _res, buf) => { (req as any).rawBody = buf; } }));

app.post("/webhooks/b1", b1WebhookMiddleware({ secret: process.env.B1_WEBHOOK_SECRET! }), (req, res) => {
  const env = req.b1Webhook!;
  switch (env.event) {
    case "donation.created": console.log("neue Spende", env.data.amount); break;
  }
  res.sendStatus(200);
});
```

Das SDK stellt auch `WebhookVerifier.verify(secret, rawBody, signatureHeader)` für Nicht-Express-Runtimes (serverlose Funktionen, Fastify, usw.) zur Verfügung. Siehe das Paket auf npm.

## Zustellung und Wiederholungen

Ihr Endpunkt sollte so schnell wie möglich mit einem `2xx` Status antworten – idealerweise nach nur dem Einreihen der Arbeit, nicht nach dem Verarbeiten. Jede Nicht-`2xx` Antwort, ein Verbindungsfehler oder eine Antwort langsamer als **10 Sekunden** zählt als fehlgeschlagene Zustellung.

Fehlgeschlagene Zustellungen werden mit exponentiellem Backoff erneut versucht – **16 Versuche über ungefähr 5 Tage**. Das Intervall wächst von 1 Minute, durch Stunden, bis zu 3-Tage-Lücken für die endgültigen Versuche. Nach dem 16. fehlgeschlagenen Versuch wird die Zustellung als `exhausted` markiert und aufgegeben.

Die Zustellung ist **mindestens einmal**: eine Zustellung kann mehr als einmal ankommen (z.B. wenn Ihr Endpunkt erfolgreich ist, aber die Antwort verloren geht). Verwenden Sie die Kopfzeile `X-B1-Delivery-Id` zum Deduplizieren – verarbeiten Sie jede ID nur einmal und behandeln Sie Wiederholungen als keine Ops.

### Automatisches Deaktivieren

Wenn ein Webhook **drei aufeinanderfolgende erschöpfte Zustellungen** produziert, deaktiviert B1 ihn automatisch. Reparieren Sie Ihren Endpunkt und aktivieren Sie dann den Webhook in B1Admin erneut (oder über `POST /membership/webhooks` mit `"active": true`).

## Inspizieren und Erneute Zustellung

Der Webhook-Editor in B1Admin zeigt eine Tabelle **Aktuelle Zustellungen** – Ereignis, Status, Versuchszahl, Antwortcode und Zeitstempel. Das Auswählen einer Reihe zeigt die gesamte gesendete Nutzlast und die erhaltene Antwort.

Verwenden Sie **Erneut zustellung**, um eine frühere Zustellung mit ihrer ursprünglichen Nutzlast erneut in die Warteschlange zu stellen – nützlich, nachdem Sie einen Bug in Ihrem Endpunkt repariert haben, oder um Ereignisse zu backfill, die Ihr Endpunkt verpasst hat, während er ausfällt.

## URL-Anforderungen

Da Webhook-URLs von Kirchen bereitgestellt werden, erzwingt B1 Schutzmaßnahmen gegen Server-Side-Request-Forgery. Eine Webhook-URL wird – bei Registrierung und vor jeder Zustellung erneut überprüft – abgelehnt, wenn sie:

- nicht **`https`** verwendet
- auf `localhost`, einen `.local` / `.internal` Hostnamen zeigt, oder
- eine **private, Loopback-, Link-Local- oder Cloud-Metadata** IP-Adresse auflöst

Ihr Endpunkt muss ein öffentlich erreichbarer HTTPS-Service sein.
