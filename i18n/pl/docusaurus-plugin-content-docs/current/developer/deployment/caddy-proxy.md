---
title: "Proxy domen niestandardowych Caddy"
description: "Zbuduj i uruchom reverse proxy Caddy obsługujące własne domeny kościołów w B1.church: certyfikaty TLS, mapowanie hostów i znane pułapki."
---

# Proxy domen niestandardowych Caddy

<div class="article-intro">

Niestandardowe domeny kościołów (`mychurch.org` → witryna B1 kościoła) kończą szyfrowanie TLS na jednym serwerze EC2 z systemem Windows, na którym działa Caddy. Serwer zarządza certyfikatami TLS, przypisuje każdą domenę do jej witryny `{sub}.b1.church` i przekazuje żądania dalej jako odwrotne proxy z przepisanym nagłówkiem Host. Cała jego konfiguracja składa się z dwóch plików: statycznego `Caddyfile` i pliku `hosts.map`, który jest odświeżany z API Membership. Dzięki temu serwer przetrwa restarty bez żadnego stanu w czasie działania. Ta strona opisuje, jak zbudować serwer od podstaw, jak nim zarządzać oraz jakie sprawdzone w praktyce pułapki mogą sprawić kłopot komuś, kto będzie go odbudowywał.

</div>

Informacje o tym, jak żądanie trafia do kościoła i witryny po dotarciu do B1App, znajdziesz w artykule [Routing witryn i wiele witryn](../architecture/websites.md).

## Komponenty

| Element | Opis |
|---|---|
| Instancja EC2 | Windows Server; Elastic IP **`3.23.251.61`** (zapisany w DNS kościołów na całym świecie — adres IP jest stały, a instancje są jednorazowe) |
| `C:\caddy\caddy.exe` | **Niestandardowa** wersja Caddy z modułem magazynu `techknowlogick/certmagic-s3` — standardowa wersja Caddy nie potrafi odczytać magazynu certyfikatów |
| `C:\caddy\Caddyfile` | Cała konfiguracja proxy: TLS na żądanie, `map` host→upstream, przekierowania www→domena główna, `:80`→https |
| `C:\caddy\hosts.map` | Jedna linia `{domain} {sub}.b1.church` dla każdej domeny, którą można kierować, importowana do bloku `map` w Caddyfile |
| `sync-hostmap.ps1` + zadanie `CaddyHostmapSync` | Zadanie harmonogramu (co 5 minut oraz przy uruchomieniu, jako SYSTEM) odświeża `hosts.map` z API i łagodnie przeładowuje Caddy tylko wtedy, gdy coś się zmieniło |
| Usługa Windows `caddy` (opakowanie WinSW) | Uruchamia `caddy.exe run --config C:\caddy\Caddyfile --adapter caddyfile`; automatycznie uruchamia się ponownie po awarii. Caddy nie obsługuje SCM, dlatego potrzebne jest opakowanie |
| Bucket S3 `churchapps-caddy-certs` | Współdzielony magazyn certyfikatów (`region us-east-2`, prefiks `certs`) — certyfikaty przetrwają odbudowę instancji |
| Rola IAM `CaddyRole` | Przyznaje instancji dostęp do S3; Caddy korzysta z domyślnego łańcucha poświadczeń AWS (bez kluczy w konfiguracji) |

## Dwa punkty końcowe API, od których zależy serwer

Oba znajdują się w API Membership. `authorize` jest dostępny anonimowo, a `hostmap` wymaga nagłówka `x-internal-key: <INTERNAL_API_KEY>` od Api PR #67 (2026-08-16) — `sync-hostmap.ps1` odczytuje go z pliku `C:\caddy\internal-key.txt`:

| Punkt końcowy | Rola |
|---|---|
| `GET /membership/domains/authorize?domain={host}` | Bramka **`ask` dla TLS na żądanie** w Caddy: `200 {"authorized":true}`, gdy host (lub dla hosta `www.` — jego domena główna) jest wierszem w tabeli `domains`; w przeciwnym razie `404`. To jest mechanizm zabezpieczający przed nadużyciami — Caddy nie wystawi certyfikatu dla hosta, który ten punkt końcowy odrzuca |
| `GET /membership/domains/hostmap` | Wymaga `x-internal-key` (lub tokenu JWT administratora serwera). `text/plain`, posortowane, bez duplikatów linie `{domain} {sub}.b1.church` (uwzględniają witryny: domena przypisana do witryny dodatkowej kieruje do subdomeny tej witryny). Źródło dla `map` |

## Przebieg żądania

