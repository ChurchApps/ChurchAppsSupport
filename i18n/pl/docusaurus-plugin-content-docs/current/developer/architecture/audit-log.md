---
title: "Dziennik audytu i cofalne partie"
---

# Dziennik audytu i cofalne partie

<div class="article-intro">

Każda operacja modyfikująca dane, wykonana przez użytkownika w Api, jest rejestrowana: kto, co, kiedy i skąd. Dotyczy to wszystkich modułów i nie wymaga konfigurowania poszczególnych kontrolerów. Na tym rejestrze działa warstwa partii. Import lub działanie zbiorcze można oznaczyć jako partię, a następnie **cofnąć** wiersz po wierszu, w stylu Planning Center. Oba elementy znajdują się w jednej tabeli `auditLogs` w bazie danych członkostwa i są sterowane z jednego punktu, `BaseController.actionWrapper`. Ta strona opisuje, co jest audytowane, gdzie przechowywane są dane, jakie kompromisy wydajnościowe na tym wpływają oraz jak cofnięcie bezpiecznie odwraca partię bez transakcji obejmujących kilka baz danych.

</div>

## Przegląd

```
every mutating request (POST/PUT/PATCH/DELETE)
        │
        ▼
BaseController.actionWrapper ──▶ derive {module, entityType, category, action}
        │                         from req.baseUrl + method  (AUDIT_REGISTRY = overrides/opt-outs only)
        │
        ├─ normal mode ─────────▶ run action ─▶ await AuditLogHelper.log(after-values)  ──┐
        │                                        (deletes also capture a before-image)     │
        │                                                                                  ▼
        └─ X-Batch-Id present ──▶ snapshot before-images (strict) ─▶ run action ─▶ audit rows tagged batchId
                                                                                           │
                                                                                           ▼
                                                             auditLogs  (membership DB, one table, all modules)
                                                                                           │
   POST /membership/batches/:id/undo ──▶ BatchUndoHelper ──▶ walk rows reverse, per entity ┘
                                          conflict guard → restore / delete / re-insert
```

Dwa strukturalne założenia determinują wszystko, co opisano poniżej:

1. **Warstwa kontrolerów jest jedynym miejscem, które zna autora zmiany.** Repozytoria nigdy nie widzą `AuthenticatedUser`; tylko kontrolery przechowują `au`. Kontrolery wszystkich modułów już przechodzą przez `BaseController.actionWrapper`, więc audyt jest podłączony właśnie tam i nie trzeba zmieniać sygnatur żadnego repozytorium.
2. **Jedna tabela obsługuje wszystkie moduły.** Wpisy audytu dla darów, obecności, treści itd. trafiają do tabeli `auditLogs` w bazie członkostwa za pośrednictwem `RepoManager.getRepos("membership")`, nawet gdy zapis pochodzi z kontrolera spoza modułu członkostwa. Zapytanie „Wszystko, co Jane zmieniła dzisiaj" pozostaje więc jednym zapytaniem.

## Co jest audytowane

Audyt jest **włączony domyślnie** dla każdego czasownika modyfikującego na każdej trasie. `actionWrapper` wyprowadza pola audytu z żądania bez konfiguracji dla poszczególnych tras:

| Pole | Wyprowadzane z |
|------|----------------|
| `module` | `this.moduleName` (moduł będący właścicielem) |
| `entityType` | liczba pojedyncza ostatniego segmentu `req.baseUrl` (np. `/membership/people` → `person`) |
| `category` | domyślnie równa `entityType` |
| `action` | `${entityType}_saved` dla `POST /`, `${entityType}_deleted` dla `DELETE /:id`, w pozostałych przypadkach `${entityType}_${method}:${routePath}`, dzięki czemu podtrasy niezwiązane z CRUD (np. `task_post:/:id/move`) są rejestrowane automatycznie |

`BaseController.AUDIT_REGISTRY` służy **wyłącznie do nadpisywania ustawień i wyłączeń**. Nie jest listą dozwolonych elementów. Trasa pojawia się w tym rejestrze, aby zmienić jej `category` lub `entityType`, zadeklarować `{ dbModule, table }` (co umożliwia partie i cofanie), oznaczyć ją jako `sensitive` (audytowanie anonimowych zmian) albo wyłączyć za pomocą `optOut: true`.

