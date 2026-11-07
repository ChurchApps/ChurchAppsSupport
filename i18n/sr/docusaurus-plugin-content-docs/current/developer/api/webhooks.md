---
title: "Вебхукови"
---

# Вебхукови

<div class="article-intro">

Вебхукови омогућавају цркви да у реалном времену шаље обавештења алатима трећих страна: платформама за аутоматизацију (Zapier, Make, n8n), CRM системима, рачуноводственим системима или било чему што прихвата HTTP POST захтев. Када се особа, група или домаћинство промене у B1, B1 шаље потписани JSON садржај на сваку URL адресу која је претплаћена на тај догађај.

</div>

<div class="prereqs">
<h4>Пре почетка</h4>

- Администратор цркве са дозволом **Edit Church Settings** региструје и управља вебхуковима
- Ваша крајња тачка за пријем мора бити доступна преко **HTTPS**-а на јавној адреси
- Припремите начин за безбедно чување тајног кључа за потпис, јер се приказује само једном

</div>

## Преглед

Вебхукови су само **одлазни**: B1 позива вашу крајњу тачку, а ви не позивате B1. Сваки вебхук је претплата по цркви која се састоји од одредишне URL адресе, тајног кључа за потпис и листе претплаћених догађаја.

Испорука користи **трајни излазни ред** (durable outbox). Када се догоди претплаћени догађај, B1 бележи ред испоруке, а позадински процес га шаље у року од око минут. Неуспеле испоруке се понављају уз експоненцијално повећавање интервала. Ништа се не губи ако је испорука спора или је ваша крајња тачка накратко недоступна.

## Регистровање вебхука

### У B1Admin-у

Идите на **Settings → Developer → Webhooks → New Webhook** (Подешавања → Програмер → Вебхукови → Нови вебхук). Унесите назив и URL адресу за садржај, па изаберите догађаје на које желите да се претплатите. Након чувања, **тајни кључ за потпис се приказује једном**. Одмах га копирајте и сачувајте уз своју интеграцију. Више се неће приказивати. Касније га можете променити, али оригинални кључ не можете поново да преузмете.

### Преко API-ја

Све крајње тачке се налазе испод основне путање модула Membership, `/membership/webhooks`. Захтевају или JWT токен администратора цркве са дозволом `Settings / Edit`, **или [API кључ](./api-keys) направљен са опсегом `settings:write`**. Исте руте прихватају оба. Тако Zapier и Make могу да региструју вебхукове у име цркве када се Zap или сценарио укључи.

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

Одговор на креирање, и **само** тај одговор, садржи `secret`:

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

| Метода и путања | Сврха |
|---|---|
| `GET /membership/webhooks` | Листа вебхукова цркве (тајни кључ није укључен) |
| `GET /membership/webhooks/events` | Каталог важећих назива догађаја |
| `GET /membership/webhooks/:id` | Учитава један вебхук |
| `POST /membership/webhooks` | Креира (без `id`) или ажурира (са `id`) |
| `POST /membership/webhooks/:id/regenerate-secret` | Мења тајни кључ за потпис; нову вредност враћа једном |
| `DELETE /membership/webhooks/:id` | Брише вебхук |
| `GET /membership/webhooks/:id/deliveries` | Недавни покушаји испоруке за вебхук |
| `GET /membership/webhooks/deliveries/:deliveryId` | Цео садржај и одговор за једну испоруку |
| `POST /membership/webhooks/deliveries/:deliveryId/redeliver` | Поново ставља испоруку у ред |

## Каталог догађаја

Називи догађаја прate образац `{entity}.{action}`. Актуелну листу преузмите са `GET /membership/webhooks/events`.

