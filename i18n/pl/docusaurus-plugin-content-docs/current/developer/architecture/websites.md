---
title: "Routing witryn i wiele witryn"
description: "Jak B1.church mapuje subdomeny i domeny własne na właściwy kościół lub witrynę pomocniczą, oraz brzeg Caddy obsługujący TLS dla domen własnych."
---

# Routing witryn i wiele witryn

<div class="article-intro">

Jeden kościół może teraz obsługiwać więcej niż jedną witrynę, a każda z nich może działać pod subdomeną `*.b1.church` lub pod w pełni własną domeną należącą do kościoła. Ta strona opisuje warstwę routingu działającą *pod* kreatorem: jak przychodzące żądanie trafia do kościoła **i** do konkretnej witryny, model danych dla wielu witryn (wartość `siteId` jako znacznik, dzięki któremu wszystkie wcześniej istniejące witryny działają bez zmian) oraz brzeg sieci dla własnych domen, czyli samodzielnie zarządzany serwer proxy Caddy na EC2, który kończy połączenia TLS i przekierowuje każdą domenę kościoła na jej upstream `*.b1.church`. Informacje o tym, co faktycznie jest renderowane po rozwiązaniu żądania (drzewo stron, sekcji i elementów), znajdziesz w artykule [Kreator stron](./website-builder.md).

</div>

## Przegląd

```
   grace.b1.church              www.gracechurch.org  (własna domena)
   (subdomena b1.church)                  │
          │                               ▼
          │             ┌──────────────────────────────────────────┐
          │             │ Brzeg Caddy — EC2 3.23.251.61            │
          │             │             (proxy.b1.church)            │
          │             │  • kończy TLS (certyfikat LE per domena) │
          │             │  • przepisuje Host → {sub}.b1.church     │
          │             │  • przekierowuje do B1App                │
          │             └────────────────────┬─────────────────────┘
          │                  Host = {sub}.b1.church
          ▼                                  ▼
   ┌────────────────────────────────────────────────────────────┐
   │ B1App src/middleware.ts                                     │
   │  • zawsze: usuwa x-site dostarczony przez klienta (anty-spoof) │
   │  • wewnętrzny Host *.b1.church ⇒ wyszukiwanie domen pozostaje nieaktywne │
   │  • surowy własny Host (z pominięciem Caddy) ⇒ wyszukiwanie → ustawia x-site │
   └───────────────────────────┬────────────────────────────────┘
                               ▼  next.config.mjs → pierwsza etykieta hosta → /[sdSlug]/…
              ┌─────────────────────────────────────────────────┐
              │ [sdSlug] · ConfigHelper.load(sdSlug)             │
              │   GET /membership/churches/lookup/?subDomain=…   │
              │   → { id, name, subDomain, siteId? }             │
              │   przekazuje ?siteId= do każdego wywołania treści: │
              │   /content/pages/:id/tree · /globalStyles ·      │
              │   /blocks/public/footer · /links · sitemap       │
              └─────────────────────────────────────────────────┘

  zapis/usunięcie domeny (B1Admin Ustawienia→Domeny → POST /membership/domains)
        └─ best-effort CaddyHelper.updateCaddy()  (opakowane, bez błędu krytycznego, limit 10s)
  Caddy sam odczytuje tabelę domen przez dwa anonimowe endpointy:
        GET /membership/domains/authorize  — `ask` dla TLS na żądanie (200 znana / 404 nieznana)
        GET /membership/domains/hostmap    — mapa host→{sub}.b1.church (odświeżanie co 5 min)
```

W tej warstwie obowiązują trzy zasady:

1. **Znacznik zapewnia zgodność wsteczną.** `siteId = ''` oznacza główną witrynę. Każda strona, blok, link, styl globalny i wiersz domeny, które istniały przed tą funkcją, mają wartość `''` i są renderowane dokładnie tak jak dotychczas. *Druga* witryna to po prostu zestaw wierszy z niepustym `siteId`, a każdy endpoint treści wywołany bez `?siteId=` zwraca główną witrynę, czyli dokładnie to samo żądanie co dawniej, bajt w bajt.
2. **Rozwiązywanie opiera się na etykiecie hosta i jest zbieżne.** Subdomena `*.b1.church` jest kierowana bezpośrednio po swojej etykiecie hosta. Własna domena jest na brzegu sieci przepisywana na etykietę `{sub}.b1.church`, zanim B1App ją zobaczy (a jako rezerwa, gdy żądanie trafia z surowym własnym `Host`, middleware wykonuje wyszukiwanie w bazie i ustawia nagłówek `x-site`). Obie ścieżki trafiają na tę samą trasę `[sdSlug]` i to samo wywołanie `churches/lookup`, więc dalsze renderowanie jest identyczne.
3. **Brzeg sieci Caddy jest bezstanowy, a źródłem prawdy jest jedna tabela.** Własne domeny kończą TLS na samodzielnie zarządzanym serwerze proxy Caddy na EC2, który przepisuje każdą domenę na jej upstream `{sub}.b1.church`. Zapis domeny wywołuje jedno best-effort `CaddyHelper.updateCaddy()`, a Caddy dodatkowo odczytuje tabelę `domains` bezpośrednio (endpointy `authorize` i `hostmap` opisane poniżej). Tabela jest autorytatywna, więc niedostępny Caddy nigdy nie może spowodować błędu zapisu.

## Rozwiązywanie witryny

### Subdomeny `*.b1.church`

`B1App/next.config.mjs` przepisuje przychodzące żądania według hosta. Reguła hosta z wzorcem `(?<subdomain>.*?)\..*` przechwytuje **pierwszą etykietę** hosta i przepisuje `/` oraz `/:path*` na `/{subdomain}`, czyli na segment App Router `[sdSlug]`. Zatem `grace.b1.church/about` staje się `/grace/about`.

Wewnątrz `src/app/[sdSlug]/` funkcja `ConfigHelper.load(sdSlug)` (`src/helpers/ConfigHelper.ts`) wywołuje `GET /membership/churches/lookup/?subDomain={sdSlug}`. Odpowiedź `ChurchController.getBySubDomain` ma teraz dwie gałęzie:

| Slug pasuje do | Odpowiedź | Znaczenie |
|----------------|-----------|-----------|
| `churches.subDomain` | `{ id, name, subDomain }` | Główna witryna tego kościoła |
| `sites.subDomain` | `{ id, name, subDomain, siteId }` | **Witryna dodatkowa**: kontroler przechodzi do `sites`, ustala kościół będący właścicielem i zwraca zapytany slug wraz z dodatkowym `siteId` |

Ten dodatkowy `siteId` jest jedyną rzeczą, która odróżnia żądanie do witryny dodatkowej od żądania do głównej; cała reszta procesu jest wspólna.

Slug, który nie pasuje do żadnej z tabel, zwraca `{}` z kodem `200`. `ConfigHelper.load` traktuje odpowiedź bez `id` jako nieznaną witrynę i wywołuje `notFound()` z Next, dzięki czemu nieznana subdomena daje prawdziwy błąd 404, zamiast powodować kolejne wywołania z `/…/undefined`. Trasa strony kreatora buduje też ścieżkę drzewa za pomocą `pageTreePath()` (`src/helpers/pageTreePath.ts`), która koduje slug w URL. Dzięki temu nieprawidłowy slug (ukośniki wsteczne, spacje) kończy się 404 zamiast przekazania błędu `400` z API jako 500.

### Własne domeny

