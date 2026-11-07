---
title: "Webhookok"
description: "Állíts be valós idejű webhookokat a B1 Adminból: regisztrálj végpontokat, válassz eseményeket, ellenőrizd a HMAC-aláírásokat, kezeld az újrapróbálkozásokat, és küldd újra a sikertelen adatcsomagokat."
---

# Webhookok

<div class="article-intro">

A webhookok lehetővé teszik, hogy egy egyház valós idejű értesítéseket küldjön harmadik féltől származó eszközöknek: automatizálási platformoknak (Zapier, Make, n8n), CRM-rendszereknek, számviteli rendszereknek vagy bármilyen olyan szolgáltatásnak, amely HTTP POST kéréseket fogad. Amikor egy személy, csoport vagy háztartás megváltozik a B1-ben, a B1 aláírt JSON-adatcsomagot küld minden olyan URL-nek, amely az adott eseményre fel van iratkozva.

</div>

<div class="prereqs">
<h4>Mielőtt elkezdené</h4>

- Az **Egyházbeállítások szerkesztése** jogosultsággal rendelkező egyházi adminisztrátor regisztrálja és kezeli a webhookokat
- A fogadó végpontnak nyilvános címen, **HTTPS**-en keresztül kell elérhetőnek lennie
- Legyen módja az aláírási titkos kulcs biztonságos tárolására, mert azt csak egyszer jelenítjük meg

</div>

## Áttekintés

A webhookok **kimenő** irányúak: a B1 hívja meg a végpontját, Ön nem a B1-et. Minden webhook egy egyházankénti előfizetés, amely egy célURL-ből, egy aláírási titkos kulcsból és a feliratkozott események listájából áll.

A kézbesítés **tartós kimenő sort** (durable outbox) használ: amikor egy feliratkozott esemény bekövetkezik, a B1 rögzít egy kézbesítési sort, és egy háttérfolyamat körülbelül egy percen belül elküldi a POST kérést. A sikertelen kézbesítéseket exponenciális visszalépéssel (backoff) újrapróbálja. Semmi sem vész el, ha egy kézbesítés lassú, vagy a végpontja rövid ideig nem elérhető.

## Webhook regisztrálása

### A B1Adminban

Lépjen a **Beállítások → Fejlesztő → Webhookok → Új webhook** menüpontra. Adja meg a nevet, az adatcsomag (payload) URL-jét, és válassza ki a feliratkozni kívánt eseményeket. Mentéskor az **aláírási titkos kulcs egyszer jelenik meg**. Azonnal másolja ki, és tárolja az integrációjával együtt. Később már nem látható (később elforgathatja, de az eredetit nem tudja lekérni).

### API-n keresztül

Minden végpont a Membership modul `/membership/webhooks` alapútvonala alatt érhető el. Ezek vagy egy egyházi adminisztrátortól származó JWT-t, vagy a `settings:write` hatókörrel létrehozott [API-kulcsot](./api-keys.md) igényelnek. Ugyanazok az útvonalak mindkettőt elfogadják. Ez teszi lehetővé, hogy a Zapier és a Make az egyház nevében regisztráljon webhookokat, amikor egy Zap vagy forgatókönyv bekapcsolásra kerül.

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

A létrehozási válasz, **és kizárólag** a létrehozási válasz tartalmazza a `secret` értéket:

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

| Metódus és útvonal | Cél |
|---|---|
| `GET /membership/webhooks` | Az egyház webhookjainak listázása (a titkos kulcs nélkül) |
| `GET /membership/webhooks/events` | Az érvényes eseménynevek katalógusa |
| `GET /membership/webhooks/:id` | Egy webhook betöltése |
| `POST /membership/webhooks` | Létrehozás (`id` nélkül) vagy frissítés (`id`-val) |
| `POST /membership/webhooks/:id/regenerate-secret` | Az aláírási titkos kulcs cseréje; az új értéket egyszer adja vissza |
| `DELETE /membership/webhooks/:id` | Webhook törlése |
| `GET /membership/webhooks/:id/deliveries` | Egy webhook legutóbbi kézbesítési kísérletei |
| `GET /membership/webhooks/deliveries/:deliveryId` | Egy kézbesítés teljes adatcsomagja és válasza |
| `POST /membership/webhooks/deliveries/:deliveryId/redeliver` | Egy kézbesítés újrasorba állítása |

## Eseménykatalógus

Az eseménynevek a `{entity}.{action}` mintát követik. Az aktuális listát a `GET /membership/webhooks/events` végponton kérheti le.

