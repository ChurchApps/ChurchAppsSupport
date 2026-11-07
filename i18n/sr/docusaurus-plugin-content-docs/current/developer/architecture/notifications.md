---
title: "Архитектура обавештења и подсетника"
---

# Архитектура обавештења и подсетника

<div class="article-intro">

Свака порука коју црквени члан види изван странице коју тренутно гледа (бројач на значки, push обавештење, дневни имејл-преглед) пролази кроз једна од два улаза у MessagingApi. Ова страница описује тај лијевак, механизам подсетника који га напаја по распореду, и модел подешавања који одлучује шта заиста стиже до особе.

</div>

## Преглед: два улаза

```
scheduled anything ──▶ ReminderEngine (definitions → occurrences → scan) ─┐
chat / requests / workflow / bulk sends ──────────────────────────────────┼─▶ createNotifications()
                                                                          │    in_app gate → socket → push → email
     (reminder channels include sms) ──▶ ReminderEngine.sendSms() ──▶ sms gate → sendPersonText() via church provider
provider STOP reply ──▶ POST /messaging/texting/inbound/:churchId/:token ──▶ SmsOptOutHelper.optOut()
account/legal mail ──▶ TransactionalEmailHelper.sendTransactional()  [allowlisted, lint-enforced]
```

1. **Свако обавештење особи** пролази кроз `NotificationHelper.createNotifications()` у messaging модулу. Оно чува ред у табели `notifications` и ескалира са сокета на push на имејл, при чему се за сваки канал посебно проверава `PreferenceGateHelper`, укључујући `in_app` на нивоу 0.
2. **Свако заказано обавештење** је `reminderDefinition` (на нивоу ентитета или на нивоу опсега) који се проширује у `reminderOccurrences` и шаље преко `ReminderEngine.scan()` на периодичном тајмеру. Постоји један проширивач, један диспечер и један дневник слања (`reminderSentLog`).
3. **Директан имејл** постоји само иза `TransactionalEmailHelper.sendTransactional()`. ESLint правило то спроводи већ при компајлирању, видите испод.

:::tip Улаз за имејл спроводи линтер, није само договор
`Api/tools/eslint-rules/email-door.cjs` дефинише `no-direct-email-helper`: сваки позив `EmailHelper.sendTemplatedEmail()` или `EmailHelper.sendEmail()` ван фајлова `NotificationHelper.ts` и `TransactionalEmailHelper.ts` не пролази линт. Ако треба да пошаљете имејл, пустите га кроз лијевак (`createNotifications` са `emailImmediate`) или кроз `TransactionalEmailHelper.sendTransactional()`. Трећег начина који прође CI нема.
:::

## Лијевак обавештења

`NotificationHelper.createNotifications()` је једина тачка уласка за све што није заказано нити трансакционо:

```typescript
createNotifications(
  peopleIds: string[],
  churchId: string,
  contentType: string,
  contentId: string,
  message: string,
  link?: string,
  triggeredByPersonId?: string,
  options?: {
    deliveryStartLevel?: number;      // 0 socket (default), 1 push, 2 email-only
    category?: string;                // preference axis; derived from contentType if omitted
    emailByPerson?: Record<string, { subject: string; html: string }>;
    emailImmediate?: boolean;         // send email now instead of waiting for the digest
  }
)
```

За сваког примаоца чува се ред у `notifications` и позива се `attemptDeliveryWithEscalation`, који пролази кроз канални лествицу испод. Ред за исти `(contentType, contentId)` који је још непрочитан спречава поновно креирање. Ова заштита од дупликата се прескаче за `emailImmediate` слања (помаци подсетника, „email all” од стране особља, кораци workflow-а сами управљају својим дедупликовањем) и за директне поруке, које увек шаљу сигнал преко сокета.

`shared/helpers/NotificationService.ts` преслikava исти потпис (`NotificationServiceOptions`) за позиваоце ван messaging модула и региструје се у messaging модулу при покретању.

## Ланац ескалације по каналима

Испорука почиње на одређеном нивоу (подразумевано 0, или вишем за подсетнике и експлицитна слања) и прелази на следећи канал само ако претходни није успео. Сваки ниво прво проверава `PreferenceGateHelper` пре било каквог покушаја.

