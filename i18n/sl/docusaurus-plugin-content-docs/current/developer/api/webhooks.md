---
title: "Webhooki"
---

# Webhooki

<div class="article-intro">

Webhooki omogočajo cerkvi, da pošilja obvestila v realnem času orodjem tretjih oseb: platformam za avtomatizacijo (Zapier, Make, n8n), sistemom za upravljanje odnosov s strankami (CRM), računovodskim sistemom ali čemur koli, kar sprejema HTTP POST. Ko se oseba, skupina ali gospodinjstvo v B1 spremeni, B1 pošlje podpisan JSON-podatkovni paket (payload) vsakemu URL-ju, ki je naročen na ta dogodek.

</div>

<div class="prereqs">
<h4>Preden začnete</h4>

- Webhooke registrira in upravlja skrbnik cerkve s pravico **Uredi nastavitve cerkve** (Edit Church Settings)
- Vaša sprejemna končna točka mora biti dosegljiva prek **HTTPS** na javnem naslovu
- Pripravite način za varno shranjevanje podpisnega skrivnega ključa, ki je prikazan samo enkrat

</div>

## Pregled

Webhooki so samo **odhodni**: B1 kliče vašo končno točko, vi pa ne kličete B1. Vsak webhook je naročnina za posamezno cerkev, sestavljena iz ciljnega URL-ja, podpisnega skrivnega ključa in seznama naročenih dogodkov.

Dostava uporablja **trajno čakalno vrsto (outbox)**: ko se zgodi naročen dogodek, B1 zapiše vrstico za dostavo, ozadni delavec pa jo pošlje v približno eni minuti. Neuspešne dostave se ponovijo z eksponentnim zakasnjevanjem. Nič se ne izgubi, tudi če je dostava počasna ali je vaša končna točka za kratek čas nedosegljiva.

## Registracija webhooka

### V B1Admin

Pojdite na **Nastavitve → Razvijalec → Webhooki → Nov webhook**. Vnesite ime, URL za pošiljanje podatkov in izberite dogodke, na katere se želite naročiti. Ob shranjevanju se **podpisni skrivni ključ prikaže samo enkrat**. Takoj ga kopirajte in shranite skupaj z integracijo. Nikoli več se ne prikaže. Kasneje ga lahko zamenjate, vendar prvotnega ključa ne morete pridobiti.

### Prek API-ja

Vse končne točke so pod osnovno potjo modula Membership, `/membership/webhooks`, in zahtevajo bodisi JWT skrbnika cerkve s pravico `Settings / Edit` bodisi [API ključ](./api-keys), ustvarjen z obsegom `settings:write`. Iste poti sprejemajo oboje. To omogoča, da Zapier in Make registrirata webhooke v imenu cerkve, ko se Zap ali scenarij vklopi.

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

Odgovor pri ustvarjanju, in **samo** odgovor pri ustvarjanju, vsebuje `secret`:

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

| Metoda in pot | Namen |
|---|---|
| `GET /membership/webhooks` | Seznam webhookov cerkve (skrivni ključ je izpuščen) |
| `GET /membership/webhooks/events` | Katalog veljavnih imen dogodkov |
| `GET /membership/webhooks/:id` | Naloži en webhook |
| `POST /membership/webhooks` | Ustvari (brez `id`) ali posodobi (z `id`) |
| `POST /membership/webhooks/:id/regenerate-secret` | Zamenja podpisni skrivni ključ; novo vrednost vrne samo enkrat |
| `DELETE /membership/webhooks/:id` | Izbriše webhook |
| `GET /membership/webhooks/:id/deliveries` | Nedavni poskusi dostave za webhook |
| `GET /membership/webhooks/deliveries/:deliveryId` | Celotna vsebina in odgovor za eno dostavo |
| `POST /membership/webhooks/deliveries/:deliveryId/redeliver` | Ponovno postavi dostavo v vrsto |

## Katalog dogodkov

Imena dogodkov sledijo vzorcu `{entity}.{action}`. Aktualni seznam pridobite iz `GET /membership/webhooks/events`.