| Esemény | Mikor aktiválódik |
|---|---|
| `person.created` | Egy személy hozzáadásakor |
| `person.updated` | Egy személy adatainak módosításakor |
| `person.destroyed` | Egy személy törlésekor |
| `household.created` | Egy háztartás hozzáadásakor |
| `household.updated` | Egy háztartás módosításakor |
| `household.destroyed` | Egy háztartás törlésekor |
| `group.created` | Egy csoport létrehozásakor |
| `group.updated` | Egy csoport módosításakor |
| `group.destroyed` | Egy csoport törlésekor |
| `group.member.added` | Egy személy csoporthoz adásakor |
| `group.member.removed` | Egy személy csoportból való eltávolításakor |
| `donation.created` | Egy adomány rögzítésekor: kézi bevitel, online vagy a függőben → teljesítve átmenet |
| `donation.updated` | Egy adományrekord szerkesztésekor |
| `attendance.recorded` | Egy látogatás rögzítésekor (kézi bevitel vagy bejelentkezés) |
| `session.created` | Új jelenléti alkalom létrehozásakor (kézzel vagy az első bejelentkezéskor automatikusan) |
| `form.submission.created` | Űrlap beküldésekor |
| `event.created` | Egy naptári esemény hozzáadásakor |
| `event.updated` | Egy naptári esemény szerkesztésekor |
| `event.destroyed` | Egy naptári esemény törlésekor |

## Adatcsomag formátuma

Minden kézbesítés egy HTTP `POST` kérés JSON törzzsel, az alábbi fejlécekkel:

| Fejléc | Leírás |
|---|---|
| `Content-Type` | Mindig `application/json` |
| `X-B1-Event` | Az eseménynév, pl. `person.created` |
| `X-B1-Delivery-Id` | Az adott kézbesítési kísérlet egyedi azonosítója. Duplikációszűréshez használja. |
| `X-B1-Signature` | A nyers törzs HMAC-SHA256 aláírása (lásd lent) |
| `X-B1-Timestamp` | A kérés elküldésének időpontja Unix epoch másodpercekben |
| `User-Agent` | `B1-Webhooks/1.0` |

A törzs a megváltozott erőforrást egy kis borítékba csomagolja:

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

A `*.destroyed` eseményeknél a `data` csak a törölt rekord `id`-ját és `churchId`-ját tartalmazza.

Azok az események, amelyek más rekordokra azonosító alapján hivatkoznak, olvasható neveket is tartalmaznak, amelyeket a kézbesítés időpontjában oldanak fel: a csoporttagsági eseményeknél a `personName` és a `groupName`, a jelenlétnél, az adománynál és a listatagsági eseményeknél a `personName`, a `session.created` eseménynél a `groupName`, a `form.submission.created` eseménynél pedig a `formName` (és a `personName`, ha a beküldés egy személyhez kapcsolódik).

## Csatlakozótípusok

Az alapértelmezett kézbesítési formátum a fenti JSON-boríték, vagyis `connectorType: "standard"`. A [Slackhez és Discordhoz](/docs/b1-admin/integrations/slack-discord) ugyanez a webhook-motor ehelyett csevegőszerű üzenetet küld, amelyet ezek a szolgáltatások közvetlenül elfogadnak:

| `connectorType` | Elküldött törzs | Mikor használja |
|---|---|---|
| `"standard"` (alapértelmezett) | `{event, churchId, occurredAt, data}` boríték, aláírva | Saját integrációt ír, vagy Zapier / Make / egyéni szerver felé mutat |
| `"slack"` | `{ "text": "💝 New donation: $50.00" }` | Közvetlenül egy Slack bejövő webhook URL-re küld |
| `"discord"` | `{ "content": "💝 New donation: $50.00" }` | Közvetlenül egy Discord csatornai webhook URL-re küld |
| `"mailchimp"` | nincs: a csatlakozó maga hívja a Mailchimp API-t | Ha [közönségszinkronizálást](/docs/b1-admin/integrations/services/mailchimp) szeretne, URL üzemeltetése nélkül |

A csatlakozó típusát a webhook-szerkesztő **Csatlakozó típusa** legördülő menüjében állíthatja be, vagy a `POST /membership/webhooks` törzsében a `connectorType` mezővel. A Slack- és Discord-kézbesítéseknél is elküldésre kerül az `X-B1-Signature` aláírási fejléc. Ezek figyelmen kívül hagyják, így nem okoz problémát. Ha később visszaállítja a webhookot `standard` típusra, nem kell újra aláírni.

A Slack és a Discord csupán a törzs átalakítása: a motor továbbra is az egyház által megadott URL-re küld. A `mailchimp` az első csatlakozó, amely saját maga kezeli a HTTP-kommunikációt. Eseményenként hitelesített upsert, archiválási és címkézési kéréseket küld a Mailchimp API-nak (`MailchimpConnector.deliver`). Hitelesítő adatait (`{apiKey, audienceId}`) AES-titkosítással tárolja a `webhooks.connectorConfig` mezőben, és az API-n keresztül csak írni lehet őket. A Mailchimp-webhookok csak személy-, csoporttag- és listatag-eseményeket fogadnak el. A mentési útvonal a Mailchimp felé ellenőrzi a kulcsot és a közönséget, mielőtt elfogadná. A kézbesítési sorok a szabványos borítékot tárolják, így a kézbesítési napló megmutatja, mit látott a B1, a Mailchimp válaszával együtt. A nem leképezhető helyzetek (személy e-mail-cím nélkül, leképezés nélküli esemény) sikeresként zárulnak, `Skipped:` válasz-törzzsel, nem pedig újrapróbálkozásokat égetnek el.

