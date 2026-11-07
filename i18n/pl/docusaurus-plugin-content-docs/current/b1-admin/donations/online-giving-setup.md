---
title: "Konfiguracja darowizn online"
description: "Połącz Stripe, PayPal, Kingdom Funding lub Paystack z B1 Admin, aby członkowie dawali online na stronie B1.church, a wpłaty trafiały do rekordów."
---

# Konfiguracja darowizn online

<div class="article-intro">

B1 Admin integruje się z **Stripe**, **PayPal**, **Kingdom Funding** i **Paystack** (dla kościołów w Afryce), dzięki czemu Twoi członkowie mogą przekazywać darowizny online za pośrednictwem Twojej strony B1.church. Po skonfigurowaniu darowizny online automatycznie pojawiają się w Twoich rejestrach darowizn obok ręcznie wprowadzonych ofiar, dzięki czemu wszystko znajduje się w jednym systemie.

</div>

<div class="prereqs">
<h4>Zanim zaczniesz</h4>

- Skonfiguruj [fundusze darowizn](funds.md), aby darczyńcy mogli wskazać przeznaczenie swoich ofiar
- Załóż konto w serwisie [stripe.com](https://stripe.com) i aktywuj je (wyłącz tryb testowy)
- Przygotuj dane logowania do B1 Admin

</div>

## Konfiguracja Stripe

1. Jeśli nie masz jeszcze konta, załóż je na [stripe.com](https://stripe.com). Pamiętaj, aby **aktywować swoje konto** i wyłączyć tryb testowy.
2. W Stripe przejdź do **Developers > API Keys**.
3. Skopiuj **Publishable Key**.
4. Zaloguj się do [B1 Admin](https://admin.b1.church/).
5. Przejdź do **Settings** i otwórz sekcję **Giving**.
6. Kliknij **Edit** w sekcji **Giving**.
7. Ustaw **Provider** na **Stripe**.
8. Wklej **Publishable Key** w pole **Public Key**.
9. Wróć do Stripe i wyświetl **Secret Key** (można go zobaczyć tylko raz, więc zapisz kopię zapasową).
10. Wklej **Secret Key** w pole **Secret Key** i kliknij **Save**.

:::warning
Klucz **Secret Key** w Stripe jest wyświetlany tylko raz. Zanim opuścisz panel Stripe, skopiuj go w bezpieczne miejsce. Jeśli go zgubisz, będziesz musiał wygenerować nowy klucz.
:::

## Wybór waluty

Po wybraniu Stripe jako dostawcy obok kluczy API pojawi się lista **Currency**. Wybierz walutę, która odpowiada walucie rozliczeniowej Twojego konta Stripe, aby darowizny były naliczane prawidłowo.

Obsługiwane waluty to m.in. USD, EUR, GBP, CAD, AUD, INR, JPY, SGD, HKD, SEK, NOK, DKK, CHF, MXN i BRL. Domyślną walutę konta możesz sprawdzić lub zmienić w [panelu Stripe](https://dashboard.stripe.com/settings/currencies).

:::info
Waluta wybrana tutaj jest używana w przypadku jednorazowych darowizn, cyklicznych subskrypcji, obliczania opłat i raportów z darowizn. Jeśli zmienisz walutę później, nowa waluta będzie dotyczyć tylko nowych darowizn i subskrypcji. Istniejące darowizny cykliczne będą nadal realizowane w walucie, w której je utworzono.
:::

:::warning
Upewnij się, że konto Stripe jest skonfigurowane do przyjmowania wybranej waluty. Jeśli Twoje konto Stripe jej nie obsługuje, darowizny będą kończyć się niepowodzeniem przy płatności.
:::

## Apple Pay i Google Pay

Kościoły korzystające ze Stripe automatycznie otrzymują przyciski Apple Pay i Google Pay na publicznej stronie darowizn. Przyciski pojawiają się nad polami karty przy jednorazowych darowiznach, gdy darczyńca wybierze fundusz i kwotę, i tylko wtedy, gdy przeglądarka lub urządzenie darczyńcy ma skonfigurowany portfel. Darowizny cykliczne nadal korzystają z pól karty lub konta bankowego.

Google Pay nie wymaga żadnej konfiguracji. Apple Pay wymaga, aby domena Twojej strony darowizn była zarejestrowana w Stripe. B1 robi to przy pierwszym załadowaniu strony darowizn w Twojej domenie. Jeśli przycisk Apple Pay nie pojawia się na iPhonie, sprawdź w panelu Stripe w sekcji **Settings > Payment method domains**, czy Twoja domena `yoursubdomain.b1.church` (lub własna domena) jest na liście i zweryfikowana.

## Darowizny anonimowe

Darczyńcy na publicznej stronie darowizn mogą zaznaczyć opcję **Give anonymously**. Darowizna anonimowa jest zapisywana bez przypisanego darczyńcy, trafia do funduszu wybranego przez darczyńcę i w Twoich partiach oraz raportach wyświetla się jako **Anonymous**. Adres e-mail darczyńcy jest nadal wymagany, aby można było wysłać potwierdzenie, ale rekord osoby nie jest tworzony. Darowizny anonimowe dotyczą wyłącznie jednorazowych wpłat i nie pojawiają się w żadnych zestawieniach darowizn.

## Nieudane darowizny cykliczne

Gdy darowizna cykliczna w Stripe się nie powiedzie (np. z powodu wygasłej lub odrzuconej karty), nieudana transakcja pojawia się w sekcji **Donations > Failed Gifts** wraz z darczyńcą, kwotą, datą i przyczyną podaną przez bramkę płatniczą. Gdy darczyńca zaktualizuje swoją metodę płatności, kliknij **Retry**, aby ponowić obciążenie.

B1 wysyła darczyńcy wiadomość e-mail, gdy obciążenie się nie powiedzie, a następnie ponownie po trzech i siedmiu dniach, jeśli płatność nadal nie przeszła. Wiadomość zawiera link do aktualizacji metody płatności w B1.church.

:::info
Jeśli Twój kościół skonfigurował Stripe przed wprowadzeniem tej funkcji, otwórz **Settings** > **Giving**, kliknij edycję i kliknij **Save** raz. Odświeży to webhook Stripe, dzięki czemu nieudane obciążenia będą zgłaszane do B1.
:::

## Dodawanie strony darowizn do Twojej witryny B1.church

1. Przejdź na stronę [b1.church](https://b1.church/) i zaloguj się.
2. Kliknij ikonę **Settings**.
3. Kliknij **Add Tab**.
4. Jako typ wybierz **Donation**.
5. Wpisz nazwę zakładki (np. „Give”) i kliknij **Save**.
6. Opcjonalnie zmień ikonę zakładki, wpisując w wyszukiwarce ikon „Giv”, aby znaleźć ikonę związaną z darowiznami.

Twoja strona darowizn jest już aktywna. Członkowie mogą ją odwiedzić pod adresem `yoursubdomain.b1.church/donate`.

## Udostępnianie linku do darowizn

Aby znaleźć adres URL do darowizn, przejdź do **B1 Admin** i kliknij ikonę **Settings**, aby zobaczyć swoją subdomenę. Link do darowizn ma format:

`https://yoursubdomain.b1.church/donate`

Udostępnij ten link na swojej stronie internetowej, w wiadomościach e-mail lub w biuletynie parafialnym, aby członkowie wiedzieli, gdzie mogą przekazać darowiznę online.

### Linki z wstępnie wybranym funduszem i kwotą

Aby skierować darczyńców bezpośrednio do konkretnego funduszu, przejdź do **Donations > Funds** i kliknij **Giving Link** przy wybranym funduszu. Opcjonalnie wpisz kwotę, a następnie skopiuj link. W oknie dialogowym wyświetlany jest także kod QR prowadzący do tego samego linku. Kliknij **Download PNG**, aby zapisać go do biuletynu, prezentacji lub plakatu. Gdy darczyńca otworzy link lub zeskanuje kod, fundusz i kwota będą już wybrane na stronie darowizn. Link ma postać:

`https://yoursubdomain.b1.church/donate?fundId=FUND_ID&amount=25`

Te same parametry działają w elemencie **Donate Link** kreatora witryn.

## Powiadomienia o darowiznach

Stripe wysyła wiadomość e-mail za każdym razem, gdy otrzyma darowiznę. Aby zmienić adres e-mail do powiadomień, przejdź do panelu Stripe, kliknij swój profil w prawym górnym rogu, wybierz **Profile** i zaktualizuj adres e-mail.

## Opcje opłat za przetwarzanie

Możesz skonfigurować stronę darowizn tak, aby darczyńcy mogli opcjonalnie pokryć opłaty za przetwarzanie, dzięki czemu Twój kościół otrzyma pełną kwotę darowizny. Ustawienie to zarządza się w ustawieniach kościoła w B1 Admin.

:::tip
Po konfiguracji wykonaj niewielką testową darowiznę, aby sprawdzić, czy wszystko działa, zanim ogłosisz zborowi możliwość przekazywania darowizn online.
:::

## Konfiguracja Kingdom Funding

Kingdom Funding to chrześcijański procesor płatności, który obsługuje karty kredytowe i debetowe oraz przelewy ACH. Jeśli Twój kościół jest zarejestrowany w Kingdom Funding, możesz połączyć go jako bramkę do darowizn.

:::info
Integracja z Kingdom Funding jest obecnie w wersji beta. Skontaktuj się z przedstawicielem B1, aby włączyć ją dla Twojego kościoła.
:::

1. Zarejestruj się lub zaloguj na stronie [kingdomfundinginternational.com](https://kingdomfundinginternational.com/churches/apply).
2. Pobierz **Security Key** (publiczny) i **Private Key** z portalu sprzedawcy Kingdom Funding.
3. W B1 Admin przejdź do **Settings**, otwórz sekcję **Giving** i kliknij edycję.
4. Ustaw **Provider** na **Kingdom Funding**.
5. Wklej **Security Key** w pole **Security Key**, a **Private Key** w pole **Private Key**.
6. Ustaw **Webhook Key** otrzymany od Kingdom Funding i skopiuj wyświetlony adres URL webhooka do ustawień sprzedawcy w Kingdom Funding, aby Kingdom Funding mogło powiadamiać B1 o zrealizowanych transakcjach.
7. Zapisz.

Po połączeniu członkowie zobaczą na stronie darowizn przełącznik karta/konto bankowe i będą mogli przekazać darowiznę kartą kredytową lub przelewem ACH.

## Przyciski PayPal i Venmo

Kościoły korzystające z **PayPal** jako dostawcy mają na stronie darowizn przyciski **PayPal** i **Venmo** nad polami karty przy jednorazowych darowiznach. Darczyńcy, którzy kliknął jeden z nich, dokończą płatność w oknie PayPal, a darowizna zostanie zapisana jak każda inna darowizna online. Przycisk Venmo pojawia się tylko u darczyńców w Stanach Zjednoczonych, na urządzeniach uznanych przez PayPal za kwalifikujące się. Darowizny cykliczne nadal korzystają z pól karty.

## Konfiguracja Paystack (Afryka)

Stripe nie otwiera kont dla kościołów w Ghanie, Nigerii, Kenii, RPA ani na Wybrzeżu Kości Słoniowej. Konta takie otwiera natomiast [Paystack](https://paystack.com), który akceptuje lokalne karty, **mobile money** (MTN MoMo, Vodafone Cash, AirtelTigo, M-PESA), przelewy bankowe i USSD. Darczyńcy płacą w Twojej lokalnej walucie (GHS, NGN, KES, ZAR, XOF).

1. Zarejestruj się na stronie [paystack.com](https://paystack.com), podając zaświadczenie o rejestracji działalności Twojego kościoła oraz lokalny rachunek bankowy, i przejdź proces aktywacji (przejścia na tryb produkcyjny) w Paystack.
2. W panelu Paystack otwórz **Settings → API Keys & Webhooks** i skopiuj **Public Key** oraz **Secret Key** (używaj kluczy produkcyjnych, a nie testowych).
3. W B1 Admin przejdź do **Settings**, otwórz sekcję **Giving** i kliknij edycję.
4. Ustaw **Provider** na **Paystack**, wklej **Public Key** i **Secret Key** oraz wybierz **Currency**.
5. Skopiuj **webhook URL** wyświetlony pod nazwą dostawcy, wróć do panelu Paystack (**Settings → API Keys & Webhooks**) i wklej go w pole **Webhook URL**. Dzięki temu darowizny cykliczne i płatności mobile money będą rejestrowane.
6. Zapisz.

Darczyńcy dokończą płatność w bezpiecznym oknie Paystack, gdzie mogą wybrać kartę, mobile money lub przelew bankowy. Uwagi:

- **Darowizny cykliczne** wymagają karty. Mobile money nie może być obciążane automatycznie, dlatego Paystack zezwala wyłącznie na jednorazowe darowizny mobile money.
- Darowizny cykliczne Paystack można anulować w B1, ale nie można ich wstrzymać ani edytować. Aby zmienić kwotę, anuluj darowiznę i utwórz nową.
- Domyślne stawki **Processing Fee** odpowiadają stawkom Paystack dla lokalnych kart w Twojej walucie. Jeśli Twoje wynegocjowane stawki są inne, zmień je.

## Następne kroki

- Skorzystaj z [Stripe Import](stripe-import.md), aby pobrać transakcje online do B1 Admin, jeśli nie synchronizują się automatycznie
- Sprawdź [raporty darowizn](donation-reports.md), aby upewnić się, że darowizny online są poprawnie wyświetlane
- Wygeneruj [zestawienia darowizn](giving-statements.md), które obejmują zarówno darowizny online, jak i offline
