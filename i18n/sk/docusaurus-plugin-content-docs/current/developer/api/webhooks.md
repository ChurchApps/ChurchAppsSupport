---
title: "Webhooky"
---

# Webhooky

<div class="article-intro">

Webhooky umožňujú cirkvi posielať okamžité upozornenia do nástrojov tretích strán — automatizačných platforiem (Zapier, Make, n8n), CRM systémov, účtovných systémov alebo čohokoľvek, čo prijíma HTTP POST. Keď sa osoba, skupina alebo domácnosť v B1 zmení, B1 odošle podpísaný JSON payload na každú URL prihlásenú na túto udalosť.

</div>

<div class="prereqs">
<h4>Predtým, ako začnete</h4>

- Webhooky registruje a spravuje správca cirkvi s oprávnením **Upraviť nastavenia cirkvi**
- Váš prijímajúci koncový bod musí byť dostupný cez **HTTPS** na verejnej adrese
- Mať spôsob, ako bezpečne uložiť podpisové tajomstvo — zobrazí sa iba raz

</div>

## Prehľad

Webhooky sú iba **odchádzajúce**: B1 volá váš koncový bod, vy nevoláte B1. Každý webhook je predplatné pre jednu cirkev, ktoré pozostáva z cieľovej URL, podpisového tajomstva a zoznamu prihlásených udalostí.

Doručovanie využíva **trvalú schránku odoslaných správ (durable outbox)**: keď nastane prihlásená udalosť, B1 zaznamená riadok doručenia a pozadie spracovávajúci worker ho odošle do približne minúty. Neúspešné doručenia sa opakujú s exponenciálnym odstupom. Nič sa nestratí, ak je doručenie pomalé alebo je váš koncový bod krátko nedostupný.

## Registrácia webhooku

### V B1Admin

Prejdite na **Nastavenia → Vývojár → Webhooky → Nový webhook**. Zadajte názov, URL adresu pre payload a vyberte udalosti, na ktoré sa chcete prihlásiť. Po uložení sa **podpisové tajomstvo zobrazí iba raz** — okamžite ho skopírujte a uložte do svojej integrácie. Už sa nikdy nezobrazí (neskôr ho môžete zmeniť, ale pôvodné nemôžete získať späť).

### Cez API

Všetky koncové body sú pod základnou cestou modulu Membership `/membership/webhooks` a vyžadujú buď JWT od správcu cirkvi s oprávnením `Settings / Edit`, **alebo [API kľúč](./api-keys) vytvorený s rozsahom `settings:write`**. Rovnaké trasy akceptujú oba typy. Vďaka tomu môžu Zapier a Make registrovať webhooky v mene cirkvi, keď sa zapne Zap alebo scenár.

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

Odpoveď na vytvorenie — a **iba** odpoveď na vytvorenie — obsahuje `secret`:

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

| Metóda a cesta | Účel |
|---|---|
| `GET /membership/webhooks` | Zobrazí zoznam webhookov cirkvi (bez tajomstva) |
| `GET /membership/webhooks/events` | Katalóg platných názvov udalostí |
| `GET /membership/webhooks/:id` | Načíta jeden webhook |
| `POST /membership/webhooks` | Vytvorí (bez `id`) alebo aktualizuje (s `id`) |
| `POST /membership/webhooks/:id/regenerate-secret` | Zmení podpisové tajomstvo; nové hodnoty vráti iba raz |
| `DELETE /membership/webhooks/:id` | Vymaže webhook |
| `GET /membership/webhooks/:id/deliveries` | Posledné pokusy o doručenie pre webhook |
| `GET /membership/webhooks/deliveries/:deliveryId` | Úplný payload a odpoveď pre jedno doručenie |
| `POST /membership/webhooks/deliveries/:deliveryId/redeliver` | Znovu zaradí doručenie do fronty |

## Katalóg udalostí

Názvy udalostí nasledujú vzor `` `{entity}.{action}` ``. Aktuálny zoznam získate z `GET /membership/webhooks/events`.

