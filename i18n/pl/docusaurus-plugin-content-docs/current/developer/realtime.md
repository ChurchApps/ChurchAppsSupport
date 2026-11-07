---
title: "Architektura czasu rzeczywistego"
description: "Jak warstwa WebSocket ChurchApps dostarcza czat na żywo, obecność i powiadomienia: handshake gniazda, subskrypcje pokoi i prymitywy klienta dla deweloperów."
---

# Architektura czasu rzeczywistego

<div class="article-intro">

ChurchApps używa jednego, opartego na WebSocket, systemu dostarczania danych dla wszystkich funkcji działających w czasie rzeczywistym: czatu grupowego, wiadomości prywatnych, notatek do treści, czatu transmisji na żywo oraz obecności i frekwencji. Ta strona opisuje protokół, serwer oraz elementy po stronie klienta, z których korzystają aplikacje.

</div>

## Przegląd

```
┌────────────────────┐                ┌────────────────────────────┐
│ Browser / B1Admin  │                │  MessagingApi (Lambda)     │
│ Browser / B1App    │ ─── WS ─────▶  │  ┌───────────────────────┐ │
│  - SocketHelper    │                │  │ SocketHelper (server) │ │
│  - SubscriptionMgr │   POST /msg ──▶│  │ MessageController     │ │
│  - ConversationStore│  POST /conn ─▶│  │ ConnectionController  │ │
│  - PresenceStore   │ ◀── action ──  │  │ DeliveryHelper        │ │
└────────────────────┘                │  └───────────────────────┘ │
                                      └────────────────────────────┘
```

Protokół składa się z trzech elementów:

1. **Jedno trwałe połączenie WebSocket** na każdą kartę przeglądarki, otwierane przez `SocketHelper`.
2. **Wpisy połączeń** (`POST /messaging/connections`) zapisywane w tabeli `connections` — oznaczają krotkę `(socketId, churchId, conversationId)` jako subskrybenta pokoju.
3. **Rozsyłanie po stronie serwera** przez `DeliveryHelper.sendConversationMessages()` — gdy wiadomość zostanie zapisana (`POST /messaging/messages/send`), serwer odczytuje pasujące wpisy połączeń i wysyła typowany ładunek do każdego otwartego gniazda.

Nie korzystamy z Socket.IO, nie ma zapasowego mechanizmu długiego odpytywania (long-polling) ani osobnego mikroserwisu. WebSocket działa w tym samym procesie co REST API (w AWS funkcja Lambda `web` obsługuje HTTP, a funkcja `socket` obsługuje WebSocket; lokalnie oraz na Railway działa jeden połączony proces).

## Porty i transport

| Środowisko | HTTP | WebSocket |
|-------------|------|-----------|
| Lokalne środowisko deweloperskie | `8084` | `ws://localhost:8087` (oddzielny `WebSocketServer`) |
| Railway / Docker / hosty z jednym portem (ustawiona zmienna `RAILWAY_ENVIRONMENT` lub `SELF_HOSTED`) | wspólny | wspólny serwer HTTP (`SocketHelper.attachToServer()`) |
| AWS Lambda  | API Gateway HTTP | API Gateway WebSocket (trasy `$connect` / `$disconnect` / `$default`) |

Wyboru transportu dokonuje konfiguracja `deliveryProvider`:

- `local` → surowa biblioteka `ws`; klienci łączą się z `MessagingApiSocket` z `CommonEnvironmentHelper`.
- `aws` → API Gateway WebSocket; serwer wysyła ładunki do aktywnych połączeń za pomocą `@aws-sdk/client-apigatewaymanagementapi`.

Klient nie musi wiedzieć, który transport jest używany — w obu przypadkach komunikuje się przy użyciu tego samego protokołu JSON.

## Protokół komunikacji

Każda ramka to JSON o strukturze `PayloadInterface`:

