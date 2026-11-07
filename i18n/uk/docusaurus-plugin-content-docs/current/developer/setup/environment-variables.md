---
title: "Змінні середовища"
---

# Змінні середовища

<div class="article-intro">

Кожен проєкт ChurchApps використовує файл `.env` для локальної конфігурації. Кожен проєкт містить зразковий файл, який ви копіюєте та налаштовуєте. Ця сторінка описує змінні середовища для API, веб-застосунків і мобільних застосунків, зокрема те, як вибрати між демонстраційним і локальним API.

</div>

<div class="prereqs">
<h4>Перш ніж почати</h4>

- Встановіть [необхідні компоненти](./prerequisites) для вашого проєкту
- Клонуйте репозиторій проєкту, з яким хочете працювати
- Ознайомтеся з [оглядом проєкту](./project-overview), щоб зрозуміти, які модулі API потрібні вашому проєкту

</div>

## Загальний порядок

1. Знайдіть `dotenv.sample.txt` або `.env.sample` у корені проєкту.
2. Скопіюйте його як `.env`.
3. За потреби змініть значення.

```bash
# Приклад для проєкту з .env.sample
cp .env.sample .env

# Приклад для проєкту з dotenv.sample.txt
cp dotenv.sample.txt .env
```

:::warning
**Ніколи не додавайте файли `.env` до системи контролю версій.** Вони містять секрети, зокрема облікові дані бази даних, ключі API та секрети JWT. Усі проєкти ChurchApps включають `.env` до `.gitignore`, але завжди перевіряйте перед комітом.
:::

## Вибір цілі API

Найважливіше рішення — куди вказує ваш фронтенд для викликів API. Є два варіанти:

### Варіант 1: Демонстраційні API (рекомендовано для розробки фронтенду)

Використовуйте спільне демонстраційне середовище. Локальний API та налаштування бази даних не потрібні. Воно працює з останнім кодом із `main`, а його зразкові дані щоночі наповнюються заново.

```bash
# Шаблон базової URL
https://api.demo.churchapps.org/{module}

# Приклади URL модулів
https://api.demo.churchapps.org/membership
https://api.demo.churchapps.org/attendance
https://api.demo.churchapps.org/content
https://api.demo.churchapps.org/giving
https://api.demo.churchapps.org/messaging
https://api.demo.churchapps.org/doing
```

