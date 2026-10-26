---
title: "ChatGPT"
---

# ChatGPT

<div class="article-intro">

Подключите ChatGPT к данным B1 вашей церкви и задавайте вопросы обычным языком — он отвечает на основе актуальных записей вашей церкви. Вы также можете попросить его помочь с задачами, которые в B1 Admin потребовали бы нескольких шагов.

**Что можно спросить:**
- *«Покажи всех, кто был на службе на прошлой неделе, но не записан ни в одну малую группу»*
- *«Подведи итоги пожертвований за этот месяц по фондам»*
- *«Кто у нас новые члены церкви и связались ли мы с ними?»*
- *«Я не могу понять, как сделать X в B1, — можешь показать по шагам?»*

</div>

<div class="prereqs">
<h4>Что понадобится</h4>

- **Настольное приложение ChatGPT** для Mac или Windows
- **Платный тариф ChatGPT** (Plus или выше). Бесплатные аккаунты ChatGPT не могут подключиться к B1.
- **Ваш логин B1** с правом управления настройками церкви (нужен для создания ключа). Если его нет, обратитесь к администратору B1 вашей церкви.

</div>

:::tip Рекомендуем: сначала попробуйте Claude — это бесплатно
[Claude](./claude) подключается к B1 на **бесплатном тарифе** и настраивается менее чем за 3 минуты: просто добавьте B1 как коннектор и войдите под своим аккаунтом B1. Ключ не нужен. Это самый простой способ для вашей церкви попробовать ИИ с B1 до того, как платить за что-либо.
:::

## Настройка

Экраны в вашей версии ChatGPT могут выглядеть немного иначе.

---

**Шаг 1 — создайте ключ B1**

Ключ открывает ChatGPT доступ к B1 *вашей* церкви — думайте о нем как о пароле только для ChatGPT.