| Ниво | Канал | Понашање |
|-------|---------|----------|
| 0 | **in_app / socket** | Прво се проверава `in_app` капија. Ако је потиснуто (искључено), ред се чува са `isNew=false` и испорука се потпуно зауставља: нема сигнала преко сокета, нема значке, нема даље ескалације. У супротном, сервер тражи отворене socket везе за `alerts` собу особе и шаље оквир `notification` (или `privateMessage`). За обична обавештења, успешна испорука преко сокета зауставља ланац на овом нивоу. Тајмер од 30 минута поново проверава непрочитане ставке и касније их ескалира. Директне поруке никад не стају на сокету: инсталирани PWA може држати alerts сокет отворен у позадини, што би иначе спречило push обавештење на нивоу оперативног система. |
| 1 | **push** | Условљено са `allowPush` / искључењем по категорији / тихим сатима. Шаље се и на Expo push токене и на Web Push претплате пронађене у редовима `devices` особе, уз дедупликацију по крајњој тачки и уклањање застарелих токена успут. |
| 2 | **email** | Условљено са `emailFrequency` и искључењем по категорији. Тренутна слања (`emailImmediate`) се одмах генеришу и уписују ред у `deliveryLogs`; у супротном обавештење остаје на чекању за групни дневни преглед, описан испод. |
| — | **sms** | Није ниво у лествици ескалације. Једини условљени произвођач СМС порука је механизам подсетника: кад `channels` дефиниције укључује `sms`, `ReminderEngine.sendSms()` шаље текстуалну поруку сваком примаоцу **поред** push/имејл обавештења (видите [Текстуални подсетници](#text-reminders)). Масовно слање порука (`TextingController` / `@churchapps/texting`), радња **Пошаљи текст волонтерима** на прегледу служења (`MatrixTextHelper` → `MessagingModuleGateway.sendPersonText`) и радња корака workflow-а **Пошаљи текст** (`StepActionHelper.sendText` → `sendPersonText`) све директно шаљу преко провајдера цркве, тако да се подешавања обавештења и тихи сати на њих не односе. Поштује се само заставица `optedOut` особе. |

Непрочитана обавештења која су остала на нивоу сокета или push-а ескалира тајмер од 30 минута (`NotificationHelper.escalateDelivery`). Групни имејл шаље `NotificationHelper.sendEmailNotifications(frequency)`, који покреће подешавање `emailFrequency` сваке особе: `individual` ради на тајмеру од 30 минута, а `daily` на ноћном тајмеру. (`weekly` је важећа вредност подешавања, али још нема посебно групно покретање.)

## Механизам подсетника

Заказани подсетници (подсетници за догађаје, рокови задатака, подсетници за служење и распореде) сви пролазе кроз један општи механизам, а не кроз посебну cron логику за сваку функцију.

```
reminderDefinitions ──expand──▶ reminderOccurrences ──scan (30 min)──▶ createNotifications()
     │                                  │                                    │
     ▼                                  ▼                                    ▼
 entity- or scope-level          one row per (definition,              deliveryStartLevel: 1
 offsets/channels/message        entity, occurrence, offset)           + reminderSentLog ledger
```

**Дефиниције** (`reminderDefinitions`) су или на нивоу ентитета (постављен `entityId`, тј. конкретан догађај, задатак или план) или на нивоу опсега (`entityId` је null, а `scopeId` постављен, нпр. сваки план под једном врстом плана за служење). Дефиниција садржи CSV листу помака у минутима (`offsets`, нпр. `"1440,60"` за један дан и један сат раније), локално време слања (`sendLocalTime`), CSV листу канала (`channels`, при чему `email` покреће тренутни богати имејл у тренутку слања), `recipientMode` и опционалну прилагођену `message` поруку.

**Проширивање** материјализује редове за окидање за хоризонт унапред (клизећи прозор од више дана). Покреће се на ноћном тајмеру и синхронизовано кад год се дефиниција сачува, тако да подсетник за догађај који се одржава у последњем тренутку и даље окине. Дефиниције опсега се шире преко `loadScopeEntities` адаптера, стварајући један скуп појава по сваком конкретном ентитету. Појаве на нивоу ентитета користе кључ `definitionId:occurrenceISO:offset`, док се појаве у опсегу раздвајају по ид-у ентитета да се никад не сударе. Уписивање појаве **враћа у живот** раније отказан ред. Отказивање па поновно проширење је стандардан начин да се подсетник поново синхронизује након измене основног ентитета. Редови који су већ `sent`, `failed` или `processing` се не дирају.

**Испорука** (`ReminderEngine.scan()`) ради на тајмеру од 30 минута. Преузима појаве којима је дошао рок (закуп спречава двоструку обраду), учитава примаоце преко адаптера ентитета, филтрира оне који су већ забележени у `reminderSentLog` за ту појаву и позива `createNotifications` са `deliveryStartLevel: 1` (директно на push) плус `emailImmediate`/`emailByPerson` кад канали дефиниције укључују имејл.

### Текстуални подсетници

Кад `channels` дефиниције укључује `sms`, `scan()` позива `ReminderEngine.sendSms()` након што су креирана push/имејл обавештења, за исте нове примаоце. Слање порука је опт-ин по члану:

- Сваки прималац пролази кроз `PreferenceGateHelper.evaluate(..., "sms", ...)`, па `allowSms` мора бити укључено (подразумевано је искључено и поставља се из прекидача **Текстуалне поруке** у B1App-у), а `sms` канал категорије не сме бити искључен кроз прескок. `event_reminders`, `serving_schedule` и `tasks` наводе `sms` и у `defaultChannels` и у `allowedChannels`.
- Особе без `mobilePhone` или са постављеним `optedOut` се искључују. Ако црква нема провајдера за слање порука, остатак групе се потискује с разлогом `no_provider`.
- Тело поруке се прави помоћу `ReminderEngine.smsBody()`: `"<Church name>: <message> Reply STOP to opt out."`, скраћено на један сегмент од 160 знакова.
- Сваки прималац добија засебан ред у `reminderSentLog` са `channel: "sms"` и статусом `sent` / `suppressed` / `failed`, одвојено од реда за push/имејл, тако да неуспешна порука никад не поново шаље push или имејл.

Уређивачи нуде **Текст** само кад `GET /messaging/texting/status` врати `{ enabled: true }` (први провајдер за слање порука цркве је укључен).

**Одјава STOP.** `POST /messaging/texting/inbound/:churchId/:token` је анонимни webhook који црква уноси у свог провајдера (B1Admin приказује URL из `GET /messaging/texting/inboundUrl` у подешавањима слања порука). Токен је HMAC од ид-а цркве (`SmsOptOutHelper.token`). `SmsOptOutHelper.parse` прихвата поља у облику Twilio форме и JSON у облику Clearstream/TextInChurch. Ако је одговор тачно неки од стандардних речи за одјаву оператера (`STOP`, `STOPALL`, `UNSUBSCRIBE`, `CANCEL`, `END`, `QUIT`, `OPTOUT`, `REVOKE`), свакој неуклоњеној особи у цркви чији се мобилни број подудара додељује се `people.optedOut = true` и `allowSms = false`. Остали одговори се потврђују и занемарују.

Интерни догађајни магистрала реагује на измене ентитета без чекања на ноћно проширивање: догађаји садржаја (преко webhook диспечера) и догађаји ажурирања плана и задатка изазивају тренутно поновно проширење или отказивање за погођени ентитет, а ажурирање плана такође поново проширује дефиниције опсега везане за његову врсту плана.

### Адаптери

Механизам не зна за врсте ентитета; свака подржана врста ентитета се укључује преко адаптера (`helpers/adapters/`):

| Врста ентитета | Адаптер | Напомене |
|-------------|---------|-------|
| `event` | `EventReminderAdapter` | Примаоци су ограничени на пријављене или чланове групе, у зависности од догађаја и `recipientMode`. |
| `plan` | `PlanReminderAdapter` | Примаоци су задужења са статусом Accepted и Unconfirmed на објављеним (не-нацрт) плановима. Задужења са статусом Unconfirmed издата кроз workflow за потврду служења се изостављају док их неко не прихвати (видите испод). `buildEmails` позива `DoingModuleGateway.buildPlanReminderEmails`, који генерише позиције, напомене и прилагођену поруку преко `doing/helpers/PlanReminderEmailHelper`, укључујући дугмад Accept/Decline потписана помоћу `ReminderTokenHelper`, која шаљу податке на јавну крајњу тачку за одговор на задужење. |
| `task` | `TaskReminderAdapter` | Примаоци су задужени за задатак. |

### Крајње тачке

| Метод | Путања | Намена |
|--------|------|---------|
| `GET` / `POST` | `/messaging/reminders/:entityType/:entityId` | Учитава или чува дефиницију подсетника за један ентитет. |
| `GET` / `POST` | `/messaging/reminders/scope/:entityType/:scopeId` | Учитава или чува дефиницију подсетника на нивоу опсега (наслеђену). |
| `DELETE` | `/messaging/reminders/:defId` | Брише дефиницију и отказује њене чекајуће појаве. |
| `GET` | `/messaging/reminders/event/:eventId/preview` | Приказује број прималаца и следећа времена окидања за подсетник догађаја пре чувања. |
| `GET` | `/messaging/reminders/log` | Историја недавних појава подсетника за цркву. |
| `POST` | `/messaging/reminders/mute` | Искључује подсетнике за одређени ентитет. |

Чување дефиниције покреће синхронизовано поновно проширење за тај ентитет или опсег, тако да уредници виде ажурисане „следећа окидања” без чекања на ноћни посао.

## Директне поруке

Директне поруке иду истим лијевком као и све остало, а не преко посебне путање ескалације. Сваки непрочитан разговор добија један **помоћни ред** у `notifications` (`contentType='privateMessage'`, `contentId` = ид приватне поруке, `category='direct_messages'`) који води сво стање испоруке: ескалацију преко сокета/push-а/имејла, праћење читања и све остало. Табела `privateMessages` и даље чува садржај поруке и колону `notifyPersonId`, која је извор бројача непрочитаног и брише се кад прималац прочита разговор.

Помоћни редови су невидљиви за звонце обавештења: искључени су из упита за број непрочитаних, из упита за листу обавештења и из упита за означавање прочитаног и брисање, а сви филтрирају по `contentType <> 'privateMessage'`. Свака порука директне поруке шаље сигнал преко сокета без обзира на стање непрочитаног (семантика живог ћаскања, без дедупликације), а директне поруке никад не стају на испоруци преко сокета као обична обавештења, јер PWA у позадини може држати сокет отвореним, али и даље треба push на нивоу оперативног система. Ако особа искључи обавештења о директним порукама, помоћни ред се паркира (`isNew=false`, `notifyPersonId` се брише): и даље је видљив унутар самог разговора, али без значки и упозорења.

## Подешавања и капије

Свако слање пролази кроз `PreferenceGateHelper.evaluate()`, чисту функцију (сво стање се прослеђује, без упита ка бази на врућој путањи) која враћа `allow`, `suppress` или `defer`. Слојеви се извршавају редом, а први који одлучи побеђује:

1. **Закључана категорија**: неке категорије су обавезне (ниво 0) и заобилазе све остале слојеве.
2. **Главно искључење / прекид канала**: `masterMute`, `allowPush`, `allowSms` (подразумевано искључено, чланови се сами укључују) или `emailFrequency='never'` потпуно потискују.
3. **Тихи сати**: само push и СМС (имејл се сматра необременљивим). Ако је тренутно стенско време у временској зони особе унутар њеног тихог прозора, трансакциона категорија и даље пролази; нетрансакциона се одлаже до краја тихог прозора, израчунатог као UTC тренутак кориговано за летње рачунање времена помоћу `TimezoneHelper.wallClockToUtc`.
4. **Подешавање по категорији**: експлицитно одјављивање за пар категорија × канал; одсуство значи подразумевано подешавање категорије.
5. **Искључење по ентитету**: искључење везано за одређени ентитет (нпр. један догађај, један план) ограничава више од подешавања на нивоу категорије, али важи само ако позивалац уз обавештење наведе ид и врсту ентитета.

Укључене табеле: `notificationPreferences` (глобално: `masterMute`, `emailFrequency` са вредностима `individual|daily|weekly|never`, `allowPush`, прозор тихих сати и временска зона, `allowSms`), `notificationPreferenceOverrides` (по категорији × каналу) и `notificationEntityMutes` (по ентитету).

Ова капија се примењује на in-app (ниво 0), push (ниво 1) и имејл (ниво 2) унутар лијевка, укључујући тренутне имејлове подсетника и дневног прегледа, као и на текстуалне подсетнике у `ReminderEngine.sendSms()`. Трансакциони имејл (кодови за пријаву, ресетовање лозинке, позивнице, потврде донација) је намерно изузет; у томе је смисао другог улаза.

### Workflow-и за потврду служења

План може да се укључи у workflow `workflowType = "assignmentConfirmation"` (`plans.confirmationWorkflowId`). Тада Publish/Notify позива `POST /doing/plans/:id/issueRequests` уместо обавештења по задужењу: свако ново задужење са статусом Unconfirmed добија `notified` + `confirmationWorkflowId` и једну картицу workflow-а (`tasks.assignmentId`, јединствен `followupKey`). Картица шаље упозорење само у апликацији (`appOnly: true`, без ескалације на push/имејл), а затим изводи радње `sendAssignmentRequest` workflow-а, које иду преко `MessagingModuleGateway.sendServingWorkflowMessage`: имејл преко `NotificationHelper.sendWorkflowEmail` (капија подешавања + `ChurchEmailLimiter`, мерено као `workflowEmail`), а СМС преко `sendPersonText` само са `allowSms` и условом категорије `serving_schedule`. Accept/Decline (`assignment.updated` на догађајној магистрали) затвара картицу. Тајмер од 30 минута (`AssignmentWorkflowHelper.processPending`) поправља пропуштене почетке и догађаје, а неодговорени захтев на року за праћење претвара у задатак прегледа за руководиоца. Цео животни циклус: `Api/docs/assignment-confirmation-workflows.md`.

## Ограничења имејла које пише црква

Имејл чији садржај је написала црква шаље се са заједничког ChurchApps SES идентитета, па га `Api/src/shared/helpers/ChurchEmailLimiter.ts` мери по цркви. Четири пута га позивају: слања групама и шаблонима (`EmailTemplateController`, тип садржаја `email`), имејлови за праћење образаца (`FormSubmissionController`, `formFollowUp`), радње workflow-а **Пошаљи имејл** (`NotificationHelper` са `churchAuthored`, `workflowEmail`) и имејлови са захтевом за потврду служења (`NotificationHelper.sendWorkflowEmail`, `workflowEmail`). Системска пошта (кодови за пријаву, потврде, подсетници) и позивнице за улоге и групе (`UserController.sendInviteEmail`, фиксни шаблон) се не мере.

- **Капија одобрења.** Црква ништа не шаље док администратор сервера не постави `churches.emailApprovedDate` (`POST /membership/churches/:id/emailApproval`, Server Admin → Churches → чип **Group Email**). Архиване цркве су увек блокиране. Дијалог Send Email у B1Admin-у чита `GET /messaging/emailTemplates/sendStatus` (`approved`, `paused`, `remaining`, `requested`) и, ако није одобрено, уместо уређивача приказује картицу **Затражи преглед**. Уређивач корака workflow-а чита исту крајњу тачку (доступну и за `tasks.admin` и за `groupMembers.edit`) да упозори на радње **Пошаљи имејл** кад црква није одобрена или је паузирана. У тренутку слања, `MessagingModuleGateway.sendTemplatedEmail` враћа `false` без креирања обавештења кад је `ChurchEmailLimiter.remaining()` мањи од 1, тако да историја картице никад не тврди **Имејл послат** за пошту која је одбачена. `POST /messaging/emailTemplates/requestApproval` шаље имејл подршци, највише једном по цркви недељно.
- **Заслужена квота.** Одобрена црква добија `max(150, 2 × њен најбољи дан са имејлом који је написала црква у претходних 30 дана)`, ограничено на 2.000 у клизећих 24 сата. Текућих 24 сата се не узимају у обзир при одређивању „најбољег дана”, тако да налет порука не може сам себи подићи границу.
- **Резервиши, па уреди.** `reserve()` пре слања уписује по један ред у `deliveryLogs` за сваког примаоца, поново проверава квоту с тим редовима урачунатим и повлачи се ако су два захтева истовремено прошла границу (слање враћа 429). `settle()` označava сваки ред као послат или неуспешан.
- **Паузирање због жалби.** Lambda `sesFeedback` (`Api/src/lambda/ses-feedback-handler.ts`, који прима податке од SES → SNS) везује сваки трајни повратни имејл (bounce) или жалбу за цркву чији је имејл који је написала црква стигао на ту адресу у том периоду, а чува се као `deliveryMethod` `sesBounce` / `sesComplaint`. Црква се паузира при 2 или више жалби (≥ 0,3% слања) или 10 или више тврдих повратака (≥ 5%) током 7 дана.

## Распоред

И механизам подсетника и дневни преглед обавештења раде на постојећим периодичним тајмерима, без увођења нове инфраструктуре:

| Тајмер | Распоред | Покреће |
|-------|----------|----------|
| Тајмер од 30 минута | сваких 30 минута | Ескалира непрочитана обавештења; шаље дневни имејл за учесталост `individual`; шаље појаве подсетника којима је дошао рок (`ReminderEngine.scan`); прегледе одобрења; аутоматизације којима је дошао рок |
| Ноћни тајмер | 05:00 UTC | Подсетници за присуство групама; напредује понављајуће стриминг услуге; освежава листе са аутоматским освежавањем; проширује појаве подсетника за следећи хоризонт (`ReminderEngine.expandAll`); шаље дневне имејлове са учесталошћу `daily` |

Локално се иста логика може покренути на захтев помоћу `npm run timer:30min` и `npm run timer:midnight` из `Api` пројекта.

## Попис фајлова

| Област | Фајлови |
|------|------|
| Лијевак | `Api/src/modules/messaging/helpers/NotificationHelper.ts`, `PreferenceGateHelper.ts`, `NotificationCategoryHelper.ts`, `WebPushHelper.ts`, `ExpoPushHelper.ts`, `SocketHelper.ts`, `DeliveryHelper.ts` |
| Заједнички улаз | `Api/src/shared/helpers/NotificationService.ts` |
| Трансакциони улаз | `Api/src/shared/helpers/TransactionalEmailHelper.ts`, правило линтера `Api/tools/eslint-rules/email-door.cjs` |
| Ограничења имејла цркве | `Api/src/shared/helpers/ChurchEmailLimiter.ts`, `Api/src/lambda/ses-feedback-handler.ts`, `Api/src/modules/messaging/repositories/DeliveryLogRepo.ts` |
| Механизам подсетника | `Api/src/modules/messaging/helpers/ReminderEngine.ts`, `ReminderBootstrap.ts`, `helpers/adapters/*`, `controllers/ReminderController.ts` |
| Слање порука / одјава STOP | `Api/src/modules/messaging/helpers/SmsOptOutHelper.ts`, `controllers/TextingController.ts` (`/status`, `/inboundUrl`, `/inbound/:churchId/:token`), `Api/src/modules/doing/helpers/MatrixTextHelper.ts` (преглед служења **Пошаљи текст волонтерима**) |
| Репозиторијуми подсетника | `Api/src/modules/messaging/repositories/ReminderDefinitionRepo.ts`, `ReminderOccurrenceRepo.ts`, `ReminderSentLogRepo.ts` |
| Имејл за служење/планове | `Api/src/modules/doing/helpers/PlanReminderEmailHelper.ts`, `ReminderTokenHelper.ts`, `Api/src/shared/modules/DoingModuleGateway.ts` |
| Уређивачи подсетника (B1Admin) | `serving/components/PlanTypeReminderEdit.tsx`, `calendars/components/EventReminderEdit.tsx`, `serving/tasks/components/TaskReminderEdit.tsx`, `hooks/useTextingEnabled.ts` |
| Уређивач подсетника / подешавања (B1App) | `EventReminderEdit.tsx`, `NotificationPrefsPage.tsx`, `useRealtimeNotifications.ts` |

## Повезане странице

- [Архитектура у реалном времену](../realtime): WebSocket протокол и клијентски примитиви (`SocketHelper`, `SubscriptionManager`, `ConversationStore`) на којима почива ниво испоруке у апликацији
- [Web Push обавештења](../web-push): VAPID подешавање и путања browser Push API-ја која се користи на нивоу push ескалације
- [Крајње тачке за поруке](../api/endpoints/messaging): пун REST скуп за поруке, разговоре, везе и руте за обавештења и подсетнике