| Dogodek | Sproži se, ko |
|---|---|
| `person.created` | Oseba je dodana |
| `person.updated` | Zapis osebe je spremenjen |
| `person.destroyed` | Oseba je izbrisana |
| `household.created` | Gospodinjstvo je dodano |
| `household.updated` | Gospodinjstvo je spremenjeno |
| `household.destroyed` | Gospodinjstvo je izbrisano |
| `group.created` | Skupina je dodana |
| `group.updated` | Skupina je spremenjena |
| `group.destroyed` | Skupina je izbrisana |
| `group.member.added` | Oseba je dodana v skupino |
| `group.member.removed` | Oseba je odstranjena iz skupine |
| `donation.created` | Darilo je zabeleženo: ročni vnos, spletno darovanje ali prehod iz »na čakanju« v »zaključeno« |
| `donation.updated` | Zapis darila je urejen |
| `attendance.recorded` | Obisk je zabeležen (ročni vnos ali prijava) |
| `session.created` | Ustvarjena je nova seja obiskovanja (ročno ali samodejno ob prvi prijavi) |
| `form.submission.created` | Obrazec je oddan |
| `event.created` | Dogodek v koledarju je dodan |
| `event.updated` | Dogodek v koledarju je urejen |
| `event.destroyed` | Dogodek v koledarju je izbrisan |

## Oblika podatkovnega paketa (payload)

Vsaka dostava je HTTP `POST` z JSON telesom in temi glavami:

| Glava | Opis |
|---|---|
| `Content-Type` | Vedno `application/json` |
| `X-B1-Event` | Ime dogodka, npr. `person.created` |
| `X-B1-Delivery-Id` | Enolični ID tega poskusa dostave. Uporabite ga za odpravo podvojitev. |
| `X-B1-Signature` | HMAC-SHA256 podpis surovega telesa (glejte spodaj) |
| `X-B1-Timestamp` | Unix čas v sekundah, ob katerem je bila zahteva poslana |
| `User-Agent` | `B1-Webhooks/1.0` |

Telo zahteve spremenjeni vir ovije v majhno ovojnico:

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

Pri dogodkih `*.destroyed` `data` vsebuje samo `id` in `churchId` izbrisanega zapisa.

Dogodki, katerih podatki sklicujejo na druge zapise prek ID-jev, vsebujejo tudi človeku berljiva imena, ki se razrešijo ob dostavi: `personName` in `groupName` pri dogodkih članstva v skupini, `personName` pri obiskih, darilih in dogodkih članstva na seznamu, `groupName` pri `session.created` ter `formName` (in `personName`, če je oddaja povezana z osebo) pri `form.submission.created`.

## Vrste povezovalnikov (connector types)

Privzeti format dostave je zgornja JSON ovojnica, `connectorType: "standard"`. Za [Slack in Discord](/docs/b1-admin/integrations/slack-discord) isti mehanizem webhookov namesto tega pošlje sporočilo v obliki klepeta, ki ga ti storitvi sprejmeta neposredno:

| `connectorType` | Poslano telo | Uporabite, kadar |
|---|---|---|
| `"standard"` (privzeto) | Ovojnica `{event, churchId, occurredAt, data}`, podpisana | Pišete lastno integracijo ali kažete na Zapier, Make ali lasten strežnik |
| `"slack"` | `{ "text": "💝 New donation: $50.00" }` | Pošiljate neposredno na URL Slack Incoming Webhook |
| `"discord"` | `{ "content": "💝 New donation: $50.00" }` | Pošiljate neposredno na URL webhooka kanala Discord |
| `"mailchimp"` | ni primerno, povezovalnik sam kliče API storitve Mailchimp | Želite [sinhronizacijo občinstva](/docs/b1-admin/integrations/services/mailchimp) brez URL-ja, ki bi ga morali gostiti |

Vrsto povezovalnika nastavite v spustnem meniju **Vrsta povezovalnika** (Connector Type) v urejevalniku webhookov ali prek `connectorType` v telesu `POST /membership/webhooks`. Podpisna glava `X-B1-Signature` se še vedno pošilja pri dostavah Slack in Discord (ju neškodljivo ignorirata), zato kasnejša vrnitev webhooka na `standard` ne zahteva ponovnega podpisovanja.

Slack in Discord sta zgolj preoblikovanje telesa, mehanizem pa še vedno pošilja na URL, ki ga je navedla cerkev. `mailchimp` je prvi povezovalnik, ki namesto tega sam upravlja svojo HTTP izmenjavo: za vsak dogodek izda overjene zahtevke za ustvarjanje, posodabljanje, arhiviranje in označevanje prek API-ja Mailchimp (`MailchimpConnector.deliver`). Njegove poverilnice (`{apiKey, audienceId}`) so shranjene šifrirane z AES v `webhooks.connectorConfig` in so prek API-ja samo za pisanje. Webhooki Mailchimp sprejemajo samo dogodke osebe, članstva v skupini in članstva na seznamu. Shranjevalna pot pred sprejemom preveri ključ in občinstvo pri Mailchimp. Vrstice dostav shranjujejo standardno ovojnico, zato dnevnik dostav prikazuje, kaj je B1 videl, skupaj z odgovorom Mailchimp. Nepreslikane situacije (oseba brez e-pošte, dogodek brez preslikave) se zaključijo kot uspešne z odgovornim telesom `Skipped:`, namesto da porabijo ponovitve.

