---
title: "Aviseringar och påminnelser: arkitektur"
---

# Aviseringar och påminnelser: arkitektur

<div class="article-intro">

Varje meddelande som en kyrkomedlem ser utanför sidan de just tittar på, till exempel en räknare för olästa, en pushnotis eller ett sammanfattningsmejl, passerar genom en av två dörrar i MessagingApi. Den här sidan beskriver tratten, påminnelsemotorn som matar den enligt schema, och inställningsmodellen som avgör vad som faktiskt når en person.

</div>

## Översikt: två dörrar

```
scheduled anything ──▶ ReminderEngine (definitions → occurrences → scan) ─┐
chat / requests / workflow / bulk sends ──────────────────────────────────┼─▶ createNotifications()
                                                                          │    in_app gate → socket → push → email
     (reminder channels include sms) ──▶ ReminderEngine.sendSms() ──▶ sms gate → sendPersonText() via church provider
provider STOP reply ──▶ POST /messaging/texting/inbound/:churchId/:token ──▶ SmsOptOutHelper.optOut()
account/legal mail ──▶ TransactionalEmailHelper.sendTransactional()  [allowlisted, lint-enforced]
```

1. **Allt som informerar en person** går genom `NotificationHelper.createNotifications()` i messaging-modulen. Den sparar en rad i `notifications` och eskalerar från socket till push till e-post, och utvärderar `PreferenceGateHelper` för varje kanal, inklusive `in_app` på nivå 0.
2. **Allt som schemaläggs** är en `reminderDefinition` (på entitetsnivå eller omfångsnivå) som expanderas till `reminderOccurrences` och skickas av `ReminderEngine.scan()` med en återkommande timer. En expanderare, en avsändare och en sändlogg (`reminderSentLog`).
3. **Direkt e-post** finns bara bakom `TransactionalEmailHelper.sendTransactional()`. En ESLint-regel tvingar fram detta vid kompilering. Se nedan.

:::tip E-postdörren verifieras av lint, inte bara av konvention
`Api/tools/eslint-rules/email-door.cjs` definierar `no-direct-email-helper`: varje anrop till `EmailHelper.sendTemplatedEmail()` eller `EmailHelper.sendEmail()` utanför `NotificationHelper.ts` eller `TransactionalEmailHelper.ts` misslyckas i lint. Om du behöver skicka ett e-postmeddelande ska du gå genom tratten (`createNotifications` med `emailImmediate`) eller genom `TransactionalEmailHelper.sendTransactional()`. Det finns inget tredje sätt som klarar CI.
:::

## Aviseringstratten

`NotificationHelper.createNotifications()` är den enda ingångspunkten för allt som varken är schemalagt eller transaktionellt:

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

För varje mottagare sparas en rad i `notifications`, och `attemptDeliveryWithEscalation` anropas. Den går igenom kanalstegen nedan. En rad för samma `(contentType, contentId)` som fortfarande är oläst förhindrar att en ny skapas. Denna dubblettspärr hoppas över för `emailImmediate`-utskick (påminnelseintervall, personalens "e-posta alla", workflow-steg som hanterar sin egen dedup) och för direktmeddelanden, som alltid skickar en ping via socket.

`shared/helpers/NotificationService.ts` speglar samma signatur (`NotificationServiceOptions`) för anropare utanför messaging-modulen och registreras hos messaging-modulen vid start.

## Kanaleskaleringskedjan

Leveransen startar på en nivå (0 som standard, eller högre för påminnelser och uttryckliga utskick) och går bara vidare till nästa kanal om den föregående inte lyckades. Varje nivå kontrolleras av `PreferenceGateHelper` innan något försöks.

