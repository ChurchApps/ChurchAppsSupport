---
title: "Architektúra upozornení a pripomienok"
description: "Ako API B1 Admin smeruje oznámenia, plánované pripomienky, limity cirkevných e-mailov a odhlásenia z textových správ cez jeden doručovací kanál a bránu predvolieb."
---

# Architektúra upozornení a pripomienok

<div class="article-intro">

Každá správa, ktorú člen cirkvi vidí mimo stránky, na ktorej sa práve nachádza (počítadlo odznakov, push upozornenie, súhrnný e-mail), prechádza jedným z dvoch vstupov v MessagingApi. Táto stránka popisuje lievik, engine pripomienok, ktorý ho podľa rozvrhu napĺňa, a model predvolieb, ktorý rozhoduje, čo sa naozaj dostane k človeku.

</div>

## Prehľad — dva vstupy

```
scheduled anything ──▶ ReminderEngine (definitions → occurrences → scan) ─┐
chat / requests / workflow / bulk sends ──────────────────────────────────┼─▶ createNotifications()
                                                                          │    in_app gate → socket → push → email
     (reminder channels include sms) ──▶ ReminderEngine.sendSms() ──▶ sms gate → sendPersonText() via church provider
provider STOP reply ──▶ POST /messaging/texting/inbound/:churchId/:token ──▶ SmsOptOutHelper.optOut()
account/legal mail ──▶ TransactionalEmailHelper.sendTransactional()  [allowlisted, lint-enforced]
```

1. **Čokoľvek, čo človeku niečo oznamuje,** prechádza cez `NotificationHelper.createNotifications()` v module messaging. Uloží riadok do `notifications` a eskaluje socket → push → e-mail, pričom pre každý kanál vyhodnocuje `PreferenceGateHelper`, vrátane `in_app` na úrovni 0.
2. **Čokoľvek naplánované** je `reminderDefinition` (na úrovni entity alebo rozsahu), rozvinutá do `reminderOccurrences` a odoslaná `ReminderEngine.scan()` na opakovanom časovači. Jeden rozvíjač, jeden odosielateľ, jedna evidencia odoslaní (`reminderSentLog`).
3. **Priame e-maily** existujú len za `TransactionalEmailHelper.sendTransactional()`. Pravidlo ESLint to vynucuje pri kompilácii (pozri nižšie).

:::tip Vstup pre e-maily je vynucovaný pravidlom lintu, nie len konvenciou
`Api/tools/eslint-rules/email-door.cjs` definuje `no-direct-email-helper`: každé volanie `EmailHelper.sendTemplatedEmail()` alebo `EmailHelper.sendEmail()` mimo súborov `NotificationHelper.ts` alebo `TransactionalEmailHelper.ts` zlyhá pri lintovaní. Ak potrebujete odoslať e-mail, prejdite cez lievik (`createNotifications` s `emailImmediate`) alebo cez `TransactionalEmailHelper.sendTransactional()`. Žiadna tretia cesta, ktorá prejde CI, neexistuje.
:::

## Lievik upozornení

`NotificationHelper.createNotifications()` je jediný vstupný bod pre všetko, čo nie je naplánované ani transakčné:

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

Pre každého príjemcu uloží riadok do `notifications` a zavolá `attemptDeliveryWithEscalation`, ktorá prejde kanálovou reťazou nižšie. Riadok, ktorý ešte nebol prečítaný, pre rovnaký `(contentType, contentId)` bráni opätovnému vytvoreniu. Táto ochrana proti duplicitám sa preskakuje pri odosielaniach s `emailImmediate` (posuny pripomienok, hromadné „poslať e-mail všetkým“ od zamestnancov, kroky workflow si riešia deduplikáciu sami) a pri priamych správach, ktoré vždy pošlú signál cez socket.

`shared/helpers/NotificationService.ts` zrkadlí rovnaký podpis (`NotificationServiceOptions`) pre volajúcich mimo modulu messaging a pri štarte sa registruje v module messaging.

## Reťaz eskalácie kanálov

