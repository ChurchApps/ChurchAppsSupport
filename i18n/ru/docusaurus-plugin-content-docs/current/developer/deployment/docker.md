---
title: "Самостоятельный хостинг с Docker"
---

# Самостоятельный хостинг с Docker

<div class="article-intro">

Запустите собственный частный экземпляр B1 Admin, портала участников B1, API и базы данных MySQL на любой машине с Docker — домашнем сервере, VPS за 5 долларов или локальном сервере. Одна команда `docker compose up` собирает и запускает всё. Если вы предпочитаете вовсе не управлять сервером, см. [Самостоятельный хостинг на Railway](./railway-template) для управляемой альтернативы.

</div>

## Быстрый старт

<div class="prereqs">
<h4>Что вам нужно</h4>

- [Docker Engine](https://docs.docker.com/engine/install/) с Compose v2 (входит в Docker Desktop)
- ~4 ГБ доступной оперативной памяти во время первоначальной сборки (веб-приложения собираются из исходников)
- Git, либо просто необработанный файл `docker-compose.yml`

</div>

```bash
git clone https://github.com/ChurchApps/B1Admin.git
cd B1Admin
docker compose up -d
```

Первый запуск занимает 10–20 минут: он собирает B1Admin из вашего клона и собирает API и B1App напрямую из их репозиториев GitHub. Последующие запуски занимают секунды.

Когда все четыре сервиса подняты:

1. Откройте **http://localhost:3101** (B1 Admin).
2. Нажмите **Register** и создайте свой аккаунт. Первый аккаунт автоматически становится администратором сервера.
3. Следуйте подсказкам внутри приложения, чтобы создать первую церковь.

Схемы баз данных создаются автоматически стартовой миграцией контейнера API — ручной SQL не требуется.

| Сервис | URL |
|---------|-----|
| B1Admin (персонал/администрирование) | http://localhost:3101 |
| B1App (портал участников / веб-сайт) | http://localhost:3000 |
| API | http://localhost:8084 |
| MySQL | только внутренний (`mysql:3306` в сети compose) |

## Конфигурация

Все настройки живут в файле `.env` рядом с `docker-compose.yml`. У каждой переменной есть рабочее значение по умолчанию для localhost, так что файл опционален, пока вы не начнёте что-то настраивать.

```bash
# .env — everything is optional; shown with defaults
MYSQL_ROOT_PASSWORD=churchapps
JWT_SECRET=please-change-this-jwt-secret
ENCRYPTION_KEY=PleaseChangeThisDockerDefaultKey   # exactly 32 characters

# Public URLs (change these when exposing beyond localhost)
API_URL=http://localhost:8084
B1ADMIN_URL=http://localhost:3101
B1APP_URL=http://localhost:3000
SOCKET_URL=ws://localhost:8084

# Email — see the Railway guide's Email section for provider walkthroughs
MAIL_SYSTEM=
SMTP_HOST=
SMTP_USER=
SMTP_PASS=
SMTP_SECURE=false
SUPPORT_EMAIL=noreply@yourchurch.org
```

Перед реальным использованием измените `MYSQL_ROOT_PASSWORD`, `JWT_SECRET` и `ENCRYPTION_KEY` (любую 32-символьную строку).

:::warning
Значения `*_URL` **вшиваются в веб-приложения на этапе сборки** (стандартное поведение Vite/Next.js). Изменение их в `.env` требует пересборки, а не просто перезапуска:

```bash
docker compose up -d --build
```
:::

Смена пароля MySQL после первого запуска требует также обновления пароля внутри MySQL — том сохраняет старые учётные данные.

## Открытие доступа из интернета

Поставьте перед всем этим любой реверс-прокси и дайте каждому сервису имя хоста. С [Caddy](https://caddyserver.com/) это выглядит так:

```
admin.yourchurch.org { reverse_proxy localhost:3101 }
app.yourchurch.org   { reverse_proxy localhost:3000 }
api.yourchurch.org   { reverse_proxy localhost:8084 }
```

Затем задайте URL в `.env` и пересоберите:

```bash
API_URL=https://api.yourchurch.org
B1ADMIN_URL=https://admin.yourchurch.org
B1APP_URL=https://app.yourchurch.org
SOCKET_URL=wss://api.yourchurch.org
```

```bash
docker compose up -d --build
```

WebSocket, используемый для чата и живых уведомлений, использует тот же порт, что и API, так что `SOCKET_URL` — это просто URL API с `wss://`.

## Email, пожертвования, мульти-сайт и интеграции

Они работают точно так же, как и при развёртывании на Railway — те же переменные окружения, задаваемые в вашем файле `.env` вместо панели Railway (файл compose передаёт их в API):

- **[Email / SMTP](./railway-template#1-email-highly-recommended)** — настоятельно рекомендуется; без этого участники не смогут сбросить пароли
- **[Мульти-сайт](./railway-template#3-multi-site-multiple-churches-on-one-instance)** — неограниченное число церквей на один экземпляр, управляется в интерфейсе администрирования
- **[Онлайн-пожертвования](./railway-template#4-online-giving-stripe--paypal)** — настраивается для каждой церкви в интерфейсе администрирования, не через переменные окружения
- **[Опциональные интеграции](./railway-template#6-optional-feature-integrations)** — `OPENAI_API_KEY`, `YOUTUBE_API_KEY`, `PEXELS_KEY`, `VIMEO_TOKEN`, `API_BIBLE_KEY`, `WEB_PUSH_PUBLIC_KEY`/`WEB_PUSH_PRIVATE_KEY`, `GOOGLE_RECAPTCHA_SECRET_KEY`

## Данные, резервные копии и файловое хранилище

Два именованных тома Docker хранят всё состояние:

| Том | Содержимое |
|--------|----------|
| `mysql-data` | Все схемы баз данных |
| `api-content` | Загруженные файлы — фото, документы, изображения веб-сайта (монтируется в `/app/content`) |

Сделайте резервную копию базы данных одной командой (запланируйте её через cron):

```bash
docker compose exec mysql mysqldump -uroot -p"$MYSQL_ROOT_PASSWORD" --all-databases > backup-$(date +%F).sql
```

Сделайте резервную копию загруженных файлов, скопировав том:

```bash
docker run --rm -v b1admin_api-content:/data -v "$PWD":/backup alpine tar czf /backup/content-$(date +%F).tgz -C /data .
```

Для крупных медиабиблиотек можно переключить файловое хранилище на S3 вместо локального тома — установите `FILE_STORE=S3` плюс переменные `AWS_*`, описанные в разделе [«Файловое хранилище» руководства по Railway](./railway-template#5-file-storage).

## Обновление

API и B1App собираются из ветки `main` их репозиториев GitHub; B1Admin собирается из вашего локального клона.

```bash
git pull                              # update B1Admin
docker compose build --pull           # rebuild all images against latest main
docker compose up -d
```

Миграции базы данных выполняются автоматически при запуске контейнера API.

Чтобы закрепить версии вместо отслеживания `main`, направьте контексты сборки на тег в `.env`:

```bash
API_CONTEXT=https://github.com/ChurchApps/Api.git#v1.2.3
B1APP_CONTEXT=https://github.com/ChurchApps/B1App.git#v1.2.3
```

Разработчики могут направить те же переменные на локальные клоны (например, `API_CONTEXT=../Api`).

## Устранение неполадок

| Симптом | Вероятная причина | Исправление |
|---------|--------------|-----|
| Контейнер `api` перезапускается в цикле | MySQL не готов или сбой миграции | `docker compose logs api` — миграция выводит, какой модуль не удался |
| Вход перенаправляет на `api.churchapps.org` | Веб-приложение собрано без аргументов этапа `custom` | Пересоберите: `docker compose build --no-cache b1admin b1app` |
| «Check your email», но письмо не приходит | `MAIL_SYSTEM=SMTP` с неверными учётными данными | Исправьте учётные данные, либо снимите `MAIL_SYSTEM`, чтобы отключить email |
| Чат / живые функции молчат | `SOCKET_URL` недоступен из браузера | Должен быть `wss://` за HTTPS и проксироваться на порт 8084 |
| Сборка падает на маленьком VPS | Нехватка памяти во время `next build` | Добавьте swap, либо соберите на другой машине и используйте `docker save`/`load` |

Всё ещё застряли? Откройте issue на [github.com/ChurchApps/ChurchAppsSupport/issues](https://github.com/ChurchApps/ChurchAppsSupport/issues) с выводом `docker compose logs`.

## Похожие статьи

- **[Самостоятельный хостинг на Railway](./railway-template)** — управляемая альтернатива хостинга, плюс общие руководства по настройке после развёртывания
- **[Начальная настройка](../../getting-started/initial-setup)** — первые шаги после создания вашей церкви
- **[Локальная настройка API](../api/local-setup)** — запуск стека напрямую для разработки
