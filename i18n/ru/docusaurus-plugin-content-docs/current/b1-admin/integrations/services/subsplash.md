---
title: "Subsplash"
---

# Subsplash

<div class="article-intro">

Если вы используете Subsplash для вашего приложения церкви, пожертвований или форм, но хотите B1 как систему записи для людей и пожертвований, приложение Zapier Subsplash может отправлять пожертвования, новые профили и ответы форм в B1 в реальном времени. Обратите внимание, что приложение Zapier Subsplash в настоящее время **триггеры-только** — подключение это одностороннее (Subsplash → B1).

</div>

<div class="prereqs">
<h4>Перед началом</h4>

- Аккаунт Subsplash на плане, который включает доступ **API + Zapier** (проверьте с вашим менеджером Subsplash Client Success — эти входят за уровень плана)
- Аккаунт [Zapier](https://zapier.com)
- Пользователь B1Admin с разрешением **Edit Settings**

</div>

## Что вы можете подключить

Все триггеры ниже это триггеры Subsplash. Действия это B1's.

| Триггер Subsplash | Действие B1 |
|---|---|
| New Donation | Find Person → Add Donation (Create Person если отсутствует) |
| New Pledge | Add Donation (с `notes` = "Pledge: …") |
| New Person Created | Create Person |
| Person Updated Profile | (никакое прямое действие B1 — логируйте в Google Sheet для ручного обзора) |
| New Form Response | Create Person + (опционально) Add Group Member на основе формы |

Subsplash → B1 это единственное направление, которое поддерживает приложение Subsplash прямо сейчас.

## Настройка

### 1. Создайте B1 API-ключ

В B1Admin: **Settings → Developer → API Keys → New API Key**. Области:

- `people:read` — для поиска дающего по электронной почте
- `people:write` — для создания их, если они не существуют
- `donations:write` — для записи подарка
- (Никакой `settings:write` не требуется — Subsplash, не B1, владеет триггером здесь.)

### 2. Подключите Subsplash к Zapier

Следуйте [руководству интеграции Zapier Subsplash](https://support.subsplash.com/en/articles/9825926-zapier-integration). Они выдают API токен из панели управления Subsplash, который Zapier использует для аутентификации стороны триггера.

### 3. Создайте "запись пожертвования" Zap

1. **Trigger** — Subsplash: New Donation
2. **Action** — B1.church: Find Person (по электронной почте)
3. **Filter / Path** — ветвь на "person found":
   - **Found:** B1.church: Add Donation. Отобразите сумму, дату, фонд, метод = "Online", заметки = id транзакции Subsplash.
   - **Not found:** B1.church: Create Person → B1.church: Add Donation (используя id новосозданного человека).

Включите Zap. Будущие пожертвования Subsplash текут в **B1Admin → Donations** в течение секунд.

## Обычные рецепты

### Отправьте благодарность, когда приходит первый подарок

- **Trigger** — Subsplash: New Donation
- **Action** — Filter by Zapier: продолжайте только если это первый подарок дающего (используйте *Lookup Table* на адресе электронной почты дающего против Google Sheet прошлых дающих, или Zapier *Paths* шаг на дате создания дающего)
- **Action** — Mailchimp / SMTP / SendGrid: отправьте сообщение благодарности за первый подарок
- **Action** — B1.church: Add Donation (как обычно)

### Отфильтруйте обещания от потока обычного пожертвования

- **Trigger** — Subsplash: New Pledge
- **Action** — B1.church: Add Donation с `notes = "Pledge — Subsplash"` и фондом называемым `Pledges` (отдельно от вашего операционного фонда), чтобы вы могли независимо сообщать об обещаниях в **B1Admin → Donations → Reports**.

### Синхронизируйте новых пользователей приложения как людей B1

- **Trigger** — Subsplash: New Person Created
- **Action** — B1.church: Create Person, заполняя имя, электронную почту, телефон. Пометьте в B1, добавив нового человека в группу типа "Subsplash App Users".

## Ограничения и примечания

- **Приложение Zapier Subsplash это триггеры-только.** Если вы хотите изменения B1-стороны (например новый человек B1 попадает в Subsplash тоже), вам нужно было бы создать тот мост из триггеров приложения B1 Zapier, вызывающих REST API Subsplash через действие *Webhooks by Zapier — POST* пользователя. Это пользовательская интеграция, не рецепт.
- **Доступ API это план-зависим.** Если соединение Zapier не удается с `403 Forbidden`, ваш план Subsplash, вероятно, не включает доступ API — свяжитесь с вашим менеджером Client Success.
- **Отображение фонда это ручное.** Subsplash передает название кампании или категории; B1 требует id числового фонда. Либо жестко закодируйте фонд в Zap, либо поддерживайте *Lookup Table* Zapier отображение кампаний Subsplash на фонды B1.

## Устранение неполадок

- **Никакой триггер не срабатывает после пожертвования** — проверьте на панели управления Zapier Subsplash, что соединение все еще показывает *Connected*. Если API токен был повернут со стороны Subsplash, Zap молчаливо останавливается; подключите заново.
- **B1 *Add Donation* не удается с 422** — чаще всего отсутствующий или нераспознанный `fundId`. Перечислите ваши фонды в **B1Admin → Donations → Funds** и скопируйте точный id в шаг Zap.
- **Первый подарок срабатывает дважды** — Subsplash иногда переподсылает триггер, если Zapier пропустил его ack. Добавьте *Filter by Zapier* на id пожертвования (Subsplash отправляет один в полезной нагрузке) для удаления дубликатов.

## См. также

- [Donorbox](./donorbox) — то же самое форма рецепта, другая платформа пожертвований
- [Zapier (обзор)](../zapier) — B1 сторона каждого рецепта Zapier
- [Руководство интеграции Zapier Subsplash](https://support.subsplash.com/en/articles/9825926-zapier-integration) (документы Subsplash)
