---
title: "Értesítések és emlékeztetők architektúrája"
description: "Hogyan irányítja a B1 Admin API az értesítéseket, az ütemezett emlékeztetőket, a gyülekezeti e-mail-korlátokat és az SMS-leiratkozásokat egyetlen kézbesítési csatornán és preferencia-kapun keresztül."
---

# Értesítések és emlékeztetők architektúrája

<div class="article-intro">

Minden üzenet, amelyet egy egyházi tag a nézett oldalon kívül lát — egy jelvényszám, egy push-értesítés, egy összesítő e-mail — a MessagingApi két ajtajának egyikén halad át. Ez az oldal leírja ezt a csatornát, az ütemezetten ezt tápláló emlékeztető-motort, valamint azt a beállítási modellt, amely eldönti, mi jut el ténylegesen az emberhez.

</div>

## Áttekintés — két ajtó

```
scheduled anything ──▶ ReminderEngine (definitions → occurrences → scan) ─┐
chat / requests / workflow / bulk sends ──────────────────────────────────┼─▶ createNotifications()
                                                                          │    in_app gate → socket → push → email
     (reminder channels include sms) ──▶ ReminderEngine.sendSms() ──▶ sms gate → sendPersonText() via church provider
provider STOP reply ──▶ POST /messaging/texting/inbound/:churchId/:token ──▶ SmsOptOutHelper.optOut()
account/legal mail ──▶ TransactionalEmailHelper.sendTransactional()  [allowlisted, lint-enforced]
```

1. **Bármi, ami valamit közöl egy személlyel**, a messaging modulban lévő `NotificationHelper.createNotifications()` függvényen keresztül megy. Elment egy sort a `notifications` táblába, és socket → push → email sorrendben továbbít, minden csatornánál kiértékelve a `PreferenceGateHelper`-t — beleértve a 0. szintű `in_app` csatornát is.
2. **Bármi, ami ütemezett**, egy `reminderDefinition` (entitásszintű vagy hatókörszintű), amelyet `reminderOccurrences` elemekre bontanak, és a `ReminderEngine.scan()` küld el ismétlődő időzítőn. Egy kibontó, egy küldő, egy küldési napló (`reminderSentLog`).
3. **Közvetlen e-mail** csak a `TransactionalEmailHelper.sendTransactional()` mögött létezik. Egy ESLint-szabály ezt fordítási időben érvényesíti — lásd lentebb.

:::tip Az e-mail ajtót lint-szabály védi, nem csak konvenció
`Api/tools/eslint-rules/email-door.cjs` definiálja a `no-direct-email-helper` szabályt: minden `EmailHelper.sendTemplatedEmail()` vagy `EmailHelper.sendEmail()` hívás, amely a `NotificationHelper.ts` vagy a `TransactionalEmailHelper.ts` fájlon kívül történik, elbukik a lintnél. Ha e-mailt kell küldened, azt vagy a csatornán keresztül tedd (`createNotifications` az `emailImmediate` opcióval), vagy a `TransactionalEmailHelper.sendTransactional()` függvénnyel. Más mód nem megy át a CI-n.
:::

## Az értesítési csatorna

`NotificationHelper.createNotifications()` az egyetlen belépési pont mindenre, ami nem ütemezett és nem tranzakciós:

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