## Testne dostave

Vsak urejevalnik webhookov ima gumb **Pošlji testni dogodek** (Send Test Event). Ustrezen klic API je `POST /membership/webhooks/:id/test`. Testna pot zgradi sintetični podatkovni paket za prvi naročeni dogodek, ga takoj pošlje prek prave podpisane poti dostave (in prek `formatForConnector` za Slack in Discord) ter vrne nastalo vrstico dostave, vključno z `responseStatus` in `responseBody`. Uporabite jo za preverjanje povezljivosti in obravnave podpisa, preden integracijo dejansko vklopite. Pri webhookih `mailchimp` test namesto tega preveri shranjene poverilnice pri API-ju Mailchimp, saj bi sintetični dogodek v resnično občinstvo cerkve zapisal lažnega naročnika. Rezultat vrne v obliki dostave, ne da bi ustvaril vrstico.

## Preverjanje podpisov

Vedno preverite `X-B1-Signature`, preden zaupate podatkom. Podpis je `sha256=`, ki mu sledi šestnajstiški HMAC-SHA256 **surovega telesa zahteve**, ključ pa je vaš podpisni skrivni ključ. Izračunajte ga nad bajti, ki ste jih prejeli. Ne serializirajte znova razčlenjenega JSON-a.

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

Zavrnite vsako zahtevo, katere podpis se ne ujema. Po želji zavrnite tudi zahteve, katerih `X-B1-Timestamp` je starejši od nekaj minut, da omejite okno za ponovno predvajanje.

## Podpora SDK

Za Node.js paket `@churchapps/integration-sdk` vsebuje tipizirano preverjevalnico in vmesno programsko opremo (middleware) za Express, ki namesto vas opravi zajem surovega telesa, preverjanje podpisa in razčlenjevanje ovojnice:

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

SDK prav tako izpostavlja `WebhookVerifier.verify(secret, rawBody, signatureHeader)` za izvajalna okolja brez Expressa, na primer serverless funkcije ali Fastify. Glejte paket na npm.

## Dostava in ponovitve

Vaša končna točka naj čim hitreje odgovori s statusom `2xx`, idealno po zgolj uvrstitvi dela v čakalno vrsto, ne po njegovi obdelavi. Vsak odgovor, ki ni `2xx`, napaka povezave ali odgovor, počasnejši od **10 sekund**, šteje kot neuspešna dostava.

Neuspešne dostave se ponovijo z eksponentnim zakasnjevanjem: **16 poskusov v približno 5 dneh**. Interval raste od 1 minute, prek ur, do 3-dnevnih presledkov pri zadnjih poskusih. Po 16. neuspešnem poskusu je dostava označena kot `exhausted` (izčrpana) in opuščena.

Dostava je **vsaj enkrat**: dostava lahko pride večkrat, na primer če vaša končna točka uspe, a se odgovor izgubi. Za odpravo podvojitev uporabite glavo `X-B1-Delivery-Id`. Vsak ID obdelajte samo enkrat, ponovitve pa obravnavajte kot prazne operacije.

### Samodejna onemogočitev

Če webhook ustvari **tri zaporedne izčrpane dostave**, ga B1 samodejno onemogoči. Popravite svojo končno točko, nato webhook ponovno omogočite v B1Admin ali prek `POST /membership/webhooks` z `"active": true`.

## Pregled in ponovna dostava

Urejevalnik webhookov v B1Admin prikazuje tabelo **Nedavne dostave**, ki vsebuje dogodek, stanje, število poskusov, kodo odgovora in časovni žig. Izbira vrstice prikaže celotno poslano vsebino in odgovor, ki je bil vrnjen.

Uporabite **Ponovno dostavi** (Redeliver), da ponovno postavite katero koli pretekla dostavo v vrsto z izvirno vsebino. To je uporabno po odpravi napake v vaši končni točki ali za nadomestitev dogodkov, ki jih je vaša končna točka zamudila, ko je bila nedosegljiva.

## Zahteve za URL

Ker URL-je webhookov določi cerkev, B1 uveljavlja zaščito pred ponarejanjem zahtev na strani strežnika (SSRF). URL webhooka je zavrnjen, ob registraciji in ponovno pred vsako dostavo, če:

- ne uporablja **`https`**
- kaže na `localhost`, na ime gostitelja `.local` ali `.internal`, ali
- se razreši v **zasebni, loopback, link-local ali oblačni metapodatkovni** IP naslov

Vaša končna točka mora biti javno dosegljiva storitev HTTPS.