| Nivå | Kanal | Beteende |
|-------|---------|----------|
| 0 | **in_app / socket** | Gaten `in_app` kontrolleras först. Om den är undertryckt (tystad) sparas raden med `isNew=false` och leveransen stannar helt: ingen socket-ping, ingen räknare, ingen vidare eskalering. Annars letar servern upp öppna socket-anslutningar för personens `alerts`-rum och skickar en ram av typen `notification` (eller `privateMessage`). För vanliga aviseringar stoppar en lyckad socket-leverans kedjan här. 30-minuterstimern kontrollerar sedan olästa objekt igen och eskalerar dem senare. Direktmeddelanden stannar aldrig vid socket: en installerad PWA kan hålla alerts-socketen öppen i bakgrunden, vilket annars skulle undertrycka push på operativsystemsnivå. |
| 1 | **push** | Styrs av `allowPush`, kategoriavregistrering och tysta timmar. Skickar till både Expo-pushtoken och Web Push-prenumerationer som finns i personens `devices`-rader. Dubbletter tas bort via endpoint, och inaktuella token rensas på vägen. |
| 2 | **e-post** | Styrs av `emailFrequency` och kategoriavregistrering. Omedelbara utskick (`emailImmediate`) renderas direkt och skriver en rad i `deliveryLogs`. Annars lämnas aviseringen som väntande för den sammanfattande batchen, som beskrivs nedan. |
| — | **sms** | Inte en nivå i eskaleringskedjan. Den enda SMS-källan som styrs av gate är påminnelsemotorn: när en definitions `channels` innehåller `sms` skickar `ReminderEngine.sendSms()` ett sms till varje mottagare **utöver** push- eller e-postaviseringen (se [Textpåminnelser](#text-reminders)). Massutskick av sms (`TextingController` / `@churchapps/texting`), den serviceöversikt **Sms:a volontärer** som använder `MatrixTextHelper` → `MessagingModuleGateway.sendPersonText`, och workflow-åtgärden **Skicka sms** (`StepActionHelper.sendText` → `sendPersonText`) skickar alla sms direkt via kyrkans leverantör. Därför gäller inte aviseringsinställningar och tysta timmar för dem. Endast personens flagga `optedOut` respekteras. |

Olästa aviseringar som står kvar på socket eller push eskaleras av 30-minuterstimern (`NotificationHelper.escalateDelivery`). Batch-e-post skickas av `NotificationHelper.sendEmailNotifications(frequency)`, styrd av varje persons inställning `emailFrequency`: `individual` körs på 30-minuterstimern, `daily` körs på nattimern. (`weekly` är ett giltigt värde i inställningarna, men det finns ännu ingen särskild batchkörning för det.)

## Påminnelsemotorn

Schemalagda påminnelser (evenemangspåminnelser, förfallodatum för uppgifter, påminnelser om tjänst- och planeringstilldelningar) går alla genom en enda generell motor i stället för separat cron-logik för varje funktion.

```
reminderDefinitions ──expand──▶ reminderOccurrences ──scan (30 min)──▶ createNotifications()
     │                                  │                                    │
     ▼                                  ▼                                    ▼
 entity- or scope-level          one row per (definition,              deliveryStartLevel: 1
 offsets/channels/message        entity, occurrence, offset)           + reminderSentLog ledger
```

**Definitioner** (`reminderDefinitions`) är antingen på entitetsnivå (`entityId` satt, till exempel ett visst evenemang, en uppgift eller en plan) eller på omfångsnivå (`entityId` null, `scopeId` satt, till exempel varje plan under en typ av tjänstplan). En definition innehåller en CSV-lista med minutförskjutningar (`offsets`, till exempel `"1440,60"` för en dag och en timme före), en lokal sändtid (`sendLocalTime`), en CSV-lista med kanaler (`channels`, där `email` innebär ett omedelbart rikt e-postmeddelande vid utskick), ett `recipientMode` och ett valfritt eget `message`.

**Expansion** skapar utlösningsrader för det kommande tidsfönstret (ett rullande fönster på flera dagar). Den körs på nattimern och synkront varje gång en definition sparas, så att en påminnelse för ett evenemang med kort varsel fortfarande utlöses. Omfångsdefinitioner sprids via adapterns `loadScopeEntities` och skapar en uppsättning förekomster för varje konkret entitet. Förekomster på entitetsnivå använder nyckeln `definitionId:occurrenceISO:offset`, medan omfångsförekomster namnrymdas efter entitets-id så att de aldrig krockar. Om man uppdaterar en förekomst **återupplivas** en tidigare avbruten rad. Avbryt-och-expandera-om är standardsättet att synkronisera om en påminnelse efter att underliggande entitet har ändrats. Rader som redan är `sent`, `failed` eller `processing` lämnas orörda.

**Utskick** (`ReminderEngine.scan()`) körs på 30-minuterstimern. Den reserverar förfallna förekomster (ett lease förhindrar dubbelbearbetning), laddar mottagare via entitetens adapter, filtrerar bort alla som redan finns i `reminderSentLog` för förekomsten och anropar `createNotifications` med `deliveryStartLevel: 1` (hoppa direkt till push) samt `emailImmediate`/`emailByPerson` när definitionens kanaler innehåller e-post.

### Textpåminnelser

När en definitions `channels` innehåller `sms` anropar `scan()` `ReminderEngine.sendSms()` efter att push- och e-postaviseringarna har skapats, för samma nya mottagare. Sms är aktivt per medlem (opt-in):

- Varje mottagare går genom `PreferenceGateHelper.evaluate(..., "sms", ...)`, så `allowSms` måste vara på (den är avstängd som standard och ställs in från B1Apps reglage **Textmeddelanden**), och kategorins kanal `sms` får inte vara avstängd av en åsidosättning. `event_reminders`, `serving_schedule` och `tasks` listar `sms` i både `defaultChannels` och `allowedChannels`.
- Personer utan `mobilePhone` eller med `optedOut` satt undertrycks. Om kyrkan saknar sms-leverantör undertrycks resten av batchen med skälet `no_provider`.
- Texten byggs av `ReminderEngine.smsBody()`: `"<Church name>: <message> Reply STOP to opt out."`, och kapas till ett segment på 160 tecken.
- Varje mottagare får en egen rad i `reminderSentLog` med `channel: "sms"` och statusen `sent`, `suppressed` eller `failed`. Raden är separat från push- och e-postraden, så ett misslyckat sms aldrig skickar om push eller e-post.

Redigerare visar bara **Sms** när `GET /messaging/texting/status` returnerar `{ enabled: true }` (kyrkans första sms-leverantör är aktiverad).

**STOP-avregistrering.** `POST /messaging/texting/inbound/:churchId/:token` är en anonym webhook som kyrkan klistrar in hos sin leverantör (B1Admin visar webbadressen från `GET /messaging/texting/inboundUrl` i sms-inställningarna). Token är en HMAC av kyrkans id (`SmsOptOutHelper.token`). `SmsOptOutHelper.parse` accepterar fält i Twilio-format och JSON i Clearstream/TextInChurch-format. Om svaret exakt är ett operatörsstoppord (`STOP`, `STOPALL`, `UNSUBSCRIBE`, `CANCEL`, `END`, `QUIT`, `OPTOUT`, `REVOKE`) får varje person i kyrkan som inte är borttagen och vars mobilnummer matchar `people.optedOut = true` och `allowSms = false`. Andra svar bekräftas och ignoreras.

En intern händelsebuss reagerar på ändringar av entiteter utan att vänta på den nattliga expansionen. Händelser för innehåll (via webhook-dispatchern) och händelser för uppdatering av planer och uppgifter utlöser omedelbar omexpansion eller avbokning för den berörda entiteten. En uppdatering av en plan expanderar också om omfångsdefinitioner kopplade till planens typ.

### Adaptrar

Motorn är oberoende av entitetstyp. Varje stödd entitetstyp kopplas in via en adapter (`helpers/adapters/`):

| Entitetstyp | Adapter | Anteckningar |
|-------------|---------|-------|
| `event` | `EventReminderAdapter` | Mottagare begränsas till anmälda eller gruppmedlemmar, beroende på evenemanget och `recipientMode`. |
| `plan` | `PlanReminderAdapter` | Mottagare är tilldelningar med status Accepterad och Obekräftad på publicerade (icke-utkast) planer. Obekräftade tilldelningar som har utfärdats genom ett bekräftelseworkflow för tjänst utesluts tills de accepteras (se nedan). `buildEmails` anropar `DoingModuleGateway.buildPlanReminderEmails`, som renderar positioner, anteckningar och ett eget meddelande via `doing/helpers/PlanReminderEmailHelper`, inklusive knapparna Acceptera och Avböj signerade av `ReminderTokenHelper`, som skickar till en offentlig slutpunkt för svar på tilldelningar. |
| `task` | `TaskReminderAdapter` | Mottagare är uppgiftens tilldelade person eller personer. |

### Slutpunkter

| Metod | Sökväg | Syfte |
|--------|------|---------|
| `GET` / `POST` | `/messaging/reminders/:entityType/:entityId` | Hämta eller spara påminnelsedefinitionen för en entitet. |
| `GET` / `POST` | `/messaging/reminders/scope/:entityType/:scopeId` | Hämta eller spara en påminnelsedefinition på omfångsnivå (ärvd). |
| `DELETE` | `/messaging/reminders/:defId` | Ta bort en definition och avboka dess väntande förekomster. |
| `GET` | `/messaging/reminders/event/:eventId/preview` | Förhandsgranska antal mottagare och nästa utskickstider för en evenemangspåminnelse innan den sparas. |
| `GET` | `/messaging/reminders/log` | Senaste historiken över påminnelseförekomster för en kyrka. |
| `POST` | `/messaging/reminders/mute` | Tysta påminnelser för en viss entitet. |

När en definition sparas utlöses en synkron omexpansion för den entiteten eller omfånget, så att redigerare ser aktuella "nästa utskick" utan att vänta på nattjobbet.

## Direktmeddelanden

Direktmeddelanden använder samma tratt som allt annat i stället för en separat eskaleringsväg. Varje oläst konversation får en **skuggrad** i `notifications` (`contentType='privateMessage'`, `contentId` = det privata meddelandets id, `category='direct_messages'`) som äger all leveransstatus: eskalering via socket, push och e-post, läsningsspårning och allt annat. Tabellen `privateMessages` behåller själva meddelandeinnehållet och en kolumn `notifyPersonId`. Den är källan till räknaren för olästa och rensas när mottagaren läser konversationen.

Skuggrader är osynliga för aviseringsklockan. De exkluderas från frågan som räknar olästa, frågan som listar aviseringar och frågorna för markera-som-läst och radering, som alla filtrerar på `contentType <> 'privateMessage'`. Varje DM-ping går till socketen oavsett läsläge (livechattsemantik, ingen dedup). DM stannar aldrig vid socket-leverans på det sätt som vanliga aviseringar gör, eftersom en PWA i bakgrunden kan hålla en socket öppen men ändå behöva push på operativsystemsnivå. Om en person tystar DM-aviseringar parkeras skuggraden (`isNew=false`, `notifyPersonId` rensas). Den syns fortfarande i konversationen själv, men utan räknare eller varningar.

## Inställningar och styrning

Varje utskick går genom `PreferenceGateHelper.evaluate()`, en ren funktion (allt tillstånd skickas in, inga databasanrop på den kritiska vägen) som returnerar `allow`, `suppress` eller `defer`. Lagren körs i ordning, och det första som avgör vinner:

1. **Låst kategori**: vissa kategorier är obligatoriska (nivå 0) och kringgår alla andra lager.
2. **Huvudtystnad / avstängd kanal**: `masterMute`, `allowPush`, `allowSms` (av som standard, medlemmar väljer själva att aktivera) eller `emailFrequency='never'` undertrycker direkt.
3. **Tysta timmar**: gäller endast push och sms (e-post räknas som icke-störande). Om den aktuella lokala tiden i personens tidszon ligger inom dess tysta period passerar en transaktionell kategori ändå. En icke-transaktionell kategori skjuts upp till slutet av den tysta perioden, beräknat som en DST-korrekt UTC-tidpunkt via `TimezoneHelper.wallClockToUtc`.
4. **Åsidosättning per kategori**: ett uttryckligt avval för ett kategori-kanalpar. Om inget finns gäller kategorins standard.
5. **Tystnad per entitet**: en tystnad registrerad för en viss entitet (till exempel ett evenemang eller en plan) begränsar mer än inställningen på kategorinivå, men gäller bara när anroparen anger entitets-id och -typ tillsammans med aviseringen.

Berörda tabeller: `notificationPreferences` (globala, med `masterMute`, `emailFrequency` som är `individual|daily|weekly|never`, `allowPush`, fönster för tysta timmar och tidszon samt `allowSms`), `notificationPreferenceOverrides` (per kategori och kanal) och `notificationEntityMutes` (per entitet).

Denna gate tillämpas för in-app (nivå 0), push (nivå 1) och e-post (nivå 2) inom tratten, inklusive omedelbara påminnelse- och sammanfattningsmejl, och för påminnelsesms i `ReminderEngine.sendSms()`. Transaktionell e-post (inloggningskoder, lösenordsåterställningar, inbjudningar, gåvokvitton) kringgår den med avsikt. Det är hela poängen med den andra dörren.

### Bekräftelseworkflow för tjänst

En plan kan välja ett workflow av typen `workflowType = "assignmentConfirmation"` (`plans.confirmationWorkflowId`). Publicera/Meddela anropar då `POST /doing/plans/:id/issueRequests` i stället för den enskilda tilldelningsaviseringen. Varje ny obekräftad tilldelning får `notified` och `confirmationWorkflowId` samt ett arbetskort i workflowet (`tasks.assignmentId`, unik `followupKey`). Kortet skickar en larmnotis som bara syns i appen (`appOnly: true`, ingen eskalering via push eller e-post) och kör sedan workflowets åtgärder `sendAssignmentRequest`. Dessa går via `MessagingModuleGateway.sendServingWorkflowMessage`: e-post via `NotificationHelper.sendWorkflowEmail` (aviseringsgate plus `ChurchEmailLimiter`, mätt som `workflowEmail`), sms via `sendPersonText` endast med `allowSms` och kategorigaten `serving_schedule`. Acceptera/Avböj (`assignment.updated` på händelsebussen) stänger kortet. 30-minuterstimern (`AssignmentWorkflowHelper.processPending`) reparerar missade starter och händelser, och en obesvarad förfrågan vid uppföljningens sista datum omvandlas till en uppgift för ledarens granskning. Hela livscykeln finns i `Api/docs/assignment-confirmation-workflows.md`.

## Begränsningar för e-post skriven av kyrkan

E-post vars innehåll kyrkan har skrivit skickas från ChurchApps gemensamma SES-identitet. Därför mäts den per kyrka av `Api/src/shared/helpers/ChurchEmailLimiter.ts`. Fyra vägar anropar den: grupp- och mallutskick (`EmailTemplateController`, innehållstyp `email`), uppföljningsmejl för formulär (`FormSubmissionController`, `formFollowUp`), workflowåtgärden **Skicka e-post** (`NotificationHelper` med `churchAuthored`, `workflowEmail`) och e-post med bekräftelseförfrågningar för tjänst (`NotificationHelper.sendWorkflowEmail`, `workflowEmail`). Systemmejl (inloggningskoder, kvitton, påminnelser) och inbjudningar till roller och grupper (`UserController.sendInviteEmail`, en fast mall) mäts inte.

- **Godkännandespärr.** En kyrka skickar ingenting förrän en serveradministratör sätter `churches.emailApprovedDate` (`POST /membership/churches/:id/emailApproval`, Serveradministration → Kyrkor → chipet **Gruppe-post**). Arkiverade kyrkor blockeras alltid. Dialogen Skicka e-post i B1Admin läser `GET /messaging/emailTemplates/sendStatus` (`approved`, `paused`, `remaining`, `requested`). Om kyrkan inte är godkänd visas ett kort **Begär granskning** i stället för redigeraren. Redigeraren för workflowsteg läser samma slutpunkt (öppen för `tasks.admin` såväl som för `groupMembers.edit`) och varnar för åtgärden **Skicka e-post** om kyrkan är ej godkänd eller pausad. Vid utskick returnerar `MessagingModuleGateway.sendTemplatedEmail` `false` utan att skapa någon avisering när `ChurchEmailLimiter.remaining()` är lägre än 1. Då påstår kortets historik aldrig att **E-post skickad** när mejlet har förkastats. `POST /messaging/emailTemplates/requestApproval` skickar ett mejl till supporten, högst en gång per kyrka och vecka.
- **Förtjänad kvot.** En godkänd kyrka får `max(150, 2 × dess bästa dag med kyrkskriven e-post under de senaste 30 dagarna)`, begränsat till 2 000 per rullande 24-timmarsperiod. De aktuella 24 timmarna räknas inte med i "bästa dag", så att ett skov inte kan höja sin egen gräns.
- **Reservera, sedan slutföra.** `reserve()` skriver en rad i `deliveryLogs` per mottagare före utskicket, kontrollerar kvoten igen med dessa rader medräknade och backar om två förfrågningar passerade gränsen samtidigt (utskicket svarar då med 429). `settle()` markerar varje rad som skickad eller misslyckad.
- **Klagomålspaus.** Lambdan `sesFeedback` (`Api/src/lambda/ses-feedback-handler.ts`, matad av SES → SNS) kopplar varje permanent studsmejl eller klagomål till den kyrka vars e-post från kyrkan nådde adressen runt den tidpunkten. Den lagras som `deliveryMethod` `sesBounce` respektive `sesComplaint`. En kyrka pausas vid 2 eller fler klagomål (≥ 0,3 % av utskicken) eller 10 eller fler hårda studsar (≥ 5 %) under 7 dagar.

## Schemaläggning

Både påminnelsemotorn och sammanfattningen av aviseringar använder befintliga schemalagda timers i stället för att införa ny infrastruktur:

| Timer | Schema | Körs |
|-------|----------|------|
| 30-minuterstimer | var 30:e minut | Eskalera olästa aviseringar; skicka sammanfattningsmejl med frekvensen `individual`; skicka förfallna påminnelseförekomster (`ReminderEngine.scan`); godkännandesammanfattningar; förfallna automationskörningar |
| Nattimer | 05:00 UTC | Påminnelser om gruppnärvaro; avancera återkommande streamade gudstjänster; uppdatera automatiskt uppdaterade listor; expandera påminnelseförekomster för nästa horisont (`ReminderEngine.expandAll`); skicka sammanfattningsmejl med frekvensen `daily` |

Lokalt kan samma logik köras på begäran med `npm run timer:30min` och `npm run timer:midnight` från projektet `Api`.

## Filförteckning

| Område | Filer |
|------|-------|
| Tratt | `Api/src/modules/messaging/helpers/NotificationHelper.ts`, `PreferenceGateHelper.ts`, `NotificationCategoryHelper.ts`, `WebPushHelper.ts`, `ExpoPushHelper.ts`, `SocketHelper.ts`, `DeliveryHelper.ts` |
| Gemensam ingång | `Api/src/shared/helpers/NotificationService.ts` |
| Transaktionell dörr | `Api/src/shared/helpers/TransactionalEmailHelper.ts`, lintregel `Api/tools/eslint-rules/email-door.cjs` |
| Begränsningar för kyrkans e-post | `Api/src/shared/helpers/ChurchEmailLimiter.ts`, `Api/src/lambda/ses-feedback-handler.ts`, `Api/src/modules/messaging/repositories/DeliveryLogRepo.ts` |
| Påminnelsemotor | `Api/src/modules/messaging/helpers/ReminderEngine.ts`, `ReminderBootstrap.ts`, `helpers/adapters/*`, `controllers/ReminderController.ts` |
| Sms och STOP-avregistrering | `Api/src/modules/messaging/helpers/SmsOptOutHelper.ts`, `controllers/TextingController.ts` (`/status`, `/inboundUrl`, `/inbound/:churchId/:token`), `Api/src/modules/doing/helpers/MatrixTextHelper.ts` (serviceöversikten **Sms:a volontärer**) |
| Förvaringar för påminnelser | `Api/src/modules/messaging/repositories/ReminderDefinitionRepo.ts`, `ReminderOccurrenceRepo.ts`, `ReminderSentLogRepo.ts` |
| E-post för tjänst/planer | `Api/src/modules/doing/helpers/PlanReminderEmailHelper.ts`, `ReminderTokenHelper.ts`, `Api/src/shared/modules/DoingModuleGateway.ts` |
| Redigerare för påminnelser (B1Admin) | `serving/components/PlanTypeReminderEdit.tsx`, `calendars/components/EventReminderEdit.tsx`, `serving/tasks/components/TaskReminderEdit.tsx`, `hooks/useTextingEnabled.ts` |
| Redigerare för påminnelser och inställningar (B1App) | `EventReminderEdit.tsx`, `NotificationPrefsPage.tsx`, `useRealtimeNotifications.ts` |

## Relaterade sidor

- [Realtidsarkitektur](../realtime): WebSocket-protokollet och klientprimitiverna (`SocketHelper`, `SubscriptionManager`, `ConversationStore`) som leveransnivån i appen bygger på
- [Webbpushnotiser](../web-push): VAPID-inställning och webbläsarens Push API-väg, som används av pushnivån i eskaleringen
- [Slutpunkter för messaging](../api/endpoints/messaging): hela REST-ytan för meddelanden, konversationer, kontakter och rutter för aviseringar och påminnelser
