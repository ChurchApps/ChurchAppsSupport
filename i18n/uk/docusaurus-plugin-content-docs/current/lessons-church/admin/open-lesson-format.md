---
title: "Формат відкритого уроку"
---

# Формат відкритого уроку

<div class="article-intro">

Формат відкритого уроку — це стандартизована схема JSON, яка дає змогу стороннім постачальникам контенту публікувати навчальні програми для Lessons.church. Будь-яку організацію, яка розміщує стрічку в цьому форматі, можна додати як зовнішнього постачальника. Її контент буде доступний для перегляду й відтворення поряд із вбудованою бібліотекою.

</div>

## Як це працює

Постачальник розміщує два типи кінцевих точок:

1. **Дерево постачальника** -- одна URL-адреса, яка повертає повний каталог програм, курсів, уроків і локацій. Кожна локація містить URL-адресу стрічки, що веде до детального вмісту уроку.
2. **Стрічка локації** -- по одній URL-адресі на кожну локацію, яка повертає повний вміст уроку (розділи, дії та медіафайли).

Коли церква додає URL-адресу вашого постачальника в Lessons.church, платформа завантажує ваше дерево, щоб знайти доступний контент, а потім завантажує стрічки окремих локацій за запитом.

## Дерево постачальника

URL-адреса вашого постачальника має повертати об'єкт JSON із такою структурою:

```json
{
  "programs": [
    {
      "id": "program-1",
      "name": "Gospel of Mark",
      "slug": "gospel-of-mark",
      "image": "https://example.com/images/mark.jpg",
      "about": "A 12-week study through the Gospel of Mark.",
      "studies": [
        {
          "id": "study-1",
          "name": "The Beginning",
          "slug": "the-beginning",
          "image": "https://example.com/images/study1.jpg",
          "lessons": [
            {
              "id": "lesson-1",
              "name": "The Baptism of Jesus",
              "slug": "baptism-of-jesus",
              "title": "The Baptism of Jesus",
              "image": "https://example.com/images/lesson1.jpg",
              "description": "An introduction to Jesus' ministry.",
              "bottomLine": "God keeps His promises.",
              "verse": "Genesis 9:13 — I have set my rainbow in the clouds…",
              "parentQuestion": "What is one promise God has kept in our family?",
              "parentNote": "Pray together thanking God for keeping His promises.",
              "venues": [
                {
                  "id": "venue-1",
                  "name": "Kids",
                  "apiUrl": "https://example.com/feed/venues/venue-1"
                },
                {
                  "id": "venue-2",
                  "name": "Adults",
                  "apiUrl": "https://example.com/feed/venues/venue-2"
                }
              ]
            }
          ]
        }
      ]
    }
  ]
}
```

### Поля дерева

