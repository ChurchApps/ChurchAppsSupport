---
title: "ChatGPT"
---

# ChatGPT

<div class="article-intro">

Подключите ChatGPT компании OpenAI к данным B1 вашей церкви, чтобы вы могли задавать вопросы типа "кто не был в группе этот квартал?" или "подведите итоги пожертвований на фонд строительства в этом месяце" и получить ответы ChatGPT прямо из B1. Поддерживаются два пути: **пользовательский GPT**, работающий на любом плане ChatGPT Plus, и **сервер MCP** для инструментов разработчика, которые его поддерживают.

</div>

<div class="prereqs">
<h4>Перед началом</h4>

- Администратор церкви с разрешением **Редактировать параметры** (для создания API ключа)
- Учетная запись **ChatGPT Plus, Pro, Team или Enterprise** (бесплатный план не может использовать Custom GPT или Connectors)
- Полный URL вашего B1 API — обычно `https://api.churchapps.org` для размещенных церквей или ваш хост самостоятельно размещенного Api

</div>

## Выберите правильный путь

| Путь | Требуемый план | Усилие | Что вы получите |
|---|---|---|---|
| **Custom GPT с Actions** | ChatGPT Plus / Team / Enterprise | 10 минут | Общий GPT, который вызывает REST API B1 для использования любым членом команды |
| **MCP через инструменты OpenAI** | Developer / Agent SDK / Pro Connectors | Больше | Полное обнаружение через сервер MCP, подходит для инструментов кодирования и платформ агентов |

Для большинства церквей путь **Custom GPT** — правильный ответ — он не требует настройки разработчика, работает внутри обычного приложения ChatGPT и мобильных клиентов и может быть общим для вашей команды. Путь MCP задокументирован ниже для технического персонала, использующего инструменты разработчика OpenAI или платформы агентов.

## Путь A — Custom GPT с Actions

Это подключает ChatGPT прямо к REST API B1. Ваш Custom GPT сможет читать и (опционально) записывать записи B1 от имени того, кто его использует.

### 1. Создайте API ключ

1. В B1Admin перейдите к **Параметры → Разработчик → API Ключи**.
2. Нажмите **Новый API ключ**, назовите его `ChatGPT` и выберите области. Общие начальные наборы:
   - **Помощник только для чтения:** `people:read`, `groups:read`, `attendance:read`, `donations:read`
   - **Чтение + запись:** добавьте соответствующие области `:write`
3. Сохраните и скопируйте полный ключ `cak_…`.

Смотрите [API Ключи](/docs/developer/api/api-keys) для полного списка областей.

### 2. Построение Custom GPT

1. В ChatGPT нажмите на свой профиль → **My GPTs** → **Create a GPT**.
2. Перейдите на вкладку **Configure** и дайте GPT имя (например "B1 Assistant") и инструкции, такие как:

   ```
   You help church staff query their B1 records. Use the B1 API actions to
   look up people, groups, attendance, donations, and content. Always scope
   answers to data the user has permission to see. Be concise.
   ```

3. Прокрутите вниз до **Actions** → **Create new action** → **Authentication**.
   - **Authentication type:** API Key
   - **API Key:** `cak_<prefix>.<secret>`
   - **Auth Type:** Bearer
   - Сохраните.
4. В поле **Schema** вставьте минимальную спецификацию OpenAPI, описывающую конечные точки, которые вы хотите, чтобы GPT использовал. Начальная спецификация, которая охватывает наиболее распространенные операции чтения:

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

   Расширьте схему с более четкими конечными точками по мере необходимости — каждый аутентифицированный маршрут в B1 принимает один и тот же ключ `cak_…`. [Справочник REST API](/docs/developer/api/endpoints) перечисляет, что доступно.

5. Сохраните действие. Протестируйте его с подсказкой типа *"сколько людей в церкви?"* — ChatGPT вызовет `listPeople` и ответит.
6. **Опубликуйте** GPT (Only me / Anyone with link / Organization) и поделитесь с вашей командой.

### 3. Используйте его

