---
title: "Webhooks"
---

# Webhooks

<div class="article-intro">

Webhooks ermöglichen es einer Kirche, Echtzeit-Benachrichtigungen an Drittanbieter-Tools zu senden — Automatisierungsplattformen (Zapier, Make, n8n), CRMs, Buchhaltungssysteme oder alles, was einen HTTP-POST akzeptiert. Wenn sich eine Person, Gruppe oder ein Haushalt in B1 ändert, sendet B1 eine signierte JSON-Nutzlast an jede URL, die für dieses Ereignis abonniert ist.

</div>

<div class="prereqs">
<h4>Bevor Sie beginnen</h4>

- Ein Kirchenadministrator mit der Berechtigung **Kircheneinstellungen bearbeiten** registriert und verwaltet Webhooks
- Ihr empfangender Endpunkt muss über **HTTPS** unter einer öffentlichen Adresse erreichbar sein
- Sie müssen eine Möglichkeit haben, das Signier-Geheimnis sicher zu speichern — es wird nur einmal angezeigt

</div>

## Überblick

Webhooks sind **nur ausgehend**: B1 ruft Ihren Endpunkt auf, Sie rufen B1 nicht auf. Jeder Webhook ist ein kirchenspezifisches Abonnement, das aus einer Ziel-URL, einem Signier-Geheimnis und einer Liste abonnierter Ereignisse besteht.

Die Zustellung verwendet eine **dauerhafte Outbox**: Wenn ein abonniertes Ereignis auftritt, zeichnet B1 eine Zustellungszeile auf und ein Hintergrund-Worker sendet sie innerhalb von etwa einer Minute per POST. Fehlgeschlagene Zustellungen werden mit exponentiellem Backoff wiederholt. Nichts geht verloren, wenn eine Zustellung langsam ist oder Ihr Endpunkt kurzzeitig nicht erreichbar ist.

## Einen Webhook registrieren

### In B1Admin

Gehen Sie zu **Einstellungen → Webhooks → Neuer Webhook**. Geben Sie einen Namen, die Nutzlast-URL ein und wählen Sie die Ereignisse aus, die Sie abonnieren möchten. Beim Speichern wird das **Signier-Geheimnis einmal angezeigt** — kopieren Sie es sofort und speichern Sie es mit Ihrer Integration. Es wird nie wieder angezeigt (Sie können es später rotieren, aber Sie können das Original nicht abrufen).

### Über die API

Alle Endpunkte befinden sich unter dem Basispfad des Mitgliedschaftsmoduls `/membership/webhooks` und erfordern ein JWT von einem Kirchenadministrator mit der Berechtigung `Settings / Edit`.

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

Die Erstellungsantwort — und **nur** die Erstellungsantwort — enthält das `secret`:

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
| `DELETE /membership/webhooks/:id` | Einen Webhook löschen |
| `GET /membership/webhooks/:id/deliveries` | Aktuelle Zustellungsversuche für einen Webhook |
| `GET /membership/webhooks/deliveries/:deliveryId` | Vollständige Nutzlast und Antwort für eine Zustellung |
| `POST /membership/webhooks/deliveries/:deliveryId/redeliver` | Eine Zustellung erneut in die Warteschlange stellen |

## Ereigniskatalog

Ereignisnamen folgen dem Muster `{entity}.{action}`. Rufen Sie die Live-Liste von `GET /membership/webhooks/events` ab.

| Ereignis | Wird ausgelöst, wenn |
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

## Nutzlastformat

Jede Zustellung ist ein HTTP-`POST` mit einem JSON-Body und diesen Headern:

| Header | Beschreibung |
|---|---|
| `Content-Type` | Immer `application/json` |
| `X-B1-Event` | Der Ereignisname, z. B. `person.created` |
| `X-B1-Delivery-Id` | Eindeutige ID für diesen Zustellungsversuch — verwenden Sie sie zur Deduplizierung |
| `X-B1-Signature` | HMAC-SHA256-Signatur des Roh-Body (siehe unten) |
| `X-B1-Timestamp` | Unix-Epoch-Sekunden, wann die Anfrage gesendet wurde |
| `User-Agent` | `B1-Webhooks/1.0` |

