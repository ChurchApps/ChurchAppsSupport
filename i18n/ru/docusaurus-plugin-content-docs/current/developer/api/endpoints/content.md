---
title: "Конечные точки контента"
---

# Конечные точки контента

<div class="article-intro">

Модуль Content управляет страницами сайта, разделами, элементами, блоками, постами в блоге, переадресациями, проповедями, плейлистами, сервисами потокового вещания, событиями, кураторскими календарями, файлами, галереями, переводами Библии и поиском стихов, песнями, аранжировками, глобальными стилями, стоковыми фотографиями и настройками. Это самый большой модуль в API, обеспечивающий функции CMS, медиа/потокового вещания, планирования богослужения и Библии во всех приложениях ChurchApps.

</div>

**Базовый путь:** `/content`

## Страницы

Базовый путь: `/content/pages`

| Method | Path | Auth | Permission | Описание |
|--------|------|------|------------|----------|
| GET | `/:churchId/tree?url=&id=` | Public | — | Загрузить полное дерево страниц (разделы, элементы, блоки) по URL или ID. Удаляет внутренние ID при загрузке по URL. Загрузка по URL соблюдает `pages.visibility` — закрытая страница возвращает `{ restricted: true, visibility }`, если только JWT не удовлетворяет условию доступа |
| GET | `/public/:churchId` | Public | — | Список открытых страниц (`url`, `title`, `metaDescription`); только `visibility = everyone` |
| GET | `/:id` | JWT | — | Получить страницу по ID |
| GET | `/` | JWT | — | Список всех страниц для церкви |
| POST | `/duplicate/:id` | JWT | Content.Edit | Дублировать страницу со всеми разделами и элементами |
| POST | `/temp/ai` | JWT | Content.Edit | Сохранить сгенерированную AI страницу (страница, разделы и элементы в одном вызове) |
| POST | `/importTree` | JWT | Content.Edit | Создать страницу из вложенного дерева (`title`, `url`, `sections[].elements[]…`). Всегда вставляется под церковь вызывающего; ids в теле игнорируются. Строки должны включать своих потомков `column`. Максимум 30 разделов / 500 элементов |
| POST | `/` | JWT | Content.Edit | Создать или обновить страницы (пакет) |
| DELETE | `/:id` | JWT | Content.Edit | Удалить страницу |

### Пример: загрузить дерево страницы

```
GET /content/pages/abc-church-id/tree?url=/about
```

```json
{
  "name": "About",
  "url": "/about",
  "sections": [
    {
      "background": "#FFFFFF",
      "textColor": "dark",
      "elements": [
        { "elementType": "textWithPhoto", "answers": { "text": "Welcome" } }
      ]
    }
  ]
}
```

## Разделы

Базовый путь: `/content/sections`

| Method | Path | Auth | Permission | Описание |
|--------|------|------|------------|----------|
| GET | `/:id` | JWT | — | Получить раздел по ID |
| POST | `/duplicate/:id?convertToBlock=` | JWT | Content.Edit | Дублировать раздел или конвертировать его в переиспользуемый блок |
| POST | `/` | JWT | Content.Edit | Создать или обновить разделы (пакет). Автоматически обновляет порядок сортировки |
| DELETE | `/:id` | JWT | Content.Edit | Удалить раздел (автоматически обновляет порядок сортировки) |

## Элементы

Базовый путь: `/content/elements`

| Method | Path | Auth | Permission | Описание |
|--------|------|------|------------|----------|
| GET | `/:id` | JWT | — | Получить элемент по ID |
| POST | `/duplicate/:id` | JWT | Content.Edit | Дублировать элемент со всеми потомками |
| POST | `/` | JWT | Content.Edit | Создать или обновить элементы (пакет). Автоматически управляет столбцами строк и слайдами карусели |
| DELETE | `/:id` | JWT | Content.Edit | Удалить элемент |

## Блоки

Базовый путь: `/content/blocks`

