---
title: "Arhitectura notificărilor și a memento-urilor"
description: "Cum direcționează API-ul B1 Admin notificările, reamintirile programate, limitele de e-mail ale bisericii și dezabonările de mesaje text printr-un singur canal de livrare și o poartă de preferințe."
---

# Arhitectura notificărilor și a memento-urilor

<div class="article-intro">

Fiecare mesaj pe care un membru al bisericii îl vede în afara paginii pe care o privește — un contor de insigne, o notificare push, un e-mail de rezumat — trece printr-una din cele două uși din MessagingApi. Această pagină documentează această cale, motorul de memento-uri care o alimentează conform unui program și modelul de preferințe care decide ce ajunge efectiv la o persoană.

</div>

## Prezentare generală — două uși

```
scheduled anything ──▶ ReminderEngine (definitions → occurrences → scan) ─┐
chat / requests / workflow / bulk sends ──────────────────────────────────┼─▶ createNotifications()
                                                                          │    in_app gate → socket → push → email
     (reminder channels include sms) ──▶ ReminderEngine.sendSms() ──▶ sms gate → sendPersonText() via church provider
provider STOP reply ──▶ POST /messaging/texting/inbound/:churchId/:token ──▶ SmsOptOutHelper.optOut()
account/legal mail ──▶ TransactionalEmailHelper.sendTransactional()  [allowlisted, lint-enforced]
```

1. **Orice care transmite unei persoane o informație** trece prin `NotificationHelper.createNotifications()` din modulul de mesagerie. Salvează un rând în `notifications` și escaladează de la socket → push → e-mail, evaluând `PreferenceGateHelper` pentru fiecare canal — inclusiv `in_app` la nivelul 0.
2. **Orice programat** este o `reminderDefinition` (la nivel de entitate sau de domeniu), extinsă în `reminderOccurrences` și expediată de `ReminderEngine.scan()` printr-un cronometru recurent. Un singur extinzător, un singur expeditor, un singur registru de trimiteri (`reminderSentLog`).
3. **E-mailul direct** există doar prin `TransactionalEmailHelper.sendTransactional()`. O regulă ESLint impune acest lucru la compilare — vezi mai jos.

:::tip Ușa e-mailului este impusă de linter, nu doar o convenție
`Api/tools/eslint-rules/email-door.cjs` definește `no-direct-email-helper`: orice apel la `EmailHelper.sendTemplatedEmail()` sau `EmailHelper.sendEmail()` în afara fișierelor `NotificationHelper.ts` sau `TransactionalEmailHelper.ts` eșuează la verificarea linterului. Dacă trebuie să trimiți un e-mail, direcționează-l prin canalul principal (`createNotifications` cu `emailImmediate`) sau prin `TransactionalEmailHelper.sendTransactional()` — nu există o a treia cale care să treacă CI.
:::

## Canalul principal al notificărilor

`NotificationHelper.createNotifications()` este singurul punct de intrare pentru orice nu este programat sau tranzacțional:

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

Pentru fiecare destinatar salvează un rând în `notifications` și apelează `attemptDeliveryWithEscalation`, care parcurge scara de canale de mai jos. Un rând încă necitit pentru aceeași pereche `(contentType, contentId)` împiedică recrearea — această verificare de deduplicare este omisă pentru trimiterile `emailImmediate` (decalajele memento-urilor, „trimite e-mail tuturor” de la personal, pașii de flux de lucru care își gestionează propria deduplicare) și pentru mesajele directe, care trimit întotdeauna un semnal prin socket.

`shared/helpers/NotificationService.ts` reproduce aceeași semnătură (`NotificationServiceOptions`) pentru apelanții din afara modulului de mesagerie și este înregistrat la modulul de mesagerie la pornire.

## Lanțul de escaladare a canalelor

Livrarea începe de la un nivel (0 implicit, sau mai mare pentru memento-uri/trimiteri explicite) și trece la canalul următor doar dacă cel anterior nu a reușit. Fiecare nivel este filtrat de `PreferenceGateHelper` înainte de a încerca orice.