| Догађај | Активира се када |
|---|---|
| `person.created` | Особа је додата |
| `person.updated` | Запис о особи је измењен |
| `person.destroyed` | Особа је обрисана |
| `household.created` | Домаћинство је додато |
| `household.updated` | Домаћинство је измењено |
| `household.destroyed` | Домаћинство је обрисано |
| `group.created` | Група је додата |
| `group.updated` | Група је измењена |
| `group.destroyed` | Група је обрисана |
| `group.member.added` | Особа је додата у групу |
| `group.member.removed` | Особа је уклоњена из групе |
| `donation.created` | Прилог је забележен: ручни унос, онлајн, или прелаз са стања на чекању на завршено |
| `donation.updated` | Запис о прилогу је уређен |
| `attendance.recorded` | Посета је забележена (ручни унос или пријава) |
| `session.created` | Нова сесија присуства је креирана (ручно или аутоматски при првој пријави) |
| `form.submission.created` | Образац је послат |
| `event.created` | Догађај у календару је додат |
| `event.updated` | Догађај у календару је уређен |
| `event.destroyed` | Догађај у календару је обрисан |

## Формат садржаја

Свака испорука је HTTP `POST` захтев с JSON телом и следећим заглављима:

| Заглавље | Опис |
|---|---|
| `Content-Type` | Увек `application/json` |
| `X-B1-Event` | Назив догађаја, на пример `person.created` |
| `X-B1-Delivery-Id` | Јединствени ИД овог покушаја испоруке. Користите га за уклањање дупликата |
| `X-B1-Signature` | HMAC-SHA256 потпис необрађеног тела (видите испод) |
| `X-B1-Timestamp` | Unix време у секундама када је захтев послат |
| `User-Agent` | `B1-Webhooks/1.0` |

Тело упакује промењени ресурс у мали омотач:

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

За догађаје `*.destroyed`, `data` садржи само `id` и `churchId` обрисаног записа.

Догађаји чији садржај упућује на друге записе по ИД-у такође садрже читљива имена, која се решавају у време испоруке: `personName` и `groupName` за догађаје чланства у групи, `personName` за догађаје присуства, прилога и чланства на листи, `groupName` за `session.created`, и `formName` (плус `personName` када је образац повезан са особом) за `form.submission.created`.

## Типови конектора

Подразумевани формат испоруке је JSON омотач описан горе, `connectorType: "standard"`. За [Slack и Discord](/docs/b1-admin/integrations/slack-discord) исти механизам вебхука уместо тога шаље поруку у облику ћаскања коју те услуге директно прихватају:

| `connectorType` | Послато тело | Користите када |
|---|---|---|
| `"standard"` (подразумевано) | `{event, churchId, occurredAt, data}` омотач, потписан | Пишете сопствену интеграцију или се повезујете на Zapier / Make / сопствени сервер |
| `"slack"` | `{ "text": "💝 New donation: $50.00" }` | Шаљете директно на Slack Incoming Webhook URL |
| `"discord"` | `{ "content": "💝 New donation: $50.00" }` | Шаљете директно на URL вебхука Discord канала |
| `"mailchimp"` | није применљиво. Конектор сам позива Mailchimp API | Желите [синхронизацију публике](/docs/b1-admin/integrations/services/mailchimp) без URL адресе коју треба да хостујете |

Тип конектора подешава се у падајућем менију **Тип конектора** у уређивачу вебхука или преко `connectorType` у телу захтева `POST /membership/webhooks`. Потписано заглавље `X-B1-Signature` се и даље шаље за Slack и Discord испоруке (они га безопасно занемарују), па каснији прелазак вебхука назад на `standard` не захтева поновно потписивање.

Slack и Discord су чиста промена облика тела. Механизам и даље шаље POST на URL адресу коју је унела црква. `mailchimp` је први конектор који сам води HTTP размену: за сваки догађај шаље овлашћене захтеве за уметање, архивирање и ознаке ка Mailchimp API-ју (`MailchimpConnector.deliver`). Његови акредитиви (`{apiKey, audienceId}`) се чувају шифровани AES алгоритмом у `webhooks.connectorConfig`, само за упис преко API-ја. Mailchimp вебхукови прихватају само догађаје особа, чланова група и чланова листи. Ruta за чување проверава кључ и публику код Mailchimp-а пре прихватања. Редови испоруке чувају стандардни омотач, па дневник испорука показује шта је B1 видео заједно с одговором Mailchimp-а. Нерасподељене situacije (особа без е-поште, догађај без мапирања) завршавају се као успешне, са телом одговора `Skipped:`, уместо да троше поновне покушаје.

