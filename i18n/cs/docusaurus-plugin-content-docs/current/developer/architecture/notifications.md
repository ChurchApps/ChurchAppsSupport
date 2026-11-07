---
title: "Architektura oznámení a připomínek"
description: "Jak API B1 Admin směruje oznámení, plánované připomínky, limity e-mailů církve a odhlášení z SMS přes jeden doručovací kanál a bránu předvoleb."
---

# Architektura oznámení a připomínek

<div class="article-intro">

Každá zpráva, kterou člen sboru uvidí mimo stránku, na které se právě nachází (počet nepřečtených upozornění, push oznámení, souhrnný e-mail), prochází jedněmi ze dvou dveří v MessagingApi. Tato stránka popisuje tento nálevák, engine připomínek, který jej podle plánu plní, a model předvoleb, který rozhoduje, co se k člověku skutečně dostane.

</div>

## Přehled: dvoje dveře

```
cokoli naplánovaného ──▶ ReminderEngine (definice → výskyty → skenování) ─┐
chat / žádosti / workflow / hromadné odesílání ────────────────────────────┼─▶ createNotifications()
                                                                          │    gate in_app → socket → push → e-mail
     (kanály připomínek zahrnují sms) ──▶ ReminderEngine.sendSms() ──▶ gate sms ──▶ sendPersonText() přes církevního poskytovatele
odpověď STOP od poskytovatele ──▶ POST /messaging/texting/inbound/:churchId/:token ──▶ SmsOptOutHelper.optOut()
účetní a právní pošta ──▶ TransactionalEmailHelper.sendTransactional()  [na seznamu povolených, vynucováno lintem]
```

1. **Cokoli, co člověku něco sděluje,** prochází přes `NotificationHelper.createNotifications()` v modulu messaging. Uloží řádek do tabulky `notifications` a eskaluje socket → push → e-mail. Pro každý kanál přitom vyhodnocuje `PreferenceGateHelper`, včetně `in_app` na úrovni 0.
2. **Cokoli naplánovaného** je `reminderDefinition` (na úrovni entity nebo rozsahu). Ta se rozvine do `reminderOccurrences` a `ReminderEngine.scan()` je odešle na opakovaném časovači. Je tu jeden expandér, jeden odesílatel a jeden záznam odeslaných zpráv (`reminderSentLog`).
3. **Přímý e-mail** existuje pouze za `TransactionalEmailHelper.sendTransactional()`. Pravidlo ESLint to vynucuje už při kompilaci, viz níže.

:::tip Dveře pro e-mail vynucuje linter, nejen konvence
`Api/tools/eslint-rules/email-door.cjs` definuje pravidlo `no-direct-email-helper`. Každé volání `EmailHelper.sendTemplatedEmail()` nebo `EmailHelper.sendEmail()` mimo soubory `NotificationHelper.ts` a `TransactionalEmailHelper.ts` lint neprojde. Pokud potřebujete odeslat e-mail, veďte jej přes nálevák (`createNotifications` s `emailImmediate`) nebo přes `TransactionalEmailHelper.sendTransactional()`. Jiná cesta neprojde CI.
:::

## Nálevák oznámení