1. Przeglądarka rozpoznaje `mychurch.org` → `3.23.251.61` (rekord `A` dla domeny głównej lub `CNAME proxy.b1.church`).
2. Caddy kończy szyfrowanie TLS. Certyfikat jest dostępny w S3 → zostaje użyty; nieznany SNI → pytany jest `authorize`; 200 → certyfikat zostaje wystawiony na żądanie przez Let's Encrypt; 404 → **uzgadnianie TLS zostaje odrzucone** (brak certyfikatu, brak odpowiedzi — nieznany host otrzymuje odrzucenie TLS, a nie błąd HTTP).
3. `map` przypisuje host do `{sub}.b1.church`; `www.{apex}` otrzymuje przekierowanie 302 na domenę główną; host autoryzowany, ale nieprzypisany w `map` (świeżo dodana domena w oknie synchronizacji wynoszącym do 5 minut) otrzymuje czyste 404.
4. `reverse_proxy` łączy się z `{sub}.b1.church:443` z SNI i nagłówkiem Host przepisanym na upstream, dzięki czemu brzegowy serwer Vercel zwraca witrynę B1App.
   Caddy wysyła także oryginalną domenę odwiedzającego jako `X-Church-Host` (Vercel nadpisuje `X-Forwarded-Host` przepisanym hostem). Middleware B1App akceptuje ten nagłówek tylko wtedy, gdy `/domains/public/lookup/{host}` przypisuje go do tego samego `{sub}` co host żądania; następnie udostępnia go jako `x-public-host` dla kanonicznego nagłówka `Link`, `robots.txt` i `sitemap.xml`. Nagłówek `x-public-host` wysłany przez klienta jest zawsze usuwany. Komponent Schema.org `ChurchJsonLd` nadal używa adresu URL `b1.church` (odczytywanie nagłówków w tym miejscu sprawiłoby, że strony byłyby dynamiczne).
5. Port 80 przepuszcza wyzwania ACME HTTP-01, a wszystkie pozostałe żądania przekierowuje przez 308 na https.

Propagacja nowych domen: domena zapisana w B1Admin staje się kierowalna w ciągu około 5 minut (zadanie synchronizacji); jej certyfikat zostaje wystawiony przy pierwszym żądaniu HTTPS.

## Budowa serwera od podstaw

Skrót sprawdzonej w praktyce procedury (pełna instrukcja krok po kroku z gotowymi poleceniami znajduje się w obszarze roboczym operacji, a nie w tym repozytorium). Najpierw wymagania wstępne — bez nich budowa się nie powiedzie:

1. **IAM**: dołącz `CaddyRole` (dostęp S3 do bucketu certyfikatów) do instancji. Sprawdź przez IMDSv2 z poziomu serwera — pamiętaj, że samo zapytanie IMDS zwracające 401 oznacza tylko, że wymuszono IMDSv2, a nie brak roli.
2. **Stan API**: `authorize` musi zwracać 404 dla nieistniejącej domeny, a `hostmap` (z nagłówkiem `x-internal-key`) musi zwracać 200, zanim zrobisz cokolwiek innego.

Następnie:

3. **Plik binarny**: pobierz niestandardową wersję z usługi budowania Caddy — `https://caddyserver.com/api/download?os=windows&arch=amd64&p=github.com/techknowlogick/certmagic-s3` (~57 MB wobec ~45 MB wersji standardowej; v2.11.4 w chwili pisania). Wybór modułu ma znaczenie: `techknowlogick/certmagic-s3` używa kluczy `bucket`/`region`/`prefix`, zgodnych z istniejącym układem certyfikatów; fork `ss098` używa `host`/`endpoint` i **nie znajdzie** istniejących certyfikatów.
4. **Pliki**: `Caddyfile` + `sync-hostmap.ps1` + `internal-key.txt` (produkcyjny `INTERNAL_API_KEY`, jedna linia) do `C:\caddy\`; jednorazowo wypełnij mapę poleceniem `sync-hostmap.ps1 -NoReload`.
5. **Bramki przed pierwszym uruchomieniem**: `caddy list-modules` musi pokazywać moduł magazynu s3; `caddy adapt` musi wygenerować w bloku magazynu `"module":"s3","bucket":"churchapps-caddy-certs","region":"us-east-2","prefix":"certs"`; `caddy validate` musi przejść.
6. **Usługa**: zainstaluj przez WinSW (identyfikator usługi `caddy`, automatyczny restart po awarii, rotujące logi). Działa jako LocalSystem, który ma dostęp do IMDS w celu pobrania poświadczeń roli.
7. **Zadanie synchronizacji**: zarejestruj `CaddyHostmapSync` (SYSTEM, co 5 minut oraz przy starcie, limit wykonania 4 minuty).
8. **Weryfikacja przed przełączeniem**: wymuś rozwiązanie domen na `127.0.0.1` poleceniem `curl --resolve` (serwer nie ma prawdziwego ruchu, dopóki EIP nie zostanie przeniesiony): istniejąca domena musi działać z przeniesionym, poprawnym certyfikatem; `www.` musi zwracać 302; nieznany host musi zostać odrzucony na poziomie TLS; a `Restart-Service caddy` musi uruchomić usługę z powrotem **bez ręcznego ponownego przygotowania** — ten test restartu jest sensem całej statycznej konstrukcji.
9. **Uruchomienie produkcyjne**: przypisz ponownie Elastic IP `3.23.251.61` do nowej instancji. DNS kościołów nigdy się nie zmienia.

## Sprawdzone w praktyce pułapki (poznane na własnej skórze — nie cofaj tych poprawek)

| Pułapka | Objaw | Rozwiązanie |
|---|---|---|
| `tls_server_name {vars.upstream}` w transporcie reverse_proxy | Każda domena przez proxy zwraca 502: symbole zastępcze mapy przyjmują **pustą wartość w momencie połączenia TLS** („either ServerName or InsecureSkipVerify must be specified”) | Użyj symbolu natywnego dla transportu: `tls_server_name {http.reverse_proxy.upstream.host}` |
| Zduplikowane klucze lub śmieciowe linie w `hosts.map` | Handler `map` w Caddy **twardo zwraca błąd przy zduplikowanym kluczu wejściowym** — jedna błędna linia może zablokować całą konfigurację | Skrypt synchronizacji normalizuje białe znaki, usuwa źle sformatowane linie (odrzuca całość tylko wtedy, gdy jest ich więcej niż 20%), usuwa duplikaty (pierwsze wystąpienie wygrywa) i zapisuje plik w UTF-8 **bez BOM** (BOM psuje pierwszy klucz mapy). API również filtruje wiersze domen puste lub zawierające spacje already u źródła |
| `Register-ScheduledTask -RepetitionDuration ([TimeSpan]::MaxValue)` | Rejestracja zadania **po cichu się nie udaje** (XML poza zakresem, błąd niezakańczający działania) | Zbuduj powtarzanie jako instancję CIM `MSFT_TaskRepetitionPattern` z `Interval = "PT5M"` i bez czasu trwania; dodaj `ExecutionTimeLimit` wynoszący 4 minuty (pierwsze uruchomienie jako SYSTEM może się zawiesić na zimnym wyszukiwaniu TLS/CRL) |

:::warning
Panel administracyjny API wiąże się wyłącznie z `localhost:2019`. Starszy tryb runtime udostępniał go zdalnie, aby API Membership mogło wysyłać konfiguracje tras; statyczna konstrukcja nie wymaga zdalnych wysyłek, a mniejsza powierzchnia ataku jest zamierzona. `caddy reload` (uruchamiany lokalnie przez skrypt synchronizacji) jest jedynym odbiorcą API administracyjnego.
:::

:::info Starsze wysyłanie konfiguracji runtime
`CaddyHelper` w API (oraz punkty końcowe `/membership/domains/caddy` i `/caddy/init`) nadal istnieją jako ścieżka wycofania do starego trybu konfigurowanego w runtime. Zostaną usunięte, gdy statyczny serwer będzie stabilnie działał przez kilka tygodni — od tego momentu jedynymi punktami integracji będą `authorize` i `hostmap`.
:::

## Eksploatacja

- **Logi**: rotujące logi WinSW w `C:\caddy\` (stdout/stderr usługi — błędy reverse proxy trafiają do `caddy-service.err.log`); historia synchronizacji w `C:\caddy\sync-hostmap.log`.
- **Wymuś odświeżenie mapy**: `Start-ScheduledTask -TaskName CaddyHostmapSync`.
- **Zmiana konfiguracji**: edytuj `C:\caddy\Caddyfile`, a następnie `caddy validate` + `caddy reload` (lub `Restart-Service caddy` — restarty są bezpieczne z założenia).
- **Masowe usunięcie domen** uruchamia zabezpieczenie przed kurczeniem się w skrypcie synchronizacji — jest to zamierzone; przenieś stary `hosts.map` na bok i ponownie uruchom zadanie, aby zaakceptować zamierzone duże zmniejszenie.
- **Instrukcje DNS dla kościołów pozostają niezmienione na zawsze**: rekord `A` domeny głównej `3.23.251.61` lub `CNAME proxy.b1.church`.

## Powiązane strony

- [Routing witryn i wiele witryn](../architecture/websites.md) — jak przekazane żądanie trafia do kościoła i witryny w B1App
- [Wdrażanie API](./apis.md) — wdrażanie API Membership, które obsługuje `authorize`/`hostmap`