## Тестне испоруке

Сваки уређивач вебхука има дугме **Пошаљи тестовни догађај** (Send Test Event). Одговарајући API позив је `POST /membership/webhooks/:id/test`. Тестна рута прави синтетички садржај за први претплаћени догађај, шаље га синхронизовано кроз стварни путању потписане испоруке (и кроз `formatForConnector` за Slack и Discord) и враћа добијени ред испоруке, укључујући `responseStatus` и `responseBody`. Користите је да потврдите повезаност и руковање потписом пре него што стварно укључите интеграцију. За `mailchimp` вебхукове тест уместо тога проверава сачуване акредитиве код Mailchimp API-ја (синтетички догађај би у стварну публику цркве уписао лажног претплатника) и враћа резултат у облику испоруке, без креирања реда.

## Провера потписа

Увек проверите `X-B1-Signature` пре него што верујете садржају. Потпис је `sha256=` и затим хекс HMAC-SHA256 **необрађеног тела захтева**, кључан вашим тајним кључем за потпис. Израчунајте га над бајтовима које сте примили. Не серијализујте поново парсирани JSON.

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

Одбаците сваки захтев чији се потпис не поклапа. По жељи, одбаците и захтеве чија је `X-B1-Timestamp` старија од неколико минута, да бисте ограничили простор за поновно слање (replay).

## Подршка за SDK

За Node.js, `@churchapps/integration-sdk` испоручује типизовани верификатор и Express middleware који за вас обрађује прихват необрађеног тела, проверу потписа и рашчлањивање омотача:

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

SDK такође нуди `WebhookVerifier.verify(secret, rawBody, signatureHeader)` за окружења која нису Express (серверлес функције, Fastify и слично). Погледајте пакет на npm-у.

## Испорука и поновни покушаји

Ваша крајња тачка треба што пре да одговори статусом `2xx`, идеално тек након што само стави посао у ред, а не након обраде. Сваки одговор који није `2xx`, неуспешна веза или одговор спорији од **10 секунди** сматра се неуспешном испоруком.

Неуспеле испоруке се понављају уз експоненцијално повећавање интервала: **16 покушаја током отприлике 5 дана**. Интервал расте од 1 минута, преко сати, до размака од 3 дана за последње покушаје. Након 16. неуспелог покушаја испорука се означава као `exhausted` и напушта се.

Испорука је **најмање једном** (at-least-once): испорука може стићи више пута, на пример ако ваша крајња тачка успе, али одговор буде изгубљен. Користите заглавље `X-B1-Delivery-Id` за уклањање дупликата. Обрадите сваки ИД само једном, а поновљене испоруке третирајте као без ефекта.

### Аутоматско искључивање

Ако вебхук изазове **три узастопне исцрпљене испоруке**, B1 га аутоматски искључује. Поправите крајњу тачку, а затим поново укључите вебхук у B1Admin-у (или преко `POST /membership/webhooks` са `"active": true`).

## Преглед и поновно слање

Уређивач вебхукова у B1Admin-у приказује табелу **Recent Deliveries** (Недавне испоруке) са догађајем, статусом, бројем покушаја, кодом одговора и временском ознаком. Избором реда приказује се цео послати садржај и одговор који је стигао.

Користите **Redeliver** (Поново испоручи) да поново ставите у ред било коју прошлу испоруку с њеним првобитним садржајем. Корисно је након исправке грешке у вашој крајњој тачки или за надокнаду догађаја које је ваша крајња тачка пропустила док није радила.

## Захтеви за URL адресу

Пошто URL адресе вебхукова уноси црква, B1 примењује заштиту од фалсификовања захтева на страни сервера (SSRF). URL адреса вебхука се одбија, и при регистрацији и поново пре сваке испоруке, ако:

- не користи **`https`**
- упућује на `localhost`, назив хоста `.local` или `.internal`, или
- се разрешава у **приватну, loopback, link-local или cloud-metadata** IP адресу

Ваша крајња тачка мора бити јавно доступна HTTPS услуга.
