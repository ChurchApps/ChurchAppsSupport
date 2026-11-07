---
title: "Webhooky"
description: "Nastavte webhooky v reálném čase z B1 Admin: registrujte endpointy, vyberte události, ověřujte podpisy HMAC, řešte opakování a znovu doručte chybná data."
---

# Webhooky

<div class="article-intro">

Webhooky umožňují církvi posílat okamžitá oznámení nástrojům třetích stran: automatizačním platformám (Zapier, Make, n8n), CRM systémům, účetním systémům nebo čemukoli, co přijímá HTTP POST. Když se v B1 změní osoba, skupina nebo domácnost, B1 odešle podepsaný JSON payload na každou URL přihlášenou k dané události.

</div>

<div class="prereqs">
<h4>Než začnete</h4>

- Webhooky registruje a spravuje správce církve s oprávněním **Edit Church Settings**
- Váš přijímací endpoint musí být dostupný přes **HTTPS** na veřejné adrese
- Připravte si bezpečný způsob uložení podepisovacího tajemství, protože se zobrazí pouze jednou

</div>

## Přehled

Webhooky jsou pouze **odchozí**: B1 volá váš endpoint, vy nevoláte B1. Každý webhook je odběr pro konkrétní církev, který se skládá z cílové URL, podepisovacího tajemství a seznamu přihlášených událostí.

Doručování používá **trvalou frontu odchozích zpráv (durable outbox)**: když nastane přihlášená událost, B1 zaznamená řádek doručení a práci na pozadí odešle POST zhruba do jedné minuty. Neúspěšná doručení se opakují s exponenciálním zpožděním. Nic se neztratí, ani když je doručení pomalé nebo je váš endpoint na krátkou dobu nedostupný.

## Registrace webhooku

### V B1Admin

Přejděte na **Settings → Developer → Webhooks → New Webhook**. Zadejte název, URL pro payload a vyberte události, které chcete odebírat. Po uložení se **podepisovací tajemství zobrazí jen jednou**. Okamžitě ho zkopírujte a uložte ho spolu se svou integrací. Později se už nezobrazí (můžete ho změnit, ale původní hodnotu nelze získat).

### Přes API

Všechny endpointy jsou pod základní cestou modulu Membership `/membership/webhooks` a vyžadují buď JWT správce církve s oprávněním `Settings / Edit`, **nebo [API klíč](./api-keys.md) vytvořený s oprávněním `settings:write`**. Stejné trasy přijímají obojí. Díky tomu mohou Zapier a Make registrovat webhooky jménem církve, když se zap nebo scénář zapne.

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

Odpověď na vytvoření — a **pouze** odpověď na vytvoření — obsahuje `secret`:

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

| Metoda a cesta | Účel |
|---|---|
| `GET /membership/webhooks` | Vypíše webhooky církve (tajemství se nevrací) |
| `GET /membership/webhooks/events` | Katalog platných názvů událostí |
| `GET /membership/webhooks/:id` | Načte jeden webhook |
| `POST /membership/webhooks` | Vytvoří (bez `id`) nebo aktualizuje (s `id`) webhook |
| `POST /membership/webhooks/:id/regenerate-secret` | Změní podepisovací tajemství; novou hodnotu vrátí jen jednou |
| `DELETE /membership/webhooks/:id` | Smaže webhook |
| `GET /membership/webhooks/:id/deliveries` | Nedávné pokusy o doručení pro webhook |
| `GET /membership/webhooks/deliveries/:deliveryId` | Úplný payload a odpověď pro jedno doručení |
| `POST /membership/webhooks/deliveries/:deliveryId/redeliver` | Znovu zařadí doručení do fronty |

## Katalog událostí

Názvy událostí mají vzor `{entity}.{action}`. Aktuální seznam získáte z `GET /membership/webhooks/events`.