```typescript
interface PayloadInterface {
  churchId: string;
  conversationId: string;  // the "room" — usually a UUID, sometimes "alerts" or "content-{type}-{id}"
  action: PayloadAction;
  data: unknown;
}

type PayloadAction =
  | "socketId"            // server → client, after connect, carries the socketId to use for room joins
  | "message"             // server → client, new message
  | "deleteMessage"       // server → client, message removed
  | "privateMessage"      // server → client, badge-count ping to the recipient's "alerts" room when a direct message escalates; the message body itself arrives via the ordinary "message" action inside the open conversation
  | "reaction"            // server → client, emoji reaction toggled on a message; data is { messageId, conversationId, personId, emoji, added } (added=false means removed). Broadcast to the conversation room by POST /messaging/messages/:messageId/reactions
  | "conversationActivity"// server → client, secondary "something happened" signal for content-room subscribers
  | "attendance"          // server → client, viewer list / presence snapshot
  | "notification"        // server → client, generic notification (counts, etc.)
  | "reconnect"           // client-internal, dispatched locally by SocketHelper after a new socketId handshake completes following a drop — either an exponential-backoff reconnect after an unexpected close, or an immediate reconnect triggered by the resume probe (tab focus/visibility/online); never sent by the server
  | "alert" | "callout";  // legacy, see Connections endpoint reference
```

### Uzgadnianie połączenia (handshake)

1. Klient otwiera gniazdo i wysyła dosłowny ciąg znaków `"getId"`.
2. Serwer odpowiada `{ action: "socketId", data: "<id>" }`.
3. Klient zapisuje `socketId` i używa go jako trzeciej współrzędnej każdej subskrypcji pokoju.

### Dołączanie do pokoju

„Pokój” to po prostu krotka `(churchId, conversationId)`. Aby zasubskrybować pokój, klient wysyła wpis `Connection`:

```http
POST /messaging/connections
[
  {
    "churchId": "CHU00000001",
    "conversationId": "CON123…",
    "socketId": "abc123",
    "personId": null,            // optional; null for anonymous live stream viewers
    "displayName": "Anonymous4823"
  }
]
```

Dołączenie uruchamia też rozgłoszenie `attendance` w rozmowie, dzięki czemu dotychczasowi subskrybenci dowiadują się o nowym widzu.

### Wysyłanie wiadomości

`POST /messaging/messages/send` (dozwolone dla anonimowych użytkowników) lub `POST /messaging/messages/` (wymagane uwierzytelnienie):

```json
[
  { "churchId": "CHU00000001", "conversationId": "CON123…", "displayName": "John Smith", "content": "Hello!", "messageType": "comment" }
]
```

Serwer zapisuje wiadomość, a następnie `DeliveryHelper.sendConversationMessages()` wyszukuje wszystkie wpisy połączeń dla danego `conversationId` i wysyła każdemu gniazdu ramkę `{ action: "message", data: <message> }`.

W przypadku rozmów powiązanych z treścią (np. notatek przypisanych do osoby) drugie rozgłoszenie z `action: "conversationActivity"` jest wysyłane do syntetycznego pokoju `"content-{type}-{id}"`, aby odbiorcy widoków listy wiedzieli, że mają odświeżyć dane, bez konieczności utrzymywania otwartej rozmowy.

### Opuszczanie pokoju

```http
DELETE /messaging/connections/:churchId/:conversationId/:socketId
```

Usuwa wpis połączenia i uruchamia końcowe rozgłoszenie `attendance`.

## Komponenty po stronie serwera

