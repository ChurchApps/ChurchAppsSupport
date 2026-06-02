---
title: "Mobile Message"
---

# Mobile Message

<div class="article-intro">

[Mobile Message](https://mobilemessage.com.au) это австралийский SMS API — популярный у австралийских церквей, потому что он предлагает местные номера и конкурентное австралийское ценообразование, где Clearstream и Text In Church ориентированы на США. Mobile Message не имеет приложения Zapier первого класса сегодня, но публикует открытый REST API, поэтому вы можете подключить события B1 к текстам Mobile Message через **Webhooks by Zapier** (или модуль HTTP Make) за несколько минут.

</div>

<div class="prereqs">
<h4>Перед началом</h4>

- Аккаунт [Mobile Message](https://mobilemessage.com.au) с зарегистрированным Sender ID и учетными данными API (API username + password в *Account → API Settings*)
- Аккаунт [Zapier](https://zapier.com) (или [Make](https://www.make.com))
- Пользователь B1Admin с разрешением **Edit Settings**

</div>

## Что вы можете подключить

API Mobile Message имеет форму "send SMS" — нет триггеров, просто исходящий текст. Поэтому рецепты это все B1 → SMS:

| Направление | Триггер B1 | Исход |
|---|---|---|
| B1 → Mobile Message | `person.created` | Приветственный текст новому человеку |
| B1 → Mobile Message | `donation.created` | Текст благодарности дающему |
| B1 → Mobile Message | `form.submission.created` | Вызовите дежурную команду |
| B1 → Mobile Message | `event.created` | Напоминание трансляции списку |

## Настройка

### 1. Создайте B1 API-ключ

**Settings → Developer → API Keys → New API Key**:

- `settings:write` — для регистрации вебхука триггера
- `people:read` — для поиска номера телефона получателя от `personId`

### 2. Создайте Zap с Webhooks by Zapier

1. **Trigger** — B1.church: выберите событие, которое вы хотите (например New Donation).
2. **Action** — B1.church: Find Person (используя `data.personId`) для получения номера телефона и имени.
3. **Action** — Webhooks by Zapier: **POST**. Настройте как ниже.

Параметры шага POST:

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
- **Basic Auth** — установите поле *Basic Auth* на `<api_username>|<api_password>` (Zapier преобразует это в правильный заголовок `Authorization: Basic …`)

Включите Zap. Отправьте подарок тестирования в B1Admin для проверки приходит текст.

## Обычные рецепты

### Напоминания о событиях в день

- **Trigger** — Schedule by Zapier (ежедневно, 7am)
- **Action** — B1.church: Find Events на сегодня (или используйте Find шаг с фиксированным фильтром даты, или сохраните список событий сегодня в Google Sheet)
- **Action** — Webhooks by Zapier: POST на Mobile Message со списком событий зарегистрированной группе подписчиков

### Используйте конечную точку пакета для трансляции списка

Конечная точка `/v1/messages` Mobile Message принимает до 10000 сообщений за вызов. Для трансляции группе B1:

- **Trigger** — B1.church: New Form Submission (filter на конкретную форму)
- **Action** — B1.church: List Group Members для целевой группы (через *Webhooks by Zapier — GET* шаг на `/membership/groupmembers?groupId=…`)
- **Action** — Formatter by Zapier → Utilities → Line-itemize ответ в массив `messages`
- **Action** — Webhooks by Zapier: POST полный массив на `/v1/messages`

### Альтернатива Make

Если вы предпочитаете Make, поместите модуль **HTTP — Make a request** после триггера B1 Watch Events, настройте его так же (POST, Basic Auth, JSON body). См. [обзор Make](../make) для стороны B1.

## Ограничения и примечания

- **Basic Auth это единственный метод аутентификации** — Mobile Message выдает имя пользователя и пароль из панели управления. Относитесь к обоим как к секретам.
- **`sender` должен быть зарегистрированным Sender ID** на вашем аккаунте Mobile Message, или отправка вернет `400 Invalid sender`. Австралийские законы требуют регистрации отправителя.
- **AU номера телефонов** могут быть `0412345678` (местный) или `+61412345678` (международный). API принимает оба, но нормализуйте на `+61…`, если вы также отправляете за границу.
- **До 10000 сообщений за запрос** — полезно для трансляций, но одна доставка вебхука B1 редко испускает список, который такой большой; зарезервируйте конечную точку пакета для запланированных пакетных Zaps.

## Устранение неполадок

- **POST возвращает `401 Unauthorized`** — учетные данные Basic Auth неправильные. Пересоздайте из панели управления Mobile Message *Account → API Settings*. Обратите внимание, что имя пользователя это ваш адрес электронной почты аккаунта по умолчанию, не отдельный API-ключ.
- **POST возвращает `400 Invalid sender`** — значение `sender` не является зарегистрированным Sender ID на вашем аккаунте. Зарегистрируйте его в панели управления Mobile Message сначала.
- **Текст приходит, но усечен** — Mobile Message разбивает сообщения свыше ~160 символов на несколько частей; вам выставляют счета за часть. Проверьте тело ответа — оно говорит вам счет частей.

## См. также

- [Clearstream](./clearstream), [Text In Church](./text-in-church) — альтернативные SMS провайдеры с родными приложениями Zapier (не нужен шаг Webhooks-by-Zapier)
- [Zapier (обзор)](../zapier) — B1 сторона каждого рецепта Zapier
- [Mobile Message API документы](https://mobilemessage.com.au/api-documentation)
