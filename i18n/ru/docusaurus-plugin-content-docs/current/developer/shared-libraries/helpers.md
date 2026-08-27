---
title: "Помощники"
---

# Помощники

Библиотека `@churchapps/helpers` предоставляет утилиты для работы с данными, датами и другими общими задачами.

## Функции

```javascript
import { DateHelper, StringHelper, ArrayHelper } from '@churchapps/helpers';

// Работа с датами
const formatted = DateHelper.format(new Date(), 'YYYY-MM-DD');
const days = DateHelper.getDaysBetween(start, end);

// Работа со строками
const slug = StringHelper.toSlug('Hello World'); // 'hello-world'
const initials = StringHelper.getInitials('John Doe'); // 'JD'

// Работа с массивами
const unique = ArrayHelper.unique([1, 2, 2, 3]); // [1, 2, 3]
const grouped = ArrayHelper.groupBy(items, 'category');
```

## Использование

```javascript
import { DateHelper } from '@churchapps/helpers';

const today = DateHelper.today();
```

## Связанные документы

- [API Helper](api-helper.md)
- [Shared Libraries](index.md)
