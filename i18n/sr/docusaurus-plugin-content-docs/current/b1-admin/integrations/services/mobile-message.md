---
title: "Mobile Message"
description: "Повежите догађаје B1 Admin са Mobile Message SMS API-јем преко Zapier или Make webhook-ова за поруке добродошлице, донација и подсетника."
---

# Mobile Message

<div class="article-intro">

[Mobile Message](https://mobilemessage.com.au) је аустралијски SMS API који је popularan među аустралијским црквама јер нуди локалне бројеве и конкурентне аустралијске цене, за разлику од Clearstream-а и Text In Church-а, који су усмерени на САД. Mobile Message тренутно нема званичну Zapier апликацију, али објављује јавни REST API, тако да можете за неколико минута повезати B1 догађаје са SMS порукама Mobile Message-а путем **Webhooks by Zapier** (или Make-овог HTTP модула).

</div>

<div class="prereqs">
<h4>Пре почетка</h4>

- Налог на [Mobile Message](https://mobilemessage.com.au) са регистрованим ID-јем пошиљаоца и API акредитивима (API корисничко име и лозинка под *Account → API Settings*)
- Налог на [Zapier](https://zapier.com) (или на [Make](https://www.make.com))
- Корисник B1Admin са дозволом **Edit Settings**

</div>

## Шта можете повезати

Mobile Message API је по природи „слање SMS-а“: нема окидача, само одлазне поруке. Зато су сви рецепти смера B1 → SMS:

| Смер | B1 окидач | Исход |
|---|---|---|
| B1 → Mobile Message | `person.created` | Порука добродошлице новој особи |
| B1 → Mobile Message | `donation.created` | Порука захвалнице донатору |
| B1 → Mobile Message | `form.submission.created` | Обавештење дежурном тиму |
| B1 → Mobile Message | `event.created` | Подсетник у виду масовне поруке листи |

## Подешавање

### 1. Креирајте B1 API кључ

**Settings → Developer → API Keys → New API Key**:

- `settings:write`: за регистрацију webhook-а окидача
- `people:read`: за проналажење броја телефона примаоца помоћу `personId`

### 2. Направите Zap помоћу Webhooks by Zapier

1. **Окидач**: B1.church, изаберите догађај који желите (нпр. New Donation).
2. **Радња**: B1.church, Find Person (користећи `data.personId`) да бисте добили број телефона и име.
3. **Радња**: Webhooks by Zapier, **POST**. Подесите као испод.

Подешавања POST корака:

- **URL**: `https://api.mobilemessage.com.au/v1/messages`
- **Payload Type**: JSON
- **Data**:
  ```json
  {
    "messages": [
      {
        "to": "{{step2_phone}}",
        "message": "Thanks for your gift, {{step2_first_name}}!",
        "sender": "YourChurch"
      }
    ]
  }
  ```
- **Headers**: `Content-Type: application/json` (Webhooks by Zapier ово додаје аутоматски)
- **Basic Auth**: у поље *Basic Auth* унесите `<api_username>|<api_password>` (Zapier то претвара у одговарајуће заглавље `Authorization: Basic …`)

Укључите Zap. Пошаљите пробну донацију у B1Admin да бисте проверили да порука стиже.

## Уобичајени рецепти

### Подсетници за догађаје ујутро

- **Окидач**: Schedule by Zapier (дневно, у 7 ујутро)
- **Радња**: B1.church, Find Events за данас (или користите Find корак са фиксним филтером датума, или сачувајте данашњу листу догађаја у Google табели)
- **Радња**: Webhooks by Zapier, POST на Mobile Message са листом догађаја за регистровану групу претплатника

### Користите batch крајњу тачку за масовну поруку листи

Крајња тачка `/v1/messages` на Mobile Message-у прихвата до 10.000 порука по позиву. Да бисте послали масовну поруку B1 групи:

- **Окидач**: B1.church, New Form Submission (филтрирајте на одређени формулар)
- **Радња**: B1.church, List Group Members за циљну групу (преко корака *Webhooks by Zapier — GET* на `/membership/groupmembers?groupId=…`)
- **Радња**: Formatter by Zapier → Utilities → Line-itemize одговора у низ `messages`
- **Радња**: Webhooks by Zapier, POST читавог низа на `/v1/messages`

### Make као алтернатива

Ако радије користите Make, додајте модул **HTTP — Make a request** после окидача B1 Watch Events и подесите га на исти начин (POST, Basic Auth, JSON тело). За B1 страну погледајте [Преглед Make-а](../make.md).

## Ограничења и напомене

- **Basic Auth је једини метод аутентификације.** Mobile Message издаје корисничко име и лозинку на контролној табли. Обоје третирајте као тајне податке.
- **`sender` мора бити регистрован ID пошиљаоца** на вашем налогу Mobile Message-а, иначе слање враћа `400 Invalid sender`. Аустралијски прописи захтевају регистрацију пошиљаоца.
- **Аустралијски бројеви телефона** могу бити `0412345678` (локални) или `+61412345678` (међународни). API прихвата оба, али ако шаљете и у иностранство, стандардизујте на облик `+61…`.
- **До 10.000 порука по захтеву.** Ово је корисно за масовне поруке, али један B1 webhook догађај ретко ће произвести листу тако велику, па крајњу тачку за batch резервишите за заказане масовне Zap-ове.

## Решавање проблема

- **POST враћа `401 Unauthorized`**: Basic Auth акредитиви нису исправни. Поново их копирајте из *Account → API Settings* на контролној табли Mobile Message-а. Имајте у виду да је корисничко име подразумевано адреса вашег налога, а не посебан API кључ.
- **POST враћа `400 Invalid sender`**: вредност `sender` није регистрован ID пошиљаоца на вашем налогу. Прво га региструјте на контролној табли Mobile Message-а.
- **Порука стиже, али је скраћена**: Mobile Message дели поруке дуже од ~160 знакова на више делова, а наплаћује се по делу. Проверите тело одговора, јер у њему стоји број делова.

## Погледајте такође

- [Clearstream](./clearstream.md), [Text In Church](./text-in-church.md): алтернативни SMS провајдери са изворним Zapier апликацијама (не треба корак Webhooks by Zapier)
- [Zapier (преглед)](../zapier.md): B1 страна сваког Zapier рецепта
- [Документација Mobile Message API-ја](https://mobilemessage.com.au/api-documentation)
