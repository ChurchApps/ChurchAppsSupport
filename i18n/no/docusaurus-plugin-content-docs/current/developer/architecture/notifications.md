---
title: "Varsler og påminnelser arkitektur"
---

# Varsler og påminnelser arkitektur

<div class="article-intro">

Hver melding en kirke medlem ser utenfor siden de ser på — en badge antall, en push varsling, en oppsummerings e-post — pass gjennom en av to dører i MessagingApi. Denne siden dokumenterer trakten, påminning motoren som fôrer det på en plan, og preferanse modellen som bestemmer hva som faktisk når en person.

</div>

## Oversikt — to dører

```
planlagte noe ──▶ ReminderEngine (definisjoner → forekomster → skann) ─┐
chat / forespørsler / arbeidsflyt / masse send ──────────────────────────┼─▶ createNotifications()
                                                                          │    i_app port → socket → push → e-post (→ sms slot)
konto/juridisk post ──▶ TransactionalEmailHelper.sendTransactional()  [allowlisted, lint-enforced]
```

1. **Alt som forteller en person noe** går gjennom `NotificationHelper.createNotifications()` i messaging modulen. Det vedvarer en `notifications` rad og eskalerer socket → push → e-post, evaluering `PreferenceGateHelper` per kanal — inkludert `in_app` på nivå 0.
2. **Alt planlagt** er en `reminderDefinition` (entitet-nivå eller omfang-nivå) utvidelse inn i `reminderOccurrences` og sendt av `ReminderEngine.scan()` på en gjentakende timer. En utvidelse, en dispatcher, en send ledger (`reminderSentLog`).
3. **Direkte e-post** eksisterer bare bak `TransactionalEmailHelper.sendTransactional()`. En ESLint regel håndhever dette ved kompilering — se nedenfor.

:::tip E-post dør er lint-håndhevet, ikke bare konvensjon
`Api/tools/eslint-rules/email-door.cjs` definerer `no-direct-email-helper`: noe kall til `EmailHelper.sendTemplatedEmail()` eller `EmailHelper.sendEmail()` utenfor `NotificationHelper.ts` eller `TransactionalEmailHelper.ts` mislykkes lint. Hvis du trenger å sende en e-post, rute det gjennom trakten (`createNotifications` med `emailImmediate`) eller gjennom `TransactionalEmailHelper.sendTransactional()` — det er nei tredje måte som går CI.
:::

## Varslets trakt

