---
title: "Powiadomienia Web Push"
description: "Konfiguracja kluczy VAPID, klienta WebPushHelper i service workera, by B1.church i B1 Admin mogły wysyłać członkom powiadomienia push w przeglądarce."
---

# Powiadomienia Web Push

<div class="article-intro">

Aplikacje internetowe ChurchApps wysyłają powiadomienia push za pomocą W3C Web Push API. To ten sam mechanizm, którego po stronie serwera używa Firebase Cloud Messaging, ale dostarczany przez natywny `PushManager` przeglądarki, a nie przez FCM. Jedna para kluczy VAPID na MessagingApi obsługuje wszystkich odbiorców (B1Admin, B1App i przyszłe aplikacje PWA).

</div>

## Kiedy wysyłane są powiadomienia push

Push to jeden z poziomów jednego przebiegu dostarczania w `NotificationHelper.attemptDeliveryWithEscalation()` (`Api/src/modules/messaging/helpers/NotificationHelper.ts`). Najpierw sprawdzane są preferencje powiadomień w aplikacji, następnie w tym samym przebiegu podejmowana jest próba dostarczenia przez gniazdo oraz wysłania push (każde z nich ma własną bramkę preferencji), a na końcu wysyłany jest e-mail. Odbiorca, który wyciszył daną kategorię, nigdy nie otrzyma push. Udane dostarczenie przez gniazdo nie zatrzymuje już wysyłki push. Każdy typ powiadomienia działa teraz tak, jak zawsze działały wiadomości prywatne, dzięki czemu zainstalowana aplikacja PWA działająca w tle nadal wyświetla powiadomienie systemowe, nawet jeśli dostarczenie przez gniazdo się powiodło. Zduplikowane banery są tłumione po stronie klienta przez service worker (zob. [Wymóg service workera](#service-worker-requirement)). Zaplanowane przypomnienia i rozsyłki uruchamiane przez personel rozpoczynają się od razu na poziomie push, pomijając krok gniazda. E-mail nadal działa według zegara: eskaluje nieprzeczytane wiersze według własnego harmonogramu, a nie jako część tego przebiegu.

Najczęstsze ścieżki prowadzące do push:

1. **Powiadomienia o treściach** — odpowiedź w rozmowie, którą obserwuje dana osoba, wzmianka lub inne zdarzenie kierowane przez `NotificationHelper.createNotifications()`.
2. **Wiadomości prywatne** — wiadomość bezpośrednia przechodzi przez tę samą funkcję dostarczania i zawsze próbuje wysłać push równolegle z dostarczeniem przez gniazdo.
3. **Zaplanowane przypomnienia** — przypomnienia o wydarzeniach, zadaniach i służbach, rozwijane i wysyłane przez silnik przypomnień, który nowe wystąpienia uruchamia bezpośrednio na poziomie push.
4. **Push uruchamiane przez personel** — `POST /messaging/notifications/create`, `/ping` i `/group/send` do jednorazowych lub grupowych rozsyłek.

## Przepływ po stronie serwera

```
NotificationHelper.createNotifications(...) / checkShouldNotify(...) / ReminderEngine.scan(...)
  │
  └─ NotificationHelper.attemptDeliveryWithEscalation(...)
       ├─ bramka preferencji powiadomień w aplikacji  ← wyciszeni odbiorcy kończą tutaj, bez push
       ├─ w tym samym przebiegu, obie próby są podejmowane (żadna nie blokuje drugiej):
       │    ├─ dostarczenie przez gniazdo przez DeliveryHelper  ← pomijane dla przypomnień i rozsyłek (zaczynają od push)
       │    └─ bramka preferencji push
       │         └─ WebPushHelper.sendBulkTypedMessages(tokens, title, body, type, contentId)
       │              └─ biblioteka web-push → żądanie POST podpisane VAPID → usługa push przeglądarki
       └─ bramka preferencji e-mail → sterowana zegarem, osobno eskaluje nieprzeczytane wiersze
```

### Wymagane zmienne środowiskowe

Klucze VAPID są przechowywane w `Environment` i muszą istnieć, aby push był włączony:

| Zmienna środowiskowa | Ustawienie w `Environment` | Opis |
|----------|----------|-------------|
| `WEB_PUSH_PUBLIC_KEY` | `webPushPublicKey` | Publiczny klucz VAPID (base64url). Zwracany klientom przez `GET /messaging/webpush/publicKey` |
| `WEB_PUSH_PRIVATE_KEY` | `webPushPrivateKey` | Prywatny klucz VAPID. Używany do podpisywania każdego wychodzącego powiadomienia push |
| `WEB_PUSH_SUBJECT` | `webPushSubject` | URI `mailto:` zgłaszany usługom push. Domyślnie `mailto:support@churchapps.org` |

`WebPushHelper.isEnabled()` zwraca `false`, gdy brakuje któregokolwiek z kluczy. Moduł wiadomości nadal działa, a dostarczenia push po prostu nie są wykonywane. Strona mobilna B1App informuje wtedy członków, że powiadomienia push nie są włączone, zamiast oferować konfigurację.

### Generowanie pary kluczy VAPID

```bash
npx web-push generate-vapid-keys
```

Wynik dodaj do pliku `.env` (lokalnie) lub do AWS SSM Parameter Store (na wdrożonym środowisku). Rotacja kluczy unieważnia wszystkie istniejące subskrypcje. Klienci muszą ponownie się zarejestrować przy następnym załadowaniu strony.

## Model przechowywania

Subskrypcje Web Push są zapisywane w istniejącej tabeli `devices` obok rekordów urządzeń FCM. Rozróżnia je prefiks `webpush:` w kolumnie `fcmToken`:

```
fcmToken = "webpush:" + JSON.stringify({ endpoint, keys: { p256dh, auth } })
```

Dzięki temu pojedyncze wywołanie `loadByPersonId` zwraca wszystkie urządzenia zarejestrowane przez użytkownika, niezależnie od platformy. Logikę prefiksu obsługują `WebPushHelper.isWebPushToken(token)` oraz `decodeSubscription(token)`.

## Endpointy

Ścieżka bazowa: `/messaging/webpush`

| Metoda | Ścieżka | Uwierzytelnianie | Opis |
|--------|------|------|-------------|
| GET | `/publicKey` | Publiczny | Zwraca `{ publicKey, enabled }`. Klienci przekazują `publicKey` do `pushManager.subscribe({ applicationServerKey })` |
| POST | `/subscribe` | JWT | Rejestruje (lub aktualizuje) subskrypcję dla uwierzytelnionego użytkownika. Treść: `{ subscription: { endpoint, keys: { p256dh, auth } }, appName?, deviceInfo?, label? }` |
| POST | `/unsubscribe` | Publiczny | Usuwa każdy wiersz urządzenia, którego `fcmToken` zawiera podany endpoint. Treść: `{ endpoint }` |
| DELETE | `/subscription/:id` | JWT | Usuwa konkretny wiersz urządzenia po jego identyfikatorze po stronie serwera |

## Komponent po stronie klienta: `WebPushHelper`

`WebPushHelper` z pakietu `@churchapps/apphelper` to jedyny punkt wejścia po stronie klienta. Aplikacje hostujące konfigurują go raz przy starcie i wywołują `subscribe()` po zalogowaniu.

```typescript
import { WebPushHelper } from "@churchapps/apphelper";

// W bootstrapie aplikacji (np. _app.tsx, layout.tsx)
WebPushHelper.configure({
  scope: "/",                // zakres service workera; zgodny z rejestracją sw.js
  appName: "B1AppPwa"        // zapisywane w rekordzie urządzenia, przydatne do filtrowania według powierzchni
});

// Po zalogowaniu (i po każdej zmianie userChurch)
await WebPushHelper.subscribe();
```

Zachowania, które konsumenci otrzymują bez dodatkowej pracy:

- **Sprawdzanie obsługi** — `isSupported()` zwraca `false` w przeglądarkach bez `serviceWorker`, `PushManager` lub `Notification`.
- **Okres ciszy** — `canPromptNow()` wymusza 7-dniowy odstęp między pytaniami, zapisany w `localStorage`, dzięki czemu użytkownicy, którzy odrzucili systemowe pytanie, nie są pytani przy każdej sesji.
- **Rezygnacja** — `setOptedOut(true)` oraz `unsubscribe()` blokują ponowne pytanie i usuwają rekord urządzenia po stronie serwera.
- **Wykrywanie trybu samodzielnego PWA** — `isStandalone()` pozwala aplikacjom hostującym ukrywać pytania o push na iOS za warunkiem, że użytkownik zainstalował PWA na ekranie głównym (iOS zezwala na push tylko z zainstalowanych PWA).
- **Ponowna rejestracja przy zmianie kościoła** — `refreshEnrollment()` ponownie wysyła istniejącą subskrypcję przeglądarki dla nowego `userChurch` bez ponownego pytania użytkownika. Wywołaj tę metodę w obsłudze zmiany `userChurch`.

### Wymóg service workera

`PushManager` przeglądarki zwraca subskrypcję tylko wtedy, gdy service worker jest zarejestrowany w skonfigurowanym zakresie. Aplikacje PWA ChurchApps używają [Serwist](https://serwist.dev/) (aplikacje Next.js) lub workbox do generowania service workera. Ponieważ serwer obecnie zawsze próbuje wysłać push równolegle z dostarczeniem przez gniazdo (zob. [Kiedy wysyłane są powiadomienia push](#when-push-fires)), to service worker jest punktem deduplikacji. Jego handler `push` musi pominąć `showNotification`, gdy aktywny lub widoczny klient jest już na docelowym linku głębokim powiadomienia, ale zawsze powinien zaktualizować odznakę aplikacji, niezależnie od tego, czy baner został pokazany:

```javascript
// public/sw.js (lub to, co wygeneruje Serwist/workbox)
self.addEventListener("push", (event) => {
  const data = event.data?.json() ?? {};
  const title = data.title || "ChurchApps";
  const target = deepLinkFor(data.type, data.contentId, data);

  event.waitUntil((async () => {
    if (typeof data.badgeCount === "number") await updateAppBadge(data.badgeCount); // zawsze się wykonuje, nawet gdy baner jest pominięty

    const clients = await self.clients.matchAll({ type: "window", includeUncontrolled: true });
    // Ta sama ścieżka; dla wiadomości prywatnych także ten sam conversationId.
    const alreadyViewing = clients.some((client) => (client.focused || client.visibilityState === "visible") && clientMatchesTarget(client.url, target));
    if (alreadyViewing) return;

    await self.registration.showNotification(title, {
      body: data.body,
      data: { type: data.type, contentId: data.contentId, url: target },
      icon: "/icons/icon-192.png"
    });
  })());
});

self.addEventListener("notificationclick", (event) => {
  event.notification.close();
  const { url: target } = event.notification.data || {};
  event.waitUntil((async () => {
    const clients = await self.clients.matchAll({ type: "window", includeUncontrolled: true });

    const exact = clients.find((client) => clientMatchesTarget(client.url, target));
    if (exact) return exact.focus(); // już na celu: tylko fokus, bez nawigacji

    const mobileClient = clients.find((client) => new URL(client.url).pathname.startsWith("/mobile"));
    if (mobileClient) {
      await mobileClient.focus();
      return mobileClient.navigate(target);
    }

    return self.clients.openWindow(target);
  })());
});
```

`deepLinkFor` i `clientMatchesTarget` zależą od konkretnej aplikacji. Implementację referencyjną znajdziesz w `B1App/src/app/sw.ts`. B1App kieruje `privateMessage` do `/mobile/messages/:personId`, a B1Admin kieruje `notification` do swojego panelu alertów.

## Uwagi operacyjne

- **Wyniki `gone: true`** — `WebPushHelper.sendBulk` zwraca dla każdego odbiorcy `{ token, success, gone, errorMessage }`. Wynik `gone: true` (usługa push odpowiedziała `404` lub `410`) oznacza, że subskrypcja jest trwale nieprawidłowa. Kod po stronie `NotificationHelper` usuwa takie wiersze urządzeń, aby nie były ponownie używane.
- **TTL** — wiadomości push są wysyłane z `TTL: 86400` (24 godziny). Jeśli przeglądarka użytkownika nie połączy się z usługą push w ciągu 24 godzin, powiadomienie zostanie odrzucone.
- **Brak ponownych prób** — przejściowe błędy (przekroczenie czasu, 5xx) są zapisywane w logu i nie są ponawiane. Push działa w trybie najlepszych starań. Trwałość zapewniają gniazdo na otwartej stronie oraz e-mail.
- **Środowiska wyłączone** — środowiska deweloperskie mogą pozostawić klucze VAPID puste. Wtedy `WebPushHelper.isEnabled()` zwróci `false`, a wysyłka push zostanie pominięta. Jest to zamierzone zachowanie dla środowisk bez własnej tożsamości VAPID.

## Powiązane strony

- [Architektura powiadomień](./architecture/notifications.md) -- Pełny lejek eskalacji w aplikacji, push i e-mail oraz silnik przypomnień
- [Architektura czasu rzeczywistego](./realtime.md) -- Dostarczanie przez WebSocket. Push jest teraz wysyłany z tego samego lejka w aplikacji równolegle z dostarczeniem przez gniazdo, w tym samym przebiegu, a nie tylko jako zapasowa ścieżka, gdy dostarczenie przez gniazdo się nie powiedzie
- [Endpointy wiadomości](./api/endpoints/messaging.md) -- Powiadomienia, urządzenia i pozostała część interfejsu wiadomości
- [AppHelper](./shared-libraries/app-helper.md) -- Pakiet npm, który zawiera `WebPushHelper`