`NotificationHelper.createNotifications()` je jediný vstupní bod pro všechno, co není naplánované ani účetní:

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
    deliveryStartLevel?: number;      // 0 socket (výchozí), 1 push, 2 pouze e-mail
    category?: string;                // osa předvoleb; odvozena z contentType, pokud chybí
    emailByPerson?: Record<string, { subject: string; html: string }>;
    emailImmediate?: boolean;         // odeslat e-mail hned, ne čekat na souhrn
  }
)
```

Pro každého příjemce uloží řádek do tabulky `notifications` a zavolá `attemptDeliveryWithEscalation`, která projde níže uvedený žebřík kanálů. Dosud nepřečtený řádek pro stejné `(contentType, contentId)` brání vytvoření dalšího. Tato ochrana proti duplicitám se přeskakuje u odeslání s `emailImmediate` (připomínky s časovým posunem, hromadné „e-mail všem" od zaměstnanců, kroky workflow, které si řeší deduplikaci samy) a u přímých zpráv, které vždy posílají ping do socketu.

`shared/helpers/NotificationService.ts` zrcadlí stejnou signaturu (`NotificationServiceOptions`) pro volající mimo modul messaging. Při startu aplikace se registruje do modulu messaging.

## Řetězec eskalace kanálů

Doručování začíná na určité úrovni (výchozí 0, u připomínek nebo explicitních odeslání vyšší) a přejde na další kanál, jen pokud předchozí neuspěl. Každou úroveň před pokusem o odeslání filtruje `PreferenceGateHelper`.

| Úroveň | Kanál | Chování |
|--------|-------|---------|
| 0 | **in_app / socket** | Nejdřív se kontroluje gate `in_app`. Pokud je odeslání potlačeno (ztlumeno), řádek se uloží s `isNew=false` a doručování úplně skončí: žádný ping do socketu, žádný odznak, žádná další eskalace. Jinak server najde otevřená spojení socketu pro místnost `alerts` dané osoby a odešle rámec `notification` (nebo `privateMessage`). U běžných oznámení se po úspěšném doručení přes socket řetězec zastaví zde. Časovač na 30 minut později znovu zkontroluje nepřečtené položky a eskaluje je. Přímé zprávy se nikdy nezastaví u socketu. Nainstalované PWA může držet socket otevřený i na pozadí, což by jinak potlačilo push na úrovni operačního systému. |
| 1 | **push** | Filtruje se podle `allowPush`, odhlášení z kategorie a tichého režimu. Odesílá na tokeny Expo push i na odběry Web Push nalezené v řádcích `devices` dané osoby. Duplicity odstraňuje podle koncového bodu a zastaralé tokeny při tom čistí. |
| 2 | **e-mail** | Filtruje se podle `emailFrequency` a odhlášení z kategorie. Okamžitá odeslání (`emailImmediate`) se vykreslí hned a zapíšou řádek do `deliveryLogs`. Jinak zůstane oznámení čekat na dávkový souhrn popsaný níže. |
| — | **sms** | Není úrovní v žebříku eskalace. Jediným filtrovaným producentem SMS je engine připomínek: když kanály definice obsahují `sms`, `ReminderEngine.sendSms()` pošle textovou zprávu každému příjemci **kromě** push/e-mailového oznámení (viz [Textové připomínky](#text-reminders)). Hromadné textování (`TextingController` / `@churchapps/texting`), odeslání z přehledu služeb **Text Volunteers** (`MatrixTextHelper` → `MessagingModuleGateway.sendPersonText`) i akce workflow **Send Text** (`StepActionHelper.sendText` → `sendPersonText`) posílají texty přímo přes poskytovatele daného sboru. Předvolby oznámení a tichý režim se na ně proto nevztahují. Respektuje se pouze příznak `optedOut` dané osoby. |

Nepřečtená oznámení, která zůstala na úrovni socketu nebo push, eskaluje časovač na 30 minut (`NotificationHelper.escalateDelivery`). Dávkové e-maily odesílá `NotificationHelper.sendEmailNotifications(frequency)` podle předvolby `emailFrequency` každé osoby. `individual` běží na časovači na 30 minut, `daily` běží na nočním časovači. (`weekly` je platná hodnota předvolby, ale zatím nemá vlastní dávkové spuštění.)

## Engine připomínek

Naplánované připomínky (připomínky událostí, termíny úkolů, připomínky o přiřazení ke službě nebo plánu) prochází jedním obecným enginem místo samostatné logiky cron pro každou funkci.

```
reminderDefinitions ──expanze──▶ reminderOccurrences ──skenování (30 min)──▶ createNotifications()
     │                                  │                                        │
     ▼                                  ▼                                        ▼
 na úrovni entity nebo rozsahu    jeden řádek na (definici,              deliveryStartLevel: 1
 posuny/kanály/zpráva             entitu, výskyt, posun)                 + záznam reminderSentLog
