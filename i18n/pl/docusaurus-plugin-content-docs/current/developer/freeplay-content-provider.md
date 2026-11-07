---
title: "Dostawca treści FreePlay"
description: "Co dostawca treści musi zapewnić, aby połączyć bibliotekę lekcji z FreePlay: logo, logowanie, punkty końcowe katalogu i playlist oraz formaty mediów."
---

# Dostawca treści FreePlay

<div class="article-intro">

FreePlay to odtwarzacz multimediów ChurchApps do strumieniowania lekcji i innych treści wideo na telefonach, tabletach i telewizorach. Jeśli posiadasz bibliotekę materiałów lekcyjnych i chcesz udostępnić ją w FreePlay, ten przewodnik zawiera wszystko, czego potrzebujesz do przygotowania.

</div>

## Branding

Przed rozpoczęciem integracji potrzebujemy:

- **Logo** -- obraz logo w proporcjach **16:9** (używany na kartach dostawców w interfejsie FreePlay)
- **Nazwa marki** -- preferowana nazwa Twojej organizacji, która ma być wyświetlana w FreePlay

## Punkty końcowe API

FreePlay komunikuje się z Twoją usługą za pomocą niewielkiego zestawu punktów końcowych REST. Dla każdego dostawcy piszemy dedykowany adapter, dlatego dokładna struktura adresów URL może być elastyczna -- poniższe informacje są jednak tym, czego potrzebujemy.

### Uwierzytelnianie

Wybierz model odpowiedni dla swoich treści:

| Model | Kiedy użyć | Czego potrzebujemy |
|-------|-------------|--------------|
| **Brak** | Treści publiczne, logowanie nie jest wymagane | Nic -- wywołujemy bezpośrednio Twoje punkty końcowe katalogu |
| **OAuth (PKCE)** | Logowanie w aplikacjach internetowych/mobilnych | Adres URL autoryzacji, punkt końcowy wymiany tokenów, identyfikator klienta, zakresy |
| **Device Flow** | Zalecane dla aplikacji na telewizory (użytkownik wpisuje krótki kod na telefonie) | Punkt końcowy autoryzacji urządzenia, punkt końcowy odpytywania o token, identyfikator klienta |

:::tip
Jeśli Twoje treści wymagają uwierzytelnienia, punkt końcowy autoryzacji zwraca **token użytkownika**, który FreePlay przekazuje do punktów końcowych przeglądania i lekcji, aby autoryzować dostęp.
:::

### Przeglądanie / katalog

Punkt końcowy (lub zestaw punktów końcowych), który zwraca **drzewo folderów** wszystkich dostępnych lekcji.

- Może to być **pojedyncze wywołanie** zwracające całe drzewo lub **wiele wywołań**, z których każde zwraca jeden poziom w miarę przechodzenia użytkownika w głąb.
- Każdy element drzewa powinien zawierać:

| Pole | Wymagane | Opis |
|-------|-----------|-------------|
| `id` | Tak | Unikalny identyfikator folderu |
| `name` | Tak | Nazwa folderu wyświetlana użytkownikowi |
| `thumbnail` | Zalecane | Adres URL miniatury w proporcjach **16:9** |

### Lista odtwarzania lekcji

Punkt końcowy zwracający **listę odtwarzania plików multimedialnych** dla pojedynczej lekcji.

Każdy element listy odtwarzania powinien zawierać:

| Pole | Wymagane | Opis |
|-------|-----------|-------------|
| `title` | Tak | Tytuł elementu multimedialnego wyświetlany użytkownikowi |
| `mediaType` | Tak | `video` lub `image` |
| `url` | Tak | Bezpośredni link do pobrania pliku (patrz [Formaty multimediów](#media-formats) poniżej) |
| `thumbnail` | Zalecane | Miniatura elementu |
| `duration` | Zalecane | Czas trwania w sekundach (dla wideo) |

## Formaty multimediów

FreePlay pobiera pliki bezpośrednio, dlatego każdy element multimedialny musi mieć **bezpośredni link** (bez osadzonych odtwarzaczy ani przekierowań stron).

| Typ | Akceptowane formaty |
|------|-----------------|
| Wideo | **MP4** (wymagany dla odtwarzania na urządzeniach Apple i Android) |
| Obraz | JPG, PNG lub GIF |

## Uwagi

- **REST API zwracające JSON** jest typowym wzorcem integracji, ale ponieważ piszemy dedykowany adapter dla każdego dostawcy, możemy współpracować praktycznie z dowolnym formatem API.
- Jeśli chcesz zostać dostawcą treści dla FreePlay, skontaktuj się z nami na [Slacku](https://join.slack.com/t/livechurchsolutions/shared_invite/zt-i88etpo5-ZZhYsQwQLVclW12DKtVflg) lub zgłoś sprawę na [GitHubie](https://github.com/ChurchApps/ChurchAppsSupport/issues).
