---
title: "ChatGPT"
---

# ChatGPT

<div class="article-intro">

Подключите ChatGPT OpenAI к данным B1 вашей церкви и позвольте ему выполнить тяжелую работу. После подключения ChatGPT может увидеть ваши живые записи церкви и помочь вам сделать то, что иначе потребовало бы несколько шагов в B1 Admin -- или что вы вообще не могли разобраться, как делать.

**Вот некоторые вещи, которые вы можете попросить его сделать:**
- *"Установите классы воскресной школы и поместите каждого учителя в правильную комнату на основе его группы"*
- *"Покажите мне всех, кто присутствовал на прошлой неделе, но не был назначен в небольшую группу"*
- *"Подведите итоги пожертвований этого месяца по фонду"*
- *"Кто наши новейшие члены и мы проследили за ними?"*
- *"Я не могу разобраться, как делать X в B1 -- можете ли вы пройти мне через это или сделать это для меня?"*

ChatGPT вытягивает ответы и принимает действия прямо из ваших данных B1, ограниченные вашей церковью.

:::tip Рекомендуется: Claude Code
Для гладкого опыта MCP, [Claude Code](./claude) рекомендуется клиент -- настройка занимает одну команду и работает из коробки. ChatGPT также работает и является отличным выбором, если ваша команда уже его использует.
:::

Поддерживаются два пути: **MCP Connector** (встроенный в ChatGPT) и **Custom GPT** для команд, которые хотят поделяемого ассистента.

</div>

<div class="prereqs">
<h4>Перед началом работы</h4>

- Администратор церкви с разрешением **Edit Settings** в B1 Admin (необходимо для создания ключа API)
- **ChatGPT Plus, Pro, Team, или Enterprise** учетная запись

</div>

## Краткое руководство по настройке

Следуйте этим шагам в **приложении ChatGPT для рабочего стола** (Mac/Windows). Экраны могут выглядеть немного по-другому в других версиях.

---

**Шаг 1 -- Сначала получите ваш ключ API от B1 Admin**

Перед касанием ChatGPT создайте ключ API в B1 Admin, чтобы у вас был готов вставить:

1. Перейдите к **Settings → Developer → API Keys** в B1 Admin
2. Нажмите **New API Key**, назовите его `ChatGPT`, выберите ваши области (начните с `people:read`, `groups:read`, `attendance:read`, `donations:read`), и нажмите **Save**
3. Скопируйте `cak_…` ключ -- он показывается только один раз

---

**Шаг 2 -- Нажмите на ваше имя в левом нижнем углу ChatGPT**

![Click your profile name](/img/guides/chatgpt-mcp/01.png)

---

**Шаг 3 -- Нажмите Settings**

![Click Settings from the menu](/img/guides/chatgpt-mcp/02.png)

---

**Шаг 4 -- Нажмите Plugins в левой боковой панели**

![Click Plugins under Integrations](/img/guides/chatgpt-mcp/03.png)

---

**Шаг 5 -- Нажмите вкладку MCPs**

![Click the MCPs tab](/img/guides/chatgpt-mcp/04.png)

Здесь вы увидите любые серверы MCP, которые вы уже добавили.

---

**Шаг 6 -- Нажмите Add → Add MCP server**

![Click Add then Add MCP server](/img/guides/chatgpt-mcp/06.png)

---

**Шаг 7 -- Заполните форму и нажмите Save**

![Connect to a custom MCP form](/img/guides/chatgpt-mcp/07.png)

Нажмите **Streamable HTTP**, затем заполните:

| Поле | Что вводить |
|---|---|
| **Name** | `B1 Church` (или любое имя, которое вам нравится) |
| **Type** | Нажмите **Streamable HTTP** |
| **URL** | `https://api.churchapps.org/mcp` |
| **Bearer token env var** | Оставить пусто |
| **Headers** | Нажмите **+ Add header** → Key: `Authorization` → Value: см. ниже |

![Filled in example showing Authorization in Key and Bearer key in Value](/img/guides/chatgpt-mcp/08.png)

- **Key:** `Authorization`
- **Value:** `Bearer cak_yourkey` -- слово Bearer, пробел, затем ваш ключ

Нажмите **Save**.

Все! Вернитесь в чат и спросите что-то вроде *"Сколько людей в нашей церкви?"* и ChatGPT вытянет ответ прямо из B1.

---

## Шаг 1 -- Создайте ключ API в B1 Admin

Каждое соединение с B1 использует ключ API, который вы создаете. Этот ключ идентифицирует вашу церковь, контролирует то, что ChatGPT может видеть, и может быть отозван в любое время.

1. Откройте **B1 Admin** и перейдите к **Settings → Developer → API Keys**.
2. Нажмите **New API Key**.
3. Дайте ключу имя -- `ChatGPT` хорошо работает.
4. Выберите области (разрешения), которые должен иметь ChatGPT. Хороший начальный набор для помощника только для чтения:
   - `people:read`
   - `groups:read`
   - `attendance:read`
   - `donations:read`
5. Нажмите **Save**.
6. Скопируйте полный ключ, который появляется -- он начинается с `cak_` и показывается **только один раз**. Вставьте его куда-то в безопасное место.

:::tip
Если вам когда-либо нужно отозвать доступ ChatGPT, вернитесь к **Settings → Developer → API Keys** и удалите ключ. Доступ заканчивается немедленно.
:::

---

## Путь A -- ChatGPT MCP Connector (Рекомендуется)

Это простейший способ подключиться. ChatGPT имеет встроенный диалог "Connect to a custom MCP", который работает непосредственно с сервером MCP B1 -- не требуется Custom GPT.

### Что вам нужно

