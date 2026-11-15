---
title: "Subsplash"
description: "Подключите пожертвования, новых людей и ответы форм Subsplash к B1 через Zapier, чтобы подарки и профили автоматически попадали в B1 Admin."
---

# Subsplash

<div class="article-intro">

Если вы используете Subsplash для приложения церкви, пожертвований или форм, но хотите, чтобы B1 была системой учёта людей и пожертвований, приложение Subsplash для Zapier может в реальном времени передавать в B1 пожертвования, новые профили и ответы форм. Учтите, что приложение Subsplash для Zapier сейчас поддерживает **только триггеры** — связь односторонняя (Subsplash → B1).

</div>

<div class="prereqs">
<h4>Прежде чем начать</h4>

- Учётная запись Subsplash с тарифом, который включает доступ к **API + Zapier** (уточните у вашего менеджера по работе с клиентами Subsplash — эти функции зависят от тарифа)
- Учётная запись [Zapier](https://zapier.com)
- Пользователь B1Admin с правом **Edit Settings**

</div>

## Что можно связать {#what-you-can-wire-up}

Все перечисленные ниже триггеры принадлежат Subsplash. Действия — из B1.

| Триггер Subsplash | Действие B1 |
|---|---|
| New Donation | Find Person → Add Donation (Create Person, если человека нет) |
| New Pledge | Add Donation (с `notes` = «Pledge: …») |
| New Person Created | Create Person |
| Person Updated Profile | (нет прямого действия в B1 — записывать в таблицу Google для ручной проверки) |
| New Form Response | Create Person + (при необходимости) Add Group Member в зависимости от формы |

Направление Subsplash → B1 — единственное, которое сейчас поддерживает приложение Subsplash.

## Настройка {#setup}

### 1. Создайте API-ключ B1 {#1-mint-a-b1-api-key}

В B1Admin: **Settings → Developer → API Keys → New API Key**. Области:

- `people:read` — чтобы найти жертвователя по адресу электронной почты
- `people:write` — чтобы создать его, если его нет
- `donations:write` — чтобы записать пожертвование
- `settings:write` — Zapier проверяет каждый ключ B1 по списку веб-хуков B1 при подключении, поэтому без неё подключение не пройдёт (хотя триггер здесь принадлежит Subsplash, а не B1)

### 2. Подключите Subsplash к Zapier {#2-connect-subsplash-to-zapier}

Следуйте [руководству по интеграции Subsplash с Zapier](https://support.subsplash.com/en/articles/9825926-zapier-integration). Они выдают API-токен в панели Subsplash, который Zapier использует для аутентификации стороны триггеров.

### 3. Создайте Zap «записать пожертвование» {#3-build-the-record-a-donation-zap}

1. **Триггер** — Subsplash: New Donation
2. **Действие** — B1.church: Find Person (по адресу электронной почты)
3. **Действие** — B1.church: Add Donation, с id человека из шага 2. Сопоставьте сумму, дату, фонд, method = «Online», notes = id транзакции Subsplash.

Find Person в B1 останавливает Zap с ошибкой «No person found», если совпадений нет, поэтому шаг Filter или Path не может ветвиться по этому условию. Чтобы обработать пожертвования от новых жертвователей, включите в Zapier обработку ошибок для шага Find Person и в её пути ошибки выполните B1.church: Create Person → B1.church: Add Donation (с id только что созданного человека).

Включите Zap. Последующие пожертвования Subsplash за несколько секунд появятся в **B1Admin → Donations**.

## Типичные рецепты {#common-recipes}

### Отправить благодарность, когда приходит первое пожертвование {#send-a-thank-you-when-a-first-time-gift-lands}

- **Триггер** — Subsplash: New Donation
- **Действие** — Filter by Zapier: продолжать, только если это первое пожертвование жертвователя (используйте *Lookup Table* по адресу электронной почты жертвователя в таблице Google со списком прошлых жертвователей либо шаг Zapier *Paths* по дате создания жертвователя)
- **Действие** — Mailchimp / SMTP / SendGrid: отправить благодарственное письмо за первое пожертвование
- **Действие** — B1.church: Add Donation (как обычно)

### Вынести обещания (pledges) из обычного потока пожертвований {#filter-pledges-off-the-regular-giving-flow}

- **Триггер** — Subsplash: New Pledge
- **Действие** — B1.church: Add Donation с `notes = "Pledge — Subsplash"` и фондом `Pledges` (отдельным от операционного фонда), чтобы отчитываться по обещаниям независимо в **B1Admin → Donations → Summary**.

### Синхронизировать новых пользователей приложения как людей B1 {#sync-new-app-users-as-b1-people}

- **Триггер** — Subsplash: New Person Created
- **Действие** — B1.church: Create Person с именем, адресом электронной почты и телефоном. Пометьте нового человека в B1, добавив его в группу, например «Subsplash App Users».

## Ограничения и примечания {#limits--notes}

- **Приложение Subsplash для Zapier поддерживает только триггеры.** Если вам нужны изменения на стороне B1 (например, чтобы новый человек из B1 появлялся и в Subsplash), придётся построить этот мост: от триггеров приложения B1 для Zapier вызывать REST API Subsplash через пользовательское действие *Webhooks by Zapier — POST*. Это собственная интеграция, а не рецепт.
- **Доступ к API зависит от тарифа.** Если подключение Zapier завершается с `403 Forbidden`, скорее всего, ваш тариф Subsplash не включает доступ к API — обратитесь к менеджеру по работе с клиентами.
- **Сопоставление фондов выполняется вручную.** Subsplash передаёт название кампании или категории, а B1 требует один из собственных фондов. Либо выберите фонд в выпадающем списке **Fund** шага Add Donation, либо поддерживайте в Zapier *Lookup Table*, которая сопоставляет кампании Subsplash с фондами B1.

## Устранение неполадок {#troubleshooting}

- **После пожертвования не срабатывает ни один триггер** — проверьте в панели Zapier для Subsplash, что подключение всё ещё показывает *Connected*. Если API-токен был перевыпущен на стороне Subsplash, Zap молча останавливается; переподключите его.
- **B1 *Add Donation* записывает пожертвование без фонда** — поле **Fund** было пустым или сопоставлено со значением, которое не является id фонда B1. Выберите фонд в выпадающем списке **Fund** шага (там перечислены фонды из **Donations > Funds** в B1Admin) или настройте Lookup Table, которая выводит id фондов B1.
- **Первое пожертвование срабатывает дважды** — Subsplash иногда повторно доставляет триггер, если Zapier пропустил подтверждение. Добавьте *Filter by Zapier* по id пожертвования (Subsplash передаёт его в полезной нагрузке), чтобы отбросить дубликаты.

## См. также {#see-also}

- [Donorbox](./donorbox.md) — та же схема рецепта, другая платформа пожертвований
- [Zapier (обзор)](../zapier.md) — сторона B1 в каждом рецепте Zapier
- [Руководство по интеграции Subsplash с Zapier](https://support.subsplash.com/en/articles/9825926-zapier-integration) (документация Subsplash)
