---
title: "Mailchimp"
---

# Mailchimp

<div class="article-intro">

Передавайте новых людей B1, доноров или участников групп в аудиторию Mailchimp, так чтобы следующая приветственная серия, призыв в конце года или информационный бюллетень волонтеров извлекали из списка, который всегда актуален. B1 не имеет встроенной синхронизации Mailchimp -- проводка полностью находится в Zapier (или Make): B1 запускает событие, Mailchimp принимает подписчика.

</div>

<div class="prereqs">
<h4>Перед тем как начать</h4>

- Аккаунт [Mailchimp](https://mailchimp.com) с по крайней мере одной аудиторией, в которую вы хотите отправлять людей B1
- Аккаунт [Zapier](https://zapier.com) (бесплатный уровень охватывает малые церкви)
- Пользователь B1Admin с разрешением **Edit Settings**, чтобы вы могли создать ключ API

</div>

## Что вы можете подключить

| Направление | Триггер B1 | Действие Mailchimp |
|---|---|---|
| B1 → Mailchimp | `person.created` | Add/Update Subscriber |
| B1 → Mailchimp | `donation.created` | Add Subscriber to Tag (например, "Gave in 2026") |
| B1 → Mailchimp | `group.member.added` | Add Subscriber to Tag с областью этой группы |
| Mailchimp → B1 | New Subscriber | B1 *Create Person* |

Сторона Mailchimp предоставляет намного больше (кампании, сегменты, автоматизация) -- см. [триггеры Zapier Mailchimp](https://zapier.com/apps/mailchimp/integrations) для полного списка. Все, что сопоставимо из конверта B1, справедливо.

## Установка

### 1. Создайте ключ API B1

В B1Admin перейдите на **Settings → Developer → API Keys → New API Key**. Дайте ему области, которые нужны Zap:

- `settings:write` -- требуется для того, чтобы триггер зарегистрировал свой webhook
- `people:read` -- так что Zap может читать имя/фамилию, электронную почту и т.д.
- (Необязательно) `people:write` если вы также планируете направление Mailchimp → B1

Сохраните и скопируйте строку `cak_…` -- она отображается только один раз.

### 2. Создайте Zap

1. **Триггер:** `B1.church — New Person`. При первом использовании Zapier просит вас *Sign in to B1.church*; вставьте ключ API.
2. **Действие:** `Mailchimp — Add/Update Subscriber`. Сопоставьте результат триггера:
   - `data.contactInfo.email` → Email Address
   - `data.name.first` → First Name
   - `data.name.last` → Last Name
   - (Необязательно) `data.id` → поле слияния Mailchimp, если вы хотите сохранить идентификатор человека B1 рядом.
3. Включите Zap. Zapier регистрирует webhook `person.created` на B1 -- проверьте в **Settings → Developer → Webhooks**, что появляется строка с названием "Zapier — person.created".

Вот и все. Добавьте человека в B1Admin для подтверждения -- новый подписчик появится в Mailchimp в течение секунд.

## Общие рецепты

### Тегируйте доноров автоматически

- **Триггер** -- B1: New Donation
- **Действие** -- B1: Find Person (поиск по `personId`) для получения электронной почты
- **Действие** -- Mailchimp: Add Subscriber to Tag (тег `Gave-2026`)

### Запустите приветственную серию для конкретной группы

- **Триггер** -- B1: New Group Member, отфильтровано по `data.groupId`
- **Действие** -- Mailchimp: Add Subscriber to Tag с названием группы; запустите существующую автоматизацию от этого тега

### Двусторонний: новые подписки Mailchimp становятся контактами B1

- **Триггер** -- Mailchimp: New Subscriber
- **Действие** -- B1: Create Person (сопоставьте First/Last/Email)

## Альтернатива Make

[Приложение Mailchimp на Make](https://www.make.com/en/integrations/mailchimp) охватывает 44 модуля -- проводка идентична, с триггером B1 *Watch Events*, заменяющим Zapier. См. [документ обзора Make](../make) для стороны B1.

## Ограничения и примечания

- **Бесплатный уровень Mailchimp ограничивает контакты и аудитории** -- Zap, который переполняет бесплатную аудиторию сверх лимита, начнет выходить с ошибкой `4xx Member limit reached`. Журналы Mailchimp делают это очевидным.
- **Mailchimp выполняет дедупликацию по электронной почте**, поэтому повторное запуск Zap на том же человеке B1 обновляет его на месте; это не создает дубликаты.
- **Отписи от Mailchimp не возвращаются в B1.** Если вы хотите, чтобы отписи Mailchimp очищали предпочтение "Send Mail" B1, явно создайте обратный Zap.

## Устранение неполадок

- **Zap никогда не срабатывает** -- проверьте `Settings → Developer → Webhooks` на строке `Zapier — person.created`. Если отсутствует, ключ API не имел `settings:write`, когда Zap включился. Переиздайте, переподключитесь, переключите Zap выключено и включено.
- **Предупреждение `Member exists` на Add/Update** -- измените действие с *Add Subscriber* на *Add/Update Subscriber* (глагол имеет значение). Вариант upsert идемпотентен.
- **Имя / фамилия появляются пусто** -- `data.name.first` и `data.name.last` B1 заполняются только если эти поля установлены для человека. Сопоставьте `data.name.display` как резервный вариант.

## См. также

- [Zapier (overview)](../zapier) -- сторона B1 каждого рецепта Zapier
- [Make (overview)](../make) -- то же самое, визуальный конструктор
- [Webhooks (developer reference)](/docs/developer/api/webhooks#event-catalog)