Расширяет стандартный CRUD (GET `/:id`, GET `/`, POST `/`, DELETE `/:id` из базового класса с разрешением Content.Edit для записей).

| Method | Path | Auth | Permission | Описание |
|--------|------|------|------------|----------|
| GET | `/:id` | JWT | — | Получить блок по ID |
| GET | `/` | JWT | — | Список всех блоков |
| GET | `/:churchId/tree/:id` | Public | — | Загрузить полное дерево блока с разделами и элементами |
| GET | `/blockType/:blockType` | JWT | — | Загрузить блоки по типу (например, footerBlock, elementBlock) |
| GET | `/public/footer/:churchId` | Public | — | Загрузить дерево блока подвала для церкви |
| POST | `/` | JWT | Content.Edit | Создать или обновить блоки |
| DELETE | `/:id` | JWT | Content.Edit | Удалить блок |

## Ссылки

Базовый путь: `/content/links`

Расширяет стандартный CRUD (GET `/:id`, GET `/`, POST `/`, DELETE `/:id` из базового класса с разрешением Content.Edit для записей).

| Method | Path | Auth | Permission | Описание |
|--------|------|------|------------|----------|
| GET | `/:id` | JWT | — | Получить ссылку по ID |
| GET | `/` | JWT | — | Список всех ссылок. Опциональный фильтр `?category=`. Автоматически сортирует после сохранения |
| GET | `/church/:churchId/filtered?category=` | JWT | — | Загрузить ссылки, отфильтрованные по видимости (все, посетители, члены, персонал, группы) |
| GET | `/church/:churchId?category=` | Public | — | Загрузить ссылки для церкви по категориям (открытые) |
| POST | `/` | JWT | Content.Edit | Создать или обновить ссылки (пакет). Автоматически сортирует по категориям |
| DELETE | `/:id` | JWT | Content.Edit | Удалить ссылку |

## Глобальные стили

Базовый путь: `/content/globalStyles`

Расширяет стандартный CRUD (POST `/`, DELETE `/:id` из базового класса с разрешением Content.Edit для записей).

| Method | Path | Auth | Permission | Описание |
|--------|------|------|------------|----------|
| GET | `/church/:churchId` | Public | — | Загрузить глобальные стили для церкви (возвращает значения по умолчанию, если не установлены) |
| GET | `/` | JWT | — | Загрузить глобальные стили для аутентифицированной церкви |
| POST | `/` | JWT | Content.Edit | Создать или обновить глобальные стили |
| DELETE | `/:id` | JWT | Content.Edit | Удалить глобальные стили |

## История страниц

Базовый путь: `/content/pageHistory`

| Method | Path | Auth | Permission | Описание |
|--------|------|------|------------|----------|
| GET | `/page/:pageId` | JWT | Content.Edit | Список записей истории для страницы |
| GET | `/block/:blockId` | JWT | Content.Edit | Список записей истории для блока |
| GET | `/:id` | JWT | Content.Edit | Получить запись истории по ID |
| POST | `/` | JWT | Content.Edit | Сохранить снимок страницы/блока. Периодически удаляет записи старше 30 дней |
| POST | `/restore/:id` | JWT | Content.Edit | Восстановить страницу/блок из снимка истории (удаляет текущее содержимое и воссоздает из снимка) |
| POST | `/restoreSnapshot` | JWT | Content.Edit | Восстановить из встроенного объекта снимка. Тело: `{ pageId, blockId, snapshot }` |

## Посты (Блог)

Базовый путь: `/content/posts`

