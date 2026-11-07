---
title: "ChatGPT"
description: "Підключіть ChatGPT до даних вашої церкви в B1 через ключ API, щоб ставити звичайною мовою питання про людей, пожертви та відвідуваність у B1 Admin."
---

# ChatGPT

<div class="article-intro">

Підключіть ChatGPT до даних вашої церкви в B1 і ставте йому запитання звичайною мовою — він відповідатиме на основі актуальних записів вашої церкви. Ви також можете попросити його допомогти з завданнями, які в B1 Admin вимагають кількох кроків.

**Що можна запитати:**
- *"Покажи всіх, хто відвідав службу минулого тижня, але ще не закріплений за малою групою"*
- *"Підсумуй пожертви цього місяця за фондами"*
- *"Хто в нас найновіші члени і чи ми з ними вже зв'язалися?"*
- *"Я не можу зрозуміти, як зробити X у B1 — можеш покроково пояснити?"*

</div>

<div class="prereqs">
<h4>Що вам знадобиться</h4>

- **Настільний застосунок ChatGPT** для Mac або Windows
- **Платний план ChatGPT** (Plus або вищий). Безкоштовні облікові записи ChatGPT не можуть підключатися до B1.
- **Ваш логін до B1** з правом керувати налаштуваннями церкви (потрібен, щоб створити ключ). Немає доступу? Зверніться до адміністратора B1 вашої церкви.

</div>

:::tip Рекомендовано: спершу спробуйте Claude — це безкоштовно
[Claude](./claude.md) підключається до B1 на **безкоштовному плані** і налаштовується менш ніж за 3 хвилини — просто додайте B1 як конектор і увійдіть зі своїм обліковим записом B1. Ключ не потрібен. Це найпростіший спосіб для вашої церкви спробувати ШІ з B1 до будь-яких витрат.
:::

## Налаштування

Екрани у вашій версії ChatGPT можуть виглядати трохи інакше.

---

**Крок 1 — Створіть свій ключ B1**

Ключ дозволяє ChatGPT працювати з *даними вашої* церкви в B1 — думайте про нього як про пароль, призначений лише для ChatGPT.