| Udalosť | Spustí sa, keď |
|---|---|
| `person.created` | Osoba je pridaná |
| `person.updated` | Záznam osoby je zmenený |
| `person.destroyed` | Osoba je vymazaná |
| `household.created` | Domácnosť je pridaná |
| `household.updated` | Domácnosť je zmenená |
| `household.destroyed` | Domácnosť je vymazaná |
| `group.created` | Skupina je pridaná |
| `group.updated` | Skupina je zmenená |
| `group.destroyed` | Skupina je vymazaná |
| `group.member.added` | Osoba je pridaná do skupiny |
| `group.member.removed` | Osoba je odstránená zo skupiny |
| `donation.created` | Dar je zaznamenaný — ručné zadanie, online alebo prechod zo stavu čakajúci → dokončený |
| `donation.updated` | Záznam daru je upravený |
| `attendance.recorded` | Návšteva je zaznamenaná (ručné zadanie alebo prihlásenie) |
| `session.created` | Vytvorí sa nová relácia dochádzky (ručne alebo automaticky pri prvom prihlásení) |
| `form.submission.created` | Formulár je odoslaný |
| `event.created` | Udalosť v kalendári je pridaná |
| `event.updated` | Udalosť v kalendári je upravená |
| `event.destroyed` | Udalosť v kalendári je vymazaná |

## Formát payloadu

Každé doručenie je HTTP `POST` s JSON telom a týmito hlavičkami:

| Hlavička | Popis |
|---|---|
| `Content-Type` | Vždy `application/json` |
| `X-B1-Event` | Názov udalosti, napr. `person.created` |
| `X-B1-Delivery-Id` | Jedinečné id tohto pokusu o doručenie — použite ho na odstránenie duplicít |
| `X-B1-Signature` | HMAC-SHA256 podpis nespracovaného tela (pozri nižšie) |
| `X-B1-Timestamp` | Unixový čas v sekundách, keď bola požiadavka odoslaná |
| `User-Agent` | `B1-Webhooks/1.0` |

Telo obaluje zmenený zdroj do malej obálky:

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

Pre udalosti `*.destroyed` obsahuje `data` iba `id` a `churchId` vymazaného záznamu.

Udalosti, ktorých payloady odkazujú na iné záznamy podľa id, obsahujú aj čitateľné názvy, ktoré sa dopĺňajú v čase doručenia: `personName` a `groupName` pri udalostiach členstva v skupine, `personName` pri udalostiach dochádzky, daru a členstva v zozname, `groupName` pri `session.created` a `formName` (plus `personName`, ak je odoslanie priradené k osobe) pri `form.submission.created`.

## Typy konektorov

Predvolený formát doručenia je JSON obálka vyššie — `connectorType: "standard"`. Pri [Slack a Discord](/docs/b1-admin/integrations/slack-discord) ten istý webhook engine namiesto toho odošle správu v štýle chatu, ktorú tieto služby prijímajú priamo:

| `connectorType` | Odoslané telo | Použite, keď |
|---|---|---|
| `"standard"` (predvolené) | Podpísaná obálka `{event, churchId, occurredAt, data}` | Píšete vlastnú integráciu alebo smerujete na Zapier / Make / vlastný server |
| `"slack"` | `{ "text": "💝 New donation: $50.00" }` | Posielate priamo na URL Slack Incoming Webhook |
| `"discord"` | `{ "content": "💝 New donation: $50.00" }` | Posielate priamo na URL webhooku kanála Discord |
| `"mailchimp"` | nepoužíva sa — konektor volá API Mailchimp sám | Chcete [synchronizáciu publika](/docs/b1-admin/integrations/services/mailchimp) bez URL, ktorú by ste museli hostiť |

Typ konektora sa nastavuje v rozbaľovacom zozname **Connector Type** v editore webhooku alebo cez `connectorType` v tele `POST /membership/webhooks`. Podpísaná hlavička `X-B1-Signature` sa stále odosiela pri doručeniach Slack/Discord (ignorujú ju bez problémov), takže neskoršie prepnutie webhooku späť na `standard` nevyžaduje nový podpis.

Slack a Discord sú čisté úpravy tela — engine stále odosiela POST na URL zadanú cirkvou. `mailchimp` je prvý konektor, ktorý namiesto toho riadi vlastnú HTTP výmenu: pre každú udalosť posiela overené požiadavky upsert/archive/tag na API Mailchimp (`MailchimpConnector.deliver`) a jeho prihlasovacie údaje (`{apiKey, audienceId}`) sú uložené zašifrované pomocou AES v `webhooks.connectorConfig`, prístupné iba na zápis cez API. Webhooky Mailchimp prijímajú iba udalosti osôb, členstva v skupine a členstva v zozname; trasa uloženia overí kľúč a publikum voči Mailchimp pred prijatím. Riadky doručení ukladajú štandardnú obálku, takže denník doručení ukazuje, čo B1 videl, spolu s odpoveďou Mailchimp. Nemapované situácie (osoba bez e-mailu, udalosť bez mapovania) sa označia ako úspešné s telom odpovede `Skipped:` namiesto spotrebovávania opakovaní.

