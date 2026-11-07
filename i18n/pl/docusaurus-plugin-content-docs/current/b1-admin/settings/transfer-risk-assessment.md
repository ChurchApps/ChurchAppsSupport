---
title: "Ocena ryzyka transferu danych"
---

# Ocena ryzyka transferu danych

<div class="article-intro">

Ten dokument rejestruje ocenę ryzyk ChurchApps związanych z międzynarodowymi transferami danych osobowych z Wielkiej Brytanii/EOG do Stanów Zjednoczonych, wymaganą na podstawie brytyjskiego RODO i unijnego RODO. Jest to wewnętrzny dokument zgodności prowadzony przez ChurchApps jako podmiot przetwarzający.

</div>

**Ostatni przegląd:** kwiecień 2026

## 1. Szczegóły transferu

| Element | Szczegóły |
|---|---|
| **Eksporter danych** | Kościoły korzystające z ChurchApps (administratorzy danych) z siedzibą w Wielkiej Brytanii/EOG |
| **Importer danych** | ChurchApps (podmiot przetwarzający) działający w Stanach Zjednoczonych |
| **Kategorie osób, których dane dotyczą** | Członkowie kościoła, uczestnicy, goście, darczyńcy, wolontariusze, dzieci (zarządzane przez rodziców/administratorów) |
| **Kategorie danych osobowych** | Imiona i nazwiska, adresy e-mail, numery telefonów, adresy pocztowe, daty urodzenia, płeć, stan cywilny, zdjęcia profilowe, dane o darowiznach, dane o frekwencji, członkostwa w grupach, przydziały wolontariuszy, historia wiadomości |
| **Dane wrażliwe** | Nie są celowo gromadzone. Nie przechowujemy danych o zdrowiu, danych biometrycznych ani informacji o karalności. Dane kont finansowych (karty kredytowe, konta bankowe) nigdy nie są przechowywane przez ChurchApps — obsługuje je bezpośrednio Stripe. |
| **Cel transferu** | Świadczenie usług oprogramowania do zarządzania kościołem (zarządzanie członkostwem, darowizny, śledzenie frekwencji, komunikacja, planowanie wolontariatu, rejestracja na wydarzenia) |
| **Kraj docelowy** | Stany Zjednoczone |
| **Mechanizm transferu** | Standardowe klauzule umowne UE (SCC) oraz Aneks do międzynarodowych transferów danych Wielkiej Brytanii (IDTA), włączone poprzez Aneks o przetwarzaniu danych AWS |

## 2. Podprzetwarzający

| Podprzetwarzający | Rola | Lokalizacja | Mechanizm transferu |
|---|---|---|---|
| **Amazon Web Services (AWS)** | Hosting infrastruktury, przechowywanie danych, dostarczanie treści (region us-east-2) | Stany Zjednoczone | Aneks o przetwarzaniu danych AWS z SCC (automatycznie uwzględniony w Warunkach usług AWS) |
| **Stripe** | Obsługa płatności za darowizny | Stany Zjednoczone | Aneks o przetwarzaniu danych Stripe z SCC |

Dane kart kredytowych i kont bankowych są przesyłane bezpośrednio z przeglądarki użytkownika do Stripe i nigdy nie są przechowywane ani przesyłane przez serwery ChurchApps.

## 3. Ocena ryzyka

### 3.1 Szyfrowanie

- **W transmisji:** Wszystkie dane są szyfrowane za pomocą TLS/HTTPS we wszystkich komunikacjach między użytkownikami a serwerami ChurchApps.
- **W spoczynku:** Dane przechowywane w AWS są szyfrowane w spoczynku przy użyciu szyfrowania zarządzanego przez AWS.

### 3.2 Kontrola dostępu

- Dostęp do serwerów produkcyjnych jest ograniczony do dwóch osób będących członkami zarządu ChurchApps.
- Deweloperzy, wolontariusze i pozostali członkowie zarządu nie mają dostępu do serwerów produkcyjnych ani baz danych.
- Serwery baz danych znajdują się za zaporą sieciową i nie są bezpośrednio dostępne z internetu.
- Dane kościołów są logicznie rozdzielone — każdy kościół może uzyskać dostęp wyłącznie do własnych danych dzięki kontroli dostępu na poziomie aplikacji.