**Lista wyłączeń** (ścieżki zapisu o dużym natężeniu, które zalałyby rejestr): `visits`, `visitsessions`, `sessions` i `checkin` w module obecności (niedzielny szturm na check-in) oraz `messages`, `connections` i `devices` w module wiadomości (czat i status obecności). Wszystko inne jest rejestrowane.

**Punkty końcowe operacji zbiorczych** (`people/bulk-delete`, `people/bulk-update`, `groupmembers/bulk-add`, `groupmembers/bulk-remove`) są zarejestrowane w `BULK_ROUTES` i tworzą **jeden wiersz audytu dla każdego dotkniętego identyfikatora**. Import 10 000 osób generuje więc 10 000 wierszy. Ta szczegółowość na poziomie encji właśnie sprawia, że partię można cofnąć.

**Anonimowe zmiany** (`actionWrapperAnon`, czyli anonimowe dary, rejestracja gości i przesyłanie formularzy) są audytowane tylko dla tras oznaczonych w rejestrze jako `sensitive`. Zapisywane są z `userId="anonymous"` oraz adresem IP klienta. Na czele listy są dary, a ta ścieżka ma już za sobą realną historię regresji.

### Redakcja danych wrażliwych i limity rozmiaru

Zanim jakikolwiek ładunek `details` zostanie zapisany, `AuditLogHelper.capDetails()` uruchamia na nim `sanitizeValue()`:

- **Klucze wrażliwe są redagowane.** Każde pole, którego nazwa zapisana małymi literami znajduje się w `SENSITIVE_KEYS` (`password`, `token`, `cvv`, `cardnumber`, `routing_number`, `accesstoken`, `clientsecret` i inne), zostaje zastąpione wartością `"[redacted]"`.
- **Duże wartości skalarne są usuwane.** Każdy identyfikator `data:` URI oraz każdy ciąg dłuższy niż 4 KB (zdjęcia w base64, bloby) zostaje zastąpiony wartością `"[stripped]"`.
- **Zbyt duże wiersze są ograniczane.** Jeśli zserializowany JSON przekracza około 64 KB, cały ładunek zostaje zastąpiony obiektem `{ truncated: true }`. Obcięte wiersze nadal można przeglądać, ale **nie można ich cofnąć**, ponieważ nie ma obrazu sprzed zmiany ani po zmianie, z którego można by przywrócić dane.

## Gdzie znajdują się dane

Jedna tabela `auditLogs` w bazie **członkostwa** obsługuje wszystkie moduły. Kolumny: `id, churchId, userId, category, action, entityType, entityId, details (MEDIUMTEXT JSON string), ipAddress, module, batchId, created`. Migracja `tools/migrations/membership/2026-07-04_audit_universal.ts` dodaje kolumny `module` i `batchId`, zmienia typ kolumny `details` z `TEXT` na `MEDIUMTEXT`, dodaje indeksy `ix_auditLogs_batch (batchId)` oraz `ix_auditLogs_entity (churchId, module, entityType, entityId, created)` i tworzy tabelę `batches`. Kolumna `module` istnieje właśnie po to, by kolizje `entityType` między modułami (`note` i `setting` występują w kilku) dało się nadal filtrować. Indeks encji zasila zarówno historię dla pojedynczej encji, jak i zabezpieczenie przed konfliktami przy cofaniu.

Zapisy między modułami przechodzą przez `RepoManager.getRepos("membership")` z wnętrza wrappera. Kolejność jest celowa: **główny zapis zostaje zatwierdzony najpierw w bazie modułu, a wpis audytu dopiero potem.** W trybie normalnym błąd wstawienia wpisu audytu jest wyciszany (`console.error`, a Sentry go wychwytuje). Audyt ma charakter doradczy i nigdy nie może spowodować niepowodzenia żądania użytkownika. W **trybie partii** jest on ścisły (zobacz niżej).

