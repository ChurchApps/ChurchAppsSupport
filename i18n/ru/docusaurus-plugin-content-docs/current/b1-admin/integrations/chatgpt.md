---
title: "ChatGPT"
description: "Подключите ChatGPT к данным B1 вашей церкви с помощью API-ключа, чтобы задавать вопросы о людях, пожертвованиях и посещаемости обычным языком в B1 Admin."
---

# ChatGPT

<div class="article-intro">

Подключите ChatGPT к данным B1 вашей церкви и задавайте вопросы обычным языком — он отвечает на основе актуальных записей вашей церкви. Также можно попросить его помочь с задачами, для которых в B1 Admin потребовалось бы несколько шагов.

**Что можно спросить:**
- *«Покажи всех, кто был на службе на прошлой неделе, но не записан ни в одну малую группу»*
- *«Подведи итоги пожертвований за этот месяц по фондам»*
- *«Кто у нас новые члены церкви и связались ли мы с ними?»*
- *«Я не могу понять, как сделать X в B1, — можешь показать по шагам?»*

</div>

<div class="prereqs">
<h4>Что вам понадобится</h4>

- **Настольное приложение ChatGPT** для Mac или Windows
- **Платный тариф ChatGPT** (Plus или выше). Бесплатные учётные записи ChatGPT не могут подключиться к B1.
- **Ваш логин B1** с правом управлять настройками церкви (нужен, чтобы создать ключ). Если его нет, обратитесь к администратору B1 вашей церкви.

</div>

:::tip Рекомендуем: сначала попробуйте Claude — это бесплатно
[Claude](./claude.md) подключается к B1 на **бесплатном тарифе** и настраивается менее чем за 3 минуты — достаточно добавить B1 как коннектор и войти с учётной записью B1. Ключ не нужен. Это самый простой способ для вашей церкви попробовать ИИ вместе с B1, прежде чем за что-либо платить.
:::

## Настройка {#set-it-up}

Экраны в вашей версии ChatGPT могут выглядеть немного иначе.

---

**Шаг 1 — Создайте ключ B1**

Ключ — это то, что пускает ChatGPT в B1 *вашей* церкви; считайте его паролем только для ChatGPT.