Własna domena kościoła kończy połączenie na **brzegu Caddy** (opisanym poniżej), który przepisuje nagłówek `Host` na `{sub}.b1.church` witryny, zanim żądanie zostanie przekazane do B1App. W typowej ścieżce B1App otrzymuje więc *wewnętrzny* host `*.b1.church` i rozwiązuje go po etykiecie hosta dokładnie tak jak natywną subdomenę. Zapytanie do bazy w middleware nigdy się nie uruchamia. `src/middleware.ts` nadal działa przy każdym żądaniu, ale wykonuje jedno zadanie stałe i jedną rezerwę:

1. **Zawsze** usuwa **dowolny nagłówek `x-site` dostarczony przez klienta**. Ten nagłówek jest podatny na podszywanie się i jest akceptowany wyłącznie wtedy, gdy ustawia go sam middleware. Jego usunięcie to prawdziwe zadanie middleware za Caddy.
2. **Rezerwa, tylko dla niewewnętrznego `Host`**: gdy surowy własny `Host` trafia do B1App *bez* przepisania przez Caddy, middleware wywołuje `GET /membership/domains/public/lookup/{host}` i jeśli odpowiedź zawiera `subDomain`, ustawia `x-site: {subDomain}.b1.church`. Za Caddy ta gałąź jest nieaktywna, ponieważ `Host` jest już `*.b1.church`.

Hosty wewnętrzne, czyli `localhost`, `b1.church` oraz sufiksy `.b1.church`, `.localtest.me`, `.localhost`, `.up.railway.app` i `.vercel.app`, całkowicie pomijają wyszukiwanie. Są już rozwiązane przez przepisanie na podstawie etykiety hosta albo są hostami podglądowymi lub wdrożeniowymi.

Samo wyszukiwanie (`DomainRepo.loadByName`) wykonuje `LEFT JOIN` tabel `domains → churches` i `domains → sites` i zwraca `COALESCE(NULLIF(sites.subDomain,''), churches.subDomain)`, czyli subdomenę przypisanej witryny dodatkowej, jeśli domena wskazuje na taką witrynę, a w przeciwnym razie subdomenę kościoła. Najpierw szuka dokładnego hosta. Jeśli host zaczynał się od `www.` i nic nie znalazł, ponawia wyszukiwanie **jednokrotnie** dla domeny głównej (apex).

W `next.config.mjs` reguły przepisywania `x-site` są umieszczone **przed** ogólnymi regułami hosta, więc mają pierwszeństwo. `x-site: grace.b1.church` → pierwsza etykieta `grace` → `[sdSlug] = grace`, a dalsze rozwiązywanie jest identyczne jak w przypadku subdomeny (to samo `churches/lookup` i ten sam `siteId`).

:::info
Nagłówek `x-site` nie jest zaufany z zewnątrz. Middleware bezwarunkowo usuwa każdy przychodzący `x-site`, zanim ewentualnie ustawi własny, a reguły przepisywania widzą wyłącznie wartość ustawioną przez middleware. Klient nie może wymusić dostępu do treści innego kościoła, wysyłając nagłówek.
:::

Dwa szczegóły operacyjne dotyczące middleware:

- **Pamięć podręczna.** Wynik dla każdego hosta (trafienie *lub* potwierdzony brak, nigdy błąd sieci) jest przechowywany przez **10 minut** w pamięci, w obiekcie `Map`, w każdej izolacji serverless.
- **Dopasowanie ścieżek (matcher).** Matcher celowo ponownie uwzględnia `/sitemap.xml`, `/robots.txt` i `/manifest.webmanifest`. Jego pierwszy wzorzec wyklucza ścieżki z kropką, co mogłoby pominąć te pliki. Dodano je z powrotem, dzięki czemu pliki SEO/PWA poszczególnych kościołów na własnych domenach również otrzymują nagłówek `x-site`.
- **Nagłówek kanoniczny.** Dla stron kościołów middleware dołącza do odpowiedzi nagłówek `Link: <{proto}://{host}{path}>; rel="canonical"`, który wskazuje host, z którego strona faktycznie została zwrócona: subdomenę lub własną domenę (`helpers/canonicalLink.ts`). Gdy własna domena trafia do B1App przez [proxy Caddy](../deployment/caddy-proxy.md), host żądania to subdomena `{sub}.b1.church`, więc middleware zamiast tego używa domeny odwiedzającego z `X-Church-Host`, ale dopiero po tym, jak `/domains/public/lookup/{host}` potwierdzi, że domena wskazuje na tę samą subdomenę (`ownsSubdomain()`). Link kanoniczny, `robots.txt` i `sitemap.xml` wskazują wtedy własną domenę, a nie subdomenę `b1.church`. Na hostach niekościelnych (`b1.church`, `localhost`, `*.vercel.app`, `*.up.railway.app`) oraz na ścieżkach `/mobile`, `/login`, `/logout` i wygenerowanych plikach robots/sitemap/manifest ten nagłówek jest pomijany.

