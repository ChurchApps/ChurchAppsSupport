---
title: "Architektura powiadomień i przypomnień"
---

# Architektura powiadomień i przypomnień

<div class="article-intro">

Każda wiadomość, którą członek parafii widzi poza stroną, na której się znajduje (licznik nieprzeczytanych, powiadomienie push, cykliczny e-mail z podsumowaniem), przechodzi przez jedno z dwóch wejść w MessagingApi. Ta strona opisuje ten lejek, silnik przypomnień, który zasila go zgodnie z harmonogramem, oraz model preferencji decydujący, co faktycznie dociera do danej osoby.

</div>

## Przegląd: dwa wejścia

```
scheduled anything ──▶ ReminderEngine (definitions → occurrences → scan) ─┐
chat / requests / workflow / bulk sends ──────────────────────────────────┼─▶ createNotifications()
                                                                          │    in_app gate → socket → push → email
     (reminder channels include sms) ──▶ ReminderEngine.sendSms() ──▶ sms gate → sendPersonText() via church provider
provider STOP reply ──▶ POST /messaging/texting/inbound/:churchId/:token ──▶ SmsOptOutHelper.optOut()
account/legal mail ──▶ TransactionalEmailHelper.sendTransactional()  [allowlisted, lint-enforced]
```

1. **Wszystko, co informuje osobę o czymś**, przechodzi przez `NotificationHelper.createNotifications()` w module messaging. Zapisuje wiersz w tabeli `notifications` i eskaluje przez socket → push → e-mail, oceniając `PreferenceGateHelper` dla każdego kanału, w tym `in_app` na poziomie 0.
2. **Wszystko zaplanowane** jest `reminderDefinition` (na poziomie encji lub zakresu), rozwijanym do `reminderOccurrences` i wysyłanym przez `ReminderEngine.scan()` uruchamiany cyklicznie. Jeden ekspander, jeden dyspozytor i jeden dziennik wysyłek (`reminderSentLog`).
3. **Bezpośredni e-mail** istnieje wyłącznie za `TransactionalEmailHelper.sendTransactional()`. Reguła ESLint wymusza to na etapie kompilacji, patrz niżej.

:::tip Wejście e-mailowe jest wymuszane przez lint, a nie tylko przez konwencję
`Api/tools/eslint-rules/email-door.cjs` definiuje `no-direct-email-helper`: każde wywołanie `EmailHelper.sendTemplatedEmail()` lub `EmailHelper.sendEmail()` poza plikami `NotificationHelper.ts` i `TransactionalEmailHelper.ts` nie przechodzi lintu. Jeśli musisz wysłać e-mail, skieruj go przez lejek (`createNotifications` z `emailImmediate`) lub przez `TransactionalEmailHelper.sendTransactional()`. Nie ma trzeciej drogi, która przechodzi CI.
:::

## Lejek powiadomień

`NotificationHelper.createNotifications()` jest jedynym punktem wejścia dla wszystkiego, co nie jest zaplanowane ani transakcyjne:

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

Dla każdego odbiorcy zapisywany jest wiersz w `notifications`, a następnie wywoływana jest `attemptDeliveryWithEscalation`, która przechodzi po drabinie kanałów opisanej poniżej. Wiersz dla tego samego `(contentType, contentId)`, który nadal jest nieprzeczytany, blokuje ponowne utworzenie powiadomienia. Ten mechanizm deduplikacji jest pomijany dla wysyłek z `emailImmediate` (przypomnienia z przesunięciami, „wyślij e-mail do wszystkich” od personelu, kroki workflow, które same zarządzają deduplikacją) oraz dla wiadomości bezpośrednich, które zawsze wysyłają ping przez socket.

`shared/helpers/NotificationService.ts` odzwierciedla tę samą sygnaturę (`NotificationServiceOptions`) dla wywołujących spoza modułu messaging i jest rejestrowany w module messaging podczas startu.

## Łańcuch eskalacji kanałów

Dostarczanie zaczyna się od określonego poziomu (domyślnie 0, lub wyższego dla przypomnień i jawnych wysyłek) i przechodzi do kolejnego kanału tylko wtedy, gdy poprzedni się nie powiódł. Każdy poziom jest bramkowany przez `PreferenceGateHelper`, zanim cokolwiek zostanie podjęte.

