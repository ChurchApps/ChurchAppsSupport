---
title: "Webhooks"
---

# Webhooks

<div class="article-intro">

Webhooks ermöglichen es einer Kirche, Echtzeitbenachrichtigungen an Drittanbieter-Tools zu senden – Automatisierungsplattformen (Zapier, Make, n8n), CRMs, Buchhaltungssysteme oder alles, was einen HTTP POST akzeptiert. Wenn sich eine Person, Gruppe oder ein Haushalt in B1 ändert, sendet B1 eine signierte JSON-Nutzlast an jede URL, die dieses Ereignis abonniert.

</div>

<div class="prereqs">
<h4>Bevor Sie beginnen</h4>

- Ein Kirchenadministrator mit der Berechtigung **Kircheneinstellungen bearbeiten** registriert und verwaltet Webhooks
- Ihr Empfänger-Endpunkt muss über **HTTPS** unter einer öffentlichen Adresse erreichbar sein
- Haben Sie ein System, um das Signaturgeheimnis sicher zu speichern – es wird nur einmal angezeigt

</div>

## Überblick

Webhooks sind **nur ausgehend**: B1 ruft Ihren Endpunkt auf, Sie rufen nicht B1 auf. Jeder Webhook ist ein Kirchen-spezifisches Abonnement bestehend aus einer Ziel-URL, einem Signaturgeheimnis und einer Liste abonnierter Ereignisse.

Die Lieferung verwendet eine **dauerhafte Auslage**: Wenn ein abonniertes Ereignis auftritt, zeichnet B1 eine Lieferungszeile auf und ein Background-Worker POSTet sie innerhalb von etwa einer Minute. Fehlgeschlagene Lieferungen werden mit exponentieller Backoff erneut versucht. Nichts geht verloren, wenn eine Lieferung langsam ist oder Ihr Endpunkt kurzzeitig ausfällt.

## Registrieren eines Webhook

### In B1Admin

Gehen Sie zu **Einstellungen → Entwickler → Webhooks → Neuer Webhook**. Geben Sie einen Namen, die Payload-URL und die Ereignisse ein, die Sie abonnieren möchten. Beim Speichern wird das **Signaturgeheimnis einmal angezeigt** – kopieren Sie es sofort und speichern Sie es mit Ihrer Integration. Es wird nie wieder angezeigt (Sie können es später rotieren, aber nicht das Original abrufen).

### Über die API

Alle Endpunkte liegen unter dem Membership-Modul-Basispfad `/membership/webhooks` und erfordern entweder einen JWT von einem Kirchenadministrator mit der `Settings / Edit`-Berechtigung, **oder einen [API-Schlüssel](./api-keys), der mit dem `settings:write`-Umfang erstellt wurde**. Die gleichen Routen akzeptieren beide. Dies ermöglicht es Zapier und Make, Webhooks im Namen der Kirche zu registrieren, wenn ein Zap oder Szenario aktiviert wird.

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

Die Create-Antwort – und **nur** die Create-Antwort – enthält das `secret`:

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

| Methode und Pfad | Zweck |
|---|---|
| `GET /membership/webhooks` | Liste die Webhooks der Kirche (Geheimnis omittiert) |
| `GET /membership/webhooks/events` | Der Katalog gültiger Ereignisnamen |
| `GET /membership/webhooks/:id` | Ein Webhook laden |
| `POST /membership/webhooks` | Erstellen (nein `id`) oder aktualisieren (mit `id`) |
| `POST /membership/webhooks/:id/regenerate-secret` | Rotieren Sie das Signaturgeheimnis; gibt den neuen Wert einmal zurück |
| `DELETE /membership/webhooks/:id` | Einen Webhook löschen |
| `GET /membership/webhooks/:id/deliveries` | Neuste Lieferungsversuche für einen Webhook |
| `GET /membership/webhooks/deliveries/:deliveryId` | Vollständige Nutzlast und Antwort für eine Lieferung |
| `POST /membership/webhooks/deliveries/:deliveryId/redeliver` | Lieferung erneut einreihen |

