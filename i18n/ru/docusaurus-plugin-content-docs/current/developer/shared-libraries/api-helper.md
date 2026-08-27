---
title: "API Helper"
---

# API Helper

Библиотека `@churchapps/api-helper` предоставляет удобные методы для выполнения HTTP запросов к B1 API.

## Методы

```javascript
import { ApiHelper } from '@churchapps/api-helper';

// GET запрос
const data = await ApiHelper.get('/api/people');

// POST запрос
const result = await ApiHelper.post('/api/people', { name: 'John' });

// PUT запрос
await ApiHelper.put('/api/people/1', { name: 'Jane' });

// DELETE запрос
await ApiHelper.delete('/api/people/1');
```

## Аутентификация

```javascript
ApiHelper.setAuthToken('your-token-here');
```

## Обработка ошибок

```javascript
try {
  const data = await ApiHelper.get('/api/people');
} catch (error) {
  console.error('Ошибка:', error);
}
```

## Связанные документы

- [Helpers](helpers.md)
- [Shared Libraries](index.md)