:::warning
Проміжне середовище (`api.staging.churchapps.org`, `api.staging.lessons.church` та пов'язані хости) було вимкнено. Деякі зразкові файли `.env` можуть ще містити URL проміжного середовища; замініть їх демонстраційними або локальними значеннями, наведеними на цій сторінці. Спільного непродуктивного API Lessons немає — за потреби запускайте [LessonsApi](https://github.com/ChurchApps/LessonsApi) локально (він слухає порт `8090`).
:::

### Варіант 2: Локальний API

Запустіть проєкт Api на своєму комп'ютері. Потрібні MySQL 8.0+ зі створеними базами даних для кожного модуля. Див. посібник [локальне налаштування API](../api/local-setup).

```bash
# Шаблон базової URL
http://localhost:8084/{module}

# Приклади URL модулів
http://localhost:8084/membership
http://localhost:8084/attendance
http://localhost:8084/content
http://localhost:8084/giving
http://localhost:8084/messaging
http://localhost:8084/doing
```

---

## Змінні середовища API

Основний проєкт **Api** (`.env.sample`) має найбільше налаштувань. Ось ключові змінні:

### Спільні налаштування

| Змінна | Опис | Приклад |
|--------|------|---------|
| `ENVIRONMENT` | Середовище виконання | `dev` |
| `SERVER_PORT` | HTTP-порт локального сервера розробки | `8084` |
| `ENCRYPTION_KEY` | 192-бітний ключ шифрування для чутливих даних | `aSecretKeyOfExactly192BitsLength` |
| `JWT_SECRET` | Секрет для підпису JSON Web Tokens | `jwt-secret-dev` |
| `FILE_STORE` | Де зберігати завантажені файли (`disk` або `s3`) | `disk` |
| `CORS_ORIGIN` | Дозволені джерела CORS (`*` для локальної розробки) | `*` |

### Підключення до бази даних

Одна базова URL вказує API на MySQL. API створює окрему базу даних для кожного модуля (`/membership`, `/attendance`, `/content`, `/giving`, `/messaging`, `/doing`, `/reporting`) на основі цієї базової URL.

| Змінна | Приклад |
|--------|---------|
| `API_DATABASE_URL` | `mysql://root:password@localhost:3306` |

:::tip
Замініть `root:password` на ваші реальні облікові дані MySQL. Кожна база даних модуля має існувати до запуску API. Використовуйте `npm run initdb`, щоб створити схему для всіх модулів, або `npm run initdb:membership` для окремого модуля.
:::

### Налаштування WebSocket

| Змінна | Опис | Приклад |
|--------|------|---------|
| `SOCKET_PORT` | Порт сервера WebSocket | `8087` |
| `SOCKET_URL` | URL WebSocket, до якого підключаються клієнти | `ws://localhost:8087` |

---

## Змінні середовища веб-застосунків

### B1Admin (React + Vite)

Зразковий файл: `.env.sample`

| Змінна | Опис | Приклад (демо) |
|--------|------|----------------|
| `REACT_APP_STAGE` | Назва середовища | `demo` |
| `PORT` | Порт сервера розробки | `3101` |
| `REACT_APP_API_BASE` | Єдина базова URL для всіх API ChurchApps (`/membership`, `/attendance`, `/content`, `/giving`, `/messaging`, `/doing`, `/reporting` додаються автоматично) | `https://api.demo.churchapps.org` |
| `REACT_APP_CONTENT_ROOT` | URL доставки контенту | `https://democontent.churchapps.org` |
| `REACT_APP_GOOGLE_ANALYTICS` | Ідентифікатор Google Analytics (необов'язково) | `UA-123456789-1` |

Для розробки з локальним API вкажіть базову URL на ваш локальний стек:

```bash
REACT_APP_API_BASE=http://localhost:8084
```

### B1App (Next.js)

Зразковий файл: `.env.sample`

| Змінна | Опис | Приклад (демо) |
|--------|------|----------------|
| `NEXT_PUBLIC_API_BASE` | Єдина базова URL для всіх API ChurchApps (`/membership`, `/attendance`, `/content`, `/giving`, `/messaging`, `/doing`, `/reporting` додаються автоматично) | `https://api.demo.churchapps.org` |
| `NEXT_PUBLIC_CONTENT_ROOT` | URL доставки контенту | `https://democontent.churchapps.org` |
| `NEXT_PUBLIC_GOOGLE_ANALYTICS` | Ідентифікатор Google Analytics (необов'язково) | `UA-123456789-1` |

:::info
Next.js вимагає префікс `NEXT_PUBLIC_` для будь-якої змінної середовища, яка має бути доступною в браузері. Змінні, що використовуються лише на сервері, цього префікса не потребують.
:::

### LessonsApp (Next.js)

Зразковий файл: `dotenv.sample.txt`

| Змінна | Опис | Приклад (локальний LessonsApi) |
|--------|------|--------------------------------|
| `STAGE` | Етап середовища (залиште невстановленим або `dev` для локальної розробки) | `dev` |
| `NEXT_PUBLIC_LESSONS_API` | URL API Lessons | `http://localhost:8090` |
| `NEXT_PUBLIC_CONTENT_ROOT` | URL доставки контенту | `http://localhost:8090/content` |
| `NEXT_PUBLIC_API_BASE` | Базова URL API ChurchApps для входу (враховується лише тоді, коли `STAGE` не встановлено або має значення `dev`) | `https://api.demo.churchapps.org` |

---

## Змінні середовища мобільних застосунків

### B1Mobile (React Native / Expo)

Зразковий файл: `dotenv.sample.txt`

| Змінна | Опис | Приклад (демо) |
|--------|------|----------------|
| `STAGE` | Назва середовища | `dev` |
| `MEMBERSHIP_API`, `ATTENDANCE_API`, `GIVING_API`, `DOING_API`, `MESSAGING_API`, `CONTENT_API` | Одна URL для кожного модуля API ChurchApps (за замовчуванням використовується продуктивне середовище, якщо не встановлено) | `https://api.demo.churchapps.org/membership` |
| `LESSONS_API` | API Lessons (окремий хост; спільного непродуктивного немає) | `https://api.lessons.church` |
| `CONTENT_ROOT` | URL доставки контенту | `https://democontent.churchapps.org` |
| `LESSONS_ROOT` | URL сайту Lessons | `https://lessons.church` |

:::info
Мобільні застосунки не використовують префікси `REACT_APP_` або `NEXT_PUBLIC_`. Доступ до змінних середовища здійснюється через конфігурацію Expo.
:::

---

## Швидкий довідник: розташування зразкових файлів

| Проєкт | Зразковий файл |
|--------|----------------|
| Api | `.env.sample` |
| B1Admin | `.env.sample` |
| B1App | `.env.sample` |
| B1Mobile | `dotenv.sample.txt` |
| B1Checkin | `dotenv.sample.txt` |
| LessonsApp | `dotenv.sample.txt` |
| AskApi | `dotenv.sample.txt` |