| Plik | Rola |
|------|------|
| `Api/src/modules/messaging/helpers/SocketHelper.ts` | Zarządza `WebSocketServer`. Przydziela `socketId` po połączeniu. Uruchamia co 30 s heartbeat ping/pong (`startHeartbeat`), który wywołuje `terminate()` i sprząta każde połączenie, które nie odpowiedziało pong. Sprząta martwe gniazda i po rozłączeniu uruchamia ponowne rozgłoszenie frekwencji. Udostępnia `getLiveSocketIds()` i `reapStaleConnections()`, używane przez zadanie uruchamiane co 30 minut do usuwania nieaktualnych wierszy `connections` — lokalnie przez sprawdzenie, które socketId nadal są aktywne w procesie, a w AWS jako zabezpieczenie z 24-godzinnym TTL dla pominiętych zdarzeń `$disconnect` (API Gateway ogranicza połączenia do około 2 godzin, więc nie może to usunąć aktywnego połączenia) |
| `Api/src/modules/messaging/helpers/DeliveryHelper.ts` | `sendConversationMessages(payload)` odczytuje połączenia dla pokoju i kieruje każdą ramkę do lokalnego gniazda lub do połączenia AWS API Gateway. `sendAttendance(churchId, conversationId)` buduje i rozgłasza migawkę widzów |
| `Api/src/modules/messaging/controllers/ConnectionController.ts` | `POST /` dołącza, `DELETE /:churchId/:conversationId/:socketId` opuszcza, `POST /setName` aktualizuje nazwę wyświetlaną |
| `Api/src/modules/messaging/controllers/MessageController.ts` | `POST /send` (anonimowo) i `POST /` (z uwierzytelnieniem) zapisują wiadomość, a następnie ją rozsyłają |
| `Api/src/modules/messaging/repositories/ConnectionRepo.ts` | `loadForConversation(churchId, conversationId)` jest źródłem prawdy o tym, kto jest subskrybentem |

## Elementy po stronie klienta (`@churchapps/apphelper`)

Wszystkie pięć elementów to statyczne singletony w `apphelper/src/helpers/`. Współpracują tak, aby każda karta otwierała **jedno** połączenie WebSocket, niezależnie od liczby komponentów wyświetlonych na stronie.

### `SocketHelper`

Zarządza pojedynczym połączeniem WebSocket. Ponowne wywołanie `init()` jest idempotentne — wiele komponentów może je wywoływać bez otwierania zduplikowanych gniazd. Udostępnia:

- `init()` — otwiera (lub ponownie wykorzystuje) gniazdo i kończy uzgadnianie `getId`. Zostaje rozwiązane po zakończeniu uzgadniania lub, po 5-sekundowym limicie czasu, gdy pętla ponawiania działająca w tle przejmie kontrolę; nigdy nie odrzuca obietnicy, więc wywołujący nie muszą obsługiwać nieudanego pierwszego połączenia w specjalny sposób.
- `addHandler(action, id, fn)` / `removeHandler(id)` — rejestrują i wyrejestrowują nasłuchiwacze według `action`. Wiele handlerów może nasłuchiwać tej samej akcji.
- `setPersonChurch({ personId, churchId })` — dla uwierzytelnionych wywołujących; uruchamia subskrypcję pokoju `"alerts"`, aby powiadomienia push docierały przez to gniazdo.
- `onSocketIdReady(fn)` — uruchamia się przy każdym nowym socketId, nie tylko przy pierwszym — zarówno przy początkowym uzgadnianiu, jak i przy każdym kolejnym ponownym połączeniu. Używany przez `SubscriptionManager` do wysłania oczekujących dołączeń.
- `checkConnection()` — wywoływany przez poniższe nasłuchiwacze wznowienia; natychmiast ponownie łączy, jeśli gniazdo jest już zamknięte, lub wysyła sondę aktywności, jeśli wygląda na otwarte.