| Poziom | Kanał | Działanie |
|--------|-------|-----------|
| 0 | **in_app / socket** | Najpierw sprawdzana jest bramka `in_app`. Jeśli powiadomienie jest wyciszone, wiersz zostaje zapisany z `isNew=false` i dostarczanie zatrzymuje się całkowicie: bez pinga przez socket, bez licznika i bez dalszej eskalacji. W przeciwnym razie serwer wyszukuje otwarte połączenia socket w pokoju `alerts` danej osoby i wysyła ramkę `notification` (lub `privateMessage`). Dla zwykłych powiadomień udane dostarczenie przez socket zatrzymuje łańcuch na tym poziomie. Timer 30-minutowy ponownie sprawdza nieprzeczytane elementy i eskaluje je później. Wiadomości bezpośrednie nigdy nie zatrzymują się na sockecie: zainstalowana aplikacja PWA może utrzymywać otwarte połączenie w tle, co w przeciwnym razie tłumiłoby powiadomienie push na poziomie systemu. |
| 1 | **push** | Bramkowany przez `allowPush`, rezygnację z kategorii i ciche godziny. Wysyła zarówno do tokenów Expo push, jak i subskrypcji Web Push znalezionych w wierszach `devices` danej osoby, deduplikując po endpoincie i usuwając nieaktualne tokeny po drodze. |
| 2 | **e-mail** | Bramkowany przez `emailFrequency` i rezygnację z kategorii. Wysyłki natychmiastowe (`emailImmediate`) są renderowane od razu i zapisują wiersz w `deliveryLogs`. W pozostałych przypadkach powiadomienie pozostaje oczekujące na wsadowy e-mail zbiorczy, opisany poniżej. |
| — | **sms** | Nie jest poziomem w łańcuchu eskalacji. Jedynym bramkowanym producentem SMS jest silnik przypomnień: gdy `channels` definicji zawiera `sms`, `ReminderEngine.sendSms()` wysyła SMS do każdego odbiorcy **oprócz** powiadomienia push/e-mail (patrz [Przypomnienia tekstowe](#text-reminders)). Masowe SMS-y (`TextingController` / `@churchapps/texting`), wysyłka **Text Volunteers** z przeglądu służby (`MatrixTextHelper` → `MessagingModuleGateway.sendPersonText`) oraz akcja workflow **Send Text** (`StepActionHelper.sendText` → `sendPersonText`) wysyłają bezpośrednio przez dostawcę usług danego kościoła. Oznacza to, że preferencje powiadomień i ciche godziny ich nie obowiązują. Uwzględniana jest wyłącznie flaga `optedOut` danej osoby. |

Nieprzeczytane powiadomienia, które pozostały na poziomie socket lub push, są eskalowane przez 30-minutowy timer (`NotificationHelper.escalateDelivery`). Wsadowe e-maile wysyła `NotificationHelper.sendEmailNotifications(frequency)`, sterowane preferencją `emailFrequency` każdej osoby: `individual` działa co 30 minut, a `daily` działa w nocnym timerze. (`weekly` jest prawidłową wartością preferencji, ale nie ma jeszcze dedykowanego wsadowego uruchomienia.)

## Silnik przypomnień

Zaplanowane przypomnienia (przypomnienia o wydarzeniach, terminy zadań, przypomnienia o przydziałach do służby i planów) przechodzą przez jeden uogólniony silnik, zamiast przez odrębną logikę cron dla każdej funkcji.

```
reminderDefinitions ──expand──▶ reminderOccurrences ──scan (30 min)──▶ createNotifications()
     │                                  │                                    │
     ▼                                  ▼                                    ▼
 entity- or scope-level          one row per (definition,              deliveryStartLevel: 1
 offsets/channels/message        entity, occurrence, offset)           + reminderSentLog ledger
```

**Definicje** (`reminderDefinitions`) są albo na poziomie encji (`entityId` ustawione, czyli konkretne wydarzenie, zadanie lub plan), albo na poziomie zakresu (`entityId` puste, `scopeId` ustawione, np. każdy plan w ramach typu planu służby). Definicja zawiera listę przesunięć w minutach oddzieloną przecinkami (`offsets`, np. `"1440,60"` dla jednego dnia i jednej godziny przed), lokalną godzinę wysyłki (`sendLocalTime`), listę kanałów oddzieloną przecinkami (`channels`, gdzie `email` wyzwala natychmiastowy, bogaty e-mail w chwili wysyłki), `recipientMode` oraz opcjonalną niestandardową `message`.

**Rozwijanie** tworzy wiersze wyzwoleń na najbliższy horyzont (przesuwające się okno kilku dni). Działa w nocnym timerze i synchronicznie za każdym razem, gdy definicja zostaje zapisana, dzięki czemu przypomnienie o wydarzeniu zaplanowanym na ostatnią chwilę również zadziała. Definicje zakresu rozdzielane są przez `loadScopeEntities` adaptera, tworząc jeden zestaw wystąpień dla każdej konkretnej encji. Wystąpienia na poziomie encji używają klucza `definitionId:occurrenceISO:offset`, a wystąpienia zakresu są przestrzennie oddzielane przez id encji, aby nigdy się nie kolidowały. Zapisanie wystąpienia **przywraca** wcześniej anulowany wiersz. Standardowym sposobem ponownej synchronizacji przypomnienia po zmianie bazowej encji jest anulowanie, a następnie ponowne rozwinięcie. Wiersze, które mają już status `sent`, `failed` lub `processing`, pozostają nietknięte.

**Dyspozycja** (`ReminderEngine.scan()`) działa w 30-minutowym timerze. Przejmuje wystąpienia, które są należne (dzierżawa zapobiega podwójnemu przetwarzaniu), ładuje odbiorców przez adapter encji, odfiltrowuje osoby już zapisane w `reminderSentLog` dla danego wystąpienia i wywołuje `createNotifications` z `deliveryStartLevel: 1` (przejście od razu do push) oraz `emailImmediate`/`emailByPerson`, gdy kanały definicji zawierają e-mail.

### Przypomnienia tekstowe

Gdy `channels` definicji zawiera `sms`, `scan()` wywołuje `ReminderEngine.sendSms()` po utworzeniu powiadomień push/e-mail, dla tych samych świeżych odbiorców. Wysyłanie SMS wymaga zgody każdego członka:

- Każdy odbiorca przechodzi przez `PreferenceGateHelper.evaluate(..., "sms", ...)`. Oznacza to, że `allowSms` musi być włączone (domyślnie jest wyłączone i ustawiane przełącznikiem **Text messages** w B1App), a kanał `sms` danej kategorii nie może być wyłączony przez nadpisanie. `event_reminders`, `serving_schedule` i `tasks` wymieniają `sms` zarówno w `defaultChannels`, jak i w `allowedChannels`.
- Osoby bez `mobilePhone` lub z ustawionym `optedOut` są pomijane. Jeśli kościół nie ma skonfigurowanego dostawcy SMS, pozostała część wsadu jest pomijana z powodem `no_provider`.
- Treść budowana jest przez `ReminderEngine.smsBody()`: `"<Church name>: <message> Reply STOP to opt out."`, przycięta do jednego segmentu 160 znaków.
- Każdy odbiorca otrzymuje osobny wiersz w `reminderSentLog` z `channel: "sms"` i statusem `sent` / `suppressed` / `failed`. Jest on kluczowany oddzielnie od wiersza push/e-mail, więc nieudany SMS nigdy nie powoduje ponownej wysyłki push ani e-maila.

Edytory pokazują **Tekst** tylko wtedy, gdy `GET /messaging/texting/status` zwraca `{ enabled: true }` (pierwszy skonfigurowany dostawca SMS kościoła jest włączony).

**Rezygnacja STOP.** `POST /messaging/texting/inbound/:churchId/:token` to anonimowy webhook, który kościół wkleja u swojego dostawcy (B1Admin pokazuje adres URL z `GET /messaging/texting/inboundUrl` w ustawieniach SMS). Token jest HMAC z id kościoła (`SmsOptOutHelper.token`). `SmsOptOutHelper.parse` akceptuje pola formularza w stylu Twilio oraz JSON w stylu Clearstream/TextInChurch. Jeśli odpowiedź to dokładnie słowo STOP operatora (`STOP`, `STOPALL`, `UNSUBSCRIBE`, `CANCEL`, `END`, `QUIT`, `OPTOUT`, `REVOKE`), każda niesklasyfikowana osoba w kościele, której numer komórkowy pasuje, otrzymuje `people.optedOut = true` i `allowSms = false`. Pozostałe odpowiedzi są potwierdzane i ignorowane.

Wewnętrzna magistrala zdarzeń reaguje na zmiany encji bez czekania na nocne rozwijanie. Zdarzenia treści (przez dyspozytor webhooków) oraz zdarzenia aktualizacji planu i zadania natychmiast wyzwalają ponowne rozwinięcie lub anulowanie dla danej encji. Aktualizacja planu dodatkowo ponownie rozwija definicje zakresu powiązane z jego typem.

### Adaptery

Silnik nie zależy od typu encji. Każdy obsługiwany typ encji podłącza się przez adapter (`helpers/adapters/`):

| Typ encji | Adapter | Uwagi |
|-----------|---------|-------|
| `event` | `EventReminderAdapter` | Odbiorcy ograniczeni do uczestników zapisanych lub członków grupy, w zależności od wydarzenia i `recipientMode`. |
| `plan` | `PlanReminderAdapter` | Odbiorcami są przydziały Accepted i Unconfirmed w opublikowanych (nieszkicowych) planach. Przydziały Unconfirmed wystawione w ramach workflow potwierdzania służby są wykluczane, dopóki nie zostaną zaakceptowane (patrz niżej). `buildEmails` wywołuje `DoingModuleGateway.buildPlanReminderEmails`, który renderuje pozycje, notatki i własną wiadomość przez `doing/helpers/PlanReminderEmailHelper`, w tym przyciski Akceptuj/Odrzuć podpisane przez `ReminderTokenHelper`, wysyłające dane do publicznego endpointu odpowiedzi na przydział. |
| `task` | `TaskReminderAdapter` | Odbiorcami jest osoba (lub osoby) przypisane do zadania. |

### Endpointy

| Metoda | Ścieżka | Cel |
|--------|---------|-----|
| `GET` / `POST` | `/messaging/reminders/:entityType/:entityId` | Wczytanie lub zapisanie definicji przypomnienia dla jednej encji. |
| `GET` / `POST` | `/messaging/reminders/scope/:entityType/:scopeId` | Wczytanie lub zapisanie definicji przypomnienia na poziomie zakresu (dziedziczonej). |
| `DELETE` | `/messaging/reminders/:defId` | Usunięcie definicji i anulowanie jej oczekujących wystąpień. |
| `GET` | `/messaging/reminders/event/:eventId/preview` | Podgląd liczby odbiorców i następnych terminów wysyłki przypomnienia o wydarzeniu przed zapisem. |
| `GET` | `/messaging/reminders/log` | Historia ostatnich wystąpień przypomnień dla kościoła. |
| `POST` | `/messaging/reminders/mute` | Wyciszenie przypomnień dla konkretnej encji. |

Zapisanie definicji wyzwala synchroniczne ponowne rozwinięcie dla danej encji lub zakresu, dzięki czemu edytorzy widzą aktualne „następne wysyłki” bez czekania na nocne zadanie.

## Wiadomości bezpośrednie

Wiadomości bezpośrednie korzystają z tego samego lejka co wszystko inne, a nie z osobnej ścieżki eskalacji. Każda nieprzeczytana konwersacja otrzymuje jeden **wiersz pomocniczy** w `notifications` (`contentType='privateMessage'`, `contentId` = id wiadomości prywatnej, `category='direct_messages'`), który zarządza całym stanem dostarczenia: eskalacją przez socket, push i e-mail, śledzeniem odczytu i wszystkim innym. Sama tabela `privateMessages` przechowuje treść wiadomości i kolumnę `notifyPersonId`. To ona jest źródłem licznika nieprzeczytanych i jest czyszczona, gdy odbiorca przeczyta konwersację.

Wiersze pomocnicze są niewidoczne dla dzwonka powiadomień. Są wykluczane z zapytania o liczbę nieprzeczytanych, z zapytania o listę powiadomień oraz z zapytań oznaczania jako przeczytane i usuwania. Wszystkie one filtrują `contentType <> 'privateMessage'`. Każde powiadomienie o wiadomości bezpośredniej trafia do socket niezależnie od stanu nieprzeczytania (semantyka czatu na żywo, bez deduplikacji). Wiadomości bezpośrednie nigdy nie zatrzymują się na dostarczeniu przez socket, w przeciwieństwie do zwykłych powiadomień, ponieważ PWA działająca w tle może utrzymywać socket, a mimo to potrzebuje powiadomienia push na poziomie systemu. Jeśli osoba wycisza powiadomienia o wiadomościach bezpośrednich, wiersz pomocniczy jest wstrzymywany (`isNew=false`, `notifyPersonId` wyczyszczone). Wiadomość jest nadal widoczna w samej konwersacji, ale bez liczników i alertów.

## Preferencje i bramkowanie

Każde wysłanie przechodzi przez `PreferenceGateHelper.evaluate()`, czystą funkcję (cały stan jest przekazywany jako argument, bez wywołań bazy danych na ścieżce krytycznej), która zwraca `allow`, `suppress` lub `defer`. Warstwy są sprawdzane w kolejności, a pierwsza, która podejmie decyzję, wygrywa:

1. **Zablokowana kategoria**: niektóre kategorie są obowiązkowe (poziom 0) i omijają wszystkie pozostałe warstwy.
2. **Wyciszenie globalne / wyłączenie kanału**: `masterMute`, `allowPush`, `allowSms` (domyślnie wyłączone, członkowie sami się zapisują) lub `emailFrequency='never'` powodują natychmiastowe pominięcie.
3. **Ciche godziny**: dotyczą tylko push i SMS (e-mail uznawany jest za niebyt inwazyjny). Jeśli bieżący czas ścienny w strefie czasowej danej osoby mieści się w jej oknie ciszy, kategoria transakcyjna nadal przechodzi, a kategoria nietransakcyjna jest odroczona do końca okna ciszy, obliczonego jako chwila UTC zgodna z czasem letnim przez `TimezoneHelper.wallClockToUtc`.
4. **Nadpisanie preferencji dla kategorii**: jawna rezygnacja dla pary kategoria × kanał. Brak wpisu oznacza wartość domyślną kategorii.
5. **Wyciszenie dla encji**: wyciszenie zapisane dla konkretnej encji (np. jednego wydarzenia, jednego planu) ogranicza powiadomienia bardziej niż ustawienie na poziomie kategorii, ale obowiązuje tylko wtedy, gdy wywołujący podaje id i typ encji razem z powiadomieniem.

Używane tabele: `notificationPreferences` (globalne: `masterMute`, `emailFrequency` o wartościach `individual|daily|weekly|never`, `allowPush`, okno cichych godzin wraz ze strefą czasową, `allowSms`), `notificationPreferenceOverrides` (dla kategorii × kanał) oraz `notificationEntityMutes` (dla encji).

Bramkowanie jest egzekwowane dla in-app (poziom 0), push (poziom 1) i e-mail (poziom 2) wewnątrz lejka, w tym dla natychmiastowych e-maili z przypomnieniami i podsumowaniami, a także dla SMS-ów z przypomnieniami w `ReminderEngine.sendSms()`. Transakcyjne e-maile (kody logowania, resetowanie hasła, zaproszenia, potwierdzenia darowizn) omijają je celowo. To właśnie jest sens drugiego wejścia.

### Workflowy potwierdzania służby

Plan może wybrać workflow `workflowType = "assignmentConfirmation"` (`plans.confirmationWorkflowId`). Publikacja/Powiadom wywołuje wtedy `POST /doing/plans/:id/issueRequests` zamiast powiadomienia dla każdego przydziału osobno. Każdy nowy przydział Unconfirmed otrzymuje `notified` i `confirmationWorkflowId` oraz jedną kartę workflow (`tasks.assignmentId`, unikalny `followupKey`). Karta wysyła alert tylko w aplikacji (`appOnly: true`, bez eskalacji do push/e-mail), a następnie uruchamia akcje `sendAssignmentRequest` workflow. Są one realizowane przez `MessagingModuleGateway.sendServingWorkflowMessage`: e-mail przez `NotificationHelper.sendWorkflowEmail` (bramka preferencji + `ChurchEmailLimiter`, liczony jako `workflowEmail`), SMS przez `sendPersonText` tylko przy `allowSms` i bramce kategorii `serving_schedule`. Akceptacja lub odrzucenie (`assignment.updated` na magistrali zdarzeń) zamyka kartę. Timer 30-minutowy (`AssignmentWorkflowHelper.processPending`) naprawia pominięte starty i zdarzenia, a nieodpowiedziane żądanie po upływie terminu przypomnienia zamienia w zadanie przeglądu dla lidera. Pełny cykl życia: `Api/docs/assignment-confirmation-workflows.md`.

## Limity e-maili tworzonych przez kościół

E-mail, którego treść napisał kościół, wysyłany jest ze wspólnej tożsamości SES ChurchApps, dlatego jest mierzony osobno dla każdego kościoła przez `Api/src/shared/helpers/ChurchEmailLimiter.ts`. Z tego mechanizmu korzystają cztery ścieżki: wysyłki grupowe i z szablonów (`EmailTemplateController`, typ treści `email`), e-maile uzupełniające formularzy (`FormSubmissionController`, `formFollowUp`), akcje workflow **Wyślij e-mail** (`NotificationHelper` z `churchAuthored`, `workflowEmail`) oraz e-maile z prośbą o potwierdzenie służby (`NotificationHelper.sendWorkflowEmail`, `workflowEmail`). Poczta systemowa (kody logowania, potwierdzenia, przypomnienia) oraz zaproszenia do ról i grup (`UserController.sendInviteEmail`, stały szablon) nie są mierzone.

- **Bramka zatwierdzenia.** Kościół nie wysyła niczego, dopóki administrator serwera nie ustawi `churches.emailApprovedDate` (`POST /membership/churches/:id/emailApproval`, Server Admin → Churches → chip **Group Email**). Zarchiwizowane kościoły są zawsze blokowane. Okno Send Email w B1Admin odczytuje `GET /messaging/emailTemplates/sendStatus` (`approved`, `paused`, `remaining`, `requested`). Gdy kościół nie jest zatwierdzony, zamiast edytora pokazuje kartę **Request review**. Edytor kroku workflow odczytuje ten sam endpoint (dostępny także dla `tasks.admin`, nie tylko dla `groupMembers.edit`), aby ostrzegać przy akcjach **Wyślij e-mail**, gdy kościół nie jest zatwierdzony lub jest wstrzymany. W chwili wysyłki `MessagingModuleGateway.sendTemplatedEmail` zwraca `false` bez utworzenia powiadomienia, gdy `ChurchEmailLimiter.remaining()` jest mniejsze niż 1. Dzięki temu historia karty nigdy nie pokazuje **Email sent** dla wiadomości, która została odrzucona. `POST /messaging/emailTemplates/requestApproval` wysyła e-mail do wsparcia, najwyżej raz na tydzień dla kościoła.
- **Zarobiony limit.** Zatwierdzony kościół otrzymuje `max(150, 2 × jego najlepszy dzień wysyłek tworzonych przez kościół w ciągu poprzednich 30 dni)`, maksymalnie 2000 w kroczącym oknie 24 godzin. Bieżące 24 godziny są wyłączone z obliczenia „najlepszego dnia”, aby nagły wzrost nie podnosił własnego limitu.
- **Rezerwacja, a potem rozliczenie.** `reserve()` zapisuje jeden wiersz `deliveryLogs` dla każdego odbiorcy przed wysyłką, ponownie sprawdza limit z uwzględnieniem tych wierszy i cofa się, jeśli dwa żądania przekroczyły limit jednocześnie (wysyłka zwraca 429). `settle()` oznacza każdy wiersz jako wysłany lub nieudany.
- **Wstrzymanie po skargach.** Funkcja Lambda `sesFeedback` (`Api/src/lambda/ses-feedback-handler.ts`, zasilana przez SES → SNS) przypisuje każdy trwały bounce lub skargę do kościoła, którego e-mail tworzony przez kościół dotarł na ten adres w pobliżu tego czasu. Są one zapisywane jako `deliveryMethod` `sesBounce` / `sesComplaint`. Kościół zostaje wstrzymany przy 2 lub więcej skargach (≥ 0,3% wysyłek) albo przy 10 lub więcej twardych bounce'ach (≥ 5%) w ciągu 7 dni.

## Harmonogram

Zarówno silnik przypomnień, jak i zbiorcze podsumowania powiadomień działają na istniejących timerach cyklicznych, zamiast wprowadzać nową infrastrukturę:

| Timer | Harmonogram | Uruchamia |
|-------|-------------|-----------|
| Timer 30-minutowy | co 30 minut | Eskaluje nieprzeczytane powiadomienia; wysyła e-maile z podsumowaniem o częstotliwości `individual`; wysyła należne wystąpienia przypomnień (`ReminderEngine.scan`); powiadomienia o zatwierdzeniach; należne wykonania automatyzacji |
| Timer nocny | 05:00 UTC | Przypomnienia o frekwencji w grupach; przesuwanie cyklicznych nabożeństw transmitowanych; odświeżanie list z automatycznym odświeżaniem; rozwijanie wystąpień przypomnień na następny horyzont (`ReminderEngine.expandAll`); wysyła e-maile z podsumowaniem o częstotliwości `daily` |

Lokalnie tę samą logikę można uruchomić na żądanie poleceniami `npm run timer:30min` i `npm run timer:midnight` z projektu `Api`.

## Spis plików

| Obszar | Pliki |
|--------|-------|
| Ścieżka powiadomień | `Api/src/modules/messaging/helpers/NotificationHelper.ts`, `PreferenceGateHelper.ts`, `NotificationCategoryHelper.ts`, `WebPushHelper.ts`, `ExpoPushHelper.ts`, `SocketHelper.ts`, `DeliveryHelper.ts` |
| Punkt wejścia współdzielony | `Api/src/shared/helpers/NotificationService.ts` |
| Wejście transakcyjne | `Api/src/shared/helpers/TransactionalEmailHelper.ts`, reguła lint `Api/tools/eslint-rules/email-door.cjs` |
| Limity e-maili kościoła | `Api/src/shared/helpers/ChurchEmailLimiter.ts`, `Api/src/lambda/ses-feedback-handler.ts`, `Api/src/modules/messaging/repositories/DeliveryLogRepo.ts` |
| Silnik przypomnień | `Api/src/modules/messaging/helpers/ReminderEngine.ts`, `ReminderBootstrap.ts`, `helpers/adapters/*`, `controllers/ReminderController.ts` |
| SMS / rezygnacja STOP | `Api/src/modules/messaging/helpers/SmsOptOutHelper.ts`, `controllers/TextingController.ts` (`/status`, `/inboundUrl`, `/inbound/:churchId/:token`), `Api/src/modules/doing/helpers/MatrixTextHelper.ts` (wysyłka **Text Volunteers** z przeglądu służby) |
| Repozytoria przypomnień | `Api/src/modules/messaging/repositories/ReminderDefinitionRepo.ts`, `ReminderOccurrenceRepo.ts`, `ReminderSentLogRepo.ts` |
| E-maile służby/planu | `Api/src/modules/doing/helpers/PlanReminderEmailHelper.ts`, `ReminderTokenHelper.ts`, `Api/src/shared/modules/DoingModuleGateway.ts` |
| Edytory przypomnień (B1Admin) | `serving/components/PlanTypeReminderEdit.tsx`, `calendars/components/EventReminderEdit.tsx`, `serving/tasks/components/TaskReminderEdit.tsx`, `hooks/useTextingEnabled.ts` |
| Edytor przypomnień / preferencje (B1App) | `EventReminderEdit.tsx`, `NotificationPrefsPage.tsx`, `useRealtimeNotifications.ts` |

## Powiązane strony

- [Architektura czasu rzeczywistego](../realtime): protokół WebSocket i prymitywy po stronie klienta (`SocketHelper`, `SubscriptionManager`, `ConversationStore`), na których opiera się dostarczanie w aplikacji
- [Powiadomienia Web Push](../web-push): konfiguracja VAPID i ścieżka przeglądarkowego Push API używana na poziomie eskalacji push
- [Endpointy messaging](../api/endpoints/messaging): pełna powierzchnia REST dla wiadomości, konwersacji, połączeń oraz tras powiadomień i przypomnień