### Wyłączona strona publiczna

Kościół może włączyć opcję **Wyłącz publiczną stronę** w B1Admin (ustawienie treści na poziomie kościoła `hidePublicSite = "true"`). Witryna wtedy obsługuje wyłącznie trasy przeznaczone dla członków:

- **Middleware B1App** wyszukuje subdomenę (najpierw `/membership/churches/lookup`, potem `/content/settings/public/:churchId`) i przekierowuje anonimowe żądania do dowolnej ścieżki spoza listy dozwolonych na `/login?returnUrl={path}{query}`. Lista dozwolonych (`helpers/publicSite.ts`) obejmuje `/login`, `/logout`, `/mobile/*`, `/register/*`, `/guest-register` oraz pliki manifest/robots/sitemap. W środowisku produkcyjnym cache przechowuje wyłącznie potwierdzone odpowiedzi, przez 60 sekund, ponieważ wywołanie rewalidacji z panelu administratora nie może wyczyścić tej mapy dla poszczególnych instancji. W środowisku deweloperskim i testowym cache nie jest używany. Błąd API powoduje wyświetlenie witryny, a nie zablokowanie wszystkich użytkowników.
- **Zalogowani członkowie widzą pełną witrynę.** Żądanie z ważnym, niewygasłym ciasteczkiem `jwt` (funkcja `hasSession()` w middleware odczytuje pole `exp` z ładunku bez weryfikacji podpisu; to miękka bramka, a nie kontrola dostępu) pomija przekierowanie. Dzięki temu po zalogowaniu członek wraca na stronę, o którą prosił, i widzi zwykłe strony, wbudowane strony (Grupy, Kazania itd.) oraz nawigację nagłówka. Komponenty stron i `Header` nie sprawdzają już samodzielnie `hidePublicSite`.
- **`robots.txt`** blokuje wszystko, tak jak na hostach z `noindex`.
- **API.** `GET /content/pages/public/:churchId` (lista stron dla mapy witryny) zwraca `[]`, dzięki czemu anonimowi klienci nie mogą wylistować stron.

### Przekazywanie `siteId`

`ConfigHelper` zapisuje rozpoznany `siteId` w swoim obiekcie `ConfigurationInterface` przypisanym do żądania (zapamiętanym za pomocą `cache()` z React) i dopisuje `?siteId=` do wywołań treści, które on sam i komponenty stron wykonują, ale **warunkowo**: pusty `siteId` (subdomena głównego kościoła) całkowicie pomija parametr. Obsługiwane endpointy to drzewo stron (`/content/pages/:id/tree`), publiczna lista stron używana przez mapę witryny (`/content/pages/public/:id`), style globalne (`/content/globalStyles/church/:id`), linki nawigacyjne (`/content/links/church/:id`) oraz samodzielny blok stopki (`/content/blocks/public/footer/:id`). W zwykłej ścieżkach renderowania stopka trafia do drzewa stron (sekcje oznaczone `zone: "siteFooter"`), pobrane już z `siteId`, więc nie ma żadnej luki, w której stopka byłaby pobierana bez zakresu.

