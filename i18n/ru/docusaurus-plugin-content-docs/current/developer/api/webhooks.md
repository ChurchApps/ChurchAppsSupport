---
title: "Webhooks"
---

# Webhooks

<div class="article-intro">

Webhooks позволяют церкви отправлять уведомления в реальном времени в сторонние инструменты — платформы автоматизации (Zapier, Make, n8n), CRM, системы бухгалтерии или что-либо еще, что принимает HTTP POST. Когда человек, группа или домохозяйство меняется в B1, B1 отправляет подписанный JSON-запрос на каждый URL, подписанный на это событие.

</div>

<div class="prereqs">
<h4>Перед началом</h4>

- Администратор церкви с разрешением **Edit Church Settings** регистрирует и управляет webhooks
- Ваша конечная точка приема должна быть доступна через **HTTPS** по общедоступному адресу
- Имейте способ безопасного хранения секрета подписи — он отображается только один раз

</div>

## Обзор

Webhooks - это **только исходящие**: B1 вызывает вашу конечную точку, вы не вызываете B1. Каждый webhook - это подписка за церковь, состоящая из URL назначения, секрета подписи и списка подписанных событий.

Доставка использует **долговечный исходящий буфер**: когда происходит подписанное событие, B1 записывает строку доставки и фоновый рабочий процесс отправляет его в течение примерно минуты. Неудачные доставки повторяются с экспоненциальной задержкой. Ничего не теряется, если доставка медленная или ваша конечная точка временно недоступна.

## Регистрация Webhook

### В B1Admin

Перейдите в **Settings → Developer → Webhooks → New Webhook**. Введите имя, URL-адрес полезной нагрузки и выберите события для подписки. При сохранении **секрет подписи отображается один раз** — скопируйте его немедленно и сохраните с вашей интеграцией. Он никогда больше не будет показан (вы можете повернуть его позже, но вы не можете получить оригинал).

### Через API

Все конечные точки находятся под путем базы модуля Membership `/membership/webhooks` и требуют либо JWT от администратора церкви с разрешением `Settings / Edit`, **либо [API ключа](./api-keys) выданного с областью `settings:write`**. Одни и те же маршруты принимают оба. Это то, что позволяет Zapier и Make регистрировать webhooks от имени церкви, когда Zap или сценарий включается.

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

Ответ создания — и **только** ответ создания — включает `secret`:

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

| Метод и путь | Цель |
|---|---|
| `GET /membership/webhooks` | Список webhooks церкви (секрет пропущен) |
| `GET /membership/webhooks/events` | Каталог допустимых имен событий |
| `GET /membership/webhooks/:id` | Загрузка одного webhook |
| `POST /membership/webhooks` | Создание (без `id`) или обновление (с `id`) |
| `POST /membership/webhooks/:id/regenerate-secret` | Вращение секрета подписи; возвращает новое значение один раз |
| `DELETE /membership/webhooks/:id` | Удаление webhook |
| `GET /membership/webhooks/:id/deliveries` | Недавние попытки доставки webhook |
| `GET /membership/webhooks/deliveries/:deliveryId` | Полная полезная нагрузка и ответ для одной доставки |
| `POST /membership/webhooks/deliveries/:deliveryId/redeliver` | Повторная очередь доставки |

## Каталог событий

Имена событий следуют шаблону `{entity}.{action}`. Получите живой список из `GET /membership/webhooks/events`.

| Событие | Срабатывает когда |
|---|---|
| `person.created` | Добавлен человек |
| `person.updated` | Запись человека изменена |
| `person.destroyed` | Человек удален |
| `household.created` | Добавлено домохозяйство |
| `household.updated` | Домохозяйство изменено |
| `household.destroyed` | Домохозяйство удалено |
| `group.created` | Добавлена группа |
| `group.updated` | Группа изменена |
| `group.destroyed` | Группа удалена |
| `group.member.added` | Человек добавлен в группу |
| `group.member.removed` | Человек удален из группы |
| `donation.created` | Подарок записан — ручной ввод, онлайн или переход от отложенного к завершенному |
| `donation.updated` | Запись пожертвования редактируется |
| `attendance.recorded` | Посещение записано (ручной ввод или регистрация) |
| `session.created` | Создается новый сеанс посещаемости (вручную или автоматически при первой регистрации) |
| `form.submission.created` | Форма отправляется |
| `event.created` | Событие календаря добавлено |
| `event.updated` | Событие календаря редактируется |
| `event.destroyed` | Событие календаря удалено |

