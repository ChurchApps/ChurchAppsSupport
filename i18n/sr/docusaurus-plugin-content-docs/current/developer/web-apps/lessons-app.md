---
title: "LessonsApp"
description: "Локално подешавање LessonsApp Next.js уређивача лекција на Node.js 22+, повезивање са локалним LessonsApi и S3/CloudFront постављање."
---

# LessonsApp

<div class="article-intro">

LessonsApp је апликација за управљање садржајем лекција за [Lessons.church](https://lessons.church). Пружа интерфејс за креирање, организовање и објављивање црквених наставних програма, изграђена помоћу Next.js-а и React-а.

</div>

<div class="prereqs">
<h4>Пре почетка</h4>

- Инсталирајте **Node.js 22+** и **Git** -- видите [Предуслови](../setup/prerequisites.md)
- Конфигуришите адресу свог API-ја (локални LessonsApi) -- видите [Променљиве окружења](../setup/environment-variables.md)

</div>

:::warning
LessonsApp захтева Node.js 22 или новију верзију. Раније верзије нису подржане.
:::

## Подешавање

### 1. Клонирајте репозиторијум

```bash
git clone https://github.com/ChurchApps/LessonsApp.git
```

### 2. Инсталирајте зависности

```bash
cd LessonsApp
npm install
```

### 3. Конфигуришите променљиве окружења

Копирајте пример фајла са окружењем у `.env` и конфигуришите крајње тачке API-ја:

```bash
cp dotenv.sample.txt .env
```

Ажурирајте URL-ове крајњих тачака API-ја тако да упућују на вашу локалну инстанцу LessonsApi-ја (`http://localhost:8090`). Staging Lessons API је укинут, па замените све `api.staging.lessons.church` URL-ове који су остали у примерном фајлу.

### 4. Покрените dev сервер

```bash
npm run dev
```

Next.js dev сервер се покреће на адреси [http://localhost:3501](http://localhost:3501).

## Кључне команде

| Команда | Опис |
|---------|------|
| `npm run dev` | Покреће Next.js dev сервер на порту 3501 |
| `npm run build` | Производна изградња помоћу Next.js-а |

## Технолошки стек

- **Next.js 16** са TypeScript-ом
- **React 19** за UI компоненте
- **`@churchapps/apphelper*`** пакети за дељене компоненте

:::info
LessonsApp комуницира са позадинским сервисом **LessonsApi**, који је посебан API у односу на главни ChurchApps Api. Уверите се да је ваше окружење конфигурисано исправном крајњом тачком Lessons API-ја.
:::

## Постављање

Производне изградње се постављају на **S3 + CloudFront**:

1. `npm run build` генерише оптимизовану Next.js изградњу
2. Излаз изградње се синхронизује са S3 бакетом
3. Покреће се CloudFront инвалидација како би се послала нова верзија

:::tip
За детаљна упутства о постављању погледајте водич [Постављање веб апликација](../deployment/web-apps.md).
:::