:::info Dlaczego nie wyzwalacze, CDC ani osobne tabele dla modułów?
- **Wyzwalacze MySQL** nie znają użytkownika wykonującego operację (połączenie nie ma `au`), a ich utrzymanie oznaczałoby zestawy wyzwalaczy dla każdego schematu.
- **binlog / CDC** to osobny projekt infrastrukturalny z tym samym problemem tożsamości autora.
- **Przekazywanie `userId` przez każde repozytorium** wymagałoby zmian w setkach plików, aby przenieść informację, którą warstwa kontrolerów już posiada.
- **Osobne tabele audytu dla modułów** oznaczałyby siedmiokrotnie więcej kodu infrastrukturalnego i zapytania rozproszone dla każdego pytania obejmującego kilka modułów. Jedna tabela w punkcie węzłowym kontrolerów to rozwiązanie wymagające najmniej kodu, które nadal rejestruje autora.
:::

## Założenia dotyczące wydajności

Ścieżka krytyczna jest celowo tania. Koszt ponosimy tylko tam, gdzie daje to realną korzyść.

- **Brak odczytu przed zapisem przy zwykłych aktualizacjach.** Zwykły zapis **nie** wczytuje starego rekordu. **Przesłane wartości po zmianie** są zapisywane w `details.after`. Interfejs odtwarza zmianę z wartości starej na nową w momencie *wyświetlania*, porównując z poprzednim wpisem audytu danej encji. Jedno zapytanie w chwili wyświetlania, zero kosztu w chwili zapisu. Pola, których nie zmieniano od uruchomienia, po prostu nie pokazują „starej" wartości, co jest akceptowalne.
- **Usunięcia zapisują obraz sprzed zmiany.** `DELETE /:id` na trasie z rejestru, która ma `{ dbModule, table }`, najpierw generycznie wczytuje wiersz i zapisuje go w `details.before`. Usunięcia są rzadkie, a obraz sprzed zmiany stanowi całą wartość dowodową.
- **Tryb partii jest jedynym systematycznym odczytem przed zapisem**, i jest on opcjonalny. Operacja zbiorcza lub import jest już kosztowna, więc N odczytów migawek to cena możliwości cofnięcia.
- **Wstawienia do audytu są oczekiwane (awaited).** `actionWrapper` zbiera obietnice zapisów audytu i wywołuje `await Promise.allSettled(...)` przed zwróceniem odpowiedzi. To najważniejszy niezmiennik: w Lambda kontener **zostaje zamrożony w chwili zwrócenia odpowiedzi**, więc nieoczekiwane wstawienie zostaje po cichu utracone. „Odpal i zapomnij" oznacza tu, że *błędy nigdy nie przerywają żądania*, a nie że *nie należy czekać*. Pojedyncze wstawienie do już rozgrzanej puli połączeń członkostwa trwa około 1–3 ms.

## Partie i cofanie

**Partia** grupuje zestaw zmian, dzięki czemu można je razem przejrzeć i odwrócić. Istnieją dwa sposoby jej otwarcia:

- **Jawnie:** `POST /membership/batches { label, source }` zwraca `batchId`. Klient (B1Transfer, interfejs importu w B1Admin) wysyła następnie `X-Batch-Id: <id>` przy każdym kolejnym zapisie lub usunięciu. `POST /membership/batches/:id/complete` zamyka partię i zapisuje `itemCount`.
- **Niejawnie:** cztery punkty końcowe operacji zbiorczych same otwierają, wypełniają i zamykają swoją partię w obrębie jednego żądania, zwracając `batchId` w odpowiedzi.

Tabela `batches` (baza członkostwa): `id, churchId, userId, label, source, status (open|completed|undone|partial|failed), itemCount, created, completedAt, undoneAt`.

### Tryb partii jest ścisły

Gdy obecny jest `X-Batch-Id`, `actionWrapper` zaostrza każde zabezpieczenie (`writeBatchAuditRows`):

1. Partia musi istnieć, mieć status `open` i należeć do `au.churchId`. W przeciwnym razie zwracany jest błąd **403**.
2. Trasa musi obsługiwać partie (`{ dbModule, table }` w rejestrze). W przeciwnym razie zwracany jest błąd **400**.
3. Przed wykonaniem akcji obrazy sprzed zmiany dla wszystkich dotkniętych identyfikatorów są wczytywane jednym zapytaniem `WHERE id IN (...) AND churchId = ?`. Jeśli odczyt migawki się nie powiedzie, żądanie kończy się błędem **500** i akcja **nie zostaje wykonana**. Tryb partii nigdy nie może po cichu wytworzyć rejestru, którego nie da się cofnąć. (Tryb normalny natomiast działa w sposób najlepszy z możliwych i wycisza błędy migawek.)
4. Po pomyślnym wykonaniu akcji zapisywany jest jeden wiersz audytu na encję, z `batchId`, `details.before` i `details.after`, a także wyraźny **znacznik utworzenia** dla wierszy utworzonych przez partię.

