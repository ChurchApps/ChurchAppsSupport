---
title: "Arhitektura obvestil in opomnikov"
---

# Arhitektura obvestil in opomnikov

<div class="article-intro">

Vsako sporočilo, ki ga član cerkve vidi zunaj strani, na kateri trenutno je — značka s številom, potisno obvestilo, dnevni povzetek po e-pošti — gre skozi enega od dveh vhodov v MessagingApi. Ta stran dokumentira lijak, mehanizem opomnikov, ki ga po urniku napaja, in model nastavitev, ki odloča, kaj dejansko doseže osebo.

</div>

## Pregled — dvoje vrat

```
scheduled anything ──▶ ReminderEngine (definitions → occurrences → scan) ─┐
chat / requests / workflow / bulk sends ──────────────────────────────────┼─▶ createNotifications()
                                                                          │    in_app gate → socket → push → email
     (reminder channels include sms) ──▶ ReminderEngine.sendSms() ──▶ sms gate → sendPersonText() via church provider
provider STOP reply ──▶ POST /messaging/texting/inbound/:churchId/:token ──▶ SmsOptOutHelper.optOut()
account/legal mail ──▶ TransactionalEmailHelper.sendTransactional()  [allowlisted, lint-enforced]
```

1. **Vse, kar osebi kaj sporoča,** gre skozi `NotificationHelper.createNotifications()` v modulu messaging. Shrani vrstico v `notifications` in stopnjuje socket → push → e-pošta, pri čemer za vsak kanal oceni `PreferenceGateHelper` — vključno z `in_app` na ravni 0.
2. **Vse, kar je načrtovano,** je `reminderDefinition` (na ravni entitete ali obsega), razširjen v `reminderOccurrences` in odposlan z `ReminderEngine.scan()` na ponavljajočem se časovniku. Ena razširitev, ena odpošiljatelj, ena evidenca pošiljanj (`reminderSentLog`).
3. **Neposredna e-pošta** obstaja samo prek `TransactionalEmailHelper.sendTransactional()`. Pravilo ESLint to uveljavlja že med prevajanjem — glej spodaj.

:::tip Vrata za e-pošto uveljavlja lint, ne le konvencija
`Api/tools/eslint-rules/email-door.cjs` določa `no-direct-email-helper`: vsak klic `EmailHelper.sendTemplatedEmail()` ali `EmailHelper.sendEmail()` zunaj datotek `NotificationHelper.ts` ali `TransactionalEmailHelper.ts` ne prestane lint. Če morate poslati e-pošto, jo usmerite skozi lijak (`createNotifications` z `emailImmediate`) ali prek `TransactionalEmailHelper.sendTransactional()` — drugega načina, ki bi prestal CI, ni.
:::

## Lijak obvestil

`NotificationHelper.createNotifications()` je edina vstopna točka za vse, kar ni načrtovano ali transakcijsko:

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

Za vsakega prejemnika shrani vrstico v `notifications` in pokliče `attemptDeliveryWithEscalation`, ki preide po spodnji lestvici kanalov. Še neprebrana vrstica za isti `(contentType, contentId)` prepreči ponovno ustvarjenje. Ta zaščita pred podvajanjem se preskoči pri pošiljanjih z `emailImmediate` (zamiki opomnikov, »pošlji e-pošto vsem« za osebje, koraki delovnega toka imajo svojo zaščito) in pri neposrednih sporočilih, ki vedno pošljejo signal prek vtiča (socket).

`shared/helpers/NotificationService.ts` zrcali isti podpis (`NotificationServiceOptions`) za klicatelje zunaj modula messaging in je ob zagonu registriran pri modulu messaging.

## Veriga stopnjevanja kanalov

Dostava se začne na določeni ravni (privzeto 0, ali višji za opomnike ali izrecna pošiljanja) in preide na naslednji kanal samo, če prejšnji ni uspel. Vsaka raven je pred poskusom najprej omejena s `PreferenceGateHelper`.