| Поле | Тип | Опис |
|-------|------|-------------|
| `programs[].id` | рядок | Унікальний ідентифікатор програми |
| `programs[].name` | рядок | Назва для відображення |
| `programs[].slug` | рядок | Назва, придатна для URL |
| `programs[].image` | рядок | URL-адреса зображення програми (необов'язково) |
| `programs[].about` | рядок | Опис (необов'язково) |
| `studies[].id` | рядок | Унікальний ідентифікатор курсу |
| `studies[].name` | рядок | Назва для відображення |
| `studies[].slug` | рядок | Назва, придатна для URL |
| `studies[].image` | рядок | URL-адреса зображення курсу (необов'язково) |
| `lessons[].id` | рядок | Унікальний ідентифікатор уроку |
| `lessons[].name` | рядок | Назва для відображення |
| `lessons[].slug` | рядок | Назва, придатна для URL |
| `lessons[].title` | рядок | Повна назва |
| `lessons[].image` | рядок | URL-адреса зображення уроку (необов'язково) |
| `lessons[].description` | рядок | Короткий опис уроку (необов'язково). Каталожний текст для вчителів, які переглядають бібліотеку, а не домашнє завдання для батьків. |
| `lessons[].bottomLine` | рядок | Один речення з головною думкою для батьків, яку вони забирають додому (необов'язково) |
| `lessons[].verse` | рядок | Посилання на вірш для запам'ятовування та короткий текст (необов'язково) |
| `lessons[].parentQuestion` | рядок | Одне запитання, яке батьки можуть поставити вдома (необов'язково) |
| `lessons[].parentNote` | рядок | Додаткова примітка для батьків (необов'язково, у форматі markdown) |
| `venues[].id` | рядок | Унікальний ідентифікатор локації |
| `venues[].name` | рядок | Назва локації (наприклад, "Kids", "Adults", "Youth") |
| `venues[].apiUrl` | рядок | URL-адреса, що повертає стрічку локації (див. нижче) |

Чотири поля з головною думкою для батьків (`bottomLine`, `verse`, `parentQuestion`, `parentNote`) є необов'язковими як у дереві, так і в стрічці локації. Якщо їх немає, вони вважаються порожніми. Не копіюйте `description` у ці поля.

**Локації** відображають різні версії того самого уроку, адаптовані для різних аудиторій (вікових груп, умов тощо).

## Стрічка локації

Кожна `apiUrl` локації має повертати об'єкт JSON, який відповідає цій схемі:

```json
{
  "id": "venue-1",
  "name": "Kids",
  "lessonId": "lesson-1",
  "lessonName": "The Baptism of Jesus",
  "lessonImage": "https://example.com/images/lesson1.jpg",
  "lessonDescription": "An introduction to Jesus' ministry.",
  "bottomLine": "God keeps His promises.",
  "verse": "Genesis 9:13 — I have set my rainbow in the clouds…",
  "parentQuestion": "What is one promise God has kept in our family?",
  "parentNote": "Pray together thanking God for keeping His promises.",
  "studyName": "The Beginning",
  "studySlug": "the-beginning",
  "programName": "Gospel of Mark",
  "programSlug": "gospel-of-mark",
  "programAbout": "A 12-week study through the Gospel of Mark.",
  "downloads": [],
  "sections": [
    {
      "id": "section-1",
      "name": "Opening Discussion",
      "sort": 1,
      "materials": "Whiteboard and markers",
      "actions": [
        {
          "id": "action-1",
          "actionType": "text",
          "content": "**Key Verse:** Mark 1:9-11",
          "sort": 1
        },
        {
          "id": "action-2",
          "actionType": "question",
          "content": "What do you know about baptism?",
          "sort": 2,
          "role": "Leader"
        },
        {
          "id": "action-3",
          "actionType": "play",
          "content": "Intro Video",
          "sort": 3,
          "files": [
            {
              "id": "file-1",
              "name": "intro-video.mp4",
              "url": "https://example.com/media/intro.mp4",
              "streamUrl": "https://vimeo.com/123456789",
              "fileType": "video/mp4",
              "seconds": 180,
              "bytes": 52428800,
              "thumbnail": "https://example.com/media/intro-thumb.jpg",
              "loop": false
            }
          ]
        }
      ]
    }
  ]
}
```

### Поля стрічки локації

#### Кореневий об'єкт

| Поле | Тип | Опис |
|-------|------|-------------|
| `id` | рядок | Ідентифікатор локації |
| `name` | рядок | Назва локації |
| `lessonId` | рядок | Ідентифікатор уроку |
| `lessonName` | рядок | Назва уроку для відображення |
| `lessonImage` | рядок | URL-адреса зображення уроку |
| `lessonDescription` | рядок | Короткий опис уроку (каталожний текст) |
| `bottomLine` | рядок | Один речення з головною думкою для батьків (необов'язково) |
| `verse` | рядок | Посилання на вірш для запам'ятовування та короткий текст (необов'язково) |
| `parentQuestion` | рядок | Одне запитання, яке батьки можуть поставити вдома (необов'язково) |
| `parentNote` | рядок | Додаткова примітка для батьків, у форматі markdown (необов'язково) |
| `studyName` | рядок | Назва батьківського курсу |
| `studySlug` | рядок | Slug батьківського курсу |
| `programName` | рядок | Назва батьківської програми |
| `programSlug` | рядок | Slug батьківської програми |
| `programAbout` | рядок | Опис програми |
| `downloads` | масив | Пакети файлів для завантаження |
| `sections` | масив | Упорядковані розділи уроку |

#### Розділ

| Поле | Тип | Опис |
|-------|------|-------------|
| `id` | рядок | Ідентифікатор розділу |
| `name` | рядок | Назва розділу |
| `sort` | число | Порядок відображення |
| `materials` | рядок | Матеріали або примітки щодо підготовки (необов'язково) |
| `actions` | масив | Упорядковані дії в межах цього розділу |

#### Дія

| Поле | Тип | Опис |
|-------|------|-------------|
| `id` | рядок | Ідентифікатор дії |
| `actionType` | рядок | Одне з: `play`, `text`, `question`, `quote`, `subhead` |
| `content` | рядок | Текстовий вміст або мітка медіа |
| `sort` | число | Порядок відображення |
| `role` | рядок | Назва ролі, наприклад "Leader", "Kids" (необов'язково) |
| `roleId` | рядок | Ідентифікатор ролі (необов'язково) |
| `files` | масив | Медіафайли для дій `play` (необов'язково) |

#### Файл

| Поле | Тип | Опис |
|-------|------|-------------|
| `id` | рядок | Ідентифікатор файлу |
| `name` | рядок | Назва файлу |
| `url` | рядок | Пряма URL-адреса для завантаження |
| `streamUrl` | рядок | URL для потокового відтворення, наприклад посилання на Vimeo (необов'язково) |
| `fileType` | рядок | MIME-тип (наприклад, `video/mp4`, `image/jpeg`) |
| `seconds` | число | Тривалість аудіо- або відеофайлу в секундах (необов'язково) |
| `bytes` | число | Розмір файлу в байтах (необов'язково) |
| `thumbnail` | рядок | URL-адреса мініатюри (необов'язково) |
| `loop` | логічний | Чи має медіа повторюватися (необов'язково, за замовчуванням false) |

#### Завантаження

| Поле | Тип | Опис |
|-------|------|-------------|
| `name` | рядок | Назва пакета для завантаження (наприклад, "Printable Materials") |
| `files` | масив | Файли в цьому пакеті завантаження (ті самі поля, що й у File вище) |

## Типи дій

| Тип | Призначення |
|------|---------|
| `play` | Відтворення медіа -- відео, аудіо або слайд-шоу. Має містити `files`. |
| `text` | Статичний текстовий вміст. Підтримує жирний шрифт у стилі markdown (`**текст**`). |
| `question` | Запитання для обговорення або роздумів для аудиторії. |
| `quote` | Виділена цитата або уривок з Писання. |
| `subhead` | Заголовок або роздільник усередині розділу. |

:::tip
Щоб побачити робочий приклад стрічки, можна переглянути вбудоване дерево контенту Lessons.church за адресою `https://api.lessons.church/lessons/public/tree` і відкрити будь-яку URL-адресу стрічки локації з нього.
:::