| Nivel | Canal | Comportament |
|-------|-------|--------------|
| 0 | **in_app / socket** | Mai întâi se verifică filtrul `in_app`. Dacă este suprimat (silențios), rândul este salvat cu `isNew=false` și livrarea se oprește complet — fără semnal prin socket, fără insignă, fără escaladare ulterioară. În caz contrar, serverul caută conexiunile socket deschise pentru camera `alerts` a persoanei și trimite un cadru `notification` (sau `privateMessage`). Pentru notificările obișnuite, o livrare reușită prin socket oprește lanțul aici — cronometrul de 30 de minute reverifică elementele necitite și le escaladează ulterior. Mesajele directe nu se opresc niciodată la socket: o PWA instalată poate menține socketul de alerte deschis în fundal, ceea ce ar suprima altfel notificarea push la nivelul sistemului de operare. |
| 1 | **push** | Filtrat după `allowPush` / dezabonarea din categorie / orele de liniște. Trimite atât către tokenurile push Expo, cât și către abonamentele Web Push găsite în rândurile `devices` ale persoanei, eliminând duplicatele după endpoint și curățând tokenurile vechi pe parcurs. |
| 2 | **e-mail** | Filtrat după `emailFrequency` și dezabonarea din categorie. Trimiterile imediate (`emailImmediate`) sunt generate imediat și scriu un rând în `deliveryLogs`; în caz contrar, notificarea rămâne în așteptare pentru rezumatul în lot, descris mai jos. |
| — | **sms** | Nu este un nivel în scara de escaladare. Singurul producător de SMS filtrat este motorul de memento-uri: când `channels` dintr-o definiție include `sms`, `ReminderEngine.sendSms()` trimite un mesaj text fiecărui destinatar **pe lângă** notificarea push/e-mail (vezi [Memento-uri prin text](#text-reminders)). Trimiterea în masă de mesaje text (`TextingController` / `@churchapps/texting`), acțiunea **Trimite text voluntarilor** din prezentarea generală a serviciilor (`MatrixTextHelper` → `MessagingModuleGateway.sendPersonText`) și acțiunea de pas de flux de lucru **Trimite text** (`StepActionHelper.sendText` → `sendPersonText`) trimit toate mesaje text direct prin furnizorul bisericii, astfel că preferințele de notificare și orele de liniște nu li se aplică — este respectat doar indicatorul `optedOut` al persoanei. |

Notificările necitite rămase la socket sau push sunt escaladate de cronometrul de 30 de minute (`NotificationHelper.escalateDelivery`). E-mailul în lot este trimis de `NotificationHelper.sendEmailNotifications(frequency)`, în funcție de preferința `emailFrequency` a fiecărei persoane: `individual` rulează pe cronometrul de 30 de minute, `daily` rulează la cronometrul de noapte. (`weekly` este o valoare validă a preferinței, dar nu are încă o rulare dedicată în lot.)

## Motorul de memento-uri

Memento-urile programate — memento-urile pentru evenimente, datele limită ale sarcinilor, memento-urile pentru atribuirile de servire/plan — trec toate printr-un singur motor generalizat, în loc de logică cron specifică fiecărei funcționalități.

```
reminderDefinitions ──expand──▶ reminderOccurrences ──scan (30 min)──▶ createNotifications()
     │                                  │                                    │
     ▼                                  ▼                                    ▼
 entity- or scope-level          one row per (definition,              deliveryStartLevel: 1
 offsets/channels/message        entity, occurrence, offset)           + reminderSentLog ledger
```

**Definițiile** (`reminderDefinitions`) sunt fie la nivel de entitate (`entityId` setat — un anumit eveniment, sarcină sau plan), fie la nivel de domeniu (`entityId` null, `scopeId` setat — de ex., fiecare plan dintr-un tip de plan de servire). O definiție conține un CSV de decalaje în minute (`offsets`, de ex. `"1440,60"` pentru cu o zi și cu o oră înainte), o oră locală de trimitere (`sendLocalTime`), un CSV de canale (`channels` — inclusiv `email`, care declanșează un e-mail bogat imediat în momentul trimiterii), un `recipientMode` și un `message` personalizat opțional.

**Extinderea** materializează rândurile de declanșare pentru perioada următoare (o fereastră glisantă de mai multe zile). Rulează la cronometrul de noapte și sincron ori de câte ori o definiție este salvată, astfel încât un memento pentru un eveniment de ultim moment să se declanșeze în continuare. Definițiile de domeniu se extind prin `loadScopeEntities` al adaptorului, producând un set de apariții pentru fiecare entitate concretă; aparițiile la nivel de entitate folosesc cheia `definitionId:occurrenceISO:offset`, iar cele de domeniu au spațiu de nume după id-ul entității, astfel încât nu se ciocnesc niciodată. Actualizarea (upsert) unei apariții **readuce la viață** un rând anulat anterior — anularea urmată de re-extindere este modalitatea standard de a resincroniza un memento după ce entitatea de bază s-a schimbat; rândurile deja `sent`, `failed` sau `processing` nu sunt modificate.

**Expedierea** (`ReminderEngine.scan()`) rulează la cronometrul de 30 de minute. Revendică aparițiile scadente (o rezervare temporară previne procesarea dublă), încarcă destinatarii prin adaptorul entității, exclude pe oricine este deja înregistrat în `reminderSentLog` pentru acea apariție și apelează `createNotifications` cu `deliveryStartLevel: 1` (trece direct la push), plus `emailImmediate`/`emailByPerson` când canalele definiției includ e-mail.

### Memento-uri prin text

Când `channels` dintr-o definiție include `sms`, `scan()` apelează `ReminderEngine.sendSms()` după crearea notificărilor push/e-mail, pentru aceiași destinatari proaspeți. Trimiterea de mesaje text este opt-in pentru fiecare membru:

- Fiecare destinatar trece prin `PreferenceGateHelper.evaluate(..., "sms", ...)`, deci `allowSms` trebuie să fie activat (implicit este dezactivat și se setează din comutatorul **Mesaje text** din B1App), iar canalul `sms` al categoriei nu trebuie să fie dezactivat explicit. `event_reminders`, `serving_schedule` și `tasks` includ `sms` atât în `defaultChannels`, cât și în `allowedChannels`.
- Persoanele fără `mobilePhone` sau cu `optedOut` setat sunt suprimate. Dacă biserica nu are un furnizor de mesagerie text, restul lotului este suprimat cu motivul `no_provider`.
- Corpul mesajului este construit de `ReminderEngine.smsBody()`: `"<Church name>: <message> Reply STOP to opt out."`, tăiat la un singur segment de 160 de caractere.
- Fiecare destinatar primește propriul rând în `reminderSentLog` cu `channel: "sms"` și starea `sent` / `suppressed` / `failed`, identificat separat de rândul push/e-mail, astfel încât un mesaj text eșuat nu retrimite niciodată push-ul sau e-mailul.

Editorii oferă opțiunea **Text** doar când `GET /messaging/texting/status` returnează `{ enabled: true }` (primul furnizor de mesagerie text al bisericii este activat).

**Dezabonare prin STOP.** `POST /messaging/texting/inbound/:churchId/:token` este un webhook anonim pe care biserica îl lipește în furnizorul său (B1Admin afișează URL-ul din `GET /messaging/texting/inboundUrl` în setările de mesagerie text). Tokenul este un HMAC al id-ului bisericii (`SmsOptOutHelper.token`). `SmsOptOutHelper.parse` acceptă câmpuri de formular în stil Twilio și JSON în stil Clearstream/TextInChurch; dacă răspunsul este exact un cuvânt de oprire al operatorului (`STOP`, `STOPALL`, `UNSUBSCRIBE`, `CANCEL`, `END`, `QUIT`, `OPTOUT`, `REVOKE`), fiecare persoană neeliminată din biserică al cărei număr de mobil se potrivește primește `people.optedOut = true` și `allowSms = false`. Celelalte răspunsuri sunt confirmate și ignorate.

O magistrală internă de evenimente reacționează la modificările entităților fără să aștepte extinderea de noapte: evenimentele de conținut (prin dispatcherul de webhook-uri) și evenimentele de actualizare a planurilor/sarcinilor declanșează imediat re-extinderea sau anularea pentru entitatea afectată, iar o actualizare a planului re-extinde și orice definiții de domeniu legate de tipul său de plan.

### Adaptoare

Motorul este independent de entitate; fiecare tip de entitate suportat se conectează printr-un adaptor (`helpers/adapters/`):

| Tip de entitate | Adaptor | Observații |
|-----------------|---------|------------|
| `event` | `EventReminderAdapter` | Destinatarii sunt limitați la înscriși sau la membrii grupului, în funcție de eveniment și de `recipientMode`. |
| `plan` | `PlanReminderAdapter` | Destinatarii sunt atribuirile Acceptate + Neconfirmate din planurile publicate (nu ciorne). Atribuirile neconfirmate emise printr-un flux de lucru de confirmare a serviciului sunt excluse până când sunt acceptate (vezi mai jos). `buildEmails` apelează `DoingModuleGateway.buildPlanReminderEmails`, care generează pozițiile, notele și un mesaj personalizat prin `doing/helpers/PlanReminderEmailHelper`, inclusiv butoanele Acceptă/Refuză semnate de `ReminderTokenHelper`, care trimit date către un endpoint public de răspuns la atribuire. |
| `task` | `TaskReminderAdapter` | Destinatarii sunt persoanele desemnate pentru sarcină. |

### Endpoint-uri

| Metodă | Cale | Scop |
|--------|------|------|
| `GET` / `POST` | `/messaging/reminders/:entityType/:entityId` | Încarcă sau salvează definiția memento-ului pentru o entitate. |
| `GET` / `POST` | `/messaging/reminders/scope/:entityType/:scopeId` | Încarcă sau salvează o definiție de memento la nivel de domeniu (moștenită). |
| `DELETE` | `/messaging/reminders/:defId` | Șterge o definiție și anulează aparițiile sale în așteptare. |
| `GET` | `/messaging/reminders/event/:eventId/preview` | Previzualizează numărul de destinatari și următoarele ore de declanșare pentru un memento de eveniment, înainte de salvare. |
| `GET` | `/messaging/reminders/log` | Istoricul recent al aparițiilor memento-urilor pentru o biserică. |
| `POST` | `/messaging/reminders/mute` | Dezactivează memento-urile pentru o anumită entitate. |

Salvarea unei definiții declanșează o re-extindere sincronă pentru acea entitate sau domeniu, astfel încât editorii văd „următoarele declanșări” actualizate fără să aștepte sarcina de noapte.

## Mesaje directe

Mesajele directe folosesc același canal principal ca toate celelalte, în loc de o cale separată de escaladare. Fiecare conversație necitită primește un singur **rând umbră** în `notifications` (`contentType='privateMessage'`, `contentId` = id-ul mesajului privat, `category='direct_messages'`), care deține toată starea livrării — escaladarea prin socket/push/e-mail, urmărirea citirii, totul. Tabelul `privateMessages` păstrează în sine conținutul mesajului și o coloană `notifyPersonId`, care este sursa insignei de necitit și este golită când destinatarul citește conversația.

Rândurile umbră sunt invizibile în clopoțelul de notificări: sunt excluse din interogarea numărului de necitite, din interogarea listei de notificări și din interogările de marcare ca citite/ștergere, toate filtrând după `contentType <> 'privateMessage'`. Fiecare semnal de MD ajunge prin socket indiferent de starea de necitit (semantica chatului în timp real — fără deduplicare), iar MD-urile nu se opresc niciodată la livrarea prin socket, așa cum fac notificările obișnuite, deoarece o PWA aflată în fundal poate menține un socket deschis, dar are totuși nevoie de o notificare push la nivelul sistemului de operare. Dacă o persoană dezactivează notificările pentru MD-uri, rândul umbră este pus în așteptare (`isNew=false`, `notifyPersonId` golit) — rămâne vizibil în interiorul conversației, dar fără insigne sau alerte.

## Preferințe și filtrare

Fiecare trimitere trece prin `PreferenceGateHelper.evaluate()`, o funcție pură (toată starea este transmisă ca parametru, fără apeluri la baza de date pe calea critică), care returnează `allow`, `suppress` sau `defer`. Straturile se execută în ordine, iar primul care decide câștigă:

1. **Categorie blocată** — unele categorii sunt obligatorii (nivelul 0) și ocolesc toate celelalte straturi.
2. **Dezactivare generală / oprire de canal** — `masterMute`, `allowPush`, `allowSms` (dezactivat implicit — membrii aleg să se înscrie) sau `emailFrequency='never'` suprimă direct.
3. **Ore de liniște** — doar pentru push și SMS (e-mailul este considerat nederanjant). Dacă ora locală curentă din fusul orar al persoanei se încadrează în fereastra sa de liniște, o categorie tranzacțională trece totuși; una netranzacțională este amânată până la sfârșitul ferestrei de liniște, calculat ca un moment UTC corect față de ora de vară prin `TimezoneHelper.wallClockToUtc`.
4. **Excepție de preferință pe categorie** — o dezabonare explicită pentru o pereche categorie × canal; lipsa ei înseamnă valoarea implicită a categoriei.
5. **Dezactivare pe entitate** — o dezactivare înregistrată pentru o anumită entitate (de ex., un eveniment, un plan) restricționează mai mult decât setarea la nivel de categorie, dar se aplică doar când apelantul furnizează un id/tip de entitate împreună cu notificarea.

Tabelele implicate: `notificationPreferences` (global — `masterMute`, `emailFrequency` cu valorile `individual|daily|weekly|never`, `allowPush`, fereastra orelor de liniște + fusul orar, `allowSms`), `notificationPreferenceOverrides` (pe categorie × canal) și `notificationEntityMutes` (pe entitate).

Acest filtru este aplicat pentru in-app (nivelul 0), push (nivelul 1) și e-mail (nivelul 2) în interiorul canalului principal — inclusiv e-mailurile imediate de memento sau de rezumat — și pentru mesajele text de memento din `ReminderEngine.sendSms()`. E-mailul tranzacțional (coduri de autentificare, resetări de parolă, invitații, chitanțe de donație) îl ocolește prin proiect; aceasta este chiar rațiunea celei de-a doua uși.

### Fluxuri de lucru pentru confirmarea serviciului

Un plan poate opta pentru un flux de lucru `workflowType = "assignmentConfirmation"` (`plans.confirmationWorkflowId`). Publicare/Notificare apelează apoi `POST /doing/plans/:id/issueRequests` în locul notificării pentru fiecare atribuire: fiecare atribuire nouă Neconfirmată primește `notified` + `confirmationWorkflowId` și o singură fișă de flux de lucru (`tasks.assignmentId`, `followupKey` unic). Fișa trimite o alertă doar în aplicație (`appOnly: true` — fără escaladare prin push/e-mail), apoi rulează acțiunile `sendAssignmentRequest` ale fluxului de lucru, care trec prin `MessagingModuleGateway.sendServingWorkflowMessage`: e-mail prin `NotificationHelper.sendWorkflowEmail` (filtru de preferințe + `ChurchEmailLimiter`, contorizat ca `workflowEmail`), SMS prin `sendPersonText` doar cu `allowSms` și filtrul de categorie `serving_schedule`. Acceptarea/Refuzul (`assignment.updated` pe magistrala de evenimente) închide fișa; cronometrul de 30 de minute (`AssignmentWorkflowHelper.processPending`) repară pornirile și evenimentele ratate și transformă o solicitare fără răspuns, la termenul de urmărire, într-o sarcină de revizuire pentru lider. Ciclul de viață complet: `Api/docs/assignment-confirmation-workflows.md`.

## Limitele e-mailurilor redactate de biserică

E-mailul al cărui conținut a fost scris de o biserică pleacă din identitatea SES comună ChurchApps, astfel că este contorizat pe biserică de `Api/src/shared/helpers/ChurchEmailLimiter.ts`. Patru căi îl apelează: trimiterile de grup/șablon (`EmailTemplateController`, tipul de conținut `email`), e-mailurile de urmărire ale formularelor (`FormSubmissionController`, `formFollowUp`), acțiunile de flux de lucru **Trimite e-mail** (`NotificationHelper` cu `churchAuthored`, `workflowEmail`) și e-mailurile de solicitare de confirmare a serviciului (`NotificationHelper.sendWorkflowEmail`, `workflowEmail`). Corespondența de sistem (coduri de autentificare, chitanțe, memento-uri) și invitațiile de rol și de grup (`UserController.sendInviteEmail`, un șablon fix) nu sunt contorizate.

- **Poarta de aprobare.** O biserică nu trimite nimic până când un administrator de server nu setează `churches.emailApprovedDate` (`POST /membership/churches/:id/emailApproval`, Server Admin → Churches → cipul **Group Email**). Bisericile arhivate sunt întotdeauna blocate. Dialogul Send Email din B1Admin citește `GET /messaging/emailTemplates/sendStatus` (`approved`, `paused`, `remaining`, `requested`) și, dacă nu este aprobată, afișează o fișă **Solicită revizuire** în locul editorului. Editorul de pași ai fluxului de lucru citește același endpoint (accesibil atât pentru `tasks.admin`, cât și pentru `groupMembers.edit`) pentru a avertiza la acțiunile **Trimite e-mail** când biserica nu este aprobată sau este suspendată. În momentul trimiterii, `MessagingModuleGateway.sendTemplatedEmail` returnează `false` fără să creeze o notificare când `ChurchEmailLimiter.remaining()` este sub 1, astfel încât istoricul fișei nu afirmă niciodată **E-mail trimis** pentru un mesaj care a fost eliminat. `POST /messaging/emailTemplates/requestApproval` trimite un e-mail către suport, cel mult o dată pe săptămână pentru fiecare biserică.
- **Limită câștigată.** O biserică aprobată primește `max(150, 2 × cea mai bună zi a sa de e-mail redactat de biserică din ultimele 30 de zile)`, plafonată la 2.000 pe fiecare 24 de ore glisante. Ultimele 24 de ore curente sunt excluse din „cea mai bună zi”, astfel încât o rafală nu își poate ridica propria limită.
- **Rezervă, apoi decontează.** `reserve()` scrie un rând `deliveryLogs` pentru fiecare destinatar înainte de trimitere, reverifică limita numărând aceste rânduri și se retrage dacă două cereri au depășit limita concurent (trimiterea returnează 429). `settle()` marchează fiecare rând ca trimis sau eșuat.
- **Suspendare pentru reclamații.** Lambda `sesFeedback` (`Api/src/lambda/ses-feedback-handler.ts`, alimentată de SES → SNS) atribuie fiecare respingere permanentă sau reclamație bisericii al cărei e-mail redactat de biserică a ajuns la adresa respectivă în jurul acelui moment, stocat ca `deliveryMethod` `sesBounce` / `sesComplaint`. O biserică este suspendată la 2+ reclamații (≥ 0,3% din trimiteri) sau 10+ respingeri definitive (≥ 5%) în decurs de 7 zile.

## Programarea

Atât motorul de memento-uri, cât și rezumatul de notificări folosesc cronometrele programate existente, în loc să introducă o infrastructură nouă:

| Cronometru | Program | Rulează |
|------------|---------|---------|
| Cronometrul de 30 de minute | la fiecare 30 de minute | Escaladează notificările necitite; trimite e-mailurile de rezumat cu frecvența `individual`; expediază aparițiile scadente ale memento-urilor (`ReminderEngine.scan`); rezumate de aprobare; execuțiile automatizărilor scadente |
| Cronometrul de noapte | 05:00 UTC | Memento-uri de prezență la grupuri; avansarea serviciilor de streaming recurente; reîmprospătarea listelor cu actualizare automată; extinderea aparițiilor memento-urilor pentru următorul orizont (`ReminderEngine.expandAll`); trimiterea e-mailurilor de rezumat cu frecvența `daily` |

Local, aceeași logică poate fi declanșată la cerere cu `npm run timer:30min` și `npm run timer:midnight` din proiectul `Api`.

## Inventarul fișierelor

| Zonă | Fișiere |
|------|---------|
| Canal principal | `Api/src/modules/messaging/helpers/NotificationHelper.ts`, `PreferenceGateHelper.ts`, `NotificationCategoryHelper.ts`, `WebPushHelper.ts`, `ExpoPushHelper.ts`, `SocketHelper.ts`, `DeliveryHelper.ts` |
| Punct de intrare comun | `Api/src/shared/helpers/NotificationService.ts` |
| Ușa tranzacțională | `Api/src/shared/helpers/TransactionalEmailHelper.ts`, regula de linter `Api/tools/eslint-rules/email-door.cjs` |
| Limitele e-mailurilor bisericii | `Api/src/shared/helpers/ChurchEmailLimiter.ts`, `Api/src/lambda/ses-feedback-handler.ts`, `Api/src/modules/messaging/repositories/DeliveryLogRepo.ts` |
| Motorul de memento-uri | `Api/src/modules/messaging/helpers/ReminderEngine.ts`, `ReminderBootstrap.ts`, `helpers/adapters/*`, `controllers/ReminderController.ts` |
| Mesagerie text / dezabonare STOP | `Api/src/modules/messaging/helpers/SmsOptOutHelper.ts`, `controllers/TextingController.ts` (`/status`, `/inboundUrl`, `/inbound/:churchId/:token`), `Api/src/modules/doing/helpers/MatrixTextHelper.ts` (prezentarea generală a serviciilor, **Trimite text voluntarilor**) |
| Depozitele memento-urilor | `Api/src/modules/messaging/repositories/ReminderDefinitionRepo.ts`, `ReminderOccurrenceRepo.ts`, `ReminderSentLogRepo.ts` |
| E-mailuri pentru servire/planuri | `Api/src/modules/doing/helpers/PlanReminderEmailHelper.ts`, `ReminderTokenHelper.ts`, `Api/src/shared/modules/DoingModuleGateway.ts` |
| Editoarele de memento-uri (B1Admin) | `serving/components/PlanTypeReminderEdit.tsx`, `calendars/components/EventReminderEdit.tsx`, `serving/tasks/components/TaskReminderEdit.tsx`, `hooks/useTextingEnabled.ts` |
| Editorul de memento-uri / preferințe (B1App) | `EventReminderEdit.tsx`, `NotificationPrefsPage.tsx`, `useRealtimeNotifications.ts` |

## Pagini conexe

- [Arhitectura în timp real](../realtime.md) — protocolul WebSocket și primitivele de client (`SocketHelper`, `SubscriptionManager`, `ConversationStore`) pe care se bazează nivelul de livrare in-app
- [Notificări Web Push](../web-push.md) — configurarea VAPID și calea API-ului Push din browser folosită de nivelul de escaladare push
- [Endpoint-uri de mesagerie](../api/endpoints/messaging.md) — suprafața REST completă pentru mesaje, conversații, conexiuni și rutele de notificări/memento-uri