## Testovacie doručenia

Každý editor webhooku má tlačidlo **Send Test Event** — zodpovedajúce volanie API je `POST /membership/webhooks/:id/test`. Testovacia trasa vytvorí syntetický payload pre prvú prihlásenú udalosť, odošle ho synchrónne cez skutočnú cestu podpísaného doručenia (a pre Slack/Discord cez `formatForConnector`) a vráti výsledný riadok doručenia vrátane `responseStatus` a `responseBody`. Použite ho na potvrdenie pripojenia a spracovania podpisu skôr, než integráciu zapnete naostro. Pre webhooky `mailchimp` test namiesto toho overí uložené prihlasovacie údaje voči API Mailchimp (syntetická udalosť by zapísala falošného odberateľa do skutočného publika cirkvi) a vráti výsledok v tvare doručenia bez vytvorenia riadku.

## Overovanie podpisov

Vždy overte `X-B1-Signature` skôr, než payloadu dôverujete. Podpis je `sha256=` nasledovaný hexadecimálnou hodnotou HMAC-SHA256 **nespracovaného tela požiadavky** kľúčovanou vaším podpisovým tajomstvom. Vypočítajte ho nad bajtmi, ktoré ste dostali — neserializujte znova spracovaný JSON.

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

Odmietnite každú požiadavku, ktorej podpis sa nezhoduje. Voliteľne odmietnite aj požiadavky, ktorých `X-B1-Timestamp` je staršie ako pár minút, aby sa obmedzilo okno pre opakované prehrávanie (replay).

## Podpora SDK

Pre Node.js obsahuje `@churchapps/integration-sdk` typovaný overovač a Express middleware, ktorý za vás zabezpečí zachytenie nespracovaného tela, kontrolu podpisu a spracovanie obálky:

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

SDK tiež sprístupňuje `WebhookVerifier.verify(secret, rawBody, signatureHeader)` pre iné runtime prostredia (serverless funkcie, Fastify a pod.). Pozrite balík na npm.

## Doručovanie a opakovania

Váš koncový bod by mal čo najrýchlejšie odpovedať stavom `2xx` — ideálne hneď po zaradení práce do fronty, nie až po jej spracovaní. Akákoľvek odpoveď iná ako `2xx`, zlyhanie pripojenia alebo odpoveď pomalšia ako **10 sekúnd** sa počíta ako neúspešné doručenie.

Neúspešné doručenia sa opakujú s exponenciálnym odstupom — **16 pokusov počas približne 5 dní**. Interval rastie od 1 minúty, cez hodiny, až po 3-dňové odstupy pri posledných pokusoch. Po 16. neúspešnom pokuse sa doručenie označí ako `exhausted` a zruší sa.

Doručovanie je **aspoň raz (at-least-once)**: doručenie môže prísť viackrát (napríklad ak váš koncový bod uspeje, ale odpoveď sa stratí). Na odstránenie duplicít použite hlavičku `X-B1-Delivery-Id` — každé id spracujte iba raz a opakovania považujte za nič nerobiace operácie.

### Automatické vypnutie

Ak webhook vytvorí **tri po sebe idúce vyčerpané doručenia**, B1 ho automaticky vypne. Opravte svoj koncový bod a potom webhook znovu zapnite v B1Admin (alebo cez `POST /membership/webhooks` s `"active": true`).

## Kontrola a opätovné doručenie

Editor webhooku v B1Admin zobrazuje tabuľku **Posledné doručenia** — udalosť, stav, počet pokusov, kód odpovede a časovú pečiatku. Výberom riadku zobrazíte úplný odoslaný payload a odpoveď, ktorá prišla späť.

Použite **Doručiť znova (Redeliver)** na opätovné zaradenie ľubovoľného minulého doručenia s pôvodným payloadom — užitočné po oprave chyby vo vašom koncovom bode alebo na dodatočné doručenie udalostí, ktoré váš koncový bod zmeškal počas výpadku.

## Požiadavky na URL

Keďže URL webhookov zadáva cirkev, B1 vynucuje ochranu proti server-side request forgery. URL webhooku je odmietnutá — pri registrácii a znova pred každým doručením — ak:

- nepoužíva **`https`**
- smeruje na `localhost`, hostname `.local` / `.internal`, alebo
- sa rozlíši na **súkromnú, loopback, link-local alebo cloud-metadata** IP adresu

Váš koncový bod musí byť verejne dostupná služba cez HTTPS.
