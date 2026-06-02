---
title: "Text In Church"
---

# Text In Church

<div class="article-intro">

[Text In Church](https://textinchurch.com) объединяет SMS плюс капельные рабочие процессы и автоматизации connect-card. Его приложение Zapier предоставляет оба направления — отправляйте события B1 в рабочий процесс Text In Church, и вытягивайте триггеры connect-card или новых контактов на другой стороне в B1.

</div>

<div class="prereqs">
<h4>Перед началом</h4>

- Аккаунт [Text In Church](https://textinchurch.com) на плане, включающем интеграцию Zapier
- Аккаунт [Zapier](https://zapier.com)
- Пользователь B1Admin с разрешением **Edit Settings**

</div>

## Что вы можете подключить

| Направление | Триггер | Действие |
|---|---|---|
| B1 → Text In Church | B1 `person.created` | Create/Update Person + Add to Group |
| B1 → Text In Church | B1 `form.submission.created` | Send Text Message через соответствующую команду |
| B1 → Text In Church | B1 `group.member.added` | Add to Group (зеркало членства в группе) |
| Text In Church → B1 | Connect Card Submitted | B1: Create Person + Add Group Member |
| Text In Church → B1 | Person Created | B1: Create Person |
| Text In Church → B1 | Person Joined Group | B1: Add Group Member |

Действия Text In Church также включают *Send Text Message*, *Send Voice Broadcast*, *Create Task*, *Find Person/Group*, и добавление/удаление членства в группе.

## Настройка

### 1. Создайте B1 API-ключ

**Settings → Developer → API Keys → New API Key**:

- `settings:write` — требуется для Zaps, запущенных B1
- `people:read`, `people:write` — для поиска или создания человека
- `groups:write` — для синхронизации групп
- (Опционально) `donations:write`, если вы подключаете подтверждения подарков к TIC

### 2. Подключите Text In Church к Zapier

Следуйте [руководству интеграции Zapier Text In Church](https://help.textinchurch.com/en/articles/3943363-text-in-church-s-zapier-integration). Они генерируют API токен из панели управления TIC.

### 3. Создайте Zap connect-card-to-B1

Наиболее распространенное направление. Connect cards отправленные от TIC автоматически становятся новыми людьми B1.

1. **Trigger** — Text In Church: Connect Card Submitted.
2. **Action** — B1.church: Find Person (по электронной почте).
3. **Path** — ветвь на найдено / не найдено:
   - Not found → B1.church: Create Person.
   - Found → продолжайте.
4. **Action** — B1.church: Add Group Member в группу "New Contact".

Включите Zap. Следующая connect card отправленная через TIC попадает в **B1Admin → People** автоматически.

## Обычные рецепты

### Запустите рабочий процесс в стиле connect-card из формы B1

- **Trigger** — B1.church: New Form Submission (filter на id формы "I'm new here")
- **Action** — Text In Church: Create/Update Person, отображая ответы электронной почты / телефона / имени формы
- **Action** — Text In Church: Add to Group, где группа имеет предварительно построенный рабочий процесс приветствия, прикрепленный

### Зеркало членства в группе

- **Trigger** — B1.church: New Group Member, отфильтровано на конкретный `groupId`
- **Action** — Text In Church: Add to Group (тот же человек, зеркало группа). Объедините с `group.member.removed` Zap, если вы хотите полную синхронизацию.

### Вызовите лидера, когда кто-то присоединяется

- **Trigger** — B1.church: New Group Member
- **Action** — Text In Church: Send Text Message, получатель = телефон лидера группы, тело = `"{first} {last} just joined {group}"`.

## Ограничения и примечания

- **Приложение Zapier TIC заблокировано за уровень плана.** Если интеграция Zapier затемнена в панели управления TIC, свяжитесь с поддержкой TIC, чтобы включить его на вашем плане.
- **Ids групп это TIC's, не B1's.** При зеркалировании вы будете поддерживать таблицу отображения где-то (*Lookup Table* Zapier, или жестко закодировано per-Zap).
- **Send Text Message стоит кредитов.** Каждый Zap, который срабатывает *Send Text* потребляет из вашего выделения SMS TIC.

## Устранение неполадок

- **Connect-Card триггер не срабатывает** — TIC требует переключения интеграции Zapier. Также проверьте, что форма, которую вы тестировали, настроена как "Connect Card", не как общий опрос.
- **Create Person в B1 не удается с 401** — API-ключ неправильный, отозванный или отсутствует `people:write`. Пересоздайте.
- **Дублированные люди B1** — TIC отправляет и *Person Created*, и *Connect Card Submitted* для того же события. Выберите один как источник истины и добавьте Zapier Filter на другой.

## См. также

- [Clearstream](./clearstream) — альтернативная платформа SMS с похожей формой Zapier
- [Zapier (обзор)](../zapier) — B1 сторона каждого рецепта Zapier
- [Руководство Zapier Text In Church](https://help.textinchurch.com/en/articles/3943363-text-in-church-s-zapier-integration) (документы TIC)