| Událost | Spustí se, když |
|---|---|
| `person.created` | Je přidána osoba |
| `person.updated` | Záznam osoby se změní |
| `person.destroyed` | Osoba se smaže |
| `household.created` | Je přidána domácnost |
| `household.updated` | Domácnost se změní |
| `household.destroyed` | Domácnost se smaže |
| `group.created` | Je přidána skupina |
| `group.updated` | Skupina se změní |
| `group.destroyed` | Skupina se smaže |
| `group.member.added` | Osoba je přidána do skupiny |
| `group.member.removed` | Osoba je odebrána ze skupiny |
| `donation.created` | Dar je zaznamenán: ručním zadáním, online, nebo přechodem z čekajícího na dokončený |
| `donation.updated` | Záznam daru se upraví |
| `attendance.recorded` | Návštěva je zaznamenána (ručním zadáním nebo check-inem) |
| `session.created` | Vytvoří se nová relace docházky (ručně nebo automaticky při prvním check-inu) |
| `form.submission.created` | Formulář je odeslán |
| `event.created` | Do kalendáře je přidána událost |
| `event.updated` | Událost v kalendáři se upraví |
| `event.destroyed` | Událost v kalendáři se smaže |

## Formát payloadu

Každé doručení je HTTP `POST` s JSON tělem a těmito hlavičkami:

| Hlavička | Popis |
|---|---|
| `Content-Type` | Vždy `application/json` |
| `X-B1-Event` | Název události, např. `person.created` |
| `X-B1-Delivery-Id` | Jedinečné id tohoto pokusu o doručení. Slouží k deduplikaci |
| `X-B1-Signature` | Podpis HMAC-SHA256 nezpracovaného těla (viz níže) |
| `X-B1-Timestamp` | Unixový čas v sekundách, kdy byl požadavek odeslán |
| `User-Agent` | `B1-Webhooks/1.0` |

Tělo obaluje změněný záznam do malé obálky:

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

U událostí `*.destroyed` obsahuje `data` pouze `id` a `churchId` smazaného záznamu.

Události, jejichž payload odkazuje na jiné záznamy pomocí id, navíc obsahují čitelné názvy, které se doplní v době doručení: `personName` a `groupName` u událostí členství ve skupině, `personName` u docházky, darů a událostí členství v seznamu, `groupName` u `session.created` a `formName` (a také `personName`, pokud je odeslání přiřazeno osobě) u `form.submission.created`.

## Typy konektorů

Výchozím formátem doručení je výše popsaná JSON obálka, tedy `connectorType: "standard"`. U [Slacku a Discordu](/docs/b1-admin/integrations/slack-discord) používá stejný engine webhooků místo toho zprávu ve formě chatu, kterou tyto služby přijímají přímo:

| `connectorType` | Odeslané tělo | Kdy použít |
|---|---|---|
| `"standard"` (výchozí) | Podepsaná obálka `{event, churchId, occurredAt, data}` | Píšete vlastní integraci nebo cílíte na Zapier / Make / vlastní server |
| `"slack"` | `{ "text": "💝 New donation: $50.00" }` | Posíláte přímo na URL příchozího webhooku Slacku |
| `"discord"` | `{ "content": "💝 New donation: $50.00" }` | Posíláte přímo na URL webhooku kanálu Discordu |
| `"mailchimp"` | nepoužije se, konektor volá API Mailchimpu sám | Chcete [synchronizaci publika](/docs/b1-admin/integrations/services/mailchimp) bez URL, kterou byste hostovali |

Typ konektoru nastavíte v rozbalovacím seznamu **Connector Type** v editoru webhooku nebo pomocí `connectorType` v těle `POST /membership/webhooks`. Podepsaná hlavička `X-B1-Signature` se u doručení pro Slack a Discord stále odesílá (ignorují ji bez újmy), takže pokud webhook později přepnete zpět na `standard`, není nutné nic znovu podepisovat.

Slack a Discord jsou pouze úpravou těla: engine stále odesílá POST na URL zadanou církví. `mailchimp` je první konektor, který si sám spravuje HTTP výměnu: pro každou událost odešle ověřené požadavky na upsert, archivaci nebo štítky přes API Mailchimpu (`MailchimpConnector.deliver`). Jeho přihlašovací údaje (`{apiKey, audienceId}`) jsou uloženy zašifrované pomocí AES v `webhooks.connectorConfig` a přes API jsou pouze zapisovatelné. Webhooky Mailchimpu přijímají jen události osob, členů skupin a členů seznamů. Trasa pro uložení před přijetím ověří klíč a publikum u Mailchimpu. Řádky doručení ukládají standardní obálku, takže protokol doručení ukazuje, co B1 vidělo, spolu s odpovědí Mailchimpu. Nemapované situace (osoba bez e-mailu, událost bez mapování) se dokončí jako úspěšné s tělem odpovědi `Skipped:` a neplýtvají opakováními.