Der Body umhüllt die geänderte Ressource in einem kleinen Umschlag:

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

## Signaturen verifizieren

Verifizieren Sie immer `X-B1-Signature`, bevor Sie einer Nutzlast vertrauen. Die Signatur ist `sha256=` gefolgt vom Hex-HMAC-SHA256 des **rohen Request-Body**, der mit Ihrem Signier-Geheimnis verschlüsselt ist. Berechnen Sie ihn über die empfangenen Bytes — serialisieren Sie das geparste JSON nicht erneut.

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

Lehnen Sie jede Anfrage ab, deren Signatur nicht übereinstimmt. Optional lehnen Sie auch Anfragen ab, deren `X-B1-Timestamp` mehr als ein paar Minuten alt ist, um Replay-Fenster zu begrenzen.

## Zustellung & Wiederholungen

Ihr Endpunkt sollte so schnell wie möglich mit einem `2xx`-Status antworten — idealerweise nach dem Einreihen der Arbeit in die Warteschlange, nicht nach deren Verarbeitung. Jede Nicht-`2xx`-Antwort, ein Verbindungsfehler oder eine Antwort, die langsamer als **10 Sekunden** ist, zählt als fehlgeschlagene Zustellung.

Fehlgeschlagene Zustellungen werden mit exponentiellem Backoff wiederholt — **16 Versuche über etwa 5 Tage**. Das Intervall wächst von 1 Minute über Stunden bis zu 3-Tage-Abständen für die letzten Versuche. Nach dem 16. fehlgeschlagenen Versuch wird die Zustellung als `exhausted` markiert und aufgegeben.

Die Zustellung erfolgt **mindestens einmal**: Eine Zustellung kann mehr als einmal eintreffen (z. B. wenn Ihr Endpunkt erfolgreich ist, aber die Antwort verloren geht). Verwenden Sie den `X-B1-Delivery-Id`-Header zur Deduplizierung — verarbeiten Sie jede ID nur einmal und behandeln Sie Wiederholungen als No-Ops.

### Automatische Deaktivierung

Wenn ein Webhook **drei aufeinanderfolgende erschöpfte Zustellungen** erzeugt, deaktiviert B1 ihn automatisch. Beheben Sie Ihren Endpunkt und aktivieren Sie dann den Webhook in B1Admin erneut (oder über `POST /membership/webhooks` mit `"active": true`).

## Inspizieren & erneut zustellen

Der Webhook-Editor in B1Admin zeigt eine Tabelle **Aktuelle Zustellungen** — Ereignis, Status, Versuchsanzahl, Antwortcode und Zeitstempel. Durch Auswahl einer Zeile wird die vollständige gesendete Nutzlast und die zurückgekommene Antwort angezeigt.

Verwenden Sie **Erneut zustellen**, um eine vergangene Zustellung mit ihrer ursprünglichen Nutzlast erneut in die Warteschlange zu stellen — nützlich nach Behebung eines Fehlers in Ihrem Endpunkt oder zum Nachfüllen von Ereignissen, die Ihr Endpunkt verpasst hat, während er nicht verfügbar war.

## URL-Anforderungen

Da Webhook-URLs von der Kirche bereitgestellt werden, setzt B1 Schutzmaßnahmen gegen serverseitige Anfragefälschung durch. Eine Webhook-URL wird abgelehnt — bei der Registrierung und vor jeder Zustellung erneut überprüft — wenn sie:

- nicht **`https`** verwendet
- auf `localhost`, einen `.local`- / `.internal`-Hostnamen verweist, oder
- zu einer **privaten, Loopback-, Link-Local- oder Cloud-Metadaten**-IP-Adresse auflöst

Ihr Endpunkt muss ein öffentlich erreichbarer HTTPS-Dienst sein.