Portal członków (B1App `mobile`) celowo pozostaje poza tym mechanizmem: `loadChurchAppearance.ts` rozpoznaje kościół za pomocą `churches/lookup`, ale odczytuje ustawienia na poziomie kościoła z `/settings/public/{id}` i nigdy nie przekazuje `siteId`. W wersji 1 portal obejmuje cały kościół (zob. niżej).

## Wiele witryn w jednym kościele

### Model danych

Nowa tabela `membership.sites` jest celowo bardzo prosta:

| Kolumna | Typ | Uwagi |
|---------|-----|-------|
| `id` | `char(11)` PK | |
| `churchId` | `char(11)` | Kościół będący właścicielem |
| `name` | `varchar(255)` | Nazwa wyświetlana (np. „Español”, „Youth”) |
| `subDomain` | `varchar(45)` | **Unikalny indeks** — globalna przestrzeń nazw (poniżej) |

Przypisanie witryny to pojedyncza kolumna dodana do tabel treści i domen, bez wartości pustych (NULL):

| Tabela (moduł) | Kolumna | Co oznacza `''` |
|----------------|---------|-----------------|
| `domains` (membership) | `siteId char(11) NOT NULL DEFAULT ''` | Domena obsługuje główną witrynę |
| `pages`, `links`, `globalStyles`, `blocks` (content) | `siteId char(11) NOT NULL DEFAULT ''` | Główna witryna, a w przypadku **`blocks`** `''` dodatkowo oznacza *wspólne dla wszystkich witryn* |

Za wszystko to odpowiadają dwie migracje (`tools/migrations/membership/2026-07-02_sites.ts`, `tools/migrations/content/2026-07-02_site_id.ts`). Ponieważ kolumna ma wartość domyślną `''`, każdy istniejący wiersz zachowuje dotychczasowe działanie bez potrzeby uzupełniania danych.

**Globalna przestrzeń nazw subdomen.** `sites.subDomain` współdzieli *jedną* przestrzeń nazw z `churches.subDomain`. Subdomena witryny nigdy nie może kolidować z subdomeną kościoła ani z subdomeną innej witryny. Jest to egzekwowane na **obu** ścieżkach zapisu: `SiteController.save` odrzuca slug występujący w `churches` lub `sites`, a `ChurchController.validateSave` robi to samo w odwrotnym kierunku. Unikalny indeks na `sites.subDomain` gwarantuje to również na poziomie bazy danych.

**Unikalność stron** została poszerzona z `(churchId, url)` do `(churchId, siteId, url)`, dzięki czemu dwie witryny jednego kościoła mogą mieć każda własną stronę `/about`.

### Treści dla każdej witryny, z rezerwami

Każdy endpoint listy lub drzewa treści zależny od witryny przyjmuje opcjonalny parametr `?siteId=` (brak oznacza `''`, czyli główną witrynę): drzewo, listę i publiczne strony; listę bloków, bloki według typu i stopkę; linki (anonimowe, filtrowane i wszystkie) oraz style globalne. Sekcje i elementy *nie* są przypisywane bezpośrednio do witryny, lecz dziedziczą ją przez stronę lub blok nadrzędny.

Dwa łańcuchy rozwiązywania wykonują najciekawszą pracę:

- **Style globalne — `witryna → główna → domyślne`.** `GlobalStyleRepo.loadForChurch(churchId, siteId)` zwraca własny wiersz witryny. Jeśli witryna dodatkowa go nie ma, zwraca **wiersz główny (`''`) bez zmian** (zachowując jego `id`/`siteId`, których klient używa do kopiowania przy zapisie), a jeśli nie ma także wiersza głównego, `GlobalStyleController` zwraca zakodowaną na sztywno domyślną paletę i czcionki.
- **Blok stopki — pierwszeństwo ma witryna, wspólna jest rezerwą.** `BlockRepo.loadByBlockType(churchId, "footerBlock", siteId)` zwraca wiersze wspólne (`''`) *oraz* wiersze przypisane do witryny. Resolver wybiera stopkę witryny, jeśli istnieje, w przeciwnym razie wspólną. Ta sama logika działa zarówno w `TreeHelper.insertBlocks` (drzewo strony), jak i w samodzielnym endpoincie `/content/blocks/public/footer/:churchId`.