```

**Definice** (`reminderDefinitions`) jsou buď na úrovni entity (`entityId` nastaveno, tedy konkrétní událost, úkol nebo plán), nebo na úrovni rozsahu (`entityId` null, `scopeId` nastaveno, například každý plán pod daným typem plánu služeb). Definice obsahuje CSV minutových posunů (`offsets`, například `"1440,60"` pro jeden den a jednu hodinu předem), místní čas odeslání (`sendLocalTime`), CSV kanálů (`channels`, kde `email` spustí okamžitý bohatý e-mail v čase odeslání), `recipientMode`, a volitelnou vlastní zprávu `message`.

**Expanze** vytváří řádky spouštění pro nadcházející horizont (klouzavé okno několika dní). Běží na nočním časovači a také synchronně pokaždé, když se definice uloží, aby připomínka pro událost oznámenou na poslední chvíli přesto proběhla. Definice na úrovni rozsahu se rozvinou přes `loadScopeEntities` adaptéru a vytvoří jednu sadu výskytů pro každou konkrétní entitu. Výskyty na úrovni entity používají klíč `definitionId:occurrenceISO:offset`, zatímco výskyty v rozsahu jmenný prostor odvozují od id entity, takže se nikdy nesrazí. Vložení výskytu **obnoví** dříve zrušený řádek. Běžný způsob, jak znovu synchronizovat připomínku po změně základní entity, je zrušit a znovu expandovat. Řádky se stavem `sent`, `failed` nebo `processing` zůstávají nedotčené.

**Odesílání** (`ReminderEngine.scan()`) běží na časovači na 30 minut. Převezme splatné výskyty (zámek brání dvojímu zpracování), načte příjemce přes adaptér entity, vyřadí každého, kdo už je pro daný výskyt zapsaný v `reminderSentLog`, a zavolá `createNotifications` s `deliveryStartLevel: 1` (přeskočí rovnou na push) plus `emailImmediate` a `emailByPerson`, pokud kanály definice zahrnují e-mail.

### Textové připomínky

Když kanály definice obsahují `sms`, `scan()` po vytvoření push/e-mailových oznámení zavolá `ReminderEngine.sendSms()` pro stejné nové příjemce. Textové zprávy jsou pro každého člena volitelné:

- Každý příjemce prochází přes `PreferenceGateHelper.evaluate(..., "sms", ...)`. Proto musí být `allowSms` zapnuté (ve výchozím stavu vypnuté a nastavuje se přepínačem **Text messages** v B1App) a kanál `sms` dané kategorie nesmí být vypnutý přepsáním. Kategorie `event_reminders`, `serving_schedule` a `tasks` uvádějí `sms` jak v `defaultChannels`, tak v `allowedChannels`.
- Lidé bez `mobilePhone` nebo s nastaveným `optedOut` se potlačí. Pokud sbor nemá poskytovatele textových zpráv, zbytek dávky se potlačí s důvodem `no_provider`.
- Text vytváří `ReminderEngine.smsBody()`: `"<Název sboru>: <zpráva> Reply STOP to opt out."`, zkrácený na jeden segment o 160 znacích.
- Každý příjemce dostane vlastní řádek v `reminderSentLog` s `channel: "sms"` a stavem `sent` / `suppressed` / `failed`. Je veden odděleně od řádku push/e-mailu, takže neúspěšná textová zpráva nikdy znovu neodešle push ani e-mail.

Editory nabídnou **Text** pouze tehdy, když `GET /messaging/texting/status` vrátí `{ enabled: true }` (první poskytovatel textových zpráv daného sboru je zapnutý).

**Odhlášení pomocí STOP.** `POST /messaging/texting/inbound/:churchId/:token` je anonymní webhook, který sbor vloží do svého poskytovatele. B1Admin zobrazí URL z `GET /messaging/texting/inboundUrl` v nastavení textových zpráv. Token je HMAC id sboru (`SmsOptOutHelper.token`). `SmsOptOutHelper.parse` přijímá pole formuláře ve stylu Twilio a JSON ve stylu Clearstream/TextInChurch. Pokud je odpověď přesně jedno ze slov pro odhlášení operátorem (`STOP`, `STOPALL`, `UNSUBSCRIBE`, `CANCEL`, `END`, `QUIT`, `OPTOUT`, `REVOKE`), každé nesmazané osobě ve sboru, jejíž mobilní číslo se shoduje, se nastaví `people.optedOut = true` a `allowSms = false`. Ostatní odpovědi se potvrdí a ignorují.

Interní sběrnice událostí reaguje na změny entit, aniž čeká na noční expanzi. Události obsahu (přes doručovač webhooků) a události aktualizace plánů a úkolů spouštějí okamžitou expanzi nebo zrušení pro dotčenou entitu. Aktualizace plánu navíc znovu expanduje všechny definice v rozsahu vázané na jeho typ plánu.

### Adaptéry

Engine nezávisí na typu entity. Každý podporovaný typ entity se připojí přes adaptér (`helpers/adapters/`):

| Typ entity | Adaptér | Poznámky |
|------------|---------|----------|
| `event` | `EventReminderAdapter` | Příjemci jsou omezeni na registrované účastníky nebo členy skupiny podle události a `recipientMode`. |
| `plan` | `PlanReminderAdapter` | Příjemci jsou přijatá a nepotvrzená přiřazení u zveřejněných (nekonceptových) plánů. Nepotvrzená přiřazení vydaná přes pracovní postup potvrzení služby jsou vyloučena, dokud nejsou přijata (viz níže). `buildEmails` volá `DoingModuleGateway.buildPlanReminderEmails`, který přes `doing/helpers/PlanReminderEmailHelper` vykreslí pozice, poznámky a vlastní zprávu. Součástí jsou tlačítka Přijmout/Odmítnout podepsaná pomocí `ReminderTokenHelper`, která odesílají data na veřejný koncový bod pro odpověď na přiřazení. |
| `task` | `TaskReminderAdapter` | Příjemci jsou osoby, kterým je úkol přiřazen. |

### Koncové body

| Metoda | Cesta | Účel |
|--------|-------|------|
| `GET` / `POST` | `/messaging/reminders/:entityType/:entityId` | Načtení nebo uložení definice připomínky pro jednu entitu. |
| `GET` / `POST` | `/messaging/reminders/scope/:entityType/:scopeId` | Načtení nebo uložení definice připomínky na úrovni rozsahu (zděděné). |
| `DELETE` | `/messaging/reminders/:defId` | Smazání definice a zrušení jejích čekajících výskytů. |
| `GET` | `/messaging/reminders/event/:eventId/preview` | Náhled počtu příjemců a dalších časů odeslání pro připomínku události před uložením. |
| `GET` | `/messaging/reminders/log` | Nedávná historie výskytů připomínek pro sbor. |
| `POST` | `/messaging/reminders/mute` | Ztlumení připomínek pro konkrétní entitu. |

Uložení definice spustí synchronní novou expanzi pro danou entitu nebo rozsah. Editoři tak vidí aktuální „příští odeslání" bez čekání na noční úlohu.

## Přímé zprávy

Přímé zprávy jedou stejným nálevkem jako všechno ostatní, nikoli oddělenou cestou eskalace. Každá nepřečtená konverzace dostane jeden **stínový řádek** v tabulce `notifications` (`contentType='privateMessage'`, `contentId` = id soukromé zprávy, `category='direct_messages'`), který vlastní veškerý stav doručování: eskalaci přes socket, push a e-mail, sledování přečtení a vše ostatní. Tabulka `privateMessages` si ponechává obsah zprávy a sloupec `notifyPersonId`. Ten je zdrojem odznaku nepřečtených zpráv a při přečtení konverzace příjemcem se vynuluje.

Stínové řádky jsou v zvonku oznámení neviditelné. Vynechávají se v dotazu na počet nepřečtených, v dotazu na seznam oznámení i v dotazech na označení jako přečtené a smazání, které všechny filtrují podle `contentType <> 'privateMessage'`. Každé upozornění na přímou zprávu jde do socketu bez ohledu na stav přečtení (sémantika živého chatu, bez deduplikace). Přímé zprávy se nezastaví u socketu jako běžná oznámení, protože PWA běžící na pozadí může držet socket otevřený a přesto potřebovat push na úrovni operačního systému. Pokud osoba ztlumí oznámení o přímých zprávách, stínový řádek se odloží (`isNew=false`, `notifyPersonId` se vynuluje). Uvnitř samotné konverzace zůstane viditelný, ale bez odznaků a upozornění.

## Předvolby a filtrování

Každé odeslání prochází přes `PreferenceGateHelper.evaluate()`, čistou funkci (veškerý stav se předává dovnitř, na kritické cestě se nevolá databáze). Vrací `allow`, `suppress` nebo `defer`. Vrstvy běží v daném pořadí a rozhodne první, která se rozhodne:

1. **Uzamčená kategorie:** některé kategorie jsou povinné (úroveň 0) a obejdou všechny ostatní vrstvy.
2. **Hlavní ztlumení / vypnutí kanálu:** `masterMute`, `allowPush`, `allowSms` (ve výchozím stavu vypnuto, členové se musí přihlásit) nebo `emailFrequency='never'` odeslání okamžitě potlačí.
3. **Tichý režim:** platí pouze pro push a SMS (e-mail se považuje za nerušivý). Pokud je aktuální místní čas osoby v jejím tichém okně, transakční kategorie projde. Netransakční kategorie se odloží na konec tichého okna, vypočtený jako okamžik v UTC správně zohledňující letní čas přes `TimezoneHelper.wallClockToUtc`.
4. **Přepsání předvolby kategorie:** výslovné odhlášení pro dvojici kategorie × kanál. Chybějící záznam znamená výchozí nastavení kategorie.
5. **Ztlumení konkrétní entity:** ztlumení nastavené pro konkrétní entitu (například jednu událost nebo jeden plán) omezuje víc než nastavení na úrovni kategorie. Platí pouze tehdy, když volající k oznámení přidá id nebo typ entity.

Zapojené tabulky: `notificationPreferences` (globální: `masterMute`, `emailFrequency` s hodnotami `individual|daily|weekly|never`, `allowPush`, okno tichého režimu a časové pásmo, `allowSms`), `notificationPreferenceOverrides` (pro dvojici kategorie × kanál) a `notificationEntityMutes` (pro entitu).

Tento filtr se uplatňuje pro in-app (úroveň 0), push (úroveň 1) a e-mail (úroveň 2) uvnitř nálevku, včetně okamžitých e-mailů s připomínkami a souhrny, a pro textové připomínky v `ReminderEngine.sendSms()`. Účetní e-mail (kódy k přihlášení, obnovení hesla, pozvánky, potvrzení darů) jej záměrně obchází. Právě v tom spočívá smysl druhých dveří.

### Pracovní postupy potvrzení služby

Plán se může přihlásit k workflow `workflowType = "assignmentConfirmation"` (`plans.confirmationWorkflowId`). Publikování/oznámení pak místo oznámení pro každé přiřazení zavolá `POST /doing/plans/:id/issueRequests`. Každé nové nepotvrzené přiřazení dostane `notified` a `confirmationWorkflowId` a jednu kartu workflow (`tasks.assignmentId`, jedinečný `followupKey`). Karta odešle upozornění pouze v aplikaci (`appOnly: true`, bez eskalace na push nebo e-mail) a poté provede akce `sendAssignmentRequest` workflow. Ty procházejí přes `MessagingModuleGateway.sendServingWorkflowMessage`: e-mail přes `NotificationHelper.sendWorkflowEmail` (filtr předvoleb a `ChurchEmailLimiter`, měřeno jako `workflowEmail`), SMS přes `sendPersonText` pouze s `allowSms` a filtrem kategorie `serving_schedule`. Přijetí/odmítnutí (`assignment.updated` na sběrnici událostí) kartu uzavře. Časovač na 30 minut (`AssignmentWorkflowHelper.processPending`) dohání zmeškané starty a události. Požadavek bez odpovědi do termínu pro připomenutí převede na úkol kontroly pro vedoucího. Celý životní cyklus je popsán v `Api/docs/assignment-confirmation-workflows.md`.

## Limity e-mailů psaných sborem

E-mail, jehož obsah napsal sbor, odchází ze sdílené identity ChurchApps SES, proto jej `Api/src/shared/helpers/ChurchEmailLimiter.ts` měří pro každý sbor zvlášť. Čtyři cesty ho volají: odesílání skupinám a šablonám (`EmailTemplateController`, typ obsahu `email`), e-maily k následným krokům formulářů (`FormSubmissionController`, `formFollowUp`), akce workflow **Send email** (`NotificationHelper` s `churchAuthored`, `workflowEmail`) a e-maily s žádostí o potvrzení služby (`NotificationHelper.sendWorkflowEmail`, `workflowEmail`). Systémová pošta (kódy k přihlášení, potvrzení, připomínky) a pozvánky do rolí a skupin (`UserController.sendInviteEmail`, pevná šablona) se neměří.

- **Brána schválení.** Sbor neodešle nic, dokud správce serveru nenastaví `churches.emailApprovedDate` (`POST /membership/churches/:id/emailApproval`, Server Admin → Churches → čip **Group Email**). Archivované sbory jsou vždy blokovány. Dialog Send Email v B1Admin načítá `GET /messaging/emailTemplates/sendStatus` (`approved`, `paused`, `remaining`, `requested`). Pokud sbor schválený není, místo editoru zobrazí kartu **Request review**. Editor kroků workflow načítá tentýž koncový bod (je otevřený pro `tasks.admin` i pro `groupMembers.edit`) a upozorní u akcí **Send email**, pokud je sbor neschválený nebo pozastavený. V okamžiku odeslání `MessagingModuleGateway.sendTemplatedEmail` vrátí `false` bez vytvoření oznámení, pokud je `ChurchEmailLimiter.remaining()` menší než 1. Historie karty tak nikdy netvrdí **Email sent** u pošty, která byla zahozena. `POST /messaging/emailTemplates/requestApproval` pošle e-mail podpoře nejvýše jednou za týden pro každý sbor.
- **Získaný limit.** Schválený sbor dostane `max(150, 2 × jeho nejlepší den s e-maily psanými sborem za předchozích 30 dní)`, omezeno na 2 000 za klouzavých 24 hodin. Aktuálních 24 hodin se do „nejlepšího dne" nezapočítává, aby dávka nemohla zvýšit vlastní limit.
- **Rezervovat, pak vypořádat.** `reserve()` před odesláním zapíše jeden řádek `deliveryLogs` pro každého příjemce, znovu ověří limit s těmito řádky započítanými a vrátí chybu, pokud dva souběžné požadavky limit překročily (odeslání vrátí 429). `settle()` označí každý řádek jako odeslaný nebo neúspěšný.
- **Pozastavení kvůli stížnostem.** Lambda `sesFeedback` (`Api/src/lambda/ses-feedback-handler.ts`, napojená přes SES → SNS) přiřadí každý trvalý odraz nebo stížnost sboru, jehož e-mail s obsahem psaným sborem na danou adresu dorazil přibližně ve stejnou dobu. Ukládá se jako `deliveryMethod` `sesBounce` / `sesComplaint`. Sbor se pozastaví při 2 a více stížnostech (≥ 0,3 % odeslání) nebo 10 a více tvrdých odrazech (≥ 5 %) během 7 dní.

## Plánování

Engine připomínek i souhrn oznámení běží na existujících naplánovaných časovačích a nezavádějí novou infrastrukturu:

| Časovač | Plán | Spouští |
|---------|------|---------|
| Časovač 30 minut | každých 30 minut | Eskaluje nepřečtená oznámení; odesílá souhrnné e-maily s frekvencí `individual`; odesílá splatné výskyty připomínek (`ReminderEngine.scan`); schvalovací souhrny; splatné provedení automatizací |
| Noční časovač | 05:00 UTC | Připomínky docházky skupin; posouvá opakované streamované služby; obnovuje seznamy s automatickou obnovou; expanduje výskyty připomínek pro další horizont (`ReminderEngine.expandAll`); odesílá souhrnné e-maily s frekvencí `daily` |

Lokálně lze stejnou logiku spustit na vyžádání příkazy `npm run timer:30min` a `npm run timer:midnight` v projektu `Api`.

## Soupis souborů

| Oblast | Soubory |
|--------|---------|
| Nálevák | `Api/src/modules/messaging/helpers/NotificationHelper.ts`, `PreferenceGateHelper.ts`, `NotificationCategoryHelper.ts`, `WebPushHelper.ts`, `ExpoPushHelper.ts`, `SocketHelper.ts`, `DeliveryHelper.ts` |
| Sdílený vstupní bod | `Api/src/shared/helpers/NotificationService.ts` |
| Účetní dveře | `Api/src/shared/helpers/TransactionalEmailHelper.ts`, pravidlo lintu `Api/tools/eslint-rules/email-door.cjs` |
| Limity e-mailů sboru | `Api/src/shared/helpers/ChurchEmailLimiter.ts`, `Api/src/lambda/ses-feedback-handler.ts`, `Api/src/modules/messaging/repositories/DeliveryLogRepo.ts` |
| Engine připomínek | `Api/src/modules/messaging/helpers/ReminderEngine.ts`, `ReminderBootstrap.ts`, `helpers/adapters/*`, `controllers/ReminderController.ts` |
| Textové zprávy / odhlášení STOP | `Api/src/modules/messaging/helpers/SmsOptOutHelper.ts`, `controllers/TextingController.ts` (`/status`, `/inboundUrl`, `/inbound/:churchId/:token`), `Api/src/modules/doing/helpers/MatrixTextHelper.ts` (přehled služeb **Text Volunteers**) |
| Repozitáře připomínek | `Api/src/modules/messaging/repositories/ReminderDefinitionRepo.ts`, `ReminderOccurrenceRepo.ts`, `ReminderSentLogRepo.ts` |
| E-mail pro služby/plány | `Api/src/modules/doing/helpers/PlanReminderEmailHelper.ts`, `ReminderTokenHelper.ts`, `Api/src/shared/modules/DoingModuleGateway.ts` |
| Editory připomínek (B1Admin) | `serving/components/PlanTypeReminderEdit.tsx`, `calendars/components/EventReminderEdit.tsx`, `serving/tasks/components/TaskReminderEdit.tsx`, `hooks/useTextingEnabled.ts` |
| Editor připomínek / předvolby (B1App) | `EventReminderEdit.tsx`, `NotificationPrefsPage.tsx`, `useRealtimeNotifications.ts` |

## Související stránky

- [Architektura v reálném čase](../realtime.md): protokol WebSocket a klientské primitivy (`SocketHelper`, `SubscriptionManager`, `ConversationStore`), na kterých stojí doručování v aplikaci
- [Web Push oznámení](../web-push.md): nastavení VAPID a cesta prohlížečového Push API, kterou používá eskalace přes push
- [Koncové body messagingu](../api/endpoints/messaging.md): úplné REST rozhraní pro zprávy, konverzace, spojení a trasy oznámení a připomínek