1. Войдите в [B1 Admin](https://admin.b1.church) и перейдите в [Settings → Developer](https://admin.b1.church/settings/developer).
2. На вкладке **API Keys** нажмите **New API Key** и назовите его `ChatGPT`.
3. **Scopes:** отметьте, что ChatGPT может делать. Для каждой области есть поле **read** (только просмотр) и поле **write** (вносить изменения). Не уверены? Для начала отметьте только поля **read**.
4. Нажмите **Save**, затем **Copy** ключ (он начинается с `cak_`). Он показывается только один раз.

---

**Шаг 2 — нажмите на свое имя в левом нижнем углу ChatGPT**

![Нажмите на имя профиля](/img/guides/chatgpt-mcp/01.png)

---

**Шаг 3 — нажмите Settings**

![Нажмите Settings в меню](/img/guides/chatgpt-mcp/02.png)

---

**Шаг 4 — нажмите Plugins в левой боковой панели**

![Нажмите Plugins в разделе Integrations](/img/guides/chatgpt-mcp/03.png)

---

**Шаг 5 — откройте вкладку MCPs**

![Нажмите на вкладку MCPs](/img/guides/chatgpt-mcp/04.png)

Здесь отображаются уже добавленные вами MCP-серверы.

---

**Шаг 6 — нажмите Add → Add MCP server**

![Нажмите Add, затем Add MCP server](/img/guides/chatgpt-mcp/06.png)

---

**Шаг 7 — заполните форму и нажмите Save**

![Форма подключения к пользовательскому MCP](/img/guides/chatgpt-mcp/07.png)

Нажмите **Streamable HTTP** и заполните поля:

| Поле | Что ввести |
|---|---|
| **Name** | `B1 Church` (или любое другое название) |
| **Type** | Нажмите **Streamable HTTP** |
| **URL** | `https://api.churchapps.org/mcp` |
| **Bearer token env var** | Оставьте пустым |
| **Headers** | Нажмите **+ Add header** → Key: `Authorization` → Value: см. ниже |

![Пример заполненной формы: Authorization в Key и ключ Bearer в Value](/img/guides/chatgpt-mcp/08.png)

- **Key:** `Authorization`
- **Value:** `Bearer cak_yourkey` — слово Bearer, пробел, затем ваш ключ

Нажмите **Save**.

Готово! Вернитесь в чат и спросите что-нибудь вроде *«Сколько человек в нашей церкви?»* — ChatGPT возьмет ответ прямо из B1.

---

## Безопасно ли это?

- ChatGPT видит только **данные вашей церкви**.
- Он может делать только то, что разрешает ваш ключ: ключ только с отмеченными полями **read** может смотреть, но никогда ничего не изменит.
- Чтобы отключить доступ, удалите ключ в B1 Admin в разделе **Settings → Developer**. Доступ прекращается сразу.

## Сколько это стоит?

Подключение к B1 бесплатное — оно входит в состав ChurchApps. Для подключения ChatGPT нужен платный тариф (Plus или выше); см. [цены OpenAI](https://openai.com/pricing).

## Технические подробности

Остальная часть этой страницы предназначена для технических специалистов и ИИ-ассистентов. MCP-сервер B1 находится по адресу `https://api.churchapps.org/mcp` (Streamable HTTP) и принимает ключ API в заголовке `Authorization: Bearer cak_…`. См. [справочник MCP Server для разработчиков](/docs/developer/api/mcp).

### Custom GPT с Actions

Custom GPT позволяет создать собственного ассистента, которым может пользоваться вся команда: участники открывают ссылку и начинают задавать вопросы без какой-либо настройки. Для этого нужен аккаунт ChatGPT Plus, Team или Enterprise и около 10 минут времени.

#### 1. Создайте ключ API

Если вы еще не сделали этого, выполните Шаг 1 из раздела «Настройка» выше.

#### 2. Создайте Custom GPT

1. В ChatGPT нажмите на свой профиль → **My GPTs** → **Create a GPT**.
2. Перейдите на вкладку **Configure**, дайте GPT название (например, «B1 Assistant») и добавьте инструкции:

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

4. В поле **Schema** вставьте этот стартовый документ OpenAPI:

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

5. Сохраните action. Проверьте его: *«сколько людей в церкви?»* — ChatGPT вызовет `listPeople` и ответит.
6. **Опубликуйте** GPT (Only me / Anyone with link / Organization) и поделитесь ссылкой с командой.

#### 3. Использование

Любой, у кого есть ссылка, может задавать вопросы на естественном языке. Ограничения ключа по-прежнему действуют: ключ только для чтения отклоняет любые изменения, независимо от того, что написано в схеме action.

---

### Безопасность и ограничения

- **Изоляция по церкви.** Ключ API привязан только к одной церкви. ChatGPT не видит данные других церквей.
- **Ограничение по правам.** Ключ несет только те разрешения (scopes), которые вы выдали. Удаление права (путем удаления и пересоздания ключа) прекращает доступ при следующем вызове.
- **Мгновенный отзыв.** Удалите ключ в **Settings → Developer → API Keys**, и доступ прекращается сразу.
- **Совместный доступ к Custom GPT означает общий доступ к данным.** Все, у кого есть доступ к GPT, видят все, что разрешают права ключа. Для GPT, которыми пользуются широко, лучше выдавать более узкие права (например, без `donations:read`).
- **Журнал аудита.** Все изменения, внесенные через ChatGPT, проходят через тот же журнал аудита, что и действия в B1 Admin — найти их можно в **Settings → Audit Log**.

### Устранение неполадок

**Коннектор MCP показывает «Unauthorized» или ошибку 401:** ключ API отсутствует или неверен. Откройте настройки коннектора и проверьте заголовок **Authorization**: значение должно состоять из слова `Bearer`, одного пробела и полного ключа `cak_…` без лишних пробелов.

**ChatGPT говорит, что не может найти некоторые данные:** у ключа могут быть не те права. Создайте новый ключ в **Settings → Developer → API Keys** с нужными правами и обновите коннектор.

**Custom GPT action возвращает 401:** в панели аутентификации action убедитесь, что выбран **Auth Type: Bearer**, и что ключ не содержит слова `Bearer` (ChatGPT добавляет его автоматически).

**Custom GPT action возвращает 403:** у ключа нет права на этот эндпоинт. Создайте новый ключ с нужными правами и обновите GPT.

**Схема action отклонена:** ChatGPT требует OpenAPI 3.1 с хотя бы одной записью в `paths` и URL в `servers`. Проверьте YAML на [editor.swagger.io](https://editor.swagger.io) перед вставкой.

## Связанные материалы

- [API Keys](/docs/developer/api/api-keys) — полный справочник прав доступа
- [MCP Server (справочник для разработчиков)](/docs/developer/api/mcp) — детали протокола и схемы инструментов
- [Claude](./claude) — то же самое, но для моделей Anthropic
- [Справочник REST API](/docs/developer/api/endpoints) — все эндпоинты, которые может вызывать Custom GPT action