Каждый, с кем вы поделитесь GPT, может задавать вопросы на естественном языке — ChatGPT выбирает правильное действие, вызывает B1 и отвечает. Области ключа все еще применяются: ключ только для чтения откажет в записи независимо от действия, определенного в схеме.

## Путь B — MCP через инструменты OpenAI

B1 API включает сервер MCP в `/mcp`, который может использовать любой инструмент, поддерживающий MCP — например [OpenAI Agents SDK](https://platform.openai.com/docs/guides/agents), инструмент MCP Responses API или сторонние платформы агентов, которые потребляют серверы MCP.

Аутентифицируйтесь с использованием того же ключа `cak_…` в заголовке `Authorization: Bearer`. Представлены три инструмента: `list_endpoints`, `describe_endpoint` и `api_call`. Смотрите [справочник разработчика сервера MCP](/docs/developer/api/mcp) для информации о протоколе, транспорте и схемах инструментов.

ChatGPT Built-in "Connectors" (Pro/Business/Enterprise) в настоящее время ожидают серверы MCP с определенными формами инструментов `search` и `fetch` и аутентификацией на основе OAuth, которые сервер MCP B1 не объявляет. Для ChatGPT внутри приложения потребителя путь Custom GPT выше является практическим выбором.

## Безопасность и ограничения

- **Изоляция на уровне церкви.** API ключ разрешается одной церкви. ChatGPT не может видеть данные других церквей.
- **Область разрешений.** Если вы удалите разрешение от человека, который создал ключ, ChatGPT потеряет его при следующем вызове — мгновенно.
- **Отзывный.** Удалите ключ в **Параметры → Разработчик → API Ключи** и доступ ChatGPT немедленно закончится.
- **Совместное использование Custom GPT совместно использует данные.** Каждый с доступом к GPT может задавать ему вопросы и видеть все, для чего есть области ключей. Ограничьте совместное использование сотрудниками, которые должны видеть эти данные, и предпочитайте более узкие области (например, опустите `donations:read` для GPT, совместно используемого широко).
- **Аудит.** Мутации проходят через тот же журнал аудита, что и действия B1Admin; проверьте их в разделе **Отчеты → Журнал аудита**.

## Стоимость

ChurchApps — это бесплатное программное обеспечение с открытым исходным кодом — API, который вызывает ваш Custom GPT, является частью API, который уже запускает ваша церковь. OpenAI взимает плату за использование ChatGPT в соответствии с их планами. Нет никаких затрат на каждый вызов из ChurchApps.

## Устранение неполадок

**Action возвращает 401:** заголовок bearer установлен неправильно. На панели аутентификации действия убедитесь, что выбран **Auth Type: Bearer** и значение ключа не включает слово `Bearer` (ChatGPT добавляет его за вас).

**Action возвращает 403:** ключ не имеет области для этой конечной точки. Создайте новый ключ с правильными областями и обновите GPT.

**ChatGPT вызывает неправильное действие:** отрегулируйте поля `summary` и `description` в вашей схеме OpenAPI, чтобы модель выбрала правильное. Добавление примеров запросов к инструкциям GPT также помогает.

**Панель действия отклоняет схему:** ChatGPT требует OpenAPI 3.1 с по крайней мере одной записью `paths` и URL `servers`. Проверьте YAML в любом онлайн-валидаторе OpenAPI перед вставкой.

**Локальная разработка:** укажите URL `servers` действия на вашу локальный Api (например `http://localhost:8084`) — но обратите внимание, что действия ChatGPT вызывают только общедоступные URL, поэтому для локального тестирования используйте туннель типа `ngrok` или вызовите API напрямую с `curl`, чтобы сначала подтвердить ключ.

## Связанное

- [API Ключи](/docs/developer/api/api-keys) — полная справка областей
- [Сервер MCP (справочник разработчика)](/docs/developer/api/mcp) — детали протокола и схемы инструментов
- [Claude](./claude) — та же идея, для моделей Anthropic
- [Справочник REST API](/docs/developer/api/endpoints) — каждая конечная точка, которую может вызвать действие Custom GPT