## Testovací doručení

Každý editor webhooku má tlačítko **Send Test Event**. Odpovídající volání API je `POST /membership/webhooks/:id/test`. Testovací trasa vytvoří syntetický payload pro první přihlášenou událost, odešle ho synchronně skrze skutečnou cestu podepsaného doručení (a pro Slack/Discord přes `formatForConnector`) a vrátí výsledný řádek doručení včetně `responseStatus` a `responseBody`. Použijte ji k ověření připojení a zpracování podpisu, než integraci skutečně zapnete. U webhooků `mailchimp` test místo toho ověří uložené přihlašovací údaje vůči API Mailchimpu (syntetická událost by do skutečného publika církve zapsala falešného odběratele) a vrátí výsledek ve tvaru doručení bez vytvoření řádku.

## Ověřování podpisů

Před důvěřováním payloadu vždy ověřte `X-B1-Signature`. Podpis má tvar `sha256=` následovaný hexadecimální hodnotou HMAC-SHA256 **nezpracovaného těla požadavku**, vypočtenou s vaším podepisovacím tajemstvím jako klíčem. Počítejte ho nad bajty, které jste obdrželi. Neserializujte znovu zparsovaný JSON.

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

Odmítněte každý požadavek, jehož podpis neodpovídá. Volitelně odmítněte také požadavky, jejichž `X-B1-Timestamp` je starší než několik minut, aby se omezilo okno pro opakované přehrání.

## Podpora SDK

Pro Node.js obsahuje `@churchapps/integration-sdk` typovaný ověřovač a middleware pro Express, který za vás zajistí zachycení nezpracovaného těla, kontrolu podpisu a zpracování obálky:

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

SDK také nabízí `WebhookVerifier.verify(secret, rawBody, signatureHeader)` pro běhová prostředí mimo Express (serverless funkce, Fastify apod.). Podrobnosti najdete v balíčku na npm.

## Doručování a opakování

Váš endpoint by měl co nejrychleji odpovědět stavem `2xx`, ideálně až po zařazení práce do fronty, ne až po jejím zpracování. Jakákoli odpověď jiná než `2xx`, selhání připojení nebo odpověď pomalejší než **10 sekund** se počítá jako neúspěšné doručení.

Neúspěšná doručení se opakují s exponenciálním zpožděním, a to **16 pokusů během zhruba 5 dnů**. Interval roste od 1 minuty přes hodiny až po mezery 3 dny u posledních pokusů. Po šestnáctém neúspěšném pokusu je doručení označeno jako `exhausted` a opuštěno.

Doručení je **alespoň jednou**: zpráva může dorazit vícekrát (například když váš endpoint uspěje, ale odpověď se ztratí). Pro deduplikaci použijte hlavičku `X-B1-Delivery-Id`. Každé id zpracujte pouze jednou a opakované doručení považujte za operaci bez efektu.

### Automatické vypnutí

Pokud webhook vyprodukuje **tři po sobě jdoucí doručení ve stavu exhausted**, B1 ho automaticky vypne. Opravte svůj endpoint a poté webhook znovu zapněte v B1Admin (nebo přes `POST /membership/webhooks` s `"active": true`).

## Kontrola a znovuodeslání

Editor webhooku v B1Admin zobrazuje tabulku **Recent Deliveries** s událostí, stavem, počtem pokusů, kódem odpovědi a časovým razítkem. Po výběru řádku se zobrazí celý odeslaný payload a odpověď, která se vrátila.

Pomocí **Redeliver** znovu zařadíte kterékoli minulé doručení do fronty s jeho původním payloadem. Hodí se po opravě chyby ve vašem endpointu nebo k dodatečnému doručení událostí, které váš endpoint zmeškal, když byl nedostupný.

## Požadavky na URL

Protože URL webhooků zadává církev, B1 vynucuje ochranu proti server-side request forgery. URL webhooku je odmítnuta už při registraci a znovu se kontroluje před každým doručením, pokud:

- nepoužívá **`https`**
- odkazuje na `localhost`, hostname s příponou `.local` / `.internal`, nebo
- se převádí na IP adresu z **privátního rozsahu, loopback, link-local nebo cloudové metadata** adresy

Váš endpoint musí být veřejně dostupná služba přes HTTPS.