Doručovanie začína na úrovni (predvolene 0, alebo vyššej pri pripomienkach alebo explicitných odoslaniach) a pokračuje na ďalší kanál, iba ak predchádzajúci neuspel. Každá úroveň je pred pokusom o doručenie filtrovaná cez `PreferenceGateHelper`.

| Úroveň | Kanál | Správanie |
|-------|---------|----------|
| 0 | **in_app / socket** | Najprv sa kontroluje brána `in_app`. Ak je potlačená (stíšená), riadok sa uloží s `isNew=false` a doručovanie úplne končí: žiadny signál cez socket, žiadny odznak, žiadna ďalšia eskalácia. Inak server vyhľadá otvorené socket spojenia pre miestnosť `alerts` danej osoby a odošle rámec `notification` (alebo `privateMessage`). Pri bežných upozorneniach úspešné doručenie cez socket reťaz zastaví tu. 30-minútový časovač neskôr znovu skontroluje neprečítané položky a eskaluje ich. Priame správy sa pri sockete nikdy nezastavia: nainštalovaná PWA môže držať socket upozornení otvorený na pozadí, čo by inak potlačilo push upozornenie na úrovni OS. |
| 1 | **push** | Podmienené `allowPush`, odhlásením z kategórie a tichými hodinami. Odosiela sa na Expo push tokeny aj Web Push predplatné nájdené v riadkoch `devices` danej osoby, deduplikuje podľa koncového bodu a pri tom odstraňuje zastarané tokeny. |
| 2 | **e-mail** | Podmienené `emailFrequency` a odhlásením z kategórie. Okamžité odoslania (`emailImmediate`) sa vykreslia hneď a zapíšu riadok `deliveryLogs`. Inak zostane upozornenie čakať na súhrnný dávkový e-mail, popísaný nižšie. |
| — | **sms** | Nie je úrovňou v eskalačnej reťazi. Jediným filtrovaným producentom SMS je engine pripomienok: keď kanály definície obsahujú `sms`, `ReminderEngine.sendSms()` pošle textovú správu každému príjemcovi **popri** push/e-mailovom upozornení (pozri [Textové pripomienky](#text-reminders)). Hromadné textovanie (`TextingController` / `@churchapps/texting`), akcia prehľadu služieb **Textová správa dobrovoľníkom** (`MatrixTextHelper` → `MessagingModuleGateway.sendPersonText`) a akcia workflow **Odoslať text** (`StepActionHelper.sendText` → `sendPersonText`) posielajú texty priamo cez poskytovateľa cirkvi. Predvoľby upozornení a tiché hodiny sa na ne preto neuplatňujú. Rešpektuje sa iba príznak `optedOut` danej osoby. |

Neprečítané upozornenia, ktoré zostali na úrovni socket alebo push, eskaluje 30-minútový časovač (`NotificationHelper.escalateDelivery`). Dávkové e-maily odosiela `NotificationHelper.sendEmailNotifications(frequency)`, riadené predvoľbou `emailFrequency` každej osoby: `individual` beží na 30-minútovom časovači, `daily` na nočnom časovači. (`weekly` je platná hodnota predvoľby, ale zatiaľ nemá vlastný dávkový beh.)

## Engine pripomienok

Naplánované pripomienky (pripomienky udalostí, termíny úloh, pripomienky priradenia služby alebo plánu) všetky prechádzajú jedným zovšeobecneným enginom namiesto samostatnej logiky cron pre každú funkciu.

```
reminderDefinitions ──expand──▶ reminderOccurrences ──scan (30 min)──▶ createNotifications()
     │                                  │                                    │
     ▼                                  ▼                                    ▼
 entity- or scope-level          one row per (definition,              deliveryStartLevel: 1
 offsets/channels/message        entity, occurrence, offset)           + reminderSentLog ledger
```

**Definície** (`reminderDefinitions`) sú buď na úrovni entity (`entityId` je nastavené, ide o konkrétnu udalosť, úlohu alebo plán), alebo na úrovni rozsahu (`entityId` je null, `scopeId` je nastavené, napr. každý plán pod typom plánu služby). Definícia obsahuje CSV minútových posunov (`offsets`, napr. `"1440,60"` pre jeden deň a jednu hodinu vopred), lokálny čas odoslania (`sendLocalTime`), CSV kanálov (`channels`, pričom `email` spustí okamžitý bohatý e-mail v čase odoslania), `recipientMode` a voliteľnú vlastnú `message`.

**Rozvinutie** materializuje riadky spustení pre nadchádzajúci horizont (posuvné okno na niekoľko dní). Beží na nočnom časovači a synchrónne vždy, keď sa definícia uloží, aby sa pripomienka na poslednú chvíľu aj tak spustila. Rozsahové definície sa rozvetvia cez `loadScopeEntities` adaptéra a vytvoria jednu sadu výskytov pre každú konkrétnu entitu. Výskyty na úrovni entity používajú kľúč `definitionId:occurrenceISO:offset`, zatiaľ čo výskyty v rozsahu majú menný priestor podľa ID entity, takže sa nikdy nekolidujú. Vloženie výskytu **obnoví** predtým zrušený riadok. Zrušiť a potom znovu rozvinúť je štandardný spôsob, ako znovu synchronizovať pripomienku po zmene základnej entity. Riadky, ktoré sú už `sent`, `failed` alebo `processing`, zostanú nedotknuté.

**Odosielanie** (`ReminderEngine.scan()`) beží na 30-minútovom časovači. Prevezme splatné výskyty (zámka lease bráni dvojitému spracovaniu), načíta príjemcov cez adaptér entity, odfiltruje každého, kto je už zaznamenaný v `reminderSentLog` pre daný výskyt, a zavolá `createNotifications` s `deliveryStartLevel: 1` (priamo na push) plus `emailImmediate`/`emailByPerson`, ak kanály definície obsahujú e-mail.

### Textové pripomienky

Keď kanály definície obsahujú `sms`, `scan()` zavolá `ReminderEngine.sendSms()` po vytvorení push/e-mailových upozornení, pre tých istých nových príjemcov. Posielanie textov je pre každého člena dobrovoľné:

- Každý príjemca prejde cez `PreferenceGateHelper.evaluate(..., "sms", ...)`, takže `allowSms` musí byť zapnuté (predvolene vypnuté, nastavuje sa z prepínača **Text messages** v B1App) a kanál `sms` danej kategórie nesmie byť prepísaný na vypnutý. `event_reminders`, `serving_schedule` a `tasks` uvádzajú `sms` v `defaultChannels` aj `allowedChannels`.
- Ľudia bez `mobilePhone` alebo s nastaveným `optedOut` sú potlačení. Ak cirkev nemá poskytovateľa textových správ, zvyšok dávky je potlačený s dôvodom `no_provider`.
- Telo správy vytvára `ReminderEngine.smsBody()`: `"<Church name>: <message> Reply STOP to opt out."`, orezané na jeden 160-znakový segment.
- Každý príjemca dostane vlastný riadok `reminderSentLog` s `channel: "sms"` a stavom `sent` / `suppressed` / `failed`, oddelene od riadku push/e-mailu. Neúspešný text tak nikdy nepošle znovu push ani e-mail.

Editori ponúknu **Text** len vtedy, keď `GET /messaging/texting/status` vráti `{ enabled: true }` (prvý poskytovateľ textových správ cirkvi je zapnutý).

**Odhlásenie STOP.** `POST /messaging/texting/inbound/:churchId/:token` je anonymný webhook, ktorý cirkev vloží do svojho poskytovateľa (B1Admin zobrazuje URL z `GET /messaging/texting/inboundUrl` v nastaveniach textovania). Token je HMAC z ID cirkvi (`SmsOptOutHelper.token`). `SmsOptOutHelper.parse` prijíma polia formulára v štýle Twilio a JSON v štýle Clearstream/TextInChurch. Ak je odpoveď presne jedno zo štandardných slov na odhlásenie (`STOP`, `STOPALL`, `UNSUBSCRIBE`, `CANCEL`, `END`, `QUIT`, `OPTOUT`, `REVOKE`), každej osobe v cirkvi, ktorá nebola odstránená a ktorej mobilné číslo sa zhoduje, sa nastaví `people.optedOut = true` a `allowSms = false`. Ostatné odpovede sú potvrdené a ignorované.

Interná zbernica udalostí reaguje na zmeny entít bez čakania na nočné rozvinutie. Udalosti obsahu (cez dispatcher webhookov) a udalosti aktualizácie plánu alebo úlohy spustia okamžité opätovné rozvinutie alebo zrušenie dotknutej entity. Aktualizácia plánu tiež znovu rozvinie rozsahové definície napojené na jeho typ plánu.

### Adaptéry

Engine je nezávislý od entít. Každý podporovaný typ entity sa pripája cez adaptér (`helpers/adapters/`):

| Typ entity | Adaptér | Poznámky |
|-------------|---------|-------|
| `event` | `EventReminderAdapter` | Príjemcovia sú obmedzení na registrovaných účastníkov alebo členov skupiny podľa udalosti a `recipientMode`. |
| `plan` | `PlanReminderAdapter` | Príjemcami sú priradenia Accepted + Unconfirmed na publikovaných (nekonceptových) plánoch. Nepotvrdené priradenia vydané cez workflow potvrdenia služby sú vylúčené, kým ich neprijmú (pozri nižšie). `buildEmails` volá `DoingModuleGateway.buildPlanReminderEmails`, ktorý vykresľuje pozície, poznámky a vlastnú správu cez `doing/helpers/PlanReminderEmailHelper`, vrátane tlačidiel Prijať / Odmietnuť podpísaných `ReminderTokenHelper`, ktoré odosielajú na verejný koncový bod odpovede na priradenie. |
| `task` | `TaskReminderAdapter` | Príjemcami je priradená osoba úlohy. |

### Koncové body

| Metóda | Cesta | Účel |
|--------|------|---------|
| `GET` / `POST` | `/messaging/reminders/:entityType/:entityId` | Načítať alebo uložiť definíciu pripomienky pre jednu entitu. |
| `GET` / `POST` | `/messaging/reminders/scope/:entityType/:scopeId` | Načítať alebo uložiť definíciu pripomienky na úrovni rozsahu (zdedenú). |
| `DELETE` | `/messaging/reminders/:defId` | Vymazať definíciu a zrušiť jej čakajúce výskyty. |
| `GET` | `/messaging/reminders/event/:eventId/preview` | Pred uložením zobraziť náhľad počtu príjemcov a ďalších časov odoslania pripomienky udalosti. |
| `GET` | `/messaging/reminders/log` | Nedávna história výskytov pripomienok pre cirkev. |
| `POST` | `/messaging/reminders/mute` | Stíšiť pripomienky pre konkrétnu entitu. |

Uloženie definície spustí synchrónne opätovné rozvinutie pre danú entitu alebo rozsah, takže editori vidia aktuálne údaje o ďalších odoslaniach bez čakania na nočnú úlohu.

## Priame správy

Priame správy idú tou istou cestou ako všetko ostatné, nie cez samostatnú eskalačnú cestu. Každá neprečítaná konverzácia dostane jeden **tieňový riadok** v `notifications` (`contentType='privateMessage'`, `contentId` = ID súkromnej správy, `category='direct_messages'`), ktorý vlastní všetok stav doručenia: eskaláciu cez socket/push/e-mail, sledovanie prečítania, všetko. Tabuľka `privateMessages` sama uchováva obsah správy a stĺpec `notifyPersonId`. Ten je zdrojom odznaku neprečítaných správ a vynuluje sa, keď príjemca konverzáciu prečíta.

Tieňové riadky sú neviditeľné pre zvonček upozornení. Sú vylúčené z dotazu na počet neprečítaných, zo zoznamu upozornení a z dotazov na označenie ako prečítané alebo odstránenie, ktoré všetky filtrujú `contentType <> 'privateMessage'`. Každé upozornenie na priamu správu zasiahne socket bez ohľadu na stav neprečítania (sémantika živého chatu, bez deduplikácie). Priame správy sa nikdy nezastavia pri doručení cez socket, ako bežné upozornenia, keďže PWA na pozadí môže držať socket otvorený a stále potrebovať push na úrovni OS. Ak osoba stíši upozornenia na priame správy, tieňový riadok sa odloží (`isNew=false`, `notifyPersonId` vynulované). Zostane viditeľný vo vnútri samotnej konverzácie, len bez odznakov a upozornení.

## Predvoľby a filtrovanie

Každé odoslanie prechádza cez `PreferenceGateHelper.evaluate()`, čistú funkciu (všetok stav sa odovzdáva dnu, žiadne volania databázy na kritickej ceste), ktorá vracia `allow`, `suppress` alebo `defer`. Vrstvy bežia v poradí a prvá, ktorá rozhodne, vyhráva:

1. **Uzamknutá kategória**: niektoré kategórie sú povinné (úroveň 0) a obchádzajú všetky ostatné vrstvy.
2. **Hlavné stíšenie / vypnutie kanála**: `masterMute`, `allowPush`, `allowSms` (predvolene vypnuté, členovia sa prihlasujú sami) alebo `emailFrequency='never'` potláčajú okamžite.
3. **Tiché hodiny**: iba push a SMS (e-mail sa považuje za needitívny). Ak aktuálny čas na stene v časovom pásme danej osoby spadá do jej tichého okna, transakčná kategória stále prejde. Netransakčná sa odloží na koniec tichého okna, vypočítaný ako DST-správny okamih UTC cez `TimezoneHelper.wallClockToUtc`.
4. **Prepísanie predvoľby kategórie**: výslovné odhlásenie pre dvojicu kategória × kanál. Absencia znamená predvolenú hodnotu kategórie.
5. **Stíšenie na úrovni entity**: stíšenie zaznamenané voči konkrétnej entite (napr. jedna udalosť, jeden plán) obmedzuje viac než nastavenie na úrovni kategórie. Platí však iba vtedy, keď volajúci dodá ID a typ entity spolu s upozornením.

Zapojené tabuľky: `notificationPreferences` (globálne: `masterMute`, `emailFrequency` s hodnotami `individual|daily|weekly|never`, `allowPush`, okno tichých hodín a časové pásmo, `allowSms`), `notificationPreferenceOverrides` (na kategóriu × kanál) a `notificationEntityMutes` (na entitu).

Táto brána sa vynucuje pre in-app (úroveň 0), push (úroveň 1) a e-mail (úroveň 2) vnútri lievika, vrátane okamžitých e-mailov s pripomienkami a súhrnmi, a pre textové pripomienky v `ReminderEngine.sendSms()`. Transakčný e-mail (overovacie kódy, obnovenie hesla, pozvánky, potvrdenia o darovaní) ju obchádza zámerne. Práve v tom je podstata druhého vstupu.

### Workflowy potvrdenia služby

Plán sa môže prihlásiť do workflow `workflowType = "assignmentConfirmation"` (`plans.confirmationWorkflowId`). Publish/Notify potom volá `POST /doing/plans/:id/issueRequests` namiesto upozornenia na každé priradenie zvlášť: každé nové nepotvrdené priradenie dostane `notified` + `confirmationWorkflowId` a jednu kartu workflow (`tasks.assignmentId`, jedinečný `followupKey`). Karta odošle upozornenie iba pre aplikáciu (`appOnly: true`, žiadna eskalácia na push ani e-mail) a potom spustí akcie `sendAssignmentRequest` workflowu. Tie prechádzajú cez `MessagingModuleGateway.sendServingWorkflowMessage`: e-mail cez `NotificationHelper.sendWorkflowEmail` (brána predvolieb + `ChurchEmailLimiter`, meraný ako `workflowEmail`), SMS cez `sendPersonText` len pri `allowSms` a bráne kategórie `serving_schedule`. Prijatie alebo odmietnutie (`assignment.updated` na zbernici udalostí) kartu uzavrie. 30-minútový časovač (`AssignmentWorkflowHelper.processPending`) opraví zmeškané štarty a udalosti a na nezodpovedanú žiadosť po termíne pre pripomienku vytvorí úlohu kontroly pre vedúceho. Celý životný cyklus: `Api/docs/assignment-confirmation-workflows.md`.

## Limity e-mailov napísaných cirkvou

E-mail, ktorého obsah napísala cirkev, odchádza zo zdieľanej identity ChurchApps SES, preto ho pre každú cirkev meria `Api/src/shared/helpers/ChurchEmailLimiter.ts`. Volajú ho štyri cesty: odoslania skupinám a šablónam (`EmailTemplateController`, typ obsahu `email`), e-maily dodatočného kontaktu z formulárov (`FormSubmissionController`, `formFollowUp`), akcie workflow **Odoslať e-mail** (`NotificationHelper` s `churchAuthored`, `workflowEmail`) a e-maily so žiadosťou o potvrdenie služby (`NotificationHelper.sendWorkflowEmail`, `workflowEmail`). Systémová pošta (overovacie kódy, potvrdenia, pripomienky) a pozvánky do rolí a skupín (`UserController.sendInviteEmail`, pevná šablóna) sa nemerajú.

- **Brána schválenia.** Cirkev neodošle nič, kým správca servera nenastaví `churches.emailApprovedDate` (`POST /membership/churches/:id/emailApproval`, Server Admin → Churches → čip **Group Email**). Archivované cirkvi sú vždy blokované. Dialóg Odoslať e-mail v B1Admin číta `GET /messaging/emailTemplates/sendStatus` (`approved`, `paused`, `remaining`, `requested`) a ak cirkev nie je schválená, zobrazí kartu **Požiadať o kontrolu** namiesto editora. Editor krokov workflow číta ten istý koncový bod (prístupný pre `tasks.admin` aj `groupMembers.edit`) a pri akciách **Odoslať e-mail** upozorní, ak je cirkev neschválená alebo pozastavená. Pri odoslaní `MessagingModuleGateway.sendTemplatedEmail` vráti `false` bez vytvorenia upozornenia, keď je `ChurchEmailLimiter.remaining()` menší ako 1. História karty tak nikdy netvrdí **Odoslaný e-mail** pre poštu, ktorá bola zahodená. `POST /messaging/emailTemplates/requestApproval` pošle e-mail podpore, najviac raz za týždeň pre cirkev.
- **Zarobený príděl.** Schválená cirkev dostane `max(150, 2 × jej najlepší deň s e-mailmi napísanými cirkvou za predchádzajúcich 30 dní)`, obmedzený na 2 000 za kĺzavých 24 hodín. Aktuálne 24 hodiny sa vynechajú z výpočtu „najlepšieho dňa“, aby sa výbuch nemohol zvýšiť vlastným limitom.
- **Rezervuj, potom vyrovnaj.** `reserve()` zapíše pred odoslaním jeden riadok `deliveryLogs` na každého príjemcu, znovu skontroluje príděl s počítaním týchto riadkov a vráti sa späť, ak dve žiadosti prekročili limit súčasne (odoslanie vráti 429). `settle()` označí každý riadok ako odoslaný alebo neúspešný.
- **Pozastavenie pre sťažnosti.** Lambda `sesFeedback` (`Api/src/lambda/ses-feedback-handler.ts`, napájaná z SES → SNS) priradí každý trvalý bounce alebo sťažnosť k cirkvi, ktorej e-mail napísaný cirkvou sa k tej adrese dostal približne v tom čase. Ukladá sa ako `deliveryMethod` `sesBounce` / `sesComplaint`. Cirkev je pozastavená pri 2 a viac sťažnostiach (≥ 0,3 % odoslaní) alebo 10 a viac tvrdých bounce (≥ 5 %) za 7 dní.

## Plánovanie

Engine pripomienok aj súhrnný digest upozornení bežia na existujúcich naplánovaných časovačoch namiesto zavádzania novej infraštruktúry:

| Časovač | Plán | Spúšťa |
|-------|----------|----------|
| 30-minútový časovač | každých 30 minút | Eskalovať neprečítané upozornenia; odoslať súhrnné e-maily s frekvenciou `individual`; odoslať splatné výskyty pripomienok (`ReminderEngine.scan`); súhrny schválení; splatné automatizačné vykonania |
| Nočný časovač | 05:00 UTC | Pripomienky dochádzky skupiny; posunúť opakované streamované služby; obnoviť zoznamy s automatickým obnovením; rozvinúť výskyty pripomienok pre ďalší horizont (`ReminderEngine.expandAll`); odoslať súhrnné e-maily s frekvenciou `daily` |

Lokálne možno rovnakú logiku spustiť na požiadanie príkazmi `npm run timer:30min` a `npm run timer:midnight` z projektu `Api`.

## Inventár súborov

| Oblasť | Súbory |
|------|-------|
| Lievik | `Api/src/modules/messaging/helpers/NotificationHelper.ts`, `PreferenceGateHelper.ts`, `NotificationCategoryHelper.ts`, `WebPushHelper.ts`, `ExpoPushHelper.ts`, `SocketHelper.ts`, `DeliveryHelper.ts` |
| Zdieľaný vstup | `Api/src/shared/helpers/NotificationService.ts` |
| Transakčný vstup | `Api/src/shared/helpers/TransactionalEmailHelper.ts`, pravidlo lintu `Api/tools/eslint-rules/email-door.cjs` |
| Limity e-mailov cirkvi | `Api/src/shared/helpers/ChurchEmailLimiter.ts`, `Api/src/lambda/ses-feedback-handler.ts`, `Api/src/modules/messaging/repositories/DeliveryLogRepo.ts` |
| Engine pripomienok | `Api/src/modules/messaging/helpers/ReminderEngine.ts`, `ReminderBootstrap.ts`, `helpers/adapters/*`, `controllers/ReminderController.ts` |
| Textovanie / odhlásenie STOP | `Api/src/modules/messaging/helpers/SmsOptOutHelper.ts`, `controllers/TextingController.ts` (`/status`, `/inboundUrl`, `/inbound/:churchId/:token`), `Api/src/modules/doing/helpers/MatrixTextHelper.ts` (prehľad služieb, **Textová správa dobrovoľníkom**) |
| Úložiská pripomienok | `Api/src/modules/messaging/repositories/ReminderDefinitionRepo.ts`, `ReminderOccurrenceRepo.ts`, `ReminderSentLogRepo.ts` |
| E-mail služieb/plánov | `Api/src/modules/doing/helpers/PlanReminderEmailHelper.ts`, `ReminderTokenHelper.ts`, `Api/src/shared/modules/DoingModuleGateway.ts` |
| Editory pripomienok (B1Admin) | `serving/components/PlanTypeReminderEdit.tsx`, `calendars/components/EventReminderEdit.tsx`, `serving/tasks/components/TaskReminderEdit.tsx`, `hooks/useTextingEnabled.ts` |
| Editor / predvoľby pripomienok (B1App) | `EventReminderEdit.tsx`, `NotificationPrefsPage.tsx`, `useRealtimeNotifications.ts` |

## Súvisiace stránky

- [Architektúra v reálnom čase](../realtime.md): protokol WebSocket a klientske primitíva (`SocketHelper`, `SubscriptionManager`, `ConversationStore`), na ktorých beží úroveň doručenia in-app
- [Webové push upozornenia](../web-push.md): nastavenie VAPID a cesta prehliadačového Push API, ktorú používa úroveň eskalácie push
- [Koncové body správ](../api/endpoints/messaging.md): úplný REST povrch pre správy, konverzácie, spojenia a trasy upozornení a pripomienok