Посты в блоге — это отдельные строки: `title`, `slug` (уникальный по церквям), `excerpt`, `content` (тело markdown), `authorId`, `photoUrl`, `publishDate`, `category` и `tags`. Пост опубликован, как только `publishDate` установлена и находится в прошлом. Конечные точки чтения обогащают каждый пост `authorName`, разрешенным из `authorId`. Смотрите [Архитектуру построителя веб-сайтов](../../architecture/website-builder#blog).

| Method | Path | Auth | Permission | Описание |
|--------|------|------|------------|----------|
| GET | `/public/:churchId?category=&tag=&page=&pageSize=` | Public | — | Список опубликованных постов, разбитых на страницы (максимум 50 на странице) |
| GET | `/public/:churchId/categories` | Public | — | Различные категории в опубликованных постах |
| GET | `/public/:churchId/slug/:slug` | Public | — | Получить опубликованный пост по slug |
| GET | `/rss/:churchId?siteUrl=` | Public | — | RSS 2.0 лента опубликованных постов (ссылки построены как `{siteUrl}/blog/{slug}`) |
| GET | `/:id` | JWT | — | Получить пост по ID |
| GET | `/` | JWT | — | Список всех постов для церкви |
| POST | `/` | JWT | Content.Edit | Создать или обновить посты (пакет) |
| DELETE | `/:id` | JWT | Content.Edit | Удалить пост |

## Переадресации

Базовый путь: `/content/redirects`

Переадресации URL для каждой церкви (`fromPath` → `toPath`), ограничены 200 на церковь. Пути нормализуются (в нижнем регистре, начальный слэш, без конечного слэша) и `fromPath` уникален по церквям. B1App разрешает эти при бы-404s и выдает HTTP 308.

| Method | Path | Auth | Permission | Описание |
|--------|------|------|------------|----------|
| GET | `/public/:churchId?path=` | Public | — | Разрешить путь (или список всех переадресаций, если `path` опущен) |
| GET | `/:id` | JWT | — | Получить переадресацию по ID |
| GET | `/` | JWT | — | Список всех переадресаций для церкви |
| POST | `/` | JWT | Content.Edit | Создать или обновить переадресации. Отклоняет `fromPath = toPath` и обеспечивает ограничение в 200 строк |
| DELETE | `/:id` | JWT | Content.Edit | Удалить переадресацию |

## Проповеди

Базовый путь: `/content/sermons`

| Method | Path | Auth | Permission | Описание |
|--------|------|------|------------|----------|
| GET | `/public/freeshowSample` | JWT | — | Получить пример структуры плейлиста FreeShow |
| GET | `/public/tvWrapper/:churchId` | JWT | — | Получить обертку TV приложения с источниками проповеди, урока и FreeShow |
| GET | `/public/tvFeed/:churchId/:sermonId` | Public | — | Получить одну проповедь в виде плейлиста TV ленты |
| GET | `/public/tvFeed/:churchId` | Public | — | Получить все открытые плейлисты/проповеди в виде TV ленты |
| GET | `/public/:churchId` | Public | — | Список всех открытых проповедей для церкви |
| GET | `/timeline?sermonIds=` | JWT | — | Загрузить данные временной шкалы для проповедей |
| GET | `/lookup?videoType=&videoData=` | Public | — | Поиск метаданных проповеди из YouTube или Vimeo |
| GET | `/socialSuggestions?youtubeVideoId=` | JWT | — | Создать предложения для постов в социальных сетях из субтитров проповеди |
| GET | `/outline?url=&title=&author=` | JWT | — | Создать план урока AI из URL |
| GET | `/youtubeImport/:channelId` | JWT | — | Импортировать видео из канала YouTube |
| GET | `/vimeoImport/:channelId` | JWT | — | Импортировать видео из канала Vimeo |
| GET | `/:id` | JWT | — | Получить проповедь по ID |
| GET | `/` | JWT | — | Список всех проповедей |
| POST | `/` | JWT | StreamingServices.Edit | Создать или обновить проповеди (пакет, поддерживает загрузку миниатюры base64) |
| DELETE | `/:id` | JWT | StreamingServices.Edit | Удалить проповедь |

### Пример: поиск проповеди YouTube

```
GET /content/sermons/lookup?videoType=youtube&videoData=dQw4w9WgXcQ
```

```json
{
  "title": "Sunday Service - Faith in Action",
  "description": "Pastor John speaks about faith...",
  "thumbnail": "https://img.youtube.com/vi/dQw4w9WgXcQ/default.jpg",
  "duration": 2400,
  "publishDate": "2025-01-15T10:00:00Z"
}
```

## Плейлисты

Базовый путь: `/content/playlists`

Расширяет стандартный CRUD (GET `/:id`, GET `/`, DELETE `/:id` из базового класса с разрешением StreamingServices.Edit для записей).

| Method | Path | Auth | Permission | Описание |
|--------|------|------|------------|----------|
| GET | `/:id` | JWT | — | Получить плейлист по ID |
| GET | `/` | JWT | — | Список всех плейлистов |
| GET | `/public/:churchId` | Public | — | Список всех открытых плейлистов для церкви |
| POST | `/` | JWT | StreamingServices.Edit | Создать или обновить плейлисты (пакет, поддерживает загрузку миниатюры base64) |
| DELETE | `/:id` | JWT | StreamingServices.Edit | Удалить плейлист |

## Сервисы потокового вещания

Базовый путь: `/content/streamingServices`

| Method | Path | Auth | Permission | Описание |
|--------|------|------|------------|----------|
| GET | `/:id/hostChat` | JWT | Chat.Host | Получить зашифрованный ID комнаты чата хоста для сервиса |
| GET | `/` | JWT | — | Список всех сервисов потокового вещания. Автоматически удаляет истекшие неповторяющиеся сервисы и продвигает повторяющиеся |
| POST | `/` | JWT | StreamingServices.Edit | Создать или обновить сервисы потокового вещания (пакет) |
| DELETE | `/:id` | JWT | StreamingServices.Edit | Удалить сервис потокового вещания (также очищает заблокированные IP) |

## События

Базовый путь: `/content/events`

| Method | Path | Auth | Permission | Описание |
|--------|------|------|------------|----------|
| GET | `/timeline/group/:groupId?eventIds=` | JWT | — | Загрузить события временной шкалы для группы |
| GET | `/timeline?eventIds=` | JWT | — | Загрузить события временной шкалы для групп текущего пользователя |
| GET | `/subscribe?churchId=&groupId=&curatedCalendarId=` | Public | — | Подписаться на события как ленту календаря ICS |
| GET | `/group/:groupId` | JWT | — | Получить события для группы (включает даты исключений) |
| GET | `/public/group/:churchId/:groupId` | Public | — | Получить открытые события для группы |
| GET | `/:id` | JWT | — | Получить событие по ID |
| POST | `/` | JWT | — | Создать или обновить события (пакет) |
| DELETE | `/:id` | JWT | Content.Edit | Удалить событие |

## Исключения событий

Базовый путь: `/content/eventExceptions`

| Method | Path | Auth | Permission | Описание |
|--------|------|------|------------|----------|
| GET | `/:id` | JWT | — | Получить исключение события по ID |
| POST | `/` | JWT | Content.Edit | Создать или обновить исключения событий (пакет) |
| DELETE | `/:id` | JWT | Content.Edit | Удалить исключение события |

## Курируемые календари

Базовый путь: `/content/curatedCalendars`

| Method | Path | Auth | Permission | Описание |
|--------|------|------|------------|----------|
| GET | `/:id` | JWT | — | Получить курируемый календарь по ID |
| GET | `/` | JWT | — | Список всех курируемых календарей |
| POST | `/` | JWT | Content.Edit | Создать или обновить курируемые календари (пакет) |
| DELETE | `/:id` | JWT | Content.Edit | Удалить курируемый календарь |

## Курируемые события

Базовый путь: `/content/curatedEvents`

| Method | Path | Auth | Permission | Описание |
|--------|------|------|------------|----------|
| GET | `/calendar/:curatedCalendarId?withoutEvents` | JWT | — | Получить курируемые события для календаря (включает детали событий и даты исключений, если не установлено `?withoutEvents`) |
| GET | `/public/calendar/:churchId/:curatedCalendarId` | Public | — | Получить открытые курируемые события для календаря |
| GET | `/:id` | JWT | — | Получить курируемое событие по ID |
| GET | `/` | JWT | — | Список всех курируемых событий |
| POST | `/` | JWT | Content.Edit | Создать или обновить курируемые события. Поддерживает массив `eventIds` для добавления определенных групповых событий |
| DELETE | `/:id` | JWT | Content.Edit | Удалить курируемое событие |
| DELETE | `/calendar/:curatedCalendarId/event/:eventId` | JWT | Content.Edit | Удалить определенное событие из курируемого календаря |
| DELETE | `/calendar/:curatedCalendarId/group/:groupId` | JWT | Content.Edit | Удалить все события для группы из курируемого календаря |

## Файлы

Базовый путь: `/content/files`

| Method | Path | Auth | Permission | Описание |
|--------|------|------|------------|----------|
| GET | `/:contentType/:contentId` | JWT | — | Получить файлы по типу контента и ID контента |
| GET | `/` | JWT | — | Список всех файлов для веб-сайта церкви |
| GET | `/:id` | JWT | — | Получить файл по ID |
| POST | `/` | JWT | Content.Edit* | Загрузить файлы (base64). *Также разрешено, если пользователь является членом группы, соответствующей `contentId` |
| POST | `/postUrl` | JWT | Content.Edit* | Получить предварительно подписанный URL загрузки S3. *Также разрешено для членов группы. Максимум 100MB на элемент контента |
| DELETE | `/:id` | JWT | Content.Edit* | Удалить файл и удалить из хранилища. *Также разрешено для членов группы |

## Галерея

Базовый путь: `/content/gallery`

| Method | Path | Auth | Permission | Описание |
|--------|------|------|------------|----------|
| GET | `/stock/:folder` | Public | — | Список стоковых фотографий в папке |
| GET | `/:folder` | JWT | Content.Edit | Список изображений галереи в папке |
| POST | `/requestUpload` | JWT | Content.Edit | Получить предварительно подписанный URL загрузки S3 для изображения галереи |
| DELETE | `/:folder/:image` | JWT | Content.Edit | Удалить изображение галереи |

## Библии

Базовый путь: `/content/bibles`

Все конечные точки Библии открыты (аутентификация не требуется). Данные загружаются из внешних источников и кэшируются локально.

| Method | Path | Auth | Permission | Описание |
|--------|------|------|------------|----------|
| GET | `/` | Public | — | Список всех переводов Библии (загружается из источника, если кэш пуст) |
| GET | `/stats?startDate=&endDate=` | Public | — | Получить статистику поиска Библии за диапазон дат |
| GET | `/availableTranslations/:source` | Public | — | Список доступных переводов из источника (например, api.bible) |
| GET | `/updateTranslations` | Public | — | Синхронизировать все переводы из всех источников |
| GET | `/updateTranslations/:source` | Public | — | Синхронизировать переводы из определенного источника |
| GET | `/updateCopyrights` | Public | — | Обновить информацию об авторском праве для переводов без нее |
| GET | `/:translationKey/updateCopyright` | Public | — | Обновить авторское право для определенного перевода |
| GET | `/:translationKey/search?query=&limit=` | Public | — | Поиск стихов в переводе |
| GET | `/:translationKey/books` | Public | — | Получить книги для перевода (кэшируется локально) |
| GET | `/:translationKey/:bookKey/chapters` | Public | — | Получить главы для книги (кэшируется локально) |
| GET | `/:translationKey/chapters/:chapterKey/verses` | Public | — | Получить стихи для главы (кэшируется локально) |
| GET | `/:translationKey/verses/:startVerseKey-:endVerseKey` | Public | — | Получить текст стиха для диапазона. Логирует поиски. Некоторые переводы обходят кэширование в целях лицензирования |

### Пример: получить текст стиха

```
GET /content/bibles/de4e12af7f28f599-02/verses/GEN.1.1-GEN.1.3
```

```json
[
  { "verseKey": "GEN.1.1", "content": "In the beginning God created the heavens and the earth.", "bookKey": "GEN", "chapterNumber": 1, "verseNumber": 1 },
  { "verseKey": "GEN.1.2", "content": "Now the earth was formless and empty...", "bookKey": "GEN", "chapterNumber": 1, "verseNumber": 2 },
  { "verseKey": "GEN.1.3", "content": "And God said, \"Let there be light,\" and there was light.", "bookKey": "GEN", "chapterNumber": 1, "verseNumber": 3 }
]
```

## Песни

Базовый путь: `/content/songs`

| Method | Path | Auth | Permission | Описание |
|--------|------|------|------------|----------|
| GET | `/search?q=` | JWT | — | Поиск песен по запросу |
| GET | `/:id` | JWT | — | Получить песню по ID |
| GET | `/` | JWT | Content.Edit | Список всех песен |
| POST | `/` | JWT | Content.Edit | Создать или обновить песни (пакет) |
| POST | `/import` | JWT | — | Импортировать песни из FreeShow (пакет) |
| DELETE | `/:id` | JWT | Content.Edit | Удалить песню |

## Детали песен

Базовый путь: `/content/songDetails`

Детали песен являются глобальными (не ограничены церковью). Они представляют канонические метаданные песен, общие для всех церквей.

| Method | Path | Auth | Permission | Описание |
|--------|------|------|------------|----------|
| GET | `/:id` | JWT | — | Получить деталь песни по ID (глобально) |
| GET | `/` | JWT | — | Список деталей песен для церкви |
| POST | `/create` | JWT | — | Создать деталь песни из ID PraiseCharts (возвращает существующую, если уже создана). Автоматически загружает метаданные из PraiseCharts и MusicBrainz |
| POST | `/` | JWT | — | Создать или обновить детали песен (пакет) |

## Ссылки на детали песен

Базовый путь: `/content/songDetailLinks`

| Method | Path | Auth | Permission | Описание |
|--------|------|------|------------|----------|
| GET | `/:id` | JWT | — | Получить ссылку на деталь песни по ID |
| GET | `/songDetail/:songDetailId` | JWT | — | Получить все ссылки для детали песни |
| POST | `/` | JWT | — | Создать или обновить ссылки на детали песен (пакет). Автоматически загружает данные MusicBrainz, если связано |
| DELETE | `/:id` | JWT | — | Удалить ссылку на деталь песни |

## Аранжировки

Базовый путь: `/content/arrangements`

| Method | Path | Auth | Permission | Описание |
|--------|------|------|------------|----------|
| GET | `/:id` | JWT | — | Получить аранжировку по ID |
| GET | `/song/:songId` | JWT | Content.Edit | Получить аранжировки для песни |
| GET | `/songDetail/:songDetailId` | JWT | Content.Edit | Получить аранжировки для детали песни |
| GET | `/` | JWT | Content.Edit | Список всех аранжировок |
| POST | `/` | JWT | Content.Edit | Создать или обновить аранжировки (пакет) |
| POST | `/freeShow/missing` | JWT | — | Найти ID FreeShow, которых не существует в церкви. Тело: `{ freeShowIds: string[] }` |
| DELETE | `/:id` | JWT | Content.Edit | Удалить аранжировку (также удаляет ключи; удаляет песню, если не остается аранжировок) |

## Ключи аранжировок

Базовый путь: `/content/arrangementKeys`

| Method | Path | Auth | Permission | Описание |
|--------|------|------|------------|----------|
| GET | `/presenter/:churchId/:id` | Public | — | Получить ключ аранжировки с полными данными песни для представления |
| GET | `/:id` | JWT | — | Получить ключ аранжировки по ID |
| GET | `/arrangement/:arrangementId` | JWT | Content.Edit | Получить ключи для аранжировки |
| GET | `/` | JWT | Content.Edit | Список всех ключей аранжировок |
| POST | `/` | JWT | Content.Edit | Создать или обновить ключи аранжировок (пакет) |
| DELETE | `/:id` | JWT | Content.Edit | Удалить ключ аранжировки |

## Настройки

Базовый путь: `/content/settings`

| Method | Path | Auth | Permission | Описание |
|--------|------|------|------------|----------|
| GET | `/my` | JWT | — | Получить настройки текущего пользователя |
| GET | `/` | JWT | Settings.Edit | Получить все настройки для церкви |
| GET | `/public/:churchId` | Public | — | Получить открытые настройки для церкви (возвращается как пары ключ-значение) |
| POST | `/my` | JWT | — | Сохранить настройки уровня пользователя (поддерживает загрузку изображения base64) |
| POST | `/` | JWT | Settings.Edit | Сохранить настройки уровня церкви (поддерживает загрузку изображения base64) |
| DELETE | `/my/:id` | JWT | — | Удалить настройку пользователя |

## Предпросмотр

Базовый путь: `/content/preview`

| Method | Path | Auth | Permission | Описание |
|--------|------|------|------------|----------|
| GET | `/data/:key` | Public | — | Загрузить данные предпросмотра потока для церкви по ключу поддомена (вкладки, ссылки, сервисы, проповеди) |

## Галерея (стоковые фотографии)

Базовый путь: `/content/stock`

| Method | Path | Auth | Permission | Описание |
|--------|------|------|------------|----------|
| POST | `/search` | Public | — | Поиск стоковых фотографий Pexels. Тело: `{ term: "church" }` |

## PraiseCharts

Базовый путь: `/content/praiseCharts`

Интеграция с PraiseCharts для обнаружения музыки для богослужения и загрузки нотных листов.

| Method | Path | Auth | Permission | Описание |
|--------|------|------|------------|----------|
| GET | `/raw/:id` | JWT | — | Получить необработанные данные PraiseCharts для песни |
| GET | `/hasAccount` | JWT | — | Проверить, имеет ли пользователь связанный аккаунт PraiseCharts |
| GET | `/search?q=` | JWT | — | Поиск в каталоге PraiseCharts |
| GET | `/products/:id?keys=` | JWT | — | Получить продукты для песни (из библиотеки, если аутентифицирован, иначе из каталога) |
| GET | `/arrangement/raw/:id?keys=` | JWT | — | Получить необработанные данные аранжировки из библиотеки |
| GET | `/download?skus=&keys=&file_name=` | JWT | — | Загрузить файл из PraiseCharts (PDF или ZIP). Возвращает `{ redirectUrl }` |
| GET | `/authUrl?returnUrl=` | Public | — | Получить URL авторизации OAuth для PraiseCharts |
| GET | `/access?verifier=&token=&secret=` | JWT | — | Обменять верификатор OAuth на токен доступа и сохранить в настройках пользователя |
| GET | `/library` | JWT | — | Просмотреть библиотеку PraiseCharts пользователя |

## Поддержка

Базовый путь: `/content/support`

| Method | Path | Auth | Permission | Описание |
|--------|------|------|------------|----------|
| POST | `/createAudio` | Public | — | Преобразовать SSML в аудио MP3 с помощью AWS Polly. Тело: `{ ssml: "<speak>...</speak>" }` |

## Связанные страницы

- [Архитектура построителя веб-сайтов](../../architecture/website-builder) — как страницы, разделы, элементы, посты и переадресации связаны между собой во всех приложениях
- [Конечные точки членства](./membership) — люди, церкви, группы, роли, разрешения
- [Конечные точки посещаемости](./attendance) — отслеживание сервисов и посещений
- [Аутентификация и разрешения](./authentication) — поток входа, JWT, модель разрешений
- [Структура модуля](../module-structure) — паттерны организации кода
