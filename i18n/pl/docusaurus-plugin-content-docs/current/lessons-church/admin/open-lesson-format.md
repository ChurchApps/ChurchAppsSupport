---
title: "Format lekcji otwartych"
description: "Specyfikacja formatu dla zewnętrznych dostawców programów na Lessons.church: drzewo dostawcy i pola JSON kanału miejsc, akcje i pliki multimedialne."
---

# Format lekcji otwartych

<div class="article-intro">

Format lekcji otwartych to ustandaryzowany schemat JSON, który pozwala zewnętrznym dostawcom treści publikować program nauczania dla Lessons.church. Każda organizacja, która udostępnia kanał w tym formacie, może zostać dodana jako zewnętrzny dostawca, a jej treści będzie można przeglądać i odtwarzać obok wbudowanej biblioteki.

</div>

## Jak to działa

Dostawca udostępnia dwa typy punktów końcowych:

1. **Drzewo dostawcy** – jeden adres URL, który zwraca pełny katalog programów, studiów, lekcji i miejsc. Każde miejsce zawiera adres URL kanału prowadzący do szczegółowej treści lekcji.
2. **Kanał miejsca** – jeden adres URL dla każdego miejsca, zwracający pełną treść lekcji (sekcje, działania i pliki multimedialne).

Gdy kościół doda adres URL dostawcy w Lessons.church, platforma pobiera drzewo, aby odkryć dostępne treści, a następnie pobiera kanały poszczególnych miejsc na żądanie.

## Drzewo dostawcy

Adres URL dostawcy musi zwracać obiekt JSON o następującej strukturze:

```json
{
  "programs": [
    {
      "id": "program-1",
      "name": "Gospel of Mark",
      "slug": "gospel-of-mark",
      "image": "https://example.com/images/mark.jpg",
      "about": "A 12-week study through the Gospel of Mark.",
      "studies": [
        {
          "id": "study-1",
          "name": "The Beginning",
          "slug": "the-beginning",
          "image": "https://example.com/images/study1.jpg",
          "lessons": [
            {
              "id": "lesson-1",
              "name": "The Baptism of Jesus",
              "slug": "baptism-of-jesus",
              "title": "The Baptism of Jesus",
              "image": "https://example.com/images/lesson1.jpg",
              "description": "An introduction to Jesus' ministry.",
              "bottomLine": "God keeps His promises.",
              "verse": "Genesis 9:13 — I have set my rainbow in the clouds…",
              "parentQuestion": "What is one promise God has kept in our family?",
              "parentNote": "Pray together thanking God for keeping His promises.",
              "venues": [
                {
                  "id": "venue-1",
                  "name": "Kids",
                  "apiUrl": "https://example.com/feed/venues/venue-1"
                },
                {
                  "id": "venue-2",
                  "name": "Adults",
                  "apiUrl": "https://example.com/feed/venues/venue-2"
                }
              ]
            }
          ]
        }
      ]
    }
  ]
}
```

### Pola drzewa

| Pole | Typ | Opis |
|-------|------|-------------|
| `programs[].id` | string | Unikatowy identyfikator programu |
| `programs[].name` | string | Nazwa wyświetlana |
| `programs[].slug` | string | Nazwa przyjazna dla adresu URL |
| `programs[].image` | string | Adres URL obrazu programu (opcjonalny) |
| `programs[].about` | string | Opis (opcjonalny) |
| `studies[].id` | string | Unikatowy identyfikator studium |
| `studies[].name` | string | Nazwa wyświetlana |
| `studies[].slug` | string | Nazwa przyjazna dla adresu URL |
| `studies[].image` | string | Adres URL obrazu studium (opcjonalny) |
| `lessons[].id` | string | Unikatowy identyfikator lekcji |
| `lessons[].name` | string | Nazwa wyświetlana |
| `lessons[].slug` | string | Nazwa przyjazna dla adresu URL |
| `lessons[].title` | string | Pełny tytuł |
| `lessons[].image` | string | Adres URL obrazu lekcji (opcjonalny) |
| `lessons[].description` | string | Streszczenie lekcji (opcjonalne). Tekst katalogowy dla nauczycieli przeglądających bibliotekę, a nie materiał do domu dla rodziców. |
| `lessons[].bottomLine` | string | Jedno zdanie z przesłaniem do domu dla rodziców (opcjonalne) |
| `lessons[].verse` | string | Odniesienie do wersetu do zapamiętania i krótki tekst (opcjonalne) |
| `lessons[].parentQuestion` | string | Jedno pytanie, które rodzice mogą zadać w domu (opcjonalne) |
| `lessons[].parentNote` | string | Opcjonalna dodatkowa notatka dla rodziców (markdown) |
| `venues[].id` | string | Unikatowy identyfikator miejsca |
| `venues[].name` | string | Nazwa miejsca (np. „Kids”, „Adults”, „Youth”) |
| `venues[].apiUrl` | string | Adres URL zwracający kanał miejsca (patrz poniżej) |

Cztery pola z przesłaniem do domu dla rodziców (`bottomLine`, `verse`, `parentQuestion`, `parentNote`) są opcjonalne zarówno w drzewie, jak i w kanale miejsca. Jeśli zostaną pominięte, są traktowane jako puste. Nie kopiuj do nich `description`.

**Miejsca** reprezentują różne wersje tej samej lekcji dostosowane do różnych odbiorców (grup wiekowych, warunków itp.).

## Kanał miejsca

Adres `apiUrl` każdego miejsca musi zwracać obiekt JSON zgodny z tym schematem:

