---
title: "Общие библиотеки"
---

# Общие библиотеки

Общие библиотеки — это пакеты npm, опубликованные под областью `@churchapps`, которые переиспользуются во всех приложениях B1.

## Доступные библиотеки

- `@churchapps/api-helper` — помощники для API запросов
- `@churchapps/helpers` — утилиты и помощники
- и другие...

## Установка

```bash
npm install @churchapps/api-helper
```

## Использование

```javascript
import { ApiHelper } from '@churchapps/api-helper';

const data = await ApiHelper.get('/api/endpoint');
```

## Разработка

Чтобы разработать библиотеку локально:

1. Клонируйте репозиторий
2. Установите зависимости: `npm install`
3. Сделайте изменения
4. Протестируйте: `npm test`
5. Опубликуйте: `npm publish`

## Связанные документы

- [API Helper](api-helper.md)
- [Helpers](helpers.md)