## Ereigniskatalog

Ereignisnamen folgen dem Muster `{entity}.{action}`. Rufen Sie die Live-Liste ab aus `GET /membership/webhooks/events`.

| Ereignis | Wird ausgelöst, wenn |
|---|---|
| `person.created` | Eine Person hinzugefügt wird |
| `person.updated` | Ein Personeneintrag geändert wird |
| `person.destroyed` | Eine Person gelöscht wird |
| `household.created` | Ein Haushalt hinzugefügt wird |
| `household.updated` | Ein Haushalt geändert wird |
| `household.destroyed` | Ein Haushalt gelöscht wird |
| `group.created` | Eine Gruppe hinzugefügt wird |
| `group.updated` | Eine Gruppe geändert wird |
| `group.destroyed` | Eine Gruppe gelöscht wird |
| `group.member.added` | Eine Person wird zu einer Gruppe hinzugefügt |
| `group.member.removed` | Eine Person wird aus einer Gruppe entfernt |
| `donation.created` | Ein Geschenk wird aufgezeichnet – manuelle Eingabe, online oder Übergang von ausstehend zu abgeschlossen |
| `donation.updated` | Ein Spendeneintrag wird bearbeitet |
| `attendance.recorded` | Ein Besuch wird protokolliert (manuelle Eingabe oder Check-in) |
| `session.created` | Eine neue Anwesenheitssitzung wird erstellt (manuell oder automatisch beim ersten Check-in) |
| `form.submission.created` | Ein Formular wird eingereicht |
| `event.created` | Ein Kalenderereignis wird hinzugefügt |
| `event.updated` | Ein Kalenderereignis wird bearbeitet |
| `event.destroyed` | Ein Kalenderereignis wird gelöscht |

## Nutzlastformat

Jede Lieferung ist ein HTTP `POST` mit einem JSON-Text und diesen Kopfzeilen:

| Kopfzeile | Beschreibung |
|---|---|
| `Content-Type` | Immer `application/json` |
| `X-B1-Event` | Der Ereignisname, z. B. `person.created` |
| `X-B1-Delivery-Id` | Eindeutige ID für diesen Lieferungsversuch – verwenden Sie sie zum Deduplizieren |
| `X-B1-Signature` | HMAC-SHA256-Signatur des unverarbeiteten Textes (siehe unten) |
| `X-B1-Timestamp` | Unix Epoch-Sekunden, wenn die Anfrage versendet wurde |
| `User-Agent` | `B1-Webhooks/1.0` |

Der Text wraps die geänderte Ressource in eine kleine Umhüllung:

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

Bei `*.destroyed`-Ereignissen enthält `data` nur die `id` und `churchId` des gelöschten Eintrags.

Ereignisse, deren Nutzlasten andere Einträge nach ID referenzieren, enthalten auch lesbare Namen, die zum Lieferzeitpunkt aufgelöst werden: `personName` und `groupName` bei Gruppenmitgliedschaftsereignissen, `personName` bei Anwesenheit, Spende und Listenmitgliedschaftsereignissen, `groupName` bei `session.created` und `formName` (plus `personName`, wenn die Einreichung an eine Person gebunden ist) bei `form.submission.created`.

## Connector-Typen

Das Standard-Lieferformat ist die obige JSON-Umhüllung – `connectorType: "standard"`. Für [Slack und Discord](/docs/b1-admin/integrations/slack-discord) POSTet die gleiche Webhook-Engine stattdessen eine Chat-geformte Nachricht, die diese Dienste direkt akzeptieren:

| `connectorType` | Versendeter Text | Verwenden Sie, wenn |
|---|---|---|
| `"standard"` (Standard) | `{event, churchId, occurredAt, data}`-Umhüllung, signiert | Sie schreiben Ihre eigene Integration oder zeigen auf Zapier / Make / einen benutzerdefinierten Server |
| `"slack"` | `{ "text": "💝 Neue Spende: $50.00" }` | Sie posten direkt zu einer Slack Incoming Webhook-URL |
| `"discord"` | `{ "content": "💝 Neue Spende: $50.00" }` | Sie posten direkt zu einer Discord-Kanal-Webhook-URL |
| `"mailchimp"` | n/a – der Connector ruft Mailchimps API selbst auf | Sie möchten [Audience-Synchronisation](/docs/b1-admin/integrations/services/mailchimp) ohne URL zum Hosten |

Der Connector-Typ wird in der Dropdown-Liste **Connector-Typ** im Webhook-Editor gesetzt oder über `connectorType` im `POST /membership/webhooks`-Text. Die signierte `X-B1-Signature`-Kopfzeile wird immer noch bei Slack/Discord-Lieferungen versendet (sie ignorieren sie harmlos), sodass das spätere Zurückschalten eines Webhooks auf `standard` kein erneutes Signieren erfordert.

Slack und Discord sind reine Text-Reshapes – die Engine POSTet immer noch zur Kirchen-bereitgestellten URL. `mailchimp` ist der erste Connector, der stattdessen seinen HTTP-Austausch besitzt: pro Ereignis gibt er authentifizierte Upsert-/Archiv-/Tag-Anfragen gegen Mailchimps API ab (`MailchimpConnector.deliver`), und seine Anmeldedaten (`{apiKey, audienceId}`) werden AES-verschlüsselt in `webhooks.connectorConfig` gespeichert, nur Schreibzugriff über die API. Mailchimp-Webhooks akzeptieren nur Personen-, Gruppenmitglieds- und Listenmitgliedschaftsereignisse; die Save-Route überprüft den Schlüssel und die Audience gegen Mailchimp, bevor es akzeptiert wird. Lieferungszeilen speichern die Standard-Umhüllung, sodass das Lieferungsprotokoll zeigt, was B1 sah, neben Mailchimps Antwort. Nicht gemappte Situationen (Person ohne E-Mail, Ereignis ohne Mapping) werden abgeschlossen als erfolgreich mit einer `Skipped:`-Antworttexte statt das Burnout von Wiederholungen.

## Test-Lieferungen

Jeder Webhook-Editor hat eine Schaltfläche **Test-Ereignis senden** – der entsprechende API-Aufruf ist `POST /membership/webhooks/:id/test`. Die Test-Route erstellt eine synthetische Nutzlast für das erste abonnierte Ereignis, versendet sie synchron durch den echten signierten Lieferpfad (und durch `formatForConnector` für Slack/Discord) und gibt die resultierende Lieferungszeile einschließlich `responseStatus` und `responseBody` zurück. Verwenden Sie es, um die Konnektivität und Signaturbehandlung zu überprüfen, bevor Sie die Integration für echte Zwecke aktivieren. Für `mailchimp`-Webhooks überprüft der Test stattdessen die gespeicherten Anmeldedaten gegen die Mailchimp-API (ein synthetisches Ereignis würde einen gefälschten Abonnenten in die echte Audience der Kirche schreiben) und gibt ein Lieferungs-geformtes Ergebnis zurück, ohne eine Zeile zu erstellen.

## Verifizieren von Signaturen

Überprüfen Sie immer `X-B1-Signature`, bevor Sie einer Nutzlast vertrauen. Die Signatur ist `sha256=` gefolgt vom Hex HMAC-SHA256 des **unverarbeiteten Request-Textes**, der mit Ihrem Signaturgeheimnis verschlüsselt ist. Berechnen Sie ihn über die Bytes, die Sie erhalten haben – serialisieren Sie nicht das geparste JSON erneut.

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

Lehnen Sie alle Anfragen ab, deren Signatur nicht übereinstimmt. Optionale auch Anfragen ablehnen, deren `X-B1-Timestamp` älter als ein paar Minuten ist, um Replay-Fenster zu begrenzen.

## SDK-Unterstützung