**Cykl ponownego połączenia.** Nieoczekiwane zamknięcie planuje ponowne połączenie z wykładniczym opóźnieniem (1 s, podwajane do limitu 30 s). `SocketHelper` nasłuchuje także zdarzeń `online`, `focus`, `pageshow` i `visibilitychange` na `window`/`document`, aby wykryć wznowienie karty: jeśli gniazdo jest już zamknięte, natychmiast się łączy i resetuje opóźnienie; jeśli wygląda na otwarte, wysyła sondę aktywności `"getId"` i wymusza ponowne połączenie, jeśli w ciągu 3 s nie nadejdzie żadna ramka — to wychwytuje połówkowo otwarte gniazda pozostawione po zawieszeniu aplikacji przez system mobilny. Po udanym ponownym uzgodnieniu `SocketHelper` wysyła lokalną akcję `"reconnect"` (zob. [Protokół komunikacji](#wire-protocol)) do każdego zarejestrowanego handlera tej akcji.

### `SubscriptionManager`

Członkostwo w pokojach z licznikiem referencji. Wiele komponentów subskrybujących tę samą rozmowę rejestruje tylko jeden wpis połączenia po stronie serwera.

```typescript
import { SubscriptionManager } from "@churchapps/apphelper";

await SubscriptionManager.joinRoom(conversationId, churchId, personId, displayName);
// ... component renders, receives socket frames via ConversationStore.subscribe ...
await SubscriptionManager.leaveRoom(conversationId, churchId);
```

Trzy zachowania, które konsumenci otrzymują automatycznie:

- **Opóźnione opuszczanie (300 ms)** — przetrwa podwójne montowanie/demontowanie w React StrictMode oraz krótkie cykle ponownego montowania bez utraty subskrypcji po stronie serwera; `reset()` anuluje również oczekujące opóźnione opuszczenia.
- **Ponowne dołączenie po połączeniu** — `SubscriptionManager` zapamiętuje `personId`/`displayName` użyte do dołączenia do każdego pokoju, więc przy zdarzeniu `"reconnect"` z `SocketHelper` (oraz przy każdym wywołaniu `onSocketIdReady`) ponownie wysyła każdy aktywny wpis połączenia z zachowaną tożsamością. Ponowne dołączenia są deduplikowane dla każdego socketId, więc to samo ponowne połączenie nie wysyła dwukrotnie żądania dla tego samego pokoju.
- **Późne wiązanie socketId** — `joinRoom` zapisuje zamiar przed zakończeniem uzgadniania przez gniazdo; właściwe `POST /connections` jest wysyłane przy `onSocketIdReady`.

### `ConversationStore`

Pamięć podręczna w pamięci operacyjnej, kluczowana przez `conversationId`. Rejestruje handlery gniazda `message` / `deleteMessage` / `privateMessage` dokładnie raz i stosuje przychodzące ramki do aktualnie otwartych rozmów.

```typescript
import { ConversationStore } from "@churchapps/apphelper";

const conv = await ConversationStore.loadByConversationId(conversationId, churchId);
// ↑ uses /messages/conversation/:id when authenticated, /messages/catchup/:churchId/:id when anonymous

const unsubscribe = ConversationStore.subscribe(conversationId, (conv) => {
  setMessages(conv.messages);  // re-render with the latest snapshot
});
// ...
unsubscribe();
ConversationStore.forget(conversationId);  // optional explicit cleanup
```

Uwierzytelnieni wywołujący korzystają również z **uzupełniania danych osób** — `personId` w przychodzących wiadomościach są zamieniane na obiekty `PersonInterface` za pomocą buforowanego zapytania `GET /people/ids`. Wywołujący anonimowi pomijają ten krok.

Po zdarzeniu `"reconnect"` z `SocketHelper` `ConversationStore` ponownie pobiera każdą rozmowę, która ma aktywnych słuchaczy `subscribe`, odzyskując wiadomości pominięte podczas przerwy w połączeniu. Rozmowy anonimowe pomijają to nadrabianie, jeśli nie zapisano ich `churchId` (endpoint nadrabiania go wymaga).

### `PresenceStore`

Działa na tym samym wzorcu co `ConversationStore`, ale dla akcji `attendance`. Subskrybenci otrzymują `PresenceSnapshot { conversationId, totalViewers, viewers }` za każdym razem, gdy serwer ponownie rozgłasza obecność. Identyczne migawki są deduplikowane przed powiadomieniem, więc fale ponownych połączeń nie powodują zbędnych ponownych renderowań.

```typescript
import { PresenceStore } from "@churchapps/apphelper";

const unsubscribe = PresenceStore.subscribe(conversationId, (snapshot) => {
  setViewerCount(snapshot.totalViewers);
});
```

### `NotificationService`

Główny punkt startowy dla **uwierzytelnionych** wywołujących. Opakowuje `SocketHelper.init()`, ustawia kontekst osoby i kościoła (co automatycznie dołącza do pokoju `"alerts"`) oraz wywołuje `ConversationStore.ensureHandlers()` / `PresenceStore.ensureHandlers()` / `SubscriptionManager.setupRejoin()` dokładnie raz. Rejestruje także własny handler `"reconnect"`, który ponownie ładuje liczniki powiadomień i wiadomości prywatnych, dzięki czemu znaczniki odzyskują stan po przerwaniu połączenia.

```typescript
await NotificationService.getInstance().initialize(userContext);
```

Przepływy anonimowe (czat transmisji na żywo jest najlepszym przykładem) pomijają `NotificationService` i wywołują elementy podstawowe bezpośrednio — przykładową implementację znajdziesz w `B1App/src/helpers/StreamChatManager.ts`.

## Czat transmisji na żywo

Transmisja na żywo to największy anonimowy konsument tego systemu. Do określenia zakresu pokoi używa dwóch wartości `contentType`:

- `streamingLive` — publiczna zakładka czatu na `/stream` (jeden pokój na każdą `streamingService`).
- `streamingLiveHost` — prywatny pokój widoczny tylko dla personelu z uprawnieniem `contentApi.chat.host`. Identyfikator pokoju jest szyfrowany na serwerze (`GET /streamingServices/:id/hostChat`), aby przypadkowe pobieranie danych nie ujawniało go.

`B1App/src/helpers/StreamChatManager.ts` uruchamia oba pokoje za pomocą ujednoliconych elementów podstawowych — kod gniazda specyficzny dla transmisji na żywo już nie istnieje.

## Wzorce i pułapki

- **Nie otwieraj własnego WebSocket.** `SocketHelper` jest singletonem z określonego powodu. Jeśli chcesz nasłuchiwać na niestandardową akcję, zarejestruj handler na istniejącym gnieździe przez `SocketHelper.addHandler`.
- **Nie omijaj `SubscriptionManager`.** Bezpośrednie wywołania `POST /connections` działają, ale tracą licznik referencji, opóźnione opuszczanie i ponowne dołączanie po połączeniu. Konsumenci czatu grupowego i wiadomości prywatnych korzystają wyłącznie z `SubscriptionManager`.
- **Identyfikatory handlerów muszą być unikalne dla każdej akcji.** `SocketHelper.addHandler(action, id, fn)` kluczuje według pary `(action, id)`; ponowne użycie tego samego identyfikatora dla dwóch nasłuchiwaczy zastępuje pierwszy. Ujednolicone magazyny używają identyfikatorów takich jak `"ConversationStore-Message"` i `"PresenceStore-Attendance"`, aby nie kolidować z identyfikatorami konsumentów.
- **Identyfikatory pokoi są nieprzezroczystymi ciągami znaków.** Większość to UUID rozmów, ale system obsługuje także `"alerts"` (powiadomienia dla każdej osoby), `"content-{type}-{id}"` (syntetyczne pokoje aktywności) oraz zaszyfrowane identyfikatory `streamingLiveHost`.
- **Uwierzytelnianie jest sprawdzane na granicy REST, a nie w gnieździe.** Dołączenie do pokoju przez `POST /connections` jest dozwolone dla anonimowych użytkowników; kontrola dostępu odbywa się w momencie wysyłania wiadomości (kontroler wiadomości decyduje, jakie `messageType` może wysłać anonimowy wywołujący).

## Powiązane strony

- [Architektura powiadomień](./architecture/notifications.md) -- Lejek powiadomień w aplikacji, push i e-mail, do którego zasila ten transport
- [Endpointy wiadomości](./api/endpoints/messaging.md) -- Pełny interfejs REST dla wiadomości, rozmów, połączeń i urządzeń
- [Powiadomienia push w przeglądarce](./web-push.md) -- Push w przeglądarce, niezależny od dostarczania przez gniazdo na stronie
- [AppHelper](./shared-libraries/app-helper.md) -- Pakiet npm zawierający elementy podstawowe po stronie klienta
- [Struktura modułów](./api/module-structure.md) -- Organizacja modułu wiadomości po stronie serwera