### 3.3 Segregacja danych

Dane są rozmieszczone w sześciu niezależnych bazach danych (Członkostwo, Darowizny, Frekwencja, Wiadomości, Zadania, Treści). Naruszenie jednej bazy nie ujawnia danych z pozostałych. Na przykład baza Darowizn zawiera kwoty i daty darowizn, ale nie imiona, nazwiska ani dane kontaktowe darczyńców (przechowywane w bazie Członkostwo).

### 3.4 Minimalizacja danych

- Nie przechowuje się informacji o kartach kredytowych ani kontach bankowych (obsługuje je Stripe).
- Hasła są przechowywane przy użyciu jednokierunkowego haszowania i nie mogą zostać odzyskane.
- Kościoły decydują, jakie dane zbierają od swoich członków.

### 3.5 Prawa osób, których dane dotyczą

ChurchApps udostępnia narzędzia techniczne, które umożliwiają kościołom realizację żądań osób, których dane dotyczą:

- **Dostęp i przenoszalność:** Pełny eksport danych w maszynowo czytelnym formacie JSON.
- **Usunięcie:** Anonimizacja we wszystkich sześciu bazach danych, polegająca na zastąpieniu danych osobowych ogólnymi wartościami przy zachowaniu zbiorczych rekordów wymaganych do raportowania finansowego.
- **Ograniczenie:** Status nieaktywnego członkostwa wyklucza osobę z wyszukiwania, katalogu, raportów i komunikacji, przy zachowaniu jej rekordu.
- **Sprostowanie:** Członkowie i administratorzy mogą edytować dane osobowe w aplikacji.

### 3.6 Powiadamianie o naruszeniach

ChurchApps zobowiązuje się do powiadomienia dotkniętych kościołów w ciągu 72 godzin od uzyskania wiedzy o naruszeniu ochrony danych osobowych, zgodnie z [Warunkami korzystania z usługi](https://churchapps.org/terms) (sekcja 11.6).

### 3.7 Ryzyko dostępu rządu USA

Główne ryzyko związane z danymi hostowanymi w USA to potencjalny dostęp władz rządowych USA na podstawie sekcji 702 FISA lub Dekretu Wykonawczego 12333. Ryzyko to oceniono jako **niskie** z następujących powodów:

- ChurchApps przetwarza dane o członkostwie i frekwencji w kościele, a nie dane mające wartość wywiadowczą.
- Osoby, których dane dotyczą, to członkowie i uczestnicy kościoła — nie są to kategorie zwykle objęte programami inwigilacji.
- Nie są przechowywane wrażliwe dane osobowe (zdrowotne, dotyczące kont finansowych, poglądów politycznych).
- Aneks AWS o przetwarzaniu danych zawiera zobowiązania dotyczące wniosków rządowych o dostęp oraz raportowania przejrzystości.
- Ramy ochrony danych UE-USA (ustanowione w 2023 r.) zapewniają dodatkowe zabezpieczenia dla transferów danych do certyfikowanych organizacji amerykańskich.

## 4. Ogólny wniosek dotyczący ryzyka

Ryzyko dla osób, których dane dotyczą, wynikające z tego międzynarodowego transferu, oceniono jako **niskie**. Połączenie:

- Standardowych klauzul umownych jako prawnego mechanizmu transferu
- Szyfrowania w transmisji i w spoczynku
- Ścisłej kontroli dostępu, z dostępem wyłącznie dla dwóch upoważnionych osób
- Segregacji danych w niezależnych bazach
- Braku przechowywania danych kont finansowych
- Niskiej wrażliwości i niskiej wartości wywiadowczej przetwarzanych danych
- Narzędzi technicznych umożliwiających realizację wszystkich praw osób, których dane dotyczą

zapewnia wystarczające dodatkowe środki ochrony, gwarantujące, że przesyłane dane są chronione na poziomie zasadniczo równoważnym z poziomem zagwarantowanym w Wielkiej Brytanii/EOG.

## 5. Harmonogram przeglądu

Niniejsza ocena będzie przeglądana co roku lub w przypadku istotnej zmiany przetwarzania danych, podprzetwarzających lub ram prawnych regulujących międzynarodowe transfery danych.
