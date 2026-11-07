---
title: "Text In Church"
---

# Text In Church

<div class="article-intro">

[Text In Church](https://textinchurch.com) поєднує SMS-розсилки, ланцюжки листів (drip) і автоматизацію контактних карток. Його застосунок для Zapier працює в обидва боки: події B1 можна передавати в робочий процес Text In Church, а контактні картки або нові контакти з нього можна передавати назад у B1.

</div>

<div class="prereqs">
<h4>Перш ніж почати</h4>

- Обліковий запис [Text In Church](https://textinchurch.com) з тарифним планом, який включає інтеграцію із Zapier
- Обліковий запис [Zapier](https://zapier.com)
- Користувач B1Admin із дозволом **Edit Settings**

</div>

## Що можна налаштувати

| Напрямок | Тригер | Дія |
|---|---|---|
| B1 → Text In Church | B1 `person.created` | Create/Update Person + Add to Group |
| B1 → Text In Church | B1 `form.submission.created` | Send Text Message via the relevant team |
| B1 → Text In Church | B1 `group.member.added` | Add to Group (mirror group membership) |
| Text In Church → B1 | Connect Card Submitted | B1: Create Person + Add Group Member |
| Text In Church → B1 | Person Created | B1: Create Person |
| Text In Church → B1 | Person Joined Group | B1: Add Group Member |

Дії Text In Church також включають *Send Text Message*, *Send Voice Broadcast*, *Create Task*, *Find Person/Group*, а також додавання до групи та видалення з неї.

## Налаштування

### 1. Створіть ключ API B1

**Settings → Developer → API Keys → New API Key**:

- `settings:write` — потрібен для Zap, які запускаються подіями B1
- `people:read`, `people:write` — для пошуку або створення особи
- `groups:write` — для синхронізації груп
- (Необов’язково) `donations:write`, якщо ви передаєте підтвердження пожертв до TIC

### 2. Підключіть Text In Church до Zapier

Дотримуйтеся [інструкції з інтеграції Text In Church із Zapier](https://help.textinchurch.com/en/articles/3943363-text-in-church-s-zapier-integration). Ключ API генерується в панелі керування TIC.

### 3. Створіть Zap для передавання контактних карток до B1

Це найпоширеніший напрямок. Контактні картки, надіслані через TIC, автоматично стають новими особами в B1.

1. **Тригер** — Text In Church: Connect Card Submitted.
2. **Дія** — B1.church: Find Person (за електронною адресою).
3. **Гілка** — розгалуження залежно від результату пошуку:
   - Не знайдено → B1.church: Create Person.
   - Знайдено → продовжити.
4. **Дія** — B1.church: Add Group Member до групи «New Contact».

Увімкніть Zap. Наступна контактна картка, надіслана через TIC, автоматично з’явиться в **B1Admin → People**.

## Типові сценарії

### Запуск робочого процесу для контактних карток із форми B1

- **Тригер** — B1.church: New Form Submission (фільтр за ідентифікатором форми «I'm new here»)
- **Дія** — Text In Church: Create/Update Person, зіставивши відповіді на форму щодо електронної пошти, телефону та імені
- **Дія** — Text In Church: Add to Group, для якої вже налаштовано попередньо створений робочий процес привітання

### Дзеркальне відображення членства в групі

- **Тригер** — B1.church: New Group Member, з фільтром за конкретним `groupId`
- **Дія** — Text In Church: Add to Group (та сама особа, дзеркальна група). Для повної синхронізації додайте Zap із `group.member.removed`.

### Повідомлення керівнику, коли хтось приєднується

- **Тригер** — B1.church: New Group Member
- **Дія** — Text In Church: Send Text Message, одержувач — телефон керівника групи, текст — `"{first} {last} just joined {group}"`.

## Обмеження та примітки

- **Застосунок TIC для Zapier доступний лише на певних тарифах.** Якщо інтеграція із Zapier неактивна в панелі TIC, зверніться до служби підтримки TIC, щоб увімкнути її для вашого плану.
- **Ідентифікатори груп — це ідентифікатори TIC, а не B1.** Для дзеркального відображення потрібно десь вести таблицю відповідностей (таблицю пошуку Zapier, *Lookup Table*, або жорстко прописану в кожному Zap).
- **Send Text Message витрачає кредити.** Кожен Zap, який надсилає текстове повідомлення, використовує ваш ліміт SMS у TIC.

## Усунення несправностей

- **Тригер Connect Card не спрацьовує** — у TIC має бути увімкнений перемикач інтеграції із Zapier. Також переконайтеся, що форма, яку ви тестуєте, налаштована як «Connect Card», а не як звичайне опитування.
- **Create Person у B1 завершується помилкою 401** — ключ API неправильний, відкликаний або без дозволу `people:write`. Створіть новий ключ.
- **Дублікати осіб у B1** — TIC надсилає і *Person Created*, і *Connect Card Submitted* для однієї події. Оберіть одну з них як джерело істини та додайте фільтр Zapier до іншої.

## Див. також

- [Clearstream](./clearstream) — альтернативна платформа SMS з подібною схемою роботи із Zapier
- [Zapier (огляд)](../zapier) — сторона B1 для кожного рецепта Zapier
- [Інструкція Text In Church для Zapier](https://help.textinchurch.com/en/articles/3943363-text-in-church-s-zapier-integration) (документація TIC)
