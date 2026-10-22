---
title: "ChatGPT"
---

# ChatGPT

<div class="article-intro">

Подключите ChatGPT к данным B1 вашей церкви и задавайте ему вопросы простым языком — он отвечает на основе актуальных записей вашей церкви. Также можно попросить его помочь с задачами, которые в B1 Admin заняли бы несколько шагов.

**Вот что можно спросить:**
- *"Покажи всех, кто был на прошлой неделе, но не распределен в малую группу"*
- *"Подведи итоги пожертвований этого месяца по фондам"*
- *"Кто наши самые новые члены и связались ли мы с ними?"*
- *"Не могу разобраться, как сделать X в B1, — можешь провести меня по шагам?"*

</div>

<div class="prereqs">
<h4>Что вам понадобится</h4>

- **Настольное приложение ChatGPT** для Mac или Windows
- **Платный план ChatGPT** (Plus или выше). Бесплатные аккаунты ChatGPT не могут подключаться к B1.
- **Ваш вход в B1** с правом управлять настройками церкви (нужно, чтобы создать ключ). Нет такого доступа? Обратитесь к администратору B1 вашей церкви.

</div>

:::tip Рекомендуем: сначала попробуйте Claude — это бесплатно
[Claude](./claude) подключается к B1 на **бесплатном плане** и настраивается меньше чем за 3 минуты — просто добавьте B1 как коннектор и войдите со своей учетной записью B1. Ключ не нужен. Это самый простой способ для вашей церкви попробовать ИИ с B1, прежде чем за что-либо платить.
:::

## Настройка

В вашей версии ChatGPT экраны могут выглядеть немного иначе.

---

**Шаг 1 — Создайте ключ B1**

Ключ — это то, что пускает ChatGPT в B1 *вашей* церкви. Считайте его паролем, предназначенным только для ChatGPT.