### Kaskada usuwania witryny

`SiteController.delete` (wymaga uprawnienia Ustawienia→Edycja w module członkostwa) usuwa witrynę dodatkową w trzech krokach:

1. `ContentModuleGateway.deleteSiteContent(churchId, siteId)` kaskadowo usuwa wszystkie treści należące do witryny: jej **strony** wraz z sekcjami, elementami, `pageHistory` i `posts`; jej własne **bloki** wraz z sekcjami, elementami i `pageHistory`; jej **linki** oraz **style globalne**. Zabezpieczenie odmawia wykonania dla `''`, czyli znacznika głównej/wspólnej witryny, który nigdy nie jest usuwany kaskadowo.
2. `DomainRepo.clearSiteId` **przypisuje ponownie** domeny witryny do głównej (`siteId → ''`), zamiast je usuwać, dzięki czemu własna domena przetrwa usunięcie witryny.
3. Wiersz `sites` zostaje usunięty, a trasy Caddy są ponownie synchronizowane (best-effort).

### Powierzchnia B1Admin

| Funkcja | Gdzie | Mechanizm |
|---------|-------|-----------|
| Przełącznik witryn | `useSiteSelection` + `SiteSwitcher` (puste = „Główna strona”) | Odczytuje parametr URL `?site=` i przekazuje go jako `?siteId=` do wywołań ContentApi. Dostępny na trzech **listach** witryn: **Strony**, **Bloki** i **Wygląd**, ale *nie* w edytorach stron i bloków, które przechowują `siteId` w samym rekordzie |
| Tworzenie i usuwanie witryn | `SitesDialog`, otwierany z pozycji „Zarządzaj witrynami…” w przełączniku | `POST /membership/sites` / `DELETE /membership/sites/:id` (nazwa i subDomain). Wymaga uprawnienia Ustawienia→Edycja w module członkostwa (`Permissions.settings.edit` po stronie serwera; `Permissions.membershipApi.settings.edit` w B1Admin). **Tylko tworzenie i usuwanie, w wersji 1 nie ma interfejsu do zmiany nazwy** |
| Przypisanie domeny do witryny | `DomainSettingsEdit` w Ustawienia→Domeny | Rozwijana lista witryn w każdym wierszu wysyła `siteId` dla każdej domeny do `/membership/domains`. Kolumna jest ukryta, jeśli API nie zwraca witryn (starsza wersja backendu) |
| Kopiowanie przy zapisie stylów | `StylesManager.prepareForSave` | Gdy `siteId` wczytanego wiersza stylów globalnych nie zgadza się z wybraną witryną (czyli API zwróciło odziedziczoną główną witrynę jako rezerwę), usuwa `id` wiersza głównego i wpisuje bieżący `siteId`, wymuszając **wstawienie** nowego wiersza przypisanego do witryny zamiast nadpisania głównego. Ta sama zasada rozgałęzienia dotyczy bloku stopki witryny |

:::info
**Co w wersji 1 pozostaje wspólne dla całego kościoła (to celowy wybór zakresu, a nie ograniczenie modelu danych):** **blog** (`BlogPage` nie ma przełącznika i ładuje `/posts` bez `siteId`), **widżety witryny** (baner ogłoszeń i przycisk otwierający), **przekierowania**, **logo / GA4 / ustawienia kościoła** oraz **portal członków** (B1App mobile). To *nie* oznacza „całej sekcji Wygląd”. Style globalne witryny dodatkowej (paleta, czcionki, typografia, odstępy, nawigacja, własny CSS) **są** przypisane do witryny dzięki opisanemu wyżej kopiowaniu przy zapisie. Wspólne pozostają jedynie podpanele banera, przycisku, przekierowań i logo na stronie Wygląd.
:::

