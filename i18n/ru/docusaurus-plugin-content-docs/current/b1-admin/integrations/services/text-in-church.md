---
title: "Text In Church"
description: "Свяжите B1 Admin и Text In Church через Zapier: получите ключ API, создайте Zap «карточка контакта → B1» и синхронизируйте членство в группах."
---

# Text In Church

<div class="article-intro">

[Text In Church](https://textinchurch.com) объединяет SMS с серийными рабочими процессами и автоматизацией карточек контакта. Его приложение для Zapier поддерживает оба направления: события B1 можно передавать в рабочий процесс Text In Church, а триггеры карточек контакта или новых контактов — обратно в B1.

</div>

<div class="prereqs">
<h4>Прежде чем начать</h4>

- Учётная запись [Text In Church](https://textinchurch.com) с тарифом, который включает интеграцию с Zapier
- Учётная запись [Zapier](https://zapier.com)
- Пользователь B1Admin с правом **Edit Settings**

</div>

## Что можно связать {#what-you-can-wire-up}

| Направление | Триггер | Действие |
|---|---|---|
| B1 → Text In Church | B1 `person.created` | Create/Update Person + Add to Group |
| B1 → Text In Church | B1 `form.submission.created` | Отправить SMS через соответствующую команду |
| B1 → Text In Church | B1 `group.member.added` | Add to Group (зеркальное членство в группе) |
| Text In Church → B1 | Connect Card Submitted | B1: Create Person + Add Group Member |
| Text In Church → B1 | Person Created | B1: Create Person |
| Text In Church → B1 | Person Joined Group | B1: Add Group Member |

Действия Text In Church также включают *Send Text Message*, *Send Voice Broadcast*, *Create Task*, *Find Person/Group* и добавление/удаление участников группы.

## Настройка {#setup}

### 1. Создайте API-ключ B1 {#1-mint-a-b1-api-key}

**Settings → Developer → API Keys → New API Key**:

- `settings:write` — нужен, чтобы подключить ключ к Zapier и для Zap, которые запускаются событиями B1
- `people:read`, `people:write` — чтобы найти или создать человека
- `groups:write` — для синхронизации групп
- (необязательно) `donations:write`, если вы передаёте подтверждения пожертвований в TIC

### 2. Подключите Text In Church к Zapier {#2-connect-text-in-church-to-zapier}

Следуйте [руководству по интеграции Text In Church с Zapier](https://help.textinchurch.com/en/articles/3943363-text-in-church-s-zapier-integration). Токен API создаётся в панели TIC.

### 3. Создайте Zap «карточка контакта → B1» {#3-build-the-connect-card-to-b1-zap}

Это самое частое направление. Карточки контакта, отправленные из TIC, автоматически становятся новыми людьми в B1.

1. **Триггер** — Text In Church: Connect Card Submitted.
2. **Действие** — B1.church: Find Person (по адресу электронной почты).
3. **Действие** — B1.church: Add Group Member в группу «New Contact», с id человека из шага 2.

Find Person в B1 останавливает Zap с ошибкой «No person found», если совпадений нет, поэтому Path не может ветвиться по этому условию. Для новых контактов включите в Zapier обработку ошибок для шага Find Person и в её пути ошибки выполните B1.church: Create Person, затем Add Group Member.

Включите Zap. Следующая карточка контакта, отправленная через TIC, автоматически появится в **B1Admin → People**.

## Типичные рецепты {#common-recipes}

### Запустить рабочий процесс в стиле карточки контакта из формы B1 {#trigger-a-connect-card-style-workflow-from-a-b1-form}

- **Триггер** — B1.church: New Form Submission (фильтр по id формы «I'm new here»)
- **Действие** — Text In Church: Create/Update Person, сопоставив ответы формы на email / телефон / имя
- **Действие** — Text In Church: Add to Group, где к группе привязан готовый приветственный рабочий процесс

### Зеркалирование членства в группе {#mirror-group-membership}

- **Триггер** — B1.church: New Group Member, с фильтром по конкретному `groupId`
- **Действие** — Text In Church: Add to Group (тот же человек, зеркальная группа). Добавьте Zap с `group.member.removed`, если нужна полная синхронизация.

### Оповестить руководителя, когда кто-то присоединяется {#page-a-leader-when-someone-joins}

- **Триггер** — B1.church: New Group Member
- **Действие** — Text In Church: Send Text Message, получатель — телефон руководителя группы, текст — `"{first} {last} just joined {group}"`.

## Ограничения и примечания {#limits--notes}

- **Приложение TIC для Zapier доступно не на всех тарифах.** Если интеграция Zapier неактивна в панели TIC, обратитесь в поддержку TIC, чтобы включить её на вашем тарифе.
- **Id групп — это id TIC, а не B1.** При зеркалировании вам придётся где-то вести таблицу соответствия (Zapier *Lookup Table* или жёстко заданные значения в каждом Zap).
- **Send Text Message расходует кредиты.** Каждый Zap, который отправляет *Send Text*, расходует ваш лимит SMS TIC.

## Устранение неполадок {#troubleshooting}

- **Триггер карточки контакта не срабатывает** — TIC требует включённого переключателя интеграции с Zapier. Также проверьте, что форма, которой вы тестировали, настроена как «Connect Card», а не как обычный опрос.
- **Create Person в B1 завершается с 401** — API-ключ неверен, отозван или не содержит `people:write`. Создайте ключ заново.
- **Дублирующиеся люди в B1** — TIC отправляет и *Person Created*, и *Connect Card Submitted* для одного события. Выберите одно из них в качестве источника истины и добавьте Zapier Filter для другого.

## См. также {#see-also}

- [Clearstream](./clearstream.md) — альтернативная платформа SMS с похожей схемой Zapier
- [Zapier (обзор)](../zapier.md) — сторона B1 в каждом рецепте Zapier
- [Руководство по Zapier для Text In Church](https://help.textinchurch.com/en/articles/3943363-text-in-church-s-zapier-integration) (документация TIC)
