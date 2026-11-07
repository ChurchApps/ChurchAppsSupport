---
title: "Architectuur van meldingen en herinneringen"
description: "Hoe de B1 Admin API meldingen, geplande herinneringen, e-maillimieten van kerken en sms-afmeldingen via één bezorgtrechter en voorkeurscontrole routeert."
---

# Architectuur van meldingen en herinneringen

<div class="article-intro">

Elk bericht dat een kerklid ziet buiten de pagina die hij of zij bekijkt, zoals een badge-teller, een pushmelding of een samenvattingsmail, passeert een van de twee ingangen in de MessagingApi. Deze pagina beschrijft die trechter, de herinneringsengine die er volgens een schema gegevens in aanlevert, en het voorkeursmodel dat bepaalt wat een persoon daadwerkelijk bereikt.

</div>

## Overzicht — twee deuren

```
scheduled anything ──▶ ReminderEngine (definitions → occurrences → scan) ─┐
chat / requests / workflow / bulk sends ──────────────────────────────────┼─▶ createNotifications()
                                                                          │    in_app gate → socket → push → email
     (reminder channels include sms) ──▶ ReminderEngine.sendSms() ──▶ sms gate → sendPersonText() via church provider
provider STOP reply ──▶ POST /messaging/texting/inbound/:churchId/:token ──▶ SmsOptOutHelper.optOut()
account/legal mail ──▶ TransactionalEmailHelper.sendTransactional()  [allowlisted, lint-enforced]
```

1. **Alles wat een persoon iets vertelt** loopt via `NotificationHelper.createNotifications()` in de messaging-module. Het slaat een rij in `notifications` op en escaleert van socket naar push naar e-mail. Per kanaal wordt `PreferenceGateHelper` geëvalueerd, ook `in_app` op niveau 0.
2. **Alles wat gepland is** is een `reminderDefinition` (op entiteitsniveau of scopeniveau). Die wordt uitgewerkt tot `reminderOccurrences` en door `ReminderEngine.scan()` op een terugkerende timer verzonden. Eén uitwerker, één verzender en één verzendlogboek (`reminderSentLog`).
3. **Directe e-mail** bestaat alleen achter `TransactionalEmailHelper.sendTransactional()`. Een ESLint-regel handhaaft dit tijdens het compileren, zie hieronder.

:::tip De e-maildeur wordt door lint afgedwongen, niet alleen door afspraak
`Api/tools/eslint-rules/email-door.cjs` definieert `no-direct-email-helper`: elke aanroep van `EmailHelper.sendTemplatedEmail()` of `EmailHelper.sendEmail()` buiten `NotificationHelper.ts` of `TransactionalEmailHelper.ts` laat lint falen. Als je een e-mail wilt versturen, stuur die via de trechter (`createNotifications` met `emailImmediate`) of via `TransactionalEmailHelper.sendTransactional()`. Er is geen derde weg die de CI doorstaat.
:::

## De meldingstrechter

`NotificationHelper.createNotifications()` is het enige toegangspunt voor alles wat niet gepland of transactioneel is:

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

Voor elke ontvanger slaat het een rij op in `notifications` en roept het `attemptDeliveryWithEscalation` aan, dat de kanaalladder hieronder doorloopt. Een nog ongelezen rij voor dezelfde `(contentType, contentId)` voorkomt dat er opnieuw een melding wordt aangemaakt. Deze dedup-controle wordt overgeslagen voor `emailImmediate`-verzendingen (herinneringsoffsets, e-mail aan iedereen vanuit de staf, workflowstappen die hun eigen dedup beheren) en voor directe berichten, die altijd de socket aanspreken.

`shared/helpers/NotificationService.ts` spiegelt dezelfde signatuur (`NotificationServiceOptions`) voor aanroepers buiten de messaging-module. Het wordt bij het opstarten bij de messaging-module geregistreerd.

## Kanaalescalatieketen