Minden címzetthez elment egy sort a `notifications` táblában, és meghívja az `attemptDeliveryWithEscalation` függvényt, amely végigmegy az alábbi csatornalépcsőn. Egy még olvasatlan sor ugyanarra a `(contentType, contentId)` párra megakadályozza az újralétrehozást. Ezt a duplikáció-szűrőt kihagyják az `emailImmediate` küldések (emlékeztető-eltolások, munkatársi „e-mail mindenkinek", munkafolyamat-lépések, amelyek saját deduplikációt végeznek), valamint a közvetlen üzenetek, amelyek mindig értesítik a socketet.

A `shared/helpers/NotificationService.ts` ugyanazt az aláírást (`NotificationServiceOptions`) tükrözi a messaging modulon kívüli hívók számára, és indításkor regisztrálódik a messaging modulnál.

## Csatornalépcső

A kézbesítés egy szinten kezdődik (alapértelmezetten 0, emlékeztetőknél vagy kifejezett küldéseknél magasabban), és csak akkor lép a következő csatornára, ha az előző nem volt sikeres. Minden szintet a `PreferenceGateHelper` kapuz, mielőtt bármit megkísérelnénk.

| Szint | Csatorna | Működés |
|-------|----------|---------|
| 0 | **in_app / socket** | Először az `in_app` kaput ellenőrzik. Ha el van nyomva (némítva), a sor `isNew=false` értékkel mentődik, és a kézbesítés teljesen leáll — nincs socket-jelzés, nincs jelvény, nincs további továbbítás. Egyébként a szerver megkeresi a személy `alerts` szobájában lévő nyitott socket-kapcsolatokat, és `notification` (vagy `privateMessage`) keretet küld. Normál értesítéseknél a sikeres socket-kézbesítés itt megállítja a láncot — a 30 perces időzítő később újraellenőrzi az olvasatlan elemeket, és továbbítja őket. Közvetlen üzeneteknél a lánc soha nem áll meg a socketnél: a telepített PWA a háttérben is nyitva tarthatja az alerts socketet, ami egyébként elnyomná az OS-szintű push-értesítést. |
| 1 | **push** | Az `allowPush` / kategória-leiratkozás / csendes órák alapján kapuzva. Küld mind az Expo push tokenekre, mind a Web Push feliratkozásokra, amelyek a személy `devices` soraiban vannak, végpont szerint deduplikálva, és közben eltávolítja az elavult tokeneket. |
| 2 | **email** | Az `emailFrequency` és a kategória-leiratkozás alapján kapuzva. Az azonnali küldések (`emailImmediate`) rögtön renderelnek, és írnak egy `deliveryLogs` sort; egyébként az értesítés függőben marad a lent leírt kötegelt összesítőre. |
| — | **sms** | Nem szint a lépcsőben. Az egyetlen kapuzott SMS-forrás az emlékeztető-motor: ha egy definíció `channels` listája tartalmazza az `sms`-t, a `ReminderEngine.sendSms()` a push/email értesítés **mellett** szöveges üzenetet is küld minden címzettnek (lásd [Szöveges emlékeztetők](#text-reminders)). A tömeges szövegezés (`TextingController` / `@churchapps/texting`), a szolgálati áttekintés **Text Volunteers** művelete (`MatrixTextHelper` → `MessagingModuleGateway.sendPersonText`) és a munkafolyamat **Send Text** lépésművelete (`StepActionHelper.sendText` → `sendPersonText`) mind közvetlenül az egyház szolgáltatóján keresztül küldenek szöveget. Ezekre tehát nem vonatkoznak az értesítési beállítások és a csendes órák; csak a személy `optedOut` jelzőjét veszik figyelembe. |

Az olvasatlan értesítések, amelyek socket vagy push szinten maradtak, a 30 perces időzítő (`NotificationHelper.escalateDelivery`) által kerülnek továbbításra. A kötegelt e-mailt a `NotificationHelper.sendEmailNotifications(frequency)` küldi, amelyet minden személy `emailFrequency` beállítása vezérel: az `individual` a 30 perces időzítőn fut, a `daily` az éjszakai időzítőn. (A `weekly` érvényes beállítási érték, de még nincs hozzá dedikált kötegelt futás.)

## Emlékeztető-motor

Az ütemezett emlékeztetők — eseményemlékeztetők, feladat-határidők, szolgálati és tervhez rendelt emlékeztetők — mind egyetlen általános motoron keresztül futnak, nem pedig funkciónként egyedi cron-logikán.

```
reminderDefinitions ──expand──▶ reminderOccurrences ──scan (30 min)──▶ createNotifications()
     │                                  │                                    │
     ▼                                  ▼                                    ▼
 entity- or scope-level          one row per (definition,              deliveryStartLevel: 1
 offsets/channels/message        entity, occurrence, offset)           + reminderSentLog ledger
```

**Definíciók** (`reminderDefinitions`) lehetnek entitásszintűek (az `entityId` be van állítva — egy konkrét esemény, feladat vagy terv), vagy hatókörszintűek (az `entityId` null, a `scopeId` be van állítva — pl. minden terv egy szolgálati tervtípus alatt). A definíció tartalmaz egy percben megadott eltolások vesszővel elválasztott listáját (`offsets`, pl. `"1440,60"` egy nappal és egy órával korábban), a helyi küldési időt (`sendLocalTime`), a csatornák vesszővel elválasztott listáját (`channels` — az `email` szerepeltetése azonnali, formázott e-mailt vált ki a küldés pillanatában), egy `recipientMode` értéket, és egy opcionális egyéni `message`-et.

**A kibontás** előre, a közelgő időszakra (egy gördülő, több napos ablak) létrehozza a tüzelési sorokat. Az éjszakai időzítőn fut, és szinkron módon minden alkalommal, amikor egy definíciót elmentenek, hogy az utolsó pillanatban létrehozott esemény emlékeztetője is elsüljön. A hatókör-definíciók az adapter `loadScopeEntities` függvényén keresztül szétágaznak, és entitásonként egy előfordulás-készletet hoznak létre. Az entitásszintű előfordulások kulcsa `definitionId:occurrenceISO:offset`, a hatókörös előfordulások pedig entitásazonosítóval kerülnek névtérbe, így sosem ütköznek. Egy előfordulás beszúrása/frissítése **feléleszti** a korábban törölt sort. A törlés, majd újrakibontás a szokásos módja annak, hogy egy emlékeztetőt újraszinkronizáljunk, miután az alapul szolgáló entitás megváltozott. A már `sent`, `failed` vagy `processing` állapotú sorok érintetlenek maradnak.

**A küldés** (`ReminderEngine.scan()`) a 30 perces időzítőn fut. Lefoglalja az esedékes előfordulásokat (egy bérlet megakadályozza a kétszeres feldolgozást), a címzetteket az entitás adapterén keresztül tölti be, kiszűri azokat, akik már szerepelnek a `reminderSentLog` naplóban az adott előfordulásra, és meghívja a `createNotifications` függvényt `deliveryStartLevel: 1` értékkel (ugrás közvetlenül a pushra), valamint `emailImmediate`/`emailByPerson` opciókkal, ha a definíció csatornái között szerepel az e-mail.

### Szöveges emlékeztetők

Ha egy definíció `channels` listája tartalmazza az `sms`-t, a `scan()` a push/email értesítések létrehozása után meghívja a `ReminderEngine.sendSms()` függvényt ugyanazokra a friss címzettekre. A szövegezés tagonként opt-in:

- Minden címzett átmegy a `PreferenceGateHelper.evaluate(..., "sms", ...)` vizsgálaton. Ehhez az `allowSms` értékének be kell lennie kapcsolva (alapértelmezetten ki van, és a B1App **Text messages** kapcsolója állítja), és a kategória `sms` csatornája nem lehet felülírással kikapcsolva. Az `event_reminders`, `serving_schedule` és `tasks` kategóriák mindkét `defaultChannels` és `allowedChannels` listájában szerepeltetik az `sms`-t.
- Akiknek nincs `mobilePhone`-juk, vagy be van állítva az `optedOut`, kimaradnak. Ha az egyháznak nincs szövegezési szolgáltatója, a köteg többi része `no_provider` okkal marad ki.
- A szöveget a `ReminderEngine.smsBody()` építi: `"<Church name>: <message> Reply STOP to opt out."`, egyetlen 160 karakteres szegmensre vágva.
- Minden címzett külön `reminderSentLog` sort kap, `channel: "sms"` értékkel és `sent` / `suppressed` / `failed` állapottal, a push/email sortól függetlenül. Így egy sikertelen szöveg soha nem küldi újra a push-t vagy az e-mailt.

A szerkesztők csak akkor kínálják a **Text** lehetőséget, ha a `GET /messaging/texting/status` végpont `{ enabled: true }` értéket ad vissza (az egyház első szövegezési szolgáltatója engedélyezve van).

**STOP leiratkozás.** A `POST /messaging/texting/inbound/:churchId/:token` egy névtelen webhook, amelyet az egyház beilleszt a szolgáltatójába (a B1Admin a szövegezési beállításokban mutatja az URL-t a `GET /messaging/texting/inboundUrl` végpontból). A token az egyház azonosítójának HMAC-ja (`SmsOptOutHelper.token`). A `SmsOptOutHelper.parse` elfogadja a Twilio-stílusú űrlapmezőket és a Clearstream/TextInChurch-stílusú JSON-t. Ha a válasz pontosan egy vivői leiratkozó szó (`STOP`, `STOPALL`, `UNSUBSCRIBE`, `CANCEL`, `END`, `QUIT`, `OPTOUT`, `REVOKE`), az egyházban lévő, nem eltávolított minden olyan személy, akinek a mobilszáma egyezik, `people.optedOut = true` és `allowSms = false` értéket kap. Más válaszokat nyugtáznak, és figyelmen kívül hagynak.

Egy belső eseménybusz az entitás-módosításokra a nightly kibontás megvárása nélkül reagál: a tartalmi események (a webhook dispatcheren keresztül) és a terv-/feladatfrissítési események azonnali újrakibontást vagy törlést váltanak ki az érintett entitásra. A tervfrissítés pedig a tervtípushoz kötött hatókör-definíciókat is újrakibontja.

### Adapterek

A motor entitásfüggetlen. Minden támogatott entitástípus egy adapteren (`helpers/adapters/`) keresztül kapcsolódik be:

| Entitástípus | Adapter | Megjegyzések |
|--------------|---------|--------------|
| `event` | `EventReminderAdapter` | A címzettek a regisztrálókra vagy csoporttagokra korlátozódnak, az eseménytől és a `recipientMode` értékétől függően. |
| `plan` | `PlanReminderAdapter` | A címzettek a közzétett (nem vázlat) terveken az Accepted + Unconfirmed hozzárendelések. A szolgálati megerősítési munkafolyamaton keresztül kiadott, még meg nem erősített hozzárendeléseket addig kizárjuk, amíg el nem fogadják (lásd lentebb). A `buildEmails` a `DoingModuleGateway.buildPlanReminderEmails` függvényt hívja. Ez a `doing/helpers/PlanReminderEmailHelper` segítségével rendereli a pozíciókat, jegyzeteket és egyéni üzenetet, beleértve a `ReminderTokenHelper` által aláírt Elfogadás/Elutasítás gombokat, amelyek egy nyilvános hozzárendelés-válasz végpontra küldenek. |
| `task` | `TaskReminderAdapter` | A címzettek a feladat felelőse(i). |

### Végpontok

| Metódus | Útvonal | Cél |
|---------|---------|-----|
| `GET` / `POST` | `/messaging/reminders/:entityType/:entityId` | Egy entitás emlékeztető-definíciójának betöltése vagy mentése. |
| `GET` / `POST` | `/messaging/reminders/scope/:entityType/:scopeId` | Hatókörszintű (örökölt) emlékeztető-definíció betöltése vagy mentése. |
| `DELETE` | `/messaging/reminders/:defId` | Definíció törlése, és a függőben lévő előfordulásainak törlése. |
| `GET` | `/messaging/reminders/event/:eventId/preview` | Egy eseményemlékeztető címzettszámának és következő tüzelési időpontjainak előnézete mentés előtt. |
| `GET` | `/messaging/reminders/log` | Egy egyház legutóbbi emlékeztető-előfordulási előzményei. |
| `POST` | `/messaging/reminders/mute` | Emlékeztetők némítása egy adott entitásra. |

Egy definíció mentése szinkron újrakibontást vált ki arra az entitásra vagy hatókörre, így a szerkesztők az éjszakai feladat megvárása nélkül látják a naprakész „következő tüzelések" értékeket.

## Közvetlen üzenetek

A közvetlen üzenetek ugyanazon a csatornán haladnak, mint minden más, nem pedig külön továbbítási úton. Minden olvasatlan beszélgetés kap egy **árnyék sort** a `notifications` táblában (`contentType='privateMessage'`, `contentId` = a privát üzenet azonosítója, `category='direct_messages'`). Ez birtokolja az összes kézbesítési állapotot: socket/push/email továbbítás, olvasási követés, mindent. A `privateMessages` tábla magát az üzenettartalmat és egy `notifyPersonId` oszlopot tárol. Ez utóbbi az olvasatlan jelvény forrása, és törlődik, amikor a címzett elolvassa a beszélgetést.

Az árnyék sorok láthatatlanok az értesítési harangnál: kizárják őket az olvasatlan-számláló lekérdezésből, az értesítéslistából és az olvasottnak jelölés/törlés lekérdezésekből, amelyek mind a `contentType <> 'privateMessage'` feltétellel szűrnek. Minden közvetlen üzenet-jelzés eléri a socketet az olvasatlan állapottól függetlenül (élő csevegési szemantika, nincs deduplikáció). A közvetlen üzenetek soha nem állnak meg socket-kézbesítésnél, ahogy a normál értesítések. Ennek oka, hogy egy háttérben lévő PWA nyitva tarthat socketet, miközben még OS-szintű push-ra van szüksége. Ha valaki elnémítja a közvetlen üzenet-értesítéseket, az árnyék sort félreteszik (`isNew=false`, `notifyPersonId` törölve). A beszélgetésen belül továbbra is látható, de jelvények és riasztások nélkül.

## Beállítások és kapuzás

Minden küldés átmegy a `PreferenceGateHelper.evaluate()` függvényen. Ez tiszta függvény: minden állapot bemenetként érkezik, nincs adatbázis-hívás a kritikus úton. Eredménye `allow`, `suppress` vagy `defer`. A rétegek sorrendben futnak, és az első, amelyik döntést hoz, nyer:

1. **Zárolt kategória** — egyes kategóriák kötelezőek (0. szint), és megkerülik az összes többi réteget.
2. **Főnémítás / csatornaleállítás** — a `masterMute`, `allowPush`, `allowSms` (alapértelmezetten kikapcsolva, a tagok választanak) vagy `emailFrequency='never'` azonnal elnyomja az értesítést.
3. **Csendes órák** — csak push és SMS esetén (az e-mailt nem tekintjük zavarónak). Ha a személy időzónájában az aktuális falióra szerinti idő a csendes ablakába esik, a tranzakciós kategória továbbjut. A nem tranzakciós kategóriát a csendes ablak végéig halasztják, amelyet DST-helyes UTC időpontként számolnak a `TimezoneHelper.wallClockToUtc` segítségével.
4. **Kategóriánkénti beállítás-felülírás** — egy kategória × csatorna pár kifejezett leiratkozása. Hiánya azt jelenti, hogy a kategória alapértelmezését használjuk.
5. **Entitásonkénti némítás** — egy adott entitáshoz (pl. egy esemény, egy terv) rögzített némítás szigorúbb a kategóriaszintű beállításnál. Csak akkor alkalmazandó, ha a hívó az értesítés mellé entitás-azonosítót és -típust is megad.

Érintett táblák: `notificationPreferences` (globális — `masterMute`, `emailFrequency` értéke `individual|daily|weekly|never`, `allowPush`, csendes órák ablaka és időzónája, `allowSms`), `notificationPreferenceOverrides` (kategória × csatorna szerint), és `notificationEntityMutes` (entitásonként).

Ez a kapu érvényesül az alkalmazáson belüli (0. szint), push (1. szint) és e-mail (2. szint) értesítéseknél a csatornán belül, beleértve az azonnali emlékeztető- és összesítő-e-maileket is. Érvényesül a `ReminderEngine.sendSms()` emlékeztető-szövegeknél is. A tranzakciós e-mailek (hitelesítő kódok, jelszó-visszaállítás, meghívók, adományigazolások) szándékosan megkerülik a kaput. Ez a második ajtó lényege.

### Szolgálati megerősítési munkafolyamatok

Egy terv csatlakozhat egy `workflowType = "assignmentConfirmation"` munkafolyamathoz (`plans.confirmationWorkflowId`). Ekkor a Publish/Notify a hozzárendelésenkénti értesítés helyett a `POST /doing/plans/:id/issueRequests` végpontot hívja: minden új, még meg nem erősített hozzárendelés kap egy `notified` jelzőt és `confirmationWorkflowId`-t, valamint egy munkafolyamat-kártyát (`tasks.assignmentId`, egyedi `followupKey`). A kártya csak alkalmazáson belüli riasztást küld (`appOnly: true`, nincs push/email továbbítás), majd lefuttatja a munkafolyamat `sendAssignmentRequest` műveleteit. Ezek a `MessagingModuleGateway.sendServingWorkflowMessage` függvényen mennek át: e-mail a `NotificationHelper.sendWorkflowEmail` függvényen keresztül (preferencia-kapu + `ChurchEmailLimiter`, `workflowEmail` néven mérve), SMS a `sendPersonText` függvényen keresztül, csak ha az `allowSms` és a `serving_schedule` kategória-kapu is engedi. Az Elfogadás/Elutasítás (`assignment.updated` az eseménybuszon) lezárja a kártyát. A 30 perces időzítő (`AssignmentWorkflowHelper.processPending`) pótolja a kimaradt indításokat és eseményeket, és a határidőig válasz nélkül maradt kérést vezetői felülvizsgálati feladattá alakítja. Teljes életciklus: `Api/docs/assignment-confirmation-workflows.md`.

## Egyházi e-mail korlátok

Az olyan e-mailek, amelyek tartalmát egy egyház írta, a közös ChurchApps SES identitásból mennek ki, ezért egyházanként a `Api/src/shared/helpers/ChurchEmailLimiter.ts` méri őket. Négy útvonal hívja: csoport- és sablon-küldések (`EmailTemplateController`, tartalomtípus `email`), űrlap-utánkövetési e-mailek (`FormSubmissionController`, `formFollowUp`), munkafolyamat **Send email** (E-mail küldése) műveletei (`NotificationHelper` a `churchAuthored` opcióval, `workflowEmail`), és a szolgálati megerősítési kérő e-mailek (`NotificationHelper.sendWorkflowEmail`, `workflowEmail`). A rendszerlevelek (hitelesítő kódok, igazolások, emlékeztetők) és a szerep- és csoportmeghívók (`UserController.sendInviteEmail`, fix sablon) nincsenek mérve.

- **Jóváhagyási kapu.** Egy egyház semmit sem küldhet, amíg a szerver adminisztrátora be nem állítja a `churches.emailApprovedDate` mezőt (`POST /membership/churches/:id/emailApproval`, Server Admin → Churches → **Group Email** chip). Az archivált egyházak mindig blokkolva vannak. A B1Admin Send Email párbeszédablaka a `GET /messaging/emailTemplates/sendStatus` végpontot olvassa (`approved`, `paused`, `remaining`, `requested`). Ha nincs jóváhagyva, a szerkesztő helyett egy **Request review** kártyát mutat. A munkafolyamat-lépés szerkesztője ugyanezt a végpontot olvassa (elérhető a `tasks.admin` és a `groupMembers.edit` számára is), és figyelmeztet a **Send email** műveleteknél, ha az egyház nincs jóváhagyva vagy szüneteltetve van. Küldéskor a `MessagingModuleGateway.sendTemplatedEmail` `false` értékkel tér vissza, értesítés létrehozása nélkül, ha a `ChurchEmailLimiter.remaining()` értéke 1 alatt van. Így a kártya előzményei sosem állítják, hogy az **Email sent** (E-mail elküldve) történt, ha a levelet eldobták. A `POST /messaging/emailTemplates/requestApproval` végpont egyházanként hetente legfeljebb egyszer e-mailt küld a támogatásnak.
- **Kiérdemelt keret.** Egy jóváhagyott egyház `max(150, 2 × a legjobb egyházi napja száma az elmúlt 30 napban)` értéket kap, de legfeljebb 2000-et gördülő 24 órában. Az aktuális 24 óra nem számít bele a „legjobb nap" értékbe, így egy kitörés nem emelheti a saját korlátját.
- **Lefoglalás, majd elszámolás.** A `reserve()` küldés előtt minden címzettnek ír egy `deliveryLogs` sort, újraellenőrzi a keretet ezekkel a sorokkal együtt, és visszavon, ha két kérés átlépte a korlátot (a küldés 429-et ad). A `settle()` minden sort elküldöttre vagy sikertelenre állít.
- **Panaszalapú szüneteltetés.** Az `sesFeedback` Lambda (`Api/src/lambda/ses-feedback-handler.ts`, SES → SNS forrásból) minden állandó visszapattanást vagy panaszt ahhoz az egyházhoz rendel, amelynek egyházi e-mailje ahhoz a címhez körülbelül abban az időben eljutott. Ezt `deliveryMethod` `sesBounce` / `sesComplaint` néven tárolja. Egy egyházat 7 nap alatt 2 vagy több panasz (≥ a küldések 0,3%-a) vagy 10 vagy több kemény visszapattanás (≥ 5%) esetén szüneteltetnek.

## Ütemezés

Az emlékeztető-motor és az értesítési összesítő is a meglévő ütemezett időzítőkre épül, nem vezet be új infrastruktúrát:

| Időzítő | Ütemezés | Futtatja |
|---------|----------|----------|
| 30 perces időzítő | 30 percenként | Olvasatlan értesítések továbbítása; `individual` gyakoriságú összesítő e-mailek küldése; esedékes emlékeztető-előfordulások kiküldése (`ReminderEngine.scan`); jóváhagyási összesítők; esedékes automatizálási végrehajtások |
| Éjszakai időzítő | 05:00 UTC | Csoport-jelenléti emlékeztetők; ismétlődő streaming-szolgálatok előrelépése; automatikusan frissülő listák frissítése; emlékeztető-előfordulások kibontása a következő időszakra (`ReminderEngine.expandAll`); `daily` gyakoriságú összesítő e-mailek küldése |

Helyben ugyanez a logika igény szerint is elindítható az `Api` projektből: `npm run timer:30min` és `npm run timer:midnight`.

## Fájllista

| Terület | Fájlok |
|---------|--------|
| Csatorna | `Api/src/modules/messaging/helpers/NotificationHelper.ts`, `PreferenceGateHelper.ts`, `NotificationCategoryHelper.ts`, `WebPushHelper.ts`, `ExpoPushHelper.ts`, `SocketHelper.ts`, `DeliveryHelper.ts` |
| Megosztott belépési pont | `Api/src/shared/helpers/NotificationService.ts` |
| Tranzakciós ajtó | `Api/src/shared/helpers/TransactionalEmailHelper.ts`, lint-szabály: `Api/tools/eslint-rules/email-door.cjs` |
| Egyházi e-mail korlátok | `Api/src/shared/helpers/ChurchEmailLimiter.ts`, `Api/src/lambda/ses-feedback-handler.ts`, `Api/src/modules/messaging/repositories/DeliveryLogRepo.ts` |
| Emlékeztető-motor | `Api/src/modules/messaging/helpers/ReminderEngine.ts`, `ReminderBootstrap.ts`, `helpers/adapters/*`, `controllers/ReminderController.ts` |
| Szövegezés / STOP leiratkozás | `Api/src/modules/messaging/helpers/SmsOptOutHelper.ts`, `controllers/TextingController.ts` (`/status`, `/inboundUrl`, `/inbound/:churchId/:token`), `Api/src/modules/doing/helpers/MatrixTextHelper.ts` (szolgálati áttekintés **Text Volunteers**) |
| Emlékeztető-tárolók | `Api/src/modules/messaging/repositories/ReminderDefinitionRepo.ts`, `ReminderOccurrenceRepo.ts`, `ReminderSentLogRepo.ts` |
| Szolgálati/terv e-mail | `Api/src/modules/doing/helpers/PlanReminderEmailHelper.ts`, `ReminderTokenHelper.ts`, `Api/src/shared/modules/DoingModuleGateway.ts` |
| Emlékeztető-szerkesztők (B1Admin) | `serving/components/PlanTypeReminderEdit.tsx`, `calendars/components/EventReminderEdit.tsx`, `serving/tasks/components/TaskReminderEdit.tsx`, `hooks/useTextingEnabled.ts` |
| Emlékeztető-szerkesztő / beállítások (B1App) | `EventReminderEdit.tsx`, `NotificationPrefsPage.tsx`, `useRealtimeNotifications.ts` |

## Kapcsolódó oldalak

- [Valós idejű architektúra](../realtime.md) — a WebSocket-protokoll és a kliensoldali primitívek (`SocketHelper`, `SubscriptionManager`, `ConversationStore`), amelyekre az alkalmazáson belüli kézbesítési szint épül
- [Web Push értesítések](../web-push.md) — VAPID-beállítás és a böngésző Push API útvonala, amelyet a push-szint használ
- [Üzenetküldési végpontok](../api/endpoints/messaging.md) — a teljes REST-felület az üzenetekhez, beszélgetésekhez, kapcsolatokhoz, valamint az értesítési és emlékeztető-útvonalakhoz
