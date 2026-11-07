---
title: "Claude"
description: "Połącz B1 Admin z Claude, aby pytać zwykłym językiem o frekwencję, darowizny i grupy, z opcją logowania i kluczem API z ograniczonymi uprawnieniami."
---

# Claude

<div class="article-intro">

Zadawaj Claude'owi pytania o swój kościół zwykłym językiem, a odpowie na podstawie danych z B1, w tym na podstawie lekcji i klas z FreePlay. Możesz zapytać na przykład: *„ilu pierwszorazowych gości przyszło w niedzielę?"* albo *„kto dołączył do grupy małych grup w tym miesiącu?"*, a także poprosić o wykonanie zadania, na przykład: *„dodaj nową stronę na naszą witrynę o nazwie Wydarzenia"*. Konfiguracja zajmuje mniej niż 3 minuty i nie wymaga żadnych umiejętności technicznych ani instalowania oprogramowania.

</div>

<div class="prereqs">
<h4>Czego potrzebujesz</h4>

- **Konto Claude.** **Darmowy plan działa**, to dobry sposób, żeby wypróbować tę funkcję. Darmowe konta mają jednak dzienny limit wiadomości, a wyszukiwanie informacji w B1 zużywa wiadomości szybko, dlatego jeśli będziesz korzystać z tego regularnie, polecamy **Claude Pro** (około 20 USD miesięcznie).
- **Twój login do B1** — ten sam, którego używasz do B1 Admin.

</div>

:::tip Polecane — wypróbuj za darmo
Claude to najprostszy sposób, aby połączyć B1 ze sztuczną inteligencją, a działa na **darmowym planie** Claude. To doskonały sposób, żeby twój kościół mógł to sprawdzić, zanim zapłaci za cokolwiek.
:::

Są dwa sposoby połączenia. **Opcja 1 jest najprostsza** — nie potrzebujesz klucza ani niczego instalować.

## Opcja 1 — Logowanie przez B1 (najprostsza)

Działa na stronie Claude, w aplikacji Claude na komputer i w aplikacji Claude na telefon. Skonfigurujesz ją raz i będzie dostępna we wszystkich tych miejscach.

### Krok 1 — Otwórz ustawienia łączników Claude