## Własne domeny: brzeg Caddy (plan konfiguracji statycznej)

:::info
**Kierunek zmieniony 2026-07-02.** Wcześniejszy plan przeniesienia hostingu własnych domen na domeny zarządzane przez Vercel został **anulowany**, a cały kod rejestracji domen w Vercel (`VercelHelper`, zmienne środowiskowe `vercelToken`/`vercelProjectId`/`vercelTeamId`, parametry SSM oraz wpisy w kontroli stanu) został usunięty z API. Samodzielnie zarządzany **proxy Caddy na EC2 pozostaje** jako stały brzeg sieci dla własnych domen. Pozostała praca ma charakter wewnętrzny: zastąpienie *dynamicznej* konfiguracji Caddy przez API administracyjne *statyczną* konfiguracją, która przetrwa restarty.
:::

### Brzeg sieci

Każda własna domena kościoła wskazuje w DNS na jeden serwer EC2 — `3.23.251.61`, dostępny także jako `proxy.b1.church`. Ekran Ustawienia→Domeny w B1Admin instruuje kościoły, aby dodali rekord `A` dla domeny głównej wskazujący na `3.23.251.61` albo rekord `CNAME` wskazujący na `proxy.b1.church`. Caddy kończy TLS certyfikatem Let’s Encrypt dla każdej domeny, przepisuje nagłówek `Host` na upstream `{sub}.b1.church` tej domeny i przekierowuje żądanie do B1App, które rozpoznaje je po etykiecie hosta jak każdą natywną subdomenę (zob. [Własne domeny](#custom-domains) powyżej).

Mapowanie upstream pochodzi z `DomainRepo.loadPairs`, którego wyrażenie `dial` używa `COALESCE` na subdomenie przypisanej witryny, dzięki czemu domena trafia do właściwej *witryny dodatkowej*, a w przeciwnym razie do głównej witryny kościoła:

```sql
CONCAT(COALESCE(NULLIF(s.subDomain,''), c.subDomain), '.b1.church:443')  AS dial
WHERE d.domainName NOT LIKE '%www.%'
```

Wiersze `www.*` są wykluczone z mapy. Caddy obsługuje `www.{host}` przekierowaniem `302` na domenę główną (apex).

### Dwa anonimowe endpointy zasilają brzeg sieci

`DomainController` udostępnia dwa niewymagające uwierzytelnienia endpointy tylko do odczytu, z których korzysta serwer bezpośrednio. Są anonimowe z konieczności, ponieważ brzeg sieci odpytuje je, zanim istnieje jakikolwiek kontekst kościoła:

| Endpoint | Zwraca | Rola |
|----------|--------|------|
| `GET /membership/domains/authorize?domain=` | `200`, jeśli domena (a w przypadku braku trafienia dla `www.` — jej domena główna) istnieje w `domains`; w przeciwnym razie `404` (także dla pustego `domain`) | `ask` dla TLS na żądanie w Caddy: kontrola nadużyć decydująca, czy wystawić certyfikat dla przychodzącego SNI |
| `GET /membership/domains/hostmap` | `text/plain`, jedna posortowana linia `{domain} {sub}.b1.church` dla każdej routowalnej domeny | Plik mapy host→upstream, który serwer odświeża cyklicznie |

`authorize` korzysta z `DomainRepo.loadByName` (dokładny host, a następnie jednokrotna ponowna próba z `www.`→domena główna). `hostmap` korzysta z `loadPairs`, więc uwzględnia witryny i pomija `www.*`, identycznie jak trasy proxy, i jedynie usuwa końcówkę `:443`.

### Zapis i usuwanie domeny: jedno best-effort wywołanie

`DomainController.save` zapisuje wiersze `domains`, a następnie wykonuje **jedno** wywołanie `CaddyHelper.updateCaddy()` w trybie best-effort, opakowane w `try/catch`, które zapisuje błąd (`console.error`) i go pomija. Tak samo działa `delete` (co także naprawiło wcześniejszy błąd nieaktualnej trasy po usunięciu) oraz usuwanie witryny dodatkowej (`SiteController.delete`). `updateCaddy` ma limit czasu **10 s** w Axios, więc niedostępny lub zatrzymany Caddy nigdy nie spowoduje błędu `500` przy zapisie domeny. Źródłem prawdy jest tabela `domains`.

### Obecny stan: konfiguracja statyczna, bez stanu w czasie działania

Serwer (maszyna EC2 z Windows i stałym adresem Elastic IP) uruchamia Caddy z **statycznego pliku Caddyfile**. Zawiera on TLS na żądanie, którego `ask` wskazuje na `/membership/domains/authorize`, oraz plik mapy host→upstream, odświeżany co 5 minut z `/membership/domains/hostmap` przez zaplanowane zadanie, które kończy się łagodnym `caddy reload`. Konfiguracja przetrwa restarty bez żadnego stanu w czasie działania, bez konieczności ponownego „przygotowywania” usługi. Nieznany SNI jest **odrzucany na poziomie TLS** (certyfikat nie jest wystawiany dla hosta, który `authorize` odrzuca), a autoryzowany, ale jeszcze nieobecny w mapie host (nowa domena w oknie synchronizacji) dostaje czysty błąd 404. Nowe domeny stają się routowalne w ciągu około 5 minut od zapisu, a ich certyfikaty są wystawiane przy pierwszym żądaniu. Instalacja, obsługa i sprawdzone w praktyce pułapki: [Serwer proxy Caddy dla własnych domen](../deployment/caddy-proxy.md).

### Starszy wypychany tryb uruchomieniowy: ścieżka wycofania, oczekuje na usunięcie

`CaddyHelper` (moduł membership) nadal może sterować Caddy przez jego **API administracyjne** pod adresem `caddyHost:caddyPort` (SSM `caddyHost`/`caddyPort`; nic nie robi, gdy wartości nie są ustawione; widoczne w grupie Integracje `ServerHealthController`). `updateCaddy()` wysyła PATCH z pełną tablicą tras, a `initializeCaddy()` oraz endpointy `GET /membership/domains/caddy/init` i `GET /membership/domains/caddy` odbudowują serwer skonfigurowany w czasie działania od zera. Konfiguracja w tym trybie istniała wyłącznie w pamięci Caddy, czyli był to problem utraty konfiguracji po restarcie, który ta architektura zastąpiła. Ten mechanizm pozostał wyłącznie jako ścieżka wycofania i zostanie usunięty, gdy statyczny serwer będzie stabilny. Best-effort wypychanie `updateCaddy()` przy zapisie i usuwaniu domeny jest nieszkodliwym brakiem działania wobec statycznego serwera, ponieważ jego API administracyjne jest dostępne tylko z localhost.

## Powiązane strony

- [Serwer proxy Caddy dla własnych domen](../deployment/caddy-proxy.md) — sam serwer brzegowy: instalacja od zera, usługa WinSW, zadanie synchronizacji mapy i pułapki operacyjne
- [Kreator stron](./website-builder.md) — drzewo stron, sekcji i elementów, renderery, blog, SEO i generowanie AI (to, co jest renderowane po rozwiązaniu żądania do kościoła i witryny)
- [Endpointy treści](../api/endpoints/content.md) — REST API dla stron, bloków, linków i stylów globalnych, wszystkie obsługujące `?siteId=`
- [B1App](../web-apps/b1-app.md) — aplikacja Next.js, w której działa middleware i routing `[sdSlug]`
- [Wdrażanie aplikacji webowych](../deployment/web-apps.md) — jak B1App jest wdrażana w Vercel
