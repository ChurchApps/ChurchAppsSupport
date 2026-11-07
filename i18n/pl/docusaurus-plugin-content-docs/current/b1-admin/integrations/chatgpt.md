---
title: "ChatGPT"
---

# ChatGPT

<div class="article-intro">

Połącz ChatGPT z danymi swojego kościoła w B1 i zadawaj pytania zwykłym językiem — odpowiada na podstawie aktualnych danych z ewidencji kościoła. Możesz też poprosić go o pomoc w zadaniach, które w B1 Admin wymagają kilku kroków.

**Przykłady pytań:**
- *„Pokaż mi wszystkie osoby, które były na nabożeństwie w zeszłym tygodniu, ale nie zostały przypisane do małej grupy"*
- *„Podsumuj darowizny z tego miesiąca według funduszu"*
- *„Kim są nasi najnowsi członkowie i czy skontaktowaliśmy się z nimi?"*
- *„Nie wiem, jak zrobić X w B1 — możesz mnie przeprowadzić krok po kroku?"*

</div>

<div class="prereqs">
<h4>Czego potrzebujesz</h4>

- **Aplikację desktopową ChatGPT** na Mac lub Windows
- **Płatny plan ChatGPT** (Plus lub wyższy). Darmowe konta ChatGPT nie mogą połączyć się z B1.
- **Dane logowania do B1** z uprawnieniami do zarządzania ustawieniami kościoła (potrzebne do utworzenia klucza). Nie masz ich? Zapytaj administratora B1 w swoim kościele.

</div>

:::tip Zalecane: najpierw wypróbuj Claude — jest bezpłatny
[Claude](./claude) łączy się z B1 w **darmowym planie** i konfiguruje się w mniej niż 3 minuty — wystarczy dodać B1 jako konektor i zalogować się na swoje konto B1. Klucz nie jest potrzebny. To najprostszy sposób, aby Twój kościół mógł wypróbować AI z B1, zanim zapłaci za cokolwiek.
:::

## Konfiguracja

Ekrany mogą wyglądać nieco inaczej w Twojej wersji ChatGPT.

---

**Krok 1 — Utwórz klucz B1**

Klucz pozwala ChatGPT połączyć się z B1 *Twojego* kościoła — traktuj go jak hasło przeznaczone wyłącznie dla ChatGPT.