1. Увійдіть до [B1 Admin](https://admin.b1.church) і перейдіть до [Налаштування → Розробнику](https://admin.b1.church/settings/developer).
2. На вкладці **API Keys** натисніть **New API Key** і назвіть його `ChatGPT`.
3. **Дозволи (Scopes):** позначте, що ChatGPT може робити. Для кожної області є прапорець **read** (лише перегляд) і прапорець **write** (внесення змін). Не впевнені? Для початку позначте лише прапорці **read**.
4. Натисніть **Save**, потім **Copy** і скопіюйте ключ (він починається з `cak_`). Його показують лише один раз.

---

**Крок 2 — Натисніть на своє ім'я в нижньому лівому куті ChatGPT**

![Натисніть на ім'я профілю](/img/guides/chatgpt-mcp/01.png)

---

**Крок 3 — Натисніть Settings (Налаштування)**

![Натисніть Settings у меню](/img/guides/chatgpt-mcp/02.png)

---

**Крок 4 — Натисніть Plugins (Плагіни) на лівій бічній панелі**

![Натисніть Plugins у розділі Integrations](/img/guides/chatgpt-mcp/03.png)

---

**Крок 5 — Натисніть вкладку MCPs**

![Натисніть вкладку MCPs](/img/guides/chatgpt-mcp/04.png)

Тут ви побачите всі MCP-сервери, які вже додали.

---

**Крок 6 — Натисніть Add → Add MCP server**

![Натисніть Add, потім Add MCP server](/img/guides/chatgpt-mcp/06.png)

---

**Крок 7 — Заповніть форму і натисніть Save**

![Форма підключення до власного MCP](/img/guides/chatgpt-mcp/07.png)

Натисніть **Streamable HTTP**, потім заповніть:

| Поле | Що ввести |
|---|---|
| **Name** | `B1 Church` (або будь-яку назву на ваш вибір) |
| **Type** | Натисніть **Streamable HTTP** |
| **URL** | `https://api.churchapps.org/mcp` |
| **Bearer token env var** | Залиште порожнім |
| **Headers** | Натисніть **+ Add header** → Key: `Authorization` → Value: див. нижче |

![Приклад заповнення: Authorization у Key і Bearer-ключ у Value](/img/guides/chatgpt-mcp/08.png)

- **Key:** `Authorization`
- **Value:** `Bearer cak_yourkey` — слово Bearer, пробіл, а потім ваш ключ

Натисніть **Save**.

Готово! Поверніться до чату і запитайте щось на кшталт *"Скільки людей у нашій церкві?"* — і ChatGPT візьме відповідь безпосередньо з B1.

---

## Чи це безпечно?

- ChatGPT бачить лише дані **вашої церкви**.
- Він може робити лише те, що дозволяє ваш ключ — ключ лише з прапорцями **read** може переглядати, але ніколи нічого не змінить.
- Щоб вимкнути доступ, видаліть ключ у B1 Admin у розділі **Налаштування → Розробнику**. Доступ припиниться негайно.

## Скільки це коштує?

Підключення до B1 безкоштовне — воно входить до складу ChurchApps. Для підключення ChatGPT потрібен платний план (Plus або вищий); див. ціни OpenAI.

## Технічні деталі

Решта цієї сторінки призначена для технічних користувачів і ШІ-асистентів. MCP-сервер B1 розташований за адресою `https://api.churchapps.org/mcp` (Streamable HTTP) і приймає API-ключ як заголовок `Authorization: Bearer cak_…`. Див. [довідник розробника MCP Server](/docs/developer/api/mcp).

### Custom GPT з Actions

Custom GPT дозволяє створити окремого асистента, яким може користуватися вся ваша команда — вони відкривають посилання і починають ставити запитання без жодних налаштувань зі свого боку. Для цього потрібен обліковий запис ChatGPT Plus, Team або Enterprise і близько 10 хвилин часу.

#### 1. Створіть API-ключ

Виконайте Крок 1 з розділу «Налаштування» вище, якщо ви ще цього не зробили.

#### 2. Створіть Custom GPT

1. У ChatGPT натисніть на свій профіль → **My GPTs** → **Create a GPT**.
2. Перейдіть на вкладку **Configure**, дайте GPT назву (наприклад, "B1 Assistant") і додайте інструкції:

   ```
   You help church staff query their B1 records. Use the B1 API actions to
   look up people, groups, attendance, donations, and content. Always scope
   answers to data the user has permission to see. Be concise.
   ```

3. Прокрутіть до **Actions** → **Create new action** → **Authentication**.
   - **Authentication type:** API Key
   - **API Key:** вставте свій ключ `cak_…`
   - **Auth Type:** Bearer
   - Збережіть.

4. У поле **Schema** вставте цю стартову специфікацію OpenAPI:

   ```yaml
   openapi: 3.1.0
   info:
     title: B1 API
     version: "1.0"
   servers:
     - url: https://api.churchapps.org
   paths:
     /membership/people:
       get:
         operationId: listPeople
         summary: List people in the church
         parameters:
           - in: query
             name: firstName
             schema: { type: string }
           - in: query
             name: lastName
             schema: { type: string }
           - in: query
             name: email
             schema: { type: string }
         responses:
           "200":
             description: OK
     /membership/people/{id}:
       get:
         operationId: getPerson
         summary: Get a single person by id
         parameters:
           - in: path
             name: id
             required: true
             schema: { type: string }
         responses:
           "200":
             description: OK
     /membership/groups:
       get:
         operationId: listGroups
         summary: List groups in the church
         responses:
           "200":
             description: OK
     /giving/donations:
       get:
         operationId: listDonations
         summary: List donations
         parameters:
           - in: query
             name: personId
             schema: { type: string }
           - in: query
             name: startDate
             schema: { type: string, format: date }
           - in: query
             name: endDate
             schema: { type: string, format: date }
         responses:
           "200":
             description: OK
     /attendance/attendance:
       get:
         operationId: listAttendance
         summary: List attendance records
         parameters:
           - in: query
             name: serviceTimeId
             schema: { type: string }
           - in: query
             name: campusId
             schema: { type: string }
         responses:
           "200":
             description: OK
   ```

5. Збережіть дію. Перевірте її: *"скільки людей у церкві?"* — ChatGPT викликає `listPeople` і дає відповідь.
6. **Опублікуйте** GPT (Only me / Anyone with link / Organization) і поділіться посиланням зі своєю командою.

#### 3. Використання

Будь-хто, хто має посилання, може ставити запитання природною мовою. Дозволи ключа все одно діють — ключ лише для читання відхиляє запити на запис, незалежно від того, що написано в схемі дій.

---

### Безпека та обмеження

- **Ізоляція за церквою.** API-ключ прив'язаний лише до однієї церкви. ChatGPT не може бачити дані інших церков.
- **Обмеження дозволами.** Ключ містить лише ті дозволи (scopes), які ви надали. Якщо видалити дозвіл (видаливши й створивши ключ заново), доступ зникне з наступного виклику.
- **Миттєве відкликання.** Видаліть ключ у **Налаштування → Розробнику → API Keys**, і доступ припиниться негайно.
- **Спільний доступ до Custom GPT означає спільний доступ до даних.** Кожен, хто має доступ до GPT, бачить усе, що дозволяють дозволи ключа. Для GPT, якими ділитеся широко, краще використовувати вужчі дозволи (наприклад, не додавати `donations:read`).
- **Журнал аудиту.** Будь-які зміни, внесені через ChatGPT, проходять через той самий журнал аудиту, що і дії в B1 Admin — знайти їх можна в **Налаштування → Журнал аудиту**.

### Усунення несправностей

**Конектор MCP повідомляє "Unauthorized" або показує помилку 401:** ваш API-ключ відсутній або неправильний. Відкрийте налаштування конектора і перевірте заголовок **Authorization**: значення має бути словом `Bearer`, одним пробілом, а потім повним ключем `cak_…` без зайвих пробілів.

**ChatGPT каже, що не може знайти певні дані:** ключ, імовірно, не має потрібних дозволів. Створіть новий ключ у **Налаштування → Розробнику → API Keys** з додатковими дозволами і оновіть конектор.

**Дія Custom GPT повертає 401:** у панелі автентифікації дії переконайтеся, що вибрано **Auth Type: Bearer**, і що ключ не містить слова `Bearer` (ChatGPT додає його автоматично).

**Дія Custom GPT повертає 403:** ключ не має дозволу для цього endpoint. Створіть новий ключ із потрібними дозволами і оновіть GPT.

**Схема дії відхилена:** ChatGPT вимагає OpenAPI 3.1 щонайменше з одним записом `paths` і URL у `servers`. Перевірте YAML на [editor.swagger.io](https://editor.swagger.io) перед вставкою.

## Пов'язане

- [API Keys](/docs/developer/api/api-keys) — повний довідник дозволів
- [MCP Server (довідник розробника)](/docs/developer/api/mcp) — деталі протоколу та схеми інструментів
- [Claude](./claude.md) — та сама ідея, але для моделей Anthropic
- [Довідник REST API](/docs/developer/api/endpoints) — кожен endpoint, який може викликати дія Custom GPT