| Raven | Kanal | Obnašanje |
|-------|-------|-----------|
| 0 | **in_app / socket** | Najprej se preveri vrata `in_app`. Če je obveščanje utišano, se vrstica shrani z `isNew=false` in dostava se popolnoma ustavi — brez signala prek vtiča, brez značke, brez nadaljnjega stopnjevanja. Sicer strežnik poišče odprte povezave vtiča za sobo `alerts` te osebe in pošlje okvir `notification` (ali `privateMessage`). Pri običajnih obvestilih se z uspešno dostavo prek vtiča veriga tukaj ustavi — 30-minutni časovnik pozneje ponovno preveri neprebrane elemente in jih stopnjuje. Neposredna sporočila se pri vtiču nikoli ne ustavijo: nameščena PWA lahko drži vtič za `alerts` odprt v ozadju, kar bi sicer preprečilo potisno obvestilo na ravni operacijskega sistema. |
| 1 | **push** | Omejeno z `allowPush`, odjavo kategorije in tihimi urami. Pošilja tako na Expo potisne žetone kot na naročnine Web Push, ki jih najde v vrsticah `devices` osebe, pri tem pa odstranjuje podvojitve po končni točki in briše zastarele žetone. |
| 2 | **e-pošta** | Omejeno z `emailFrequency` in odjavo kategorije. Takojšnja pošiljanja (`emailImmediate`) se takoj izrišejo in zapišejo vrstico v `deliveryLogs`; sicer obvestilo ostane na čakanju za skupinski dnevni povzetek, opisan spodaj. |
| — | **sms** | Ni raven v verigi stopnjevanja. Edini omejeni proizvajalec SMS-ov je mehanizem opomnikov: kadar kanali definicije vključujejo `sms`, `ReminderEngine.sendSms()` pošlje SMS vsakemu prejemniku **poleg** obvestila po potisku ali e-pošti (glej [Opomniki po SMS-u](#text-reminders)). Množično pošiljanje SMS-ov (`TextingController` / `@churchapps/texting`), ukaz **Pošlji SMS prostovoljcem** v pregledu služenja (`MatrixTextHelper` → `MessagingModuleGateway.sendPersonText`) in korak delovnega toka **Pošlji SMS** (`StepActionHelper.sendText` → `sendPersonText`) vsi pošiljajo neposredno prek ponudnika storitev cerkve. Nastavitve obveščanja in tihe ure zanje ne veljajo — upošteva se samo zastavica `optedOut` osebe. |

Neprebrana obvestila, ki ostanejo na ravni vtiča ali potiska, stopnjuje 30-minutni časovnik (`NotificationHelper.escalateDelivery`). Skupinsko e-pošto pošilja `NotificationHelper.sendEmailNotifications(frequency)`, ki ga poganja nastavitev `emailFrequency` vsake osebe: `individual` teče na 30-minutnem časovniku, `daily` pa ob nočnem časovniku. (`weekly` je veljavna vrednost nastavitve, vendar še nima namenskega skupinskega zagona.)

## Mehanizem opomnikov

Načrtovani opomniki — opomniki za dogodke, roki nalog, opomniki o dodelitvah služenja in načrtov — vsi gredo skozi en posplošen mehanizem, ne pa skozi posebno cron logiko za vsako funkcijo.

```
reminderDefinitions ──expand──▶ reminderOccurrences ──scan (30 min)──▶ createNotifications()
     │                                  │                                    │
     ▼                                  ▼                                    ▼
 entity- or scope-level          one row per (definition,              deliveryStartLevel: 1
 offsets/channels/message        entity, occurrence, offset)           + reminderSentLog ledger
```

**Definicije** (`reminderDefinitions`) so bodisi na ravni entitete (`entityId` nastavljen — določen dogodek, naloga ali načrt) bodisi na ravni obsega (`entityId` null, `scopeId` nastavljen — npr. vsi načrti pod eno vrsto načrta za služenje). Definicija vsebuje CSV minutnih zamikov (`offsets`, npr. `"1440,60"` za en dan in eno uro pred dogodkom), lokalni čas pošiljanja (`sendLocalTime`), CSV kanalov (`channels` — vključno z `email`, ki ob času pošiljanja sproži takojšnjo bogato oblikovano e-pošto), `recipientMode` in neobvezno prilagojeno `message`.

**Razširitev** izdela vrstice sprožitev za prihajajoče obdobje (drseče okno več dni). Izvede se ob nočnem časovniku in sinhrono vsakič, ko je definicija shranjena, da opomnik za dogodek, ki je tik pred začetkom, vseeno sproži. Definicije obsega se razširijo prek adapterjevega `loadScopeEntities` in ustvarijo po en niz pojavitev za vsako konkretno entiteto. Pojavitve na ravni entitete uporabljajo ključ `definitionId:occurrenceISO:offset`, pojavitve z obsegom pa imenski prostor po id-ju entitete, zato se nikoli ne križajo. Vstavljanje pojavitve **obudi** predhodno preklicano vrstico — preklic in nato ponovna razširitev je standardni način za ponovno uskladitev opomnika po spremembi entitete. Vrstice, ki so že `sent`, `failed` ali `processing`, ostanejo nedotaknjene.

**Odpošiljanje** (`ReminderEngine.scan()`) teče na 30-minutnem časovniku. Prevzame zapadle pojavitve (zakup preprečuje dvojno obdelavo), prejemnike naloži prek adapterja entitete, odfiltrira vse, ki so že zabeleženi v `reminderSentLog` za to pojavitev, in pokliče `createNotifications` z `deliveryStartLevel: 1` (takoj na potisk) ter `emailImmediate`/`emailByPerson`, kadar kanali definicije vključujejo e-pošto.

### Opomniki po SMS-u

Kadar kanali definicije vključujejo `sms`, `scan()` po ustvarjenju obvestil za potisk in e-pošto pokliče `ReminderEngine.sendSms()` za iste sveže prejemnike. Pošiljanje SMS-ov je izbirno za vsakega člana:

- Vsak prejemnik gre skozi `PreferenceGateHelper.evaluate(..., "sms", ...)`, zato mora biti `allowSms` vklopljen (privzeto izklopljen; nastavi ga stikalo **Besedilna sporočila** v B1App) in kanal `sms` kategorije ne sme biti s prilagoditvijo izklopljen. `event_reminders`, `serving_schedule` in `tasks` navajajo `sms` tako v `defaultChannels` kot v `allowedChannels`.
- Osebe brez `mobilePhone` ali z nastavljenim `optedOut` se izpustijo. Če cerkev nima ponudnika SMS-ov, se preostanek paketa izpusti z razlogom `no_provider`.
- Vsebino sestavi `ReminderEngine.smsBody()` v obliki `"<Church name>: <message> Reply STOP to opt out."`, skrajšano na en segment 160 znakov.
- Vsak prejemnik dobi svojo vrstico v `reminderSentLog` s `channel: "sms"` in statusom `sent` / `suppressed` / `failed`, ločeno od vrstice za potisk ali e-pošto. Neuspešen SMS tako nikoli ne ponovi potiska ali e-pošte.

Urejevalniki ponudijo **SMS** samo, če `GET /messaging/texting/status` vrne `{ enabled: true }` (prvi ponudnik SMS-ov cerkve je omogočen).

**Odjava z STOP.** `POST /messaging/texting/inbound/:churchId/:token` je anonimni webhook, ki ga cerkev prilepi v svojega ponudnika (B1Admin prikaže URL iz `GET /messaging/texting/inboundUrl` v nastavitvah SMS-ov). Žeton je HMAC id-ja cerkve (`SmsOptOutHelper.token`). `SmsOptOutHelper.parse` sprejema polja v obliki Twilio in JSON v obliki Clearstream/TextInChurch. Če je odgovor natanko ena od stop besed operaterja (`STOP`, `STOPALL`, `UNSUBSCRIBE`, `CANCEL`, `END`, `QUIT`, `OPTOUT`, `REVOKE`), vsaka neodstranjena oseba v cerkvi, katere mobilna številka se ujema, dobi `people.optedOut = true` in `allowSms = false`. Drugi odgovori se potrdijo in ignorirajo.

Notranji dogodkovni vodilnik se odziva na spremembe entitet, ne da bi čakal na nočno razširitev: dogodki vsebine (prek dispečerja webhookov) ter dogodki posodobitve načrta in naloge sprožijo takojšnjo ponovno razširitev ali preklic za prizadeto entiteto. Posodobitev načrta pa tudi ponovno razširi definicije obsega, vezane na njegovo vrsto načrta.

### Adapterji

Mehanizem ni odvisen od entitet. Vsaka podprta vrsta entitete se priključi prek adapterja (`helpers/adapters/`):

| Vrsta entitete | Adapter | Opombe |
|----------------|---------|--------|
| `event` | `EventReminderAdapter` | Prejemniki so omejeni na prijavljene ali člane skupine, odvisno od dogodka in `recipientMode`. |
| `plan` | `PlanReminderAdapter` | Prejemniki so sprejete in nepotrjene dodelitve na objavljenih (ne-osnutek) načrtih. Nepotrjene dodelitve, izdane prek delovnega toka potrjevanja služenja, so izključene, dokler niso sprejete (glej spodaj). `buildEmails` kliče `DoingModuleGateway.buildPlanReminderEmails`, ki prek `doing/helpers/PlanReminderEmailHelper` izriše položaje, opombe in prilagojeno sporočilo, vključno z gumboma Sprejmi in Zavrni, podpisanima z `ReminderTokenHelper`, ki pošiljata na javno končno točko za odziv na dodelitev. |
| `task` | `TaskReminderAdapter` | Prejemniki so izvajalci naloge. |

### Končne točke

| Metoda | Pot | Namen |
|--------|-----|-------|
| `GET` / `POST` | `/messaging/reminders/:entityType/:entityId` | Naloži ali shrani definicijo opomnika za eno entiteto. |
| `GET` / `POST` | `/messaging/reminders/scope/:entityType/:scopeId` | Naloži ali shrani podedovano definicijo opomnika na ravni obsega. |
| `DELETE` | `/messaging/reminders/:defId` | Izbriše definicijo in prekliče njene čakajoče pojavitve. |
| `GET` | `/messaging/reminders/event/:eventId/preview` | Pred shranjevanjem prikaže število prejemnikov in naslednje čase sprožitve opomnika za dogodek. |
| `GET` | `/messaging/reminders/log` | Nedavna zgodovina pojavitev opomnikov za cerkev. |
| `POST` | `/messaging/reminders/mute` | Utiša opomnike za določeno entiteto. |

Shranjevanje definicije sproži sinhrono ponovno razširitev za entiteto ali obseg, da urejevalci vidijo posodobljene »naslednje sprožitve« brez čakanja na nočno opravilo.

## Neposredna sporočila

Neposredna sporočila gredo po istem lijaku kot vse ostalo, ne po ločeni poti stopnjevanja. Vsak neprebran pogovor dobi eno **senčno vrstico** v `notifications` (`contentType='privateMessage'`, `contentId` = id zasebnega sporočila, `category='direct_messages'`), ki poseduje vse stanje dostave — stopnjevanje prek vtiča, potiska in e-pošte, sledenje branju, vse. Tabela `privateMessages` sama hrani vsebino sporočila in stolpec `notifyPersonId`, ki je vir značke neprebranih in se počisti, ko prejemnik prebere pogovor.

Senčne vrstice so nevidne v zvončku obvestil: izključene so iz poizvedbe števila neprebranih, poizvedbe seznama obvestil ter poizvedb za označevanje kot prebrano in brisanje, ki vse filtrirajo `contentType <> 'privateMessage'`. Vsak signal za neposredno sporočilo zadane vtič ne glede na stanje branja (semantika žive klepetalnice — brez deduplikacije). Neposredna sporočila se nikoli ne ustavijo pri dostavi prek vtiča, kot to počnejo običajna obvestila, saj lahko PWA v ozadju drži odprt vtič, a še vedno potrebuje potisk na ravni operacijskega sistema. Če oseba utiša obvestila za neposredna sporočila, se senčna vrstica zaustavi (`isNew=false`, `notifyPersonId` se počisti). Še vedno je vidna znotraj samega pogovora, vendar brez značk in opozoril.

## Nastavitve in omejevanje

Vsako pošiljanje gre skozi `PreferenceGateHelper.evaluate()`, čisto funkcijo (vsa stanja so podana vnaprej, brez klicev baze na vročem poti), ki vrne `allow`, `suppress` ali `defer`. Plasti se izvedejo po vrsti, prva, ki odloči, zmaga:

1. **Zaklenjena kategorija** — nekatere kategorije so obvezne (raven 0) in obidejo vse ostale plasti.
2. **Glavni izklop in izklop kanala** — `masterMute`, `allowPush`, `allowSms` (privzeto izklopljeno — člani se vključijo sami) ali `emailFrequency='never'` nepogojno potisnejo.
3. **Tihe ure** — samo potisk in SMS (e-pošta velja za nemoteče). Če trenutni stenski čas v časovnem pasu osebe pade v njeno tiho okno, transakcijska kategorija še vedno pride skozi. Netransakcijska se odloži na konec tihega okna, izračunanega kot trenutek UTC, pravilen glede na prehode poletnega časa, prek `TimezoneHelper.wallClockToUtc`.
4. **Prilagoditev nastavitve po kategoriji** — izrecna odjava za par kategorija × kanal. Odsotnost pomeni privzeto vrednost kategorije.
5. **Utišanje po entiteti** — utišanje, zabeleženo za določeno entiteto (npr. en dogodek, en načrt), omeji bolj kot nastavitev na ravni kategorije. Velja pa samo, če klicatelj obvestilu priloži id in tip entitete.

Vključene tabele: `notificationPreferences` (globalno — `masterMute`, `emailFrequency` z vrednostmi `individual|daily|weekly|never`, `allowPush`, okno tihih ur in časovni pas, `allowSms`), `notificationPreferenceOverrides` (po kategoriji × kanalu) in `notificationEntityMutes` (po entiteti).

Ta omejitev velja za obveščanje v aplikaciji (raven 0), potisk (raven 1) in e-pošto (raven 2) znotraj lijaka — vključno s takojšnjimi opomniki in dnevnimi povzetki — ter za besedila opomnikov v `ReminderEngine.sendSms()`. Transakcijska e-pošta (kode za prijavo, ponastavitve gesel, vabila, potrdila o donacijah) je po zasnovi izvzeta; to je prav namen drugih vrat.

### Potrditveni delovni tokovi za služenje

Načrt se lahko odloči za delovni tok `workflowType = "assignmentConfirmation"` (`plans.confirmationWorkflowId`). Objava in obvestilo nato kličeta `POST /doing/plans/:id/issueRequests` namesto obvestila za posamezno dodelitev: vsaka nova nepotrjena dodelitev dobi `notified` in `confirmationWorkflowId` ter eno kartico delovnega toka (`tasks.assignmentId`, enolični `followupKey`). Kartica pošlje opozorilo samo v aplikaciji (`appOnly: true` — brez stopnjevanja na potisk ali e-pošto), nato pa izvede akcije `sendAssignmentRequest` delovnega toka, ki gredo prek `MessagingModuleGateway.sendServingWorkflowMessage`: e-pošta prek `NotificationHelper.sendWorkflowEmail` (vrata nastavitev in `ChurchEmailLimiter`, merjeno kot `workflowEmail`), SMS prek `sendPersonText` samo z `allowSms` in vrati kategorije `serving_schedule`. Sprejem ali zavrnitev (`assignment.updated` na dogodkovnem vodilniku) zapre kartico. 30-minutni časovnik (`AssignmentWorkflowHelper.processPending`) popravi zamujene začetke in dogodke ter neodgovorjeno zahtevo ob roku za nadaljevanje spremeni v nalogo pregleda za vodjo. Celoten življenjski cikel je opisan v `Api/docs/assignment-confirmation-workflows.md`.

## Omejitve e-pošte, ki jo napiše cerkev

E-pošta, katere vsebino je napisala cerkev, gre iz skupne identitete ChurchApps SES, zato jo `Api/src/shared/helpers/ChurchEmailLimiter.ts` meri po cerkvi. Štiri poti ga kličejo: pošiljanja skupinam in predlogam (`EmailTemplateController`, tip vsebine `email`), nadaljevalna e-pošta za obrazce (`FormSubmissionController`, `formFollowUp`), akcije delovnega toka **Pošlji e-pošto** (`NotificationHelper` z `churchAuthored`, `workflowEmail`) in e-poštna sporočila za potrditev služenja (`NotificationHelper.sendWorkflowEmail`, `workflowEmail`). Sistemska pošta (kode za prijavo, potrdila, opomniki) ter vabila za vloge in skupine (`UserController.sendInviteEmail`, fiksna predloga) se ne merijo.

- **Odobritveni prag.** Cerkev ne pošlje ničesar, dokler strežniški administrator ne nastavi `churches.emailApprovedDate` (`POST /membership/churches/:id/emailApproval`, Server Admin → Churches → čip **Group Email**). Arhivirane cerkve so vedno blokirane. Pogovorno okno B1Admin za pošiljanje e-pošte prebere `GET /messaging/emailTemplates/sendStatus` (`approved`, `paused`, `remaining`, `requested`) in, če ni odobreno, prikaže kartico **Zahtevaj pregled** namesto urejevalnika. Urejevalnik korakov delovnega toka prebere isto končno točko (dostopna je tudi `tasks.admin` poleg `groupMembers.edit`), da opozori pri akcijah **Pošlji e-pošto**, kadar cerkev ni odobrena ali je začasno ustavljena. Ob pošiljanju `MessagingModuleGateway.sendTemplatedEmail` vrne `false` brez ustvarjanja obvestila, kadar je `ChurchEmailLimiter.remaining()` manjši od 1. Zgodovina kartice tako nikoli ne trdi **E-pošta poslana** za pošto, ki je bila zavržena. `POST /messaging/emailTemplates/requestApproval` pošlje e-pošto podpori, največ enkrat na teden na cerkev.
- **Pridobljena kvota.** Odobrena cerkev dobi `max(150, 2 × njen najboljši dan e-pošte, ki jo je napisala cerkev, v prejšnjih 30 dneh)`, omejeno na 2.000 na drseča 24 ur. Trenutnih 24 ur je izključenih iz »najboljšega dne«, da se nalet ne more sam dvigniti na lastno mejo.
- **Rezerviraj, nato poravnaj.** `reserve()` pred pošiljanjem zapiše eno vrstico `deliveryLogs` na prejemnika, znova preveri kvoto s temi vrsticami in se umakne, če sta dve zahtevi hkrati prekoračili mejo (pošiljanje vrne 429). `settle()` označi vsako vrstico kot poslano ali neuspešno.
- **Začasna ustavitev zaradi pritožb.** Lambda `sesFeedback` (`Api/src/lambda/ses-feedback-handler.ts`, napaja jo SES → SNS) pripiše vsak trajni odboj ali pritožbo cerkvi, katere e-pošta, napisana s strani cerkve, je dosegla ta naslov približno v tistem času. Shranjeno je kot `deliveryMethod` `sesBounce` ali `sesComplaint`. Cerkev se začasno ustavi pri dvema ali več pritožbah (≥ 0,3 % pošiljanj) ali desetih ali več trdih odbojih (≥ 5 %) v 7 dneh.

## Načrtovanje

Mehanizem opomnikov in digest obvestil se priključita obstoječim načrtovanim časovnikom, namesto da bi uvajala novo infrastrukturo:

| Časovnik | Urnik | Izvede |
|----------|-------|--------|
| 30-minutni časovnik | vsakih 30 minut | Stopnjuje neprebrana obvestila; pošlje digest e-pošto s frekvenco `individual`; odpošlje zapadle pojavitve opomnikov (`ReminderEngine.scan`); odobritveni povzetki; zapadle izvedbe avtomatizacije |
| Nočni časovnik | 05:00 UTC | Opomniki o skupinskem obiskovanju; napreduje ponavljajoče se pretočne storitve; osveži samodejno osveževane sezname; razširi pojavitve opomnikov za naslednje obdobje (`ReminderEngine.expandAll`); pošlje digest e-pošto s frekvenco `daily` |

Lokalno se ista logika lahko sproži na zahtevo z `npm run timer:30min` in `npm run timer:midnight` iz projekta `Api`.

## Seznam datotek

| Področje | Datoteke |
|----------|----------|
| Lijak | `Api/src/modules/messaging/helpers/NotificationHelper.ts`, `PreferenceGateHelper.ts`, `NotificationCategoryHelper.ts`, `WebPushHelper.ts`, `ExpoPushHelper.ts`, `SocketHelper.ts`, `DeliveryHelper.ts` |
| Skupna vstopna točka | `Api/src/shared/helpers/NotificationService.ts` |
| Vrata za transakcijsko pošto | `Api/src/shared/helpers/TransactionalEmailHelper.ts`, pravilo lint `Api/tools/eslint-rules/email-door.cjs` |
| Omejitve e-pošte cerkve | `Api/src/shared/helpers/ChurchEmailLimiter.ts`, `Api/src/lambda/ses-feedback-handler.ts`, `Api/src/modules/messaging/repositories/DeliveryLogRepo.ts` |
| Mehanizem opomnikov | `Api/src/modules/messaging/helpers/ReminderEngine.ts`, `ReminderBootstrap.ts`, `helpers/adapters/*`, `controllers/ReminderController.ts` |
| SMS in odjava STOP | `Api/src/modules/messaging/helpers/SmsOptOutHelper.ts`, `controllers/TextingController.ts` (`/status`, `/inboundUrl`, `/inbound/:churchId/:token`), `Api/src/modules/doing/helpers/MatrixTextHelper.ts` (pregled služenja **Pošlji SMS prostovoljcem**) |
| Repozitoriji opomnikov | `Api/src/modules/messaging/repositories/ReminderDefinitionRepo.ts`, `ReminderOccurrenceRepo.ts`, `ReminderSentLogRepo.ts` |
| E-pošta za služenje in načrte | `Api/src/modules/doing/helpers/PlanReminderEmailHelper.ts`, `ReminderTokenHelper.ts`, `Api/src/shared/modules/DoingModuleGateway.ts` |
| Urejevalniki opomnikov (B1Admin) | `serving/components/PlanTypeReminderEdit.tsx`, `calendars/components/EventReminderEdit.tsx`, `serving/tasks/components/TaskReminderEdit.tsx`, `hooks/useTextingEnabled.ts` |
| Urejevalnik opomnikov in nastavitve (B1App) | `EventReminderEdit.tsx`, `NotificationPrefsPage.tsx`, `useRealtimeNotifications.ts` |

## Sorodne strani

- [Arhitektura v realnem času](../realtime) — protokol WebSocket in odjemalski gradniki (`SocketHelper`, `SubscriptionManager`, `ConversationStore`), na katere se opira raven dostave v aplikaciji
- [Spletna potisna obvestila](../web-push) — nastavitev VAPID in pot brskalniškega Push API, ki jo uporablja raven potiska
- [Končne točke sporočanja](../api/endpoints/messaging) — celoten REST vmesnik za sporočila, pogovore, povezave ter poti za obvestila in opomnike
