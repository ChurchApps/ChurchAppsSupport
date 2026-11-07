---
title: "Формат отворене лекције"
---

# Формат отворене лекције

<div class="article-intro">

Формат отворене лекције је стандардизована JSON шема која омогућава добављачима трећих страна да објављују наставни програм за Lessons.church. Свака организација која хостује фид у овом формату може бити додата као спољни добављач, чиме њихов садржај постаје доступан за прегледање и репродукцију заједно са уграђеном библиотеком.

</div>

## Како функционише

Добављач хостује две врсте крајњих тачака:

1. **Стабло добављача** -- Једна URL адреса која враћа комплетан каталог програма, студија, лекција и места. Свако место садржи фид URL адресу која води до детаљног садржаја лекције.
2. **Фид места** -- Једна URL адреса по месту, која враћа комплетан садржај лекције (делове, радње и медијске фајлове).

Када црква дода URL адресу вашег добављача у Lessons.church, платформа преузима стабло да би открила доступан садржај, а затим на захтев преузима појединачне фидове места.

## Стабло добављача

Ваша URL адреса добављача мора да враћа JSON објекат са следећом структуром:

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

### Поља стабла

| Поље | Тип | Опис |
|-------|------|-------------|
| `programs[].id` | string | Јединствени идентификатор програма |
| `programs[].name` | string | Приказани назив |
| `programs[].slug` | string | Назив прилагођен за URL |
| `programs[].image` | string | URL адреса слике програма (опционо) |
| `programs[].about` | string | Опис (опционо) |
| `studies[].id` | string | Јединствени идентификатор студије |
| `studies[].name` | string | Приказани назив |
| `studies[].slug` | string | Назив прилагођен за URL |
| `studies[].image` | string | URL адреса слике студије (опционо) |
| `lessons[].id` | string | Јединствени идентификатор лекције |
| `lessons[].name` | string | Приказани назив |
| `lessons[].slug` | string | Назив прилагођен за URL |
| `lessons[].title` | string | Пун наслов |
| `lessons[].image` | string | URL адреса слике лекције (опционо) |
| `lessons[].description` | string | Сажетак лекције (опционо). Текст за каталог намењен учитељима који прегледају библиотеку, а не кратак закључак за родитеље. |
| `lessons[].bottomLine` | string | Једна реченица као закључак за родитеље за кући (опционо) |
| `lessons[].verse` | string | Референца на стих за памћење и кратак текст (опционо) |
| `lessons[].parentQuestion` | string | Једно питање које родитељи постављају код куће (опционо) |
| `lessons[].parentNote` | string | Опциона додатна напомена за родитеље (markdown) |
| `venues[].id` | string | Јединствени идентификатор места |
| `venues[].name` | string | Назив места (нпр. "Kids", "Adults", "Youth") |
| `venues[].apiUrl` | string | URL адреса која враћа фид места (видети испод) |

Четири поља за закључак за родитеље (`bottomLine`, `verse`, `parentQuestion`, `parentNote`) су опциона и у стаблу и у фиду места. Ако су изостављена, сматрају се празним. Немојте копирати `description` у њих.

**Места** представљају различите верзије исте лекције прилагођене различитим публикама (узрасним групама, окружењима и слично).

## Фид места

`apiUrl` сваког места мора да враћа JSON објекат који одговара овој шеми:

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

### Поља фида места

#### Корени објекат

| Поље | Тип | Опис |
|-------|------|-------------|
| `id` | string | Идентификатор места |
| `name` | string | Назив места |
| `lessonId` | string | Идентификатор лекције |
| `lessonName` | string | Приказани назив лекције |
| `lessonImage` | string | URL адреса слике лекције |
| `lessonDescription` | string | Сажетак лекције (текст за каталог) |
| `bottomLine` | string | Једна реченица као закључак за родитеље за кући (опционо) |
| `verse` | string | Референца на стих за памћење и кратак текст (опционо) |
| `parentQuestion` | string | Једно питање које родитељи постављају код куће (опционо) |
| `parentNote` | string | Опциона додатна напомена за родитеље, markdown (опционо) |
| `studyName` | string | Назив студије којој лекција припада |
| `studySlug` | string | Назив студије прилагођен за URL |
| `programName` | string | Назив програма којем припада |
| `programSlug` | string | Назив програма прилагођен за URL |
| `programAbout` | string | Опис програма |
| `downloads` | array | Пакети фајлова за преузимање |
| `sections` | array | Уређени делови лекције |

#### Део

| Поље | Тип | Опис |
|-------|------|-------------|
| `id` | string | Идентификатор дела |
| `name` | string | Наслов дела |
| `sort` | number | Редослед приказа |
| `materials` | string | Материјали или напомене за припрему (опционо) |
| `actions` | array | Уређене радње унутар овог дела |

#### Радња

| Поље | Тип | Опис |
|-------|------|-------------|
| `id` | string | Идентификатор радње |
| `actionType` | string | Једна од вредности: `play`, `text`, `question`, `quote`, `subhead` |
| `content` | string | Текстуални садржај или назив медија |
| `sort` | number | Редослед приказа |
| `role` | string | Назив улоге, нпр. "Leader", "Kids" (опционо) |
| `roleId` | string | Идентификатор улоге (опционо) |
| `files` | array | Медијски фајлови за радње `play` (опционо) |

#### Фајл

| Поље | Тип | Опис |
|-------|------|-------------|
| `id` | string | Идентификатор фајла |
| `name` | string | Назив фајла |
| `url` | string | Директна URL адреса за преузимање |
| `streamUrl` | string | URL адреса за стриминг, нпр. Vimeo линк (опционо) |
| `fileType` | string | MIME тип (нпр. `video/mp4`, `image/jpeg`) |
| `seconds` | number | Трајање у секундама за аудио или видео (опционо) |
| `bytes` | number | Величина фајла у бајтовима (опционо) |
| `thumbnail` | string | URL адреса сличице (опционо) |
| `loop` | boolean | Да ли медијум треба да се пушта у петљи (опционо, подразумевано false) |

#### Преузимање

| Поље | Тип | Опис |
|-------|------|-------------|
| `name` | string | Назив пакета за преузимање (нпр. "Printable Materials") |
| `files` | array | Фајлови у овом пакету за преузимање (исти поља као и Фајл изнад) |

## Типови радњи

| Тип | Намена |
|------|---------|
| `play` | Репродукција медија -- видео, аудио или слајдшоу. Мора да садржи `files`. |
| `text` | Статични текстуални садржај. Подржава подебљани текст у стилу markdown-а (`**текст**`). |
| `question` | Питање за дискусију или размишљање за публику. |
| `quote` | Истакнути цитат или одломак из Светог писма. |
| `subhead` | Наслов или разделник унутар дела. |

:::tip
Да бисте видели пример фида у раду, погледајте уграђено стабло садржаја Lessons.church на `https://api.lessons.church/lessons/public/tree` и преузмите било коју URL адресу фида места из њега.
:::