### Cofanie

`POST /membership/batches/:id/undo` (uprawnienie: twórca partii lub `Permissions.server.admin`). Żądanie jest odrzucane, jeśli partia nie ma statusu `completed` albo jest starsza niż **30-dniowe okno cofania**. `BatchUndoHelper.undo()` następnie:

1. Wczytuje wiersze audytu partii i **grupuje je według `(module, entityType, entityId)`**. Encja zmieniona kilkukrotnie w obrębie jednej partii zostaje cofnięta **raz**, do jej prawdziwego stanu sprzed partii: do najwcześniejszego obrazu sprzed zmiany lub do usunięcia, jeśli partia ją utworzyła. Dlatego cofanie nie odtwarza naiwnie każdego wiersza z osobna. Przywrócenie pośredniej migawki z wnętrza partii byłoby błędne.
2. Dla każdej encji najpierw uruchamia **zabezpieczenie przed konfliktem**: `auditLog.hasLaterModification()` sprawdza, czy istnieje jakikolwiek *późniejszy* wpis audytu dla tej samej pary `(module, entityType, entityId)` spoza tej partii. Jeśli tak, encja została zmieniona po imporcie. Jest ona **pomijana i zgłaszana**, nigdy nie jest nadpisywana. Samo dziennik audytu służy tu jako detektor modyfikacji, więc żadna tabela nie potrzebuje kolumn `modifiedAt`.
3. Odwraca zmianę zgodnie z zapisaną operacją, pobierając `{ dbModule, table }` z rejestru i używając generycznych zapisów Kysely:
   - **created** → trwale usuwa wiersz.
   - **updated** → zapisuje z powrotem `details.before`.
   - **deleted** → ponownie wstawia `details.before` (aktualizuje lub wstawia, jeśli wiersz o tym identyfikatorze się pojawił ponownie).
4. Samo cofnięcie jest audytowane (`action: "<entityType>_undone"`, bez `batchId`). Cofnięcie cofnięcia jest poza zakresem.

Operacja jest wybierana na podstawie jawnego **znacznika utworzenia**, a nie wnioskowana z brakującego obrazu sprzed zmiany. Prawidłowo pusty obraz sprzed zmiany lub obcięty wiersz nie mogą zostać pomylone z utworzeniem.

Wynik ma postać `{ restored, skippedConflicts: [...], failed: [...], status }`. Partia przechodzi do statusu `undone` (czyste cofnięcie) lub `partial`. **Nie ma transakcji obejmującej kilka baz danych.** Cofanie działa w sposób najlepszy z możliwych, wiersz po wierszu. Jest to to samo ograniczenie, które Planning Center opisuje dla scalonych profili.