1. Войдите в [B1 Admin](https://admin.b1.church) и перейдите в [Settings → Developer](https://admin.b1.church/settings/developer).
2. На вкладке **API Keys** нажмите **New API Key** и назовите ключ `ChatGPT`.
3. **Scopes:** отметьте, что ChatGPT может делать. В каждом разделе есть флажок **read** (только просмотр) и флажок **write** (вносить изменения). Не уверены? Для начала отметьте только флажки **read**.
4. Нажмите **Save**, затем **Copy** ключ (он начинается с `cak_`). Он показывается только один раз.

---

**Шаг 2 — Нажмите на своё имя в левом нижнем углу ChatGPT**

![Нажмите на имя профиля](/img/guides/chatgpt-mcp/01.png)

---

**Шаг 3 — Нажмите Settings**

![Выберите Settings в меню](/img/guides/chatgpt-mcp/02.png)

---

**Шаг 4 — Нажмите Plugins в левом боковом меню**

![Нажмите Plugins в разделе Integrations](/img/guides/chatgpt-mcp/03.png)

---

**Шаг 5 — Откройте вкладку MCPs**

![Нажмите на вкладку MCPs](/img/guides/chatgpt-mcp/04.png)

Здесь вы увидите уже добавленные серверы MCP.

---

**Шаг 6 — Нажмите Add → Add MCP server**

![Нажмите Add, затем Add MCP server](/img/guides/chatgpt-mcp/06.png)

---

**Шаг 7 — Заполните форму и нажмите Save**

![Форма подключения к пользовательскому MCP](/img/guides/chatgpt-mcp/07.png)

Нажмите **Streamable HTTP**, затем заполните:

| Поле | Что ввести |
|---|---|
| **Name** | `B1 Church` (или любое другое название) |
| **Type** | Нажмите **Streamable HTTP** |
| **URL** | `https://api.churchapps.org/mcp` |
| **Bearer token env var** | Оставьте пустым |
| **Headers** | Нажмите **+ Add header** → Key: `Authorization` → Value: см. ниже |

![Пример заполнения: в Key указан Authorization, в Value — Bearer и ключ](/img/guides/chatgpt-mcp/08.png)

- **Key:** `Authorization`
- **Value:** `Bearer cak_yourkey` — слово Bearer, пробел, затем ваш ключ

Нажмите **Save**.

Готово! Вернитесь в чат и задайте вопрос, например *«Сколько людей в нашей церкви?»* — ChatGPT возьмёт ответ прямо из B1.

---

## Безопасно ли это? {#is-it-safe}

- ChatGPT видит только данные **вашей церкви**.
- Он может делать только то, что разрешает ваш ключ: ключ только с флажками **read** может смотреть, но никогда ничего не изменит.
- Чтобы отключить доступ, удалите ключ в B1 Admin в разделе **Settings → Developer**. Доступ прекращается сразу.

## Сколько это стоит? {#what-does-it-cost}

Подключение B1 бесплатно — оно входит в ChurchApps. Чтобы подключиться, ChatGPT требуется платный тариф (Plus или выше); см. цены OpenAI.

## Технические подробности {#technical-details}

Остальная часть страницы предназначена для технических пользователей и ИИ-помощников. MCP-сервер B1 находится по адресу `https://api.churchapps.org/mcp` (Streamable HTTP) и принимает API-ключ в заголовке `Authorization: Bearer cak_…`. См. [справочник по серверу MCP для разработчиков](/docs/developer/api/mcp).

### Custom GPT с действиями {#custom-gpt-with-actions}

Custom GPT позволяет создать отдельного помощника, которым может пользоваться вся команда: сотрудники открывают ссылку и сразу задают вопросы, без какой-либо настройки со своей стороны. Для этого нужна учётная запись ChatGPT Plus, Team или Enterprise и около 10 минут.

#### 1. Создайте API-ключ {#1-create-an-api-key}

Если вы ещё этого не сделали, выполните шаг 1 из раздела «Настройка» выше.

#### 2. Создайте Custom GPT {#2-build-the-custom-gpt}

1. В ChatGPT нажмите на свой профиль → **My GPTs** → **Create a GPT**.
2. Перейдите на вкладку **Configure**, задайте GPT название (например, «B1 Assistant») и добавьте инструкции:

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

4. В поле **Schema** вставьте начальную спецификацию OpenAPI:

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
         summary: List everyone in the church
         responses:
           "200":
             description: OK
     /membership/people/search:
       get:
         operationId: searchPeople
         summary: Find people by name, or by exact email
         parameters:
           - in: query
             name: term
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
         summary: List donations for one person, or between two dates (send both startDate and endDate as YYYY-MM-DD)
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
     /attendance/attendancerecords/search:
       get:
         operationId: listAttendance
         summary: List attendance records between two dates, optionally for one campus, service, service time, or group
         parameters:
           - in: query
             name: startDate
             required: true
             schema: { type: string, format: date }
           - in: query
             name: endDate
             required: true
             schema: { type: string, format: date }
           - in: query
             name: campusId
             schema: { type: string }
           - in: query
             name: serviceTimeId
             schema: { type: string }
           - in: query
             name: groupId
             schema: { type: string }
         responses:
           "200":
             description: OK
   ```

5. Сохраните действие. Проверьте его: *«сколько людей в церкви?»* — ChatGPT вызовет `listPeople` и ответит.
6. **Опубликуйте** GPT (Only me / Anyone with link / Organization) и поделитесь ссылкой с командой.

#### 3. Использование {#3-use-it}

Любой, у кого есть ссылка, может задавать вопросы на естественном языке. Области ключа по-прежнему действуют: ключ только для чтения отклоняет любые изменения независимо от того, что написано в схеме действия.

---

### Безопасность и ограничения {#safety-and-limits}

- **Изоляция по церквям.** API-ключ привязан только к одной церкви. ChatGPT не может видеть данные других церквей.
- **Ограничение областями.** Ключ несёт только те области, которые вы выдали. Если убрать область (удалив ключ и создав новый), доступ к ней прекращается при следующем вызове.
- **Мгновенный отзыв.** Удалите ключ в **Settings → Developer → API Keys**, и доступ прекращается сразу.
- **Совместный доступ к Custom GPT — это совместный доступ к данным.** Все, у кого есть доступ к GPT, видят всё, что разрешают области ключа. Для GPT, которыми пользуется широкий круг людей, лучше выдавать более узкие области (например, не давать `donations:read`).
- **Журнал аудита.** Любые изменения, сделанные через ChatGPT, проходят через тот же журнал аудита, что и действия в B1 Admin, — найти их можно в **Settings → Audit Log**.

### Устранение неполадок {#troubleshooting}

**Коннектор MCP показывает «Unauthorized» или ошибку 401:** API-ключ отсутствует или неверен. Откройте настройки коннектора и проверьте заголовок **Authorization**: значение должно быть словом `Bearer`, одним пробелом, затем полным ключом `cak_…` без лишних пробелов.

**ChatGPT говорит, что не может найти некоторые данные:** у ключа могут быть не те области. Создайте новый ключ в **Settings → Developer → API Keys** с нужными дополнительными областями и обновите коннектор.

**Действие Custom GPT возвращает 401:** в панели аутентификации действия убедитесь, что выбран **Auth Type: Bearer**, и что ключ не содержит слова `Bearer` (ChatGPT добавляет его автоматически).

**Действие Custom GPT возвращает 403:** у ключа нет области для этой конечной точки. Создайте новый ключ с правильными областями и обновите GPT.

**Схема действия отклоняется:** ChatGPT требует OpenAPI 3.1 с хотя бы одной записью в `paths` и URL в `servers`. Проверьте YAML на [editor.swagger.io](https://editor.swagger.io) перед вставкой.

## Связанное {#related}

- [Ключи API](/docs/developer/api/api-keys) — полный справочник областей доступа
- [Сервер MCP (справочник для разработчиков)](/docs/developer/api/mcp) — подробности протокола и схемы инструментов
- [Claude](./claude.md) — то же самое, но для моделей Anthropic
- [Справочник REST API](/docs/developer/api/endpoints) — все конечные точки, которые может вызывать действие Custom GPT
