---
title: "Serwer MCP"
description: "Skonfiguruj dostęp MCP do API B1, aby klienci AI, jak Claude Code, Cursor czy Claude Desktop, mogli wywoływać dane kościoła kluczami API lub OAuth."
---

# Serwer MCP

<div class="article-intro">

API B1 udostępnia serwer [MCP (Model Context Protocol)](https://modelcontextprotocol.io) pod adresem `/mcp`. Każdy klient AI obsługujący MCP, np. niestandardowe konektory claude.ai, Claude Code, Claude Desktop, OpenAI Agents SDK, Cursor lub własne rozwiązanie, może się z nim połączyć i wywoływać bazowe API REST w imieniu uwierzytelnionego użytkownika kościoła. To cienka, ogólna warstwa: trzy ogólne narzędzia udostępniają całe API dynamicznie, zamiast ręcznie modelować każdy endpoint, a do tego jedno narzędzie z przewodnikiem domenowym dla kreatora stron internetowych.

</div>

<div class="prereqs">
<h4>Zanim zaczniesz</h4>

- [Klucz API B1](./api-keys.md) (`cak_…`) z zakresami, które powinien mieć klient, lub klient MCP, który potrafi logować się przez OAuth (zobacz [Wykrywanie OAuth](#oauth-discovery))
- Osiągalny host API B1: `https://api.churchapps.org` dla kościołów korzystających z usługi hostingowej lub Twoje własne wdrożenie
- Klient MCP. Konfigurację dla użytkowników końcowych znajdziesz w artykułach [Claude](/docs/b1-admin/integrations/claude) i [ChatGPT](/docs/b1-admin/integrations/chatgpt)

</div>

## Endpoint

```
POST /mcp
Content-Type: application/json
Accept: application/json, text/event-stream
Authorization: Bearer cak_<prefix>.<secret>
```

| Aspekt | Wartość |
|---|---|
| **Ścieżka** | `/mcp` (względem hosta API) |
| **Metoda** | Wyłącznie `POST`. Żądania i odpowiedzi oraz strumieniowanie SSE działają na tym samym punkcie końcowym |
| **Transport** | [MCP Streamable HTTP](https://modelcontextprotocol.io/specification/2025-11-25/basic/transports) |
| **Model sesji** | Bezstanowy. Dla każdego żądania budowana jest nowa instancja serwera MCP, bez identyfikatora sesji i bez wznawiania |
| **Uwierzytelnianie** | Token Bearer. Działają zarówno klucze `cak_…`, jak i tokeny JWT B1 (w tym tokeny dostępu OAuth). Rozpoznawanie jest takie samo jak w każdym innym uwierzytelnionym endpoincie |

Żądanie, w którym nagłówek `Authorization` jest pusty lub nieprawidłowy, zwraca:

```json
{ "error": "Unauthorized — MCP requires a valid bearer token (cak_* API key or JWT)." }
```

z kodem HTTP 401 i nagłówkiem `WWW-Authenticate: Bearer resource_metadata="<api>/.well-known/oauth-protected-resource"`. Klienty obsługujące OAuth wykorzystują ten nagłówek, aby rozpocząć logowanie.

W hostowanym API (produkcja i demo) `/mcp` jest obsługiwany przez API Gateway HTTP API, a nie przez REST API używane dla pozostałych endpointów. REST API zmienia nazwę `WWW-Authenticate` na `x-amzn-remapped-www-authenticate` w odpowiedziach proxy Lambda. Przez to klienty takie jak ChatGPT otrzymywały goły 401 bez możliwości rozpoczęcia logowania. HTTP API przekazuje nagłówek bez zmian.

## Narzędzia

Są trzy ogólne narzędzia i jeden przewodnik. Model używa `list_endpoints` do odkrywania tras, `describe_endpoint`, aby poznać kształt ładunku, `api_call`, aby faktycznie wywołać API, oraz `describe_page_builder`, gdy zadanie dotyczy treści strony internetowej.

### `list_endpoints`

Zwraca pełny spis zarejestrowanych tras REST, filtrowany opcjonalnym fragmentem tekstu i/lub czasownikiem HTTP. Każdy wpis zawiera nazwę kontrolera oraz zakresy kluczy API, które najprawdopodobniej są potrzebne.

**Dane wejściowe:**

| Pole | Typ | Opis |
|---|---|---|
| `filter` | string (opcjonalnie) | Fragment tekstu bez rozróżniania wielkości liter, dopasowywany do ścieżki, np. `"people"` |
| `method` | enum (opcjonalnie) | `GET` / `POST` / `PUT` / `DELETE` / `PATCH` |

**Dane wyjściowe:** dokument JSON w postaci:

```json
{
  "total": 24,
  "endpoints": [
    {
      "method": "GET",
      "path": "/membership/people",
      "controller": "PersonController.getAll",
      "likelyScopes": ["people:read", "people:write"]
    }
  ]
}
```

Spis jest budowany raz, przy uruchomieniu API, na podstawie aktualnej tabeli tras. Wszystko, do czego można dotrzeć przez `curl`, pojawi się na liście.

### `describe_endpoint`

Zwraca krótkie podsumowanie oraz, jeśli jest dostępna, ręcznie przygotowaną przykładową treść żądania i odpowiedzi dla jednego endpointu.

**Dane wejściowe:**

| Pole | Typ | Opis |
|---|---|---|
| `method` | string | Czasownik HTTP |
| `path` | string | Pełna ścieżka zwrócona przez `list_endpoints` |

**Dane wyjściowe:** dla endpointów z przykładem: przykład zawierający `summary`, `requestBody` i `responseSample`. Dla endpointów bez przykładu: komunikat zastępczy, który nakazuje modelowi najpierw wywołać `GET`, aby zobaczyć kształt danych. Około tuzina najczęściej używanych tras (osoby, grupy, dary, frekwencja, fundusze) ma przygotowane przykłady.

### `api_call`

Wywołuje wybrany endpoint REST w tym samym procesie, przez ten sam stos middleware Express co zwykłe żądanie HTTP. Uwierzytelnianie, parsowanie treści, logowanie audytu i ograniczanie do danego kościoła obowiązują w pełni.

**Dane wejściowe:**

| Pole | Typ | Opis |
|---|---|---|
| `method` | enum | `GET` / `POST` / `PUT` / `DELETE` / `PATCH` |
| `path` | string | Ścieżka z ewentualnym prefiksem modułu, np. `/membership/people` |
| `query` | object (opcjonalnie) | Płaski obiekt parametrów zapytania |
| `body` | any (opcjonalnie) | Treść żądania JSON, zazwyczaj tablica obiektów modelu dla `POST` |

**Dane wyjściowe:**

```json
{
  "status": 200,
  "truncated": false,
  "body": [ /* the controller's JSON response */ ]
}
```

Wynik narzędzia ma `isError: true` dla każdej odpowiedzi ze statusem ≥ 400.

### `describe_page_builder`

Jedyne nieogólne narzędzie: statyczny, samodzielny przewodnik po tworzeniu stron internetowych przez endpointy `/content/*`. Obejmuje model danych Strona → Sekcja → Element, procedurę tworzenia, każdy `elementType` z kształtem `answersJSON`, ustawienia na poziomie sekcji, takie jak przegrody w kształcie (`dividerTop`/`dividerBottom`), oraz kompletny przykład od początku do końca. Nie przyjmuje żadnych danych wejściowych i odzwierciedla katalog elementów utrzymywany w edytorze B1Admin (zobacz [Architektura kreatora stron](../architecture/website-builder.md)). Agenci powinni wywołać go raz, zanim utworzą lub zmienią treść strony, a następnie działać przez `api_call`.

## Model uwierzytelniania

Samo żądanie MCP przechodzi przez `CustomAuthProvider.getUser()`, czyli tę samą ścieżkę, której używa każdy uwierzytelniony endpoint B1. Token `cak_…` jest rozpoznawany jako `Principal`, którego uprawnienia to bieżący RBAC osoby, która wystawiła klucz, **przecięty** z przyznanymi zakresami klucza. To przecięcie jest przeliczane przy każdym żądaniu, więc:

- Usunięcie zakresu z klucza (przez usunięcie i ponowne utworzenie) odcina dostęp przy następnym wywołaniu.
- Odebranie uprawnienia osobie w B1Admin odcina dostęp przy następnym wywołaniu, nawet jeśli klucz wciąż istnieje.

Przy zagnieżdżonych wywołaniach `api_call` oryginalny nagłówek `Authorization` jest kopiowany do syntetycznego żądania. Dzięki temu `CustomAuthProvider` uruchamia się ponownie i przecięcie zakresów jest stosowane dla każdego wywołania. Tokeny nie są buforowane.

## Lista blokowanych ścieżek

Kilka tras nie jest dostępnych przez `api_call`, nawet przy poprawnym kluczu:

| Wzorzec | Dlaczego |
|---|---|
| `/giving/donate/webhook/*` | Endpointy webhooków dostawców oczekują surowych, zweryfikowanych podpisem treści od Stripe/PayPal, a nie od ogólnych wywołujących |
| `/membership/oauth/clients*` | Rejestracja klientów OAuth jest zastrzeżona dla operatora |
| `/membership/people/apiEmails` | Chronione kluczem `jwtSecret` operatora, a nie uprawnieniami użytkownika |
| Każda trasa oczekująca `multipart/form-data` | Przesyłanie plików nie jest przyjazne dla JSON-RPC |

Zablokowana ścieżka zwraca wynik narzędzia z `isError: true` i opisowym komunikatem. Bazowa trasa nigdy nie jest wywoływana.

## Limit rozmiaru odpowiedzi

Treść każdej odpowiedzi `api_call` jest ograniczona do **64 KB** przechwyconych danych. Jeśli zapytanie przekroczy limit, odpowiedź zawiera `"truncated": true` i model powinien ponowić zapytanie z węższymi parametrami. Dzięki temu pojedyncza odpowiedź narzędzia nie przepełni okna kontekstowego klienta.

## Ograniczanie szybkości

Na `/mcp` nie ma ograniczenia szybkości na poziomie aplikacji. W produkcji ograniczanie jest realizowane przez współbieżność API Gateway i Lambda, a w wdrożeniach samodzielnych przez to, co narzuca serwer proxy.

## Wykrywanie OAuth

Serwer MCP ogłasza metadane OAuth 2.1, aby klienty łączące się wyłącznie z serwerami wykrytymi przez OAuth mogły zalogować użytkownika bez wklejania klucza. Dotyczy to w szczególności interfejsu „Add custom connector" w Claude.ai. `/mcp` jest chronionym zasobem, istniejący [dostawca OAuth](./connected-apps.md) pod `/membership/oauth` jest jego serwerem autoryzacji, a strona `/oauth` w B1Admin jest ekranem zgody.

| Endpoint | Cel |
|---|---|
| `GET /.well-known/oauth-protected-resource` (także `/.well-known/oauth-protected-resource/mcp`) | Metadane chronionego zasobu (RFC 9728). `resource` to `<api>/mcp`, `authorization_servers` to główny adres API, a `scopes_supported` wymienia wszystkie [zakresy kluczy API](./api-keys.md#scopes) |
| `GET /.well-known/oauth-authorization-server` | Metadane serwera autoryzacji (RFC 8414). `authorization_endpoint` to `/oauth` w B1Admin, `token_endpoint` to `/membership/oauth/token`, a `registration_endpoint` to `/membership/oauth/register` |
| `POST /membership/oauth/register` | Dynamiczna rejestracja klienta (RFC 7591) |

Przepływ wykonywany przez klienta, np. claude.ai:

1. `POST /mcp` bez tokenu zwraca 401 z nagłówkiem `WWW-Authenticate`, który wskazuje metadane chronionego zasobu.
2. Klient odczytuje oba dokumenty metadanych, a następnie rejestruje się przez `POST /membership/oauth/register`, wysyłając `client_name`, `redirect_uris` oraz opcjonalnie `scope`. Każdy samodzielnie zarejestrowany klient jest klientem **publicznym**: nie jest wydawany sekret, a odpowiedź zawiera `token_endpoint_auth_method: "none"`. Adresy przekierowań muszą być `https` lub `http` na adresie pętli zwrotnej (`localhost`, `127.0.0.1`, `[::1]`). Na klienta przypada maksymalnie 10 adresów. Rejestracja jest ograniczona do 20 na godzinę na adres IP.
3. Użytkownik zostaje przekierowany do `/oauth` w B1Admin z `code_challenge` i `code_challenge_method=S256`. Strona zgody wymienia każdy żądany zakres prostym językiem (lub „Wszystko, do czego ma dostęp Twoje konto B1", gdy nie zażądano żadnych). Pokazuje też host, do którego użytkownik zostanie odesłany, i informuje, gdy aplikacja zarejestrowała się sama. Użytkownik klika **Zezwól**.
4. Klient wymienia kod w `/membership/oauth/token` przez `grant_type=authorization_code` i swój `code_verifier`. Później odświeża token przez `grant_type=refresh_token`. Akceptowane są treści zakodowane w formularzu i w JSON.
5. Wynikowy token dostępu to ograniczony zakresem token JWT B1, używany jako token Bearer w `/mcp`.

Zasady PKCE: akceptowany jest wyłącznie `S256`. Klient bez sekretu musi wysłać `code_challenge` przy autoryzacji oraz pasujący `code_verifier` przy wymianie tokenu. Klienci poufni (z sekretem) mogą nadal używać samego sekretu. Adresy przekierowań muszą dokładnie odpowiadać zarejestrowanym adresom.

Klienty, które akceptują statyczny token Bearer w konfiguracji (Claude Code, Claude Desktop, OpenAI Agents SDK, Cursor, własny kod), mogą nadal korzystać z klucza `cak_…`.

## Rozwój lokalny

Endpoint MCP jest montowany razem z resztą, gdy API działa lokalnie:

```bash
cd Api
npm run dev
# Server listening on http://localhost:8084
```

Po uruchomieniu wiersz logu `📡 MCP server ready at /mcp — N routes in inventory` potwierdza, że spis został zbudowany.

Sprawdź działanie za pomocą MCP Inspector:

```bash
npx @modelcontextprotocol/inspector
```

W interfejsie Inspectora wskaż `http://localhost:8084/mcp` i ustaw nagłówek `Authorization` na `Bearer cak_<prefix>.<secret>`. Najpierw wywołaj `list_endpoints`. Powinieneś zobaczyć pełną listę tras. Następnie `api_call({ method: "GET", path: "/membership/people" })` powinno zwrócić lokalne dane testowe osób.

## Układ kodu

Serwer MCP znajduje się w `src/modules/mcp/` w repozytorium Api. Najważniejsze pliki:

| Plik | Przeznaczenie |
|---|---|
| `McpController.ts` | `@controller("/mcp")`. Dla każdego żądania podłącza `StreamableHTTPServerTransport` i wysyła wyzwanie `WWW-Authenticate` przy 401 |
| `WellKnownController.ts` / `OAuthMetadata.ts` | Udostępniają dokumenty wykrywania OAuth w `/.well-known` |
| `McpServer.ts` | Buduje `Server` MCP i rejestruje cztery narzędzia |
| `RouteInventory.ts` | Przegląda metadane inversify-express-utils przy starcie, aby wyliczyć trasy |
| `internalDispatch.ts` | Syntetyczne `req`/`res`, które ponownie wchodzą do aplikacji Express w tym samym procesie |
| `tools/` | `listEndpoints.ts`, `describeEndpoint.ts`, `apiCall.ts`, `describePageBuilder.ts` |
| `examples.ts` | Przygotowane przykłady żądań i odpowiedzi dla najczęściej używanych endpointów |

## Powiązane

- [Klucze API](./api-keys.md)
- [Webhooki](./webhooks.md)
- [Połączone aplikacje (OAuth)](./connected-apps.md)
- [Claude: konfiguracja dla użytkowników końcowych](/docs/b1-admin/integrations/claude)
- [ChatGPT: konfiguracja dla użytkowników końcowych](/docs/b1-admin/integrations/chatgpt)
