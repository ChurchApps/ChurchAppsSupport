---
title: "Mobile Message"
description: "Подключите события B1 Admin к Mobile Message, австралийскому SMS API, через веб-хуки Zapier или Make, чтобы отправлять приветственные SMS, благодарности за пожертвования и напоминания."
---

# Mobile Message

<div class="article-intro">

[Mobile Message](https://mobilemessage.com.au) — австралийский SMS API, популярный среди церквей в Австралии: он предлагает местные номера и выгодные австралийские тарифы, тогда как Clearstream и Text In Church ориентированы на США. Приложения Mobile Message для Zapier пока нет, но у сервиса есть публичный REST API, поэтому связать события B1 с SMS Mobile Message можно за несколько минут через **Webhooks by Zapier** (или модуль HTTP в Make).

</div>

<div class="prereqs">
<h4>Прежде чем начать</h4>

- Учётная запись [Mobile Message](https://mobilemessage.com.au) с зарегистрированным Sender ID и учётными данными API (имя пользователя и пароль API в разделе *Account → API Settings*)
- Учётная запись [Zapier](https://zapier.com) (или [Make](https://www.make.com))
- Пользователь B1Admin с правом **Edit Settings**

</div>

## Что можно связать {#what-you-can-wire-up}

API Mobile Message устроен как «отправка SMS» — триггеров нет, есть только исходящие сообщения. Поэтому все рецепты идут в направлении B1 → SMS:

| Направление | Триггер B1 | Результат |
|---|---|---|
| B1 → Mobile Message | `person.created` | Приветственное SMS новому человеку |
| B1 → Mobile Message | `donation.created` | Благодарственное SMS жертвователю |
| B1 → Mobile Message | `form.submission.created` | Вызов дежурной команды |
| B1 → Mobile Message | `event.created` | Напоминание, разосланное списку |

## Настройка {#setup}

### 1. Создайте API-ключ B1 {#1-mint-a-b1-api-key}

**Settings → Developer → API Keys → New API Key**:

- `settings:write` — чтобы зарегистрировался веб-хук триггера
- `people:read` — чтобы по `personId` найти номер телефона получателя

### 2. Создайте Zap с Webhooks by Zapier {#2-build-the-zap-with-webhooks-by-zapier}

1. **Триггер** — B1.church: выберите нужное событие (например, New Donation).
2. **Действие** — B1.church: Find Person (по `data.personId`), чтобы получить номер телефона и имя.
3. **Действие** — Webhooks by Zapier: **POST**. Настройте, как показано ниже.

Настройки шага POST:

- **URL** — `https://api.mobilemessage.com.au/v1/messages`
- **Payload Type** — JSON
- **Data** —
  ```json
  {
    "messages": [
      {
        "to": "{{step2_phone}}",
        "message": "Thanks for your gift, {{step2_first_name}}!",
        "sender": "YourChurch"
      }
    ]
  }
  ```
- **Headers** — `Content-Type: application/json` (Webhooks by Zapier добавляет это автоматически)
- **Basic Auth** — в поле *Basic Auth* укажите `<api_username>|<api_password>` (Zapier преобразует это в нужный заголовок `Authorization: Basic …`)

Включите Zap. Чтобы проверить, что SMS приходит, отправьте тестовое пожертвование в B1Admin.

## Типичные рецепты {#common-recipes}

### Напоминания о событиях утром в день события {#event-reminders-the-morning-of}

- **Триггер** — Schedule by Zapier (ежедневно, в 7:00)
- **Действие** — ведите список сегодняшних событий в Google Sheets (или другом приложении, которое может читать Zapier) и ищите сегодняшние строки — в приложении B1 для Zapier нет действия поиска событий
- **Действие** — Webhooks by Zapier: POST в Mobile Message со списком событий для зарегистрированной группы подписчиков

### Используйте пакетную конечную точку для рассылки списку {#use-the-batch-endpoint-for-a-list-broadcast}

Конечная точка `/v1/messages` в Mobile Message принимает до 10 000 сообщений за вызов. Чтобы разослать сообщение группе B1:

- **Триггер** — B1.church: New Form Submission (фильтр по конкретной форме)
- **Действие** — Webhooks by Zapier: GET `/membership/groupmembers?groupId=…`, чтобы получить участников целевой группы (в приложении B1 для Zapier для этого нет действия списка; передайте API-ключ в заголовке `Authorization: Bearer cak_…`)
- **Действие** — Formatter by Zapier → Utilities → Line-itemize: превратите ответ в массив `messages`
- **Действие** — Webhooks by Zapier: POST всего массива в `/v1/messages`

### Вариант с Make {#make-alternative}

Если вы предпочитаете Make, добавьте модуль **HTTP — Make a request** после триггера B1 Watch Events и настройте его так же (POST, Basic Auth, тело JSON). Сторону B1 см. в [обзоре Make](../make.md) — учтите, что приложение B1.church для Make пока не выпущено.

## Ограничения и примечания {#limits--notes}

- **Basic Auth — единственный способ аутентификации.** Mobile Message выдаёт имя пользователя и пароль из панели управления. Относитесь к обоим как к секретам.
- **`sender` должен быть зарегистрированным Sender ID** в вашей учётной записи Mobile Message, иначе отправка вернёт `400 Invalid sender`. Правила Австралии требуют регистрации отправителя.
- **Австралийские номера телефонов** могут быть в формате `0412345678` (местном) или `+61412345678` (международном). API принимает оба, но если вы отправляете и за границу, приводите номера к виду `+61…`.
- **До 10 000 сообщений в запросе** — удобно для рассылок, но одна доставка веб-хука B1 редко содержит такой большой список; пакетную конечную точку оставляйте для плановых массовых Zap.

## Устранение неполадок {#troubleshooting}

- **POST возвращает `401 Unauthorized`** — учётные данные Basic Auth неверны. Скопируйте их заново из панели Mobile Message в разделе *Account → API Settings*. Учтите, что имя пользователя по умолчанию — адрес электронной почты вашей учётной записи, а не отдельный API-ключ.
- **POST возвращает `400 Invalid sender`** — значение `sender` не является зарегистрированным Sender ID в вашей учётной записи. Сначала зарегистрируйте его в панели Mobile Message.
- **SMS приходит обрезанным** — Mobile Message разбивает сообщения длиннее примерно 160 символов на несколько частей, и плата взимается за каждую часть. Проверьте тело ответа — там указано количество частей.

## См. также {#see-also}

- [Clearstream](./clearstream.md), [Text In Church](./text-in-church.md) — альтернативные провайдеры SMS с нативными приложениями Zapier (шаг Webhooks by Zapier не нужен)
- [Zapier (обзор)](../zapier.md) — сторона B1 в каждом рецепте Zapier
- [Документация API Mobile Message](https://mobilemessage.com.au/api-documentation)
