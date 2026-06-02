---
title: "Открытый формат урока"
---

# Открытый формат урока

<div class="article-intro">

Открытый формат урока — это стандартная JSON схема, которая позволяет поставщикам контента третьих сторон публиковать учебный план для Lessons.church. Любая организация, которая хостирует фид в этом формате, может быть добавлена как внешний поставщик, делая её контент доступным для просмотра и воспроизведения.

</div>

## Как это работает

Поставщик хостирует два типа конечных точек:

1. **Дерево поставщика** — единственный URL, который возвращает полный каталог программ, исследований, уроков и площадок.
2. **Фид площадки** — один URL на площадку, возвращающий полное содержание урока.

Когда церковь добавляет ваш URL в Lessons.church, платформа получает ваше дерево для обнаружения контента, затем получает фиды площадок по требованию.

## Дерево поставщика

Ваш URL должен вернуть JSON с этой структурой:

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
              "venues": [
                {
                  "id": "venue-1",
                  "name": "Kids",
                  "apiUrl": "https://example.com/feed/venues/venue-1"
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

| Поле | Тип | Описание |
|-------|------|-------------|
| `programs[].id` | string | Уникальный идентификатор |
| `programs[].name` | string | Название |
| `programs[].slug` | string | URL-дружественное имя |
| `programs[].image` | string | URL изображения (опциональный) |
| `programs[].about` | string | Описание (опциональный) |
| `studies[].id` | string | Уникальный идентификатор |
| `studies[].name` | string | Название |
| `studies[].slug` | string | URL-дружественное имя |
| `studies[].image` | string | URL изображения (опциональный) |
| `lessons[].id` | string | Уникальный идентификатор |
| `lessons[].name` | string | Название |
| `lessons[].slug` | string | URL-дружественное имя |
| `lessons[].title` | string | Полное название |
| `lessons[].image` | string | URL изображения (опциональный) |
| `lessons[].description` | string | Описание (опциональный) |
| `venues[].id` | string | Уникальный идентификатор |
| `venues[].name` | string | Название (например "Kids", "Adults") |
| `venues[].apiUrl` | string | URL фида площадки |

## Фид площадки

Каждый `apiUrl` должен вернуть JSON с содержанием урока включая разделы и действия.

## Типы действий

| Тип | Назначение |
|------|---------|
| `play` | Воспроизведение медиа — видео, аудио или слайды |
| `text` | Статическое содержание текста |
| `question` | Вопрос для обсуждения |
| `quote` | Цитата или стих Священного писания |
| `subhead` | Заголовок или разделитель |

:::tip
Для рабочего примера посмотрите встроенное содержание на `https://api.lessons.church/lessons/public/tree`.
:::
