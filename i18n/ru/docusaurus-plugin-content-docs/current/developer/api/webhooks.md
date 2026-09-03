---
title: "Webhooks"
---

# Webhooks

<div class="article-intro">

Webhooks позволяют церкви отправлять уведомления в реальном времени инструментам третьих сторон -- платформы автоматизации (Zapier, Make, n8n), CRM, системы учета или все, что принимает HTTP POST. Когда человек, группа или домохозяйство изменяются в B1, B1 отправляет подписанный JSON payload на каждый URL, подписанный на это событие.

</div>

<div class="prereqs">
<h4>Перед началом работы</h4>

- Администратор церкви с разрешением **Edit Church Settings** регистрирует и управляет webhooks
- Ваша конечная точка приема должна быть доступна через **HTTPS** по общедоступному адресу
- Имейте способ безопасного хранения подписи -- она показывается только один раз

</div>

## Overview

Webhooks это **outbound** только: B1 вызывает вашу конечную точку, вы не вызываете B1. Каждый webhook - это подписка per-church, состоящая из URL пункта назначения, подписи и списка подписанных событий.

Доставка использует **durable outbox**: когда подписанное событие происходит, B1 записывает строку доставки и рабочий background POST его в течение примерно минуты. Неудачные доставки повторяются с экспоненциальным резервным отключением. Ничего не теряется, если доставка медленная или ваша конечная точка временно отключена.

## Регистрация Webhook

### В B1Admin

Перейдите к **Settings → Developer → Webhooks → New Webhook**. Введите имя, URL payload и выберите события для подписки. При сохранении **signing secret отображается один раз** -- скопируйте его немедленно и сохраните с вашей интеграцией. Это никогда больше не показывается (вы можете повернуть его позже, но вы не можете получить оригинал).

### Через API

Все конечные точки находятся в пути базы модуля Membership `/membership/webhooks` и требуют либо JWT администратора церкви с разрешением `Settings / Edit`, **либо [API key](./api-keys), отчеканенный с областью `settings:write`**. Одни и те же маршруты принимают оба. Это то, что позволяет Zapier и Make регистрировать webhooks от имени церкви, когда Zap или сценарий включен.

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

Ответ create -- и **только** ответ create -- включает `secret`:

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
