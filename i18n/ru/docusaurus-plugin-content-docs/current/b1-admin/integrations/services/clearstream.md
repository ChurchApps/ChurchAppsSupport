---
title: "Clearstream"
---

# Clearstream

<div class="article-intro">

Запустите текстовое сообщение [Clearstream](https://clearstream.io) из любого события B1 — новый человек, новый подарок, отправка формы, обновление календаря — и потяните ответы обратно как записи B1. Приложение Zapier Clearstream предоставляет оба направления, так что весь сюжет это рецепт, а не пользовательский код.

</div>

<div class="prereqs">
<h4>Перед началом</h4>

- Аккаунт [Clearstream](https://clearstream.io) с по крайней мере одним списком и допуском SMS
- Аккаунт [Zapier](https://zapier.com)
- Пользователь B1Admin с разрешением **Edit Settings**

</div>

## Что вы можете подключить

| Направление | Триггер | Действие |
|---|---|---|
| B1 → Clearstream | B1 `person.created` | Clearstream: Create/Update Subscriber + Send Text to Number |
| B1 → Clearstream | B1 `donation.created` | Clearstream: Send Text to List (например уведомить финансовую команду) |
| B1 → Clearstream | B1 `form.submission.created` | Clearstream: Send Text to routing list (например команда молитвенных просьб) |
| Clearstream → B1 | Новый входящий текст | B1: Create Person; tag с ключевым словом, которое они набрали |

Действия Clearstream Zapier: *Send Text to Number*, *Send Text to List*, *Create/Update Subscriber*, *Add Subscriber to Automated Workflow*, *Add Tag to Subscriber*, *Remove Subscriber From List*.

## Настройка

### 1. Создайте B1 API-ключ

**Settings → Developer → API Keys → New API Key**:

- `settings:write` — требуется для B1 для регистрации триггера вебхука
- `people:read` — требуется для поиска человека из события (`personId` → имя/телефон/электронная почта)
- (Опционально) `people:write`, если ответы Clearstream должны создавать контакты B1

### 2. Создайте "отправить текст на новый подарок" Zap

1. **Trigger** — B1.church: New Donation
2. **Action** — B1.church: Find Person (пожертвование `personId`)
3. **Action** — Clearstream: Send Text to Number. Используйте телефон человека из шага 2 как получателя, составьте сообщение (`"Thanks for your gift, {first}! …"`).

Включите Zap. B1 регистрирует вебхук пожертвования при активации; вы увидите `Zapier — donation.created` появиться в **Settings → Developer → Webhooks**.

### 3. (Опционально) Потяните ответы обратно как записи B1

1. **Trigger** — Clearstream: New Incoming Text
2. **Action** — Filter by Zapier на ключевое слово — например продолжайте только если тело текста начинается с `PRAY`
3. **Action** — B1.church: Find Person (по телефону)
4. **Action** — Filter / Path — если не найдено, создайте их; либо так или иначе, запишите тело текста где-то (Slack, Google Sheet, или представление формы B1 через Webhooks by Zapier).

## Обычные рецепты

### Пейджинг команды волонтеров

- **Trigger** — B1.church: New Form Submission (отфильтровано на id формы молитвенной просьбы)
- **Action** — Clearstream: Send Text to List, где список это ваша команда пастырской помощи на вызове. Составьте тело как `New prayer request: {data.questions.0.answer}`.

### Последовательность сопровождения новичков

- **Trigger** — B1.church: New Person, отфильтровано на tag человека B1 "First-time visitor"
- **Action** — Clearstream: Add Subscriber to Automated Workflow. Отобразите id рабочего процесса на предварительно построенный 7-дневный капельный текст.

### Присоединение к группе, управляемое ключевым словом

- **Trigger** — Clearstream: New Incoming Text (filter to keyword `MENS`)
- **Action** — B1.church: Find Person (по телефону); fork на not-found → Create Person
- **Action** — B1.church: Add Group Member к группе Men's Ministry

## Ограничения и примечания

- **Clearstream счета SMS по сообщению.** Каждое действие Send Text потребляет один или несколько кредитов в зависимости от длины и количества получателей — проверьте допуск вашего плана.
- **Телефон должен быть в формате E.164** (например `+15555550199`) для *Send Text to Number*. Запись человека B1 хранит то, что было введено; используйте *Formatter by Zapier — Numbers → Format Phone Number* шаг, если вы не можете гарантировать формат.
- **Заголовок не требуется со стороны B1** — аутентификация Clearstream полностью находится внутри соединения Zapier.

## Устранение неполадок

- **Триггер никогда не срабатывает** — `Settings → Developer → Webhooks` должен показать `Zapier — <event>` строка после включения Zap. Если нет, API-ключ B1 не имеет `settings:write`. Пересоздайте и подключите заново.
- **Clearstream возвращает "Invalid phone number"** — поле получателя не находится в E.164. Добавьте шаг Format Phone Number.
- **Send Text to List не удается с `403`** — пользователь API Clearstream не имеет разрешения для этого списка, или id списка неправильный. Ids списков видны на странице деталей списка Clearstream.

## См. также

- [Text In Church](./text-in-church) — альтернативная платформа SMS, похожая форма подключения
- [Mobile Message](./mobile-message) — для церквей вне США
- [Zapier (обзор)](../zapier) — B1 сторона каждого рецепта Zapier
- [Clearstream API документы](https://api-docs.clearstream.io/) — для пользовательских интеграций выше приложения Zapier