:::warning Encje z efektami ubocznymi wymagają haka `onUndo`
Odwrócenie utworzenia `groupMember` musi również zapisać `groupMemberHistory` (jako „left"), inaczej analityka rotacji cicho przestanie działać. Jest to stały niezmiennik obszaru roboczego. Takie encje rejestrują w `AUDIT_REGISTRY` callback `onUndo`, który zwraca `true`, gdy w pełni obsłużył cofnięcie, i omija generyczną ścieżkę. `groupMembers` jest kanonicznym przykładem. Na jawnej ścieżce są identyfikowane po identyfikatorze wiersza, a na punktach końcowych operacji zbiorczych po `personId`. Historia jest śledzona przy każdym dodaniu i usunięciu.
:::

## Powierzchnie dla użytkowników

Obie powierzchnie administracyjne są **w trakcie realizacji**. Zamierzenia są następujące:

| Powierzchnia | Repozytorium | Cel |
|--------------|--------------|-----|
| **Strona dziennika audytu** | B1Admin (ManageChurch → Audit Log) | Filtrowanie według modułu, kategorii, użytkownika i encji oraz wyświetlanie zmian ze starej na nową wartość. Dla edycji różnica liczona jest względem poprzedniego wpisu encji, dla usunięć z `details.before`. Obsługiwane przez `GET /membership/auditlogs`, dostęp wymaga `Permissions.server.admin`. |
| **Strona partii** | B1Admin (ten sam obszar Settings) | Lista partii ze statusami i liczbami, **Wyświetl wyniki** (wiersze audytu partii przez `GET /membership/batches/:id/results`) oraz przycisk **Cofnij**, który wyświetla raport pominiętych konfliktów i błędów. |
| **Partie importu** | B1Transfer | Otwarcie partii, wysyłanie `X-Batch-Id` przy zwykłych zapisach i zamknięcie partii na końcu. Dzięki temu importy można cofać bez nowych punktów końcowych importu. Dotychczasowy `importKey` pozostaje jako znacznik pochodzenia obejmujący wyłącznie tworzenie. Do cofania został zastąpiony. |

## Pułapki, których przyszła zmiana nie może cofnąć

- **Wstawienia do audytu muszą pozostać oczekiwane.** Nieoczekiwane wywołanie `AuditLogHelper.log(...)` zostaje utracone przy zamrożeniu w Lambda. Zbieraj obietnice i wywołuj `await Promise.allSettled` przed zwróceniem odpowiedzi.
- **Kysely pomija `undefined` w `.set()` i `.values()`.** Przy przywracaniu wyczyszczona kolumna przetrwałaby bez zmian. `BatchUndoHelper` zamienia każde nieobecne pole na jawne `null` (`nullify`). Nigdy nie omijaj tego mechanizmu dla „szybszego" bezpośredniego zapisu.
- **Retencja musi pozostać znacznie dłuższa niż okno cofania.** `AuditLogRepo.deleteOld()` działa w nocnym zegarze (domyślna retencja to 365 dni), a okno cofania wynosi 30 dni. Jeśli retencja kiedykolwiek zbliży się do tego okna, dzienniki cofania zostaną usunięte spod otwartych partii.
- **Obcięte wiersze nie podlegają cofnięciu.** Ładunek `{ truncated: true }` nie ma obrazu sprzed zmiany ani po zmianie. Cofanie zgłasza go jako `failed` i nigdy nie zgaduje wartości.
- **Kolejność to najpierw zapis modułu, potem audyt.** Nigdy nie przenoś wstawienia do audytu przed rzeczywisty zapis i zachowuj tryb ścisły w partii oraz doradczy w trybie normalnym.

## Spis plików

| Obszar | Pliki |
|--------|-------|
| Wrapper / rejestr | `Api/src/shared/infrastructure/BaseController.ts` (`AUDIT_REGISTRY`, `BULK_ROUTES`, `actionWrapper`, `actionWrapperAnon`, migawka i zapis wierszy) |
| Silnik cofania | `Api/src/shared/infrastructure/BatchUndoHelper.ts` |
| Pomocnik audytu | `Api/src/modules/membership/helpers/AuditLogHelper.ts` (`log`, `capDetails`/`sanitizeValue`, `diffFields`, `getClientIp`) |
| Kontrolery | `Api/src/modules/membership/controllers/AuditLogController.ts`, `BatchController.ts` |
| Modele / repozytoria | `Api/src/modules/membership/models/AuditLog.ts`, `Batch.ts`; `repositories/AuditLogRepo.ts` (`loadFiltered`, `loadForBatch`, `hasLaterModification`, `deleteOld`), `BatchRepo.ts` |
| Migracja | `Api/tools/migrations/membership/2026-07-04_audit_universal.ts` |
| Interfejs administracyjny (w trakcie) | Strony B1Admin Audit Log i Batches; nagłówek partii importu w B1Transfer |

## Powiązane strony

- [Struktura modułów](../api/module-structure) — jak kontroler spoza modułu członkostwa dociera do repozytoriów członkostwa przez `RepoManager`
- [Dary](./giving) — ścieżki zapisu darów, które są audytowane jako `sensitive`, nawet gdy są anonimowe
- [Endpointy członkostwa](../api/endpoints/membership) — interfejs REST, który przenosi `X-Batch-Id` i udostępnia `/auditlogs` oraz `/batches`
