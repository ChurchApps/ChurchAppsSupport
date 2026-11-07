---
title: "Локално подешавање API-ја"
---

# Локално подешавање API-ја

<div class="article-intro">

Овај водич вас води кроз подешавање ChurchApps API-ја за локални развој. Клонираћете репозиторијум, подесити везе са базом података, иницијализовати шему и покренути сервер за развој са аутоматским освежавањем.

</div>

<div class="prereqs">
<h4>Пре почетка</h4>

- Инсталирајте **Node.js 24+**, **Git** и **MySQL 8.0+** -- погледајте [Предуслове](../setup/prerequisites)
- Направите MySQL корисника са привилегијама за креирање база података
- Погледајте референцу [Променљиве окружења](../setup/environment-variables) за конфигурацију API-ја

</div>

## Корак по корак подешавање

### 1. Клонирајте репозиторијум

```bash
git clone https://github.com/ChurchApps/Api.git
```

### 2. Инсталирајте зависности

Пројекат користи Yarn (заштита блокира `npm install`):

```bash
cd Api
yarn install
```

### 3. Конфигуришите променљиве окружења

```bash
cp .env.sample .env
```

Отворите `.env` и подесите MySQL везе. Свака база модула захтева сопствену везу у следећем формату:

```
mysql://root:password@localhost:3306/dbname
```

Потребне су вам везе за свих шест база модула (membership, attendance, content, giving, messaging, doing).

### 4. Иницијализујте базе података

```bash
npm run initdb
```

Ова команда аутоматски креира све шест база података и њихове табеле.

:::tip
Базу једног модула можете иницијализовати командом `npm run initdb -- --module=membership` (или `attendance`, `content`, `giving`, `messaging`, `doing`).
:::

### 5. Покрените сервер за развој

```bash
npm run dev
```

API се покреће са аутоматским освежавањем на адреси [http://localhost:8084](http://localhost:8084).

## Кључне команде

| Команда | Опис |
|---------|------|
| `npm run dev` | Покреће сервер за развој са аутоматским освежавањем (tsx watch) |
| `npm run build` | Чисти, компајлира TypeScript и копира ресурсе |
| `npm run test` | Покреће тестове помоћу Jest-а (укључује покривеност) |
| `npm run test:watch` | Покреће тестове у режиму праћења |
| `npm run lint` | Покреће ESLint са аутоматским исправкама (ESLint је једини формататор) |

## Распоређивање

Тестно окружење је укинуто. API се распоређује у демо окружење при сваком push-у на `main` грану, а у продукцију кроз ручни workflow **Deploy Prod**, који такође примењује све миграције базе података које су на чекању. Детаље погледајте у [Распоређивање API-ја](../deployment/apis).

## Локални развој библиотека

Ако желите да развијате дељену библиотеку (`@churchapps/helpers` или `@churchapps/apihelper`) заједно са API-јем, изградите је у радном простору [Packages](https://github.com/ChurchApps/Packages) и додајте привремени Yarn portal у API:

```bash
# In the Packages workspace
yarn build

# In the API directory
yarn link ../Packages/helpers
# ... test ...
yarn unlink ../Packages/helpers && yarn install
```

Тако можете тестирати измене библиотеке у API-ју без објављивања на npm. Погледајте [Дељене библиотеке](../shared-libraries/#local-development-against-a-consuming-app) за детаље -- и никада не commit-ујте portal резолуцију коју `link` уписује у `package.json`.

## Повезани чланци

- **[База података](./database)** -- Разумевање архитектуре базе по модулу
- **[Структура модула](./module-structure)** -- Како су организовани контролери, репозиторијуми и модели
- **[Дељене библиотеке](../shared-libraries/)** -- Рад са `@churchapps/helpers` и `@churchapps/apihelper`