1. Wejdź na [claude.ai](https://claude.ai) i zaloguj się (albo załóż darmowe konto).
2. Kliknij swoje imię w lewym dolnym rogu, a następnie **Ustawienia** → **Łączniki**.

### Krok 2 — Dodaj B1

1. Kliknij **Dodaj**, a następnie **Dodaj niestandardowy łącznik**.
2. **Nazwa:** wpisz `B1`.
3. **URL:** wklej `https://api.churchapps.org/mcp`
4. Pozostałe opcje zostaw bez zmian i kliknij **Dodaj**.

### Krok 3 — Zaloguj się do B1

1. Kliknij **Połącz**. Otworzy się strona logowania do B1.
2. Zaloguj się na swoje konto B1. Jeśli należysz do więcej niż jednego kościoła, sprawdź, czy u góry wyświetla się właściwy kościół.
3. B1 pokaże listę tego, o co Claude prosi, i potwierdzi, że zostaniesz przekierowany z powrotem na **claude.ai**. Kliknij **Zezwól**.

Wrócisz do Claude, a B1 będzie widoczne jako połączone.

### Krok 4 — Zadaj pytanie

Rozpocznij **nowy czat** i wypróbuj na przykład:

- *„Ilu ludzi należy do naszego kościoła?"*
- *„Wypisz aktywne grupy."*
- *„Podsumuj darowizny z tego miesiąca według funduszu."*
- *„Kto dołączył do kościoła w ciągu ostatnich 30 dni?"*

Za pierwszym razem Claude poprosi o zgodę na korzystanie z B1 — kliknij **Zezwól**.

## Opcja 2 — Rozszerzenie na komputer z kluczem B1

Skorzystaj z tej opcji, jeśli wolisz dać Claude'owi klucz z ograniczonymi uprawnieniami (na przykład tylko do odczytu). Działa w aplikacji Claude na komputer z systemem Mac lub Windows. Aby utworzyć klucz, potrzebujesz uprawnień do zarządzania ustawieniami kościoła w B1.

### Krok 1 — Pobierz aplikację Claude

Pobierz aplikację Claude ze strony [claude.com/download](https://claude.com/download), zainstaluj ją, otwórz i zaloguj się.

### Krok 2 — Utwórz klucz B1

Klucz pozwala Claude'owi wejść do B1 *twojego* kościoła. Traktuj go jak hasło przeznaczone wyłącznie dla Claude.

1. Zaloguj się do [B1 Admin](https://admin.b1.church) i przejdź do [Ustawienia → Deweloper](https://admin.b1.church/settings/developer).
2. Na karcie **Klucze API** kliknij **Nowy klucz API**.
3. **Nazwa:** wpisz `Claude`.
4. **Zakresy:** zaznacz, co Claude może robić. Każdy obszar ma pole **odczyt** (tylko przeglądanie) i pole **zapis** (wprowadzanie zmian). Nie masz pewności? Na początek zaznacz tylko pola **odczyt** — później możesz utworzyć nowy klucz z szerszymi uprawnieniami.
5. Kliknij **Zapisz**, a następnie **Kopiuj** klucz. Jest pokazywany tylko raz, więc przejdź od razu do kroku 3.

### Krok 3 — Dodaj B1 do Claude

1. [Pobierz rozszerzenie B1](https://github.com/mbyrdLCS/b1-claude-connect/releases/latest/download/b1-churchapps.mcpb).
2. **Kliknij dwukrotnie** pobrany plik (`b1-churchapps.mcpb`). Claude otworzy się i pokaże **B1 (ChurchApps)**.
3. Kliknij **Zainstaluj**.
4. Gdy zostaniesz poproszony o **klucz API B1**, wklej klucz z kroku 2 i zapisz.
5. **Całkowicie zamknij Claude** (Mac: **Cmd+Q** · Windows: kliknij prawym przyciskiem ikonę Claude na pasku zadań → **Zakończ**), a następnie otwórz go ponownie.

Jeśli dwukrotne kliknięcie nie otwiera Claude, przejdź w Claude do **Ustawienia → Rozszerzenia → Ustawienia zaawansowane → Zainstaluj rozszerzenie…** i wybierz pobrany plik. Następnie rozpocznij nowy czat i zadaj pytanie.

:::tip Rozszerzenie jest już zainstalowane?
Nie musisz nic robić — FreePlay działa przez to samo połączenie. Jedynym wyjątkiem jest wersja 1.1.0, która prosiła o e-mail i hasło do B1: aby ją zaktualizować, pobierz i zainstaluj rozszerzenie ponownie. Twój klucz pozostanie zachowany.
:::

## Czy to bezpieczne?

- Claude widzi wyłącznie dane **twojego kościoła**.
- **Logowanie (opcja 1):** Claude nigdy nie może zrobić więcej, niż może zrobić twoje własne konto B1. Strona logowania B1 wymienia wszystko, co Claude może robić, zanim klikniesz **Zezwól**.
- **Z kluczem (opcja 2):** Claude może robić w B1 tylko to, na co pozwala klucz. Klucz z zaznaczonymi wyłącznie polami **odczyt** pozwala tylko przeglądać i nigdy niczego nie zmieni. FreePlay działa tak samo, w ramach tego samego klucza.
- **Jak to wyłączyć:** w B1 Admin przejdź do **Ustawienia → Deweloper** i odłącz aplikację w sekcji **Połączone aplikacje** (opcja 1) lub usuń klucz w sekcji **Klucze API** (opcja 2). Dostęp przestaje działać natychmiast. Możesz też kliknąć **Rozłącz** przy łączniku B1 w Claude.

## Ile to kosztuje?

Połączenie z B1 jest bezpłatne — jest częścią ChurchApps. Claude ma darmowy plan; Claude Pro (około 20 USD miesięcznie) daje znacznie więcej możliwości. Zobacz [claude.com/pricing](https://claude.com/pricing).

## Szczegóły techniczne

Pozostała część tej strony jest przeznaczona dla użytkowników technicznych i asystentów AI: zakresy uprawnień, inne sposoby połączenia i zasada działania.

### Zakresy

Claude komunikuje się z B1 przez **serwer Model Context Protocol (MCP)** wbudowany w API B1 (`https://api.churchapps.org/mcp`). Każde wywołanie przechodzi przez te same reguły uwierzytelniania, uprawnień i przypisania do kościoła, co żądanie z B1 Admin. Claude jest ograniczony do **uprawnień i zakresów** klucza API i nie może uzyskać dostępu do webhooków, administracyjnych punktów końcowych OAuth ani innych ścieżek przeznaczonych dla operatorów.

Typowe podstawowe zestawy zakresów:

- **Asystent tylko do odczytu:** `people:read`, `groups:read`, `attendance:read`, `donations:read`, `content:read`
- **Odczyt + dodawanie notatek i zadań:** dodaj `people:write`
- **Pełny asystent operacyjny:** dodaj odpowiednie zakresy `:write`, jakich potrzebujesz

Klucz z `donations:read` pozwala Claude'owi podsumowywać darowizny, ale nie może zarejestrować darowizny. Klucz z `people:write` pozwala dodać osobę, ale nie widzi darowizn. Szczegóły dotyczące tego, na co pozwala każdy zakres, znajdziesz w artykule [Klucze API](/docs/developer/api/api-keys).

### Inne sposoby połączenia

#### Claude Code (CLI)

W terminalu:

```bash
claude mcp add --scope user --transport http b1 https://api.churchapps.org/mcp \
  --header "Authorization: Bearer cak_<prefix>.<secret>"
```

To wszystko. W dowolnej sesji Claude Code wpisz `/mcp`, aby potwierdzić, że serwer `b1` jest połączony, a następnie zadaj Claude'owi dowolne pytanie o swój kościół.

#### Claude Desktop — ręczna konfiguracja (zaawansowane)

Jeśli wolisz nie korzystać z rozszerzenia, edytuj plik konfiguracyjny Claude Desktop:

- **macOS:** `~/Library/Application Support/Claude/claude_desktop_config.json`
- **Windows:** `%APPDATA%\Claude\claude_desktop_config.json`

Dodaj wpis serwera `b1`, który łączy się z B1 przez `mcp-remote` (wymaga [Node.js](https://nodejs.org)):

```json
{
  "mcpServers": {
    "b1": {
      "command": "npx",
      "args": [
        "-y", "mcp-remote",
        "https://api.churchapps.org/mcp",
        "--header", "Authorization:Bearer cak_<prefix>.<secret>"
      ]
    }
  }
}
```

Uruchom ponownie Claude Desktop. Menu łączników w polu wiadomości czatu pokaże `b1` wraz z jego narzędziami.

#### Claude.ai (web) — niestandardowy łącznik

Zobacz **Opcję 1** powyżej. Łącznik korzysta z OAuth 2.1: Claude wykrywa serwer autoryzacji B1 pod adresem `https://api.churchapps.org/.well-known/oauth-protected-resource`, rejestruje się przy użyciu Dynamic Client Registration i loguje się z użyciem PKCE. W planach Team i Enterprise właściciel może najpierw musieć dodać łącznik dla organizacji. Claude nie żąda konkretnych zakresów, więc strona zgody pokazuje wszystko, do czego ma dostęp zalogowane konto B1. Możesz to cofnąć w **Ustawienia → Deweloper → Połączone aplikacje** w B1 Admin.

### Jak to działa

API B1 udostępnia pojedynczy punkt końcowy MCP pod adresem `/mcp`. Claude łączy się z nim, uwierzytelnia się za pomocą klucza `cak_…` i uzyskuje dostęp do czterech narzędzi:

| Narzędzie | Co robi |
|---|---|
| `list_endpoints` | Wyświetla punkty końcowe REST, które Claude może wywołać, z możliwością filtrowania według ścieżki. Służy do wyszukiwania. |
| `describe_endpoint` | Zwraca krótki opis i przykładowe żądanie oraz odpowiedź dla konkretnego punktu końcowego. |
| `api_call` | Faktycznie wywołuje punkt końcowy REST jako uwierzytelniony użytkownik. |
| `describe_page_builder` | Przewodnik po tworzeniu i edytowaniu stron twojej witryny kościelnej. Claude czyta go przed pracą nad treściami witryny. |

To ten sam zestaw ścieżek, `/membership/people`, `/giving/donations`, `/attendance/visits` itd., którego używa B1 Admin — każda reguła autoryzacji obowiązuje w identyczny sposób. Punkty końcowe FreePlay (lessons.church) są wyświetlane w ramach `/lessons/*`; wywołania Claude do nich są przekazywane do FreePlay jako ten sam użytkownik, z tymi samymi uprawnieniami.

### Bezpieczeństwo i ograniczenia

- **Izolacja kościołów.** Klucz API odpowiada jednemu kościołowi. Claude nie ma sposobu, by zobaczyć dane innych kościołów.
- **Ograniczenie uprawnieniami.** Jeśli w B1 Admin odbierzesz uprawnienie osobie, która utworzyła klucz, Claude straci je przy następnym wywołaniu — natychmiast.
- **Możliwość cofnięcia.** Usuń klucz w **Ustawienia → Deweloper → Klucze API**, a dostęp Claude zakończy się natychmiast.
- **Lista blokowanych.** Webhooki dostawców, administracyjne punkty końcowe klientów OAuth oraz trasa `apiEmails` przeznaczona wyłącznie dla operatorów nie są dostępne przez MCP.
- **Limit rozmiaru odpowiedzi.** Pojedyncza odpowiedź narzędzia jest ograniczona do 64 KB, aby długie listy nie przepełniały kontekstu Claude. W takim przypadku Claude zawęzi zapytanie za pomocą filtrów.
- **Ścieżka audytu.** Zmiany przechodzą przez ten sam dziennik audytu co działania w B1 Admin; możesz je przejrzeć w **Ustawienia → Dziennik audytu**.

### Rozwiązywanie problemów

**Claude prosi o e-mail i hasło do B1, aby korzystać z FreePlay:** masz wersję 1.1.0 rozszerzenia na komputer. Aby ją zaktualizować, pobierz i zainstaluj ją ponownie — nowsze wersje wymagają tylko klucza.

**Claude zgłasza „Unauthorized” lub błąd 401:** token na nośniku jest brakujący, niepoprawny albo klucz został unieważniony. Jeśli korzystasz z rozszerzenia, otwórz w Claude **Ustawienia → Rozszerzenia → B1 (ChurchApps)** i wklej klucz ponownie. W przeciwnym razie sprawdź nagłówek `Authorization: Bearer cak_…` (zwróć uwagę na spację i dosłowne słowo `Bearer`).

**Wywołanie narzędzia zwraca błąd 403:** klucz API nie ma zakresu potrzebnego dla tego punktu końcowego. Dodaj zakres w **Ustawienia → Deweloper → Klucze API** (musisz utworzyć nowy klucz — zakresów nie można zmienić w istniejącym) i wklej nowy klucz w ustawieniach rozszerzenia lub w konfiguracji Claude.

**Claude nie może znaleźć punktu końcowego:** poproś go, aby wywołał `list_endpoints` z filtrem, np. *„użyj list_endpoints z filtrem 'donations', aby znaleźć właściwą ścieżkę"*. Lista tras jest generowana z działającego API, więc wszystko, co możesz wywołać za pomocą `curl`, się w niej znajduje.

**Rozwój lokalny:** zamień `https://api.churchapps.org/mcp` na `http://localhost:8084/mcp` — uwierzytelnianie i narzędzia są takie same.

## Zobacz także

- [Klucze API](/docs/developer/api/api-keys) — pełna lista zakresów
- [Serwer MCP (dokumentacja dla deweloperów)](/docs/developer/api/mcp) — szczegóły protokołu i schematy narzędzi
- [ChatGPT](./chatgpt.md) — to samo podejście, ale dla modeli OpenAI
