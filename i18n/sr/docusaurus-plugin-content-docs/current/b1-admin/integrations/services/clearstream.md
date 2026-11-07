---
title: "Clearstream"
description: "Повежите Clearstream SMS са B1 Admin преко Zapier: шаљите поруке при новим поклонима или пријавама образаца и враћајте одговоре као особе."
---

# Clearstream

<div class="article-intro">

Покрените текстуалну поруку преко [Clearstream](https://clearstream.io) из било ког B1 догађаја: нове особе, новог прилога, слања обрасца или ажурирања календара. Одговоре можете враћати назад као B1 записе. Clearstream-ов Zapier додатак подржава оба смера, па је цело повезивање рецепт, а не прилагођени код.

</div>

<div class="prereqs">
<h4>Пре почетка</h4>

- Налог на [Clearstream](https://clearstream.io) са најмање једном листом и SMS квотом
- Налог на [Zapier](https://zapier.com)
- Корисник B1Admin са дозволом **Edit Settings** (уређивање подешавања)

</div>

## Шта можете да повежете

| Смер | Окидач | Радња |
|---|---|---|
| B1 → Clearstream | B1 `person.created` | Clearstream: Create/Update Subscriber + Send Text to Number |
| B1 → Clearstream | B1 `donation.created` | Clearstream: Send Text to List (нпр. обавештење финансијском тиму) |
| B1 → Clearstream | B1 `form.submission.created` | Clearstream: Send Text to List (нпр. тим за молитвене захтеве) |
| Clearstream → B1 | New Incoming Text | B1: Create Person; označite oznakom ključnu reč koju su poslali |

Clearstream-ове Zapier радње: *Send Text to Number*, *Send Text to List*, *Create/Update Subscriber*, *Add Subscriber to Automated Workflow*, *Add Tag to Subscriber*, *Remove Subscriber From List*.

## Подешавање

### 1. Направите B1 API кључ

**Подешавања → Програмер → API кључеви → Нови API кључ**:

- `settings:write`: неопходно да би B1 регистровао webhook за окидач
- `people:read`: потребно за преузимање особе из догађаја (`personId` → име/телефон/имејл)
- (Опционо) `people:write` ако одговори из Clearstream-а треба да креирају B1 контакте

### 2. Направите Zap за слање текста при новом прилогу

1. **Окидач**: B1.church: New Donation
2. **Радња**: B1.church: Find Person (`personId` из прилога)
3. **Радња**: Clearstream: Send Text to Number. Као примаоца користите телефон особе из корака 2 и саставите поруку (`"Хвала на вашем прилогу, {first}! …"`).

Укључите Zap. B1 региструје webhook за прилоге при активацији. Видећете `Zapier — donation.created` у **Подешавања → Програмер → Webhooks**.

### 3. (Опционо) Вратите одговоре назад као B1 записе

1. **Окидач**: Clearstream: New Incoming Text
2. **Радња**: Filter by Zapier по кључној речи, нпр. наставите само ако текст поруке почиње са `PRAY`
3. **Радња**: B1.church: Find Person (по телефону)
4. **Радња**: Filter / Path. Ако особа није пронађена, креирајте је. У сваком случају, сачувајте текст поруке негде (Slack, Google табела или B1 слање обрасца путем Webhooks by Zapier).

## Уобичајени рецепти

### Позивање тима волонтера

- **Окидач**: B1.church: New Form Submission (филтрирано по ИД-у обрасца за молитвени захтев)
- **Радња**: Clearstream: Send Text to List, где је листа ваш дежурни пастирски тим. Саставите текст као `Нови молитвени захтев: {data.questions.0.answer}`.

### Праћење посетиоца који долази први пут

- **Окидач**: B1.church: New Person, филтрирано по B1 ознаци особе „First-time visitor“
- **Радња**: Clearstream: Add Subscriber to Automated Workflow. Мапирајте ИД тока рада на унапред направљени 7-дневни дрип низ порука.

### Придруживање групи путем кључне речи

- **Окидач**: Clearstream: New Incoming Text (филтрирајте на кључну реч `MENS`)
- **Радња**: B1.church: Find Person (по телефону); гранање при „није пронађено“ → Create Person
- **Радња**: B1.church: Add Group Member, додајте члана у групу Men's Ministry

## Ограничења и напомене

- **Clearstream обрачунава SMS по поруци.** Свака радња Send Text троши један или више кредита, у зависности од дужине и броја прималаца. Проверите квоту свог пакета.
- **Телефон мора бити у E.164 формату** (нпр. `+15555550199`) за *Send Text to Number*. B1 чува онај формат који је унет. Ако не можете да гарантујете формат, користите корак *Formatter by Zapier — Numbers → Format Phone Number*.
- **Са B1 стране није потребно заглавље.** Clearstream-ова аутентификација се потпуно налази у његовој Zapier вези.

## Решавање проблема

- **Окидач се никада не активира.** `Подешавања → Програмер → Webhooks` би требало да прикаже ред `Zapier — <event>` након што укључите Zap. Ако га нема, B1 API кључу недостаје `settings:write`. Поново направите кључ и повежите га.
- **Clearstream враћа „Invalid phone number“.** Поље за примаоца није у E.164 формату. Додајте корак Format Phone Number.
- **Send Text to List не успева са `403`.** API корисник Clearstream-а нема дозволу за ту листу или је ИД листе погрешан. ИД-еви листа су видљиви на страници са детаљима листе у Clearstream-у.

## Погледајте и

- [Text In Church](./text-in-church.md): алтернативна SMS платформа сличне структуре повезивања
- [Mobile Message](./mobile-message.md): за цркве ван САД
- [Zapier (преглед)](../zapier.md): B1 страна сваког Zapier рецепта
- [Clearstream API документација](https://api-docs.clearstream.io/): за прилагођене интеграције изван Zapier додатка
