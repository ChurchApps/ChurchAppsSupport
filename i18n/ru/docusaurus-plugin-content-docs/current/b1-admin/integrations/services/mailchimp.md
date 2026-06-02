---
title: "Mailchimp"
---

# Mailchimp

<div class="article-intro">

Направляйте новых людей B1, дающих или членов группы в аудиторию Mailchimp, чтобы следующая серия приветствия, обращение в конце года или информационный бюллетень волонтеров извлекали из списка, который всегда актуален. Подключение полностью находится в Zapier (или Make) — B1 срабатывает событие, Mailchimp поглощает подписчика.

</div>

<div class="prereqs">
<h4>Перед началом</h4>

- Аккаунт [Mailchimp](https://mailchimp.com) с по крайней мере одной аудиторией, в которую вы хотите, чтобы люди B1 были отправлены
- Аккаунт [Zapier](https://zapier.com) (бесплатный уровень охватывает небольшие церкви)
- Пользователь B1Admin с разрешением **Edit Settings**, чтобы вы могли создать API-ключ

</div>

## Что вы можете подключить

| Направление | Триггер B1 | Действие Mailchimp |
|---|---|---|
| B1 → Mailchimp | `person.created` | Add/Update Subscriber |
| B1 → Mailchimp | `donation.created` | Add Subscriber to Tag (например "Gave in 2026") |
| B1 → Mailchimp | `group.member.added` | Add Subscriber to Tag scoped на эту группу |
| Mailchimp → B1 | New Subscriber | B1 *Create Person* |

Сторона Mailchimp предоставляет много больше (кампании, сегменты, автоматизации) — см. [триггеры Zapier Mailchimp](https://zapier.com/apps/mailchimp/integrations) для полного списка. Все отображаемое из конверта B1 это справедливо.

## Настройка

### 1. Создайте B1 API-ключ

В B1Admin перейдите в **Settings → Developer → API Keys → New API Key**. Дайте ему области, которые требует Zap:

- `settings:write` — требуется для регистрации вебхука триггера
- `people:read` — чтобы Zap мог прочитать имя, фамилию, электронную почту и т. д.
- (Опционально) `people:write`, если вы также планируете направление Mailchimp → B1

Сохраните и скопируйте строку `cak_…` — она показывается только один раз.

### 2. Создайте Zap

1. **Trigger:** `B1.church — New Person`. При первом использовании Zapier просит вас *Sign in to B1.church*; вставьте API-ключ.
2. **Action:** `Mailchimp — Add/Update Subscriber`. Отобразите выход триггера:
   - `data.contactInfo.email` → Email Address
   - `data.name.first` → First Name
   - `data.name.last` → Last Name
   - (Опционально) `data.id` → поле слияния Mailchimp, если вы хотите сохранить id человека B1 рядом.
3. Включите Zap. Zapier регистрирует вебхук `person.created` на B1 — проверьте в **Settings → Developer → Webhooks**, что строка с именем "Zapier — person.created" появляется.

Вот и все. Добавьте человека в B1Admin для подтверждения — новый подписчик появляется в Mailchimp в течение секунд.

## Обычные рецепты

### Автоматически помечайте дающих

- **Trigger** — B1: New Donation
- **Action** — B1: Find Person (поиск по `personId`) для получения электронной почты
- **Action** — Mailchimp: Add Subscriber to Tag (tag `Gave-2026`)

### Отправляйте группе-специфическую серию приветствия

- **Trigger** — B1: New Group Member, отфильтровано по `data.groupId`
- **Action** — Mailchimp: Add Subscriber to Tag названной в честь группы; запустите вашу существующую автоматизацию с этого tag

### Двусторонний: новые подписчики Mailchimp становятся контактами B1

- **Trigger** — Mailchimp: New Subscriber
- **Action** — B1: Create Person (отобразите First/Last/Email)

## Альтернатива Make

Приложение [Mailchimp Make](https://www.make.com/en/integrations/mailchimp) охватывает 44 модуля — подключение идентично, с триггером B1 *Watch Events* заменяя Zapier's. См. документ [обзор Make](../make) для стороны B1.

## Ограничения и примечания

- **Бесплатный уровень Mailchimp ограничивает контакты и аудитории** — Zap, который наводняет свободную аудиторию сверх лимита, начнет выдавать ошибки с `4xx Member limit reached`. Журналы Mailchimp делают это очевидным.
- **Mailchimp дедуплицирует по электронной почте**, так что повторное выполнение Zap на том же человеке B1 обновляет их на месте; это не создает дубликатов.
- **Отписки из Mailchimp не текут обратно в B1.** Если вы хотите, чтобы отписки Mailchimp очистили предпочтение "Send Mail" B1, явно создайте обратный Zap.

## Устранение неполадок

- **Zap никогда не срабатывает** — проверьте `Settings → Developer → Webhooks` для строки `Zapier — person.created`. Если отсутствует, API-ключ отсутствовал `settings:write`, когда Zap включился. Пересоздайте, подключите заново, переключите Zap выключено и включено.
- **`Member exists` предупреждение на Add/Update** — переключитесь с действия *Add Subscriber* на *Add/Update Subscriber* (глагол имеет значение). Вариант upsert идемпотентный.
- **Имя/фамилия пришли пусты** — B1's `data.name.first` и `data.name.last` заполняются только если эти поля установлены на человека. Отобразите `data.name.display` как fallback.

## См. также

- [Zapier (обзор)](../zapier) — B1 сторона каждого рецепта Zapier
- [Make (обзор)](../make) — то же самое, визуальный конструктор
- [Webhooks (справка разработчика)](/docs/developer/api/webhooks#event-catalog)