## Формат полезной нагрузки

Каждая доставка - это HTTP `POST` с телом JSON и этими заголовками:

| Заголовок | Описание |
|---|---|
| `Content-Type` | Всегда `application/json` |
| `X-B1-Event` | Имя события, например `person.created` |
| `X-B1-Delivery-Id` | Уникальный идентификатор этой попытки доставки — используйте его для дедупликации |
| `X-B1-Signature` | HMAC-SHA256 подпись необработанного тела (см. ниже) |
| `X-B1-Timestamp` | Unix epoch секунды при отправке запроса |
| `User-Agent` | `B1-Webhooks/1.0` |

Тело оборачивает измененный ресурс в небольшой конверт:

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

Для событий `*.destroyed`, `data` содержит только `id` и `churchId` удаленной записи.

События, чьи полезные нагрузки ссылаются на другие записи по идентификатору, также содержат удобочитаемые имена, разрешенные во время доставки: `personName` и `groupName` на событиях членства в группе, `personName` на посещаемости, пожертвованиях и событиях членства в списке, `groupName` на `session.created` и `formName` (плюс `personName`, когда отправка привязана к человеку) на `form.submission.created`.

## Типы соединителей

Формат доставки по умолчанию - это конверт JSON выше — `connectorType: "standard"`. Для [Slack и Discord](/docs/b1-admin/integrations/slack-discord) один и тот же механизм webhook вместо этого отправляет сообщение в чат, который эти сервисы принимают напрямую:

| `connectorType` | Отправленное тело | Использование когда |
|---|---|---|
| `"standard"` (по умолчанию) | `{event, churchId, occurredAt, data}` конверт, подписанный | Вы пишете свою собственную интеграцию или указываете на Zapier / Make / пользовательский сервер |
| `"slack"` | `{ "text": "💝 New donation: $50.00" }` | Вы отправляете прямо на URL входящего webhook Slack |
| `"discord"` | `{ "content": "💝 New donation: $50.00" }` | Вы отправляете прямо на webhook канала Discord |
| `"mailchimp"` | н/п — соединитель вызывает API Mailchimp самостоятельно | Вы хотите [синхронизацию аудитории](/docs/b1-admin/integrations/services/mailchimp) без URL для хостинга |

Тип соединителя задается в раскрывающемся меню **Connector Type** в редакторе webhook, или через `connectorType` в теле `POST /membership/webhooks`. Подписанный заголовок `X-B1-Signature` по-прежнему отправляется для доставок Slack/Discord (они его игнорируют безвредно), поэтому переключение webhook обратно на `standard` позже не требует повторного подписания.

Slack и Discord - это чистые переформатировки тела — механизм все равно отправляет POST на предоставленный церковью URL. `mailchimp` - это первый соединитель, который вместо этого владеет своим HTTP обменом: для каждого события он выпускает аутентифицированные запросы upsert/archive/tag к API Mailchimp (`MailchimpConnector.deliver`), и его учетные данные (`{apiKey, audienceId}`) хранятся с AES-шифрованием в `webhooks.connectorConfig`, записываются только через API. Webhooks Mailchimp принимают только события персон, членов группы и членов списка; маршрут сохранения проверяет ключ и аудиторию в Mailchimp перед принятием. Строки доставки хранят стандартный конверт, поэтому журнал доставки показывает то, что видел B1, наряду с ответом Mailchimp. Несопоставленные ситуации (человек без электронной почты, событие без отображения) завершаются как успешные с телом ответа `Skipped:` вместо того, чтобы сжигать повторы.

## Тестовые доставки