- Ваш `cak_…` ключ из Шага 1

### Откройте MCP connector в ChatGPT

В ChatGPT перейдите к **Settings → Plugins → MCPs** и нажмите **Add → Add MCP server**.

### Заполните диалог

Нажмите **Streamable HTTP**, затем используйте эти значения:

| Поле | Значение |
|---|---|
| **Name** | `B1 Church` (или любое имя, которое вам нравится) |
| **Type** | **Streamable HTTP** |
| **URL** | `https://api.churchapps.org/mcp` |
| **Bearer token env var** | Оставить пусто |
| **Headers** | Key: `Authorization` / Value: `Bearer cak_yourprefix.yoursecret` |

Для поля Value введите слово `Bearer`, один пробел, затем вставьте ваш ключ -- все в одном поле. Пример: `Bearer cak_prefix.secret`.

Нажмите **Save**.

### Спросите ChatGPT что-то

После подключения, просто спрашивайте на простом языке -- специальные команды не нужны:

- *"Сколько людей в нашей церкви?"*
- *"Кто присоединился в последние 30 дней?"*
- *"Какие группы активны прямо сейчас?"*
- *"Подведите итоги пожертвований этого месяца по фонду."*

ChatGPT будет вызывать B1 в фоне и отвечать из ваших живых данных.

---

## Путь B -- Custom GPT с Actions

Custom GPT позволяет вам создать специализированного помощника, которым ваша целая команда может делиться -- они открывают ссылку и начинают задавать вопросы без какой-либо настройки с их стороны. Это требует учетной записи ChatGPT Plus, Team, или Enterprise и около 10 минут.

### 1. Создайте ключ API

Следуйте Шагу 1 выше, если вы еще этого не сделали.

### 2. Создайте Custom GPT

1. В ChatGPT нажмите ваш профиль → **My GPTs** → **Create a GPT**.
2. Переключитесь на вкладку **Configure**, дайте GPT имя (например, "B1 Assistant") и добавьте инструкции:

   ```
   You help church staff query their B1 records. Use the B1 API actions to
   look up people, groups, attendance, donations, and content. Always scope
   answers to data the user has permission to see. Be concise.
   ```

3. Прокрутите вниз к **Actions** → **Create new action** → **Authentication**.
   - **Authentication type:** API Key
   - **API Key:** вставьте ваш `cak_…` ключ
   - **Auth Type:** Bearer
   - Сохраните.

4. В поле **Schema**, вставьте этот начальный OpenAPI spec:

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

5. Сохраните действие. Проверьте это: *"how many people are in the church?"* -- ChatGPT вызывает `listPeople` и отвечает.
6. **Publish** GPT (Only me / Anyone with link / Organization) и поделитесь ссылкой с вашей командой.

### 3. Используйте это

Любой с ссылкой может задавать вопросы на естественном языке. Области ключа все еще применяются -- ключ только для чтения отказывает в записи независимо от того, что говорит схема действия.

---

## Безопасность и ограничения

- **Per-church isolation.** Ключ API разрешает одной церкви только. ChatGPT не может видеть данные других церквей.
- **Permission-scoped.** Ключ только содержит области, которые вы предоставили. Удаление области (путем удаления и повторного создания ключа) отрезает доступ при следующем вызове.
- **Revocable instantly.** Удалите ключ в **Settings → Developer → API Keys** и доступ заканчивается немедленно.
- **Sharing a Custom GPT shares the data.** Все с доступом к GPT могут видеть все, что области ключа позволяют. Предпочитайте более узкие области (например, опустите `donations:read`) для GPT, которыми делятся широко.
- **Audit trail.** Любые изменения, сделанные через ChatGPT, проходят через тот же журнал аудита, что и действия B1 Admin -- найдите их в **Reports → Audit Log**.

## Стоимость

ChurchApps свободен и открыт -- API, который ChatGPT вызывает, является частью того, что ваша церковь уже запускает. OpenAI взимает плату за использование ChatGPT согласно их собственным планам. Нет стоимости за вызов от ChurchApps.

## Устранение неполадок

**MCP connector говорит "Unauthorized" или показывает ошибку 401:** ваш ключ API отсутствует или неправильный. Откройте настройки соединителя и проверьте, что ключ в аргументе `Authorization:Bearer` является полным значением `cak_…` без лишних пробелов.

**ChatGPT говорит, что он не может найти определенные данные:** ключ может не иметь правильные области. Создайте новый ключ в **Settings → Developer → API Keys** с дополнительными областями и обновите соединитель.

**Команда `npx` не работает:** Node.js может быть не установлен. Загрузите и установите его с [nodejs.org](https://nodejs.org), затем попробуйте сохранить соединитель еще раз.

**Custom GPT action возвращает 401:** в панели аутентификации действия подтвердите **Auth Type: Bearer** выбран и ключ не включает слово `Bearer` (ChatGPT добавляет его автоматически).

**Custom GPT action возвращает 403:** ключ не имеет области для этой конечной точки. Создайте новый ключ с правильными областями и обновите GPT.

**The action schema is rejected:** ChatGPT требует OpenAPI 3.1 с по крайней мере одной записью `paths` и URL `servers`. Проверьте YAML на [editor.swagger.io](https://editor.swagger.io) перед вставкой.

## Связанные

- [API Keys](/docs/developer/api/api-keys) -- полная справка по области
- [MCP Server (developer reference)](/docs/developer/api/mcp) -- детали протокола и схемы инструментов
- [Claude](./claude) -- то же самое, для моделей Anthropic
- [REST API reference](/docs/developer/api/endpoints) -- каждая конечная точка, которую может вызвать действие Custom GPT
