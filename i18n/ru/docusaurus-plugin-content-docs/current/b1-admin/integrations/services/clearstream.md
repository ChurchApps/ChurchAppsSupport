---
title: "Clearstream"
description: "Подключите SMS Clearstream к B1 Admin через Zapier: отправляйте сообщения о новых пожертвованиях или отправках форм и возвращайте входящие ответы как записи людей."
---

# Clearstream

<div class="article-intro">

Запускайте SMS [Clearstream](https://clearstream.io) по любому событию B1 — новый человек, новое пожертвование, отправка формы, обновление календаря — и возвращайте ответы обратно как записи B1. Приложение Clearstream для Zapier поддерживает оба направления, так что вся связка — это рецепт, а не собственный код.

</div>

<div class="prereqs">
<h4>Прежде чем начать</h4>

- Учётная запись [Clearstream](https://clearstream.io) хотя бы с одним списком и лимитом SMS
- Учётная запись [Zapier](https://zapier.com)
- Пользователь B1Admin с правом **Edit Settings**

</div>

## Что можно связать {#what-you-can-wire-up}

| Направление | Триггер | Действие |
|---|---|---|
| B1 → Clearstream | B1 `person.created` | Clearstream: Create/Update Subscriber + Send Text to Number |
| B1 → Clearstream | B1 `donation.created` | Clearstream: Send Text to List (например, уведомить финансовую команду) |
| B1 → Clearstream | B1 `form.submission.created` | Clearstream: Send Text to a routing list (например, команду молитвенных просьб) |
| Clearstream → B1 | New Incoming Text | B1: Create Person; добавить метку с ключевым словом, которое человек отправил |

Действия Clearstream в Zapier: *Send Text to Number*, *Send Text to List*, *Create/Update Subscriber*, *Add Subscriber to Automated Workflow*, *Add Tag to Subscriber*, *Remove Subscriber From List*.

## Настройка {#setup}

### 1. Создайте API-ключ B1 {#1-mint-a-b1-api-key}

**Settings → Developer → API Keys → New API Key**:

- `settings:write` — нужен, чтобы подключить ключ к Zapier и чтобы B1 зарегистрировала веб-хук триггера
- `people:read` — нужен, чтобы найти человека по событию (`personId` → имя / телефон / адрес электронной почты)
- (необязательно) `people:write`, если ответы Clearstream должны создавать контакты B1

### 2. Создайте Zap «SMS при новом пожертвовании» {#2-build-the-text-on-new-gift-zap}

1. **Триггер** — B1.church: New Donation
2. **Действие** — B1.church: Find Person (по `personId` из пожертвования)
3. **Действие** — Clearstream: Send Text to Number. Используйте телефон человека из шага 2 как получателя и составьте сообщение (`"Thanks for your gift, {first}! …"`).

Включите Zap. B1 регистрирует веб-хук пожертвований при активации; вы увидите `Zapier — donation.created` в **Settings → Developer → Webhooks**.

### 3. (необязательно) Возвращайте ответы в B1 как записи {#3-optional-pull-replies-back-as-b1-records}

1. **Триггер** — Clearstream: New Incoming Text
2. **Действие** — Filter by Zapier по ключевому слову — например, продолжать, только если текст сообщения начинается с `PRAY`
3. **Действие** — сохраните текст сообщения там, где его увидит ваша команда (Slack, таблица Google или задача B1). Find Person в B1 ищет людей только по id, адресу электронной почты или имени, но не по телефону, поэтому сопоставьте ответ с человеком в B1 вручную (или добавьте GET-запрос из Webhooks by Zapier к конечной точке B1 `/membership/people/search/phone?number=…`).

## Типичные рецепты {#common-recipes}

### Вызов команды волонтёров {#volunteer-team-paging}

- **Триггер** — B1.church: New Form Submission (с фильтром по id формы молитвенной просьбы)
- **Действие** — Clearstream: Send Text to List, где список — ваша дежурная пастырская команда. Составьте текст как `New prayer request: {data.questions.0.answer}`.

### Последовательность для гостей, пришедших впервые {#first-time-visitor-follow-up-sequence}

- **Триггер** — B1.church: New Person с фильтром по статусу членства (например, *Visitor*)
- **Действие** — Clearstream: Add Subscriber to Automated Workflow. Сопоставьте id рабочего процесса с готовой семидневной серией SMS.

### Присоединение к группе по ключевому слову {#keyword-driven-group-join}

- **Триггер** — Clearstream: New Incoming Text (фильтр по ключевому слову `MENS`)
- **Действие** — B1.church: Create Person по имени и телефону отправителя (Find Person в B1 не умеет искать людей по телефону, поэтому позже проверьте дубликаты в **People**)
- **Действие** — B1.church: Add Group Member в группу «Men's Ministry»

## Ограничения и примечания {#limits--notes}

- **Clearstream тарифицирует SMS по сообщениям.** Каждое действие Send Text расходует один или несколько кредитов в зависимости от длины и количества получателей — проверьте лимит вашего тарифа.
- **Телефон должен быть в формате E.164** (например, `+15555550199`) для *Send Text to Number*. Запись человека в B1 хранит то, что было введено; если вы не можете гарантировать формат, используйте шаг *Formatter by Zapier — Numbers → Format Phone Number*.
- **Со стороны B1 заголовок не нужен** — авторизация Clearstream полностью находится внутри подключения Zapier.

## Устранение неполадок {#troubleshooting}

- **Триггер никогда не срабатывает** — в `Settings → Developer → Webhooks` должна появиться строка `Zapier — <event>` после включения Zap. Если её нет, в API-ключе B1 не хватает `settings:write`. Создайте ключ заново и подключите его снова.
- **Clearstream возвращает «Invalid phone number»** — поле получателя не в формате E.164. Добавьте шаг Format Phone Number.
- **Send Text to List завершается с `403`** — у пользователя API Clearstream нет прав на этот список или id списка неверен. Id списков видны на странице сведений о списке в Clearstream.

## См. также {#see-also}

- [Text In Church](./text-in-church.md) — альтернативная платформа SMS с похожей схемой связки
- [Mobile Message](./mobile-message.md) — для церквей вне США
- [Zapier (обзор)](../zapier.md) — сторона B1 в каждом рецепте Zapier
- [Документация API Clearstream](https://api-docs.clearstream.io/) — для собственных интеграций помимо приложения Zapier