Каждый редактор webhook имеет кнопку **Send Test Event** — соответствующий вызов API - это `POST /membership/webhooks/:id/test`. Маршрут тестирования создает синтетическую полезную нагрузку для первого подписанного события, отправляет его синхронно через реальный подписанный путь доставки (и через `formatForConnector` для Slack/Discord) и возвращает результирующую строку доставки, включая `responseStatus` и `responseBody`. Используйте его, чтобы подтвердить подключение и обработку подписей перед фактическим включением интеграции. Для webhook Mailchimp тест вместо этого проверяет сохраненные учетные данные против API Mailchimp (синтетическое событие запишет поддельного подписчика в реальную аудиторию церкви) и возвращает результат, похожий на доставку, без создания строки.

## Проверка подписей

Всегда проверяйте `X-B1-Signature` перед доверием к полезной нагрузке. Подпись - это `sha256=`, за которым следует hex HMAC-SHA256 **необработанного тела запроса** с ключом вашего секрета подписи. Вычислите это над байтами, которые вы получили — не переформатируйте разобранный JSON.

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

Отклоните любой запрос, чья подпись не совпадает. Опционально также отклоните запросы, чей `X-B1-Timestamp` старше чем несколько минут, чтобы ограничить окна повтора.

## Поддержка SDK

Для Node.js, `@churchapps/integration-sdk` поставляется с типизированным верификатором и промежуточным ПО Express, которое обрабатывает захват необработанного тела, проверку подписи и разбор конверта для вас:

```ts
import express from "express";
import { b1WebhookMiddleware } from "@churchapps/integration-sdk";

const app = express();
// Захватить необработанное тело перед разбором JSON — необходимо, чтобы подпись все еще проверялась.
app.use(express.json({ verify: (req, _res, buf) => { (req as any).rawBody = buf; } }));

app.post("/webhooks/b1", b1WebhookMiddleware({ secret: process.env.B1_WEBHOOK_SECRET! }), (req, res) => {
  const env = req.b1Webhook!;
  switch (env.event) {
    case "donation.created": console.log("new gift", env.data.amount); break;
  }
  res.sendStatus(200);
});
```

SDK также предоставляет `WebhookVerifier.verify(secret, rawBody, signatureHeader)` для рантаймов без Express (бессерверные функции, Fastify и т.д.). Смотрите пакет на npm.

## Доставка и повторы

Ваша конечная точка должна ответить со статусом `2xx` как можно быстрее — в идеале после только постановления работы в очередь, а не после обработки ее. Любой ответ не `2xx`, отказ соединения или ответ медленнее, чем **10 секунд**, считается неудачной доставкой.

Неудачные доставки повторяются с экспоненциальной задержкой — **16 попыток в течение примерно 5 дней**. Интервал растет от 1 минуты, через часы, до 3-дневных разрывов для последних попыток. После 16-й неудачной попытки доставка помечается как `exhausted` и отбрасывается.

Доставка - это **по крайней мере один раз**: доставка может прибыть более одного раза (например, если ваша конечная точка успешна, но ответ потерян). Используйте заголовок `X-B1-Delivery-Id` для дедупликации — обрабатывайте каждый идентификатор только один раз и рассматривайте повторы как операции отсутствия.

### Автоматическое отключение

Если webhook производит **три подряд исчерпанные доставки**, B1 автоматически отключает его. Исправьте вашу конечную точку, затем повторно включите webhook в B1Admin (или через `POST /membership/webhooks` с `"active": true`).

## Проверка и повторная доставка

Редактор webhook в B1Admin показывает таблицу **Recent Deliveries** — событие, статус, количество попыток, код ответа и временная метка. Выбор строки раскрывает полную полезную нагрузку, отправленную и полученный ответ.

Используйте **Redeliver** для повторной очереди любой прошлой доставки с ее оригинальной полезной нагрузкой — полезно после исправления ошибки в вашей конечной точке или для заполнения событий, которые ваша конечная точка пропустила, пока она была выключена.

## Требования к URL

Поскольку URL webhook предоставлены церковью, B1 усиливает защиту от подделки запроса на сервере. URL webhook отклоняется — при регистрации и повторной проверке перед каждой доставкой — если он:

- не использует **`https`**
- указывает на `localhost`, имя хоста `.local` / `.internal`, или
- разрешается на **частный, lookback, link-local, или облачные метаданные** IP адрес

Ваша конечная точка должна быть общедоступным HTTPS сервисом.