1. Войдите в [B1 Admin](https://admin.b1.church) и перейдите в [Settings → Developer](https://admin.b1.church/settings/developer).
2. На вкладке **API Keys** нажмите **New API Key** и назовите ключ `ChatGPT`.
3. **Scopes (области):** отметьте, что разрешено ChatGPT. В каждом разделе есть флажок **read** (только просмотр) и флажок **write** (внесение изменений). Не уверены? Для начала отметьте только флажки **read**.
4. Нажмите **Save**, затем **Copy**, чтобы скопировать ключ (он начинается с `cak_`). Он показывается только один раз.

---

**Шаг 2 — Нажмите на свое имя в левом нижнем углу ChatGPT**

![Нажмите на имя своего профиля](/img/guides/chatgpt-mcp/01.png)

---

**Шаг 3 — Нажмите Settings (Настройки)**

![Нажмите Settings в меню](/img/guides/chatgpt-mcp/02.png)

---

**Шаг 4 — Нажмите Plugins (Плагины) в левой боковой панели**

![Нажмите Plugins в разделе Integrations](/img/guides/chatgpt-mcp/03.png)

---

**Шаг 5 — Откройте вкладку MCPs**

![Откройте вкладку MCPs](/img/guides/chatgpt-mcp/04.png)

Здесь вы увидите все уже добавленные серверы MCP.

---

**Шаг 6 — Нажмите Add → Add MCP server (Добавить сервер MCP)**

![Нажмите Add, затем Add MCP server](/img/guides/chatgpt-mcp/06.png)

---

**Шаг 7 — Заполните форму и нажмите Save (Сохранить)**

![Форма подключения пользовательского MCP](/img/guides/chatgpt-mcp/07.png)

Нажмите **Streamable HTTP**, затем заполните:

| Поле | Что вводить |
|---|---|
| **Name** | `B1 Church` (или любое имя на ваш выбор) |
| **Type** | Нажмите **Streamable HTTP** |
| **URL** | `https://api.churchapps.org/mcp` |
| **Bearer token env var** | Оставьте пустым |
| **Headers** | Нажмите **+ Add header** → Key: `Authorization` → Value: см. ниже |

![Заполненный пример: Authorization в поле Key и ключ с Bearer в поле Value](/img/guides/chatgpt-mcp/08.png)

- **Key:** `Authorization`
- **Value:** `Bearer cak_yourkey` — слово Bearer, пробел, затем ваш ключ

Нажмите **Save** (Сохранить).

Готово! Вернитесь в чат и спросите что-нибудь вроде *"Сколько людей в нашей церкви?"* — и ChatGPT возьмет ответ прямо из B1.

---

## Это безопасно?

- ChatGPT видит только данные **вашей церкви**.
- Он может делать только то, что разрешает ваш ключ, — ключ, в котором отмечены только флажки **read**, может просматривать данные, но никогда ничего не изменит.
- Чтобы отключить доступ, удалите ключ в B1 Admin в разделе **Settings → Developer**. Доступ прекращается сразу.

## Сколько это стоит?

Подключение к B1 бесплатно — оно входит в ChurchApps. Для подключения ChatGPT нужен платный план (Plus или выше); см. цены OpenAI.

## Технические подробности

Остальная часть страницы предназначена для технических пользователей и ИИ-ассистентов. MCP-сервер B1 находится по адресу `https://api.churchapps.org/mcp` (Streamable HTTP) и принимает API-ключ в заголовке `Authorization: Bearer cak_…`. См. [справку разработчика по MCP Server](/docs/developer/api/mcp).

### Custom GPT с Actions

Custom GPT позволяет создать отдельного помощника, которым может пользоваться вся ваша команда: достаточно открыть ссылку и начать задавать вопросы, без какой-либо настройки со своей стороны. Для этого нужна учетная запись ChatGPT Plus, Team или Enterprise и около 10 минут.

#### 1. Создайте API-ключ

Выполните шаг 1 из раздела «Настройка» выше, если еще этого не сделали.

#### 2. Создайте Custom GPT

1. В ChatGPT нажмите на свой профиль → **My GPTs** → **Create a GPT**.
2. Перейдите на вкладку **Configure**, задайте GPT имя (например, "B1 Assistant") и добавьте инструкции:

   ```
   You help church staff query their B1 records. Use the B1 API actions to
   look up people, groups, attendance, donations, and content. Always scope
   answers to data the user has permission to see. Be concise.
   ```

3. Прокрутите до **Actions** → **Create new action** → **Authentication**.
   - **Authentication type:** API Key
   - **API Key:** вставьте ваш ключ `cak_…`
   - **Auth Type:** Bearer
   - Сохраните.

4. В поле **Schema** вставьте эту начальную спецификацию OpenAPI:

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

5. Сохраните действие. Проверьте его: *"сколько людей в церкви?"* — ChatGPT вызовет `listPeople` и ответит.
6. Нажмите **Publish** (Опубликовать) для GPT (Only me / Anyone with link / Organization) и поделитесь ссылкой с командой.

#### 3. Пользуйтесь

Любой, у кого есть ссылка, может задавать вопросы на естественном языке. Области ключа по-прежнему действуют — ключ только для чтения отклоняет запись, что бы ни было указано в схеме действия.

---

### Безопасность и ограничения

- **Изоляция по церквям.** API-ключ привязан только к одной церкви. ChatGPT не может видеть данные других церквей.
- **Ограничено разрешениями.** Ключ несет только те области, которые вы предоставили. Удаление области (через удаление и повторное создание ключа) прекращает этот доступ при следующем вызове.
- **Мгновенный отзыв.** Удалите ключ в **Settings → Developer → API Keys**, и доступ немедленно прекратится.
- **Делясь Custom GPT, вы делитесь данными.** Все, у кого есть доступ к GPT, видят то, что разрешают области ключа. Для широко распространяемых GPT выбирайте более узкие области (например, не включайте `donations:read`).
- **Журнал аудита.** Любые изменения, сделанные через ChatGPT, проходят через тот же журнал аудита, что и действия в B1 Admin, — их можно найти в **Settings → Audit Log**.

### Устранение неполадок

**MCP-коннектор сообщает "Unauthorized" или показывает ошибку 401:** API-ключ отсутствует или неверен. Откройте настройки коннектора и проверьте заголовок **Authorization**: значение должно состоять из слова `Bearer`, одного пробела и полного ключа `cak_…` без лишних пробелов.

**ChatGPT говорит, что не может найти определенные данные:** возможно, у ключа нет нужных областей. Создайте новый ключ в **Settings → Developer → API Keys** с дополнительными областями и обновите коннектор.

**Действие Custom GPT возвращает 401:** на панели аутентификации действия убедитесь, что выбрано **Auth Type: Bearer** и что ключ не содержит слова `Bearer` (ChatGPT добавляет его автоматически).

**Действие Custom GPT возвращает 403:** у ключа нет области для этой конечной точки. Создайте новый ключ с нужными областями и обновите GPT.

**Схема действия отклоняется:** ChatGPT требует OpenAPI 3.1 как минимум с одной записью `paths` и URL в `servers`. Проверьте YAML на [editor.swagger.io](https://editor.swagger.io) перед вставкой.

## Связанное

- [API Keys](/docs/developer/api/api-keys) — полный справочник по областям
- [MCP Server (справка разработчика)](/docs/developer/api/mcp) — детали протокола и схемы инструментов
- [Claude](./claude) — то же самое для моделей Anthropic
- [REST API reference](/docs/developer/api/endpoints) — все конечные точки, которые может вызывать действие Custom GPT