Levering start op een niveau (standaard 0, of hoger voor herinneringen en expliciete verzendingen) en gaat alleen door naar het volgende kanaal als het vorige niet is gelukt. Elk niveau wordt door `PreferenceGateHelper` gefilterd voordat er iets wordt geprobeerd.

| Niveau | Kanaal | Gedrag |
|-------|---------|----------|
| 0 | **in_app / socket** | De `in_app`-filter wordt eerst gecontroleerd. Als die onderdrukt is (gedempt), wordt de rij opgeslagen met `isNew=false` en stopt de levering volledig: geen socket-ping, geen badge en geen verdere escalatie. Anders zoekt de server open socketverbindingen voor de `alerts`-room van de persoon en stuurt een `notification`- (of `privateMessage`-)frame. Bij gewone meldingen stopt een geslaagde socketlevering de keten hier. De timer van 30 minuten controleert ongelezen items later opnieuw en escaleert ze. Directe berichten stoppen nooit bij socket: een geïnstalleerde PWA kan de alerts-socket op de achtergrond open houden, waardoor de pushmelding op OS-niveau anders zou worden onderdrukt. |
| 1 | **push** | Afhankelijk van `allowPush`, opt-out per categorie en stille uren. Verzendt naar zowel Expo-pushtokens als Web Push-abonnementen in de `devices`-rijen van de persoon. Dubbele endpoints worden overgeslagen en verlopen tokens worden onderweg verwijderd. |
| 2 | **e-mail** | Afhankelijk van `emailFrequency` en opt-out per categorie. Directe verzendingen (`emailImmediate`) worden meteen gerenderd en schrijven een rij in `deliveryLogs`. Anders blijft de melding in behandeling voor de batchsamenvatting hieronder. |
| — | **sms** | Geen niveau in de escalatieladder. De enige gefilterde sms-producent is de herinneringsengine: wanneer de `channels` van een definitie `sms` bevatten, stuurt `ReminderEngine.sendSms()` elke ontvanger een sms **naast** de push- of e-mailmelding (zie [Tekstherinneringen](#text-reminders)). Bulk-sms (`TextingController` / `@churchapps/texting`), de actie **Vrijwilligers sms'en** in het serving-overzicht (`MatrixTextHelper` → `MessagingModuleGateway.sendPersonText`) en de workflowactie **Tekst versturen** (`StepActionHelper.sendText` → `sendPersonText`) sturen allemaal rechtstreeks via de sms-provider van de kerk. Meldingsvoorkeuren en stille uren gelden daarom niet voor deze berichten. Alleen de `optedOut`-vlag van de persoon wordt gerespecteerd. |

Ongelezen meldingen die op socket of push zijn blijven hangen, worden door de timer van 30 minuten geëscaleerd (`NotificationHelper.escalateDelivery`). Batch-e-mail wordt verzonden door `NotificationHelper.sendEmailNotifications(frequency)`, aangestuurd door de `emailFrequency`-voorkeur van elke persoon. `individual` draait op de timer van 30 minuten en `daily` draait op de nachtelijke timer. (`weekly` is een geldige voorkeurswaarde, maar heeft nog geen eigen batchrun.)

## Herinneringsengine

Geplande herinneringen, zoals evenementherinneringen, vervaldatums van taken en herinneringen voor serving- en planningstoewijzingen, gaan allemaal via één algemene engine. Er is geen aparte cron-logica per functie.

```
reminderDefinitions ──expand──▶ reminderOccurrences ──scan (30 min)──▶ createNotifications()
     │                                  │                                    │
     ▼                                  ▼                                    ▼
 entity- or scope-level          one row per (definition,              deliveryStartLevel: 1
 offsets/channels/message        entity, occurrence, offset)           + reminderSentLog ledger
```

**Definities** (`reminderDefinitions`) zijn op entiteitsniveau (`entityId` ingesteld, een specifiek evenement, taak of plan) of op scopeniveau (`entityId` null, `scopeId` ingesteld, bijvoorbeeld elk plan onder een serving-plantype). Een definitie bevat een CSV van minuutoffsets (`offsets`, bijvoorbeeld `"1440,60"` voor één dag en één uur eerder), een lokale verzendtijd (`sendLocalTime`), een CSV van kanalen (`channels`, waarbij `email` op het verzendmoment direct een uitgebreide e-mail verstuurt), een `recipientMode` en een optioneel eigen `message`.

**Uitwerking** materialiseert verzendrijen voor de komende periode, een lopend venster van meerdere dagen. Dit draait op de nachtelijke timer en synchroon telkens wanneer een definitie wordt opgeslagen, zodat ook een herinnering voor een last-minute-evenement wordt verzonden. Scopedefinities worden uitgespreid via de `loadScopeEntities` van de adapter, waarbij per concrete entiteit één set voorkomens ontstaat. Voorkomens op entiteitsniveau gebruiken de sleutel `definitionId:occurrenceISO:offset`. Voorkomens binnen een scope gebruiken het entiteits-id als namespace, zodat ze nooit botsen. Een voorkomen opnieuw activeren (upsert) herstelt een eerder geannuleerde rij. Annuleren en daarna opnieuw uitwerken is de standaardmanier om een herinnering opnieuw te synchroniseren nadat de onderliggende entiteit is gewijzigd. Rijen die al `sent`, `failed` of `processing` zijn, blijven onaangeroerd.

**Verzending** (`ReminderEngine.scan()`) draait op de timer van 30 minuten. Het claimt vervallen voorkomens (een lease voorkomt dubbele verwerking), laadt de ontvangers via de adapter van de entiteit en filtert iedereen eruit die al in `reminderSentLog` voor dat voorkomen staat. Daarna roept het `createNotifications` aan met `deliveryStartLevel: 1` (direct naar push), plus `emailImmediate` en `emailByPerson` wanneer de kanalen van de definitie e-mail bevatten.

### Tekstherinneringen

Wanneer de `channels` van een definitie `sms` bevatten, roept `scan()` `ReminderEngine.sendSms()` aan nadat de push- en e-mailmeldingen zijn aangemaakt, voor dezelfde nieuwe ontvangers. Tekstberichten zijn per lid opt-in:

- Elke ontvanger doorloopt `PreferenceGateHelper.evaluate(..., "sms", ...)`. Daarom moet `allowSms` aan staan. Die staat standaard uit en wordt ingesteld via de schakelaar **Tekstberichten** in B1App. Ook mag het `sms`-kanaal van de categorie niet expliciet uit staan. `event_reminders`, `serving_schedule` en `tasks` vermelden `sms` zowel in `defaultChannels` als in `allowedChannels`.
- Personen zonder `mobilePhone` of met `optedOut` worden overgeslagen. Als de kerk geen sms-provider heeft, wordt de rest van de batch overgeslagen met reden `no_provider`.
- De tekst wordt opgebouwd door `ReminderEngine.smsBody()`: `"<Church name>: <message> Reply STOP to opt out."`, ingekort tot één segment van 160 tekens.
- Elke ontvanger krijgt een eigen rij in `reminderSentLog` met `channel: "sms"` en status `sent`, `suppressed` of `failed`. Die rij is apart gesleuteld van de push- en e-mailrij, zodat een mislukte sms nooit de push of e-mail opnieuw verstuurt.

Bewerkers tonen **Tekst** alleen wanneer `GET /messaging/texting/status` `{ enabled: true }` teruggeeft. Dat betekent dat de eerste sms-provider van de kerk is ingeschakeld.

**STOP-afmelding.** `POST /messaging/texting/inbound/:churchId/:token` is een anoniem webhook dat de kerk in haar provider plakt. B1Admin toont de URL uit `GET /messaging/texting/inboundUrl` in de sms-instellingen. Het token is een HMAC van het kerk-id (`SmsOptOutHelper.token`). `SmsOptOutHelper.parse` accepteert Twilio-achtige formuliervelden en Clearstream- of TextInChurch-achtige JSON. Als het antwoord precies een carrier-stopwoord is (`STOP`, `STOPALL`, `UNSUBSCRIBE`, `CANCEL`, `END`, `QUIT`, `OPTOUT`, `REVOKE`), krijgt elke niet-verwijderde persoon in de kerk wiens mobiele nummer overeenkomt `people.optedOut = true` en `allowSms = false`. Andere antwoorden krijgen een bevestiging en worden genegeerd.

Een interne event-bus reageert op wijzigingen van entiteiten zonder op de nachtelijke uitwerking te wachten. Content-events (via de webhook-dispatcher) en plan- en taakupdate-events leiden tot directe herwerking of annulering voor de betreffende entiteit. Een planupdate herwerkt bovendien de scopedefinities die aan het plantype van dat plan zijn gekoppeld.

### Adapters

De engine is niet gebonden aan één entiteitstype. Elk ondersteund type sluit aan via een adapter (`helpers/adapters/`):

| Entiteitstype | Adapter | Opmerkingen |
|-------------|---------|-------|
| `event` | `EventReminderAdapter` | Ontvangers zijn beperkt tot aanmelders of groepsleden, afhankelijk van het evenement en `recipientMode`. |
| `plan` | `PlanReminderAdapter` | Ontvangers zijn Geaccepteerde en Onbevestigde toewijzingen op gepubliceerde (niet-concept) plannen. Onbevestigde toewijzingen die via een serving-bevestigingsworkflow zijn uitgegeven, worden uitgesloten tot ze zijn geaccepteerd (zie hieronder). `buildEmails` roept `DoingModuleGateway.buildPlanReminderEmails` aan. Die rendert posities, notities en een eigen bericht via `doing/helpers/PlanReminderEmailHelper`, inclusief knoppen Accepteren en Weigeren. Die knoppen zijn ondertekend door `ReminderTokenHelper` en sturen gegevens naar een openbaar eindpunt voor reacties op toewijzingen. |
| `task` | `TaskReminderAdapter` | Ontvangers zijn de toegewezen personen van de taak. |

### Eindpunten

| Methode | Pad | Doel |
|--------|------|---------|
| `GET` / `POST` | `/messaging/reminders/:entityType/:entityId` | De herinneringsdefinitie voor één entiteit laden of opslaan. |
| `GET` / `POST` | `/messaging/reminders/scope/:entityType/:scopeId` | Een herinneringsdefinitie op scopeniveau (geërfd) laden of opslaan. |
| `DELETE` | `/messaging/reminders/:defId` | Een definitie verwijderen en de wachtende voorkomens annuleren. |
| `GET` | `/messaging/reminders/event/:eventId/preview` | Het aantal ontvangers en de volgende verzendmomenten voor een evenementherinnering bekijken vóór het opslaan. |
| `GET` | `/messaging/reminders/log` | Recente geschiedenis van herinneringsvoorkomens voor een kerk. |
| `POST` | `/messaging/reminders/mute` | Herinneringen voor een specifieke entiteit dempen. |

Het opslaan van een definitie activeert een synchrone herwerking voor die entiteit of scope. Bewerkers zien daardoor direct de actuele volgende verzendmomenten, zonder op de nachtelijke taak te wachten.

## Directe berichten

Directe berichten volgen dezelfde trechter als al het andere, in plaats van een apart escalatiepad. Elk ongelezen gesprek krijgt één **shadow row** (schaduwrij) in `notifications` (`contentType='privateMessage'`, `contentId` = het id van het privébericht, `category='direct_messages'`). Die rij beheert alle leveringsstatus: socket-, push- en e-mailescalatie, leesregistratie, alles. De tabel `privateMessages` bewaart de berichtinhoud en een kolom `notifyPersonId`. Die kolom is de bron van de ongelezen-badge en wordt gewist zodra de ontvanger het gesprek leest.

Schaduwrijen zijn onzichtbaar voor de meldingenbel. Ze zijn uitgesloten van de query voor het aantal ongelezen, van de meldingenlijst en van de queries voor markeren als gelezen en verwijderen. Al die queries filteren op `contentType <> 'privateMessage'`. Elke DM-ping raakt de socket, ongeacht de leesstatus. Dat is live-chatgedrag, zonder dedup. DM's stoppen nooit bij socketlevering zoals gewone meldingen, omdat een PWA op de achtergrond een socket open kan houden terwijl er nog steeds een pushmelding op OS-niveau nodig is. Als iemand DM-meldingen dempt, wordt de schaduwrij geparkeerd (`isNew=false`, `notifyPersonId` gewist). Het bericht blijft dan zichtbaar binnen het gesprek zelf, maar zonder badges of waarschuwingen.

## Voorkeuren en filtering

Elke verzending passeert `PreferenceGateHelper.evaluate()`. Dat is een pure functie: alle benodigde status wordt meegegeven en er zijn geen databaseaanroepen op het kritieke pad. De functie geeft `allow`, `suppress` of `defer` terug. De lagen worden in volgorde doorlopen en de eerste laag die beslist, wint:

1. **Vergrendelde categorie.** Sommige categorieën zijn verplicht (tier 0) en omzeilen alle andere lagen.
2. **Algemene demping en kanaal uit.** `masterMute`, `allowPush`, `allowSms` (standaard uit, leden kiezen er zelf voor) of `emailFrequency='never'` onderdrukken een melding direct.
3. **Stille uren.** Alleen van toepassing op push en sms, want e-mail wordt als niet-storend beschouwd. Valt de huidige lokale tijd van de persoon in het stille venster, dan komt een transactionele categorie nog steeds door. Een niet-transactionele melding wordt uitgesteld tot het einde van het stille venster. Dat moment wordt als DST-correct UTC-tijdstip berekend via `TimezoneHelper.wallClockToUtc`.
4. **Voorkeuroverschrijving per categorie.** Een expliciete opt-out voor één combinatie van categorie en kanaal. Als die ontbreekt, geldt de standaard van de categorie.
5. **Demping per entiteit.** Een demping die op een specifieke entiteit is vastgelegd, bijvoorbeeld één evenement of één plan, beperkt verder dan de instelling op categorieniveau. Dit geldt alleen als de aanroeper bij de melding ook een entiteits-id en -type meegeeft.

Betrokken tabellen zijn `notificationPreferences` (globaal: `masterMute`, `emailFrequency` met `individual|daily|weekly|never`, `allowPush`, het venster voor stille uren met tijdzone en `allowSms`), `notificationPreferenceOverrides` (per categorie en kanaal) en `notificationEntityMutes` (per entiteit).

Deze filter wordt binnen de trechter afgedwongen voor in-app (niveau 0), push (niveau 1) en e-mail (niveau 2). Dat geldt ook voor directe herinnerings- en samenvattingsmails. Voor herinneringssms'en wordt hij afgedwongen in `ReminderEngine.sendSms()`. Transactionele e-mail (authenticatiecodes, wachtwoordresets, uitnodigingen, donatiebewijzen) omzeilt de filter bewust. Dat is precies het doel van de tweede deur.

### Serving-bevestigingsworkflows

Een plan kan kiezen voor een workflow met `workflowType = "assignmentConfirmation"` (`plans.confirmationWorkflowId`). Dan roept Publiceren en Melden `POST /doing/plans/:id/issueRequests` aan, in plaats van de melding per toewijzing. Elke nieuwe onbevestigde toewijzing krijgt `notified` en `confirmationWorkflowId`, plus één workflowkaart (`tasks.assignmentId`, uniek `followupKey`). De kaart verstuurt een melding die alleen in de app zichtbaar is (`appOnly: true`, dus geen escalatie naar push of e-mail). Daarna voert hij de acties `sendAssignmentRequest` van de workflow uit. Die lopen via `MessagingModuleGateway.sendServingWorkflowMessage`: e-mail via `NotificationHelper.sendWorkflowEmail` (voorkeurfilter en `ChurchEmailLimiter`, gemeten als `workflowEmail`) en sms via `sendPersonText`, alleen met `allowSms` en de categoriefilter `serving_schedule`. Accepteren of Weigeren (`assignment.updated` op de event-bus) sluit de kaart. De timer van 30 minuten (`AssignmentWorkflowHelper.processPending`) herstelt gemiste starts en gebeurtenissen. Een verzoek zonder antwoord wordt op de opvolgdeadline omgezet in een beoordelingstaak voor de leider. De volledige levenscyclus staat in `Api/docs/assignment-confirmation-workflows.md`.

## E-maillimieten voor door de kerk opgestelde e-mail

E-mail waarvan de inhoud door een kerk is geschreven, gaat uit via de gedeelde ChurchApps SES-identiteit. Daarom wordt die per kerk gemeten door `Api/src/shared/helpers/ChurchEmailLimiter.ts`. Vier paden roepen die limiter aan: groeps- en sjabloonverzendingen (`EmailTemplateController`, inhoudstype `email`), vervolgmails na formulieren (`FormSubmissionController`, `formFollowUp`), workflowacties **E-mail versturen** (`NotificationHelper` met `churchAuthored`, `workflowEmail`) en e-mails met serving-bevestigingsverzoeken (`NotificationHelper.sendWorkflowEmail`, `workflowEmail`). Systeemmail (authenticatiecodes, bewijzen, herinneringen) en uitnodigingen voor rollen en groepen (`UserController.sendInviteEmail`, een vaste sjabloon) worden niet gemeten.

- **Goedkeuringspoort.** Een kerk verstuurt niets totdat een serverbeheerder `churches.emailApprovedDate` instelt (`POST /membership/churches/:id/emailApproval`, Server Admin → Churches → chip **Groeps-e-mail**). Gearchiveerde kerken worden altijd geblokkeerd. Het dialoogvenster Send Email in B1Admin leest `GET /messaging/emailTemplates/sendStatus` (`approved`, `paused`, `remaining`, `requested`). Bij een kerk die nog niet is goedgekeurd, toont het een kaart **Beoordeling aanvragen** in plaats van de editor. De workflowstapeditor leest hetzelfde eindpunt, toegankelijk voor `tasks.admin` naast `groupMembers.edit`. Die waarschuwt bij acties **E-mail versturen** als de kerk niet is goedgekeurd of gepauzeerd is. Bij het verzenden geeft `MessagingModuleGateway.sendTemplatedEmail` `false` terug zonder een melding aan te maken als `ChurchEmailLimiter.remaining()` lager is dan 1. Zo beweert de geschiedenis van de kaart nooit **E-mail verzonden** voor mail die is weggevallen. `POST /messaging/emailTemplates/requestApproval` stuurt support een e-mail, maximaal één keer per kerk per week.
- **Verdiend tegoed.** Een goedgekeurde kerk krijgt `max(150, 2 × haar beste dag met door de kerk geschreven e-mail in de afgelopen 30 dagen)`, met een maximum van 2.000 per voortschrijdende 24 uur. De huidige 24 uur telt niet mee bij de "beste dag", zodat een piek zijn eigen limiet niet kan verhogen.
- **Reserveren, dan afhandelen.** `reserve()` schrijft vóór het verzenden één rij in `deliveryLogs` per ontvanger. Daarna controleert het het tegoed opnieuw, met die rijen meegeteld. Als twee verzoeken de limiet tegelijk zijn gepasseerd, trekt het de reservering terug en geeft de verzending 429 terug. `settle()` markeert elke rij als verzonden of mislukt.
- **Klachtenpauze.** De Lambda `sesFeedback` (`Api/src/lambda/ses-feedback-handler.ts`, gevoed door SES → SNS) koppelt elke permanente bounce of klacht aan de kerk wier door de kerk geschreven e-mail rond die tijd dat adres bereikte. Die koppeling wordt opgeslagen als `deliveryMethod` `sesBounce` of `sesComplaint`. Een kerk wordt gepauzeerd bij 2 of meer klachten (≥ 0,3% van de verzendingen) of 10 of meer harde bounces (≥ 5%) binnen 7 dagen.

## Planning

De herinneringsengine en de meldingssamenvatting draaien op bestaande geplande timers. Er wordt geen nieuwe infrastructuur voor geïntroduceerd:

| Timer | Schema | Draait |
|-------|----------|-------|
| Timer van 30 minuten | elke 30 minuten | Ongelezen meldingen escaleren; samenvattingsmails met frequentie `individual` versturen; vervallen herinneringsvoorkomens verzenden (`ReminderEngine.scan`); goedkeuringssamenvattingen; vervallen automatiseringsuitvoeringen |
| Nachtelijke timer | 05:00 UTC | Herinneringen voor groepsaanwezigheid; terugkerende streamingdiensten doorschuiven; automatisch te vernieuwen lijsten verversen; herinneringsvoorkomens voor de volgende periode uitwerken (`ReminderEngine.expandAll`); samenvattingsmails met frequentie `daily` versturen |

Lokaal kan dezelfde logica op verzoek worden gestart met `npm run timer:30min` en `npm run timer:midnight` vanuit het `Api`-project.

## Bestandsoverzicht

| Gebied | Bestanden |
|------|------|
| Trechter | `Api/src/modules/messaging/helpers/NotificationHelper.ts`, `PreferenceGateHelper.ts`, `NotificationCategoryHelper.ts`, `WebPushHelper.ts`, `ExpoPushHelper.ts`, `SocketHelper.ts`, `DeliveryHelper.ts` |
| Gedeeld toegangspunt | `Api/src/shared/helpers/NotificationService.ts` |
| Transactionele deur | `Api/src/shared/helpers/TransactionalEmailHelper.ts`, lintregel `Api/tools/eslint-rules/email-door.cjs` |
| E-maillimieten kerk | `Api/src/shared/helpers/ChurchEmailLimiter.ts`, `Api/src/lambda/ses-feedback-handler.ts`, `Api/src/modules/messaging/repositories/DeliveryLogRepo.ts` |
| Herinneringsengine | `Api/src/modules/messaging/helpers/ReminderEngine.ts`, `ReminderBootstrap.ts`, `helpers/adapters/*`, `controllers/ReminderController.ts` |
| Sms / STOP-afmelding | `Api/src/modules/messaging/helpers/SmsOptOutHelper.ts`, `controllers/TextingController.ts` (`/status`, `/inboundUrl`, `/inbound/:churchId/:token`), `Api/src/modules/doing/helpers/MatrixTextHelper.ts` (serving-overzicht **Vrijwilligers sms'en**) |
| Herinneringsrepositories | `Api/src/modules/messaging/repositories/ReminderDefinitionRepo.ts`, `ReminderOccurrenceRepo.ts`, `ReminderSentLogRepo.ts` |
| Serving- en plan-e-mail | `Api/src/modules/doing/helpers/PlanReminderEmailHelper.ts`, `ReminderTokenHelper.ts`, `Api/src/shared/modules/DoingModuleGateway.ts` |
| Herinneringseditors (B1Admin) | `serving/components/PlanTypeReminderEdit.tsx`, `calendars/components/EventReminderEdit.tsx`, `serving/tasks/components/TaskReminderEdit.tsx`, `hooks/useTextingEnabled.ts` |
| Herinneringseditor en voorkeuren (B1App) | `EventReminderEdit.tsx`, `NotificationPrefsPage.tsx`, `useRealtimeNotifications.ts` |

## Gerelateerde pagina's

- [Realtime-architectuur](../realtime.md): het WebSocket-protocol en de clientprimitieven (`SocketHelper`, `SubscriptionManager`, `ConversationStore`) waarop het in-app-leveringsniveau steunt
- [Web Push-meldingen](../web-push.md): VAPID-instelling en het pad van de browser-Push-API dat het push-escalatieniveau gebruikt
- [Messaging-eindpunten](../api/endpoints/messaging.md): het volledige REST-oppervlak voor berichten, gesprekken, verbindingen en routes voor meldingen en herinneringen