1. Zaloguj się do [B1 Admin](https://admin.b1.church) i przejdź do [Ustawienia → Developer](https://admin.b1.church/settings/developer).
2. Na karcie **API Keys** kliknij **New API Key** i nadaj mu nazwę `ChatGPT`.
3. **Zakresy:** zaznacz, co ChatGPT może robić. Każdy obszar ma pole **read** (tylko odczyt) i pole **write** (wprowadzanie zmian). Nie wiesz, co wybrać? Na początek zaznacz tylko pola **read**.
4. Kliknij **Save**, a następnie **Copy**, aby skopiować klucz (zaczyna się od `cak_`). Jest wyświetlany tylko raz.

---

**Krok 2 — Kliknij swoją nazwę w lewym dolnym rogu ChatGPT**

![Kliknij nazwę profilu](/img/guides/chatgpt-mcp/01.png)

---

**Krok 3 — Kliknij Settings**

![Kliknij Settings w menu](/img/guides/chatgpt-mcp/02.png)

---

**Krok 4 — Kliknij Plugins w lewym pasku bocznym**

![Kliknij Plugins w sekcji Integrations](/img/guides/chatgpt-mcp/03.png)

---

**Krok 5 — Kliknij kartę MCPs**

![Kliknij kartę MCPs](/img/guides/chatgpt-mcp/04.png)

Tutaj zobaczysz wszystkie serwery MCP, które już dodałeś.

---

**Krok 6 — Kliknij Add → Add MCP server**

![Kliknij Add, a następnie Add MCP server](/img/guides/chatgpt-mcp/06.png)

---

**Krok 7 — Wypełnij formularz i kliknij Save**

![Formularz połączenia z własnym serwerem MCP](/img/guides/chatgpt-mcp/07.png)

Kliknij **Streamable HTTP**, a następnie wypełnij pola:

| Pole | Co wpisać |
|---|---|
| **Name** | `B1 Church` (lub dowolna inna nazwa) |
| **Type** | Kliknij **Streamable HTTP** |
| **URL** | `https://api.churchapps.org/mcp` |
| **Bearer token env var** | Pozostaw puste |
| **Headers** | Kliknij **+ Add header** → Key: `Authorization` → Value: patrz poniżej |

![Przykład wypełnionego formularza: Authorization w polu Key, a klucz Bearer w polu Value](/img/guides/chatgpt-mcp/08.png)

- **Key:** `Authorization`
- **Value:** `Bearer cak_twójklucz` — słowo Bearer, spacja, a następnie Twój klucz

Kliknij **Save**.

Gotowe! Wróć do czatu i zapytaj coś w rodzaju *„Ile osób należy do naszego kościoła?"*, a ChatGPT pobierze odpowiedź bezpośrednio z B1.

---

## Czy to bezpieczne?

- ChatGPT widzi wyłącznie dane **Twojego kościoła**.
- Może robić tylko to, na co pozwala klucz — klucz z zaznaczonymi wyłącznie polami **read** może przeglądać dane, ale nigdy niczego nie zmieni.
- Aby to wyłączyć, usuń klucz w B1 Admin w sekcji **Ustawienia → Developer**. Dostęp zostanie natychmiast wstrzymany.

## Ile to kosztuje?

Połączenie z B1 jest bezpłatne — jest częścią ChurchApps. ChatGPT wymaga płatnego planu (Plus lub wyższego), aby się połączyć; zobacz cennik OpenAI.

## Szczegóły techniczne

Pozostała część tej strony jest przeznaczona dla zaawansowanych użytkowników i asystentów AI. Serwer MCP B1 znajduje się pod adresem `https://api.churchapps.org/mcp` (Streamable HTTP) i przyjmuje klucz API jako nagłówek `Authorization: Bearer cak_…`. Zobacz [dokumentację serwera MCP dla deweloperów](/docs/developer/api/mcp).

### Niestandardowy GPT z Actions

Niestandardowy GPT pozwala stworzyć dedykowanego asystenta, z którego może korzystać cały zespół — wystarczy otworzyć link i zacząć zadawać pytania, bez konfiguracji po ich stronie. Wymaga konta ChatGPT Plus, Team lub Enterprise i zajmuje około 10 minut.

#### 1. Utwórz klucz API

Jeśli jeszcze tego nie zrobiłeś, wykonaj Krok 1 z sekcji Konfiguracja powyżej.

#### 2. Zbuduj niestandardowy GPT

1. W ChatGPT kliknij swój profil → **My GPTs** → **Create a GPT**.
2. Przejdź na kartę **Configure**, nadaj GPT nazwę (np. „B1 Assistant") i dodaj instrukcje:

   ```
   You help church staff query their B1 records. Use the B1 API actions to
   look up people, groups, attendance, donations, and content. Always scope
   answers to data the user has permission to see. Be concise.
   ```

3. Przewiń do **Actions** → **Create new action** → **Authentication**.
   - **Authentication type:** API Key
   - **API Key:** wklej swój klucz `cak_…`
   - **Auth Type:** Bearer
   - Zapisz.

4. W polu **Schema** wklej ten przykładowy specyfikację OpenAPI:

   ```yaml
   openapi: 3.1.0
   info:
     title: B1 API
     version: "1.0"
   servers:
     - url: https://api.churchapps.org
   paths:
     /membership/people:
       get:
         operationId: listPeople
         summary: List people in the church
         parameters:
           - in: query
             name: firstName
             schema: { type: string }
           - in: query
             name: lastName
             schema: { type: string }
           - in: query
             name: email
             schema: { type: string }
         responses:
           "200":
             description: OK
     /membership/people/{id}:
       get:
         operationId: getPerson
         summary: Get a single person by id
         parameters:
           - in: path
             name: id
             required: true
             schema: { type: string }
         responses:
           "200":
             description: OK
     /membership/groups:
       get:
         operationId: listGroups
         summary: List groups in the church
         responses:
           "200":
             description: OK
     /giving/donations:
       get:
         operationId: listDonations
         summary: List donations
         parameters:
           - in: query
             name: personId
             schema: { type: string }
           - in: query
             name: startDate
             schema: { type: string, format: date }
           - in: query
             name: endDate
             schema: { type: string, format: date }
         responses:
           "200":
             description: OK
     /attendance/attendance:
       get:
         operationId: listAttendance
         summary: List attendance records
         parameters:
           - in: query
             name: serviceTimeId
             schema: { type: string }
           - in: query
             name: campusId
             schema: { type: string }
         responses:
           "200":
             description: OK
   ```

5. Zapisz akcję. Przetestuj ją pytaniem: *„ilu ludzi należy do kościoła?"* — ChatGPT wywoła `listPeople` i udzieli odpowiedzi.
6. **Opublikuj** GPT (Only me / Anyone with link / Organization) i udostępnij link swojemu zespołowi.

#### 3. Korzystanie z GPT

Każdy, kto ma link, może zadawać pytania w języku naturalnym. Zakresy klucza nadal obowiązują — klucz tylko do odczytu odrzuca zapisy niezależnie od tego, co mówi schemat akcji.

---

### Bezpieczeństwo i ograniczenia

- **Izolacja między kościołami.** Klucz API odnosi się wyłącznie do jednego kościoła. ChatGPT nie widzi danych innych kościołów.
- **Ograniczenie uprawnieniami.** Klucz zawiera tylko zakresy, które przyznałeś. Usunięcie zakresu (przez usunięcie i ponowne utworzenie klucza) odcina ten dostęp przy następnym wywołaniu.
- **Natychmiastowe odwołanie.** Usuń klucz w **Ustawienia → Developer → API Keys**, a dostęp zakończy się natychmiast.
- **Udostępnianie niestandardowego GPT oznacza udostępnianie danych.** Każdy, kto ma dostęp do GPT, może zobaczyć wszystko, na co pozwalają zakresy klucza. Dla GPT udostępnianych szeroko preferuj węższe zakresy (np. pomiń `donations:read`).
- **Ślad audytu.** Wszystkie zmiany wprowadzone przez ChatGPT trafiają do tego samego dziennika audytu co działania w B1 Admin — znajdziesz go w **Ustawienia → Audit Log**.

### Rozwiązywanie problemów

**Konektor MCP zgłasza „Unauthorized" lub błąd 401:** Twój klucz API jest brakujący lub nieprawidłowy. Otwórz ustawienia konektora i sprawdź nagłówek **Authorization**: wartość powinna składać się ze słowa `Bearer`, jednej spacji i pełnego klucza `cak_…` bez dodatkowych spacji.

**ChatGPT twierdzi, że nie może znaleźć niektórych danych:** klucz może nie mieć odpowiednich zakresów. Utwórz nowy klucz w **Ustawienia → Developer → API Keys** z dodatkowymi zakresami i zaktualizuj konektor.

**Akcja niestandardowego GPT zwraca 401:** w panelu uwierzytelniania akcji upewnij się, że wybrano **Auth Type: Bearer**, a klucz nie zawiera słowa `Bearer` (ChatGPT dodaje je automatycznie).

**Akcja niestandardowego GPT zwraca 403:** klucz nie ma zakresu dla tego punktu końcowego. Utwórz nowy klucz z odpowiednimi zakresami i zaktualizuj GPT.

**Schemat akcji zostaje odrzucony:** ChatGPT wymaga OpenAPI 3.1 z co najmniej jednym wpisem w `paths` oraz adresem URL w `servers`. Sprawdź YAML na [editor.swagger.io](https://editor.swagger.io) przed wklejeniem.

## Powiązane

- [Klucze API](/docs/developer/api/api-keys) — pełne zestawienie zakresów
- [Serwer MCP (dokumentacja deweloperska)](/docs/developer/api/mcp) — szczegóły protokołu i schematy narzędzi
- [Claude](./claude) — to samo rozwiązanie, dla modeli Anthropic
- [Dokumentacja REST API](/docs/developer/api/endpoints) — każdy punkt końcowy, który może wywołać akcja niestandardowego GPT
