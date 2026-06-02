---
title: "Webhooks"
---

# Webhooks

<div class="article-intro">

Webhooks позволяют церкви отправлять уведомления в реальном времени на инструменты третьих сторон — платформы автоматизации (Zapier, Make, n8n), CRM, системы учета или все, что принимает HTTP POST. Когда человек, группа или домохозяйство изменяется в B1, B1 отправляет подписанный JSON-payload на каждый URL, подписанный на это событие.

</div>

<div class="prereqs">
<h4>Перед началом</h4>

- Администратор церкви с разрешением **Редактировать параметры церкви** регистрирует и управляет webhooks
- Ваша конечная точка должна быть доступна через **HTTPS** по открытому адресу
- Имейте способ безопасно хранить секрет подписания — он отображается только один раз

</div>

## Обзор

Webhooks являются **исходящими только**: B1 вызывает вашу конечную точку, вы не вызываете B1. Каждый webhook — это подписка для каждой церкви, состоящая из URL назначения, секрета подписания и списка подписанных событий.

Доставка использует **надежный outbox**: когда происходит подписанное событие, B1 записывает строку доставки и фоновый рабочий процесс выполняет POST в течение примерно минуты. Неудачные доставки повторяются с экспоненциальной задержкой. Ничего не теряется, если доставка медленная или ваша конечная точка временно не работает.

## Регистрация Webhook

### В B1Admin

Перейдите в **Параметры → Webhooks → Новый Webhook**. Введите имя, URL-адрес полезной нагрузки и выберите события для подписки. При сохранении **секрет подписания отображается один раз** — скопируйте его немедленно и сохраните вместе с интеграцией. Он больше не отображается (вы можете повернуть его позже, но не можете получить оригинал).

### Через API

Все конечные точки находятся под базовым путем модуля Membership `/membership/webhooks` и требуют либо JWT от администратора церкви с разрешением `Settings / Edit`, **либо [API ключ](./api-keys) выпущенный с областью `settings:write`**. Одни и те же маршруты принимают оба.

```http
POST /membership/webhooks
Authorization: Bearer <jwt>
Content-Type: application/json

{
  "name": "Zapier — новые члены",
  "url": "https://hooks.zapier.com/hooks/catch/123/abc",
  "events": ["person.created", "person.updated", "group.member.added"]
}
```

Ответ на создание включает `secret`:

```json
{
  "id": "a1b2c3d4e5f",
  "name": "Zapier — новые члены",
  "url": "https://hooks.zapier.com/hooks/catch/123/abc",
  "events": ["person.created", "person.updated", "group.member.added"],
  "active": true,
  "secret": "9f86d081884c7d659a2feaa0c55ad015a3bf4f1b2b0b822c"
}
```

| Метод и путь | Назначение |
|---|---|
| `GET /membership/webhooks` | Список webhooks церкви (секрет исключен) |
| `GET /membership/webhooks/events` | Каталог допустимых названий событий |
| `GET /membership/webhooks/:id` | Загрузить один webhook |
| `POST /membership/webhooks` | Создать или обновить |
| `POST /membership/webhooks/:id/regenerate-secret` | Повернуть секрет подписания |
| `DELETE /membership/webhooks/:id` | Удалить webhook |
| `GET /membership/webhooks/:id/deliveries` | Недавние попытки доставки |
| `GET /membership/webhooks/deliveries/:deliveryId` | Полная полезная нагрузка и ответ |
| `POST /membership/webhooks/deliveries/:deliveryId/redeliver` | Переставить в очередь |

## Каталог событий

Получите живой список из `GET /membership/webhooks/events`.

| Событие | Происходит когда |
|---|---|
| `person.created` | Человек добавлен |
| `person.updated` | Запись о человеке изменена |
| `person.destroyed` | Человек удален |
| `household.created` | Домохозяйство добавлено |
| `household.updated` | Домохозяйство изменено |
| `household.destroyed` | Домохозяйство удалено |
| `group.created` | Группа добавлена |
| `group.updated` | Группа изменена |
| `group.destroyed` | Группа удалена |
| `group.member.added` | Человек добавлен в группу |
| `group.member.removed` | Человек удален из группы |
| `donation.created` | Пожертвование записано |
| `donation.updated` | Пожертвование отредактировано |
| `attendance.recorded` | Посещение записано |
| `session.created` | Новая сессия создана |
| `form.submission.created` | Форма отправлена |
| `event.created` | Событие добавлено |
| `event.updated` | Событие отредактировано |
| `event.destroyed` | Событие удалено |

## Формат полезной нагрузки

Каждая доставка — это HTTP `POST` с телом JSON и заголовками:

| Заголовок | Описание |
|---|---|
| `Content-Type` | Всегда `application/json` |
| `X-B1-Event` | Название события |
| `X-B1-Delivery-Id` | Уникальный id для дедупликации |
| `X-B1-Signature` | Подпись HMAC-SHA256 |
| `X-B1-Timestamp` | Unix epoch секунды |
| `User-Agent` | `B1-Webhooks/1.0` |

Тело оборачивает ресурс в конверт:

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

Для событий `*.destroyed` `data` содержит только `id` и `churchId`.

## Проверка подписей

Всегда проверяйте `X-B1-Signature` перед доверием. Подпись — это hex HMAC-SHA256 **исходного тела**, ключаемая вашим секретом.

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

## Доставка и повторы

Ваша конечная точка должна ответить статусом `2xx` быстро. Ответы без `2xx` повторяются с экспоненциальной задержкой — **16 попыток примерно за 5 дней**.

Доставка — **по крайней мере один раз**: используйте `X-B1-Delivery-Id` для дедупликации.

## Требования к URL

URL webhook должен:

- использовать **`https`**
- не указывать на `localhost` или приватные IP адреса