`NotificationHelper.createNotifications()` er den eneste innsettepunkt for noe som ikke er planlagt eller transaksjonelt:

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
    deliveryStartLevel?: number;      // 0 socket (standard), 1 push, 2 e-post-bare
    category?: string;                // preferanse akse; utledet fra contentType hvis utelatt
    emailByPerson?: Record<string, { subject: string; html: string }>;
    emailImmediate?: boolean;         // send e-post nå i stedet for å vente på oppsummering
  }
)
```

For hver mottaker det lagrer en rad i `notifications` og kaller `attemptDeliveryWithEscalation`, som går kanal stigen nedenfor. En fortsatt-ulest rad for samme `(contentType, contentId)` undertrykker gjenopprettelse — denne dedup vakt blir hoppet for `emailImmediate` send (påminning kompensasjoner, stab "e-post alle", arbeidsflyt trinn eier sin egen dedup) og for direkte meldinger, som alltid ping socket.

`shared/helpers/NotificationService.ts` speil samme signatur (`NotificationServiceOptions`) for innringere utenfor messaging modulen og er registrert med messaging modulen på oppstart.

## Kanal eskalering kjede

Leveringen starter på ett nivå (0 som standard, eller høyere for påminnelser/eksplisitt send) og bare fortsetter til neste kanal hvis forrige en ikke lyktes. Hver nivå blir port av `PreferenceGateHelper` før noe som helst blir forsøkt.

| Nivå | Kanal | Oppførsel |
|-------|---------|----------|
| 0 | **i_app / socket** | `i_app` porta er sjekket først. Hvis undertrykket (stille), raden blir vedvarende med `isNew=false` og leveringen stopper helt — nei socket ping, nei badge, nei videre eskalering. Ellers serveren slår opp åpne socket koblingene for personen sin `alerts` rom og push en `notification` (eller `privateMessage`) ramme. For vanlig varsler, en vellykket socket leveringen stopp kjeden her — 30-minutters timer re-sjekk ulest gjenstander og eskalerer dem senere. Direkte meldinger aldri stopp på socket: en installert PWA kan holde alerts socket åpen i bakgrunnen, som ellers ville undertrykke OS-nivå push. |
| 1 | **push** | Port på `allowPush` / kategori opt-out / stille timer. Sender til både Expo push tokens og Web Push abonnement funnet på personen sin `devices` rader, dedup av endepunkt og pruning stale tokens sammen veien. |
| 2 | **e-post** | Port på `emailFrequency` og kategori opt-out. Umiddelbar send (`emailImmediate`) gjengiver rett vekk og skrive en `deliveryLogs` rad; ellers varslingen blir igjen ventende for parti oppsummering, beskrevet nedenfor. |
| — | **sms** | Preferanse røret (`allowSms`, per-kategori kanal lister) allerede konto for en SMS kanal, men nei produsent sender gjennom det i dag — det blive reservert for masse SMS produkt, som kjør som en separat, siloed flyt via `TextingController` / `@churchapps/texting`. |

Ulest varsler igjen på socket eller push blir eskalert av 30-minutters timer (`NotificationHelper.escalateDelivery`). Partie e-post blir sendt av `NotificationHelper.sendEmailNotifications(frequency)`, drevet av hver person sin `emailFrequency` preferanse: `individual` kjør på 30-minutters timer, `daily` kjør på nattlig timer. (`weekly` er en gyldig preferanse verdi men har nei dedikert parti kjør ennå.)

## Påminning motor

Planlagte påminnelser — arrangement påminnelser, oppgave forfallstider, tjeneste/plan oppgave påminnelser — alle går gjennom en generalisert motor snarere enn spesialisert per-funksjon cron logikk.

```
reminderDefinitions ──utvidelse──▶ reminderOccurrences ──skann (30 min)──▶ createNotifications()
     │                                  │                                    │
     ▼                                  ▼                                    ▼
 entitet- eller omfang-nivå      ein rad per (definisjon,             deliveryStartLevel: 1
 kompensasjoner/kanaler/melding  entitet, forekomst, kompensasjon)    + reminderSentLog ledger