```json
{
  "id": "venue-1",
  "name": "Kids",
  "lessonId": "lesson-1",
  "lessonName": "The Baptism of Jesus",
  "lessonImage": "https://example.com/images/lesson1.jpg",
  "lessonDescription": "An introduction to Jesus' ministry.",
  "bottomLine": "God keeps His promises.",
  "verse": "Genesis 9:13 — I have set my rainbow in the clouds…",
  "parentQuestion": "What is one promise God has kept in our family?",
  "parentNote": "Pray together thanking God for keeping His promises.",
  "studyName": "The Beginning",
  "studySlug": "the-beginning",
  "programName": "Gospel of Mark",
  "programSlug": "gospel-of-mark",
  "programAbout": "A 12-week study through the Gospel of Mark.",
  "downloads": [],
  "sections": [
    {
      "id": "section-1",
      "name": "Opening Discussion",
      "sort": 1,
      "materials": "Whiteboard and markers",
      "actions": [
        {
          "id": "action-1",
          "actionType": "text",
          "content": "**Key Verse:** Mark 1:9-11",
          "sort": 1
        },
        {
          "id": "action-2",
          "actionType": "question",
          "content": "What do you know about baptism?",
          "sort": 2,
          "role": "Leader"
        },
        {
          "id": "action-3",
          "actionType": "play",
          "content": "Intro Video",
          "sort": 3,
          "files": [
            {
              "id": "file-1",
              "name": "intro-video.mp4",
              "url": "https://example.com/media/intro.mp4",
              "streamUrl": "https://vimeo.com/123456789",
              "fileType": "video/mp4",
              "seconds": 180,
              "bytes": 52428800,
              "thumbnail": "https://example.com/media/intro-thumb.jpg",
              "loop": false
            }
          ]
        }
      ]
    }
  ]
}
```

### Pola kanału miejsca

#### Obiekt główny

| Pole | Typ | Opis |
|-------|------|-------------|
| `id` | string | Identyfikator miejsca |
| `name` | string | Nazwa miejsca |
| `lessonId` | string | Identyfikator lekcji |
| `lessonName` | string | Nazwa lekcji wyświetlana |
| `lessonImage` | string | Adres URL obrazu lekcji |
| `lessonDescription` | string | Streszczenie lekcji (tekst katalogowy) |
| `bottomLine` | string | Jedno zdanie z przesłaniem do domu dla rodziców (opcjonalne) |
| `verse` | string | Odniesienie do wersetu do zapamiętania i krótki tekst (opcjonalne) |
| `parentQuestion` | string | Jedno pytanie, które rodzice mogą zadać w domu (opcjonalne) |
| `parentNote` | string | Opcjonalna dodatkowa notatka dla rodziców, markdown (opcjonalne) |
| `studyName` | string | Nazwa nadrzędnego studium |
| `studySlug` | string | Slug nadrzędnego studium |
| `programName` | string | Nazwa nadrzędnego programu |
| `programSlug` | string | Slug nadrzędnego programu |
| `programAbout` | string | Opis programu |
| `downloads` | array | Pakiety plików do pobrania |
| `sections` | array | Uporządkowane sekcje lekcji |

#### Sekcja

| Pole | Typ | Opis |
|-------|------|-------------|
| `id` | string | Identyfikator sekcji |
| `name` | string | Tytuł sekcji |
| `sort` | number | Kolejność wyświetlania |
| `materials` | string | Materiały lub notatki dotyczące przygotowania (opcjonalne) |
| `actions` | array | Uporządkowane działania w tej sekcji |

#### Działanie

| Pole | Typ | Opis |
|-------|------|-------------|
| `id` | string | Identyfikator działania |
| `actionType` | string | Jedna z wartości: `play`, `text`, `question`, `quote`, `subhead` |
| `content` | string | Treść tekstowa lub etykieta multimediów |
| `sort` | number | Kolejność wyświetlania |
| `role` | string | Nazwa roli, np. „Leader”, „Kids” (opcjonalne) |
| `roleId` | string | Identyfikator roli (opcjonalny) |
| `files` | array | Pliki multimedialne dla działań `play` (opcjonalne) |

#### Plik

| Pole | Typ | Opis |
|-------|------|-------------|
| `id` | string | Identyfikator pliku |
| `name` | string | Nazwa pliku |
| `url` | string | Bezpośredni adres URL do pobrania |
| `streamUrl` | string | Adres URL strumienia, np. link Vimeo (opcjonalny) |
| `fileType` | string | Typ MIME (np. `video/mp4`, `image/jpeg`) |
| `seconds` | number | Czas trwania w sekundach dla audio/wideo (opcjonalny) |
| `bytes` | number | Rozmiar pliku w bajtach (opcjonalny) |
| `thumbnail` | string | Adres URL miniatury (opcjonalny) |
| `loop` | boolean | Czy multimedia mają być odtwarzane w pętli (opcjonalne, domyślnie false) |

#### Pobieranie

| Pole | Typ | Opis |
|-------|------|-------------|
| `name` | string | Nazwa pakietu do pobrania (np. „Printable Materials”) |
| `files` | array | Pliki w tym pakiecie do pobrania (te same pola co w sekcji Plik powyżej) |

## Typy działań

| Typ | Przeznaczenie |
|------|---------|
| `play` | Odtwarzanie multimediów – wideo, audio lub pokaz slajdów. Musi zawierać `files`. |
| `text` | Statyczna treść tekstowa. Obsługuje pogrubienie w stylu markdown (`**tekst**`). |
| `question` | Pytanie do dyskusji lub refleksji dla odbiorców. |
| `quote` | Wyróżniony cytat lub fragment Pisma Świętego. |
| `subhead` | Nagłówek lub separator w obrębie sekcji. |

:::tip
Aby zobaczyć działający przykład kanału, możesz przejrzeć wbudowane drzewo treści Lessons.church pod adresem `https://api.lessons.church/lessons/public/tree` i pobrać z niego dowolny adres URL kanału miejsca.
:::