Für Node.js versendet `@churchapps/integration-sdk` einen typisierten Verifizierer und eine Express-Middleware, die die Raw-Body-Erfassung, Signaturprüfung und Umhüllungsparsing für Sie handhabt:

```ts
import express from "express";
import { b1WebhookMiddleware } from "@churchapps/integration-sdk";

const app = express();
// Erfassen Sie den unverarbeiteten Text vor dem JSON-Parsen – erforderlich, damit die Signatur immer noch verifiziert wird.
app.use(express.json({ verify: (req, _res, buf) => { (req as any).rawBody = buf; } }));

app.post("/webhooks/b1", b1WebhookMiddleware({ secret: process.env.B1_WEBHOOK_SECRET! }), (req, res) => {
  const env = req.b1Webhook!;
  switch (env.event) {
    case "donation.created": console.log("neues Geschenk", env.data.amount); break;
  }
  res.sendStatus(200);
});
```

Das SDK stellt auch `WebhookVerifier.verify(secret, rawBody, signatureHeader)` für Nicht-Express-Laufzeiten (Server-lose Funktionen, Fastify usw.) bereit. Siehe das Paket auf npm.

## Lieferung und Wiederholungen

Ihr Endpunkt sollte so schnell wie möglich mit einem `2xx`-Status antworten – idealerweise nur nach dem Einreihen der Arbeit, nicht nach der Verarbeitung. Jede Nicht-`2xx`-Antwort, ein Verbindungsfehler oder eine Antwort, die langsamer als **10 Sekunden** ist, zählt als fehlgeschlagene Lieferung.

Fehlgeschlagene Lieferungen werden mit exponentieller Backoff erneut versucht – **16 Versuche in etwa 5 Tagen**. Das Intervall wächst von 1 Minute über Stunden bis zu 3-Tage-Lücken für die endgültigen Versuche. Nach dem 16. fehlgeschlagenen Versuch wird die Lieferung als `exhausted` markiert und aufgegeben.

Die Lieferung ist **mindestens einmal**: eine Lieferung kann mehr als einmal ankommen (z. B. wenn Ihr Endpunkt erfolgreich ist, aber die Antwort verloren geht). Verwenden Sie die `X-B1-Delivery-Id`-Kopfzeile zum Deduplizieren – verarbeiten Sie jede ID nur einmal und behandeln Sie Wiederholungen als No-Ops.

### Automatische Deaktivierung

Wenn ein Webhook **drei aufeinanderfolgende erschöpfte Lieferungen** erzeugt, deaktiviert B1 ihn automatisch. Beheben Sie Ihren Endpunkt und aktivieren Sie dann den Webhook in B1Admin erneut (oder über `POST /membership/webhooks` mit `"active": true`).

## Inspizieren und Erneut Versenden

Der Webhook-Editor in B1Admin zeigt eine Tabelle **Neuste Lieferungen** – Ereignis, Status, Versuchszahl, Antwortkode und Zeitstempel. Das Auswählen einer Zeile zeigt die vollständige Nutzlast, die versendet wurde, und die Antwort, die zurückgekommen ist.

Verwenden Sie **Erneut versenden**, um alle bisherigen Lieferungen mit ihrer ursprünglichen Nutzlast erneut einzureihen – nützlich nach dem Beheben eines Fehlers in Ihrem Endpunkt oder um Ereignisse zu füllen, die Ihr Endpunkt verpasst hat, während er ausfiel.

## URL-Anforderungen

Da Webhook-URLs von der Kirche bereitgestellt werden, erzwingt B1 Schutzmaßnahmen gegen serverseitige Anforgefälschung. Eine Webhook-URL wird abgelehnt – bei der Registrierung und erneut vor jeder Lieferung überprüft – wenn sie:

- nicht **`https`** verwendet
- auf `localhost`, einen `.local`- / `.internal`-Hostnamen zeigt oder
- sich auf eine **private, Loopback-, Link-lokale oder Cloud-Metadaten**-IP-Adresse auflöst

Ihr Endpunkt muss ein öffentlich erreichbarer HTTPS-Dienst sein.