```

**Definisjoner** (`reminderDefinitions`) er enten entitet-nivå (`entityId` satt — ett spesifikk arrangement, oppgave, eller plan) eller omfang-nivå (`entityId` null, `scopeId` satt — f.eks. hver plan under ein tjeneste plan type). En definisjon bærer ein CSV av minutt kompensasjoner (`offsets`, f.eks. `"1440,60"` for ein dag og ein time før), en lokal send tid (`sendLocalTime`), en CSV av kanaler (`channels` — inkludert `email` trigger ein umiddelbar rik e-post på send tid), ein `recipientMode`, og ein valgfri egne `message`.

**Utvidelse** materiale ild rader for horisonten foran (ein rullende multi-dags vindu). Det kjør på nattlig timer, og synkront når ein definisjon blir lagret så ein påminning for ein siste-minutt arrangement fortsatt fyr. Omfang definisjoner fan ut via adapter `loadScopeEntities`, produsere ein forekomst sett per betong entitet; entitet-nivå forekomster bruk nøkkelen `definitionId:occurrenceISO:offset`, mens omfang forekomster namespace etter entitet id så de aldri kolliderer. Upsert ein forekomst **oppstår** en tidligere-avbrutt rad — avbryt-så-re-utvidelse er standard måte å re-synkroniser ein påminning etter den underliggende entitet endringer; rader allerede `sent`, `failed`, eller `processing` blir igjen urørt.

**Dispatch** (`ReminderEngine.scan()`) kjør på 30-minutters timer. Det krav forfallet forekomster (ein lease forhindrer dobbel-behandling), laste mottakere gjennom entiteten adapter, filter ut noen allerede registrert i `reminderSentLog` for den forekomst, og kall `createNotifications` med `deliveryStartLevel: 1` (hopp rett til push) pluss `emailImmediate`/`emailByPerson` når definisjon kanaler inkludert e-post.

Ein intern hendelse buss reagerer til entitet mutasjoner uten å vente på nattlig utvidelse: innhold hendelser (via webhook dispatcher) og plan/oppgave oppdater hendelser trigger umiddelbar re-utvidelse eller avbrytelse for den påvirket entitet, og en plan oppdater også re-utvidelse noe som helst omfang definisjoner bund til sin plan type.

### Adaptere

Motoren er entitet-agnostisk; hver støttet entitet type koble seg inn gjennom ein adapter (`helpers/adapters/`):

| Entitet type | Adapter | Noter |
|-------------|---------|-------|
| `event` | `EventReminderAdapter` | Mottakere omfattet til registranter eller gruppe medlemmer avhengig av arrangement og `recipientMode`. |
| `plan` | `PlanReminderAdapter` | Mottakere er Akseptert + Ubekreftet plan oppgaver. `buildEmails` kall inn i `DoingModuleGateway.buildPlanReminderEmails`, som gjengivelse posisjoner, noter, og ein egne melding via `doing/helpers/PlanReminderEmailHelper`, inkludert Aksepter/Avslå knapper signert av `ReminderTokenHelper` som post til ein offentlig oppgave-respons endepunkt. |
| `task` | `TaskReminderAdapter` | Mottakere er oppgaven sin tildelte. |

### Endepunkter

| Metode | Sti | Formål |
|--------|------|---------|
| `GET` / `POST` | `/messaging/reminders/:entityType/:entityId` | Last eller lagre påminning definisjon for ein entitet. |
| `GET` / `POST` | `/messaging/reminders/scope/:entityType/:scopeId` | Last eller lagre ein omfang-nivå (arvet) påminning definisjon. |
| `DELETE` | `/messaging/reminders/:defId` | Slett ein definisjon og avbryt sin ventende forekomster. |
| `GET` | `/messaging/reminders/event/:eventId/preview` | Forhandvis mottaker antall og neste ild tider for ein arrangement påminning før lagring. |
| `GET` | `/messaging/reminders/log` | Nylig påminning forekomst historie for ein kirke. |
| `POST` | `/messaging/reminders/mute` | Stilne påminnelser for ein spesifikk entitet. |

Lagring ein definisjon trigger ein synkron re-utvidelse for den entitet eller omfang, så redaktøren ser oppdatert "neste ild" uten å vente på nattlig jobb.

## Direkte meldinger

Direkte meldinger rir samme trakt som alt annet snarere enn ein separat eskalering sti. Hver ulest samtale få ein **skygge rad** i `notifications` (`contentType='privateMessage'`, `contentId` = den privat melding id, `category='direct_messages'`) som eier alle leveringen tilstand — socket/push/e-post eskalering, les sporing, alt. `privateMessages` tabellen selv holder melding last og ein `notifyPersonId` kolonne, som er kilden til ulest badge og få klar når mottaker les samtalen.

Skygge rader er usynlig til varsling bjelle: de bli ekskludert fra ulest antall forespørsel, varsling liste forespørsel, og mark-les/slett forespørsel, alle som filter `contentType <> 'privateMessage'`. Hver DM ping hit socket uavhengig av ulest tilstand (live chat semantikk — nei dedup), og DM aldri stopp på socket leveringen måten vanlig varsler gjør, siden ein backgrounded PWA kan holde socket åpen mens fortsatt trenge ein OS-nivå push. Hvis ein person stilne DM varsler, skygge rad bli parkert (`isNew=false`, `notifyPersonId` klar) — fortsatt synlig innsiden samtalen selv, bare uten badger eller varsler.

## Preferanser og porta

Hver send pass gjennom `PreferenceGateHelper.evaluate()`, ein ren funksjon (all tilstand sendt in, nei DB kall på varm sti) som returnerer `allow`, `suppress`, eller `defer`. Laget kjør i rekkefølge, og det første som bestemmer vin:

1. **Låst kategori** — noen kategorier er obligatorisk (nivå 0) og omgå hver annen lag.
2. **Meister stilne / kanal drep** — `masterMute`, `allowPush`, `allowSms`, eller `emailFrequency='never'` undertrykk direkte.
3. **Stille timer** — push og SMS bare (e-post blir vurdert non-intrusive). Hvis nåværende vegg-klokke tid i personen sin tidssone fall inn i deres stille vindu, ein transaksjonell kategori fortsatt får gjennom; ein ikke-transaksjonell blir utsatt til slutt av stille vindu, beregnet som ein DST-riktig UTC øyeblikk via `TimezoneHelper.wallClockToUtc`.
4. **Per-kategori preferanse overstyring** — ein eksplisitt opt-out for ein kategori × kanal par; fraværelse betyr kategori standard.
5. **Per-entitet stilne** — ein stilne registrert mot ein spesifikk entitet (f.eks. ein arrangement, ein plan) begrenser videre enn kategori-nivå innstilling, men bare påfør når innringer leverer ein entitet id/type ved siden av varslingen.

Tabeller involvert: `notificationPreferences` (global — `masterMute`, `emailFrequency` av `individual|daily|weekly|never`, `allowPush`, stille-timer vindu + tidssone, `allowSms`), `notificationPreferenceOverrides` (per kategori × kanal), og `notificationEntityMutes` (per entitet).

Denne porta er håndhevet for i-app (nivå 0), push (nivå 1), og e-post (nivå 2) innsiden trakten — inkludert umiddelbar påminning/oppsummering e-poster. Transaksjonell e-post (auth koder, passord omstilling, inviterer, donasjon kvitteringer) omgå det ved design; det er hele poenget med den andre dør.

## Tidsplanlegging

Både påminning motoren og varsling oppsummering rir eksisterende planlagte timer snarere enn å innføre ny infrastruktur:

| Timer | Plan | Kjør |
|-------|----------|------|
| 30-minutters timer | hver 30 minutt | Eskalerer ulest varsler; send `individual`-frekvens oppsummering e-poster; dispatch forfallet påminning forekomster (`ReminderEngine.scan`); godkjenning oppsummeringer; på grunn av automatisering utføringer |
| Nattlig timer | 05:00 UTC | Gruppe oppmøte påminnelser; fremskridt gjentakende streaming tjenester; frisk auto-oppfrisk lister; utvidelse påminning forekomster for neste horisont (`ReminderEngine.expandAll`); send `daily`-frekvens oppsummering e-poster |

Lokalt, samme logikk kan triggere på etterspørsel med `npm run timer:30min` og `npm run timer:midnight` fra `Api` prosjekt.

## Filbeholdning

| Område | Filer |
|------|-------|
| Trakt | `Api/src/modules/messaging/helpers/NotificationHelper.ts`, `PreferenceGateHelper.ts`, `NotificationCategoryHelper.ts`, `WebPushHelper.ts`, `ExpoPushHelper.ts`, `SocketHelper.ts`, `DeliveryHelper.ts` |
| Delt innsettepunkt | `Api/src/shared/helpers/NotificationService.ts` |
| Transaksjonell dør | `Api/src/shared/helpers/TransactionalEmailHelper.ts`, lint regel `Api/tools/eslint-rules/email-door.cjs` |
| Påminning motor | `Api/src/modules/messaging/helpers/ReminderEngine.ts`, `ReminderBootstrap.ts`, `helpers/adapters/*`, `controllers/ReminderController.ts` |
| Påminning depoter | `Api/src/modules/messaging/repositories/ReminderDefinitionRepo.ts`, `ReminderOccurrenceRepo.ts`, `ReminderSentLogRepo.ts` |
| Tjeneste/plan e-post | `Api/src/modules/doing/helpers/PlanReminderEmailHelper.ts`, `ReminderTokenHelper.ts`, `Api/src/shared/modules/DoingModuleGateway.ts` |
| Påminning redaktører (B1Admin) | `serving/components/PlanTypeReminderEdit.tsx`, `calendars/components/EventReminderEdit.tsx`, `serving/tasks/components/TaskReminderEdit.tsx` |
| Påminning redaktør / preferanser (B1App) | `EventReminderEdit.tsx`, `NotificationPrefsPage.tsx`, `useRealtimeNotifications.ts` |

## Relaterte sider

- [Realtids arkitektur](../realtime) — WebSocket protokoll og klient primitiver (`SocketHelper`, `SubscriptionManager`, `ConversationStore`) som i-app leveringen nivå rir på
- [Nett push varsler](../web-push) — VAPID oppsett og nettleser Push API sti brukt av push eskalering nivå
- [Messaging endepunkter](../api/endpoints/messaging) — full REST flate for meldinger, samtaler, koblingene, og varslings/påminnings rutene