## Tesztkézbesítések

Minden webhook-szerkesztőben van egy **Tesztesemény küldése** gomb. A megfelelő API-hívás a `POST /membership/webhooks/:id/test`. A tesztútvonal szintetikus adatcsomagot állít össze az első feliratkozott eseményhez, szinkron módon elküldi a valódi, aláírt kézbesítési úton (Slack- és Discord-csatlakozóknál a `formatForConnector` függvényen keresztül), és visszaadja a keletkezett kézbesítési sort, benne a `responseStatus` és a `responseBody` mezőkkel. Használja ezt az integráció élesítése előtt a kapcsolat és az aláírás-kezelés ellenőrzésére. A `mailchimp` webhookok esetén a teszt ehelyett a tárolt hitelesítő adatokat ellenőrzi a Mailchimp API-val, mert egy szintetikus esemény hamis előfizetőt írna az egyház valódi közönségébe. Ilyenkor a teszt kézbesítéshez hasonló eredményt ad vissza, sor létrehozása nélkül.

## Aláírások ellenőrzése

Mindig ellenőrizze az `X-B1-Signature` fejlécet, mielőtt megbízna egy adatcsomagban. Az aláírás a `sha256=` előtagból és a **nyers kérésgtörzs** HMAC-SHA256 hexadecimális értékéből áll, amelyet az aláírási titkos kulccsal számítottak ki. A számítást a kapott bájtokon végezze, ne alakítsa újra a feldolgozott JSON-t.

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

Utasítsa el azokat a kéréseket, amelyeknek az aláírása nem egyezik. Opcionálisan utasítsa el azokat is, amelyek `X-B1-Timestamp` értéke néhány percnél régebbi, hogy korlátozza az újrajátszási (replay) ablakot.

## SDK-támogatás

Node.js esetén a `@churchapps/integration-sdk` csomag tartalmaz egy típusos ellenőrzőt és egy Express middleware-t, amely elvégzi a nyers törzs rögzítését, az aláírás ellenőrzését és a boríték feldolgozását:

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

Az SDK a `WebhookVerifier.verify(secret, rawBody, signatureHeader)` függvényt is biztosítja nem Express futtatókörnyezetekhez, például szerver nélküli függvényekhez vagy Fastify-hoz. Részletek az npm-csomagban találhatók.

## Kézbesítés és újrapróbálkozások

A végpontjának a lehető leggyorsabban `2xx` állapotkóddal kell válaszolnia, ideális esetben már a munka sorba állítása után, nem a feldolgozás után. Minden nem `2xx` válasz, kapcsolódási hiba vagy **10 másodpercnél** lassabb válasz sikertelen kézbesítésnek számít.

A sikertelen kézbesítéseket exponenciális visszalépéssel próbáljuk újra: **16 kísérlet körülbelül 5 napon át**. Az intervallum 1 perctől indul, órákon át nő, és az utolsó kísérleteknél akár 3 napos szünetekig is eljut. A 16. sikertelen kísérlet után a kézbesítés `exhausted` (kimerült) állapotot kap, és a rendszer feladja.

A kézbesítés **legalább egyszeri**: ugyanaz a kézbesítés többször is megérkezhet, például ha a végpontja sikeresen feldolgozta, de a válasz elveszett. Az `X-B1-Delivery-Id` fejléccel szűrje a duplikációkat: minden azonosítót csak egyszer dolgozzon fel, az ismétléseket pedig tekintse üres műveletnek.

### Automatikus letiltás

Ha egy webhook **három egymást követő kimerült kézbesítést** produkál, a B1 automatikusan letiltja. Javítsa ki a végpontját, majd engedélyezze újra a webhookot a B1Adminban, vagy a `POST /membership/webhooks` hívással, `"active": true` értékkel.

## Vizsgálat és újrakézbesítés

A B1Admin webhook-szerkesztőjében a **Legutóbbi kézbesítések** táblázat látható: esemény, állapot, kísérletek száma, válaszkód és időbélyeg. Egy sor kiválasztásakor megjelenik a teljes elküldött adatcsomag és a visszaérkezett válasz.

Az **Újrakézbesítés** gombbal bármely korábbi kézbesítést újra sorba állíthat az eredeti adatcsomaggal. Ez hasznos, ha kijavított egy hibát a végpontján, vagy olyan események pótlására, amelyeket a végpont leállása alatt nem kapott meg.

## URL-követelmények

Mivel a webhook-URL-eket az egyház adja meg, a B1 védelmet alkalmaz a szerveroldali kérésalapú hamisítás (SSRF) ellen. A webhook-URL-t a rendszer elutasítja, és ezt regisztrációkor, illetve minden kézbesítés előtt újra ellenőrzi, ha:

- nem **`https`** protokollt használ
- `localhost`-ra, `.local` vagy `.internal` hosztnévre mutat, vagy
- privát, loopback, link-local vagy felhőszolgáltatói metaadat IP-címre oldódik fel

A végpontjának nyilvánosan elérhető HTTPS-szolgáltatásnak kell lennie.
